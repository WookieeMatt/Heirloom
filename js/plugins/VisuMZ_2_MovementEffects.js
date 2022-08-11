//=============================================================================
// VisuStella MZ - Movement Effects
// VisuMZ_2_MovementEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_MovementEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MovementEffects = VisuMZ.MovementEffects || {};
VisuMZ.MovementEffects.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.06] [MovementEffects]
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

const _0x4ee445=_0x5502;(function(_0x443e1f,_0x560ef2){const _0x4289b4=_0x5502,_0x549565=_0x443e1f();while(!![]){try{const _0x307a3d=parseInt(_0x4289b4(0x165))/0x1*(parseInt(_0x4289b4(0x168))/0x2)+parseInt(_0x4289b4(0xe4))/0x3+parseInt(_0x4289b4(0x339))/0x4+-parseInt(_0x4289b4(0x31f))/0x5*(parseInt(_0x4289b4(0x220))/0x6)+-parseInt(_0x4289b4(0xe1))/0x7*(-parseInt(_0x4289b4(0x10d))/0x8)+parseInt(_0x4289b4(0x181))/0x9*(-parseInt(_0x4289b4(0x389))/0xa)+parseInt(_0x4289b4(0x179))/0xb*(parseInt(_0x4289b4(0x194))/0xc);if(_0x307a3d===_0x560ef2)break;else _0x549565['push'](_0x549565['shift']());}catch(_0x5273e1){_0x549565['push'](_0x549565['shift']());}}}(_0x3845,0x8abcb));function _0x5502(_0x2dbc7b,_0x4ed494){const _0x38455c=_0x3845();return _0x5502=function(_0x55022d,_0x12c960){_0x55022d=_0x55022d-0xb4;let _0x409e29=_0x38455c[_0x55022d];return _0x409e29;},_0x5502(_0x2dbc7b,_0x4ed494);}var label='MovementEffects',tier=tier||0x0,dependencies=['VisuMZ_0_CoreEngine',_0x4ee445(0xf8)],pluginData=$plugins[_0x4ee445(0x2bb)](function(_0x3cea8d){const _0x27f11d=_0x4ee445;return _0x3cea8d[_0x27f11d(0x37b)]&&_0x3cea8d[_0x27f11d(0xbd)][_0x27f11d(0x2e4)]('['+label+']');})[0x0];function _0x3845(){const _0x143ef5=['GKbhX','Game_CharacterBase_animationWait','MovementEffectsOptions','isSmartRushCrashShakeTile','MotionTrailCreateForFollower','_terrainTagFootstepSounds','save','_spriteset','straightenFacedDirection','updateSmoothScrollingContainer','_smartJumpRestriction','rgba(0,0,0,0)','eventsXy','Game_Event_setupPageSettings','note','isMoving','Game_Map_changeTileset','SmartRush','scaleX','dir4','pitchRate','YoOOx','jump','footstepsData','pan','ARRAYJSON','_footstepCooldownDuration','eventVolumeModifier','_smartBlink','Enable','cbrnb','ZwKlg','SmartBlinkNonPassRegions','MotionTrailCreateForEvent','DaByp','dir2','lxxQI','SMART_RUSH_FILTER_ANGLE_OFFSET','zoomScale','_motionTrailSprites','ARRAYNUM','TNXqp','setValue','_realX','lower\x20left','LedgeJumpRegion','DustCloudName','addMovementEffectsOptionCommands','llUMI','_smartJumpRestrictions','initMembers','jNcSb','initialize','setupMovementEffectsCommentTags','setHue','volume','agIBK','setupMovementEffectsVariables','fillStyle','dustCloudData','name','_regionFootstepSounds','SmartMoveWaitForSmartRush','allowed','parseTerrainTagBasedSmartJump','_smartJumpMode','scrollUp','_smoothCamera','Index','restore','volumeRate','zLkqw','vjaIN','gWNlb','isSmartRushEnabled','EventID','bcKzn','moveBySmartRush','checkPassage','height','Game_Picture_scaleY','_shiftY','AnimationID','split','attachIconSprite','updateOpacity','Window_Options_addGeneralOptions','swKvB','oSBMi','Dcinc','moveTo','MkTkt','addMovementEffectsFootstepsCommand','FootprintsName','MotionTrailSettingsChangeEvent','JSON','updateScrollLinkedPosition','MotionBlurEvent','SmartJumpNonLandRegions','FootstepsFrames','iDGff','_smartBlinkMotionTrailData','random','parseTerrainTagBasedSmartRush','canSmartBlink','HorzDash','SMART_RUSH_FILTER_DURATION','SpeedRate','FootprintsWidth','Game_Map_parallaxOx','initRegionTerrainTagSmartRush','eventPitchModifier','smartBlinkRelocate','sBPJU','smartBlink','cpRMP','Duration','startScale','SOTNf','ZoWzQ','NoFootstepsEvent','Game_Event_clearPageSettings','createSmartBlinkMotionTrailSprite','autotileType','parseRegionBasedSmartBlink','FootprintsOffset','generatedFootprintBitmap','remove','MotionTrailEnableFollower','tileHeight','footprintsData','NoSmooth','FootstepsPitchRate','updateSmartJumpState','smooth','JTaFy','Spriteset_Map_createLowerLayer','list','MvwfL','_motionBlurMovementEffectsDuration','RegionFootprintOpacity','Nfjfd','startSmartJump','filter','_jumpPeak','RegionFootprintDuration','concat','ceil','makeDeepCopy','SMART_BLINK_FILTER_ANGLE_OFFSET','actorEnabled','call','nonPass','create','UsaTb','MotionTrailSettingsChangeFollower','BTwqY','setDirMoveSpeedMod','moveByInput','_targetScaleX','cEHHg','isPassableByAnyDirection','HVjnu','_smartRushSpeedRate','uUULx','isTileSmartJumpBreakable','isCollidedWithCharacters','endSmartRush','RegExp','radius','clone','updateSmartMovementCooldowns','ukNDS','jkjsJ','_motionTrailLastRealX','setupRegionTerrainTagFootprints','isCeilingTile','BpLYE','_footsteps','EAmIh','loadPicture','eventId','initMovementEffectsFootstepSounds','playOnceParallelInterpreter','includes','distancePitchModifier','test','updateFootprints','setMotionTrailSettings','bind','initRegionTerrainTagSmartBlink','_followerOffsetX','SmartJumpNonPassRegions','nAMgM','_cached_GeneratedFootprint_Image','NoFootprintsEvent','_ready','SMART_RUSH_SHAKE_SPEED_RATE','_erased','enabled','nXNSS','startMotionBlurEffect','jSPzJ','addCommand','centerY','Distance','createMotionBlurMovementEffectsFilter','join','smartBlinkMotionTrailData','_smartJump','nonLand','straighten','roundXWithDirection','isVisible','increaseSteps','HeightBasedRegions','iZviO','_smartBlinkRestrictions','iZDKM','_waitMode','dir9','executeMove','Options','dir1','updateMotionBlurEffectFilter','getDirMoveSpeedMod','OnSuccessCommonEventID','prototype','initRegionTerrainTagFootstepSounds','jJLjO','applyFootstepSoundTileChanges','FootprintsHeight','_dustCloud','AddDustCloud','dustCloud','_motionTrailSettings','gTuMo','right','SmoothCameraEnableDisable','getStraightenDiagonalDirection','SmartJumpHeightBasedRegions','Game_CharacterBase_initMembers','setupOpacity','50285oxpNDd','SoundByFrame','isValid','canSmartJump','startSmartRushCrashWalkBack','canShowMotionTrails','setSmoothCameraSpeed','_targetScaleY','VertDash','NonCrashTerrainTags','event','ShakePowerRate','visible','SmartJumpNonPassTerrainTags','ApplyFollowers','isTileSmartJumpNonLandable','initRegionTerrainTagFootprints','isDashing','parseTerrainTagBasedFootstepSounds','wholeDuration','isSmartBlinkEnabled','createMotionTrailSprite','_footprintsData','sfxPan','isAnimationPlaying','STR','235392BkKzma','NoFootsteps','Spriteset_Map_update','updatePosition','width','SmartMoveWaitForSmartBlink','pop','parseRegionBasedFootprints','NonFootprintTerrainTags','Cooldown','offsetX','XkTUU','_scene','initMovementEffectsFootprintMarks','toUpperCase','createFootprintBasics','FootstepsVolRate','SmartBlinkNonPassTerrainTags','initRegionTerrainTagSmartJump','xRNBC','substring','actorPitchModifier','match','isSmoothCameraEnabled','isMovementSucceeded','scrollLeft','FootstepsEnableDisable','NonPassableTerrainTags','followers','isTileSmartBlinkNonLandable','SfjuR','notSmartJumpPassable','jrTBN','Game_Interpreter_updateWaitMode','sin','NonPassableRegions','lXkHe','parameters','SmartBlink','JhyYp','YesFootprintsEvent','MwQSD','push','parseDirectionText','BSwkJ','footprints','startBattle','lCtWg','AdjustRect','pKWaD','FootprintsEnableDisable','NoSmartBlink','processSmartJumpHeightFactor','updateCharacterFrame','FootprintRegions','leader','createDustCloud','isTileSmartBlinkCompatible','meetsSmartJumpHeightConditions','SmartRushAntiCrashRegions','dir7','Game_CharacterBase_increaseSteps','ZlsYB','loadSystem','jtRMI','mlSVA','status','Footprints','_footprintSprites','fIEdO','IFFOP','JHupX','_opacityRate','deltaXFrom','fullness','addColorStop','dir3','zEDPk','allowDiagonal','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','10ELKCwm','_smartRushMode','NWcmX','canMakeFootstepSounds','measureSmartJumpDistance','RqlOE','applyData','XImhU','initMovementEffectsVariables','startSmartRushCrashShake','BattleManager_startBattle','Game_Player_isDashing','sfxPitch','mmatg','Game_CharacterBase_updateAnimationCount','vert','initMovementEffectsMotionTrails','setDirection','parseRegionBasedSmartRush','tone','initMovementEffectsDirMoveSpeedMod','_dirMoveSpeedMod','color','nMWEu','isPlayFootstepSoundsByFrame','sfxName','SMART_BLINK_FLOOR_TO_CEILING','copyBasicProperties','isTileSmartBlinkBreakable','isSceneMap','isSmartJumpRegionLowestHeight','AoeHL','parse','VHJAW','isSmartRushing','isSmartJumping','footprintDurationAtXy','_smartJumpMotionTrailData','NoTerrainTagFootstepSfx','_character','pitch','getSmoothCameraSpeed','paintOpacity','GmehS','_smartBlinkCooldown','Dash','MotionTrailSettingsChangePlayer','Game_Player_moveByInput','TerrainTagFootstepSfx','soundFrames','canCreateDustCloud','kxuJv','WeKiR','upper\x20right','_tilemap','OHtxQ','OUakZ','initMovementEffectsSmoothCamera','DustCloudEnableDisable','playSe','setupIconSprite','iMoFq','description','sort','_motionBlurMovementEffectsFilter','forbidden','SmartBlinkDistance','updateTilemap','setSmartRushSwitch','SMART_BLINK_FILTER_DURATION','length','lower\x20right','_duration','indexOf','uyzom','isSmartMoving','_jumpHeight','SMART_RUSH_SHAKE_ENABLED','scale','WMEjH','animationWait','cROnj','startShake','TsriR','Enabled','tileWidth','setWaitMode','MotionTrailEnablePlayer','isPlayerSmartRushing','updateScroll','isInVehicle','center','isTileSmartJumpNonPassable','_animationCount','_followerOffsetY','canSmartRush','updateSmartJumpCooldown','ApplyFootstepSfxModifiers','2433081OGrstA','NonLandableRegions','dir6','498000PwnCyT','_motionBlurMovementEffectsAngleOffset','Game_CharacterBase_realMoveSpeed','visibleFollowers','setSmoothCameraEnabled','parseTerrainTagBasedFootprints','Game_Picture_isMapScrollLinked','iVlYn','regions','smartRush','down','Footsteps','qiNYX','delay','_pattern','drFFC','_footprints','STRUCT','SmoothCamera','kGwtY','VisuMZ_1_EventsMoveCore','createDustCloudBitmap','setFootstepSoundsEnabled','map','Ugoet','footprintOpacityAtXy','vrjNd','MotionTrailEnableEvent','isInAirship','updatePattern','actorVolumeModifier','children','WxnVs','Game_Map_setup','Game_Map_parallaxOy','max','MliZc','mmXLR','AqUhw','NonLandableTerrainTags','_dustCloudBitmap','8DwTKah','_footstepSoundsEnabled','stringify','checkEventTriggerHere','BlurDuration','AddSmoothCamera','isUsingSmoothCamera','abs','exit','shiftY','ConvertParams','areFollowersGathering','clamp','FootprintTerrainTags','TerrainTagFootprintOpacity','ConfigManager_applyData','synchronize','trim','isJumping','tileset','horz','picture','jumpHeight','pattern','#ffffff','_bushDepth','updateDustClouds','createDustCloudBasics','_smartRushSwitches','BbIlz','areMotionTrailsEnabled','offsetY','straightenDiagonal','_smartRushCooldown','getLastPluginCommandInterpreter','ForceDustCloud','lineTo','Omoar','addGeneralOptions','playFootsteps','duration','follower','hue','regionId','uaJWw','opacityStart','scaleY','hexToRgba','ImmediateCreate','kFxar','VertWalk','createFootprint','oPsdJ','startOpacity','RegionFootstepSfx','Walk','Frames','Switches','_smartBlinkDistance','drawDustCloud','isOnLadder','floorToCeiling','ssbNt','tKttT','pattern%1','meetFootprintFrames','anPus','_refresh','setupRegionTerrainTagSmartBlink','Game_Follower_initialize','ltuzl','Scene_Options_maxCommands','findTargetSprite','left','TerrainTagFootprintDuration','Game_Player_reserveTransfer','SmoothCameraSpeedChange','Settings','addMovementEffectsDustCloudCommand','_smartJumpCooldown','isSmartMoveNonViableState','_dustCloudData','updateFootprintSprite','scrolledY','registerCommand','Game_CharacterBase_straighten','page','AngleOffset','5591EZFXsp','removeChild','version','284WUiasy','updateWaitMode','kYtiy','deltaYFrom','_eventIconSprite','TMyzj','code','xiwSJ','hasStepAnime','IconSet','lvBMs','Spriteset_Map_updateTilemap','Game_Picture_y','smartRushMotionTrailData','ARRAYEVAL','initMovementEffectsDustCloud','canShowDustCloud','11XpnWrl','format','_customModified','applyMotionTrailData','canMakeFootprints','setupDuration','isTileSmartHeightJumpRegion','MotionTrail','4167297MlNtfV','FootprintsFilename','SmartJump','setFootprintsEnabled','_direction','ConfigKeys','SmartJumpNonLandEvent','_baseTexture','centerX','frameCount','_motionTrailLastRealY','ForceFootsteps','adjustY','smartJump','floor','parseRegionBasedSmartJump','update','RNToL','filters','2979036FQoBpm','MovementEffects','_pictureContainer','Sprite_Picture_updatePosition','LLIGr','_smartRush','makeData','FrameWalkModifier','_smartRushMotionTrailData','FrameDashModifier','locate','dir8','scrollRight','updateDustCloudSprite','direction','copyBitmapFrame','parallaxOx','isHeightBasedRegion','createIconSprite','actor','zjmxz','updateMotionTrailSprites','isMapScrollLinked','isTransparent','oWxKp','DFwJi','motionTrailData','YesFootstepsEvent','opacity','_parallaxZero','terrainTags','blendMode','_dustCloudSprites','updateSmartRushCooldown','iJLGR','bitmap','checkMovementEffectsStringTags','updateScrollSmoothCamera','playSmartBlinkFilterEffect','dir%1','VPuDe','NonCrashRegions','mLyAe','SmartJumpNonPassEvent','MotionTrailCreateForPlayer','cos','setupRegionTerrainTagFootstepSounds','_baseSprite','updateSmartBlinkCooldown','canSmoothScroll','isSmartRushCrashShake','anchor','TOHdK','setupMovementEffectsNotetags','addMovementEffectsFootprintsCommand','ForceSmooth','setupRegionTerrainTagSmartJump','notSmartJumpLandable','terrainTag','Sprite_Character_initialize','setupRegionTerrainTagSmartRush','enableMotionTrails','LEqZh','_motionTrailExpiredSprites','maxCommands','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','eventEnabled','reserveTransfer','MotionBlurFilter','toLowerCase','SmartBlinkNonLandTerrainTags','playFootstepSound','NoSmartRush','data','randomizeAnimationCount','RbiZY','NoDustCloud','upper\x20left','footsteps','Game_Picture_scaleX','setup','createFootprintForTarget','_wasEventScrolling','createMotionTrailContainers','filename','velocity','yIsQb','randomInt','AddFootsteps','setupPageSettings','HorzWalk','RAeQj','addMovementEffectsSmoothCameraCommand','SMART_RUSH_SHAKE_POWER_RATE','addChild','AddFootprints','_realY','beginPath','ARRAYSTR','requestAnimation','VBRTj','omPDF','smartJumpMotionTrailData','sfxVolume','setColorTone','SmartJumpLedgeRegion','parseTerrainTagBasedSmartBlink','constructor','GetDirAngle','QpbZM','isTileSmartJumpCompatible','drawCircle','parseRegionBasedFootstepSounds','scrolledX','realMoveSpeed','changeTileset','checkDustCloudChanges','setDustCloudData','Game_Picture_x','HZxNq','DustCloud','followerVariance','measureSmartBlinkDistance','_footprintMarksEnabled','_followers','origin','SmartDirMoveSpeedMod','_lastSmoothScrollY','adjustX','isTrueMapScrollLinked','_frame','bKJIz','distanceVolumeModifier','mRadialArcConstant','ttfgo','_lastSmoothScrollX','hrGMt','NoRegionFootstepSfx','CatchAll','ConfigManager_makeData','348QRoDez','bqMWL','smoothCamera','AXlIi','eCFdX','MeXxM','clearPageSettings','createDustCloudForTarget','lMrXS','MotionBlurFollower','DefaultRegions','_stopCount'];_0x3845=function(){return _0x143ef5;};return _0x3845();}VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x4ee445(0x117)]=function(_0x193fe2,_0x2c8080){const _0x2f7665=_0x4ee445;for(const _0x9b25a in _0x2c8080){if(_0x9b25a[_0x2f7665(0x34f)](/(.*):(.*)/i)){if(_0x2f7665(0x132)===_0x2f7665(0x2a3))_0x10290a[_0x2f7665(0xba)](_0x378dca);else{const _0x4201c9=String(RegExp['$1']),_0x36421a=String(RegExp['$2'])[_0x2f7665(0x347)]()['trim']();let _0x24b258,_0x336641,_0x44ba17;switch(_0x36421a){case'NUM':_0x24b258=_0x2c8080[_0x9b25a]!==''?Number(_0x2c8080[_0x9b25a]):0x0;break;case _0x2f7665(0x254):_0x336641=_0x2c8080[_0x9b25a]!==''?JSON[_0x2f7665(0x3a9)](_0x2c8080[_0x9b25a]):[],_0x24b258=_0x336641[_0x2f7665(0xfb)](_0x127175=>Number(_0x127175));break;case'EVAL':_0x24b258=_0x2c8080[_0x9b25a]!==''?eval(_0x2c8080[_0x9b25a]):null;break;case _0x2f7665(0x176):_0x336641=_0x2c8080[_0x9b25a]!==''?JSON[_0x2f7665(0x3a9)](_0x2c8080[_0x9b25a]):[],_0x24b258=_0x336641[_0x2f7665(0xfb)](_0x46e405=>eval(_0x46e405));break;case _0x2f7665(0x28b):_0x24b258=_0x2c8080[_0x9b25a]!==''?JSON[_0x2f7665(0x3a9)](_0x2c8080[_0x9b25a]):'';break;case _0x2f7665(0x245):_0x336641=_0x2c8080[_0x9b25a]!==''?JSON[_0x2f7665(0x3a9)](_0x2c8080[_0x9b25a]):[],_0x24b258=_0x336641[_0x2f7665(0xfb)](_0x22eb84=>JSON[_0x2f7665(0x3a9)](_0x22eb84));break;case'FUNC':_0x24b258=_0x2c8080[_0x9b25a]!==''?new Function(JSON[_0x2f7665(0x3a9)](_0x2c8080[_0x9b25a])):new Function('return\x200');break;case'ARRAYFUNC':_0x336641=_0x2c8080[_0x9b25a]!==''?JSON[_0x2f7665(0x3a9)](_0x2c8080[_0x9b25a]):[],_0x24b258=_0x336641[_0x2f7665(0xfb)](_0x2bf8b9=>new Function(JSON['parse'](_0x2bf8b9)));break;case _0x2f7665(0x338):_0x24b258=_0x2c8080[_0x9b25a]!==''?String(_0x2c8080[_0x9b25a]):'';break;case _0x2f7665(0x1f6):_0x336641=_0x2c8080[_0x9b25a]!==''?JSON[_0x2f7665(0x3a9)](_0x2c8080[_0x9b25a]):[],_0x24b258=_0x336641[_0x2f7665(0xfb)](_0x4360e7=>String(_0x4360e7));break;case _0x2f7665(0xf5):_0x44ba17=_0x2c8080[_0x9b25a]!==''?JSON[_0x2f7665(0x3a9)](_0x2c8080[_0x9b25a]):{},_0x24b258=VisuMZ[_0x2f7665(0x117)]({},_0x44ba17);break;case'ARRAYSTRUCT':_0x336641=_0x2c8080[_0x9b25a]!==''?JSON['parse'](_0x2c8080[_0x9b25a]):[],_0x24b258=_0x336641[_0x2f7665(0xfb)](_0x23216f=>VisuMZ[_0x2f7665(0x117)]({},JSON['parse'](_0x23216f)));break;default:continue;}_0x193fe2[_0x4201c9]=_0x24b258;}}}return _0x193fe2;},(_0x3a8eae=>{const _0x5c7ca4=_0x4ee445,_0x158e44=_0x3a8eae['name'];for(const _0xbe8db3 of dependencies){if(!Imported[_0xbe8db3]){alert(_0x5c7ca4(0x388)[_0x5c7ca4(0x17a)](_0x158e44,_0xbe8db3)),SceneManager['exit']();break;}}const _0x4ac800=_0x3a8eae[_0x5c7ca4(0xbd)];if(_0x4ac800['match'](/\[Version[ ](.*?)\]/i)){const _0x28ee57=Number(RegExp['$1']);_0x28ee57!==VisuMZ[label][_0x5c7ca4(0x167)]&&(_0x5c7ca4(0x273)!==_0x5c7ca4(0x273)?(_0x1aeaf9[_0x5c7ca4(0x117)](_0x5b235c,_0x3911a8),_0x26ac7f[_0x5c7ca4(0x325)](_0x189919[_0x5c7ca4(0x1ee)],![],![]),_0x2fd3bc[_0x5c7ca4(0x325)](_0x117be6[_0x5c7ca4(0x13f)],!![],![]),_0x558635[_0x5c7ca4(0x325)](_0x3b7322[_0x5c7ca4(0x295)],![],!![]),_0x16aa9f[_0x5c7ca4(0x325)](_0x392a5c[_0x5c7ca4(0x327)],!![],!![])):(alert(_0x5c7ca4(0x1d5)[_0x5c7ca4(0x17a)](_0x158e44,_0x28ee57)),SceneManager[_0x5c7ca4(0x115)]()));}if(_0x4ac800[_0x5c7ca4(0x34f)](/\[Tier[ ](\d+)\]/i)){const _0x593280=Number(RegExp['$1']);_0x593280<tier?'epctN'===_0x5c7ca4(0x1df)?_0x484ac1['requestAnimation']([_0xcbe122],_0x25205e):(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x158e44,_0x593280,tier)),SceneManager[_0x5c7ca4(0x115)]()):tier=Math[_0x5c7ca4(0x107)](_0x593280,tier);}VisuMZ[_0x5c7ca4(0x117)](VisuMZ[label][_0x5c7ca4(0x15a)],_0x3a8eae[_0x5c7ca4(0x35e)]);})(pluginData),PluginManager['registerCommand'](pluginData['name'],_0x4ee445(0xb9),_0x3ad2ef=>{const _0x3b76b0=_0x4ee445;VisuMZ['ConvertParams'](_0x3ad2ef,_0x3ad2ef);const _0x3493f2=_0x3ad2ef[_0x3b76b0(0x249)];$gameSystem[_0x3b76b0(0x267)]()[_0x3b76b0(0x2f3)]=_0x3493f2;}),PluginManager[_0x4ee445(0x161)](pluginData['name'],'DustCloudChangeSettings',_0x8ec70b=>{const _0x341541=_0x4ee445;VisuMZ[_0x341541(0x117)](_0x8ec70b,_0x8ec70b);const _0x1e0273=JsonEx[_0x341541(0x2c0)](_0x8ec70b);_0x1e0273[_0x341541(0x2f3)]=$gameSystem['canShowDustCloud'](),$gameSystem[_0x341541(0x209)](_0x1e0273);}),PluginManager[_0x4ee445(0x161)](pluginData[_0x4ee445(0x268)],_0x4ee445(0x36b),_0x1ebdb5=>{const _0xf3792c=_0x4ee445;VisuMZ['ConvertParams'](_0x1ebdb5,_0x1ebdb5);const _0x347471=_0x1ebdb5[_0xf3792c(0x249)];$gameSystem[_0xf3792c(0x184)](_0x347471);}),PluginManager[_0x4ee445(0x161)](pluginData[_0x4ee445(0x268)],_0x4ee445(0x353),_0x31489d=>{const _0x3e4c98=_0x4ee445;VisuMZ['ConvertParams'](_0x31489d,_0x31489d);const _0x7d0dfa=_0x31489d[_0x3e4c98(0x249)];$gameSystem[_0x3e4c98(0xfa)](_0x7d0dfa);}),PluginManager[_0x4ee445(0x161)](pluginData['name'],'MotionBlurPlayer',_0x550cfa=>{const _0x1439b0=_0x4ee445;if(!SceneManager[_0x1439b0(0x3a6)]())return;const _0x40166f=SceneManager['_scene'][_0x1439b0(0x233)];if(!_0x40166f)return;VisuMZ[_0x1439b0(0x117)](_0x550cfa,_0x550cfa);const _0x25824d=_0x550cfa['Duration']||0x1,_0x3170e5=_0x550cfa[_0x1439b0(0x164)]||0x0;let _0x20185a=[$gamePlayer];_0x550cfa['ApplyFollowers']&&('iPLFz'===_0x1439b0(0x1ac)?this[_0x1439b0(0x199)][_0x1439b0(0x328)]=_0x121f44['$1']['split'](',')[_0x1439b0(0xfb)](_0x70e77c=>(_0x43e8b1(_0x70e77c)||0x0)['clamp'](0x0,0x7)):_0x20185a=_0x20185a['concat']($gamePlayer[_0x1439b0(0x355)]()[_0x1439b0(0x1dd)]()));for(const _0x56f7b5 of _0x20185a){if(_0x1439b0(0x360)===_0x1439b0(0x360)){if(!_0x56f7b5)continue;const _0x1cde4c=_0x40166f[_0x1439b0(0x155)](_0x56f7b5);_0x1cde4c&&_0x1cde4c['startMotionBlurEffect'](_0x25824d,_0x3170e5);}else{_0x2f1a5c['match'](_0x4fe3e8[_0x1439b0(0x157)]);const _0x5888dc=_0x502cbb(_0x2f3ab3['$1'])[_0x1439b0(0x119)](0x0,0xff),_0x162287=_0x2af5c3[_0x1439b0(0x107)](0x1,_0x41628b(_0x1706aa['$2']));this[_0x1439b0(0xf4)][_0x1439b0(0x135)][_0x1439b0(0x1b2)][_0x5888dc]=_0x162287;}}}),PluginManager[_0x4ee445(0x161)](pluginData['name'],_0x4ee445(0x229),_0x22c681=>{const _0x2c7602=_0x4ee445;if(!SceneManager['isSceneMap']())return;const _0x466d29=SceneManager[_0x2c7602(0x345)][_0x2c7602(0x233)];if(!_0x466d29)return;VisuMZ[_0x2c7602(0x117)](_0x22c681,_0x22c681);const _0x60ea73=_0x22c681['Duration']||0x1,_0x43a64e=_0x22c681[_0x2c7602(0x164)]||0x0,_0xc68a71=_0x22c681['Index'];let _0x5c21a2=_0xc68a71[_0x2c7602(0xfb)](_0x5b046a=>$gamePlayer['followers']()['follower'](_0x5b046a));for(const _0x5701fa of _0x5c21a2){if(!_0x5701fa)continue;const _0x5cda92=_0x466d29[_0x2c7602(0x155)](_0x5701fa);if(_0x5cda92){if(_0x2c7602(0x285)!==_0x2c7602(0x3bc))_0x5cda92[_0x2c7602(0x2f5)](_0x60ea73,_0x43a64e);else{const _0x2d86d3=_0x45d669[_0x2c7602(0xd4)](),_0xd9c1f6=_0x21cc08[_0x2c7602(0x2ad)]();this['x']=_0x35d974[_0x2c7602(0x18f)](_0x56a43e[_0x2c7602(0x214)](this[_0x2c7602(0x257)])*_0x2d86d3+_0x2d86d3/0x2),this['y']=_0x1beca3[_0x2c7602(0x18f)](_0x5a7690[_0x2c7602(0x18d)](this[_0x2c7602(0x1f4)])*_0xd9c1f6+_0xd9c1f6),this['y']-=this['_shiftY']+this[_0x2c7602(0xcb)]+0.001;}}}}),PluginManager[_0x4ee445(0x161)](pluginData[_0x4ee445(0x268)],_0x4ee445(0x28d),_0xec4a13=>{const _0x47b848=_0x4ee445;if(!SceneManager[_0x47b848(0x3a6)]())return;const _0x5b90c1=SceneManager[_0x47b848(0x345)][_0x47b848(0x233)];if(!_0x5b90c1)return;VisuMZ[_0x47b848(0x117)](_0xec4a13,_0xec4a13);const _0x471c01=_0xec4a13[_0x47b848(0x2a0)]||0x1,_0x41a8c8=_0xec4a13[_0x47b848(0x164)]||0x0,_0x356a26=_0xec4a13['EventID'],_0x4339c9=$gameTemp['getLastPluginCommandInterpreter']();let _0x2ed5d7=_0x356a26[_0x47b848(0xfb)](_0x18da96=>$gameMap['event'](_0x18da96||_0x4339c9[_0x47b848(0x2e1)]()));for(const _0x5ef0dd of _0x2ed5d7){if(!_0x5ef0dd)continue;const _0x15e7dd=_0x5b90c1[_0x47b848(0x155)](_0x5ef0dd);_0x15e7dd&&_0x15e7dd[_0x47b848(0x2f5)](_0x471c01,_0x41a8c8);}}),PluginManager[_0x4ee445(0x161)](pluginData[_0x4ee445(0x268)],_0x4ee445(0x1c0),_0x4ba467=>{const _0x58358a=_0x4ee445;if(!SceneManager[_0x58358a(0x3a6)]())return;const _0x22a9b9=SceneManager[_0x58358a(0x345)]['_spriteset'];if(!_0x22a9b9)return;VisuMZ[_0x58358a(0x117)](_0x4ba467,_0x4ba467);let _0x4e214d=[$gamePlayer];_0x4ba467[_0x58358a(0x32d)]&&(_0x4e214d=_0x4e214d[_0x58358a(0x2be)]($gamePlayer[_0x58358a(0x355)]()[_0x58358a(0x1dd)]()));for(const _0x558a1b of _0x4e214d){if(!_0x558a1b)continue;const _0x58edda=_0x22a9b9[_0x58358a(0x155)](_0x558a1b);if(_0x58edda){if(_0x58358a(0x284)!==_0x58358a(0xb7))_0x58edda[_0x58358a(0x334)]();else{if(!_0x4a1674[_0x58358a(0xcc)])return![];const _0x5ca669=this[_0x58358a(0x1a2)](),_0x5f2ca9=this['x'],_0x5b40a8=this['y'];return _0x52f568[_0x58358a(0x22f)](_0x5f2ca9,_0x5b40a8,_0x5ca669);}}}}),PluginManager[_0x4ee445(0x161)](pluginData[_0x4ee445(0x268)],_0x4ee445(0x230),_0x2205b4=>{const _0x426c01=_0x4ee445;if(!SceneManager['isSceneMap']())return;const _0x20c629=SceneManager[_0x426c01(0x345)][_0x426c01(0x233)];if(!_0x20c629)return;VisuMZ['ConvertParams'](_0x2205b4,_0x2205b4);const _0x4f891e=_0x2205b4['Index'];let _0x1989b6=_0x4f891e[_0x426c01(0xfb)](_0x446806=>$gamePlayer[_0x426c01(0x355)]()['follower'](_0x446806));for(const _0x239bc9 of _0x1989b6){if(!_0x239bc9)continue;const _0x53f2a9=_0x20c629[_0x426c01(0x155)](_0x239bc9);_0x53f2a9&&_0x53f2a9[_0x426c01(0x334)]();}}),PluginManager[_0x4ee445(0x161)](pluginData[_0x4ee445(0x268)],_0x4ee445(0x24d),_0x23e091=>{const _0x616a6e=_0x4ee445;if(!SceneManager[_0x616a6e(0x3a6)]())return;const _0xe709f8=SceneManager[_0x616a6e(0x345)][_0x616a6e(0x233)];if(!_0xe709f8)return;VisuMZ[_0x616a6e(0x117)](_0x23e091,_0x23e091);const _0x78900f=_0x23e091['EventID'],_0x15d3e2=$gameTemp['getLastPluginCommandInterpreter']();let _0x440c81=_0x78900f[_0x616a6e(0xfb)](_0x50e1f0=>$gameMap[_0x616a6e(0x329)](_0x50e1f0||_0x15d3e2[_0x616a6e(0x2e1)]()));for(const _0x55e04f of _0x440c81){if(_0x616a6e(0x16d)!=='TMyzj'){const _0x8dd32f=_0x24f25a-_0x3d177d,_0x34b1c7=_0x3be9df*_0x1d9be1,_0x3b367f=_0x8dd32f/(_0x34b1c7||0.01);_0x84a045[_0x616a6e(0x352)](_0x3b367f);}else{if(!_0x55e04f)continue;const _0x4b8a29=_0xe709f8['findTargetSprite'](_0x55e04f);_0x4b8a29&&_0x4b8a29[_0x616a6e(0x334)]();}}}),PluginManager[_0x4ee445(0x161)](pluginData['name'],_0x4ee445(0xd6),_0x31013f=>{const _0x1e6d46=_0x4ee445;if(!SceneManager[_0x1e6d46(0x3a6)]())return;VisuMZ['ConvertParams'](_0x31013f,_0x31013f);const _0x3de7b0=_0x31013f[_0x1e6d46(0x249)],_0x630454=_0x31013f['ImmediateCreate'];let _0x18c122=[$gamePlayer];if(_0x31013f[_0x1e6d46(0x32d)]){if(_0x1e6d46(0x201)!==_0x1e6d46(0x264))_0x18c122=_0x18c122[_0x1e6d46(0x2be)]($gamePlayer[_0x1e6d46(0x355)]()['data']());else{const _0x2e5605=this[_0x1e6d46(0x2fd)]['HeightBasedRegions'][_0x1e6d46(0xc8)](_0x1e6a89);return _0x2e5605<=0x0;}}for(const _0xc40127 of _0x18c122){if('kFxar'!==_0x1e6d46(0x13e))return this['smartRushMotionTrailData']();else{if(!_0xc40127)continue;_0xc40127[_0x1e6d46(0x1d1)](_0x3de7b0,_0x630454);}}}),PluginManager[_0x4ee445(0x161)](pluginData[_0x4ee445(0x268)],_0x4ee445(0x2ac),_0x132d0b=>{const _0x9cea73=_0x4ee445;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x9cea73(0x117)](_0x132d0b,_0x132d0b);const _0x52f8d5=_0x132d0b[_0x9cea73(0x249)],_0x5ce078=_0x132d0b[_0x9cea73(0x13d)],_0x33935a=_0x132d0b[_0x9cea73(0x270)];let _0x1a0be0=_0x33935a[_0x9cea73(0xfb)](_0xae811e=>$gamePlayer[_0x9cea73(0x355)]()[_0x9cea73(0x136)](_0xae811e));for(const _0x25f45b of _0x1a0be0){if(_0x9cea73(0x365)===_0x9cea73(0x365)){if(!_0x25f45b)continue;_0x25f45b[_0x9cea73(0x1d1)](_0x52f8d5,_0x5ce078);}else{const _0x306701=_0xf79e14[_0x9cea73(0x195)]['ConfigManager_makeData']['call'](this);for(const _0xf7d6d4 of _0x4f5de8[_0x9cea73(0x195)][_0x9cea73(0x186)]){_0x306701[_0xf7d6d4]=this[_0xf7d6d4];}return _0x306701;}}}),PluginManager[_0x4ee445(0x161)](pluginData[_0x4ee445(0x268)],_0x4ee445(0xff),_0x45e80b=>{const _0x1f5881=_0x4ee445;if(!SceneManager[_0x1f5881(0x3a6)]())return;VisuMZ[_0x1f5881(0x117)](_0x45e80b,_0x45e80b);const _0x5d7fc4=_0x45e80b[_0x1f5881(0x249)],_0x5dae9a=_0x45e80b[_0x1f5881(0x13d)],_0x3c32f5=_0x45e80b[_0x1f5881(0x277)],_0x454682=$gameTemp[_0x1f5881(0x12f)]();let _0x563d88=_0x3c32f5['map'](_0x3c2091=>$gameMap['event'](_0x3c2091||_0x454682[_0x1f5881(0x2e1)]()));for(const _0x127bfa of _0x563d88){if(!_0x127bfa)continue;_0x127bfa[_0x1f5881(0x1d1)](_0x5d7fc4,_0x5dae9a);}}),PluginManager[_0x4ee445(0x161)](pluginData[_0x4ee445(0x268)],_0x4ee445(0x3b7),_0x518a2a=>{const _0x53b5e3=_0x4ee445;if(!SceneManager[_0x53b5e3(0x3a6)]())return;VisuMZ[_0x53b5e3(0x117)](_0x518a2a,_0x518a2a);const _0x468f64={'enabled':![],'delay':_0x518a2a[_0x53b5e3(0xf1)]||0x1,'duration':_0x518a2a[_0x53b5e3(0x135)]||0x1,'hue':_0x518a2a['hue']||0x0,'opacityStart':_0x518a2a[_0x53b5e3(0x13a)]||0x0,'tone':_0x518a2a[_0x53b5e3(0x39c)]||[0x0,0x0,0x0,0x0]};let _0x4ac4f8=[$gamePlayer];if(_0x518a2a[_0x53b5e3(0x32d)]){if(_0x53b5e3(0x274)===_0x53b5e3(0x274))_0x4ac4f8=_0x4ac4f8[_0x53b5e3(0x2be)]($gamePlayer[_0x53b5e3(0x355)]()['data']());else{let _0x3ea3a0='';if(/^#([A-Fa-f0-9]{3}){1,2}$/[_0x53b5e3(0x2e6)](_0x1a8c16)){_0x3ea3a0=_0x5e105c[_0x53b5e3(0x34d)](0x1)[_0x53b5e3(0x27f)]('');_0x3ea3a0[_0x53b5e3(0xc5)]===0x3&&(_0x3ea3a0=[_0x3ea3a0[0x0],_0x3ea3a0[0x0],_0x3ea3a0[0x1],_0x3ea3a0[0x1],_0x3ea3a0[0x2],_0x3ea3a0[0x2]]);while(_0x3ea3a0[_0x53b5e3(0xc5)]>0x6)_0x3ea3a0[_0x53b5e3(0x33f)]();return _0x3ea3a0='0x'+_0x3ea3a0[_0x53b5e3(0x2fb)](''),'rgba('+[(_0x3ea3a0>>0x10&0xff)[_0x53b5e3(0x119)](0x0,0xff),(_0x3ea3a0>>0x8&0xff)[_0x53b5e3(0x119)](0x0,0xff),(_0x3ea3a0&0xff)[_0x53b5e3(0x119)](0x0,0xff)][_0x53b5e3(0x2fb)](',')+','+_0x528a0e['clamp'](0x0,0x1)+')';}else return'rgba(0,0,0,0)';}}for(const _0x654dcf of _0x4ac4f8){if(!_0x654dcf)continue;_0x654dcf['setMotionTrailSettings'](_0x468f64);}}),PluginManager['registerCommand'](pluginData[_0x4ee445(0x268)],_0x4ee445(0x2c7),_0x5cb5de=>{const _0x33be4e=_0x4ee445;if(!SceneManager['isSceneMap']())return;VisuMZ[_0x33be4e(0x117)](_0x5cb5de,_0x5cb5de);const _0x2be3ba={'enabled':![],'delay':_0x5cb5de['delay']||0x1,'duration':_0x5cb5de['duration']||0x1,'hue':_0x5cb5de['hue']||0x0,'opacityStart':_0x5cb5de[_0x33be4e(0x13a)]||0x0,'tone':_0x5cb5de[_0x33be4e(0x39c)]||[0x0,0x0,0x0,0x0]},_0x5aba1c=_0x5cb5de[_0x33be4e(0x270)];let _0x48c05c=_0x5aba1c[_0x33be4e(0xfb)](_0xe12925=>$gamePlayer[_0x33be4e(0x355)]()[_0x33be4e(0x136)](_0xe12925));for(const _0x473fbb of _0x48c05c){if(_0x33be4e(0x109)==='pNbXZ'){const _0x32531a=this[_0x33be4e(0x155)](_0x278fd5);if(!_0x32531a)return;this[_0x33be4e(0x208)]();const _0x5dcc46=this['_dustCloudData'],_0x5b65bf=_0x5dcc46[_0x33be4e(0x2a1)],_0x512336=new _0x1eaa97();_0x512336[_0x33be4e(0x1b7)]=this[_0x33be4e(0x10c)],_0x512336[_0x33be4e(0x1b0)]=_0x5dcc46[_0x33be4e(0x142)],_0x512336[_0x33be4e(0xc7)]=_0x5dcc46[_0x33be4e(0x332)],_0x512336[_0x33be4e(0x1c7)]['x']=0.5,_0x512336[_0x33be4e(0x1c7)]['y']=0x1,_0x512336[_0x33be4e(0xcd)]['x']=(_0x3d7afc[_0x33be4e(0x292)]()*_0x5b65bf)[_0x33be4e(0x119)](0.01,0.99),_0x512336[_0x33be4e(0xcd)]['y']=(_0x3110f8['random']()*_0x5b65bf)[_0x33be4e(0x119)](0.01,0.99),_0x512336[_0x33be4e(0x2cb)]=0x1-(_0x45ec8e['random']()*_0x5b65bf*0x2)[_0x33be4e(0x119)](0x0,0.8),_0x512336[_0x33be4e(0x326)]=0x1-(_0x26b43f[_0x33be4e(0x292)]()*_0x5b65bf*0x2)[_0x33be4e(0x119)](0x0,0.8);const _0x4e9e32=0.25,_0x4eeade=0.05;_0x512336[_0x33be4e(0x257)]=_0x16be0e['_realX']+_0x43ba90[_0x33be4e(0x292)]()*_0x4e9e32+_0x3e7132[_0x33be4e(0x292)]()*_0x4e9e32-_0x4e9e32,_0x512336[_0x33be4e(0x1f4)]=_0x2bda40['_realY']+_0x383d0b['random']()*_0x4eeade+_0x5a4585['random']()*_0x4eeade-_0x4eeade,_0x512336['z']=0x3,this[_0x33be4e(0x1b4)][_0x33be4e(0x363)](_0x512336),this[_0x33be4e(0xb5)]['addChild'](_0x512336);}else{if(!_0x473fbb)continue;_0x473fbb[_0x33be4e(0x2e8)](_0x2be3ba);}}}),PluginManager[_0x4ee445(0x161)](pluginData[_0x4ee445(0x268)],_0x4ee445(0x28a),_0x49bbb7=>{const _0x5853f5=_0x4ee445;if(!SceneManager[_0x5853f5(0x3a6)]())return;VisuMZ[_0x5853f5(0x117)](_0x49bbb7,_0x49bbb7);const _0x606004={'enabled':![],'delay':_0x49bbb7['delay']||0x1,'duration':_0x49bbb7[_0x5853f5(0x135)]||0x1,'hue':_0x49bbb7[_0x5853f5(0x137)]||0x0,'opacityStart':_0x49bbb7[_0x5853f5(0x13a)]||0x0,'tone':_0x49bbb7[_0x5853f5(0x39c)]||[0x0,0x0,0x0,0x0]},_0x4e17c7=_0x49bbb7['EventID'],_0x10d819=$gameTemp['getLastPluginCommandInterpreter']();let _0x1bc727=_0x4e17c7[_0x5853f5(0xfb)](_0x3d82b4=>$gameMap[_0x5853f5(0x329)](_0x3d82b4||_0x10d819['eventId']()));for(const _0x36bea8 of _0x1bc727){if(_0x5853f5(0x275)===_0x5853f5(0x304))_0x4fdd66[_0x5853f5(0x195)][_0x5853f5(0x197)][_0x5853f5(0x2c3)](this),this[_0x5853f5(0x122)]()[_0x5853f5(0x215)]()&&this[_0x5853f5(0x28c)]();else{if(!_0x36bea8)continue;_0x36bea8[_0x5853f5(0x2e8)](_0x606004);}}}),PluginManager[_0x4ee445(0x161)](pluginData[_0x4ee445(0x268)],_0x4ee445(0x212),_0x11f70b=>{const _0x46401b=_0x4ee445;if(!SceneManager[_0x46401b(0x3a6)]())return;VisuMZ[_0x46401b(0x117)](_0x11f70b,_0x11f70b);const _0x3fa6ea={'slower':-0x1,'normal':0x0,'faster':0x1};for(let _0x4e15df=0x1;_0x4e15df<0xa;_0x4e15df++){if(_0x4e15df===0x5)continue;const _0xd31489=_0x46401b(0x1bb)[_0x46401b(0x17a)](_0x4e15df),_0x16ae96=(_0x11f70b[_0xd31489]||'normal')[_0x46401b(0x1d9)]()[_0x46401b(0x11e)](),_0x4f1228=_0x3fa6ea[_0x16ae96]||0x0;$gameSystem[_0x46401b(0x2c9)](_0x4e15df,_0x4f1228);}}),PluginManager['registerCommand'](pluginData[_0x4ee445(0x268)],_0x4ee445(0xc1),_0x5a279=>{const _0x22daf7=_0x4ee445;if(!SceneManager[_0x22daf7(0x3a6)]())return;VisuMZ[_0x22daf7(0x117)](_0x5a279,_0x5a279);const _0x38351c=_0x5a279[_0x22daf7(0x2f9)]||0x1,_0x1269ac=_0x5a279['Cooldown']||0x1,_0x3a0d60=_0x5a279[_0x22daf7(0x30e)]||0x0,_0x77b547={'NonLandableRegions':_0x5a279[_0x22daf7(0xe2)][_0x22daf7(0x2d6)](),'NonLandableTerrainTags':_0x5a279[_0x22daf7(0x10b)][_0x22daf7(0x2d6)](),'NonPassableRegions':_0x5a279[_0x22daf7(0x35c)][_0x22daf7(0x2d6)](),'NonPassableTerrainTags':_0x5a279['NonPassableTerrainTags']['clone']()},_0x2549b7=_0x5a279['AnimationID']||0x0,_0x52119e=_0x5a279[_0x22daf7(0x180)]||{'enabled':![]},_0x349c47={'name':_0x5a279[_0x22daf7(0x3a2)]||'','volume':_0x5a279[_0x22daf7(0x1fb)]||0x0,'pitch':_0x5a279[_0x22daf7(0x395)]||0x0,'pan':_0x5a279[_0x22daf7(0x336)]||0x0};$gamePlayer[_0x22daf7(0x29e)](_0x38351c,_0x1269ac,_0x77b547,_0x52119e)&&('lXkHe'===_0x22daf7(0x35d)?(_0x349c47[_0x22daf7(0x268)]!==''&&AudioManager[_0x22daf7(0xba)](_0x349c47),_0x2549b7>0x0&&$gameTemp[_0x22daf7(0x1f7)]([$gamePlayer],_0x2549b7),_0x3a0d60>0x0&&SceneManager[_0x22daf7(0x345)][_0x22daf7(0x2e3)](_0x3a0d60)):(_0xc7c939[_0x22daf7(0x195)][_0x22daf7(0x162)][_0x22daf7(0x2c3)](this),this[_0x22daf7(0x1de)]()));}),PluginManager[_0x4ee445(0x161)](pluginData[_0x4ee445(0x268)],'SmartJumpDistance',_0x2a33d9=>{const _0x15103d=_0x4ee445;if(!SceneManager[_0x15103d(0x3a6)]())return;VisuMZ[_0x15103d(0x117)](_0x2a33d9,_0x2a33d9);const _0x2eb93d=_0x2a33d9['Distance']||0x1,_0xd2b6f=_0x2a33d9['Cooldown']||0x1,_0x334719=_0x2a33d9[_0x15103d(0x30e)]||0x0,_0x545549={'NonLandableRegions':_0x2a33d9[_0x15103d(0xe2)][_0x15103d(0x2d6)](),'NonLandableTerrainTags':_0x2a33d9['NonLandableTerrainTags'][_0x15103d(0x2d6)](),'NonPassableRegions':_0x2a33d9[_0x15103d(0x35c)][_0x15103d(0x2d6)](),'NonPassableTerrainTags':_0x2a33d9[_0x15103d(0x354)][_0x15103d(0x2d6)]()},_0x68d5b4=_0x2a33d9['AnimationID']||0x0,_0xfd222b=_0x2a33d9[_0x15103d(0x180)]||{'enabled':![]},_0x46f12d={'name':_0x2a33d9['sfxName']||'','volume':_0x2a33d9['sfxVolume']||0x0,'pitch':_0x2a33d9['sfxPitch']||0x0,'pan':_0x2a33d9[_0x15103d(0x336)]||0x0};if($gamePlayer[_0x15103d(0x18e)](_0x2eb93d,_0xd2b6f,_0x545549,_0xfd222b)){_0x46f12d['name']!==''&&AudioManager[_0x15103d(0xba)](_0x46f12d);if(_0x68d5b4>0x0){if(_0x15103d(0xce)===_0x15103d(0x3a0))return this[_0x15103d(0x3ae)]||{'enabled':![]};else $gameTemp['requestAnimation']([$gamePlayer],_0x68d5b4);}_0x334719>0x0&&SceneManager[_0x15103d(0x345)][_0x15103d(0x2e3)](_0x334719);}}),PluginManager['registerCommand'](pluginData[_0x4ee445(0x268)],'SmartRushDistance',_0xe7b473=>{const _0x25aee8=_0x4ee445;if(!SceneManager[_0x25aee8(0x3a6)]())return;VisuMZ[_0x25aee8(0x117)](_0xe7b473,_0xe7b473);const _0x4544db=_0xe7b473[_0x25aee8(0x2f9)]||0x1,_0x94c148=_0xe7b473[_0x25aee8(0x342)]||0x1,_0x11bc1d=_0xe7b473[_0x25aee8(0x30e)]||0x0,_0x5d8127=_0xe7b473[_0x25aee8(0x146)]||[],_0x35d048=_0xe7b473[_0x25aee8(0x297)]||0x1,_0x1b4d7b=_0xe7b473[_0x25aee8(0x27e)]||0x0,_0x57f5b4=_0xe7b473[_0x25aee8(0x180)]||{'enabled':![]},_0x2e12c3={'name':_0xe7b473['sfxName']||'','volume':_0xe7b473[_0x25aee8(0x1fb)]||0x0,'pitch':_0xe7b473[_0x25aee8(0x395)]||0x0,'pan':_0xe7b473[_0x25aee8(0x336)]||0x0};if($gamePlayer[_0x25aee8(0xed)](_0x4544db,_0x94c148,_0x5d8127,_0x35d048,_0x57f5b4)){if(_0x25aee8(0x29d)!==_0x25aee8(0x390)){if(_0x2e12c3['name']!==''){if(_0x25aee8(0x344)!=='loazN')AudioManager['playSe'](_0x2e12c3);else return![];}_0x1b4d7b>0x0&&$gameTemp[_0x25aee8(0x1f7)]([$gamePlayer],_0x1b4d7b);if(_0x11bc1d>0x0){if('fcfjR'==='ZhlUn'){_0x41ffe1=_0x2fcea9||{'NonLandableRegions':[],'NonLandableTerrainTags':[],'NonPassableRegions':[],'NonPassableTerrainTags':[]},this[_0x25aee8(0x25d)]=_0x4a3bb3[_0x25aee8(0x2c0)](_0x2be57b);if(!this[_0x25aee8(0x322)]())return![];const _0x266282=_0x4d0378[_0x25aee8(0x195)][_0x25aee8(0x15a)]['SmartJump'];return this['straightenFacedDirection'](_0x266282),_0x5c4d6f=this['measureSmartJumpDistance'](_0x5c47a0),this[_0x25aee8(0x26d)]=!![],this[_0x25aee8(0x15c)]=_0x307762||0x1,this[_0x25aee8(0x3ae)]=_0x5c9408['makeDeepCopy'](_0x1444f7),this['startSmartJump'](_0x10e0f2),!![];}else SceneManager[_0x25aee8(0x345)][_0x25aee8(0x2e3)](_0x11bc1d);}}else _0x51899f*=_0x2862a5['zoomScale']();}}),PluginManager[_0x4ee445(0x161)](pluginData[_0x4ee445(0x268)],_0x4ee445(0x33e),_0x337959=>{const _0x15dee3=_0x4ee445;if(!SceneManager[_0x15dee3(0x3a6)]())return;const _0x58a064=$gameTemp[_0x15dee3(0x12f)]();_0x58a064['setWaitMode'](_0x15dee3(0x29e));}),PluginManager['registerCommand'](pluginData[_0x4ee445(0x268)],'SmartMoveWaitForSmartJump',_0x5ccf09=>{const _0x4055ef=_0x4ee445;if(!SceneManager[_0x4055ef(0x3a6)]())return;const _0x337344=$gameTemp[_0x4055ef(0x12f)]();_0x337344[_0x4055ef(0xd5)]('smartJump');}),PluginManager['registerCommand'](pluginData['name'],_0x4ee445(0x26a),_0x5cc3ba=>{const _0x44d023=_0x4ee445;if(!SceneManager['isSceneMap']())return;const _0x475f84=$gameTemp[_0x44d023(0x12f)]();_0x475f84[_0x44d023(0xd5)](_0x44d023(0xed));}),PluginManager['registerCommand'](pluginData[_0x4ee445(0x268)],_0x4ee445(0x31a),_0x1c7ad3=>{const _0x25c052=_0x4ee445;VisuMZ[_0x25c052(0x117)](_0x1c7ad3,_0x1c7ad3);const _0x2d999f=_0x1c7ad3[_0x25c052(0x249)];$gameSystem[_0x25c052(0xe8)](_0x2d999f);}),PluginManager[_0x4ee445(0x161)](pluginData[_0x4ee445(0x268)],_0x4ee445(0x159),_0x195bc3=>{const _0x458003=_0x4ee445;VisuMZ[_0x458003(0x117)](_0x195bc3,_0x195bc3),$gameSystem[_0x458003(0x325)](_0x195bc3[_0x458003(0x1ee)],![],![]),$gameSystem[_0x458003(0x325)](_0x195bc3[_0x458003(0x13f)],!![],![]),$gameSystem[_0x458003(0x325)](_0x195bc3[_0x458003(0x295)],![],!![]),$gameSystem[_0x458003(0x325)](_0x195bc3[_0x458003(0x327)],!![],!![]);}),VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x2d4)]={'CatchAll':/(?:SMOOTH|DASH|FOOT|REGION|TERRAIN|SMART|JUMP)>/i,'ForceSmooth':/<FORCE SMOOTH (?:CAMERA|SCROLL)>/i,'NoSmooth':/<NO SMOOTH (?:CAMERA|SCROLL)>/i,'ForceDustCloud':/<FORCE (?:DASH|DUST) (?:CLOUD|CLOUDS)>/i,'NoDustCloud':/<NO (?:DASH|DUST) (?:CLOUD|CLOUDS)>/i,'ForceFootsteps':/<FORCE (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'NoFootsteps':/<NO (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'RegionFootstepSfx':/<REGION (\d+) FOOTSTEP SOUND:[ ](.*)>/gi,'NoRegionFootstepSfx':/<NO REGION (\d+) FOOTSTEP SOUND>/gi,'FootprintRegions':/<FOOTPRINT (?:REGION|REGIONS):[ ](.*?)>/i,'NonFootprintRegions':/<NO FOOTPRINT (?:REGION|REGIONS):[ ](.*?)>/i,'RegionFootprintOpacity':/<REGION (\d+) FOOTPRINT OPACITY:[ ](\d+)>/gi,'RegionFootprintDuration':/<REGION (\d+) FOOTPRINT DURATION:[ ](\d+)>/gi,'NoSmartRush':/<NO SMART RUSH>/i,'SmartRushAntiCrashRegions':/<SMART RUSH NON-CRASH (?:REGION|REGIONS):[ ](.*?)>/i,'NoSmartBlink':/<NO SMART BLINK>/i,'SmartBlinkNonLandRegions':/<SMART BLINK NON-LAND (?:REGION|REGIONS):[ ](.*?)>/i,'SmartBlinkNonPassRegions':/<SMART BLINK NON-PASS (?:REGION|REGIONS):[ ](.*?)>/i,'NoSmartJump':/<NO SMART JUMP>/i,'SmartJumpNonLandRegions':/<SMART JUMP NON-LAND (?:REGION|REGIONS):[ ](.*?)>/i,'SmartJumpNonPassRegions':/<SMART JUMP NON-PASS (?:REGION|REGIONS):[ ](.*?)>/i,'SmartJumpHeightBasedRegions':/<SMART JUMP HEIGHT-BASED (?:REGION|REGIONS):[ ](.*?)>/i,'TerrainTagFootstepSfx':/<TERRAIN TAG (\d+) (?:FOOTSTEP SOUND|FOOTSTEPS):[ ](.*)>/gi,'NoTerrainTagFootstepSfx':/<NO TERRAIN TAG (\d+) (?:FOOTSTEP SOUND|FOOTSTEPS)>/gi,'FootprintTerrainTags':/<FOOTPRINT TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'NonFootprintTerrainTags':/<NO FOOTPRINT TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'TerrainTagFootprintOpacity':/<TERRAIN TAG (\d+) FOOTPRINT OPACITY:[ ](\d+)>/gi,'TerrainTagFootprintDuration':/<TERRAIN TAG (\d+) FOOTPRINT DURATION:[ ](\d+)>/gi,'SmartRushAntiCrashTerrainTags':/<SMART RUSH NON-CRASH TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartBlinkNonLandTerrainTags':/<SMART BLINK NON-LAND TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartBlinkNonPassTerrainTags':/<SMART BLINK NON-PASS TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartJumpNonLandTerrainTags':/<SMART JUMP NON-LAND TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'SmartJumpNonPassTerrainTags':/<SMART JUMP NON-PASS TERRAIN (?:TAG|TAGS):[ ](.*?)>/i,'YesFootstepsEvent':/<(?:ALLOW|ENABLE) (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'NoFootstepsEvent':/<(?:NO|DISABLE) (?:FOOTSTEPS|FOOTSTEP SOUNDS)>/i,'FootstepsVolRate':/<(?:FOOTSTEPS|FOOTSTEP SOUNDS) VOLUME:[ ](\d+)([%％])>/i,'FootstepsPitchRate':/<(?:FOOTSTEPS|FOOTSTEP SOUNDS) PITCH:[ ](\d+)([%％])>/i,'FootstepsFrames':/<(?:FOOTSTEPS|FOOTSTEP SOUNDS) (?:FRAME|FRAMES):[ ](.*?)>/i,'YesFootprintsEvent':/<(?:ALLOW|ENABLE) FOOTPRINTS>/i,'NoFootprintsEvent':/<(?:NO|DISABLE) FOOTPRINTS>/i,'FootprintsFilename':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) FILENAME:[ ](.*?)>/gi,'FootprintsWidth':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) WIDTH:[ ](\d+)>/gi,'FootprintsHeight':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) HEIGHT:[ ](\d+)>/gi,'FootprintsOffset':/<(?:FOOTPRINT|FOOTPRINTS) (.*?) (?:FRAME|PATTERN) (\d+) OFFSET:[ ](.*?)>/gi,'SmartJumpNonLandEvent':/<(?:SMART JUMP NON-LAND|ILLEGAL JUMP)>/i,'SmartJumpNonPassEvent':/<(?:SMART JUMP NON-PASS|ILLEGAL JUMP)>/i},VisuMZ[_0x4ee445(0x195)]['ConfigKeys']=[_0x4ee445(0x316),_0x4ee445(0x366),'footsteps',_0x4ee445(0x222)],((()=>{const _0x5549a7=_0x4ee445;for(const _0x5b690c of VisuMZ['MovementEffects'][_0x5549a7(0x186)]){ConfigManager[_0x5b690c]=!![];}})()),VisuMZ['MovementEffects'][_0x4ee445(0x21f)]=ConfigManager[_0x4ee445(0x19a)],ConfigManager[_0x4ee445(0x19a)]=function(){const _0x5d041e=_0x4ee445,_0x3c6653=VisuMZ['MovementEffects'][_0x5d041e(0x21f)]['call'](this);for(const _0x17b52d of VisuMZ['MovementEffects'][_0x5d041e(0x186)]){_0x3c6653[_0x17b52d]=this[_0x17b52d];}return _0x3c6653;},VisuMZ['MovementEffects']['ConfigManager_applyData']=ConfigManager[_0x4ee445(0x38f)],ConfigManager[_0x4ee445(0x38f)]=function(_0x3698ce){const _0x2966d1=_0x4ee445;VisuMZ[_0x2966d1(0x195)][_0x2966d1(0x11c)][_0x2966d1(0x2c3)](this,_0x3698ce);for(const _0x3acb9e of VisuMZ['MovementEffects'][_0x2966d1(0x186)]){this['readFlag'](_0x3698ce,_0x3acb9e,!![]);}},TextManager['MovementEffectsOptions']={'DustCloud':VisuMZ[_0x4ee445(0x195)]['Settings'][_0x4ee445(0x30a)][_0x4ee445(0x25a)],'Footprints':VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x15a)][_0x4ee445(0x30a)][_0x4ee445(0x289)],'Footsteps':VisuMZ['MovementEffects'][_0x4ee445(0x15a)][_0x4ee445(0x30a)]['FootstepsName'],'SmoothCamera':VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x15a)]['Options']['SmoothCameraName']},VisuMZ['MovementEffects'][_0x4ee445(0x154)]=Scene_Options[_0x4ee445(0x30f)][_0x4ee445(0x1d4)],Scene_Options['prototype']['maxCommands']=function(){const _0x34042d=_0x4ee445;let _0x48cf85=VisuMZ[_0x34042d(0x195)][_0x34042d(0x154)][_0x34042d(0x2c3)](this);const _0x10c50f=VisuMZ[_0x34042d(0x195)][_0x34042d(0x15a)][_0x34042d(0x30a)];if(_0x10c50f[_0x34042d(0x369)]&&_0x10c50f['AddDustCloud'])_0x48cf85++;if(_0x10c50f[_0x34042d(0x369)]&&_0x10c50f['AddFootprints'])_0x48cf85++;if(_0x10c50f[_0x34042d(0x369)]&&_0x10c50f[_0x34042d(0x1ec)])_0x48cf85++;if(_0x10c50f[_0x34042d(0x369)]&&_0x10c50f['AddSmoothCamera'])_0x48cf85++;return _0x48cf85;},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x282)]=Window_Options[_0x4ee445(0x30f)][_0x4ee445(0x133)],Window_Options['prototype']['addGeneralOptions']=function(){const _0x256b4f=_0x4ee445;VisuMZ[_0x256b4f(0x195)][_0x256b4f(0x282)][_0x256b4f(0x2c3)](this),this[_0x256b4f(0x25b)]();},Window_Options[_0x4ee445(0x30f)][_0x4ee445(0x25b)]=function(){const _0x599f57=_0x4ee445;VisuMZ[_0x599f57(0x195)][_0x599f57(0x15a)][_0x599f57(0x30a)][_0x599f57(0x315)]&&this[_0x599f57(0x15b)]();VisuMZ[_0x599f57(0x195)]['Settings']['Options'][_0x599f57(0x1f3)]&&this[_0x599f57(0x1ca)]();if(VisuMZ[_0x599f57(0x195)]['Settings'][_0x599f57(0x30a)][_0x599f57(0x1ec)]){if('zsKgY'!=='fZBYS')this[_0x599f57(0x288)]();else return!![];}if(VisuMZ[_0x599f57(0x195)][_0x599f57(0x15a)][_0x599f57(0x30a)][_0x599f57(0x112)]){if(_0x599f57(0x36a)!==_0x599f57(0x24b))this['addMovementEffectsSmoothCameraCommand']();else{this[_0x599f57(0x1b4)]=this[_0x599f57(0x1b4)]||[];const _0x15719a=_0x23fe6e[_0x599f57(0x267)]();this['_dustCloudData']=_0x314f10['parse'](_0x4569aa[_0x599f57(0x10f)](_0x15719a)),this[_0x599f57(0xf9)]();}}},Window_Options['prototype'][_0x4ee445(0x15b)]=function(){const _0x4dd13b=_0x4ee445,_0x5a9c2f=TextManager['MovementEffectsOptions'][_0x4dd13b(0x20c)],_0x4d3f4a=_0x4dd13b(0x316);this[_0x4dd13b(0x2f7)](_0x5a9c2f,_0x4d3f4a);},Window_Options[_0x4ee445(0x30f)][_0x4ee445(0x1ca)]=function(){const _0x454281=_0x4ee445,_0x4158c1=TextManager['MovementEffectsOptions'][_0x454281(0x37c)],_0x367b4b='footprints';this[_0x454281(0x2f7)](_0x4158c1,_0x367b4b);},Window_Options[_0x4ee445(0x30f)][_0x4ee445(0x288)]=function(){const _0x310e7f=_0x4ee445,_0x1a4a41=TextManager[_0x310e7f(0x22e)][_0x310e7f(0xef)],_0xcc8057=_0x310e7f(0x1e2);this['addCommand'](_0x1a4a41,_0xcc8057);},Window_Options['prototype'][_0x4ee445(0x1f0)]=function(){const _0x425733=_0x4ee445,_0x963bbb=TextManager['MovementEffectsOptions']['SmoothCamera'],_0x16bbe5=_0x425733(0x222);this[_0x425733(0x2f7)](_0x963bbb,_0x16bbe5);},ImageManager[_0x4ee445(0x2aa)]=function(){const _0x51e2e6=_0x4ee445;if(this[_0x51e2e6(0x2ee)])return this[_0x51e2e6(0x2ee)];const _0x1e9b39=0x64,_0x22f0fa=0x64,_0x3f77eb=new Bitmap(_0x1e9b39,_0x22f0fa);return _0x3f77eb[_0x51e2e6(0x3b3)]=0xff,_0x3f77eb[_0x51e2e6(0x203)](0x32,0x32,0x32,'#000000'),_0x3f77eb[_0x51e2e6(0x17b)]=![],this[_0x51e2e6(0x2ee)]=_0x3f77eb,this[_0x51e2e6(0x2ee)];},SoundManager[_0x4ee445(0x134)]=function(_0x3e913c){const _0xf78fc4=_0x4ee445,_0x2139fa=VisuMZ['MovementEffects'][_0xf78fc4(0x15a)]['Footsteps'],_0x1bcf0c={'name':_0x2139fa[_0xf78fc4(0x268)]??'Blow2','volume':_0x2139fa[_0xf78fc4(0x263)]??0xa,'pitch':_0x2139fa[_0xf78fc4(0x3b1)]??0x78,'pan':_0x2139fa[_0xf78fc4(0x244)]??0x0};$gameMap['applyFootstepSoundTileChanges'](_0x1bcf0c,_0x3e913c);if(_0x1bcf0c==='')return;VisuMZ['MovementEffects'][_0xf78fc4(0xe0)](_0x1bcf0c,_0x3e913c),AudioManager[_0xf78fc4(0xba)](_0x1bcf0c);},VisuMZ['MovementEffects']['ApplyFootstepSfxModifiers']=function(_0x23311b,_0x298f59){const _0x2615d0=_0x4ee445;if(!_0x23311b)return;if(!_0x298f59)return;if(_0x298f59['constructor']===Game_Event){const _0x2048f7=VisuMZ[_0x2615d0(0x195)][_0x2615d0(0x15a)]['Footsteps'],_0x4ef19c=$gamePlayer[_0x2615d0(0x382)](_0x298f59['x']),_0x4d8e06=$gamePlayer[_0x2615d0(0x16b)](_0x298f59['y']),_0x1579da=Math['abs'](_0x4ef19c)+Math[_0x2615d0(0x114)](_0x4d8e06);_0x1579da>0x0&&(_0x23311b[_0x2615d0(0x263)]+=_0x1579da*_0x2048f7[_0x2615d0(0x218)],_0x23311b[_0x2615d0(0x3b1)]+=_0x1579da*_0x2048f7[_0x2615d0(0x2e5)]),_0x4ef19c!==0x0&&(_0x2615d0(0x318)==='Bjczs'?this[_0x2615d0(0x2fa)]():_0x23311b[_0x2615d0(0x244)]-=_0x4ef19c*_0x2048f7['distancePanModifier']);}const _0x5cedbb=_0x298f59[_0x2615d0(0x243)]();_0x5cedbb&&(_0x23311b['volume']*=_0x5cedbb[_0x2615d0(0x272)]??0x1,_0x23311b['pitch']*=_0x5cedbb[_0x2615d0(0x240)]??0x1),_0x23311b[_0x2615d0(0x263)]=Math[_0x2615d0(0x107)](0x0,_0x23311b[_0x2615d0(0x263)]),_0x23311b[_0x2615d0(0x3b1)]=Math[_0x2615d0(0x107)](0x0,_0x23311b[_0x2615d0(0x3b1)]),_0x23311b[_0x2615d0(0x244)]=_0x23311b['pan'][_0x2615d0(0x119)](-0x64,0x64);},TextManager[_0x4ee445(0x364)]=function(_0x286bf8){const _0x30f42b=_0x4ee445;_0x286bf8=_0x286bf8[_0x30f42b(0x1d9)]()[_0x30f42b(0x11e)]();switch(_0x286bf8){case _0x30f42b(0xee):return 0x2;case _0x30f42b(0x156):return 0x4;case _0x30f42b(0x319):return 0x6;case'up':return 0x8;case _0x30f42b(0x258):return 0x1;case _0x30f42b(0xc6):return 0x3;case'upper\x20left':return 0x7;case'upper\x20right':return 0x9;}return Number(_0x286bf8)||0x0;},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x393)]=BattleManager[_0x4ee445(0x367)],BattleManager[_0x4ee445(0x367)]=function(){const _0x3fe8cb=_0x4ee445;VisuMZ[_0x3fe8cb(0x195)]['BattleManager_startBattle'][_0x3fe8cb(0x2c3)](this);if($gamePlayer){if('JFAhZ'!==_0x3fe8cb(0x2b9))$gamePlayer['endSmartRush']();else return _0x36c40e['smartBlinkMotionTrailData']();}},VisuMZ['MovementEffects']['Game_System_initialize']=Game_System[_0x4ee445(0x30f)][_0x4ee445(0x260)],Game_System['prototype'][_0x4ee445(0x260)]=function(){const _0x207443=_0x4ee445;VisuMZ[_0x207443(0x195)]['Game_System_initialize'][_0x207443(0x2c3)](this),this[_0x207443(0xb8)](),this['initMovementEffectsDustCloud'](),this[_0x207443(0x2e2)](),this[_0x207443(0x346)](),this['initMovementEffectsDirMoveSpeedMod']();},Game_System[_0x4ee445(0x30f)][_0x4ee445(0xb8)]=function(){const _0xc4707f=_0x4ee445,_0x5db488=VisuMZ[_0xc4707f(0x195)]['Settings'][_0xc4707f(0xf6)];this[_0xc4707f(0x26f)]={'enabled':_0x5db488[_0xc4707f(0xd3)],'horzWalk':_0x5db488[_0xc4707f(0x1ee)][_0xc4707f(0x119)](0x1,0x30),'vertWalk':_0x5db488[_0xc4707f(0x13f)][_0xc4707f(0x119)](0x1,0x30),'horzDash':_0x5db488[_0xc4707f(0x295)][_0xc4707f(0x119)](0x1,0x30),'vertDash':_0x5db488['VertDash']['clamp'](0x1,0x30)};},Game_System[_0x4ee445(0x30f)][_0x4ee445(0x350)]=function(){const _0x43744b=_0x4ee445;if(this[_0x43744b(0x26f)]===undefined)this[_0x43744b(0xb8)]();return this[_0x43744b(0x26f)][_0x43744b(0x2f3)];},Game_System['prototype'][_0x4ee445(0xe8)]=function(_0x498041){const _0x468bcc=_0x4ee445;if(this[_0x468bcc(0x26f)]===undefined)this[_0x468bcc(0xb8)]();this['_smoothCamera'][_0x468bcc(0x2f3)]=_0x498041;},Game_System[_0x4ee445(0x30f)]['getSmoothCameraSpeed']=function(_0x4cb2e8,_0x106776){const _0x3fa542=_0x4ee445;if(this[_0x3fa542(0x26f)]===undefined)this[_0x3fa542(0xb8)]();const _0x44c9fb=(_0x4cb2e8?_0x3fa542(0x398):_0x3fa542(0x121))+(_0x106776?'Dash':_0x3fa542(0x144));return this[_0x3fa542(0x26f)][_0x44c9fb][_0x3fa542(0x119)](0x1,0x30);},Game_System[_0x4ee445(0x30f)][_0x4ee445(0x325)]=function(_0x3c4dd0,_0x564215,_0x5cb92d){const _0x280331=_0x4ee445;if(this[_0x280331(0x26f)]===undefined)this[_0x280331(0xb8)]();const _0x3fde2b=(_0x564215?_0x280331(0x398):'horz')+(_0x5cb92d?_0x280331(0x3b6):'Walk');this[_0x280331(0x26f)][_0x3fde2b]=_0x3c4dd0[_0x280331(0x119)](0x1,0x30);},Game_System[_0x4ee445(0x30f)]['initMovementEffectsDustCloud']=function(){const _0x3406b7=_0x4ee445,_0x4ec15c=VisuMZ[_0x3406b7(0x195)][_0x3406b7(0x15a)][_0x3406b7(0x20c)];this[_0x3406b7(0x314)]={'enabled':_0x4ec15c['Enabled'],'filename':_0x4ec15c[_0x3406b7(0x1e8)]||'','color':_0x4ec15c[_0x3406b7(0x39f)]||_0x3406b7(0x125),'radius':_0x4ec15c[_0x3406b7(0x2d5)]||0x18,'fullness':_0x4ec15c[_0x3406b7(0x383)]||0x0,'wholeDuration':_0x4ec15c[_0x3406b7(0x332)]||0x14,'startOpacity':_0x4ec15c['startOpacity']||0xc0,'startScale':_0x4ec15c[_0x3406b7(0x2a1)]||0.2};},Game_System[_0x4ee445(0x30f)][_0x4ee445(0x267)]=function(){const _0x6b560d=_0x4ee445;if(this[_0x6b560d(0x314)]===undefined)this['initMovementEffectsDustCloud']();return this[_0x6b560d(0x314)];},Game_System['prototype'][_0x4ee445(0x209)]=function(_0x12b1a5){const _0x4c683a=_0x4ee445;if(this[_0x4c683a(0x314)]===undefined)this['initMovementEffectsDustCloud']();this['_dustCloud']=JsonEx[_0x4c683a(0x2c0)](_0x12b1a5);},Game_System[_0x4ee445(0x30f)][_0x4ee445(0x178)]=function(){const _0x31d2f9=_0x4ee445;return this[_0x31d2f9(0x267)]()['enabled'];},Game_System[_0x4ee445(0x30f)][_0x4ee445(0x2e2)]=function(){const _0xb1984d=_0x4ee445;this[_0xb1984d(0x10e)]=VisuMZ[_0xb1984d(0x195)]['Settings'][_0xb1984d(0xef)]['Enabled'];},Game_System[_0x4ee445(0x30f)]['canMakeFootstepSounds']=function(){const _0x14b47a=_0x4ee445;if(this[_0x14b47a(0x10e)]===undefined)this[_0x14b47a(0x2e2)]();return this[_0x14b47a(0x10e)];},Game_System[_0x4ee445(0x30f)]['setFootstepSoundsEnabled']=function(_0x529301){const _0x4dfb20=_0x4ee445;if(this[_0x4dfb20(0x10e)]===undefined)this[_0x4dfb20(0x2e2)]();this['_footstepSoundsEnabled']=_0x529301;},Game_System['prototype'][_0x4ee445(0x346)]=function(){const _0x697357=_0x4ee445;this['_footprintMarksEnabled']=VisuMZ[_0x697357(0x195)][_0x697357(0x15a)][_0x697357(0x37c)][_0x697357(0xd3)];},Game_System[_0x4ee445(0x30f)][_0x4ee445(0x17d)]=function(){const _0x392202=_0x4ee445;if(this[_0x392202(0x20f)]===undefined)this[_0x392202(0x346)]();return this[_0x392202(0x20f)];},Game_System[_0x4ee445(0x30f)][_0x4ee445(0x184)]=function(_0x4caf8d){const _0x5d32c7=_0x4ee445;if(this[_0x5d32c7(0x20f)]===undefined)this[_0x5d32c7(0x346)]();this[_0x5d32c7(0x20f)]=_0x4caf8d;},Game_System[_0x4ee445(0x30f)][_0x4ee445(0x39d)]=function(){const _0x4df21c=_0x4ee445;this[_0x4df21c(0x39e)]={'dir1':0x0,'dir2':0x0,'dir3':0x0,'dir4':0x0,'dir6':0x0,'dir7':0x0,'dir8':0x0,'dir9':0x0};},Game_System['prototype'][_0x4ee445(0x30d)]=function(_0x3fec9f){const _0x3ad6ac=_0x4ee445;if(this[_0x3ad6ac(0x39e)]===undefined)this[_0x3ad6ac(0x39d)]();const _0x2bb4ea='dir%1'[_0x3ad6ac(0x17a)](_0x3fec9f);return this[_0x3ad6ac(0x39e)][_0x2bb4ea]||0x0;},Game_System[_0x4ee445(0x30f)][_0x4ee445(0x2c9)]=function(_0x28db2d,_0x5c8c56){const _0x2b9a83=_0x4ee445;if(this[_0x2b9a83(0x39e)]===undefined)this[_0x2b9a83(0x39d)]();const _0x1c0a9a='dir%1'[_0x2b9a83(0x17a)](_0x28db2d);this[_0x2b9a83(0x39e)][_0x1c0a9a]=_0x5c8c56||0x0;},VisuMZ['MovementEffects'][_0x4ee445(0xea)]=Game_Picture['prototype'][_0x4ee445(0x1aa)],Game_Picture[_0x4ee445(0x30f)][_0x4ee445(0x1aa)]=function(){return![];},Game_Picture['prototype'][_0x4ee445(0x215)]=function(){const _0x372fcb=_0x4ee445;return VisuMZ['MovementEffects'][_0x372fcb(0xea)][_0x372fcb(0x2c3)](this);},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x20a)]=Game_Picture['prototype']['x'],Game_Picture['prototype']['x']=function(){const _0x50e722=_0x4ee445;let _0x192781=VisuMZ[_0x50e722(0x195)][_0x50e722(0x20a)][_0x50e722(0x2c3)](this);return this[_0x50e722(0x215)]()&&(_0x192781*=$gameScreen[_0x50e722(0x252)]()),_0x192781;},VisuMZ['MovementEffects'][_0x4ee445(0x174)]=Game_Picture[_0x4ee445(0x30f)]['y'],Game_Picture[_0x4ee445(0x30f)]['y']=function(){const _0x2e9f7c=_0x4ee445;let _0x544cef=VisuMZ[_0x2e9f7c(0x195)][_0x2e9f7c(0x174)][_0x2e9f7c(0x2c3)](this);if(this[_0x2e9f7c(0x215)]()){if(_0x2e9f7c(0x14b)!=='ssbNt'){if(this[_0x2e9f7c(0x39e)]===_0x32848a)this['initMovementEffectsDirMoveSpeedMod']();const _0x2fe2b5=_0x2e9f7c(0x1bb)['format'](_0x15c8a7);return this[_0x2e9f7c(0x39e)][_0x2fe2b5]||0x0;}else _0x544cef*=$gameScreen[_0x2e9f7c(0x252)]();}return _0x544cef;},VisuMZ[_0x4ee445(0x195)]['Game_Picture_scaleX']=Game_Picture[_0x4ee445(0x30f)][_0x4ee445(0x23e)],Game_Picture['prototype'][_0x4ee445(0x23e)]=function(){const _0x11fcb0=_0x4ee445;let _0x59bfaf=VisuMZ[_0x11fcb0(0x195)][_0x11fcb0(0x1e3)][_0x11fcb0(0x2c3)](this);return this[_0x11fcb0(0x215)]()&&(_0x59bfaf*=$gameScreen['zoomScale']()),_0x59bfaf;},VisuMZ['MovementEffects'][_0x4ee445(0x27c)]=Game_Picture[_0x4ee445(0x30f)][_0x4ee445(0x13b)],Game_Picture[_0x4ee445(0x30f)][_0x4ee445(0x13b)]=function(){const _0x47d82d=_0x4ee445;let _0x5193d1=VisuMZ[_0x47d82d(0x195)][_0x47d82d(0x27c)][_0x47d82d(0x2c3)](this);return this[_0x47d82d(0x215)]()&&(_0x5193d1*=$gameScreen[_0x47d82d(0x252)]()),_0x5193d1;},Game_Actor[_0x4ee445(0x30f)][_0x4ee445(0x243)]=function(){const _0x10530e=_0x4ee445;if(this[_0x10530e(0x2de)]===undefined)this[_0x10530e(0x1c9)]();return this[_0x10530e(0x2de)];},Game_Actor[_0x4ee445(0x30f)]['setupMovementEffectsNotetags']=function(){const _0x1aae9c=_0x4ee445;this[_0x1aae9c(0x391)]();const _0x5ca8d5=this[_0x1aae9c(0x1a7)]()[_0x1aae9c(0x23a)]||'';Game_Event[_0x1aae9c(0x30f)][_0x1aae9c(0x1b8)][_0x1aae9c(0x2c3)](this,_0x5ca8d5);},Game_Actor[_0x4ee445(0x30f)][_0x4ee445(0x391)]=function(){const _0x57b9d1=_0x4ee445;{const _0x4b4041=VisuMZ['MovementEffects']['Settings']['Footsteps'];this[_0x57b9d1(0x2de)]={'enabled':_0x4b4041[_0x57b9d1(0x2c2)],'volumeRate':_0x4b4041[_0x57b9d1(0x102)],'pitchRate':_0x4b4041[_0x57b9d1(0x34e)],'soundFrames':_0x4b4041[_0x57b9d1(0x145)][_0x57b9d1(0x2d6)]()};}{if(_0x57b9d1(0x2b3)===_0x57b9d1(0x21a))_0x36f005[_0x57b9d1(0x392)](this[_0x57b9d1(0x38a)]),this[_0x57b9d1(0x323)]();else{const _0x26b61b=VisuMZ[_0x57b9d1(0x195)][_0x57b9d1(0x15a)]['Footprints'];this[_0x57b9d1(0x335)]={'enabled':!![],'dir1':JSON[_0x57b9d1(0x3a9)](JSON[_0x57b9d1(0x10f)](_0x26b61b[_0x57b9d1(0x30b)])),'dir2':JSON[_0x57b9d1(0x3a9)](JSON[_0x57b9d1(0x10f)](_0x26b61b['dir2'])),'dir3':JSON['parse'](JSON['stringify'](_0x26b61b['dir3'])),'dir4':JSON[_0x57b9d1(0x3a9)](JSON[_0x57b9d1(0x10f)](_0x26b61b[_0x57b9d1(0x23f)])),'dir6':JSON['parse'](JSON[_0x57b9d1(0x10f)](_0x26b61b['dir6'])),'dir7':JSON[_0x57b9d1(0x3a9)](JSON[_0x57b9d1(0x10f)](_0x26b61b[_0x57b9d1(0x375)])),'dir8':JSON[_0x57b9d1(0x3a9)](JSON[_0x57b9d1(0x10f)](_0x26b61b[_0x57b9d1(0x19f)])),'dir9':JSON['parse'](JSON[_0x57b9d1(0x10f)](_0x26b61b['dir9']))};}}},Game_Actor[_0x4ee445(0x30f)][_0x4ee445(0x2ae)]=function(){const _0x46f96a=_0x4ee445;if(this[_0x46f96a(0x335)]===undefined)this[_0x46f96a(0x1c9)]();return this['_footprintsData'];},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x105)]=Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x1e4)],Game_Map['prototype'][_0x4ee445(0x1e4)]=function(_0x1aa136){const _0x1afc43=_0x4ee445;VisuMZ['MovementEffects'][_0x1afc43(0x105)]['call'](this,_0x1aa136),this[_0x1afc43(0x1c2)](),this['setupRegionTerrainTagFootprints'](),this[_0x1afc43(0x1d0)](),this['setupRegionTerrainTagSmartBlink']();},VisuMZ['MovementEffects']['Game_Map_changeTileset']=Game_Map[_0x4ee445(0x30f)]['changeTileset'],Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x207)]=function(_0x5172d9){const _0x221c0e=_0x4ee445;VisuMZ[_0x221c0e(0x195)][_0x221c0e(0x23c)]['call'](this,_0x5172d9),this['setupRegionTerrainTagFootstepSounds'](),this['setupRegionTerrainTagFootprints'](),this[_0x221c0e(0x1d0)](),this['setupRegionTerrainTagSmartBlink']();},Game_Map['prototype'][_0x4ee445(0x2dc)]=function(_0x35fca2,_0x3b5667){const _0x5c7c04=_0x4ee445,_0x14d465=[0x50,0x51,0x52,0x53,0x54,0x55,0x56,0x57];_0x14d465[_0x5c7c04(0x363)](0x60,0x61,0x62,0x63,0x64,0x65,0x66,0x67),_0x14d465[_0x5c7c04(0x363)](0x70,0x71,0x72,0x73,0x74,0x75,0x76,0x77);for(let _0x3063b8=0x0;_0x3063b8<0x5;_0x3063b8++){const _0x3c39b6=$gameMap[_0x5c7c04(0x2a7)](_0x35fca2,_0x3b5667,_0x3063b8);if(_0x14d465[_0x5c7c04(0x2e4)](_0x3c39b6))return!![];}return![];},Game_Map['prototype']['isUsingSmoothCamera']=function(){const _0x4dc491=_0x4ee445;if(!ConfigManager['smoothCamera'])return![];if($dataMap){const _0x53c8f1=VisuMZ[_0x4dc491(0x195)][_0x4dc491(0x2d4)],_0x45998c=$dataMap['note']||'';if(_0x45998c['match'](_0x53c8f1[_0x4dc491(0x1cb)]))return!![];else{if(_0x45998c[_0x4dc491(0x34f)](_0x53c8f1[_0x4dc491(0x2af)]))return![];}}return $gameSystem['isSmoothCameraEnabled']();},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x299)]=Game_Map['prototype'][_0x4ee445(0x1a4)],Game_Map[_0x4ee445(0x30f)]['parallaxOx']=function(){const _0x2b0516=_0x4ee445;let _0x362c17=VisuMZ['MovementEffects'][_0x2b0516(0x299)][_0x2b0516(0x2c3)](this);if(this[_0x2b0516(0x1b1)])_0x362c17=Math['floor'](_0x362c17);return _0x362c17;},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x106)]=Game_Map[_0x4ee445(0x30f)]['parallaxOy'],Game_Map[_0x4ee445(0x30f)]['parallaxOy']=function(){const _0x289e1c=_0x4ee445;let _0x281695=VisuMZ['MovementEffects'][_0x289e1c(0x106)]['call'](this);if(this[_0x289e1c(0x1b1)])_0x281695=Math['floor'](_0x281695);return _0x281695;},Game_Map['prototype']['canShowDustCloud']=function(){const _0x5397fd=_0x4ee445;if(!ConfigManager[_0x5397fd(0x316)])return![];if($dataMap){if(_0x5397fd(0x16f)===_0x5397fd(0x16f)){const _0x3e3942=VisuMZ[_0x5397fd(0x195)]['RegExp'],_0x3a5f5e=$dataMap['note']||'';if(_0x3a5f5e['match'](_0x3e3942[_0x5397fd(0x130)]))return!![];else{if(_0x3a5f5e['match'](_0x3e3942[_0x5397fd(0x1e0)])){if(_0x5397fd(0x2f4)==='nXNSS')return![];else{const _0x40d741=_0xf491ec['MovementEffects'][_0x5397fd(0x2d4)],_0x2d8b5f=_0xb21622[_0x5397fd(0x23a)]||'';_0x2d8b5f[_0x5397fd(0x34f)](_0x40d741[_0x5397fd(0x1dc)])&&(this[_0x5397fd(0x199)]['enabled']=![]),_0x2d8b5f[_0x5397fd(0x34f)](_0x40d741[_0x5397fd(0x374)])&&(this['_smartRush'][_0x5397fd(0x1bd)]=_0x37df38['$1'][_0x5397fd(0x27f)](',')[_0x5397fd(0xfb)](_0x573fe4=>(_0x4b983f(_0x573fe4)||0x0)[_0x5397fd(0x119)](0x0,0xff)));}}}}else{_0x4d5e54['match'](_0x25b03a['NoTerrainTagFootstepSfx']);const _0x86954d=_0x200db0(_0xed9efb['$1'])[_0x5397fd(0x119)](0x0,0x7);this[_0x5397fd(0x231)][_0x86954d]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}}return $gameSystem[_0x5397fd(0x178)]();},Game_Map[_0x4ee445(0x30f)]['canMakeFootstepSounds']=function(){const _0x546930=_0x4ee445;if(!ConfigManager[_0x546930(0x1e2)])return![];if($dataMap){const _0x32faca=VisuMZ[_0x546930(0x195)][_0x546930(0x2d4)],_0x83b90b=$dataMap['note']||'';if(_0x83b90b[_0x546930(0x34f)](_0x32faca[_0x546930(0x18c)]))return!![];else{if(_0x83b90b[_0x546930(0x34f)](_0x32faca['NoFootsteps']))return![];}}return $gameSystem['canMakeFootstepSounds']();},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x1c2)]=function(){const _0x4a617e=_0x4ee445;this[_0x4a617e(0x310)](),this[_0x4a617e(0x204)](),this[_0x4a617e(0x331)]();},Game_Map['prototype'][_0x4ee445(0x310)]=function(){const _0x52a198=_0x4ee445;this[_0x52a198(0x269)]={},this[_0x52a198(0x231)]={};},Game_Map['prototype'][_0x4ee445(0x204)]=function(){const _0x3902ec=_0x4ee445;if(!$dataMap)return;const _0x2d8487=VisuMZ['MovementEffects'][_0x3902ec(0x15a)][_0x3902ec(0xef)],_0x26e66c=VisuMZ[_0x3902ec(0x195)][_0x3902ec(0x2d4)],_0x2438e5=$dataMap[_0x3902ec(0x23a)]||'',_0x259535=_0x2438e5['match'](_0x26e66c[_0x3902ec(0x143)]);if(_0x259535){if(_0x3902ec(0x221)==='bqMWL')for(const _0x3b069b of _0x259535){_0x3b069b[_0x3902ec(0x34f)](_0x26e66c[_0x3902ec(0x143)]);const _0x35a70c=Number(RegExp['$1'])[_0x3902ec(0x119)](0x0,0xff),_0xd1ba77=String(RegExp['$2'])[_0x3902ec(0x27f)](',')[_0x3902ec(0xfb)](_0x11a3e8=>_0x11a3e8[_0x3902ec(0x11e)]());this[_0x3902ec(0x269)][_0x35a70c]={'name':_0xd1ba77[0x0]||'','volume':Number(_0xd1ba77[0x1]??_0x2d8487[_0x3902ec(0x263)]),'pitch':Number(_0xd1ba77[0x2]??_0x2d8487[_0x3902ec(0x3b1)]),'pan':Number(_0xd1ba77[0x3]??_0x2d8487[_0x3902ec(0x244)])};}else for(const _0x45cc45 of _0x450293){_0x45cc45['match'](_0x300c6d[_0x340ce6]);const _0x4bc5df=_0x472c9a['$1'],_0x2f6b54=_0x1900d4['$2'],_0x2d9997=_0x586c34['$3'],_0x1a877c=_0x3902ec(0x1bb)[_0x3902ec(0x17a)](_0x3265cf[_0x3902ec(0x364)](_0x4bc5df)),_0x2d6ea9='pattern%1'[_0x3902ec(0x17a)](_0x5757b8(_0x2f6b54)||0x0),_0x45d515=_0x2d9997[_0x3902ec(0x27f)](',')[_0x3902ec(0xfb)](_0x1def74=>_0xd189e1(_0x1def74)||0x0);this[_0x3902ec(0x335)][_0x1a877c][_0x2d6ea9][_0x3902ec(0x343)]=_0x45d515[0x0]||0x0,this[_0x3902ec(0x335)][_0x1a877c][_0x2d6ea9]['offsetY']=_0x45d515[0x1]||0x0;}}const _0x4e7a1a=_0x2438e5[_0x3902ec(0x34f)](_0x26e66c[_0x3902ec(0x21d)]);if(_0x4e7a1a){if(_0x3902ec(0x1f8)==='VBRTj')for(const _0x229533 of _0x4e7a1a){if(_0x3902ec(0x2f6)===_0x3902ec(0x2f6)){_0x229533[_0x3902ec(0x34f)](_0x26e66c[_0x3902ec(0x21d)]);const _0x3c9efb=Number(RegExp['$1'])[_0x3902ec(0x119)](0x0,0xff);this['_regionFootstepSounds'][_0x3c9efb]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}else _0x52e81[_0x4763fa]=!![];}else this[_0x3902ec(0x38a)]=0x0,_0x3a74bc(this[_0x3902ec(0xc3)]['bind'](this,![]),0x32);}},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x331)]=function(){const _0x2e27d5=_0x4ee445;if(!this[_0x2e27d5(0x120)]())return;const _0x5a97fe=VisuMZ['MovementEffects'][_0x2e27d5(0x15a)]['Footsteps'],_0x4c402e=VisuMZ[_0x2e27d5(0x195)][_0x2e27d5(0x2d4)],_0x1034ab=this['tileset']()['note']||'',_0x1cb72b=_0x1034ab[_0x2e27d5(0x34f)](_0x4c402e[_0x2e27d5(0x3b9)]);if(_0x1cb72b)for(const _0x7e6483 of _0x1cb72b){_0x7e6483[_0x2e27d5(0x34f)](_0x4c402e['TerrainTagFootstepSfx']);const _0x26831a=Number(RegExp['$1'])[_0x2e27d5(0x119)](0x0,0xff),_0x392e73=String(RegExp['$2'])[_0x2e27d5(0x27f)](',')['map'](_0x4f7460=>_0x4f7460[_0x2e27d5(0x11e)]());this['_terrainTagFootstepSounds'][_0x26831a]={'name':_0x392e73[0x0]||'','volume':Number(_0x392e73[0x1]??_0x5a97fe['volume']),'pitch':Number(_0x392e73[0x2]??_0x5a97fe[_0x2e27d5(0x3b1)]),'pan':Number(_0x392e73[0x3]??_0x5a97fe[_0x2e27d5(0x244)])};}const _0x2c69f9=_0x1034ab[_0x2e27d5(0x34f)](_0x4c402e[_0x2e27d5(0x3af)]);if(_0x2c69f9){if(_0x2e27d5(0x104)!==_0x2e27d5(0x141))for(const _0x5c46f3 of _0x2c69f9){_0x5c46f3[_0x2e27d5(0x34f)](_0x4c402e['NoTerrainTagFootstepSfx']);const _0x1d77f0=Number(RegExp['$1'])['clamp'](0x0,0x7);this['_terrainTagFootstepSounds'][_0x1d77f0]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}else this['_smartRushMode']=this[_0x2e27d5(0x38a)]||0x1,this[_0x2e27d5(0x38a)]--;}},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x312)]=function(_0x53275f,_0x599424){const _0xb93656=_0x4ee445;if(!_0x53275f)return;if(!_0x599424)return;if(this['_regionFootstepSounds']===undefined||this[_0xb93656(0x231)]===undefined){if(_0xb93656(0x362)===_0xb93656(0x362))this[_0xb93656(0x1c2)]();else for(const _0x538b91 of _0x5211e1){_0x538b91[_0xb93656(0x34f)](_0x40f437[_0xb93656(0x21d)]);const _0x4f43c2=_0x4cc50e(_0x53baf1['$1'])[_0xb93656(0x119)](0x0,0xff);this[_0xb93656(0x269)][_0x4f43c2]={'name':'','volume':0x0,'pitch':0x0,'pan':0x0};}}const _0x21d18d=_0x599424['x'],_0x1fb055=_0x599424['y'],_0x221f43=this[_0xb93656(0x138)](_0x21d18d,_0x1fb055),_0x31354f=this[_0xb93656(0x1ce)](_0x21d18d,_0x1fb055),_0x31e2cf=[_0xb93656(0x268),_0xb93656(0x263),'pitch','pan'];if(this[_0xb93656(0x231)][_0x31354f]){const _0x4634c9=this[_0xb93656(0x231)][_0x31354f];for(const _0x3dc56c of _0x31e2cf){'mlSVA'===_0xb93656(0x37a)?_0x53275f[_0x3dc56c]=_0x4634c9[_0x3dc56c]:_0x128231=_0x4a3bed['concat'](_0x14d256[_0xb93656(0x355)]()[_0xb93656(0x1dd)]());}}if(this[_0xb93656(0x269)][_0x221f43]){if(_0xb93656(0x172)===_0xb93656(0x172)){const _0x44a70a=this['_regionFootstepSounds'][_0x221f43];for(const _0x33ea1a of _0x31e2cf){_0x53275f[_0x33ea1a]=_0x44a70a[_0x33ea1a];}}else return this[_0xb93656(0xf4)][_0xb93656(0x135)][_0xb93656(0x1b2)][_0x4715b6];}},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x17d)]=function(_0x451571,_0x1cbe85){const _0x5a248c=_0x4ee445;if(!ConfigManager['footprints'])return![];if(!$gameSystem[_0x5a248c(0x17d)]())return![];if(this[_0x5a248c(0xf4)]===undefined)this[_0x5a248c(0x2db)]();const _0x913526=this['regionId'](_0x451571,_0x1cbe85),_0xbabe3f=this[_0x5a248c(0x1ce)](_0x451571,_0x1cbe85);if(this[_0x5a248c(0xf4)]['forbidden']['regions'][_0x5a248c(0x2e4)](_0x913526))return![];if(this[_0x5a248c(0xf4)][_0x5a248c(0xc0)][_0x5a248c(0x1b2)][_0x5a248c(0x2e4)](_0xbabe3f))return![];if(this[_0x5a248c(0xf4)][_0x5a248c(0x26b)][_0x5a248c(0xec)]['includes'](_0x913526))return!![];if(this[_0x5a248c(0xf4)][_0x5a248c(0x26b)]['terrainTags'][_0x5a248c(0x2e4)](_0xbabe3f))return!![];return![];},Game_Map['prototype'][_0x4ee445(0x2db)]=function(){const _0x19d86e=_0x4ee445;this[_0x19d86e(0x32f)](),this[_0x19d86e(0x340)](),this[_0x19d86e(0xe9)]();},Game_Map['prototype'][_0x4ee445(0x32f)]=function(){const _0x5ecc3c=_0x4ee445,_0xe20859=VisuMZ[_0x5ecc3c(0x195)]['Settings'][_0x5ecc3c(0x37c)];this[_0x5ecc3c(0xf4)]={'allowed':{'regions':_0xe20859[_0x5ecc3c(0x22a)][_0x5ecc3c(0x2d6)](),'terrainTags':_0xe20859['DefaultTerrainTags'][_0x5ecc3c(0x2d6)]()},'forbidden':{'regions':[],'terrainTags':[]},'opacity':{'regions':{},'terrainTags':{}},'duration':{'regions':{},'terrainTags':{}}};},Game_Map['prototype'][_0x4ee445(0x340)]=function(){const _0x388f29=_0x4ee445;if(!$dataMap)return;if(this[_0x388f29(0xf4)]===undefined)this[_0x388f29(0x2db)]();const _0x2398fb=VisuMZ[_0x388f29(0x195)][_0x388f29(0x2d4)],_0x38e360=$dataMap['note']||'';_0x38e360[_0x388f29(0x34f)](_0x2398fb[_0x388f29(0x36f)])&&(this[_0x388f29(0xf4)][_0x388f29(0x26b)][_0x388f29(0xec)]=RegExp['$1'][_0x388f29(0x27f)](',')['map'](_0x4bc08b=>(Number(_0x4bc08b)||0x0)[_0x388f29(0x119)](0x0,0xff)));if(_0x38e360['match'](_0x2398fb['NonFootprintRegions'])){if(_0x388f29(0x283)!==_0x388f29(0x283))return this['_smartBlinkMotionTrailData']||{'enabled':![]};else this[_0x388f29(0xf4)][_0x388f29(0xc0)][_0x388f29(0xec)]=RegExp['$1'][_0x388f29(0x27f)](',')[_0x388f29(0xfb)](_0x3b2fe2=>(Number(_0x3b2fe2)||0x0)[_0x388f29(0x119)](0x0,0xff));}const _0x2d123c=_0x38e360['match'](_0x2398fb[_0x388f29(0x2b8)]);if(_0x2d123c){if(_0x388f29(0x377)===_0x388f29(0x38e))_0x36b8ef=_0x728283[_0x388f29(0x2be)](_0x1dd9ab[_0x388f29(0x355)]()['data']());else for(const _0x5109dd of _0x2d123c){_0x5109dd[_0x388f29(0x34f)](_0x2398fb['RegionFootprintOpacity']);const _0x22c250=Number(RegExp['$1'])[_0x388f29(0x119)](0x0,0xff),_0x50e3ca=Number(RegExp['$2'])[_0x388f29(0x119)](0x0,0xff);this['_footprints']['opacity']['regions'][_0x22c250]=_0x50e3ca;}}const _0x2b8f84=_0x38e360[_0x388f29(0x34f)](_0x2398fb[_0x388f29(0x2bd)]);if(_0x2b8f84)for(const _0x28713e of _0x2b8f84){if(_0x388f29(0xeb)!=='ansCn'){_0x28713e[_0x388f29(0x34f)](_0x2398fb[_0x388f29(0x2bd)]);const _0x239608=Number(RegExp['$1'])['clamp'](0x0,0xff),_0x583633=Math[_0x388f29(0x107)](0x1,Number(RegExp['$2']));this['_footprints']['duration']['regions'][_0x239608]=_0x583633;}else{if(this[_0x388f29(0x314)]===_0x4c705c)this['initMovementEffectsDustCloud']();this[_0x388f29(0x314)]=_0x2e908d[_0x388f29(0x2c0)](_0xbf9987);}}},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0xe9)]=function(){const _0x21518d=_0x4ee445;if(!this[_0x21518d(0x120)]())return;if(this[_0x21518d(0xf4)]===undefined)this['setupRegionTerrainTagFootprints']();const _0xa025e6=VisuMZ[_0x21518d(0x195)][_0x21518d(0x2d4)],_0x45f1be=this[_0x21518d(0x120)]()['note']||'';_0x45f1be[_0x21518d(0x34f)](_0xa025e6[_0x21518d(0x11a)])&&(this[_0x21518d(0xf4)]['allowed'][_0x21518d(0x1b2)]=RegExp['$1']['split'](',')['map'](_0xc910df=>(Number(_0xc910df)||0x0)[_0x21518d(0x119)](0x0,0x7)));_0x45f1be[_0x21518d(0x34f)](_0xa025e6[_0x21518d(0x341)])&&(_0x21518d(0x153)!==_0x21518d(0x139)?this[_0x21518d(0xf4)][_0x21518d(0xc0)][_0x21518d(0x1b2)]=RegExp['$1'][_0x21518d(0x27f)](',')[_0x21518d(0xfb)](_0x1ebf67=>(Number(_0x1ebf67)||0x0)[_0x21518d(0x119)](0x0,0x7)):(_0xa2084c[_0x21518d(0x195)][_0x21518d(0x239)]['call'](this),this[_0x21518d(0x265)]()));const _0x34b7e8=_0x45f1be[_0x21518d(0x34f)](_0xa025e6['TerrainTagFootprintOpacity']);if(_0x34b7e8)for(const _0x4b28fb of _0x34b7e8){if('VHJAW'===_0x21518d(0x3aa)){_0x4b28fb[_0x21518d(0x34f)](_0xa025e6[_0x21518d(0x11b)]);const _0x1dce4c=Number(RegExp['$1'])['clamp'](0x0,0xff),_0x358d27=Number(RegExp['$2'])[_0x21518d(0x119)](0x0,0xff);this[_0x21518d(0xf4)][_0x21518d(0x1b0)][_0x21518d(0x1b2)][_0x1dce4c]=_0x358d27;}else{if(!this[_0x21518d(0x324)]())return;if(!this[_0x21518d(0x12b)]())return;const _0x21aced=this['_character'][_0x21518d(0x1ae)](),_0x3f1c04=_0x21aced[_0x21518d(0xf1)]||0x1;_0x3cb151[_0x21518d(0x18a)]%_0x3f1c04===0x0&&this['createMotionTrailSprite']();}}const _0x3f8d1b=_0x45f1be[_0x21518d(0x34f)](_0xa025e6[_0x21518d(0x157)]);if(_0x3f8d1b){if(_0x21518d(0x1ea)===_0x21518d(0x290)){const _0x2023f2=_0x454891[_0x21518d(0x22e)]['SmoothCamera'],_0x1df4d2=_0x21518d(0x222);this[_0x21518d(0x2f7)](_0x2023f2,_0x1df4d2);}else for(const _0x5347d2 of _0x3f8d1b){_0x5347d2['match'](_0xa025e6[_0x21518d(0x157)]);const _0x119423=Number(RegExp['$1'])[_0x21518d(0x119)](0x0,0xff),_0x13e9ed=Math['max'](0x1,Number(RegExp['$2']));this[_0x21518d(0xf4)]['duration'][_0x21518d(0x1b2)][_0x119423]=_0x13e9ed;}}},Game_Map[_0x4ee445(0x30f)]['footprintOpacityAtXy']=function(_0x45384a,_0x52cab2){const _0x38ee2a=_0x4ee445;if(this[_0x38ee2a(0xf4)]===undefined)this[_0x38ee2a(0x2db)]();const _0x15d14b=VisuMZ['MovementEffects'][_0x38ee2a(0x15a)][_0x38ee2a(0x37c)],_0x1472a8=this[_0x38ee2a(0x138)](_0x45384a,_0x52cab2),_0x19447e=this[_0x38ee2a(0x1ce)](_0x45384a,_0x52cab2);if(this['_footprints'][_0x38ee2a(0x1b0)][_0x38ee2a(0xec)][_0x1472a8]!==undefined)return this[_0x38ee2a(0xf4)][_0x38ee2a(0x1b0)][_0x38ee2a(0xec)][_0x1472a8];else{if(this[_0x38ee2a(0xf4)][_0x38ee2a(0x1b0)][_0x38ee2a(0x1b2)][_0x19447e]!==undefined)return _0x38ee2a(0x1ef)===_0x38ee2a(0x1ef)?this[_0x38ee2a(0xf4)][_0x38ee2a(0x1b0)][_0x38ee2a(0x1b2)][_0x19447e]:![];}return _0x15d14b[_0x38ee2a(0x142)];},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x3ad)]=function(_0x9c080d,_0x312985){const _0x1240b9=_0x4ee445;if(this[_0x1240b9(0xf4)]===undefined)this[_0x1240b9(0x2db)]();const _0x13881b=VisuMZ['MovementEffects'][_0x1240b9(0x15a)][_0x1240b9(0x37c)],_0x1a87a4=this[_0x1240b9(0x138)](_0x9c080d,_0x312985),_0x1307f5=this[_0x1240b9(0x1ce)](_0x9c080d,_0x312985);if(this[_0x1240b9(0xf4)][_0x1240b9(0x135)][_0x1240b9(0xec)][_0x1a87a4]!==undefined){if(_0x1240b9(0x12a)===_0x1240b9(0x386))this[_0x1240b9(0x246)]--;else return this[_0x1240b9(0xf4)][_0x1240b9(0x135)][_0x1240b9(0xec)][_0x1a87a4];}else{if(this[_0x1240b9(0xf4)]['duration']['terrainTags'][_0x1307f5]!==undefined)return this['_footprints'][_0x1240b9(0x135)][_0x1240b9(0x1b2)][_0x1307f5];}return _0x13881b['wholeDuration'];},Game_Map[_0x4ee445(0x30f)]['setupRegionTerrainTagSmartRush']=function(){const _0x5c09e7=_0x4ee445;this['initRegionTerrainTagSmartRush'](),this[_0x5c09e7(0x39b)](),this[_0x5c09e7(0x293)]();},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x29a)]=function(){const _0x472270=_0x4ee445,_0x34c630=VisuMZ[_0x472270(0x195)][_0x472270(0x15a)][_0x472270(0x23d)];this[_0x472270(0x199)]={'enabled':!![],'NonCrashRegions':(_0x34c630['NonCrashRegions']||[])['clone'](),'NonCrashTerrainTags':(_0x34c630[_0x472270(0x328)]||[])[_0x472270(0x2d6)]()};},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x39b)]=function(){const _0x1fb536=_0x4ee445,_0x1ddffb=VisuMZ['MovementEffects'][_0x1fb536(0x2d4)],_0x3fbcdb=$dataMap[_0x1fb536(0x23a)]||'';if(_0x3fbcdb[_0x1fb536(0x34f)](_0x1ddffb['NoSmartRush'])){if(_0x1fb536(0x2d0)==='uUULx')this[_0x1fb536(0x199)][_0x1fb536(0x2f3)]=![];else{this[_0x1fb536(0x1ae)]()[_0x1fb536(0x2f3)]=_0x595d36;if(!_0x4d8704[_0x1fb536(0x3a6)]())return;if(!_0x370589)return;if(!_0x4a4926)return;const _0x49faca=_0x86ccf9[_0x1fb536(0x345)][_0x1fb536(0x233)];if(_0x49faca){const _0x360d41=_0x49faca[_0x1fb536(0x155)](this);_0x360d41&&_0x360d41[_0x1fb536(0x334)]();}}}_0x3fbcdb[_0x1fb536(0x34f)](_0x1ddffb[_0x1fb536(0x374)])&&(this[_0x1fb536(0x199)][_0x1fb536(0x1bd)]=RegExp['$1'][_0x1fb536(0x27f)](',')['map'](_0xc88ae=>(Number(_0xc88ae)||0x0)[_0x1fb536(0x119)](0x0,0xff)));},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x293)]=function(){const _0x112c3c=_0x4ee445,_0x401793=VisuMZ[_0x112c3c(0x195)][_0x112c3c(0x2d4)];if(!this['tileset']())return;const _0x7c0083=this[_0x112c3c(0x120)]()[_0x112c3c(0x23a)]||'';if(_0x7c0083[_0x112c3c(0x34f)](_0x401793['SmartRushAntiCrashTerrainTags'])){if(_0x112c3c(0x2d9)!==_0x112c3c(0xf3))this[_0x112c3c(0x199)][_0x112c3c(0x328)]=RegExp['$1'][_0x112c3c(0x27f)](',')[_0x112c3c(0xfb)](_0x4f1cb4=>(Number(_0x4f1cb4)||0x0)[_0x112c3c(0x119)](0x0,0x7));else{if(this[_0x112c3c(0x11f)]())return!![];if(this[_0x112c3c(0xd9)]())return!![];if(this[_0x112c3c(0x149)]())return!![];return![];}}},Game_Map[_0x4ee445(0x30f)]['isSmartRushEnabled']=function(){const _0xc66f0=_0x4ee445;if(this['_smartRush']===undefined)this[_0xc66f0(0x1d0)]();return this[_0xc66f0(0x199)][_0xc66f0(0x2f3)];},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x22f)]=function(_0x269f84,_0x1362fb,_0xbe1ef4){const _0x152a71=_0x4ee445,_0x1e1dff=this[_0x152a71(0x300)](_0x269f84,_0xbe1ef4),_0x1ec1a8=this['roundYWithDirection'](_0x1362fb,_0xbe1ef4);if($gameMap[_0x152a71(0x27a)](_0x1e1dff,_0x1ec1a8,0x200))return![];if($gameMap[_0x152a71(0x27a)](_0x1e1dff,_0x1ec1a8,0x400))return![];if(_0x1e1dff<0x0||_0x1e1dff>=this[_0x152a71(0x33d)]())return![];if(_0x1ec1a8<0x0||_0x1ec1a8>=this[_0x152a71(0x27b)]())return![];const _0x587278=this[_0x152a71(0x138)](_0x1e1dff,_0x1ec1a8);if(this[_0x152a71(0x199)]['NonCrashRegions'][_0x152a71(0x2e4)](_0x587278))return![];const _0x3f4a89=this[_0x152a71(0x1ce)](_0x1e1dff,_0x1ec1a8);if(this['_smartRush'][_0x152a71(0x328)]['includes'](_0x3f4a89))return![];return Game_Player[_0x152a71(0xcc)];},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x151)]=function(){const _0x3fc132=_0x4ee445;this[_0x3fc132(0x2ea)](),this['parseRegionBasedSmartBlink'](),this[_0x3fc132(0x1fe)]();},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x2ea)]=function(){const _0x5e4324=_0x4ee445,_0x1681ae=VisuMZ[_0x5e4324(0x195)][_0x5e4324(0x15a)]['SmartBlink'];this[_0x5e4324(0x248)]={'enabled':!![],'NonLandableRegions':(_0x1681ae[_0x5e4324(0xe2)]||[])['clone'](),'NonLandableTerrainTags':(_0x1681ae[_0x5e4324(0x10b)]||[])[_0x5e4324(0x2d6)](),'NonPassableRegions':(_0x1681ae[_0x5e4324(0x35c)]||[])[_0x5e4324(0x2d6)](),'NonPassableTerrainTags':(_0x1681ae['NonPassableTerrainTags']||[])[_0x5e4324(0x2d6)]()};},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x2a8)]=function(){const _0x37f0b2=_0x4ee445,_0x2f5ee3=VisuMZ[_0x37f0b2(0x195)][_0x37f0b2(0x2d4)],_0x5897ab=$dataMap['note']||'';_0x5897ab[_0x37f0b2(0x34f)](_0x2f5ee3[_0x37f0b2(0x36c)])&&('QWdkA'==='QWdkA'?this[_0x37f0b2(0x248)][_0x37f0b2(0x2f3)]=![]:this[_0x37f0b2(0x39e)]={'dir1':0x0,'dir2':0x0,'dir3':0x0,'dir4':0x0,'dir6':0x0,'dir7':0x0,'dir8':0x0,'dir9':0x0}),_0x5897ab[_0x37f0b2(0x34f)](_0x2f5ee3['SmartBlinkNonLandRegions'])&&(this[_0x37f0b2(0x248)][_0x37f0b2(0xe2)]=RegExp['$1'][_0x37f0b2(0x27f)](',')[_0x37f0b2(0xfb)](_0x223526=>(Number(_0x223526)||0x0)[_0x37f0b2(0x119)](0x0,0xff))),_0x5897ab[_0x37f0b2(0x34f)](_0x2f5ee3[_0x37f0b2(0x24c)])&&(this[_0x37f0b2(0x248)][_0x37f0b2(0x35c)]=RegExp['$1'][_0x37f0b2(0x27f)](',')[_0x37f0b2(0xfb)](_0x2a7435=>(Number(_0x2a7435)||0x0)[_0x37f0b2(0x119)](0x0,0xff)));},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x1fe)]=function(){const _0x3c64b8=_0x4ee445,_0x58ceb1=VisuMZ[_0x3c64b8(0x195)]['RegExp'];if(!this['tileset']())return;const _0x1b3bb4=this[_0x3c64b8(0x120)]()[_0x3c64b8(0x23a)]||'';_0x1b3bb4[_0x3c64b8(0x34f)](_0x58ceb1[_0x3c64b8(0x1da)])&&(this['_smartBlink'][_0x3c64b8(0x10b)]=RegExp['$1'][_0x3c64b8(0x27f)](',')[_0x3c64b8(0xfb)](_0x49f0c0=>(Number(_0x49f0c0)||0x0)['clamp'](0x0,0x7))),_0x1b3bb4['match'](_0x58ceb1[_0x3c64b8(0x34a)])&&(this[_0x3c64b8(0x248)][_0x3c64b8(0x354)]=RegExp['$1']['split'](',')[_0x3c64b8(0xfb)](_0x146bf3=>(Number(_0x146bf3)||0x0)['clamp'](0x0,0x7)));},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x333)]=function(){const _0x2c7287=_0x4ee445;if(this[_0x2c7287(0x248)]===undefined)this[_0x2c7287(0x151)]();return this[_0x2c7287(0x248)][_0x2c7287(0x2f3)];},Game_Map[_0x4ee445(0x30f)]['isTileSmartBlinkNonPassable']=function(_0x40b42a,_0x39c223){const _0x185c60=_0x4ee445,_0x22b9fe=this[_0x185c60(0x138)](_0x40b42a,_0x39c223),_0x1b0497=this['terrainTag'](_0x40b42a,_0x39c223);if(this[_0x185c60(0x248)]===undefined)this['setupRegionTerrainTagSmartBlink']();if(this['_smartBlink'][_0x185c60(0x35c)][_0x185c60(0x2e4)](_0x22b9fe))return!![];if(this[_0x185c60(0x248)][_0x185c60(0x354)]['includes'](_0x1b0497))return!![];return![];},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x356)]=function(_0x39c7d4,_0x41147c){const _0x3fdf26=_0x4ee445,_0x4424f5=this[_0x3fdf26(0x138)](_0x39c7d4,_0x41147c),_0x2b3a57=this[_0x3fdf26(0x1ce)](_0x39c7d4,_0x41147c);if(this[_0x3fdf26(0x248)]===undefined)this[_0x3fdf26(0x151)]();if(this[_0x3fdf26(0x248)][_0x3fdf26(0xe2)]['includes'](_0x4424f5))return!![];if(this[_0x3fdf26(0x248)]['NonLandableTerrainTags'][_0x3fdf26(0x2e4)](_0x2b3a57))return!![];return![];},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x1cc)]=function(){const _0x222826=_0x4ee445;this['initRegionTerrainTagSmartJump'](),this[_0x222826(0x190)](),this[_0x222826(0x26c)]();},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x34b)]=function(){const _0x575ffa=_0x4ee445,_0x3e3958=VisuMZ['MovementEffects'][_0x575ffa(0x15a)][_0x575ffa(0x183)];this['_smartJump']={'enabled':!![],'HeightBasedRegions':(_0x3e3958[_0x575ffa(0x303)]||[])[_0x575ffa(0x2d6)](),'NonLandableRegions':(_0x3e3958[_0x575ffa(0xe2)]||[])[_0x575ffa(0x2d6)](),'NonLandableTerrainTags':(_0x3e3958[_0x575ffa(0x10b)]||[])[_0x575ffa(0x2d6)](),'NonPassableRegions':(_0x3e3958['NonPassableRegions']||[])[_0x575ffa(0x2d6)](),'NonPassableTerrainTags':(_0x3e3958[_0x575ffa(0x354)]||[])[_0x575ffa(0x2d6)]()};},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x190)]=function(){const _0x25b74b=_0x4ee445,_0x53994a=VisuMZ[_0x25b74b(0x195)][_0x25b74b(0x2d4)],_0x2e1dee=$dataMap[_0x25b74b(0x23a)]||'';_0x2e1dee[_0x25b74b(0x34f)](_0x53994a['NoSmartJump'])&&(this[_0x25b74b(0x2fd)]['enabled']=![]),_0x2e1dee[_0x25b74b(0x34f)](_0x53994a[_0x25b74b(0x1fd)])&&(this[_0x25b74b(0x2fd)][_0x25b74b(0x259)]=Number(RegExp['$1'])['clamp'](0x0,0xff)),_0x2e1dee[_0x25b74b(0x34f)](_0x53994a[_0x25b74b(0x31c)])&&(_0x25b74b(0x16a)===_0x25b74b(0x16a)?(this[_0x25b74b(0x2fd)][_0x25b74b(0x303)]=RegExp['$1']['split'](',')[_0x25b74b(0xfb)](_0x14a714=>(Number(_0x14a714)||0x0)[_0x25b74b(0x119)](0x0,0xff)),this[_0x25b74b(0x2fd)][_0x25b74b(0x303)][_0x25b74b(0xbe)]()):this[_0x25b74b(0x260)](...arguments)),_0x2e1dee['match'](_0x53994a[_0x25b74b(0x28e)])&&(this[_0x25b74b(0x2fd)][_0x25b74b(0xe2)]=RegExp['$1'][_0x25b74b(0x27f)](',')[_0x25b74b(0xfb)](_0x448e08=>(Number(_0x448e08)||0x0)[_0x25b74b(0x119)](0x0,0xff))),_0x2e1dee[_0x25b74b(0x34f)](_0x53994a[_0x25b74b(0x2ec)])&&(this[_0x25b74b(0x2fd)][_0x25b74b(0x35c)]=RegExp['$1'][_0x25b74b(0x27f)](',')[_0x25b74b(0xfb)](_0x503825=>(Number(_0x503825)||0x0)[_0x25b74b(0x119)](0x0,0xff)));},Game_Map[_0x4ee445(0x30f)]['parseTerrainTagBasedSmartJump']=function(){const _0x41b223=_0x4ee445,_0x115117=VisuMZ['MovementEffects']['RegExp'];if(!this[_0x41b223(0x120)]())return;const _0x51d7d3=this[_0x41b223(0x120)]()['note']||'';_0x51d7d3[_0x41b223(0x34f)](_0x115117['SmartJumpNonLandTerrainTags'])&&(this[_0x41b223(0x2fd)][_0x41b223(0x10b)]=RegExp['$1']['split'](',')[_0x41b223(0xfb)](_0x26c75f=>(Number(_0x26c75f)||0x0)[_0x41b223(0x119)](0x0,0x7)));if(_0x51d7d3[_0x41b223(0x34f)](_0x115117[_0x41b223(0x32c)])){if('bcKzn'!==_0x41b223(0x278))return![];else this[_0x41b223(0x2fd)]['NonPassableTerrainTags']=RegExp['$1'][_0x41b223(0x27f)](',')[_0x41b223(0xfb)](_0xe8b0c7=>(Number(_0xe8b0c7)||0x0)[_0x41b223(0x119)](0x0,0x7));}},Game_Map[_0x4ee445(0x30f)]['isSmartJumpEnabled']=function(){const _0x2bdb10=_0x4ee445;if(this[_0x2bdb10(0x2fd)]===undefined)this[_0x2bdb10(0x1cc)]();return this['_smartJump']['enabled'];},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x17f)]=function(_0x57feb3,_0x13b762){const _0x19daa7=_0x4ee445;if(this[_0x19daa7(0x2fd)]===undefined)this[_0x19daa7(0x1cc)]();const _0x59859d=this[_0x19daa7(0x138)](_0x57feb3,_0x13b762);return this[_0x19daa7(0x1a5)](_0x59859d);;},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x3a7)]=function(_0x23f3d5){const _0x206bfe=_0x4ee445;if(this[_0x206bfe(0x2fd)]===undefined)this['setupRegionTerrainTagSmartJump']();const _0x3aab73=this[_0x206bfe(0x2fd)][_0x206bfe(0x303)][_0x206bfe(0xc8)](_0x23f3d5);return _0x3aab73===0x0;},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x1a5)]=function(_0x489b96){const _0x20977c=_0x4ee445;if(this[_0x20977c(0x2fd)]===undefined)this[_0x20977c(0x1cc)]();return this[_0x20977c(0x2fd)][_0x20977c(0x303)][_0x20977c(0x2e4)](_0x489b96);},Game_Map[_0x4ee445(0x30f)][_0x4ee445(0x373)]=function(_0x33d03c,_0x4e8857,_0x25a4bf){const _0x627532=_0x4ee445,_0x188160=$gamePlayer[_0x627532(0x138)](),_0x1674b2=this[_0x627532(0x138)](_0x33d03c,_0x4e8857);if(this['isHeightBasedRegion'](_0x188160)){const _0x3784e8=$gamePlayer['direction']();if(this[_0x627532(0x3a7)](_0x188160)&&this[_0x627532(0x3a7)](_0x1674b2)){if(_0x627532(0x108)!=='MliZc')_0x18dfa1[_0x627532(0x195)]['Game_Player_updateScroll']['call'](this,_0x33977e,_0x5bb086);else return!![];}if(_0x3784e8!==0x2&&this[_0x627532(0x3a7)](_0x1674b2)){if(_0x25a4bf>=0x1)return![];}if(this[_0x627532(0x1a5)](_0x1674b2))return _0x627532(0x21c)===_0x627532(0x21c)?_0x188160>=_0x1674b2:this[_0x627532(0x26d)];else{if('mufxK'==='jvZkY')_0xd4b1c7*=_0x37baa2[_0x627532(0x252)]();else{const _0x26b620=this[_0x627532(0x2fd)][_0x627532(0x303)][_0x627532(0xc8)](_0x188160);return _0x26b620<=0x0;}}}if(this[_0x627532(0x1a5)](_0x1674b2)){const _0x3da349=this[_0x627532(0x2fd)][_0x627532(0x303)]['indexOf'](_0x1674b2);return _0x3da349<=0x0;}else return!![];},Game_Map['prototype'][_0x4ee445(0xdb)]=function(_0x2d91fe,_0x26efd0){const _0x4480bd=_0x4ee445,_0x23cb0d=this['regionId'](_0x2d91fe,_0x26efd0),_0x20efa7=this['terrainTag'](_0x2d91fe,_0x26efd0);if(this[_0x4480bd(0x2fd)]===undefined)this[_0x4480bd(0x1cc)]();if(this[_0x4480bd(0x2fd)][_0x4480bd(0x35c)]['includes'](_0x23cb0d))return!![];if(this[_0x4480bd(0x2fd)][_0x4480bd(0x354)][_0x4480bd(0x2e4)](_0x20efa7))return!![];const _0x4ad9e2=this[_0x4480bd(0x238)](_0x2d91fe,_0x26efd0);for(const _0xa791ee of _0x4ad9e2){if(!_0xa791ee)continue;if(_0xa791ee[_0x4480bd(0x2f2)])continue;if(_0xa791ee[_0x4480bd(0x358)]())return!![];}return![];},Game_Map['prototype'][_0x4ee445(0x32e)]=function(_0x5b9a6d,_0x9fd92b){const _0x4c0d86=_0x4ee445,_0x28b510=this[_0x4c0d86(0x138)](_0x5b9a6d,_0x9fd92b),_0x4bcedc=this[_0x4c0d86(0x1ce)](_0x5b9a6d,_0x9fd92b);if(this[_0x4c0d86(0x2fd)]===undefined)this[_0x4c0d86(0x1cc)]();if(this[_0x4c0d86(0x2fd)][_0x4c0d86(0xe2)]['includes'](_0x28b510))return!![];if(this[_0x4c0d86(0x2fd)]['NonLandableTerrainTags'][_0x4c0d86(0x2e4)](_0x4bcedc))return!![];const _0x56b4d0=this[_0x4c0d86(0x238)](_0x5b9a6d,_0x9fd92b);for(const _0x17d081 of _0x56b4d0){if(!_0x17d081)continue;if(_0x17d081[_0x4c0d86(0x2f2)])continue;if(_0x17d081[_0x4c0d86(0x1cd)]())return!![];}return![];},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x31d)]=Game_CharacterBase['prototype'][_0x4ee445(0x25e)],Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0x25e)]=function(){const _0x25e81a=_0x4ee445;VisuMZ[_0x25e81a(0x195)]['Game_CharacterBase_initMembers'][_0x25e81a(0x2c3)](this),this[_0x25e81a(0x399)]();},VisuMZ['MovementEffects'][_0x4ee445(0x376)]=Game_CharacterBase['prototype'][_0x4ee445(0x302)],Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0x302)]=function(){const _0x1dbb06=_0x4ee445;VisuMZ[_0x1dbb06(0x195)][_0x1dbb06(0x376)][_0x1dbb06(0x2c3)](this);if(this['canCreateDustCloud']())this[_0x1dbb06(0x371)]();!this[_0x1dbb06(0x3a1)]()&&this['canMakeFootstepSounds']()&&this[_0x1dbb06(0x1db)]();},VisuMZ[_0x4ee445(0x195)]['Game_CharacterBase_updatePattern']=Game_CharacterBase[_0x4ee445(0x30f)]['updatePattern'],Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0x101)]=function(){const _0x4fe8a7=_0x4ee445;VisuMZ[_0x4fe8a7(0x195)]['Game_CharacterBase_updatePattern'][_0x4fe8a7(0x2c3)](this);if(this[_0x4fe8a7(0x22b)]>0x0)return;if(this[_0x4fe8a7(0x14e)]()&&this[_0x4fe8a7(0x17d)]()){if('JlUuS'!==_0x4fe8a7(0x37e))this[_0x4fe8a7(0x140)]();else{if(!this[_0x4fe8a7(0x3b0)])return![];if(this['_character']!==_0x46b7b7&&this[_0x4fe8a7(0x3b0)]['constructor']!==_0x428c9c)return![];return _0x3a2c21[_0x4fe8a7(0x3ab)]();}}this['meetFootstepFrames']()&&this[_0x4fe8a7(0x38c)]()&&(_0x4fe8a7(0xf0)!==_0x4fe8a7(0xf0)?(this[_0x4fe8a7(0x1e6)]=![],this[_0x4fe8a7(0x21b)]=this[_0x4fe8a7(0x257)],this[_0x4fe8a7(0x213)]=this[_0x4fe8a7(0x1f4)]):this['playFootstepSound']());},Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0x3bb)]=function(){const _0x196fba=_0x4ee445;if(this[_0x196fba(0x1ff)]===Game_Follower&&!this[_0x196fba(0x301)]())return![];if(this[_0x196fba(0x1ff)]===Game_Player&&this[_0x196fba(0xd9)]())return![];if(!this[_0x196fba(0x330)]())return![];if(this[_0x196fba(0x1ab)]())return![];return $gameMap[_0x196fba(0x178)]();},Game_CharacterBase['prototype'][_0x4ee445(0x371)]=function(){const _0x45baac=SceneManager['_scene']['_spriteset'];if(_0x45baac)_0x45baac['createDustCloudForTarget'](this);},Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0x3a1)]=function(){const _0x42de1c=_0x4ee445;return VisuMZ[_0x42de1c(0x195)][_0x42de1c(0x15a)][_0x42de1c(0xef)][_0x42de1c(0x320)];},VisuMZ['MovementEffects'][_0x4ee445(0x22d)]=Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0xcf)],Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0xcf)]=function(){const _0x402023=_0x4ee445;let _0x39b945=VisuMZ[_0x402023(0x195)][_0x402023(0x22d)][_0x402023(0x2c3)](this);if(this[_0x402023(0x23b)]()){if(_0x402023(0x241)!==_0x402023(0x241))this[_0x402023(0x1c2)]();else{const _0x3175c3=VisuMZ['MovementEffects'][_0x402023(0x15a)][_0x402023(0xef)][_0x402023(0x19b)]??1.5;_0x39b945=Math[_0x402023(0x2bf)](_0x39b945/Math[_0x402023(0x107)](_0x3175c3,0x1));if(this[_0x402023(0x330)]()){const _0x292662=VisuMZ[_0x402023(0x195)][_0x402023(0x15a)][_0x402023(0xef)][_0x402023(0x19d)]??1.5;_0x39b945=Math[_0x402023(0x2bf)](_0x39b945/Math[_0x402023(0x107)](_0x292662,0x1));}}}return _0x39b945;},Game_CharacterBase[_0x4ee445(0x30f)]['meetFootstepFrames']=function(){const _0x3a4b7b=_0x4ee445;if(!this['isPlayFootstepSoundsByFrame']())return![];if(this[_0x3a4b7b(0x170)]()&&!this[_0x3a4b7b(0x23b)]())return![];if(this[_0x3a4b7b(0x11f)]())return![];if(this[_0x3a4b7b(0x149)]())return![];const _0xd775f2=this[_0x3a4b7b(0x243)]()[_0x3a4b7b(0x3ba)]??[];if(_0xd775f2[_0x3a4b7b(0xc5)]<=0x0)return!![];return _0xd775f2[_0x3a4b7b(0x2e4)](this[_0x3a4b7b(0x124)]());},Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0x38c)]=function(){const _0x1626fa=_0x4ee445;if(this[_0x1626fa(0x1ff)]===Game_Follower&&!this[_0x1626fa(0x301)]())return![];if(this[_0x1626fa(0x1ff)]===Game_Player&&this['isInVehicle']())return![];if(this['constructor']===Game_Follower&&$gamePlayer['isInVehicle']())return![];if(this[_0x1626fa(0x1ab)]())return![];return this[_0x1626fa(0x243)]()[_0x1626fa(0x2f3)]&&$gameMap[_0x1626fa(0x38c)]();},Game_Vehicle[_0x4ee445(0x30f)]['canMakeFootstepSounds']=function(){return![];},Game_CharacterBase[_0x4ee445(0x30f)]['playFootstepSound']=function(){const _0x3a4a9b=_0x4ee445;SoundManager[_0x3a4a9b(0x134)](this);},Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0x243)]=function(){return{'enabled':!![],'volumeRate':0x1,'pitchRate':0x1};},Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0x14e)]=function(){const _0x1490d5=_0x4ee445;if(this[_0x1490d5(0x170)]()&&!this[_0x1490d5(0x23b)]())return![];if(this[_0x1490d5(0x11f)]())return![];if(this[_0x1490d5(0x149)]())return![];const _0x2b30ce=_0x1490d5(0x1bb)[_0x1490d5(0x17a)](this['_direction']),_0x8fecbe=_0x1490d5(0x14d)['format'](this['pattern']()),_0x2d512f=this[_0x1490d5(0x2ae)]();if(_0x2d512f[_0x2b30ce]){if(_0x1490d5(0x14c)!==_0x1490d5(0x38b)){if(_0x2d512f[_0x2b30ce][_0x8fecbe]){if(_0x2d512f[_0x2b30ce][_0x8fecbe][_0x1490d5(0x1e8)]!=='')return!![];if(_0x2d512f[_0x2b30ce][_0x8fecbe]['width']>0x0)return!![];if(_0x2d512f[_0x2b30ce][_0x8fecbe][_0x1490d5(0x27b)]>0x0)return!![];}}else{let _0x1b8cbe=_0x56d538[_0x1490d5(0x195)]['Game_Picture_scaleX'][_0x1490d5(0x2c3)](this);return this['isTrueMapScrollLinked']()&&(_0x1b8cbe*=_0x5295b7[_0x1490d5(0x252)]()),_0x1b8cbe;}}return![];},Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0x17d)]=function(){const _0x4f74e3=_0x4ee445;if(this[_0x4f74e3(0x1ff)]===Game_Follower&&!this[_0x4f74e3(0x301)]())return![];if(this['constructor']===Game_Player&&this[_0x4f74e3(0xd9)]())return![];if(this['isTransparent']())return![];const _0x5f443d=this['x'],_0x2f8689=this['y'];return this[_0x4f74e3(0x2ae)]()[_0x4f74e3(0x2f3)]&&$gameMap[_0x4f74e3(0x17d)](_0x5f443d,_0x2f8689);},Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0x2ae)]=function(){const _0x340a4a=_0x4ee445,_0x34182a=VisuMZ[_0x340a4a(0x195)][_0x340a4a(0x15a)][_0x340a4a(0x37c)];return{'enabled':!![],'dir1':_0x34182a['dir1'],'dir2':_0x34182a[_0x340a4a(0x24f)],'dir3':_0x34182a['dir3'],'dir4':_0x34182a['dir4'],'dir6':_0x34182a[_0x340a4a(0xe3)],'dir7':_0x34182a[_0x340a4a(0x375)],'dir8':_0x34182a[_0x340a4a(0x19f)],'dir9':_0x34182a[_0x340a4a(0x308)]};},Game_CharacterBase['prototype'][_0x4ee445(0x140)]=function(){const _0x4e562f=_0x4ee445,_0x52482c=SceneManager['_scene'][_0x4e562f(0x233)];if(_0x52482c)_0x52482c['createFootprintForTarget'](this);},Game_CharacterBase['prototype'][_0x4ee445(0x399)]=function(){const _0x24e608=_0x4ee445;this[_0x24e608(0x317)]={'enabled':![],'delay':0x4,'duration':0x1e,'hue':0x0,'opacityStart':0x80,'tone':[0x0,0x0,0x0,0x0]};},Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0x1ae)]=function(){const _0x52fc92=_0x4ee445;if(this['_motionTrailSettings']===undefined)this['initMovementEffectsMotionTrails']();return this[_0x52fc92(0x317)];},Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0x1d1)]=function(_0x1ecbd6,_0x9825b4){const _0x13df9d=_0x4ee445;this[_0x13df9d(0x1ae)]()[_0x13df9d(0x2f3)]=_0x1ecbd6;if(!SceneManager[_0x13df9d(0x3a6)]())return;if(!_0x1ecbd6)return;if(!_0x9825b4)return;const _0x2ca389=SceneManager[_0x13df9d(0x345)][_0x13df9d(0x233)];if(_0x2ca389){if(_0x13df9d(0x1a8)!==_0x13df9d(0xd0)){const _0x430bd2=_0x2ca389[_0x13df9d(0x155)](this);_0x430bd2&&(_0x13df9d(0x2df)!=='lnjnl'?_0x430bd2['createMotionTrailSprite']():this[_0x13df9d(0x248)][_0x13df9d(0x35c)]=_0x5b9b22['$1'][_0x13df9d(0x27f)](',')[_0x13df9d(0xfb)](_0x3b6c0b=>(_0x5ee18b(_0x3b6c0b)||0x0)[_0x13df9d(0x119)](0x0,0xff)));}else{const _0x425aaa=_0x3c22c3[_0x13df9d(0x195)][_0x13df9d(0x15a)]['Footsteps'];this[_0x13df9d(0x2de)]={'enabled':_0x425aaa[_0x13df9d(0x2c2)],'volumeRate':_0x425aaa[_0x13df9d(0x102)],'pitchRate':_0x425aaa[_0x13df9d(0x34e)],'soundFrames':_0x425aaa[_0x13df9d(0x145)]['clone']()};}}},Game_CharacterBase[_0x4ee445(0x30f)]['setMotionTrailSettings']=function(_0xf2de2b,_0x321e6d){const _0x3e1b38=_0x4ee445,_0x4e016e=this['motionTrailData']()[_0x3e1b38(0x2f3)];this[_0x3e1b38(0x317)]=JsonEx[_0x3e1b38(0x2c0)](_0xf2de2b);if(_0x321e6d)return;this[_0x3e1b38(0x317)][_0x3e1b38(0x2f3)]=_0x4e016e;},VisuMZ['MovementEffects'][_0x4ee445(0x3b8)]=Game_Player['prototype'][_0x4ee445(0x2ca)],Game_Player['prototype'][_0x4ee445(0x2ca)]=function(){const _0x3aad73=_0x4ee445;if(this[_0x3aad73(0x3ab)]())this[_0x3aad73(0x279)]();else this[_0x3aad73(0x3ac)]()?_0x3aad73(0x37f)!==_0x3aad73(0x37f)?this['playFootstepSound']():this[_0x3aad73(0x2b1)]():(VisuMZ[_0x3aad73(0x195)]['Game_Player_moveByInput'][_0x3aad73(0x2c3)](this),this[_0x3aad73(0x2d7)]());},Game_Player[_0x4ee445(0x30f)]['updateSmartMovementCooldowns']=function(){const _0x5f4892=_0x4ee445;this[_0x5f4892(0x1b5)](),this['updateSmartBlinkCooldown'](),this['updateSmartJumpCooldown']();},VisuMZ['MovementEffects']['Game_Player_updateScroll']=Game_Player[_0x4ee445(0x30f)][_0x4ee445(0xd8)],Game_Player['prototype'][_0x4ee445(0xd8)]=function(_0x5dff72,_0x5788a9){const _0x9ef80=_0x4ee445;this[_0x9ef80(0x1c5)]()?this[_0x9ef80(0x1b9)](_0x5dff72,_0x5788a9):VisuMZ[_0x9ef80(0x195)]['Game_Player_updateScroll']['call'](this,_0x5dff72,_0x5788a9);},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x1c5)]=function(){const _0x2d4d3d=_0x4ee445;if(!$gameMap[_0x2d4d3d(0x113)]())return![];if($gameMap['isScrolling']())return this[_0x2d4d3d(0x1e6)]=!![],this[_0x2d4d3d(0x21b)]=this[_0x2d4d3d(0x257)],this[_0x2d4d3d(0x213)]=this['_realY'],![];if(this[_0x2d4d3d(0x1e6)])return(this[_0x2d4d3d(0x21b)]!==this[_0x2d4d3d(0x257)]||this['_lastSmoothScrollY']!==this[_0x2d4d3d(0x1f4)])&&(this['_wasEventScrolling']=![],this[_0x2d4d3d(0x21b)]=this['_realX'],this[_0x2d4d3d(0x213)]=this[_0x2d4d3d(0x1f4)]),!this[_0x2d4d3d(0x1e6)];return!![];},Game_Player['prototype'][_0x4ee445(0x1b9)]=function(_0x38957b,_0x4dd14e){const _0x264f31=_0x4ee445,_0x219122=this[_0x264f31(0x189)](),_0x7293fe=this[_0x264f31(0x2f8)](),_0x1416f9=this[_0x264f31(0x205)](),_0x3c8a3d=this[_0x264f31(0x160)](),_0x500cbb=this['isDashing']()||this[_0x264f31(0x100)](),_0x2aeb44=$gameSystem[_0x264f31(0x3b2)](![],_0x500cbb),_0x426c38=$gameSystem[_0x264f31(0x3b2)](!![],_0x500cbb),_0x1c7b66=VisuMZ[_0x264f31(0x195)][_0x264f31(0x219)]();if(_0x1416f9<_0x219122){if('nUTXa'===_0x264f31(0x198))return{'enabled':!![],'volumeRate':0x1,'pitchRate':0x1};else{const _0x14e9c7=_0x219122-_0x1416f9,_0x19746e=_0x2aeb44*_0x1c7b66,_0x10247b=_0x14e9c7/(_0x19746e||0.01);$gameMap['scrollLeft'](_0x10247b);}}if(_0x1416f9>_0x219122){if(_0x264f31(0x2c6)!==_0x264f31(0x2c6))this['_smartBlink'][_0x264f31(0xe2)]=_0x5b5cb7['$1']['split'](',')[_0x264f31(0xfb)](_0x206609=>(_0x2a9ec4(_0x206609)||0x0)[_0x264f31(0x119)](0x0,0xff));else{const _0x5ba9ce=_0x1416f9-_0x219122,_0x233e81=_0x2aeb44*_0x1c7b66,_0x3767a1=_0x5ba9ce/(_0x233e81||0.01);$gameMap[_0x264f31(0x1a0)](_0x3767a1);}}if(_0x3c8a3d>_0x7293fe){if(_0x264f31(0x255)!==_0x264f31(0x29f)){const _0x1dd1b2=_0x3c8a3d-_0x7293fe,_0x3740a1=_0x426c38*_0x1c7b66,_0x4dc5ed=_0x1dd1b2/(_0x3740a1||0.01);$gameMap['scrollDown'](_0x4dc5ed);}else{if(!_0x1c8432['smoothCamera'])return![];if(_0x368494){const _0x32f492=_0x2a97a3[_0x264f31(0x195)][_0x264f31(0x2d4)],_0x411f39=_0x5868ad[_0x264f31(0x23a)]||'';if(_0x411f39[_0x264f31(0x34f)](_0x32f492[_0x264f31(0x1cb)]))return!![];else{if(_0x411f39[_0x264f31(0x34f)](_0x32f492[_0x264f31(0x2af)]))return![];}}return _0x3855c5[_0x264f31(0x350)]();}}if(_0x3c8a3d<_0x7293fe){if(_0x264f31(0x2d8)==='rUnoJ')this['_smartJump'][_0x264f31(0x303)]=_0x3e499a['$1'][_0x264f31(0x27f)](',')[_0x264f31(0xfb)](_0x3ac98e=>(_0xa2d221(_0x3ac98e)||0x0)['clamp'](0x0,0xff)),this['_smartJump'][_0x264f31(0x303)][_0x264f31(0xbe)]();else{const _0x3462b1=_0x7293fe-_0x3c8a3d,_0x11430a=_0x426c38*_0x1c7b66,_0x470b69=_0x3462b1/(_0x11430a||0.01);$gameMap[_0x264f31(0x26e)](_0x470b69);}}},VisuMZ['MovementEffects'][_0x4ee445(0x219)]=function(){return 1.0017453;},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x397)]=Game_CharacterBase[_0x4ee445(0x30f)]['updateAnimationCount'],Game_CharacterBase[_0x4ee445(0x30f)]['updateAnimationCount']=function(){const _0x58215f=_0x4ee445;VisuMZ['MovementEffects'][_0x58215f(0x397)][_0x58215f(0x2c3)](this),this[_0x58215f(0x246)]&&this[_0x58215f(0x246)]--;},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x1db)]=function(){const _0x1a88e0=_0x4ee445;Game_Character[_0x1a88e0(0x30f)][_0x1a88e0(0x1db)][_0x1a88e0(0x2c3)](this),this[_0x1a88e0(0x246)]=0x3c;},Game_Player['prototype'][_0x4ee445(0x243)]=function(){const _0xa99c8f=_0x4ee445;return $gameParty[_0xa99c8f(0x370)]()?$gameParty[_0xa99c8f(0x370)]()[_0xa99c8f(0x243)]():Game_Character[_0xa99c8f(0x30f)][_0xa99c8f(0x243)][_0xa99c8f(0x2c3)](this);},Game_Player[_0x4ee445(0x30f)]['footprintsData']=function(){const _0x2c87dc=_0x4ee445;return $gameParty[_0x2c87dc(0x370)]()?$gameParty['leader']()[_0x2c87dc(0x2ae)]():Game_Character[_0x2c87dc(0x30f)][_0x2c87dc(0x2ae)][_0x2c87dc(0x2c3)](this);},Game_Player[_0x4ee445(0x30f)]['isSmartMoving']=function(){const _0xf3553d=_0x4ee445;return this[_0xf3553d(0x3ab)]()||this['isSmartJumping']();},Game_Player['prototype']['isSmartMoveNonViableState']=function(){const _0x592855=_0x4ee445;if(this[_0x592855(0x11f)]())return!![];if(this['isInVehicle']())return!![];if(this[_0x592855(0x149)]())return!![];return![];},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x234)]=function(_0x560037){const _0x434bde=_0x4ee445;if(!_0x560037)return;if(_0x560037[_0x434bde(0x387)])return;const _0x2478e4=this[_0x434bde(0x31b)](_0x560037);this['setDirection'](_0x2478e4);},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x31b)]=function(_0x1f4459){const _0x14fa3f=_0x4ee445;if(!_0x1f4459)return this['direction']();if(_0x1f4459['allowDiagonal'])return this[_0x14fa3f(0x1a2)]();const _0x566f3d=this[_0x14fa3f(0x12d)](this[_0x14fa3f(0x1a2)](),_0x1f4459);return _0x566f3d;},Game_Player[_0x4ee445(0x30f)]['straightenDiagonal']=function(_0x19654b,_0x1885c0){if(!_0x1885c0)return _0x19654b;if(_0x1885c0['allowDiagonal'])return _0x19654b;if(_0x19654b===0x1)return 0x4;if(_0x19654b===0x3)return 0x6;if(_0x19654b===0x7)return 0x4;if(_0x19654b===0x9)return 0x6;return _0x19654b;},Game_Player[_0x4ee445(0x251)]=VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x15a)][_0x4ee445(0x23d)][_0x4ee445(0x164)]||0x0,Game_Player[_0x4ee445(0x296)]=VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x15a)][_0x4ee445(0x23d)][_0x4ee445(0x111)]||0x1,Game_Player['SMART_RUSH_SHAKE_ENABLED']=VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x15a)][_0x4ee445(0x23d)][_0x4ee445(0x249)]||![],Game_Player['SMART_RUSH_SHAKE_POWER_RATE']=VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x15a)][_0x4ee445(0x23d)][_0x4ee445(0x32a)]||0x1,Game_Player[_0x4ee445(0x2f1)]=VisuMZ[_0x4ee445(0x195)]['Settings'][_0x4ee445(0x23d)]['ShakeSpeedRate']||0x1,Game_Player['SMART_RUSH_SHAKE_DURATION']=VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x15a)][_0x4ee445(0x23d)]['ShakeDuration']||0x1,Game_Player['prototype'][_0x4ee445(0xed)]=function(_0x2d9b67,_0x373023,_0x4db601,_0x1c1b43,_0x958197){const _0x596ad2=_0x4ee445;if(!this[_0x596ad2(0xde)]())return![];const _0x26394d=VisuMZ['MovementEffects'][_0x596ad2(0x15a)][_0x596ad2(0x23d)];return this['straightenFacedDirection'](_0x26394d),this[_0x596ad2(0x38a)]=_0x2d9b67,this[_0x596ad2(0x12e)]=_0x373023||0x1,this[_0x596ad2(0x129)]=(_0x4db601||[])[_0x596ad2(0x2d6)](),this[_0x596ad2(0x2cf)]=_0x1c1b43||1.5,this[_0x596ad2(0x19c)]=JsonEx['makeDeepCopy'](_0x958197),this[_0x596ad2(0xc3)](!![]),!![];},Game_Player['prototype']['canSmartRush']=function(){const _0x1ed160=_0x4ee445;if(!$gameMap[_0x1ed160(0x276)]())return![];if(this[_0x1ed160(0x12e)])return![];if(this[_0x1ed160(0xca)]())return![];if(this[_0x1ed160(0x15d)]())return![];if(this[_0x1ed160(0x1ab)]())return![];if(this[_0x1ed160(0x118)]())return![];const _0x4c7ffe=VisuMZ[_0x1ed160(0x195)][_0x1ed160(0x15a)]['SmartRush'],_0x2b6646=this[_0x1ed160(0x31b)](_0x4c7ffe);return this['canPass'](this['x'],this['y'],_0x2b6646);},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x3ab)]=function(){const _0x47d0e6=_0x4ee445;return this[_0x47d0e6(0x38a)]!==undefined&&this[_0x47d0e6(0x38a)]>0x0;},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x394)]=Game_Player['prototype'][_0x4ee445(0x330)],Game_Player[_0x4ee445(0x30f)]['isDashing']=function(){const _0x263910=_0x4ee445;if(this[_0x263910(0x3ab)]())return!![];return VisuMZ[_0x263910(0x195)][_0x263910(0x394)][_0x263910(0x2c3)](this);},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0xe6)]=Game_CharacterBase[_0x4ee445(0x30f)]['realMoveSpeed'],Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0x206)]=function(){const _0x2cf533=_0x4ee445;if(!this[_0x2cf533(0x23b)]())return VisuMZ[_0x2cf533(0x195)][_0x2cf533(0xe6)]['call'](this);let _0x14d5cf=VisuMZ[_0x2cf533(0x195)][_0x2cf533(0xe6)][_0x2cf533(0x2c3)](this);return _0x14d5cf+=$gameSystem[_0x2cf533(0x30d)](this[_0x2cf533(0x185)])*0x1,this===$gamePlayer&&this[_0x2cf533(0x3ab)]()&&(_0x14d5cf*=this[_0x2cf533(0x2cf)]||1.5),Math[_0x2cf533(0x107)](0x1,_0x14d5cf);},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x279)]=function(){const _0x25d696=_0x4ee445;if(this[_0x25d696(0x23b)]())return;if(this[_0x25d696(0x11f)]())return;this[_0x25d696(0x309)](this[_0x25d696(0x1a2)]());this[_0x25d696(0x351)]()?(this[_0x25d696(0x38a)]=this[_0x25d696(0x38a)]||0x1,this['_smartRushMode']--):(this[_0x25d696(0x1c6)]()&&($gameScreen[_0x25d696(0x392)](this[_0x25d696(0x38a)]),this[_0x25d696(0x323)]()),this[_0x25d696(0x38a)]=0x0);if(this[_0x25d696(0x149)]()){if(_0x25d696(0x1c8)!==_0x25d696(0x306))this[_0x25d696(0x38a)]=0x0;else{if(this[_0x25d696(0x20f)]===_0x3369da)this[_0x25d696(0x346)]();return this[_0x25d696(0x20f)];}}if(this[_0x25d696(0x38a)]<=0x0){if('QVktN'!==_0x25d696(0x24a))setTimeout(this['setSmartRushSwitch'][_0x25d696(0x2e9)](this,![]),0x32);else{const _0x260c1d=_0x37658e['MovementEffects'][_0x25d696(0x15a)][_0x25d696(0xef)];this[_0x25d696(0x2de)]={'enabled':_0x260c1d[_0x25d696(0x1d6)],'volumeRate':_0x260c1d[_0x25d696(0x247)],'pitchRate':_0x260c1d[_0x25d696(0x29b)],'soundFrames':_0x260c1d[_0x25d696(0x145)]['clone']()};}}},Game_Player['prototype'][_0x4ee445(0x2d3)]=function(){const _0x1f2ae1=_0x4ee445;this[_0x1f2ae1(0x38a)]=0x0,setTimeout(this['setSmartRushSwitch'][_0x1f2ae1(0x2e9)](this,![]),0x32);},Game_Screen[_0x4ee445(0x30f)][_0x4ee445(0x392)]=function(_0x429ade){const _0x567972=_0x4ee445,_0x5f5d21=(_0x429ade*Game_Player[_0x567972(0x1f1)])[_0x567972(0x119)](0x1,0x9),_0x4b8a7f=(_0x429ade*Game_Player['SMART_RUSH_SHAKE_SPEED_RATE'])['clamp'](0x1,0x9);this[_0x567972(0xd1)](_0x5f5d21,_0x4b8a7f,Game_Player['SMART_RUSH_SHAKE_DURATION']);},Game_Player[_0x4ee445(0x30f)]['startSmartRushCrashWalkBack']=function(){const _0x1df6d3=_0x4ee445,_0x296d6c=this[_0x1df6d3(0x1a2)](),_0x518a6f=((this[_0x1df6d3(0x2cf)]-0x1)*0x2)[_0x1df6d3(0x119)](0.25,0.85),_0x59be5c=((this['_smartRushSpeedRate']-0x1)*1.5)[_0x1df6d3(0x119)](0.15,0.3);if([0x1,0x4,0x7][_0x1df6d3(0x2e4)](_0x296d6c))this[_0x1df6d3(0x257)]-=_0x518a6f;if([0x3,0x6,0x9][_0x1df6d3(0x2e4)](_0x296d6c))this['_realX']+=_0x518a6f;if([0x7,0x8,0x9][_0x1df6d3(0x2e4)](_0x296d6c))this['_realY']-=_0x518a6f;if([0x1,0x2,0x3][_0x1df6d3(0x2e4)](_0x296d6c))this['_realY']+=_0x59be5c;},Game_Player[_0x4ee445(0x30f)]['isSmartRushCrashShake']=function(){const _0x85405d=_0x4ee445;if(!Game_Player['SMART_RUSH_SHAKE_ENABLED'])return![];const _0x3330f5=this['direction'](),_0x4ea2f4=this['x'],_0x26f44d=this['y'];return $gameMap[_0x85405d(0x22f)](_0x4ea2f4,_0x26f44d,_0x3330f5);},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x1b5)]=function(){const _0x12d00c=_0x4ee445;if(this[_0x12d00c(0x12e)]){if(_0x12d00c(0x396)===_0x12d00c(0x396))this[_0x12d00c(0x12e)]--;else{if(this[_0x12d00c(0x1ff)]===_0x109013&&!this[_0x12d00c(0x301)]())return![];if(this[_0x12d00c(0x1ff)]===_0x58222d&&this[_0x12d00c(0xd9)]())return![];if(this[_0x12d00c(0x1ab)]())return![];const _0x242fb4=this['x'],_0x42a02d=this['y'];return this[_0x12d00c(0x2ae)]()[_0x12d00c(0x2f3)]&&_0x5824f2['canMakeFootprints'](_0x242fb4,_0x42a02d);}}},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0xc3)]=function(_0x4b3d5a){const _0x513d69=_0x4ee445;this[_0x513d69(0x129)]=this[_0x513d69(0x129)]||[];for(const _0x3180b0 of this[_0x513d69(0x129)]){if(_0x513d69(0x2cc)===_0x513d69(0x24e)){{const _0x263cbc=_0x52ab54['MovementEffects'][_0x513d69(0x15a)][_0x513d69(0xef)];this[_0x513d69(0x2de)]={'enabled':_0x263cbc[_0x513d69(0x1d6)],'volumeRate':_0x263cbc[_0x513d69(0x247)],'pitchRate':_0x263cbc[_0x513d69(0x29b)],'soundFrames':_0x263cbc[_0x513d69(0x145)][_0x513d69(0x2d6)]()};}{const _0x1cd04a=_0x3986eb[_0x513d69(0x195)][_0x513d69(0x15a)][_0x513d69(0x37c)];this[_0x513d69(0x335)]={'enabled':!![],'dir1':_0x38d1cb['parse'](_0x8a165e['stringify'](_0x1cd04a[_0x513d69(0x30b)])),'dir2':_0x9e517c['parse'](_0x4ce00f[_0x513d69(0x10f)](_0x1cd04a[_0x513d69(0x24f)])),'dir3':_0x3ce493[_0x513d69(0x3a9)](_0x49539d[_0x513d69(0x10f)](_0x1cd04a[_0x513d69(0x385)])),'dir4':_0x351784['parse'](_0x3f20b9[_0x513d69(0x10f)](_0x1cd04a[_0x513d69(0x23f)])),'dir6':_0x3d5d8d[_0x513d69(0x3a9)](_0x34d901[_0x513d69(0x10f)](_0x1cd04a[_0x513d69(0xe3)])),'dir7':_0x138800[_0x513d69(0x3a9)](_0x5d5723[_0x513d69(0x10f)](_0x1cd04a[_0x513d69(0x375)])),'dir8':_0x2f9761['parse'](_0x3c2e1a['stringify'](_0x1cd04a[_0x513d69(0x19f)])),'dir9':_0x2cb1e0[_0x513d69(0x3a9)](_0x2e626e[_0x513d69(0x10f)](_0x1cd04a[_0x513d69(0x308)]))};}this[_0x513d69(0x236)]={'nonLand':![],'nonPass':![]};}else $gameSwitches[_0x513d69(0x256)](_0x3180b0,_0x4b3d5a);}!_0x4b3d5a&&(this[_0x513d69(0x38a)]=0x0);},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x158)]=Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x1d7)],Game_Player['prototype'][_0x4ee445(0x1d7)]=function(_0x129e9f,_0x18061b,_0x37b45e,_0x2f4c68,_0x45991d){const _0x31321d=_0x4ee445;VisuMZ['MovementEffects'][_0x31321d(0x158)][_0x31321d(0x2c3)](this,_0x129e9f,_0x18061b,_0x37b45e,_0x2f4c68,_0x45991d),this[_0x31321d(0x2d3)]();},Game_Player[_0x4ee445(0xc4)]=VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x15a)][_0x4ee445(0x35f)][_0x4ee445(0x111)],Game_Player[_0x4ee445(0x2c1)]=VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x15a)]['SmartBlink'][_0x4ee445(0x164)],Game_Player[_0x4ee445(0x3a3)]=VisuMZ['MovementEffects'][_0x4ee445(0x15a)][_0x4ee445(0x35f)][_0x4ee445(0x14a)]??![],Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x29e)]=function(_0x57bb8b,_0x3aa59e,_0x32a8aa,_0x9aaebe){const _0x19f9e9=_0x4ee445;_0x32a8aa=_0x32a8aa||{'NonLandableRegions':[],'NonLandableTerrainTags':[],'NonPassableRegions':[],'NonPassableTerrainTags':[]},this[_0x19f9e9(0x305)]=JsonEx['makeDeepCopy'](_0x32a8aa),_0x57bb8b=this[_0x19f9e9(0x20e)](_0x57bb8b||0x1);if(!this[_0x19f9e9(0x294)](_0x57bb8b))return![];const _0x3b89c8=VisuMZ['MovementEffects'][_0x19f9e9(0x15a)][_0x19f9e9(0x35f)];return this[_0x19f9e9(0x234)](_0x3b89c8),this[_0x19f9e9(0x147)]=_0x57bb8b||0x1,this[_0x19f9e9(0x3b5)]=_0x3aa59e||0x1,this[_0x19f9e9(0x291)]=JsonEx[_0x19f9e9(0x2c0)](_0x9aaebe),this[_0x19f9e9(0x29c)](_0x57bb8b),!![];},Game_Player['prototype'][_0x4ee445(0x20e)]=function(_0x336b28){const _0x8a2b67=_0x4ee445,_0x2e0f8e=this['_smartBlinkRestrictions'],_0xf200e4=this[_0x8a2b67(0x1a2)](),_0xe06df1=VisuMZ[_0x8a2b67(0x195)][_0x8a2b67(0x15a)][_0x8a2b67(0x35f)];this[_0x8a2b67(0x234)](_0xe06df1);const _0x6f1893=this[_0x8a2b67(0x1a2)]();let _0x1ff2be=0x0,_0x10033c=this['x'],_0x3c7e2c=this['y'],_0x627c89=0x0,_0x193d3d=0x0;if([0x1,0x4,0x7][_0x8a2b67(0x2e4)](_0x6f1893))_0x627c89=-0x1;if([0x3,0x6,0x9][_0x8a2b67(0x2e4)](_0x6f1893))_0x627c89=0x1;if([0x7,0x8,0x9][_0x8a2b67(0x2e4)](_0x6f1893))_0x193d3d=-0x1;if([0x1,0x2,0x3]['includes'](_0x6f1893))_0x193d3d=0x1;for(let _0x926b2e=0x1;_0x926b2e<=_0x336b28;_0x926b2e++){if(_0x8a2b67(0x1d2)!==_0x8a2b67(0x1d2)){_0x438a14=_0x300e9e['toLowerCase']()[_0x8a2b67(0x11e)]();switch(_0xd65883){case _0x8a2b67(0xee):return 0x2;case _0x8a2b67(0x156):return 0x4;case _0x8a2b67(0x319):return 0x6;case'up':return 0x8;case _0x8a2b67(0x258):return 0x1;case'lower\x20right':return 0x3;case _0x8a2b67(0x1e1):return 0x7;case _0x8a2b67(0xb4):return 0x9;}return _0x4e9138(_0x540961)||0x0;}else{_0x10033c+=_0x627c89,_0x3c7e2c+=_0x193d3d;if(this[_0x8a2b67(0x3a5)](_0x10033c,_0x3c7e2c))break;if(this[_0x8a2b67(0x372)](_0x10033c,_0x3c7e2c)){if(_0x8a2b67(0x368)===_0x8a2b67(0x368)){_0x1ff2be=_0x926b2e;continue;}else _0x1613a7['MovementEffects']['Game_System_initialize'][_0x8a2b67(0x2c3)](this),this['initMovementEffectsSmoothCamera'](),this[_0x8a2b67(0x177)](),this['initMovementEffectsFootstepSounds'](),this[_0x8a2b67(0x346)](),this[_0x8a2b67(0x39d)]();}const _0x768108=$gameMap['regionId'](_0x10033c,_0x3c7e2c),_0x314e96=$gameMap[_0x8a2b67(0x1ce)](_0x10033c,_0x3c7e2c);if(_0x2e0f8e[_0x8a2b67(0x35c)]['includes'](_0x768108))break;if(_0x2e0f8e[_0x8a2b67(0x354)][_0x8a2b67(0x2e4)](_0x314e96))break;if($gameMap['isTileSmartBlinkNonPassable'](_0x10033c,_0x3c7e2c))break;if(_0x2e0f8e[_0x8a2b67(0xe2)]['includes'](_0x768108))continue;if(_0x2e0f8e['NonLandableTerrainTags'][_0x8a2b67(0x2e4)](_0x314e96))continue;if($gameMap[_0x8a2b67(0x356)](_0x10033c,_0x3c7e2c))continue;if(!$gameMap[_0x8a2b67(0x321)](_0x10033c,_0x3c7e2c))continue;if(this['isCollidedWithCharacters'](_0x10033c,_0x3c7e2c))continue;if(!$gameMap[_0x8a2b67(0x2cd)](_0x10033c,_0x3c7e2c))continue;if(!Game_Player[_0x8a2b67(0x3a3)]){if(!$gameMap[_0x8a2b67(0x2dc)](this['x'],this['y'])&&$gameMap[_0x8a2b67(0x2dc)](_0x10033c,_0x3c7e2c))continue;}_0x1ff2be=_0x926b2e;}}return this[_0x8a2b67(0x39a)](_0xf200e4),_0x1ff2be;},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x3a5)]=function(_0x61eed6,_0x5a7258){return![];},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x372)]=function(_0xa75336,_0x23d981){return![];},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x294)]=function(_0x48d5f0){const _0x5b8de7=_0x4ee445;if(!$gameMap['isSmartBlinkEnabled']())return![];if(this[_0x5b8de7(0x3b5)])return![];if(this['isSmartMoving']())return![];if(this['isSmartMoveNonViableState']())return![];if(this[_0x5b8de7(0x1ab)]())return![];if(this[_0x5b8de7(0x118)]())return![];return _0x48d5f0>=0x1;},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x29c)]=function(){const _0x31a14c=_0x4ee445,_0x34fbec=this[_0x31a14c(0x147)],_0xf0c3f8=this['direction']();let _0x3ccbe8=this['x'],_0x487399=this['y'];if([0x1,0x4,0x7][_0x31a14c(0x2e4)](_0xf0c3f8))_0x3ccbe8+=-_0x34fbec;if([0x3,0x6,0x9][_0x31a14c(0x2e4)](_0xf0c3f8))_0x3ccbe8+=_0x34fbec;if([0x7,0x8,0x9][_0x31a14c(0x2e4)](_0xf0c3f8))_0x487399+=-_0x34fbec;if([0x1,0x2,0x3][_0x31a14c(0x2e4)](_0xf0c3f8))_0x487399+=_0x34fbec;this[_0x31a14c(0x2fc)]()['enabled']&&this[_0x31a14c(0x2a6)]();Game_Character[_0x31a14c(0x30f)][_0x31a14c(0x19e)]['call'](this,_0x3ccbe8,_0x487399),this['_followers']['synchronize'](_0x3ccbe8,_0x487399,this['direction']());if(!$gameMap['isUsingSmoothCamera']())this['center'](_0x3ccbe8,_0x487399);this[_0x31a14c(0x1ba)](),setTimeout(this[_0x31a14c(0x110)][_0x31a14c(0x2e9)](this,[0x1,0x2]),0x32);},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x1ba)]=function(){const _0x1f4f1a=_0x4ee445,_0x510dae=SceneManager[_0x1f4f1a(0x345)][_0x1f4f1a(0x233)];if(_0x510dae){const _0x23c267=this[_0x1f4f1a(0x355)]()[_0x1f4f1a(0xe7)](),_0x28a96f=[this][_0x1f4f1a(0x2be)](_0x23c267);for(const _0x2c564f of _0x28a96f){const _0x576eb1=_0x510dae['findTargetSprite'](_0x2c564f);if(_0x576eb1){const _0x1c6ef5=Game_Player[_0x1f4f1a(0xc4)],_0x154105=Game_Player['SMART_BLINK_FILTER_ANGLE_OFFSET'];_0x576eb1[_0x1f4f1a(0x2f5)](_0x1c6ef5,_0x154105);}}}},Game_Player['prototype'][_0x4ee445(0x1c4)]=function(){const _0x4cd83a=_0x4ee445;this[_0x4cd83a(0x3b5)]&&this[_0x4cd83a(0x3b5)]--;},Game_Player['prototype'][_0x4ee445(0x18e)]=function(_0x559c24,_0x127c72,_0x42021e,_0x37b7e3){const _0x30503c=_0x4ee445;_0x42021e=_0x42021e||{'NonLandableRegions':[],'NonLandableTerrainTags':[],'NonPassableRegions':[],'NonPassableTerrainTags':[]},this[_0x30503c(0x25d)]=JsonEx[_0x30503c(0x2c0)](_0x42021e);if(!this['canSmartJump']())return![];const _0x342b2d=VisuMZ[_0x30503c(0x195)][_0x30503c(0x15a)]['SmartJump'];return this[_0x30503c(0x234)](_0x342b2d),_0x559c24=this[_0x30503c(0x38d)](_0x559c24),this[_0x30503c(0x26d)]=!![],this['_smartJumpCooldown']=_0x127c72||0x1,this[_0x30503c(0x3ae)]=JsonEx[_0x30503c(0x2c0)](_0x37b7e3),this[_0x30503c(0x2ba)](_0x559c24),!![];},Game_Player[_0x4ee445(0x30f)]['canSmartJump']=function(){const _0x490390=_0x4ee445;if(!$gameMap['isSmartJumpEnabled']())return![];if(this['_smartJumpCooldown'])return![];if(this[_0x490390(0xca)]())return![];if(this[_0x490390(0x15d)]())return![];if(this['isTransparent']())return![];if(this[_0x490390(0x118)]())return![];return!![];},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x3ac)]=function(){const _0x52ac98=_0x4ee445;return this[_0x52ac98(0x26d)];},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x38d)]=function(_0x5a797d){const _0x5afb56=_0x4ee445,_0x3db071=this['_smartJumpRestrictions'],_0x17dfcc=this[_0x5afb56(0x1a2)]();let _0x340cc2=0x0,_0x5c8bb6=this['x'],_0x27b7c3=this['y'],_0x595c9f=0x0,_0x3d59be=0x0;if([0x1,0x4,0x7]['includes'](_0x17dfcc))_0x595c9f=-0x1;if([0x3,0x6,0x9]['includes'](_0x17dfcc))_0x595c9f=0x1;if([0x7,0x8,0x9][_0x5afb56(0x2e4)](_0x17dfcc))_0x3d59be=-0x1;if([0x1,0x2,0x3][_0x5afb56(0x2e4)](_0x17dfcc))_0x3d59be=0x1;for(let _0x5d8b55=0x1;_0x5d8b55<=_0x5a797d;_0x5d8b55++){_0x5c8bb6+=_0x595c9f,_0x27b7c3+=_0x3d59be;if(this[_0x5afb56(0x2d1)](_0x5c8bb6,_0x27b7c3))break;if(this['isTileSmartJumpCompatible'](_0x5c8bb6,_0x27b7c3)){_0x340cc2=_0x5d8b55;continue;}if($gameMap['isLadder'](_0x5c8bb6,_0x27b7c3))break;const _0x234913=$gameMap[_0x5afb56(0x138)](_0x5c8bb6,_0x27b7c3),_0x5ecca4=$gameMap[_0x5afb56(0x1ce)](_0x5c8bb6,_0x27b7c3);if(_0x3db071[_0x5afb56(0x35c)]['includes'](_0x234913))break;if(_0x3db071[_0x5afb56(0x354)][_0x5afb56(0x2e4)](_0x5ecca4))break;if($gameMap[_0x5afb56(0xdb)](_0x5c8bb6,_0x27b7c3))break;if(_0x3db071[_0x5afb56(0xe2)]['includes'](_0x234913))continue;if(_0x3db071['NonLandableTerrainTags'][_0x5afb56(0x2e4)](_0x5ecca4))continue;if($gameMap[_0x5afb56(0x32e)](_0x5c8bb6,_0x27b7c3))continue;if(!$gameMap[_0x5afb56(0x321)](_0x5c8bb6,_0x27b7c3))continue;if(this[_0x5afb56(0x2d2)](_0x5c8bb6,_0x27b7c3))continue;if(!$gameMap[_0x5afb56(0x2cd)](_0x5c8bb6,_0x27b7c3))continue;if(!$gameMap[_0x5afb56(0x373)](_0x5c8bb6,_0x27b7c3,_0x340cc2))continue;_0x340cc2=_0x5d8b55;}return _0x340cc2;},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x2d1)]=function(_0x21cd33,_0x3342e7){const _0x5824e9=_0x4ee445;if(!$gameMap[_0x5824e9(0x2dc)](this['x'],this['y'])&&$gameMap[_0x5824e9(0x2dc)](_0x21cd33,_0x3342e7)){if(_0x5824e9(0x10a)===_0x5824e9(0x2ce)){if(_0x2c76bf[_0x5824e9(0x337)]())return!![];this[_0x5824e9(0x307)]='';}else return!![];}return![];},Game_Player['prototype'][_0x4ee445(0x202)]=function(_0x2fabfe,_0x2ed1ab){const _0x2d7bfb=_0x4ee445;if(!$gameMap['isCeilingTile'](this['x'],this['y'])&&$gameMap[_0x2d7bfb(0x2dc)](_0x2fabfe,_0x2ed1ab))return![];return![];},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x2ba)]=function(_0x3832d9){const _0x3659e3=_0x4ee445,_0x442529=this[_0x3659e3(0x1a2)]();let _0x482c80=0x0,_0x2eb60f=0x0;if([0x1,0x4,0x7][_0x3659e3(0x2e4)](_0x442529))_0x482c80+=-_0x3832d9;if([0x3,0x6,0x9][_0x3659e3(0x2e4)](_0x442529))_0x482c80+=_0x3832d9;if([0x7,0x8,0x9][_0x3659e3(0x2e4)](_0x442529))_0x2eb60f+=-_0x3832d9;if([0x1,0x2,0x3][_0x3659e3(0x2e4)](_0x442529))_0x2eb60f+=_0x3832d9;_0x2eb60f=this['processSmartJumpHeightFactor'](_0x482c80,_0x2eb60f);const _0x4ee12e=this[_0x3659e3(0x1a2)]();this[_0x3659e3(0x242)](_0x482c80,_0x2eb60f),this[_0x3659e3(0x39a)](_0x4ee12e);},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x36d)]=function(_0x2887b8,_0x443b21){const _0x3c4567=_0x4ee445;if(!$gameMap[_0x3c4567(0x17f)](this['x'],this['y']))return _0x443b21;if($gameMap[_0x3c4567(0x3a7)](this['x'],this['y']))return _0x443b21;let _0x204ea0=this['x']+_0x2887b8,_0x35f6c4=this['y']+_0x443b21;if(!$gameMap[_0x3c4567(0x17f)](_0x204ea0,_0x35f6c4))return _0x443b21;const _0x526a56=this['regionId']();if($gameMap[_0x3c4567(0x3a7)](_0x526a56))return _0x443b21;let _0x82f07b=$gameMap[_0x3c4567(0x138)](_0x204ea0,_0x35f6c4);if(!$gameMap[_0x3c4567(0x3a7)](_0x82f07b))return _0x443b21;const _0x3b324f=this[_0x3c4567(0x1a2)]();if(_0x3b324f===0x2)return _0x443b21;if(_0x3b324f===0x8)return _0x443b21;_0x443b21+=_0x526a56-_0x82f07b;for(;;){if(_0x3c4567(0x380)===_0x3c4567(0x380)){const _0x38af13=_0x204ea0,_0x5b7868=this['y']+_0x443b21,_0x1f3345=$gameMap[_0x3c4567(0x138)](_0x38af13,_0x5b7868);if($gameMap[_0x3c4567(0x17f)](_0x38af13,_0x5b7868)&&!$gameMap[_0x3c4567(0x3a7)](_0x1f3345)){if(_0x3c4567(0x1b6)==='iJLGR'){_0x443b21--;continue;}else _0x5f10ee['prototype']['update'][_0x3c4567(0x2c3)](this),this['_ready']&&(this[_0x3c4567(0x281)](),this['updatePosition']());}if($gameMap[_0x3c4567(0x2cd)](_0x38af13,_0x5b7868)){if(_0x3c4567(0xfe)!==_0x3c4567(0x34c))break;else{if(!_0x21db90[_0x3c4567(0x345)])return![];if(!_0x2e1030[_0x3c4567(0x345)][_0x3c4567(0x233)])return![];if(this['constructor']!==_0x17b370)return![];if(!this[_0x3c4567(0x3b0)])return![];if(this[_0x3c4567(0x3b0)][_0x3c4567(0x2f2)])return![];if(!this[_0x3c4567(0x32b)])return![];if(this[_0x3c4567(0x1b0)]<=0x0)return![];if(!this['_frame'])return![];if(!this[_0x3c4567(0x1b7)])return![];if(this[_0x3c4567(0x216)][_0x3c4567(0x33d)]===this[_0x3c4567(0x1b7)][_0x3c4567(0x33d)])return![];if(this[_0x3c4567(0x2da)]===this[_0x3c4567(0x3b0)][_0x3c4567(0x257)]&&this[_0x3c4567(0x18b)]===this[_0x3c4567(0x3b0)][_0x3c4567(0x1f4)])return![];return!![];}}_0x443b21--;if(_0x443b21<=0x0)break;}else _0x5c912d[_0x3c4567(0x1f7)]([_0x4714b6],_0x5f2a44);}return _0x443b21;},Game_Player['prototype'][_0x4ee445(0x2b1)]=function(){const _0x19c1c5=_0x4ee445;if(this[_0x19c1c5(0x11f)]())return;this[_0x19c1c5(0x26d)]=![];if(this[_0x19c1c5(0x3bb)]()){let _0x38c23e=Math[_0x19c1c5(0x107)](Math[_0x19c1c5(0x2bf)](this[_0x19c1c5(0x2bc)]/0x2),0x1);while(_0x38c23e--)this[_0x19c1c5(0x371)]();}if(this[_0x19c1c5(0x38c)]())this['playFootstepSound']();setTimeout(this['checkEventTriggerHere'][_0x19c1c5(0x2e9)](this,[0x1,0x2]),0x32);},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0xdf)]=function(){const _0x129983=_0x4ee445;if(this[_0x129983(0x15c)]){if('jBqIH'!=='EexHK')this['_smartJumpCooldown']--;else{const _0x5e08b4=this[_0x129983(0x1a2)]();let _0x424d07=0x0,_0x5f33ef=0x0;if([0x1,0x4,0x7][_0x129983(0x2e4)](_0x5e08b4))_0x424d07+=-_0x267a3f;if([0x3,0x6,0x9][_0x129983(0x2e4)](_0x5e08b4))_0x424d07+=_0x36c8a1;if([0x7,0x8,0x9]['includes'](_0x5e08b4))_0x5f33ef+=-_0x233b6f;if([0x1,0x2,0x3][_0x129983(0x2e4)](_0x5e08b4))_0x5f33ef+=_0x3f8b9e;_0x5f33ef=this['processSmartJumpHeightFactor'](_0x424d07,_0x5f33ef);const _0x43eae1=this[_0x129983(0x1a2)]();this[_0x129983(0x242)](_0x424d07,_0x5f33ef),this[_0x129983(0x39a)](_0x43eae1);}}},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x2fc)]=function(){const _0x546d7d=_0x4ee445;return this[_0x546d7d(0x291)]||{'enabled':![]};},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x1fa)]=function(){return this['_smartJumpMotionTrailData']||{'enabled':![]};},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x175)]=function(){return this['_smartRushMotionTrailData']||{'enabled':![]};},Game_Player[_0x4ee445(0x30f)]['motionTrailData']=function(){const _0x57e893=_0x4ee445;if(this['isSmartRushing']()&&this[_0x57e893(0x175)]()[_0x57e893(0x2f3)])return this[_0x57e893(0x175)]();else{if(this[_0x57e893(0x3ac)]()&&this[_0x57e893(0x1fa)]()[_0x57e893(0x2f3)])return this['smartJumpMotionTrailData']();}return Game_Character[_0x57e893(0x30f)][_0x57e893(0x1ae)][_0x57e893(0x2c3)](this);},Game_Player[_0x4ee445(0x30f)][_0x4ee445(0x2a6)]=function(){const _0x38798d=_0x4ee445,_0x186a32=SceneManager[_0x38798d(0x345)][_0x38798d(0x233)];if(!_0x186a32)return;const _0x356ef5=[this][_0x38798d(0x2be)](this[_0x38798d(0x355)]()[_0x38798d(0x1dd)]());for(const _0x557199 of _0x356ef5){if(!_0x557199)continue;oldData=JSON[_0x38798d(0x3a9)](JSON[_0x38798d(0x10f)](_0x557199[_0x38798d(0x317)]||{'enabled':![]})),_0x557199[_0x38798d(0x2e8)](this[_0x38798d(0x2fc)]());const _0x43ff5a=_0x186a32[_0x38798d(0x155)](_0x557199);_0x43ff5a&&_0x43ff5a[_0x38798d(0x334)](),_0x557199['setMotionTrailSettings'](oldData);}},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x152)]=Game_Follower['prototype'][_0x4ee445(0x260)],Game_Follower[_0x4ee445(0x30f)][_0x4ee445(0x260)]=function(_0x587a3c){const _0x5395dd=_0x4ee445;VisuMZ['MovementEffects'][_0x5395dd(0x152)][_0x5395dd(0x2c3)](this,_0x587a3c),this[_0x5395dd(0x1de)]();},VisuMZ['MovementEffects'][_0x4ee445(0x162)]=Game_CharacterBase['prototype'][_0x4ee445(0x2ff)],Game_CharacterBase['prototype']['straighten']=function(){const _0x538dc5=_0x4ee445;VisuMZ[_0x538dc5(0x195)][_0x538dc5(0x162)]['call'](this),this[_0x538dc5(0x1de)]();},Game_CharacterBase[_0x4ee445(0x30f)][_0x4ee445(0x1de)]=function(){},Game_Follower[_0x4ee445(0x30f)][_0x4ee445(0x1de)]=function(){const _0x130faa=_0x4ee445;this[_0x130faa(0xdc)]=Math[_0x130faa(0x1eb)](0xd);},Game_Follower[_0x4ee445(0x30f)][_0x4ee445(0x1db)]=function(){const _0x5086ea=_0x4ee445;if($gamePlayer[_0x5086ea(0x246)])return;Game_Character['prototype']['playFootstepSound']['call'](this);},Game_Follower[_0x4ee445(0x30f)][_0x4ee445(0x243)]=function(){const _0x842ea3=_0x4ee445;return this['actor']()?this[_0x842ea3(0x1a7)]()[_0x842ea3(0x243)]():Game_Character['prototype'][_0x842ea3(0x243)][_0x842ea3(0x2c3)](this);},Game_Follower[_0x4ee445(0x30f)][_0x4ee445(0x2ae)]=function(){const _0xd2e99e=_0x4ee445;return this[_0xd2e99e(0x1a7)]()?this['actor']()[_0xd2e99e(0x2ae)]():Game_Character['prototype'][_0xd2e99e(0x2ae)][_0xd2e99e(0x2c3)](this);},Game_Follower[_0x4ee445(0x30f)][_0x4ee445(0x2fc)]=function(){return $gamePlayer['smartBlinkMotionTrailData']();},Game_Follower[_0x4ee445(0x30f)][_0x4ee445(0x1fa)]=function(){const _0x406536=_0x4ee445;return $gamePlayer[_0x406536(0x1fa)]();},Game_Follower[_0x4ee445(0x30f)][_0x4ee445(0x175)]=function(){const _0x2f006e=_0x4ee445;return $gamePlayer[_0x2f006e(0x175)]();},Game_Follower[_0x4ee445(0x30f)][_0x4ee445(0x1ae)]=function(){const _0x145b06=_0x4ee445;if($gamePlayer[_0x145b06(0x3ab)]()&&this['smartRushMotionTrailData']()[_0x145b06(0x2f3)]){if(_0x145b06(0x357)===_0x145b06(0x1f9)){const _0x4422db=_0x145b06(0x1bb)[_0x145b06(0x17a)](this[_0x145b06(0x185)]),_0xd4c61=_0x145b06(0x14d)[_0x145b06(0x17a)](this[_0x145b06(0xf2)]),_0x44b313=this[_0x145b06(0x3b0)][_0x145b06(0x2ae)]();return _0x44b313[_0x4422db][_0xd4c61];}else return this[_0x145b06(0x175)]();}else{if($gamePlayer[_0x145b06(0x3ac)]()&&this['smartJumpMotionTrailData']()[_0x145b06(0x2f3)])return this[_0x145b06(0x1fa)]();}return Game_Character[_0x145b06(0x30f)][_0x145b06(0x1ae)][_0x145b06(0x2c3)](this);},VisuMZ[_0x4ee445(0x195)]['Game_Event_clearPageSettings']=Game_Event[_0x4ee445(0x30f)][_0x4ee445(0x226)],Game_Event[_0x4ee445(0x30f)][_0x4ee445(0x226)]=function(){const _0x56ea7e=_0x4ee445;VisuMZ['MovementEffects'][_0x56ea7e(0x2a5)][_0x56ea7e(0x2c3)](this),this[_0x56ea7e(0x391)]();},VisuMZ['MovementEffects'][_0x4ee445(0x239)]=Game_Event[_0x4ee445(0x30f)][_0x4ee445(0x1ed)],Game_Event['prototype'][_0x4ee445(0x1ed)]=function(){const _0xeafeff=_0x4ee445;VisuMZ['MovementEffects'][_0xeafeff(0x239)]['call'](this),this[_0xeafeff(0x265)]();},Game_Event[_0x4ee445(0x30f)][_0x4ee445(0x265)]=function(){const _0x1ce5e7=_0x4ee445;if(!this[_0x1ce5e7(0x329)]())return;this[_0x1ce5e7(0x391)](),this[_0x1ce5e7(0x1c9)](),this[_0x1ce5e7(0x261)]();},Game_Event[_0x4ee445(0x30f)][_0x4ee445(0x1c9)]=function(){const _0x17e1c8=_0x4ee445,_0x5683a2=this[_0x17e1c8(0x329)]()[_0x17e1c8(0x23a)];if(_0x5683a2==='')return;this[_0x17e1c8(0x1b8)](_0x5683a2);},Game_Event[_0x4ee445(0x30f)]['setupMovementEffectsCommentTags']=function(){const _0x41f4c0=_0x4ee445;if(!this[_0x41f4c0(0x163)]())return;const _0x2d4980=this[_0x41f4c0(0x2b5)]();let _0x189f82='';for(const _0x34488b of _0x2d4980){if(_0x41f4c0(0x2dd)==='BpLYE'){if([0x6c,0x198][_0x41f4c0(0x2e4)](_0x34488b[_0x41f4c0(0x16e)])){if(_0x41f4c0(0x1be)===_0x41f4c0(0x1be)){if(_0x189f82!=='')_0x189f82+='\x0a';_0x189f82+=_0x34488b[_0x41f4c0(0x35e)][0x0];}else this[_0x41f4c0(0x2fd)][_0x41f4c0(0xe2)]=_0x4d4d62['$1'][_0x41f4c0(0x27f)](',')[_0x41f4c0(0xfb)](_0x5c6c94=>(_0x2e52f5(_0x5c6c94)||0x0)[_0x41f4c0(0x119)](0x0,0xff));}}else return this[_0x41f4c0(0x335)]===_0xa59b2b&&this[_0x41f4c0(0x265)](),this[_0x41f4c0(0x335)];}this[_0x41f4c0(0x1b8)](_0x189f82);},Game_Event[_0x4ee445(0x30f)][_0x4ee445(0x391)]=function(){const _0x23d702=_0x4ee445;{const _0x32eeca=VisuMZ[_0x23d702(0x195)]['Settings']['Footsteps'];this['_footsteps']={'enabled':_0x32eeca[_0x23d702(0x1d6)],'volumeRate':_0x32eeca[_0x23d702(0x247)],'pitchRate':_0x32eeca['eventPitchModifier'],'soundFrames':_0x32eeca[_0x23d702(0x145)]['clone']()};}{if(_0x23d702(0x311)!==_0x23d702(0x311)){const _0x5c6ec6=_0x23d702(0x298),_0x2064ab=_0x59b7a1[_0x23d702(0x34f)](_0x5026da[_0x5c6ec6]);if(_0x2064ab)for(const _0x59abc7 of _0x2064ab){_0x59abc7[_0x23d702(0x34f)](_0x399170[_0x5c6ec6]);const _0x21a5aa=_0x403e55['$1'],_0x29ab49=_0xc732c['$2'],_0x4ae573=_0x5a0ff4['$3'],_0x1d2e19=_0x23d702(0x1bb)[_0x23d702(0x17a)](_0x430aea['parseDirectionText'](_0x21a5aa)),_0x470b0d=_0x23d702(0x14d)[_0x23d702(0x17a)](_0x58748a(_0x29ab49)||0x0);this['_footprintsData'][_0x1d2e19][_0x470b0d][_0x23d702(0x33d)]=_0xc17148(_0x4ae573)||0x1;}}else{const _0x26c56e=VisuMZ[_0x23d702(0x195)]['Settings'][_0x23d702(0x37c)];this[_0x23d702(0x335)]={'enabled':!![],'dir1':JSON[_0x23d702(0x3a9)](JSON['stringify'](_0x26c56e[_0x23d702(0x30b)])),'dir2':JSON['parse'](JSON[_0x23d702(0x10f)](_0x26c56e[_0x23d702(0x24f)])),'dir3':JSON[_0x23d702(0x3a9)](JSON[_0x23d702(0x10f)](_0x26c56e[_0x23d702(0x385)])),'dir4':JSON[_0x23d702(0x3a9)](JSON[_0x23d702(0x10f)](_0x26c56e[_0x23d702(0x23f)])),'dir6':JSON[_0x23d702(0x3a9)](JSON[_0x23d702(0x10f)](_0x26c56e[_0x23d702(0xe3)])),'dir7':JSON['parse'](JSON['stringify'](_0x26c56e[_0x23d702(0x375)])),'dir8':JSON['parse'](JSON[_0x23d702(0x10f)](_0x26c56e[_0x23d702(0x19f)])),'dir9':JSON['parse'](JSON[_0x23d702(0x10f)](_0x26c56e[_0x23d702(0x308)]))};}}this[_0x23d702(0x236)]={'nonLand':![],'nonPass':![]};},Game_Event[_0x4ee445(0x30f)]['checkMovementEffectsStringTags']=function(_0x21a7bb){const _0x5abd24=_0x4ee445,_0x5b0daa=VisuMZ[_0x5abd24(0x195)][_0x5abd24(0x2d4)];if(!_0x21a7bb[_0x5abd24(0x34f)](_0x5b0daa[_0x5abd24(0x21e)]))return;if(_0x21a7bb[_0x5abd24(0x34f)](_0x5b0daa[_0x5abd24(0x1af)]))this[_0x5abd24(0x2de)][_0x5abd24(0x2f3)]=!![];else{if(_0x21a7bb['match'](_0x5b0daa[_0x5abd24(0x2a4)])){if('zMnjO'!=='zMnjO'){const _0x465ec1=_0x3390ca['MovementEffects'][_0x5abd24(0x2d4)],_0x4187d6=_0xbc9125['note']||'';if(_0x4187d6[_0x5abd24(0x34f)](_0x465ec1[_0x5abd24(0x18c)]))return!![];else{if(_0x4187d6['match'](_0x465ec1[_0x5abd24(0x33a)]))return![];}}else this[_0x5abd24(0x2de)][_0x5abd24(0x2f3)]=![];}}_0x21a7bb[_0x5abd24(0x34f)](_0x5b0daa[_0x5abd24(0x349)])&&(this[_0x5abd24(0x2de)][_0x5abd24(0x272)]=Number(RegExp['$1'])*0.01);_0x21a7bb[_0x5abd24(0x34f)](_0x5b0daa[_0x5abd24(0x2b0)])&&(this[_0x5abd24(0x2de)][_0x5abd24(0x240)]=Number(RegExp['$1'])*0.01);_0x21a7bb[_0x5abd24(0x34f)](_0x5b0daa[_0x5abd24(0x28f)])&&(this[_0x5abd24(0x2de)][_0x5abd24(0x3ba)]=String(RegExp['$1'])['split'](',')[_0x5abd24(0xfb)](_0x138c79=>Number(_0x138c79)||0x0));if(_0x21a7bb[_0x5abd24(0x34f)](_0x5b0daa[_0x5abd24(0x361)])){if('sUbPq'!=='XiBjR')this['_footprintsData'][_0x5abd24(0x2f3)]=!![];else{if(_0x5db2b9[_0x5abd24(0x3ac)]())return!![];this['_waitMode']='';}}else _0x21a7bb[_0x5abd24(0x34f)](_0x5b0daa[_0x5abd24(0x2ef)])&&(this['_footprintsData'][_0x5abd24(0x2f3)]=![]);{const _0x4bef8f=_0x5abd24(0x182),_0x9a657e=_0x21a7bb['match'](_0x5b0daa[_0x4bef8f]);if(_0x9a657e){if(_0x5abd24(0x250)!==_0x5abd24(0x250))_0x258342[_0x5abd24(0x263)]*=_0x547b99[_0x5abd24(0x272)]??0x1,_0xf9a863[_0x5abd24(0x3b1)]*=_0x24e638['pitchRate']??0x1;else for(const _0x45f844 of _0x9a657e){_0x45f844[_0x5abd24(0x34f)](_0x5b0daa[_0x4bef8f]);const _0x32c1e1=RegExp['$1'],_0x106d07=RegExp['$2'],_0x401b36=RegExp['$3'],_0x2988f5=_0x5abd24(0x1bb)[_0x5abd24(0x17a)](TextManager[_0x5abd24(0x364)](_0x32c1e1)),_0x33187b=_0x5abd24(0x14d)[_0x5abd24(0x17a)](Number(_0x106d07)||0x0);this[_0x5abd24(0x335)][_0x2988f5][_0x33187b]['filename']=String(_0x401b36)[_0x5abd24(0x11e)]();}}}{if(_0x5abd24(0x224)!==_0x5abd24(0x217)){const _0x266e5a='FootprintsWidth',_0x6e64da=_0x21a7bb[_0x5abd24(0x34f)](_0x5b0daa[_0x266e5a]);if(_0x6e64da)for(const _0x59961f of _0x6e64da){if(_0x5abd24(0xd2)!==_0x5abd24(0x379)){_0x59961f['match'](_0x5b0daa[_0x266e5a]);const _0x20fec8=RegExp['$1'],_0x76dfcd=RegExp['$2'],_0x467099=RegExp['$3'],_0x13824f=_0x5abd24(0x1bb)[_0x5abd24(0x17a)](TextManager[_0x5abd24(0x364)](_0x20fec8)),_0x36e3e6=_0x5abd24(0x14d)[_0x5abd24(0x17a)](Number(_0x76dfcd)||0x0);this[_0x5abd24(0x335)][_0x13824f][_0x36e3e6]['width']=Number(_0x467099)||0x1;}else this[_0x5abd24(0x20f)]=_0x1181ce[_0x5abd24(0x195)][_0x5abd24(0x15a)][_0x5abd24(0x37c)][_0x5abd24(0xd3)];}}else _0x5b85e6[_0x5abd24(0x30f)][_0x5abd24(0x191)][_0x5abd24(0x2c3)](this),this[_0x5abd24(0x33c)]();}{if(_0x5abd24(0x3bd)===_0x5abd24(0x1ad)){if(this[_0x5abd24(0x335)]===_0x56a3d4)this[_0x5abd24(0x1c9)]();return this[_0x5abd24(0x335)];}else{const _0x5489ce=_0x5abd24(0x313),_0x1d3536=_0x21a7bb[_0x5abd24(0x34f)](_0x5b0daa[_0x5489ce]);if(_0x1d3536)for(const _0x435e7a of _0x1d3536){_0x435e7a[_0x5abd24(0x34f)](_0x5b0daa[_0x5489ce]);const _0x5e8e5f=RegExp['$1'],_0x6e067c=RegExp['$2'],_0x4ee585=RegExp['$3'],_0x1b86ec=_0x5abd24(0x1bb)[_0x5abd24(0x17a)](TextManager[_0x5abd24(0x364)](_0x5e8e5f)),_0x561b57=_0x5abd24(0x14d)['format'](Number(_0x6e067c)||0x0);this[_0x5abd24(0x335)][_0x1b86ec][_0x561b57][_0x5abd24(0x27b)]=Number(_0x4ee585)||0x1;}}}{if(_0x5abd24(0xb6)===_0x5abd24(0x3b4)){const _0x45a3ed=_0x300539[_0x5abd24(0x267)]();_0x39f2d9[_0x5abd24(0x10f)](this[_0x5abd24(0x15e)])!==_0x21a3ba['stringify'](_0x45a3ed)&&this[_0x5abd24(0x128)]();}else{const _0x492b57=_0x5abd24(0x2a9),_0xba4e8=_0x21a7bb[_0x5abd24(0x34f)](_0x5b0daa[_0x492b57]);if(_0xba4e8)for(const _0x34d188 of _0xba4e8){if(_0x5abd24(0x14f)!=='GjTqT'){_0x34d188[_0x5abd24(0x34f)](_0x5b0daa[_0x492b57]);const _0x5386b8=RegExp['$1'],_0x2c4b18=RegExp['$2'],_0x7e6c83=RegExp['$3'],_0x58cc25='dir%1'[_0x5abd24(0x17a)](TextManager[_0x5abd24(0x364)](_0x5386b8)),_0x3fdf56=_0x5abd24(0x14d)[_0x5abd24(0x17a)](Number(_0x2c4b18)||0x0),_0x1c3829=_0x7e6c83[_0x5abd24(0x27f)](',')[_0x5abd24(0xfb)](_0x26779d=>Number(_0x26779d)||0x0);this[_0x5abd24(0x335)][_0x58cc25][_0x3fdf56][_0x5abd24(0x343)]=_0x1c3829[0x0]||0x0,this['_footprintsData'][_0x58cc25][_0x3fdf56][_0x5abd24(0x12c)]=_0x1c3829[0x1]||0x0;}else{const _0x2cbfd4=_0x23aee4[_0x5abd24(0x195)][_0x5abd24(0x15a)][_0x5abd24(0x20c)];this['_dustCloud']={'enabled':_0x2cbfd4[_0x5abd24(0xd3)],'filename':_0x2cbfd4[_0x5abd24(0x1e8)]||'','color':_0x2cbfd4[_0x5abd24(0x39f)]||_0x5abd24(0x125),'radius':_0x2cbfd4[_0x5abd24(0x2d5)]||0x18,'fullness':_0x2cbfd4['fullness']||0x0,'wholeDuration':_0x2cbfd4[_0x5abd24(0x332)]||0x14,'startOpacity':_0x2cbfd4['startOpacity']||0xc0,'startScale':_0x2cbfd4[_0x5abd24(0x2a1)]||0.2};}}}}if(_0x21a7bb[_0x5abd24(0x34f)](_0x5b0daa[_0x5abd24(0x187)])){if(_0x5abd24(0x1bc)!==_0x5abd24(0x359))this[_0x5abd24(0x236)][_0x5abd24(0x2fe)]=!![];else{let _0x411cc6=_0x107d3a[_0x5abd24(0x195)][_0x5abd24(0x200)](this[_0x5abd24(0x3b0)]);_0x411cc6+=_0x443acb;const _0x13e076=this[_0x5abd24(0x2b7)][_0x5abd24(0x119)](0x0,0x1e);_0x5c1187[_0x5abd24(0x1e9)]['x']=_0x13e076*_0x350baa[_0x5abd24(0x1c1)](_0x411cc6*_0x250ad1['PI']/0xb4),_0x54d7e6[_0x5abd24(0x1e9)]['y']=-_0x13e076*_0x2d67b0[_0x5abd24(0x35b)](_0x411cc6*_0x347d96['PI']/0xb4);}}_0x21a7bb[_0x5abd24(0x34f)](_0x5b0daa[_0x5abd24(0x1bf)])&&(this[_0x5abd24(0x236)][_0x5abd24(0x2c4)]=!![]);},Game_Event[_0x4ee445(0x30f)][_0x4ee445(0x243)]=function(){const _0x548398=_0x4ee445;return this['_footsteps']===undefined&&(_0x548398(0x2c8)===_0x548398(0x2c8)?this[_0x548398(0x265)]():_0x4ea127[_0x4f6232]=_0x3a037a[_0xb573b0]),this[_0x548398(0x2de)];},Game_Event[_0x4ee445(0x30f)]['footprintsData']=function(){const _0x1b1c33=_0x4ee445;return this[_0x1b1c33(0x335)]===undefined&&this[_0x1b1c33(0x265)](),this[_0x1b1c33(0x335)];},Game_Event[_0x4ee445(0x30f)][_0x4ee445(0x1cd)]=function(){const _0xe5efc5=_0x4ee445;if(this['_smartJumpRestriction']===undefined)this[_0xe5efc5(0x265)]();return this[_0xe5efc5(0x236)]['nonLand'];},Game_Event[_0x4ee445(0x30f)][_0x4ee445(0x358)]=function(){const _0x300600=_0x4ee445;if(this[_0x300600(0x236)]===undefined)this[_0x300600(0x265)]();return this['_smartJumpRestriction'][_0x300600(0x2c4)];},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x35a)]=Game_Interpreter[_0x4ee445(0x30f)][_0x4ee445(0x169)],Game_Interpreter[_0x4ee445(0x30f)][_0x4ee445(0x169)]=function(){const _0x2b2ba6=_0x4ee445;if(this[_0x2b2ba6(0x307)]==='smartBlink'){if($gamePlayer[_0x2b2ba6(0x337)]())return!![];this[_0x2b2ba6(0x307)]='';}else{if(this[_0x2b2ba6(0x307)]==='smartJump'){if($gamePlayer['isSmartJumping']())return!![];this[_0x2b2ba6(0x307)]='';}else{if(this[_0x2b2ba6(0x307)]===_0x2b2ba6(0xed)){if($gamePlayer['isSmartRushing']()){if('AoeHL'===_0x2b2ba6(0x3a8))return!![];else{this[_0x2b2ba6(0x391)]();const _0x44a8ae=this[_0x2b2ba6(0x1a7)]()[_0x2b2ba6(0x23a)]||'';_0x23e6a0[_0x2b2ba6(0x30f)][_0x2b2ba6(0x1b8)]['call'](this,_0x44a8ae);}}this[_0x2b2ba6(0x307)]='';}}}return VisuMZ[_0x2b2ba6(0x195)][_0x2b2ba6(0x35a)]['call'](this);},VisuMZ[_0x4ee445(0x195)]['Sprite_Character_initialize']=Sprite_Character[_0x4ee445(0x30f)][_0x4ee445(0x260)],Sprite_Character[_0x4ee445(0x30f)][_0x4ee445(0x260)]=function(_0x293ac3){const _0xc855b2=_0x4ee445;VisuMZ[_0xc855b2(0x195)][_0xc855b2(0x1cf)]['call'](this,_0x293ac3);},VisuMZ['MovementEffects']['Sprite_Character_update']=Sprite_Character[_0x4ee445(0x30f)][_0x4ee445(0x191)],Sprite_Character[_0x4ee445(0x30f)][_0x4ee445(0x191)]=function(){const _0x22b084=_0x4ee445;VisuMZ['MovementEffects']['Sprite_Character_update'][_0x22b084(0x2c3)](this),this[_0x22b084(0x30c)](),this['updateMovementEffectsMotionTrails']();},Sprite_Character[_0x4ee445(0x30f)][_0x4ee445(0x2fa)]=function(){const _0x22044d=_0x4ee445;if(!PIXI['filters'][_0x22044d(0x1d8)])return;if(this[_0x22044d(0xbf)])return;this[_0x22044d(0xbf)]=new PIXI[(_0x22044d(0x193))]['MotionBlurFilter'](),this['_motionBlurMovementEffectsDuration']=0x0,this[_0x22044d(0xe5)]=0x0,this[_0x22044d(0x193)]=this[_0x22044d(0x193)]||[],this['filters'][_0x22044d(0x363)](this[_0x22044d(0xbf)]);},Sprite_Character['prototype'][_0x4ee445(0x2f5)]=function(_0x572e66,_0x3db2a3){const _0x594a59=_0x4ee445;!this[_0x594a59(0xbf)]&&this['createMotionBlurMovementEffectsFilter']();if(!this[_0x594a59(0xbf)])return;this[_0x594a59(0x2b7)]=_0x572e66,this[_0x594a59(0xe5)]=_0x3db2a3;},Sprite_Character['prototype'][_0x4ee445(0xd7)]=function(){const _0xc8096c=_0x4ee445;if(!this[_0xc8096c(0x3b0)])return![];if(this[_0xc8096c(0x3b0)]!==$gamePlayer&&this[_0xc8096c(0x3b0)][_0xc8096c(0x1ff)]!==Game_Follower)return![];return $gamePlayer[_0xc8096c(0x3ab)]();},Sprite_Character[_0x4ee445(0x30f)][_0x4ee445(0x30c)]=function(){const _0x20e061=_0x4ee445;let _0x50870e=this['_motionBlurMovementEffectsAngleOffset'];if(this['isPlayerSmartRushing']()){if(_0x20e061(0x25f)!==_0x20e061(0xfc))this[_0x20e061(0x2b7)]=Game_Player['SMART_RUSH_FILTER_DURATION'],_0x50870e=Game_Player[_0x20e061(0x251)];else{if(this[_0x20e061(0x2fd)]===_0x367978)this[_0x20e061(0x1cc)]();return this['_smartJump'][_0x20e061(0x2f3)];}}if(this[_0x20e061(0x2b7)]===undefined)return;if(this[_0x20e061(0x2b7)]<=0x0)return;!this[_0x20e061(0xbf)]&&this[_0x20e061(0x2fa)]();if(!this[_0x20e061(0xbf)])return;const _0x18fb7a=this['_motionBlurMovementEffectsFilter'];if(this[_0x20e061(0x2b7)]-->0x0){if(_0x20e061(0x2a2)==='fhWyF'){if(!_0x117091['footsteps'])return![];if(_0x3183d8){const _0x518af7=_0x143361[_0x20e061(0x195)][_0x20e061(0x2d4)],_0x50d394=_0x419ed0[_0x20e061(0x23a)]||'';if(_0x50d394[_0x20e061(0x34f)](_0x518af7[_0x20e061(0x18c)]))return!![];else{if(_0x50d394[_0x20e061(0x34f)](_0x518af7[_0x20e061(0x33a)]))return![];}}return _0x22db9d[_0x20e061(0x38c)]();}else{let _0x10e7c2=VisuMZ[_0x20e061(0x195)]['GetDirAngle'](this[_0x20e061(0x3b0)]);_0x10e7c2+=_0x50870e;const _0x34150d=this[_0x20e061(0x2b7)][_0x20e061(0x119)](0x0,0x1e);_0x18fb7a[_0x20e061(0x1e9)]['x']=_0x34150d*Math['cos'](_0x10e7c2*Math['PI']/0xb4),_0x18fb7a[_0x20e061(0x1e9)]['y']=-_0x34150d*Math[_0x20e061(0x35b)](_0x10e7c2*Math['PI']/0xb4);}}else _0x18fb7a[_0x20e061(0x1e9)]['x']=0x0,_0x18fb7a[_0x20e061(0x1e9)]['y']=0x0,this[_0x20e061(0xe5)]=0x0;},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x200)]=function(_0x3386bf){if(!_0x3386bf)return 0x2d;const _0x3dbde8=_0x3386bf['direction']();if(_0x3dbde8===0x6)return 0x0;if(_0x3dbde8===0x9)return 0x2d;if(_0x3dbde8===0x8)return 0x5a;if(_0x3dbde8===0x7)return 0x87;if(_0x3dbde8===0x4)return 0xb4;if(_0x3dbde8===0x1)return 0xe1;if(_0x3dbde8===0x2)return 0x10e;if(_0x3dbde8===0x3)return 0x13b;return 0x2d;},Sprite_Character[_0x4ee445(0x30f)]['canShowMotionTrails']=function(){const _0x223d9a=_0x4ee445;if(!SceneManager['_scene'])return![];if(!SceneManager[_0x223d9a(0x345)][_0x223d9a(0x233)])return![];if(this[_0x223d9a(0x1ff)]!==Sprite_Character)return![];if(!this['_character'])return![];if(this['_character'][_0x223d9a(0x2f2)])return![];if(!this[_0x223d9a(0x32b)])return![];if(this[_0x223d9a(0x1b0)]<=0x0)return![];if(!this[_0x223d9a(0x216)])return![];if(!this[_0x223d9a(0x1b7)])return![];if(this[_0x223d9a(0x216)]['width']===this[_0x223d9a(0x1b7)]['width'])return![];if(this['_motionTrailLastRealX']===this[_0x223d9a(0x3b0)][_0x223d9a(0x257)]&&this[_0x223d9a(0x18b)]===this['_character'][_0x223d9a(0x1f4)])return![];return!![];},Sprite_Character['prototype'][_0x4ee445(0x12b)]=function(){const _0x24711d=_0x4ee445;if(!this['_character'])return![];return this[_0x24711d(0x3b0)][_0x24711d(0x1ae)]()[_0x24711d(0x2f3)];},Sprite_Character['prototype']['updateMovementEffectsMotionTrails']=function(){const _0x17cdee=_0x4ee445;if(!this[_0x17cdee(0x324)]())return;if(!this[_0x17cdee(0x12b)]())return;const _0x3d80d8=this['_character'][_0x17cdee(0x1ae)](),_0x364cf6=_0x3d80d8[_0x17cdee(0xf1)]||0x1;Graphics[_0x17cdee(0x18a)]%_0x364cf6===0x0&&(_0x17cdee(0x228)!==_0x17cdee(0x25c)?this[_0x17cdee(0x334)]():this[_0x17cdee(0x128)]());},Sprite_Character['prototype'][_0x4ee445(0x334)]=function(){const _0x42e57f=_0x4ee445,_0x20f0a1=new Sprite_MapMotionTrail(this,this[_0x42e57f(0x3b0)]),_0x469e09=SceneManager['_scene']['_spriteset'];_0x469e09[_0x42e57f(0x253)][_0x42e57f(0x363)](_0x20f0a1),this[_0x42e57f(0x2da)]=this['_character'][_0x42e57f(0x257)],this[_0x42e57f(0x18b)]=this[_0x42e57f(0x3b0)][_0x42e57f(0x1f4)];const _0x47b059=_0x469e09['_tilemap'];_0x47b059[_0x42e57f(0x1f2)](_0x20f0a1);};function Sprite_Footprint(){this['initialize'](...arguments);}Sprite_Footprint['prototype']=Object['create'](Sprite['prototype']),Sprite_Footprint[_0x4ee445(0x30f)][_0x4ee445(0x1ff)]=Sprite_Footprint,Sprite_Footprint[_0x4ee445(0x30f)][_0x4ee445(0x260)]=function(_0x25e452){const _0x69e88b=_0x4ee445;this['_character']=_0x25e452,Sprite[_0x69e88b(0x30f)][_0x69e88b(0x260)]['call'](this),this[_0x69e88b(0x25e)](),this['createBitmap'](),this[_0x69e88b(0x31e)](),this[_0x69e88b(0x17e)](),this[_0x69e88b(0x33c)]();},Sprite_Footprint[_0x4ee445(0x30f)][_0x4ee445(0x25e)]=function(){const _0x444aba=_0x4ee445;this['anchor']['x']=0.5,this[_0x444aba(0x1c7)]['y']=0x1,this['z']=0x0,this[_0x444aba(0x257)]=this[_0x444aba(0x3b0)][_0x444aba(0x257)],this[_0x444aba(0x1f4)]=this[_0x444aba(0x3b0)]['_realY'],this['_direction']=this[_0x444aba(0x3b0)][_0x444aba(0x185)],this[_0x444aba(0xf2)]=this['_character'][_0x444aba(0x124)](),this[_0x444aba(0x27d)]=this[_0x444aba(0x3b0)][_0x444aba(0x116)](),this[_0x444aba(0x2eb)]=0x0,this[_0x444aba(0xdd)]=0x0;if(this['_character'][_0x444aba(0x1ff)]===Game_Follower){const _0xd78602=VisuMZ[_0x444aba(0x195)][_0x444aba(0x15a)][_0x444aba(0x37c)][_0x444aba(0x20d)]||0x0;this[_0x444aba(0x2eb)]=Math[_0x444aba(0x1eb)](_0xd78602+0x1)+Math[_0x444aba(0x1eb)](_0xd78602+0x1)-_0xd78602,this[_0x444aba(0xdd)]=Math[_0x444aba(0x1eb)](_0xd78602+0x1)+Math[_0x444aba(0x1eb)](_0xd78602+0x1)-_0xd78602;}},Sprite_Footprint[_0x4ee445(0x30f)][_0x4ee445(0x2ae)]=function(){const _0x759d4a=_0x4ee445,_0x2c88ed=_0x759d4a(0x1bb)['format'](this[_0x759d4a(0x185)]),_0xb9bb91=_0x759d4a(0x14d)[_0x759d4a(0x17a)](this['_pattern']),_0xf8dd40=this[_0x759d4a(0x3b0)]['footprintsData']();return _0xf8dd40[_0x2c88ed][_0xb9bb91];},Sprite_Footprint['prototype']['createBitmap']=function(){const _0x5c38b7=_0x4ee445,_0x7791b4=this[_0x5c38b7(0x2ae)]();if(_0x7791b4[_0x5c38b7(0x1e8)]!==''){if('PSsve'!=='PSsve'){if(this[_0x5c38b7(0x2fd)]===_0xfb06b8)this[_0x5c38b7(0x1cc)]();return this['_smartJump'][_0x5c38b7(0x303)]['includes'](_0x51faad);}else this[_0x5c38b7(0x1b7)]=ImageManager[_0x5c38b7(0x2e0)](_0x7791b4['filename']),this['blendMode']=0x0;}else _0x5c38b7(0x192)===_0x5c38b7(0x192)?(this[_0x5c38b7(0x1b7)]=ImageManager[_0x5c38b7(0x2aa)](),this['scale']['x']=_0x7791b4[_0x5c38b7(0x33d)]*0.01,this[_0x5c38b7(0xcd)]['y']=_0x7791b4[_0x5c38b7(0x27b)]*0.01,this[_0x5c38b7(0x1b3)]=0x2):this[_0x5c38b7(0x2fa)]();},Sprite_Footprint[_0x4ee445(0x30f)][_0x4ee445(0x31e)]=function(){const _0x144727=_0x4ee445,_0x299a94=this[_0x144727(0x3b0)]['x'],_0x581870=this[_0x144727(0x3b0)]['y'];this[_0x144727(0x1b0)]=$gameMap[_0x144727(0xfd)](_0x299a94,_0x581870);},Sprite_Footprint[_0x4ee445(0x30f)][_0x4ee445(0x17e)]=function(){const _0x3fd711=_0x4ee445,_0x1b23e3=this['_character']['x'],_0x2a9f95=this['_character']['y'];this['_duration']=$gameMap[_0x3fd711(0x3ad)](_0x1b23e3,_0x2a9f95);},Sprite_Footprint[_0x4ee445(0x30f)][_0x4ee445(0x191)]=function(){const _0x55f1e4=_0x4ee445;Sprite[_0x55f1e4(0x30f)][_0x55f1e4(0x191)][_0x55f1e4(0x2c3)](this),this[_0x55f1e4(0x33c)]();},Sprite_Footprint['prototype']['updatePosition']=function(){const _0x2b039a=_0x4ee445,_0x591f45=$gameMap[_0x2b039a(0xd4)](),_0x43e022=$gameMap[_0x2b039a(0x2ad)]();this['x']=Math[_0x2b039a(0x18f)]($gameMap[_0x2b039a(0x214)](this[_0x2b039a(0x257)])*_0x591f45+_0x591f45/0x2),this['x']+=this[_0x2b039a(0x2ae)]()[_0x2b039a(0x343)]+this[_0x2b039a(0x2eb)],this['y']=Math[_0x2b039a(0x18f)]($gameMap['adjustY'](this[_0x2b039a(0x1f4)])*_0x43e022+_0x43e022),this['y']+=this[_0x2b039a(0x2ae)]()['offsetY']+this[_0x2b039a(0xdd)],this['y']-=this[_0x2b039a(0x27d)];};function Sprite_MapMotionTrail(){const _0x5a091e=_0x4ee445;this[_0x5a091e(0x260)](...arguments);}Sprite_MapMotionTrail[_0x4ee445(0x30f)]=Object[_0x4ee445(0x2c5)](Sprite[_0x4ee445(0x30f)]),Sprite_MapMotionTrail[_0x4ee445(0x30f)][_0x4ee445(0x1ff)]=Sprite_MapMotionTrail,Sprite_MapMotionTrail[_0x4ee445(0x30f)][_0x4ee445(0x260)]=function(_0x45fb87,_0x797150){const _0x2c12f2=_0x4ee445;this['_baseSprite']=_0x45fb87,this[_0x2c12f2(0x3b0)]=_0x797150,Sprite[_0x2c12f2(0x30f)][_0x2c12f2(0x260)][_0x2c12f2(0x2c3)](this),this[_0x2c12f2(0x3a4)](),this[_0x2c12f2(0x1a3)](),this[_0x2c12f2(0x17c)](),this[_0x2c12f2(0x280)](),this[_0x2c12f2(0x2f0)]=!![];},Sprite_MapMotionTrail[_0x4ee445(0x30f)][_0x4ee445(0x3a4)]=function(){const _0x5e2209=_0x4ee445,_0x10ffe8=$gameMap[_0x5e2209(0x2ad)](),_0x14a458=(_0x10ffe8-0x1)/_0x10ffe8;this[_0x5e2209(0x1c7)]['x']=this[_0x5e2209(0x1c3)][_0x5e2209(0x1c7)]['x'],this[_0x5e2209(0x1c7)]['y']=this[_0x5e2209(0x1c3)][_0x5e2209(0x1c7)]['y'],this[_0x5e2209(0x1b0)]=this['_baseSprite'][_0x5e2209(0x1b0)],this['scale']['x']=this[_0x5e2209(0x1c3)][_0x5e2209(0xcd)]['x'],this[_0x5e2209(0xcd)]['y']=this[_0x5e2209(0x1c3)]['scale']['y'],this['x']=this['_baseSprite']['x'],this['y']=this[_0x5e2209(0x1c3)]['y'],this['z']=this[_0x5e2209(0x1c3)]['z'],this[_0x5e2209(0x257)]=this[_0x5e2209(0x3b0)][_0x5e2209(0x257)],this['_realY']=this[_0x5e2209(0x3b0)][_0x5e2209(0x1f4)],this[_0x5e2209(0x27d)]=this[_0x5e2209(0x3b0)][_0x5e2209(0x116)](),this['_jumpHeight']=this[_0x5e2209(0x3b0)][_0x5e2209(0x123)]();},Sprite_MapMotionTrail[_0x4ee445(0x30f)][_0x4ee445(0x1a3)]=function(){const _0x362708=_0x4ee445;this[_0x362708(0x1b7)]=this[_0x362708(0x1c3)]['bitmap'];const _0x81dad=this[_0x362708(0x1c3)][_0x362708(0x126)];this[_0x362708(0x1c3)][_0x362708(0x126)]=0x0,this[_0x362708(0x1c3)][_0x362708(0x36e)](),this[_0x362708(0x216)]=JSON[_0x362708(0x3a9)](JSON[_0x362708(0x10f)](this['_baseSprite'][_0x362708(0x216)])),this['_baseSprite'][_0x362708(0x126)]=_0x81dad,this[_0x362708(0x1c3)][_0x362708(0x36e)](),this[_0x362708(0x150)]();},Sprite_MapMotionTrail[_0x4ee445(0x30f)][_0x4ee445(0x1ae)]=function(){const _0x45618b=_0x4ee445;return this[_0x45618b(0x3b0)][_0x45618b(0x1ae)]();},Sprite_MapMotionTrail[_0x4ee445(0x30f)]['applyMotionTrailData']=function(){const _0x2ac3bf=_0x4ee445,_0xa876e9=this['motionTrailData']();this[_0x2ac3bf(0xc7)]=_0xa876e9[_0x2ac3bf(0x135)]||0x1,this[_0x2ac3bf(0x262)](_0xa876e9['hue']),this[_0x2ac3bf(0x1fc)](_0xa876e9[_0x2ac3bf(0x39c)]),this['_opacityRate']=(_0xa876e9[_0x2ac3bf(0x13a)]/0xff)['clamp'](0x0,0x1),this[_0x2ac3bf(0x1b0)]=(this[_0x2ac3bf(0x1b0)]*this[_0x2ac3bf(0x381)])[_0x2ac3bf(0x119)](0x0,0xff);},Sprite_MapMotionTrail[_0x4ee445(0x30f)]['attachIconSprite']=function(){const _0xbe23fe=_0x4ee445;this[_0xbe23fe(0x1a6)](),this['setupIconSprite']();},Sprite_MapMotionTrail[_0x4ee445(0x30f)][_0x4ee445(0x1a6)]=function(){const _0x4bdf5a=_0x4ee445;this[_0x4bdf5a(0x16c)]=new Sprite(),this['_eventIconSprite'][_0x4bdf5a(0x1b7)]=ImageManager[_0x4bdf5a(0x378)](_0x4bdf5a(0x171)),this[_0x4bdf5a(0x16c)]['bitmap'][_0x4bdf5a(0x2b2)]=![],this[_0x4bdf5a(0x16c)][_0x4bdf5a(0x1c7)]['x']=0.5,this[_0x4bdf5a(0x16c)]['anchor']['y']=0x1,this[_0x4bdf5a(0x1f2)](this[_0x4bdf5a(0x16c)]);},Sprite_MapMotionTrail[_0x4ee445(0x30f)][_0x4ee445(0xbb)]=function(){const _0x1eb3bc=_0x4ee445,_0x1a2de=this[_0x1eb3bc(0x16c)],_0x81e966=this['_baseSprite'][_0x1eb3bc(0x16c)];_0x1a2de['x']=_0x81e966['x'],_0x1a2de['y']=_0x81e966['y'],_0x1a2de[_0x1eb3bc(0x216)]=JSON[_0x1eb3bc(0x3a9)](JSON[_0x1eb3bc(0x10f)](_0x81e966[_0x1eb3bc(0x216)])),_0x1a2de[_0x1eb3bc(0x150)]();},Sprite_MapMotionTrail[_0x4ee445(0x30f)][_0x4ee445(0x191)]=function(){const _0x2f69e5=_0x4ee445;Sprite[_0x2f69e5(0x30f)][_0x2f69e5(0x191)][_0x2f69e5(0x2c3)](this),this['_ready']&&(this[_0x2f69e5(0x281)](),this[_0x2f69e5(0x33c)]());},Sprite_MapMotionTrail['prototype']['updateOpacity']=function(){const _0x5257e9=_0x4ee445;if(this[_0x5257e9(0xc7)]<=0x0)return;const _0x16565c=this[_0x5257e9(0xc7)];this[_0x5257e9(0x1b0)]=(this[_0x5257e9(0x1b0)]*(_0x16565c-0x1)+0x0)/_0x16565c,this['_duration']--,this[_0x5257e9(0xc7)]<=0x0&&(this['opacity']=0x0);},Sprite_MapMotionTrail[_0x4ee445(0x30f)][_0x4ee445(0x33c)]=function(){const _0x4b1666=_0x4ee445,_0x36f918=$gameMap[_0x4b1666(0xd4)](),_0x478be5=$gameMap[_0x4b1666(0x2ad)]();this['x']=Math[_0x4b1666(0x18f)]($gameMap[_0x4b1666(0x214)](this[_0x4b1666(0x257)])*_0x36f918+_0x36f918/0x2),this['y']=Math['floor']($gameMap['adjustY'](this[_0x4b1666(0x1f4)])*_0x478be5+_0x478be5),this['y']-=this[_0x4b1666(0x27d)]+this['_jumpHeight']+0.001;},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x2b4)]=Spriteset_Map['prototype']['createLowerLayer'],Spriteset_Map[_0x4ee445(0x30f)]['createLowerLayer']=function(){const _0x2ef9e2=_0x4ee445;VisuMZ['MovementEffects'][_0x2ef9e2(0x2b4)][_0x2ef9e2(0x2c3)](this),this[_0x2ef9e2(0x128)](),this[_0x2ef9e2(0x348)](),this['createMotionTrailContainers']();},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x33b)]=Spriteset_Map[_0x4ee445(0x30f)][_0x4ee445(0x191)],Spriteset_Map[_0x4ee445(0x30f)]['update']=function(){const _0x5340db=_0x4ee445;VisuMZ[_0x5340db(0x195)]['Spriteset_Map_update'][_0x5340db(0x2c3)](this),this[_0x5340db(0x127)](),this['updateFootprints'](),this[_0x5340db(0x1a9)]();},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x173)]=Spriteset_Map[_0x4ee445(0x30f)][_0x4ee445(0xc2)],Spriteset_Map[_0x4ee445(0x30f)][_0x4ee445(0xc2)]=function(){const _0x1a0f34=_0x4ee445;VisuMZ[_0x1a0f34(0x195)][_0x1a0f34(0x173)][_0x1a0f34(0x2c3)](this),this[_0x1a0f34(0xb5)][_0x1a0f34(0x211)]['x']=Math[_0x1a0f34(0x2bf)](this[_0x1a0f34(0xb5)]['origin']['x']),this[_0x1a0f34(0xb5)][_0x1a0f34(0x211)]['y']=Math[_0x1a0f34(0x2bf)](this[_0x1a0f34(0xb5)][_0x1a0f34(0x211)]['y']),this[_0x1a0f34(0x235)]();},Spriteset_Map[_0x4ee445(0x30f)][_0x4ee445(0x235)]=function(){const _0x177f13=_0x4ee445;if(!this[_0x177f13(0x196)])return;const _0x203c3a=this[_0x177f13(0x196)][_0x177f13(0x103)];for(const _0x1cda4b of _0x203c3a){if(_0x177f13(0x22c)===_0x177f13(0x22c)){if(!_0x1cda4b)continue;if(!_0x1cda4b['picture']())continue;if(!_0x1cda4b[_0x177f13(0x122)]()[_0x177f13(0x215)]())continue;_0x1cda4b['updatePosition']();}else return!![];}},VisuMZ[_0x4ee445(0x195)][_0x4ee445(0x197)]=Sprite_Picture['prototype'][_0x4ee445(0x33c)],Sprite_Picture[_0x4ee445(0x30f)]['updatePosition']=function(){const _0x3808fa=_0x4ee445;VisuMZ['MovementEffects'][_0x3808fa(0x197)]['call'](this),this[_0x3808fa(0x122)]()['isTrueMapScrollLinked']()&&this[_0x3808fa(0x28c)]();},Sprite_Picture[_0x4ee445(0x30f)]['updateScrollLinkedPosition']=function(){const _0x58a2e3=_0x4ee445;if(!SceneManager['_scene'])return;if(!SceneManager[_0x58a2e3(0x345)][_0x58a2e3(0x233)])return;const _0x180ad3=SceneManager[_0x58a2e3(0x345)]['_spriteset'][_0x58a2e3(0xb5)];if(!_0x180ad3)return;this['x']-=Math[_0x58a2e3(0x18f)](_0x180ad3[_0x58a2e3(0x211)]['x']*$gameScreen[_0x58a2e3(0x252)]()),this['y']-=Math['floor'](_0x180ad3[_0x58a2e3(0x211)]['y']*$gameScreen[_0x58a2e3(0x252)]());},Spriteset_Map[_0x4ee445(0x30f)]['createDustCloudBasics']=function(){const _0xdfcadc=_0x4ee445;this[_0xdfcadc(0x1b4)]=this[_0xdfcadc(0x1b4)]||[];const _0x586e7e=$gameSystem[_0xdfcadc(0x267)]();this[_0xdfcadc(0x15e)]=JSON[_0xdfcadc(0x3a9)](JSON[_0xdfcadc(0x10f)](_0x586e7e)),this[_0xdfcadc(0xf9)]();},Spriteset_Map['prototype'][_0x4ee445(0x208)]=function(){const _0x46d508=_0x4ee445;if(!this['_dustCloudData'])this[_0x46d508(0x128)]();else{const _0x331714=$gameSystem[_0x46d508(0x267)]();JSON[_0x46d508(0x10f)](this[_0x46d508(0x15e)])!==JSON[_0x46d508(0x10f)](_0x331714)&&this[_0x46d508(0x128)]();}},Spriteset_Map[_0x4ee445(0x30f)][_0x4ee445(0xf9)]=function(){const _0x533ed2=_0x4ee445,_0x2fb480=this[_0x533ed2(0x15e)];if(_0x2fb480[_0x533ed2(0x1e8)]!==''){if(_0x533ed2(0x20b)!==_0x533ed2(0xbc))this['_dustCloudBitmap']=ImageManager[_0x533ed2(0x2e0)](_0x2fb480[_0x533ed2(0x1e8)]);else{if(!_0x539a96['dustCloud'])return![];if(_0xcccd0c){const _0x42ae42=_0x176c50[_0x533ed2(0x195)]['RegExp'],_0x4f8661=_0x1ac493[_0x533ed2(0x23a)]||'';if(_0x4f8661['match'](_0x42ae42['ForceDustCloud']))return!![];else{if(_0x4f8661['match'](_0x42ae42['NoDustCloud']))return![];}}return _0x135ae9[_0x533ed2(0x178)]();}}else{const _0x11fdba=_0x2fb480[_0x533ed2(0x2d5)],_0x2793d5=_0x11fdba*0x2,_0x4b78b1=new Bitmap(_0x2793d5,_0x2793d5),_0x98a263=_0x2fb480['color'],_0x2e4f72=_0x2fb480[_0x533ed2(0x383)];_0x4b78b1[_0x533ed2(0x148)](_0x11fdba,_0x98a263,_0x2e4f72),this[_0x533ed2(0x10c)]=_0x4b78b1;}},Bitmap[_0x4ee445(0x30f)][_0x4ee445(0x148)]=function(_0x2c3ffa,_0x23e8e9,_0x2fc695){const _0x12c81b=_0x4ee445;_0x2fc695=_0x2fc695[_0x12c81b(0x119)](0x0,0x1);const _0x15f1bf=this['context'],_0x1b61ce=0x168*(Math['PI']/0xb4),_0x1d6a0c=_0x2c3ffa*0x2,_0x335ad4=_0x15f1bf['createRadialGradient'](_0x2c3ffa,_0x2c3ffa,0x0,_0x2c3ffa,_0x2c3ffa,_0x2c3ffa),_0x5807b5=ColorManager[_0x12c81b(0x13c)](_0x23e8e9,0x1),_0x25b9fa=ColorManager['hexToRgba'](_0x23e8e9,0x0);_0x335ad4['addColorStop'](0x0,_0x5807b5),_0x335ad4['addColorStop'](_0x2fc695,_0x5807b5),_0x335ad4[_0x12c81b(0x384)](0x1,_0x25b9fa),_0x15f1bf[_0x12c81b(0x232)](),_0x15f1bf[_0x12c81b(0x266)]=_0x335ad4,_0x15f1bf[_0x12c81b(0x1f5)](),_0x15f1bf[_0x12c81b(0x286)](_0x2c3ffa,_0x2c3ffa),_0x15f1bf['lineTo'](_0x1d6a0c,_0x2c3ffa),_0x15f1bf['arc'](_0x2c3ffa,_0x2c3ffa,_0x2c3ffa,0x0,_0x1b61ce),_0x15f1bf[_0x12c81b(0x131)](_0x2c3ffa,_0x2c3ffa),_0x15f1bf['fill'](),_0x15f1bf[_0x12c81b(0x271)](),this[_0x12c81b(0x188)][_0x12c81b(0x191)]();},ColorManager[_0x4ee445(0x13c)]=function(_0x5785f8,_0x5ccb18){const _0x5ccd0d=_0x4ee445;let _0x32bc98='';if(/^#([A-Fa-f0-9]{3}){1,2}$/[_0x5ccd0d(0x2e6)](_0x5785f8)){_0x32bc98=_0x5785f8[_0x5ccd0d(0x34d)](0x1)[_0x5ccd0d(0x27f)]('');if(_0x32bc98[_0x5ccd0d(0xc5)]===0x3){if(_0x5ccd0d(0xf7)!==_0x5ccd0d(0x2b6))_0x32bc98=[_0x32bc98[0x0],_0x32bc98[0x0],_0x32bc98[0x1],_0x32bc98[0x1],_0x32bc98[0x2],_0x32bc98[0x2]];else{this[_0x5ccd0d(0x129)]=this[_0x5ccd0d(0x129)]||[];for(const _0x55c6f7 of this[_0x5ccd0d(0x129)]){_0x41b4b2['setValue'](_0x55c6f7,_0x8df589);}!_0x41755a&&(this['_smartRushMode']=0x0);}}while(_0x32bc98[_0x5ccd0d(0xc5)]>0x6)_0x32bc98[_0x5ccd0d(0x33f)]();return _0x32bc98='0x'+_0x32bc98[_0x5ccd0d(0x2fb)](''),'rgba('+[(_0x32bc98>>0x10&0xff)[_0x5ccd0d(0x119)](0x0,0xff),(_0x32bc98>>0x8&0xff)[_0x5ccd0d(0x119)](0x0,0xff),(_0x32bc98&0xff)['clamp'](0x0,0xff)][_0x5ccd0d(0x2fb)](',')+','+_0x5ccb18[_0x5ccd0d(0x119)](0x0,0x1)+')';}else{if('ANmav'!==_0x5ccd0d(0x225))return _0x5ccd0d(0x237);else _0x4eeecf('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x5ccd0d(0x17a)](_0x2306eb,_0x3b0d84)),_0x2486f3['exit']();}},Spriteset_Map[_0x4ee445(0x30f)][_0x4ee445(0x227)]=function(_0x348bac){const _0x21152e=_0x4ee445,_0x5c89f7=this[_0x21152e(0x155)](_0x348bac);if(!_0x5c89f7)return;this['checkDustCloudChanges']();const _0x4ae9f9=this[_0x21152e(0x15e)],_0x1e56c7=_0x4ae9f9[_0x21152e(0x2a1)],_0x795338=new Sprite();_0x795338[_0x21152e(0x1b7)]=this[_0x21152e(0x10c)],_0x795338[_0x21152e(0x1b0)]=_0x4ae9f9[_0x21152e(0x142)],_0x795338['_duration']=_0x4ae9f9[_0x21152e(0x332)],_0x795338[_0x21152e(0x1c7)]['x']=0.5,_0x795338['anchor']['y']=0x1,_0x795338[_0x21152e(0xcd)]['x']=(Math[_0x21152e(0x292)]()*_0x1e56c7)['clamp'](0.01,0.99),_0x795338['scale']['y']=(Math['random']()*_0x1e56c7)[_0x21152e(0x119)](0.01,0.99),_0x795338[_0x21152e(0x2cb)]=0x1-(Math[_0x21152e(0x292)]()*_0x1e56c7*0x2)['clamp'](0x0,0.8),_0x795338[_0x21152e(0x326)]=0x1-(Math[_0x21152e(0x292)]()*_0x1e56c7*0x2)[_0x21152e(0x119)](0x0,0.8);const _0x34a39a=0.25,_0x44df65=0.05;_0x795338[_0x21152e(0x257)]=_0x348bac[_0x21152e(0x257)]+Math[_0x21152e(0x292)]()*_0x34a39a+Math[_0x21152e(0x292)]()*_0x34a39a-_0x34a39a,_0x795338['_realY']=_0x348bac['_realY']+Math[_0x21152e(0x292)]()*_0x44df65+Math[_0x21152e(0x292)]()*_0x44df65-_0x44df65,_0x795338['z']=0x3,this['_dustCloudSprites'][_0x21152e(0x363)](_0x795338),this[_0x21152e(0xb5)][_0x21152e(0x1f2)](_0x795338);},Spriteset_Map[_0x4ee445(0x30f)][_0x4ee445(0x127)]=function(){const _0x31e46e=_0x4ee445,_0x2fdaa6=[];for(const _0x7f48da of this['_dustCloudSprites']){if('uyzom'!==_0x31e46e(0xc9)){const _0xb6740e=this[_0x31e46e(0x147)],_0x42130d=this['direction']();let _0x111522=this['x'],_0x2bb01f=this['y'];if([0x1,0x4,0x7][_0x31e46e(0x2e4)](_0x42130d))_0x111522+=-_0xb6740e;if([0x3,0x6,0x9][_0x31e46e(0x2e4)](_0x42130d))_0x111522+=_0xb6740e;if([0x7,0x8,0x9][_0x31e46e(0x2e4)](_0x42130d))_0x2bb01f+=-_0xb6740e;if([0x1,0x2,0x3][_0x31e46e(0x2e4)](_0x42130d))_0x2bb01f+=_0xb6740e;this['smartBlinkMotionTrailData']()[_0x31e46e(0x2f3)]&&this[_0x31e46e(0x2a6)]();_0x45c020[_0x31e46e(0x30f)][_0x31e46e(0x19e)][_0x31e46e(0x2c3)](this,_0x111522,_0x2bb01f),this[_0x31e46e(0x210)][_0x31e46e(0x11d)](_0x111522,_0x2bb01f,this[_0x31e46e(0x1a2)]());if(!_0x592013[_0x31e46e(0x113)]())this[_0x31e46e(0xda)](_0x111522,_0x2bb01f);this[_0x31e46e(0x1ba)](),_0x4cf833(this[_0x31e46e(0x110)]['bind'](this,[0x1,0x2]),0x32);}else{if(!_0x7f48da)continue;this[_0x31e46e(0x1a1)](_0x7f48da);if(_0x7f48da[_0x31e46e(0xc7)]<=0x0)_0x2fdaa6[_0x31e46e(0x363)](_0x7f48da);}}for(const _0x3ea02b of _0x2fdaa6){if(_0x31e46e(0x223)!==_0x31e46e(0x287))this[_0x31e46e(0xb5)][_0x31e46e(0x166)](_0x3ea02b),this[_0x31e46e(0x1b4)]['remove'](_0x3ea02b);else{_0x543879['match'](_0x1f63be[_0x31e46e(0x2b8)]);const _0x2830d6=_0x42b1c6(_0x4f616c['$1'])[_0x31e46e(0x119)](0x0,0xff),_0x543c5c=_0x33a93f(_0x935c65['$2'])[_0x31e46e(0x119)](0x0,0xff);this[_0x31e46e(0xf4)][_0x31e46e(0x1b0)]['regions'][_0x2830d6]=_0x543c5c;}}},Spriteset_Map[_0x4ee445(0x30f)][_0x4ee445(0x1a1)]=function(_0x3a06b7){const _0x11625d=_0x4ee445,_0x1a245a=_0x3a06b7['_duration'],_0x976525=$gameMap[_0x11625d(0xd4)](),_0x1e919a=$gameMap['tileHeight']();_0x3a06b7['x']=Math[_0x11625d(0x18f)]($gameMap[_0x11625d(0x214)](_0x3a06b7[_0x11625d(0x257)])*_0x976525+_0x976525/0x2),_0x3a06b7['y']=Math[_0x11625d(0x18f)]($gameMap['adjustY'](_0x3a06b7[_0x11625d(0x1f4)])*_0x1e919a+_0x1e919a),_0x3a06b7[_0x11625d(0xcd)]['x']=(_0x3a06b7[_0x11625d(0xcd)]['x']*(_0x1a245a-0x1)+_0x3a06b7[_0x11625d(0x2cb)])/_0x1a245a,_0x3a06b7['scale']['y']=(_0x3a06b7['scale']['y']*(_0x1a245a-0x1)+_0x3a06b7[_0x11625d(0x326)])/_0x1a245a,_0x3a06b7[_0x11625d(0x1b0)]=_0x3a06b7[_0x11625d(0x1b0)]*(_0x1a245a-0x1)/_0x1a245a,_0x3a06b7[_0x11625d(0xc7)]--;},Spriteset_Map['prototype']['createFootprintBasics']=function(){const _0x287c7f=_0x4ee445;this[_0x287c7f(0x37d)]=this[_0x287c7f(0x37d)]||[];},Spriteset_Map['prototype'][_0x4ee445(0x1e5)]=function(_0x48f1aa){const _0x35f1db=_0x4ee445,_0x4ed81f=this['findTargetSprite'](_0x48f1aa);if(!_0x4ed81f)return;const _0x1d40b5=new Sprite_Footprint(_0x48f1aa);this[_0x35f1db(0x37d)][_0x35f1db(0x363)](_0x1d40b5),this[_0x35f1db(0xb5)][_0x35f1db(0x1f2)](_0x1d40b5);},Spriteset_Map[_0x4ee445(0x30f)][_0x4ee445(0x2e7)]=function(){const _0x1e915c=_0x4ee445,_0xfef188=[];for(const _0x45f323 of this[_0x1e915c(0x37d)]){if(!_0x45f323)continue;this[_0x1e915c(0x15f)](_0x45f323);if(_0x45f323[_0x1e915c(0xc7)]<=0x0)_0xfef188['push'](_0x45f323);}for(const _0x532da5 of _0xfef188){if('IPJCY'===_0x1e915c(0x2ed))return 1.0017453;else this['_tilemap'][_0x1e915c(0x166)](_0x532da5),this[_0x1e915c(0x37d)][_0x1e915c(0x2ab)](_0x532da5);}},Spriteset_Map['prototype']['updateFootprintSprite']=function(_0x5b1a35){const _0x3e04ca=_0x4ee445,_0x40414f=_0x5b1a35[_0x3e04ca(0xc7)];_0x5b1a35[_0x3e04ca(0x1b0)]=_0x5b1a35['opacity']*(_0x40414f-0x1)/_0x40414f,_0x5b1a35[_0x3e04ca(0xc7)]--;},Spriteset_Map[_0x4ee445(0x30f)][_0x4ee445(0x1e7)]=function(){this['_motionTrailSprites']=[],this['_motionTrailExpiredSprites']=[];},Spriteset_Map[_0x4ee445(0x30f)][_0x4ee445(0x1a9)]=function(){const _0x4b5030=_0x4ee445;if(!this[_0x4b5030(0x253)])return;for(const _0x15ef0d of this[_0x4b5030(0x1d3)]){if(!_0x15ef0d)continue;this[_0x4b5030(0x1d3)][_0x4b5030(0x2ab)](_0x15ef0d),this[_0x4b5030(0xb5)]['removeChild'](_0x15ef0d);}for(const _0xa35482 of this[_0x4b5030(0x253)]){if(!_0xa35482)continue;if(_0xa35482[_0x4b5030(0x1b0)]>0x0)continue;this['_motionTrailSprites'][_0x4b5030(0x2ab)](_0xa35482),this[_0x4b5030(0x1d3)][_0x4b5030(0x363)](_0xa35482);}};