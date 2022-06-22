//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.41;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.41] [EventsMoveCore]
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

const _0x2ee1ea=_0x444e;function _0x44e0(){const _0x4766fa=['EventLocationDelete','setupSpawnTest','SpawnEventDespawnEverything','_moveAllowPlayerCollision','RegionTouch','isDashingAndMoving','round','setFrames','kzFno','PkTFw','return\x20%1','OffsetY','splice','SpawnEventDespawnAtXY','wfGcB','isMapSwitch','_spawnedEvents','deleteEventLocation','SelfVariableID','processMoveRouteStepTo','offsetY','getPosingCharacterPattern','PreMorphJS','gzEbL','erase','Game_Map_refresh','SPIN\x20ANTICLOCKWISE','setupEventsMoveCoreEffects','Hours','isShadowVisible','_eventCache','Game_Follower_chaseCharacter','deltaXFrom','SCREEN','Forbid','remove','startMapCommonEventOnOKTarget','_type','getInputDir8','$preloadedMap_%1','ntVKq','_trigger','Minutes','_visiblePlayerY','moveRouteIndex','RandomMoveWeight','isSpawnedEvent','_poseDuration','_saveEventLocations','startCallEvent','IIXqD','switch1Valid','setupDiagonalSupport','deleteIconsOnEventsData','setWaitMode','attachPictureBlendMode','PosX','processMoveSynch','findProperPageIndex','FZIjB','getPlayerDiagonalSetting','_realY','setup','UltCd','_cacheVisibility','OFF','Label','createContents','Game_Event_initialize','getEventIconIndex','_regionRules','%1Forbid','_patternLocked','activationRegionList','VuKpQ','none','Jacwu','MapVariables','value','VisibleRange','setupPageSettings','addChild','prepareSpawnedEventAtXY','Scene_Load_onLoadSuccess','setupSpawnedEvents','MULTIPLY','createShadow','qlFiQ','filter','Map%1-Event%2','findTargetSprite','createLabelWindows','getPosingCharacterIndex','type','isSaveEventLocation','isStopFollowerChasing','Visible','DefaultShadow','oqNRF','updateSelfMovement','STRCd','note','fmfcV','despawnAtXY','yrjek','moveAwayFromCharacter','lESbr','_labelWindows','frameCount','isTile','Sprite_Character_update','Game_Message_add','vjZiC','eventsXyNt','processMoveRouteMoveUntilStop','clamp','_spawnPreserved','LOWER\x20LEFT','qqUJQ','ftLOv','requestRefresh','moveSynchTarget','target','unlock','updatePeriodicRefresh','PosY','FRUSTRATION','GDsou','EventTimerResume','Icon','...','pUbUw','Game_Followers_isVisible','height','Rope','Game_Map_setupEvents','SkYOs','DEFAULT_SHIFT_Y','frontY','isSelfSwitch','Sprite_Character_setTileBitmap','Game_Event_clearPageSettings','processMoveRouteStepToCharacter','KuwqL','getControlledFollowerID','FAikm','isOnLadder','_cacheSystemVisible','backX','Game_Event_meetsConditions','xmRAy','HWqbr','pageId','Game_System_initialize','forceMoveRoute','of\x20Preloaded\x20Maps.\x0a\x0a','changeSpeed','Game_Event_meetsConditionsCPC','jump','posNt','fontFace','WGXRX','_realX','concat','variableId','inBattle','indexOf','ratXm','iconWidth','Toggle','USER-DEFINED\x203','deltaYFrom','mQEdY','isEventClickTriggered','wLqLV','attachPictureFilename','setDirection','EventAutoMovement','code','setupFollowerVisibilityOverrides','_randomHomeY','slice','AirshipSpeed','lSTTm','LEFT','executeMoveDir8','requestAnimation','SWEAT','lastSpawnedEventID','setControlledFollowerID','opacitySpeed','juvPA','processMoveRouteStepFrom','_paused','JhUBI','iconHeight','gphgB','process_VisuMZ_EventsMoveCore_Switches_Variables','Game_Event_locate','trim','USER-DEFINED\x204','metCPC','UESeL','log','characterPatternYVS8','max','SzjIE','VisuMZ_2_DragonbonesUnion','EventTimerPause','diNvZ','TRUE','_pageIndex','createSaveEventLocationData','clearStepPattern','onCancel','gainFrames','EventIconDelete','FZdtH','lineHeight','cJcqL','VS8','parameters','FollowerReset','setImage','ZCQgJ','event','VehicleDock','nkyjD','PreloadedMaps','_periodicRefreshTimer','makeDeepCopy','startMapCommonEventOnTouch','exit','jOQbp','deletePreservedMorphEventDataKey','toLowerCase','some','YQBvV','isTransparent','mapValue','isTargetEventValidForLabelWindow','onDatabaseLoaded','autoEventIconBuffer','CBwZu','IsmEo','HURT','_moveSynch','processMoveSynchReverseMimic','GiBxF','%1Dock','FALSE','smooth','firstSpawnedEventID','setupPlayerVisibilityOverrides','VzdGU','pFUxK','_lastMovedDirection','getPosingCharacterDirection','isDashingEnabled','RIGHT','processMoveCommandEventsMoveCore','BalloonOffsetX','_shadowGraphic','3pOrTdc','setupSaveEventLocations','frontX','setCharacterBitmap','bitmap','iYpnt','loadCPC','string','Game_Player_isMapPassable','_eventLabelOffsetX','_direction','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','isSelfVariable','YIgPU','byDCd','Game_Event_findProperPageIndex','VRSBp','getMapSpawnedEventData','executeCommand','setEventLabelsVisible','needsAttachPictureUpdate','initFollowerController','_pose','Sprite_Balloon_setup','clearPose','setDestination','GetMoveSynchTarget','ueUFy','TurnInPlaceDelay','Movement','Game_Temp_setDestination','PmOUc','npsZJ','processMoveSynchCustom','DFrvC','setStopFollowerChasing','updatePosition','PostSpawnJS','ADDITIVE','%1DockRegionOnly','_opacity','Direction','updateBitmapSmoothing','moveBackToRandomHome','_spawnData','opacity','_eventLabelOffsetY','eventsXy','_visibleEventX','ShowShadows','checkEventTriggerThere','gXJXf','row','mjZXD','custom','boxWidth','isAdvancedVariable','Game_Event_setupPageSettings','yKsuW','SILENCE','TargetVariableId','deleteSavedEventLocationKey','lgpHW','Window_NumberInput_processOk','OTBXl','_eventId','isPlayerForceHidden','pluginCommandCallEvent','JAxgT','SpawnEventDespawnTerrainTags','rYFUv','VICTORY','bZEbJ','isLabelVisible','FollowerSetTargetChase','processMoveRouteFadeOut','updateAttachPictureBitmap','SPIN\x20CCW','toUpperCase','Allow','activationProximityType','VXahM','_spriteOffsetY','isSupportDiagonalMovement','Game_Event_event','isBigCharacter','Dctvm','_forceCarrying','pattern','Game_Variables_value','width','checkNeedForPeriodicRefresh','_EventsMoveCoreSettings','attachPictureScale','mfUvv','page','OpacitySpeed','updateEventsMoveCoreTagChanges','GvALu','ARRAYSTRUCT','FoJZq','Game_Timer_start','jEzMY','JsUqi','GAEzY','moveSynchType','StopAutoMoveEvents','increaseSteps','SelfVariables','registerSelfEvent','shadowFilename','processMoveRouteFadeIn','Player','Game_Timer_onExpire','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','saveEventLocation','Walk','vHUPb','NUM','ddsOb','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','initMoveSpeed','Spriteset_Map_createShadow','_data','despawnEverything','Game_Interpreter_executeCommand','Map\x20%1\x20Variable\x20%2','REHiA','EventAllow','attachPictureMaxSize','skZWw','call','bbhXv','mirror\x20vert','prepareSpawnedEventAtRegion','Game_Map_unlockEvent','Region','setupAttachPictureBitmap','setCommonEvent','isLandOk','Game_Map_events','Game_CharacterBase_moveDiagonally','regionId','forceDashing','ITEM','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','turnAwayFromCharacter','_clickTrigger','Game_Player_checkEventTriggerHere','attachPictureSettings','MoveAllSynchTargets','_forceShowFollower','processMoveRouteTeleportTo','_eventIcon','screenX','SwitchId','canPassDiagonally','hasCPCs','_eventOverloadThreshold','Game_CharacterBase_realMoveSpeed','bind','uHkTH','deleteSavedEventLocation','delay','checkCollisionKeywords','referEvent','Chase','PostMorphJS','PlayerForbid','WSCyw','roundXWithDirection','GhapL','Game_CharacterBase_canPass','aBdJn','PlayerIconChange','onChange','Iajhg','horizontal\x20mirror','_DisablePlayerControl','timer','checkSmartEventCollision','despawnTerrainTags','distance','_commonEvents','isBusy','Ship','isShadowShrink','Game_CharacterBase_update','NbiYr','nQSVA','_erased','drawText','getDirectionFromPoint','UstxX','isInVehicle','Game_CharacterBase_isTransparent','ARRAYSTR','Game_Variables_setValue','onLoadAttachPicture','VisuMZ_Setup_Preload_Map','ARRAYEVAL','visible','isMoving','Map\x20%1\x20Switch\x20%2','_attachPicture','SpawnEventAtTerrainTag','player','COLLAPSE','radius','isActive','Window_EventItem_onOk','_eventScreenY','setDashingEnabled','jkbDP','mapId','AllAllow','WalkForbid','vNCqm','gdITH','_PreservedEventMorphData','SlowerSpeed','Game_CharacterBase_setDirection','Game_CharacterBase_screenX','labelWindowRange','List','resetFontSettings','processOk','spawnPreserved','setupSpawn','followers','SpawnEventDespawnEventID','639574jUafNY','alQcN','resume','registerSelfTarget','checkEventsMoveCoreStringTags','ShipSpeed','horz\x20mirror','Game_Player_checkEventTriggerThere','turnLeft90','isSpawnHitboxCollisionOk','_EventIcons','LEFT\x20TO\x20RIGHT','variableValid','Name','Step2MapId','Game_Enemy_meetsSwitchCondition','kXtHu','%1%2','OffsetX','map','WxTGI','mirror\x20vertical','jUiRL','filename','MUSIC','Step2EventId','MorphEventRemove','updateText','HIhEQ','pMDEM','processMoveRouteSetIndex','getAttachPictureBitmapHeight','forceCarrying','bGhYA','switch1Id','_saveEventLocation','unlockEvent','isDestinationValid','PreloadMaps','executeCommandCommonEvent','_tilemap','setBalloonPose','dir8','412974ydcKjK','SwitchGetSelfSwitchABCD','Game_CharacterBase_opacity','2142632WJWZcD','iconIndex','AdvancedSwitches','EnableDashTilt','setFrame','isAirship','hWgRO','spriteId','Game_Character_processMoveCommand','randomInt','Game_Player_isDashing','eHVKm','removeTemporaryMapSpawnedEvents','UPPER\x20RIGHT','DiagonalSpeedMultiplier','MapSwitches','QnBog','setTileBitmap','_eventErased','loadSystem','FollowerID','_character','initEventsMoveCore','updatePose','ARRAYJSON','processMoveRouteSelfVariable','TerrainTag','resizeWindow','Hidden','HEART','_encounterEffectDuration','Letter','processMoveRoutePatternLock','UPPER\x20LEFT','SMjxv','pause','WuapI','processMoveRouteBalloon','feGJG','_waitMode','LineHeight','characterIndex','setupRegionRestrictions','GeOLK','LIGHT-BULB','AGfCe','isVisible','Game_CharacterBase_initMembers','initEventsMoveCoreEffects','_moveOnlyRegions','_counter','Setting','PzAHA','Window_EventItem_onCancel','convertSelfVariableValuesInScriptCall','Boat','_scene','otfYB','isWorking','Game_CharacterBase_moveStraight','KNEEL','getPose','Self\x20Variable\x20%1','EnableTurnInPlace','Game_Interpreter_updateWaitMode','168UmiOnp','CustomPageConditions','Game_Event_updateSelfMovement','firstSpawnedEvent','Passability','fBpyA','absDistance','isSmartEventCollisionOn','ship','sNeBI','MoveRouteIndex','moveStraight','updatePatternEventsMoveCore','GWhcq','ZZZ','drawIcon','isNormalPriority','Speed','_needsRefresh','isMoveOnlyRegionPassable','tQbpF','UmVdR','moveTowardCharacter','General','Game_Character_setMoveRoute','_selfTarget','Button','isCollidedWithPlayerCharacters','_SavedEventLocations','refresh','updateShadowChanges','LOVE','_moveSpeed','Fkarh','processMoveRouteJumpToCharacter','RqVGL','mFiAe','MorphEventTo','LOWER\x20RIGHT','processDrawIcon','RemovePreserve','name','registerCommand','MessageCore','checkEventTriggerEventsMoveCore','DvpEb','Zzgjt','_eventOverload','attachPictureOffsetY','setDiagonalDirection','_pattern','moveAwayFromPoint','732024kLzrfw','onExpire','wSCaM','DashingEnable','requestBalloon','needsUpdate','processMoveRouteTeleportToCharacter','WokHa','bcUyq','WxwwE','AllForbid','VariableId','prepareSpawnedEventAtTerrainTag','xgtEe','advancedFunc','OusGT','ROUTE_SCRIPT','Game_Event_moveTypeRandom','meetsConditions','isValid','advancedValue','_forceDashing','isMapPassable','setPose','clearSpriteOffsets','Game_Switches_setValue','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','abs','SPIN\x20COUNTERCLOCKWISE','canStartLocalEvents','SLEEP','checkEventTriggerHere','isPosing','setEventIconData','innerWidth','_activationProximityAutoTriggerBypass','createIconSprite','getLastPluginCommandInterpreter','processMoveSynchMirrorVert','replace','updateScale','createLowerLayer','moveByInput','obNml','Game_Player_increaseSteps','moveTypeRandom','Game_CharacterBase_hasStepAnime','meetActivationProximityConditions','hjona','contents','LIGHT','parent','Airship','bieSv','constructor','updateTilt','processMoveSynchMirrorHorz','BitaW','wZGDI','tileWidth','Sprite_Balloon_updatePosition','PageId','directionOnLadderSpriteVS8dir','_inputTime','clearCarrying','USER-DEFINED\x201','isEmptyCharacter','pcyOv','setMovementSuccess','_screenZoomScale','_lastAttachPictureMaxSize','BlendMode','meetsCPC','VVCxX','BULB','UrTAG','checkExistingEntitiesAt','RIGHT\x20TO\x20LEFT','EventsMoveCore','dicRD','Game_CommonEvent_isActive','createShadows','LIGHT\x20BULB','_eventMorphData','RBroF','characterPatternYBasic','_eventPageIndex','Window_NumberInput_start','setupEventsMoveCoreNotetags','empyu','EventID','YSiez','isPlayerControlDisabled','Step1MapId','isAllowCharacterTilt','VHQzX','reverse\x20mimic','reverseDir','EventTemplates','_addedHitbox','Game_Map_update','aBGAk','1890564ILxvgq','setPattern','Game_SelfSwitches_setValue','command357','update','opacityDelta','_dragonbones','adjustMoveSynchOpacityDelta','shadowX','UNTITLED','isPlaytest','moveForward','dFEwQ','Game_Map_event','dashSpeedModifier','updateVS8BalloonOffsets','IconBlendMode','hwwnm','Game_SelfSwitches_value','format','_hidden','hasStepAnime','VehicleAllow','IconIndex','updateShadow','lnCKg','Game_Event_start','_advancedSwitchVariable','clearEventCache','tMdZs','updateWaitMode','roundY','loadPicture','zuWGI','savePreservedMorphEventDataKey','Game_Map_setup','ShiftY','selfValue','VisibleEventLabels','anchor','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','setItemChoice','createSpawnedEvent','_followerControlID','MUSICNOTE','isRegionAllowPass','_working','roundX','SelfSwitchID','includes','checkValidEventerMap','turnAwayFromPoint','tAleK','isAdvancedSwitch','updatePattern','down','reverse\x20copy','blendMode','Game_Follower_initialize','aHQRI','sfoIn','_mirrorSprite','WxVwK','_expireCommonEvent','AJPVL','Settings','split','text','SHQbp','isDashDisabled','XZojB','kGTxF','setPlayerDiagonalSetting','chaseCharacter','_customZ','wWLUz','initialize','Game_Timer_stop','LWJeU','rRwoW','hasMoveOnlyRegions','PreCopyJS','RegionOkTarget','startMessage','setLastPluginCommandInterpreter','mimic','Game_Troop_meetsConditions','mVgHR','Game_Timer_initialize','isDiagonalDirection','xUFrp','BLtjK','Game_Player_getInputDirection','morphIntoTemplate','character','screenY','Game_Map_isDashDisabled','StrictCollision','vehicle','VehicleForbid','updateEventCustomZ','drawing','_characterName','_cpc','template','shadowY','SpawnEventAtXY','CLjBt','Ftcee','Spriteset_Map_createLowerLayer','Game_CharacterBase_screenY','EventLocationCreate','_commonEventId','startEncounterEffect','jVKph','Game_Troop_meetsConditionsCPC','isCollidedWithEvents','USER-DEFINED\x202','blt','COBWEB','yYLhQ','createProxyWindow','BoatSpeed','clearAttachPictureSettings','CallEvent','contentsOpacity','scale','isObjectCharacter','isAirshipPassable','isShip','_event','activationProximityDistance','Window_ScrollText_startMessage','5250165HzTclZ','padZero','column','startMapCommonEventOnOK','_MapSpawnedEventData','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','setOpacity','wGIkm','defaultFontSize','FastForwardKey','processMoveRouteHugWall','variables','Value','status','TargetSwitchId','_randomMoveWeight','_diagonalSupport','Game_Interpreter_character','Scene_Map_startEncounterEffect','getDirectionToPoint','list','getInputDirection','createLabelWindowForTarget','_eventIconSprite','UayFS','Game_Player_executeMove','isEventsMoveCoreInvisible','TiltVert','XeTbU','iconSize','Template','MapID','BufferX','setupEvents','despawnEventId','QeZwu','Game_Vehicle_initMoveSpeed','floor','outlineColor','Dock','MMcef','isDashing','BufferY','BalloonOffsetY','lastMovedDirection','_seconds','hideShadows','standing','approach','ConvertParams','_followerChaseOff','_callEventData','EVAL','_shadowSprite','iGXzr','_moveRoute','ANNOYED','checkRegionEventTrigger','PreSpawnJS','Stop','processMoveSynchAway','isBattleTest','morphInto','random','oXBuc','TerrainTags','PyCiw','_proxyWindow','_target','setAllowEventAutoMovement','xVJro','_vehicleType','Seconds','isSaveEventLocations','locate','Self\x20Switch\x20%1','bxZMe','turnTowardPoint','CPC','_selfEvent','switch2Valid','_labelWindow','BgwRz','parallelCommonEvents','determineCommonEventsWithCPC','updateEventIconSprite','MoIhu','processMoveCommand','isMapVariable','Operation','eraseEvent','IOoyY','Game_Map_parallelCommonEvents','TemplateName','VJydM','Region%1','msZub','regionList','wjKij','left','AutoBuffer','zYtcq','initMembersEventsMoveCore','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','setupChild','isAnyEventStarting','mmSug','isAllowEventAutoMovement','_interpreter','isPassableByAnyDirection','KOFbg','labelWindowText','SPIN\x20CW','command108','Game_Message_setNumberInput','getEventIconData','EventId','autosaveEventLocation','_callEventMap','setMoveSpeed','loadDataFile','_spriteOffsetX','hasAdvancedSwitchVariable','OperateValues','IconBufferX','MDBJw','_eventScreenX','setValue','IconSize','_PlayerDiagonalSetting','createSpawnedEventWithData','IQgGs','uKMOY','PvVts','isMovementSucceeded','_activationProximity','_chaseOff','charAt','_CPCs','pos','clearPageSettings','_shadowOpacity','SeWzh','Event','DashEnableToggle','attachPictureOffsetX','pHWeu','region','zoomScale','deltaX','nNyKh','checkActivationProximity','_eventSpawnData','FontSize','USER-DEFINED\x205','onOk','windowPadding','_eventCopyData','execute','_frames','tVrGp','TzRZA','prototype','moveDiagonally','ARRAYFUNC','setEventIconDataKey','executeCommonEvent','Collision','isPassable','OsoTw','destinationX','OaQva','bufferX','TOGGLE','TSPvl','MUSIC\x20NOTE','isAutoBufferIcon','processMoveSynchApproach','setPlayerControlDisable','nJDxZ','TiltLeft','PzeEX','JSON','start','useCarryPoseForIcons','sSCQG','_speed','characterPatternY','_visibleEventY','GJIGZ','HMPH','_selfTargetItemChoice','onClickTrigger','Game_Vehicle_isMapPassable','isEventTest','updateParallel','rotation','FavorHorz','processMoveRouteMoveToCharacter','_moveRouteIndex','removeMorph','RhXHn','CUjAq','PGwlk','isRegionForbidPass','ucevK','VariableGetSelfVariableID','setMapValue','events','_spriteset','IconBufferY','_lastPluginCommandInterpreter','hIvrn','tileHeight','EXCLAMATION','boat','Fgepp','create','SpawnEventDespawnRegions','Game_CharacterBase_updatePattern','square','_lastAttachPictureScale','_duration','return\x200','LkdiM','Map%1.json','LIGHTBULB','Disable','adjustDir8MovementSpeed','processMoveSynchMimic','createCharacterShadow','airship','Game_Event_updateParallel','isPlayerForceShown','STR','ANGER','44058890xSloku','Game_Character_forceMoveRoute','SpriteBased','DOWN','IconSet','min','isRegionDockable','KhwIx','oFPhD','vertical\x20mirror','%1:%2','initEventsMoveCoreSettings','Sprite_Character_characterPatternY','Step1EventId','vJtvl','_forceShowPlayer','EventIconChange','turnRight90','utLGt','DCNmE','searchLimit','kWgFj','IGQcW','isBoat','hasEventIcon','default','isPreventSelfMovement','rKBlj','cgPcN','setSelfValue','PostCopyJS','isJumping','stop','_selfTargetNumberInput','Sprite_Character_initMembers','moveTowardPoint','_characterSprites','initMembers','tESRp','gsurv','findDirectionTo','SelfSwitches','SuccessSwitchId','jdrye','turnTowardCharacter','realMoveSpeed','nNIAo','Enable','updateVisibility','Game_Message_setItemChoice','description','Game_CharacterBase_direction','maxSize','xQToB','eventLabelsVisible','roundYWithDirection','Vehicle','processMoveRouteMoveRepeat','AdvancedVariables','offsetX','setChaseOff','getPreservedMorphEventData','CdAED','vert\x20mirror','DashModifier','despawnRegions','scrolledY','DqGqd','updateMoveSynch','_visiblePlayerX','QOJUV','setupMorphEvent','_filename','_text','Preserve','executeMove','QUESTION','getAttachPictureBitmapWidth','wQryf','createAttachPictureSprite','pdwfq','EventTimerFramesSet','rGTII','isTriggerIn','PlayerMovementChange','_stopCount','checkEventTriggerAuto','Frames','Game_Event_isCollidedWithPlayerCharacters','IVTVC','vJOqh','isOnRope','_forceHidePlayer','posEventsMoveCore','processMoveRouteJumpTo','CPCsMet','findDiagonalDirectionTo','onLoadSuccess','processMoveRouteAnimation','correctFacingDirection','_lastAttachPictureFilename','RfgnC','setupCopyEvent','_forceHideFollower','canMove','processMoveRouteJumpForward','length','_isObjectCharacter','canPass','xfDzr','reserveCommonEvent','itemPadding','updateAttachPictureSprite','switchId','terrainTag','processMoveRouteMoveTo','setBackgroundType','characterName','EventTimerExpireEvent','sqnZE','_randomHomeX','_needsPeriodicRefresh','uvFLl','clear','updateEventMirrorSprite','Game_CharacterBase_increaseSteps','clearDestination','Game_CharacterBase_isDashing','switch2Id','zGznD','meetActivationRegionConditions','isEventRunning','right','cOMDB','convertVariableValuesInScriptCall','tzKVC','pages','push','parse','_attachPictureSprite','PiRvR','updateEventsAndMovementCore','meetsSwitchCondition','setNumberInput','_alwaysUpdateMove','uYkGw','restoreSavedEventPosition','front','FUNC','_mapId','areFollowersForceShown','isRunning','addLoadListener','Game_Interpreter_PluginCommand','zsIBO','wazEU','isNearTheScreen','textSizeEx','isSpriteVS8dir','QURyr','refreshIfNeeded','FollowerSetControl','7FLGwrN','NOTE','updateOpacity','fontSize','clearSelfTarget','WalkAllow','AutoMoveEvents','EventLabelRefresh','VaIgZ','osNqf','deltaY','getSelfTarget','processMoveSynchRandom','bufferY','updateMove','Scene_Boot_onDatabaseLoaded','Game_CharacterBase_pattern','Window_Message_startMessage','hasClickTrigger','EventLabelVisible','direction','move','Game_Switches_value','setMoveRoute','COpaF','version','PKRRG','eventId','Ycamy','CKadL','hXoAY','turn180','MapId','areFollowersForceHidden','match','characterIndexVS8','deleteIconsOnEventsDataKey','checkAdvancedSwitchVariablePresent','switches','shiftY','_stepPattern','fmeHm','drawTextEx','SPIN\x20CLOCKWISE'];_0x44e0=function(){return _0x4766fa;};return _0x44e0();}(function(_0x71369a,_0x3ff466){const _0x46eb4c=_0x444e,_0x1f76d1=_0x71369a();while(!![]){try{const _0x4369c1=-parseInt(_0x46eb4c(0x302))/0x1+-parseInt(_0x46eb4c(0x3a5))/0x2+-parseInt(_0x46eb4c(0x21b))/0x3*(parseInt(_0x46eb4c(0x330))/0x4)+-parseInt(_0x46eb4c(0x490))/0x5+-parseInt(_0x46eb4c(0x40b))/0x6*(parseInt(_0x46eb4c(0x61e))/0x7)+-parseInt(_0x46eb4c(0x371))/0x8*(parseInt(_0x46eb4c(0x32d))/0x9)+parseInt(_0x46eb4c(0x57c))/0xa;if(_0x4369c1===_0x3ff466)break;else _0x1f76d1['push'](_0x1f76d1['shift']());}catch(_0x428685){_0x1f76d1['push'](_0x1f76d1['shift']());}}}(_0x44e0,0x82d68));var label=_0x2ee1ea(0x3f3),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2ee1ea(0x6a2)](function(_0x2c25fd){const _0x5276d2=_0x2ee1ea;return _0x2c25fd['status']&&_0x2c25fd[_0x5276d2(0x5ae)][_0x5276d2(0x43c)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x2ee1ea(0x44c)]||{},VisuMZ[_0x2ee1ea(0x4c1)]=function(_0x1d7968,_0x38d89d){const _0xaf6bf4=_0x2ee1ea;for(const _0x577566 in _0x38d89d){if(_0xaf6bf4(0x25f)!==_0xaf6bf4(0x25f)){if(!_0x970c9[_0xaf6bf4(0x368)])return;if(!_0x343056[_0xaf6bf4(0x368)][_0xaf6bf4(0x561)])return;const _0x41af79=_0x4b37f9[_0xaf6bf4(0x368)][_0xaf6bf4(0x561)][_0xaf6bf4(0x6a4)](this['_event']);if(!_0x41af79)return;this['x']=_0x6e8d8a[_0xaf6bf4(0x650)](this['_event'][_0xaf6bf4(0x2b5)]()-_0x2ece53[_0xaf6bf4(0x4b5)](this[_0xaf6bf4(0x275)]*this['scale']['x']/0x2)),this['x']+=this[_0xaf6bf4(0x48d)][_0xaf6bf4(0x4e1)]['offsetX'],this['y']=this['_event'][_0xaf6bf4(0x46a)]()-_0x41af79[_0xaf6bf4(0x199)],this['y']+=_0x251d3d[_0xaf6bf4(0x650)](_0x524449[_0xaf6bf4(0x52c)]()*0.5),this['y']-=_0x5d4ff0[_0xaf6bf4(0x650)](this[_0xaf6bf4(0x199)]*this[_0xaf6bf4(0x489)]['y']),this['y']+=this[_0xaf6bf4(0x48d)]['_labelWindow'][_0xaf6bf4(0x65e)],this[_0xaf6bf4(0x342)]=this[_0xaf6bf4(0x48d)][_0xaf6bf4(0x2d9)],this['_eventScreenX']=this[_0xaf6bf4(0x48d)][_0xaf6bf4(0x2b5)](),this[_0xaf6bf4(0x2ee)]=this[_0xaf6bf4(0x48d)][_0xaf6bf4(0x46a)](),this[_0xaf6bf4(0x224)]=this[_0xaf6bf4(0x48d)][_0xaf6bf4(0x4e1)][_0xaf6bf4(0x5b7)],this[_0xaf6bf4(0x249)]=this['_event']['_labelWindow'][_0xaf6bf4(0x65e)],this['_eventPageIndex']=this[_0xaf6bf4(0x48d)][_0xaf6bf4(0x1e7)],this[_0xaf6bf4(0x342)]&&(this['contentsOpacity']=0x0);}else{if(_0x577566['match'](/(.*):(.*)/i)){if(_0xaf6bf4(0x31f)===_0xaf6bf4(0x395))this[_0xaf6bf4(0x30a)]();else{const _0x462715=String(RegExp['$1']),_0x5eab7e=String(RegExp['$2'])[_0xaf6bf4(0x269)]()[_0xaf6bf4(0x1db)]();let _0x288bae,_0x5e017c,_0x5ebcfb;switch(_0x5eab7e){case _0xaf6bf4(0x291):_0x288bae=_0x38d89d[_0x577566]!==''?Number(_0x38d89d[_0x577566]):0x0;break;case'ARRAYNUM':_0x5e017c=_0x38d89d[_0x577566]!==''?JSON['parse'](_0x38d89d[_0x577566]):[],_0x288bae=_0x5e017c[_0xaf6bf4(0x315)](_0x4634b7=>Number(_0x4634b7));break;case _0xaf6bf4(0x4c4):_0x288bae=_0x38d89d[_0x577566]!==''?eval(_0x38d89d[_0x577566]):null;break;case _0xaf6bf4(0x2e3):_0x5e017c=_0x38d89d[_0x577566]!==''?JSON['parse'](_0x38d89d[_0x577566]):[],_0x288bae=_0x5e017c[_0xaf6bf4(0x315)](_0xbd359e=>eval(_0xbd359e));break;case _0xaf6bf4(0x546):_0x288bae=_0x38d89d[_0x577566]!==''?JSON[_0xaf6bf4(0x606)](_0x38d89d[_0x577566]):'';break;case _0xaf6bf4(0x348):_0x5e017c=_0x38d89d[_0x577566]!==''?JSON[_0xaf6bf4(0x606)](_0x38d89d[_0x577566]):[],_0x288bae=_0x5e017c[_0xaf6bf4(0x315)](_0x15c798=>JSON[_0xaf6bf4(0x606)](_0x15c798));break;case _0xaf6bf4(0x610):_0x288bae=_0x38d89d[_0x577566]!==''?new Function(JSON[_0xaf6bf4(0x606)](_0x38d89d[_0x577566])):new Function(_0xaf6bf4(0x56f));break;case _0xaf6bf4(0x534):_0x5e017c=_0x38d89d[_0x577566]!==''?JSON[_0xaf6bf4(0x606)](_0x38d89d[_0x577566]):[],_0x288bae=_0x5e017c[_0xaf6bf4(0x315)](_0x4dc4f9=>new Function(JSON['parse'](_0x4dc4f9)));break;case _0xaf6bf4(0x57a):_0x288bae=_0x38d89d[_0x577566]!==''?String(_0x38d89d[_0x577566]):'';break;case _0xaf6bf4(0x2df):_0x5e017c=_0x38d89d[_0x577566]!==''?JSON[_0xaf6bf4(0x606)](_0x38d89d[_0x577566]):[],_0x288bae=_0x5e017c[_0xaf6bf4(0x315)](_0x183897=>String(_0x183897));break;case'STRUCT':_0x5ebcfb=_0x38d89d[_0x577566]!==''?JSON[_0xaf6bf4(0x606)](_0x38d89d[_0x577566]):{},_0x1d7968[_0x462715]={},VisuMZ[_0xaf6bf4(0x4c1)](_0x1d7968[_0x462715],_0x5ebcfb);continue;case _0xaf6bf4(0x27e):_0x5e017c=_0x38d89d[_0x577566]!==''?JSON['parse'](_0x38d89d[_0x577566]):[],_0x288bae=_0x5e017c[_0xaf6bf4(0x315)](_0x2eaefa=>VisuMZ[_0xaf6bf4(0x4c1)]({},JSON[_0xaf6bf4(0x606)](_0x2eaefa)));break;default:continue;}_0x1d7968[_0x462715]=_0x288bae;}}}}return _0x1d7968;},(_0x2fad28=>{const _0x495ffc=_0x2ee1ea,_0x5473b1=_0x2fad28['name'];for(const _0x3851ec of dependencies){if(!Imported[_0x3851ec]){alert(_0x495ffc(0x2ac)['format'](_0x5473b1,_0x3851ec)),SceneManager[_0x495ffc(0x1fc)]();break;}}const _0x4e11fc=_0x2fad28[_0x495ffc(0x5ae)];if(_0x4e11fc['match'](/\[Version[ ](.*?)\]/i)){const _0x3e6c43=Number(RegExp['$1']);_0x3e6c43!==VisuMZ[label][_0x495ffc(0x637)]&&(alert(_0x495ffc(0x4f7)[_0x495ffc(0x41e)](_0x5473b1,_0x3e6c43)),SceneManager[_0x495ffc(0x1fc)]());}if(_0x4e11fc[_0x495ffc(0x640)](/\[Tier[ ](\d+)\]/i)){if(_0x495ffc(0x549)!==_0x495ffc(0x549)){const _0x28f618=_0x2e476b[_0x495ffc(0x1f5)](_0x44166d(_0x516977['$1']));return this[_0x495ffc(0x393)](_0x28f618);}else{const _0x3fa282=Number(RegExp['$1']);if(_0x3fa282<tier){if(_0x495ffc(0x2f4)!==_0x495ffc(0x2f4)){if(this[_0x495ffc(0x2d9)])return![];return this[_0x495ffc(0x2ae)];}else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x495ffc(0x41e)](_0x5473b1,_0x3fa282,tier)),SceneManager[_0x495ffc(0x1fc)]();}else _0x495ffc(0x3b2)===_0x495ffc(0x3b2)?tier=Math[_0x495ffc(0x1e1)](_0x3fa282,tier):(_0x3ca740['EventsMoveCore'][_0x495ffc(0x1ad)][_0x495ffc(0x29e)](this),this[_0x495ffc(0x346)](),this[_0x495ffc(0x230)]());}}VisuMZ[_0x495ffc(0x4c1)](VisuMZ[label][_0x495ffc(0x44c)],_0x2fad28['parameters']);})(pluginData),VisuMZ[_0x2ee1ea(0x50b)]=function(_0x17c989,_0x1ecc9b,_0x408e56){switch(_0x408e56){case'=':return _0x1ecc9b;break;case'+':return _0x17c989+_0x1ecc9b;break;case'-':return _0x17c989-_0x1ecc9b;break;case'*':return _0x17c989*_0x1ecc9b;break;case'/':return _0x17c989/_0x1ecc9b;break;case'%':return _0x17c989%_0x1ecc9b;break;}return _0x17c989;},PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x624),_0xfa646=>{const _0x3e94ed=_0x2ee1ea;VisuMZ['ConvertParams'](_0xfa646,_0xfa646);switch(_0xfa646[_0x3e94ed(0x49c)]){case _0x3e94ed(0x26a):$gameSystem['setAllowEventAutoMovement'](!![]);break;case _0x3e94ed(0x4cb):$gameSystem[_0x3e94ed(0x4d5)](![]);break;case _0x3e94ed(0x1bd):$gameSystem[_0x3e94ed(0x4d5)](!$gameSystem['isAllowEventAutoMovement']());break;}}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x487),_0x5d0777=>{const _0x6aba58=_0x2ee1ea;VisuMZ[_0x6aba58(0x4c1)](_0x5d0777,_0x5d0777);const _0x2df598=$gameTemp[_0x6aba58(0x3ca)](),_0x141eec={'mapId':_0x5d0777[_0x6aba58(0x63e)],'eventId':_0x5d0777[_0x6aba58(0x504)]||_0x2df598[_0x6aba58(0x639)](),'pageId':_0x5d0777['PageId']};if(_0x141eec[_0x6aba58(0x2f1)]<=0x0)_0x141eec[_0x6aba58(0x2f1)]=$gameMap?$gameMap['mapId']():0x1;$gameTemp['getLastPluginCommandInterpreter']()[_0x6aba58(0x25e)](_0x141eec);}),PluginManager['registerCommand'](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x520),_0x111687=>{const _0x4c0bf7=_0x2ee1ea;VisuMZ[_0x4c0bf7(0x4c1)](_0x111687,_0x111687);switch(_0x111687['Value']){case _0x4c0bf7(0x5ab):$gameSystem[_0x4c0bf7(0x2ef)](!![]);break;case _0x4c0bf7(0x573):$gameSystem['setDashingEnabled'](![]);break;case'Toggle':$gameSystem[_0x4c0bf7(0x2ef)](!$gameSystem[_0x4c0bf7(0x216)]());break;}}),PluginManager['registerCommand'](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x58c),_0x473262=>{const _0x4839b3=_0x2ee1ea;VisuMZ[_0x4839b3(0x4c1)](_0x473262,_0x473262);const _0x4eece1=$gameTemp[_0x4839b3(0x3ca)]();_0x473262[_0x4839b3(0x63e)]=_0x473262[_0x4839b3(0x63e)]||$gameMap[_0x4839b3(0x2f1)](),$gameSystem[_0x4839b3(0x535)](_0x473262[_0x4839b3(0x63e)],_0x473262[_0x4839b3(0x504)]||_0x4eece1[_0x4839b3(0x639)](),_0x473262['IconIndex'],_0x473262[_0x4839b3(0x50c)],_0x473262[_0x4839b3(0x562)],_0x473262[_0x4839b3(0x41b)]);}),PluginManager['registerCommand'](pluginData['name'],_0x2ee1ea(0x1ec),_0x30d5f7=>{const _0x424498=_0x2ee1ea;VisuMZ['ConvertParams'](_0x30d5f7,_0x30d5f7);const _0x275672=$gameTemp[_0x424498(0x3ca)]();_0x30d5f7['MapId']=_0x30d5f7[_0x424498(0x63e)]||$gameMap['mapId'](),$gameSystem['deleteIconsOnEventsDataKey'](_0x30d5f7[_0x424498(0x63e)],_0x30d5f7['EventId']||_0x275672[_0x424498(0x639)]());}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x625),_0x4bf41d=>{const _0x1baebb=_0x2ee1ea;if($gameMap)for(const _0x529a9d of $gameMap[_0x1baebb(0x560)]()){if(_0x1baebb(0x55a)===_0x1baebb(0x55a))_0x529a9d[_0x1baebb(0x38e)]();else{const _0x5e2a89=_0x24addb[_0x1baebb(0x235)](this['moveSynchTarget']());if(_0x5e2a89)return _0x5e2a89['realMoveSpeed']();}}}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x631),_0x2445c1=>{const _0x18ede1=_0x2ee1ea;VisuMZ[_0x18ede1(0x4c1)](_0x2445c1,_0x2445c1);switch(_0x2445c1['Visibility']){case _0x18ede1(0x6aa):$gameSystem[_0x18ede1(0x22e)](!![]);break;case _0x18ede1(0x34c):$gameSystem[_0x18ede1(0x22e)](![]);break;case'Toggle':$gameSystem[_0x18ede1(0x22e)](!$gameSystem[_0x18ede1(0x5b2)]());break;}}),PluginManager[_0x2ee1ea(0x39b)](pluginData['name'],'EventLocationSave',_0x113748=>{const _0x1f9933=_0x2ee1ea;VisuMZ['ConvertParams'](_0x113748,_0x113748);const _0x113dee=$gameTemp['getLastPluginCommandInterpreter']();if(!$gameMap)return;const _0x25d921=$gameMap[_0x1f9933(0x1f5)](_0x113748[_0x1f9933(0x504)]||_0x113dee[_0x1f9933(0x639)]());if(_0x25d921)_0x25d921['saveEventLocation']();}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x47a),_0x347bfa=>{const _0x180b1e=_0x2ee1ea;VisuMZ['ConvertParams'](_0x347bfa,_0x347bfa);const _0x415c0a=$gameTemp[_0x180b1e(0x3ca)](),_0x133812=_0x347bfa[_0x180b1e(0x63e)]||$gameMap[_0x180b1e(0x2f1)](),_0x185780=_0x347bfa['EventId']||_0x415c0a[_0x180b1e(0x639)](),_0x5a56d6=_0x347bfa[_0x180b1e(0x682)]||0x0,_0x444a7c=_0x347bfa[_0x180b1e(0x191)]||0x0,_0x41a6de=_0x347bfa[_0x180b1e(0x244)]||0x2,_0x550271=((_0x347bfa[_0x180b1e(0x3e2)]||0x1)-0x1)[_0x180b1e(0x187)](0x0,0x13),_0x20171a=_0x347bfa[_0x180b1e(0x37b)]||0x0;$gameSystem[_0x180b1e(0x1e8)](_0x133812,_0x185780,_0x5a56d6,_0x444a7c,_0x41a6de,_0x550271,_0x20171a);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x64a),_0x48bda1=>{const _0x1df632=_0x2ee1ea;VisuMZ['ConvertParams'](_0x48bda1,_0x48bda1);const _0x4575a7=$gameTemp[_0x1df632(0x3ca)](),_0x264b7c=_0x48bda1[_0x1df632(0x63e)]||$gameMap[_0x1df632(0x2f1)](),_0x68b16a=_0x48bda1[_0x1df632(0x504)]||_0x4575a7[_0x1df632(0x639)]();$gameSystem[_0x1df632(0x258)](_0x264b7c,_0x68b16a);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x5f2),_0x48e3a2=>{const _0x1faf71=_0x2ee1ea;VisuMZ[_0x1faf71(0x4c1)](_0x48e3a2,_0x48e3a2);const _0x5cd89f=_0x48e3a2['CommonEventID'];$gameTimer[_0x1faf71(0x2a5)](_0x5cd89f);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],'EventTimerExpireClear',_0x327675=>{const _0x33c035=_0x2ee1ea;$gameTimer[_0x33c035(0x2a5)](0x0);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],'EventTimerFramesGain',_0x966d48=>{const _0x439010=_0x2ee1ea;if(!$gameTimer[_0x439010(0x36a)]())return;VisuMZ[_0x439010(0x4c1)](_0x966d48,_0x966d48);let _0xd75c55=0x0;_0xd75c55+=_0x966d48['Frames'],_0xd75c55+=_0x966d48['Seconds']*0x3c,_0xd75c55+=_0x966d48[_0x439010(0x674)]*0x3c*0x3c,_0xd75c55+=_0x966d48['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x439010(0x1eb)](_0xd75c55);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x5cd),_0x3d6c54=>{const _0x2c9bd9=_0x2ee1ea;if(!$gameTimer[_0x2c9bd9(0x36a)]())return;VisuMZ[_0x2c9bd9(0x4c1)](_0x3d6c54,_0x3d6c54);let _0x1763b9=0x0;_0x1763b9+=_0x3d6c54['Frames'],_0x1763b9+=_0x3d6c54[_0x2c9bd9(0x4d8)]*0x3c,_0x1763b9+=_0x3d6c54[_0x2c9bd9(0x674)]*0x3c*0x3c,_0x1763b9+=_0x3d6c54[_0x2c9bd9(0x666)]*0x3c*0x3c*0x3c,$gameTimer['setFrames'](_0x1763b9);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x1e4),_0x3f946b=>{const _0x1c4716=_0x2ee1ea;if(!$gameTimer[_0x1c4716(0x36a)]())return;$gameTimer['pause']();}),PluginManager['registerCommand'](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x194),_0x20cdda=>{const _0x2bfb8e=_0x2ee1ea;if(!$gameTimer[_0x2bfb8e(0x36a)]())return;$gameTimer[_0x2bfb8e(0x304)]();}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],'EventTimerSpeed',_0x2c3714=>{const _0x93b97a=_0x2ee1ea;VisuMZ[_0x93b97a(0x4c1)](_0x2c3714,_0x2c3714);const _0x581223=_0x2c3714[_0x93b97a(0x382)]||0x0;$gameTimer['changeSpeed'](_0x581223);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],'FollowerSetGlobalChase',_0x4b5bdb=>{const _0x45505d=_0x2ee1ea;VisuMZ[_0x45505d(0x4c1)](_0x4b5bdb,_0x4b5bdb);const _0x5cb6f5=!_0x4b5bdb[_0x45505d(0x2c1)];$gameSystem[_0x45505d(0x23e)](_0x5cb6f5);}),PluginManager['registerCommand'](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x265),_0x5d66cb=>{const _0x294e68=_0x2ee1ea;VisuMZ['ConvertParams'](_0x5d66cb,_0x5d66cb);const _0x2dd721=(_0x5d66cb[_0x294e68(0x344)]||0x0)-0x1,_0x5010b5=!_0x5d66cb[_0x294e68(0x2c1)],_0x13b6e2=$gamePlayer['followers']()['follower'](_0x2dd721);if(_0x13b6e2)_0x13b6e2[_0x294e68(0x5b8)](_0x5010b5);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x61d),_0xc8757d=>{const _0x25b9c0=_0x2ee1ea;VisuMZ[_0x25b9c0(0x4c1)](_0xc8757d,_0xc8757d);const _0x32963f=_0xc8757d[_0x25b9c0(0x344)];$gameSystem[_0x25b9c0(0x1d1)](_0x32963f);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x1f2),_0x5eb1ba=>{const _0x4d5b31=_0x2ee1ea;VisuMZ[_0x4d5b31(0x4c1)](_0x5eb1ba,_0x5eb1ba),$gameSystem[_0x4d5b31(0x1d1)](0x0),$gameSystem[_0x4d5b31(0x23e)](![]);for(const _0x54f3db of $gamePlayer[_0x4d5b31(0x300)]()['_data']){if(_0x4d5b31(0x2f0)==='WCFSE'){if(this[_0x4d5b31(0x518)])return;if(_0x1ce8a6[_0x4d5b31(0x6a9)]())return;_0x206838['EventsMoveCore'][_0x4d5b31(0x669)][_0x4d5b31(0x29e)](this,_0x10157b);}else{if(_0x54f3db)_0x54f3db[_0x4d5b31(0x5b8)](![]);}}}),PluginManager['registerCommand'](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x32e),_0x465f60=>{const _0x532ba0=_0x2ee1ea;VisuMZ[_0x532ba0(0x4c1)](_0x465f60,_0x465f60);const _0x2105ea=$gameTemp['getLastPluginCommandInterpreter']();_0x465f60[_0x532ba0(0x63e)]=_0x465f60['MapId']||$gameMap[_0x532ba0(0x2f1)]();const _0x17b279=[_0x465f60[_0x532ba0(0x63e)],_0x465f60[_0x532ba0(0x504)]||_0x2105ea['eventId'](),_0x465f60[_0x532ba0(0x34f)]],_0x216bba=_0x465f60[_0x532ba0(0x49e)],_0xbe1ee7=$gameSelfSwitches['value'](_0x17b279)||![];$gameSwitches[_0x532ba0(0x50f)](_0x216bba,_0xbe1ee7);}),PluginManager['registerCommand'](pluginData[_0x2ee1ea(0x39a)],'SwitchGetSelfSwitchID',_0x209f44=>{const _0x50bd84=_0x2ee1ea;VisuMZ[_0x50bd84(0x4c1)](_0x209f44,_0x209f44);const _0x11cd9b=$gameTemp[_0x50bd84(0x3ca)]();_0x209f44['MapId']=_0x209f44[_0x50bd84(0x63e)]||$gameMap['mapId']();const _0x352747=[_0x209f44['MapId'],_0x209f44[_0x50bd84(0x504)]||_0x11cd9b[_0x50bd84(0x639)](),_0x50bd84(0x4db)[_0x50bd84(0x41e)](_0x209f44[_0x50bd84(0x2b6)])],_0x1beb0b=_0x209f44[_0x50bd84(0x49e)],_0x243c00=$gameSelfSwitches[_0x50bd84(0x698)](_0x352747)||![];$gameSwitches[_0x50bd84(0x50f)](_0x1beb0b,_0x243c00);}),PluginManager[_0x2ee1ea(0x39b)](pluginData['name'],_0x2ee1ea(0x55e),_0x4f2baf=>{const _0x3335ff=_0x2ee1ea;VisuMZ['ConvertParams'](_0x4f2baf,_0x4f2baf);const _0x220c2c=$gameTemp[_0x3335ff(0x3ca)]();_0x4f2baf[_0x3335ff(0x63e)]=_0x4f2baf[_0x3335ff(0x63e)]||$gameMap['mapId']();const _0x2df0cd=[_0x4f2baf[_0x3335ff(0x63e)],_0x4f2baf[_0x3335ff(0x504)]||_0x220c2c['eventId'](),_0x3335ff(0x36e)[_0x3335ff(0x41e)](_0x4f2baf[_0x3335ff(0x3b0)])],_0x5b910c=_0x4f2baf[_0x3335ff(0x257)],_0x4496ea=$gameSelfSwitches[_0x3335ff(0x698)](_0x2df0cd)||![];$gameVariables['setValue'](_0x5b910c,_0x4496ea);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x396),_0x1ed293=>{const _0x30113c=_0x2ee1ea;VisuMZ[_0x30113c(0x4c1)](_0x1ed293,_0x1ed293);if(!$gameMap)return;const _0x3f3ec9=$gameTemp[_0x30113c(0x3ca)](),_0x15db5f=_0x1ed293['Step2Preserve'];_0x1ed293[_0x30113c(0x402)]=_0x1ed293[_0x30113c(0x402)]||$gameMap['mapId'](),_0x1ed293[_0x30113c(0x310)]=_0x1ed293[_0x30113c(0x310)]||$gameMap[_0x30113c(0x2f1)](),_0x1ed293[_0x30113c(0x4ed)]=_0x1ed293[_0x30113c(0x4ed)]['toUpperCase']()[_0x30113c(0x1db)]();if(!_0x15db5f&&_0x1ed293[_0x30113c(0x402)]!==$gameMap[_0x30113c(0x2f1)]())return;if($gameMap[_0x30113c(0x2f1)]()===_0x1ed293[_0x30113c(0x402)]){const _0x21745a=$gameMap[_0x30113c(0x1f5)](_0x1ed293[_0x30113c(0x589)]||_0x3f3ec9[_0x30113c(0x639)]());if(!_0x21745a)return;if(_0x1ed293[_0x30113c(0x4ed)]!==_0x30113c(0x414)){if(_0x30113c(0x400)!==_0x30113c(0x5d5))_0x21745a[_0x30113c(0x468)](_0x1ed293[_0x30113c(0x4ed)]);else{if(this[_0x30113c(0x4c2)]===_0x17823c)this[_0x30113c(0x230)]();return this[_0x30113c(0x4c2)];}}else{if('sRpuC'!=='hmuiP')_0x21745a['morphInto'](_0x1ed293[_0x30113c(0x310)],_0x1ed293[_0x30113c(0x31b)]||_0x3f3ec9['eventId']());else{if(_0x3c9770['areFollowersForceShown']())return!![];if(_0x551f6f[_0x30113c(0x63f)]())return![];return _0x42d2b5[_0x30113c(0x3f3)][_0x30113c(0x198)][_0x30113c(0x29e)](this);}}}_0x15db5f&&$gameSystem[_0x30113c(0x42d)](_0x1ed293[_0x30113c(0x402)],_0x1ed293[_0x30113c(0x589)],_0x1ed293[_0x30113c(0x4ed)],_0x1ed293['Step2MapId'],_0x1ed293['Step2EventId']);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x31c),_0x162e79=>{const _0x214196=_0x2ee1ea;VisuMZ[_0x214196(0x4c1)](_0x162e79,_0x162e79);if(!$gameMap)return;const _0x5cd725=$gameTemp[_0x214196(0x3ca)]();_0x162e79[_0x214196(0x63e)]=_0x162e79['MapId']||$gameMap['mapId']();if($gameMap[_0x214196(0x2f1)]()===_0x162e79[_0x214196(0x63e)]){const _0xee0e06=$gameMap[_0x214196(0x1f5)](_0x162e79['EventId']||_0x5cd725[_0x214196(0x639)]());_0xee0e06[_0x214196(0x558)]();}_0x162e79[_0x214196(0x399)]&&$gameSystem[_0x214196(0x1fe)](_0x162e79['MapId'],_0x162e79[_0x214196(0x504)]||_0x5cd725[_0x214196(0x639)]());}),PluginManager[_0x2ee1ea(0x39b)](pluginData['name'],_0x2ee1ea(0x5d0),_0x18fcec=>{const _0x9c8f84=_0x2ee1ea;VisuMZ['ConvertParams'](_0x18fcec,_0x18fcec),$gameSystem[_0x9c8f84(0x542)](!_0x18fcec[_0x9c8f84(0x5ab)]);}),PluginManager[_0x2ee1ea(0x39b)](pluginData['name'],'PlayerMovementDiagonal',_0x2a6120=>{const _0x191151=_0x2ee1ea;VisuMZ[_0x191151(0x4c1)](_0x2a6120,_0x2a6120),$gameSystem[_0x191151(0x453)](_0x2a6120[_0x191151(0x363)]);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x2c9),_0xc61114=>{const _0x18c7f5=_0x2ee1ea;VisuMZ[_0x18c7f5(0x4c1)](_0xc61114,_0xc61114),$gameSystem['setEventIconData']($gamePlayer,_0xc61114[_0x18c7f5(0x422)],_0xc61114[_0x18c7f5(0x50c)],_0xc61114[_0x18c7f5(0x562)],_0xc61114[_0x18c7f5(0x41b)]);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],'PlayerIconDelete',_0x2adad5=>{VisuMZ['ConvertParams'](_0x2adad5,_0x2adad5),$gameSystem['deleteIconsOnEventsData']($gamePlayer);}),PluginManager[_0x2ee1ea(0x39b)](pluginData['name'],'SelfSwitchABCD',_0x4fcdf3=>{const _0x303c78=_0x2ee1ea;VisuMZ[_0x303c78(0x4c1)](_0x4fcdf3,_0x4fcdf3);const _0x157bcd=$gameTemp[_0x303c78(0x3ca)]();_0x4fcdf3[_0x303c78(0x63e)]=_0x4fcdf3[_0x303c78(0x63e)]||$gameMap[_0x303c78(0x2f1)]();const _0x4cdfe1=[_0x4fcdf3[_0x303c78(0x63e)],_0x4fcdf3[_0x303c78(0x504)]||_0x157bcd['eventId'](),_0x4fcdf3[_0x303c78(0x34f)]];switch(_0x4fcdf3[_0x303c78(0x49c)]){case'ON':$gameSelfSwitches[_0x303c78(0x50f)](_0x4cdfe1,!![]);break;case _0x303c78(0x68b):$gameSelfSwitches[_0x303c78(0x50f)](_0x4cdfe1,![]);break;case _0x303c78(0x1bd):$gameSelfSwitches[_0x303c78(0x50f)](_0x4cdfe1,!$gameSelfSwitches['value'](_0x4cdfe1));break;}}),PluginManager['registerCommand'](pluginData['name'],_0x2ee1ea(0x43b),_0x3910a6=>{const _0x3672de=_0x2ee1ea;VisuMZ[_0x3672de(0x4c1)](_0x3910a6,_0x3910a6);const _0x19a8e0=$gameTemp[_0x3672de(0x3ca)]();_0x3910a6[_0x3672de(0x63e)]=_0x3910a6[_0x3672de(0x63e)]||$gameMap['mapId']();const _0xd665a2=[_0x3910a6[_0x3672de(0x63e)],_0x3910a6[_0x3672de(0x504)]||_0x19a8e0['eventId'](),_0x3672de(0x4db)[_0x3672de(0x41e)](_0x3910a6[_0x3672de(0x2b6)])];switch(_0x3910a6[_0x3672de(0x49c)]){case'ON':$gameSelfSwitches[_0x3672de(0x50f)](_0xd665a2,!![]);break;case _0x3672de(0x68b):$gameSelfSwitches[_0x3672de(0x50f)](_0xd665a2,![]);break;case _0x3672de(0x1bd):$gameSelfSwitches[_0x3672de(0x50f)](_0xd665a2,!$gameSelfSwitches[_0x3672de(0x698)](_0xd665a2));break;}}),PluginManager['registerCommand'](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x65c),_0x4906b9=>{const _0x459cc0=_0x2ee1ea;VisuMZ[_0x459cc0(0x4c1)](_0x4906b9,_0x4906b9);const _0x12a49b=$gameTemp['getLastPluginCommandInterpreter']();_0x4906b9[_0x459cc0(0x63e)]=_0x4906b9[_0x459cc0(0x63e)]||$gameMap['mapId']();const _0x9ebc2f=[_0x4906b9['MapId'],_0x4906b9[_0x459cc0(0x504)]||_0x12a49b[_0x459cc0(0x639)](),_0x459cc0(0x36e)['format'](_0x4906b9['VariableId'])],_0x4f7ad6=VisuMZ[_0x459cc0(0x50b)]($gameSelfSwitches['value'](_0x9ebc2f),_0x4906b9[_0x459cc0(0x49c)],_0x4906b9[_0x459cc0(0x4e9)]);$gameSelfSwitches[_0x459cc0(0x50f)](_0x9ebc2f,_0x4f7ad6);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x475),_0x3f3d68=>{const _0x4bcc22=_0x2ee1ea;VisuMZ[_0x4bcc22(0x4c1)](_0x3f3d68,_0x3f3d68);const _0x19e38d=$gameTemp['getLastPluginCommandInterpreter'](),_0x2d8890={'template':_0x3f3d68[_0x4bcc22(0x4ed)],'mapId':_0x3f3d68[_0x4bcc22(0x63e)]||$gameMap[_0x4bcc22(0x2f1)](),'eventId':_0x3f3d68[_0x4bcc22(0x504)]||_0x19e38d['eventId'](),'x':_0x3f3d68['PosX'],'y':_0x3f3d68[_0x4bcc22(0x191)],'spawnPreserved':_0x3f3d68['Preserve'],'spawnEventId':$gameMap[_0x4bcc22(0x65a)]['length']+0x3e8},_0x1281c7=_0x3f3d68[_0x4bcc22(0x5a6)]||0x0;if(!VisuMZ[_0x4bcc22(0x1f8)][_0x2d8890[_0x4bcc22(0x2f1)]]&&_0x2d8890[_0x4bcc22(0x2f1)]!==$gameMap[_0x4bcc22(0x2f1)]()){let _0x3af242=_0x4bcc22(0x3bf)['format'](_0x2d8890[_0x4bcc22(0x2f1)]);_0x3af242+=_0x4bcc22(0x1af),_0x3af242+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x3af242+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x3af242+=_0x4bcc22(0x495)[_0x4bcc22(0x41e)](_0x2d8890[_0x4bcc22(0x2f1)]),alert(_0x3af242);return;}const _0x2f3f07=$gameMap[_0x4bcc22(0x69c)](_0x2d8890,_0x3f3d68[_0x4bcc22(0x537)],_0x3f3d68[_0x4bcc22(0x375)]);if(_0x1281c7){if(_0x4bcc22(0x564)!==_0x4bcc22(0x58a))$gameSwitches[_0x4bcc22(0x50f)](_0x1281c7,!!_0x2f3f07);else{const _0x141379=_0x101e46[_0x4bcc22(0x1f5)](_0x4f6e1c(_0x4548f2['$1'])),_0x9276a4=this['checkCollisionKeywords'](_0x4cc0a8);return this['processMoveRouteMoveToCharacter'](_0x141379,_0x9276a4);}}}),PluginManager[_0x2ee1ea(0x39b)](pluginData['name'],'SpawnEventAtRegion',_0x48e4f8=>{const _0x3f54ab=_0x2ee1ea;VisuMZ['ConvertParams'](_0x48e4f8,_0x48e4f8);const _0x5c4c37=$gameTemp[_0x3f54ab(0x3ca)](),_0x2675a8={'template':_0x48e4f8[_0x3f54ab(0x4ed)],'mapId':_0x48e4f8[_0x3f54ab(0x63e)]||$gameMap[_0x3f54ab(0x2f1)](),'eventId':_0x48e4f8[_0x3f54ab(0x504)]||_0x5c4c37[_0x3f54ab(0x639)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x48e4f8['Preserve'],'spawnEventId':$gameMap[_0x3f54ab(0x65a)][_0x3f54ab(0x5e6)]+0x3e8},_0x4bea5c=_0x48e4f8[_0x3f54ab(0x5a6)]||0x0;if(!VisuMZ[_0x3f54ab(0x1f8)][_0x2675a8[_0x3f54ab(0x2f1)]]&&_0x2675a8[_0x3f54ab(0x2f1)]!==$gameMap['mapId']()){let _0x43a439=_0x3f54ab(0x3bf)[_0x3f54ab(0x41e)](_0x2675a8[_0x3f54ab(0x2f1)]);_0x43a439+=_0x3f54ab(0x1af),_0x43a439+=_0x3f54ab(0x293),_0x43a439+=_0x3f54ab(0x433),_0x43a439+=_0x3f54ab(0x495)[_0x3f54ab(0x41e)](_0x2675a8[_0x3f54ab(0x2f1)]),alert(_0x43a439);return;}const _0x4d33de=$gameMap[_0x3f54ab(0x2a1)](_0x2675a8,_0x48e4f8[_0x3f54ab(0x2a3)],_0x48e4f8[_0x3f54ab(0x537)],_0x48e4f8['Passability']);_0x4bea5c&&$gameSwitches['setValue'](_0x4bea5c,!!_0x4d33de);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x2e8),_0xf90de4=>{const _0xdf14eb=_0x2ee1ea;VisuMZ[_0xdf14eb(0x4c1)](_0xf90de4,_0xf90de4);const _0x24b46c=$gameTemp['getLastPluginCommandInterpreter'](),_0x31f088={'template':_0xf90de4[_0xdf14eb(0x4ed)],'mapId':_0xf90de4[_0xdf14eb(0x63e)]||$gameMap['mapId'](),'eventId':_0xf90de4[_0xdf14eb(0x504)]||_0x24b46c[_0xdf14eb(0x639)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0xf90de4[_0xdf14eb(0x5c6)],'spawnEventId':$gameMap[_0xdf14eb(0x65a)][_0xdf14eb(0x5e6)]+0x3e8},_0x507e03=_0xf90de4['SuccessSwitchId']||0x0;if(!VisuMZ[_0xdf14eb(0x1f8)][_0x31f088[_0xdf14eb(0x2f1)]]&&_0x31f088[_0xdf14eb(0x2f1)]!==$gameMap['mapId']()){let _0x3d4b88=_0xdf14eb(0x3bf)['format'](_0x31f088['mapId']);_0x3d4b88+=_0xdf14eb(0x1af),_0x3d4b88+=_0xdf14eb(0x293),_0x3d4b88+=_0xdf14eb(0x433),_0x3d4b88+=_0xdf14eb(0x495)[_0xdf14eb(0x41e)](_0x31f088[_0xdf14eb(0x2f1)]),alert(_0x3d4b88);return;}const _0x38c5ca=$gameMap[_0xdf14eb(0x3b1)](_0x31f088,_0xf90de4['TerrainTags'],_0xf90de4['Collision'],_0xf90de4['Passability']);_0x507e03&&$gameSwitches[_0xdf14eb(0x50f)](_0x507e03,!!_0x38c5ca);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x301),_0x16311a=>{const _0x18f947=_0x2ee1ea;VisuMZ[_0x18f947(0x4c1)](_0x16311a,_0x16311a);const _0x265228=$gameTemp[_0x18f947(0x3ca)]();$gameMap[_0x18f947(0x4b2)](_0x16311a[_0x18f947(0x3ff)]||_0x265228[_0x18f947(0x639)]());}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x657),_0x1b7968=>{const _0x196ca0=_0x2ee1ea;VisuMZ['ConvertParams'](_0x1b7968,_0x1b7968);const _0x525bcf=_0x1b7968[_0x196ca0(0x682)],_0xb889e=_0x1b7968[_0x196ca0(0x191)];$gameMap[_0x196ca0(0x6b1)](_0x525bcf,_0xb889e);}),PluginManager[_0x2ee1ea(0x39b)](pluginData[_0x2ee1ea(0x39a)],_0x2ee1ea(0x56a),_0x10b474=>{const _0x59da20=_0x2ee1ea;VisuMZ[_0x59da20(0x4c1)](_0x10b474,_0x10b474),$gameMap[_0x59da20(0x5bd)](_0x10b474[_0x59da20(0x2a3)]);}),PluginManager[_0x2ee1ea(0x39b)](pluginData['name'],_0x2ee1ea(0x260),_0x1e0db1=>{const _0x3df348=_0x2ee1ea;VisuMZ[_0x3df348(0x4c1)](_0x1e0db1,_0x1e0db1),$gameMap[_0x3df348(0x2d0)](_0x1e0db1[_0x3df348(0x4d1)]);}),PluginManager[_0x2ee1ea(0x39b)](pluginData['name'],_0x2ee1ea(0x64c),_0x48220f=>{VisuMZ['ConvertParams'](_0x48220f,_0x48220f),$gameMap['despawnEverything']();}),VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x62d)]=Scene_Boot[_0x2ee1ea(0x532)][_0x2ee1ea(0x205)],Scene_Boot[_0x2ee1ea(0x532)][_0x2ee1ea(0x205)]=function(){const _0x23d9ca=_0x2ee1ea;VisuMZ[_0x23d9ca(0x3f3)][_0x23d9ca(0x62d)]['call'](this),this[_0x23d9ca(0x226)](),this[_0x23d9ca(0x1d9)]();if(VisuMZ[_0x23d9ca(0x3f3)][_0x23d9ca(0x372)])VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x23d9ca(0x457)]();},VisuMZ[_0x2ee1ea(0x1f8)]=[],VisuMZ[_0x2ee1ea(0x407)]={},Scene_Boot['prototype'][_0x2ee1ea(0x226)]=function(){const _0x2e5710=_0x2ee1ea;if(DataManager[_0x2e5710(0x4cd)]()||DataManager[_0x2e5710(0x552)]())return;const _0xa17cfc=VisuMZ[_0x2e5710(0x3f3)][_0x2e5710(0x44c)][_0x2e5710(0x4ae)],_0x52b4cd=_0xa17cfc[_0x2e5710(0x328)][_0x2e5710(0x1c9)](0x0);for(const _0x3b2c7c of _0xa17cfc[_0x2e5710(0x2fb)]){if(_0x2e5710(0x653)!==_0x2e5710(0x539)){_0x3b2c7c[_0x2e5710(0x30f)]=_0x3b2c7c[_0x2e5710(0x30f)][_0x2e5710(0x269)]()[_0x2e5710(0x1db)](),VisuMZ['EventTemplates'][_0x3b2c7c[_0x2e5710(0x30f)]]=_0x3b2c7c;if(!_0x52b4cd['includes'](_0x3b2c7c[_0x2e5710(0x4af)]))_0x52b4cd[_0x2e5710(0x605)](_0x3b2c7c['MapID']);}else{const _0x4161bb=this['_attachPictureSprite'];_0x4161bb['x']=this[_0x2e5710(0x345)]['attachPictureOffsetX'](),_0x4161bb['y']=this[_0x2e5710(0x345)][_0x2e5710(0x3a1)](),_0x4161bb['blendMode']=this[_0x2e5710(0x345)][_0x2e5710(0x681)]();}}for(const _0x53f24b of _0x52b4cd){if(VisuMZ[_0x2e5710(0x1f8)][_0x53f24b])continue;const _0x47aa5f='Map%1.json'[_0x2e5710(0x41e)](_0x53f24b[_0x2e5710(0x491)](0x3)),_0x2e179f=_0x2e5710(0x671)[_0x2e5710(0x41e)](_0x53f24b);DataManager[_0x2e5710(0x508)](_0x2e179f,_0x47aa5f),setTimeout(this['VisuMZ_Setup_Preload_Map'][_0x2e5710(0x2bb)](this,_0x53f24b,_0x2e179f),0x64);}},Scene_Boot[_0x2ee1ea(0x532)]['VisuMZ_Setup_Preload_Map']=function(_0x26564a,_0x34a4d3){const _0x5a3907=_0x2ee1ea;window[_0x34a4d3]?(VisuMZ[_0x5a3907(0x1f8)][_0x26564a]=window[_0x34a4d3],window[_0x34a4d3]=undefined):setTimeout(this[_0x5a3907(0x2e2)]['bind'](this,_0x26564a,_0x34a4d3),0x64);},VisuMZ[_0x2ee1ea(0x332)]=[],VisuMZ[_0x2ee1ea(0x5a5)]=[],VisuMZ['MapSwitches']=[],VisuMZ[_0x2ee1ea(0x5b6)]=[],VisuMZ[_0x2ee1ea(0x287)]=[],VisuMZ[_0x2ee1ea(0x697)]=[],Scene_Boot[_0x2ee1ea(0x532)][_0x2ee1ea(0x1d9)]=function(){const _0x192bd2=_0x2ee1ea;for(let _0x1af584=0x1;_0x1af584<$dataSystem[_0x192bd2(0x644)][_0x192bd2(0x5e6)];_0x1af584++){if('hfpjC'==='xzFVe')_0x1d8800['_shadowSprite']=new _0x3228b3(),_0x2944d7[_0x192bd2(0x4c5)][_0x192bd2(0x5c4)]=_0x439a15['_character'][_0x192bd2(0x289)](),_0x4a24de[_0x192bd2(0x4c5)][_0x192bd2(0x21f)]=_0x510a42['loadSystem'](_0xd30f62[_0x192bd2(0x4c5)][_0x192bd2(0x5c4)]),_0x19817e[_0x192bd2(0x4c5)][_0x192bd2(0x432)]['x']=0.5,_0x2ed93b[_0x192bd2(0x4c5)][_0x192bd2(0x432)]['y']=0x1,_0x2f665c[_0x192bd2(0x4c5)]['z']=0x0,this['_tilemap']['addChild'](_0x2db3ec['_shadowSprite']);else{if($dataSystem['switches'][_0x1af584][_0x192bd2(0x640)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedSwitches']['push'](_0x1af584);if($dataSystem[_0x192bd2(0x644)][_0x1af584][_0x192bd2(0x640)](/<SELF>/i))VisuMZ[_0x192bd2(0x5a5)][_0x192bd2(0x605)](_0x1af584);if($dataSystem[_0x192bd2(0x644)][_0x1af584][_0x192bd2(0x640)](/<MAP>/i))VisuMZ[_0x192bd2(0x33f)][_0x192bd2(0x605)](_0x1af584);}}for(let _0x3f7068=0x1;_0x3f7068<$dataSystem[_0x192bd2(0x49b)]['length'];_0x3f7068++){if('rmzTC'!=='rmzTC'){if(!_0x249e12[_0x192bd2(0x3f3)][_0x192bd2(0x44c)][_0x192bd2(0x238)][_0x192bd2(0x24c)])return;for(const _0x6cc3e of this[_0x192bd2(0x5a0)]){this['createCharacterShadow'](_0x6cc3e);}}else{if($dataSystem[_0x192bd2(0x49b)][_0x3f7068]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x192bd2(0x5b6)]['push'](_0x3f7068);if($dataSystem[_0x192bd2(0x49b)][_0x3f7068][_0x192bd2(0x640)](/<SELF>/i))VisuMZ[_0x192bd2(0x287)][_0x192bd2(0x605)](_0x3f7068);if($dataSystem[_0x192bd2(0x49b)][_0x3f7068][_0x192bd2(0x640)](/<MAP>/i))VisuMZ[_0x192bd2(0x697)][_0x192bd2(0x605)](_0x3f7068);}}},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x372)]={},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x372)][_0x2ee1ea(0x457)]=function(){const _0x5f10b1=_0x2ee1ea;this[_0x5f10b1(0x4fc)]=new Game_CPCInterpreter(),this[_0x5f10b1(0x4e4)]();},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x372)]['determineCommonEventsWithCPC']=function(){const _0x457904=_0x2ee1ea;this[_0x457904(0x2d2)]=[];for(const _0x5ee702 of $dataCommonEvents){if(!_0x5ee702)continue;VisuMZ[_0x457904(0x3f3)][_0x457904(0x372)][_0x457904(0x221)](_0x5ee702);if(_0x5ee702[_0x457904(0x4de)][_0x457904(0x5e6)]>0x0)this[_0x457904(0x2d2)][_0x457904(0x605)](_0x5ee702['id']);}},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x372)]['metCPC']=function(_0x6c218e,_0x422a81,_0x51442b){const _0xa5c3c4=_0x2ee1ea;return this[_0xa5c3c4(0x4fc)][_0xa5c3c4(0x688)](_0x6c218e,_0x422a81),_0x51442b?this[_0xa5c3c4(0x4fc)][_0xa5c3c4(0x536)](_0x51442b):this[_0xa5c3c4(0x4fc)][_0xa5c3c4(0x52e)](),this[_0xa5c3c4(0x4fc)][_0xa5c3c4(0x472)];},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x372)][_0x2ee1ea(0x221)]=function(_0x1759b0){const _0x39879a=_0x2ee1ea;let _0x4495a0=![];_0x1759b0[_0x39879a(0x4de)]=[];for(const _0xc4a74a of _0x1759b0[_0x39879a(0x4a4)]){if([0x6c,0x198][_0x39879a(0x43c)](_0xc4a74a[_0x39879a(0x1c6)])){if(_0x39879a(0x44f)===_0x39879a(0x44f)){const _0x138399=_0xc4a74a[_0x39879a(0x1f1)][0x0];if(_0x138399['match'](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x4495a0=!![];else _0x138399[_0x39879a(0x640)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x4495a0=![]);}else _0x502caf=_0x3c4127(_0x2d16cf['$1']),_0x1c4803=_0x5a09dc(_0x5d822c['$2']);}if(_0x4495a0){if(_0x39879a(0x41c)!=='hwwnm'){this[_0x39879a(0x643)](_0x172449),_0x3c5472[_0x39879a(0x305)](this);const _0x452937=_0x3ce49d[_0x39879a(0x3f3)][_0x39879a(0x1a9)]['call'](this,_0xe7cb38);return _0x5867a3[_0x39879a(0x622)](),_0x452937;}else _0x1759b0[_0x39879a(0x4de)][_0x39879a(0x605)](_0xc4a74a);}}},getSelfSwitchValue=function(_0x4a6194,_0x321a86,_0x51050f){const _0x4faab1=_0x2ee1ea;let _0x576cea=[_0x4a6194,_0x321a86,_0x4faab1(0x4db)[_0x4faab1(0x41e)](_0x51050f)];if(typeof _0x51050f===_0x4faab1(0x222)){if('QeZwu'===_0x4faab1(0x4b3))_0x576cea=[_0x4a6194,_0x321a86,_0x51050f[_0x4faab1(0x269)]()[_0x4faab1(0x1db)]()];else return this[_0x4faab1(0x5b5)](0x7,_0x4ded9a(_0x1750cc['$1']));}return $gameSelfSwitches[_0x4faab1(0x698)](_0x576cea);},getMapSwitchValue=function(_0x2d5dae,_0x5e4273){const _0x4c7ee3=_0x2ee1ea;let _0x3f8985=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x4c7ee3(0x41e)](_0x2d5dae,_0x5e4273)];return $gameSelfSwitches[_0x4c7ee3(0x698)](_0x3f8985);},getMapVariableValue=function(_0x13eb95,_0x3eb991){const _0x4ed9c1=_0x2ee1ea;let _0x5a72fe=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x4ed9c1(0x41e)](_0x13eb95,_0x3eb991)];return $gameSelfSwitches[_0x4ed9c1(0x698)](_0x5a72fe);},getSelfVariableValue=function(_0x529f34,_0x5db072,_0x5005dc){const _0x4efd1c=_0x2ee1ea,_0x283972=[_0x529f34,_0x5db072,_0x4efd1c(0x36e)[_0x4efd1c(0x41e)](_0x5005dc)];return $gameSelfSwitches['value'](_0x283972);},setSelfSwitchValue=function(_0x5b6b65,_0x152f91,_0x2d5b02,_0x4294fc){const _0x106e97=_0x2ee1ea;let _0x13ca44=[_0x5b6b65,_0x152f91,_0x106e97(0x4db)['format'](_0x2d5b02)];typeof _0x2d5b02==='string'&&(_0x106e97(0x51e)==='SeWzh'?_0x13ca44=[_0x5b6b65,_0x152f91,_0x2d5b02[_0x106e97(0x269)]()[_0x106e97(0x1db)]()]:this[_0x106e97(0x646)]=''),$gameSelfSwitches[_0x106e97(0x50f)](_0x13ca44,_0x4294fc);},setSelfVariableValue=function(_0x13e155,_0x1bc50f,_0x13b9a1,_0x23057b){const _0x1a42b3=_0x2ee1ea,_0xabdec5=[_0x13e155,_0x1bc50f,_0x1a42b3(0x36e)['format'](_0x13b9a1)];$gameSelfSwitches[_0x1a42b3(0x50f)](_0xabdec5,_0x23057b);},setMapSwitchValue=function(_0x2dd363,_0xd5d06d,_0x1282b4){const _0x4fffe4=_0x2ee1ea;let _0x21fcb2=[0x0,0x0,_0x4fffe4(0x2e6)['format'](_0x2dd363,_0xd5d06d)];$gameSelfSwitches[_0x4fffe4(0x50f)](_0x21fcb2,_0x1282b4);},setMapVariableValue=function(_0x5b7a7c,_0x27f63b,_0x48b575){const _0x52cb1a=_0x2ee1ea;let _0xbf773a=[0x0,0x0,_0x52cb1a(0x299)[_0x52cb1a(0x41e)](_0x5b7a7c,_0x27f63b)];$gameSelfSwitches['setValue'](_0xbf773a,_0x48b575);},DataManager['isAdvancedSwitch']=function(_0x5cfa67){const _0x33a88c=_0x2ee1ea;if(SceneManager['_scene']['constructor']===Scene_Debug)return![];return VisuMZ['AdvancedSwitches'][_0x33a88c(0x43c)](_0x5cfa67);},DataManager['isAdvancedVariable']=function(_0xb020d6){const _0x3d8442=_0x2ee1ea;if(SceneManager[_0x3d8442(0x368)][_0x3d8442(0x3db)]===Scene_Debug)return![];return VisuMZ['AdvancedVariables'][_0x3d8442(0x43c)](_0xb020d6);},DataManager[_0x2ee1ea(0x19f)]=function(_0x28347d){const _0x3a5798=_0x2ee1ea;if(SceneManager[_0x3a5798(0x368)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x3a5798(0x5a5)][_0x3a5798(0x43c)](_0x28347d);},DataManager[_0x2ee1ea(0x227)]=function(_0x45ab66){const _0x58c939=_0x2ee1ea;if(SceneManager[_0x58c939(0x368)][_0x58c939(0x3db)]===Scene_Debug)return![];return VisuMZ[_0x58c939(0x287)][_0x58c939(0x43c)](_0x45ab66);},DataManager[_0x2ee1ea(0x659)]=function(_0x18276b){const _0x2aa9e6=_0x2ee1ea;if(BattleManager[_0x2aa9e6(0x4cd)]())return![];return VisuMZ[_0x2aa9e6(0x33f)][_0x2aa9e6(0x43c)](_0x18276b);},DataManager['isMapVariable']=function(_0x1519cd){const _0x9bd1fc=_0x2ee1ea;if(BattleManager['isBattleTest']())return![];return VisuMZ[_0x9bd1fc(0x697)][_0x9bd1fc(0x43c)](_0x1519cd);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x239)]=Game_Temp['prototype'][_0x2ee1ea(0x234)],Game_Temp[_0x2ee1ea(0x532)][_0x2ee1ea(0x234)]=function(_0x34761c,_0x1a76e0){const _0x511685=_0x2ee1ea;if(this[_0x511685(0x1c1)](_0x34761c,_0x1a76e0))return;VisuMZ[_0x511685(0x3f3)][_0x511685(0x239)][_0x511685(0x29e)](this,_0x34761c,_0x1a76e0);},Game_Temp['prototype'][_0x2ee1ea(0x1c1)]=function(_0x1d9ece,_0x28d810){const _0x5f5559=_0x2ee1ea,_0x3c0c68=$gameMap['eventsXy'](_0x1d9ece,_0x28d810);for(const _0x435297 of _0x3c0c68){if(_0x435297&&_0x435297[_0x5f5559(0x630)]())return _0x435297[_0x5f5559(0x550)](),!![];}return![];},Game_Temp['prototype'][_0x2ee1ea(0x45f)]=function(_0xf878d0){const _0x36c107=_0x2ee1ea;this[_0x36c107(0x563)]=_0xf878d0;},Game_Temp[_0x2ee1ea(0x532)][_0x2ee1ea(0x3ca)]=function(){const _0x576370=_0x2ee1ea;return this[_0x576370(0x563)];},Game_Temp['prototype'][_0x2ee1ea(0x305)]=function(_0x1e7b9c){this['_selfTarget']=_0x1e7b9c;},Game_Temp[_0x2ee1ea(0x532)]['clearSelfTarget']=function(){const _0x55ac6d=_0x2ee1ea;this[_0x55ac6d(0x38a)]=undefined;},Game_Temp[_0x2ee1ea(0x532)][_0x2ee1ea(0x629)]=function(){return this['_selfTarget'];},VisuMZ[_0x2ee1ea(0x3f3)]['Game_System_initialize']=Game_System['prototype'][_0x2ee1ea(0x457)],Game_System['prototype'][_0x2ee1ea(0x457)]=function(){const _0xd8f0f8=_0x2ee1ea;VisuMZ[_0xd8f0f8(0x3f3)][_0xd8f0f8(0x1ad)][_0xd8f0f8(0x29e)](this),this[_0xd8f0f8(0x346)](),this[_0xd8f0f8(0x230)]();},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x346)]=function(){const _0x2e4460=_0x2ee1ea;this[_0x2e4460(0x277)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x2e4460(0x30c)]={},this['_MapSpawnedEventData']=[],this[_0x2e4460(0x2f6)]={},this[_0x2e4460(0x38d)]={},this[_0x2e4460(0x2cd)]=![],this[_0x2e4460(0x511)]=_0x2e4460(0x595);},Game_System[_0x2ee1ea(0x532)]['isDashingEnabled']=function(){const _0x23f080=_0x2ee1ea;if(this['_EventsMoveCoreSettings']===undefined)this[_0x23f080(0x346)]();if(this[_0x23f080(0x277)][_0x23f080(0x3a8)]===undefined)this[_0x23f080(0x346)]();return this[_0x23f080(0x277)][_0x23f080(0x3a8)];},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x2ef)]=function(_0x32aa99){const _0x44d278=_0x2ee1ea;if(this['_EventsMoveCoreSettings']===undefined)this[_0x44d278(0x346)]();if(this[_0x44d278(0x277)][_0x44d278(0x3a8)]===undefined)this['initEventsMoveCore']();this[_0x44d278(0x277)]['DashingEnable']=_0x32aa99;},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x4fb)]=function(){const _0x22af83=_0x2ee1ea;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x22af83(0x1c5)]===undefined)this['initEventsMoveCore']();return this['_EventsMoveCoreSettings'][_0x22af83(0x1c5)];},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x4d5)]=function(_0xcae3b){const _0x24935e=_0x2ee1ea;if(this[_0x24935e(0x277)]===undefined)this[_0x24935e(0x346)]();if(this[_0x24935e(0x277)]['EventAutoMovement']===undefined)this['initEventsMoveCore']();this['_EventsMoveCoreSettings']['EventAutoMovement']=_0xcae3b;},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x5b2)]=function(){const _0x55ef55=_0x2ee1ea;if(this['_EventsMoveCoreSettings']===undefined)this[_0x55ef55(0x346)]();if(this[_0x55ef55(0x277)][_0x55ef55(0x431)]===undefined)this[_0x55ef55(0x346)]();return this[_0x55ef55(0x277)][_0x55ef55(0x431)];},Game_System[_0x2ee1ea(0x532)]['setEventLabelsVisible']=function(_0x188bb9){const _0x5ef40e=_0x2ee1ea;if(this[_0x5ef40e(0x277)]===undefined)this[_0x5ef40e(0x346)]();if(this['_EventsMoveCoreSettings'][_0x5ef40e(0x431)]===undefined)this[_0x5ef40e(0x346)]();this[_0x5ef40e(0x277)][_0x5ef40e(0x431)]=_0x188bb9;},Game_System['prototype']['isPlayerControlDisabled']=function(){const _0x4c4222=_0x2ee1ea;if(this[_0x4c4222(0x2cd)]===undefined){if('GDsou'===_0x4c4222(0x193))this[_0x4c4222(0x2cd)]=![];else{if(!_0x2be845['isWorking']())return;_0x30d4ad[_0x4c4222(0x4c1)](_0x458972,_0x2e3ca7);let _0x461b36=0x0;_0x461b36+=_0x5ba8f5[_0x4c4222(0x5d3)],_0x461b36+=_0x119b73[_0x4c4222(0x4d8)]*0x3c,_0x461b36+=_0x3cf488[_0x4c4222(0x674)]*0x3c*0x3c,_0x461b36+=_0x2f47ce[_0x4c4222(0x666)]*0x3c*0x3c*0x3c,_0x22a67d['setFrames'](_0x461b36);}}return this[_0x4c4222(0x2cd)];},Game_System['prototype'][_0x2ee1ea(0x542)]=function(_0x47089e){const _0x2e5358=_0x2ee1ea;this[_0x2e5358(0x2cd)]=_0x47089e;},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x686)]=function(){const _0x583df5=_0x2ee1ea;return this[_0x583df5(0x511)];},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x453)]=function(_0x5107a3){const _0x179f2b=_0x2ee1ea;this[_0x179f2b(0x511)]=String(_0x5107a3)[_0x179f2b(0x1ff)]()[_0x179f2b(0x1db)]();},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x503)]=function(_0x84e0aa){const _0x1ea416=_0x2ee1ea;if(this[_0x1ea416(0x30c)]===undefined)this['initEventsMoveCore']();if(!_0x84e0aa)return null;if(_0x84e0aa===$gamePlayer)return this[_0x1ea416(0x30c)][_0x1ea416(0x28b)];else{if(_0x1ea416(0x5a7)===_0x1ea416(0x60d))_0x36cc8b[_0x1ea416(0x3f3)][_0x1ea416(0x372)][_0x1ea416(0x221)](_0x55ba9a);else{const _0x31b376=VisuMZ['EventsMoveCore']['Settings'],_0x590437=_0x1ea416(0x6a3)['format'](_0x84e0aa[_0x1ea416(0x611)],_0x84e0aa[_0x1ea416(0x25c)]);return this[_0x1ea416(0x30c)][_0x590437]=this[_0x1ea416(0x30c)][_0x590437]||{'iconIndex':0x0,'bufferX':_0x31b376[_0x1ea416(0x195)][_0x1ea416(0x4b0)],'bufferY':_0x31b376[_0x1ea416(0x195)]['BufferY'],'blendMode':_0x31b376['Icon'][_0x1ea416(0x3ec)]},this[_0x1ea416(0x30c)][_0x590437];}}},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x3c6)]=function(_0x34c257,_0x372c19,_0x117956,_0xc65cb7,_0x4c0e8d){const _0x21f610=_0x2ee1ea;if(this[_0x21f610(0x30c)]===undefined)this[_0x21f610(0x346)]();const _0x4efea3=_0x34c257===$gamePlayer?_0x21f610(0x28b):_0x21f610(0x6a3)['format'](_0x34c257[_0x21f610(0x611)],_0x34c257['_eventId']);this[_0x21f610(0x30c)][_0x4efea3]={'iconIndex':_0x372c19,'bufferX':_0x117956,'bufferY':_0xc65cb7,'blendMode':_0x4c0e8d};},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x535)]=function(_0x564238,_0x5d0f43,_0x4b2f5d,_0x392779,_0x391348,_0x59ef72){const _0x5dc293=_0x2ee1ea;if(this[_0x5dc293(0x30c)]===undefined)this[_0x5dc293(0x346)]();const _0x220e38=_0x5dc293(0x6a3)[_0x5dc293(0x41e)](_0x564238,_0x5d0f43);this[_0x5dc293(0x30c)][_0x220e38]={'iconIndex':_0x4b2f5d,'bufferX':_0x392779,'bufferY':_0x391348,'blendMode':_0x59ef72};},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x67f)]=function(_0x1f3886){const _0x5e717a=_0x2ee1ea;if(this['_EventIcons']===undefined)this[_0x5e717a(0x346)]();if(!_0x1f3886)return null;_0x1f3886===$gamePlayer?delete this[_0x5e717a(0x30c)]['Player']:this[_0x5e717a(0x642)](_0x1f3886['_mapId'],_0x1f3886[_0x5e717a(0x25c)]);},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x642)]=function(_0x34ee87,_0xc34504){const _0x401404=_0x2ee1ea;if(this[_0x401404(0x30c)]===undefined)this['initEventsMoveCore']();const _0x366de3=_0x401404(0x6a3)['format'](_0x34ee87,_0xc34504);delete this[_0x401404(0x30c)][_0x366de3];},Game_System[_0x2ee1ea(0x532)]['getSavedEventLocation']=function(_0x464e51){const _0x33f0cb=_0x2ee1ea;if(this[_0x33f0cb(0x38d)]===undefined)this[_0x33f0cb(0x346)]();if(!_0x464e51)return null;const _0x293224='Map%1-Event%2'[_0x33f0cb(0x41e)](_0x464e51[_0x33f0cb(0x611)],_0x464e51[_0x33f0cb(0x25c)]);return this['_SavedEventLocations'][_0x293224];},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x28e)]=function(_0x161dbc){const _0x459fc6=_0x2ee1ea;if(this[_0x459fc6(0x38d)]===undefined)this[_0x459fc6(0x346)]();if(!_0x161dbc)return;const _0x3f9d0d='Map%1-Event%2'[_0x459fc6(0x41e)](_0x161dbc[_0x459fc6(0x611)],_0x161dbc[_0x459fc6(0x25c)]);this[_0x459fc6(0x38d)][_0x3f9d0d]={'direction':_0x161dbc['direction'](),'x':Math[_0x459fc6(0x650)](_0x161dbc['x']),'y':Math[_0x459fc6(0x650)](_0x161dbc['y']),'pageIndex':_0x161dbc[_0x459fc6(0x1e7)],'moveRouteIndex':_0x161dbc['_moveRouteIndex']};},Game_System['prototype'][_0x2ee1ea(0x2bd)]=function(_0x457ebb){const _0x4d4f58=_0x2ee1ea;if(this[_0x4d4f58(0x38d)]===undefined)this[_0x4d4f58(0x346)]();if(!_0x457ebb)return;this[_0x4d4f58(0x258)](_0x457ebb['_mapId'],_0x457ebb[_0x4d4f58(0x25c)]);},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x258)]=function(_0x101c6f,_0x1c5c85){const _0x53c18f=_0x2ee1ea;if(this[_0x53c18f(0x38d)]===undefined)this[_0x53c18f(0x346)]();const _0x48e721=_0x53c18f(0x6a3)[_0x53c18f(0x41e)](_0x101c6f,_0x1c5c85);delete this[_0x53c18f(0x38d)][_0x48e721];},Game_System[_0x2ee1ea(0x532)]['createSaveEventLocationData']=function(_0x4ac284,_0x3f3a40,_0x310902,_0x12cb09,_0x5ce765,_0x2593c3,_0x12c684){const _0x514266=_0x2ee1ea;if(this[_0x514266(0x38d)]===undefined)this['initEventsMoveCore']();const _0x2017ee=_0x514266(0x6a3)['format'](_0x4ac284,_0x3f3a40);this[_0x514266(0x38d)][_0x2017ee]={'direction':_0x5ce765,'x':Math['round'](_0x310902),'y':Math['round'](_0x12cb09),'pageIndex':_0x2593c3,'moveRouteIndex':_0x12c684};},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x5b9)]=function(_0x192805){const _0x40b0e8=_0x2ee1ea;if(this['_PreservedEventMorphData']===undefined)this[_0x40b0e8(0x346)]();if(!_0x192805)return;const _0x4660d4=_0x40b0e8(0x6a3)['format'](_0x192805[_0x40b0e8(0x611)],_0x192805[_0x40b0e8(0x25c)]);return this[_0x40b0e8(0x2f6)][_0x4660d4];},Game_System['prototype'][_0x2ee1ea(0x42d)]=function(_0x46becb,_0x459246,_0x5ab86d,_0x25ea07,_0x426f14){const _0x130925=_0x2ee1ea;if(this['_PreservedEventMorphData']===undefined)this[_0x130925(0x346)]();const _0xa98f15='Map%1-Event%2'[_0x130925(0x41e)](_0x46becb,_0x459246);this['_PreservedEventMorphData'][_0xa98f15]={'template':_0x5ab86d,'mapId':_0x25ea07,'eventId':_0x426f14};},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x1fe)]=function(_0x5c326b,_0x5d5cf3){const _0x57e773=_0x2ee1ea;if(this[_0x57e773(0x2f6)]===undefined)this[_0x57e773(0x346)]();const _0x38f4b6=_0x57e773(0x6a3)[_0x57e773(0x41e)](_0x5c326b,_0x5d5cf3);delete this[_0x57e773(0x2f6)][_0x38f4b6];},Game_System[_0x2ee1ea(0x532)]['getMapSpawnedEventData']=function(_0x430e8c){const _0x21839c=_0x2ee1ea;if(this[_0x21839c(0x494)]===undefined)this[_0x21839c(0x346)]();return this[_0x21839c(0x494)][_0x430e8c]=this[_0x21839c(0x494)][_0x430e8c]||[],this[_0x21839c(0x494)][_0x430e8c];},Game_System[_0x2ee1ea(0x532)]['removeTemporaryMapSpawnedEvents']=function(_0x3c365e){const _0x10a4cd=_0x2ee1ea,_0x11cbd4=this['getMapSpawnedEventData'](_0x3c365e);for(const _0x3912a9 of _0x11cbd4){if(!_0x3912a9)continue;if(_0x3912a9[_0x10a4cd(0x188)])continue;const _0x465d50=_0x11cbd4[_0x10a4cd(0x1ba)](_0x3912a9);_0x11cbd4[_0x465d50]=null;}},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x230)]=function(){const _0x1a928f=_0x2ee1ea;this[_0x1a928f(0x436)]=0x0,this[_0x1a928f(0x4c2)]=![];},Game_System[_0x2ee1ea(0x532)][_0x2ee1ea(0x1a4)]=function(){const _0x10406a=_0x2ee1ea;if(this['_followerControlID']===undefined)this[_0x10406a(0x230)]();return this['_followerControlID'];},Game_System['prototype'][_0x2ee1ea(0x1d1)]=function(_0x2512e5){const _0xb1c3fc=_0x2ee1ea;if(this[_0xb1c3fc(0x436)]===undefined)this[_0xb1c3fc(0x230)]();this['_followerControlID']=_0x2512e5;;},VisuMZ[_0x2ee1ea(0x3f3)]['Game_Interpreter_character']=Game_Interpreter[_0x2ee1ea(0x532)][_0x2ee1ea(0x469)],Game_Interpreter['prototype'][_0x2ee1ea(0x469)]=function(_0x267116){const _0x52f07e=_0x2ee1ea;if(!$gameParty[_0x52f07e(0x1b9)]()&&_0x267116<0x0){let _0x4f3cd1=$gameSystem[_0x52f07e(0x1a4)]();if(_0x4f3cd1>0x0)return $gamePlayer[_0x52f07e(0x300)]()['follower'](_0x4f3cd1-0x1);}return VisuMZ[_0x52f07e(0x3f3)][_0x52f07e(0x4a1)][_0x52f07e(0x29e)](this,_0x267116);},Game_System[_0x2ee1ea(0x532)]['isStopFollowerChasing']=function(){const _0x14cf5f=_0x2ee1ea;if(this[_0x14cf5f(0x4c2)]===undefined)this['initFollowerController']();return this['_followerChaseOff'];},Game_System[_0x2ee1ea(0x532)]['setStopFollowerChasing']=function(_0x155921){const _0x43b906=_0x2ee1ea;if(this[_0x43b906(0x4c2)]===undefined)this['initFollowerController']();this[_0x43b906(0x4c2)]=_0x155921;;},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x463)]=Game_Timer[_0x2ee1ea(0x532)][_0x2ee1ea(0x457)],Game_Timer[_0x2ee1ea(0x532)][_0x2ee1ea(0x457)]=function(){const _0x1dec80=_0x2ee1ea;VisuMZ[_0x1dec80(0x3f3)][_0x1dec80(0x463)][_0x1dec80(0x29e)](this),this[_0x1dec80(0x346)]();},Game_Timer[_0x2ee1ea(0x532)]['initEventsMoveCore']=function(){const _0x3c2c5f=_0x2ee1ea;this[_0x3c2c5f(0x1d5)]=![],this[_0x3c2c5f(0x54a)]=-0x1,this[_0x3c2c5f(0x44a)]=0x0;},Game_Timer[_0x2ee1ea(0x532)][_0x2ee1ea(0x40f)]=function(_0x4b8df0){const _0x4a3849=_0x2ee1ea;if(!_0x4b8df0)return;if(!this[_0x4a3849(0x439)])return;if(this[_0x4a3849(0x1d5)])return;if(this[_0x4a3849(0x52f)]<=0x0)return;if(this[_0x4a3849(0x54a)]===undefined)this[_0x4a3849(0x346)]();this[_0x4a3849(0x52f)]+=this[_0x4a3849(0x54a)],this[_0x4a3849(0x52f)]<=0x0&&this[_0x4a3849(0x3a6)]();},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x280)]=Game_Timer[_0x2ee1ea(0x532)]['start'],Game_Timer[_0x2ee1ea(0x532)]['start']=function(_0x1c3ed2){const _0x5b9d98=_0x2ee1ea;VisuMZ[_0x5b9d98(0x3f3)][_0x5b9d98(0x280)][_0x5b9d98(0x29e)](this,_0x1c3ed2);if(this[_0x5b9d98(0x1d5)]===undefined)this[_0x5b9d98(0x346)]();this[_0x5b9d98(0x1d5)]=![];},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x458)]=Game_Timer[_0x2ee1ea(0x532)][_0x2ee1ea(0x59c)],Game_Timer['prototype'][_0x2ee1ea(0x59c)]=function(){const _0x3cb002=_0x2ee1ea;VisuMZ['EventsMoveCore'][_0x3cb002(0x458)][_0x3cb002(0x29e)](this);if(this[_0x3cb002(0x1d5)]===undefined)this[_0x3cb002(0x346)]();this[_0x3cb002(0x1d5)]=![];},Game_Timer['prototype'][_0x2ee1ea(0x353)]=function(){const _0x2b9d0c=_0x2ee1ea;if(this['_frames']<=0x0)return;this[_0x2b9d0c(0x1d5)]=!![],this[_0x2b9d0c(0x439)]=!![];},Game_Timer[_0x2ee1ea(0x532)][_0x2ee1ea(0x304)]=function(){const _0x11d465=_0x2ee1ea;if(this[_0x11d465(0x52f)]<=0x0)return;this[_0x11d465(0x1d5)]=![],this['_working']=!![];},Game_Timer[_0x2ee1ea(0x532)]['gainFrames']=function(_0x59d798){const _0x121b4e=_0x2ee1ea;this[_0x121b4e(0x52f)]=this[_0x121b4e(0x52f)]||0x0,this[_0x121b4e(0x52f)]+=_0x59d798,this[_0x121b4e(0x439)]=!![],this['_frames']=Math['max'](0x1,this[_0x121b4e(0x52f)]);},Game_Timer['prototype'][_0x2ee1ea(0x651)]=function(_0x4b4e5a){const _0x7c882f=_0x2ee1ea;this[_0x7c882f(0x52f)]=this['_frames']||0x0,this[_0x7c882f(0x52f)]=_0x4b4e5a,this['_working']=!![],this[_0x7c882f(0x52f)]=Math[_0x7c882f(0x1e1)](0x1,this[_0x7c882f(0x52f)]);},Game_Timer['prototype'][_0x2ee1ea(0x1b0)]=function(_0x25c4a8){const _0x115afa=_0x2ee1ea;this[_0x115afa(0x54a)]=_0x25c4a8,this[_0x115afa(0x439)]=!![],_0x25c4a8>0x0&&(this[_0x115afa(0x52f)]=Math['max'](this['_frames'],0x1));},Game_Timer[_0x2ee1ea(0x532)]['setCommonEvent']=function(_0xa9accb){const _0xf41503=_0x2ee1ea;if(this['_expireCommonEvent']===undefined)this[_0xf41503(0x346)]();this['_expireCommonEvent']=_0xa9accb;},VisuMZ[_0x2ee1ea(0x3f3)]['Game_Timer_onExpire']=Game_Timer[_0x2ee1ea(0x532)][_0x2ee1ea(0x3a6)],Game_Timer['prototype'][_0x2ee1ea(0x3a6)]=function(){const _0x2281ec=_0x2ee1ea;if(this['_expireCommonEvent']===undefined)this[_0x2281ec(0x346)]();if(this['_expireCommonEvent']){if(_0x2281ec(0x356)===_0x2281ec(0x2dc))return _0x6a8516[0x2][_0x2281ec(0x640)](/VAR/i)?this[_0x2281ec(0x296)][_0x1676fa]||0x0:!!this[_0x2281ec(0x296)][_0x474a34];else $gameTemp[_0x2281ec(0x5ea)](this[_0x2281ec(0x44a)]);}else VisuMZ[_0x2281ec(0x3f3)][_0x2281ec(0x28c)][_0x2281ec(0x29e)](this);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x183)]=Game_Message[_0x2ee1ea(0x532)]['add'],Game_Message['prototype']['add']=function(_0x14908c){const _0xc6df11=_0x2ee1ea;VisuMZ['EventsMoveCore']['Game_Message_add'][_0xc6df11(0x29e)](this,_0x14908c),this[_0xc6df11(0x4df)]=$gameTemp[_0xc6df11(0x629)]();},Game_Message[_0x2ee1ea(0x532)][_0x2ee1ea(0x288)]=function(){const _0x4a9ee6=_0x2ee1ea;$gameTemp[_0x4a9ee6(0x305)](this[_0x4a9ee6(0x4df)]);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x634)]=Game_Switches[_0x2ee1ea(0x532)][_0x2ee1ea(0x698)],Game_Switches['prototype'][_0x2ee1ea(0x698)]=function(_0x498c2e){const _0x82e746=_0x2ee1ea;if(DataManager['isAdvancedSwitch'](_0x498c2e))return _0x82e746(0x23a)==='PmOUc'?!!this[_0x82e746(0x3b9)](_0x498c2e):this[_0x82e746(0x43e)](_0x8ab3a9(_0x4bfa27['$1']),_0xe53ea3(_0xd9921b['$2']));else{if(DataManager[_0x82e746(0x19f)](_0x498c2e)){if(_0x82e746(0x5f3)===_0x82e746(0x5f3))return!!this[_0x82e746(0x430)](_0x498c2e);else this[_0x82e746(0x3c8)]=!![],_0x581cd7[_0x82e746(0x3f3)]['Game_Event_setupPageSettings']['call'](this),this[_0x82e746(0x665)](),this[_0x82e746(0x3c8)]=![];}else return DataManager['isMapSwitch'](_0x498c2e)?!!this['mapValue'](_0x498c2e):VisuMZ[_0x82e746(0x3f3)][_0x82e746(0x634)][_0x82e746(0x29e)](this,_0x498c2e);}},Game_Switches[_0x2ee1ea(0x3b3)]={},Game_Switches[_0x2ee1ea(0x532)]['advancedValue']=function(_0x486639){const _0x293cdd=_0x2ee1ea;if(!Game_Switches[_0x293cdd(0x3b3)][_0x486639]){$dataSystem[_0x293cdd(0x644)][_0x486639][_0x293cdd(0x640)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x2ad97e=_0x293cdd(0x654)['format'](String(RegExp['$1']));Game_Switches[_0x293cdd(0x3b3)][_0x486639]=new Function(_0x293cdd(0x5ed),_0x2ad97e);}const _0x3d05fe=$gameTemp[_0x293cdd(0x629)]()||this;return Game_Switches['advancedFunc'][_0x486639][_0x293cdd(0x29e)](_0x3d05fe,_0x486639);},Game_Switches[_0x2ee1ea(0x532)][_0x2ee1ea(0x430)]=function(_0x5b058a){const _0x19fc60=_0x2ee1ea,_0x31038c=$gameTemp['getSelfTarget']()||this;if(_0x31038c[_0x19fc60(0x3db)]!==Game_Event)return VisuMZ[_0x19fc60(0x3f3)][_0x19fc60(0x634)]['call'](this,_0x5b058a);else{const _0x22307b=[_0x31038c[_0x19fc60(0x611)],_0x31038c[_0x19fc60(0x25c)],_0x19fc60(0x4db)['format'](_0x5b058a)];return $gameSelfSwitches[_0x19fc60(0x698)](_0x22307b);}},Game_Switches[_0x2ee1ea(0x532)][_0x2ee1ea(0x203)]=function(_0x1c6a60){const _0x23ee46=_0x2ee1ea,_0x5b9d09=$gameMap?$gameMap[_0x23ee46(0x2f1)]():0x0,_0x187292=[0x0,0x0,_0x23ee46(0x2e6)[_0x23ee46(0x41e)](_0x5b9d09,_0x1c6a60)];return $gameSelfSwitches[_0x23ee46(0x698)](_0x187292);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x3be)]=Game_Switches[_0x2ee1ea(0x532)][_0x2ee1ea(0x50f)],Game_Switches[_0x2ee1ea(0x532)]['setValue']=function(_0x343afb,_0x4a0b3f){const _0x1d5dfc=_0x2ee1ea;if(DataManager[_0x1d5dfc(0x19f)](_0x343afb))this[_0x1d5dfc(0x599)](_0x343afb,_0x4a0b3f);else{if(DataManager['isMapSwitch'](_0x343afb)){if(_0x1d5dfc(0x2c4)===_0x1d5dfc(0x25b)){for(let _0x4c99b8=0x1;_0x4c99b8<_0x4999ab[_0x1d5dfc(0x644)][_0x1d5dfc(0x5e6)];_0x4c99b8++){if(_0x2ee3d7['switches'][_0x4c99b8][_0x1d5dfc(0x640)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x1a4972[_0x1d5dfc(0x332)][_0x1d5dfc(0x605)](_0x4c99b8);if(_0x549b3c[_0x1d5dfc(0x644)][_0x4c99b8][_0x1d5dfc(0x640)](/<SELF>/i))_0x2f338d['SelfSwitches'][_0x1d5dfc(0x605)](_0x4c99b8);if(_0x47d3da['switches'][_0x4c99b8][_0x1d5dfc(0x640)](/<MAP>/i))_0x234bae[_0x1d5dfc(0x33f)]['push'](_0x4c99b8);}for(let _0x38601f=0x1;_0x38601f<_0x39df2c[_0x1d5dfc(0x49b)][_0x1d5dfc(0x5e6)];_0x38601f++){if(_0x9e00fd[_0x1d5dfc(0x49b)][_0x38601f][_0x1d5dfc(0x640)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x37edbe[_0x1d5dfc(0x5b6)][_0x1d5dfc(0x605)](_0x38601f);if(_0x5e3054['variables'][_0x38601f][_0x1d5dfc(0x640)](/<SELF>/i))_0x108739[_0x1d5dfc(0x287)][_0x1d5dfc(0x605)](_0x38601f);if(_0x2131fe[_0x1d5dfc(0x49b)][_0x38601f][_0x1d5dfc(0x640)](/<MAP>/i))_0x15481d[_0x1d5dfc(0x697)][_0x1d5dfc(0x605)](_0x38601f);}}else this[_0x1d5dfc(0x55f)](_0x343afb,_0x4a0b3f);}else{if(_0x1d5dfc(0x5d6)!==_0x1d5dfc(0x5d6))return this[_0x1d5dfc(0x5a8)](_0xcc80c8);else VisuMZ[_0x1d5dfc(0x3f3)]['Game_Switches_setValue'][_0x1d5dfc(0x29e)](this,_0x343afb,_0x4a0b3f);}}},Game_Switches[_0x2ee1ea(0x532)][_0x2ee1ea(0x599)]=function(_0x4bb0d4,_0x4578c0){const _0x4f002f=_0x2ee1ea,_0x1ebb30=$gameTemp['getSelfTarget']()||this;if(_0x1ebb30['constructor']!==Game_Event)VisuMZ[_0x4f002f(0x3f3)][_0x4f002f(0x3be)][_0x4f002f(0x29e)](this,_0x4bb0d4,_0x4578c0);else{if(_0x4f002f(0x201)==='YQBvV'){const _0x5050e8=[_0x1ebb30[_0x4f002f(0x611)],_0x1ebb30['_eventId'],_0x4f002f(0x4db)[_0x4f002f(0x41e)](_0x4bb0d4)];$gameSelfSwitches[_0x4f002f(0x50f)](_0x5050e8,_0x4578c0);}else{_0xa48c33[_0x4f002f(0x3f3)][_0x4f002f(0x280)]['call'](this,_0x15e442);if(this[_0x4f002f(0x1d5)]===_0x59be85)this['initEventsMoveCore']();this[_0x4f002f(0x1d5)]=![];}}},Game_Switches[_0x2ee1ea(0x532)][_0x2ee1ea(0x55f)]=function(_0x1e6db7,_0xdeed35){const _0x35ac1c=_0x2ee1ea,_0x49c866=$gameMap?$gameMap[_0x35ac1c(0x2f1)]():0x0,_0x2b6702=[0x0,0x0,_0x35ac1c(0x2e6)[_0x35ac1c(0x41e)](_0x49c866,_0x1e6db7)];return $gameSelfSwitches[_0x35ac1c(0x50f)](_0x2b6702,_0xdeed35);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x274)]=Game_Variables['prototype'][_0x2ee1ea(0x698)],Game_Variables['prototype'][_0x2ee1ea(0x698)]=function(_0x360113){const _0x31dc55=_0x2ee1ea;if(DataManager[_0x31dc55(0x253)](_0x360113)){if('gkrcm'===_0x31dc55(0x2cb))_0x5c0383[_0x31dc55(0x1df)](_0x31dc55(0x28d)[_0x31dc55(0x41e)](_0x348b66));else return this[_0x31dc55(0x3b9)](_0x360113);}else{if(DataManager['isSelfVariable'](_0x360113)){if(_0x31dc55(0x354)===_0x31dc55(0x617))this[_0x31dc55(0x518)]=_0x1d4c36;else return this[_0x31dc55(0x430)](_0x360113);}else return DataManager[_0x31dc55(0x4e8)](_0x360113)?this[_0x31dc55(0x203)](_0x360113):VisuMZ[_0x31dc55(0x3f3)][_0x31dc55(0x274)][_0x31dc55(0x29e)](this,_0x360113);}},Game_Variables['advancedFunc']={},Game_Variables[_0x2ee1ea(0x532)][_0x2ee1ea(0x3b9)]=function(_0x1d1b8e){const _0x19b217=_0x2ee1ea;if(!Game_Variables['advancedFunc'][_0x1d1b8e]){$dataSystem[_0x19b217(0x49b)][_0x1d1b8e]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x40ed62=_0x19b217(0x654)[_0x19b217(0x41e)](String(RegExp['$1']));Game_Variables[_0x19b217(0x3b3)][_0x1d1b8e]=new Function(_0x19b217(0x1b8),_0x40ed62);}const _0x281e03=$gameTemp['getSelfTarget']()||this;return Game_Variables[_0x19b217(0x3b3)][_0x1d1b8e][_0x19b217(0x29e)](_0x281e03,_0x1d1b8e);},Game_Variables['prototype']['selfValue']=function(_0x3422b7){const _0x59e830=_0x2ee1ea,_0x4df5e7=$gameTemp[_0x59e830(0x629)]()||this;if(_0x4df5e7[_0x59e830(0x3db)]!==Game_Event)return VisuMZ[_0x59e830(0x3f3)]['Game_Variables_value'][_0x59e830(0x29e)](this,_0x3422b7);else{const _0x2b2602=[_0x4df5e7['_mapId'],_0x4df5e7[_0x59e830(0x25c)],_0x59e830(0x36e)[_0x59e830(0x41e)](_0x3422b7)];return $gameSelfSwitches[_0x59e830(0x698)](_0x2b2602);}},Game_Variables[_0x2ee1ea(0x532)][_0x2ee1ea(0x203)]=function(_0xed1253){const _0x52422f=_0x2ee1ea,_0x5b59ed=$gameMap?$gameMap['mapId']():0x0,_0x171a36=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'['format'](_0x5b59ed,_0xed1253)];return $gameSelfSwitches[_0x52422f(0x698)](_0x171a36)||0x0;},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x2e0)]=Game_Variables[_0x2ee1ea(0x532)][_0x2ee1ea(0x50f)],Game_Variables['prototype'][_0x2ee1ea(0x50f)]=function(_0x5e1ede,_0x298be4){const _0x153c05=_0x2ee1ea;if(DataManager[_0x153c05(0x227)](_0x5e1ede))this['setSelfValue'](_0x5e1ede,_0x298be4);else DataManager['isMapVariable'](_0x5e1ede)?this['setMapValue'](_0x5e1ede,_0x298be4):VisuMZ[_0x153c05(0x3f3)]['Game_Variables_setValue']['call'](this,_0x5e1ede,_0x298be4);},Game_Variables['prototype'][_0x2ee1ea(0x599)]=function(_0x1e7323,_0x2dba75){const _0x17d945=_0x2ee1ea,_0x427cc3=$gameTemp[_0x17d945(0x629)]()||this;if(_0x427cc3['constructor']!==Game_Event){if(_0x17d945(0x483)!==_0x17d945(0x483)){_0x555be0[_0x17d945(0x4c1)](_0x6a42e0,_0x30bf77);const _0x5e0394=(_0x9f5f20[_0x17d945(0x344)]||0x0)-0x1,_0x550434=!_0x364ba0[_0x17d945(0x2c1)],_0x54db2c=_0x3ab076[_0x17d945(0x300)]()['follower'](_0x5e0394);if(_0x54db2c)_0x54db2c[_0x17d945(0x5b8)](_0x550434);}else VisuMZ[_0x17d945(0x3f3)][_0x17d945(0x2e0)][_0x17d945(0x29e)](this,_0x1e7323,_0x2dba75);}else{if('mEZXl'===_0x17d945(0x1aa)){const _0x8b5848=this[_0x17d945(0x406)](this[_0x17d945(0x632)]());return _0x2dc230['roundYWithDirection'](this['y'],_0x8b5848);}else{const _0x2be841=[_0x427cc3['_mapId'],_0x427cc3['_eventId'],'Self\x20Variable\x20%1'[_0x17d945(0x41e)](_0x1e7323)];$gameSelfSwitches[_0x17d945(0x50f)](_0x2be841,_0x2dba75);}}},Game_Variables[_0x2ee1ea(0x532)][_0x2ee1ea(0x55f)]=function(_0x123dc5,_0x30dead){const _0xb13af4=_0x2ee1ea,_0x14931c=$gameMap?$gameMap[_0xb13af4(0x2f1)]():0x0,_0x5857f3=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0xb13af4(0x41e)](_0x14931c,_0x123dc5)];$gameSelfSwitches[_0xb13af4(0x50f)](_0x5857f3,_0x30dead);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x41d)]=Game_SelfSwitches[_0x2ee1ea(0x532)][_0x2ee1ea(0x698)],Game_SelfSwitches[_0x2ee1ea(0x532)][_0x2ee1ea(0x698)]=function(_0x5a15a7){const _0x278034=_0x2ee1ea;if(_0x5a15a7[0x2][_0x278034(0x640)](/(?:SELF|MAP)/i)){if(_0x278034(0x1c0)===_0x278034(0x53e)){_0x3c616d[_0x278034(0x4c1)](_0x1252b8,_0x30774e);const _0x4f6235=_0x51db1e['getLastPluginCommandInterpreter']();_0x111344[_0x278034(0x63e)]=_0x4eaed7[_0x278034(0x63e)]||_0x4fbd33['mapId']();const _0x3427e0=[_0x4ab762[_0x278034(0x63e)],_0x2abfd5['EventId']||_0x4f6235[_0x278034(0x639)](),_0x275ac6[_0x278034(0x34f)]],_0xac5fb5=_0x2a9f26[_0x278034(0x49e)],_0x1e80ef=_0x591b8a[_0x278034(0x698)](_0x3427e0)||![];_0x17ca28[_0x278034(0x50f)](_0xac5fb5,_0x1e80ef);}else return this['selfValue'](_0x5a15a7);}else{if(_0x278034(0x2c6)!==_0x278034(0x1bb)){return VisuMZ['EventsMoveCore'][_0x278034(0x41d)][_0x278034(0x29e)](this,_0x5a15a7);;}else this[_0x278034(0x488)]=0x0;}},Game_SelfSwitches['prototype']['selfValue']=function(_0x1ba09d){const _0x50e85e=_0x2ee1ea;return _0x1ba09d[0x2]['match'](/VAR/i)?this[_0x50e85e(0x296)][_0x1ba09d]||0x0:!!this['_data'][_0x1ba09d];},VisuMZ['EventsMoveCore']['Game_SelfSwitches_setValue']=Game_SelfSwitches[_0x2ee1ea(0x532)][_0x2ee1ea(0x50f)],Game_SelfSwitches[_0x2ee1ea(0x532)][_0x2ee1ea(0x50f)]=function(_0x4e3bc4,_0x55d7c2){const _0x15f045=_0x2ee1ea;_0x4e3bc4[0x2][_0x15f045(0x640)](/(?:SELF|MAP)/i)?'AGfCe'===_0x15f045(0x35d)?this[_0x15f045(0x599)](_0x4e3bc4,_0x55d7c2):(_0x3d5712=_0x450e72(_0xc49e9['$1']),_0x4c888e=_0xa6081c(_0xccfb69['$2'])):_0x15f045(0x31e)===_0x15f045(0x29a)?(_0xf49d1e=_0x513233[_0x15f045(0x1fa)](_0x3eb48f),_0x18a670[_0x15f045(0x3f3)][_0x15f045(0x389)][_0x15f045(0x29e)](this,_0x2fb7d2)):VisuMZ[_0x15f045(0x3f3)]['Game_SelfSwitches_setValue'][_0x15f045(0x29e)](this,_0x4e3bc4,_0x55d7c2);},Game_SelfSwitches[_0x2ee1ea(0x532)]['setSelfValue']=function(_0x289426,_0x3fa03a){const _0x47e0b2=_0x2ee1ea;this[_0x47e0b2(0x296)][_0x289426]=_0x289426[0x2][_0x47e0b2(0x640)](/VAR/i)?_0x3fa03a:!!_0x3fa03a,this['onChange']();},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x311)]=Game_Enemy[_0x2ee1ea(0x532)][_0x2ee1ea(0x60a)],Game_Enemy[_0x2ee1ea(0x532)][_0x2ee1ea(0x60a)]=function(_0x3d7b2c){const _0x52110c=_0x2ee1ea;$gameTemp[_0x52110c(0x305)](this);const _0x18e10e=VisuMZ[_0x52110c(0x3f3)][_0x52110c(0x311)][_0x52110c(0x29e)](this,_0x3d7b2c);return $gameTemp[_0x52110c(0x622)](),_0x18e10e;},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x461)]=Game_Troop[_0x2ee1ea(0x532)][_0x2ee1ea(0x3b7)],Game_Troop[_0x2ee1ea(0x532)][_0x2ee1ea(0x3b7)]=function(_0x35a452){const _0x418800=_0x2ee1ea;$gameTemp[_0x418800(0x305)](this);const _0x135592=VisuMZ[_0x418800(0x3f3)][_0x418800(0x461)][_0x418800(0x29e)](this,_0x35a452);return $gameTemp[_0x418800(0x622)](),_0x135592;},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x42e)]=Game_Map[_0x2ee1ea(0x532)]['setup'],Game_Map['prototype'][_0x2ee1ea(0x688)]=function(_0x4455d3){const _0x659e86=_0x2ee1ea;this[_0x659e86(0x33c)](_0x4455d3),this[_0x659e86(0x427)](),VisuMZ[_0x659e86(0x3f3)]['Game_Map_setup']['call'](this,_0x4455d3),this[_0x659e86(0x427)](),this[_0x659e86(0x67e)](),this[_0x659e86(0x35a)](),this[_0x659e86(0x21c)](),this[_0x659e86(0x69e)](),this[_0x659e86(0x211)](),this['setupFollowerVisibilityOverrides'](),this[_0x659e86(0x427)]();},VisuMZ[_0x2ee1ea(0x3f3)]['Game_Map_setupEvents']=Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x4b1)],Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x4b1)]=function(){const _0x53935f=_0x2ee1ea;VisuMZ[_0x53935f(0x3f3)][_0x53935f(0x19b)][_0x53935f(0x29e)](this),this[_0x53935f(0x61c)]();},Game_Map[_0x2ee1ea(0x2b9)]=0xc8,Game_Map[_0x2ee1ea(0x532)]['determineEventOverload']=function(){const _0x10df1a=_0x2ee1ea,_0x130c9c=Game_Map[_0x10df1a(0x2b9)];this[_0x10df1a(0x3a0)]=this['events']()[_0x10df1a(0x5e6)]>_0x130c9c;if(this[_0x10df1a(0x3a0)]&&$gameTemp[_0x10df1a(0x415)]()){}},Game_Map[_0x2ee1ea(0x532)]['isEventOverloaded']=function(){const _0x57a712=_0x2ee1ea;return this[_0x57a712(0x3a0)];},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x427)]=function(){const _0x2f30d7=_0x2ee1ea;this[_0x2f30d7(0x668)]=undefined;},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x67e)]=function(){const _0x2e11ff=_0x2ee1ea;this[_0x2e11ff(0x4a0)]=VisuMZ[_0x2e11ff(0x3f3)][_0x2e11ff(0x44c)][_0x2e11ff(0x238)]['EnableDir8'];const _0x21259e=$dataMap['note']||'';if(_0x21259e[_0x2e11ff(0x640)](/<DIAGONAL MOVEMENT: ON>/i))_0x2e11ff(0x3f4)===_0x2e11ff(0x229)?(_0x5e415d[_0x2e11ff(0x4c1)](_0x4c46d0,_0x2811c1),_0x48a28b[_0x2e11ff(0x67f)](_0x4c665b)):this[_0x2e11ff(0x4a0)]=!![];else _0x21259e[_0x2e11ff(0x640)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x2e11ff(0x4a0)]=![]);},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x26e)]=function(){const _0x1d42c1=_0x2ee1ea,_0x3f25d1=$gameSystem[_0x1d42c1(0x686)]();if(_0x3f25d1==='enable')return!![];if(_0x3f25d1==='disable')return![];if(this[_0x1d42c1(0x4a0)]===undefined)this['setupDiagonalSupport']();return this['_diagonalSupport'];},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x2c5)]=function(_0x3923b7,_0x4ec256){const _0x20fe1a=_0x2ee1ea;if([0x1,0x4,0x7]['includes'](_0x4ec256))_0x3923b7-=0x1;if([0x3,0x6,0x9][_0x20fe1a(0x43c)](_0x4ec256))_0x3923b7+=0x1;return this['roundX'](_0x3923b7);},Game_Map[_0x2ee1ea(0x532)]['roundYWithDirection']=function(_0xa0568b,_0x14c011){const _0x452e40=_0x2ee1ea;if([0x1,0x2,0x3][_0x452e40(0x43c)](_0x14c011))_0xa0568b+=0x1;if([0x7,0x8,0x9][_0x452e40(0x43c)](_0x14c011))_0xa0568b-=0x1;return this[_0x452e40(0x42a)](_0xa0568b);},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x377)]=function(_0x24082c,_0x215308,_0x14ca77,_0x2afcf6){const _0x527871=_0x2ee1ea;return Math[_0x527871(0x1e1)](Math[_0x527871(0x3c0)](this[_0x527871(0x525)](_0x24082c,_0x14ca77)),Math[_0x527871(0x3c0)](this[_0x527871(0x628)](_0x215308,_0x2afcf6)));},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x35a)]=function(){const _0x2580e0=_0x2ee1ea,_0x1627fd=VisuMZ[_0x2580e0(0x3f3)][_0x2580e0(0x44c)]['Region'],_0x13480f={},_0x3b3fd1=['Allow',_0x2580e0(0x66c),_0x2580e0(0x4b7)],_0x4b405b=['All',_0x2580e0(0x28f),'Player',_0x2580e0(0x51f),_0x2580e0(0x5b4),_0x2580e0(0x367),_0x2580e0(0x2d4),_0x2580e0(0x3d9)];for(const _0xdc67bc of _0x3b3fd1){for(const _0x4ebb1b of _0x4b405b){const _0x4b4f70='%1%2'['format'](_0x4ebb1b,_0xdc67bc);if(_0x1627fd[_0x4b4f70]){if(_0x2580e0(0x5f6)!==_0x2580e0(0x5e1))_0x13480f[_0x4b4f70]=_0x1627fd[_0x4b4f70][_0x2580e0(0x1c9)](0x0);else return this[_0x2580e0(0x48a)]()?0x0:-_0x427a4a[_0x2580e0(0x19d)];}}}const _0x44846e=$dataMap['note']||'',_0x3b9462=_0x44846e['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x3b9462){if(_0x2580e0(0x255)===_0x2580e0(0x545))this[_0x2580e0(0x426)]=!![];else for(const _0x32f01d of _0x3b9462){_0x32f01d[_0x2580e0(0x640)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x43860d=String(RegExp['$1'])[_0x2580e0(0x1ff)]()['trim'](),_0x39fa3c=String(RegExp['$2'])[_0x2580e0(0x1ff)]()[_0x2580e0(0x1db)]();const _0x31b6e3=JSON[_0x2580e0(0x606)]('['+RegExp['$3'][_0x2580e0(0x640)](/\d+/g)+']');_0x43860d=_0x43860d[_0x2580e0(0x519)](0x0)[_0x2580e0(0x269)]()+_0x43860d[_0x2580e0(0x1c9)](0x1),_0x39fa3c=_0x39fa3c[_0x2580e0(0x519)](0x0)[_0x2580e0(0x269)]()+_0x39fa3c[_0x2580e0(0x1c9)](0x1);const _0x3ad892=_0x2580e0(0x313)[_0x2580e0(0x41e)](_0x43860d,_0x39fa3c);if(_0x13480f[_0x3ad892])_0x13480f[_0x3ad892]=_0x13480f[_0x3ad892]['concat'](_0x31b6e3);}}this[_0x2580e0(0x690)]=_0x13480f;},Game_Map['prototype'][_0x2ee1ea(0x438)]=function(_0x14dcbb,_0x5c74b2,_0xc62b4c,_0x325f4c){const _0x291326=_0x2ee1ea,_0x410e4a=this[_0x291326(0x2c5)](_0x14dcbb,_0xc62b4c),_0x5621fc=this['roundYWithDirection'](_0x5c74b2,_0xc62b4c),_0x49bcf1=this[_0x291326(0x2a9)](_0x410e4a,_0x5621fc),_0x8a8d7c=this[_0x291326(0x690)];if(_0x8a8d7c[_0x291326(0x2f2)][_0x291326(0x43c)](_0x49bcf1))return!![];else{if(_0x325f4c===_0x291326(0x2e9))return _0x8a8d7c['PlayerAllow'][_0x291326(0x43c)](_0x49bcf1)||_0x8a8d7c['WalkAllow'][_0x291326(0x43c)](_0x49bcf1);else{if(_0x325f4c===_0x291326(0x1f5))return _0x8a8d7c[_0x291326(0x29b)][_0x291326(0x43c)](_0x49bcf1)||_0x8a8d7c[_0x291326(0x623)][_0x291326(0x43c)](_0x49bcf1);else{if(_0x8a8d7c[_0x291326(0x421)][_0x291326(0x43c)](_0x49bcf1))return!![];else{if(_0x291326(0x5aa)===_0x291326(0x465))return this[_0x291326(0x5b5)](0x8,_0x567701(_0x1bb58b['$1']));else{const _0x25b425='%1Allow'[_0x291326(0x41e)](_0x325f4c[_0x291326(0x519)](0x0)[_0x291326(0x269)]()+_0x325f4c[_0x291326(0x1c9)](0x1));if(_0x8a8d7c[_0x25b425])return _0x8a8d7c[_0x25b425][_0x291326(0x43c)](_0x49bcf1);}}}}}return![];},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x55c)]=function(_0xecf4e0,_0x3b6e61,_0x2a3b4e,_0x4b1a4e){const _0x4c7d5e=_0x2ee1ea,_0x2dd80b=this[_0x4c7d5e(0x2c5)](_0xecf4e0,_0x2a3b4e),_0x5a4659=this[_0x4c7d5e(0x5b3)](_0x3b6e61,_0x2a3b4e),_0x34113f=this[_0x4c7d5e(0x2a9)](_0x2dd80b,_0x5a4659),_0x40024a=this[_0x4c7d5e(0x690)];if(_0x40024a[_0x4c7d5e(0x3af)][_0x4c7d5e(0x43c)](_0x34113f))return!![];else{if(_0x4b1a4e===_0x4c7d5e(0x2e9)){if('gsurv'===_0x4c7d5e(0x5a3))return _0x40024a[_0x4c7d5e(0x2c3)][_0x4c7d5e(0x43c)](_0x34113f)||_0x40024a[_0x4c7d5e(0x2f3)][_0x4c7d5e(0x43c)](_0x34113f);else _0x9e4377['EventsMoveCore'][_0x4c7d5e(0x3e1)][_0x4c7d5e(0x29e)](this),this[_0x4c7d5e(0x41a)]();}else{if(_0x4b1a4e===_0x4c7d5e(0x1f5))return _0x40024a['EventForbid'][_0x4c7d5e(0x43c)](_0x34113f)||_0x40024a[_0x4c7d5e(0x2f3)][_0x4c7d5e(0x43c)](_0x34113f);else{if(_0x40024a[_0x4c7d5e(0x46e)]['includes'](_0x34113f))return!![];else{if(_0x4c7d5e(0x364)===_0x4c7d5e(0x364)){const _0x50e0c9=_0x4c7d5e(0x691)[_0x4c7d5e(0x41e)](_0x4b1a4e[_0x4c7d5e(0x519)](0x0)[_0x4c7d5e(0x269)]()+_0x4b1a4e[_0x4c7d5e(0x1c9)](0x1));if(_0x40024a[_0x50e0c9])return _0x40024a[_0x50e0c9]['includes'](_0x34113f);}else return _0x3d03d7['EventsMoveCore'][_0x4c7d5e(0x372)][_0x4c7d5e(0x2d2)]['includes'](this[_0x4c7d5e(0x47b)]);}}}}return![];},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x582)]=function(_0x53e865,_0x586c94,_0x191dba,_0x24c629){const _0x11935c=_0x2ee1ea;_0x191dba=_0x24c629==='airship'?0x5:_0x191dba;const _0x38950f=this[_0x11935c(0x2c5)](_0x53e865,_0x191dba),_0x5b88fd=this[_0x11935c(0x5b3)](_0x586c94,_0x191dba),_0x319281=this['regionId'](_0x38950f,_0x5b88fd),_0x4a6236=this[_0x11935c(0x690)];if(_0x4a6236[_0x11935c(0x1f6)]['includes'](_0x319281))return!![];else{if('YOHPZ'!==_0x11935c(0x18a)){const _0x10ee4e='%1Dock'['format'](_0x24c629[_0x11935c(0x519)](0x0)[_0x11935c(0x269)]()+_0x24c629['slice'](0x1));if(_0x4a6236[_0x10ee4e])return _0x4a6236[_0x10ee4e][_0x11935c(0x43c)](_0x319281);}else{if(this===_0x3f0370){if(_0x26269c['isPlayerForceShown']())return![];if(_0x4792b6[_0x11935c(0x25d)]())return!![];}return _0x4a781b[_0x11935c(0x3f3)][_0x11935c(0x2de)][_0x11935c(0x29e)](this);}}return![];},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x663)]=Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x38e)],Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x38e)]=function(){const _0x59983e=_0x2ee1ea;VisuMZ['EventsMoveCore'][_0x59983e(0x663)][_0x59983e(0x29e)](this),this[_0x59983e(0x276)]();},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x276)]=function(){const _0x1f9809=_0x2ee1ea;this[_0x1f9809(0x5f5)]=![];if(this['events']()[_0x1f9809(0x200)](_0x540d8e=>_0x540d8e[_0x1f9809(0x50a)]())){this['_needsPeriodicRefresh']=!![];return;}if(this['events']()[_0x1f9809(0x200)](_0x4f9836=>_0x4f9836[_0x1f9809(0x2b8)]())){if(_0x1f9809(0x559)===_0x1f9809(0x661)){_0x379d6e[_0x1f9809(0x247)]=_0x3d1f79;const _0x3bcde5=new _0x1d96e6(_0x382eb2[_0x1f9809(0x2f1)],_0xca0387[_0x1f9809(0x639)]);_0x1f2f7a[_0x1f9809(0x247)]=_0x3a73d2,_0x3bcde5['refresh']();let _0x442907=_0x5ca495-_0x3bcde5[_0x1f9809(0x408)][_0x1f9809(0x4f3)],_0x531419=_0x2be7b+_0x3bcde5[_0x1f9809(0x408)][_0x1f9809(0x4f3)],_0x3d1d17=_0x409e1e-_0x3bcde5[_0x1f9809(0x408)]['up'],_0x33eb09=_0x259644+_0x3bcde5[_0x1f9809(0x408)][_0x1f9809(0x442)];for(let _0x1da2a2=_0x442907;_0x1da2a2<=_0x531419;_0x1da2a2++){for(let _0x34c6a8=_0x3d1d17;_0x34c6a8<=_0x33eb09;_0x34c6a8++){if(this['checkExistingEntitiesAt'](_0x1da2a2,_0x34c6a8))return![];}}return!![];}else{this['_needsPeriodicRefresh']=!![];return;}}if(this[_0x1f9809(0x2d2)]['some'](_0x348762=>_0x348762[_0x1f9809(0x50a)]())){this['_needsPeriodicRefresh']=!![];return;}if(this['_commonEvents'][_0x1f9809(0x200)](_0x5500bf=>_0x5500bf[_0x1f9809(0x2b8)]())){this[_0x1f9809(0x5f5)]=!![];return;}},VisuMZ[_0x2ee1ea(0x3f3)]['Game_Map_update']=Game_Map[_0x2ee1ea(0x532)]['update'],Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x40f)]=function(_0x102572){const _0x57fda8=_0x2ee1ea;this[_0x57fda8(0x190)](),VisuMZ['EventsMoveCore'][_0x57fda8(0x409)][_0x57fda8(0x29e)](this,_0x102572);},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x190)]=function(){const _0x23159e=_0x2ee1ea;if(!this[_0x23159e(0x5f5)])return;this[_0x23159e(0x1f9)]=this[_0x23159e(0x1f9)]||0x3c,this['_periodicRefreshTimer']--;if(this[_0x23159e(0x1f9)]<=0x0){if(_0x23159e(0x4fe)==='OooyP'){if(_0x1adc63[_0x23159e(0x1ca)])this[_0x23159e(0x507)](_0x49050d[_0x23159e(0x1ca)]);}else this[_0x23159e(0x18c)](),this[_0x23159e(0x1f9)]=0x3c;}},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x46b)]=Game_Map['prototype'][_0x2ee1ea(0x450)],Game_Map['prototype'][_0x2ee1ea(0x450)]=function(){const _0x34c03e=_0x2ee1ea;if(!$gameSystem[_0x34c03e(0x216)]())return!![];return VisuMZ[_0x34c03e(0x3f3)][_0x34c03e(0x46b)]['call'](this);},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x21c)]=function(){const _0x16993f=_0x2ee1ea;this[_0x16993f(0x67a)]=![];const _0x338045=$dataMap[_0x16993f(0x6af)]||'';_0x338045[_0x16993f(0x640)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x4d9)]=function(){const _0x3bd199=_0x2ee1ea;if(this[_0x3bd199(0x67a)]===undefined)this[_0x3bd199(0x21c)]();return this[_0x3bd199(0x67a)];},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x33c)]=function(_0x573aa5){const _0x4f5a66=_0x2ee1ea;_0x573aa5!==this['mapId']()&&$gamePlayer&&$gameSystem[_0x4f5a66(0x33c)](this[_0x4f5a66(0x2f1)]());},Game_Map[_0x2ee1ea(0x532)]['setupSpawnedEvents']=function(){const _0xc25ca9=_0x2ee1ea;this[_0xc25ca9(0x65a)]=$gameSystem[_0xc25ca9(0x22c)](this[_0xc25ca9(0x2f1)]()),this[_0xc25ca9(0x383)]=!![];},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x2a7)]=Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x560)],Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x560)]=function(){const _0x1e754a=_0x2ee1ea;if(this[_0x1e754a(0x668)])return this['_eventCache'];const _0x199ab4=VisuMZ[_0x1e754a(0x3f3)][_0x1e754a(0x2a7)][_0x1e754a(0x29e)](this),_0xd134e6=_0x199ab4[_0x1e754a(0x1b7)](this['_spawnedEvents']||[]);return this['_eventCache']=_0xd134e6[_0x1e754a(0x6a2)](_0x5cd222=>!!_0x5cd222),this[_0x1e754a(0x668)];},VisuMZ[_0x2ee1ea(0x3f3)]['Game_Map_event']=Game_Map['prototype'][_0x2ee1ea(0x1f5)],Game_Map['prototype']['event']=function(_0x7f9ad1){const _0x25fe8d=_0x2ee1ea;if(_0x7f9ad1>=0x3e8){if(_0x25fe8d(0x4c6)===_0x25fe8d(0x29f)){const _0x228944=_0x196df7[_0x67c818[_0x25fe8d(0x339)](_0x413d70[_0x25fe8d(0x5e6)])];return _0xd9b795['x']=_0x228944[0x0],_0x398e9b['y']=_0x228944[0x1],this['createSpawnedEventWithData'](_0x5ebbf6),!![];}else return _0x7f9ad1-=0x3e8,this[_0x25fe8d(0x65a)][_0x7f9ad1];}else{if(_0x25fe8d(0x318)===_0x25fe8d(0x318))return VisuMZ[_0x25fe8d(0x3f3)][_0x25fe8d(0x418)][_0x25fe8d(0x29e)](this,_0x7f9ad1);else{const _0x415625=['','LOWER\x20LEFT','DOWN',_0x25fe8d(0x397),_0x25fe8d(0x1cc),'',_0x25fe8d(0x217),_0x25fe8d(0x351),'UP',_0x25fe8d(0x33d)],_0x102ef9=_0x415625['indexOf'](_0x48d503[_0x25fe8d(0x269)]()['trim']());if(_0x102ef9<=0x0)return;if(_0x234bb2)_0x2b8cdb['_moveAllowPlayerCollision']=!![];if(this[_0x25fe8d(0x5e8)](this['x'],this['y'],_0x102ef9)){if(_0x3067dc)_0x5f35ae[_0x25fe8d(0x64d)]=![];this[_0x25fe8d(0x1cd)](_0x102ef9),this['_moveRouteIndex']-=0x1;}if(_0x846895)_0xaf1d9b[_0x25fe8d(0x64d)]=![];}}},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x4ea)]=function(_0x1a5204){const _0x5bac43=_0x2ee1ea,_0x2b6800=this[_0x5bac43(0x1f5)](_0x1a5204);if(_0x2b6800)_0x2b6800['erase']();},Game_Map['prototype'][_0x2ee1ea(0x64b)]=function(){const _0x21d621=_0x2ee1ea,_0x32eab8={'template':_0x21d621(0x38b),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this['_spawnedEvents'][_0x21d621(0x5e6)]+0x3e8};this[_0x21d621(0x512)](_0x32eab8);},Game_Map['prototype']['checkExistingEntitiesAt']=function(_0x2d45b0,_0x33653b){const _0x20c153=_0x2ee1ea;if(this[_0x20c153(0x24a)](_0x2d45b0,_0x33653b)[_0x20c153(0x5e6)]>0x0)return!![];if($gamePlayer['x']===_0x2d45b0&&$gamePlayer['y']===_0x33653b)return!![];if(this[_0x20c153(0x567)]()['posNt'](_0x2d45b0,_0x33653b))return!![];if(this[_0x20c153(0x379)]()[_0x20c153(0x1b3)](_0x2d45b0,_0x33653b))return!![];return![];},Game_Map['prototype'][_0x2ee1ea(0x30b)]=function(_0x1da3be,_0x4b40a5,_0x3e3426){const _0x5ab112=_0x2ee1ea;$gameTemp[_0x5ab112(0x247)]=_0x1da3be;const _0x4929c0=new Game_Event(_0x1da3be[_0x5ab112(0x2f1)],_0x1da3be[_0x5ab112(0x639)]);$gameTemp[_0x5ab112(0x247)]=undefined,_0x4929c0[_0x5ab112(0x38e)]();let _0x5e8827=_0x4b40a5-_0x4929c0['_addedHitbox'][_0x5ab112(0x4f3)],_0x217046=_0x4b40a5+_0x4929c0['_addedHitbox'][_0x5ab112(0x4f3)],_0x320689=_0x3e3426-_0x4929c0[_0x5ab112(0x408)]['up'],_0x236629=_0x3e3426+_0x4929c0[_0x5ab112(0x408)]['down'];for(let _0x15c75c=_0x5e8827;_0x15c75c<=_0x217046;_0x15c75c++){for(let _0x13822e=_0x320689;_0x13822e<=_0x236629;_0x13822e++){if(_0x5ab112(0x4ac)!==_0x5ab112(0x4ac)){if(!_0x21c4d2['eventLabelsVisible']())return![];if(this[_0x5ab112(0x48d)]?.[_0x5ab112(0x2d9)])return![];if(_0x21a374[_0x5ab112(0x368)][_0x5ab112(0x34e)]>0x0)return![];const _0x18ad6f=_0x54a598['x'],_0x3a98b1=_0x447824['y'],_0x5808d6=this[_0x5ab112(0x48d)]['x'],_0x158037=this['_event']['y'];if(this[_0x5ab112(0x5c1)]===_0x18ad6f&&this[_0x5ab112(0x675)]===_0x3a98b1&&this[_0x5ab112(0x24b)]===_0x5808d6&&this[_0x5ab112(0x54c)]===_0x158037)return this[_0x5ab112(0x68a)];this[_0x5ab112(0x5c1)]=_0x16a37a['x'],this[_0x5ab112(0x675)]=_0x53ee51['y'],this['_visibleEventX']=this[_0x5ab112(0x48d)]['x'],this[_0x5ab112(0x54c)]=this[_0x5ab112(0x48d)]['y'];if(_0x4c9a3a[_0x5ab112(0x377)](_0x18ad6f,_0x3a98b1,_0x5808d6,_0x158037)>this['_event'][_0x5ab112(0x2fa)]())return this[_0x5ab112(0x68a)]=![],![];return this[_0x5ab112(0x68a)]=!![],!![];}else{if(this[_0x5ab112(0x3f1)](_0x15c75c,_0x13822e))return![];}}}return!![];},Game_Map['prototype'][_0x2ee1ea(0x512)]=function(_0x1981ca){const _0x459015=_0x2ee1ea;$gameTemp[_0x459015(0x247)]=_0x1981ca;const _0x47582f=new Game_Event(_0x1981ca[_0x459015(0x2f1)],_0x1981ca['eventId']);$gameTemp[_0x459015(0x247)]=undefined,this['_spawnedEvents'][_0x459015(0x605)](_0x47582f),_0x47582f[_0x459015(0x2ff)](_0x1981ca),this[_0x459015(0x427)]();},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x69c)]=function(_0x55e3b6,_0xbfdcc7,_0x2bdd5e){const _0x102647=_0x2ee1ea,_0x1e389f=_0x55e3b6[_0x102647(0x473)]['toUpperCase']()[_0x102647(0x1db)]();if(_0x1e389f!=='UNTITLED'){const _0x41f1f8=VisuMZ[_0x102647(0x407)][_0x1e389f];if(_0x41f1f8){if(_0x102647(0x340)!==_0x102647(0x340)){if(_0x40e6cd[_0x102647(0x579)]())return![];if(_0x3b2123[_0x102647(0x25d)]())return!![];}else _0x55e3b6[_0x102647(0x2f1)]=_0x41f1f8[_0x102647(0x4af)],_0x55e3b6[_0x102647(0x639)]=_0x41f1f8[_0x102647(0x3ff)];}}const _0x5c46c8=_0x55e3b6['x'],_0x2cf27b=_0x55e3b6['y'];if(!this[_0x102647(0x3b8)](_0x5c46c8,_0x2cf27b))return![];if(_0xbfdcc7){if(this[_0x102647(0x3f1)](_0x5c46c8,_0x2cf27b))return![];if(!this['isSpawnHitboxCollisionOk'](_0x55e3b6,_0x5c46c8,_0x2cf27b))return![];}if(_0x2bdd5e){if(!this[_0x102647(0x4fd)](_0x5c46c8,_0x2cf27b))return![];}return this[_0x102647(0x512)](_0x55e3b6),!![];},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x2a1)]=function(_0x402e9,_0x59f87f,_0x56458e,_0x3da9ea){const _0x466f98=_0x2ee1ea,_0x863f7f=[],_0xaf257c=this[_0x466f98(0x275)](),_0x35ef13=this['height']();for(let _0x3a2554=0x0;_0x3a2554<_0xaf257c;_0x3a2554++){if('axxcA'!==_0x466f98(0x5a2))for(let _0x4160af=0x0;_0x4160af<_0x35ef13;_0x4160af++){if('pdwfq'!==_0x466f98(0x5cc)){const _0x140a54=_0x5b13ce['GetMoveSynchTarget'](this[_0x466f98(0x18d)]()),_0x531ced=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x140a54[_0x466f98(0x4bc)]()];this['executeMoveDir8'](_0x531ced);}else{if(!_0x59f87f[_0x466f98(0x43c)](this[_0x466f98(0x2a9)](_0x3a2554,_0x4160af)))continue;if(!this[_0x466f98(0x3b8)](_0x3a2554,_0x4160af))continue;if(_0x56458e){if(_0x466f98(0x685)==='FBJYN'){if(!_0x5c71e6)return;if(!this['_working'])return;if(this['_paused'])return;if(this['_frames']<=0x0)return;if(this['_speed']===_0x2c76c3)this[_0x466f98(0x346)]();this[_0x466f98(0x52f)]+=this[_0x466f98(0x54a)],this[_0x466f98(0x52f)]<=0x0&&this[_0x466f98(0x3a6)]();}else{if(this['checkExistingEntitiesAt'](_0x3a2554,_0x4160af))continue;if(!this[_0x466f98(0x30b)](_0x402e9,_0x3a2554,_0x4160af))continue;}}if(_0x3da9ea){if(!this[_0x466f98(0x4fd)](_0x3a2554,_0x4160af))continue;}_0x863f7f[_0x466f98(0x605)]([_0x3a2554,_0x4160af]);}}else{if(_0x554cdb[_0x466f98(0x270)](this['_characterName']))return;_0xa29f7f=_0x1c0afc[_0x466f98(0x187)](0x0,0x7),this[_0x466f98(0x1f3)](this['_characterName'],_0x364a00);}}if(_0x863f7f[_0x466f98(0x5e6)]>0x0){if(_0x466f98(0x1e5)!=='diNvZ')_0x5e4682[_0x466f98(0x2bd)](this);else{const _0x364be0=_0x863f7f[Math[_0x466f98(0x339)](_0x863f7f[_0x466f98(0x5e6)])];return _0x402e9['x']=_0x364be0[0x0],_0x402e9['y']=_0x364be0[0x1],this[_0x466f98(0x512)](_0x402e9),!![];}}return![];},Game_Map[_0x2ee1ea(0x532)]['prepareSpawnedEventAtTerrainTag']=function(_0x53b964,_0xf00486,_0x23a43a,_0x46065a){const _0x58c838=_0x2ee1ea,_0x15947c=[],_0x5cd28c=this['width'](),_0x379c66=this['height']();for(let _0x413874=0x0;_0x413874<_0x5cd28c;_0x413874++){for(let _0x2da564=0x0;_0x2da564<_0x379c66;_0x2da564++){if(_0x58c838(0x3ee)!==_0x58c838(0x3ee)){const _0x4800cd=_0x29da88[_0x58c838(0x3f3)]['Settings']['Movement'];return _0x4800cd[_0x58c838(0x5bc)]!==_0x4e4bdf?_0x4800cd[_0x58c838(0x5bc)]:_0x2ce918[_0x58c838(0x3f3)]['Game_CharacterBase_realMoveSpeed'][_0x58c838(0x29e)](this)-this['_moveSpeed'];}else{if(!_0xf00486[_0x58c838(0x43c)](this[_0x58c838(0x5ee)](_0x413874,_0x2da564)))continue;if(!this[_0x58c838(0x3b8)](_0x413874,_0x2da564))continue;if(_0x23a43a){if(_0x58c838(0x6b2)!==_0x58c838(0x33b)){if(this[_0x58c838(0x3f1)](_0x413874,_0x2da564))continue;if(!this[_0x58c838(0x30b)](_0x53b964,_0x413874,_0x2da564))continue;}else return _0xcceb0a[_0x58c838(0x29b)][_0x58c838(0x43c)](_0xe87cf9)||_0x1d116e[_0x58c838(0x623)][_0x58c838(0x43c)](_0x74ab69);}if(_0x46065a){if(!this['isPassableByAnyDirection'](_0x413874,_0x2da564))continue;}_0x15947c['push']([_0x413874,_0x2da564]);}}}if(_0x15947c['length']>0x0){if('prJqj'!=='prJqj'){let _0x8a156b=_0x58c838(0x3bf)['format'](_0x23b370[_0x58c838(0x2f1)]);_0x8a156b+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x8a156b+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x8a156b+=_0x58c838(0x433),_0x8a156b+=_0x58c838(0x495)[_0x58c838(0x41e)](_0x50a5ec[_0x58c838(0x2f1)]),_0x902235(_0x8a156b);return;}else{const _0x3ba0f3=_0x15947c[Math[_0x58c838(0x339)](_0x15947c[_0x58c838(0x5e6)])];return _0x53b964['x']=_0x3ba0f3[0x0],_0x53b964['y']=_0x3ba0f3[0x1],this[_0x58c838(0x512)](_0x53b964),!![];}}return![];},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x4fd)]=function(_0x49d2d5,_0x1b46c0){const _0x8fa6a3=_0x2ee1ea;if(this['isPassable'](_0x49d2d5,_0x1b46c0,0x2))return!![];if(this[_0x8fa6a3(0x538)](_0x49d2d5,_0x1b46c0,0x4))return!![];if(this[_0x8fa6a3(0x538)](_0x49d2d5,_0x1b46c0,0x6))return!![];if(this['isPassable'](_0x49d2d5,_0x1b46c0,0x8))return!![];return![];},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x4b2)]=function(_0x31fb10){const _0x3c11b2=_0x2ee1ea;if(_0x31fb10<0x3e8)return;if(!this['_spawnedEvents'])return;const _0xd11542=this[_0x3c11b2(0x1f5)](_0x31fb10);_0xd11542[_0x3c11b2(0x4da)](-0x1,-0x1),_0xd11542[_0x3c11b2(0x662)](),this[_0x3c11b2(0x65a)][_0x31fb10-0x3e8]=null,this['clearEventCache']();},Game_Map['prototype'][_0x2ee1ea(0x374)]=function(){const _0x14dc68=_0x2ee1ea;for(const _0x130f84 of this[_0x14dc68(0x65a)]){if(_0x130f84)return _0x130f84;}return null;},Game_Map['prototype'][_0x2ee1ea(0x210)]=function(){const _0x174151=_0x2ee1ea,_0x2ebd2b=this[_0x174151(0x374)]();return _0x2ebd2b?_0x2ebd2b[_0x174151(0x25c)]:0x0;},Game_Map['prototype']['lastSpawnedEvent']=function(){const _0x1892e8=_0x2ee1ea,_0x50b39f=this[_0x1892e8(0x65a)][_0x1892e8(0x1c9)](0x0)['reverse']();for(const _0x3039f2 of _0x50b39f){if(_0x3039f2)return _0x3039f2;}return null;},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x1d0)]=function(){const _0x4e539c=this['lastSpawnedEvent']();return _0x4e539c?_0x4e539c['_eventId']:0x0;},Game_Map[_0x2ee1ea(0x532)]['despawnAtXY']=function(_0x4b5a18,_0x2e2d77){const _0x469e58=_0x2ee1ea,_0x1e91da=this[_0x469e58(0x24a)](_0x4b5a18,_0x2e2d77);for(const _0x449cd9 of _0x1e91da){if('vjZiC'===_0x469e58(0x184)){if(!_0x449cd9)continue;if(_0x449cd9[_0x469e58(0x678)]())this[_0x469e58(0x4b2)](_0x449cd9['_eventId']);}else this[_0x469e58(0x30a)]();}},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x5bd)]=function(_0x214135){const _0x539237=_0x2ee1ea;for(const _0x52c1bf of this[_0x539237(0x65a)]){if(!_0x52c1bf)continue;if(_0x214135[_0x539237(0x43c)](_0x52c1bf['regionId']())){if(_0x539237(0x446)===_0x539237(0x446))this[_0x539237(0x4b2)](_0x52c1bf[_0x539237(0x25c)]);else{if(_0x134eb3===0x4&&_0x35f8f5===0x2)this['setDirection'](0x1);if(_0x22fd96===0x6&&_0xb7e955===0x2)this['setDirection'](0x3);if(_0x4e5ca1===0x4&&_0x9c8f12===0x8)this[_0x539237(0x1c4)](0x7);if(_0x293470===0x6&&_0x5a6a0a===0x8)this[_0x539237(0x1c4)](0x9);}}}},Game_Map['prototype']['despawnTerrainTags']=function(_0x21714e){const _0x46fb31=_0x2ee1ea;for(const _0x108388 of this[_0x46fb31(0x65a)]){if('obNml'!==_0x46fb31(0x3d0))return this[_0x46fb31(0x322)]();else{if(!_0x108388)continue;if(_0x21714e[_0x46fb31(0x43c)](_0x108388['terrainTag']())){if(_0x46fb31(0x2d8)===_0x46fb31(0x1c2))return _0x26231f[_0x46fb31(0x3f3)][_0x46fb31(0x5af)][_0x46fb31(0x29e)](this);else this['despawnEventId'](_0x108388['_eventId']);}}}},Game_Map['prototype'][_0x2ee1ea(0x297)]=function(){const _0x223080=_0x2ee1ea;for(const _0xc96e4 of this[_0x223080(0x65a)]){if(_0x223080(0x6a1)!==_0x223080(0x6a1))return _0x5969e1[_0x223080(0x1f8)][_0x106157][_0x223080(0x560)][_0x15d37f];else{if(!_0xc96e4)continue;this[_0x223080(0x4b2)](_0xc96e4['_eventId']);}}},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x2a2)]=Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x326)],Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x326)]=function(_0x1f9fb1){const _0x419976=_0x2ee1ea;VisuMZ['EventsMoveCore'][_0x419976(0x2a2)][_0x419976(0x29e)](this,_0x1f9fb1);if(_0x1f9fb1>=0x3e8){if(_0x419976(0x4f2)!==_0x419976(0x58e)){const _0x54103d=this['event'](_0x1f9fb1);if(_0x54103d)_0x54103d[_0x419976(0x18f)]();}else{if(this[_0x419976(0x67a)]===_0x1ef124)this[_0x419976(0x21c)]();return this[_0x419976(0x67a)];}}},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x211)]=function(){const _0x51aed1=_0x2ee1ea;this[_0x51aed1(0x58b)]=![],this['_forceHidePlayer']=![];if(!$dataMap)return;const _0x22b83e=$dataMap['note']||'';if(_0x22b83e[_0x51aed1(0x640)](/<HIDE PLAYER>/i))_0x51aed1(0x5bf)!==_0x51aed1(0x608)?(this[_0x51aed1(0x58b)]=![],this['_forceHidePlayer']=!![]):this['_randomMoveWeight']=0x0;else _0x22b83e[_0x51aed1(0x640)](/<SHOW PLAYER>/i)&&(this['_forceShowPlayer']=!![],this['_forceHidePlayer']=![]);},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x579)]=function(){const _0x1d6d41=_0x2ee1ea;return this[_0x1d6d41(0x58b)]===undefined&&this[_0x1d6d41(0x211)](),this[_0x1d6d41(0x58b)];},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x25d)]=function(){const _0x41586e=_0x2ee1ea;if(this[_0x41586e(0x5d8)]===undefined){if(_0x41586e(0x3de)===_0x41586e(0x598)){let _0x2ff570=_0x10c5f3['EventsMoveCore'][_0x41586e(0x44c)][_0x41586e(0x238)]['FavorHorz']?_0x49579c:_0x32d876;return this[_0x41586e(0x37c)](_0x2ff570);}else this[_0x41586e(0x211)]();}return this['_forceHidePlayer'];},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x2de)]=Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x202)],Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x202)]=function(){const _0x1307c=_0x2ee1ea;if(this===$gamePlayer){if(_0x1307c(0x271)===_0x1307c(0x271)){if($gameMap[_0x1307c(0x579)]())return![];if($gameMap[_0x1307c(0x25d)]())return!![];}else{const _0x47c07c=this[_0x1307c(0x607)];if(!_0x47c07c)return 0x0;return _0x47c07c[_0x1307c(0x21f)][_0x1307c(0x275)];}}return VisuMZ[_0x1307c(0x3f3)][_0x1307c(0x2de)][_0x1307c(0x29e)](this);},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x1c7)]=function(){const _0x2b7f27=_0x2ee1ea;this[_0x2b7f27(0x2b2)]=![],this[_0x2b7f27(0x5e3)]=![];if(!$dataMap)return;const _0x5c43cf=$dataMap[_0x2b7f27(0x6af)]||'';if(_0x5c43cf['match'](/<HIDE FOLLOWERS>/i))this[_0x2b7f27(0x2b2)]=![],this[_0x2b7f27(0x5e3)]=!![];else _0x5c43cf[_0x2b7f27(0x640)](/<SHOW FOLLOWERS>/i)&&(this['_forceShowFollower']=!![],this[_0x2b7f27(0x5e3)]=![]);},Game_Map['prototype'][_0x2ee1ea(0x612)]=function(){const _0x33b294=_0x2ee1ea;return this[_0x33b294(0x2b2)]===undefined&&this[_0x33b294(0x1c7)](),this[_0x33b294(0x2b2)];},Game_Map['prototype'][_0x2ee1ea(0x63f)]=function(){const _0x544b82=_0x2ee1ea;return this[_0x544b82(0x5e3)]===undefined&&this[_0x544b82(0x1c7)](),this['_forceHideFollower'];},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x198)]=Game_Followers[_0x2ee1ea(0x532)][_0x2ee1ea(0x35e)],Game_Followers[_0x2ee1ea(0x532)][_0x2ee1ea(0x35e)]=function(){const _0x4d5d6f=_0x2ee1ea;if($gameMap[_0x4d5d6f(0x612)]())return!![];if($gameMap['areFollowersForceHidden']())return![];return VisuMZ['EventsMoveCore'][_0x4d5d6f(0x198)]['call'](this);},Game_CommonEvent[_0x2ee1ea(0x532)]['hasAdvancedSwitchVariable']=function(){const _0x19800d=_0x2ee1ea,_0x3f6b16=this[_0x19800d(0x1f5)]();return this['isActive']()&&_0x3f6b16['trigger']>=0x1&&DataManager[_0x19800d(0x440)](_0x3f6b16['switchId']);},Game_CommonEvent['prototype']['hasCPCs']=function(){const _0x264b27=_0x2ee1ea;return VisuMZ[_0x264b27(0x3f3)][_0x264b27(0x372)][_0x264b27(0x2d2)][_0x264b27(0x43c)](this[_0x264b27(0x47b)]);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x3f5)]=Game_CommonEvent[_0x2ee1ea(0x532)][_0x2ee1ea(0x2ec)],Game_CommonEvent[_0x2ee1ea(0x532)]['isActive']=function(){const _0x32a640=_0x2ee1ea;if(VisuMZ[_0x32a640(0x3f3)][_0x32a640(0x3f5)]['call'](this))return!![];else{if(_0x32a640(0x44b)!==_0x32a640(0x44b)){if(!_0x3882e6[_0x32a640(0x216)]())return!![];return _0x308e15[_0x32a640(0x3f3)][_0x32a640(0x46b)]['call'](this);}else{const _0x22c70a=this[_0x32a640(0x1f5)]();return VisuMZ['EventsMoveCore'][_0x32a640(0x372)][_0x32a640(0x1dd)](this['event']()[_0x32a640(0x4de)],this[_0x32a640(0x47b)],_0x22c70a);}}},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x4ec)]=Game_Map['prototype'][_0x2ee1ea(0x4e3)],Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x4e3)]=function(){const _0x97bfd1=_0x2ee1ea,_0x3f0276=VisuMZ[_0x97bfd1(0x3f3)][_0x97bfd1(0x4ec)][_0x97bfd1(0x29e)](this),_0x1bd5e3=VisuMZ[_0x97bfd1(0x3f3)][_0x97bfd1(0x372)]['_commonEvents'][_0x97bfd1(0x315)](_0x527f26=>$dataCommonEvents[_0x527f26]);return _0x3f0276['concat'](_0x1bd5e3)[_0x97bfd1(0x6a2)]((_0x2f27fd,_0x46e740,_0x312dca)=>_0x312dca[_0x97bfd1(0x1ba)](_0x2f27fd)===_0x46e740);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x35f)]=Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x5a1)],Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x5a1)]=function(){const _0xc87e06=_0x2ee1ea;VisuMZ[_0xc87e06(0x3f3)][_0xc87e06(0x35f)][_0xc87e06(0x29e)](this),this[_0xc87e06(0x587)]();},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x587)]=function(){const _0x2f502f=_0x2ee1ea;this[_0x2f502f(0x692)]=![],this[_0x2f502f(0x233)](),this['clearDashing'](),this['clearSpriteOffsets'](),this[_0x2f502f(0x1e9)]();},VisuMZ[_0x2ee1ea(0x3f3)]['Game_CharacterBase_opacity']=Game_CharacterBase['prototype']['opacity'],Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x248)]=function(){const _0x4c6c35=_0x2ee1ea;let _0x4ded90=VisuMZ[_0x4c6c35(0x3f3)][_0x4c6c35(0x32f)][_0x4c6c35(0x29e)](this);return _0x4ded90=this[_0x4c6c35(0x412)](_0x4ded90),_0x4ded90;},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x412)]=function(_0x457216){return _0x457216;},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x61a)]=function(){const _0x54c676=_0x2ee1ea;if(this[_0x54c676(0x3db)]===Game_Player&&this['isInVehicle']()){if(_0x54c676(0x3da)==='TFmXy'){const _0x50f236=_0x4e8d3f[_0x54c676(0x629)]()||this;if(_0x50f236['constructor']!==_0x58c533)return _0x87201['EventsMoveCore'][_0x54c676(0x274)][_0x54c676(0x29e)](this,_0x2098d7);else{const _0x599239=[_0x50f236[_0x54c676(0x611)],_0x50f236[_0x54c676(0x25c)],_0x54c676(0x36e)['format'](_0x2df6c5)];return _0x3d653e[_0x54c676(0x698)](_0x599239);}}else return this['vehicle']()[_0x54c676(0x5f1)]()[_0x54c676(0x640)](/\[VS8\]/i);}else{if(Imported[_0x54c676(0x1e3)]&&this['hasDragonbones']()){if(_0x54c676(0x584)!==_0x54c676(0x526))return!![];else this[_0x54c676(0x342)]=![],this[_0x54c676(0x3ea)]=_0xae22a1['zoomScale'](),this[_0x54c676(0x50e)]=this[_0x54c676(0x48d)][_0x54c676(0x2b5)](),this['_eventScreenY']=this[_0x54c676(0x48d)][_0x54c676(0x46a)](),this[_0x54c676(0x224)]=this[_0x54c676(0x48d)][_0x54c676(0x4e1)][_0x54c676(0x5b7)],this[_0x54c676(0x249)]=this[_0x54c676(0x48d)]['_labelWindow'][_0x54c676(0x65e)],this[_0x54c676(0x3fb)]=this[_0x54c676(0x48d)][_0x54c676(0x1e7)],this[_0x54c676(0x68a)]=this['isLabelVisible'](),this[_0x54c676(0x1a7)]=_0x6d64c3[_0x54c676(0x5b2)](),this['_visiblePlayerX']=_0x531fba['x'],this[_0x54c676(0x675)]=_0x5a5ff8['y'],this[_0x54c676(0x24b)]=this[_0x54c676(0x48d)]['x'],this[_0x54c676(0x54c)]=this[_0x54c676(0x48d)]['y'];}else{if(_0x54c676(0x220)===_0x54c676(0x220))return this[_0x54c676(0x5f1)]()[_0x54c676(0x640)](/\[VS8\]/i);else _0x40965b[_0x54c676(0x3f3)][_0x54c676(0x445)][_0x54c676(0x29e)](this,_0x1dc5ee),this[_0x54c676(0x518)]=![];}}},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x5af)]=Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x632)],Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x632)]=function(){const _0x2ca95d=_0x2ee1ea;if(!$dataMap)return this[_0x2ca95d(0x225)]||0x2;if(this[_0x2ca95d(0x1a6)]()&&!this['isJumping']()&&this[_0x2ca95d(0x61a)]())return this[_0x2ca95d(0x3e3)]();else{if(this['isOnLadder']()&&!this[_0x2ca95d(0x59b)]())return 0x8;else{if(this[_0x2ca95d(0x3c5)]()&&this[_0x2ca95d(0x61a)]()){if(_0x2ca95d(0x37e)!==_0x2ca95d(0x37e))_0x4b3821=0x4;else return this[_0x2ca95d(0x215)]();}else return _0x2ca95d(0x477)==='imTlE'?this[_0x2ca95d(0x1c4)](0x1):VisuMZ[_0x2ca95d(0x3f3)]['Game_CharacterBase_direction'][_0x2ca95d(0x29e)](this);}}},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x2f8)]=Game_CharacterBase['prototype'][_0x2ee1ea(0x1c4)],Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x1c4)]=function(_0x170019){const _0x48e2f6=_0x2ee1ea;if(!this[_0x48e2f6(0x61a)]())_0x170019=this[_0x48e2f6(0x5df)](_0x170019);VisuMZ[_0x48e2f6(0x3f3)][_0x48e2f6(0x2f8)][_0x48e2f6(0x29e)](this,_0x170019);},Game_CharacterBase['prototype'][_0x2ee1ea(0x5df)]=function(_0x37c700){const _0x3f81e8=_0x2ee1ea;if(_0x37c700===0x1)return this[_0x3f81e8(0x5e8)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x37c700===0x3)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x37c700===0x7)return this[_0x3f81e8(0x5e8)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x37c700===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x37c700;},Game_CharacterBase['prototype']['isDiagonalDirection']=function(_0x2be0a2){const _0x45dffc=_0x2ee1ea;return[0x1,0x3,0x5,0x7,0x9][_0x45dffc(0x43c)](_0x2be0a2);},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x4bc)]=function(){return this['_lastMovedDirection']||0x0;},VisuMZ[_0x2ee1ea(0x3f3)]['Game_CharacterBase_moveStraight']=Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x37c)],Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x37c)]=function(_0x3967ac){const _0x51755f=_0x2ee1ea;this[_0x51755f(0x214)]=_0x3967ac,VisuMZ['EventsMoveCore'][_0x51755f(0x36b)][_0x51755f(0x29e)](this,_0x3967ac);},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x1cd)]=function(_0x48215b){const _0x21b246=_0x2ee1ea;if(!this[_0x21b246(0x464)](_0x48215b))return this['moveStraight'](_0x48215b);let _0x1365ae=0x0,_0x58417a=0x0;switch(_0x48215b){case 0x1:_0x1365ae=0x4,_0x58417a=0x2;break;case 0x3:_0x1365ae=0x6,_0x58417a=0x2;break;case 0x7:_0x1365ae=0x4,_0x58417a=0x8;break;case 0x9:_0x1365ae=0x6,_0x58417a=0x8;break;}if(VisuMZ[_0x21b246(0x3f3)][_0x21b246(0x44c)][_0x21b246(0x238)][_0x21b246(0x46c)]){if(!this[_0x21b246(0x5e8)](this['_x'],this['_y'],_0x1365ae))return this[_0x21b246(0x37c)](_0x58417a);if(!this['canPass'](this['_x'],this['_y'],_0x58417a))return this[_0x21b246(0x37c)](_0x1365ae);if(!this[_0x21b246(0x2b7)](this['_x'],this['_y'],_0x1365ae,_0x58417a)){if(_0x21b246(0x6b4)!=='lESbr'){const _0x3014a4=_0x19be73[_0x21b246(0x1f5)](_0x61149b(_0x179417['$1']));return this[_0x21b246(0x3ab)](_0x3014a4);}else{let _0x2d8760=VisuMZ[_0x21b246(0x3f3)][_0x21b246(0x44c)][_0x21b246(0x238)][_0x21b246(0x555)]?_0x1365ae:_0x58417a;return this[_0x21b246(0x37c)](_0x2d8760);}}}this[_0x21b246(0x214)]=_0x48215b,this['moveDiagonally'](_0x1365ae,_0x58417a);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x2ba)]=Game_CharacterBase['prototype'][_0x2ee1ea(0x5a9)],Game_CharacterBase[_0x2ee1ea(0x532)]['realMoveSpeed']=function(){const _0x49a521=_0x2ee1ea;let _0x5a8e23=this[_0x49a521(0x391)];return this[_0x49a521(0x4b9)]()&&(_0x5a8e23+=this[_0x49a521(0x419)]()),this[_0x49a521(0x574)](_0x5a8e23);},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x419)]=function(){const _0x4aa16e=_0x2ee1ea,_0x5a83f4=VisuMZ[_0x4aa16e(0x3f3)][_0x4aa16e(0x44c)]['Movement'];if(_0x5a83f4[_0x4aa16e(0x5bc)]!==undefined){if(_0x4aa16e(0x583)!=='KhwIx'){const _0x2cd58c=_0x2cbb07[_0x4aa16e(0x235)](this[_0x4aa16e(0x18d)]());this[_0x4aa16e(0x387)](_0x2cd58c);}else return _0x5a83f4[_0x4aa16e(0x5bc)];}else{if(_0x4aa16e(0x647)!=='bymTn')return VisuMZ[_0x4aa16e(0x3f3)][_0x4aa16e(0x2ba)][_0x4aa16e(0x29e)](this)-this[_0x4aa16e(0x391)];else{_0x1e7645=_0x2a80aa===_0x4aa16e(0x577)?0x5:_0x3c265a;const _0x1fb3f9=this[_0x4aa16e(0x2c5)](_0xb70ff0,_0x1931e6),_0x58f745=this['roundYWithDirection'](_0x4a35c3,_0x44ef4c),_0x7a59ad=this[_0x4aa16e(0x2a9)](_0x1fb3f9,_0x58f745),_0x3faf43=this[_0x4aa16e(0x690)];if(_0x3faf43['VehicleDock'][_0x4aa16e(0x43c)](_0x7a59ad))return!![];else{const _0x10c319='%1Dock'[_0x4aa16e(0x41e)](_0x2c33ec[_0x4aa16e(0x519)](0x0)[_0x4aa16e(0x269)]()+_0x14d4c5[_0x4aa16e(0x1c9)](0x1));if(_0x3faf43[_0x10c319])return _0x3faf43[_0x10c319][_0x4aa16e(0x43c)](_0x7a59ad);}return![];}}},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x574)]=function(_0x2ee44e){const _0x598805=_0x2ee1ea,_0x1a0991=VisuMZ[_0x598805(0x3f3)][_0x598805(0x44c)]['Movement'];if(!_0x1a0991[_0x598805(0x2f7)])return _0x2ee44e;return[0x1,0x3,0x7,0x9][_0x598805(0x43c)](this[_0x598805(0x214)])&&(_0x2ee44e*=_0x1a0991['DiagonalSpeedMultiplier']||0.01),_0x2ee44e;},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x5fb)]=Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x4b9)],Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x4b9)]=function(){const _0x4c06c8=_0x2ee1ea;if(this[_0x4c06c8(0x3ba)])return!![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_isDashing'][_0x4c06c8(0x29e)](this);},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x64f)]=function(){const _0x57f860=_0x2ee1ea;return this[_0x57f860(0x4b9)]()&&this[_0x57f860(0x5d1)]===0x0;},VisuMZ[_0x2ee1ea(0x3f3)]['Game_CharacterBase_pattern']=Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x273)],Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x273)]=function(){const _0x179aa2=_0x2ee1ea;if(this[_0x179aa2(0x3c5)]())return _0x179aa2(0x530)!==_0x179aa2(0x530)?!!this[_0x179aa2(0x528)]:this[_0x179aa2(0x65f)]();else{if(_0x179aa2(0x27f)===_0x179aa2(0x462))this[_0x179aa2(0x3a6)]();else return VisuMZ[_0x179aa2(0x3f3)][_0x179aa2(0x62e)][_0x179aa2(0x29e)](this);}},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x5f9)]=Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x286)],Game_CharacterBase['prototype'][_0x2ee1ea(0x286)]=function(){const _0x52c9af=_0x2ee1ea;VisuMZ[_0x52c9af(0x3f3)][_0x52c9af(0x5f9)]['call'](this),this[_0x52c9af(0x233)]();},VisuMZ[_0x2ee1ea(0x3f3)]['Game_CharacterBase_characterIndex']=Game_CharacterBase[_0x2ee1ea(0x532)]['characterIndex'],Game_CharacterBase['prototype'][_0x2ee1ea(0x359)]=function(){const _0x2276e9=_0x2ee1ea;if(this[_0x2276e9(0x61a)]())return this[_0x2276e9(0x641)]();return VisuMZ[_0x2276e9(0x3f3)]['Game_CharacterBase_characterIndex'][_0x2276e9(0x29e)](this);},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x641)]=function(){const _0x2c8a3d=_0x2ee1ea,_0x51215c=this[_0x2c8a3d(0x632)]();if(this[_0x2c8a3d(0x59b)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x51215c))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x51215c))return 0x5;}else{if(this['isOnLadder']())return 0x6;else{if(this[_0x2c8a3d(0x3c5)]())return this[_0x2c8a3d(0x6a6)]();else{if(this['_forceCarrying']){if([0x2,0x4,0x6,0x8][_0x2c8a3d(0x43c)](_0x51215c))return 0x4;if([0x1,0x3,0x7,0x9][_0x2c8a3d(0x43c)](_0x51215c))return 0x5;}else{if(this[_0x2c8a3d(0x594)]()&&this[_0x2c8a3d(0x548)]()){if([0x2,0x4,0x6,0x8]['includes'](_0x51215c))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x51215c))return 0x5;}else{if(this[_0x2c8a3d(0x64f)]()){if(_0x2c8a3d(0x250)!==_0x2c8a3d(0x250)){let _0x1f415d=this[_0x2c8a3d(0x345)][_0x2c8a3d(0x632)]();if(this[_0x2c8a3d(0x345)][_0x2c8a3d(0x448)]){if(_0x1f415d===0x4)_0x1f415d=0x6;else _0x1f415d===0x6&&(_0x1f415d=0x4);}return(_0x1f415d-0x2)/0x2;}else{if([0x2,0x4,0x6,0x8][_0x2c8a3d(0x43c)](_0x51215c))return 0x2;if([0x1,0x3,0x7,0x9][_0x2c8a3d(0x43c)](_0x51215c))return 0x3;}}else{if(_0x2c8a3d(0x451)===_0x2c8a3d(0x451)){if([0x2,0x4,0x6,0x8][_0x2c8a3d(0x43c)](_0x51215c))return 0x0;if([0x1,0x3,0x7,0x9][_0x2c8a3d(0x43c)](_0x51215c))return 0x1;}else this['updateShadowChanges']();}}}}}}},Game_CharacterBase['prototype'][_0x2ee1ea(0x548)]=function(){const _0x4df41e=_0x2ee1ea;return VisuMZ['EventsMoveCore'][_0x4df41e(0x44c)]['VS8']['CarryPose'];},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x5d7)]=function(){const _0x115f12=_0x2ee1ea;return this[_0x115f12(0x1a6)]()&&this[_0x115f12(0x5ee)]()===VisuMZ[_0x115f12(0x3f3)][_0x115f12(0x44c)][_0x115f12(0x34a)][_0x115f12(0x19a)];},Game_CharacterBase['prototype'][_0x2ee1ea(0x3e3)]=function(){const _0x15dd45=_0x2ee1ea;return this[_0x15dd45(0x5d7)]()?0x4:0x2;},VisuMZ[_0x2ee1ea(0x3f3)]['Game_CharacterBase_update']=Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x40f)],Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x40f)]=function(){const _0x432ad9=_0x2ee1ea;VisuMZ[_0x432ad9(0x3f3)][_0x432ad9(0x2d6)][_0x432ad9(0x29e)](this),this['updatePose']();},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x347)]=function(){const _0x3a0d9b=_0x2ee1ea;this['_poseDuration']=this[_0x3a0d9b(0x679)]||0x0;if(this[_0x3a0d9b(0x679)]>0x0){if(_0x3a0d9b(0x5b1)===_0x3a0d9b(0x5b1)){this[_0x3a0d9b(0x679)]--;if(this['_poseDuration']<=0x0&&this[_0x3a0d9b(0x231)]!==_0x3a0d9b(0x37f))this[_0x3a0d9b(0x233)]();}else{const _0x4e48de=_0x3a0d9b(0x313)[_0x3a0d9b(0x41e)](_0x207d0f,_0x2ceaf1);_0x27ce41[_0x4e48de]&&(_0x213805[_0x4e48de]=_0x1c6ddb[_0x4e48de][_0x3a0d9b(0x1c9)](0x0));}}},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x2a8)]=Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x533)],Game_CharacterBase[_0x2ee1ea(0x532)]['moveDiagonally']=function(_0x1e7802,_0x587ccc){const _0x543a27=_0x2ee1ea;VisuMZ['EventsMoveCore'][_0x543a27(0x2a8)][_0x543a27(0x29e)](this,_0x1e7802,_0x587ccc);if(this[_0x543a27(0x61a)]())this[_0x543a27(0x3a2)](_0x1e7802,_0x587ccc);},Game_CharacterBase[_0x2ee1ea(0x532)]['setDiagonalDirection']=function(_0x3cb429,_0x1ea145){const _0x466aad=_0x2ee1ea;if(_0x3cb429===0x4&&_0x1ea145===0x2)this[_0x466aad(0x1c4)](0x1);if(_0x3cb429===0x6&&_0x1ea145===0x2)this[_0x466aad(0x1c4)](0x3);if(_0x3cb429===0x4&&_0x1ea145===0x8)this[_0x466aad(0x1c4)](0x7);if(_0x3cb429===0x6&&_0x1ea145===0x8)this[_0x466aad(0x1c4)](0x9);},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x3d3)]=Game_CharacterBase[_0x2ee1ea(0x532)]['hasStepAnime'],Game_CharacterBase[_0x2ee1ea(0x532)]['hasStepAnime']=function(){const _0x243e30=_0x2ee1ea;if(this[_0x243e30(0x3c5)]()&&this[_0x243e30(0x36d)]()===_0x243e30(0x37f))return!![];return VisuMZ['EventsMoveCore'][_0x243e30(0x3d3)][_0x243e30(0x29e)](this);},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x3bc)]=function(_0x4f25a7,_0x52dce3){const _0x300be9=_0x2ee1ea;if(_0x4f25a7['match'](/Z/i))_0x4f25a7='ZZZ';if(_0x4f25a7[_0x300be9(0x640)](/SLEEP/i))_0x4f25a7=_0x300be9(0x37f);this[_0x300be9(0x61a)]()&&(this[_0x300be9(0x231)]=_0x4f25a7[_0x300be9(0x269)]()['trim'](),this[_0x300be9(0x679)]=_0x52dce3||Infinity);},Game_CharacterBase['prototype'][_0x2ee1ea(0x36d)]=function(){const _0xb57b22=_0x2ee1ea;if(this[_0xb57b22(0x61a)]()){if(_0xb57b22(0x3b4)===_0xb57b22(0x3b4))return(this[_0xb57b22(0x231)]||'')[_0xb57b22(0x269)]()[_0xb57b22(0x1db)]();else{if(this['isPreventSelfMovement']())return;_0x5ef0cb[_0xb57b22(0x3f3)][_0xb57b22(0x373)][_0xb57b22(0x29e)](this),this[_0xb57b22(0x2e5)]()&&_0x55f689['MoveAllSynchTargets'](this[_0xb57b22(0x25c)]);}}else return''[_0xb57b22(0x269)]()[_0xb57b22(0x1db)]();},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x32b)]=function(_0x2df5fd,_0xb868df){const _0xb09e9b=_0x2ee1ea;if(this[_0xb09e9b(0x61a)]()){const _0x1fd930=['','EXCLAMATION',_0xb09e9b(0x5c8),'MUSIC\x20NOTE',_0xb09e9b(0x34d),_0xb09e9b(0x57b),_0xb09e9b(0x1cf),_0xb09e9b(0x482),_0xb09e9b(0x256),_0xb09e9b(0x3f7),_0xb09e9b(0x37f),'','','','',''][_0x2df5fd];this[_0xb09e9b(0x3bc)](_0x1fd930,_0xb868df);}},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x233)]=function(){const _0x398661=_0x2ee1ea;this['_pose']='',this[_0x398661(0x679)]=0x0;},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x3c5)]=function(){return this['isSpriteVS8dir']()&&!!this['_pose'];},Game_CharacterBase['prototype'][_0x2ee1ea(0x6a6)]=function(){const _0x33e156=_0x2ee1ea,_0x4b2d59=this[_0x33e156(0x231)]['toUpperCase']();switch(this[_0x33e156(0x231)][_0x33e156(0x269)]()[_0x33e156(0x1db)]()){case _0x33e156(0x2ab):case _0x33e156(0x54e):case'VICTORY':case _0x33e156(0x209):case'KNEEL':case _0x33e156(0x2ea):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x2ee1ea(0x532)]['getPosingCharacterDirection']=function(){const _0x22ef51=_0x2ee1ea;switch(this['_pose'][_0x22ef51(0x269)]()){case _0x22ef51(0x566):case _0x22ef51(0x5c8):case _0x22ef51(0x53f):case'!':case'?':return 0x2;break;case _0x22ef51(0x34d):case _0x22ef51(0x57b):case _0x22ef51(0x1cf):return 0x4;break;case _0x22ef51(0x2ab):case _0x22ef51(0x54e):case _0x22ef51(0x262):case _0x22ef51(0x482):case _0x22ef51(0x256):case _0x22ef51(0x3f7):return 0x6;break;case'HURT':case _0x22ef51(0x36c):case _0x22ef51(0x2ea):case _0x22ef51(0x37f):case'SLEEP':return 0x8;break;default:return VisuMZ[_0x22ef51(0x3f3)][_0x22ef51(0x2f8)][_0x22ef51(0x29e)](this);break;}},Game_CharacterBase['prototype']['getPosingCharacterPattern']=function(){const _0x10f2f1=_0x2ee1ea;switch(this[_0x10f2f1(0x231)][_0x10f2f1(0x269)]()){case _0x10f2f1(0x2ab):case _0x10f2f1(0x209):case _0x10f2f1(0x566):case'!':case _0x10f2f1(0x34d):case'COBWEB':return 0x0;break;case _0x10f2f1(0x54e):case _0x10f2f1(0x36c):case _0x10f2f1(0x5c8):case'?':case _0x10f2f1(0x57b):case _0x10f2f1(0x256):return 0x1;break;case _0x10f2f1(0x262):case _0x10f2f1(0x2ea):case _0x10f2f1(0x53f):case _0x10f2f1(0x1cf):case _0x10f2f1(0x3f7):return 0x2;break;default:return VisuMZ[_0x10f2f1(0x3f3)]['Game_CharacterBase_pattern']['call'](this);break;}},Game_CharacterBase[_0x2ee1ea(0x532)]['forceCarrying']=function(){const _0x20dd29=_0x2ee1ea;this[_0x20dd29(0x272)]=!![];},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x3e5)]=function(){const _0x41af75=_0x2ee1ea;this[_0x41af75(0x272)]=![];},Game_CharacterBase[_0x2ee1ea(0x532)]['forceDashing']=function(){const _0x3784a2=_0x2ee1ea;this[_0x3784a2(0x3ba)]=!![];},Game_CharacterBase[_0x2ee1ea(0x532)]['clearDashing']=function(){const _0x250e5a=_0x2ee1ea;this[_0x250e5a(0x3ba)]=![];},Game_CharacterBase['prototype'][_0x2ee1ea(0x667)]=function(){const _0x310ca3=_0x2ee1ea;if(this[_0x310ca3(0x181)]())return![];if(this[_0x310ca3(0x5e7)])return![];if(this[_0x310ca3(0x471)]==='')return![];if(this['constructor']===Game_Vehicle)return![];if(this[_0x310ca3(0x202)]())return![];return!![];},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x2d5)]=function(){const _0xfcb214=_0x2ee1ea;if(this['isOnLadder']())return!![];if(this[_0xfcb214(0x3db)]===Game_Player&&this[_0xfcb214(0x2dd)]())return!![];return![];},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x289)]=function(){const _0xcef7dd=_0x2ee1ea;return VisuMZ[_0xcef7dd(0x3f3)]['Settings'][_0xcef7dd(0x238)][_0xcef7dd(0x6ab)];},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x413)]=function(){const _0x21408f=_0x2ee1ea;return this[_0x21408f(0x2b5)]();},Game_CharacterBase['prototype'][_0x2ee1ea(0x474)]=function(){const _0x64b4a3=_0x2ee1ea,_0x1bb80e=$gameMap['tileHeight']();return Math[_0x64b4a3(0x4b5)](this[_0x64b4a3(0x5be)]()*_0x1bb80e+_0x1bb80e);},Game_Character['prototype']['findDiagonalDirectionTo']=function(_0x113ad5,_0xc8ae22){const _0x3e5af7=_0x2ee1ea,_0x39e2b9=this[_0x3e5af7(0x590)](),_0x4d6f31=$gameMap['width'](),_0x444ea7=[],_0x46ed60=[],_0x39268c=[],_0x14279f={};let _0x38e4f9=_0x14279f;if(this['x']===_0x113ad5&&this['y']===_0xc8ae22)return 0x0;_0x14279f[_0x3e5af7(0x3d8)]=null,_0x14279f['x']=this['x'],_0x14279f['y']=this['y'],_0x14279f['g']=0x0,_0x14279f['f']=$gameMap['distance'](_0x14279f['x'],_0x14279f['y'],_0x113ad5,_0xc8ae22),_0x444ea7[_0x3e5af7(0x605)](_0x14279f),_0x46ed60[_0x3e5af7(0x605)](_0x14279f['y']*_0x4d6f31+_0x14279f['x']);while(_0x444ea7[_0x3e5af7(0x5e6)]>0x0){let _0x110373=0x0;for(let _0x108e4b=0x0;_0x108e4b<_0x444ea7['length'];_0x108e4b++){if(_0x444ea7[_0x108e4b]['f']<_0x444ea7[_0x110373]['f']){if(_0x3e5af7(0x476)!==_0x3e5af7(0x3df))_0x110373=_0x108e4b;else{const _0x7e93f7=_0x43533b(_0x41756f['$1'])[_0x3e5af7(0x1ff)]()[_0x3e5af7(0x1db)](),_0x2cdcab=_0x1abca6(_0x40d240['$2']);this[_0x3e5af7(0x408)][_0x7e93f7]=_0x2cdcab;}}}const _0x44908e=_0x444ea7[_0x110373],_0x49ef8b=_0x44908e['x'],_0x4c7733=_0x44908e['y'],_0x965fea=_0x4c7733*_0x4d6f31+_0x49ef8b,_0x58b6c5=_0x44908e['g'];_0x444ea7[_0x3e5af7(0x656)](_0x110373,0x1),_0x46ed60[_0x3e5af7(0x656)](_0x46ed60['indexOf'](_0x965fea),0x1),_0x39268c[_0x3e5af7(0x605)](_0x965fea);if(_0x44908e['x']===_0x113ad5&&_0x44908e['y']===_0xc8ae22){_0x38e4f9=_0x44908e;break;}if(_0x58b6c5>=_0x39e2b9)continue;const _0x557b84=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x21b76b=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x59d453=0x1;_0x59d453<0xa;_0x59d453++){if('LkdiM'!==_0x3e5af7(0x570)){if(this['getEventIconIndex']()>0x0)return![];if(this['_character']){if(this[_0x3e5af7(0x345)]['attachPictureFilename']()!=='')return![];}return this[_0x3e5af7(0x3e7)]()||this[_0x3e5af7(0x345)]&&this[_0x3e5af7(0x345)][_0x3e5af7(0x202)]();}else{if(_0x59d453===0x5)continue;const _0x54f388=_0x59d453,_0x205c4e=_0x557b84[_0x59d453],_0x2fb6e9=_0x21b76b[_0x59d453],_0x1d3dc2=$gameMap[_0x3e5af7(0x2c5)](_0x49ef8b,_0x54f388),_0x1d4c29=$gameMap[_0x3e5af7(0x5b3)](_0x4c7733,_0x54f388),_0x3bda52=_0x1d4c29*_0x4d6f31+_0x1d3dc2;if(_0x39268c[_0x3e5af7(0x43c)](_0x3bda52))continue;if(this[_0x3e5af7(0x3db)]===Game_Player&&VisuMZ[_0x3e5af7(0x3f3)][_0x3e5af7(0x44c)][_0x3e5af7(0x238)][_0x3e5af7(0x46c)]){if(!this[_0x3e5af7(0x5e8)](_0x49ef8b,_0x4c7733,_0x205c4e))continue;if(!this[_0x3e5af7(0x5e8)](_0x49ef8b,_0x4c7733,_0x2fb6e9))continue;}if(!this[_0x3e5af7(0x2b7)](_0x49ef8b,_0x4c7733,_0x205c4e,_0x2fb6e9))continue;const _0x36c434=_0x58b6c5+0x1,_0x392645=_0x46ed60['indexOf'](_0x3bda52);if(_0x392645<0x0||_0x36c434<_0x444ea7[_0x392645]['g']){if('CoJeF'!==_0x3e5af7(0x3d5)){let _0x2d41e6={};if(_0x392645>=0x0){if(_0x3e5af7(0x281)===_0x3e5af7(0x281))_0x2d41e6=_0x444ea7[_0x392645];else return _0x1a5a77['EventsMoveCore'][_0x3e5af7(0x2c7)][_0x3e5af7(0x29e)](this,_0x19a2cc,_0x2fd3ea,_0x901685);}else _0x3e5af7(0x4dc)!==_0x3e5af7(0x4dc)?this[_0x3e5af7(0x248)]+=this[_0x3e5af7(0x1d2)]():(_0x444ea7[_0x3e5af7(0x605)](_0x2d41e6),_0x46ed60[_0x3e5af7(0x605)](_0x3bda52));_0x2d41e6[_0x3e5af7(0x3d8)]=_0x44908e,_0x2d41e6['x']=_0x1d3dc2,_0x2d41e6['y']=_0x1d4c29,_0x2d41e6['g']=_0x36c434,_0x2d41e6['f']=_0x36c434+$gameMap[_0x3e5af7(0x2d1)](_0x1d3dc2,_0x1d4c29,_0x113ad5,_0xc8ae22);if(!_0x38e4f9||_0x2d41e6['f']-_0x2d41e6['g']<_0x38e4f9['f']-_0x38e4f9['g']){if(_0x3e5af7(0x689)==='UreTW')return _0x5a5cc7[_0x3e5af7(0x5bc)];else _0x38e4f9=_0x2d41e6;}}else{if(_0x39be61[_0x3e5af7(0x49b)][_0x429cb4][_0x3e5af7(0x640)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x1b8bc2['AdvancedVariables'][_0x3e5af7(0x605)](_0x1d26fa);if(_0x95f40e['variables'][_0x4f0be2][_0x3e5af7(0x640)](/<SELF>/i))_0xa0fe24['SelfVariables']['push'](_0x4f2b33);if(_0x1b1a43[_0x3e5af7(0x49b)][_0x45b068][_0x3e5af7(0x640)](/<MAP>/i))_0x348b3a[_0x3e5af7(0x697)]['push'](_0x58aaaa);}}}}}let _0x58ead6=_0x38e4f9;while(_0x58ead6[_0x3e5af7(0x3d8)]&&_0x58ead6[_0x3e5af7(0x3d8)]!==_0x14279f){_0x58ead6=_0x58ead6[_0x3e5af7(0x3d8)];}const _0xe944d4=$gameMap[_0x3e5af7(0x525)](_0x58ead6['x'],_0x14279f['x']),_0x249f67=$gameMap[_0x3e5af7(0x628)](_0x58ead6['y'],_0x14279f['y']);if(_0xe944d4<0x0&&_0x249f67>0x0)return 0x1;if(_0xe944d4>0x0&&_0x249f67>0x0)return 0x3;if(_0xe944d4<0x0&&_0x249f67<0x0)return 0x7;if(_0xe944d4>0x0&&_0x249f67<0x0)return 0x9;if(_0x249f67>0x0)return 0x2;if(_0xe944d4<0x0)return 0x4;if(_0xe944d4>0x0)return 0x6;if(_0x249f67<0x0)return 0x8;const _0x2962b8=this[_0x3e5af7(0x66a)](_0x113ad5),_0x5961ac=this[_0x3e5af7(0x1bf)](_0xc8ae22);if(Math[_0x3e5af7(0x3c0)](_0x2962b8)>Math[_0x3e5af7(0x3c0)](_0x5961ac))return _0x2962b8>0x0?0x4:0x6;else{if(_0x5961ac!==0x0){if(_0x3e5af7(0x1ef)!=='cJcqL'){if(!_0x57a1a4[_0x3e5af7(0x532)][_0x3e5af7(0x5e8)][_0x3e5af7(0x29e)](this,_0x59cc5c+_0x171101,_0x57e752+_0x244498,_0x1cbfb5))return![];}else return _0x5961ac>0x0?0x8:0x2;}}return 0x0;},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x2c7)]=Game_CharacterBase[_0x2ee1ea(0x532)]['canPass'],Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x5e8)]=function(_0x147b9f,_0x139490,_0x5a464d){const _0x5b4840=_0x2ee1ea;if(this[_0x5b4840(0x4d7)]==='airship'){if(_0x5b4840(0x3e8)!==_0x5b4840(0x369))return this[_0x5b4840(0x46d)]()[_0x5b4840(0x48b)](_0x147b9f,_0x139490,_0x5a464d);else{if(this[_0x5b4840(0x411)])return![];return this[_0x5b4840(0x345)][_0x5b4840(0x64f)]()&&!this[_0x5b4840(0x345)][_0x5b4840(0x1a6)]()&&!this[_0x5b4840(0x345)]['isPosing']()&&this['getEventIconIndex']()===0x0;}}else return VisuMZ[_0x5b4840(0x3f3)][_0x5b4840(0x2c7)][_0x5b4840(0x29e)](this,_0x147b9f,_0x139490,_0x5a464d);},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x3bd)]=function(){const _0x3db759=_0x2ee1ea;this['_spriteOffsetX']=0x0,this[_0x3db759(0x26d)]=0x0;},VisuMZ[_0x2ee1ea(0x3f3)]['Game_CharacterBase_screenX']=Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x2b5)],Game_CharacterBase[_0x2ee1ea(0x532)]['screenX']=function(){const _0x5cc8cc=_0x2ee1ea;return VisuMZ[_0x5cc8cc(0x3f3)][_0x5cc8cc(0x2f9)]['call'](this)+(this[_0x5cc8cc(0x509)]||0x0);},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x479)]=Game_CharacterBase['prototype'][_0x2ee1ea(0x46a)],Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x46a)]=function(){const _0x1db561=_0x2ee1ea;return VisuMZ[_0x1db561(0x3f3)]['Game_CharacterBase_screenY'][_0x1db561(0x29e)](this)+(this[_0x1db561(0x26d)]||0x0);},Game_CharacterBase['DEFAULT_SHIFT_Y']=VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x44c)]['Movement'][_0x2ee1ea(0x42f)]??-0x6,Game_CharacterBase['prototype'][_0x2ee1ea(0x645)]=function(){const _0x90a67a=_0x2ee1ea;return this[_0x90a67a(0x48a)]()?0x0:-Game_CharacterBase[_0x90a67a(0x19d)];},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x1e9)]=function(){this['_stepPattern']='';},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x56b)]=Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x441)],Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x441)]=function(){const _0x270334=_0x2ee1ea;if(this[_0x270334(0x692)])return;if(this[_0x270334(0x37d)]())return;VisuMZ['EventsMoveCore']['Game_CharacterBase_updatePattern']['call'](this);},Game_CharacterBase['prototype'][_0x2ee1ea(0x37d)]=function(){const _0x440906=_0x2ee1ea;if(!this[_0x440906(0x420)]()&&this[_0x440906(0x5d1)]>0x0)return![];switch(String(this[_0x440906(0x646)])[_0x440906(0x269)]()[_0x440906(0x1db)]()){case _0x440906(0x30d):this['_pattern']+=0x1;if(this['_pattern']>0x2)this[_0x440906(0x40c)](0x0);break;case _0x440906(0x3f2):this[_0x440906(0x3a3)]-=0x1;if(this[_0x440906(0x3a3)]<0x0)this[_0x440906(0x40c)](0x2);break;case _0x440906(0x649):case _0x440906(0x500):this[_0x440906(0x58d)]();break;case _0x440906(0x3c1):case _0x440906(0x268):case _0x440906(0x664):case'SPIN\x20ACW':this[_0x440906(0x30a)]();break;default:return![];}return!![];},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x503)]=function(){const _0x4acd73=_0x2ee1ea;return $gameSystem[_0x4acd73(0x503)](this);},Game_CharacterBase['prototype'][_0x2ee1ea(0x594)]=function(){const _0x57aa7b=_0x2ee1ea,_0x1f7ceb=this['getEventIconData']();if(!_0x1f7ceb)return![];return _0x1f7ceb[_0x57aa7b(0x331)]>0x0;},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x21d)]=function(){const _0x7b599f=_0x2ee1ea,_0x12c78e=this[_0x7b599f(0x632)]();return $gameMap[_0x7b599f(0x2c5)](this['x'],_0x12c78e);},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x19e)]=function(){const _0x1a626c=_0x2ee1ea,_0x49b355=this[_0x1a626c(0x632)]();return $gameMap[_0x1a626c(0x5b3)](this['y'],_0x49b355);},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x1a8)]=function(){const _0x5339a1=_0x2ee1ea,_0x27755a=this['reverseDir'](this[_0x5339a1(0x632)]());return $gameMap[_0x5339a1(0x2c5)](this['x'],_0x27755a);},Game_CharacterBase[_0x2ee1ea(0x532)]['backY']=function(){const _0x443273=_0x2ee1ea,_0x4456c8=this[_0x443273(0x406)](this[_0x443273(0x632)]());return $gameMap[_0x443273(0x5b3)](this['y'],_0x4456c8);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x389)]=Game_Character['prototype'][_0x2ee1ea(0x635)],Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x635)]=function(_0x2282b5){const _0x1a8b30=_0x2ee1ea;route=JsonEx[_0x1a8b30(0x1fa)](_0x2282b5),VisuMZ[_0x1a8b30(0x3f3)][_0x1a8b30(0x389)][_0x1a8b30(0x29e)](this,route);},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x57d)]=Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x1ae)],Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x1ae)]=function(_0xa9cb0d){const _0x345dea=_0x2ee1ea;route=JsonEx[_0x345dea(0x1fa)](_0xa9cb0d),VisuMZ[_0x345dea(0x3f3)]['Game_Character_forceMoveRoute'][_0x345dea(0x29e)](this,route);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x338)]=Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x4e7)],Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x4e7)]=function(_0x30b9d7){const _0x27eeeb=_0x2ee1ea,_0x129289=Game_Character,_0x744c3d=_0x30b9d7[_0x27eeeb(0x1f1)];if(_0x30b9d7[_0x27eeeb(0x1c6)]===_0x129289[_0x27eeeb(0x3b5)]){if('GeOLK'!==_0x27eeeb(0x35b)){const _0x3d9a4e=_0x439f11[_0x27eeeb(0x3f3)]['Settings'],_0x532086='Map%1-Event%2'['format'](_0x2db528[_0x27eeeb(0x611)],_0x32d226[_0x27eeeb(0x25c)]);return this[_0x27eeeb(0x30c)][_0x532086]=this[_0x27eeeb(0x30c)][_0x532086]||{'iconIndex':0x0,'bufferX':_0x3d9a4e[_0x27eeeb(0x195)]['BufferX'],'bufferY':_0x3d9a4e[_0x27eeeb(0x195)]['BufferY'],'blendMode':_0x3d9a4e['Icon'][_0x27eeeb(0x3ec)]},this[_0x27eeeb(0x30c)][_0x532086];}else{let _0x134c94=_0x30b9d7[_0x27eeeb(0x1f1)][0x0];_0x134c94=this[_0x27eeeb(0x602)](_0x134c94),_0x134c94=this[_0x27eeeb(0x366)](_0x134c94),this['processMoveCommandEventsMoveCore'](_0x30b9d7,_0x134c94);}}else _0x27eeeb(0x1a3)!==_0x27eeeb(0x1a3)?(this[_0x27eeeb(0x296)][_0x16a46b]=_0x9fa12[0x2]['match'](/VAR/i)?_0x26365a:!!_0x37e591,this[_0x27eeeb(0x2ca)]()):VisuMZ[_0x27eeeb(0x3f3)]['Game_Character_processMoveCommand']['call'](this,_0x30b9d7);},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x602)]=function(_0x17c1ae){const _0x358e17=_0x2ee1ea,_0x335aed=/\$gameVariables\.value\((\d+)\)/gi,_0x4d0107=/\\V\[(\d+)\]/gi;while(_0x17c1ae['match'](_0x335aed)){if(_0x358e17(0x316)!==_0x358e17(0x316)){const _0x628f87=_0x4682b4[_0x358e17(0x1f5)](_0xd3474c(_0x3ec82b['$1']));return this[_0x358e17(0x5a8)](_0x628f87);}else _0x17c1ae=_0x17c1ae[_0x358e17(0x3cc)](_0x335aed,(_0x379d0e,_0x438d5a)=>$gameVariables[_0x358e17(0x698)](parseInt(_0x438d5a)));}while(_0x17c1ae['match'](_0x4d0107)){_0x358e17(0x279)!==_0x358e17(0x261)?_0x17c1ae=_0x17c1ae[_0x358e17(0x3cc)](_0x4d0107,(_0x3bd757,_0x25edbc)=>$gameVariables[_0x358e17(0x698)](parseInt(_0x25edbc))):(_0x51d5ee[_0x358e17(0x3f3)]['Game_Player_increaseSteps']['call'](this),_0x39b430[_0x358e17(0x2b1)](0x0));}return _0x17c1ae;},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x366)]=function(_0x1edf01){const _0xefb194=_0x2ee1ea,_0x5181f6=/\\SELFVAR\[(\d+)\]/gi;while(_0x1edf01['match'](_0x5181f6)){if('zFGjS'!==_0xefb194(0x601))_0x1edf01=_0x1edf01[_0xefb194(0x3cc)](_0x5181f6,(_0x10958c,_0x23d960)=>getSelfVariableValue(this[_0xefb194(0x611)],this['_eventId'],parseInt(_0x23d960)));else{_0x2d1ced[_0xefb194(0x305)](this);const _0x10fee4=_0x35f37f[_0xefb194(0x3f3)]['Game_Enemy_meetsSwitchCondition'][_0xefb194(0x29e)](this,_0xd34b06);return _0x4c7771[_0xefb194(0x622)](),_0x10fee4;}}return _0x1edf01;},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x218)]=function(_0x3a36cd,_0x6a310c){const _0x49aea5=_0x2ee1ea;if(_0x6a310c['match'](/ANIMATION:[ ](\d+)/i)){if(_0x49aea5(0x1ed)===_0x49aea5(0x1ed))return this[_0x49aea5(0x5de)](Number(RegExp['$1']));else{if(_0x52bed1[_0x49aea5(0x4cd)]())return![];return _0x1736b1[_0x49aea5(0x33f)][_0x49aea5(0x43c)](_0x175105);}}if(_0x6a310c['match'](/BALLOON:[ ](.*)/i))return this[_0x49aea5(0x355)](String(RegExp['$1']));if(_0x6a310c['match'](/FADE IN:[ ](\d+)/i))return this[_0x49aea5(0x28a)](Number(RegExp['$1']));if(_0x6a310c[_0x49aea5(0x640)](/FADE OUT:[ ](\d+)/i)){if('bVlUo'!=='bVlUo')this[_0x49aea5(0x214)]=_0x1404f1,_0x3186c7[_0x49aea5(0x3f3)][_0x49aea5(0x36b)][_0x49aea5(0x29e)](this,_0x3118b3);else return this[_0x49aea5(0x266)](Number(RegExp['$1']));}if(_0x6a310c[_0x49aea5(0x640)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return _0x49aea5(0x4d2)===_0x49aea5(0x208)?this[_0x49aea5(0x6b3)](_0x1c5f31):this[_0x49aea5(0x322)]();if(_0x6a310c[_0x49aea5(0x640)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i)){if(_0x49aea5(0x531)===_0x49aea5(0x531))return this[_0x49aea5(0x3e5)]();else{if(this[_0x49aea5(0x361)]===_0x582d71)this[_0x49aea5(0x360)]();return this['_moveOnlyRegions']['length']>0x0;}}if(_0x6a310c[_0x49aea5(0x640)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x49aea5(0x2aa)]();if(_0x6a310c[_0x49aea5(0x640)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i)){if(_0x49aea5(0x2d7)===_0x49aea5(0x3ad)){var _0x1e5745=this['x']-this[_0x49aea5(0x408)][_0x49aea5(0x4f3)],_0x1a0d16=this['x']+this[_0x49aea5(0x408)][_0x49aea5(0x600)],_0xae4821=this['y']-this['_addedHitbox']['up'],_0x298b07=this['y']+this[_0x49aea5(0x408)][_0x49aea5(0x442)];return _0x1e5745<=_0x37034c&&_0x59e6b8<=_0x1a0d16&&_0xae4821<=_0xf766de&&_0x4e2549<=_0x298b07;}else return this['clearDashing']();}if(_0x6a310c[_0x49aea5(0x640)](/HUG:[ ]LEFT/i)){if(_0x49aea5(0x2bc)!==_0x49aea5(0x1f7))return this[_0x49aea5(0x49a)](_0x49aea5(0x4f3));else{if(_0x53c72c)_0x4678e3[_0x49aea5(0x5b8)](![]);}}if(_0x6a310c[_0x49aea5(0x640)](/HUG:[ ]RIGHT/i))return this[_0x49aea5(0x49a)](_0x49aea5(0x600));if(_0x6a310c[_0x49aea5(0x640)](/INDEX:[ ](\d+)/i))return this[_0x49aea5(0x320)](Number(RegExp['$1']));if(_0x6a310c[_0x49aea5(0x640)](/INDEX:[ ]([\+\-]\d+)/i)){if('UAAAO'!=='UAAAO')_0xac2a45[_0x49aea5(0x28e)](this);else{const _0xc270c0=this['_characterIndex']+Number(RegExp['$1']);return this[_0x49aea5(0x320)](_0xc270c0);}}if(_0x6a310c[_0x49aea5(0x640)](/JUMP FORWARD:[ ](\d+)/i)){if('IQgGs'!==_0x49aea5(0x513)){let _0x43a3c0=_0x40982b['getControlledFollowerID']();if(_0x43a3c0>0x0)return _0x199c3c[_0x49aea5(0x300)]()['follower'](_0x43a3c0-0x1);}else return this[_0x49aea5(0x5e5)](Number(RegExp['$1']));}if(_0x6a310c['match'](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x49aea5(0x5da)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x6a310c[_0x49aea5(0x640)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x49ce56=$gameMap[_0x49aea5(0x1f5)](Number(RegExp['$1']));return this[_0x49aea5(0x393)](_0x49ce56);}if(_0x6a310c[_0x49aea5(0x640)](/JUMP TO PLAYER/i)){if(_0x49aea5(0x3ae)!==_0x49aea5(0x3ae))this[_0x49aea5(0x599)](_0x7e054c,_0x9dab97);else return this[_0x49aea5(0x393)]($gamePlayer);}if(_0x6a310c[_0x49aea5(0x640)](/JUMP TO HOME/i)&&this[_0x49aea5(0x639)]){const _0x19631c=this[_0x49aea5(0x5f4)],_0x18860e=this[_0x49aea5(0x1c8)];return this['processMoveRouteJumpTo'](_0x19631c,_0x18860e);}if(_0x6a310c[_0x49aea5(0x640)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x5b962b=String(RegExp['$1']),_0x5afc0b=this['checkCollisionKeywords'](_0x6a310c);return this[_0x49aea5(0x186)](_0x5b962b,_0x5afc0b);}if(_0x6a310c[_0x49aea5(0x640)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x49aea5(0x1d3)!=='PSxAn'){const _0x1a8cc1=Number(RegExp['$1']),_0xde04ce=Number(RegExp['$2']),_0x35a270=this['checkCollisionKeywords'](_0x6a310c);return this[_0x49aea5(0x5ef)](_0x1a8cc1,_0xde04ce,_0x35a270);}else{if(_0x32c88e)_0x52e1a1[_0x49aea5(0x427)]();_0x81aff4[_0x49aea5(0x3f3)][_0x49aea5(0x69d)][_0x49aea5(0x29e)](this);}}if(_0x6a310c[_0x49aea5(0x640)](/MOVE TO EVENT:[ ](\d+)/i)){if(_0x49aea5(0x323)!==_0x49aea5(0x323))return this[_0x49aea5(0x2cf)](_0x39dc9e,_0x525986);else{const _0x5f135f=$gameMap[_0x49aea5(0x1f5)](Number(RegExp['$1'])),_0x5d926c=this[_0x49aea5(0x2bf)](_0x6a310c);return this[_0x49aea5(0x556)](_0x5f135f,_0x5d926c);}}if(_0x6a310c['match'](/MOVE TO PLAYER/i)){if('Ycamy'===_0x49aea5(0x63a)){const _0x12b140=this[_0x49aea5(0x2bf)](_0x6a310c);return this[_0x49aea5(0x556)]($gamePlayer,_0x12b140);}else return _0x32751f>0x0?0x2:0x8;}if(_0x6a310c[_0x49aea5(0x640)](/MOVE TO HOME/i)&&this['eventId']){const _0x47bb1a=this[_0x49aea5(0x5f4)],_0x2d48ec=this[_0x49aea5(0x1c8)],_0x439467=this[_0x49aea5(0x2bf)](_0x6a310c);return this[_0x49aea5(0x5ef)](_0x47bb1a,_0x2d48ec,_0x439467);}if(_0x6a310c[_0x49aea5(0x640)](/MOVE LOWER LEFT:[ ](\d+)/i)){if(_0x49aea5(0x515)===_0x49aea5(0x515))return this[_0x49aea5(0x5b5)](0x1,Number(RegExp['$1']));else this[_0x49aea5(0x457)](...arguments);}if(_0x6a310c[_0x49aea5(0x640)](/MOVE DOWN:[ ](\d+)/i))return this[_0x49aea5(0x5b5)](0x2,Number(RegExp['$1']));if(_0x6a310c['match'](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x49aea5(0x5b5)](0x3,Number(RegExp['$1']));if(_0x6a310c['match'](/MOVE LEFT:[ ](\d+)/i)){if(_0x49aea5(0x4e6)===_0x49aea5(0x626)){if(this[_0x49aea5(0x38d)]===_0x15aab1)this['initEventsMoveCore']();const _0x1a3dc6=_0x49aea5(0x6a3)[_0x49aea5(0x41e)](_0x2ba69b,_0x3c9787);this['_SavedEventLocations'][_0x1a3dc6]={'direction':_0x205e3b,'x':_0x50d4eb['round'](_0xf70720),'y':_0x5e29cb['round'](_0x111541),'pageIndex':_0x3f5eb5,'moveRouteIndex':_0x2d707e};}else return this[_0x49aea5(0x5b5)](0x4,Number(RegExp['$1']));}if(_0x6a310c[_0x49aea5(0x640)](/MOVE RIGHT:[ ](\d+)/i))return this[_0x49aea5(0x5b5)](0x6,Number(RegExp['$1']));if(_0x6a310c[_0x49aea5(0x640)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x49aea5(0x5b5)](0x7,Number(RegExp['$1']));if(_0x6a310c['match'](/MOVE UP:[ ](\d+)/i)){if(_0x49aea5(0x3f0)==='UrTAG')return this['processMoveRouteMoveRepeat'](0x8,Number(RegExp['$1']));else this['contentsOpacity']-=this[_0x49aea5(0x1d2)]();}if(_0x6a310c[_0x49aea5(0x640)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x49aea5(0x5b5)](0x9,Number(RegExp['$1']));if(_0x6a310c[_0x49aea5(0x640)](/OPACITY:[ ](\d+)([%％])/i)){const _0x54ca41=Math['round'](Number(RegExp['$1'])/0x64*0xff);return this[_0x49aea5(0x496)](_0x54ca41[_0x49aea5(0x187)](0x0,0xff));}if(_0x6a310c[_0x49aea5(0x640)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x17139d=this['_opacity']+Math[_0x49aea5(0x650)](Number(RegExp['$1'])/0x64*0xff);return this[_0x49aea5(0x496)](_0x17139d[_0x49aea5(0x187)](0x0,0xff));}if(_0x6a310c['match'](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x4362d3=this[_0x49aea5(0x243)]+Number(RegExp['$1']);return this[_0x49aea5(0x496)](_0x4362d3['clamp'](0x0,0xff));}if(_0x6a310c['match'](/PATTERN LOCK:[ ](\d+)/i))return this[_0x49aea5(0x350)](Number(RegExp['$1']));if(_0x6a310c[_0x49aea5(0x640)](/PATTERN UNLOCK/i))return this[_0x49aea5(0x692)]=![];if(_0x6a310c[_0x49aea5(0x640)](/POSE:[ ](.*)/i)){if('IIXqD'!==_0x49aea5(0x67c))_0x40f30a['EventsMoveCore'][_0x49aea5(0x40d)]['call'](this,_0x3dfc8c,_0x25a7ed);else{const _0x332f33=String(RegExp['$1'])[_0x49aea5(0x269)]()[_0x49aea5(0x1db)]();return this['setPose'](_0x332f33);}}if(_0x6a310c[_0x49aea5(0x640)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x49aea5(0x2c8)!==_0x49aea5(0x2c8)){if(!this[_0x49aea5(0x345)])return;if(this[_0x49aea5(0x345)][_0x49aea5(0x455)]===_0x3f23aa)return;if(this[_0x49aea5(0x345)][_0x49aea5(0x455)]===![])return;this['z']=this[_0x49aea5(0x345)]['_customZ'],this['z']<0x0?this[_0x49aea5(0x4c5)]['z']=this['z']-0x1:this[_0x49aea5(0x4c5)]['z']=0x0;}else{const _0x2249fc=Number(RegExp['$1']),_0x565d3d=Number(RegExp['$2']);return this[_0x49aea5(0x65d)](_0x2249fc,_0x565d3d);}}if(_0x6a310c['match'](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x3cb033=$gameMap[_0x49aea5(0x1f5)](Number(RegExp['$1']));return this[_0x49aea5(0x1a2)](_0x3cb033);}if(_0x6a310c[_0x49aea5(0x640)](/STEP TOWARD PLAYER/i))return this[_0x49aea5(0x1a2)]($gamePlayer);if(_0x6a310c[_0x49aea5(0x640)](/STEP TOWARD HOME/i)&&this[_0x49aea5(0x639)]){const _0x29056d=this[_0x49aea5(0x5f4)],_0x59678e=this[_0x49aea5(0x1c8)];return this[_0x49aea5(0x65d)](_0x29056d,_0x59678e);}if(_0x6a310c[_0x49aea5(0x640)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('sbTDE'==='sbTDE')return this[_0x49aea5(0x3a4)](Number(RegExp['$1']),Number(RegExp['$2']));else{_0x536c17[_0x49aea5(0x247)]=_0x28e18d;const _0x37fa55=new _0x3ce0fe(_0x73d050['mapId'],_0x5185c4[_0x49aea5(0x639)]);_0x467441[_0x49aea5(0x247)]=_0x4bad90,this[_0x49aea5(0x65a)]['push'](_0x37fa55),_0x37fa55['setupSpawn'](_0x4f962b),this[_0x49aea5(0x427)]();}}if(_0x6a310c[_0x49aea5(0x640)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){if(_0x49aea5(0x514)!==_0x49aea5(0x53b)){const _0x565719=$gameMap[_0x49aea5(0x1f5)](Number(RegExp['$1']));return this[_0x49aea5(0x6b3)](_0x565719);}else{const _0x1eb32c=_0xf191d['GetMoveSynchTarget'](this['moveSynchTarget']());this[_0x49aea5(0x6b3)](_0x1eb32c);}}if(_0x6a310c[_0x49aea5(0x640)](/STEP AWAY FROM PLAYER/i)){if(_0x49aea5(0x2f5)===_0x49aea5(0x2f5))return this[_0x49aea5(0x6b3)]($gamePlayer);else this[_0x49aea5(0x55f)](_0x58aa54,_0x1f8c75);}if(_0x6a310c[_0x49aea5(0x640)](/STEP AWAY FROM HOME/i)&&this[_0x49aea5(0x639)]){const _0x4db550=this['_randomHomeX'],_0x21aa1d=this['_randomHomeY'];return this[_0x49aea5(0x3a4)](_0x4db550,_0x21aa1d);}if(_0x6a310c['match'](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x49aea5(0x59f)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x6a310c[_0x49aea5(0x640)](/TURN TO EVENT:[ ](\d+)/i)){const _0x54881c=$gameMap[_0x49aea5(0x1f5)](Number(RegExp['$1']));return this[_0x49aea5(0x5a8)](_0x54881c);}if(_0x6a310c[_0x49aea5(0x640)](/TURN TO PLAYER/i))return this[_0x49aea5(0x5a8)]($gamePlayer);if(_0x6a310c[_0x49aea5(0x640)](/TURN TO HOME/i)&&this[_0x49aea5(0x639)]){if(_0x49aea5(0x1e2)!==_0x49aea5(0x1e2)){const _0x5d3bd0=_0x2980[_0x49aea5(0x3f3)][_0x49aea5(0x44c)][_0x49aea5(0x238)];if(!_0x5d3bd0['SlowerSpeed'])return _0x4a33dd;return[0x1,0x3,0x7,0x9][_0x49aea5(0x43c)](this['_lastMovedDirection'])&&(_0x11d79d*=_0x5d3bd0[_0x49aea5(0x33e)]||0.01),_0x3e4828;}else{const _0x18b4ac=this[_0x49aea5(0x5f4)],_0x274b9b=this['_randomHomeY'];return this[_0x49aea5(0x4dd)](_0x18b4ac,_0x274b9b);}}if(_0x6a310c[_0x49aea5(0x640)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('gXJXf'===_0x49aea5(0x24e))return this[_0x49aea5(0x43e)](Number(RegExp['$1']),Number(RegExp['$2']));else this[_0x49aea5(0x48d)][_0x49aea5(0x4ff)]()!==this[_0x49aea5(0x5c5)]&&(this[_0x49aea5(0x5c5)]=this['_event'][_0x49aea5(0x4ff)](),this[_0x49aea5(0x38e)]());}if(_0x6a310c[_0x49aea5(0x640)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x129533=$gameMap['event'](Number(RegExp['$1']));return this[_0x49aea5(0x2ad)](_0x129533);}if(_0x6a310c[_0x49aea5(0x640)](/TURN AWAY FROM PLAYER/i)){if('oOImZ'===_0x49aea5(0x58f))_0x3606e9=0x6;else return this[_0x49aea5(0x2ad)]($gamePlayer);}if(_0x6a310c['match'](/TURN AWAY FROM HOME/i)&&this[_0x49aea5(0x639)]){const _0x3508c2=this[_0x49aea5(0x5f4)],_0x46df51=this[_0x49aea5(0x1c8)];return this['turnAwayFromPoint'](_0x3508c2,_0x46df51);}if(_0x6a310c[_0x49aea5(0x640)](/TURN LOWER LEFT/i))return this[_0x49aea5(0x1c4)](0x1);if(_0x6a310c[_0x49aea5(0x640)](/TURN LOWER RIGHT/i))return this[_0x49aea5(0x1c4)](0x3);if(_0x6a310c['match'](/TURN UPPER LEFT/i))return this[_0x49aea5(0x1c4)](0x7);if(_0x6a310c[_0x49aea5(0x640)](/TURN UPPER RIGHT/i))return this[_0x49aea5(0x1c4)](0x9);if(_0x6a310c[_0x49aea5(0x640)](/Self Switch[ ](.*):[ ](.*)/i)){if(_0x49aea5(0x1d6)!==_0x49aea5(0x1d6)){const _0x5b29f5=[_0x1137cf,_0x5d5460,'Self\x20Variable\x20%1'[_0x49aea5(0x41e)](_0x9aa7af)];_0x3222d[_0x49aea5(0x50f)](_0x5b29f5,_0x1a35cf);}else return this['processMoveRouteSelfSwitch'](RegExp['$1'],RegExp['$2']);}if(_0x6a310c[_0x49aea5(0x640)](/Self Variable[ ](.*):[ ](.*)/i))return this['processMoveRouteSelfVariable'](RegExp['$1'],RegExp['$2']);if(_0x6a310c[_0x49aea5(0x640)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x49aea5(0x2b3)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x6a310c[_0x49aea5(0x640)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x1d44e9=$gameMap[_0x49aea5(0x1f5)](Number(RegExp['$1']));return this[_0x49aea5(0x3ab)](_0x1d44e9);}if(_0x6a310c[_0x49aea5(0x640)](/TELEPORT TO PLAYER/i))return this[_0x49aea5(0x3ab)]($gamePlayer);if(_0x6a310c[_0x49aea5(0x640)](/TELEPORT TO HOME/i)&&this[_0x49aea5(0x639)]){if(_0x49aea5(0x658)!==_0x49aea5(0x4b8)){const _0x4e6b70=this[_0x49aea5(0x5f4)],_0x41c0ba=this[_0x49aea5(0x1c8)];return this[_0x49aea5(0x2b3)](_0x4e6b70,_0x41c0ba);}else return _0x334b9d;}try{VisuMZ[_0x49aea5(0x3f3)][_0x49aea5(0x338)][_0x49aea5(0x29e)](this,_0x3a36cd);}catch(_0x371411){if($gameTemp[_0x49aea5(0x415)]())console[_0x49aea5(0x1df)](_0x371411);}},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x5de)]=function(_0x10f3ed){const _0x416931=_0x2ee1ea;$gameTemp[_0x416931(0x1ce)]([this],_0x10f3ed);},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x355)]=function(_0x5b901c){const _0x5721cd=_0x2ee1ea;let _0x3dc8a9=0x0;switch(_0x5b901c[_0x5721cd(0x269)]()['trim']()){case'!':case'EXCLAMATION':_0x3dc8a9=0x1;break;case'?':case _0x5721cd(0x5c8):_0x3dc8a9=0x2;break;case _0x5721cd(0x31a):case _0x5721cd(0x61f):case _0x5721cd(0x53f):case'MUSIC-NOTE':case _0x5721cd(0x437):_0x3dc8a9=0x3;break;case'HEART':case _0x5721cd(0x390):_0x3dc8a9=0x4;break;case'ANGER':_0x3dc8a9=0x5;break;case _0x5721cd(0x1cf):_0x3dc8a9=0x6;break;case'COBWEB':case _0x5721cd(0x4c8):case _0x5721cd(0x192):_0x3dc8a9=0x7;break;case _0x5721cd(0x256):case _0x5721cd(0x196):_0x3dc8a9=0x8;break;case _0x5721cd(0x3d7):case _0x5721cd(0x3ef):case _0x5721cd(0x3f7):case _0x5721cd(0x35c):case _0x5721cd(0x572):_0x3dc8a9=0x9;break;case'Z':case'ZZ':case _0x5721cd(0x37f):case _0x5721cd(0x3c3):_0x3dc8a9=0xa;break;case _0x5721cd(0x3e6):_0x3dc8a9=0xb;break;case _0x5721cd(0x480):_0x3dc8a9=0xc;break;case _0x5721cd(0x1be):_0x3dc8a9=0xd;break;case _0x5721cd(0x1dc):_0x3dc8a9=0xe;break;case _0x5721cd(0x52a):_0x3dc8a9=0xf;break;}$gameTemp[_0x5721cd(0x3a9)](this,_0x3dc8a9);},Game_Character[_0x2ee1ea(0x532)]['processMoveRouteFadeIn']=function(_0x328fa4){const _0x5d684d=_0x2ee1ea;_0x328fa4+=this[_0x5d684d(0x243)],this['setOpacity'](_0x328fa4[_0x5d684d(0x187)](0x0,0xff));if(this[_0x5d684d(0x243)]<0xff)this[_0x5d684d(0x557)]--;},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x266)]=function(_0x3c1b98){const _0x435721=_0x2ee1ea;_0x3c1b98=this[_0x435721(0x243)]-_0x3c1b98,this[_0x435721(0x496)](_0x3c1b98[_0x435721(0x187)](0x0,0xff));if(this[_0x435721(0x243)]>0x0)this[_0x435721(0x557)]--;},Game_Character['prototype'][_0x2ee1ea(0x49a)]=function(_0x20fe94){const _0x6b0787=_0x2ee1ea,_0x56e538=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x2e7c57=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x4bc1d0=this[_0x6b0787(0x632)](),_0x2ab41c=(_0x20fe94===_0x6b0787(0x4f3)?_0x56e538:_0x2e7c57)[_0x4bc1d0],_0x45fd49=(_0x20fe94===_0x6b0787(0x4f3)?_0x2e7c57:_0x56e538)[_0x4bc1d0];if(this[_0x6b0787(0x5e8)](this['x'],this['y'],_0x2ab41c))_0x20fe94===_0x6b0787(0x4f3)?this[_0x6b0787(0x30a)]():this[_0x6b0787(0x58d)]();else!this[_0x6b0787(0x5e8)](this['x'],this['y'],this[_0x6b0787(0x632)]())&&(this[_0x6b0787(0x5e8)](this['x'],this['y'],_0x45fd49)?_0x6b0787(0x652)===_0x6b0787(0x1de)?(this[_0x6b0787(0x33c)](_0x2e63bf),this[_0x6b0787(0x427)](),_0x41a187[_0x6b0787(0x3f3)][_0x6b0787(0x42e)][_0x6b0787(0x29e)](this,_0x28094c),this['clearEventCache'](),this[_0x6b0787(0x67e)](),this[_0x6b0787(0x35a)](),this[_0x6b0787(0x21c)](),this['setupSpawnedEvents'](),this['setupPlayerVisibilityOverrides'](),this[_0x6b0787(0x1c7)](),this[_0x6b0787(0x427)]()):_0x20fe94===_0x6b0787(0x4f3)?this['turnRight90']():this[_0x6b0787(0x30a)]():this[_0x6b0787(0x63d)]());this[_0x6b0787(0x5e8)](this['x'],this['y'],this[_0x6b0787(0x632)]())&&this[_0x6b0787(0x416)]();},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x320)]=function(_0x2d24b0){const _0x52493c=_0x2ee1ea;if(ImageManager[_0x52493c(0x270)](this[_0x52493c(0x471)]))return;_0x2d24b0=_0x2d24b0[_0x52493c(0x187)](0x0,0x7),this[_0x52493c(0x1f3)](this['_characterName'],_0x2d24b0);},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x5e5)]=function(_0x2ef03e){const _0x374ac1=_0x2ee1ea;switch(this['direction']()){case 0x1:this[_0x374ac1(0x1b2)](-_0x2ef03e,_0x2ef03e);break;case 0x2:this['jump'](0x0,_0x2ef03e);break;case 0x3:this['jump'](_0x2ef03e,_0x2ef03e);break;case 0x4:this[_0x374ac1(0x1b2)](-_0x2ef03e,0x0);break;case 0x6:this[_0x374ac1(0x1b2)](_0x2ef03e,0x0);break;case 0x7:this[_0x374ac1(0x1b2)](-_0x2ef03e,-_0x2ef03e);break;case 0x8:this[_0x374ac1(0x1b2)](0x0,-_0x2ef03e);break;case 0x9:this['jump'](_0x2ef03e,-_0x2ef03e);break;}},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x5da)]=function(_0x1c88cf,_0x2b01fd){const _0x4622cb=_0x2ee1ea,_0x22ba0e=Math[_0x4622cb(0x650)](_0x1c88cf-this['x']),_0x5416df=Math[_0x4622cb(0x650)](_0x2b01fd-this['y']);this[_0x4622cb(0x1b2)](_0x22ba0e,_0x5416df);},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x393)]=function(_0x37a801){const _0xb42220=_0x2ee1ea;if(_0x37a801)this[_0xb42220(0x5da)](_0x37a801['x'],_0x37a801['y']);},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x65d)]=function(_0x18a0f1,_0x290dc3,_0x2e3b33){const _0x380b43=_0x2ee1ea;let _0x50d008=0x0;if(_0x2e3b33)$gameTemp[_0x380b43(0x64d)]=!![];if($gameMap[_0x380b43(0x26e)]()){if('oXBuc'===_0x380b43(0x4d0))_0x50d008=this[_0x380b43(0x5dc)](_0x18a0f1,_0x290dc3);else{const _0x48fb6a=[_0x1a7108[_0x380b43(0x611)],_0x180494[_0x380b43(0x25c)],_0x380b43(0x4db)[_0x380b43(0x41e)](_0x5cf772)];_0x4c76d9[_0x380b43(0x50f)](_0x48fb6a,_0x14b407);}}else _0x50d008=this[_0x380b43(0x5a4)](_0x18a0f1,_0x290dc3);if(_0x2e3b33)$gameTemp['_moveAllowPlayerCollision']=![];this['executeMoveDir8'](_0x50d008),this[_0x380b43(0x3e9)](!![]);},Game_Character['prototype'][_0x2ee1ea(0x1a2)]=function(_0x554166){const _0x3c17fe=_0x2ee1ea;if(_0x554166)this[_0x3c17fe(0x65d)](_0x554166['x'],_0x554166['y']);},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x1d4)]=function(_0xb35a46,_0x16d9b7){const _0x59641e=_0x2ee1ea,_0xf88be9=this['deltaXFrom'](_0xb35a46),_0x1ce13b=this[_0x59641e(0x1bf)](_0x16d9b7);},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x2bf)]=function(_0x541655){const _0x5efc41=_0x2ee1ea;if(_0x541655['match'](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x541655[_0x5efc41(0x640)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0x2ee1ea(0x3f3)]['Game_Event_isCollidedWithPlayerCharacters']=Game_Event[_0x2ee1ea(0x532)]['isCollidedWithPlayerCharacters'],Game_Event['prototype'][_0x2ee1ea(0x38c)]=function(_0xbe794a,_0x2ec59f){const _0x55e4c8=_0x2ee1ea;if($gameTemp[_0x55e4c8(0x64d)])return![];return VisuMZ[_0x55e4c8(0x3f3)][_0x55e4c8(0x5d4)][_0x55e4c8(0x29e)](this,_0xbe794a,_0x2ec59f);},Game_Character['prototype'][_0x2ee1ea(0x186)]=function(_0x12342d,_0x14fb84){const _0x273f5c=_0x2ee1ea,_0x1ffd68=['',_0x273f5c(0x189),_0x273f5c(0x57f),_0x273f5c(0x397),_0x273f5c(0x1cc),'','RIGHT',_0x273f5c(0x351),'UP',_0x273f5c(0x33d)],_0x56940f=_0x1ffd68['indexOf'](_0x12342d[_0x273f5c(0x269)]()['trim']());if(_0x56940f<=0x0)return;if(_0x14fb84)$gameTemp[_0x273f5c(0x64d)]=!![];if(this[_0x273f5c(0x5e8)](this['x'],this['y'],_0x56940f)){if(_0x273f5c(0x452)===_0x273f5c(0x1fd)){const _0x453cc4=this[_0x273f5c(0x632)]();return _0x1b1573['roundYWithDirection'](this['y'],_0x453cc4);}else{if(_0x14fb84)$gameTemp[_0x273f5c(0x64d)]=![];this[_0x273f5c(0x1cd)](_0x56940f),this[_0x273f5c(0x557)]-=0x1;}}if(_0x14fb84)$gameTemp[_0x273f5c(0x64d)]=![];},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x5ef)]=function(_0x208da2,_0xbbeeab,_0x4e3cdc){const _0x552b8a=_0x2ee1ea;this[_0x552b8a(0x65d)](_0x208da2,_0xbbeeab,_0x4e3cdc);if(this['x']!==_0x208da2||this['y']!==_0xbbeeab)this[_0x552b8a(0x557)]--;},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x556)]=function(_0x2028cc,_0x5787e7){if(_0x2028cc)this['processMoveRouteMoveTo'](_0x2028cc['x'],_0x2028cc['y'],_0x5787e7);},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x5b5)]=function(_0x72d671,_0x1c6e8a){const _0x1ee691=_0x2ee1ea;_0x1c6e8a=_0x1c6e8a||0x0;const _0x14f1f3={'code':0x1,'indent':null,'parameters':[]};_0x14f1f3[_0x1ee691(0x1c6)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x72d671],this[_0x1ee691(0x4c7)][_0x1ee691(0x4a4)][this['_moveRouteIndex']]['parameters'][0x0]='';while(_0x1c6e8a--){if('wNHxi'!==_0x1ee691(0x456))this[_0x1ee691(0x4c7)][_0x1ee691(0x4a4)][_0x1ee691(0x656)](this['_moveRouteIndex']+0x1,0x0,_0x14f1f3);else{if(_0x2197e9||this['isSpriteVS8dir']()){if(_0x3e6a8f>0x0&&_0xdaefb3<0x0)return 0x1;if(_0x3e5412<0x0&&_0x4aab54<0x0)return 0x3;if(_0x1f2289>0x0&&_0x669112>0x0)return 0x7;if(_0x63199d<0x0&&_0x2d7cae>0x0)return 0x9;}}}},Game_Character['prototype'][_0x2ee1ea(0x350)]=function(_0x494307){this['_patternLocked']=!![],this['setPattern'](_0x494307);},Game_Character[_0x2ee1ea(0x532)]['processMoveRouteSelfSwitch']=function(_0x442129,_0x5dc2a7){const _0x37f6c5=_0x2ee1ea;if(this===$gamePlayer)return;const _0x48bdfb=[this[_0x37f6c5(0x611)],this[_0x37f6c5(0x25c)],'A'];_0x442129[_0x37f6c5(0x640)](/\b[ABCD]\b/i)?_0x48bdfb[0x2]=String(_0x442129)[_0x37f6c5(0x519)](0x0)[_0x37f6c5(0x269)]()[_0x37f6c5(0x1db)]():_0x48bdfb[0x2]='Self\x20Switch\x20%1'[_0x37f6c5(0x41e)](_0x442129);switch(_0x5dc2a7[_0x37f6c5(0x269)]()[_0x37f6c5(0x1db)]()){case'ON':case _0x37f6c5(0x1e6):$gameSelfSwitches['setValue'](_0x48bdfb,!![]);break;case _0x37f6c5(0x68b):case _0x37f6c5(0x20e):$gameSelfSwitches[_0x37f6c5(0x50f)](_0x48bdfb,![]);break;case _0x37f6c5(0x53d):$gameSelfSwitches[_0x37f6c5(0x50f)](_0x48bdfb,!$gameSelfSwitches[_0x37f6c5(0x698)](_0x48bdfb));break;}},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x349)]=function(_0x25c511,_0x3788b4){const _0x40b86d=_0x2ee1ea;if(this===$gamePlayer)return;const _0x3debfe=[this[_0x40b86d(0x611)],this[_0x40b86d(0x25c)],'Self\x20Variable\x20%1'[_0x40b86d(0x41e)](_0x25c511)];$gameSelfSwitches['setValue'](_0x3debfe,Number(_0x3788b4));},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x2b3)]=function(_0x3d6c80,_0x390cc5){const _0x5be853=_0x2ee1ea;this[_0x5be853(0x4da)](_0x3d6c80,_0x390cc5);},Game_Character['prototype']['processMoveRouteTeleportToCharacter']=function(_0x4dbc48){const _0x10eeae=_0x2ee1ea;if(_0x4dbc48)this[_0x10eeae(0x2b3)](_0x4dbc48['x'],_0x4dbc48['y']);},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x58d)]=function(){const _0x4d0659=_0x2ee1ea;switch(this[_0x4d0659(0x632)]()){case 0x1:this[_0x4d0659(0x1c4)](0x7);break;case 0x2:this[_0x4d0659(0x1c4)](0x4);break;case 0x3:this[_0x4d0659(0x1c4)](0x1);break;case 0x4:this['setDirection'](0x8);break;case 0x6:this[_0x4d0659(0x1c4)](0x2);break;case 0x7:this[_0x4d0659(0x1c4)](0x9);break;case 0x8:this['setDirection'](0x6);break;case 0x9:this[_0x4d0659(0x1c4)](0x3);break;}},Game_Character['prototype']['turnLeft90']=function(){const _0x1027ba=_0x2ee1ea;switch(this[_0x1027ba(0x632)]()){case 0x1:this[_0x1027ba(0x1c4)](0x3);break;case 0x2:this[_0x1027ba(0x1c4)](0x6);break;case 0x3:this[_0x1027ba(0x1c4)](0x9);break;case 0x4:this[_0x1027ba(0x1c4)](0x2);break;case 0x6:this[_0x1027ba(0x1c4)](0x8);break;case 0x7:this['setDirection'](0x1);break;case 0x8:this[_0x1027ba(0x1c4)](0x4);break;case 0x9:this[_0x1027ba(0x1c4)](0x7);break;}},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x4a3)]=function(_0x193869,_0x13d846,_0x548cfa){const _0x56b328=_0x2ee1ea,_0x50b777=this[_0x56b328(0x66a)](_0x193869),_0x50d40b=this[_0x56b328(0x1bf)](_0x13d846);if($gameMap[_0x56b328(0x26e)]()){if(_0x548cfa||this['isSpriteVS8dir']()){if(_0x50b777>0x0&&_0x50d40b<0x0)return 0x1;if(_0x50b777<0x0&&_0x50d40b<0x0)return 0x3;if(_0x50b777>0x0&&_0x50d40b>0x0)return 0x7;if(_0x50b777<0x0&&_0x50d40b>0x0)return 0x9;}}if(Math[_0x56b328(0x3c0)](_0x50b777)>Math[_0x56b328(0x3c0)](_0x50d40b)){if(_0x56b328(0x522)===_0x56b328(0x4e2)){if(_0x502038)this[_0x56b328(0x65d)](_0x5bb923['x'],_0x570d92['y']);}else return _0x50b777>0x0?0x4:0x6;}else{if(_0x50d40b!==0x0)return _0x50d40b>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x2db)]=function(_0x1d5052,_0x2ba70f,_0x36418a){const _0x10ae74=_0x2ee1ea,_0x370738=this[_0x10ae74(0x66a)](_0x1d5052),_0x39b47f=this[_0x10ae74(0x1bf)](_0x2ba70f);if($gameMap[_0x10ae74(0x26e)]()){if(_0x36418a||this[_0x10ae74(0x61a)]()){if(_0x10ae74(0x23b)!==_0x10ae74(0x23b))this['autoEventIconBuffer'](_0x382810);else{if(_0x370738>0x0&&_0x39b47f<0x0)return 0x9;if(_0x370738<0x0&&_0x39b47f<0x0)return 0x7;if(_0x370738>0x0&&_0x39b47f>0x0)return 0x3;if(_0x370738<0x0&&_0x39b47f>0x0)return 0x1;}}}if(Math[_0x10ae74(0x3c0)](_0x370738)>Math[_0x10ae74(0x3c0)](_0x39b47f))return _0x370738>0x0?0x6:0x4;else{if(_0x39b47f!==0x0)return _0x39b47f>0x0?0x2:0x8;}return 0x0;},Game_Character['prototype'][_0x2ee1ea(0x59f)]=function(_0x4bc5a8,_0x3694bf){const _0x2a5c7a=_0x2ee1ea,_0x21fd67=this[_0x2a5c7a(0x4a3)](_0x4bc5a8,_0x3694bf,!![]);if(_0x21fd67)this[_0x2a5c7a(0x1cd)](_0x21fd67);},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x3a4)]=function(_0x20115c,_0x1e0c42){const _0x4b2e55=this['getDirectionFromPoint'](_0x20115c,_0x1e0c42,!![]);if(_0x4b2e55)this['executeMoveDir8'](_0x4b2e55);},Game_Character['prototype'][_0x2ee1ea(0x4dd)]=function(_0x2201a0,_0x25dc8c){const _0x36c55e=_0x2ee1ea,_0x4ae9d1=this[_0x36c55e(0x4a3)](_0x2201a0,_0x25dc8c,![]);if(_0x4ae9d1)this[_0x36c55e(0x1c4)](_0x4ae9d1);},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x43e)]=function(_0x1ba9fd,_0x55a44a){const _0x29d8ac=_0x2ee1ea,_0x3ca215=this[_0x29d8ac(0x2db)](_0x1ba9fd,_0x55a44a,![]);if(_0x3ca215)this[_0x29d8ac(0x1c4)](_0x3ca215);},Game_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x387)]=function(_0x3199ec){const _0xe33004=_0x2ee1ea;if(_0x3199ec)this[_0xe33004(0x59f)](_0x3199ec['x'],_0x3199ec['y']);},Game_Character[_0x2ee1ea(0x532)]['moveAwayFromCharacter']=function(_0x38ab54){if(_0x38ab54)this['moveAwayFromPoint'](_0x38ab54['x'],_0x38ab54['y']);},Game_Character[_0x2ee1ea(0x532)]['turnTowardCharacter']=function(_0x1f920c){const _0x530bdf=_0x2ee1ea;if(_0x1f920c)this[_0x530bdf(0x4dd)](_0x1f920c['x'],_0x1f920c['y']);},Game_Character['prototype'][_0x2ee1ea(0x2ad)]=function(_0x4c05cd){if(_0x4c05cd)this['turnAwayFromPoint'](_0x4c05cd['x'],_0x4c05cd['y']);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x33a)]=Game_Player[_0x2ee1ea(0x532)][_0x2ee1ea(0x4b9)],Game_Player[_0x2ee1ea(0x532)][_0x2ee1ea(0x4b9)]=function(){const _0x5ebe6e=_0x2ee1ea;if(this['_forceDashing'])return!![];return VisuMZ[_0x5ebe6e(0x3f3)][_0x5ebe6e(0x33a)][_0x5ebe6e(0x29e)](this);},VisuMZ['EventsMoveCore']['Game_Player_getInputDirection']=Game_Player[_0x2ee1ea(0x532)][_0x2ee1ea(0x4a5)],Game_Player['prototype'][_0x2ee1ea(0x4a5)]=function(){const _0x149917=_0x2ee1ea;if($gameMap['isSupportDiagonalMovement']()){if('WUAFn'==='QpWaw')this[_0x149917(0x329)](_0xdd58d1);else return this['getInputDir8']();}else{if(_0x149917(0x672)!==_0x149917(0x672)){if(_0x4e0335['_scene'][_0x149917(0x3db)]===_0x23c14a)return![];return _0x5ebddb[_0x149917(0x287)][_0x149917(0x43c)](_0x3e3ec3);}else return VisuMZ['EventsMoveCore'][_0x149917(0x467)][_0x149917(0x29e)](this);}},Game_Player[_0x2ee1ea(0x532)][_0x2ee1ea(0x670)]=function(){const _0x2594bf=_0x2ee1ea;return Input[_0x2594bf(0x32c)];},Game_Player[_0x2ee1ea(0x532)][_0x2ee1ea(0x3cf)]=function(){const _0x4ddeba=_0x2ee1ea;if($gameSystem[_0x4ddeba(0x401)]())return 0x0;if(!this[_0x4ddeba(0x2e5)]()&&this[_0x4ddeba(0x5e4)]()){let _0x244d2e=this[_0x4ddeba(0x4a5)]();if(_0x244d2e>0x0){if('fHoBr'!==_0x4ddeba(0x1f4))$gameTemp[_0x4ddeba(0x5fa)]();else return _0x15297f>0x0?0x6:0x4;}else{if($gameTemp[_0x4ddeba(0x327)]()){if(_0x4ddeba(0x312)===_0x4ddeba(0x312)){const _0x1fd2f9=$gameTemp[_0x4ddeba(0x53a)](),_0x345d67=$gameTemp['destinationY'](),_0x451507=$gameMap['isSupportDiagonalMovement'](),_0x2cd8a8=$gameMap['isPassableByAnyDirection'](_0x1fd2f9,_0x345d67),_0x17bb2a=$gameMap[_0x4ddeba(0x185)](_0x1fd2f9,_0x345d67)[_0x4ddeba(0x5e6)]<=0x0;if(_0x451507&&_0x2cd8a8&&_0x17bb2a){if('VJydM'===_0x4ddeba(0x4ee))_0x244d2e=this[_0x4ddeba(0x5dc)](_0x1fd2f9,_0x345d67);else return _0x3ed466[_0x4ddeba(0x503)](this)?_0x51935a['prototype']['getEventIconData'][_0x4ddeba(0x29e)](this):{'iconIndex':0x0,'bufferX':_0x590798[_0x4ddeba(0x195)][_0x4ddeba(0x4b0)],'bufferY':_0x1a7c27[_0x4ddeba(0x195)][_0x4ddeba(0x4ba)],'blendMode':_0x23a5c0[_0x4ddeba(0x195)]['BlendMode']};}else{if(_0x4ddeba(0x6ac)!=='oqNRF')return _0x15fe3c[_0x4ddeba(0x3f3)][_0x4ddeba(0x44c)][_0x4ddeba(0x45d)];else _0x244d2e=this[_0x4ddeba(0x5a4)](_0x1fd2f9,_0x345d67);}}else{const _0x129bbb=this[_0x4ddeba(0x4a3)](_0x43e563,_0x3b2600,![]);if(_0x129bbb)this[_0x4ddeba(0x1c4)](_0x129bbb);}}}if(_0x244d2e>0x0){if(_0x4ddeba(0x696)===_0x4ddeba(0x197)){if(_0x53f48c[_0x4ddeba(0x4d9)]())return!![];return this[_0x4ddeba(0x325)];}else this['_inputTime']=this[_0x4ddeba(0x3e4)]||0x0,this['isTurnInPlace']()?this[_0x4ddeba(0x1c4)](_0x244d2e):this[_0x4ddeba(0x5c7)](_0x244d2e),this['_inputTime']++;}else this[_0x4ddeba(0x3e4)]=0x0;}},Game_Player[_0x2ee1ea(0x532)]['isTurnInPlace']=function(){const _0x40fad5=_0x2ee1ea,_0xdefd67=VisuMZ[_0x40fad5(0x3f3)][_0x40fad5(0x44c)][_0x40fad5(0x238)];if(!_0xdefd67[_0x40fad5(0x36f)])return![];if($gameTemp[_0x40fad5(0x327)]())return![];if(this[_0x40fad5(0x4b9)]()||this[_0x40fad5(0x2e5)]()||this[_0x40fad5(0x1a6)]())return![];return this[_0x40fad5(0x3e4)]<_0xdefd67[_0x40fad5(0x237)];},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x4a9)]=Game_Player[_0x2ee1ea(0x532)][_0x2ee1ea(0x5c7)],Game_Player[_0x2ee1ea(0x532)][_0x2ee1ea(0x5c7)]=function(_0x538ddf){const _0x45dfd2=_0x2ee1ea;if($gameMap['isSupportDiagonalMovement']())this[_0x45dfd2(0x1cd)](_0x538ddf);else{if('ucevK'!==_0x45dfd2(0x55d))return this[_0x45dfd2(0x65f)]();else VisuMZ['EventsMoveCore']['Game_Player_executeMove']['call'](this,_0x538ddf);}},VisuMZ[_0x2ee1ea(0x3f3)]['Game_Player_isMapPassable']=Game_Player[_0x2ee1ea(0x532)]['isMapPassable'],Game_Player[_0x2ee1ea(0x532)]['isMapPassable']=function(_0x4aa338,_0x529741,_0x3bbd15){const _0x4ea718=_0x2ee1ea;if($gameMap[_0x4ea718(0x438)](_0x4aa338,_0x529741,_0x3bbd15,_0x4ea718(0x2e9))){if('mruMX'!==_0x4ea718(0x5ba)){if(this['isInVehicle']()&&this['vehicle']()){if('SMjxv'===_0x4ea718(0x352))return this[_0x4ea718(0x46d)]()[_0x4ea718(0x3bb)](_0x4aa338,_0x529741,_0x3bbd15);else{if(this['moveSynchTarget']()>=0x0){const _0x402d11=_0x37310f[_0x4ea718(0x235)](this[_0x4ea718(0x18d)]());if(_0x402d11){const _0x41b8fe=_0x1f91d9['distance'](this[_0x4ea718(0x1b6)],this['_realY'],_0x402d11[_0x4ea718(0x1b6)],_0x402d11[_0x4ea718(0x687)])-0x1,_0x5ca031=_0x210246['min'](_0x2293b8['tileWidth'](),_0x20f0ff[_0x4ea718(0x565)]()),_0x40b4aa=this[_0x4ea718(0x20a)][_0x4ea718(0x410)]||0x0;_0x5919f3-=_0x4f07be[_0x4ea718(0x1e1)](0x0,_0x41b8fe)*_0x5ca031*_0x40b4aa;}}return _0xfa17a;}}else return!![];}else{this[_0x4ea718(0x5a0)]=this[_0x4ea718(0x5a0)]||[];const _0x4b356a=new _0x2f0f6d(_0x4587cc);this[_0x4ea718(0x5a0)][_0x4ea718(0x605)](_0x4b356a),this['_tilemap'][_0x4ea718(0x69b)](_0x4b356a),this['createCharacterShadow'](_0x4b356a),this[_0x4ea718(0x4a6)](_0x5029f0),_0x4b356a[_0x4ea718(0x40f)]();}}if($gameMap[_0x4ea718(0x55c)](_0x4aa338,_0x529741,_0x3bbd15,'player'))return![];return VisuMZ[_0x4ea718(0x3f3)][_0x4ea718(0x223)][_0x4ea718(0x29e)](this,_0x4aa338,_0x529741,_0x3bbd15);},VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerHere']=Game_Player['prototype']['checkEventTriggerHere'],Game_Player[_0x2ee1ea(0x532)][_0x2ee1ea(0x3c4)]=function(_0x52d1a2){const _0xf4a127=_0x2ee1ea;VisuMZ['EventsMoveCore'][_0xf4a127(0x2af)][_0xf4a127(0x29e)](this,_0x52d1a2);if(this['canStartLocalEvents']()){this['checkEventTriggerEventsMoveCore'](_0x52d1a2);if(_0x52d1a2[_0xf4a127(0x43c)](0x0)&&this['startMapCommonEventOnOKTarget']()===_0xf4a127(0x4bf)){if(_0xf4a127(0x3a7)!=='wSCaM')return this[_0xf4a127(0x6a6)]();else this['startMapCommonEventOnOK'](this['x'],this['y']);}else{if(_0x52d1a2[_0xf4a127(0x43c)](0x1)||_0x52d1a2[_0xf4a127(0x43c)](0x2)){if(_0xf4a127(0x263)===_0xf4a127(0x263))this[_0xf4a127(0x1fb)]();else{const _0x24d66b=this[_0xf4a127(0x374)]();return _0x24d66b?_0x24d66b[_0xf4a127(0x25c)]:0x0;}}}}},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x309)]=Game_Player[_0x2ee1ea(0x532)][_0x2ee1ea(0x24d)],Game_Player['prototype'][_0x2ee1ea(0x24d)]=function(_0xa780ac){const _0x2e1a3d=_0x2ee1ea;VisuMZ[_0x2e1a3d(0x3f3)][_0x2e1a3d(0x309)][_0x2e1a3d(0x29e)](this,_0xa780ac);if(this[_0x2e1a3d(0x3c2)]()&&_0xa780ac[_0x2e1a3d(0x43c)](0x0)&&this[_0x2e1a3d(0x66e)]()===_0x2e1a3d(0x60f)){const _0x2bab46=this[_0x2e1a3d(0x632)](),_0x364254=$gameMap[_0x2e1a3d(0x2c5)](this['x'],_0x2bab46),_0x47db61=$gameMap[_0x2e1a3d(0x5b3)](this['y'],_0x2bab46);this[_0x2e1a3d(0x493)](_0x364254,_0x47db61);}},Game_Player[_0x2ee1ea(0x532)]['checkEventTriggerEventsMoveCore']=function(_0x21ad3d){const _0x1dafc5=_0x2ee1ea;if($gameMap[_0x1dafc5(0x5ff)]())return;if($gameMap[_0x1dafc5(0x4f9)]())return;const _0x458d43=$gameMap[_0x1dafc5(0x560)]();for(const _0xddb899 of _0x458d43){if(!_0xddb899)continue;if(!_0xddb899[_0x1dafc5(0x5cf)](_0x21ad3d))continue;if(this[_0x1dafc5(0x5fe)](_0xddb899))return _0xddb899[_0x1dafc5(0x547)]();if(this[_0x1dafc5(0x3d4)](_0xddb899))return _0xddb899[_0x1dafc5(0x547)]();}},Game_Player[_0x2ee1ea(0x532)][_0x2ee1ea(0x5fe)]=function(_0x5ccff1){const _0x5c43ce=_0x2ee1ea;if($gameMap[_0x5c43ce(0x5ff)]())return![];if($gameMap[_0x5c43ce(0x4f9)]())return![];return _0x5ccff1[_0x5c43ce(0x693)]()[_0x5c43ce(0x43c)](this['regionId']());},Game_Player['prototype']['meetActivationProximityConditions']=function(_0x266296){const _0x2b42c0=_0x2ee1ea;if($gameMap[_0x2b42c0(0x5ff)]())return![];if($gameMap[_0x2b42c0(0x4f9)]())return![];if([_0x2b42c0(0x695),_0x2b42c0(0x523)][_0x2b42c0(0x43c)](_0x266296['activationProximityType']()))return![];const _0x3e9cf8=_0x266296[_0x2b42c0(0x26b)](),_0x481ec8=_0x266296[_0x2b42c0(0x48e)]();switch(_0x3e9cf8){case _0x2b42c0(0x2eb):const _0x39c78e=$gameMap[_0x2b42c0(0x2d1)](this['x'],this['y'],_0x266296['x'],_0x266296['y']);return _0x266296[_0x2b42c0(0x48e)]()>=_0x39c78e;break;case _0x2b42c0(0x56c):return _0x481ec8>=Math[_0x2b42c0(0x3c0)](_0x266296['deltaXFrom'](this['x']))&&_0x481ec8>=Math[_0x2b42c0(0x3c0)](_0x266296[_0x2b42c0(0x1bf)](this['y']));break;case _0x2b42c0(0x24f):return _0x481ec8>=Math[_0x2b42c0(0x3c0)](_0x266296[_0x2b42c0(0x1bf)](this['y']));break;case _0x2b42c0(0x492):return _0x481ec8>=Math['abs'](_0x266296[_0x2b42c0(0x66a)](this['x']));break;case'default':return![];break;}},Game_Player[_0x2ee1ea(0x532)][_0x2ee1ea(0x493)]=function(_0x2ced96,_0x2fe4fb){const _0x3a3122=_0x2ee1ea;if($gameMap[_0x3a3122(0x5ff)]())return;if($gameMap[_0x3a3122(0x4f9)]())return;let _0x1b45af=VisuMZ[_0x3a3122(0x3f3)][_0x3a3122(0x44c)]['RegionOk'],_0x5da0a6=$gameMap[_0x3a3122(0x2a9)](_0x2ced96,_0x2fe4fb);const _0x2306b9='Region%1'[_0x3a3122(0x41e)](_0x5da0a6);_0x1b45af[_0x2306b9]&&$gameTemp[_0x3a3122(0x5ea)](_0x1b45af[_0x2306b9]);},Game_Player[_0x2ee1ea(0x532)]['startMapCommonEventOnOKTarget']=function(){const _0x343e70=_0x2ee1ea;return VisuMZ[_0x343e70(0x3f3)]['Settings'][_0x343e70(0x45d)];},Game_Player['prototype'][_0x2ee1ea(0x1fb)]=function(){const _0x596257=_0x2ee1ea;if($gameMap[_0x596257(0x5ff)]())return;if($gameMap[_0x596257(0x4f9)]())return;let _0x3f0c85=VisuMZ[_0x596257(0x3f3)]['Settings'][_0x596257(0x64e)];const _0x52e465=_0x596257(0x4ef)[_0x596257(0x41e)](this[_0x596257(0x2a9)]());if(_0x3f0c85[_0x52e465]){if(_0x596257(0x37a)===_0x596257(0x37a))$gameTemp[_0x596257(0x5ea)](_0x3f0c85[_0x52e465]);else{_0xb70b8c['ConvertParams'](_0x19af58,_0x43ba3a);const _0x41625c=_0x5c325e['getLastPluginCommandInterpreter'](),_0x78f2af={'template':_0x5de18b[_0x596257(0x4ed)],'mapId':_0x8d5ceb[_0x596257(0x63e)]||_0x461b8b['mapId'](),'eventId':_0xfd49d5['EventId']||_0x41625c[_0x596257(0x639)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x35d4db[_0x596257(0x5c6)],'spawnEventId':_0x24ced2[_0x596257(0x65a)]['length']+0x3e8},_0x19429c=_0x1fa048[_0x596257(0x5a6)]||0x0;if(!_0xd457ea['PreloadedMaps'][_0x78f2af[_0x596257(0x2f1)]]&&_0x78f2af['mapId']!==_0xcf459[_0x596257(0x2f1)]()){let _0x55da75=_0x596257(0x3bf)[_0x596257(0x41e)](_0x78f2af[_0x596257(0x2f1)]);_0x55da75+=_0x596257(0x1af),_0x55da75+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x55da75+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x55da75+=_0x596257(0x495)['format'](_0x78f2af[_0x596257(0x2f1)]),_0x458fff(_0x55da75);return;}const _0x6541f7=_0x133a19[_0x596257(0x2a1)](_0x78f2af,_0x4d3a4a[_0x596257(0x2a3)],_0x453fc1['Collision'],_0x529465[_0x596257(0x375)]);_0x19429c&&_0x2773ee[_0x596257(0x50f)](_0x19429c,!!_0x6541f7);}}},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x3d1)]=Game_Player[_0x2ee1ea(0x532)]['increaseSteps'],Game_Player['prototype']['increaseSteps']=function(){const _0x527d50=_0x2ee1ea;VisuMZ['EventsMoveCore'][_0x527d50(0x3d1)][_0x527d50(0x29e)](this),VisuMZ[_0x527d50(0x2b1)](0x0);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x445)]=Game_Follower[_0x2ee1ea(0x532)][_0x2ee1ea(0x457)],Game_Follower['prototype']['initialize']=function(_0x54510f){const _0x17d8c3=_0x2ee1ea;VisuMZ['EventsMoveCore'][_0x17d8c3(0x445)][_0x17d8c3(0x29e)](this,_0x54510f),this[_0x17d8c3(0x518)]=![];},Game_Follower['prototype']['isDashing']=function(){const _0x275691=_0x2ee1ea;return $gamePlayer[_0x275691(0x4b9)]();},Game_Follower['prototype'][_0x2ee1ea(0x64f)]=function(){const _0x151c95=_0x2ee1ea;return $gamePlayer[_0x151c95(0x64f)]();},Game_Follower['prototype']['realMoveSpeed']=function(){return $gamePlayer['realMoveSpeed']();},Game_Follower[_0x2ee1ea(0x532)][_0x2ee1ea(0x5b8)]=function(_0x147495){const _0x1461b0=_0x2ee1ea;this[_0x1461b0(0x518)]=_0x147495;},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x669)]=Game_Follower['prototype'][_0x2ee1ea(0x454)],Game_Follower[_0x2ee1ea(0x532)]['chaseCharacter']=function(_0xc809aa){const _0x28743f=_0x2ee1ea;if(this[_0x28743f(0x518)])return;if($gameSystem[_0x28743f(0x6a9)]())return;VisuMZ[_0x28743f(0x3f3)][_0x28743f(0x669)]['call'](this,_0xc809aa);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x551)]=Game_Vehicle[_0x2ee1ea(0x532)][_0x2ee1ea(0x3bb)],Game_Vehicle[_0x2ee1ea(0x532)][_0x2ee1ea(0x3bb)]=function(_0x5a5f16,_0x32ed15,_0x2c0a02){const _0x18f7b8=_0x2ee1ea;if($gameMap[_0x18f7b8(0x438)](_0x5a5f16,_0x32ed15,_0x2c0a02,this[_0x18f7b8(0x66f)]))return!![];if($gameMap[_0x18f7b8(0x55c)](_0x5a5f16,_0x32ed15,_0x2c0a02,this['_type']))return![];return VisuMZ['EventsMoveCore']['Game_Vehicle_isMapPassable']['call'](this,_0x5a5f16,_0x32ed15,_0x2c0a02);},Game_Vehicle[_0x2ee1ea(0x532)][_0x2ee1ea(0x48b)]=function(_0x415b31,_0x396869,_0x10e41b){const _0x47767b=_0x2ee1ea;if($gameMap['isRegionAllowPass'](_0x415b31,_0x396869,_0x10e41b,this[_0x47767b(0x66f)]))return!![];if($gameMap[_0x47767b(0x55c)](_0x415b31,_0x396869,_0x10e41b,this[_0x47767b(0x66f)]))return![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_canPass'][_0x47767b(0x29e)]($gamePlayer,_0x415b31,_0x396869,_0x10e41b);},VisuMZ[_0x2ee1ea(0x3f3)]['Game_Vehicle_isLandOk']=Game_Vehicle[_0x2ee1ea(0x532)][_0x2ee1ea(0x2a6)],Game_Vehicle[_0x2ee1ea(0x532)][_0x2ee1ea(0x2a6)]=function(_0x677b46,_0x15f719,_0x365026){const _0x5efd50=_0x2ee1ea;if($gameMap['isRegionDockable'](_0x677b46,_0x15f719,_0x365026,this[_0x5efd50(0x66f)]))return!![];const _0x456e2a=this[_0x5efd50(0x66f)][_0x5efd50(0x519)](0x0)['toUpperCase']()+this[_0x5efd50(0x66f)][_0x5efd50(0x1c9)](0x1),_0x48e71b=_0x5efd50(0x242)['format'](_0x456e2a);if(VisuMZ[_0x5efd50(0x3f3)][_0x5efd50(0x44c)][_0x5efd50(0x2a3)][_0x48e71b])return![];else{if(_0x5efd50(0x45a)===_0x5efd50(0x45a))return VisuMZ[_0x5efd50(0x3f3)]['Game_Vehicle_isLandOk'][_0x5efd50(0x29e)](this,_0x677b46,_0x15f719,_0x365026);else{if(!this[_0x5efd50(0x22f)]())return;const _0x238676=this[_0x5efd50(0x345)][_0x5efd50(0x2b0)]();this[_0x5efd50(0x5e0)]=_0x238676[_0x5efd50(0x319)],this[_0x5efd50(0x3eb)]=_0x238676[_0x5efd50(0x5b0)],this[_0x5efd50(0x56d)]=_0x238676[_0x5efd50(0x489)];if(_0x238676[_0x5efd50(0x319)]!==''){const _0xa804f2=_0x59e695[_0x5efd50(0x42b)](_0x238676['filename']);_0xa804f2[_0x5efd50(0x614)](this[_0x5efd50(0x2e1)]['bind'](this,_0xa804f2));}else this['_attachPictureSprite'][_0x5efd50(0x21f)]=new _0x3ef78b(0x1,0x1);}}},VisuMZ['EventsMoveCore']['Game_Vehicle_initMoveSpeed']=Game_Vehicle[_0x2ee1ea(0x532)][_0x2ee1ea(0x294)],Game_Vehicle[_0x2ee1ea(0x532)][_0x2ee1ea(0x294)]=function(){const _0xaf29ed=_0x2ee1ea;VisuMZ[_0xaf29ed(0x3f3)][_0xaf29ed(0x4b4)]['call'](this);const _0x5538ed=VisuMZ[_0xaf29ed(0x3f3)][_0xaf29ed(0x44c)][_0xaf29ed(0x238)];if(this[_0xaf29ed(0x593)]()){if(_0x5538ed[_0xaf29ed(0x485)])this[_0xaf29ed(0x507)](_0x5538ed['BoatSpeed']);}else{if(this[_0xaf29ed(0x48c)]()){if(_0xaf29ed(0x376)!==_0xaf29ed(0x376))this[_0xaf29ed(0x4c5)][_0xaf29ed(0x489)]['x']=_0x4b2f36['max'](0x0,this[_0xaf29ed(0x4c5)]['scale']['x']-0.1),this[_0xaf29ed(0x4c5)][_0xaf29ed(0x489)]['y']=_0x1a3c9e[_0xaf29ed(0x1e1)](0x0,this['_shadowSprite'][_0xaf29ed(0x489)]['y']-0.1);else{if(_0x5538ed[_0xaf29ed(0x307)])this['setMoveSpeed'](_0x5538ed['ShipSpeed']);}}else{if(this[_0xaf29ed(0x335)]()){if(_0x5538ed[_0xaf29ed(0x1ca)])this[_0xaf29ed(0x507)](_0x5538ed[_0xaf29ed(0x1ca)]);}}}},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x68e)]=Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x457)],Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x457)]=function(_0x36a540,_0x17a431){const _0x44a878=_0x2ee1ea;VisuMZ[_0x44a878(0x3f3)]['Game_Event_initialize'][_0x44a878(0x29e)](this,_0x36a540,_0x17a431),this['setupCopyEvent'](),this[_0x44a878(0x5c3)](),this[_0x44a878(0x60e)]();},Game_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x2c0)]=function(_0x257fac,_0x51bb95){const _0x499178=_0x2ee1ea;if(_0x257fac===$gameMap[_0x499178(0x2f1)]()){if(_0x499178(0x5c2)===_0x499178(0x1ab)){if([0x1,0x4,0x7][_0x499178(0x43c)](_0x5378e0))_0x4d3724-=0x1;if([0x3,0x6,0x9]['includes'](_0x48be4b))_0x547b59+=0x1;return this[_0x499178(0x43a)](_0x2f462a);}else return $dataMap[_0x499178(0x560)][_0x51bb95];}else return VisuMZ[_0x499178(0x1f8)][_0x257fac][_0x499178(0x560)][_0x51bb95];},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x26f)]=Game_Event[_0x2ee1ea(0x532)]['event'],Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x1f5)]=function(){const _0x5259dd=_0x2ee1ea;if(this['_eventMorphData']!==undefined){if('Zzgjt'!==_0x5259dd(0x39f)){const _0x49723d=_0x576305[_0x5259dd(0x2d1)](this['x'],this['y'],this[_0x5259dd(0x5f4)],this['_randomHomeY']),_0xf8ec89=_0x49723d*(this['_randomMoveWeight']||0x0);_0x4e9270[_0x5259dd(0x4cf)]()>=_0xf8ec89?_0x446d48['EventsMoveCore'][_0x5259dd(0x3b6)][_0x5259dd(0x29e)](this):this[_0x5259dd(0x246)]();}else{const _0x5ead3e=this['_eventMorphData'][_0x5259dd(0x2f1)],_0x336107=this['_eventMorphData'][_0x5259dd(0x639)];return $gameMap[_0x5259dd(0x2c0)](_0x5ead3e,_0x336107);}}if(this[_0x5259dd(0x52d)]!==undefined){if(_0x5259dd(0x3ac)===_0x5259dd(0x3ac)){const _0xbbc2c8=this[_0x5259dd(0x52d)][_0x5259dd(0x2f1)],_0x1eb2e1=this[_0x5259dd(0x52d)]['eventId'];return $gameMap[_0x5259dd(0x2c0)](_0xbbc2c8,_0x1eb2e1);}else this[_0x5259dd(0x493)](this['x'],this['y']);}if(this[_0x5259dd(0x528)]!==undefined){if(_0x5259dd(0x636)==='GTVLE'){const _0x244436=this['_opacity']+_0x1ef1ff[_0x5259dd(0x650)](_0x10d427(_0x5f4684['$1'])/0x64*0xff);return this[_0x5259dd(0x496)](_0x244436[_0x5259dd(0x187)](0x0,0xff));}else{const _0x5d87a5=this[_0x5259dd(0x528)][_0x5259dd(0x2f1)],_0x21f037=this[_0x5259dd(0x528)]['eventId'];return $gameMap['referEvent'](_0x5d87a5,_0x21f037);}}if($gameTemp[_0x5259dd(0x247)]!==undefined){const _0x1d6128=$gameTemp['_spawnData'][_0x5259dd(0x2f1)],_0x4fea99=$gameTemp[_0x5259dd(0x247)]['eventId'];return $gameMap['referEvent'](_0x1d6128,_0x4fea99);}return VisuMZ[_0x5259dd(0x3f3)][_0x5259dd(0x26f)][_0x5259dd(0x29e)](this);},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x43d)]=function(_0x53c492,_0x423abf){const _0x4d03d2=_0x2ee1ea;if(_0x53c492===0x0||_0x423abf===0x0)return![];if(!VisuMZ[_0x4d03d2(0x1f8)][_0x53c492]&&_0x53c492!==$gameMap['mapId']())return $gameTemp['isPlaytest']()&&console[_0x4d03d2(0x1df)](_0x4d03d2(0x28d)['format'](_0x53c492)),![];return!![];},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x425)]=Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x547)],Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x547)]=function(){const _0xe9ea2d=_0x2ee1ea;VisuMZ[_0xe9ea2d(0x3f3)][_0xe9ea2d(0x425)][_0xe9ea2d(0x29e)](this);if(Imported['VisuMZ_1_MessageCore']&&Input['isPressed'](VisuMZ[_0xe9ea2d(0x39c)][_0xe9ea2d(0x44c)]['General'][_0xe9ea2d(0x499)])){if(_0xe9ea2d(0x282)!==_0xe9ea2d(0x282)){if(_0x267a0d[_0xe9ea2d(0x19f)](_0x32f5f9))this['setSelfValue'](_0x2881d0,_0x15defa);else _0x2651f3['isMapSwitch'](_0x31a2dc)?this['setMapValue'](_0x54abe7,_0x40498d):_0x31ef48['EventsMoveCore'][_0xe9ea2d(0x3be)][_0xe9ea2d(0x29e)](this,_0x4788d3,_0x1113b2);}else Input['clear']();}},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x5e2)]=function(){const _0x57746a=_0x2ee1ea,_0x33ea92=this[_0x57746a(0x1f5)]()[_0x57746a(0x6af)];if(_0x33ea92==='')return;if(DataManager[_0x57746a(0x4cd)]()||DataManager[_0x57746a(0x552)]())return;const _0x496d71=VisuMZ['EventsMoveCore'][_0x57746a(0x44c)][_0x57746a(0x4ae)];let _0x3ed094=null,_0x461235=0x0,_0x19a09a=0x0;if(_0x33ea92['match'](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x461235=Number(RegExp['$1']),_0x19a09a=Number(RegExp['$2']);else{if(_0x33ea92[_0x57746a(0x640)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){if(_0x57746a(0x63c)!==_0x57746a(0x63c))return!!this[_0x57746a(0x3b9)](_0x549bcd);else _0x461235=Number(RegExp['$1']),_0x19a09a=Number(RegExp['$2']);}else{if(_0x33ea92[_0x57746a(0x640)](/<COPY EVENT:[ ](.*?)>/i)){const _0x2dbcd4=String(RegExp['$1'])['toUpperCase']()[_0x57746a(0x1db)]();_0x3ed094=VisuMZ['EventTemplates'][_0x2dbcd4];if(!_0x3ed094)return;_0x461235=_0x3ed094[_0x57746a(0x4af)],_0x19a09a=_0x3ed094[_0x57746a(0x3ff)];}}}if(!this[_0x57746a(0x43d)](_0x461235,_0x19a09a))return;_0x496d71[_0x57746a(0x45c)][_0x57746a(0x29e)](this,_0x461235,_0x19a09a,this);if(_0x3ed094)_0x3ed094['PreCopyJS'][_0x57746a(0x29e)](this,_0x461235,_0x19a09a,this);this['_eventCopyData']={'mapId':_0x461235,'eventId':_0x19a09a},this['_pageIndex']=-0x2,this['refresh'](),_0x496d71['PostCopyJS'][_0x57746a(0x29e)](this,_0x461235,_0x19a09a,this);if(_0x3ed094)_0x3ed094[_0x57746a(0x59a)][_0x57746a(0x29e)](this,_0x461235,_0x19a09a,this);$gameMap[_0x57746a(0x427)]();},Game_Event['prototype'][_0x2ee1ea(0x5c3)]=function(){const _0x15d157=_0x2ee1ea,_0x2440a2=$gameSystem[_0x15d157(0x5b9)](this);if(!_0x2440a2)return;const _0x39efe8=_0x2440a2['template'][_0x15d157(0x269)]()[_0x15d157(0x1db)]();_0x39efe8!==_0x15d157(0x414)?this[_0x15d157(0x468)](_0x39efe8,!![]):this[_0x15d157(0x4ce)](_0x2440a2[_0x15d157(0x2f1)],_0x2440a2[_0x15d157(0x639)],!![]);},Game_Event['prototype'][_0x2ee1ea(0x4ce)]=function(_0x3d035e,_0x4e26ee,_0x15b26e){const _0x5a97a8=_0x2ee1ea;if(!this[_0x5a97a8(0x43d)](_0x3d035e,_0x4e26ee))return;const _0x496a06=VisuMZ[_0x5a97a8(0x3f3)][_0x5a97a8(0x44c)][_0x5a97a8(0x4ae)];if(!_0x15b26e)_0x496a06['PreMorphJS'][_0x5a97a8(0x29e)](this,_0x3d035e,_0x4e26ee,this);this[_0x5a97a8(0x3f8)]={'mapId':_0x3d035e,'eventId':_0x4e26ee},this[_0x5a97a8(0x1e7)]=-0x2,this[_0x5a97a8(0x38e)]();if(!_0x15b26e)_0x496a06[_0x5a97a8(0x2c2)][_0x5a97a8(0x29e)](this,_0x3d035e,_0x4e26ee,this);$gameMap['clearEventCache']();},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x468)]=function(_0x17794e,_0x1b50cc){const _0x627ac8=_0x2ee1ea;_0x17794e=_0x17794e[_0x627ac8(0x269)]()['trim']();const _0x2d9581=VisuMZ[_0x627ac8(0x407)][_0x17794e];if(!_0x2d9581)return;const _0x11aeb8=_0x2d9581['MapID'],_0x31e6b9=_0x2d9581['EventID'];if(!this[_0x627ac8(0x43d)](_0x11aeb8,_0x31e6b9))return;if(!_0x1b50cc)_0x2d9581[_0x627ac8(0x660)][_0x627ac8(0x29e)](this,_0x11aeb8,_0x31e6b9,this);this['morphInto'](_0x11aeb8,_0x31e6b9,_0x1b50cc);if(!_0x1b50cc)_0x2d9581[_0x627ac8(0x2c2)][_0x627ac8(0x29e)](this,_0x11aeb8,_0x31e6b9,this);if($gameMap)$gameMap[_0x627ac8(0x427)]();},Game_Event['prototype'][_0x2ee1ea(0x558)]=function(){const _0x2229df=_0x2ee1ea;this['_eventMorphData']=undefined,this[_0x2229df(0x1e7)]=-0x2,this[_0x2229df(0x38e)]();},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x2ff)]=function(_0x414232){const _0x3998aa=_0x2ee1ea,_0x407b03=VisuMZ['EventsMoveCore'][_0x3998aa(0x44c)][_0x3998aa(0x4ae)],_0x376a79=_0x414232['template'][_0x3998aa(0x269)]()['trim'](),_0x5555ba=!['',_0x3998aa(0x414)][_0x3998aa(0x43c)](_0x376a79);let _0x193e82=0x0,_0x5ba9f5=0x0;if(_0x5555ba){const _0x51bf12=VisuMZ[_0x3998aa(0x407)][_0x376a79];if(!_0x51bf12)return;_0x193e82=_0x51bf12[_0x3998aa(0x4af)],_0x5ba9f5=_0x51bf12[_0x3998aa(0x3ff)];}else _0x193e82=_0x414232[_0x3998aa(0x2f1)],_0x5ba9f5=_0x414232['eventId'];if(!this[_0x3998aa(0x43d)](_0x193e82,_0x5ba9f5))return;if(_0x5555ba){const _0x2b12d8=VisuMZ[_0x3998aa(0x407)][_0x376a79];_0x2b12d8[_0x3998aa(0x4ca)][_0x3998aa(0x29e)](this,_0x193e82,_0x5ba9f5,this);}_0x407b03[_0x3998aa(0x4ca)][_0x3998aa(0x29e)](this,_0x193e82,_0x5ba9f5,this),this[_0x3998aa(0x528)]=_0x414232,this['_pageIndex']=-0x2,this[_0x3998aa(0x611)]=$gameMap['mapId'](),this[_0x3998aa(0x25c)]=_0x414232['spawnEventId'],this[_0x3998aa(0x188)]=_0x414232[_0x3998aa(0x2fe)],this[_0x3998aa(0x4da)](_0x414232['x'],_0x414232['y']),this[_0x3998aa(0x1c4)](_0x414232[_0x3998aa(0x632)]),this[_0x3998aa(0x38e)]();if(_0x5555ba){const _0x5c3021=VisuMZ['EventTemplates'][_0x376a79];if(!_0x5c3021)return;_0x5c3021[_0x3998aa(0x240)][_0x3998aa(0x29e)](this,_0x193e82,_0x5ba9f5,this);}_0x407b03[_0x3998aa(0x240)][_0x3998aa(0x29e)](this,_0x193e82,_0x5ba9f5,this);const _0x133f5c=SceneManager[_0x3998aa(0x368)];if(_0x133f5c&&_0x133f5c['_spriteset'])_0x133f5c[_0x3998aa(0x561)][_0x3998aa(0x435)](this);},Game_Event['prototype'][_0x2ee1ea(0x678)]=function(){const _0x19232c=_0x2ee1ea;return!!this[_0x19232c(0x528)];},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x1a1)]=Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x51c)],Game_Event['prototype']['clearPageSettings']=function(){const _0x22fb15=_0x2ee1ea;VisuMZ[_0x22fb15(0x3f3)][_0x22fb15(0x1a1)][_0x22fb15(0x29e)](this),this[_0x22fb15(0x360)]();},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x254)]=Game_Event['prototype']['setupPageSettings'],Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x69a)]=function(){const _0x2696ce=_0x2ee1ea;this['_activationProximityAutoTriggerBypass']=!![],VisuMZ[_0x2696ce(0x3f3)][_0x2696ce(0x254)][_0x2696ce(0x29e)](this),this[_0x2696ce(0x665)](),this[_0x2696ce(0x3c8)]=![];},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x665)]=function(){const _0x558c7d=_0x2ee1ea;if(!this[_0x558c7d(0x1f5)]())return;this[_0x558c7d(0x360)](),this[_0x558c7d(0x3fd)](),this['setupEventsMoveCoreCommentTags'](),this[_0x558c7d(0x27c)]();},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x3fd)]=function(){const _0x1c23f7=_0x2ee1ea,_0x467562=this[_0x1c23f7(0x1f5)]()['note'];if(_0x467562==='')return;this['checkEventsMoveCoreStringTags'](_0x467562);},Game_Event['prototype']['setupEventsMoveCoreCommentTags']=function(){const _0x3179a3=_0x2ee1ea;if(!this[_0x3179a3(0x27a)]())return;const _0x40f47c=this[_0x3179a3(0x4a4)]();let _0x37bd93='';for(const _0x346cbf of _0x40f47c){if([0x6c,0x198][_0x3179a3(0x43c)](_0x346cbf[_0x3179a3(0x1c6)])){if(_0x37bd93!=='')_0x37bd93+='\x0a';_0x37bd93+=_0x346cbf['parameters'][0x0];}}this[_0x3179a3(0x306)](_0x37bd93);},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x360)]=function(){const _0x4f6e62=_0x2ee1ea,_0x4ae288=VisuMZ[_0x4f6e62(0x3f3)][_0x4f6e62(0x44c)];this['_activationProximity']={'type':_0x4f6e62(0x695),'distance':0x0,'regionList':[]},this[_0x4f6e62(0x60c)]=![],this[_0x4f6e62(0x486)](),this[_0x4f6e62(0x2ae)]=![],this[_0x4f6e62(0x455)]=![],this[_0x4f6e62(0x408)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x4f6e62(0x2b4)]=$gameSystem[_0x4f6e62(0x503)](this),this[_0x4f6e62(0x4e1)]={'text':'','visibleRange':_0x4ae288[_0x4f6e62(0x68c)][_0x4f6e62(0x699)],'offsetX':_0x4ae288[_0x4f6e62(0x68c)][_0x4f6e62(0x314)],'offsetY':_0x4ae288[_0x4f6e62(0x68c)][_0x4f6e62(0x655)]},this[_0x4f6e62(0x448)]=![],this[_0x4f6e62(0x361)]=[],this[_0x4f6e62(0x20a)]={'target':-0x1,'type':_0x4f6e62(0x4cf),'delay':0x1,'opacityDelta':0x0},this[_0x4f6e62(0x49f)]=_0x4ae288['Movement'][_0x4f6e62(0x677)]??0x0,this[_0x4f6e62(0x325)]=![],this['_shadowGraphic']={'visible':!![],'filename':_0x4ae288['Movement'][_0x4f6e62(0x6ab)]},this[_0x4f6e62(0x3bd)](),this[_0x4f6e62(0x1e9)]();},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x306)]=function(_0x7c3c94){const _0x22e9e2=_0x2ee1ea;if(_0x7c3c94[_0x22e9e2(0x640)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x22e9e2(0x517)][_0x22e9e2(0x4f1)]=JSON[_0x22e9e2(0x606)]('['+RegExp['$1']['match'](/\d+/g)+']'),this['_activationProximity'][_0x22e9e2(0x6a7)]=_0x22e9e2(0x523);else _0x7c3c94['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&('cBcax'===_0x22e9e2(0x26c)?(_0x1282c9['ConvertParams'](_0x294d21,_0x32fd4d),_0x1cdbdc['despawnRegions'](_0x3f2568[_0x22e9e2(0x2a3)])):(type=String(RegExp['$1'])[_0x22e9e2(0x1ff)]()[_0x22e9e2(0x1db)](),this[_0x22e9e2(0x517)][_0x22e9e2(0x6a7)]=type,this[_0x22e9e2(0x517)]['distance']=Number(RegExp['$2'])));if(_0x7c3c94[_0x22e9e2(0x640)](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i)){if(_0x22e9e2(0x459)===_0x22e9e2(0x303)){if(_0x3a1664!=='')_0x7ad6cb+='\x0a';_0x24429d+=_0x4bdb78[_0x22e9e2(0x1f1)][0x0];}else this[_0x22e9e2(0x2e7)][_0x22e9e2(0x319)]=String(RegExp['$1']);}if(_0x7c3c94['match'](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)){const _0x3f21de=String(RegExp['$1'])[_0x22e9e2(0x269)]()['trim'](),_0x3992eb=['NORMAL',_0x22e9e2(0x241),_0x22e9e2(0x69f),_0x22e9e2(0x66b)];this['_attachPicture']['blendMode']=_0x3992eb[_0x22e9e2(0x1ba)](_0x3f21de)[_0x22e9e2(0x187)](0x0,0x3);}_0x7c3c94[_0x22e9e2(0x640)](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this[_0x22e9e2(0x2e7)][_0x22e9e2(0x5b0)]=Number(RegExp['$1']));if(_0x7c3c94[_0x22e9e2(0x640)](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i)){if(_0x22e9e2(0x290)!==_0x22e9e2(0x385))this[_0x22e9e2(0x2e7)][_0x22e9e2(0x5b7)]=Number(RegExp['$1']);else{const _0x6ef076=_0x27f6a5[_0x22e9e2(0x1f5)](_0x16b235(_0x37a818['$1']));return this[_0x22e9e2(0x6b3)](_0x6ef076);}}_0x7c3c94[_0x22e9e2(0x640)](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x22e9e2(0x2e7)][_0x22e9e2(0x65e)]=Number(RegExp['$1']));_0x7c3c94[_0x22e9e2(0x640)](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x22e9e2(0x5fd)===_0x22e9e2(0x207)?_0x4e3b1f=_0x3279c1:(this[_0x22e9e2(0x2e7)][_0x22e9e2(0x5b7)]=Number(RegExp['$1']),this[_0x22e9e2(0x2e7)][_0x22e9e2(0x65e)]=Number(RegExp['$2'])));_0x7c3c94['match'](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i)&&(this['_attachPicture'][_0x22e9e2(0x489)]=Number(RegExp['$1'])*0.01);if(_0x7c3c94[_0x22e9e2(0x640)](/<ALWAYS UPDATE MOVEMENT>/i)){if('VRSBp'===_0x22e9e2(0x22b))this[_0x22e9e2(0x60c)]=!![];else{const _0x1b96f4=_0x154fb5['event'](_0x14b110(_0x38eaef['$1']));return this[_0x22e9e2(0x2ad)](_0x1b96f4);}}_0x7c3c94[_0x22e9e2(0x640)](/<CLICK TRIGGER>/i)&&(this[_0x22e9e2(0x2ae)]=!![]);if(_0x7c3c94['match'](/<CUSTOM Z:[ ](.*?)>/i)){if('AEOqx'===_0x22e9e2(0x23d))return this[_0x22e9e2(0x2aa)]();else this['_customZ']=Number(RegExp['$1'])||0x0;}const _0x330ce4=_0x7c3c94[_0x22e9e2(0x640)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x330ce4){if(_0x22e9e2(0x20c)===_0x22e9e2(0x20c))for(const _0x315890 of _0x330ce4){if(_0x315890['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){if(_0x22e9e2(0x466)!==_0x22e9e2(0x50d)){const _0x2e4a24=String(RegExp['$1'])['toLowerCase']()[_0x22e9e2(0x1db)](),_0x38d8da=Number(RegExp['$2']);this[_0x22e9e2(0x408)][_0x2e4a24]=_0x38d8da;}else this[_0x22e9e2(0x5c5)]=this[_0x22e9e2(0x48d)][_0x22e9e2(0x4ff)](),this[_0x22e9e2(0x38e)]();}}else return![];}_0x7c3c94[_0x22e9e2(0x640)](/<ICON:[ ](\d+)>/i)&&(this[_0x22e9e2(0x2b4)][_0x22e9e2(0x331)]=Number(RegExp['$1']));_0x7c3c94[_0x22e9e2(0x640)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x22e9e2(0x2b4)][_0x22e9e2(0x53c)]=Number(RegExp['$1']));_0x7c3c94[_0x22e9e2(0x640)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon']['bufferY']=Number(RegExp['$1']));_0x7c3c94[_0x22e9e2(0x640)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x22e9e2(0x53c)]=Number(RegExp['$1']),this[_0x22e9e2(0x2b4)][_0x22e9e2(0x62b)]=Number(RegExp['$2']));if(_0x7c3c94[_0x22e9e2(0x640)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x5a2eaf=String(RegExp['$1'])[_0x22e9e2(0x269)]()['trim'](),_0x34f8eb=['NORMAL',_0x22e9e2(0x241),_0x22e9e2(0x69f),'SCREEN'];this[_0x22e9e2(0x2b4)]['blendMode']=_0x34f8eb[_0x22e9e2(0x1ba)](_0x5a2eaf)['clamp'](0x0,0x3);}_0x7c3c94[_0x22e9e2(0x640)](/<LABEL:[ ](.*?)>/i)&&(this['_labelWindow'][_0x22e9e2(0x44e)]=String(RegExp['$1'])['trim']());if(_0x7c3c94[_0x22e9e2(0x640)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x22e9e2(0x386)!=='TDLeA')this[_0x22e9e2(0x4e1)][_0x22e9e2(0x44e)]=String(RegExp['$1'])[_0x22e9e2(0x1db)]();else{_0x1944b6[_0x22e9e2(0x640)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0xa8b544=_0x530dc0(_0x2d18bc['$1'])[_0x22e9e2(0x1ff)]()['trim'](),_0x562037=_0x4ff94d(_0x1e0c67['$2'])[_0x22e9e2(0x1ff)]()['trim']();const _0x588c25=_0x4af089[_0x22e9e2(0x606)]('['+_0x450871['$3'][_0x22e9e2(0x640)](/\d+/g)+']');_0xa8b544=_0xa8b544[_0x22e9e2(0x519)](0x0)[_0x22e9e2(0x269)]()+_0xa8b544[_0x22e9e2(0x1c9)](0x1),_0x562037=_0x562037[_0x22e9e2(0x519)](0x0)[_0x22e9e2(0x269)]()+_0x562037['slice'](0x1);const _0x4bd875=_0x22e9e2(0x313)[_0x22e9e2(0x41e)](_0xa8b544,_0x562037);if(_0x5d989a[_0x4bd875])_0x38eb19[_0x4bd875]=_0x14b20a[_0x4bd875][_0x22e9e2(0x1b7)](_0x588c25);}}_0x7c3c94[_0x22e9e2(0x640)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x22e9e2(0x4e1)][_0x22e9e2(0x5b7)]=Number(RegExp['$1']));_0x7c3c94[_0x22e9e2(0x640)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x22e9e2(0x4e1)][_0x22e9e2(0x65e)]=Number(RegExp['$1']));_0x7c3c94[_0x22e9e2(0x640)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x22e9e2(0x5b7)]=Number(RegExp['$1']),this[_0x22e9e2(0x4e1)]['offsetY']=Number(RegExp['$2']));$gameTemp[_0x22e9e2(0x305)](this);for(;;){if(this['_labelWindow']['text'][_0x22e9e2(0x640)](/\\V\[(\d+)\]/gi))this['_labelWindow'][_0x22e9e2(0x44e)]=this[_0x22e9e2(0x4e1)][_0x22e9e2(0x44e)][_0x22e9e2(0x3cc)](/\\V\[(\d+)\]/gi,(_0x1bce25,_0x567d49)=>$gameVariables[_0x22e9e2(0x698)](parseInt(_0x567d49)));else break;}$gameTemp[_0x22e9e2(0x622)]();_0x7c3c94[_0x22e9e2(0x640)](/<LABEL RANGE:[ ](\d+)>/i)&&(_0x22e9e2(0x638)===_0x22e9e2(0x63b)?this[_0x22e9e2(0x3ba)]=![]:this[_0x22e9e2(0x4e1)]['visibleRange']=Number(RegExp['$1']));_0x7c3c94[_0x22e9e2(0x640)](/<MIRROR SPRITE>/i)&&(this[_0x22e9e2(0x448)]=!![]);if(_0x7c3c94['match'](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){if(_0x22e9e2(0x417)===_0x22e9e2(0x43f))this[_0x22e9e2(0x692)]=!![],this['setPattern'](_0x1c6006);else{const _0x575f29=JSON[_0x22e9e2(0x606)]('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x22e9e2(0x361)]=this[_0x22e9e2(0x361)][_0x22e9e2(0x1b7)](_0x575f29),this[_0x22e9e2(0x361)][_0x22e9e2(0x66d)](0x0);}}if(_0x7c3c94[_0x22e9e2(0x640)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){if('EMPAY'===_0x22e9e2(0x40a))this[_0x22e9e2(0x472)]=!![];else{const _0x1b9212=String(RegExp['$1']);if(_0x1b9212[_0x22e9e2(0x640)](/PLAYER/i)){if(_0x22e9e2(0x4f0)!==_0x22e9e2(0x603))this[_0x22e9e2(0x20a)]['target']=0x0;else{_0x51a6c6['ConvertParams'](_0x1d9916,_0xc860d7);const _0x5066bc=_0x3b7469[_0x22e9e2(0x3ca)](),_0x1daf2c={'mapId':_0x2cb219[_0x22e9e2(0x63e)],'eventId':_0x5554a0[_0x22e9e2(0x504)]||_0x5066bc[_0x22e9e2(0x639)](),'pageId':_0x4c0bb3[_0x22e9e2(0x3e2)]};if(_0x1daf2c[_0x22e9e2(0x2f1)]<=0x0)_0x1daf2c[_0x22e9e2(0x2f1)]=_0x35ae3e?_0x230a70[_0x22e9e2(0x2f1)]():0x1;_0x264a3a[_0x22e9e2(0x3ca)]()[_0x22e9e2(0x25e)](_0x1daf2c);}}else _0x1b9212[_0x22e9e2(0x640)](/EVENT[ ](\d+)/i)&&(this['_moveSynch'][_0x22e9e2(0x18e)]=Number(RegExp['$1']));}}_0x7c3c94[_0x22e9e2(0x640)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(_0x22e9e2(0x616)===_0x22e9e2(0x54d)?this[_0x22e9e2(0x4c5)]['z']=0x0:this['_moveSynch'][_0x22e9e2(0x6a7)]=String(RegExp['$1'])[_0x22e9e2(0x1ff)]()[_0x22e9e2(0x1db)]());_0x7c3c94[_0x22e9e2(0x640)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x22e9e2(0x20a)]['delay']=Number(RegExp['$1']));_0x7c3c94[_0x22e9e2(0x640)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this['_moveSynch'][_0x22e9e2(0x410)]=Number(RegExp['$1']));if(_0x7c3c94[_0x22e9e2(0x640)](/<TRUE RANDOM MOVE>/i))this[_0x22e9e2(0x49f)]=0x0;else _0x7c3c94[_0x22e9e2(0x640)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x22e9e2(0x49f)]=Number(RegExp['$1'])||0x0);_0x7c3c94[_0x22e9e2(0x640)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(_0x22e9e2(0x29d)!=='XBejS'?this['_saveEventLocation']=!![]:(this['bitmap']=new _0x2d87a4(_0x24a67f[_0x22e9e2(0x650)](_0x4b2eab['boxWidth']/0x2),0x30),this[_0x22e9e2(0x21f)][_0x22e9e2(0x1b4)]=this[_0x22e9e2(0x1b4)](),this[_0x22e9e2(0x21f)]['fontSize']=this[_0x22e9e2(0x621)](),this['bitmap'][_0x22e9e2(0x4b6)]=_0x4cfe31[_0x22e9e2(0x4b6)]())),_0x7c3c94[_0x22e9e2(0x640)](/<HIDE SHADOW>/i)&&(this['_shadowGraphic'][_0x22e9e2(0x2e4)]=![]),_0x7c3c94[_0x22e9e2(0x640)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x22e9e2(0x21a)][_0x22e9e2(0x319)]=String(RegExp['$1'])),_0x7c3c94['match'](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x22e9e2(0x509)]=Number(RegExp['$1'])),_0x7c3c94[_0x22e9e2(0x640)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this['_spriteOffsetY']=Number(RegExp['$1'])),_0x7c3c94[_0x22e9e2(0x640)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x22e9e2(0x509)]=Number(RegExp['$1']),this[_0x22e9e2(0x26d)]=Number(RegExp['$2'])),_0x7c3c94[_0x22e9e2(0x640)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x22e9e2(0x646)]=String(RegExp['$1'])[_0x22e9e2(0x269)]()['trim']());},Game_Event['prototype'][_0x2ee1ea(0x27c)]=function(){const _0x173b1b=_0x2ee1ea;this[_0x173b1b(0x38f)]();},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x618)]=function(){const _0x5d1c41=_0x2ee1ea;if(this[_0x5d1c41(0x60c)])return!![];return Game_Character[_0x5d1c41(0x532)][_0x5d1c41(0x618)][_0x5d1c41(0x29e)](this);},VisuMZ[_0x2ee1ea(0x3f3)]['Game_Event_updateSelfMovement']=Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x6ad)],Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x6ad)]=function(){const _0x43c518=_0x2ee1ea;if(this[_0x43c518(0x596)]())return;VisuMZ[_0x43c518(0x3f3)][_0x43c518(0x373)][_0x43c518(0x29e)](this),this['isMoving']()&&VisuMZ[_0x43c518(0x2b1)](this['_eventId']);},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x596)]=function(){const _0x87e50a=_0x2ee1ea,_0xfb34ca=VisuMZ[_0x87e50a(0x3f3)][_0x87e50a(0x44c)][_0x87e50a(0x238)];if($gameMap[_0x87e50a(0x5ff)]()&&_0xfb34ca[_0x87e50a(0x285)])return!![];if($gameMessage[_0x87e50a(0x2d3)]()&&_0xfb34ca['StopAutoMoveMessages'])return!![];if(!$gameSystem[_0x87e50a(0x4fb)]())return!![];if(this[_0x87e50a(0x18d)]()>=0x0)return!![];return![];},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x38f)]=function(){const _0x3bc404=_0x2ee1ea,_0x5a7fb2=SceneManager[_0x3bc404(0x368)][_0x3bc404(0x561)];if(_0x5a7fb2){const _0x260a84=_0x5a7fb2['findTargetSprite'](this);_0x260a84&&_0x260a84[_0x3bc404(0x4c5)]&&_0x260a84[_0x3bc404(0x4c5)][_0x3bc404(0x5c4)]!==this[_0x3bc404(0x289)]()&&(_0x260a84[_0x3bc404(0x4c5)][_0x3bc404(0x5c4)]=this[_0x3bc404(0x289)](),_0x260a84['_shadowSprite'][_0x3bc404(0x21f)]=ImageManager[_0x3bc404(0x343)](_0x260a84['_shadowSprite'][_0x3bc404(0x5c4)]));}},Game_Event['prototype'][_0x2ee1ea(0x289)]=function(){const _0xed21a2=_0x2ee1ea;return this['_shadowGraphic'][_0xed21a2(0x319)];},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x667)]=function(){const _0x50ffe2=_0x2ee1ea;if(!this[_0x50ffe2(0x21a)][_0x50ffe2(0x2e4)])return![];return Game_CharacterBase[_0x50ffe2(0x532)]['isShadowVisible'][_0x50ffe2(0x29e)](this);},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x4ff)]=function(){const _0x29e033=_0x2ee1ea;return this[_0x29e033(0x4e1)][_0x29e033(0x44e)];},Game_Event[_0x2ee1ea(0x532)]['labelWindowRange']=function(){return this['_labelWindow']['visibleRange'];},Game_Event[_0x2ee1ea(0x532)]['isMapPassable']=function(_0x1286c0,_0xe16249,_0x9f7ca1){const _0x244b0e=_0x2ee1ea;if(this[_0x244b0e(0x45b)]())return this[_0x244b0e(0x384)](_0x1286c0,_0xe16249,_0x9f7ca1);if($gameMap[_0x244b0e(0x438)](_0x1286c0,_0xe16249,_0x9f7ca1,'event'))return!![];if($gameMap[_0x244b0e(0x55c)](_0x1286c0,_0xe16249,_0x9f7ca1,'event'))return![];return Game_Character[_0x244b0e(0x532)][_0x244b0e(0x3bb)]['call'](this,_0x1286c0,_0xe16249,_0x9f7ca1);},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x45b)]=function(){const _0xca4abb=_0x2ee1ea;if(this['_moveOnlyRegions']===undefined)this[_0xca4abb(0x360)]();return this[_0xca4abb(0x361)][_0xca4abb(0x5e6)]>0x0;},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x384)]=function(_0x22dcfd,_0x149229,_0x409fc6){const _0x511bba=_0x2ee1ea,_0xb8b63b=$gameMap['roundXWithDirection'](_0x22dcfd,_0x409fc6),_0x562daa=$gameMap[_0x511bba(0x5b3)](_0x149229,_0x409fc6),_0x39750a=$gameMap[_0x511bba(0x2a9)](_0xb8b63b,_0x562daa);return this[_0x511bba(0x361)][_0x511bba(0x43c)](_0x39750a);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x22a)]=Game_Event['prototype'][_0x2ee1ea(0x684)],Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x684)]=function(){const _0x36dd13=_0x2ee1ea;return this[_0x36dd13(0x426)]=![],this[_0x36dd13(0x51a)]=![],this[_0x36dd13(0x1f5)]()?VisuMZ[_0x36dd13(0x3f3)][_0x36dd13(0x22a)][_0x36dd13(0x29e)](this):-0x1;},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x1a9)]=Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x3b7)],Game_Event[_0x2ee1ea(0x532)]['meetsConditions']=function(_0x3ca92b){const _0x20bd49=_0x2ee1ea;this[_0x20bd49(0x643)](_0x3ca92b),$gameTemp[_0x20bd49(0x305)](this);const _0x414f8f=VisuMZ[_0x20bd49(0x3f3)][_0x20bd49(0x1a9)][_0x20bd49(0x29e)](this,_0x3ca92b);return $gameTemp[_0x20bd49(0x622)](),_0x414f8f;},Game_Event['prototype'][_0x2ee1ea(0x50a)]=function(){return this['_advancedSwitchVariable'];},Game_Event['prototype'][_0x2ee1ea(0x643)]=function(_0x4c7a19){const _0x37e9e5=_0x2ee1ea,_0x584fe0=_0x4c7a19['conditions'];if(_0x584fe0[_0x37e9e5(0x67d)]&&DataManager[_0x37e9e5(0x440)](_0x584fe0[_0x37e9e5(0x324)])){if(_0x37e9e5(0x428)===_0x37e9e5(0x392))return _0x8766e8['EventsMoveCore'][_0x37e9e5(0x44c)][_0x37e9e5(0x68c)][_0x37e9e5(0x510)];else this[_0x37e9e5(0x426)]=!![];}else{if(_0x584fe0[_0x37e9e5(0x4e0)]&&DataManager[_0x37e9e5(0x440)](_0x584fe0[_0x37e9e5(0x5fc)]))this['_advancedSwitchVariable']=!![];else _0x584fe0[_0x37e9e5(0x30e)]&&DataManager[_0x37e9e5(0x253)](_0x584fe0[_0x37e9e5(0x1b8)])&&(this['_advancedSwitchVariable']=!![]);}},Game_Event[_0x2ee1ea(0x532)]['hasClickTrigger']=function(){const _0x137853=_0x2ee1ea;if(this['_erased'])return![];return this[_0x137853(0x2ae)];},Game_Event[_0x2ee1ea(0x532)]['onClickTrigger']=function(){const _0x41c095=_0x2ee1ea;$gameTemp['clearDestination'](),this[_0x41c095(0x547)]();},Game_Event[_0x2ee1ea(0x532)]['pos']=function(_0x257c50,_0x47ce2c){const _0x159b9b=_0x2ee1ea;return this['_addedHitbox']?this[_0x159b9b(0x5d9)](_0x257c50,_0x47ce2c):Game_Character[_0x159b9b(0x532)][_0x159b9b(0x51b)][_0x159b9b(0x29e)](this,_0x257c50,_0x47ce2c);},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x5d9)]=function(_0x39297e,_0x53c4bb){const _0x3509de=_0x2ee1ea;var _0x3ca926=this['x']-this['_addedHitbox'][_0x3509de(0x4f3)],_0x1d7f94=this['x']+this['_addedHitbox']['right'],_0x18ceef=this['y']-this[_0x3509de(0x408)]['up'],_0x2419bc=this['y']+this[_0x3509de(0x408)][_0x3509de(0x442)];return _0x3ca926<=_0x39297e&&_0x39297e<=_0x1d7f94&&_0x18ceef<=_0x53c4bb&&_0x53c4bb<=_0x2419bc;},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x5e8)]=function(_0x3606a7,_0x36cb17,_0x40bb0c){const _0x38abe5=_0x2ee1ea;for(let _0x56f98=-this[_0x38abe5(0x408)][_0x38abe5(0x4f3)];_0x56f98<=this['_addedHitbox']['right'];_0x56f98++){if(_0x38abe5(0x1cb)==='lSTTm')for(let _0x335639=-this['_addedHitbox']['up'];_0x335639<=this[_0x38abe5(0x408)][_0x38abe5(0x442)];_0x335639++){if(!Game_Character[_0x38abe5(0x532)][_0x38abe5(0x5e8)][_0x38abe5(0x29e)](this,_0x3606a7+_0x56f98,_0x36cb17+_0x335639,_0x40bb0c)){if(_0x38abe5(0x4fa)===_0x38abe5(0x4fa))return![];else this[_0x38abe5(0x65a)]=_0x5358e7[_0x38abe5(0x22c)](this[_0x38abe5(0x2f1)]()),this[_0x38abe5(0x383)]=!![];}}else{const _0x1d1c7a=_0x59e94e[_0x38abe5(0x235)](this['moveSynchTarget']());this['executeMoveDir8'](this[_0x38abe5(0x406)](_0x1d1c7a['lastMovedDirection']()));}}return!![];},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x47f)]=function(_0xf267c9,_0x46efa0){const _0x532dcc=_0x2ee1ea;if(Imported['VisuMZ_0_CoreEngine']&&this[_0x532dcc(0x378)]()){if('XjXRP'===_0x532dcc(0x283)){if([0x2,0x4,0x6,0x8][_0x532dcc(0x43c)](_0x3266a3))return 0x2;if([0x1,0x3,0x7,0x9][_0x532dcc(0x43c)](_0x37695a))return 0x3;}else return this[_0x532dcc(0x2cf)](_0xf267c9,_0x46efa0);}else{if(_0x532dcc(0x19c)===_0x532dcc(0x55b))return![];else{const _0x30ee78=$gameMap[_0x532dcc(0x185)](_0xf267c9,_0x46efa0)[_0x532dcc(0x6a2)](_0x562eea=>_0x562eea!==this);return _0x30ee78[_0x532dcc(0x5e6)]>0x0;}}},Game_Event['prototype']['checkSmartEventCollision']=function(_0x485f22,_0x259389){const _0x156691=_0x2ee1ea;if(!this['isNormalPriority']()){if(_0x156691(0x6ae)===_0x156691(0x6ae))return![];else{let _0x203dcf=_0x683c8d[_0x156691(0x1f1)][0x0];_0x203dcf=this['convertVariableValuesInScriptCall'](_0x203dcf),_0x203dcf=this[_0x156691(0x366)](_0x203dcf),this[_0x156691(0x218)](_0x370077,_0x203dcf);}}else{if(_0x156691(0x591)===_0x156691(0x591)){const _0x8b9d81=$gameMap[_0x156691(0x185)](_0x485f22,_0x259389)[_0x156691(0x6a2)](_0x449c57=>_0x449c57!==this&&_0x449c57[_0x156691(0x381)]());return _0x8b9d81[_0x156691(0x5e6)]>0x0;}else{if(this[_0x156691(0x61a)]()){const _0x473fab=['',_0x156691(0x566),'QUESTION',_0x156691(0x53f),_0x156691(0x34d),'ANGER',_0x156691(0x1cf),_0x156691(0x482),_0x156691(0x256),_0x156691(0x3f7),_0x156691(0x37f),'','','','',''][_0x91f9d2];this[_0x156691(0x3bc)](_0x473fab,_0x549074);}}}},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x26b)]=function(){const _0x20e88c=_0x2ee1ea;return this[_0x20e88c(0x517)]['type']||'none';},Game_Event[_0x2ee1ea(0x532)]['activationProximityDistance']=function(){const _0x41b81d=_0x2ee1ea;return this[_0x41b81d(0x517)][_0x41b81d(0x2d1)]||0x0;},Game_Event['prototype']['activationRegionList']=function(){const _0x2a1f9d=_0x2ee1ea;return this[_0x2a1f9d(0x517)]['regionList']||[];},Game_Event['prototype'][_0x2ee1ea(0x286)]=function(){const _0x4d8d9f=_0x2ee1ea;Game_Character[_0x4d8d9f(0x532)][_0x4d8d9f(0x286)][_0x4d8d9f(0x29e)](this);if([_0x4d8d9f(0x695),_0x4d8d9f(0x523)]['includes'](this[_0x4d8d9f(0x26b)]()))return;$gamePlayer[_0x4d8d9f(0x39d)]([0x2]);},VisuMZ[_0x2ee1ea(0x3f3)]['Game_Event_checkEventTriggerAuto']=Game_Event[_0x2ee1ea(0x532)]['checkEventTriggerAuto'],Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x5d2)]=function(){const _0x40f591=_0x2ee1ea;if(this[_0x40f591(0x673)]!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this[_0x40f591(0x4c9)](![]))return;if(!this[_0x40f591(0x527)](![]))return;VisuMZ[_0x40f591(0x3f3)]['Game_Event_checkEventTriggerAuto'][_0x40f591(0x29e)](this);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x578)]=Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x553)],Game_Event[_0x2ee1ea(0x532)]['updateParallel']=function(){const _0x29c641=_0x2ee1ea;if(!this[_0x29c641(0x4fc)])return;if(!this[_0x29c641(0x4c9)](!![]))return;if(!this[_0x29c641(0x527)](!![]))return;VisuMZ[_0x29c641(0x3f3)]['Game_Event_updateParallel']['call'](this);},Game_Event['prototype'][_0x2ee1ea(0x4c9)]=function(_0x126c75){const _0x1ad070=_0x2ee1ea;if(!_0x126c75&&$gameMap[_0x1ad070(0x5ff)]())return![];if(!_0x126c75&&$gameMap[_0x1ad070(0x4f9)]())return![];if(this[_0x1ad070(0x693)]()<=0x0)return!![];return $gamePlayer[_0x1ad070(0x5fe)](this);},Game_Event[_0x2ee1ea(0x532)]['checkActivationProximity']=function(_0x192412){const _0x4a49f9=_0x2ee1ea;if(!_0x192412&&$gameMap['isEventRunning']())return![];if(!_0x192412&&$gameMap[_0x4a49f9(0x4f9)]())return![];if([_0x4a49f9(0x695),_0x4a49f9(0x523)][_0x4a49f9(0x43c)](this[_0x4a49f9(0x26b)]()))return!![];return $gamePlayer[_0x4a49f9(0x3d4)](this);},VisuMZ['MoveAllSynchTargets']=function(_0x464ac8){const _0x368202=_0x2ee1ea;for(const _0xd32eb3 of $gameMap[_0x368202(0x560)]()){if(_0x368202(0x5e9)===_0x368202(0x5e9)){if(!_0xd32eb3)continue;if(_0xd32eb3[_0x368202(0x18d)]()===_0x464ac8){if(_0x368202(0x213)!==_0x368202(0x213)){if(this['_PreservedEventMorphData']===_0x51ebc4)this['initEventsMoveCore']();const _0x4a6740=_0x368202(0x6a3)[_0x368202(0x41e)](_0x47249d,_0x23bfb6);delete this[_0x368202(0x2f6)][_0x4a6740];}else _0xd32eb3[_0x368202(0x5c0)]();}}else this['x']+=_0x1ac707[_0x368202(0x3f3)][_0x368202(0x44c)]['VS8'][_0x368202(0x219)],this['y']+=_0x35407f[_0x368202(0x3f3)][_0x368202(0x44c)][_0x368202(0x1f0)][_0x368202(0x4bb)];}},VisuMZ[_0x2ee1ea(0x235)]=function(_0x27924e){const _0x570eab=_0x2ee1ea;if(_0x27924e===0x0)return $gamePlayer;return $gameMap[_0x570eab(0x1f5)](_0x27924e);},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x18d)]=function(){const _0x415775=_0x2ee1ea;return this[_0x415775(0x20a)][_0x415775(0x18e)];},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x284)]=function(){const _0x328a33=_0x2ee1ea;return this[_0x328a33(0x20a)]['type'];},Game_Event['prototype'][_0x2ee1ea(0x5a9)]=function(){const _0x3ccd95=_0x2ee1ea;if(this['moveSynchTarget']()>=0x0){const _0x49cbc1=VisuMZ[_0x3ccd95(0x235)](this['moveSynchTarget']());if(_0x49cbc1)return _0x49cbc1[_0x3ccd95(0x5a9)]();}return Game_Character[_0x3ccd95(0x532)][_0x3ccd95(0x5a9)][_0x3ccd95(0x29e)](this);},Game_Event[_0x2ee1ea(0x532)]['updateMoveSynch']=function(){const _0x4f6fa9=_0x2ee1ea;this[_0x4f6fa9(0x20a)][_0x4f6fa9(0x2ce)]=this[_0x4f6fa9(0x20a)][_0x4f6fa9(0x2ce)]||0x0,this[_0x4f6fa9(0x20a)][_0x4f6fa9(0x2ce)]--;if(this[_0x4f6fa9(0x20a)][_0x4f6fa9(0x2ce)]>0x0)return;this[_0x4f6fa9(0x20a)][_0x4f6fa9(0x2ce)]=this[_0x4f6fa9(0x20a)][_0x4f6fa9(0x2be)],this['processMoveSynch']();},Game_Event[_0x2ee1ea(0x532)]['adjustMoveSynchOpacityDelta']=function(_0x581988){const _0x1a57aa=_0x2ee1ea;if(this[_0x1a57aa(0x18d)]()>=0x0){if(_0x1a57aa(0x543)!==_0x1a57aa(0x42c)){const _0x14851d=VisuMZ[_0x1a57aa(0x235)](this[_0x1a57aa(0x18d)]());if(_0x14851d){const _0x417f8c=$gameMap[_0x1a57aa(0x2d1)](this['_realX'],this[_0x1a57aa(0x687)],_0x14851d[_0x1a57aa(0x1b6)],_0x14851d[_0x1a57aa(0x687)])-0x1,_0x3fba9f=Math[_0x1a57aa(0x581)]($gameMap[_0x1a57aa(0x3e0)](),$gameMap[_0x1a57aa(0x565)]()),_0x28b49c=this['_moveSynch']['opacityDelta']||0x0;_0x581988-=Math[_0x1a57aa(0x1e1)](0x0,_0x417f8c)*_0x3fba9f*_0x28b49c;}}else _0x423509['EventsMoveCore'][_0x1a57aa(0x425)]['call'](this),_0x268bcc['VisuMZ_1_MessageCore']&&_0x560db3['isPressed'](_0x487b5b[_0x1a57aa(0x39c)][_0x1a57aa(0x44c)][_0x1a57aa(0x388)][_0x1a57aa(0x499)])&&_0x5b19fd['clear']();}return _0x581988;},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x683)]=function(){const _0x1434e8=_0x2ee1ea;switch(this[_0x1434e8(0x284)]()){case _0x1434e8(0x4cf):this[_0x1434e8(0x62a)]();break;case _0x1434e8(0x4c0):this[_0x1434e8(0x541)]();break;case'away':this[_0x1434e8(0x4cc)]();break;case _0x1434e8(0x251):this[_0x1434e8(0x23c)]();break;case _0x1434e8(0x460):case'copy':this[_0x1434e8(0x575)]();break;case _0x1434e8(0x405):case _0x1434e8(0x443):this[_0x1434e8(0x20b)]();break;case'mirror\x20horizontal':case _0x1434e8(0x2cc):case'mirror\x20horz':case _0x1434e8(0x308):this[_0x1434e8(0x3dd)]();break;case _0x1434e8(0x317):case _0x1434e8(0x585):case _0x1434e8(0x2a0):case _0x1434e8(0x5bb):this[_0x1434e8(0x3cb)]();break;default:this['processMoveSynchRandom']();break;}this[_0x1434e8(0x40f)]();},Game_Event[_0x2ee1ea(0x532)]['processMoveSynchRandom']=function(){const _0x5d7adf=_0x2ee1ea,_0x35a203=[0x2,0x4,0x6,0x8];$gameMap['isSupportDiagonalMovement']()&&(_0x5d7adf(0x336)!==_0x5d7adf(0x336)?(this['_forceShowFollower']=!![],this[_0x5d7adf(0x5e3)]=![]):_0x35a203[_0x5d7adf(0x605)](0x1,0x3,0x7,0x9));const _0x556617=[];for(const _0x3db4f3 of _0x35a203){if(this['canPass'](this['x'],this['y'],_0x3db4f3))_0x556617['push'](_0x3db4f3);}if(_0x556617[_0x5d7adf(0x5e6)]>0x0){const _0x401a11=_0x556617[Math[_0x5d7adf(0x339)](_0x556617[_0x5d7adf(0x5e6)])];this[_0x5d7adf(0x1cd)](_0x401a11);}},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x541)]=function(){const _0x1ad3c9=_0x2ee1ea,_0x3b90fd=VisuMZ[_0x1ad3c9(0x235)](this[_0x1ad3c9(0x18d)]());this[_0x1ad3c9(0x387)](_0x3b90fd);},Game_Event[_0x2ee1ea(0x532)]['processMoveSynchAway']=function(){const _0x8057c9=_0x2ee1ea,_0x20ad73=VisuMZ[_0x8057c9(0x235)](this[_0x8057c9(0x18d)]());this[_0x8057c9(0x6b3)](_0x20ad73);},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x23c)]=function(){this['updateRoutineMove']();},Game_Event['prototype'][_0x2ee1ea(0x575)]=function(){const _0x5b66a8=_0x2ee1ea,_0x5abf6d=VisuMZ[_0x5b66a8(0x235)](this[_0x5b66a8(0x18d)]());this[_0x5b66a8(0x1cd)](_0x5abf6d[_0x5b66a8(0x4bc)]());},Game_Event[_0x2ee1ea(0x532)]['processMoveSynchReverseMimic']=function(){const _0x559df8=_0x2ee1ea,_0x318577=VisuMZ[_0x559df8(0x235)](this['moveSynchTarget']());this[_0x559df8(0x1cd)](this[_0x559df8(0x406)](_0x318577['lastMovedDirection']()));},Game_Event[_0x2ee1ea(0x532)]['processMoveSynchMirrorHorz']=function(){const _0x120efe=_0x2ee1ea,_0x55f108=VisuMZ[_0x120efe(0x235)](this[_0x120efe(0x18d)]()),_0x2af875=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x55f108[_0x120efe(0x4bc)]()];this[_0x120efe(0x1cd)](_0x2af875);},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x3cb)]=function(){const _0x4e3eca=_0x2ee1ea,_0x4096bc=VisuMZ[_0x4e3eca(0x235)](this[_0x4e3eca(0x18d)]()),_0x3a0664=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x4096bc[_0x4e3eca(0x4bc)]()];this[_0x4e3eca(0x1cd)](_0x3a0664);},Game_Event['prototype'][_0x2ee1ea(0x60e)]=function(){const _0x5ba5bc=_0x2ee1ea,_0x5709ec=$gameSystem['getSavedEventLocation'](this);if(!_0x5709ec)return;this['locate'](_0x5709ec['x'],_0x5709ec['y']),this[_0x5ba5bc(0x1c4)](_0x5709ec[_0x5ba5bc(0x632)]),this['_pageIndex']===_0x5709ec['pageIndex']&&('DKZFp'===_0x5ba5bc(0x4f5)?(this[_0x5ba5bc(0x2b2)]=![],this['_forceHideFollower']=!![]):this[_0x5ba5bc(0x557)]=_0x5709ec[_0x5ba5bc(0x676)]);},Game_Event['prototype'][_0x2ee1ea(0x62c)]=function(){const _0x47b211=_0x2ee1ea;Game_Character[_0x47b211(0x532)][_0x47b211(0x62c)][_0x47b211(0x29e)](this),this[_0x47b211(0x505)]();},Game_Event[_0x2ee1ea(0x532)]['isSaveEventLocation']=function(){const _0x286d6f=_0x2ee1ea;if($gameMap[_0x286d6f(0x4d9)]())return!![];return this[_0x286d6f(0x325)];},Game_Event[_0x2ee1ea(0x532)]['autosaveEventLocation']=function(){const _0x2cce7f=_0x2ee1ea;if(!this[_0x2cce7f(0x6a8)]())return;this[_0x2cce7f(0x28e)]();},Game_Event['prototype'][_0x2ee1ea(0x28e)]=function(){const _0x54349a=_0x2ee1ea;$gameSystem[_0x54349a(0x28e)](this);},Game_Event['prototype'][_0x2ee1ea(0x65b)]=function(){const _0x216a7c=_0x2ee1ea;$gameSystem[_0x216a7c(0x2bd)](this);},Game_Event['prototype'][_0x2ee1ea(0x503)]=function(){const _0x138bfa=_0x2ee1ea;if($gameSystem[_0x138bfa(0x503)](this))return Game_Character[_0x138bfa(0x532)][_0x138bfa(0x503)]['call'](this);else{if(_0x138bfa(0x597)!=='PlELd')return{'iconIndex':0x0,'bufferX':settings[_0x138bfa(0x195)][_0x138bfa(0x4b0)],'bufferY':settings[_0x138bfa(0x195)]['BufferY'],'blendMode':settings[_0x138bfa(0x195)][_0x138bfa(0x3ec)]};else{const _0x1d61f9=this[_0x138bfa(0x5f4)],_0x4cfce6=this[_0x138bfa(0x1c8)],_0x3d95ba=this[_0x138bfa(0x2bf)](_0x3b4237);return this[_0x138bfa(0x5ef)](_0x1d61f9,_0x4cfce6,_0x3d95ba);}}},Game_Event['prototype'][_0x2ee1ea(0x2b8)]=function(){const _0x740c42=_0x2ee1ea;return this[_0x740c42(0x51a)];},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x1b1)]=Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x3b7)],Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x3b7)]=function(_0xaf7112){const _0xcb8830=_0x2ee1ea,_0x22ba6c=VisuMZ[_0xcb8830(0x3f3)]['Game_Event_meetsConditionsCPC']['call'](this,_0xaf7112);if(!_0x22ba6c)return![];return this[_0xcb8830(0x3ed)](_0xaf7112);},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x3ed)]=function(_0x1e5f13){const _0x4a6432=_0x2ee1ea;VisuMZ['EventsMoveCore'][_0x4a6432(0x372)][_0x4a6432(0x221)](_0x1e5f13),this[_0x4a6432(0x51a)]=_0x1e5f13['CPC'][_0x4a6432(0x5e6)]>0x0;_0x1e5f13['CPC']===undefined&&VisuMZ[_0x4a6432(0x3f3)]['CustomPageConditions'][_0x4a6432(0x221)](_0x1e5f13);if(_0x1e5f13[_0x4a6432(0x4de)][_0x4a6432(0x5e6)]>0x0){if(_0x4a6432(0x6b0)!==_0x4a6432(0x1b5))return $gameMap[_0x4a6432(0x1f5)](this[_0x4a6432(0x25c)])&&VisuMZ[_0x4a6432(0x3f3)]['CustomPageConditions'][_0x4a6432(0x1dd)](_0x1e5f13[_0x4a6432(0x4de)],this[_0x4a6432(0x25c)]);else{if(_0x1aad67)return _0x46314a;}}return!![];},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x47e)]=Game_Troop['prototype'][_0x2ee1ea(0x3b7)],Game_Troop['prototype']['meetsConditions']=function(_0x1d67aa){const _0x3d6f35=_0x2ee1ea;var _0x263a24=VisuMZ[_0x3d6f35(0x3f3)][_0x3d6f35(0x47e)][_0x3d6f35(0x29e)](this,_0x1d67aa);return _0x263a24&&this['CPCsMet'](_0x1d67aa);},Game_Troop[_0x2ee1ea(0x532)][_0x2ee1ea(0x5db)]=function(_0x55a75d){const _0x20684b=_0x2ee1ea;_0x55a75d['CPC']===undefined&&('irYWR'!=='irYWR'?this['_lastPluginCommandInterpreter']=_0x551e37:VisuMZ[_0x20684b(0x3f3)][_0x20684b(0x372)][_0x20684b(0x221)](_0x55a75d));if(_0x55a75d[_0x20684b(0x4de)][_0x20684b(0x5e6)]>0x0)return VisuMZ[_0x20684b(0x3f3)][_0x20684b(0x372)][_0x20684b(0x1dd)](_0x55a75d['CPC'],0x0);return!![];},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x1da)]=Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x4da)],Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x4da)]=function(_0x25256f,_0x4d0413){const _0x310c53=_0x2ee1ea;VisuMZ['EventsMoveCore'][_0x310c53(0x1da)]['call'](this,_0x25256f,_0x4d0413),this['_randomHomeX']=_0x25256f,this['_randomHomeY']=_0x4d0413,this[_0x310c53(0x505)]();},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x3b6)]=Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x3d2)],Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x3d2)]=function(){const _0x41bf13=_0x2ee1ea,_0x2d0846=$gameMap[_0x41bf13(0x2d1)](this['x'],this['y'],this['_randomHomeX'],this[_0x41bf13(0x1c8)]),_0x456fc8=_0x2d0846*(this[_0x41bf13(0x49f)]||0x0);Math[_0x41bf13(0x4cf)]()>=_0x456fc8?_0x41bf13(0x447)===_0x41bf13(0x447)?VisuMZ[_0x41bf13(0x3f3)][_0x41bf13(0x3b6)][_0x41bf13(0x29e)](this):_0xebad07=![]:this[_0x41bf13(0x246)]();},Game_Event[_0x2ee1ea(0x532)][_0x2ee1ea(0x246)]=function(){const _0x4cb67c=_0x2ee1ea,_0x58070d=this[_0x4cb67c(0x66a)](this['_randomHomeX']),_0x36af84=this['deltaYFrom'](this['_randomHomeY']);if(Math[_0x4cb67c(0x3c0)](_0x58070d)>Math[_0x4cb67c(0x3c0)](_0x36af84)){this['moveStraight'](_0x58070d>0x0?0x4:0x6);if(!this[_0x4cb67c(0x516)]()&&_0x36af84!==0x0){if(_0x4cb67c(0x694)!=='hsxSp')this[_0x4cb67c(0x37c)](_0x36af84>0x0?0x8:0x2);else{if(!this[_0x4cb67c(0x204)](_0x14fac8))return;let _0x210f39;const _0x31a582=_0x581e8d[_0x4cb67c(0x3f3)][_0x4cb67c(0x44c)]['Label'][_0x4cb67c(0x57e)]??!![];_0x210f39=_0x31a582?new _0x3524c5(_0x500913):new _0x126a65(_0x198121),_0x210f39['z']=0x8,_0x210f39[_0x4cb67c(0x337)]=_0x24626b['_counter']++,this[_0x4cb67c(0x32a)][_0x4cb67c(0x69b)](_0x210f39),this['_labelWindows'][_0x4cb67c(0x605)](_0x210f39);}}}else _0x36af84!==0x0&&(this['moveStraight'](_0x36af84>0x0?0x8:0x2),!this[_0x4cb67c(0x516)]()&&_0x58070d!==0x0&&this[_0x4cb67c(0x37c)](_0x58070d>0x0?0x4:0x6));},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x486)]=function(){const _0x213e14=_0x2ee1ea;this[_0x213e14(0x2e7)]={'filename':'','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x2b0)]=function(){const _0x58c7ac=_0x2ee1ea;if(this['_attachPicture']===undefined)this[_0x58c7ac(0x486)]();return this['_attachPicture'];},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x1c3)]=function(){const _0x10367e=_0x2ee1ea;return this['attachPictureSettings']()[_0x10367e(0x319)]??'';},Game_CharacterBase['prototype'][_0x2ee1ea(0x681)]=function(){const _0x4ee52c=_0x2ee1ea;return this['attachPictureSettings']()[_0x4ee52c(0x444)]??0x0;},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x29c)]=function(){const _0x80cdb8=_0x2ee1ea;return this[_0x80cdb8(0x2b0)]()['maxSize']??0x0;},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x521)]=function(){const _0x3cf84d=_0x2ee1ea;return this[_0x3cf84d(0x2b0)]()[_0x3cf84d(0x5b7)]??0x0;},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x3a1)]=function(){const _0x1f58b9=_0x2ee1ea;return this[_0x1f58b9(0x2b0)]()[_0x1f58b9(0x65e)]??0x0;},Game_CharacterBase[_0x2ee1ea(0x532)][_0x2ee1ea(0x278)]=function(){const _0x2b5a3e=_0x2ee1ea;return this[_0x2b5a3e(0x2b0)]()[_0x2b5a3e(0x489)]??0x1;},VisuMZ[_0x2ee1ea(0x3f3)]['Game_Interpreter_updateWaitMode']=Game_Interpreter['prototype']['updateWaitMode'],Game_Interpreter[_0x2ee1ea(0x532)][_0x2ee1ea(0x429)]=function(){const _0x15e5bd=_0x2ee1ea;if(this['_waitMode']===_0x15e5bd(0x487)){if(window[this['_callEventMap']])this[_0x15e5bd(0x357)]='',this[_0x15e5bd(0x67b)]();else return!![];}else return VisuMZ[_0x15e5bd(0x3f3)][_0x15e5bd(0x370)][_0x15e5bd(0x29e)](this);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x298)]=Game_Interpreter[_0x2ee1ea(0x532)][_0x2ee1ea(0x22d)],Game_Interpreter[_0x2ee1ea(0x532)][_0x2ee1ea(0x22d)]=function(){const _0x47b59c=_0x2ee1ea,_0x931619=$gameMap&&this['_eventId']?$gameMap[_0x47b59c(0x1f5)](this[_0x47b59c(0x25c)]):null;$gameTemp[_0x47b59c(0x305)](_0x931619);const _0xe422b2=VisuMZ[_0x47b59c(0x3f3)][_0x47b59c(0x298)]['call'](this);return $gameTemp[_0x47b59c(0x622)](),_0xe422b2;},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x615)]=Game_Interpreter[_0x2ee1ea(0x532)][_0x2ee1ea(0x40e)],Game_Interpreter['prototype'][_0x2ee1ea(0x40e)]=function(_0x40f3f0){const _0x53400c=_0x2ee1ea;return $gameTemp[_0x53400c(0x45f)](this),VisuMZ[_0x53400c(0x3f3)][_0x53400c(0x615)][_0x53400c(0x29e)](this,_0x40f3f0);},Game_Interpreter[_0x2ee1ea(0x532)][_0x2ee1ea(0x25e)]=function(_0x58878f){const _0xf5ca91=_0x2ee1ea;this[_0xf5ca91(0x4c3)]=_0x58878f;const _0x3a7f84=_0xf5ca91(0x571)[_0xf5ca91(0x41e)](_0x58878f[_0xf5ca91(0x2f1)][_0xf5ca91(0x491)](0x3));this[_0xf5ca91(0x506)]='$callEventMap'+Graphics[_0xf5ca91(0x6b6)]+'_'+this[_0xf5ca91(0x639)](),DataManager[_0xf5ca91(0x508)](this[_0xf5ca91(0x506)],_0x3a7f84),window[this[_0xf5ca91(0x506)]]?this[_0xf5ca91(0x67b)]():this[_0xf5ca91(0x680)](_0xf5ca91(0x487));},Game_Interpreter[_0x2ee1ea(0x532)][_0x2ee1ea(0x67b)]=function(){const _0x144417=_0x2ee1ea,_0xaaae4b=this[_0x144417(0x4c3)],_0x23f447=window[this[_0x144417(0x506)]],_0x10100f=_0x23f447[_0x144417(0x560)][_0xaaae4b[_0x144417(0x639)]];if(_0x10100f&&_0x10100f[_0x144417(0x604)][_0xaaae4b[_0x144417(0x1ac)]-0x1]){if(_0x144417(0x3f9)==='EjurF')return this['attachPictureSettings']()[_0x144417(0x489)]??0x1;else{const _0x1e940b=_0x10100f['pages'][_0xaaae4b[_0x144417(0x1ac)]-0x1][_0x144417(0x4a4)];this[_0x144417(0x4f8)](_0x1e940b,this[_0x144417(0x639)]());}}window[this['_callEventMap']]=undefined,this[_0x144417(0x506)]=undefined,this[_0x144417(0x4c3)]=undefined;};function Game_CPCInterpreter(){const _0x182666=_0x2ee1ea;this[_0x182666(0x457)]['apply'](this,arguments);};Game_CPCInterpreter['prototype']=Object[_0x2ee1ea(0x569)](Game_Interpreter[_0x2ee1ea(0x532)]),Game_CPCInterpreter[_0x2ee1ea(0x532)][_0x2ee1ea(0x3db)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x2ee1ea(0x532)][_0x2ee1ea(0x5f7)]=function(){const _0x3c97c5=_0x2ee1ea;Game_Interpreter[_0x3c97c5(0x532)]['clear'][_0x3c97c5(0x29e)](this),this[_0x3c97c5(0x472)]=![];},Game_CPCInterpreter[_0x2ee1ea(0x532)]['execute']=function(){const _0x4067ce=_0x2ee1ea;while(this[_0x4067ce(0x613)]()){this[_0x4067ce(0x22d)]();}},Game_CPCInterpreter[_0x2ee1ea(0x532)][_0x2ee1ea(0x536)]=function(_0x5ac354){const _0x428e3d=_0x2ee1ea;while(this['isRunning']()){this[_0x428e3d(0x329)](_0x5ac354);}},Game_CPCInterpreter[_0x2ee1ea(0x532)][_0x2ee1ea(0x329)]=function(_0x58b3a5){const _0x1b4b93=_0x2ee1ea,_0x5e2c2b=_0x58b3a5;$gameTemp[_0x1b4b93(0x305)](_0x5e2c2b);const _0x2e55dd=VisuMZ[_0x1b4b93(0x3f3)][_0x1b4b93(0x298)][_0x1b4b93(0x29e)](this);return $gameTemp[_0x1b4b93(0x622)](),_0x2e55dd;},Game_CPCInterpreter[_0x2ee1ea(0x532)][_0x2ee1ea(0x501)]=function(_0x14204e){const _0x20c9ee=_0x2ee1ea;return Game_Interpreter[_0x20c9ee(0x532)][_0x20c9ee(0x501)]['call'](this,_0x14204e),this['_comments'][_0x20c9ee(0x200)](_0x3657db=>_0x3657db[_0x20c9ee(0x640)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x20c9ee(0x472)]=!![]),!![];},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x4a2)]=Scene_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x47c)],Scene_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x47c)]=function(){const _0x11ce42=_0x2ee1ea;VisuMZ[_0x11ce42(0x3f3)][_0x11ce42(0x4a2)][_0x11ce42(0x29e)](this),this[_0x11ce42(0x561)][_0x11ce42(0x4be)]();},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x69d)]=Scene_Load[_0x2ee1ea(0x532)]['onLoadSuccess'],Scene_Load[_0x2ee1ea(0x532)][_0x2ee1ea(0x5dd)]=function(){const _0xdb014a=_0x2ee1ea;if($gameMap)$gameMap[_0xdb014a(0x427)]();VisuMZ['EventsMoveCore'][_0xdb014a(0x69d)][_0xdb014a(0x29e)](this);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x59e)]=Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x5a1)],Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x5a1)]=function(){const _0x32d8ab=_0x2ee1ea;VisuMZ[_0x32d8ab(0x3f3)][_0x32d8ab(0x59e)][_0x32d8ab(0x29e)](this),this['initMembersEventsMoveCore'](),this[_0x32d8ab(0x5cb)](),this[_0x32d8ab(0x3c9)]();},Sprite_Character['prototype'][_0x2ee1ea(0x4f6)]=function(){const _0x1b68a2=_0x2ee1ea;this[_0x1b68a2(0x51d)]=0xff;},Sprite_Character[_0x2ee1ea(0x532)]['createAttachPictureSprite']=function(){const _0x43a2bf=_0x2ee1ea;this[_0x43a2bf(0x607)]=new Sprite(),this[_0x43a2bf(0x607)][_0x43a2bf(0x432)]['x']=0.5,this[_0x43a2bf(0x607)][_0x43a2bf(0x432)]['y']=0x1,this['addChild'](this['_attachPictureSprite']),this[_0x43a2bf(0x5ec)]();},Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x3c9)]=function(){const _0x34d8d1=_0x2ee1ea;this[_0x34d8d1(0x4a7)]=new Sprite(),this['_eventIconSprite'][_0x34d8d1(0x21f)]=ImageManager['loadSystem'](_0x34d8d1(0x580)),this[_0x34d8d1(0x4a7)]['bitmap'][_0x34d8d1(0x20f)]=![],this[_0x34d8d1(0x4a7)][_0x34d8d1(0x334)](0x0,0x0,0x0,0x0),this['_eventIconSprite'][_0x34d8d1(0x432)]['x']=0.5,this[_0x34d8d1(0x4a7)]['anchor']['y']=0x1,this[_0x34d8d1(0x69b)](this[_0x34d8d1(0x4a7)]);},Sprite_Character[_0x2ee1ea(0x532)]['isSpriteVS8dir']=function(){const _0x4157e2=_0x2ee1ea;return this[_0x4157e2(0x471)]&&this[_0x4157e2(0x471)][_0x4157e2(0x640)](/\[VS8\]/i);},Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x540)]=function(){const _0x1a547e=_0x2ee1ea;return this[_0x1a547e(0x61a)]()&&VisuMZ[_0x1a547e(0x3f3)][_0x1a547e(0x44c)][_0x1a547e(0x1f0)][_0x1a547e(0x4f4)];},VisuMZ[_0x2ee1ea(0x3f3)]['Sprite_Character_update']=Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x40f)],Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x40f)]=function(){const _0x3e91dc=_0x2ee1ea;VisuMZ[_0x3e91dc(0x3f3)][_0x3e91dc(0x182)][_0x3e91dc(0x29e)](this),this[_0x3e91dc(0x609)]();},Sprite_Character['prototype'][_0x2ee1ea(0x5ac)]=function(){const _0x175acc=_0x2ee1ea;Sprite['prototype'][_0x175acc(0x5ac)][_0x175acc(0x29e)](this),this['isEventsMoveCoreInvisible']()&&(this[_0x175acc(0x2e4)]=![]);},Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x4aa)]=function(){const _0x4d4d57=_0x2ee1ea;if(this[_0x4d4d57(0x68f)]()>0x0)return![];if(this[_0x4d4d57(0x345)]){if(this[_0x4d4d57(0x345)][_0x4d4d57(0x1c3)]()!=='')return![];}return this['isEmptyCharacter']()||this['_character']&&this[_0x4d4d57(0x345)][_0x4d4d57(0x202)]();},Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x609)]=function(){const _0x1cbf88=_0x2ee1ea;this['updateTilt'](),this['updateShadow'](),this['updateEventIconSprite'](),this['updateEventCustomZ'](),this[_0x1cbf88(0x5f8)](),this['updateAttachPictureSprite']();},VisuMZ[_0x2ee1ea(0x3f3)]['Sprite_Character_setTileBitmap']=Sprite_Character['prototype'][_0x2ee1ea(0x341)],Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x341)]=function(){const _0x3bbe4c=_0x2ee1ea;VisuMZ[_0x3bbe4c(0x3f3)][_0x3bbe4c(0x1a0)][_0x3bbe4c(0x29e)](this),this[_0x3bbe4c(0x21f)][_0x3bbe4c(0x614)](this[_0x3bbe4c(0x245)][_0x3bbe4c(0x2bb)](this));},VisuMZ[_0x2ee1ea(0x3f3)]['Sprite_Character_setCharacterBitmap']=Sprite_Character[_0x2ee1ea(0x532)]['setCharacterBitmap'],Sprite_Character['prototype'][_0x2ee1ea(0x21e)]=function(){const _0x53e421=_0x2ee1ea;VisuMZ['EventsMoveCore']['Sprite_Character_setCharacterBitmap'][_0x53e421(0x29e)](this),this[_0x53e421(0x21f)]['addLoadListener'](this[_0x53e421(0x245)]['bind'](this));},Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x245)]=function(){const _0x3df418=_0x2ee1ea;if(!this[_0x3df418(0x21f)])return;this[_0x3df418(0x21f)]['smooth']=!!VisuMZ[_0x3df418(0x3f3)]['Settings'][_0x3df418(0x238)]['BitmapSmoothing'];},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x588)]=Sprite_Character['prototype'][_0x2ee1ea(0x54b)],Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x54b)]=function(){return this['isSpriteVS8dir']()?this['characterPatternYVS8']():this['characterPatternYBasic']();},Sprite_Character['prototype'][_0x2ee1ea(0x1e0)]=function(){const _0x37e3ee=_0x2ee1ea,_0x3d7609=this[_0x37e3ee(0x345)][_0x37e3ee(0x632)]();let _0x47a6df=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this['_character'][_0x37e3ee(0x448)]&&(_0x47a6df=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x47a6df[_0x3d7609]-0x2)/0x2;},Sprite_Character['prototype'][_0x2ee1ea(0x3fa)]=function(){const _0xf49d3e=_0x2ee1ea;let _0x23f919=this['_character']['direction']();if(this[_0xf49d3e(0x345)][_0xf49d3e(0x448)]){if(_0x23f919===0x4)_0xf49d3e(0x1d8)==='gphgB'?_0x23f919=0x6:this['opacity']=0x0;else _0x23f919===0x6&&(_0x23f919=0x4);}return(_0x23f919-0x2)/0x2;},Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x3dc)]=function(){const _0x2f1acf=_0x2ee1ea;if(!VisuMZ[_0x2f1acf(0x3f3)][_0x2f1acf(0x44c)][_0x2f1acf(0x238)][_0x2f1acf(0x333)])return;this[_0x2f1acf(0x554)]=0x0;if(this[_0x2f1acf(0x403)]()){if(_0x2f1acf(0x568)==='Fgepp'){const _0x1ef2e6=VisuMZ[_0x2f1acf(0x3f3)]['Settings']['Movement'],_0x4cef71=this[_0x2f1acf(0x345)][_0x2f1acf(0x632)]();let _0x4253cc=0x0;if([0x1,0x4,0x7][_0x2f1acf(0x43c)](_0x4cef71))_0x4253cc=_0x1ef2e6[_0x2f1acf(0x544)];if([0x3,0x6,0x9][_0x2f1acf(0x43c)](_0x4cef71))_0x4253cc=_0x1ef2e6['TiltRight'];[0x2,0x8][_0x2f1acf(0x43c)](_0x4cef71)&&(_0x4253cc=[-_0x1ef2e6[_0x2f1acf(0x4ab)],0x0,_0x1ef2e6[_0x2f1acf(0x4ab)]][this[_0x2f1acf(0x345)][_0x2f1acf(0x273)]()]);if(this['_reflection'])_0x4253cc*=-0x1;this[_0x2f1acf(0x554)]=_0x4253cc;}else return this[_0x2f1acf(0x320)](_0x1eabd2(_0x282889['$1']));}},Sprite_Character[_0x2ee1ea(0x532)]['isAllowCharacterTilt']=function(){const _0x12aa2c=_0x2ee1ea;if(this[_0x12aa2c(0x411)])return![];return this[_0x12aa2c(0x345)][_0x12aa2c(0x64f)]()&&!this[_0x12aa2c(0x345)][_0x12aa2c(0x1a6)]()&&!this[_0x12aa2c(0x345)][_0x12aa2c(0x3c5)]()&&this['getEventIconIndex']()===0x0;},Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x423)]=function(){const _0x3903b1=_0x2ee1ea;if(!this[_0x3903b1(0x4c5)])return;this['_shadowSprite']['x']=this['_character'][_0x3903b1(0x413)](),this['_shadowSprite']['y']=this[_0x3903b1(0x345)][_0x3903b1(0x474)](),this[_0x3903b1(0x4c5)][_0x3903b1(0x248)]=this[_0x3903b1(0x248)],this[_0x3903b1(0x4c5)]['visible']=this[_0x3903b1(0x345)][_0x3903b1(0x667)](),this[_0x3903b1(0x4c5)][_0x3903b1(0x41f)]=this['_hidden'];if(!this[_0x3903b1(0x345)]['isShadowShrink']()){if('ftLOv'===_0x3903b1(0x18b))this[_0x3903b1(0x4c5)]['scale']['x']=Math[_0x3903b1(0x581)](0x1,this[_0x3903b1(0x4c5)][_0x3903b1(0x489)]['x']+0.1),this[_0x3903b1(0x4c5)][_0x3903b1(0x489)]['y']=Math[_0x3903b1(0x581)](0x1,this[_0x3903b1(0x4c5)]['scale']['y']+0.1);else{if(this[_0x3903b1(0x52f)]<=0x0)return;this[_0x3903b1(0x1d5)]=![],this[_0x3903b1(0x439)]=!![];}}else{if(_0x3903b1(0x497)!=='ZwPvH')this['_shadowSprite'][_0x3903b1(0x489)]['x']=Math[_0x3903b1(0x1e1)](0x0,this[_0x3903b1(0x4c5)][_0x3903b1(0x489)]['x']-0.1),this['_shadowSprite'][_0x3903b1(0x489)]['y']=Math[_0x3903b1(0x1e1)](0x0,this[_0x3903b1(0x4c5)][_0x3903b1(0x489)]['y']-0.1);else{if(this[_0x3903b1(0x38d)]===_0x229906)this[_0x3903b1(0x346)]();if(!_0xdeaefe)return;const _0x1e9d5c='Map%1-Event%2'[_0x3903b1(0x41e)](_0x35b166['_mapId'],_0x5633ed[_0x3903b1(0x25c)]);this[_0x3903b1(0x38d)][_0x1e9d5c]={'direction':_0x392ec8['direction'](),'x':_0x1b149d[_0x3903b1(0x650)](_0x534145['x']),'y':_0x15ee99[_0x3903b1(0x650)](_0x520552['y']),'pageIndex':_0x2f7518[_0x3903b1(0x1e7)],'moveRouteIndex':_0x5d98ba[_0x3903b1(0x557)]};}}},Sprite_Character['prototype'][_0x2ee1ea(0x4e5)]=function(){const _0x711ee9=_0x2ee1ea;if(!this[_0x711ee9(0x4a7)])return;const _0x4d1e91=this[_0x711ee9(0x4a7)],_0xae167a=this[_0x711ee9(0x68f)]();if(_0xae167a<=0x0)return _0x4d1e91[_0x711ee9(0x334)](0x0,0x0,0x0,0x0);else{const _0xeb45d9=ImageManager[_0x711ee9(0x1bc)],_0xdccffb=ImageManager[_0x711ee9(0x1d7)],_0x337e30=_0xae167a%0x10*_0xeb45d9,_0x3f152e=Math['floor'](_0xae167a/0x10)*_0xdccffb;_0x4d1e91['setFrame'](_0x337e30,_0x3f152e,_0xeb45d9,_0xdccffb),this[_0x711ee9(0x2e4)]=!![];}const _0x1b3a10=this[_0x711ee9(0x345)]['getEventIconData']();if(this[_0x711ee9(0x540)]())_0x711ee9(0x4eb)!==_0x711ee9(0x4eb)?this[_0x711ee9(0x20a)]['opacityDelta']=_0x4625bb(_0x1ea849['$1']):this[_0x711ee9(0x206)](_0x4d1e91);else{if(_0x711ee9(0x4a8)!==_0x711ee9(0x5ce))_0x4d1e91['x']=_0x1b3a10?_0x1b3a10[_0x711ee9(0x53c)]:0x0,_0x4d1e91['y']=_0x1b3a10?-this[_0x711ee9(0x199)]+_0x1b3a10['bufferY']:0x0;else return this['directionOnLadderSpriteVS8dir']();}_0x4d1e91[_0x711ee9(0x444)]=_0x1b3a10?_0x1b3a10[_0x711ee9(0x444)]:0x0,this['removeChild'](_0x4d1e91),this[_0x711ee9(0x69b)](_0x4d1e91),_0x4d1e91[_0x711ee9(0x554)]=-this[_0x711ee9(0x554)];},Sprite_Character['prototype'][_0x2ee1ea(0x46f)]=function(){const _0x1cf7d8=_0x2ee1ea;if(!this['_character'])return;if(this[_0x1cf7d8(0x345)][_0x1cf7d8(0x455)]===undefined)return;if(this['_character'][_0x1cf7d8(0x455)]===![])return;this['z']=this['_character'][_0x1cf7d8(0x455)],this['z']<0x0?this['_shadowSprite']['z']=this['z']-0x1:this[_0x1cf7d8(0x4c5)]['z']=0x0;},Sprite_Character[_0x2ee1ea(0x532)]['updateEventMirrorSprite']=function(){const _0x172bd7=_0x2ee1ea;if(!this[_0x172bd7(0x345)])return;let _0x4b42a5=!!this[_0x172bd7(0x345)][_0x172bd7(0x448)];this[_0x172bd7(0x489)]['x']=Math[_0x172bd7(0x3c0)](this[_0x172bd7(0x489)]['x'])*(_0x4b42a5?-0x1:0x1);},Sprite_Character['prototype'][_0x2ee1ea(0x206)]=function(_0x3d3cb6){const _0x5ba3bb=_0x2ee1ea;_0x3d3cb6['x']=0x0,_0x3d3cb6['y']=-this[_0x5ba3bb(0x199)]+this['height']*0x2/0x5,this[_0x5ba3bb(0x345)]['pattern']()!==0x1&&(_0x3d3cb6['y']+=0x1);},Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x68f)]=function(){const _0x199395=_0x2ee1ea;if(!this[_0x199395(0x345)])return 0x0;if(this[_0x199395(0x345)][_0x199395(0x2d9)])return 0x0;const _0x537f4a=this[_0x199395(0x345)][_0x199395(0x503)]();return _0x537f4a?_0x537f4a[_0x199395(0x331)]||0x0:0x0;},Sprite_Character['prototype']['updateAttachPictureSprite']=function(){const _0x549f89=_0x2ee1ea;if(!this[_0x549f89(0x607)])return;if(!this[_0x549f89(0x345)])return;this[_0x549f89(0x2a4)](),this[_0x549f89(0x267)]();},Sprite_Character[_0x2ee1ea(0x532)]['setupAttachPictureBitmap']=function(){const _0x5d940c=_0x2ee1ea;if(!this[_0x5d940c(0x22f)]())return;const _0x245d6=this[_0x5d940c(0x345)][_0x5d940c(0x2b0)]();this[_0x5d940c(0x5e0)]=_0x245d6[_0x5d940c(0x319)],this[_0x5d940c(0x3eb)]=_0x245d6['maxSize'],this['_lastAttachPictureScale']=_0x245d6[_0x5d940c(0x489)];if(_0x245d6[_0x5d940c(0x319)]!==''){const _0x3fae18=ImageManager[_0x5d940c(0x42b)](_0x245d6[_0x5d940c(0x319)]);_0x3fae18[_0x5d940c(0x614)](this[_0x5d940c(0x2e1)][_0x5d940c(0x2bb)](this,_0x3fae18));}else this[_0x5d940c(0x607)][_0x5d940c(0x21f)]=new Bitmap(0x1,0x1);},Sprite_Character['prototype'][_0x2ee1ea(0x267)]=function(){const _0x5a0a23=_0x2ee1ea,_0x2b69af=this[_0x5a0a23(0x607)];_0x2b69af['x']=this[_0x5a0a23(0x345)][_0x5a0a23(0x521)](),_0x2b69af['y']=this[_0x5a0a23(0x345)][_0x5a0a23(0x3a1)](),_0x2b69af[_0x5a0a23(0x444)]=this[_0x5a0a23(0x345)][_0x5a0a23(0x681)]();},Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x22f)]=function(){const _0x33cbd8=_0x2ee1ea,_0x4b36dc=this[_0x33cbd8(0x345)][_0x33cbd8(0x2b0)]();if(_0x4b36dc){if(this[_0x33cbd8(0x5e0)]!==_0x4b36dc[_0x33cbd8(0x319)])return!![];if(this[_0x33cbd8(0x3eb)]!==_0x4b36dc[_0x33cbd8(0x5b0)])return!![];if(this[_0x33cbd8(0x56d)]!==_0x4b36dc[_0x33cbd8(0x489)])return!![];}return![];},Sprite_Character[_0x2ee1ea(0x532)]['onLoadAttachPicture']=function(_0x1310b0){const _0x4ddb39=_0x2ee1ea,_0x51c468=this[_0x4ddb39(0x607)];_0x51c468[_0x4ddb39(0x21f)]=_0x1310b0;const _0x5cb3b5=this[_0x4ddb39(0x345)][_0x4ddb39(0x2b0)](),_0x30298c=_0x5cb3b5[_0x4ddb39(0x5b0)],_0x46e89c=_0x5cb3b5[_0x4ddb39(0x489)];let _0x3592e2=0x1;if(_0x30298c>0x0){if('DvpEb'!==_0x4ddb39(0x39e))this[_0x4ddb39(0x22d)]();else{let _0x491371=this[_0x4ddb39(0x5c9)]()||0x1,_0xbe4a4f=this[_0x4ddb39(0x321)]()||0x1;const _0x59705e=Math[_0x4ddb39(0x1e1)](0x1,_0x491371,_0xbe4a4f);_0x3592e2=_0x30298c/_0x59705e;}}_0x3592e2*=_0x46e89c,_0x3592e2!==0x1&&(this[_0x4ddb39(0x607)][_0x4ddb39(0x21f)][_0x4ddb39(0x20f)]=!![]),_0x51c468[_0x4ddb39(0x489)]['x']=_0x3592e2,_0x51c468['scale']['y']=_0x3592e2,this[_0x4ddb39(0x2e4)]=!![],this[_0x4ddb39(0x267)]();},Sprite_Character[_0x2ee1ea(0x532)][_0x2ee1ea(0x5c9)]=function(){const _0x49f937=_0x2ee1ea,_0x9d1030=this[_0x49f937(0x607)];if(!_0x9d1030)return 0x0;return _0x9d1030['bitmap'][_0x49f937(0x275)];},Sprite_Character['prototype']['getAttachPictureBitmapHeight']=function(){const _0x512573=_0x2ee1ea,_0xf20ad2=this['_attachPictureSprite'];if(!_0xf20ad2)return 0x0;return _0xf20ad2[_0x512573(0x21f)][_0x512573(0x199)];},VisuMZ[_0x2ee1ea(0x3f3)]['Sprite_Balloon_setup']=Sprite_Balloon[_0x2ee1ea(0x532)][_0x2ee1ea(0x688)],Sprite_Balloon['prototype'][_0x2ee1ea(0x688)]=function(_0x180c7f,_0x3db579){const _0x1d39dd=_0x2ee1ea;VisuMZ[_0x1d39dd(0x3f3)][_0x1d39dd(0x232)]['call'](this,_0x180c7f,_0x3db579),VisuMZ['EventsMoveCore'][_0x1d39dd(0x44c)][_0x1d39dd(0x1f0)]['AutoBalloon']&&('ftEuI'!==_0x1d39dd(0x424)?this[_0x1d39dd(0x4d4)][_0x1d39dd(0x345)][_0x1d39dd(0x32b)](_0x3db579,this[_0x1d39dd(0x56e)]):this[_0x1d39dd(0x20a)]['type']=_0x41b0c5(_0x4c6842['$1'])[_0x1d39dd(0x1ff)]()[_0x1d39dd(0x1db)]());},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x3e1)]=Sprite_Balloon[_0x2ee1ea(0x532)][_0x2ee1ea(0x23f)],Sprite_Balloon[_0x2ee1ea(0x532)][_0x2ee1ea(0x23f)]=function(){const _0x2633dd=_0x2ee1ea;VisuMZ[_0x2633dd(0x3f3)][_0x2633dd(0x3e1)][_0x2633dd(0x29e)](this),this[_0x2633dd(0x41a)]();},Sprite_Balloon['prototype']['updateVS8BalloonOffsets']=function(){const _0xc7311c=_0x2ee1ea;if(this['_target']['_character'][_0xc7311c(0x61a)]()){if(_0xc7311c(0x292)!==_0xc7311c(0x212))this['x']+=VisuMZ[_0xc7311c(0x3f3)][_0xc7311c(0x44c)][_0xc7311c(0x1f0)][_0xc7311c(0x219)],this['y']+=VisuMZ[_0xc7311c(0x3f3)]['Settings']['VS8'][_0xc7311c(0x4bb)];else return this[_0xc7311c(0x563)];}},Sprite_Timer[_0x2ee1ea(0x532)]['createBitmap']=function(){const _0x117c06=_0x2ee1ea;this['bitmap']=new Bitmap(Math['round'](Graphics[_0x117c06(0x252)]/0x2),0x30),this[_0x117c06(0x21f)][_0x117c06(0x1b4)]=this['fontFace'](),this['bitmap']['fontSize']=this['fontSize'](),this['bitmap'][_0x117c06(0x4b6)]=ColorManager[_0x117c06(0x4b6)]();},Sprite_Timer['prototype']['timerText']=function(){const _0x2f0970=_0x2ee1ea,_0x34de30=Math[_0x2f0970(0x4b5)](this['_seconds']/0x3c/0x3c),_0x55d80b=Math[_0x2f0970(0x4b5)](this[_0x2f0970(0x4bd)]/0x3c)%0x3c,_0x4d6b4e=this[_0x2f0970(0x4bd)]%0x3c;let _0x6c00f8=_0x55d80b[_0x2f0970(0x491)](0x2)+':'+_0x4d6b4e[_0x2f0970(0x491)](0x2);if(_0x34de30>0x0)_0x6c00f8=_0x2f0970(0x586)[_0x2f0970(0x41e)](_0x34de30,_0x6c00f8);return _0x6c00f8;};function Sprite_EventLabel(){const _0x1da818=_0x2ee1ea;this[_0x1da818(0x457)](...arguments);}Sprite_EventLabel[_0x2ee1ea(0x532)]=Object[_0x2ee1ea(0x569)](Sprite[_0x2ee1ea(0x532)]),Sprite_EventLabel['prototype'][_0x2ee1ea(0x3db)]=Sprite_EventLabel,Sprite_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x457)]=function(_0x1e8080){const _0x4e9375=_0x2ee1ea;this['_event']=_0x1e8080,Sprite['prototype'][_0x4e9375(0x457)][_0x4e9375(0x29e)](this),this['initMembers'](),this[_0x4e9375(0x484)]();},Sprite_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x5a1)]=function(){const _0x524b89=_0x2ee1ea;this[_0x524b89(0x432)]['x']=0.5,this['anchor']['y']=0x1;},Sprite_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x484)]=function(){const _0x52c912=_0x2ee1ea,_0x5ca97c=new Rectangle(0x0,0x0,0x1,0x1);this[_0x52c912(0x4d3)]=new Window_Base(_0x5ca97c),this['_proxyWindow']['padding']=0x0,this[_0x52c912(0x248)]=this[_0x52c912(0x264)]()?0xff:0x0;},Sprite_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x40f)]=function(){const _0x3be10d=_0x2ee1ea;Sprite[_0x3be10d(0x532)][_0x3be10d(0x40f)][_0x3be10d(0x29e)](this),this[_0x3be10d(0x31d)](),this[_0x3be10d(0x3cd)](),this['updatePosition'](),this[_0x3be10d(0x620)]();},Sprite_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x31d)]=function(){const _0x185061=_0x2ee1ea;this[_0x185061(0x48d)][_0x185061(0x4ff)]()!==this[_0x185061(0x5c5)]&&(_0x185061(0x3fe)===_0x185061(0x3fe)?(this[_0x185061(0x5c5)]=this[_0x185061(0x48d)]['labelWindowText'](),this[_0x185061(0x38e)]()):this[_0x185061(0x4d4)][_0x185061(0x345)]['setBalloonPose'](_0x1d3b00,this[_0x185061(0x56e)]));},Sprite_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x38e)]=function(){const _0x1136db=_0x2ee1ea;if(!this[_0x1136db(0x4d3)])return;this[_0x1136db(0x34b)](),this[_0x1136db(0x2da)]();},Sprite_EventLabel[_0x2ee1ea(0x532)]['resizeWindow']=function(){const _0x44e4eb=_0x2ee1ea,_0x34cc38=this[_0x44e4eb(0x4d3)][_0x44e4eb(0x619)](this[_0x44e4eb(0x5c5)]),_0x83684a=this[_0x44e4eb(0x4d3)]['itemPadding'](),_0x4e2529=_0x34cc38['width']+_0x83684a*0x2,_0x2bf1d3=_0x34cc38[_0x44e4eb(0x199)];this[_0x44e4eb(0x4d3)][_0x44e4eb(0x633)](0x0,0x0,_0x4e2529,_0x2bf1d3),this['_proxyWindow'][_0x44e4eb(0x68d)](),this[_0x44e4eb(0x21f)]=this[_0x44e4eb(0x4d3)][_0x44e4eb(0x3d6)];},Sprite_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x2da)]=function(){const _0xc13c1b=_0x2ee1ea,_0x590c8a=this[_0xc13c1b(0x4d3)]['itemPadding']();this['_proxyWindow'][_0xc13c1b(0x648)](this[_0xc13c1b(0x5c5)],_0x590c8a,0x0);},Sprite_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x3cd)]=function(){const _0x314bdb=_0x2ee1ea,_0x105b48=VisuMZ[_0x314bdb(0x3f3)][_0x314bdb(0x44c)][_0x314bdb(0x68c)][_0x314bdb(0x529)],_0x74f291=$gameSystem['mainFontSize']()||0x1;this[_0x314bdb(0x489)]['x']=this['scale']['y']=_0x105b48/_0x74f291;},Sprite_EventLabel['prototype']['updatePosition']=function(){const _0x43a00e=_0x2ee1ea;if(!SceneManager[_0x43a00e(0x368)])return;if(!SceneManager['_scene'][_0x43a00e(0x561)])return;const _0x359fdd=SceneManager[_0x43a00e(0x368)][_0x43a00e(0x561)][_0x43a00e(0x6a4)](this['_event']);if(!_0x359fdd)return;this['x']=this['_event'][_0x43a00e(0x2b5)](),this['x']+=this[_0x43a00e(0x48d)][_0x43a00e(0x4e1)][_0x43a00e(0x5b7)],this['y']=this[_0x43a00e(0x48d)][_0x43a00e(0x46a)]()-_0x359fdd[_0x43a00e(0x199)],this['y']+=$gameSystem['windowPadding']()*-0.5,this['y']+=this[_0x43a00e(0x48d)][_0x43a00e(0x4e1)]['offsetY'];},Sprite_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x620)]=function(){const _0x9933e1=_0x2ee1ea;if(this['isLabelVisible']())_0x9933e1(0x259)===_0x9933e1(0x228)?(this[_0x9933e1(0x37c)](_0x13fc39>0x0?0x8:0x2),!this[_0x9933e1(0x516)]()&&_0x45792e!==0x0&&this[_0x9933e1(0x37c)](_0x112e3c>0x0?0x4:0x6)):this['opacity']+=this[_0x9933e1(0x1d2)]();else{if(SceneManager[_0x9933e1(0x368)][_0x9933e1(0x34e)]>0x0)this['opacity']=0x0;else{if(_0x9933e1(0x4d6)===_0x9933e1(0x627)){const _0x24090d=_0x492d1f['iconWidth'],_0x170f53=_0xd9911[_0x9933e1(0x1d7)],_0xedfcb0=_0x4e51b2%0x10*_0x24090d,_0x11d45d=_0x81197f[_0x9933e1(0x4b5)](_0x5c7764/0x10)*_0x170f53;_0x5c3419[_0x9933e1(0x334)](_0xedfcb0,_0x11d45d,_0x24090d,_0x170f53),this[_0x9933e1(0x2e4)]=!![];}else this[_0x9933e1(0x248)]-=this['opacitySpeed']();}}},Sprite_EventLabel[_0x2ee1ea(0x532)]['isLabelVisible']=function(){const _0x2c44a1=_0x2ee1ea;if(!$gameSystem[_0x2c44a1(0x5b2)]())return![];if(this[_0x2c44a1(0x48d)]?.[_0x2c44a1(0x2d9)])return![];if(this['_event']&&this['_event']['_pageIndex']<0x0)return![];if(SceneManager['_scene'][_0x2c44a1(0x34e)]>0x0)return![];const _0x5194af=$gamePlayer['x'],_0x3a5691=$gamePlayer['y'],_0x4ee362=this[_0x2c44a1(0x48d)]['x'],_0xf145c5=this[_0x2c44a1(0x48d)]['y'];if(this['_visiblePlayerX']===_0x5194af&&this[_0x2c44a1(0x675)]===_0x3a5691&&this['_visibleEventX']===_0x4ee362&&this['_visibleEventY']===_0xf145c5)return this[_0x2c44a1(0x68a)];this[_0x2c44a1(0x5c1)]=$gamePlayer['x'],this[_0x2c44a1(0x675)]=$gamePlayer['y'],this[_0x2c44a1(0x24b)]=this[_0x2c44a1(0x48d)]['x'],this['_visibleEventY']=this[_0x2c44a1(0x48d)]['y'];if($gameMap[_0x2c44a1(0x377)](_0x5194af,_0x3a5691,_0x4ee362,_0xf145c5)>this['_event'][_0x2c44a1(0x2fa)]()){if(_0x2c44a1(0x236)!==_0x2c44a1(0x236)){if([0x2,0x4,0x6,0x8][_0x2c44a1(0x43c)](_0x1d2007))return 0x4;if([0x1,0x3,0x7,0x9][_0x2c44a1(0x43c)](_0x5d9aac))return 0x5;}else return this[_0x2c44a1(0x68a)]=![],![];}return this['_cacheVisibility']=!![],!![];},Sprite_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x1d2)]=function(){const _0x49ec58=_0x2ee1ea;return VisuMZ[_0x49ec58(0x3f3)]['Settings'][_0x49ec58(0x68c)][_0x49ec58(0x27b)];},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x478)]=Spriteset_Map[_0x2ee1ea(0x532)]['createLowerLayer'],Spriteset_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x3ce)]=function(){const _0xe32991=_0x2ee1ea;VisuMZ['EventsMoveCore'][_0xe32991(0x478)][_0xe32991(0x29e)](this),this['createLabelWindows']();},VisuMZ[_0x2ee1ea(0x3f3)]['Spriteset_Map_createShadow']=Spriteset_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x6a0)],Spriteset_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x6a0)]=function(){const _0x341ce5=_0x2ee1ea;VisuMZ['EventsMoveCore'][_0x341ce5(0x295)][_0x341ce5(0x29e)](this),this[_0x341ce5(0x3f6)]();},Spriteset_Map['prototype'][_0x2ee1ea(0x3f6)]=function(){const _0x356165=_0x2ee1ea;if(!VisuMZ[_0x356165(0x3f3)]['Settings'][_0x356165(0x238)][_0x356165(0x24c)])return;for(const _0x205079 of this['_characterSprites']){this[_0x356165(0x576)](_0x205079);}},Spriteset_Map['prototype'][_0x2ee1ea(0x576)]=function(_0x1a1fe2){const _0x2d2ea1=_0x2ee1ea;_0x1a1fe2[_0x2d2ea1(0x4c5)]=new Sprite(),_0x1a1fe2['_shadowSprite'][_0x2d2ea1(0x5c4)]=_0x1a1fe2[_0x2d2ea1(0x345)][_0x2d2ea1(0x289)](),_0x1a1fe2['_shadowSprite']['bitmap']=ImageManager[_0x2d2ea1(0x343)](_0x1a1fe2[_0x2d2ea1(0x4c5)][_0x2d2ea1(0x5c4)]),_0x1a1fe2[_0x2d2ea1(0x4c5)][_0x2d2ea1(0x432)]['x']=0.5,_0x1a1fe2[_0x2d2ea1(0x4c5)][_0x2d2ea1(0x432)]['y']=0x1,_0x1a1fe2[_0x2d2ea1(0x4c5)]['z']=0x0,this[_0x2d2ea1(0x32a)]['addChild'](_0x1a1fe2['_shadowSprite']);},Spriteset_Map['prototype'][_0x2ee1ea(0x4be)]=function(){const _0x595fc9=_0x2ee1ea;if(!VisuMZ[_0x595fc9(0x3f3)][_0x595fc9(0x44c)][_0x595fc9(0x238)][_0x595fc9(0x24c)])return;for(const _0x1f48c5 of this[_0x595fc9(0x5a0)]){this[_0x595fc9(0x32a)]['removeChild'](_0x1f48c5[_0x595fc9(0x4c5)]);}},Spriteset_Map['prototype'][_0x2ee1ea(0x6a5)]=function(){const _0x1956d3=_0x2ee1ea;this[_0x1956d3(0x6b5)]=[];for(const _0x555564 of $gameMap[_0x1956d3(0x560)]()){this['createLabelWindowForTarget'](_0x555564);}},Spriteset_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x4a6)]=function(_0x1af185){const _0x429397=_0x2ee1ea;if(!this[_0x429397(0x204)](_0x1af185))return;let _0x2e71ac;const _0x275125=VisuMZ[_0x429397(0x3f3)]['Settings']['Label'][_0x429397(0x57e)]??!![];_0x2e71ac=_0x275125?new Sprite_EventLabel(_0x1af185):new Window_EventLabel(_0x1af185),_0x2e71ac['z']=0x8,_0x2e71ac[_0x429397(0x337)]=Sprite[_0x429397(0x362)]++,this[_0x429397(0x32a)][_0x429397(0x69b)](_0x2e71ac),this[_0x429397(0x6b5)][_0x429397(0x605)](_0x2e71ac);},Spriteset_Map['prototype'][_0x2ee1ea(0x204)]=function(_0x403877){const _0x37b92d=_0x2ee1ea,_0x4b2929=_0x403877['event']();if(_0x4b2929[_0x37b92d(0x6af)][_0x37b92d(0x640)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x4b2929[_0x37b92d(0x6af)][_0x37b92d(0x640)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x278ec9 of _0x4b2929[_0x37b92d(0x604)]){let _0x42431a='';for(const _0x147b98 of _0x278ec9['list']){if(_0x37b92d(0x5ca)!=='wQryf'){this['_labelWindows']=[];for(const _0x52f797 of _0x531be7['events']()){this[_0x37b92d(0x4a6)](_0x52f797);}}else[0x6c,0x198][_0x37b92d(0x43c)](_0x147b98['code'])&&(_0x42431a+=_0x147b98['parameters'][0x0]);}if(_0x42431a[_0x37b92d(0x640)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x42431a[_0x37b92d(0x640)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x37b92d(0x394)!==_0x37b92d(0x394))this[_0x37b92d(0x468)](_0x5d71ca,!![]);else return!![];}}return![];},Spriteset_Map[_0x2ee1ea(0x532)][_0x2ee1ea(0x435)]=function(_0x46c6c1){const _0x14d561=_0x2ee1ea;this['_characterSprites']=this[_0x14d561(0x5a0)]||[];const _0x52194c=new Sprite_Character(_0x46c6c1);this[_0x14d561(0x5a0)][_0x14d561(0x605)](_0x52194c),this[_0x14d561(0x32a)][_0x14d561(0x69b)](_0x52194c),this[_0x14d561(0x576)](_0x52194c),this[_0x14d561(0x4a6)](_0x46c6c1),_0x52194c['update']();},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x502)]=Game_Message[_0x2ee1ea(0x532)][_0x2ee1ea(0x60b)],Game_Message[_0x2ee1ea(0x532)][_0x2ee1ea(0x60b)]=function(_0x589c8d,_0x44e180){const _0x1a01c2=_0x2ee1ea;this[_0x1a01c2(0x59d)]=$gameTemp[_0x1a01c2(0x629)](),VisuMZ[_0x1a01c2(0x3f3)][_0x1a01c2(0x502)][_0x1a01c2(0x29e)](this,_0x589c8d,_0x44e180);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x3fc)]=Window_NumberInput[_0x2ee1ea(0x532)][_0x2ee1ea(0x547)],Window_NumberInput[_0x2ee1ea(0x532)]['start']=function(){const _0x231f5c=_0x2ee1ea;$gameTemp[_0x231f5c(0x305)]($gameMessage[_0x231f5c(0x59d)]),VisuMZ[_0x231f5c(0x3f3)]['Window_NumberInput_start'][_0x231f5c(0x29e)](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x25a)]=Window_NumberInput[_0x2ee1ea(0x532)][_0x2ee1ea(0x2fd)],Window_NumberInput[_0x2ee1ea(0x532)][_0x2ee1ea(0x2fd)]=function(){const _0xae202c=_0x2ee1ea;$gameTemp[_0xae202c(0x305)]($gameMessage[_0xae202c(0x59d)]),VisuMZ[_0xae202c(0x3f3)][_0xae202c(0x25a)][_0xae202c(0x29e)](this),$gameTemp[_0xae202c(0x622)](),$gameMessage['_selfTargetNumberInput']=undefined;},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x5ad)]=Game_Message[_0x2ee1ea(0x532)][_0x2ee1ea(0x434)],Game_Message[_0x2ee1ea(0x532)][_0x2ee1ea(0x434)]=function(_0x288e2a,_0x12d84f){const _0xb1b1bb=_0x2ee1ea;this['_selfTargetItemChoice']=$gameTemp['getSelfTarget'](),VisuMZ['EventsMoveCore'][_0xb1b1bb(0x5ad)][_0xb1b1bb(0x29e)](this,_0x288e2a,_0x12d84f);},VisuMZ[_0x2ee1ea(0x3f3)][_0x2ee1ea(0x2ed)]=Window_EventItem['prototype'][_0x2ee1ea(0x52b)],Window_EventItem[_0x2ee1ea(0x532)][_0x2ee1ea(0x52b)]=function(){const _0x5a408f=_0x2ee1ea;$gameTemp[_0x5a408f(0x305)]($gameMessage[_0x5a408f(0x54f)]),VisuMZ[_0x5a408f(0x3f3)][_0x5a408f(0x2ed)]['call'](this),$gameTemp['clearSelfTarget'](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ[_0x2ee1ea(0x3f3)]['Window_EventItem_onCancel']=Window_EventItem[_0x2ee1ea(0x532)][_0x2ee1ea(0x1ea)],Window_EventItem[_0x2ee1ea(0x532)][_0x2ee1ea(0x1ea)]=function(){const _0x6d6821=_0x2ee1ea;$gameTemp[_0x6d6821(0x305)]($gameMessage[_0x6d6821(0x54f)]),VisuMZ[_0x6d6821(0x3f3)][_0x6d6821(0x365)][_0x6d6821(0x29e)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x6d6821(0x54f)]=undefined;},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x62f)]=Window_Message['prototype']['startMessage'],Window_Message[_0x2ee1ea(0x532)][_0x2ee1ea(0x45e)]=function(){const _0x3077e0=_0x2ee1ea;$gameMessage[_0x3077e0(0x288)](),VisuMZ['EventsMoveCore']['Window_Message_startMessage'][_0x3077e0(0x29e)](this),$gameTemp[_0x3077e0(0x622)]();},VisuMZ['EventsMoveCore'][_0x2ee1ea(0x48f)]=Window_ScrollText[_0x2ee1ea(0x532)][_0x2ee1ea(0x45e)],Window_ScrollText['prototype'][_0x2ee1ea(0x45e)]=function(){const _0x2a6322=_0x2ee1ea;$gameMessage[_0x2a6322(0x288)](),VisuMZ[_0x2a6322(0x3f3)]['Window_ScrollText_startMessage'][_0x2a6322(0x29e)](this),$gameTemp[_0x2a6322(0x622)]();};function _0x444e(_0x521bff,_0x48a8e2){const _0x44e032=_0x44e0();return _0x444e=function(_0x444ec3,_0x1f5ed2){_0x444ec3=_0x444ec3-0x181;let _0x260e7c=_0x44e032[_0x444ec3];return _0x260e7c;},_0x444e(_0x521bff,_0x48a8e2);}function Window_EventLabel(){this['initialize'](...arguments);}Window_EventLabel['prototype']=Object[_0x2ee1ea(0x569)](Window_Base[_0x2ee1ea(0x532)]),Window_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x3db)]=Window_EventLabel,Window_EventLabel[_0x2ee1ea(0x532)]['initialize']=function(_0x24d21b){const _0x511c4d=_0x2ee1ea;this[_0x511c4d(0x48d)]=_0x24d21b;const _0x273998=new Rectangle(0x0,0x0,Graphics['boxWidth']/0x4,this['fittingHeight'](0x1));this[_0x511c4d(0x5a1)](),Window_Base[_0x511c4d(0x532)][_0x511c4d(0x457)][_0x511c4d(0x29e)](this,_0x273998),this['contentsOpacity']=0x0,this[_0x511c4d(0x5f0)](0x2),this[_0x511c4d(0x5c5)]='';},Window_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x5a1)]=function(){const _0x3b7f0b=_0x2ee1ea;this[_0x3b7f0b(0x342)]=![],this['_screenZoomScale']=$gameScreen[_0x3b7f0b(0x524)](),this[_0x3b7f0b(0x50e)]=this[_0x3b7f0b(0x48d)][_0x3b7f0b(0x2b5)](),this[_0x3b7f0b(0x2ee)]=this[_0x3b7f0b(0x48d)][_0x3b7f0b(0x46a)](),this['_eventLabelOffsetX']=this['_event'][_0x3b7f0b(0x4e1)][_0x3b7f0b(0x5b7)],this['_eventLabelOffsetY']=this[_0x3b7f0b(0x48d)][_0x3b7f0b(0x4e1)]['offsetY'],this[_0x3b7f0b(0x3fb)]=this[_0x3b7f0b(0x48d)]['_pageIndex'],this[_0x3b7f0b(0x68a)]=this['isLabelVisible'](),this['_cacheSystemVisible']=$gameSystem[_0x3b7f0b(0x5b2)](),this[_0x3b7f0b(0x5c1)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this['_visibleEventX']=this[_0x3b7f0b(0x48d)]['x'],this[_0x3b7f0b(0x54c)]=this[_0x3b7f0b(0x48d)]['y'];},Window_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x40f)]=function(){const _0x59f560=_0x2ee1ea;Window_Base[_0x59f560(0x532)]['update'][_0x59f560(0x29e)](this);if(!this[_0x59f560(0x3aa)]())return;this[_0x59f560(0x31d)](),this[_0x59f560(0x3cd)](),this[_0x59f560(0x23f)](),this[_0x59f560(0x620)]();},Window_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x3aa)]=function(){const _0x5de43c=_0x2ee1ea;if(!this['_event'])return![];if(!this['_event'][_0x5de43c(0x4e1)])return![];if(this[_0x5de43c(0x3fb)]!==this[_0x5de43c(0x48d)][_0x5de43c(0x1e7)])return!![];if(this['_event']['_erased']&&!this[_0x5de43c(0x342)])return!![];if(this['_event'][_0x5de43c(0x4e1)][_0x5de43c(0x44e)]==='')return![];if(this[_0x5de43c(0x3ea)]!==$gameScreen[_0x5de43c(0x524)]())return!![];if(this['_eventScreenX']!==this[_0x5de43c(0x48d)][_0x5de43c(0x2b5)]())return!![];if(this['_eventScreenY']!==this[_0x5de43c(0x48d)]['screenY']())return!![];if(this['_eventLabelOffsetX']!==this[_0x5de43c(0x48d)][_0x5de43c(0x4e1)][_0x5de43c(0x5b7)])return!![];if(this['_eventLabelOffsetY']!==this[_0x5de43c(0x48d)]['_labelWindow'][_0x5de43c(0x65e)])return!![];if(this[_0x5de43c(0x5c1)]!==$gamePlayer['x'])return!![];if(this[_0x5de43c(0x675)]!==$gamePlayer['y'])return!![];if(this[_0x5de43c(0x24b)]!==this[_0x5de43c(0x48d)]['x'])return!![];if(this['_visibleEventY']!==this['_event']['y'])return!![];if(this[_0x5de43c(0x1a7)]!==$gameSystem[_0x5de43c(0x5b2)]())return!![];if(this['_cacheVisibility']&&this['contentsOpacity']<0xff)return!![];if(!this[_0x5de43c(0x68a)]&&this[_0x5de43c(0x488)]>0x0)return!![];if(SceneManager[_0x5de43c(0x368)][_0x5de43c(0x34e)]>0x0)return!![];return![];},Window_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x31d)]=function(){const _0x29769b=_0x2ee1ea;if(this[_0x29769b(0x48d)][_0x29769b(0x4ff)]()!==this[_0x29769b(0x5c5)]){if('hJTiG'!==_0x29769b(0x27d))this[_0x29769b(0x5c5)]=this['_event'][_0x29769b(0x4ff)](),this[_0x29769b(0x38e)]();else return _0x54205e[_0x29769b(0x49d)]&&_0x125d60[_0x29769b(0x5ae)][_0x29769b(0x43c)]('['+_0x330dcf+']');}},Window_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x3cd)]=function(){const _0x2344f4=_0x2ee1ea;this[_0x2344f4(0x489)]['x']=0x1/$gameScreen['zoomScale'](),this['scale']['y']=0x1/$gameScreen[_0x2344f4(0x524)](),this[_0x2344f4(0x3ea)]=$gameScreen['zoomScale']();},Window_EventLabel['prototype'][_0x2ee1ea(0x23f)]=function(){const _0x59650e=_0x2ee1ea;if(!SceneManager[_0x59650e(0x368)])return;if(!SceneManager[_0x59650e(0x368)][_0x59650e(0x561)])return;const _0x40b71c=SceneManager[_0x59650e(0x368)][_0x59650e(0x561)][_0x59650e(0x6a4)](this[_0x59650e(0x48d)]);if(!_0x40b71c)return;this['x']=Math['round'](this[_0x59650e(0x48d)][_0x59650e(0x2b5)]()-Math[_0x59650e(0x4b5)](this[_0x59650e(0x275)]*this['scale']['x']/0x2)),this['x']+=this[_0x59650e(0x48d)]['_labelWindow'][_0x59650e(0x5b7)],this['y']=this[_0x59650e(0x48d)]['screenY']()-_0x40b71c[_0x59650e(0x199)],this['y']+=Math[_0x59650e(0x650)]($gameSystem[_0x59650e(0x52c)]()*0.5),this['y']-=Math['round'](this[_0x59650e(0x199)]*this['scale']['y']),this['y']+=this[_0x59650e(0x48d)][_0x59650e(0x4e1)][_0x59650e(0x65e)],this[_0x59650e(0x342)]=this['_event']['_erased'],this[_0x59650e(0x50e)]=this[_0x59650e(0x48d)]['screenX'](),this['_eventScreenY']=this[_0x59650e(0x48d)]['screenY'](),this['_eventLabelOffsetX']=this[_0x59650e(0x48d)][_0x59650e(0x4e1)]['offsetX'],this[_0x59650e(0x249)]=this[_0x59650e(0x48d)]['_labelWindow'][_0x59650e(0x65e)],this['_eventPageIndex']=this['_event']['_pageIndex'],this[_0x59650e(0x342)]&&(this[_0x59650e(0x488)]=0x0);},Window_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x620)]=function(){const _0x2468f5=_0x2ee1ea;if(this[_0x2468f5(0x264)]())_0x2468f5(0x61b)!==_0x2468f5(0x592)?this[_0x2468f5(0x488)]+=this[_0x2468f5(0x1d2)]():this[_0x2468f5(0x2e7)]['filename']=_0x514088(_0x337488['$1']);else{if(SceneManager[_0x2468f5(0x368)]['_encounterEffectDuration']>0x0){if(_0x2468f5(0x404)==='jjbZk'){const _0x4b227b=_0x2468f5(0x20d)['format'](_0x2284e1['charAt'](0x0)[_0x2468f5(0x269)]()+_0x3990a1[_0x2468f5(0x1c9)](0x1));if(_0x7e1dca[_0x4b227b])return _0x2b616b[_0x4b227b][_0x2468f5(0x43c)](_0x30c765);}else this[_0x2468f5(0x488)]=0x0;}else{if(_0x2468f5(0x449)===_0x2468f5(0x449))this[_0x2468f5(0x488)]-=this['opacitySpeed']();else{const _0x2365ba=this['_eventCopyData'][_0x2468f5(0x2f1)],_0x32927c=this['_eventCopyData'][_0x2468f5(0x639)];return _0x2b7789[_0x2468f5(0x2c0)](_0x2365ba,_0x32927c);}}}},Window_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x264)]=function(){const _0x205a22=_0x2ee1ea;if(!$gameSystem[_0x205a22(0x5b2)]())return![];if(this['_event']?.[_0x205a22(0x2d9)])return![];if(SceneManager[_0x205a22(0x368)]['_encounterEffectDuration']>0x0)return![];const _0x42725e=$gamePlayer['x'],_0x179d8d=$gamePlayer['y'],_0xf5f5ac=this[_0x205a22(0x48d)]['x'],_0x1c7329=this[_0x205a22(0x48d)]['y'];if(this[_0x205a22(0x5c1)]===_0x42725e&&this[_0x205a22(0x675)]===_0x179d8d&&this[_0x205a22(0x24b)]===_0xf5f5ac&&this[_0x205a22(0x54c)]===_0x1c7329){if(_0x205a22(0x47d)!==_0x205a22(0x47d))this[_0x205a22(0x2b4)]['bufferX']=_0x2529ca(_0x52081d['$1']),this['_eventIcon'][_0x205a22(0x62b)]=_0x5979f1(_0x5c282c['$2']);else return this[_0x205a22(0x68a)];}this[_0x205a22(0x5c1)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x205a22(0x24b)]=this[_0x205a22(0x48d)]['x'],this[_0x205a22(0x54c)]=this[_0x205a22(0x48d)]['y'];if($gameMap[_0x205a22(0x377)](_0x42725e,_0x179d8d,_0xf5f5ac,_0x1c7329)>this['_event'][_0x205a22(0x2fa)]()){if(_0x205a22(0x1a5)!==_0x205a22(0x1a5))_0xb26049[_0x205a22(0x532)][_0x205a22(0x5ac)][_0x205a22(0x29e)](this),this[_0x205a22(0x4aa)]()&&(this[_0x205a22(0x2e4)]=![]);else return this['_cacheVisibility']=![],![];}return this[_0x205a22(0x68a)]=!![],!![];},Window_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x1d2)]=function(){const _0x59ade0=_0x2ee1ea;return VisuMZ[_0x59ade0(0x3f3)][_0x59ade0(0x44c)][_0x59ade0(0x68c)]['OpacitySpeed'];},Window_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x34b)]=function(){const _0x217ebf=_0x2ee1ea,_0x1ae9a4=this[_0x217ebf(0x619)](this[_0x217ebf(0x5c5)]);this[_0x217ebf(0x275)]=_0x1ae9a4[_0x217ebf(0x275)]+($gameSystem[_0x217ebf(0x52c)]()+this[_0x217ebf(0x5eb)]())*0x2,this[_0x217ebf(0x199)]=Math['max'](this[_0x217ebf(0x1ee)](),_0x1ae9a4[_0x217ebf(0x199)])+$gameSystem[_0x217ebf(0x52c)]()*0x2,this[_0x217ebf(0x68d)]();},Window_EventLabel['prototype'][_0x2ee1ea(0x1ee)]=function(){const _0x52890c=_0x2ee1ea;return VisuMZ[_0x52890c(0x3f3)]['Settings'][_0x52890c(0x68c)][_0x52890c(0x358)];},Window_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x2fc)]=function(){const _0x3c44ea=_0x2ee1ea;Window_Base[_0x3c44ea(0x532)][_0x3c44ea(0x2fc)][_0x3c44ea(0x29e)](this),this[_0x3c44ea(0x3d6)][_0x3c44ea(0x621)]=this['defaultFontSize']();},Window_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x498)]=function(){const _0x176825=_0x2ee1ea;return VisuMZ['EventsMoveCore'][_0x176825(0x44c)][_0x176825(0x68c)][_0x176825(0x529)];},Window_EventLabel['prototype'][_0x2ee1ea(0x38e)]=function(){const _0xcf7b4e=_0x2ee1ea;this[_0xcf7b4e(0x34b)](),this[_0xcf7b4e(0x3d6)][_0xcf7b4e(0x5f7)]();const _0x537f39=this[_0xcf7b4e(0x5c5)][_0xcf7b4e(0x44d)](/[\r\n]+/);let _0x2a5c75=0x0;for(const _0x5cf8f3 of _0x537f39){const _0x4ff66c=this[_0xcf7b4e(0x619)](_0x5cf8f3),_0x32849f=Math[_0xcf7b4e(0x4b5)]((this[_0xcf7b4e(0x3c7)]-_0x4ff66c[_0xcf7b4e(0x275)])/0x2);this[_0xcf7b4e(0x648)](_0x5cf8f3,_0x32849f,_0x2a5c75),_0x2a5c75+=_0x4ff66c[_0xcf7b4e(0x199)];}},Window_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x398)]=function(_0x5c800d,_0x1475a1){const _0x289a1f=_0x2ee1ea;_0x1475a1[_0x289a1f(0x470)]&&this['drawIcon'](_0x5c800d,_0x1475a1['x']+0x2,_0x1475a1['y']),_0x1475a1['x']+=Math[_0x289a1f(0x581)](this['iconSize'](),ImageManager[_0x289a1f(0x1bc)])+0x4;},Window_EventLabel[_0x2ee1ea(0x532)][_0x2ee1ea(0x380)]=function(_0x1a4ea7,_0x5462fb,_0x578171){const _0x3a6f5c=_0x2ee1ea,_0x59f502=ImageManager[_0x3a6f5c(0x343)](_0x3a6f5c(0x580)),_0x2e9c63=ImageManager['iconWidth'],_0x3a1a8b=ImageManager['iconHeight'],_0x15aa28=_0x1a4ea7%0x10*_0x2e9c63,_0x50cc49=Math[_0x3a6f5c(0x4b5)](_0x1a4ea7/0x10)*_0x3a1a8b,_0xedde7a=Math[_0x3a6f5c(0x581)](this['iconSize']()),_0x471724=Math['min'](this[_0x3a6f5c(0x4ad)]());this[_0x3a6f5c(0x3d6)][_0x3a6f5c(0x481)](_0x59f502,_0x15aa28,_0x50cc49,_0x2e9c63,_0x3a1a8b,_0x5462fb,_0x578171,_0xedde7a,_0x471724);},Window_EventLabel['prototype'][_0x2ee1ea(0x4ad)]=function(){const _0x314b97=_0x2ee1ea;return VisuMZ[_0x314b97(0x3f3)][_0x314b97(0x44c)][_0x314b97(0x68c)][_0x314b97(0x510)];};