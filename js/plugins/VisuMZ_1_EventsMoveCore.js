//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.43;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.43] [EventsMoveCore]
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

const _0x37ae6a=_0x2873;(function(_0xf3acb,_0x41e837){const _0x43f9af=_0x2873,_0x3c390e=_0xf3acb();while(!![]){try{const _0x2f2268=-parseInt(_0x43f9af(0x459))/0x1+-parseInt(_0x43f9af(0x3a0))/0x2*(-parseInt(_0x43f9af(0x1ce))/0x3)+-parseInt(_0x43f9af(0x351))/0x4*(-parseInt(_0x43f9af(0x3e9))/0x5)+-parseInt(_0x43f9af(0x2d1))/0x6+-parseInt(_0x43f9af(0x54e))/0x7*(-parseInt(_0x43f9af(0x38b))/0x8)+-parseInt(_0x43f9af(0x6be))/0x9+parseInt(_0x43f9af(0x4cf))/0xa;if(_0x2f2268===_0x41e837)break;else _0x3c390e['push'](_0x3c390e['shift']());}catch(_0x31d344){_0x3c390e['push'](_0x3c390e['shift']());}}}(_0x17b8,0x2a63b));var label=_0x37ae6a(0x4de),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x5226b8){const _0x3b0c73=_0x37ae6a;return _0x5226b8[_0x3b0c73(0x640)]&&_0x5226b8['description'][_0x3b0c73(0x6db)]('['+label+']');})[0x0];VisuMZ[label][_0x37ae6a(0x556)]=VisuMZ[label][_0x37ae6a(0x556)]||{},VisuMZ[_0x37ae6a(0x5a7)]=function(_0x13b52c,_0x352b86){const _0x413d3d=_0x37ae6a;for(const _0x6444a8 in _0x352b86){if(_0x413d3d(0x4d3)!=='DyIFn'){if(_0x6444a8['match'](/(.*):(.*)/i)){if(_0x413d3d(0x374)===_0x413d3d(0x374)){const _0x2cdc65=String(RegExp['$1']),_0x5579f0=String(RegExp['$2'])[_0x413d3d(0x5cf)]()[_0x413d3d(0x519)]();let _0x2edb6e,_0x557c67,_0x43163c;switch(_0x5579f0){case _0x413d3d(0x5f3):_0x2edb6e=_0x352b86[_0x6444a8]!==''?Number(_0x352b86[_0x6444a8]):0x0;break;case'ARRAYNUM':_0x557c67=_0x352b86[_0x6444a8]!==''?JSON['parse'](_0x352b86[_0x6444a8]):[],_0x2edb6e=_0x557c67[_0x413d3d(0x482)](_0x467cf5=>Number(_0x467cf5));break;case'EVAL':_0x2edb6e=_0x352b86[_0x6444a8]!==''?eval(_0x352b86[_0x6444a8]):null;break;case _0x413d3d(0x4cc):_0x557c67=_0x352b86[_0x6444a8]!==''?JSON['parse'](_0x352b86[_0x6444a8]):[],_0x2edb6e=_0x557c67['map'](_0x5a2968=>eval(_0x5a2968));break;case _0x413d3d(0x305):_0x2edb6e=_0x352b86[_0x6444a8]!==''?JSON[_0x413d3d(0x3fb)](_0x352b86[_0x6444a8]):'';break;case _0x413d3d(0x449):_0x557c67=_0x352b86[_0x6444a8]!==''?JSON[_0x413d3d(0x3fb)](_0x352b86[_0x6444a8]):[],_0x2edb6e=_0x557c67[_0x413d3d(0x482)](_0x2d8dc4=>JSON['parse'](_0x2d8dc4));break;case'FUNC':_0x2edb6e=_0x352b86[_0x6444a8]!==''?new Function(JSON[_0x413d3d(0x3fb)](_0x352b86[_0x6444a8])):new Function(_0x413d3d(0x39c));break;case'ARRAYFUNC':_0x557c67=_0x352b86[_0x6444a8]!==''?JSON[_0x413d3d(0x3fb)](_0x352b86[_0x6444a8]):[],_0x2edb6e=_0x557c67['map'](_0x5d3d35=>new Function(JSON[_0x413d3d(0x3fb)](_0x5d3d35)));break;case _0x413d3d(0x392):_0x2edb6e=_0x352b86[_0x6444a8]!==''?String(_0x352b86[_0x6444a8]):'';break;case'ARRAYSTR':_0x557c67=_0x352b86[_0x6444a8]!==''?JSON[_0x413d3d(0x3fb)](_0x352b86[_0x6444a8]):[],_0x2edb6e=_0x557c67['map'](_0x4af1f6=>String(_0x4af1f6));break;case'STRUCT':_0x43163c=_0x352b86[_0x6444a8]!==''?JSON[_0x413d3d(0x3fb)](_0x352b86[_0x6444a8]):{},_0x13b52c[_0x2cdc65]={},VisuMZ['ConvertParams'](_0x13b52c[_0x2cdc65],_0x43163c);continue;case _0x413d3d(0x664):_0x557c67=_0x352b86[_0x6444a8]!==''?JSON['parse'](_0x352b86[_0x6444a8]):[],_0x2edb6e=_0x557c67['map'](_0x58f5cf=>VisuMZ[_0x413d3d(0x5a7)]({},JSON['parse'](_0x58f5cf)));break;default:continue;}_0x13b52c[_0x2cdc65]=_0x2edb6e;}else{if(!this['event']())return;this[_0x413d3d(0x442)](),this[_0x413d3d(0x22a)](),this[_0x413d3d(0x31c)](),this[_0x413d3d(0x1d7)]();}}}else this['moveForward']();}return _0x13b52c;},(_0x12830c=>{const _0x47ffdb=_0x37ae6a,_0x1ae87e=_0x12830c[_0x47ffdb(0x388)];for(const _0x5192d3 of dependencies){if(_0x47ffdb(0x370)!==_0x47ffdb(0x370))return this[_0x47ffdb(0x69d)](_0x3510cc(_0x78d39d['$1']));else{if(!Imported[_0x5192d3]){if(_0x47ffdb(0x536)!=='GGPhn'){alert(_0x47ffdb(0x4e0)['format'](_0x1ae87e,_0x5192d3)),SceneManager['exit']();break;}else{if([0x2,0x4,0x6,0x8][_0x47ffdb(0x6db)](_0x1cbbb9))return 0x0;if([0x1,0x3,0x7,0x9]['includes'](_0x256065))return 0x1;}}}}const _0x4976d2=_0x12830c[_0x47ffdb(0x4d1)];if(_0x4976d2[_0x47ffdb(0x6b7)](/\[Version[ ](.*?)\]/i)){if(_0x47ffdb(0x343)!=='kRbAK')return this[_0x47ffdb(0x561)](_0x39d7c6);else{const _0x4a7172=Number(RegExp['$1']);_0x4a7172!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x1ae87e,_0x4a7172)),SceneManager['exit']());}}if(_0x4976d2[_0x47ffdb(0x6b7)](/\[Tier[ ](\d+)\]/i)){if(_0x47ffdb(0x6ac)!==_0x47ffdb(0x6ac))return _0x170293['EventsMoveCore'][_0x47ffdb(0x556)][_0x47ffdb(0x613)][_0x47ffdb(0x2fa)];else{const _0x265ea3=Number(RegExp['$1']);if(_0x265ea3<tier)alert(_0x47ffdb(0x60f)[_0x47ffdb(0x51a)](_0x1ae87e,_0x265ea3,tier)),SceneManager[_0x47ffdb(0x653)]();else{if(_0x47ffdb(0x5fc)!==_0x47ffdb(0x630))tier=Math[_0x47ffdb(0x319)](_0x265ea3,tier);else return this[_0x47ffdb(0x594)];}}}VisuMZ['ConvertParams'](VisuMZ[label][_0x47ffdb(0x556)],_0x12830c[_0x47ffdb(0x466)]);})(pluginData),VisuMZ[_0x37ae6a(0x21d)]=function(_0x2865c4,_0x29de12,_0x55ab39){switch(_0x55ab39){case'=':return _0x29de12;break;case'+':return _0x2865c4+_0x29de12;break;case'-':return _0x2865c4-_0x29de12;break;case'*':return _0x2865c4*_0x29de12;break;case'/':return _0x2865c4/_0x29de12;break;case'%':return _0x2865c4%_0x29de12;break;}return _0x2865c4;},PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x6f5),_0x206e7b=>{const _0x1eee7b=_0x37ae6a;VisuMZ['ConvertParams'](_0x206e7b,_0x206e7b);switch(_0x206e7b['Value']){case _0x1eee7b(0x606):$gameSystem[_0x1eee7b(0x26c)](!![]);break;case _0x1eee7b(0x507):$gameSystem[_0x1eee7b(0x26c)](![]);break;case _0x1eee7b(0x69c):$gameSystem[_0x1eee7b(0x26c)](!$gameSystem[_0x1eee7b(0x36f)]());break;}}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],'CallEvent',_0x30f776=>{const _0x1d1dcb=_0x37ae6a;VisuMZ[_0x1d1dcb(0x5a7)](_0x30f776,_0x30f776);const _0x45e5ba=$gameTemp['getLastPluginCommandInterpreter'](),_0x4ad7a3={'mapId':_0x30f776[_0x1d1dcb(0x323)],'eventId':_0x30f776[_0x1d1dcb(0x2aa)]||_0x45e5ba[_0x1d1dcb(0x6c6)](),'pageId':_0x30f776[_0x1d1dcb(0x32a)]};if(_0x4ad7a3['mapId']<=0x0)_0x4ad7a3[_0x1d1dcb(0x22c)]=$gameMap?$gameMap[_0x1d1dcb(0x22c)]():0x1;$gameTemp[_0x1d1dcb(0x576)]()[_0x1d1dcb(0x29d)](_0x4ad7a3);}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x23a),_0x443bfd=>{const _0xe2db05=_0x37ae6a;VisuMZ['ConvertParams'](_0x443bfd,_0x443bfd);switch(_0x443bfd['Value']){case _0xe2db05(0x3ca):$gameSystem[_0xe2db05(0x238)](!![]);break;case _0xe2db05(0x3cc):$gameSystem['setDashingEnabled'](![]);break;case _0xe2db05(0x69c):$gameSystem['setDashingEnabled'](!$gameSystem['isDashingEnabled']());break;}}),PluginManager['registerCommand'](pluginData['name'],'EventIconChange',_0x2e50c5=>{const _0x28e9a5=_0x37ae6a;VisuMZ[_0x28e9a5(0x5a7)](_0x2e50c5,_0x2e50c5);const _0x5e2965=$gameTemp[_0x28e9a5(0x576)]();_0x2e50c5[_0x28e9a5(0x323)]=_0x2e50c5[_0x28e9a5(0x323)]||$gameMap['mapId'](),$gameSystem[_0x28e9a5(0x44a)](_0x2e50c5[_0x28e9a5(0x323)],_0x2e50c5[_0x28e9a5(0x2aa)]||_0x5e2965[_0x28e9a5(0x6c6)](),_0x2e50c5[_0x28e9a5(0x2c8)],_0x2e50c5[_0x28e9a5(0x1fb)],_0x2e50c5[_0x28e9a5(0x308)],_0x2e50c5[_0x28e9a5(0x2c5)]);}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x406),_0x7bdd09=>{const _0x1b2ee7=_0x37ae6a;VisuMZ[_0x1b2ee7(0x5a7)](_0x7bdd09,_0x7bdd09);const _0x396694=$gameTemp[_0x1b2ee7(0x576)]();_0x7bdd09[_0x1b2ee7(0x323)]=_0x7bdd09[_0x1b2ee7(0x323)]||$gameMap['mapId'](),$gameSystem[_0x1b2ee7(0x605)](_0x7bdd09[_0x1b2ee7(0x323)],_0x7bdd09['EventId']||_0x396694[_0x1b2ee7(0x6c6)]());}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x4d9),_0x5a6d6a=>{const _0x59dde2=_0x37ae6a;if($gameMap)for(const _0x281bce of $gameMap['events']()){if('YyVmq'!==_0x59dde2(0x456))return this[_0x59dde2(0x594)]=![],![];else _0x281bce['refresh']();}}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],'EventLabelVisible',_0x57a73f=>{const _0x1e1eb1=_0x37ae6a;VisuMZ[_0x1e1eb1(0x5a7)](_0x57a73f,_0x57a73f);switch(_0x57a73f[_0x1e1eb1(0x215)]){case _0x1e1eb1(0x3db):$gameSystem['setEventLabelsVisible'](!![]);break;case'Hidden':$gameSystem[_0x1e1eb1(0x57c)](![]);break;case _0x1e1eb1(0x69c):$gameSystem[_0x1e1eb1(0x57c)](!$gameSystem[_0x1e1eb1(0x689)]());break;}}),PluginManager[_0x37ae6a(0x4fb)](pluginData['name'],_0x37ae6a(0x230),_0x2d4ede=>{const _0x595eb7=_0x37ae6a;VisuMZ['ConvertParams'](_0x2d4ede,_0x2d4ede);const _0x38aa5b=$gameTemp[_0x595eb7(0x576)]();if(!$gameMap)return;const _0x14e9d3=$gameMap[_0x595eb7(0x3a9)](_0x2d4ede['EventId']||_0x38aa5b['eventId']());if(_0x14e9d3)_0x14e9d3[_0x595eb7(0x4f2)]();}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],'EventLocationCreate',_0x5da2db=>{const _0x4bbe85=_0x37ae6a;VisuMZ[_0x4bbe85(0x5a7)](_0x5da2db,_0x5da2db);const _0x12e1b9=$gameTemp[_0x4bbe85(0x576)](),_0x793a8b=_0x5da2db[_0x4bbe85(0x323)]||$gameMap[_0x4bbe85(0x22c)](),_0x37a455=_0x5da2db[_0x4bbe85(0x2aa)]||_0x12e1b9[_0x4bbe85(0x6c6)](),_0x7b3e39=_0x5da2db[_0x4bbe85(0x302)]||0x0,_0x412f60=_0x5da2db[_0x4bbe85(0x327)]||0x0,_0x4e51cd=_0x5da2db[_0x4bbe85(0x529)]||0x2,_0x3cf347=((_0x5da2db[_0x4bbe85(0x32a)]||0x1)-0x1)[_0x4bbe85(0x4fc)](0x0,0x13),_0x232594=_0x5da2db[_0x4bbe85(0x44c)]||0x0;$gameSystem[_0x4bbe85(0x291)](_0x793a8b,_0x37a455,_0x7b3e39,_0x412f60,_0x4e51cd,_0x3cf347,_0x232594);}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x492),_0x4fe1ce=>{const _0xecceba=_0x37ae6a;VisuMZ[_0xecceba(0x5a7)](_0x4fe1ce,_0x4fe1ce);const _0x36347b=$gameTemp['getLastPluginCommandInterpreter'](),_0x5f0a8b=_0x4fe1ce[_0xecceba(0x323)]||$gameMap[_0xecceba(0x22c)](),_0x3aad5e=_0x4fe1ce[_0xecceba(0x2aa)]||_0x36347b[_0xecceba(0x6c6)]();$gameSystem[_0xecceba(0x66f)](_0x5f0a8b,_0x3aad5e);}),PluginManager[_0x37ae6a(0x4fb)](pluginData['name'],_0x37ae6a(0x317),_0x322a71=>{const _0x455985=_0x37ae6a;VisuMZ['ConvertParams'](_0x322a71,_0x322a71);const _0x240f20=_0x322a71[_0x455985(0x45f)];$gameTimer[_0x455985(0x457)](_0x240f20);}),PluginManager['registerCommand'](pluginData['name'],'EventTimerExpireClear',_0x23f28a=>{const _0x1c49f5=_0x37ae6a;$gameTimer[_0x1c49f5(0x457)](0x0);}),PluginManager[_0x37ae6a(0x4fb)](pluginData['name'],_0x37ae6a(0x25d),_0x1e6258=>{const _0x181c57=_0x37ae6a;if(!$gameTimer['isWorking']())return;VisuMZ['ConvertParams'](_0x1e6258,_0x1e6258);let _0x7fda63=0x0;_0x7fda63+=_0x1e6258[_0x181c57(0x373)],_0x7fda63+=_0x1e6258['Seconds']*0x3c,_0x7fda63+=_0x1e6258['Minutes']*0x3c*0x3c,_0x7fda63+=_0x1e6258[_0x181c57(0x362)]*0x3c*0x3c*0x3c,$gameTimer[_0x181c57(0x53b)](_0x7fda63);}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x525),_0x5cf0b8=>{const _0xdd6a50=_0x37ae6a;if(!$gameTimer[_0xdd6a50(0x2a1)]())return;VisuMZ['ConvertParams'](_0x5cf0b8,_0x5cf0b8);let _0x16e714=0x0;_0x16e714+=_0x5cf0b8[_0xdd6a50(0x373)],_0x16e714+=_0x5cf0b8[_0xdd6a50(0x382)]*0x3c,_0x16e714+=_0x5cf0b8[_0xdd6a50(0x3bb)]*0x3c*0x3c,_0x16e714+=_0x5cf0b8[_0xdd6a50(0x362)]*0x3c*0x3c*0x3c,$gameTimer['setFrames'](_0x16e714);}),PluginManager[_0x37ae6a(0x4fb)](pluginData['name'],_0x37ae6a(0x6ad),_0x7ebac=>{const _0x4091da=_0x37ae6a;if(!$gameTimer[_0x4091da(0x2a1)]())return;$gameTimer[_0x4091da(0x45a)]();}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x63b),_0x10cb4f=>{const _0x1be604=_0x37ae6a;if(!$gameTimer['isWorking']())return;$gameTimer[_0x1be604(0x4ac)]();}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],'EventTimerSpeed',_0x34bf87=>{const _0x5a9ca6=_0x37ae6a;VisuMZ['ConvertParams'](_0x34bf87,_0x34bf87);const _0x23486c=_0x34bf87[_0x5a9ca6(0x6ab)]||0x0;$gameTimer[_0x5a9ca6(0x61f)](_0x23486c);}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x61c),_0x389c1d=>{const _0x1a7a73=_0x37ae6a;VisuMZ[_0x1a7a73(0x5a7)](_0x389c1d,_0x389c1d);const _0x5393b9=!_0x389c1d['Chase'];$gameSystem[_0x1a7a73(0x2ed)](_0x5393b9);}),PluginManager['registerCommand'](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x52f),_0x51a9d0=>{const _0x4e1a0d=_0x37ae6a;VisuMZ[_0x4e1a0d(0x5a7)](_0x51a9d0,_0x51a9d0);const _0x455d79=(_0x51a9d0[_0x4e1a0d(0x405)]||0x0)-0x1,_0x93005c=!_0x51a9d0[_0x4e1a0d(0x2dc)],_0x1566fe=$gamePlayer['followers']()[_0x4e1a0d(0x1df)](_0x455d79);if(_0x1566fe)_0x1566fe['setChaseOff'](_0x93005c);}),PluginManager[_0x37ae6a(0x4fb)](pluginData['name'],_0x37ae6a(0x511),_0x427698=>{const _0xf00d9e=_0x37ae6a;VisuMZ[_0xf00d9e(0x5a7)](_0x427698,_0x427698);const _0x5b17eb=_0x427698[_0xf00d9e(0x405)];$gameSystem[_0xf00d9e(0x6b3)](_0x5b17eb);}),PluginManager['registerCommand'](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x570),_0x232b13=>{const _0x2d0671=_0x37ae6a;VisuMZ['ConvertParams'](_0x232b13,_0x232b13),$gameSystem[_0x2d0671(0x6b3)](0x0),$gameSystem['setStopFollowerChasing'](![]);for(const _0x418b7e of $gamePlayer[_0x2d0671(0x4a0)]()[_0x2d0671(0x60e)]){if(_0x418b7e)_0x418b7e['setChaseOff'](![]);}}),PluginManager[_0x37ae6a(0x4fb)](pluginData['name'],'SwitchGetSelfSwitchABCD',_0x3fd8c4=>{const _0x2cf146=_0x37ae6a;VisuMZ[_0x2cf146(0x5a7)](_0x3fd8c4,_0x3fd8c4);const _0x513000=$gameTemp[_0x2cf146(0x576)]();_0x3fd8c4[_0x2cf146(0x323)]=_0x3fd8c4[_0x2cf146(0x323)]||$gameMap[_0x2cf146(0x22c)]();const _0x4d0758=[_0x3fd8c4[_0x2cf146(0x323)],_0x3fd8c4[_0x2cf146(0x2aa)]||_0x513000[_0x2cf146(0x6c6)](),_0x3fd8c4[_0x2cf146(0x3a6)]],_0x397416=_0x3fd8c4[_0x2cf146(0x26f)],_0x4fd285=$gameSelfSwitches[_0x2cf146(0x3b7)](_0x4d0758)||![];$gameSwitches[_0x2cf146(0x2b2)](_0x397416,_0x4fd285);}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x2b7),_0x49ef87=>{const _0x14358b=_0x37ae6a;VisuMZ[_0x14358b(0x5a7)](_0x49ef87,_0x49ef87);const _0x1ec4c6=$gameTemp['getLastPluginCommandInterpreter']();_0x49ef87['MapId']=_0x49ef87[_0x14358b(0x323)]||$gameMap['mapId']();const _0x4ee10b=[_0x49ef87[_0x14358b(0x323)],_0x49ef87[_0x14358b(0x2aa)]||_0x1ec4c6['eventId'](),'Self\x20Switch\x20%1'[_0x14358b(0x51a)](_0x49ef87['SwitchId'])],_0x304bc7=_0x49ef87[_0x14358b(0x26f)],_0x4c8259=$gameSelfSwitches['value'](_0x4ee10b)||![];$gameSwitches[_0x14358b(0x2b2)](_0x304bc7,_0x4c8259);}),PluginManager['registerCommand'](pluginData['name'],_0x37ae6a(0x679),_0x4b7889=>{const _0x138d1e=_0x37ae6a;VisuMZ['ConvertParams'](_0x4b7889,_0x4b7889);const _0x4882cf=$gameTemp[_0x138d1e(0x576)]();_0x4b7889[_0x138d1e(0x323)]=_0x4b7889['MapId']||$gameMap[_0x138d1e(0x22c)]();const _0x208e45=[_0x4b7889[_0x138d1e(0x323)],_0x4b7889['EventId']||_0x4882cf[_0x138d1e(0x6c6)](),_0x138d1e(0x2ee)[_0x138d1e(0x51a)](_0x4b7889['VariableId'])],_0x3629b7=_0x4b7889[_0x138d1e(0x50f)],_0x1d14a3=$gameSelfSwitches[_0x138d1e(0x3b7)](_0x208e45)||![];$gameVariables['setValue'](_0x3629b7,_0x1d14a3);}),PluginManager['registerCommand'](pluginData[_0x37ae6a(0x388)],'MorphEventTo',_0x1a5505=>{const _0xb2eda2=_0x37ae6a;VisuMZ['ConvertParams'](_0x1a5505,_0x1a5505);if(!$gameMap)return;const _0x18712f=$gameTemp[_0xb2eda2(0x576)](),_0x278ca1=_0x1a5505[_0xb2eda2(0x33c)];_0x1a5505[_0xb2eda2(0x534)]=_0x1a5505['Step1MapId']||$gameMap[_0xb2eda2(0x22c)](),_0x1a5505[_0xb2eda2(0x1ed)]=_0x1a5505[_0xb2eda2(0x1ed)]||$gameMap[_0xb2eda2(0x22c)](),_0x1a5505[_0xb2eda2(0x508)]=_0x1a5505[_0xb2eda2(0x508)]['toUpperCase']()[_0xb2eda2(0x519)]();if(!_0x278ca1&&_0x1a5505[_0xb2eda2(0x534)]!==$gameMap[_0xb2eda2(0x22c)]())return;if($gameMap['mapId']()===_0x1a5505[_0xb2eda2(0x534)]){const _0x17e962=$gameMap[_0xb2eda2(0x3a9)](_0x1a5505[_0xb2eda2(0x591)]||_0x18712f[_0xb2eda2(0x6c6)]());if(!_0x17e962)return;if(_0x1a5505[_0xb2eda2(0x508)]!==_0xb2eda2(0x421))_0x17e962[_0xb2eda2(0x4a4)](_0x1a5505[_0xb2eda2(0x508)]);else{if(_0xb2eda2(0x32b)!==_0xb2eda2(0x32b)){_0x39dd6d[_0xb2eda2(0x5a7)](_0x46ed19,_0x3fb708);const _0x52b23b=_0x5b7f44[_0xb2eda2(0x576)]();_0x149829[_0xb2eda2(0x423)](_0x55732e[_0xb2eda2(0x35c)]||_0x52b23b[_0xb2eda2(0x6c6)]());}else _0x17e962['morphInto'](_0x1a5505[_0xb2eda2(0x1ed)],_0x1a5505[_0xb2eda2(0x265)]||_0x18712f[_0xb2eda2(0x6c6)]());}}_0x278ca1&&$gameSystem[_0xb2eda2(0x4e5)](_0x1a5505[_0xb2eda2(0x534)],_0x1a5505[_0xb2eda2(0x591)],_0x1a5505[_0xb2eda2(0x508)],_0x1a5505['Step2MapId'],_0x1a5505[_0xb2eda2(0x265)]);}),PluginManager['registerCommand'](pluginData['name'],'MorphEventRemove',_0x1d5475=>{const _0x3f86b8=_0x37ae6a;VisuMZ[_0x3f86b8(0x5a7)](_0x1d5475,_0x1d5475);if(!$gameMap)return;const _0x566776=$gameTemp['getLastPluginCommandInterpreter']();_0x1d5475[_0x3f86b8(0x323)]=_0x1d5475[_0x3f86b8(0x323)]||$gameMap[_0x3f86b8(0x22c)]();if($gameMap[_0x3f86b8(0x22c)]()===_0x1d5475['MapId']){const _0x57f33f=$gameMap[_0x3f86b8(0x3a9)](_0x1d5475[_0x3f86b8(0x2aa)]||_0x566776['eventId']());_0x57f33f[_0x3f86b8(0x57e)]();}_0x1d5475[_0x3f86b8(0x659)]&&$gameSystem['deletePreservedMorphEventDataKey'](_0x1d5475['MapId'],_0x1d5475[_0x3f86b8(0x2aa)]||_0x566776[_0x3f86b8(0x6c6)]());}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x2a3),_0x313b3f=>{const _0x57f9fb=_0x37ae6a;VisuMZ['ConvertParams'](_0x313b3f,_0x313b3f),$gameSystem['setEventIconData']($gamePlayer,_0x313b3f[_0x57f9fb(0x2c8)],_0x313b3f[_0x57f9fb(0x1fb)],_0x313b3f[_0x57f9fb(0x308)],_0x313b3f[_0x57f9fb(0x2c5)]);}),PluginManager['registerCommand'](pluginData[_0x37ae6a(0x388)],'PlayerIconDelete',_0x47185c=>{const _0x48b3c0=_0x37ae6a;VisuMZ[_0x48b3c0(0x5a7)](_0x47185c,_0x47185c),$gameSystem['deleteIconsOnEventsData']($gamePlayer);}),PluginManager['registerCommand'](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x294),_0x485173=>{const _0x1a2a44=_0x37ae6a;VisuMZ['ConvertParams'](_0x485173,_0x485173),$gameSystem[_0x1a2a44(0x6a7)](!_0x485173[_0x1a2a44(0x3ca)]);}),PluginManager['registerCommand'](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x61b),_0x57c289=>{const _0x695a27=_0x37ae6a;VisuMZ[_0x695a27(0x5a7)](_0x57c289,_0x57c289),$gameSystem[_0x695a27(0x441)](_0x57c289[_0x695a27(0x4b1)]);}),PluginManager['registerCommand'](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x2c3),_0x35efdf=>{const _0x46cf98=_0x37ae6a;VisuMZ['ConvertParams'](_0x35efdf,_0x35efdf);const _0x556c69=_0x35efdf[_0x46cf98(0x323)]||$gameMap[_0x46cf98(0x22c)]();$gameSelfSwitches['resetSelfSwitchesForMap'](_0x556c69);}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],'SelfSwitchABCD',_0x482aac=>{const _0x5de743=_0x37ae6a;VisuMZ[_0x5de743(0x5a7)](_0x482aac,_0x482aac);const _0x5c427e=$gameTemp[_0x5de743(0x576)]();_0x482aac['MapId']=_0x482aac['MapId']||$gameMap[_0x5de743(0x22c)]();const _0x2eff66=[_0x482aac[_0x5de743(0x323)],_0x482aac[_0x5de743(0x2aa)]||_0x5c427e[_0x5de743(0x6c6)](),_0x482aac[_0x5de743(0x3a6)]];switch(_0x482aac[_0x5de743(0x475)]){case'ON':$gameSelfSwitches[_0x5de743(0x2b2)](_0x2eff66,!![]);break;case _0x5de743(0x54c):$gameSelfSwitches[_0x5de743(0x2b2)](_0x2eff66,![]);break;case _0x5de743(0x69c):$gameSelfSwitches[_0x5de743(0x2b2)](_0x2eff66,!$gameSelfSwitches[_0x5de743(0x3b7)](_0x2eff66));break;}}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x648),_0x49de4e=>{const _0x172f98=_0x37ae6a;VisuMZ[_0x172f98(0x5a7)](_0x49de4e,_0x49de4e);const _0x7dabef=$gameTemp[_0x172f98(0x576)]();_0x49de4e['MapId']=_0x49de4e[_0x172f98(0x323)]||$gameMap[_0x172f98(0x22c)]();const _0x53e860=[_0x49de4e[_0x172f98(0x323)],_0x49de4e[_0x172f98(0x2aa)]||_0x7dabef[_0x172f98(0x6c6)](),'Self\x20Switch\x20%1'[_0x172f98(0x51a)](_0x49de4e[_0x172f98(0x439)])];switch(_0x49de4e[_0x172f98(0x475)]){case'ON':$gameSelfSwitches[_0x172f98(0x2b2)](_0x53e860,!![]);break;case _0x172f98(0x54c):$gameSelfSwitches['setValue'](_0x53e860,![]);break;case'Toggle':$gameSelfSwitches[_0x172f98(0x2b2)](_0x53e860,!$gameSelfSwitches[_0x172f98(0x3b7)](_0x53e860));break;}}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x464),_0x3e3585=>{const _0x166778=_0x37ae6a;VisuMZ[_0x166778(0x5a7)](_0x3e3585,_0x3e3585);const _0x2fb3b1=$gameTemp[_0x166778(0x576)]();_0x3e3585[_0x166778(0x323)]=_0x3e3585[_0x166778(0x323)]||$gameMap[_0x166778(0x22c)]();const _0x362cee=[_0x3e3585[_0x166778(0x323)],_0x3e3585['EventId']||_0x2fb3b1[_0x166778(0x6c6)](),_0x166778(0x2ee)[_0x166778(0x51a)](_0x3e3585[_0x166778(0x296)])],_0x568064=VisuMZ[_0x166778(0x21d)]($gameSelfSwitches[_0x166778(0x3b7)](_0x362cee),_0x3e3585[_0x166778(0x475)],_0x3e3585['Operation']);$gameSelfSwitches['setValue'](_0x362cee,_0x568064);}),PluginManager['registerCommand'](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x574),_0x4bdce0=>{const _0x951958=_0x37ae6a;VisuMZ[_0x951958(0x5a7)](_0x4bdce0,_0x4bdce0);const _0x133c50=$gameTemp[_0x951958(0x576)](),_0x35fa55={'template':_0x4bdce0[_0x951958(0x508)],'mapId':_0x4bdce0[_0x951958(0x323)]||$gameMap[_0x951958(0x22c)](),'eventId':_0x4bdce0[_0x951958(0x2aa)]||_0x133c50['eventId'](),'x':_0x4bdce0[_0x951958(0x302)],'y':_0x4bdce0[_0x951958(0x327)],'spawnPreserved':_0x4bdce0[_0x951958(0x425)],'spawnEventId':$gameMap['_spawnedEvents'][_0x951958(0x5e5)]+0x3e8},_0x2c62d7=_0x4bdce0[_0x951958(0x2be)]||0x0;if(!VisuMZ[_0x951958(0x4c3)][_0x35fa55[_0x951958(0x22c)]]&&_0x35fa55[_0x951958(0x22c)]!==$gameMap['mapId']()){let _0x564f0e=_0x951958(0x619)['format'](_0x35fa55['mapId']);_0x564f0e+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x564f0e+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x564f0e+=_0x951958(0x347),_0x564f0e+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'['format'](_0x35fa55[_0x951958(0x22c)]),alert(_0x564f0e);return;}const _0x526385=$gameMap[_0x951958(0x1ec)](_0x35fa55,_0x4bdce0['Collision'],_0x4bdce0[_0x951958(0x342)]);if(_0x2c62d7){if(_0x951958(0x31e)===_0x951958(0x31e))$gameSwitches['setValue'](_0x2c62d7,!!_0x526385);else return this[_0x951958(0x532)]();}}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x2c9),_0x109eaa=>{const _0x134787=_0x37ae6a;VisuMZ[_0x134787(0x5a7)](_0x109eaa,_0x109eaa);const _0x379042=$gameTemp[_0x134787(0x576)](),_0x520bc2={'template':_0x109eaa[_0x134787(0x508)],'mapId':_0x109eaa[_0x134787(0x323)]||$gameMap[_0x134787(0x22c)](),'eventId':_0x109eaa[_0x134787(0x2aa)]||_0x379042[_0x134787(0x6c6)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x109eaa[_0x134787(0x425)],'spawnEventId':$gameMap[_0x134787(0x33a)][_0x134787(0x5e5)]+0x3e8},_0x5d5b21=_0x109eaa['SuccessSwitchId']||0x0;if(!VisuMZ[_0x134787(0x4c3)][_0x520bc2[_0x134787(0x22c)]]&&_0x520bc2['mapId']!==$gameMap[_0x134787(0x22c)]()){if(_0x134787(0x68c)!=='FEIjT'){let _0x37d165=_0x134787(0x619)[_0x134787(0x51a)](_0x520bc2[_0x134787(0x22c)]);_0x37d165+=_0x134787(0x47b),_0x37d165+=_0x134787(0x612),_0x37d165+=_0x134787(0x347),_0x37d165+=_0x134787(0x3ce)[_0x134787(0x51a)](_0x520bc2[_0x134787(0x22c)]),alert(_0x37d165);return;}else return _0x1adc4d['EventsMoveCore'][_0x134787(0x42b)][_0x134787(0x609)](this,_0x55bec4);}const _0x556b80=$gameMap['prepareSpawnedEventAtRegion'](_0x520bc2,_0x109eaa[_0x134787(0x3eb)],_0x109eaa['Collision'],_0x109eaa['Passability']);_0x5d5b21&&$gameSwitches['setValue'](_0x5d5b21,!!_0x556b80);}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x615),_0xcef6b6=>{const _0x7f7b7d=_0x37ae6a;VisuMZ[_0x7f7b7d(0x5a7)](_0xcef6b6,_0xcef6b6);const _0x33a2fc=$gameTemp[_0x7f7b7d(0x576)](),_0x7253e2={'template':_0xcef6b6['TemplateName'],'mapId':_0xcef6b6['MapId']||$gameMap['mapId'](),'eventId':_0xcef6b6[_0x7f7b7d(0x2aa)]||_0x33a2fc['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0xcef6b6[_0x7f7b7d(0x425)],'spawnEventId':$gameMap[_0x7f7b7d(0x33a)][_0x7f7b7d(0x5e5)]+0x3e8},_0xb76b68=_0xcef6b6['SuccessSwitchId']||0x0;if(!VisuMZ[_0x7f7b7d(0x4c3)][_0x7253e2[_0x7f7b7d(0x22c)]]&&_0x7253e2[_0x7f7b7d(0x22c)]!==$gameMap['mapId']()){if(_0x7f7b7d(0x30b)===_0x7f7b7d(0x30b)){let _0x4a2df='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x7f7b7d(0x51a)](_0x7253e2[_0x7f7b7d(0x22c)]);_0x4a2df+=_0x7f7b7d(0x47b),_0x4a2df+=_0x7f7b7d(0x612),_0x4a2df+=_0x7f7b7d(0x347),_0x4a2df+=_0x7f7b7d(0x3ce)[_0x7f7b7d(0x51a)](_0x7253e2[_0x7f7b7d(0x22c)]),alert(_0x4a2df);return;}else this['_selfTarget']=_0x5b1c34;}const _0x2d8304=$gameMap[_0x7f7b7d(0x4b4)](_0x7253e2,_0xcef6b6[_0x7f7b7d(0x318)],_0xcef6b6['Collision'],_0xcef6b6[_0x7f7b7d(0x342)]);if(_0xb76b68){if(_0x7f7b7d(0x3da)!==_0x7f7b7d(0x3da)){if(this[_0x7f7b7d(0x43e)]===_0x1fb60c)this[_0x7f7b7d(0x60d)]();if(this[_0x7f7b7d(0x43e)][_0x7f7b7d(0x5e1)]===_0x340b2e)this['initEventsMoveCore']();this[_0x7f7b7d(0x43e)][_0x7f7b7d(0x5e1)]=_0x1d518f;}else $gameSwitches[_0x7f7b7d(0x2b2)](_0xb76b68,!!_0x2d8304);}}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x617),_0x2421e8=>{const _0x501f86=_0x37ae6a;VisuMZ[_0x501f86(0x5a7)](_0x2421e8,_0x2421e8);const _0x4676e2=$gameTemp[_0x501f86(0x576)]();$gameMap['despawnEventId'](_0x2421e8[_0x501f86(0x35c)]||_0x4676e2['eventId']());}),PluginManager[_0x37ae6a(0x4fb)](pluginData['name'],'SpawnEventDespawnAtXY',_0x5f228c=>{const _0x3e65bc=_0x37ae6a;VisuMZ[_0x3e65bc(0x5a7)](_0x5f228c,_0x5f228c);const _0x400062=_0x5f228c[_0x3e65bc(0x302)],_0x400f2c=_0x5f228c[_0x3e65bc(0x327)];$gameMap['despawnAtXY'](_0x400062,_0x400f2c);}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],'SpawnEventDespawnRegions',_0x228534=>{const _0x564e62=_0x37ae6a;VisuMZ[_0x564e62(0x5a7)](_0x228534,_0x228534),$gameMap[_0x564e62(0x288)](_0x228534[_0x564e62(0x3eb)]);}),PluginManager[_0x37ae6a(0x4fb)](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x29f),_0x4efa60=>{const _0x555571=_0x37ae6a;VisuMZ[_0x555571(0x5a7)](_0x4efa60,_0x4efa60),$gameMap['despawnTerrainTags'](_0x4efa60[_0x555571(0x318)]);}),PluginManager['registerCommand'](pluginData[_0x37ae6a(0x388)],_0x37ae6a(0x312),_0x4e676d=>{const _0x38f97c=_0x37ae6a;VisuMZ[_0x38f97c(0x5a7)](_0x4e676d,_0x4e676d),$gameMap['despawnEverything']();}),VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x354)]=Scene_Boot[_0x37ae6a(0x3a7)][_0x37ae6a(0x628)],Scene_Boot[_0x37ae6a(0x3a7)]['onDatabaseLoaded']=function(){const _0x499afc=_0x37ae6a;VisuMZ[_0x499afc(0x4de)][_0x499afc(0x354)]['call'](this),this[_0x499afc(0x68d)](),this[_0x499afc(0x4db)]();if(VisuMZ['EventsMoveCore'][_0x499afc(0x552)])VisuMZ['EventsMoveCore'][_0x499afc(0x552)][_0x499afc(0x218)]();},VisuMZ['PreloadedMaps']=[],VisuMZ['EventTemplates']={},Scene_Boot['prototype'][_0x37ae6a(0x68d)]=function(){const _0x12f3de=_0x37ae6a;if(DataManager[_0x12f3de(0x226)]()||DataManager[_0x12f3de(0x3c6)]())return;const _0x371853=VisuMZ[_0x12f3de(0x4de)][_0x12f3de(0x556)][_0x12f3de(0x5d9)],_0x3cf6d4=_0x371853['PreloadMaps'][_0x12f3de(0x2cb)](0x0);for(const _0x21d0a4 of _0x371853['List']){_0x21d0a4['Name']=_0x21d0a4['Name'][_0x12f3de(0x5cf)]()[_0x12f3de(0x519)](),VisuMZ[_0x12f3de(0x6c5)][_0x21d0a4[_0x12f3de(0x205)]]=_0x21d0a4;if(!_0x3cf6d4[_0x12f3de(0x6db)](_0x21d0a4[_0x12f3de(0x266)]))_0x3cf6d4[_0x12f3de(0x6bf)](_0x21d0a4['MapID']);}for(const _0x551ee5 of _0x3cf6d4){if(VisuMZ[_0x12f3de(0x4c3)][_0x551ee5])continue;const _0x7f58be=_0x12f3de(0x297)[_0x12f3de(0x51a)](_0x551ee5[_0x12f3de(0x462)](0x3)),_0x17a325=_0x12f3de(0x245)[_0x12f3de(0x51a)](_0x551ee5);DataManager['loadDataFile'](_0x17a325,_0x7f58be),setTimeout(this['VisuMZ_Setup_Preload_Map'][_0x12f3de(0x577)](this,_0x551ee5,_0x17a325),0x64);}},Scene_Boot[_0x37ae6a(0x3a7)][_0x37ae6a(0x22b)]=function(_0x357546,_0x23bcf9){const _0x3dc054=_0x37ae6a;window[_0x23bcf9]?(VisuMZ[_0x3dc054(0x4c3)][_0x357546]=window[_0x23bcf9],window[_0x23bcf9]=undefined):setTimeout(this[_0x3dc054(0x22b)][_0x3dc054(0x577)](this,_0x357546,_0x23bcf9),0x64);},VisuMZ[_0x37ae6a(0x2ef)]=[],VisuMZ[_0x37ae6a(0x5f0)]=[],VisuMZ['MapSwitches']=[],VisuMZ[_0x37ae6a(0x262)]=[],VisuMZ['SelfVariables']=[],VisuMZ[_0x37ae6a(0x359)]=[],Scene_Boot[_0x37ae6a(0x3a7)][_0x37ae6a(0x4db)]=function(){const _0x501b12=_0x37ae6a;for(let _0x5c60ec=0x1;_0x5c60ec<$dataSystem['switches'][_0x501b12(0x5e5)];_0x5c60ec++){if($dataSystem[_0x501b12(0x53f)][_0x5c60ec]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x501b12(0x2ef)]['push'](_0x5c60ec);if($dataSystem[_0x501b12(0x53f)][_0x5c60ec][_0x501b12(0x6b7)](/<SELF>/i))VisuMZ[_0x501b12(0x5f0)][_0x501b12(0x6bf)](_0x5c60ec);if($dataSystem['switches'][_0x5c60ec][_0x501b12(0x6b7)](/<MAP>/i))VisuMZ[_0x501b12(0x42c)]['push'](_0x5c60ec);}for(let _0x20e634=0x1;_0x20e634<$dataSystem[_0x501b12(0x564)]['length'];_0x20e634++){if(_0x501b12(0x450)!==_0x501b12(0x450))this['_speed']=_0x30a50d,this[_0x501b12(0x618)]=!![],_0xfa91d2>0x0&&(this['_frames']=_0x566463['max'](this[_0x501b12(0x5bd)],0x1));else{if($dataSystem['variables'][_0x20e634]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x501b12(0x262)][_0x501b12(0x6bf)](_0x20e634);if($dataSystem[_0x501b12(0x564)][_0x20e634][_0x501b12(0x6b7)](/<SELF>/i))VisuMZ['SelfVariables'][_0x501b12(0x6bf)](_0x20e634);if($dataSystem[_0x501b12(0x564)][_0x20e634][_0x501b12(0x6b7)](/<MAP>/i))VisuMZ[_0x501b12(0x359)][_0x501b12(0x6bf)](_0x20e634);}}},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x552)]={},VisuMZ[_0x37ae6a(0x4de)]['CustomPageConditions'][_0x37ae6a(0x218)]=function(){const _0x29ea2e=_0x37ae6a;this['_interpreter']=new Game_CPCInterpreter(),this[_0x29ea2e(0x203)]();},VisuMZ[_0x37ae6a(0x4de)]['CustomPageConditions']['determineCommonEventsWithCPC']=function(){const _0x399ae9=_0x37ae6a;this[_0x399ae9(0x415)]=[];for(const _0x504c5f of $dataCommonEvents){if(_0x399ae9(0x206)===_0x399ae9(0x206)){if(!_0x504c5f)continue;VisuMZ[_0x399ae9(0x4de)][_0x399ae9(0x552)]['loadCPC'](_0x504c5f);if(_0x504c5f[_0x399ae9(0x438)][_0x399ae9(0x5e5)]>0x0)this[_0x399ae9(0x415)]['push'](_0x504c5f['id']);}else _0x54d268[_0x399ae9(0x438)][_0x399ae9(0x6bf)](_0x61b1e8);}},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x552)][_0x37ae6a(0x5bc)]=function(_0x13bd1a,_0x295bba,_0x5d13f9){const _0x922fbe=_0x37ae6a;return this['_interpreter']['setup'](_0x13bd1a,_0x295bba),_0x5d13f9?this['_interpreter'][_0x922fbe(0x523)](_0x5d13f9):this[_0x922fbe(0x4bd)][_0x922fbe(0x42f)](),this[_0x922fbe(0x4bd)][_0x922fbe(0x565)];},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x552)][_0x37ae6a(0x3c3)]=function(_0x12665f){const _0x378be0=_0x37ae6a;let _0x3843f9=![];_0x12665f['CPC']=[];for(const _0x479bfc of _0x12665f['list']){if(_0x378be0(0x2fb)===_0x378be0(0x589)){if(_0x555071['match'](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x563c4d[_0x378be0(0x6b7)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];}else{if([0x6c,0x198][_0x378be0(0x6db)](_0x479bfc['code'])){const _0x459b38=_0x479bfc[_0x378be0(0x466)][0x0];if(_0x459b38[_0x378be0(0x6b7)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x3843f9=!![];else _0x459b38[_0x378be0(0x6b7)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x3843f9=![]);}_0x3843f9&&_0x12665f[_0x378be0(0x438)]['push'](_0x479bfc);}}},getSelfSwitchValue=function(_0x3d49f2,_0x5d911c,_0x5c1928){const _0x5d371a=_0x37ae6a;let _0x4b70a1=[_0x3d49f2,_0x5d911c,_0x5d371a(0x592)[_0x5d371a(0x51a)](_0x5c1928)];return typeof _0x5c1928===_0x5d371a(0x1fa)&&(_0x4b70a1=[_0x3d49f2,_0x5d911c,_0x5c1928['toUpperCase']()['trim']()]),$gameSelfSwitches[_0x5d371a(0x3b7)](_0x4b70a1);},getMapSwitchValue=function(_0x1f2e2b,_0x9e363b){const _0xf7db60=_0x37ae6a;let _0x35613a=[0x0,0x0,_0xf7db60(0x232)[_0xf7db60(0x51a)](_0x1f2e2b,_0x9e363b)];return $gameSelfSwitches[_0xf7db60(0x3b7)](_0x35613a);},getMapVariableValue=function(_0x261e8f,_0x5d5a41){const _0x4c36cf=_0x37ae6a;let _0x5644ba=[0x0,0x0,_0x4c36cf(0x433)[_0x4c36cf(0x51a)](_0x261e8f,_0x5d5a41)];return $gameSelfSwitches['value'](_0x5644ba);},getSelfVariableValue=function(_0x50e68a,_0x11fe54,_0x572e74){const _0x119e17=_0x37ae6a,_0x5cff2e=[_0x50e68a,_0x11fe54,'Self\x20Variable\x20%1'[_0x119e17(0x51a)](_0x572e74)];return $gameSelfSwitches['value'](_0x5cff2e);},setSelfSwitchValue=function(_0x1be514,_0x226a03,_0x5416e3,_0x5a754c){const _0x4a34f6=_0x37ae6a;let _0x419903=[_0x1be514,_0x226a03,_0x4a34f6(0x592)[_0x4a34f6(0x51a)](_0x5416e3)];typeof _0x5416e3===_0x4a34f6(0x1fa)&&(_0x4a34f6(0x64a)!==_0x4a34f6(0x64a)?(_0x1a02e2[_0x4a34f6(0x4c2)](_0x5262da[_0x4a34f6(0x39b)]),_0x293ab8[_0x4a34f6(0x4de)]['Window_NumberInput_start']['call'](this),_0x2da162['clearSelfTarget']()):_0x419903=[_0x1be514,_0x226a03,_0x5416e3[_0x4a34f6(0x5cf)]()[_0x4a34f6(0x519)]()]),$gameSelfSwitches['setValue'](_0x419903,_0x5a754c);},setSelfVariableValue=function(_0x41c08d,_0xc9d1b7,_0x8ef22d,_0x124d7d){const _0x299f7d=[_0x41c08d,_0xc9d1b7,'Self\x20Variable\x20%1'['format'](_0x8ef22d)];$gameSelfSwitches['setValue'](_0x299f7d,_0x124d7d);},setMapSwitchValue=function(_0x22440c,_0x6bf6c9,_0x520124){const _0x1b7afc=_0x37ae6a;let _0x3a72a0=[0x0,0x0,_0x1b7afc(0x232)[_0x1b7afc(0x51a)](_0x22440c,_0x6bf6c9)];$gameSelfSwitches['setValue'](_0x3a72a0,_0x520124);},setMapVariableValue=function(_0x4f1b6f,_0x19cd86,_0xad9784){const _0x21d6ad=_0x37ae6a;let _0x4e0d60=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x21d6ad(0x51a)](_0x4f1b6f,_0x19cd86)];$gameSelfSwitches[_0x21d6ad(0x2b2)](_0x4e0d60,_0xad9784);},DataManager[_0x37ae6a(0x21c)]=function(_0x40eb5a){const _0xfadffe=_0x37ae6a;if(SceneManager['_scene'][_0xfadffe(0x678)]===Scene_Debug)return![];return VisuMZ[_0xfadffe(0x2ef)]['includes'](_0x40eb5a);},DataManager[_0x37ae6a(0x3aa)]=function(_0x31a615){const _0x29409d=_0x37ae6a;if(SceneManager['_scene'][_0x29409d(0x678)]===Scene_Debug)return![];return VisuMZ['AdvancedVariables'][_0x29409d(0x6db)](_0x31a615);},DataManager[_0x37ae6a(0x3ef)]=function(_0x1b21e6){const _0x170f90=_0x37ae6a;if(SceneManager['_scene'][_0x170f90(0x678)]===Scene_Debug)return![];return VisuMZ[_0x170f90(0x5f0)]['includes'](_0x1b21e6);},DataManager[_0x37ae6a(0x340)]=function(_0x574708){const _0x63e932=_0x37ae6a;if(SceneManager[_0x63e932(0x688)][_0x63e932(0x678)]===Scene_Debug)return![];return VisuMZ[_0x63e932(0x65f)][_0x63e932(0x6db)](_0x574708);},DataManager['isMapSwitch']=function(_0x9d518e){const _0x287d01=_0x37ae6a;if(BattleManager[_0x287d01(0x226)]())return![];return VisuMZ[_0x287d01(0x42c)]['includes'](_0x9d518e);},DataManager['isMapVariable']=function(_0x513b8a){const _0x1b07a6=_0x37ae6a;if(BattleManager[_0x1b07a6(0x226)]())return![];return VisuMZ[_0x1b07a6(0x359)][_0x1b07a6(0x6db)](_0x513b8a);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x677)]=Game_Temp['prototype'][_0x37ae6a(0x580)],Game_Temp[_0x37ae6a(0x3a7)][_0x37ae6a(0x580)]=function(_0x2582cf,_0x23066d){const _0x2d9d45=_0x37ae6a;if(this[_0x2d9d45(0x221)](_0x2582cf,_0x23066d))return;VisuMZ['EventsMoveCore']['Game_Temp_setDestination']['call'](this,_0x2582cf,_0x23066d);},Game_Temp['prototype'][_0x37ae6a(0x221)]=function(_0x3d1d99,_0x1cb1d8){const _0xd6c006=_0x37ae6a,_0x303369=$gameMap[_0xd6c006(0x345)](_0x3d1d99,_0x1cb1d8);for(const _0x301c17 of _0x303369){if(_0x301c17&&_0x301c17[_0xd6c006(0x56b)]())return _0x301c17['onClickTrigger'](),!![];}return![];},Game_Temp[_0x37ae6a(0x3a7)][_0x37ae6a(0x660)]=function(_0x2bba6b){const _0x76b519=_0x37ae6a;this[_0x76b519(0x46f)]=_0x2bba6b;},Game_Temp[_0x37ae6a(0x3a7)][_0x37ae6a(0x576)]=function(){const _0x2e1053=_0x37ae6a;return this[_0x2e1053(0x46f)];},Game_Temp[_0x37ae6a(0x3a7)]['registerSelfTarget']=function(_0x28aef8){const _0x71fdc7=_0x37ae6a;this[_0x71fdc7(0x332)]=_0x28aef8;},Game_Temp['prototype'][_0x37ae6a(0x5f2)]=function(){const _0x2685c8=_0x37ae6a;this[_0x2685c8(0x332)]=undefined;},Game_Temp[_0x37ae6a(0x3a7)][_0x37ae6a(0x2d9)]=function(){const _0x4a789e=_0x37ae6a;return this[_0x4a789e(0x332)];},VisuMZ['EventsMoveCore']['Game_System_initialize']=Game_System['prototype'][_0x37ae6a(0x218)],Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x218)]=function(){const _0x28a0b1=_0x37ae6a;VisuMZ[_0x28a0b1(0x4de)][_0x28a0b1(0x365)][_0x28a0b1(0x609)](this),this[_0x28a0b1(0x60d)](),this[_0x28a0b1(0x467)]();},Game_System['prototype']['initEventsMoveCore']=function(){const _0x542308=_0x37ae6a;this[_0x542308(0x43e)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x542308(0x1ef)]={},this['_MapSpawnedEventData']=[],this[_0x542308(0x2a5)]={},this['_SavedEventLocations']={},this[_0x542308(0x6d1)]=![],this['_PlayerDiagonalSetting']=_0x542308(0x632);},Game_System['prototype'][_0x37ae6a(0x446)]=function(){const _0x34583a=_0x37ae6a;if(this[_0x34583a(0x43e)]===undefined)this[_0x34583a(0x60d)]();if(this[_0x34583a(0x43e)][_0x34583a(0x5e1)]===undefined)this[_0x34583a(0x60d)]();return this[_0x34583a(0x43e)]['DashingEnable'];},Game_System['prototype'][_0x37ae6a(0x238)]=function(_0x2cdb78){const _0x54de0a=_0x37ae6a;if(this['_EventsMoveCoreSettings']===undefined)this[_0x54de0a(0x60d)]();if(this[_0x54de0a(0x43e)]['DashingEnable']===undefined)this[_0x54de0a(0x60d)]();this['_EventsMoveCoreSettings'][_0x54de0a(0x5e1)]=_0x2cdb78;},Game_System['prototype'][_0x37ae6a(0x36f)]=function(){const _0xeb51c2=_0x37ae6a;if(this[_0xeb51c2(0x43e)]===undefined)this[_0xeb51c2(0x60d)]();if(this[_0xeb51c2(0x43e)][_0xeb51c2(0x2f0)]===undefined)this['initEventsMoveCore']();return this[_0xeb51c2(0x43e)][_0xeb51c2(0x2f0)];},Game_System['prototype'][_0x37ae6a(0x26c)]=function(_0x32f484){const _0x35d463=_0x37ae6a;if(this[_0x35d463(0x43e)]===undefined)this[_0x35d463(0x60d)]();if(this[_0x35d463(0x43e)][_0x35d463(0x2f0)]===undefined)this[_0x35d463(0x60d)]();this['_EventsMoveCoreSettings']['EventAutoMovement']=_0x32f484;},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x689)]=function(){const _0x3a0d8c=_0x37ae6a;if(this[_0x3a0d8c(0x43e)]===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x3a0d8c(0x1f1)]===undefined)this[_0x3a0d8c(0x60d)]();return this['_EventsMoveCoreSettings']['VisibleEventLabels'];},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x57c)]=function(_0x3908e3){const _0x526544=_0x37ae6a;if(this[_0x526544(0x43e)]===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x526544(0x1f1)]===undefined)this[_0x526544(0x60d)]();this[_0x526544(0x43e)][_0x526544(0x1f1)]=_0x3908e3;},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x42e)]=function(){const _0x59c95e=_0x37ae6a;return this['_DisablePlayerControl']===undefined&&(this[_0x59c95e(0x6d1)]=![]),this['_DisablePlayerControl'];},Game_System['prototype'][_0x37ae6a(0x6a7)]=function(_0x183f19){const _0x2d35bf=_0x37ae6a;this[_0x2d35bf(0x6d1)]=_0x183f19;},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x6d3)]=function(){return this['_PlayerDiagonalSetting'];},Game_System['prototype']['setPlayerDiagonalSetting']=function(_0x39fa81){const _0x34e265=_0x37ae6a;this['_PlayerDiagonalSetting']=String(_0x39fa81)[_0x34e265(0x665)]()[_0x34e265(0x519)]();},Game_System['prototype'][_0x37ae6a(0x4a5)]=function(_0xe0778f){const _0xa4f41e=_0x37ae6a;if(this[_0xa4f41e(0x1ef)]===undefined)this[_0xa4f41e(0x60d)]();if(!_0xe0778f)return null;if(_0xe0778f===$gamePlayer){if(_0xa4f41e(0x3c8)!==_0xa4f41e(0x5f5))return this[_0xa4f41e(0x1ef)]['Player'];else{if(this[_0xa4f41e(0x43e)]===_0x4943e4)this[_0xa4f41e(0x60d)]();if(this[_0xa4f41e(0x43e)]['VisibleEventLabels']===_0x4cb1ed)this[_0xa4f41e(0x60d)]();return this[_0xa4f41e(0x43e)][_0xa4f41e(0x1f1)];}}else{const _0x466e81=VisuMZ['EventsMoveCore'][_0xa4f41e(0x556)],_0x32b984=_0xa4f41e(0x2b4)[_0xa4f41e(0x51a)](_0xe0778f['_mapId'],_0xe0778f[_0xa4f41e(0x269)]);return this[_0xa4f41e(0x1ef)][_0x32b984]=this['_EventIcons'][_0x32b984]||{'iconIndex':0x0,'bufferX':_0x466e81[_0xa4f41e(0x48a)]['BufferX'],'bufferY':_0x466e81[_0xa4f41e(0x48a)][_0xa4f41e(0x55c)],'blendMode':_0x466e81[_0xa4f41e(0x48a)][_0xa4f41e(0x260)]},this['_EventIcons'][_0x32b984];}},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x311)]=function(_0x38d0f7,_0x285694,_0x328bce,_0x2dbba2,_0x4c3ad4){const _0xfa21ad=_0x37ae6a;if(this['_EventIcons']===undefined)this[_0xfa21ad(0x60d)]();const _0x4ae5da=_0x38d0f7===$gamePlayer?'Player':_0xfa21ad(0x2b4)[_0xfa21ad(0x51a)](_0x38d0f7['_mapId'],_0x38d0f7[_0xfa21ad(0x269)]);this[_0xfa21ad(0x1ef)][_0x4ae5da]={'iconIndex':_0x285694,'bufferX':_0x328bce,'bufferY':_0x2dbba2,'blendMode':_0x4c3ad4};},Game_System[_0x37ae6a(0x3a7)]['setEventIconDataKey']=function(_0x56acde,_0x4fb95e,_0x447d36,_0x998b3c,_0x4bff90,_0x217e36){const _0x4ccec3=_0x37ae6a;if(this[_0x4ccec3(0x1ef)]===undefined)this[_0x4ccec3(0x60d)]();const _0x2567b4='Map%1-Event%2'[_0x4ccec3(0x51a)](_0x56acde,_0x4fb95e);this[_0x4ccec3(0x1ef)][_0x2567b4]={'iconIndex':_0x447d36,'bufferX':_0x998b3c,'bufferY':_0x4bff90,'blendMode':_0x217e36};},Game_System[_0x37ae6a(0x3a7)]['deleteIconsOnEventsData']=function(_0x252ccb){const _0x3470d6=_0x37ae6a;if(this[_0x3470d6(0x1ef)]===undefined)this[_0x3470d6(0x60d)]();if(!_0x252ccb)return null;if(_0x252ccb===$gamePlayer){if(_0x3470d6(0x38c)!=='gJfgH')delete this['_EventIcons'][_0x3470d6(0x5b1)];else{const _0x2797d1=_0x50ac34[_0x183e52[_0x3470d6(0x6d8)](_0x2ca071[_0x3470d6(0x5e5)])];return _0x1841a5['x']=_0x2797d1[0x0],_0x2df218['y']=_0x2797d1[0x1],this[_0x3470d6(0x503)](_0x1f1455),!![];}}else{if(_0x3470d6(0x666)===_0x3470d6(0x49c)){this['_moveSynch'][_0x3470d6(0x6f7)]=this['_moveSynch'][_0x3470d6(0x6f7)]||0x0,this[_0x3470d6(0x22e)][_0x3470d6(0x6f7)]--;if(this[_0x3470d6(0x22e)][_0x3470d6(0x6f7)]>0x0)return;this['_moveSynch'][_0x3470d6(0x6f7)]=this[_0x3470d6(0x22e)][_0x3470d6(0x5f4)],this[_0x3470d6(0x436)]();}else this['deleteIconsOnEventsDataKey'](_0x252ccb[_0x3470d6(0x58e)],_0x252ccb[_0x3470d6(0x269)]);}},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x605)]=function(_0x444ee4,_0x520543){const _0x26abd0=_0x37ae6a;if(this[_0x26abd0(0x1ef)]===undefined)this[_0x26abd0(0x60d)]();const _0x1b7f4d=_0x26abd0(0x2b4)[_0x26abd0(0x51a)](_0x444ee4,_0x520543);delete this[_0x26abd0(0x1ef)][_0x1b7f4d];},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x2b1)]=function(_0x2115ff){const _0x431083=_0x37ae6a;if(this['_SavedEventLocations']===undefined)this[_0x431083(0x60d)]();if(!_0x2115ff)return null;const _0x4b19ec=_0x431083(0x2b4)['format'](_0x2115ff[_0x431083(0x58e)],_0x2115ff[_0x431083(0x269)]);return this[_0x431083(0x68f)][_0x4b19ec];},Game_System['prototype']['saveEventLocation']=function(_0x2197a8){const _0x154dbe=_0x37ae6a;if(this[_0x154dbe(0x68f)]===undefined)this['initEventsMoveCore']();if(!_0x2197a8)return;const _0x1ff510='Map%1-Event%2'[_0x154dbe(0x51a)](_0x2197a8['_mapId'],_0x2197a8[_0x154dbe(0x269)]);this[_0x154dbe(0x68f)][_0x1ff510]={'direction':_0x2197a8[_0x154dbe(0x293)](),'x':Math[_0x154dbe(0x647)](_0x2197a8['x']),'y':Math[_0x154dbe(0x647)](_0x2197a8['y']),'pageIndex':_0x2197a8[_0x154dbe(0x1e8)],'moveRouteIndex':_0x2197a8[_0x154dbe(0x5f9)]};},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x4ba)]=function(_0x3986f5){const _0x5da842=_0x37ae6a;if(this[_0x5da842(0x68f)]===undefined)this[_0x5da842(0x60d)]();if(!_0x3986f5)return;this[_0x5da842(0x66f)](_0x3986f5[_0x5da842(0x58e)],_0x3986f5[_0x5da842(0x269)]);},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x66f)]=function(_0x44efca,_0x20fd5f){const _0x2ba24f=_0x37ae6a;if(this[_0x2ba24f(0x68f)]===undefined)this[_0x2ba24f(0x60d)]();const _0x486b64=_0x2ba24f(0x2b4)[_0x2ba24f(0x51a)](_0x44efca,_0x20fd5f);delete this[_0x2ba24f(0x68f)][_0x486b64];},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x291)]=function(_0x3b1230,_0x4a78c9,_0x5192be,_0x2411d8,_0x2caac5,_0x36c3f5,_0x50e57d){const _0x1d843b=_0x37ae6a;if(this[_0x1d843b(0x68f)]===undefined)this[_0x1d843b(0x60d)]();const _0x5698e2=_0x1d843b(0x2b4)[_0x1d843b(0x51a)](_0x3b1230,_0x4a78c9);this[_0x1d843b(0x68f)][_0x5698e2]={'direction':_0x2caac5,'x':Math['round'](_0x5192be),'y':Math[_0x1d843b(0x647)](_0x2411d8),'pageIndex':_0x36c3f5,'moveRouteIndex':_0x50e57d};},Game_System['prototype'][_0x37ae6a(0x5ca)]=function(_0x170b04){const _0x44250d=_0x37ae6a;if(this[_0x44250d(0x2a5)]===undefined)this[_0x44250d(0x60d)]();if(!_0x170b04)return;const _0x5ed25c=_0x44250d(0x2b4)[_0x44250d(0x51a)](_0x170b04[_0x44250d(0x58e)],_0x170b04[_0x44250d(0x269)]);return this[_0x44250d(0x2a5)][_0x5ed25c];},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x4e5)]=function(_0x455062,_0x54aeea,_0x4a039c,_0x34c89c,_0x3e49c6){const _0x4f1240=_0x37ae6a;if(this[_0x4f1240(0x2a5)]===undefined)this[_0x4f1240(0x60d)]();const _0x4fe734=_0x4f1240(0x2b4)[_0x4f1240(0x51a)](_0x455062,_0x54aeea);this['_PreservedEventMorphData'][_0x4fe734]={'template':_0x4a039c,'mapId':_0x34c89c,'eventId':_0x3e49c6};},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x687)]=function(_0xfce847,_0xcc7a45){const _0x3f307c=_0x37ae6a;if(this['_PreservedEventMorphData']===undefined)this[_0x3f307c(0x60d)]();const _0xb7ec39=_0x3f307c(0x2b4)[_0x3f307c(0x51a)](_0xfce847,_0xcc7a45);delete this[_0x3f307c(0x2a5)][_0xb7ec39];},Game_System['prototype']['getMapSpawnedEventData']=function(_0x38223e){const _0x4635df=_0x37ae6a;if(this[_0x4635df(0x5aa)]===undefined)this[_0x4635df(0x60d)]();return this[_0x4635df(0x5aa)][_0x38223e]=this[_0x4635df(0x5aa)][_0x38223e]||[],this['_MapSpawnedEventData'][_0x38223e];},Game_System['prototype'][_0x37ae6a(0x504)]=function(_0x2415e6){const _0x2532c1=_0x37ae6a,_0x22d2ae=this[_0x2532c1(0x1f7)](_0x2415e6);for(const _0x26ab7b of _0x22d2ae){if(_0x2532c1(0x58d)!==_0x2532c1(0x5e0)){if(!_0x26ab7b)continue;if(_0x26ab7b[_0x2532c1(0x670)])continue;const _0x48fcec=_0x22d2ae[_0x2532c1(0x413)](_0x26ab7b);_0x22d2ae[_0x48fcec]=null;}else this['contentsOpacity']-=this[_0x2532c1(0x46b)]();}},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x467)]=function(){this['_followerControlID']=0x0,this['_followerChaseOff']=![];},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x353)]=function(){const _0x375e03=_0x37ae6a;if(this[_0x375e03(0x5e4)]===undefined)this[_0x375e03(0x467)]();return this['_followerControlID'];},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x6b3)]=function(_0xde6a36){const _0x4c284c=_0x37ae6a;if(this[_0x4c284c(0x5e4)]===undefined)this['initFollowerController']();this['_followerControlID']=_0xde6a36;;},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x3c9)]=Game_Interpreter[_0x37ae6a(0x3a7)][_0x37ae6a(0x47f)],Game_Interpreter[_0x37ae6a(0x3a7)]['character']=function(_0x24589d){const _0x28a5b3=_0x37ae6a;if(!$gameParty[_0x28a5b3(0x24d)]()&&_0x24589d<0x0){let _0x55aefa=$gameSystem[_0x28a5b3(0x353)]();if(_0x55aefa>0x0)return'yUMmG'!==_0x28a5b3(0x4dd)?this['isPosing']()?this[_0x28a5b3(0x532)]():_0x3526dc[_0x28a5b3(0x4de)][_0x28a5b3(0x6e0)][_0x28a5b3(0x609)](this):$gamePlayer[_0x28a5b3(0x4a0)]()['follower'](_0x55aefa-0x1);}return VisuMZ[_0x28a5b3(0x4de)][_0x28a5b3(0x3c9)][_0x28a5b3(0x609)](this,_0x24589d);},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x3a3)]=function(){const _0x23e49d=_0x37ae6a;if(this[_0x23e49d(0x381)]===undefined)this[_0x23e49d(0x467)]();return this['_followerChaseOff'];},Game_System[_0x37ae6a(0x3a7)][_0x37ae6a(0x2ed)]=function(_0xf8685){const _0x3c1ac7=_0x37ae6a;if(this[_0x3c1ac7(0x381)]===undefined)this[_0x3c1ac7(0x467)]();this[_0x3c1ac7(0x381)]=_0xf8685;;},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x2da)]=Game_Timer[_0x37ae6a(0x3a7)]['initialize'],Game_Timer[_0x37ae6a(0x3a7)][_0x37ae6a(0x218)]=function(){const _0x592a47=_0x37ae6a;VisuMZ['EventsMoveCore'][_0x592a47(0x2da)]['call'](this),this[_0x592a47(0x60d)]();},Game_Timer[_0x37ae6a(0x3a7)]['initEventsMoveCore']=function(){const _0x4ff1f3=_0x37ae6a;this['_paused']=![],this[_0x4ff1f3(0x2c6)]=-0x1,this[_0x4ff1f3(0x2dd)]=0x0;},Game_Timer[_0x37ae6a(0x3a7)][_0x37ae6a(0x36b)]=function(_0x3f9779){const _0x5eb10c=_0x37ae6a;if(!_0x3f9779)return;if(!this['_working'])return;if(this['_paused'])return;if(this[_0x5eb10c(0x5bd)]<=0x0)return;if(this[_0x5eb10c(0x2c6)]===undefined)this['initEventsMoveCore']();this['_frames']+=this['_speed'],this['_frames']<=0x0&&this[_0x5eb10c(0x6e7)]();},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x476)]=Game_Timer[_0x37ae6a(0x3a7)][_0x37ae6a(0x480)],Game_Timer[_0x37ae6a(0x3a7)][_0x37ae6a(0x480)]=function(_0x2ea900){const _0xe96831=_0x37ae6a;VisuMZ[_0xe96831(0x4de)][_0xe96831(0x476)]['call'](this,_0x2ea900);if(this['_paused']===undefined)this[_0xe96831(0x60d)]();this[_0xe96831(0x672)]=![];},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x2c1)]=Game_Timer['prototype']['stop'],Game_Timer[_0x37ae6a(0x3a7)][_0x37ae6a(0x5d4)]=function(){const _0x15a012=_0x37ae6a;VisuMZ[_0x15a012(0x4de)][_0x15a012(0x2c1)][_0x15a012(0x609)](this);if(this[_0x15a012(0x672)]===undefined)this[_0x15a012(0x60d)]();this[_0x15a012(0x672)]=![];},Game_Timer[_0x37ae6a(0x3a7)][_0x37ae6a(0x45a)]=function(){const _0x1a673b=_0x37ae6a;if(this[_0x1a673b(0x5bd)]<=0x0)return;this[_0x1a673b(0x672)]=!![],this[_0x1a673b(0x618)]=!![];},Game_Timer['prototype'][_0x37ae6a(0x4ac)]=function(){const _0x194712=_0x37ae6a;if(this[_0x194712(0x5bd)]<=0x0)return;this['_paused']=![],this[_0x194712(0x618)]=!![];},Game_Timer[_0x37ae6a(0x3a7)][_0x37ae6a(0x53b)]=function(_0x222600){const _0x3f1d7d=_0x37ae6a;this[_0x3f1d7d(0x5bd)]=this[_0x3f1d7d(0x5bd)]||0x0,this[_0x3f1d7d(0x5bd)]+=_0x222600,this[_0x3f1d7d(0x618)]=!![],this[_0x3f1d7d(0x5bd)]=Math[_0x3f1d7d(0x319)](0x1,this[_0x3f1d7d(0x5bd)]);},Game_Timer[_0x37ae6a(0x3a7)][_0x37ae6a(0x434)]=function(_0x4810a3){const _0x425bbf=_0x37ae6a;this[_0x425bbf(0x5bd)]=this[_0x425bbf(0x5bd)]||0x0,this[_0x425bbf(0x5bd)]=_0x4810a3,this['_working']=!![],this[_0x425bbf(0x5bd)]=Math[_0x425bbf(0x319)](0x1,this[_0x425bbf(0x5bd)]);},Game_Timer[_0x37ae6a(0x3a7)][_0x37ae6a(0x61f)]=function(_0x6fc182){const _0x1dd4d3=_0x37ae6a;this[_0x1dd4d3(0x2c6)]=_0x6fc182,this['_working']=!![],_0x6fc182>0x0&&(this[_0x1dd4d3(0x5bd)]=Math[_0x1dd4d3(0x319)](this['_frames'],0x1));},Game_Timer[_0x37ae6a(0x3a7)][_0x37ae6a(0x457)]=function(_0x4de6b4){const _0x5e5154=_0x37ae6a;if(this['_expireCommonEvent']===undefined)this[_0x5e5154(0x60d)]();this[_0x5e5154(0x2dd)]=_0x4de6b4;},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x6de)]=Game_Timer[_0x37ae6a(0x3a7)][_0x37ae6a(0x6e7)],Game_Timer[_0x37ae6a(0x3a7)]['onExpire']=function(){const _0x47738f=_0x37ae6a;if(this[_0x47738f(0x2dd)]===undefined)this[_0x47738f(0x60d)]();if(this[_0x47738f(0x2dd)]){if('zBgFi'!==_0x47738f(0x228))return _0x4fe75e[_0x47738f(0x4de)][_0x47738f(0x483)][_0x47738f(0x609)](this,_0x19ace0);else $gameTemp[_0x47738f(0x22d)](this['_expireCommonEvent']);}else VisuMZ['EventsMoveCore'][_0x47738f(0x6de)][_0x47738f(0x609)](this);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x498)]=Game_Message[_0x37ae6a(0x3a7)]['add'],Game_Message['prototype'][_0x37ae6a(0x5ab)]=function(_0x2c48a2){const _0x12fdef=_0x37ae6a;VisuMZ[_0x12fdef(0x4de)][_0x12fdef(0x498)][_0x12fdef(0x609)](this,_0x2c48a2),this[_0x12fdef(0x557)]=$gameTemp[_0x12fdef(0x2d9)]();},Game_Message[_0x37ae6a(0x3a7)][_0x37ae6a(0x6a1)]=function(){const _0x444dca=_0x37ae6a;$gameTemp['registerSelfTarget'](this[_0x444dca(0x557)]);},VisuMZ['EventsMoveCore']['Game_Switches_value']=Game_Switches[_0x37ae6a(0x3a7)][_0x37ae6a(0x3b7)],Game_Switches[_0x37ae6a(0x3a7)][_0x37ae6a(0x3b7)]=function(_0x1851a5){const _0x18202e=_0x37ae6a;if(DataManager['isAdvancedSwitch'](_0x1851a5))return!!this['advancedValue'](_0x1851a5);else{if(DataManager[_0x18202e(0x3ef)](_0x1851a5))return'ejKWw'!==_0x18202e(0x1e9)?this[_0x18202e(0x3ae)](0x3,_0xa946b3(_0x57f121['$1'])):!!this[_0x18202e(0x2bd)](_0x1851a5);else return DataManager[_0x18202e(0x377)](_0x1851a5)?!!this[_0x18202e(0x561)](_0x1851a5):VisuMZ[_0x18202e(0x4de)][_0x18202e(0x42b)][_0x18202e(0x609)](this,_0x1851a5);}},Game_Switches[_0x37ae6a(0x378)]={},Game_Switches[_0x37ae6a(0x3a7)][_0x37ae6a(0x48e)]=function(_0x2e4312){const _0x38eb23=_0x37ae6a;if(!Game_Switches[_0x38eb23(0x378)][_0x2e4312]){$dataSystem[_0x38eb23(0x53f)][_0x2e4312][_0x38eb23(0x6b7)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x11dbd4=_0x38eb23(0x236)[_0x38eb23(0x51a)](String(RegExp['$1']));Game_Switches[_0x38eb23(0x378)][_0x2e4312]=new Function(_0x38eb23(0x6c0),_0x11dbd4);}const _0x4998f0=$gameTemp[_0x38eb23(0x2d9)]()||this;return Game_Switches[_0x38eb23(0x378)][_0x2e4312][_0x38eb23(0x609)](_0x4998f0,_0x2e4312);},Game_Switches['prototype'][_0x37ae6a(0x2bd)]=function(_0x58ccb0){const _0x406395=_0x37ae6a,_0x27b41a=$gameTemp[_0x406395(0x2d9)]()||this;if(_0x27b41a['constructor']!==Game_Event)return VisuMZ[_0x406395(0x4de)][_0x406395(0x42b)][_0x406395(0x609)](this,_0x58ccb0);else{const _0x30d1de=[_0x27b41a[_0x406395(0x58e)],_0x27b41a[_0x406395(0x269)],_0x406395(0x592)['format'](_0x58ccb0)];return $gameSelfSwitches[_0x406395(0x3b7)](_0x30d1de);}},Game_Switches[_0x37ae6a(0x3a7)]['mapValue']=function(_0x1c8e60){const _0x340095=_0x37ae6a,_0x1e62c9=$gameMap?$gameMap[_0x340095(0x22c)]():0x0,_0x5ead13=[0x0,0x0,_0x340095(0x232)[_0x340095(0x51a)](_0x1e62c9,_0x1c8e60)];return $gameSelfSwitches[_0x340095(0x3b7)](_0x5ead13);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x5cc)]=Game_Switches[_0x37ae6a(0x3a7)][_0x37ae6a(0x2b2)],Game_Switches[_0x37ae6a(0x3a7)][_0x37ae6a(0x2b2)]=function(_0x387f56,_0x5edf1f){const _0xb31f54=_0x37ae6a;if(DataManager[_0xb31f54(0x3ef)](_0x387f56)){if(_0xb31f54(0x42d)!==_0xb31f54(0x583))this[_0xb31f54(0x5ac)](_0x387f56,_0x5edf1f);else return _0x3518b3[_0xb31f54(0x4de)][_0xb31f54(0x556)][_0xb31f54(0x600)];}else{if(DataManager[_0xb31f54(0x377)](_0x387f56)){if(_0xb31f54(0x25c)===_0xb31f54(0x25c))this[_0xb31f54(0x56a)](_0x387f56,_0x5edf1f);else{const _0x8815df=_0x46c87d['parse']('['+_0x35a6d4['$1'][_0xb31f54(0x6b7)](/\d+/g)+']');this[_0xb31f54(0x3b4)]=this[_0xb31f54(0x3b4)][_0xb31f54(0x6b5)](_0x8815df),this[_0xb31f54(0x3b4)]['remove'](0x0);}}else VisuMZ[_0xb31f54(0x4de)][_0xb31f54(0x5cc)][_0xb31f54(0x609)](this,_0x387f56,_0x5edf1f);}},Game_Switches[_0x37ae6a(0x3a7)]['setSelfValue']=function(_0x56530d,_0x1a663e){const _0xe4f72d=_0x37ae6a,_0xf032ea=$gameTemp[_0xe4f72d(0x2d9)]()||this;if(_0xf032ea[_0xe4f72d(0x678)]!==Game_Event)VisuMZ[_0xe4f72d(0x4de)][_0xe4f72d(0x5cc)]['call'](this,_0x56530d,_0x1a663e);else{if('qaOjc'===_0xe4f72d(0x65d)){if(this['_moveOnlyRegions']===_0x44c311)this[_0xe4f72d(0x442)]();return this[_0xe4f72d(0x3b4)][_0xe4f72d(0x5e5)]>0x0;}else{const _0x2cd9e8=[_0xf032ea['_mapId'],_0xf032ea[_0xe4f72d(0x269)],_0xe4f72d(0x592)[_0xe4f72d(0x51a)](_0x56530d)];$gameSelfSwitches['setValue'](_0x2cd9e8,_0x1a663e);}}},Game_Switches[_0x37ae6a(0x3a7)][_0x37ae6a(0x56a)]=function(_0x3a57f5,_0x3e6782){const _0x5dced5=_0x37ae6a,_0x4a166d=$gameMap?$gameMap['mapId']():0x0,_0x433041=[0x0,0x0,_0x5dced5(0x232)[_0x5dced5(0x51a)](_0x4a166d,_0x3a57f5)];return $gameSelfSwitches[_0x5dced5(0x2b2)](_0x433041,_0x3e6782);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x483)]=Game_Variables[_0x37ae6a(0x3a7)][_0x37ae6a(0x3b7)],Game_Variables[_0x37ae6a(0x3a7)][_0x37ae6a(0x3b7)]=function(_0x17ff27){const _0x567232=_0x37ae6a;if(DataManager['isAdvancedVariable'](_0x17ff27)){if(_0x567232(0x608)==='LQiLq')return this['advancedValue'](_0x17ff27);else this[_0x567232(0x625)][_0x567232(0x44e)][_0x567232(0x2ab)]=!![];}else{if(DataManager['isSelfVariable'](_0x17ff27))return _0x567232(0x352)===_0x567232(0x352)?this[_0x567232(0x2bd)](_0x17ff27):_0x366682['PreloadedMaps'][_0x5bab3c][_0x567232(0x313)][_0xb6cb7];else return DataManager[_0x567232(0x593)](_0x17ff27)?this[_0x567232(0x561)](_0x17ff27):VisuMZ[_0x567232(0x4de)][_0x567232(0x483)][_0x567232(0x609)](this,_0x17ff27);}},Game_Variables[_0x37ae6a(0x378)]={},Game_Variables[_0x37ae6a(0x3a7)][_0x37ae6a(0x48e)]=function(_0x413234){const _0x4813db=_0x37ae6a;if(!Game_Variables[_0x4813db(0x378)][_0x413234]){$dataSystem[_0x4813db(0x564)][_0x413234][_0x4813db(0x6b7)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x5202d9=_0x4813db(0x236)[_0x4813db(0x51a)](String(RegExp['$1']));Game_Variables['advancedFunc'][_0x413234]=new Function('variableId',_0x5202d9);}const _0x5a1de0=$gameTemp['getSelfTarget']()||this;return Game_Variables['advancedFunc'][_0x413234][_0x4813db(0x609)](_0x5a1de0,_0x413234);},Game_Variables[_0x37ae6a(0x3a7)][_0x37ae6a(0x2bd)]=function(_0x41bb94){const _0x36a12a=_0x37ae6a,_0x361a9d=$gameTemp[_0x36a12a(0x2d9)]()||this;if(_0x361a9d[_0x36a12a(0x678)]!==Game_Event)return VisuMZ[_0x36a12a(0x4de)]['Game_Variables_value'][_0x36a12a(0x609)](this,_0x41bb94);else{const _0x29e347=[_0x361a9d[_0x36a12a(0x58e)],_0x361a9d[_0x36a12a(0x269)],_0x36a12a(0x2ee)[_0x36a12a(0x51a)](_0x41bb94)];return $gameSelfSwitches[_0x36a12a(0x3b7)](_0x29e347);}},Game_Variables[_0x37ae6a(0x3a7)]['mapValue']=function(_0x5684e6){const _0x577857=_0x37ae6a,_0x2bd046=$gameMap?$gameMap[_0x577857(0x22c)]():0x0,_0x50cbc7=[0x0,0x0,_0x577857(0x433)['format'](_0x2bd046,_0x5684e6)];return $gameSelfSwitches[_0x577857(0x3b7)](_0x50cbc7)||0x0;},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x62b)]=Game_Variables[_0x37ae6a(0x3a7)][_0x37ae6a(0x2b2)],Game_Variables[_0x37ae6a(0x3a7)]['setValue']=function(_0x50cf5a,_0x1b8646){const _0x101961=_0x37ae6a;if(DataManager['isSelfVariable'](_0x50cf5a))_0x101961(0x452)!=='tYlUN'?this[_0x101961(0x5ac)](_0x50cf5a,_0x1b8646):this['turnRight90']();else{if(DataManager['isMapVariable'](_0x50cf5a)){if(_0x101961(0x4af)==='Siedi')this[_0x101961(0x56a)](_0x50cf5a,_0x1b8646);else return this[_0x101961(0x3e2)]();}else VisuMZ[_0x101961(0x4de)][_0x101961(0x62b)][_0x101961(0x609)](this,_0x50cf5a,_0x1b8646);}},Game_Variables['prototype'][_0x37ae6a(0x5ac)]=function(_0x45ecb8,_0x39228a){const _0x55f153=_0x37ae6a,_0x45051a=$gameTemp[_0x55f153(0x2d9)]()||this;if(_0x45051a['constructor']!==Game_Event){if(_0x55f153(0x522)!=='Gnbtn')VisuMZ[_0x55f153(0x4de)][_0x55f153(0x62b)][_0x55f153(0x609)](this,_0x45ecb8,_0x39228a);else{if([0x1,0x2,0x3]['includes'](_0x4cb056))_0x1bb06b+=0x1;if([0x7,0x8,0x9][_0x55f153(0x6db)](_0x2b7e36))_0x37b854-=0x1;return this['roundY'](_0x2a0355);}}else{if(_0x55f153(0x448)===_0x55f153(0x448)){const _0x19205c=[_0x45051a[_0x55f153(0x58e)],_0x45051a[_0x55f153(0x269)],_0x55f153(0x2ee)['format'](_0x45ecb8)];$gameSelfSwitches[_0x55f153(0x2b2)](_0x19205c,_0x39228a);}else{if(_0x207c74<0x3e8)return;if(!this[_0x55f153(0x33a)])return;const _0x2b5edb=this['event'](_0x2a9e3c);_0x2b5edb[_0x55f153(0x3b5)](-0x1,-0x1),_0x2b5edb['erase'](),this['_spawnedEvents'][_0x4d52f1-0x3e8]=null,this[_0x55f153(0x6e2)]();}}},Game_Variables[_0x37ae6a(0x3a7)]['setMapValue']=function(_0x39f510,_0x3ffba0){const _0x57cdd5=_0x37ae6a,_0x43e08e=$gameMap?$gameMap['mapId']():0x0,_0x2b67fd=[0x0,0x0,_0x57cdd5(0x433)[_0x57cdd5(0x51a)](_0x43e08e,_0x39f510)];$gameSelfSwitches['setValue'](_0x2b67fd,_0x3ffba0);},VisuMZ[_0x37ae6a(0x4de)]['Game_SelfSwitches_value']=Game_SelfSwitches['prototype'][_0x37ae6a(0x3b7)],Game_SelfSwitches[_0x37ae6a(0x3a7)]['value']=function(_0x301904){const _0xa20fed=_0x37ae6a;if(_0x301904[0x2][_0xa20fed(0x6b7)](/(?:SELF|MAP)/i)){if('viZoU'!==_0xa20fed(0x6fe))return this[_0xa20fed(0x2bd)](_0x301904);else{const _0x23508d=this[_0xa20fed(0x211)]+_0x5890de(_0x36c704['$1']);return this[_0xa20fed(0x4e4)](_0x23508d['clamp'](0x0,0xff));}}else{return VisuMZ[_0xa20fed(0x4de)][_0xa20fed(0x414)]['call'](this,_0x301904);;}},Game_SelfSwitches[_0x37ae6a(0x3a7)][_0x37ae6a(0x2bd)]=function(_0x38fc4c){const _0xa58dfa=_0x37ae6a;return _0x38fc4c[0x2]['match'](/VAR/i)?this[_0xa58dfa(0x60e)][_0x38fc4c]||0x0:!!this[_0xa58dfa(0x60e)][_0x38fc4c];},VisuMZ[_0x37ae6a(0x4de)]['Game_SelfSwitches_setValue']=Game_SelfSwitches['prototype'][_0x37ae6a(0x2b2)],Game_SelfSwitches[_0x37ae6a(0x3a7)]['setValue']=function(_0x293e29,_0x29b56b){const _0x3f7764=_0x37ae6a;_0x293e29[0x2]['match'](/(?:SELF|MAP)/i)?this[_0x3f7764(0x5ac)](_0x293e29,_0x29b56b):VisuMZ['EventsMoveCore'][_0x3f7764(0x290)][_0x3f7764(0x609)](this,_0x293e29,_0x29b56b);},Game_SelfSwitches[_0x37ae6a(0x3a7)]['setSelfValue']=function(_0x3f2868,_0x2281d0){const _0x4dd10b=_0x37ae6a;this['_data'][_0x3f2868]=_0x3f2868[0x2][_0x4dd10b(0x6b7)](/VAR/i)?_0x2281d0:!!_0x2281d0,this[_0x4dd10b(0x43c)]();},VisuMZ[_0x37ae6a(0x4de)]['Game_Player_performTransfer']=Game_Player['prototype']['performTransfer'],Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x1fc)]=function(){const _0x439373=_0x37ae6a;if(this[_0x439373(0x44d)]!==$gameMap['mapId']()||this[_0x439373(0x4ec)]){if(_0x439373(0x68b)!==_0x439373(0x68b))while(this[_0x439373(0x292)]()){this[_0x439373(0x2f6)](_0x305e12);}else $gameMap[_0x439373(0x545)]();}VisuMZ[_0x439373(0x4de)][_0x439373(0x5b9)][_0x439373(0x609)](this);},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x545)]=function(){const _0x5b22eb=_0x37ae6a;this[_0x5b22eb(0x26d)]=this[_0x5b22eb(0x22c)]();const _0x73b119=this['events']();for(const _0x178be5 of _0x73b119){if(_0x5b22eb(0x371)===_0x5b22eb(0x2c2)){if(this[_0x5b22eb(0x5bd)]<=0x0)return;this[_0x5b22eb(0x672)]=!![],this['_working']=!![];}else{if(_0x178be5)$gameSelfSwitches[_0x5b22eb(0x5d0)](_0x178be5);}}},Game_SelfSwitches[_0x37ae6a(0x3a7)][_0x37ae6a(0x5d0)]=function(_0x463918){const _0x3e0f43=_0x37ae6a;if(!_0x463918)return;if(!_0x463918[_0x3e0f43(0x3a9)]())return;const _0x2c3bfe=_0x463918[_0x3e0f43(0x3a9)]()[_0x3e0f43(0x616)]||'';if(_0x2c3bfe['match'](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x955853='%1,%2,'[_0x3e0f43(0x51a)]($gameMap['_mapId'],_0x463918['_eventId']),_0x5917ef=Object[_0x3e0f43(0x1db)](this[_0x3e0f43(0x60e)])['filter'](_0x2f8274=>_0x2f8274[_0x3e0f43(0x4f4)](_0x955853));while(_0x5917ef['length']>0x0){if(_0x3e0f43(0x4a6)===_0x3e0f43(0x3d7))this[_0x3e0f43(0x46f)]=_0x15b82d;else{const _0x282add=_0x5917ef[_0x3e0f43(0x65a)]();delete this[_0x3e0f43(0x60e)][_0x282add];}}}},Game_SelfSwitches[_0x37ae6a(0x3a7)][_0x37ae6a(0x60a)]=function(_0x46fb1e){const _0x5788e8=_0x37ae6a,_0x458b50=_0x5788e8(0x56f)[_0x5788e8(0x51a)]($gameMap[_0x5788e8(0x58e)]),_0xecdbbf=Object[_0x5788e8(0x1db)](this[_0x5788e8(0x60e)])[_0x5788e8(0x208)](_0xbd06ba=>_0xbd06ba['startsWith'](_0x458b50));while(_0xecdbbf['length']>0x0){const _0x38dca8=_0xecdbbf[_0x5788e8(0x65a)]();delete this[_0x5788e8(0x60e)][_0x38dca8];}if(_0x46fb1e===$gameMap[_0x5788e8(0x22c)]()){if('KuaHK'===_0x5788e8(0x61d))$gameMap[_0x5788e8(0x6a2)]();else{const _0x43afd2=this[_0x5788e8(0x4f0)][_0x5788e8(0x22c)],_0x2cb7c0=this[_0x5788e8(0x4f0)][_0x5788e8(0x6c6)];return _0x370a7c['referEvent'](_0x43afd2,_0x2cb7c0);}}},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x2e0)]=Game_Enemy[_0x37ae6a(0x3a7)]['meetsSwitchCondition'],Game_Enemy[_0x37ae6a(0x3a7)][_0x37ae6a(0x427)]=function(_0x2b9254){const _0x55fc=_0x37ae6a;$gameTemp[_0x55fc(0x4c2)](this);const _0x386eb8=VisuMZ[_0x55fc(0x4de)]['Game_Enemy_meetsSwitchCondition']['call'](this,_0x2b9254);return $gameTemp[_0x55fc(0x5f2)](),_0x386eb8;},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x395)]=Game_Troop[_0x37ae6a(0x3a7)][_0x37ae6a(0x4da)],Game_Troop['prototype'][_0x37ae6a(0x4da)]=function(_0x455be9){const _0x26d618=_0x37ae6a;$gameTemp[_0x26d618(0x4c2)](this);const _0x387f0b=VisuMZ['EventsMoveCore']['Game_Troop_meetsConditions'][_0x26d618(0x609)](this,_0x455be9);return $gameTemp['clearSelfTarget'](),_0x387f0b;},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x6e9)]=Game_Map[_0x37ae6a(0x3a7)]['setup'],Game_Map['prototype'][_0x37ae6a(0x5ef)]=function(_0x432e4b){const _0x3f9d60=_0x37ae6a;this[_0x3f9d60(0x504)](_0x432e4b),this[_0x3f9d60(0x6e2)](),VisuMZ[_0x3f9d60(0x4de)][_0x3f9d60(0x6e9)][_0x3f9d60(0x609)](this,_0x432e4b),this[_0x3f9d60(0x6e2)](),this[_0x3f9d60(0x34d)](),this[_0x3f9d60(0x6c9)](),this[_0x3f9d60(0x432)](),this[_0x3f9d60(0x333)](),this[_0x3f9d60(0x2b6)](),this[_0x3f9d60(0x4e1)](),this[_0x3f9d60(0x6e2)]();},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x444)]=Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x20c)],Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x20c)]=function(){const _0x295287=_0x37ae6a;VisuMZ[_0x295287(0x4de)][_0x295287(0x444)][_0x295287(0x609)](this),this[_0x295287(0x304)]();},Game_Map[_0x37ae6a(0x53d)]=0xc8,Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x394)]=function(){const _0x4093cb=_0x37ae6a,_0x1f4679=Game_Map[_0x4093cb(0x53d)];this[_0x4093cb(0x284)]=this[_0x4093cb(0x313)]()[_0x4093cb(0x5e5)]>_0x1f4679;if(this[_0x4093cb(0x284)]&&$gameTemp[_0x4093cb(0x4b7)]()){}},Game_Map[_0x37ae6a(0x3a7)]['isEventOverloaded']=function(){const _0x94bd63=_0x37ae6a;return this[_0x94bd63(0x284)];},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x6e2)]=function(){const _0x511998=_0x37ae6a;this[_0x511998(0x25b)]=undefined;},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x34d)]=function(){const _0x1d09d2=_0x37ae6a;this[_0x1d09d2(0x651)]=VisuMZ[_0x1d09d2(0x4de)][_0x1d09d2(0x556)]['Movement'][_0x1d09d2(0x6f4)];const _0x4ac963=$dataMap[_0x1d09d2(0x616)]||'';if(_0x4ac963[_0x1d09d2(0x6b7)](/<DIAGONAL MOVEMENT: ON>/i))this[_0x1d09d2(0x651)]=!![];else{if(_0x4ac963[_0x1d09d2(0x6b7)](/<DIAGONAL MOVEMENT: OFF>/i)){if(_0x1d09d2(0x34c)==='qYtiM'){if(this[_0x1d09d2(0x68f)]===_0x574fd0)this['initEventsMoveCore']();const _0x3e58fd=_0x1d09d2(0x2b4)['format'](_0x3240a9,_0x2ec675);delete this[_0x1d09d2(0x68f)][_0x3e58fd];}else this[_0x1d09d2(0x651)]=![];}}},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x3e7)]=function(){const _0x2a33a6=_0x37ae6a,_0x14a42b=$gameSystem[_0x2a33a6(0x6d3)]();if(_0x14a42b===_0x2a33a6(0x3f8))return!![];if(_0x14a42b===_0x2a33a6(0x1f5))return![];if(this[_0x2a33a6(0x651)]===undefined)this[_0x2a33a6(0x34d)]();return this[_0x2a33a6(0x651)];},Game_Map[_0x37ae6a(0x3a7)]['roundXWithDirection']=function(_0x101ad7,_0x1b5b32){const _0x417257=_0x37ae6a;if([0x1,0x4,0x7]['includes'](_0x1b5b32))_0x101ad7-=0x1;if([0x3,0x6,0x9][_0x417257(0x6db)](_0x1b5b32))_0x101ad7+=0x1;return this[_0x417257(0x6cb)](_0x101ad7);},Game_Map[_0x37ae6a(0x3a7)]['roundYWithDirection']=function(_0x95fca4,_0x2bfddd){const _0x5463bb=_0x37ae6a;if([0x1,0x2,0x3][_0x5463bb(0x6db)](_0x2bfddd))_0x95fca4+=0x1;if([0x7,0x8,0x9][_0x5463bb(0x6db)](_0x2bfddd))_0x95fca4-=0x1;return this[_0x5463bb(0x247)](_0x95fca4);},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x338)]=function(_0x5aa92e,_0x2e5857,_0x596d18,_0x31b7ef){const _0x513aaf=_0x37ae6a;return Math[_0x513aaf(0x319)](Math[_0x513aaf(0x3f4)](this[_0x513aaf(0x499)](_0x5aa92e,_0x596d18)),Math[_0x513aaf(0x3f4)](this[_0x513aaf(0x67a)](_0x2e5857,_0x31b7ef)));},Game_Map['prototype'][_0x37ae6a(0x6c9)]=function(){const _0xaca343=_0x37ae6a,_0x404448=VisuMZ['EventsMoveCore']['Settings']['Region'],_0x1d1b5e={},_0x3c60a9=[_0xaca343(0x606),_0xaca343(0x6d0),_0xaca343(0x568)],_0x5084ce=[_0xaca343(0x5e8),_0xaca343(0x287),_0xaca343(0x5b1),_0xaca343(0x376),_0xaca343(0x3fd),_0xaca343(0x4f7),_0xaca343(0x1d9),_0xaca343(0x40a)];for(const _0x14e623 of _0x3c60a9){if(_0xaca343(0x4b3)!==_0xaca343(0x4b3))return _0x495a32[_0xaca343(0x4de)][_0xaca343(0x6e0)]['call'](this);else for(const _0x8cbdc of _0x5084ce){if('RusXn'===_0xaca343(0x326)){const _0x2c8fbe='%1%2'[_0xaca343(0x51a)](_0x8cbdc,_0x14e623);_0x404448[_0x2c8fbe]&&(_0x1d1b5e[_0x2c8fbe]=_0x404448[_0x2c8fbe][_0xaca343(0x2cb)](0x0));}else this[_0xaca343(0x3fa)]=!![];}}const _0x4512ba=$dataMap[_0xaca343(0x616)]||'',_0x585920=_0x4512ba[_0xaca343(0x6b7)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x585920)for(const _0x42f6ef of _0x585920){if(_0xaca343(0x243)==='lVSPS'){_0x42f6ef[_0xaca343(0x6b7)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x4277c3=String(RegExp['$1'])[_0xaca343(0x665)]()[_0xaca343(0x519)](),_0x48779e=String(RegExp['$2'])['toLowerCase']()[_0xaca343(0x519)]();const _0x18d559=JSON[_0xaca343(0x3fb)]('['+RegExp['$3']['match'](/\d+/g)+']');_0x4277c3=_0x4277c3['charAt'](0x0)[_0xaca343(0x5cf)]()+_0x4277c3[_0xaca343(0x2cb)](0x1),_0x48779e=_0x48779e['charAt'](0x0)[_0xaca343(0x5cf)]()+_0x48779e[_0xaca343(0x2cb)](0x1);const _0x2913a6=_0xaca343(0x59d)['format'](_0x4277c3,_0x48779e);if(_0x1d1b5e[_0x2913a6])_0x1d1b5e[_0x2913a6]=_0x1d1b5e[_0x2913a6][_0xaca343(0x6b5)](_0x18d559);}else return this[_0xaca343(0x455)](_0x535170);}this[_0xaca343(0x33e)]=_0x1d1b5e;},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x2f9)]=function(_0x3d4772,_0x53ff9c,_0x183eb3,_0x3ad864){const _0x32fd5e=_0x37ae6a,_0x333b55=this[_0x32fd5e(0x4d4)](_0x3d4772,_0x183eb3),_0x51df30=this[_0x32fd5e(0x5f6)](_0x53ff9c,_0x183eb3),_0x22cb63=this[_0x32fd5e(0x37b)](_0x333b55,_0x51df30),_0x2217df=this[_0x32fd5e(0x33e)];if(_0x2217df[_0x32fd5e(0x474)][_0x32fd5e(0x6db)](_0x22cb63))return!![];else{if(_0x3ad864===_0x32fd5e(0x5a0))return _0x2217df[_0x32fd5e(0x278)][_0x32fd5e(0x6db)](_0x22cb63)||_0x2217df[_0x32fd5e(0x541)][_0x32fd5e(0x6db)](_0x22cb63);else{if(_0x3ad864===_0x32fd5e(0x3a9))return _0x2217df[_0x32fd5e(0x244)][_0x32fd5e(0x6db)](_0x22cb63)||_0x2217df['WalkAllow'][_0x32fd5e(0x6db)](_0x22cb63);else{if(_0x2217df[_0x32fd5e(0x56c)]['includes'](_0x22cb63))return!![];else{const _0x58bee2=_0x32fd5e(0x383)[_0x32fd5e(0x51a)](_0x3ad864[_0x32fd5e(0x6a6)](0x0)['toUpperCase']()+_0x3ad864[_0x32fd5e(0x2cb)](0x1));if(_0x2217df[_0x58bee2])return _0x2217df[_0x58bee2][_0x32fd5e(0x6db)](_0x22cb63);}}}}return![];},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x578)]=function(_0x4a10c1,_0x421c93,_0x39e80e,_0x27984a){const _0x14e873=_0x37ae6a,_0x59cacb=this['roundXWithDirection'](_0x4a10c1,_0x39e80e),_0x569033=this[_0x14e873(0x5f6)](_0x421c93,_0x39e80e),_0x15d419=this[_0x14e873(0x37b)](_0x59cacb,_0x569033),_0x238b3d=this[_0x14e873(0x33e)];if(_0x238b3d['AllForbid'][_0x14e873(0x6db)](_0x15d419))return!![];else{if(_0x27984a===_0x14e873(0x5a0)){if(_0x14e873(0x273)===_0x14e873(0x273))return _0x238b3d[_0x14e873(0x3ac)]['includes'](_0x15d419)||_0x238b3d['WalkForbid'][_0x14e873(0x6db)](_0x15d419);else{if(this[_0x14e873(0x40b)]!==_0x2205d7[_0x14e873(0x5a3)])return!![];if(this[_0x14e873(0x51c)]!==_0x1503ce['maxSize'])return!![];if(this[_0x14e873(0x282)]!==_0x1e7e55[_0x14e873(0x676)])return!![];}}else{if(_0x27984a==='event')return _0x14e873(0x2ca)!==_0x14e873(0x3a5)?_0x238b3d[_0x14e873(0x66a)][_0x14e873(0x6db)](_0x15d419)||_0x238b3d['WalkForbid'][_0x14e873(0x6db)](_0x15d419):this['turnAwayFromPoint'](_0x4a7208(_0x3b737e['$1']),_0x118e59(_0x17ff7b['$2']));else{if(_0x238b3d[_0x14e873(0x6ff)][_0x14e873(0x6db)](_0x15d419))return!![];else{if(_0x14e873(0x3ad)!==_0x14e873(0x582)){const _0x64146=_0x14e873(0x258)['format'](_0x27984a[_0x14e873(0x6a6)](0x0)[_0x14e873(0x5cf)]()+_0x27984a[_0x14e873(0x2cb)](0x1));if(_0x238b3d[_0x64146])return _0x238b3d[_0x64146][_0x14e873(0x6db)](_0x15d419);}else{if(!_0x401a97[_0x14e873(0x4de)][_0x14e873(0x556)]['Movement'][_0x14e873(0x2c4)])return;for(const _0x569a81 of this[_0x14e873(0x5b4)]){this[_0x14e873(0x299)](_0x569a81);}}}}}}return![];},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x573)]=function(_0x5c50ad,_0x3f1026,_0x541949,_0x28699f){const _0x584f9c=_0x37ae6a;_0x541949=_0x28699f===_0x584f9c(0x331)?0x5:_0x541949;const _0x278c68=this[_0x584f9c(0x4d4)](_0x5c50ad,_0x541949),_0x179205=this[_0x584f9c(0x5f6)](_0x3f1026,_0x541949),_0x446ba0=this[_0x584f9c(0x37b)](_0x278c68,_0x179205),_0x50dc30=this[_0x584f9c(0x33e)];if(_0x50dc30['VehicleDock'][_0x584f9c(0x6db)](_0x446ba0))return _0x584f9c(0x67f)===_0x584f9c(0x67f)?!![]:_0x485dda[_0x584f9c(0x4de)][_0x584f9c(0x1fd)][_0x584f9c(0x609)](this)+(this[_0x584f9c(0x233)]||0x0);else{const _0x96757c='%1Dock'[_0x584f9c(0x51a)](_0x28699f[_0x584f9c(0x6a6)](0x0)[_0x584f9c(0x5cf)]()+_0x28699f['slice'](0x1));if(_0x50dc30[_0x96757c])return _0x50dc30[_0x96757c][_0x584f9c(0x6db)](_0x446ba0);}return![];},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x366)]=Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x63f)],Game_Map['prototype']['refresh']=function(){const _0xd00740=_0x37ae6a;VisuMZ[_0xd00740(0x4de)][_0xd00740(0x366)]['call'](this),this['checkNeedForPeriodicRefresh']();},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x62a)]=function(){const _0x310041=_0x37ae6a;this[_0x310041(0x3d2)]=![];if(this[_0x310041(0x313)]()['some'](_0x441cbf=>_0x441cbf[_0x310041(0x1f4)]())){if(_0x310041(0x45c)!==_0x310041(0x45c))return _0xbd1672[_0x310041(0x4de)][_0x310041(0x556)][_0x310041(0x613)][_0x310041(0x2a9)];else{this[_0x310041(0x3d2)]=!![];return;}}if(this[_0x310041(0x313)]()['some'](_0x569a82=>_0x569a82['hasCPCs']())){this[_0x310041(0x3d2)]=!![];return;}if(this[_0x310041(0x415)][_0x310041(0x470)](_0x118ba9=>_0x118ba9['hasAdvancedSwitchVariable']())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x310041(0x415)][_0x310041(0x470)](_0x1e5a62=>_0x1e5a62[_0x310041(0x281)]())){if(_0x310041(0x251)===_0x310041(0x251)){this['_needsPeriodicRefresh']=!![];return;}else{if(_0x2af514!=='')_0xc50da1+='\x0a';_0x4956b7+=_0x176244[_0x310041(0x466)][0x0];}}},VisuMZ['EventsMoveCore'][_0x37ae6a(0x535)]=Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x36b)],Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x36b)]=function(_0x4d1f32){const _0x2b8c53=_0x37ae6a;this[_0x2b8c53(0x697)](),VisuMZ[_0x2b8c53(0x4de)][_0x2b8c53(0x535)][_0x2b8c53(0x609)](this,_0x4d1f32);},Game_Map[_0x37ae6a(0x3a7)]['updatePeriodicRefresh']=function(){const _0x10f479=_0x37ae6a;if(!this['_needsPeriodicRefresh'])return;this[_0x10f479(0x64b)]=this[_0x10f479(0x64b)]||0x3c,this[_0x10f479(0x64b)]--,this[_0x10f479(0x64b)]<=0x0&&(this[_0x10f479(0x6a2)](),this[_0x10f479(0x64b)]=0x3c);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x325)]=Game_Map[_0x37ae6a(0x3a7)]['isDashDisabled'],Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x2e2)]=function(){const _0xab0551=_0x37ae6a;if(!$gameSystem[_0xab0551(0x446)]())return!![];return VisuMZ['EventsMoveCore'][_0xab0551(0x325)][_0xab0551(0x609)](this);},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x432)]=function(){const _0x58dfd1=_0x37ae6a;this[_0x58dfd1(0x685)]=![];const _0x4b2e66=$dataMap[_0x58dfd1(0x616)]||'';_0x4b2e66[_0x58dfd1(0x6b7)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x58dfd1(0x685)]=!![]);},Game_Map['prototype']['isSaveEventLocations']=function(){const _0x1d8216=_0x37ae6a;if(this[_0x1d8216(0x685)]===undefined)this[_0x1d8216(0x432)]();return this[_0x1d8216(0x685)];},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x504)]=function(_0x2a5d93){const _0x1982ed=_0x37ae6a;if(_0x2a5d93!==this['mapId']()&&$gamePlayer){if(_0x1982ed(0x4fd)===_0x1982ed(0x4fd))$gameSystem['removeTemporaryMapSpawnedEvents'](this[_0x1982ed(0x22c)]());else{const _0x573fb7=this[_0x1982ed(0x239)](this[_0x1982ed(0x293)]());return _0x401b8f[_0x1982ed(0x5f6)](this['y'],_0x573fb7);}}},Game_Map['prototype'][_0x37ae6a(0x333)]=function(){const _0x2bd400=_0x37ae6a;this[_0x2bd400(0x33a)]=$gameSystem[_0x2bd400(0x1f7)](this[_0x2bd400(0x22c)]()),this[_0x2bd400(0x2ae)]=!![];},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x36e)]=Game_Map['prototype'][_0x37ae6a(0x313)],Game_Map['prototype'][_0x37ae6a(0x313)]=function(){const _0xfbcc55=_0x37ae6a;if(this['_eventCache'])return this[_0xfbcc55(0x25b)];const _0x3ce13a=VisuMZ[_0xfbcc55(0x4de)]['Game_Map_events'][_0xfbcc55(0x609)](this),_0x400f1c=_0x3ce13a[_0xfbcc55(0x6b5)](this[_0xfbcc55(0x33a)]||[]);return this['_eventCache']=_0x400f1c[_0xfbcc55(0x208)](_0x2457cf=>!!_0x2457cf),this[_0xfbcc55(0x25b)];},VisuMZ[_0x37ae6a(0x4de)]['Game_Map_event']=Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x3a9)],Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x3a9)]=function(_0x3c955c){const _0x720323=_0x37ae6a;return _0x3c955c>=0x3e8?(_0x3c955c-=0x3e8,this[_0x720323(0x33a)][_0x3c955c]):_0x720323(0x5b7)!==_0x720323(0x5b7)?this[_0x720323(0x681)]()?0x4:0x2:VisuMZ[_0x720323(0x4de)][_0x720323(0x275)][_0x720323(0x609)](this,_0x3c955c);},Game_Map['prototype'][_0x37ae6a(0x29a)]=function(_0x1b6328){const _0x43524d=_0x37ae6a,_0x591b43=this[_0x43524d(0x3a9)](_0x1b6328);if(_0x591b43)_0x591b43[_0x43524d(0x22f)]();},Game_Map[_0x37ae6a(0x3a7)]['setupSpawnTest']=function(){const _0x457950=_0x37ae6a,_0x4bbf75={'template':_0x457950(0x264),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this['_spawnedEvents'][_0x457950(0x5e5)]+0x3e8};this[_0x457950(0x503)](_0x4bbf75);},Game_Map['prototype']['checkExistingEntitiesAt']=function(_0x623c52,_0x3e9380){const _0x3a2b6d=_0x37ae6a;if(this[_0x3a2b6d(0x345)](_0x623c52,_0x3e9380)['length']>0x0)return!![];if($gamePlayer['x']===_0x623c52&&$gamePlayer['y']===_0x3e9380)return!![];if(this[_0x3a2b6d(0x47d)]()[_0x3a2b6d(0x5c7)](_0x623c52,_0x3e9380))return!![];if(this[_0x3a2b6d(0x488)]()[_0x3a2b6d(0x5c7)](_0x623c52,_0x3e9380))return!![];return![];},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x389)]=function(_0x4847a1,_0x5365f5,_0x2067d7){const _0x247ed1=_0x37ae6a;$gameTemp[_0x247ed1(0x652)]=_0x4847a1;const _0x2c0cf3=new Game_Event(_0x4847a1[_0x247ed1(0x22c)],_0x4847a1[_0x247ed1(0x6c6)]);$gameTemp[_0x247ed1(0x652)]=undefined,_0x2c0cf3['refresh']();let _0x40fe5d=_0x5365f5-_0x2c0cf3['_addedHitbox'][_0x247ed1(0x639)],_0x160765=_0x5365f5+_0x2c0cf3[_0x247ed1(0x2ad)]['right'],_0x537116=_0x2067d7-_0x2c0cf3[_0x247ed1(0x2ad)]['up'],_0x52cea6=_0x2067d7+_0x2c0cf3[_0x247ed1(0x2ad)][_0x247ed1(0x657)];for(let _0x3b2f19=_0x40fe5d;_0x3b2f19<=_0x160765;_0x3b2f19++){for(let _0x40e6fd=_0x537116;_0x40e6fd<=_0x52cea6;_0x40e6fd++){if(this[_0x247ed1(0x31b)](_0x3b2f19,_0x40e6fd))return![];}}return!![];},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x503)]=function(_0x1ada5e){const _0x192704=_0x37ae6a;$gameTemp[_0x192704(0x652)]=_0x1ada5e;const _0x31432d=new Game_Event(_0x1ada5e[_0x192704(0x22c)],_0x1ada5e[_0x192704(0x6c6)]);$gameTemp[_0x192704(0x652)]=undefined,this[_0x192704(0x33a)][_0x192704(0x6bf)](_0x31432d),_0x31432d[_0x192704(0x283)](_0x1ada5e),this[_0x192704(0x6e2)]();},Game_Map['prototype'][_0x37ae6a(0x1ec)]=function(_0x51e94f,_0x3462e1,_0x10757d){const _0x2f277c=_0x37ae6a,_0x5e8f06=_0x51e94f[_0x2f277c(0x4d2)][_0x2f277c(0x5cf)]()[_0x2f277c(0x519)]();if(_0x5e8f06!==_0x2f277c(0x421)){const _0x3ace16=VisuMZ[_0x2f277c(0x6c5)][_0x5e8f06];_0x3ace16&&(_0x51e94f[_0x2f277c(0x22c)]=_0x3ace16[_0x2f277c(0x266)],_0x51e94f[_0x2f277c(0x6c6)]=_0x3ace16[_0x2f277c(0x35c)]);}const _0x55e194=_0x51e94f['x'],_0x219e55=_0x51e94f['y'];if(!this['isValid'](_0x55e194,_0x219e55))return![];if(_0x3462e1){if(this[_0x2f277c(0x31b)](_0x55e194,_0x219e55))return![];if(!this[_0x2f277c(0x389)](_0x51e94f,_0x55e194,_0x219e55))return![];}if(_0x10757d){if(!this[_0x2f277c(0x502)](_0x55e194,_0x219e55))return![];}return this[_0x2f277c(0x503)](_0x51e94f),!![];},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x3c0)]=function(_0x4ff256,_0x3ae863,_0x11760e,_0x5e7d81){const _0x2e0c8b=_0x37ae6a,_0x3ef086=_0x4ff256[_0x2e0c8b(0x4d2)]['toUpperCase']()[_0x2e0c8b(0x519)]();if(_0x3ef086!==_0x2e0c8b(0x421)){if('RcOXk'!==_0x2e0c8b(0x69f))return 0x6;else{const _0x4d480b=VisuMZ['EventTemplates'][_0x3ef086];if(_0x4d480b){if(_0x2e0c8b(0x4c7)==='OyKma')_0x4ff256[_0x2e0c8b(0x22c)]=_0x4d480b['MapID'],_0x4ff256[_0x2e0c8b(0x6c6)]=_0x4d480b[_0x2e0c8b(0x35c)];else return _0x878905[_0x2e0c8b(0x68a)];}}}const _0x241050=[],_0x179154=this[_0x2e0c8b(0x4eb)](),_0x1e0c01=this[_0x2e0c8b(0x4a7)]();for(let _0x568f88=0x0;_0x568f88<_0x179154;_0x568f88++){if(_0x2e0c8b(0x3d4)!==_0x2e0c8b(0x3d4)){let _0x387575=this[_0x2e0c8b(0x207)]()||0x1,_0x43299f=this[_0x2e0c8b(0x6e6)]()||0x1;const _0x4094f3=_0x14afc4[_0x2e0c8b(0x319)](0x1,_0x387575,_0x43299f);_0x3fae69=_0x263c6d/_0x4094f3;}else for(let _0x500385=0x0;_0x500385<_0x1e0c01;_0x500385++){if(_0x2e0c8b(0x57b)!==_0x2e0c8b(0x443)){if(!_0x3ae863[_0x2e0c8b(0x6db)](this[_0x2e0c8b(0x37b)](_0x568f88,_0x500385)))continue;if(!this[_0x2e0c8b(0x607)](_0x568f88,_0x500385))continue;if(_0x11760e){if(this[_0x2e0c8b(0x31b)](_0x568f88,_0x500385))continue;if(!this[_0x2e0c8b(0x389)](_0x4ff256,_0x568f88,_0x500385))continue;}if(_0x5e7d81){if(!this['isPassableByAnyDirection'](_0x568f88,_0x500385))continue;}_0x241050[_0x2e0c8b(0x6bf)]([_0x568f88,_0x500385]);}else return this[_0x2e0c8b(0x390)]()?this[_0x2e0c8b(0x696)]():this[_0x2e0c8b(0x6a3)]();}}if(_0x241050[_0x2e0c8b(0x5e5)]>0x0){const _0x111b51=_0x241050[Math[_0x2e0c8b(0x6d8)](_0x241050[_0x2e0c8b(0x5e5)])];return _0x4ff256['x']=_0x111b51[0x0],_0x4ff256['y']=_0x111b51[0x1],this[_0x2e0c8b(0x503)](_0x4ff256),!![];}return![];},Game_Map['prototype'][_0x37ae6a(0x4b4)]=function(_0x37f52d,_0xb3af63,_0x470c0f,_0x2189aa){const _0x52153d=_0x37ae6a,_0x19b461=_0x37f52d[_0x52153d(0x4d2)][_0x52153d(0x5cf)]()[_0x52153d(0x519)]();if(_0x19b461!==_0x52153d(0x421)){if(_0x52153d(0x6cf)!==_0x52153d(0x227)){const _0x4ab238=VisuMZ[_0x52153d(0x6c5)][_0x19b461];_0x4ab238&&(_0x37f52d['mapId']=_0x4ab238[_0x52153d(0x266)],_0x37f52d[_0x52153d(0x6c6)]=_0x4ab238[_0x52153d(0x35c)]);}else{_0xcd96fc[_0x52153d(0x205)]=_0x279b97['Name'][_0x52153d(0x5cf)]()[_0x52153d(0x519)](),_0x322201[_0x52153d(0x6c5)][_0x31e311[_0x52153d(0x205)]]=_0x3146bb;if(!_0x757bb7['includes'](_0x251ace['MapID']))_0x2f8a94[_0x52153d(0x6bf)](_0x3f55ff[_0x52153d(0x266)]);}}const _0x155255=[],_0x1a0450=this[_0x52153d(0x4eb)](),_0x5cf0a9=this[_0x52153d(0x4a7)]();for(let _0x5b7a9f=0x0;_0x5b7a9f<_0x1a0450;_0x5b7a9f++){for(let _0x32dce5=0x0;_0x32dce5<_0x5cf0a9;_0x32dce5++){if(!_0xb3af63[_0x52153d(0x6db)](this[_0x52153d(0x274)](_0x5b7a9f,_0x32dce5)))continue;if(!this[_0x52153d(0x607)](_0x5b7a9f,_0x32dce5))continue;if(_0x470c0f){if(this[_0x52153d(0x31b)](_0x5b7a9f,_0x32dce5))continue;if(!this[_0x52153d(0x389)](_0x37f52d,_0x5b7a9f,_0x32dce5))continue;}if(_0x2189aa){if(_0x52153d(0x399)!==_0x52153d(0x6ca)){if(!this[_0x52153d(0x502)](_0x5b7a9f,_0x32dce5))continue;}else return!!this[_0x52153d(0x57f)];}_0x155255[_0x52153d(0x6bf)]([_0x5b7a9f,_0x32dce5]);}}if(_0x155255[_0x52153d(0x5e5)]>0x0){const _0x328856=_0x155255[Math[_0x52153d(0x6d8)](_0x155255[_0x52153d(0x5e5)])];return _0x37f52d['x']=_0x328856[0x0],_0x37f52d['y']=_0x328856[0x1],this[_0x52153d(0x503)](_0x37f52d),!![];}return![];},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x502)]=function(_0x436e7a,_0x231cad){const _0xda126b=_0x37ae6a;if(this['isPassable'](_0x436e7a,_0x231cad,0x2))return!![];if(this[_0xda126b(0x2a4)](_0x436e7a,_0x231cad,0x4))return!![];if(this[_0xda126b(0x2a4)](_0x436e7a,_0x231cad,0x6))return!![];if(this[_0xda126b(0x2a4)](_0x436e7a,_0x231cad,0x8))return!![];return![];},Game_Map[_0x37ae6a(0x3a7)]['despawnEventId']=function(_0x7a7e9e){const _0x3e45b2=_0x37ae6a;if(_0x7a7e9e<0x3e8)return;if(!this[_0x3e45b2(0x33a)])return;const _0x205b37=this[_0x3e45b2(0x3a9)](_0x7a7e9e);_0x205b37[_0x3e45b2(0x3b5)](-0x1,-0x1),_0x205b37[_0x3e45b2(0x22f)](),this['_spawnedEvents'][_0x7a7e9e-0x3e8]=null,this['clearEventCache']();},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x286)]=function(){const _0x1c34d7=_0x37ae6a;for(const _0x3238ca of this[_0x1c34d7(0x33a)]){if(_0x3238ca)return _0x3238ca;}return null;},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x36d)]=function(){const _0x22cfb8=_0x37ae6a,_0x1eef7b=this[_0x22cfb8(0x286)]();return _0x1eef7b?_0x1eef7b[_0x22cfb8(0x269)]:0x0;},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x5f7)]=function(){const _0x12228f=_0x37ae6a,_0xf8c96a=this[_0x12228f(0x33a)][_0x12228f(0x2cb)](0x0)['reverse']();for(const _0x11a64c of _0xf8c96a){if(_0x11a64c)return _0x11a64c;}return null;},Game_Map['prototype'][_0x37ae6a(0x569)]=function(){const _0x361c3c=_0x37ae6a,_0x1c23b7=this[_0x361c3c(0x5f7)]();return _0x1c23b7?_0x1c23b7['_eventId']:0x0;},Game_Map['prototype'][_0x37ae6a(0x26e)]=function(_0x5e24e6,_0x3939b4){const _0x5ae3c1=_0x37ae6a,_0x3c47fc=this[_0x5ae3c1(0x345)](_0x5e24e6,_0x3939b4);for(const _0xe995ec of _0x3c47fc){if(_0x5ae3c1(0x4e9)===_0x5ae3c1(0x3df))_0x10f6b5[_0x5ae3c1(0x22c)]=_0x44aace[_0x5ae3c1(0x266)],_0x5f54df[_0x5ae3c1(0x6c6)]=_0x21b3c0[_0x5ae3c1(0x35c)];else{if(!_0xe995ec)continue;if(_0xe995ec[_0x5ae3c1(0x2de)]())this['despawnEventId'](_0xe995ec[_0x5ae3c1(0x269)]);}}},Game_Map['prototype'][_0x37ae6a(0x288)]=function(_0x19531c){const _0x47e6ed=_0x37ae6a;for(const _0x20cd95 of this[_0x47e6ed(0x33a)]){if(_0x47e6ed(0x46a)==='kYWTs')return this[_0x47e6ed(0x2ad)]?this[_0x47e6ed(0x431)](_0x15a05b,_0xc6adae):_0x458345['prototype'][_0x47e6ed(0x542)]['call'](this,_0x1ddb2d,_0x567f19);else{if(!_0x20cd95)continue;if(_0x19531c[_0x47e6ed(0x6db)](_0x20cd95[_0x47e6ed(0x37b)]())){if(_0x47e6ed(0x484)!==_0x47e6ed(0x4e2))this[_0x47e6ed(0x423)](_0x20cd95['_eventId']);else{_0x1f1433['registerSelfTarget'](this);const _0x4cc493=_0x417a16[_0x47e6ed(0x4de)][_0x47e6ed(0x2e0)][_0x47e6ed(0x609)](this,_0xb70f9c);return _0x3c2683[_0x47e6ed(0x5f2)](),_0x4cc493;}}}}},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x4d0)]=function(_0x11ee4e){const _0x36922d=_0x37ae6a;for(const _0x3743c0 of this[_0x36922d(0x33a)]){if(!_0x3743c0)continue;_0x11ee4e[_0x36922d(0x6db)](_0x3743c0['terrainTag']())&&this[_0x36922d(0x423)](_0x3743c0[_0x36922d(0x269)]);}},Game_Map['prototype'][_0x37ae6a(0x487)]=function(){const _0x183b49=_0x37ae6a;for(const _0x558b6b of this[_0x183b49(0x33a)]){if('AOXzt'!=='lUUNc'){if(!_0x558b6b)continue;this[_0x183b49(0x423)](_0x558b6b[_0x183b49(0x269)]);}else{let _0x490cab='';for(const _0x2ff294 of _0xf88f44[_0x183b49(0x1e6)]){[0x6c,0x198][_0x183b49(0x6db)](_0x2ff294[_0x183b49(0x4cd)])&&(_0x490cab+=_0x2ff294[_0x183b49(0x466)][0x0]);}if(_0x490cab['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x490cab[_0x183b49(0x6b7)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}}},VisuMZ[_0x37ae6a(0x4de)]['Game_Map_unlockEvent']=Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x36c)],Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x36c)]=function(_0x3fb8cb){const _0x1b7e83=_0x37ae6a;VisuMZ['EventsMoveCore']['Game_Map_unlockEvent'][_0x1b7e83(0x609)](this,_0x3fb8cb);if(_0x3fb8cb>=0x3e8){if(_0x1b7e83(0x316)!==_0x1b7e83(0x3b2)){const _0x302f77=this[_0x1b7e83(0x3a9)](_0x3fb8cb);if(_0x302f77)_0x302f77[_0x1b7e83(0x29c)]();}else{const _0x44bb03=_0x359dc1[_0x1b7e83(0x3a9)](_0xde9a4a(_0x1b0c65['$1']));return this[_0x1b7e83(0x3f0)](_0x44bb03);}}},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x2b6)]=function(){const _0x37a959=_0x37ae6a;this['_forceShowPlayer']=![],this[_0x37a959(0x6d7)]=![];if(!$dataMap)return;const _0x5a4a2e=$dataMap[_0x37a959(0x616)]||'';if(_0x5a4a2e[_0x37a959(0x6b7)](/<HIDE PLAYER>/i))this['_forceShowPlayer']=![],this[_0x37a959(0x6d7)]=!![];else{if(_0x5a4a2e[_0x37a959(0x6b7)](/<SHOW PLAYER>/i)){if('xypaJ'===_0x37a959(0x43f)){const _0x449b15=this[_0x37a959(0x31f)][_0x37a959(0x5f8)]();if(_0x449b15){if(this[_0x37a959(0x40b)]!==_0x449b15[_0x37a959(0x5a3)])return!![];if(this[_0x37a959(0x51c)]!==_0x449b15['maxSize'])return!![];if(this[_0x37a959(0x282)]!==_0x449b15[_0x37a959(0x676)])return!![];}return![];}else this['_forceShowPlayer']=!![],this['_forceHidePlayer']=![];}}},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x656)]=function(){const _0x138f44=_0x37ae6a;return this[_0x138f44(0x301)]===undefined&&this[_0x138f44(0x2b6)](),this['_forceShowPlayer'];},Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x4bf)]=function(){const _0x450245=_0x37ae6a;return this['_forceHidePlayer']===undefined&&('lJxOC'===_0x450245(0x635)?(this[_0x450245(0x4f0)]=_0x247c42,this[_0x450245(0x1e8)]=-0x2,this[_0x450245(0x63f)]()):this[_0x450245(0x2b6)]()),this['_forceHidePlayer'];},VisuMZ[_0x37ae6a(0x4de)]['Game_CharacterBase_isTransparent']=Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x3f7)],Game_CharacterBase[_0x37ae6a(0x3a7)]['isTransparent']=function(){const _0x527cf8=_0x37ae6a;if(this===$gamePlayer){if($gameMap['isPlayerForceShown']())return![];if($gameMap[_0x527cf8(0x4bf)]())return!![];}return VisuMZ['EventsMoveCore']['Game_CharacterBase_isTransparent'][_0x527cf8(0x609)](this);},Game_Map[_0x37ae6a(0x3a7)]['setupFollowerVisibilityOverrides']=function(){const _0x4ac92e=_0x37ae6a;this['_forceShowFollower']=![],this[_0x4ac92e(0x46e)]=![];if(!$dataMap)return;const _0x484a64=$dataMap[_0x4ac92e(0x616)]||'';if(_0x484a64[_0x4ac92e(0x6b7)](/<HIDE FOLLOWERS>/i))this['_forceShowFollower']=![],this['_forceHideFollower']=!![];else _0x484a64[_0x4ac92e(0x6b7)](/<SHOW FOLLOWERS>/i)&&(this[_0x4ac92e(0x368)]=!![],this[_0x4ac92e(0x46e)]=![]);},Game_Map[_0x37ae6a(0x3a7)]['areFollowersForceShown']=function(){const _0x3359a7=_0x37ae6a;return this['_forceShowFollower']===undefined&&this[_0x3359a7(0x4e1)](),this[_0x3359a7(0x368)];},Game_Map[_0x37ae6a(0x3a7)]['areFollowersForceHidden']=function(){const _0xe68e69=_0x37ae6a;return this[_0xe68e69(0x46e)]===undefined&&this['setupFollowerVisibilityOverrides'](),this[_0xe68e69(0x46e)];},VisuMZ['EventsMoveCore']['Game_Followers_isVisible']=Game_Followers[_0x37ae6a(0x3a7)][_0x37ae6a(0x694)],Game_Followers[_0x37ae6a(0x3a7)][_0x37ae6a(0x694)]=function(){const _0x38603e=_0x37ae6a;if($gameMap['areFollowersForceShown']())return!![];if($gameMap['areFollowersForceHidden']())return![];return VisuMZ[_0x38603e(0x4de)][_0x38603e(0x4dc)]['call'](this);},Game_CommonEvent['prototype']['hasAdvancedSwitchVariable']=function(){const _0x1ad84f=_0x37ae6a,_0x2901aa=this['event']();return this[_0x1ad84f(0x257)]()&&_0x2901aa[_0x1ad84f(0x539)]>=0x1&&DataManager[_0x1ad84f(0x21c)](_0x2901aa[_0x1ad84f(0x6c0)]);},Game_CommonEvent[_0x37ae6a(0x3a7)][_0x37ae6a(0x281)]=function(){const _0x45e12a=_0x37ae6a;return VisuMZ[_0x45e12a(0x4de)][_0x45e12a(0x552)]['_commonEvents']['includes'](this[_0x45e12a(0x37d)]);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x6ee)]=Game_CommonEvent[_0x37ae6a(0x3a7)]['isActive'],Game_CommonEvent['prototype']['isActive']=function(){const _0x5071f2=_0x37ae6a;if(VisuMZ[_0x5071f2(0x4de)][_0x5071f2(0x6ee)]['call'](this)){if('AypmP'===_0x5071f2(0x36a))return!![];else{if(_0x1e4097[this['_callEventMap']])this[_0x5071f2(0x581)]='',this['startCallEvent']();else return!![];}}else{if(_0x5071f2(0x634)!=='Pudvm'){const _0x431502=this['textSizeEx'](_0xc3308),_0x4776f7=_0x3fb38f[_0x5071f2(0x69e)]((this[_0x5071f2(0x29b)]-_0x431502['width'])/0x2);this[_0x5071f2(0x675)](_0x12b373,_0x4776f7,_0x5ee33e),_0x12e6c5+=_0x431502['height'];}else{const _0x20643d=this[_0x5071f2(0x3a9)]();return VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x5071f2(0x5bc)](this[_0x5071f2(0x3a9)]()[_0x5071f2(0x438)],this[_0x5071f2(0x37d)],_0x20643d);}}},VisuMZ[_0x37ae6a(0x4de)]['Game_Map_parallelCommonEvents']=Game_Map['prototype'][_0x37ae6a(0x590)],Game_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x590)]=function(){const _0x22156f=_0x37ae6a,_0x477d59=VisuMZ[_0x22156f(0x4de)][_0x22156f(0x5d7)][_0x22156f(0x609)](this),_0x14daf9=VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x22156f(0x415)][_0x22156f(0x482)](_0x4e08a4=>$dataCommonEvents[_0x4e08a4]);return _0x477d59[_0x22156f(0x6b5)](_0x14daf9)[_0x22156f(0x208)]((_0x48c47f,_0x2c5453,_0x2bfbb9)=>_0x2bfbb9[_0x22156f(0x413)](_0x48c47f)===_0x2c5453);},Game_CharacterBase[_0x37ae6a(0x699)]=VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x556)][_0x37ae6a(0x1e5)][_0x37ae6a(0x219)]??![],VisuMZ['EventsMoveCore']['Game_CharacterBase_initMembers']=Game_CharacterBase[_0x37ae6a(0x3a7)]['initMembers'],Game_CharacterBase[_0x37ae6a(0x3a7)]['initMembers']=function(){const _0x2a44a9=_0x37ae6a;VisuMZ[_0x2a44a9(0x4de)][_0x2a44a9(0x2e8)]['call'](this),this[_0x2a44a9(0x2ec)]();},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x2ec)]=function(){const _0x1bd5ae=_0x37ae6a;this[_0x1bd5ae(0x4b6)]=![],this[_0x1bd5ae(0x548)](),this[_0x1bd5ae(0x50b)](),this[_0x1bd5ae(0x38d)](),this[_0x1bd5ae(0x277)]();},VisuMZ[_0x37ae6a(0x4de)]['Game_CharacterBase_opacity']=Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x310)],Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x310)]=function(){const _0x3a6ea7=_0x37ae6a;let _0x307df9=VisuMZ[_0x3a6ea7(0x4de)][_0x3a6ea7(0x465)][_0x3a6ea7(0x609)](this);return _0x307df9=this['adjustMoveSynchOpacityDelta'](_0x307df9),_0x307df9;},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x3bc)]=function(_0x81ab4b){return _0x81ab4b;},Game_CharacterBase[_0x37ae6a(0x3a7)]['isSpriteVS8dir']=function(){const _0x36c962=_0x37ae6a;if(this[_0x36c962(0x678)]===Game_Player&&this[_0x36c962(0x67c)]())return this[_0x36c962(0x458)]()[_0x36c962(0x31a)]()[_0x36c962(0x6b7)](/\[VS8\]/i);else{if(Imported[_0x36c962(0x53e)]&&this['hasDragonbones']())return!![];else{if('fshIA'==='jtTEr')this[_0x36c962(0x5e6)][_0x36c962(0x4ff)]=_0x150924(_0x5e2e13['$1']);else return this[_0x36c962(0x31a)]()[_0x36c962(0x6b7)](/\[VS8\]/i);}}},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x566)]=Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x293)],Game_CharacterBase['prototype'][_0x37ae6a(0x293)]=function(){const _0x1f6fd4=_0x37ae6a;if(!$dataMap)return this['_direction']||0x2;if(this[_0x1f6fd4(0x24f)]()&&!this['isJumping']()&&this[_0x1f6fd4(0x390)]()){if(_0x1f6fd4(0x300)!==_0x1f6fd4(0x300))this[_0x1f6fd4(0x5b0)][_0x1f6fd4(0x676)]['x']=_0x5e4ea9[_0x1f6fd4(0x62f)](0x1,this[_0x1f6fd4(0x5b0)][_0x1f6fd4(0x676)]['x']+0.1),this[_0x1f6fd4(0x5b0)][_0x1f6fd4(0x676)]['y']=_0x54d42d['min'](0x1,this[_0x1f6fd4(0x5b0)][_0x1f6fd4(0x676)]['y']+0.1);else return this[_0x1f6fd4(0x1ff)]();}else{if(this[_0x1f6fd4(0x24f)]()&&!this[_0x1f6fd4(0x204)]()){if(_0x1f6fd4(0x1d8)!=='kwOus')return 0x8;else this['_frames']=_0x82022f['max'](this[_0x1f6fd4(0x5bd)],0x1);}else{if(this[_0x1f6fd4(0x5ff)]()&&this[_0x1f6fd4(0x390)]())return this[_0x1f6fd4(0x6e4)]();else{if(_0x1f6fd4(0x32f)===_0x1f6fd4(0x52b)){_0x4c3b80=_0x8f00d2===_0x1f6fd4(0x331)?0x5:_0x97427a;const _0xc190c8=this[_0x1f6fd4(0x4d4)](_0x526ffa,_0x32fc3b),_0x3618dd=this[_0x1f6fd4(0x5f6)](_0x102785,_0xe0c182),_0x3c55f6=this['regionId'](_0xc190c8,_0x3618dd),_0x12563d=this['_regionRules'];if(_0x12563d[_0x1f6fd4(0x1f9)]['includes'](_0x3c55f6))return!![];else{const _0x234312=_0x1f6fd4(0x25f)['format'](_0x26ad86[_0x1f6fd4(0x6a6)](0x0)['toUpperCase']()+_0x326010[_0x1f6fd4(0x2cb)](0x1));if(_0x12563d[_0x234312])return _0x12563d[_0x234312]['includes'](_0x3c55f6);}return![];}else return VisuMZ[_0x1f6fd4(0x4de)][_0x1f6fd4(0x566)][_0x1f6fd4(0x609)](this);}}}},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x280)]=Game_CharacterBase['prototype'][_0x37ae6a(0x349)],Game_CharacterBase[_0x37ae6a(0x3a7)]['setDirection']=function(_0x2c221d){const _0x31fa56=_0x37ae6a;if(!this[_0x31fa56(0x390)]())_0x2c221d=this[_0x31fa56(0x468)](_0x2c221d);VisuMZ[_0x31fa56(0x4de)][_0x31fa56(0x280)][_0x31fa56(0x609)](this,_0x2c221d);},Game_CharacterBase['prototype'][_0x37ae6a(0x468)]=function(_0x383013){const _0x462c73=_0x37ae6a;if(_0x383013===0x1)return this['canPass'](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x383013===0x3)return this[_0x462c73(0x30c)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x383013===0x7)return this[_0x462c73(0x30c)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x383013===0x9)return this[_0x462c73(0x30c)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x383013;},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x26b)]=function(_0x15100c){const _0x3b61a3=_0x37ae6a;return[0x1,0x3,0x5,0x7,0x9][_0x3b61a3(0x6db)](_0x15100c);},Game_CharacterBase['prototype']['lastMovedDirection']=function(){const _0x35f7b5=_0x37ae6a;return this[_0x35f7b5(0x322)]||0x0;},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x560)]=Game_CharacterBase[_0x37ae6a(0x3a7)]['moveStraight'],Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x631)]=function(_0x3331ad){const _0x47bde7=_0x37ae6a;this[_0x47bde7(0x322)]=_0x3331ad,VisuMZ[_0x47bde7(0x4de)][_0x47bde7(0x560)][_0x47bde7(0x609)](this,_0x3331ad);},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x47c)]=function(_0x3355b3){const _0xd16e32=_0x37ae6a;if(!this[_0xd16e32(0x26b)](_0x3355b3))return this['moveStraight'](_0x3355b3);let _0x566d68=0x0,_0x584c80=0x0;switch(_0x3355b3){case 0x1:_0x566d68=0x4,_0x584c80=0x2;break;case 0x3:_0x566d68=0x6,_0x584c80=0x2;break;case 0x7:_0x566d68=0x4,_0x584c80=0x8;break;case 0x9:_0x566d68=0x6,_0x584c80=0x8;break;}if(VisuMZ[_0xd16e32(0x4de)][_0xd16e32(0x556)]['Movement'][_0xd16e32(0x210)]){if('fFJcr'===_0xd16e32(0x4f8)){if(!this[_0xd16e32(0x30c)](this['_x'],this['_y'],_0x566d68))return this[_0xd16e32(0x631)](_0x584c80);if(!this[_0xd16e32(0x30c)](this['_x'],this['_y'],_0x584c80))return this[_0xd16e32(0x631)](_0x566d68);if(!this['canPassDiagonally'](this['_x'],this['_y'],_0x566d68,_0x584c80)){if(_0xd16e32(0x67d)===_0xd16e32(0x3c1)){const _0x1c66cc=this[_0xd16e32(0x3a9)]();return _0x274b06['EventsMoveCore'][_0xd16e32(0x552)]['metCPC'](this[_0xd16e32(0x3a9)]()[_0xd16e32(0x438)],this[_0xd16e32(0x37d)],_0x1c66cc);}else{let _0x14b728=VisuMZ['EventsMoveCore'][_0xd16e32(0x556)]['Movement']['FavorHorz']?_0x566d68:_0x584c80;return this['moveStraight'](_0x14b728);}}}else return _0x55498d[_0xd16e32(0x4de)][_0xd16e32(0x556)][_0xd16e32(0x613)][_0xd16e32(0x396)];}this[_0xd16e32(0x322)]=_0x3355b3,this[_0xd16e32(0x69b)](_0x566d68,_0x584c80);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x680)]=Game_CharacterBase['prototype'][_0x37ae6a(0x547)],Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x547)]=function(){const _0x2d59f5=_0x37ae6a;let _0x2947b2=this[_0x2d59f5(0x5eb)];if(this[_0x2d59f5(0x620)]()){if('dPWIN'!==_0x2d59f5(0x49a)){if(_0x32858f[_0x2d59f5(0x226)]())return![];return _0x1afb24[_0x2d59f5(0x359)][_0x2d59f5(0x6db)](_0x57c3cf);}else _0x2947b2+=this[_0x2d59f5(0x1d2)]();}return this[_0x2d59f5(0x344)](_0x2947b2);},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x1d2)]=function(){const _0x1019bc=_0x37ae6a,_0x4a09f1=VisuMZ[_0x1019bc(0x4de)][_0x1019bc(0x556)]['Movement'];return _0x4a09f1['DashModifier']!==undefined?_0x4a09f1[_0x1019bc(0x68a)]:VisuMZ['EventsMoveCore'][_0x1019bc(0x680)][_0x1019bc(0x609)](this)-this[_0x1019bc(0x5eb)];},Game_CharacterBase['prototype']['adjustDir8MovementSpeed']=function(_0x79109a){const _0x489ae0=_0x37ae6a,_0x3e5940=VisuMZ[_0x489ae0(0x4de)][_0x489ae0(0x556)]['Movement'];if(!_0x3e5940[_0x489ae0(0x6c3)])return _0x79109a;return[0x1,0x3,0x7,0x9][_0x489ae0(0x6db)](this[_0x489ae0(0x322)])&&(_0x79109a*=_0x3e5940[_0x489ae0(0x453)]||0.01),_0x79109a;},VisuMZ['EventsMoveCore'][_0x37ae6a(0x403)]=Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x620)],Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x620)]=function(){const _0x4b8469=_0x37ae6a;if(!Game_CharacterBase[_0x4b8469(0x699)]&&this['isOnLadder']())return![];if(this['_forceDashing'])return!![];return VisuMZ['EventsMoveCore'][_0x4b8469(0x403)][_0x4b8469(0x609)](this);},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x1e4)]=function(){const _0x3b455c=_0x37ae6a;return this['isDashing']()&&this[_0x3b455c(0x5ad)]===0x0;},VisuMZ[_0x37ae6a(0x4de)]['Game_CharacterBase_pattern']=Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x6ed)],Game_CharacterBase['prototype'][_0x37ae6a(0x6ed)]=function(){const _0x12ad91=_0x37ae6a;return this[_0x12ad91(0x5ff)]()?this[_0x12ad91(0x532)]():VisuMZ[_0x12ad91(0x4de)][_0x12ad91(0x6e0)]['call'](this);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x348)]=Game_CharacterBase[_0x37ae6a(0x3a7)]['increaseSteps'],Game_CharacterBase['prototype'][_0x37ae6a(0x356)]=function(){const _0x4907ff=_0x37ae6a;VisuMZ[_0x4907ff(0x4de)][_0x4907ff(0x348)][_0x4907ff(0x609)](this),this[_0x4907ff(0x548)]();},VisuMZ['EventsMoveCore']['Game_CharacterBase_characterIndex']=Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x5df)],Game_CharacterBase['prototype'][_0x37ae6a(0x5df)]=function(){const _0x1dfef6=_0x37ae6a;if(this[_0x1dfef6(0x390)]())return this['characterIndexVS8']();return VisuMZ['EventsMoveCore'][_0x1dfef6(0x4be)][_0x1dfef6(0x609)](this);},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x683)]=function(){const _0x4b0fd2=_0x37ae6a,_0x43e97c=this[_0x4b0fd2(0x293)]();if(this[_0x4b0fd2(0x204)]()){if(_0x4b0fd2(0x2ba)!=='XTrFy')return this[_0x4b0fd2(0x5f8)]()[_0x4b0fd2(0x321)]??0x0;else{if([0x2,0x4,0x6,0x8]['includes'](_0x43e97c))return 0x4;if([0x1,0x3,0x7,0x9][_0x4b0fd2(0x6db)](_0x43e97c))return 0x5;}}else{if(this[_0x4b0fd2(0x24f)]())return _0x4b0fd2(0x4ed)!=='zCJhK'?this[_0x4b0fd2(0x3ae)](0x6,_0x497013(_0x1728e1['$1'])):0x6;else{if(this[_0x4b0fd2(0x5ff)]()){if('oDImh'!==_0x4b0fd2(0x45b))return this[_0x4b0fd2(0x417)]();else _0x3217c4[_0x4b0fd2(0x4de)][_0x4b0fd2(0x2da)][_0x4b0fd2(0x609)](this),this[_0x4b0fd2(0x60d)]();}else{if(this[_0x4b0fd2(0x6b2)]){if([0x2,0x4,0x6,0x8][_0x4b0fd2(0x6db)](_0x43e97c))return 0x4;if([0x1,0x3,0x7,0x9][_0x4b0fd2(0x6db)](_0x43e97c))return 0x5;}else{if(this[_0x4b0fd2(0x6bc)]()&&this[_0x4b0fd2(0x255)]()){if(_0x4b0fd2(0x53a)===_0x4b0fd2(0x53a)){if([0x2,0x4,0x6,0x8][_0x4b0fd2(0x6db)](_0x43e97c))return 0x4;if([0x1,0x3,0x7,0x9][_0x4b0fd2(0x6db)](_0x43e97c))return 0x5;}else _0x535d26['prototype'][_0x4b0fd2(0x3c4)][_0x4b0fd2(0x609)](this),this['contents'][_0x4b0fd2(0x674)]=this[_0x4b0fd2(0x63c)]();}else{if(this[_0x4b0fd2(0x1e4)]()){if(_0x4b0fd2(0x63a)!==_0x4b0fd2(0x63a))_0x4cf6b5['x']=0x0,_0x1e726f['y']=-this[_0x4b0fd2(0x4a7)]+this['height']*0x2/0x5,this[_0x4b0fd2(0x31f)][_0x4b0fd2(0x6ed)]()!==0x1&&(_0x217039['y']+=0x1);else{if([0x2,0x4,0x6,0x8][_0x4b0fd2(0x6db)](_0x43e97c))return 0x2;if([0x1,0x3,0x7,0x9][_0x4b0fd2(0x6db)](_0x43e97c))return 0x3;}}else{if([0x2,0x4,0x6,0x8][_0x4b0fd2(0x6db)](_0x43e97c))return 0x0;if([0x1,0x3,0x7,0x9]['includes'](_0x43e97c))return 0x1;}}}}}}},Game_CharacterBase[_0x37ae6a(0x3a7)]['useCarryPoseForIcons']=function(){const _0xd94436=_0x37ae6a;return VisuMZ[_0xd94436(0x4de)][_0xd94436(0x556)]['VS8']['CarryPose'];},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x681)]=function(){const _0x473319=_0x37ae6a;return this[_0x473319(0x24f)]()&&this[_0x473319(0x274)]()===VisuMZ[_0x473319(0x4de)]['Settings']['TerrainTag'][_0x473319(0x6fa)];},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x1ff)]=function(){return this['isOnRope']()?0x4:0x2;},VisuMZ[_0x37ae6a(0x4de)]['Game_CharacterBase_update']=Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x36b)],Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x36b)]=function(){const _0x57e90e=_0x37ae6a;VisuMZ[_0x57e90e(0x4de)]['Game_CharacterBase_update'][_0x57e90e(0x609)](this),this[_0x57e90e(0x5db)]();},Game_CharacterBase[_0x37ae6a(0x3a7)]['updatePose']=function(){const _0x1f1ce6=_0x37ae6a;this[_0x1f1ce6(0x404)]=this[_0x1f1ce6(0x404)]||0x0;if(this[_0x1f1ce6(0x404)]>0x0){if(_0x1f1ce6(0x34b)===_0x1f1ce6(0x6a0))this['moveStraight'](_0x568c8c>0x0?0x4:0x6);else{this[_0x1f1ce6(0x404)]--;if(this[_0x1f1ce6(0x404)]<=0x0&&this[_0x1f1ce6(0x5ae)]!==_0x1f1ce6(0x1dc))this['clearPose']();}}},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x5a9)]=Game_CharacterBase['prototype']['moveDiagonally'],Game_CharacterBase['prototype']['moveDiagonally']=function(_0x5bd203,_0x89030e){const _0x4ea5ef=_0x37ae6a;VisuMZ[_0x4ea5ef(0x4de)][_0x4ea5ef(0x5a9)]['call'](this,_0x5bd203,_0x89030e);if(this[_0x4ea5ef(0x390)]())this[_0x4ea5ef(0x66b)](_0x5bd203,_0x89030e);},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x66b)]=function(_0x1a6b56,_0x3a64a7){const _0x49df43=_0x37ae6a;if(_0x1a6b56===0x4&&_0x3a64a7===0x2)this[_0x49df43(0x349)](0x1);if(_0x1a6b56===0x6&&_0x3a64a7===0x2)this['setDirection'](0x3);if(_0x1a6b56===0x4&&_0x3a64a7===0x8)this[_0x49df43(0x349)](0x7);if(_0x1a6b56===0x6&&_0x3a64a7===0x8)this['setDirection'](0x9);},VisuMZ[_0x37ae6a(0x4de)]['Game_CharacterBase_hasStepAnime']=Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x463)],Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x463)]=function(){const _0x384263=_0x37ae6a;if(this[_0x384263(0x5ff)]()&&this[_0x384263(0x501)]()===_0x384263(0x1dc))return!![];return VisuMZ[_0x384263(0x4de)]['Game_CharacterBase_hasStepAnime'][_0x384263(0x609)](this);},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x4d6)]=function(_0x3e91d3,_0x3c5ca6){const _0x9702e9=_0x37ae6a;if(_0x3e91d3[_0x9702e9(0x6b7)](/Z/i))_0x3e91d3=_0x9702e9(0x1dc);if(_0x3e91d3['match'](/SLEEP/i))_0x3e91d3=_0x9702e9(0x1dc);if(this[_0x9702e9(0x390)]()){if(_0x9702e9(0x3d0)!=='BMnpK')this['_pose']=_0x3e91d3['toUpperCase']()[_0x9702e9(0x519)](),this['_poseDuration']=_0x3c5ca6||Infinity;else{if(this['_followerControlID']===_0x2554cf)this[_0x9702e9(0x467)]();this[_0x9702e9(0x5e4)]=_0x2aeca5;;}}},Game_CharacterBase[_0x37ae6a(0x3a7)]['getPose']=function(){const _0x421d13=_0x37ae6a;if(this[_0x421d13(0x390)]()){if('tHUsb'===_0x421d13(0x5b3))return(this[_0x421d13(0x5ae)]||'')['toUpperCase']()[_0x421d13(0x519)]();else{const _0x1a107d=this['_randomHomeX'],_0x359473=this[_0x421d13(0x28c)];return this[_0x421d13(0x3dc)](_0x1a107d,_0x359473);}}else{if(_0x421d13(0x252)!==_0x421d13(0x57d))return''['toUpperCase']()[_0x421d13(0x519)]();else _0x488c63['EventsMoveCore'][_0x421d13(0x599)][_0x421d13(0x609)](this),this['bitmap'][_0x421d13(0x241)](this[_0x421d13(0x35e)][_0x421d13(0x577)](this));}},Game_CharacterBase[_0x37ae6a(0x3a7)]['setBalloonPose']=function(_0x3f8ff3,_0x4e2393){const _0x1e4316=_0x37ae6a;if(this['isSpriteVS8dir']()){if(_0x1e4316(0x5a6)!==_0x1e4316(0x579)){const _0x420003=['','EXCLAMATION',_0x1e4316(0x4f3),_0x1e4316(0x416),'HEART',_0x1e4316(0x27e),_0x1e4316(0x47a),_0x1e4316(0x5bf),_0x1e4316(0x59f),'LIGHT\x20BULB','ZZZ','','','','',''][_0x3f8ff3];this[_0x1e4316(0x4d6)](_0x420003,_0x4e2393);}else{if(!_0x43af31[_0x1e4316(0x699)]&&this['isOnLadder']())return![];if(this[_0x1e4316(0x52d)])return!![];return _0x5a12e0[_0x1e4316(0x4de)]['Game_CharacterBase_isDashing'][_0x1e4316(0x609)](this);}}},Game_CharacterBase['prototype'][_0x37ae6a(0x548)]=function(){const _0x1eaa12=_0x37ae6a;this[_0x1eaa12(0x5ae)]='',this['_poseDuration']=0x0;},Game_CharacterBase['prototype'][_0x37ae6a(0x5ff)]=function(){const _0x2fa64b=_0x37ae6a;return this['isSpriteVS8dir']()&&!!this[_0x2fa64b(0x5ae)];},Game_CharacterBase['prototype'][_0x37ae6a(0x417)]=function(){const _0x533e54=_0x37ae6a,_0x3956e8=this[_0x533e54(0x5ae)][_0x533e54(0x5cf)]();switch(this[_0x533e54(0x5ae)][_0x533e54(0x5cf)]()[_0x533e54(0x519)]()){case _0x533e54(0x3ff):case'HMPH':case _0x533e54(0x51d):case _0x533e54(0x2d0):case _0x533e54(0x3ab):case _0x533e54(0x295):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype'][_0x37ae6a(0x6e4)]=function(){const _0x165b90=_0x37ae6a;switch(this[_0x165b90(0x5ae)][_0x165b90(0x5cf)]()){case _0x165b90(0x2e3):case'QUESTION':case'MUSIC\x20NOTE':case'!':case'?':return 0x2;break;case _0x165b90(0x254):case'ANGER':case _0x165b90(0x47a):return 0x4;break;case _0x165b90(0x3ff):case'HMPH':case _0x165b90(0x51d):case'COBWEB':case'SILENCE':case'LIGHT\x20BULB':return 0x6;break;case _0x165b90(0x2d0):case _0x165b90(0x3ab):case _0x165b90(0x295):case _0x165b90(0x1dc):case'SLEEP':return 0x8;break;default:return VisuMZ[_0x165b90(0x4de)][_0x165b90(0x280)]['call'](this);break;}},Game_CharacterBase[_0x37ae6a(0x3a7)]['getPosingCharacterPattern']=function(){const _0x1784db=_0x37ae6a;switch(this[_0x1784db(0x5ae)][_0x1784db(0x5cf)]()){case _0x1784db(0x3ff):case'HURT':case'EXCLAMATION':case'!':case'HEART':case _0x1784db(0x5bf):return 0x0;break;case _0x1784db(0x61e):case'KNEEL':case _0x1784db(0x4f3):case'?':case'ANGER':case _0x1784db(0x59f):return 0x1;break;case _0x1784db(0x51d):case _0x1784db(0x295):case'MUSIC\x20NOTE':case _0x1784db(0x47a):case _0x1784db(0x3a1):return 0x2;break;default:return VisuMZ[_0x1784db(0x4de)][_0x1784db(0x6e0)]['call'](this);break;}},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x5c0)]=function(){this['_forceCarrying']=!![];},Game_CharacterBase[_0x37ae6a(0x3a7)]['clearCarrying']=function(){const _0x2fd16f=_0x37ae6a;this[_0x2fd16f(0x6b2)]=![];},Game_CharacterBase[_0x37ae6a(0x3a7)]['forceDashing']=function(){this['_forceDashing']=!![];},Game_CharacterBase['prototype']['clearDashing']=function(){const _0x101616=_0x37ae6a;this[_0x101616(0x52d)]=![];},Game_CharacterBase['prototype'][_0x37ae6a(0x41e)]=function(){const _0x4a3990=_0x37ae6a;if(this[_0x4a3990(0x386)]())return![];if(this[_0x4a3990(0x40f)])return![];if(this[_0x4a3990(0x30a)]==='')return![];if(this[_0x4a3990(0x678)]===Game_Vehicle)return![];if(this['isTransparent']())return![];return!![];},Game_CharacterBase['prototype'][_0x37ae6a(0x3e5)]=function(){const _0x20d532=_0x37ae6a;if(this['isOnLadder']())return!![];if(this[_0x20d532(0x678)]===Game_Player&&this['isInVehicle']())return!![];return![];},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x20d)]=function(){const _0x2a4cf5=_0x37ae6a;return VisuMZ['EventsMoveCore'][_0x2a4cf5(0x556)][_0x2a4cf5(0x1e5)][_0x2a4cf5(0x51f)];},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x6d9)]=function(){return this['screenX']();},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x27f)]=function(){const _0x2ac564=_0x37ae6a,_0x13adf4=$gameMap[_0x2ac564(0x2d8)]();return Math[_0x2ac564(0x69e)](this['scrolledY']()*_0x13adf4+_0x13adf4);},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x3d1)]=function(_0x33330e,_0x36332d){const _0x92e95a=_0x37ae6a;if(VisuMZ[_0x92e95a(0x4de)][_0x92e95a(0x3d1)])return VisuMZ[_0x92e95a(0x4de)][_0x92e95a(0x3d1)][_0x92e95a(0x609)](this,_0x33330e,_0x36332d);const _0x326012='\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20goalX\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20goalY\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20searchLimit\x20=\x20this.searchLimit();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20mapWidth\x20=\x20$gameMap.width();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20nodeList\x20=\x20[];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20openList\x20=\x20[];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20closedList\x20=\x20[];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20start\x20=\x20{};\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20best\x20=\x20start;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(this.x\x20===\x20goalX\x20&&\x20this.y\x20===\x20goalY)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20start.parent\x20=\x20null;\x0a\x20\x20\x20\x20\x20\x20\x20\x20start.x\x20=\x20this.x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20start.y\x20=\x20this.y;\x0a\x20\x20\x20\x20\x20\x20\x20\x20start.g\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20start.f\x20=\x20$gameMap.distance(start.x,\x20start.y,\x20goalX,\x20goalY);\x0a\x20\x20\x20\x20\x20\x20\x20\x20nodeList.push(start);\x0a\x20\x20\x20\x20\x20\x20\x20\x20openList.push(start.y\x20*\x20mapWidth\x20+\x20start.x);\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20while\x20(nodeList.length\x20>\x200)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20bestIndex\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20for\x20(let\x20i\x20=\x200;\x20i\x20<\x20nodeList.length;\x20i++)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(nodeList[i].f\x20<\x20nodeList[bestIndex].f)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20bestIndex\x20=\x20i;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20current\x20=\x20nodeList[bestIndex];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20x1\x20=\x20current.x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20y1\x20=\x20current.y;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20pos1\x20=\x20y1\x20*\x20mapWidth\x20+\x20x1;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20g1\x20=\x20current.g;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20nodeList.splice(bestIndex,\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20openList.splice(openList.indexOf(pos1),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20closedList.push(pos1);\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(current.x\x20===\x20goalX\x20&&\x20current.y\x20===\x20goalY)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20best\x20=\x20current;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20break;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(g1\x20>=\x20searchLimit)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20continue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20horzData\x20=\x20[0,\x204,\x200,\x206,\x204,\x200,\x206,\x204,\x200,\x206];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20vertData\x20=\x20[0,\x202,\x202,\x202,\x200,\x200,\x200,\x208,\x208,\x208];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20for\x20(let\x20j\x20=\x201;\x20j\x20<\x2010;\x20j++)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(j\x20===\x205)\x20continue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20direction\x20=\x20j;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20horz\x20=\x20horzData[j];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20vert\x20=\x20vertData[j];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20x2\x20=\x20$gameMap.roundXWithDirection(x1,\x20direction);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20y2\x20=\x20$gameMap.roundYWithDirection(y1,\x20direction);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20pos2\x20=\x20y2\x20*\x20mapWidth\x20+\x20x2;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(closedList.includes(pos2))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20continue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(this.constructor\x20===\x20Game_Player\x20&&\x20VisuMZ.EventsMoveCore.Settings.Movement.StrictCollision)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(!this.canPass(x1,\x20y1,\x20horz))\x20continue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(!this.canPass(x1,\x20y1,\x20vert))\x20continue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(!this.canPassDiagonally(x1,\x20y1,\x20horz,\x20vert))\x20continue;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20g2\x20=\x20g1\x20+\x201;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20index2\x20=\x20openList.indexOf(pos2);\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(index2\x20<\x200\x20||\x20g2\x20<\x20nodeList[index2].g)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20neighbor\x20=\x20{};\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(index2\x20>=\x200)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20neighbor\x20=\x20nodeList[index2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20nodeList.push(neighbor);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20openList.push(pos2);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20neighbor.parent\x20=\x20current;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20neighbor.x\x20=\x20x2;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20neighbor.y\x20=\x20y2;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20neighbor.g\x20=\x20g2;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20neighbor.f\x20=\x20g2\x20+\x20$gameMap.distance(x2,\x20y2,\x20goalX,\x20goalY);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(!best\x20||\x20neighbor.f\x20-\x20neighbor.g\x20<\x20best.f\x20-\x20best.g)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20best\x20=\x20neighbor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20node\x20=\x20best;\x0a\x20\x20\x20\x20\x20\x20\x20\x20while\x20(node.parent\x20&&\x20node.parent\x20!==\x20start)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20node\x20=\x20node.parent;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20deltaX1\x20=\x20$gameMap.deltaX(node.x,\x20start.x);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20deltaY1\x20=\x20$gameMap.deltaY(node.y,\x20start.y);\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(deltaX1\x20<\x200\x20&&\x20deltaY1\x20>\x200)\x20return\x201;\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(deltaX1\x20>\x200\x20&&\x20deltaY1\x20>\x200)\x20return\x203;\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(deltaX1\x20<\x200\x20&&\x20deltaY1\x20<\x200)\x20return\x207;\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(deltaX1\x20>\x200\x20&&\x20deltaY1\x20<\x200)\x20return\x209;\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(deltaY1\x20>\x200)\x20return\x202;\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(deltaX1\x20<\x200)\x20return\x204;\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(deltaX1\x20>\x200)\x20return\x206;\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(deltaY1\x20<\x200)\x20return\x208;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20deltaX2\x20=\x20this.deltaXFrom(goalX);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20deltaY2\x20=\x20this.deltaYFrom(goalY);\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Math.abs(deltaX2)\x20>\x20Math.abs(deltaY2))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20deltaX2\x20>\x200\x20?\x204\x20:\x206;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(deltaY2\x20!==\x200)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20deltaY2\x20>\x200\x20?\x208\x20:\x202;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20';return VisuMZ['EventsMoveCore']['findDiagonalDirectionTo']=new Function(_0x326012),VisuMZ[_0x92e95a(0x4de)][_0x92e95a(0x3d1)][_0x92e95a(0x609)](this,_0x33330e,_0x36332d);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x67e)]=Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x30c)],Game_CharacterBase['prototype'][_0x37ae6a(0x30c)]=function(_0x4e785c,_0x3ac69e,_0x105536){const _0x9db804=_0x37ae6a;return this[_0x9db804(0x27d)]===_0x9db804(0x331)?this[_0x9db804(0x458)]()[_0x9db804(0x473)](_0x4e785c,_0x3ac69e,_0x105536):VisuMZ[_0x9db804(0x4de)][_0x9db804(0x67e)][_0x9db804(0x609)](this,_0x4e785c,_0x3ac69e,_0x105536);},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x38d)]=function(){const _0x34fd63=_0x37ae6a;this[_0x34fd63(0x233)]=0x0,this['_spriteOffsetY']=0x0;},VisuMZ[_0x37ae6a(0x4de)]['Game_CharacterBase_screenX']=Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x4e8)],Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x4e8)]=function(){const _0x47c0e4=_0x37ae6a;return VisuMZ['EventsMoveCore'][_0x47c0e4(0x1fd)]['call'](this)+(this[_0x47c0e4(0x233)]||0x0);},VisuMZ[_0x37ae6a(0x4de)]['Game_CharacterBase_screenY']=Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x3f3)],Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x3f3)]=function(){const _0x4e7cbb=_0x37ae6a;return VisuMZ[_0x4e7cbb(0x4de)][_0x4e7cbb(0x2c0)][_0x4e7cbb(0x609)](this)+(this[_0x4e7cbb(0x52e)]||0x0);},Game_CharacterBase[_0x37ae6a(0x1eb)]=VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x556)][_0x37ae6a(0x1e5)][_0x37ae6a(0x37e)]??-0x6,Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x6f3)]=function(){const _0x335cab=_0x37ae6a;return this['isObjectCharacter']()?0x0:-Game_CharacterBase[_0x335cab(0x1eb)];},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x277)]=function(){const _0x3891e0=_0x37ae6a;this[_0x3891e0(0x506)]='';},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x3ba)]=Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x5ea)],Game_CharacterBase[_0x37ae6a(0x3a7)]['updatePattern']=function(){const _0x286956=_0x37ae6a;if(this[_0x286956(0x4b6)])return;if(this['updatePatternEventsMoveCore']())return;VisuMZ[_0x286956(0x4de)]['Game_CharacterBase_updatePattern'][_0x286956(0x609)](this);},Game_CharacterBase['prototype'][_0x37ae6a(0x346)]=function(){const _0x32d173=_0x37ae6a;if(!this[_0x32d173(0x463)]()&&this[_0x32d173(0x5ad)]>0x0)return![];switch(String(this[_0x32d173(0x506)])[_0x32d173(0x5cf)]()['trim']()){case _0x32d173(0x289):this[_0x32d173(0x4ea)]+=0x1;if(this[_0x32d173(0x4ea)]>0x2)this['setPattern'](0x0);break;case _0x32d173(0x4bb):this[_0x32d173(0x4ea)]-=0x1;if(this['_pattern']<0x0)this['setPattern'](0x2);break;case'SPIN\x20CLOCKWISE':case'SPIN\x20CW':this['turnRight90']();break;case _0x32d173(0x41b):case _0x32d173(0x6dd):case'SPIN\x20ANTICLOCKWISE':case _0x32d173(0x2bb):this['turnLeft90']();break;default:return![];}return!![];},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x4a5)]=function(){const _0x245d9b=_0x37ae6a;return $gameSystem[_0x245d9b(0x4a5)](this);},Game_CharacterBase[_0x37ae6a(0x3a7)]['hasEventIcon']=function(){const _0x30dd7a=_0x37ae6a,_0x20dc3b=this[_0x30dd7a(0x4a5)]();if(!_0x20dc3b)return![];return _0x20dc3b[_0x30dd7a(0x6af)]>0x0;},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x28e)]=function(){const _0x50f400=_0x37ae6a,_0x4a98a0=this[_0x50f400(0x293)]();return $gameMap[_0x50f400(0x4d4)](this['x'],_0x4a98a0);},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x5f1)]=function(){const _0x3a436f=_0x37ae6a,_0x538939=this[_0x3a436f(0x293)]();return $gameMap[_0x3a436f(0x5f6)](this['y'],_0x538939);},Game_CharacterBase['prototype'][_0x37ae6a(0x46d)]=function(){const _0x4a3bea=_0x37ae6a,_0xf64d84=this[_0x4a3bea(0x239)](this[_0x4a3bea(0x293)]());return $gameMap[_0x4a3bea(0x4d4)](this['x'],_0xf64d84);},Game_CharacterBase[_0x37ae6a(0x3a7)]['backY']=function(){const _0x538786=_0x37ae6a,_0x409e7a=this[_0x538786(0x239)](this[_0x538786(0x293)]());return $gameMap['roundYWithDirection'](this['y'],_0x409e7a);},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x614)]=function(){const _0x51e587=_0x37ae6a,_0x2cc23b=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x51e587(0x293)]()];return $gameMap[_0x51e587(0x4d4)](this['x'],_0x2cc23b);},Game_CharacterBase['prototype'][_0x37ae6a(0x2d7)]=function(){const _0x154d00=_0x37ae6a,_0xe30299=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x154d00(0x293)]()];return $gameMap['roundYWithDirection'](this['y'],_0xe30299);},Game_CharacterBase['prototype'][_0x37ae6a(0x5b5)]=function(){const _0xd3368d=_0x37ae6a,_0x1e8f1f=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this['direction']()];return $gameMap[_0xd3368d(0x4d4)](this['x'],_0x1e8f1f);},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x34a)]=function(){const _0x2404b7=_0x37ae6a,_0x40d7c5=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x2404b7(0x293)]()];return $gameMap['roundYWithDirection'](this['y'],_0x40d7c5);},VisuMZ['EventsMoveCore'][_0x37ae6a(0x518)]=Game_Character[_0x37ae6a(0x3a7)]['setMoveRoute'],Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x4bc)]=function(_0x210b1d){const _0x349309=_0x37ae6a;route=JsonEx[_0x349309(0x47e)](_0x210b1d),VisuMZ[_0x349309(0x4de)]['Game_Character_setMoveRoute']['call'](this,route);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x235)]=Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x520)],Game_Character['prototype'][_0x37ae6a(0x520)]=function(_0x491e60){const _0x3320db=_0x37ae6a;route=JsonEx[_0x3320db(0x47e)](_0x491e60),VisuMZ[_0x3320db(0x4de)][_0x3320db(0x235)][_0x3320db(0x609)](this,route);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x64d)]=Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x39d)],Game_Character[_0x37ae6a(0x3a7)]['processMoveCommand']=function(_0x272e96){const _0x423647=_0x37ae6a,_0x233882=Game_Character,_0xc3361b=_0x272e96['parameters'];if(_0x272e96[_0x423647(0x4cd)]===_0x233882['ROUTE_SCRIPT']){let _0x4ec401=_0x272e96[_0x423647(0x466)][0x0];_0x4ec401=this[_0x423647(0x49b)](_0x4ec401),_0x4ec401=this[_0x423647(0x30d)](_0x4ec401),this[_0x423647(0x6c4)](_0x272e96,_0x4ec401);}else VisuMZ[_0x423647(0x4de)]['Game_Character_processMoveCommand']['call'](this,_0x272e96);},Game_Character[_0x37ae6a(0x3a7)]['convertVariableValuesInScriptCall']=function(_0x190822){const _0x157f4c=_0x37ae6a,_0x47274e=/\$gameVariables\.value\((\d+)\)/gi,_0x337183=/\\V\[(\d+)\]/gi;while(_0x190822[_0x157f4c(0x6b7)](_0x47274e)){if(_0x157f4c(0x49e)!==_0x157f4c(0x49e)){let _0x4e79e7=[_0xd29423,_0x16bc89,_0x157f4c(0x592)[_0x157f4c(0x51a)](_0x10c42e)];typeof _0x5a9d40===_0x157f4c(0x1fa)&&(_0x4e79e7=[_0x10fb36,_0x15ad25,_0x4d3657[_0x157f4c(0x5cf)]()[_0x157f4c(0x519)]()]),_0x510099['setValue'](_0x4e79e7,_0xf76397);}else _0x190822=_0x190822[_0x157f4c(0x4f1)](_0x47274e,(_0x354534,_0x5e6306)=>$gameVariables[_0x157f4c(0x3b7)](parseInt(_0x5e6306)));}while(_0x190822[_0x157f4c(0x6b7)](_0x337183)){if('hjadK'===_0x157f4c(0x68e)){const _0x5568a2=_0x30d9e7?_0x4b3e29[_0x157f4c(0x22c)]():0x0,_0x47a713=[0x0,0x0,_0x157f4c(0x232)[_0x157f4c(0x51a)](_0x5568a2,_0x443b20)];return _0xf6f067[_0x157f4c(0x3b7)](_0x47a713);}else _0x190822=_0x190822[_0x157f4c(0x4f1)](_0x337183,(_0x5c836c,_0x73ac8)=>$gameVariables[_0x157f4c(0x3b7)](parseInt(_0x73ac8)));}return _0x190822;},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x30d)]=function(_0x288033){const _0x2222e7=_0x37ae6a,_0x474cd2=/\\SELFVAR\[(\d+)\]/gi;while(_0x288033[_0x2222e7(0x6b7)](_0x474cd2)){_0x288033=_0x288033['replace'](_0x474cd2,(_0x7d215c,_0x12e273)=>getSelfVariableValue(this[_0x2222e7(0x58e)],this[_0x2222e7(0x269)],parseInt(_0x12e273)));}return _0x288033;},Game_Character['prototype']['processMoveCommandEventsMoveCore']=function(_0x56b487,_0x3959f3){const _0x2457de=_0x37ae6a;if(_0x3959f3[_0x2457de(0x6b7)](/ANIMATION:[ ](\d+)/i)){if('DUCpz'==='DUCpz')return this[_0x2457de(0x5e3)](Number(RegExp['$1']));else{let _0x5be59c=_0x2457de(0x619)[_0x2457de(0x51a)](_0x359d40[_0x2457de(0x22c)]);_0x5be59c+=_0x2457de(0x47b),_0x5be59c+=_0x2457de(0x612),_0x5be59c+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x5be59c+=_0x2457de(0x3ce)[_0x2457de(0x51a)](_0x4fb7f3[_0x2457de(0x22c)]),_0xc3c455(_0x5be59c);return;}}if(_0x3959f3['match'](/BALLOON:[ ](.*)/i))return this['processMoveRouteBalloon'](String(RegExp['$1']));if(_0x3959f3[_0x2457de(0x6b7)](/FADE IN:[ ](\d+)/i)){if('KzfBI'!==_0x2457de(0x4ab)){const _0x3f1616=_0x4faac5[_0x2457de(0x345)](_0x539d40,_0x2f7f47);for(const _0x5b660f of _0x3f1616){if(_0x5b660f&&_0x5b660f['hasClickTrigger']())return _0x5b660f['onClickTrigger'](),!![];}return![];}else return this[_0x2457de(0x33d)](Number(RegExp['$1']));}if(_0x3959f3['match'](/FADE OUT:[ ](\d+)/i))return _0x2457de(0x62c)!=='iirGg'?(_0x50f9ab[_0x2457de(0x660)](this),_0x3e5125[_0x2457de(0x4de)][_0x2457de(0x52a)][_0x2457de(0x609)](this,_0x28f415)):this[_0x2457de(0x69d)](Number(RegExp['$1']));if(_0x3959f3[_0x2457de(0x6b7)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i)){if('hEvgc'==='nWnzw'){if(!this[_0x2457de(0x55a)](_0x39ced7))return;let _0x54644a;const _0x2b4627=_0x38cd04['EventsMoveCore']['Settings']['Label'][_0x2457de(0x604)]??!![];_0x54644a=_0x2b4627?new _0x2371dd(_0x550613):new _0x49e601(_0x310604),_0x54644a['z']=0x8,_0x54644a[_0x2457de(0x3b1)]=_0x572d44[_0x2457de(0x2e6)]++,this[_0x2457de(0x202)][_0x2457de(0x621)](_0x54644a),this[_0x2457de(0x491)][_0x2457de(0x6bf)](_0x54644a);}else return this[_0x2457de(0x5c0)]();}if(_0x3959f3[_0x2457de(0x6b7)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this['clearCarrying']();if(_0x3959f3['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x2457de(0x337)]();if(_0x3959f3[_0x2457de(0x6b7)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x2457de(0x50b)]();if(_0x3959f3[_0x2457de(0x6b7)](/HUG:[ ]LEFT/i)){if(_0x2457de(0x35d)===_0x2457de(0x2fd))_0x548db0[_0x2457de(0x4de)][_0x2457de(0x64d)][_0x2457de(0x609)](this,_0x523a20);else return this['processMoveRouteHugWall'](_0x2457de(0x639));}if(_0x3959f3[_0x2457de(0x6b7)](/HUG:[ ]RIGHT/i))return this[_0x2457de(0x5ce)](_0x2457de(0x285));if(_0x3959f3['match'](/INDEX:[ ](\d+)/i))return this['processMoveRouteSetIndex'](Number(RegExp['$1']));if(_0x3959f3[_0x2457de(0x6b7)](/INDEX:[ ]([\+\-]\d+)/i)){if(_0x2457de(0x242)===_0x2457de(0x242)){const _0x24f249=this[_0x2457de(0x4ae)]+Number(RegExp['$1']);return this[_0x2457de(0x3be)](_0x24f249);}else{const _0x2b4be9=_0x3cf538[_0x2457de(0x4fe)](this['moveSynchTarget']());this[_0x2457de(0x47c)](_0x2b4be9[_0x2457de(0x364)]());}}if(_0x3959f3[_0x2457de(0x6b7)](/JUMP FORWARD:[ ](\d+)/i)){if(_0x2457de(0x495)===_0x2457de(0x495))return this[_0x2457de(0x1f8)](Number(RegExp['$1']));else{this['_needsPeriodicRefresh']=!![];return;}}if(_0x3959f3[_0x2457de(0x6b7)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x2457de(0x51e)!==_0x2457de(0x51e)){const _0x40b153=/\$gameVariables\.value\((\d+)\)/gi,_0x1cb791=/\\V\[(\d+)\]/gi;while(_0x556017['match'](_0x40b153)){_0x45101e=_0x155bb3[_0x2457de(0x4f1)](_0x40b153,(_0x47d453,_0x18b1e5)=>_0x2838a4[_0x2457de(0x3b7)](_0x1c0aad(_0x18b1e5)));}while(_0x9f80cd[_0x2457de(0x6b7)](_0x1cb791)){_0x1d4052=_0x7e1794['replace'](_0x1cb791,(_0x332299,_0x56ac0c)=>_0x30d768[_0x2457de(0x3b7)](_0x58d7a9(_0x56ac0c)));}return _0x4781eb;}else return this['processMoveRouteJumpTo'](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x3959f3[_0x2457de(0x6b7)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x46bf3e=$gameMap['event'](Number(RegExp['$1']));return this['processMoveRouteJumpToCharacter'](_0x46bf3e);}if(_0x3959f3[_0x2457de(0x6b7)](/JUMP TO PLAYER/i))return'uptgd'==='uptgd'?this['processMoveRouteJumpToCharacter']($gamePlayer):this[_0x2457de(0x349)](0x1);if(_0x3959f3[_0x2457de(0x6b7)](/JUMP TO HOME/i)&&this[_0x2457de(0x6c6)]){const _0x53a6e3=this[_0x2457de(0x45d)],_0x3a432f=this[_0x2457de(0x28c)];return this[_0x2457de(0x3dc)](_0x53a6e3,_0x3a432f);}if(_0x3959f3['match'](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x2438aa=String(RegExp['$1']),_0x14866a=this[_0x2457de(0x5d3)](_0x3959f3);return this[_0x2457de(0x51b)](_0x2438aa,_0x14866a);}if(_0x3959f3[_0x2457de(0x6b7)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0xbe25f1=Number(RegExp['$1']),_0x42d3ab=Number(RegExp['$2']),_0x21a9ba=this[_0x2457de(0x5d3)](_0x3959f3);return this[_0x2457de(0x5dd)](_0xbe25f1,_0x42d3ab,_0x21a9ba);}if(_0x3959f3[_0x2457de(0x6b7)](/MOVE TO EVENT:[ ](\d+)/i)){if(_0x2457de(0x50a)===_0x2457de(0x50a)){const _0x428932=$gameMap[_0x2457de(0x3a9)](Number(RegExp['$1'])),_0x167fc1=this[_0x2457de(0x5d3)](_0x3959f3);return this[_0x2457de(0x410)](_0x428932,_0x167fc1);}else{const _0x2940d0=_0x4190bd[_0x2457de(0x667)](this);_0x2940d0&&_0x2940d0[_0x2457de(0x5b0)]&&_0x2940d0['_shadowSprite'][_0x2457de(0x4c9)]!==this[_0x2457de(0x20d)]()&&(_0x2940d0[_0x2457de(0x5b0)][_0x2457de(0x4c9)]=this[_0x2457de(0x20d)](),_0x2940d0['_shadowSprite'][_0x2457de(0x44e)]=_0x17a621['loadSystem'](_0x2940d0['_shadowSprite'][_0x2457de(0x4c9)]));}}if(_0x3959f3[_0x2457de(0x6b7)](/MOVE TO PLAYER/i)){const _0x5c1e29=this[_0x2457de(0x5d3)](_0x3959f3);return this[_0x2457de(0x410)]($gamePlayer,_0x5c1e29);}if(_0x3959f3[_0x2457de(0x6b7)](/MOVE TO HOME/i)&&this[_0x2457de(0x6c6)]){if(_0x2457de(0x2a8)==='VUqBZ')this[_0x2457de(0x202)][_0x2457de(0x626)](_0x3791b4[_0x2457de(0x5b0)]);else{const _0x39d77f=this[_0x2457de(0x45d)],_0x3c8cd3=this[_0x2457de(0x28c)],_0x44c905=this[_0x2457de(0x5d3)](_0x3959f3);return this[_0x2457de(0x5dd)](_0x39d77f,_0x3c8cd3,_0x44c905);}}if(_0x3959f3['match'](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x2457de(0x3ae)](0x1,Number(RegExp['$1']));if(_0x3959f3[_0x2457de(0x6b7)](/MOVE DOWN:[ ](\d+)/i))return this[_0x2457de(0x3ae)](0x2,Number(RegExp['$1']));if(_0x3959f3[_0x2457de(0x6b7)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x2457de(0x3ae)](0x3,Number(RegExp['$1']));if(_0x3959f3['match'](/MOVE LEFT:[ ](\d+)/i))return this[_0x2457de(0x3ae)](0x4,Number(RegExp['$1']));if(_0x3959f3[_0x2457de(0x6b7)](/MOVE RIGHT:[ ](\d+)/i)){if(_0x2457de(0x3d5)===_0x2457de(0x3d5))return this[_0x2457de(0x3ae)](0x6,Number(RegExp['$1']));else this['_paused']=![],this['_speed']=-0x1,this[_0x2457de(0x2dd)]=0x0;}if(_0x3959f3['match'](/MOVE UPPER LEFT:[ ](\d+)/i)){if(_0x2457de(0x6d2)!==_0x2457de(0x690))return this[_0x2457de(0x3ae)](0x7,Number(RegExp['$1']));else this[_0x2457de(0x33a)]=_0x15208b[_0x2457de(0x1f7)](this[_0x2457de(0x22c)]()),this['_needsRefresh']=!![];}if(_0x3959f3['match'](/MOVE UP:[ ](\d+)/i))return'PfZKQ'===_0x2457de(0x249)?_0x5af00a[_0x2457de(0x4de)][_0x2457de(0x566)][_0x2457de(0x609)](this):this[_0x2457de(0x3ae)](0x8,Number(RegExp['$1']));if(_0x3959f3['match'](/MOVE UPPER RIGHT:[ ](\d+)/i)){if('wYEHb'===_0x2457de(0x3e3))return this[_0x2457de(0x3ae)](0x9,Number(RegExp['$1']));else this['_forceShowPlayer']=![],this['_forceHidePlayer']=!![];}if(_0x3959f3['match'](/OPACITY:[ ](\d+)([%％])/i)){if(_0x2457de(0x2e4)===_0x2457de(0x393)){if(!_0x340c19)return;if(!_0x42a6ea[_0x2457de(0x3a9)]())return;const _0x1ac1dc=_0x4d35c1[_0x2457de(0x3a9)]()[_0x2457de(0x616)]||'';if(_0x1ac1dc[_0x2457de(0x6b7)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){const _0x352fb6='%1,%2,'[_0x2457de(0x51a)](_0x5f1dbf[_0x2457de(0x58e)],_0x330995[_0x2457de(0x269)]),_0x15eda2=_0x1f509d[_0x2457de(0x1db)](this['_data'])[_0x2457de(0x208)](_0x1a63b6=>_0x1a63b6[_0x2457de(0x4f4)](_0x352fb6));while(_0x15eda2[_0x2457de(0x5e5)]>0x0){const _0x27bd23=_0x15eda2[_0x2457de(0x65a)]();delete this[_0x2457de(0x60e)][_0x27bd23];}}}else{const _0x26e9ae=Math[_0x2457de(0x647)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x26e9ae['clamp'](0x0,0xff));}}if(_0x3959f3[_0x2457de(0x6b7)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){if(_0x2457de(0x426)!==_0x2457de(0x426)){if(!this[_0x2457de(0x390)]())_0xf100e1=this['correctFacingDirection'](_0x10bd0b);_0x310ea8[_0x2457de(0x4de)]['Game_CharacterBase_setDirection'][_0x2457de(0x609)](this,_0x2e554c);}else{const _0x1dee2a=this[_0x2457de(0x211)]+Math[_0x2457de(0x647)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x1dee2a[_0x2457de(0x4fc)](0x0,0xff));}}if(_0x3959f3[_0x2457de(0x6b7)](/OPACITY:[ ]([\+\-]\d+)/i)){if(_0x2457de(0x3cb)!=='lUvJL')_0x34f04e[_0x2457de(0x5a7)](_0x26376a,_0x2e2923),_0x418c1e[_0x2457de(0x311)](_0x3e6160,_0x1dd9e1[_0x2457de(0x2c8)],_0x3ee07a[_0x2457de(0x1fb)],_0x4c5b61[_0x2457de(0x308)],_0x15d525[_0x2457de(0x2c5)]);else{const _0x10e0dc=this[_0x2457de(0x211)]+Number(RegExp['$1']);return this[_0x2457de(0x4e4)](_0x10e0dc['clamp'](0x0,0xff));}}if(_0x3959f3[_0x2457de(0x6b7)](/PATTERN LOCK:[ ](\d+)/i))return this['processMoveRoutePatternLock'](Number(RegExp['$1']));if(_0x3959f3['match'](/PATTERN UNLOCK/i)){if(_0x2457de(0x555)===_0x2457de(0x60b)){if(_0x3b5a24)this['processMoveRouteTeleportTo'](_0xe28cfb['x'],_0x407d4c['y']);}else return this[_0x2457de(0x4b6)]=![];}if(_0x3959f3[_0x2457de(0x6b7)](/POSE:[ ](.*)/i)){const _0x314308=String(RegExp['$1'])[_0x2457de(0x5cf)]()['trim']();return this[_0x2457de(0x4d6)](_0x314308);}if(_0x3959f3['match'](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x2457de(0x222)!==_0x2457de(0x65b)){const _0x230549=Number(RegExp['$1']),_0x4eeea2=Number(RegExp['$2']);return this['processMoveRouteStepTo'](_0x230549,_0x4eeea2);}else{const _0x3d9eff=_0x531564['EventsMoveCore'][_0x2457de(0x556)][_0x2457de(0x613)]['FontSize'],_0x10812a=_0x2a6a57[_0x2457de(0x25e)]()||0x1;this[_0x2457de(0x676)]['x']=this['scale']['y']=_0x3d9eff/_0x10812a;}}if(_0x3959f3['match'](/STEP TOWARD EVENT:[ ](\d+)/i)){if(_0x2457de(0x48c)!==_0x2457de(0x384)){const _0x38c79a=$gameMap[_0x2457de(0x3a9)](Number(RegExp['$1']));return this[_0x2457de(0x2f8)](_0x38c79a);}else{if(_0x5b9e64[_0x2457de(0x6b7)](/Z/i))_0x4e4d6d='ZZZ';if(_0x3cf446['match'](/SLEEP/i))_0x7eb1f4=_0x2457de(0x1dc);this[_0x2457de(0x390)]()&&(this[_0x2457de(0x5ae)]=_0x14ad19['toUpperCase']()[_0x2457de(0x519)](),this[_0x2457de(0x404)]=_0x2f4325||_0x446358);}}if(_0x3959f3[_0x2457de(0x6b7)](/STEP TOWARD PLAYER/i))return this['processMoveRouteStepToCharacter']($gamePlayer);if(_0x3959f3[_0x2457de(0x6b7)](/STEP TOWARD HOME/i)&&this[_0x2457de(0x6c6)]){const _0x4d2931=this[_0x2457de(0x45d)],_0x3cf100=this['_randomHomeY'];return this[_0x2457de(0x54d)](_0x4d2931,_0x3cf100);}if(_0x3959f3[_0x2457de(0x6b7)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x2457de(0x34f)==='CwwyE')return this[_0x2457de(0x32d)](Number(RegExp['$1']),Number(RegExp['$2']));else{const _0x2adddd=_0x2457de(0x383)[_0x2457de(0x51a)](_0x5c57a1[_0x2457de(0x6a6)](0x0)[_0x2457de(0x5cf)]()+_0x2b3a01[_0x2457de(0x2cb)](0x1));if(_0x5d412a[_0x2adddd])return _0x414d62[_0x2adddd][_0x2457de(0x6db)](_0x3eda43);}}if(_0x3959f3['match'](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x2fea08=$gameMap['event'](Number(RegExp['$1']));return this[_0x2457de(0x3f0)](_0x2fea08);}if(_0x3959f3['match'](/STEP AWAY FROM PLAYER/i))return this[_0x2457de(0x3f0)]($gamePlayer);if(_0x3959f3[_0x2457de(0x6b7)](/STEP AWAY FROM HOME/i)&&this[_0x2457de(0x6c6)]){const _0x66ed7b=this[_0x2457de(0x45d)],_0x1d4ed6=this[_0x2457de(0x28c)];return this[_0x2457de(0x32d)](_0x66ed7b,_0x1d4ed6);}if(_0x3959f3[_0x2457de(0x6b7)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x2457de(0x6d5)===_0x2457de(0x6d5))return this[_0x2457de(0x60c)](Number(RegExp['$1']),Number(RegExp['$2']));else _0x18127c['EventsMoveCore'][_0x2457de(0x5cc)]['call'](this,_0x1b9206,_0x4831eb);}if(_0x3959f3[_0x2457de(0x6b7)](/TURN TO EVENT:[ ](\d+)/i)){const _0x5b2184=$gameMap[_0x2457de(0x3a9)](Number(RegExp['$1']));return this['turnTowardCharacter'](_0x5b2184);}if(_0x3959f3[_0x2457de(0x6b7)](/TURN TO PLAYER/i))return this[_0x2457de(0x5c8)]($gamePlayer);if(_0x3959f3[_0x2457de(0x6b7)](/TURN TO HOME/i)&&this[_0x2457de(0x6c6)]){const _0x1b6a27=this[_0x2457de(0x45d)],_0x4a74c2=this['_randomHomeY'];return this[_0x2457de(0x6ba)](_0x1b6a27,_0x4a74c2);}if(_0x3959f3['match'](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x2457de(0x633)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x3959f3[_0x2457de(0x6b7)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x477a76=$gameMap['event'](Number(RegExp['$1']));return this[_0x2457de(0x554)](_0x477a76);}if(_0x3959f3[_0x2457de(0x6b7)](/TURN AWAY FROM PLAYER/i))return this[_0x2457de(0x554)]($gamePlayer);if(_0x3959f3['match'](/TURN AWAY FROM HOME/i)&&this[_0x2457de(0x6c6)]){if('yDyNr'==='ZYzvr'){_0x14c1ea['ConvertParams'](_0xac57a5,_0x4caadf);const _0x202b3d=_0x395670[_0x2457de(0x576)](),_0x514356={'mapId':_0x31d1ce[_0x2457de(0x323)],'eventId':_0x20118b[_0x2457de(0x2aa)]||_0x202b3d[_0x2457de(0x6c6)](),'pageId':_0x3c4677['PageId']};if(_0x514356['mapId']<=0x0)_0x514356[_0x2457de(0x22c)]=_0x277d7c?_0x57bb23[_0x2457de(0x22c)]():0x1;_0x1e1fc5[_0x2457de(0x576)]()['pluginCommandCallEvent'](_0x514356);}else{const _0x3b629b=this[_0x2457de(0x45d)],_0x3dcef3=this[_0x2457de(0x28c)];return this[_0x2457de(0x633)](_0x3b629b,_0x3dcef3);}}if(_0x3959f3['match'](/TURN LOWER LEFT/i))return this['setDirection'](0x1);if(_0x3959f3[_0x2457de(0x6b7)](/TURN LOWER RIGHT/i)){if(_0x2457de(0x4c1)!==_0x2457de(0x510))return this['setDirection'](0x3);else _0x1577f8[0x2]=_0x229f1c(_0x3817b4)[_0x2457de(0x6a6)](0x0)[_0x2457de(0x5cf)]()['trim']();}if(_0x3959f3[_0x2457de(0x6b7)](/TURN UPPER LEFT/i))return this[_0x2457de(0x349)](0x7);if(_0x3959f3['match'](/TURN UPPER RIGHT/i))return this[_0x2457de(0x349)](0x9);if(_0x3959f3[_0x2457de(0x6b7)](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x2457de(0x627)](RegExp['$1'],RegExp['$2']);if(_0x3959f3[_0x2457de(0x6b7)](/Self Variable[ ](.*):[ ](.*)/i))return this['processMoveRouteSelfVariable'](RegExp['$1'],RegExp['$2']);if(_0x3959f3[_0x2457de(0x6b7)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x2457de(0x2fe)==='Erxhz')_0x41a8c9=[_0x51b9af,_0x2afd7e,_0x114de1[_0x2457de(0x5cf)]()[_0x2457de(0x519)]()];else return this[_0x2457de(0x261)](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x3959f3[_0x2457de(0x6b7)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x22e6b3=$gameMap[_0x2457de(0x3a9)](Number(RegExp['$1']));return this[_0x2457de(0x455)](_0x22e6b3);}if(_0x3959f3[_0x2457de(0x6b7)](/TELEPORT TO PLAYER/i))return this[_0x2457de(0x455)]($gamePlayer);if(_0x3959f3['match'](/TELEPORT TO HOME/i)&&this[_0x2457de(0x6c6)]){const _0x1f34b0=this[_0x2457de(0x45d)],_0x4c6f18=this[_0x2457de(0x28c)];return this[_0x2457de(0x261)](_0x1f34b0,_0x4c6f18);}try{VisuMZ[_0x2457de(0x4de)]['Game_Character_processMoveCommand']['call'](this,_0x56b487);}catch(_0x250779){if(_0x2457de(0x424)!==_0x2457de(0x424)){const _0x231c5c=this[_0x2457de(0x339)](_0x39c5a9,_0x415ae5,!![]);if(_0x231c5c)this[_0x2457de(0x47c)](_0x231c5c);}else{if($gameTemp[_0x2457de(0x4b7)]())console[_0x2457de(0x2b9)](_0x250779);}}},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x5e3)]=function(_0x517e53){$gameTemp['requestAnimation']([this],_0x517e53);},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x3b3)]=function(_0x4bef9f){const _0xedb95=_0x37ae6a;let _0x3660f4=0x0;switch(_0x4bef9f[_0xedb95(0x5cf)]()[_0xedb95(0x519)]()){case'!':case _0xedb95(0x2e3):_0x3660f4=0x1;break;case'?':case _0xedb95(0x4f3):_0x3660f4=0x2;break;case _0xedb95(0x5da):case'NOTE':case _0xedb95(0x416):case _0xedb95(0x6da):case _0xedb95(0x4ee):_0x3660f4=0x3;break;case'HEART':case'LOVE':_0x3660f4=0x4;break;case'ANGER':_0x3660f4=0x5;break;case'SWEAT':_0x3660f4=0x6;break;case'COBWEB':case _0xedb95(0x1d5):case _0xedb95(0x602):_0x3660f4=0x7;break;case'SILENCE':case'...':_0x3660f4=0x8;break;case _0xedb95(0x48b):case _0xedb95(0x58a):case _0xedb95(0x3a1):case _0xedb95(0x3e8):case _0xedb95(0x6c2):_0x3660f4=0x9;break;case'Z':case'ZZ':case'ZZZ':case _0xedb95(0x375):_0x3660f4=0xa;break;case _0xedb95(0x335):_0x3660f4=0xb;break;case _0xedb95(0x496):_0x3660f4=0xc;break;case'USER-DEFINED\x203':_0x3660f4=0xd;break;case _0xedb95(0x422):_0x3660f4=0xe;break;case _0xedb95(0x401):_0x3660f4=0xf;break;}$gameTemp['requestBalloon'](this,_0x3660f4);},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x33d)]=function(_0x3da398){const _0x3b20c5=_0x37ae6a;_0x3da398+=this[_0x3b20c5(0x211)],this['setOpacity'](_0x3da398[_0x3b20c5(0x4fc)](0x0,0xff));if(this[_0x3b20c5(0x211)]<0xff)this[_0x3b20c5(0x5f9)]--;},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x69d)]=function(_0x14c8d0){const _0x234c93=_0x37ae6a;_0x14c8d0=this[_0x234c93(0x211)]-_0x14c8d0,this[_0x234c93(0x4e4)](_0x14c8d0[_0x234c93(0x4fc)](0x0,0xff));if(this[_0x234c93(0x211)]>0x0)this[_0x234c93(0x5f9)]--;},Game_Character['prototype'][_0x37ae6a(0x5ce)]=function(_0x5a797c){const _0x4bc0b6=_0x37ae6a,_0x447736=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x311d14=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x44fa31=this[_0x4bc0b6(0x293)](),_0x3f46d4=(_0x5a797c===_0x4bc0b6(0x639)?_0x447736:_0x311d14)[_0x44fa31],_0x13841a=(_0x5a797c==='left'?_0x311d14:_0x447736)[_0x44fa31];if(this[_0x4bc0b6(0x30c)](this['x'],this['y'],_0x3f46d4)){if(_0x4bc0b6(0x329)!=='OrthC'){if(_0x5a797c===_0x4bc0b6(0x639))this['turnLeft90']();else{if(_0x4bc0b6(0x314)!==_0x4bc0b6(0x314))return this[_0x4bc0b6(0x41a)](_0x232453);else this[_0x4bc0b6(0x6f6)]();}}else _0x4d2f94=this[_0x4bc0b6(0x28d)](_0x1fe022,_0xf87ce8);}else{if(!this[_0x4bc0b6(0x30c)](this['x'],this['y'],this['direction']())){if(this[_0x4bc0b6(0x30c)](this['x'],this['y'],_0x13841a)){if(_0x4bc0b6(0x49d)==='YWTLa')_0x5a797c===_0x4bc0b6(0x639)?_0x4bc0b6(0x700)!=='hDySw'?(this[_0x4bc0b6(0x5bd)]=this[_0x4bc0b6(0x5bd)]||0x0,this[_0x4bc0b6(0x5bd)]=_0x381bac,this['_working']=!![],this['_frames']=_0x10829d[_0x4bc0b6(0x319)](0x1,this[_0x4bc0b6(0x5bd)])):this[_0x4bc0b6(0x6f6)]():_0x4bc0b6(0x3f5)==='qhszc'?this[_0x4bc0b6(0x50d)]():(this['_forceShowFollower']=!![],this[_0x4bc0b6(0x46e)]=![]);else{const _0x22b510=this[_0x4bc0b6(0x625)];_0x22b510[_0x4bc0b6(0x44e)]=_0x384b9a;const _0x27724c=this[_0x4bc0b6(0x31f)][_0x4bc0b6(0x5f8)](),_0x270ea8=_0x27724c[_0x4bc0b6(0x4ff)],_0x53115c=_0x27724c[_0x4bc0b6(0x676)];let _0x47b7a5=0x1;if(_0x270ea8>0x0){let _0x4b33ab=this['getAttachPictureBitmapWidth']()||0x1,_0x192323=this[_0x4bc0b6(0x6e6)]()||0x1;const _0x462bed=_0x920875[_0x4bc0b6(0x319)](0x1,_0x4b33ab,_0x192323);_0x47b7a5=_0x270ea8/_0x462bed;}_0x47b7a5*=_0x53115c,_0x47b7a5!==0x1&&(this[_0x4bc0b6(0x625)][_0x4bc0b6(0x44e)][_0x4bc0b6(0x2ab)]=!![]),_0x22b510[_0x4bc0b6(0x676)]['x']=_0x47b7a5,_0x22b510[_0x4bc0b6(0x676)]['y']=_0x47b7a5,this['visible']=!![],this[_0x4bc0b6(0x2fc)]();}}else{if(_0x4bc0b6(0x4ce)===_0x4bc0b6(0x6b9))return this[_0x4bc0b6(0x40c)][_0x4bc0b6(0x5a3)];else this[_0x4bc0b6(0x538)]();}}}this['canPass'](this['x'],this['y'],this[_0x4bc0b6(0x293)]())&&this[_0x4bc0b6(0x3d3)]();},Game_Character['prototype'][_0x37ae6a(0x3be)]=function(_0x41bebd){const _0xc950d7=_0x37ae6a;if(ImageManager['isBigCharacter'](this[_0xc950d7(0x30a)]))return;_0x41bebd=_0x41bebd['clamp'](0x0,0x7),this[_0xc950d7(0x6d6)](this['_characterName'],_0x41bebd);},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x1f8)]=function(_0x22a0df){const _0x319584=_0x37ae6a;switch(this[_0x319584(0x293)]()){case 0x1:this[_0x319584(0x25a)](-_0x22a0df,_0x22a0df);break;case 0x2:this[_0x319584(0x25a)](0x0,_0x22a0df);break;case 0x3:this[_0x319584(0x25a)](_0x22a0df,_0x22a0df);break;case 0x4:this[_0x319584(0x25a)](-_0x22a0df,0x0);break;case 0x6:this[_0x319584(0x25a)](_0x22a0df,0x0);break;case 0x7:this['jump'](-_0x22a0df,-_0x22a0df);break;case 0x8:this[_0x319584(0x25a)](0x0,-_0x22a0df);break;case 0x9:this[_0x319584(0x25a)](_0x22a0df,-_0x22a0df);break;}},Game_Character['prototype'][_0x37ae6a(0x3dc)]=function(_0x5e4330,_0x2837dd){const _0x50ebd7=_0x37ae6a,_0x38bcd0=Math['round'](_0x5e4330-this['x']),_0x4fe113=Math[_0x50ebd7(0x647)](_0x2837dd-this['y']);this[_0x50ebd7(0x25a)](_0x38bcd0,_0x4fe113);},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x41a)]=function(_0x22d460){const _0x4abd6a=_0x37ae6a;if(_0x22d460)this[_0x4abd6a(0x3dc)](_0x22d460['x'],_0x22d460['y']);},Game_Character['prototype']['processMoveRouteStepTo']=function(_0x39a8ee,_0x13fa44,_0x126d34){const _0x497bea=_0x37ae6a;let _0x26c679=0x0;if(_0x126d34)$gameTemp[_0x497bea(0x5d8)]=!![];$gameMap[_0x497bea(0x3e7)]()?_0x497bea(0x5a8)!==_0x497bea(0x5a8)?this[_0x497bea(0x22e)][_0x497bea(0x5f4)]=_0x601a4f(_0x4cf9c5['$1']):_0x26c679=this['findDiagonalDirectionTo'](_0x39a8ee,_0x13fa44):_0x26c679=this[_0x497bea(0x28d)](_0x39a8ee,_0x13fa44);if(_0x126d34)$gameTemp['_moveAllowPlayerCollision']=![];this[_0x497bea(0x47c)](_0x26c679),this[_0x497bea(0x385)](!![]);},Game_Character[_0x37ae6a(0x3a7)]['processMoveRouteStepToCharacter']=function(_0x5531af){const _0x5619d7=_0x37ae6a;if(_0x5531af)this[_0x5619d7(0x54d)](_0x5531af['x'],_0x5531af['y']);},Game_Character[_0x37ae6a(0x3a7)]['processMoveRouteStepFrom']=function(_0x3cb18c,_0x33a973){const _0x3ff56c=_0x37ae6a,_0x25687b=this[_0x3ff56c(0x3b8)](_0x3cb18c),_0x50d3b8=this['deltaYFrom'](_0x33a973);},Game_Character['prototype']['checkCollisionKeywords']=function(_0x1db8ae){const _0x3ef5b6=_0x37ae6a;if(_0x1db8ae[_0x3ef5b6(0x6b7)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else{if(_0x1db8ae[_0x3ef5b6(0x6b7)](/(?:AVOID|EVADE|DODGE)/i)){if(_0x3ef5b6(0x497)!==_0x3ef5b6(0x497))_0x37b58f=_0x145620['makeDeepCopy'](_0x24a1e2),_0x105b07[_0x3ef5b6(0x4de)][_0x3ef5b6(0x235)]['call'](this,_0x4399fc);else return![];}else return![];}},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x2ce)]=Game_Event[_0x37ae6a(0x3a7)]['isCollidedWithPlayerCharacters'],Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x4a8)]=function(_0x13678c,_0x227d4b){const _0x4e3760=_0x37ae6a;if($gameTemp[_0x4e3760(0x5d8)])return![];return VisuMZ['EventsMoveCore']['Game_Event_isCollidedWithPlayerCharacters'][_0x4e3760(0x609)](this,_0x13678c,_0x227d4b);},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x51b)]=function(_0x199418,_0x50faf3){const _0x58e3cb=_0x37ae6a,_0x5cb64b=['','LOWER\x20LEFT','DOWN','LOWER\x20RIGHT',_0x58e3cb(0x645),'',_0x58e3cb(0x2df),_0x58e3cb(0x4aa),'UP',_0x58e3cb(0x692)],_0x289470=_0x5cb64b[_0x58e3cb(0x413)](_0x199418['toUpperCase']()['trim']());if(_0x289470<=0x0)return;if(_0x50faf3)$gameTemp[_0x58e3cb(0x5d8)]=!![];if(this[_0x58e3cb(0x30c)](this['x'],this['y'],_0x289470)){if('cJZqY'==='HsHhx'){const _0xcf709d=_0x238f67[_0x58e3cb(0x4de)][_0x58e3cb(0x5d7)][_0x58e3cb(0x609)](this),_0x296fc9=_0x435f75[_0x58e3cb(0x4de)][_0x58e3cb(0x552)][_0x58e3cb(0x415)]['map'](_0xf99d62=>_0xbb44a4[_0xf99d62]);return _0xcf709d['concat'](_0x296fc9)[_0x58e3cb(0x208)]((_0x38cead,_0x5c4180,_0x170ce3)=>_0x170ce3[_0x58e3cb(0x413)](_0x38cead)===_0x5c4180);}else{if(_0x50faf3)$gameTemp[_0x58e3cb(0x5d8)]=![];this[_0x58e3cb(0x47c)](_0x289470),this[_0x58e3cb(0x5f9)]-=0x1;}}if(_0x50faf3)$gameTemp[_0x58e3cb(0x5d8)]=![];},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x5dd)]=function(_0x2199d1,_0x335b4b,_0x793c54){const _0x260bd3=_0x37ae6a;this['processMoveRouteStepTo'](_0x2199d1,_0x335b4b,_0x793c54);if(this['x']!==_0x2199d1||this['y']!==_0x335b4b)this[_0x260bd3(0x5f9)]--;},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x410)]=function(_0x2618a7,_0x3f43a0){const _0x57fdaf=_0x37ae6a;if(_0x2618a7&&!_0x2618a7['_erased']){this[_0x57fdaf(0x5dd)](_0x2618a7['x'],_0x2618a7['y'],_0x3f43a0);if(_0x2618a7[_0x57fdaf(0x451)]()&&this[_0x57fdaf(0x451)]()){if('Cupqc'!==_0x57fdaf(0x4c5)){const _0x55a852=$gameMap[_0x57fdaf(0x6ae)](this['x'],this['y'],_0x2618a7['x'],_0x2618a7['y']);if(_0x55a852<=0x1)this[_0x57fdaf(0x5f9)]++;}else this[_0x57fdaf(0x21b)]=0x0;}}},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x3ae)]=function(_0x538a17,_0x13e9d3){const _0x3637ac=_0x37ae6a;_0x13e9d3=_0x13e9d3||0x0;const _0x337e94={'code':0x1,'indent':null,'parameters':[]};_0x337e94[_0x3637ac(0x4cd)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x538a17],this[_0x3637ac(0x397)][_0x3637ac(0x1e6)][this['_moveRouteIndex']]['parameters'][0x0]='';while(_0x13e9d3--){this[_0x3637ac(0x397)][_0x3637ac(0x1e6)][_0x3637ac(0x524)](this[_0x3637ac(0x5f9)]+0x1,0x0,_0x337e94);}},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x256)]=function(_0x486977){const _0x44899d=_0x37ae6a;this[_0x44899d(0x4b6)]=!![],this['setPattern'](_0x486977);},Game_Character['prototype'][_0x37ae6a(0x627)]=function(_0x1d89e3,_0x43ee45){const _0x5bad5a=_0x37ae6a;if(this===$gamePlayer)return;const _0x132a51=[this[_0x5bad5a(0x58e)],this[_0x5bad5a(0x269)],'A'];_0x1d89e3[_0x5bad5a(0x6b7)](/\b[ABCD]\b/i)?_0x132a51[0x2]=String(_0x1d89e3)[_0x5bad5a(0x6a6)](0x0)['toUpperCase']()['trim']():_0x5bad5a(0x391)===_0x5bad5a(0x391)?_0x132a51[0x2]=_0x5bad5a(0x592)[_0x5bad5a(0x51a)](_0x1d89e3):this[_0x5bad5a(0x69a)]();switch(_0x43ee45[_0x5bad5a(0x5cf)]()['trim']()){case'ON':case'TRUE':$gameSelfSwitches['setValue'](_0x132a51,!![]);break;case'OFF':case _0x5bad5a(0x1d4):$gameSelfSwitches[_0x5bad5a(0x2b2)](_0x132a51,![]);break;case'TOGGLE':$gameSelfSwitches[_0x5bad5a(0x2b2)](_0x132a51,!$gameSelfSwitches[_0x5bad5a(0x3b7)](_0x132a51));break;}},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x267)]=function(_0x179ab8,_0xb29833){const _0x423d97=_0x37ae6a;if(this===$gamePlayer)return;const _0x4848dd=[this['_mapId'],this[_0x423d97(0x269)],_0x423d97(0x2ee)[_0x423d97(0x51a)](_0x179ab8)];$gameSelfSwitches['setValue'](_0x4848dd,Number(_0xb29833));},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x261)]=function(_0x8835e8,_0x293dc2){const _0x1a9386=_0x37ae6a;this[_0x1a9386(0x3b5)](_0x8835e8,_0x293dc2);},Game_Character[_0x37ae6a(0x3a7)]['processMoveRouteTeleportToCharacter']=function(_0x163ae8){const _0x5bc00e=_0x37ae6a;if(_0x163ae8)this[_0x5bc00e(0x261)](_0x163ae8['x'],_0x163ae8['y']);},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x6f6)]=function(){const _0x278b84=_0x37ae6a;switch(this[_0x278b84(0x293)]()){case 0x1:this[_0x278b84(0x349)](0x7);break;case 0x2:this[_0x278b84(0x349)](0x4);break;case 0x3:this[_0x278b84(0x349)](0x1);break;case 0x4:this[_0x278b84(0x349)](0x8);break;case 0x6:this[_0x278b84(0x349)](0x2);break;case 0x7:this[_0x278b84(0x349)](0x9);break;case 0x8:this[_0x278b84(0x349)](0x6);break;case 0x9:this[_0x278b84(0x349)](0x3);break;}},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x50d)]=function(){const _0x348d88=_0x37ae6a;switch(this['direction']()){case 0x1:this[_0x348d88(0x349)](0x3);break;case 0x2:this[_0x348d88(0x349)](0x6);break;case 0x3:this['setDirection'](0x9);break;case 0x4:this[_0x348d88(0x349)](0x2);break;case 0x6:this[_0x348d88(0x349)](0x8);break;case 0x7:this[_0x348d88(0x349)](0x1);break;case 0x8:this['setDirection'](0x4);break;case 0x9:this[_0x348d88(0x349)](0x7);break;}},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x440)]=function(_0x48041f,_0x2b7b3a,_0x560fbe){const _0x2d8bd7=_0x37ae6a,_0x3bfe08=this[_0x2d8bd7(0x3b8)](_0x48041f),_0x5b4d3e=this[_0x2d8bd7(0x562)](_0x2b7b3a);if($gameMap[_0x2d8bd7(0x3e7)]()){if(_0x2d8bd7(0x248)!=='UiNPb'){if(_0x560fbe||this['isSpriteVS8dir']()){if(_0x3bfe08>0x0&&_0x5b4d3e<0x0)return 0x1;if(_0x3bfe08<0x0&&_0x5b4d3e<0x0)return 0x3;if(_0x3bfe08>0x0&&_0x5b4d3e>0x0)return 0x7;if(_0x3bfe08<0x0&&_0x5b4d3e>0x0)return 0x9;}}else return _0x508e09[_0x2d8bd7(0x4de)][_0x2d8bd7(0x552)][_0x2d8bd7(0x5bc)](_0x376035[_0x2d8bd7(0x438)],0x0);}if(Math[_0x2d8bd7(0x3f4)](_0x3bfe08)>Math[_0x2d8bd7(0x3f4)](_0x5b4d3e)){if(_0x2d8bd7(0x2bc)!==_0x2d8bd7(0x398))return _0x3bfe08>0x0?0x4:0x6;else _0x163a01=_0x3a443f['replace'](_0x23d274,(_0x3b1e74,_0x13703b)=>_0x4225bd[_0x2d8bd7(0x3b7)](_0x196bf9(_0x13703b)));}else{if(_0x5b4d3e!==0x0)return _0x2d8bd7(0x6fb)!==_0x2d8bd7(0x5d1)?_0x5b4d3e>0x0?0x8:0x2:this[_0x2d8bd7(0x3b3)](_0x1743a2(_0x42d8b2['$1']));}return 0x0;},Game_Character['prototype'][_0x37ae6a(0x339)]=function(_0x381666,_0x45434a,_0x2a8db6){const _0xc9535a=_0x37ae6a,_0x411301=this[_0xc9535a(0x3b8)](_0x381666),_0x32ba50=this[_0xc9535a(0x562)](_0x45434a);if($gameMap['isSupportDiagonalMovement']()){if(_0x2a8db6||this[_0xc9535a(0x390)]()){if(_0x411301>0x0&&_0x32ba50<0x0)return 0x9;if(_0x411301<0x0&&_0x32ba50<0x0)return 0x7;if(_0x411301>0x0&&_0x32ba50>0x0)return 0x3;if(_0x411301<0x0&&_0x32ba50>0x0)return 0x1;}}if(Math[_0xc9535a(0x3f4)](_0x411301)>Math[_0xc9535a(0x3f4)](_0x32ba50))return _0x411301>0x0?0x6:0x4;else{if(_0x32ba50!==0x0)return _0x32ba50>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x60c)]=function(_0x514c3e,_0x4cba12){const _0x390400=_0x37ae6a,_0x201c77=this[_0x390400(0x440)](_0x514c3e,_0x4cba12,!![]);if(_0x201c77)this[_0x390400(0x47c)](_0x201c77);},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x32d)]=function(_0x4791d8,_0x20bf30){const _0x1ede67=_0x37ae6a,_0x3f45fb=this[_0x1ede67(0x339)](_0x4791d8,_0x20bf30,!![]);if(_0x3f45fb)this[_0x1ede67(0x47c)](_0x3f45fb);},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x6ba)]=function(_0x4b40b1,_0x2fb24a){const _0x5ea943=_0x37ae6a,_0x4c3bea=this[_0x5ea943(0x440)](_0x4b40b1,_0x2fb24a,![]);if(_0x4c3bea)this[_0x5ea943(0x349)](_0x4c3bea);},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x633)]=function(_0x2d0771,_0x6ea53b){const _0x1aaba8=_0x37ae6a,_0x519ed6=this[_0x1aaba8(0x339)](_0x2d0771,_0x6ea53b,![]);if(_0x519ed6)this[_0x1aaba8(0x349)](_0x519ed6);},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x419)]=function(_0x17b9ca){const _0x522cf6=_0x37ae6a;if(_0x17b9ca)this[_0x522cf6(0x60c)](_0x17b9ca['x'],_0x17b9ca['y']);},Game_Character['prototype'][_0x37ae6a(0x3f0)]=function(_0x1aecbc){const _0x4f71e0=_0x37ae6a;if(_0x1aecbc)this[_0x4f71e0(0x32d)](_0x1aecbc['x'],_0x1aecbc['y']);},Game_Character['prototype'][_0x37ae6a(0x5c8)]=function(_0x10a044){if(_0x10a044)this['turnTowardPoint'](_0x10a044['x'],_0x10a044['y']);},Game_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x554)]=function(_0x51f64a){const _0x284ce8=_0x37ae6a;if(_0x51f64a)this[_0x284ce8(0x633)](_0x51f64a['x'],_0x51f64a['y']);},VisuMZ['EventsMoveCore']['Game_Player_isDashing']=Game_Player['prototype'][_0x37ae6a(0x620)],Game_Player[_0x37ae6a(0x3a7)]['isDashing']=function(){const _0x15d119=_0x37ae6a;if(!Game_CharacterBase['ALLOW_LADDER_DASH']&&this[_0x15d119(0x24f)]())return![];if(this[_0x15d119(0x52d)])return!![];return VisuMZ[_0x15d119(0x4de)][_0x15d119(0x5d5)]['call'](this);},VisuMZ['EventsMoveCore']['Game_Player_getInputDirection']=Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x40d)],Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x40d)]=function(){const _0x229bfa=_0x37ae6a;return $gameMap[_0x229bfa(0x3e7)]()?this[_0x229bfa(0x595)]():VisuMZ[_0x229bfa(0x4de)]['Game_Player_getInputDirection']['call'](this);},Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x595)]=function(){return Input['dir8'];},Game_Player['prototype'][_0x37ae6a(0x624)]=function(){const _0x5c2dd2=_0x37ae6a;if($gameSystem[_0x5c2dd2(0x42e)]())return 0x0;if(!this[_0x5c2dd2(0x225)]()&&this[_0x5c2dd2(0x250)]()){let _0x50dd87=this[_0x5c2dd2(0x40d)]();if(_0x50dd87>0x0){if(_0x5c2dd2(0x20e)!=='IeQwj')$gameTemp['clearDestination']();else{_0x166a3f[_0x5c2dd2(0x564)][_0x39d755]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x411c15=_0x5c2dd2(0x236)[_0x5c2dd2(0x51a)](_0x196a3b(_0x22578d['$1']));_0x46484e[_0x5c2dd2(0x378)][_0x209099]=new _0x3d045b('variableId',_0x411c15);}}else{if($gameTemp[_0x5c2dd2(0x48d)]()){if(_0x5c2dd2(0x408)==='BMtNE'){const _0xb1c396=_0x3db26a(_0x5b504a['$1'])[_0x5c2dd2(0x665)]()['trim'](),_0xe72cff=_0x48d05c(_0x53c8bb['$2']);this[_0x5c2dd2(0x2ad)][_0xb1c396]=_0xe72cff;}else{const _0x1a7d97=$gameTemp[_0x5c2dd2(0x37f)](),_0x1400dd=$gameTemp[_0x5c2dd2(0x24b)](),_0x39ea35=$gameMap[_0x5c2dd2(0x3e7)](),_0x2619f9=$gameMap[_0x5c2dd2(0x502)](_0x1a7d97,_0x1400dd),_0x2a8ee9=$gameMap[_0x5c2dd2(0x5fe)](_0x1a7d97,_0x1400dd)[_0x5c2dd2(0x5e5)]<=0x0,_0x193803=TouchInput[_0x5c2dd2(0x3c2)]();_0x39ea35&&_0x2619f9&&_0x2a8ee9&&!_0x193803?_0x5c2dd2(0x6cc)===_0x5c2dd2(0x6cc)?_0x50dd87=this[_0x5c2dd2(0x3d1)](_0x1a7d97,_0x1400dd):(this[_0x5c2dd2(0x3b9)]=_0x3d2d7d,_0x6234b8['prototype'][_0x5c2dd2(0x218)][_0x5c2dd2(0x609)](this),this[_0x5c2dd2(0x55e)](),this[_0x5c2dd2(0x52c)]()):_0x50dd87=this['findDirectionTo'](_0x1a7d97,_0x1400dd);}}}if(_0x50dd87>0x0){this[_0x5c2dd2(0x41d)]=this[_0x5c2dd2(0x41d)]||0x0;if(this['isTurnInPlace']())this[_0x5c2dd2(0x349)](_0x50dd87);else{if(_0x5c2dd2(0x1fe)===_0x5c2dd2(0x24e)){const _0x4d4596=_0x4710bd[_0x5c2dd2(0x4de)][_0x5c2dd2(0x556)][_0x5c2dd2(0x1e5)];if(_0x43cb5b[_0x5c2dd2(0x6b0)]()&&_0x4d4596[_0x5c2dd2(0x65e)])return!![];if(_0x28307e[_0x5c2dd2(0x44b)]()&&_0x4d4596[_0x5c2dd2(0x3dd)])return!![];if(!_0x5bc7d3['isAllowEventAutoMovement']())return!![];if(this[_0x5c2dd2(0x59e)]()>=0x0)return!![];return![];}else this[_0x5c2dd2(0x527)](_0x50dd87);}this[_0x5c2dd2(0x41d)]++;}else this[_0x5c2dd2(0x41d)]=0x0;}},Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x38a)]=function(){const _0xf62588=_0x37ae6a,_0x4307f5=VisuMZ[_0xf62588(0x4de)]['Settings'][_0xf62588(0x1e5)];if(!_0x4307f5[_0xf62588(0x2ff)])return![];if($gameTemp[_0xf62588(0x48d)]())return![];if(this[_0xf62588(0x620)]()||this[_0xf62588(0x225)]()||this[_0xf62588(0x24f)]())return![];return this[_0xf62588(0x41d)]<_0x4307f5[_0xf62588(0x4fa)];},VisuMZ[_0x37ae6a(0x4de)]['Game_Player_executeMove']=Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x527)],Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x527)]=function(_0x5190b0){const _0x19a5e5=_0x37ae6a;$gameMap[_0x19a5e5(0x3e7)]()?this[_0x19a5e5(0x47c)](_0x5190b0):VisuMZ[_0x19a5e5(0x4de)]['Game_Player_executeMove'][_0x19a5e5(0x609)](this,_0x5190b0);},VisuMZ['EventsMoveCore'][_0x37ae6a(0x303)]=Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x66d)],Game_Player[_0x37ae6a(0x3a7)]['isMapPassable']=function(_0x2cf2f8,_0x1fa9d9,_0x4c0dbe){const _0x10c1eb=_0x37ae6a;if($gameMap['isRegionAllowPass'](_0x2cf2f8,_0x1fa9d9,_0x4c0dbe,_0x10c1eb(0x5a0))){if(_0x10c1eb(0x663)!==_0x10c1eb(0x341))return this['isInVehicle']()&&this[_0x10c1eb(0x458)]()?_0x10c1eb(0x472)===_0x10c1eb(0x472)?this[_0x10c1eb(0x458)]()[_0x10c1eb(0x66d)](_0x2cf2f8,_0x1fa9d9,_0x4c0dbe):_0x5cdf8d[_0x10c1eb(0x3ac)]['includes'](_0x525fb4)||_0xe779aa[_0x10c1eb(0x5c3)][_0x10c1eb(0x6db)](_0x33714c):!![];else{const _0x3c0654='%1Forbid'['format'](_0x4d3d89[_0x10c1eb(0x6a6)](0x0)[_0x10c1eb(0x5cf)]()+_0x552729[_0x10c1eb(0x2cb)](0x1));if(_0x1bced1[_0x3c0654])return _0x3dfa9e[_0x3c0654]['includes'](_0x4dda65);}}if($gameMap[_0x10c1eb(0x578)](_0x2cf2f8,_0x1fa9d9,_0x4c0dbe,'player'))return![];return VisuMZ[_0x10c1eb(0x4de)][_0x10c1eb(0x303)]['call'](this,_0x2cf2f8,_0x1fa9d9,_0x4c0dbe);},VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerHere']=Game_Player['prototype'][_0x37ae6a(0x6b8)],Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x6b8)]=function(_0x5dea48){const _0x11498d=_0x37ae6a;VisuMZ[_0x11498d(0x4de)][_0x11498d(0x654)][_0x11498d(0x609)](this,_0x5dea48);if(this[_0x11498d(0x512)]()){this[_0x11498d(0x611)](_0x5dea48);if(_0x5dea48['includes'](0x0)&&this[_0x11498d(0x5dc)]()===_0x11498d(0x469)){if('fxqtj'!==_0x11498d(0x655)){if(_0x284240['switches'][_0x434585][_0x11498d(0x6b7)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x51d532[_0x11498d(0x2ef)][_0x11498d(0x6bf)](_0x3cf755);if(_0x52447c[_0x11498d(0x53f)][_0x12932a][_0x11498d(0x6b7)](/<SELF>/i))_0x3b55c6[_0x11498d(0x5f0)][_0x11498d(0x6bf)](_0x5e8d24);if(_0x3039a7[_0x11498d(0x53f)][_0x53042a][_0x11498d(0x6b7)](/<MAP>/i))_0x1c37f6[_0x11498d(0x42c)][_0x11498d(0x6bf)](_0x140cd4);}else this[_0x11498d(0x2d4)](this['x'],this['y']);}else(_0x5dea48['includes'](0x1)||_0x5dea48[_0x11498d(0x6db)](0x2))&&(_0x11498d(0x50e)===_0x11498d(0x57a)?this[_0x11498d(0x3b9)]['labelWindowText']()!==this[_0x11498d(0x46c)]&&(this[_0x11498d(0x46c)]=this[_0x11498d(0x3b9)][_0x11498d(0x229)](),this['refresh']()):this[_0x11498d(0x41f)]());}},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x220)]=Game_Player[_0x37ae6a(0x3a7)]['checkEventTriggerThere'],Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x412)]=function(_0x2e6ea4){const _0x60ab93=_0x37ae6a;VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerThere'][_0x60ab93(0x609)](this,_0x2e6ea4);if(this[_0x60ab93(0x512)]()&&_0x2e6ea4[_0x60ab93(0x6db)](0x0)&&this[_0x60ab93(0x5dc)]()===_0x60ab93(0x486)){if(_0x60ab93(0x43a)!=='looTZ'){const _0xc851de=this[_0x60ab93(0x293)](),_0x45b228=$gameMap['roundXWithDirection'](this['x'],_0xc851de),_0xc31caf=$gameMap[_0x60ab93(0x5f6)](this['y'],_0xc851de);this[_0x60ab93(0x2d4)](_0x45b228,_0xc31caf);}else{const _0x3e41ea=this[_0x60ab93(0x237)](this[_0x60ab93(0x46c)]);this[_0x60ab93(0x4eb)]=_0x3e41ea['width']+(_0x30a523[_0x60ab93(0x407)]()+this['itemPadding']())*0x2,this['height']=_0x58f783[_0x60ab93(0x319)](this[_0x60ab93(0x4e7)](),_0x3e41ea['height'])+_0x1d6912[_0x60ab93(0x407)]()*0x2,this[_0x60ab93(0x1d1)]();}}},Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x611)]=function(_0x1ec739){const _0x4e29e9=_0x37ae6a;if($gameMap[_0x4e29e9(0x6b0)]())return;if($gameMap['isAnyEventStarting']())return;const _0x1d4ff5=$gameMap[_0x4e29e9(0x313)]();for(const _0x45066f of _0x1d4ff5){if(!_0x45066f)continue;if(!_0x45066f[_0x4e29e9(0x2d5)](_0x1ec739))continue;if(this[_0x4e29e9(0x5af)](_0x45066f))return _0x45066f[_0x4e29e9(0x480)]();if(this[_0x4e29e9(0x214)](_0x45066f))return _0x45066f['start']();}},Game_Player[_0x37ae6a(0x3a7)]['meetActivationRegionConditions']=function(_0x328a3c){const _0x2eb121=_0x37ae6a;if($gameMap['isEventRunning']())return![];if($gameMap[_0x2eb121(0x3a8)]())return![];return _0x328a3c[_0x2eb121(0x27a)]()[_0x2eb121(0x6db)](this[_0x2eb121(0x37b)]());},Game_Player['prototype']['meetActivationProximityConditions']=function(_0x4a7a1d){const _0x155218=_0x37ae6a;if($gameMap[_0x155218(0x6b0)]())return![];if($gameMap['isAnyEventStarting']())return![];if([_0x155218(0x2f1),_0x155218(0x3f9)][_0x155218(0x6db)](_0x4a7a1d[_0x155218(0x6ec)]()))return![];const _0x37f1ce=_0x4a7a1d[_0x155218(0x6ec)](),_0x4b1feb=_0x4a7a1d[_0x155218(0x231)]();switch(_0x37f1ce){case _0x155218(0x3e6):const _0xc0e820=$gameMap['distance'](this['x'],this['y'],_0x4a7a1d['x'],_0x4a7a1d['y']);return _0x4a7a1d[_0x155218(0x231)]()>=_0xc0e820;break;case _0x155218(0x6e1):return _0x4b1feb>=Math[_0x155218(0x3f4)](_0x4a7a1d[_0x155218(0x3b8)](this['x']))&&_0x4b1feb>=Math[_0x155218(0x3f4)](_0x4a7a1d[_0x155218(0x562)](this['y']));break;case'row':return _0x4b1feb>=Math[_0x155218(0x3f4)](_0x4a7a1d[_0x155218(0x562)](this['y']));break;case _0x155218(0x2b0):return _0x4b1feb>=Math[_0x155218(0x3f4)](_0x4a7a1d[_0x155218(0x3b8)](this['x']));break;case _0x155218(0x632):return![];break;}},Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x2d4)]=function(_0xabcaa5,_0x41f084){const _0x398263=_0x37ae6a;if($gameMap['isEventRunning']())return;if($gameMap[_0x398263(0x3a8)]())return;let _0x23c8d7=VisuMZ['EventsMoveCore']['Settings']['RegionOk'],_0x34cda1=$gameMap[_0x398263(0x37b)](_0xabcaa5,_0x41f084);const _0x113fb3=_0x398263(0x517)[_0x398263(0x51a)](_0x34cda1);if(_0x23c8d7[_0x113fb3]){if('JSYRR'!==_0x398263(0x37a)){const _0x302ac6=_0x3f4b30[_0x398263(0x3a9)](_0x515b7c['EventId']||_0x250aa5[_0x398263(0x6c6)]());_0x302ac6[_0x398263(0x57e)]();}else $gameTemp[_0x398263(0x22d)](_0x23c8d7[_0x113fb3]);}},Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x5dc)]=function(){const _0x3e5d36=_0x37ae6a;return VisuMZ[_0x3e5d36(0x4de)]['Settings']['RegionOkTarget'];},Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x41f)]=function(){const _0x485c9a=_0x37ae6a;if($gameMap[_0x485c9a(0x6b0)]())return;if($gameMap[_0x485c9a(0x3a8)]())return;let _0x326630=VisuMZ['EventsMoveCore'][_0x485c9a(0x556)][_0x485c9a(0x360)];const _0x6dfe12=_0x485c9a(0x517)[_0x485c9a(0x51a)](this[_0x485c9a(0x37b)]());_0x326630[_0x6dfe12]&&$gameTemp['reserveCommonEvent'](_0x326630[_0x6dfe12]);},VisuMZ['EventsMoveCore'][_0x37ae6a(0x2af)]=Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x356)],Game_Player[_0x37ae6a(0x3a7)][_0x37ae6a(0x356)]=function(){const _0x19fa1b=_0x37ae6a;VisuMZ['EventsMoveCore']['Game_Player_increaseSteps']['call'](this),VisuMZ[_0x19fa1b(0x447)](0x0);},VisuMZ[_0x37ae6a(0x4de)]['Game_Follower_initialize']=Game_Follower[_0x37ae6a(0x3a7)][_0x37ae6a(0x218)],Game_Follower['prototype'][_0x37ae6a(0x218)]=function(_0x3b346a){const _0x456d34=_0x37ae6a;VisuMZ['EventsMoveCore'][_0x456d34(0x2c7)][_0x456d34(0x609)](this,_0x3b346a),this[_0x456d34(0x4d8)]=![];},Game_Follower['prototype'][_0x37ae6a(0x620)]=function(){const _0x49bc93=_0x37ae6a;if(this['_chaseOff'])return Game_Character[_0x49bc93(0x3a7)][_0x49bc93(0x620)][_0x49bc93(0x609)](this);return $gamePlayer[_0x49bc93(0x620)]();},Game_Follower[_0x37ae6a(0x3a7)][_0x37ae6a(0x1e4)]=function(){const _0x5c15f4=_0x37ae6a;if(this[_0x5c15f4(0x4d8)])return Game_Character['prototype'][_0x5c15f4(0x1e4)][_0x5c15f4(0x609)](this);return $gamePlayer[_0x5c15f4(0x1e4)]()&&this[_0x5c15f4(0x603)];},Game_Follower['prototype'][_0x37ae6a(0x547)]=function(){const _0x3e5620=_0x37ae6a;return $gamePlayer[_0x3e5620(0x547)]();},Game_Follower[_0x37ae6a(0x3a7)][_0x37ae6a(0x268)]=function(){const _0x3573f0=_0x37ae6a;Game_Character[_0x3573f0(0x3a7)]['updateStop'][_0x3573f0(0x609)](this),this[_0x3573f0(0x5ad)]>0x0&&(_0x3573f0(0x4a1)!==_0x3573f0(0x638)?this[_0x3573f0(0x603)]=![]:this[_0x3573f0(0x22e)][_0x3573f0(0x531)]=_0x40b803(_0x2fa58a['$1']));},Game_Follower['prototype'][_0x37ae6a(0x30e)]=function(_0x3db11b){const _0x6560e1=_0x37ae6a;this[_0x6560e1(0x4d8)]=_0x3db11b;},VisuMZ[_0x37ae6a(0x4de)]['Game_Follower_chaseCharacter']=Game_Follower[_0x37ae6a(0x3a7)][_0x37ae6a(0x324)],Game_Follower['prototype'][_0x37ae6a(0x324)]=function(_0x61e019){const _0x2fb577=_0x37ae6a;if(this[_0x2fb577(0x4d8)])return;if($gameSystem[_0x2fb577(0x3a3)]())return;VisuMZ['EventsMoveCore'][_0x2fb577(0x6cd)][_0x2fb577(0x609)](this,_0x61e019),this['_actuallyMoving']=!![];},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x6f0)]=Game_Vehicle[_0x37ae6a(0x3a7)][_0x37ae6a(0x66d)],Game_Vehicle[_0x37ae6a(0x3a7)][_0x37ae6a(0x66d)]=function(_0x40c2d0,_0xa69eba,_0x27649e){const _0x448103=_0x37ae6a;if($gameMap['isRegionAllowPass'](_0x40c2d0,_0xa69eba,_0x27649e,this[_0x448103(0x59b)]))return!![];if($gameMap[_0x448103(0x578)](_0x40c2d0,_0xa69eba,_0x27649e,this[_0x448103(0x59b)]))return![];return VisuMZ[_0x448103(0x4de)][_0x448103(0x6f0)]['call'](this,_0x40c2d0,_0xa69eba,_0x27649e);},Game_Vehicle['prototype'][_0x37ae6a(0x473)]=function(_0x73aeb2,_0x543f46,_0x5f0c23){const _0x2b9a3a=_0x37ae6a;if($gameMap[_0x2b9a3a(0x2f9)](_0x73aeb2,_0x543f46,_0x5f0c23,this[_0x2b9a3a(0x59b)]))return!![];if($gameMap[_0x2b9a3a(0x578)](_0x73aeb2,_0x543f46,_0x5f0c23,this[_0x2b9a3a(0x59b)]))return![];return VisuMZ['EventsMoveCore'][_0x2b9a3a(0x67e)]['call']($gamePlayer,_0x73aeb2,_0x543f46,_0x5f0c23);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x429)]=Game_Vehicle[_0x37ae6a(0x3a7)][_0x37ae6a(0x5a4)],Game_Vehicle[_0x37ae6a(0x3a7)][_0x37ae6a(0x5a4)]=function(_0x33d94a,_0x47d402,_0x48a938){const _0x5a8b95=_0x37ae6a;if($gameMap[_0x5a8b95(0x573)](_0x33d94a,_0x47d402,_0x48a938,this['_type']))return!![];const _0x1d696c=this[_0x5a8b95(0x59b)]['charAt'](0x0)[_0x5a8b95(0x5cf)]()+this[_0x5a8b95(0x59b)][_0x5a8b95(0x2cb)](0x1),_0x479be1=_0x5a8b95(0x4e6)[_0x5a8b95(0x51a)](_0x1d696c);return VisuMZ[_0x5a8b95(0x4de)]['Settings'][_0x5a8b95(0x3eb)][_0x479be1]?![]:VisuMZ['EventsMoveCore'][_0x5a8b95(0x429)][_0x5a8b95(0x609)](this,_0x33d94a,_0x47d402,_0x48a938);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x62e)]=Game_Vehicle[_0x37ae6a(0x3a7)][_0x37ae6a(0x2d2)],Game_Vehicle[_0x37ae6a(0x3a7)][_0x37ae6a(0x2d2)]=function(){const _0x9b1c21=_0x37ae6a;VisuMZ['EventsMoveCore'][_0x9b1c21(0x62e)][_0x9b1c21(0x609)](this);const _0x318f2e=VisuMZ[_0x9b1c21(0x4de)][_0x9b1c21(0x556)][_0x9b1c21(0x1e5)];if(this['isBoat']()){if(_0x318f2e[_0x9b1c21(0x20a)])this[_0x9b1c21(0x4b8)](_0x318f2e[_0x9b1c21(0x20a)]);}else{if(this[_0x9b1c21(0x644)]()){if(_0x9b1c21(0x263)!==_0x9b1c21(0x263)){const _0x2cdeef=_0x5357b6[_0x9b1c21(0x4de)][_0x9b1c21(0x556)][_0x9b1c21(0x1e5)];if(!_0x2cdeef[_0x9b1c21(0x6c3)])return _0x598100;return[0x1,0x3,0x7,0x9]['includes'](this[_0x9b1c21(0x322)])&&(_0x143db*=_0x2cdeef['DiagonalSpeedMultiplier']||0.01),_0x317a1f;}else{if(_0x318f2e[_0x9b1c21(0x30f)])this[_0x9b1c21(0x4b8)](_0x318f2e[_0x9b1c21(0x30f)]);}}else{if(this[_0x9b1c21(0x546)]()){if(_0x318f2e[_0x9b1c21(0x2b8)])this[_0x9b1c21(0x4b8)](_0x318f2e['AirshipSpeed']);}}}},VisuMZ[_0x37ae6a(0x4de)]['Game_Event_initialize']=Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x218)],Game_Event['prototype'][_0x37ae6a(0x218)]=function(_0x5be1f8,_0x4ee8e2){const _0x3fb436=_0x37ae6a;VisuMZ['EventsMoveCore'][_0x3fb436(0x3bd)][_0x3fb436(0x609)](this,_0x5be1f8,_0x4ee8e2),this[_0x3fb436(0x21a)](),this[_0x3fb436(0x3ea)](),this['restoreSavedEventPosition']();},Game_Map['prototype'][_0x37ae6a(0x200)]=function(_0x2442f6,_0x2d3b63){const _0x2f57d4=_0x37ae6a;if(_0x2442f6===$gameMap[_0x2f57d4(0x22c)]()){if(_0x2f57d4(0x1d3)!==_0x2f57d4(0x1d3)){const _0x2dcc06=this[_0x2f57d4(0x3a9)](_0x1dfefa);if(_0x2dcc06)_0x2dcc06[_0x2f57d4(0x22f)]();}else return $dataMap[_0x2f57d4(0x313)][_0x2d3b63];}else return VisuMZ[_0x2f57d4(0x4c3)][_0x2442f6][_0x2f57d4(0x313)][_0x2d3b63];},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x669)]=Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x3a9)],Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x3a9)]=function(){const _0x3938d4=_0x37ae6a;if(this['_eventMorphData']!==undefined){const _0x343e4b=this[_0x3938d4(0x4f0)][_0x3938d4(0x22c)],_0x4f9a4b=this[_0x3938d4(0x4f0)][_0x3938d4(0x6c6)];return $gameMap[_0x3938d4(0x200)](_0x343e4b,_0x4f9a4b);}if(this[_0x3938d4(0x2e7)]!==undefined){const _0x5b6b0e=this[_0x3938d4(0x2e7)]['mapId'],_0x27fcb9=this[_0x3938d4(0x2e7)][_0x3938d4(0x6c6)];return $gameMap['referEvent'](_0x5b6b0e,_0x27fcb9);}if(this['_eventSpawnData']!==undefined){const _0x225a02=this[_0x3938d4(0x57f)][_0x3938d4(0x22c)],_0x4db3dd=this['_eventSpawnData'][_0x3938d4(0x6c6)];return $gameMap[_0x3938d4(0x200)](_0x225a02,_0x4db3dd);}if($gameTemp[_0x3938d4(0x652)]!==undefined){const _0x38ee61=$gameTemp[_0x3938d4(0x652)][_0x3938d4(0x22c)],_0x58c2f0=$gameTemp['_spawnData'][_0x3938d4(0x6c6)];return $gameMap['referEvent'](_0x38ee61,_0x58c2f0);}return VisuMZ[_0x3938d4(0x4de)]['Game_Event_event']['call'](this);},Game_Event['prototype'][_0x37ae6a(0x3bf)]=function(_0x2f11c1,_0x1a52de){const _0xc29e0a=_0x37ae6a;if(_0x2f11c1===0x0||_0x1a52de===0x0)return![];if(_0x2f11c1===$gameMap[_0xc29e0a(0x22c)]())return!![];if(!VisuMZ[_0xc29e0a(0x4c3)][_0x2f11c1]&&_0x2f11c1!==$gameMap['mapId']())return $gameTemp['isPlaytest']()&&console[_0xc29e0a(0x2b9)](_0xc29e0a(0x533)[_0xc29e0a(0x51a)](_0x2f11c1)),![];return!![];},VisuMZ['EventsMoveCore'][_0x37ae6a(0x549)]=Game_Event['prototype'][_0x37ae6a(0x480)],Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x480)]=function(){const _0x33f051=_0x37ae6a;VisuMZ[_0x33f051(0x4de)][_0x33f051(0x549)][_0x33f051(0x609)](this),Imported[_0x33f051(0x514)]&&Input[_0x33f051(0x3c2)](VisuMZ[_0x33f051(0x509)][_0x33f051(0x556)]['General'][_0x33f051(0x38e)])&&Input['clear']();},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x21a)]=function(){const _0x152f6a=_0x37ae6a,_0x3e0c81=this['event']()[_0x152f6a(0x616)];if(_0x3e0c81==='')return;if(DataManager[_0x152f6a(0x226)]()||DataManager['isEventTest']())return;const _0x18c777=VisuMZ[_0x152f6a(0x4de)]['Settings'][_0x152f6a(0x5d9)];let _0x4bccd2=null,_0x49ef5e=0x0,_0x410118=0x0;if(_0x3e0c81[_0x152f6a(0x6b7)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x49ef5e=Number(RegExp['$1']),_0x410118=Number(RegExp['$2']);if(_0x49ef5e===0x0)_0x49ef5e=$gameMap[_0x152f6a(0x22c)]();}else{if(_0x3e0c81[_0x152f6a(0x6b7)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x49ef5e=Number(RegExp['$1']),_0x410118=Number(RegExp['$2']);if(_0x49ef5e===0x0)_0x49ef5e=$gameMap['mapId']();}else{if(_0x3e0c81[_0x152f6a(0x6b7)](/<COPY EVENT:[ ](.*?)>/i)){const _0x1001d5=String(RegExp['$1'])[_0x152f6a(0x5cf)]()[_0x152f6a(0x519)]();_0x4bccd2=VisuMZ[_0x152f6a(0x6c5)][_0x1001d5];if(!_0x4bccd2)return;_0x49ef5e=_0x4bccd2[_0x152f6a(0x266)],_0x410118=_0x4bccd2[_0x152f6a(0x35c)];}}}if(!this[_0x152f6a(0x3bf)](_0x49ef5e,_0x410118))return;_0x18c777[_0x152f6a(0x1e1)]['call'](this,_0x49ef5e,_0x410118,this);if(_0x4bccd2)_0x4bccd2[_0x152f6a(0x1e1)]['call'](this,_0x49ef5e,_0x410118,this);this[_0x152f6a(0x2e7)]={'mapId':_0x49ef5e,'eventId':_0x410118},this['_pageIndex']=-0x2,this[_0x152f6a(0x63f)](),_0x18c777['PostCopyJS'][_0x152f6a(0x609)](this,_0x49ef5e,_0x410118,this);if(_0x4bccd2)_0x4bccd2[_0x152f6a(0x4e3)]['call'](this,_0x49ef5e,_0x410118,this);$gameMap['clearEventCache']();},Game_Event[_0x37ae6a(0x3a7)]['setupMorphEvent']=function(){const _0xbf7f26=_0x37ae6a,_0x42cc00=$gameSystem['getPreservedMorphEventData'](this);if(!_0x42cc00)return;const _0x587021=_0x42cc00[_0xbf7f26(0x4d2)][_0xbf7f26(0x5cf)]()[_0xbf7f26(0x519)]();_0x587021!==_0xbf7f26(0x421)?_0xbf7f26(0x5c4)!==_0xbf7f26(0x5c4)?_0x16cbe1=this['findDirectionTo'](_0x19c26c,_0x331ff5):this[_0xbf7f26(0x4a4)](_0x587021,!![]):this[_0xbf7f26(0x5de)](_0x42cc00['mapId'],_0x42cc00['eventId'],!![]);},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x5de)]=function(_0x508371,_0x441f4e,_0x29a987){const _0x27e66d=_0x37ae6a;if(!this[_0x27e66d(0x3bf)](_0x508371,_0x441f4e))return;const _0x3b6547=VisuMZ[_0x27e66d(0x4de)][_0x27e66d(0x556)][_0x27e66d(0x5d9)];if(!_0x29a987)_0x3b6547[_0x27e66d(0x6bb)][_0x27e66d(0x609)](this,_0x508371,_0x441f4e,this);this[_0x27e66d(0x4f0)]={'mapId':_0x508371,'eventId':_0x441f4e},this[_0x27e66d(0x1e8)]=-0x2,this[_0x27e66d(0x63f)]();if(!_0x29a987)_0x3b6547[_0x27e66d(0x31d)][_0x27e66d(0x609)](this,_0x508371,_0x441f4e,this);$gameMap[_0x27e66d(0x6e2)]();},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x4a4)]=function(_0x567a85,_0x1fcb26){const _0x44cb2c=_0x37ae6a;_0x567a85=_0x567a85[_0x44cb2c(0x5cf)]()['trim']();const _0x5b1844=VisuMZ[_0x44cb2c(0x6c5)][_0x567a85];if(!_0x5b1844)return;const _0x44114a=_0x5b1844[_0x44cb2c(0x266)],_0x226ea9=_0x5b1844[_0x44cb2c(0x35c)];if(!this[_0x44cb2c(0x3bf)](_0x44114a,_0x226ea9))return;if(!_0x1fcb26)_0x5b1844[_0x44cb2c(0x6bb)][_0x44cb2c(0x609)](this,_0x44114a,_0x226ea9,this);this[_0x44cb2c(0x5de)](_0x44114a,_0x226ea9,_0x1fcb26);if(!_0x1fcb26)_0x5b1844[_0x44cb2c(0x31d)]['call'](this,_0x44114a,_0x226ea9,this);if($gameMap)$gameMap[_0x44cb2c(0x6e2)]();},Game_Event['prototype']['removeMorph']=function(){const _0x923742=_0x37ae6a;this['_eventMorphData']=undefined,this[_0x923742(0x1e8)]=-0x2,this[_0x923742(0x63f)]();},Game_Event[_0x37ae6a(0x3a7)]['setupSpawn']=function(_0x3109a8){const _0x15a33f=_0x37ae6a,_0x50181f=VisuMZ[_0x15a33f(0x4de)][_0x15a33f(0x556)][_0x15a33f(0x5d9)],_0xcbd0a9=_0x3109a8[_0x15a33f(0x4d2)][_0x15a33f(0x5cf)]()[_0x15a33f(0x519)](),_0x564d9f=!['',_0x15a33f(0x421)][_0x15a33f(0x6db)](_0xcbd0a9);let _0x484a93=0x0,_0x3dacf2=0x0;if(_0x564d9f){if(_0x15a33f(0x3af)===_0x15a33f(0x3af)){const _0x4d773f=VisuMZ[_0x15a33f(0x6c5)][_0xcbd0a9];if(!_0x4d773f)return;_0x484a93=_0x4d773f['MapID'],_0x3dacf2=_0x4d773f[_0x15a33f(0x35c)];}else{let _0x1d939d=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x15a33f(0x51a)](_0x521675,_0x2d955d)];return _0x4c86b6[_0x15a33f(0x3b7)](_0x1d939d);}}else _0x484a93=_0x3109a8[_0x15a33f(0x22c)],_0x3dacf2=_0x3109a8[_0x15a33f(0x6c6)];if(!this[_0x15a33f(0x3bf)](_0x484a93,_0x3dacf2))return;if(_0x564d9f){if(_0x15a33f(0x1f3)===_0x15a33f(0x1f3)){const _0x592d81=VisuMZ[_0x15a33f(0x6c5)][_0xcbd0a9];_0x592d81[_0x15a33f(0x585)][_0x15a33f(0x609)](this,_0x484a93,_0x3dacf2,this);}else{if(this[_0x15a33f(0x31f)][_0x15a33f(0x223)]()!=='')return![];}}_0x50181f[_0x15a33f(0x585)]['call'](this,_0x484a93,_0x3dacf2,this),this[_0x15a33f(0x57f)]=_0x3109a8,this[_0x15a33f(0x1e8)]=-0x2,this['_mapId']=$gameMap[_0x15a33f(0x22c)](),this[_0x15a33f(0x269)]=_0x3109a8[_0x15a33f(0x2cd)],this['_spawnPreserved']=_0x3109a8[_0x15a33f(0x490)],this[_0x15a33f(0x3b5)](_0x3109a8['x'],_0x3109a8['y']),this[_0x15a33f(0x349)](_0x3109a8[_0x15a33f(0x293)]),this[_0x15a33f(0x63f)]();if(_0x564d9f){if(_0x15a33f(0x53c)!==_0x15a33f(0x53c)){if(!this[_0x15a33f(0x30c)](this['_x'],this['_y'],_0x2586ac))return this['moveStraight'](_0x4315be);if(!this['canPass'](this['_x'],this['_y'],_0x447fd6))return this[_0x15a33f(0x631)](_0x22fd53);if(!this[_0x15a33f(0x48f)](this['_x'],this['_y'],_0x952841,_0x54afcc)){let _0x55c86c=_0x3ed4dc['EventsMoveCore'][_0x15a33f(0x556)]['Movement']['FavorHorz']?_0x2df009:_0x1116d3;return this[_0x15a33f(0x631)](_0x55c86c);}}else{const _0x738b5c=VisuMZ[_0x15a33f(0x6c5)][_0xcbd0a9];if(!_0x738b5c)return;_0x738b5c[_0x15a33f(0x6eb)]['call'](this,_0x484a93,_0x3dacf2,this);}}_0x50181f[_0x15a33f(0x6eb)]['call'](this,_0x484a93,_0x3dacf2,this);const _0x482540=SceneManager[_0x15a33f(0x688)];if(_0x482540&&_0x482540[_0x15a33f(0x658)])_0x482540[_0x15a33f(0x658)]['createSpawnedEvent'](this);},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x2de)]=function(){const _0x5e3ada=_0x37ae6a;return!!this[_0x5e3ada(0x57f)];},Game_Event[_0x37ae6a(0x3a7)]['start']=function(){const _0x472689=_0x37ae6a;if(!this[_0x472689(0x1e6)]())return;const _0xea791c=this[_0x472689(0x1e6)]()[_0x472689(0x208)](_0x38ec2f=>_0x38ec2f[_0x472689(0x4cd)]!==0x6c&&_0x38ec2f[_0x472689(0x4cd)]!==0x198);if(_0xea791c[_0x472689(0x5e5)]>0x1){this[_0x472689(0x3ec)]=!![];if(this[_0x472689(0x2d5)]([0x0,0x1,0x2])){if(_0x472689(0x494)===_0x472689(0x4b0))return _0x5d6118[_0x472689(0x4b7)]()&&_0x5205d5['log'](_0x472689(0x533)['format'](_0x19a5f1)),![];else this[_0x472689(0x69a)]();}}},VisuMZ[_0x37ae6a(0x4de)]['Game_Event_clearPageSettings']=Game_Event['prototype'][_0x37ae6a(0x454)],Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x454)]=function(){const _0x1c5690=_0x37ae6a;VisuMZ[_0x1c5690(0x4de)][_0x1c5690(0x298)][_0x1c5690(0x609)](this),this[_0x1c5690(0x442)](),this[_0x1c5690(0x4f9)]();},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x3a2)]=Game_Event['prototype']['setupPageSettings'],Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x201)]=function(){const _0x1285d2=_0x37ae6a;this[_0x1285d2(0x5be)]=!![],VisuMZ[_0x1285d2(0x4de)][_0x1285d2(0x3a2)][_0x1285d2(0x609)](this),this[_0x1285d2(0x2a2)](),this['autosaveEventLocation'](),this['_activationProximityAutoTriggerBypass']=![];},Game_Event['prototype'][_0x37ae6a(0x2a2)]=function(){const _0x45337d=_0x37ae6a;if(!this['event']())return;this[_0x45337d(0x442)](),this[_0x45337d(0x22a)](),this[_0x45337d(0x31c)](),this['updateEventsMoveCoreTagChanges']();},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x22a)]=function(){const _0x33b842=_0x37ae6a,_0x25254=this[_0x33b842(0x3a9)]()[_0x33b842(0x616)];if(_0x25254==='')return;this[_0x33b842(0x420)](_0x25254);},Game_Event['prototype']['setupEventsMoveCoreCommentTags']=function(){const _0x40d5de=_0x37ae6a;if(!this['page']())return;const _0xf44fb7=this[_0x40d5de(0x1e6)]();let _0x3301c2='';for(const _0x13f293 of _0xf44fb7){if([0x6c,0x198][_0x40d5de(0x6db)](_0x13f293[_0x40d5de(0x4cd)])){if(_0x40d5de(0x61a)!=='lzmPH')return this[_0x40d5de(0x2bd)](_0x18009e);else{if(_0x3301c2!=='')_0x3301c2+='\x0a';_0x3301c2+=_0x13f293[_0x40d5de(0x466)][0x0];}}}this[_0x40d5de(0x420)](_0x3301c2);},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x442)]=function(){const _0xe75be0=_0x37ae6a,_0x9cd894=VisuMZ[_0xe75be0(0x4de)]['Settings'];this[_0xe75be0(0x3a4)]={'type':_0xe75be0(0x2f1),'distance':0x0,'regionList':[]},this[_0xe75be0(0x59c)]=![],this[_0xe75be0(0x336)](),this[_0xe75be0(0x24a)]=![],this[_0xe75be0(0x1e2)]=![],this['_addedHitbox']={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0xe75be0(0x49f)]=$gameSystem[_0xe75be0(0x4a5)](this),this[_0xe75be0(0x209)]={'text':'','visibleRange':_0x9cd894[_0xe75be0(0x613)][_0xe75be0(0x686)],'offsetX':_0x9cd894[_0xe75be0(0x613)][_0xe75be0(0x213)],'offsetY':_0x9cd894[_0xe75be0(0x613)][_0xe75be0(0x572)]},this[_0xe75be0(0x2eb)]=![],this[_0xe75be0(0x3b4)]=[],this[_0xe75be0(0x22e)]={'target':-0x1,'type':_0xe75be0(0x40e),'delay':0x1,'opacityDelta':0x0},this[_0xe75be0(0x21b)]=_0x9cd894[_0xe75be0(0x1e5)][_0xe75be0(0x4b2)]??0x0,this[_0xe75be0(0x3fa)]=![],this[_0xe75be0(0x40c)]={'visible':!![],'filename':_0x9cd894[_0xe75be0(0x1e5)]['DefaultShadow']},this[_0xe75be0(0x38d)](),this[_0xe75be0(0x277)]();},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x420)]=function(_0x49f188){const _0x2ec809=_0x37ae6a;if(_0x49f188[_0x2ec809(0x6b7)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this['_activationProximity'][_0x2ec809(0x240)]=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']'),this[_0x2ec809(0x3a4)][_0x2ec809(0x55d)]=_0x2ec809(0x3f9);else{if(_0x49f188[_0x2ec809(0x6b7)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)){if(_0x2ec809(0x5c1)!==_0x2ec809(0x5c1)){if(!this['_character'])return;if(this['_character'][_0x2ec809(0x1e2)]===_0xf728bc)return;if(this[_0x2ec809(0x31f)][_0x2ec809(0x1e2)]===![])return;this['z']=this[_0x2ec809(0x31f)]['_customZ'],this['z']<0x0?this[_0x2ec809(0x5b0)]['z']=this['z']-0x1:this[_0x2ec809(0x5b0)]['z']=0x0;}else type=String(RegExp['$1'])['toLowerCase']()[_0x2ec809(0x519)](),this[_0x2ec809(0x3a4)]['type']=type,this['_activationProximity'][_0x2ec809(0x6ae)]=Number(RegExp['$2']);}}_0x49f188[_0x2ec809(0x6b7)](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i)&&(this[_0x2ec809(0x5e6)][_0x2ec809(0x5a3)]=String(RegExp['$1']));if(_0x49f188['match'](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)){const _0x258ab8=String(RegExp['$1'])[_0x2ec809(0x5cf)]()['trim'](),_0x5bd289=[_0x2ec809(0x5fd),_0x2ec809(0x6c8),_0x2ec809(0x65c),_0x2ec809(0x5e9)];this[_0x2ec809(0x5e6)][_0x2ec809(0x2f4)]=_0x5bd289[_0x2ec809(0x413)](_0x258ab8)[_0x2ec809(0x4fc)](0x0,0x3);}_0x49f188['match'](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this[_0x2ec809(0x5e6)][_0x2ec809(0x4ff)]=Number(RegExp['$1']));if(_0x49f188[_0x2ec809(0x6b7)](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i)){if('yKefH'===_0x2ec809(0x485))return this[_0x2ec809(0x390)]()&&_0x34cc03[_0x2ec809(0x4de)][_0x2ec809(0x556)]['VS8'][_0x2ec809(0x66c)];else this[_0x2ec809(0x5e6)][_0x2ec809(0x321)]=Number(RegExp['$1']);}if(_0x49f188[_0x2ec809(0x6b7)](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x2ec809(0x5a1)===_0x2ec809(0x5a1))this['_attachPicture'][_0x2ec809(0x3ed)]=Number(RegExp['$1']);else return this[_0x2ec809(0x27d)]==='airship'?this[_0x2ec809(0x458)]()['isAirshipPassable'](_0x5c563c,_0x522ed3,_0x5e4af0):_0x76ede9[_0x2ec809(0x4de)][_0x2ec809(0x67e)][_0x2ec809(0x609)](this,_0x293ded,_0x2f6f31,_0x55d142);}if(_0x49f188[_0x2ec809(0x6b7)](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if('akVeM'==='akVeM')this[_0x2ec809(0x5e6)][_0x2ec809(0x321)]=Number(RegExp['$1']),this['_attachPicture'][_0x2ec809(0x3ed)]=Number(RegExp['$2']);else{const _0x5ed984=_0x5fb4df(_0x22b3e7['$1']);if(_0x5ed984[_0x2ec809(0x6b7)](/PLAYER/i))this[_0x2ec809(0x22e)][_0x2ec809(0x363)]=0x0;else _0x5ed984[_0x2ec809(0x6b7)](/EVENT[ ](\d+)/i)&&(this[_0x2ec809(0x22e)][_0x2ec809(0x363)]=_0x3221a7(_0x4d418a['$1']));}}_0x49f188[_0x2ec809(0x6b7)](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i)&&(this[_0x2ec809(0x5e6)][_0x2ec809(0x676)]=Number(RegExp['$1'])*0.01);_0x49f188['match'](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x2ec809(0x59c)]=!![]);_0x49f188[_0x2ec809(0x6b7)](/<CLICK TRIGGER>/i)&&(this[_0x2ec809(0x24a)]=!![]);_0x49f188[_0x2ec809(0x6b7)](/<CUSTOM Z:[ ](.*?)>/i)&&(this[_0x2ec809(0x1e2)]=Number(RegExp['$1'])||0x0);const _0x41bf62=_0x49f188[_0x2ec809(0x6b7)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x41bf62)for(const _0x49eceb of _0x41bf62){if(_0x49eceb[_0x2ec809(0x6b7)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x2c3d43=String(RegExp['$1'])['toLowerCase']()['trim'](),_0x12c5be=Number(RegExp['$2']);this[_0x2ec809(0x2ad)][_0x2c3d43]=_0x12c5be;}}if(_0x49f188['match'](/<ICON:[ ](\d+)>/i)){if(_0x2ec809(0x20f)!==_0x2ec809(0x6b4))this[_0x2ec809(0x49f)]['iconIndex']=Number(RegExp['$1']);else{if([0x2,0x4,0x6,0x8][_0x2ec809(0x6db)](_0x57a593))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x40491b))return 0x5;}}if(_0x49f188[_0x2ec809(0x6b7)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x2ec809(0x6df)!=='nRmbL')return!![];else this[_0x2ec809(0x49f)][_0x2ec809(0x5e7)]=Number(RegExp['$1']);}if(_0x49f188[_0x2ec809(0x6b7)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x2ec809(0x28b)!==_0x2ec809(0x28b))return!!this[_0x2ec809(0x2bd)](_0x4aa27a);else this[_0x2ec809(0x49f)][_0x2ec809(0x1dd)]=Number(RegExp['$1']);}_0x49f188[_0x2ec809(0x6b7)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&('WjpND'!==_0x2ec809(0x3c5)?(this['_eventIcon'][_0x2ec809(0x5e7)]=Number(RegExp['$1']),this[_0x2ec809(0x49f)]['bufferY']=Number(RegExp['$2'])):this['_labelWindow'][_0x2ec809(0x321)]=_0x21815b(_0xb3cc0e['$1']));if(_0x49f188[_0x2ec809(0x6b7)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x564fd1=String(RegExp['$1'])[_0x2ec809(0x5cf)]()[_0x2ec809(0x519)](),_0x10852c=[_0x2ec809(0x5fd),_0x2ec809(0x6c8),_0x2ec809(0x65c),_0x2ec809(0x5e9)];this['_eventIcon'][_0x2ec809(0x2f4)]=_0x10852c[_0x2ec809(0x413)](_0x564fd1)['clamp'](0x0,0x3);}_0x49f188[_0x2ec809(0x6b7)](/<LABEL:[ ](.*?)>/i)&&(_0x2ec809(0x6c1)!==_0x2ec809(0x2cc)?this[_0x2ec809(0x209)]['text']=String(RegExp['$1'])[_0x2ec809(0x519)]():_0xb47072[_0x2ec809(0x4de)]['Game_Switches_setValue'][_0x2ec809(0x609)](this,_0xfdb2ee,_0x5509c1));_0x49f188['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x2ec809(0x209)][_0x2ec809(0x559)]=String(RegExp['$1'])['trim']());_0x49f188[_0x2ec809(0x6b7)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x2ec809(0x209)][_0x2ec809(0x321)]=Number(RegExp['$1']));_0x49f188[_0x2ec809(0x6b7)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x2ec809(0x209)][_0x2ec809(0x3ed)]=Number(RegExp['$1']));_0x49f188[_0x2ec809(0x6b7)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x2ec809(0x209)][_0x2ec809(0x321)]=Number(RegExp['$1']),this[_0x2ec809(0x209)][_0x2ec809(0x3ed)]=Number(RegExp['$2']));$gameTemp[_0x2ec809(0x4c2)](this);for(;;){if(this['_labelWindow'][_0x2ec809(0x559)][_0x2ec809(0x6b7)](/\\V\[(\d+)\]/gi)){if('XsoPb'==='XsoPb')this[_0x2ec809(0x209)]['text']=this['_labelWindow'][_0x2ec809(0x559)][_0x2ec809(0x4f1)](/\\V\[(\d+)\]/gi,(_0x1914db,_0x5393b6)=>$gameVariables['value'](parseInt(_0x5393b6)));else{if(this[_0x2ec809(0x3a9)]()&&!_0x1b1c49[_0x2ec809(0x4b7)]()){if(this['event']()[_0x2ec809(0x616)][_0x2ec809(0x6b7)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}return this['_advancedSwitchVariable']=![],this[_0x2ec809(0x471)]=![],this['event']()?_0x4ed2b6[_0x2ec809(0x4de)][_0x2ec809(0x693)][_0x2ec809(0x609)](this):-0x1;}}else{if('MGBUy'!==_0x2ec809(0x428)){if(!this[_0x2ec809(0x1e6)]())return;const _0x263730=this[_0x2ec809(0x1e6)]()[_0x2ec809(0x208)](_0x46b55c=>_0x46b55c[_0x2ec809(0x4cd)]!==0x6c&&_0x46b55c[_0x2ec809(0x4cd)]!==0x198);_0x263730[_0x2ec809(0x5e5)]>0x1&&(this['_starting']=!![],this[_0x2ec809(0x2d5)]([0x0,0x1,0x2])&&this[_0x2ec809(0x69a)]());}else break;}}$gameTemp[_0x2ec809(0x5f2)]();if(_0x49f188[_0x2ec809(0x6b7)](/<LABEL RANGE:[ ](\d+)>/i)){if(_0x2ec809(0x551)===_0x2ec809(0x6f8))for(const _0x1bf435 of _0x45fdb6){const _0x3cc4ba='%1%2'['format'](_0x1bf435,_0x251a4e);_0x5809e0[_0x3cc4ba]&&(_0x221cb7[_0x3cc4ba]=_0x2d1cd5[_0x3cc4ba][_0x2ec809(0x2cb)](0x0));}else this[_0x2ec809(0x209)][_0x2ec809(0x698)]=Number(RegExp['$1']);}_0x49f188['match'](/<MIRROR SPRITE>/i)&&(_0x2ec809(0x58f)!==_0x2ec809(0x58f)?_0xb734b6['EventsMoveCore'][_0x2ec809(0x5fb)][_0x2ec809(0x609)](this,_0x5a0596):this[_0x2ec809(0x2eb)]=!![]);if(_0x49f188['match'](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2ec809(0x4b9)===_0x2ec809(0x2d6)){const _0x515dda=_0x335ae4[_0x2ec809(0x2d9)]()||this;if(_0x515dda[_0x2ec809(0x678)]!==_0xc33470)return _0x56f520[_0x2ec809(0x4de)]['Game_Variables_value'][_0x2ec809(0x609)](this,_0x499d52);else{const _0x48e12e=[_0x515dda[_0x2ec809(0x58e)],_0x515dda[_0x2ec809(0x269)],_0x2ec809(0x2ee)[_0x2ec809(0x51a)](_0x55a079)];return _0x3116fc[_0x2ec809(0x3b7)](_0x48e12e);}}else{const _0x554c03=JSON[_0x2ec809(0x3fb)]('['+RegExp['$1'][_0x2ec809(0x6b7)](/\d+/g)+']');this[_0x2ec809(0x3b4)]=this['_moveOnlyRegions'][_0x2ec809(0x6b5)](_0x554c03),this[_0x2ec809(0x3b4)][_0x2ec809(0x3d6)](0x0);}}if(_0x49f188[_0x2ec809(0x6b7)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){if(_0x2ec809(0x2a0)===_0x2ec809(0x3de)){const _0x8433ba=_0x2346e5(_0x37a0e0['$1']),_0x3d1498=_0x12eb67(_0x2cfc24['$2']),_0x41adab=this[_0x2ec809(0x5d3)](_0x30dfc0);return this[_0x2ec809(0x5dd)](_0x8433ba,_0x3d1498,_0x41adab);}else{const _0x591aa8=String(RegExp['$1']);if(_0x591aa8['match'](/PLAYER/i))this[_0x2ec809(0x22e)][_0x2ec809(0x363)]=0x0;else _0x591aa8[_0x2ec809(0x6b7)](/EVENT[ ](\d+)/i)&&(this[_0x2ec809(0x22e)]['target']=Number(RegExp['$1']));}}_0x49f188[_0x2ec809(0x6b7)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(_0x2ec809(0x2ea)!=='tnvHB'?this[_0x2ec809(0x22e)][_0x2ec809(0x55d)]=String(RegExp['$1'])[_0x2ec809(0x665)]()[_0x2ec809(0x519)]():this['setSelfValue'](_0x2a13d1,_0xb93b8a));_0x49f188['match'](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this['_moveSynch']['delay']=Number(RegExp['$1']));_0x49f188[_0x2ec809(0x6b7)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this[_0x2ec809(0x22e)][_0x2ec809(0x531)]=Number(RegExp['$1']));if(_0x49f188['match'](/<TRUE RANDOM MOVE>/i))this['_randomMoveWeight']=0x0;else _0x49f188[_0x2ec809(0x6b7)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x2ec809(0x21b)]=Number(RegExp['$1'])||0x0);_0x49f188['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x2ec809(0x3fa)]=!![]);_0x49f188[_0x2ec809(0x6b7)](/<HIDE SHADOW>/i)&&(this['_shadowGraphic']['visible']=![]);_0x49f188[_0x2ec809(0x6b7)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x2ec809(0x40c)][_0x2ec809(0x5a3)]=String(RegExp['$1']));_0x49f188[_0x2ec809(0x6b7)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x2ec809(0x233)]=Number(RegExp['$1']));if(_0x49f188[_0x2ec809(0x6b7)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)){if('Xusjb'===_0x2ec809(0x3d9)){if(!this[_0x2ec809(0x5b0)])return;this['_shadowSprite']['x']=this[_0x2ec809(0x31f)][_0x2ec809(0x6d9)](),this[_0x2ec809(0x5b0)]['y']=this[_0x2ec809(0x31f)][_0x2ec809(0x27f)](),this[_0x2ec809(0x5b0)][_0x2ec809(0x310)]=this[_0x2ec809(0x310)],this[_0x2ec809(0x5b0)]['visible']=this[_0x2ec809(0x31f)][_0x2ec809(0x41e)](),this['_shadowSprite'][_0x2ec809(0x21f)]=this[_0x2ec809(0x21f)],!this[_0x2ec809(0x31f)][_0x2ec809(0x3e5)]()?(this[_0x2ec809(0x5b0)][_0x2ec809(0x676)]['x']=_0x49cf43[_0x2ec809(0x62f)](0x1,this[_0x2ec809(0x5b0)][_0x2ec809(0x676)]['x']+0.1),this[_0x2ec809(0x5b0)]['scale']['y']=_0x48bee2[_0x2ec809(0x62f)](0x1,this[_0x2ec809(0x5b0)]['scale']['y']+0.1)):(this['_shadowSprite']['scale']['x']=_0x5ba214['max'](0x0,this['_shadowSprite'][_0x2ec809(0x676)]['x']-0.1),this[_0x2ec809(0x5b0)][_0x2ec809(0x676)]['y']=_0x1a3a59[_0x2ec809(0x319)](0x0,this[_0x2ec809(0x5b0)][_0x2ec809(0x676)]['y']-0.1));}else this['_spriteOffsetY']=Number(RegExp['$1']);}if(_0x49f188[_0x2ec809(0x6b7)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x2ec809(0x437)!=='QVULA'){const _0x46632e=_0x2f1dc7[_0x2ec809(0x39a)][_0x2523da[_0x2ec809(0x622)]-0x1][_0x2ec809(0x1e6)];this['setupChild'](_0x46632e,this[_0x2ec809(0x6c6)]());}else this[_0x2ec809(0x233)]=Number(RegExp['$1']),this['_spriteOffsetY']=Number(RegExp['$2']);}_0x49f188[_0x2ec809(0x6b7)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x2ec809(0x506)]=String(RegExp['$1'])[_0x2ec809(0x5cf)]()['trim']());},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x1d7)]=function(){const _0x2b80ef=_0x37ae6a;this[_0x2b80ef(0x43b)]();},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x55f)]=function(){const _0x382c4c=_0x37ae6a;if(this['_alwaysUpdateMove'])return!![];return Game_Character[_0x382c4c(0x3a7)][_0x382c4c(0x55f)]['call'](this);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x54f)]=Game_Event[_0x37ae6a(0x3a7)]['updateSelfMovement'],Game_Event[_0x37ae6a(0x3a7)]['updateSelfMovement']=function(){const _0x3bbfda=_0x37ae6a;if(this['isPreventSelfMovement']())return;VisuMZ['EventsMoveCore'][_0x3bbfda(0x54f)][_0x3bbfda(0x609)](this),this['isMoving']()&&VisuMZ[_0x3bbfda(0x447)](this[_0x3bbfda(0x269)]);},Game_Event[_0x37ae6a(0x3a7)]['isPreventSelfMovement']=function(){const _0x285857=_0x37ae6a,_0x5daa61=VisuMZ[_0x285857(0x4de)][_0x285857(0x556)][_0x285857(0x1e5)];if($gameMap[_0x285857(0x6b0)]()&&_0x5daa61[_0x285857(0x65e)])return!![];if($gameMessage[_0x285857(0x44b)]()&&_0x5daa61[_0x285857(0x3dd)])return!![];if(!$gameSystem[_0x285857(0x36f)]())return!![];if(this[_0x285857(0x59e)]()>=0x0)return!![];return![];},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x43b)]=function(){const _0x4d8ec8=_0x37ae6a,_0x28d60c=SceneManager[_0x4d8ec8(0x688)][_0x4d8ec8(0x658)];if(_0x28d60c){const _0x8644d8=_0x28d60c[_0x4d8ec8(0x667)](this);_0x8644d8&&_0x8644d8[_0x4d8ec8(0x5b0)]&&_0x8644d8[_0x4d8ec8(0x5b0)][_0x4d8ec8(0x4c9)]!==this['shadowFilename']()&&(_0x8644d8['_shadowSprite'][_0x4d8ec8(0x4c9)]=this[_0x4d8ec8(0x20d)](),_0x8644d8[_0x4d8ec8(0x5b0)][_0x4d8ec8(0x44e)]=ImageManager[_0x4d8ec8(0x597)](_0x8644d8[_0x4d8ec8(0x5b0)][_0x4d8ec8(0x4c9)]));}},Game_Event[_0x37ae6a(0x3a7)]['shadowFilename']=function(){const _0x14eb30=_0x37ae6a;return this[_0x14eb30(0x40c)][_0x14eb30(0x5a3)];},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x41e)]=function(){const _0x5c6657=_0x37ae6a;if(!this[_0x5c6657(0x40c)]['visible'])return![];return Game_CharacterBase[_0x5c6657(0x3a7)][_0x5c6657(0x41e)][_0x5c6657(0x609)](this);},Game_Event['prototype'][_0x37ae6a(0x229)]=function(){const _0xc34bb4=_0x37ae6a;return this[_0xc34bb4(0x209)][_0xc34bb4(0x559)];},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x350)]=function(){const _0x42215a=_0x37ae6a;return this['_labelWindow'][_0x42215a(0x698)];},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x66d)]=function(_0x39f658,_0x44ea1f,_0x3d9ecb){const _0x5647ca=_0x37ae6a;if(this[_0x5647ca(0x271)]())return this[_0x5647ca(0x4a9)](_0x39f658,_0x44ea1f,_0x3d9ecb);if($gameMap[_0x5647ca(0x2f9)](_0x39f658,_0x44ea1f,_0x3d9ecb,_0x5647ca(0x3a9)))return!![];if($gameMap[_0x5647ca(0x578)](_0x39f658,_0x44ea1f,_0x3d9ecb,_0x5647ca(0x3a9)))return![];return Game_Character['prototype']['isMapPassable'][_0x5647ca(0x609)](this,_0x39f658,_0x44ea1f,_0x3d9ecb);},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x271)]=function(){const _0x3366a9=_0x37ae6a;if(this[_0x3366a9(0x3b4)]===undefined)this['initEventsMoveCoreEffects']();return this[_0x3366a9(0x3b4)]['length']>0x0;},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x4a9)]=function(_0x6b9e27,_0x29f140,_0x5e1d87){const _0xad72bd=_0x37ae6a,_0x1e9c0c=$gameMap[_0xad72bd(0x4d4)](_0x6b9e27,_0x5e1d87),_0x322342=$gameMap[_0xad72bd(0x5f6)](_0x29f140,_0x5e1d87),_0x31e119=$gameMap[_0xad72bd(0x37b)](_0x1e9c0c,_0x322342);return this[_0xad72bd(0x3b4)][_0xad72bd(0x6db)](_0x31e119);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x693)]=Game_Event[_0x37ae6a(0x3a7)]['findProperPageIndex'],Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x23f)]=function(){const _0x5ee658=_0x37ae6a;if(this[_0x5ee658(0x3a9)]()&&!$gameTemp[_0x5ee658(0x4b7)]()){if(_0x5ee658(0x586)===_0x5ee658(0x37c))return this['_lastMovedDirection']||0x0;else{if(this['event']()[_0x5ee658(0x616)][_0x5ee658(0x6b7)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}}return this[_0x5ee658(0x29e)]=![],this[_0x5ee658(0x471)]=![],this['event']()?VisuMZ[_0x5ee658(0x4de)][_0x5ee658(0x693)][_0x5ee658(0x609)](this):-0x1;},VisuMZ['EventsMoveCore'][_0x37ae6a(0x32c)]=Game_Event[_0x37ae6a(0x3a7)]['meetsConditions'],Game_Event['prototype'][_0x37ae6a(0x4da)]=function(_0x56353e){const _0xc399df=_0x37ae6a;this[_0xc399df(0x2e9)](_0x56353e),$gameTemp[_0xc399df(0x4c2)](this);const _0x53f620=VisuMZ[_0xc399df(0x4de)][_0xc399df(0x32c)][_0xc399df(0x609)](this,_0x56353e);return $gameTemp[_0xc399df(0x5f2)](),_0x53f620;},Game_Event[_0x37ae6a(0x3a7)]['hasAdvancedSwitchVariable']=function(){const _0x3083d4=_0x37ae6a;return this[_0x3083d4(0x29e)];},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x2e9)]=function(_0x31e8f3){const _0x2681c6=_0x37ae6a,_0x42f4bb=_0x31e8f3[_0x2681c6(0x355)];if(_0x42f4bb[_0x2681c6(0x59a)]&&DataManager[_0x2681c6(0x21c)](_0x42f4bb[_0x2681c6(0x35b)]))this['_advancedSwitchVariable']=!![];else{if(_0x42f4bb['switch2Valid']&&DataManager[_0x2681c6(0x21c)](_0x42f4bb[_0x2681c6(0x5a2)]))'kSZNK'!==_0x2681c6(0x662)?this[_0x2681c6(0x29e)]=!![]:this['_shadowSprite']['z']=this['z']-0x1;else _0x42f4bb[_0x2681c6(0x63e)]&&DataManager['isAdvancedVariable'](_0x42f4bb['variableId'])&&(this[_0x2681c6(0x29e)]=!![]);}},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x56b)]=function(){const _0x17f75f=_0x37ae6a;if(this[_0x17f75f(0x39e)])return![];return this['_clickTrigger'];},Game_Event['prototype'][_0x37ae6a(0x489)]=function(){const _0x14826c=_0x37ae6a;$gameTemp[_0x14826c(0x6dc)](),this[_0x14826c(0x480)]();},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x542)]=function(_0x21ae8b,_0x533565){const _0x502987=_0x37ae6a;return this[_0x502987(0x2ad)]?this[_0x502987(0x431)](_0x21ae8b,_0x533565):Game_Character[_0x502987(0x3a7)][_0x502987(0x542)][_0x502987(0x609)](this,_0x21ae8b,_0x533565);},Game_Event['prototype'][_0x37ae6a(0x431)]=function(_0x16036f,_0x48436d){const _0x34ee22=_0x37ae6a;var _0x368a22=this['x']-this[_0x34ee22(0x2ad)][_0x34ee22(0x639)],_0x1a1a64=this['x']+this[_0x34ee22(0x2ad)][_0x34ee22(0x285)],_0x2e8e3c=this['y']-this[_0x34ee22(0x2ad)]['up'],_0x5d25ea=this['y']+this['_addedHitbox'][_0x34ee22(0x657)];return _0x368a22<=_0x16036f&&_0x16036f<=_0x1a1a64&&_0x2e8e3c<=_0x48436d&&_0x48436d<=_0x5d25ea;},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x30c)]=function(_0x30aec7,_0x49f270,_0x41906f){const _0x502f94=_0x37ae6a;for(let _0x46b7c4=-this[_0x502f94(0x2ad)][_0x502f94(0x639)];_0x46b7c4<=this[_0x502f94(0x2ad)][_0x502f94(0x285)];_0x46b7c4++){if(_0x502f94(0x41c)!==_0x502f94(0x41c))while(this[_0x502f94(0x292)]()){this[_0x502f94(0x6d4)]();}else for(let _0x456e37=-this['_addedHitbox']['up'];_0x456e37<=this[_0x502f94(0x2ad)]['down'];_0x456e37++){if('qQKMJ'==='wHnRE'){if(!_0x72126f[_0x502f94(0x4de)]['Settings']['Movement'][_0x502f94(0x2c4)])return;for(const _0x383d88 of this['_characterSprites']){this[_0x502f94(0x202)][_0x502f94(0x626)](_0x383d88['_shadowSprite']);}}else{if(!Game_Character[_0x502f94(0x3a7)][_0x502f94(0x30c)]['call'](this,_0x30aec7+_0x46b7c4,_0x49f270+_0x456e37,_0x41906f))return![];}}}return!![];},Game_Event[_0x37ae6a(0x3a7)]['isCollidedWithEvents']=function(_0x5b4f21,_0x2b966f){const _0x11e7ec=_0x37ae6a;if(Imported[_0x11e7ec(0x330)]&&this[_0x11e7ec(0x3d8)]())return this[_0x11e7ec(0x5c2)](_0x5b4f21,_0x2b966f);else{const _0x5afad1=$gameMap[_0x11e7ec(0x5fe)](_0x5b4f21,_0x2b966f)[_0x11e7ec(0x208)](_0x30a31f=>_0x30a31f!==this);return _0x5afad1[_0x11e7ec(0x5e5)]>0x0;}},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x5c2)]=function(_0x1c350e,_0x227d04){const _0x355dc6=_0x37ae6a;if(!this[_0x355dc6(0x451)]())return![];else{const _0xeb6d72=$gameMap[_0x355dc6(0x5fe)](_0x1c350e,_0x227d04)[_0x355dc6(0x208)](_0xfeb88b=>_0xfeb88b!==this&&_0xfeb88b[_0x355dc6(0x451)]());return _0xeb6d72[_0x355dc6(0x5e5)]>0x0;}},Game_Event['prototype'][_0x37ae6a(0x6ec)]=function(){const _0xe7b91c=_0x37ae6a;return this[_0xe7b91c(0x3a4)][_0xe7b91c(0x55d)]||'none';},Game_Event[_0x37ae6a(0x3a7)]['activationProximityDistance']=function(){const _0x40cd5c=_0x37ae6a;return this[_0x40cd5c(0x3a4)][_0x40cd5c(0x6ae)]||0x0;},Game_Event['prototype']['activationRegionList']=function(){const _0x518a2a=_0x37ae6a;return this[_0x518a2a(0x3a4)][_0x518a2a(0x240)]||[];},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x356)]=function(){const _0x31b269=_0x37ae6a;Game_Character[_0x31b269(0x3a7)]['increaseSteps'][_0x31b269(0x609)](this);if([_0x31b269(0x2f1),_0x31b269(0x3f9)][_0x31b269(0x6db)](this[_0x31b269(0x6ec)]()))return;$gamePlayer[_0x31b269(0x611)]([0x2]);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x1d0)]=Game_Event['prototype']['checkEventTriggerAuto'],Game_Event[_0x37ae6a(0x3a7)]['checkEventTriggerAuto']=function(){const _0x4815a6=_0x37ae6a;if(this['_trigger']!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this['checkRegionEventTrigger'](![]))return;if(!this['checkActivationProximity'](![]))return;VisuMZ[_0x4815a6(0x4de)][_0x4815a6(0x1d0)][_0x4815a6(0x609)](this);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x2b5)]=Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x3cf)],Game_Event[_0x37ae6a(0x3a7)]['updateParallel']=function(){const _0x4c21a4=_0x37ae6a;if(!this[_0x4c21a4(0x4bd)])return;if(!this['checkRegionEventTrigger'](!![]))return;if(!this[_0x4c21a4(0x33f)](!![]))return;VisuMZ[_0x4c21a4(0x4de)]['Game_Event_updateParallel']['call'](this);},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x1da)]=function(_0x2d1513){const _0x6f7964=_0x37ae6a;if(!_0x2d1513&&$gameMap[_0x6f7964(0x6b0)]())return![];if(!_0x2d1513&&$gameMap['isAnyEventStarting']())return![];if(this[_0x6f7964(0x27a)]()<=0x0)return!![];return $gamePlayer[_0x6f7964(0x5af)](this);},Game_Event['prototype'][_0x37ae6a(0x33f)]=function(_0x386085){const _0x3d8a75=_0x37ae6a;if(!_0x386085&&$gameMap[_0x3d8a75(0x6b0)]())return![];if(!_0x386085&&$gameMap[_0x3d8a75(0x3a8)]())return![];if([_0x3d8a75(0x2f1),_0x3d8a75(0x3f9)]['includes'](this[_0x3d8a75(0x6ec)]()))return!![];return $gamePlayer['meetActivationProximityConditions'](this);},VisuMZ[_0x37ae6a(0x447)]=function(_0x1ced8e){const _0x5825ec=_0x37ae6a;for(const _0x9aea40 of $gameMap[_0x5825ec(0x313)]()){if(_0x5825ec(0x309)===_0x5825ec(0x3b0)){const _0x30df86=_0x2bfecd[_0x5825ec(0x6c5)][_0x2d397b];if(!_0x30df86)return;_0x4e26eb=_0x30df86[_0x5825ec(0x266)],_0x4546b6=_0x30df86[_0x5825ec(0x35c)];}else{if(!_0x9aea40)continue;_0x9aea40[_0x5825ec(0x59e)]()===_0x1ced8e&&_0x9aea40[_0x5825ec(0x28f)]();}}},VisuMZ[_0x37ae6a(0x4fe)]=function(_0x546626){if(_0x546626===0x0)return $gamePlayer;return $gameMap['event'](_0x546626);},Game_Event[_0x37ae6a(0x3a7)]['moveSynchTarget']=function(){return this['_moveSynch']['target'];},Game_Event[_0x37ae6a(0x3a7)]['moveSynchType']=function(){const _0x26eeeb=_0x37ae6a;return this[_0x26eeeb(0x22e)][_0x26eeeb(0x55d)];},Game_Event['prototype'][_0x37ae6a(0x547)]=function(){const _0x2d68d7=_0x37ae6a;if(this['moveSynchTarget']()>=0x0){const _0x343874=VisuMZ['GetMoveSynchTarget'](this[_0x2d68d7(0x59e)]());if(_0x343874)return _0x343874['realMoveSpeed']();}return Game_Character[_0x2d68d7(0x3a7)][_0x2d68d7(0x547)][_0x2d68d7(0x609)](this);},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x28f)]=function(){const _0x4cff6f=_0x37ae6a;this[_0x4cff6f(0x22e)][_0x4cff6f(0x6f7)]=this[_0x4cff6f(0x22e)][_0x4cff6f(0x6f7)]||0x0,this['_moveSynch'][_0x4cff6f(0x6f7)]--;if(this[_0x4cff6f(0x22e)][_0x4cff6f(0x6f7)]>0x0)return;this[_0x4cff6f(0x22e)]['timer']=this[_0x4cff6f(0x22e)][_0x4cff6f(0x5f4)],this[_0x4cff6f(0x436)]();},Game_Event['prototype']['adjustMoveSynchOpacityDelta']=function(_0x36f619){const _0x245af4=_0x37ae6a;if(this[_0x245af4(0x59e)]()>=0x0){if(_0x245af4(0x521)===_0x245af4(0x2cf)){if(_0x315e9d)return _0x1ad890;}else{const _0x45491b=VisuMZ[_0x245af4(0x4fe)](this[_0x245af4(0x59e)]());if(_0x45491b){if(_0x245af4(0x54a)!==_0x245af4(0x387)){const _0x2fae25=$gameMap['distance'](this['_realX'],this[_0x245af4(0x544)],_0x45491b[_0x245af4(0x4f6)],_0x45491b[_0x245af4(0x544)])-0x1,_0xdc0009=Math[_0x245af4(0x62f)]($gameMap[_0x245af4(0x6a9)](),$gameMap[_0x245af4(0x2d8)]()),_0x2ee4ac=this[_0x245af4(0x22e)][_0x245af4(0x531)]||0x0;_0x36f619-=Math[_0x245af4(0x319)](0x0,_0x2fae25)*_0xdc0009*_0x2ee4ac;}else this[_0x245af4(0x2b6)]();}}}return _0x36f619;},Game_Event['prototype'][_0x37ae6a(0x436)]=function(){const _0x3e722e=_0x37ae6a;switch(this[_0x3e722e(0x33b)]()){case _0x3e722e(0x40e):this[_0x3e722e(0x596)]();break;case _0x3e722e(0x23e):this['processMoveSynchApproach']();break;case _0x3e722e(0x409):this[_0x3e722e(0x5c5)]();break;case _0x3e722e(0x671):this[_0x3e722e(0x3fe)]();break;case _0x3e722e(0x379):case _0x3e722e(0x4b5):this[_0x3e722e(0x357)]();break;case _0x3e722e(0x637):case _0x3e722e(0x4d7):this[_0x3e722e(0x691)]();break;case _0x3e722e(0x528):case _0x3e722e(0x646):case _0x3e722e(0x601):case _0x3e722e(0x661):this['processMoveSynchMirrorHorz']();break;case _0x3e722e(0x4d5):case _0x3e722e(0x3fc):case'mirror\x20vert':case _0x3e722e(0x5a5):this[_0x3e722e(0x369)]();break;default:this[_0x3e722e(0x596)]();break;}this[_0x3e722e(0x36b)]();},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x596)]=function(){const _0x4450e1=_0x37ae6a,_0x4dd794=[0x2,0x4,0x6,0x8];if($gameMap[_0x4450e1(0x3e7)]()){if(_0x4450e1(0x64e)==='JtrNo')_0x4dd794[_0x4450e1(0x6bf)](0x1,0x3,0x7,0x9);else return _0x3c5d83['EventsMoveCore']['Game_Switches_value'][_0x4450e1(0x609)](this,_0x3764ea);}const _0x299ffe=[];for(const _0x1fdd91 of _0x4dd794){if('IcqrF'===_0x4450e1(0x66e)){if(this[_0x4450e1(0x30c)](this['x'],this['y'],_0x1fdd91))_0x299ffe[_0x4450e1(0x6bf)](_0x1fdd91);}else _0x2f7a4b['ConvertParams'](_0x575aed,_0x5d079f),_0x510bc1[_0x4450e1(0x487)]();}if(_0x299ffe['length']>0x0){const _0x5517d0=_0x299ffe[Math['randomInt'](_0x299ffe[_0x4450e1(0x5e5)])];this[_0x4450e1(0x47c)](_0x5517d0);}},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x4c4)]=function(){const _0x502f0b=_0x37ae6a,_0x50cef5=VisuMZ[_0x502f0b(0x4fe)](this[_0x502f0b(0x59e)]());this['moveTowardCharacter'](_0x50cef5);},Game_Event['prototype'][_0x37ae6a(0x5c5)]=function(){const _0x2ce0e8=_0x37ae6a,_0x173955=VisuMZ['GetMoveSynchTarget'](this[_0x2ce0e8(0x59e)]());this[_0x2ce0e8(0x3f0)](_0x173955);},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x3fe)]=function(){this['updateRoutineMove']();},Game_Event['prototype'][_0x37ae6a(0x357)]=function(){const _0x2daf83=_0x37ae6a,_0x434dbe=VisuMZ['GetMoveSynchTarget'](this[_0x2daf83(0x59e)]());this[_0x2daf83(0x47c)](_0x434dbe[_0x2daf83(0x364)]());},Game_Event['prototype']['processMoveSynchReverseMimic']=function(){const _0x20cb81=_0x37ae6a,_0x917258=VisuMZ[_0x20cb81(0x4fe)](this['moveSynchTarget']());this[_0x20cb81(0x47c)](this[_0x20cb81(0x239)](_0x917258[_0x20cb81(0x364)]()));},Game_Event[_0x37ae6a(0x3a7)]['processMoveSynchMirrorHorz']=function(){const _0xeb9a46=_0x37ae6a,_0x13f45a=VisuMZ[_0xeb9a46(0x4fe)](this[_0xeb9a46(0x59e)]()),_0x3607d0=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x13f45a[_0xeb9a46(0x364)]()];this[_0xeb9a46(0x47c)](_0x3607d0);},Game_Event[_0x37ae6a(0x3a7)]['processMoveSynchMirrorVert']=function(){const _0x124777=_0x37ae6a,_0x55d354=VisuMZ['GetMoveSynchTarget'](this[_0x124777(0x59e)]()),_0x5ce8e2=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x55d354[_0x124777(0x364)]()];this['executeMoveDir8'](_0x5ce8e2);},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x62d)]=function(){const _0x4a8f7c=_0x37ae6a,_0x192811=$gameSystem[_0x4a8f7c(0x2b1)](this);if(!_0x192811)return;this['setPosition'](_0x192811['x'],_0x192811['y']),this['refreshBushDepth'](),this[_0x4a8f7c(0x349)](_0x192811[_0x4a8f7c(0x293)]),this[_0x4a8f7c(0x1e8)]===_0x192811[_0x4a8f7c(0x45e)]&&(this[_0x4a8f7c(0x5f9)]=_0x192811[_0x4a8f7c(0x553)]);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x6f9)]=Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x36b)],Game_Event['prototype']['update']=function(){const _0x57987c=_0x37ae6a;VisuMZ[_0x57987c(0x4de)][_0x57987c(0x6f9)][_0x57987c(0x609)](this),this[_0x57987c(0x6e3)]();},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x2d3)]=function(){const _0x438506=_0x37ae6a;Game_Character[_0x438506(0x3a7)][_0x438506(0x2d3)]['call'](this),this[_0x438506(0x4f9)]();},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x2ac)]=function(){const _0x33e906=_0x37ae6a;if($gameMap['isSaveEventLocations']())return!![];return this[_0x33e906(0x3fa)];},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x4f9)]=function(){const _0xda327f=_0x37ae6a;if(!this[_0xda327f(0x2ac)]())return;this[_0xda327f(0x4f2)]();},Game_Event['prototype'][_0x37ae6a(0x4f2)]=function(){const _0x27e5ed=_0x37ae6a;this[_0x27e5ed(0x400)]=!![];},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x6e3)]=function(){const _0x38253a=_0x37ae6a;this['_requestSaveEventLocation']&&this[_0x38253a(0x361)]();},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x361)]=function(){const _0x3fecc2=_0x37ae6a;this[_0x3fecc2(0x400)]=![],$gameSystem[_0x3fecc2(0x4f2)](this);},Game_Event[_0x37ae6a(0x3a7)]['deleteEventLocation']=function(){$gameSystem['deleteSavedEventLocation'](this);},Game_Event['prototype'][_0x37ae6a(0x4a5)]=function(){const _0x46859a=_0x37ae6a;if($gameSystem[_0x46859a(0x4a5)](this)){if(_0x46859a(0x276)===_0x46859a(0x636))this[_0x46859a(0x6b2)]=![];else return Game_Character[_0x46859a(0x3a7)][_0x46859a(0x4a5)]['call'](this);}else return{'iconIndex':0x0,'bufferX':settings['Icon'][_0x46859a(0x42a)],'bufferY':settings[_0x46859a(0x48a)][_0x46859a(0x55c)],'blendMode':settings['Icon']['BlendMode']};},Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x281)]=function(){return this['_CPCs'];},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x610)]=Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x4da)],Game_Event['prototype'][_0x37ae6a(0x4da)]=function(_0x2f504a){const _0x3c5d56=_0x37ae6a,_0x3d611f=VisuMZ[_0x3c5d56(0x4de)][_0x3c5d56(0x610)]['call'](this,_0x2f504a);if(!_0x3d611f)return![];return this[_0x3c5d56(0x6e8)](_0x2f504a);},Game_Event['prototype'][_0x37ae6a(0x6e8)]=function(_0x36650b){const _0x217894=_0x37ae6a;VisuMZ[_0x217894(0x4de)][_0x217894(0x552)][_0x217894(0x3c3)](_0x36650b),this['_CPCs']=_0x36650b[_0x217894(0x438)][_0x217894(0x5e5)]>0x0;if(_0x36650b[_0x217894(0x438)]===undefined){if(_0x217894(0x6a8)===_0x217894(0x6a8))VisuMZ[_0x217894(0x4de)][_0x217894(0x552)][_0x217894(0x3c3)](_0x36650b);else return this[_0x217894(0x349)](0x7);}if(_0x36650b['CPC'][_0x217894(0x5e5)]>0x0)return $gameMap[_0x217894(0x3a9)](this[_0x217894(0x269)])&&VisuMZ['EventsMoveCore'][_0x217894(0x552)][_0x217894(0x5bc)](_0x36650b[_0x217894(0x438)],this[_0x217894(0x269)]);return!![];},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x516)]=Game_Troop[_0x37ae6a(0x3a7)][_0x37ae6a(0x4da)],Game_Troop[_0x37ae6a(0x3a7)]['meetsConditions']=function(_0x3631b3){const _0x36829e=_0x37ae6a;var _0x79c513=VisuMZ['EventsMoveCore'][_0x36829e(0x516)][_0x36829e(0x609)](this,_0x3631b3);return _0x79c513&&this[_0x36829e(0x461)](_0x3631b3);},Game_Troop[_0x37ae6a(0x3a7)][_0x37ae6a(0x461)]=function(_0x2113e3){const _0x43665b=_0x37ae6a;if(_0x2113e3[_0x43665b(0x438)]===undefined){if(_0x43665b(0x682)===_0x43665b(0x682))VisuMZ['EventsMoveCore'][_0x43665b(0x552)][_0x43665b(0x3c3)](_0x2113e3);else{if(this===_0x3a3698){if(_0x4ee7e4[_0x43665b(0x656)]())return![];if(_0x22227b[_0x43665b(0x4bf)]())return!![];}return _0x5320e2[_0x43665b(0x4de)][_0x43665b(0x4ca)]['call'](this);}}if(_0x2113e3['CPC'][_0x43665b(0x5e5)]>0x0)return VisuMZ[_0x43665b(0x4de)]['CustomPageConditions']['metCPC'](_0x2113e3[_0x43665b(0x438)],0x0);return!![];},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x5ee)]=Game_Event[_0x37ae6a(0x3a7)]['locate'],Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x3b5)]=function(_0x133239,_0x12f7b3){const _0x2d24e5=_0x37ae6a;VisuMZ[_0x2d24e5(0x4de)][_0x2d24e5(0x5ee)][_0x2d24e5(0x609)](this,_0x133239,_0x12f7b3),this[_0x2d24e5(0x45d)]=_0x133239,this[_0x2d24e5(0x28c)]=_0x12f7b3,this[_0x2d24e5(0x4f9)]();},VisuMZ['EventsMoveCore'][_0x37ae6a(0x540)]=Game_Event['prototype'][_0x37ae6a(0x44f)],Game_Event[_0x37ae6a(0x3a7)][_0x37ae6a(0x44f)]=function(){const _0x463fd2=_0x37ae6a,_0x5f446a=$gameMap[_0x463fd2(0x6ae)](this['x'],this['y'],this[_0x463fd2(0x45d)],this[_0x463fd2(0x28c)]),_0x32d279=_0x5f446a*(this[_0x463fd2(0x21b)]||0x0);Math[_0x463fd2(0x40e)]()>=_0x32d279?VisuMZ['EventsMoveCore'][_0x463fd2(0x540)]['call'](this):this[_0x463fd2(0x35f)]();},Game_Event['prototype'][_0x37ae6a(0x35f)]=function(){const _0x31dc8c=_0x37ae6a,_0xace913=this[_0x31dc8c(0x3b8)](this[_0x31dc8c(0x45d)]),_0x38c9c0=this[_0x31dc8c(0x562)](this['_randomHomeY']);if(Math['abs'](_0xace913)>Math['abs'](_0x38c9c0))this[_0x31dc8c(0x631)](_0xace913>0x0?0x4:0x6),!this['isMovementSucceeded']()&&_0x38c9c0!==0x0&&this[_0x31dc8c(0x631)](_0x38c9c0>0x0?0x8:0x2);else _0x38c9c0!==0x0&&(this[_0x31dc8c(0x631)](_0x38c9c0>0x0?0x8:0x2),!this['isMovementSucceeded']()&&_0xace913!==0x0&&this[_0x31dc8c(0x631)](_0xace913>0x0?0x4:0x6));},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x336)]=function(){const _0x3c4408=_0x37ae6a;this[_0x3c4408(0x5e6)]={'filename':'','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase['prototype'][_0x37ae6a(0x5f8)]=function(){const _0x20a1ff=_0x37ae6a;if(this['_attachPicture']===undefined)this[_0x20a1ff(0x336)]();return this[_0x20a1ff(0x5e6)];},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x223)]=function(){const _0x1ffc6d=_0x37ae6a;return this[_0x1ffc6d(0x5f8)]()[_0x1ffc6d(0x5a3)]??'';},Game_CharacterBase['prototype'][_0x37ae6a(0x5b2)]=function(){const _0x129704=_0x37ae6a;return this[_0x129704(0x5f8)]()[_0x129704(0x2f4)]??0x0;},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x479)]=function(){const _0xd5ad2=_0x37ae6a;return this[_0xd5ad2(0x5f8)]()['maxSize']??0x0;},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x307)]=function(){const _0x45e023=_0x37ae6a;return this[_0x45e023(0x5f8)]()[_0x45e023(0x321)]??0x0;},Game_CharacterBase['prototype']['attachPictureOffsetY']=function(){const _0x2c1cf8=_0x37ae6a;return this[_0x2c1cf8(0x5f8)]()[_0x2c1cf8(0x3ed)]??0x0;},Game_CharacterBase[_0x37ae6a(0x3a7)][_0x37ae6a(0x6ea)]=function(){const _0x1a9ccb=_0x37ae6a;return this[_0x1a9ccb(0x5f8)]()[_0x1a9ccb(0x676)]??0x1;},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x2e1)]=Game_Interpreter[_0x37ae6a(0x3a7)]['updateWaitMode'],Game_Interpreter['prototype'][_0x37ae6a(0x54b)]=function(){const _0x3c7621=_0x37ae6a;if(this['_waitMode']===_0x3c7621(0x418)){if('oekCP'==='sueEK')return this[_0x3c7621(0x46f)];else{if(window[this[_0x3c7621(0x5ba)]]){if('VNgHq'===_0x3c7621(0x1de))this[_0x3c7621(0x581)]='',this[_0x3c7621(0x27c)]();else return this[_0x3c7621(0x5e3)](_0xfd5447(_0x5f2094['$1']));}else return!![];}}else return VisuMZ[_0x3c7621(0x4de)][_0x3c7621(0x2e1)]['call'](this);},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x21e)]=Game_Interpreter['prototype'][_0x37ae6a(0x6d4)],Game_Interpreter['prototype'][_0x37ae6a(0x6d4)]=function(){const _0x42323e=_0x37ae6a,_0x3dcde3=$gameMap&&this[_0x42323e(0x269)]?$gameMap['event'](this[_0x42323e(0x269)]):null;$gameTemp[_0x42323e(0x4c2)](_0x3dcde3);const _0x50743a=VisuMZ['EventsMoveCore'][_0x42323e(0x21e)][_0x42323e(0x609)](this);return $gameTemp['clearSelfTarget'](),_0x50743a;},VisuMZ[_0x37ae6a(0x4de)]['Game_Interpreter_PluginCommand']=Game_Interpreter['prototype'][_0x37ae6a(0x5e2)],Game_Interpreter['prototype'][_0x37ae6a(0x5e2)]=function(_0x1a1f79){const _0x4a2105=_0x37ae6a;return $gameTemp[_0x4a2105(0x660)](this),VisuMZ[_0x4a2105(0x4de)]['Game_Interpreter_PluginCommand']['call'](this,_0x1a1f79);},Game_Interpreter[_0x37ae6a(0x3a7)][_0x37ae6a(0x29d)]=function(_0x2705c5){const _0x40fcd4=_0x37ae6a;this['_callEventData']=_0x2705c5;const _0x4db84f=_0x40fcd4(0x297)[_0x40fcd4(0x51a)](_0x2705c5[_0x40fcd4(0x22c)][_0x40fcd4(0x462)](0x3));this['_callEventMap']=_0x40fcd4(0x4a3)+Graphics[_0x40fcd4(0x43d)]+'_'+this[_0x40fcd4(0x6c6)](),DataManager[_0x40fcd4(0x5cd)](this[_0x40fcd4(0x5ba)],_0x4db84f),window[this[_0x40fcd4(0x5ba)]]?_0x40fcd4(0x3f1)===_0x40fcd4(0x6f1)?_0x533d82!==this[_0x40fcd4(0x22c)]()&&_0x363084&&_0x3c04e4[_0x40fcd4(0x504)](this[_0x40fcd4(0x22c)]()):this['startCallEvent']():_0x40fcd4(0x629)===_0x40fcd4(0x629)?this['setWaitMode'](_0x40fcd4(0x418)):(_0x11fb14[_0x40fcd4(0x4de)][_0x40fcd4(0x2db)]['call'](this),this[_0x40fcd4(0x481)]());},Game_Interpreter[_0x37ae6a(0x3a7)]['startCallEvent']=function(){const _0x34419=_0x37ae6a,_0x3bd739=this[_0x34419(0x6aa)],_0x29c695=window[this[_0x34419(0x5ba)]],_0x2c662f=_0x29c695[_0x34419(0x313)][_0x3bd739['eventId']];if(_0x2c662f&&_0x2c662f[_0x34419(0x39a)][_0x3bd739[_0x34419(0x622)]-0x1]){const _0x234c68=_0x2c662f[_0x34419(0x39a)][_0x3bd739['pageId']-0x1][_0x34419(0x1e6)];this[_0x34419(0x575)](_0x234c68,this[_0x34419(0x6c6)]());}window[this[_0x34419(0x5ba)]]=undefined,this['_callEventMap']=undefined,this[_0x34419(0x6aa)]=undefined;};function _0x17b8(){const _0x5be01b=['left','qcbok','EventTimerResume','defaultFontSize','_target','variableValid','refresh','status','createShadows','setNumberInput','visible','isShip','LEFT','horizontal\x20mirror','round','SelfSwitchID','resizeWindow','SbLyZ','_periodicRefreshTimer','gCiOe','Game_Character_processMoveCommand','JtrNo','anchor','iconSize','_diagonalSupport','_spawnData','exit','Game_Player_checkEventTriggerHere','fxqtj','isPlayerForceShown','down','_spriteset','RemovePreserve','shift','Lfbnu','MULTIPLY','mWSCQ','StopAutoMoveEvents','SelfVariables','setLastPluginCommandInterpreter','horz\x20mirror','HRKTP','XxMQo','ARRAYSTRUCT','toLowerCase','gGBdr','findTargetSprite','_eventScreenY','Game_Event_event','EventForbid','setDiagonalDirection','AutoBuffer','isMapPassable','IcqrF','deleteSavedEventLocationKey','_spawnPreserved','custom','_paused','hRYCo','fontSize','drawTextEx','scale','Game_Temp_setDestination','constructor','VariableGetSelfVariableID','deltaY','rotation','isInVehicle','zFXQR','Game_CharacterBase_canPass','gAPrG','Game_CharacterBase_realMoveSpeed','isOnRope','OCMLn','characterIndexVS8','Spriteset_Map_createShadow','_saveEventLocations','VisibleRange','deletePreservedMorphEventDataKey','_scene','eventLabelsVisible','DashModifier','VHkhe','igbzR','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','iRzPY','_SavedEventLocations','FMzJf','processMoveSynchReverseMimic','UPPER\x20RIGHT','Game_Event_findProperPageIndex','isVisible','outlineColor','characterPatternYVS8','updatePeriodicRefresh','visibleRange','ALLOW_LADDER_DASH','lock','moveDiagonally','Toggle','processMoveRouteFadeOut','floor','RcOXk','JbrQL','registerSelfEvent','requestRefresh','characterPatternYBasic','createLowerLayer','TiltLeft','charAt','setPlayerControlDisable','gLsPC','tileWidth','_callEventData','Speed','VZlSN','EventTimerPause','distance','iconIndex','isEventRunning','Game_Message_setItemChoice','_forceCarrying','setControlledFollowerID','zgAEm','concat','updatePosition','match','checkEventTriggerHere','FQMGz','turnTowardPoint','PreMorphJS','hasEventIcon','createSpawnedEvent','2474622YuAyuj','push','switchId','jmOsa','LIGHTBULB','SlowerSpeed','processMoveCommandEventsMoveCore','EventTemplates','eventId','_screenZoomScale','ADDITIVE','setupRegionRestrictions','dUUib','roundX','FQSUi','Game_Follower_chaseCharacter','FzZuv','udMQB','Forbid','_DisablePlayerControl','aWZYj','getPlayerDiagonalSetting','executeCommand','nfURD','setImage','_forceHidePlayer','randomInt','shadowX','MUSIC-NOTE','includes','clearDestination','SPIN\x20CCW','Game_Timer_onExpire','nRmbL','Game_CharacterBase_pattern','square','clearEventCache','updateSaveEventLocation','getPosingCharacterDirection','setBackgroundType','getAttachPictureBitmapHeight','onExpire','meetsCPC','Game_Map_setup','attachPictureScale','PostSpawnJS','activationProximityType','pattern','Game_CommonEvent_isActive','Window_EventItem_onCancel','Game_Vehicle_isMapPassable','NYSYq','fMopI','shiftY','EnableDir8','AutoMoveEvents','turnRight90','timer','eZLRW','Game_Event_update','Rope','ZUcwn','updateEventMirrorSprite','drawIcon','yvgTo','VehicleForbid','hDySw','qkLjT','1500ydFBQo','_eventLabelOffsetY','Game_Event_checkEventTriggerAuto','createContents','dashSpeedModifier','zJOBB','FALSE','ANNOYED','isLabelVisible','updateEventsMoveCoreTagChanges','RyEjc','Ship','checkRegionEventTrigger','keys','ZZZ','bufferY','VNgHq','follower','_visibleEventX','PreCopyJS','_customZ','_visiblePlayerY','isDashingAndMoving','Movement','list','Game_Message_setNumberInput','_pageIndex','ejKWw','TiltVert','DEFAULT_SHIFT_Y','prepareSpawnedEventAtXY','Step2MapId','updateEventIconSprite','_EventIcons','padding','VisibleEventLabels','yeJlr','qvcIU','hasAdvancedSwitchVariable','disable','startMessage','getMapSpawnedEventData','processMoveRouteJumpForward','VehicleDock','string','IconBufferX','performTransfer','Game_CharacterBase_screenX','fPsVu','directionOnLadderSpriteVS8dir','referEvent','setupPageSettings','_tilemap','determineCommonEventsWithCPC','isJumping','Name','TXrPK','getAttachPictureBitmapWidth','filter','_labelWindow','BoatSpeed','_selfTargetItemChoice','setupEvents','shadowFilename','IcTei','bzpTS','StrictCollision','_opacity','create','OffsetX','meetActivationProximityConditions','Visibility','createAttachPictureSprite','setCharacterBitmap','initialize','DashOnLadder','setupCopyEvent','_randomMoveWeight','isAdvancedSwitch','OperateValues','Game_Interpreter_executeCommand','_hidden','Game_Player_checkEventTriggerThere','isEventClickTriggered','pdFAt','attachPictureFilename','updateVisibility','isMoving','isBattleTest','lIplQ','zBgFi','labelWindowText','setupEventsMoveCoreNotetags','VisuMZ_Setup_Preload_Map','mapId','reserveCommonEvent','_moveSynch','erase','EventLocationSave','activationProximityDistance','Map\x20%1\x20Switch\x20%2','_spriteOffsetX','updateTilt','Game_Character_forceMoveRoute','return\x20%1','textSizeEx','setDashingEnabled','reverseDir','DashEnableToggle','_eventErased','ENTCl','updateScale','approach','findProperPageIndex','regionList','addLoadListener','WxgPB','lVSPS','EventAllow','$preloadedMap_%1','Sprite_Balloon_setup','roundY','rUKRC','CmUWG','_clickTrigger','destinationY','contentsOpacity','inBattle','YCBSv','isOnLadder','canMove','zFDfT','oaDUi','Sprite_Character_characterPatternY','HEART','useCarryPoseForIcons','processMoveRoutePatternLock','isActive','%1Forbid','_encounterEffectDuration','jump','_eventCache','CEIlZ','EventTimerFramesGain','mainFontSize','%1Dock','BlendMode','processMoveRouteTeleportTo','AdvancedVariables','hAEDD','Button','Step2EventId','MapID','processMoveRouteSelfVariable','updateStop','_eventId','anaTT','isDiagonalDirection','setAllowEventAutoMovement','_lastMapId','despawnAtXY','TargetSwitchId','VkMlm','hasMoveOnlyRegions','FTraB','hnyDr','terrainTag','Game_Map_event','FbadK','clearStepPattern','PlayerAllow','ZiUeR','activationRegionList','Sprite_Character_update','startCallEvent','_vehicleType','ANGER','shadowY','Game_CharacterBase_setDirection','hasCPCs','_lastAttachPictureScale','setupSpawn','_eventOverload','right','firstSpawnedEvent','Walk','despawnRegions','LEFT\x20TO\x20RIGHT','Window_EventItem_onOk','YEsXJ','_randomHomeY','findDirectionTo','frontX','updateMoveSynch','Game_SelfSwitches_setValue','createSaveEventLocationData','isRunning','direction','PlayerMovementChange','COLLAPSE','VariableId','Map%1.json','Game_Event_clearPageSettings','createCharacterShadow','eraseEvent','innerWidth','unlock','pluginCommandCallEvent','_advancedSwitchVariable','SpawnEventDespawnTerrainTags','vPRwA','isWorking','setupEventsMoveCoreEffects','PlayerIconChange','isPassable','_PreservedEventMorphData','zEkJY','_shadowOpacity','qOfas','OpacitySpeed','EventId','smooth','isSaveEventLocation','_addedHitbox','_needsRefresh','Game_Player_increaseSteps','column','getSavedEventLocation','setValue','updateText','Map%1-Event%2','Game_Event_updateParallel','setupPlayerVisibilityOverrides','SwitchGetSelfSwitchID','AirshipSpeed','log','XTrFy','SPIN\x20ACW','mgEkj','selfValue','SuccessSwitchId','isAutoBufferIcon','Game_CharacterBase_screenY','Game_Timer_stop','bRfON','SelfDataResetAll','ShowShadows','IconBlendMode','_speed','Game_Follower_initialize','IconIndex','SpawnEventAtRegion','YlAuN','slice','Ezsdp','spawnEventId','Game_Event_isCollidedWithPlayerCharacters','yutsK','HURT','1667058TQkWqP','initMoveSpeed','updateMove','startMapCommonEventOnOK','isTriggerIn','vjmVa','ccwY','tileHeight','getSelfTarget','Game_Timer_initialize','Spriteset_Map_createLowerLayer','Chase','_expireCommonEvent','isSpawnedEvent','RIGHT','Game_Enemy_meetsSwitchCondition','Game_Interpreter_updateWaitMode','isDashDisabled','EXCLAMATION','lKpTX','updateOpacity','_counter','_eventCopyData','Game_CharacterBase_initMembers','checkAdvancedSwitchVariablePresent','yiYde','_mirrorSprite','initEventsMoveCoreSettings','setStopFollowerChasing','Self\x20Variable\x20%1','AdvancedSwitches','EventAutoMovement','none','Window_NumberInput_processOk','TSawg','blendMode','hideShadows','executeCommandCommonEvent','LineHeight','processMoveRouteStepToCharacter','isRegionAllowPass','FontSize','NIZFv','updateAttachPictureBitmap','mRQrO','swyYp','EnableTurnInPlace','cMcqa','_forceShowPlayer','PosX','Game_Player_isMapPassable','refreshIfNeeded','JSON','fontFace','attachPictureOffsetX','IconBufferY','AHjOM','_characterName','jgyHr','canPass','convertSelfVariableValuesInScriptCall','setChaseOff','ShipSpeed','opacity','setEventIconData','SpawnEventDespawnEverything','events','KrXXE','_duration','HEjZl','EventTimerExpireEvent','TerrainTags','max','characterName','checkExistingEntitiesAt','setupEventsMoveCoreCommentTags','PostMorphJS','uaWbl','_character','needsAttachPictureUpdate','offsetX','_lastMovedDirection','MapId','chaseCharacter','Game_Map_isDashDisabled','RusXn','PosY','setItemChoice','aVDgZ','PageId','dbPLr','Game_Event_meetsConditions','moveAwayFromPoint','BitmapSmoothing','LnDvf','VisuMZ_0_CoreEngine','airship','_selfTarget','setupSpawnedEvents','onLoadAttachPicture','USER-DEFINED\x201','clearAttachPictureSettings','forceDashing','absDistance','getDirectionFromPoint','_spawnedEvents','moveSynchType','Step2Preserve','processMoveRouteFadeIn','_regionRules','checkActivationProximity','isSelfVariable','mMJXV','Passability','kRbAK','adjustDir8MovementSpeed','eventsXy','updatePatternEventsMoveCore','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','Game_CharacterBase_increaseSteps','setDirection','cwY','qKWhm','CigPk','setupDiagonalSupport','isEventsMoveCoreInvisible','CwwyE','labelWindowRange','4qHefAK','Xlzch','getControlledFollowerID','Scene_Boot_onDatabaseLoaded','conditions','increaseSteps','processMoveSynchMimic','_reflection','MapVariables','AutoBalloon','switch1Id','EventID','FbCEA','updateBitmapSmoothing','moveBackToRandomHome','RegionTouch','processSaveEventLocation','Hours','target','lastMovedDirection','Game_System_initialize','Game_Map_refresh','iconWidth','_forceShowFollower','processMoveSynchMirrorVert','AypmP','update','unlockEvent','firstSpawnedEventID','Game_Map_events','isAllowEventAutoMovement','KIFYC','tGhxA','characterPatternY','Frames','OHNRP','SLEEP','Event','isMapSwitch','advancedFunc','mimic','JSYRR','regionId','VlriZ','_commonEventId','ShiftY','destinationX','IconSet','_followerChaseOff','Seconds','%1Allow','GmQBs','setMovementSuccess','isTile','QXuZE','name','isSpawnHitboxCollisionOk','isTurnInPlace','52008bhvzCf','wTaFf','clearSpriteOffsets','FastForwardKey','CPWJb','isSpriteVS8dir','rotiw','STR','cLkVU','determineEventOverload','Game_Troop_meetsConditions','IconSize','_moveRoute','GGzYZ','DQPdx','pages','_selfTargetNumberInput','return\x200','processMoveCommand','_erased','fittingHeight','908yPerCF','LIGHT\x20BULB','Game_Event_setupPageSettings','isStopFollowerChasing','_activationProximity','ysgbg','Letter','prototype','isAnyEventStarting','event','isAdvancedVariable','KNEEL','PlayerForbid','aEunE','processMoveRouteMoveRepeat','trfRz','FETVG','spriteId','EvGeS','processMoveRouteBalloon','_moveOnlyRegions','locate','tnhqJ','value','deltaXFrom','_event','Game_CharacterBase_updatePattern','Minutes','adjustMoveSynchOpacityDelta','Game_Event_initialize','processMoveRouteSetIndex','checkValidEventerMap','prepareSpawnedEventAtRegion','XYwJm','isPressed','loadCPC','resetFontSettings','BeISq','isEventTest','TiltRight','Vpyvx','Game_Interpreter_character','Enable','lUvJL','Disable','ubWjr','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','updateParallel','VoYDl','findDiagonalDirectionTo','_needsPeriodicRefresh','moveForward','xbqau','iZtLR','remove','UpGAj','isSmartEventCollisionOn','IiPda','IUHhZ','Visible','processMoveRouteJumpTo','StopAutoMoveMessages','dRLjq','EHYqL','updateEventCustomZ','setupAttachPictureBitmap','clearCarrying','wYEHb','Window_Message_startMessage','isShadowShrink','radius','isSupportDiagonalMovement','LIGHT-BULB','22595nBXAlO','setupMorphEvent','Region','_starting','offsetY','createBitmap','isSelfSwitch','moveAwayFromCharacter','sVgFt','command108','screenY','abs','qhszc','Scene_Load_onLoadSuccess','isTransparent','enable','region','_saveEventLocation','parse','vertical\x20mirror','Vehicle','processMoveSynchCustom','ITEM','_requestSaveEventLocation','USER-DEFINED\x205','blt','Game_CharacterBase_isDashing','_poseDuration','FollowerID','EventIconDelete','windowPadding','nraMJ','away','Airship','_lastAttachPictureFilename','_shadowGraphic','getInputDirection','random','_isObjectCharacter','processMoveRouteMoveToCharacter','_comments','checkEventTriggerThere','indexOf','Game_SelfSwitches_value','_commonEvents','MUSIC\x20NOTE','getPosingCharacterIndex','CallEvent','moveTowardCharacter','processMoveRouteJumpToCharacter','SPIN\x20COUNTERCLOCKWISE','HQmFO','_inputTime','isShadowVisible','startMapCommonEventOnTouch','checkEventsMoveCoreStringTags','UNTITLED','USER-DEFINED\x204','despawnEventId','Bdkwy','Preserve','jQqzD','meetsSwitchCondition','MGBUy','Game_Vehicle_isLandOk','BufferX','Game_Switches_value','MapSwitches','aHQJD','isPlayerControlDisabled','execute','hWeyi','posEventsMoveCore','setupSaveEventLocations','Map\x20%1\x20Variable\x20%2','setFrames','%1:%2','processMoveSynch','QVULA','CPC','SwitchId','ZWjgr','updateShadowChanges','onChange','frameCount','_EventsMoveCoreSettings','xxehj','getDirectionToPoint','setPlayerDiagonalSetting','initEventsMoveCoreEffects','ifQbP','Game_Map_setupEvents','_visiblePlayerX','isDashingEnabled','MoveAllSynchTargets','CfRcn','ARRAYJSON','setEventIconDataKey','isBusy','MoveRouteIndex','_newMapId','bitmap','moveTypeRandom','KRZfw','isNormalPriority','qGMit','DiagonalSpeedMultiplier','clearPageSettings','processMoveRouteTeleportToCharacter','YyVmq','setCommonEvent','vehicle','8690WIVcqH','pause','drOpD','bzPlA','_randomHomeX','pageIndex','CommonEventID','move','CPCsMet','padZero','hasStepAnime','SelfVariableID','Game_CharacterBase_opacity','parameters','initFollowerController','correctFacingDirection','standing','yLQxP','opacitySpeed','_text','backX','_forceHideFollower','_lastPluginCommandInterpreter','some','_CPCs','IeADV','isAirshipPassable','AllAllow','Value','Game_Timer_start','iconHeight','isAllowCharacterTilt','attachPictureMaxSize','SWEAT','of\x20Preloaded\x20Maps.\x0a\x0a','executeMoveDir8','boat','makeDeepCopy','character','start','createLabelWindows','map','Game_Variables_value','nbICO','Kxrdz','front','despawnEverything','ship','onClickTrigger','Icon','LIGHT','YmQLI','isDestinationValid','advancedValue','canPassDiagonally','spawnPreserved','_labelWindows','EventLocationDelete','mCisO','ZFNBQ','onfHl','USER-DEFINED\x202','MjpGa','Game_Message_add','deltaX','dPWIN','convertVariableValuesInScriptCall','Kmdme','YWTLa','qvPET','_eventIcon','followers','eiTZZ','timerText','$callEventMap','morphIntoTemplate','getEventIconData','kWUgZ','height','isCollidedWithPlayerCharacters','isMoveOnlyRegionPassable','UPPER\x20LEFT','KzfBI','resume','createLabelWindowForTarget','_characterIndex','Siedi','EggSJ','Setting','RandomMoveWeight','YarEq','prepareSpawnedEventAtTerrainTag','copy','_patternLocked','isPlaytest','setMoveSpeed','LVFYV','deleteSavedEventLocation','RIGHT\x20TO\x20LEFT','setMoveRoute','_interpreter','Game_CharacterBase_characterIndex','isPlayerForceHidden','_proxyWindow','CcWvL','registerSelfTarget','PreloadedMaps','processMoveSynchApproach','curbr','qbHfz','OyKma','_eventPageIndex','_filename','Game_CharacterBase_isTransparent','isEmptyCharacter','ARRAYEVAL','code','BDzVp','4775950ZymmLh','despawnTerrainTags','description','template','QIEbP','roundXWithDirection','mirror\x20vertical','setPose','reverse\x20copy','_chaseOff','EventLabelRefresh','meetsConditions','process_VisuMZ_EventsMoveCore_Switches_Variables','Game_Followers_isVisible','yUMmG','EventsMoveCore','attachPictureOffsetY','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setupFollowerVisibilityOverrides','xrjaP','PostCopyJS','setOpacity','savePreservedMorphEventDataKey','%1DockRegionOnly','lineHeight','screenX','BbUhB','_pattern','width','_needsMapReload','zCJhK','MUSICNOTE','mljoE','_eventMorphData','replace','saveEventLocation','QUESTION','startsWith','apply','_realX','Boat','fFJcr','autosaveEventLocation','TurnInPlaceDelay','registerCommand','clamp','OKout','GetMoveSynchTarget','maxSize','drawText','getPose','isPassableByAnyDirection','createSpawnedEventWithData','removeTemporaryMapSpawnedEvents','getEventIconIndex','_stepPattern','Stop','TemplateName','MessageCore','VOqcW','clearDashing','autoEventIconBuffer','turnLeft90','VyGKd','TargetVariableId','yWCTV','FollowerSetControl','canStartLocalEvents','BalloonOffsetX','VisuMZ_1_MessageCore','updateEventsAndMovementCore','Game_Troop_meetsConditionsCPC','Region%1','Game_Character_setMoveRoute','trim','format','processMoveRouteMoveUntilStop','_lastAttachPictureMaxSize','VICTORY','bcotw','DefaultShadow','forceMoveRoute','PyoUZ','zgZwB','executeCommonEvent','splice','EventTimerFramesSet','BalloonOffsetY','executeMove','mirror\x20horizontal','Direction','Game_Interpreter_PluginCommand','nNQOR','createProxyWindow','_forceDashing','_spriteOffsetY','FollowerSetTargetChase','Scene_Map_startEncounterEffect','opacityDelta','getPosingCharacterPattern','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','Step1MapId','Game_Map_update','PPchI','itemPadding','turn180','trigger','xAFUI','gainFrames','IARde','_eventOverloadThreshold','VisuMZ_2_DragonbonesUnion','switches','Game_Event_moveTypeRandom','WalkAllow','pos','_visibleEventY','_realY','resetExitSelfSwitches','isAirship','realMoveSpeed','clearPose','Game_Event_start','ISpZs','updateWaitMode','OFF','processMoveRouteStepTo','28BOksUV','Game_Event_updateSelfMovement','zoomScale','GRpge','CustomPageConditions','moveRouteIndex','turnAwayFromCharacter','qTPie','Settings','_selfEvent','setFrame','text','isTargetEventValidForLabelWindow','_eventIconSprite','BufferY','type','initMembers','isNearTheScreen','Game_CharacterBase_moveStraight','mapValue','deltaYFrom','onLoadSuccess','variables','_cpc','Game_CharacterBase_direction','EnableDashTilt','Dock','lastSpawnedEventID','setMapValue','hasClickTrigger','VehicleAllow','VS8','Sprite_Character_setTileBitmap','%1,','FollowerReset','Window_NumberInput_start','OffsetY','isRegionDockable','SpawnEventAtXY','setupChild','getLastPluginCommandInterpreter','bind','isRegionForbidPass','XDUZY','VJntS','aJNxs','setEventLabelsVisible','hfdGj','removeMorph','_eventSpawnData','setDestination','_waitMode','oPBZu','qrXJQ','clear','PreSpawnJS','owCex','setTileBitmap','dzNon','LIscJ','BULB','_seconds','updateAttachPictureSprite','LxTCV','_mapId','BOUXZ','parallelCommonEvents','Step1EventId','Self\x20Switch\x20%1','isMapVariable','_cacheVisibility','getInputDir8','processMoveSynchRandom','loadSystem','_eventLabelOffsetX','Sprite_Character_setCharacterBitmap','switch1Valid','_type','_alwaysUpdateMove','%1%2','moveSynchTarget','SILENCE','player','tJQVS','switch2Id','filename','isLandOk','vert\x20mirror','lSUil','ConvertParams','iCQMM','Game_CharacterBase_moveDiagonally','_MapSpawnedEventData','add','setSelfValue','_stopCount','_pose','meetActivationRegionConditions','_shadowSprite','Player','attachPictureBlendMode','tHUsb','_characterSprites','cwX','initMembersEventsMoveCore','oPdkd','createShadow','Game_Player_performTransfer','_callEventMap','contents','metCPC','_frames','_activationProximityAutoTriggerBypass','COBWEB','forceCarrying','wlQzC','checkSmartEventCollision','WalkForbid','TimBg','processMoveSynchAway','startEncounterEffect','posNt','turnTowardCharacter','oxKzf','getPreservedMorphEventData','createIconSprite','Game_Switches_setValue','loadDataFile','processMoveRouteHugWall','toUpperCase','resetSelfSwitchesForEvent','qWOME','boxWidth','checkCollisionKeywords','stop','Game_Player_isDashing','vIcQt','Game_Map_parallelCommonEvents','_moveAllowPlayerCollision','Template','MUSIC','updatePose','startMapCommonEventOnOKTarget','processMoveRouteMoveTo','morphInto','characterIndex','zEwap','DashingEnable','command357','processMoveRouteAnimation','_followerControlID','length','_attachPicture','bufferX','All','SCREEN','updatePattern','_moveSpeed','_eventScreenX','split','Game_Event_locate','setup','SelfSwitches','frontY','clearSelfTarget','NUM','delay','HxgjF','roundYWithDirection','lastSpawnedEvent','attachPictureSettings','_moveRouteIndex','Window_ScrollText_startMessage','Game_Player_executeMove','NyEcr','NORMAL','eventsXyNt','isPosing','RegionOkTarget','mirror\x20horz','FRUSTRATION','_actuallyMoving','SpriteBased','deleteIconsOnEventsDataKey','Allow','isValid','LQiLq','call','resetSelfSwitchesForMap','pIYsM','moveTowardPoint','initEventsMoveCore','_data','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_Event_meetsConditionsCPC','checkEventTriggerEventsMoveCore','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','Label','ccwX','SpawnEventAtTerrainTag','note','SpawnEventDespawnEventID','_working','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','lzmPH','PlayerMovementDiagonal','FollowerSetGlobalChase','KuaHK','HMPH','changeSpeed','isDashing','addChild','pageId','updateVS8BalloonOffsets','moveByInput','_attachPictureSprite','removeChild','processMoveRouteSelfSwitch','onDatabaseLoaded','VRcVm','checkNeedForPeriodicRefresh','Game_Variables_setValue','iirGg','restoreSavedEventPosition','Game_Vehicle_initMoveSpeed','min','GHfvr','moveStraight','default','turnAwayFromPoint','Pudvm','PQUzZ','oEWog','reverse\x20mimic','IIzbs'];_0x17b8=function(){return _0x5be01b;};return _0x17b8();}function _0x2873(_0x1da16c,_0x5a6dc7){const _0x17b84b=_0x17b8();return _0x2873=function(_0x287333,_0x164d55){_0x287333=_0x287333-0x1ce;let _0xcb8852=_0x17b84b[_0x287333];return _0xcb8852;},_0x2873(_0x1da16c,_0x5a6dc7);}function Game_CPCInterpreter(){const _0x4f5840=_0x37ae6a;this[_0x4f5840(0x218)][_0x4f5840(0x4f5)](this,arguments);};Game_CPCInterpreter['prototype']=Object['create'](Game_Interpreter[_0x37ae6a(0x3a7)]),Game_CPCInterpreter[_0x37ae6a(0x3a7)]['constructor']=Game_CPCInterpreter,Game_CPCInterpreter[_0x37ae6a(0x3a7)]['clear']=function(){const _0x334027=_0x37ae6a;Game_Interpreter[_0x334027(0x3a7)][_0x334027(0x584)][_0x334027(0x609)](this),this[_0x334027(0x565)]=![];},Game_CPCInterpreter[_0x37ae6a(0x3a7)]['execute']=function(){const _0x53ecee=_0x37ae6a;while(this[_0x53ecee(0x292)]()){_0x53ecee(0x2f3)===_0x53ecee(0x2f3)?this[_0x53ecee(0x6d4)]():(_0x4e822f['prototype'][_0x53ecee(0x268)][_0x53ecee(0x609)](this),this['_stopCount']>0x0&&(this[_0x53ecee(0x603)]=![]));}},Game_CPCInterpreter['prototype'][_0x37ae6a(0x523)]=function(_0x20017f){const _0x58ca97=_0x37ae6a;while(this[_0x58ca97(0x292)]()){this[_0x58ca97(0x2f6)](_0x20017f);}},Game_CPCInterpreter[_0x37ae6a(0x3a7)]['executeCommandCommonEvent']=function(_0x5676ac){const _0x2d4ffb=_0x37ae6a,_0x5e7dbd=_0x5676ac;$gameTemp[_0x2d4ffb(0x4c2)](_0x5e7dbd);const _0x509abe=VisuMZ[_0x2d4ffb(0x4de)][_0x2d4ffb(0x21e)][_0x2d4ffb(0x609)](this);return $gameTemp[_0x2d4ffb(0x5f2)](),_0x509abe;},Game_CPCInterpreter[_0x37ae6a(0x3a7)][_0x37ae6a(0x3f2)]=function(_0x567212){const _0x20f775=_0x37ae6a;return Game_Interpreter[_0x20f775(0x3a7)][_0x20f775(0x3f2)][_0x20f775(0x609)](this,_0x567212),this[_0x20f775(0x411)]['some'](_0x4c9c6f=>_0x4c9c6f[_0x20f775(0x6b7)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x20f775(0x565)]=!![]),!![];},VisuMZ['EventsMoveCore']['Scene_Map_startEncounterEffect']=Scene_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x5c6)],Scene_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x5c6)]=function(){const _0x49507b=_0x37ae6a;VisuMZ['EventsMoveCore'][_0x49507b(0x530)][_0x49507b(0x609)](this),this[_0x49507b(0x658)][_0x49507b(0x2f5)]();},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x3f6)]=Scene_Load[_0x37ae6a(0x3a7)][_0x37ae6a(0x563)],Scene_Load['prototype'][_0x37ae6a(0x563)]=function(){const _0x5f13cb=_0x37ae6a;if($gameMap)$gameMap[_0x5f13cb(0x6e2)]();VisuMZ[_0x5f13cb(0x4de)]['Scene_Load_onLoadSuccess'][_0x5f13cb(0x609)](this);},VisuMZ[_0x37ae6a(0x4de)]['Sprite_Character_initMembers']=Sprite_Character[_0x37ae6a(0x3a7)]['initMembers'],Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x55e)]=function(){const _0x316819=_0x37ae6a;VisuMZ[_0x316819(0x4de)]['Sprite_Character_initMembers'][_0x316819(0x609)](this),this['initMembersEventsMoveCore'](),this['createAttachPictureSprite'](),this[_0x316819(0x5cb)]();},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x5b6)]=function(){const _0x3c835d=_0x37ae6a;this[_0x3c835d(0x2a7)]=0xff;},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x216)]=function(){const _0x46a7cc=_0x37ae6a;this[_0x46a7cc(0x625)]=new Sprite(),this[_0x46a7cc(0x625)][_0x46a7cc(0x64f)]['x']=0.5,this[_0x46a7cc(0x625)][_0x46a7cc(0x64f)]['y']=0x1,this[_0x46a7cc(0x621)](this['_attachPictureSprite']),this[_0x46a7cc(0x58c)]();},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x5cb)]=function(){const _0x47bc68=_0x37ae6a;this['_eventIconSprite']=new Sprite(),this['_eventIconSprite']['bitmap']=ImageManager['loadSystem'](_0x47bc68(0x380)),this[_0x47bc68(0x55b)]['bitmap']['smooth']=![],this[_0x47bc68(0x55b)][_0x47bc68(0x558)](0x0,0x0,0x0,0x0),this[_0x47bc68(0x55b)][_0x47bc68(0x64f)]['x']=0.5,this[_0x47bc68(0x55b)][_0x47bc68(0x64f)]['y']=0x1,this['addChild'](this['_eventIconSprite']);},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x390)]=function(){const _0x33c938=_0x37ae6a;return this[_0x33c938(0x30a)]&&this[_0x33c938(0x30a)][_0x33c938(0x6b7)](/\[VS8\]/i);},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x2bf)]=function(){const _0x10a9f1=_0x37ae6a;return this[_0x10a9f1(0x390)]()&&VisuMZ[_0x10a9f1(0x4de)]['Settings'][_0x10a9f1(0x56d)][_0x10a9f1(0x66c)];},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x27b)]=Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x36b)],Sprite_Character['prototype'][_0x37ae6a(0x36b)]=function(){const _0x2c49e8=_0x37ae6a;VisuMZ[_0x2c49e8(0x4de)][_0x2c49e8(0x27b)][_0x2c49e8(0x609)](this),this['updateEventsAndMovementCore']();},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x224)]=function(){const _0x121d60=_0x37ae6a;Sprite[_0x121d60(0x3a7)][_0x121d60(0x224)][_0x121d60(0x609)](this);if(this[_0x121d60(0x34e)]()){if(_0x121d60(0x270)==='sAVml'){_0x26b737[_0x121d60(0x4de)][_0x121d60(0x552)]['loadCPC'](_0x38f622),this[_0x121d60(0x471)]=_0x2b6bf8['CPC'][_0x121d60(0x5e5)]>0x0;_0x2b5d26[_0x121d60(0x438)]===_0x37a463&&_0x4842bb[_0x121d60(0x4de)][_0x121d60(0x552)][_0x121d60(0x3c3)](_0x3b5487);if(_0x3413f2['CPC'][_0x121d60(0x5e5)]>0x0)return _0x21b7b9[_0x121d60(0x3a9)](this['_eventId'])&&_0x36d4d1[_0x121d60(0x4de)][_0x121d60(0x552)]['metCPC'](_0x17495c[_0x121d60(0x438)],this[_0x121d60(0x269)]);return!![];}else this['visible']=![];}},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x34e)]=function(){const _0x54924d=_0x37ae6a;if(this['getEventIconIndex']()>0x0)return![];if(this[_0x54924d(0x31f)]){if(this[_0x54924d(0x31f)]['attachPictureFilename']()!=='')return![];}return this[_0x54924d(0x4cb)]()||this[_0x54924d(0x31f)]&&this['_character'][_0x54924d(0x3f7)]();},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x515)]=function(){const _0x5a872c=_0x37ae6a;this[_0x5a872c(0x234)](),this['updateShadow'](),this[_0x5a872c(0x1ee)](),this[_0x5a872c(0x3e0)](),this[_0x5a872c(0x6fc)](),this['updateAttachPictureSprite']();},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x56e)]=Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x587)],Sprite_Character[_0x37ae6a(0x3a7)]['setTileBitmap']=function(){const _0x596ef0=_0x37ae6a;VisuMZ['EventsMoveCore'][_0x596ef0(0x56e)]['call'](this),this[_0x596ef0(0x44e)][_0x596ef0(0x241)](this[_0x596ef0(0x35e)][_0x596ef0(0x577)](this));},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x599)]=Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x217)],Sprite_Character[_0x37ae6a(0x3a7)]['setCharacterBitmap']=function(){const _0x53ca10=_0x37ae6a;VisuMZ[_0x53ca10(0x4de)][_0x53ca10(0x599)][_0x53ca10(0x609)](this),this[_0x53ca10(0x44e)][_0x53ca10(0x241)](this[_0x53ca10(0x35e)][_0x53ca10(0x577)](this));},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x35e)]=function(){const _0x3c92d7=_0x37ae6a;if(!this[_0x3c92d7(0x44e)])return;this[_0x3c92d7(0x44e)][_0x3c92d7(0x2ab)]=!!VisuMZ['EventsMoveCore'][_0x3c92d7(0x556)][_0x3c92d7(0x1e5)][_0x3c92d7(0x32e)];},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x253)]=Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x372)],Sprite_Character[_0x37ae6a(0x3a7)]['characterPatternY']=function(){const _0xb268fe=_0x37ae6a;if(this[_0xb268fe(0x390)]()){if(_0xb268fe(0x279)==='vFJRu'){if(_0x8fc740[_0xb268fe(0x30f)])this['setMoveSpeed'](_0x51524f['ShipSpeed']);}else return this[_0xb268fe(0x696)]();}else return this[_0xb268fe(0x6a3)]();},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x696)]=function(){const _0x1a2523=_0x37ae6a,_0x4a1c7b=this[_0x1a2523(0x31f)][_0x1a2523(0x293)]();let _0x563d67=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this['_character'][_0x1a2523(0x2eb)]&&(_0x563d67=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x563d67[_0x4a1c7b]-0x2)/0x2;},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x6a3)]=function(){const _0x235975=_0x37ae6a;let _0x423917=this['_character'][_0x235975(0x293)]();if(this[_0x235975(0x31f)][_0x235975(0x2eb)]){if(_0x423917===0x4)'gCiOe'!==_0x235975(0x64c)?this[_0x235975(0x25b)]=_0x4a67b2:_0x423917=0x6;else _0x423917===0x6&&(_0x423917=0x4);}return(_0x423917-0x2)/0x2;},Sprite_Character['prototype'][_0x37ae6a(0x234)]=function(){const _0x306784=_0x37ae6a;if(!VisuMZ['EventsMoveCore'][_0x306784(0x556)][_0x306784(0x1e5)][_0x306784(0x567)])return;this[_0x306784(0x67b)]=0x0;if(this['isAllowCharacterTilt']()){const _0x10d093=VisuMZ[_0x306784(0x4de)][_0x306784(0x556)][_0x306784(0x1e5)],_0x15deed=this['_character']['direction']();let _0x2d0780=0x0;if([0x1,0x4,0x7][_0x306784(0x6db)](_0x15deed))_0x2d0780=_0x10d093[_0x306784(0x6a5)];if([0x3,0x6,0x9][_0x306784(0x6db)](_0x15deed))_0x2d0780=_0x10d093[_0x306784(0x3c7)];[0x2,0x8][_0x306784(0x6db)](_0x15deed)&&(_0x2d0780=[-_0x10d093[_0x306784(0x1ea)],0x0,_0x10d093[_0x306784(0x1ea)]][this[_0x306784(0x31f)]['pattern']()]);if(this[_0x306784(0x358)])_0x2d0780*=-0x1;this['rotation']=_0x2d0780;}},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x478)]=function(){const _0x452b27=_0x37ae6a;if(this['_dragonbones'])return![];return this[_0x452b27(0x31f)][_0x452b27(0x1e4)]()&&!this[_0x452b27(0x31f)][_0x452b27(0x24f)]()&&!this['_character'][_0x452b27(0x5ff)]()&&this['getEventIconIndex']()===0x0;},Sprite_Character['prototype']['updateShadow']=function(){const _0x21a5b3=_0x37ae6a;if(!this['_shadowSprite'])return;this[_0x21a5b3(0x5b0)]['x']=this[_0x21a5b3(0x31f)][_0x21a5b3(0x6d9)](),this[_0x21a5b3(0x5b0)]['y']=this[_0x21a5b3(0x31f)][_0x21a5b3(0x27f)](),this[_0x21a5b3(0x5b0)][_0x21a5b3(0x310)]=this[_0x21a5b3(0x310)],this[_0x21a5b3(0x5b0)]['visible']=this[_0x21a5b3(0x31f)][_0x21a5b3(0x41e)](),this[_0x21a5b3(0x5b0)]['_hidden']=this[_0x21a5b3(0x21f)];if(!this[_0x21a5b3(0x31f)]['isShadowShrink']()){if(_0x21a5b3(0x4ef)===_0x21a5b3(0x1f2)){for(const _0x27e391 of this[_0x21a5b3(0x33a)]){if(_0x27e391)return _0x27e391;}return null;}else this[_0x21a5b3(0x5b0)][_0x21a5b3(0x676)]['x']=Math[_0x21a5b3(0x62f)](0x1,this[_0x21a5b3(0x5b0)][_0x21a5b3(0x676)]['x']+0.1),this[_0x21a5b3(0x5b0)][_0x21a5b3(0x676)]['y']=Math[_0x21a5b3(0x62f)](0x1,this[_0x21a5b3(0x5b0)][_0x21a5b3(0x676)]['y']+0.1);}else this[_0x21a5b3(0x5b0)]['scale']['x']=Math['max'](0x0,this['_shadowSprite'][_0x21a5b3(0x676)]['x']-0.1),this[_0x21a5b3(0x5b0)][_0x21a5b3(0x676)]['y']=Math[_0x21a5b3(0x319)](0x0,this['_shadowSprite'][_0x21a5b3(0x676)]['y']-0.1);},Sprite_Character[_0x37ae6a(0x3a7)]['updateEventIconSprite']=function(){const _0x311059=_0x37ae6a;if(!this[_0x311059(0x55b)])return;const _0x223246=this[_0x311059(0x55b)],_0x4d4ab7=this[_0x311059(0x505)]();if(_0x4d4ab7<=0x0)return _0x223246['setFrame'](0x0,0x0,0x0,0x0);else{const _0x1ae63d=ImageManager[_0x311059(0x367)],_0x8637d3=ImageManager['iconHeight'],_0x494fea=_0x4d4ab7%0x10*_0x1ae63d,_0x118bd0=Math[_0x311059(0x69e)](_0x4d4ab7/0x10)*_0x8637d3;_0x223246[_0x311059(0x558)](_0x494fea,_0x118bd0,_0x1ae63d,_0x8637d3),this['visible']=!![];}const _0x2db738=this[_0x311059(0x31f)][_0x311059(0x4a5)]();if(this['isAutoBufferIcon']()){if(_0x311059(0x588)!=='NGxAg')this[_0x311059(0x50c)](_0x223246);else{const _0x5a5f11=this[_0x311059(0x45d)],_0x4988f5=this[_0x311059(0x28c)];return this['processMoveRouteStepTo'](_0x5a5f11,_0x4988f5);}}else{if('vIcQt'!==_0x311059(0x5d6))return![];else _0x223246['x']=_0x2db738?_0x2db738[_0x311059(0x5e7)]:0x0,_0x223246['y']=_0x2db738?-this[_0x311059(0x4a7)]+_0x2db738[_0x311059(0x1dd)]:0x0;}_0x223246[_0x311059(0x2f4)]=_0x2db738?_0x2db738['blendMode']:0x0,this[_0x311059(0x626)](_0x223246),this['addChild'](_0x223246),_0x223246[_0x311059(0x67b)]=-this[_0x311059(0x67b)];},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x3e0)]=function(){const _0x3b7c05=_0x37ae6a;if(!this['_character'])return;if(this['_character'][_0x3b7c05(0x1e2)]===undefined)return;if(this[_0x3b7c05(0x31f)][_0x3b7c05(0x1e2)]===![])return;this['z']=this['_character'][_0x3b7c05(0x1e2)],this['z']<0x0?this[_0x3b7c05(0x5b0)]['z']=this['z']-0x1:'CPWJb'!==_0x3b7c05(0x38f)?this[_0x3b7c05(0x4e1)]():this[_0x3b7c05(0x5b0)]['z']=0x0;},Sprite_Character[_0x37ae6a(0x3a7)]['updateEventMirrorSprite']=function(){const _0x2533fc=_0x37ae6a;if(!this[_0x2533fc(0x31f)])return;let _0xe48753=!!this['_character'][_0x2533fc(0x2eb)];this[_0x2533fc(0x676)]['x']=Math['abs'](this[_0x2533fc(0x676)]['x'])*(_0xe48753?-0x1:0x1);},Sprite_Character['prototype']['autoEventIconBuffer']=function(_0x47e3a3){const _0x1f393b=_0x37ae6a;_0x47e3a3['x']=0x0,_0x47e3a3['y']=-this[_0x1f393b(0x4a7)]+this[_0x1f393b(0x4a7)]*0x2/0x5;if(this['_character'][_0x1f393b(0x6ed)]()!==0x1){if(_0x1f393b(0x493)===_0x1f393b(0x430)){this['_poseDuration']--;if(this[_0x1f393b(0x404)]<=0x0&&this[_0x1f393b(0x5ae)]!==_0x1f393b(0x1dc))this[_0x1f393b(0x548)]();}else _0x47e3a3['y']+=0x1;}},Sprite_Character[_0x37ae6a(0x3a7)]['getEventIconIndex']=function(){const _0x2cdde9=_0x37ae6a;if(!this[_0x2cdde9(0x31f)])return 0x0;if(this['_character']['_erased'])return 0x0;const _0x6e2b6b=this[_0x2cdde9(0x31f)][_0x2cdde9(0x4a5)]();return _0x6e2b6b?_0x6e2b6b['iconIndex']||0x0:0x0;},Sprite_Character[_0x37ae6a(0x3a7)]['updateAttachPictureSprite']=function(){const _0x426346=_0x37ae6a;if(!this['_attachPictureSprite'])return;if(!this[_0x426346(0x31f)])return;this['setupAttachPictureBitmap'](),this[_0x426346(0x2fc)]();},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x3e1)]=function(){const _0x587d2c=_0x37ae6a;if(!this['needsAttachPictureUpdate']())return;const _0x56c2ad=this[_0x587d2c(0x31f)]['attachPictureSettings']();this[_0x587d2c(0x40b)]=_0x56c2ad[_0x587d2c(0x5a3)],this[_0x587d2c(0x51c)]=_0x56c2ad[_0x587d2c(0x4ff)],this[_0x587d2c(0x282)]=_0x56c2ad['scale'];if(_0x56c2ad[_0x587d2c(0x5a3)]!==''){const _0x3985ee=ImageManager['loadPicture'](_0x56c2ad['filename']);_0x3985ee[_0x587d2c(0x241)](this[_0x587d2c(0x334)]['bind'](this,_0x3985ee));}else this[_0x587d2c(0x625)][_0x587d2c(0x44e)]=new Bitmap(0x1,0x1);},Sprite_Character['prototype']['updateAttachPictureBitmap']=function(){const _0x3b34d5=_0x37ae6a,_0x520755=this[_0x3b34d5(0x625)];_0x520755['x']=this[_0x3b34d5(0x31f)][_0x3b34d5(0x307)](),_0x520755['y']=this[_0x3b34d5(0x31f)][_0x3b34d5(0x4df)](),_0x520755[_0x3b34d5(0x2f4)]=this[_0x3b34d5(0x31f)]['attachPictureBlendMode']();},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x320)]=function(){const _0x584236=_0x37ae6a,_0x5423a2=this[_0x584236(0x31f)][_0x584236(0x5f8)]();if(_0x5423a2){if(_0x584236(0x5c9)!==_0x584236(0x5c9))this['startCallEvent']();else{if(this['_lastAttachPictureFilename']!==_0x5423a2['filename'])return!![];if(this['_lastAttachPictureMaxSize']!==_0x5423a2[_0x584236(0x4ff)])return!![];if(this[_0x584236(0x282)]!==_0x5423a2[_0x584236(0x676)])return!![];}}return![];},Sprite_Character[_0x37ae6a(0x3a7)][_0x37ae6a(0x334)]=function(_0x40691f){const _0x36756f=_0x37ae6a,_0xcf4be7=this[_0x36756f(0x625)];_0xcf4be7['bitmap']=_0x40691f;const _0x3a7cab=this['_character']['attachPictureSettings'](),_0xd9b13f=_0x3a7cab['maxSize'],_0x719f88=_0x3a7cab[_0x36756f(0x676)];let _0x3911c5=0x1;if(_0xd9b13f>0x0){if(_0x36756f(0x4c6)===_0x36756f(0x3b6)){this[_0x36756f(0x611)](_0x438994);if(_0x41cadc['includes'](0x0)&&this[_0x36756f(0x5dc)]()===_0x36756f(0x469))this[_0x36756f(0x2d4)](this['x'],this['y']);else(_0xaddb9c['includes'](0x1)||_0x40f915[_0x36756f(0x6db)](0x2))&&this[_0x36756f(0x41f)]();}else{let _0x13e550=this[_0x36756f(0x207)]()||0x1,_0x1ae62f=this[_0x36756f(0x6e6)]()||0x1;const _0x55c496=Math['max'](0x1,_0x13e550,_0x1ae62f);_0x3911c5=_0xd9b13f/_0x55c496;}}_0x3911c5*=_0x719f88;if(_0x3911c5!==0x1){if(_0x36756f(0x673)===_0x36756f(0x673))this[_0x36756f(0x625)][_0x36756f(0x44e)][_0x36756f(0x2ab)]=!![];else return this['_eventOverload'];}_0xcf4be7[_0x36756f(0x676)]['x']=_0x3911c5,_0xcf4be7[_0x36756f(0x676)]['y']=_0x3911c5,this[_0x36756f(0x643)]=!![],this[_0x36756f(0x2fc)]();},Sprite_Character['prototype'][_0x37ae6a(0x207)]=function(){const _0x31714c=_0x37ae6a,_0x277acc=this['_attachPictureSprite'];if(!_0x277acc)return 0x0;return _0x277acc[_0x31714c(0x44e)][_0x31714c(0x4eb)];},Sprite_Character[_0x37ae6a(0x3a7)]['getAttachPictureBitmapHeight']=function(){const _0x2a62c2=_0x37ae6a,_0x285697=this['_attachPictureSprite'];if(!_0x285697)return 0x0;return _0x285697[_0x2a62c2(0x44e)][_0x2a62c2(0x4a7)];},VisuMZ['EventsMoveCore'][_0x37ae6a(0x246)]=Sprite_Balloon[_0x37ae6a(0x3a7)][_0x37ae6a(0x5ef)],Sprite_Balloon[_0x37ae6a(0x3a7)][_0x37ae6a(0x5ef)]=function(_0x57c2c1,_0x56ba85){const _0x49bea5=_0x37ae6a;VisuMZ[_0x49bea5(0x4de)][_0x49bea5(0x246)][_0x49bea5(0x609)](this,_0x57c2c1,_0x56ba85),VisuMZ[_0x49bea5(0x4de)]['Settings']['VS8'][_0x49bea5(0x35a)]&&(_0x49bea5(0x26a)!==_0x49bea5(0x26a)?(_0x13f80a[_0x49bea5(0x4de)][_0x49bea5(0x5ee)][_0x49bea5(0x609)](this,_0x5909fe,_0x529c2b),this[_0x49bea5(0x45d)]=_0x45b5f2,this[_0x49bea5(0x28c)]=_0x78a1da,this[_0x49bea5(0x4f9)]()):this[_0x49bea5(0x63d)][_0x49bea5(0x31f)]['setBalloonPose'](_0x56ba85,this[_0x49bea5(0x315)]));},VisuMZ[_0x37ae6a(0x4de)]['Sprite_Balloon_updatePosition']=Sprite_Balloon[_0x37ae6a(0x3a7)][_0x37ae6a(0x6b6)],Sprite_Balloon[_0x37ae6a(0x3a7)][_0x37ae6a(0x6b6)]=function(){const _0x5cb488=_0x37ae6a;VisuMZ['EventsMoveCore']['Sprite_Balloon_updatePosition'][_0x5cb488(0x609)](this),this['updateVS8BalloonOffsets']();},Sprite_Balloon[_0x37ae6a(0x3a7)][_0x37ae6a(0x623)]=function(){const _0x38cc20=_0x37ae6a;this['_target']['_character'][_0x38cc20(0x390)]()&&(this['x']+=VisuMZ['EventsMoveCore']['Settings']['VS8'][_0x38cc20(0x513)],this['y']+=VisuMZ[_0x38cc20(0x4de)]['Settings'][_0x38cc20(0x56d)][_0x38cc20(0x526)]);},Sprite_Timer[_0x37ae6a(0x3a7)][_0x37ae6a(0x3ee)]=function(){const _0x3798f8=_0x37ae6a;this[_0x3798f8(0x44e)]=new Bitmap(Math['round'](Graphics[_0x3798f8(0x5d2)]/0x2),0x30),this['bitmap'][_0x3798f8(0x306)]=this['fontFace'](),this['bitmap'][_0x3798f8(0x674)]=this[_0x3798f8(0x674)](),this['bitmap'][_0x3798f8(0x695)]=ColorManager[_0x3798f8(0x695)]();},Sprite_Timer[_0x37ae6a(0x3a7)][_0x37ae6a(0x4a2)]=function(){const _0xe54a65=_0x37ae6a,_0x38adad=Math['floor'](this[_0xe54a65(0x58b)]/0x3c/0x3c),_0x48ec5d=Math['floor'](this[_0xe54a65(0x58b)]/0x3c)%0x3c,_0x2cee66=this[_0xe54a65(0x58b)]%0x3c;let _0x7331c0=_0x48ec5d[_0xe54a65(0x462)](0x2)+':'+_0x2cee66[_0xe54a65(0x462)](0x2);if(_0x38adad>0x0)_0x7331c0=_0xe54a65(0x435)[_0xe54a65(0x51a)](_0x38adad,_0x7331c0);return _0x7331c0;};function Sprite_EventLabel(){const _0x200d64=_0x37ae6a;this[_0x200d64(0x218)](...arguments);}Sprite_EventLabel['prototype']=Object['create'](Sprite[_0x37ae6a(0x3a7)]),Sprite_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x678)]=Sprite_EventLabel,Sprite_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x218)]=function(_0x17244d){const _0xc753b0=_0x37ae6a;this[_0xc753b0(0x3b9)]=_0x17244d,Sprite[_0xc753b0(0x3a7)][_0xc753b0(0x218)][_0xc753b0(0x609)](this),this[_0xc753b0(0x55e)](),this[_0xc753b0(0x52c)]();},Sprite_EventLabel['prototype'][_0x37ae6a(0x55e)]=function(){const _0x10e161=_0x37ae6a;this['anchor']['x']=0.5,this[_0x10e161(0x64f)]['y']=0x1;},Sprite_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x52c)]=function(){const _0x457b84=_0x37ae6a,_0x2b11d3=new Rectangle(0x0,0x0,0x1,0x1);this[_0x457b84(0x4c0)]=new Window_Base(_0x2b11d3),this[_0x457b84(0x4c0)][_0x457b84(0x1f0)]=0x0,this[_0x457b84(0x310)]=this[_0x457b84(0x1d6)]()?0xff:0x0;},Sprite_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x36b)]=function(){const _0x1e5fc5=_0x37ae6a;Sprite['prototype'][_0x1e5fc5(0x36b)][_0x1e5fc5(0x609)](this),this[_0x1e5fc5(0x2b3)](),this[_0x1e5fc5(0x23d)](),this[_0x1e5fc5(0x6b6)](),this[_0x1e5fc5(0x2e5)]();},Sprite_EventLabel['prototype'][_0x37ae6a(0x2b3)]=function(){const _0x1424ba=_0x37ae6a;this[_0x1424ba(0x3b9)][_0x1424ba(0x229)]()!==this[_0x1424ba(0x46c)]&&(_0x1424ba(0x6ce)!==_0x1424ba(0x6ce)?this[_0x1424ba(0x5b0)]['z']=0x0:(this[_0x1424ba(0x46c)]=this[_0x1424ba(0x3b9)][_0x1424ba(0x229)](),this['refresh']()));},Sprite_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x63f)]=function(){const _0x449c37=_0x37ae6a;if(!this['_proxyWindow'])return;this[_0x449c37(0x649)](),this[_0x449c37(0x500)]();},Sprite_EventLabel['prototype'][_0x37ae6a(0x649)]=function(){const _0x491fd1=_0x37ae6a,_0x1c2dc1=this[_0x491fd1(0x4c0)][_0x491fd1(0x237)](this[_0x491fd1(0x46c)]),_0x5cf2d2=this['_proxyWindow'][_0x491fd1(0x537)](),_0x32e995=_0x1c2dc1[_0x491fd1(0x4eb)]+_0x5cf2d2*0x2,_0xc21ba1=_0x1c2dc1[_0x491fd1(0x4a7)];this[_0x491fd1(0x4c0)][_0x491fd1(0x460)](0x0,0x0,_0x32e995,_0xc21ba1),this[_0x491fd1(0x4c0)][_0x491fd1(0x1d1)](),this[_0x491fd1(0x44e)]=this[_0x491fd1(0x4c0)][_0x491fd1(0x5bb)];},Sprite_EventLabel[_0x37ae6a(0x3a7)]['drawText']=function(){const _0x5d4f7f=_0x37ae6a,_0x2a8c44=this[_0x5d4f7f(0x4c0)][_0x5d4f7f(0x537)]();this['_proxyWindow']['drawTextEx'](this[_0x5d4f7f(0x46c)],_0x2a8c44,0x0);},Sprite_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x23d)]=function(){const _0x534544=_0x37ae6a,_0x2670b5=VisuMZ[_0x534544(0x4de)][_0x534544(0x556)][_0x534544(0x613)][_0x534544(0x2fa)],_0xa8071e=$gameSystem[_0x534544(0x25e)]()||0x1;this[_0x534544(0x676)]['x']=this[_0x534544(0x676)]['y']=_0x2670b5/_0xa8071e;},Sprite_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x6b6)]=function(){const _0x9edc03=_0x37ae6a;if(!SceneManager[_0x9edc03(0x688)])return;if(!SceneManager['_scene']['_spriteset'])return;const _0x3b06ad=SceneManager[_0x9edc03(0x688)]['_spriteset'][_0x9edc03(0x667)](this['_event']);if(!_0x3b06ad)return;this['x']=this[_0x9edc03(0x3b9)][_0x9edc03(0x4e8)](),this['x']+=this['_event']['_labelWindow'][_0x9edc03(0x321)],this['y']=this[_0x9edc03(0x3b9)][_0x9edc03(0x3f3)]()-_0x3b06ad['height'],this['y']+=$gameSystem['windowPadding']()*-0.5,this['y']+=this[_0x9edc03(0x3b9)][_0x9edc03(0x209)][_0x9edc03(0x3ed)];},Sprite_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x2e5)]=function(){const _0xd83c97=_0x37ae6a;if(this[_0xd83c97(0x1d6)]())this[_0xd83c97(0x310)]+=this[_0xd83c97(0x46b)]();else SceneManager[_0xd83c97(0x688)][_0xd83c97(0x259)]>0x0?this['opacity']=0x0:this[_0xd83c97(0x310)]-=this[_0xd83c97(0x46b)]();},Sprite_EventLabel['prototype'][_0x37ae6a(0x1d6)]=function(){const _0x46eb1b=_0x37ae6a;if(!$gameSystem[_0x46eb1b(0x689)]())return![];if(this[_0x46eb1b(0x3b9)]?.['_erased'])return![];if(this[_0x46eb1b(0x3b9)]&&this['_event']['_pageIndex']<0x0)return![];if(SceneManager[_0x46eb1b(0x688)][_0x46eb1b(0x259)]>0x0)return![];const _0x57604f=$gamePlayer['x'],_0x2da467=$gamePlayer['y'],_0x428019=this[_0x46eb1b(0x3b9)]['x'],_0x50ea0d=this['_event']['y'];if(this['_visiblePlayerX']===_0x57604f&&this[_0x46eb1b(0x1e3)]===_0x2da467&&this[_0x46eb1b(0x1e0)]===_0x428019&&this['_visibleEventY']===_0x50ea0d)return this['_cacheVisibility'];this[_0x46eb1b(0x445)]=$gamePlayer['x'],this[_0x46eb1b(0x1e3)]=$gamePlayer['y'],this['_visibleEventX']=this[_0x46eb1b(0x3b9)]['x'],this[_0x46eb1b(0x543)]=this[_0x46eb1b(0x3b9)]['y'];if($gameMap[_0x46eb1b(0x338)](_0x57604f,_0x2da467,_0x428019,_0x50ea0d)>this[_0x46eb1b(0x3b9)][_0x46eb1b(0x350)]())return this[_0x46eb1b(0x594)]=![],![];return this['_cacheVisibility']=!![],!![];},Sprite_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x46b)]=function(){const _0x167171=_0x37ae6a;return VisuMZ[_0x167171(0x4de)]['Settings'][_0x167171(0x613)][_0x167171(0x2a9)];},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x2db)]=Spriteset_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x6a4)],Spriteset_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x6a4)]=function(){const _0xe516d7=_0x37ae6a;VisuMZ[_0xe516d7(0x4de)][_0xe516d7(0x2db)]['call'](this),this[_0xe516d7(0x481)]();},VisuMZ['EventsMoveCore'][_0x37ae6a(0x684)]=Spriteset_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x5b8)],Spriteset_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x5b8)]=function(){const _0x43a8e3=_0x37ae6a;VisuMZ[_0x43a8e3(0x4de)][_0x43a8e3(0x684)]['call'](this),this['createShadows']();},Spriteset_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x641)]=function(){const _0x8663c6=_0x37ae6a;if(!VisuMZ['EventsMoveCore'][_0x8663c6(0x556)]['Movement'][_0x8663c6(0x2c4)])return;for(const _0x3fd9a2 of this['_characterSprites']){this['createCharacterShadow'](_0x3fd9a2);}},Spriteset_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x299)]=function(_0x59b743){const _0x48c22c=_0x37ae6a;_0x59b743[_0x48c22c(0x5b0)]=new Sprite(),_0x59b743[_0x48c22c(0x5b0)][_0x48c22c(0x4c9)]=_0x59b743['_character'][_0x48c22c(0x20d)](),_0x59b743[_0x48c22c(0x5b0)][_0x48c22c(0x44e)]=ImageManager[_0x48c22c(0x597)](_0x59b743[_0x48c22c(0x5b0)][_0x48c22c(0x4c9)]),_0x59b743['_shadowSprite']['anchor']['x']=0.5,_0x59b743[_0x48c22c(0x5b0)][_0x48c22c(0x64f)]['y']=0x1,_0x59b743[_0x48c22c(0x5b0)]['z']=0x0,this[_0x48c22c(0x202)][_0x48c22c(0x621)](_0x59b743['_shadowSprite']);},Spriteset_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x2f5)]=function(){const _0x283670=_0x37ae6a;if(!VisuMZ[_0x283670(0x4de)]['Settings'][_0x283670(0x1e5)][_0x283670(0x2c4)])return;for(const _0x36af71 of this[_0x283670(0x5b4)]){this['_tilemap'][_0x283670(0x626)](_0x36af71['_shadowSprite']);}},Spriteset_Map['prototype'][_0x37ae6a(0x481)]=function(){const _0x171243=_0x37ae6a;this[_0x171243(0x491)]=[];for(const _0x37ef3c of $gameMap['events']()){if(_0x171243(0x272)===_0x171243(0x701))return this[_0x171243(0x32d)](_0x3d8312(_0x1d9ba1['$1']),_0x33bfde(_0x4e7dcb['$2']));else this['createLabelWindowForTarget'](_0x37ef3c);}},Spriteset_Map[_0x37ae6a(0x3a7)]['createLabelWindowForTarget']=function(_0x27b7c8){const _0x3c73e4=_0x37ae6a;if(!this[_0x3c73e4(0x55a)](_0x27b7c8))return;let _0x36ab2f;const _0x17a48b=VisuMZ[_0x3c73e4(0x4de)][_0x3c73e4(0x556)][_0x3c73e4(0x613)][_0x3c73e4(0x604)]??!![];_0x36ab2f=_0x17a48b?new Sprite_EventLabel(_0x27b7c8):new Window_EventLabel(_0x27b7c8),_0x36ab2f['z']=0x8,_0x36ab2f['spriteId']=Sprite['_counter']++,this['_tilemap'][_0x3c73e4(0x621)](_0x36ab2f),this[_0x3c73e4(0x491)][_0x3c73e4(0x6bf)](_0x36ab2f);},Spriteset_Map[_0x37ae6a(0x3a7)]['isTargetEventValidForLabelWindow']=function(_0x168bfe){const _0x4465e3=_0x37ae6a,_0xca5749=_0x168bfe['event']();if(_0xca5749[_0x4465e3(0x616)][_0x4465e3(0x6b7)](/<LABEL:[ ](.*?)>/i))return!![];if(_0xca5749[_0x4465e3(0x616)][_0x4465e3(0x6b7)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x5dee18 of _0xca5749['pages']){let _0x22da15='';for(const _0x101bd0 of _0x5dee18[_0x4465e3(0x1e6)]){[0x6c,0x198][_0x4465e3(0x6db)](_0x101bd0[_0x4465e3(0x4cd)])&&(_0x22da15+=_0x101bd0['parameters'][0x0]);}if(_0x22da15['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x22da15[_0x4465e3(0x6b7)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x37ae6a(0x3a7)][_0x37ae6a(0x6bd)]=function(_0x14e88b){const _0x11d945=_0x37ae6a;this['_characterSprites']=this[_0x11d945(0x5b4)]||[];const _0x1df513=new Sprite_Character(_0x14e88b);this[_0x11d945(0x5b4)][_0x11d945(0x6bf)](_0x1df513),this[_0x11d945(0x202)][_0x11d945(0x621)](_0x1df513),this[_0x11d945(0x299)](_0x1df513),this[_0x11d945(0x4ad)](_0x14e88b),_0x1df513[_0x11d945(0x36b)]();},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x1e7)]=Game_Message[_0x37ae6a(0x3a7)][_0x37ae6a(0x642)],Game_Message[_0x37ae6a(0x3a7)][_0x37ae6a(0x642)]=function(_0x596092,_0x2d169b){const _0x429f4f=_0x37ae6a;this[_0x429f4f(0x39b)]=$gameTemp[_0x429f4f(0x2d9)](),VisuMZ[_0x429f4f(0x4de)][_0x429f4f(0x1e7)][_0x429f4f(0x609)](this,_0x596092,_0x2d169b);},VisuMZ['EventsMoveCore'][_0x37ae6a(0x571)]=Window_NumberInput[_0x37ae6a(0x3a7)][_0x37ae6a(0x480)],Window_NumberInput[_0x37ae6a(0x3a7)]['start']=function(){const _0x29007c=_0x37ae6a;$gameTemp[_0x29007c(0x4c2)]($gameMessage[_0x29007c(0x39b)]),VisuMZ['EventsMoveCore'][_0x29007c(0x571)][_0x29007c(0x609)](this),$gameTemp[_0x29007c(0x5f2)]();},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x2f2)]=Window_NumberInput[_0x37ae6a(0x3a7)]['processOk'],Window_NumberInput[_0x37ae6a(0x3a7)]['processOk']=function(){const _0x607959=_0x37ae6a;$gameTemp[_0x607959(0x4c2)]($gameMessage[_0x607959(0x39b)]),VisuMZ[_0x607959(0x4de)][_0x607959(0x2f2)][_0x607959(0x609)](this),$gameTemp['clearSelfTarget'](),$gameMessage['_selfTargetNumberInput']=undefined;},VisuMZ['EventsMoveCore']['Game_Message_setItemChoice']=Game_Message[_0x37ae6a(0x3a7)]['setItemChoice'],Game_Message[_0x37ae6a(0x3a7)][_0x37ae6a(0x328)]=function(_0x3f7a78,_0x54833d){const _0x24ed98=_0x37ae6a;this['_selfTargetItemChoice']=$gameTemp[_0x24ed98(0x2d9)](),VisuMZ[_0x24ed98(0x4de)][_0x24ed98(0x6b1)][_0x24ed98(0x609)](this,_0x3f7a78,_0x54833d);},VisuMZ[_0x37ae6a(0x4de)]['Window_EventItem_onOk']=Window_EventItem[_0x37ae6a(0x3a7)]['onOk'],Window_EventItem[_0x37ae6a(0x3a7)]['onOk']=function(){const _0x5e70e7=_0x37ae6a;$gameTemp[_0x5e70e7(0x4c2)]($gameMessage[_0x5e70e7(0x20b)]),VisuMZ[_0x5e70e7(0x4de)][_0x5e70e7(0x28a)]['call'](this),$gameTemp[_0x5e70e7(0x5f2)](),$gameMessage[_0x5e70e7(0x20b)]=undefined;},VisuMZ['EventsMoveCore'][_0x37ae6a(0x6ef)]=Window_EventItem[_0x37ae6a(0x3a7)]['onCancel'],Window_EventItem[_0x37ae6a(0x3a7)]['onCancel']=function(){const _0x52c75e=_0x37ae6a;$gameTemp[_0x52c75e(0x4c2)]($gameMessage[_0x52c75e(0x20b)]),VisuMZ[_0x52c75e(0x4de)]['Window_EventItem_onCancel']['call'](this),$gameTemp[_0x52c75e(0x5f2)](),$gameMessage['_selfTargetItemChoice']=undefined;},VisuMZ[_0x37ae6a(0x4de)][_0x37ae6a(0x3e4)]=Window_Message[_0x37ae6a(0x3a7)]['startMessage'],Window_Message[_0x37ae6a(0x3a7)][_0x37ae6a(0x1f6)]=function(){const _0x4da227=_0x37ae6a;$gameMessage['registerSelfEvent'](),VisuMZ[_0x4da227(0x4de)][_0x4da227(0x3e4)][_0x4da227(0x609)](this),$gameTemp[_0x4da227(0x5f2)]();},VisuMZ['EventsMoveCore'][_0x37ae6a(0x5fa)]=Window_ScrollText[_0x37ae6a(0x3a7)]['startMessage'],Window_ScrollText[_0x37ae6a(0x3a7)][_0x37ae6a(0x1f6)]=function(){const _0x2f7b0f=_0x37ae6a;$gameMessage[_0x2f7b0f(0x6a1)](),VisuMZ[_0x2f7b0f(0x4de)][_0x2f7b0f(0x5fa)][_0x2f7b0f(0x609)](this),$gameTemp[_0x2f7b0f(0x5f2)]();};function Window_EventLabel(){const _0x37f64a=_0x37ae6a;this[_0x37f64a(0x218)](...arguments);}Window_EventLabel['prototype']=Object[_0x37ae6a(0x212)](Window_Base[_0x37ae6a(0x3a7)]),Window_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x678)]=Window_EventLabel,Window_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x218)]=function(_0xbacc94){const _0xd14e6d=_0x37ae6a;this[_0xd14e6d(0x3b9)]=_0xbacc94;const _0x4d3180=new Rectangle(0x0,0x0,Graphics[_0xd14e6d(0x5d2)]/0x4,this[_0xd14e6d(0x39f)](0x1));this[_0xd14e6d(0x55e)](),Window_Base['prototype']['initialize'][_0xd14e6d(0x609)](this,_0x4d3180),this[_0xd14e6d(0x24c)]=0x0,this[_0xd14e6d(0x6e5)](0x2),this[_0xd14e6d(0x46c)]='';},Window_EventLabel['prototype'][_0x37ae6a(0x55e)]=function(){const _0x14e179=_0x37ae6a;this[_0x14e179(0x23b)]=![],this[_0x14e179(0x6c7)]=$gameScreen[_0x14e179(0x550)](),this[_0x14e179(0x5ec)]=this[_0x14e179(0x3b9)]['screenX'](),this[_0x14e179(0x668)]=this['_event'][_0x14e179(0x3f3)](),this[_0x14e179(0x598)]=this[_0x14e179(0x3b9)][_0x14e179(0x209)][_0x14e179(0x321)],this[_0x14e179(0x1cf)]=this[_0x14e179(0x3b9)]['_labelWindow']['offsetY'],this['_eventPageIndex']=this[_0x14e179(0x3b9)][_0x14e179(0x1e8)],this['_cacheVisibility']=this['isLabelVisible'](),this['_cacheSystemVisible']=$gameSystem[_0x14e179(0x689)](),this['_visiblePlayerX']=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x14e179(0x1e0)]=this['_event']['x'],this[_0x14e179(0x543)]=this[_0x14e179(0x3b9)]['y'];},Window_EventLabel['prototype'][_0x37ae6a(0x36b)]=function(){const _0x30393e=_0x37ae6a;Window_Base['prototype'][_0x30393e(0x36b)]['call'](this);if(!this['needsUpdate']())return;this[_0x30393e(0x2b3)](),this[_0x30393e(0x23d)](),this[_0x30393e(0x6b6)](),this[_0x30393e(0x2e5)]();},Window_EventLabel['prototype']['needsUpdate']=function(){const _0x13a81e=_0x37ae6a;if(!this[_0x13a81e(0x3b9)])return![];if(!this[_0x13a81e(0x3b9)][_0x13a81e(0x209)])return![];if(this[_0x13a81e(0x4c8)]!==this[_0x13a81e(0x3b9)]['_pageIndex'])return!![];if(this['_event'][_0x13a81e(0x39e)]&&!this[_0x13a81e(0x23b)])return!![];if(this[_0x13a81e(0x3b9)][_0x13a81e(0x209)][_0x13a81e(0x559)]==='')return![];if(this[_0x13a81e(0x6c7)]!==$gameScreen[_0x13a81e(0x550)]())return!![];if(this[_0x13a81e(0x5ec)]!==this['_event'][_0x13a81e(0x4e8)]())return!![];if(this[_0x13a81e(0x668)]!==this[_0x13a81e(0x3b9)][_0x13a81e(0x3f3)]())return!![];if(this[_0x13a81e(0x598)]!==this[_0x13a81e(0x3b9)][_0x13a81e(0x209)][_0x13a81e(0x321)])return!![];if(this[_0x13a81e(0x1cf)]!==this[_0x13a81e(0x3b9)][_0x13a81e(0x209)]['offsetY'])return!![];if(this[_0x13a81e(0x445)]!==$gamePlayer['x'])return!![];if(this[_0x13a81e(0x1e3)]!==$gamePlayer['y'])return!![];if(this[_0x13a81e(0x1e0)]!==this[_0x13a81e(0x3b9)]['x'])return!![];if(this[_0x13a81e(0x543)]!==this[_0x13a81e(0x3b9)]['y'])return!![];if(this['_cacheSystemVisible']!==$gameSystem[_0x13a81e(0x689)]())return!![];if(this['_cacheVisibility']&&this[_0x13a81e(0x24c)]<0xff)return!![];if(!this[_0x13a81e(0x594)]&&this[_0x13a81e(0x24c)]>0x0)return!![];if(SceneManager[_0x13a81e(0x688)][_0x13a81e(0x259)]>0x0)return!![];return![];},Window_EventLabel['prototype']['updateText']=function(){const _0x3d4c81=_0x37ae6a;this['_event'][_0x3d4c81(0x229)]()!==this[_0x3d4c81(0x46c)]&&(this[_0x3d4c81(0x46c)]=this[_0x3d4c81(0x3b9)][_0x3d4c81(0x229)](),this[_0x3d4c81(0x63f)]());},Window_EventLabel[_0x37ae6a(0x3a7)]['updateScale']=function(){const _0xb791e8=_0x37ae6a;this[_0xb791e8(0x676)]['x']=0x1/$gameScreen[_0xb791e8(0x550)](),this[_0xb791e8(0x676)]['y']=0x1/$gameScreen['zoomScale'](),this[_0xb791e8(0x6c7)]=$gameScreen['zoomScale']();},Window_EventLabel[_0x37ae6a(0x3a7)]['updatePosition']=function(){const _0x2654c2=_0x37ae6a;if(!SceneManager[_0x2654c2(0x688)])return;if(!SceneManager[_0x2654c2(0x688)][_0x2654c2(0x658)])return;const _0x3f58f4=SceneManager[_0x2654c2(0x688)][_0x2654c2(0x658)][_0x2654c2(0x667)](this[_0x2654c2(0x3b9)]);if(!_0x3f58f4)return;this['x']=Math[_0x2654c2(0x647)](this[_0x2654c2(0x3b9)][_0x2654c2(0x4e8)]()-Math['floor'](this[_0x2654c2(0x4eb)]*this[_0x2654c2(0x676)]['x']/0x2)),this['x']+=this[_0x2654c2(0x3b9)][_0x2654c2(0x209)][_0x2654c2(0x321)],this['y']=this[_0x2654c2(0x3b9)][_0x2654c2(0x3f3)]()-_0x3f58f4[_0x2654c2(0x4a7)],this['y']+=Math[_0x2654c2(0x647)]($gameSystem[_0x2654c2(0x407)]()*0.5),this['y']-=Math[_0x2654c2(0x647)](this[_0x2654c2(0x4a7)]*this['scale']['y']),this['y']+=this['_event'][_0x2654c2(0x209)][_0x2654c2(0x3ed)],this[_0x2654c2(0x23b)]=this[_0x2654c2(0x3b9)][_0x2654c2(0x39e)],this['_eventScreenX']=this[_0x2654c2(0x3b9)][_0x2654c2(0x4e8)](),this[_0x2654c2(0x668)]=this[_0x2654c2(0x3b9)]['screenY'](),this[_0x2654c2(0x598)]=this[_0x2654c2(0x3b9)]['_labelWindow']['offsetX'],this[_0x2654c2(0x1cf)]=this['_event']['_labelWindow'][_0x2654c2(0x3ed)],this[_0x2654c2(0x4c8)]=this[_0x2654c2(0x3b9)][_0x2654c2(0x1e8)],this[_0x2654c2(0x23b)]&&(this[_0x2654c2(0x24c)]=0x0);},Window_EventLabel['prototype']['updateOpacity']=function(){const _0x50140e=_0x37ae6a;if(this[_0x50140e(0x1d6)]())this[_0x50140e(0x24c)]+=this[_0x50140e(0x46b)]();else{if(SceneManager['_scene'][_0x50140e(0x259)]>0x0){if('pcbtE'===_0x50140e(0x3cd)){const _0x1d3c5e=this[_0x50140e(0x625)];_0x1d3c5e['x']=this[_0x50140e(0x31f)]['attachPictureOffsetX'](),_0x1d3c5e['y']=this[_0x50140e(0x31f)][_0x50140e(0x4df)](),_0x1d3c5e[_0x50140e(0x2f4)]=this[_0x50140e(0x31f)]['attachPictureBlendMode']();}else this[_0x50140e(0x24c)]=0x0;}else _0x50140e(0x2a6)!==_0x50140e(0x6f2)?this[_0x50140e(0x24c)]-=this[_0x50140e(0x46b)]():(_0x47d686['prototype'][_0x50140e(0x36b)][_0x50140e(0x609)](this),this[_0x50140e(0x2b3)](),this[_0x50140e(0x23d)](),this['updatePosition'](),this[_0x50140e(0x2e5)]());}},Window_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x1d6)]=function(){const _0x3ceec1=_0x37ae6a;if(!$gameSystem[_0x3ceec1(0x689)]())return![];if(this[_0x3ceec1(0x3b9)]?.['_erased'])return![];if(SceneManager[_0x3ceec1(0x688)][_0x3ceec1(0x259)]>0x0)return![];const _0x5bfbb5=$gamePlayer['x'],_0x32ceee=$gamePlayer['y'],_0x6cd7f=this[_0x3ceec1(0x3b9)]['x'],_0x184edd=this[_0x3ceec1(0x3b9)]['y'];if(this[_0x3ceec1(0x445)]===_0x5bfbb5&&this[_0x3ceec1(0x1e3)]===_0x32ceee&&this[_0x3ceec1(0x1e0)]===_0x6cd7f&&this[_0x3ceec1(0x543)]===_0x184edd)return'ENTCl'===_0x3ceec1(0x23c)?this[_0x3ceec1(0x594)]:this[_0x3ceec1(0x48e)](_0x384d73);this[_0x3ceec1(0x445)]=$gamePlayer['x'],this[_0x3ceec1(0x1e3)]=$gamePlayer['y'],this[_0x3ceec1(0x1e0)]=this[_0x3ceec1(0x3b9)]['x'],this[_0x3ceec1(0x543)]=this[_0x3ceec1(0x3b9)]['y'];if($gameMap[_0x3ceec1(0x338)](_0x5bfbb5,_0x32ceee,_0x6cd7f,_0x184edd)>this[_0x3ceec1(0x3b9)]['labelWindowRange']())return this[_0x3ceec1(0x594)]=![],![];return this['_cacheVisibility']=!![],!![];},Window_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x46b)]=function(){const _0x1b4b16=_0x37ae6a;return VisuMZ[_0x1b4b16(0x4de)][_0x1b4b16(0x556)]['Label'][_0x1b4b16(0x2a9)];},Window_EventLabel[_0x37ae6a(0x3a7)]['resizeWindow']=function(){const _0x1fdf06=_0x37ae6a,_0x369dcf=this['textSizeEx'](this[_0x1fdf06(0x46c)]);this['width']=_0x369dcf[_0x1fdf06(0x4eb)]+($gameSystem['windowPadding']()+this[_0x1fdf06(0x537)]())*0x2,this['height']=Math[_0x1fdf06(0x319)](this[_0x1fdf06(0x4e7)](),_0x369dcf[_0x1fdf06(0x4a7)])+$gameSystem['windowPadding']()*0x2,this['createContents']();},Window_EventLabel['prototype']['lineHeight']=function(){const _0x3bf1b7=_0x37ae6a;return VisuMZ[_0x3bf1b7(0x4de)]['Settings'][_0x3bf1b7(0x613)][_0x3bf1b7(0x2f7)];},Window_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x3c4)]=function(){const _0x10fc01=_0x37ae6a;Window_Base['prototype'][_0x10fc01(0x3c4)][_0x10fc01(0x609)](this),this[_0x10fc01(0x5bb)][_0x10fc01(0x674)]=this[_0x10fc01(0x63c)]();},Window_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x63c)]=function(){const _0x4b9ae7=_0x37ae6a;return VisuMZ['EventsMoveCore'][_0x4b9ae7(0x556)][_0x4b9ae7(0x613)][_0x4b9ae7(0x2fa)];},Window_EventLabel[_0x37ae6a(0x3a7)][_0x37ae6a(0x63f)]=function(){const _0x29219b=_0x37ae6a;this[_0x29219b(0x649)](),this[_0x29219b(0x5bb)][_0x29219b(0x584)]();const _0x504efa=this[_0x29219b(0x46c)][_0x29219b(0x5ed)](/[\r\n]+/);let _0x2937ff=0x0;for(const _0x15575d of _0x504efa){const _0x41412f=this[_0x29219b(0x237)](_0x15575d),_0x339fe0=Math[_0x29219b(0x69e)]((this[_0x29219b(0x29b)]-_0x41412f[_0x29219b(0x4eb)])/0x2);this[_0x29219b(0x675)](_0x15575d,_0x339fe0,_0x2937ff),_0x2937ff+=_0x41412f[_0x29219b(0x4a7)];}},Window_EventLabel[_0x37ae6a(0x3a7)]['processDrawIcon']=function(_0x2ccfa9,_0x16f86d){const _0x1d060d=_0x37ae6a;_0x16f86d['drawing']&&this[_0x1d060d(0x6fd)](_0x2ccfa9,_0x16f86d['x']+0x2,_0x16f86d['y']),_0x16f86d['x']+=Math[_0x1d060d(0x62f)](this[_0x1d060d(0x650)](),ImageManager[_0x1d060d(0x367)])+0x4;},Window_EventLabel['prototype'][_0x37ae6a(0x6fd)]=function(_0x475e4b,_0x2d4824,_0x1d1360){const _0x579297=_0x37ae6a,_0x1e4602=ImageManager[_0x579297(0x597)]('IconSet'),_0x566214=ImageManager[_0x579297(0x367)],_0x535643=ImageManager[_0x579297(0x477)],_0x5aa766=_0x475e4b%0x10*_0x566214,_0x469791=Math[_0x579297(0x69e)](_0x475e4b/0x10)*_0x535643,_0x23ddf9=Math[_0x579297(0x62f)](this[_0x579297(0x650)]()),_0xdfe080=Math[_0x579297(0x62f)](this[_0x579297(0x650)]());this['contents'][_0x579297(0x402)](_0x1e4602,_0x5aa766,_0x469791,_0x566214,_0x535643,_0x2d4824,_0x1d1360,_0x23ddf9,_0xdfe080);},Window_EventLabel[_0x37ae6a(0x3a7)]['iconSize']=function(){const _0x5a6935=_0x37ae6a;return VisuMZ['EventsMoveCore'][_0x5a6935(0x556)]['Label'][_0x5a6935(0x396)];};