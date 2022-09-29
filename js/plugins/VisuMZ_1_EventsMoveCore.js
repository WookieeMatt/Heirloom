//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.46;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.46] [EventsMoveCore]
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
 * Version 1.46: September 29, 2022
 * * Bug Fixes!
 * ** Altered the self switch auto-reset timing to reduce errors. Fix by Arisu.
 * * Feature Update!
 * ** Added self-movement prevention whenever scenes are deactivated. Update
 *    made by Arisu.
 * 
 * Version 1.45: August 18, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused event labels with variables from refreshing
 *    properly. Fix made by Arisu.
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

const _0x1f220f=_0x2539;(function(_0x1ce482,_0x306031){const _0x469619=_0x2539,_0x186520=_0x1ce482();while(!![]){try{const _0x19dcbf=-parseInt(_0x469619(0x377))/0x1*(-parseInt(_0x469619(0x459))/0x2)+parseInt(_0x469619(0x3b1))/0x3*(parseInt(_0x469619(0x29e))/0x4)+parseInt(_0x469619(0x337))/0x5+-parseInt(_0x469619(0x2ad))/0x6*(-parseInt(_0x469619(0x5bc))/0x7)+parseInt(_0x469619(0x503))/0x8+-parseInt(_0x469619(0xf6))/0x9+-parseInt(_0x469619(0x3c8))/0xa;if(_0x19dcbf===_0x306031)break;else _0x186520['push'](_0x186520['shift']());}catch(_0x5952ef){_0x186520['push'](_0x186520['shift']());}}}(_0x3155,0x8a8bc));var label='EventsMoveCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1f220f(0x1ea)](function(_0x41a32d){const _0x34eb3a=_0x1f220f;return _0x41a32d[_0x34eb3a(0x1db)]&&_0x41a32d[_0x34eb3a(0x3ac)][_0x34eb3a(0x220)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x1f220f(0x454)]||{},VisuMZ[_0x1f220f(0x239)]=function(_0xb81a93,_0x536b82){const _0x35590d=_0x1f220f;for(const _0x210483 in _0x536b82){if(_0x210483[_0x35590d(0x4db)](/(.*):(.*)/i)){if('IpUMO'==='IpUMO'){const _0x588e7a=String(RegExp['$1']),_0x1a9c44=String(RegExp['$2'])[_0x35590d(0x38b)]()['trim']();let _0x190b15,_0x49192a,_0x215601;switch(_0x1a9c44){case _0x35590d(0xc2):_0x190b15=_0x536b82[_0x210483]!==''?Number(_0x536b82[_0x210483]):0x0;break;case _0x35590d(0x24d):_0x49192a=_0x536b82[_0x210483]!==''?JSON['parse'](_0x536b82[_0x210483]):[],_0x190b15=_0x49192a[_0x35590d(0x3a3)](_0x32e10c=>Number(_0x32e10c));break;case _0x35590d(0xcd):_0x190b15=_0x536b82[_0x210483]!==''?eval(_0x536b82[_0x210483]):null;break;case'ARRAYEVAL':_0x49192a=_0x536b82[_0x210483]!==''?JSON[_0x35590d(0x17f)](_0x536b82[_0x210483]):[],_0x190b15=_0x49192a[_0x35590d(0x3a3)](_0x56de5f=>eval(_0x56de5f));break;case _0x35590d(0x16b):_0x190b15=_0x536b82[_0x210483]!==''?JSON['parse'](_0x536b82[_0x210483]):'';break;case _0x35590d(0x29f):_0x49192a=_0x536b82[_0x210483]!==''?JSON[_0x35590d(0x17f)](_0x536b82[_0x210483]):[],_0x190b15=_0x49192a[_0x35590d(0x3a3)](_0x5f9c7=>JSON[_0x35590d(0x17f)](_0x5f9c7));break;case _0x35590d(0x5e4):_0x190b15=_0x536b82[_0x210483]!==''?new Function(JSON['parse'](_0x536b82[_0x210483])):new Function('return\x200');break;case'ARRAYFUNC':_0x49192a=_0x536b82[_0x210483]!==''?JSON[_0x35590d(0x17f)](_0x536b82[_0x210483]):[],_0x190b15=_0x49192a['map'](_0x3f9377=>new Function(JSON[_0x35590d(0x17f)](_0x3f9377)));break;case _0x35590d(0x23c):_0x190b15=_0x536b82[_0x210483]!==''?String(_0x536b82[_0x210483]):'';break;case _0x35590d(0x301):_0x49192a=_0x536b82[_0x210483]!==''?JSON['parse'](_0x536b82[_0x210483]):[],_0x190b15=_0x49192a[_0x35590d(0x3a3)](_0x558fb9=>String(_0x558fb9));break;case _0x35590d(0x304):_0x215601=_0x536b82[_0x210483]!==''?JSON[_0x35590d(0x17f)](_0x536b82[_0x210483]):{},_0xb81a93[_0x588e7a]={},VisuMZ[_0x35590d(0x239)](_0xb81a93[_0x588e7a],_0x215601);continue;case'ARRAYSTRUCT':_0x49192a=_0x536b82[_0x210483]!==''?JSON[_0x35590d(0x17f)](_0x536b82[_0x210483]):[],_0x190b15=_0x49192a[_0x35590d(0x3a3)](_0x5111a5=>VisuMZ[_0x35590d(0x239)]({},JSON[_0x35590d(0x17f)](_0x5111a5)));break;default:continue;}_0xb81a93[_0x588e7a]=_0x190b15;}else return this['_patternLocked']=![];}}return _0xb81a93;},(_0x2a05e5=>{const _0x51e933=_0x1f220f,_0x183050=_0x2a05e5['name'];for(const _0x425ba2 of dependencies){if(!Imported[_0x425ba2]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x51e933(0x2c0)](_0x183050,_0x425ba2)),SceneManager[_0x51e933(0x1dd)]();break;}}const _0x2f3361=_0x2a05e5[_0x51e933(0x3ac)];if(_0x2f3361[_0x51e933(0x4db)](/\[Version[ ](.*?)\]/i)){const _0x4c56de=Number(RegExp['$1']);if(_0x4c56de!==VisuMZ[label]['version']){if(_0x51e933(0x2da)===_0x51e933(0x2b4)){_0x5aa9b1['ConvertParams'](_0x57c0be,_0x225ea1);const _0x2d14b0=_0x4f4e02[_0x51e933(0x196)]();if(!_0x37b7ba)return;const _0x761c06=_0x3cd7a0['event'](_0x14db0d[_0x51e933(0x312)]||_0x2d14b0[_0x51e933(0x3d6)]());if(_0x761c06)_0x761c06['saveEventLocation']();}else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x51e933(0x2c0)](_0x183050,_0x4c56de)),SceneManager[_0x51e933(0x1dd)]();}}if(_0x2f3361['match'](/\[Tier[ ](\d+)\]/i)){const _0xcbc5ed=Number(RegExp['$1']);_0xcbc5ed<tier?(alert(_0x51e933(0x514)[_0x51e933(0x2c0)](_0x183050,_0xcbc5ed,tier)),SceneManager[_0x51e933(0x1dd)]()):tier=Math['max'](_0xcbc5ed,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x51e933(0x454)],_0x2a05e5[_0x51e933(0x218)]);})(pluginData),VisuMZ[_0x1f220f(0x48a)]=function(_0x225ce1,_0x1c052e,_0x1a60e6){switch(_0x1a60e6){case'=':return _0x1c052e;break;case'+':return _0x225ce1+_0x1c052e;break;case'-':return _0x225ce1-_0x1c052e;break;case'*':return _0x225ce1*_0x1c052e;break;case'/':return _0x225ce1/_0x1c052e;break;case'%':return _0x225ce1%_0x1c052e;break;}return _0x225ce1;},PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x555),_0x922418=>{const _0x2b8603=_0x1f220f;VisuMZ[_0x2b8603(0x239)](_0x922418,_0x922418);switch(_0x922418[_0x2b8603(0x3cd)]){case _0x2b8603(0x425):$gameSystem[_0x2b8603(0xc1)](!![]);break;case _0x2b8603(0x5da):$gameSystem['setAllowEventAutoMovement'](![]);break;case _0x2b8603(0x368):$gameSystem[_0x2b8603(0xc1)](!$gameSystem[_0x2b8603(0x4d8)]());break;}}),PluginManager['registerCommand'](pluginData['name'],_0x1f220f(0x39d),_0x2e6910=>{const _0x1362ff=_0x1f220f;VisuMZ[_0x1362ff(0x239)](_0x2e6910,_0x2e6910);const _0x413908=$gameTemp['getLastPluginCommandInterpreter'](),_0x26cc31={'mapId':_0x2e6910['MapId'],'eventId':_0x2e6910[_0x1362ff(0x312)]||_0x413908[_0x1362ff(0x3d6)](),'pageId':_0x2e6910[_0x1362ff(0x3a5)]};if(_0x26cc31[_0x1362ff(0x3be)]<=0x0)_0x26cc31[_0x1362ff(0x3be)]=$gameMap?$gameMap[_0x1362ff(0x3be)]():0x1;$gameTemp[_0x1362ff(0x196)]()[_0x1362ff(0x58f)](_0x26cc31);}),PluginManager[_0x1f220f(0x227)](pluginData['name'],_0x1f220f(0x437),_0xaa1395=>{const _0x46970f=_0x1f220f;VisuMZ[_0x46970f(0x239)](_0xaa1395,_0xaa1395);switch(_0xaa1395['Value']){case'Enable':$gameSystem[_0x46970f(0x576)](!![]);break;case _0x46970f(0x1e6):$gameSystem[_0x46970f(0x576)](![]);break;case _0x46970f(0x368):$gameSystem[_0x46970f(0x576)](!$gameSystem['isDashingEnabled']());break;}}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x470),_0x146bd2=>{const _0x25bd3c=_0x1f220f;VisuMZ[_0x25bd3c(0x239)](_0x146bd2,_0x146bd2);const _0x3bdef2=$gameTemp[_0x25bd3c(0x196)]();_0x146bd2[_0x25bd3c(0x102)]=_0x146bd2[_0x25bd3c(0x102)]||$gameMap[_0x25bd3c(0x3be)](),$gameSystem[_0x25bd3c(0x151)](_0x146bd2[_0x25bd3c(0x102)],_0x146bd2[_0x25bd3c(0x312)]||_0x3bdef2[_0x25bd3c(0x3d6)](),_0x146bd2[_0x25bd3c(0xc8)],_0x146bd2[_0x25bd3c(0x31f)],_0x146bd2[_0x25bd3c(0x15b)],_0x146bd2['IconBlendMode']);}),PluginManager['registerCommand'](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x468),_0x5e7964=>{const _0x928eee=_0x1f220f;VisuMZ[_0x928eee(0x239)](_0x5e7964,_0x5e7964);const _0x33aa55=$gameTemp[_0x928eee(0x196)]();_0x5e7964[_0x928eee(0x102)]=_0x5e7964[_0x928eee(0x102)]||$gameMap[_0x928eee(0x3be)](),$gameSystem['deleteIconsOnEventsDataKey'](_0x5e7964[_0x928eee(0x102)],_0x5e7964[_0x928eee(0x312)]||_0x33aa55[_0x928eee(0x3d6)]());}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x359),_0x55462e=>{const _0x4bfc63=_0x1f220f;if($gameMap){if(_0x4bfc63(0x1b7)!=='TzIme')for(const _0x47182d of $gameMap[_0x4bfc63(0x275)]()){_0x47182d[_0x4bfc63(0x122)](),_0x47182d[_0x4bfc63(0x119)]();}else{const _0x2ade23=this[_0x4bfc63(0x59a)]();return _0x3e3cf4[_0x4bfc63(0x580)](this['y'],_0x2ade23);}}if(SceneManager[_0x4bfc63(0x52c)]()){const _0x15e874=SceneManager[_0x4bfc63(0x567)][_0x4bfc63(0x4ef)];if(_0x15e874)_0x15e874[_0x4bfc63(0x3e8)]();}}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],'EventLabelVisible',_0x133540=>{const _0x59ea49=_0x1f220f;VisuMZ['ConvertParams'](_0x133540,_0x133540);switch(_0x133540['Visibility']){case _0x59ea49(0x25b):$gameSystem[_0x59ea49(0x489)](!![]);break;case _0x59ea49(0x3c5):$gameSystem[_0x59ea49(0x489)](![]);break;case'Toggle':$gameSystem[_0x59ea49(0x489)](!$gameSystem['eventLabelsVisible']());break;}}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x1fb),_0x5a142c=>{const _0x13e8df=_0x1f220f;VisuMZ[_0x13e8df(0x239)](_0x5a142c,_0x5a142c);const _0x13c7e4=$gameTemp[_0x13e8df(0x196)]();if(!$gameMap)return;const _0x461c9a=$gameMap[_0x13e8df(0x427)](_0x5a142c['EventId']||_0x13c7e4[_0x13e8df(0x3d6)]());if(_0x461c9a)_0x461c9a[_0x13e8df(0x3a1)]();}),PluginManager['registerCommand'](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x4fe),_0x2056d8=>{const _0x5e9a0f=_0x1f220f;VisuMZ[_0x5e9a0f(0x239)](_0x2056d8,_0x2056d8);const _0x3cf4bc=$gameTemp[_0x5e9a0f(0x196)](),_0x53e5f3=_0x2056d8[_0x5e9a0f(0x102)]||$gameMap[_0x5e9a0f(0x3be)](),_0x8bdb94=_0x2056d8[_0x5e9a0f(0x312)]||_0x3cf4bc[_0x5e9a0f(0x3d6)](),_0x16ffd7=_0x2056d8['PosX']||0x0,_0x810103=_0x2056d8[_0x5e9a0f(0x101)]||0x0,_0xcb094f=_0x2056d8[_0x5e9a0f(0x413)]||0x2,_0x3ef5af=((_0x2056d8['PageId']||0x1)-0x1)[_0x5e9a0f(0x1c5)](0x0,0x13),_0x5617fc=_0x2056d8[_0x5e9a0f(0x5df)]||0x0;$gameSystem[_0x5e9a0f(0x34e)](_0x53e5f3,_0x8bdb94,_0x16ffd7,_0x810103,_0xcb094f,_0x3ef5af,_0x5617fc);}),PluginManager[_0x1f220f(0x227)](pluginData['name'],_0x1f220f(0x199),_0x2c8679=>{const _0x16a6ea=_0x1f220f;VisuMZ[_0x16a6ea(0x239)](_0x2c8679,_0x2c8679);const _0x47158d=$gameTemp[_0x16a6ea(0x196)](),_0xc82f3c=_0x2c8679['MapId']||$gameMap[_0x16a6ea(0x3be)](),_0x5956e2=_0x2c8679[_0x16a6ea(0x312)]||_0x47158d[_0x16a6ea(0x3d6)]();$gameSystem[_0x16a6ea(0x2f3)](_0xc82f3c,_0x5956e2);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x235),_0x56562d=>{const _0x3c0763=_0x1f220f;VisuMZ[_0x3c0763(0x239)](_0x56562d,_0x56562d);const _0x4c863=_0x56562d[_0x3c0763(0x424)];$gameTimer['setCommonEvent'](_0x4c863);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x49b),_0x57da8f=>{const _0x161a9f=_0x1f220f;$gameTimer[_0x161a9f(0x134)](0x0);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],'EventTimerFramesGain',_0x4f785c=>{const _0x42953d=_0x1f220f;if(!$gameTimer[_0x42953d(0x230)]())return;VisuMZ[_0x42953d(0x239)](_0x4f785c,_0x4f785c);let _0x31e6a0=0x0;_0x31e6a0+=_0x4f785c[_0x42953d(0x5c9)],_0x31e6a0+=_0x4f785c[_0x42953d(0x20d)]*0x3c,_0x31e6a0+=_0x4f785c[_0x42953d(0x39a)]*0x3c*0x3c,_0x31e6a0+=_0x4f785c['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x42953d(0x43f)](_0x31e6a0);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x351),_0x21910f=>{const _0x19e165=_0x1f220f;if(!$gameTimer[_0x19e165(0x230)]())return;VisuMZ[_0x19e165(0x239)](_0x21910f,_0x21910f);let _0x3469f5=0x0;_0x3469f5+=_0x21910f[_0x19e165(0x5c9)],_0x3469f5+=_0x21910f[_0x19e165(0x20d)]*0x3c,_0x3469f5+=_0x21910f[_0x19e165(0x39a)]*0x3c*0x3c,_0x3469f5+=_0x21910f['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x19e165(0x120)](_0x3469f5);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x1cf),_0x1904d6=>{const _0x428b8d=_0x1f220f;if(!$gameTimer[_0x428b8d(0x230)]())return;$gameTimer[_0x428b8d(0x438)]();}),PluginManager['registerCommand'](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x4b1),_0x58d9f5=>{const _0x45daae=_0x1f220f;if(!$gameTimer[_0x45daae(0x230)]())return;$gameTimer[_0x45daae(0x1a2)]();}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x3c7),_0x5e0c5c=>{const _0x14f227=_0x1f220f;VisuMZ[_0x14f227(0x239)](_0x5e0c5c,_0x5e0c5c);const _0xc13fa2=_0x5e0c5c[_0x14f227(0x54b)]||0x0;$gameTimer[_0x14f227(0xd2)](_0xc13fa2);}),PluginManager['registerCommand'](pluginData['name'],_0x1f220f(0x4b3),_0x135f79=>{const _0x572b54=_0x1f220f;VisuMZ[_0x572b54(0x239)](_0x135f79,_0x135f79);const _0x3d072c=!_0x135f79[_0x572b54(0xdc)];$gameSystem[_0x572b54(0x441)](_0x3d072c);}),PluginManager[_0x1f220f(0x227)](pluginData['name'],_0x1f220f(0x5d2),_0xcf7287=>{const _0x5af7d5=_0x1f220f;VisuMZ[_0x5af7d5(0x239)](_0xcf7287,_0xcf7287);const _0x4f0d46=(_0xcf7287[_0x5af7d5(0x346)]||0x0)-0x1,_0x3d5aec=!_0xcf7287[_0x5af7d5(0xdc)],_0x300c15=$gamePlayer[_0x5af7d5(0x467)]()[_0x5af7d5(0x3f2)](_0x4f0d46);if(_0x300c15)_0x300c15[_0x5af7d5(0x3ad)](_0x3d5aec);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x252),_0x157ad2=>{const _0x524ee0=_0x1f220f;VisuMZ[_0x524ee0(0x239)](_0x157ad2,_0x157ad2);const _0x596edc=_0x157ad2[_0x524ee0(0x346)];$gameSystem[_0x524ee0(0x595)](_0x596edc);}),PluginManager[_0x1f220f(0x227)](pluginData['name'],_0x1f220f(0x38d),_0x5f14ad=>{const _0x3802eb=_0x1f220f;VisuMZ[_0x3802eb(0x239)](_0x5f14ad,_0x5f14ad),$gameSystem[_0x3802eb(0x595)](0x0),$gameSystem[_0x3802eb(0x441)](![]);for(const _0x1eb2a5 of $gamePlayer[_0x3802eb(0x467)]()['_data']){if(_0x1eb2a5)_0x1eb2a5[_0x3802eb(0x3ad)](![]);}}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x4a5),_0x4754ba=>{const _0x3269d8=_0x1f220f;VisuMZ[_0x3269d8(0x239)](_0x4754ba,_0x4754ba);const _0x3a0798=$gameTemp[_0x3269d8(0x196)]();_0x4754ba[_0x3269d8(0x102)]=_0x4754ba[_0x3269d8(0x102)]||$gameMap[_0x3269d8(0x3be)]();const _0x5d1830=[_0x4754ba['MapId'],_0x4754ba[_0x3269d8(0x312)]||_0x3a0798['eventId'](),_0x4754ba[_0x3269d8(0x5d4)]],_0x1621eb=_0x4754ba[_0x3269d8(0x408)],_0xac2022=$gameSelfSwitches[_0x3269d8(0x40c)](_0x5d1830)||![];$gameSwitches[_0x3269d8(0x179)](_0x1621eb,_0xac2022);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],'SwitchGetSelfSwitchID',_0x471ee5=>{const _0x163503=_0x1f220f;VisuMZ[_0x163503(0x239)](_0x471ee5,_0x471ee5);const _0x160f13=$gameTemp[_0x163503(0x196)]();_0x471ee5[_0x163503(0x102)]=_0x471ee5['MapId']||$gameMap['mapId']();const _0x6036c8=[_0x471ee5[_0x163503(0x102)],_0x471ee5[_0x163503(0x312)]||_0x160f13['eventId'](),_0x163503(0x5d9)[_0x163503(0x2c0)](_0x471ee5[_0x163503(0x378)])],_0x52668d=_0x471ee5[_0x163503(0x408)],_0x58b2dc=$gameSelfSwitches[_0x163503(0x40c)](_0x6036c8)||![];$gameSwitches[_0x163503(0x179)](_0x52668d,_0x58b2dc);}),PluginManager['registerCommand'](pluginData['name'],_0x1f220f(0x1a1),_0x5e48e5=>{const _0x470c05=_0x1f220f;VisuMZ['ConvertParams'](_0x5e48e5,_0x5e48e5);const _0x52b21b=$gameTemp[_0x470c05(0x196)]();_0x5e48e5[_0x470c05(0x102)]=_0x5e48e5['MapId']||$gameMap[_0x470c05(0x3be)]();const _0x2e448d=[_0x5e48e5[_0x470c05(0x102)],_0x5e48e5[_0x470c05(0x312)]||_0x52b21b[_0x470c05(0x3d6)](),_0x470c05(0x21a)[_0x470c05(0x2c0)](_0x5e48e5['VariableId'])],_0x29f40c=_0x5e48e5['TargetVariableId'],_0x1b390d=$gameSelfSwitches[_0x470c05(0x40c)](_0x2e448d)||![];$gameVariables[_0x470c05(0x179)](_0x29f40c,_0x1b390d);}),PluginManager[_0x1f220f(0x227)](pluginData['name'],_0x1f220f(0x1a3),_0x2ac53c=>{const _0x56c50f=_0x1f220f;VisuMZ[_0x56c50f(0x239)](_0x2ac53c,_0x2ac53c);if(!$gameMap)return;const _0x1801d6=$gameTemp[_0x56c50f(0x196)](),_0x33e41a=_0x2ac53c[_0x56c50f(0x1a8)];_0x2ac53c[_0x56c50f(0x5b9)]=_0x2ac53c['Step1MapId']||$gameMap[_0x56c50f(0x3be)](),_0x2ac53c[_0x56c50f(0x136)]=_0x2ac53c[_0x56c50f(0x136)]||$gameMap['mapId'](),_0x2ac53c[_0x56c50f(0x48f)]=_0x2ac53c[_0x56c50f(0x48f)][_0x56c50f(0x38b)]()[_0x56c50f(0x445)]();if(!_0x33e41a&&_0x2ac53c[_0x56c50f(0x5b9)]!==$gameMap[_0x56c50f(0x3be)]())return;if($gameMap['mapId']()===_0x2ac53c[_0x56c50f(0x5b9)]){const _0x243ecc=$gameMap['event'](_0x2ac53c[_0x56c50f(0x356)]||_0x1801d6[_0x56c50f(0x3d6)]());if(!_0x243ecc)return;if(_0x2ac53c['TemplateName']!=='UNTITLED'){if(_0x56c50f(0x56c)!==_0x56c50f(0xe4))_0x243ecc[_0x56c50f(0x382)](_0x2ac53c[_0x56c50f(0x48f)]);else return this[_0x56c50f(0x114)]===_0x24c639&&(this[_0x56c50f(0x114)]=![]),this[_0x56c50f(0x114)];}else _0x243ecc[_0x56c50f(0x1c8)](_0x2ac53c[_0x56c50f(0x136)],_0x2ac53c[_0x56c50f(0x273)]||_0x1801d6[_0x56c50f(0x3d6)]());}if(_0x33e41a){if('ILYGc'!==_0x56c50f(0x26a))$gameSystem['savePreservedMorphEventDataKey'](_0x2ac53c['Step1MapId'],_0x2ac53c['Step1EventId'],_0x2ac53c[_0x56c50f(0x48f)],_0x2ac53c[_0x56c50f(0x136)],_0x2ac53c[_0x56c50f(0x273)]);else return''['toUpperCase']()['trim']();}}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x2fa),_0x410ba9=>{const _0x2e8cab=_0x1f220f;VisuMZ[_0x2e8cab(0x239)](_0x410ba9,_0x410ba9);if(!$gameMap)return;const _0x301509=$gameTemp[_0x2e8cab(0x196)]();_0x410ba9['MapId']=_0x410ba9[_0x2e8cab(0x102)]||$gameMap[_0x2e8cab(0x3be)]();if($gameMap['mapId']()===_0x410ba9[_0x2e8cab(0x102)]){if('RQHSY'!==_0x2e8cab(0x2d0)){let _0xd2735b=[_0x583526,_0x9b4b36,_0x2e8cab(0x5d9)['format'](_0x432a50)];return typeof _0xe3efca==='string'&&(_0xd2735b=[_0x38481a,_0x4274d3,_0x10f0e4[_0x2e8cab(0x38b)]()[_0x2e8cab(0x445)]()]),_0x24e9c9[_0x2e8cab(0x40c)](_0xd2735b);}else{const _0x3b47ff=$gameMap['event'](_0x410ba9[_0x2e8cab(0x312)]||_0x301509[_0x2e8cab(0x3d6)]());_0x3b47ff[_0x2e8cab(0x379)]();}}_0x410ba9[_0x2e8cab(0x1d5)]&&$gameSystem[_0x2e8cab(0x193)](_0x410ba9[_0x2e8cab(0x102)],_0x410ba9[_0x2e8cab(0x312)]||_0x301509[_0x2e8cab(0x3d6)]());}),PluginManager['registerCommand'](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x2c2),_0x55dac1=>{const _0x5a0f73=_0x1f220f;VisuMZ[_0x5a0f73(0x239)](_0x55dac1,_0x55dac1),$gameSystem['setEventIconData']($gamePlayer,_0x55dac1['IconIndex'],_0x55dac1[_0x5a0f73(0x31f)],_0x55dac1['IconBufferY'],_0x55dac1[_0x5a0f73(0x471)]);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x288),_0x121a4c=>{const _0x3bc582=_0x1f220f;VisuMZ[_0x3bc582(0x239)](_0x121a4c,_0x121a4c),$gameSystem[_0x3bc582(0x363)]($gamePlayer);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],'PlayerMovementChange',_0x281450=>{const _0x33375b=_0x1f220f;VisuMZ[_0x33375b(0x239)](_0x281450,_0x281450),$gameSystem[_0x33375b(0x317)](!_0x281450['Enable']);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x5f4),_0x3acda3=>{const _0x1e2a59=_0x1f220f;VisuMZ[_0x1e2a59(0x239)](_0x3acda3,_0x3acda3),$gameSystem[_0x1e2a59(0x1e2)](_0x3acda3[_0x1e2a59(0x17e)]);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x2ab),_0x5e4e90=>{const _0x5d9d9c=_0x1f220f;VisuMZ[_0x5d9d9c(0x239)](_0x5e4e90,_0x5e4e90);const _0x417ddb=_0x5e4e90[_0x5d9d9c(0x102)]||$gameMap[_0x5d9d9c(0x3be)]();$gameSelfSwitches[_0x5d9d9c(0x43c)](_0x417ddb);}),PluginManager[_0x1f220f(0x227)](pluginData['name'],_0x1f220f(0x5ef),_0x493b32=>{const _0x126fbe=_0x1f220f;VisuMZ['ConvertParams'](_0x493b32,_0x493b32);const _0x3d60b2=$gameTemp[_0x126fbe(0x196)]();_0x493b32[_0x126fbe(0x102)]=_0x493b32[_0x126fbe(0x102)]||$gameMap[_0x126fbe(0x3be)]();const _0x3165ca=[_0x493b32[_0x126fbe(0x102)],_0x493b32[_0x126fbe(0x312)]||_0x3d60b2['eventId'](),_0x493b32[_0x126fbe(0x5d4)]];switch(_0x493b32['Value']){case'ON':$gameSelfSwitches['setValue'](_0x3165ca,!![]);break;case _0x126fbe(0x117):$gameSelfSwitches[_0x126fbe(0x179)](_0x3165ca,![]);break;case'Toggle':$gameSelfSwitches['setValue'](_0x3165ca,!$gameSelfSwitches['value'](_0x3165ca));break;}}),PluginManager['registerCommand'](pluginData['name'],_0x1f220f(0x115),_0xdc2d96=>{const _0x222482=_0x1f220f;VisuMZ[_0x222482(0x239)](_0xdc2d96,_0xdc2d96);const _0x226849=$gameTemp['getLastPluginCommandInterpreter']();_0xdc2d96[_0x222482(0x102)]=_0xdc2d96[_0x222482(0x102)]||$gameMap['mapId']();const _0xcaebc1=[_0xdc2d96[_0x222482(0x102)],_0xdc2d96['EventId']||_0x226849[_0x222482(0x3d6)](),_0x222482(0x5d9)[_0x222482(0x2c0)](_0xdc2d96[_0x222482(0x378)])];switch(_0xdc2d96[_0x222482(0x3cd)]){case'ON':$gameSelfSwitches[_0x222482(0x179)](_0xcaebc1,!![]);break;case'OFF':$gameSelfSwitches[_0x222482(0x179)](_0xcaebc1,![]);break;case _0x222482(0x368):$gameSelfSwitches[_0x222482(0x179)](_0xcaebc1,!$gameSelfSwitches[_0x222482(0x40c)](_0xcaebc1));break;}}),PluginManager['registerCommand'](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x488),_0x77d9b7=>{const _0x11bc71=_0x1f220f;VisuMZ[_0x11bc71(0x239)](_0x77d9b7,_0x77d9b7);const _0x49da7e=$gameTemp[_0x11bc71(0x196)]();_0x77d9b7['MapId']=_0x77d9b7[_0x11bc71(0x102)]||$gameMap[_0x11bc71(0x3be)]();const _0x3d5220=[_0x77d9b7[_0x11bc71(0x102)],_0x77d9b7[_0x11bc71(0x312)]||_0x49da7e[_0x11bc71(0x3d6)](),_0x11bc71(0x21a)['format'](_0x77d9b7[_0x11bc71(0x4bc)])],_0x296ff8=VisuMZ[_0x11bc71(0x48a)]($gameSelfSwitches[_0x11bc71(0x40c)](_0x3d5220),_0x77d9b7[_0x11bc71(0x3cd)],_0x77d9b7['Operation']);$gameSelfSwitches[_0x11bc71(0x179)](_0x3d5220,_0x296ff8);}),PluginManager['registerCommand'](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x49f),_0x42d3cb=>{const _0x45484e=_0x1f220f;VisuMZ['ConvertParams'](_0x42d3cb,_0x42d3cb);const _0x1c13bb=$gameTemp[_0x45484e(0x196)](),_0x423313={'template':_0x42d3cb[_0x45484e(0x48f)],'mapId':_0x42d3cb[_0x45484e(0x102)]||$gameMap[_0x45484e(0x3be)](),'eventId':_0x42d3cb['EventId']||_0x1c13bb['eventId'](),'x':_0x42d3cb[_0x45484e(0x1ed)],'y':_0x42d3cb[_0x45484e(0x101)],'spawnPreserved':_0x42d3cb['Preserve'],'spawnEventId':$gameMap[_0x45484e(0x4cd)]['length']+0x3e8},_0x530d23=_0x42d3cb[_0x45484e(0x11b)]||0x0;if(!VisuMZ[_0x45484e(0x25a)][_0x423313[_0x45484e(0x3be)]]&&_0x423313[_0x45484e(0x3be)]!==$gameMap[_0x45484e(0x3be)]()){let _0x429eb5=_0x45484e(0x498)['format'](_0x423313['mapId']);_0x429eb5+=_0x45484e(0x388),_0x429eb5+=_0x45484e(0x465),_0x429eb5+=_0x45484e(0x2ea),_0x429eb5+=_0x45484e(0x149)[_0x45484e(0x2c0)](_0x423313[_0x45484e(0x3be)]),alert(_0x429eb5);return;}const _0x5d44d3=$gameMap['prepareSpawnedEventAtXY'](_0x423313,_0x42d3cb[_0x45484e(0x52d)],_0x42d3cb[_0x45484e(0x5d1)]);_0x530d23&&$gameSwitches[_0x45484e(0x179)](_0x530d23,!!_0x5d44d3);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x494),_0x36dd53=>{const _0x2d2d9f=_0x1f220f;VisuMZ[_0x2d2d9f(0x239)](_0x36dd53,_0x36dd53);const _0x2c1ac5=$gameTemp[_0x2d2d9f(0x196)](),_0x50ac23={'template':_0x36dd53['TemplateName'],'mapId':_0x36dd53['MapId']||$gameMap['mapId'](),'eventId':_0x36dd53['EventId']||_0x2c1ac5[_0x2d2d9f(0x3d6)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x36dd53[_0x2d2d9f(0x501)],'spawnEventId':$gameMap[_0x2d2d9f(0x4cd)]['length']+0x3e8},_0x46c59d=_0x36dd53['SuccessSwitchId']||0x0;if(!VisuMZ[_0x2d2d9f(0x25a)][_0x50ac23[_0x2d2d9f(0x3be)]]&&_0x50ac23[_0x2d2d9f(0x3be)]!==$gameMap[_0x2d2d9f(0x3be)]()){if(_0x2d2d9f(0x2eb)!==_0x2d2d9f(0x5ac)){let _0x529187='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'['format'](_0x50ac23[_0x2d2d9f(0x3be)]);_0x529187+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x529187+=_0x2d2d9f(0x465),_0x529187+=_0x2d2d9f(0x2ea),_0x529187+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'[_0x2d2d9f(0x2c0)](_0x50ac23[_0x2d2d9f(0x3be)]),alert(_0x529187);return;}else{this[_0x2d2d9f(0x386)]=!![];return;}}const _0x5d99a4=$gameMap[_0x2d2d9f(0x49d)](_0x50ac23,_0x36dd53[_0x2d2d9f(0x306)],_0x36dd53[_0x2d2d9f(0x52d)],_0x36dd53[_0x2d2d9f(0x5d1)]);_0x46c59d&&$gameSwitches['setValue'](_0x46c59d,!!_0x5d99a4);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x548),_0x250ea9=>{const _0xd0b040=_0x1f220f;VisuMZ[_0xd0b040(0x239)](_0x250ea9,_0x250ea9);const _0x2c4bfd=$gameTemp[_0xd0b040(0x196)](),_0x3f1eb5={'template':_0x250ea9[_0xd0b040(0x48f)],'mapId':_0x250ea9[_0xd0b040(0x102)]||$gameMap[_0xd0b040(0x3be)](),'eventId':_0x250ea9['EventId']||_0x2c4bfd['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x250ea9['Preserve'],'spawnEventId':$gameMap['_spawnedEvents'][_0xd0b040(0x341)]+0x3e8},_0x46928=_0x250ea9[_0xd0b040(0x11b)]||0x0;if(!VisuMZ[_0xd0b040(0x25a)][_0x3f1eb5['mapId']]&&_0x3f1eb5[_0xd0b040(0x3be)]!==$gameMap[_0xd0b040(0x3be)]()){if(_0xd0b040(0x209)!==_0xd0b040(0x209)){if(!this[_0xd0b040(0x420)])return 0x0;if(this['_character'][_0xd0b040(0x37e)])return 0x0;const _0x232a5c=this[_0xd0b040(0x420)][_0xd0b040(0x1d9)]();return _0x232a5c?_0x232a5c['iconIndex']||0x0:0x0;}else{let _0x1930c9=_0xd0b040(0x498)[_0xd0b040(0x2c0)](_0x3f1eb5[_0xd0b040(0x3be)]);_0x1930c9+=_0xd0b040(0x388),_0x1930c9+=_0xd0b040(0x465),_0x1930c9+=_0xd0b040(0x2ea),_0x1930c9+=_0xd0b040(0x149)[_0xd0b040(0x2c0)](_0x3f1eb5['mapId']),alert(_0x1930c9);return;}}const _0x2778fa=$gameMap[_0xd0b040(0x10f)](_0x3f1eb5,_0x250ea9[_0xd0b040(0x246)],_0x250ea9[_0xd0b040(0x52d)],_0x250ea9[_0xd0b040(0x5d1)]);_0x46928&&$gameSwitches[_0xd0b040(0x179)](_0x46928,!!_0x2778fa);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x3a8),_0x3b7379=>{const _0x232d27=_0x1f220f;VisuMZ[_0x232d27(0x239)](_0x3b7379,_0x3b7379);const _0xdfe4fe=$gameTemp[_0x232d27(0x196)]();$gameMap[_0x232d27(0x4a6)](_0x3b7379['EventID']||_0xdfe4fe['eventId']());}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x2ff),_0x1c9eff=>{const _0x2e8142=_0x1f220f;VisuMZ[_0x2e8142(0x239)](_0x1c9eff,_0x1c9eff);const _0x4b7de5=_0x1c9eff['PosX'],_0x4fe07f=_0x1c9eff[_0x2e8142(0x101)];$gameMap[_0x2e8142(0x27d)](_0x4b7de5,_0x4fe07f);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],'SpawnEventDespawnRegions',_0x4ab7e4=>{const _0x24fb3c=_0x1f220f;VisuMZ[_0x24fb3c(0x239)](_0x4ab7e4,_0x4ab7e4),$gameMap[_0x24fb3c(0x410)](_0x4ab7e4[_0x24fb3c(0x306)]);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x2e3),_0x2d7547=>{const _0x35a4e2=_0x1f220f;VisuMZ[_0x35a4e2(0x239)](_0x2d7547,_0x2d7547),$gameMap[_0x35a4e2(0x37b)](_0x2d7547[_0x35a4e2(0x246)]);}),PluginManager[_0x1f220f(0x227)](pluginData[_0x1f220f(0x2b8)],_0x1f220f(0x4ac),_0x40b12c=>{const _0x8c8953=_0x1f220f;VisuMZ[_0x8c8953(0x239)](_0x40b12c,_0x40b12c),$gameMap[_0x8c8953(0x26e)]();}),VisuMZ['EventsMoveCore']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x1f220f(0x362)][_0x1f220f(0x194)],Scene_Boot[_0x1f220f(0x362)]['onDatabaseLoaded']=function(){const _0x1e675c=_0x1f220f;VisuMZ[_0x1e675c(0x141)]['Scene_Boot_onDatabaseLoaded'][_0x1e675c(0x58d)](this),this[_0x1e675c(0x326)](),this[_0x1e675c(0x526)]();if(VisuMZ['EventsMoveCore']['CustomPageConditions'])VisuMZ[_0x1e675c(0x141)][_0x1e675c(0x264)][_0x1e675c(0xd8)]();},VisuMZ['PreloadedMaps']=[],VisuMZ[_0x1f220f(0x43b)]={},Scene_Boot['prototype'][_0x1f220f(0x326)]=function(){const _0x457552=_0x1f220f;if(DataManager['isBattleTest']()||DataManager[_0x457552(0x491)]())return;const _0x5e76d0=VisuMZ[_0x457552(0x141)][_0x457552(0x454)]['Template'],_0xf6496d=_0x5e76d0[_0x457552(0x477)]['slice'](0x0);for(const _0x299428 of _0x5e76d0['List']){if(_0x457552(0x2d1)!==_0x457552(0x2d1))for(let _0x2cb965=-this[_0x457552(0x4f0)]['up'];_0x2cb965<=this['_addedHitbox'][_0x457552(0x1c4)];_0x2cb965++){if(!_0x39844d[_0x457552(0x362)][_0x457552(0x158)]['call'](this,_0x34a9dc+_0x23da0e,_0x276cc5+_0x2cb965,_0x37233f))return![];}else{_0x299428[_0x457552(0x32d)]=_0x299428[_0x457552(0x32d)][_0x457552(0x38b)]()['trim'](),VisuMZ[_0x457552(0x43b)][_0x299428[_0x457552(0x32d)]]=_0x299428;if(!_0xf6496d[_0x457552(0x220)](_0x299428['MapID']))_0xf6496d[_0x457552(0x57e)](_0x299428[_0x457552(0x20f)]);}}for(const _0x60a1b8 of _0xf6496d){if(VisuMZ[_0x457552(0x25a)][_0x60a1b8])continue;const _0x223de1=_0x457552(0x296)[_0x457552(0x2c0)](_0x60a1b8[_0x457552(0x145)](0x3)),_0x16170e=_0x457552(0x4bd)[_0x457552(0x2c0)](_0x60a1b8);DataManager[_0x457552(0x24e)](_0x16170e,_0x223de1),setTimeout(this[_0x457552(0x1d7)]['bind'](this,_0x60a1b8,_0x16170e),0x64);}},Scene_Boot[_0x1f220f(0x362)][_0x1f220f(0x1d7)]=function(_0x467189,_0x6cb7a9){const _0x27e59b=_0x1f220f;if(window[_0x6cb7a9]){if(_0x27e59b(0x282)!==_0x27e59b(0x11c))VisuMZ['PreloadedMaps'][_0x467189]=window[_0x6cb7a9],window[_0x6cb7a9]=undefined;else{if(this[_0x27e59b(0x44a)]()>0x0)return![];if(this[_0x27e59b(0x420)]){if(this[_0x27e59b(0x420)][_0x27e59b(0x2fe)]()!=='')return![];}return this[_0x27e59b(0x5ed)]()||this['_character']&&this[_0x27e59b(0x420)][_0x27e59b(0x1bb)]();}}else'VchRR'===_0x27e59b(0x2c3)?setTimeout(this[_0x27e59b(0x1d7)][_0x27e59b(0x2cd)](this,_0x467189,_0x6cb7a9),0x64):this[_0x27e59b(0x433)]=0xff;},VisuMZ[_0x1f220f(0x168)]=[],VisuMZ['SelfSwitches']=[],VisuMZ[_0x1f220f(0x47c)]=[],VisuMZ[_0x1f220f(0x294)]=[],VisuMZ[_0x1f220f(0x47d)]=[],VisuMZ[_0x1f220f(0x508)]=[],Scene_Boot['prototype'][_0x1f220f(0x526)]=function(){const _0x40a003=_0x1f220f;for(let _0x177aef=0x1;_0x177aef<$dataSystem[_0x40a003(0x29d)][_0x40a003(0x341)];_0x177aef++){if($dataSystem[_0x40a003(0x29d)][_0x177aef][_0x40a003(0x4db)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x40a003(0x168)][_0x40a003(0x57e)](_0x177aef);if($dataSystem['switches'][_0x177aef][_0x40a003(0x4db)](/<SELF>/i))VisuMZ[_0x40a003(0x48b)]['push'](_0x177aef);if($dataSystem['switches'][_0x177aef][_0x40a003(0x4db)](/<MAP>/i))VisuMZ[_0x40a003(0x47c)][_0x40a003(0x57e)](_0x177aef);}for(let _0x3c088c=0x1;_0x3c088c<$dataSystem[_0x40a003(0x2e9)][_0x40a003(0x341)];_0x3c088c++){if($dataSystem[_0x40a003(0x2e9)][_0x3c088c][_0x40a003(0x4db)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x40a003(0x294)][_0x40a003(0x57e)](_0x3c088c);if($dataSystem['variables'][_0x3c088c][_0x40a003(0x4db)](/<SELF>/i))VisuMZ[_0x40a003(0x47d)][_0x40a003(0x57e)](_0x3c088c);if($dataSystem['variables'][_0x3c088c][_0x40a003(0x4db)](/<MAP>/i))VisuMZ['MapVariables'][_0x40a003(0x57e)](_0x3c088c);}},VisuMZ['EventsMoveCore'][_0x1f220f(0x264)]={},VisuMZ[_0x1f220f(0x141)]['CustomPageConditions']['initialize']=function(){const _0x3316e2=_0x1f220f;this[_0x3316e2(0x1c3)]=new Game_CPCInterpreter(),this[_0x3316e2(0x505)]();},VisuMZ[_0x1f220f(0x141)]['CustomPageConditions'][_0x1f220f(0x505)]=function(){const _0x110c68=_0x1f220f;this['_commonEvents']=[];for(const _0x52b9ce of $dataCommonEvents){if(_0x110c68(0x371)===_0x110c68(0x371)){if(!_0x52b9ce)continue;VisuMZ[_0x110c68(0x141)][_0x110c68(0x264)]['loadCPC'](_0x52b9ce);if(_0x52b9ce['CPC'][_0x110c68(0x341)]>0x0)this[_0x110c68(0x562)][_0x110c68(0x57e)](_0x52b9ce['id']);}else return this[_0x110c68(0x492)]=![],![];}},VisuMZ['EventsMoveCore'][_0x1f220f(0x264)][_0x1f220f(0x258)]=function(_0x1217be,_0x57f6bf,_0x1f88be){const _0x31cae4=_0x1f220f;return this[_0x31cae4(0x1c3)][_0x31cae4(0x2d9)](_0x1217be,_0x57f6bf),_0x1f88be?this[_0x31cae4(0x1c3)]['executeCommonEvent'](_0x1f88be):this[_0x31cae4(0x1c3)][_0x31cae4(0x414)](),this[_0x31cae4(0x1c3)][_0x31cae4(0x217)];},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x264)][_0x1f220f(0x20e)]=function(_0x530816){const _0x3c1e58=_0x1f220f;let _0x428101=![];_0x530816[_0x3c1e58(0x262)]=[];for(const _0x41c2e0 of _0x530816[_0x3c1e58(0x52e)]){if(_0x3c1e58(0xe6)!==_0x3c1e58(0x3d0)){if([0x6c,0x198][_0x3c1e58(0x220)](_0x41c2e0[_0x3c1e58(0x161)])){const _0x3ce459=_0x41c2e0['parameters'][0x0];if(_0x3ce459[_0x3c1e58(0x4db)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x428101=!![];else{if(_0x3ce459['match'](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x3c1e58(0xcf)===_0x3c1e58(0xcf))_0x428101=![];else{const _0x1f5cf7=this[_0x3c1e58(0x520)]+_0x526122(_0x305018['$1']);return this[_0x3c1e58(0xe0)](_0x1f5cf7[_0x3c1e58(0x1c5)](0x0,0xff));}}}}_0x428101&&('MsSuM'!==_0x3c1e58(0x43d)?_0x530816[_0x3c1e58(0x262)][_0x3c1e58(0x57e)](_0x41c2e0):this[_0x3c1e58(0x2df)]());}else{const _0x3f171d=_0x2fabc0['GetMoveSynchTarget'](this['moveSynchTarget']()),_0x541182=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x3f171d[_0x3c1e58(0x581)]()];this['executeMoveDir8'](_0x541182);}}},getSelfSwitchValue=function(_0x1c8e23,_0x185f8f,_0x4d6f02){const _0x519fb7=_0x1f220f;let _0x1833c2=[_0x1c8e23,_0x185f8f,'Self\x20Switch\x20%1'[_0x519fb7(0x2c0)](_0x4d6f02)];return typeof _0x4d6f02===_0x519fb7(0x274)&&(_0x1833c2=[_0x1c8e23,_0x185f8f,_0x4d6f02[_0x519fb7(0x38b)]()[_0x519fb7(0x445)]()]),$gameSelfSwitches[_0x519fb7(0x40c)](_0x1833c2);},getMapSwitchValue=function(_0x5e59dc,_0x20b401){const _0x12fec5=_0x1f220f;let _0x1f3ee3=[0x0,0x0,_0x12fec5(0x5af)['format'](_0x5e59dc,_0x20b401)];return $gameSelfSwitches[_0x12fec5(0x40c)](_0x1f3ee3);},getMapVariableValue=function(_0x5602a5,_0xfcf502){const _0x38d06f=_0x1f220f;let _0x43e74d=[0x0,0x0,_0x38d06f(0x164)['format'](_0x5602a5,_0xfcf502)];return $gameSelfSwitches['value'](_0x43e74d);},getSelfVariableValue=function(_0xded2e0,_0x8406bc,_0x4c8d0d){const _0x236185=_0x1f220f,_0x37aebd=[_0xded2e0,_0x8406bc,_0x236185(0x21a)['format'](_0x4c8d0d)];return $gameSelfSwitches['value'](_0x37aebd);},setSelfSwitchValue=function(_0x509420,_0x12eb71,_0x3b9372,_0x388795){const _0x4723c6=_0x1f220f;let _0x294f10=[_0x509420,_0x12eb71,_0x4723c6(0x5d9)['format'](_0x3b9372)];if(typeof _0x3b9372==='string'){if(_0x4723c6(0x1a7)==='dlKQG')return this[_0x4723c6(0x334)](_0x61701(_0x969c80['$1']),_0x5f2556(_0x40e035['$2']));else _0x294f10=[_0x509420,_0x12eb71,_0x3b9372[_0x4723c6(0x38b)]()[_0x4723c6(0x445)]()];}$gameSelfSwitches[_0x4723c6(0x179)](_0x294f10,_0x388795);},setSelfVariableValue=function(_0x576d6c,_0x2cdc67,_0x5f50fb,_0x398b94){const _0x250b76=_0x1f220f,_0x5b2486=[_0x576d6c,_0x2cdc67,_0x250b76(0x21a)[_0x250b76(0x2c0)](_0x5f50fb)];$gameSelfSwitches[_0x250b76(0x179)](_0x5b2486,_0x398b94);},setMapSwitchValue=function(_0xdc1980,_0x32f872,_0x139925){const _0x199742=_0x1f220f;let _0x4b64bc=[0x0,0x0,_0x199742(0x5af)[_0x199742(0x2c0)](_0xdc1980,_0x32f872)];$gameSelfSwitches[_0x199742(0x179)](_0x4b64bc,_0x139925);},setMapVariableValue=function(_0x5d76a7,_0x17c52a,_0x387f7d){const _0x14f90a=_0x1f220f;let _0x47a8ab=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'['format'](_0x5d76a7,_0x17c52a)];$gameSelfSwitches[_0x14f90a(0x179)](_0x47a8ab,_0x387f7d);},DataManager[_0x1f220f(0x3e2)]=function(_0x2b6ddb){const _0x174b00=_0x1f220f;if(SceneManager[_0x174b00(0x567)][_0x174b00(0x2a0)]===Scene_Debug)return![];return VisuMZ[_0x174b00(0x168)][_0x174b00(0x220)](_0x2b6ddb);},DataManager['isAdvancedVariable']=function(_0x2ad660){const _0x4cf6f6=_0x1f220f;if(SceneManager[_0x4cf6f6(0x567)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x4cf6f6(0x294)][_0x4cf6f6(0x220)](_0x2ad660);},DataManager[_0x1f220f(0x3d9)]=function(_0x401ce0){const _0x162979=_0x1f220f;if(SceneManager[_0x162979(0x567)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x162979(0x48b)][_0x162979(0x220)](_0x401ce0);},DataManager['isSelfVariable']=function(_0x43ac4c){const _0xf0c7a4=_0x1f220f;if(SceneManager[_0xf0c7a4(0x567)][_0xf0c7a4(0x2a0)]===Scene_Debug)return![];return VisuMZ[_0xf0c7a4(0x47d)][_0xf0c7a4(0x220)](_0x43ac4c);},DataManager[_0x1f220f(0x133)]=function(_0x328e2d){const _0x5f4867=_0x1f220f;if(BattleManager[_0x5f4867(0xf7)]())return![];return VisuMZ[_0x5f4867(0x47c)]['includes'](_0x328e2d);},DataManager['isMapVariable']=function(_0x51719f){const _0x53ef4d=_0x1f220f;if(BattleManager[_0x53ef4d(0xf7)]())return![];return VisuMZ[_0x53ef4d(0x508)][_0x53ef4d(0x220)](_0x51719f);},SceneManager[_0x1f220f(0x52c)]=function(){const _0x486637=_0x1f220f;return this[_0x486637(0x567)]&&this[_0x486637(0x567)][_0x486637(0x2a0)]===Scene_Map;},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x276)]=Game_Temp[_0x1f220f(0x362)]['setDestination'],Game_Temp[_0x1f220f(0x362)]['setDestination']=function(_0x30112a,_0x113d39){const _0x30924d=_0x1f220f;if(this[_0x30924d(0x539)](_0x30112a,_0x113d39))return;VisuMZ[_0x30924d(0x141)][_0x30924d(0x276)][_0x30924d(0x58d)](this,_0x30112a,_0x113d39);},Game_Temp[_0x1f220f(0x362)][_0x1f220f(0x539)]=function(_0x174ca4,_0x221c11){const _0x221064=_0x1f220f,_0x16ec9d=$gameMap[_0x221064(0x423)](_0x174ca4,_0x221c11);for(const _0x3b2f69 of _0x16ec9d){if('NJBXj'!==_0x221064(0x5cf)){const _0x1dbfd9=_0x20ea7f['eventsXyNt'](_0x35defb,_0x208c41)['filter'](_0x6f0689=>_0x6f0689!==this&&_0x6f0689[_0x221064(0x111)]());return _0x1dbfd9[_0x221064(0x341)]>0x0;}else{if(_0x3b2f69&&_0x3b2f69['hasClickTrigger']()){if('MGAIm'===_0x221064(0x366))_0x41f26d['_shadowSprite']=new _0x566ad8(),_0x2a19eb[_0x221064(0x353)]['_filename']=_0x659457['_character']['shadowFilename'](),_0x57b8c9[_0x221064(0x353)][_0x221064(0x121)]=_0xfb34fe['loadSystem'](_0x40e096['_shadowSprite'][_0x221064(0x156)]),_0x1d1e75['_shadowSprite'][_0x221064(0xc0)]['x']=0.5,_0xea4934[_0x221064(0x353)]['anchor']['y']=0x1,_0xcc4ac8[_0x221064(0x353)]['z']=0x0,this[_0x221064(0xf5)][_0x221064(0x33c)](_0xc7fea1[_0x221064(0x353)]);else return _0x3b2f69['onClickTrigger'](),!![];}}}return TouchInput[_0x221064(0x183)]()&&_0x16ec9d[_0x221064(0x341)]>0x0&&(_0x221064(0x32a)!==_0x221064(0x32a)?(_0x34dac2['x']=_0x487d1c?_0x480196[_0x221064(0x331)]:0x0,_0x53d26a['y']=_0x26ceaa?-this[_0x221064(0x405)]+_0x1f6d0c[_0x221064(0x12a)]:0x0):TouchInput[_0x221064(0xca)]()),![];},Game_Temp[_0x1f220f(0x362)][_0x1f220f(0x4f7)]=function(_0x25db49){const _0x1d2683=_0x1f220f;this[_0x1d2683(0x118)]=_0x25db49;},Game_Temp['prototype'][_0x1f220f(0x196)]=function(){const _0x49e728=_0x1f220f;return this[_0x49e728(0x118)];},Game_Temp[_0x1f220f(0x362)][_0x1f220f(0x358)]=function(_0x4f6a04){const _0x246615=_0x1f220f;this[_0x246615(0xb7)]=_0x4f6a04;},Game_Temp[_0x1f220f(0x362)][_0x1f220f(0x328)]=function(){const _0x56e08c=_0x1f220f;this[_0x56e08c(0xb7)]=undefined;},Game_Temp[_0x1f220f(0x362)][_0x1f220f(0x330)]=function(){return this['_selfTarget'];},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x3ff)]=Game_System[_0x1f220f(0x362)][_0x1f220f(0xd8)],Game_System[_0x1f220f(0x362)]['initialize']=function(){const _0x1b81fb=_0x1f220f;VisuMZ[_0x1b81fb(0x141)]['Game_System_initialize'][_0x1b81fb(0x58d)](this),this[_0x1b81fb(0x3e5)](),this[_0x1b81fb(0x512)]();},Game_System[_0x1f220f(0x362)][_0x1f220f(0x3e5)]=function(){const _0x5ab607=_0x1f220f;this['_EventsMoveCoreSettings']={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x5ab607(0x308)]={},this['_MapSpawnedEventData']=[],this[_0x5ab607(0x591)]={},this[_0x5ab607(0x1ba)]={},this[_0x5ab607(0x114)]=![],this[_0x5ab607(0x1b6)]='default';},Game_System[_0x1f220f(0x362)][_0x1f220f(0x4b4)]=function(){const _0x23760c=_0x1f220f;if(this['_EventsMoveCoreSettings']===undefined)this[_0x23760c(0x3e5)]();if(this[_0x23760c(0x4ba)][_0x23760c(0x335)]===undefined)this['initEventsMoveCore']();return this[_0x23760c(0x4ba)][_0x23760c(0x335)];},Game_System['prototype'][_0x1f220f(0x576)]=function(_0x4d6f67){const _0x4bccb5=_0x1f220f;if(this['_EventsMoveCoreSettings']===undefined)this[_0x4bccb5(0x3e5)]();if(this[_0x4bccb5(0x4ba)][_0x4bccb5(0x335)]===undefined)this['initEventsMoveCore']();this[_0x4bccb5(0x4ba)][_0x4bccb5(0x335)]=_0x4d6f67;},Game_System['prototype'][_0x1f220f(0x4d8)]=function(){const _0x53dd17=_0x1f220f;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this[_0x53dd17(0x4ba)][_0x53dd17(0x5a9)]===undefined)this[_0x53dd17(0x3e5)]();return this[_0x53dd17(0x4ba)]['EventAutoMovement'];},Game_System[_0x1f220f(0x362)][_0x1f220f(0xc1)]=function(_0x381605){const _0x10ee6a=_0x1f220f;if(this[_0x10ee6a(0x4ba)]===undefined)this['initEventsMoveCore']();if(this[_0x10ee6a(0x4ba)][_0x10ee6a(0x5a9)]===undefined)this[_0x10ee6a(0x3e5)]();this[_0x10ee6a(0x4ba)]['EventAutoMovement']=_0x381605;},Game_System[_0x1f220f(0x362)][_0x1f220f(0xf2)]=function(){const _0x32e11d=_0x1f220f;if(this[_0x32e11d(0x4ba)]===undefined)this['initEventsMoveCore']();if(this[_0x32e11d(0x4ba)][_0x32e11d(0x3f5)]===undefined)this[_0x32e11d(0x3e5)]();return this[_0x32e11d(0x4ba)][_0x32e11d(0x3f5)];},Game_System['prototype'][_0x1f220f(0x489)]=function(_0x58de0f){const _0x3b5645=_0x1f220f;if(this[_0x3b5645(0x4ba)]===undefined)this[_0x3b5645(0x3e5)]();if(this['_EventsMoveCoreSettings']['VisibleEventLabels']===undefined)this['initEventsMoveCore']();this['_EventsMoveCoreSettings'][_0x3b5645(0x3f5)]=_0x58de0f;},Game_System[_0x1f220f(0x362)]['isPlayerControlDisabled']=function(){const _0x54937c=_0x1f220f;return this[_0x54937c(0x114)]===undefined&&(this[_0x54937c(0x114)]=![]),this[_0x54937c(0x114)];},Game_System['prototype']['setPlayerControlDisable']=function(_0x24ae55){const _0x2be2a0=_0x1f220f;this[_0x2be2a0(0x114)]=_0x24ae55;},Game_System[_0x1f220f(0x362)][_0x1f220f(0x560)]=function(){const _0x2f1d11=_0x1f220f;return this[_0x2f1d11(0x1b6)];},Game_System[_0x1f220f(0x362)][_0x1f220f(0x1e2)]=function(_0x163de1){const _0x4cc1dc=_0x1f220f;this['_PlayerDiagonalSetting']=String(_0x163de1)[_0x4cc1dc(0x552)]()[_0x4cc1dc(0x445)]();},Game_System[_0x1f220f(0x362)][_0x1f220f(0x1d9)]=function(_0xf7bbfc){const _0x2e40e7=_0x1f220f;if(this[_0x2e40e7(0x308)]===undefined)this[_0x2e40e7(0x3e5)]();if(!_0xf7bbfc)return null;if(_0xf7bbfc===$gamePlayer)return this[_0x2e40e7(0x308)]['Player'];else{const _0x8db6ec=VisuMZ[_0x2e40e7(0x141)]['Settings'],_0x2d20a1=_0x2e40e7(0x550)[_0x2e40e7(0x2c0)](_0xf7bbfc[_0x2e40e7(0x27a)],_0xf7bbfc[_0x2e40e7(0x53b)]);return this[_0x2e40e7(0x308)][_0x2d20a1]=this[_0x2e40e7(0x308)][_0x2d20a1]||{'iconIndex':0x0,'bufferX':_0x8db6ec[_0x2e40e7(0x5bf)][_0x2e40e7(0x2e5)],'bufferY':_0x8db6ec[_0x2e40e7(0x5bf)][_0x2e40e7(0xd7)],'blendMode':_0x8db6ec[_0x2e40e7(0x5bf)][_0x2e40e7(0x53c)]},this[_0x2e40e7(0x308)][_0x2d20a1];}},Game_System[_0x1f220f(0x362)][_0x1f220f(0x536)]=function(_0x20aa30,_0x2f8045,_0x3a0c0d,_0x3c8be3,_0x1c62a6){const _0x16fb23=_0x1f220f;if(this[_0x16fb23(0x308)]===undefined)this['initEventsMoveCore']();const _0x49b81a=_0x20aa30===$gamePlayer?_0x16fb23(0x2dd):'Map%1-Event%2'[_0x16fb23(0x2c0)](_0x20aa30['_mapId'],_0x20aa30[_0x16fb23(0x53b)]);this[_0x16fb23(0x308)][_0x49b81a]={'iconIndex':_0x2f8045,'bufferX':_0x3a0c0d,'bufferY':_0x3c8be3,'blendMode':_0x1c62a6};},Game_System[_0x1f220f(0x362)][_0x1f220f(0x151)]=function(_0x4dea32,_0xc3340a,_0x42ebaa,_0x4abb25,_0xaf846b,_0x285230){const _0x480ecd=_0x1f220f;if(this[_0x480ecd(0x308)]===undefined)this['initEventsMoveCore']();const _0xb4521a='Map%1-Event%2'[_0x480ecd(0x2c0)](_0x4dea32,_0xc3340a);this[_0x480ecd(0x308)][_0xb4521a]={'iconIndex':_0x42ebaa,'bufferX':_0x4abb25,'bufferY':_0xaf846b,'blendMode':_0x285230};},Game_System[_0x1f220f(0x362)]['deleteIconsOnEventsData']=function(_0x23b6f3){const _0x3c403a=_0x1f220f;if(this[_0x3c403a(0x308)]===undefined)this[_0x3c403a(0x3e5)]();if(!_0x23b6f3)return null;if(_0x23b6f3===$gamePlayer){if('ZMnsM'!==_0x3c403a(0x2f1))delete this[_0x3c403a(0x308)][_0x3c403a(0x2dd)];else return this[_0x3c403a(0xe2)](0x4,_0x132761(_0x34efec['$1']));}else _0x3c403a(0x5d8)!=='yhkcb'?(_0x344c36['EventsMoveCore'][_0x3c403a(0x3ff)][_0x3c403a(0x58d)](this),this['initEventsMoveCore'](),this[_0x3c403a(0x512)]()):this[_0x3c403a(0x3a6)](_0x23b6f3[_0x3c403a(0x27a)],_0x23b6f3[_0x3c403a(0x53b)]);},Game_System['prototype'][_0x1f220f(0x3a6)]=function(_0x4acd3d,_0x158749){const _0x3e3fd6=_0x1f220f;if(this[_0x3e3fd6(0x308)]===undefined)this[_0x3e3fd6(0x3e5)]();const _0x5c03c1=_0x3e3fd6(0x550)[_0x3e3fd6(0x2c0)](_0x4acd3d,_0x158749);delete this[_0x3e3fd6(0x308)][_0x5c03c1];},Game_System[_0x1f220f(0x362)][_0x1f220f(0x4c4)]=function(_0x268260){const _0x18f028=_0x1f220f;if(this[_0x18f028(0x1ba)]===undefined)this[_0x18f028(0x3e5)]();if(!_0x268260)return null;const _0x19fe1d='Map%1-Event%2'['format'](_0x268260[_0x18f028(0x27a)],_0x268260['_eventId']);return this[_0x18f028(0x1ba)][_0x19fe1d];},Game_System['prototype']['saveEventLocation']=function(_0x20301d){const _0x4b0e2c=_0x1f220f;if(this[_0x4b0e2c(0x1ba)]===undefined)this['initEventsMoveCore']();if(!_0x20301d)return;const _0x451004=_0x4b0e2c(0x550)['format'](_0x20301d[_0x4b0e2c(0x27a)],_0x20301d['_eventId']);this[_0x4b0e2c(0x1ba)][_0x451004]={'direction':_0x20301d['direction'](),'x':Math['round'](_0x20301d['x']),'y':Math[_0x4b0e2c(0xdb)](_0x20301d['y']),'pageIndex':_0x20301d[_0x4b0e2c(0x277)],'moveRouteIndex':_0x20301d[_0x4b0e2c(0x185)]};},Game_System[_0x1f220f(0x362)][_0x1f220f(0x1ae)]=function(_0xb13c5b){const _0x597bf3=_0x1f220f;if(this['_SavedEventLocations']===undefined)this[_0x597bf3(0x3e5)]();if(!_0xb13c5b)return;this[_0x597bf3(0x2f3)](_0xb13c5b[_0x597bf3(0x27a)],_0xb13c5b['_eventId']);},Game_System['prototype'][_0x1f220f(0x2f3)]=function(_0x5def39,_0x3ddfe3){const _0x131e58=_0x1f220f;if(this['_SavedEventLocations']===undefined)this[_0x131e58(0x3e5)]();const _0x8275aa=_0x131e58(0x550)['format'](_0x5def39,_0x3ddfe3);delete this['_SavedEventLocations'][_0x8275aa];},Game_System[_0x1f220f(0x362)]['createSaveEventLocationData']=function(_0x2c173a,_0x5a057b,_0x48be86,_0x4e6259,_0x3b90ac,_0x3696da,_0x2fe020){const _0x48b72a=_0x1f220f;if(this[_0x48b72a(0x1ba)]===undefined)this['initEventsMoveCore']();const _0x4fb5cd=_0x48b72a(0x550)['format'](_0x2c173a,_0x5a057b);this[_0x48b72a(0x1ba)][_0x4fb5cd]={'direction':_0x3b90ac,'x':Math[_0x48b72a(0xdb)](_0x48be86),'y':Math[_0x48b72a(0xdb)](_0x4e6259),'pageIndex':_0x3696da,'moveRouteIndex':_0x2fe020};},Game_System[_0x1f220f(0x362)][_0x1f220f(0x4f4)]=function(_0x329e36){const _0x5f92db=_0x1f220f;if(this['_PreservedEventMorphData']===undefined)this[_0x5f92db(0x3e5)]();if(!_0x329e36)return;const _0x4cba26=_0x5f92db(0x550)[_0x5f92db(0x2c0)](_0x329e36['_mapId'],_0x329e36['_eventId']);return this[_0x5f92db(0x591)][_0x4cba26];},Game_System['prototype'][_0x1f220f(0x480)]=function(_0x2a1e2c,_0x4eb920,_0x1225de,_0x1c1b74,_0xa13731){const _0x50e216=_0x1f220f;if(this[_0x50e216(0x591)]===undefined)this['initEventsMoveCore']();const _0x14bbc0=_0x50e216(0x550)[_0x50e216(0x2c0)](_0x2a1e2c,_0x4eb920);this['_PreservedEventMorphData'][_0x14bbc0]={'template':_0x1225de,'mapId':_0x1c1b74,'eventId':_0xa13731};},Game_System[_0x1f220f(0x362)][_0x1f220f(0x193)]=function(_0x574d62,_0x5536a4){const _0x2e97d2=_0x1f220f;if(this[_0x2e97d2(0x591)]===undefined)this['initEventsMoveCore']();const _0x4bb7ee='Map%1-Event%2'[_0x2e97d2(0x2c0)](_0x574d62,_0x5536a4);delete this['_PreservedEventMorphData'][_0x4bb7ee];},Game_System[_0x1f220f(0x362)][_0x1f220f(0x2f5)]=function(_0x16a736){const _0x1d76e3=_0x1f220f;if(this[_0x1d76e3(0x2e1)]===undefined)this['initEventsMoveCore']();return this[_0x1d76e3(0x2e1)][_0x16a736]=this['_MapSpawnedEventData'][_0x16a736]||[],this[_0x1d76e3(0x2e1)][_0x16a736];},Game_System[_0x1f220f(0x362)][_0x1f220f(0x4f8)]=function(_0x31c848){const _0xe9097d=_0x1f220f,_0x3a069e=this[_0xe9097d(0x2f5)](_0x31c848);for(const _0x125554 of _0x3a069e){if('jdFaH'!==_0xe9097d(0x3d2))this[_0xe9097d(0xb8)]['bufferY']=_0x338333(_0x2c727e['$1']);else{if(!_0x125554)continue;if(_0x125554[_0xe9097d(0x2ca)])continue;const _0x1892c9=_0x3a069e[_0xe9097d(0x1f9)](_0x125554);_0x3a069e[_0x1892c9]=null;}}},Game_System[_0x1f220f(0x362)][_0x1f220f(0x512)]=function(){const _0x992d2=_0x1f220f;this[_0x992d2(0x3c6)]=0x0,this[_0x992d2(0x298)]=![];},Game_System[_0x1f220f(0x362)][_0x1f220f(0x389)]=function(){const _0x5889cf=_0x1f220f;if(this[_0x5889cf(0x3c6)]===undefined)this[_0x5889cf(0x512)]();return this[_0x5889cf(0x3c6)];},Game_System[_0x1f220f(0x362)][_0x1f220f(0x595)]=function(_0x31f90c){const _0x21d26c=_0x1f220f;if(this[_0x21d26c(0x3c6)]===undefined)this[_0x21d26c(0x512)]();this['_followerControlID']=_0x31f90c;;},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x32f)]=Game_Interpreter[_0x1f220f(0x362)][_0x1f220f(0x544)],Game_Interpreter[_0x1f220f(0x362)][_0x1f220f(0x544)]=function(_0x34d14c){const _0x3489a4=_0x1f220f;if(!$gameParty[_0x3489a4(0x18b)]()&&_0x34d14c<0x0){if(_0x3489a4(0x14d)!==_0x3489a4(0x14d)){if(_0x3f1344[_0x3489a4(0xef)]())return![];if(!_0x4e0f05[_0x3489a4(0x2a2)]())return![];if(_0x41664d[_0x3489a4(0x208)](_0x4426fd,_0x2db51a)['length']>0x0)return![];if(!_0x44e5ba['isPassableByAnyDirection'](_0x149cc0,_0x566481))return![];const _0x23227e=_0x505c6b['_events'][_0x3489a4(0x341)];if(_0x23227e>=_0x177ad9[_0x3489a4(0x597)])return![];return!![];}else{let _0x4bb2ed=$gameSystem['getControlledFollowerID']();if(_0x4bb2ed>0x0)return $gamePlayer[_0x3489a4(0x467)]()['follower'](_0x4bb2ed-0x1);}}return VisuMZ[_0x3489a4(0x141)][_0x3489a4(0x32f)]['call'](this,_0x34d14c);},Game_System[_0x1f220f(0x362)][_0x1f220f(0x543)]=function(){const _0x814db9=_0x1f220f;if(this[_0x814db9(0x298)]===undefined)this[_0x814db9(0x512)]();return this[_0x814db9(0x298)];},Game_System['prototype']['setStopFollowerChasing']=function(_0x3f1dcb){const _0x1239ec=_0x1f220f;if(this[_0x1239ec(0x298)]===undefined)this[_0x1239ec(0x512)]();this[_0x1239ec(0x298)]=_0x3f1dcb;;},VisuMZ['EventsMoveCore'][_0x1f220f(0x537)]=Game_Timer[_0x1f220f(0x362)][_0x1f220f(0xd8)],Game_Timer[_0x1f220f(0x362)][_0x1f220f(0xd8)]=function(){const _0x2d555d=_0x1f220f;VisuMZ[_0x2d555d(0x141)][_0x2d555d(0x537)]['call'](this),this['initEventsMoveCore']();},Game_Timer[_0x1f220f(0x362)][_0x1f220f(0x3e5)]=function(){const _0x2f4177=_0x1f220f;this[_0x2f4177(0x310)]=![],this['_speed']=-0x1,this[_0x2f4177(0x4d0)]=0x0;},Game_Timer[_0x1f220f(0x362)][_0x1f220f(0x2c5)]=function(_0x470412){const _0x15a6c9=_0x1f220f;if(!_0x470412)return;if(!this[_0x15a6c9(0x47f)])return;if(this[_0x15a6c9(0x310)])return;if(this[_0x15a6c9(0x35c)]<=0x0)return;if(this[_0x15a6c9(0x355)]===undefined)this[_0x15a6c9(0x3e5)]();this['_frames']+=this[_0x15a6c9(0x355)];if(this[_0x15a6c9(0x35c)]<=0x0){if(_0x15a6c9(0x484)==='cCUyi')return!![];else this[_0x15a6c9(0x3fb)]();}},VisuMZ['EventsMoveCore'][_0x1f220f(0x4b6)]=Game_Timer[_0x1f220f(0x362)][_0x1f220f(0x23b)],Game_Timer[_0x1f220f(0x362)]['start']=function(_0x53a1dc){const _0x171960=_0x1f220f;VisuMZ['EventsMoveCore'][_0x171960(0x4b6)][_0x171960(0x58d)](this,_0x53a1dc);if(this['_paused']===undefined)this[_0x171960(0x3e5)]();this[_0x171960(0x310)]=![];},VisuMZ[_0x1f220f(0x141)]['Game_Timer_stop']=Game_Timer['prototype']['stop'],Game_Timer[_0x1f220f(0x362)]['stop']=function(){const _0x165d27=_0x1f220f;VisuMZ['EventsMoveCore']['Game_Timer_stop']['call'](this);if(this['_paused']===undefined)this[_0x165d27(0x3e5)]();this['_paused']=![];},Game_Timer[_0x1f220f(0x362)]['pause']=function(){const _0x141ada=_0x1f220f;if(this[_0x141ada(0x35c)]<=0x0)return;this[_0x141ada(0x310)]=!![],this[_0x141ada(0x47f)]=!![];},Game_Timer[_0x1f220f(0x362)][_0x1f220f(0x1a2)]=function(){const _0x4582c5=_0x1f220f;if(this[_0x4582c5(0x35c)]<=0x0)return;this['_paused']=![],this['_working']=!![];},Game_Timer[_0x1f220f(0x362)][_0x1f220f(0x43f)]=function(_0x313bbd){const _0xb94fd0=_0x1f220f;this[_0xb94fd0(0x35c)]=this[_0xb94fd0(0x35c)]||0x0,this[_0xb94fd0(0x35c)]+=_0x313bbd,this[_0xb94fd0(0x47f)]=!![],this[_0xb94fd0(0x35c)]=Math[_0xb94fd0(0x280)](0x1,this['_frames']);},Game_Timer['prototype'][_0x1f220f(0x120)]=function(_0x192942){const _0x3b512f=_0x1f220f;this[_0x3b512f(0x35c)]=this[_0x3b512f(0x35c)]||0x0,this['_frames']=_0x192942,this[_0x3b512f(0x47f)]=!![],this[_0x3b512f(0x35c)]=Math[_0x3b512f(0x280)](0x1,this['_frames']);},Game_Timer[_0x1f220f(0x362)][_0x1f220f(0xd2)]=function(_0x56a425){const _0x56d6f5=_0x1f220f;this['_speed']=_0x56a425,this[_0x56d6f5(0x47f)]=!![],_0x56a425>0x0&&(this[_0x56d6f5(0x35c)]=Math['max'](this['_frames'],0x1));},Game_Timer['prototype'][_0x1f220f(0x134)]=function(_0x3a7687){const _0x1d8df5=_0x1f220f;if(this[_0x1d8df5(0x4d0)]===undefined)this['initEventsMoveCore']();this[_0x1d8df5(0x4d0)]=_0x3a7687;},VisuMZ['EventsMoveCore'][_0x1f220f(0x36b)]=Game_Timer[_0x1f220f(0x362)]['onExpire'],Game_Timer[_0x1f220f(0x362)][_0x1f220f(0x3fb)]=function(){const _0x3d992c=_0x1f220f;if(this['_expireCommonEvent']===undefined)this['initEventsMoveCore']();if(this[_0x3d992c(0x4d0)]){if(_0x3d992c(0xf4)==='gRaVG'){if(_0x4cdc27>this['y']&&this[_0x3d992c(0x158)](this['x'],this['y'],0x4))_0x422b6c=0x3;if(_0x1207a9<this['y']&&this[_0x3d992c(0x158)](this['x'],this['y'],0x6))_0x58a1eb=0x9;}else $gameTemp[_0x3d992c(0x19b)](this[_0x3d992c(0x4d0)]);}else VisuMZ['EventsMoveCore'][_0x3d992c(0x36b)][_0x3d992c(0x58d)](this);},VisuMZ['EventsMoveCore'][_0x1f220f(0x329)]=Game_Message[_0x1f220f(0x362)][_0x1f220f(0x245)],Game_Message[_0x1f220f(0x362)]['add']=function(_0x4cb42f){const _0x4882a9=_0x1f220f;VisuMZ[_0x4882a9(0x141)]['Game_Message_add']['call'](this,_0x4cb42f),this[_0x4882a9(0x37c)]=$gameTemp[_0x4882a9(0x330)]();},Game_Message[_0x1f220f(0x362)]['registerSelfEvent']=function(){const _0xc0c462=_0x1f220f;$gameTemp[_0xc0c462(0x358)](this[_0xc0c462(0x37c)]);},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x25c)]=Game_Switches[_0x1f220f(0x362)][_0x1f220f(0x40c)],Game_Switches[_0x1f220f(0x362)][_0x1f220f(0x40c)]=function(_0x4899be){const _0xd025df=_0x1f220f;if(DataManager[_0xd025df(0x3e2)](_0x4899be))return!!this['advancedValue'](_0x4899be);else{if(DataManager[_0xd025df(0x3d9)](_0x4899be))return!!this[_0xd025df(0x17c)](_0x4899be);else return DataManager['isMapSwitch'](_0x4899be)?!!this['mapValue'](_0x4899be):_0xd025df(0x421)!==_0xd025df(0x421)?_0x3d5d56:VisuMZ['EventsMoveCore']['Game_Switches_value'][_0xd025df(0x58d)](this,_0x4899be);}},Game_Switches[_0x1f220f(0x3ba)]={},Game_Switches[_0x1f220f(0x362)][_0x1f220f(0x269)]=function(_0x446d94){const _0x582864=_0x1f220f;if(!Game_Switches['advancedFunc'][_0x446d94]){$dataSystem[_0x582864(0x29d)][_0x446d94][_0x582864(0x4db)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x3aa686='return\x20%1'[_0x582864(0x2c0)](String(RegExp['$1']));Game_Switches[_0x582864(0x3ba)][_0x446d94]=new Function(_0x582864(0x10c),_0x3aa686);}const _0x25a8c5=$gameTemp[_0x582864(0x330)]()||this;return Game_Switches[_0x582864(0x3ba)][_0x446d94]['call'](_0x25a8c5,_0x446d94);},Game_Switches[_0x1f220f(0x362)]['selfValue']=function(_0x22880c){const _0x2ec072=_0x1f220f,_0x4da225=$gameTemp[_0x2ec072(0x330)]()||this;if(_0x4da225[_0x2ec072(0x2a0)]!==Game_Event)return VisuMZ[_0x2ec072(0x141)][_0x2ec072(0x25c)][_0x2ec072(0x58d)](this,_0x22880c);else{const _0x5900bb=[_0x4da225[_0x2ec072(0x27a)],_0x4da225[_0x2ec072(0x53b)],_0x2ec072(0x5d9)[_0x2ec072(0x2c0)](_0x22880c)];return $gameSelfSwitches[_0x2ec072(0x40c)](_0x5900bb);}},Game_Switches['prototype']['mapValue']=function(_0x46c3a8){const _0x307c47=_0x1f220f,_0x33ba0e=$gameMap?$gameMap[_0x307c47(0x3be)]():0x0,_0xa5ca17=[0x0,0x0,_0x307c47(0x5af)[_0x307c47(0x2c0)](_0x33ba0e,_0x46c3a8)];return $gameSelfSwitches['value'](_0xa5ca17);},VisuMZ[_0x1f220f(0x141)]['Game_Switches_setValue']=Game_Switches[_0x1f220f(0x362)]['setValue'],Game_Switches['prototype'][_0x1f220f(0x179)]=function(_0x49075f,_0x45e28e){const _0x3615f9=_0x1f220f;if(DataManager[_0x3615f9(0x3d9)](_0x49075f))this[_0x3615f9(0xda)](_0x49075f,_0x45e28e);else DataManager[_0x3615f9(0x133)](_0x49075f)?this['setMapValue'](_0x49075f,_0x45e28e):VisuMZ[_0x3615f9(0x141)][_0x3615f9(0x45c)][_0x3615f9(0x58d)](this,_0x49075f,_0x45e28e);},Game_Switches[_0x1f220f(0x362)][_0x1f220f(0xda)]=function(_0x51eeb8,_0x1763eb){const _0x2db384=_0x1f220f,_0x5850d6=$gameTemp[_0x2db384(0x330)]()||this;if(_0x5850d6[_0x2db384(0x2a0)]!==Game_Event)_0x2db384(0x2e0)==='gbpMg'?_0x160bdd[_0x2db384(0x358)](this[_0x2db384(0x37c)]):VisuMZ[_0x2db384(0x141)][_0x2db384(0x45c)]['call'](this,_0x51eeb8,_0x1763eb);else{const _0x247ea6=[_0x5850d6[_0x2db384(0x27a)],_0x5850d6[_0x2db384(0x53b)],'Self\x20Switch\x20%1'[_0x2db384(0x2c0)](_0x51eeb8)];$gameSelfSwitches[_0x2db384(0x179)](_0x247ea6,_0x1763eb);}},Game_Switches['prototype'][_0x1f220f(0x3ee)]=function(_0xe9f529,_0x5b40d0){const _0x71626b=_0x1f220f,_0x546324=$gameMap?$gameMap[_0x71626b(0x3be)]():0x0,_0x3f35fa=[0x0,0x0,_0x71626b(0x5af)['format'](_0x546324,_0xe9f529)];return $gameSelfSwitches[_0x71626b(0x179)](_0x3f35fa,_0x5b40d0);},VisuMZ['EventsMoveCore'][_0x1f220f(0x4b9)]=Game_Variables['prototype'][_0x1f220f(0x40c)],Game_Variables[_0x1f220f(0x362)][_0x1f220f(0x40c)]=function(_0x211980){const _0x3c2f5e=_0x1f220f;if(DataManager[_0x3c2f5e(0x1fe)](_0x211980))return _0x3c2f5e(0x583)===_0x3c2f5e(0x391)?_0x5b37e9>0x0?0x2:0x8:this[_0x3c2f5e(0x269)](_0x211980);else{if(DataManager[_0x3c2f5e(0x333)](_0x211980))return this[_0x3c2f5e(0x17c)](_0x211980);else{if(DataManager[_0x3c2f5e(0x201)](_0x211980))return this[_0x3c2f5e(0x511)](_0x211980);else{if(_0x3c2f5e(0x44d)!==_0x3c2f5e(0x44d)){const _0x55b75c=_0x39cad6[_0x3c2f5e(0x43b)][_0x19d0d1];if(!_0x55b75c)return;_0x55b75c[_0x3c2f5e(0x4e6)][_0x3c2f5e(0x58d)](this,_0x5810fa,_0x1de849,this);}else return VisuMZ[_0x3c2f5e(0x141)][_0x3c2f5e(0x4b9)][_0x3c2f5e(0x58d)](this,_0x211980);}}}},Game_Variables[_0x1f220f(0x3ba)]={},Game_Variables[_0x1f220f(0x362)][_0x1f220f(0x269)]=function(_0x2807bc){const _0xed6278=_0x1f220f;if(!Game_Variables['advancedFunc'][_0x2807bc]){if(_0xed6278(0x107)!==_0xed6278(0x107)){const _0x245cd5=this[_0xed6278(0x457)];if(!_0x245cd5)return 0x0;return _0x245cd5[_0xed6278(0x121)][_0xed6278(0x59f)];}else{$dataSystem[_0xed6278(0x2e9)][_0x2807bc][_0xed6278(0x4db)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x1a893d=_0xed6278(0x528)[_0xed6278(0x2c0)](String(RegExp['$1']));Game_Variables[_0xed6278(0x3ba)][_0x2807bc]=new Function(_0xed6278(0x324),_0x1a893d);}}const _0x4da768=$gameTemp['getSelfTarget']()||this;return Game_Variables['advancedFunc'][_0x2807bc][_0xed6278(0x58d)](_0x4da768,_0x2807bc);},Game_Variables[_0x1f220f(0x362)][_0x1f220f(0x17c)]=function(_0x551cd3){const _0x33044f=_0x1f220f,_0x1b73c3=$gameTemp[_0x33044f(0x330)]()||this;if(_0x1b73c3[_0x33044f(0x2a0)]!==Game_Event){if(_0x33044f(0x32c)!==_0x33044f(0x32c)){let _0x4b5902=[0x0,0x0,_0x33044f(0x164)[_0x33044f(0x2c0)](_0x3dce85,_0xb5611b)];_0x29a940[_0x33044f(0x179)](_0x4b5902,_0xc79ec9);}else return VisuMZ['EventsMoveCore'][_0x33044f(0x4b9)][_0x33044f(0x58d)](this,_0x551cd3);}else{if('bZGYV'!==_0x33044f(0x406)){const _0x1d62c5=[_0x1b73c3[_0x33044f(0x27a)],_0x1b73c3[_0x33044f(0x53b)],_0x33044f(0x21a)[_0x33044f(0x2c0)](_0x551cd3)];return $gameSelfSwitches[_0x33044f(0x40c)](_0x1d62c5);}else{if(this[_0x33044f(0x365)]!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this[_0x33044f(0x49e)](![]))return;if(!this[_0x33044f(0x178)](![]))return;_0x29d1fc[_0x33044f(0x141)]['Game_Event_checkEventTriggerAuto'][_0x33044f(0x58d)](this);}}},Game_Variables['prototype'][_0x1f220f(0x511)]=function(_0x3983fa){const _0x4fa0ec=_0x1f220f,_0x9408d5=$gameMap?$gameMap['mapId']():0x0,_0x486cf4=[0x0,0x0,_0x4fa0ec(0x164)[_0x4fa0ec(0x2c0)](_0x9408d5,_0x3983fa)];return $gameSelfSwitches[_0x4fa0ec(0x40c)](_0x486cf4)||0x0;},VisuMZ['EventsMoveCore']['Game_Variables_setValue']=Game_Variables['prototype'][_0x1f220f(0x179)],Game_Variables[_0x1f220f(0x362)]['setValue']=function(_0x10b783,_0x1002e9){const _0x11783a=_0x1f220f;if(DataManager[_0x11783a(0x333)](_0x10b783))this[_0x11783a(0xda)](_0x10b783,_0x1002e9);else DataManager[_0x11783a(0x201)](_0x10b783)?this[_0x11783a(0x3ee)](_0x10b783,_0x1002e9):'FCNlj'===_0x11783a(0x3fe)?VisuMZ[_0x11783a(0x141)]['Game_Variables_setValue'][_0x11783a(0x58d)](this,_0x10b783,_0x1002e9):this[_0x11783a(0x353)]['z']=this['z']-0x1;},Game_Variables[_0x1f220f(0x362)][_0x1f220f(0xda)]=function(_0x45ae6c,_0x1dce2e){const _0x276e49=_0x1f220f,_0x59eab5=$gameTemp['getSelfTarget']()||this;if(_0x59eab5[_0x276e49(0x2a0)]!==Game_Event)VisuMZ[_0x276e49(0x141)][_0x276e49(0x5d7)][_0x276e49(0x58d)](this,_0x45ae6c,_0x1dce2e);else{const _0x20d4d2=[_0x59eab5[_0x276e49(0x27a)],_0x59eab5[_0x276e49(0x53b)],_0x276e49(0x21a)[_0x276e49(0x2c0)](_0x45ae6c)];$gameSelfSwitches[_0x276e49(0x179)](_0x20d4d2,_0x1dce2e);}},Game_Variables[_0x1f220f(0x362)][_0x1f220f(0x3ee)]=function(_0x47d262,_0x5a9883){const _0x50e493=_0x1f220f,_0x3c0c83=$gameMap?$gameMap[_0x50e493(0x3be)]():0x0,_0xe9de34=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'[_0x50e493(0x2c0)](_0x3c0c83,_0x47d262)];$gameSelfSwitches[_0x50e493(0x179)](_0xe9de34,_0x5a9883);},VisuMZ['EventsMoveCore']['Game_SelfSwitches_value']=Game_SelfSwitches[_0x1f220f(0x362)]['value'],Game_SelfSwitches[_0x1f220f(0x362)]['value']=function(_0x5e70d8){const _0x31ea14=_0x1f220f;if(_0x5e70d8[0x2][_0x31ea14(0x4db)](/(?:SELF|MAP)/i)){if('apjVk'!==_0x31ea14(0x1bc))return this['selfValue'](_0x5e70d8);else{_0xab8737[_0x31ea14(0x239)](_0x2f6848,_0x9472be);const _0x4fda2d=_0x41ae4f[_0x31ea14(0x196)](),_0x43e469={'template':_0xc46696[_0x31ea14(0x48f)],'mapId':_0x3042e4['MapId']||_0x3fc2df[_0x31ea14(0x3be)](),'eventId':_0x41220d[_0x31ea14(0x312)]||_0x4fda2d[_0x31ea14(0x3d6)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x49cf06['Preserve'],'spawnEventId':_0x43a1b7[_0x31ea14(0x4cd)][_0x31ea14(0x341)]+0x3e8},_0x4899e3=_0xa65ff5['SuccessSwitchId']||0x0;if(!_0x25ac0f['PreloadedMaps'][_0x43e469[_0x31ea14(0x3be)]]&&_0x43e469[_0x31ea14(0x3be)]!==_0x235712[_0x31ea14(0x3be)]()){let _0x49f9df='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x31ea14(0x2c0)](_0x43e469[_0x31ea14(0x3be)]);_0x49f9df+=_0x31ea14(0x388),_0x49f9df+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x49f9df+=_0x31ea14(0x2ea),_0x49f9df+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'[_0x31ea14(0x2c0)](_0x43e469['mapId']),_0x152bcf(_0x49f9df);return;}const _0x5f1252=_0x3a82df[_0x31ea14(0x10f)](_0x43e469,_0x3cf0bb['TerrainTags'],_0x409011[_0x31ea14(0x52d)],_0x598062['Passability']);_0x4899e3&&_0x1ad1fa[_0x31ea14(0x179)](_0x4899e3,!!_0x5f1252);}}else{if(_0x31ea14(0x28b)===_0x31ea14(0x428))return this['_advancedSwitchVariable'];else{return VisuMZ[_0x31ea14(0x141)][_0x31ea14(0x1b9)][_0x31ea14(0x58d)](this,_0x5e70d8);;}}},Game_SelfSwitches[_0x1f220f(0x362)][_0x1f220f(0x17c)]=function(_0x410764){const _0x1188dd=_0x1f220f;return _0x410764[0x2]['match'](/VAR/i)?this[_0x1188dd(0x16a)][_0x410764]||0x0:!!this[_0x1188dd(0x16a)][_0x410764];},VisuMZ['EventsMoveCore'][_0x1f220f(0x1e9)]=Game_SelfSwitches[_0x1f220f(0x362)][_0x1f220f(0x179)],Game_SelfSwitches[_0x1f220f(0x362)][_0x1f220f(0x179)]=function(_0x1a2c70,_0x2d04b1){const _0x3cfc4f=_0x1f220f;_0x1a2c70[0x2]['match'](/(?:SELF|MAP)/i)?this[_0x3cfc4f(0xda)](_0x1a2c70,_0x2d04b1):VisuMZ[_0x3cfc4f(0x141)][_0x3cfc4f(0x1e9)][_0x3cfc4f(0x58d)](this,_0x1a2c70,_0x2d04b1);},Game_SelfSwitches['prototype'][_0x1f220f(0xda)]=function(_0xcbc971,_0x48d1bd){const _0x4bdb28=_0x1f220f;this[_0x4bdb28(0x16a)][_0xcbc971]=_0xcbc971[0x2][_0x4bdb28(0x4db)](/VAR/i)?_0x48d1bd:!!_0x48d1bd,this[_0x4bdb28(0x2f2)]();},VisuMZ[_0x1f220f(0x141)]['Scene_Map_createDisplayObjects']=Scene_Map['prototype'][_0x1f220f(0x169)],Scene_Map['prototype'][_0x1f220f(0x169)]=function(){const _0x1a7f37=_0x1f220f;$gameMap[_0x1a7f37(0x18f)](),VisuMZ[_0x1a7f37(0x141)]['Scene_Map_createDisplayObjects'][_0x1a7f37(0x58d)](this);},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x18f)]=function(){const _0x4a08f4=_0x1f220f;this['_lastMapId']=this[_0x4a08f4(0x3be)](),this[_0x4a08f4(0x579)]=undefined;const _0x1d4d87=this[_0x4a08f4(0x275)]();for(const _0x3d6181 of _0x1d4d87){if(_0x3d6181)$gameSelfSwitches[_0x4a08f4(0x221)](_0x3d6181);}},Game_SelfSwitches['prototype'][_0x1f220f(0x221)]=function(_0x5e8711){const _0x5ae41c=_0x1f220f;if(!_0x5e8711)return;if(!_0x5e8711['event']())return;const _0x57f7ee=_0x5e8711[_0x5ae41c(0x427)]()[_0x5ae41c(0x57b)]||'';if(_0x57f7ee['match'](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){if(_0x5ae41c(0x1e0)===_0x5ae41c(0x1e0)){const _0x511659='%1,%2,'[_0x5ae41c(0x2c0)]($gameMap[_0x5ae41c(0x27a)],_0x5e8711[_0x5ae41c(0x53b)]),_0x1adaae=Object['keys'](this[_0x5ae41c(0x16a)])[_0x5ae41c(0x1ea)](_0x268aa0=>_0x268aa0['startsWith'](_0x511659));while(_0x1adaae['length']>0x0){const _0x4b4972=_0x1adaae[_0x5ae41c(0x2cc)]();delete this['_data'][_0x4b4972];}}else this[_0x5ae41c(0x207)](_0x3692f2,_0x38616b['x']+0x2,_0x340d7d['y']);}},Game_SelfSwitches['prototype'][_0x1f220f(0x43c)]=function(_0x443b5f){const _0x280ee5=_0x1f220f,_0x5c4376='%1,'[_0x280ee5(0x2c0)]($gameMap[_0x280ee5(0x27a)]),_0x2fbd38=Object[_0x280ee5(0x571)](this[_0x280ee5(0x16a)])[_0x280ee5(0x1ea)](_0x37b4f0=>_0x37b4f0['startsWith'](_0x5c4376));while(_0x2fbd38[_0x280ee5(0x341)]>0x0){const _0x1c3d3e=_0x2fbd38[_0x280ee5(0x2cc)]();delete this[_0x280ee5(0x16a)][_0x1c3d3e];}if(_0x443b5f===$gameMap[_0x280ee5(0x3be)]()){if('UfGLY'==='EkvWg'){if(this[_0x280ee5(0x423)](_0x20a808,_0x1ebae2)[_0x280ee5(0x341)]>0x0)return!![];if(_0x4ae025['x']===_0x1dc018&&_0x285b69['y']===_0x31df72)return!![];if(this['boat']()[_0x280ee5(0x181)](_0x9123af,_0x1aa6c9))return!![];if(this[_0x280ee5(0x515)]()['posNt'](_0x53fb9b,_0x2f4ff3))return!![];return![];}else $gameMap['requestRefresh']();}},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x1b3)]=Game_Enemy[_0x1f220f(0x362)]['meetsSwitchCondition'],Game_Enemy[_0x1f220f(0x362)][_0x1f220f(0x1dc)]=function(_0x50c017){const _0x246ddc=_0x1f220f;$gameTemp['registerSelfTarget'](this);const _0x34557f=VisuMZ[_0x246ddc(0x141)][_0x246ddc(0x1b3)]['call'](this,_0x50c017);return $gameTemp['clearSelfTarget'](),_0x34557f;},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x24c)]=Game_Troop[_0x1f220f(0x362)][_0x1f220f(0x2be)],Game_Troop['prototype'][_0x1f220f(0x2be)]=function(_0x4f8365){const _0x47f62c=_0x1f220f;$gameTemp[_0x47f62c(0x358)](this);const _0x53359f=VisuMZ['EventsMoveCore'][_0x47f62c(0x24c)][_0x47f62c(0x58d)](this,_0x4f8365);return $gameTemp[_0x47f62c(0x328)](),_0x53359f;},VisuMZ[_0x1f220f(0x141)]['Game_Map_setup']=Game_Map[_0x1f220f(0x362)][_0x1f220f(0x2d9)],Game_Map['prototype']['setup']=function(_0x5cf421){const _0x54b18e=_0x1f220f;this[_0x54b18e(0x4f8)](_0x5cf421),this['clearEventCache'](),VisuMZ[_0x54b18e(0x141)][_0x54b18e(0xf9)][_0x54b18e(0x58d)](this,_0x5cf421),this[_0x54b18e(0x5a2)](),this[_0x54b18e(0x56e)](),this[_0x54b18e(0x5d5)](),this[_0x54b18e(0x1e4)](),this[_0x54b18e(0x26c)](),this['setupPlayerVisibilityOverrides'](),this[_0x54b18e(0x5dc)](),this[_0x54b18e(0x5a2)]();},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x40e)]=Game_Map['prototype'][_0x1f220f(0xff)],Game_Map['prototype'][_0x1f220f(0xff)]=function(){const _0xcf8067=_0x1f220f;VisuMZ['EventsMoveCore'][_0xcf8067(0x40e)][_0xcf8067(0x58d)](this),this[_0xcf8067(0x4ad)]();},Game_Map[_0x1f220f(0x32e)]=0xc8,Game_Map['prototype'][_0x1f220f(0x30d)]=function(){const _0x515696=_0x1f220f,_0x4b6d6e=Game_Map[_0x515696(0x32e)];this[_0x515696(0x137)]=this[_0x515696(0x275)]()[_0x515696(0x341)]>_0x4b6d6e;if(this[_0x515696(0x137)]&&$gameTemp[_0x515696(0x1cb)]()){}},Game_Map[_0x1f220f(0x362)]['isEventOverloaded']=function(){const _0x1f94cb=_0x1f220f;return this[_0x1f94cb(0x137)];},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x5a2)]=function(){const _0x2f6213=_0x1f220f;this[_0x2f6213(0x579)]=undefined;},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x56e)]=function(){const _0x56056d=_0x1f220f;this[_0x56056d(0x5cc)]=VisuMZ[_0x56056d(0x141)][_0x56056d(0x454)][_0x56056d(0x4c9)][_0x56056d(0x332)];const _0x20e444=$dataMap[_0x56056d(0x57b)]||'';if(_0x20e444['match'](/<DIAGONAL MOVEMENT: ON>/i))this[_0x56056d(0x5cc)]=!![];else _0x20e444[_0x56056d(0x4db)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x56056d(0x5cc)]=![]);},Game_Map[_0x1f220f(0x362)]['isSupportDiagonalMovement']=function(){const _0x4135d6=_0x1f220f,_0x37d6ff=$gameSystem[_0x4135d6(0x560)]();if(_0x37d6ff===_0x4135d6(0x3a4))return!![];if(_0x37d6ff==='disable')return![];if(this[_0x4135d6(0x5cc)]===undefined)this[_0x4135d6(0x56e)]();return this['_diagonalSupport'];},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x39e)]=function(_0x3901b5,_0x14363d){const _0x3a97f6=_0x1f220f;if([0x1,0x4,0x7][_0x3a97f6(0x220)](_0x14363d))_0x3901b5-=0x1;if([0x3,0x6,0x9][_0x3a97f6(0x220)](_0x14363d))_0x3901b5+=0x1;return this['roundX'](_0x3901b5);},Game_Map[_0x1f220f(0x362)]['roundYWithDirection']=function(_0x287f45,_0x21dd61){const _0x5cf7a2=_0x1f220f;if([0x1,0x2,0x3][_0x5cf7a2(0x220)](_0x21dd61))_0x287f45+=0x1;if([0x7,0x8,0x9][_0x5cf7a2(0x220)](_0x21dd61))_0x287f45-=0x1;return this[_0x5cf7a2(0x394)](_0x287f45);},Game_Map['prototype'][_0x1f220f(0x534)]=function(_0x831641,_0x222b67,_0xfd35fa,_0x38acef){const _0x57a53c=_0x1f220f;return Math[_0x57a53c(0x280)](Math[_0x57a53c(0x16c)](this['deltaX'](_0x831641,_0xfd35fa)),Math[_0x57a53c(0x16c)](this[_0x57a53c(0x360)](_0x222b67,_0x38acef)));},Game_Map[_0x1f220f(0x362)]['setupRegionRestrictions']=function(){const _0x56892b=_0x1f220f,_0x1bced7=VisuMZ[_0x56892b(0x141)][_0x56892b(0x454)][_0x56892b(0x306)],_0x1cded7={},_0x8a85d9=[_0x56892b(0x425),_0x56892b(0x35f),_0x56892b(0x3bb)],_0x34d399=[_0x56892b(0x305),_0x56892b(0x444),_0x56892b(0x2dd),_0x56892b(0x18a),_0x56892b(0x57d),_0x56892b(0x155),'Ship',_0x56892b(0x272)];for(const _0x35de00 of _0x8a85d9){for(const _0x127fe0 of _0x34d399){const _0x1f7821=_0x56892b(0x1ee)[_0x56892b(0x2c0)](_0x127fe0,_0x35de00);if(_0x1bced7[_0x1f7821]){if(_0x56892b(0x2f0)===_0x56892b(0x570))return this[_0x56892b(0x11d)][_0x56892b(0x34d)]||0x0;else _0x1cded7[_0x1f7821]=_0x1bced7[_0x1f7821][_0x56892b(0x4b8)](0x0);}}}const _0x3636e3=$dataMap[_0x56892b(0x57b)]||'',_0xaf896a=_0x3636e3['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0xaf896a){if('huyFH'==='EkGTk')this[_0x56892b(0x114)]=![];else for(const _0x174ce5 of _0xaf896a){_0x174ce5['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x1f98d0=String(RegExp['$1'])['toLowerCase']()[_0x56892b(0x445)](),_0x468c80=String(RegExp['$2'])[_0x56892b(0x552)]()[_0x56892b(0x445)]();const _0x179b35=JSON[_0x56892b(0x17f)]('['+RegExp['$3'][_0x56892b(0x4db)](/\d+/g)+']');_0x1f98d0=_0x1f98d0[_0x56892b(0x5a4)](0x0)[_0x56892b(0x38b)]()+_0x1f98d0[_0x56892b(0x4b8)](0x1),_0x468c80=_0x468c80[_0x56892b(0x5a4)](0x0)[_0x56892b(0x38b)]()+_0x468c80['slice'](0x1);const _0x1ad1ed=_0x56892b(0x1ee)[_0x56892b(0x2c0)](_0x1f98d0,_0x468c80);if(_0x1cded7[_0x1ad1ed])_0x1cded7[_0x1ad1ed]=_0x1cded7[_0x1ad1ed][_0x56892b(0x3a7)](_0x179b35);}}this[_0x56892b(0x5c0)]=_0x1cded7;},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x574)]=function(_0x27c7fd,_0x3f3c85,_0x514cd9,_0x1b8bd9){const _0x492c4a=_0x1f220f,_0x43d764=this[_0x492c4a(0x39e)](_0x27c7fd,_0x514cd9),_0x32bfd9=this[_0x492c4a(0x580)](_0x3f3c85,_0x514cd9),_0x2534e7=this[_0x492c4a(0x1c7)](_0x43d764,_0x32bfd9),_0x13d399=this['_regionRules'];if(_0x13d399['AllAllow']['includes'](_0x2534e7)){if('EUuIT'===_0x492c4a(0x291))return!![];else this['_moveSynch'][_0x492c4a(0x2a9)]=_0x30c2b0(_0x23e8da['$1'])[_0x492c4a(0x552)]()[_0x492c4a(0x445)]();}else{if(_0x1b8bd9===_0x492c4a(0x354)){if('ONkCv'===_0x492c4a(0x126))this[_0x492c4a(0x4c7)]=![],this[_0x492c4a(0x2b3)](),this[_0x492c4a(0x222)](),this['clearSpriteOffsets'](),this['clearStepPattern']();else return _0x13d399[_0x492c4a(0x12d)][_0x492c4a(0x220)](_0x2534e7)||_0x13d399[_0x492c4a(0x54e)][_0x492c4a(0x220)](_0x2534e7);}else{if(_0x1b8bd9===_0x492c4a(0x427))return _0x13d399[_0x492c4a(0x1e7)][_0x492c4a(0x220)](_0x2534e7)||_0x13d399[_0x492c4a(0x54e)][_0x492c4a(0x220)](_0x2534e7);else{if(_0x13d399[_0x492c4a(0x3b3)][_0x492c4a(0x220)](_0x2534e7)){if('uVGpc'===_0x492c4a(0x40f))return!![];else _0x2370b6[_0x492c4a(0x25a)][_0x19059f]=_0x3b2c21[_0x41bb1c],_0x2768aa[_0x3cd49c]=_0x34aedb;}else{const _0x2c0d2b=_0x492c4a(0x215)[_0x492c4a(0x2c0)](_0x1b8bd9[_0x492c4a(0x5a4)](0x0)[_0x492c4a(0x38b)]()+_0x1b8bd9['slice'](0x1));if(_0x13d399[_0x2c0d2b])return _0x13d399[_0x2c0d2b]['includes'](_0x2534e7);}}}}return![];},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x124)]=function(_0x2df447,_0x1a8f00,_0x53369f,_0x33c452){const _0x2bc483=_0x1f220f,_0x2ec15b=this[_0x2bc483(0x39e)](_0x2df447,_0x53369f),_0x2ed159=this[_0x2bc483(0x580)](_0x1a8f00,_0x53369f),_0x3ebd3c=this[_0x2bc483(0x1c7)](_0x2ec15b,_0x2ed159),_0x2fa36d=this['_regionRules'];if(_0x2fa36d[_0x2bc483(0x19d)]['includes'](_0x3ebd3c)){if(_0x2bc483(0x128)===_0x2bc483(0x440))this[_0x2bc483(0x5b6)](_0x2bc483(0x39d));else return!![];}else{if(_0x33c452===_0x2bc483(0x354))return _0x2fa36d[_0x2bc483(0x47a)]['includes'](_0x3ebd3c)||_0x2fa36d['WalkForbid'][_0x2bc483(0x220)](_0x3ebd3c);else{if(_0x33c452===_0x2bc483(0x427))return _0x2fa36d['EventForbid']['includes'](_0x3ebd3c)||_0x2fa36d[_0x2bc483(0x53d)][_0x2bc483(0x220)](_0x3ebd3c);else{if(_0x2fa36d[_0x2bc483(0x26d)][_0x2bc483(0x220)](_0x3ebd3c))return!![];else{if(_0x2bc483(0x4df)===_0x2bc483(0x4df)){const _0x301d18=_0x2bc483(0x5c7)[_0x2bc483(0x2c0)](_0x33c452['charAt'](0x0)['toUpperCase']()+_0x33c452[_0x2bc483(0x4b8)](0x1));if(_0x2fa36d[_0x301d18])return _0x2fa36d[_0x301d18][_0x2bc483(0x220)](_0x3ebd3c);}else{const _0x10788b=new _0x5b54e3(0x0,0x0,0x1,0x1);this[_0x2bc483(0x17b)]=new _0x451759(_0x10788b),this[_0x2bc483(0x17b)][_0x2bc483(0xcc)]=0x0,this['opacity']=this['isLabelVisible']()?0xff:0x0;}}}}}return![];},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x40b)]=function(_0x4a9948,_0x15a8b3,_0xeb39ce,_0x574743){const _0x1c9152=_0x1f220f;_0xeb39ce=_0x574743===_0x1c9152(0x266)?0x5:_0xeb39ce;const _0x230e34=this[_0x1c9152(0x39e)](_0x4a9948,_0xeb39ce),_0xd39fcf=this[_0x1c9152(0x580)](_0x15a8b3,_0xeb39ce),_0x1ccc0c=this[_0x1c9152(0x1c7)](_0x230e34,_0xd39fcf),_0xae5550=this[_0x1c9152(0x5c0)];if(_0xae5550['VehicleDock'][_0x1c9152(0x220)](_0x1ccc0c))return'fFrfe'===_0x1c9152(0x5c1)?!![]:this[_0x1c9152(0x3bf)](_0xc11705(_0x57c201['$1']),_0x5323da(_0xf9f8f['$2']));else{if(_0x1c9152(0x21e)!==_0x1c9152(0x55e)){const _0x9568fd=_0x1c9152(0x5ec)[_0x1c9152(0x2c0)](_0x574743[_0x1c9152(0x5a4)](0x0)[_0x1c9152(0x38b)]()+_0x574743[_0x1c9152(0x4b8)](0x1));if(_0xae5550[_0x9568fd])return _0xae5550[_0x9568fd][_0x1c9152(0x220)](_0x1ccc0c);}else{if(_0x5eb9f6['_scene'][_0x1c9152(0x2a0)]===_0x483bd6)return![];return _0x4589d2[_0x1c9152(0x168)][_0x1c9152(0x220)](_0x422fd2);}}return![];},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x5e8)]=Game_Map['prototype']['refresh'],Game_Map[_0x1f220f(0x362)][_0x1f220f(0x122)]=function(){const _0x28679a=_0x1f220f;VisuMZ['EventsMoveCore'][_0x28679a(0x5e8)][_0x28679a(0x58d)](this),this[_0x28679a(0x54f)]();},Game_Map[_0x1f220f(0x362)]['checkNeedForPeriodicRefresh']=function(){const _0x34c0df=_0x1f220f;this[_0x34c0df(0x386)]=![];if(this[_0x34c0df(0x275)]()[_0x34c0df(0x35d)](_0x1b391a=>_0x1b391a[_0x34c0df(0xf3)]())){if(_0x34c0df(0x409)!=='GMmKF'){this[_0x34c0df(0x386)]=!![];return;}else{if(this['_followerControlID']===_0x3b6a6f)this[_0x34c0df(0x512)]();this[_0x34c0df(0x3c6)]=_0xe458f3;;}}if(this[_0x34c0df(0x275)]()['some'](_0x1ea337=>_0x1ea337['hasCPCs']())){if('AEpBR'===_0x34c0df(0x587)){this[_0x34c0df(0x386)]=!![];return;}else{if(!this[_0x34c0df(0x121)])return;this[_0x34c0df(0x121)][_0x34c0df(0x279)]=!!_0x375053[_0x34c0df(0x141)][_0x34c0df(0x454)][_0x34c0df(0x4c9)][_0x34c0df(0x41e)];}}if(this[_0x34c0df(0x562)][_0x34c0df(0x35d)](_0x2d2cef=>_0x2d2cef[_0x34c0df(0xf3)]())){if(_0x34c0df(0x529)==='ciIJD'){_0x550af9[_0x34c0df(0x239)](_0x1e1b56,_0x1b3975);const _0x1c514c=_0x1852f5[_0x34c0df(0x196)]();_0xc8ff7b[_0x34c0df(0x4a6)](_0x575f6a[_0x34c0df(0x206)]||_0x1c514c['eventId']());}else{this[_0x34c0df(0x386)]=!![];return;}}if(this[_0x34c0df(0x562)][_0x34c0df(0x35d)](_0x6e72f7=>_0x6e72f7[_0x34c0df(0x2e8)]())){this[_0x34c0df(0x386)]=!![];return;}},VisuMZ[_0x1f220f(0x141)]['Game_Map_update']=Game_Map[_0x1f220f(0x362)][_0x1f220f(0x2c5)],Game_Map[_0x1f220f(0x362)][_0x1f220f(0x2c5)]=function(_0x12c84b){const _0x106eab=_0x1f220f;this[_0x106eab(0x3b9)](),VisuMZ[_0x106eab(0x141)]['Game_Map_update'][_0x106eab(0x58d)](this,_0x12c84b);},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x3b9)]=function(){const _0x5defab=_0x1f220f;if(!this[_0x5defab(0x386)])return;this[_0x5defab(0x4c5)]=this['_periodicRefreshTimer']||0x3c,this['_periodicRefreshTimer']--,this[_0x5defab(0x4c5)]<=0x0&&(this['requestRefresh'](),this[_0x5defab(0x4c5)]=0x3c);},VisuMZ[_0x1f220f(0x141)]['Game_Map_isDashDisabled']=Game_Map[_0x1f220f(0x362)]['isDashDisabled'],Game_Map[_0x1f220f(0x362)][_0x1f220f(0x502)]=function(){const _0x55c6b4=_0x1f220f;if(!$gameSystem[_0x55c6b4(0x4b4)]())return!![];return VisuMZ[_0x55c6b4(0x141)]['Game_Map_isDashDisabled'][_0x55c6b4(0x58d)](this);},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x1e4)]=function(){const _0x462b54=_0x1f220f;this[_0x462b54(0x338)]=![];const _0x145b70=$dataMap[_0x462b54(0x57b)]||'';_0x145b70['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x27b)]=function(){const _0x3ead25=_0x1f220f;if(this['_saveEventLocations']===undefined)this[_0x3ead25(0x1e4)]();return this['_saveEventLocations'];},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x4f8)]=function(_0x29e713){const _0x41a290=_0x1f220f;_0x29e713!==this['mapId']()&&$gamePlayer&&(_0x41a290(0x3ce)!==_0x41a290(0x3ce)?(_0x3091a0['mapId']=_0x379c11[_0x41a290(0x20f)],_0x4a34cb['eventId']=_0x5c21bc[_0x41a290(0x206)]):$gameSystem[_0x41a290(0x4f8)](this[_0x41a290(0x3be)]()));},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x26c)]=function(){const _0x1b02aa=_0x1f220f;this[_0x1b02aa(0x4cd)]=$gameSystem[_0x1b02aa(0x2f5)](this[_0x1b02aa(0x3be)]()),this['_needsRefresh']=!![];},VisuMZ['EventsMoveCore'][_0x1f220f(0x5dd)]=Game_Map['prototype'][_0x1f220f(0x275)],Game_Map[_0x1f220f(0x362)][_0x1f220f(0x275)]=function(){const _0xed65f6=_0x1f220f;if(this[_0xed65f6(0x579)])return this[_0xed65f6(0x579)];const _0x2e7138=VisuMZ['EventsMoveCore'][_0xed65f6(0x5dd)][_0xed65f6(0x58d)](this),_0x4ad545=_0x2e7138['concat'](this[_0xed65f6(0x4cd)]||[]);return this[_0xed65f6(0x579)]=_0x4ad545[_0xed65f6(0x1ea)](_0x55a4ab=>!!_0x55a4ab),this[_0xed65f6(0x579)];},VisuMZ[_0x1f220f(0x141)]['Game_Map_event']=Game_Map[_0x1f220f(0x362)]['event'],Game_Map[_0x1f220f(0x362)][_0x1f220f(0x427)]=function(_0x13a43e){const _0x3fd458=_0x1f220f;return _0x13a43e>=0x3e8?(_0x13a43e-=0x3e8,this['_spawnedEvents'][_0x13a43e]):VisuMZ['EventsMoveCore'][_0x3fd458(0x204)][_0x3fd458(0x58d)](this,_0x13a43e);},Game_Map['prototype'][_0x1f220f(0x5ee)]=function(_0x28eb53){const _0x5650f7=_0x1f220f,_0x1ebe1e=this[_0x5650f7(0x427)](_0x28eb53);if(_0x1ebe1e)_0x1ebe1e['erase']();},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x4a2)]=function(){const _0x3b8899=_0x1f220f,_0x2ef398={'template':'Button','mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x3b8899(0x4cd)][_0x3b8899(0x341)]+0x3e8};this['createSpawnedEventWithData'](_0x2ef398);},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x2ed)]=function(_0x539448,_0x28192f){const _0x409c5a=_0x1f220f;if(this[_0x409c5a(0x423)](_0x539448,_0x28192f)[_0x409c5a(0x341)]>0x0)return!![];if($gamePlayer['x']===_0x539448&&$gamePlayer['y']===_0x28192f)return!![];if(this[_0x409c5a(0x271)]()['posNt'](_0x539448,_0x28192f))return!![];if(this[_0x409c5a(0x515)]()[_0x409c5a(0x181)](_0x539448,_0x28192f))return!![];return![];},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x434)]=function(_0x2d3113,_0x127233,_0x4e802b){const _0x3267c6=_0x1f220f;$gameTemp[_0x3267c6(0x43a)]=_0x2d3113;const _0x2d1487=new Game_Event(_0x2d3113[_0x3267c6(0x3be)],_0x2d3113[_0x3267c6(0x3d6)]);$gameTemp[_0x3267c6(0x43a)]=undefined,_0x2d1487[_0x3267c6(0x122)]();let _0x105585=_0x127233-_0x2d1487[_0x3267c6(0x4f0)]['left'],_0xabdcd=_0x127233+_0x2d1487['_addedHitbox'][_0x3267c6(0x525)],_0x48491b=_0x4e802b-_0x2d1487[_0x3267c6(0x4f0)]['up'],_0x476c0a=_0x4e802b+_0x2d1487[_0x3267c6(0x4f0)][_0x3267c6(0x1c4)];for(let _0xbb9209=_0x105585;_0xbb9209<=_0xabdcd;_0xbb9209++){for(let _0x5f3aa8=_0x48491b;_0x5f3aa8<=_0x476c0a;_0x5f3aa8++){if(this[_0x3267c6(0x2ed)](_0xbb9209,_0x5f3aa8))return![];}}return!![];},Game_Map[_0x1f220f(0x362)]['createSpawnedEventWithData']=function(_0x17be5e){const _0x33858b=_0x1f220f;$gameTemp['_spawnData']=_0x17be5e;const _0x31f7db=new Game_Event(_0x17be5e[_0x33858b(0x3be)],_0x17be5e['eventId']);$gameTemp['_spawnData']=undefined,this[_0x33858b(0x4cd)][_0x33858b(0x57e)](_0x31f7db),_0x31f7db[_0x33858b(0x24f)](_0x17be5e),this['clearEventCache']();},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x51a)]=function(_0x2b4a46,_0x5e11d4,_0x583e05){const _0x44e229=_0x1f220f,_0xdae0d5=_0x2b4a46['template']['toUpperCase']()[_0x44e229(0x445)]();if(_0xdae0d5!==_0x44e229(0x2d5)){if(_0x44e229(0x442)===_0x44e229(0x2b5))this[_0x44e229(0x3ee)](_0x5546ac,_0x29102b);else{const _0x2dc3d8=VisuMZ[_0x44e229(0x43b)][_0xdae0d5];if(_0x2dc3d8){if(_0x44e229(0xd6)!==_0x44e229(0x4d5))_0x2b4a46[_0x44e229(0x3be)]=_0x2dc3d8[_0x44e229(0x20f)],_0x2b4a46['eventId']=_0x2dc3d8[_0x44e229(0x206)];else return _0x15fb2d['EventsMoveCore'][_0x44e229(0x25c)][_0x44e229(0x58d)](this,_0x4f513d);}}}const _0x2bce3c=_0x2b4a46['x'],_0x451d43=_0x2b4a46['y'];if(!this[_0x44e229(0x5f7)](_0x2bce3c,_0x451d43))return![];if(_0x5e11d4){if(this[_0x44e229(0x2ed)](_0x2bce3c,_0x451d43))return![];if(!this[_0x44e229(0x434)](_0x2b4a46,_0x2bce3c,_0x451d43))return![];}if(_0x583e05){if(!this[_0x44e229(0x307)](_0x2bce3c,_0x451d43))return![];}return this['createSpawnedEventWithData'](_0x2b4a46),!![];},Game_Map['prototype'][_0x1f220f(0x49d)]=function(_0x4272d3,_0x1e2879,_0x53481c,_0x35e687){const _0x38eb77=_0x1f220f,_0x534ad1=_0x4272d3[_0x38eb77(0x5ea)][_0x38eb77(0x38b)]()[_0x38eb77(0x445)]();if(_0x534ad1!==_0x38eb77(0x2d5)){const _0x1abacf=VisuMZ['EventTemplates'][_0x534ad1];_0x1abacf&&(_0x4272d3[_0x38eb77(0x3be)]=_0x1abacf['MapID'],_0x4272d3['eventId']=_0x1abacf['EventID']);}const _0x3e1372=[],_0xf05b91=this['width'](),_0x51ea0c=this[_0x38eb77(0x405)]();for(let _0x17a6aa=0x0;_0x17a6aa<_0xf05b91;_0x17a6aa++){for(let _0x44c8f6=0x0;_0x44c8f6<_0x51ea0c;_0x44c8f6++){if(_0x38eb77(0x4e3)!==_0x38eb77(0x1f0)){if(!_0x1e2879[_0x38eb77(0x220)](this[_0x38eb77(0x1c7)](_0x17a6aa,_0x44c8f6)))continue;if(!this[_0x38eb77(0x5f7)](_0x17a6aa,_0x44c8f6))continue;if(_0x53481c){if(this[_0x38eb77(0x2ed)](_0x17a6aa,_0x44c8f6))continue;if(!this[_0x38eb77(0x434)](_0x4272d3,_0x17a6aa,_0x44c8f6))continue;}if(_0x35e687){if('wDuNC'!==_0x38eb77(0x370)){if(!this[_0x38eb77(0x307)](_0x17a6aa,_0x44c8f6))continue;}else this['morphIntoTemplate'](_0x4e4010,!![]);}_0x3e1372[_0x38eb77(0x57e)]([_0x17a6aa,_0x44c8f6]);}else _0x502b26[_0x38eb77(0x141)]['Sprite_Balloon_updatePosition'][_0x38eb77(0x58d)](this),this[_0x38eb77(0x30a)]();}}if(_0x3e1372[_0x38eb77(0x341)]>0x0){const _0x34937b=_0x3e1372[Math['randomInt'](_0x3e1372[_0x38eb77(0x341)])];return _0x4272d3['x']=_0x34937b[0x0],_0x4272d3['y']=_0x34937b[0x1],this[_0x38eb77(0x395)](_0x4272d3),!![];}return![];},Game_Map[_0x1f220f(0x362)]['prepareSpawnedEventAtTerrainTag']=function(_0x1458a4,_0x4dad47,_0x5b374e,_0x59c5b9){const _0xa7872a=_0x1f220f,_0x2972b1=_0x1458a4[_0xa7872a(0x5ea)][_0xa7872a(0x38b)]()[_0xa7872a(0x445)]();if(_0x2972b1!==_0xa7872a(0x2d5)){const _0x540be1=VisuMZ[_0xa7872a(0x43b)][_0x2972b1];_0x540be1&&(_0x1458a4['mapId']=_0x540be1[_0xa7872a(0x20f)],_0x1458a4[_0xa7872a(0x3d6)]=_0x540be1['EventID']);}const _0x1e1e12=[],_0x1ebfbc=this[_0xa7872a(0x59f)](),_0x4199ba=this['height']();for(let _0x47ef79=0x0;_0x47ef79<_0x1ebfbc;_0x47ef79++){for(let _0x12c7e6=0x0;_0x12c7e6<_0x4199ba;_0x12c7e6++){if(!_0x4dad47[_0xa7872a(0x220)](this[_0xa7872a(0x18e)](_0x47ef79,_0x12c7e6)))continue;if(!this[_0xa7872a(0x5f7)](_0x47ef79,_0x12c7e6))continue;if(_0x5b374e){if(this[_0xa7872a(0x2ed)](_0x47ef79,_0x12c7e6))continue;if(!this['isSpawnHitboxCollisionOk'](_0x1458a4,_0x47ef79,_0x12c7e6))continue;}if(_0x59c5b9){if(!this['isPassableByAnyDirection'](_0x47ef79,_0x12c7e6))continue;}_0x1e1e12[_0xa7872a(0x57e)]([_0x47ef79,_0x12c7e6]);}}if(_0x1e1e12[_0xa7872a(0x341)]>0x0){const _0x4446e7=_0x1e1e12[Math[_0xa7872a(0x5bd)](_0x1e1e12[_0xa7872a(0x341)])];return _0x1458a4['x']=_0x4446e7[0x0],_0x1458a4['y']=_0x4446e7[0x1],this[_0xa7872a(0x395)](_0x1458a4),!![];}return![];},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x307)]=function(_0x54eb5c,_0x2de8a7){const _0x238526=_0x1f220f;if(this[_0x238526(0x256)](_0x54eb5c,_0x2de8a7,0x2))return!![];if(this['isPassable'](_0x54eb5c,_0x2de8a7,0x4))return!![];if(this[_0x238526(0x256)](_0x54eb5c,_0x2de8a7,0x6))return!![];if(this[_0x238526(0x256)](_0x54eb5c,_0x2de8a7,0x8))return!![];return![];},Game_Map['prototype']['despawnEventId']=function(_0x1b343e){const _0x1c3921=_0x1f220f;if(_0x1b343e<0x3e8)return;if(!this[_0x1c3921(0x4cd)])return;const _0xd2633=this[_0x1c3921(0x427)](_0x1b343e);_0xd2633[_0x1c3921(0x5e0)](-0x1,-0x1),_0xd2633[_0x1c3921(0x55a)](),this[_0x1c3921(0x4cd)][_0x1b343e-0x3e8]=null,this[_0x1c3921(0x5a2)]();},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x1be)]=function(){for(const _0x53f0f9 of this['_spawnedEvents']){if(_0x53f0f9)return _0x53f0f9;}return null;},Game_Map[_0x1f220f(0x362)]['firstSpawnedEventID']=function(){const _0x33a5a9=_0x1f220f,_0x565dae=this['firstSpawnedEvent']();return _0x565dae?_0x565dae[_0x33a5a9(0x53b)]:0x0;},Game_Map['prototype'][_0x1f220f(0x5b4)]=function(){const _0x566ca3=_0x1f220f,_0x4d1c7c=this[_0x566ca3(0x4cd)][_0x566ca3(0x4b8)](0x0)[_0x566ca3(0x59d)]();for(const _0x31a433 of _0x4d1c7c){if(_0x566ca3(0x42f)!==_0x566ca3(0x42f)){if(this[_0x566ca3(0x46b)]()>=0x0){const _0x4da06e=_0x122b79['GetMoveSynchTarget'](this[_0x566ca3(0x46b)]());if(_0x4da06e)return _0x4da06e['realMoveSpeed']();}return _0x4c9663[_0x566ca3(0x362)][_0x566ca3(0x3af)][_0x566ca3(0x58d)](this);}else{if(_0x31a433)return _0x31a433;}}return null;},Game_Map['prototype'][_0x1f220f(0x2a7)]=function(){const _0x5100ec=_0x1f220f,_0x3d29e2=this[_0x5100ec(0x5b4)]();return _0x3d29e2?_0x3d29e2[_0x5100ec(0x53b)]:0x0;},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x27d)]=function(_0x150f6e,_0x390bcc){const _0x4558f1=_0x1f220f,_0x488a96=this[_0x4558f1(0x423)](_0x150f6e,_0x390bcc);for(const _0xd96362 of _0x488a96){if(_0x4558f1(0x166)!=='IYmdQ'){if(this['_PreservedEventMorphData']===_0x53b065)this['initEventsMoveCore']();const _0x25c51f=_0x4558f1(0x550)[_0x4558f1(0x2c0)](_0x4623c6,_0x4ba8bf);delete this[_0x4558f1(0x591)][_0x25c51f];}else{if(!_0xd96362)continue;if(_0xd96362[_0x4558f1(0x2ce)]())this[_0x4558f1(0x4a6)](_0xd96362[_0x4558f1(0x53b)]);}}},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x410)]=function(_0x54a48d){const _0x2c25d3=_0x1f220f;for(const _0x451dee of this[_0x2c25d3(0x4cd)]){if(_0x2c25d3(0x315)===_0x2c25d3(0x38f)){_0x2c96d7['EventsMoveCore']['Game_Player_checkEventTriggerThere'][_0x2c25d3(0x58d)](this,_0x13aa76);if(this[_0x2c25d3(0x216)]()&&_0x5515eb[_0x2c25d3(0x220)](0x0)&&this[_0x2c25d3(0x364)]()===_0x2c25d3(0x11e)){const _0x38eb5d=this[_0x2c25d3(0x59a)](),_0x4a982e=_0x33fa6d[_0x2c25d3(0x39e)](this['x'],_0x38eb5d),_0x46b773=_0x593958[_0x2c25d3(0x580)](this['y'],_0x38eb5d);this[_0x2c25d3(0x4d2)](_0x4a982e,_0x46b773);}}else{if(!_0x451dee)continue;_0x54a48d['includes'](_0x451dee[_0x2c25d3(0x1c7)]())&&(_0x2c25d3(0x2e2)===_0x2c25d3(0x105)?_0x12fbbd=this['findDirectionTo'](_0x4ac1df,_0x2397d5):this['despawnEventId'](_0x451dee['_eventId']));}}},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x37b)]=function(_0x1c31f7){const _0x47e68c=_0x1f220f;for(const _0x16afcd of this[_0x47e68c(0x4cd)]){if('NRNZo'==='NRNZo'){if(!_0x16afcd)continue;_0x1c31f7[_0x47e68c(0x220)](_0x16afcd[_0x47e68c(0x18e)]())&&this[_0x47e68c(0x4a6)](_0x16afcd['_eventId']);}else{const _0x43a603=_0x4399e6[_0x47e68c(0x32e)];this[_0x47e68c(0x137)]=this['events']()[_0x47e68c(0x341)]>_0x43a603;if(this[_0x47e68c(0x137)]&&_0x47a259[_0x47e68c(0x1cb)]()){}}}},Game_Map[_0x1f220f(0x362)]['despawnEverything']=function(){const _0x379601=_0x1f220f;for(const _0x111d14 of this[_0x379601(0x4cd)]){if(!_0x111d14)continue;this['despawnEventId'](_0x111d14[_0x379601(0x53b)]);}},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x1b1)]=Game_Map[_0x1f220f(0x362)][_0x1f220f(0x5c3)],Game_Map['prototype'][_0x1f220f(0x5c3)]=function(_0x1c0fc7){const _0x3a2033=_0x1f220f;VisuMZ[_0x3a2033(0x141)][_0x3a2033(0x1b1)]['call'](this,_0x1c0fc7);if(_0x1c0fc7>=0x3e8){if(_0x3a2033(0x13d)===_0x3a2033(0x58e)){if(this===_0x586c9d)return;const _0x433d97=[this[_0x3a2033(0x27a)],this[_0x3a2033(0x53b)],'Self\x20Variable\x20%1'[_0x3a2033(0x2c0)](_0x1787fc)];_0x56a938[_0x3a2033(0x179)](_0x433d97,_0x5e4a9d(_0x278289));}else{const _0x129f1e=this[_0x3a2033(0x427)](_0x1c0fc7);if(_0x129f1e)_0x129f1e[_0x3a2033(0x4f9)]();}}},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x27f)]=function(){const _0xb57175=_0x1f220f;this['_forceShowPlayer']=![],this[_0xb57175(0x5f8)]=![];if(!$dataMap)return;const _0xd4ad4a=$dataMap[_0xb57175(0x57b)]||'';if(_0xd4ad4a[_0xb57175(0x4db)](/<HIDE PLAYER>/i)){if(_0xb57175(0x55b)!=='PTxKz')this[_0xb57175(0x5a1)]=![],this['_forceHidePlayer']=!![];else{if(_0xbc2dd6===0x4)_0x16a1be=0x6;else _0x47dbcb===0x6&&(_0x50cd09=0x4);}}else _0xd4ad4a[_0xb57175(0x4db)](/<SHOW PLAYER>/i)&&(this[_0xb57175(0x5a1)]=!![],this['_forceHidePlayer']=![]);},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x4ca)]=function(){const _0x2909e5=_0x1f220f;return this['_forceShowPlayer']===undefined&&this[_0x2909e5(0x27f)](),this['_forceShowPlayer'];},Game_Map['prototype']['isPlayerForceHidden']=function(){const _0x503bb9=_0x1f220f;return this[_0x503bb9(0x5f8)]===undefined&&(_0x503bb9(0x17d)==='pyoSC'?this[_0x503bb9(0x27f)]():(_0x30b8a5[_0x503bb9(0x362)][_0x503bb9(0x2c5)]['call'](this),this[_0x503bb9(0x4fd)](),this[_0x503bb9(0x1c1)](),this['updatePosition'](),this[_0x503bb9(0x41a)]())),this['_forceHidePlayer'];},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x52a)]=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x1bb)],Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x1bb)]=function(){const _0x2a05cb=_0x1f220f;if(this===$gamePlayer){if($gameMap[_0x2a05cb(0x4ca)]())return![];if($gameMap[_0x2a05cb(0x233)]())return!![];}return VisuMZ[_0x2a05cb(0x141)][_0x2a05cb(0x52a)][_0x2a05cb(0x58d)](this);},Game_Map['prototype'][_0x1f220f(0x5dc)]=function(){const _0x365128=_0x1f220f;this[_0x365128(0x59b)]=![],this['_forceHideFollower']=![];if(!$dataMap)return;const _0xf250c4=$dataMap[_0x365128(0x57b)]||'';if(_0xf250c4[_0x365128(0x4db)](/<HIDE FOLLOWERS>/i))this[_0x365128(0x59b)]=![],this[_0x365128(0xbc)]=!![];else _0xf250c4['match'](/<SHOW FOLLOWERS>/i)&&(this[_0x365128(0x59b)]=!![],this[_0x365128(0xbc)]=![]);},Game_Map['prototype'][_0x1f220f(0x285)]=function(){const _0xe9c61d=_0x1f220f;if(this[_0xe9c61d(0x59b)]===undefined){if('DAvRf'===_0xe9c61d(0x590))this['setupFollowerVisibilityOverrides']();else{const _0x4cb06f=_0x241385(_0xe147db['$1']),_0x534aea=_0x483a6d(_0x58e0bd['$2']);return this[_0xe9c61d(0x549)](_0x4cb06f,_0x534aea);}}return this[_0xe9c61d(0x59b)];},Game_Map[_0x1f220f(0x362)]['areFollowersForceHidden']=function(){const _0x189179=_0x1f220f;return this[_0x189179(0xbc)]===undefined&&(_0x189179(0x143)!=='pdLuq'?this[_0x189179(0x5dc)]():this[_0x189179(0x3bc)]=!![]),this[_0x189179(0xbc)];},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x5b2)]=Game_Followers[_0x1f220f(0x362)][_0x1f220f(0x563)],Game_Followers[_0x1f220f(0x362)][_0x1f220f(0x563)]=function(){const _0x13e6da=_0x1f220f;if($gameMap[_0x13e6da(0x285)]())return!![];if($gameMap[_0x13e6da(0x38a)]())return![];return VisuMZ[_0x13e6da(0x141)][_0x13e6da(0x5b2)]['call'](this);},Game_CommonEvent['prototype'][_0x1f220f(0xf3)]=function(){const _0x5a2639=_0x1f220f,_0x493649=this[_0x5a2639(0x427)]();return this[_0x5a2639(0x3e9)]()&&_0x493649['trigger']>=0x1&&DataManager[_0x5a2639(0x3e2)](_0x493649[_0x5a2639(0x10c)]);},Game_CommonEvent['prototype'][_0x1f220f(0x2e8)]=function(){const _0x1d9cf0=_0x1f220f;return VisuMZ[_0x1d9cf0(0x141)][_0x1d9cf0(0x264)]['_commonEvents'][_0x1d9cf0(0x220)](this[_0x1d9cf0(0x293)]);},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x31c)]=Game_CommonEvent[_0x1f220f(0x362)][_0x1f220f(0x3e9)],Game_CommonEvent[_0x1f220f(0x362)][_0x1f220f(0x3e9)]=function(){const _0x5b1041=_0x1f220f;if(VisuMZ[_0x5b1041(0x141)]['Game_CommonEvent_isActive'][_0x5b1041(0x58d)](this)){if('pOosN'===_0x5b1041(0x4b5))_0x18b53e[_0x5b1041(0x347)]();else return!![];}else{if(_0x5b1041(0x545)===_0x5b1041(0x545)){const _0x4ad033=this['event']();return VisuMZ[_0x5b1041(0x141)][_0x5b1041(0x264)][_0x5b1041(0x258)](this[_0x5b1041(0x427)]()['CPC'],this[_0x5b1041(0x293)],_0x4ad033);}else for(let _0x344d4d=_0xd192c4;_0x344d4d<=_0x30b0e5;_0x344d4d++){if(this['checkExistingEntitiesAt'](_0x5d081b,_0x344d4d))return![];}}},VisuMZ['EventsMoveCore'][_0x1f220f(0x1ac)]=Game_Map[_0x1f220f(0x362)]['parallelCommonEvents'],Game_Map['prototype']['parallelCommonEvents']=function(){const _0x5aeab1=_0x1f220f,_0x4bbf51=VisuMZ[_0x5aeab1(0x141)][_0x5aeab1(0x1ac)][_0x5aeab1(0x58d)](this),_0xfbb3fb=VisuMZ[_0x5aeab1(0x141)][_0x5aeab1(0x264)][_0x5aeab1(0x562)]['map'](_0x4c772d=>$dataCommonEvents[_0x4c772d]);return _0x4bbf51[_0x5aeab1(0x3a7)](_0xfbb3fb)[_0x5aeab1(0x1ea)]((_0x39baf7,_0x1ab644,_0x1adb97)=>_0x1adb97[_0x5aeab1(0x1f9)](_0x39baf7)===_0x1ab644);},Game_CharacterBase['ALLOW_LADDER_DASH']=VisuMZ[_0x1f220f(0x141)]['Settings'][_0x1f220f(0x4c9)]['DashOnLadder']??![],VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x1ad)]=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x16f)],Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x16f)]=function(){const _0x21fc1c=_0x1f220f;VisuMZ[_0x21fc1c(0x141)][_0x21fc1c(0x1ad)][_0x21fc1c(0x58d)](this),this[_0x21fc1c(0x163)]();},Game_CharacterBase[_0x1f220f(0x362)]['initEventsMoveCoreSettings']=function(){const _0x4269cb=_0x1f220f;this[_0x4269cb(0x4c7)]=![],this['clearPose'](),this[_0x4269cb(0x222)](),this[_0x4269cb(0x2b2)](),this[_0x4269cb(0xfd)]();},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x108)]=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x473)],Game_CharacterBase['prototype'][_0x1f220f(0x473)]=function(){const _0x46101e=_0x1f220f;let _0x237aa6=VisuMZ[_0x46101e(0x141)][_0x46101e(0x108)][_0x46101e(0x58d)](this);return _0x237aa6=this['adjustMoveSynchOpacityDelta'](_0x237aa6),_0x237aa6;},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x345)]=function(_0xd9368a){return _0xd9368a;},Game_CharacterBase[_0x1f220f(0x362)]['isSpriteVS8dir']=function(){const _0x33b7cc=_0x1f220f;if(this[_0x33b7cc(0x2a0)]===Game_Player&&this[_0x33b7cc(0x4a7)]()){if(_0x33b7cc(0x592)==='oDxKo')for(const _0x1bcd75 of _0x13652b){const _0x2e961f=_0x33b7cc(0x1ee)[_0x33b7cc(0x2c0)](_0x1bcd75,_0x3f1ecd);_0x36ff85[_0x2e961f]&&(_0x587b81[_0x2e961f]=_0x1bac56[_0x2e961f][_0x33b7cc(0x4b8)](0x0));}else return this[_0x33b7cc(0x486)]()[_0x33b7cc(0x3e1)]()[_0x33b7cc(0x4db)](/\[VS8\]/i);}else return Imported[_0x33b7cc(0x594)]&&this[_0x33b7cc(0x4a8)]()?!![]:_0x33b7cc(0x432)===_0x33b7cc(0x34c)?(this[_0x33b7cc(0xbc)]===_0x5c1eef&&this[_0x33b7cc(0x5dc)](),this[_0x33b7cc(0xbc)]):this['characterName']()['match'](/\[VS8\]/i);},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x31b)]=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x59a)],Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x59a)]=function(){const _0x415fe8=_0x1f220f;if(!$dataMap)return this[_0x415fe8(0x18d)]||0x2;if(this[_0x415fe8(0x598)]()&&!this['isJumping']()&&this[_0x415fe8(0x361)]())return _0x415fe8(0x238)!==_0x415fe8(0x37d)?this[_0x415fe8(0x340)]():!![];else{if(this[_0x415fe8(0x598)]()&&!this[_0x415fe8(0x3d1)]())return 0x8;else return this[_0x415fe8(0x1ca)]()&&this[_0x415fe8(0x361)]()?_0x415fe8(0x33f)!==_0x415fe8(0x5e2)?this[_0x415fe8(0x575)]():this[_0x415fe8(0x1b6)]:VisuMZ[_0x415fe8(0x141)]['Game_CharacterBase_direction'][_0x415fe8(0x58d)](this);}},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x325)]=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x392)],Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x392)]=function(_0xcce3cd){const _0x512c03=_0x1f220f;if(!this['isSpriteVS8dir']())_0xcce3cd=this[_0x512c03(0xbd)](_0xcce3cd);VisuMZ[_0x512c03(0x141)][_0x512c03(0x325)][_0x512c03(0x58d)](this,_0xcce3cd);},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0xbd)]=function(_0x4afd69){const _0x56d33c=_0x1f220f;if(_0x4afd69===0x1)return this[_0x56d33c(0x158)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x4afd69===0x3)return this[_0x56d33c(0x158)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x4afd69===0x7)return this['canPass'](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x4afd69===0x9)return this[_0x56d33c(0x158)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x4afd69;},Game_CharacterBase[_0x1f220f(0x362)]['isDiagonalDirection']=function(_0x1fbaaf){return[0x1,0x3,0x5,0x7,0x9]['includes'](_0x1fbaaf);},Game_CharacterBase[_0x1f220f(0x362)]['lastMovedDirection']=function(){return this['_lastMovedDirection']||0x0;},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x518)]=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x1eb)],Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x1eb)]=function(_0x17ab0f){const _0x4fa4c9=_0x1f220f;this[_0x4fa4c9(0x319)]=_0x17ab0f,VisuMZ['EventsMoveCore'][_0x4fa4c9(0x518)]['call'](this,_0x17ab0f);},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x52b)]=function(_0x597647){const _0x2aa8e0=_0x1f220f;if(!this[_0x2aa8e0(0x1f7)](_0x597647))return this['moveStraight'](_0x597647);let _0x283f9e=0x0,_0x24678e=0x0;switch(_0x597647){case 0x1:_0x283f9e=0x4,_0x24678e=0x2;break;case 0x3:_0x283f9e=0x6,_0x24678e=0x2;break;case 0x7:_0x283f9e=0x4,_0x24678e=0x8;break;case 0x9:_0x283f9e=0x6,_0x24678e=0x8;break;}if(VisuMZ[_0x2aa8e0(0x141)][_0x2aa8e0(0x454)][_0x2aa8e0(0x4c9)][_0x2aa8e0(0x51b)]){if(!this[_0x2aa8e0(0x158)](this['_x'],this['_y'],_0x283f9e))return this[_0x2aa8e0(0x1eb)](_0x24678e);if(!this[_0x2aa8e0(0x158)](this['_x'],this['_y'],_0x24678e))return this[_0x2aa8e0(0x1eb)](_0x283f9e);if(!this[_0x2aa8e0(0x553)](this['_x'],this['_y'],_0x283f9e,_0x24678e)){if(_0x2aa8e0(0xd4)===_0x2aa8e0(0x4fb)){if(this[_0x2aa8e0(0x4d0)]===_0x3847dd)this[_0x2aa8e0(0x3e5)]();this['_expireCommonEvent']=_0x506be7;}else{let _0x259123=VisuMZ[_0x2aa8e0(0x141)]['Settings']['Movement'][_0x2aa8e0(0x3e3)]?_0x283f9e:_0x24678e;return this[_0x2aa8e0(0x1eb)](_0x259123);}}}this['_lastMovedDirection']=_0x597647,this['moveDiagonally'](_0x283f9e,_0x24678e);},VisuMZ['EventsMoveCore'][_0x1f220f(0x5e5)]=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x3af)],Game_CharacterBase['prototype']['realMoveSpeed']=function(){const _0x396642=_0x1f220f;let _0x3d96d1=this[_0x396642(0xfa)];return this[_0x396642(0x50b)]()&&(_0x3d96d1+=this[_0x396642(0x4aa)]()),this[_0x396642(0x4c3)](_0x3d96d1);},Game_CharacterBase[_0x1f220f(0x362)]['dashSpeedModifier']=function(){const _0x5d3087=_0x1f220f,_0x15c99c=VisuMZ[_0x5d3087(0x141)][_0x5d3087(0x454)][_0x5d3087(0x4c9)];return _0x15c99c['DashModifier']!==undefined?_0x15c99c[_0x5d3087(0x401)]:VisuMZ['EventsMoveCore'][_0x5d3087(0x5e5)][_0x5d3087(0x58d)](this)-this[_0x5d3087(0xfa)];},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x4c3)]=function(_0x494644){const _0x46bd19=_0x1f220f,_0x4875dd=VisuMZ[_0x46bd19(0x141)][_0x46bd19(0x454)]['Movement'];if(!_0x4875dd[_0x46bd19(0x25e)])return _0x494644;if([0x1,0x3,0x7,0x9]['includes'](this[_0x46bd19(0x319)])){if(_0x46bd19(0x44e)!==_0x46bd19(0x3df))_0x494644*=_0x4875dd['DiagonalSpeedMultiplier']||0.01;else return this[_0x46bd19(0x116)]()[_0x46bd19(0x234)]??'';}return _0x494644;},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x5b5)]=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x50b)],Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x50b)]=function(){const _0x13862d=_0x1f220f;if(!Game_CharacterBase[_0x13862d(0x241)]&&this[_0x13862d(0x598)]())return![];if(this[_0x13862d(0x1b4)])return!![];return VisuMZ[_0x13862d(0x141)][_0x13862d(0x5b5)]['call'](this);},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0xee)]=function(){const _0x1a283a=_0x1f220f;return this['isDashing']()&&this[_0x1a283a(0x585)]===0x0;},VisuMZ[_0x1f220f(0x141)]['Game_CharacterBase_pattern']=Game_CharacterBase['prototype'][_0x1f220f(0x1bf)],Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x1bf)]=function(){const _0x21e07b=_0x1f220f;return this[_0x21e07b(0x1ca)]()?this[_0x21e07b(0x5eb)]():VisuMZ[_0x21e07b(0x141)][_0x21e07b(0xb9)][_0x21e07b(0x58d)](this);},VisuMZ['EventsMoveCore']['Game_CharacterBase_increaseSteps']=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x35b)],Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x35b)]=function(){const _0xcc5078=_0x1f220f;VisuMZ[_0xcc5078(0x141)][_0xcc5078(0x22e)][_0xcc5078(0x58d)](this),this[_0xcc5078(0x2b3)]();},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x24b)]=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x5c6)],Game_CharacterBase[_0x1f220f(0x362)]['characterIndex']=function(){const _0x4f5474=_0x1f220f;if(this[_0x4f5474(0x361)]())return this['characterIndexVS8']();return VisuMZ[_0x4f5474(0x141)][_0x4f5474(0x24b)][_0x4f5474(0x58d)](this);},Game_CharacterBase['prototype'][_0x1f220f(0x3f0)]=function(){const _0x1e6a34=_0x1f220f,_0x545135=this[_0x1e6a34(0x59a)]();if(this[_0x1e6a34(0x3d1)]()){if(_0x1e6a34(0x1a4)===_0x1e6a34(0x542))this[_0x1e6a34(0xb7)]=_0x8e6c4c;else{if([0x2,0x4,0x6,0x8][_0x1e6a34(0x220)](_0x545135))return 0x4;if([0x1,0x3,0x7,0x9][_0x1e6a34(0x220)](_0x545135))return 0x5;}}else{if(this[_0x1e6a34(0x598)]())return 0x6;else{if(this[_0x1e6a34(0x1ca)]()){if(_0x1e6a34(0x41c)==='fzwih')_0x219d97['EventsMoveCore'][_0x1e6a34(0x36b)][_0x1e6a34(0x58d)](this);else return this['getPosingCharacterIndex']();}else{if(this[_0x1e6a34(0x53a)]){if([0x2,0x4,0x6,0x8][_0x1e6a34(0x220)](_0x545135))return 0x4;if([0x1,0x3,0x7,0x9][_0x1e6a34(0x220)](_0x545135))return 0x5;}else{if(this['hasEventIcon']()&&this['useCarryPoseForIcons']()){if([0x2,0x4,0x6,0x8][_0x1e6a34(0x220)](_0x545135))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x545135))return 0x5;}else{if(this[_0x1e6a34(0xee)]()){if([0x2,0x4,0x6,0x8][_0x1e6a34(0x220)](_0x545135))return 0x2;if([0x1,0x3,0x7,0x9][_0x1e6a34(0x220)](_0x545135))return 0x3;}else{if('YjifC'===_0x1e6a34(0x3c1)){if([0x2,0x4,0x6,0x8][_0x1e6a34(0x220)](_0x545135))return 0x0;if([0x1,0x3,0x7,0x9][_0x1e6a34(0x220)](_0x545135))return 0x1;}else return _0x5f582a['EventsMoveCore'][_0x1e6a34(0x454)][_0x1e6a34(0x40a)][_0x1e6a34(0x381)];}}}}}}},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x532)]=function(){const _0x4d4a49=_0x1f220f;return VisuMZ[_0x4d4a49(0x141)][_0x4d4a49(0x454)][_0x4d4a49(0x2d8)][_0x4d4a49(0x521)];},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x314)]=function(){const _0x2e0131=_0x1f220f;return this['isOnLadder']()&&this['terrainTag']()===VisuMZ[_0x2e0131(0x141)][_0x2e0131(0x454)]['TerrainTag'][_0x2e0131(0x419)];},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x340)]=function(){const _0x45267e=_0x1f220f;return this[_0x45267e(0x314)]()?0x4:0x2;},VisuMZ[_0x1f220f(0x141)]['Game_CharacterBase_update']=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x2c5)],Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x2c5)]=function(){const _0x113727=_0x1f220f;VisuMZ[_0x113727(0x141)][_0x113727(0x533)]['call'](this),this[_0x113727(0x1c0)]();},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x1c0)]=function(){const _0x36dbed=_0x1f220f;this[_0x36dbed(0x3bd)]=this[_0x36dbed(0x3bd)]||0x0;if(this['_poseDuration']>0x0){this[_0x36dbed(0x3bd)]--;if(this[_0x36dbed(0x3bd)]<=0x0&&this[_0x36dbed(0xba)]!==_0x36dbed(0x2c1))this[_0x36dbed(0x2b3)]();}},VisuMZ[_0x1f220f(0x141)]['Game_CharacterBase_moveDiagonally']=Game_CharacterBase[_0x1f220f(0x362)]['moveDiagonally'],Game_CharacterBase['prototype']['moveDiagonally']=function(_0x5b9c9b,_0x4eb3f4){const _0x25f042=_0x1f220f;VisuMZ['EventsMoveCore'][_0x25f042(0x33e)][_0x25f042(0x58d)](this,_0x5b9c9b,_0x4eb3f4);if(this[_0x25f042(0x361)]())this[_0x25f042(0x3ca)](_0x5b9c9b,_0x4eb3f4);},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x3ca)]=function(_0x2ad0aa,_0x450360){const _0x294135=_0x1f220f;if(_0x2ad0aa===0x4&&_0x450360===0x2)this[_0x294135(0x392)](0x1);if(_0x2ad0aa===0x6&&_0x450360===0x2)this[_0x294135(0x392)](0x3);if(_0x2ad0aa===0x4&&_0x450360===0x8)this[_0x294135(0x392)](0x7);if(_0x2ad0aa===0x6&&_0x450360===0x8)this[_0x294135(0x392)](0x9);},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x2fd)]=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x59e)],Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x59e)]=function(){const _0x4c45b9=_0x1f220f;if(this[_0x4c45b9(0x1ca)]()&&this['getPose']()===_0x4c45b9(0x2c1))return!![];return VisuMZ[_0x4c45b9(0x141)][_0x4c45b9(0x2fd)][_0x4c45b9(0x58d)](this);},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x12b)]=function(_0x4ffceb,_0x2197bd){const _0x18c184=_0x1f220f;if(_0x4ffceb[_0x18c184(0x4db)](/Z/i))_0x4ffceb=_0x18c184(0x2c1);if(_0x4ffceb[_0x18c184(0x4db)](/SLEEP/i))_0x4ffceb=_0x18c184(0x2c1);this[_0x18c184(0x361)]()&&(this[_0x18c184(0xba)]=_0x4ffceb['toUpperCase']()['trim'](),this[_0x18c184(0x3bd)]=_0x2197bd||Infinity);},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x31d)]=function(){const _0x46a066=_0x1f220f;if(this[_0x46a066(0x361)]())return(this[_0x46a066(0xba)]||'')[_0x46a066(0x38b)]()['trim']();else{if(_0x46a066(0x5cd)!==_0x46a066(0x236))return''[_0x46a066(0x38b)]()[_0x46a066(0x445)]();else this[_0x46a066(0x2e6)]='',this['startCallEvent']();}},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x19a)]=function(_0x66864e,_0x4981fe){const _0x545bd4=_0x1f220f;if(this[_0x545bd4(0x361)]()){if(_0x545bd4(0x3e4)!=='nyjoc'){const _0x45e01c=['',_0x545bd4(0x336),_0x545bd4(0x5d6),_0x545bd4(0x422),_0x545bd4(0xce),_0x545bd4(0x396),_0x545bd4(0x2ee),_0x545bd4(0x5b0),_0x545bd4(0x475),_0x545bd4(0x290),'ZZZ','','','','',''][_0x66864e];this['setPose'](_0x45e01c,_0x4981fe);}else this[_0x545bd4(0x375)]['offsetX']=_0x81a3ac(_0x1e90e5['$1']),this[_0x545bd4(0x375)][_0x545bd4(0x2ae)]=_0x32d4d2(_0x15719a['$2']);}},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x2b3)]=function(){const _0x149e88=_0x1f220f;this[_0x149e88(0xba)]='',this[_0x149e88(0x3bd)]=0x0;},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x1ca)]=function(){const _0x5c1c5f=_0x1f220f;return this[_0x5c1c5f(0x361)]()&&!!this[_0x5c1c5f(0xba)];},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x49c)]=function(){const _0x411307=_0x1f220f,_0x3ea54a=this[_0x411307(0xba)][_0x411307(0x38b)]();switch(this['_pose'][_0x411307(0x38b)]()[_0x411307(0x445)]()){case _0x411307(0x5be):case _0x411307(0x3c9):case'VICTORY':case _0x411307(0x369):case _0x411307(0x5aa):case _0x411307(0x2aa):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype'][_0x1f220f(0x575)]=function(){const _0x1e137a=_0x1f220f;switch(this['_pose']['toUpperCase']()){case _0x1e137a(0x336):case _0x1e137a(0x5d6):case _0x1e137a(0x422):case'!':case'?':return 0x2;break;case _0x1e137a(0xce):case'ANGER':case _0x1e137a(0x2ee):return 0x4;break;case _0x1e137a(0x5be):case _0x1e137a(0x3c9):case _0x1e137a(0x2d7):case _0x1e137a(0x5b0):case _0x1e137a(0x475):case _0x1e137a(0x290):return 0x6;break;case _0x1e137a(0x369):case'KNEEL':case _0x1e137a(0x2aa):case _0x1e137a(0x2c1):case'SLEEP':return 0x8;break;default:return VisuMZ[_0x1e137a(0x141)]['Game_CharacterBase_setDirection'][_0x1e137a(0x58d)](this);break;}},Game_CharacterBase[_0x1f220f(0x362)]['getPosingCharacterPattern']=function(){const _0x357e2c=_0x1f220f;switch(this[_0x357e2c(0xba)][_0x357e2c(0x38b)]()){case _0x357e2c(0x5be):case _0x357e2c(0x369):case _0x357e2c(0x336):case'!':case _0x357e2c(0xce):case'COBWEB':return 0x0;break;case'HMPH':case'KNEEL':case _0x357e2c(0x5d6):case'?':case'ANGER':case _0x357e2c(0x475):return 0x1;break;case'VICTORY':case _0x357e2c(0x2aa):case _0x357e2c(0x422):case _0x357e2c(0x2ee):case'LIGHT\x20BULB':return 0x2;break;default:return VisuMZ[_0x357e2c(0x141)]['Game_CharacterBase_pattern'][_0x357e2c(0x58d)](this);break;}},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x448)]=function(){const _0x3c0c3e=_0x1f220f;this[_0x3c0c3e(0x53a)]=!![];},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x200)]=function(){const _0x345e7d=_0x1f220f;this[_0x345e7d(0x53a)]=![];},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x297)]=function(){this['_forceDashing']=!![];},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x222)]=function(){this['_forceDashing']=![];},Game_CharacterBase[_0x1f220f(0x362)]['isShadowVisible']=function(){const _0x37a298=_0x1f220f;if(this[_0x37a298(0x2a4)]())return![];if(this[_0x37a298(0xbf)])return![];if(this[_0x37a298(0x28a)]==='')return![];if(this[_0x37a298(0x2a0)]===Game_Vehicle)return![];if(this[_0x37a298(0x1bb)]())return![];return!![];},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x197)]=function(){const _0x3deef0=_0x1f220f;if(this[_0x3deef0(0x598)]())return!![];if(this[_0x3deef0(0x2a0)]===Game_Player&&this[_0x3deef0(0x4a7)]())return!![];return![];},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x1d0)]=function(){const _0x1072c1=_0x1f220f;return VisuMZ[_0x1072c1(0x141)][_0x1072c1(0x454)][_0x1072c1(0x4c9)][_0x1072c1(0x36a)];},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x229)]=function(){const _0x42a1c9=_0x1f220f;return this[_0x42a1c9(0x3f9)]();},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x466)]=function(){const _0x58dff3=_0x1f220f,_0x5790bb=$gameMap['tileHeight']();return Math[_0x58dff3(0x187)](this[_0x58dff3(0x556)]()*_0x5790bb+_0x5790bb);},Game_CharacterBase['DIAGONAL_PATHFINDING_EVENT_LIMIT']=0x64,Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x4a0)]=function(_0x3f0f83,_0x11fd85){const _0x5eb98f=_0x1f220f;if(TouchInput[_0x5eb98f(0xef)]())return![];if(!$gameMap[_0x5eb98f(0x2a2)]())return![];if($gameMap[_0x5eb98f(0x208)](_0x3f0f83,_0x11fd85)[_0x5eb98f(0x341)]>0x0)return![];if(!$gameMap[_0x5eb98f(0x307)](_0x3f0f83,_0x11fd85))return![];const _0x7e1443=$gameMap[_0x5eb98f(0x20c)][_0x5eb98f(0x341)];if(_0x7e1443>=Game_CharacterBase[_0x5eb98f(0x597)])return _0x5eb98f(0x22b)===_0x5eb98f(0x2d3)?0x6:![];return!![];},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x599)]=function(_0x48dd93,_0x4d097b){const _0x2e1d7c=_0x1f220f;let _0x34fa21=this[_0x2e1d7c(0x247)](_0x48dd93,_0x4d097b);if(!this['getDiagonalDestination'](_0x48dd93,_0x4d097b))return _0x34fa21;if(this[_0x2e1d7c(0x3d4)](_0x48dd93,_0x4d097b))return _0x34fa21;const _0x40b81e=_0x34fa21;if(_0x34fa21===0x2){if('zBNWY'===_0x2e1d7c(0x4de)){const _0x5006c3=this[_0x2e1d7c(0x18c)],_0x320d4b=this['_randomHomeY'];return this[_0x2e1d7c(0x189)](_0x5006c3,_0x320d4b);}else{if(_0x48dd93>this['x']&&this[_0x2e1d7c(0x158)](this['x'],this['y'],0x6))_0x34fa21=0x3;if(_0x48dd93<this['x']&&this[_0x2e1d7c(0x158)](this['x'],this['y'],0x4))_0x34fa21=0x1;}}else{if(_0x34fa21===0x4){if(_0x4d097b>this['y']&&this['canPass'](this['x'],this['y'],0x4))_0x34fa21=0x1;if(_0x4d097b<this['y']&&this[_0x2e1d7c(0x158)](this['x'],this['y'],0x6))_0x34fa21=0x7;}else{if(_0x34fa21===0x6){if(_0x4d097b>this['y']&&this['canPass'](this['x'],this['y'],0x4))_0x34fa21=0x3;if(_0x4d097b<this['y']&&this[_0x2e1d7c(0x158)](this['x'],this['y'],0x6))_0x34fa21=0x9;}else{if(_0x34fa21===0x8){if('Bssdx'!==_0x2e1d7c(0x2d6))this['setupPlayerVisibilityOverrides']();else{if(_0x48dd93>this['x']&&this[_0x2e1d7c(0x158)](this['x'],this['y'],0x6))_0x34fa21=0x9;if(_0x48dd93<this['x']&&this[_0x2e1d7c(0x158)](this['x'],this['y'],0x4))_0x34fa21=0x7;}}}}}const _0x2131d6=$gameMap[_0x2e1d7c(0x39e)](this['x'],_0x34fa21),_0x1a64bc=$gameMap[_0x2e1d7c(0x580)](this['y'],_0x34fa21);if(this['isCollidedWithEvents'](_0x2131d6,_0x1a64bc))_0x34fa21=_0x40b81e;return _0x34fa21;},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x4ec)]=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x158)],Game_CharacterBase['prototype'][_0x1f220f(0x158)]=function(_0x951943,_0x306676,_0x43c988){const _0x1f9909=_0x1f220f;return this[_0x1f9909(0x2bb)]==='airship'?this['vehicle']()['isAirshipPassable'](_0x951943,_0x306676,_0x43c988):VisuMZ[_0x1f9909(0x141)][_0x1f9909(0x4ec)]['call'](this,_0x951943,_0x306676,_0x43c988);},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x2b2)]=function(){const _0x2d1f23=_0x1f220f;this[_0x2d1f23(0x510)]=0x0,this[_0x2d1f23(0x309)]=0x0;},VisuMZ['EventsMoveCore']['Game_CharacterBase_screenX']=Game_CharacterBase['prototype'][_0x1f220f(0x3f9)],Game_CharacterBase[_0x1f220f(0x362)]['screenX']=function(){const _0x5d8094=_0x1f220f;return VisuMZ[_0x5d8094(0x141)]['Game_CharacterBase_screenX'][_0x5d8094(0x58d)](this)+(this[_0x5d8094(0x510)]||0x0);},VisuMZ['EventsMoveCore'][_0x1f220f(0xf8)]=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x130)],Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x130)]=function(){const _0x334936=_0x1f220f;return VisuMZ['EventsMoveCore'][_0x334936(0xf8)][_0x334936(0x58d)](this)+(this[_0x334936(0x309)]||0x0);},Game_CharacterBase[_0x1f220f(0x3aa)]=VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x454)][_0x1f220f(0x4c9)][_0x1f220f(0x1f5)]??-0x6,Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x3c2)]=function(){const _0x250df0=_0x1f220f;return this['isObjectCharacter']()?0x0:-Game_CharacterBase[_0x250df0(0x3aa)];},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0xfd)]=function(){const _0x595ea5=_0x1f220f;this[_0x595ea5(0x57f)]='';},VisuMZ['EventsMoveCore'][_0x1f220f(0x32b)]=Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x2a8)],Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x2a8)]=function(){const _0x58bdf0=_0x1f220f;if(this[_0x58bdf0(0x4c7)])return;if(this[_0x58bdf0(0x27c)]())return;VisuMZ[_0x58bdf0(0x141)]['Game_CharacterBase_updatePattern'][_0x58bdf0(0x58d)](this);},Game_CharacterBase['prototype'][_0x1f220f(0x27c)]=function(){const _0x546ad8=_0x1f220f;if(!this[_0x546ad8(0x59e)]()&&this[_0x546ad8(0x585)]>0x0)return![];switch(String(this[_0x546ad8(0x57f)])['toUpperCase']()[_0x546ad8(0x445)]()){case _0x546ad8(0x495):this[_0x546ad8(0x17a)]+=0x1;if(this[_0x546ad8(0x17a)]>0x2)this[_0x546ad8(0x25d)](0x0);break;case _0x546ad8(0xd5):this[_0x546ad8(0x17a)]-=0x1;if(this[_0x546ad8(0x17a)]<0x0)this[_0x546ad8(0x25d)](0x2);break;case _0x546ad8(0x175):case _0x546ad8(0x313):this['turnRight90']();break;case _0x546ad8(0x322):case _0x546ad8(0x34a):case _0x546ad8(0x4ce):case'SPIN\x20ACW':this[_0x546ad8(0x449)]();break;default:return![];}return!![];},Game_CharacterBase['prototype']['getEventIconData']=function(){const _0x22a546=_0x1f220f;return $gameSystem[_0x22a546(0x1d9)](this);},Game_CharacterBase[_0x1f220f(0x362)]['hasEventIcon']=function(){const _0x414ba7=_0x1f220f,_0x2a7e3b=this[_0x414ba7(0x1d9)]();if(!_0x2a7e3b)return![];return _0x2a7e3b['iconIndex']>0x0;},Game_CharacterBase[_0x1f220f(0x362)]['frontX']=function(){const _0x2657df=_0x1f220f,_0x43baa2=this['direction']();return $gameMap[_0x2657df(0x39e)](this['x'],_0x43baa2);},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x10a)]=function(){const _0x170a20=_0x1f220f,_0x4d616f=this[_0x170a20(0x59a)]();return $gameMap[_0x170a20(0x580)](this['y'],_0x4d616f);},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x3b7)]=function(){const _0x2948e4=_0x1f220f,_0x5758c9=this[_0x2948e4(0x42e)](this[_0x2948e4(0x59a)]());return $gameMap[_0x2948e4(0x39e)](this['x'],_0x5758c9);},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x3f4)]=function(){const _0x539c0f=_0x1f220f,_0x2f0abe=this[_0x539c0f(0x42e)](this['direction']());return $gameMap[_0x539c0f(0x580)](this['y'],_0x2f0abe);},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x13e)]=function(){const _0x296652=_0x1f220f,_0x34085f=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x296652(0x59a)]()];return $gameMap[_0x296652(0x39e)](this['x'],_0x34085f);},Game_CharacterBase[_0x1f220f(0x362)]['ccwY']=function(){const _0x247ced=_0x1f220f,_0x393a72=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this['direction']()];return $gameMap[_0x247ced(0x580)](this['y'],_0x393a72);},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x53e)]=function(){const _0x1f4042=_0x1f220f,_0x52494b=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x1f4042(0x59a)]()];return $gameMap[_0x1f4042(0x39e)](this['x'],_0x52494b);},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x210)]=function(){const _0x4400f7=_0x1f220f,_0x4a033f=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x4400f7(0x59a)]()];return $gameMap[_0x4400f7(0x580)](this['y'],_0x4a033f);},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x2b6)]=Game_Character['prototype'][_0x1f220f(0x5b8)],Game_Character[_0x1f220f(0x362)][_0x1f220f(0x5b8)]=function(_0x484b12){const _0x926437=_0x1f220f;route=JsonEx[_0x926437(0x22c)](_0x484b12),VisuMZ['EventsMoveCore'][_0x926437(0x2b6)]['call'](this,route);},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x387)]=Game_Character['prototype'][_0x1f220f(0x327)],Game_Character['prototype'][_0x1f220f(0x327)]=function(_0x2b3d71){const _0x237ba3=_0x1f220f;route=JsonEx[_0x237ba3(0x22c)](_0x2b3d71),VisuMZ[_0x237ba3(0x141)][_0x237ba3(0x387)][_0x237ba3(0x58d)](this,route);},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x596)]=Game_Character['prototype']['processMoveCommand'],Game_Character[_0x1f220f(0x362)][_0x1f220f(0x2f6)]=function(_0x2d0eed){const _0x195763=_0x1f220f,_0x49b528=Game_Character,_0x4a5391=_0x2d0eed[_0x195763(0x218)];if(_0x2d0eed[_0x195763(0x161)]===_0x49b528['ROUTE_SCRIPT']){if(_0x195763(0x5ce)!==_0x195763(0x5ce)){if(this[_0x195763(0x1ba)]===_0x37010b)this['initEventsMoveCore']();const _0x442a84=_0x195763(0x550)[_0x195763(0x2c0)](_0x56f954,_0x57d3a7);this[_0x195763(0x1ba)][_0x442a84]={'direction':_0x5041e6,'x':_0x2d86b9[_0x195763(0xdb)](_0x5ab5b6),'y':_0x1c04ab[_0x195763(0xdb)](_0x1c4310),'pageIndex':_0x98ec73,'moveRouteIndex':_0xf1e13};}else{let _0x4b114b=_0x2d0eed[_0x195763(0x218)][0x0];_0x4b114b=this[_0x195763(0x5d3)](_0x4b114b),_0x4b114b=this[_0x195763(0x50e)](_0x4b114b),this[_0x195763(0xe5)](_0x2d0eed,_0x4b114b);}}else{if('AoAvb'!==_0x195763(0x530))VisuMZ[_0x195763(0x141)][_0x195763(0x596)][_0x195763(0x58d)](this,_0x2d0eed);else{const _0x537881=_0x22b5f2[_0x195763(0x141)][_0x195763(0x1ac)][_0x195763(0x58d)](this),_0xd4f027=_0x52703c[_0x195763(0x141)][_0x195763(0x264)][_0x195763(0x562)]['map'](_0x15dc06=>_0x3eea71[_0x15dc06]);return _0x537881['concat'](_0xd4f027)[_0x195763(0x1ea)]((_0x586cb2,_0x14ea76,_0x141cdf)=>_0x141cdf[_0x195763(0x1f9)](_0x586cb2)===_0x14ea76);}}},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x5d3)]=function(_0x29b4e2){const _0x4c14c9=_0x1f220f,_0x1ae800=/\$gameVariables\.value\((\d+)\)/gi,_0x14be69=/\\V\[(\d+)\]/gi;while(_0x29b4e2['match'](_0x1ae800)){_0x29b4e2=_0x29b4e2['replace'](_0x1ae800,(_0x443b13,_0x2923c1)=>$gameVariables[_0x4c14c9(0x40c)](parseInt(_0x2923c1)));}while(_0x29b4e2[_0x4c14c9(0x4db)](_0x14be69)){_0x29b4e2=_0x29b4e2['replace'](_0x14be69,(_0x464d62,_0x2a483b)=>$gameVariables[_0x4c14c9(0x40c)](parseInt(_0x2a483b)));}return _0x29b4e2;},Game_Character['prototype'][_0x1f220f(0x50e)]=function(_0x1f62f7){const _0x1df3aa=_0x1f220f,_0x3c5217=/\\SELFVAR\[(\d+)\]/gi;while(_0x1f62f7[_0x1df3aa(0x4db)](_0x3c5217)){if(_0x1df3aa(0x372)!==_0x1df3aa(0x5e1))_0x1f62f7=_0x1f62f7[_0x1df3aa(0x558)](_0x3c5217,(_0x3c9807,_0x30acf4)=>getSelfVariableValue(this[_0x1df3aa(0x27a)],this['_eventId'],parseInt(_0x30acf4)));else{const _0x4ea4cd=_0x546c29[_0x1df3aa(0x487)](this[_0x1df3aa(0x46b)]());if(_0x4ea4cd)return _0x4ea4cd['realMoveSpeed']();}}return _0x1f62f7;},Game_Character[_0x1f220f(0x362)]['processMoveCommandEventsMoveCore']=function(_0x5bcb5c,_0x2e7c35){const _0x3794eb=_0x1f220f;if(_0x2e7c35[_0x3794eb(0x4db)](/ANIMATION:[ ](\d+)/i))return _0x3794eb(0x205)!==_0x3794eb(0x205)?this[_0x3794eb(0x184)][_0x3794eb(0x234)]:this[_0x3794eb(0x416)](Number(RegExp['$1']));if(_0x2e7c35[_0x3794eb(0x4db)](/BALLOON:[ ](.*)/i)){if(_0x3794eb(0x5e6)===_0x3794eb(0x4f3)){const _0xdd5fa1=this[_0x3794eb(0x427)]();return _0x221d61[_0x3794eb(0x141)]['CustomPageConditions'][_0x3794eb(0x258)](this[_0x3794eb(0x427)]()[_0x3794eb(0x262)],this[_0x3794eb(0x293)],_0xdd5fa1);}else return this[_0x3794eb(0x404)](String(RegExp['$1']));}if(_0x2e7c35[_0x3794eb(0x4db)](/FADE IN:[ ](\d+)/i))return this[_0x3794eb(0x5ab)](Number(RegExp['$1']));if(_0x2e7c35[_0x3794eb(0x4db)](/FADE OUT:[ ](\d+)/i)){if(_0x3794eb(0x281)!==_0x3794eb(0x281))_0x52cfaa[_0x3794eb(0xca)]();else return this['processMoveRouteFadeOut'](Number(RegExp['$1']));}if(_0x2e7c35[_0x3794eb(0x4db)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x3794eb(0x448)]();if(_0x2e7c35[_0x3794eb(0x4db)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x3794eb(0x200)]();if(_0x2e7c35[_0x3794eb(0x4db)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x3794eb(0x297)]();if(_0x2e7c35[_0x3794eb(0x4db)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x3794eb(0x222)]();if(_0x2e7c35[_0x3794eb(0x4db)](/HUG:[ ]LEFT/i))return this[_0x3794eb(0x400)](_0x3794eb(0x148));if(_0x2e7c35['match'](/HUG:[ ]RIGHT/i))return this[_0x3794eb(0x400)](_0x3794eb(0x525));if(_0x2e7c35[_0x3794eb(0x4db)](/INDEX:[ ](\d+)/i)){if(_0x3794eb(0x255)!==_0x3794eb(0x3cb))return this[_0x3794eb(0x26f)](Number(RegExp['$1']));else{const _0x54f115=_0x7e9fa0['event'](_0x376552(_0x2d80b0['$1']));return this[_0x3794eb(0x1c9)](_0x54f115);}}if(_0x2e7c35[_0x3794eb(0x4db)](/INDEX:[ ]([\+\-]\d+)/i)){if('iPlKC'!=='JQNDq'){const _0x30f5ed=this[_0x3794eb(0x292)]+Number(RegExp['$1']);return this[_0x3794eb(0x26f)](_0x30f5ed);}else{if(!_0x1fcd56['ALLOW_LADDER_DASH']&&this[_0x3794eb(0x598)]())return![];if(this[_0x3794eb(0x1b4)])return!![];return _0x4af215['EventsMoveCore'][_0x3794eb(0x2c8)][_0x3794eb(0x58d)](this);}}if(_0x2e7c35[_0x3794eb(0x4db)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x3794eb(0x135)](Number(RegExp['$1']));if(_0x2e7c35[_0x3794eb(0x4db)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x3794eb(0x3bf)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x2e7c35['match'](/JUMP TO EVENT:[ ](\d+)/i)){if(_0x3794eb(0x299)!==_0x3794eb(0x5e7)){const _0x47c1ed=$gameMap[_0x3794eb(0x427)](Number(RegExp['$1']));return this['processMoveRouteJumpToCharacter'](_0x47c1ed);}else return this[_0x3794eb(0x2c6)](_0x17562b,_0x5b2d1e);}if(_0x2e7c35[_0x3794eb(0x4db)](/JUMP TO PLAYER/i))return this['processMoveRouteJumpToCharacter']($gamePlayer);if(_0x2e7c35[_0x3794eb(0x4db)](/JUMP TO HOME/i)&&this[_0x3794eb(0x3d6)]){if(_0x3794eb(0x24a)!==_0x3794eb(0x24a)){let _0x3b55a9=0x0;if(_0x300d3d)_0x355213[_0x3794eb(0x50d)]=!![];_0x5627cc[_0x3794eb(0x2a2)]()?_0x3b55a9=this[_0x3794eb(0x599)](_0x286a41,_0xa577a6):_0x3b55a9=this[_0x3794eb(0x247)](_0x5d42e0,_0x4c3c76);if(_0x548657)_0x1e4a3a[_0x3794eb(0x50d)]=![];this['executeMoveDir8'](_0x3b55a9),this[_0x3794eb(0x28d)](!![]);}else{const _0x57bf5e=this[_0x3794eb(0x18c)],_0x464615=this[_0x3794eb(0x5e9)];return this[_0x3794eb(0x3bf)](_0x57bf5e,_0x464615);}}if(_0x2e7c35['match'](/MOVE[ ](.*)[ ]UNTIL STOP/i)){if('ipNkD'===_0x3794eb(0x37a))_0x1b9c8f[_0x3794eb(0x134)](0x0);else{const _0x1131f4=String(RegExp['$1']),_0xdb557a=this[_0x3794eb(0x439)](_0x2e7c35);return this[_0x3794eb(0x15e)](_0x1131f4,_0xdb557a);}}if(_0x2e7c35[_0x3794eb(0x4db)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x3794eb(0x1c2)===_0x3794eb(0x4ab))return this[_0x3794eb(0x1c3)][_0x3794eb(0x2d9)](_0x7ddffc,_0x3e7698),_0xb5d7b9?this[_0x3794eb(0x1c3)][_0x3794eb(0x212)](_0x4e13b7):this[_0x3794eb(0x1c3)][_0x3794eb(0x414)](),this['_interpreter']['_cpc'];else{const _0x3a4772=Number(RegExp['$1']),_0x9d6fbd=Number(RegExp['$2']),_0x51a8db=this[_0x3794eb(0x439)](_0x2e7c35);return this[_0x3794eb(0x48e)](_0x3a4772,_0x9d6fbd,_0x51a8db);}}if(_0x2e7c35['match'](/MOVE TO EVENT:[ ](\d+)/i)){if(_0x3794eb(0x1fd)!==_0x3794eb(0xeb)){const _0x3ac859=$gameMap['event'](Number(RegExp['$1'])),_0x303291=this[_0x3794eb(0x439)](_0x2e7c35);return this[_0x3794eb(0x56a)](_0x3ac859,_0x303291);}else{const _0x4d8f95=this[_0x3794eb(0x427)](_0xe8d52d);if(_0x4d8f95)_0x4d8f95['erase']();}}if(_0x2e7c35['match'](/MOVE TO PLAYER/i)){if(_0x3794eb(0x2f8)===_0x3794eb(0x287))this[_0x3794eb(0x5dc)]();else{const _0x28208e=this[_0x3794eb(0x439)](_0x2e7c35);return this[_0x3794eb(0x56a)]($gamePlayer,_0x28208e);}}if(_0x2e7c35[_0x3794eb(0x4db)](/MOVE TO HOME/i)&&this[_0x3794eb(0x3d6)]){const _0x5439c7=this[_0x3794eb(0x18c)],_0x26c65f=this[_0x3794eb(0x5e9)],_0xbe4784=this['checkCollisionKeywords'](_0x2e7c35);return this[_0x3794eb(0x48e)](_0x5439c7,_0x26c65f,_0xbe4784);}if(_0x2e7c35[_0x3794eb(0x4db)](/MOVE LOWER LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x1,Number(RegExp['$1']));if(_0x2e7c35[_0x3794eb(0x4db)](/MOVE DOWN:[ ](\d+)/i))return this[_0x3794eb(0xe2)](0x2,Number(RegExp['$1']));if(_0x2e7c35[_0x3794eb(0x4db)](/MOVE LOWER RIGHT:[ ](\d+)/i)){if(_0x3794eb(0x4cc)===_0x3794eb(0x4cc))return this[_0x3794eb(0xe2)](0x3,Number(RegExp['$1']));else{_0x1d22e2['ConvertParams'](_0xb981f3,_0x2fc198);const _0x27af9d=_0x8bb6eb['getLastPluginCommandInterpreter']();_0xf7f113[_0x3794eb(0x102)]=_0x56e5ce[_0x3794eb(0x102)]||_0x2b1e8f[_0x3794eb(0x3be)](),_0x3ea49c['deleteIconsOnEventsDataKey'](_0x17d8c3['MapId'],_0x2e4e52[_0x3794eb(0x312)]||_0x27af9d[_0x3794eb(0x3d6)]());}}if(_0x2e7c35[_0x3794eb(0x4db)](/MOVE LEFT:[ ](\d+)/i)){if('DCVsX'===_0x3794eb(0x3e6))return this[_0x3794eb(0xe2)](0x4,Number(RegExp['$1']));else{if(this[_0x3794eb(0x256)](_0x1adf51,_0x3b8a43,0x2))return!![];if(this[_0x3794eb(0x256)](_0x3cb412,_0xfdc8f2,0x4))return!![];if(this[_0x3794eb(0x256)](_0x30c44a,_0x360428,0x6))return!![];if(this[_0x3794eb(0x256)](_0x104544,_0x34e798,0x8))return!![];return![];}}if(_0x2e7c35[_0x3794eb(0x4db)](/MOVE RIGHT:[ ](\d+)/i))return _0x3794eb(0x10d)===_0x3794eb(0x45d)?_0x4f3b2f[_0x3794eb(0x141)][_0x3794eb(0x4dd)]['call'](this):this[_0x3794eb(0xe2)](0x6,Number(RegExp['$1']));if(_0x2e7c35[_0x3794eb(0x4db)](/MOVE UPPER LEFT:[ ](\d+)/i))return this[_0x3794eb(0xe2)](0x7,Number(RegExp['$1']));if(_0x2e7c35[_0x3794eb(0x4db)](/MOVE UP:[ ](\d+)/i))return this[_0x3794eb(0xe2)](0x8,Number(RegExp['$1']));if(_0x2e7c35['match'](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x3794eb(0xe2)](0x9,Number(RegExp['$1']));if(_0x2e7c35[_0x3794eb(0x4db)](/OPACITY:[ ](\d+)([%％])/i)){const _0x1bd711=Math[_0x3794eb(0xdb)](Number(RegExp['$1'])/0x64*0xff);return this[_0x3794eb(0xe0)](_0x1bd711[_0x3794eb(0x1c5)](0x0,0xff));}if(_0x2e7c35['match'](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x2ed181=this[_0x3794eb(0x520)]+Math[_0x3794eb(0xdb)](Number(RegExp['$1'])/0x64*0xff);return this[_0x3794eb(0xe0)](_0x2ed181[_0x3794eb(0x1c5)](0x0,0xff));}if(_0x2e7c35[_0x3794eb(0x4db)](/OPACITY:[ ]([\+\-]\d+)/i)){if(_0x3794eb(0x58c)===_0x3794eb(0x58c)){const _0x1028b4=this[_0x3794eb(0x520)]+Number(RegExp['$1']);return this[_0x3794eb(0xe0)](_0x1028b4[_0x3794eb(0x1c5)](0x0,0xff));}else _0x1c27e6[_0x3794eb(0x193)](_0x538086[_0x3794eb(0x102)],_0x2b8642['EventId']||_0x57c731[_0x3794eb(0x3d6)]());}if(_0x2e7c35[_0x3794eb(0x4db)](/PATTERN LOCK:[ ](\d+)/i))return this['processMoveRoutePatternLock'](Number(RegExp['$1']));if(_0x2e7c35[_0x3794eb(0x4db)](/PATTERN UNLOCK/i))return this[_0x3794eb(0x4c7)]=![];if(_0x2e7c35[_0x3794eb(0x4db)](/POSE:[ ](.*)/i)){if(_0x3794eb(0x5c4)===_0x3794eb(0x159))_0x44d901[_0x3794eb(0x358)](_0x32c11f[_0x3794eb(0x2ba)]),_0x1053ee['EventsMoveCore'][_0x3794eb(0x4c1)][_0x3794eb(0x58d)](this),_0x2d042d[_0x3794eb(0x328)]();else{const _0x5b7be6=String(RegExp['$1'])[_0x3794eb(0x38b)]()[_0x3794eb(0x445)]();return this['setPose'](_0x5b7be6);}}if(_0x2e7c35[_0x3794eb(0x4db)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x4faff4=Number(RegExp['$1']),_0x49696f=Number(RegExp['$2']);return this[_0x3794eb(0x549)](_0x4faff4,_0x49696f);}if(_0x2e7c35['match'](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x139f6d=$gameMap[_0x3794eb(0x427)](Number(RegExp['$1']));return this['processMoveRouteStepToCharacter'](_0x139f6d);}if(_0x2e7c35[_0x3794eb(0x4db)](/STEP TOWARD PLAYER/i)){if(_0x3794eb(0x144)!=='EQrpQ')return this[_0x3794eb(0xc7)]($gamePlayer);else _0x4d26da+=_0x1a6e04[_0x3794eb(0x218)][0x0];}if(_0x2e7c35[_0x3794eb(0x4db)](/STEP TOWARD HOME/i)&&this[_0x3794eb(0x3d6)]){if(_0x3794eb(0x3c0)===_0x3794eb(0x348)){_0x32aa87[_0x3794eb(0x239)](_0x3d6f9d,_0x5ac780);if(!_0x5c8a50)return;const _0x203e18=_0x41b259[_0x3794eb(0x196)]();_0x5debca['MapId']=_0x125c68['MapId']||_0x3655fa[_0x3794eb(0x3be)]();if(_0x35bf92[_0x3794eb(0x3be)]()===_0x48d9be[_0x3794eb(0x102)]){const _0x5a9295=_0x16c692[_0x3794eb(0x427)](_0x11fbae['EventId']||_0x203e18[_0x3794eb(0x3d6)]());_0x5a9295['removeMorph']();}_0x709594[_0x3794eb(0x1d5)]&&_0x594c89[_0x3794eb(0x193)](_0x243c54[_0x3794eb(0x102)],_0x3b63ac[_0x3794eb(0x312)]||_0x203e18['eventId']());}else{const _0x22e76e=this[_0x3794eb(0x18c)],_0x25c792=this['_randomHomeY'];return this[_0x3794eb(0x549)](_0x22e76e,_0x25c792);}}if(_0x2e7c35[_0x3794eb(0x4db)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x3794eb(0x249)!==_0x3794eb(0x3fc))return this[_0x3794eb(0xed)](Number(RegExp['$1']),Number(RegExp['$2']));else this[_0x3794eb(0x35c)]=this[_0x3794eb(0x35c)]||0x0,this[_0x3794eb(0x35c)]=_0x2c70cc,this[_0x3794eb(0x47f)]=!![],this[_0x3794eb(0x35c)]=_0x3e4cf0[_0x3794eb(0x280)](0x1,this[_0x3794eb(0x35c)]);}if(_0x2e7c35[_0x3794eb(0x4db)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){if('KerWF'===_0x3794eb(0x509))this[_0x3794eb(0x449)]();else{const _0x1834ee=$gameMap['event'](Number(RegExp['$1']));return this[_0x3794eb(0x5c2)](_0x1834ee);}}if(_0x2e7c35['match'](/STEP AWAY FROM PLAYER/i))return this[_0x3794eb(0x5c2)]($gamePlayer);if(_0x2e7c35[_0x3794eb(0x4db)](/STEP AWAY FROM HOME/i)&&this[_0x3794eb(0x3d6)]){const _0x57f2f9=this['_randomHomeX'],_0x921895=this['_randomHomeY'];return this['moveAwayFromPoint'](_0x57f2f9,_0x921895);}if(_0x2e7c35['match'](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['moveTowardPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x2e7c35[_0x3794eb(0x4db)](/TURN TO EVENT:[ ](\d+)/i)){const _0x80b18e=$gameMap[_0x3794eb(0x427)](Number(RegExp['$1']));return this[_0x3794eb(0x4c8)](_0x80b18e);}if(_0x2e7c35[_0x3794eb(0x4db)](/TURN TO PLAYER/i))return this[_0x3794eb(0x4c8)]($gamePlayer);if(_0x2e7c35[_0x3794eb(0x4db)](/TURN TO HOME/i)&&this[_0x3794eb(0x3d6)]){const _0x3dafd1=this[_0x3794eb(0x18c)],_0x1848b4=this[_0x3794eb(0x5e9)];return this[_0x3794eb(0x311)](_0x3dafd1,_0x1848b4);}if(_0x2e7c35[_0x3794eb(0x4db)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x3794eb(0x189)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x2e7c35[_0x3794eb(0x4db)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){if('jPrqK'!==_0x3794eb(0x2f4)){const _0x34f014=$gameMap['event'](Number(RegExp['$1']));return this[_0x3794eb(0x12c)](_0x34f014);}else return this['getPosingCharacterPattern']();}if(_0x2e7c35[_0x3794eb(0x4db)](/TURN AWAY FROM PLAYER/i))return this[_0x3794eb(0x12c)]($gamePlayer);if(_0x2e7c35[_0x3794eb(0x4db)](/TURN AWAY FROM HOME/i)&&this[_0x3794eb(0x3d6)]){if(_0x3794eb(0x167)===_0x3794eb(0x53f))this[_0x3794eb(0xda)](_0x40532e,_0x1408e6);else{const _0x2288e7=this[_0x3794eb(0x18c)],_0x1786c6=this[_0x3794eb(0x5e9)];return this['turnAwayFromPoint'](_0x2288e7,_0x1786c6);}}if(_0x2e7c35[_0x3794eb(0x4db)](/TURN LOWER LEFT/i)){if(_0x3794eb(0x415)===_0x3794eb(0x415))return this['setDirection'](0x1);else this[_0x3794eb(0x131)]['maxSize']=_0x212ac5(_0x43f21f['$1']);}if(_0x2e7c35['match'](/TURN LOWER RIGHT/i)){if(_0x3794eb(0x20b)==='gyOCa'){_0x5a28bb[_0x3794eb(0x239)](_0x52e7eb,_0x34dd97);const _0x39a55d=_0x2e1361[_0x3794eb(0x196)](),_0x414ca9={'template':_0x1d9ac5[_0x3794eb(0x48f)],'mapId':_0x5b0e88['MapId']||_0x4c7118[_0x3794eb(0x3be)](),'eventId':_0x5edf76[_0x3794eb(0x312)]||_0x39a55d['eventId'](),'x':_0x2b8ba5[_0x3794eb(0x1ed)],'y':_0xaac615[_0x3794eb(0x101)],'spawnPreserved':_0x48b8fe['Preserve'],'spawnEventId':_0x406119[_0x3794eb(0x4cd)][_0x3794eb(0x341)]+0x3e8},_0x5f3362=_0x27ab65[_0x3794eb(0x11b)]||0x0;if(!_0x437b9e[_0x3794eb(0x25a)][_0x414ca9[_0x3794eb(0x3be)]]&&_0x414ca9[_0x3794eb(0x3be)]!==_0xc80eaf[_0x3794eb(0x3be)]()){let _0xf855a7=_0x3794eb(0x498)[_0x3794eb(0x2c0)](_0x414ca9[_0x3794eb(0x3be)]);_0xf855a7+=_0x3794eb(0x388),_0xf855a7+=_0x3794eb(0x465),_0xf855a7+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0xf855a7+=_0x3794eb(0x149)[_0x3794eb(0x2c0)](_0x414ca9[_0x3794eb(0x3be)]),_0x530399(_0xf855a7);return;}const _0x22869b=_0x5be576['prepareSpawnedEventAtXY'](_0x414ca9,_0x5ec5b5[_0x3794eb(0x52d)],_0x37153b['Passability']);_0x5f3362&&_0x41734d[_0x3794eb(0x179)](_0x5f3362,!!_0x22869b);}else return this[_0x3794eb(0x392)](0x3);}if(_0x2e7c35['match'](/TURN UPPER LEFT/i)){if(_0x3794eb(0x3ec)===_0x3794eb(0x3ec))return this[_0x3794eb(0x392)](0x7);else{const _0x255fc2=_0x1af660[_0x3794eb(0x43b)][_0x1f2899];_0x255fc2&&(_0x4593f5['mapId']=_0x255fc2[_0x3794eb(0x20f)],_0x30b403[_0x3794eb(0x3d6)]=_0x255fc2['EventID']);}}if(_0x2e7c35[_0x3794eb(0x4db)](/TURN UPPER RIGHT/i)){if(_0x3794eb(0x295)===_0x3794eb(0x295))return this[_0x3794eb(0x392)](0x9);else{if(!this[_0x3794eb(0x17b)])return;this[_0x3794eb(0x2bc)](),this[_0x3794eb(0x565)]();}}if(_0x2e7c35[_0x3794eb(0x4db)](/Self Switch[ ](.*):[ ](.*)/i)){if(_0x3794eb(0x4e8)===_0x3794eb(0x44c)){_0x2b5ea8[_0x3794eb(0x239)](_0x15acaf,_0x179987);const _0x5e0760=_0x1a6f85['getLastPluginCommandInterpreter']();_0x2ffbdd[_0x3794eb(0x102)]=_0x340c90[_0x3794eb(0x102)]||_0x255bfa[_0x3794eb(0x3be)]();const _0x340577=[_0x2ab17b['MapId'],_0x350c14[_0x3794eb(0x312)]||_0x5e0760[_0x3794eb(0x3d6)](),_0x3794eb(0x21a)[_0x3794eb(0x2c0)](_0x315ede[_0x3794eb(0x4bc)])],_0x4daa6b=_0x53d3a0['TargetVariableId'],_0x55383e=_0x4547fe[_0x3794eb(0x40c)](_0x340577)||![];_0x51676b[_0x3794eb(0x179)](_0x4daa6b,_0x55383e);}else return this[_0x3794eb(0x3ed)](RegExp['$1'],RegExp['$2']);}if(_0x2e7c35[_0x3794eb(0x4db)](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x3794eb(0x2cf)](RegExp['$1'],RegExp['$2']);if(_0x2e7c35[_0x3794eb(0x4db)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x3794eb(0x30e)!=='yGecw')return this[_0x3794eb(0x334)](Number(RegExp['$1']),Number(RegExp['$2']));else{if(!this['isSpriteVS8dir']())_0x571261=this[_0x3794eb(0xbd)](_0xd6a1d9);_0x3aee5c['EventsMoveCore'][_0x3794eb(0x325)][_0x3794eb(0x58d)](this,_0x194b9f);}}if(_0x2e7c35[_0x3794eb(0x4db)](/TELEPORT TO EVENT:[ ](\d+)/i)){if(_0x3794eb(0x46a)===_0x3794eb(0x46a)){const _0x5aa661=$gameMap['event'](Number(RegExp['$1']));return this[_0x3794eb(0x507)](_0x5aa661);}else _0x29cc2f[_0x3794eb(0x19b)](_0x3b2dae[_0x4cb14c]);}if(_0x2e7c35[_0x3794eb(0x4db)](/TELEPORT TO PLAYER/i))return this[_0x3794eb(0x507)]($gamePlayer);if(_0x2e7c35[_0x3794eb(0x4db)](/TELEPORT TO HOME/i)&&this[_0x3794eb(0x3d6)]){if(_0x3794eb(0x56d)===_0x3794eb(0x56d)){const _0x25bbc4=this[_0x3794eb(0x18c)],_0x568aa1=this['_randomHomeY'];return this[_0x3794eb(0x334)](_0x25bbc4,_0x568aa1);}else _0x533269===_0x3794eb(0x148)?this[_0x3794eb(0x449)]():this[_0x3794eb(0x112)]();}try{if(_0x3794eb(0x5f5)==='ohXzT')VisuMZ[_0x3794eb(0x141)][_0x3794eb(0x596)][_0x3794eb(0x58d)](this,_0x5bcb5c);else{const _0x16d026=_0x2a8fe5[_0x3794eb(0x4e7)](_0x6981f5[_0x3794eb(0x234)]);_0x16d026[_0x3794eb(0x23a)](this[_0x3794eb(0x403)][_0x3794eb(0x2cd)](this,_0x16d026));}}catch(_0x268d5b){if(_0x3794eb(0x1fa)===_0x3794eb(0x1fa)){if($gameTemp[_0x3794eb(0x1cb)]())console[_0x3794eb(0x321)](_0x268d5b);}else{if(_0x53fe88[_0x3794eb(0x2e9)][_0x33c3d5][_0x3794eb(0x4db)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x7db7aa[_0x3794eb(0x294)]['push'](_0x531c7d);if(_0x38825e[_0x3794eb(0x2e9)][_0x58b2a2][_0x3794eb(0x4db)](/<SELF>/i))_0x737cc7['SelfVariables']['push'](_0x3ece0f);if(_0x5960ad['variables'][_0xf363b6][_0x3794eb(0x4db)](/<MAP>/i))_0x51a7e6[_0x3794eb(0x508)]['push'](_0x1de369);}}},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x416)]=function(_0xe2e170){$gameTemp['requestAnimation']([this],_0xe2e170);},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x404)]=function(_0x14f228){const _0x558787=_0x1f220f;let _0x1c5534=0x0;switch(_0x14f228[_0x558787(0x38b)]()[_0x558787(0x445)]()){case'!':case'EXCLAMATION':_0x1c5534=0x1;break;case'?':case _0x558787(0x5d6):_0x1c5534=0x2;break;case _0x558787(0x109):case _0x558787(0x125):case'MUSIC\x20NOTE':case'MUSIC-NOTE':case'MUSICNOTE':_0x1c5534=0x3;break;case _0x558787(0xce):case _0x558787(0x5ad):_0x1c5534=0x4;break;case _0x558787(0x396):_0x1c5534=0x5;break;case _0x558787(0x2ee):_0x1c5534=0x6;break;case _0x558787(0x5b0):case _0x558787(0x113):case _0x558787(0x104):_0x1c5534=0x7;break;case _0x558787(0x475):case _0x558787(0x44f):_0x1c5534=0x8;break;case _0x558787(0x4d7):case _0x558787(0x267):case'LIGHT\x20BULB':case _0x558787(0x186):case _0x558787(0x14f):_0x1c5534=0x9;break;case'Z':case'ZZ':case _0x558787(0x2c1):case'SLEEP':_0x1c5534=0xa;break;case _0x558787(0x460):_0x1c5534=0xb;break;case _0x558787(0x4bf):_0x1c5534=0xc;break;case _0x558787(0x203):_0x1c5534=0xd;break;case _0x558787(0x418):_0x1c5534=0xe;break;case'USER-DEFINED\x205':_0x1c5534=0xf;break;}$gameTemp[_0x558787(0xdd)](this,_0x1c5534);},Game_Character['prototype'][_0x1f220f(0x5ab)]=function(_0x143bc3){const _0x4de5d6=_0x1f220f;_0x143bc3+=this['_opacity'],this[_0x4de5d6(0xe0)](_0x143bc3['clamp'](0x0,0xff));if(this['_opacity']<0xff)this[_0x4de5d6(0x185)]--;},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x497)]=function(_0x4d37a2){const _0x1b908c=_0x1f220f;_0x4d37a2=this[_0x1b908c(0x520)]-_0x4d37a2,this[_0x1b908c(0xe0)](_0x4d37a2[_0x1b908c(0x1c5)](0x0,0xff));if(this[_0x1b908c(0x520)]>0x0)this[_0x1b908c(0x185)]--;},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x400)]=function(_0xb16129){const _0x4bda05=_0x1f220f,_0x576af9=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x3c3294=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x425178=this[_0x4bda05(0x59a)](),_0x5a47de=(_0xb16129===_0x4bda05(0x148)?_0x576af9:_0x3c3294)[_0x425178],_0x46d5ab=(_0xb16129===_0x4bda05(0x148)?_0x3c3294:_0x576af9)[_0x425178];if(this[_0x4bda05(0x158)](this['x'],this['y'],_0x5a47de)){if(_0xb16129===_0x4bda05(0x148))this[_0x4bda05(0x449)]();else{if(_0x4bda05(0x3b0)===_0x4bda05(0x3b0))this[_0x4bda05(0x112)]();else{if([0x1,0x4,0x7]['includes'](_0x206ab6))_0x57f230-=0x1;if([0x3,0x6,0x9][_0x4bda05(0x220)](_0x755563))_0x1d2ce2+=0x1;return this[_0x4bda05(0x157)](_0x37a5fa);}}}else!this[_0x4bda05(0x158)](this['x'],this['y'],this[_0x4bda05(0x59a)]())&&(this[_0x4bda05(0x158)](this['x'],this['y'],_0x46d5ab)?_0xb16129==='left'?this[_0x4bda05(0x112)]():_0x4bda05(0x496)===_0x4bda05(0x496)?this[_0x4bda05(0x449)]():_0xe213be=[_0x1e3434,_0x3015d2,_0x2462cb[_0x4bda05(0x38b)]()[_0x4bda05(0x445)]()]:this['turn180']());this['canPass'](this['x'],this['y'],this[_0x4bda05(0x59a)]())&&(_0x4bda05(0x461)!==_0x4bda05(0x461)?this[_0x4bda05(0x5c8)][_0x4bda05(0xd1)]()!==this[_0x4bda05(0x44b)]&&(this[_0x4bda05(0x44b)]=this[_0x4bda05(0x5c8)][_0x4bda05(0xd1)](),this['refresh']()):this[_0x4bda05(0x385)]());},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x26f)]=function(_0x363601){const _0x418e50=_0x1f220f;if(ImageManager['isBigCharacter'](this['_characterName']))return;_0x363601=_0x363601['clamp'](0x0,0x7),this[_0x418e50(0x1f4)](this[_0x418e50(0x28a)],_0x363601);},Game_Character[_0x1f220f(0x362)]['processMoveRouteJumpForward']=function(_0xd95735){const _0x1403e9=_0x1f220f;switch(this[_0x1403e9(0x59a)]()){case 0x1:this[_0x1403e9(0x4ae)](-_0xd95735,_0xd95735);break;case 0x2:this[_0x1403e9(0x4ae)](0x0,_0xd95735);break;case 0x3:this[_0x1403e9(0x4ae)](_0xd95735,_0xd95735);break;case 0x4:this[_0x1403e9(0x4ae)](-_0xd95735,0x0);break;case 0x6:this[_0x1403e9(0x4ae)](_0xd95735,0x0);break;case 0x7:this[_0x1403e9(0x4ae)](-_0xd95735,-_0xd95735);break;case 0x8:this[_0x1403e9(0x4ae)](0x0,-_0xd95735);break;case 0x9:this[_0x1403e9(0x4ae)](_0xd95735,-_0xd95735);break;}},Game_Character['prototype']['processMoveRouteJumpTo']=function(_0x1c4478,_0x493b6c){const _0x28fb60=_0x1f220f,_0xa249a9=Math['round'](_0x1c4478-this['x']),_0x1a83f6=Math[_0x28fb60(0xdb)](_0x493b6c-this['y']);this['jump'](_0xa249a9,_0x1a83f6);},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x1c9)]=function(_0x5a068a){if(_0x5a068a)this['processMoveRouteJumpTo'](_0x5a068a['x'],_0x5a068a['y']);},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x549)]=function(_0x265837,_0x27bec,_0x560cff){const _0x3c7c4a=_0x1f220f;let _0x27e16d=0x0;if(_0x560cff)$gameTemp[_0x3c7c4a(0x50d)]=!![];if($gameMap[_0x3c7c4a(0x2a2)]()){if('PdLJr'!==_0x3c7c4a(0x265))_0x27e16d=this[_0x3c7c4a(0x599)](_0x265837,_0x27bec);else{const _0xd135ab=_0x55736d[_0x3c7c4a(0x43a)][_0x3c7c4a(0x3be)],_0x581d91=_0x3a5b09[_0x3c7c4a(0x43a)][_0x3c7c4a(0x3d6)];return _0x183c8e['referEvent'](_0xd135ab,_0x581d91);}}else{if('DSyoU'===_0x3c7c4a(0x344)){if(_0x18f171)_0x3926ac[_0x3c7c4a(0x221)](_0x3ea9f4);}else _0x27e16d=this['findDirectionTo'](_0x265837,_0x27bec);}if(_0x560cff)$gameTemp['_moveAllowPlayerCollision']=![];this[_0x3c7c4a(0x52b)](_0x27e16d),this[_0x3c7c4a(0x28d)](!![]);},Game_Character['prototype'][_0x1f220f(0xc7)]=function(_0x17a89a){const _0x4c5184=_0x1f220f;if(_0x17a89a)this[_0x4c5184(0x549)](_0x17a89a['x'],_0x17a89a['y']);},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x453)]=function(_0x1a4286,_0x5cb4a4){const _0x225db1=_0x1f220f,_0x4b8a81=this['deltaXFrom'](_0x1a4286),_0xab0bb9=this[_0x225db1(0x270)](_0x5cb4a4);},Game_Character['prototype'][_0x1f220f(0x439)]=function(_0x2356f5){const _0x263d04=_0x1f220f;if(_0x2356f5[_0x263d04(0x4db)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else{if(_0x2356f5[_0x263d04(0x4db)](/(?:AVOID|EVADE|DODGE)/i))return![];else{if(_0x263d04(0x195)===_0x263d04(0x195))return![];else _0x541565[_0x263d04(0x141)][_0x263d04(0x1ad)][_0x263d04(0x58d)](this),this[_0x263d04(0x163)]();}}},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x27e)]=Game_Event[_0x1f220f(0x362)][_0x1f220f(0x191)],Game_Event['prototype'][_0x1f220f(0x191)]=function(_0x40249c,_0x2ec74f){const _0x533379=_0x1f220f;if($gameTemp['_moveAllowPlayerCollision'])return![];return VisuMZ[_0x533379(0x141)]['Game_Event_isCollidedWithPlayerCharacters'][_0x533379(0x58d)](this,_0x40249c,_0x2ec74f);},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x15e)]=function(_0x1cb065,_0x1f91aa){const _0x29c762=_0x1f220f,_0x5abe7e=['','LOWER\x20LEFT',_0x29c762(0x4c2),_0x29c762(0x4be),_0x29c762(0x26b),'',_0x29c762(0x4fa),_0x29c762(0x30c),'UP',_0x29c762(0x3fa)],_0x34033a=_0x5abe7e['indexOf'](_0x1cb065[_0x29c762(0x38b)]()[_0x29c762(0x445)]());if(_0x34033a<=0x0)return;if(_0x1f91aa)$gameTemp['_moveAllowPlayerCollision']=!![];if(this[_0x29c762(0x158)](this['x'],this['y'],_0x34033a)){if(_0x29c762(0x538)==='jHOel'){if(this[_0x29c762(0x4c7)])return;if(this['updatePatternEventsMoveCore']())return;_0xba005[_0x29c762(0x141)][_0x29c762(0x32b)]['call'](this);}else{if(_0x1f91aa)$gameTemp[_0x29c762(0x50d)]=![];this[_0x29c762(0x52b)](_0x34033a),this[_0x29c762(0x185)]-=0x1;}}if(_0x1f91aa)$gameTemp['_moveAllowPlayerCollision']=![];},Game_Character[_0x1f220f(0x362)]['processMoveRouteMoveTo']=function(_0x3773d5,_0x5bc76f,_0x995350){const _0x2382e2=_0x1f220f;this['processMoveRouteStepTo'](_0x3773d5,_0x5bc76f,_0x995350);if(this['x']!==_0x3773d5||this['y']!==_0x5bc76f)this[_0x2382e2(0x185)]--;},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x56a)]=function(_0x508116,_0x34d33d){const _0x5df22b=_0x1f220f;if(_0x508116&&!_0x508116[_0x5df22b(0x37e)]){this['processMoveRouteMoveTo'](_0x508116['x'],_0x508116['y'],_0x34d33d);if(_0x508116[_0x5df22b(0x111)]()&&this[_0x5df22b(0x111)]()){if(_0x5df22b(0x13c)!==_0x5df22b(0x13c)){const _0xa2e61c=_0x21601f(_0x4abd4a['$1'])[_0x5df22b(0x38b)]()['trim']();return this['setPose'](_0xa2e61c);}else{const _0xd21e50=$gameMap[_0x5df22b(0x34d)](this['x'],this['y'],_0x508116['x'],_0x508116['y']);if(_0xd21e50<=0x1)this[_0x5df22b(0x185)]++;}}}},Game_Character[_0x1f220f(0x362)][_0x1f220f(0xe2)]=function(_0x5804fa,_0x471df0){const _0x44923d=_0x1f220f;_0x471df0=_0x471df0||0x0;const _0x180112={'code':0x1,'indent':null,'parameters':[]};_0x180112[_0x44923d(0x161)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x5804fa],this[_0x44923d(0x30f)][_0x44923d(0x52e)][this['_moveRouteIndex']][_0x44923d(0x218)][0x0]='';while(_0x471df0--){if(_0x44923d(0x13b)==='PVQYw')this[_0x44923d(0x30f)][_0x44923d(0x52e)]['splice'](this[_0x44923d(0x185)]+0x1,0x0,_0x180112);else{_0x34faad[_0x44923d(0x141)][_0x44923d(0x264)][_0x44923d(0x20e)](_0x330e54),this[_0x44923d(0x33d)]=_0x2d5dd3[_0x44923d(0x262)][_0x44923d(0x341)]>0x0;_0x2c8dd3['CPC']===_0x102ef9&&_0x102b75[_0x44923d(0x141)][_0x44923d(0x264)][_0x44923d(0x20e)](_0x197e9e);if(_0x33de67[_0x44923d(0x262)]['length']>0x0)return _0x36f422[_0x44923d(0x427)](this[_0x44923d(0x53b)])&&_0x2f8809[_0x44923d(0x141)][_0x44923d(0x264)]['metCPC'](_0x4f76f7[_0x44923d(0x262)],this[_0x44923d(0x53b)]);return!![];}}},Game_Character[_0x1f220f(0x362)][_0x1f220f(0xb4)]=function(_0xe44079){this['_patternLocked']=!![],this['setPattern'](_0xe44079);},Game_Character['prototype'][_0x1f220f(0x3ed)]=function(_0xc9b37d,_0x1ac60a){const _0x48bac6=_0x1f220f;if(this===$gamePlayer)return;const _0x5cff36=[this['_mapId'],this[_0x48bac6(0x53b)],'A'];_0xc9b37d['match'](/\b[ABCD]\b/i)?_0x5cff36[0x2]=String(_0xc9b37d)[_0x48bac6(0x5a4)](0x0)[_0x48bac6(0x38b)]()['trim']():_0x5cff36[0x2]='Self\x20Switch\x20%1'['format'](_0xc9b37d);switch(_0x1ac60a[_0x48bac6(0x38b)]()[_0x48bac6(0x445)]()){case'ON':case _0x48bac6(0x546):$gameSelfSwitches[_0x48bac6(0x179)](_0x5cff36,!![]);break;case _0x48bac6(0x117):case _0x48bac6(0x455):$gameSelfSwitches['setValue'](_0x5cff36,![]);break;case'TOGGLE':$gameSelfSwitches[_0x48bac6(0x179)](_0x5cff36,!$gameSelfSwitches[_0x48bac6(0x40c)](_0x5cff36));break;}},Game_Character['prototype'][_0x1f220f(0x2cf)]=function(_0x48448b,_0x2106de){const _0x5cf764=_0x1f220f;if(this===$gamePlayer)return;const _0x3fd036=[this[_0x5cf764(0x27a)],this[_0x5cf764(0x53b)],_0x5cf764(0x21a)[_0x5cf764(0x2c0)](_0x48448b)];$gameSelfSwitches[_0x5cf764(0x179)](_0x3fd036,Number(_0x2106de));},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x334)]=function(_0x208f90,_0xac7a33){const _0x213458=_0x1f220f;this[_0x213458(0x5e0)](_0x208f90,_0xac7a33);},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x507)]=function(_0x494ac6){const _0x2976e9=_0x1f220f;if(_0x494ac6)this[_0x2976e9(0x334)](_0x494ac6['x'],_0x494ac6['y']);},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x112)]=function(){const _0x5b90f9=_0x1f220f;switch(this[_0x5b90f9(0x59a)]()){case 0x1:this[_0x5b90f9(0x392)](0x7);break;case 0x2:this[_0x5b90f9(0x392)](0x4);break;case 0x3:this[_0x5b90f9(0x392)](0x1);break;case 0x4:this['setDirection'](0x8);break;case 0x6:this[_0x5b90f9(0x392)](0x2);break;case 0x7:this[_0x5b90f9(0x392)](0x9);break;case 0x8:this[_0x5b90f9(0x392)](0x6);break;case 0x9:this[_0x5b90f9(0x392)](0x3);break;}},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x449)]=function(){const _0x462a9c=_0x1f220f;switch(this[_0x462a9c(0x59a)]()){case 0x1:this[_0x462a9c(0x392)](0x3);break;case 0x2:this['setDirection'](0x6);break;case 0x3:this[_0x462a9c(0x392)](0x9);break;case 0x4:this['setDirection'](0x2);break;case 0x6:this[_0x462a9c(0x392)](0x8);break;case 0x7:this['setDirection'](0x1);break;case 0x8:this[_0x462a9c(0x392)](0x4);break;case 0x9:this[_0x462a9c(0x392)](0x7);break;}},Game_Character[_0x1f220f(0x362)]['getDirectionToPoint']=function(_0x4e667a,_0x522818,_0x3e1f47){const _0x36fbce=_0x1f220f,_0x579c40=this[_0x36fbce(0x402)](_0x4e667a),_0x305ee3=this[_0x36fbce(0x270)](_0x522818);if($gameMap[_0x36fbce(0x2a2)]()){if(_0x36fbce(0x4f5)===_0x36fbce(0x4f5)){if(_0x3e1f47||this['isSpriteVS8dir']()){if('GFlaE'==='GFlaE'){if(_0x579c40>0x0&&_0x305ee3<0x0)return 0x1;if(_0x579c40<0x0&&_0x305ee3<0x0)return 0x3;if(_0x579c40>0x0&&_0x305ee3>0x0)return 0x7;if(_0x579c40<0x0&&_0x305ee3>0x0)return 0x9;}else this[_0x36fbce(0x1eb)](_0x5caf68>0x0?0x4:0x6),!this[_0x36fbce(0x323)]()&&_0x5b6d04!==0x0&&this[_0x36fbce(0x1eb)](_0x47ac5b>0x0?0x8:0x2);}}else this['_eventCache']=_0x134dbe;}if(Math[_0x36fbce(0x16c)](_0x579c40)>Math[_0x36fbce(0x16c)](_0x305ee3))return _0x579c40>0x0?0x4:0x6;else{if(_0x305ee3!==0x0)return _0x305ee3>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x506)]=function(_0x11efa2,_0x3fb414,_0x43ba81){const _0x1a4bf6=_0x1f220f,_0x57f8fb=this[_0x1a4bf6(0x402)](_0x11efa2),_0x52408f=this[_0x1a4bf6(0x270)](_0x3fb414);if($gameMap['isSupportDiagonalMovement']()){if(_0x1a4bf6(0x1f1)===_0x1a4bf6(0x4e1))return this[_0x1a4bf6(0x4a3)]()?0x0:-_0x5227ad[_0x1a4bf6(0x3aa)];else{if(_0x43ba81||this['isSpriteVS8dir']()){if(_0x57f8fb>0x0&&_0x52408f<0x0)return 0x9;if(_0x57f8fb<0x0&&_0x52408f<0x0)return 0x7;if(_0x57f8fb>0x0&&_0x52408f>0x0)return 0x3;if(_0x57f8fb<0x0&&_0x52408f>0x0)return 0x1;}}}if(Math['abs'](_0x57f8fb)>Math['abs'](_0x52408f))return _0x1a4bf6(0x3d8)===_0x1a4bf6(0x3d8)?_0x57f8fb>0x0?0x6:0x4:_0xf00e22[_0x1a4bf6(0x141)]['Settings'][_0x1a4bf6(0x2d8)][_0x1a4bf6(0x521)];else{if(_0x52408f!==0x0)return _0x52408f>0x0?0x2:0x8;}return 0x0;},Game_Character['prototype'][_0x1f220f(0x586)]=function(_0x174830,_0x39d9b4){const _0x2675f3=_0x1f220f,_0x588032=this[_0x2675f3(0x50a)](_0x174830,_0x39d9b4,!![]);if(_0x588032)this['executeMoveDir8'](_0x588032);},Game_Character['prototype'][_0x1f220f(0xed)]=function(_0x2d3cd7,_0x1e623a){const _0x2be821=_0x1f220f,_0x4cc1d0=this[_0x2be821(0x506)](_0x2d3cd7,_0x1e623a,!![]);if(_0x4cc1d0)this[_0x2be821(0x52b)](_0x4cc1d0);},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x311)]=function(_0x3f443f,_0x21dbdd){const _0x2006e5=_0x1f220f,_0x4d6c0e=this['getDirectionToPoint'](_0x3f443f,_0x21dbdd,![]);if(_0x4d6c0e)this[_0x2006e5(0x392)](_0x4d6c0e);},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x189)]=function(_0x42d486,_0x345cf8){const _0x319cff=_0x1f220f,_0x94f22f=this[_0x319cff(0x506)](_0x42d486,_0x345cf8,![]);if(_0x94f22f)this[_0x319cff(0x392)](_0x94f22f);},Game_Character[_0x1f220f(0x362)]['moveTowardCharacter']=function(_0x4cda3e){const _0x5e311a=_0x1f220f;if(_0x4cda3e)this[_0x5e311a(0x586)](_0x4cda3e['x'],_0x4cda3e['y']);},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x5c2)]=function(_0x51c7d8){const _0xe6d9db=_0x1f220f;if(_0x51c7d8)this[_0xe6d9db(0xed)](_0x51c7d8['x'],_0x51c7d8['y']);},Game_Character[_0x1f220f(0x362)][_0x1f220f(0x4c8)]=function(_0x1d42a6){const _0x207b76=_0x1f220f;if(_0x1d42a6)this[_0x207b76(0x311)](_0x1d42a6['x'],_0x1d42a6['y']);},Game_Character['prototype'][_0x1f220f(0x12c)]=function(_0x10ea72){if(_0x10ea72)this['turnAwayFromPoint'](_0x10ea72['x'],_0x10ea72['y']);},VisuMZ['EventsMoveCore']['Game_Player_isDashing']=Game_Player['prototype'][_0x1f220f(0x50b)],Game_Player[_0x1f220f(0x362)]['isDashing']=function(){const _0x360363=_0x1f220f;if(!Game_CharacterBase[_0x360363(0x241)]&&this[_0x360363(0x598)]())return![];if(this[_0x360363(0x1b4)])return!![];return VisuMZ[_0x360363(0x141)]['Game_Player_isDashing']['call'](this);},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x443)]=Game_Player[_0x1f220f(0x362)][_0x1f220f(0x13f)],Game_Player[_0x1f220f(0x362)][_0x1f220f(0x13f)]=function(){const _0x9ca6a8=_0x1f220f;return $gameMap['isSupportDiagonalMovement']()?this['getInputDir8']():VisuMZ[_0x9ca6a8(0x141)][_0x9ca6a8(0x443)][_0x9ca6a8(0x58d)](this);},Game_Player[_0x1f220f(0x362)][_0x1f220f(0x2a3)]=function(){const _0x1aef3c=_0x1f220f;return Input[_0x1aef3c(0x154)];},Game_Player[_0x1f220f(0x362)][_0x1f220f(0x3ab)]=function(){const _0x9c284c=_0x1f220f;if($gameSystem[_0x9c284c(0x14c)]())return 0x0;if(!this[_0x9c284c(0x393)]()&&this[_0x9c284c(0x1a9)]()){let _0x42a61b=this[_0x9c284c(0x13f)]();if(_0x42a61b>0x0)$gameTemp['clearDestination']();else{if($gameTemp['isDestinationValid']()){if(_0x9c284c(0x243)===_0x9c284c(0x142))this[_0x9c284c(0x4ba)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this['_EventIcons']={},this[_0x9c284c(0x2e1)]=[],this[_0x9c284c(0x591)]={},this['_SavedEventLocations']={},this[_0x9c284c(0x114)]=![],this[_0x9c284c(0x1b6)]=_0x9c284c(0x399);else{const _0x1cad92=$gameTemp[_0x9c284c(0x45e)](),_0x1933a5=$gameTemp[_0x9c284c(0x1f2)]();this[_0x9c284c(0x4a0)](_0x1cad92,_0x1933a5)?_0x42a61b=this[_0x9c284c(0x599)](_0x1cad92,_0x1933a5):_0x42a61b=this[_0x9c284c(0x247)](_0x1cad92,_0x1933a5);}}}if(_0x42a61b>0x0){if(_0x9c284c(0x51e)!==_0x9c284c(0x569)){this[_0x9c284c(0x240)]=this[_0x9c284c(0x240)]||0x0;if(this[_0x9c284c(0x39f)]())this[_0x9c284c(0x392)](_0x42a61b);else{if('ZEVZx'!==_0x9c284c(0x3c3)){const _0x10567f=_0x1a0397[_0x9c284c(0x43b)][_0x691f0f];if(!_0x10567f)return;_0x2562b1=_0x10567f['MapID'],_0x1f2be5=_0x10567f[_0x9c284c(0x206)];}else this['executeMove'](_0x42a61b);}this[_0x9c284c(0x240)]++;}else{_0xb5a3c2[_0x9c284c(0x4db)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x3a6fca=_0x2a8553(_0x1a2be0['$1'])[_0x9c284c(0x552)]()[_0x9c284c(0x445)](),_0xacb4a2=_0xea4442(_0x180ae1['$2'])[_0x9c284c(0x552)]()[_0x9c284c(0x445)]();const _0x27f197=_0x242880[_0x9c284c(0x17f)]('['+_0x266463['$3'][_0x9c284c(0x4db)](/\d+/g)+']');_0x3a6fca=_0x3a6fca[_0x9c284c(0x5a4)](0x0)[_0x9c284c(0x38b)]()+_0x3a6fca['slice'](0x1),_0xacb4a2=_0xacb4a2[_0x9c284c(0x5a4)](0x0)[_0x9c284c(0x38b)]()+_0xacb4a2['slice'](0x1);const _0x281769=_0x9c284c(0x1ee)[_0x9c284c(0x2c0)](_0x3a6fca,_0xacb4a2);if(_0x509fb0[_0x281769])_0x203d7c[_0x281769]=_0x5575ea[_0x281769][_0x9c284c(0x3a7)](_0x27f197);}}else this[_0x9c284c(0x240)]=0x0;}},Game_Player['prototype'][_0x1f220f(0x39f)]=function(){const _0x30f894=_0x1f220f,_0x3f62a7=VisuMZ[_0x30f894(0x141)]['Settings'][_0x30f894(0x4c9)];if(!_0x3f62a7[_0x30f894(0x278)])return![];if($gameTemp[_0x30f894(0x4e0)]())return![];if(this[_0x30f894(0x50b)]()||this[_0x30f894(0x393)]()||this[_0x30f894(0x598)]())return![];return this[_0x30f894(0x240)]<_0x3f62a7['TurnInPlaceDelay'];},VisuMZ[_0x1f220f(0x141)]['Game_Player_executeMove']=Game_Player['prototype'][_0x1f220f(0x174)],Game_Player[_0x1f220f(0x362)][_0x1f220f(0x174)]=function(_0x5962c1){const _0x18a172=_0x1f220f;if($gameMap[_0x18a172(0x2a2)]())this[_0x18a172(0x52b)](_0x5962c1);else{if(_0x18a172(0xea)!==_0x18a172(0x490))VisuMZ['EventsMoveCore'][_0x18a172(0x300)][_0x18a172(0x58d)](this,_0x5962c1);else{if(_0x16b672!=='')_0xee9045+='\x0a';_0x3e8f74+=_0x1a09fa['parameters'][0x0];}}},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x190)]=Game_Player[_0x1f220f(0x362)][_0x1f220f(0x160)],Game_Player['prototype'][_0x1f220f(0x160)]=function(_0x5c7925,_0x38c473,_0x2111ca){const _0x255701=_0x1f220f;if($gameMap[_0x255701(0x574)](_0x5c7925,_0x38c473,_0x2111ca,_0x255701(0x354))){if(this[_0x255701(0x4a7)]()&&this[_0x255701(0x486)]())return this[_0x255701(0x486)]()[_0x255701(0x160)](_0x5c7925,_0x38c473,_0x2111ca);else{if(_0x255701(0x2cb)===_0x255701(0x2cb))return!![];else{if(!this['_needsPeriodicRefresh'])return;this['_periodicRefreshTimer']=this[_0x255701(0x4c5)]||0x3c,this[_0x255701(0x4c5)]--,this[_0x255701(0x4c5)]<=0x0&&(this[_0x255701(0x5e3)](),this['_periodicRefreshTimer']=0x3c);}}}if($gameMap[_0x255701(0x124)](_0x5c7925,_0x38c473,_0x2111ca,_0x255701(0x354)))return![];return VisuMZ[_0x255701(0x141)][_0x255701(0x190)][_0x255701(0x58d)](this,_0x5c7925,_0x38c473,_0x2111ca);},VisuMZ['EventsMoveCore'][_0x1f220f(0x152)]=Game_Player[_0x1f220f(0x362)][_0x1f220f(0x30b)],Game_Player[_0x1f220f(0x362)][_0x1f220f(0x30b)]=function(_0x378c0a){const _0x173f64=_0x1f220f;VisuMZ[_0x173f64(0x141)][_0x173f64(0x152)]['call'](this,_0x378c0a);if(this[_0x173f64(0x216)]()){this['checkEventTriggerEventsMoveCore'](_0x378c0a);if(_0x378c0a[_0x173f64(0x220)](0x0)&&this[_0x173f64(0x364)]()==='standing')this['startMapCommonEventOnOK'](this['x'],this['y']);else(_0x378c0a[_0x173f64(0x220)](0x1)||_0x378c0a[_0x173f64(0x220)](0x2))&&(_0x173f64(0x2dc)==='BzsQL'?(this['requestRefresh'](),this[_0x173f64(0x4c5)]=0x3c):this['startMapCommonEventOnTouch']());}},VisuMZ['EventsMoveCore'][_0x1f220f(0x11f)]=Game_Player[_0x1f220f(0x362)]['checkEventTriggerThere'],Game_Player['prototype'][_0x1f220f(0x19f)]=function(_0x2feefc){const _0x24849c=_0x1f220f;VisuMZ[_0x24849c(0x141)][_0x24849c(0x11f)][_0x24849c(0x58d)](this,_0x2feefc);if(this[_0x24849c(0x216)]()&&_0x2feefc[_0x24849c(0x220)](0x0)&&this[_0x24849c(0x364)]()===_0x24849c(0x11e)){const _0x2481b7=this[_0x24849c(0x59a)](),_0x48b7d1=$gameMap[_0x24849c(0x39e)](this['x'],_0x2481b7),_0x2f1185=$gameMap[_0x24849c(0x580)](this['y'],_0x2481b7);this[_0x24849c(0x4d2)](_0x48b7d1,_0x2f1185);}},Game_Player[_0x1f220f(0x362)][_0x1f220f(0x232)]=function(_0x1d85cf){const _0x32c268=_0x1f220f;if($gameMap['isEventRunning']())return;if($gameMap[_0x32c268(0x33b)]())return;const _0x4e8b87=$gameMap[_0x32c268(0x275)]();for(const _0x1a3958 of _0x4e8b87){if(_0x32c268(0x36c)!==_0x32c268(0x51c)){if(!_0x1a3958)continue;if(!_0x1a3958[_0x32c268(0x1b0)](_0x1d85cf))continue;if(this['meetActivationRegionConditions'](_0x1a3958))return _0x1a3958[_0x32c268(0x23b)]();if(this[_0x32c268(0x4b0)](_0x1a3958))return _0x1a3958['start']();}else _0x3d5744[_0x32c268(0x141)]['CustomPageConditions'][_0x32c268(0x20e)](_0x241efb);}},Game_Player['prototype']['meetActivationRegionConditions']=function(_0x514313){const _0x490b92=_0x1f220f;if($gameMap[_0x490b92(0x39b)]())return![];if($gameMap[_0x490b92(0x33b)]())return![];return _0x514313[_0x490b92(0x1ef)]()[_0x490b92(0x220)](this['regionId']());},Game_Player[_0x1f220f(0x362)][_0x1f220f(0x4b0)]=function(_0x2610d3){const _0x428fc8=_0x1f220f;if($gameMap['isEventRunning']())return![];if($gameMap['isAnyEventStarting']())return![];if(['none','region'][_0x428fc8(0x220)](_0x2610d3['activationProximityType']()))return![];const _0x287fb0=_0x2610d3[_0x428fc8(0x426)](),_0x4ef4ec=_0x2610d3[_0x428fc8(0x138)]();switch(_0x287fb0){case _0x428fc8(0x2f9):const _0x2d0195=$gameMap['distance'](this['x'],this['y'],_0x2610d3['x'],_0x2610d3['y']);return _0x2610d3[_0x428fc8(0x138)]()>=_0x2d0195;break;case _0x428fc8(0x214):return _0x4ef4ec>=Math[_0x428fc8(0x16c)](_0x2610d3[_0x428fc8(0x402)](this['x']))&&_0x4ef4ec>=Math['abs'](_0x2610d3[_0x428fc8(0x270)](this['y']));break;case'row':return _0x4ef4ec>=Math[_0x428fc8(0x16c)](_0x2610d3[_0x428fc8(0x270)](this['y']));break;case _0x428fc8(0x40d):return _0x4ef4ec>=Math[_0x428fc8(0x16c)](_0x2610d3[_0x428fc8(0x402)](this['x']));break;case _0x428fc8(0x399):return![];break;}},Game_Player[_0x1f220f(0x362)][_0x1f220f(0x4d2)]=function(_0x4b3140,_0x55cf55){const _0x14a55c=_0x1f220f;if($gameMap[_0x14a55c(0x39b)]())return;if($gameMap[_0x14a55c(0x33b)]())return;let _0x530097=VisuMZ[_0x14a55c(0x141)][_0x14a55c(0x454)]['RegionOk'],_0x233c06=$gameMap[_0x14a55c(0x1c7)](_0x4b3140,_0x55cf55);const _0x17c731=_0x14a55c(0x500)['format'](_0x233c06);if(_0x530097[_0x17c731]){if('Bthpu'===_0x14a55c(0x21f))$gameTemp[_0x14a55c(0x19b)](_0x530097[_0x17c731]);else{_0x2d6275[_0x14a55c(0x239)](_0x534c55,_0x33afe6);const _0x159b59=_0xd01535[_0x14a55c(0x196)]();_0x571508[_0x14a55c(0x102)]=_0x195472['MapId']||_0x5584e9[_0x14a55c(0x3be)]();const _0x74103a=[_0x49c1a9['MapId'],_0x586d0d['EventId']||_0x159b59[_0x14a55c(0x3d6)](),_0x14a55c(0x21a)[_0x14a55c(0x2c0)](_0x23c115[_0x14a55c(0x4bc)])],_0x2e4b2c=_0x9120e9[_0x14a55c(0x48a)](_0x1365b0[_0x14a55c(0x40c)](_0x74103a),_0x2f87a9[_0x14a55c(0x3cd)],_0x5ccdd4[_0x14a55c(0xbe)]);_0x43a10f[_0x14a55c(0x179)](_0x74103a,_0x2e4b2c);}}},Game_Player[_0x1f220f(0x362)][_0x1f220f(0x364)]=function(){const _0x3f9746=_0x1f220f;return VisuMZ[_0x3f9746(0x141)]['Settings'][_0x3f9746(0x1b5)];},Game_Player[_0x1f220f(0x362)][_0x1f220f(0x2ec)]=function(){const _0x465510=_0x1f220f;if($gameMap['isEventRunning']())return;if($gameMap[_0x465510(0x33b)]())return;let _0x8fe4b7=VisuMZ['EventsMoveCore'][_0x465510(0x454)][_0x465510(0x376)];const _0x3b3762=_0x465510(0x500)[_0x465510(0x2c0)](this[_0x465510(0x1c7)]());_0x8fe4b7[_0x3b3762]&&$gameTemp[_0x465510(0x19b)](_0x8fe4b7[_0x3b3762]);},VisuMZ[_0x1f220f(0x141)]['Game_Player_increaseSteps']=Game_Player[_0x1f220f(0x362)][_0x1f220f(0x35b)],Game_Player['prototype'][_0x1f220f(0x35b)]=function(){const _0x549f86=_0x1f220f;VisuMZ['EventsMoveCore'][_0x549f86(0x173)][_0x549f86(0x58d)](this),VisuMZ[_0x549f86(0x303)](0x0);},VisuMZ[_0x1f220f(0x141)]['Game_Follower_initialize']=Game_Follower['prototype']['initialize'],Game_Follower[_0x1f220f(0x362)][_0x1f220f(0xd8)]=function(_0x7246d0){const _0x18200c=_0x1f220f;VisuMZ[_0x18200c(0x141)]['Game_Follower_initialize'][_0x18200c(0x58d)](this,_0x7246d0),this[_0x18200c(0x582)]=![];},Game_Follower[_0x1f220f(0x362)][_0x1f220f(0x50b)]=function(){const _0x44689f=_0x1f220f;if(this[_0x44689f(0x582)])return Game_Character['prototype'][_0x44689f(0x50b)][_0x44689f(0x58d)](this);return $gamePlayer[_0x44689f(0x50b)]();},Game_Follower[_0x1f220f(0x362)][_0x1f220f(0xee)]=function(){const _0x7e59ed=_0x1f220f;if(this[_0x7e59ed(0x582)])return Game_Character[_0x7e59ed(0x362)][_0x7e59ed(0xee)]['call'](this);return $gamePlayer[_0x7e59ed(0xee)]()&&this[_0x7e59ed(0xc4)];},Game_Follower[_0x1f220f(0x362)]['realMoveSpeed']=function(){const _0x46a551=_0x1f220f;return $gamePlayer[_0x46a551(0x3af)]();},Game_Follower[_0x1f220f(0x362)][_0x1f220f(0x517)]=function(){const _0x4159ac=_0x1f220f;Game_Character[_0x4159ac(0x362)][_0x4159ac(0x517)][_0x4159ac(0x58d)](this),this[_0x4159ac(0x585)]>0x0&&('EDexM'!==_0x4159ac(0x58a)?this[_0x4159ac(0xc4)]=![]:this['_spriteOffsetX']=_0x206459(_0x40dc3d['$1']));},Game_Follower['prototype'][_0x1f220f(0x3ad)]=function(_0x367414){const _0x2e8f7f=_0x1f220f;this[_0x2e8f7f(0x582)]=_0x367414;},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x268)]=Game_Follower[_0x1f220f(0x362)][_0x1f220f(0xf0)],Game_Follower[_0x1f220f(0x362)]['chaseCharacter']=function(_0xdacdfd){const _0x2e1e42=_0x1f220f;if(this[_0x2e1e42(0x582)])return;if($gameSystem[_0x2e1e42(0x543)]())return;VisuMZ[_0x2e1e42(0x141)][_0x2e1e42(0x268)]['call'](this,_0xdacdfd),this[_0x2e1e42(0xc4)]=!![];},VisuMZ['EventsMoveCore']['Game_Vehicle_isMapPassable']=Game_Vehicle[_0x1f220f(0x362)]['isMapPassable'],Game_Vehicle[_0x1f220f(0x362)][_0x1f220f(0x160)]=function(_0x58b4d2,_0x5a0a3c,_0x6791ae){const _0x3d1c00=_0x1f220f;if($gameMap[_0x3d1c00(0x574)](_0x58b4d2,_0x5a0a3c,_0x6791ae,this[_0x3d1c00(0x51f)]))return!![];if($gameMap[_0x3d1c00(0x124)](_0x58b4d2,_0x5a0a3c,_0x6791ae,this[_0x3d1c00(0x51f)]))return![];return VisuMZ['EventsMoveCore']['Game_Vehicle_isMapPassable'][_0x3d1c00(0x58d)](this,_0x58b4d2,_0x5a0a3c,_0x6791ae);},Game_Vehicle[_0x1f220f(0x362)][_0x1f220f(0x153)]=function(_0xb176d6,_0x16ee5d,_0x356a2f){const _0x387498=_0x1f220f;if($gameMap[_0x387498(0x574)](_0xb176d6,_0x16ee5d,_0x356a2f,this[_0x387498(0x51f)]))return!![];if($gameMap['isRegionForbidPass'](_0xb176d6,_0x16ee5d,_0x356a2f,this[_0x387498(0x51f)]))return![];return VisuMZ[_0x387498(0x141)][_0x387498(0x4ec)][_0x387498(0x58d)]($gamePlayer,_0xb176d6,_0x16ee5d,_0x356a2f);},VisuMZ['EventsMoveCore'][_0x1f220f(0x45b)]=Game_Vehicle[_0x1f220f(0x362)]['isLandOk'],Game_Vehicle[_0x1f220f(0x362)][_0x1f220f(0x180)]=function(_0x53a14a,_0x47186e,_0x4bb57c){const _0x518594=_0x1f220f;if($gameMap[_0x518594(0x40b)](_0x53a14a,_0x47186e,_0x4bb57c,this[_0x518594(0x51f)]))return!![];const _0x46e6c0=this[_0x518594(0x51f)][_0x518594(0x5a4)](0x0)[_0x518594(0x38b)]()+this[_0x518594(0x51f)]['slice'](0x1),_0x460b42=_0x518594(0x1fc)[_0x518594(0x2c0)](_0x46e6c0);return VisuMZ[_0x518594(0x141)][_0x518594(0x454)][_0x518594(0x306)][_0x460b42]?_0x518594(0x2bf)!=='EIiRq'?this[_0x518594(0x189)](_0x9a1a9a(_0x20e41e['$1']),_0x21f456(_0x143ff5['$2'])):![]:VisuMZ['EventsMoveCore'][_0x518594(0x45b)]['call'](this,_0x53a14a,_0x47186e,_0x4bb57c);},VisuMZ[_0x1f220f(0x141)]['Game_Vehicle_initMoveSpeed']=Game_Vehicle[_0x1f220f(0x362)][_0x1f220f(0x48d)],Game_Vehicle[_0x1f220f(0x362)]['initMoveSpeed']=function(){const _0x478b5c=_0x1f220f;VisuMZ['EventsMoveCore']['Game_Vehicle_initMoveSpeed'][_0x478b5c(0x58d)](this);const _0xefe943=VisuMZ['EventsMoveCore'][_0x478b5c(0x454)][_0x478b5c(0x4c9)];if(this[_0x478b5c(0x472)]()){if(_0xefe943[_0x478b5c(0x31a)])this[_0x478b5c(0x547)](_0xefe943[_0x478b5c(0x31a)]);}else{if(this[_0x478b5c(0x3ef)]()){if(_0xefe943[_0x478b5c(0xcb)])this[_0x478b5c(0x547)](_0xefe943[_0x478b5c(0xcb)]);}else{if(this[_0x478b5c(0x535)]()){if(_0xefe943['AirshipSpeed'])this['setMoveSpeed'](_0xefe943[_0x478b5c(0x20a)]);}}}},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x390)]=Game_Event[_0x1f220f(0x362)][_0x1f220f(0xd8)],Game_Event[_0x1f220f(0x362)][_0x1f220f(0xd8)]=function(_0x32f2a0,_0x3479e9){const _0x111bcd=_0x1f220f;VisuMZ[_0x111bcd(0x141)]['Game_Event_initialize'][_0x111bcd(0x58d)](this,_0x32f2a0,_0x3479e9),this[_0x111bcd(0x54a)](),this['setupMorphEvent'](),this['restoreSavedEventPosition']();},Game_Map[_0x1f220f(0x362)][_0x1f220f(0x4a9)]=function(_0x53332c,_0x451351){const _0x2dfebd=_0x1f220f;if(_0x53332c===$gameMap[_0x2dfebd(0x3be)]()){if(_0x2dfebd(0x2ac)==='uMoux')this[_0x2dfebd(0x240)]=this[_0x2dfebd(0x240)]||0x0,this['isTurnInPlace']()?this[_0x2dfebd(0x392)](_0x4372ad):this[_0x2dfebd(0x174)](_0x334660),this[_0x2dfebd(0x240)]++;else return $dataMap['events'][_0x451351];}else return VisuMZ[_0x2dfebd(0x25a)][_0x53332c][_0x2dfebd(0x275)][_0x451351];},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x129)]=Game_Event[_0x1f220f(0x362)][_0x1f220f(0x427)],Game_Event[_0x1f220f(0x362)][_0x1f220f(0x427)]=function(){const _0x25277e=_0x1f220f;if(this[_0x25277e(0x349)]!==undefined){const _0x30624f=this['_eventMorphData'][_0x25277e(0x3be)],_0x856736=this[_0x25277e(0x349)][_0x25277e(0x3d6)];return $gameMap[_0x25277e(0x4a9)](_0x30624f,_0x856736);}if(this['_eventCopyData']!==undefined){const _0x486871=this[_0x25277e(0xe3)][_0x25277e(0x3be)],_0x294cbe=this[_0x25277e(0xe3)][_0x25277e(0x3d6)];return $gameMap['referEvent'](_0x486871,_0x294cbe);}if(this['_eventSpawnData']!==undefined){const _0x249e37=this[_0x25277e(0x383)][_0x25277e(0x3be)],_0x3a6608=this['_eventSpawnData'][_0x25277e(0x3d6)];return $gameMap['referEvent'](_0x249e37,_0x3a6608);}if($gameTemp['_spawnData']!==undefined){const _0x5ec558=$gameTemp['_spawnData'][_0x25277e(0x3be)],_0x5b66f7=$gameTemp[_0x25277e(0x43a)][_0x25277e(0x3d6)];return $gameMap[_0x25277e(0x4a9)](_0x5ec558,_0x5b66f7);}return VisuMZ[_0x25277e(0x141)][_0x25277e(0x129)][_0x25277e(0x58d)](this);},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x1d3)]=function(_0xb869b,_0x44c343){const _0x3bf1a3=_0x1f220f;if(_0xb869b===0x0||_0x44c343===0x0)return![];if(_0xb869b===$gameMap['mapId']())return!![];if(!VisuMZ[_0x3bf1a3(0x25a)][_0xb869b]&&_0xb869b!==$gameMap[_0x3bf1a3(0x3be)]())return _0x3bf1a3(0x283)!==_0x3bf1a3(0xd3)?($gameTemp[_0x3bf1a3(0x1cb)]()&&console[_0x3bf1a3(0x321)](_0x3bf1a3(0x286)['format'](_0xb869b)),![]):this[_0x3bf1a3(0xe2)](0x7,_0x3b1404(_0x32ac5e['$1']));return!![];},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x352)]=Game_Event[_0x1f220f(0x362)][_0x1f220f(0x23b)],Game_Event['prototype']['start']=function(){const _0xad6535=_0x1f220f;VisuMZ[_0xad6535(0x141)][_0xad6535(0x352)][_0xad6535(0x58d)](this);if(Imported['VisuMZ_1_MessageCore']&&Input[_0xad6535(0xef)](VisuMZ[_0xad6535(0x1b8)][_0xad6535(0x454)][_0xad6535(0x2fb)][_0xad6535(0x3dd)])){if(_0xad6535(0xb6)!==_0xad6535(0x589))Input[_0xad6535(0xca)]();else return this[_0xad6535(0x400)]('right');}},Game_Event[_0x1f220f(0x362)]['setupCopyEvent']=function(){const _0x2f2d30=_0x1f220f,_0x468d38=this['event']()[_0x2f2d30(0x57b)];if(_0x468d38==='')return;if(DataManager[_0x2f2d30(0xf7)]()||DataManager[_0x2f2d30(0x491)]())return;const _0x435684=VisuMZ[_0x2f2d30(0x141)]['Settings'][_0x2f2d30(0x1e1)];let _0x4c1883=null,_0x351712=0x0,_0x35e9e0=0x0;if(_0x468d38[_0x2f2d30(0x4db)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){_0x351712=Number(RegExp['$1']),_0x35e9e0=Number(RegExp['$2']);if(_0x351712===0x0)_0x351712=$gameMap[_0x2f2d30(0x3be)]();}else{if(_0x468d38[_0x2f2d30(0x4db)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){if(_0x2f2d30(0x12e)===_0x2f2d30(0x12e)){_0x351712=Number(RegExp['$1']),_0x35e9e0=Number(RegExp['$2']);if(_0x351712===0x0)_0x351712=$gameMap[_0x2f2d30(0x3be)]();}else _0x5d37e4[_0x2f2d30(0x141)][_0x2f2d30(0x45c)][_0x2f2d30(0x58d)](this,_0x4a492b,_0x474dbc);}else{if(_0x468d38[_0x2f2d30(0x4db)](/<COPY EVENT:[ ](.*?)>/i)){const _0x1ae570=String(RegExp['$1'])['toUpperCase']()[_0x2f2d30(0x445)]();_0x4c1883=VisuMZ['EventTemplates'][_0x1ae570];if(!_0x4c1883)return;_0x351712=_0x4c1883[_0x2f2d30(0x20f)],_0x35e9e0=_0x4c1883[_0x2f2d30(0x206)];}}}if(!this['checkValidEventerMap'](_0x351712,_0x35e9e0))return;_0x435684[_0x2f2d30(0xec)][_0x2f2d30(0x58d)](this,_0x351712,_0x35e9e0,this);if(_0x4c1883)_0x4c1883[_0x2f2d30(0xec)][_0x2f2d30(0x58d)](this,_0x351712,_0x35e9e0,this);this[_0x2f2d30(0xe3)]={'mapId':_0x351712,'eventId':_0x35e9e0},this[_0x2f2d30(0x277)]=-0x2,this['refresh'](),_0x435684[_0x2f2d30(0x3ae)][_0x2f2d30(0x58d)](this,_0x351712,_0x35e9e0,this);if(_0x4c1883)_0x4c1883[_0x2f2d30(0x3ae)][_0x2f2d30(0x58d)](this,_0x351712,_0x35e9e0,this);$gameMap[_0x2f2d30(0x5a2)]();},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x19e)]=function(){const _0x33089c=_0x1f220f,_0x8fb06c=$gameSystem[_0x33089c(0x4f4)](this);if(!_0x8fb06c)return;const _0x31207a=_0x8fb06c[_0x33089c(0x5ea)]['toUpperCase']()['trim']();_0x31207a!=='UNTITLED'?this[_0x33089c(0x382)](_0x31207a,!![]):this['morphInto'](_0x8fb06c[_0x33089c(0x3be)],_0x8fb06c['eventId'],!![]);},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x1c8)]=function(_0x162379,_0x1a81de,_0x38dcd9){const _0x573d33=_0x1f220f;if(!this[_0x573d33(0x1d3)](_0x162379,_0x1a81de))return;const _0x5c365b=VisuMZ[_0x573d33(0x141)][_0x573d33(0x454)]['Template'];if(!_0x38dcd9)_0x5c365b['PreMorphJS'][_0x573d33(0x58d)](this,_0x162379,_0x1a81de,this);this[_0x573d33(0x349)]={'mapId':_0x162379,'eventId':_0x1a81de},this['_pageIndex']=-0x2,this[_0x573d33(0x122)]();if(!_0x38dcd9)_0x5c365b[_0x573d33(0x1f6)]['call'](this,_0x162379,_0x1a81de,this);$gameMap[_0x573d33(0x5a2)]();},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x382)]=function(_0x1b2213,_0x3c3e67){const _0x2579a9=_0x1f220f;_0x1b2213=_0x1b2213[_0x2579a9(0x38b)]()['trim']();const _0x2f7fad=VisuMZ[_0x2579a9(0x43b)][_0x1b2213];if(!_0x2f7fad)return;const _0x2be4e3=_0x2f7fad[_0x2579a9(0x20f)],_0x1cca5a=_0x2f7fad['EventID'];if(!this[_0x2579a9(0x1d3)](_0x2be4e3,_0x1cca5a))return;if(!_0x3c3e67)_0x2f7fad['PreMorphJS']['call'](this,_0x2be4e3,_0x1cca5a,this);this[_0x2579a9(0x1c8)](_0x2be4e3,_0x1cca5a,_0x3c3e67);if(!_0x3c3e67)_0x2f7fad[_0x2579a9(0x1f6)][_0x2579a9(0x58d)](this,_0x2be4e3,_0x1cca5a,this);if($gameMap)$gameMap[_0x2579a9(0x5a2)]();},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x379)]=function(){const _0x254807=_0x1f220f;this[_0x254807(0x349)]=undefined,this['_pageIndex']=-0x2,this[_0x254807(0x122)]();},Game_Event['prototype']['setupSpawn']=function(_0x8b203a){const _0x473d1e=_0x1f220f,_0x597016=VisuMZ[_0x473d1e(0x141)][_0x473d1e(0x454)][_0x473d1e(0x1e1)],_0x2d160d=_0x8b203a[_0x473d1e(0x5ea)][_0x473d1e(0x38b)]()[_0x473d1e(0x445)](),_0x469fb3=!['',_0x473d1e(0x2d5)][_0x473d1e(0x220)](_0x2d160d);let _0x261a99=0x0,_0x2cf6ed=0x0;if(_0x469fb3){const _0x4d48bd=VisuMZ['EventTemplates'][_0x2d160d];if(!_0x4d48bd)return;_0x261a99=_0x4d48bd[_0x473d1e(0x20f)],_0x2cf6ed=_0x4d48bd[_0x473d1e(0x206)];}else _0x261a99=_0x8b203a[_0x473d1e(0x3be)],_0x2cf6ed=_0x8b203a[_0x473d1e(0x3d6)];if(!this['checkValidEventerMap'](_0x261a99,_0x2cf6ed))return;if(_0x469fb3){if(_0x473d1e(0x23d)==='FXCsK'){const _0x4c3560=VisuMZ[_0x473d1e(0x43b)][_0x2d160d];_0x4c3560['PreSpawnJS'][_0x473d1e(0x58d)](this,_0x261a99,_0x2cf6ed,this);}else{_0x5f102c['ConvertParams'](_0x37f495,_0x36bde7);const _0x1daa8d=_0x2bc7c3[_0x473d1e(0x196)](),_0x41c8cc=_0x2a423e[_0x473d1e(0x102)]||_0x1274c4[_0x473d1e(0x3be)](),_0x3edec6=_0x2f8e87[_0x473d1e(0x312)]||_0x1daa8d[_0x473d1e(0x3d6)](),_0x3bf261=_0x5638b3['PosX']||0x0,_0x4efb89=_0x23234f[_0x473d1e(0x101)]||0x0,_0xc5de3b=_0x199491[_0x473d1e(0x413)]||0x2,_0x2be3ab=((_0xd81d3e[_0x473d1e(0x3a5)]||0x1)-0x1)[_0x473d1e(0x1c5)](0x0,0x13),_0x3c50f2=_0x4c8e22['MoveRouteIndex']||0x0;_0x529c01[_0x473d1e(0x34e)](_0x41c8cc,_0x3edec6,_0x3bf261,_0x4efb89,_0xc5de3b,_0x2be3ab,_0x3c50f2);}}_0x597016['PreSpawnJS'][_0x473d1e(0x58d)](this,_0x261a99,_0x2cf6ed,this),this[_0x473d1e(0x383)]=_0x8b203a,this[_0x473d1e(0x277)]=-0x2,this[_0x473d1e(0x27a)]=$gameMap[_0x473d1e(0x3be)](),this['_eventId']=_0x8b203a[_0x473d1e(0x1e5)],this[_0x473d1e(0x2ca)]=_0x8b203a[_0x473d1e(0x3a9)],this[_0x473d1e(0x5e0)](_0x8b203a['x'],_0x8b203a['y']),this[_0x473d1e(0x392)](_0x8b203a['direction']),this[_0x473d1e(0x122)]();if(_0x469fb3){const _0x49554d=VisuMZ[_0x473d1e(0x43b)][_0x2d160d];if(!_0x49554d)return;_0x49554d['PostSpawnJS'][_0x473d1e(0x58d)](this,_0x261a99,_0x2cf6ed,this);}_0x597016['PostSpawnJS'][_0x473d1e(0x58d)](this,_0x261a99,_0x2cf6ed,this);const _0x233fe9=SceneManager[_0x473d1e(0x567)];if(_0x233fe9&&_0x233fe9[_0x473d1e(0x4ef)])_0x233fe9['_spriteset'][_0x473d1e(0x59c)](this);},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x2ce)]=function(){return!!this['_eventSpawnData'];},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x23b)]=function(){const _0x2154ee=_0x1f220f;if(!this[_0x2154ee(0x52e)]())return;const _0x57ea78=this[_0x2154ee(0x52e)]()[_0x2154ee(0x1ea)](_0x3397cd=>_0x3397cd['code']!==0x6c&&_0x3397cd['code']!==0x198);_0x57ea78[_0x2154ee(0x341)]>0x1&&(this[_0x2154ee(0x14b)]=!![],this['isTriggerIn']([0x0,0x1,0x2])&&this['lock']());},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x54c)]=Game_Event['prototype'][_0x1f220f(0x3cc)],Game_Event['prototype'][_0x1f220f(0x3cc)]=function(){const _0x2e989a=_0x1f220f;VisuMZ[_0x2e989a(0x141)][_0x2e989a(0x54c)][_0x2e989a(0x58d)](this),this['initEventsMoveCoreEffects'](),this['autosaveEventLocation']();},VisuMZ[_0x1f220f(0x141)]['Game_Event_setupPageSettings']=Game_Event['prototype'][_0x1f220f(0x456)],Game_Event[_0x1f220f(0x362)][_0x1f220f(0x456)]=function(){const _0x3de9bb=_0x1f220f;this[_0x3de9bb(0x127)]=!![],VisuMZ['EventsMoveCore'][_0x3de9bb(0x188)]['call'](this),this['setupEventsMoveCoreEffects'](),this[_0x3de9bb(0x4b7)](),this[_0x3de9bb(0x127)]=![];},Game_Event['prototype'][_0x1f220f(0x302)]=function(){const _0x1e62dc=_0x1f220f;if(!this['event']())return;this[_0x1e62dc(0x5ae)](),this[_0x1e62dc(0x5a3)](),this[_0x1e62dc(0xbb)](),this[_0x1e62dc(0x28e)]();},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x5a3)]=function(){const _0x3f070e=_0x1f220f,_0x252017=this[_0x3f070e(0x427)]()['note'];if(_0x252017==='')return;this['checkEventsMoveCoreStringTags'](_0x252017);},Game_Event[_0x1f220f(0x362)]['setupEventsMoveCoreCommentTags']=function(){const _0x48d7a1=_0x1f220f;if(!this[_0x48d7a1(0x5b7)]())return;const _0x46b3cd=this[_0x48d7a1(0x52e)]();let _0x408b16='';for(const _0x5602b4 of _0x46b3cd){if([0x6c,0x198][_0x48d7a1(0x220)](_0x5602b4[_0x48d7a1(0x161)])){if(_0x408b16!=='')_0x408b16+='\x0a';_0x408b16+=_0x5602b4[_0x48d7a1(0x218)][0x0];}}this[_0x48d7a1(0x3f6)](_0x408b16);},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x5ae)]=function(){const _0x31745f=_0x1f220f,_0x1652ac=VisuMZ['EventsMoveCore']['Settings'];this[_0x31745f(0x11d)]={'type':_0x31745f(0x350),'distance':0x0,'regionList':[]},this[_0x31745f(0x3bc)]=![],this[_0x31745f(0x219)](),this[_0x31745f(0x213)]=![],this[_0x31745f(0x3ea)]=![],this[_0x31745f(0x4f0)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x31745f(0xb8)]=$gameSystem['getEventIconData'](this),this[_0x31745f(0x375)]={'originalText':'','text':'','visibleRange':_0x1652ac[_0x31745f(0x40a)][_0x31745f(0x430)],'offsetX':_0x1652ac['Label']['OffsetX'],'offsetY':_0x1652ac['Label']['OffsetY']},this[_0x31745f(0x3b2)]=![],this[_0x31745f(0x4f1)]=[],this[_0x31745f(0x573)]={'target':-0x1,'type':'random','delay':0x1,'opacityDelta':0x0},this[_0x31745f(0xe9)]=_0x1652ac[_0x31745f(0x4c9)]['RandomMoveWeight']??0x0,this[_0x31745f(0x54d)]=![],this[_0x31745f(0x184)]={'visible':!![],'filename':_0x1652ac[_0x31745f(0x4c9)][_0x31745f(0x36a)]},this[_0x31745f(0x2b2)](),this[_0x31745f(0xfd)]();},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x3f6)]=function(_0x204165){const _0x122df5=_0x1f220f;if(_0x204165[_0x122df5(0x4db)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this['_activationProximity'][_0x122df5(0x5fa)]=JSON['parse']('['+RegExp['$1'][_0x122df5(0x4db)](/\d+/g)+']'),this[_0x122df5(0x11d)][_0x122df5(0x2a9)]='region';else _0x204165[_0x122df5(0x4db)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(_0x122df5(0x1ce)!=='uRbyI'?this[_0x122df5(0x35a)][_0x122df5(0x420)][_0x122df5(0x19a)](_0x3f3fe3,this[_0x122df5(0x551)]):(type=String(RegExp['$1'])[_0x122df5(0x552)]()[_0x122df5(0x445)](),this[_0x122df5(0x11d)]['type']=type,this[_0x122df5(0x11d)][_0x122df5(0x34d)]=Number(RegExp['$2'])));if(_0x204165[_0x122df5(0x4db)](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i)){if(_0x122df5(0x2a1)!==_0x122df5(0x2a1)){if(!this[_0x122df5(0x1c3)])return;if(!this[_0x122df5(0x49e)](!![]))return;if(!this[_0x122df5(0x178)](!![]))return;_0x98bdf8[_0x122df5(0x141)]['Game_Event_updateParallel'][_0x122df5(0x58d)](this);}else this['_attachPicture'][_0x122df5(0x234)]=String(RegExp['$1']);}if(_0x204165[_0x122df5(0x4db)](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)){const _0x3cbcae=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x21728d=['NORMAL','ADDITIVE',_0x122df5(0x165),_0x122df5(0x398)];this[_0x122df5(0x131)][_0x122df5(0x261)]=_0x21728d[_0x122df5(0x1f9)](_0x3cbcae)['clamp'](0x0,0x3);}if(_0x204165[_0x122df5(0x4db)](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)){if(_0x122df5(0x146)!=='sDsiz')this[_0x122df5(0x131)][_0x122df5(0x499)]=Number(RegExp['$1']);else{if(this[_0x122df5(0x582)])return;if(_0x573068['isStopFollowerChasing']())return;_0xb847d8[_0x122df5(0x141)]['Game_Follower_chaseCharacter']['call'](this,_0x3d65dc),this[_0x122df5(0xc4)]=!![];}}_0x204165[_0x122df5(0x4db)](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this['_attachPicture'][_0x122df5(0x289)]=Number(RegExp['$1']));_0x204165[_0x122df5(0x4db)](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x122df5(0x447)!==_0x122df5(0x41f)?this[_0x122df5(0x131)][_0x122df5(0x2ae)]=Number(RegExp['$1']):(this[_0x122df5(0x11d)][_0x122df5(0x5fa)]=_0x2c6622[_0x122df5(0x17f)]('['+_0x1cb719['$1']['match'](/\d+/g)+']'),this[_0x122df5(0x11d)][_0x122df5(0x2a9)]=_0x122df5(0x4cb)));_0x204165['match'](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x122df5(0x131)][_0x122df5(0x289)]=Number(RegExp['$1']),this[_0x122df5(0x131)][_0x122df5(0x2ae)]=Number(RegExp['$2']));_0x204165[_0x122df5(0x4db)](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i)&&(this['_attachPicture'][_0x122df5(0x2db)]=Number(RegExp['$1'])*0.01);if(_0x204165[_0x122df5(0x4db)](/<ALWAYS UPDATE MOVEMENT>/i)){if(_0x122df5(0x16e)===_0x122df5(0x522))return _0x23cbab[_0x122df5(0x141)][_0x122df5(0x264)][_0x122df5(0x258)](_0x40cfde['CPC'],0x0);else this[_0x122df5(0x3bc)]=!![];}if(_0x204165[_0x122df5(0x4db)](/<CLICK TRIGGER>/i)){if(_0x122df5(0x223)!=='cbgwu'){if(this[_0x122df5(0x308)]===_0xe3a95a)this[_0x122df5(0x3e5)]();if(!_0x4d8102)return null;if(_0x17e9d7===_0x508cac)return this[_0x122df5(0x308)][_0x122df5(0x2dd)];else{const _0x1caf25=_0x1568ee[_0x122df5(0x141)][_0x122df5(0x454)],_0x12c42b='Map%1-Event%2'[_0x122df5(0x2c0)](_0xa03745[_0x122df5(0x27a)],_0x44f9e9[_0x122df5(0x53b)]);return this['_EventIcons'][_0x12c42b]=this['_EventIcons'][_0x12c42b]||{'iconIndex':0x0,'bufferX':_0x1caf25['Icon'][_0x122df5(0x2e5)],'bufferY':_0x1caf25[_0x122df5(0x5bf)]['BufferY'],'blendMode':_0x1caf25[_0x122df5(0x5bf)][_0x122df5(0x53c)]},this['_EventIcons'][_0x12c42b];}}else this['_clickTrigger']=!![];}_0x204165[_0x122df5(0x4db)](/<CUSTOM Z:[ ](.*?)>/i)&&(_0x122df5(0x231)!==_0x122df5(0x46f)?this[_0x122df5(0x3ea)]=Number(RegExp['$1'])||0x0:this[_0x122df5(0xdf)]=!![]);const _0x41ce9d=_0x204165[_0x122df5(0x4db)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x41ce9d){if(_0x122df5(0x516)===_0x122df5(0x516))for(const _0x289b68 of _0x41ce9d){if(_0x289b68[_0x122df5(0x4db)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){if(_0x122df5(0x4ee)===_0x122df5(0x4ee)){const _0x3efb18=String(RegExp['$1'])[_0x122df5(0x552)]()['trim'](),_0xe3eff5=Number(RegExp['$2']);this[_0x122df5(0x4f0)][_0x3efb18]=_0xe3eff5;}else this[_0x122df5(0x375)][_0x122df5(0x554)]=_0x4b08ba(_0x497278['$1']);}}else{const _0x46f680=_0x4611f1['findTargetSprite'](this);_0x46f680&&_0x46f680['_shadowSprite']&&_0x46f680[_0x122df5(0x353)][_0x122df5(0x156)]!==this[_0x122df5(0x1d0)]()&&(_0x46f680[_0x122df5(0x353)][_0x122df5(0x156)]=this['shadowFilename'](),_0x46f680[_0x122df5(0x353)]['bitmap']=_0x299e44[_0x122df5(0x57c)](_0x46f680['_shadowSprite']['_filename']));}}_0x204165['match'](/<ICON:[ ](\d+)>/i)&&(this[_0x122df5(0xb8)][_0x122df5(0x531)]=Number(RegExp['$1']));_0x204165[_0x122df5(0x4db)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon']['bufferX']=Number(RegExp['$1']));_0x204165[_0x122df5(0x4db)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x122df5(0xb8)][_0x122df5(0x12a)]=Number(RegExp['$1']));_0x204165[_0x122df5(0x4db)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x122df5(0xb8)][_0x122df5(0x331)]=Number(RegExp['$1']),this[_0x122df5(0xb8)][_0x122df5(0x12a)]=Number(RegExp['$2']));if(_0x204165[_0x122df5(0x4db)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x4a3352=String(RegExp['$1'])[_0x122df5(0x38b)]()[_0x122df5(0x445)](),_0x40a814=['NORMAL',_0x122df5(0x3f8),_0x122df5(0x165),'SCREEN'];this[_0x122df5(0xb8)][_0x122df5(0x261)]=_0x40a814[_0x122df5(0x1f9)](_0x4a3352)[_0x122df5(0x1c5)](0x0,0x3);}if(_0x204165['match'](/<LABEL:[ ](.*?)>/i)){let _0x5f3184=String(RegExp['$1'])['trim']();this[_0x122df5(0x375)][_0x122df5(0x47e)]=_0x5f3184,this['_labelWindow'][_0x122df5(0x2e4)]=_0x5f3184;}if(_0x204165['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x122df5(0x407)!==_0x122df5(0x483)){let _0x2cb1fb=String(RegExp['$1'])[_0x122df5(0x445)]();this[_0x122df5(0x375)]['text']=_0x2cb1fb,this[_0x122df5(0x375)][_0x122df5(0x2e4)]=_0x2cb1fb;}else this[_0x122df5(0x473)]-=this['opacitySpeed']();}_0x204165[_0x122df5(0x4db)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x122df5(0x289)]=Number(RegExp['$1']));_0x204165[_0x122df5(0x4db)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_labelWindow'][_0x122df5(0x2ae)]=Number(RegExp['$1']));_0x204165['match'](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x122df5(0x2c7)!==_0x122df5(0x481)?(this[_0x122df5(0x375)]['offsetX']=Number(RegExp['$1']),this[_0x122df5(0x375)][_0x122df5(0x2ae)]=Number(RegExp['$2'])):(_0x202052[_0x122df5(0x141)][_0x122df5(0x3b6)][_0x122df5(0x58d)](this,_0x22d6af,_0x499e4c),_0x2e0f1f[_0x122df5(0x141)][_0x122df5(0x454)]['VS8'][_0x122df5(0x504)]&&this[_0x122df5(0x35a)][_0x122df5(0x420)][_0x122df5(0x19a)](_0x59c94c,this[_0x122df5(0x551)])));this[_0x122df5(0x119)]();_0x204165[_0x122df5(0x4db)](/<LABEL RANGE:[ ](\d+)>/i)&&(_0x122df5(0x16d)!==_0x122df5(0x16d)?_0x368f4c[_0x122df5(0x179)](_0x2aea51,!!_0x5b19f1):this[_0x122df5(0x375)][_0x122df5(0x554)]=Number(RegExp['$1']));_0x204165['match'](/<MIRROR SPRITE>/i)&&(this[_0x122df5(0x3b2)]=!![]);if(_0x204165[_0x122df5(0x4db)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){if('PdPnz'===_0x122df5(0x4b2)){const _0x4ede83=JSON[_0x122df5(0x17f)]('['+RegExp['$1'][_0x122df5(0x4db)](/\d+/g)+']');this[_0x122df5(0x4f1)]=this[_0x122df5(0x4f1)][_0x122df5(0x3a7)](_0x4ede83),this[_0x122df5(0x4f1)]['remove'](0x0);}else{if(!this[_0x122df5(0x427)]())return;this[_0x122df5(0x5ae)](),this[_0x122df5(0x5a3)](),this[_0x122df5(0xbb)](),this[_0x122df5(0x28e)]();}}if(_0x204165[_0x122df5(0x4db)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){if('ULjdE'!==_0x122df5(0x3a0)){let _0x5b630c=this['_character'][_0x122df5(0x59a)]();if(this[_0x122df5(0x420)][_0x122df5(0x3b2)]){if(_0x5b630c===0x4)_0x5b630c=0x6;else _0x5b630c===0x6&&(_0x5b630c=0x4);}return(_0x5b630c-0x2)/0x2;}else{const _0x594c64=String(RegExp['$1']);if(_0x594c64[_0x122df5(0x4db)](/PLAYER/i))this[_0x122df5(0x573)]['target']=0x0;else _0x594c64[_0x122df5(0x4db)](/EVENT[ ](\d+)/i)&&(this[_0x122df5(0x573)][_0x122df5(0x1f3)]=Number(RegExp['$1']));}}_0x204165[_0x122df5(0x4db)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x122df5(0x573)][_0x122df5(0x2a9)]=String(RegExp['$1'])[_0x122df5(0x552)]()[_0x122df5(0x445)]());_0x204165['match'](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x122df5(0x573)][_0x122df5(0x103)]=Number(RegExp['$1']));_0x204165['match'](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this[_0x122df5(0x573)]['opacityDelta']=Number(RegExp['$1']));if(_0x204165[_0x122df5(0x4db)](/<TRUE RANDOM MOVE>/i))this[_0x122df5(0xe9)]=0x0;else _0x204165[_0x122df5(0x4db)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x122df5(0xe9)]=Number(RegExp['$1'])||0x0);_0x204165[_0x122df5(0x4db)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocation']=!![]);_0x204165[_0x122df5(0x4db)](/<HIDE SHADOW>/i)&&(_0x122df5(0x43e)!==_0x122df5(0x4fc)?this[_0x122df5(0x184)][_0x122df5(0x198)]=![]:(_0x10282a[_0x122df5(0x141)][_0x122df5(0x3d5)][_0x122df5(0x58d)](this),this['createShadows']()));_0x204165['match'](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x122df5(0x184)]['filename']=String(RegExp['$1']));_0x204165[_0x122df5(0x4db)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x122df5(0x510)]=Number(RegExp['$1']));if(_0x204165['match'](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x122df5(0x56f)!==_0x122df5(0x56f))return!![];else this[_0x122df5(0x309)]=Number(RegExp['$1']);}_0x204165['match'](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x122df5(0x510)]=Number(RegExp['$1']),this['_spriteOffsetY']=Number(RegExp['$2']));if(_0x204165[_0x122df5(0x4db)](/<STEP PATTERN:[ ](.*)>/i)){if('Sodes'===_0x122df5(0x110)){const _0x55e3ae=_0x47f1ca[_0x122df5(0x427)](_0x3a6c7e(_0x42ed23['$1'])),_0x2d1204=this['checkCollisionKeywords'](_0x3adf76);return this[_0x122df5(0x56a)](_0x55e3ae,_0x2d1204);}else this['_stepPattern']=String(RegExp['$1'])['toUpperCase']()[_0x122df5(0x445)]();}},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x119)]=function(){const _0x370cfd=_0x1f220f;$gameTemp[_0x370cfd(0x358)](this),this['_labelWindow'][_0x370cfd(0x47e)]=this['_labelWindow'][_0x370cfd(0x2e4)];for(;;){if(this[_0x370cfd(0x375)][_0x370cfd(0x47e)][_0x370cfd(0x4db)](/\\V\[(\d+)\]/gi))this[_0x370cfd(0x375)][_0x370cfd(0x47e)]=this[_0x370cfd(0x375)][_0x370cfd(0x2e4)][_0x370cfd(0x558)](/\\V\[(\d+)\]/gi,(_0x44814e,_0x41ca33)=>$gameVariables[_0x370cfd(0x40c)](parseInt(_0x41ca33)));else{if(_0x370cfd(0x55d)===_0x370cfd(0x519))return this['moveAwayFromPoint'](_0x1491e1(_0x20a642['$1']),_0x3e2a21(_0x391470['$2']));else break;}}$gameTemp[_0x370cfd(0x328)]();},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x28e)]=function(){this['updateShadowChanges']();},Game_Event['prototype'][_0x1f220f(0x4e4)]=function(){const _0x24784f=_0x1f220f;if(this[_0x24784f(0x3bc)])return!![];return Game_Character['prototype'][_0x24784f(0x4e4)][_0x24784f(0x58d)](this);},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x14a)]=Game_Event[_0x1f220f(0x362)]['updateSelfMovement'],Game_Event['prototype'][_0x1f220f(0x4dc)]=function(){const _0x1a22a2=_0x1f220f;if(this[_0x1a22a2(0x34b)]())return;VisuMZ[_0x1a22a2(0x141)][_0x1a22a2(0x14a)][_0x1a22a2(0x58d)](this),this[_0x1a22a2(0x393)]()&&VisuMZ[_0x1a22a2(0x303)](this['_eventId']);},Game_Event[_0x1f220f(0x362)]['isPreventSelfMovement']=function(){const _0xe9988d=_0x1f220f,_0x3aaaf7=VisuMZ[_0xe9988d(0x141)][_0xe9988d(0x454)][_0xe9988d(0x4c9)];if($gameMap['isEventRunning']()&&_0x3aaaf7[_0xe9988d(0x46d)])return!![];if($gameMessage[_0xe9988d(0x182)]()&&_0x3aaaf7['StopAutoMoveMessages'])return!![];if(!$gameSystem[_0xe9988d(0x4d8)]())return!![];if(this[_0xe9988d(0x46b)]()>=0x0)return!![];if(!SceneManager[_0xe9988d(0x567)][_0xe9988d(0xe1)])return!![];return![];},Game_Event['prototype']['updateShadowChanges']=function(){const _0x2f0a3e=_0x1f220f,_0x153eef=SceneManager[_0x2f0a3e(0x567)][_0x2f0a3e(0x4ef)];if(_0x153eef){const _0x13bdfd=_0x153eef[_0x2f0a3e(0x561)](this);_0x13bdfd&&_0x13bdfd[_0x2f0a3e(0x353)]&&_0x13bdfd[_0x2f0a3e(0x353)][_0x2f0a3e(0x156)]!==this['shadowFilename']()&&(_0x2f0a3e(0x318)!==_0x2f0a3e(0x318)?this[_0x2f0a3e(0x573)][_0x2f0a3e(0x1f3)]=0x0:(_0x13bdfd[_0x2f0a3e(0x353)][_0x2f0a3e(0x156)]=this[_0x2f0a3e(0x1d0)](),_0x13bdfd[_0x2f0a3e(0x353)][_0x2f0a3e(0x121)]=ImageManager[_0x2f0a3e(0x57c)](_0x13bdfd['_shadowSprite'][_0x2f0a3e(0x156)])));}},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x1d0)]=function(){const _0x14c971=_0x1f220f;return this[_0x14c971(0x184)]['filename'];},Game_Event['prototype'][_0x1f220f(0x58b)]=function(){const _0x59c15e=_0x1f220f;if(!this['_shadowGraphic'][_0x59c15e(0x198)])return![];return Game_CharacterBase[_0x59c15e(0x362)][_0x59c15e(0x58b)][_0x59c15e(0x58d)](this);},Game_Event[_0x1f220f(0x362)][_0x1f220f(0xd1)]=function(){const _0x4edfea=_0x1f220f;return this[_0x4edfea(0x375)][_0x4edfea(0x47e)];},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x2ef)]=function(){const _0x96b39e=_0x1f220f;return this[_0x96b39e(0x375)]['visibleRange'];},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x160)]=function(_0x222733,_0x3450d0,_0x5bc7e4){const _0x23b0f6=_0x1f220f;if(this[_0x23b0f6(0x482)]())return this['isMoveOnlyRegionPassable'](_0x222733,_0x3450d0,_0x5bc7e4);if($gameMap[_0x23b0f6(0x574)](_0x222733,_0x3450d0,_0x5bc7e4,_0x23b0f6(0x427)))return!![];if($gameMap[_0x23b0f6(0x124)](_0x222733,_0x3450d0,_0x5bc7e4,_0x23b0f6(0x427)))return![];return Game_Character['prototype']['isMapPassable'][_0x23b0f6(0x58d)](this,_0x222733,_0x3450d0,_0x5bc7e4);},Game_Event['prototype'][_0x1f220f(0x482)]=function(){const _0x585d48=_0x1f220f;if(this[_0x585d48(0x4f1)]===undefined)this[_0x585d48(0x5ae)]();return this['_moveOnlyRegions'][_0x585d48(0x341)]>0x0;},Game_Event['prototype'][_0x1f220f(0xde)]=function(_0x950d49,_0x58eb89,_0x5d2a91){const _0x48c926=_0x1f220f,_0x1d300c=$gameMap[_0x48c926(0x39e)](_0x950d49,_0x5d2a91),_0x54feef=$gameMap[_0x48c926(0x580)](_0x58eb89,_0x5d2a91),_0x2be73b=$gameMap['regionId'](_0x1d300c,_0x54feef);return this[_0x48c926(0x4f1)]['includes'](_0x2be73b);},VisuMZ[_0x1f220f(0x141)]['Game_Event_findProperPageIndex']=Game_Event[_0x1f220f(0x362)][_0x1f220f(0x4bb)],Game_Event[_0x1f220f(0x362)][_0x1f220f(0x4bb)]=function(){const _0x235bc5=_0x1f220f;if(this[_0x235bc5(0x427)]()&&!$gameTemp[_0x235bc5(0x1cb)]()){if(_0x235bc5(0x485)!==_0x235bc5(0x485)){if(!this['checkValidEventerMap'](_0x238007,_0x5b405d))return;const _0x500aa1=_0x1e1457[_0x235bc5(0x141)]['Settings']['Template'];if(!_0x7bcf9f)_0x500aa1['PreMorphJS']['call'](this,_0x2d5122,_0x50a3ec,this);this[_0x235bc5(0x349)]={'mapId':_0x2f6fa3,'eventId':_0xcfdbdb},this['_pageIndex']=-0x2,this[_0x235bc5(0x122)]();if(!_0x4b52a6)_0x500aa1['PostMorphJS']['call'](this,_0x3a7ca9,_0x3dd1db,this);_0x33b4b1[_0x235bc5(0x5a2)]();}else{if(this[_0x235bc5(0x427)]()[_0x235bc5(0x57b)][_0x235bc5(0x4db)](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}}return this['_advancedSwitchVariable']=![],this[_0x235bc5(0x33d)]=![],this[_0x235bc5(0x427)]()?VisuMZ['EventsMoveCore'][_0x235bc5(0x49a)][_0x235bc5(0x58d)](this):-0x1;},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x593)]=Game_Event['prototype']['meetsConditions'],Game_Event[_0x1f220f(0x362)][_0x1f220f(0x2be)]=function(_0x4e8a1e){const _0x1b6c50=_0x1f220f;this[_0x1b6c50(0x5bb)](_0x4e8a1e),$gameTemp[_0x1b6c50(0x358)](this);const _0x20612f=VisuMZ[_0x1b6c50(0x141)][_0x1b6c50(0x593)]['call'](this,_0x4e8a1e);return $gameTemp[_0x1b6c50(0x328)](),_0x20612f;},Game_Event[_0x1f220f(0x362)][_0x1f220f(0xf3)]=function(){const _0x1f7a8a=_0x1f220f;return this[_0x1f7a8a(0xdf)];},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x5bb)]=function(_0x5eaf17){const _0x1d6f42=_0x1f220f,_0xfd473b=_0x5eaf17[_0x1d6f42(0x2a6)];if(_0xfd473b[_0x1d6f42(0x226)]&&DataManager['isAdvancedSwitch'](_0xfd473b[_0x1d6f42(0x254)])){if(_0x1d6f42(0x224)!==_0x1d6f42(0x1ab))this[_0x1d6f42(0xdf)]=!![];else{const _0xae01d=_0x5b941b[_0x1d6f42(0x423)](_0x2caa75,_0x2e1796);for(const _0x5dd9c1 of _0xae01d){if(_0x5dd9c1&&_0x5dd9c1[_0x1d6f42(0x248)]())return _0x5dd9c1[_0x1d6f42(0x2b1)](),!![];}return _0x2d4357['isLongPressed']()&&_0xae01d[_0x1d6f42(0x341)]>0x0&&_0x1f15c5['clear'](),![];}}else{if(_0xfd473b[_0x1d6f42(0x588)]&&DataManager[_0x1d6f42(0x3e2)](_0xfd473b[_0x1d6f42(0x225)]))this['_advancedSwitchVariable']=!![];else{if(_0xfd473b[_0x1d6f42(0x38c)]&&DataManager['isAdvancedVariable'](_0xfd473b[_0x1d6f42(0x324)])){if(_0x1d6f42(0x1d1)!==_0x1d6f42(0x1d1))return this[_0x1d6f42(0x448)]();else this[_0x1d6f42(0xdf)]=!![];}}}},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x248)]=function(){const _0x33de2c=_0x1f220f;if(this[_0x33de2c(0x37e)])return![];return this['_clickTrigger'];},Game_Event[_0x1f220f(0x362)]['onClickTrigger']=function(){const _0x309458=_0x1f220f;$gameTemp['clearDestination'](),this[_0x309458(0x23b)]();},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x568)]=function(_0x1dc35b,_0x531840){const _0x34f5a4=_0x1f220f;if(this[_0x34f5a4(0x4f0)]){if(_0x34f5a4(0x4da)===_0x34f5a4(0x4da))return this[_0x34f5a4(0x2c6)](_0x1dc35b,_0x531840);else{if(_0x5536ea[_0x34f5a4(0x27b)]())return!![];return this[_0x34f5a4(0x54d)];}}else return Game_Character[_0x34f5a4(0x362)]['pos'][_0x34f5a4(0x58d)](this,_0x1dc35b,_0x531840);},Game_Event[_0x1f220f(0x362)]['posEventsMoveCore']=function(_0xef99fb,_0x157bc7){const _0x4648cb=_0x1f220f;var _0x55ebbb=this['x']-this[_0x4648cb(0x4f0)]['left'],_0x2e31d1=this['x']+this['_addedHitbox'][_0x4648cb(0x525)],_0x431584=this['y']-this[_0x4648cb(0x4f0)]['up'],_0x54b77e=this['y']+this['_addedHitbox']['down'];return _0x55ebbb<=_0xef99fb&&_0xef99fb<=_0x2e31d1&&_0x431584<=_0x157bc7&&_0x157bc7<=_0x54b77e;},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x158)]=function(_0x440505,_0x26ecec,_0x20f0a7){const _0x37476b=_0x1f220f;for(let _0x2de04b=-this[_0x37476b(0x4f0)][_0x37476b(0x148)];_0x2de04b<=this['_addedHitbox'][_0x37476b(0x525)];_0x2de04b++){for(let _0x3426c9=-this[_0x37476b(0x4f0)]['up'];_0x3426c9<=this[_0x37476b(0x4f0)][_0x37476b(0x1c4)];_0x3426c9++){if(!Game_Character[_0x37476b(0x362)][_0x37476b(0x158)][_0x37476b(0x58d)](this,_0x440505+_0x2de04b,_0x26ecec+_0x3426c9,_0x20f0a7)){if('riIpS'!=='poshN')return![];else _0x367844[_0x37476b(0x21c)]([this],_0x3bd8bc);}}}return!![];},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x3d4)]=function(_0xe9e58b,_0xeeef30){const _0x18524a=_0x1f220f;if(Imported['VisuMZ_0_CoreEngine']&&this[_0x18524a(0x1c6)]()){if(_0x18524a(0x3f7)==='Zcyhh')_0x12974e[_0x18524a(0x321)](_0x18524a(0x286)[_0x18524a(0x2c0)](_0x26f952));else return this[_0x18524a(0x4e5)](_0xe9e58b,_0xeeef30);}else{const _0x1aa073=$gameMap[_0x18524a(0x208)](_0xe9e58b,_0xeeef30)['filter'](_0x48207e=>_0x48207e!==this);return _0x1aa073[_0x18524a(0x341)]>0x0;}},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x4e5)]=function(_0x20791b,_0xe55afb){const _0x12ee56=_0x1f220f;if(!this[_0x12ee56(0x111)]())return![];else{if('jebxu'===_0x12ee56(0x123)){const _0x5924c4=$gameMap['eventsXyNt'](_0x20791b,_0xe55afb)[_0x12ee56(0x1ea)](_0x341f49=>_0x341f49!==this&&_0x341f49[_0x12ee56(0x111)]());return _0x5924c4[_0x12ee56(0x341)]>0x0;}else{_0x226785[_0x12ee56(0x239)](_0x33d861,_0x4ed13b);const _0x285339=_0x552d50[_0x12ee56(0x196)]();_0x5ba74e[_0x12ee56(0x102)]=_0x5607a3[_0x12ee56(0x102)]||_0x3a02f2[_0x12ee56(0x3be)]();const _0x4458dc=[_0x19a28e['MapId'],_0x4f21f9[_0x12ee56(0x312)]||_0x285339[_0x12ee56(0x3d6)](),_0x29660[_0x12ee56(0x5d4)]],_0x3b0abe=_0x247f3b[_0x12ee56(0x408)],_0x15f842=_0xbb3478['value'](_0x4458dc)||![];_0x3701f1[_0x12ee56(0x179)](_0x3b0abe,_0x15f842);}}},Game_Event[_0x1f220f(0x362)]['activationProximityType']=function(){const _0x7537c6=_0x1f220f;return this[_0x7537c6(0x11d)][_0x7537c6(0x2a9)]||_0x7537c6(0x350);},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x138)]=function(){const _0x5528aa=_0x1f220f;return this[_0x5528aa(0x11d)][_0x5528aa(0x34d)]||0x0;},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x1ef)]=function(){const _0x136095=_0x1f220f;return this[_0x136095(0x11d)][_0x136095(0x5fa)]||[];},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x35b)]=function(){const _0x572e39=_0x1f220f;Game_Character[_0x572e39(0x362)]['increaseSteps'][_0x572e39(0x58d)](this);if([_0x572e39(0x350),_0x572e39(0x4cb)][_0x572e39(0x220)](this[_0x572e39(0x426)]()))return;$gamePlayer[_0x572e39(0x232)]([0x2]);},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x228)]=Game_Event[_0x1f220f(0x362)][_0x1f220f(0x1d8)],Game_Event[_0x1f220f(0x362)][_0x1f220f(0x1d8)]=function(){const _0x217315=_0x1f220f;if(this[_0x217315(0x365)]!==0x3)return;if(this[_0x217315(0x127)])return;if(!this['checkRegionEventTrigger'](![]))return;if(!this[_0x217315(0x178)](![]))return;VisuMZ['EventsMoveCore']['Game_Event_checkEventTriggerAuto'][_0x217315(0x58d)](this);},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x1aa)]=Game_Event['prototype'][_0x1f220f(0x5b3)],Game_Event[_0x1f220f(0x362)][_0x1f220f(0x5b3)]=function(){const _0x1b6e39=_0x1f220f;if(!this['_interpreter'])return;if(!this[_0x1b6e39(0x49e)](!![]))return;if(!this['checkActivationProximity'](!![]))return;VisuMZ[_0x1b6e39(0x141)]['Game_Event_updateParallel'][_0x1b6e39(0x58d)](this);},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x49e)]=function(_0x5292bf){const _0x26bdc0=_0x1f220f;if(!_0x5292bf&&$gameMap[_0x26bdc0(0x39b)]())return![];if(!_0x5292bf&&$gameMap['isAnyEventStarting']())return![];if(this[_0x26bdc0(0x1ef)]()<=0x0)return!![];return $gamePlayer[_0x26bdc0(0x5a0)](this);},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x178)]=function(_0xd2630e){const _0x496cd2=_0x1f220f;if(!_0xd2630e&&$gameMap['isEventRunning']())return![];if(!_0xd2630e&&$gameMap[_0x496cd2(0x33b)]())return![];if([_0x496cd2(0x350),_0x496cd2(0x4cb)]['includes'](this[_0x496cd2(0x426)]()))return!![];return $gamePlayer[_0x496cd2(0x4b0)](this);},VisuMZ[_0x1f220f(0x303)]=function(_0x7c24a2){const _0x4ec583=_0x1f220f;for(const _0x53e115 of $gameMap[_0x4ec583(0x275)]()){if(!_0x53e115)continue;if(_0x53e115[_0x4ec583(0x46b)]()===_0x7c24a2){if(_0x4ec583(0x3d3)===_0x4ec583(0x260)){const _0x392a73=_0x4a1a8e[_0x4ec583(0x187)](this['_seconds']/0x3c/0x3c),_0x408880=_0x530bad['floor'](this[_0x4ec583(0x397)]/0x3c)%0x3c,_0x16e37b=this[_0x4ec583(0x397)]%0x3c;let _0x5aac08=_0x408880[_0x4ec583(0x145)](0x2)+':'+_0x16e37b[_0x4ec583(0x145)](0x2);if(_0x392a73>0x0)_0x5aac08=_0x4ec583(0x3dc)[_0x4ec583(0x2c0)](_0x392a73,_0x5aac08);return _0x5aac08;}else _0x53e115[_0x4ec583(0x347)]();}}},VisuMZ[_0x1f220f(0x487)]=function(_0x361af3){if(_0x361af3===0x0)return $gamePlayer;return $gameMap['event'](_0x361af3);},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x46b)]=function(){const _0x4de270=_0x1f220f;return this[_0x4de270(0x573)]['target'];},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x35e)]=function(){const _0x16f576=_0x1f220f;return this[_0x16f576(0x573)][_0x16f576(0x2a9)];},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x3af)]=function(){const _0x11466c=_0x1f220f;if(this['moveSynchTarget']()>=0x0){if(_0x11466c(0x42c)===_0x11466c(0x436))_0x5818af=this[_0x11466c(0x599)](_0x6bb04d,_0x4d7e16);else{const _0x3ee70e=VisuMZ[_0x11466c(0x487)](this[_0x11466c(0x46b)]());if(_0x3ee70e)return _0x3ee70e['realMoveSpeed']();}}return Game_Character[_0x11466c(0x362)][_0x11466c(0x3af)][_0x11466c(0x58d)](this);},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x347)]=function(){const _0x10fc1e=_0x1f220f;this[_0x10fc1e(0x573)]['timer']=this[_0x10fc1e(0x573)][_0x10fc1e(0x1d4)]||0x0,this[_0x10fc1e(0x573)][_0x10fc1e(0x1d4)]--;if(this[_0x10fc1e(0x573)][_0x10fc1e(0x1d4)]>0x0)return;this[_0x10fc1e(0x573)][_0x10fc1e(0x1d4)]=this[_0x10fc1e(0x573)][_0x10fc1e(0x103)],this[_0x10fc1e(0x147)]();},Game_Event[_0x1f220f(0x362)]['adjustMoveSynchOpacityDelta']=function(_0x4fecbf){const _0x4e0ef9=_0x1f220f;if(this[_0x4e0ef9(0x46b)]()>=0x0){const _0x554112=VisuMZ['GetMoveSynchTarget'](this[_0x4e0ef9(0x46b)]());if(_0x554112){if('BtNOK'===_0x4e0ef9(0x28c)){if(this[_0x4e0ef9(0x2a4)]())return![];if(this[_0x4e0ef9(0xbf)])return![];if(this[_0x4e0ef9(0x28a)]==='')return![];if(this[_0x4e0ef9(0x2a0)]===_0x235a4d)return![];if(this[_0x4e0ef9(0x1bb)]())return![];return!![];}else{const _0x5de80a=$gameMap[_0x4e0ef9(0x34d)](this['_realX'],this[_0x4e0ef9(0x2d2)],_0x554112[_0x4e0ef9(0x2c4)],_0x554112['_realY'])-0x1,_0x14a800=Math['min']($gameMap[_0x4e0ef9(0x13a)](),$gameMap['tileHeight']()),_0x988f9f=this[_0x4e0ef9(0x573)]['opacityDelta']||0x0;_0x4fecbf-=Math[_0x4e0ef9(0x280)](0x0,_0x5de80a)*_0x14a800*_0x988f9f;}}}return _0x4fecbf;},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x147)]=function(){const _0x30df55=_0x1f220f;switch(this[_0x30df55(0x35e)]()){case _0x30df55(0x4eb):this['processMoveSynchRandom']();break;case _0x30df55(0x3e0):this[_0x30df55(0x1bd)]();break;case _0x30df55(0x172):this[_0x30df55(0x2e7)]();break;case _0x30df55(0xe7):this[_0x30df55(0x22a)]();break;case _0x30df55(0x5f3):case'copy':this[_0x30df55(0x41b)]();break;case _0x30df55(0x56b):case _0x30df55(0x1af):this[_0x30df55(0x36d)]();break;case _0x30df55(0x4d4):case _0x30df55(0x46c):case _0x30df55(0x106):case _0x30df55(0x192):this[_0x30df55(0x469)]();break;case _0x30df55(0x4e2):case _0x30df55(0x463):case'mirror\x20vert':case _0x30df55(0x2bd):this[_0x30df55(0x51d)]();break;default:this[_0x30df55(0x384)]();break;}this[_0x30df55(0x2c5)]();},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x384)]=function(){const _0x1eeab3=_0x1f220f,_0xf6cf93=[0x2,0x4,0x6,0x8];$gameMap[_0x1eeab3(0x2a2)]()&&_0xf6cf93[_0x1eeab3(0x57e)](0x1,0x3,0x7,0x9);const _0x2e0872=[];for(const _0x4b28c9 of _0xf6cf93){if(this['canPass'](this['x'],this['y'],_0x4b28c9))_0x2e0872[_0x1eeab3(0x57e)](_0x4b28c9);}if(_0x2e0872[_0x1eeab3(0x341)]>0x0){const _0x429671=_0x2e0872[Math[_0x1eeab3(0x5bd)](_0x2e0872[_0x1eeab3(0x341)])];this[_0x1eeab3(0x52b)](_0x429671);}},Game_Event['prototype'][_0x1f220f(0x1bd)]=function(){const _0x164e7b=_0x1f220f,_0x10ce8c=VisuMZ[_0x164e7b(0x487)](this[_0x164e7b(0x46b)]());this[_0x164e7b(0x11a)](_0x10ce8c);},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x2e7)]=function(){const _0x165e2d=_0x1f220f,_0x309082=VisuMZ[_0x165e2d(0x487)](this[_0x165e2d(0x46b)]());this['moveAwayFromCharacter'](_0x309082);},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x22a)]=function(){const _0xc5b396=_0x1f220f;this[_0xc5b396(0x2fc)]();},Game_Event['prototype'][_0x1f220f(0x41b)]=function(){const _0x1fda6e=_0x1f220f,_0x3a3150=VisuMZ[_0x1fda6e(0x487)](this['moveSynchTarget']());this[_0x1fda6e(0x52b)](_0x3a3150[_0x1fda6e(0x581)]());},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x36d)]=function(){const _0x5eccf1=_0x1f220f,_0x5bc285=VisuMZ['GetMoveSynchTarget'](this[_0x5eccf1(0x46b)]());this[_0x5eccf1(0x52b)](this[_0x5eccf1(0x42e)](_0x5bc285['lastMovedDirection']()));},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x469)]=function(){const _0x13abf6=_0x1f220f,_0x3da80b=VisuMZ[_0x13abf6(0x487)](this[_0x13abf6(0x46b)]()),_0x20f3e9=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x3da80b[_0x13abf6(0x581)]()];this[_0x13abf6(0x52b)](_0x20f3e9);},Game_Event[_0x1f220f(0x362)]['processMoveSynchMirrorVert']=function(){const _0x469b7f=_0x1f220f,_0x5b9059=VisuMZ[_0x469b7f(0x487)](this[_0x469b7f(0x46b)]()),_0x3b6cf8=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x5b9059[_0x469b7f(0x581)]()];this[_0x469b7f(0x52b)](_0x3b6cf8);},Game_Event['prototype'][_0x1f220f(0x4d9)]=function(){const _0x2d254e=_0x1f220f,_0x31e631=$gameSystem['getSavedEventLocation'](this);if(!_0x31e631)return;this[_0x2d254e(0x1f8)](_0x31e631['x'],_0x31e631['y']),this[_0x2d254e(0x5cb)](),this[_0x2d254e(0x392)](_0x31e631['direction']),this['_pageIndex']===_0x31e631['pageIndex']&&('bBxwU'!==_0x2d254e(0x3b8)?this[_0x2d254e(0xb8)]['bufferX']=_0x1a7bd5(_0x1250dd['$1']):this[_0x2d254e(0x185)]=_0x31e631[_0x2d254e(0x1d2)]);},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x284)]=Game_Event[_0x1f220f(0x362)][_0x1f220f(0x2c5)],Game_Event[_0x1f220f(0x362)][_0x1f220f(0x2c5)]=function(){const _0x104344=_0x1f220f;VisuMZ[_0x104344(0x141)][_0x104344(0x284)][_0x104344(0x58d)](this),this['updateSaveEventLocation']();},Game_Event[_0x1f220f(0x362)]['updateMove']=function(){const _0x5dc7f9=_0x1f220f;Game_Character[_0x5dc7f9(0x362)][_0x5dc7f9(0x374)][_0x5dc7f9(0x58d)](this),this[_0x5dc7f9(0x4b7)]();},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x435)]=function(){const _0x253a83=_0x1f220f;if($gameMap[_0x253a83(0x27b)]())return!![];return this[_0x253a83(0x54d)];},Game_Event['prototype'][_0x1f220f(0x4b7)]=function(){const _0x4fa530=_0x1f220f;if(!this[_0x4fa530(0x435)]())return;this[_0x4fa530(0x3a1)]();},Game_Event[_0x1f220f(0x362)]['saveEventLocation']=function(){const _0x77fec4=_0x1f220f;this[_0x77fec4(0x15c)]=!![];},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x22f)]=function(){const _0xeb508b=_0x1f220f;this['_requestSaveEventLocation']&&('zspWE'!=='zspWE'?(this[_0xeb508b(0x16a)][_0x2a47e9]=_0x58097b[0x2][_0xeb508b(0x4db)](/VAR/i)?_0x29076d:!!_0x31387c,this['onChange']()):this[_0xeb508b(0x3da)]());},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x3da)]=function(){const _0x38912d=_0x1f220f;this[_0x38912d(0x15c)]=![],$gameSystem[_0x38912d(0x3a1)](this);},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x39c)]=function(){const _0x1f1e11=_0x1f220f;$gameSystem[_0x1f1e11(0x1ae)](this);},Game_Event['prototype']['getEventIconData']=function(){const _0x22fd33=_0x1f220f;if($gameSystem['getEventIconData'](this)){if('swoWv'!==_0x22fd33(0x253))return Game_Character[_0x22fd33(0x362)][_0x22fd33(0x1d9)]['call'](this);else{if(_0x117cc8['isPlayerForceShown']())return![];if(_0x11464a['isPlayerForceHidden']())return!![];}}else return{'iconIndex':0x0,'bufferX':settings[_0x22fd33(0x5bf)][_0x22fd33(0x2e5)],'bufferY':settings[_0x22fd33(0x5bf)][_0x22fd33(0xd7)],'blendMode':settings['Icon']['BlendMode']};},Game_Event['prototype'][_0x1f220f(0x2e8)]=function(){const _0x317496=_0x1f220f;return this[_0x317496(0x33d)];},VisuMZ[_0x1f220f(0x141)]['Game_Event_meetsConditionsCPC']=Game_Event[_0x1f220f(0x362)][_0x1f220f(0x2be)],Game_Event[_0x1f220f(0x362)]['meetsConditions']=function(_0x5c0db9){const _0x26848c=_0x1f220f,_0x24c2e2=VisuMZ['EventsMoveCore'][_0x26848c(0x339)][_0x26848c(0x58d)](this,_0x5c0db9);if(!_0x24c2e2)return![];return this[_0x26848c(0x52f)](_0x5c0db9);},Game_Event[_0x1f220f(0x362)][_0x1f220f(0x52f)]=function(_0x261eab){const _0x24533b=_0x1f220f;VisuMZ[_0x24533b(0x141)]['CustomPageConditions'][_0x24533b(0x20e)](_0x261eab),this[_0x24533b(0x33d)]=_0x261eab['CPC']['length']>0x0;_0x261eab[_0x24533b(0x262)]===undefined&&VisuMZ['EventsMoveCore'][_0x24533b(0x264)][_0x24533b(0x20e)](_0x261eab);if(_0x261eab[_0x24533b(0x262)][_0x24533b(0x341)]>0x0)return $gameMap[_0x24533b(0x427)](this['_eventId'])&&VisuMZ[_0x24533b(0x141)][_0x24533b(0x264)][_0x24533b(0x258)](_0x261eab[_0x24533b(0x262)],this[_0x24533b(0x53b)]);return!![];},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x1cd)]=Game_Troop[_0x1f220f(0x362)]['meetsConditions'],Game_Troop[_0x1f220f(0x362)][_0x1f220f(0x2be)]=function(_0x3566e5){const _0x127887=_0x1f220f;var _0xa0c219=VisuMZ[_0x127887(0x141)][_0x127887(0x1cd)][_0x127887(0x58d)](this,_0x3566e5);return _0xa0c219&&this[_0x127887(0x28f)](_0x3566e5);},Game_Troop[_0x1f220f(0x362)][_0x1f220f(0x28f)]=function(_0x5517a9){const _0x5aeafb=_0x1f220f;_0x5517a9['CPC']===undefined&&VisuMZ['EventsMoveCore'][_0x5aeafb(0x264)][_0x5aeafb(0x20e)](_0x5517a9);if(_0x5517a9['CPC'][_0x5aeafb(0x341)]>0x0){if(_0x5aeafb(0x2b0)===_0x5aeafb(0x2b0))return VisuMZ[_0x5aeafb(0x141)][_0x5aeafb(0x264)]['metCPC'](_0x5517a9[_0x5aeafb(0x262)],0x0);else{const _0x5905d0=this['_proxyWindow'][_0x5aeafb(0x1ff)]();this[_0x5aeafb(0x17b)][_0x5aeafb(0x5f9)](this[_0x5aeafb(0x44b)],_0x5905d0,0x0);}}return!![];},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x1e3)]=Game_Event[_0x1f220f(0x362)][_0x1f220f(0x5e0)],Game_Event[_0x1f220f(0x362)][_0x1f220f(0x5e0)]=function(_0xe384b5,_0x1b53cc){const _0x4a2a2f=_0x1f220f;VisuMZ['EventsMoveCore'][_0x4a2a2f(0x1e3)]['call'](this,_0xe384b5,_0x1b53cc),this[_0x4a2a2f(0x18c)]=_0xe384b5,this['_randomHomeY']=_0x1b53cc,this[_0x4a2a2f(0x4b7)]();},VisuMZ[_0x1f220f(0x141)]['Game_Event_moveTypeRandom']=Game_Event['prototype'][_0x1f220f(0x320)],Game_Event[_0x1f220f(0x362)]['moveTypeRandom']=function(){const _0x2e576a=_0x1f220f,_0x495dda=$gameMap[_0x2e576a(0x34d)](this['x'],this['y'],this[_0x2e576a(0x18c)],this[_0x2e576a(0x5e9)]),_0x224f99=_0x495dda*(this[_0x2e576a(0xe9)]||0x0);Math[_0x2e576a(0x4eb)]()>=_0x224f99?VisuMZ[_0x2e576a(0x141)][_0x2e576a(0x5ca)][_0x2e576a(0x58d)](this):this[_0x2e576a(0x23f)]();},Game_Event[_0x1f220f(0x362)]['moveBackToRandomHome']=function(){const _0x398234=_0x1f220f,_0x346133=this[_0x398234(0x402)](this['_randomHomeX']),_0x42c2a4=this[_0x398234(0x270)](this[_0x398234(0x5e9)]);if(Math['abs'](_0x346133)>Math[_0x398234(0x16c)](_0x42c2a4))this[_0x398234(0x1eb)](_0x346133>0x0?0x4:0x6),!this[_0x398234(0x323)]()&&_0x42c2a4!==0x0&&this['moveStraight'](_0x42c2a4>0x0?0x8:0x2);else _0x42c2a4!==0x0&&('kqcqW'===_0x398234(0x479)?(this[_0x398234(0x1eb)](_0x42c2a4>0x0?0x8:0x2),!this[_0x398234(0x323)]()&&_0x346133!==0x0&&this[_0x398234(0x1eb)](_0x346133>0x0?0x4:0x6)):this[_0x398234(0x1eb)](_0x21ba8d>0x0?0x8:0x2));},Game_CharacterBase['prototype']['clearAttachPictureSettings']=function(){const _0x2cbd5d=_0x1f220f;this[_0x2cbd5d(0x131)]={'filename':'','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x116)]=function(){const _0x677f4a=_0x1f220f;if(this['_attachPicture']===undefined)this[_0x677f4a(0x219)]();return this['_attachPicture'];},Game_CharacterBase['prototype']['attachPictureFilename']=function(){const _0x135f80=_0x1f220f;return this[_0x135f80(0x116)]()[_0x135f80(0x234)]??'';},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x4c0)]=function(){const _0x1f2722=_0x1f220f;return this['attachPictureSettings']()[_0x1f2722(0x261)]??0x0;},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0xd0)]=function(){const _0x366f25=_0x1f220f;return this[_0x366f25(0x116)]()[_0x366f25(0x499)]??0x0;},Game_CharacterBase[_0x1f220f(0x362)][_0x1f220f(0x202)]=function(){const _0x2fd604=_0x1f220f;return this[_0x2fd604(0x116)]()[_0x2fd604(0x289)]??0x0;},Game_CharacterBase[_0x1f220f(0x362)]['attachPictureOffsetY']=function(){const _0xd61825=_0x1f220f;return this[_0xd61825(0x116)]()[_0xd61825(0x2ae)]??0x0;},Game_CharacterBase[_0x1f220f(0x362)]['attachPictureScale']=function(){const _0x5784e5=_0x1f220f;return this[_0x5784e5(0x116)]()[_0x5784e5(0x2db)]??0x1;},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x4dd)]=Game_Interpreter['prototype'][_0x1f220f(0x34f)],Game_Interpreter[_0x1f220f(0x362)]['updateWaitMode']=function(){const _0x254d63=_0x1f220f;if(this[_0x254d63(0x2e6)]==='CallEvent'){if(window[this[_0x254d63(0x25f)]])this[_0x254d63(0x2e6)]='',this[_0x254d63(0x14e)]();else return!![];}else return VisuMZ[_0x254d63(0x141)][_0x254d63(0x4dd)]['call'](this);},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x170)]=Game_Interpreter[_0x1f220f(0x362)][_0x1f220f(0x4f6)],Game_Interpreter[_0x1f220f(0x362)][_0x1f220f(0x4f6)]=function(){const _0x3ecf30=_0x1f220f,_0x2d4f7c=$gameMap&&this[_0x3ecf30(0x53b)]?$gameMap['event'](this[_0x3ecf30(0x53b)]):null;$gameTemp['registerSelfTarget'](_0x2d4f7c);const _0x578754=VisuMZ[_0x3ecf30(0x141)][_0x3ecf30(0x170)][_0x3ecf30(0x58d)](this);return $gameTemp[_0x3ecf30(0x328)](),_0x578754;},VisuMZ[_0x1f220f(0x141)]['Game_Interpreter_PluginCommand']=Game_Interpreter['prototype']['command357'],Game_Interpreter['prototype'][_0x1f220f(0xfe)]=function(_0x28523f){const _0x363135=_0x1f220f;return $gameTemp[_0x363135(0x4f7)](this),VisuMZ['EventsMoveCore'][_0x363135(0x1a6)][_0x363135(0x58d)](this,_0x28523f);},Game_Interpreter[_0x1f220f(0x362)][_0x1f220f(0x58f)]=function(_0x297d41){const _0x253d26=_0x1f220f;this[_0x253d26(0x251)]=_0x297d41;const _0x3c800c=_0x253d26(0x296)['format'](_0x297d41[_0x253d26(0x3be)][_0x253d26(0x145)](0x3));this[_0x253d26(0x25f)]='$callEventMap'+Graphics[_0x253d26(0x1e8)]+'_'+this['eventId'](),DataManager[_0x253d26(0x24e)](this['_callEventMap'],_0x3c800c);if(window[this[_0x253d26(0x25f)]]){if(_0x253d26(0x478)!=='IeOEB'){if(!_0x2d6a99[_0x253d26(0x567)])return;if(!_0x5f0318[_0x253d26(0x567)]['_spriteset'])return;const _0x2f2229=_0x27240c['_scene'][_0x253d26(0x4ef)][_0x253d26(0x561)](this[_0x253d26(0x5c8)]);if(!_0x2f2229)return;this['x']=this[_0x253d26(0x5c8)][_0x253d26(0x3f9)](),this['x']+=this['_event']['_labelWindow'][_0x253d26(0x289)],this['y']=this[_0x253d26(0x5c8)][_0x253d26(0x130)]()-_0x2f2229[_0x253d26(0x405)],this['y']+=_0x19857d[_0x253d26(0x55f)]()*-0.5,this['y']+=this[_0x253d26(0x5c8)][_0x253d26(0x375)][_0x253d26(0x2ae)];}else this[_0x253d26(0x14e)]();}else this[_0x253d26(0x5b6)](_0x253d26(0x39d));},Game_Interpreter[_0x1f220f(0x362)][_0x1f220f(0x14e)]=function(){const _0x4ad89d=_0x1f220f,_0x428118=this[_0x4ad89d(0x251)],_0x2cabe4=window[this[_0x4ad89d(0x25f)]],_0x1b2489=_0x2cabe4[_0x4ad89d(0x275)][_0x428118[_0x4ad89d(0x3d6)]];if(_0x1b2489&&_0x1b2489[_0x4ad89d(0x1da)][_0x428118[_0x4ad89d(0x177)]-0x1]){if(_0x4ad89d(0x4cf)!==_0x4ad89d(0x4cf)){_0x17fcb4['EventsMoveCore'][_0x4ad89d(0x152)][_0x4ad89d(0x58d)](this,_0x154618);if(this[_0x4ad89d(0x216)]()){this['checkEventTriggerEventsMoveCore'](_0x428506);if(_0x3e206f[_0x4ad89d(0x220)](0x0)&&this['startMapCommonEventOnOKTarget']()===_0x4ad89d(0x1ec))this[_0x4ad89d(0x4d2)](this['x'],this['y']);else(_0xa13ef8[_0x4ad89d(0x220)](0x1)||_0xa9c06d['includes'](0x2))&&this[_0x4ad89d(0x2ec)]();}}else{const _0x174998=_0x1b2489['pages'][_0x428118['pageId']-0x1]['list'];this[_0x4ad89d(0x50f)](_0x174998,this[_0x4ad89d(0x3d6)]());}}window[this[_0x4ad89d(0x25f)]]=undefined,this[_0x4ad89d(0x25f)]=undefined,this[_0x4ad89d(0x251)]=undefined;};function Game_CPCInterpreter(){const _0x57e68a=_0x1f220f;this['initialize'][_0x57e68a(0x2b7)](this,arguments);};Game_CPCInterpreter[_0x1f220f(0x362)]=Object[_0x1f220f(0x4af)](Game_Interpreter[_0x1f220f(0x362)]),Game_CPCInterpreter[_0x1f220f(0x362)][_0x1f220f(0x2a0)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x1f220f(0x362)]['clear']=function(){const _0x2ad7e8=_0x1f220f;Game_Interpreter[_0x2ad7e8(0x362)][_0x2ad7e8(0xca)]['call'](this),this[_0x2ad7e8(0x217)]=![];},Game_CPCInterpreter['prototype']['execute']=function(){const _0x134fe4=_0x1f220f;while(this[_0x134fe4(0xc9)]()){this[_0x134fe4(0x4f6)]();}},Game_CPCInterpreter[_0x1f220f(0x362)][_0x1f220f(0x212)]=function(_0x41a08d){const _0x4c9b16=_0x1f220f;while(this[_0x4c9b16(0xc9)]()){if(_0x4c9b16(0x411)===_0x4c9b16(0x411))this['executeCommandCommonEvent'](_0x41a08d);else{const _0x3e99df=this[_0x4c9b16(0x42e)](this[_0x4c9b16(0x59a)]());return _0x5f4564[_0x4c9b16(0x39e)](this['x'],_0x3e99df);}}},Game_CPCInterpreter[_0x1f220f(0x362)][_0x1f220f(0x462)]=function(_0x20be6e){const _0x2c7def=_0x1f220f,_0x5e3346=_0x20be6e;$gameTemp['registerSelfTarget'](_0x5e3346);const _0x97e495=VisuMZ[_0x2c7def(0x141)][_0x2c7def(0x170)][_0x2c7def(0x58d)](this);return $gameTemp[_0x2c7def(0x328)](),_0x97e495;},Game_CPCInterpreter[_0x1f220f(0x362)][_0x1f220f(0x564)]=function(_0x24f52f){const _0x102091=_0x1f220f;return Game_Interpreter[_0x102091(0x362)]['command108']['call'](this,_0x24f52f),this[_0x102091(0x3de)][_0x102091(0x35d)](_0x447d2=>_0x447d2[_0x102091(0x4db)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this['_cpc']=!![]),!![];},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x450)]=Scene_Map[_0x1f220f(0x362)][_0x1f220f(0x263)],Scene_Map[_0x1f220f(0x362)][_0x1f220f(0x263)]=function(){const _0x11f876=_0x1f220f;VisuMZ[_0x11f876(0x141)]['Scene_Map_startEncounterEffect'][_0x11f876(0x58d)](this),this['_spriteset'][_0x11f876(0x541)]();},VisuMZ['EventsMoveCore']['Scene_Load_onLoadSuccess']=Scene_Load[_0x1f220f(0x362)][_0x1f220f(0x15f)],Scene_Load[_0x1f220f(0x362)][_0x1f220f(0x15f)]=function(){const _0x5c3d2e=_0x1f220f;if($gameMap)$gameMap[_0x5c3d2e(0x5a2)]();VisuMZ[_0x5c3d2e(0x141)][_0x5c3d2e(0x476)]['call'](this);},VisuMZ['EventsMoveCore'][_0x1f220f(0x33a)]=Sprite_Character['prototype'][_0x1f220f(0x16f)],Sprite_Character[_0x1f220f(0x362)]['initMembers']=function(){const _0x3cfe24=_0x1f220f;VisuMZ[_0x3cfe24(0x141)]['Sprite_Character_initMembers'][_0x3cfe24(0x58d)](this),this['initMembersEventsMoveCore'](),this[_0x3cfe24(0xf1)](),this[_0x3cfe24(0x572)]();},Sprite_Character['prototype'][_0x1f220f(0x557)]=function(){this['_shadowOpacity']=0xff;},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0xf1)]=function(){const _0x55c480=_0x1f220f;this[_0x55c480(0x457)]=new Sprite(),this[_0x55c480(0x457)][_0x55c480(0xc0)]['x']=0.5,this[_0x55c480(0x457)][_0x55c480(0xc0)]['y']=0x1,this[_0x55c480(0x33c)](this[_0x55c480(0x457)]),this['updateAttachPictureSprite']();},Sprite_Character['prototype'][_0x1f220f(0x572)]=function(){const _0x1d2080=_0x1f220f;this[_0x1d2080(0x3b4)]=new Sprite(),this[_0x1d2080(0x3b4)][_0x1d2080(0x121)]=ImageManager[_0x1d2080(0x57c)](_0x1d2080(0x5ba)),this[_0x1d2080(0x3b4)]['bitmap'][_0x1d2080(0x279)]=![],this[_0x1d2080(0x3b4)]['setFrame'](0x0,0x0,0x0,0x0),this[_0x1d2080(0x3b4)]['anchor']['x']=0.5,this[_0x1d2080(0x3b4)][_0x1d2080(0xc0)]['y']=0x1,this[_0x1d2080(0x33c)](this[_0x1d2080(0x3b4)]);},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x361)]=function(){const _0x414f6b=_0x1f220f;return this['_characterName']&&this[_0x414f6b(0x28a)][_0x414f6b(0x4db)](/\[VS8\]/i);},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x2c9)]=function(){const _0x5a6a8e=_0x1f220f;return this[_0x5a6a8e(0x361)]()&&VisuMZ[_0x5a6a8e(0x141)]['Settings'][_0x5a6a8e(0x2d8)]['AutoBuffer'];},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x2af)]=Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x2c5)],Sprite_Character['prototype'][_0x1f220f(0x2c5)]=function(){const _0x365034=_0x1f220f;VisuMZ['EventsMoveCore'][_0x365034(0x2af)][_0x365034(0x58d)](this),this[_0x365034(0x100)]();},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x5a7)]=function(){const _0x444360=_0x1f220f;Sprite['prototype'][_0x444360(0x5a7)][_0x444360(0x58d)](this),this['isEventsMoveCoreInvisible']()&&(this[_0x444360(0x198)]=![]);},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x3a2)]=function(){const _0x5783ab=_0x1f220f;if(this[_0x5783ab(0x44a)]()>0x0)return![];if(this['_character']){if(this['_character']['attachPictureFilename']()!=='')return![];}return this[_0x5783ab(0x5ed)]()||this['_character']&&this[_0x5783ab(0x420)][_0x5783ab(0x1bb)]();},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x100)]=function(){const _0x1e8343=_0x1f220f;this[_0x1e8343(0x259)](),this['updateShadow'](),this[_0x1e8343(0x4d1)](),this[_0x1e8343(0x4ea)](),this['updateEventMirrorSprite'](),this['updateAttachPictureSprite']();},VisuMZ['EventsMoveCore']['Sprite_Character_setTileBitmap']=Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0xfb)],Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0xfb)]=function(){const _0x37a01c=_0x1f220f;VisuMZ['EventsMoveCore'][_0x37a01c(0x4f2)]['call'](this),this[_0x37a01c(0x121)][_0x37a01c(0x23a)](this[_0x37a01c(0x19c)]['bind'](this));},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x3d7)]=Sprite_Character[_0x1f220f(0x362)]['setCharacterBitmap'],Sprite_Character[_0x1f220f(0x362)]['setCharacterBitmap']=function(){const _0x168b1d=_0x1f220f;VisuMZ[_0x168b1d(0x141)][_0x168b1d(0x3d7)][_0x168b1d(0x58d)](this),this[_0x168b1d(0x121)][_0x168b1d(0x23a)](this[_0x168b1d(0x19c)][_0x168b1d(0x2cd)](this));},Sprite_Character[_0x1f220f(0x362)]['updateBitmapSmoothing']=function(){const _0x285551=_0x1f220f;if(!this[_0x285551(0x121)])return;this[_0x285551(0x121)][_0x285551(0x279)]=!!VisuMZ[_0x285551(0x141)]['Settings'][_0x285551(0x4c9)][_0x285551(0x41e)];},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x55c)]=Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x1d6)],Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x1d6)]=function(){const _0x3669ba=_0x1f220f;return this[_0x3669ba(0x361)]()?this[_0x3669ba(0x150)]():'AYPRh'!==_0x3669ba(0x4a4)?this['characterPatternYBasic']():_0x2012d6[_0x3669ba(0x141)][_0x3669ba(0x204)][_0x3669ba(0x58d)](this,_0xbc4973);},Sprite_Character['prototype'][_0x1f220f(0x150)]=function(){const _0x5766c0=_0x1f220f,_0x4a9ef7=this[_0x5766c0(0x420)][_0x5766c0(0x59a)]();let _0x567654=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];if(this['_character'][_0x5766c0(0x3b2)]){if(_0x5766c0(0x1de)!==_0x5766c0(0x1de)){this[_0x5766c0(0x386)]=!![];return;}else _0x567654=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6];}return(_0x567654[_0x4a9ef7]-0x2)/0x2;},Sprite_Character['prototype'][_0x1f220f(0x21b)]=function(){const _0x2403b8=_0x1f220f;let _0x1bfaee=this[_0x2403b8(0x420)][_0x2403b8(0x59a)]();if(this[_0x2403b8(0x420)][_0x2403b8(0x3b2)]){if(_0x1bfaee===0x4)_0x1bfaee=0x6;else _0x1bfaee===0x6&&(_0x1bfaee=0x4);}return(_0x1bfaee-0x2)/0x2;},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x259)]=function(){const _0x563d18=_0x1f220f;if(!VisuMZ['EventsMoveCore']['Settings'][_0x563d18(0x4c9)][_0x563d18(0x3eb)])return;this[_0x563d18(0x4a1)]=0x0;if(this[_0x563d18(0x357)]()){const _0x5da36f=VisuMZ[_0x563d18(0x141)][_0x563d18(0x454)][_0x563d18(0x4c9)],_0x417d9c=this[_0x563d18(0x420)][_0x563d18(0x59a)]();let _0x3df145=0x0;if([0x1,0x4,0x7]['includes'](_0x417d9c))_0x3df145=_0x5da36f['TiltLeft'];if([0x3,0x6,0x9]['includes'](_0x417d9c))_0x3df145=_0x5da36f['TiltRight'];[0x2,0x8][_0x563d18(0x220)](_0x417d9c)&&(_0x563d18(0x21d)!==_0x563d18(0x244)?_0x3df145=[-_0x5da36f[_0x563d18(0x540)],0x0,_0x5da36f[_0x563d18(0x540)]][this['_character'][_0x563d18(0x1bf)]()]:(_0x2b3175(_0x563d18(0x373)[_0x563d18(0x2c0)](_0x16765f,_0x464b0b)),_0x19acbb[_0x563d18(0x1dd)]()));if(this[_0x563d18(0x5b1)])_0x3df145*=-0x1;this[_0x563d18(0x4a1)]=_0x3df145;}},Sprite_Character['prototype'][_0x1f220f(0x357)]=function(){const _0x494a99=_0x1f220f;if(this[_0x494a99(0xc6)])return![];return this[_0x494a99(0x420)][_0x494a99(0xee)]()&&!this[_0x494a99(0x420)][_0x494a99(0x598)]()&&!this[_0x494a99(0x420)]['isPosing']()&&this[_0x494a99(0x44a)]()===0x0;},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x3b5)]=function(){const _0x4d244b=_0x1f220f;if(!this[_0x4d244b(0x353)])return;this[_0x4d244b(0x353)]['x']=this[_0x4d244b(0x420)][_0x4d244b(0x229)](),this['_shadowSprite']['y']=this[_0x4d244b(0x420)][_0x4d244b(0x466)](),this[_0x4d244b(0x353)][_0x4d244b(0x473)]=this[_0x4d244b(0x473)],this[_0x4d244b(0x353)][_0x4d244b(0x198)]=this[_0x4d244b(0x420)][_0x4d244b(0x58b)](),this[_0x4d244b(0x353)][_0x4d244b(0x10b)]=this[_0x4d244b(0x10b)],!this['_character'][_0x4d244b(0x197)]()?(this[_0x4d244b(0x353)][_0x4d244b(0x2db)]['x']=Math[_0x4d244b(0x2de)](0x1,this['_shadowSprite'][_0x4d244b(0x2db)]['x']+0.1),this[_0x4d244b(0x353)]['scale']['y']=Math['min'](0x1,this[_0x4d244b(0x353)][_0x4d244b(0x2db)]['y']+0.1)):(this[_0x4d244b(0x353)][_0x4d244b(0x2db)]['x']=Math[_0x4d244b(0x280)](0x0,this[_0x4d244b(0x353)]['scale']['x']-0.1),this[_0x4d244b(0x353)][_0x4d244b(0x2db)]['y']=Math[_0x4d244b(0x280)](0x0,this[_0x4d244b(0x353)][_0x4d244b(0x2db)]['y']-0.1));},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x4d1)]=function(){const _0xb04c7d=_0x1f220f;if(!this['_eventIconSprite'])return;const _0x282457=this[_0xb04c7d(0x3b4)],_0x42687f=this[_0xb04c7d(0x44a)]();if(_0x42687f<=0x0)return _0x282457[_0xb04c7d(0x29a)](0x0,0x0,0x0,0x0);else{const _0x585b96=ImageManager[_0xb04c7d(0x464)],_0x1f0bc7=ImageManager[_0xb04c7d(0x42d)],_0x278f25=_0x42687f%0x10*_0x585b96,_0x30e27c=Math[_0xb04c7d(0x187)](_0x42687f/0x10)*_0x1f0bc7;_0x282457[_0xb04c7d(0x29a)](_0x278f25,_0x30e27c,_0x585b96,_0x1f0bc7),this[_0xb04c7d(0x198)]=!![];}const _0x3a765e=this[_0xb04c7d(0x420)]['getEventIconData']();this[_0xb04c7d(0x2c9)]()?_0xb04c7d(0x5c5)!=='wJpJl'?this[_0xb04c7d(0x15a)](_0x4c220):this[_0xb04c7d(0x4d3)](_0x282457):(_0x282457['x']=_0x3a765e?_0x3a765e['bufferX']:0x0,_0x282457['y']=_0x3a765e?-this[_0xb04c7d(0x405)]+_0x3a765e[_0xb04c7d(0x12a)]:0x0),_0x282457[_0xb04c7d(0x261)]=_0x3a765e?_0x3a765e[_0xb04c7d(0x261)]:0x0,this[_0xb04c7d(0x3db)](_0x282457),this['addChild'](_0x282457),_0x282457['rotation']=-this[_0xb04c7d(0x4a1)];},Sprite_Character['prototype'][_0x1f220f(0x4ea)]=function(){const _0x2cf798=_0x1f220f;if(!this[_0x2cf798(0x420)])return;if(this['_character'][_0x2cf798(0x3ea)]===undefined)return;if(this[_0x2cf798(0x420)][_0x2cf798(0x3ea)]===![])return;this['z']=this[_0x2cf798(0x420)][_0x2cf798(0x3ea)],this['z']<0x0?this[_0x2cf798(0x353)]['z']=this['z']-0x1:this[_0x2cf798(0x353)]['z']=0x0;},Sprite_Character['prototype']['updateEventMirrorSprite']=function(){const _0x53a294=_0x1f220f;if(!this['_character'])return;let _0x1c3fd1=!!this[_0x53a294(0x420)][_0x53a294(0x3b2)];this[_0x53a294(0x2db)]['x']=Math['abs'](this['scale']['x'])*(_0x1c3fd1?-0x1:0x1);},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x4d3)]=function(_0x44ebb5){const _0x416fc9=_0x1f220f;_0x44ebb5['x']=0x0,_0x44ebb5['y']=-this['height']+this[_0x416fc9(0x405)]*0x2/0x5;if(this['_character'][_0x416fc9(0x1bf)]()!==0x1){if(_0x416fc9(0x446)===_0x416fc9(0x446))_0x44ebb5['y']+=0x1;else{const _0x42e834=_0x5d34c8['destinationX'](),_0x136a42=_0x344881[_0x416fc9(0x1f2)]();this[_0x416fc9(0x4a0)](_0x42e834,_0x136a42)?_0x3f0667=this[_0x416fc9(0x599)](_0x42e834,_0x136a42):_0x367eed=this['findDirectionTo'](_0x42e834,_0x136a42);}}},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x44a)]=function(){const _0x38d849=_0x1f220f;if(!this[_0x38d849(0x420)])return 0x0;if(this[_0x38d849(0x420)][_0x38d849(0x37e)])return 0x0;const _0x51bf16=this['_character'][_0x38d849(0x1d9)]();return _0x51bf16?_0x51bf16['iconIndex']||0x0:0x0;},Sprite_Character[_0x1f220f(0x362)]['updateAttachPictureSprite']=function(){const _0x16b7eb=_0x1f220f;if(!this['_attachPictureSprite'])return;if(!this[_0x16b7eb(0x420)])return;this['setupAttachPictureBitmap'](),this[_0x16b7eb(0x211)]();},Sprite_Character['prototype'][_0x1f220f(0x5d0)]=function(){const _0x2cd27a=_0x1f220f;if(!this[_0x2cd27a(0x171)]())return;const _0x69a003=this[_0x2cd27a(0x420)][_0x2cd27a(0x116)]();this[_0x2cd27a(0x3fd)]=_0x69a003['filename'],this[_0x2cd27a(0x451)]=_0x69a003[_0x2cd27a(0x499)],this['_lastAttachPictureScale']=_0x69a003[_0x2cd27a(0x2db)];if(_0x69a003[_0x2cd27a(0x234)]!==''){const _0x3ba5d4=ImageManager[_0x2cd27a(0x4e7)](_0x69a003[_0x2cd27a(0x234)]);_0x3ba5d4[_0x2cd27a(0x23a)](this[_0x2cd27a(0x403)][_0x2cd27a(0x2cd)](this,_0x3ba5d4));}else this[_0x2cd27a(0x457)][_0x2cd27a(0x121)]=new Bitmap(0x1,0x1);},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x211)]=function(){const _0x44352c=_0x1f220f,_0x3cb6e1=this['_attachPictureSprite'];_0x3cb6e1['x']=this['_character'][_0x44352c(0x202)](),_0x3cb6e1['y']=this[_0x44352c(0x420)]['attachPictureOffsetY'](),_0x3cb6e1[_0x44352c(0x261)]=this[_0x44352c(0x420)]['attachPictureBlendMode']();},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x171)]=function(){const _0x50c780=_0x1f220f,_0x24df3a=this['_character'][_0x50c780(0x116)]();if(_0x24df3a){if(_0x50c780(0x42b)!==_0x50c780(0x4d6)){if(this[_0x50c780(0x3fd)]!==_0x24df3a[_0x50c780(0x234)])return!![];if(this['_lastAttachPictureMaxSize']!==_0x24df3a[_0x50c780(0x499)])return!![];if(this[_0x50c780(0x29c)]!==_0x24df3a[_0x50c780(0x2db)])return!![];}else{if([0x2,0x4,0x6,0x8][_0x50c780(0x220)](_0x258b99))return 0x4;if([0x1,0x3,0x7,0x9][_0x50c780(0x220)](_0x1b7999))return 0x5;}}return![];},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x403)]=function(_0x1a11e0){const _0x28dbd4=_0x1f220f,_0x405e04=this['_attachPictureSprite'];_0x405e04[_0x28dbd4(0x121)]=_0x1a11e0;const _0x5b2391=this['_character']['attachPictureSettings'](),_0x4e4da4=_0x5b2391[_0x28dbd4(0x499)],_0x25925d=_0x5b2391['scale'];let _0x2e5961=0x1;if(_0x4e4da4>0x0){if(_0x28dbd4(0x4ff)===_0x28dbd4(0x22d)){if(_0x538945[_0x28dbd4(0x4db)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x111be0=_0x5bcfdd(_0xc5fabc['$1'])[_0x28dbd4(0x552)]()[_0x28dbd4(0x445)](),_0x3e95d4=_0x16f54e(_0x1b42d3['$2']);this[_0x28dbd4(0x4f0)][_0x111be0]=_0x3e95d4;}}else{let _0x867c61=this[_0x28dbd4(0x1a5)]()||0x1,_0x6d5679=this[_0x28dbd4(0x412)]()||0x1;const _0x33a825=Math['max'](0x1,_0x867c61,_0x6d5679);_0x2e5961=_0x4e4da4/_0x33a825;}}_0x2e5961*=_0x25925d,_0x2e5961!==0x1&&(_0x28dbd4(0x559)!==_0x28dbd4(0x257)?this['_attachPictureSprite'][_0x28dbd4(0x121)][_0x28dbd4(0x279)]=!![]:this[_0x28dbd4(0x5a6)]+=this[_0x28dbd4(0x29b)]()),_0x405e04[_0x28dbd4(0x2db)]['x']=_0x2e5961,_0x405e04[_0x28dbd4(0x2db)]['y']=_0x2e5961,this['visible']=!![],this['updateAttachPictureBitmap']();},Sprite_Character[_0x1f220f(0x362)][_0x1f220f(0x1a5)]=function(){const _0x22b166=_0x1f220f,_0x16b6c3=this[_0x22b166(0x457)];if(!_0x16b6c3)return 0x0;return _0x16b6c3[_0x22b166(0x121)][_0x22b166(0x59f)];},Sprite_Character['prototype']['getAttachPictureBitmapHeight']=function(){const _0x40ce9b=_0x1f220f,_0x2cb247=this[_0x40ce9b(0x457)];if(!_0x2cb247)return 0x0;return _0x2cb247['bitmap'][_0x40ce9b(0x405)];},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x3b6)]=Sprite_Balloon['prototype'][_0x1f220f(0x2d9)],Sprite_Balloon[_0x1f220f(0x362)]['setup']=function(_0x4bb891,_0x59e666){const _0x526893=_0x1f220f;VisuMZ['EventsMoveCore'][_0x526893(0x3b6)][_0x526893(0x58d)](this,_0x4bb891,_0x59e666),VisuMZ[_0x526893(0x141)]['Settings']['VS8'][_0x526893(0x504)]&&this[_0x526893(0x35a)]['_character']['setBalloonPose'](_0x59e666,this[_0x526893(0x551)]);},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0xe8)]=Sprite_Balloon[_0x1f220f(0x362)]['updatePosition'],Sprite_Balloon[_0x1f220f(0x362)]['updatePosition']=function(){const _0x5eb574=_0x1f220f;VisuMZ[_0x5eb574(0x141)][_0x5eb574(0xe8)][_0x5eb574(0x58d)](this),this['updateVS8BalloonOffsets']();},Sprite_Balloon[_0x1f220f(0x362)][_0x1f220f(0x30a)]=function(){const _0x399b99=_0x1f220f;if(this[_0x399b99(0x35a)][_0x399b99(0x420)][_0x399b99(0x361)]()){if('vnVre'==='vnVre')this['x']+=VisuMZ['EventsMoveCore'][_0x399b99(0x454)]['VS8'][_0x399b99(0x578)],this['y']+=VisuMZ['EventsMoveCore'][_0x399b99(0x454)][_0x399b99(0x2d8)][_0x399b99(0x176)];else return{'iconIndex':0x0,'bufferX':_0x25fb0b['Icon'][_0x399b99(0x2e5)],'bufferY':_0xec584b[_0x399b99(0x5bf)][_0x399b99(0xd7)],'blendMode':_0x1905eb[_0x399b99(0x5bf)][_0x399b99(0x53c)]};}},Sprite_Timer[_0x1f220f(0x362)]['createBitmap']=function(){const _0x45c79d=_0x1f220f;this['bitmap']=new Bitmap(Math[_0x45c79d(0xdb)](Graphics[_0x45c79d(0x5a5)]/0x2),0x30),this[_0x45c79d(0x121)][_0x45c79d(0x57a)]=this['fontFace'](),this[_0x45c79d(0x121)][_0x45c79d(0xc5)]=this[_0x45c79d(0xc5)](),this[_0x45c79d(0x121)][_0x45c79d(0x3f1)]=ColorManager['outlineColor']();},Sprite_Timer[_0x1f220f(0x362)][_0x1f220f(0x2b9)]=function(){const _0x3ea9db=_0x1f220f,_0x36cd0a=Math[_0x3ea9db(0x187)](this[_0x3ea9db(0x397)]/0x3c/0x3c),_0x3854d6=Math[_0x3ea9db(0x187)](this[_0x3ea9db(0x397)]/0x3c)%0x3c,_0x5c5a6f=this[_0x3ea9db(0x397)]%0x3c;let _0x200f98=_0x3854d6[_0x3ea9db(0x145)](0x2)+':'+_0x5c5a6f['padZero'](0x2);if(_0x36cd0a>0x0)_0x200f98=_0x3ea9db(0x3dc)['format'](_0x36cd0a,_0x200f98);return _0x200f98;};function _0x2539(_0x5e513b,_0x2dba0c){const _0x315544=_0x3155();return _0x2539=function(_0x25391,_0x5469dd){_0x25391=_0x25391-0xb4;let _0x14ddf6=_0x315544[_0x25391];return _0x14ddf6;},_0x2539(_0x5e513b,_0x2dba0c);}function _0x3155(){const _0x46980d=['wbPca','updateEventCustomZ','random','Game_CharacterBase_canPass','Game_Message_setItemChoice','hRmhE','_spriteset','_addedHitbox','_moveOnlyRegions','Sprite_Character_setTileBitmap','BHule','getPreservedMorphEventData','fnaWz','executeCommand','setLastPluginCommandInterpreter','removeTemporaryMapSpawnedEvents','unlock','RIGHT','xTeXN','KhGsN','updateText','EventLocationCreate','vFcil','Region%1','Preserve','isDashDisabled','7467104oFQIHV','AutoBalloon','determineCommonEventsWithCPC','getDirectionFromPoint','processMoveRouteTeleportToCharacter','MapVariables','VKDqf','getDirectionToPoint','isDashing','split','_moveAllowPlayerCollision','convertSelfVariableValuesInScriptCall','setupChild','_spriteOffsetX','mapValue','initFollowerController','createContents','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ship','qjMMC','updateStop','Game_CharacterBase_moveStraight','kNmPc','prepareSpawnedEventAtXY','StrictCollision','CLnrT','processMoveSynchMirrorVert','JsKZo','_type','_opacity','CarryPose','EvJBs','YWLPC','createLowerLayer','right','process_VisuMZ_EventsMoveCore_Switches_Variables','move','return\x20%1','MPuBr','Game_CharacterBase_isTransparent','executeMoveDir8','isSceneMap','Collision','list','meetsCPC','tNstp','iconIndex','useCarryPoseForIcons','Game_CharacterBase_update','absDistance','isAirship','setEventIconData','Game_Timer_initialize','pOkKB','isEventClickTriggered','_forceCarrying','_eventId','BlendMode','WalkForbid','cwX','fMYMl','TiltVert','hideShadows','nYGqb','isStopFollowerChasing','character','yerBZ','TRUE','setMoveSpeed','SpawnEventAtTerrainTag','processMoveRouteStepTo','setupCopyEvent','Speed','Game_Event_clearPageSettings','_saveEventLocation','WalkAllow','checkNeedForPeriodicRefresh','Map%1-Event%2','_duration','toLowerCase','canPassDiagonally','visibleRange','AutoMoveEvents','scrolledY','initMembersEventsMoveCore','replace','YDhAo','erase','quTSn','Sprite_Character_characterPatternY','CeOTc','rjcuT','windowPadding','getPlayerDiagonalSetting','findTargetSprite','_commonEvents','isVisible','command108','drawText','innerWidth','_scene','pos','KThnc','processMoveRouteMoveToCharacter','reverse\x20mimic','zNVIs','LTmWI','setupDiagonalSupport','rObal','JTAJk','keys','createIconSprite','_moveSynch','isRegionAllowPass','getPosingCharacterDirection','setDashingEnabled','updatePosition','BalloonOffsetX','_eventCache','fontFace','note','loadSystem','Vehicle','push','_stepPattern','roundYWithDirection','lastMovedDirection','_chaseOff','dhWMc','createLabelWindows','_stopCount','moveTowardPoint','AEpBR','switch2Valid','kyodO','sSpka','isShadowVisible','NNXWY','call','btGFo','pluginCommandCallEvent','DAvRf','_PreservedEventMorphData','eTTXp','Game_Event_meetsConditions','VisuMZ_2_DragonbonesUnion','setControlledFollowerID','Game_Character_processMoveCommand','DIAGONAL_PATHFINDING_EVENT_LIMIT','isOnLadder','findDiagonalDirectionTo','direction','_forceShowFollower','createSpawnedEvent','reverse','hasStepAnime','width','meetActivationRegionConditions','_forceShowPlayer','clearEventCache','setupEventsMoveCoreNotetags','charAt','boxWidth','contentsOpacity','updateVisibility','_eventScreenY','EventAutoMovement','KNEEL','processMoveRouteFadeIn','mEvei','LOVE','initEventsMoveCoreEffects','Map\x20%1\x20Switch\x20%2','COBWEB','_reflection','Game_Followers_isVisible','updateParallel','lastSpawnedEvent','Game_CharacterBase_isDashing','setWaitMode','page','setMoveRoute','Step1MapId','IconSet','checkAdvancedSwitchVariablePresent','7dAsJqv','randomInt','ITEM','Icon','_regionRules','fFrfe','moveAwayFromCharacter','unlockEvent','NiygI','wJpJl','characterIndex','%1Forbid','_event','Frames','Game_Event_moveTypeRandom','refreshBushDepth','_diagonalSupport','MYLvl','jpagw','NJBXj','setupAttachPictureBitmap','Passability','FollowerSetTargetChase','convertVariableValuesInScriptCall','Letter','setupRegionRestrictions','QUESTION','Game_Variables_setValue','yhkcb','Self\x20Switch\x20%1','Stop','lineHeight','setupFollowerVisibilityOverrides','Game_Map_events','spriteId','MoveRouteIndex','locate','zPWPl','LMjVA','requestRefresh','FUNC','Game_CharacterBase_realMoveSpeed','RBNDC','jEmYL','Game_Map_refresh','_randomHomeY','template','getPosingCharacterPattern','%1Dock','isEmptyCharacter','eraseEvent','SelfSwitchABCD','setItemChoice','ShowShadows','resetFontSettings','mimic','PlayerMovementDiagonal','ohXzT','onCancel','isValid','_forceHidePlayer','drawTextEx','regionList','processMoveRoutePatternLock','wtKAK','isocp','_selfTarget','_eventIcon','Game_CharacterBase_pattern','_pose','setupEventsMoveCoreCommentTags','_forceHideFollower','correctFacingDirection','Operation','_isObjectCharacter','anchor','setAllowEventAutoMovement','NUM','_encounterEffectDuration','_actuallyMoving','fontSize','_dragonbones','processMoveRouteStepToCharacter','IconIndex','isRunning','clear','ShipSpeed','padding','EVAL','HEART','EkAeJ','attachPictureMaxSize','labelWindowText','changeSpeed','GsVud','uVUoL','RIGHT\x20TO\x20LEFT','DgSMX','BufferY','initialize','IconSize','setSelfValue','round','Chase','requestBalloon','isMoveOnlyRegionPassable','_advancedSwitchVariable','setOpacity','_active','processMoveRouteMoveRepeat','_eventCopyData','PKyyp','processMoveCommandEventsMoveCore','LrPrG','custom','Sprite_Balloon_updatePosition','_randomMoveWeight','RUuSQ','plHhq','PreCopyJS','moveAwayFromPoint','isDashingAndMoving','isPressed','chaseCharacter','createAttachPictureSprite','eventLabelsVisible','hasAdvancedSwitchVariable','aujMv','_tilemap','730863sjqYYa','isBattleTest','Game_CharacterBase_screenY','Game_Map_setup','_moveSpeed','setTileBitmap','AhdrB','clearStepPattern','command357','setupEvents','updateEventsAndMovementCore','PosY','MapId','delay','FRUSTRATION','aHLlr','mirror\x20horz','Okrwj','Game_CharacterBase_opacity','MUSIC','frontY','_hidden','switchId','iphrt','iconSize','prepareSpawnedEventAtTerrainTag','bzMPR','isNormalPriority','turnRight90','ANNOYED','_DisablePlayerControl','SelfSwitchID','attachPictureSettings','OFF','_lastPluginCommandInterpreter','updateEventLabelText','moveTowardCharacter','SuccessSwitchId','VOdTr','_activationProximity','front','Game_Player_checkEventTriggerThere','setFrames','bitmap','refresh','jebxu','isRegionForbidPass','NOTE','OPWeY','_activationProximityAutoTriggerBypass','lvpKK','Game_Event_event','bufferY','setPose','turnAwayFromCharacter','PlayerAllow','enupm','_labelWindows','screenY','_attachPicture','SqLuO','isMapSwitch','setCommonEvent','processMoveRouteJumpForward','Step2MapId','_eventOverload','activationProximityDistance','_screenZoomScale','tileWidth','PVQYw','TAhnH','gjNur','ccwX','getInputDirection','AiNcS','EventsMoveCore','Nrzbe','haDXG','VaCyi','padZero','LpGrk','processMoveSynch','left','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','Game_Event_updateSelfMovement','_starting','isPlayerControlDisabled','LvQlS','startCallEvent','LIGHTBULB','characterPatternYVS8','setEventIconDataKey','Game_Player_checkEventTriggerHere','isAirshipPassable','dir8','Boat','_filename','roundX','canPass','ZfIsF','createCharacterShadow','IconBufferY','_requestSaveEventLocation','isTargetEventValidForLabelWindow','processMoveRouteMoveUntilStop','onLoadSuccess','isMapPassable','code','createLabelWindowForTarget','initEventsMoveCoreSettings','Map\x20%1\x20Variable\x20%2','MULTIPLY','IYmdQ','YsDWj','AdvancedSwitches','createDisplayObjects','_data','JSON','abs','GxSYC','vzzgu','initMembers','Game_Interpreter_executeCommand','needsAttachPictureUpdate','away','Game_Player_increaseSteps','executeMove','SPIN\x20CLOCKWISE','BalloonOffsetY','pageId','checkActivationProximity','setValue','_pattern','_proxyWindow','selfValue','pyoSC','Setting','parse','isLandOk','posNt','isBusy','isLongPressed','_shadowGraphic','_moveRouteIndex','LIGHT-BULB','floor','Game_Event_setupPageSettings','turnAwayFromPoint','Event','inBattle','_randomHomeX','_direction','terrainTag','resetExitSelfSwitches','Game_Player_isMapPassable','isCollidedWithPlayerCharacters','horz\x20mirror','deletePreservedMorphEventDataKey','onDatabaseLoaded','VWgrX','getLastPluginCommandInterpreter','isShadowShrink','visible','EventLocationDelete','setBalloonPose','reserveCommonEvent','updateBitmapSmoothing','AllForbid','setupMorphEvent','checkEventTriggerThere','_characterSprites','VariableGetSelfVariableID','resume','MorphEventTo','GUUTP','getAttachPictureBitmapWidth','Game_Interpreter_PluginCommand','ttaUZ','Step2Preserve','canMove','Game_Event_updateParallel','DpZFS','Game_Map_parallelCommonEvents','Game_CharacterBase_initMembers','deleteSavedEventLocation','reverse\x20copy','isTriggerIn','Game_Map_unlockEvent','onOk','Game_Enemy_meetsSwitchCondition','_forceDashing','RegionOkTarget','_PlayerDiagonalSetting','jKPfd','MessageCore','Game_SelfSwitches_value','_SavedEventLocations','isTransparent','qmmqa','processMoveSynchApproach','firstSpawnedEvent','pattern','updatePose','updateScale','GDXHM','_interpreter','down','clamp','isSmartEventCollisionOn','regionId','morphInto','processMoveRouteJumpToCharacter','isPosing','isPlaytest','_visiblePlayerY','Game_Troop_meetsConditionsCPC','uRbyI','EventTimerPause','shadowFilename','LVgdP','moveRouteIndex','checkValidEventerMap','timer','RemovePreserve','characterPatternY','VisuMZ_Setup_Preload_Map','checkEventTriggerAuto','getEventIconData','pages','status','meetsSwitchCondition','exit','jxNtw','contents','VBRKb','Template','setPlayerDiagonalSetting','Game_Event_locate','setupSaveEventLocations','spawnEventId','Disable','EventAllow','frameCount','Game_SelfSwitches_setValue','filter','moveStraight','standing','PosX','%1%2','activationRegionList','uAlPl','NNXyh','destinationY','target','setImage','ShiftY','PostMorphJS','isDiagonalDirection','setPosition','indexOf','APZOg','EventLocationSave','%1DockRegionOnly','DbINe','isAdvancedVariable','itemPadding','clearCarrying','isMapVariable','attachPictureOffsetX','USER-DEFINED\x203','Game_Map_event','eOKFS','EventID','drawIcon','eventsXyNt','VScvh','AirshipSpeed','maCFV','_events','Seconds','loadCPC','MapID','cwY','updateAttachPictureBitmap','executeCommonEvent','_clickTrigger','square','%1Allow','canStartLocalEvents','_cpc','parameters','clearAttachPictureSettings','Self\x20Variable\x20%1','characterPatternYBasic','requestAnimation','HyNWO','HlGiX','Bthpu','includes','resetSelfSwitchesForEvent','clearDashing','cbgwu','toXxM','switch2Id','switch1Valid','registerCommand','Game_Event_checkEventTriggerAuto','shadowX','processMoveSynchCustom','NoqpK','makeDeepCopy','PlMCz','Game_CharacterBase_increaseSteps','updateSaveEventLocation','isWorking','NjpNL','checkEventTriggerEventsMoveCore','isPlayerForceHidden','filename','EventTimerExpireEvent','egktN','_selfTargetItemChoice','GFQEs','ConvertParams','addLoadListener','start','STR','FXCsK','Game_Message_setNumberInput','moveBackToRandomHome','_inputTime','ALLOW_LADDER_DASH','createProxyWindow','kMXUk','PYUfh','add','TerrainTags','findDirectionTo','hasClickTrigger','XJltN','QQiIW','Game_CharacterBase_characterIndex','Game_Troop_meetsConditions','ARRAYNUM','loadDataFile','setupSpawn','processOk','_callEventData','FollowerSetControl','KZsnX','switch1Id','OqMgr','isPassable','SnPsF','metCPC','updateTilt','PreloadedMaps','Visible','Game_Switches_value','setPattern','SlowerSpeed','_callEventMap','BzQbc','blendMode','CPC','startEncounterEffect','CustomPageConditions','LZcHl','airship','BULB','Game_Follower_chaseCharacter','advancedValue','yvgyr','LEFT','setupSpawnedEvents','VehicleForbid','despawnEverything','processMoveRouteSetIndex','deltaYFrom','boat','Airship','Step2EventId','string','events','Game_Temp_setDestination','_pageIndex','EnableTurnInPlace','smooth','_mapId','isSaveEventLocations','updatePatternEventsMoveCore','despawnAtXY','Game_Event_isCollidedWithPlayerCharacters','setupPlayerVisibilityOverrides','max','vPdUf','pgAeZ','gwdyg','Game_Event_update','areFollowersForceShown','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','nBcRc','PlayerIconDelete','offsetX','_characterName','OpLtA','nOAPq','setMovementSuccess','updateEventsMoveCoreTagChanges','CPCsMet','LIGHT\x20BULB','EUuIT','_characterIndex','_commonEventId','AdvancedVariables','mKAaM','Map%1.json','forceDashing','_followerChaseOff','SsiQM','setFrame','opacitySpeed','_lastAttachPictureScale','switches','165492mOafVk','ARRAYJSON','constructor','LZUQI','isSupportDiagonalMovement','getInputDir8','isTile','_visibleEventX','conditions','lastSpawnedEventID','updatePattern','type','COLLAPSE','SelfDataResetAll','OKSYW','541194enfFQR','offsetY','Sprite_Character_update','BlBQr','onClickTrigger','clearSpriteOffsets','clearPose','WAPmz','tIbZH','Game_Character_setMoveRoute','apply','name','timerText','_selfTargetNumberInput','_vehicleType','resizeWindow','vert\x20mirror','meetsConditions','EIiRq','format','ZZZ','PlayerIconChange','VchRR','_realX','update','posEventsMoveCore','bjMDL','Game_Player_isDashing','isAutoBufferIcon','_spawnPreserved','tCQkA','shift','bind','isSpawnedEvent','processMoveRouteSelfVariable','RQHSY','uGpcF','_realY','RjyLV','setNumberInput','UNTITLED','Bssdx','VICTORY','VS8','setup','lSSxU','scale','NkpPO','Player','min','lock','QXzwO','_MapSpawnedEventData','wVAVH','SpawnEventDespawnTerrainTags','originalText','BufferX','_waitMode','processMoveSynchAway','hasCPCs','variables','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','ZChLG','startMapCommonEventOnTouch','checkExistingEntitiesAt','SWEAT','labelWindowRange','QtTTy','NZHYh','onChange','deleteSavedEventLocationKey','YqIFI','getMapSpawnedEventData','processMoveCommand','defaultFontSize','UuUtx','radius','MorphEventRemove','General','updateRoutineMove','Game_CharacterBase_hasStepAnime','attachPictureFilename','SpawnEventDespawnAtXY','Game_Player_executeMove','ARRAYSTR','setupEventsMoveCoreEffects','MoveAllSynchTargets','STRUCT','All','Region','isPassableByAnyDirection','_EventIcons','_spriteOffsetY','updateVS8BalloonOffsets','checkEventTriggerHere','UPPER\x20LEFT','determineEventOverload','ymJVf','_moveRoute','_paused','turnTowardPoint','EventId','SPIN\x20CW','isOnRope','KQVPw','textSizeEx','setPlayerControlDisable','LBaSu','_lastMovedDirection','BoatSpeed','Game_CharacterBase_direction','Game_CommonEvent_isActive','getPose','createShadow','IconBufferX','moveTypeRandom','log','SPIN\x20COUNTERCLOCKWISE','isMovementSucceeded','variableId','Game_CharacterBase_setDirection','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','forceMoveRoute','clearSelfTarget','Game_Message_add','XusMq','Game_CharacterBase_updatePattern','NcaYG','Name','_eventOverloadThreshold','Game_Interpreter_character','getSelfTarget','bufferX','EnableDir8','isSelfVariable','processMoveRouteTeleportTo','DashingEnable','EXCLAMATION','5257885VaKBXL','_saveEventLocations','Game_Event_meetsConditionsCPC','Sprite_Character_initMembers','isAnyEventStarting','addChild','_CPCs','Game_CharacterBase_moveDiagonally','lDIyW','directionOnLadderSpriteVS8dir','length','_visiblePlayerX','_eventScreenX','IKnPP','adjustMoveSynchOpacityDelta','FollowerID','updateMoveSynch','XPZKD','_eventMorphData','SPIN\x20CCW','isPreventSelfMovement','YjIMm','distance','createSaveEventLocationData','updateWaitMode','none','EventTimerFramesSet','Game_Event_start','_shadowSprite','player','_speed','Step1EventId','isAllowCharacterTilt','registerSelfTarget','EventLabelRefresh','_target','increaseSteps','_frames','some','moveSynchType','Forbid','deltaY','isSpriteVS8dir','prototype','deleteIconsOnEventsData','startMapCommonEventOnOKTarget','_trigger','VUXUk','Window_EventItem_onOk','Toggle','HURT','DefaultShadow','Game_Timer_onExpire','uTLyq','processMoveSynchReverseMimic','Window_Message_startMessage','startMessage','NejOF','yukMn','Doxey','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','updateMove','_labelWindow','RegionTouch','2QorgzP','SwitchId','removeMorph','fDHrF','despawnTerrainTags','_selfEvent','vctRZ','_erased','_eventErased','registerSelfEvent','LineHeight','morphIntoTemplate','_eventSpawnData','processMoveSynchRandom','moveForward','_needsPeriodicRefresh','Game_Character_forceMoveRoute','of\x20Preloaded\x20Maps.\x0a\x0a','getControlledFollowerID','areFollowersForceHidden','toUpperCase','variableValid','FollowerReset','Window_EventItem_onCancel','WzzNk','Game_Event_initialize','gPZve','setDirection','isMoving','roundY','createSpawnedEventWithData','ANGER','_seconds','SCREEN','default','Minutes','isEventRunning','deleteEventLocation','CallEvent','roundXWithDirection','isTurnInPlace','ULjdE','saveEventLocation','isEventsMoveCoreInvisible','map','enable','PageId','deleteIconsOnEventsDataKey','concat','SpawnEventDespawnEventID','spawnPreserved','DEFAULT_SHIFT_Y','moveByInput','description','setChaseOff','PostCopyJS','realMoveSpeed','CZtrc','15vBtELq','_mirrorSprite','VehicleAllow','_eventIconSprite','updateShadow','Sprite_Balloon_setup','backX','bBxwU','updatePeriodicRefresh','advancedFunc','Dock','_alwaysUpdateMove','_poseDuration','mapId','processMoveRouteJumpTo','uEVhf','YjifC','shiftY','ZEVZx','SpriteBased','Hidden','_followerControlID','EventTimerSpeed','22009420PalRsi','HMPH','setDiagonalDirection','pqpUc','clearPageSettings','Value','GxWQC','xOVpb','QCoWy','isJumping','jdFaH','FfFDY','isCollidedWithEvents','Spriteset_Map_createShadow','eventId','Sprite_Character_setCharacterBitmap','hKOwH','isSelfSwitch','processSaveEventLocation','removeChild','%1:%2','FastForwardKey','_comments','WLZsz','approach','characterName','isAdvancedSwitch','FavorHorz','xXnUm','initEventsMoveCore','DCVsX','_cacheSystemVisible','refreshEventLabels','isActive','_customZ','EnableDashTilt','HWmOI','processMoveRouteSelfSwitch','setMapValue','isShip','characterIndexVS8','outlineColor','follower','drawing','backY','VisibleEventLabels','checkEventsMoveCoreStringTags','NCSvr','ADDITIVE','screenX','UPPER\x20RIGHT','onExpire','xRjTq','_lastAttachPictureFilename','FCNlj','Game_System_initialize','processMoveRouteHugWall','DashModifier','deltaXFrom','onLoadAttachPicture','processMoveRouteBalloon','height','hiwEr','GonmC','TargetSwitchId','KSwbf','Label','isRegionDockable','value','column','Game_Map_setupEvents','uVGpc','despawnRegions','hAUqv','getAttachPictureBitmapHeight','Direction','execute','xWOng','processMoveRouteAnimation','createShadows','USER-DEFINED\x204','Rope','updateOpacity','processMoveSynchMimic','lQgju','OpacitySpeed','BitmapSmoothing','UyINH','_character','OSEmK','MUSIC\x20NOTE','eventsXy','CommonEventID','Allow','activationProximityType','event','tUhYI','Window_ScrollText_startMessage','FontSize','SRKxP','dPkiV','iconHeight','reverseDir','Ktwor','VisibleRange','mainFontSize','KBfOV','_shadowOpacity','isSpawnHitboxCollisionOk','isSaveEventLocation','wSfJq','DashEnableToggle','pause','checkCollisionKeywords','_spawnData','EventTemplates','resetSelfSwitchesForMap','IwCYK','BMUPj','gainFrames','TCOGV','setStopFollowerChasing','pMXYI','Game_Player_getInputDirection','Walk','trim','nWafr','iwaML','forceCarrying','turnLeft90','getEventIconIndex','_text','ykHNR','ccctN','BFyiJ','...','Scene_Map_startEncounterEffect','_lastAttachPictureMaxSize','_eventLabelOffsetY','processMoveRouteStepFrom','Settings','FALSE','setupPageSettings','_attachPictureSprite','_eventPageIndex','567604nHDPiE','Window_NumberInput_processOk','Game_Vehicle_isLandOk','Game_Switches_setValue','Ndmgp','destinationX','zoomScale','USER-DEFINED\x201','aCnkK','executeCommandCommonEvent','vertical\x20mirror','iconWidth','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','shadowY','followers','EventIconDelete','processMoveSynchMirrorHorz','OJxIo','moveSynchTarget','horizontal\x20mirror','StopAutoMoveEvents','_eventLabelOffsetX','oZwOW','EventIconChange','IconBlendMode','isBoat','opacity','_visibleEventY','SILENCE','Scene_Load_onLoadSuccess','PreloadMaps','IeOEB','kqcqW','PlayerForbid','isLabelVisible','MapSwitches','SelfVariables','text','_working','savePreservedMorphEventDataKey','NMxXI','hasMoveOnlyRegions','jthxh','pvPCp','Ztduh','vehicle','GetMoveSynchTarget','SelfVariableID','setEventLabelsVisible','OperateValues','SelfSwitches','needsUpdate','initMoveSpeed','processMoveRouteMoveTo','TemplateName','QnxBQ','isEventTest','_cacheVisibility','_counter','SpawnEventAtRegion','LEFT\x20TO\x20RIGHT','XnoyR','processMoveRouteFadeOut','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','maxSize','Game_Event_findProperPageIndex','EventTimerExpireClear','getPosingCharacterIndex','prepareSpawnedEventAtRegion','checkRegionEventTrigger','SpawnEventAtXY','getDiagonalDestination','rotation','setupSpawnTest','isObjectCharacter','nGTxU','SwitchGetSelfSwitchABCD','despawnEventId','isInVehicle','hasDragonbones','referEvent','dashSpeedModifier','FLgAR','SpawnEventDespawnEverything','refreshIfNeeded','jump','create','meetActivationProximityConditions','EventTimerResume','PdPnz','FollowerSetGlobalChase','isDashingEnabled','FIsMV','Game_Timer_start','autosaveEventLocation','slice','Game_Variables_value','_EventsMoveCoreSettings','findProperPageIndex','VariableId','$preloadedMap_%1','LOWER\x20RIGHT','USER-DEFINED\x202','attachPictureBlendMode','Window_NumberInput_start','DOWN','adjustDir8MovementSpeed','getSavedEventLocation','_periodicRefreshTimer','PAPBe','_patternLocked','turnTowardCharacter','Movement','isPlayerForceShown','region','JLGFw','_spawnedEvents','SPIN\x20ANTICLOCKWISE','pnbrQ','_expireCommonEvent','updateEventIconSprite','startMapCommonEventOnOK','autoEventIconBuffer','mirror\x20horizontal','COkEn','FQBTL','LIGHT','isAllowEventAutoMovement','restoreSavedEventPosition','LdHQD','match','updateSelfMovement','Game_Interpreter_updateWaitMode','zzaec','ONLcb','isDestinationValid','FYBIO','mirror\x20vertical','bFjbM','isNearTheScreen','checkSmartEventCollision','PostSpawnJS','loadPicture','TAzKW'];_0x3155=function(){return _0x46980d;};return _0x3155();}function Sprite_EventLabel(){const _0xa27a54=_0x1f220f;this[_0xa27a54(0xd8)](...arguments);}Sprite_EventLabel[_0x1f220f(0x362)]=Object[_0x1f220f(0x4af)](Sprite[_0x1f220f(0x362)]),Sprite_EventLabel[_0x1f220f(0x362)]['constructor']=Sprite_EventLabel,Sprite_EventLabel['prototype'][_0x1f220f(0xd8)]=function(_0x114e6e){const _0x11af05=_0x1f220f;this['_event']=_0x114e6e,Sprite[_0x11af05(0x362)]['initialize'][_0x11af05(0x58d)](this),this[_0x11af05(0x16f)](),this[_0x11af05(0x242)]();},Sprite_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x16f)]=function(){const _0x4a61fd=_0x1f220f;this['anchor']['x']=0.5,this[_0x4a61fd(0xc0)]['y']=0x1;},Sprite_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x242)]=function(){const _0xb39498=_0x1f220f,_0x7202ba=new Rectangle(0x0,0x0,0x1,0x1);this['_proxyWindow']=new Window_Base(_0x7202ba),this['_proxyWindow'][_0xb39498(0xcc)]=0x0,this[_0xb39498(0x473)]=this[_0xb39498(0x47b)]()?0xff:0x0;},Sprite_EventLabel[_0x1f220f(0x362)]['update']=function(){const _0x4a0f01=_0x1f220f;Sprite[_0x4a0f01(0x362)][_0x4a0f01(0x2c5)][_0x4a0f01(0x58d)](this),this[_0x4a0f01(0x4fd)](),this[_0x4a0f01(0x1c1)](),this[_0x4a0f01(0x577)](),this[_0x4a0f01(0x41a)]();},Sprite_EventLabel[_0x1f220f(0x362)]['updateText']=function(){const _0x296bc4=_0x1f220f;this[_0x296bc4(0x5c8)][_0x296bc4(0xd1)]()!==this[_0x296bc4(0x44b)]&&(this['_text']=this[_0x296bc4(0x5c8)][_0x296bc4(0xd1)](),this[_0x296bc4(0x122)]());},Sprite_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x122)]=function(){const _0x4f3f7f=_0x1f220f;if(!this[_0x4f3f7f(0x17b)])return;this[_0x4f3f7f(0x2bc)](),this[_0x4f3f7f(0x565)]();},Sprite_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x2bc)]=function(){const _0x469d35=_0x1f220f,_0x261928=this[_0x469d35(0x17b)]['textSizeEx'](this['_text']),_0x35031c=this[_0x469d35(0x17b)][_0x469d35(0x1ff)](),_0x3919ae=_0x261928[_0x469d35(0x59f)]+_0x35031c*0x2,_0x3d0b42=_0x261928[_0x469d35(0x405)];this[_0x469d35(0x17b)][_0x469d35(0x527)](0x0,0x0,_0x3919ae,_0x3d0b42),this[_0x469d35(0x17b)][_0x469d35(0x513)](),this[_0x469d35(0x121)]=this[_0x469d35(0x17b)][_0x469d35(0x1df)];},Sprite_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x565)]=function(){const _0x446b52=_0x1f220f,_0x59d810=this['_proxyWindow']['itemPadding']();this[_0x446b52(0x17b)][_0x446b52(0x5f9)](this[_0x446b52(0x44b)],_0x59d810,0x0);},Sprite_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x1c1)]=function(){const _0x462a30=_0x1f220f,_0x149919=VisuMZ['EventsMoveCore'][_0x462a30(0x454)][_0x462a30(0x40a)][_0x462a30(0x42a)],_0x22a803=$gameSystem[_0x462a30(0x431)]()||0x1;this[_0x462a30(0x2db)]['x']=this[_0x462a30(0x2db)]['y']=_0x149919/_0x22a803;},Sprite_EventLabel['prototype'][_0x1f220f(0x577)]=function(){const _0x37eb1f=_0x1f220f;if(!SceneManager[_0x37eb1f(0x567)])return;if(!SceneManager[_0x37eb1f(0x567)][_0x37eb1f(0x4ef)])return;const _0x5e5c43=SceneManager['_scene'][_0x37eb1f(0x4ef)][_0x37eb1f(0x561)](this['_event']);if(!_0x5e5c43)return;this['x']=this[_0x37eb1f(0x5c8)][_0x37eb1f(0x3f9)](),this['x']+=this[_0x37eb1f(0x5c8)][_0x37eb1f(0x375)][_0x37eb1f(0x289)],this['y']=this[_0x37eb1f(0x5c8)]['screenY']()-_0x5e5c43['height'],this['y']+=$gameSystem['windowPadding']()*-0.5,this['y']+=this[_0x37eb1f(0x5c8)][_0x37eb1f(0x375)][_0x37eb1f(0x2ae)];},Sprite_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x41a)]=function(){const _0x6c34fd=_0x1f220f;if(this['isLabelVisible']())this[_0x6c34fd(0x473)]+=this['opacitySpeed']();else{if(SceneManager['_scene'][_0x6c34fd(0xc3)]>0x0){if(_0x6c34fd(0xfc)===_0x6c34fd(0xfc))this[_0x6c34fd(0x473)]=0x0;else return _0x1b5e49[_0x6c34fd(0x141)][_0x6c34fd(0x25c)][_0x6c34fd(0x58d)](this,_0x2c3de9);}else this['opacity']-=this[_0x6c34fd(0x29b)]();}},Sprite_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x47b)]=function(){const _0x29ce8d=_0x1f220f;if(!$gameSystem['eventLabelsVisible']())return![];if(this[_0x29ce8d(0x5c8)]?.[_0x29ce8d(0x37e)])return![];if(this[_0x29ce8d(0x5c8)]&&this[_0x29ce8d(0x5c8)][_0x29ce8d(0x277)]<0x0)return![];if(SceneManager[_0x29ce8d(0x567)][_0x29ce8d(0xc3)]>0x0)return![];const _0x1c328b=$gamePlayer['x'],_0x6d5cbb=$gamePlayer['y'],_0x4bc17c=this['_event']['x'],_0x3dc015=this[_0x29ce8d(0x5c8)]['y'];if(this[_0x29ce8d(0x342)]===_0x1c328b&&this['_visiblePlayerY']===_0x6d5cbb&&this[_0x29ce8d(0x2a5)]===_0x4bc17c&&this['_visibleEventY']===_0x3dc015){if(_0x29ce8d(0x132)===_0x29ce8d(0x132))return this[_0x29ce8d(0x492)];else this[_0x29ce8d(0xda)](_0x259f76,_0x1ec74e);}this[_0x29ce8d(0x342)]=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x29ce8d(0x2a5)]=this['_event']['x'],this[_0x29ce8d(0x474)]=this[_0x29ce8d(0x5c8)]['y'];if($gameMap[_0x29ce8d(0x534)](_0x1c328b,_0x6d5cbb,_0x4bc17c,_0x3dc015)>this['_event']['labelWindowRange']())return this[_0x29ce8d(0x492)]=![],![];return this[_0x29ce8d(0x492)]=!![],!![];},Sprite_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x29b)]=function(){const _0x184aa4=_0x1f220f;return VisuMZ[_0x184aa4(0x141)]['Settings'][_0x184aa4(0x40a)]['OpacitySpeed'];},VisuMZ[_0x1f220f(0x141)]['Spriteset_Map_createLowerLayer']=Spriteset_Map['prototype'][_0x1f220f(0x524)],Spriteset_Map[_0x1f220f(0x362)][_0x1f220f(0x524)]=function(){const _0x302c25=_0x1f220f;VisuMZ['EventsMoveCore']['Spriteset_Map_createLowerLayer'][_0x302c25(0x58d)](this),this[_0x302c25(0x584)]();},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x3d5)]=Spriteset_Map[_0x1f220f(0x362)]['createShadow'],Spriteset_Map[_0x1f220f(0x362)][_0x1f220f(0x31e)]=function(){const _0x56f521=_0x1f220f;VisuMZ[_0x56f521(0x141)][_0x56f521(0x3d5)][_0x56f521(0x58d)](this),this[_0x56f521(0x417)]();},Spriteset_Map[_0x1f220f(0x362)][_0x1f220f(0x417)]=function(){const _0x3aacc1=_0x1f220f;if(!VisuMZ[_0x3aacc1(0x141)][_0x3aacc1(0x454)]['Movement'][_0x3aacc1(0x5f1)])return;for(const _0x4f1e5a of this['_characterSprites']){_0x3aacc1(0x140)!=='iiFSB'?this[_0x3aacc1(0x15a)](_0x4f1e5a):this['_eventIcon']['iconIndex']=_0x4ddcba(_0x5660ab['$1']);}},Spriteset_Map[_0x1f220f(0x362)][_0x1f220f(0x15a)]=function(_0x369c25){const _0x2355fe=_0x1f220f;_0x369c25['_shadowSprite']=new Sprite(),_0x369c25[_0x2355fe(0x353)][_0x2355fe(0x156)]=_0x369c25[_0x2355fe(0x420)]['shadowFilename'](),_0x369c25[_0x2355fe(0x353)][_0x2355fe(0x121)]=ImageManager['loadSystem'](_0x369c25[_0x2355fe(0x353)][_0x2355fe(0x156)]),_0x369c25[_0x2355fe(0x353)]['anchor']['x']=0.5,_0x369c25['_shadowSprite'][_0x2355fe(0xc0)]['y']=0x1,_0x369c25['_shadowSprite']['z']=0x0,this[_0x2355fe(0xf5)][_0x2355fe(0x33c)](_0x369c25[_0x2355fe(0x353)]);},Spriteset_Map[_0x1f220f(0x362)][_0x1f220f(0x541)]=function(){const _0x28fc12=_0x1f220f;if(!VisuMZ[_0x28fc12(0x141)][_0x28fc12(0x454)][_0x28fc12(0x4c9)][_0x28fc12(0x5f1)])return;for(const _0x7e5475 of this[_0x28fc12(0x1a0)]){if(_0x28fc12(0xb5)==='wtKAK')this[_0x28fc12(0xf5)][_0x28fc12(0x3db)](_0x7e5475[_0x28fc12(0x353)]);else return this['characterPatternYBasic']();}},Spriteset_Map[_0x1f220f(0x362)][_0x1f220f(0x584)]=function(){const _0x5cf4b6=_0x1f220f;this[_0x5cf4b6(0x12f)]=[];for(const _0x36b22b of $gameMap[_0x5cf4b6(0x275)]()){this[_0x5cf4b6(0x162)](_0x36b22b);}},Spriteset_Map[_0x1f220f(0x362)][_0x1f220f(0x162)]=function(_0x27753b){const _0x5be183=_0x1f220f;if(!this[_0x5be183(0x15d)](_0x27753b))return;let _0xc5f48d;const _0x391493=VisuMZ['EventsMoveCore'][_0x5be183(0x454)]['Label'][_0x5be183(0x3c4)]??!![];_0xc5f48d=_0x391493?new Sprite_EventLabel(_0x27753b):new Window_EventLabel(_0x27753b),_0xc5f48d['z']=0x8,_0xc5f48d[_0x5be183(0x5de)]=Sprite[_0x5be183(0x493)]++,this['_tilemap'][_0x5be183(0x33c)](_0xc5f48d),this[_0x5be183(0x12f)][_0x5be183(0x57e)](_0xc5f48d);},Spriteset_Map[_0x1f220f(0x362)]['isTargetEventValidForLabelWindow']=function(_0x5f437a){const _0x1d2f4f=_0x1f220f,_0xf4dd37=_0x5f437a['event']();if(_0xf4dd37[_0x1d2f4f(0x57b)]['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0xf4dd37[_0x1d2f4f(0x57b)]['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x1e0d20 of _0xf4dd37[_0x1d2f4f(0x1da)]){let _0x593d70='';for(const _0x3ac192 of _0x1e0d20[_0x1d2f4f(0x52e)]){[0x6c,0x198][_0x1d2f4f(0x220)](_0x3ac192[_0x1d2f4f(0x161)])&&(_0x593d70+=_0x3ac192[_0x1d2f4f(0x218)][0x0]);}if(_0x593d70['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x593d70[_0x1d2f4f(0x4db)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return _0x1d2f4f(0x3cf)!==_0x1d2f4f(0x3cf)?this[_0x1d2f4f(0x486)]()[_0x1d2f4f(0x160)](_0x2d080b,_0x33265e,_0x3a7e4c):!![];}return![];},Spriteset_Map[_0x1f220f(0x362)][_0x1f220f(0x59c)]=function(_0x477824){const _0x13cda7=_0x1f220f;this[_0x13cda7(0x1a0)]=this[_0x13cda7(0x1a0)]||[];const _0x3e178d=new Sprite_Character(_0x477824);this['_characterSprites'][_0x13cda7(0x57e)](_0x3e178d),this[_0x13cda7(0xf5)][_0x13cda7(0x33c)](_0x3e178d),this[_0x13cda7(0x15a)](_0x3e178d),this[_0x13cda7(0x162)](_0x477824),_0x3e178d[_0x13cda7(0x2c5)]();},Spriteset_Map[_0x1f220f(0x362)][_0x1f220f(0x3e8)]=function(){const _0x367a6b=_0x1f220f;if(!this['_labelWindows'])return;for(const _0x418d91 of this['_labelWindows']){_0x418d91&&(_0x418d91[_0x367a6b(0x342)]=undefined,_0x418d91[_0x367a6b(0x122)]());}},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x23e)]=Game_Message[_0x1f220f(0x362)][_0x1f220f(0x2d4)],Game_Message[_0x1f220f(0x362)]['setNumberInput']=function(_0x4ecd37,_0x3f6dfa){const _0x556f72=_0x1f220f;this['_selfTargetNumberInput']=$gameTemp[_0x556f72(0x330)](),VisuMZ[_0x556f72(0x141)][_0x556f72(0x23e)]['call'](this,_0x4ecd37,_0x3f6dfa);},VisuMZ[_0x1f220f(0x141)]['Window_NumberInput_start']=Window_NumberInput[_0x1f220f(0x362)]['start'],Window_NumberInput[_0x1f220f(0x362)]['start']=function(){const _0x6d4da5=_0x1f220f;$gameTemp[_0x6d4da5(0x358)]($gameMessage[_0x6d4da5(0x2ba)]),VisuMZ[_0x6d4da5(0x141)][_0x6d4da5(0x4c1)][_0x6d4da5(0x58d)](this),$gameTemp[_0x6d4da5(0x328)]();},VisuMZ[_0x1f220f(0x141)]['Window_NumberInput_processOk']=Window_NumberInput['prototype']['processOk'],Window_NumberInput[_0x1f220f(0x362)][_0x1f220f(0x250)]=function(){const _0x156b32=_0x1f220f;$gameTemp[_0x156b32(0x358)]($gameMessage[_0x156b32(0x2ba)]),VisuMZ[_0x156b32(0x141)][_0x156b32(0x45a)][_0x156b32(0x58d)](this),$gameTemp[_0x156b32(0x328)](),$gameMessage[_0x156b32(0x2ba)]=undefined;},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x4ed)]=Game_Message['prototype'][_0x1f220f(0x5f0)],Game_Message[_0x1f220f(0x362)][_0x1f220f(0x5f0)]=function(_0x12f0f3,_0x560596){const _0x417797=_0x1f220f;this['_selfTargetItemChoice']=$gameTemp['getSelfTarget'](),VisuMZ['EventsMoveCore'][_0x417797(0x4ed)][_0x417797(0x58d)](this,_0x12f0f3,_0x560596);},VisuMZ['EventsMoveCore'][_0x1f220f(0x367)]=Window_EventItem[_0x1f220f(0x362)]['onOk'],Window_EventItem[_0x1f220f(0x362)][_0x1f220f(0x1b2)]=function(){const _0x304482=_0x1f220f;$gameTemp[_0x304482(0x358)]($gameMessage[_0x304482(0x237)]),VisuMZ[_0x304482(0x141)][_0x304482(0x367)]['call'](this),$gameTemp[_0x304482(0x328)](),$gameMessage[_0x304482(0x237)]=undefined;},VisuMZ[_0x1f220f(0x141)][_0x1f220f(0x38e)]=Window_EventItem[_0x1f220f(0x362)][_0x1f220f(0x5f6)],Window_EventItem['prototype'][_0x1f220f(0x5f6)]=function(){const _0x5d942a=_0x1f220f;$gameTemp['registerSelfTarget']($gameMessage[_0x5d942a(0x237)]),VisuMZ['EventsMoveCore'][_0x5d942a(0x38e)][_0x5d942a(0x58d)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x5d942a(0x237)]=undefined;},VisuMZ[_0x1f220f(0x141)]['Window_Message_startMessage']=Window_Message['prototype'][_0x1f220f(0x36f)],Window_Message[_0x1f220f(0x362)][_0x1f220f(0x36f)]=function(){const _0x1e55e8=_0x1f220f;$gameMessage[_0x1e55e8(0x380)](),VisuMZ[_0x1e55e8(0x141)][_0x1e55e8(0x36e)]['call'](this),$gameTemp['clearSelfTarget']();},VisuMZ['EventsMoveCore'][_0x1f220f(0x429)]=Window_ScrollText[_0x1f220f(0x362)][_0x1f220f(0x36f)],Window_ScrollText['prototype']['startMessage']=function(){const _0x5a4527=_0x1f220f;$gameMessage[_0x5a4527(0x380)](),VisuMZ['EventsMoveCore'][_0x5a4527(0x429)][_0x5a4527(0x58d)](this),$gameTemp[_0x5a4527(0x328)]();};function Window_EventLabel(){const _0x33b68c=_0x1f220f;this[_0x33b68c(0xd8)](...arguments);}Window_EventLabel[_0x1f220f(0x362)]=Object['create'](Window_Base[_0x1f220f(0x362)]),Window_EventLabel[_0x1f220f(0x362)]['constructor']=Window_EventLabel,Window_EventLabel[_0x1f220f(0x362)][_0x1f220f(0xd8)]=function(_0x334a0c){const _0x196888=_0x1f220f;this[_0x196888(0x5c8)]=_0x334a0c;const _0x4b278a=new Rectangle(0x0,0x0,Graphics['boxWidth']/0x4,this['fittingHeight'](0x1));this['initMembers'](),Window_Base['prototype'][_0x196888(0xd8)][_0x196888(0x58d)](this,_0x4b278a),this[_0x196888(0x5a6)]=0x0,this['setBackgroundType'](0x2),this['_text']='';},Window_EventLabel[_0x1f220f(0x362)]['initMembers']=function(){const _0x3381b0=_0x1f220f;this[_0x3381b0(0x37f)]=![],this[_0x3381b0(0x139)]=$gameScreen[_0x3381b0(0x45f)](),this[_0x3381b0(0x343)]=this[_0x3381b0(0x5c8)][_0x3381b0(0x3f9)](),this[_0x3381b0(0x5a8)]=this[_0x3381b0(0x5c8)]['screenY'](),this[_0x3381b0(0x46e)]=this[_0x3381b0(0x5c8)]['_labelWindow'][_0x3381b0(0x289)],this['_eventLabelOffsetY']=this[_0x3381b0(0x5c8)][_0x3381b0(0x375)][_0x3381b0(0x2ae)],this['_eventPageIndex']=this[_0x3381b0(0x5c8)][_0x3381b0(0x277)],this[_0x3381b0(0x492)]=this['isLabelVisible'](),this[_0x3381b0(0x3e7)]=$gameSystem[_0x3381b0(0xf2)](),this[_0x3381b0(0x342)]=$gamePlayer['x'],this[_0x3381b0(0x1cc)]=$gamePlayer['y'],this[_0x3381b0(0x2a5)]=this[_0x3381b0(0x5c8)]['x'],this[_0x3381b0(0x474)]=this['_event']['y'];},Window_EventLabel[_0x1f220f(0x362)]['update']=function(){const _0x301a60=_0x1f220f;Window_Base['prototype'][_0x301a60(0x2c5)][_0x301a60(0x58d)](this);if(!this['needsUpdate']())return;this[_0x301a60(0x4fd)](),this[_0x301a60(0x1c1)](),this[_0x301a60(0x577)](),this[_0x301a60(0x41a)]();},Window_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x48c)]=function(){const _0x1abf28=_0x1f220f;if(!this[_0x1abf28(0x5c8)])return![];if(!this[_0x1abf28(0x5c8)][_0x1abf28(0x375)])return![];if(this[_0x1abf28(0x458)]!==this[_0x1abf28(0x5c8)][_0x1abf28(0x277)])return!![];if(this['_event'][_0x1abf28(0x37e)]&&!this[_0x1abf28(0x37f)])return!![];if(this[_0x1abf28(0x5c8)][_0x1abf28(0x375)]['text']==='')return![];if(this['_screenZoomScale']!==$gameScreen[_0x1abf28(0x45f)]())return!![];if(this[_0x1abf28(0x343)]!==this[_0x1abf28(0x5c8)]['screenX']())return!![];if(this[_0x1abf28(0x5a8)]!==this[_0x1abf28(0x5c8)]['screenY']())return!![];if(this[_0x1abf28(0x46e)]!==this[_0x1abf28(0x5c8)]['_labelWindow'][_0x1abf28(0x289)])return!![];if(this[_0x1abf28(0x452)]!==this[_0x1abf28(0x5c8)]['_labelWindow'][_0x1abf28(0x2ae)])return!![];if(this['_visiblePlayerX']!==$gamePlayer['x'])return!![];if(this['_visiblePlayerY']!==$gamePlayer['y'])return!![];if(this[_0x1abf28(0x2a5)]!==this[_0x1abf28(0x5c8)]['x'])return!![];if(this[_0x1abf28(0x474)]!==this['_event']['y'])return!![];if(this[_0x1abf28(0x3e7)]!==$gameSystem[_0x1abf28(0xf2)]())return!![];if(this[_0x1abf28(0x492)]&&this['contentsOpacity']<0xff)return!![];if(!this[_0x1abf28(0x492)]&&this[_0x1abf28(0x5a6)]>0x0)return!![];if(SceneManager[_0x1abf28(0x567)][_0x1abf28(0xc3)]>0x0)return!![];return![];},Window_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x4fd)]=function(){const _0x5df4bf=_0x1f220f;this['_event'][_0x5df4bf(0xd1)]()!==this[_0x5df4bf(0x44b)]&&('wbPca'===_0x5df4bf(0x4e9)?(this[_0x5df4bf(0x44b)]=this[_0x5df4bf(0x5c8)]['labelWindowText'](),this[_0x5df4bf(0x122)]()):_0x486073['EventsMoveCore'][_0x5df4bf(0x596)]['call'](this,_0x3d9268));},Window_EventLabel['prototype'][_0x1f220f(0x1c1)]=function(){const _0x55ae93=_0x1f220f;this['scale']['x']=0x1/$gameScreen[_0x55ae93(0x45f)](),this[_0x55ae93(0x2db)]['y']=0x1/$gameScreen[_0x55ae93(0x45f)](),this['_screenZoomScale']=$gameScreen[_0x55ae93(0x45f)]();},Window_EventLabel['prototype']['updatePosition']=function(){const _0x3c4862=_0x1f220f;if(!SceneManager[_0x3c4862(0x567)])return;if(!SceneManager[_0x3c4862(0x567)][_0x3c4862(0x4ef)])return;const _0x3bb861=SceneManager[_0x3c4862(0x567)][_0x3c4862(0x4ef)][_0x3c4862(0x561)](this[_0x3c4862(0x5c8)]);if(!_0x3bb861)return;this['x']=Math[_0x3c4862(0xdb)](this[_0x3c4862(0x5c8)]['screenX']()-Math[_0x3c4862(0x187)](this['width']*this[_0x3c4862(0x2db)]['x']/0x2)),this['x']+=this[_0x3c4862(0x5c8)]['_labelWindow'][_0x3c4862(0x289)],this['y']=this[_0x3c4862(0x5c8)]['screenY']()-_0x3bb861[_0x3c4862(0x405)],this['y']+=Math[_0x3c4862(0xdb)]($gameSystem[_0x3c4862(0x55f)]()*0.5),this['y']-=Math[_0x3c4862(0xdb)](this[_0x3c4862(0x405)]*this[_0x3c4862(0x2db)]['y']),this['y']+=this['_event'][_0x3c4862(0x375)]['offsetY'],this[_0x3c4862(0x37f)]=this[_0x3c4862(0x5c8)][_0x3c4862(0x37e)],this[_0x3c4862(0x343)]=this[_0x3c4862(0x5c8)][_0x3c4862(0x3f9)](),this[_0x3c4862(0x5a8)]=this[_0x3c4862(0x5c8)][_0x3c4862(0x130)](),this['_eventLabelOffsetX']=this[_0x3c4862(0x5c8)][_0x3c4862(0x375)][_0x3c4862(0x289)],this[_0x3c4862(0x452)]=this[_0x3c4862(0x5c8)][_0x3c4862(0x375)][_0x3c4862(0x2ae)],this[_0x3c4862(0x458)]=this['_event'][_0x3c4862(0x277)],this[_0x3c4862(0x37f)]&&(this[_0x3c4862(0x5a6)]=0x0);},Window_EventLabel[_0x1f220f(0x362)]['updateOpacity']=function(){const _0x58d4a9=_0x1f220f;if(this[_0x58d4a9(0x47b)]())this[_0x58d4a9(0x5a6)]+=this[_0x58d4a9(0x29b)]();else SceneManager['_scene'][_0x58d4a9(0xc3)]>0x0?this[_0x58d4a9(0x5a6)]=0x0:this[_0x58d4a9(0x5a6)]-=this['opacitySpeed']();},Window_EventLabel['prototype'][_0x1f220f(0x47b)]=function(){const _0x5e9978=_0x1f220f;if(!$gameSystem[_0x5e9978(0xf2)]())return![];if(this[_0x5e9978(0x5c8)]?.[_0x5e9978(0x37e)])return![];if(SceneManager['_scene'][_0x5e9978(0xc3)]>0x0)return![];const _0x48d31d=$gamePlayer['x'],_0x125ee6=$gamePlayer['y'],_0x26a119=this[_0x5e9978(0x5c8)]['x'],_0x1afd32=this[_0x5e9978(0x5c8)]['y'];if(this[_0x5e9978(0x342)]===_0x48d31d&&this['_visiblePlayerY']===_0x125ee6&&this['_visibleEventX']===_0x26a119&&this[_0x5e9978(0x474)]===_0x1afd32)return _0x5e9978(0x4c6)==='PAPBe'?this[_0x5e9978(0x492)]:_0x59b78c['EventsMoveCore'][_0x5e9978(0x454)][_0x5e9978(0x40a)][_0x5e9978(0x41d)];this['_visiblePlayerX']=$gamePlayer['x'],this['_visiblePlayerY']=$gamePlayer['y'],this[_0x5e9978(0x2a5)]=this['_event']['x'],this[_0x5e9978(0x474)]=this['_event']['y'];if($gameMap[_0x5e9978(0x534)](_0x48d31d,_0x125ee6,_0x26a119,_0x1afd32)>this['_event']['labelWindowRange']())return this[_0x5e9978(0x492)]=![],![];return this[_0x5e9978(0x492)]=!![],!![];},Window_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x29b)]=function(){const _0x4e1662=_0x1f220f;return VisuMZ['EventsMoveCore'][_0x4e1662(0x454)][_0x4e1662(0x40a)]['OpacitySpeed'];},Window_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x2bc)]=function(){const _0x574c34=_0x1f220f,_0x36248b=this[_0x574c34(0x316)](this[_0x574c34(0x44b)]);this[_0x574c34(0x59f)]=_0x36248b[_0x574c34(0x59f)]+($gameSystem['windowPadding']()+this[_0x574c34(0x1ff)]())*0x2,this['height']=Math['max'](this[_0x574c34(0x5db)](),_0x36248b[_0x574c34(0x405)])+$gameSystem[_0x574c34(0x55f)]()*0x2,this[_0x574c34(0x513)]();},Window_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x5db)]=function(){const _0x57e2e4=_0x1f220f;return VisuMZ[_0x57e2e4(0x141)][_0x57e2e4(0x454)]['Label'][_0x57e2e4(0x381)];},Window_EventLabel['prototype'][_0x1f220f(0x5f2)]=function(){const _0x2f2100=_0x1f220f;Window_Base[_0x2f2100(0x362)][_0x2f2100(0x5f2)][_0x2f2100(0x58d)](this),this['contents'][_0x2f2100(0xc5)]=this[_0x2f2100(0x2f7)]();},Window_EventLabel[_0x1f220f(0x362)]['defaultFontSize']=function(){const _0x54e8b6=_0x1f220f;return VisuMZ[_0x54e8b6(0x141)][_0x54e8b6(0x454)]['Label']['FontSize'];},Window_EventLabel['prototype'][_0x1f220f(0x122)]=function(){const _0x29bd71=_0x1f220f;this[_0x29bd71(0x2bc)](),this[_0x29bd71(0x1df)][_0x29bd71(0xca)]();const _0x27aaec=this['_text'][_0x29bd71(0x50c)](/[\r\n]+/);let _0x2f8958=0x0;for(const _0x48dbbd of _0x27aaec){const _0x1b1aff=this[_0x29bd71(0x316)](_0x48dbbd),_0xdba6a7=Math[_0x29bd71(0x187)]((this[_0x29bd71(0x566)]-_0x1b1aff[_0x29bd71(0x59f)])/0x2);this[_0x29bd71(0x5f9)](_0x48dbbd,_0xdba6a7,_0x2f8958),_0x2f8958+=_0x1b1aff[_0x29bd71(0x405)];}},Window_EventLabel[_0x1f220f(0x362)]['processDrawIcon']=function(_0xfd5409,_0x4d3480){const _0x4c5c90=_0x1f220f;if(_0x4d3480[_0x4c5c90(0x3f3)]){if('YWLPC'!==_0x4c5c90(0x523)){this[_0x4c5c90(0x232)](_0xa7796f);if(_0x5266bf['includes'](0x0)&&this['startMapCommonEventOnOKTarget']()===_0x4c5c90(0x1ec))this[_0x4c5c90(0x4d2)](this['x'],this['y']);else(_0x5cf99b[_0x4c5c90(0x220)](0x1)||_0x8c728a[_0x4c5c90(0x220)](0x2))&&this['startMapCommonEventOnTouch']();}else this['drawIcon'](_0xfd5409,_0x4d3480['x']+0x2,_0x4d3480['y']);}_0x4d3480['x']+=Math[_0x4c5c90(0x2de)](this[_0x4c5c90(0x10e)](),ImageManager[_0x4c5c90(0x464)])+0x4;},Window_EventLabel['prototype']['drawIcon']=function(_0xdd58b1,_0xb987f7,_0x52df76){const _0x53890f=_0x1f220f,_0x3bb3e2=ImageManager[_0x53890f(0x57c)](_0x53890f(0x5ba)),_0x2d014b=ImageManager[_0x53890f(0x464)],_0x1a37e1=ImageManager['iconHeight'],_0x45063c=_0xdd58b1%0x10*_0x2d014b,_0x236a54=Math['floor'](_0xdd58b1/0x10)*_0x1a37e1,_0x230f35=Math[_0x53890f(0x2de)](this['iconSize']()),_0x506366=Math[_0x53890f(0x2de)](this[_0x53890f(0x10e)]());this[_0x53890f(0x1df)]['blt'](_0x3bb3e2,_0x45063c,_0x236a54,_0x2d014b,_0x1a37e1,_0xb987f7,_0x52df76,_0x230f35,_0x506366);},Window_EventLabel[_0x1f220f(0x362)][_0x1f220f(0x10e)]=function(){const _0x26dfef=_0x1f220f;return VisuMZ[_0x26dfef(0x141)][_0x26dfef(0x454)][_0x26dfef(0x40a)][_0x26dfef(0xd9)];};