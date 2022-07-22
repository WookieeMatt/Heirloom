//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.44;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.44] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 *   - If '0' is used for the Map ID, reference the current map.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 * 
 * <Exit Reset Self Data>
 * 
 * - Used for: Event Notetags ONLY
 * - When the player leaves the current map, all Self Switches and Self
 *   Variables related to this event will be reset.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Picture Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Applies a picture graphic from the /img/pictures/ folder of your project.
 * - This graphic will be on top of the character sprite but below the event
 *   icon sprite.
 *   - The picture priority will be the same as the event's priority.
 *   - If it is "below characters", the player can walk on top of it.
 *   - If it is "above characters", the player will behind it.
 *   - If it is "same as characters", the priority will be based on the
 *     current relative Y position. This also means, if the picture is big
 *     enough, it can clip into the top of tree tiles and such.
 * - Replace 'filename' with a filename from the game project's /img/pictures/
 *   folder. This is case sensitive. Do NOT include the file extension.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Max Size: x>
 * <Picture Scale: y%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - If the "Max Size" or "Scale" supplementary notetags are used, the picture
 *   graphic will be scaled proportionally to fit either the exact pixel size
 *   for "Max Size" or the "Scale" ratio.
 *   - Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
 * - Replace 'x' with a number value representing the exact pixel size for the
 *   "Max Size" notetag.
 * - Replace 'y' with a number value representing the scale on which to shrink
 *   or enlarge the picture. 100% is normal size. 50% is half size. 200% is
 *   double size.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Picture Offset X: +x>
 * <Picture Offset X: -x>
 *
 * <Picture Offset Y: +x>
 * <Picture Offset Y: -x>
 *
 * <Picture Offset: +x, +y>
 * <Picture Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Offsets the X and Y position of the event picture relative to the event
 *   sprite's own position.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Picture Wait Frames: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Used with <Picture Filename: filename> notetag.
 * - Requires VisuMZ_4_AnimatedPictures!
 * - "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
 *   determines the delay inbetween frame changes.
 * - Replace 'x' with a number representing the amount of frames to wait
 *   inbetween frame changes.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 * 
 * <Playtest>
 * 
 * - Used for: Event Notetags.
 * - This does NOT work when it's in the Event Page Comment Tags.
 * - If this notetag is found in the event's notebox (NOT comments), then the
 *   event will only appear during a playtest session. It will not appear in a
 *   deployed game where the playtest flag is not on.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Data Plugin Commands ===
 * 
 * ---
 * 
 * Self Data: Reset All
 * - Reset the Self Switch and Self Variable data of all events within the
 *   specified map.
 * 
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This refers to the original position's X/Y on the map.
 * - The event will turn and face the tile that is its original X/Y location.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Dash on Ladder?
 *   - Allow dashing while on a ladder or rope?
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 *   Shift Y:
 *   - How many pixels should non-tile characters be shifted by?
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 * 
 * Wall Bump
 * 
 *   Enable?:
 *   - Enable the sound effect to be played when bumping into a wall?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.44: July 21, 2022
 * * Bug Fixes!
 * ** Fixed a problem that caused <Exit Reset Self Data> notetag to not work.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Diagonal pathfinding is now disabled when there are too many events on a
 *    map, causing extra collission checks. This value is set to 100 for the
 *    time being until we can figure out a better way to calculate diagonal
 *    pathfinding. Update made by Irina.
 * 
 * Version 1.43: July 14, 2022
 * * Bug Fixes!
 * ** Move to Player for events should no longer cause hang ups. Fix by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added caching function for pathfinding when using touch movement for a
 *    smoother experience. When touch movement is held down, pathfinding will
 *    utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Update made by Arisu.
 * * New Features!
 * ** New notetag added by Arisu:
 * *** <Playtest>
 * **** If this notetag is found in the event's notebox (NOT comments), then
 *      the event will only appear during a playtest session. It will not
 *      appear in a deployed game where the playtest flag is not on.
 * 
 * Version 1.42: June 23, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added to <Copy Event: x, y> notetag help:
 * *** - If '0' is used for the Map ID, reference the current map.
 * * Feature Update!
 * ** Default MZ behavior would have "below characters" trigger events with
 *    only comments lock out facing "same as characters" trigger events. This
 *    is now bypassed. Update made by Arisu.
 * ** The <Copy Event: mapID, eventID> notetags now allow usage of '0' for the
 *    mapID to reference the current map. Update made by Arisu.
 * ** <Save Event Location> should now work more efficiently. Update by Arisu.
 * ** Dashing animations for followers will no longer look weird after having
 *    gathered up and then proceeding to dash. Update made by Irina.
 * * New Features!
 * ** New event notetag added by Arisu:
 * *** <Exit Reset Self Data>
 * **** When the player leaves the current map, all Self Switches and Self
 *      Variables related to this event will be reset.
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Self Data: Reset All
 * **** Reset the Self Switch and Self Variable data of all events within the
 *      specified map.
 * ** New Plugin Parameter added by Arisu and sponsored by Anon:
 * *** Plugin Params > Movement Settings > Dash > Dash on Ladder?
 * **** Allow dashing while on a ladder or rope?
 * 
 * Version 1.41: June 1, 2022
 * * Bug Fixes!
 * ** Parallel Process Common Events above 1000 should no longer crash the
 *    game. Bug fixed by Irina.
 * 
 * Version 1.40: May 19, 2022
 * * Bug Fixes!
 * ** Sprite Event Labels with distance properties will now work properly
 *    when changing from a non-met page condition to a met page condition.
 *    Fix made by Arisu.
 * 
 * Version 1.39: May 5, 2022
 * * Bug Fixes!
 * ** Save event location should now work properly with Set Event Location
 *    command. Fix made by Arisu.
 * ** Sprite Event Labels with distance properties will no longer be visible
 *    when constantly entering/exiting the Main Menu. Fix made by Arisu.
 * 
 * Version 1.38: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu and sponsored by Archeia:
 * *** Plugin Parameters > Movement Settings > Event Movement > Shift Y
 * **** How many pixels should non-tile characters be shifted by?
 * ** New Notetags added by Arisu and sponsored by Archeia:
 * *** <Picture Filename: filename>
 * **** applies a picture graphic from the /img/pictures/ folder of your
 *      game project.
 * **** This graphic will be on top of the character sprite but below the event
 *      icon sprite.
 * **** The picture priority will be the same as the event's priority. If it is
 *      "below characters", the player can walk on top of it. If it is "above
 *      characters", the player will behind it. If it is "same as characters",
 *      the priority will be based on the current relative Y position.
 * *** <Picture Max Size: x>
 * *** <Picture Scale: y%>
 * **** If the "Max Size" or "Scale" supplementary notetags are used, the
 *      picture graphic will be scaled proportionally to fit either the exact
 *      pixel size for "Max Size" or the "Scale" ratio.
 * *** <Picture Offset: +x, +y>
 * *** <Picture Offset: -x, -y>
 * **** Offsets the X and Y position of the event picture relative to the event
 *      sprite's own position.
 * *** <Picture Wait Frames: x>
 * **** Requires VisuMZ_4_AnimatedPictures! "Wait Frames" is used with VisuMZ's
 *      Animated Pictures plugin. This determines the delay inbetween
 *      frame changes.
 * 
 * Version 1.37: March 24, 2022
 * * Documentation Update!
 * ** Added extra clarity to "Turn to Home" Movement Command.
 * *** This refers to the original position's X/Y on the map.
 * *** The event will turn and face the tile that is its original X/Y location.
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfData
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfDataResetAll
 * @text Self Data: Reset All
 * @desc Reset the Self Switch and Self Variable data of all events
 * within the specified map.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param DashOnLadder:eval
 * @text Dash On Ladder?
 * @parent Dash
 * @type boolean
 * @on Allow
 * @off Disallow
 * @desc Allow dashing while on a ladder or rope?
 * @default false
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param ShiftY:num
 * @text Shift Y
 * @parent EventMove
 * @desc How many pixels should non-tile characters be shifted by?
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x26bacd=_0xe506;function _0xe506(_0x101dc8,_0x1a7509){const _0x445372=_0x4453();return _0xe506=function(_0xe5064,_0x4e4ff0){_0xe5064=_0xe5064-0x14b;let _0x41a99f=_0x445372[_0xe5064];return _0x41a99f;},_0xe506(_0x101dc8,_0x1a7509);}(function(_0x5142ff,_0x51bbbf){const _0x51327d=_0xe506,_0x2918e8=_0x5142ff();while(!![]){try{const _0x112ba9=-parseInt(_0x51327d(0x5cd))/0x1+-parseInt(_0x51327d(0x510))/0x2*(parseInt(_0x51327d(0x597))/0x3)+parseInt(_0x51327d(0x1d9))/0x4+parseInt(_0x51327d(0x28e))/0x5+-parseInt(_0x51327d(0x68f))/0x6*(parseInt(_0x51327d(0x475))/0x7)+-parseInt(_0x51327d(0x67a))/0x8*(parseInt(_0x51327d(0x1da))/0x9)+parseInt(_0x51327d(0x188))/0xa;if(_0x112ba9===_0x51bbbf)break;else _0x2918e8['push'](_0x2918e8['shift']());}catch(_0x3b7e0e){_0x2918e8['push'](_0x2918e8['shift']());}}}(_0x4453,0x19beb));var label=_0x26bacd(0x2b9),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x4e3095){const _0x16639a=_0x26bacd;return _0x4e3095[_0x16639a(0x414)]&&_0x4e3095['description'][_0x16639a(0x18c)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x26bacd(0x3b3)]||{},VisuMZ['ConvertParams']=function(_0x4c194d,_0x22a836){const _0x6b7e07=_0x26bacd;for(const _0x3b7021 in _0x22a836){if(_0x3b7021[_0x6b7e07(0x224)](/(.*):(.*)/i)){const _0x50fe4a=String(RegExp['$1']),_0x4dd2c6=String(RegExp['$2'])[_0x6b7e07(0x68e)]()[_0x6b7e07(0x5fa)]();let _0x30d60b,_0x1d0c76,_0x6b22c5;switch(_0x4dd2c6){case _0x6b7e07(0x2ed):_0x30d60b=_0x22a836[_0x3b7021]!==''?Number(_0x22a836[_0x3b7021]):0x0;break;case'ARRAYNUM':_0x1d0c76=_0x22a836[_0x3b7021]!==''?JSON[_0x6b7e07(0x34b)](_0x22a836[_0x3b7021]):[],_0x30d60b=_0x1d0c76['map'](_0x1d02aa=>Number(_0x1d02aa));break;case _0x6b7e07(0x293):_0x30d60b=_0x22a836[_0x3b7021]!==''?eval(_0x22a836[_0x3b7021]):null;break;case'ARRAYEVAL':_0x1d0c76=_0x22a836[_0x3b7021]!==''?JSON[_0x6b7e07(0x34b)](_0x22a836[_0x3b7021]):[],_0x30d60b=_0x1d0c76['map'](_0x52d4f9=>eval(_0x52d4f9));break;case _0x6b7e07(0x305):_0x30d60b=_0x22a836[_0x3b7021]!==''?JSON[_0x6b7e07(0x34b)](_0x22a836[_0x3b7021]):'';break;case _0x6b7e07(0x4ec):_0x1d0c76=_0x22a836[_0x3b7021]!==''?JSON['parse'](_0x22a836[_0x3b7021]):[],_0x30d60b=_0x1d0c76[_0x6b7e07(0x1fe)](_0xe30556=>JSON[_0x6b7e07(0x34b)](_0xe30556));break;case'FUNC':_0x30d60b=_0x22a836[_0x3b7021]!==''?new Function(JSON['parse'](_0x22a836[_0x3b7021])):new Function(_0x6b7e07(0x5fe));break;case _0x6b7e07(0x44e):_0x1d0c76=_0x22a836[_0x3b7021]!==''?JSON[_0x6b7e07(0x34b)](_0x22a836[_0x3b7021]):[],_0x30d60b=_0x1d0c76['map'](_0x596ccd=>new Function(JSON[_0x6b7e07(0x34b)](_0x596ccd)));break;case _0x6b7e07(0x4e2):_0x30d60b=_0x22a836[_0x3b7021]!==''?String(_0x22a836[_0x3b7021]):'';break;case _0x6b7e07(0x3b2):_0x1d0c76=_0x22a836[_0x3b7021]!==''?JSON[_0x6b7e07(0x34b)](_0x22a836[_0x3b7021]):[],_0x30d60b=_0x1d0c76['map'](_0xf8e5bc=>String(_0xf8e5bc));break;case'STRUCT':_0x6b22c5=_0x22a836[_0x3b7021]!==''?JSON[_0x6b7e07(0x34b)](_0x22a836[_0x3b7021]):{},_0x4c194d[_0x50fe4a]={},VisuMZ[_0x6b7e07(0x164)](_0x4c194d[_0x50fe4a],_0x6b22c5);continue;case _0x6b7e07(0x53b):_0x1d0c76=_0x22a836[_0x3b7021]!==''?JSON[_0x6b7e07(0x34b)](_0x22a836[_0x3b7021]):[],_0x30d60b=_0x1d0c76[_0x6b7e07(0x1fe)](_0x480165=>VisuMZ[_0x6b7e07(0x164)]({},JSON[_0x6b7e07(0x34b)](_0x480165)));break;default:continue;}_0x4c194d[_0x50fe4a]=_0x30d60b;}}return _0x4c194d;},(_0x4beda5=>{const _0x5f0f7d=_0x26bacd,_0x47ca7d=_0x4beda5[_0x5f0f7d(0x434)];for(const _0x141cb3 of dependencies){if(!Imported[_0x141cb3]){if(_0x5f0f7d(0x68b)===_0x5f0f7d(0x4e0)){const _0x48b936=_0x36f418[_0x5f0f7d(0x43b)]()||this;if(_0x48b936[_0x5f0f7d(0x1ea)]!==_0x3023a6)_0x5617eb['EventsMoveCore'][_0x5f0f7d(0x463)][_0x5f0f7d(0x1a2)](this,_0x53e084,_0x3a600c);else{const _0x5054e8=[_0x48b936[_0x5f0f7d(0x317)],_0x48b936[_0x5f0f7d(0x65f)],_0x5f0f7d(0x60c)[_0x5f0f7d(0x389)](_0x59dda5)];_0x5323a9[_0x5f0f7d(0x688)](_0x5054e8,_0x4b7920);}}else{alert(_0x5f0f7d(0x3fc)[_0x5f0f7d(0x389)](_0x47ca7d,_0x141cb3)),SceneManager[_0x5f0f7d(0x5dd)]();break;}}}const _0x449bc0=_0x4beda5[_0x5f0f7d(0x361)];if(_0x449bc0[_0x5f0f7d(0x224)](/\[Version[ ](.*?)\]/i)){const _0x3f1190=Number(RegExp['$1']);_0x3f1190!==VisuMZ[label][_0x5f0f7d(0x440)]&&(_0x5f0f7d(0x226)!==_0x5f0f7d(0x226)?(_0x2b1cb2[_0x5f0f7d(0x2b7)](_0x5a36d1['_selfTargetNumberInput']),_0x1a6bdb[_0x5f0f7d(0x2b9)][_0x5f0f7d(0x539)]['call'](this),_0x1f7e39[_0x5f0f7d(0x419)](),_0x1308a0[_0x5f0f7d(0x5d1)]=_0x245f4a):(alert(_0x5f0f7d(0x4fd)[_0x5f0f7d(0x389)](_0x47ca7d,_0x3f1190)),SceneManager[_0x5f0f7d(0x5dd)]()));}if(_0x449bc0[_0x5f0f7d(0x224)](/\[Tier[ ](\d+)\]/i)){const _0x32ce57=Number(RegExp['$1']);if(_0x32ce57<tier){if(_0x5f0f7d(0x31c)===_0x5f0f7d(0x31c))alert(_0x5f0f7d(0x333)['format'](_0x47ca7d,_0x32ce57,tier)),SceneManager[_0x5f0f7d(0x5dd)]();else return _0x5d208d[_0x5f0f7d(0x414)]&&_0x575b98[_0x5f0f7d(0x361)][_0x5f0f7d(0x18c)]('['+_0x4a4536+']');}else{if(_0x5f0f7d(0x37b)!==_0x5f0f7d(0x37b))for(let _0x54bd44=-this[_0x5f0f7d(0x608)]['up'];_0x54bd44<=this[_0x5f0f7d(0x608)]['down'];_0x54bd44++){if(!_0x2d0446[_0x5f0f7d(0x42f)][_0x5f0f7d(0x1c6)][_0x5f0f7d(0x1a2)](this,_0x8b8d17+_0x1dc649,_0x47227d+_0x54bd44,_0x2cae0c))return![];}else tier=Math[_0x5f0f7d(0x24b)](_0x32ce57,tier);}}VisuMZ[_0x5f0f7d(0x164)](VisuMZ[label][_0x5f0f7d(0x3b3)],_0x4beda5[_0x5f0f7d(0x27c)]);})(pluginData),VisuMZ[_0x26bacd(0x4c1)]=function(_0x274f0c,_0x5ac009,_0x41dab5){switch(_0x41dab5){case'=':return _0x5ac009;break;case'+':return _0x274f0c+_0x5ac009;break;case'-':return _0x274f0c-_0x5ac009;break;case'*':return _0x274f0c*_0x5ac009;break;case'/':return _0x274f0c/_0x5ac009;break;case'%':return _0x274f0c%_0x5ac009;break;}return _0x274f0c;},PluginManager[_0x26bacd(0x417)](pluginData['name'],'AutoMoveEvents',_0x370466=>{const _0xa1e0d6=_0x26bacd;VisuMZ['ConvertParams'](_0x370466,_0x370466);switch(_0x370466[_0xa1e0d6(0x25d)]){case'Allow':$gameSystem[_0xa1e0d6(0x661)](!![]);break;case _0xa1e0d6(0x560):$gameSystem[_0xa1e0d6(0x661)](![]);break;case _0xa1e0d6(0x4ca):$gameSystem[_0xa1e0d6(0x661)](!$gameSystem[_0xa1e0d6(0x675)]());break;}}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x666),_0x5da988=>{const _0x122cc9=_0x26bacd;VisuMZ[_0x122cc9(0x164)](_0x5da988,_0x5da988);const _0x23c13f=$gameTemp[_0x122cc9(0x2fb)](),_0x2934f7={'mapId':_0x5da988[_0x122cc9(0x2fe)],'eventId':_0x5da988['EventId']||_0x23c13f[_0x122cc9(0x18a)](),'pageId':_0x5da988[_0x122cc9(0x468)]};if(_0x2934f7[_0x122cc9(0x362)]<=0x0)_0x2934f7['mapId']=$gameMap?$gameMap['mapId']():0x1;$gameTemp[_0x122cc9(0x2fb)]()[_0x122cc9(0x1f1)](_0x2934f7);}),PluginManager[_0x26bacd(0x417)](pluginData['name'],'DashEnableToggle',_0x3d141d=>{const _0x52b707=_0x26bacd;VisuMZ[_0x52b707(0x164)](_0x3d141d,_0x3d141d);switch(_0x3d141d[_0x52b707(0x25d)]){case _0x52b707(0x278):$gameSystem['setDashingEnabled'](!![]);break;case _0x52b707(0x48a):$gameSystem[_0x52b707(0x5a8)](![]);break;case _0x52b707(0x4ca):$gameSystem['setDashingEnabled'](!$gameSystem[_0x52b707(0x2a9)]());break;}}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x19b),_0x397d13=>{const _0x543e64=_0x26bacd;VisuMZ[_0x543e64(0x164)](_0x397d13,_0x397d13);const _0x449c5d=$gameTemp[_0x543e64(0x2fb)]();_0x397d13['MapId']=_0x397d13[_0x543e64(0x2fe)]||$gameMap[_0x543e64(0x362)](),$gameSystem[_0x543e64(0x40e)](_0x397d13['MapId'],_0x397d13[_0x543e64(0x20c)]||_0x449c5d['eventId'](),_0x397d13[_0x543e64(0x296)],_0x397d13['IconBufferX'],_0x397d13[_0x543e64(0x171)],_0x397d13[_0x543e64(0x225)]);}),PluginManager['registerCommand'](pluginData[_0x26bacd(0x434)],_0x26bacd(0x3e9),_0x133c21=>{const _0x1d700c=_0x26bacd;VisuMZ[_0x1d700c(0x164)](_0x133c21,_0x133c21);const _0x4e97bf=$gameTemp[_0x1d700c(0x2fb)]();_0x133c21[_0x1d700c(0x2fe)]=_0x133c21[_0x1d700c(0x2fe)]||$gameMap[_0x1d700c(0x362)](),$gameSystem['deleteIconsOnEventsDataKey'](_0x133c21['MapId'],_0x133c21[_0x1d700c(0x20c)]||_0x4e97bf[_0x1d700c(0x18a)]());}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x51e),_0x10107b=>{const _0x31ca5b=_0x26bacd;if($gameMap)for(const _0x4ee35a of $gameMap[_0x31ca5b(0x530)]()){_0x4ee35a[_0x31ca5b(0x2d5)]();}}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x366),_0x4d55bf=>{const _0x3b4e72=_0x26bacd;VisuMZ[_0x3b4e72(0x164)](_0x4d55bf,_0x4d55bf);switch(_0x4d55bf['Visibility']){case _0x3b4e72(0x36e):$gameSystem[_0x3b4e72(0x3c2)](!![]);break;case _0x3b4e72(0x686):$gameSystem[_0x3b4e72(0x3c2)](![]);break;case'Toggle':$gameSystem[_0x3b4e72(0x3c2)](!$gameSystem[_0x3b4e72(0x2ca)]());break;}}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],'EventLocationSave',_0x41d4ca=>{const _0x56f65f=_0x26bacd;VisuMZ[_0x56f65f(0x164)](_0x41d4ca,_0x41d4ca);const _0x2abbd5=$gameTemp[_0x56f65f(0x2fb)]();if(!$gameMap)return;const _0x4a5d29=$gameMap[_0x56f65f(0x3b5)](_0x41d4ca[_0x56f65f(0x20c)]||_0x2abbd5[_0x56f65f(0x18a)]());if(_0x4a5d29)_0x4a5d29[_0x56f65f(0x331)]();}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x385),_0x41d87a=>{const _0x15ed90=_0x26bacd;VisuMZ['ConvertParams'](_0x41d87a,_0x41d87a);const _0xf9d5a4=$gameTemp['getLastPluginCommandInterpreter'](),_0x2a6f11=_0x41d87a[_0x15ed90(0x2fe)]||$gameMap['mapId'](),_0x567b15=_0x41d87a[_0x15ed90(0x20c)]||_0xf9d5a4['eventId'](),_0xc30bf4=_0x41d87a[_0x15ed90(0x3e8)]||0x0,_0x38e5f2=_0x41d87a[_0x15ed90(0x236)]||0x0,_0x5afb8e=_0x41d87a['Direction']||0x2,_0x6c9140=((_0x41d87a[_0x15ed90(0x468)]||0x1)-0x1)[_0x15ed90(0x48e)](0x0,0x13),_0x4916bc=_0x41d87a[_0x15ed90(0x695)]||0x0;$gameSystem['createSaveEventLocationData'](_0x2a6f11,_0x567b15,_0xc30bf4,_0x38e5f2,_0x5afb8e,_0x6c9140,_0x4916bc);}),PluginManager[_0x26bacd(0x417)](pluginData['name'],_0x26bacd(0x3e4),_0xe968c0=>{const _0x244c5c=_0x26bacd;VisuMZ[_0x244c5c(0x164)](_0xe968c0,_0xe968c0);const _0x4fe2e3=$gameTemp[_0x244c5c(0x2fb)](),_0x47fed7=_0xe968c0['MapId']||$gameMap['mapId'](),_0x227224=_0xe968c0[_0x244c5c(0x20c)]||_0x4fe2e3[_0x244c5c(0x18a)]();$gameSystem['deleteSavedEventLocationKey'](_0x47fed7,_0x227224);}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],'EventTimerExpireEvent',_0x4b20fb=>{const _0x34128d=_0x26bacd;VisuMZ[_0x34128d(0x164)](_0x4b20fb,_0x4b20fb);const _0x2ba5fe=_0x4b20fb[_0x34128d(0x1f4)];$gameTimer[_0x34128d(0x4d9)](_0x2ba5fe);}),PluginManager[_0x26bacd(0x417)](pluginData['name'],_0x26bacd(0x509),_0x54f1a3=>{$gameTimer['setCommonEvent'](0x0);}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x345),_0x157541=>{const _0x12ac5d=_0x26bacd;if(!$gameTimer['isWorking']())return;VisuMZ[_0x12ac5d(0x164)](_0x157541,_0x157541);let _0x44b346=0x0;_0x44b346+=_0x157541[_0x12ac5d(0x590)],_0x44b346+=_0x157541[_0x12ac5d(0x329)]*0x3c,_0x44b346+=_0x157541[_0x12ac5d(0x2a2)]*0x3c*0x3c,_0x44b346+=_0x157541[_0x12ac5d(0x23c)]*0x3c*0x3c*0x3c,$gameTimer[_0x12ac5d(0x4ad)](_0x44b346);}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x571),_0x1b8bc7=>{const _0x474a1c=_0x26bacd;if(!$gameTimer['isWorking']())return;VisuMZ['ConvertParams'](_0x1b8bc7,_0x1b8bc7);let _0x3d1f71=0x0;_0x3d1f71+=_0x1b8bc7[_0x474a1c(0x590)],_0x3d1f71+=_0x1b8bc7[_0x474a1c(0x329)]*0x3c,_0x3d1f71+=_0x1b8bc7[_0x474a1c(0x2a2)]*0x3c*0x3c,_0x3d1f71+=_0x1b8bc7[_0x474a1c(0x23c)]*0x3c*0x3c*0x3c,$gameTimer[_0x474a1c(0x27b)](_0x3d1f71);}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x20a),_0x52bb45=>{const _0x4914a4=_0x26bacd;if(!$gameTimer['isWorking']())return;$gameTimer[_0x4914a4(0x3ed)]();}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x4f5),_0x2ba711=>{const _0x44103f=_0x26bacd;if(!$gameTimer[_0x44103f(0x574)]())return;$gameTimer['resume']();}),PluginManager[_0x26bacd(0x417)](pluginData['name'],_0x26bacd(0x4a1),_0x46c817=>{const _0x2d0577=_0x26bacd;VisuMZ[_0x2d0577(0x164)](_0x46c817,_0x46c817);const _0x2b5cd9=_0x46c817[_0x2d0577(0x2d9)]||0x0;$gameTimer['changeSpeed'](_0x2b5cd9);}),PluginManager['registerCommand'](pluginData[_0x26bacd(0x434)],_0x26bacd(0x3f5),_0xd099f3=>{const _0x3efb1f=_0x26bacd;VisuMZ[_0x3efb1f(0x164)](_0xd099f3,_0xd099f3);const _0x1b0b3d=!_0xd099f3[_0x3efb1f(0x3b9)];$gameSystem[_0x3efb1f(0x693)](_0x1b0b3d);}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x196),_0xdab69=>{const _0x50cc4a=_0x26bacd;VisuMZ[_0x50cc4a(0x164)](_0xdab69,_0xdab69);const _0x399879=(_0xdab69[_0x50cc4a(0x29b)]||0x0)-0x1,_0x3d6a9e=!_0xdab69['Chase'],_0x2fab68=$gamePlayer['followers']()[_0x50cc4a(0x398)](_0x399879);if(_0x2fab68)_0x2fab68[_0x50cc4a(0x3c9)](_0x3d6a9e);}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x29e),_0x71a341=>{const _0x13132c=_0x26bacd;VisuMZ[_0x13132c(0x164)](_0x71a341,_0x71a341);const _0x5dae15=_0x71a341[_0x13132c(0x29b)];$gameSystem[_0x13132c(0x371)](_0x5dae15);}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x5ee),_0x1ec267=>{const _0x36f92a=_0x26bacd;VisuMZ[_0x36f92a(0x164)](_0x1ec267,_0x1ec267),$gameSystem[_0x36f92a(0x371)](0x0),$gameSystem[_0x36f92a(0x693)](![]);for(const _0x3f7624 of $gamePlayer[_0x36f92a(0x3b7)]()[_0x36f92a(0x17a)]){if(_0x36f92a(0x667)!==_0x36f92a(0x55a)){if(_0x3f7624)_0x3f7624[_0x36f92a(0x3c9)](![]);}else{_0xcd84c2[_0x36f92a(0x2b9)][_0x36f92a(0x268)][_0x36f92a(0x1a2)](this,_0x495bcd);if(_0x404fa0>=0x3e8){const _0x407e34=this[_0x36f92a(0x3b5)](_0x20fb8b);if(_0x407e34)_0x407e34[_0x36f92a(0x187)]();}}}}),PluginManager['registerCommand'](pluginData[_0x26bacd(0x434)],_0x26bacd(0x1a5),_0x5147da=>{const _0x62209e=_0x26bacd;VisuMZ['ConvertParams'](_0x5147da,_0x5147da);const _0xc87db6=$gameTemp[_0x62209e(0x2fb)]();_0x5147da[_0x62209e(0x2fe)]=_0x5147da[_0x62209e(0x2fe)]||$gameMap[_0x62209e(0x362)]();const _0x4dd46c=[_0x5147da['MapId'],_0x5147da[_0x62209e(0x20c)]||_0xc87db6['eventId'](),_0x5147da[_0x62209e(0x47f)]],_0xdc788a=_0x5147da[_0x62209e(0x46b)],_0x10a8de=$gameSelfSwitches[_0x62209e(0x267)](_0x4dd46c)||![];$gameSwitches[_0x62209e(0x688)](_0xdc788a,_0x10a8de);}),PluginManager[_0x26bacd(0x417)](pluginData['name'],_0x26bacd(0x3b0),_0x38422f=>{const _0x1093af=_0x26bacd;VisuMZ['ConvertParams'](_0x38422f,_0x38422f);const _0x3712b3=$gameTemp[_0x1093af(0x2fb)]();_0x38422f[_0x1093af(0x2fe)]=_0x38422f[_0x1093af(0x2fe)]||$gameMap[_0x1093af(0x362)]();const _0x1b271c=[_0x38422f[_0x1093af(0x2fe)],_0x38422f[_0x1093af(0x20c)]||_0x3712b3[_0x1093af(0x18a)](),_0x1093af(0x3cf)[_0x1093af(0x389)](_0x38422f[_0x1093af(0x435)])],_0x5a1a0c=_0x38422f[_0x1093af(0x46b)],_0x4b4287=$gameSelfSwitches[_0x1093af(0x267)](_0x1b271c)||![];$gameSwitches[_0x1093af(0x688)](_0x5a1a0c,_0x4b4287);}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x1f5),_0x3ee34c=>{const _0x792e49=_0x26bacd;VisuMZ[_0x792e49(0x164)](_0x3ee34c,_0x3ee34c);const _0xf8a793=$gameTemp[_0x792e49(0x2fb)]();_0x3ee34c[_0x792e49(0x2fe)]=_0x3ee34c['MapId']||$gameMap[_0x792e49(0x362)]();const _0x15c480=[_0x3ee34c[_0x792e49(0x2fe)],_0x3ee34c[_0x792e49(0x20c)]||_0xf8a793['eventId'](),'Self\x20Variable\x20%1'[_0x792e49(0x389)](_0x3ee34c['VariableId'])],_0x326df4=_0x3ee34c[_0x792e49(0x369)],_0x196e9c=$gameSelfSwitches[_0x792e49(0x267)](_0x15c480)||![];$gameVariables[_0x792e49(0x688)](_0x326df4,_0x196e9c);}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x332),_0x29e3e8=>{const _0x3c7f64=_0x26bacd;VisuMZ[_0x3c7f64(0x164)](_0x29e3e8,_0x29e3e8);if(!$gameMap)return;const _0x1efce8=$gameTemp[_0x3c7f64(0x2fb)](),_0xdf8a64=_0x29e3e8['Step2Preserve'];_0x29e3e8[_0x3c7f64(0x527)]=_0x29e3e8[_0x3c7f64(0x527)]||$gameMap[_0x3c7f64(0x362)](),_0x29e3e8[_0x3c7f64(0x498)]=_0x29e3e8['Step2MapId']||$gameMap[_0x3c7f64(0x362)](),_0x29e3e8[_0x3c7f64(0x1c5)]=_0x29e3e8[_0x3c7f64(0x1c5)][_0x3c7f64(0x68e)]()[_0x3c7f64(0x5fa)]();if(!_0xdf8a64&&_0x29e3e8[_0x3c7f64(0x527)]!==$gameMap[_0x3c7f64(0x362)]())return;if($gameMap['mapId']()===_0x29e3e8[_0x3c7f64(0x527)]){if('MoMFh'===_0x3c7f64(0x2e8))return _0x40771[_0x3c7f64(0x492)](),!![];else{const _0x10761d=$gameMap[_0x3c7f64(0x3b5)](_0x29e3e8[_0x3c7f64(0x5bf)]||_0x1efce8[_0x3c7f64(0x18a)]());if(!_0x10761d)return;if(_0x29e3e8['TemplateName']!==_0x3c7f64(0x44d)){if(_0x3c7f64(0x167)!=='tNsNg')_0x10761d[_0x3c7f64(0x618)](_0x29e3e8[_0x3c7f64(0x1c5)]);else{const _0x36ee79=this[_0x3c7f64(0x328)](this[_0x3c7f64(0x636)]());return _0x340d31['roundXWithDirection'](this['x'],_0x36ee79);}}else{if(_0x3c7f64(0x2a0)!==_0x3c7f64(0x2a0)){if(_0x198f9c['areFollowersForceShown']())return!![];if(_0x5ba3b5['areFollowersForceHidden']())return![];return _0x4ff5f1[_0x3c7f64(0x2b9)][_0x3c7f64(0x250)]['call'](this);}else _0x10761d['morphInto'](_0x29e3e8[_0x3c7f64(0x498)],_0x29e3e8[_0x3c7f64(0x465)]||_0x1efce8[_0x3c7f64(0x18a)]());}}}_0xdf8a64&&$gameSystem['savePreservedMorphEventDataKey'](_0x29e3e8[_0x3c7f64(0x527)],_0x29e3e8[_0x3c7f64(0x5bf)],_0x29e3e8[_0x3c7f64(0x1c5)],_0x29e3e8[_0x3c7f64(0x498)],_0x29e3e8['Step2EventId']);}),PluginManager['registerCommand'](pluginData[_0x26bacd(0x434)],_0x26bacd(0x4bd),_0x190a69=>{const _0xb7908c=_0x26bacd;VisuMZ['ConvertParams'](_0x190a69,_0x190a69);if(!$gameMap)return;const _0x3d0224=$gameTemp['getLastPluginCommandInterpreter']();_0x190a69[_0xb7908c(0x2fe)]=_0x190a69[_0xb7908c(0x2fe)]||$gameMap['mapId']();if($gameMap['mapId']()===_0x190a69[_0xb7908c(0x2fe)]){const _0x48005a=$gameMap[_0xb7908c(0x3b5)](_0x190a69[_0xb7908c(0x20c)]||_0x3d0224['eventId']());_0x48005a[_0xb7908c(0x558)]();}_0x190a69[_0xb7908c(0x350)]&&$gameSystem[_0xb7908c(0x19c)](_0x190a69[_0xb7908c(0x2fe)],_0x190a69[_0xb7908c(0x20c)]||_0x3d0224[_0xb7908c(0x18a)]());}),PluginManager[_0x26bacd(0x417)](pluginData['name'],_0x26bacd(0x436),_0x1351ba=>{const _0x263a56=_0x26bacd;VisuMZ[_0x263a56(0x164)](_0x1351ba,_0x1351ba),$gameSystem[_0x263a56(0x682)]($gamePlayer,_0x1351ba[_0x263a56(0x296)],_0x1351ba['IconBufferX'],_0x1351ba[_0x263a56(0x171)],_0x1351ba[_0x263a56(0x225)]);}),PluginManager['registerCommand'](pluginData[_0x26bacd(0x434)],_0x26bacd(0x4fb),_0x346c6b=>{const _0x449ba1=_0x26bacd;VisuMZ[_0x449ba1(0x164)](_0x346c6b,_0x346c6b),$gameSystem[_0x449ba1(0x57d)]($gamePlayer);}),PluginManager[_0x26bacd(0x417)](pluginData['name'],_0x26bacd(0x266),_0xa440d1=>{const _0x42aba0=_0x26bacd;VisuMZ[_0x42aba0(0x164)](_0xa440d1,_0xa440d1),$gameSystem[_0x42aba0(0x201)](!_0xa440d1[_0x42aba0(0x278)]);}),PluginManager['registerCommand'](pluginData[_0x26bacd(0x434)],_0x26bacd(0x27e),_0x576c81=>{const _0x318e59=_0x26bacd;VisuMZ[_0x318e59(0x164)](_0x576c81,_0x576c81),$gameSystem[_0x318e59(0x24c)](_0x576c81['Setting']);}),PluginManager[_0x26bacd(0x417)](pluginData['name'],_0x26bacd(0x61f),_0x427b8c=>{VisuMZ['ConvertParams'](_0x427b8c,_0x427b8c);const _0x444800=_0x427b8c['MapId']||$gameMap['mapId']();$gameSelfSwitches['resetSelfSwitchesForMap'](_0x444800);}),PluginManager['registerCommand'](pluginData[_0x26bacd(0x434)],_0x26bacd(0x1be),_0x58eb48=>{const _0x4f5992=_0x26bacd;VisuMZ[_0x4f5992(0x164)](_0x58eb48,_0x58eb48);const _0x169d35=$gameTemp[_0x4f5992(0x2fb)]();_0x58eb48[_0x4f5992(0x2fe)]=_0x58eb48[_0x4f5992(0x2fe)]||$gameMap[_0x4f5992(0x362)]();const _0x5874e4=[_0x58eb48['MapId'],_0x58eb48[_0x4f5992(0x20c)]||_0x169d35['eventId'](),_0x58eb48[_0x4f5992(0x47f)]];switch(_0x58eb48['Value']){case'ON':$gameSelfSwitches['setValue'](_0x5874e4,!![]);break;case _0x4f5992(0x28b):$gameSelfSwitches[_0x4f5992(0x688)](_0x5874e4,![]);break;case _0x4f5992(0x4ca):$gameSelfSwitches[_0x4f5992(0x688)](_0x5874e4,!$gameSelfSwitches['value'](_0x5874e4));break;}}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x311),_0x5426f4=>{const _0x5796a2=_0x26bacd;VisuMZ[_0x5796a2(0x164)](_0x5426f4,_0x5426f4);const _0x2f9cc9=$gameTemp[_0x5796a2(0x2fb)]();_0x5426f4[_0x5796a2(0x2fe)]=_0x5426f4[_0x5796a2(0x2fe)]||$gameMap[_0x5796a2(0x362)]();const _0x22ad27=[_0x5426f4[_0x5796a2(0x2fe)],_0x5426f4[_0x5796a2(0x20c)]||_0x2f9cc9['eventId'](),_0x5796a2(0x3cf)[_0x5796a2(0x389)](_0x5426f4[_0x5796a2(0x435)])];switch(_0x5426f4[_0x5796a2(0x25d)]){case'ON':$gameSelfSwitches[_0x5796a2(0x688)](_0x22ad27,!![]);break;case _0x5796a2(0x28b):$gameSelfSwitches[_0x5796a2(0x688)](_0x22ad27,![]);break;case'Toggle':$gameSelfSwitches['setValue'](_0x22ad27,!$gameSelfSwitches[_0x5796a2(0x267)](_0x22ad27));break;}}),PluginManager[_0x26bacd(0x417)](pluginData['name'],_0x26bacd(0x4af),_0x199dbc=>{const _0x49ba54=_0x26bacd;VisuMZ[_0x49ba54(0x164)](_0x199dbc,_0x199dbc);const _0x1d1a3f=$gameTemp[_0x49ba54(0x2fb)]();_0x199dbc[_0x49ba54(0x2fe)]=_0x199dbc[_0x49ba54(0x2fe)]||$gameMap[_0x49ba54(0x362)]();const _0x35c239=[_0x199dbc[_0x49ba54(0x2fe)],_0x199dbc[_0x49ba54(0x20c)]||_0x1d1a3f[_0x49ba54(0x18a)](),_0x49ba54(0x60c)['format'](_0x199dbc[_0x49ba54(0x1de)])],_0x36c56e=VisuMZ[_0x49ba54(0x4c1)]($gameSelfSwitches[_0x49ba54(0x267)](_0x35c239),_0x199dbc['Value'],_0x199dbc[_0x49ba54(0x582)]);$gameSelfSwitches[_0x49ba54(0x688)](_0x35c239,_0x36c56e);}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x44a),_0x450d69=>{const _0x1fac4d=_0x26bacd;VisuMZ[_0x1fac4d(0x164)](_0x450d69,_0x450d69);const _0x4ff9b0=$gameTemp[_0x1fac4d(0x2fb)](),_0x40c948={'template':_0x450d69[_0x1fac4d(0x1c5)],'mapId':_0x450d69[_0x1fac4d(0x2fe)]||$gameMap[_0x1fac4d(0x362)](),'eventId':_0x450d69[_0x1fac4d(0x20c)]||_0x4ff9b0['eventId'](),'x':_0x450d69[_0x1fac4d(0x3e8)],'y':_0x450d69[_0x1fac4d(0x236)],'spawnPreserved':_0x450d69[_0x1fac4d(0x2a8)],'spawnEventId':$gameMap[_0x1fac4d(0x39f)]['length']+0x3e8},_0x13e33e=_0x450d69['SuccessSwitchId']||0x0;if(!VisuMZ[_0x1fac4d(0x1b5)][_0x40c948[_0x1fac4d(0x362)]]&&_0x40c948[_0x1fac4d(0x362)]!==$gameMap['mapId']()){let _0xa79bb5='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'['format'](_0x40c948[_0x1fac4d(0x362)]);_0xa79bb5+=_0x1fac4d(0x4d8),_0xa79bb5+=_0x1fac4d(0x22e),_0xa79bb5+=_0x1fac4d(0x248),_0xa79bb5+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'[_0x1fac4d(0x389)](_0x40c948[_0x1fac4d(0x362)]),alert(_0xa79bb5);return;}const _0x1cce5f=$gameMap[_0x1fac4d(0x624)](_0x40c948,_0x450d69[_0x1fac4d(0x2be)],_0x450d69[_0x1fac4d(0x625)]);_0x13e33e&&$gameSwitches[_0x1fac4d(0x688)](_0x13e33e,!!_0x1cce5f);}),PluginManager['registerCommand'](pluginData[_0x26bacd(0x434)],'SpawnEventAtRegion',_0x3a3001=>{const _0x6aca7e=_0x26bacd;VisuMZ['ConvertParams'](_0x3a3001,_0x3a3001);const _0x5b1bc5=$gameTemp['getLastPluginCommandInterpreter'](),_0x473d34={'template':_0x3a3001[_0x6aca7e(0x1c5)],'mapId':_0x3a3001[_0x6aca7e(0x2fe)]||$gameMap['mapId'](),'eventId':_0x3a3001['EventId']||_0x5b1bc5[_0x6aca7e(0x18a)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x3a3001['Preserve'],'spawnEventId':$gameMap[_0x6aca7e(0x39f)][_0x6aca7e(0x52a)]+0x3e8},_0x47e97d=_0x3a3001[_0x6aca7e(0x2a4)]||0x0;if(!VisuMZ[_0x6aca7e(0x1b5)][_0x473d34['mapId']]&&_0x473d34[_0x6aca7e(0x362)]!==$gameMap[_0x6aca7e(0x362)]()){if('loUVb'!==_0x6aca7e(0x47a))return this[_0x6aca7e(0x303)]()?0x4:0x2;else{let _0x579eae=_0x6aca7e(0x17b)[_0x6aca7e(0x389)](_0x473d34[_0x6aca7e(0x362)]);_0x579eae+=_0x6aca7e(0x4d8),_0x579eae+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x579eae+=_0x6aca7e(0x248),_0x579eae+=_0x6aca7e(0x694)['format'](_0x473d34[_0x6aca7e(0x362)]),alert(_0x579eae);return;}}const _0x3cf939=$gameMap[_0x6aca7e(0x4c3)](_0x473d34,_0x3a3001[_0x6aca7e(0x272)],_0x3a3001[_0x6aca7e(0x2be)],_0x3a3001[_0x6aca7e(0x625)]);_0x47e97d&&$gameSwitches[_0x6aca7e(0x688)](_0x47e97d,!!_0x3cf939);}),PluginManager['registerCommand'](pluginData['name'],_0x26bacd(0x493),_0x55fbfe=>{const _0x31a886=_0x26bacd;VisuMZ[_0x31a886(0x164)](_0x55fbfe,_0x55fbfe);const _0x4d4676=$gameTemp[_0x31a886(0x2fb)](),_0x420f07={'template':_0x55fbfe[_0x31a886(0x1c5)],'mapId':_0x55fbfe['MapId']||$gameMap['mapId'](),'eventId':_0x55fbfe['EventId']||_0x4d4676[_0x31a886(0x18a)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x55fbfe[_0x31a886(0x2a8)],'spawnEventId':$gameMap[_0x31a886(0x39f)][_0x31a886(0x52a)]+0x3e8},_0x4c37dd=_0x55fbfe[_0x31a886(0x2a4)]||0x0;if(!VisuMZ[_0x31a886(0x1b5)][_0x420f07[_0x31a886(0x362)]]&&_0x420f07[_0x31a886(0x362)]!==$gameMap['mapId']()){let _0x5104cb=_0x31a886(0x17b)[_0x31a886(0x389)](_0x420f07[_0x31a886(0x362)]);_0x5104cb+=_0x31a886(0x4d8),_0x5104cb+=_0x31a886(0x22e),_0x5104cb+=_0x31a886(0x248),_0x5104cb+=_0x31a886(0x694)[_0x31a886(0x389)](_0x420f07['mapId']),alert(_0x5104cb);return;}const _0xbede0d=$gameMap[_0x31a886(0x460)](_0x420f07,_0x55fbfe[_0x31a886(0x207)],_0x55fbfe[_0x31a886(0x2be)],_0x55fbfe[_0x31a886(0x625)]);_0x4c37dd&&$gameSwitches['setValue'](_0x4c37dd,!!_0xbede0d);}),PluginManager['registerCommand'](pluginData[_0x26bacd(0x434)],_0x26bacd(0x1f9),_0xec0cae=>{const _0x24399f=_0x26bacd;VisuMZ[_0x24399f(0x164)](_0xec0cae,_0xec0cae);const _0xbbc19e=$gameTemp[_0x24399f(0x2fb)]();$gameMap[_0x24399f(0x3b1)](_0xec0cae['EventID']||_0xbbc19e[_0x24399f(0x18a)]());}),PluginManager[_0x26bacd(0x417)](pluginData['name'],_0x26bacd(0x2ee),_0x4254e3=>{const _0x1e8383=_0x26bacd;VisuMZ['ConvertParams'](_0x4254e3,_0x4254e3);const _0x5e1b95=_0x4254e3[_0x1e8383(0x3e8)],_0x5a4206=_0x4254e3[_0x1e8383(0x236)];$gameMap[_0x1e8383(0x26c)](_0x5e1b95,_0x5a4206);}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x3ef),_0x82728d=>{const _0x5a2f44=_0x26bacd;VisuMZ[_0x5a2f44(0x164)](_0x82728d,_0x82728d),$gameMap[_0x5a2f44(0x274)](_0x82728d[_0x5a2f44(0x272)]);}),PluginManager['registerCommand'](pluginData[_0x26bacd(0x434)],'SpawnEventDespawnTerrainTags',_0x3d5565=>{const _0x465c9f=_0x26bacd;VisuMZ[_0x465c9f(0x164)](_0x3d5565,_0x3d5565),$gameMap[_0x465c9f(0x681)](_0x3d5565[_0x465c9f(0x207)]);}),PluginManager[_0x26bacd(0x417)](pluginData[_0x26bacd(0x434)],_0x26bacd(0x55c),_0x542e62=>{const _0x8ba8f=_0x26bacd;VisuMZ[_0x8ba8f(0x164)](_0x542e62,_0x542e62),$gameMap[_0x8ba8f(0x16b)]();}),VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x642)]=Scene_Boot['prototype'][_0x26bacd(0x583)],Scene_Boot['prototype'][_0x26bacd(0x583)]=function(){const _0x40b701=_0x26bacd;VisuMZ[_0x40b701(0x2b9)][_0x40b701(0x642)][_0x40b701(0x1a2)](this),this['process_VisuMZ_EventsMoveCore_LoadTemplateMaps'](),this[_0x40b701(0x611)]();if(VisuMZ[_0x40b701(0x2b9)]['CustomPageConditions'])VisuMZ[_0x40b701(0x2b9)]['CustomPageConditions'][_0x40b701(0x247)]();},VisuMZ['PreloadedMaps']=[],VisuMZ['EventTemplates']={},Scene_Boot['prototype'][_0x26bacd(0x48b)]=function(){const _0x14d386=_0x26bacd;if(DataManager['isBattleTest']()||DataManager[_0x14d386(0x19a)]())return;const _0x1abec9=VisuMZ['EventsMoveCore'][_0x14d386(0x3b3)]['Template'],_0xf28244=_0x1abec9[_0x14d386(0x231)][_0x14d386(0x680)](0x0);for(const _0x554e50 of _0x1abec9[_0x14d386(0x49a)]){if(_0x14d386(0x2bb)===_0x14d386(0x594))this[_0x14d386(0x20d)]=_0x4db4ce;else{_0x554e50[_0x14d386(0x206)]=_0x554e50['Name'][_0x14d386(0x68e)]()['trim'](),VisuMZ['EventTemplates'][_0x554e50[_0x14d386(0x206)]]=_0x554e50;if(!_0xf28244[_0x14d386(0x18c)](_0x554e50[_0x14d386(0x1ba)]))_0xf28244[_0x14d386(0x496)](_0x554e50[_0x14d386(0x1ba)]);}}for(const _0xb44261 of _0xf28244){if(_0x14d386(0x294)!==_0x14d386(0x294))_0x3dcd58['EventsMoveCore'][_0x14d386(0x5c5)][_0x14d386(0x1a2)](this),this['updateSaveEventLocation']();else{if(VisuMZ[_0x14d386(0x1b5)][_0xb44261])continue;const _0x39d874='Map%1.json'['format'](_0xb44261[_0x14d386(0x20f)](0x3)),_0x57fd28=_0x14d386(0x471)['format'](_0xb44261);DataManager[_0x14d386(0x478)](_0x57fd28,_0x39d874),setTimeout(this[_0x14d386(0x31f)][_0x14d386(0x5b2)](this,_0xb44261,_0x57fd28),0x64);}}},Scene_Boot[_0x26bacd(0x42f)][_0x26bacd(0x31f)]=function(_0x5a9d38,_0x7b7182){const _0x3a836d=_0x26bacd;window[_0x7b7182]?(VisuMZ['PreloadedMaps'][_0x5a9d38]=window[_0x7b7182],window[_0x7b7182]=undefined):setTimeout(this[_0x3a836d(0x31f)][_0x3a836d(0x5b2)](this,_0x5a9d38,_0x7b7182),0x64);},VisuMZ[_0x26bacd(0x67c)]=[],VisuMZ[_0x26bacd(0x42b)]=[],VisuMZ[_0x26bacd(0x2f0)]=[],VisuMZ[_0x26bacd(0x1c3)]=[],VisuMZ[_0x26bacd(0x28a)]=[],VisuMZ[_0x26bacd(0x54a)]=[],Scene_Boot[_0x26bacd(0x42f)]['process_VisuMZ_EventsMoveCore_Switches_Variables']=function(){const _0xe93200=_0x26bacd;for(let _0x5cf05=0x1;_0x5cf05<$dataSystem[_0xe93200(0x301)]['length'];_0x5cf05++){if($dataSystem[_0xe93200(0x301)][_0x5cf05][_0xe93200(0x224)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0xe93200(0x67c)]['push'](_0x5cf05);if($dataSystem[_0xe93200(0x301)][_0x5cf05][_0xe93200(0x224)](/<SELF>/i))VisuMZ[_0xe93200(0x42b)][_0xe93200(0x496)](_0x5cf05);if($dataSystem[_0xe93200(0x301)][_0x5cf05]['match'](/<MAP>/i))VisuMZ['MapSwitches'][_0xe93200(0x496)](_0x5cf05);}for(let _0x5bfc6a=0x1;_0x5bfc6a<$dataSystem[_0xe93200(0x589)]['length'];_0x5bfc6a++){if($dataSystem[_0xe93200(0x589)][_0x5bfc6a]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0xe93200(0x1c3)][_0xe93200(0x496)](_0x5bfc6a);if($dataSystem[_0xe93200(0x589)][_0x5bfc6a][_0xe93200(0x224)](/<SELF>/i))VisuMZ['SelfVariables']['push'](_0x5bfc6a);if($dataSystem[_0xe93200(0x589)][_0x5bfc6a]['match'](/<MAP>/i))VisuMZ[_0xe93200(0x54a)][_0xe93200(0x496)](_0x5bfc6a);}},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x158)]={},VisuMZ[_0x26bacd(0x2b9)]['CustomPageConditions'][_0x26bacd(0x247)]=function(){const _0x352c6d=_0x26bacd;this[_0x352c6d(0x5a1)]=new Game_CPCInterpreter(),this['determineCommonEventsWithCPC']();},VisuMZ['EventsMoveCore']['CustomPageConditions']['determineCommonEventsWithCPC']=function(){const _0x574a83=_0x26bacd;this[_0x574a83(0x580)]=[];for(const _0x2283fc of $dataCommonEvents){if(_0x574a83(0x5f6)===_0x574a83(0x5f6)){if(!_0x2283fc)continue;VisuMZ[_0x574a83(0x2b9)][_0x574a83(0x158)][_0x574a83(0x669)](_0x2283fc);if(_0x2283fc['CPC']['length']>0x0)this[_0x574a83(0x580)][_0x574a83(0x496)](_0x2283fc['id']);}else this[_0x574a83(0x1c1)]=_0x37fbdc(_0x3be39b['$1']);}},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x158)][_0x26bacd(0x5a7)]=function(_0x86d15,_0x232258,_0x45d8a8){const _0x518d26=_0x26bacd;return this[_0x518d26(0x5a1)]['setup'](_0x86d15,_0x232258),_0x45d8a8?this[_0x518d26(0x5a1)][_0x518d26(0x353)](_0x45d8a8):this[_0x518d26(0x5a1)]['execute'](),this[_0x518d26(0x5a1)][_0x518d26(0x5e9)];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x158)][_0x26bacd(0x669)]=function(_0x156b45){const _0x3e6e53=_0x26bacd;let _0x3e314e=![];_0x156b45['CPC']=[];for(const _0x560348 of _0x156b45['list']){if(_0x3e6e53(0x638)===_0x3e6e53(0x63e))this['_shadowSprite']['z']=0x0;else{if([0x6c,0x198][_0x3e6e53(0x18c)](_0x560348[_0x3e6e53(0x62f)])){if(_0x3e6e53(0x4aa)===_0x3e6e53(0x4aa)){const _0x1fe86e=_0x560348[_0x3e6e53(0x27c)][0x0];if(_0x1fe86e[_0x3e6e53(0x224)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x3e6e53(0x2bf)===_0x3e6e53(0x4ac)?this[_0x3e6e53(0x450)](_0x3e6e53(0x666)):_0x3e314e=!![];else _0x1fe86e[_0x3e6e53(0x224)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x3e314e=![]);}else{const _0x33ce8d=_0x5a86ac['GetMoveSynchTarget'](this[_0x3e6e53(0x16f)]());this[_0x3e6e53(0x34e)](_0x33ce8d);}}if(_0x3e314e){if('Keiro'!=='JIyAu')_0x156b45['CPC'][_0x3e6e53(0x496)](_0x560348);else{if(this[_0x3e6e53(0x360)]()){const _0x46d062=['',_0x3e6e53(0x62e),_0x3e6e53(0x36f),_0x3e6e53(0x5ae),_0x3e6e53(0x614),_0x3e6e53(0x61a),_0x3e6e53(0x21f),'COBWEB',_0x3e6e53(0x15d),_0x3e6e53(0x531),_0x3e6e53(0x38e),'','','','',''][_0x2a9261];this['setPose'](_0x46d062,_0x1d9ddd);}}}}}},getSelfSwitchValue=function(_0x356025,_0x57528b,_0x786335){const _0x7108d3=_0x26bacd;let _0x5778b4=[_0x356025,_0x57528b,_0x7108d3(0x3cf)[_0x7108d3(0x389)](_0x786335)];return typeof _0x786335===_0x7108d3(0x1f2)&&(_0x5778b4=[_0x356025,_0x57528b,_0x786335[_0x7108d3(0x68e)]()[_0x7108d3(0x5fa)]()]),$gameSelfSwitches[_0x7108d3(0x267)](_0x5778b4);},getMapSwitchValue=function(_0x1a9b1a,_0xfbf909){const _0x35af1f=_0x26bacd;let _0x4318d6=[0x0,0x0,_0x35af1f(0x58b)[_0x35af1f(0x389)](_0x1a9b1a,_0xfbf909)];return $gameSelfSwitches[_0x35af1f(0x267)](_0x4318d6);},getMapVariableValue=function(_0x3d8c95,_0x472075){const _0x3b73e0=_0x26bacd;let _0x1dc785=[0x0,0x0,_0x3b73e0(0x313)['format'](_0x3d8c95,_0x472075)];return $gameSelfSwitches['value'](_0x1dc785);},getSelfVariableValue=function(_0x5bdc6e,_0xb179c3,_0xaeed82){const _0x2b78cb=_0x26bacd,_0x45c579=[_0x5bdc6e,_0xb179c3,_0x2b78cb(0x60c)['format'](_0xaeed82)];return $gameSelfSwitches['value'](_0x45c579);},setSelfSwitchValue=function(_0x443d9d,_0x5dae0d,_0x57d459,_0x9dc7b1){const _0x1895d0=_0x26bacd;let _0x4abb34=[_0x443d9d,_0x5dae0d,'Self\x20Switch\x20%1'['format'](_0x57d459)];typeof _0x57d459==='string'&&(_0x4abb34=[_0x443d9d,_0x5dae0d,_0x57d459[_0x1895d0(0x68e)]()[_0x1895d0(0x5fa)]()]),$gameSelfSwitches[_0x1895d0(0x688)](_0x4abb34,_0x9dc7b1);},setSelfVariableValue=function(_0x57b5af,_0x43c64d,_0x4cf310,_0x5588d2){const _0x5f5d46=_0x26bacd,_0x1bb525=[_0x57b5af,_0x43c64d,_0x5f5d46(0x60c)[_0x5f5d46(0x389)](_0x4cf310)];$gameSelfSwitches[_0x5f5d46(0x688)](_0x1bb525,_0x5588d2);},setMapSwitchValue=function(_0x5685fa,_0x4b5475,_0x559aab){const _0x494fd4=_0x26bacd;let _0x586b5f=[0x0,0x0,_0x494fd4(0x58b)[_0x494fd4(0x389)](_0x5685fa,_0x4b5475)];$gameSelfSwitches[_0x494fd4(0x688)](_0x586b5f,_0x559aab);},setMapVariableValue=function(_0x27e225,_0x4849d0,_0x5c65d6){const _0x3b9880=_0x26bacd;let _0x7763f=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x3b9880(0x389)](_0x27e225,_0x4849d0)];$gameSelfSwitches[_0x3b9880(0x688)](_0x7763f,_0x5c65d6);},DataManager[_0x26bacd(0x65d)]=function(_0x46f0c8){const _0x5b3793=_0x26bacd;if(SceneManager[_0x5b3793(0x319)][_0x5b3793(0x1ea)]===Scene_Debug)return![];return VisuMZ[_0x5b3793(0x67c)]['includes'](_0x46f0c8);},DataManager[_0x26bacd(0x17d)]=function(_0x4dd003){const _0x1651d1=_0x26bacd;if(SceneManager[_0x1651d1(0x319)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x1651d1(0x1c3)][_0x1651d1(0x18c)](_0x4dd003);},DataManager[_0x26bacd(0x4d4)]=function(_0x584592){const _0x387e35=_0x26bacd;if(SceneManager[_0x387e35(0x319)][_0x387e35(0x1ea)]===Scene_Debug)return![];return VisuMZ[_0x387e35(0x42b)][_0x387e35(0x18c)](_0x584592);},DataManager['isSelfVariable']=function(_0x4ae71f){const _0x3b8509=_0x26bacd;if(SceneManager[_0x3b8509(0x319)][_0x3b8509(0x1ea)]===Scene_Debug)return![];return VisuMZ[_0x3b8509(0x28a)][_0x3b8509(0x18c)](_0x4ae71f);},DataManager[_0x26bacd(0x2d2)]=function(_0x3f6b6e){const _0x25e9c4=_0x26bacd;if(BattleManager[_0x25e9c4(0x64c)]())return![];return VisuMZ['MapSwitches']['includes'](_0x3f6b6e);},DataManager['isMapVariable']=function(_0x71fda6){const _0x571b62=_0x26bacd;if(BattleManager[_0x571b62(0x64c)]())return![];return VisuMZ['MapVariables'][_0x571b62(0x18c)](_0x71fda6);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x424)]=Game_Temp[_0x26bacd(0x42f)][_0x26bacd(0x523)],Game_Temp[_0x26bacd(0x42f)]['setDestination']=function(_0x117446,_0x3ae72f){const _0x501d1a=_0x26bacd;if(this['isEventClickTriggered'](_0x117446,_0x3ae72f))return;VisuMZ[_0x501d1a(0x2b9)]['Game_Temp_setDestination']['call'](this,_0x117446,_0x3ae72f);},Game_Temp[_0x26bacd(0x42f)]['isEventClickTriggered']=function(_0xb11c76,_0x38bdfa){const _0x1bbea8=_0x26bacd,_0x30b4a5=$gameMap[_0x1bbea8(0x3f9)](_0xb11c76,_0x38bdfa);for(const _0xe932b8 of _0x30b4a5){if(_0xe932b8&&_0xe932b8[_0x1bbea8(0x14d)]()){if('xhEHh'===_0x1bbea8(0x21b))return _0xe932b8['onClickTrigger'](),!![];else this[_0x1bbea8(0x467)]['scale']['x']=_0x5d6c96[_0x1bbea8(0x24b)](0x0,this[_0x1bbea8(0x467)][_0x1bbea8(0x45d)]['x']-0.1),this[_0x1bbea8(0x467)][_0x1bbea8(0x45d)]['y']=_0x4220ce[_0x1bbea8(0x24b)](0x0,this[_0x1bbea8(0x467)]['scale']['y']-0.1);}}return TouchInput[_0x1bbea8(0x2b8)]()&&_0x30b4a5['length']>0x0&&TouchInput[_0x1bbea8(0x487)](),![];},Game_Temp[_0x26bacd(0x42f)][_0x26bacd(0x3fe)]=function(_0x235398){const _0x5abbfc=_0x26bacd;this[_0x5abbfc(0x1b3)]=_0x235398;},Game_Temp['prototype']['getLastPluginCommandInterpreter']=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp[_0x26bacd(0x42f)]['registerSelfTarget']=function(_0x5acfa4){const _0x3e4c29=_0x26bacd;this[_0x3e4c29(0x20d)]=_0x5acfa4;},Game_Temp[_0x26bacd(0x42f)][_0x26bacd(0x419)]=function(){const _0x10d31c=_0x26bacd;this[_0x10d31c(0x20d)]=undefined;},Game_Temp['prototype'][_0x26bacd(0x43b)]=function(){const _0xd534c4=_0x26bacd;return this[_0xd534c4(0x20d)];},VisuMZ[_0x26bacd(0x2b9)]['Game_System_initialize']=Game_System[_0x26bacd(0x42f)][_0x26bacd(0x247)],Game_System[_0x26bacd(0x42f)][_0x26bacd(0x247)]=function(){const _0x1dcc81=_0x26bacd;VisuMZ[_0x1dcc81(0x2b9)]['Game_System_initialize'][_0x1dcc81(0x1a2)](this),this[_0x1dcc81(0x376)](),this[_0x1dcc81(0x172)]();},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x376)]=function(){const _0x43b0d8=_0x26bacd;this[_0x43b0d8(0x168)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x43b0d8(0x5da)]={},this[_0x43b0d8(0x64e)]=[],this[_0x43b0d8(0x619)]={},this[_0x43b0d8(0x5ff)]={},this[_0x43b0d8(0x4b8)]=![],this[_0x43b0d8(0x273)]=_0x43b0d8(0x572);},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x2a9)]=function(){const _0x5749e4=_0x26bacd;if(this[_0x5749e4(0x168)]===undefined)this[_0x5749e4(0x376)]();if(this[_0x5749e4(0x168)][_0x5749e4(0x3d6)]===undefined)this['initEventsMoveCore']();return this[_0x5749e4(0x168)][_0x5749e4(0x3d6)];},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x5a8)]=function(_0x367721){const _0x514bfc=_0x26bacd;if(this[_0x514bfc(0x168)]===undefined)this[_0x514bfc(0x376)]();if(this[_0x514bfc(0x168)][_0x514bfc(0x3d6)]===undefined)this['initEventsMoveCore']();this[_0x514bfc(0x168)][_0x514bfc(0x3d6)]=_0x367721;},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x675)]=function(){const _0x18f81a=_0x26bacd;if(this[_0x18f81a(0x168)]===undefined)this[_0x18f81a(0x376)]();if(this[_0x18f81a(0x168)][_0x18f81a(0x41c)]===undefined)this[_0x18f81a(0x376)]();return this[_0x18f81a(0x168)][_0x18f81a(0x41c)];},Game_System['prototype'][_0x26bacd(0x661)]=function(_0x115b0b){const _0x54a8a0=_0x26bacd;if(this[_0x54a8a0(0x168)]===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x54a8a0(0x41c)]===undefined)this[_0x54a8a0(0x376)]();this[_0x54a8a0(0x168)]['EventAutoMovement']=_0x115b0b;},Game_System['prototype'][_0x26bacd(0x2ca)]=function(){const _0x492180=_0x26bacd;if(this[_0x492180(0x168)]===undefined)this[_0x492180(0x376)]();if(this[_0x492180(0x168)][_0x492180(0x1cd)]===undefined)this[_0x492180(0x376)]();return this['_EventsMoveCoreSettings'][_0x492180(0x1cd)];},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x3c2)]=function(_0x416acd){const _0x34b339=_0x26bacd;if(this['_EventsMoveCoreSettings']===undefined)this[_0x34b339(0x376)]();if(this['_EventsMoveCoreSettings'][_0x34b339(0x1cd)]===undefined)this[_0x34b339(0x376)]();this[_0x34b339(0x168)][_0x34b339(0x1cd)]=_0x416acd;},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x63c)]=function(){const _0x24fc13=_0x26bacd;return this[_0x24fc13(0x4b8)]===undefined&&(_0x24fc13(0x230)!=='HIxNH'?this[_0x24fc13(0x595)]():this[_0x24fc13(0x4b8)]=![]),this[_0x24fc13(0x4b8)];},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x201)]=function(_0x378a04){const _0x2cacf9=_0x26bacd;this[_0x2cacf9(0x4b8)]=_0x378a04;},Game_System['prototype'][_0x26bacd(0x3d8)]=function(){const _0x21f547=_0x26bacd;return this[_0x21f547(0x273)];},Game_System['prototype'][_0x26bacd(0x24c)]=function(_0x5c142c){const _0x3c09e2=_0x26bacd;this['_PlayerDiagonalSetting']=String(_0x5c142c)[_0x3c09e2(0x18b)]()['trim']();},Game_System['prototype']['getEventIconData']=function(_0x1d7173){const _0x366c77=_0x26bacd;if(this[_0x366c77(0x5da)]===undefined)this[_0x366c77(0x376)]();if(!_0x1d7173)return null;if(_0x1d7173===$gamePlayer)return this[_0x366c77(0x5da)]['Player'];else{const _0x370ec9=VisuMZ[_0x366c77(0x2b9)][_0x366c77(0x3b3)],_0x456839=_0x366c77(0x310)['format'](_0x1d7173[_0x366c77(0x317)],_0x1d7173[_0x366c77(0x65f)]);return this[_0x366c77(0x5da)][_0x456839]=this[_0x366c77(0x5da)][_0x456839]||{'iconIndex':0x0,'bufferX':_0x370ec9[_0x366c77(0x28f)][_0x366c77(0x64a)],'bufferY':_0x370ec9[_0x366c77(0x28f)]['BufferY'],'blendMode':_0x370ec9['Icon'][_0x366c77(0x67f)]},this[_0x366c77(0x5da)][_0x456839];}},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x682)]=function(_0x15e6b4,_0x3f42e4,_0x575095,_0x31fb0d,_0x312958){const _0x283134=_0x26bacd;if(this['_EventIcons']===undefined)this[_0x283134(0x376)]();const _0xf41bff=_0x15e6b4===$gamePlayer?_0x283134(0x25c):_0x283134(0x310)[_0x283134(0x389)](_0x15e6b4['_mapId'],_0x15e6b4[_0x283134(0x65f)]);this[_0x283134(0x5da)][_0xf41bff]={'iconIndex':_0x3f42e4,'bufferX':_0x575095,'bufferY':_0x31fb0d,'blendMode':_0x312958};},Game_System[_0x26bacd(0x42f)]['setEventIconDataKey']=function(_0x4b53d8,_0x24cd49,_0xaeb33d,_0x39bec1,_0x25c8c9,_0x305ed0){const _0x48464c=_0x26bacd;if(this[_0x48464c(0x5da)]===undefined)this[_0x48464c(0x376)]();const _0xde05f=_0x48464c(0x310)[_0x48464c(0x389)](_0x4b53d8,_0x24cd49);this['_EventIcons'][_0xde05f]={'iconIndex':_0xaeb33d,'bufferX':_0x39bec1,'bufferY':_0x25c8c9,'blendMode':_0x305ed0};},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x57d)]=function(_0x3f6f6e){const _0x2af25e=_0x26bacd;if(this[_0x2af25e(0x5da)]===undefined)this[_0x2af25e(0x376)]();if(!_0x3f6f6e)return null;_0x3f6f6e===$gamePlayer?delete this[_0x2af25e(0x5da)][_0x2af25e(0x25c)]:this[_0x2af25e(0x5f2)](_0x3f6f6e[_0x2af25e(0x317)],_0x3f6f6e[_0x2af25e(0x65f)]);},Game_System['prototype'][_0x26bacd(0x5f2)]=function(_0x35d129,_0x532c21){const _0x5ced80=_0x26bacd;if(this[_0x5ced80(0x5da)]===undefined)this[_0x5ced80(0x376)]();const _0x22aa8a=_0x5ced80(0x310)[_0x5ced80(0x389)](_0x35d129,_0x532c21);delete this['_EventIcons'][_0x22aa8a];},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x290)]=function(_0x37b7b5){const _0x5d2488=_0x26bacd;if(this[_0x5d2488(0x5ff)]===undefined)this[_0x5d2488(0x376)]();if(!_0x37b7b5)return null;const _0x33ac67=_0x5d2488(0x310)[_0x5d2488(0x389)](_0x37b7b5[_0x5d2488(0x317)],_0x37b7b5[_0x5d2488(0x65f)]);return this[_0x5d2488(0x5ff)][_0x33ac67];},Game_System[_0x26bacd(0x42f)]['saveEventLocation']=function(_0x3c783e){const _0x259b97=_0x26bacd;if(this[_0x259b97(0x5ff)]===undefined)this[_0x259b97(0x376)]();if(!_0x3c783e)return;const _0xc55154=_0x259b97(0x310)['format'](_0x3c783e[_0x259b97(0x317)],_0x3c783e[_0x259b97(0x65f)]);this['_SavedEventLocations'][_0xc55154]={'direction':_0x3c783e[_0x259b97(0x636)](),'x':Math[_0x259b97(0x1dc)](_0x3c783e['x']),'y':Math[_0x259b97(0x1dc)](_0x3c783e['y']),'pageIndex':_0x3c783e[_0x259b97(0x22c)],'moveRouteIndex':_0x3c783e[_0x259b97(0x641)]};},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x678)]=function(_0x4cf8af){const _0x5518d0=_0x26bacd;if(this[_0x5518d0(0x5ff)]===undefined)this[_0x5518d0(0x376)]();if(!_0x4cf8af)return;this[_0x5518d0(0x56a)](_0x4cf8af[_0x5518d0(0x317)],_0x4cf8af[_0x5518d0(0x65f)]);},Game_System[_0x26bacd(0x42f)]['deleteSavedEventLocationKey']=function(_0x1a660b,_0x49b1aa){const _0x504fe9=_0x26bacd;if(this[_0x504fe9(0x5ff)]===undefined)this[_0x504fe9(0x376)]();const _0x590d2b='Map%1-Event%2'['format'](_0x1a660b,_0x49b1aa);delete this[_0x504fe9(0x5ff)][_0x590d2b];},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x687)]=function(_0x1c4c6f,_0x57043e,_0x315282,_0x4ff161,_0x283f56,_0x5ccf66,_0x26fa6a){const _0x5355e0=_0x26bacd;if(this[_0x5355e0(0x5ff)]===undefined)this[_0x5355e0(0x376)]();const _0x1810b3='Map%1-Event%2'[_0x5355e0(0x389)](_0x1c4c6f,_0x57043e);this[_0x5355e0(0x5ff)][_0x1810b3]={'direction':_0x283f56,'x':Math['round'](_0x315282),'y':Math[_0x5355e0(0x1dc)](_0x4ff161),'pageIndex':_0x5ccf66,'moveRouteIndex':_0x26fa6a};},Game_System[_0x26bacd(0x42f)]['getPreservedMorphEventData']=function(_0x5387f9){const _0x1c5b36=_0x26bacd;if(this[_0x1c5b36(0x619)]===undefined)this[_0x1c5b36(0x376)]();if(!_0x5387f9)return;const _0x592db3=_0x1c5b36(0x310)[_0x1c5b36(0x389)](_0x5387f9[_0x1c5b36(0x317)],_0x5387f9[_0x1c5b36(0x65f)]);return this[_0x1c5b36(0x619)][_0x592db3];},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x5d6)]=function(_0x40cf57,_0x41b65d,_0x5de886,_0x2a1ae9,_0x1909f7){const _0x2c3b3=_0x26bacd;if(this[_0x2c3b3(0x619)]===undefined)this[_0x2c3b3(0x376)]();const _0x414f15='Map%1-Event%2'[_0x2c3b3(0x389)](_0x40cf57,_0x41b65d);this[_0x2c3b3(0x619)][_0x414f15]={'template':_0x5de886,'mapId':_0x2a1ae9,'eventId':_0x1909f7};},Game_System[_0x26bacd(0x42f)]['deletePreservedMorphEventDataKey']=function(_0x533c03,_0x176b79){const _0x42f83e=_0x26bacd;if(this[_0x42f83e(0x619)]===undefined)this[_0x42f83e(0x376)]();const _0xf08247=_0x42f83e(0x310)[_0x42f83e(0x389)](_0x533c03,_0x176b79);delete this[_0x42f83e(0x619)][_0xf08247];},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x67e)]=function(_0x230335){const _0x3ee5c3=_0x26bacd;if(this['_MapSpawnedEventData']===undefined)this['initEventsMoveCore']();return this[_0x3ee5c3(0x64e)][_0x230335]=this[_0x3ee5c3(0x64e)][_0x230335]||[],this[_0x3ee5c3(0x64e)][_0x230335];},Game_System[_0x26bacd(0x42f)]['removeTemporaryMapSpawnedEvents']=function(_0x42f49a){const _0x143a07=_0x26bacd,_0x57caba=this[_0x143a07(0x67e)](_0x42f49a);for(const _0x3106f8 of _0x57caba){if(!_0x3106f8)continue;if(_0x3106f8[_0x143a07(0x5e8)])continue;const _0x375abc=_0x57caba[_0x143a07(0x50d)](_0x3106f8);_0x57caba[_0x375abc]=null;}},Game_System[_0x26bacd(0x42f)]['initFollowerController']=function(){const _0x316681=_0x26bacd;this['_followerControlID']=0x0,this[_0x316681(0x3d5)]=![];},Game_System[_0x26bacd(0x42f)]['getControlledFollowerID']=function(){const _0x3a7317=_0x26bacd;if(this[_0x3a7317(0x649)]===undefined)this[_0x3a7317(0x172)]();return this['_followerControlID'];},Game_System['prototype'][_0x26bacd(0x371)]=function(_0xa9b299){const _0x30f249=_0x26bacd;if(this[_0x30f249(0x649)]===undefined)this[_0x30f249(0x172)]();this[_0x30f249(0x649)]=_0xa9b299;;},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x4c4)]=Game_Interpreter[_0x26bacd(0x42f)][_0x26bacd(0x4a4)],Game_Interpreter['prototype'][_0x26bacd(0x4a4)]=function(_0x540caf){const _0x5ba9d1=_0x26bacd;if(!$gameParty[_0x5ba9d1(0x1f8)]()&&_0x540caf<0x0){let _0x442c33=$gameSystem[_0x5ba9d1(0x633)]();if(_0x442c33>0x0)return $gamePlayer['followers']()[_0x5ba9d1(0x398)](_0x442c33-0x1);}return VisuMZ[_0x5ba9d1(0x2b9)][_0x5ba9d1(0x4c4)][_0x5ba9d1(0x1a2)](this,_0x540caf);},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x37d)]=function(){const _0x44391d=_0x26bacd;if(this[_0x44391d(0x3d5)]===undefined)this[_0x44391d(0x172)]();return this[_0x44391d(0x3d5)];},Game_System[_0x26bacd(0x42f)][_0x26bacd(0x693)]=function(_0x5b5a2c){const _0x39bc93=_0x26bacd;if(this[_0x39bc93(0x3d5)]===undefined)this[_0x39bc93(0x172)]();this[_0x39bc93(0x3d5)]=_0x5b5a2c;;},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x5d8)]=Game_Timer[_0x26bacd(0x42f)][_0x26bacd(0x247)],Game_Timer['prototype'][_0x26bacd(0x247)]=function(){const _0x4a6217=_0x26bacd;VisuMZ[_0x4a6217(0x2b9)][_0x4a6217(0x5d8)][_0x4a6217(0x1a2)](this),this[_0x4a6217(0x376)]();},Game_Timer[_0x26bacd(0x42f)]['initEventsMoveCore']=function(){const _0x5a62b3=_0x26bacd;this[_0x5a62b3(0x4a8)]=![],this['_speed']=-0x1,this[_0x5a62b3(0x150)]=0x0;},Game_Timer['prototype']['update']=function(_0x39b578){const _0x1781d2=_0x26bacd;if(!_0x39b578)return;if(!this[_0x1781d2(0x399)])return;if(this[_0x1781d2(0x4a8)])return;if(this[_0x1781d2(0x1d2)]<=0x0)return;if(this[_0x1781d2(0x349)]===undefined)this[_0x1781d2(0x376)]();this[_0x1781d2(0x1d2)]+=this[_0x1781d2(0x349)],this[_0x1781d2(0x1d2)]<=0x0&&('vxebv'!==_0x1781d2(0x494)?this[_0x1781d2(0x5be)]():(_0x2bbab6=_0x3b5580[_0x1781d2(0x362)],_0x7c3ae0=_0x1ff994[_0x1781d2(0x18a)]));},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x1e0)]=Game_Timer['prototype']['start'],Game_Timer[_0x26bacd(0x42f)][_0x26bacd(0x581)]=function(_0xc6342){const _0x58f2ba=_0x26bacd;VisuMZ[_0x58f2ba(0x2b9)][_0x58f2ba(0x1e0)][_0x58f2ba(0x1a2)](this,_0xc6342);if(this['_paused']===undefined)this[_0x58f2ba(0x376)]();this[_0x58f2ba(0x4a8)]=![];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x51d)]=Game_Timer['prototype']['stop'],Game_Timer[_0x26bacd(0x42f)][_0x26bacd(0x559)]=function(){const _0x3ff115=_0x26bacd;VisuMZ['EventsMoveCore'][_0x3ff115(0x51d)][_0x3ff115(0x1a2)](this);if(this['_paused']===undefined)this[_0x3ff115(0x376)]();this['_paused']=![];},Game_Timer[_0x26bacd(0x42f)][_0x26bacd(0x3ed)]=function(){const _0x1f5af2=_0x26bacd;if(this['_frames']<=0x0)return;this['_paused']=!![],this[_0x1f5af2(0x399)]=!![];},Game_Timer[_0x26bacd(0x42f)][_0x26bacd(0x56c)]=function(){const _0x430223=_0x26bacd;if(this[_0x430223(0x1d2)]<=0x0)return;this[_0x430223(0x4a8)]=![],this[_0x430223(0x399)]=!![];},Game_Timer[_0x26bacd(0x42f)][_0x26bacd(0x4ad)]=function(_0x2dbc9b){const _0x16b874=_0x26bacd;this['_frames']=this[_0x16b874(0x1d2)]||0x0,this['_frames']+=_0x2dbc9b,this[_0x16b874(0x399)]=!![],this[_0x16b874(0x1d2)]=Math['max'](0x1,this['_frames']);},Game_Timer[_0x26bacd(0x42f)][_0x26bacd(0x27b)]=function(_0x2c37f4){const _0x4118e7=_0x26bacd;this['_frames']=this[_0x4118e7(0x1d2)]||0x0,this[_0x4118e7(0x1d2)]=_0x2c37f4,this['_working']=!![],this[_0x4118e7(0x1d2)]=Math[_0x4118e7(0x24b)](0x1,this['_frames']);},Game_Timer[_0x26bacd(0x42f)][_0x26bacd(0x53c)]=function(_0x4698ce){const _0x39b665=_0x26bacd;this['_speed']=_0x4698ce,this[_0x39b665(0x399)]=!![],_0x4698ce>0x0&&(this['_frames']=Math[_0x39b665(0x24b)](this[_0x39b665(0x1d2)],0x1));},Game_Timer[_0x26bacd(0x42f)]['setCommonEvent']=function(_0x44ace8){const _0x3854d3=_0x26bacd;if(this[_0x3854d3(0x150)]===undefined)this[_0x3854d3(0x376)]();this[_0x3854d3(0x150)]=_0x44ace8;},VisuMZ['EventsMoveCore'][_0x26bacd(0x38a)]=Game_Timer['prototype'][_0x26bacd(0x5be)],Game_Timer[_0x26bacd(0x42f)][_0x26bacd(0x5be)]=function(){const _0x496b38=_0x26bacd;if(this[_0x496b38(0x150)]===undefined)this[_0x496b38(0x376)]();this[_0x496b38(0x150)]?_0x496b38(0x1a3)!==_0x496b38(0x65a)?$gameTemp[_0x496b38(0x40b)](this[_0x496b38(0x150)]):this['_PlayerDiagonalSetting']=_0x1f993c(_0x59412c)[_0x496b38(0x18b)]()[_0x496b38(0x5fa)]():VisuMZ[_0x496b38(0x2b9)][_0x496b38(0x38a)][_0x496b38(0x1a2)](this);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x212)]=Game_Message[_0x26bacd(0x42f)][_0x26bacd(0x657)],Game_Message[_0x26bacd(0x42f)][_0x26bacd(0x657)]=function(_0x5e21b3){const _0x329b07=_0x26bacd;VisuMZ['EventsMoveCore'][_0x329b07(0x212)]['call'](this,_0x5e21b3),this[_0x329b07(0x5c3)]=$gameTemp[_0x329b07(0x43b)]();},Game_Message[_0x26bacd(0x42f)][_0x26bacd(0x57e)]=function(){const _0x44371a=_0x26bacd;$gameTemp[_0x44371a(0x2b7)](this[_0x44371a(0x5c3)]);},VisuMZ['EventsMoveCore'][_0x26bacd(0x24f)]=Game_Switches['prototype'][_0x26bacd(0x267)],Game_Switches[_0x26bacd(0x42f)]['value']=function(_0x403ba1){const _0x3ec05a=_0x26bacd;if(DataManager[_0x3ec05a(0x65d)](_0x403ba1))return!!this['advancedValue'](_0x403ba1);else{if(DataManager[_0x3ec05a(0x4d4)](_0x403ba1)){if('mlQaM'===_0x3ec05a(0x52d)){const _0x4c4ff1=_0x282ffd['EventTemplates'][_0x2988c9];if(!_0x4c4ff1)return;_0x4c4ff1[_0x3ec05a(0x1b4)][_0x3ec05a(0x1a2)](this,_0x188eaf,_0x245acd,this);}else return!!this['selfValue'](_0x403ba1);}else{if(DataManager[_0x3ec05a(0x2d2)](_0x403ba1))return!!this['mapValue'](_0x403ba1);else{if(_0x3ec05a(0x1c0)!==_0x3ec05a(0x1c0))_0x3e957c[_0x174da3]?(_0x452fa8['PreloadedMaps'][_0xdc543f]=_0x5899fc[_0x3efb29],_0x1b5a85[_0x542740]=_0x23f440):_0x4a62b9(this['VisuMZ_Setup_Preload_Map'][_0x3ec05a(0x5b2)](this,_0x3bbb0b,_0x5e97e2),0x64);else return VisuMZ[_0x3ec05a(0x2b9)][_0x3ec05a(0x24f)][_0x3ec05a(0x1a2)](this,_0x403ba1);}}}},Game_Switches[_0x26bacd(0x3ea)]={},Game_Switches['prototype']['advancedValue']=function(_0x648775){const _0x11db52=_0x26bacd;if(!Game_Switches[_0x11db52(0x3ea)][_0x648775]){if(_0x11db52(0x42d)===_0x11db52(0x194))return this[_0x11db52(0x534)]()[_0x11db52(0x32b)]??0x0;else{$dataSystem['switches'][_0x648775][_0x11db52(0x224)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x3bddc5=_0x11db52(0x203)[_0x11db52(0x389)](String(RegExp['$1']));Game_Switches[_0x11db52(0x3ea)][_0x648775]=new Function(_0x11db52(0x30a),_0x3bddc5);}}const _0x2798af=$gameTemp[_0x11db52(0x43b)]()||this;return Game_Switches[_0x11db52(0x3ea)][_0x648775][_0x11db52(0x1a2)](_0x2798af,_0x648775);},Game_Switches[_0x26bacd(0x42f)][_0x26bacd(0x612)]=function(_0x1bda6b){const _0x528f01=_0x26bacd,_0x14d1ce=$gameTemp[_0x528f01(0x43b)]()||this;if(_0x14d1ce[_0x528f01(0x1ea)]!==Game_Event)return VisuMZ[_0x528f01(0x2b9)][_0x528f01(0x24f)][_0x528f01(0x1a2)](this,_0x1bda6b);else{const _0x3a7a0a=[_0x14d1ce[_0x528f01(0x317)],_0x14d1ce['_eventId'],_0x528f01(0x3cf)[_0x528f01(0x389)](_0x1bda6b)];return $gameSelfSwitches[_0x528f01(0x267)](_0x3a7a0a);}},Game_Switches['prototype']['mapValue']=function(_0x3a0512){const _0x5e772f=_0x26bacd,_0x5da537=$gameMap?$gameMap[_0x5e772f(0x362)]():0x0,_0x40f63e=[0x0,0x0,_0x5e772f(0x58b)[_0x5e772f(0x389)](_0x5da537,_0x3a0512)];return $gameSelfSwitches[_0x5e772f(0x267)](_0x40f63e);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x691)]=Game_Switches[_0x26bacd(0x42f)][_0x26bacd(0x688)],Game_Switches['prototype'][_0x26bacd(0x688)]=function(_0x1e9807,_0x2fcbae){const _0x16a4e3=_0x26bacd;if(DataManager['isSelfSwitch'](_0x1e9807))this[_0x16a4e3(0x32e)](_0x1e9807,_0x2fcbae);else DataManager[_0x16a4e3(0x2d2)](_0x1e9807)?this[_0x16a4e3(0x1bf)](_0x1e9807,_0x2fcbae):VisuMZ[_0x16a4e3(0x2b9)][_0x16a4e3(0x691)][_0x16a4e3(0x1a2)](this,_0x1e9807,_0x2fcbae);},Game_Switches['prototype'][_0x26bacd(0x32e)]=function(_0x488fe0,_0x546ebf){const _0x1fefd3=_0x26bacd,_0x1caef3=$gameTemp[_0x1fefd3(0x43b)]()||this;if(_0x1caef3[_0x1fefd3(0x1ea)]!==Game_Event)VisuMZ[_0x1fefd3(0x2b9)]['Game_Switches_setValue'][_0x1fefd3(0x1a2)](this,_0x488fe0,_0x546ebf);else{if(_0x1fefd3(0x459)!==_0x1fefd3(0x459)){if(_0x2da033['AirshipSpeed'])this[_0x1fefd3(0x628)](_0x4db11[_0x1fefd3(0x409)]);}else{const _0x470aff=[_0x1caef3[_0x1fefd3(0x317)],_0x1caef3[_0x1fefd3(0x65f)],'Self\x20Switch\x20%1'[_0x1fefd3(0x389)](_0x488fe0)];$gameSelfSwitches['setValue'](_0x470aff,_0x546ebf);}}},Game_Switches[_0x26bacd(0x42f)]['setMapValue']=function(_0x45190f,_0x448470){const _0x35927d=_0x26bacd,_0x2a4b01=$gameMap?$gameMap['mapId']():0x0,_0x3e9168=[0x0,0x0,_0x35927d(0x58b)[_0x35927d(0x389)](_0x2a4b01,_0x45190f)];return $gameSelfSwitches[_0x35927d(0x688)](_0x3e9168,_0x448470);},VisuMZ['EventsMoveCore'][_0x26bacd(0x674)]=Game_Variables[_0x26bacd(0x42f)][_0x26bacd(0x267)],Game_Variables[_0x26bacd(0x42f)][_0x26bacd(0x267)]=function(_0x3a336e){const _0x50348c=_0x26bacd;if(DataManager['isAdvancedVariable'](_0x3a336e))return this[_0x50348c(0x52f)](_0x3a336e);else{if(DataManager[_0x50348c(0x67b)](_0x3a336e)){if(_0x50348c(0x173)===_0x50348c(0x404)){const _0x1b3836=this[_0x50348c(0x23b)];if(!_0x1b3836)return 0x0;return _0x1b3836[_0x50348c(0x423)]['height'];}else return this[_0x50348c(0x612)](_0x3a336e);}else return DataManager['isMapVariable'](_0x3a336e)?this[_0x50348c(0x54e)](_0x3a336e):VisuMZ[_0x50348c(0x2b9)][_0x50348c(0x674)][_0x50348c(0x1a2)](this,_0x3a336e);}},Game_Variables[_0x26bacd(0x3ea)]={},Game_Variables[_0x26bacd(0x42f)]['advancedValue']=function(_0xcc16c){const _0x55c3fc=_0x26bacd;if(!Game_Variables[_0x55c3fc(0x3ea)][_0xcc16c]){if(_0x55c3fc(0x297)===_0x55c3fc(0x35a)){const _0x19ddee=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this['direction']()];return _0x30834c[_0x55c3fc(0x2c4)](this['x'],_0x19ddee);}else{$dataSystem[_0x55c3fc(0x589)][_0xcc16c][_0x55c3fc(0x224)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x15b670=_0x55c3fc(0x203)['format'](String(RegExp['$1']));Game_Variables[_0x55c3fc(0x3ea)][_0xcc16c]=new Function('variableId',_0x15b670);}}const _0x17e86=$gameTemp[_0x55c3fc(0x43b)]()||this;return Game_Variables['advancedFunc'][_0xcc16c]['call'](_0x17e86,_0xcc16c);},Game_Variables[_0x26bacd(0x42f)][_0x26bacd(0x612)]=function(_0x60e567){const _0xe6f0c7=_0x26bacd,_0x3345a1=$gameTemp[_0xe6f0c7(0x43b)]()||this;if(_0x3345a1['constructor']!==Game_Event)return VisuMZ[_0xe6f0c7(0x2b9)][_0xe6f0c7(0x674)][_0xe6f0c7(0x1a2)](this,_0x60e567);else{const _0x4de222=[_0x3345a1[_0xe6f0c7(0x317)],_0x3345a1[_0xe6f0c7(0x65f)],_0xe6f0c7(0x60c)[_0xe6f0c7(0x389)](_0x60e567)];return $gameSelfSwitches[_0xe6f0c7(0x267)](_0x4de222);}},Game_Variables[_0x26bacd(0x42f)][_0x26bacd(0x54e)]=function(_0x4d9a50){const _0x3698f8=_0x26bacd,_0x24d309=$gameMap?$gameMap[_0x3698f8(0x362)]():0x0,_0x3ce365=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x3698f8(0x389)](_0x24d309,_0x4d9a50)];return $gameSelfSwitches[_0x3698f8(0x267)](_0x3ce365)||0x0;},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x463)]=Game_Variables['prototype'][_0x26bacd(0x688)],Game_Variables[_0x26bacd(0x42f)][_0x26bacd(0x688)]=function(_0x5c0306,_0xc9e9d3){const _0x5b4315=_0x26bacd;if(DataManager[_0x5b4315(0x67b)](_0x5c0306))this[_0x5b4315(0x32e)](_0x5c0306,_0xc9e9d3);else{if(DataManager[_0x5b4315(0x5e6)](_0x5c0306))this[_0x5b4315(0x1bf)](_0x5c0306,_0xc9e9d3);else{if('vfkRx'===_0x5b4315(0x352)){const _0x1cf80d='%1%2'[_0x5b4315(0x389)](_0x1b7885,_0xf1db94);_0x4ecdda[_0x1cf80d]&&(_0x3e2385[_0x1cf80d]=_0x1af763[_0x1cf80d]['slice'](0x0));}else VisuMZ[_0x5b4315(0x2b9)]['Game_Variables_setValue'][_0x5b4315(0x1a2)](this,_0x5c0306,_0xc9e9d3);}}},Game_Variables[_0x26bacd(0x42f)][_0x26bacd(0x32e)]=function(_0x15cd0b,_0xad98a){const _0x5e96d2=_0x26bacd,_0x3f68e6=$gameTemp[_0x5e96d2(0x43b)]()||this;if(_0x3f68e6['constructor']!==Game_Event){if(_0x5e96d2(0x55d)!==_0x5e96d2(0x2c2))VisuMZ['EventsMoveCore'][_0x5e96d2(0x463)][_0x5e96d2(0x1a2)](this,_0x15cd0b,_0xad98a);else{_0x243f9b[_0x5e96d2(0x206)]=_0xf92151[_0x5e96d2(0x206)][_0x5e96d2(0x68e)]()[_0x5e96d2(0x5fa)](),_0x35b22e[_0x5e96d2(0x1f3)][_0x37a95b[_0x5e96d2(0x206)]]=_0x5a2345;if(!_0x563314[_0x5e96d2(0x18c)](_0x1d2413['MapID']))_0x53a4b3[_0x5e96d2(0x496)](_0x462366[_0x5e96d2(0x1ba)]);}}else{if(_0x5e96d2(0x50e)!==_0x5e96d2(0x40d)){const _0x3250a7=[_0x3f68e6['_mapId'],_0x3f68e6[_0x5e96d2(0x65f)],_0x5e96d2(0x60c)['format'](_0x15cd0b)];$gameSelfSwitches['setValue'](_0x3250a7,_0xad98a);}else{if(this[_0x5e96d2(0x5da)]===_0xbe2ab8)this['initEventsMoveCore']();const _0x1f52a3=_0x8402d7===_0x503730?_0x5e96d2(0x25c):_0x5e96d2(0x310)[_0x5e96d2(0x389)](_0x3e445a[_0x5e96d2(0x317)],_0x54a9ed[_0x5e96d2(0x65f)]);this[_0x5e96d2(0x5da)][_0x1f52a3]={'iconIndex':_0x4e9f99,'bufferX':_0x706fe8,'bufferY':_0x2d6c09,'blendMode':_0x483b39};}}},Game_Variables[_0x26bacd(0x42f)]['setMapValue']=function(_0x25adab,_0x3a2e2a){const _0x14229c=_0x26bacd,_0x103e2e=$gameMap?$gameMap[_0x14229c(0x362)]():0x0,_0x446c9d=[0x0,0x0,_0x14229c(0x313)[_0x14229c(0x389)](_0x103e2e,_0x25adab)];$gameSelfSwitches[_0x14229c(0x688)](_0x446c9d,_0x3a2e2a);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x506)]=Game_SelfSwitches['prototype'][_0x26bacd(0x267)],Game_SelfSwitches[_0x26bacd(0x42f)][_0x26bacd(0x267)]=function(_0x42aa93){const _0x10b6b0=_0x26bacd;if(_0x42aa93[0x2][_0x10b6b0(0x224)](/(?:SELF|MAP)/i))return this[_0x10b6b0(0x612)](_0x42aa93);else{if('FXtGW'!==_0x10b6b0(0x63a)){return VisuMZ['EventsMoveCore'][_0x10b6b0(0x506)][_0x10b6b0(0x1a2)](this,_0x42aa93);;}else this[_0x10b6b0(0x40c)]=!![];}},Game_SelfSwitches[_0x26bacd(0x42f)][_0x26bacd(0x612)]=function(_0x4d1752){const _0x3ec37f=_0x26bacd;return _0x4d1752[0x2][_0x3ec37f(0x224)](/VAR/i)?this[_0x3ec37f(0x17a)][_0x4d1752]||0x0:!!this['_data'][_0x4d1752];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x31e)]=Game_SelfSwitches['prototype'][_0x26bacd(0x688)],Game_SelfSwitches[_0x26bacd(0x42f)]['setValue']=function(_0x441e7b,_0xc122e1){const _0x51a59e=_0x26bacd;_0x441e7b[0x2][_0x51a59e(0x224)](/(?:SELF|MAP)/i)?this[_0x51a59e(0x32e)](_0x441e7b,_0xc122e1):VisuMZ[_0x51a59e(0x2b9)][_0x51a59e(0x31e)][_0x51a59e(0x1a2)](this,_0x441e7b,_0xc122e1);},Game_SelfSwitches[_0x26bacd(0x42f)][_0x26bacd(0x32e)]=function(_0x1a235d,_0x4df1ab){const _0x53351c=_0x26bacd;this[_0x53351c(0x17a)][_0x1a235d]=_0x1a235d[0x2][_0x53351c(0x224)](/VAR/i)?_0x4df1ab:!!_0x4df1ab,this[_0x53351c(0x21e)]();},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x3eb)]=Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x308)],Game_Map[_0x26bacd(0x42f)]['setupEvents']=function(){const _0x37b4bc=_0x26bacd;VisuMZ[_0x37b4bc(0x2b9)][_0x37b4bc(0x3eb)][_0x37b4bc(0x1a2)](this),this[_0x37b4bc(0x2c8)]();},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x2c8)]=function(){const _0x22c03d=_0x26bacd;this[_0x22c03d(0x166)]=this['mapId']();const _0x11ff33=this[_0x22c03d(0x530)]();for(const _0x5dd4c5 of _0x11ff33){if(_0x5dd4c5)$gameSelfSwitches['resetSelfSwitchesForEvent'](_0x5dd4c5);}},Game_SelfSwitches[_0x26bacd(0x42f)][_0x26bacd(0x18d)]=function(_0x427b74){const _0x4af3e6=_0x26bacd;if(!_0x427b74)return;if(!_0x427b74[_0x4af3e6(0x3b5)]())return;const _0x273ff3=_0x427b74[_0x4af3e6(0x3b5)]()['note']||'';if(_0x273ff3[_0x4af3e6(0x224)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x56e681=_0x4af3e6(0x3d2)[_0x4af3e6(0x389)]($gameMap['_mapId'],_0x427b74['_eventId']),_0x4c2dab=Object['keys'](this[_0x4af3e6(0x17a)])[_0x4af3e6(0x5e2)](_0x4c6b21=>_0x4c6b21[_0x4af3e6(0x512)](_0x56e681));while(_0x4c2dab['length']>0x0){const _0x256413=_0x4c2dab[_0x4af3e6(0x239)]();delete this[_0x4af3e6(0x17a)][_0x256413];}}},Game_SelfSwitches[_0x26bacd(0x42f)][_0x26bacd(0x1fa)]=function(_0x495619){const _0x5c26d7=_0x26bacd,_0x5da7a1='%1,'[_0x5c26d7(0x389)]($gameMap['_mapId']),_0xefc437=Object[_0x5c26d7(0x4dc)](this[_0x5c26d7(0x17a)])[_0x5c26d7(0x5e2)](_0x45e6ab=>_0x45e6ab['startsWith'](_0x5da7a1));while(_0xefc437[_0x5c26d7(0x52a)]>0x0){if(_0x5c26d7(0x543)!==_0x5c26d7(0x3cc)){const _0x3a87cc=_0xefc437['shift']();delete this[_0x5c26d7(0x17a)][_0x3a87cc];}else _0x5a5d77['EventsMoveCore'][_0x5c26d7(0x408)][_0x5c26d7(0x1a2)](this,_0x3f0df2,_0x2499ba),this[_0x5c26d7(0x4f7)](),this['setupMorphEvent'](),this[_0x5c26d7(0x3bc)]();}if(_0x495619===$gameMap[_0x5c26d7(0x362)]()){if('NWPAe'!==_0x5c26d7(0x621))return _0x1f54cc[_0x5c26d7(0x5b5)]()?this[_0x5c26d7(0x43f)]():_0xd596dc['EventsMoveCore'][_0x5c26d7(0x15a)][_0x5c26d7(0x1a2)](this);else $gameMap['requestRefresh']();}},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x561)]=Game_Enemy[_0x26bacd(0x42f)]['meetsSwitchCondition'],Game_Enemy[_0x26bacd(0x42f)][_0x26bacd(0x4f3)]=function(_0x5ba7ab){const _0x5c3ef4=_0x26bacd;$gameTemp[_0x5c3ef4(0x2b7)](this);const _0x19bbdd=VisuMZ['EventsMoveCore'][_0x5c3ef4(0x561)][_0x5c3ef4(0x1a2)](this,_0x5ba7ab);return $gameTemp[_0x5c3ef4(0x419)](),_0x19bbdd;},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x221)]=Game_Troop[_0x26bacd(0x42f)]['meetsConditions'],Game_Troop[_0x26bacd(0x42f)][_0x26bacd(0x4e4)]=function(_0x3aae9c){const _0x192386=_0x26bacd;$gameTemp[_0x192386(0x2b7)](this);const _0x5a0abd=VisuMZ[_0x192386(0x2b9)][_0x192386(0x221)][_0x192386(0x1a2)](this,_0x3aae9c);return $gameTemp[_0x192386(0x419)](),_0x5a0abd;},VisuMZ['EventsMoveCore'][_0x26bacd(0x5a2)]=Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x365)],Game_Map['prototype']['setup']=function(_0x1f51b5){const _0x8d97a5=_0x26bacd;this[_0x8d97a5(0x5ba)](_0x1f51b5),this[_0x8d97a5(0x1ac)](),VisuMZ[_0x8d97a5(0x2b9)][_0x8d97a5(0x5a2)][_0x8d97a5(0x1a2)](this,_0x1f51b5),this[_0x8d97a5(0x1ac)](),this['setupDiagonalSupport'](),this[_0x8d97a5(0x5d2)](),this[_0x8d97a5(0x3fd)](),this[_0x8d97a5(0x178)](),this['setupPlayerVisibilityOverrides'](),this[_0x8d97a5(0x595)](),this[_0x8d97a5(0x1ac)]();},VisuMZ[_0x26bacd(0x2b9)]['Game_Map_setupEvents']=Game_Map[_0x26bacd(0x42f)]['setupEvents'],Game_Map['prototype'][_0x26bacd(0x308)]=function(){const _0x4597ee=_0x26bacd;VisuMZ['EventsMoveCore']['Game_Map_setupEvents'][_0x4597ee(0x1a2)](this),this[_0x4597ee(0x1a4)]();},Game_Map[_0x26bacd(0x23a)]=0xc8,Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x179)]=function(){const _0x5a2d2c=_0x26bacd,_0x2172fc=Game_Map[_0x5a2d2c(0x23a)];this[_0x5a2d2c(0x252)]=this[_0x5a2d2c(0x530)]()[_0x5a2d2c(0x52a)]>_0x2172fc;if(this[_0x5a2d2c(0x252)]&&$gameTemp['isPlaytest']()){}},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x2c1)]=function(){return this['_eventOverload'];},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x1ac)]=function(){const _0x16c07e=_0x26bacd;this[_0x16c07e(0x3b6)]=undefined;},Game_Map[_0x26bacd(0x42f)]['setupDiagonalSupport']=function(){const _0x67dd95=_0x26bacd;this[_0x67dd95(0x2b4)]=VisuMZ[_0x67dd95(0x2b9)][_0x67dd95(0x3b3)][_0x67dd95(0x335)][_0x67dd95(0x54c)];const _0x216f46=$dataMap[_0x67dd95(0x316)]||'';if(_0x216f46[_0x67dd95(0x224)](/<DIAGONAL MOVEMENT: ON>/i))this['_diagonalSupport']=!![];else _0x216f46[_0x67dd95(0x224)](/<DIAGONAL MOVEMENT: OFF>/i)&&(_0x67dd95(0x50c)!==_0x67dd95(0x228)?this['_diagonalSupport']=![]:_0x4c0ae0=[_0x46f74e,_0x3a0eda,_0x3db9c7[_0x67dd95(0x68e)]()[_0x67dd95(0x5fa)]()]);},Game_Map['prototype']['isSupportDiagonalMovement']=function(){const _0x52df6d=_0x26bacd,_0xa761b8=$gameSystem[_0x52df6d(0x3d8)]();if(_0xa761b8===_0x52df6d(0x4c6))return!![];if(_0xa761b8===_0x52df6d(0x5ca))return![];if(this[_0x52df6d(0x2b4)]===undefined)this[_0x52df6d(0x289)]();return this[_0x52df6d(0x2b4)];},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x2c4)]=function(_0x344050,_0x54e0a2){const _0x514a54=_0x26bacd;if([0x1,0x4,0x7]['includes'](_0x54e0a2))_0x344050-=0x1;if([0x3,0x6,0x9][_0x514a54(0x18c)](_0x54e0a2))_0x344050+=0x1;return this[_0x514a54(0x220)](_0x344050);},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x602)]=function(_0x37088a,_0x225adf){const _0x31c16f=_0x26bacd;if([0x1,0x2,0x3][_0x31c16f(0x18c)](_0x225adf))_0x37088a+=0x1;if([0x7,0x8,0x9][_0x31c16f(0x18c)](_0x225adf))_0x37088a-=0x1;return this[_0x31c16f(0x516)](_0x37088a);},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x616)]=function(_0x5050ca,_0x1f794a,_0x402744,_0x8e7ae3){const _0x180e44=_0x26bacd;return Math[_0x180e44(0x24b)](Math[_0x180e44(0x444)](this[_0x180e44(0x4b4)](_0x5050ca,_0x402744)),Math[_0x180e44(0x444)](this[_0x180e44(0x2b2)](_0x1f794a,_0x8e7ae3)));},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x5d2)]=function(){const _0x2bb655=_0x26bacd,_0xf696a2=VisuMZ[_0x2bb655(0x2b9)][_0x2bb655(0x3b3)][_0x2bb655(0x272)],_0x173adc={},_0x14f085=['Allow',_0x2bb655(0x655),_0x2bb655(0x66f)],_0x1df257=[_0x2bb655(0x415),'Walk',_0x2bb655(0x25c),_0x2bb655(0x1e5),_0x2bb655(0x391),_0x2bb655(0x379),_0x2bb655(0x2a7),'Airship'];for(const _0x2de3bc of _0x14f085){if(_0x2bb655(0x1ee)!==_0x2bb655(0x451))for(const _0x4c2f01 of _0x1df257){const _0x3a8987=_0x2bb655(0x508)[_0x2bb655(0x389)](_0x4c2f01,_0x2de3bc);_0xf696a2[_0x3a8987]&&(_0x173adc[_0x3a8987]=_0xf696a2[_0x3a8987]['slice'](0x0));}else{const _0xfd036e=_0xd714e3(_0x29bfb8['$1']),_0x49ee82=_0x3a7111(_0x4b1671['$2']),_0x686e95=this[_0x2bb655(0x647)](_0x3393e0);return this[_0x2bb655(0x4f6)](_0xfd036e,_0x49ee82,_0x686e95);}}const _0x8161ed=$dataMap[_0x2bb655(0x316)]||'',_0x23d190=_0x8161ed[_0x2bb655(0x224)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x23d190)for(const _0x489972 of _0x23d190){_0x489972[_0x2bb655(0x224)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x5e9014=String(RegExp['$1'])[_0x2bb655(0x18b)]()[_0x2bb655(0x5fa)](),_0x282f19=String(RegExp['$2'])[_0x2bb655(0x18b)]()['trim']();const _0x506d17=JSON[_0x2bb655(0x34b)]('['+RegExp['$3']['match'](/\d+/g)+']');_0x5e9014=_0x5e9014[_0x2bb655(0x446)](0x0)[_0x2bb655(0x68e)]()+_0x5e9014[_0x2bb655(0x680)](0x1),_0x282f19=_0x282f19[_0x2bb655(0x446)](0x0)[_0x2bb655(0x68e)]()+_0x282f19[_0x2bb655(0x680)](0x1);const _0x38320e=_0x2bb655(0x508)[_0x2bb655(0x389)](_0x5e9014,_0x282f19);if(_0x173adc[_0x38320e])_0x173adc[_0x38320e]=_0x173adc[_0x38320e]['concat'](_0x506d17);}this[_0x2bb655(0x58a)]=_0x173adc;},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x4a6)]=function(_0x1d03c0,_0x1fe683,_0x2eecdf,_0x1dee16){const _0x98a6a2=_0x26bacd,_0x55d317=this['roundXWithDirection'](_0x1d03c0,_0x2eecdf),_0x1e34de=this[_0x98a6a2(0x602)](_0x1fe683,_0x2eecdf),_0x1fae3c=this[_0x98a6a2(0x650)](_0x55d317,_0x1e34de),_0x37ed48=this[_0x98a6a2(0x58a)];if(_0x37ed48[_0x98a6a2(0x4a9)][_0x98a6a2(0x18c)](_0x1fae3c))return!![];else{if(_0x1dee16===_0x98a6a2(0x63f))return _0x37ed48['PlayerAllow']['includes'](_0x1fae3c)||_0x37ed48[_0x98a6a2(0x3bf)]['includes'](_0x1fae3c);else{if(_0x1dee16===_0x98a6a2(0x3b5)){if(_0x98a6a2(0x5f7)===_0x98a6a2(0x321)){let _0x4d906e=this[_0x98a6a2(0x482)];return this[_0x98a6a2(0x304)]()&&(_0x4d906e+=this[_0x98a6a2(0x62c)]()),this[_0x98a6a2(0x5fb)](_0x4d906e);}else return _0x37ed48['EventAllow'][_0x98a6a2(0x18c)](_0x1fae3c)||_0x37ed48['WalkAllow'][_0x98a6a2(0x18c)](_0x1fae3c);}else{if(_0x37ed48['VehicleAllow'][_0x98a6a2(0x18c)](_0x1fae3c))return!![];else{if('YgxWh'!==_0x98a6a2(0x2bc)){const _0x4455b5='%1Allow'[_0x98a6a2(0x389)](_0x1dee16[_0x98a6a2(0x446)](0x0)[_0x98a6a2(0x68e)]()+_0x1dee16[_0x98a6a2(0x680)](0x1));if(_0x37ed48[_0x4455b5])return _0x37ed48[_0x4455b5][_0x98a6a2(0x18c)](_0x1fae3c);}else this[_0x98a6a2(0x610)]=!![],this[_0x98a6a2(0x45b)](_0x521d0b);}}}}return![];},Game_Map['prototype'][_0x26bacd(0x2fd)]=function(_0x3f56cd,_0x3d794d,_0x32aecb,_0x387b2c){const _0x53ff2c=_0x26bacd,_0x5296e3=this[_0x53ff2c(0x2c4)](_0x3f56cd,_0x32aecb),_0x20eecd=this['roundYWithDirection'](_0x3d794d,_0x32aecb),_0x58c864=this[_0x53ff2c(0x650)](_0x5296e3,_0x20eecd),_0x3a2218=this[_0x53ff2c(0x58a)];if(_0x3a2218[_0x53ff2c(0x5cf)][_0x53ff2c(0x18c)](_0x58c864)){if(_0x53ff2c(0x587)!==_0x53ff2c(0x587)){if(this[_0x53ff2c(0x244)]()>0x0)return![];if(this[_0x53ff2c(0x364)]){if(this[_0x53ff2c(0x364)][_0x53ff2c(0x241)]()!=='')return![];}return this[_0x53ff2c(0x24a)]()||this[_0x53ff2c(0x364)]&&this[_0x53ff2c(0x364)][_0x53ff2c(0x4fc)]();}else return!![];}else{if(_0x387b2c===_0x53ff2c(0x63f))return _0x3a2218[_0x53ff2c(0x343)][_0x53ff2c(0x18c)](_0x58c864)||_0x3a2218[_0x53ff2c(0x622)][_0x53ff2c(0x18c)](_0x58c864);else{if(_0x387b2c===_0x53ff2c(0x3b5)){if('PmYCE'===_0x53ff2c(0x363))return _0x3a2218[_0x53ff2c(0x639)][_0x53ff2c(0x18c)](_0x58c864)||_0x3a2218[_0x53ff2c(0x622)][_0x53ff2c(0x18c)](_0x58c864);else while(this['isRunning']()){this[_0x53ff2c(0x5ea)](_0x18f511);}}else{if(_0x3a2218[_0x53ff2c(0x61b)][_0x53ff2c(0x18c)](_0x58c864))return _0x53ff2c(0x56e)!==_0x53ff2c(0x3a9)?!![]:this[_0x53ff2c(0x37f)](0x9);else{const _0x10952e=_0x53ff2c(0x26a)[_0x53ff2c(0x389)](_0x387b2c['charAt'](0x0)[_0x53ff2c(0x68e)]()+_0x387b2c['slice'](0x1));if(_0x3a2218[_0x10952e])return _0x3a2218[_0x10952e]['includes'](_0x58c864);}}}}return![];},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x585)]=function(_0x27c5ac,_0x13be4b,_0x12c530,_0x5f7ded){const _0x2c4a3f=_0x26bacd;_0x12c530=_0x5f7ded===_0x2c4a3f(0x584)?0x5:_0x12c530;const _0x315652=this[_0x2c4a3f(0x2c4)](_0x27c5ac,_0x12c530),_0x2cd9b1=this[_0x2c4a3f(0x602)](_0x13be4b,_0x12c530),_0xcac1b4=this[_0x2c4a3f(0x650)](_0x315652,_0x2cd9b1),_0x2ab69d=this['_regionRules'];if(_0x2ab69d[_0x2c4a3f(0x573)][_0x2c4a3f(0x18c)](_0xcac1b4)){if(_0x2c4a3f(0x2f3)===_0x2c4a3f(0x2f3))return!![];else{_0x12dc31[_0x2c4a3f(0x164)](_0x398e31,_0x368d16);const _0x21107e=_0x7a7550[_0x2c4a3f(0x2fb)](),_0x50f23a={'template':_0x3bda85[_0x2c4a3f(0x1c5)],'mapId':_0x2b900d[_0x2c4a3f(0x2fe)]||_0x4d36d9[_0x2c4a3f(0x362)](),'eventId':_0x16ad6f[_0x2c4a3f(0x20c)]||_0x21107e['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x39bee5[_0x2c4a3f(0x2a8)],'spawnEventId':_0x551491[_0x2c4a3f(0x39f)][_0x2c4a3f(0x52a)]+0x3e8},_0x3e4eff=_0x5786b8['SuccessSwitchId']||0x0;if(!_0x117e8c[_0x2c4a3f(0x1b5)][_0x50f23a[_0x2c4a3f(0x362)]]&&_0x50f23a['mapId']!==_0x55fb5a['mapId']()){let _0x47fdd7=_0x2c4a3f(0x17b)[_0x2c4a3f(0x389)](_0x50f23a[_0x2c4a3f(0x362)]);_0x47fdd7+=_0x2c4a3f(0x4d8),_0x47fdd7+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x47fdd7+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x47fdd7+=_0x2c4a3f(0x694)[_0x2c4a3f(0x389)](_0x50f23a[_0x2c4a3f(0x362)]),_0x585401(_0x47fdd7);return;}const _0x1f2aba=_0x5b40e2[_0x2c4a3f(0x4c3)](_0x50f23a,_0x3826fc['Region'],_0x206f41[_0x2c4a3f(0x2be)],_0x34b398[_0x2c4a3f(0x625)]);_0x3e4eff&&_0x2607fb[_0x2c4a3f(0x688)](_0x3e4eff,!!_0x1f2aba);}}else{const _0x22e77b=_0x2c4a3f(0x2a5)[_0x2c4a3f(0x389)](_0x5f7ded[_0x2c4a3f(0x446)](0x0)[_0x2c4a3f(0x68e)]()+_0x5f7ded[_0x2c4a3f(0x680)](0x1));if(_0x2ab69d[_0x22e77b])return _0x2ab69d[_0x22e77b]['includes'](_0xcac1b4);}return![];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x18f)]=Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x2d5)],Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x2d5)]=function(){const _0x43cafb=_0x26bacd;VisuMZ[_0x43cafb(0x2b9)][_0x43cafb(0x18f)][_0x43cafb(0x1a2)](this),this[_0x43cafb(0x3c1)]();},Game_Map[_0x26bacd(0x42f)]['checkNeedForPeriodicRefresh']=function(){const _0x3e15bb=_0x26bacd;this[_0x3e15bb(0x359)]=![];if(this['events']()[_0x3e15bb(0x5a6)](_0x1372ef=>_0x1372ef[_0x3e15bb(0x29d)]())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x3e15bb(0x530)]()[_0x3e15bb(0x5a6)](_0x5db864=>_0x5db864[_0x3e15bb(0x5f8)]())){if(_0x3e15bb(0x282)===_0x3e15bb(0x3e0))return this[_0x3e15bb(0x360)]()&&_0x41fa09[_0x3e15bb(0x2b9)][_0x3e15bb(0x3b3)]['VS8'][_0x3e15bb(0x18e)];else{this[_0x3e15bb(0x359)]=!![];return;}}if(this['_commonEvents'][_0x3e15bb(0x5a6)](_0x52de47=>_0x52de47[_0x3e15bb(0x29d)]())){this['_needsPeriodicRefresh']=!![];return;}if(this['_commonEvents'][_0x3e15bb(0x5a6)](_0x60b121=>_0x60b121[_0x3e15bb(0x5f8)]())){if(_0x3e15bb(0x28c)!==_0x3e15bb(0x28c)){if(_0x54b0d6===0x0)return _0x35c0db;return _0x32439e[_0x3e15bb(0x3b5)](_0x2558cd);}else{this[_0x3e15bb(0x359)]=!![];return;}}},VisuMZ[_0x26bacd(0x2b9)]['Game_Map_update']=Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x33d)],Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x33d)]=function(_0x5736c2){const _0x37fa24=_0x26bacd;this['updatePeriodicRefresh'](),VisuMZ['EventsMoveCore'][_0x37fa24(0x41d)][_0x37fa24(0x1a2)](this,_0x5736c2);},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x1f0)]=function(){const _0x5d09f0=_0x26bacd;if(!this[_0x5d09f0(0x359)])return;this[_0x5d09f0(0x3dc)]=this['_periodicRefreshTimer']||0x3c,this[_0x5d09f0(0x3dc)]--,this['_periodicRefreshTimer']<=0x0&&(_0x5d09f0(0x449)!==_0x5d09f0(0x35d)?(this[_0x5d09f0(0x174)](),this[_0x5d09f0(0x3dc)]=0x3c):_0x2243f6[_0x5d09f0(0x487)]());},VisuMZ[_0x26bacd(0x2b9)]['Game_Map_isDashDisabled']=Game_Map[_0x26bacd(0x42f)]['isDashDisabled'],Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x5d7)]=function(){const _0x4a646c=_0x26bacd;if(!$gameSystem[_0x4a646c(0x2a9)]())return!![];return VisuMZ[_0x4a646c(0x2b9)][_0x4a646c(0x23e)][_0x4a646c(0x1a2)](this);},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x3fd)]=function(){const _0x25378a=_0x26bacd;this[_0x25378a(0x2f2)]=![];const _0x9cfb9d=$dataMap[_0x25378a(0x316)]||'';if(_0x9cfb9d['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if('MtjDg'===_0x25378a(0x411))return this[_0x25378a(0x5d4)]()&&this[_0x25378a(0x677)]()===_0x206a3b[_0x25378a(0x2b9)][_0x25378a(0x3b3)][_0x25378a(0x3d1)]['Rope'];else this[_0x25378a(0x2f2)]=!![];}},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x43d)]=function(){const _0xf636ec=_0x26bacd;if(this[_0xf636ec(0x2f2)]===undefined)this[_0xf636ec(0x3fd)]();return this[_0xf636ec(0x2f2)];},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x5ba)]=function(_0x2df507){const _0x55720c=_0x26bacd;_0x2df507!==this[_0x55720c(0x362)]()&&$gamePlayer&&$gameSystem['removeTemporaryMapSpawnedEvents'](this[_0x55720c(0x362)]());},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x178)]=function(){const _0x55d0f0=_0x26bacd;this[_0x55d0f0(0x39f)]=$gameSystem[_0x55d0f0(0x67e)](this['mapId']()),this[_0x55d0f0(0x66b)]=!![];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x29f)]=Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x530)],Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x530)]=function(){const _0x2883b2=_0x26bacd;if(this[_0x2883b2(0x3b6)])return this[_0x2883b2(0x3b6)];const _0x1803ed=VisuMZ[_0x2883b2(0x2b9)][_0x2883b2(0x29f)]['call'](this),_0x58b03d=_0x1803ed[_0x2883b2(0x3ba)](this['_spawnedEvents']||[]);return this['_eventCache']=_0x58b03d[_0x2883b2(0x5e2)](_0x4a9157=>!!_0x4a9157),this[_0x2883b2(0x3b6)];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x598)]=Game_Map['prototype'][_0x26bacd(0x3b5)],Game_Map['prototype'][_0x26bacd(0x3b5)]=function(_0xc0b8ee){const _0x401eb0=_0x26bacd;return _0xc0b8ee>=0x3e8?'gHOyO'===_0x401eb0(0x61c)?this['processMoveRouteMoveRepeat'](0x4,_0x464163(_0x34578d['$1'])):(_0xc0b8ee-=0x3e8,this[_0x401eb0(0x39f)][_0xc0b8ee]):VisuMZ[_0x401eb0(0x2b9)][_0x401eb0(0x598)]['call'](this,_0xc0b8ee);},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x392)]=function(_0x492ea6){const _0x4aecf1=_0x26bacd,_0x1b0e72=this[_0x4aecf1(0x3b5)](_0x492ea6);if(_0x1b0e72)_0x1b0e72['erase']();},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x412)]=function(){const _0x3a5e17=_0x26bacd,_0x57a830={'template':_0x3a5e17(0x229),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this['_spawnedEvents']['length']+0x3e8};this[_0x3a5e17(0x380)](_0x57a830);},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x623)]=function(_0x3f9f18,_0x579545){const _0x4be7c8=_0x26bacd;if(this[_0x4be7c8(0x3f9)](_0x3f9f18,_0x579545)[_0x4be7c8(0x52a)]>0x0)return!![];if($gamePlayer['x']===_0x3f9f18&&$gamePlayer['y']===_0x579545)return!![];if(this[_0x4be7c8(0x368)]()[_0x4be7c8(0x593)](_0x3f9f18,_0x579545))return!![];if(this['ship']()[_0x4be7c8(0x593)](_0x3f9f18,_0x579545))return!![];return![];},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x5f3)]=function(_0x5f1d2e,_0x854fc4,_0x411fa8){const _0x3bbfde=_0x26bacd;$gameTemp[_0x3bbfde(0x24e)]=_0x5f1d2e;const _0x2af1fe=new Game_Event(_0x5f1d2e[_0x3bbfde(0x362)],_0x5f1d2e['eventId']);$gameTemp[_0x3bbfde(0x24e)]=undefined,_0x2af1fe['refresh']();let _0x5cadd2=_0x854fc4-_0x2af1fe[_0x3bbfde(0x608)][_0x3bbfde(0x3d3)],_0x58e62f=_0x854fc4+_0x2af1fe[_0x3bbfde(0x608)][_0x3bbfde(0x596)],_0xd8ae31=_0x411fa8-_0x2af1fe['_addedHitbox']['up'],_0x356d93=_0x411fa8+_0x2af1fe[_0x3bbfde(0x608)][_0x3bbfde(0x59b)];for(let _0x2d1fc5=_0x5cadd2;_0x2d1fc5<=_0x58e62f;_0x2d1fc5++){if(_0x3bbfde(0x34c)!==_0x3bbfde(0x34c))this[_0x3bbfde(0x654)]=0xff;else for(let _0x4da763=_0xd8ae31;_0x4da763<=_0x356d93;_0x4da763++){if(_0x3bbfde(0x23d)===_0x3bbfde(0x5d5)){_0x4e078a[_0x3bbfde(0x42f)][_0x3bbfde(0x298)][_0x3bbfde(0x1a2)](this);if([_0x3bbfde(0x490),'region'][_0x3bbfde(0x18c)](this[_0x3bbfde(0x48d)]()))return;_0x47963f[_0x3bbfde(0x3f3)]([0x2]);}else{if(this[_0x3bbfde(0x623)](_0x2d1fc5,_0x4da763))return![];}}}return!![];},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x380)]=function(_0x519f67){const _0x1ded2b=_0x26bacd;$gameTemp['_spawnData']=_0x519f67;const _0x42ab8=new Game_Event(_0x519f67['mapId'],_0x519f67['eventId']);$gameTemp[_0x1ded2b(0x24e)]=undefined,this[_0x1ded2b(0x39f)][_0x1ded2b(0x496)](_0x42ab8),_0x42ab8[_0x1ded2b(0x5ef)](_0x519f67),this[_0x1ded2b(0x1ac)]();},Game_Map[_0x26bacd(0x42f)]['prepareSpawnedEventAtXY']=function(_0x579218,_0x15231a,_0x108771){const _0x1d99ca=_0x26bacd,_0x48cc2a=_0x579218[_0x1d99ca(0x2ba)]['toUpperCase']()['trim']();if(_0x48cc2a!=='UNTITLED'){if(_0x1d99ca(0x458)===_0x1d99ca(0x458)){const _0x27e93a=VisuMZ[_0x1d99ca(0x1f3)][_0x48cc2a];_0x27e93a&&(_0x579218[_0x1d99ca(0x362)]=_0x27e93a[_0x1d99ca(0x1ba)],_0x579218[_0x1d99ca(0x18a)]=_0x27e93a['EventID']);}else _0x5e9cfd[_0x1d99ca(0x2b9)]['Game_CharacterBase_update']['call'](this),this[_0x1d99ca(0x30d)]();}const _0x1fd3ea=_0x579218['x'],_0x34e892=_0x579218['y'];if(!this['isValid'](_0x1fd3ea,_0x34e892))return![];if(_0x15231a){if('pTjQi'!==_0x1d99ca(0x54b))this[_0x1d99ca(0x4ce)]=_0x183d92(_0x3e3308['$1']);else{if(this[_0x1d99ca(0x623)](_0x1fd3ea,_0x34e892))return![];if(!this[_0x1d99ca(0x5f3)](_0x579218,_0x1fd3ea,_0x34e892))return![];}}if(_0x108771){if(_0x1d99ca(0x36b)!==_0x1d99ca(0x36b)){const _0x3f38be=_0x46b124[_0x1d99ca(0x2b0)](this['moveSynchTarget']());this[_0x1d99ca(0x4f8)](_0x3f38be);}else{if(!this['isPassableByAnyDirection'](_0x1fd3ea,_0x34e892))return![];}}return this[_0x1d99ca(0x380)](_0x579218),!![];},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x4c3)]=function(_0xacca2e,_0x5ac499,_0x266197,_0x4c1e0e){const _0x40cdc0=_0x26bacd,_0x71e37c=_0xacca2e[_0x40cdc0(0x2ba)][_0x40cdc0(0x68e)]()[_0x40cdc0(0x5fa)]();if(_0x71e37c!==_0x40cdc0(0x44d)){if(_0x40cdc0(0x1d1)===_0x40cdc0(0x339)){_0x5d50b0[_0x40cdc0(0x2b9)][_0x40cdc0(0x3f1)][_0x40cdc0(0x1a2)](this,_0x3d1142);if(this[_0x40cdc0(0x193)]()&&_0x36cb9[_0x40cdc0(0x18c)](0x0)&&this[_0x40cdc0(0x15f)]()===_0x40cdc0(0x3a4)){const _0x56ede2=this[_0x40cdc0(0x636)](),_0x43ec5a=_0x3b72c9[_0x40cdc0(0x2c4)](this['x'],_0x56ede2),_0x5c8923=_0x872f72[_0x40cdc0(0x602)](this['y'],_0x56ede2);this[_0x40cdc0(0x550)](_0x43ec5a,_0x5c8923);}}else{const _0x771f7c=VisuMZ['EventTemplates'][_0x71e37c];_0x771f7c&&(_0xacca2e[_0x40cdc0(0x362)]=_0x771f7c['MapID'],_0xacca2e[_0x40cdc0(0x18a)]=_0x771f7c['EventID']);}}const _0x104902=[],_0x252f37=this[_0x40cdc0(0x275)](),_0x50779a=this[_0x40cdc0(0x5a4)]();for(let _0x4e9beb=0x0;_0x4e9beb<_0x252f37;_0x4e9beb++){if('fNkzi'!=='fNkzi')_0x32d693[_0x40cdc0(0x678)](this);else for(let _0x3fda39=0x0;_0x3fda39<_0x50779a;_0x3fda39++){if(_0x40cdc0(0x306)!==_0x40cdc0(0x2ab)){if(!_0x5ac499[_0x40cdc0(0x18c)](this[_0x40cdc0(0x650)](_0x4e9beb,_0x3fda39)))continue;if(!this[_0x40cdc0(0x522)](_0x4e9beb,_0x3fda39))continue;if(_0x266197){if(_0x40cdc0(0x346)===_0x40cdc0(0x470))this['_moveSynch']['type']=_0x2034dc(_0x651a82['$1'])[_0x40cdc0(0x18b)]()[_0x40cdc0(0x5fa)]();else{if(this['checkExistingEntitiesAt'](_0x4e9beb,_0x3fda39))continue;if(!this[_0x40cdc0(0x5f3)](_0xacca2e,_0x4e9beb,_0x3fda39))continue;}}if(_0x4c1e0e){if(_0x40cdc0(0x49e)===_0x40cdc0(0x17e)){if(!_0x5c46b1['EventsMoveCore']['Settings'][_0x40cdc0(0x335)][_0x40cdc0(0x336)])return;for(const _0x2db59b of this[_0x40cdc0(0x46d)]){this[_0x40cdc0(0x4f1)][_0x40cdc0(0x182)](_0x2db59b[_0x40cdc0(0x467)]);}}else{if(!this['isPassableByAnyDirection'](_0x4e9beb,_0x3fda39))continue;}}_0x104902[_0x40cdc0(0x496)]([_0x4e9beb,_0x3fda39]);}else return this[_0x40cdc0(0x15c)](_0x2ffcaa,_0x28513b);}}if(_0x104902[_0x40cdc0(0x52a)]>0x0){const _0x5e0583=_0x104902[Math[_0x40cdc0(0x4f9)](_0x104902[_0x40cdc0(0x52a)])];return _0xacca2e['x']=_0x5e0583[0x0],_0xacca2e['y']=_0x5e0583[0x1],this['createSpawnedEventWithData'](_0xacca2e),!![];}return![];},Game_Map['prototype'][_0x26bacd(0x460)]=function(_0x5c84ad,_0x499bf1,_0x28da64,_0x41bf20){const _0x4905a7=_0x26bacd,_0x2be99c=_0x5c84ad[_0x4905a7(0x2ba)][_0x4905a7(0x68e)]()[_0x4905a7(0x5fa)]();if(_0x2be99c!=='UNTITLED'){if(_0x4905a7(0x525)===_0x4905a7(0x37a))this[_0x4905a7(0x489)]['regionList']=_0x1e5ed9[_0x4905a7(0x34b)]('['+_0xda971c['$1'][_0x4905a7(0x224)](/\d+/g)+']'),this[_0x4905a7(0x489)][_0x4905a7(0x63d)]=_0x4905a7(0x4cd);else{const _0x54eda0=VisuMZ[_0x4905a7(0x1f3)][_0x2be99c];_0x54eda0&&('gKxdE'==='tsQBM'?_0x4b079d[_0x4905a7(0x40b)](_0x550a75[_0x3bcef2]):(_0x5c84ad[_0x4905a7(0x362)]=_0x54eda0[_0x4905a7(0x1ba)],_0x5c84ad[_0x4905a7(0x18a)]=_0x54eda0[_0x4905a7(0x67d)]));}}const _0x13ea22=[],_0x2fde59=this['width'](),_0x47ae3a=this[_0x4905a7(0x5a4)]();for(let _0x1eafbe=0x0;_0x1eafbe<_0x2fde59;_0x1eafbe++){for(let _0x5dcacd=0x0;_0x5dcacd<_0x47ae3a;_0x5dcacd++){if(!_0x499bf1['includes'](this[_0x4905a7(0x677)](_0x1eafbe,_0x5dcacd)))continue;if(!this[_0x4905a7(0x522)](_0x1eafbe,_0x5dcacd))continue;if(_0x28da64){if(this['checkExistingEntitiesAt'](_0x1eafbe,_0x5dcacd))continue;if(!this[_0x4905a7(0x5f3)](_0x5c84ad,_0x1eafbe,_0x5dcacd))continue;}if(_0x41bf20){if(!this['isPassableByAnyDirection'](_0x1eafbe,_0x5dcacd))continue;}_0x13ea22[_0x4905a7(0x496)]([_0x1eafbe,_0x5dcacd]);}}if(_0x13ea22[_0x4905a7(0x52a)]>0x0){const _0x481466=_0x13ea22[Math[_0x4905a7(0x4f9)](_0x13ea22['length'])];return _0x5c84ad['x']=_0x481466[0x0],_0x5c84ad['y']=_0x481466[0x1],this['createSpawnedEventWithData'](_0x5c84ad),!![];}return![];},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x51c)]=function(_0x8e7943,_0x2f8e96){const _0x2b2bf4=_0x26bacd;if(this[_0x2b2bf4(0x2d3)](_0x8e7943,_0x2f8e96,0x2))return!![];if(this[_0x2b2bf4(0x2d3)](_0x8e7943,_0x2f8e96,0x4))return!![];if(this[_0x2b2bf4(0x2d3)](_0x8e7943,_0x2f8e96,0x6))return!![];if(this['isPassable'](_0x8e7943,_0x2f8e96,0x8))return!![];return![];},Game_Map['prototype'][_0x26bacd(0x3b1)]=function(_0x12f355){const _0x469729=_0x26bacd;if(_0x12f355<0x3e8)return;if(!this[_0x469729(0x39f)])return;const _0x5db346=this['event'](_0x12f355);_0x5db346[_0x469729(0x4cb)](-0x1,-0x1),_0x5db346['erase'](),this['_spawnedEvents'][_0x12f355-0x3e8]=null,this[_0x469729(0x1ac)]();},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x39b)]=function(){const _0x1e27ff=_0x26bacd;for(const _0x3a9573 of this[_0x1e27ff(0x39f)]){if(_0x3a9573)return _0x3a9573;}return null;},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x4d1)]=function(){const _0xb6b578=_0x26bacd,_0x2ed1eb=this[_0xb6b578(0x39b)]();return _0x2ed1eb?_0x2ed1eb[_0xb6b578(0x65f)]:0x0;},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x566)]=function(){const _0x1fd6f8=_0x26bacd,_0x3910fd=this[_0x1fd6f8(0x39f)][_0x1fd6f8(0x680)](0x0)[_0x1fd6f8(0x279)]();for(const _0xf90fbd of _0x3910fd){if('uTjUe'!==_0x1fd6f8(0x4ff)){if(_0xf90fbd)return _0xf90fbd;}else return this[_0x1fd6f8(0x43e)](0x3,_0xcad451(_0x3e7338['$1']));}return null;},Game_Map['prototype'][_0x26bacd(0x27a)]=function(){const _0x13c1e5=_0x26bacd,_0x4822c3=this[_0x13c1e5(0x566)]();return _0x4822c3?_0x4822c3[_0x13c1e5(0x65f)]:0x0;},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x26c)]=function(_0xa4e923,_0x43d6b9){const _0x12124b=_0x26bacd,_0x36b9f2=this[_0x12124b(0x3f9)](_0xa4e923,_0x43d6b9);for(const _0x122a98 of _0x36b9f2){if(_0x12124b(0x56f)!=='gZHaT'){if(!_0x122a98)continue;if(_0x122a98[_0x12124b(0x1d8)]())this[_0x12124b(0x3b1)](_0x122a98[_0x12124b(0x65f)]);}else{if(_0x1bd5c2[_0x12124b(0x224)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x15870f=_0xcb307c(_0x36a5b1['$1'])[_0x12124b(0x18b)]()[_0x12124b(0x5fa)](),_0x4dc5ae=_0x5c0b90(_0xe14974['$2']);this[_0x12124b(0x608)][_0x15870f]=_0x4dc5ae;}}}},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x274)]=function(_0x27bfd6){const _0x5a988e=_0x26bacd;for(const _0x2d7c6b of this['_spawnedEvents']){if('RKxMJ'!==_0x5a988e(0x307)){if(!_0x2d7c6b)continue;_0x27bfd6[_0x5a988e(0x18c)](_0x2d7c6b[_0x5a988e(0x650)]())&&this[_0x5a988e(0x3b1)](_0x2d7c6b[_0x5a988e(0x65f)]);}else{if(_0xa00a42['isPressed']())return![];if(!_0x31447b['isSupportDiagonalMovement']())return![];if(_0x480f99[_0x5a988e(0x318)](_0x1451ef,_0x1eab01)[_0x5a988e(0x52a)]>0x0)return![];if(!_0x20664d[_0x5a988e(0x51c)](_0x59515d,_0x2d20ff))return![];const _0x222a30=_0x38878e[_0x5a988e(0x2b6)][_0x5a988e(0x52a)];if(_0x222a30>=_0xdc8c07[_0x5a988e(0x27f)])return![];return!![];}}},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x681)]=function(_0x4d1243){const _0x4ce6d4=_0x26bacd;for(const _0x37a389 of this[_0x4ce6d4(0x39f)]){if(!_0x37a389)continue;_0x4d1243[_0x4ce6d4(0x18c)](_0x37a389[_0x4ce6d4(0x677)]())&&this[_0x4ce6d4(0x3b1)](_0x37a389['_eventId']);}},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x16b)]=function(){const _0x47339c=_0x26bacd;for(const _0x179fc2 of this['_spawnedEvents']){if('UqUQJ'===_0x47339c(0x41f)){if(_0x246fee['variables'][_0x5869fb]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x123141[_0x47339c(0x1c3)][_0x47339c(0x496)](_0x52b415);if(_0x2756d3[_0x47339c(0x589)][_0x30c9c0][_0x47339c(0x224)](/<SELF>/i))_0x3ec3ce[_0x47339c(0x28a)][_0x47339c(0x496)](_0x53e9e5);if(_0x380175['variables'][_0x503595][_0x47339c(0x224)](/<MAP>/i))_0x18b3ff[_0x47339c(0x54a)][_0x47339c(0x496)](_0xe3b968);}else{if(!_0x179fc2)continue;this['despawnEventId'](_0x179fc2[_0x47339c(0x65f)]);}}},VisuMZ[_0x26bacd(0x2b9)]['Game_Map_unlockEvent']=Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x2e3)],Game_Map[_0x26bacd(0x42f)]['unlockEvent']=function(_0x204b1d){const _0x30847c=_0x26bacd;VisuMZ[_0x30847c(0x2b9)][_0x30847c(0x268)][_0x30847c(0x1a2)](this,_0x204b1d);if(_0x204b1d>=0x3e8){const _0x205652=this[_0x30847c(0x3b5)](_0x204b1d);if(_0x205652)_0x205652[_0x30847c(0x187)]();}},Game_Map[_0x26bacd(0x42f)]['setupPlayerVisibilityOverrides']=function(){const _0x447419=_0x26bacd;this['_forceShowPlayer']=![],this['_forceHidePlayer']=![];if(!$dataMap)return;const _0x1c669b=$dataMap[_0x447419(0x316)]||'';if(_0x1c669b['match'](/<HIDE PLAYER>/i))this[_0x447419(0x2ff)]=![],this['_forceHidePlayer']=!![];else{if(_0x1c669b['match'](/<SHOW PLAYER>/i)){if(_0x447419(0x1aa)===_0x447419(0x1cb)){this[_0x447419(0x2ff)]=![],this[_0x447419(0x457)]=![];if(!_0x2767a1)return;const _0x5890c0=_0x5cf6fd[_0x447419(0x316)]||'';if(_0x5890c0[_0x447419(0x224)](/<HIDE PLAYER>/i))this['_forceShowPlayer']=![],this['_forceHidePlayer']=!![];else _0x5890c0[_0x447419(0x224)](/<SHOW PLAYER>/i)&&(this['_forceShowPlayer']=!![],this[_0x447419(0x457)]=![]);}else this[_0x447419(0x2ff)]=!![],this['_forceHidePlayer']=![];}}},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x538)]=function(){const _0x3a4535=_0x26bacd;return this[_0x3a4535(0x2ff)]===undefined&&(_0x3a4535(0x5eb)!==_0x3a4535(0x513)?this[_0x3a4535(0x1d4)]():_0x7a2d03[_0x3a4535(0x2b9)][_0x3a4535(0x5b9)]['call'](this,_0x4929bf)),this[_0x3a4535(0x2ff)];},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x21d)]=function(){const _0x2b6478=_0x26bacd;if(this[_0x2b6478(0x457)]===undefined){if('yKqgV'==='RpxsL'){const _0x50bed8=_0x3e48cb(_0x3484e3['$1']),_0x1c2a6e=this[_0x2b6478(0x647)](_0x1e4f13);return this[_0x2b6478(0x3c7)](_0x50bed8,_0x1c2a6e);}else this[_0x2b6478(0x1d4)]();}return this[_0x2b6478(0x457)];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x62d)]=Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x4fc)],Game_CharacterBase[_0x26bacd(0x42f)]['isTransparent']=function(){const _0x43c178=_0x26bacd;if(this===$gamePlayer){if(_0x43c178(0x49f)!==_0x43c178(0x49f)){const _0x334058=[_0x210bd7[_0x43c178(0x317)],_0xae531e[_0x43c178(0x65f)],_0x43c178(0x60c)['format'](_0x1a0cc7)];_0x39060e[_0x43c178(0x688)](_0x334058,_0x22e2f9);}else{if($gameMap[_0x43c178(0x538)]())return![];if($gameMap['isPlayerForceHidden']())return!![];}}return VisuMZ[_0x43c178(0x2b9)]['Game_CharacterBase_isTransparent'][_0x43c178(0x1a2)](this);},Game_Map['prototype']['setupFollowerVisibilityOverrides']=function(){const _0x18c93f=_0x26bacd;this[_0x18c93f(0x314)]=![],this[_0x18c93f(0x38f)]=![];if(!$dataMap)return;const _0x1618d1=$dataMap[_0x18c93f(0x316)]||'';if(_0x1618d1[_0x18c93f(0x224)](/<HIDE FOLLOWERS>/i))this['_forceShowFollower']=![],this[_0x18c93f(0x38f)]=!![];else _0x1618d1[_0x18c93f(0x224)](/<SHOW FOLLOWERS>/i)&&(_0x18c93f(0x1ad)==='bFKQS'?this['_forceCarrying']=![]:(this[_0x18c93f(0x314)]=!![],this[_0x18c93f(0x38f)]=![]));},Game_Map[_0x26bacd(0x42f)]['areFollowersForceShown']=function(){const _0x128c08=_0x26bacd;return this[_0x128c08(0x314)]===undefined&&(_0x128c08(0x55e)===_0x128c08(0x4f2)?this[_0x128c08(0x641)]=_0x42827c[_0x128c08(0x1b6)]:this[_0x128c08(0x595)]()),this['_forceShowFollower'];},Game_Map['prototype'][_0x26bacd(0x495)]=function(){const _0xa2c35b=_0x26bacd;return this['_forceHideFollower']===undefined&&this[_0xa2c35b(0x595)](),this['_forceHideFollower'];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x250)]=Game_Followers[_0x26bacd(0x42f)][_0x26bacd(0x19f)],Game_Followers[_0x26bacd(0x42f)]['isVisible']=function(){const _0x357dae=_0x26bacd;if($gameMap[_0x357dae(0x31a)]())return!![];if($gameMap[_0x357dae(0x495)]())return![];return VisuMZ[_0x357dae(0x2b9)][_0x357dae(0x250)][_0x357dae(0x1a2)](this);},Game_CommonEvent['prototype'][_0x26bacd(0x29d)]=function(){const _0x3611c2=_0x26bacd,_0x1f0e75=this['event']();return this['isActive']()&&_0x1f0e75[_0x3611c2(0x2ce)]>=0x1&&DataManager[_0x3611c2(0x65d)](_0x1f0e75[_0x3611c2(0x30a)]);},Game_CommonEvent[_0x26bacd(0x42f)][_0x26bacd(0x5f8)]=function(){const _0x1d12c7=_0x26bacd;return VisuMZ['EventsMoveCore'][_0x1d12c7(0x158)][_0x1d12c7(0x580)]['includes'](this[_0x1d12c7(0x3f2)]);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x233)]=Game_CommonEvent[_0x26bacd(0x42f)]['isActive'],Game_CommonEvent[_0x26bacd(0x42f)][_0x26bacd(0x491)]=function(){const _0x18abaa=_0x26bacd;if(VisuMZ['EventsMoveCore']['Game_CommonEvent_isActive'][_0x18abaa(0x1a2)](this))return'JjJCO'===_0x18abaa(0x504)?(this['_forceShowPlayer']===_0x4a1337&&this[_0x18abaa(0x1d4)](),this[_0x18abaa(0x2ff)]):!![];else{if(_0x18abaa(0x283)===_0x18abaa(0x283)){const _0x35e634=this[_0x18abaa(0x3b5)]();return VisuMZ[_0x18abaa(0x2b9)][_0x18abaa(0x158)][_0x18abaa(0x5a7)](this[_0x18abaa(0x3b5)]()[_0x18abaa(0x4bc)],this['_commonEventId'],_0x35e634);}else{if(!this[_0x18abaa(0x359)])return;this[_0x18abaa(0x3dc)]=this[_0x18abaa(0x3dc)]||0x3c,this[_0x18abaa(0x3dc)]--,this[_0x18abaa(0x3dc)]<=0x0&&(this[_0x18abaa(0x174)](),this['_periodicRefreshTimer']=0x3c);}}},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x2df)]=Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x600)],Game_Map[_0x26bacd(0x42f)]['parallelCommonEvents']=function(){const _0x4db46f=_0x26bacd,_0x2e793c=VisuMZ[_0x4db46f(0x2b9)][_0x4db46f(0x2df)]['call'](this),_0xca25e8=VisuMZ[_0x4db46f(0x2b9)][_0x4db46f(0x158)][_0x4db46f(0x580)][_0x4db46f(0x1fe)](_0x4f64ba=>$dataCommonEvents[_0x4f64ba]);return _0x2e793c[_0x4db46f(0x3ba)](_0xca25e8)[_0x4db46f(0x5e2)]((_0x39f30b,_0x1976eb,_0x5860ba)=>_0x5860ba[_0x4db46f(0x50d)](_0x39f30b)===_0x1976eb);},Game_CharacterBase[_0x26bacd(0x49c)]=VisuMZ['EventsMoveCore'][_0x26bacd(0x3b3)][_0x26bacd(0x335)]['DashOnLadder']??![],VisuMZ['EventsMoveCore'][_0x26bacd(0x3e7)]=Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x1e6)],Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x1e6)]=function(){const _0x3110d0=_0x26bacd;VisuMZ[_0x3110d0(0x2b9)]['Game_CharacterBase_initMembers'][_0x3110d0(0x1a2)](this),this[_0x3110d0(0x5a3)]();},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x5a3)]=function(){const _0x181cd1=_0x26bacd;this[_0x181cd1(0x610)]=![],this['clearPose'](),this['clearDashing'](),this[_0x181cd1(0x53d)](),this[_0x181cd1(0x264)]();},VisuMZ['EventsMoveCore'][_0x26bacd(0x181)]=Game_CharacterBase[_0x26bacd(0x42f)]['opacity'],Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x3f6)]=function(){const _0x437bbf=_0x26bacd;let _0x3859d5=VisuMZ[_0x437bbf(0x2b9)][_0x437bbf(0x181)][_0x437bbf(0x1a2)](this);return _0x3859d5=this['adjustMoveSynchOpacityDelta'](_0x3859d5),_0x3859d5;},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x61e)]=function(_0x22c44f){return _0x22c44f;},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x360)]=function(){const _0x57340c=_0x26bacd;if(this[_0x57340c(0x1ea)]===Game_Player&&this[_0x57340c(0x64d)]())return this[_0x57340c(0x462)]()[_0x57340c(0x400)]()[_0x57340c(0x224)](/\[VS8\]/i);else{if(Imported['VisuMZ_2_DragonbonesUnion']&&this[_0x57340c(0x2e9)]()){if('YUscm'!==_0x57340c(0x45a)){const _0x578ed2=_0x44ac89[_0x57340c(0x3b5)](_0x18e6af['EventId']||_0x126523['eventId']());_0x578ed2['removeMorph']();}else return!![];}else return this[_0x57340c(0x400)]()['match'](/\[VS8\]/i);}},VisuMZ['EventsMoveCore']['Game_CharacterBase_direction']=Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x636)],Game_CharacterBase[_0x26bacd(0x42f)]['direction']=function(){const _0x2ea175=_0x26bacd;if(!$dataMap)return this[_0x2ea175(0x2e6)]||0x2;if(this[_0x2ea175(0x5d4)]()&&!this[_0x2ea175(0x15e)]()&&this[_0x2ea175(0x360)]())return this[_0x2ea175(0x570)]();else{if(this[_0x2ea175(0x5d4)]()&&!this['isJumping']())return _0x2ea175(0x176)==='iflcC'?_0x492369[_0x2ea175(0x2b9)][_0x2ea175(0x394)][_0x2ea175(0x1a2)](this)+(this[_0x2ea175(0x4ce)]||0x0):0x8;else return this['isPosing']()&&this[_0x2ea175(0x360)]()?this['getPosingCharacterDirection']():VisuMZ[_0x2ea175(0x2b9)]['Game_CharacterBase_direction']['call'](this);}},VisuMZ[_0x26bacd(0x2b9)]['Game_CharacterBase_setDirection']=Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x37f)],Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x37f)]=function(_0x377c2b){const _0x58cb28=_0x26bacd;if(!this[_0x58cb28(0x360)]())_0x377c2b=this[_0x58cb28(0x2cc)](_0x377c2b);VisuMZ['EventsMoveCore'][_0x58cb28(0x5e4)][_0x58cb28(0x1a2)](this,_0x377c2b);},Game_CharacterBase['prototype'][_0x26bacd(0x2cc)]=function(_0x4b85ea){const _0xc7d8cd=_0x26bacd;if(_0x4b85ea===0x1)return this[_0xc7d8cd(0x1c6)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x4b85ea===0x3)return this[_0xc7d8cd(0x1c6)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x4b85ea===0x7)return this[_0xc7d8cd(0x1c6)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x4b85ea===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x4b85ea;},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x603)]=function(_0x49d8c9){const _0x77319b=_0x26bacd;return[0x1,0x3,0x5,0x7,0x9][_0x77319b(0x18c)](_0x49d8c9);},Game_CharacterBase[_0x26bacd(0x42f)]['lastMovedDirection']=function(){const _0x175b3f=_0x26bacd;return this[_0x175b3f(0x588)]||0x0;},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x367)]=Game_CharacterBase['prototype'][_0x26bacd(0x49d)],Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x49d)]=function(_0x51ec51){const _0x2e9891=_0x26bacd;this[_0x2e9891(0x588)]=_0x51ec51,VisuMZ['EventsMoveCore'][_0x2e9891(0x367)][_0x2e9891(0x1a2)](this,_0x51ec51);},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x3b4)]=function(_0x26ea92){const _0x19a12a=_0x26bacd;if(!this['isDiagonalDirection'](_0x26ea92))return this[_0x19a12a(0x49d)](_0x26ea92);let _0x82a58c=0x0,_0x41e33f=0x0;switch(_0x26ea92){case 0x1:_0x82a58c=0x4,_0x41e33f=0x2;break;case 0x3:_0x82a58c=0x6,_0x41e33f=0x2;break;case 0x7:_0x82a58c=0x4,_0x41e33f=0x8;break;case 0x9:_0x82a58c=0x6,_0x41e33f=0x8;break;}if(VisuMZ[_0x19a12a(0x2b9)][_0x19a12a(0x3b3)][_0x19a12a(0x335)][_0x19a12a(0x3cb)]){if(!this[_0x19a12a(0x1c6)](this['_x'],this['_y'],_0x82a58c))return this[_0x19a12a(0x49d)](_0x41e33f);if(!this[_0x19a12a(0x1c6)](this['_x'],this['_y'],_0x41e33f))return this[_0x19a12a(0x49d)](_0x82a58c);if(!this['canPassDiagonally'](this['_x'],this['_y'],_0x82a58c,_0x41e33f)){if(_0x19a12a(0x3c6)===_0x19a12a(0x276))return!![];else{let _0x4accbb=VisuMZ['EventsMoveCore'][_0x19a12a(0x3b3)][_0x19a12a(0x335)][_0x19a12a(0x33e)]?_0x82a58c:_0x41e33f;return this['moveStraight'](_0x4accbb);}}}this[_0x19a12a(0x588)]=_0x26ea92,this[_0x19a12a(0x537)](_0x82a58c,_0x41e33f);},VisuMZ[_0x26bacd(0x2b9)]['Game_CharacterBase_realMoveSpeed']=Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x5bd)],Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x5bd)]=function(){const _0xbc0766=_0x26bacd;let _0x41ba58=this[_0xbc0766(0x482)];return this[_0xbc0766(0x304)]()&&(_0x41ba58+=this[_0xbc0766(0x62c)]()),this[_0xbc0766(0x5fb)](_0x41ba58);},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x62c)]=function(){const _0x25ae2c=_0x26bacd,_0x110fce=VisuMZ[_0x25ae2c(0x2b9)][_0x25ae2c(0x3b3)][_0x25ae2c(0x335)];return _0x110fce[_0x25ae2c(0x5c4)]!==undefined?_0x110fce[_0x25ae2c(0x5c4)]:VisuMZ[_0x25ae2c(0x2b9)]['Game_CharacterBase_realMoveSpeed']['call'](this)-this[_0x25ae2c(0x482)];},Game_CharacterBase[_0x26bacd(0x42f)]['adjustDir8MovementSpeed']=function(_0x1bc5f8){const _0x1bd3c5=_0x26bacd,_0x3a3f20=VisuMZ[_0x1bd3c5(0x2b9)][_0x1bd3c5(0x3b3)][_0x1bd3c5(0x335)];if(!_0x3a3f20['SlowerSpeed'])return _0x1bc5f8;return[0x1,0x3,0x7,0x9]['includes'](this['_lastMovedDirection'])&&(_0x1bc5f8*=_0x3a3f20[_0x1bd3c5(0x50a)]||0.01),_0x1bc5f8;},VisuMZ[_0x26bacd(0x2b9)]['Game_CharacterBase_isDashing']=Game_CharacterBase['prototype']['isDashing'],Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x304)]=function(){const _0x572b76=_0x26bacd;if(!Game_CharacterBase[_0x572b76(0x49c)]&&this['isOnLadder']())return![];if(this['_forceDashing'])return!![];return VisuMZ[_0x572b76(0x2b9)]['Game_CharacterBase_isDashing'][_0x572b76(0x1a2)](this);},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x309)]=function(){const _0x15802a=_0x26bacd;return this[_0x15802a(0x304)]()&&this[_0x15802a(0x375)]===0x0;},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x227)]=Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x57c)],Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x57c)]=function(){const _0x3ebda6=_0x26bacd;return this[_0x3ebda6(0x38d)]()?this[_0x3ebda6(0x569)]():VisuMZ[_0x3ebda6(0x2b9)][_0x3ebda6(0x227)][_0x3ebda6(0x1a2)](this);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x653)]=Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x298)],Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x298)]=function(){const _0x1142e8=_0x26bacd;VisuMZ['EventsMoveCore']['Game_CharacterBase_increaseSteps'][_0x1142e8(0x1a2)](this),this[_0x1142e8(0x4a0)]();},VisuMZ['EventsMoveCore'][_0x26bacd(0x405)]=Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x38b)],Game_CharacterBase['prototype'][_0x26bacd(0x38b)]=function(){const _0x355f5d=_0x26bacd;if(this[_0x355f5d(0x360)]())return this[_0x355f5d(0x55f)]();return VisuMZ[_0x355f5d(0x2b9)]['Game_CharacterBase_characterIndex']['call'](this);},Game_CharacterBase[_0x26bacd(0x42f)]['characterIndexVS8']=function(){const _0xc6e134=_0x26bacd,_0x5c2fa9=this[_0xc6e134(0x636)]();if(this['isJumping']()){if(_0xc6e134(0x3c3)!==_0xc6e134(0x1ca)){if([0x2,0x4,0x6,0x8][_0xc6e134(0x18c)](_0x5c2fa9))return 0x4;if([0x1,0x3,0x7,0x9][_0xc6e134(0x18c)](_0x5c2fa9))return 0x5;}else{const _0x49fe0c=this['_opacity']+_0x233fcc(_0x16c264['$1']);return this[_0xc6e134(0x528)](_0x49fe0c[_0xc6e134(0x48e)](0x0,0xff));}}else{if(this[_0xc6e134(0x5d4)]())return 0x6;else{if(this[_0xc6e134(0x38d)]())return this[_0xc6e134(0x553)]();else{if(this[_0xc6e134(0x568)]){if(_0xc6e134(0x591)==='hZYDB')this[_0xc6e134(0x439)]=0x0;else{if([0x2,0x4,0x6,0x8][_0xc6e134(0x18c)](_0x5c2fa9))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x5c2fa9))return 0x5;}}else{if(this[_0xc6e134(0x3a8)]()&&this[_0xc6e134(0x1ef)]()){if(_0xc6e134(0x165)===_0xc6e134(0x165)){if([0x2,0x4,0x6,0x8][_0xc6e134(0x18c)](_0x5c2fa9))return 0x4;if([0x1,0x3,0x7,0x9][_0xc6e134(0x18c)](_0x5c2fa9))return 0x5;}else this[_0xc6e134(0x1c4)]=_0x137950,_0x176ad8[_0xc6e134(0x42f)][_0xc6e134(0x247)][_0xc6e134(0x1a2)](this),this[_0xc6e134(0x1e6)](),this[_0xc6e134(0x3d9)]();}else{if(this[_0xc6e134(0x309)]()){if([0x2,0x4,0x6,0x8][_0xc6e134(0x18c)](_0x5c2fa9))return 0x2;if([0x1,0x3,0x7,0x9][_0xc6e134(0x18c)](_0x5c2fa9))return 0x3;}else{if([0x2,0x4,0x6,0x8]['includes'](_0x5c2fa9))return 0x0;if([0x1,0x3,0x7,0x9]['includes'](_0x5c2fa9))return 0x1;}}}}}}},Game_CharacterBase['prototype'][_0x26bacd(0x1ef)]=function(){const _0x2c6beb=_0x26bacd;return VisuMZ[_0x2c6beb(0x2b9)][_0x2c6beb(0x3b3)]['VS8']['CarryPose'];},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x303)]=function(){const _0x2d88c2=_0x26bacd;return this[_0x2d88c2(0x5d4)]()&&this[_0x2d88c2(0x677)]()===VisuMZ[_0x2d88c2(0x2b9)][_0x2d88c2(0x3b3)][_0x2d88c2(0x3d1)][_0x2d88c2(0x1df)];},Game_CharacterBase['prototype'][_0x26bacd(0x570)]=function(){const _0x5e9075=_0x26bacd;if(this[_0x5e9075(0x303)]())return 0x4;else{if('kJHAj'===_0x5e9075(0x3ce))return 0x2;else{if(_0x4644d1>this['y']&&this[_0x5e9075(0x1c6)](this['x'],this['y'],0x4))_0x3c33fc=0x3;if(_0xb66ae9<this['y']&&this[_0x5e9075(0x1c6)](this['x'],this['y'],0x6))_0x2a433b=0x9;}}},VisuMZ['EventsMoveCore'][_0x26bacd(0x60b)]=Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x33d)],Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x33d)]=function(){const _0x329605=_0x26bacd;VisuMZ[_0x329605(0x2b9)]['Game_CharacterBase_update'][_0x329605(0x1a2)](this),this[_0x329605(0x30d)]();},Game_CharacterBase['prototype'][_0x26bacd(0x30d)]=function(){const _0x3e3a6b=_0x26bacd;this[_0x3e3a6b(0x645)]=this[_0x3e3a6b(0x645)]||0x0;if(this['_poseDuration']>0x0){this['_poseDuration']--;if(this[_0x3e3a6b(0x645)]<=0x0&&this[_0x3e3a6b(0x664)]!==_0x3e3a6b(0x38e))this['clearPose']();}},VisuMZ['EventsMoveCore'][_0x26bacd(0x200)]=Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x537)],Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x537)]=function(_0x147da2,_0x42d2ae){const _0x360d7e=_0x26bacd;VisuMZ[_0x360d7e(0x2b9)][_0x360d7e(0x200)][_0x360d7e(0x1a2)](this,_0x147da2,_0x42d2ae);if(this[_0x360d7e(0x360)]())this['setDiagonalDirection'](_0x147da2,_0x42d2ae);},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x23f)]=function(_0x15a867,_0x3879be){const _0x49b39a=_0x26bacd;if(_0x15a867===0x4&&_0x3879be===0x2)this[_0x49b39a(0x37f)](0x1);if(_0x15a867===0x6&&_0x3879be===0x2)this[_0x49b39a(0x37f)](0x3);if(_0x15a867===0x4&&_0x3879be===0x8)this[_0x49b39a(0x37f)](0x7);if(_0x15a867===0x6&&_0x3879be===0x8)this[_0x49b39a(0x37f)](0x9);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x210)]=Game_CharacterBase['prototype'][_0x26bacd(0x410)],Game_CharacterBase[_0x26bacd(0x42f)]['hasStepAnime']=function(){const _0x2bfdde=_0x26bacd;if(this[_0x2bfdde(0x38d)]()&&this['getPose']()===_0x2bfdde(0x38e))return!![];return VisuMZ['EventsMoveCore'][_0x2bfdde(0x210)]['call'](this);},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x3da)]=function(_0x556444,_0x32a934){const _0x51b1a4=_0x26bacd;if(_0x556444[_0x51b1a4(0x224)](/Z/i))_0x556444=_0x51b1a4(0x38e);if(_0x556444[_0x51b1a4(0x224)](/SLEEP/i))_0x556444=_0x51b1a4(0x38e);this['isSpriteVS8dir']()&&('fYzBC'!==_0x51b1a4(0x21a)?(_0x556506['EventsMoveCore'][_0x51b1a4(0x46a)][_0x51b1a4(0x1a2)](this),this[_0x51b1a4(0x575)]['hideShadows']()):(this[_0x51b1a4(0x664)]=_0x556444[_0x51b1a4(0x68e)]()[_0x51b1a4(0x5fa)](),this['_poseDuration']=_0x32a934||Infinity));},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x5f5)]=function(){const _0x38ff6d=_0x26bacd;if(this['isSpriteVS8dir']())return(this[_0x38ff6d(0x664)]||'')[_0x38ff6d(0x68e)]()[_0x38ff6d(0x5fa)]();else{if(_0x38ff6d(0x4e5)===_0x38ff6d(0x5c7)){if(this['_SavedEventLocations']===_0x1e2c1c)this[_0x38ff6d(0x376)]();const _0x33b75e=_0x38ff6d(0x310)[_0x38ff6d(0x389)](_0x4e31d5,_0x4f0700);this[_0x38ff6d(0x5ff)][_0x33b75e]={'direction':_0x28927b,'x':_0x3b84fc[_0x38ff6d(0x1dc)](_0x2aea46),'y':_0x10e20e['round'](_0xe15793),'pageIndex':_0x12a3e8,'moveRouteIndex':_0x34ce37};}else return''[_0x38ff6d(0x68e)]()[_0x38ff6d(0x5fa)]();}},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x35e)]=function(_0x268cbd,_0xb49c93){const _0x42a8b0=_0x26bacd;if(this[_0x42a8b0(0x360)]()){if(_0x42a8b0(0x644)!=='NinMp'){const _0x5d88dd=['',_0x42a8b0(0x62e),'QUESTION','MUSIC\x20NOTE',_0x42a8b0(0x614),'ANGER','SWEAT',_0x42a8b0(0x25e),_0x42a8b0(0x15d),_0x42a8b0(0x531),'ZZZ','','','','',''][_0x268cbd];this[_0x42a8b0(0x3da)](_0x5d88dd,_0xb49c93);}else return this[_0x42a8b0(0x651)](_0x161e19,_0x287e1b);}},Game_CharacterBase['prototype'][_0x26bacd(0x4a0)]=function(){const _0xa285f1=_0x26bacd;this['_pose']='',this[_0xa285f1(0x645)]=0x0;},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x38d)]=function(){const _0x106cf2=_0x26bacd;return this[_0x106cf2(0x360)]()&&!!this['_pose'];},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x553)]=function(){const _0xe57f3c=_0x26bacd,_0x388b8f=this[_0xe57f3c(0x664)][_0xe57f3c(0x68e)]();switch(this['_pose'][_0xe57f3c(0x68e)]()[_0xe57f3c(0x5fa)]()){case _0xe57f3c(0x3a0):case _0xe57f3c(0x25a):case'VICTORY':case _0xe57f3c(0x36d):case _0xe57f3c(0x157):case'COLLAPSE':return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x663)]=function(){const _0x334ae6=_0x26bacd;switch(this[_0x334ae6(0x664)][_0x334ae6(0x68e)]()){case _0x334ae6(0x62e):case _0x334ae6(0x36f):case'MUSIC\x20NOTE':case'!':case'?':return 0x2;break;case _0x334ae6(0x614):case'ANGER':case _0x334ae6(0x21f):return 0x4;break;case _0x334ae6(0x3a0):case _0x334ae6(0x25a):case'VICTORY':case'COBWEB':case _0x334ae6(0x15d):case _0x334ae6(0x531):return 0x6;break;case _0x334ae6(0x36d):case _0x334ae6(0x157):case _0x334ae6(0x64b):case'ZZZ':case _0x334ae6(0x65c):return 0x8;break;default:return VisuMZ['EventsMoveCore'][_0x334ae6(0x5e4)][_0x334ae6(0x1a2)](this);break;}},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x569)]=function(){const _0x148ae0=_0x26bacd;switch(this[_0x148ae0(0x664)]['toUpperCase']()){case _0x148ae0(0x3a0):case _0x148ae0(0x36d):case _0x148ae0(0x62e):case'!':case _0x148ae0(0x614):case _0x148ae0(0x25e):return 0x0;break;case'HMPH':case _0x148ae0(0x157):case _0x148ae0(0x36f):case'?':case _0x148ae0(0x61a):case _0x148ae0(0x15d):return 0x1;break;case _0x148ae0(0x258):case _0x148ae0(0x64b):case _0x148ae0(0x5ae):case'SWEAT':case'LIGHT\x20BULB':return 0x2;break;default:return VisuMZ[_0x148ae0(0x2b9)][_0x148ae0(0x227)][_0x148ae0(0x1a2)](this);break;}},Game_CharacterBase['prototype']['forceCarrying']=function(){const _0x5d4909=_0x26bacd;this[_0x5d4909(0x568)]=!![];},Game_CharacterBase['prototype']['clearCarrying']=function(){const _0x57245b=_0x26bacd;this[_0x57245b(0x568)]=![];},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x2f4)]=function(){const _0x5192e1=_0x26bacd;this[_0x5192e1(0x235)]=!![];},Game_CharacterBase['prototype'][_0x26bacd(0x2d4)]=function(){const _0x45478c=_0x26bacd;this[_0x45478c(0x235)]=![];},Game_CharacterBase[_0x26bacd(0x42f)]['isShadowVisible']=function(){const _0x2bf3f4=_0x26bacd;if(this[_0x2bf3f4(0x428)]())return![];if(this[_0x2bf3f4(0x443)])return![];if(this[_0x2bf3f4(0x4c7)]==='')return![];if(this[_0x2bf3f4(0x1ea)]===Game_Vehicle)return![];if(this['isTransparent']())return![];return!![];},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x4ae)]=function(){const _0x5ce658=_0x26bacd;if(this['isOnLadder']())return!![];if(this[_0x5ce658(0x1ea)]===Game_Player&&this[_0x5ce658(0x64d)]())return!![];return![];},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x456)]=function(){const _0x268705=_0x26bacd;return VisuMZ[_0x268705(0x2b9)][_0x268705(0x3b3)][_0x268705(0x335)][_0x268705(0x427)];},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x1ae)]=function(){const _0x6050bd=_0x26bacd;return this[_0x6050bd(0x518)]();},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x40a)]=function(){const _0x2a57b1=_0x26bacd,_0x9b1c1a=$gameMap[_0x2a57b1(0x536)]();return Math[_0x2a57b1(0x2d8)](this['scrolledY']()*_0x9b1c1a+_0x9b1c1a);},Game_CharacterBase[_0x26bacd(0x27f)]=0x64,Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x501)]=function(_0x38bb8f,_0x5746a2){const _0xa540b=_0x26bacd;if(TouchInput['isPressed']())return![];if(!$gameMap['isSupportDiagonalMovement']())return![];if($gameMap[_0xa540b(0x318)](_0x38bb8f,_0x5746a2)[_0xa540b(0x52a)]>0x0)return![];if(!$gameMap[_0xa540b(0x51c)](_0x38bb8f,_0x5746a2))return![];const _0x3b4b48=$gameMap['_events'][_0xa540b(0x52a)];if(_0x3b4b48>=Game_CharacterBase[_0xa540b(0x27f)])return![];return!![];},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x676)]=function(_0x3274f5,_0x9a4122){const _0x5e0e3a=_0x26bacd;let _0x5bf378=this['findDirectionTo'](_0x3274f5,_0x9a4122);if(!this[_0x5e0e3a(0x501)](_0x3274f5,_0x9a4122))return _0x5bf378;if(this[_0x5e0e3a(0x2c0)](_0x3274f5,_0x9a4122))return _0x5bf378;const _0x4fdd57=_0x5bf378;if(_0x5bf378===0x2){if(_0x3274f5>this['x']&&this[_0x5e0e3a(0x1c6)](this['x'],this['y'],0x6))_0x5bf378=0x3;if(_0x3274f5<this['x']&&this[_0x5e0e3a(0x1c6)](this['x'],this['y'],0x4))_0x5bf378=0x1;}else{if(_0x5bf378===0x4){if(_0x9a4122>this['y']&&this['canPass'](this['x'],this['y'],0x4))_0x5bf378=0x1;if(_0x9a4122<this['y']&&this[_0x5e0e3a(0x1c6)](this['x'],this['y'],0x6))_0x5bf378=0x7;}else{if(_0x5bf378===0x6){if(_0x5e0e3a(0x199)===_0x5e0e3a(0x3db))return this[_0x5e0e3a(0x679)](_0x609a97);else{if(_0x9a4122>this['y']&&this[_0x5e0e3a(0x1c6)](this['x'],this['y'],0x4))_0x5bf378=0x3;if(_0x9a4122<this['y']&&this['canPass'](this['x'],this['y'],0x6))_0x5bf378=0x9;}}else{if(_0x5bf378===0x8){if(_0x3274f5>this['x']&&this[_0x5e0e3a(0x1c6)](this['x'],this['y'],0x6))_0x5bf378=0x9;if(_0x3274f5<this['x']&&this[_0x5e0e3a(0x1c6)](this['x'],this['y'],0x4))_0x5bf378=0x7;}}}}const _0x3e817d=$gameMap['roundXWithDirection'](this['x'],_0x5bf378),_0x2503e2=$gameMap['roundYWithDirection'](this['y'],_0x5bf378);if(this[_0x5e0e3a(0x2c0)](_0x3e817d,_0x2503e2))_0x5bf378=_0x4fdd57;return _0x5bf378;},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x62a)]=Game_CharacterBase['prototype'][_0x26bacd(0x1c6)],Game_CharacterBase[_0x26bacd(0x42f)]['canPass']=function(_0x1747fb,_0x47ab80,_0x5b5a54){const _0x574998=_0x26bacd;if(this[_0x574998(0x540)]===_0x574998(0x584)){if(_0x574998(0x1fc)===_0x574998(0x1fc))return this[_0x574998(0x462)]()[_0x574998(0x3f7)](_0x1747fb,_0x47ab80,_0x5b5a54);else{const _0x126e48=_0x8c3af3,_0x51dd7a=_0x44a9ec[_0x574998(0x27c)];if(_0x30c4a4[_0x574998(0x62f)]===_0x126e48[_0x574998(0x1cc)]){let _0x422815=_0x4cd0db['parameters'][0x0];_0x422815=this['convertVariableValuesInScriptCall'](_0x422815),_0x422815=this[_0x574998(0x342)](_0x422815),this[_0x574998(0x4d7)](_0xde4fee,_0x422815);}else _0xc700c7[_0x574998(0x2b9)][_0x574998(0x3fb)][_0x574998(0x1a2)](this,_0xe8e673);}}else return VisuMZ[_0x574998(0x2b9)][_0x574998(0x62a)]['call'](this,_0x1747fb,_0x47ab80,_0x5b5a54);},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x53d)]=function(){const _0x5f53b6=_0x26bacd;this[_0x5f53b6(0x4ce)]=0x0,this[_0x5f53b6(0x1c1)]=0x0;},VisuMZ['EventsMoveCore']['Game_CharacterBase_screenX']=Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x518)],Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x518)]=function(){const _0x50f748=_0x26bacd;return VisuMZ[_0x50f748(0x2b9)]['Game_CharacterBase_screenX']['call'](this)+(this[_0x50f748(0x4ce)]||0x0);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x44c)]=Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x22f)],Game_CharacterBase[_0x26bacd(0x42f)]['screenY']=function(){const _0x16bf9f=_0x26bacd;return VisuMZ['EventsMoveCore'][_0x16bf9f(0x44c)][_0x16bf9f(0x1a2)](this)+(this['_spriteOffsetY']||0x0);},Game_CharacterBase[_0x26bacd(0x4fe)]=VisuMZ[_0x26bacd(0x2b9)]['Settings'][_0x26bacd(0x335)][_0x26bacd(0x337)]??-0x6,Game_CharacterBase[_0x26bacd(0x42f)]['shiftY']=function(){const _0xd1d0b5=_0x26bacd;return this[_0xd1d0b5(0x153)]()?0x0:-Game_CharacterBase['DEFAULT_SHIFT_Y'];},Game_CharacterBase['prototype']['clearStepPattern']=function(){this['_stepPattern']='';},VisuMZ[_0x26bacd(0x2b9)]['Game_CharacterBase_updatePattern']=Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x16e)],Game_CharacterBase['prototype'][_0x26bacd(0x16e)]=function(){const _0x98d0a9=_0x26bacd;if(this[_0x98d0a9(0x610)])return;if(this['updatePatternEventsMoveCore']())return;VisuMZ[_0x98d0a9(0x2b9)]['Game_CharacterBase_updatePattern'][_0x98d0a9(0x1a2)](this);},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x4d0)]=function(){const _0x287472=_0x26bacd;if(!this[_0x287472(0x410)]()&&this['_stopCount']>0x0)return![];switch(String(this['_stepPattern'])[_0x287472(0x68e)]()[_0x287472(0x5fa)]()){case _0x287472(0x232):this['_pattern']+=0x1;if(this[_0x287472(0x17c)]>0x2)this[_0x287472(0x45b)](0x0);break;case _0x287472(0x514):this[_0x287472(0x17c)]-=0x1;if(this[_0x287472(0x17c)]<0x0)this['setPattern'](0x2);break;case _0x287472(0x4e1):case _0x287472(0x51f):this['turnRight90']();break;case _0x287472(0x32a):case _0x287472(0x3c5):case _0x287472(0x4ab):case _0x287472(0x1ab):this[_0x287472(0x312)]();break;default:return![];}return!![];},Game_CharacterBase['prototype']['getEventIconData']=function(){return $gameSystem['getEventIconData'](this);},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x3a8)]=function(){const _0x44a19b=_0x26bacd,_0x3e0f4f=this[_0x44a19b(0x4df)]();if(!_0x3e0f4f)return![];return _0x3e0f4f['iconIndex']>0x0;},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x1fd)]=function(){const _0x1679cc=_0x26bacd,_0x52e8aa=this[_0x1679cc(0x636)]();return $gameMap[_0x1679cc(0x2c4)](this['x'],_0x52e8aa);},Game_CharacterBase['prototype'][_0x26bacd(0x640)]=function(){const _0x5252d0=_0x26bacd,_0x325624=this[_0x5252d0(0x636)]();return $gameMap[_0x5252d0(0x602)](this['y'],_0x325624);},Game_CharacterBase['prototype'][_0x26bacd(0x50f)]=function(){const _0x5199b9=_0x26bacd,_0x979cd3=this[_0x5199b9(0x328)](this['direction']());return $gameMap[_0x5199b9(0x2c4)](this['x'],_0x979cd3);},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x3ae)]=function(){const _0xb999c9=_0x26bacd,_0x3f392a=this[_0xb999c9(0x328)](this[_0xb999c9(0x636)]());return $gameMap[_0xb999c9(0x602)](this['y'],_0x3f392a);},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x3f0)]=function(){const _0x2794ce=_0x26bacd,_0x26cb91=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x2794ce(0x636)]()];return $gameMap[_0x2794ce(0x2c4)](this['x'],_0x26cb91);},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x1b1)]=function(){const _0x160d1e=_0x26bacd,_0x60cbb7=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x160d1e(0x636)]()];return $gameMap[_0x160d1e(0x602)](this['y'],_0x60cbb7);},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x2f1)]=function(){const _0x201a47=_0x26bacd,_0x548208=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this['direction']()];return $gameMap[_0x201a47(0x2c4)](this['x'],_0x548208);},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x3bb)]=function(){const _0x3e60c9=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this['direction']()];return $gameMap['roundYWithDirection'](this['y'],_0x3e60c9);},VisuMZ[_0x26bacd(0x2b9)]['Game_Character_setMoveRoute']=Game_Character['prototype']['setMoveRoute'],Game_Character['prototype'][_0x26bacd(0x163)]=function(_0x5a004f){const _0x2c00f3=_0x26bacd;route=JsonEx[_0x2c00f3(0x16d)](_0x5a004f),VisuMZ[_0x2c00f3(0x2b9)]['Game_Character_setMoveRoute'][_0x2c00f3(0x1a2)](this,route);},VisuMZ['EventsMoveCore'][_0x26bacd(0x615)]=Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x1b9)],Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x1b9)]=function(_0x524483){const _0x34e48c=_0x26bacd;route=JsonEx[_0x34e48c(0x16d)](_0x524483),VisuMZ[_0x34e48c(0x2b9)][_0x34e48c(0x615)][_0x34e48c(0x1a2)](this,route);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x3fb)]=Game_Character['prototype'][_0x26bacd(0x4ef)],Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x4ef)]=function(_0x1ebee8){const _0x392528=_0x26bacd,_0x24765e=Game_Character,_0x355e23=_0x1ebee8[_0x392528(0x27c)];if(_0x1ebee8[_0x392528(0x62f)]===_0x24765e[_0x392528(0x1cc)]){let _0x5ca191=_0x1ebee8['parameters'][0x0];_0x5ca191=this[_0x392528(0x1dd)](_0x5ca191),_0x5ca191=this['convertSelfVariableValuesInScriptCall'](_0x5ca191),this[_0x392528(0x4d7)](_0x1ebee8,_0x5ca191);}else VisuMZ[_0x392528(0x2b9)]['Game_Character_processMoveCommand']['call'](this,_0x1ebee8);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x1dd)]=function(_0x38ac6f){const _0x56abbb=_0x26bacd,_0x3099c6=/\$gameVariables\.value\((\d+)\)/gi,_0x28afe8=/\\V\[(\d+)\]/gi;while(_0x38ac6f[_0x56abbb(0x224)](_0x3099c6)){_0x38ac6f=_0x38ac6f['replace'](_0x3099c6,(_0x581d86,_0x3e533b)=>$gameVariables[_0x56abbb(0x267)](parseInt(_0x3e533b)));}while(_0x38ac6f[_0x56abbb(0x224)](_0x28afe8)){_0x56abbb(0x662)!==_0x56abbb(0x5a9)?_0x38ac6f=_0x38ac6f['replace'](_0x28afe8,(_0x2ff189,_0x52f6c4)=>$gameVariables['value'](parseInt(_0x52f6c4))):_0xf30c91[0x2]=_0x5abed5(_0x48e5fd)[_0x56abbb(0x446)](0x0)['toUpperCase']()[_0x56abbb(0x5fa)]();}return _0x38ac6f;},Game_Character['prototype'][_0x26bacd(0x342)]=function(_0x49acef){const _0x8e904f=_0x26bacd,_0x145ce4=/\\SELFVAR\[(\d+)\]/gi;while(_0x49acef[_0x8e904f(0x224)](_0x145ce4)){if(_0x8e904f(0x1b7)!==_0x8e904f(0x1b7)){const _0x42022d=this['_attachPictureSprite'];if(!_0x42022d)return 0x0;return _0x42022d[_0x8e904f(0x423)][_0x8e904f(0x275)];}else _0x49acef=_0x49acef[_0x8e904f(0x480)](_0x145ce4,(_0x2aed66,_0x41687e)=>getSelfVariableValue(this[_0x8e904f(0x317)],this[_0x8e904f(0x65f)],parseInt(_0x41687e)));}return _0x49acef;},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x4d7)]=function(_0x3973c5,_0x31e066){const _0x3b1423=_0x26bacd;if(_0x31e066[_0x3b1423(0x224)](/ANIMATION:[ ](\d+)/i))return this[_0x3b1423(0x387)](Number(RegExp['$1']));if(_0x31e066[_0x3b1423(0x224)](/BALLOON:[ ](.*)/i))return this[_0x3b1423(0x1b8)](String(RegExp['$1']));if(_0x31e066[_0x3b1423(0x224)](/FADE IN:[ ](\d+)/i))return'mPzHi'!==_0x3b1423(0x29c)?this[_0x3b1423(0x245)](Number(RegExp['$1'])):this[_0x3b1423(0x5d3)](_0x307b27);if(_0x31e066[_0x3b1423(0x224)](/FADE OUT:[ ](\d+)/i))return this['processMoveRouteFadeOut'](Number(RegExp['$1']));if(_0x31e066[_0x3b1423(0x224)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i)){if(_0x3b1423(0x5b1)===_0x3b1423(0x5b1))return this['forceCarrying']();else for(const _0x44132d of _0x355516){const _0x52a0c8=_0x3b1423(0x508)[_0x3b1423(0x389)](_0x44132d,_0x3b1a1a);_0x273266[_0x52a0c8]&&(_0x261b13[_0x52a0c8]=_0x29398f[_0x52a0c8]['slice'](0x0));}}if(_0x31e066[_0x3b1423(0x224)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i)){if(_0x3b1423(0x4b9)!==_0x3b1423(0x4b9)){_0x1d0d79[_0x3b1423(0x164)](_0x40e99b,_0x45faed);const _0x8571a=_0x1dc39d[_0x3b1423(0x2d9)]||0x0;_0x18e203[_0x3b1423(0x53c)](_0x8571a);}else return this['clearCarrying']();}if(_0x31e066['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x3b1423(0x2f4)]();if(_0x31e066[_0x3b1423(0x224)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i)){if(_0x3b1423(0x39e)==='HMnQH'){const _0x2634a8=_0x1ddc8d[_0x3b1423(0x1f3)][_0x4ef5ec];_0x2634a8&&(_0x40de1d['mapId']=_0x2634a8[_0x3b1423(0x1ba)],_0x20de68[_0x3b1423(0x18a)]=_0x2634a8[_0x3b1423(0x67d)]);}else return this[_0x3b1423(0x2d4)]();}if(_0x31e066['match'](/HUG:[ ]LEFT/i))return this[_0x3b1423(0x483)](_0x3b1423(0x3d3));if(_0x31e066[_0x3b1423(0x224)](/HUG:[ ]RIGHT/i))return _0x3b1423(0x464)===_0x3b1423(0x464)?this['processMoveRouteHugWall'](_0x3b1423(0x596)):this[_0x3b1423(0x273)];if(_0x31e066[_0x3b1423(0x224)](/INDEX:[ ](\d+)/i)){if(_0x3b1423(0x632)===_0x3b1423(0x3bd)){const _0x97c8f=_0x21836c['_eventOverloadThreshold'];this['_eventOverload']=this['events']()[_0x3b1423(0x52a)]>_0x97c8f;if(this[_0x3b1423(0x252)]&&_0x4622a7[_0x3b1423(0x630)]()){}}else return this[_0x3b1423(0x358)](Number(RegExp['$1']));}if(_0x31e066[_0x3b1423(0x224)](/INDEX:[ ]([\+\-]\d+)/i)){if(_0x3b1423(0x41e)===_0x3b1423(0x41e)){const _0x24b6f4=this[_0x3b1423(0x249)]+Number(RegExp['$1']);return this[_0x3b1423(0x358)](_0x24b6f4);}else{if(this['checkExistingEntitiesAt'](_0x26cfb9,_0x5c9fa5))return![];if(!this[_0x3b1423(0x5f3)](_0xf0f362,_0x47de16,_0x3ebf5f))return![];}}if(_0x31e066[_0x3b1423(0x224)](/JUMP FORWARD:[ ](\d+)/i))return _0x3b1423(0x325)!==_0x3b1423(0x68c)?this['processMoveRouteJumpForward'](Number(RegExp['$1'])):this[_0x3b1423(0x358)](_0x2295db(_0x11b008['$1']));if(_0x31e066['match'](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x3b1423(0x5c6)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x31e066[_0x3b1423(0x224)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x23bc46=$gameMap[_0x3b1423(0x3b5)](Number(RegExp['$1']));return this[_0x3b1423(0x2b5)](_0x23bc46);}if(_0x31e066[_0x3b1423(0x224)](/JUMP TO PLAYER/i))return this[_0x3b1423(0x2b5)]($gamePlayer);if(_0x31e066[_0x3b1423(0x224)](/JUMP TO HOME/i)&&this['eventId']){if(_0x3b1423(0x563)==='iRhEN')this[_0x3b1423(0x2b4)]=!![];else{const _0x2fe27b=this['_randomHomeX'],_0x119685=this[_0x3b1423(0x2f8)];return this[_0x3b1423(0x5c6)](_0x2fe27b,_0x119685);}}if(_0x31e066[_0x3b1423(0x224)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x2b0b51=String(RegExp['$1']),_0x344ae1=this[_0x3b1423(0x647)](_0x31e066);return this[_0x3b1423(0x3c7)](_0x2b0b51,_0x344ae1);}if(_0x31e066[_0x3b1423(0x224)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x465f26=Number(RegExp['$1']),_0x1735a2=Number(RegExp['$2']),_0x35dbed=this[_0x3b1423(0x647)](_0x31e066);return this[_0x3b1423(0x4f6)](_0x465f26,_0x1735a2,_0x35dbed);}if(_0x31e066[_0x3b1423(0x224)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x37c97c=$gameMap[_0x3b1423(0x3b5)](Number(RegExp['$1'])),_0x3e20ba=this[_0x3b1423(0x647)](_0x31e066);return this[_0x3b1423(0x3e6)](_0x37c97c,_0x3e20ba);}if(_0x31e066[_0x3b1423(0x224)](/MOVE TO PLAYER/i)){if('pTxFK'!==_0x3b1423(0x1e2)){const _0x554bfb=this['checkCollisionKeywords'](_0x31e066);return this[_0x3b1423(0x3e6)]($gamePlayer,_0x554bfb);}else{if(!this[_0x3b1423(0x3b5)]())return;this[_0x3b1423(0x219)](),this[_0x3b1423(0x192)](),this[_0x3b1423(0x261)](),this[_0x3b1423(0x2f6)]();}}if(_0x31e066['match'](/MOVE TO HOME/i)&&this[_0x3b1423(0x18a)]){const _0x594331=this['_randomHomeX'],_0xaf09c2=this[_0x3b1423(0x2f8)],_0x4d5a8b=this[_0x3b1423(0x647)](_0x31e066);return this[_0x3b1423(0x4f6)](_0x594331,_0xaf09c2,_0x4d5a8b);}if(_0x31e066[_0x3b1423(0x224)](/MOVE LOWER LEFT:[ ](\d+)/i))return'OjxFN'!==_0x3b1423(0x38c)?(this[_0x3b1423(0x445)]=![],![]):this[_0x3b1423(0x43e)](0x1,Number(RegExp['$1']));if(_0x31e066[_0x3b1423(0x224)](/MOVE DOWN:[ ](\d+)/i)){if('jtMZq'==='sNcwj'){if(!_0x59ac13['ALLOW_LADDER_DASH']&&this[_0x3b1423(0x5d4)]())return![];if(this[_0x3b1423(0x235)])return!![];return _0x116edc[_0x3b1423(0x2b9)]['Game_CharacterBase_isDashing'][_0x3b1423(0x1a2)](this);}else return this['processMoveRouteMoveRepeat'](0x2,Number(RegExp['$1']));}if(_0x31e066[_0x3b1423(0x224)](/MOVE LOWER RIGHT:[ ](\d+)/i)){if(_0x3b1423(0x481)!==_0x3b1423(0x33b))return this[_0x3b1423(0x43e)](0x3,Number(RegExp['$1']));else this[_0x3b1423(0x32e)](_0x4ffd4e,_0xff9b3a);}if(_0x31e066['match'](/MOVE LEFT:[ ](\d+)/i)){if(_0x3b1423(0x454)===_0x3b1423(0x454))return this[_0x3b1423(0x43e)](0x4,Number(RegExp['$1']));else{_0x3e2291=_0x1b6058(_0x55480d['$1']),_0x4bc8fd=_0x21d0d6(_0x40c6e8['$2']);if(_0x53b925===0x0)_0x11764c=_0x4548e6['mapId']();}}if(_0x31e066[_0x3b1423(0x224)](/MOVE RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x6,Number(RegExp['$1']));if(_0x31e066[_0x3b1423(0x224)](/MOVE UPPER LEFT:[ ](\d+)/i)){if(_0x3b1423(0x51a)!==_0x3b1423(0x51a)){if(this[_0x3b1423(0x168)]===_0x56613e)this[_0x3b1423(0x376)]();if(this[_0x3b1423(0x168)]['EventAutoMovement']===_0x1e59c1)this[_0x3b1423(0x376)]();return this['_EventsMoveCoreSettings']['EventAutoMovement'];}else return this[_0x3b1423(0x43e)](0x7,Number(RegExp['$1']));}if(_0x31e066['match'](/MOVE UP:[ ](\d+)/i)){if(_0x3b1423(0x60d)!==_0x3b1423(0x441))return this['processMoveRouteMoveRepeat'](0x8,Number(RegExp['$1']));else{if(_0x5cce54[_0x3b1423(0x4a6)](_0x3e86e7,_0x36cede,_0x55700e,_0x3b1423(0x63f)))return this['isInVehicle']()&&this[_0x3b1423(0x462)]()?this['vehicle']()['isMapPassable'](_0x32df53,_0x2a92a8,_0x4f6571):!![];if(_0x531225[_0x3b1423(0x2fd)](_0x197c1f,_0x43c2bc,_0x3c8223,_0x3b1423(0x63f)))return![];return _0x135ca6['EventsMoveCore'][_0x3b1423(0x1d5)][_0x3b1423(0x1a2)](this,_0x465cd3,_0x4bb5cd,_0x32ddbb);}}if(_0x31e066[_0x3b1423(0x224)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x3b1423(0x43e)](0x9,Number(RegExp['$1']));if(_0x31e066[_0x3b1423(0x224)](/OPACITY:[ ](\d+)([%％])/i)){if(_0x3b1423(0x2b3)==='KLBUK')this[_0x3b1423(0x1bf)](_0x57eb8a,_0x2ef84c);else{const _0x34b154=Math[_0x3b1423(0x1dc)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x34b154['clamp'](0x0,0xff));}}if(_0x31e066['match'](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x2f0908=this[_0x3b1423(0x43a)]+Math[_0x3b1423(0x1dc)](Number(RegExp['$1'])/0x64*0xff);return this[_0x3b1423(0x528)](_0x2f0908[_0x3b1423(0x48e)](0x0,0xff));}if(_0x31e066[_0x3b1423(0x224)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x5e09c9=this[_0x3b1423(0x43a)]+Number(RegExp['$1']);return this[_0x3b1423(0x528)](_0x5e09c9[_0x3b1423(0x48e)](0x0,0xff));}if(_0x31e066[_0x3b1423(0x224)](/PATTERN LOCK:[ ](\d+)/i))return this[_0x3b1423(0x453)](Number(RegExp['$1']));if(_0x31e066[_0x3b1423(0x224)](/PATTERN UNLOCK/i))return this[_0x3b1423(0x610)]=![];if(_0x31e066['match'](/POSE:[ ](.*)/i)){const _0x45b01d=String(RegExp['$1'])['toUpperCase']()[_0x3b1423(0x5fa)]();return this[_0x3b1423(0x3da)](_0x45b01d);}if(_0x31e066[_0x3b1423(0x224)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('UTSFp'!=='jjYSg'){const _0x16ce4c=Number(RegExp['$1']),_0x52a0ef=Number(RegExp['$2']);return this[_0x3b1423(0x4a3)](_0x16ce4c,_0x52a0ef);}else this[_0x3b1423(0x37f)](_0x5362a9);}if(_0x31e066['match'](/STEP TOWARD EVENT:[ ](\d+)/i)){if('CXPps'!=='CXPps')this['setupPlayerVisibilityOverrides']();else{const _0x3a8724=$gameMap['event'](Number(RegExp['$1']));return this[_0x3b1423(0x5d3)](_0x3a8724);}}if(_0x31e066[_0x3b1423(0x224)](/STEP TOWARD PLAYER/i))return this[_0x3b1423(0x5d3)]($gamePlayer);if(_0x31e066[_0x3b1423(0x224)](/STEP TOWARD HOME/i)&&this[_0x3b1423(0x18a)]){const _0x366f16=this[_0x3b1423(0x159)],_0x42cb1e=this[_0x3b1423(0x2f8)];return this['processMoveRouteStepTo'](_0x366f16,_0x42cb1e);}if(_0x31e066['match'](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x3b1423(0x372)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x31e066[_0x3b1423(0x224)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x552a17=$gameMap[_0x3b1423(0x3b5)](Number(RegExp['$1']));return this[_0x3b1423(0x4f8)](_0x552a17);}if(_0x31e066[_0x3b1423(0x224)](/STEP AWAY FROM PLAYER/i))return this['moveAwayFromCharacter']($gamePlayer);if(_0x31e066['match'](/STEP AWAY FROM HOME/i)&&this[_0x3b1423(0x18a)]){if('CaTjD'===_0x3b1423(0x44b)){const _0x1c4996=this[_0x3b1423(0x364)]['direction']();let _0x6db488=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x3b1423(0x364)][_0x3b1423(0x55b)]&&(_0x6db488=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x6db488[_0x1c4996]-0x2)/0x2;}else{const _0x34fa31=this[_0x3b1423(0x159)],_0x293b32=this[_0x3b1423(0x2f8)];return this[_0x3b1423(0x372)](_0x34fa31,_0x293b32);}}if(_0x31e066[_0x3b1423(0x224)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x3b1423(0x488)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x31e066['match'](/TURN TO EVENT:[ ](\d+)/i)){if(_0x3b1423(0x605)===_0x3b1423(0x34a)){const _0x2e4281=_0x41e823(_0x597d20['$1'])[_0x3b1423(0x18b)]()[_0x3b1423(0x5fa)](),_0x3829cd=_0x3922a1(_0x1a77c7['$2']);this[_0x3b1423(0x608)][_0x2e4281]=_0x3829cd;}else{const _0x3a3811=$gameMap['event'](Number(RegExp['$1']));return this[_0x3b1423(0x679)](_0x3a3811);}}if(_0x31e066[_0x3b1423(0x224)](/TURN TO PLAYER/i))return this['turnTowardCharacter']($gamePlayer);if(_0x31e066[_0x3b1423(0x224)](/TURN TO HOME/i)&&this[_0x3b1423(0x18a)]){const _0x42efcc=this['_randomHomeX'],_0xac3310=this['_randomHomeY'];return this['turnTowardPoint'](_0x42efcc,_0xac3310);}if(_0x31e066[_0x3b1423(0x224)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x3b1423(0x545)===_0x3b1423(0x545))return this[_0x3b1423(0x47b)](Number(RegExp['$1']),Number(RegExp['$2']));else{if(!this[_0x3b1423(0x5a1)])return;if(!this[_0x3b1423(0x43c)](!![]))return;if(!this[_0x3b1423(0x5c9)](!![]))return;_0x31d49b['EventsMoveCore'][_0x3b1423(0x5ac)][_0x3b1423(0x1a2)](this);}}if(_0x31e066[_0x3b1423(0x224)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x1fdee7=$gameMap['event'](Number(RegExp['$1']));return this[_0x3b1423(0x19e)](_0x1fdee7);}if(_0x31e066['match'](/TURN AWAY FROM PLAYER/i)){if(_0x3b1423(0x1f7)===_0x3b1423(0x2c6))this['_forceDashing']=![];else return this['turnAwayFromCharacter']($gamePlayer);}if(_0x31e066[_0x3b1423(0x224)](/TURN AWAY FROM HOME/i)&&this['eventId']){const _0x590d1d=this[_0x3b1423(0x159)],_0x128d3d=this[_0x3b1423(0x2f8)];return this['turnAwayFromPoint'](_0x590d1d,_0x128d3d);}if(_0x31e066['match'](/TURN LOWER LEFT/i))return this[_0x3b1423(0x37f)](0x1);if(_0x31e066[_0x3b1423(0x224)](/TURN LOWER RIGHT/i)){if('KnBgT'===_0x3b1423(0x34d))return this[_0x3b1423(0x37f)](0x3);else this[_0x3b1423(0x5a1)][_0x3b1423(0x240)]();}if(_0x31e066['match'](/TURN UPPER LEFT/i)){if('yuqtJ'==='HsMOQ'){_0x141858[_0x3b1423(0x2b9)][_0x3b1423(0x51d)][_0x3b1423(0x1a2)](this);if(this[_0x3b1423(0x4a8)]===_0xb62f65)this[_0x3b1423(0x376)]();this['_paused']=![];}else return this[_0x3b1423(0x37f)](0x7);}if(_0x31e066['match'](/TURN UPPER RIGHT/i))return this[_0x3b1423(0x37f)](0x9);if(_0x31e066[_0x3b1423(0x224)](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x3b1423(0x692)](RegExp['$1'],RegExp['$2']);if(_0x31e066[_0x3b1423(0x224)](/Self Variable[ ](.*):[ ](.*)/i)){if(_0x3b1423(0x546)===_0x3b1423(0x546))return this['processMoveRouteSelfVariable'](RegExp['$1'],RegExp['$2']);else delete this[_0x3b1423(0x5da)][_0x3b1423(0x25c)];}if(_0x31e066[_0x3b1423(0x224)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x3b1423(0x2aa)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x31e066[_0x3b1423(0x224)](/TELEPORT TO EVENT:[ ](\d+)/i)){if(_0x3b1423(0x355)!==_0x3b1423(0x355)){if(this[_0x3b1423(0x364)][_0x3b1423(0x241)]()!=='')return![];}else{const _0x35659e=$gameMap[_0x3b1423(0x3b5)](Number(RegExp['$1']));return this[_0x3b1423(0x3ca)](_0x35659e);}}if(_0x31e066['match'](/TELEPORT TO PLAYER/i))return this[_0x3b1423(0x3ca)]($gamePlayer);if(_0x31e066[_0x3b1423(0x224)](/TELEPORT TO HOME/i)&&this[_0x3b1423(0x18a)]){if(_0x3b1423(0x3a1)===_0x3b1423(0x3a1)){const _0x5eafd8=this[_0x3b1423(0x159)],_0x388b45=this[_0x3b1423(0x2f8)];return this[_0x3b1423(0x2aa)](_0x5eafd8,_0x388b45);}else _0x47d99c[_0x3b1423(0x4bc)][_0x3b1423(0x496)](_0x2500b1);}try{VisuMZ[_0x3b1423(0x2b9)][_0x3b1423(0x3fb)][_0x3b1423(0x1a2)](this,_0x3973c5);}catch(_0x4cb597){if(_0x3b1423(0x68d)===_0x3b1423(0x32f))return _0x1c7722[_0x3b1423(0x2b9)][_0x3b1423(0x473)][_0x3b1423(0x1a2)](this);else{if($gameTemp['isPlaytest']())console[_0x3b1423(0x555)](_0x4cb597);}}},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x387)]=function(_0x2a78a1){const _0x48060f=_0x26bacd;$gameTemp[_0x48060f(0x5b8)]([this],_0x2a78a1);},Game_Character[_0x26bacd(0x42f)]['processMoveRouteBalloon']=function(_0x5024c5){const _0x249a2c=_0x26bacd;let _0x2025d8=0x0;switch(_0x5024c5[_0x249a2c(0x68e)]()['trim']()){case'!':case _0x249a2c(0x62e):_0x2025d8=0x1;break;case'?':case _0x249a2c(0x36f):_0x2025d8=0x2;break;case'MUSIC':case _0x249a2c(0x4b2):case _0x249a2c(0x5ae):case _0x249a2c(0x2e5):case _0x249a2c(0x255):_0x2025d8=0x3;break;case _0x249a2c(0x614):case _0x249a2c(0x5f4):_0x2025d8=0x4;break;case'ANGER':_0x2025d8=0x5;break;case _0x249a2c(0x21f):_0x2025d8=0x6;break;case _0x249a2c(0x25e):case _0x249a2c(0x25b):case'FRUSTRATION':_0x2025d8=0x7;break;case _0x249a2c(0x15d):case _0x249a2c(0x204):_0x2025d8=0x8;break;case _0x249a2c(0x378):case _0x249a2c(0x1fb):case _0x249a2c(0x531):case'LIGHT-BULB':case'LIGHTBULB':_0x2025d8=0x9;break;case'Z':case'ZZ':case _0x249a2c(0x38e):case _0x249a2c(0x65c):_0x2025d8=0xa;break;case'USER-DEFINED\x201':_0x2025d8=0xb;break;case _0x249a2c(0x184):_0x2025d8=0xc;break;case _0x249a2c(0x455):_0x2025d8=0xd;break;case _0x249a2c(0x59d):_0x2025d8=0xe;break;case _0x249a2c(0x344):_0x2025d8=0xf;break;}$gameTemp[_0x249a2c(0x565)](this,_0x2025d8);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x245)]=function(_0x5b487f){const _0x12d6d1=_0x26bacd;_0x5b487f+=this[_0x12d6d1(0x43a)],this[_0x12d6d1(0x528)](_0x5b487f[_0x12d6d1(0x48e)](0x0,0xff));if(this['_opacity']<0xff)this[_0x12d6d1(0x641)]--;},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x51b)]=function(_0x413d73){const _0x69cc18=_0x26bacd;_0x413d73=this[_0x69cc18(0x43a)]-_0x413d73,this['setOpacity'](_0x413d73[_0x69cc18(0x48e)](0x0,0xff));if(this[_0x69cc18(0x43a)]>0x0)this[_0x69cc18(0x641)]--;},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x483)]=function(_0x38d1e9){const _0x589f81=_0x26bacd,_0x5c4bd3=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x169dc2=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x3156f3=this[_0x589f81(0x636)](),_0x9928bf=(_0x38d1e9==='left'?_0x5c4bd3:_0x169dc2)[_0x3156f3],_0x218ad3=(_0x38d1e9==='left'?_0x169dc2:_0x5c4bd3)[_0x3156f3];if(this[_0x589f81(0x1c6)](this['x'],this['y'],_0x9928bf)){if(_0x589f81(0x3d4)===_0x589f81(0x4ee))this[_0x589f81(0x4cb)](_0x35f1c2,_0xc222df);else{if(_0x38d1e9===_0x589f81(0x3d3))this[_0x589f81(0x312)]();else{if('BqJHn'===_0x589f81(0x177))this[_0x589f81(0x53f)]();else{if(_0x298b4c)this[_0x589f81(0x5c6)](_0x4db4ac['x'],_0x378ec8['y']);}}}}else{if(!this[_0x589f81(0x1c6)](this['x'],this['y'],this[_0x589f81(0x636)]())){if(_0x589f81(0x1d6)==='LjPKU')this[_0x589f81(0x49d)](_0x587911>0x0?0x4:0x6);else{if(this['canPass'](this['x'],this['y'],_0x218ad3)){if(_0x38d1e9===_0x589f81(0x3d3)){if(_0x589f81(0x4c2)===_0x589f81(0x5cb)){if(_0x5981ac[_0x589f81(0x224)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x1b6535[_0x589f81(0x224)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];}else this[_0x589f81(0x53f)]();}else this[_0x589f81(0x312)]();}else{if('XOLSo'===_0x589f81(0x31b)){if(this['_EventIcons']===_0x107770)this[_0x589f81(0x376)]();const _0x38db6f=_0x589f81(0x310)[_0x589f81(0x389)](_0xcda6fa,_0x1f72ac);delete this[_0x589f81(0x5da)][_0x38db6f];}else this[_0x589f81(0x403)]();}}}}this[_0x589f81(0x1c6)](this['x'],this['y'],this[_0x589f81(0x636)]())&&this[_0x589f81(0x5f1)]();},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x358)]=function(_0x3323ed){const _0x15b683=_0x26bacd;if(ImageManager['isBigCharacter'](this[_0x15b683(0x4c7)]))return;_0x3323ed=_0x3323ed['clamp'](0x0,0x7),this[_0x15b683(0x2d6)](this[_0x15b683(0x4c7)],_0x3323ed);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x1e4)]=function(_0x31b35c){const _0x3e9210=_0x26bacd;switch(this[_0x3e9210(0x636)]()){case 0x1:this[_0x3e9210(0x24d)](-_0x31b35c,_0x31b35c);break;case 0x2:this[_0x3e9210(0x24d)](0x0,_0x31b35c);break;case 0x3:this['jump'](_0x31b35c,_0x31b35c);break;case 0x4:this[_0x3e9210(0x24d)](-_0x31b35c,0x0);break;case 0x6:this['jump'](_0x31b35c,0x0);break;case 0x7:this[_0x3e9210(0x24d)](-_0x31b35c,-_0x31b35c);break;case 0x8:this['jump'](0x0,-_0x31b35c);break;case 0x9:this[_0x3e9210(0x24d)](_0x31b35c,-_0x31b35c);break;}},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x5c6)]=function(_0x37900a,_0x4d782e){const _0x6e2c8e=_0x26bacd,_0x14204b=Math[_0x6e2c8e(0x1dc)](_0x37900a-this['x']),_0x258c9d=Math[_0x6e2c8e(0x1dc)](_0x4d782e-this['y']);this['jump'](_0x14204b,_0x258c9d);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x2b5)]=function(_0x1a7e48){const _0x54ba5d=_0x26bacd;if(_0x1a7e48)this[_0x54ba5d(0x5c6)](_0x1a7e48['x'],_0x1a7e48['y']);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x4a3)]=function(_0x2a539e,_0x824390,_0x19a552){const _0x1a0c94=_0x26bacd;let _0x437cf9=0x0;if(_0x19a552)$gameTemp['_moveAllowPlayerCollision']=!![];$gameMap[_0x1a0c94(0x5b5)]()?_0x437cf9=this[_0x1a0c94(0x676)](_0x2a539e,_0x824390):_0x437cf9=this[_0x1a0c94(0x689)](_0x2a539e,_0x824390);if(_0x19a552)$gameTemp[_0x1a0c94(0x4b1)]=![];this[_0x1a0c94(0x3b4)](_0x437cf9),this[_0x1a0c94(0x57a)](!![]);},Game_Character['prototype'][_0x26bacd(0x5d3)]=function(_0x338ad3){if(_0x338ad3)this['processMoveRouteStepTo'](_0x338ad3['x'],_0x338ad3['y']);},Game_Character[_0x26bacd(0x42f)]['processMoveRouteStepFrom']=function(_0x2520e7,_0x1c5b56){const _0x15a5ae=_0x26bacd,_0x104fa3=this[_0x15a5ae(0x4e9)](_0x2520e7),_0x59d8bd=this['deltaYFrom'](_0x1c5b56);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x647)]=function(_0x46fb47){const _0x503ad1=_0x26bacd;if(_0x46fb47[_0x503ad1(0x224)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x46fb47[_0x503ad1(0x224)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ['EventsMoveCore']['Game_Event_isCollidedWithPlayerCharacters']=Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x2fc)],Game_Event['prototype'][_0x26bacd(0x2fc)]=function(_0x215d3e,_0x46b169){const _0x2cc8af=_0x26bacd;if($gameTemp['_moveAllowPlayerCollision'])return![];return VisuMZ[_0x2cc8af(0x2b9)][_0x2cc8af(0x4de)][_0x2cc8af(0x1a2)](this,_0x215d3e,_0x46b169);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x3c7)]=function(_0x35ca98,_0x3f18ca){const _0x205733=_0x26bacd,_0x504843=['',_0x205733(0x211),_0x205733(0x17f),'LOWER\x20RIGHT','LEFT','','RIGHT',_0x205733(0x5b4),'UP',_0x205733(0x515)],_0x3ff15b=_0x504843[_0x205733(0x50d)](_0x35ca98['toUpperCase']()[_0x205733(0x5fa)]());if(_0x3ff15b<=0x0)return;if(_0x3f18ca)$gameTemp[_0x205733(0x4b1)]=!![];if(this[_0x205733(0x1c6)](this['x'],this['y'],_0x3ff15b)){if(_0x3f18ca)$gameTemp['_moveAllowPlayerCollision']=![];this[_0x205733(0x3b4)](_0x3ff15b),this['_moveRouteIndex']-=0x1;}if(_0x3f18ca)$gameTemp[_0x205733(0x4b1)]=![];},Game_Character[_0x26bacd(0x42f)]['processMoveRouteMoveTo']=function(_0x2430a1,_0x4c8248,_0xb5ed0a){const _0x55bb6e=_0x26bacd;this[_0x55bb6e(0x4a3)](_0x2430a1,_0x4c8248,_0xb5ed0a);if(this['x']!==_0x2430a1||this['y']!==_0x4c8248)this[_0x55bb6e(0x641)]--;},Game_Character['prototype'][_0x26bacd(0x3e6)]=function(_0x30928b,_0xbe8616){const _0x29da9b=_0x26bacd;if(_0x30928b&&!_0x30928b['_erased']){if(_0x29da9b(0x3e2)!=='MxzBT'){_0x4f3f29[_0x29da9b(0x164)](_0x3d71dc,_0x555129);const _0x1483de=_0x177974[_0x29da9b(0x29b)];_0x216448['setControlledFollowerID'](_0x1483de);}else{this['processMoveRouteMoveTo'](_0x30928b['x'],_0x30928b['y'],_0xbe8616);if(_0x30928b[_0x29da9b(0x606)]()&&this['isNormalPriority']()){const _0x4c25e4=$gameMap['distance'](this['x'],this['y'],_0x30928b['x'],_0x30928b['y']);if(_0x4c25e4<=0x1)this['_moveRouteIndex']++;}}}},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x43e)]=function(_0x4a5f8e,_0x45cf8a){const _0x4fa04b=_0x26bacd;_0x45cf8a=_0x45cf8a||0x0;const _0x3d2347={'code':0x1,'indent':null,'parameters':[]};_0x3d2347['code']=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x4a5f8e],this[_0x4fa04b(0x547)][_0x4fa04b(0x57b)][this[_0x4fa04b(0x641)]][_0x4fa04b(0x27c)][0x0]='';while(_0x45cf8a--){if(_0x4fa04b(0x2e2)===_0x4fa04b(0x1a1)){const _0x91b43c=_0x326228[_0x4fa04b(0x2c4)](_0x419a5a,_0x4eb899),_0x4e7791=_0x16a2c0[_0x4fa04b(0x602)](_0x281fbb,_0x2954a4),_0x2c70fd=_0x4cb3b1[_0x4fa04b(0x650)](_0x91b43c,_0x4e7791);return this[_0x4fa04b(0x223)][_0x4fa04b(0x18c)](_0x2c70fd);}else this[_0x4fa04b(0x547)][_0x4fa04b(0x57b)]['splice'](this[_0x4fa04b(0x641)]+0x1,0x0,_0x3d2347);}},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x453)]=function(_0x561384){const _0x17bf93=_0x26bacd;this[_0x17bf93(0x610)]=!![],this[_0x17bf93(0x45b)](_0x561384);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x692)]=function(_0x560168,_0x451006){const _0x5ec306=_0x26bacd;if(this===$gamePlayer)return;const _0x328430=[this['_mapId'],this['_eventId'],'A'];if(_0x560168[_0x5ec306(0x224)](/\b[ABCD]\b/i)){if(_0x5ec306(0x3ac)!=='DIbFZ')_0x328430[0x2]=String(_0x560168)[_0x5ec306(0x446)](0x0)['toUpperCase']()['trim']();else{_0x24e195[_0x5ec306(0x164)](_0x4839ab,_0x42dd1f);const _0x1708fc=_0x2bace8[_0x5ec306(0x2fb)]();if(!_0x312a6f)return;const _0x154155=_0x25d4c7[_0x5ec306(0x3b5)](_0x326181[_0x5ec306(0x20c)]||_0x1708fc[_0x5ec306(0x18a)]());if(_0x154155)_0x154155['saveEventLocation']();}}else _0x328430[0x2]=_0x5ec306(0x3cf)['format'](_0x560168);switch(_0x451006[_0x5ec306(0x68e)]()[_0x5ec306(0x5fa)]()){case'ON':case _0x5ec306(0x322):$gameSelfSwitches[_0x5ec306(0x688)](_0x328430,!![]);break;case _0x5ec306(0x28b):case _0x5ec306(0x5b6):$gameSelfSwitches[_0x5ec306(0x688)](_0x328430,![]);break;case _0x5ec306(0x251):$gameSelfSwitches[_0x5ec306(0x688)](_0x328430,!$gameSelfSwitches[_0x5ec306(0x267)](_0x328430));break;}},Game_Character[_0x26bacd(0x42f)]['processMoveRouteSelfVariable']=function(_0xca4744,_0x9ef5d){const _0x6919ec=_0x26bacd;if(this===$gamePlayer)return;const _0xba80ef=[this[_0x6919ec(0x317)],this[_0x6919ec(0x65f)],_0x6919ec(0x60c)[_0x6919ec(0x389)](_0xca4744)];$gameSelfSwitches[_0x6919ec(0x688)](_0xba80ef,Number(_0x9ef5d));},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x2aa)]=function(_0x1168ab,_0x5091a5){const _0x310a9c=_0x26bacd;this[_0x310a9c(0x4cb)](_0x1168ab,_0x5091a5);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x3ca)]=function(_0x59c69b){if(_0x59c69b)this['processMoveRouteTeleportTo'](_0x59c69b['x'],_0x59c69b['y']);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x53f)]=function(){const _0x3ba9d3=_0x26bacd;switch(this[_0x3ba9d3(0x636)]()){case 0x1:this[_0x3ba9d3(0x37f)](0x7);break;case 0x2:this['setDirection'](0x4);break;case 0x3:this[_0x3ba9d3(0x37f)](0x1);break;case 0x4:this[_0x3ba9d3(0x37f)](0x8);break;case 0x6:this[_0x3ba9d3(0x37f)](0x2);break;case 0x7:this[_0x3ba9d3(0x37f)](0x9);break;case 0x8:this[_0x3ba9d3(0x37f)](0x6);break;case 0x9:this[_0x3ba9d3(0x37f)](0x3);break;}},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x312)]=function(){const _0x10cb1d=_0x26bacd;switch(this[_0x10cb1d(0x636)]()){case 0x1:this[_0x10cb1d(0x37f)](0x3);break;case 0x2:this['setDirection'](0x6);break;case 0x3:this[_0x10cb1d(0x37f)](0x9);break;case 0x4:this[_0x10cb1d(0x37f)](0x2);break;case 0x6:this[_0x10cb1d(0x37f)](0x8);break;case 0x7:this[_0x10cb1d(0x37f)](0x1);break;case 0x8:this[_0x10cb1d(0x37f)](0x4);break;case 0x9:this[_0x10cb1d(0x37f)](0x7);break;}},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x4ea)]=function(_0xae55f8,_0x44f5c8,_0x39bf8d){const _0x1aac56=_0x26bacd,_0x3e75be=this[_0x1aac56(0x4e9)](_0xae55f8),_0xb60f99=this[_0x1aac56(0x499)](_0x44f5c8);if($gameMap[_0x1aac56(0x5b5)]()){if(_0x1aac56(0x479)!==_0x1aac56(0x524)){if(_0x39bf8d||this[_0x1aac56(0x360)]()){if(_0x1aac56(0x1cf)===_0x1aac56(0x1cf)){if(_0x3e75be>0x0&&_0xb60f99<0x0)return 0x1;if(_0x3e75be<0x0&&_0xb60f99<0x0)return 0x3;if(_0x3e75be>0x0&&_0xb60f99>0x0)return 0x7;if(_0x3e75be<0x0&&_0xb60f99>0x0)return 0x9;}else return!!this['mapValue'](_0x1f773b);}}else{_0x39c87e['ConvertParams'](_0x49a2a9,_0x5205f4);const _0x1567bb=_0x4ef059[_0x1aac56(0x2fb)]();_0x1d106e['MapId']=_0x3779c5[_0x1aac56(0x2fe)]||_0x2f6e4e['mapId'](),_0x3fc7ba[_0x1aac56(0x5f2)](_0x6c23ce['MapId'],_0x2562c3['EventId']||_0x1567bb[_0x1aac56(0x18a)]());}}if(Math[_0x1aac56(0x444)](_0x3e75be)>Math[_0x1aac56(0x444)](_0xb60f99))return _0x3e75be>0x0?0x4:0x6;else{if(_0xb60f99!==0x0){if(_0x1aac56(0x579)===_0x1aac56(0x34f)){if(!this[_0x1aac56(0x26f)][_0x1aac56(0x1d0)])return![];return _0x399031[_0x1aac56(0x42f)][_0x1aac56(0x3ad)][_0x1aac56(0x1a2)](this);}else return _0xb60f99>0x0?0x8:0x2;}}return 0x0;},Game_Character['prototype'][_0x26bacd(0x5e3)]=function(_0x5c9a53,_0x2adfd5,_0x24c6cd){const _0x3dbbad=_0x26bacd,_0x53ac2a=this[_0x3dbbad(0x4e9)](_0x5c9a53),_0x5470a2=this[_0x3dbbad(0x499)](_0x2adfd5);if($gameMap[_0x3dbbad(0x5b5)]()){if(_0x24c6cd||this['isSpriteVS8dir']()){if(_0x3dbbad(0x3e1)!==_0x3dbbad(0x20e)){if(_0x53ac2a>0x0&&_0x5470a2<0x0)return 0x9;if(_0x53ac2a<0x0&&_0x5470a2<0x0)return 0x7;if(_0x53ac2a>0x0&&_0x5470a2>0x0)return 0x3;if(_0x53ac2a<0x0&&_0x5470a2>0x0)return 0x1;}else _0x1362d8[_0x3dbbad(0x2b9)]['Game_Timer_initialize'][_0x3dbbad(0x1a2)](this),this[_0x3dbbad(0x376)]();}}if(Math[_0x3dbbad(0x444)](_0x53ac2a)>Math[_0x3dbbad(0x444)](_0x5470a2)){if(_0x3dbbad(0x2da)===_0x3dbbad(0x1e9)){if(_0x2635cd)return _0xf514b;}else return _0x53ac2a>0x0?0x6:0x4;}else{if(_0x5470a2!==0x0)return _0x5470a2>0x0?0x2:0x8;}return 0x0;},Game_Character['prototype'][_0x26bacd(0x488)]=function(_0x5eeca8,_0x49251f){const _0x403682=_0x26bacd,_0x37a1b8=this[_0x403682(0x4ea)](_0x5eeca8,_0x49251f,!![]);if(_0x37a1b8)this[_0x403682(0x3b4)](_0x37a1b8);},Game_Character[_0x26bacd(0x42f)]['moveAwayFromPoint']=function(_0x25010e,_0x19d5b9){const _0x14e47f=_0x26bacd,_0x5a60e6=this['getDirectionFromPoint'](_0x25010e,_0x19d5b9,!![]);if(_0x5a60e6)this[_0x14e47f(0x3b4)](_0x5a60e6);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x5e1)]=function(_0x9cd844,_0x478838){const _0x1f4cc8=_0x26bacd,_0x98b3bb=this[_0x1f4cc8(0x4ea)](_0x9cd844,_0x478838,![]);if(_0x98b3bb)this[_0x1f4cc8(0x37f)](_0x98b3bb);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x47b)]=function(_0x5be073,_0x5ae4f1){const _0x163c55=_0x26bacd,_0x2a37eb=this[_0x163c55(0x5e3)](_0x5be073,_0x5ae4f1,![]);if(_0x2a37eb)this['setDirection'](_0x2a37eb);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x34e)]=function(_0x4702e8){if(_0x4702e8)this['moveTowardPoint'](_0x4702e8['x'],_0x4702e8['y']);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x4f8)]=function(_0x4ba072){const _0x253138=_0x26bacd;if(_0x4ba072)this[_0x253138(0x372)](_0x4ba072['x'],_0x4ba072['y']);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x679)]=function(_0xb41487){if(_0xb41487)this['turnTowardPoint'](_0xb41487['x'],_0xb41487['y']);},Game_Character[_0x26bacd(0x42f)][_0x26bacd(0x19e)]=function(_0x11cae5){if(_0x11cae5)this['turnAwayFromPoint'](_0x11cae5['x'],_0x11cae5['y']);},VisuMZ['EventsMoveCore'][_0x26bacd(0x60a)]=Game_Player[_0x26bacd(0x42f)][_0x26bacd(0x304)],Game_Player['prototype'][_0x26bacd(0x304)]=function(){const _0xc53d4d=_0x26bacd;if(!Game_CharacterBase[_0xc53d4d(0x49c)]&&this['isOnLadder']())return![];if(this[_0xc53d4d(0x235)])return!![];return VisuMZ['EventsMoveCore'][_0xc53d4d(0x60a)][_0xc53d4d(0x1a2)](this);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x15a)]=Game_Player['prototype'][_0x26bacd(0x407)],Game_Player[_0x26bacd(0x42f)][_0x26bacd(0x407)]=function(){const _0x5dcdac=_0x26bacd;if($gameMap[_0x5dcdac(0x5b5)]())return this[_0x5dcdac(0x43f)]();else{if(_0x5dcdac(0x1e3)===_0x5dcdac(0x1e3))return VisuMZ[_0x5dcdac(0x2b9)][_0x5dcdac(0x15a)][_0x5dcdac(0x1a2)](this);else _0x4a1609[0x2]='Self\x20Switch\x20%1'['format'](_0x465e25);}},Game_Player[_0x26bacd(0x42f)][_0x26bacd(0x43f)]=function(){const _0x404c1c=_0x26bacd;return Input[_0x404c1c(0x25f)];},Game_Player[_0x26bacd(0x42f)][_0x26bacd(0x217)]=function(){const _0x37a415=_0x26bacd;if($gameSystem[_0x37a415(0x63c)]())return 0x0;if(!this[_0x37a415(0x42c)]()&&this[_0x37a415(0x562)]()){let _0x5d9abf=this['getInputDirection']();if(_0x5d9abf>0x0){if(_0x37a415(0x41a)===_0x37a415(0x288)){const _0xd0b26e=_0x37a415(0x2e1)['format'](_0x4d8b6d[_0x37a415(0x317)]),_0x3bdefa=_0x239878[_0x37a415(0x4dc)](this[_0x37a415(0x17a)])['filter'](_0x22e599=>_0x22e599[_0x37a415(0x512)](_0xd0b26e));while(_0x3bdefa[_0x37a415(0x52a)]>0x0){const _0x54079b=_0x3bdefa['shift']();delete this[_0x37a415(0x17a)][_0x54079b];}_0x42232b===_0x18a235['mapId']()&&_0x175919[_0x37a415(0x174)]();}else $gameTemp['clearDestination']();}else{if($gameTemp[_0x37a415(0x39d)]()){const _0x3953f5=$gameTemp['destinationX'](),_0x26d945=$gameTemp[_0x37a415(0x1bd)]();this[_0x37a415(0x501)](_0x3953f5,_0x26d945)?_0x5d9abf=this[_0x37a415(0x676)](_0x3953f5,_0x26d945):_0x37a415(0x502)!==_0x37a415(0x502)?this[_0x37a415(0x1db)][_0x37a415(0x577)]=0x0:_0x5d9abf=this['findDirectionTo'](_0x3953f5,_0x26d945);}}_0x5d9abf>0x0?(this[_0x37a415(0x617)]=this['_inputTime']||0x0,this[_0x37a415(0x4b7)]()?this[_0x37a415(0x37f)](_0x5d9abf):this[_0x37a415(0x683)](_0x5d9abf),this[_0x37a415(0x617)]++):this['_inputTime']=0x0;}},Game_Player['prototype']['isTurnInPlace']=function(){const _0x548cb2=_0x26bacd,_0x2311ef=VisuMZ[_0x548cb2(0x2b9)][_0x548cb2(0x3b3)]['Movement'];if(!_0x2311ef[_0x548cb2(0x2d0)])return![];if($gameTemp[_0x548cb2(0x39d)]())return![];if(this[_0x548cb2(0x304)]()||this['isMoving']()||this[_0x548cb2(0x5d4)]())return![];return this[_0x548cb2(0x617)]<_0x2311ef[_0x548cb2(0x4d6)];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x5b9)]=Game_Player['prototype'][_0x26bacd(0x683)],Game_Player[_0x26bacd(0x42f)][_0x26bacd(0x683)]=function(_0x2efc70){const _0x59f43e=_0x26bacd;if($gameMap[_0x59f43e(0x5b5)]()){if(_0x59f43e(0x5ed)!=='aluip')this[_0x59f43e(0x3b4)](_0x2efc70);else{const _0x3377f6=[_0x2b779f,_0x9667d6,'Self\x20Variable\x20%1'[_0x59f43e(0x389)](_0x16e2ae)];return _0x189a35[_0x59f43e(0x267)](_0x3377f6);}}else{if(_0x59f43e(0x26e)===_0x59f43e(0x26e))VisuMZ[_0x59f43e(0x2b9)][_0x59f43e(0x5b9)]['call'](this,_0x2efc70);else{if(_0x14bbed[_0x59f43e(0x4d4)](_0x30aa0e))this[_0x59f43e(0x32e)](_0x106c6c,_0x730d8);else _0x1ec051['isMapSwitch'](_0xdfde78)?this[_0x59f43e(0x1bf)](_0x2756d1,_0xedca5f):_0x318d40[_0x59f43e(0x2b9)][_0x59f43e(0x691)]['call'](this,_0x54f192,_0x519dcf);}}},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x1d5)]=Game_Player[_0x26bacd(0x42f)][_0x26bacd(0x1a6)],Game_Player[_0x26bacd(0x42f)][_0x26bacd(0x1a6)]=function(_0x532fc4,_0x3aaf5e,_0x4dc57e){const _0xa35760=_0x26bacd;if($gameMap[_0xa35760(0x4a6)](_0x532fc4,_0x3aaf5e,_0x4dc57e,'player'))return this[_0xa35760(0x64d)]()&&this[_0xa35760(0x462)]()?this['vehicle']()[_0xa35760(0x1a6)](_0x532fc4,_0x3aaf5e,_0x4dc57e):'zIvnX'===_0xa35760(0x3c8)?this['getPosingCharacterIndex']():!![];if($gameMap[_0xa35760(0x2fd)](_0x532fc4,_0x3aaf5e,_0x4dc57e,_0xa35760(0x63f)))return![];return VisuMZ[_0xa35760(0x2b9)][_0xa35760(0x1d5)][_0xa35760(0x1a2)](this,_0x532fc4,_0x3aaf5e,_0x4dc57e);},VisuMZ['EventsMoveCore'][_0x26bacd(0x197)]=Game_Player[_0x26bacd(0x42f)]['checkEventTriggerHere'],Game_Player[_0x26bacd(0x42f)]['checkEventTriggerHere']=function(_0x2c8084){const _0x3f7eee=_0x26bacd;VisuMZ['EventsMoveCore'][_0x3f7eee(0x197)][_0x3f7eee(0x1a2)](this,_0x2c8084);if(this[_0x3f7eee(0x193)]()){this[_0x3f7eee(0x3f3)](_0x2c8084);if(_0x2c8084[_0x3f7eee(0x18c)](0x0)&&this[_0x3f7eee(0x15f)]()===_0x3f7eee(0x45c))this['startMapCommonEventOnOK'](this['x'],this['y']);else(_0x2c8084['includes'](0x1)||_0x2c8084[_0x3f7eee(0x18c)](0x2))&&this[_0x3f7eee(0x517)]();}},VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerThere']=Game_Player[_0x26bacd(0x42f)][_0x26bacd(0x4c5)],Game_Player[_0x26bacd(0x42f)]['checkEventTriggerThere']=function(_0xd161b4){const _0x4ee0fc=_0x26bacd;VisuMZ[_0x4ee0fc(0x2b9)]['Game_Player_checkEventTriggerThere']['call'](this,_0xd161b4);if(this[_0x4ee0fc(0x193)]()&&_0xd161b4[_0x4ee0fc(0x18c)](0x0)&&this[_0x4ee0fc(0x15f)]()===_0x4ee0fc(0x3a4)){if(_0x4ee0fc(0x1af)!=='DSbWC'){const _0x49fb39=this[_0x4ee0fc(0x636)](),_0x40b2ad=$gameMap[_0x4ee0fc(0x2c4)](this['x'],_0x49fb39),_0x296480=$gameMap[_0x4ee0fc(0x602)](this['y'],_0x49fb39);this[_0x4ee0fc(0x550)](_0x40b2ad,_0x296480);}else{if(_0x27731f[_0x4ee0fc(0x538)]())return![];if(_0x4941be['isPlayerForceHidden']())return!![];}}},Game_Player['prototype'][_0x26bacd(0x3f3)]=function(_0x56a971){const _0x5dbcf5=_0x26bacd;if($gameMap[_0x5dbcf5(0x299)]())return;if($gameMap[_0x5dbcf5(0x1c2)]())return;const _0xb78d74=$gameMap['events']();for(const _0x2ce8ff of _0xb78d74){if('ojuiS'!==_0x5dbcf5(0x5af))this['_shadowSprite']['z']=this['z']-0x1;else{if(!_0x2ce8ff)continue;if(!_0x2ce8ff[_0x5dbcf5(0x66c)](_0x56a971))continue;if(this['meetActivationRegionConditions'](_0x2ce8ff))return _0x2ce8ff['start']();if(this['meetActivationProximityConditions'](_0x2ce8ff))return _0x2ce8ff[_0x5dbcf5(0x581)]();}}},Game_Player['prototype'][_0x26bacd(0x59c)]=function(_0x3151ab){const _0x4d08c8=_0x26bacd;if($gameMap[_0x4d08c8(0x299)]())return![];if($gameMap[_0x4d08c8(0x1c2)]())return![];return _0x3151ab[_0x4d08c8(0x36c)]()[_0x4d08c8(0x18c)](this[_0x4d08c8(0x650)]());},Game_Player[_0x26bacd(0x42f)]['meetActivationProximityConditions']=function(_0x8f9674){const _0xe0ad4b=_0x26bacd;if($gameMap[_0xe0ad4b(0x299)]())return![];if($gameMap[_0xe0ad4b(0x1c2)]())return![];if([_0xe0ad4b(0x490),_0xe0ad4b(0x4cd)][_0xe0ad4b(0x18c)](_0x8f9674[_0xe0ad4b(0x48d)]()))return![];const _0x45794f=_0x8f9674[_0xe0ad4b(0x48d)](),_0x28fe3e=_0x8f9674[_0xe0ad4b(0x2ec)]();switch(_0x45794f){case'radius':const _0x58ff1f=$gameMap[_0xe0ad4b(0x287)](this['x'],this['y'],_0x8f9674['x'],_0x8f9674['y']);return _0x8f9674[_0xe0ad4b(0x2ec)]()>=_0x58ff1f;break;case _0xe0ad4b(0x202):return _0x28fe3e>=Math['abs'](_0x8f9674[_0xe0ad4b(0x4e9)](this['x']))&&_0x28fe3e>=Math['abs'](_0x8f9674[_0xe0ad4b(0x499)](this['y']));break;case _0xe0ad4b(0x33f):return _0x28fe3e>=Math[_0xe0ad4b(0x444)](_0x8f9674[_0xe0ad4b(0x499)](this['y']));break;case _0xe0ad4b(0x529):return _0x28fe3e>=Math[_0xe0ad4b(0x444)](_0x8f9674[_0xe0ad4b(0x4e9)](this['x']));break;case _0xe0ad4b(0x572):return![];break;}},Game_Player[_0x26bacd(0x42f)]['startMapCommonEventOnOK']=function(_0x55bb2e,_0xe01e1f){const _0x415941=_0x26bacd;if($gameMap[_0x415941(0x299)]())return;if($gameMap['isAnyEventStarting']())return;let _0x4db69b=VisuMZ[_0x415941(0x2b9)][_0x415941(0x3b3)][_0x415941(0x54d)],_0x59e844=$gameMap[_0x415941(0x650)](_0x55bb2e,_0xe01e1f);const _0x168b49=_0x415941(0x426)[_0x415941(0x389)](_0x59e844);if(_0x4db69b[_0x168b49]){if(_0x415941(0x295)===_0x415941(0x327)){if(_0x61ee6a)this[_0x415941(0x47b)](_0x147a2e['x'],_0x2375c6['y']);}else $gameTemp['reserveCommonEvent'](_0x4db69b[_0x168b49]);}},Game_Player[_0x26bacd(0x42f)]['startMapCommonEventOnOKTarget']=function(){const _0x513c68=_0x26bacd;return VisuMZ[_0x513c68(0x2b9)]['Settings'][_0x513c68(0x16a)];},Game_Player[_0x26bacd(0x42f)][_0x26bacd(0x517)]=function(){const _0x1dc8f0=_0x26bacd;if($gameMap[_0x1dc8f0(0x299)]())return;if($gameMap['isAnyEventStarting']())return;let _0x1952b0=VisuMZ[_0x1dc8f0(0x2b9)]['Settings'][_0x1dc8f0(0x447)];const _0x2b9afb='Region%1'[_0x1dc8f0(0x389)](this[_0x1dc8f0(0x650)]());if(_0x1952b0[_0x2b9afb]){if(_0x1dc8f0(0x658)===_0x1dc8f0(0x658))$gameTemp['reserveCommonEvent'](_0x1952b0[_0x2b9afb]);else{var _0x33e6ed=_0x4f84a9[_0x1dc8f0(0x2b9)][_0x1dc8f0(0x5c0)][_0x1dc8f0(0x1a2)](this,_0x3cec33);return _0x33e6ed&&this['CPCsMet'](_0x3f6f1d);}}},VisuMZ['EventsMoveCore']['Game_Player_increaseSteps']=Game_Player[_0x26bacd(0x42f)][_0x26bacd(0x298)],Game_Player[_0x26bacd(0x42f)]['increaseSteps']=function(){const _0x3882ba=_0x26bacd;VisuMZ[_0x3882ba(0x2b9)][_0x3882ba(0x549)][_0x3882ba(0x1a2)](this),VisuMZ[_0x3882ba(0x324)](0x0);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x4fa)]=Game_Follower[_0x26bacd(0x42f)][_0x26bacd(0x247)],Game_Follower[_0x26bacd(0x42f)][_0x26bacd(0x247)]=function(_0x165298){const _0x4a0d94=_0x26bacd;VisuMZ[_0x4a0d94(0x2b9)][_0x4a0d94(0x4fa)][_0x4a0d94(0x1a2)](this,_0x165298),this['_chaseOff']=![];},Game_Follower[_0x26bacd(0x42f)]['isDashing']=function(){const _0x52085e=_0x26bacd;if(this['_chaseOff'])return Game_Character['prototype'][_0x52085e(0x304)][_0x52085e(0x1a2)](this);return $gamePlayer[_0x52085e(0x304)]();},Game_Follower[_0x26bacd(0x42f)][_0x26bacd(0x309)]=function(){const _0x56a030=_0x26bacd;if(this[_0x56a030(0x45e)])return Game_Character[_0x56a030(0x42f)][_0x56a030(0x309)][_0x56a030(0x1a2)](this);return $gamePlayer[_0x56a030(0x309)]()&&this[_0x56a030(0x388)];},Game_Follower[_0x26bacd(0x42f)][_0x26bacd(0x5bd)]=function(){const _0x551aaa=_0x26bacd;return $gamePlayer[_0x551aaa(0x5bd)]();},Game_Follower[_0x26bacd(0x42f)][_0x26bacd(0x162)]=function(){const _0x2b0791=_0x26bacd;Game_Character[_0x2b0791(0x42f)][_0x2b0791(0x162)]['call'](this);if(this[_0x2b0791(0x375)]>0x0){if(_0x2b0791(0x533)===_0x2b0791(0x613)){if(_0x62c18c)_0x389e74[_0x2b0791(0x1ac)]();_0x290d65[_0x2b0791(0x2b9)]['Scene_Load_onLoadSuccess'][_0x2b0791(0x1a2)](this);}else this['_actuallyMoving']=![];}},Game_Follower['prototype'][_0x26bacd(0x3c9)]=function(_0x112de7){const _0x35bb14=_0x26bacd;this[_0x35bb14(0x45e)]=_0x112de7;},VisuMZ['EventsMoveCore'][_0x26bacd(0x22a)]=Game_Follower[_0x26bacd(0x42f)]['chaseCharacter'],Game_Follower[_0x26bacd(0x42f)]['chaseCharacter']=function(_0x4aa42e){const _0x477cf0=_0x26bacd;if(this[_0x477cf0(0x45e)])return;if($gameSystem[_0x477cf0(0x37d)]())return;VisuMZ[_0x477cf0(0x2b9)][_0x477cf0(0x22a)]['call'](this,_0x4aa42e),this[_0x477cf0(0x388)]=!![];},VisuMZ[_0x26bacd(0x2b9)]['Game_Vehicle_isMapPassable']=Game_Vehicle['prototype'][_0x26bacd(0x1a6)],Game_Vehicle[_0x26bacd(0x42f)]['isMapPassable']=function(_0x57476e,_0x292a5b,_0x32b2dc){const _0x135500=_0x26bacd;if($gameMap[_0x135500(0x4a6)](_0x57476e,_0x292a5b,_0x32b2dc,this[_0x135500(0x156)]))return!![];if($gameMap[_0x135500(0x2fd)](_0x57476e,_0x292a5b,_0x32b2dc,this[_0x135500(0x156)]))return![];return VisuMZ[_0x135500(0x2b9)][_0x135500(0x2e4)][_0x135500(0x1a2)](this,_0x57476e,_0x292a5b,_0x32b2dc);},Game_Vehicle['prototype']['isAirshipPassable']=function(_0x374c1e,_0x34f2b0,_0x1c89bb){const _0x548462=_0x26bacd;if($gameMap[_0x548462(0x4a6)](_0x374c1e,_0x34f2b0,_0x1c89bb,this[_0x548462(0x156)]))return!![];if($gameMap[_0x548462(0x2fd)](_0x374c1e,_0x34f2b0,_0x1c89bb,this[_0x548462(0x156)]))return![];return VisuMZ[_0x548462(0x2b9)][_0x548462(0x62a)][_0x548462(0x1a2)]($gamePlayer,_0x374c1e,_0x34f2b0,_0x1c89bb);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x4eb)]=Game_Vehicle[_0x26bacd(0x42f)][_0x26bacd(0x448)],Game_Vehicle[_0x26bacd(0x42f)][_0x26bacd(0x448)]=function(_0x24227d,_0x5f50f0,_0x2e8c95){const _0x43971e=_0x26bacd;if($gameMap['isRegionDockable'](_0x24227d,_0x5f50f0,_0x2e8c95,this[_0x43971e(0x156)]))return!![];const _0x1c8b04=this[_0x43971e(0x156)]['charAt'](0x0)[_0x43971e(0x68e)]()+this[_0x43971e(0x156)]['slice'](0x1),_0x530f1c=_0x43971e(0x381)['format'](_0x1c8b04);if(VisuMZ[_0x43971e(0x2b9)][_0x43971e(0x3b3)][_0x43971e(0x272)][_0x530f1c]){if('QxebA'==='IqpPF'){if(!this[_0x43971e(0x1c4)])return![];if(!this[_0x43971e(0x1c4)]['_labelWindow'])return![];if(this['_eventPageIndex']!==this[_0x43971e(0x1c4)][_0x43971e(0x22c)])return!![];if(this[_0x43971e(0x1c4)]['_erased']&&!this[_0x43971e(0x4b3)])return!![];if(this[_0x43971e(0x1c4)][_0x43971e(0x485)]['text']==='')return![];if(this['_screenZoomScale']!==_0x140d71[_0x43971e(0x263)]())return!![];if(this[_0x43971e(0x47d)]!==this[_0x43971e(0x1c4)]['screenX']())return!![];if(this[_0x43971e(0x1a8)]!==this[_0x43971e(0x1c4)]['screenY']())return!![];if(this[_0x43971e(0x5cc)]!==this[_0x43971e(0x1c4)][_0x43971e(0x485)]['offsetX'])return!![];if(this[_0x43971e(0x3ff)]!==this[_0x43971e(0x1c4)][_0x43971e(0x485)][_0x43971e(0x32b)])return!![];if(this[_0x43971e(0x52b)]!==_0xcc495b['x'])return!![];if(this[_0x43971e(0x285)]!==_0x47cd4c['y'])return!![];if(this[_0x43971e(0x2d7)]!==this['_event']['x'])return!![];if(this['_visibleEventY']!==this[_0x43971e(0x1c4)]['y'])return!![];if(this['_cacheSystemVisible']!==_0x4668a1[_0x43971e(0x2ca)]())return!![];if(this[_0x43971e(0x445)]&&this[_0x43971e(0x439)]<0xff)return!![];if(!this['_cacheVisibility']&&this[_0x43971e(0x439)]>0x0)return!![];if(_0x25aba1[_0x43971e(0x319)][_0x43971e(0x2f9)]>0x0)return!![];return![];}else return![];}else return VisuMZ['EventsMoveCore'][_0x43971e(0x4eb)]['call'](this,_0x24227d,_0x5f50f0,_0x2e8c95);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x442)]=Game_Vehicle[_0x26bacd(0x42f)][_0x26bacd(0x476)],Game_Vehicle[_0x26bacd(0x42f)][_0x26bacd(0x476)]=function(){const _0x3fc21e=_0x26bacd;VisuMZ[_0x3fc21e(0x2b9)][_0x3fc21e(0x442)][_0x3fc21e(0x1a2)](this);const _0x2839a4=VisuMZ[_0x3fc21e(0x2b9)]['Settings']['Movement'];if(this[_0x3fc21e(0x5e0)]()){if(_0x3fc21e(0x4a7)===_0x3fc21e(0x4a7)){if(_0x2839a4[_0x3fc21e(0x154)])this[_0x3fc21e(0x628)](_0x2839a4[_0x3fc21e(0x154)]);}else return this[_0x3fc21e(0x445)];}else{if(this['isShip']()){if(_0x2839a4['ShipSpeed'])this[_0x3fc21e(0x628)](_0x2839a4['ShipSpeed']);}else{if(this[_0x3fc21e(0x323)]()){if(_0x2839a4[_0x3fc21e(0x409)])this['setMoveSpeed'](_0x2839a4[_0x3fc21e(0x409)]);}}}},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x408)]=Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x247)],Game_Event[_0x26bacd(0x42f)]['initialize']=function(_0x3719b1,_0x30200b){const _0x43b750=_0x26bacd;VisuMZ[_0x43b750(0x2b9)][_0x43b750(0x408)]['call'](this,_0x3719b1,_0x30200b),this[_0x43b750(0x4f7)](),this['setupMorphEvent'](),this[_0x43b750(0x3bc)]();},Game_Map[_0x26bacd(0x42f)][_0x26bacd(0x5ab)]=function(_0x3f366d,_0x282f1c){const _0x26c91e=_0x26bacd;return _0x3f366d===$gameMap[_0x26c91e(0x362)]()?$dataMap[_0x26c91e(0x530)][_0x282f1c]:VisuMZ[_0x26c91e(0x1b5)][_0x3f366d][_0x26c91e(0x530)][_0x282f1c];},VisuMZ[_0x26bacd(0x2b9)]['Game_Event_event']=Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x3b5)],Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x3b5)]=function(){const _0x5a52bd=_0x26bacd;if(this['_eventMorphData']!==undefined){if('rOdvK'!==_0x5a52bd(0x2f5)){const _0x3a26a6=this[_0x5a52bd(0x23b)];_0x3a26a6['x']=this[_0x5a52bd(0x364)][_0x5a52bd(0x5c8)](),_0x3a26a6['y']=this['_character'][_0x5a52bd(0x3de)](),_0x3a26a6[_0x5a52bd(0x186)]=this[_0x5a52bd(0x364)]['attachPictureBlendMode']();}else{const _0x42b56d=this[_0x5a52bd(0x341)][_0x5a52bd(0x362)],_0x2f78c6=this[_0x5a52bd(0x341)][_0x5a52bd(0x18a)];return $gameMap['referEvent'](_0x42b56d,_0x2f78c6);}}if(this[_0x5a52bd(0x637)]!==undefined){const _0x3387c5=this[_0x5a52bd(0x637)][_0x5a52bd(0x362)],_0x593369=this[_0x5a52bd(0x637)][_0x5a52bd(0x18a)];return $gameMap[_0x5a52bd(0x5ab)](_0x3387c5,_0x593369);}if(this[_0x5a52bd(0x14e)]!==undefined){if('JQgsr'!==_0x5a52bd(0x155))this[_0x5a52bd(0x357)](_0xed43b);else{const _0x11987d=this['_eventSpawnData']['mapId'],_0x436f4a=this[_0x5a52bd(0x14e)][_0x5a52bd(0x18a)];return $gameMap[_0x5a52bd(0x5ab)](_0x11987d,_0x436f4a);}}if($gameTemp['_spawnData']!==undefined){const _0x66ef72=$gameTemp[_0x5a52bd(0x24e)][_0x5a52bd(0x362)],_0x450347=$gameTemp[_0x5a52bd(0x24e)][_0x5a52bd(0x18a)];return $gameMap[_0x5a52bd(0x5ab)](_0x66ef72,_0x450347);}return VisuMZ[_0x5a52bd(0x2b9)][_0x5a52bd(0x46c)][_0x5a52bd(0x1a2)](this);},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x5f0)]=function(_0x1123e4,_0x2d0e2a){const _0x14ab9c=_0x26bacd;if(_0x1123e4===0x0||_0x2d0e2a===0x0)return![];if(_0x1123e4===$gameMap[_0x14ab9c(0x362)]())return!![];if(!VisuMZ['PreloadedMaps'][_0x1123e4]&&_0x1123e4!==$gameMap['mapId']()){if(_0x14ab9c(0x4b0)==='WKgYM')_0x4ee726[_0x14ab9c(0x401)]();else return $gameTemp['isPlaytest']()&&console[_0x14ab9c(0x555)](_0x14ab9c(0x4ed)[_0x14ab9c(0x389)](_0x1123e4)),![];}return!![];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x53a)]=Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x581)],Game_Event[_0x26bacd(0x42f)]['start']=function(){const _0x5d82cc=_0x26bacd;VisuMZ['EventsMoveCore'][_0x5d82cc(0x53a)][_0x5d82cc(0x1a2)](this),Imported[_0x5d82cc(0x521)]&&Input['isPressed'](VisuMZ['MessageCore'][_0x5d82cc(0x3b3)]['General'][_0x5d82cc(0x286)])&&Input[_0x5d82cc(0x487)]();},Game_Event[_0x26bacd(0x42f)]['setupCopyEvent']=function(){const _0x53e691=_0x26bacd,_0x1d1a9a=this[_0x53e691(0x3b5)]()['note'];if(_0x1d1a9a==='')return;if(DataManager[_0x53e691(0x64c)]()||DataManager['isEventTest']())return;const _0x5e5b15=VisuMZ[_0x53e691(0x2b9)]['Settings']['Template'];let _0x3b0af7=null,_0x573fd1=0x0,_0x227116=0x0;if(_0x1d1a9a[_0x53e691(0x224)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x573fd1=Number(RegExp['$1']),_0x227116=Number(RegExp['$2']);if(_0x573fd1===0x0)_0x573fd1=$gameMap['mapId']();}else{if(_0x1d1a9a[_0x53e691(0x224)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){if(_0x53e691(0x1ec)!==_0x53e691(0x1ec))return this[_0x53e691(0x663)]();else{_0x573fd1=Number(RegExp['$1']),_0x227116=Number(RegExp['$2']);if(_0x573fd1===0x0)_0x573fd1=$gameMap['mapId']();}}else{if(_0x1d1a9a[_0x53e691(0x224)](/<COPY EVENT:[ ](.*?)>/i)){const _0x14375c=String(RegExp['$1'])[_0x53e691(0x68e)]()['trim']();_0x3b0af7=VisuMZ[_0x53e691(0x1f3)][_0x14375c];if(!_0x3b0af7)return;_0x573fd1=_0x3b0af7[_0x53e691(0x1ba)],_0x227116=_0x3b0af7['EventID'];}}}if(!this[_0x53e691(0x5f0)](_0x573fd1,_0x227116))return;_0x5e5b15[_0x53e691(0x656)][_0x53e691(0x1a2)](this,_0x573fd1,_0x227116,this);if(_0x3b0af7)_0x3b0af7[_0x53e691(0x656)]['call'](this,_0x573fd1,_0x227116,this);this[_0x53e691(0x637)]={'mapId':_0x573fd1,'eventId':_0x227116},this[_0x53e691(0x22c)]=-0x2,this[_0x53e691(0x2d5)](),_0x5e5b15[_0x53e691(0x2af)][_0x53e691(0x1a2)](this,_0x573fd1,_0x227116,this);if(_0x3b0af7)_0x3b0af7[_0x53e691(0x2af)][_0x53e691(0x1a2)](this,_0x573fd1,_0x227116,this);$gameMap[_0x53e691(0x1ac)]();},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x431)]=function(){const _0x29872f=_0x26bacd,_0xf8e990=$gameSystem[_0x29872f(0x280)](this);if(!_0xf8e990)return;const _0xc82416=_0xf8e990['template']['toUpperCase']()[_0x29872f(0x5fa)]();if(_0xc82416!==_0x29872f(0x44d))this['morphIntoTemplate'](_0xc82416,!![]);else{if(_0x29872f(0x511)!=='KGZVa')this[_0x29872f(0x4cc)](_0xf8e990[_0x29872f(0x362)],_0xf8e990[_0x29872f(0x18a)],!![]);else return _0x228176[_0x29872f(0x42f)][_0x29872f(0x4df)]['call'](this);}},Game_Event['prototype'][_0x26bacd(0x4cc)]=function(_0x3a0941,_0x3a698b,_0x380080){const _0x1a770a=_0x26bacd;if(!this[_0x1a770a(0x5f0)](_0x3a0941,_0x3a698b))return;const _0x3220bb=VisuMZ[_0x1a770a(0x2b9)]['Settings'][_0x1a770a(0x284)];if(!_0x380080)_0x3220bb[_0x1a770a(0x643)]['call'](this,_0x3a0941,_0x3a698b,this);this[_0x1a770a(0x341)]={'mapId':_0x3a0941,'eventId':_0x3a698b},this[_0x1a770a(0x22c)]=-0x2,this[_0x1a770a(0x2d5)]();if(!_0x380080)_0x3220bb[_0x1a770a(0x234)]['call'](this,_0x3a0941,_0x3a698b,this);$gameMap['clearEventCache']();},Game_Event[_0x26bacd(0x42f)]['morphIntoTemplate']=function(_0x247466,_0x58a40d){const _0x394481=_0x26bacd;_0x247466=_0x247466[_0x394481(0x68e)]()[_0x394481(0x5fa)]();const _0x346b2d=VisuMZ[_0x394481(0x1f3)][_0x247466];if(!_0x346b2d)return;const _0x569cf6=_0x346b2d[_0x394481(0x1ba)],_0x1e16c4=_0x346b2d[_0x394481(0x67d)];if(!this[_0x394481(0x5f0)](_0x569cf6,_0x1e16c4))return;if(!_0x58a40d)_0x346b2d[_0x394481(0x643)][_0x394481(0x1a2)](this,_0x569cf6,_0x1e16c4,this);this[_0x394481(0x4cc)](_0x569cf6,_0x1e16c4,_0x58a40d);if(!_0x58a40d)_0x346b2d[_0x394481(0x234)][_0x394481(0x1a2)](this,_0x569cf6,_0x1e16c4,this);if($gameMap)$gameMap['clearEventCache']();},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x558)]=function(){const _0x180e36=_0x26bacd;this[_0x180e36(0x341)]=undefined,this[_0x180e36(0x22c)]=-0x2,this[_0x180e36(0x2d5)]();},Game_Event[_0x26bacd(0x42f)]['setupSpawn']=function(_0x49f3d9){const _0x177d26=_0x26bacd,_0x430df7=VisuMZ[_0x177d26(0x2b9)][_0x177d26(0x3b3)][_0x177d26(0x284)],_0xbb23db=_0x49f3d9['template'][_0x177d26(0x68e)]()[_0x177d26(0x5fa)](),_0x32a1d8=!['',_0x177d26(0x44d)][_0x177d26(0x18c)](_0xbb23db);let _0x538930=0x0,_0x256310=0x0;if(_0x32a1d8){if(_0x177d26(0x205)==='pWfkL'){const _0x544a82=VisuMZ[_0x177d26(0x1f3)][_0xbb23db];if(!_0x544a82)return;_0x538930=_0x544a82[_0x177d26(0x1ba)],_0x256310=_0x544a82[_0x177d26(0x67d)];}else{const _0x4c3bfc=this[_0x177d26(0x215)](_0x1de4c3),_0x19f2f6=_0xdd1c8[_0x177d26(0x2d8)]((this[_0x177d26(0x406)]-_0x4c3bfc[_0x177d26(0x275)])/0x2);this[_0x177d26(0x46e)](_0x4c9b3f,_0x19f2f6,_0x164da5),_0x4ff49d+=_0x4c3bfc['height'];}}else _0x538930=_0x49f3d9[_0x177d26(0x362)],_0x256310=_0x49f3d9[_0x177d26(0x18a)];if(!this[_0x177d26(0x5f0)](_0x538930,_0x256310))return;if(_0x32a1d8){if(_0x177d26(0x377)===_0x177d26(0x377)){const _0x3d9a64=VisuMZ[_0x177d26(0x1f3)][_0xbb23db];_0x3d9a64['PreSpawnJS'][_0x177d26(0x1a2)](this,_0x538930,_0x256310,this);}else{const _0x511559=_0x4d7698[_0x177d26(0x604)](this);_0x511559&&_0x511559[_0x177d26(0x467)]&&_0x511559[_0x177d26(0x467)][_0x177d26(0x35f)]!==this['shadowFilename']()&&(_0x511559[_0x177d26(0x467)][_0x177d26(0x35f)]=this[_0x177d26(0x456)](),_0x511559['_shadowSprite'][_0x177d26(0x423)]=_0x1509d2[_0x177d26(0x14b)](_0x511559[_0x177d26(0x467)]['_filename']));}}_0x430df7[_0x177d26(0x668)][_0x177d26(0x1a2)](this,_0x538930,_0x256310,this),this[_0x177d26(0x14e)]=_0x49f3d9,this[_0x177d26(0x22c)]=-0x2,this[_0x177d26(0x317)]=$gameMap[_0x177d26(0x362)](),this['_eventId']=_0x49f3d9[_0x177d26(0x3a6)],this[_0x177d26(0x5e8)]=_0x49f3d9[_0x177d26(0x260)],this[_0x177d26(0x4cb)](_0x49f3d9['x'],_0x49f3d9['y']),this[_0x177d26(0x37f)](_0x49f3d9['direction']),this['refresh']();if(_0x32a1d8){const _0x422af3=VisuMZ[_0x177d26(0x1f3)][_0xbb23db];if(!_0x422af3)return;_0x422af3[_0x177d26(0x1b4)]['call'](this,_0x538930,_0x256310,this);}_0x430df7[_0x177d26(0x1b4)][_0x177d26(0x1a2)](this,_0x538930,_0x256310,this);const _0x8b6f81=SceneManager[_0x177d26(0x319)];if(_0x8b6f81&&_0x8b6f81[_0x177d26(0x575)])_0x8b6f81[_0x177d26(0x575)][_0x177d26(0x52c)](this);},Game_Event['prototype'][_0x26bacd(0x1d8)]=function(){const _0x1892b4=_0x26bacd;return!!this[_0x1892b4(0x14e)];},Game_Event[_0x26bacd(0x42f)]['start']=function(){const _0x1e8aea=_0x26bacd;if(!this[_0x1e8aea(0x57b)]())return;const _0x25c0b4=this[_0x1e8aea(0x57b)]()[_0x1e8aea(0x5e2)](_0x553482=>_0x553482[_0x1e8aea(0x62f)]!==0x6c&&_0x553482[_0x1e8aea(0x62f)]!==0x198);if(_0x25c0b4['length']>0x1){if('WsZPv'===_0x1e8aea(0x19d))this[_0x1e8aea(0x430)]=!![],this[_0x1e8aea(0x66c)]([0x0,0x1,0x2])&&this[_0x1e8aea(0x218)]();else{if(!_0x872413['_scene'])return;if(!_0x447539[_0x1e8aea(0x319)][_0x1e8aea(0x575)])return;const _0x443874=_0x1fcba4['_scene'][_0x1e8aea(0x575)][_0x1e8aea(0x604)](this['_event']);if(!_0x443874)return;this['x']=_0x5784f2[_0x1e8aea(0x1dc)](this['_event'][_0x1e8aea(0x518)]()-_0x332362['floor'](this[_0x1e8aea(0x275)]*this[_0x1e8aea(0x45d)]['x']/0x2)),this['x']+=this[_0x1e8aea(0x1c4)]['_labelWindow'][_0x1e8aea(0x52e)],this['y']=this[_0x1e8aea(0x1c4)][_0x1e8aea(0x22f)]()-_0x443874[_0x1e8aea(0x5a4)],this['y']+=_0x51cb9e[_0x1e8aea(0x1dc)](_0x3acb5e[_0x1e8aea(0x216)]()*0.5),this['y']-=_0x4d4b7c[_0x1e8aea(0x1dc)](this[_0x1e8aea(0x5a4)]*this[_0x1e8aea(0x45d)]['y']),this['y']+=this[_0x1e8aea(0x1c4)][_0x1e8aea(0x485)]['offsetY'],this[_0x1e8aea(0x4b3)]=this[_0x1e8aea(0x1c4)][_0x1e8aea(0x607)],this[_0x1e8aea(0x47d)]=this[_0x1e8aea(0x1c4)]['screenX'](),this[_0x1e8aea(0x1a8)]=this[_0x1e8aea(0x1c4)][_0x1e8aea(0x22f)](),this['_eventLabelOffsetX']=this[_0x1e8aea(0x1c4)]['_labelWindow'][_0x1e8aea(0x52e)],this[_0x1e8aea(0x3ff)]=this['_event'][_0x1e8aea(0x485)]['offsetY'],this[_0x1e8aea(0x334)]=this[_0x1e8aea(0x1c4)][_0x1e8aea(0x22c)],this[_0x1e8aea(0x4b3)]&&(this[_0x1e8aea(0x439)]=0x0);}}},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x33c)]=Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x507)],Game_Event[_0x26bacd(0x42f)]['clearPageSettings']=function(){const _0x5d55a1=_0x26bacd;VisuMZ[_0x5d55a1(0x2b9)][_0x5d55a1(0x33c)][_0x5d55a1(0x1a2)](this),this[_0x5d55a1(0x219)](),this[_0x5d55a1(0x551)]();},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x208)]=Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x2c5)],Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x2c5)]=function(){const _0xc732b5=_0x26bacd;this[_0xc732b5(0x63b)]=!![],VisuMZ['EventsMoveCore'][_0xc732b5(0x208)]['call'](this),this[_0xc732b5(0x58d)](),this['autosaveEventLocation'](),this['_activationProximityAutoTriggerBypass']=![];},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x58d)]=function(){const _0x4c6fe7=_0x26bacd;if(!this['event']())return;this[_0x4c6fe7(0x219)](),this['setupEventsMoveCoreNotetags'](),this[_0x4c6fe7(0x261)](),this[_0x4c6fe7(0x2f6)]();},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x192)]=function(){const _0x110d46=_0x26bacd,_0x27da0c=this['event']()[_0x110d46(0x316)];if(_0x27da0c==='')return;this[_0x110d46(0x37e)](_0x27da0c);},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x261)]=function(){const _0x181624=_0x26bacd;if(!this['page']())return;const _0x2ee0c2=this[_0x181624(0x57b)]();let _0x4dde22='';for(const _0x4a1fe8 of _0x2ee0c2){if([0x6c,0x198]['includes'](_0x4a1fe8[_0x181624(0x62f)])){if(_0x4dde22!=='')_0x4dde22+='\x0a';_0x4dde22+=_0x4a1fe8[_0x181624(0x27c)][0x0];}}this['checkEventsMoveCoreStringTags'](_0x4dde22);},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x219)]=function(){const _0x3a38aa=_0x26bacd,_0x59b747=VisuMZ[_0x3a38aa(0x2b9)][_0x3a38aa(0x3b3)];this[_0x3a38aa(0x489)]={'type':_0x3a38aa(0x490),'distance':0x0,'regionList':[]},this[_0x3a38aa(0x22d)]=![],this[_0x3a38aa(0x291)](),this['_clickTrigger']=![],this[_0x3a38aa(0x395)]=![],this[_0x3a38aa(0x608)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x3a38aa(0x5a0)]=$gameSystem[_0x3a38aa(0x4df)](this),this[_0x3a38aa(0x485)]={'text':'','visibleRange':_0x59b747[_0x3a38aa(0x660)][_0x3a38aa(0x262)],'offsetX':_0x59b747[_0x3a38aa(0x660)][_0x3a38aa(0x425)],'offsetY':_0x59b747[_0x3a38aa(0x660)][_0x3a38aa(0x2db)]},this[_0x3a38aa(0x55b)]=![],this[_0x3a38aa(0x223)]=[],this[_0x3a38aa(0x1db)]={'target':-0x1,'type':_0x3a38aa(0x4f4),'delay':0x1,'opacityDelta':0x0},this[_0x3a38aa(0x505)]=_0x59b747[_0x3a38aa(0x335)][_0x3a38aa(0x542)]??0x0,this[_0x3a38aa(0x3a2)]=![],this[_0x3a38aa(0x26f)]={'visible':!![],'filename':_0x59b747['Movement'][_0x3a38aa(0x427)]},this[_0x3a38aa(0x53d)](),this[_0x3a38aa(0x264)]();},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x37e)]=function(_0x6a0ef3){const _0x37e7e5=_0x26bacd;if(_0x6a0ef3[_0x37e7e5(0x224)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x37e7e5(0x489)]['regionList']=JSON[_0x37e7e5(0x34b)]('['+RegExp['$1'][_0x37e7e5(0x224)](/\d+/g)+']'),this[_0x37e7e5(0x489)][_0x37e7e5(0x63d)]=_0x37e7e5(0x4cd);else{if(_0x6a0ef3[_0x37e7e5(0x224)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)){if(_0x37e7e5(0x1e1)!==_0x37e7e5(0x609))type=String(RegExp['$1'])[_0x37e7e5(0x18b)]()[_0x37e7e5(0x5fa)](),this[_0x37e7e5(0x489)][_0x37e7e5(0x63d)]=type,this[_0x37e7e5(0x489)][_0x37e7e5(0x287)]=Number(RegExp['$2']);else return _0x3726d7>=0x3e8?(_0x13b950-=0x3e8,this[_0x37e7e5(0x39f)][_0x1ac07c]):_0x4e8fd2[_0x37e7e5(0x2b9)]['Game_Map_event'][_0x37e7e5(0x1a2)](this,_0x15c51b);}}_0x6a0ef3[_0x37e7e5(0x224)](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i)&&(this['_attachPicture'][_0x37e7e5(0x5bc)]=String(RegExp['$1']));if(_0x6a0ef3[_0x37e7e5(0x224)](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)){if('jeSUZ'!==_0x37e7e5(0x2cf)){const _0x229110=String(RegExp['$1'])[_0x37e7e5(0x68e)]()[_0x37e7e5(0x5fa)](),_0x12b3e7=[_0x37e7e5(0x635),_0x37e7e5(0x486),_0x37e7e5(0x3e3),_0x37e7e5(0x191)];this[_0x37e7e5(0x466)][_0x37e7e5(0x186)]=_0x12b3e7['indexOf'](_0x229110)[_0x37e7e5(0x48e)](0x0,0x3);}else this[_0x37e7e5(0x432)]=_0x371492['getSelfTarget'](),_0x635ed6['EventsMoveCore'][_0x37e7e5(0x39a)]['call'](this,_0x4b0965,_0x381f83);}_0x6a0ef3[_0x37e7e5(0x224)](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this['_attachPicture']['maxSize']=Number(RegExp['$1']));_0x6a0ef3[_0x37e7e5(0x224)](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x37e7e5(0x2b1)==='dGiGT'?_0x1c48ff[_0x37e7e5(0x19c)](_0x56b453[_0x37e7e5(0x2fe)],_0x764a87[_0x37e7e5(0x20c)]||_0x5b4c65[_0x37e7e5(0x18a)]()):this[_0x37e7e5(0x466)]['offsetX']=Number(RegExp['$1']));_0x6a0ef3[_0x37e7e5(0x224)](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x37e7e5(0x466)][_0x37e7e5(0x32b)]=Number(RegExp['$1']));if(_0x6a0ef3[_0x37e7e5(0x224)](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x37e7e5(0x4d2)===_0x37e7e5(0x222)){_0x134c14['ConvertParams'](_0xc8221b,_0x57c840);if(!_0x3d45a7)return;const _0x1fab50=_0x11326e[_0x37e7e5(0x2fb)]();_0x248331[_0x37e7e5(0x2fe)]=_0x34fe1b['MapId']||_0xb585d1['mapId']();if(_0x51ffaf[_0x37e7e5(0x362)]()===_0x311132['MapId']){const _0x2b0967=_0x26ac65[_0x37e7e5(0x3b5)](_0x162a54['EventId']||_0x1fab50[_0x37e7e5(0x18a)]());_0x2b0967[_0x37e7e5(0x558)]();}_0x2cb013[_0x37e7e5(0x350)]&&_0x1e7123[_0x37e7e5(0x19c)](_0x4dfe5a[_0x37e7e5(0x2fe)],_0x1279c1[_0x37e7e5(0x20c)]||_0x1fab50[_0x37e7e5(0x18a)]());}else this[_0x37e7e5(0x466)][_0x37e7e5(0x52e)]=Number(RegExp['$1']),this['_attachPicture'][_0x37e7e5(0x32b)]=Number(RegExp['$2']);}_0x6a0ef3[_0x37e7e5(0x224)](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i)&&(this[_0x37e7e5(0x466)][_0x37e7e5(0x45d)]=Number(RegExp['$1'])*0.01);_0x6a0ef3[_0x37e7e5(0x224)](/<ALWAYS UPDATE MOVEMENT>/i)&&(_0x37e7e5(0x422)!==_0x37e7e5(0x422)?(_0x321207(_0x37e7e5(0x4fd)[_0x37e7e5(0x389)](_0x4d30f0,_0x27f571)),_0x8c918[_0x37e7e5(0x5dd)]()):this[_0x37e7e5(0x22d)]=!![]);_0x6a0ef3[_0x37e7e5(0x224)](/<CLICK TRIGGER>/i)&&(_0x37e7e5(0x57f)!==_0x37e7e5(0x57f)?this[_0x37e7e5(0x5a0)][_0x37e7e5(0x599)]=_0x308794(_0x9a73d9['$1']):this['_clickTrigger']=!![]);_0x6a0ef3[_0x37e7e5(0x224)](/<CUSTOM Z:[ ](.*?)>/i)&&(this[_0x37e7e5(0x395)]=Number(RegExp['$1'])||0x0);const _0xa04e6a=_0x6a0ef3[_0x37e7e5(0x224)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0xa04e6a)for(const _0x296c7c of _0xa04e6a){if(_0x296c7c[_0x37e7e5(0x224)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){if('WuhBP'!==_0x37e7e5(0x2cd)){this[_0x37e7e5(0x46d)]=this[_0x37e7e5(0x46d)]||[];const _0x59cda0=new _0x7d492f(_0x9ceb7b);this[_0x37e7e5(0x46d)]['push'](_0x59cda0),this[_0x37e7e5(0x4f1)][_0x37e7e5(0x1d7)](_0x59cda0),this[_0x37e7e5(0x5b7)](_0x59cda0),this[_0x37e7e5(0x4c8)](_0x5eabb2),_0x59cda0[_0x37e7e5(0x33d)]();}else{const _0x1ac5b8=String(RegExp['$1'])[_0x37e7e5(0x18b)]()[_0x37e7e5(0x5fa)](),_0xcae907=Number(RegExp['$2']);this['_addedHitbox'][_0x1ac5b8]=_0xcae907;}}}if(_0x6a0ef3['match'](/<ICON:[ ](\d+)>/i)){if(_0x37e7e5(0x185)!=='GrRiH')this[_0x37e7e5(0x5a0)][_0x37e7e5(0x66e)]=Number(RegExp['$1']);else{_0x9c0a17['EventsMoveCore'][_0x37e7e5(0x642)][_0x37e7e5(0x1a2)](this),this['process_VisuMZ_EventsMoveCore_LoadTemplateMaps'](),this[_0x37e7e5(0x611)]();if(_0x2f819f[_0x37e7e5(0x2b9)][_0x37e7e5(0x158)])_0x13918d[_0x37e7e5(0x2b9)][_0x37e7e5(0x158)][_0x37e7e5(0x247)]();}}_0x6a0ef3[_0x37e7e5(0x224)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(_0x37e7e5(0x627)!==_0x37e7e5(0x627)?_0x37a83f[_0x37e7e5(0x2b9)][_0x37e7e5(0x463)][_0x37e7e5(0x1a2)](this,_0x283d75,_0xcd6063):this[_0x37e7e5(0x5a0)][_0x37e7e5(0x599)]=Number(RegExp['$1']));_0x6a0ef3[_0x37e7e5(0x224)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon']['bufferY']=Number(RegExp['$1']));_0x6a0ef3[_0x37e7e5(0x224)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x37e7e5(0x599)]=Number(RegExp['$1']),this['_eventIcon'][_0x37e7e5(0x27d)]=Number(RegExp['$2']));if(_0x6a0ef3[_0x37e7e5(0x224)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x32727b=String(RegExp['$1'])['toUpperCase']()[_0x37e7e5(0x5fa)](),_0x4636f9=[_0x37e7e5(0x635),_0x37e7e5(0x486),'MULTIPLY',_0x37e7e5(0x191)];this[_0x37e7e5(0x5a0)][_0x37e7e5(0x186)]=_0x4636f9[_0x37e7e5(0x50d)](_0x32727b)[_0x37e7e5(0x48e)](0x0,0x3);}_0x6a0ef3[_0x37e7e5(0x224)](/<LABEL:[ ](.*?)>/i)&&(this[_0x37e7e5(0x485)][_0x37e7e5(0x58c)]=String(RegExp['$1'])[_0x37e7e5(0x5fa)]());_0x6a0ef3['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x37e7e5(0x485)][_0x37e7e5(0x58c)]=String(RegExp['$1'])[_0x37e7e5(0x5fa)]());_0x6a0ef3[_0x37e7e5(0x224)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x37e7e5(0x485)]['offsetX']=Number(RegExp['$1']));if(_0x6a0ef3[_0x37e7e5(0x224)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x37e7e5(0x302)===_0x37e7e5(0x397)){const _0x493dbd=_0xbbf3c7[_0x37e7e5(0x287)](this[_0x37e7e5(0x3a5)],this[_0x37e7e5(0x503)],_0x34f84f[_0x37e7e5(0x3a5)],_0x37532f[_0x37e7e5(0x503)])-0x1,_0x547663=_0x150078['min'](_0x4580d2[_0x37e7e5(0x393)](),_0x53ca30['tileHeight']()),_0x175381=this['_moveSynch'][_0x37e7e5(0x671)]||0x0;_0x1f88b3-=_0x249db9['max'](0x0,_0x493dbd)*_0x547663*_0x175381;}else this[_0x37e7e5(0x485)]['offsetY']=Number(RegExp['$1']);}if(_0x6a0ef3['match'](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x37e7e5(0x257)==='qcxEb'){var _0x3f301a=this['x']-this[_0x37e7e5(0x608)][_0x37e7e5(0x3d3)],_0x596acd=this['x']+this[_0x37e7e5(0x608)]['right'],_0x116ad2=this['y']-this[_0x37e7e5(0x608)]['up'],_0x3cc7bb=this['y']+this[_0x37e7e5(0x608)]['down'];return _0x3f301a<=_0x53bfcb&&_0x350c7d<=_0x596acd&&_0x116ad2<=_0x8ca82c&&_0x192737<=_0x3cc7bb;}else this[_0x37e7e5(0x485)][_0x37e7e5(0x52e)]=Number(RegExp['$1']),this[_0x37e7e5(0x485)][_0x37e7e5(0x32b)]=Number(RegExp['$2']);}$gameTemp[_0x37e7e5(0x2b7)](this);for(;;){if(_0x37e7e5(0x578)===_0x37e7e5(0x578)){if(this['_labelWindow'][_0x37e7e5(0x58c)][_0x37e7e5(0x224)](/\\V\[(\d+)\]/gi))this[_0x37e7e5(0x485)][_0x37e7e5(0x58c)]=this['_labelWindow'][_0x37e7e5(0x58c)][_0x37e7e5(0x480)](/\\V\[(\d+)\]/gi,(_0x4a8e67,_0x596c83)=>$gameVariables['value'](parseInt(_0x596c83)));else break;}else this[_0x37e7e5(0x4f1)][_0x37e7e5(0x182)](_0x3e500d[_0x37e7e5(0x467)]);}$gameTemp[_0x37e7e5(0x419)]();_0x6a0ef3[_0x37e7e5(0x224)](/<LABEL RANGE:[ ](\d+)>/i)&&(this['_labelWindow'][_0x37e7e5(0x238)]=Number(RegExp['$1']));_0x6a0ef3[_0x37e7e5(0x224)](/<MIRROR SPRITE>/i)&&(this[_0x37e7e5(0x55b)]=!![]);if(_0x6a0ef3[_0x37e7e5(0x224)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x387bcf=JSON['parse']('['+RegExp['$1'][_0x37e7e5(0x224)](/\d+/g)+']');this[_0x37e7e5(0x223)]=this['_moveOnlyRegions'][_0x37e7e5(0x3ba)](_0x387bcf),this['_moveOnlyRegions']['remove'](0x0);}if(_0x6a0ef3['match'](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){if(_0x37e7e5(0x601)!==_0x37e7e5(0x601))_0x2861a9(_0x37e7e5(0x333)['format'](_0x3c284b,_0x3bcd0e,_0x3a7655)),_0x545de2['exit']();else{const _0x87497a=String(RegExp['$1']);if(_0x87497a[_0x37e7e5(0x224)](/PLAYER/i)){if(_0x37e7e5(0x472)===_0x37e7e5(0x472))this[_0x37e7e5(0x1db)][_0x37e7e5(0x577)]=0x0;else{const _0x2dfa38=this[_0x37e7e5(0x4ea)](_0x50da80,_0x2cbca1,!![]);if(_0x2dfa38)this[_0x37e7e5(0x3b4)](_0x2dfa38);}}else{if(_0x87497a[_0x37e7e5(0x224)](/EVENT[ ](\d+)/i)){if(_0x37e7e5(0x3a3)!==_0x37e7e5(0x685))this[_0x37e7e5(0x1db)][_0x37e7e5(0x577)]=Number(RegExp['$1']);else{if(!_0x5621e0[_0x37e7e5(0x2a9)]())return!![];return _0x3f1424['EventsMoveCore'][_0x37e7e5(0x23e)][_0x37e7e5(0x1a2)](this);}}}}}if(_0x6a0ef3[_0x37e7e5(0x224)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)){if('tHEGn'!==_0x37e7e5(0x1b2)){const _0x2670da=this[_0x37e7e5(0x637)][_0x37e7e5(0x362)],_0x5dc02d=this[_0x37e7e5(0x637)][_0x37e7e5(0x18a)];return _0x4b3d69[_0x37e7e5(0x5ab)](_0x2670da,_0x5dc02d);}else this[_0x37e7e5(0x1db)][_0x37e7e5(0x63d)]=String(RegExp['$1'])[_0x37e7e5(0x18b)]()[_0x37e7e5(0x5fa)]();}_0x6a0ef3[_0x37e7e5(0x224)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x37e7e5(0x1db)][_0x37e7e5(0x2dd)]=Number(RegExp['$1']));_0x6a0ef3[_0x37e7e5(0x224)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this['_moveSynch'][_0x37e7e5(0x671)]=Number(RegExp['$1']));if(_0x6a0ef3[_0x37e7e5(0x224)](/<TRUE RANDOM MOVE>/i))this[_0x37e7e5(0x505)]=0x0;else _0x6a0ef3[_0x37e7e5(0x224)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x37e7e5(0x505)]=Number(RegExp['$1'])||0x0);if(_0x6a0ef3[_0x37e7e5(0x224)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if(_0x37e7e5(0x383)===_0x37e7e5(0x383))this[_0x37e7e5(0x3a2)]=!![];else{if(!this[_0x37e7e5(0x364)])return 0x0;if(this[_0x37e7e5(0x364)][_0x37e7e5(0x607)])return 0x0;const _0x440b53=this[_0x37e7e5(0x364)][_0x37e7e5(0x4df)]();return _0x440b53?_0x440b53[_0x37e7e5(0x66e)]||0x0:0x0;}}if(_0x6a0ef3[_0x37e7e5(0x224)](/<HIDE SHADOW>/i)){if(_0x37e7e5(0x418)!==_0x37e7e5(0x418))return 0x6;else this['_shadowGraphic'][_0x37e7e5(0x1d0)]=![];}if(_0x6a0ef3['match'](/<SHADOW FILENAME:[ ](.*?)>/i)){if(_0x37e7e5(0x3a7)!==_0x37e7e5(0x3a7)){const _0xa314bb=['',_0x37e7e5(0x62e),_0x37e7e5(0x36f),_0x37e7e5(0x5ae),_0x37e7e5(0x614),_0x37e7e5(0x61a),'SWEAT',_0x37e7e5(0x25e),_0x37e7e5(0x15d),_0x37e7e5(0x531),_0x37e7e5(0x38e),'','','','',''][_0x5820d2];this[_0x37e7e5(0x3da)](_0xa314bb,_0x3d590b);}else this[_0x37e7e5(0x26f)][_0x37e7e5(0x5bc)]=String(RegExp['$1']);}if(_0x6a0ef3[_0x37e7e5(0x224)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)){if(_0x37e7e5(0x3f8)==='txUpT')this[_0x37e7e5(0x4ce)]=Number(RegExp['$1']);else{if(this[_0x37e7e5(0x1d2)]<=0x0)return;this[_0x37e7e5(0x4a8)]=!![],this[_0x37e7e5(0x399)]=!![];}}_0x6a0ef3['match'](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetY']=Number(RegExp['$1']));if(_0x6a0ef3[_0x37e7e5(0x224)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x37e7e5(0x3ee)!=='zrsgT'){_0x4298a4[_0x37e7e5(0x164)](_0x1579d6,_0xd78b33);const _0x321594=_0x3fcddc[_0x37e7e5(0x3e8)],_0x20956b=_0x24c5f8[_0x37e7e5(0x236)];_0x4e74e1[_0x37e7e5(0x26c)](_0x321594,_0x20956b);}else this['_spriteOffsetX']=Number(RegExp['$1']),this[_0x37e7e5(0x1c1)]=Number(RegExp['$2']);}_0x6a0ef3[_0x37e7e5(0x224)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x37e7e5(0x634)]=String(RegExp['$1'])[_0x37e7e5(0x68e)]()[_0x37e7e5(0x5fa)]());},Game_Event[_0x26bacd(0x42f)]['updateEventsMoveCoreTagChanges']=function(){this['updateShadowChanges']();},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x254)]=function(){const _0x37c315=_0x26bacd;if(this[_0x37c315(0x22d)])return!![];return Game_Character[_0x37c315(0x42f)][_0x37c315(0x254)]['call'](this);},VisuMZ['EventsMoveCore'][_0x26bacd(0x170)]=Game_Event['prototype'][_0x26bacd(0x253)],Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x253)]=function(){const _0x4d4267=_0x26bacd;if(this[_0x4d4267(0x56d)]())return;VisuMZ[_0x4d4267(0x2b9)][_0x4d4267(0x170)][_0x4d4267(0x1a2)](this),this[_0x4d4267(0x42c)]()&&VisuMZ['MoveAllSynchTargets'](this[_0x4d4267(0x65f)]);},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x56d)]=function(){const _0x3c42f2=_0x26bacd,_0x693c42=VisuMZ['EventsMoveCore']['Settings'][_0x3c42f2(0x335)];if($gameMap[_0x3c42f2(0x299)]()&&_0x693c42[_0x3c42f2(0x30e)])return!![];if($gameMessage[_0x3c42f2(0x59e)]()&&_0x693c42[_0x3c42f2(0x564)])return!![];if(!$gameSystem[_0x3c42f2(0x675)]())return!![];if(this[_0x3c42f2(0x16f)]()>=0x0)return!![];return![];},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x2eb)]=function(){const _0x462b5f=_0x26bacd,_0x52a567=SceneManager[_0x462b5f(0x319)][_0x462b5f(0x575)];if(_0x52a567){const _0x195e99=_0x52a567[_0x462b5f(0x604)](this);_0x195e99&&_0x195e99['_shadowSprite']&&_0x195e99[_0x462b5f(0x467)]['_filename']!==this[_0x462b5f(0x456)]()&&(_0x195e99['_shadowSprite'][_0x462b5f(0x35f)]=this[_0x462b5f(0x456)](),_0x195e99[_0x462b5f(0x467)][_0x462b5f(0x423)]=ImageManager[_0x462b5f(0x14b)](_0x195e99['_shadowSprite'][_0x462b5f(0x35f)]));}},Game_Event[_0x26bacd(0x42f)]['shadowFilename']=function(){const _0xd31b29=_0x26bacd;return this['_shadowGraphic'][_0xd31b29(0x5bc)];},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x3ad)]=function(){const _0x20322b=_0x26bacd;if(!this[_0x20322b(0x26f)][_0x20322b(0x1d0)])return![];return Game_CharacterBase[_0x20322b(0x42f)][_0x20322b(0x3ad)][_0x20322b(0x1a2)](this);},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x54f)]=function(){const _0x5af74e=_0x26bacd;return this[_0x5af74e(0x485)]['text'];},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x2ae)]=function(){const _0x3826ca=_0x26bacd;return this['_labelWindow'][_0x3826ca(0x238)];},Game_Event[_0x26bacd(0x42f)]['isMapPassable']=function(_0x34cd24,_0x347b61,_0x2c0f13){const _0xbe5b4d=_0x26bacd;if(this['hasMoveOnlyRegions']())return this[_0xbe5b4d(0x242)](_0x34cd24,_0x347b61,_0x2c0f13);if($gameMap[_0xbe5b4d(0x4a6)](_0x34cd24,_0x347b61,_0x2c0f13,'event'))return!![];if($gameMap[_0xbe5b4d(0x2fd)](_0x34cd24,_0x347b61,_0x2c0f13,'event'))return![];return Game_Character[_0xbe5b4d(0x42f)]['isMapPassable'][_0xbe5b4d(0x1a2)](this,_0x34cd24,_0x347b61,_0x2c0f13);},Game_Event['prototype'][_0x26bacd(0x4f0)]=function(){const _0x22fbc4=_0x26bacd;if(this[_0x22fbc4(0x223)]===undefined)this[_0x22fbc4(0x219)]();return this[_0x22fbc4(0x223)][_0x22fbc4(0x52a)]>0x0;},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x242)]=function(_0x288f54,_0x5a90fa,_0x29f8e5){const _0x1022c2=_0x26bacd,_0x2c66d8=$gameMap[_0x1022c2(0x2c4)](_0x288f54,_0x29f8e5),_0x20b8c8=$gameMap[_0x1022c2(0x602)](_0x5a90fa,_0x29f8e5),_0x2b904e=$gameMap[_0x1022c2(0x650)](_0x2c66d8,_0x20b8c8);return this[_0x1022c2(0x223)]['includes'](_0x2b904e);},VisuMZ['EventsMoveCore']['Game_Event_findProperPageIndex']=Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x4d5)],Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x4d5)]=function(){const _0x1dcd24=_0x26bacd;if(this[_0x1dcd24(0x3b5)]()&&!$gameTemp[_0x1dcd24(0x630)]()){if(this[_0x1dcd24(0x3b5)]()[_0x1dcd24(0x316)][_0x1dcd24(0x224)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this[_0x1dcd24(0x2e0)]=![],this[_0x1dcd24(0x35c)]=![],this[_0x1dcd24(0x3b5)]()?VisuMZ['EventsMoveCore'][_0x1dcd24(0x500)][_0x1dcd24(0x1a2)](this):-0x1;},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x4e3)]=Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x4e4)],Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x4e4)]=function(_0x56c90f){const _0x395536=_0x26bacd;this[_0x395536(0x554)](_0x56c90f),$gameTemp['registerSelfTarget'](this);const _0x394beb=VisuMZ['EventsMoveCore']['Game_Event_meetsConditions'][_0x395536(0x1a2)](this,_0x56c90f);return $gameTemp[_0x395536(0x419)](),_0x394beb;},Game_Event['prototype']['hasAdvancedSwitchVariable']=function(){return this['_advancedSwitchVariable'];},Game_Event[_0x26bacd(0x42f)]['checkAdvancedSwitchVariablePresent']=function(_0x3d6ddf){const _0x21b08d=_0x26bacd,_0x4fdc37=_0x3d6ddf[_0x21b08d(0x33a)];if(_0x4fdc37[_0x21b08d(0x5b0)]&&DataManager[_0x21b08d(0x65d)](_0x4fdc37['switch1Id']))_0x21b08d(0x620)!==_0x21b08d(0x40f)?this[_0x21b08d(0x2e0)]=!![]:this[_0x21b08d(0x20d)]=_0x2309c1;else{if(_0x4fdc37['switch2Valid']&&DataManager[_0x21b08d(0x65d)](_0x4fdc37[_0x21b08d(0x47c)]))this[_0x21b08d(0x2e0)]=!![];else _0x4fdc37['variableValid']&&DataManager[_0x21b08d(0x17d)](_0x4fdc37['variableId'])&&(this[_0x21b08d(0x2e0)]=!![]);}},Game_Event[_0x26bacd(0x42f)]['hasClickTrigger']=function(){const _0x4e842b=_0x26bacd;if(this[_0x4e842b(0x607)])return![];return this[_0x4e842b(0x40c)];},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x492)]=function(){const _0x378d9b=_0x26bacd;$gameTemp['clearDestination'](),this[_0x378d9b(0x581)]();},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x4a2)]=function(_0x3a0fa8,_0x24d33b){const _0x51747a=_0x26bacd;if(this[_0x51747a(0x608)]){if('OkEKK'===_0x51747a(0x452))return this[_0x51747a(0x15c)](_0x3a0fa8,_0x24d33b);else this[_0x51747a(0x26f)][_0x51747a(0x1d0)]=![];}else return Game_Character[_0x51747a(0x42f)][_0x51747a(0x4a2)]['call'](this,_0x3a0fa8,_0x24d33b);},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x15c)]=function(_0x2e0c96,_0x519062){const _0x32fae8=_0x26bacd;var _0x135649=this['x']-this[_0x32fae8(0x608)][_0x32fae8(0x3d3)],_0x2a1b6b=this['x']+this[_0x32fae8(0x608)]['right'],_0x4139c0=this['y']-this['_addedHitbox']['up'],_0x26f42c=this['y']+this[_0x32fae8(0x608)][_0x32fae8(0x59b)];return _0x135649<=_0x2e0c96&&_0x2e0c96<=_0x2a1b6b&&_0x4139c0<=_0x519062&&_0x519062<=_0x26f42c;},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x1c6)]=function(_0x4a7930,_0x5ce2b5,_0x5226cb){const _0x205b47=_0x26bacd;for(let _0x723a1=-this['_addedHitbox'][_0x205b47(0x3d3)];_0x723a1<=this['_addedHitbox'][_0x205b47(0x596)];_0x723a1++){for(let _0x31d357=-this[_0x205b47(0x608)]['up'];_0x31d357<=this[_0x205b47(0x608)][_0x205b47(0x59b)];_0x31d357++){if('VSHSp'!==_0x205b47(0x59a)){if(!Game_Character[_0x205b47(0x42f)][_0x205b47(0x1c6)][_0x205b47(0x1a2)](this,_0x4a7930+_0x723a1,_0x5ce2b5+_0x31d357,_0x5226cb))return![];}else{if(this['_EventsMoveCoreSettings']===_0x4552df)this[_0x205b47(0x376)]();if(this[_0x205b47(0x168)][_0x205b47(0x3d6)]===_0x522dab)this[_0x205b47(0x376)]();this[_0x205b47(0x168)][_0x205b47(0x3d6)]=_0x425605;}}}return!![];},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x2c0)]=function(_0x2492f4,_0x33ec4f){const _0x4de396=_0x26bacd;if(Imported['VisuMZ_0_CoreEngine']&&this['isSmartEventCollisionOn']()){if(_0x4de396(0x4cf)===_0x4de396(0x4cf))return this[_0x4de396(0x651)](_0x2492f4,_0x33ec4f);else{const _0x74a286=_0xf14a4a(_0x5b4419['$1']);_0x74a286<_0x278909?(_0x3a6701('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x4de396(0x389)](_0x568b79,_0x74a286,_0x49dc0f)),_0x26480d[_0x4de396(0x5dd)]()):_0x33a900=_0x1fc5f3[_0x4de396(0x24b)](_0x74a286,_0x4f6300);}}else{const _0x765c27=$gameMap[_0x4de396(0x318)](_0x2492f4,_0x33ec4f)['filter'](_0x57271a=>_0x57271a!==this);return _0x765c27['length']>0x0;}},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x651)]=function(_0x345eb1,_0x44d696){const _0x2edcb6=_0x26bacd;if(!this[_0x2edcb6(0x606)]()){if('AnLEb'===_0x2edcb6(0x3be))return![];else _0x28195d[_0x2edcb6(0x42f)][_0x2edcb6(0x33d)][_0x2edcb6(0x1a2)](this),this[_0x2edcb6(0x1a9)](),this[_0x2edcb6(0x35b)](),this[_0x2edcb6(0x32d)](),this['updateOpacity']();}else{const _0x5abe59=$gameMap[_0x2edcb6(0x318)](_0x345eb1,_0x44d696)[_0x2edcb6(0x5e2)](_0x81d199=>_0x81d199!==this&&_0x81d199[_0x2edcb6(0x606)]());return _0x5abe59['length']>0x0;}},Game_Event['prototype']['activationProximityType']=function(){const _0x2d8120=_0x26bacd;return this['_activationProximity'][_0x2d8120(0x63d)]||_0x2d8120(0x490);},Game_Event['prototype'][_0x26bacd(0x2ec)]=function(){const _0x294365=_0x26bacd;return this[_0x294365(0x489)][_0x294365(0x287)]||0x0;},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x36c)]=function(){const _0xbe4ab7=_0x26bacd;return this[_0xbe4ab7(0x489)][_0xbe4ab7(0x567)]||[];},Game_Event['prototype'][_0x26bacd(0x298)]=function(){const _0x3562e9=_0x26bacd;Game_Character['prototype'][_0x3562e9(0x298)][_0x3562e9(0x1a2)](this);if([_0x3562e9(0x490),'region'][_0x3562e9(0x18c)](this['activationProximityType']()))return;$gamePlayer[_0x3562e9(0x3f3)]([0x2]);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x1eb)]=Game_Event[_0x26bacd(0x42f)]['checkEventTriggerAuto'],Game_Event['prototype']['checkEventTriggerAuto']=function(){const _0x358dd3=_0x26bacd;if(this[_0x358dd3(0x648)]!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this[_0x358dd3(0x43c)](![]))return;if(!this[_0x358dd3(0x5c9)](![]))return;VisuMZ[_0x358dd3(0x2b9)][_0x358dd3(0x1eb)][_0x358dd3(0x1a2)](this);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x5ac)]=Game_Event[_0x26bacd(0x42f)]['updateParallel'],Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x4be)]=function(){const _0x74a59c=_0x26bacd;if(!this['_interpreter'])return;if(!this['checkRegionEventTrigger'](!![]))return;if(!this[_0x74a59c(0x5c9)](!![]))return;VisuMZ['EventsMoveCore'][_0x74a59c(0x5ac)][_0x74a59c(0x1a2)](this);},Game_Event[_0x26bacd(0x42f)]['checkRegionEventTrigger']=function(_0x53b00b){const _0x5e02c7=_0x26bacd;if(!_0x53b00b&&$gameMap[_0x5e02c7(0x299)]())return![];if(!_0x53b00b&&$gameMap[_0x5e02c7(0x1c2)]())return![];if(this[_0x5e02c7(0x36c)]()<=0x0)return!![];return $gamePlayer['meetActivationRegionConditions'](this);},Game_Event['prototype'][_0x26bacd(0x5c9)]=function(_0x2ba9e3){const _0x252dc8=_0x26bacd;if(!_0x2ba9e3&&$gameMap[_0x252dc8(0x299)]())return![];if(!_0x2ba9e3&&$gameMap[_0x252dc8(0x1c2)]())return![];if([_0x252dc8(0x490),_0x252dc8(0x4cd)][_0x252dc8(0x18c)](this[_0x252dc8(0x48d)]()))return!![];return $gamePlayer[_0x252dc8(0x429)](this);},VisuMZ[_0x26bacd(0x324)]=function(_0x5bc7d1){const _0x4e45b1=_0x26bacd;for(const _0x557b31 of $gameMap[_0x4e45b1(0x530)]()){if(!_0x557b31)continue;_0x557b31['moveSynchTarget']()===_0x5bc7d1&&_0x557b31[_0x4e45b1(0x1c9)]();}},VisuMZ['GetMoveSynchTarget']=function(_0x339ec9){const _0x51eb8b=_0x26bacd;if(_0x339ec9===0x0)return $gamePlayer;return $gameMap[_0x51eb8b(0x3b5)](_0x339ec9);},Game_Event['prototype'][_0x26bacd(0x16f)]=function(){return this['_moveSynch']['target'];},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x32c)]=function(){const _0xc5b7a4=_0x26bacd;return this[_0xc5b7a4(0x1db)][_0xc5b7a4(0x63d)];},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x5bd)]=function(){const _0x223505=_0x26bacd;if(this[_0x223505(0x16f)]()>=0x0){const _0x3d9ea0=VisuMZ['GetMoveSynchTarget'](this[_0x223505(0x16f)]());if(_0x3d9ea0)return _0x3d9ea0[_0x223505(0x5bd)]();}return Game_Character[_0x223505(0x42f)][_0x223505(0x5bd)][_0x223505(0x1a2)](this);},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x1c9)]=function(){const _0x216749=_0x26bacd;this['_moveSynch']['timer']=this[_0x216749(0x1db)][_0x216749(0x535)]||0x0,this[_0x216749(0x1db)][_0x216749(0x535)]--;if(this['_moveSynch']['timer']>0x0)return;this['_moveSynch']['timer']=this[_0x216749(0x1db)]['delay'],this['processMoveSynch']();},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x61e)]=function(_0x170b87){const _0xeb294=_0x26bacd;if(this[_0xeb294(0x16f)]()>=0x0){const _0x4423d9=VisuMZ['GetMoveSynchTarget'](this[_0xeb294(0x16f)]());if(_0x4423d9){const _0x899f74=$gameMap['distance'](this[_0xeb294(0x3a5)],this[_0xeb294(0x503)],_0x4423d9[_0xeb294(0x3a5)],_0x4423d9[_0xeb294(0x503)])-0x1,_0x31daed=Math['min']($gameMap[_0xeb294(0x393)](),$gameMap[_0xeb294(0x536)]()),_0x1e2810=this['_moveSynch'][_0xeb294(0x671)]||0x0;_0x170b87-=Math[_0xeb294(0x24b)](0x0,_0x899f74)*_0x31daed*_0x1e2810;}}return _0x170b87;},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x382)]=function(){const _0x573175=_0x26bacd;switch(this[_0x573175(0x32c)]()){case _0x573175(0x4f4):this[_0x573175(0x59f)]();break;case _0x573175(0x532):this['processMoveSynchApproach']();break;case'away':this['processMoveSynchAway']();break;case _0x573175(0x4ba):this[_0x573175(0x61d)]();break;case'mimic':case'copy':this[_0x573175(0x438)]();break;case _0x573175(0x544):case _0x573175(0x5ec):this[_0x573175(0x592)]();break;case _0x573175(0x1b0):case _0x573175(0x5a5):case _0x573175(0x672):case _0x573175(0x552):this[_0x573175(0x3ab)]();break;case _0x573175(0x1ff):case _0x573175(0x1a7):case'mirror\x20vert':case _0x573175(0x520):this[_0x573175(0x160)]();break;default:this[_0x573175(0x59f)]();break;}this['update']();},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x59f)]=function(){const _0x3d7a83=_0x26bacd,_0x3fb4ad=[0x2,0x4,0x6,0x8];$gameMap['isSupportDiagonalMovement']()&&_0x3fb4ad[_0x3d7a83(0x496)](0x1,0x3,0x7,0x9);const _0x5b45a5=[];for(const _0x33b1f1 of _0x3fb4ad){if(this[_0x3d7a83(0x1c6)](this['x'],this['y'],_0x33b1f1))_0x5b45a5['push'](_0x33b1f1);}if(_0x5b45a5['length']>0x0){const _0xd09143=_0x5b45a5[Math['randomInt'](_0x5b45a5[_0x3d7a83(0x52a)])];this[_0x3d7a83(0x3b4)](_0xd09143);}},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x5ce)]=function(){const _0x1a76ed=_0x26bacd,_0x2a9d2e=VisuMZ[_0x1a76ed(0x2b0)](this[_0x1a76ed(0x16f)]());this['moveTowardCharacter'](_0x2a9d2e);},Game_Event[_0x26bacd(0x42f)]['processMoveSynchAway']=function(){const _0x42e832=_0x26bacd,_0x5e9f8f=VisuMZ[_0x42e832(0x2b0)](this[_0x42e832(0x16f)]());this[_0x42e832(0x4f8)](_0x5e9f8f);},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x61d)]=function(){const _0x522f9e=_0x26bacd;this[_0x522f9e(0x47e)]();},Game_Event['prototype']['processMoveSynchMimic']=function(){const _0x3470d1=_0x26bacd,_0x2f184e=VisuMZ[_0x3470d1(0x2b0)](this['moveSynchTarget']());this[_0x3470d1(0x3b4)](_0x2f184e[_0x3470d1(0x5bb)]());},Game_Event[_0x26bacd(0x42f)]['processMoveSynchReverseMimic']=function(){const _0x479fe9=_0x26bacd,_0x48e8a8=VisuMZ[_0x479fe9(0x2b0)](this[_0x479fe9(0x16f)]());this[_0x479fe9(0x3b4)](this['reverseDir'](_0x48e8a8[_0x479fe9(0x5bb)]()));},Game_Event['prototype'][_0x26bacd(0x3ab)]=function(){const _0x243591=_0x26bacd,_0x3574ae=VisuMZ['GetMoveSynchTarget'](this[_0x243591(0x16f)]()),_0x4ede77=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x3574ae['lastMovedDirection']()];this[_0x243591(0x3b4)](_0x4ede77);},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x160)]=function(){const _0x5446b1=_0x26bacd,_0x4e2f9c=VisuMZ['GetMoveSynchTarget'](this[_0x5446b1(0x16f)]()),_0x2164fa=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x4e2f9c[_0x5446b1(0x5bb)]()];this[_0x5446b1(0x3b4)](_0x2164fa);},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x3bc)]=function(){const _0x99c069=_0x26bacd,_0x4e2c9a=$gameSystem['getSavedEventLocation'](this);if(!_0x4e2c9a)return;this[_0x99c069(0x5de)](_0x4e2c9a['x'],_0x4e2c9a['y']),this[_0x99c069(0x461)](),this[_0x99c069(0x37f)](_0x4e2c9a['direction']),this[_0x99c069(0x22c)]===_0x4e2c9a[_0x99c069(0x416)]&&(this[_0x99c069(0x641)]=_0x4e2c9a[_0x99c069(0x1b6)]);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x5c5)]=Game_Event[_0x26bacd(0x42f)]['update'],Game_Event['prototype']['update']=function(){const _0x16a45c=_0x26bacd;VisuMZ['EventsMoveCore'][_0x16a45c(0x5c5)]['call'](this),this[_0x16a45c(0x665)]();},Game_Event['prototype'][_0x26bacd(0x670)]=function(){const _0x3410e5=_0x26bacd;Game_Character[_0x3410e5(0x42f)][_0x3410e5(0x670)][_0x3410e5(0x1a2)](this),this['autosaveEventLocation']();},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x3c4)]=function(){const _0x831fc5=_0x26bacd;if($gameMap['isSaveEventLocations']())return!![];return this[_0x831fc5(0x3a2)];},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x551)]=function(){const _0x57e169=_0x26bacd;if(!this['isSaveEventLocation']())return;this[_0x57e169(0x331)]();},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x331)]=function(){this['_requestSaveEventLocation']=!![];},Game_Event[_0x26bacd(0x42f)]['updateSaveEventLocation']=function(){const _0x3f7a03=_0x26bacd;this[_0x3f7a03(0x2cb)]&&this[_0x3f7a03(0x373)]();},Game_Event['prototype'][_0x26bacd(0x373)]=function(){const _0x373b98=_0x26bacd;this[_0x373b98(0x2cb)]=![],$gameSystem[_0x373b98(0x331)](this);},Game_Event['prototype'][_0x26bacd(0x2a3)]=function(){const _0x62910=_0x26bacd;$gameSystem[_0x62910(0x678)](this);},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x4df)]=function(){const _0xb27467=_0x26bacd;if($gameSystem['getEventIconData'](this)){if(_0xb27467(0x3af)!==_0xb27467(0x3af))this[_0xb27467(0x370)]=new _0x1fe120(),this[_0xb27467(0x370)][_0xb27467(0x423)]=_0x3bdc58['loadSystem'](_0xb27467(0x5e7)),this[_0xb27467(0x370)][_0xb27467(0x423)][_0xb27467(0x41b)]=![],this['_eventIconSprite'][_0xb27467(0x48f)](0x0,0x0,0x0,0x0),this['_eventIconSprite']['anchor']['x']=0.5,this[_0xb27467(0x370)][_0xb27467(0x270)]['y']=0x1,this[_0xb27467(0x1d7)](this[_0xb27467(0x370)]);else return Game_Character[_0xb27467(0x42f)][_0xb27467(0x4df)]['call'](this);}else return{'iconIndex':0x0,'bufferX':settings[_0xb27467(0x28f)][_0xb27467(0x64a)],'bufferY':settings['Icon']['BufferY'],'blendMode':settings[_0xb27467(0x28f)][_0xb27467(0x67f)]};},Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x5f8)]=function(){const _0x488e8a=_0x26bacd;return this[_0x488e8a(0x35c)];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x374)]=Game_Event['prototype'][_0x26bacd(0x4e4)],Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x4e4)]=function(_0x501096){const _0x3b6283=_0x26bacd,_0x46f56f=VisuMZ[_0x3b6283(0x2b9)][_0x3b6283(0x374)][_0x3b6283(0x1a2)](this,_0x501096);if(!_0x46f56f)return![];return this[_0x3b6283(0x60e)](_0x501096);},Game_Event['prototype'][_0x26bacd(0x60e)]=function(_0x10f82f){const _0x5d1a51=_0x26bacd;VisuMZ[_0x5d1a51(0x2b9)][_0x5d1a51(0x158)][_0x5d1a51(0x669)](_0x10f82f),this['_CPCs']=_0x10f82f['CPC'][_0x5d1a51(0x52a)]>0x0;_0x10f82f[_0x5d1a51(0x4bc)]===undefined&&VisuMZ[_0x5d1a51(0x2b9)][_0x5d1a51(0x158)][_0x5d1a51(0x669)](_0x10f82f);if(_0x10f82f['CPC'][_0x5d1a51(0x52a)]>0x0){if('uQlXJ'===_0x5d1a51(0x413))return $gameMap[_0x5d1a51(0x3b5)](this[_0x5d1a51(0x65f)])&&VisuMZ[_0x5d1a51(0x2b9)][_0x5d1a51(0x158)][_0x5d1a51(0x5a7)](_0x10f82f['CPC'],this[_0x5d1a51(0x65f)]);else _0x39d079[_0x5d1a51(0x164)](_0x19ada5,_0x573623),_0x2d233b['despawnEverything']();}return!![];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x5c0)]=Game_Troop[_0x26bacd(0x42f)][_0x26bacd(0x4e4)],Game_Troop[_0x26bacd(0x42f)][_0x26bacd(0x4e4)]=function(_0x291cfe){const _0x5d673f=_0x26bacd;var _0x43965b=VisuMZ[_0x5d673f(0x2b9)][_0x5d673f(0x5c0)]['call'](this,_0x291cfe);return _0x43965b&&this[_0x5d673f(0x198)](_0x291cfe);},Game_Troop['prototype'][_0x26bacd(0x198)]=function(_0x578b53){const _0x260558=_0x26bacd;_0x578b53['CPC']===undefined&&VisuMZ[_0x260558(0x2b9)][_0x260558(0x158)][_0x260558(0x669)](_0x578b53);if(_0x578b53[_0x260558(0x4bc)][_0x260558(0x52a)]>0x0){if(_0x260558(0x65b)!=='rDpzw')_0x1fc8aa=_0x39b563(_0x1018bb['$1'])[_0x260558(0x18b)]()[_0x260558(0x5fa)](),this[_0x260558(0x489)][_0x260558(0x63d)]=_0x1cfeca,this[_0x260558(0x489)]['distance']=_0x370053(_0x57739b['$2']);else return VisuMZ[_0x260558(0x2b9)][_0x260558(0x158)]['metCPC'](_0x578b53['CPC'],0x0);}return!![];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x2ef)]=Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x4cb)],Game_Event[_0x26bacd(0x42f)]['locate']=function(_0x4ffc0a,_0x566adc){const _0x30d751=_0x26bacd;VisuMZ[_0x30d751(0x2b9)][_0x30d751(0x2ef)][_0x30d751(0x1a2)](this,_0x4ffc0a,_0x566adc),this['_randomHomeX']=_0x4ffc0a,this[_0x30d751(0x2f8)]=_0x566adc,this[_0x30d751(0x551)]();},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x2e7)]=Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x3fa)],Game_Event[_0x26bacd(0x42f)][_0x26bacd(0x3fa)]=function(){const _0x2d3968=_0x26bacd,_0x54769a=$gameMap[_0x2d3968(0x287)](this['x'],this['y'],this[_0x2d3968(0x159)],this['_randomHomeY']),_0x1f524e=_0x54769a*(this[_0x2d3968(0x505)]||0x0);if(Math[_0x2d3968(0x4f4)]()>=_0x1f524e){if(_0x2d3968(0x386)==='xIOOY')return this['_activationProximity']['regionList']||[];else VisuMZ['EventsMoveCore']['Game_Event_moveTypeRandom']['call'](this);}else this[_0x2d3968(0x26b)]();},Game_Event[_0x26bacd(0x42f)]['moveBackToRandomHome']=function(){const _0x1a33f3=_0x26bacd,_0x355c95=this[_0x1a33f3(0x4e9)](this[_0x1a33f3(0x159)]),_0x745eec=this[_0x1a33f3(0x499)](this['_randomHomeY']);if(Math[_0x1a33f3(0x444)](_0x355c95)>Math[_0x1a33f3(0x444)](_0x745eec)){if(_0x1a33f3(0x519)==='Mcyhk')this[_0x1a33f3(0x49d)](_0x355c95>0x0?0x4:0x6),!this[_0x1a33f3(0x526)]()&&_0x745eec!==0x0&&(_0x1a33f3(0x4d3)!==_0x1a33f3(0x541)?this['moveStraight'](_0x745eec>0x0?0x8:0x2):_0x27ab59[_0x1a33f3(0x487)]());else return this['characterPatternYBasic']();}else{if(_0x745eec!==0x0){if(_0x1a33f3(0x4c0)===_0x1a33f3(0x4c0))this['moveStraight'](_0x745eec>0x0?0x8:0x2),!this[_0x1a33f3(0x526)]()&&_0x355c95!==0x0&&('JxGqL'!=='sstZi'?this[_0x1a33f3(0x49d)](_0x355c95>0x0?0x4:0x6):(this[_0x1a33f3(0x17a)][_0x21efdb]=_0x3a1c44[0x2]['match'](/VAR/i)?_0x6b981f:!!_0x5ae240,this['onChange']()));else{if(this[_0x1a33f3(0x3b6)])return this['_eventCache'];const _0x11a1df=_0x39d5ac[_0x1a33f3(0x2b9)][_0x1a33f3(0x29f)][_0x1a33f3(0x1a2)](this),_0x1fd00e=_0x11a1df[_0x1a33f3(0x3ba)](this['_spawnedEvents']||[]);return this['_eventCache']=_0x1fd00e[_0x1a33f3(0x5e2)](_0x1bb8f3=>!!_0x1bb8f3),this[_0x1a33f3(0x3b6)];}}}},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x291)]=function(){this['_attachPicture']={'filename':'','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase['prototype'][_0x26bacd(0x534)]=function(){if(this['_attachPicture']===undefined)this['clearAttachPictureSettings']();return this['_attachPicture'];},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x241)]=function(){const _0x17fc6d=_0x26bacd;return this[_0x17fc6d(0x534)]()[_0x17fc6d(0x5bc)]??'';},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x1c8)]=function(){const _0x78b1e0=_0x26bacd;return this[_0x78b1e0(0x534)]()[_0x78b1e0(0x186)]??0x0;},Game_CharacterBase[_0x26bacd(0x42f)][_0x26bacd(0x330)]=function(){const _0x437893=_0x26bacd;return this[_0x437893(0x534)]()['maxSize']??0x0;},Game_CharacterBase[_0x26bacd(0x42f)]['attachPictureOffsetX']=function(){const _0x376dff=_0x26bacd;return this['attachPictureSettings']()[_0x376dff(0x52e)]??0x0;},Game_CharacterBase[_0x26bacd(0x42f)]['attachPictureOffsetY']=function(){const _0x2418db=_0x26bacd;return this['attachPictureSettings']()[_0x2418db(0x32b)]??0x0;},Game_CharacterBase['prototype'][_0x26bacd(0x256)]=function(){const _0x1bfd87=_0x26bacd;return this[_0x1bfd87(0x534)]()[_0x1bfd87(0x45d)]??0x1;},VisuMZ['EventsMoveCore'][_0x26bacd(0x473)]=Game_Interpreter[_0x26bacd(0x42f)]['updateWaitMode'],Game_Interpreter[_0x26bacd(0x42f)][_0x26bacd(0x42a)]=function(){const _0x320d5f=_0x26bacd;if(this['_waitMode']===_0x320d5f(0x666)){if(window[this[_0x320d5f(0x3cd)]]){if(_0x320d5f(0x3b8)==='rxoWU')this[_0x320d5f(0x1c7)]='',this['startCallEvent']();else{if(this['isSpriteVS8dir']())return this['characterIndexVS8']();return _0x4b65d5[_0x320d5f(0x2b9)][_0x320d5f(0x405)]['call'](this);}}else{if(_0x320d5f(0x5ad)==='jqqxy'){if(_0x29c1f7[this[_0x320d5f(0x3cd)]])this[_0x320d5f(0x1c7)]='',this[_0x320d5f(0x56b)]();else return!![];}else return!![];}}else return VisuMZ[_0x320d5f(0x2b9)][_0x320d5f(0x473)][_0x320d5f(0x1a2)](this);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x269)]=Game_Interpreter[_0x26bacd(0x42f)][_0x26bacd(0x557)],Game_Interpreter[_0x26bacd(0x42f)][_0x26bacd(0x557)]=function(){const _0x50b72b=_0x26bacd,_0x1c82d3=$gameMap&&this[_0x50b72b(0x65f)]?$gameMap[_0x50b72b(0x3b5)](this[_0x50b72b(0x65f)]):null;$gameTemp['registerSelfTarget'](_0x1c82d3);const _0x1e74ad=VisuMZ[_0x50b72b(0x2b9)][_0x50b72b(0x269)]['call'](this);return $gameTemp[_0x50b72b(0x419)](),_0x1e74ad;},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x2ad)]=Game_Interpreter['prototype']['command357'],Game_Interpreter['prototype'][_0x26bacd(0x4e8)]=function(_0x4e1a4a){const _0x5ddbd3=_0x26bacd;return $gameTemp[_0x5ddbd3(0x3fe)](this),VisuMZ['EventsMoveCore'][_0x5ddbd3(0x2ad)][_0x5ddbd3(0x1a2)](this,_0x4e1a4a);},Game_Interpreter[_0x26bacd(0x42f)][_0x26bacd(0x1f1)]=function(_0x2ee8db){const _0x597617=_0x26bacd;this['_callEventData']=_0x2ee8db;const _0x4681b3=_0x597617(0x237)[_0x597617(0x389)](_0x2ee8db[_0x597617(0x362)][_0x597617(0x20f)](0x3));this[_0x597617(0x3cd)]=_0x597617(0x690)+Graphics['frameCount']+'_'+this[_0x597617(0x18a)](),DataManager[_0x597617(0x478)](this['_callEventMap'],_0x4681b3),window[this['_callEventMap']]?this[_0x597617(0x56b)]():this[_0x597617(0x450)](_0x597617(0x666));},Game_Interpreter[_0x26bacd(0x42f)][_0x26bacd(0x56b)]=function(){const _0x4836ba=_0x26bacd,_0x10120e=this[_0x4836ba(0x5b3)],_0x2cd139=window[this[_0x4836ba(0x3cd)]],_0x251dc6=_0x2cd139[_0x4836ba(0x530)][_0x10120e[_0x4836ba(0x18a)]];if(_0x251dc6&&_0x251dc6[_0x4836ba(0x2ac)][_0x10120e[_0x4836ba(0x3dd)]-0x1]){if(_0x4836ba(0x4c9)!==_0x4836ba(0x4c9)){if(!_0x117adb['ALLOW_LADDER_DASH']&&this[_0x4836ba(0x5d4)]())return![];if(this[_0x4836ba(0x235)])return!![];return _0xb13472[_0x4836ba(0x2b9)][_0x4836ba(0x60a)][_0x4836ba(0x1a2)](this);}else{const _0x304168=_0x251dc6[_0x4836ba(0x2ac)][_0x10120e[_0x4836ba(0x3dd)]-0x1][_0x4836ba(0x57b)];this[_0x4836ba(0x390)](_0x304168,this['eventId']());}}window[this[_0x4836ba(0x3cd)]]=undefined,this['_callEventMap']=undefined,this['_callEventData']=undefined;};function Game_CPCInterpreter(){const _0x2802d0=_0x26bacd;this['initialize'][_0x2802d0(0x189)](this,arguments);};function _0x4453(){const _0x481586=['moveAwayFromCharacter','randomInt','Game_Follower_initialize','PlayerIconDelete','isTransparent','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','DEFAULT_SHIFT_Y','IJQCf','Game_Event_findProperPageIndex','getDiagonalDestination','cjnuK','_realY','iIlAu','_randomMoveWeight','Game_SelfSwitches_value','clearPageSettings','%1%2','EventTimerExpireClear','DiagonalSpeedMultiplier','command108','icbZN','indexOf','luBSQ','backX','904yrclgr','wcZle','startsWith','DrnaE','RIGHT\x20TO\x20LEFT','UPPER\x20RIGHT','roundY','startMapCommonEventOnTouch','screenX','Mcyhk','qplJx','processMoveRouteFadeOut','isPassableByAnyDirection','Game_Timer_stop','EventLabelRefresh','SPIN\x20CW','vert\x20mirror','VisuMZ_1_MessageCore','isValid','setDestination','cWXic','kkvbJ','isMovementSucceeded','Step1MapId','setOpacity','column','length','_visiblePlayerX','createSpawnedEvent','PqiNm','offsetX','advancedValue','events','LIGHT\x20BULB','approach','kkWRT','attachPictureSettings','timer','tileHeight','moveDiagonally','isPlayerForceShown','Window_NumberInput_processOk','Game_Event_start','ARRAYSTRUCT','changeSpeed','clearSpriteOffsets','onLoadAttachPicture','turnRight90','_vehicleType','kEpXi','RandomMoveWeight','SjjsH','reverse\x20mimic','PMZLw','xCvTi','_moveRoute','Window_Message_startMessage','Game_Player_increaseSteps','MapVariables','pTjQi','EnableDir8','RegionOk','mapValue','labelWindowText','startMapCommonEventOnOK','autosaveEventLocation','horz\x20mirror','getPosingCharacterIndex','checkAdvancedSwitchVariablePresent','log','Sprite_Balloon_setup','executeCommand','removeMorph','stop','vpUeQ','_mirrorSprite','SpawnEventDespawnEverything','SwKXs','obaQC','characterIndexVS8','Stop','Game_Enemy_meetsSwitchCondition','canMove','lnLmH','StopAutoMoveMessages','requestBalloon','lastSpawnedEvent','regionList','_forceCarrying','getPosingCharacterPattern','deleteSavedEventLocationKey','startCallEvent','resume','isPreventSelfMovement','PzwXR','CGgnM','directionOnLadderSpriteVS8dir','EventTimerFramesSet','default','VehicleDock','isWorking','_spriteset','_target','target','dTteI','irHgg','setMovementSuccess','list','pattern','deleteIconsOnEventsData','registerSelfEvent','YPSQh','_commonEvents','start','Operation','onDatabaseLoaded','airship','isRegionDockable','ZmXkb','AxZVl','_lastMovedDirection','variables','_regionRules','Map\x20%1\x20Switch\x20%2','text','setupEventsMoveCoreEffects','fittingHeight','contents','Frames','ExAMI','processMoveSynchReverseMimic','posNt','ELTJU','setupFollowerVisibilityOverrides','right','225moeeDf','Game_Map_event','bufferX','vGnbm','down','meetActivationRegionConditions','USER-DEFINED\x204','isBusy','processMoveSynchRandom','_eventIcon','_interpreter','Game_Map_setup','initEventsMoveCoreSettings','height','horizontal\x20mirror','some','metCPC','setDashingEnabled','WWEDO','IconSize','referEvent','Game_Event_updateParallel','jkNQo','MUSIC\x20NOTE','ojuiS','switch1Valid','SfRHm','bind','_callEventData','UPPER\x20LEFT','isSupportDiagonalMovement','FALSE','createCharacterShadow','requestAnimation','Game_Player_executeMove','removeTemporaryMapSpawnedEvents','lastMovedDirection','filename','realMoveSpeed','onExpire','Step1EventId','Game_Troop_meetsConditionsCPC','hideShadows','Window_EventItem_onCancel','_selfEvent','DashModifier','Game_Event_update','processMoveRouteJumpTo','HweZj','attachPictureOffsetX','checkActivationProximity','disable','aRkas','_eventLabelOffsetX','55200dpVVbI','processMoveSynchApproach','AllForbid','setBackgroundType','_selfTargetNumberInput','setupRegionRestrictions','processMoveRouteStepToCharacter','isOnLadder','LVSvx','savePreservedMorphEventDataKey','isDashDisabled','Game_Timer_initialize','create','_EventIcons','_comments','setItemChoice','exit','setPosition','isTargetEventValidForLabelWindow','isBoat','turnTowardPoint','filter','getDirectionFromPoint','Game_CharacterBase_setDirection','QMqxc','isMapVariable','IconSet','_spawnPreserved','_cpc','executeCommandCommonEvent','AmfwX','reverse\x20copy','DMVEU','FollowerReset','setupSpawn','checkValidEventerMap','moveForward','deleteIconsOnEventsDataKey','isSpawnHitboxCollisionOk','LOVE','getPose','jPCtZ','YieKm','hasCPCs','drawIcon','trim','adjustDir8MovementSpeed','_screenZoomScale','onOk','return\x200','_SavedEventLocations','parallelCommonEvents','lQLFt','roundYWithDirection','isDiagonalDirection','findTargetSprite','pmNVK','isNormalPriority','_erased','_addedHitbox','XEZif','Game_Player_isDashing','Game_CharacterBase_update','Self\x20Variable\x20%1','ImLQH','meetsCPC','iconSize','_patternLocked','process_VisuMZ_EventsMoveCore_Switches_Variables','selfValue','ZyDJi','HEART','Game_Character_forceMoveRoute','absDistance','_inputTime','morphIntoTemplate','_PreservedEventMorphData','ANGER','VehicleForbid','BnNma','processMoveSynchCustom','adjustMoveSynchOpacityDelta','SelfDataResetAll','EMKSK','NWPAe','WalkForbid','checkExistingEntitiesAt','prepareSpawnedEventAtXY','Passability','createShadows','KNRmq','setMoveSpeed','isRunning','Game_CharacterBase_canPass','Sprite_Balloon_updatePosition','dashSpeedModifier','Game_CharacterBase_isTransparent','EXCLAMATION','code','isPlaytest','Scene_Load_onLoadSuccess','VVJsY','getControlledFollowerID','_stepPattern','NORMAL','direction','_eventCopyData','HyipX','EventForbid','KecOP','_activationProximityAutoTriggerBypass','isPlayerControlDisabled','type','gsSOx','player','frontY','_moveRouteIndex','Scene_Boot_onDatabaseLoaded','PreMorphJS','vXiZf','_poseDuration','updateEventMirrorSprite','checkCollisionKeywords','_trigger','_followerControlID','BufferX','COLLAPSE','isBattleTest','isInVehicle','_MapSpawnedEventData','OpacitySpeed','regionId','checkSmartEventCollision','FontSize','Game_CharacterBase_increaseSteps','_shadowOpacity','Forbid','PreCopyJS','add','UdjOy','BGJlG','PZLBN','rDpzw','SLEEP','isAdvancedSwitch','itemPadding','_eventId','Label','setAllowEventAutoMovement','BjWbZ','getPosingCharacterDirection','_pose','updateSaveEventLocation','CallEvent','OKEUu','PreSpawnJS','loadCPC','addLoadListener','_needsRefresh','isTriggerIn','createContents','iconIndex','Dock','updateMove','opacityDelta','mirror\x20horz','setupAttachPictureBitmap','Game_Variables_value','isAllowEventAutoMovement','findDiagonalDirectionTo','terrainTag','deleteSavedEventLocation','turnTowardCharacter','8HZXZOB','isSelfVariable','AdvancedSwitches','EventID','getMapSpawnedEventData','BlendMode','slice','despawnTerrainTags','setEventIconData','executeMove','vwBcB','BGUhx','Hidden','createSaveEventLocationData','setValue','findDirectionTo','createAttachPictureSprite','VkGar','lQVxk','LGbYg','toUpperCase','6iXFFee','$callEventMap','Game_Switches_setValue','processMoveRouteSelfSwitch','setStopFollowerChasing','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','MoveRouteIndex','loadSystem','spriteId','hasClickTrigger','_eventSpawnData','updateBitmapSmoothing','_expireCommonEvent','boxWidth','updateAttachPictureBitmap','isObjectCharacter','BoatSpeed','JQgsr','_type','KNEEL','CustomPageConditions','_randomHomeX','Game_Player_getInputDirection','updateEventIconSprite','posEventsMoveCore','SILENCE','isJumping','startMapCommonEventOnOKTarget','processMoveSynchMirrorVert','CUQQO','updateStop','setMoveRoute','ConvertParams','BLsBK','_lastMapId','gRclP','_EventsMoveCoreSettings','getAttachPictureBitmapWidth','RegionOkTarget','despawnEverything','EiCBy','makeDeepCopy','updatePattern','moveSynchTarget','Game_Event_updateSelfMovement','IconBufferY','initFollowerController','OHZoe','requestRefresh','mainFontSize','gpzPR','BqJHn','setupSpawnedEvents','determineEventOverload','_data','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','_pattern','isAdvancedVariable','hprPD','DOWN','updateVS8BalloonOffsets','Game_CharacterBase_opacity','removeChild','startMessage','USER-DEFINED\x202','xJOEk','blendMode','unlock','1698780lzXjaR','apply','eventId','toLowerCase','includes','resetSelfSwitchesForEvent','AutoBuffer','Game_Map_refresh','QlUYb','SCREEN','setupEventsMoveCoreNotetags','canStartLocalEvents','BzSaz','TiltVert','FollowerSetTargetChase','Game_Player_checkEventTriggerHere','CPCsMet','KCOYR','isEventTest','EventIconChange','deletePreservedMorphEventDataKey','WsZPv','turnAwayFromCharacter','isVisible','_text','jePVa','call','KcegO','refreshIfNeeded','SwitchGetSelfSwitchABCD','isMapPassable','vertical\x20mirror','_eventScreenY','updateText','YirGd','SPIN\x20ACW','clearEventCache','NeHaJ','shadowX','KAQmV','mirror\x20horizontal','ccwY','tHEGn','_lastPluginCommandInterpreter','PostSpawnJS','PreloadedMaps','moveRouteIndex','xeddn','processMoveRouteBalloon','forceMoveRoute','MapID','BLFJg','_lastAttachPictureMaxSize','destinationY','SelfSwitchABCD','setMapValue','JCReb','_spriteOffsetY','isAnyEventStarting','AdvancedVariables','_event','TemplateName','canPass','_waitMode','attachPictureBlendMode','updateMoveSynch','kOfSG','wvbcD','ROUTE_SCRIPT','VisibleEventLabels','needsUpdate','aQhMl','visible','OBLVU','_frames','updateVisibility','setupPlayerVisibilityOverrides','Game_Player_isMapPassable','tvebJ','addChild','isSpawnedEvent','483728FbOJHk','1005030CqKgAB','_moveSynch','round','convertVariableValuesInScriptCall','VariableId','Rope','Game_Timer_start','zgJXc','ZRxDp','QSOBu','processMoveRouteJumpForward','Event','initMembers','move','characterPatternY','WFBJa','constructor','Game_Event_checkEventTriggerAuto','LqPJq','setTileBitmap','zbsCX','useCarryPoseForIcons','updatePeriodicRefresh','pluginCommandCallEvent','string','EventTemplates','CommonEventID','VariableGetSelfVariableID','_dragonbones','QazPa','inBattle','SpawnEventDespawnEventID','resetSelfSwitchesForMap','BULB','jSpEn','frontX','map','mirror\x20vertical','Game_CharacterBase_moveDiagonally','setPlayerControlDisable','square','return\x20%1','...','pWfkL','Name','TerrainTags','Game_Event_setupPageSettings','SQiMI','EventTimerPause','mgIbV','EventId','_selfTarget','VAQWe','padZero','Game_CharacterBase_hasStepAnime','LOWER\x20LEFT','Game_Message_add','iconWidth','createLabelWindows','textSizeEx','windowPadding','moveByInput','lock','initEventsMoveCoreEffects','fYzBC','xhEHh','split','isPlayerForceHidden','onChange','SWEAT','roundX','Game_Troop_meetsConditions','nEwfJ','_moveOnlyRegions','match','IconBlendMode','bdNgp','Game_CharacterBase_pattern','ssXWx','Button','Game_Follower_chaseCharacter','XjtJS','_pageIndex','_alwaysUpdateMove','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','screenY','HIxNH','PreloadMaps','LEFT\x20TO\x20RIGHT','Game_CommonEvent_isActive','PostMorphJS','_forceDashing','PosY','Map%1.json','visibleRange','shift','_eventOverloadThreshold','_attachPictureSprite','Hours','AyTIc','Game_Map_isDashDisabled','setDiagonalDirection','execute','attachPictureFilename','isMoveOnlyRegionPassable','VtCZu','getEventIconIndex','processMoveRouteFadeIn','initMembersEventsMoveCore','initialize','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','_characterIndex','isEmptyCharacter','max','setPlayerDiagonalSetting','jump','_spawnData','Game_Switches_value','Game_Followers_isVisible','TOGGLE','_eventOverload','updateSelfMovement','isNearTheScreen','MUSICNOTE','attachPictureScale','vMjUi','VICTORY','opacitySpeed','HMPH','ANNOYED','Player','Value','COBWEB','dir8','spawnPreserved','setupEventsMoveCoreCommentTags','VisibleRange','zoomScale','clearStepPattern','resizeWindow','PlayerMovementChange','value','Game_Map_unlockEvent','Game_Interpreter_executeCommand','%1Forbid','moveBackToRandomHome','despawnAtXY','sykYn','UjKUH','_shadowGraphic','anchor','processDrawIcon','Region','_PlayerDiagonalSetting','despawnRegions','width','kjcEb','iFGmo','Enable','reverse','lastSpawnedEventID','setFrames','parameters','bufferY','PlayerMovementDiagonal','DIAGONAL_PATHFINDING_EVENT_LIMIT','getPreservedMorphEventData','setNumberInput','JhvVD','lvKzi','Template','_visiblePlayerY','FastForwardKey','distance','zzrOd','setupDiagonalSupport','SelfVariables','OFF','CKIqo','qXzvO','214225mYvOkq','Icon','getSavedEventLocation','clearAttachPictureSettings','BalloonOffsetX','EVAL','yJpzY','naRdQ','IconIndex','RZrDf','increaseSteps','isEventRunning','Spriteset_Map_createShadow','FollowerID','baggN','hasAdvancedSwitchVariable','FollowerSetControl','Game_Map_events','DPxco','updateEventsAndMovementCore','Minutes','deleteEventLocation','SuccessSwitchId','%1Dock','VS8','Ship','Preserve','isDashingEnabled','processMoveRouteTeleportTo','CCuIm','pages','Game_Interpreter_PluginCommand','labelWindowRange','PostCopyJS','GetMoveSynchTarget','kufdY','deltaY','FkPSb','_diagonalSupport','processMoveRouteJumpToCharacter','_events','registerSelfTarget','isLongPressed','EventsMoveCore','template','XLByX','tyyRF','PwYCN','Collision','aEQFv','isCollidedWithEvents','isEventOverloaded','DEfWQ','min','roundXWithDirection','setupPageSettings','zOnkL','BalloonOffsetY','resetExitSelfSwitches','gbzQP','eventLabelsVisible','_requestSaveEventLocation','correctFacingDirection','WuhBP','trigger','EPfOz','EnableTurnInPlace','isEventsMoveCoreInvisible','isMapSwitch','isPassable','clearDashing','refresh','setImage','_visibleEventX','floor','Speed','xkTwT','OffsetY','Spriteset_Map_createLowerLayer','delay','TiltLeft','Game_Map_parallelCommonEvents','_advancedSwitchVariable','%1,','YujDl','unlockEvent','Game_Vehicle_isMapPassable','MUSIC-NOTE','_direction','Game_Event_moveTypeRandom','deGQA','hasDragonbones','characterPatternYBasic','updateShadowChanges','activationProximityDistance','NUM','SpawnEventDespawnAtXY','Game_Event_locate','MapSwitches','cwX','_saveEventLocations','HbRdP','forceDashing','rOdvK','updateEventsMoveCoreTagChanges','Sprite_Character_characterPatternY','_randomHomeY','_encounterEffectDuration','isAllowCharacterTilt','getLastPluginCommandInterpreter','isCollidedWithPlayerCharacters','isRegionForbidPass','MapId','_forceShowPlayer','EnableDashTilt','switches','NocVL','isOnRope','isDashing','JSON','XwEeE','hMwAR','setupEvents','isDashingAndMoving','switchId','YeBht','Sprite_Character_update','updatePose','StopAutoMoveEvents','updateTilt','Map%1-Event%2','SelfSwitchID','turnLeft90','Map\x20%1\x20Variable\x20%2','_forceShowFollower','updateEventCustomZ','note','_mapId','eventsXyNt','_scene','areFollowersForceShown','yWsXR','mHrrC','maxSize','Game_SelfSwitches_setValue','VisuMZ_Setup_Preload_Map','fontFace','BWRFY','TRUE','isAirship','MoveAllSynchTargets','CVbjM','Window_EventItem_onOk','wTNHk','reverseDir','Seconds','SPIN\x20COUNTERCLOCKWISE','offsetY','moveSynchType','updatePosition','setSelfValue','wbmoI','attachPictureMaxSize','saveEventLocation','MorphEventTo','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_eventPageIndex','Movement','ShowShadows','ShiftY','fontSize','bSInW','conditions','xIjLJ','Game_Event_clearPageSettings','update','FavorHorz','row','onCancel','_eventMorphData','convertSelfVariableValuesInScriptCall','PlayerForbid','USER-DEFINED\x205','EventTimerFramesGain','reFfp','_lastAttachPictureScale','setCharacterBitmap','_speed','cMMPu','parse','ajJHf','KnBgT','moveTowardCharacter','eDxog','RemovePreserve','qIwGy','MLwhl','executeCommonEvent','_proxyWindow','TidwM','resetFontSettings','autoEventIconBuffer','processMoveRouteSetIndex','_needsPeriodicRefresh','SQrBI','updateScale','_CPCs','noWPj','setBalloonPose','_filename','isSpriteVS8dir','description','mapId','PmYCE','_character','setup','EventLabelVisible','Game_CharacterBase_moveStraight','boat','TargetVariableId','_seconds','qOOXK','activationRegionList','HURT','Visible','QUESTION','_eventIconSprite','setControlledFollowerID','moveAwayFromPoint','processSaveEventLocation','Game_Event_meetsConditionsCPC','_stopCount','initEventsMoveCore','HhPMH','LIGHT','Boat','XXoFx','DCUuA','LOnAg','isStopFollowerChasing','checkEventsMoveCoreStringTags','setDirection','createSpawnedEventWithData','%1DockRegionOnly','processMoveSynch','KNjTm','createBitmap','EventLocationCreate','vAqAG','processMoveRouteAnimation','_actuallyMoving','format','Game_Timer_onExpire','characterIndex','OjxFN','isPosing','ZZZ','_forceHideFollower','setupChild','Vehicle','eraseEvent','tileWidth','Game_CharacterBase_screenX','_customZ','_labelWindows','sCFEx','follower','_working','Game_Message_setItemChoice','firstSpawnedEvent','createShadow','isDestinationValid','Mvuav','_spawnedEvents','ITEM','khFOm','_saveEventLocation','DbgtH','front','_realX','spawnEventId','jeJqc','hasEventIcon','BhNxR','Window_ScrollText_startMessage','processMoveSynchMirrorHorz','VgZGf','isShadowVisible','backY','bGTqB','SwitchGetSelfSwitchID','despawnEventId','ARRAYSTR','Settings','executeMoveDir8','event','_eventCache','followers','rxoWU','Chase','concat','cwY','restoreSavedEventPosition','oXLNJ','AnLEb','WalkAllow','AiQdr','checkNeedForPeriodicRefresh','setEventLabelsVisible','yTGWg','isSaveEventLocation','SPIN\x20CCW','iEmfS','processMoveRouteMoveUntilStop','aKOem','setChaseOff','processMoveRouteTeleportToCharacter','StrictCollision','Qnoxn','_callEventMap','kJHAj','Self\x20Switch\x20%1','Window_NumberInput_start','TerrainTag','%1,%2,','left','EpeZD','_followerChaseOff','DashingEnable','Sprite_Character_setCharacterBitmap','getPlayerDiagonalSetting','createProxyWindow','setPose','UyRDC','_periodicRefreshTimer','pageId','attachPictureOffsetY','noNOQ','QqELo','IwrKI','MxzBT','MULTIPLY','EventLocationDelete','iconHeight','processMoveRouteMoveToCharacter','Game_CharacterBase_initMembers','PosX','EventIconDelete','advancedFunc','Game_Map_setupEvents_SelfReset','toAtE','pause','zrsgT','SpawnEventDespawnRegions','ccwX','Game_Player_checkEventTriggerThere','_commonEventId','checkEventTriggerEventsMoveCore','%1:%2','FollowerSetGlobalChase','opacity','isAirshipPassable','txUpT','eventsXy','moveTypeRandom','Game_Character_processMoveCommand','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setupSaveEventLocations','setLastPluginCommandInterpreter','_eventLabelOffsetY','characterName','clearDestination','rotation','turn180','QaAMZ','Game_CharacterBase_characterIndex','innerWidth','getInputDirection','Game_Event_initialize','AirshipSpeed','shadowY','reserveCommonEvent','_clickTrigger','gCNqn','setEventIconDataKey','tTZxS','hasStepAnime','YAJqp','setupSpawnTest','uQlXJ','status','All','pageIndex','registerCommand','JdkLE','clearSelfTarget','cxgMA','smooth','EventAutoMovement','Game_Map_update','fBPwH','RYeDR','needsAttachPictureUpdate','TiltRight','irwsX','bitmap','Game_Temp_setDestination','OffsetX','Region%1','DefaultShadow','isTile','meetActivationProximityConditions','updateWaitMode','SelfSwitches','isMoving','oASDH','SCveP','prototype','_starting','setupMorphEvent','_selfTargetItemChoice','startEncounterEffect','name','SwitchId','PlayerIconChange','defaultFontSize','processMoveSynchMimic','contentsOpacity','_opacity','getSelfTarget','checkRegionEventTrigger','isSaveEventLocations','processMoveRouteMoveRepeat','getInputDir8','version','Eolas','Game_Vehicle_initMoveSpeed','_isObjectCharacter','abs','_cacheVisibility','charAt','RegionTouch','isLandOk','iMvyB','SpawnEventAtXY','FRJeN','Game_CharacterBase_screenY','UNTITLED','ARRAYFUNC','_visibleEventY','setWaitMode','oetCj','OkEKK','processMoveRoutePatternLock','TmaJz','USER-DEFINED\x203','shadowFilename','_forceHidePlayer','XXaBe','uMGoX','YUscm','setPattern','standing','scale','_chaseOff','drawText','prepareSpawnedEventAtTerrainTag','refreshBushDepth','vehicle','Game_Variables_setValue','tGvRx','Step2EventId','_attachPicture','_shadowSprite','PageId','_reflection','Scene_Map_startEncounterEffect','TargetSwitchId','Game_Event_event','_characterSprites','drawTextEx','KFddD','WtBCG','$preloadedMap_%1','VjBNB','Game_Interpreter_updateWaitMode','AutoBalloon','192038eDOrMG','initMoveSpeed','createIconSprite','loadDataFile','RCBDu','loUVb','turnAwayFromPoint','switch2Id','_eventScreenX','updateRoutineMove','Letter','replace','nyCGU','_moveSpeed','processMoveRouteHugWall','onLoadSuccess','_labelWindow','ADDITIVE','clear','moveTowardPoint','_activationProximity','Disable','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','updateOpacity','activationProximityType','clamp','setFrame','none','isActive','onClickTrigger','SpawnEventAtTerrainTag','rZowd','areFollowersForceHidden','push','_cacheSystemVisible','Step2MapId','deltaYFrom','List','_lastAttachPictureFilename','ALLOW_LADDER_DASH','moveStraight','sNYAE','Ovabg','clearPose','EventTimerSpeed','pos','processMoveRouteStepTo','character','Sprite_Character_setTileBitmap','isRegionAllowPass','ISPsY','_paused','AllAllow','qjjFI','SPIN\x20ANTICLOCKWISE','HlLzo','gainFrames','isShadowShrink','SelfVariableID','GxrEB','_moveAllowPlayerCollision','NOTE','_eventErased','deltaX','createLowerLayer','isLabelVisible','isTurnInPlace','_DisablePlayerControl','fihFX','custom','drawing','CPC','MorphEventRemove','updateParallel','Sprite_Character_initMembers','tJuHu','OperateValues','uVzXC','prepareSpawnedEventAtRegion','Game_Interpreter_character','checkEventTriggerThere','enable','_characterName','createLabelWindowForTarget','rgPHe','Toggle','locate','morphInto','region','_spriteOffsetX','IwoFm','updatePatternEventsMoveCore','firstSpawnedEventID','pUEEX','bLaSG','isSelfSwitch','findProperPageIndex','TurnInPlaceDelay','processMoveCommandEventsMoveCore','of\x20Preloaded\x20Maps.\x0a\x0a','setCommonEvent','_hidden','Game_Message_setNumberInput','keys','characterPatternYVS8','Game_Event_isCollidedWithPlayerCharacters','getEventIconData','kYGZJ','SPIN\x20CLOCKWISE','STR','Game_Event_meetsConditions','meetsConditions','Txdnb','updateAttachPictureSprite','updateShadow','command357','deltaXFrom','getDirectionToPoint','Game_Vehicle_isLandOk','ARRAYJSON','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','mbcou','processMoveCommand','hasMoveOnlyRegions','_tilemap','GmOya','meetsSwitchCondition','random','EventTimerResume','processMoveRouteMoveTo','setupCopyEvent'];_0x4453=function(){return _0x481586;};return _0x4453();}Game_CPCInterpreter[_0x26bacd(0x42f)]=Object[_0x26bacd(0x5d9)](Game_Interpreter[_0x26bacd(0x42f)]),Game_CPCInterpreter[_0x26bacd(0x42f)][_0x26bacd(0x1ea)]=Game_CPCInterpreter,Game_CPCInterpreter['prototype'][_0x26bacd(0x487)]=function(){const _0x424f5c=_0x26bacd;Game_Interpreter[_0x424f5c(0x42f)][_0x424f5c(0x487)][_0x424f5c(0x1a2)](this),this[_0x424f5c(0x5e9)]=![];},Game_CPCInterpreter[_0x26bacd(0x42f)]['execute']=function(){const _0x1574b2=_0x26bacd;while(this[_0x1574b2(0x629)]()){this[_0x1574b2(0x557)]();}},Game_CPCInterpreter[_0x26bacd(0x42f)][_0x26bacd(0x353)]=function(_0x266381){const _0x254496=_0x26bacd;while(this[_0x254496(0x629)]()){this['executeCommandCommonEvent'](_0x266381);}},Game_CPCInterpreter[_0x26bacd(0x42f)]['executeCommandCommonEvent']=function(_0x3c6c54){const _0x7a23f2=_0x26bacd,_0x11f5e8=_0x3c6c54;$gameTemp[_0x7a23f2(0x2b7)](_0x11f5e8);const _0x25849a=VisuMZ[_0x7a23f2(0x2b9)][_0x7a23f2(0x269)][_0x7a23f2(0x1a2)](this);return $gameTemp[_0x7a23f2(0x419)](),_0x25849a;},Game_CPCInterpreter[_0x26bacd(0x42f)][_0x26bacd(0x50b)]=function(_0x205de7){const _0x50d684=_0x26bacd;return Game_Interpreter[_0x50d684(0x42f)][_0x50d684(0x50b)][_0x50d684(0x1a2)](this,_0x205de7),this[_0x50d684(0x5db)][_0x50d684(0x5a6)](_0x301efe=>_0x301efe[_0x50d684(0x224)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this['_cpc']=!![]),!![];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x46a)]=Scene_Map[_0x26bacd(0x42f)][_0x26bacd(0x433)],Scene_Map['prototype']['startEncounterEffect']=function(){const _0x8787a3=_0x26bacd;VisuMZ['EventsMoveCore']['Scene_Map_startEncounterEffect'][_0x8787a3(0x1a2)](this),this[_0x8787a3(0x575)][_0x8787a3(0x5c1)]();},VisuMZ['EventsMoveCore']['Scene_Load_onLoadSuccess']=Scene_Load['prototype']['onLoadSuccess'],Scene_Load[_0x26bacd(0x42f)][_0x26bacd(0x484)]=function(){const _0x1849d6=_0x26bacd;if($gameMap)$gameMap[_0x1849d6(0x1ac)]();VisuMZ[_0x1849d6(0x2b9)][_0x1849d6(0x631)][_0x1849d6(0x1a2)](this);},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x4bf)]=Sprite_Character['prototype'][_0x26bacd(0x1e6)],Sprite_Character['prototype']['initMembers']=function(){const _0x46bcdb=_0x26bacd;VisuMZ[_0x46bcdb(0x2b9)][_0x46bcdb(0x4bf)][_0x46bcdb(0x1a2)](this),this[_0x46bcdb(0x246)](),this['createAttachPictureSprite'](),this['createIconSprite']();},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x246)]=function(){const _0x4ed55d=_0x26bacd;this[_0x4ed55d(0x654)]=0xff;},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x68a)]=function(){const _0x231576=_0x26bacd;this[_0x231576(0x23b)]=new Sprite(),this[_0x231576(0x23b)][_0x231576(0x270)]['x']=0.5,this[_0x231576(0x23b)][_0x231576(0x270)]['y']=0x1,this[_0x231576(0x1d7)](this[_0x231576(0x23b)]),this[_0x231576(0x4e6)]();},Sprite_Character['prototype'][_0x26bacd(0x477)]=function(){const _0x431255=_0x26bacd;this[_0x431255(0x370)]=new Sprite(),this[_0x431255(0x370)][_0x431255(0x423)]=ImageManager[_0x431255(0x14b)](_0x431255(0x5e7)),this[_0x431255(0x370)][_0x431255(0x423)][_0x431255(0x41b)]=![],this[_0x431255(0x370)][_0x431255(0x48f)](0x0,0x0,0x0,0x0),this[_0x431255(0x370)][_0x431255(0x270)]['x']=0.5,this[_0x431255(0x370)][_0x431255(0x270)]['y']=0x1,this['addChild'](this[_0x431255(0x370)]);},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x360)]=function(){const _0x4e4fc3=_0x26bacd;return this[_0x4e4fc3(0x4c7)]&&this[_0x4e4fc3(0x4c7)]['match'](/\[VS8\]/i);},Sprite_Character[_0x26bacd(0x42f)]['isAutoBufferIcon']=function(){const _0x126499=_0x26bacd;return this[_0x126499(0x360)]()&&VisuMZ['EventsMoveCore']['Settings'][_0x126499(0x2a6)][_0x126499(0x18e)];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x30c)]=Sprite_Character[_0x26bacd(0x42f)]['update'],Sprite_Character[_0x26bacd(0x42f)]['update']=function(){const _0x467f94=_0x26bacd;VisuMZ['EventsMoveCore']['Sprite_Character_update'][_0x467f94(0x1a2)](this),this[_0x467f94(0x2a1)]();},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x1d3)]=function(){const _0x214580=_0x26bacd;Sprite[_0x214580(0x42f)]['updateVisibility'][_0x214580(0x1a2)](this),this[_0x214580(0x2d1)]()&&(this['visible']=![]);},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x2d1)]=function(){const _0x3b8cd9=_0x26bacd;if(this[_0x3b8cd9(0x244)]()>0x0)return![];if(this[_0x3b8cd9(0x364)]){if(this[_0x3b8cd9(0x364)][_0x3b8cd9(0x241)]()!=='')return![];}return this['isEmptyCharacter']()||this[_0x3b8cd9(0x364)]&&this['_character'][_0x3b8cd9(0x4fc)]();},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x2a1)]=function(){const _0x1fb7d2=_0x26bacd;this[_0x1fb7d2(0x30f)](),this['updateShadow'](),this[_0x1fb7d2(0x15b)](),this[_0x1fb7d2(0x315)](),this[_0x1fb7d2(0x646)](),this['updateAttachPictureSprite']();},VisuMZ['EventsMoveCore'][_0x26bacd(0x4a5)]=Sprite_Character['prototype'][_0x26bacd(0x1ed)],Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x1ed)]=function(){const _0x4f6f6b=_0x26bacd;VisuMZ[_0x4f6f6b(0x2b9)][_0x4f6f6b(0x4a5)][_0x4f6f6b(0x1a2)](this),this[_0x4f6f6b(0x423)][_0x4f6f6b(0x66a)](this[_0x4f6f6b(0x14f)][_0x4f6f6b(0x5b2)](this));},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x3d7)]=Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x348)],Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x348)]=function(){const _0xd7a3f2=_0x26bacd;VisuMZ['EventsMoveCore']['Sprite_Character_setCharacterBitmap'][_0xd7a3f2(0x1a2)](this),this['bitmap'][_0xd7a3f2(0x66a)](this[_0xd7a3f2(0x14f)][_0xd7a3f2(0x5b2)](this));},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x14f)]=function(){const _0x391d7b=_0x26bacd;if(!this[_0x391d7b(0x423)])return;this[_0x391d7b(0x423)][_0x391d7b(0x41b)]=!!VisuMZ['EventsMoveCore'][_0x391d7b(0x3b3)][_0x391d7b(0x335)]['BitmapSmoothing'];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x2f7)]=Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x1e8)],Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x1e8)]=function(){const _0x372841=_0x26bacd;if(this[_0x372841(0x360)]()){if(_0x372841(0x586)!==_0x372841(0x1bb))return this[_0x372841(0x4dd)]();else{_0x572515[_0x372841(0x164)](_0xb3fdca,_0x40d622);const _0x2076f0=_0x2be4cc['getLastPluginCommandInterpreter'](),_0x278e14={'template':_0x46afd6[_0x372841(0x1c5)],'mapId':_0x4ce2c4[_0x372841(0x2fe)]||_0x411514[_0x372841(0x362)](),'eventId':_0x108829[_0x372841(0x20c)]||_0x2076f0[_0x372841(0x18a)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x4fbe5e[_0x372841(0x2a8)],'spawnEventId':_0x3cf103[_0x372841(0x39f)][_0x372841(0x52a)]+0x3e8},_0x474299=_0x46936d[_0x372841(0x2a4)]||0x0;if(!_0x281b68[_0x372841(0x1b5)][_0x278e14[_0x372841(0x362)]]&&_0x278e14[_0x372841(0x362)]!==_0x3c29e2[_0x372841(0x362)]()){let _0x49906a='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x372841(0x389)](_0x278e14['mapId']);_0x49906a+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x49906a+=_0x372841(0x22e),_0x49906a+=_0x372841(0x248),_0x49906a+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'['format'](_0x278e14['mapId']),_0x54b276(_0x49906a);return;}const _0x61152c=_0x22adf3[_0x372841(0x460)](_0x278e14,_0x5e998b['TerrainTags'],_0x2f98a1['Collision'],_0x5404da['Passability']);_0x474299&&_0x53afca[_0x372841(0x688)](_0x474299,!!_0x61152c);}}else return this[_0x372841(0x2ea)]();},Sprite_Character['prototype']['characterPatternYVS8']=function(){const _0x219631=_0x26bacd,_0x4c1cc7=this[_0x219631(0x364)][_0x219631(0x636)]();let _0x336eb4=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];if(this[_0x219631(0x364)]['_mirrorSprite']){if(_0x219631(0x22b)===_0x219631(0x5e5))return this[_0x219631(0x37f)](0x7);else _0x336eb4=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6];}return(_0x336eb4[_0x4c1cc7]-0x2)/0x2;},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x2ea)]=function(){const _0x40e9c7=_0x26bacd;let _0x395ca2=this[_0x40e9c7(0x364)]['direction']();if(this[_0x40e9c7(0x364)][_0x40e9c7(0x55b)]){if(_0x395ca2===0x4)_0x395ca2=0x6;else _0x395ca2===0x6&&(_0x395ca2=0x4);}return(_0x395ca2-0x2)/0x2;},Sprite_Character['prototype'][_0x26bacd(0x30f)]=function(){const _0x1524c4=_0x26bacd;if(!VisuMZ[_0x1524c4(0x2b9)][_0x1524c4(0x3b3)][_0x1524c4(0x335)][_0x1524c4(0x300)])return;this[_0x1524c4(0x402)]=0x0;if(this[_0x1524c4(0x2fa)]()){const _0x45ed6c=VisuMZ['EventsMoveCore']['Settings'][_0x1524c4(0x335)],_0x25d8fa=this[_0x1524c4(0x364)][_0x1524c4(0x636)]();let _0x1c518e=0x0;if([0x1,0x4,0x7][_0x1524c4(0x18c)](_0x25d8fa))_0x1c518e=_0x45ed6c[_0x1524c4(0x2de)];if([0x3,0x6,0x9][_0x1524c4(0x18c)](_0x25d8fa))_0x1c518e=_0x45ed6c[_0x1524c4(0x421)];if([0x2,0x8][_0x1524c4(0x18c)](_0x25d8fa)){if(_0x1524c4(0x209)===_0x1524c4(0x3ec)){if(!_0x55166d[_0x1524c4(0x2b9)]['Settings'][_0x1524c4(0x335)][_0x1524c4(0x300)])return;this[_0x1524c4(0x402)]=0x0;if(this[_0x1524c4(0x2fa)]()){const _0x441984=_0x3f2e59[_0x1524c4(0x2b9)][_0x1524c4(0x3b3)][_0x1524c4(0x335)],_0x2f1993=this['_character'][_0x1524c4(0x636)]();let _0x240942=0x0;if([0x1,0x4,0x7][_0x1524c4(0x18c)](_0x2f1993))_0x240942=_0x441984[_0x1524c4(0x2de)];if([0x3,0x6,0x9][_0x1524c4(0x18c)](_0x2f1993))_0x240942=_0x441984[_0x1524c4(0x421)];[0x2,0x8]['includes'](_0x2f1993)&&(_0x240942=[-_0x441984[_0x1524c4(0x195)],0x0,_0x441984[_0x1524c4(0x195)]][this[_0x1524c4(0x364)][_0x1524c4(0x57c)]()]);if(this[_0x1524c4(0x469)])_0x240942*=-0x1;this[_0x1524c4(0x402)]=_0x240942;}}else _0x1c518e=[-_0x45ed6c[_0x1524c4(0x195)],0x0,_0x45ed6c['TiltVert']][this[_0x1524c4(0x364)]['pattern']()];}if(this[_0x1524c4(0x469)])_0x1c518e*=-0x1;this['rotation']=_0x1c518e;}},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x2fa)]=function(){const _0x2700e4=_0x26bacd;if(this[_0x2700e4(0x1f6)])return![];return this[_0x2700e4(0x364)][_0x2700e4(0x309)]()&&!this[_0x2700e4(0x364)][_0x2700e4(0x5d4)]()&&!this['_character'][_0x2700e4(0x38d)]()&&this['getEventIconIndex']()===0x0;},Sprite_Character['prototype'][_0x26bacd(0x4e7)]=function(){const _0x39e8c7=_0x26bacd;if(!this[_0x39e8c7(0x467)])return;this[_0x39e8c7(0x467)]['x']=this[_0x39e8c7(0x364)][_0x39e8c7(0x1ae)](),this['_shadowSprite']['y']=this[_0x39e8c7(0x364)][_0x39e8c7(0x40a)](),this['_shadowSprite'][_0x39e8c7(0x3f6)]=this[_0x39e8c7(0x3f6)],this[_0x39e8c7(0x467)][_0x39e8c7(0x1d0)]=this[_0x39e8c7(0x364)][_0x39e8c7(0x3ad)](),this[_0x39e8c7(0x467)][_0x39e8c7(0x4da)]=this[_0x39e8c7(0x4da)],!this[_0x39e8c7(0x364)][_0x39e8c7(0x4ae)]()?(this[_0x39e8c7(0x467)][_0x39e8c7(0x45d)]['x']=Math['min'](0x1,this[_0x39e8c7(0x467)][_0x39e8c7(0x45d)]['x']+0.1),this[_0x39e8c7(0x467)]['scale']['y']=Math[_0x39e8c7(0x2c3)](0x1,this['_shadowSprite'][_0x39e8c7(0x45d)]['y']+0.1)):(this['_shadowSprite'][_0x39e8c7(0x45d)]['x']=Math['max'](0x0,this[_0x39e8c7(0x467)][_0x39e8c7(0x45d)]['x']-0.1),this['_shadowSprite'][_0x39e8c7(0x45d)]['y']=Math[_0x39e8c7(0x24b)](0x0,this[_0x39e8c7(0x467)][_0x39e8c7(0x45d)]['y']-0.1));},Sprite_Character['prototype'][_0x26bacd(0x15b)]=function(){const _0x588019=_0x26bacd;if(!this[_0x588019(0x370)])return;const _0x1e14a8=this[_0x588019(0x370)],_0x26b514=this['getEventIconIndex']();if(_0x26b514<=0x0)return _0x1e14a8['setFrame'](0x0,0x0,0x0,0x0);else{const _0x53d4e3=ImageManager[_0x588019(0x213)],_0x3a740a=ImageManager[_0x588019(0x3e5)],_0x243b36=_0x26b514%0x10*_0x53d4e3,_0x2f63d6=Math['floor'](_0x26b514/0x10)*_0x3a740a;_0x1e14a8[_0x588019(0x48f)](_0x243b36,_0x2f63d6,_0x53d4e3,_0x3a740a),this['visible']=!![];}const _0x17b455=this[_0x588019(0x364)][_0x588019(0x4df)]();if(this['isAutoBufferIcon']()){if(_0x588019(0x351)==='qIwGy')this[_0x588019(0x357)](_0x1e14a8);else return this[_0x588019(0x43f)]();}else _0x1e14a8['x']=_0x17b455?_0x17b455[_0x588019(0x599)]:0x0,_0x1e14a8['y']=_0x17b455?-this[_0x588019(0x5a4)]+_0x17b455[_0x588019(0x27d)]:0x0;_0x1e14a8[_0x588019(0x186)]=_0x17b455?_0x17b455[_0x588019(0x186)]:0x0,this['removeChild'](_0x1e14a8),this[_0x588019(0x1d7)](_0x1e14a8),_0x1e14a8[_0x588019(0x402)]=-this['rotation'];},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x315)]=function(){const _0x28071a=_0x26bacd;if(!this[_0x28071a(0x364)])return;if(this[_0x28071a(0x364)]['_customZ']===undefined)return;if(this['_character'][_0x28071a(0x395)]===![])return;this['z']=this['_character'][_0x28071a(0x395)],this['z']<0x0?this[_0x28071a(0x467)]['z']=this['z']-0x1:this[_0x28071a(0x467)]['z']=0x0;},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x646)]=function(){const _0x111035=_0x26bacd;if(!this['_character'])return;let _0x22879e=!!this['_character'][_0x111035(0x55b)];this['scale']['x']=Math[_0x111035(0x444)](this[_0x111035(0x45d)]['x'])*(_0x22879e?-0x1:0x1);},Sprite_Character[_0x26bacd(0x42f)]['autoEventIconBuffer']=function(_0x4b2f76){const _0x3e0006=_0x26bacd;_0x4b2f76['x']=0x0,_0x4b2f76['y']=-this[_0x3e0006(0x5a4)]+this[_0x3e0006(0x5a4)]*0x2/0x5,this[_0x3e0006(0x364)]['pattern']()!==0x1&&(_0x3e0006(0x46f)!==_0x3e0006(0x46f)?_0x38eced[_0x3e0006(0x688)](_0x132f5a,!!_0xdb6b94):_0x4b2f76['y']+=0x1);},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x244)]=function(){const _0x25f9c5=_0x26bacd;if(!this[_0x25f9c5(0x364)])return 0x0;if(this[_0x25f9c5(0x364)]['_erased'])return 0x0;const _0x247c82=this['_character'][_0x25f9c5(0x4df)]();return _0x247c82?_0x247c82[_0x25f9c5(0x66e)]||0x0:0x0;},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x4e6)]=function(){const _0x3569bf=_0x26bacd;if(!this[_0x3569bf(0x23b)])return;if(!this['_character'])return;this['setupAttachPictureBitmap'](),this[_0x3569bf(0x152)]();},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x673)]=function(){const _0x2a37a6=_0x26bacd;if(!this[_0x2a37a6(0x420)]())return;const _0x30da62=this[_0x2a37a6(0x364)]['attachPictureSettings']();this[_0x2a37a6(0x49b)]=_0x30da62[_0x2a37a6(0x5bc)],this['_lastAttachPictureMaxSize']=_0x30da62['maxSize'],this[_0x2a37a6(0x347)]=_0x30da62[_0x2a37a6(0x45d)];if(_0x30da62[_0x2a37a6(0x5bc)]!==''){if('NEQIO'!==_0x2a37a6(0x243)){const _0x2105b8=ImageManager['loadPicture'](_0x30da62[_0x2a37a6(0x5bc)]);_0x2105b8[_0x2a37a6(0x66a)](this[_0x2a37a6(0x53e)][_0x2a37a6(0x5b2)](this,_0x2105b8));}else return!![];}else{if('LOnAg'!==_0x2a37a6(0x37c)){if(_0x3fed88||this[_0x2a37a6(0x360)]()){if(_0x35fcd7>0x0&&_0x1f0f5f<0x0)return 0x1;if(_0x202492<0x0&&_0x5a46cc<0x0)return 0x3;if(_0x252b91>0x0&&_0x2b650b>0x0)return 0x7;if(_0x50f5cc<0x0&&_0x2183ba>0x0)return 0x9;}}else this[_0x2a37a6(0x23b)][_0x2a37a6(0x423)]=new Bitmap(0x1,0x1);}},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x152)]=function(){const _0xe7af28=_0x26bacd,_0x5ded26=this['_attachPictureSprite'];_0x5ded26['x']=this['_character']['attachPictureOffsetX'](),_0x5ded26['y']=this['_character']['attachPictureOffsetY'](),_0x5ded26[_0xe7af28(0x186)]=this[_0xe7af28(0x364)][_0xe7af28(0x1c8)]();},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x420)]=function(){const _0x248289=_0x26bacd,_0x494f3e=this[_0x248289(0x364)][_0x248289(0x534)]();if(_0x494f3e){if(this[_0x248289(0x49b)]!==_0x494f3e['filename'])return!![];if(this[_0x248289(0x1bc)]!==_0x494f3e[_0x248289(0x31d)])return!![];if(this['_lastAttachPictureScale']!==_0x494f3e['scale'])return!![];}return![];},Sprite_Character['prototype'][_0x26bacd(0x53e)]=function(_0x214a55){const _0x389d28=_0x26bacd,_0xd7a9d8=this[_0x389d28(0x23b)];_0xd7a9d8['bitmap']=_0x214a55;const _0x402b85=this['_character'][_0x389d28(0x534)](),_0x5355f3=_0x402b85['maxSize'],_0x59bf30=_0x402b85[_0x389d28(0x45d)];let _0x5a1d3b=0x1;if(_0x5355f3>0x0){if(_0x389d28(0x16c)===_0x389d28(0x3df))this[_0x389d28(0x466)][_0x389d28(0x32b)]=_0x505d7b(_0x22d851['$1']);else{let _0x552784=this['getAttachPictureBitmapWidth']()||0x1,_0x5e1ca1=this['getAttachPictureBitmapHeight']()||0x1;const _0x14c9c7=Math['max'](0x1,_0x552784,_0x5e1ca1);_0x5a1d3b=_0x5355f3/_0x14c9c7;}}_0x5a1d3b*=_0x59bf30,_0x5a1d3b!==0x1&&(this[_0x389d28(0x23b)][_0x389d28(0x423)][_0x389d28(0x41b)]=!![]),_0xd7a9d8[_0x389d28(0x45d)]['x']=_0x5a1d3b,_0xd7a9d8[_0x389d28(0x45d)]['y']=_0x5a1d3b,this['visible']=!![],this[_0x389d28(0x152)]();},Sprite_Character[_0x26bacd(0x42f)][_0x26bacd(0x169)]=function(){const _0x4d11f4=_0x26bacd,_0x521808=this['_attachPictureSprite'];if(!_0x521808)return 0x0;return _0x521808[_0x4d11f4(0x423)][_0x4d11f4(0x275)];},Sprite_Character[_0x26bacd(0x42f)]['getAttachPictureBitmapHeight']=function(){const _0x380bff=_0x26bacd,_0x2c9871=this[_0x380bff(0x23b)];if(!_0x2c9871)return 0x0;return _0x2c9871[_0x380bff(0x423)][_0x380bff(0x5a4)];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x556)]=Sprite_Balloon['prototype'][_0x26bacd(0x365)],Sprite_Balloon[_0x26bacd(0x42f)]['setup']=function(_0xbf638c,_0x50f5e){const _0x5989e0=_0x26bacd;VisuMZ['EventsMoveCore']['Sprite_Balloon_setup'][_0x5989e0(0x1a2)](this,_0xbf638c,_0x50f5e);if(VisuMZ['EventsMoveCore'][_0x5989e0(0x3b3)][_0x5989e0(0x2a6)][_0x5989e0(0x474)]){if('BGJlG'===_0x5989e0(0x659))this[_0x5989e0(0x576)][_0x5989e0(0x364)][_0x5989e0(0x35e)](_0x50f5e,this['_duration']);else{const _0x1bf985=_0x1f144a[_0x5989e0(0x3b5)](_0x1e9bcc[_0x5989e0(0x5bf)]||_0x35762c[_0x5989e0(0x18a)]());if(!_0x1bf985)return;_0x378f9a[_0x5989e0(0x1c5)]!=='UNTITLED'?_0x1bf985['morphIntoTemplate'](_0x377cfa[_0x5989e0(0x1c5)]):_0x1bf985[_0x5989e0(0x4cc)](_0x3f4c1d['Step2MapId'],_0xe2f964[_0x5989e0(0x465)]||_0x55e87d[_0x5989e0(0x18a)]());}}},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x62b)]=Sprite_Balloon[_0x26bacd(0x42f)]['updatePosition'],Sprite_Balloon[_0x26bacd(0x42f)]['updatePosition']=function(){const _0x8e7d4c=_0x26bacd;VisuMZ[_0x8e7d4c(0x2b9)][_0x8e7d4c(0x62b)][_0x8e7d4c(0x1a2)](this),this[_0x8e7d4c(0x180)]();},Sprite_Balloon['prototype'][_0x26bacd(0x180)]=function(){const _0xe394b5=_0x26bacd;this['_target']['_character'][_0xe394b5(0x360)]()&&(_0xe394b5(0x161)===_0xe394b5(0x2bd)?_0x409f0f+=this[_0xe394b5(0x62c)]():(this['x']+=VisuMZ[_0xe394b5(0x2b9)][_0xe394b5(0x3b3)][_0xe394b5(0x2a6)][_0xe394b5(0x292)],this['y']+=VisuMZ[_0xe394b5(0x2b9)][_0xe394b5(0x3b3)][_0xe394b5(0x2a6)][_0xe394b5(0x2c7)]));},Sprite_Timer[_0x26bacd(0x42f)][_0x26bacd(0x384)]=function(){const _0x3b8206=_0x26bacd;this[_0x3b8206(0x423)]=new Bitmap(Math[_0x3b8206(0x1dc)](Graphics[_0x3b8206(0x151)]/0x2),0x30),this[_0x3b8206(0x423)]['fontFace']=this[_0x3b8206(0x320)](),this[_0x3b8206(0x423)][_0x3b8206(0x338)]=this[_0x3b8206(0x338)](),this[_0x3b8206(0x423)]['outlineColor']=ColorManager['outlineColor']();},Sprite_Timer[_0x26bacd(0x42f)]['timerText']=function(){const _0x2f9951=_0x26bacd,_0x43aa7e=Math[_0x2f9951(0x2d8)](this['_seconds']/0x3c/0x3c),_0x293ba9=Math[_0x2f9951(0x2d8)](this[_0x2f9951(0x36a)]/0x3c)%0x3c,_0x4a6440=this[_0x2f9951(0x36a)]%0x3c;let _0x18220c=_0x293ba9[_0x2f9951(0x20f)](0x2)+':'+_0x4a6440[_0x2f9951(0x20f)](0x2);if(_0x43aa7e>0x0)_0x18220c=_0x2f9951(0x3f4)[_0x2f9951(0x389)](_0x43aa7e,_0x18220c);return _0x18220c;};function Sprite_EventLabel(){const _0x155b6b=_0x26bacd;this[_0x155b6b(0x247)](...arguments);}Sprite_EventLabel['prototype']=Object[_0x26bacd(0x5d9)](Sprite[_0x26bacd(0x42f)]),Sprite_EventLabel['prototype'][_0x26bacd(0x1ea)]=Sprite_EventLabel,Sprite_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x247)]=function(_0x5785fe){const _0x372f32=_0x26bacd;this[_0x372f32(0x1c4)]=_0x5785fe,Sprite['prototype'][_0x372f32(0x247)][_0x372f32(0x1a2)](this),this[_0x372f32(0x1e6)](),this[_0x372f32(0x3d9)]();},Sprite_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x1e6)]=function(){const _0x3d04d9=_0x26bacd;this['anchor']['x']=0.5,this[_0x3d04d9(0x270)]['y']=0x1;},Sprite_EventLabel['prototype'][_0x26bacd(0x3d9)]=function(){const _0x10d1c6=_0x26bacd,_0x5bcc05=new Rectangle(0x0,0x0,0x1,0x1);this[_0x10d1c6(0x354)]=new Window_Base(_0x5bcc05),this[_0x10d1c6(0x354)]['padding']=0x0,this[_0x10d1c6(0x3f6)]=this[_0x10d1c6(0x4b6)]()?0xff:0x0;},Sprite_EventLabel[_0x26bacd(0x42f)]['update']=function(){const _0x4a1f25=_0x26bacd;Sprite[_0x4a1f25(0x42f)][_0x4a1f25(0x33d)][_0x4a1f25(0x1a2)](this),this[_0x4a1f25(0x1a9)](),this['updateScale'](),this[_0x4a1f25(0x32d)](),this[_0x4a1f25(0x48c)]();},Sprite_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x1a9)]=function(){const _0x53db9f=_0x26bacd;this[_0x53db9f(0x1c4)][_0x53db9f(0x54f)]()!==this[_0x53db9f(0x1a0)]&&(this[_0x53db9f(0x1a0)]=this[_0x53db9f(0x1c4)][_0x53db9f(0x54f)](),this[_0x53db9f(0x2d5)]());},Sprite_EventLabel['prototype'][_0x26bacd(0x2d5)]=function(){const _0x58c006=_0x26bacd;if(!this['_proxyWindow'])return;this['resizeWindow'](),this[_0x58c006(0x45f)]();},Sprite_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x265)]=function(){const _0xecbbfc=_0x26bacd,_0x6dba56=this[_0xecbbfc(0x354)]['textSizeEx'](this[_0xecbbfc(0x1a0)]),_0x113622=this['_proxyWindow'][_0xecbbfc(0x65e)](),_0x573831=_0x6dba56[_0xecbbfc(0x275)]+_0x113622*0x2,_0x561555=_0x6dba56[_0xecbbfc(0x5a4)];this[_0xecbbfc(0x354)][_0xecbbfc(0x1e7)](0x0,0x0,_0x573831,_0x561555),this[_0xecbbfc(0x354)][_0xecbbfc(0x66d)](),this[_0xecbbfc(0x423)]=this[_0xecbbfc(0x354)][_0xecbbfc(0x58f)];},Sprite_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x45f)]=function(){const _0x23e993=_0x26bacd,_0x524e55=this[_0x23e993(0x354)][_0x23e993(0x65e)]();this[_0x23e993(0x354)][_0x23e993(0x46e)](this[_0x23e993(0x1a0)],_0x524e55,0x0);},Sprite_EventLabel['prototype'][_0x26bacd(0x35b)]=function(){const _0x3efae9=_0x26bacd,_0x294bf8=VisuMZ[_0x3efae9(0x2b9)][_0x3efae9(0x3b3)][_0x3efae9(0x660)][_0x3efae9(0x652)],_0x33557b=$gameSystem[_0x3efae9(0x175)]()||0x1;this[_0x3efae9(0x45d)]['x']=this['scale']['y']=_0x294bf8/_0x33557b;},Sprite_EventLabel[_0x26bacd(0x42f)]['updatePosition']=function(){const _0x2b5458=_0x26bacd;if(!SceneManager[_0x2b5458(0x319)])return;if(!SceneManager[_0x2b5458(0x319)][_0x2b5458(0x575)])return;const _0x2f9407=SceneManager[_0x2b5458(0x319)][_0x2b5458(0x575)][_0x2b5458(0x604)](this[_0x2b5458(0x1c4)]);if(!_0x2f9407)return;this['x']=this['_event'][_0x2b5458(0x518)](),this['x']+=this[_0x2b5458(0x1c4)]['_labelWindow']['offsetX'],this['y']=this['_event'][_0x2b5458(0x22f)]()-_0x2f9407[_0x2b5458(0x5a4)],this['y']+=$gameSystem['windowPadding']()*-0.5,this['y']+=this[_0x2b5458(0x1c4)][_0x2b5458(0x485)][_0x2b5458(0x32b)];},Sprite_EventLabel[_0x26bacd(0x42f)]['updateOpacity']=function(){const _0x5c524b=_0x26bacd;if(this[_0x5c524b(0x4b6)]())this[_0x5c524b(0x3f6)]+=this['opacitySpeed']();else{if(SceneManager[_0x5c524b(0x319)][_0x5c524b(0x2f9)]>0x0){if(_0x5c524b(0x28d)===_0x5c524b(0x42e)){_0x12fa7f['ConvertParams'](_0x49aca5,_0x3d627a),_0x3ce51d[_0x5c524b(0x371)](0x0),_0x56b083[_0x5c524b(0x693)](![]);for(const _0x5c8f55 of _0x3082b3['followers']()['_data']){if(_0x5c8f55)_0x5c8f55[_0x5c524b(0x3c9)](![]);}}else this['opacity']=0x0;}else this[_0x5c524b(0x3f6)]-=this[_0x5c524b(0x259)]();}},Sprite_EventLabel['prototype']['isLabelVisible']=function(){const _0x393da4=_0x26bacd;if(!$gameSystem[_0x393da4(0x2ca)]())return![];if(this[_0x393da4(0x1c4)]?.[_0x393da4(0x607)])return![];if(this[_0x393da4(0x1c4)]&&this['_event']['_pageIndex']<0x0)return![];if(SceneManager[_0x393da4(0x319)]['_encounterEffectDuration']>0x0)return![];const _0x11066b=$gamePlayer['x'],_0xab3478=$gamePlayer['y'],_0x46b079=this[_0x393da4(0x1c4)]['x'],_0x48613a=this['_event']['y'];if(this[_0x393da4(0x52b)]===_0x11066b&&this[_0x393da4(0x285)]===_0xab3478&&this[_0x393da4(0x2d7)]===_0x46b079&&this[_0x393da4(0x44f)]===_0x48613a)return'CLGYu'===_0x393da4(0x684)?_0xc8373c[_0x393da4(0x3b5)](this[_0x393da4(0x65f)])&&_0x25c078[_0x393da4(0x2b9)][_0x393da4(0x158)][_0x393da4(0x5a7)](_0x433ab9[_0x393da4(0x4bc)],this[_0x393da4(0x65f)]):this[_0x393da4(0x445)];this[_0x393da4(0x52b)]=$gamePlayer['x'],this[_0x393da4(0x285)]=$gamePlayer['y'],this[_0x393da4(0x2d7)]=this['_event']['x'],this['_visibleEventY']=this[_0x393da4(0x1c4)]['y'];if($gameMap[_0x393da4(0x616)](_0x11066b,_0xab3478,_0x46b079,_0x48613a)>this[_0x393da4(0x1c4)]['labelWindowRange']()){if(_0x393da4(0x30b)!==_0x393da4(0x277))return this[_0x393da4(0x445)]=![],![];else{if(this[_0x393da4(0x5ff)]===_0x30cc81)this[_0x393da4(0x376)]();if(!_0x2ed2fb)return;const _0x5602da=_0x393da4(0x310)[_0x393da4(0x389)](_0x14903a[_0x393da4(0x317)],_0x173aba[_0x393da4(0x65f)]);this['_SavedEventLocations'][_0x5602da]={'direction':_0x25993f[_0x393da4(0x636)](),'x':_0x336c97[_0x393da4(0x1dc)](_0xa18465['x']),'y':_0xd0896e[_0x393da4(0x1dc)](_0x47f4ef['y']),'pageIndex':_0x32842f['_pageIndex'],'moveRouteIndex':_0x41ecd1[_0x393da4(0x641)]};}}return this[_0x393da4(0x445)]=!![],!![];},Sprite_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x259)]=function(){const _0x2f2ea1=_0x26bacd;return VisuMZ[_0x2f2ea1(0x2b9)][_0x2f2ea1(0x3b3)][_0x2f2ea1(0x660)][_0x2f2ea1(0x64f)];},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x2dc)]=Spriteset_Map[_0x26bacd(0x42f)]['createLowerLayer'],Spriteset_Map[_0x26bacd(0x42f)][_0x26bacd(0x4b5)]=function(){const _0x664ff3=_0x26bacd;VisuMZ[_0x664ff3(0x2b9)][_0x664ff3(0x2dc)][_0x664ff3(0x1a2)](this),this['createLabelWindows']();},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x29a)]=Spriteset_Map['prototype']['createShadow'],Spriteset_Map[_0x26bacd(0x42f)][_0x26bacd(0x39c)]=function(){const _0x5c09fc=_0x26bacd;VisuMZ[_0x5c09fc(0x2b9)][_0x5c09fc(0x29a)][_0x5c09fc(0x1a2)](this),this['createShadows']();},Spriteset_Map[_0x26bacd(0x42f)][_0x26bacd(0x626)]=function(){const _0x1a8af0=_0x26bacd;if(!VisuMZ['EventsMoveCore'][_0x1a8af0(0x3b3)]['Movement']['ShowShadows'])return;for(const _0x4c84c4 of this[_0x1a8af0(0x46d)]){'BkDoE'===_0x1a8af0(0x190)?(this[_0x1a8af0(0x314)]=![],this['_forceHideFollower']=!![]):this[_0x1a8af0(0x5b7)](_0x4c84c4);}},Spriteset_Map['prototype'][_0x26bacd(0x5b7)]=function(_0x925b5a){const _0x50de1c=_0x26bacd;_0x925b5a[_0x50de1c(0x467)]=new Sprite(),_0x925b5a['_shadowSprite'][_0x50de1c(0x35f)]=_0x925b5a[_0x50de1c(0x364)][_0x50de1c(0x456)](),_0x925b5a[_0x50de1c(0x467)]['bitmap']=ImageManager[_0x50de1c(0x14b)](_0x925b5a[_0x50de1c(0x467)]['_filename']),_0x925b5a[_0x50de1c(0x467)][_0x50de1c(0x270)]['x']=0.5,_0x925b5a[_0x50de1c(0x467)]['anchor']['y']=0x1,_0x925b5a[_0x50de1c(0x467)]['z']=0x0,this['_tilemap']['addChild'](_0x925b5a[_0x50de1c(0x467)]);},Spriteset_Map[_0x26bacd(0x42f)][_0x26bacd(0x5c1)]=function(){const _0x4de7e8=_0x26bacd;if(!VisuMZ['EventsMoveCore'][_0x4de7e8(0x3b3)][_0x4de7e8(0x335)]['ShowShadows'])return;for(const _0x234fd5 of this[_0x4de7e8(0x46d)]){this[_0x4de7e8(0x4f1)][_0x4de7e8(0x182)](_0x234fd5['_shadowSprite']);}},Spriteset_Map[_0x26bacd(0x42f)][_0x26bacd(0x214)]=function(){const _0xf225ac=_0x26bacd;this[_0xf225ac(0x396)]=[];for(const _0x123422 of $gameMap['events']()){this[_0xf225ac(0x4c8)](_0x123422);}},Spriteset_Map[_0x26bacd(0x42f)][_0x26bacd(0x4c8)]=function(_0x2d11c2){const _0x267129=_0x26bacd;if(!this[_0x267129(0x5df)](_0x2d11c2))return;let _0x5d8e19;const _0x203b05=VisuMZ['EventsMoveCore']['Settings'][_0x267129(0x660)]['SpriteBased']??!![];_0x5d8e19=_0x203b05?new Sprite_EventLabel(_0x2d11c2):new Window_EventLabel(_0x2d11c2),_0x5d8e19['z']=0x8,_0x5d8e19[_0x267129(0x14c)]=Sprite['_counter']++,this[_0x267129(0x4f1)][_0x267129(0x1d7)](_0x5d8e19),this[_0x267129(0x396)]['push'](_0x5d8e19);},Spriteset_Map[_0x26bacd(0x42f)][_0x26bacd(0x5df)]=function(_0x5cf631){const _0x3d457d=_0x26bacd,_0x2517a7=_0x5cf631['event']();if(_0x2517a7[_0x3d457d(0x316)][_0x3d457d(0x224)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x2517a7['note']['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x3549b0 of _0x2517a7[_0x3d457d(0x2ac)]){let _0x56ad6b='';for(const _0x343b4a of _0x3549b0[_0x3d457d(0x57b)]){if(_0x3d457d(0x2c9)!==_0x3d457d(0x2c9))return![];else[0x6c,0x198][_0x3d457d(0x18c)](_0x343b4a['code'])&&(_0x56ad6b+=_0x343b4a[_0x3d457d(0x27c)][0x0]);}if(_0x56ad6b[_0x3d457d(0x224)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x56ad6b[_0x3d457d(0x224)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x3d457d(0x26d)!=='sykYn')this[_0x3d457d(0x3b1)](_0x26cbf7[_0x3d457d(0x65f)]);else return!![];}}return![];},Spriteset_Map[_0x26bacd(0x42f)][_0x26bacd(0x52c)]=function(_0x23d33f){const _0xc34d7c=_0x26bacd;this[_0xc34d7c(0x46d)]=this[_0xc34d7c(0x46d)]||[];const _0x5018a4=new Sprite_Character(_0x23d33f);this[_0xc34d7c(0x46d)][_0xc34d7c(0x496)](_0x5018a4),this[_0xc34d7c(0x4f1)]['addChild'](_0x5018a4),this[_0xc34d7c(0x5b7)](_0x5018a4),this[_0xc34d7c(0x4c8)](_0x23d33f),_0x5018a4['update']();},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x4db)]=Game_Message[_0x26bacd(0x42f)][_0x26bacd(0x281)],Game_Message[_0x26bacd(0x42f)]['setNumberInput']=function(_0x13c0d9,_0x5b83a5){const _0x397d9d=_0x26bacd;this[_0x397d9d(0x5d1)]=$gameTemp[_0x397d9d(0x43b)](),VisuMZ['EventsMoveCore']['Game_Message_setNumberInput'][_0x397d9d(0x1a2)](this,_0x13c0d9,_0x5b83a5);},VisuMZ['EventsMoveCore'][_0x26bacd(0x3d0)]=Window_NumberInput[_0x26bacd(0x42f)][_0x26bacd(0x581)],Window_NumberInput['prototype'][_0x26bacd(0x581)]=function(){const _0x552380=_0x26bacd;$gameTemp[_0x552380(0x2b7)]($gameMessage[_0x552380(0x5d1)]),VisuMZ[_0x552380(0x2b9)][_0x552380(0x3d0)][_0x552380(0x1a2)](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x539)]=Window_NumberInput['prototype']['processOk'],Window_NumberInput[_0x26bacd(0x42f)]['processOk']=function(){const _0xd93283=_0x26bacd;$gameTemp['registerSelfTarget']($gameMessage[_0xd93283(0x5d1)]),VisuMZ[_0xd93283(0x2b9)][_0xd93283(0x539)][_0xd93283(0x1a2)](this),$gameTemp[_0xd93283(0x419)](),$gameMessage['_selfTargetNumberInput']=undefined;},VisuMZ[_0x26bacd(0x2b9)]['Game_Message_setItemChoice']=Game_Message[_0x26bacd(0x42f)]['setItemChoice'],Game_Message[_0x26bacd(0x42f)][_0x26bacd(0x5dc)]=function(_0x55e941,_0x3e3a4f){const _0x3b52bd=_0x26bacd;this['_selfTargetItemChoice']=$gameTemp[_0x3b52bd(0x43b)](),VisuMZ[_0x3b52bd(0x2b9)]['Game_Message_setItemChoice'][_0x3b52bd(0x1a2)](this,_0x55e941,_0x3e3a4f);},VisuMZ[_0x26bacd(0x2b9)]['Window_EventItem_onOk']=Window_EventItem[_0x26bacd(0x42f)][_0x26bacd(0x5fd)],Window_EventItem['prototype'][_0x26bacd(0x5fd)]=function(){const _0x39e246=_0x26bacd;$gameTemp[_0x39e246(0x2b7)]($gameMessage['_selfTargetItemChoice']),VisuMZ['EventsMoveCore'][_0x39e246(0x326)][_0x39e246(0x1a2)](this),$gameTemp[_0x39e246(0x419)](),$gameMessage[_0x39e246(0x432)]=undefined;},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x5c2)]=Window_EventItem[_0x26bacd(0x42f)][_0x26bacd(0x340)],Window_EventItem[_0x26bacd(0x42f)][_0x26bacd(0x340)]=function(){const _0x1d3b11=_0x26bacd;$gameTemp[_0x1d3b11(0x2b7)]($gameMessage[_0x1d3b11(0x432)]),VisuMZ[_0x1d3b11(0x2b9)]['Window_EventItem_onCancel'][_0x1d3b11(0x1a2)](this),$gameTemp[_0x1d3b11(0x419)](),$gameMessage[_0x1d3b11(0x432)]=undefined;},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x548)]=Window_Message[_0x26bacd(0x42f)][_0x26bacd(0x183)],Window_Message[_0x26bacd(0x42f)]['startMessage']=function(){const _0x5a122c=_0x26bacd;$gameMessage['registerSelfEvent'](),VisuMZ[_0x5a122c(0x2b9)][_0x5a122c(0x548)]['call'](this),$gameTemp[_0x5a122c(0x419)]();},VisuMZ[_0x26bacd(0x2b9)][_0x26bacd(0x3aa)]=Window_ScrollText['prototype'][_0x26bacd(0x183)],Window_ScrollText['prototype'][_0x26bacd(0x183)]=function(){const _0x34c026=_0x26bacd;$gameMessage[_0x34c026(0x57e)](),VisuMZ['EventsMoveCore'][_0x34c026(0x3aa)][_0x34c026(0x1a2)](this),$gameTemp[_0x34c026(0x419)]();};function Window_EventLabel(){this['initialize'](...arguments);}Window_EventLabel[_0x26bacd(0x42f)]=Object['create'](Window_Base['prototype']),Window_EventLabel[_0x26bacd(0x42f)]['constructor']=Window_EventLabel,Window_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x247)]=function(_0x3b8698){const _0x438360=_0x26bacd;this[_0x438360(0x1c4)]=_0x3b8698;const _0x385fbf=new Rectangle(0x0,0x0,Graphics[_0x438360(0x151)]/0x4,this[_0x438360(0x58e)](0x1));this[_0x438360(0x1e6)](),Window_Base['prototype']['initialize'][_0x438360(0x1a2)](this,_0x385fbf),this[_0x438360(0x439)]=0x0,this[_0x438360(0x5d0)](0x2),this[_0x438360(0x1a0)]='';},Window_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x1e6)]=function(){const _0xdbd47e=_0x26bacd;this['_eventErased']=![],this[_0xdbd47e(0x5fc)]=$gameScreen[_0xdbd47e(0x263)](),this[_0xdbd47e(0x47d)]=this[_0xdbd47e(0x1c4)]['screenX'](),this['_eventScreenY']=this[_0xdbd47e(0x1c4)][_0xdbd47e(0x22f)](),this[_0xdbd47e(0x5cc)]=this[_0xdbd47e(0x1c4)]['_labelWindow'][_0xdbd47e(0x52e)],this['_eventLabelOffsetY']=this[_0xdbd47e(0x1c4)][_0xdbd47e(0x485)][_0xdbd47e(0x32b)],this[_0xdbd47e(0x334)]=this[_0xdbd47e(0x1c4)][_0xdbd47e(0x22c)],this[_0xdbd47e(0x445)]=this[_0xdbd47e(0x4b6)](),this[_0xdbd47e(0x497)]=$gameSystem[_0xdbd47e(0x2ca)](),this[_0xdbd47e(0x52b)]=$gamePlayer['x'],this[_0xdbd47e(0x285)]=$gamePlayer['y'],this[_0xdbd47e(0x2d7)]=this['_event']['x'],this[_0xdbd47e(0x44f)]=this[_0xdbd47e(0x1c4)]['y'];},Window_EventLabel[_0x26bacd(0x42f)]['update']=function(){const _0x9db8ca=_0x26bacd;Window_Base['prototype'][_0x9db8ca(0x33d)][_0x9db8ca(0x1a2)](this);if(!this[_0x9db8ca(0x1ce)]())return;this[_0x9db8ca(0x1a9)](),this[_0x9db8ca(0x35b)](),this[_0x9db8ca(0x32d)](),this['updateOpacity']();},Window_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x1ce)]=function(){const _0x1a392a=_0x26bacd;if(!this[_0x1a392a(0x1c4)])return![];if(!this['_event']['_labelWindow'])return![];if(this[_0x1a392a(0x334)]!==this[_0x1a392a(0x1c4)][_0x1a392a(0x22c)])return!![];if(this[_0x1a392a(0x1c4)][_0x1a392a(0x607)]&&!this[_0x1a392a(0x4b3)])return!![];if(this[_0x1a392a(0x1c4)][_0x1a392a(0x485)][_0x1a392a(0x58c)]==='')return![];if(this[_0x1a392a(0x5fc)]!==$gameScreen['zoomScale']())return!![];if(this[_0x1a392a(0x47d)]!==this['_event'][_0x1a392a(0x518)]())return!![];if(this[_0x1a392a(0x1a8)]!==this[_0x1a392a(0x1c4)][_0x1a392a(0x22f)]())return!![];if(this['_eventLabelOffsetX']!==this[_0x1a392a(0x1c4)][_0x1a392a(0x485)][_0x1a392a(0x52e)])return!![];if(this[_0x1a392a(0x3ff)]!==this[_0x1a392a(0x1c4)][_0x1a392a(0x485)][_0x1a392a(0x32b)])return!![];if(this[_0x1a392a(0x52b)]!==$gamePlayer['x'])return!![];if(this['_visiblePlayerY']!==$gamePlayer['y'])return!![];if(this['_visibleEventX']!==this[_0x1a392a(0x1c4)]['x'])return!![];if(this[_0x1a392a(0x44f)]!==this['_event']['y'])return!![];if(this[_0x1a392a(0x497)]!==$gameSystem[_0x1a392a(0x2ca)]())return!![];if(this[_0x1a392a(0x445)]&&this[_0x1a392a(0x439)]<0xff)return!![];if(!this[_0x1a392a(0x445)]&&this['contentsOpacity']>0x0)return!![];if(SceneManager[_0x1a392a(0x319)][_0x1a392a(0x2f9)]>0x0)return!![];return![];},Window_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x1a9)]=function(){const _0x2b733f=_0x26bacd;if(this['_event'][_0x2b733f(0x54f)]()!==this[_0x2b733f(0x1a0)]){if(_0x2b733f(0x3c0)!==_0x2b733f(0x20b))this[_0x2b733f(0x1a0)]=this[_0x2b733f(0x1c4)][_0x2b733f(0x54f)](),this[_0x2b733f(0x2d5)]();else return![];}},Window_EventLabel['prototype'][_0x26bacd(0x35b)]=function(){const _0x24add1=_0x26bacd;this[_0x24add1(0x45d)]['x']=0x1/$gameScreen[_0x24add1(0x263)](),this[_0x24add1(0x45d)]['y']=0x1/$gameScreen['zoomScale'](),this['_screenZoomScale']=$gameScreen['zoomScale']();},Window_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x32d)]=function(){const _0x4e4f92=_0x26bacd;if(!SceneManager['_scene'])return;if(!SceneManager['_scene'][_0x4e4f92(0x575)])return;const _0x5844bc=SceneManager[_0x4e4f92(0x319)][_0x4e4f92(0x575)][_0x4e4f92(0x604)](this['_event']);if(!_0x5844bc)return;this['x']=Math['round'](this[_0x4e4f92(0x1c4)][_0x4e4f92(0x518)]()-Math[_0x4e4f92(0x2d8)](this['width']*this[_0x4e4f92(0x45d)]['x']/0x2)),this['x']+=this[_0x4e4f92(0x1c4)][_0x4e4f92(0x485)][_0x4e4f92(0x52e)],this['y']=this[_0x4e4f92(0x1c4)][_0x4e4f92(0x22f)]()-_0x5844bc['height'],this['y']+=Math['round']($gameSystem[_0x4e4f92(0x216)]()*0.5),this['y']-=Math[_0x4e4f92(0x1dc)](this['height']*this['scale']['y']),this['y']+=this['_event'][_0x4e4f92(0x485)][_0x4e4f92(0x32b)],this[_0x4e4f92(0x4b3)]=this[_0x4e4f92(0x1c4)][_0x4e4f92(0x607)],this[_0x4e4f92(0x47d)]=this['_event'][_0x4e4f92(0x518)](),this[_0x4e4f92(0x1a8)]=this['_event'][_0x4e4f92(0x22f)](),this[_0x4e4f92(0x5cc)]=this[_0x4e4f92(0x1c4)][_0x4e4f92(0x485)][_0x4e4f92(0x52e)],this['_eventLabelOffsetY']=this[_0x4e4f92(0x1c4)][_0x4e4f92(0x485)][_0x4e4f92(0x32b)],this[_0x4e4f92(0x334)]=this['_event'][_0x4e4f92(0x22c)],this['_eventErased']&&(this['contentsOpacity']=0x0);},Window_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x48c)]=function(){const _0x4eb4fb=_0x26bacd;if(this[_0x4eb4fb(0x4b6)]())this['contentsOpacity']+=this[_0x4eb4fb(0x259)]();else SceneManager[_0x4eb4fb(0x319)][_0x4eb4fb(0x2f9)]>0x0?this[_0x4eb4fb(0x439)]=0x0:this[_0x4eb4fb(0x439)]-=this[_0x4eb4fb(0x259)]();},Window_EventLabel['prototype'][_0x26bacd(0x4b6)]=function(){const _0x2e237b=_0x26bacd;if(!$gameSystem[_0x2e237b(0x2ca)]())return![];if(this[_0x2e237b(0x1c4)]?.[_0x2e237b(0x607)])return![];if(SceneManager['_scene']['_encounterEffectDuration']>0x0)return![];const _0x370cea=$gamePlayer['x'],_0x1813b0=$gamePlayer['y'],_0x4b1826=this[_0x2e237b(0x1c4)]['x'],_0x2880ea=this['_event']['y'];if(this[_0x2e237b(0x52b)]===_0x370cea&&this[_0x2e237b(0x285)]===_0x1813b0&&this[_0x2e237b(0x2d7)]===_0x4b1826&&this[_0x2e237b(0x44f)]===_0x2880ea)return this[_0x2e237b(0x445)];this[_0x2e237b(0x52b)]=$gamePlayer['x'],this[_0x2e237b(0x285)]=$gamePlayer['y'],this[_0x2e237b(0x2d7)]=this[_0x2e237b(0x1c4)]['x'],this[_0x2e237b(0x44f)]=this[_0x2e237b(0x1c4)]['y'];if($gameMap[_0x2e237b(0x616)](_0x370cea,_0x1813b0,_0x4b1826,_0x2880ea)>this[_0x2e237b(0x1c4)][_0x2e237b(0x2ae)]())return this[_0x2e237b(0x445)]=![],![];return this['_cacheVisibility']=!![],!![];},Window_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x259)]=function(){const _0x943fcb=_0x26bacd;return VisuMZ['EventsMoveCore'][_0x943fcb(0x3b3)][_0x943fcb(0x660)]['OpacitySpeed'];},Window_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x265)]=function(){const _0x4fcfb5=_0x26bacd,_0x511407=this[_0x4fcfb5(0x215)](this[_0x4fcfb5(0x1a0)]);this[_0x4fcfb5(0x275)]=_0x511407[_0x4fcfb5(0x275)]+($gameSystem[_0x4fcfb5(0x216)]()+this['itemPadding']())*0x2,this[_0x4fcfb5(0x5a4)]=Math[_0x4fcfb5(0x24b)](this['lineHeight'](),_0x511407['height'])+$gameSystem['windowPadding']()*0x2,this[_0x4fcfb5(0x66d)]();},Window_EventLabel[_0x26bacd(0x42f)]['lineHeight']=function(){const _0x5b3e0a=_0x26bacd;return VisuMZ[_0x5b3e0a(0x2b9)]['Settings'][_0x5b3e0a(0x660)]['LineHeight'];},Window_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x356)]=function(){const _0xf2d8b4=_0x26bacd;Window_Base[_0xf2d8b4(0x42f)]['resetFontSettings'][_0xf2d8b4(0x1a2)](this),this[_0xf2d8b4(0x58f)][_0xf2d8b4(0x338)]=this[_0xf2d8b4(0x437)]();},Window_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x437)]=function(){const _0x1d13bb=_0x26bacd;return VisuMZ[_0x1d13bb(0x2b9)]['Settings'][_0x1d13bb(0x660)]['FontSize'];},Window_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x2d5)]=function(){const _0x154335=_0x26bacd;this[_0x154335(0x265)](),this[_0x154335(0x58f)]['clear']();const _0x203ab7=this[_0x154335(0x1a0)][_0x154335(0x21c)](/[\r\n]+/);let _0x1cfe9d=0x0;for(const _0x595fe1 of _0x203ab7){const _0x4f04ec=this[_0x154335(0x215)](_0x595fe1),_0x342cea=Math['floor']((this[_0x154335(0x406)]-_0x4f04ec[_0x154335(0x275)])/0x2);this['drawTextEx'](_0x595fe1,_0x342cea,_0x1cfe9d),_0x1cfe9d+=_0x4f04ec[_0x154335(0x5a4)];}},Window_EventLabel['prototype'][_0x26bacd(0x271)]=function(_0x37be1d,_0x49079b){const _0xd2a311=_0x26bacd;_0x49079b[_0xd2a311(0x4bb)]&&this['drawIcon'](_0x37be1d,_0x49079b['x']+0x2,_0x49079b['y']),_0x49079b['x']+=Math[_0xd2a311(0x2c3)](this[_0xd2a311(0x60f)](),ImageManager['iconWidth'])+0x4;},Window_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x5f9)]=function(_0x37f95b,_0x2cff8a,_0x1c56c9){const _0x4b9b6b=_0x26bacd,_0x551469=ImageManager['loadSystem'](_0x4b9b6b(0x5e7)),_0x50edf2=ImageManager['iconWidth'],_0x583e74=ImageManager[_0x4b9b6b(0x3e5)],_0x889c8f=_0x37f95b%0x10*_0x50edf2,_0x551795=Math[_0x4b9b6b(0x2d8)](_0x37f95b/0x10)*_0x583e74,_0x52f4e8=Math['min'](this[_0x4b9b6b(0x60f)]()),_0x2b4f8b=Math[_0x4b9b6b(0x2c3)](this[_0x4b9b6b(0x60f)]());this[_0x4b9b6b(0x58f)]['blt'](_0x551469,_0x889c8f,_0x551795,_0x50edf2,_0x583e74,_0x2cff8a,_0x1c56c9,_0x52f4e8,_0x2b4f8b);},Window_EventLabel[_0x26bacd(0x42f)][_0x26bacd(0x60f)]=function(){const _0x4800a1=_0x26bacd;return VisuMZ['EventsMoveCore']['Settings']['Label'][_0x4800a1(0x5aa)];};