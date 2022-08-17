//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.45;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.45] [EventsMoveCore]
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

function _0x4e52(_0x121cb9,_0x2bcded){const _0x49b53d=_0x49b5();return _0x4e52=function(_0x4e52c7,_0x2e8817){_0x4e52c7=_0x4e52c7-0xf1;let _0x2fc330=_0x49b53d[_0x4e52c7];return _0x2fc330;},_0x4e52(_0x121cb9,_0x2bcded);}const _0x237a7a=_0x4e52;function _0x49b5(){const _0x51319d=['IqAcx','setEventIconDataKey','Window_NumberInput_processOk','isSmartEventCollisionOn','setupPageSettings','FRUSTRATION','push','updateEventLabelText','%1DockRegionOnly','RegionOk','checkAdvancedSwitchVariablePresent','moveBackToRandomHome','mapValue','moveTypeRandom','SpawnEventAtTerrainTag','isTile','DOWN','EventTimerPause','9AJEgtN','_callEventData','_visibleEventY','boat','Game_CharacterBase_pattern','_eventId','onLoadSuccess','PostSpawnJS','Game_SelfSwitches_setValue','bkGQE','processMoveRouteHugWall','SpawnEventDespawnTerrainTags','HZWHC','fontFace','mYBSS','vehicle','isEventRunning','2653983VzGnBy','_eventScreenX','1134809bjVFQd','_seconds','offsetX','ANGER','Player','posEventsMoveCore','loadDataFile','cMPhU','Map\x20%1\x20Switch\x20%2','SelfVariableID','moveSynchType','ARRAYFUNC','parameters','template','_trigger','EventAllow','_character','event','advancedValue','VS8','changeSpeed','Sprite_Balloon_updatePosition','updateEventMirrorSprite','setBackgroundType','isTransparent','FollowerReset','AOtHs','clamp','LOVE','kYggR','canStartLocalEvents','LEFT\x20TO\x20RIGHT','processMoveRouteTeleportTo','EventTemplates','add','isSceneMap','createContents','Operation','uwDaM','isRunning','FontSize','switch2Valid','setItemChoice','isDiagonalDirection','_needsPeriodicRefresh','Speed','Game_Follower_chaseCharacter','canMove','itemPadding','round','processMoveSynchApproach','_screenZoomScale','isSupportDiagonalMovement','eCglm','zoomScale','skNtI','isShadowShrink','_moveSpeed','updateParallel','EventAutoMovement','cwY','Game_Event_findProperPageIndex','Game_Vehicle_isLandOk','_visiblePlayerX','none','checkActivationProximity','isDestinationValid','updateOpacity','_PlayerDiagonalSetting','TiltRight','ThhvE','fittingHeight','ovaaG','_eventPageIndex','THkfI','setMoveSpeed','iconWidth','deletePreservedMorphEventDataKey','Button','updateShadowChanges','_expireCommonEvent','Direction','outlineColor','xxHkT','EnableDir8','moveSynchTarget','registerCommand','Template','eNDCK','PostMorphJS','checkCollisionKeywords','_eventIcon','CallEvent','UPbmq','padding','inBattle','updateScale','attachPictureScale','useCarryPoseForIcons','NuMTL','DashOnLadder','setCharacterBitmap','setLastPluginCommandInterpreter','EnableDashTilt','variableValid','JwjSF','processMoveRouteBalloon','constructor','isPressed','IUZXo','ship','visible','_isObjectCharacter','KPZZZ','attachPictureSettings','aiuAe','JzZWW','isAdvancedVariable','PageId','WdDTo','labelWindowRange','oEQVK','getInputDir8','_pattern','xOeRv','cwX','IconBufferY','findProperPageIndex','updateStop','NNHYo','HvOfz','max','processMoveSynchReverseMimic','isAnyEventStarting','LIGHT','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','SwitchId','createSaveEventLocationData','Game_Event_update','exit','SCREEN','Self\x20Switch\x20%1','YIbit','bufferY','setPlayerControlDisable','pCFfC','isSpriteVS8dir','Game_CharacterBase_increaseSteps','Map\x20%1\x20Variable\x20%2','updateRoutineMove','RemovePreserve','apply','Game_Follower_initialize','chaseCharacter','processOk','IAwQT','_moveRouteIndex','isAirshipPassable','setTileBitmap','MUSIC-NOTE','events','OZxrp','isPassableByAnyDirection','Game_CharacterBase_characterIndex','isTriggerIn','setDiagonalDirection','IconIndex','_customZ','hBTCz','Game_Event_isCollidedWithPlayerCharacters','cGePa','KnuuF','gwIxT','tjhrg','bNJKC','Movement','horz\x20mirror','updateSaveEventLocation','setDashingEnabled','processSaveEventLocation','IconBlendMode','follower','ConvertParams','boxWidth','Rope','hasStepAnime','min','EventTimerExpireClear','_visibleEventX','Game_CharacterBase_update','frontY','removeMorph','Game_Switches_value','Scene_Boot_onDatabaseLoaded','Collision','spawnPreserved','_eventScreenY','KihVn','Game_Map_setupEvents','VisuMZ_0_CoreEngine','WalkAllow','FollowerSetControl','isPreventSelfMovement','away','SILENCE','drawText','some','command108','Game_Player_executeMove','VDNGR','randomInt','Game_Character_processMoveCommand','updateMove','setChaseOff','forceMoveRoute','loadSystem','isSelfSwitch','mFerR','getPosingCharacterDirection','FastForwardKey','_mirrorSprite','Game_Message_add','isSelfVariable','_spawnedEvents','7454688buPOWZ','realMoveSpeed','processMoveRouteJumpForward','destinationY','loadCPC','CZFrZ','_eventLabelOffsetY','urWwx','executeMoveDir8','_interpreter','PEtOt','updateText','_eventIconSprite','iconSize','despawnAtXY','SpriteBased','Allow','4LuwTzJ','isValid','canPassDiagonally','isJumping','Game_Map_setupEvents_SelfReset','SelfSwitchID','MuUXf','concat','clearStepPattern','USER-DEFINED\x203','description','BUVXL','down','initEventsMoveCoreEffects','Game_Character_forceMoveRoute','pos','ARRAYNUM','Game_Player_checkEventTriggerHere','morphIntoTemplate','MapSwitches','EventId','Game_Map_events','enHhC','deleteSavedEventLocation','deltaXFrom','processMoveRouteStepToCharacter','GaTlr','mIxXX','General','processMoveRouteTeleportToCharacter','drawTextEx','aagvF','qbkUA','_labelWindows','createCharacterShadow','_commonEventId','OMBXf','isSpawnHitboxCollisionOk','RvGCD','defaultFontSize','isBusy','processMoveSynchMimic','initFollowerController','Game_Event_updateParallel','Game_Map_update','EventTimerSpeed','Game_Interpreter_character','Game_CharacterBase_direction','Enable','_forceCarrying','frontX','target','APWpQ','initMembersEventsMoveCore','mainFontSize','isPlayerForceHidden','processMoveSynchMirrorVert','isDashingEnabled','processMoveRoutePatternLock','USER-DEFINED\x204','attachPictureOffsetY','trim','getDirectionFromPoint','resetExitSelfSwitches','lastMovedDirection','keyUX','Game_Enemy_meetsSwitchCondition','Game_Variables_value','sEtnR','ZPcad','uDVLD','clearPose','_characterSprites','region','prepareSpawnedEventAtTerrainTag','_randomHomeX','PostCopyJS','LPyqq','screenY','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','isMapPassable','TRUE','opacityDelta','oDaWT','setup','Spriteset_Map_createLowerLayer','SpawnEventDespawnRegions','turnLeft90','_randomMoveWeight','initMembers','deleteIconsOnEventsData','getLastPluginCommandInterpreter','Frames','executeCommandCommonEvent','XAgzg','dbEFq','processMoveRouteSelfSwitch','rotation','return\x20%1','resetSelfSwitchesForEvent','VehicleAllow','mOgpF','_selfEvent','despawnTerrainTags','onChange','Preserve','findDirectionTo','setupAttachPictureBitmap','initEventsMoveCoreSettings','EventsMoveCore','conditions','turnAwayFromPoint','_eventMorphData','_selfTarget','startMapCommonEventOnTouch','DiagonalSpeedMultiplier','hasEventIcon','clearCarrying','remove','isEventClickTriggered','RegionTouch','fnbYJ','pageId','IqJru','FollowerID','processMoveRouteMoveRepeat','MoveRouteIndex','clearPageSettings','kPeSf','turnRight90','isOnRope','requestBalloon','createProxyWindow','attachPictureFilename','Azbkx','reverse\x20copy','text','unlock','Game_CharacterBase_updatePattern','fNtRC','isVisible','Game_Event_initialize','createShadows','isAutoBufferIcon','PreCopyJS','yCcki','XpBve','findTargetSprite','STRUCT','oIQdK','znjDI','setPose','TkZmF','isRegionForbidPass','MUSIC\x20NOTE','ITdxM','setPosition','checkSmartEventCollision','Disable','createSpawnedEventWithData','Chase','YTqoY','isPlaytest','dashSpeedModifier','innerWidth','PlayerAllow','ncCiU','moveRouteIndex','RIhQl','_patternLocked','MapID','eraseEvent','xMJoW','pnSep','NEWnG','forceCarrying','_eventCache','ZZZ','Icon','getEventIconData','isDashing','_alwaysUpdateMove','_vehicleType','SYyQs','_tilemap','executeMove','PosY','toLowerCase','DefaultShadow','xrIFx','switches','_diagonalSupport','eventId','registerSelfTarget','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','jJRmo','zRXJN','Passability','setAllowEventAutoMovement','attachPictureBlendMode','checkEventsMoveCoreStringTags','value','updatePattern','_comments','pages','Airship','posNt','yEMng','clearDashing','isRegionAllowPass','knJOq','mirror\x20vertical','getControlledFollowerID','xRXCP','hasCPCs','AfADH','_selfTargetItemChoice','Game_Message_setNumberInput','radius','ypChy','_labelWindow','processMoveRouteSelfVariable','deltaY','isShadowVisible','_cpc','match','ytsBK','Sprite_Character_update','ARRAYSTRUCT','BVbPO','setupEvents','Step2EventId','_text','Hours','FAMSJ','EventIconChange','PIHqx','processMoveRouteStepFrom','KaCdK','isLabelVisible','jump','textSizeEx','Game_CharacterBase_realMoveSpeed','_chaseOff','_moveOnlyRegions','characterName','VariableId','frameCount','isMoveOnlyRegionPassable','shadowFilename','RIGHT\x20TO\x20LEFT','isPassable','setSelfValue','_working','MQZTG','increaseSteps','parse','%1Forbid','isPosing','wZigs','meetsSwitchCondition','MessageCore','IozLa','Forbid','MmteZ','adjustDir8MovementSpeed','AutoBalloon','TOGGLE','isShip','moveTowardPoint','addLoadListener','wXIkC','pVVKN','setEventIconData','EventTimerExpireEvent','type','resetFontSettings','_EventIcons','call','SpIWY','startCallEvent','approach','BufferY','contentsOpacity','roundY','log','RandomMoveWeight','EHhiY','_moveRoute','Game_CharacterBase_initMembers','registerSelfEvent','Game_Event_start','NHTZm','KNEEL','BlendMode','SPIN\x20CLOCKWISE','updateEventIconSprite','ALLOW_LADDER_DASH','JSON','UPPER\x20LEFT','EventID','shift','Game_Switches_setValue','checkEventTriggerThere','isMovementSucceeded','_followerControlID','custom','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','YmUKN','_actuallyMoving','canPass','bvykz','DTaLS','Game_Map_refresh','Hidden','Game_CharacterBase_isDashing','%1,%2,','setDestination','TiltVert','PXkRP','setEventLabelsVisible','oLDCb','setupPlayerVisibilityOverrides','_direction','createIconSprite','QSECe','turn180','removeTemporaryMapSpawnedEvents','resume','visibleRange','initMoveSpeed','jHFis','TuJho','initialize','ShipSpeed','Sprite_Character_characterPatternY','isSpawnedEvent','updateMoveSynch','disable','Game_Event_event','aEWnv','qkJzM','_eventCopyData','startMapCommonEventOnOK','offsetY','refreshBushDepth','_forceHideFollower','%1,','DEFAULT_SHIFT_Y','_characterIndex','nIKFf','_scene','createSpawnedEvent','_forceShowPlayer','prepareSpawnedEventAtRegion','Game_CharacterBase_hasStepAnime','Region%1','WYYYp','_paused','_SavedEventLocations','_eventLabelOffsetX','timerText','aWgjG','_callEventMap','EventLocationSave','page','_PreservedEventMorphData','contents','USER-DEFINED\x205','height','PlayerIconDelete','labelWindowText','jeJdj','Region','_reflection','width','EVAL','isCollidedWithEvents','setupMorphEvent','startEncounterEffect','setControlledFollowerID','_periodicRefreshTimer','despawnRegions','BoatSpeed','createShadow','eventLabelsVisible','requestAnimation','_advancedSwitchVariable','updateBitmapSmoothing','setWaitMode','Game_CharacterBase_isTransparent','EventLabelRefresh','onCancel','execute','SuccessSwitchId','EventLocationCreate','BrImH','Sprite_Character_initMembers','prototype','Game_Temp_setDestination','isDashDisabled','bind','_attachPictureSprite','mnbce','checkExistingEntitiesAt','processMoveSynchCustom','convertSelfVariableValuesInScriptCall','setupSpawnedEvents','_forceHidePlayer','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_moveAllowPlayerCollision','_poseDuration','getPose','getSavedEventLocation','VMRLg','getDiagonalDestination','pattern','process_VisuMZ_EventsMoveCore_Switches_Variables','CNrgL','processMoveSynch','updateTilt','hasDragonbones','XPyjO','eventsXyNt','format','IconSet','shadowX','clearSpriteOffsets','roundX','ccwX','scale','_lastMovedDirection','NORMAL','setDirection','sVBDU','slice','GhqBb','processMoveRouteJumpToCharacter','MapVariables','_frames','yuexj','processMoveRouteFadeOut','_forceShowFollower','adjustMoveSynchOpacityDelta','StrictCollision','IconBufferX','_waitMode','Game_Timer_stop','xyoJi','WxOgg','_filename','erase','FavorHorz','isTargetEventValidForLabelWindow','onDatabaseLoaded','CPCsMet','Game_SelfSwitches_value','random','fwqgu','7Pmpxkr','_regionRules','spawnEventId','isLongPressed','_selfTargetNumberInput','Minutes','_MapSpawnedEventData','isPlayerForceShown','gainFrames','ShowShadows','ShiftY','SpawnEventAtXY','Step1MapId','UNTITLED','NUM','delay','kqDqs','Game_CharacterBase_canPass','length','_activationProximityAutoTriggerBypass','STR','isNearTheScreen','Game_Map_event','setupCopyEvent','dZwxF','filename','eventsXy','createLabelWindowForTarget','CUHup','Game_Followers_isVisible','setupRegionRestrictions','variables','Toggle','JmRdM','distance','Game_Troop_meetsConditionsCPC','Letter','LOWER\x20LEFT','SOzQq','TRUdJ','ARRAYEVAL','CommonEventID','updatePosition','_opacity','Scene_Load_onLoadSuccess','startMapCommonEventOnOKTarget','EXCLAMATION','lSwYH','Window_Message_startMessage','_DisablePlayerControl','timer','character','indexOf','Game_Map_isDashDisabled','hasAdvancedSwitchVariable','SUZRT','Game_CharacterBase_screenX','Qftgv','SWEAT','setupSaveEventLocations','stop','morphInto','Game_System_initialize','VuSEr','BufferX','createBitmap','_pageIndex','isEventOverloaded','XkqpU','$preloadedMap_%1','trigger','terrainTag','sivXA','setupFollowerVisibilityOverrides','HMPH','kxGPH','toUpperCase','_realY','update','OperateValues','AllForbid','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','turnTowardPoint','%1Dock','653235LTzCQK','_lastAttachPictureScale','yWQBz','bitmap','absDistance','PeWof','LIGHT-BULB','Window_NumberInput_start','selfValue','FollowerSetTargetChase','isPlayerControlDisabled','TemplateName','StopAutoMoveEvents','KPhTc','OpacitySpeed','needsAttachPictureUpdate','Game_Map_parallelCommonEvents','parallelCommonEvents','switchId','unlockEvent','IKuMO','addChild','oVzIN','MULTIPLY','iconHeight','COBWEB','NvEgC','spriteId','weAGo','rvWjJ','_addedHitbox','variableId','EventLabelVisible','Walk','create','_stepPattern','_spriteset','kNuKc','fGyQt','Scene_Map_startEncounterEffect','Game_Timer_onExpire','name','processMoveRouteAnimation','mjBCL','Ship','SelfDataResetAll','_cacheSystemVisible','Sprite_Balloon_setup','setupChild','CarryPose','FALSE','processMoveRouteMoveTo','MoveAllSynchTargets','_cacheVisibility','LOfCF','FKwew','updateEventCustomZ','fxYBF','moveStraight','roundXWithDirection','backX','SelfSwitches','setBalloonPose','reverse\x20mimic','Game_Event_updateSelfMovement','PreloadedMaps','FrgPI','_inputTime','Visible','_spriteOffsetX','VICTORY','dNckK','_lastAttachPictureFilename','meetActivationProximityConditions','setMovementSuccess','1781542IjJMgz','saveEventLocation','pluginCommandCallEvent','XokJr','updatePatternEventsMoveCore','Map%1-Event%2','mXYdu','ccwY','refreshIfNeeded','clearEventCache','setupSpawn','setPlayerDiagonalSetting','SPIN\x20ACW','getInputDirection','right','kamkd','moveDiagonally','isCollidedWithPlayerCharacters','_shadowGraphic','LVYnw','of\x20Preloaded\x20Maps.\x0a\x0a','umLcM','isEmptyCharacter','moveTowardCharacter','uPFUn','Settings','Window_EventItem_onCancel','isAdvancedSwitch','abs','setupEventsMoveCoreCommentTags','Game_Event_meetsConditionsCPC','dGlSr','updateWaitMode','Game_Event_locate','DashingEnable','Sprite_Character_setTileBitmap','LineHeight','turnTowardCharacter','Game_Event_checkEventTriggerAuto','opacity','TGEUr','PdbPx','start','updatePeriodicRefresh','startMessage','meetActivationRegionConditions','Xgulh','savePreservedMorphEventDataKey','refreshEventLabels','%1%2','MapId','enable','_eventErased','updateEventsAndMovementCore','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','qChwZ','ITEM','initEventsMoveCore','GfcFj','_followerChaseOff','RIGHT','xpPUI','checkValidEventerMap','YSgIf','forceDashing','zIXUb','LEFT','_attachPicture','Sprite_Character_setCharacterBitmap','KKzZT','areFollowersForceHidden','_encounterEffectDuration','splice','needsUpdate','_counter','WPprL','_saveEventLocation','Game_Message_setItemChoice','CvSgl','lastSpawnedEvent','oBVQH','pause','mOnZw','Value','drawIcon','characterPatternYBasic','correctFacingDirection','aecyT','processMoveRouteSetIndex','_stopCount','mirror\x20vert','_lastPluginCommandInterpreter','Game_Troop_meetsConditions','version','requestRefresh','string','_target','setMapValue','setupSpawnTest','ANNOYED','player','lineHeight','SfQRG','Window_ScrollText_startMessage','TuJrK','refresh','_speed','vjyiI','turnAwayFromCharacter','updateSelfMovement','SpawnEventDespawnAtXY','mapId','isTurnInPlace','Game_Interpreter_executeCommand','fontSize','Self\x20Variable\x20%1','locate','isOnLadder','cPjdo','meetsCPC','sHGyl','mirror\x20horizontal','ljoGN','KiTTH','backY','checkRegionEventTrigger','PlayerForbid','SpawnEventDespawnEverything','areFollowersForceShown','autosaveEventLocation','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','kAmyx','_saveEventLocations','UfTWW','_clickTrigger','11832830WfuDRA','EnableTurnInPlace','TargetVariableId','getAttachPictureBitmapHeight','AdvancedSwitches','setOpacity','characterIndexVS8','sKLyJ','moveAwayFromPoint','XOeUK','regionId','EventForbid','isActive','HURT','COLLAPSE','mieGA','_eventSpawnData','moveAwayFromCharacter','BalloonOffsetY','_visiblePlayerY','YgEQH','...','_spriteOffsetY','_EventsMoveCoreSettings','isMapVariable','isAllowEventAutoMovement','advancedFunc','_commonEvents','VisibleEventLabels','Game_Event_moveTypeRandom','updateAttachPictureBitmap','square','BalloonOffsetX','SLEEP','clearAttachPictureSettings','updateEventsMoveCoreTagChanges','_eventOverloadThreshold','reverseDir','tiTnU','originalText','AllAllow','_event','metCPC','oftRK','getPlayerDiagonalSetting','EventLocationDelete','Spriteset_Map_createShadow','_characterName','ojKVj','onOk','PqvcP','setPattern','referEvent','_starting','CPTwy','Game_Map_setup','hasClickTrigger','YTqUj','clear','FFtWX','isEventTest','_lastAttachPictureMaxSize','isNormalPriority','followers','Map%1.json','activationProximityDistance','restoreSavedEventPosition','reserveCommonEvent','maxSize','QzJKe','xmRFY','SPIN\x20ANTICLOCKWISE','NOTE','TBZnH','TerrainTags','pdaxp','Step2MapId','processMoveSynchMirrorHorz','Game_Vehicle_initMoveSpeed','startsWith','setFrame','HEART','note','9257502QVocAV','isDashingAndMoving','hasMoveOnlyRegions','Label','_spawnData','DItzE','left','MorphEventRemove','firstSpawnedEventID','opacitySpeed','checkNeedForPeriodicRefresh','smooth','_erased','QUESTION','TurnInPlaceDelay','Game_Character_setMoveRoute','bnPId','resetSelfSwitchesForMap','updatePose','Window_EventItem_onOk','keys','SelfSwitchABCD','ZLfWi','Game_Player_isMapPassable','MlUMA','characterPatternYVS8','twbqZ','Name','floor','isBattleTest','isMoving','AutoBuffer','HLcVS','shadowY','toQwr','processMoveRouteJumpTo','resizeWindow','EventTimerResume','Game_Player_getInputDirection','shiftY','hideShadows','getAttachPictureBitmapWidth','TiltLeft','getPosingCharacterPattern','setValue','SXnwW','HjDNW','_duration','bufferX','BkZnk','ROUTE_SCRIPT','PreSpawnJS','padZero','_activationProximity','MgwvP','screenX','getDirectionToPoint','mQprp','meetsConditions','Game_CharacterBase_moveDiagonally','ADDITIVE','VisuMZ_1_MessageCore','GetMoveSynchTarget','FUNC','prepareSpawnedEventAtXY','isStopFollowerChasing','mimic','lock','_mapId','AirshipSpeed','makeDeepCopy','getPreservedMorphEventData','Vehicle','Step2Preserve','directionOnLadderSpriteVS8dir','return\x200','createLowerLayer','determineEventOverload','deltaYFrom','processMoveRouteMoveToCharacter','_requestSaveEventLocation','znWbP','isMapSwitch','processMoveCommandEventsMoveCore','setCommonEvent','_realX','PaiPr','GUNXc','SelfVariables','RegionOkTarget','createAttachPictureSprite','vert\x20mirror','drawing','AdvancedVariables','svcsM','NuXwj','setupEventsMoveCoreNotetags','getMapSpawnedEventData','_CPCs','isSaveEventLocations','Visibility','wngbW','$callEventMap','activationRegionList','DIAGONAL_PATHFINDING_EVENT_LIMIT','firstSpawnedEvent','PosX','onExpire','standing','charAt','direction','Dock','aWIWF','wBjbz','onClickTrigger','BPSkg','attachPictureOffsetX','isBoat','deleteIconsOnEventsDataKey','XlQlR','split','SwitchGetSelfSwitchABCD','Step1EventId','bSfKC','destinationX','rJyXp','processMoveRouteFadeIn','BitmapSmoothing','setStopFollowerChasing','Game_Event_setupPageSettings','gaHAo','Game_CharacterBase_moveStraight','jrmeH','MOorZ','processMoveRouteStepTo','replace','CPC','LYmTt','All','_forceDashing','anchor','map','processMoveCommand','Game_Player_checkEventTriggerThere','processMoveSynchRandom','Game_Player_increaseSteps','VariableGetSelfVariableID','_moveSynch','_shadowSprite','Game_Timer_start','removeChild','switch2Id','createLabelWindows','processMoveSynchAway','setMoveRoute','default','_shadowOpacity','onLoadAttachPicture','Game_Timer_initialize','checkEventTriggerEventsMoveCore','BULB','updateShadow','roundYWithDirection','pageIndex','activationProximityType','determineCommonEventsWithCPC','JjFts','deltaX','list','status','EventTimerFramesGain','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','Game_CharacterBase_opacity','ZISwo','blt','isEventsMoveCoreInvisible','List','Game_Variables_setValue','seQHj','itXVy','windowPadding','getSelfTarget','isObjectCharacter','updateAttachPictureSprite','VisuMZ_2_DragonbonesUnion','VisuMZ_Setup_Preload_Map','sTgoK','updateVS8BalloonOffsets','setNumberInput','UsHPg','deleteSavedEventLocationKey','blendMode','Game_Event_clearPageSettings','tFXbt','_type','AutoMoveEvents','isWorking','dFdOY','despawnEventId','LIGHT\x20BULB','findDiagonalDirectionTo','filter','_eventOverload','DashModifier','updateVisibility','command357','code','includes','raiyk','eCTmC','USER-DEFINED\x202','EventTimerFramesSet','airship','isLandOk','UPPER\x20RIGHT','vertical\x20mirror','dwoaU','ryIzn','despawnEverything','isSaveEventLocation','Game_Map_unlockEvent','isAllowCharacterTilt','convertVariableValuesInScriptCall','setFrames','SPIN\x20CW','checkEventTriggerHere','Game_CharacterBase_screenY','isInVehicle','sUYsV','MPMGl','tQoci','clearSelfTarget','_data','_proxyWindow','executeCommonEvent','Game_Player_isDashing','getEventIconIndex','_randomHomeY','characterIndex','OffsetX','SPIN\x20CCW','setupDiagonalSupport','clearDestination','regionList','QBYTk','ARwAm','_pose','zHJjC','WalkForbid','CustomPageConditions','setImage','Seconds','characterPatternY'];_0x49b5=function(){return _0x51319d;};return _0x49b5();}(function(_0x16a6f7,_0x30996a){const _0x18fc29=_0x4e52,_0x22bb43=_0x16a6f7();while(!![]){try{const _0x4aeb82=-parseInt(_0x18fc29(0x5c5))/0x1+-parseInt(_0x18fc29(0x3c9))/0x2+parseInt(_0x18fc29(0x5c3))/0x3*(-parseInt(_0x18fc29(0x15f))/0x4)+parseInt(_0x18fc29(0x37e))/0x5+parseInt(_0x18fc29(0x4a3))/0x6*(parseInt(_0x18fc29(0x32a))/0x7)+parseInt(_0x18fc29(0x14e))/0x8+-parseInt(_0x18fc29(0x5b2))/0x9*(-parseInt(_0x18fc29(0x450))/0xa);if(_0x4aeb82===_0x30996a)break;else _0x22bb43['push'](_0x22bb43['shift']());}catch(_0x212182){_0x22bb43['push'](_0x22bb43['shift']());}}}(_0x49b5,0xd676a));var label=_0x237a7a(0x1cc),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x23cbf5){const _0x532d4b=_0x237a7a;return _0x23cbf5[_0x532d4b(0x54c)]&&_0x23cbf5[_0x532d4b(0x169)][_0x532d4b(0x572)]('['+label+']');})[0x0];VisuMZ[label][_0x237a7a(0x3e2)]=VisuMZ[label]['Settings']||{},VisuMZ['ConvertParams']=function(_0x2de609,_0x496fc7){const _0x209233=_0x237a7a;for(const _0x288a32 in _0x496fc7){if(_0x288a32[_0x209233(0x240)](/(.*):(.*)/i)){const _0x5266f5=String(RegExp['$1']),_0x133119=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x16d0d7,_0x2b47b1,_0x2a9944;switch(_0x133119){case _0x209233(0x338):_0x16d0d7=_0x496fc7[_0x288a32]!==''?Number(_0x496fc7[_0x288a32]):0x0;break;case _0x209233(0x16f):_0x2b47b1=_0x496fc7[_0x288a32]!==''?JSON[_0x209233(0x25f)](_0x496fc7[_0x288a32]):[],_0x16d0d7=_0x2b47b1[_0x209233(0x530)](_0x38205a=>Number(_0x38205a));break;case _0x209233(0x2d7):_0x16d0d7=_0x496fc7[_0x288a32]!==''?eval(_0x496fc7[_0x288a32]):null;break;case _0x209233(0x352):_0x2b47b1=_0x496fc7[_0x288a32]!==''?JSON[_0x209233(0x25f)](_0x496fc7[_0x288a32]):[],_0x16d0d7=_0x2b47b1['map'](_0x29d3d1=>eval(_0x29d3d1));break;case _0x209233(0x289):_0x16d0d7=_0x496fc7[_0x288a32]!==''?JSON[_0x209233(0x25f)](_0x496fc7[_0x288a32]):'';break;case'ARRAYJSON':_0x2b47b1=_0x496fc7[_0x288a32]!==''?JSON[_0x209233(0x25f)](_0x496fc7[_0x288a32]):[],_0x16d0d7=_0x2b47b1[_0x209233(0x530)](_0x2bbf3d=>JSON[_0x209233(0x25f)](_0x2bbf3d));break;case _0x209233(0x4e2):_0x16d0d7=_0x496fc7[_0x288a32]!==''?new Function(JSON[_0x209233(0x25f)](_0x496fc7[_0x288a32])):new Function(_0x209233(0x4ee));break;case _0x209233(0x5d0):_0x2b47b1=_0x496fc7[_0x288a32]!==''?JSON[_0x209233(0x25f)](_0x496fc7[_0x288a32]):[],_0x16d0d7=_0x2b47b1['map'](_0x20a376=>new Function(JSON[_0x209233(0x25f)](_0x20a376)));break;case _0x209233(0x33e):_0x16d0d7=_0x496fc7[_0x288a32]!==''?String(_0x496fc7[_0x288a32]):'';break;case'ARRAYSTR':_0x2b47b1=_0x496fc7[_0x288a32]!==''?JSON[_0x209233(0x25f)](_0x496fc7[_0x288a32]):[],_0x16d0d7=_0x2b47b1[_0x209233(0x530)](_0xa11598=>String(_0xa11598));break;case _0x209233(0x1f3):_0x2a9944=_0x496fc7[_0x288a32]!==''?JSON[_0x209233(0x25f)](_0x496fc7[_0x288a32]):{},_0x2de609[_0x5266f5]={},VisuMZ[_0x209233(0x124)](_0x2de609[_0x5266f5],_0x2a9944);continue;case _0x209233(0x243):_0x2b47b1=_0x496fc7[_0x288a32]!==''?JSON[_0x209233(0x25f)](_0x496fc7[_0x288a32]):[],_0x16d0d7=_0x2b47b1['map'](_0x143f94=>VisuMZ[_0x209233(0x124)]({},JSON[_0x209233(0x25f)](_0x143f94)));break;default:continue;}_0x2de609[_0x5266f5]=_0x16d0d7;}}return _0x2de609;},(_0x9c6fc=>{const _0x468684=_0x237a7a,_0x48c505=_0x9c6fc[_0x468684(0x3a7)];for(const _0x41e74c of dependencies){if(!Imported[_0x41e74c]){alert(_0x468684(0x44b)[_0x468684(0x307)](_0x48c505,_0x41e74c)),SceneManager['exit']();break;}}const _0x1e7f25=_0x9c6fc[_0x468684(0x169)];if(_0x1e7f25[_0x468684(0x240)](/\[Version[ ](.*?)\]/i)){const _0x1aa186=Number(RegExp['$1']);_0x1aa186!==VisuMZ[label][_0x468684(0x426)]&&(alert(_0x468684(0x2f8)[_0x468684(0x307)](_0x48c505,_0x1aa186)),SceneManager[_0x468684(0xf9)]());}if(_0x1e7f25[_0x468684(0x240)](/\[Tier[ ](\d+)\]/i)){const _0x401c16=Number(RegExp['$1']);_0x401c16<tier?(alert(_0x468684(0x3ff)[_0x468684(0x307)](_0x48c505,_0x401c16,tier)),SceneManager['exit']()):tier=Math['max'](_0x401c16,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x468684(0x3e2)],_0x9c6fc[_0x468684(0x5d1)]);})(pluginData),VisuMZ[_0x237a7a(0x379)]=function(_0x324fae,_0x307caa,_0x442d7d){switch(_0x442d7d){case'=':return _0x307caa;break;case'+':return _0x324fae+_0x307caa;break;case'-':return _0x324fae-_0x307caa;break;case'*':return _0x324fae*_0x307caa;break;case'/':return _0x324fae/_0x307caa;break;case'%':return _0x324fae%_0x307caa;break;}return _0x324fae;},PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x566),_0xa75ac3=>{const _0x35b346=_0x237a7a;VisuMZ[_0x35b346(0x124)](_0xa75ac3,_0xa75ac3);switch(_0xa75ac3[_0x35b346(0x41c)]){case _0x35b346(0x15e):$gameSystem[_0x35b346(0x225)](!![]);break;case'Stop':$gameSystem['setAllowEventAutoMovement'](![]);break;case _0x35b346(0x34a):$gameSystem['setAllowEventAutoMovement'](!$gameSystem[_0x35b346(0x469)]());break;}}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],'CallEvent',_0x4f84cb=>{const _0x2c770e=_0x237a7a;VisuMZ[_0x2c770e(0x124)](_0x4f84cb,_0x4f84cb);const _0x110b60=$gameTemp[_0x2c770e(0x1ba)](),_0x1ce922={'mapId':_0x4f84cb['MapId'],'eventId':_0x4f84cb[_0x2c770e(0x173)]||_0x110b60[_0x2c770e(0x21f)](),'pageId':_0x4f84cb['PageId']};if(_0x1ce922[_0x2c770e(0x438)]<=0x0)_0x1ce922['mapId']=$gameMap?$gameMap[_0x2c770e(0x438)]():0x1;$gameTemp[_0x2c770e(0x1ba)]()[_0x2c770e(0x3cb)](_0x1ce922);}),PluginManager['registerCommand'](pluginData[_0x237a7a(0x3a7)],'DashEnableToggle',_0x3ef826=>{const _0x520332=_0x237a7a;VisuMZ[_0x520332(0x124)](_0x3ef826,_0x3ef826);switch(_0x3ef826['Value']){case'Enable':$gameSystem[_0x520332(0x120)](!![]);break;case _0x520332(0x1fd):$gameSystem[_0x520332(0x120)](![]);break;case _0x520332(0x34a):$gameSystem['setDashingEnabled'](!$gameSystem[_0x520332(0x198)]());break;}}),PluginManager['registerCommand'](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x24a),_0x5688eb=>{const _0x20036c=_0x237a7a;VisuMZ[_0x20036c(0x124)](_0x5688eb,_0x5688eb);const _0x4a06cf=$gameTemp[_0x20036c(0x1ba)]();_0x5688eb['MapId']=_0x5688eb[_0x20036c(0x3fb)]||$gameMap[_0x20036c(0x438)](),$gameSystem[_0x20036c(0x5a1)](_0x5688eb[_0x20036c(0x3fb)],_0x5688eb[_0x20036c(0x173)]||_0x4a06cf['eventId'](),_0x5688eb['IconIndex'],_0x5688eb[_0x20036c(0x31c)],_0x5688eb['IconBufferY'],_0x5688eb[_0x20036c(0x122)]);}),PluginManager['registerCommand'](pluginData[_0x237a7a(0x3a7)],'EventIconDelete',_0x9008ad=>{const _0x48962c=_0x237a7a;VisuMZ['ConvertParams'](_0x9008ad,_0x9008ad);const _0x1e6e22=$gameTemp['getLastPluginCommandInterpreter']();_0x9008ad['MapId']=_0x9008ad['MapId']||$gameMap['mapId'](),$gameSystem['deleteIconsOnEventsDataKey'](_0x9008ad[_0x48962c(0x3fb)],_0x9008ad[_0x48962c(0x173)]||_0x1e6e22[_0x48962c(0x21f)]());}),PluginManager[_0x237a7a(0x61b)](pluginData['name'],_0x237a7a(0x2e6),_0x246513=>{const _0x44dd0d=_0x237a7a;if($gameMap)for(const _0x44f591 of $gameMap[_0x44dd0d(0x10e)]()){_0x44f591[_0x44dd0d(0x432)](),_0x44f591[_0x44dd0d(0x5a7)]();}if(SceneManager['isSceneMap']()){const _0x5a038a=SceneManager[_0x44dd0d(0x2be)]['_spriteset'];if(_0x5a038a)_0x5a038a[_0x44dd0d(0x3f9)]();}}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x39e),_0x5ced38=>{const _0x70257b=_0x237a7a;VisuMZ[_0x70257b(0x124)](_0x5ced38,_0x5ced38);switch(_0x5ced38[_0x70257b(0x507)]){case _0x70257b(0x3c2):$gameSystem[_0x70257b(0x29f)](!![]);break;case _0x70257b(0x299):$gameSystem[_0x70257b(0x29f)](![]);break;case _0x70257b(0x34a):$gameSystem[_0x70257b(0x29f)](!$gameSystem[_0x70257b(0x2e0)]());break;}}),PluginManager[_0x237a7a(0x61b)](pluginData['name'],_0x237a7a(0x2cb),_0x2b1e94=>{const _0x1ecbf0=_0x237a7a;VisuMZ[_0x1ecbf0(0x124)](_0x2b1e94,_0x2b1e94);const _0x361839=$gameTemp[_0x1ecbf0(0x1ba)]();if(!$gameMap)return;const _0x482552=$gameMap[_0x1ecbf0(0x5d6)](_0x2b1e94[_0x1ecbf0(0x173)]||_0x361839[_0x1ecbf0(0x21f)]());if(_0x482552)_0x482552[_0x1ecbf0(0x3ca)]();}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x2ea),_0x104a8f=>{const _0xf64a8a=_0x237a7a;VisuMZ[_0xf64a8a(0x124)](_0x104a8f,_0x104a8f);const _0x1e02a4=$gameTemp[_0xf64a8a(0x1ba)](),_0x19aa74=_0x104a8f['MapId']||$gameMap[_0xf64a8a(0x438)](),_0x26738d=_0x104a8f['EventId']||_0x1e02a4[_0xf64a8a(0x21f)](),_0x7b4145=_0x104a8f[_0xf64a8a(0x50d)]||0x0,_0x248f82=_0x104a8f[_0xf64a8a(0x219)]||0x0,_0x6909b9=_0x104a8f[_0xf64a8a(0x616)]||0x2,_0x211e8a=((_0x104a8f[_0xf64a8a(0x63b)]||0x1)-0x1)[_0xf64a8a(0x5e0)](0x0,0x13),_0x1adeb3=_0x104a8f[_0xf64a8a(0x1dd)]||0x0;$gameSystem[_0xf64a8a(0xf7)](_0x19aa74,_0x26738d,_0x7b4145,_0x248f82,_0x6909b9,_0x211e8a,_0x1adeb3);}),PluginManager[_0x237a7a(0x61b)](pluginData['name'],_0x237a7a(0x47d),_0x5b0530=>{const _0x373dc1=_0x237a7a;VisuMZ[_0x373dc1(0x124)](_0x5b0530,_0x5b0530);const _0x36798f=$gameTemp['getLastPluginCommandInterpreter'](),_0x5552eb=_0x5b0530['MapId']||$gameMap['mapId'](),_0x25d761=_0x5b0530[_0x373dc1(0x173)]||_0x36798f[_0x373dc1(0x21f)]();$gameSystem[_0x373dc1(0x561)](_0x5552eb,_0x25d761);}),PluginManager['registerCommand'](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x271),_0x14ad15=>{const _0x37fa5a=_0x237a7a;VisuMZ[_0x37fa5a(0x124)](_0x14ad15,_0x14ad15);const _0x366681=_0x14ad15['CommonEventID'];$gameTimer['setCommonEvent'](_0x366681);}),PluginManager['registerCommand'](pluginData['name'],_0x237a7a(0x129),_0x3c1770=>{$gameTimer['setCommonEvent'](0x0);}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x54d),_0x457bcb=>{const _0x12b8ed=_0x237a7a;if(!$gameTimer['isWorking']())return;VisuMZ['ConvertParams'](_0x457bcb,_0x457bcb);let _0x3ce92d=0x0;_0x3ce92d+=_0x457bcb[_0x12b8ed(0x1bb)],_0x3ce92d+=_0x457bcb[_0x12b8ed(0x59e)]*0x3c,_0x3ce92d+=_0x457bcb[_0x12b8ed(0x32f)]*0x3c*0x3c,_0x3ce92d+=_0x457bcb['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x12b8ed(0x332)](_0x3ce92d);}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x576),_0x560b10=>{const _0x1cc1e1=_0x237a7a;if(!$gameTimer[_0x1cc1e1(0x567)]())return;VisuMZ[_0x1cc1e1(0x124)](_0x560b10,_0x560b10);let _0x303bd5=0x0;_0x303bd5+=_0x560b10[_0x1cc1e1(0x1bb)],_0x303bd5+=_0x560b10[_0x1cc1e1(0x59e)]*0x3c,_0x303bd5+=_0x560b10[_0x1cc1e1(0x32f)]*0x3c*0x3c,_0x303bd5+=_0x560b10[_0x1cc1e1(0x248)]*0x3c*0x3c*0x3c,$gameTimer['setFrames'](_0x303bd5);}),PluginManager['registerCommand'](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x5b1),_0x1a38ab=>{const _0x3cc674=_0x237a7a;if(!$gameTimer['isWorking']())return;$gameTimer[_0x3cc674(0x41a)]();}),PluginManager[_0x237a7a(0x61b)](pluginData['name'],_0x237a7a(0x4c8),_0x4eb711=>{const _0x2ecd1c=_0x237a7a;if(!$gameTimer[_0x2ecd1c(0x567)]())return;$gameTimer[_0x2ecd1c(0x2a7)]();}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x18c),_0x56704a=>{const _0x49fbe4=_0x237a7a;VisuMZ[_0x49fbe4(0x124)](_0x56704a,_0x56704a);const _0x25f97f=_0x56704a['Speed']||0x0;$gameTimer[_0x49fbe4(0x5d9)](_0x25f97f);}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],'FollowerSetGlobalChase',_0x1a8991=>{const _0x2a95d2=_0x237a7a;VisuMZ[_0x2a95d2(0x124)](_0x1a8991,_0x1a8991);const _0x4e6694=!_0x1a8991[_0x2a95d2(0x1ff)];$gameSystem['setStopFollowerChasing'](_0x4e6694);}),PluginManager[_0x237a7a(0x61b)](pluginData['name'],_0x237a7a(0x387),_0x4d7d64=>{const _0x515422=_0x237a7a;VisuMZ[_0x515422(0x124)](_0x4d7d64,_0x4d7d64);const _0x3fb550=(_0x4d7d64[_0x515422(0x1db)]||0x0)-0x1,_0x5c2783=!_0x4d7d64[_0x515422(0x1ff)],_0x414c39=$gamePlayer[_0x515422(0x48f)]()[_0x515422(0x123)](_0x3fb550);if(_0x414c39)_0x414c39[_0x515422(0x143)](_0x5c2783);}),PluginManager[_0x237a7a(0x61b)](pluginData['name'],_0x237a7a(0x137),_0xbae59a=>{const _0x45f0b1=_0x237a7a;VisuMZ[_0x45f0b1(0x124)](_0xbae59a,_0xbae59a);const _0x443d25=_0xbae59a[_0x45f0b1(0x1db)];$gameSystem['setControlledFollowerID'](_0x443d25);}),PluginManager['registerCommand'](pluginData['name'],_0x237a7a(0x5de),_0x4be6f0=>{const _0x37c6a1=_0x237a7a;VisuMZ[_0x37c6a1(0x124)](_0x4be6f0,_0x4be6f0),$gameSystem['setControlledFollowerID'](0x0),$gameSystem[_0x37c6a1(0x523)](![]);for(const _0x5e9965 of $gamePlayer[_0x37c6a1(0x48f)]()['_data']){if(_0x5e9965)_0x5e9965[_0x37c6a1(0x143)](![]);}}),PluginManager[_0x237a7a(0x61b)](pluginData['name'],_0x237a7a(0x51c),_0x113646=>{const _0x3693d7=_0x237a7a;VisuMZ[_0x3693d7(0x124)](_0x113646,_0x113646);const _0x4d9f32=$gameTemp[_0x3693d7(0x1ba)]();_0x113646['MapId']=_0x113646[_0x3693d7(0x3fb)]||$gameMap[_0x3693d7(0x438)]();const _0x43a050=[_0x113646[_0x3693d7(0x3fb)],_0x113646[_0x3693d7(0x173)]||_0x4d9f32['eventId'](),_0x113646[_0x3693d7(0x34e)]],_0x5d8047=_0x113646['TargetSwitchId'],_0x269df8=$gameSelfSwitches[_0x3693d7(0x228)](_0x43a050)||![];$gameSwitches[_0x3693d7(0x4cf)](_0x5d8047,_0x269df8);}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],'SwitchGetSelfSwitchID',_0x54c2b8=>{const _0x55a233=_0x237a7a;VisuMZ[_0x55a233(0x124)](_0x54c2b8,_0x54c2b8);const _0x1c3d7a=$gameTemp[_0x55a233(0x1ba)]();_0x54c2b8[_0x55a233(0x3fb)]=_0x54c2b8[_0x55a233(0x3fb)]||$gameMap[_0x55a233(0x438)]();const _0x2a7c6c=[_0x54c2b8['MapId'],_0x54c2b8[_0x55a233(0x173)]||_0x1c3d7a[_0x55a233(0x21f)](),_0x55a233(0xfb)['format'](_0x54c2b8[_0x55a233(0xf6)])],_0x4a30bd=_0x54c2b8['TargetSwitchId'],_0x4ebca0=$gameSelfSwitches[_0x55a233(0x228)](_0x2a7c6c)||![];$gameSwitches[_0x55a233(0x4cf)](_0x4a30bd,_0x4ebca0);}),PluginManager[_0x237a7a(0x61b)](pluginData['name'],_0x237a7a(0x535),_0x410954=>{const _0x5deaec=_0x237a7a;VisuMZ[_0x5deaec(0x124)](_0x410954,_0x410954);const _0x5c611f=$gameTemp[_0x5deaec(0x1ba)]();_0x410954[_0x5deaec(0x3fb)]=_0x410954[_0x5deaec(0x3fb)]||$gameMap['mapId']();const _0x5891c7=[_0x410954[_0x5deaec(0x3fb)],_0x410954[_0x5deaec(0x173)]||_0x5c611f[_0x5deaec(0x21f)](),_0x5deaec(0x43c)[_0x5deaec(0x307)](_0x410954[_0x5deaec(0x255)])],_0x393642=_0x410954[_0x5deaec(0x452)],_0xa881b2=$gameSelfSwitches[_0x5deaec(0x228)](_0x5891c7)||![];$gameVariables[_0x5deaec(0x4cf)](_0x393642,_0xa881b2);}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],'MorphEventTo',_0x264582=>{const _0x39600e=_0x237a7a;VisuMZ[_0x39600e(0x124)](_0x264582,_0x264582);if(!$gameMap)return;const _0x37c060=$gameTemp['getLastPluginCommandInterpreter'](),_0x538367=_0x264582[_0x39600e(0x4ec)];_0x264582[_0x39600e(0x336)]=_0x264582[_0x39600e(0x336)]||$gameMap[_0x39600e(0x438)](),_0x264582[_0x39600e(0x49c)]=_0x264582[_0x39600e(0x49c)]||$gameMap[_0x39600e(0x438)](),_0x264582['TemplateName']=_0x264582[_0x39600e(0x389)][_0x39600e(0x376)]()[_0x39600e(0x19c)]();if(!_0x538367&&_0x264582[_0x39600e(0x336)]!==$gameMap[_0x39600e(0x438)]())return;if($gameMap['mapId']()===_0x264582[_0x39600e(0x336)]){const _0x51b9ba=$gameMap[_0x39600e(0x5d6)](_0x264582['Step1EventId']||_0x37c060[_0x39600e(0x21f)]());if(!_0x51b9ba)return;if(_0x264582[_0x39600e(0x389)]!==_0x39600e(0x337)){if(_0x39600e(0x43f)!==_0x39600e(0x43f)){var _0x39c51a=_0x7a9ba9[_0x39600e(0x1cc)][_0x39600e(0x34d)][_0x39600e(0x275)](this,_0x5424af);return _0x39c51a&&this[_0x39600e(0x326)](_0x26b28f);}else _0x51b9ba[_0x39600e(0x171)](_0x264582[_0x39600e(0x389)]);}else{if(_0x39600e(0x17a)!=='mIxXX'){const _0x14f4ee=_0x39600e(0x29b)[_0x39600e(0x307)](_0x31da22[_0x39600e(0x4e7)],_0x45fecc[_0x39600e(0x5b7)]),_0x3f6f5b=_0x54c652[_0x39600e(0x4b7)](this[_0x39600e(0x58b)])[_0x39600e(0x56c)](_0x46e390=>_0x46e390['startsWith'](_0x14f4ee));while(_0x3f6f5b[_0x39600e(0x33c)]>0x0){const _0x35c472=_0x3f6f5b[_0x39600e(0x28c)]();delete this[_0x39600e(0x58b)][_0x35c472];}}else _0x51b9ba[_0x39600e(0x367)](_0x264582[_0x39600e(0x49c)],_0x264582['Step2EventId']||_0x37c060[_0x39600e(0x21f)]());}}_0x538367&&$gameSystem[_0x39600e(0x3f8)](_0x264582['Step1MapId'],_0x264582[_0x39600e(0x51d)],_0x264582[_0x39600e(0x389)],_0x264582['Step2MapId'],_0x264582[_0x39600e(0x246)]);}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x4aa),_0x529618=>{const _0x17dbf=_0x237a7a;VisuMZ[_0x17dbf(0x124)](_0x529618,_0x529618);if(!$gameMap)return;const _0x1d7021=$gameTemp[_0x17dbf(0x1ba)]();_0x529618[_0x17dbf(0x3fb)]=_0x529618['MapId']||$gameMap[_0x17dbf(0x438)]();if($gameMap[_0x17dbf(0x438)]()===_0x529618[_0x17dbf(0x3fb)]){const _0x48fe6d=$gameMap[_0x17dbf(0x5d6)](_0x529618[_0x17dbf(0x173)]||_0x1d7021[_0x17dbf(0x21f)]());_0x48fe6d[_0x17dbf(0x12d)]();}if(_0x529618[_0x17dbf(0x104)]){if(_0x17dbf(0x4a8)!==_0x17dbf(0x4c3))$gameSystem[_0x17dbf(0x612)](_0x529618['MapId'],_0x529618['EventId']||_0x1d7021[_0x17dbf(0x21f)]());else{if(_0xd1aef8)this[_0x17dbf(0x4c6)](_0x97d1cb['x'],_0x30e4e3['y']);}}}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],'PlayerIconChange',_0x5f17d3=>{const _0x53e5ab=_0x237a7a;VisuMZ[_0x53e5ab(0x124)](_0x5f17d3,_0x5f17d3),$gameSystem[_0x53e5ab(0x270)]($gamePlayer,_0x5f17d3[_0x53e5ab(0x114)],_0x5f17d3[_0x53e5ab(0x31c)],_0x5f17d3[_0x53e5ab(0x643)],_0x5f17d3['IconBlendMode']);}),PluginManager[_0x237a7a(0x61b)](pluginData['name'],_0x237a7a(0x2d1),_0x458373=>{const _0x48858d=_0x237a7a;VisuMZ['ConvertParams'](_0x458373,_0x458373),$gameSystem[_0x48858d(0x1b9)]($gamePlayer);}),PluginManager['registerCommand'](pluginData[_0x237a7a(0x3a7)],'PlayerMovementChange',_0x3b1e3c=>{const _0xb81fb8=_0x237a7a;VisuMZ['ConvertParams'](_0x3b1e3c,_0x3b1e3c),$gameSystem[_0xb81fb8(0xfe)](!_0x3b1e3c[_0xb81fb8(0x18f)]);}),PluginManager[_0x237a7a(0x61b)](pluginData['name'],'PlayerMovementDiagonal',_0x1354e0=>{const _0x82df3f=_0x237a7a;VisuMZ[_0x82df3f(0x124)](_0x1354e0,_0x1354e0),$gameSystem['setPlayerDiagonalSetting'](_0x1354e0['Setting']);}),PluginManager['registerCommand'](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x3ab),_0x2c28ff=>{const _0x3ffcc4=_0x237a7a;VisuMZ['ConvertParams'](_0x2c28ff,_0x2c28ff);const _0x490aac=_0x2c28ff[_0x3ffcc4(0x3fb)]||$gameMap[_0x3ffcc4(0x438)]();$gameSelfSwitches[_0x3ffcc4(0x4b4)](_0x490aac);}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x4b8),_0x642bf4=>{const _0x543895=_0x237a7a;VisuMZ[_0x543895(0x124)](_0x642bf4,_0x642bf4);const _0x563195=$gameTemp['getLastPluginCommandInterpreter']();_0x642bf4[_0x543895(0x3fb)]=_0x642bf4['MapId']||$gameMap[_0x543895(0x438)]();const _0x22020c=[_0x642bf4[_0x543895(0x3fb)],_0x642bf4[_0x543895(0x173)]||_0x563195[_0x543895(0x21f)](),_0x642bf4[_0x543895(0x34e)]];switch(_0x642bf4[_0x543895(0x41c)]){case'ON':$gameSelfSwitches[_0x543895(0x4cf)](_0x22020c,!![]);break;case'OFF':$gameSelfSwitches[_0x543895(0x4cf)](_0x22020c,![]);break;case _0x543895(0x34a):$gameSelfSwitches[_0x543895(0x4cf)](_0x22020c,!$gameSelfSwitches[_0x543895(0x228)](_0x22020c));break;}}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x164),_0x2cc3aa=>{const _0x304892=_0x237a7a;VisuMZ[_0x304892(0x124)](_0x2cc3aa,_0x2cc3aa);const _0x3a3a43=$gameTemp[_0x304892(0x1ba)]();_0x2cc3aa[_0x304892(0x3fb)]=_0x2cc3aa[_0x304892(0x3fb)]||$gameMap[_0x304892(0x438)]();const _0x5c3ed3=[_0x2cc3aa[_0x304892(0x3fb)],_0x2cc3aa['EventId']||_0x3a3a43[_0x304892(0x21f)](),'Self\x20Switch\x20%1'[_0x304892(0x307)](_0x2cc3aa[_0x304892(0xf6)])];switch(_0x2cc3aa[_0x304892(0x41c)]){case'ON':$gameSelfSwitches['setValue'](_0x5c3ed3,!![]);break;case'OFF':$gameSelfSwitches[_0x304892(0x4cf)](_0x5c3ed3,![]);break;case _0x304892(0x34a):$gameSelfSwitches[_0x304892(0x4cf)](_0x5c3ed3,!$gameSelfSwitches[_0x304892(0x228)](_0x5c3ed3));break;}}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x5ce),_0x4ab861=>{const _0xc50119=_0x237a7a;VisuMZ[_0xc50119(0x124)](_0x4ab861,_0x4ab861);const _0x54445c=$gameTemp['getLastPluginCommandInterpreter']();_0x4ab861[_0xc50119(0x3fb)]=_0x4ab861[_0xc50119(0x3fb)]||$gameMap[_0xc50119(0x438)]();const _0x54be1d=[_0x4ab861['MapId'],_0x4ab861[_0xc50119(0x173)]||_0x54445c[_0xc50119(0x21f)](),_0xc50119(0x43c)[_0xc50119(0x307)](_0x4ab861[_0xc50119(0x255)])],_0x257805=VisuMZ['OperateValues']($gameSelfSwitches['value'](_0x54be1d),_0x4ab861['Value'],_0x4ab861[_0xc50119(0x5ea)]);$gameSelfSwitches['setValue'](_0x54be1d,_0x257805);}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x335),_0x2d838a=>{const _0x3a1966=_0x237a7a;VisuMZ['ConvertParams'](_0x2d838a,_0x2d838a);const _0x2ff955=$gameTemp[_0x3a1966(0x1ba)](),_0x28024c={'template':_0x2d838a[_0x3a1966(0x389)],'mapId':_0x2d838a[_0x3a1966(0x3fb)]||$gameMap[_0x3a1966(0x438)](),'eventId':_0x2d838a[_0x3a1966(0x173)]||_0x2ff955[_0x3a1966(0x21f)](),'x':_0x2d838a['PosX'],'y':_0x2d838a['PosY'],'spawnPreserved':_0x2d838a[_0x3a1966(0x1c8)],'spawnEventId':$gameMap[_0x3a1966(0x14d)][_0x3a1966(0x33c)]+0x3e8},_0x11184f=_0x2d838a[_0x3a1966(0x2e9)]||0x0;if(!VisuMZ[_0x3a1966(0x3bf)][_0x28024c['mapId']]&&_0x28024c[_0x3a1966(0x438)]!==$gameMap[_0x3a1966(0x438)]()){let _0x30b6ea=_0x3a1966(0xf5)['format'](_0x28024c[_0x3a1966(0x438)]);_0x30b6ea+=_0x3a1966(0x3dd),_0x30b6ea+=_0x3a1966(0x292),_0x30b6ea+=_0x3a1966(0x1ae),_0x30b6ea+=_0x3a1966(0x37b)[_0x3a1966(0x307)](_0x28024c[_0x3a1966(0x438)]),alert(_0x30b6ea);return;}const _0x2fe4af=$gameMap['prepareSpawnedEventAtXY'](_0x28024c,_0x2d838a['Collision'],_0x2d838a[_0x3a1966(0x224)]);_0x11184f&&$gameSwitches[_0x3a1966(0x4cf)](_0x11184f,!!_0x2fe4af);}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],'SpawnEventAtRegion',_0x5838ea=>{const _0xb18ccb=_0x237a7a;VisuMZ[_0xb18ccb(0x124)](_0x5838ea,_0x5838ea);const _0x794203=$gameTemp[_0xb18ccb(0x1ba)](),_0x26f75a={'template':_0x5838ea[_0xb18ccb(0x389)],'mapId':_0x5838ea[_0xb18ccb(0x3fb)]||$gameMap[_0xb18ccb(0x438)](),'eventId':_0x5838ea[_0xb18ccb(0x173)]||_0x794203[_0xb18ccb(0x21f)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x5838ea[_0xb18ccb(0x1c8)],'spawnEventId':$gameMap[_0xb18ccb(0x14d)][_0xb18ccb(0x33c)]+0x3e8},_0xd07dc1=_0x5838ea[_0xb18ccb(0x2e9)]||0x0;if(!VisuMZ[_0xb18ccb(0x3bf)][_0x26f75a['mapId']]&&_0x26f75a[_0xb18ccb(0x438)]!==$gameMap[_0xb18ccb(0x438)]()){if('pjkAd'!==_0xb18ccb(0x222)){let _0x2b5666=_0xb18ccb(0xf5)[_0xb18ccb(0x307)](_0x26f75a['mapId']);_0x2b5666+=_0xb18ccb(0x3dd),_0x2b5666+=_0xb18ccb(0x292),_0x2b5666+=_0xb18ccb(0x1ae),_0x2b5666+=_0xb18ccb(0x37b)['format'](_0x26f75a[_0xb18ccb(0x438)]),alert(_0x2b5666);return;}else _0x1de40e==='left'?this[_0xb18ccb(0x1b6)]():this[_0xb18ccb(0x1e0)]();}const _0x5e0aaa=$gameMap['prepareSpawnedEventAtRegion'](_0x26f75a,_0x5838ea[_0xb18ccb(0x2d4)],_0x5838ea['Collision'],_0x5838ea['Passability']);_0xd07dc1&&$gameSwitches[_0xb18ccb(0x4cf)](_0xd07dc1,!!_0x5e0aaa);}),PluginManager['registerCommand'](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x5ae),_0x540095=>{const _0x38b2f7=_0x237a7a;VisuMZ[_0x38b2f7(0x124)](_0x540095,_0x540095);const _0x4d1b98=$gameTemp['getLastPluginCommandInterpreter'](),_0x23ca47={'template':_0x540095[_0x38b2f7(0x389)],'mapId':_0x540095[_0x38b2f7(0x3fb)]||$gameMap['mapId'](),'eventId':_0x540095[_0x38b2f7(0x173)]||_0x4d1b98[_0x38b2f7(0x21f)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x540095[_0x38b2f7(0x1c8)],'spawnEventId':$gameMap[_0x38b2f7(0x14d)][_0x38b2f7(0x33c)]+0x3e8},_0x7c87f=_0x540095['SuccessSwitchId']||0x0;if(!VisuMZ['PreloadedMaps'][_0x23ca47[_0x38b2f7(0x438)]]&&_0x23ca47[_0x38b2f7(0x438)]!==$gameMap[_0x38b2f7(0x438)]()){let _0x42b82a=_0x38b2f7(0xf5)[_0x38b2f7(0x307)](_0x23ca47['mapId']);_0x42b82a+=_0x38b2f7(0x3dd),_0x42b82a+='Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a',_0x42b82a+=_0x38b2f7(0x1ae),_0x42b82a+=_0x38b2f7(0x37b)['format'](_0x23ca47['mapId']),alert(_0x42b82a);return;}const _0xdf7866=$gameMap[_0x38b2f7(0x1a9)](_0x23ca47,_0x540095[_0x38b2f7(0x49a)],_0x540095[_0x38b2f7(0x130)],_0x540095[_0x38b2f7(0x224)]);_0x7c87f&&$gameSwitches[_0x38b2f7(0x4cf)](_0x7c87f,!!_0xdf7866);}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],'SpawnEventDespawnEventID',_0x1c7c1e=>{const _0x2146ad=_0x237a7a;VisuMZ['ConvertParams'](_0x1c7c1e,_0x1c7c1e);const _0x1769cd=$gameTemp['getLastPluginCommandInterpreter']();$gameMap[_0x2146ad(0x569)](_0x1c7c1e[_0x2146ad(0x28b)]||_0x1769cd['eventId']());}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x437),_0x346e34=>{const _0x19e247=_0x237a7a;VisuMZ['ConvertParams'](_0x346e34,_0x346e34);const _0x2d52d7=_0x346e34[_0x19e247(0x50d)],_0x48a008=_0x346e34[_0x19e247(0x219)];$gameMap[_0x19e247(0x15c)](_0x2d52d7,_0x48a008);}),PluginManager[_0x237a7a(0x61b)](pluginData[_0x237a7a(0x3a7)],_0x237a7a(0x1b5),_0x20b22f=>{const _0x806992=_0x237a7a;VisuMZ[_0x806992(0x124)](_0x20b22f,_0x20b22f),$gameMap[_0x806992(0x2dd)](_0x20b22f[_0x806992(0x2d4)]);}),PluginManager[_0x237a7a(0x61b)](pluginData['name'],_0x237a7a(0x5bd),_0x363a86=>{const _0x1664d8=_0x237a7a;VisuMZ[_0x1664d8(0x124)](_0x363a86,_0x363a86),$gameMap[_0x1664d8(0x1c6)](_0x363a86[_0x1664d8(0x49a)]);}),PluginManager[_0x237a7a(0x61b)](pluginData['name'],_0x237a7a(0x448),_0x2cdabf=>{const _0x3c53d8=_0x237a7a;VisuMZ['ConvertParams'](_0x2cdabf,_0x2cdabf),$gameMap[_0x3c53d8(0x57d)]();}),VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x12f)]=Scene_Boot['prototype'][_0x237a7a(0x325)],Scene_Boot[_0x237a7a(0x2ed)][_0x237a7a(0x325)]=function(){const _0x432480=_0x237a7a;VisuMZ[_0x432480(0x1cc)]['Scene_Boot_onDatabaseLoaded']['call'](this),this['process_VisuMZ_EventsMoveCore_LoadTemplateMaps'](),this[_0x432480(0x300)]();if(VisuMZ['EventsMoveCore'][_0x432480(0x59c)])VisuMZ['EventsMoveCore'][_0x432480(0x59c)][_0x432480(0x2ac)]();},VisuMZ[_0x237a7a(0x3bf)]=[],VisuMZ[_0x237a7a(0x5e6)]={},Scene_Boot[_0x237a7a(0x2ed)][_0x237a7a(0x54e)]=function(){const _0x5482f6=_0x237a7a;if(DataManager[_0x5482f6(0x4c0)]()||DataManager['isEventTest']())return;const _0x4c20b9=VisuMZ[_0x5482f6(0x1cc)][_0x5482f6(0x3e2)][_0x5482f6(0x61c)],_0x1fbc98=_0x4c20b9['PreloadMaps'][_0x5482f6(0x312)](0x0);for(const _0x17617d of _0x4c20b9[_0x5482f6(0x553)]){if(_0x5482f6(0x2d3)!=='jeJdj'){if(!this[_0x5482f6(0x5d5)])return 0x0;if(this['_character'][_0x5482f6(0x4af)])return 0x0;const _0x51cdcf=this[_0x5482f6(0x5d5)][_0x5482f6(0x212)]();return _0x51cdcf?_0x51cdcf['iconIndex']||0x0:0x0;}else{_0x17617d[_0x5482f6(0x4be)]=_0x17617d[_0x5482f6(0x4be)]['toUpperCase']()['trim'](),VisuMZ['EventTemplates'][_0x17617d['Name']]=_0x17617d;if(!_0x1fbc98[_0x5482f6(0x572)](_0x17617d['MapID']))_0x1fbc98[_0x5482f6(0x5a6)](_0x17617d[_0x5482f6(0x209)]);}}for(const _0x4e6fe1 of _0x1fbc98){if(_0x5482f6(0x3cf)===_0x5482f6(0x57b))_0xdfc6e=0x6;else{if(VisuMZ[_0x5482f6(0x3bf)][_0x4e6fe1])continue;const _0x247e4f=_0x5482f6(0x490)[_0x5482f6(0x307)](_0x4e6fe1[_0x5482f6(0x4d7)](0x3)),_0x288982=_0x5482f6(0x36f)['format'](_0x4e6fe1);DataManager['loadDataFile'](_0x288982,_0x247e4f),setTimeout(this['VisuMZ_Setup_Preload_Map'][_0x5482f6(0x2f0)](this,_0x4e6fe1,_0x288982),0x64);}}},Scene_Boot[_0x237a7a(0x2ed)][_0x237a7a(0x55c)]=function(_0x45d28a,_0x1eb1c6){const _0x555a75=_0x237a7a;window[_0x1eb1c6]?(VisuMZ[_0x555a75(0x3bf)][_0x45d28a]=window[_0x1eb1c6],window[_0x1eb1c6]=undefined):'oftRK'!==_0x555a75(0x47b)?delete this[_0x555a75(0x274)][_0x555a75(0x5c9)]:setTimeout(this[_0x555a75(0x55c)][_0x555a75(0x2f0)](this,_0x45d28a,_0x1eb1c6),0x64);},VisuMZ['AdvancedSwitches']=[],VisuMZ[_0x237a7a(0x3bb)]=[],VisuMZ['MapSwitches']=[],VisuMZ['AdvancedVariables']=[],VisuMZ[_0x237a7a(0x4fb)]=[],VisuMZ[_0x237a7a(0x315)]=[],Scene_Boot['prototype'][_0x237a7a(0x300)]=function(){const _0x3b5ea9=_0x237a7a;for(let _0x39d4ff=0x1;_0x39d4ff<$dataSystem['switches'][_0x3b5ea9(0x33c)];_0x39d4ff++){if(_0x3b5ea9(0x5cc)!==_0x3b5ea9(0x5cc)){if(this[_0x3b5ea9(0x138)]())return;_0xd1e3d6['EventsMoveCore'][_0x3b5ea9(0x3be)][_0x3b5ea9(0x275)](this),this[_0x3b5ea9(0x4c1)]()&&_0xa5317b[_0x3b5ea9(0x3b2)](this[_0x3b5ea9(0x5b7)]);}else{if($dataSystem[_0x3b5ea9(0x21d)][_0x39d4ff][_0x3b5ea9(0x240)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x3b5ea9(0x454)]['push'](_0x39d4ff);if($dataSystem['switches'][_0x39d4ff][_0x3b5ea9(0x240)](/<SELF>/i))VisuMZ['SelfSwitches'][_0x3b5ea9(0x5a6)](_0x39d4ff);if($dataSystem[_0x3b5ea9(0x21d)][_0x39d4ff][_0x3b5ea9(0x240)](/<MAP>/i))VisuMZ['MapSwitches'][_0x3b5ea9(0x5a6)](_0x39d4ff);}}for(let _0x528bd2=0x1;_0x528bd2<$dataSystem[_0x3b5ea9(0x349)][_0x3b5ea9(0x33c)];_0x528bd2++){if(_0x3b5ea9(0x394)===_0x3b5ea9(0x597))_0x16c12b[_0x3b5ea9(0x2ed)][_0x3b5ea9(0x56f)][_0x3b5ea9(0x275)](this),this[_0x3b5ea9(0x552)]()&&(this[_0x3b5ea9(0x634)]=![]);else{if($dataSystem[_0x3b5ea9(0x349)][_0x528bd2][_0x3b5ea9(0x240)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedVariables'][_0x3b5ea9(0x5a6)](_0x528bd2);if($dataSystem['variables'][_0x528bd2][_0x3b5ea9(0x240)](/<SELF>/i))VisuMZ[_0x3b5ea9(0x4fb)][_0x3b5ea9(0x5a6)](_0x528bd2);if($dataSystem[_0x3b5ea9(0x349)][_0x528bd2][_0x3b5ea9(0x240)](/<MAP>/i))VisuMZ[_0x3b5ea9(0x315)][_0x3b5ea9(0x5a6)](_0x528bd2);}}},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x59c)]={},VisuMZ['EventsMoveCore'][_0x237a7a(0x59c)][_0x237a7a(0x2ac)]=function(){const _0x5251d3=_0x237a7a;this[_0x5251d3(0x157)]=new Game_CPCInterpreter(),this[_0x5251d3(0x548)]();},VisuMZ[_0x237a7a(0x1cc)]['CustomPageConditions']['determineCommonEventsWithCPC']=function(){const _0x41e873=_0x237a7a;this['_commonEvents']=[];for(const _0x59e8ef of $dataCommonEvents){if(!_0x59e8ef)continue;VisuMZ['EventsMoveCore'][_0x41e873(0x59c)]['loadCPC'](_0x59e8ef);if(_0x59e8ef['CPC'][_0x41e873(0x33c)]>0x0)this[_0x41e873(0x46b)][_0x41e873(0x5a6)](_0x59e8ef['id']);}},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x59c)]['metCPC']=function(_0x3908c2,_0x49e88f,_0x440b6a){const _0x4b1ec6=_0x237a7a;this[_0x4b1ec6(0x157)]['setup'](_0x3908c2,_0x49e88f);if(_0x440b6a){if(_0x4b1ec6(0x31f)===_0x4b1ec6(0x31f))this[_0x4b1ec6(0x157)][_0x4b1ec6(0x58d)](_0x440b6a);else{const _0x3d2787=_0x6cde52&&this[_0x4b1ec6(0x5b7)]?_0x5b7228[_0x4b1ec6(0x5d6)](this['_eventId']):null;_0x104d21[_0x4b1ec6(0x220)](_0x3d2787);const _0x2af880=_0x2c43c8[_0x4b1ec6(0x1cc)][_0x4b1ec6(0x43a)][_0x4b1ec6(0x275)](this);return _0x2754b5[_0x4b1ec6(0x58a)](),_0x2af880;}}else _0x4b1ec6(0x4bd)!==_0x4b1ec6(0x4bd)?this[_0x4b1ec6(0x3c3)]=_0x2645ce(_0x560016['$1']):this[_0x4b1ec6(0x157)][_0x4b1ec6(0x2e8)]();return this[_0x4b1ec6(0x157)][_0x4b1ec6(0x23f)];},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x59c)]['loadCPC']=function(_0x296bec){const _0x324323=_0x237a7a;let _0x21d343=![];_0x296bec['CPC']=[];for(const _0x110c16 of _0x296bec[_0x324323(0x54b)]){if(_0x324323(0x5a0)===_0x324323(0x622)){if(!_0x5be5d8[_0x324323(0x1cc)][_0x324323(0x3e2)][_0x324323(0x11d)][_0x324323(0x333)])return;for(const _0x4e5325 of this[_0x324323(0x1a7)]){this['_tilemap'][_0x324323(0x539)](_0x4e5325['_shadowSprite']);}}else{if([0x6c,0x198][_0x324323(0x572)](_0x110c16['code'])){const _0x49eaa5=_0x110c16[_0x324323(0x5d1)][0x0];if(_0x49eaa5[_0x324323(0x240)](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x21d343=!![];else _0x49eaa5['match'](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x21d343=![]);}if(_0x21d343){if('AOtHs'!==_0x324323(0x5df)){if(_0xa5dc9f)this[_0x324323(0x5e5)](_0x37c0f2['x'],_0x5b86fa['y']);}else _0x296bec[_0x324323(0x52b)][_0x324323(0x5a6)](_0x110c16);}}}},getSelfSwitchValue=function(_0x4d307b,_0x3a74b7,_0x1db5d3){const _0x4f52d7=_0x237a7a;let _0x8741d3=[_0x4d307b,_0x3a74b7,_0x4f52d7(0xfb)[_0x4f52d7(0x307)](_0x1db5d3)];if(typeof _0x1db5d3==='string'){if(_0x4f52d7(0x646)===_0x4f52d7(0x646))_0x8741d3=[_0x4d307b,_0x3a74b7,_0x1db5d3[_0x4f52d7(0x376)]()[_0x4f52d7(0x19c)]()];else return this[_0x4f52d7(0x17c)](_0x3aa879);}return $gameSelfSwitches['value'](_0x8741d3);},getMapSwitchValue=function(_0x58953f,_0x44bf69){const _0x52274e=_0x237a7a;let _0x43d823=[0x0,0x0,_0x52274e(0x5cd)[_0x52274e(0x307)](_0x58953f,_0x44bf69)];return $gameSelfSwitches[_0x52274e(0x228)](_0x43d823);},getMapVariableValue=function(_0x580a25,_0x560ab7){const _0x331a50=_0x237a7a;let _0x360f48=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'['format'](_0x580a25,_0x560ab7)];return $gameSelfSwitches[_0x331a50(0x228)](_0x360f48);},getSelfVariableValue=function(_0x460b40,_0x1f4b23,_0x1cbd11){const _0x2349ae=_0x237a7a,_0x4bbfda=[_0x460b40,_0x1f4b23,_0x2349ae(0x43c)[_0x2349ae(0x307)](_0x1cbd11)];return $gameSelfSwitches['value'](_0x4bbfda);},setSelfSwitchValue=function(_0x54b62e,_0x1be57b,_0x4de8a2,_0x242ef1){const _0x4bfeea=_0x237a7a;let _0x4baed6=[_0x54b62e,_0x1be57b,_0x4bfeea(0xfb)[_0x4bfeea(0x307)](_0x4de8a2)];typeof _0x4de8a2===_0x4bfeea(0x428)&&(_0x4baed6=[_0x54b62e,_0x1be57b,_0x4de8a2[_0x4bfeea(0x376)]()['trim']()]),$gameSelfSwitches[_0x4bfeea(0x4cf)](_0x4baed6,_0x242ef1);},setSelfVariableValue=function(_0x5a601f,_0x1399c3,_0x50fa24,_0x3e6c72){const _0x25edc6=_0x237a7a,_0x112766=[_0x5a601f,_0x1399c3,_0x25edc6(0x43c)[_0x25edc6(0x307)](_0x50fa24)];$gameSelfSwitches['setValue'](_0x112766,_0x3e6c72);},setMapSwitchValue=function(_0x335f6f,_0x47d758,_0x2d5827){const _0x570ecd=_0x237a7a;let _0x22f8f8=[0x0,0x0,_0x570ecd(0x5cd)[_0x570ecd(0x307)](_0x335f6f,_0x47d758)];$gameSelfSwitches['setValue'](_0x22f8f8,_0x2d5827);},setMapVariableValue=function(_0x234ede,_0x540d6d,_0x4d3c4){const _0x362c4f=_0x237a7a;let _0x290db1=[0x0,0x0,_0x362c4f(0x102)[_0x362c4f(0x307)](_0x234ede,_0x540d6d)];$gameSelfSwitches[_0x362c4f(0x4cf)](_0x290db1,_0x4d3c4);},DataManager[_0x237a7a(0x3e4)]=function(_0x4838b7){const _0xb09125=_0x237a7a;if(SceneManager[_0xb09125(0x2be)][_0xb09125(0x630)]===Scene_Debug)return![];return VisuMZ[_0xb09125(0x454)][_0xb09125(0x572)](_0x4838b7);},DataManager[_0x237a7a(0x63a)]=function(_0x39f9c5){const _0xdee7db=_0x237a7a;if(SceneManager['_scene']['constructor']===Scene_Debug)return![];return VisuMZ[_0xdee7db(0x500)][_0xdee7db(0x572)](_0x39f9c5);},DataManager[_0x237a7a(0x146)]=function(_0x56ec09){const _0x1d9e3d=_0x237a7a;if(SceneManager[_0x1d9e3d(0x2be)][_0x1d9e3d(0x630)]===Scene_Debug)return![];return VisuMZ[_0x1d9e3d(0x3bb)][_0x1d9e3d(0x572)](_0x56ec09);},DataManager['isSelfVariable']=function(_0x11147a){const _0x2dff2a=_0x237a7a;if(SceneManager[_0x2dff2a(0x2be)][_0x2dff2a(0x630)]===Scene_Debug)return![];return VisuMZ[_0x2dff2a(0x4fb)][_0x2dff2a(0x572)](_0x11147a);},DataManager[_0x237a7a(0x4f5)]=function(_0x37d2de){const _0x5af7a1=_0x237a7a;if(BattleManager[_0x5af7a1(0x4c0)]())return![];return VisuMZ[_0x5af7a1(0x172)][_0x5af7a1(0x572)](_0x37d2de);},DataManager['isMapVariable']=function(_0x2e089e){const _0x85771e=_0x237a7a;if(BattleManager[_0x85771e(0x4c0)]())return![];return VisuMZ['MapVariables'][_0x85771e(0x572)](_0x2e089e);},SceneManager[_0x237a7a(0x5e8)]=function(){const _0x5cf13a=_0x237a7a;return this[_0x5cf13a(0x2be)]&&this[_0x5cf13a(0x2be)][_0x5cf13a(0x630)]===Scene_Map;},VisuMZ['EventsMoveCore'][_0x237a7a(0x2ee)]=Game_Temp[_0x237a7a(0x2ed)][_0x237a7a(0x29c)],Game_Temp[_0x237a7a(0x2ed)][_0x237a7a(0x29c)]=function(_0x25315b,_0x22d419){const _0x1d9ab1=_0x237a7a;if(this[_0x1d9ab1(0x1d6)](_0x25315b,_0x22d419))return;VisuMZ[_0x1d9ab1(0x1cc)][_0x1d9ab1(0x2ee)][_0x1d9ab1(0x275)](this,_0x25315b,_0x22d419);},Game_Temp[_0x237a7a(0x2ed)][_0x237a7a(0x1d6)]=function(_0x33b92a,_0x1b7bf8){const _0x479718=_0x237a7a,_0x5b1126=$gameMap[_0x479718(0x344)](_0x33b92a,_0x1b7bf8);for(const _0x43c958 of _0x5b1126){if(_0x43c958&&_0x43c958['hasClickTrigger']()){if(_0x479718(0x11c)===_0x479718(0x51a))this[_0x479718(0x3a1)]=_0x5e6e68(_0xbd7bff['$1'])[_0x479718(0x376)]()[_0x479718(0x19c)]();else return _0x43c958['onClickTrigger'](),!![];}}if(TouchInput[_0x479718(0x32d)]()&&_0x5b1126[_0x479718(0x33c)]>0x0){if(_0x479718(0x44c)===_0x479718(0x44c))TouchInput[_0x479718(0x48a)]();else{if(_0x15c6ec[_0x479718(0x349)][_0x4d4e87][_0x479718(0x240)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x482a0e[_0x479718(0x500)]['push'](_0x2208f6);if(_0x3b57b2[_0x479718(0x349)][_0x40f205][_0x479718(0x240)](/<SELF>/i))_0x4cf1a7[_0x479718(0x4fb)][_0x479718(0x5a6)](_0x259b80);if(_0x2259e9[_0x479718(0x349)][_0x5e492e]['match'](/<MAP>/i))_0x32c392[_0x479718(0x315)]['push'](_0x112a6f);}}return![];},Game_Temp[_0x237a7a(0x2ed)]['setLastPluginCommandInterpreter']=function(_0xe9353c){const _0x3079ab=_0x237a7a;this[_0x3079ab(0x424)]=_0xe9353c;},Game_Temp['prototype'][_0x237a7a(0x1ba)]=function(){const _0x213ab4=_0x237a7a;return this[_0x213ab4(0x424)];},Game_Temp[_0x237a7a(0x2ed)]['registerSelfTarget']=function(_0x2a2e7d){const _0x34f51c=_0x237a7a;this[_0x34f51c(0x1d0)]=_0x2a2e7d;},Game_Temp['prototype'][_0x237a7a(0x58a)]=function(){const _0x517072=_0x237a7a;this[_0x517072(0x1d0)]=undefined;},Game_Temp['prototype'][_0x237a7a(0x558)]=function(){return this['_selfTarget'];},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x368)]=Game_System['prototype'][_0x237a7a(0x2ac)],Game_System[_0x237a7a(0x2ed)]['initialize']=function(){const _0x226b2b=_0x237a7a;VisuMZ[_0x226b2b(0x1cc)]['Game_System_initialize']['call'](this),this[_0x226b2b(0x402)](),this['initFollowerController']();},Game_System[_0x237a7a(0x2ed)]['initEventsMoveCore']=function(){const _0xf13610=_0x237a7a;this[_0xf13610(0x467)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0xf13610(0x274)]={},this[_0xf13610(0x330)]=[],this[_0xf13610(0x2cd)]={},this[_0xf13610(0x2c6)]={},this['_DisablePlayerControl']=![],this[_0xf13610(0x609)]=_0xf13610(0x53e);},Game_System[_0x237a7a(0x2ed)]['isDashingEnabled']=function(){const _0x1dad45=_0x237a7a;if(this[_0x1dad45(0x467)]===undefined)this[_0x1dad45(0x402)]();if(this[_0x1dad45(0x467)][_0x1dad45(0x3eb)]===undefined)this[_0x1dad45(0x402)]();return this['_EventsMoveCoreSettings'][_0x1dad45(0x3eb)];},Game_System['prototype'][_0x237a7a(0x120)]=function(_0x39d88a){const _0x9fe5c3=_0x237a7a;if(this[_0x9fe5c3(0x467)]===undefined)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x9fe5c3(0x3eb)]===undefined)this[_0x9fe5c3(0x402)]();this[_0x9fe5c3(0x467)]['DashingEnable']=_0x39d88a;},Game_System['prototype']['isAllowEventAutoMovement']=function(){const _0x30c59e=_0x237a7a;if(this[_0x30c59e(0x467)]===undefined)this[_0x30c59e(0x402)]();if(this[_0x30c59e(0x467)]['EventAutoMovement']===undefined)this['initEventsMoveCore']();return this[_0x30c59e(0x467)]['EventAutoMovement'];},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0x225)]=function(_0x50e8f1){const _0x12f488=_0x237a7a;if(this['_EventsMoveCoreSettings']===undefined)this['initEventsMoveCore']();if(this[_0x12f488(0x467)][_0x12f488(0x600)]===undefined)this[_0x12f488(0x402)]();this[_0x12f488(0x467)][_0x12f488(0x600)]=_0x50e8f1;},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0x2e0)]=function(){const _0x290fdb=_0x237a7a;if(this[_0x290fdb(0x467)]===undefined)this[_0x290fdb(0x402)]();if(this[_0x290fdb(0x467)][_0x290fdb(0x46c)]===undefined)this[_0x290fdb(0x402)]();return this[_0x290fdb(0x467)][_0x290fdb(0x46c)];},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0x29f)]=function(_0x3555bc){const _0x37ba75=_0x237a7a;if(this[_0x37ba75(0x467)]===undefined)this[_0x37ba75(0x402)]();if(this[_0x37ba75(0x467)]['VisibleEventLabels']===undefined)this['initEventsMoveCore']();this['_EventsMoveCoreSettings'][_0x37ba75(0x46c)]=_0x3555bc;},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0x388)]=function(){const _0x3856ea=_0x237a7a;return this['_DisablePlayerControl']===undefined&&(this[_0x3856ea(0x35b)]=![]),this[_0x3856ea(0x35b)];},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0xfe)]=function(_0x103b75){const _0xf1ce8c=_0x237a7a;this[_0xf1ce8c(0x35b)]=_0x103b75;},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0x47c)]=function(){const _0xf9898f=_0x237a7a;return this[_0xf9898f(0x609)];},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0x3d4)]=function(_0x4e4522){const _0x513298=_0x237a7a;this[_0x513298(0x609)]=String(_0x4e4522)[_0x513298(0x21a)]()['trim']();},Game_System['prototype'][_0x237a7a(0x212)]=function(_0x2745a2){const _0x5a38fa=_0x237a7a;if(this[_0x5a38fa(0x274)]===undefined)this[_0x5a38fa(0x402)]();if(!_0x2745a2)return null;if(_0x2745a2===$gamePlayer)return this['_EventIcons'][_0x5a38fa(0x5c9)];else{const _0x2d1a51=VisuMZ[_0x5a38fa(0x1cc)][_0x5a38fa(0x3e2)],_0x3a5df2=_0x5a38fa(0x3ce)[_0x5a38fa(0x307)](_0x2745a2['_mapId'],_0x2745a2[_0x5a38fa(0x5b7)]);return this[_0x5a38fa(0x274)][_0x3a5df2]=this['_EventIcons'][_0x3a5df2]||{'iconIndex':0x0,'bufferX':_0x2d1a51['Icon'][_0x5a38fa(0x36a)],'bufferY':_0x2d1a51[_0x5a38fa(0x211)]['BufferY'],'blendMode':_0x2d1a51[_0x5a38fa(0x211)]['BlendMode']},this[_0x5a38fa(0x274)][_0x3a5df2];}},Game_System[_0x237a7a(0x2ed)]['setEventIconData']=function(_0x347b54,_0x4c3794,_0xf07610,_0x5d54d8,_0x5dfa5f){const _0x121dd6=_0x237a7a;if(this[_0x121dd6(0x274)]===undefined)this[_0x121dd6(0x402)]();const _0x250436=_0x347b54===$gamePlayer?_0x121dd6(0x5c9):_0x121dd6(0x3ce)[_0x121dd6(0x307)](_0x347b54['_mapId'],_0x347b54[_0x121dd6(0x5b7)]);this[_0x121dd6(0x274)][_0x250436]={'iconIndex':_0x4c3794,'bufferX':_0xf07610,'bufferY':_0x5d54d8,'blendMode':_0x5dfa5f};},Game_System[_0x237a7a(0x2ed)]['setEventIconDataKey']=function(_0x1340fd,_0x2cb27a,_0x1476be,_0x234d10,_0x130cde,_0x2f43d7){const _0x226401=_0x237a7a;if(this[_0x226401(0x274)]===undefined)this[_0x226401(0x402)]();const _0x4e7f53=_0x226401(0x3ce)[_0x226401(0x307)](_0x1340fd,_0x2cb27a);this[_0x226401(0x274)][_0x4e7f53]={'iconIndex':_0x1476be,'bufferX':_0x234d10,'bufferY':_0x130cde,'blendMode':_0x2f43d7};},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0x1b9)]=function(_0x16cee6){const _0xe85f9c=_0x237a7a;if(this[_0xe85f9c(0x274)]===undefined)this['initEventsMoveCore']();if(!_0x16cee6)return null;if(_0x16cee6===$gamePlayer)delete this['_EventIcons'][_0xe85f9c(0x5c9)];else{if(_0xe85f9c(0x60d)!==_0xe85f9c(0x60d)){if(_0x28b321>0x0&&_0x528585<0x0)return 0x9;if(_0xa52fed<0x0&&_0x3d37a7<0x0)return 0x7;if(_0x3e6284>0x0&&_0x30b6b1>0x0)return 0x3;if(_0x5aa96b<0x0&&_0x314168>0x0)return 0x1;}else this['deleteIconsOnEventsDataKey'](_0x16cee6[_0xe85f9c(0x4e7)],_0x16cee6[_0xe85f9c(0x5b7)]);}},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0x519)]=function(_0xada57b,_0x538cc7){const _0x14351c=_0x237a7a;if(this[_0x14351c(0x274)]===undefined)this[_0x14351c(0x402)]();const _0x448145=_0x14351c(0x3ce)['format'](_0xada57b,_0x538cc7);delete this[_0x14351c(0x274)][_0x448145];},Game_System[_0x237a7a(0x2ed)]['getSavedEventLocation']=function(_0x1a712c){const _0x415820=_0x237a7a;if(this[_0x415820(0x2c6)]===undefined)this[_0x415820(0x402)]();if(!_0x1a712c)return null;const _0x2365a9='Map%1-Event%2'[_0x415820(0x307)](_0x1a712c['_mapId'],_0x1a712c['_eventId']);return this[_0x415820(0x2c6)][_0x2365a9];},Game_System['prototype'][_0x237a7a(0x3ca)]=function(_0xc9b35c){const _0x45df64=_0x237a7a;if(this['_SavedEventLocations']===undefined)this[_0x45df64(0x402)]();if(!_0xc9b35c)return;const _0x28b030=_0x45df64(0x3ce)[_0x45df64(0x307)](_0xc9b35c[_0x45df64(0x4e7)],_0xc9b35c[_0x45df64(0x5b7)]);this[_0x45df64(0x2c6)][_0x28b030]={'direction':_0xc9b35c[_0x45df64(0x511)](),'x':Math[_0x45df64(0x5f6)](_0xc9b35c['x']),'y':Math[_0x45df64(0x5f6)](_0xc9b35c['y']),'pageIndex':_0xc9b35c[_0x45df64(0x36c)],'moveRouteIndex':_0xc9b35c[_0x45df64(0x10a)]};},Game_System['prototype']['deleteSavedEventLocation']=function(_0x3b127f){const _0x49387b=_0x237a7a;if(this[_0x49387b(0x2c6)]===undefined)this[_0x49387b(0x402)]();if(!_0x3b127f)return;this[_0x49387b(0x561)](_0x3b127f[_0x49387b(0x4e7)],_0x3b127f['_eventId']);},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0x561)]=function(_0x5a59c2,_0x39ef70){const _0x2cbf15=_0x237a7a;if(this['_SavedEventLocations']===undefined)this[_0x2cbf15(0x402)]();const _0x59a725=_0x2cbf15(0x3ce)[_0x2cbf15(0x307)](_0x5a59c2,_0x39ef70);delete this['_SavedEventLocations'][_0x59a725];},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0xf7)]=function(_0xc0a29f,_0x178dd5,_0x5ea75f,_0x51a95b,_0x44d927,_0x4c51db,_0x479a21){const _0x42cbae=_0x237a7a;if(this['_SavedEventLocations']===undefined)this[_0x42cbae(0x402)]();const _0x1854c6=_0x42cbae(0x3ce)[_0x42cbae(0x307)](_0xc0a29f,_0x178dd5);this[_0x42cbae(0x2c6)][_0x1854c6]={'direction':_0x44d927,'x':Math[_0x42cbae(0x5f6)](_0x5ea75f),'y':Math[_0x42cbae(0x5f6)](_0x51a95b),'pageIndex':_0x4c51db,'moveRouteIndex':_0x479a21};},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0x4ea)]=function(_0x3db8e2){const _0xd7a384=_0x237a7a;if(this[_0xd7a384(0x2cd)]===undefined)this['initEventsMoveCore']();if(!_0x3db8e2)return;const _0x55d0f5='Map%1-Event%2'[_0xd7a384(0x307)](_0x3db8e2[_0xd7a384(0x4e7)],_0x3db8e2[_0xd7a384(0x5b7)]);return this['_PreservedEventMorphData'][_0x55d0f5];},Game_System[_0x237a7a(0x2ed)]['savePreservedMorphEventDataKey']=function(_0x1fc70f,_0x59da0d,_0x4cabfb,_0x3fa78b,_0x29787f){const _0x4788ac=_0x237a7a;if(this[_0x4788ac(0x2cd)]===undefined)this[_0x4788ac(0x402)]();const _0x26f515=_0x4788ac(0x3ce)[_0x4788ac(0x307)](_0x1fc70f,_0x59da0d);this[_0x4788ac(0x2cd)][_0x26f515]={'template':_0x4cabfb,'mapId':_0x3fa78b,'eventId':_0x29787f};},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0x612)]=function(_0x1345af,_0xdd4d58){const _0x538b3b=_0x237a7a;if(this[_0x538b3b(0x2cd)]===undefined)this['initEventsMoveCore']();const _0xbea197=_0x538b3b(0x3ce)[_0x538b3b(0x307)](_0x1345af,_0xdd4d58);delete this[_0x538b3b(0x2cd)][_0xbea197];},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0x504)]=function(_0x150d66){const _0x2d8a1c=_0x237a7a;if(this[_0x2d8a1c(0x330)]===undefined)this[_0x2d8a1c(0x402)]();return this[_0x2d8a1c(0x330)][_0x150d66]=this[_0x2d8a1c(0x330)][_0x150d66]||[],this[_0x2d8a1c(0x330)][_0x150d66];},Game_System[_0x237a7a(0x2ed)]['removeTemporaryMapSpawnedEvents']=function(_0x1fe1f8){const _0x483f44=_0x237a7a,_0x4bce27=this[_0x483f44(0x504)](_0x1fe1f8);for(const _0x439c90 of _0x4bce27){if(!_0x439c90)continue;if(_0x439c90['_spawnPreserved'])continue;const _0x360f0a=_0x4bce27[_0x483f44(0x35e)](_0x439c90);_0x4bce27[_0x360f0a]=null;}},Game_System[_0x237a7a(0x2ed)]['initFollowerController']=function(){const _0x48ddab=_0x237a7a;this[_0x48ddab(0x290)]=0x0,this['_followerChaseOff']=![];},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0x233)]=function(){const _0x39ffdd=_0x237a7a;if(this[_0x39ffdd(0x290)]===undefined)this[_0x39ffdd(0x189)]();return this[_0x39ffdd(0x290)];},Game_System['prototype'][_0x237a7a(0x2db)]=function(_0xf05a4){const _0x588b21=_0x237a7a;if(this[_0x588b21(0x290)]===undefined)this[_0x588b21(0x189)]();this[_0x588b21(0x290)]=_0xf05a4;;},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x18d)]=Game_Interpreter['prototype'][_0x237a7a(0x35d)],Game_Interpreter['prototype'][_0x237a7a(0x35d)]=function(_0x20339a){const _0x5e76e4=_0x237a7a;if(!$gameParty[_0x5e76e4(0x624)]()&&_0x20339a<0x0){let _0x18318e=$gameSystem[_0x5e76e4(0x233)]();if(_0x18318e>0x0){if(_0x5e76e4(0x11a)===_0x5e76e4(0x11a))return $gamePlayer[_0x5e76e4(0x48f)]()[_0x5e76e4(0x123)](_0x18318e-0x1);else _0x57cb56['registerSelfEvent'](),_0x472d60[_0x5e76e4(0x1cc)]['Window_ScrollText_startMessage'][_0x5e76e4(0x275)](this),_0x18c85c['clearSelfTarget']();}}return VisuMZ[_0x5e76e4(0x1cc)]['Game_Interpreter_character'][_0x5e76e4(0x275)](this,_0x20339a);},Game_System['prototype'][_0x237a7a(0x4e4)]=function(){const _0x4e5e6e=_0x237a7a;if(this['_followerChaseOff']===undefined)this[_0x4e5e6e(0x189)]();return this['_followerChaseOff'];},Game_System[_0x237a7a(0x2ed)][_0x237a7a(0x523)]=function(_0x5cac44){const _0x1b4638=_0x237a7a;if(this['_followerChaseOff']===undefined)this[_0x1b4638(0x189)]();this[_0x1b4638(0x404)]=_0x5cac44;;},VisuMZ['EventsMoveCore']['Game_Timer_initialize']=Game_Timer[_0x237a7a(0x2ed)][_0x237a7a(0x2ac)],Game_Timer[_0x237a7a(0x2ed)][_0x237a7a(0x2ac)]=function(){const _0xf814fa=_0x237a7a;VisuMZ[_0xf814fa(0x1cc)][_0xf814fa(0x541)][_0xf814fa(0x275)](this),this['initEventsMoveCore']();},Game_Timer[_0x237a7a(0x2ed)]['initEventsMoveCore']=function(){const _0x272111=_0x237a7a;this[_0x272111(0x2c5)]=![],this[_0x272111(0x433)]=-0x1,this[_0x272111(0x615)]=0x0;},Game_Timer['prototype'][_0x237a7a(0x378)]=function(_0x1e2249){const _0x4c619b=_0x237a7a;if(!_0x1e2249)return;if(!this[_0x4c619b(0x25c)])return;if(this[_0x4c619b(0x2c5)])return;if(this[_0x4c619b(0x316)]<=0x0)return;if(this['_speed']===undefined)this[_0x4c619b(0x402)]();this[_0x4c619b(0x316)]+=this[_0x4c619b(0x433)],this[_0x4c619b(0x316)]<=0x0&&this[_0x4c619b(0x50e)]();},VisuMZ['EventsMoveCore'][_0x237a7a(0x538)]=Game_Timer['prototype'][_0x237a7a(0x3f3)],Game_Timer['prototype'][_0x237a7a(0x3f3)]=function(_0x50c8ad){const _0x481fc6=_0x237a7a;VisuMZ[_0x481fc6(0x1cc)][_0x481fc6(0x538)]['call'](this,_0x50c8ad);if(this[_0x481fc6(0x2c5)]===undefined)this[_0x481fc6(0x402)]();this[_0x481fc6(0x2c5)]=![];},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x31e)]=Game_Timer[_0x237a7a(0x2ed)][_0x237a7a(0x366)],Game_Timer[_0x237a7a(0x2ed)][_0x237a7a(0x366)]=function(){const _0xbfb9fc=_0x237a7a;VisuMZ[_0xbfb9fc(0x1cc)][_0xbfb9fc(0x31e)][_0xbfb9fc(0x275)](this);if(this[_0xbfb9fc(0x2c5)]===undefined)this['initEventsMoveCore']();this['_paused']=![];},Game_Timer[_0x237a7a(0x2ed)][_0x237a7a(0x41a)]=function(){const _0x32cab7=_0x237a7a;if(this[_0x32cab7(0x316)]<=0x0)return;this[_0x32cab7(0x2c5)]=!![],this[_0x32cab7(0x25c)]=!![];},Game_Timer[_0x237a7a(0x2ed)][_0x237a7a(0x2a7)]=function(){const _0x3c7471=_0x237a7a;if(this['_frames']<=0x0)return;this[_0x3c7471(0x2c5)]=![],this[_0x3c7471(0x25c)]=!![];},Game_Timer[_0x237a7a(0x2ed)][_0x237a7a(0x332)]=function(_0x186add){const _0x483ad8=_0x237a7a;this[_0x483ad8(0x316)]=this[_0x483ad8(0x316)]||0x0,this[_0x483ad8(0x316)]+=_0x186add,this[_0x483ad8(0x25c)]=!![],this['_frames']=Math[_0x483ad8(0xf1)](0x1,this[_0x483ad8(0x316)]);},Game_Timer[_0x237a7a(0x2ed)][_0x237a7a(0x582)]=function(_0x2645ad){const _0x19890f=_0x237a7a;this['_frames']=this[_0x19890f(0x316)]||0x0,this['_frames']=_0x2645ad,this[_0x19890f(0x25c)]=!![],this[_0x19890f(0x316)]=Math[_0x19890f(0xf1)](0x1,this[_0x19890f(0x316)]);},Game_Timer[_0x237a7a(0x2ed)][_0x237a7a(0x5d9)]=function(_0x19c5a0){const _0x477467=_0x237a7a;this[_0x477467(0x433)]=_0x19c5a0,this[_0x477467(0x25c)]=!![],_0x19c5a0>0x0&&(this[_0x477467(0x316)]=Math[_0x477467(0xf1)](this[_0x477467(0x316)],0x1));},Game_Timer['prototype'][_0x237a7a(0x4f7)]=function(_0x37c9fb){const _0x5854fd=_0x237a7a;if(this['_expireCommonEvent']===undefined)this[_0x5854fd(0x402)]();this[_0x5854fd(0x615)]=_0x37c9fb;},VisuMZ['EventsMoveCore'][_0x237a7a(0x3a6)]=Game_Timer[_0x237a7a(0x2ed)][_0x237a7a(0x50e)],Game_Timer[_0x237a7a(0x2ed)][_0x237a7a(0x50e)]=function(){const _0x59d0b7=_0x237a7a;if(this['_expireCommonEvent']===undefined)this[_0x59d0b7(0x402)]();if(this[_0x59d0b7(0x615)]){if(_0x59d0b7(0x158)!==_0x59d0b7(0x550))$gameTemp['reserveCommonEvent'](this[_0x59d0b7(0x615)]);else return _0x137a8e[_0x59d0b7(0x1cc)][_0x59d0b7(0x340)][_0x59d0b7(0x275)](this,_0x58686c);}else{if('fBAuQ'===_0x59d0b7(0x305)){const _0x502868=_0x59d0b7(0x260)[_0x59d0b7(0x307)](_0x1a01b1[_0x59d0b7(0x510)](0x0)[_0x59d0b7(0x376)]()+_0x2f865e['slice'](0x1));if(_0x53dca5[_0x502868])return _0x2dfba3[_0x502868][_0x59d0b7(0x572)](_0x50425a);}else VisuMZ['EventsMoveCore'][_0x59d0b7(0x3a6)][_0x59d0b7(0x275)](this);}},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x14b)]=Game_Message[_0x237a7a(0x2ed)][_0x237a7a(0x5e7)],Game_Message['prototype'][_0x237a7a(0x5e7)]=function(_0x46b436){const _0x49859d=_0x237a7a;VisuMZ[_0x49859d(0x1cc)][_0x49859d(0x14b)][_0x49859d(0x275)](this,_0x46b436),this[_0x49859d(0x1c5)]=$gameTemp['getSelfTarget']();},Game_Message[_0x237a7a(0x2ed)][_0x237a7a(0x281)]=function(){const _0x3ef89c=_0x237a7a;$gameTemp[_0x3ef89c(0x220)](this['_selfEvent']);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x12e)]=Game_Switches[_0x237a7a(0x2ed)]['value'],Game_Switches['prototype'][_0x237a7a(0x228)]=function(_0x1f30d2){const _0x182b8c=_0x237a7a;if(DataManager[_0x182b8c(0x3e4)](_0x1f30d2))return!!this['advancedValue'](_0x1f30d2);else{if(DataManager['isSelfSwitch'](_0x1f30d2))return!!this[_0x182b8c(0x386)](_0x1f30d2);else{if(DataManager[_0x182b8c(0x4f5)](_0x1f30d2))return!!this[_0x182b8c(0x5ac)](_0x1f30d2);else{if(_0x182b8c(0x638)!==_0x182b8c(0x638)){const _0x526622=this[_0x182b8c(0x511)](),_0x4c3e24=_0x415999[_0x182b8c(0x3b9)](this['x'],_0x526622),_0x5c8f8c=_0x4c64a7['roundYWithDirection'](this['y'],_0x526622);this[_0x182b8c(0x2b6)](_0x4c3e24,_0x5c8f8c);}else return VisuMZ['EventsMoveCore']['Game_Switches_value'][_0x182b8c(0x275)](this,_0x1f30d2);}}}},Game_Switches[_0x237a7a(0x46a)]={},Game_Switches[_0x237a7a(0x2ed)][_0x237a7a(0x5d7)]=function(_0x548405){const _0x3036e1=_0x237a7a;if(!Game_Switches[_0x3036e1(0x46a)][_0x548405]){if('JUsJk'===_0x3036e1(0x1f4)){_0x51848e[_0x3036e1(0x349)][_0x43e745]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x4d19a5=_0x3036e1(0x1c1)[_0x3036e1(0x307)](_0x509db(_0x426646['$1']));_0x57810b[_0x3036e1(0x46a)][_0xef0b02]=new _0x526e83(_0x3036e1(0x39d),_0x4d19a5);}else{$dataSystem['switches'][_0x548405][_0x3036e1(0x240)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x4710a4=_0x3036e1(0x1c1)[_0x3036e1(0x307)](String(RegExp['$1']));Game_Switches[_0x3036e1(0x46a)][_0x548405]=new Function(_0x3036e1(0x390),_0x4710a4);}}const _0x9c54d3=$gameTemp['getSelfTarget']()||this;return Game_Switches[_0x3036e1(0x46a)][_0x548405][_0x3036e1(0x275)](_0x9c54d3,_0x548405);},Game_Switches['prototype'][_0x237a7a(0x386)]=function(_0x1cbbb3){const _0xcff28f=_0x237a7a,_0x2e7172=$gameTemp[_0xcff28f(0x558)]()||this;if(_0x2e7172[_0xcff28f(0x630)]!==Game_Event)return VisuMZ[_0xcff28f(0x1cc)][_0xcff28f(0x12e)][_0xcff28f(0x275)](this,_0x1cbbb3);else{const _0x44d29e=[_0x2e7172[_0xcff28f(0x4e7)],_0x2e7172['_eventId'],'Self\x20Switch\x20%1'['format'](_0x1cbbb3)];return $gameSelfSwitches[_0xcff28f(0x228)](_0x44d29e);}},Game_Switches[_0x237a7a(0x2ed)][_0x237a7a(0x5ac)]=function(_0x24fd6b){const _0x2dd4af=_0x237a7a,_0x856410=$gameMap?$gameMap['mapId']():0x0,_0x1622d9=[0x0,0x0,_0x2dd4af(0x5cd)[_0x2dd4af(0x307)](_0x856410,_0x24fd6b)];return $gameSelfSwitches[_0x2dd4af(0x228)](_0x1622d9);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x28d)]=Game_Switches[_0x237a7a(0x2ed)][_0x237a7a(0x4cf)],Game_Switches[_0x237a7a(0x2ed)][_0x237a7a(0x4cf)]=function(_0x3f0714,_0x2c84ff){const _0xc8109a=_0x237a7a;if(DataManager['isSelfSwitch'](_0x3f0714))this[_0xc8109a(0x25b)](_0x3f0714,_0x2c84ff);else{if(DataManager['isMapSwitch'](_0x3f0714))this['setMapValue'](_0x3f0714,_0x2c84ff);else{if(_0xc8109a(0x618)==='xxHkT')VisuMZ[_0xc8109a(0x1cc)]['Game_Switches_setValue'][_0xc8109a(0x275)](this,_0x3f0714,_0x2c84ff);else{_0x7147f9['ConvertParams'](_0x200c75,_0x31ab1f);const _0x432425=_0x550adf[_0xc8109a(0x1db)];_0x286e9b['setControlledFollowerID'](_0x432425);}}}},Game_Switches[_0x237a7a(0x2ed)][_0x237a7a(0x25b)]=function(_0x23e289,_0x3545d7){const _0x22349c=_0x237a7a,_0x2afc33=$gameTemp[_0x22349c(0x558)]()||this;if(_0x2afc33[_0x22349c(0x630)]!==Game_Event)_0x22349c(0x1a0)!=='keyUX'?_0x1db119+=_0x4bdd3f[_0x22349c(0x5d1)][0x0]:VisuMZ[_0x22349c(0x1cc)][_0x22349c(0x28d)]['call'](this,_0x23e289,_0x3545d7);else{const _0x568af8=[_0x2afc33[_0x22349c(0x4e7)],_0x2afc33[_0x22349c(0x5b7)],'Self\x20Switch\x20%1'[_0x22349c(0x307)](_0x23e289)];$gameSelfSwitches['setValue'](_0x568af8,_0x3545d7);}},Game_Switches[_0x237a7a(0x2ed)][_0x237a7a(0x42a)]=function(_0x3705f7,_0xf559e7){const _0x5cea33=_0x237a7a,_0x240933=$gameMap?$gameMap[_0x5cea33(0x438)]():0x0,_0x4b6009=[0x0,0x0,_0x5cea33(0x5cd)[_0x5cea33(0x307)](_0x240933,_0x3705f7)];return $gameSelfSwitches[_0x5cea33(0x4cf)](_0x4b6009,_0xf559e7);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x1a2)]=Game_Variables['prototype']['value'],Game_Variables[_0x237a7a(0x2ed)][_0x237a7a(0x228)]=function(_0x2bb13b){const _0x4b0850=_0x237a7a;if(DataManager[_0x4b0850(0x63a)](_0x2bb13b)){if(_0x4b0850(0x516)!==_0x4b0850(0x516))this[_0x4b0850(0x319)]=!![],this[_0x4b0850(0x2b9)]=![];else return this[_0x4b0850(0x5d7)](_0x2bb13b);}else{if(DataManager[_0x4b0850(0x14c)](_0x2bb13b))return this[_0x4b0850(0x386)](_0x2bb13b);else{if(DataManager[_0x4b0850(0x468)](_0x2bb13b)){if('dZwxF'===_0x4b0850(0x342))return this[_0x4b0850(0x5ac)](_0x2bb13b);else{if(_0x328f48>this['x']&&this[_0x4b0850(0x295)](this['x'],this['y'],0x6))_0x21e0c4=0x3;if(_0x10b2bf<this['x']&&this[_0x4b0850(0x295)](this['x'],this['y'],0x4))_0x2decab=0x1;}}else return VisuMZ[_0x4b0850(0x1cc)][_0x4b0850(0x1a2)][_0x4b0850(0x275)](this,_0x2bb13b);}}},Game_Variables['advancedFunc']={},Game_Variables[_0x237a7a(0x2ed)][_0x237a7a(0x5d7)]=function(_0x1152bf){const _0x4941e6=_0x237a7a;if(!Game_Variables[_0x4941e6(0x46a)][_0x1152bf]){$dataSystem[_0x4941e6(0x349)][_0x1152bf][_0x4941e6(0x240)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x263423=_0x4941e6(0x1c1)[_0x4941e6(0x307)](String(RegExp['$1']));Game_Variables[_0x4941e6(0x46a)][_0x1152bf]=new Function(_0x4941e6(0x39d),_0x263423);}const _0x236a75=$gameTemp[_0x4941e6(0x558)]()||this;return Game_Variables['advancedFunc'][_0x1152bf][_0x4941e6(0x275)](_0x236a75,_0x1152bf);},Game_Variables['prototype'][_0x237a7a(0x386)]=function(_0x1860d5){const _0x44b14d=_0x237a7a,_0x404314=$gameTemp['getSelfTarget']()||this;if(_0x404314[_0x44b14d(0x630)]!==Game_Event)return VisuMZ['EventsMoveCore']['Game_Variables_value']['call'](this,_0x1860d5);else{const _0x2e8081=[_0x404314['_mapId'],_0x404314['_eventId'],'Self\x20Variable\x20%1'[_0x44b14d(0x307)](_0x1860d5)];return $gameSelfSwitches[_0x44b14d(0x228)](_0x2e8081);}},Game_Variables[_0x237a7a(0x2ed)][_0x237a7a(0x5ac)]=function(_0xdca567){const _0xe286ad=_0x237a7a,_0x5a054b=$gameMap?$gameMap[_0xe286ad(0x438)]():0x0,_0x1a3b19=[0x0,0x0,_0xe286ad(0x102)[_0xe286ad(0x307)](_0x5a054b,_0xdca567)];return $gameSelfSwitches[_0xe286ad(0x228)](_0x1a3b19)||0x0;},VisuMZ[_0x237a7a(0x1cc)]['Game_Variables_setValue']=Game_Variables['prototype'][_0x237a7a(0x4cf)],Game_Variables['prototype'][_0x237a7a(0x4cf)]=function(_0x5c9bdc,_0x4fda43){const _0x43b75b=_0x237a7a;if(DataManager[_0x43b75b(0x14c)](_0x5c9bdc)){if(_0x43b75b(0x193)===_0x43b75b(0x193))this[_0x43b75b(0x25b)](_0x5c9bdc,_0x4fda43);else{const _0x2c3b13=this[_0x43b75b(0x418)]();return _0x2c3b13?_0x2c3b13[_0x43b75b(0x5b7)]:0x0;}}else DataManager['isMapVariable'](_0x5c9bdc)?this[_0x43b75b(0x42a)](_0x5c9bdc,_0x4fda43):VisuMZ['EventsMoveCore'][_0x43b75b(0x554)]['call'](this,_0x5c9bdc,_0x4fda43);},Game_Variables[_0x237a7a(0x2ed)][_0x237a7a(0x25b)]=function(_0x296b50,_0x53021e){const _0x17ed32=_0x237a7a,_0x28f823=$gameTemp[_0x17ed32(0x558)]()||this;if(_0x28f823['constructor']!==Game_Event){if(_0x17ed32(0x283)!==_0x17ed32(0x283)){_0xc0f644[_0x17ed32(0x124)](_0x23cd4e,_0xf0bdbd);const _0x5bc9bb=!_0x2480d6['Chase'];_0x48601c[_0x17ed32(0x523)](_0x5bc9bb);}else VisuMZ[_0x17ed32(0x1cc)][_0x17ed32(0x554)]['call'](this,_0x296b50,_0x53021e);}else{if('tFXbt'!==_0x17ed32(0x564)){const _0x4ae340=_0x15a485[_0x17ed32(0x5d6)](_0x3483ae(_0x4674b2['$1'])),_0x1065aa=this[_0x17ed32(0x61f)](_0x2f4f3b);return this[_0x17ed32(0x4f2)](_0x4ae340,_0x1065aa);}else{const _0x3e2abb=[_0x28f823[_0x17ed32(0x4e7)],_0x28f823['_eventId'],_0x17ed32(0x43c)[_0x17ed32(0x307)](_0x296b50)];$gameSelfSwitches[_0x17ed32(0x4cf)](_0x3e2abb,_0x53021e);}}},Game_Variables[_0x237a7a(0x2ed)]['setMapValue']=function(_0xa7aa05,_0x41a360){const _0x58cbe7=_0x237a7a,_0x3541e0=$gameMap?$gameMap[_0x58cbe7(0x438)]():0x0,_0x253c91=[0x0,0x0,'Map\x20%1\x20Variable\x20%2'['format'](_0x3541e0,_0xa7aa05)];$gameSelfSwitches[_0x58cbe7(0x4cf)](_0x253c91,_0x41a360);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x327)]=Game_SelfSwitches['prototype'][_0x237a7a(0x228)],Game_SelfSwitches[_0x237a7a(0x2ed)][_0x237a7a(0x228)]=function(_0x1ec860){const _0x549bb9=_0x237a7a;if(_0x1ec860[0x2]['match'](/(?:SELF|MAP)/i)){if('PIHqx'===_0x549bb9(0x24b))return this[_0x549bb9(0x386)](_0x1ec860);else _0x471405=_0x706c69(_0x4d3827['$1'])[_0x549bb9(0x21a)]()[_0x549bb9(0x19c)](),this[_0x549bb9(0x4d8)][_0x549bb9(0x272)]=_0x5181a7,this['_activationProximity'][_0x549bb9(0x34c)]=_0x228b2e(_0x21e4c0['$2']);}else{if(_0x549bb9(0x444)!==_0x549bb9(0x21c)){return VisuMZ[_0x549bb9(0x1cc)][_0x549bb9(0x327)][_0x549bb9(0x275)](this,_0x1ec860);;}else{if(this[_0x549bb9(0x5af)]())return![];if(this[_0x549bb9(0x635)])return![];if(this[_0x549bb9(0x47f)]==='')return![];if(this[_0x549bb9(0x630)]===_0x18ebae)return![];if(this['isTransparent']())return![];return!![];}}},Game_SelfSwitches[_0x237a7a(0x2ed)][_0x237a7a(0x386)]=function(_0x1d509f){const _0x1b5f87=_0x237a7a;return _0x1d509f[0x2][_0x1b5f87(0x240)](/VAR/i)?this[_0x1b5f87(0x58b)][_0x1d509f]||0x0:!!this['_data'][_0x1d509f];},VisuMZ['EventsMoveCore']['Game_SelfSwitches_setValue']=Game_SelfSwitches[_0x237a7a(0x2ed)][_0x237a7a(0x4cf)],Game_SelfSwitches[_0x237a7a(0x2ed)][_0x237a7a(0x4cf)]=function(_0x2d5a62,_0x32ba69){const _0x5d5248=_0x237a7a;_0x2d5a62[0x2][_0x5d5248(0x240)](/(?:SELF|MAP)/i)?this[_0x5d5248(0x25b)](_0x2d5a62,_0x32ba69):_0x5d5248(0x3dc)!=='eIXaE'?VisuMZ[_0x5d5248(0x1cc)][_0x5d5248(0x5ba)]['call'](this,_0x2d5a62,_0x32ba69):this[_0x5d5248(0x2e2)]=!![];},Game_SelfSwitches[_0x237a7a(0x2ed)]['setSelfValue']=function(_0x3c4e4e,_0x88c8d6){const _0x4961d4=_0x237a7a;this[_0x4961d4(0x58b)][_0x3c4e4e]=_0x3c4e4e[0x2][_0x4961d4(0x240)](/VAR/i)?_0x88c8d6:!!_0x88c8d6,this[_0x4961d4(0x1c7)]();},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x163)]=Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x245)],Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x245)]=function(){const _0x5c0d63=_0x237a7a;VisuMZ[_0x5c0d63(0x1cc)][_0x5c0d63(0x163)][_0x5c0d63(0x275)](this),this[_0x5c0d63(0x19e)]();},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x19e)]=function(){const _0x4830f8=_0x237a7a;this['_lastMapId']=this['mapId']();const _0x3daa03=this[_0x4830f8(0x10e)]();for(const _0x1cbb23 of _0x3daa03){if(_0x4830f8(0x207)===_0x4830f8(0x293))this[_0x4830f8(0x536)][_0x4830f8(0x192)]=_0x2f0bd2(_0x5675d1['$1']);else{if(_0x1cbb23)$gameSelfSwitches[_0x4830f8(0x1c2)](_0x1cbb23);}}},Game_SelfSwitches['prototype'][_0x237a7a(0x1c2)]=function(_0x1a8291){const _0x3e7141=_0x237a7a;if(!_0x1a8291)return;if(!_0x1a8291[_0x3e7141(0x5d6)]())return;const _0xb62574=_0x1a8291[_0x3e7141(0x5d6)]()[_0x3e7141(0x4a2)]||'';if(_0xb62574[_0x3e7141(0x240)](/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i)){if(_0x3e7141(0x2b3)!==_0x3e7141(0x2b3)){this['_saveEventLocations']=![];const _0x157374=_0x131c14[_0x3e7141(0x4a2)]||'';_0x157374[_0x3e7141(0x240)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x3e7141(0x44d)]=!![]);}else{const _0x2b07ac=_0x3e7141(0x29b)[_0x3e7141(0x307)]($gameMap[_0x3e7141(0x4e7)],_0x1a8291[_0x3e7141(0x5b7)]),_0x5caeae=Object[_0x3e7141(0x4b7)](this[_0x3e7141(0x58b)])[_0x3e7141(0x56c)](_0x271ecd=>_0x271ecd[_0x3e7141(0x49f)](_0x2b07ac));while(_0x5caeae[_0x3e7141(0x33c)]>0x0){if(_0x3e7141(0x29e)!=='McScA'){const _0x5182de=_0x5caeae[_0x3e7141(0x28c)]();delete this[_0x3e7141(0x58b)][_0x5182de];}else{_0x36e3e0[_0x3e7141(0x21d)][_0x40600d][_0x3e7141(0x240)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x11f204='return\x20%1'[_0x3e7141(0x307)](_0x489e78(_0x3e50cc['$1']));_0x5b70be['advancedFunc'][_0x45298a]=new _0x593e1f(_0x3e7141(0x390),_0x11f204);}}}}},Game_SelfSwitches[_0x237a7a(0x2ed)][_0x237a7a(0x4b4)]=function(_0x2e5e10){const _0x8bc3fb=_0x237a7a,_0x164996=_0x8bc3fb(0x2ba)['format']($gameMap[_0x8bc3fb(0x4e7)]),_0x52eea5=Object[_0x8bc3fb(0x4b7)](this[_0x8bc3fb(0x58b)])[_0x8bc3fb(0x56c)](_0x52ef41=>_0x52ef41[_0x8bc3fb(0x49f)](_0x164996));while(_0x52eea5[_0x8bc3fb(0x33c)]>0x0){const _0x40ac59=_0x52eea5['shift']();delete this[_0x8bc3fb(0x58b)][_0x40ac59];}_0x2e5e10===$gameMap[_0x8bc3fb(0x438)]()&&$gameMap[_0x8bc3fb(0x427)]();},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x1a1)]=Game_Enemy[_0x237a7a(0x2ed)][_0x237a7a(0x263)],Game_Enemy[_0x237a7a(0x2ed)][_0x237a7a(0x263)]=function(_0x533e9b){const _0x147f29=_0x237a7a;$gameTemp[_0x147f29(0x220)](this);const _0x290bde=VisuMZ[_0x147f29(0x1cc)][_0x147f29(0x1a1)][_0x147f29(0x275)](this,_0x533e9b);return $gameTemp[_0x147f29(0x58a)](),_0x290bde;},VisuMZ['EventsMoveCore']['Game_Troop_meetsConditions']=Game_Troop[_0x237a7a(0x2ed)][_0x237a7a(0x4dd)],Game_Troop[_0x237a7a(0x2ed)][_0x237a7a(0x4dd)]=function(_0x17d74c){const _0xfb78b2=_0x237a7a;$gameTemp[_0xfb78b2(0x220)](this);const _0x41618d=VisuMZ[_0xfb78b2(0x1cc)][_0xfb78b2(0x425)][_0xfb78b2(0x275)](this,_0x17d74c);return $gameTemp['clearSelfTarget'](),_0x41618d;},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x487)]=Game_Map['prototype'][_0x237a7a(0x1b3)],Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x1b3)]=function(_0x19aebf){const _0x41aee2=_0x237a7a;this[_0x41aee2(0x2a6)](_0x19aebf),this[_0x41aee2(0x3d2)](),VisuMZ[_0x41aee2(0x1cc)]['Game_Map_setup'][_0x41aee2(0x275)](this,_0x19aebf),this[_0x41aee2(0x3d2)](),this[_0x41aee2(0x594)](),this[_0x41aee2(0x348)](),this['setupSaveEventLocations'](),this['setupSpawnedEvents'](),this[_0x41aee2(0x2a1)](),this['setupFollowerVisibilityOverrides'](),this[_0x41aee2(0x3d2)]();},VisuMZ['EventsMoveCore'][_0x237a7a(0x134)]=Game_Map[_0x237a7a(0x2ed)]['setupEvents'],Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x245)]=function(){const _0x9756af=_0x237a7a;VisuMZ[_0x9756af(0x1cc)][_0x9756af(0x134)]['call'](this),this[_0x9756af(0x3d1)]();},Game_Map[_0x237a7a(0x474)]=0xc8,Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x4f0)]=function(){const _0x411483=_0x237a7a,_0x37cd80=Game_Map[_0x411483(0x474)];this[_0x411483(0x56d)]=this[_0x411483(0x10e)]()[_0x411483(0x33c)]>_0x37cd80;if(this['_eventOverload']&&$gameTemp[_0x411483(0x201)]()){}},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x36d)]=function(){const _0x354b1c=_0x237a7a;return this[_0x354b1c(0x56d)];},Game_Map['prototype'][_0x237a7a(0x3d2)]=function(){const _0x46cb49=_0x237a7a;this[_0x46cb49(0x20f)]=undefined;},Game_Map[_0x237a7a(0x2ed)]['setupDiagonalSupport']=function(){const _0x586a88=_0x237a7a;this['_diagonalSupport']=VisuMZ['EventsMoveCore'][_0x586a88(0x3e2)][_0x586a88(0x11d)][_0x586a88(0x619)];const _0x42d558=$dataMap[_0x586a88(0x4a2)]||'';if(_0x42d558[_0x586a88(0x240)](/<DIAGONAL MOVEMENT: ON>/i)){if(_0x586a88(0x40a)===_0x586a88(0x33a)){if(this[_0x586a88(0x404)]===_0x15899b)this['initFollowerController']();this[_0x586a88(0x404)]=_0x37ccf2;;}else this[_0x586a88(0x21e)]=!![];}else{if(_0x42d558[_0x586a88(0x240)](/<DIAGONAL MOVEMENT: OFF>/i)){if(_0x586a88(0x588)===_0x586a88(0x588))this[_0x586a88(0x21e)]=![];else return this[_0x586a88(0x458)](_0x301ac3(_0x321a2b['$1']),_0x3f6688(_0x78696['$2']));}}},Game_Map[_0x237a7a(0x2ed)]['isSupportDiagonalMovement']=function(){const _0x4748b5=_0x237a7a,_0x5ab53c=$gameSystem[_0x4748b5(0x47c)]();if(_0x5ab53c===_0x4748b5(0x3fc))return!![];if(_0x5ab53c===_0x4748b5(0x2b1))return![];if(this['_diagonalSupport']===undefined)this[_0x4748b5(0x594)]();return this[_0x4748b5(0x21e)];},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x3b9)]=function(_0x1dc3b4,_0x1baa29){const _0x60bbd5=_0x237a7a;if([0x1,0x4,0x7][_0x60bbd5(0x572)](_0x1baa29))_0x1dc3b4-=0x1;if([0x3,0x6,0x9][_0x60bbd5(0x572)](_0x1baa29))_0x1dc3b4+=0x1;return this[_0x60bbd5(0x30b)](_0x1dc3b4);},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x545)]=function(_0x2ddffe,_0x40069d){const _0x2a2b31=_0x237a7a;if([0x1,0x2,0x3][_0x2a2b31(0x572)](_0x40069d))_0x2ddffe+=0x1;if([0x7,0x8,0x9][_0x2a2b31(0x572)](_0x40069d))_0x2ddffe-=0x1;return this[_0x2a2b31(0x27b)](_0x2ddffe);},Game_Map['prototype'][_0x237a7a(0x382)]=function(_0x59ec9f,_0x4b5965,_0x166d29,_0x5bac97){const _0x417ddb=_0x237a7a;return Math[_0x417ddb(0xf1)](Math['abs'](this[_0x417ddb(0x54a)](_0x59ec9f,_0x166d29)),Math[_0x417ddb(0x3e5)](this[_0x417ddb(0x23d)](_0x4b5965,_0x5bac97)));},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x348)]=function(){const _0x1b3e54=_0x237a7a,_0xbe884c=VisuMZ[_0x1b3e54(0x1cc)][_0x1b3e54(0x3e2)][_0x1b3e54(0x2d4)],_0x5188d0={},_0x1ccae5=['Allow',_0x1b3e54(0x266),_0x1b3e54(0x512)],_0x2cfc81=[_0x1b3e54(0x52d),_0x1b3e54(0x39f),_0x1b3e54(0x5c9),'Event',_0x1b3e54(0x4eb),'Boat',_0x1b3e54(0x3aa),_0x1b3e54(0x22c)];for(const _0x3094aa of _0x1ccae5){for(const _0x397099 of _0x2cfc81){if('vjyiI'===_0x1b3e54(0x434)){const _0x269685=_0x1b3e54(0x3fa)[_0x1b3e54(0x307)](_0x397099,_0x3094aa);_0xbe884c[_0x269685]&&(_0x5188d0[_0x269685]=_0xbe884c[_0x269685][_0x1b3e54(0x312)](0x0));}else _0x5763b6[_0x1b3e54(0x1cc)]['Sprite_Balloon_setup'][_0x1b3e54(0x275)](this,_0x31b195,_0x1de027),_0x57fce2['EventsMoveCore'][_0x1b3e54(0x3e2)][_0x1b3e54(0x5d8)][_0x1b3e54(0x269)]&&this[_0x1b3e54(0x429)][_0x1b3e54(0x5d5)][_0x1b3e54(0x3bc)](_0x1c9727,this['_duration']);}}const _0x51aafe=$dataMap[_0x1b3e54(0x4a2)]||'',_0x3cf968=_0x51aafe[_0x1b3e54(0x240)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x3cf968){if('ZxsXF'===_0x1b3e54(0x63e)){if(_0x2efe90)this[_0x1b3e54(0x529)](_0x408f4b['x'],_0x29c4a1['y']);}else for(const _0x207ed4 of _0x3cf968){_0x207ed4[_0x1b3e54(0x240)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x508449=String(RegExp['$1'])[_0x1b3e54(0x21a)]()[_0x1b3e54(0x19c)](),_0x2c3ce0=String(RegExp['$2'])[_0x1b3e54(0x21a)]()[_0x1b3e54(0x19c)]();const _0x29e6b6=JSON['parse']('['+RegExp['$3'][_0x1b3e54(0x240)](/\d+/g)+']');_0x508449=_0x508449[_0x1b3e54(0x510)](0x0)['toUpperCase']()+_0x508449[_0x1b3e54(0x312)](0x1),_0x2c3ce0=_0x2c3ce0[_0x1b3e54(0x510)](0x0)[_0x1b3e54(0x376)]()+_0x2c3ce0[_0x1b3e54(0x312)](0x1);const _0x4e77d5=_0x1b3e54(0x3fa)[_0x1b3e54(0x307)](_0x508449,_0x2c3ce0);if(_0x5188d0[_0x4e77d5])_0x5188d0[_0x4e77d5]=_0x5188d0[_0x4e77d5][_0x1b3e54(0x166)](_0x29e6b6);}}this['_regionRules']=_0x5188d0;},Game_Map['prototype'][_0x237a7a(0x230)]=function(_0x1cc6ea,_0x34b482,_0x3de916,_0x203b61){const _0x4b3fcf=_0x237a7a,_0x4bbc7a=this[_0x4b3fcf(0x3b9)](_0x1cc6ea,_0x3de916),_0x27232b=this[_0x4b3fcf(0x545)](_0x34b482,_0x3de916),_0x1eb39d=this['regionId'](_0x4bbc7a,_0x27232b),_0x2a4a6d=this['_regionRules'];if(_0x2a4a6d[_0x4b3fcf(0x478)][_0x4b3fcf(0x572)](_0x1eb39d))return!![];else{if(_0x203b61===_0x4b3fcf(0x42d))return _0x2a4a6d[_0x4b3fcf(0x204)][_0x4b3fcf(0x572)](_0x1eb39d)||_0x2a4a6d['WalkAllow'][_0x4b3fcf(0x572)](_0x1eb39d);else{if(_0x203b61===_0x4b3fcf(0x5d6))return _0x2a4a6d[_0x4b3fcf(0x5d4)]['includes'](_0x1eb39d)||_0x2a4a6d[_0x4b3fcf(0x136)][_0x4b3fcf(0x572)](_0x1eb39d);else{if(_0x2a4a6d[_0x4b3fcf(0x1c3)]['includes'](_0x1eb39d))return!![];else{if(_0x4b3fcf(0x549)!==_0x4b3fcf(0x153)){const _0x332f9a='%1Allow'[_0x4b3fcf(0x307)](_0x203b61['charAt'](0x0)[_0x4b3fcf(0x376)]()+_0x203b61[_0x4b3fcf(0x312)](0x1));if(_0x2a4a6d[_0x332f9a])return _0x2a4a6d[_0x332f9a]['includes'](_0x1eb39d);}else{const _0x1bfddd=this[_0x4b3fcf(0x1cf)]['mapId'],_0x35a023=this[_0x4b3fcf(0x1cf)][_0x4b3fcf(0x21f)];return _0x5f45b0[_0x4b3fcf(0x484)](_0x1bfddd,_0x35a023);}}}}}return![];},Game_Map['prototype'][_0x237a7a(0x1f8)]=function(_0x2671c4,_0x18e8b8,_0x29a253,_0x5b9246){const _0x2961f9=_0x237a7a,_0x1aefdd=this['roundXWithDirection'](_0x2671c4,_0x29a253),_0x3bfae2=this[_0x2961f9(0x545)](_0x18e8b8,_0x29a253),_0x589b30=this['regionId'](_0x1aefdd,_0x3bfae2),_0x540c79=this[_0x2961f9(0x32b)];if(_0x540c79[_0x2961f9(0x37a)][_0x2961f9(0x572)](_0x589b30)){if(_0x2961f9(0x165)===_0x2961f9(0x165))return!![];else{if(this[_0x2961f9(0x274)]===_0x335bb8)this[_0x2961f9(0x402)]();if(!_0x1c4afc)return null;_0x25735c===_0x2b9bbc?delete this[_0x2961f9(0x274)][_0x2961f9(0x5c9)]:this[_0x2961f9(0x519)](_0x18c419['_mapId'],_0x2c27ca[_0x2961f9(0x5b7)]);}}else{if(_0x5b9246==='player')return _0x540c79[_0x2961f9(0x447)][_0x2961f9(0x572)](_0x589b30)||_0x540c79[_0x2961f9(0x59b)][_0x2961f9(0x572)](_0x589b30);else{if(_0x5b9246===_0x2961f9(0x5d6))return _0x540c79[_0x2961f9(0x45b)][_0x2961f9(0x572)](_0x589b30)||_0x540c79[_0x2961f9(0x59b)][_0x2961f9(0x572)](_0x589b30);else{if(_0x540c79['VehicleForbid']['includes'](_0x589b30))return!![];else{if(_0x2961f9(0x369)===_0x2961f9(0x508))_0x17831[_0x2961f9(0x1cc)]['Game_Variables_setValue']['call'](this,_0x1ea2f2,_0x4765bd);else{const _0x38ef60='%1Forbid'[_0x2961f9(0x307)](_0x5b9246['charAt'](0x0)[_0x2961f9(0x376)]()+_0x5b9246[_0x2961f9(0x312)](0x1));if(_0x540c79[_0x38ef60])return _0x540c79[_0x38ef60][_0x2961f9(0x572)](_0x589b30);}}}}}return![];},Game_Map['prototype']['isRegionDockable']=function(_0x515d8a,_0x224623,_0x26afd7,_0x1e0efb){const _0x12c000=_0x237a7a;_0x26afd7=_0x1e0efb==='airship'?0x5:_0x26afd7;const _0x5f0ab0=this[_0x12c000(0x3b9)](_0x515d8a,_0x26afd7),_0x2d3a08=this['roundYWithDirection'](_0x224623,_0x26afd7),_0xddaad1=this[_0x12c000(0x45a)](_0x5f0ab0,_0x2d3a08),_0x547cfe=this[_0x12c000(0x32b)];if(_0x547cfe['VehicleDock']['includes'](_0xddaad1)){if(_0x12c000(0x34b)==='tiMYg'){if(this[_0x12c000(0x208)])return;if(this[_0x12c000(0x3cd)]())return;_0x1f25eb['EventsMoveCore'][_0x12c000(0x1e9)][_0x12c000(0x275)](this);}else return!![];}else{if(_0x12c000(0x249)!==_0x12c000(0x26f)){const _0x7e834c=_0x12c000(0x37d)[_0x12c000(0x307)](_0x1e0efb[_0x12c000(0x510)](0x0)[_0x12c000(0x376)]()+_0x1e0efb[_0x12c000(0x312)](0x1));if(_0x547cfe[_0x7e834c])return _0x547cfe[_0x7e834c]['includes'](_0xddaad1);}else{if(_0x2afea0[_0x12c000(0x146)](_0x4072d0))this['setSelfValue'](_0x2a7459,_0x2638b5);else _0x581a13[_0x12c000(0x4f5)](_0x427848)?this[_0x12c000(0x42a)](_0x59e2db,_0x582100):_0xabc923[_0x12c000(0x1cc)][_0x12c000(0x28d)][_0x12c000(0x275)](this,_0x530033,_0x151f84);}}return![];},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x298)]=Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x432)],Game_Map['prototype'][_0x237a7a(0x432)]=function(){const _0x18e80d=_0x237a7a;VisuMZ[_0x18e80d(0x1cc)][_0x18e80d(0x298)][_0x18e80d(0x275)](this),this[_0x18e80d(0x4ad)]();},Game_Map['prototype'][_0x237a7a(0x4ad)]=function(){const _0x5795a5=_0x237a7a;this[_0x5795a5(0x5f1)]=![];if(this[_0x5795a5(0x10e)]()[_0x5795a5(0x13c)](_0x181a22=>_0x181a22['hasAdvancedSwitchVariable']())){this['_needsPeriodicRefresh']=!![];return;}if(this['events']()['some'](_0x3884a9=>_0x3884a9[_0x5795a5(0x235)]())){this[_0x5795a5(0x5f1)]=!![];return;}if(this[_0x5795a5(0x46b)][_0x5795a5(0x13c)](_0x490543=>_0x490543[_0x5795a5(0x360)]())){this[_0x5795a5(0x5f1)]=!![];return;}if(this['_commonEvents']['some'](_0xcaf2ff=>_0xcaf2ff[_0x5795a5(0x235)]())){if('sbvSF'!=='sbvSF')_0x28b6cb['EventsMoveCore'][_0x5795a5(0x541)][_0x5795a5(0x275)](this),this[_0x5795a5(0x402)]();else{this[_0x5795a5(0x5f1)]=!![];return;}}},VisuMZ[_0x237a7a(0x1cc)]['Game_Map_update']=Game_Map[_0x237a7a(0x2ed)]['update'],Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x378)]=function(_0x3b7aef){const _0x4458b0=_0x237a7a;this[_0x4458b0(0x3f4)](),VisuMZ[_0x4458b0(0x1cc)][_0x4458b0(0x18b)][_0x4458b0(0x275)](this,_0x3b7aef);},Game_Map['prototype'][_0x237a7a(0x3f4)]=function(){const _0x4723b9=_0x237a7a;if(!this[_0x4723b9(0x5f1)])return;this[_0x4723b9(0x2dc)]=this[_0x4723b9(0x2dc)]||0x3c,this[_0x4723b9(0x2dc)]--,this[_0x4723b9(0x2dc)]<=0x0&&(this[_0x4723b9(0x427)](),this[_0x4723b9(0x2dc)]=0x3c);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x35f)]=Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x2ef)],Game_Map['prototype'][_0x237a7a(0x2ef)]=function(){const _0x4630e7=_0x237a7a;if(!$gameSystem[_0x4630e7(0x198)]())return!![];return VisuMZ[_0x4630e7(0x1cc)][_0x4630e7(0x35f)][_0x4630e7(0x275)](this);},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x365)]=function(){const _0xf2807a=_0x237a7a;this[_0xf2807a(0x44d)]=![];const _0x1e1096=$dataMap[_0xf2807a(0x4a2)]||'';_0x1e1096[_0xf2807a(0x240)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x506)]=function(){const _0x4182b8=_0x237a7a;if(this['_saveEventLocations']===undefined)this[_0x4182b8(0x365)]();return this[_0x4182b8(0x44d)];},Game_Map[_0x237a7a(0x2ed)]['removeTemporaryMapSpawnedEvents']=function(_0x561681){const _0x17c08b=_0x237a7a;_0x561681!==this['mapId']()&&$gamePlayer&&('sgXlD'!==_0x17c08b(0x320)?$gameSystem[_0x17c08b(0x2a6)](this[_0x17c08b(0x438)]()):this[_0x17c08b(0x429)][_0x17c08b(0x5d5)][_0x17c08b(0x3bc)](_0x9bacb2,this[_0x17c08b(0x4d2)]));},Game_Map['prototype'][_0x237a7a(0x2f6)]=function(){const _0x166648=_0x237a7a;this[_0x166648(0x14d)]=$gameSystem['getMapSpawnedEventData'](this[_0x166648(0x438)]()),this['_needsRefresh']=!![];},VisuMZ['EventsMoveCore'][_0x237a7a(0x174)]=Game_Map[_0x237a7a(0x2ed)]['events'],Game_Map['prototype'][_0x237a7a(0x10e)]=function(){const _0x4e0e08=_0x237a7a;if(this[_0x4e0e08(0x20f)])return this[_0x4e0e08(0x20f)];const _0x304c18=VisuMZ[_0x4e0e08(0x1cc)][_0x4e0e08(0x174)][_0x4e0e08(0x275)](this),_0x55b800=_0x304c18[_0x4e0e08(0x166)](this['_spawnedEvents']||[]);return this[_0x4e0e08(0x20f)]=_0x55b800[_0x4e0e08(0x56c)](_0x1b83b1=>!!_0x1b83b1),this[_0x4e0e08(0x20f)];},VisuMZ['EventsMoveCore'][_0x237a7a(0x340)]=Game_Map['prototype'][_0x237a7a(0x5d6)],Game_Map['prototype']['event']=function(_0x4e5e06){const _0x39bd92=_0x237a7a;if(_0x4e5e06>=0x3e8){if(_0x39bd92(0x1f1)!==_0x39bd92(0x1a5))return _0x4e5e06-=0x3e8,this[_0x39bd92(0x14d)][_0x4e5e06];else{const _0x64f934=_0x4fbc63?_0x5e2b13['mapId']():0x0,_0x55dc98=[0x0,0x0,_0x39bd92(0x5cd)[_0x39bd92(0x307)](_0x64f934,_0x7b3530)];return _0x2df912['value'](_0x55dc98);}}else return VisuMZ[_0x39bd92(0x1cc)][_0x39bd92(0x340)][_0x39bd92(0x275)](this,_0x4e5e06);},Game_Map['prototype'][_0x237a7a(0x20a)]=function(_0xa9cda9){const _0x1b8a2e=_0x237a7a,_0x44d9b2=this[_0x1b8a2e(0x5d6)](_0xa9cda9);if(_0x44d9b2)_0x44d9b2[_0x1b8a2e(0x322)]();},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x42b)]=function(){const _0xa16b9b=_0x237a7a,_0xab225b={'template':'Button','mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0xa16b9b(0x14d)][_0xa16b9b(0x33c)]+0x3e8};this[_0xa16b9b(0x1fe)](_0xab225b);},Game_Map['prototype'][_0x237a7a(0x2f3)]=function(_0x2e8e90,_0x59e270){const _0x9c48e7=_0x237a7a;if(this[_0x9c48e7(0x344)](_0x2e8e90,_0x59e270)[_0x9c48e7(0x33c)]>0x0)return!![];if($gamePlayer['x']===_0x2e8e90&&$gamePlayer['y']===_0x59e270)return!![];if(this[_0x9c48e7(0x5b5)]()[_0x9c48e7(0x22d)](_0x2e8e90,_0x59e270))return!![];if(this[_0x9c48e7(0x633)]()[_0x9c48e7(0x22d)](_0x2e8e90,_0x59e270))return!![];return![];},Game_Map[_0x237a7a(0x2ed)]['isSpawnHitboxCollisionOk']=function(_0x208284,_0x5f3cfd,_0x3bf685){const _0x548602=_0x237a7a;$gameTemp['_spawnData']=_0x208284;const _0x2910a3=new Game_Event(_0x208284[_0x548602(0x438)],_0x208284[_0x548602(0x21f)]);$gameTemp[_0x548602(0x4a7)]=undefined,_0x2910a3[_0x548602(0x432)]();let _0x33fa4f=_0x5f3cfd-_0x2910a3['_addedHitbox'][_0x548602(0x4a9)],_0x99ba32=_0x5f3cfd+_0x2910a3[_0x548602(0x39c)][_0x548602(0x3d7)],_0x49a889=_0x3bf685-_0x2910a3['_addedHitbox']['up'],_0x21f9d4=_0x3bf685+_0x2910a3[_0x548602(0x39c)][_0x548602(0x16b)];for(let _0x538efd=_0x33fa4f;_0x538efd<=_0x99ba32;_0x538efd++){for(let _0x739f25=_0x49a889;_0x739f25<=_0x21f9d4;_0x739f25++){if(this[_0x548602(0x2f3)](_0x538efd,_0x739f25))return![];}}return!![];},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x1fe)]=function(_0x2ba4d4){const _0x2dccbb=_0x237a7a;$gameTemp[_0x2dccbb(0x4a7)]=_0x2ba4d4;const _0x195d1e=new Game_Event(_0x2ba4d4['mapId'],_0x2ba4d4['eventId']);$gameTemp['_spawnData']=undefined,this['_spawnedEvents'][_0x2dccbb(0x5a6)](_0x195d1e),_0x195d1e[_0x2dccbb(0x3d3)](_0x2ba4d4),this[_0x2dccbb(0x3d2)]();},Game_Map['prototype'][_0x237a7a(0x4e3)]=function(_0x5074a9,_0x5664e1,_0xbb68a7){const _0x2dbf9a=_0x237a7a,_0x323100=_0x5074a9[_0x2dbf9a(0x5d2)][_0x2dbf9a(0x376)]()[_0x2dbf9a(0x19c)]();if(_0x323100!==_0x2dbf9a(0x337)){const _0x4c9ed6=VisuMZ['EventTemplates'][_0x323100];if(_0x4c9ed6){if(_0x2dbf9a(0x3a9)!==_0x2dbf9a(0x133))_0x5074a9[_0x2dbf9a(0x438)]=_0x4c9ed6['MapID'],_0x5074a9[_0x2dbf9a(0x21f)]=_0x4c9ed6[_0x2dbf9a(0x28b)];else return!![];}}const _0x74ed47=_0x5074a9['x'],_0x580fe6=_0x5074a9['y'];if(!this[_0x2dbf9a(0x160)](_0x74ed47,_0x580fe6))return![];if(_0x5664e1){if(_0x2dbf9a(0x17f)!==_0x2dbf9a(0x499)){if(this[_0x2dbf9a(0x2f3)](_0x74ed47,_0x580fe6))return![];if(!this[_0x2dbf9a(0x184)](_0x5074a9,_0x74ed47,_0x580fe6))return![];}else{_0x27c433[_0x2dbf9a(0x124)](_0x1b6e6b,_0x58df8e);const _0x3f8636=_0x35137f[_0x2dbf9a(0x5f2)]||0x0;_0x36b246[_0x2dbf9a(0x5d9)](_0x3f8636);}}if(_0xbb68a7){if(!this['isPassableByAnyDirection'](_0x74ed47,_0x580fe6))return![];}return this['createSpawnedEventWithData'](_0x5074a9),!![];},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x2c1)]=function(_0x33bda9,_0x52c7e5,_0x4aca6d,_0x46733b){const _0x455513=_0x237a7a,_0x462b05=_0x33bda9[_0x455513(0x5d2)]['toUpperCase']()[_0x455513(0x19c)]();if(_0x462b05!==_0x455513(0x337)){if(_0x455513(0x636)!=='KPZZZ'){if(_0x39a71e&&_0xb7142c[_0x455513(0x488)]())return _0xe77613[_0x455513(0x515)](),!![];}else{const _0x12fae3=VisuMZ[_0x455513(0x5e6)][_0x462b05];if(_0x12fae3){if(_0x455513(0x489)===_0x455513(0x4fa)){const _0x4795be='%1,'[_0x455513(0x307)](_0x3cfae7['_mapId']),_0x3e29a4=_0x1cf01f['keys'](this[_0x455513(0x58b)])[_0x455513(0x56c)](_0x5644bd=>_0x5644bd[_0x455513(0x49f)](_0x4795be));while(_0x3e29a4[_0x455513(0x33c)]>0x0){const _0x1552dd=_0x3e29a4['shift']();delete this['_data'][_0x1552dd];}_0x303355===_0x88a609[_0x455513(0x438)]()&&_0x3b536a[_0x455513(0x427)]();}else _0x33bda9[_0x455513(0x438)]=_0x12fae3[_0x455513(0x209)],_0x33bda9[_0x455513(0x21f)]=_0x12fae3[_0x455513(0x28b)];}}}const _0x582e6f=[],_0x18774d=this[_0x455513(0x2d6)](),_0x13774c=this['height']();for(let _0x15817d=0x0;_0x15817d<_0x18774d;_0x15817d++){if(_0x455513(0x119)==='HHZlx'){let _0x54cf31=_0x455513(0xf5)[_0x455513(0x307)](_0x50ff63[_0x455513(0x438)]);_0x54cf31+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x54cf31+=_0x455513(0x292),_0x54cf31+=_0x455513(0x1ae),_0x54cf31+=_0x455513(0x37b)[_0x455513(0x307)](_0x19e83b['mapId']),_0x13d223(_0x54cf31);return;}else for(let _0xfa8f4a=0x0;_0xfa8f4a<_0x13774c;_0xfa8f4a++){if(!_0x52c7e5[_0x455513(0x572)](this[_0x455513(0x45a)](_0x15817d,_0xfa8f4a)))continue;if(!this['isValid'](_0x15817d,_0xfa8f4a))continue;if(_0x4aca6d){if(_0x455513(0xfc)!==_0x455513(0x301)){if(this[_0x455513(0x2f3)](_0x15817d,_0xfa8f4a))continue;if(!this[_0x455513(0x184)](_0x33bda9,_0x15817d,_0xfa8f4a))continue;}else return _0x44fb21[_0x455513(0x1cc)][_0x455513(0x33b)][_0x455513(0x275)](this,_0x228f54,_0x482043,_0xb1aa4b);}if(_0x46733b){if(!this[_0x455513(0x110)](_0x15817d,_0xfa8f4a))continue;}_0x582e6f['push']([_0x15817d,_0xfa8f4a]);}}if(_0x582e6f[_0x455513(0x33c)]>0x0){const _0x10ff60=_0x582e6f[Math[_0x455513(0x140)](_0x582e6f['length'])];return _0x33bda9['x']=_0x10ff60[0x0],_0x33bda9['y']=_0x10ff60[0x1],this[_0x455513(0x1fe)](_0x33bda9),!![];}return![];},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x1a9)]=function(_0x4cd561,_0x39aa3c,_0x433a6f,_0xe1f23a){const _0x165bab=_0x237a7a,_0x2d00e1=_0x4cd561[_0x165bab(0x5d2)][_0x165bab(0x376)]()[_0x165bab(0x19c)]();if(_0x2d00e1!=='UNTITLED'){if(_0x165bab(0x359)===_0x165bab(0x359)){const _0x13ae34=VisuMZ['EventTemplates'][_0x2d00e1];if(_0x13ae34){if(_0x165bab(0x628)===_0x165bab(0x628))_0x4cd561[_0x165bab(0x438)]=_0x13ae34['MapID'],_0x4cd561[_0x165bab(0x21f)]=_0x13ae34[_0x165bab(0x28b)];else{const _0x56f6ab=this[_0x165bab(0x5d6)]();return _0x30858d[_0x165bab(0x1cc)][_0x165bab(0x59c)][_0x165bab(0x47a)](this['event']()[_0x165bab(0x52b)],this[_0x165bab(0x182)],_0x56f6ab);}}}else return _0x544b47[_0x165bab(0x1cc)][_0x165bab(0x3e2)][_0x165bab(0x4a6)]['OpacitySpeed'];}const _0x515441=[],_0x227040=this[_0x165bab(0x2d6)](),_0x41db08=this[_0x165bab(0x2d0)]();for(let _0x2baddd=0x0;_0x2baddd<_0x227040;_0x2baddd++){if(_0x165bab(0x265)!==_0x165bab(0x3f7))for(let _0x1d1dd0=0x0;_0x1d1dd0<_0x41db08;_0x1d1dd0++){if(_0x165bab(0x514)!==_0x165bab(0x3cc)){if(!_0x39aa3c['includes'](this['terrainTag'](_0x2baddd,_0x1d1dd0)))continue;if(!this[_0x165bab(0x160)](_0x2baddd,_0x1d1dd0))continue;if(_0x433a6f){if(this['checkExistingEntitiesAt'](_0x2baddd,_0x1d1dd0))continue;if(!this[_0x165bab(0x184)](_0x4cd561,_0x2baddd,_0x1d1dd0))continue;}if(_0xe1f23a){if(!this[_0x165bab(0x110)](_0x2baddd,_0x1d1dd0))continue;}_0x515441[_0x165bab(0x5a6)]([_0x2baddd,_0x1d1dd0]);}else return _0x1625bd[_0x165bab(0x1cc)][_0x165bab(0x5b6)][_0x165bab(0x275)](this);}else{if(this[_0x165bab(0x5d5)][_0x165bab(0x1e4)]()!=='')return![];}}if(_0x515441[_0x165bab(0x33c)]>0x0){const _0x4c1958=_0x515441[Math[_0x165bab(0x140)](_0x515441['length'])];return _0x4cd561['x']=_0x4c1958[0x0],_0x4cd561['y']=_0x4c1958[0x1],this[_0x165bab(0x1fe)](_0x4cd561),!![];}return![];},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x110)]=function(_0x5537f0,_0x275df5){const _0xaccfc7=_0x237a7a;if(this[_0xaccfc7(0x25a)](_0x5537f0,_0x275df5,0x2))return!![];if(this[_0xaccfc7(0x25a)](_0x5537f0,_0x275df5,0x4))return!![];if(this[_0xaccfc7(0x25a)](_0x5537f0,_0x275df5,0x6))return!![];if(this['isPassable'](_0x5537f0,_0x275df5,0x8))return!![];return![];},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x569)]=function(_0x11a945){const _0x614872=_0x237a7a;if(_0x11a945<0x3e8)return;if(!this['_spawnedEvents'])return;const _0x1d104f=this[_0x614872(0x5d6)](_0x11a945);_0x1d104f['locate'](-0x1,-0x1),_0x1d104f['erase'](),this['_spawnedEvents'][_0x11a945-0x3e8]=null,this['clearEventCache']();},Game_Map[_0x237a7a(0x2ed)]['firstSpawnedEvent']=function(){for(const _0x543c29 of this['_spawnedEvents']){if(_0x543c29)return _0x543c29;}return null;},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x4ab)]=function(){const _0x1b888c=_0x237a7a,_0xb10a94=this[_0x1b888c(0x50c)]();return _0xb10a94?_0xb10a94[_0x1b888c(0x5b7)]:0x0;},Game_Map[_0x237a7a(0x2ed)]['lastSpawnedEvent']=function(){const _0x5654e8=_0x237a7a,_0x8aeb5b=this[_0x5654e8(0x14d)][_0x5654e8(0x312)](0x0)['reverse']();for(const _0x352e6b of _0x8aeb5b){if(_0x5654e8(0x155)===_0x5654e8(0x155)){if(_0x352e6b)return _0x352e6b;}else this[_0x5654e8(0x2a1)]();}return null;},Game_Map[_0x237a7a(0x2ed)]['lastSpawnedEventID']=function(){const _0x1dfac5=_0x237a7a,_0x51bc4e=this[_0x1dfac5(0x418)]();return _0x51bc4e?_0x51bc4e[_0x1dfac5(0x5b7)]:0x0;},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x15c)]=function(_0xc404b4,_0x951f06){const _0x277b9a=_0x237a7a,_0x5a763d=this[_0x277b9a(0x344)](_0xc404b4,_0x951f06);for(const _0x3ac5ee of _0x5a763d){if(_0x277b9a(0x16a)===_0x277b9a(0x16a)){if(!_0x3ac5ee)continue;if(_0x3ac5ee[_0x277b9a(0x2af)]())this['despawnEventId'](_0x3ac5ee[_0x277b9a(0x5b7)]);}else this['contentsOpacity']=0x0;}},Game_Map['prototype'][_0x237a7a(0x2dd)]=function(_0x38a104){const _0x37b587=_0x237a7a;for(const _0x2127e9 of this[_0x37b587(0x14d)]){if(_0x37b587(0x200)===_0x37b587(0x200)){if(!_0x2127e9)continue;_0x38a104[_0x37b587(0x572)](_0x2127e9[_0x37b587(0x45a)]())&&this[_0x37b587(0x569)](_0x2127e9['_eventId']);}else{const _0x420100=[_0x4df74b[_0x37b587(0x4e7)],_0x1908f8[_0x37b587(0x5b7)],'Self\x20Switch\x20%1'['format'](_0x2fd4b9)];return _0x57c041[_0x37b587(0x228)](_0x420100);}}},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x1c6)]=function(_0x8eac8){const _0x310636=_0x237a7a;for(const _0x5c1fa1 of this['_spawnedEvents']){if(_0x310636(0x3b4)===_0x310636(0x3b4)){if(!_0x5c1fa1)continue;_0x8eac8['includes'](_0x5c1fa1[_0x310636(0x371)]())&&this[_0x310636(0x569)](_0x5c1fa1[_0x310636(0x5b7)]);}else _0x4818da[_0x310636(0x2a6)](this[_0x310636(0x438)]());}},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x57d)]=function(){const _0x3801c7=_0x237a7a;for(const _0x157859 of this[_0x3801c7(0x14d)]){if(!_0x157859)continue;this['despawnEventId'](_0x157859[_0x3801c7(0x5b7)]);}},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x57f)]=Game_Map['prototype'][_0x237a7a(0x391)],Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x391)]=function(_0x49e4ab){const _0x3431d4=_0x237a7a;VisuMZ[_0x3431d4(0x1cc)][_0x3431d4(0x57f)][_0x3431d4(0x275)](this,_0x49e4ab);if(_0x49e4ab>=0x3e8){const _0x17a6bd=this['event'](_0x49e4ab);if(_0x17a6bd)_0x17a6bd[_0x3431d4(0x1e8)]();}},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x2a1)]=function(){const _0x5ea7e7=_0x237a7a;this[_0x5ea7e7(0x2c0)]=![],this[_0x5ea7e7(0x2f7)]=![];if(!$dataMap)return;const _0x1a41cc=$dataMap[_0x5ea7e7(0x4a2)]||'';if(_0x1a41cc[_0x5ea7e7(0x240)](/<HIDE PLAYER>/i))this[_0x5ea7e7(0x2c0)]=![],this[_0x5ea7e7(0x2f7)]=!![];else _0x1a41cc[_0x5ea7e7(0x240)](/<SHOW PLAYER>/i)&&(this[_0x5ea7e7(0x2c0)]=!![],this[_0x5ea7e7(0x2f7)]=![]);},Game_Map['prototype'][_0x237a7a(0x331)]=function(){const _0x2711bf=_0x237a7a;return this[_0x2711bf(0x2c0)]===undefined&&this[_0x2711bf(0x2a1)](),this[_0x2711bf(0x2c0)];},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x196)]=function(){const _0x34d713=_0x237a7a;return this['_forceHidePlayer']===undefined&&this[_0x34d713(0x2a1)](),this[_0x34d713(0x2f7)];},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x2e5)]=Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x5dd)],Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x5dd)]=function(){const _0x90aa84=_0x237a7a;if(this===$gamePlayer){if($gameMap[_0x90aa84(0x331)]())return![];if($gameMap[_0x90aa84(0x196)]())return!![];}return VisuMZ[_0x90aa84(0x1cc)][_0x90aa84(0x2e5)][_0x90aa84(0x275)](this);},Game_Map['prototype'][_0x237a7a(0x373)]=function(){const _0x53ac54=_0x237a7a;this[_0x53ac54(0x319)]=![],this[_0x53ac54(0x2b9)]=![];if(!$dataMap)return;const _0x98d7fa=$dataMap[_0x53ac54(0x4a2)]||'';if(_0x98d7fa[_0x53ac54(0x240)](/<HIDE FOLLOWERS>/i))this[_0x53ac54(0x319)]=![],this[_0x53ac54(0x2b9)]=!![];else _0x98d7fa[_0x53ac54(0x240)](/<SHOW FOLLOWERS>/i)&&(this['_forceShowFollower']=!![],this['_forceHideFollower']=![]);},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x449)]=function(){const _0x6ef313=_0x237a7a;return this[_0x6ef313(0x319)]===undefined&&this[_0x6ef313(0x373)](),this['_forceShowFollower'];},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x40f)]=function(){const _0x2434b6=_0x237a7a;return this[_0x2434b6(0x2b9)]===undefined&&(_0x2434b6(0x414)!==_0x2434b6(0x49b)?this[_0x2434b6(0x373)]():_0x4a7b7a=!![]),this[_0x2434b6(0x2b9)];},VisuMZ['EventsMoveCore'][_0x237a7a(0x347)]=Game_Followers[_0x237a7a(0x2ed)][_0x237a7a(0x1eb)],Game_Followers['prototype']['isVisible']=function(){const _0x31145b=_0x237a7a;if($gameMap[_0x31145b(0x449)]())return!![];if($gameMap[_0x31145b(0x40f)]())return![];return VisuMZ[_0x31145b(0x1cc)][_0x31145b(0x347)][_0x31145b(0x275)](this);},Game_CommonEvent[_0x237a7a(0x2ed)]['hasAdvancedSwitchVariable']=function(){const _0x43087a=_0x237a7a,_0x13826b=this[_0x43087a(0x5d6)]();return this[_0x43087a(0x45c)]()&&_0x13826b[_0x43087a(0x370)]>=0x1&&DataManager[_0x43087a(0x3e4)](_0x13826b[_0x43087a(0x390)]);},Game_CommonEvent[_0x237a7a(0x2ed)][_0x237a7a(0x235)]=function(){const _0x4ff6b0=_0x237a7a;return VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x4ff6b0(0x46b)][_0x4ff6b0(0x572)](this[_0x4ff6b0(0x182)]);},VisuMZ[_0x237a7a(0x1cc)]['Game_CommonEvent_isActive']=Game_CommonEvent[_0x237a7a(0x2ed)][_0x237a7a(0x45c)],Game_CommonEvent[_0x237a7a(0x2ed)][_0x237a7a(0x45c)]=function(){const _0x4650e6=_0x237a7a;if(VisuMZ[_0x4650e6(0x1cc)]['Game_CommonEvent_isActive'][_0x4650e6(0x275)](this)){if('qLPVZ'!=='zytxo')return!![];else this['_attachPictureSprite'][_0x4650e6(0x381)]=new _0x18196b(0x1,0x1);}else{const _0x119b0b=this[_0x4650e6(0x5d6)]();return VisuMZ[_0x4650e6(0x1cc)][_0x4650e6(0x59c)][_0x4650e6(0x47a)](this[_0x4650e6(0x5d6)]()[_0x4650e6(0x52b)],this['_commonEventId'],_0x119b0b);}},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x38e)]=Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x38f)],Game_Map[_0x237a7a(0x2ed)]['parallelCommonEvents']=function(){const _0x107a4b=_0x237a7a,_0x43adae=VisuMZ[_0x107a4b(0x1cc)][_0x107a4b(0x38e)][_0x107a4b(0x275)](this),_0x20f90f=VisuMZ[_0x107a4b(0x1cc)][_0x107a4b(0x59c)][_0x107a4b(0x46b)]['map'](_0x459d77=>$dataCommonEvents[_0x459d77]);return _0x43adae[_0x107a4b(0x166)](_0x20f90f)[_0x107a4b(0x56c)]((_0x42c931,_0x5bb757,_0x40b93b)=>_0x40b93b['indexOf'](_0x42c931)===_0x5bb757);},Game_CharacterBase['ALLOW_LADDER_DASH']=VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x3e2)][_0x237a7a(0x11d)][_0x237a7a(0x629)]??![],VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x280)]=Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x1b8)],Game_CharacterBase[_0x237a7a(0x2ed)]['initMembers']=function(){const _0x77436c=_0x237a7a;VisuMZ[_0x77436c(0x1cc)][_0x77436c(0x280)]['call'](this),this[_0x77436c(0x1cb)]();},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x1cb)]=function(){const _0x29ff74=_0x237a7a;this['_patternLocked']=![],this[_0x29ff74(0x1a6)](),this[_0x29ff74(0x22f)](),this[_0x29ff74(0x30a)](),this[_0x29ff74(0x167)]();},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x54f)]=Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x3f0)],Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x3f0)]=function(){const _0x579909=_0x237a7a;let _0x274f82=VisuMZ[_0x579909(0x1cc)][_0x579909(0x54f)][_0x579909(0x275)](this);return _0x274f82=this[_0x579909(0x31a)](_0x274f82),_0x274f82;},Game_CharacterBase[_0x237a7a(0x2ed)]['adjustMoveSynchOpacityDelta']=function(_0x3777c8){return _0x3777c8;},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x100)]=function(){const _0x42c57e=_0x237a7a;if(this[_0x42c57e(0x630)]===Game_Player&&this[_0x42c57e(0x586)]())return this[_0x42c57e(0x5c1)]()[_0x42c57e(0x254)]()[_0x42c57e(0x240)](/\[VS8\]/i);else{if(Imported[_0x42c57e(0x55b)]&&this[_0x42c57e(0x304)]()){if(_0x42c57e(0x417)===_0x42c57e(0x183)){const _0x44c9c8=_0x50bf2f[_0x42c57e(0x4ea)](this);if(!_0x44c9c8)return;const _0x2f9d18=_0x44c9c8[_0x42c57e(0x5d2)]['toUpperCase']()['trim']();_0x2f9d18!==_0x42c57e(0x337)?this['morphIntoTemplate'](_0x2f9d18,!![]):this[_0x42c57e(0x367)](_0x44c9c8['mapId'],_0x44c9c8[_0x42c57e(0x21f)],!![]);}else return!![];}else return _0x42c57e(0x598)!==_0x42c57e(0x2fd)?this[_0x42c57e(0x254)]()['match'](/\[VS8\]/i):this['setDirection'](0x7);}},VisuMZ[_0x237a7a(0x1cc)]['Game_CharacterBase_direction']=Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x511)],Game_CharacterBase[_0x237a7a(0x2ed)]['direction']=function(){const _0x43f7db=_0x237a7a;if(!$dataMap)return this[_0x43f7db(0x2a2)]||0x2;if(this[_0x43f7db(0x43e)]()&&!this[_0x43f7db(0x162)]()&&this[_0x43f7db(0x100)]()){if(_0x43f7db(0x276)!==_0x43f7db(0x398))return this[_0x43f7db(0x4ed)]();else this['setDirection'](_0x118da7);}else{if(this[_0x43f7db(0x43e)]()&&!this[_0x43f7db(0x162)]()){if(_0x43f7db(0x459)===_0x43f7db(0x459))return 0x8;else{this[_0x43f7db(0x180)]=[];for(const _0xa7f104 of _0x3a6ca4[_0x43f7db(0x10e)]()){this[_0x43f7db(0x345)](_0xa7f104);}}}else return this[_0x43f7db(0x261)]()&&this['isSpriteVS8dir']()?this['getPosingCharacterDirection']():VisuMZ[_0x43f7db(0x1cc)][_0x43f7db(0x18e)][_0x43f7db(0x275)](this);}},VisuMZ[_0x237a7a(0x1cc)]['Game_CharacterBase_setDirection']=Game_CharacterBase[_0x237a7a(0x2ed)]['setDirection'],Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x310)]=function(_0x3a493e){const _0x341aad=_0x237a7a;if(!this[_0x341aad(0x100)]())_0x3a493e=this[_0x341aad(0x41f)](_0x3a493e);VisuMZ[_0x341aad(0x1cc)]['Game_CharacterBase_setDirection'][_0x341aad(0x275)](this,_0x3a493e);},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x41f)]=function(_0x549da1){const _0x2318ad=_0x237a7a;if(_0x549da1===0x1)return this[_0x2318ad(0x295)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x549da1===0x3)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x549da1===0x7)return this[_0x2318ad(0x295)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x549da1===0x9)return this[_0x2318ad(0x295)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x549da1;},Game_CharacterBase['prototype'][_0x237a7a(0x5f0)]=function(_0x70021a){const _0x2903fb=_0x237a7a;return[0x1,0x3,0x5,0x7,0x9][_0x2903fb(0x572)](_0x70021a);},Game_CharacterBase['prototype'][_0x237a7a(0x19f)]=function(){return this['_lastMovedDirection']||0x0;},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x526)]=Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x3b8)],Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x3b8)]=function(_0x4db5cd){const _0x3938ea=_0x237a7a;this[_0x3938ea(0x30e)]=_0x4db5cd,VisuMZ['EventsMoveCore'][_0x3938ea(0x526)][_0x3938ea(0x275)](this,_0x4db5cd);},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x156)]=function(_0x5912b4){const _0x380ec0=_0x237a7a;if(!this['isDiagonalDirection'](_0x5912b4))return this[_0x380ec0(0x3b8)](_0x5912b4);let _0x5a2b72=0x0,_0x5e4f36=0x0;switch(_0x5912b4){case 0x1:_0x5a2b72=0x4,_0x5e4f36=0x2;break;case 0x3:_0x5a2b72=0x6,_0x5e4f36=0x2;break;case 0x7:_0x5a2b72=0x4,_0x5e4f36=0x8;break;case 0x9:_0x5a2b72=0x6,_0x5e4f36=0x8;break;}if(VisuMZ[_0x380ec0(0x1cc)][_0x380ec0(0x3e2)]['Movement'][_0x380ec0(0x31b)]){if(!this[_0x380ec0(0x295)](this['_x'],this['_y'],_0x5a2b72))return this[_0x380ec0(0x3b8)](_0x5e4f36);if(!this[_0x380ec0(0x295)](this['_x'],this['_y'],_0x5e4f36))return this[_0x380ec0(0x3b8)](_0x5a2b72);if(!this[_0x380ec0(0x161)](this['_x'],this['_y'],_0x5a2b72,_0x5e4f36)){let _0x904f69=VisuMZ[_0x380ec0(0x1cc)][_0x380ec0(0x3e2)][_0x380ec0(0x11d)][_0x380ec0(0x323)]?_0x5a2b72:_0x5e4f36;return this[_0x380ec0(0x3b8)](_0x904f69);}}this[_0x380ec0(0x30e)]=_0x5912b4,this[_0x380ec0(0x3d9)](_0x5a2b72,_0x5e4f36);},VisuMZ['EventsMoveCore'][_0x237a7a(0x251)]=Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x14f)],Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x14f)]=function(){const _0x54cdb0=_0x237a7a;let _0x268c01=this[_0x54cdb0(0x5fe)];if(this['isDashing']()){if(_0x54cdb0(0x5bb)===_0x54cdb0(0x501)){if(this[_0x54cdb0(0x3c6)]!==_0x4e8fec[_0x54cdb0(0x343)])return!![];if(this[_0x54cdb0(0x48d)]!==_0x480f39[_0x54cdb0(0x494)])return!![];if(this[_0x54cdb0(0x37f)]!==_0x128bce['scale'])return!![];}else _0x268c01+=this[_0x54cdb0(0x202)]();}return this[_0x54cdb0(0x268)](_0x268c01);},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x202)]=function(){const _0x3cca0d=_0x237a7a,_0x43423b=VisuMZ[_0x3cca0d(0x1cc)]['Settings'][_0x3cca0d(0x11d)];if(_0x43423b[_0x3cca0d(0x56e)]!==undefined){if(_0x3cca0d(0x406)!==_0x3cca0d(0x1fa))return _0x43423b['DashModifier'];else{if(this[_0x3cca0d(0x5d3)]!==0x3)return;if(this[_0x3cca0d(0x33d)])return;if(!this[_0x3cca0d(0x446)](![]))return;if(!this[_0x3cca0d(0x606)](![]))return;_0x187b83[_0x3cca0d(0x1cc)][_0x3cca0d(0x3ef)]['call'](this);}}else return VisuMZ[_0x3cca0d(0x1cc)][_0x3cca0d(0x251)]['call'](this)-this['_moveSpeed'];},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x268)]=function(_0x5c383e){const _0xde423e=_0x237a7a,_0x214feb=VisuMZ[_0xde423e(0x1cc)][_0xde423e(0x3e2)][_0xde423e(0x11d)];if(!_0x214feb['SlowerSpeed'])return _0x5c383e;return[0x1,0x3,0x7,0x9]['includes'](this['_lastMovedDirection'])&&(_0x5c383e*=_0x214feb[_0xde423e(0x1d2)]||0.01),_0x5c383e;},VisuMZ['EventsMoveCore']['Game_CharacterBase_isDashing']=Game_CharacterBase[_0x237a7a(0x2ed)]['isDashing'],Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x213)]=function(){const _0x37a1c5=_0x237a7a;if(!Game_CharacterBase['ALLOW_LADDER_DASH']&&this[_0x37a1c5(0x43e)]())return![];if(this[_0x37a1c5(0x52e)])return!![];return VisuMZ[_0x37a1c5(0x1cc)][_0x37a1c5(0x29a)][_0x37a1c5(0x275)](this);},Game_CharacterBase['prototype']['isDashingAndMoving']=function(){const _0x354866=_0x237a7a;return this[_0x354866(0x213)]()&&this[_0x354866(0x422)]===0x0;},VisuMZ[_0x237a7a(0x1cc)]['Game_CharacterBase_pattern']=Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x2ff)],Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x2ff)]=function(){const _0x27abe9=_0x237a7a;return this[_0x27abe9(0x261)]()?this['getPosingCharacterPattern']():VisuMZ[_0x27abe9(0x1cc)][_0x27abe9(0x5b6)][_0x27abe9(0x275)](this);},VisuMZ[_0x237a7a(0x1cc)]['Game_CharacterBase_increaseSteps']=Game_CharacterBase[_0x237a7a(0x2ed)]['increaseSteps'],Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x25e)]=function(){const _0x209fbc=_0x237a7a;VisuMZ[_0x209fbc(0x1cc)][_0x209fbc(0x101)][_0x209fbc(0x275)](this),this['clearPose']();},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x111)]=Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x591)],Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x591)]=function(){const _0x1bae3b=_0x237a7a;if(this['isSpriteVS8dir']())return this[_0x1bae3b(0x456)]();return VisuMZ[_0x1bae3b(0x1cc)][_0x1bae3b(0x111)][_0x1bae3b(0x275)](this);},Game_CharacterBase[_0x237a7a(0x2ed)]['characterIndexVS8']=function(){const _0x2d5447=_0x237a7a,_0x44e913=this[_0x2d5447(0x511)]();if(this[_0x2d5447(0x162)]()){if(_0x2d5447(0x4b9)===_0x2d5447(0x350)){const _0x27b2ee=_0x380961?_0xec296[_0x2d5447(0x438)]():0x0,_0x4804a2=[0x0,0x0,_0x2d5447(0x102)[_0x2d5447(0x307)](_0x27b2ee,_0x28fbd6)];_0x266c17[_0x2d5447(0x4cf)](_0x4804a2,_0x454707);}else{if([0x2,0x4,0x6,0x8][_0x2d5447(0x572)](_0x44e913))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0x44e913))return 0x5;}}else{if(this['isOnLadder']()){if('uAuZH'===_0x2d5447(0x3c0))this['_requestSaveEventLocation']&&this[_0x2d5447(0x121)]();else return 0x6;}else{if(this[_0x2d5447(0x261)]()){if(_0x2d5447(0x1b2)==='igvoT')this[_0x2d5447(0x30d)]['x']=0x1/_0x329bb6[_0x2d5447(0x5fb)](),this['scale']['y']=0x1/_0x10ec7a['zoomScale'](),this[_0x2d5447(0x5f8)]=_0x424115[_0x2d5447(0x5fb)]();else return this['getPosingCharacterIndex']();}else{if(this[_0x2d5447(0x190)]){if([0x2,0x4,0x6,0x8][_0x2d5447(0x572)](_0x44e913))return 0x4;if([0x1,0x3,0x7,0x9][_0x2d5447(0x572)](_0x44e913))return 0x5;}else{if(this[_0x2d5447(0x1d3)]()&&this[_0x2d5447(0x627)]()){if(_0x2d5447(0x383)!==_0x2d5447(0x383))return _0x5ae45f[_0x2d5447(0x2ed)][_0x2d5447(0x212)][_0x2d5447(0x275)](this);else{if([0x2,0x4,0x6,0x8][_0x2d5447(0x572)](_0x44e913))return 0x4;if([0x1,0x3,0x7,0x9][_0x2d5447(0x572)](_0x44e913))return 0x5;}}else{if(this[_0x2d5447(0x4a4)]()){if(_0x2d5447(0x60f)===_0x2d5447(0x375)){this[_0x2d5447(0x21e)]=_0x448041['EventsMoveCore'][_0x2d5447(0x3e2)][_0x2d5447(0x11d)][_0x2d5447(0x619)];const _0x24a884=_0x24a6ad['note']||'';if(_0x24a884[_0x2d5447(0x240)](/<DIAGONAL MOVEMENT: ON>/i))this['_diagonalSupport']=!![];else _0x24a884[_0x2d5447(0x240)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this['_diagonalSupport']=![]);}else{if([0x2,0x4,0x6,0x8]['includes'](_0x44e913))return 0x2;if([0x1,0x3,0x7,0x9][_0x2d5447(0x572)](_0x44e913))return 0x3;}}else{if([0x2,0x4,0x6,0x8][_0x2d5447(0x572)](_0x44e913))return 0x0;if([0x1,0x3,0x7,0x9]['includes'](_0x44e913))return 0x1;}}}}}}},Game_CharacterBase['prototype'][_0x237a7a(0x627)]=function(){const _0x36388a=_0x237a7a;return VisuMZ[_0x36388a(0x1cc)]['Settings'][_0x36388a(0x5d8)][_0x36388a(0x3af)];},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x1e1)]=function(){const _0x1a2643=_0x237a7a;return this[_0x1a2643(0x43e)]()&&this['terrainTag']()===VisuMZ[_0x1a2643(0x1cc)][_0x1a2643(0x3e2)]['TerrainTag'][_0x1a2643(0x126)];},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x4ed)]=function(){const _0x1fb0cc=_0x237a7a;if(this[_0x1fb0cc(0x1e1)]())return 0x4;else{if(_0x1fb0cc(0x185)==='RvGCD')return 0x2;else{const _0x5f127f=this[_0x1fb0cc(0x4db)](_0x1a60f6,_0x4eb71e,!![]);if(_0x5f127f)this['executeMoveDir8'](_0x5f127f);}}},VisuMZ['EventsMoveCore'][_0x237a7a(0x12b)]=Game_CharacterBase['prototype'][_0x237a7a(0x378)],Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x378)]=function(){const _0x2e7d93=_0x237a7a;VisuMZ[_0x2e7d93(0x1cc)][_0x2e7d93(0x12b)][_0x2e7d93(0x275)](this),this[_0x2e7d93(0x4b5)]();},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x4b5)]=function(){const _0x4f0bc2=_0x237a7a;this['_poseDuration']=this['_poseDuration']||0x0;if(this[_0x4f0bc2(0x2fa)]>0x0){this[_0x4f0bc2(0x2fa)]--;if(this[_0x4f0bc2(0x2fa)]<=0x0&&this[_0x4f0bc2(0x599)]!==_0x4f0bc2(0x210))this[_0x4f0bc2(0x1a6)]();}},VisuMZ['EventsMoveCore'][_0x237a7a(0x4de)]=Game_CharacterBase['prototype'][_0x237a7a(0x3d9)],Game_CharacterBase[_0x237a7a(0x2ed)]['moveDiagonally']=function(_0x4a7c1f,_0x1660ab){const _0xc02fdf=_0x237a7a;VisuMZ['EventsMoveCore'][_0xc02fdf(0x4de)][_0xc02fdf(0x275)](this,_0x4a7c1f,_0x1660ab);if(this[_0xc02fdf(0x100)]())this[_0xc02fdf(0x113)](_0x4a7c1f,_0x1660ab);},Game_CharacterBase[_0x237a7a(0x2ed)]['setDiagonalDirection']=function(_0x33896f,_0x4f3ca8){const _0x2b0ea7=_0x237a7a;if(_0x33896f===0x4&&_0x4f3ca8===0x2)this[_0x2b0ea7(0x310)](0x1);if(_0x33896f===0x6&&_0x4f3ca8===0x2)this['setDirection'](0x3);if(_0x33896f===0x4&&_0x4f3ca8===0x8)this[_0x2b0ea7(0x310)](0x7);if(_0x33896f===0x6&&_0x4f3ca8===0x8)this[_0x2b0ea7(0x310)](0x9);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x2c2)]=Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x127)],Game_CharacterBase['prototype']['hasStepAnime']=function(){const _0x2cf6a0=_0x237a7a;if(this[_0x2cf6a0(0x261)]()&&this['getPose']()===_0x2cf6a0(0x210))return!![];return VisuMZ[_0x2cf6a0(0x1cc)][_0x2cf6a0(0x2c2)][_0x2cf6a0(0x275)](this);},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x1f6)]=function(_0x34eb9f,_0x8b74d8){const _0x2b9dc=_0x237a7a;if(_0x34eb9f[_0x2b9dc(0x240)](/Z/i))_0x34eb9f=_0x2b9dc(0x210);if(_0x34eb9f[_0x2b9dc(0x240)](/SLEEP/i))_0x34eb9f=_0x2b9dc(0x210);this[_0x2b9dc(0x100)]()&&(this[_0x2b9dc(0x599)]=_0x34eb9f[_0x2b9dc(0x376)]()[_0x2b9dc(0x19c)](),this['_poseDuration']=_0x8b74d8||Infinity);},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x2fb)]=function(){const _0x23a018=_0x237a7a;if(this[_0x23a018(0x100)]())return(this[_0x23a018(0x599)]||'')['toUpperCase']()['trim']();else{if(_0x23a018(0x363)==='Qftgv')return''[_0x23a018(0x376)]()[_0x23a018(0x19c)]();else{_0x15f5bf[_0x23a018(0x124)](_0x577d1c,_0x239923);const _0x595a5c=_0x35e7ba[_0x23a018(0x1ba)]();_0x5a2703[_0x23a018(0x3fb)]=_0x39a803[_0x23a018(0x3fb)]||_0x5da90f[_0x23a018(0x438)]();const _0x207f81=[_0x296832['MapId'],_0x178722[_0x23a018(0x173)]||_0x595a5c[_0x23a018(0x21f)](),_0xf04af3[_0x23a018(0x34e)]],_0x4dbc11=_0x2629bb['TargetSwitchId'],_0x535df7=_0x967297[_0x23a018(0x228)](_0x207f81)||![];_0x4c7303[_0x23a018(0x4cf)](_0x4dbc11,_0x535df7);}}},Game_CharacterBase['prototype'][_0x237a7a(0x3bc)]=function(_0x17287a,_0x425428){const _0x4aa7ea=_0x237a7a;if(this['isSpriteVS8dir']()){const _0x27536a=['',_0x4aa7ea(0x358),'QUESTION','MUSIC\x20NOTE',_0x4aa7ea(0x4a1),_0x4aa7ea(0x5c8),_0x4aa7ea(0x364),_0x4aa7ea(0x397),'SILENCE',_0x4aa7ea(0x56a),_0x4aa7ea(0x210),'','','','',''][_0x17287a];this[_0x4aa7ea(0x1f6)](_0x27536a,_0x425428);}},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x1a6)]=function(){const _0x59f9a4=_0x237a7a;this['_pose']='',this[_0x59f9a4(0x2fa)]=0x0;},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x261)]=function(){const _0x3e133e=_0x237a7a;return this['isSpriteVS8dir']()&&!!this[_0x3e133e(0x599)];},Game_CharacterBase['prototype']['getPosingCharacterIndex']=function(){const _0x596fda=_0x237a7a,_0x4dbf3b=this[_0x596fda(0x599)][_0x596fda(0x376)]();switch(this[_0x596fda(0x599)][_0x596fda(0x376)]()[_0x596fda(0x19c)]()){case _0x596fda(0x401):case'HMPH':case _0x596fda(0x3c4):case _0x596fda(0x45d):case'KNEEL':case _0x596fda(0x45e):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype'][_0x237a7a(0x148)]=function(){const _0x32707f=_0x237a7a;switch(this[_0x32707f(0x599)][_0x32707f(0x376)]()){case _0x32707f(0x358):case _0x32707f(0x4b0):case _0x32707f(0x1f9):case'!':case'?':return 0x2;break;case _0x32707f(0x4a1):case'ANGER':case _0x32707f(0x364):return 0x4;break;case _0x32707f(0x401):case _0x32707f(0x374):case _0x32707f(0x3c4):case _0x32707f(0x397):case _0x32707f(0x13a):case _0x32707f(0x56a):return 0x6;break;case _0x32707f(0x45d):case'KNEEL':case _0x32707f(0x45e):case _0x32707f(0x210):case _0x32707f(0x471):return 0x8;break;default:return VisuMZ[_0x32707f(0x1cc)]['Game_CharacterBase_setDirection'][_0x32707f(0x275)](this);break;}},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x4ce)]=function(){const _0x4eb5e6=_0x237a7a;switch(this[_0x4eb5e6(0x599)]['toUpperCase']()){case _0x4eb5e6(0x401):case _0x4eb5e6(0x45d):case _0x4eb5e6(0x358):case'!':case'HEART':case _0x4eb5e6(0x397):return 0x0;break;case'HMPH':case _0x4eb5e6(0x284):case _0x4eb5e6(0x4b0):case'?':case _0x4eb5e6(0x5c8):case _0x4eb5e6(0x13a):return 0x1;break;case'VICTORY':case _0x4eb5e6(0x45e):case'MUSIC\x20NOTE':case _0x4eb5e6(0x364):case _0x4eb5e6(0x56a):return 0x2;break;default:return VisuMZ['EventsMoveCore'][_0x4eb5e6(0x5b6)][_0x4eb5e6(0x275)](this);break;}},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x20e)]=function(){const _0x430f8b=_0x237a7a;this[_0x430f8b(0x190)]=!![];},Game_CharacterBase['prototype']['clearCarrying']=function(){const _0x2a9e8b=_0x237a7a;this[_0x2a9e8b(0x190)]=![];},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x409)]=function(){this['_forceDashing']=!![];},Game_CharacterBase['prototype'][_0x237a7a(0x22f)]=function(){const _0x28f8b0=_0x237a7a;this[_0x28f8b0(0x52e)]=![];},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x23e)]=function(){const _0x38ce3c=_0x237a7a;if(this[_0x38ce3c(0x5af)]())return![];if(this[_0x38ce3c(0x635)])return![];if(this['_characterName']==='')return![];if(this[_0x38ce3c(0x630)]===Game_Vehicle)return![];if(this[_0x38ce3c(0x5dd)]())return![];return!![];},Game_CharacterBase['prototype'][_0x237a7a(0x5fd)]=function(){const _0x1a7552=_0x237a7a;if(this[_0x1a7552(0x43e)]())return!![];if(this[_0x1a7552(0x630)]===Game_Player&&this[_0x1a7552(0x586)]())return!![];return![];},Game_CharacterBase[_0x237a7a(0x2ed)]['shadowFilename']=function(){const _0x4b281c=_0x237a7a;return VisuMZ[_0x4b281c(0x1cc)][_0x4b281c(0x3e2)][_0x4b281c(0x11d)][_0x4b281c(0x21b)];},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x309)]=function(){return this['screenX']();},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x4c4)]=function(){const _0x5b6dc3=_0x237a7a,_0xb66d6a=$gameMap['tileHeight']();return Math[_0x5b6dc3(0x4bf)](this['scrolledY']()*_0xb66d6a+_0xb66d6a);},Game_CharacterBase[_0x237a7a(0x50b)]=0x64,Game_CharacterBase['prototype']['getDiagonalDestination']=function(_0x24a5d6,_0x32269f){const _0x1e6f83=_0x237a7a;if(TouchInput['isPressed']())return![];if(!$gameMap[_0x1e6f83(0x5f9)]())return![];if($gameMap[_0x1e6f83(0x306)](_0x24a5d6,_0x32269f)['length']>0x0)return![];if(!$gameMap[_0x1e6f83(0x110)](_0x24a5d6,_0x32269f))return![];const _0x453351=$gameMap['_events']['length'];if(_0x453351>=Game_CharacterBase['DIAGONAL_PATHFINDING_EVENT_LIMIT'])return![];return!![];},Game_Character[_0x237a7a(0x2ed)]['findDiagonalDirectionTo']=function(_0x30beab,_0x4ed438){const _0x5826e9=_0x237a7a;let _0x53cfd2=this[_0x5826e9(0x1c9)](_0x30beab,_0x4ed438);if(!this[_0x5826e9(0x2fe)](_0x30beab,_0x4ed438))return _0x53cfd2;if(this[_0x5826e9(0x2d8)](_0x30beab,_0x4ed438))return _0x53cfd2;const _0x4d7f03=_0x53cfd2;if(_0x53cfd2===0x2){if(_0x30beab>this['x']&&this[_0x5826e9(0x295)](this['x'],this['y'],0x6))_0x53cfd2=0x3;if(_0x30beab<this['x']&&this['canPass'](this['x'],this['y'],0x4))_0x53cfd2=0x1;}else{if(_0x53cfd2===0x4){if(_0x4ed438>this['y']&&this[_0x5826e9(0x295)](this['x'],this['y'],0x4))_0x53cfd2=0x1;if(_0x4ed438<this['y']&&this[_0x5826e9(0x295)](this['x'],this['y'],0x6))_0x53cfd2=0x7;}else{if(_0x53cfd2===0x6){if(_0x4ed438>this['y']&&this[_0x5826e9(0x295)](this['x'],this['y'],0x4))_0x53cfd2=0x3;if(_0x4ed438<this['y']&&this[_0x5826e9(0x295)](this['x'],this['y'],0x6))_0x53cfd2=0x9;}else{if(_0x53cfd2===0x8){if('oLDCb'===_0x5826e9(0x2a0)){if(_0x30beab>this['x']&&this[_0x5826e9(0x295)](this['x'],this['y'],0x6))_0x53cfd2=0x9;if(_0x30beab<this['x']&&this['canPass'](this['x'],this['y'],0x4))_0x53cfd2=0x7;}else this[_0x5826e9(0x467)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x5826e9(0x274)]={},this['_MapSpawnedEventData']=[],this[_0x5826e9(0x2cd)]={},this[_0x5826e9(0x2c6)]={},this[_0x5826e9(0x35b)]=![],this[_0x5826e9(0x609)]='default';}}}}const _0x1a0d5e=$gameMap[_0x5826e9(0x3b9)](this['x'],_0x53cfd2),_0x1edd69=$gameMap['roundYWithDirection'](this['y'],_0x53cfd2);if(this[_0x5826e9(0x2d8)](_0x1a0d5e,_0x1edd69))_0x53cfd2=_0x4d7f03;return _0x53cfd2;},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x33b)]=Game_CharacterBase[_0x237a7a(0x2ed)]['canPass'],Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x295)]=function(_0x50a990,_0x2b9903,_0x281bcf){const _0x4059ee=_0x237a7a;return this[_0x4059ee(0x215)]===_0x4059ee(0x577)?this[_0x4059ee(0x5c1)]()[_0x4059ee(0x10b)](_0x50a990,_0x2b9903,_0x281bcf):VisuMZ[_0x4059ee(0x1cc)][_0x4059ee(0x33b)][_0x4059ee(0x275)](this,_0x50a990,_0x2b9903,_0x281bcf);},Game_CharacterBase['prototype'][_0x237a7a(0x30a)]=function(){const _0x202816=_0x237a7a;this[_0x202816(0x3c3)]=0x0,this['_spriteOffsetY']=0x0;},VisuMZ[_0x237a7a(0x1cc)]['Game_CharacterBase_screenX']=Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x4da)],Game_CharacterBase['prototype'][_0x237a7a(0x4da)]=function(){const _0x2fdcb3=_0x237a7a;return VisuMZ[_0x2fdcb3(0x1cc)][_0x2fdcb3(0x362)]['call'](this)+(this[_0x2fdcb3(0x3c3)]||0x0);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x585)]=Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x1ad)],Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x1ad)]=function(){const _0x533e9d=_0x237a7a;return VisuMZ['EventsMoveCore'][_0x533e9d(0x585)]['call'](this)+(this[_0x533e9d(0x466)]||0x0);},Game_CharacterBase[_0x237a7a(0x2bb)]=VisuMZ[_0x237a7a(0x1cc)]['Settings'][_0x237a7a(0x11d)][_0x237a7a(0x334)]??-0x6,Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x4ca)]=function(){const _0x2be85b=_0x237a7a;return this[_0x2be85b(0x559)]()?0x0:-Game_CharacterBase[_0x2be85b(0x2bb)];},Game_CharacterBase[_0x237a7a(0x2ed)]['clearStepPattern']=function(){const _0x3c58ee=_0x237a7a;this[_0x3c58ee(0x3a1)]='';},VisuMZ['EventsMoveCore'][_0x237a7a(0x1e9)]=Game_CharacterBase[_0x237a7a(0x2ed)]['updatePattern'],Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x229)]=function(){const _0x14936a=_0x237a7a;if(this[_0x14936a(0x208)])return;if(this[_0x14936a(0x3cd)]())return;VisuMZ[_0x14936a(0x1cc)][_0x14936a(0x1e9)][_0x14936a(0x275)](this);},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x3cd)]=function(){const _0x3abfe9=_0x237a7a;if(!this['hasStepAnime']()&&this[_0x3abfe9(0x422)]>0x0)return![];switch(String(this['_stepPattern'])[_0x3abfe9(0x376)]()[_0x3abfe9(0x19c)]()){case _0x3abfe9(0x5e4):this[_0x3abfe9(0x640)]+=0x1;if(this[_0x3abfe9(0x640)]>0x2)this[_0x3abfe9(0x483)](0x0);break;case _0x3abfe9(0x259):this[_0x3abfe9(0x640)]-=0x1;if(this['_pattern']<0x0)this[_0x3abfe9(0x483)](0x2);break;case _0x3abfe9(0x286):case _0x3abfe9(0x583):this[_0x3abfe9(0x1e0)]();break;case'SPIN\x20COUNTERCLOCKWISE':case _0x3abfe9(0x593):case _0x3abfe9(0x497):case _0x3abfe9(0x3d5):this[_0x3abfe9(0x1b6)]();break;default:return![];}return!![];},Game_CharacterBase['prototype'][_0x237a7a(0x212)]=function(){const _0x54b225=_0x237a7a;return $gameSystem[_0x54b225(0x212)](this);},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x1d3)]=function(){const _0x56aaeb=this['getEventIconData']();if(!_0x56aaeb)return![];return _0x56aaeb['iconIndex']>0x0;},Game_CharacterBase['prototype'][_0x237a7a(0x191)]=function(){const _0x583b89=_0x237a7a,_0x525064=this[_0x583b89(0x511)]();return $gameMap[_0x583b89(0x3b9)](this['x'],_0x525064);},Game_CharacterBase['prototype'][_0x237a7a(0x12c)]=function(){const _0x518ec8=_0x237a7a,_0x1a8090=this[_0x518ec8(0x511)]();return $gameMap[_0x518ec8(0x545)](this['y'],_0x1a8090);},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x3ba)]=function(){const _0x14a671=_0x237a7a,_0x48c1d0=this[_0x14a671(0x475)](this[_0x14a671(0x511)]());return $gameMap[_0x14a671(0x3b9)](this['x'],_0x48c1d0);},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x445)]=function(){const _0x439fdf=_0x237a7a,_0x221085=this[_0x439fdf(0x475)](this[_0x439fdf(0x511)]());return $gameMap[_0x439fdf(0x545)](this['y'],_0x221085);},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x30c)]=function(){const _0x338285=_0x237a7a,_0x677be8=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this['direction']()];return $gameMap[_0x338285(0x3b9)](this['x'],_0x677be8);},Game_CharacterBase['prototype'][_0x237a7a(0x3d0)]=function(){const _0x57fde2=_0x237a7a,_0x54dc49=[0x0,0x3,0x6,0x9,0x2,0x5,0x8,0x1,0x4,0x7][this[_0x57fde2(0x511)]()];return $gameMap[_0x57fde2(0x545)](this['y'],_0x54dc49);},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x642)]=function(){const _0x544392=_0x237a7a,_0x360c10=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x544392(0x511)]()];return $gameMap[_0x544392(0x3b9)](this['x'],_0x360c10);},Game_CharacterBase['prototype'][_0x237a7a(0x601)]=function(){const _0x1cdd0d=_0x237a7a,_0x25a3bf=[0x0,0x7,0x4,0x1,0x8,0x5,0x2,0x9,0x6,0x3][this[_0x1cdd0d(0x511)]()];return $gameMap[_0x1cdd0d(0x545)](this['y'],_0x25a3bf);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x4b2)]=Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x53d)],Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x53d)]=function(_0x6a1bd3){const _0x2d3e75=_0x237a7a;route=JsonEx[_0x2d3e75(0x4e9)](_0x6a1bd3),VisuMZ[_0x2d3e75(0x1cc)][_0x2d3e75(0x4b2)][_0x2d3e75(0x275)](this,route);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x16d)]=Game_Character[_0x237a7a(0x2ed)]['forceMoveRoute'],Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x144)]=function(_0x1137dc){const _0xbbdc87=_0x237a7a;route=JsonEx['makeDeepCopy'](_0x1137dc),VisuMZ[_0xbbdc87(0x1cc)][_0xbbdc87(0x16d)]['call'](this,route);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x141)]=Game_Character['prototype'][_0x237a7a(0x531)],Game_Character[_0x237a7a(0x2ed)]['processMoveCommand']=function(_0x1652d8){const _0x43a7db=_0x237a7a,_0x3a28e9=Game_Character,_0xc7b1ea=_0x1652d8[_0x43a7db(0x5d1)];if(_0x1652d8[_0x43a7db(0x571)]===_0x3a28e9[_0x43a7db(0x4d5)]){if(_0x43a7db(0x639)!==_0x43a7db(0x20b)){let _0x5df2b8=_0x1652d8[_0x43a7db(0x5d1)][0x0];_0x5df2b8=this['convertVariableValuesInScriptCall'](_0x5df2b8),_0x5df2b8=this[_0x43a7db(0x2f5)](_0x5df2b8),this[_0x43a7db(0x4f6)](_0x1652d8,_0x5df2b8);}else this['moveBackToRandomHome']();}else VisuMZ['EventsMoveCore'][_0x43a7db(0x141)]['call'](this,_0x1652d8);},Game_Character['prototype'][_0x237a7a(0x581)]=function(_0x5b8623){const _0x5a1e47=_0x237a7a,_0x2e0207=/\$gameVariables\.value\((\d+)\)/gi,_0x2a4c9f=/\\V\[(\d+)\]/gi;while(_0x5b8623[_0x5a1e47(0x240)](_0x2e0207)){_0x5b8623=_0x5b8623[_0x5a1e47(0x52a)](_0x2e0207,(_0x535430,_0xee53a6)=>$gameVariables[_0x5a1e47(0x228)](parseInt(_0xee53a6)));}while(_0x5b8623[_0x5a1e47(0x240)](_0x2a4c9f)){if(_0x5a1e47(0x38b)!==_0x5a1e47(0x1df))_0x5b8623=_0x5b8623[_0x5a1e47(0x52a)](_0x2a4c9f,(_0x58ebe6,_0xb477dd)=>$gameVariables[_0x5a1e47(0x228)](parseInt(_0xb477dd)));else{const _0x3a7938=_0xe8157e[_0x5a1e47(0x5f6)](_0x215507-this['x']),_0x4a8cfb=_0x4d1232['round'](_0x53d29b-this['y']);this[_0x5a1e47(0x24f)](_0x3a7938,_0x4a8cfb);}}return _0x5b8623;},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x2f5)]=function(_0xabc59c){const _0x645513=_0x237a7a,_0x3474bb=/\\SELFVAR\[(\d+)\]/gi;while(_0xabc59c[_0x645513(0x240)](_0x3474bb)){_0xabc59c=_0xabc59c[_0x645513(0x52a)](_0x3474bb,(_0x44c6dd,_0x180655)=>getSelfVariableValue(this[_0x645513(0x4e7)],this[_0x645513(0x5b7)],parseInt(_0x180655)));}return _0xabc59c;},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x4f6)]=function(_0x28fb8a,_0x5bccb4){const _0x5402b2=_0x237a7a;if(_0x5bccb4['match'](/ANIMATION:[ ](\d+)/i))return this[_0x5402b2(0x3a8)](Number(RegExp['$1']));if(_0x5bccb4[_0x5402b2(0x240)](/BALLOON:[ ](.*)/i))return this[_0x5402b2(0x62f)](String(RegExp['$1']));if(_0x5bccb4[_0x5402b2(0x240)](/FADE IN:[ ](\d+)/i))return _0x5402b2(0x4bb)!==_0x5402b2(0x4bb)?this[_0x5402b2(0x5bc)](_0x5402b2(0x4a9)):this[_0x5402b2(0x521)](Number(RegExp['$1']));if(_0x5bccb4[_0x5402b2(0x240)](/FADE OUT:[ ](\d+)/i))return this[_0x5402b2(0x318)](Number(RegExp['$1']));if(_0x5bccb4[_0x5402b2(0x240)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x5402b2(0x20e)]();if(_0x5bccb4['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x5402b2(0x1d4)]();if(_0x5bccb4[_0x5402b2(0x240)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i)){if(_0x5402b2(0x496)!==_0x5402b2(0x496))this[_0x5402b2(0x2b6)](this['x'],this['y']);else return this[_0x5402b2(0x409)]();}if(_0x5bccb4['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this['clearDashing']();if(_0x5bccb4['match'](/HUG:[ ]LEFT/i))return _0x5402b2(0x2f2)==='qIELM'?_0x33d3cc[_0x5402b2(0x1cc)]['Settings'][_0x5402b2(0x4a6)][_0x5402b2(0x38c)]:this[_0x5402b2(0x5bc)](_0x5402b2(0x4a9));if(_0x5bccb4[_0x5402b2(0x240)](/HUG:[ ]RIGHT/i))return this[_0x5402b2(0x5bc)]('right');if(_0x5bccb4[_0x5402b2(0x240)](/INDEX:[ ](\d+)/i))return this[_0x5402b2(0x421)](Number(RegExp['$1']));if(_0x5bccb4[_0x5402b2(0x240)](/INDEX:[ ]([\+\-]\d+)/i)){if(_0x5402b2(0x4dc)===_0x5402b2(0x4dc)){const _0x37272e=this[_0x5402b2(0x2bc)]+Number(RegExp['$1']);return this[_0x5402b2(0x421)](_0x37272e);}else this[_0x5402b2(0x599)]='',this[_0x5402b2(0x2fa)]=0x0;}if(_0x5bccb4[_0x5402b2(0x240)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x5402b2(0x150)](Number(RegExp['$1']));if(_0x5bccb4[_0x5402b2(0x240)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x5402b2(0x4c6)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5bccb4[_0x5402b2(0x240)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x5f38de=$gameMap[_0x5402b2(0x5d6)](Number(RegExp['$1']));return this['processMoveRouteJumpToCharacter'](_0x5f38de);}if(_0x5bccb4[_0x5402b2(0x240)](/JUMP TO PLAYER/i)){if('yuexj'!==_0x5402b2(0x317)){const _0x4a1c2d=this[_0x5402b2(0x1aa)],_0xcd796a=this['_randomHomeY'];return this[_0x5402b2(0x458)](_0x4a1c2d,_0xcd796a);}else return this[_0x5402b2(0x314)]($gamePlayer);}if(_0x5bccb4[_0x5402b2(0x240)](/JUMP TO HOME/i)&&this[_0x5402b2(0x21f)]){const _0x18220a=this[_0x5402b2(0x1aa)],_0x3d5521=this[_0x5402b2(0x590)];return this[_0x5402b2(0x4c6)](_0x18220a,_0x3d5521);}if(_0x5bccb4[_0x5402b2(0x240)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x2b4ab4=String(RegExp['$1']),_0x5aff0c=this[_0x5402b2(0x61f)](_0x5bccb4);return this['processMoveRouteMoveUntilStop'](_0x2b4ab4,_0x5aff0c);}if(_0x5bccb4['match'](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('zEDlf'===_0x5402b2(0x216))this[_0x5402b2(0x3c3)]=0x0,this['_spriteOffsetY']=0x0;else{const _0x84e0b0=Number(RegExp['$1']),_0x5d1713=Number(RegExp['$2']),_0x46e86b=this['checkCollisionKeywords'](_0x5bccb4);return this[_0x5402b2(0x3b1)](_0x84e0b0,_0x5d1713,_0x46e86b);}}if(_0x5bccb4[_0x5402b2(0x240)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x41a38b=$gameMap['event'](Number(RegExp['$1'])),_0x11427b=this[_0x5402b2(0x61f)](_0x5bccb4);return this[_0x5402b2(0x4f2)](_0x41a38b,_0x11427b);}if(_0x5bccb4['match'](/MOVE TO PLAYER/i)){const _0x55657f=this['checkCollisionKeywords'](_0x5bccb4);return this['processMoveRouteMoveToCharacter']($gamePlayer,_0x55657f);}if(_0x5bccb4[_0x5402b2(0x240)](/MOVE TO HOME/i)&&this['eventId']){const _0x3158e5=this[_0x5402b2(0x1aa)],_0x3a23a1=this[_0x5402b2(0x590)],_0x31d73a=this['checkCollisionKeywords'](_0x5bccb4);return this[_0x5402b2(0x3b1)](_0x3158e5,_0x3a23a1,_0x31d73a);}if(_0x5bccb4['match'](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x5402b2(0x1dc)](0x1,Number(RegExp['$1']));if(_0x5bccb4[_0x5402b2(0x240)](/MOVE DOWN:[ ](\d+)/i))return this[_0x5402b2(0x1dc)](0x2,Number(RegExp['$1']));if(_0x5bccb4[_0x5402b2(0x240)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x5402b2(0x1dc)](0x3,Number(RegExp['$1']));if(_0x5bccb4[_0x5402b2(0x240)](/MOVE LEFT:[ ](\d+)/i))return this[_0x5402b2(0x1dc)](0x4,Number(RegExp['$1']));if(_0x5bccb4['match'](/MOVE RIGHT:[ ](\d+)/i))return this[_0x5402b2(0x1dc)](0x6,Number(RegExp['$1']));if(_0x5bccb4[_0x5402b2(0x240)](/MOVE UPPER LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x7,Number(RegExp['$1']));if(_0x5bccb4[_0x5402b2(0x240)](/MOVE UP:[ ](\d+)/i))return this[_0x5402b2(0x1dc)](0x8,Number(RegExp['$1']));if(_0x5bccb4['match'](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x5402b2(0x1dc)](0x9,Number(RegExp['$1']));if(_0x5bccb4[_0x5402b2(0x240)](/OPACITY:[ ](\d+)([%％])/i)){if(_0x5402b2(0x1f7)!=='cwHKO'){const _0x4eba79=Math[_0x5402b2(0x5f6)](Number(RegExp['$1'])/0x64*0xff);return this[_0x5402b2(0x455)](_0x4eba79[_0x5402b2(0x5e0)](0x0,0xff));}else{if(_0x76262e[this[_0x5402b2(0x2ca)]])this[_0x5402b2(0x31d)]='',this['startCallEvent']();else return!![];}}if(_0x5bccb4[_0x5402b2(0x240)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x3eb97c=this['_opacity']+Math['round'](Number(RegExp['$1'])/0x64*0xff);return this[_0x5402b2(0x455)](_0x3eb97c[_0x5402b2(0x5e0)](0x0,0xff));}if(_0x5bccb4['match'](/OPACITY:[ ]([\+\-]\d+)/i)){if('aSPFR'==='XJpqY'){if(!this[_0x5402b2(0x479)])return![];if(!this[_0x5402b2(0x479)][_0x5402b2(0x23b)])return![];if(this[_0x5402b2(0x60e)]!==this[_0x5402b2(0x479)][_0x5402b2(0x36c)])return!![];if(this[_0x5402b2(0x479)][_0x5402b2(0x4af)]&&!this[_0x5402b2(0x3fd)])return!![];if(this['_event'][_0x5402b2(0x23b)][_0x5402b2(0x1e7)]==='')return![];if(this[_0x5402b2(0x5f8)]!==_0x259666['zoomScale']())return!![];if(this[_0x5402b2(0x5c4)]!==this['_event'][_0x5402b2(0x4da)]())return!![];if(this[_0x5402b2(0x132)]!==this[_0x5402b2(0x479)][_0x5402b2(0x1ad)]())return!![];if(this[_0x5402b2(0x2c7)]!==this[_0x5402b2(0x479)]['_labelWindow'][_0x5402b2(0x5c7)])return!![];if(this[_0x5402b2(0x154)]!==this[_0x5402b2(0x479)][_0x5402b2(0x23b)][_0x5402b2(0x2b7)])return!![];if(this['_visiblePlayerX']!==_0x446477['x'])return!![];if(this[_0x5402b2(0x463)]!==_0x178bbe['y'])return!![];if(this[_0x5402b2(0x12a)]!==this[_0x5402b2(0x479)]['x'])return!![];if(this[_0x5402b2(0x5b4)]!==this[_0x5402b2(0x479)]['y'])return!![];if(this[_0x5402b2(0x3ac)]!==_0x440c62['eventLabelsVisible']())return!![];if(this[_0x5402b2(0x3b3)]&&this['contentsOpacity']<0xff)return!![];if(!this['_cacheVisibility']&&this['contentsOpacity']>0x0)return!![];if(_0x3b1670[_0x5402b2(0x2be)]['_encounterEffectDuration']>0x0)return!![];return![];}else{const _0x5c6164=this['_opacity']+Number(RegExp['$1']);return this['setOpacity'](_0x5c6164[_0x5402b2(0x5e0)](0x0,0xff));}}if(_0x5bccb4[_0x5402b2(0x240)](/PATTERN LOCK:[ ](\d+)/i))return this[_0x5402b2(0x199)](Number(RegExp['$1']));if(_0x5bccb4[_0x5402b2(0x240)](/PATTERN UNLOCK/i))return this[_0x5402b2(0x208)]=![];if(_0x5bccb4[_0x5402b2(0x240)](/POSE:[ ](.*)/i)){if('BVbPO'!==_0x5402b2(0x244))this[_0x5402b2(0x466)]=_0x362e59(_0x615400['$1']);else{const _0x1ee06b=String(RegExp['$1'])[_0x5402b2(0x376)]()[_0x5402b2(0x19c)]();return this[_0x5402b2(0x1f6)](_0x1ee06b);}}if(_0x5bccb4[_0x5402b2(0x240)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x5402b2(0x431)===_0x5402b2(0x480)){for(let _0x10b75c=0x1;_0x10b75c<_0x5faccc['switches'][_0x5402b2(0x33c)];_0x10b75c++){if(_0x15bc36[_0x5402b2(0x21d)][_0x10b75c][_0x5402b2(0x240)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x5cc56c['AdvancedSwitches']['push'](_0x10b75c);if(_0x1683b4[_0x5402b2(0x21d)][_0x10b75c][_0x5402b2(0x240)](/<SELF>/i))_0x562e57[_0x5402b2(0x3bb)][_0x5402b2(0x5a6)](_0x10b75c);if(_0x24e940[_0x5402b2(0x21d)][_0x10b75c][_0x5402b2(0x240)](/<MAP>/i))_0x39f9e3[_0x5402b2(0x172)][_0x5402b2(0x5a6)](_0x10b75c);}for(let _0x43f685=0x1;_0x43f685<_0x1f2a54[_0x5402b2(0x349)]['length'];_0x43f685++){if(_0x1aa255[_0x5402b2(0x349)][_0x43f685][_0x5402b2(0x240)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x2c42d5[_0x5402b2(0x500)][_0x5402b2(0x5a6)](_0x43f685);if(_0x2a6c59[_0x5402b2(0x349)][_0x43f685][_0x5402b2(0x240)](/<SELF>/i))_0x37d8a6[_0x5402b2(0x4fb)]['push'](_0x43f685);if(_0x57bbe3[_0x5402b2(0x349)][_0x43f685][_0x5402b2(0x240)](/<MAP>/i))_0x2c80b0['MapVariables'][_0x5402b2(0x5a6)](_0x43f685);}}else{const _0x413f4f=Number(RegExp['$1']),_0x248af9=Number(RegExp['$2']);return this[_0x5402b2(0x529)](_0x413f4f,_0x248af9);}}if(_0x5bccb4[_0x5402b2(0x240)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x3f1b67=$gameMap[_0x5402b2(0x5d6)](Number(RegExp['$1']));return this[_0x5402b2(0x178)](_0x3f1b67);}if(_0x5bccb4[_0x5402b2(0x240)](/STEP TOWARD PLAYER/i))return this[_0x5402b2(0x178)]($gamePlayer);if(_0x5bccb4[_0x5402b2(0x240)](/STEP TOWARD HOME/i)&&this['eventId']){const _0x3fb087=this['_randomHomeX'],_0x450015=this['_randomHomeY'];return this['processMoveRouteStepTo'](_0x3fb087,_0x450015);}if(_0x5bccb4[_0x5402b2(0x240)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x5402b2(0x458)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5bccb4[_0x5402b2(0x240)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x322b62=$gameMap[_0x5402b2(0x5d6)](Number(RegExp['$1']));return this[_0x5402b2(0x461)](_0x322b62);}if(_0x5bccb4['match'](/STEP AWAY FROM PLAYER/i))return this['moveAwayFromCharacter']($gamePlayer);if(_0x5bccb4[_0x5402b2(0x240)](/STEP AWAY FROM HOME/i)&&this[_0x5402b2(0x21f)]){const _0x24ee77=this[_0x5402b2(0x1aa)],_0x48c6e5=this[_0x5402b2(0x590)];return this[_0x5402b2(0x458)](_0x24ee77,_0x48c6e5);}if(_0x5bccb4[_0x5402b2(0x240)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['moveTowardPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5bccb4[_0x5402b2(0x240)](/TURN TO EVENT:[ ](\d+)/i)){const _0x4f2f96=$gameMap[_0x5402b2(0x5d6)](Number(RegExp['$1']));return this[_0x5402b2(0x3ee)](_0x4f2f96);}if(_0x5bccb4[_0x5402b2(0x240)](/TURN TO PLAYER/i)){if('niBbr'!==_0x5402b2(0x59a))return this[_0x5402b2(0x3ee)]($gamePlayer);else{const _0x3b2601=_0x2a723e(_0x592789['$1'])[_0x5402b2(0x21a)]()[_0x5402b2(0x19c)](),_0x4dd1dc=_0x3a7307(_0x2d945['$2']);this[_0x5402b2(0x39c)][_0x3b2601]=_0x4dd1dc;}}if(_0x5bccb4[_0x5402b2(0x240)](/TURN TO HOME/i)&&this['eventId']){const _0x2c9b51=this[_0x5402b2(0x1aa)],_0x2507f1=this[_0x5402b2(0x590)];return this[_0x5402b2(0x37c)](_0x2c9b51,_0x2507f1);}if(_0x5bccb4[_0x5402b2(0x240)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('YSgIf'===_0x5402b2(0x408))return this[_0x5402b2(0x1ce)](Number(RegExp['$1']),Number(RegExp['$2']));else this[_0x5402b2(0x181)](_0x4c1e87);}if(_0x5bccb4[_0x5402b2(0x240)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x1c4bb0=$gameMap[_0x5402b2(0x5d6)](Number(RegExp['$1']));return this[_0x5402b2(0x435)](_0x1c4bb0);}if(_0x5bccb4[_0x5402b2(0x240)](/TURN AWAY FROM PLAYER/i))return _0x5402b2(0x441)===_0x5402b2(0x441)?this[_0x5402b2(0x435)]($gamePlayer):_0xd483da>0x0?0x4:0x6;if(_0x5bccb4[_0x5402b2(0x240)](/TURN AWAY FROM HOME/i)&&this[_0x5402b2(0x21f)]){if(_0x5402b2(0x25d)!==_0x5402b2(0x25d))this[_0x5402b2(0x52f)]['x']=0.5,this[_0x5402b2(0x52f)]['y']=0x1;else{const _0x4239a9=this[_0x5402b2(0x1aa)],_0x497701=this['_randomHomeY'];return this[_0x5402b2(0x1ce)](_0x4239a9,_0x497701);}}if(_0x5bccb4['match'](/TURN LOWER LEFT/i))return this['setDirection'](0x1);if(_0x5bccb4[_0x5402b2(0x240)](/TURN LOWER RIGHT/i))return this['setDirection'](0x3);if(_0x5bccb4['match'](/TURN UPPER LEFT/i)){if('ypChy'!==_0x5402b2(0x23a))_0x325769[_0x5402b2(0x1cc)][_0x5402b2(0x3ec)]['call'](this),this[_0x5402b2(0x381)][_0x5402b2(0x26d)](this[_0x5402b2(0x2e3)]['bind'](this));else return this[_0x5402b2(0x310)](0x7);}if(_0x5bccb4[_0x5402b2(0x240)](/TURN UPPER RIGHT/i))return this[_0x5402b2(0x310)](0x9);if(_0x5bccb4[_0x5402b2(0x240)](/Self Switch[ ](.*):[ ](.*)/i)){if(_0x5402b2(0x41b)!==_0x5402b2(0x41b)){let _0x5cfdca=_0xfd6bd4[_0x5402b2(0x1cc)]['Settings'][_0x5402b2(0x11d)][_0x5402b2(0x323)]?_0x22a7bf:_0xb392d8;return this[_0x5402b2(0x3b8)](_0x5cfdca);}else return this['processMoveRouteSelfSwitch'](RegExp['$1'],RegExp['$2']);}if(_0x5bccb4[_0x5402b2(0x240)](/Self Variable[ ](.*):[ ](.*)/i)){if('MmteZ'===_0x5402b2(0x267))return this[_0x5402b2(0x23c)](RegExp['$1'],RegExp['$2']);else _0x478322[_0x5402b2(0x124)](_0x43caf8,_0x1c488c),_0x5db483[_0x5402b2(0x1c6)](_0x346ef4['TerrainTags']);}if(_0x5bccb4[_0x5402b2(0x240)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return _0x5402b2(0x11b)==='tjhrg'?this[_0x5402b2(0x5e5)](Number(RegExp['$1']),Number(RegExp['$2'])):''[_0x5402b2(0x376)]()[_0x5402b2(0x19c)]();if(_0x5bccb4[_0x5402b2(0x240)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x3f3823=$gameMap[_0x5402b2(0x5d6)](Number(RegExp['$1']));return this['processMoveRouteTeleportToCharacter'](_0x3f3823);}if(_0x5bccb4['match'](/TELEPORT TO PLAYER/i))return this['processMoveRouteTeleportToCharacter']($gamePlayer);if(_0x5bccb4['match'](/TELEPORT TO HOME/i)&&this[_0x5402b2(0x21f)]){if(_0x5402b2(0x574)===_0x5402b2(0x5fa))_0x209cc4=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6];else{const _0x42e8c7=this[_0x5402b2(0x1aa)],_0x1dc7d8=this[_0x5402b2(0x590)];return this['processMoveRouteTeleportTo'](_0x42e8c7,_0x1dc7d8);}}try{if(_0x5402b2(0x205)!=='ncCiU'){if([0x2,0x4,0x6,0x8][_0x5402b2(0x572)](_0x54b704))return 0x0;if([0x1,0x3,0x7,0x9][_0x5402b2(0x572)](_0x49c0d4))return 0x1;}else VisuMZ['EventsMoveCore'][_0x5402b2(0x141)]['call'](this,_0x28fb8a);}catch(_0x43066d){if(_0x5402b2(0x3a3)===_0x5402b2(0x27e))this['_eventCache']=_0x39fbf8;else{if($gameTemp[_0x5402b2(0x201)]())console[_0x5402b2(0x27c)](_0x43066d);}}},Game_Character[_0x237a7a(0x2ed)]['processMoveRouteAnimation']=function(_0x15677c){const _0x425464=_0x237a7a;$gameTemp[_0x425464(0x2e1)]([this],_0x15677c);},Game_Character[_0x237a7a(0x2ed)]['processMoveRouteBalloon']=function(_0x93b92f){const _0x52ab94=_0x237a7a;let _0x242c3e=0x0;switch(_0x93b92f[_0x52ab94(0x376)]()['trim']()){case'!':case _0x52ab94(0x358):_0x242c3e=0x1;break;case'?':case _0x52ab94(0x4b0):_0x242c3e=0x2;break;case'MUSIC':case _0x52ab94(0x498):case _0x52ab94(0x1f9):case _0x52ab94(0x10d):case'MUSICNOTE':_0x242c3e=0x3;break;case _0x52ab94(0x4a1):case _0x52ab94(0x5e1):_0x242c3e=0x4;break;case _0x52ab94(0x5c8):_0x242c3e=0x5;break;case'SWEAT':_0x242c3e=0x6;break;case'COBWEB':case _0x52ab94(0x42c):case _0x52ab94(0x5a5):_0x242c3e=0x7;break;case _0x52ab94(0x13a):case _0x52ab94(0x465):_0x242c3e=0x8;break;case _0x52ab94(0xf4):case _0x52ab94(0x543):case _0x52ab94(0x56a):case _0x52ab94(0x384):case'LIGHTBULB':_0x242c3e=0x9;break;case'Z':case'ZZ':case'ZZZ':case _0x52ab94(0x471):_0x242c3e=0xa;break;case'USER-DEFINED\x201':_0x242c3e=0xb;break;case _0x52ab94(0x575):_0x242c3e=0xc;break;case _0x52ab94(0x168):_0x242c3e=0xd;break;case _0x52ab94(0x19a):_0x242c3e=0xe;break;case _0x52ab94(0x2cf):_0x242c3e=0xf;break;}$gameTemp[_0x52ab94(0x1e2)](this,_0x242c3e);},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x521)]=function(_0x180b9a){const _0x3c9d1e=_0x237a7a;_0x180b9a+=this[_0x3c9d1e(0x355)],this[_0x3c9d1e(0x455)](_0x180b9a[_0x3c9d1e(0x5e0)](0x0,0xff));if(this[_0x3c9d1e(0x355)]<0xff)this[_0x3c9d1e(0x10a)]--;},Game_Character['prototype'][_0x237a7a(0x318)]=function(_0x5fdc28){const _0x3bc343=_0x237a7a;_0x5fdc28=this['_opacity']-_0x5fdc28,this[_0x3bc343(0x455)](_0x5fdc28[_0x3bc343(0x5e0)](0x0,0xff));if(this[_0x3bc343(0x355)]>0x0)this['_moveRouteIndex']--;},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x5bc)]=function(_0x54d26b){const _0x5248f2=_0x237a7a,_0x39d732=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0xdc6dfc=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x422c41=this[_0x5248f2(0x511)](),_0x1a36c9=(_0x54d26b===_0x5248f2(0x4a9)?_0x39d732:_0xdc6dfc)[_0x422c41],_0x565a7b=(_0x54d26b==='left'?_0xdc6dfc:_0x39d732)[_0x422c41];if(this[_0x5248f2(0x295)](this['x'],this['y'],_0x1a36c9))_0x54d26b===_0x5248f2(0x4a9)?this[_0x5248f2(0x1b6)]():this['turnRight90']();else{if(!this[_0x5248f2(0x295)](this['x'],this['y'],this[_0x5248f2(0x511)]())){if(_0x5248f2(0x1f0)!==_0x5248f2(0x2c4)){if(this[_0x5248f2(0x295)](this['x'],this['y'],_0x565a7b)){if('XkqpU'===_0x5248f2(0x36e))_0x54d26b===_0x5248f2(0x4a9)?_0x5248f2(0x5fc)!=='skNtI'?(_0xa645a8[_0x5248f2(0x220)](_0x403d0a[_0x5248f2(0x32e)]),_0x471e6f['EventsMoveCore'][_0x5248f2(0x5a2)][_0x5248f2(0x275)](this),_0x381027[_0x5248f2(0x58a)](),_0x21f042[_0x5248f2(0x32e)]=_0x433ad6):this[_0x5248f2(0x1e0)]():'bnPId'===_0x5248f2(0x4b3)?this[_0x5248f2(0x1b6)]():(_0x738e8a['registerSelfTarget'](_0x23b693[_0x5248f2(0x237)]),_0x191662[_0x5248f2(0x1cc)][_0x5248f2(0x3e3)]['call'](this),_0x21bd01[_0x5248f2(0x58a)](),_0x3857b8[_0x5248f2(0x237)]=_0x225d7a);else{if(this[_0x5248f2(0x253)]===_0xeaaebf)this[_0x5248f2(0x16c)]();return this[_0x5248f2(0x253)][_0x5248f2(0x33c)]>0x0;}}else{if(_0x5248f2(0x147)==='dosDV'){_0x394cdd[_0x5248f2(0x1cc)][_0x5248f2(0x538)][_0x5248f2(0x275)](this,_0x268739);if(this[_0x5248f2(0x2c5)]===_0x36c20c)this[_0x5248f2(0x402)]();this[_0x5248f2(0x2c5)]=![];}else this[_0x5248f2(0x2a5)]();}}else{if(!_0x526332[_0x5248f2(0x1cc)]['Settings'][_0x5248f2(0x11d)][_0x5248f2(0x333)])return;for(const _0x7839a3 of this[_0x5248f2(0x1a7)]){this[_0x5248f2(0x181)](_0x7839a3);}}}}if(this[_0x5248f2(0x295)](this['x'],this['y'],this[_0x5248f2(0x511)]())){if(_0x5248f2(0x39a)!=='weAGo'){const _0x3559e0=_0x12062a(_0x2be896['$1'])['toUpperCase']()[_0x5248f2(0x19c)]();return this[_0x5248f2(0x1f6)](_0x3559e0);}else this['moveForward']();}},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x421)]=function(_0x3a7c75){const _0x1dd9b5=_0x237a7a;if(ImageManager['isBigCharacter'](this[_0x1dd9b5(0x47f)]))return;_0x3a7c75=_0x3a7c75[_0x1dd9b5(0x5e0)](0x0,0x7),this[_0x1dd9b5(0x59d)](this[_0x1dd9b5(0x47f)],_0x3a7c75);},Game_Character['prototype'][_0x237a7a(0x150)]=function(_0x597c27){const _0x2c8430=_0x237a7a;switch(this[_0x2c8430(0x511)]()){case 0x1:this[_0x2c8430(0x24f)](-_0x597c27,_0x597c27);break;case 0x2:this[_0x2c8430(0x24f)](0x0,_0x597c27);break;case 0x3:this[_0x2c8430(0x24f)](_0x597c27,_0x597c27);break;case 0x4:this[_0x2c8430(0x24f)](-_0x597c27,0x0);break;case 0x6:this[_0x2c8430(0x24f)](_0x597c27,0x0);break;case 0x7:this[_0x2c8430(0x24f)](-_0x597c27,-_0x597c27);break;case 0x8:this[_0x2c8430(0x24f)](0x0,-_0x597c27);break;case 0x9:this['jump'](_0x597c27,-_0x597c27);break;}},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x4c6)]=function(_0x3c6844,_0x12a794){const _0x5eca1d=_0x237a7a,_0x461b8e=Math[_0x5eca1d(0x5f6)](_0x3c6844-this['x']),_0x84ee52=Math[_0x5eca1d(0x5f6)](_0x12a794-this['y']);this[_0x5eca1d(0x24f)](_0x461b8e,_0x84ee52);},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x314)]=function(_0x15ba87){const _0x2bf044=_0x237a7a;if(_0x15ba87)this[_0x2bf044(0x4c6)](_0x15ba87['x'],_0x15ba87['y']);},Game_Character[_0x237a7a(0x2ed)]['processMoveRouteStepTo']=function(_0x14fa1a,_0x342247,_0x417af8){const _0x4bf4fc=_0x237a7a;let _0x75beb9=0x0;if(_0x417af8)$gameTemp[_0x4bf4fc(0x2f9)]=!![];$gameMap[_0x4bf4fc(0x5f9)]()?_0x4bf4fc(0x3c5)!=='dNckK'?_0x37c873[_0x4bf4fc(0x171)](_0x59f054[_0x4bf4fc(0x389)]):_0x75beb9=this[_0x4bf4fc(0x56b)](_0x14fa1a,_0x342247):_0x75beb9=this[_0x4bf4fc(0x1c9)](_0x14fa1a,_0x342247);if(_0x417af8)$gameTemp[_0x4bf4fc(0x2f9)]=![];this[_0x4bf4fc(0x156)](_0x75beb9),this[_0x4bf4fc(0x3c8)](!![]);},Game_Character['prototype']['processMoveRouteStepToCharacter']=function(_0x675075){const _0x566dee=_0x237a7a;if(_0x675075)this[_0x566dee(0x529)](_0x675075['x'],_0x675075['y']);},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x24c)]=function(_0x169ce0,_0x154477){const _0x37bd3d=_0x237a7a,_0xfd9c3f=this['deltaXFrom'](_0x169ce0),_0x77cfa4=this[_0x37bd3d(0x4f1)](_0x154477);},Game_Character['prototype'][_0x237a7a(0x61f)]=function(_0x31c59c){const _0x19aeb8=_0x237a7a;if(_0x31c59c[_0x19aeb8(0x240)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else{if(_0x31c59c[_0x19aeb8(0x240)](/(?:AVOID|EVADE|DODGE)/i))return _0x19aeb8(0x589)!==_0x19aeb8(0x632)?![]:this['processMoveRouteMoveRepeat'](0x8,_0x4e2120(_0x33c17a['$1']));else{if(_0x19aeb8(0x296)==='QtSlD'){_0x59f8e1['EventsMoveCore']['Game_Map_unlockEvent']['call'](this,_0x12eef9);if(_0x187a5c>=0x3e8){const _0x553da9=this[_0x19aeb8(0x5d6)](_0x5f5600);if(_0x553da9)_0x553da9[_0x19aeb8(0x1e8)]();}}else return![];}}},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x117)]=Game_Event[_0x237a7a(0x2ed)]['isCollidedWithPlayerCharacters'],Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x3da)]=function(_0x21b745,_0x1d5ff6){const _0x8a6ce0=_0x237a7a;if($gameTemp[_0x8a6ce0(0x2f9)])return![];return VisuMZ[_0x8a6ce0(0x1cc)]['Game_Event_isCollidedWithPlayerCharacters'][_0x8a6ce0(0x275)](this,_0x21b745,_0x1d5ff6);},Game_Character[_0x237a7a(0x2ed)]['processMoveRouteMoveUntilStop']=function(_0x4d09a6,_0x32e9b7){const _0x18d39c=_0x237a7a,_0x390240=['',_0x18d39c(0x34f),_0x18d39c(0x5b0),'LOWER\x20RIGHT',_0x18d39c(0x40b),'',_0x18d39c(0x405),_0x18d39c(0x28a),'UP',_0x18d39c(0x579)],_0x401b9f=_0x390240['indexOf'](_0x4d09a6['toUpperCase']()[_0x18d39c(0x19c)]());if(_0x401b9f<=0x0)return;if(_0x32e9b7)$gameTemp[_0x18d39c(0x2f9)]=!![];if(this['canPass'](this['x'],this['y'],_0x401b9f)){if(_0x18d39c(0x13f)===_0x18d39c(0x1bd)){if(!this[_0x18d39c(0x5d5)])return;if(this['_character'][_0x18d39c(0x115)]===_0x14cf74)return;if(this[_0x18d39c(0x5d5)][_0x18d39c(0x115)]===![])return;this['z']=this[_0x18d39c(0x5d5)][_0x18d39c(0x115)],this['z']<0x0?this['_shadowSprite']['z']=this['z']-0x1:this[_0x18d39c(0x537)]['z']=0x0;}else{if(_0x32e9b7)$gameTemp[_0x18d39c(0x2f9)]=![];this[_0x18d39c(0x156)](_0x401b9f),this[_0x18d39c(0x10a)]-=0x1;}}if(_0x32e9b7)$gameTemp[_0x18d39c(0x2f9)]=![];},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x3b1)]=function(_0x32288e,_0x2a80bd,_0x52eecf){const _0x59fddb=_0x237a7a;this[_0x59fddb(0x529)](_0x32288e,_0x2a80bd,_0x52eecf);if(this['x']!==_0x32288e||this['y']!==_0x2a80bd)this['_moveRouteIndex']--;},Game_Character['prototype'][_0x237a7a(0x4f2)]=function(_0x4208cf,_0x4f892e){const _0x49032d=_0x237a7a;if(_0x4208cf&&!_0x4208cf[_0x49032d(0x4af)]){if(_0x49032d(0x2b4)==='klRLf')return![];else{this[_0x49032d(0x3b1)](_0x4208cf['x'],_0x4208cf['y'],_0x4f892e);if(_0x4208cf[_0x49032d(0x48e)]()&&this[_0x49032d(0x48e)]()){const _0x2e0a42=$gameMap['distance'](this['x'],this['y'],_0x4208cf['x'],_0x4208cf['y']);if(_0x2e0a42<=0x1)this[_0x49032d(0x10a)]++;}}}},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x1dc)]=function(_0x39ad98,_0x2555ab){const _0x20b8af=_0x237a7a;_0x2555ab=_0x2555ab||0x0;const _0x49bdd2={'code':0x1,'indent':null,'parameters':[]};_0x49bdd2[_0x20b8af(0x571)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x39ad98],this['_moveRoute'][_0x20b8af(0x54b)][this[_0x20b8af(0x10a)]][_0x20b8af(0x5d1)][0x0]='';while(_0x2555ab--){this[_0x20b8af(0x27f)][_0x20b8af(0x54b)][_0x20b8af(0x411)](this[_0x20b8af(0x10a)]+0x1,0x0,_0x49bdd2);}},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x199)]=function(_0x566aa6){const _0x2a5dbc=_0x237a7a;this[_0x2a5dbc(0x208)]=!![],this[_0x2a5dbc(0x483)](_0x566aa6);},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x1bf)]=function(_0x1fe1a1,_0x2063f6){const _0x2a9cf0=_0x237a7a;if(this===$gamePlayer)return;const _0x5898ed=[this['_mapId'],this[_0x2a9cf0(0x5b7)],'A'];if(_0x1fe1a1[_0x2a9cf0(0x240)](/\b[ABCD]\b/i))_0x5898ed[0x2]=String(_0x1fe1a1)[_0x2a9cf0(0x510)](0x0)[_0x2a9cf0(0x376)]()[_0x2a9cf0(0x19c)]();else{if(_0x2a9cf0(0x372)!==_0x2a9cf0(0x372)){const _0x1cfc3f=this[_0x2a9cf0(0x250)](this[_0x2a9cf0(0x247)]);this[_0x2a9cf0(0x2d6)]=_0x1cfc3f[_0x2a9cf0(0x2d6)]+(_0x7e2bae['windowPadding']()+this[_0x2a9cf0(0x5f5)]())*0x2,this[_0x2a9cf0(0x2d0)]=_0x587db5[_0x2a9cf0(0xf1)](this['lineHeight'](),_0x1cfc3f['height'])+_0x2ca852[_0x2a9cf0(0x557)]()*0x2,this[_0x2a9cf0(0x5e9)]();}else _0x5898ed[0x2]=_0x2a9cf0(0xfb)[_0x2a9cf0(0x307)](_0x1fe1a1);}switch(_0x2063f6[_0x2a9cf0(0x376)]()[_0x2a9cf0(0x19c)]()){case'ON':case _0x2a9cf0(0x1b0):$gameSelfSwitches[_0x2a9cf0(0x4cf)](_0x5898ed,!![]);break;case'OFF':case _0x2a9cf0(0x3b0):$gameSelfSwitches['setValue'](_0x5898ed,![]);break;case _0x2a9cf0(0x26a):$gameSelfSwitches['setValue'](_0x5898ed,!$gameSelfSwitches[_0x2a9cf0(0x228)](_0x5898ed));break;}},Game_Character['prototype']['processMoveRouteSelfVariable']=function(_0x45a854,_0x441f39){const _0x30b665=_0x237a7a;if(this===$gamePlayer)return;const _0x1b57e1=[this[_0x30b665(0x4e7)],this[_0x30b665(0x5b7)],_0x30b665(0x43c)[_0x30b665(0x307)](_0x45a854)];$gameSelfSwitches[_0x30b665(0x4cf)](_0x1b57e1,Number(_0x441f39));},Game_Character[_0x237a7a(0x2ed)]['processMoveRouteTeleportTo']=function(_0x451da9,_0x734f2e){const _0x3d1bf3=_0x237a7a;this[_0x3d1bf3(0x43d)](_0x451da9,_0x734f2e);},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x17c)]=function(_0x503516){const _0x2cfa88=_0x237a7a;if(_0x503516)this[_0x2cfa88(0x5e5)](_0x503516['x'],_0x503516['y']);},Game_Character['prototype'][_0x237a7a(0x1e0)]=function(){const _0xab6dbf=_0x237a7a;switch(this[_0xab6dbf(0x511)]()){case 0x1:this[_0xab6dbf(0x310)](0x7);break;case 0x2:this[_0xab6dbf(0x310)](0x4);break;case 0x3:this['setDirection'](0x1);break;case 0x4:this[_0xab6dbf(0x310)](0x8);break;case 0x6:this[_0xab6dbf(0x310)](0x2);break;case 0x7:this[_0xab6dbf(0x310)](0x9);break;case 0x8:this[_0xab6dbf(0x310)](0x6);break;case 0x9:this[_0xab6dbf(0x310)](0x3);break;}},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x1b6)]=function(){const _0x2e6d32=_0x237a7a;switch(this[_0x2e6d32(0x511)]()){case 0x1:this[_0x2e6d32(0x310)](0x3);break;case 0x2:this[_0x2e6d32(0x310)](0x6);break;case 0x3:this[_0x2e6d32(0x310)](0x9);break;case 0x4:this[_0x2e6d32(0x310)](0x2);break;case 0x6:this[_0x2e6d32(0x310)](0x8);break;case 0x7:this[_0x2e6d32(0x310)](0x1);break;case 0x8:this['setDirection'](0x4);break;case 0x9:this[_0x2e6d32(0x310)](0x7);break;}},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x4db)]=function(_0x1e7561,_0x30f3ef,_0x1783f3){const _0x1a56c8=_0x237a7a,_0x535f20=this[_0x1a56c8(0x177)](_0x1e7561),_0x1f0f49=this[_0x1a56c8(0x4f1)](_0x30f3ef);if($gameMap[_0x1a56c8(0x5f9)]()){if(_0x1783f3||this[_0x1a56c8(0x100)]()){if(_0x535f20>0x0&&_0x1f0f49<0x0)return 0x1;if(_0x535f20<0x0&&_0x1f0f49<0x0)return 0x3;if(_0x535f20>0x0&&_0x1f0f49>0x0)return 0x7;if(_0x535f20<0x0&&_0x1f0f49>0x0)return 0x9;}}if(Math[_0x1a56c8(0x3e5)](_0x535f20)>Math['abs'](_0x1f0f49))return _0x535f20>0x0?0x4:0x6;else{if(_0x1f0f49!==0x0){if(_0x1a56c8(0x3f2)===_0x1a56c8(0x1e5))_0x176e12[_0x1a56c8(0x595)]();else return _0x1f0f49>0x0?0x8:0x2;}}return 0x0;},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x19d)]=function(_0x193704,_0xc554f9,_0xffd9c){const _0x3df026=_0x237a7a,_0x34630d=this[_0x3df026(0x177)](_0x193704),_0x118e40=this['deltaYFrom'](_0xc554f9);if($gameMap[_0x3df026(0x5f9)]()){if(_0xffd9c||this[_0x3df026(0x100)]()){if(_0x34630d>0x0&&_0x118e40<0x0)return 0x9;if(_0x34630d<0x0&&_0x118e40<0x0)return 0x7;if(_0x34630d>0x0&&_0x118e40>0x0)return 0x3;if(_0x34630d<0x0&&_0x118e40>0x0)return 0x1;}}if(Math[_0x3df026(0x3e5)](_0x34630d)>Math['abs'](_0x118e40)){if(_0x3df026(0x502)!==_0x3df026(0x3d8))return _0x34630d>0x0?0x6:0x4;else _0x5c55db[_0x3df026(0x4cf)](_0x5e75e6,!!_0x759000);}else{if(_0x118e40!==0x0)return _0x118e40>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x26c)]=function(_0x18a561,_0x16f7eb){const _0x2a65ec=_0x237a7a,_0x50d81b=this['getDirectionToPoint'](_0x18a561,_0x16f7eb,!![]);if(_0x50d81b)this[_0x2a65ec(0x156)](_0x50d81b);},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x458)]=function(_0x280a16,_0x2f7a0c){const _0x15898f=_0x237a7a,_0x5703ba=this[_0x15898f(0x19d)](_0x280a16,_0x2f7a0c,!![]);if(_0x5703ba)this['executeMoveDir8'](_0x5703ba);},Game_Character['prototype'][_0x237a7a(0x37c)]=function(_0x659920,_0x48aa34){const _0x890123=_0x237a7a,_0x4d9843=this['getDirectionToPoint'](_0x659920,_0x48aa34,![]);if(_0x4d9843)this[_0x890123(0x310)](_0x4d9843);},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x1ce)]=function(_0x3e52af,_0x490096){const _0x196851=_0x237a7a,_0x597a43=this[_0x196851(0x19d)](_0x3e52af,_0x490096,![]);if(_0x597a43)this[_0x196851(0x310)](_0x597a43);},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x3e0)]=function(_0x399ad3){const _0x4a49b2=_0x237a7a;if(_0x399ad3)this[_0x4a49b2(0x26c)](_0x399ad3['x'],_0x399ad3['y']);},Game_Character[_0x237a7a(0x2ed)][_0x237a7a(0x461)]=function(_0x304dc5){if(_0x304dc5)this['moveAwayFromPoint'](_0x304dc5['x'],_0x304dc5['y']);},Game_Character['prototype'][_0x237a7a(0x3ee)]=function(_0x427677){const _0x4c31e0=_0x237a7a;if(_0x427677)this[_0x4c31e0(0x37c)](_0x427677['x'],_0x427677['y']);},Game_Character['prototype'][_0x237a7a(0x435)]=function(_0x3d89e1){const _0x4c6ad8=_0x237a7a;if(_0x3d89e1)this[_0x4c6ad8(0x1ce)](_0x3d89e1['x'],_0x3d89e1['y']);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x58e)]=Game_Player['prototype'][_0x237a7a(0x213)],Game_Player[_0x237a7a(0x2ed)][_0x237a7a(0x213)]=function(){const _0x1ddad6=_0x237a7a;if(!Game_CharacterBase[_0x1ddad6(0x288)]&&this[_0x1ddad6(0x43e)]())return![];if(this[_0x1ddad6(0x52e)])return!![];return VisuMZ[_0x1ddad6(0x1cc)][_0x1ddad6(0x58e)][_0x1ddad6(0x275)](this);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x4c9)]=Game_Player[_0x237a7a(0x2ed)]['getInputDirection'],Game_Player[_0x237a7a(0x2ed)][_0x237a7a(0x3d6)]=function(){const _0x191e47=_0x237a7a;return $gameMap[_0x191e47(0x5f9)]()?this[_0x191e47(0x63f)]():VisuMZ[_0x191e47(0x1cc)][_0x191e47(0x4c9)][_0x191e47(0x275)](this);},Game_Player['prototype']['getInputDir8']=function(){return Input['dir8'];},Game_Player[_0x237a7a(0x2ed)]['moveByInput']=function(){const _0x5cc073=_0x237a7a;if($gameSystem[_0x5cc073(0x388)]())return 0x0;if(!this['isMoving']()&&this[_0x5cc073(0x5f4)]()){if('ouGfA'!==_0x5cc073(0x464)){let _0x41c818=this[_0x5cc073(0x3d6)]();if(_0x41c818>0x0)$gameTemp[_0x5cc073(0x595)]();else{if($gameTemp[_0x5cc073(0x607)]()){const _0x2d1491=$gameTemp[_0x5cc073(0x51f)](),_0x6468a6=$gameTemp[_0x5cc073(0x151)]();this[_0x5cc073(0x2fe)](_0x2d1491,_0x6468a6)?'HrCaH'!==_0x5cc073(0x1d8)?_0x41c818=this[_0x5cc073(0x56b)](_0x2d1491,_0x6468a6):(this[_0x5cc073(0x3c1)]=this[_0x5cc073(0x3c1)]||0x0,this[_0x5cc073(0x439)]()?this[_0x5cc073(0x310)](_0x10983e):this[_0x5cc073(0x218)](_0x1cee3a),this[_0x5cc073(0x3c1)]++):_0x41c818=this[_0x5cc073(0x1c9)](_0x2d1491,_0x6468a6);}}_0x41c818>0x0?(this[_0x5cc073(0x3c1)]=this[_0x5cc073(0x3c1)]||0x0,this[_0x5cc073(0x439)]()?this[_0x5cc073(0x310)](_0x41c818):_0x5cc073(0x2a4)!==_0x5cc073(0x3f1)?this[_0x5cc073(0x218)](_0x41c818):this[_0x5cc073(0x2a5)](),this['_inputTime']++):'xGEcT'!==_0x5cc073(0x57c)?this['_inputTime']=0x0:(_0x41a97c['x']=0x0,_0x32a8a2['y']=-this[_0x5cc073(0x2d0)]+this['height']*0x2/0x5,this[_0x5cc073(0x5d5)][_0x5cc073(0x2ff)]()!==0x1&&(_0x378824['y']+=0x1));}else this[_0x5cc073(0x52e)]=![];}},Game_Player[_0x237a7a(0x2ed)][_0x237a7a(0x439)]=function(){const _0x210c6d=_0x237a7a,_0x57e011=VisuMZ[_0x210c6d(0x1cc)][_0x210c6d(0x3e2)][_0x210c6d(0x11d)];if(!_0x57e011[_0x210c6d(0x451)])return![];if($gameTemp[_0x210c6d(0x607)]())return![];if(this[_0x210c6d(0x213)]()||this[_0x210c6d(0x4c1)]()||this[_0x210c6d(0x43e)]())return![];return this[_0x210c6d(0x3c1)]<_0x57e011[_0x210c6d(0x4b1)];},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x13e)]=Game_Player['prototype'][_0x237a7a(0x218)],Game_Player['prototype'][_0x237a7a(0x218)]=function(_0x1c3739){const _0x41bd59=_0x237a7a;$gameMap['isSupportDiagonalMovement']()?_0x41bd59(0x528)===_0x41bd59(0x2eb)?this[_0x41bd59(0x1bc)](_0x42b99e):this['executeMoveDir8'](_0x1c3739):VisuMZ[_0x41bd59(0x1cc)][_0x41bd59(0x13e)]['call'](this,_0x1c3739);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x4ba)]=Game_Player['prototype'][_0x237a7a(0x1af)],Game_Player[_0x237a7a(0x2ed)][_0x237a7a(0x1af)]=function(_0x4c10c7,_0x42cc73,_0x4509d7){const _0x2a0722=_0x237a7a;if($gameMap[_0x2a0722(0x230)](_0x4c10c7,_0x42cc73,_0x4509d7,'player')){if(_0x2a0722(0x313)==='GhqBb'){if(this['isInVehicle']()&&this[_0x2a0722(0x5c1)]()){if(_0x2a0722(0x3b5)!==_0x2a0722(0x179))return this['vehicle']()[_0x2a0722(0x1af)](_0x4c10c7,_0x42cc73,_0x4509d7);else{const _0x41d8a1=_0x478d57[_0x2a0722(0x25f)]('['+_0x4d6c0d['$1'][_0x2a0722(0x240)](/\d+/g)+']');this[_0x2a0722(0x253)]=this['_moveOnlyRegions'][_0x2a0722(0x166)](_0x41d8a1),this[_0x2a0722(0x253)][_0x2a0722(0x1d5)](0x0);}}else{if(_0x2a0722(0x3a4)!==_0x2a0722(0x3a4)){const _0x383c4e={'template':_0x2a0722(0x613),'mapId':0x1,'eventId':0xc,'x':_0x1bbd52['x']+0x1,'y':_0x520cc6['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x2a0722(0x14d)][_0x2a0722(0x33c)]+0x3e8};this[_0x2a0722(0x1fe)](_0x383c4e);}else return!![];}}else _0x4502f9[_0x2a0722(0x2ed)]['updateStop']['call'](this),this['_stopCount']>0x0&&(this[_0x2a0722(0x294)]=![]);}if($gameMap[_0x2a0722(0x1f8)](_0x4c10c7,_0x42cc73,_0x4509d7,_0x2a0722(0x42d)))return![];return VisuMZ[_0x2a0722(0x1cc)]['Game_Player_isMapPassable'][_0x2a0722(0x275)](this,_0x4c10c7,_0x42cc73,_0x4509d7);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x170)]=Game_Player[_0x237a7a(0x2ed)][_0x237a7a(0x584)],Game_Player[_0x237a7a(0x2ed)][_0x237a7a(0x584)]=function(_0x292411){const _0x36c0cf=_0x237a7a;VisuMZ[_0x36c0cf(0x1cc)]['Game_Player_checkEventTriggerHere'][_0x36c0cf(0x275)](this,_0x292411);if(this['canStartLocalEvents']()){this[_0x36c0cf(0x542)](_0x292411);if(_0x292411['includes'](0x0)&&this['startMapCommonEventOnOKTarget']()===_0x36c0cf(0x50f)){if(_0x36c0cf(0x234)!==_0x36c0cf(0x234))return this[_0x36c0cf(0x5e5)](_0x28d719(_0x1c0952['$1']),_0x392023(_0xa8fb01['$2']));else this['startMapCommonEventOnOK'](this['x'],this['y']);}else{if(_0x292411[_0x36c0cf(0x572)](0x1)||_0x292411[_0x36c0cf(0x572)](0x2)){if(_0x36c0cf(0x241)===_0x36c0cf(0x241))this[_0x36c0cf(0x1d1)]();else{if(_0x35e317[_0x36c0cf(0x2be)][_0x36c0cf(0x630)]===_0x461937)return![];return _0xb509f['SelfVariables'][_0x36c0cf(0x572)](_0x570629);}}}}},VisuMZ[_0x237a7a(0x1cc)]['Game_Player_checkEventTriggerThere']=Game_Player[_0x237a7a(0x2ed)][_0x237a7a(0x28e)],Game_Player['prototype'][_0x237a7a(0x28e)]=function(_0x2cf561){const _0x593cd2=_0x237a7a;VisuMZ[_0x593cd2(0x1cc)][_0x593cd2(0x532)]['call'](this,_0x2cf561);if(this[_0x593cd2(0x5e3)]()&&_0x2cf561[_0x593cd2(0x572)](0x0)&&this[_0x593cd2(0x357)]()==='front'){const _0x2b2552=this[_0x593cd2(0x511)](),_0xff25d=$gameMap[_0x593cd2(0x3b9)](this['x'],_0x2b2552),_0x78aa60=$gameMap[_0x593cd2(0x545)](this['y'],_0x2b2552);this['startMapCommonEventOnOK'](_0xff25d,_0x78aa60);}},Game_Player[_0x237a7a(0x2ed)][_0x237a7a(0x542)]=function(_0x33977d){const _0x518d97=_0x237a7a;if($gameMap['isEventRunning']())return;if($gameMap['isAnyEventStarting']())return;const _0x5df1c2=$gameMap[_0x518d97(0x10e)]();for(const _0x305be7 of _0x5df1c2){if(!_0x305be7)continue;if(!_0x305be7[_0x518d97(0x112)](_0x33977d))continue;if(this[_0x518d97(0x3f6)](_0x305be7))return _0x305be7[_0x518d97(0x3f3)]();if(this[_0x518d97(0x3c7)](_0x305be7))return _0x305be7[_0x518d97(0x3f3)]();}},Game_Player[_0x237a7a(0x2ed)][_0x237a7a(0x3f6)]=function(_0x515f53){const _0x365a5c=_0x237a7a;if($gameMap['isEventRunning']())return![];if($gameMap['isAnyEventStarting']())return![];return _0x515f53['activationRegionList']()[_0x365a5c(0x572)](this['regionId']());},Game_Player[_0x237a7a(0x2ed)]['meetActivationProximityConditions']=function(_0x4acd69){const _0x1a9252=_0x237a7a;if($gameMap[_0x1a9252(0x5c2)]())return![];if($gameMap[_0x1a9252(0xf3)]())return![];if([_0x1a9252(0x605),_0x1a9252(0x1a8)]['includes'](_0x4acd69['activationProximityType']()))return![];const _0x33a86c=_0x4acd69[_0x1a9252(0x547)](),_0x3da158=_0x4acd69['activationProximityDistance']();switch(_0x33a86c){case _0x1a9252(0x239):const _0xa0b89a=$gameMap[_0x1a9252(0x34c)](this['x'],this['y'],_0x4acd69['x'],_0x4acd69['y']);return _0x4acd69[_0x1a9252(0x491)]()>=_0xa0b89a;break;case _0x1a9252(0x46f):return _0x3da158>=Math[_0x1a9252(0x3e5)](_0x4acd69[_0x1a9252(0x177)](this['x']))&&_0x3da158>=Math[_0x1a9252(0x3e5)](_0x4acd69[_0x1a9252(0x4f1)](this['y']));break;case'row':return _0x3da158>=Math['abs'](_0x4acd69[_0x1a9252(0x4f1)](this['y']));break;case'column':return _0x3da158>=Math[_0x1a9252(0x3e5)](_0x4acd69['deltaXFrom'](this['x']));break;case'default':return![];break;}},Game_Player[_0x237a7a(0x2ed)][_0x237a7a(0x2b6)]=function(_0x331b51,_0x1b9d8e){const _0xac8362=_0x237a7a;if($gameMap[_0xac8362(0x5c2)]())return;if($gameMap[_0xac8362(0xf3)]())return;let _0x15d1dd=VisuMZ[_0xac8362(0x1cc)][_0xac8362(0x3e2)][_0xac8362(0x5a9)],_0x191837=$gameMap[_0xac8362(0x45a)](_0x331b51,_0x1b9d8e);const _0x4dae54=_0xac8362(0x2c3)[_0xac8362(0x307)](_0x191837);_0x15d1dd[_0x4dae54]&&$gameTemp[_0xac8362(0x493)](_0x15d1dd[_0x4dae54]);},Game_Player[_0x237a7a(0x2ed)][_0x237a7a(0x357)]=function(){const _0x483677=_0x237a7a;return VisuMZ['EventsMoveCore']['Settings'][_0x483677(0x4fc)];},Game_Player['prototype']['startMapCommonEventOnTouch']=function(){const _0x2cb151=_0x237a7a;if($gameMap['isEventRunning']())return;if($gameMap['isAnyEventStarting']())return;let _0x3a57a3=VisuMZ['EventsMoveCore']['Settings'][_0x2cb151(0x1d7)];const _0x5cb219='Region%1'[_0x2cb151(0x307)](this[_0x2cb151(0x45a)]());if(_0x3a57a3[_0x5cb219]){if(_0x2cb151(0x42f)===_0x2cb151(0x42f))$gameTemp['reserveCommonEvent'](_0x3a57a3[_0x5cb219]);else{const _0xaea075=_0x17e7f8(_0x7d43dc['$1']),_0x4e4bd1=_0x58ba1d(_0x239125['$2']);return this[_0x2cb151(0x529)](_0xaea075,_0x4e4bd1);}}},VisuMZ['EventsMoveCore']['Game_Player_increaseSteps']=Game_Player[_0x237a7a(0x2ed)][_0x237a7a(0x25e)],Game_Player['prototype'][_0x237a7a(0x25e)]=function(){const _0x27d110=_0x237a7a;VisuMZ[_0x27d110(0x1cc)][_0x27d110(0x534)][_0x27d110(0x275)](this),VisuMZ[_0x27d110(0x3b2)](0x0);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x106)]=Game_Follower[_0x237a7a(0x2ed)][_0x237a7a(0x2ac)],Game_Follower[_0x237a7a(0x2ed)]['initialize']=function(_0x13f598){const _0x20011b=_0x237a7a;VisuMZ['EventsMoveCore'][_0x20011b(0x106)][_0x20011b(0x275)](this,_0x13f598),this[_0x20011b(0x252)]=![];},Game_Follower['prototype'][_0x237a7a(0x213)]=function(){const _0xe83178=_0x237a7a;if(this[_0xe83178(0x252)])return Game_Character['prototype']['isDashing'][_0xe83178(0x275)](this);return $gamePlayer['isDashing']();},Game_Follower['prototype'][_0x237a7a(0x4a4)]=function(){const _0x424ef0=_0x237a7a;if(this[_0x424ef0(0x252)])return Game_Character['prototype'][_0x424ef0(0x4a4)]['call'](this);return $gamePlayer[_0x424ef0(0x4a4)]()&&this[_0x424ef0(0x294)];},Game_Follower['prototype'][_0x237a7a(0x14f)]=function(){const _0x3ceb64=_0x237a7a;return $gamePlayer[_0x3ceb64(0x14f)]();},Game_Follower[_0x237a7a(0x2ed)][_0x237a7a(0x645)]=function(){const _0x59a565=_0x237a7a;Game_Character['prototype'][_0x59a565(0x645)][_0x59a565(0x275)](this);if(this[_0x59a565(0x422)]>0x0){if(_0x59a565(0x556)===_0x59a565(0x556))this[_0x59a565(0x294)]=![];else{let _0x3ad659=_0x38359d[_0x59a565(0x1cc)][_0x59a565(0x54f)][_0x59a565(0x275)](this);return _0x3ad659=this[_0x59a565(0x31a)](_0x3ad659),_0x3ad659;}}},Game_Follower[_0x237a7a(0x2ed)][_0x237a7a(0x143)]=function(_0x398d9a){const _0x2fc790=_0x237a7a;this[_0x2fc790(0x252)]=_0x398d9a;},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x5f3)]=Game_Follower[_0x237a7a(0x2ed)]['chaseCharacter'],Game_Follower[_0x237a7a(0x2ed)][_0x237a7a(0x107)]=function(_0x4c2086){const _0x2b7574=_0x237a7a;if(this['_chaseOff'])return;if($gameSystem[_0x2b7574(0x4e4)]())return;VisuMZ[_0x2b7574(0x1cc)]['Game_Follower_chaseCharacter'][_0x2b7574(0x275)](this,_0x4c2086),this['_actuallyMoving']=!![];},VisuMZ[_0x237a7a(0x1cc)]['Game_Vehicle_isMapPassable']=Game_Vehicle[_0x237a7a(0x2ed)][_0x237a7a(0x1af)],Game_Vehicle[_0x237a7a(0x2ed)][_0x237a7a(0x1af)]=function(_0x3d266e,_0x1652aa,_0x58a526){const _0x4023cf=_0x237a7a;if($gameMap[_0x4023cf(0x230)](_0x3d266e,_0x1652aa,_0x58a526,this['_type']))return!![];if($gameMap[_0x4023cf(0x1f8)](_0x3d266e,_0x1652aa,_0x58a526,this['_type']))return![];return VisuMZ[_0x4023cf(0x1cc)]['Game_Vehicle_isMapPassable'][_0x4023cf(0x275)](this,_0x3d266e,_0x1652aa,_0x58a526);},Game_Vehicle[_0x237a7a(0x2ed)][_0x237a7a(0x10b)]=function(_0x3ec273,_0x298d7b,_0x1d06fa){const _0x5f3705=_0x237a7a;if($gameMap['isRegionAllowPass'](_0x3ec273,_0x298d7b,_0x1d06fa,this['_type']))return!![];if($gameMap[_0x5f3705(0x1f8)](_0x3ec273,_0x298d7b,_0x1d06fa,this[_0x5f3705(0x565)]))return![];return VisuMZ[_0x5f3705(0x1cc)][_0x5f3705(0x33b)][_0x5f3705(0x275)]($gamePlayer,_0x3ec273,_0x298d7b,_0x1d06fa);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x603)]=Game_Vehicle[_0x237a7a(0x2ed)][_0x237a7a(0x578)],Game_Vehicle[_0x237a7a(0x2ed)][_0x237a7a(0x578)]=function(_0x5f572e,_0x3ac4f7,_0x5403e4){const _0x1ba59e=_0x237a7a;if($gameMap['isRegionDockable'](_0x5f572e,_0x3ac4f7,_0x5403e4,this[_0x1ba59e(0x565)]))return!![];const _0x16048c=this[_0x1ba59e(0x565)]['charAt'](0x0)[_0x1ba59e(0x376)]()+this[_0x1ba59e(0x565)][_0x1ba59e(0x312)](0x1),_0x5a5f67=_0x1ba59e(0x5a8)['format'](_0x16048c);if(VisuMZ[_0x1ba59e(0x1cc)]['Settings'][_0x1ba59e(0x2d4)][_0x5a5f67])return![];else{if(_0x1ba59e(0xff)===_0x1ba59e(0x45f)){const _0x5115aa=_0x21ad75['GetMoveSynchTarget'](this['moveSynchTarget']());this['moveTowardCharacter'](_0x5115aa);}else return VisuMZ[_0x1ba59e(0x1cc)][_0x1ba59e(0x603)][_0x1ba59e(0x275)](this,_0x5f572e,_0x3ac4f7,_0x5403e4);}},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x49e)]=Game_Vehicle['prototype'][_0x237a7a(0x2a9)],Game_Vehicle[_0x237a7a(0x2ed)]['initMoveSpeed']=function(){const _0x20c61b=_0x237a7a;VisuMZ[_0x20c61b(0x1cc)][_0x20c61b(0x49e)]['call'](this);const _0x42c913=VisuMZ[_0x20c61b(0x1cc)][_0x20c61b(0x3e2)][_0x20c61b(0x11d)];if(this[_0x20c61b(0x518)]()){if('cGePa'!==_0x20c61b(0x118)){if(this[_0x20c61b(0x274)]===_0x2ae0aa)this[_0x20c61b(0x402)]();if(!_0x41a7d9)return null;if(_0x44a538===_0x3b92c1)return this[_0x20c61b(0x274)][_0x20c61b(0x5c9)];else{const _0x3691dc=_0x183086['EventsMoveCore'][_0x20c61b(0x3e2)],_0x3c9f0f=_0x20c61b(0x3ce)[_0x20c61b(0x307)](_0x9cf997[_0x20c61b(0x4e7)],_0x23d8b7[_0x20c61b(0x5b7)]);return this[_0x20c61b(0x274)][_0x3c9f0f]=this[_0x20c61b(0x274)][_0x3c9f0f]||{'iconIndex':0x0,'bufferX':_0x3691dc['Icon'][_0x20c61b(0x36a)],'bufferY':_0x3691dc[_0x20c61b(0x211)][_0x20c61b(0x279)],'blendMode':_0x3691dc[_0x20c61b(0x211)][_0x20c61b(0x285)]},this[_0x20c61b(0x274)][_0x3c9f0f];}}else{if(_0x42c913[_0x20c61b(0x2de)])this[_0x20c61b(0x610)](_0x42c913['BoatSpeed']);}}else{if(this[_0x20c61b(0x26b)]()){if(_0x42c913[_0x20c61b(0x2ad)])this[_0x20c61b(0x610)](_0x42c913[_0x20c61b(0x2ad)]);}else{if(this['isAirship']()){if(_0x42c913['AirshipSpeed'])this['setMoveSpeed'](_0x42c913[_0x20c61b(0x4e8)]);}}}},VisuMZ['EventsMoveCore'][_0x237a7a(0x1ec)]=Game_Event[_0x237a7a(0x2ed)]['initialize'],Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x2ac)]=function(_0x1ee4a4,_0x5cd3f8){const _0x789d83=_0x237a7a;VisuMZ[_0x789d83(0x1cc)][_0x789d83(0x1ec)][_0x789d83(0x275)](this,_0x1ee4a4,_0x5cd3f8),this['setupCopyEvent'](),this[_0x789d83(0x2d9)](),this[_0x789d83(0x492)]();},Game_Map[_0x237a7a(0x2ed)][_0x237a7a(0x484)]=function(_0x14b269,_0x56d801){const _0x632d5a=_0x237a7a;if(_0x14b269===$gameMap['mapId']()){if(_0x632d5a(0x1ac)!==_0x632d5a(0x55d))return $dataMap['events'][_0x56d801];else{const _0x514f3d=this[_0x632d5a(0x355)]+_0x9079ef[_0x632d5a(0x5f6)](_0x278869(_0xf3cdee['$1'])/0x64*0xff);return this[_0x632d5a(0x455)](_0x514f3d[_0x632d5a(0x5e0)](0x0,0xff));}}else return VisuMZ[_0x632d5a(0x3bf)][_0x14b269][_0x632d5a(0x10e)][_0x56d801];},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x2b2)]=Game_Event['prototype'][_0x237a7a(0x5d6)],Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x5d6)]=function(){const _0x2e529d=_0x237a7a;if(this[_0x2e529d(0x1cf)]!==undefined){if('raiyk'===_0x2e529d(0x573)){const _0x3e54f9=this['_eventMorphData'][_0x2e529d(0x438)],_0x6e06cc=this['_eventMorphData']['eventId'];return $gameMap[_0x2e529d(0x484)](_0x3e54f9,_0x6e06cc);}else{this[_0x2e529d(0x479)]=_0x3d0742;const _0x3e9997=new _0x583bea(0x0,0x0,_0xc260d3[_0x2e529d(0x125)]/0x4,this[_0x2e529d(0x60c)](0x1));this['initMembers'](),_0x7cc4e3[_0x2e529d(0x2ed)][_0x2e529d(0x2ac)][_0x2e529d(0x275)](this,_0x3e9997),this[_0x2e529d(0x27a)]=0x0,this['setBackgroundType'](0x2),this[_0x2e529d(0x247)]='';}}if(this[_0x2e529d(0x2b5)]!==undefined){if(_0x2e529d(0x495)!=='QzJKe'){_0x2c4393['ConvertParams'](_0x3ecec6,_0x59d09f);const _0x2009c3=_0x467637[_0x2e529d(0x1ba)](),_0x30efee={'mapId':_0x437767[_0x2e529d(0x3fb)],'eventId':_0x172a4c[_0x2e529d(0x173)]||_0x2009c3['eventId'](),'pageId':_0x68546e[_0x2e529d(0x63b)]};if(_0x30efee['mapId']<=0x0)_0x30efee[_0x2e529d(0x438)]=_0x441dfc?_0x16680f['mapId']():0x1;_0x345871[_0x2e529d(0x1ba)]()[_0x2e529d(0x3cb)](_0x30efee);}else{const _0x56a2b2=this['_eventCopyData']['mapId'],_0x78dbe1=this['_eventCopyData'][_0x2e529d(0x21f)];return $gameMap['referEvent'](_0x56a2b2,_0x78dbe1);}}if(this[_0x2e529d(0x460)]!==undefined){const _0x45f74d=this['_eventSpawnData'][_0x2e529d(0x438)],_0x278626=this['_eventSpawnData'][_0x2e529d(0x21f)];return $gameMap[_0x2e529d(0x484)](_0x45f74d,_0x278626);}if($gameTemp[_0x2e529d(0x4a7)]!==undefined){const _0x2c4aeb=$gameTemp[_0x2e529d(0x4a7)][_0x2e529d(0x438)],_0x33dd19=$gameTemp[_0x2e529d(0x4a7)][_0x2e529d(0x21f)];return $gameMap[_0x2e529d(0x484)](_0x2c4aeb,_0x33dd19);}return VisuMZ[_0x2e529d(0x1cc)]['Game_Event_event'][_0x2e529d(0x275)](this);},Game_Event[_0x237a7a(0x2ed)]['checkValidEventerMap']=function(_0x583d73,_0x55ae14){const _0x6aee34=_0x237a7a;if(_0x583d73===0x0||_0x55ae14===0x0)return![];if(_0x583d73===$gameMap[_0x6aee34(0x438)]())return!![];if(!VisuMZ[_0x6aee34(0x3bf)][_0x583d73]&&_0x583d73!==$gameMap[_0x6aee34(0x438)]()){if($gameTemp[_0x6aee34(0x201)]()){if(_0x6aee34(0x1ea)==='XCGNN'){if(_0x5b85da[_0x6aee34(0x230)](_0x5dc6bc,_0x59df7b,_0x216ddc,this[_0x6aee34(0x565)]))return!![];if(_0x10d1e2[_0x6aee34(0x1f8)](_0x27a1c0,_0x2011f3,_0x473820,this[_0x6aee34(0x565)]))return![];return _0x12e2b7[_0x6aee34(0x1cc)][_0x6aee34(0x33b)][_0x6aee34(0x275)](_0x23f1fc,_0x233ba6,_0x155988,_0x3d4765);}else console['log'](_0x6aee34(0x221)['format'](_0x583d73));}return![];}return!![];},VisuMZ['EventsMoveCore'][_0x237a7a(0x282)]=Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x3f3)],Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x3f3)]=function(){const _0x2e24e2=_0x237a7a;VisuMZ[_0x2e24e2(0x1cc)][_0x2e24e2(0x282)]['call'](this);if(Imported[_0x2e24e2(0x4e0)]&&Input[_0x2e24e2(0x631)](VisuMZ[_0x2e24e2(0x264)]['Settings'][_0x2e24e2(0x17b)][_0x2e24e2(0x149)])){if(_0x2e24e2(0x3e8)!==_0x2e24e2(0x3e8)){_0x480c27[_0x2e24e2(0x124)](_0x18835d,_0x11feb6);const _0xf120a5=_0x2027ff[_0x2e24e2(0x1ba)](),_0x444bb2={'template':_0x27d74f[_0x2e24e2(0x389)],'mapId':_0x322ecf['MapId']||_0x4da361[_0x2e24e2(0x438)](),'eventId':_0x2c1d95[_0x2e24e2(0x173)]||_0xf120a5[_0x2e24e2(0x21f)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x4c0bae['Preserve'],'spawnEventId':_0x519416[_0x2e24e2(0x14d)][_0x2e24e2(0x33c)]+0x3e8},_0x257e2c=_0xc79aca[_0x2e24e2(0x2e9)]||0x0;if(!_0x28ebdd['PreloadedMaps'][_0x444bb2[_0x2e24e2(0x438)]]&&_0x444bb2[_0x2e24e2(0x438)]!==_0xcc1797['mapId']()){let _0x5eb926=_0x2e24e2(0xf5)[_0x2e24e2(0x307)](_0x444bb2['mapId']);_0x5eb926+=_0x2e24e2(0x3dd),_0x5eb926+=_0x2e24e2(0x292),_0x5eb926+=_0x2e24e2(0x1ae),_0x5eb926+=_0x2e24e2(0x37b)[_0x2e24e2(0x307)](_0x444bb2['mapId']),_0x196532(_0x5eb926);return;}const _0x17c3a7=_0x3f0bc5[_0x2e24e2(0x2c1)](_0x444bb2,_0xfaad9c[_0x2e24e2(0x2d4)],_0x147e9d[_0x2e24e2(0x130)],_0x391a6c[_0x2e24e2(0x224)]);_0x257e2c&&_0x3fd401[_0x2e24e2(0x4cf)](_0x257e2c,!!_0x17c3a7);}else Input[_0x2e24e2(0x48a)]();}},Game_Event['prototype'][_0x237a7a(0x341)]=function(){const _0x3bb136=_0x237a7a,_0x2f4fea=this[_0x3bb136(0x5d6)]()[_0x3bb136(0x4a2)];if(_0x2f4fea==='')return;if(DataManager[_0x3bb136(0x4c0)]()||DataManager[_0x3bb136(0x48c)]())return;const _0xf46145=VisuMZ['EventsMoveCore'][_0x3bb136(0x3e2)]['Template'];let _0x363140=null,_0x5e4b5d=0x0,_0x273235=0x0;if(_0x2f4fea[_0x3bb136(0x240)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){if(_0x3bb136(0x1be)===_0x3bb136(0x1be)){_0x5e4b5d=Number(RegExp['$1']),_0x273235=Number(RegExp['$2']);if(_0x5e4b5d===0x0)_0x5e4b5d=$gameMap[_0x3bb136(0x438)]();}else this['moveForward']();}else{if(_0x2f4fea['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){_0x5e4b5d=Number(RegExp['$1']),_0x273235=Number(RegExp['$2']);if(_0x5e4b5d===0x0)_0x5e4b5d=$gameMap[_0x3bb136(0x438)]();}else{if(_0x2f4fea[_0x3bb136(0x240)](/<COPY EVENT:[ ](.*?)>/i)){const _0x48877b=String(RegExp['$1'])['toUpperCase']()[_0x3bb136(0x19c)]();_0x363140=VisuMZ[_0x3bb136(0x5e6)][_0x48877b];if(!_0x363140)return;_0x5e4b5d=_0x363140[_0x3bb136(0x209)],_0x273235=_0x363140[_0x3bb136(0x28b)];}}}if(!this['checkValidEventerMap'](_0x5e4b5d,_0x273235))return;_0xf46145[_0x3bb136(0x1ef)][_0x3bb136(0x275)](this,_0x5e4b5d,_0x273235,this);if(_0x363140)_0x363140[_0x3bb136(0x1ef)]['call'](this,_0x5e4b5d,_0x273235,this);this['_eventCopyData']={'mapId':_0x5e4b5d,'eventId':_0x273235},this[_0x3bb136(0x36c)]=-0x2,this[_0x3bb136(0x432)](),_0xf46145[_0x3bb136(0x1ab)][_0x3bb136(0x275)](this,_0x5e4b5d,_0x273235,this);if(_0x363140)_0x363140[_0x3bb136(0x1ab)][_0x3bb136(0x275)](this,_0x5e4b5d,_0x273235,this);$gameMap['clearEventCache']();},Game_Event['prototype'][_0x237a7a(0x2d9)]=function(){const _0x2389cb=_0x237a7a,_0x13eab7=$gameSystem[_0x2389cb(0x4ea)](this);if(!_0x13eab7)return;const _0x18e96d=_0x13eab7[_0x2389cb(0x5d2)][_0x2389cb(0x376)]()[_0x2389cb(0x19c)]();_0x18e96d!==_0x2389cb(0x337)?this['morphIntoTemplate'](_0x18e96d,!![]):this['morphInto'](_0x13eab7[_0x2389cb(0x438)],_0x13eab7[_0x2389cb(0x21f)],!![]);},Game_Event[_0x237a7a(0x2ed)]['morphInto']=function(_0x530e3e,_0x21a9f2,_0x504beb){const _0xebbefc=_0x237a7a;if(!this['checkValidEventerMap'](_0x530e3e,_0x21a9f2))return;const _0x99e1d=VisuMZ[_0xebbefc(0x1cc)][_0xebbefc(0x3e2)]['Template'];if(!_0x504beb)_0x99e1d['PreMorphJS'][_0xebbefc(0x275)](this,_0x530e3e,_0x21a9f2,this);this[_0xebbefc(0x1cf)]={'mapId':_0x530e3e,'eventId':_0x21a9f2},this[_0xebbefc(0x36c)]=-0x2,this[_0xebbefc(0x432)]();if(!_0x504beb)_0x99e1d['PostMorphJS']['call'](this,_0x530e3e,_0x21a9f2,this);$gameMap[_0xebbefc(0x3d2)]();},Game_Event['prototype'][_0x237a7a(0x171)]=function(_0x4140d1,_0x49b949){const _0x2b23da=_0x237a7a;_0x4140d1=_0x4140d1[_0x2b23da(0x376)]()[_0x2b23da(0x19c)]();const _0x7b5acb=VisuMZ['EventTemplates'][_0x4140d1];if(!_0x7b5acb)return;const _0x5ee597=_0x7b5acb['MapID'],_0x2e1fdb=_0x7b5acb[_0x2b23da(0x28b)];if(!this[_0x2b23da(0x407)](_0x5ee597,_0x2e1fdb))return;if(!_0x49b949)_0x7b5acb['PreMorphJS']['call'](this,_0x5ee597,_0x2e1fdb,this);this[_0x2b23da(0x367)](_0x5ee597,_0x2e1fdb,_0x49b949);if(!_0x49b949)_0x7b5acb[_0x2b23da(0x61e)][_0x2b23da(0x275)](this,_0x5ee597,_0x2e1fdb,this);if($gameMap)$gameMap[_0x2b23da(0x3d2)]();},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x12d)]=function(){const _0x263454=_0x237a7a;this['_eventMorphData']=undefined,this['_pageIndex']=-0x2,this[_0x263454(0x432)]();},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x3d3)]=function(_0x5bdf17){const _0x5a86ec=_0x237a7a,_0x1d4853=VisuMZ[_0x5a86ec(0x1cc)][_0x5a86ec(0x3e2)][_0x5a86ec(0x61c)],_0x915518=_0x5bdf17['template'][_0x5a86ec(0x376)]()[_0x5a86ec(0x19c)](),_0x3770cd=!['',_0x5a86ec(0x337)][_0x5a86ec(0x572)](_0x915518);let _0x20f26e=0x0,_0x49dbcc=0x0;if(_0x3770cd){if(_0x5a86ec(0x26e)==='wXIkC'){const _0x212c71=VisuMZ['EventTemplates'][_0x915518];if(!_0x212c71)return;_0x20f26e=_0x212c71['MapID'],_0x49dbcc=_0x212c71[_0x5a86ec(0x28b)];}else{if(_0x2d4bfa)_0xbb0502[_0x5a86ec(0x1c2)](_0x36dbe8);}}else _0x20f26e=_0x5bdf17[_0x5a86ec(0x438)],_0x49dbcc=_0x5bdf17[_0x5a86ec(0x21f)];if(!this['checkValidEventerMap'](_0x20f26e,_0x49dbcc))return;if(_0x3770cd){if(_0x5a86ec(0x457)==='HhnSq'){const _0x4946cf=_0x4a701e['EventsMoveCore'][_0x5a86ec(0x3e7)][_0x5a86ec(0x275)](this,_0x147e65);if(!_0x4946cf)return![];return this[_0x5a86ec(0x440)](_0x517e6a);}else{const _0x42a7b4=VisuMZ['EventTemplates'][_0x915518];_0x42a7b4[_0x5a86ec(0x4d6)][_0x5a86ec(0x275)](this,_0x20f26e,_0x49dbcc,this);}}_0x1d4853[_0x5a86ec(0x4d6)]['call'](this,_0x20f26e,_0x49dbcc,this),this[_0x5a86ec(0x460)]=_0x5bdf17,this[_0x5a86ec(0x36c)]=-0x2,this[_0x5a86ec(0x4e7)]=$gameMap['mapId'](),this['_eventId']=_0x5bdf17[_0x5a86ec(0x32c)],this['_spawnPreserved']=_0x5bdf17[_0x5a86ec(0x131)],this[_0x5a86ec(0x43d)](_0x5bdf17['x'],_0x5bdf17['y']),this[_0x5a86ec(0x310)](_0x5bdf17[_0x5a86ec(0x511)]),this[_0x5a86ec(0x432)]();if(_0x3770cd){const _0x26df09=VisuMZ[_0x5a86ec(0x5e6)][_0x915518];if(!_0x26df09)return;_0x26df09[_0x5a86ec(0x5b9)][_0x5a86ec(0x275)](this,_0x20f26e,_0x49dbcc,this);}_0x1d4853[_0x5a86ec(0x5b9)][_0x5a86ec(0x275)](this,_0x20f26e,_0x49dbcc,this);const _0x2e2b26=SceneManager[_0x5a86ec(0x2be)];if(_0x2e2b26&&_0x2e2b26['_spriteset'])_0x2e2b26[_0x5a86ec(0x3a2)][_0x5a86ec(0x2bf)](this);},Game_Event[_0x237a7a(0x2ed)]['isSpawnedEvent']=function(){const _0x124f35=_0x237a7a;return!!this[_0x124f35(0x460)];},Game_Event[_0x237a7a(0x2ed)]['start']=function(){const _0x293f73=_0x237a7a;if(!this[_0x293f73(0x54b)]())return;const _0xa34723=this[_0x293f73(0x54b)]()[_0x293f73(0x56c)](_0x98fbd6=>_0x98fbd6[_0x293f73(0x571)]!==0x6c&&_0x98fbd6[_0x293f73(0x571)]!==0x198);_0xa34723['length']>0x1&&(this[_0x293f73(0x485)]=!![],this['isTriggerIn']([0x0,0x1,0x2])&&this[_0x293f73(0x4e6)]());},VisuMZ['EventsMoveCore'][_0x237a7a(0x563)]=Game_Event['prototype'][_0x237a7a(0x1de)],Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x1de)]=function(){const _0x250e39=_0x237a7a;VisuMZ['EventsMoveCore'][_0x250e39(0x563)]['call'](this),this[_0x250e39(0x16c)](),this[_0x250e39(0x44a)]();},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x524)]=Game_Event[_0x237a7a(0x2ed)]['setupPageSettings'],Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x5a4)]=function(){const _0x17a406=_0x237a7a;this[_0x17a406(0x33d)]=!![],VisuMZ[_0x17a406(0x1cc)][_0x17a406(0x524)][_0x17a406(0x275)](this),this['setupEventsMoveCoreEffects'](),this['autosaveEventLocation'](),this[_0x17a406(0x33d)]=![];},Game_Event['prototype']['setupEventsMoveCoreEffects']=function(){const _0x26c832=_0x237a7a;if(!this[_0x26c832(0x5d6)]())return;this[_0x26c832(0x16c)](),this[_0x26c832(0x503)](),this['setupEventsMoveCoreCommentTags'](),this[_0x26c832(0x473)]();},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x503)]=function(){const _0x327472=_0x237a7a,_0x1d7b49=this[_0x327472(0x5d6)]()[_0x327472(0x4a2)];if(_0x1d7b49==='')return;this[_0x327472(0x227)](_0x1d7b49);},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x3e6)]=function(){const _0xf75226=_0x237a7a;if(!this[_0xf75226(0x2cc)]())return;const _0x1899cc=this['list']();let _0x35b1a7='';for(const _0x63c22a of _0x1899cc){if('fwuPM'!==_0xf75226(0x1a3)){if([0x6c,0x198][_0xf75226(0x572)](_0x63c22a[_0xf75226(0x571)])){if(_0x35b1a7!=='')_0x35b1a7+='\x0a';_0x35b1a7+=_0x63c22a['parameters'][0x0];}}else for(const _0x5dd18d of _0x5b8140[_0xf75226(0x10e)]()){_0x5dd18d[_0xf75226(0x432)](),_0x5dd18d['updateEventLabelText']();}}this[_0xf75226(0x227)](_0x35b1a7);},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x16c)]=function(){const _0x338863=_0x237a7a,_0x531100=VisuMZ[_0x338863(0x1cc)][_0x338863(0x3e2)];this['_activationProximity']={'type':'none','distance':0x0,'regionList':[]},this[_0x338863(0x214)]=![],this['clearAttachPictureSettings'](),this[_0x338863(0x44f)]=![],this['_customZ']=![],this['_addedHitbox']={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x338863(0x620)]=$gameSystem[_0x338863(0x212)](this),this[_0x338863(0x23b)]={'originalText':'','text':'','visibleRange':_0x531100[_0x338863(0x4a6)]['VisibleRange'],'offsetX':_0x531100[_0x338863(0x4a6)][_0x338863(0x592)],'offsetY':_0x531100['Label']['OffsetY']},this['_mirrorSprite']=![],this[_0x338863(0x253)]=[],this[_0x338863(0x536)]={'target':-0x1,'type':_0x338863(0x328),'delay':0x1,'opacityDelta':0x0},this[_0x338863(0x1b7)]=_0x531100[_0x338863(0x11d)][_0x338863(0x27d)]??0x0,this[_0x338863(0x415)]=![],this[_0x338863(0x3db)]={'visible':!![],'filename':_0x531100['Movement'][_0x338863(0x21b)]},this['clearSpriteOffsets'](),this[_0x338863(0x167)]();},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x227)]=function(_0x49ad85){const _0x5804ed=_0x237a7a;if(_0x49ad85[_0x5804ed(0x240)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))_0x5804ed(0x513)===_0x5804ed(0x513)?(this[_0x5804ed(0x4d8)][_0x5804ed(0x596)]=JSON[_0x5804ed(0x25f)]('['+RegExp['$1'][_0x5804ed(0x240)](/\d+/g)+']'),this[_0x5804ed(0x4d8)]['type']=_0x5804ed(0x1a8)):_0x1a39a9[_0x151a09]=_0xb81582[_0x39ae38]['slice'](0x0);else _0x49ad85['match'](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x5804ed(0x21a)]()[_0x5804ed(0x19c)](),this['_activationProximity'][_0x5804ed(0x272)]=type,this[_0x5804ed(0x4d8)][_0x5804ed(0x34c)]=Number(RegExp['$2']));_0x49ad85['match'](/<(?:ATTACH PICTURE|PICTURE) FILENAME:[ ](.*?)>/i)&&(this[_0x5804ed(0x40c)][_0x5804ed(0x343)]=String(RegExp['$1']));if(_0x49ad85[_0x5804ed(0x240)](/<(?:ATTACH PICTURE|PICTURE) BLEND MODE:[ ](.*?)>/i)){if(_0x5804ed(0x60b)===_0x5804ed(0x60b)){const _0x2348e4=String(RegExp['$1'])['toUpperCase']()[_0x5804ed(0x19c)](),_0x1afaf4=[_0x5804ed(0x30f),_0x5804ed(0x4df),_0x5804ed(0x395),_0x5804ed(0xfa)];this[_0x5804ed(0x40c)][_0x5804ed(0x562)]=_0x1afaf4['indexOf'](_0x2348e4)[_0x5804ed(0x5e0)](0x0,0x3);}else _0x5c0abe('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x4ea929,_0x56da11,_0x4ef736)),_0xa07aaa['exit']();}_0x49ad85['match'](/<(?:ATTACH PICTURE|PICTURE) (?:SIZE|MAX SIZE|MAX):[ ](\d+)>/i)&&(this['_attachPicture'][_0x5804ed(0x494)]=Number(RegExp['$1']));_0x49ad85[_0x5804ed(0x240)](/<(?:ATTACH PICTURE|PICTURE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(this['_attachPicture'][_0x5804ed(0x5c7)]=Number(RegExp['$1']));if(_0x49ad85[_0x5804ed(0x240)](/<(?:ATTACH PICTURE|PICTURE) OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x5804ed(0x2bd)!=='jpcJj')this['_attachPicture']['offsetY']=Number(RegExp['$1']);else return this[_0x5804ed(0x310)](0x9);}if(_0x49ad85[_0x5804ed(0x240)](/<(?:ATTACH PICTURE|PICTURE) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x5804ed(0x486)===_0x5804ed(0x380)){_0x12ddf6['EventsMoveCore']['Scene_Boot_onDatabaseLoaded'][_0x5804ed(0x275)](this),this['process_VisuMZ_EventsMoveCore_LoadTemplateMaps'](),this[_0x5804ed(0x300)]();if(_0x438c06['EventsMoveCore'][_0x5804ed(0x59c)])_0x40d197['EventsMoveCore'][_0x5804ed(0x59c)]['initialize']();}else this['_attachPicture'][_0x5804ed(0x5c7)]=Number(RegExp['$1']),this[_0x5804ed(0x40c)][_0x5804ed(0x2b7)]=Number(RegExp['$2']);}_0x49ad85['match'](/<(?:ATTACH PICTURE|PICTURE) SCALE:[ ](\d+)([%％])>/i)&&(this[_0x5804ed(0x40c)][_0x5804ed(0x30d)]=Number(RegExp['$1'])*0.01);_0x49ad85[_0x5804ed(0x240)](/<ALWAYS UPDATE MOVEMENT>/i)&&(_0x5804ed(0x476)!=='pKcYD'?this[_0x5804ed(0x214)]=!![]:(this[_0x5804ed(0x1cf)]=_0x370353,this[_0x5804ed(0x36c)]=-0x2,this[_0x5804ed(0x432)]()));_0x49ad85[_0x5804ed(0x240)](/<CLICK TRIGGER>/i)&&(this[_0x5804ed(0x44f)]=!![]);_0x49ad85[_0x5804ed(0x240)](/<CUSTOM Z:[ ](.*?)>/i)&&(this[_0x5804ed(0x115)]=Number(RegExp['$1'])||0x0);const _0x3b805b=_0x49ad85[_0x5804ed(0x240)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x3b805b){if(_0x5804ed(0x5be)===_0x5804ed(0x5be))for(const _0x56e97a of _0x3b805b){if(_0x56e97a[_0x5804ed(0x240)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x352643=String(RegExp['$1'])['toLowerCase']()['trim'](),_0x15b043=Number(RegExp['$2']);this[_0x5804ed(0x39c)][_0x352643]=_0x15b043;}}else{if(_0x1b4d91['_scene'][_0x5804ed(0x630)]===_0x59c57a)return![];return _0x3e3067[_0x5804ed(0x3bb)][_0x5804ed(0x572)](_0x1a9483);}}_0x49ad85[_0x5804ed(0x240)](/<ICON:[ ](\d+)>/i)&&(_0x5804ed(0x40e)!==_0x5804ed(0x40e)?(this[_0x5804ed(0x485)]=!![],this[_0x5804ed(0x112)]([0x0,0x1,0x2])&&this[_0x5804ed(0x4e6)]()):this[_0x5804ed(0x620)]['iconIndex']=Number(RegExp['$1']));_0x49ad85[_0x5804ed(0x240)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x5804ed(0x620)]['bufferX']=Number(RegExp['$1']));_0x49ad85[_0x5804ed(0x240)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon']['bufferY']=Number(RegExp['$1']));_0x49ad85['match'](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x5804ed(0x620)][_0x5804ed(0x4d3)]=Number(RegExp['$1']),this['_eventIcon']['bufferY']=Number(RegExp['$2']));if(_0x49ad85[_0x5804ed(0x240)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x17dfdf=String(RegExp['$1'])[_0x5804ed(0x376)]()[_0x5804ed(0x19c)](),_0x37c8e2=[_0x5804ed(0x30f),_0x5804ed(0x4df),_0x5804ed(0x395),_0x5804ed(0xfa)];this['_eventIcon'][_0x5804ed(0x562)]=_0x37c8e2[_0x5804ed(0x35e)](_0x17dfdf)[_0x5804ed(0x5e0)](0x0,0x3);}if(_0x49ad85[_0x5804ed(0x240)](/<LABEL:[ ](.*?)>/i)){let _0x79a9a0=String(RegExp['$1'])[_0x5804ed(0x19c)]();this[_0x5804ed(0x23b)][_0x5804ed(0x1e7)]=_0x79a9a0,this[_0x5804ed(0x23b)]['originalText']=_0x79a9a0;}if(_0x49ad85[_0x5804ed(0x240)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){let _0x1c0d02=String(RegExp['$1'])[_0x5804ed(0x19c)]();this[_0x5804ed(0x23b)][_0x5804ed(0x1e7)]=_0x1c0d02,this[_0x5804ed(0x23b)]['originalText']=_0x1c0d02;}_0x49ad85[_0x5804ed(0x240)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x5804ed(0x23b)]['offsetX']=Number(RegExp['$1']));_0x49ad85[_0x5804ed(0x240)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x5804ed(0x23b)][_0x5804ed(0x2b7)]=Number(RegExp['$1']));if(_0x49ad85[_0x5804ed(0x240)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x5804ed(0x443)!=='CmXXx')this['_labelWindow'][_0x5804ed(0x5c7)]=Number(RegExp['$1']),this['_labelWindow'][_0x5804ed(0x2b7)]=Number(RegExp['$2']);else while(this['isRunning']()){this['executeCommand']();}}this[_0x5804ed(0x5a7)]();_0x49ad85[_0x5804ed(0x240)](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x5804ed(0x23b)]['visibleRange']=Number(RegExp['$1']));_0x49ad85['match'](/<MIRROR SPRITE>/i)&&('WjUJl'!=='WjUJl'?_0x1134a8===_0x5804ed(0x4a9)?this[_0x5804ed(0x1e0)]():this[_0x5804ed(0x1b6)]():this[_0x5804ed(0x14a)]=!![]);if(_0x49ad85[_0x5804ed(0x240)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x3b76ca=JSON[_0x5804ed(0x25f)]('['+RegExp['$1']['match'](/\d+/g)+']');this[_0x5804ed(0x253)]=this[_0x5804ed(0x253)][_0x5804ed(0x166)](_0x3b76ca),this[_0x5804ed(0x253)][_0x5804ed(0x1d5)](0x0);}if(_0x49ad85['match'](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){if(_0x5804ed(0x520)!==_0x5804ed(0x520))this['bitmap']=new _0x1d87e7(_0x41d245[_0x5804ed(0x5f6)](_0x1973c0['boxWidth']/0x2),0x30),this[_0x5804ed(0x381)][_0x5804ed(0x5bf)]=this[_0x5804ed(0x5bf)](),this[_0x5804ed(0x381)][_0x5804ed(0x43b)]=this[_0x5804ed(0x43b)](),this[_0x5804ed(0x381)]['outlineColor']=_0x3f3c16[_0x5804ed(0x617)]();else{const _0x5653da=String(RegExp['$1']);if(_0x5653da[_0x5804ed(0x240)](/PLAYER/i))this[_0x5804ed(0x536)][_0x5804ed(0x192)]=0x0;else _0x5653da[_0x5804ed(0x240)](/EVENT[ ](\d+)/i)&&(this[_0x5804ed(0x536)][_0x5804ed(0x192)]=Number(RegExp['$1']));}}if(_0x49ad85[_0x5804ed(0x240)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)){if(_0x5804ed(0x20d)!==_0x5804ed(0x4c5))this[_0x5804ed(0x536)][_0x5804ed(0x272)]=String(RegExp['$1'])['toLowerCase']()[_0x5804ed(0x19c)]();else{const _0x201ea6=_0x2cc51d[_0x5804ed(0x344)](_0x5ecb70,_0x114ed4);for(const _0x49dfe7 of _0x201ea6){if(_0x49dfe7&&_0x49dfe7[_0x5804ed(0x488)]())return _0x49dfe7['onClickTrigger'](),!![];}return _0x23173f[_0x5804ed(0x32d)]()&&_0x201ea6['length']>0x0&&_0x181ddb[_0x5804ed(0x48a)](),![];}}if(_0x49ad85['match'](/<MOVE SYNCH DELAY:[ ](\d+)>/i)){if(_0x5804ed(0x4f9)!==_0x5804ed(0x4f9)){if(!this[_0x5804ed(0x5d5)])return;let _0xd687b7=!!this['_character'][_0x5804ed(0x14a)];this[_0x5804ed(0x30d)]['x']=_0x2fad7e[_0x5804ed(0x3e5)](this[_0x5804ed(0x30d)]['x'])*(_0xd687b7?-0x1:0x1);}else this['_moveSynch'][_0x5804ed(0x339)]=Number(RegExp['$1']);}_0x49ad85[_0x5804ed(0x240)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this[_0x5804ed(0x536)]['opacityDelta']=Number(RegExp['$1']));if(_0x49ad85[_0x5804ed(0x240)](/<TRUE RANDOM MOVE>/i))_0x5804ed(0x20c)===_0x5804ed(0x20c)?this[_0x5804ed(0x1b7)]=0x0:(_0x5e2ee6[_0x5804ed(0x1cc)][_0x5804ed(0x101)][_0x5804ed(0x275)](this),this[_0x5804ed(0x1a6)]());else{if(_0x49ad85[_0x5804ed(0x240)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)){if(_0x5804ed(0x4d4)!==_0x5804ed(0x116))this[_0x5804ed(0x1b7)]=Number(RegExp['$1'])||0x0;else{let _0x11a485=_0x5804ed(0xf5)[_0x5804ed(0x307)](_0x3efa38[_0x5804ed(0x438)]);_0x11a485+=_0x5804ed(0x3dd),_0x11a485+=_0x5804ed(0x292),_0x11a485+='Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a',_0x11a485+=_0x5804ed(0x37b)[_0x5804ed(0x307)](_0x139b91[_0x5804ed(0x438)]),_0x4ba76a(_0x11a485);return;}}}if(_0x49ad85[_0x5804ed(0x240)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if('JzWNf'==='kXOOi'){if(this[_0x5804ed(0x43e)]())return!![];if(this[_0x5804ed(0x630)]===_0x2eb15b&&this[_0x5804ed(0x586)]())return!![];return![];}else this[_0x5804ed(0x415)]=!![];}_0x49ad85['match'](/<HIDE SHADOW>/i)&&(this[_0x5804ed(0x3db)]['visible']=![]);_0x49ad85['match'](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this['_shadowGraphic']['filename']=String(RegExp['$1']));if(_0x49ad85[_0x5804ed(0x240)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)){if(_0x5804ed(0x1a4)!==_0x5804ed(0x3de))this[_0x5804ed(0x3c3)]=Number(RegExp['$1']);else{const _0xdfc943=_0x5804ed(0x37d)[_0x5804ed(0x307)](_0x27f0c0['charAt'](0x0)['toUpperCase']()+_0x2b03a9[_0x5804ed(0x312)](0x1));if(_0x270927[_0xdfc943])return _0x3e39f1[_0xdfc943][_0x5804ed(0x572)](_0x340f34);}}_0x49ad85[_0x5804ed(0x240)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x5804ed(0x466)]=Number(RegExp['$1']));if(_0x49ad85[_0x5804ed(0x240)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x5804ed(0x4d0)!=='SXnwW'){if(!this[_0x5804ed(0x58c)])return;this['resizeWindow'](),this[_0x5804ed(0x13b)]();}else this[_0x5804ed(0x3c3)]=Number(RegExp['$1']),this[_0x5804ed(0x466)]=Number(RegExp['$2']);}_0x49ad85[_0x5804ed(0x240)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x5804ed(0x3a1)]=String(RegExp['$1'])[_0x5804ed(0x376)]()[_0x5804ed(0x19c)]());},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x5a7)]=function(){const _0xc8f6bc=_0x237a7a;$gameTemp['registerSelfTarget'](this),this[_0xc8f6bc(0x23b)]['text']=this[_0xc8f6bc(0x23b)][_0xc8f6bc(0x477)];for(;;){if(this[_0xc8f6bc(0x23b)][_0xc8f6bc(0x1e7)][_0xc8f6bc(0x240)](/\\V\[(\d+)\]/gi)){if('mFUov'===_0xc8f6bc(0x403))for(const _0x37b1c0 of _0x1525e4){const _0x2d1998=_0xc8f6bc(0x3fa)[_0xc8f6bc(0x307)](_0x37b1c0,_0x1095e2);_0x182950[_0x2d1998]&&(_0x75d7e[_0x2d1998]=_0x256914[_0x2d1998][_0xc8f6bc(0x312)](0x0));}else this[_0xc8f6bc(0x23b)][_0xc8f6bc(0x1e7)]=this[_0xc8f6bc(0x23b)][_0xc8f6bc(0x477)][_0xc8f6bc(0x52a)](/\\V\[(\d+)\]/gi,(_0x14019a,_0x36c276)=>$gameVariables[_0xc8f6bc(0x228)](parseInt(_0x36c276)));}else break;}$gameTemp['clearSelfTarget']();},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x473)]=function(){const _0x1f1fc6=_0x237a7a;this[_0x1f1fc6(0x614)]();},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x33f)]=function(){const _0x18d393=_0x237a7a;if(this[_0x18d393(0x214)])return!![];return Game_Character[_0x18d393(0x2ed)][_0x18d393(0x33f)][_0x18d393(0x275)](this);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x3be)]=Game_Event['prototype']['updateSelfMovement'],Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x436)]=function(){const _0x456462=_0x237a7a;if(this[_0x456462(0x138)]())return;VisuMZ['EventsMoveCore']['Game_Event_updateSelfMovement'][_0x456462(0x275)](this),this[_0x456462(0x4c1)]()&&VisuMZ['MoveAllSynchTargets'](this[_0x456462(0x5b7)]);},Game_Event[_0x237a7a(0x2ed)]['isPreventSelfMovement']=function(){const _0x40e7fb=_0x237a7a,_0x488e71=VisuMZ['EventsMoveCore']['Settings']['Movement'];if($gameMap[_0x40e7fb(0x5c2)]()&&_0x488e71[_0x40e7fb(0x38a)])return!![];if($gameMessage[_0x40e7fb(0x187)]()&&_0x488e71['StopAutoMoveMessages'])return!![];if(!$gameSystem[_0x40e7fb(0x469)]())return!![];if(this[_0x40e7fb(0x61a)]()>=0x0)return!![];return![];},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x614)]=function(){const _0x39a761=_0x237a7a,_0x4e8a60=SceneManager[_0x39a761(0x2be)]['_spriteset'];if(_0x4e8a60){if(_0x39a761(0x5c0)!==_0x39a761(0x5c0)){const _0x10581b=_0x2dfcc8['getSelfTarget']()||this;if(_0x10581b[_0x39a761(0x630)]!==_0x54f673)return _0x1685d2[_0x39a761(0x1cc)]['Game_Variables_value']['call'](this,_0x2ef0ee);else{const _0x4afdd3=[_0x10581b['_mapId'],_0x10581b['_eventId'],'Self\x20Variable\x20%1'['format'](_0x22215f)];return _0x208263['value'](_0x4afdd3);}}else{const _0x1cfc8c=_0x4e8a60[_0x39a761(0x1f2)](this);_0x1cfc8c&&_0x1cfc8c['_shadowSprite']&&_0x1cfc8c[_0x39a761(0x537)][_0x39a761(0x321)]!==this[_0x39a761(0x258)]()&&(_0x1cfc8c[_0x39a761(0x537)][_0x39a761(0x321)]=this['shadowFilename'](),_0x1cfc8c[_0x39a761(0x537)][_0x39a761(0x381)]=ImageManager[_0x39a761(0x145)](_0x1cfc8c[_0x39a761(0x537)][_0x39a761(0x321)]));}}},Game_Event[_0x237a7a(0x2ed)]['shadowFilename']=function(){const _0x2b06ff=_0x237a7a;return this[_0x2b06ff(0x3db)][_0x2b06ff(0x343)];},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x23e)]=function(){const _0x492a91=_0x237a7a;if(!this[_0x492a91(0x3db)][_0x492a91(0x634)])return![];return Game_CharacterBase['prototype']['isShadowVisible']['call'](this);},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x2d2)]=function(){const _0x11d39c=_0x237a7a;return this['_labelWindow'][_0x11d39c(0x1e7)];},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x63d)]=function(){const _0x205a2b=_0x237a7a;return this[_0x205a2b(0x23b)][_0x205a2b(0x2a8)];},Game_Event['prototype'][_0x237a7a(0x1af)]=function(_0x3a53d5,_0x42fc73,_0x12d706){const _0x2a4394=_0x237a7a;if(this[_0x2a4394(0x4a5)]())return this[_0x2a4394(0x257)](_0x3a53d5,_0x42fc73,_0x12d706);if($gameMap[_0x2a4394(0x230)](_0x3a53d5,_0x42fc73,_0x12d706,_0x2a4394(0x5d6)))return!![];if($gameMap[_0x2a4394(0x1f8)](_0x3a53d5,_0x42fc73,_0x12d706,_0x2a4394(0x5d6)))return![];return Game_Character[_0x2a4394(0x2ed)][_0x2a4394(0x1af)][_0x2a4394(0x275)](this,_0x3a53d5,_0x42fc73,_0x12d706);},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x4a5)]=function(){const _0x731934=_0x237a7a;if(this[_0x731934(0x253)]===undefined)this[_0x731934(0x16c)]();return this['_moveOnlyRegions'][_0x731934(0x33c)]>0x0;},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x257)]=function(_0x372775,_0x30ce8e,_0x34c8db){const _0x56efac=_0x237a7a,_0x316c78=$gameMap['roundXWithDirection'](_0x372775,_0x34c8db),_0x535dc5=$gameMap[_0x56efac(0x545)](_0x30ce8e,_0x34c8db),_0x107563=$gameMap[_0x56efac(0x45a)](_0x316c78,_0x535dc5);return this['_moveOnlyRegions'][_0x56efac(0x572)](_0x107563);},VisuMZ['EventsMoveCore'][_0x237a7a(0x602)]=Game_Event['prototype'][_0x237a7a(0x644)],Game_Event['prototype'][_0x237a7a(0x644)]=function(){const _0x3ecdfe=_0x237a7a;if(this[_0x3ecdfe(0x5d6)]()&&!$gameTemp[_0x3ecdfe(0x201)]()){if('JGFWz'!=='dWjiO'){if(this[_0x3ecdfe(0x5d6)]()[_0x3ecdfe(0x4a2)]['match'](/<(?:PLAYTEST|PLAY TEST)>/i))return-0x1;}else this[_0x3ecdfe(0x429)][_0x3ecdfe(0x5d5)]['isSpriteVS8dir']()&&(this['x']+=_0x1e2369['EventsMoveCore']['Settings'][_0x3ecdfe(0x5d8)][_0x3ecdfe(0x470)],this['y']+=_0x5e32a5['EventsMoveCore'][_0x3ecdfe(0x3e2)]['VS8']['BalloonOffsetY']);}return this[_0x3ecdfe(0x2e2)]=![],this[_0x3ecdfe(0x505)]=![],this[_0x3ecdfe(0x5d6)]()?VisuMZ['EventsMoveCore']['Game_Event_findProperPageIndex'][_0x3ecdfe(0x275)](this):-0x1;},VisuMZ[_0x237a7a(0x1cc)]['Game_Event_meetsConditions']=Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x4dd)],Game_Event['prototype']['meetsConditions']=function(_0x30daf5){const _0x3a5df1=_0x237a7a;this[_0x3a5df1(0x5aa)](_0x30daf5),$gameTemp[_0x3a5df1(0x220)](this);const _0x220640=VisuMZ[_0x3a5df1(0x1cc)]['Game_Event_meetsConditions'][_0x3a5df1(0x275)](this,_0x30daf5);return $gameTemp[_0x3a5df1(0x58a)](),_0x220640;},Game_Event[_0x237a7a(0x2ed)]['hasAdvancedSwitchVariable']=function(){const _0x15af5d=_0x237a7a;return this[_0x15af5d(0x2e2)];},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x5aa)]=function(_0x473033){const _0x3593bf=_0x237a7a,_0x4d822e=_0x473033[_0x3593bf(0x1cd)];if(_0x4d822e['switch1Valid']&&DataManager[_0x3593bf(0x3e4)](_0x4d822e['switch1Id']))this[_0x3593bf(0x2e2)]=!![];else{if(_0x4d822e[_0x3593bf(0x5ee)]&&DataManager[_0x3593bf(0x3e4)](_0x4d822e[_0x3593bf(0x53a)]))this['_advancedSwitchVariable']=!![];else _0x4d822e[_0x3593bf(0x62d)]&&DataManager[_0x3593bf(0x63a)](_0x4d822e[_0x3593bf(0x39d)])&&(this[_0x3593bf(0x2e2)]=!![]);}},Game_Event['prototype'][_0x237a7a(0x488)]=function(){const _0x29dff3=_0x237a7a;if(this['_erased'])return![];return this[_0x29dff3(0x44f)];},Game_Event['prototype'][_0x237a7a(0x515)]=function(){const _0xcfa8b4=_0x237a7a;$gameTemp[_0xcfa8b4(0x595)](),this[_0xcfa8b4(0x3f3)]();},Game_Event['prototype'][_0x237a7a(0x16e)]=function(_0x30d2a8,_0x454ede){const _0x16620f=_0x237a7a;if(this[_0x16620f(0x39c)]){if(_0x16620f(0x236)!==_0x16620f(0x555))return this[_0x16620f(0x5ca)](_0x30d2a8,_0x454ede);else this[_0x16620f(0x620)][_0x16620f(0x4d3)]=_0x288f32(_0xaa69c2['$1']);}else return Game_Character['prototype'][_0x16620f(0x16e)][_0x16620f(0x275)](this,_0x30d2a8,_0x454ede);},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x5ca)]=function(_0x1a5fe3,_0x15a64d){const _0x525e24=_0x237a7a;var _0x2e8f9e=this['x']-this[_0x525e24(0x39c)][_0x525e24(0x4a9)],_0x397c3a=this['x']+this[_0x525e24(0x39c)][_0x525e24(0x3d7)],_0x32992a=this['y']-this[_0x525e24(0x39c)]['up'],_0x18791b=this['y']+this[_0x525e24(0x39c)][_0x525e24(0x16b)];return _0x2e8f9e<=_0x1a5fe3&&_0x1a5fe3<=_0x397c3a&&_0x32992a<=_0x15a64d&&_0x15a64d<=_0x18791b;},Game_Event['prototype'][_0x237a7a(0x295)]=function(_0x1a28a3,_0x3535ac,_0x5e3eb3){const _0x26eb27=_0x237a7a;for(let _0x116cbd=-this[_0x26eb27(0x39c)]['left'];_0x116cbd<=this['_addedHitbox'][_0x26eb27(0x3d7)];_0x116cbd++){for(let _0x2405d5=-this[_0x26eb27(0x39c)]['up'];_0x2405d5<=this[_0x26eb27(0x39c)][_0x26eb27(0x16b)];_0x2405d5++){if(!Game_Character['prototype']['canPass'][_0x26eb27(0x275)](this,_0x1a28a3+_0x116cbd,_0x3535ac+_0x2405d5,_0x5e3eb3))return![];}}return!![];},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x2d8)]=function(_0x2a74b5,_0x23591a){const _0x1c87ce=_0x237a7a;if(Imported[_0x1c87ce(0x135)]&&this[_0x1c87ce(0x5a3)]())return this['checkSmartEventCollision'](_0x2a74b5,_0x23591a);else{const _0x54ebfe=$gameMap['eventsXyNt'](_0x2a74b5,_0x23591a)[_0x1c87ce(0x56c)](_0x8bfec0=>_0x8bfec0!==this);return _0x54ebfe[_0x1c87ce(0x33c)]>0x0;}},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x1fc)]=function(_0x42ad4d,_0x3dbf6a){const _0x4ada03=_0x237a7a;if(!this[_0x4ada03(0x48e)]()){if(_0x4ada03(0x361)===_0x4ada03(0x361))return![];else{if(this['_expireCommonEvent']===_0x40a0d8)this[_0x4ada03(0x402)]();this[_0x4ada03(0x615)]?_0x29c1bd[_0x4ada03(0x493)](this[_0x4ada03(0x615)]):_0x2b8376[_0x4ada03(0x1cc)]['Game_Timer_onExpire'][_0x4ada03(0x275)](this);}}else{const _0x8c66b9=$gameMap[_0x4ada03(0x306)](_0x42ad4d,_0x3dbf6a)[_0x4ada03(0x56c)](_0x575b1b=>_0x575b1b!==this&&_0x575b1b[_0x4ada03(0x48e)]());return _0x8c66b9[_0x4ada03(0x33c)]>0x0;}},Game_Event[_0x237a7a(0x2ed)]['activationProximityType']=function(){const _0x263f0f=_0x237a7a;return this['_activationProximity'][_0x263f0f(0x272)]||'none';},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x491)]=function(){const _0x431472=_0x237a7a;return this[_0x431472(0x4d8)][_0x431472(0x34c)]||0x0;},Game_Event[_0x237a7a(0x2ed)]['activationRegionList']=function(){const _0x46ef13=_0x237a7a;return this[_0x46ef13(0x4d8)]['regionList']||[];},Game_Event[_0x237a7a(0x2ed)]['increaseSteps']=function(){const _0x4a3197=_0x237a7a;Game_Character[_0x4a3197(0x2ed)][_0x4a3197(0x25e)][_0x4a3197(0x275)](this);if([_0x4a3197(0x605),_0x4a3197(0x1a8)][_0x4a3197(0x572)](this['activationProximityType']()))return;$gamePlayer[_0x4a3197(0x542)]([0x2]);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x3ef)]=Game_Event[_0x237a7a(0x2ed)]['checkEventTriggerAuto'],Game_Event['prototype']['checkEventTriggerAuto']=function(){const _0x46b6ef=_0x237a7a;if(this[_0x46b6ef(0x5d3)]!==0x3)return;if(this[_0x46b6ef(0x33d)])return;if(!this[_0x46b6ef(0x446)](![]))return;if(!this[_0x46b6ef(0x606)](![]))return;VisuMZ[_0x46b6ef(0x1cc)][_0x46b6ef(0x3ef)][_0x46b6ef(0x275)](this);},VisuMZ[_0x237a7a(0x1cc)]['Game_Event_updateParallel']=Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x5ff)],Game_Event['prototype']['updateParallel']=function(){const _0x26c807=_0x237a7a;if(!this['_interpreter'])return;if(!this[_0x26c807(0x446)](!![]))return;if(!this[_0x26c807(0x606)](!![]))return;VisuMZ[_0x26c807(0x1cc)][_0x26c807(0x18a)]['call'](this);},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x446)]=function(_0x5809dd){const _0x26ad18=_0x237a7a;if(!_0x5809dd&&$gameMap[_0x26ad18(0x5c2)]())return![];if(!_0x5809dd&&$gameMap[_0x26ad18(0xf3)]())return![];if(this[_0x26ad18(0x50a)]()<=0x0)return!![];return $gamePlayer['meetActivationRegionConditions'](this);},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x606)]=function(_0x3bf665){const _0x24079f=_0x237a7a;if(!_0x3bf665&&$gameMap['isEventRunning']())return![];if(!_0x3bf665&&$gameMap[_0x24079f(0xf3)]())return![];if([_0x24079f(0x605),'region'][_0x24079f(0x572)](this['activationProximityType']()))return!![];return $gamePlayer[_0x24079f(0x3c7)](this);},VisuMZ[_0x237a7a(0x3b2)]=function(_0x119ba8){const _0x372821=_0x237a7a;for(const _0x32219d of $gameMap[_0x372821(0x10e)]()){if('dFdOY'!==_0x372821(0x568))this['_randomMoveWeight']=0x0;else{if(!_0x32219d)continue;_0x32219d[_0x372821(0x61a)]()===_0x119ba8&&(_0x372821(0x3e1)==='uPFUn'?_0x32219d[_0x372821(0x2b0)]():_0x6f67fa=[_0x58045d,_0xbfa226,_0x49bed6['toUpperCase']()[_0x372821(0x19c)]()]);}}},VisuMZ[_0x237a7a(0x4e1)]=function(_0x5dd7c5){const _0x56d8b0=_0x237a7a;if(_0x5dd7c5===0x0)return $gamePlayer;return $gameMap[_0x56d8b0(0x5d6)](_0x5dd7c5);},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x61a)]=function(){const _0x23052f=_0x237a7a;return this[_0x23052f(0x536)]['target'];},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x5cf)]=function(){const _0x38c814=_0x237a7a;return this[_0x38c814(0x536)][_0x38c814(0x272)];},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x14f)]=function(){const _0x2b1180=_0x237a7a;if(this[_0x2b1180(0x61a)]()>=0x0){const _0x27d797=VisuMZ['GetMoveSynchTarget'](this[_0x2b1180(0x61a)]());if(_0x27d797)return _0x27d797['realMoveSpeed']();}return Game_Character[_0x2b1180(0x2ed)][_0x2b1180(0x14f)][_0x2b1180(0x275)](this);},Game_Event[_0x237a7a(0x2ed)]['updateMoveSynch']=function(){const _0x9fcb4c=_0x237a7a;this['_moveSynch'][_0x9fcb4c(0x35c)]=this['_moveSynch'][_0x9fcb4c(0x35c)]||0x0,this['_moveSynch'][_0x9fcb4c(0x35c)]--;if(this['_moveSynch']['timer']>0x0)return;this[_0x9fcb4c(0x536)]['timer']=this[_0x9fcb4c(0x536)][_0x9fcb4c(0x339)],this[_0x9fcb4c(0x302)]();},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x31a)]=function(_0x4f6e87){const _0x585a2d=_0x237a7a;if(this['moveSynchTarget']()>=0x0){const _0x3b36cd=VisuMZ[_0x585a2d(0x4e1)](this[_0x585a2d(0x61a)]());if(_0x3b36cd){const _0x529ec2=$gameMap[_0x585a2d(0x34c)](this[_0x585a2d(0x4f8)],this[_0x585a2d(0x377)],_0x3b36cd['_realX'],_0x3b36cd[_0x585a2d(0x377)])-0x1,_0x2a3ade=Math[_0x585a2d(0x128)]($gameMap['tileWidth'](),$gameMap['tileHeight']()),_0x23bbbb=this['_moveSynch'][_0x585a2d(0x1b1)]||0x0;_0x4f6e87-=Math[_0x585a2d(0xf1)](0x0,_0x529ec2)*_0x2a3ade*_0x23bbbb;}}return _0x4f6e87;},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x302)]=function(){const _0x1a8541=_0x237a7a;switch(this['moveSynchType']()){case _0x1a8541(0x328):this[_0x1a8541(0x533)]();break;case _0x1a8541(0x278):this[_0x1a8541(0x5f7)]();break;case _0x1a8541(0x139):this['processMoveSynchAway']();break;case _0x1a8541(0x291):this[_0x1a8541(0x2f4)]();break;case _0x1a8541(0x4e5):case'copy':this[_0x1a8541(0x188)]();break;case _0x1a8541(0x3bd):case _0x1a8541(0x1e6):this[_0x1a8541(0xf2)]();break;case _0x1a8541(0x442):case'horizontal\x20mirror':case'mirror\x20horz':case _0x1a8541(0x11e):this[_0x1a8541(0x49d)]();break;case _0x1a8541(0x232):case _0x1a8541(0x57a):case _0x1a8541(0x423):case _0x1a8541(0x4fe):this[_0x1a8541(0x197)]();break;default:this[_0x1a8541(0x533)]();break;}this[_0x1a8541(0x378)]();},Game_Event['prototype'][_0x237a7a(0x533)]=function(){const _0x6f3bbf=_0x237a7a,_0x5d7c65=[0x2,0x4,0x6,0x8];if($gameMap['isSupportDiagonalMovement']()){if(_0x6f3bbf(0x52c)!==_0x6f3bbf(0x52c))return this[_0x6f3bbf(0x22f)]();else _0x5d7c65['push'](0x1,0x3,0x7,0x9);}const _0x252e4d=[];for(const _0x2e08f5 of _0x5d7c65){if(_0x6f3bbf(0x1da)===_0x6f3bbf(0x419))this['updatePeriodicRefresh'](),_0x46a4b6['EventsMoveCore'][_0x6f3bbf(0x18b)][_0x6f3bbf(0x275)](this,_0x1972a7);else{if(this[_0x6f3bbf(0x295)](this['x'],this['y'],_0x2e08f5))_0x252e4d[_0x6f3bbf(0x5a6)](_0x2e08f5);}}if(_0x252e4d[_0x6f3bbf(0x33c)]>0x0){const _0x35bdb2=_0x252e4d[Math[_0x6f3bbf(0x140)](_0x252e4d['length'])];this[_0x6f3bbf(0x156)](_0x35bdb2);}},Game_Event['prototype'][_0x237a7a(0x5f7)]=function(){const _0x5f04b9=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']());this['moveTowardCharacter'](_0x5f04b9);},Game_Event['prototype'][_0x237a7a(0x53c)]=function(){const _0x3f8bca=_0x237a7a,_0x2b3225=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']());this[_0x3f8bca(0x461)](_0x2b3225);},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x2f4)]=function(){const _0x2fa6d6=_0x237a7a;this[_0x2fa6d6(0x103)]();},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x188)]=function(){const _0x445603=_0x237a7a,_0x235e98=VisuMZ[_0x445603(0x4e1)](this['moveSynchTarget']());this[_0x445603(0x156)](_0x235e98[_0x445603(0x19f)]());},Game_Event['prototype'][_0x237a7a(0xf2)]=function(){const _0x75a317=_0x237a7a,_0x245fc5=VisuMZ[_0x75a317(0x4e1)](this[_0x75a317(0x61a)]());this[_0x75a317(0x156)](this[_0x75a317(0x475)](_0x245fc5[_0x75a317(0x19f)]()));},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x49d)]=function(){const _0x17b2bf=_0x237a7a,_0x2b8d85=VisuMZ[_0x17b2bf(0x4e1)](this[_0x17b2bf(0x61a)]()),_0x4875fe=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x2b8d85[_0x17b2bf(0x19f)]()];this[_0x17b2bf(0x156)](_0x4875fe);},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x197)]=function(){const _0x523b42=_0x237a7a,_0x19cceb=VisuMZ[_0x523b42(0x4e1)](this['moveSynchTarget']()),_0x968245=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x19cceb[_0x523b42(0x19f)]()];this['executeMoveDir8'](_0x968245);},Game_Event[_0x237a7a(0x2ed)]['restoreSavedEventPosition']=function(){const _0x73a710=_0x237a7a,_0x5c1d87=$gameSystem[_0x73a710(0x2fc)](this);if(!_0x5c1d87)return;this[_0x73a710(0x1fb)](_0x5c1d87['x'],_0x5c1d87['y']),this[_0x73a710(0x2b8)](),this[_0x73a710(0x310)](_0x5c1d87[_0x73a710(0x511)]),this[_0x73a710(0x36c)]===_0x5c1d87[_0x73a710(0x546)]&&(this[_0x73a710(0x10a)]=_0x5c1d87[_0x73a710(0x206)]);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0xf8)]=Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x378)],Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x378)]=function(){const _0x1814b0=_0x237a7a;VisuMZ[_0x1814b0(0x1cc)][_0x1814b0(0xf8)][_0x1814b0(0x275)](this),this[_0x1814b0(0x11f)]();},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x142)]=function(){const _0x59efd9=_0x237a7a;Game_Character[_0x59efd9(0x2ed)]['updateMove'][_0x59efd9(0x275)](this),this[_0x59efd9(0x44a)]();},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x57e)]=function(){const _0x21a082=_0x237a7a;if($gameMap['isSaveEventLocations']())return!![];return this[_0x21a082(0x415)];},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x44a)]=function(){const _0x8dff3f=_0x237a7a;if(!this[_0x8dff3f(0x57e)]())return;this[_0x8dff3f(0x3ca)]();},Game_Event[_0x237a7a(0x2ed)]['saveEventLocation']=function(){const _0x3534fd=_0x237a7a;this[_0x3534fd(0x4f3)]=!![];},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x11f)]=function(){const _0x24003a=_0x237a7a;this[_0x24003a(0x4f3)]&&(_0x24003a(0x63c)!=='WdDTo'?this[_0x24003a(0x14a)]=!![]:this[_0x24003a(0x121)]());},Game_Event['prototype'][_0x237a7a(0x121)]=function(){const _0x20129b=_0x237a7a;this[_0x20129b(0x4f3)]=![],$gameSystem['saveEventLocation'](this);},Game_Event['prototype']['deleteEventLocation']=function(){const _0x12a779=_0x237a7a;$gameSystem[_0x12a779(0x176)](this);},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x212)]=function(){const _0x4d4ffa=_0x237a7a;if($gameSystem[_0x4d4ffa(0x212)](this))return Game_Character[_0x4d4ffa(0x2ed)]['getEventIconData'][_0x4d4ffa(0x275)](this);else{if(_0x4d4ffa(0x109)!==_0x4d4ffa(0x647))return{'iconIndex':0x0,'bufferX':settings[_0x4d4ffa(0x211)]['BufferX'],'bufferY':settings[_0x4d4ffa(0x211)][_0x4d4ffa(0x279)],'blendMode':settings[_0x4d4ffa(0x211)][_0x4d4ffa(0x285)]};else{if(_0x4388e0)this['turnTowardPoint'](_0x4f13e7['x'],_0x3beff9['y']);}}},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x235)]=function(){return this['_CPCs'];},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x3e7)]=Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x4dd)],Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x4dd)]=function(_0x552a82){const _0x25c0dd=_0x237a7a,_0x2e053e=VisuMZ[_0x25c0dd(0x1cc)]['Game_Event_meetsConditionsCPC']['call'](this,_0x552a82);if(!_0x2e053e)return![];return this[_0x25c0dd(0x440)](_0x552a82);},Game_Event['prototype']['meetsCPC']=function(_0x2cf77d){const _0x394219=_0x237a7a;VisuMZ[_0x394219(0x1cc)]['CustomPageConditions'][_0x394219(0x152)](_0x2cf77d),this[_0x394219(0x505)]=_0x2cf77d[_0x394219(0x52b)][_0x394219(0x33c)]>0x0;_0x2cf77d[_0x394219(0x52b)]===undefined&&VisuMZ[_0x394219(0x1cc)]['CustomPageConditions']['loadCPC'](_0x2cf77d);if(_0x2cf77d[_0x394219(0x52b)]['length']>0x0)return _0x394219(0x560)==='UsHPg'?$gameMap[_0x394219(0x5d6)](this['_eventId'])&&VisuMZ[_0x394219(0x1cc)][_0x394219(0x59c)][_0x394219(0x47a)](_0x2cf77d['CPC'],this[_0x394219(0x5b7)]):this[_0x394219(0x30e)]||0x0;return!![];},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x34d)]=Game_Troop[_0x237a7a(0x2ed)][_0x237a7a(0x4dd)],Game_Troop[_0x237a7a(0x2ed)][_0x237a7a(0x4dd)]=function(_0x35f467){const _0x45ba88=_0x237a7a;var _0x1508e4=VisuMZ[_0x45ba88(0x1cc)][_0x45ba88(0x34d)][_0x45ba88(0x275)](this,_0x35f467);return _0x1508e4&&this['CPCsMet'](_0x35f467);},Game_Troop[_0x237a7a(0x2ed)][_0x237a7a(0x326)]=function(_0x1b2ba3){const _0x1e02d1=_0x237a7a;_0x1b2ba3['CPC']===undefined&&(_0x1e02d1(0x346)===_0x1e02d1(0x223)?this[_0x1e02d1(0x3f0)]-=this[_0x1e02d1(0x4ac)]():VisuMZ['EventsMoveCore'][_0x1e02d1(0x59c)][_0x1e02d1(0x152)](_0x1b2ba3));if(_0x1b2ba3['CPC'][_0x1e02d1(0x33c)]>0x0)return VisuMZ[_0x1e02d1(0x1cc)][_0x1e02d1(0x59c)][_0x1e02d1(0x47a)](_0x1b2ba3['CPC'],0x0);return!![];},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x3ea)]=Game_Event['prototype']['locate'],Game_Event[_0x237a7a(0x2ed)]['locate']=function(_0x4cf8a2,_0x4b55ba){const _0x1c1f3c=_0x237a7a;VisuMZ[_0x1c1f3c(0x1cc)]['Game_Event_locate']['call'](this,_0x4cf8a2,_0x4b55ba),this['_randomHomeX']=_0x4cf8a2,this[_0x1c1f3c(0x590)]=_0x4b55ba,this[_0x1c1f3c(0x44a)]();},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x46d)]=Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x5ad)],Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x5ad)]=function(){const _0x591ef2=_0x237a7a,_0x35bed7=$gameMap[_0x591ef2(0x34c)](this['x'],this['y'],this['_randomHomeX'],this[_0x591ef2(0x590)]),_0x399c48=_0x35bed7*(this['_randomMoveWeight']||0x0);if(Math[_0x591ef2(0x328)]()>=_0x399c48){if(_0x591ef2(0x44e)===_0x591ef2(0x527)){if(_0x513953!=='')_0x592b3b+='\x0a';_0x1a2501+=_0x3d784c[_0x591ef2(0x5d1)][0x0];}else VisuMZ['EventsMoveCore'][_0x591ef2(0x46d)]['call'](this);}else this['moveBackToRandomHome']();},Game_Event[_0x237a7a(0x2ed)][_0x237a7a(0x5ab)]=function(){const _0x56c7ef=_0x237a7a,_0x106a82=this[_0x56c7ef(0x177)](this['_randomHomeX']),_0x36b34c=this[_0x56c7ef(0x4f1)](this[_0x56c7ef(0x590)]);if(Math['abs'](_0x106a82)>Math['abs'](_0x36b34c)){if(_0x56c7ef(0x587)===_0x56c7ef(0x400))return this[_0x56c7ef(0x1ce)](_0x3952ba(_0x638642['$1']),_0x40343f(_0x3ea6d6['$2']));else this['moveStraight'](_0x106a82>0x0?0x4:0x6),!this[_0x56c7ef(0x28f)]()&&_0x36b34c!==0x0&&(_0x56c7ef(0x48b)!=='SMqlD'?this[_0x56c7ef(0x3b8)](_0x36b34c>0x0?0x8:0x2):(this[_0x56c7ef(0x4f3)]=![],_0x463f89[_0x56c7ef(0x3ca)](this)));}else _0x36b34c!==0x0&&(this[_0x56c7ef(0x3b8)](_0x36b34c>0x0?0x8:0x2),!this[_0x56c7ef(0x28f)]()&&_0x106a82!==0x0&&('VcAPT'!==_0x56c7ef(0x1c4)?this['moveStraight'](_0x106a82>0x0?0x4:0x6):(_0x14692b[_0x56c7ef(0x281)](),_0x5d4633[_0x56c7ef(0x1cc)]['Window_Message_startMessage']['call'](this),_0x346aac[_0x56c7ef(0x58a)]())));},Game_CharacterBase['prototype'][_0x237a7a(0x472)]=function(){const _0x5a3b03=_0x237a7a;this[_0x5a3b03(0x40c)]={'filename':'','blendMode':0x0,'maxSize':0x0,'offsetX':0x0,'offsetY':0x0,'scale':0x1};},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x637)]=function(){const _0x18819c=_0x237a7a;if(this[_0x18819c(0x40c)]===undefined)this[_0x18819c(0x472)]();return this[_0x18819c(0x40c)];},Game_CharacterBase['prototype'][_0x237a7a(0x1e4)]=function(){const _0x2463b6=_0x237a7a;return this[_0x2463b6(0x637)]()[_0x2463b6(0x343)]??'';},Game_CharacterBase[_0x237a7a(0x2ed)][_0x237a7a(0x226)]=function(){const _0x3b4c88=_0x237a7a;return this[_0x3b4c88(0x637)]()[_0x3b4c88(0x562)]??0x0;},Game_CharacterBase[_0x237a7a(0x2ed)]['attachPictureMaxSize']=function(){const _0x1ba95a=_0x237a7a;return this[_0x1ba95a(0x637)]()['maxSize']??0x0;},Game_CharacterBase[_0x237a7a(0x2ed)]['attachPictureOffsetX']=function(){const _0x2d1162=_0x237a7a;return this[_0x2d1162(0x637)]()[_0x2d1162(0x5c7)]??0x0;},Game_CharacterBase['prototype']['attachPictureOffsetY']=function(){const _0x14cef3=_0x237a7a;return this['attachPictureSettings']()[_0x14cef3(0x2b7)]??0x0;},Game_CharacterBase['prototype'][_0x237a7a(0x626)]=function(){const _0x4cb17e=_0x237a7a;return this[_0x4cb17e(0x637)]()[_0x4cb17e(0x30d)]??0x1;},VisuMZ[_0x237a7a(0x1cc)]['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x237a7a(0x2ed)][_0x237a7a(0x3e9)],Game_Interpreter['prototype']['updateWaitMode']=function(){const _0x26b94a=_0x237a7a;if(this[_0x26b94a(0x31d)]==='CallEvent'){if(window[this['_callEventMap']]){if('kXvEy'!=='ipLZp')this['_waitMode']='',this[_0x26b94a(0x277)]();else{this[_0x26b94a(0x5b3)]=_0x330eeb;const _0x5dc6b5=_0x26b94a(0x490)[_0x26b94a(0x307)](_0x53b1d1[_0x26b94a(0x438)]['padZero'](0x3));this['_callEventMap']=_0x26b94a(0x509)+_0x1d7d6a[_0x26b94a(0x256)]+'_'+this[_0x26b94a(0x21f)](),_0x1abe23[_0x26b94a(0x5cb)](this[_0x26b94a(0x2ca)],_0x5dc6b5),_0x245fcc[this[_0x26b94a(0x2ca)]]?this['startCallEvent']():this['setWaitMode'](_0x26b94a(0x621));}}else return!![];}else return VisuMZ[_0x26b94a(0x1cc)]['Game_Interpreter_updateWaitMode'][_0x26b94a(0x275)](this);},VisuMZ['EventsMoveCore'][_0x237a7a(0x43a)]=Game_Interpreter[_0x237a7a(0x2ed)]['executeCommand'],Game_Interpreter[_0x237a7a(0x2ed)]['executeCommand']=function(){const _0x359592=_0x237a7a,_0x51af70=$gameMap&&this['_eventId']?$gameMap[_0x359592(0x5d6)](this['_eventId']):null;$gameTemp[_0x359592(0x220)](_0x51af70);const _0x5746ad=VisuMZ['EventsMoveCore'][_0x359592(0x43a)][_0x359592(0x275)](this);return $gameTemp[_0x359592(0x58a)](),_0x5746ad;},VisuMZ[_0x237a7a(0x1cc)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x237a7a(0x2ed)][_0x237a7a(0x570)],Game_Interpreter[_0x237a7a(0x2ed)][_0x237a7a(0x570)]=function(_0x21c85f){const _0x271a21=_0x237a7a;return $gameTemp[_0x271a21(0x62b)](this),VisuMZ[_0x271a21(0x1cc)]['Game_Interpreter_PluginCommand'][_0x271a21(0x275)](this,_0x21c85f);},Game_Interpreter['prototype'][_0x237a7a(0x3cb)]=function(_0x84d602){const _0x4e5715=_0x237a7a;this[_0x4e5715(0x5b3)]=_0x84d602;const _0x242351=_0x4e5715(0x490)[_0x4e5715(0x307)](_0x84d602[_0x4e5715(0x438)][_0x4e5715(0x4d7)](0x3));this['_callEventMap']=_0x4e5715(0x509)+Graphics[_0x4e5715(0x256)]+'_'+this[_0x4e5715(0x21f)](),DataManager['loadDataFile'](this[_0x4e5715(0x2ca)],_0x242351);if(window[this[_0x4e5715(0x2ca)]]){if(_0x4e5715(0x24d)!==_0x4e5715(0x24d)){if(this[_0x4e5715(0x467)]===_0x412d9d)this['initEventsMoveCore']();if(this[_0x4e5715(0x467)][_0x4e5715(0x600)]===_0x3c482f)this['initEventsMoveCore']();this['_EventsMoveCoreSettings'][_0x4e5715(0x600)]=_0x724f8a;}else this[_0x4e5715(0x277)]();}else{if(_0x4e5715(0x5e2)!==_0x4e5715(0x5e2)){this[_0x4e5715(0x536)][_0x4e5715(0x35c)]=this['_moveSynch'][_0x4e5715(0x35c)]||0x0,this[_0x4e5715(0x536)][_0x4e5715(0x35c)]--;if(this[_0x4e5715(0x536)][_0x4e5715(0x35c)]>0x0)return;this[_0x4e5715(0x536)][_0x4e5715(0x35c)]=this[_0x4e5715(0x536)][_0x4e5715(0x339)],this['processMoveSynch']();}else this[_0x4e5715(0x2e4)](_0x4e5715(0x621));}},Game_Interpreter['prototype'][_0x237a7a(0x277)]=function(){const _0x2bc0eb=_0x237a7a,_0x225434=this[_0x2bc0eb(0x5b3)],_0x466bdd=window[this[_0x2bc0eb(0x2ca)]],_0x46c312=_0x466bdd[_0x2bc0eb(0x10e)][_0x225434[_0x2bc0eb(0x21f)]];if(_0x46c312&&_0x46c312[_0x2bc0eb(0x22b)][_0x225434[_0x2bc0eb(0x1d9)]-0x1]){const _0x522334=_0x46c312[_0x2bc0eb(0x22b)][_0x225434[_0x2bc0eb(0x1d9)]-0x1][_0x2bc0eb(0x54b)];this[_0x2bc0eb(0x3ae)](_0x522334,this[_0x2bc0eb(0x21f)]());}window[this['_callEventMap']]=undefined,this[_0x2bc0eb(0x2ca)]=undefined,this[_0x2bc0eb(0x5b3)]=undefined;};function Game_CPCInterpreter(){const _0x427d1b=_0x237a7a;this[_0x427d1b(0x2ac)][_0x427d1b(0x105)](this,arguments);};Game_CPCInterpreter[_0x237a7a(0x2ed)]=Object[_0x237a7a(0x3a0)](Game_Interpreter[_0x237a7a(0x2ed)]),Game_CPCInterpreter['prototype']['constructor']=Game_CPCInterpreter,Game_CPCInterpreter[_0x237a7a(0x2ed)][_0x237a7a(0x48a)]=function(){const _0x3eaae8=_0x237a7a;Game_Interpreter['prototype'][_0x3eaae8(0x48a)][_0x3eaae8(0x275)](this),this[_0x3eaae8(0x23f)]=![];},Game_CPCInterpreter[_0x237a7a(0x2ed)][_0x237a7a(0x2e8)]=function(){const _0x158a9f=_0x237a7a;while(this[_0x158a9f(0x5ec)]()){if('gsKGB'===_0x158a9f(0x4d1)){if(!this[_0x158a9f(0x5f1)])return;this[_0x158a9f(0x2dc)]=this['_periodicRefreshTimer']||0x3c,this[_0x158a9f(0x2dc)]--,this['_periodicRefreshTimer']<=0x0&&(this[_0x158a9f(0x427)](),this[_0x158a9f(0x2dc)]=0x3c);}else this['executeCommand']();}},Game_CPCInterpreter[_0x237a7a(0x2ed)][_0x237a7a(0x58d)]=function(_0x5494db){const _0xb857b9=_0x237a7a;while(this['isRunning']()){this[_0xb857b9(0x1bc)](_0x5494db);}},Game_CPCInterpreter[_0x237a7a(0x2ed)][_0x237a7a(0x1bc)]=function(_0x261f4d){const _0x5b342d=_0x237a7a,_0x2369d4=_0x261f4d;$gameTemp[_0x5b342d(0x220)](_0x2369d4);const _0x169e43=VisuMZ['EventsMoveCore']['Game_Interpreter_executeCommand'][_0x5b342d(0x275)](this);return $gameTemp['clearSelfTarget'](),_0x169e43;},Game_CPCInterpreter[_0x237a7a(0x2ed)][_0x237a7a(0x13d)]=function(_0x3b7146){const _0x4be47a=_0x237a7a;return Game_Interpreter['prototype'][_0x4be47a(0x13d)][_0x4be47a(0x275)](this,_0x3b7146),this[_0x4be47a(0x22a)][_0x4be47a(0x13c)](_0x437289=>_0x437289[_0x4be47a(0x240)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x4be47a(0x23f)]=!![]),!![];},VisuMZ['EventsMoveCore'][_0x237a7a(0x3a5)]=Scene_Map[_0x237a7a(0x2ed)][_0x237a7a(0x2da)],Scene_Map[_0x237a7a(0x2ed)][_0x237a7a(0x2da)]=function(){const _0x16216c=_0x237a7a;VisuMZ[_0x16216c(0x1cc)][_0x16216c(0x3a5)][_0x16216c(0x275)](this),this[_0x16216c(0x3a2)][_0x16216c(0x4cb)]();},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x356)]=Scene_Load[_0x237a7a(0x2ed)][_0x237a7a(0x5b8)],Scene_Load['prototype'][_0x237a7a(0x5b8)]=function(){const _0x31edb5=_0x237a7a;if($gameMap)$gameMap[_0x31edb5(0x3d2)]();VisuMZ[_0x31edb5(0x1cc)]['Scene_Load_onLoadSuccess'][_0x31edb5(0x275)](this);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x2ec)]=Sprite_Character[_0x237a7a(0x2ed)]['initMembers'],Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x1b8)]=function(){const _0x2696e6=_0x237a7a;VisuMZ[_0x2696e6(0x1cc)][_0x2696e6(0x2ec)][_0x2696e6(0x275)](this),this[_0x2696e6(0x194)](),this[_0x2696e6(0x4fd)](),this[_0x2696e6(0x2a3)]();},Sprite_Character[_0x237a7a(0x2ed)]['initMembersEventsMoveCore']=function(){const _0x469fda=_0x237a7a;this[_0x469fda(0x53f)]=0xff;},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x4fd)]=function(){const _0x69b54=_0x237a7a;this[_0x69b54(0x2f1)]=new Sprite(),this[_0x69b54(0x2f1)]['anchor']['x']=0.5,this[_0x69b54(0x2f1)][_0x69b54(0x52f)]['y']=0x1,this[_0x69b54(0x393)](this[_0x69b54(0x2f1)]),this['updateAttachPictureSprite']();},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x2a3)]=function(){const _0x1ccf80=_0x237a7a;this['_eventIconSprite']=new Sprite(),this[_0x1ccf80(0x15a)][_0x1ccf80(0x381)]=ImageManager[_0x1ccf80(0x145)](_0x1ccf80(0x308)),this['_eventIconSprite'][_0x1ccf80(0x381)][_0x1ccf80(0x4ae)]=![],this[_0x1ccf80(0x15a)]['setFrame'](0x0,0x0,0x0,0x0),this['_eventIconSprite']['anchor']['x']=0.5,this['_eventIconSprite'][_0x1ccf80(0x52f)]['y']=0x1,this[_0x1ccf80(0x393)](this[_0x1ccf80(0x15a)]);},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x100)]=function(){const _0x19f158=_0x237a7a;return this[_0x19f158(0x47f)]&&this[_0x19f158(0x47f)][_0x19f158(0x240)](/\[VS8\]/i);},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x1ee)]=function(){const _0x50117f=_0x237a7a;return this['isSpriteVS8dir']()&&VisuMZ[_0x50117f(0x1cc)][_0x50117f(0x3e2)]['VS8'][_0x50117f(0x4c2)];},VisuMZ['EventsMoveCore'][_0x237a7a(0x242)]=Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x378)],Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x378)]=function(){const _0x36db21=_0x237a7a;VisuMZ['EventsMoveCore'][_0x36db21(0x242)][_0x36db21(0x275)](this),this[_0x36db21(0x3fe)]();},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x56f)]=function(){const _0x3eefd8=_0x237a7a;Sprite[_0x3eefd8(0x2ed)]['updateVisibility']['call'](this);if(this[_0x3eefd8(0x552)]()){if('gaHAo'!==_0x3eefd8(0x525)){if(!_0x548f54['eventLabelsVisible']())return![];if(this['_event']?.[_0x3eefd8(0x4af)])return![];if(_0x14f19e[_0x3eefd8(0x2be)][_0x3eefd8(0x410)]>0x0)return![];const _0x119cd0=_0x1e80ae['x'],_0x3b9295=_0x320b85['y'],_0x686b50=this[_0x3eefd8(0x479)]['x'],_0x474430=this[_0x3eefd8(0x479)]['y'];if(this[_0x3eefd8(0x604)]===_0x119cd0&&this[_0x3eefd8(0x463)]===_0x3b9295&&this['_visibleEventX']===_0x686b50&&this[_0x3eefd8(0x5b4)]===_0x474430)return this[_0x3eefd8(0x3b3)];this[_0x3eefd8(0x604)]=_0x264a08['x'],this[_0x3eefd8(0x463)]=_0x40752b['y'],this[_0x3eefd8(0x12a)]=this[_0x3eefd8(0x479)]['x'],this[_0x3eefd8(0x5b4)]=this[_0x3eefd8(0x479)]['y'];if(_0x37384c[_0x3eefd8(0x382)](_0x119cd0,_0x3b9295,_0x686b50,_0x474430)>this['_event'][_0x3eefd8(0x63d)]())return this[_0x3eefd8(0x3b3)]=![],![];return this[_0x3eefd8(0x3b3)]=!![],!![];}else this[_0x3eefd8(0x634)]=![];}},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x552)]=function(){const _0x2bb107=_0x237a7a;if(this[_0x2bb107(0x58f)]()>0x0)return![];if(this['_character']){if(_0x2bb107(0x10f)===_0x2bb107(0x10f)){if(this[_0x2bb107(0x5d5)][_0x2bb107(0x1e4)]()!=='')return![];}else{_0x39f7ba[_0x2bb107(0x124)](_0xa45f09,_0x5273f2);const _0x1f5c84=_0x37403e[_0x2bb107(0x353)];_0x2ccb04[_0x2bb107(0x4f7)](_0x1f5c84);}}return this[_0x2bb107(0x3df)]()||this['_character']&&this['_character'][_0x2bb107(0x5dd)]();},Sprite_Character['prototype'][_0x237a7a(0x3fe)]=function(){const _0xf82f28=_0x237a7a;this[_0xf82f28(0x303)](),this[_0xf82f28(0x544)](),this[_0xf82f28(0x287)](),this['updateEventCustomZ'](),this[_0xf82f28(0x5db)](),this[_0xf82f28(0x55a)]();},VisuMZ['EventsMoveCore'][_0x237a7a(0x3ec)]=Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x10c)],Sprite_Character[_0x237a7a(0x2ed)]['setTileBitmap']=function(){const _0x43d463=_0x237a7a;VisuMZ[_0x43d463(0x1cc)][_0x43d463(0x3ec)][_0x43d463(0x275)](this),this['bitmap']['addLoadListener'](this[_0x43d463(0x2e3)][_0x43d463(0x2f0)](this));},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x40d)]=Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x62a)],Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x62a)]=function(){const _0x2bc824=_0x237a7a;VisuMZ[_0x2bc824(0x1cc)]['Sprite_Character_setCharacterBitmap'][_0x2bc824(0x275)](this),this[_0x2bc824(0x381)][_0x2bc824(0x26d)](this[_0x2bc824(0x2e3)][_0x2bc824(0x2f0)](this));},Sprite_Character[_0x237a7a(0x2ed)]['updateBitmapSmoothing']=function(){const _0x5c8246=_0x237a7a;if(!this['bitmap'])return;this[_0x5c8246(0x381)][_0x5c8246(0x4ae)]=!!VisuMZ['EventsMoveCore'][_0x5c8246(0x3e2)]['Movement'][_0x5c8246(0x522)];},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x2ae)]=Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x59f)],Sprite_Character['prototype'][_0x237a7a(0x59f)]=function(){const _0x3cec1d=_0x237a7a;if(this[_0x3cec1d(0x100)]()){if(_0x3cec1d(0x17e)===_0x3cec1d(0x17e))return this[_0x3cec1d(0x4bc)]();else{if(this['_followerChaseOff']===_0x451327)this[_0x3cec1d(0x189)]();return this[_0x3cec1d(0x404)];}}else{if(_0x3cec1d(0x1f5)!==_0x3cec1d(0x61d))return this['characterPatternYBasic']();else{const _0x170453=_0x23358a[_0x3cec1d(0x5e6)][_0x348ed5];_0x170453&&(_0x36a34d[_0x3cec1d(0x438)]=_0x170453[_0x3cec1d(0x209)],_0x3bd913[_0x3cec1d(0x21f)]=_0x170453['EventID']);}}},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x4bc)]=function(){const _0x29794f=_0x237a7a,_0x1c743c=this[_0x29794f(0x5d5)][_0x29794f(0x511)]();let _0x4a64ff=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return this[_0x29794f(0x5d5)]['_mirrorSprite']&&(_0x4a64ff=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6]),(_0x4a64ff[_0x1c743c]-0x2)/0x2;},Sprite_Character['prototype'][_0x237a7a(0x41e)]=function(){const _0x2102f6=_0x237a7a;let _0x58b91f=this[_0x2102f6(0x5d5)][_0x2102f6(0x511)]();if(this[_0x2102f6(0x5d5)][_0x2102f6(0x14a)]){if(_0x58b91f===0x4)_0x58b91f=0x6;else _0x58b91f===0x6&&(_0x2102f6(0x392)==='TobyA'?(_0x261c8f[_0x2102f6(0x4ff)]&&this[_0x2102f6(0x41d)](_0x2915de,_0x57dafb['x']+0x2,_0x2cd832['y']),_0x32bcfb['x']+=_0x24b460[_0x2102f6(0x128)](this[_0x2102f6(0x15b)](),_0xe8881a[_0x2102f6(0x611)])+0x4):_0x58b91f=0x4);}return(_0x58b91f-0x2)/0x2;},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x303)]=function(){const _0x2869fc=_0x237a7a;if(!VisuMZ['EventsMoveCore']['Settings'][_0x2869fc(0x11d)][_0x2869fc(0x62c)])return;this['rotation']=0x0;if(this['isAllowCharacterTilt']()){if(_0x2869fc(0x3b7)===_0x2869fc(0x3b7)){const _0xe59e0c=VisuMZ[_0x2869fc(0x1cc)]['Settings'][_0x2869fc(0x11d)],_0x30119b=this[_0x2869fc(0x5d5)]['direction']();let _0x3cb8db=0x0;if([0x1,0x4,0x7][_0x2869fc(0x572)](_0x30119b))_0x3cb8db=_0xe59e0c[_0x2869fc(0x4cd)];if([0x3,0x6,0x9][_0x2869fc(0x572)](_0x30119b))_0x3cb8db=_0xe59e0c[_0x2869fc(0x60a)];[0x2,0x8][_0x2869fc(0x572)](_0x30119b)&&(_0x3cb8db=[-_0xe59e0c['TiltVert'],0x0,_0xe59e0c[_0x2869fc(0x29d)]][this['_character'][_0x2869fc(0x2ff)]()]);if(this[_0x2869fc(0x2d5)])_0x3cb8db*=-0x1;this[_0x2869fc(0x1c0)]=_0x3cb8db;}else return this[_0x2869fc(0x1dc)](0x3,_0x531688(_0x146226['$1']));}},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x580)]=function(){const _0x164da8=_0x237a7a;if(this['_dragonbones'])return![];return this[_0x164da8(0x5d5)]['isDashingAndMoving']()&&!this[_0x164da8(0x5d5)][_0x164da8(0x43e)]()&&!this['_character'][_0x164da8(0x261)]()&&this[_0x164da8(0x58f)]()===0x0;},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x544)]=function(){const _0x24bea3=_0x237a7a;if(!this[_0x24bea3(0x537)])return;this[_0x24bea3(0x537)]['x']=this[_0x24bea3(0x5d5)][_0x24bea3(0x309)](),this['_shadowSprite']['y']=this[_0x24bea3(0x5d5)]['shadowY'](),this['_shadowSprite'][_0x24bea3(0x3f0)]=this[_0x24bea3(0x3f0)],this[_0x24bea3(0x537)]['visible']=this[_0x24bea3(0x5d5)][_0x24bea3(0x23e)](),this['_shadowSprite']['_hidden']=this['_hidden'];if(!this[_0x24bea3(0x5d5)][_0x24bea3(0x5fd)]())this[_0x24bea3(0x537)][_0x24bea3(0x30d)]['x']=Math[_0x24bea3(0x128)](0x1,this[_0x24bea3(0x537)][_0x24bea3(0x30d)]['x']+0.1),this[_0x24bea3(0x537)][_0x24bea3(0x30d)]['y']=Math[_0x24bea3(0x128)](0x1,this['_shadowSprite'][_0x24bea3(0x30d)]['y']+0.1);else{if(_0x24bea3(0x2ab)!=='oLmqV')this[_0x24bea3(0x537)]['scale']['x']=Math[_0x24bea3(0xf1)](0x0,this[_0x24bea3(0x537)][_0x24bea3(0x30d)]['x']-0.1),this[_0x24bea3(0x537)][_0x24bea3(0x30d)]['y']=Math[_0x24bea3(0xf1)](0x0,this[_0x24bea3(0x537)][_0x24bea3(0x30d)]['y']-0.1);else return![];}},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x287)]=function(){const _0x3843c3=_0x237a7a;if(!this[_0x3843c3(0x15a)])return;const _0x276770=this['_eventIconSprite'],_0x10b0d0=this['getEventIconIndex']();if(_0x10b0d0<=0x0)return _0x276770['setFrame'](0x0,0x0,0x0,0x0);else{const _0x4af7ae=ImageManager['iconWidth'],_0x36e70c=ImageManager[_0x3843c3(0x396)],_0x2cf287=_0x10b0d0%0x10*_0x4af7ae,_0x48e2f7=Math[_0x3843c3(0x4bf)](_0x10b0d0/0x10)*_0x36e70c;_0x276770[_0x3843c3(0x4a0)](_0x2cf287,_0x48e2f7,_0x4af7ae,_0x36e70c),this[_0x3843c3(0x634)]=!![];}const _0x47548c=this[_0x3843c3(0x5d5)][_0x3843c3(0x212)]();this[_0x3843c3(0x1ee)]()?this['autoEventIconBuffer'](_0x276770):(_0x276770['x']=_0x47548c?_0x47548c[_0x3843c3(0x4d3)]:0x0,_0x276770['y']=_0x47548c?-this['height']+_0x47548c[_0x3843c3(0xfd)]:0x0),_0x276770['blendMode']=_0x47548c?_0x47548c[_0x3843c3(0x562)]:0x0,this[_0x3843c3(0x539)](_0x276770),this[_0x3843c3(0x393)](_0x276770),_0x276770[_0x3843c3(0x1c0)]=-this[_0x3843c3(0x1c0)];},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x3b6)]=function(){const _0x8074c5=_0x237a7a;if(!this['_character'])return;if(this['_character'][_0x8074c5(0x115)]===undefined)return;if(this[_0x8074c5(0x5d5)][_0x8074c5(0x115)]===![])return;this['z']=this[_0x8074c5(0x5d5)][_0x8074c5(0x115)];if(this['z']<0x0){if(_0x8074c5(0x39b)!==_0x8074c5(0x2aa))this[_0x8074c5(0x537)]['z']=this['z']-0x1;else{if(!_0x14e288[_0x8074c5(0x1cc)]['Settings'][_0x8074c5(0x11d)][_0x8074c5(0x62c)])return;this[_0x8074c5(0x1c0)]=0x0;if(this[_0x8074c5(0x580)]()){const _0x449653=_0x43dabc[_0x8074c5(0x1cc)][_0x8074c5(0x3e2)]['Movement'],_0x333d44=this[_0x8074c5(0x5d5)][_0x8074c5(0x511)]();let _0x416635=0x0;if([0x1,0x4,0x7]['includes'](_0x333d44))_0x416635=_0x449653[_0x8074c5(0x4cd)];if([0x3,0x6,0x9][_0x8074c5(0x572)](_0x333d44))_0x416635=_0x449653['TiltRight'];[0x2,0x8]['includes'](_0x333d44)&&(_0x416635=[-_0x449653[_0x8074c5(0x29d)],0x0,_0x449653[_0x8074c5(0x29d)]][this[_0x8074c5(0x5d5)][_0x8074c5(0x2ff)]()]);if(this['_reflection'])_0x416635*=-0x1;this[_0x8074c5(0x1c0)]=_0x416635;}}}else this[_0x8074c5(0x537)]['z']=0x0;},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x5db)]=function(){const _0x5a239f=_0x237a7a;if(!this[_0x5a239f(0x5d5)])return;let _0x6f1b2b=!!this[_0x5a239f(0x5d5)][_0x5a239f(0x14a)];this[_0x5a239f(0x30d)]['x']=Math[_0x5a239f(0x3e5)](this[_0x5a239f(0x30d)]['x'])*(_0x6f1b2b?-0x1:0x1);},Sprite_Character[_0x237a7a(0x2ed)]['autoEventIconBuffer']=function(_0x13d5c5){const _0x217ca6=_0x237a7a;_0x13d5c5['x']=0x0,_0x13d5c5['y']=-this[_0x217ca6(0x2d0)]+this[_0x217ca6(0x2d0)]*0x2/0x5,this[_0x217ca6(0x5d5)][_0x217ca6(0x2ff)]()!==0x1&&(_0x13d5c5['y']+=0x1);},Sprite_Character['prototype'][_0x237a7a(0x58f)]=function(){const _0x161d7d=_0x237a7a;if(!this[_0x161d7d(0x5d5)])return 0x0;if(this[_0x161d7d(0x5d5)][_0x161d7d(0x4af)])return 0x0;const _0x3b09c7=this[_0x161d7d(0x5d5)]['getEventIconData']();return _0x3b09c7?_0x3b09c7['iconIndex']||0x0:0x0;},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x55a)]=function(){const _0x16adc0=_0x237a7a;if(!this[_0x16adc0(0x2f1)])return;if(!this['_character'])return;this[_0x16adc0(0x1ca)](),this[_0x16adc0(0x46e)]();},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x1ca)]=function(){const _0xf02305=_0x237a7a;if(!this[_0xf02305(0x38d)]())return;const _0x1af592=this[_0xf02305(0x5d5)][_0xf02305(0x637)]();this['_lastAttachPictureFilename']=_0x1af592[_0xf02305(0x343)],this[_0xf02305(0x48d)]=_0x1af592[_0xf02305(0x494)],this[_0xf02305(0x37f)]=_0x1af592['scale'];if(_0x1af592[_0xf02305(0x343)]!==''){const _0x4fe7f5=ImageManager['loadPicture'](_0x1af592[_0xf02305(0x343)]);_0x4fe7f5[_0xf02305(0x26d)](this[_0xf02305(0x540)][_0xf02305(0x2f0)](this,_0x4fe7f5));}else _0xf02305(0x311)===_0xf02305(0x2c9)?this['autoEventIconBuffer'](_0x3df7d6):this[_0xf02305(0x2f1)][_0xf02305(0x381)]=new Bitmap(0x1,0x1);},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x46e)]=function(){const _0x553f60=_0x237a7a,_0x355142=this[_0x553f60(0x2f1)];_0x355142['x']=this[_0x553f60(0x5d5)][_0x553f60(0x517)](),_0x355142['y']=this[_0x553f60(0x5d5)][_0x553f60(0x19b)](),_0x355142[_0x553f60(0x562)]=this[_0x553f60(0x5d5)][_0x553f60(0x226)]();},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x38d)]=function(){const _0x4856d8=_0x237a7a,_0x1b5d8c=this[_0x4856d8(0x5d5)]['attachPictureSettings']();if(_0x1b5d8c){if(this[_0x4856d8(0x3c6)]!==_0x1b5d8c[_0x4856d8(0x343)])return!![];if(this['_lastAttachPictureMaxSize']!==_0x1b5d8c[_0x4856d8(0x494)])return!![];if(this['_lastAttachPictureScale']!==_0x1b5d8c[_0x4856d8(0x30d)])return!![];}return![];},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x540)]=function(_0x5cdc59){const _0x1c24de=_0x237a7a,_0x5ec979=this[_0x1c24de(0x2f1)];_0x5ec979[_0x1c24de(0x381)]=_0x5cdc59;const _0x5f54dc=this[_0x1c24de(0x5d5)][_0x1c24de(0x637)](),_0x4d60e7=_0x5f54dc['maxSize'],_0x4248ae=_0x5f54dc[_0x1c24de(0x30d)];let _0x4c49e7=0x1;if(_0x4d60e7>0x0){if(_0x1c24de(0x297)!==_0x1c24de(0x297)){const _0x4525b2=_0x2950ee[_0x3a3460[_0x1c24de(0x140)](_0x52dc65[_0x1c24de(0x33c)])];this['executeMoveDir8'](_0x4525b2);}else{let _0x575e89=this[_0x1c24de(0x4cc)]()||0x1,_0x489c46=this[_0x1c24de(0x453)]()||0x1;const _0x3c529c=Math[_0x1c24de(0xf1)](0x1,_0x575e89,_0x489c46);_0x4c49e7=_0x4d60e7/_0x3c529c;}}_0x4c49e7*=_0x4248ae,_0x4c49e7!==0x1&&(this[_0x1c24de(0x2f1)][_0x1c24de(0x381)]['smooth']=!![]),_0x5ec979[_0x1c24de(0x30d)]['x']=_0x4c49e7,_0x5ec979[_0x1c24de(0x30d)]['y']=_0x4c49e7,this[_0x1c24de(0x634)]=!![],this[_0x1c24de(0x46e)]();},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x4cc)]=function(){const _0x2316bc=_0x237a7a,_0x540b66=this[_0x2316bc(0x2f1)];if(!_0x540b66)return 0x0;return _0x540b66[_0x2316bc(0x381)][_0x2316bc(0x2d6)];},Sprite_Character[_0x237a7a(0x2ed)][_0x237a7a(0x453)]=function(){const _0x148618=_0x237a7a,_0x33ea1b=this['_attachPictureSprite'];if(!_0x33ea1b)return 0x0;return _0x33ea1b[_0x148618(0x381)][_0x148618(0x2d0)];},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x3ad)]=Sprite_Balloon[_0x237a7a(0x2ed)]['setup'],Sprite_Balloon['prototype'][_0x237a7a(0x1b3)]=function(_0x3b29cd,_0x3906f4){const _0x1f9ae5=_0x237a7a;VisuMZ['EventsMoveCore'][_0x1f9ae5(0x3ad)][_0x1f9ae5(0x275)](this,_0x3b29cd,_0x3906f4),VisuMZ['EventsMoveCore'][_0x1f9ae5(0x3e2)][_0x1f9ae5(0x5d8)]['AutoBalloon']&&this[_0x1f9ae5(0x429)][_0x1f9ae5(0x5d5)]['setBalloonPose'](_0x3906f4,this[_0x1f9ae5(0x4d2)]);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x5da)]=Sprite_Balloon[_0x237a7a(0x2ed)]['updatePosition'],Sprite_Balloon['prototype']['updatePosition']=function(){const _0x3c5737=_0x237a7a;VisuMZ['EventsMoveCore'][_0x3c5737(0x5da)]['call'](this),this[_0x3c5737(0x55e)]();},Sprite_Balloon['prototype'][_0x237a7a(0x55e)]=function(){const _0x2b5123=_0x237a7a;this[_0x2b5123(0x429)]['_character'][_0x2b5123(0x100)]()&&(this['x']+=VisuMZ[_0x2b5123(0x1cc)][_0x2b5123(0x3e2)][_0x2b5123(0x5d8)][_0x2b5123(0x470)],this['y']+=VisuMZ['EventsMoveCore'][_0x2b5123(0x3e2)]['VS8'][_0x2b5123(0x462)]);},Sprite_Timer[_0x237a7a(0x2ed)][_0x237a7a(0x36b)]=function(){const _0x49fe1a=_0x237a7a;this[_0x49fe1a(0x381)]=new Bitmap(Math[_0x49fe1a(0x5f6)](Graphics[_0x49fe1a(0x125)]/0x2),0x30),this[_0x49fe1a(0x381)]['fontFace']=this[_0x49fe1a(0x5bf)](),this['bitmap'][_0x49fe1a(0x43b)]=this[_0x49fe1a(0x43b)](),this[_0x49fe1a(0x381)][_0x49fe1a(0x617)]=ColorManager[_0x49fe1a(0x617)]();},Sprite_Timer['prototype'][_0x237a7a(0x2c8)]=function(){const _0x2e9fc3=_0x237a7a,_0x158b25=Math[_0x2e9fc3(0x4bf)](this['_seconds']/0x3c/0x3c),_0x349c18=Math['floor'](this[_0x2e9fc3(0x5c6)]/0x3c)%0x3c,_0x3bdda2=this[_0x2e9fc3(0x5c6)]%0x3c;let _0x549f57=_0x349c18[_0x2e9fc3(0x4d7)](0x2)+':'+_0x3bdda2[_0x2e9fc3(0x4d7)](0x2);if(_0x158b25>0x0)_0x549f57='%1:%2'[_0x2e9fc3(0x307)](_0x158b25,_0x549f57);return _0x549f57;};function Sprite_EventLabel(){const _0x21bdf4=_0x237a7a;this[_0x21bdf4(0x2ac)](...arguments);}Sprite_EventLabel[_0x237a7a(0x2ed)]=Object[_0x237a7a(0x3a0)](Sprite[_0x237a7a(0x2ed)]),Sprite_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x630)]=Sprite_EventLabel,Sprite_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x2ac)]=function(_0x177939){const _0x23dadd=_0x237a7a;this[_0x23dadd(0x479)]=_0x177939,Sprite[_0x23dadd(0x2ed)]['initialize'][_0x23dadd(0x275)](this),this[_0x23dadd(0x1b8)](),this[_0x23dadd(0x1e3)]();},Sprite_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x1b8)]=function(){this['anchor']['x']=0.5,this['anchor']['y']=0x1;},Sprite_EventLabel[_0x237a7a(0x2ed)]['createProxyWindow']=function(){const _0x2c3345=_0x237a7a,_0x12bb17=new Rectangle(0x0,0x0,0x1,0x1);this[_0x2c3345(0x58c)]=new Window_Base(_0x12bb17),this[_0x2c3345(0x58c)][_0x2c3345(0x623)]=0x0,this[_0x2c3345(0x3f0)]=this[_0x2c3345(0x24e)]()?0xff:0x0;},Sprite_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x378)]=function(){const _0x5f0901=_0x237a7a;Sprite[_0x5f0901(0x2ed)][_0x5f0901(0x378)][_0x5f0901(0x275)](this),this['updateText'](),this[_0x5f0901(0x625)](),this[_0x5f0901(0x354)](),this[_0x5f0901(0x608)]();},Sprite_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x159)]=function(){const _0x4d3318=_0x237a7a;if(this[_0x4d3318(0x479)][_0x4d3318(0x2d2)]()!==this['_text']){if(_0x4d3318(0x4d9)===_0x4d3318(0x4d9))this['_text']=this[_0x4d3318(0x479)]['labelWindowText'](),this['refresh']();else{let _0x2d3b0e=[0x0,0x0,_0x4d3318(0x102)[_0x4d3318(0x307)](_0x2f92fa,_0x3512d8)];_0x1fb67f[_0x4d3318(0x4cf)](_0x2d3b0e,_0x247384);}}},Sprite_EventLabel[_0x237a7a(0x2ed)]['refresh']=function(){const _0x4be29c=_0x237a7a;if(!this[_0x4be29c(0x58c)])return;this['resizeWindow'](),this['drawText']();},Sprite_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x4c7)]=function(){const _0x266170=_0x237a7a,_0x305f96=this[_0x266170(0x58c)][_0x266170(0x250)](this['_text']),_0x20f080=this[_0x266170(0x58c)][_0x266170(0x5f5)](),_0x108d38=_0x305f96[_0x266170(0x2d6)]+_0x20f080*0x2,_0x553672=_0x305f96[_0x266170(0x2d0)];this[_0x266170(0x58c)]['move'](0x0,0x0,_0x108d38,_0x553672),this[_0x266170(0x58c)][_0x266170(0x5e9)](),this[_0x266170(0x381)]=this[_0x266170(0x58c)]['contents'];},Sprite_EventLabel['prototype'][_0x237a7a(0x13b)]=function(){const _0x580f5c=_0x237a7a,_0x56e24b=this[_0x580f5c(0x58c)]['itemPadding']();this[_0x580f5c(0x58c)]['drawTextEx'](this[_0x580f5c(0x247)],_0x56e24b,0x0);},Sprite_EventLabel[_0x237a7a(0x2ed)]['updateScale']=function(){const _0x43aef2=_0x237a7a,_0x24b44d=VisuMZ[_0x43aef2(0x1cc)]['Settings'][_0x43aef2(0x4a6)][_0x43aef2(0x5ed)],_0x41c702=$gameSystem[_0x43aef2(0x195)]()||0x1;this['scale']['x']=this[_0x43aef2(0x30d)]['y']=_0x24b44d/_0x41c702;},Sprite_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x354)]=function(){const _0xc2863c=_0x237a7a;if(!SceneManager[_0xc2863c(0x2be)])return;if(!SceneManager['_scene'][_0xc2863c(0x3a2)])return;const _0x293dd6=SceneManager['_scene']['_spriteset']['findTargetSprite'](this[_0xc2863c(0x479)]);if(!_0x293dd6)return;this['x']=this[_0xc2863c(0x479)][_0xc2863c(0x4da)](),this['x']+=this[_0xc2863c(0x479)][_0xc2863c(0x23b)][_0xc2863c(0x5c7)],this['y']=this[_0xc2863c(0x479)][_0xc2863c(0x1ad)]()-_0x293dd6[_0xc2863c(0x2d0)],this['y']+=$gameSystem[_0xc2863c(0x557)]()*-0.5,this['y']+=this[_0xc2863c(0x479)][_0xc2863c(0x23b)][_0xc2863c(0x2b7)];},Sprite_EventLabel[_0x237a7a(0x2ed)]['updateOpacity']=function(){const _0x2dd94d=_0x237a7a;if(this[_0x2dd94d(0x24e)]()){if(_0x2dd94d(0x351)===_0x2dd94d(0x22e)){if(this[_0x2dd94d(0x261)]()&&this[_0x2dd94d(0x2fb)]()==='ZZZ')return!![];return _0x159bd4[_0x2dd94d(0x1cc)][_0x2dd94d(0x2c2)][_0x2dd94d(0x275)](this);}else this[_0x2dd94d(0x3f0)]+=this[_0x2dd94d(0x4ac)]();}else{if(SceneManager[_0x2dd94d(0x2be)][_0x2dd94d(0x410)]>0x0){if('znWbP'===_0x2dd94d(0x4f4))this[_0x2dd94d(0x3f0)]=0x0;else{_0x383727[_0x2dd94d(0x2ed)]['update'][_0x2dd94d(0x275)](this);if(!this[_0x2dd94d(0x412)]())return;this[_0x2dd94d(0x159)](),this[_0x2dd94d(0x625)](),this[_0x2dd94d(0x354)](),this[_0x2dd94d(0x608)]();}}else this[_0x2dd94d(0x3f0)]-=this[_0x2dd94d(0x4ac)]();}},Sprite_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x24e)]=function(){const _0x223892=_0x237a7a;if(!$gameSystem['eventLabelsVisible']())return![];if(this['_event']?.[_0x223892(0x4af)])return![];if(this['_event']&&this[_0x223892(0x479)][_0x223892(0x36c)]<0x0)return![];if(SceneManager[_0x223892(0x2be)][_0x223892(0x410)]>0x0)return![];const _0x3c3f2f=$gamePlayer['x'],_0x44d4b1=$gamePlayer['y'],_0x2a6d64=this[_0x223892(0x479)]['x'],_0x55d501=this[_0x223892(0x479)]['y'];if(this[_0x223892(0x604)]===_0x3c3f2f&&this[_0x223892(0x463)]===_0x44d4b1&&this[_0x223892(0x12a)]===_0x2a6d64&&this[_0x223892(0x5b4)]===_0x55d501){if(_0x223892(0x482)!==_0x223892(0x329))return this['_cacheVisibility'];else{if(_0x14f75e)_0x31e0ea[_0x223892(0x3d2)]();_0x4832b7[_0x223892(0x1cc)][_0x223892(0x356)]['call'](this);}}this['_visiblePlayerX']=$gamePlayer['x'],this[_0x223892(0x463)]=$gamePlayer['y'],this['_visibleEventX']=this[_0x223892(0x479)]['x'],this[_0x223892(0x5b4)]=this[_0x223892(0x479)]['y'];if($gameMap['absDistance'](_0x3c3f2f,_0x44d4b1,_0x2a6d64,_0x55d501)>this['_event']['labelWindowRange']())return this[_0x223892(0x3b3)]=![],![];return this[_0x223892(0x3b3)]=!![],!![];},Sprite_EventLabel['prototype'][_0x237a7a(0x4ac)]=function(){const _0x29c489=_0x237a7a;return VisuMZ[_0x29c489(0x1cc)][_0x29c489(0x3e2)][_0x29c489(0x4a6)][_0x29c489(0x38c)];},VisuMZ['EventsMoveCore'][_0x237a7a(0x1b4)]=Spriteset_Map[_0x237a7a(0x2ed)]['createLowerLayer'],Spriteset_Map['prototype'][_0x237a7a(0x4ef)]=function(){const _0x59db02=_0x237a7a;VisuMZ[_0x59db02(0x1cc)]['Spriteset_Map_createLowerLayer'][_0x59db02(0x275)](this),this[_0x59db02(0x53b)]();},VisuMZ[_0x237a7a(0x1cc)]['Spriteset_Map_createShadow']=Spriteset_Map[_0x237a7a(0x2ed)][_0x237a7a(0x2df)],Spriteset_Map[_0x237a7a(0x2ed)][_0x237a7a(0x2df)]=function(){const _0x34d8ea=_0x237a7a;VisuMZ['EventsMoveCore'][_0x34d8ea(0x47e)][_0x34d8ea(0x275)](this),this['createShadows']();},Spriteset_Map[_0x237a7a(0x2ed)][_0x237a7a(0x1ed)]=function(){const _0x4308c3=_0x237a7a;if(!VisuMZ[_0x4308c3(0x1cc)]['Settings'][_0x4308c3(0x11d)]['ShowShadows'])return;for(const _0x114e0e of this[_0x4308c3(0x1a7)]){this[_0x4308c3(0x181)](_0x114e0e);}},Spriteset_Map[_0x237a7a(0x2ed)][_0x237a7a(0x181)]=function(_0x4e9a96){const _0xc546da=_0x237a7a;_0x4e9a96[_0xc546da(0x537)]=new Sprite(),_0x4e9a96[_0xc546da(0x537)][_0xc546da(0x321)]=_0x4e9a96[_0xc546da(0x5d5)][_0xc546da(0x258)](),_0x4e9a96[_0xc546da(0x537)]['bitmap']=ImageManager['loadSystem'](_0x4e9a96['_shadowSprite'][_0xc546da(0x321)]),_0x4e9a96[_0xc546da(0x537)][_0xc546da(0x52f)]['x']=0.5,_0x4e9a96[_0xc546da(0x537)][_0xc546da(0x52f)]['y']=0x1,_0x4e9a96[_0xc546da(0x537)]['z']=0x0,this[_0xc546da(0x217)]['addChild'](_0x4e9a96[_0xc546da(0x537)]);},Spriteset_Map[_0x237a7a(0x2ed)]['hideShadows']=function(){const _0x31117e=_0x237a7a;if(!VisuMZ[_0x31117e(0x1cc)][_0x31117e(0x3e2)][_0x31117e(0x11d)][_0x31117e(0x333)])return;for(const _0x2364fe of this[_0x31117e(0x1a7)]){this[_0x31117e(0x217)][_0x31117e(0x539)](_0x2364fe[_0x31117e(0x537)]);}},Spriteset_Map[_0x237a7a(0x2ed)]['createLabelWindows']=function(){const _0x5de82f=_0x237a7a;this[_0x5de82f(0x180)]=[];for(const _0x577764 of $gameMap[_0x5de82f(0x10e)]()){'Lubay'!==_0x5de82f(0x420)?this[_0x5de82f(0x345)](_0x577764):_0x488781['EventsMoveCore'][_0x5de82f(0x59c)][_0x5de82f(0x152)](_0x2cb9c0);}},Spriteset_Map['prototype'][_0x237a7a(0x345)]=function(_0x388135){const _0x31545b=_0x237a7a;if(!this['isTargetEventValidForLabelWindow'](_0x388135))return;let _0x168add;const _0x561510=VisuMZ[_0x31545b(0x1cc)]['Settings']['Label'][_0x31545b(0x15d)]??!![];_0x168add=_0x561510?new Sprite_EventLabel(_0x388135):new Window_EventLabel(_0x388135),_0x168add['z']=0x8,_0x168add[_0x31545b(0x399)]=Sprite[_0x31545b(0x413)]++,this[_0x31545b(0x217)][_0x31545b(0x393)](_0x168add),this[_0x31545b(0x180)][_0x31545b(0x5a6)](_0x168add);},Spriteset_Map['prototype'][_0x237a7a(0x324)]=function(_0x55a2dc){const _0x312642=_0x237a7a,_0x3d05c1=_0x55a2dc[_0x312642(0x5d6)]();if(_0x3d05c1[_0x312642(0x4a2)][_0x312642(0x240)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x3d05c1[_0x312642(0x4a2)]['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x4e357e of _0x3d05c1[_0x312642(0x22b)]){let _0x478882='';for(const _0x3aff79 of _0x4e357e['list']){if([0x6c,0x198][_0x312642(0x572)](_0x3aff79[_0x312642(0x571)])){if(_0x312642(0x641)===_0x312642(0x641))_0x478882+=_0x3aff79[_0x312642(0x5d1)][0x0];else{if(_0x5d5956===0x4)_0x5ed756=0x6;else _0x302942===0x6&&(_0x124f49=0x4);}}}if(_0x478882[_0x312642(0x240)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x478882[_0x312642(0x240)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}return![];},Spriteset_Map[_0x237a7a(0x2ed)][_0x237a7a(0x2bf)]=function(_0x321238){const _0x1434d0=_0x237a7a;this[_0x1434d0(0x1a7)]=this[_0x1434d0(0x1a7)]||[];const _0x30a923=new Sprite_Character(_0x321238);this[_0x1434d0(0x1a7)][_0x1434d0(0x5a6)](_0x30a923),this['_tilemap'][_0x1434d0(0x393)](_0x30a923),this[_0x1434d0(0x181)](_0x30a923),this['createLabelWindowForTarget'](_0x321238),_0x30a923[_0x1434d0(0x378)]();},Spriteset_Map[_0x237a7a(0x2ed)]['refreshEventLabels']=function(){const _0xa683f8=_0x237a7a;if(!this[_0xa683f8(0x180)])return;for(const _0x59c30d of this[_0xa683f8(0x180)]){_0x59c30d&&(_0x59c30d[_0xa683f8(0x604)]=undefined,_0x59c30d['refresh']());}},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x238)]=Game_Message[_0x237a7a(0x2ed)][_0x237a7a(0x55f)],Game_Message['prototype'][_0x237a7a(0x55f)]=function(_0x3afcd8,_0x39332c){const _0x5bda9a=_0x237a7a;this[_0x5bda9a(0x32e)]=$gameTemp[_0x5bda9a(0x558)](),VisuMZ[_0x5bda9a(0x1cc)][_0x5bda9a(0x238)][_0x5bda9a(0x275)](this,_0x3afcd8,_0x39332c);},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x385)]=Window_NumberInput[_0x237a7a(0x2ed)][_0x237a7a(0x3f3)],Window_NumberInput[_0x237a7a(0x2ed)]['start']=function(){const _0x183a8c=_0x237a7a;$gameTemp[_0x183a8c(0x220)]($gameMessage[_0x183a8c(0x32e)]),VisuMZ[_0x183a8c(0x1cc)][_0x183a8c(0x385)]['call'](this),$gameTemp['clearSelfTarget']();},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x5a2)]=Window_NumberInput[_0x237a7a(0x2ed)][_0x237a7a(0x108)],Window_NumberInput[_0x237a7a(0x2ed)][_0x237a7a(0x108)]=function(){const _0x1c44d1=_0x237a7a;$gameTemp[_0x1c44d1(0x220)]($gameMessage[_0x1c44d1(0x32e)]),VisuMZ[_0x1c44d1(0x1cc)][_0x1c44d1(0x5a2)][_0x1c44d1(0x275)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x1c44d1(0x32e)]=undefined;},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x416)]=Game_Message[_0x237a7a(0x2ed)]['setItemChoice'],Game_Message[_0x237a7a(0x2ed)][_0x237a7a(0x5ef)]=function(_0x1ae423,_0x3b48c7){const _0x39affd=_0x237a7a;this[_0x39affd(0x237)]=$gameTemp['getSelfTarget'](),VisuMZ[_0x39affd(0x1cc)][_0x39affd(0x416)][_0x39affd(0x275)](this,_0x1ae423,_0x3b48c7);},VisuMZ[_0x237a7a(0x1cc)]['Window_EventItem_onOk']=Window_EventItem['prototype']['onOk'],Window_EventItem[_0x237a7a(0x2ed)][_0x237a7a(0x481)]=function(){const _0x39cafe=_0x237a7a;$gameTemp[_0x39cafe(0x220)]($gameMessage[_0x39cafe(0x237)]),VisuMZ[_0x39cafe(0x1cc)][_0x39cafe(0x4b6)]['call'](this),$gameTemp[_0x39cafe(0x58a)](),$gameMessage[_0x39cafe(0x237)]=undefined;},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x3e3)]=Window_EventItem[_0x237a7a(0x2ed)]['onCancel'],Window_EventItem['prototype'][_0x237a7a(0x2e7)]=function(){const _0xc8f7b3=_0x237a7a;$gameTemp['registerSelfTarget']($gameMessage['_selfTargetItemChoice']),VisuMZ[_0xc8f7b3(0x1cc)][_0xc8f7b3(0x3e3)]['call'](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0xc8f7b3(0x237)]=undefined;},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x35a)]=Window_Message[_0x237a7a(0x2ed)][_0x237a7a(0x3f5)],Window_Message['prototype'][_0x237a7a(0x3f5)]=function(){const _0x1d6ab1=_0x237a7a;$gameMessage[_0x1d6ab1(0x281)](),VisuMZ['EventsMoveCore'][_0x1d6ab1(0x35a)]['call'](this),$gameTemp[_0x1d6ab1(0x58a)]();},VisuMZ[_0x237a7a(0x1cc)][_0x237a7a(0x430)]=Window_ScrollText['prototype'][_0x237a7a(0x3f5)],Window_ScrollText[_0x237a7a(0x2ed)][_0x237a7a(0x3f5)]=function(){const _0x3888b5=_0x237a7a;$gameMessage[_0x3888b5(0x281)](),VisuMZ[_0x3888b5(0x1cc)][_0x3888b5(0x430)][_0x3888b5(0x275)](this),$gameTemp[_0x3888b5(0x58a)]();};function Window_EventLabel(){this['initialize'](...arguments);}Window_EventLabel['prototype']=Object[_0x237a7a(0x3a0)](Window_Base[_0x237a7a(0x2ed)]),Window_EventLabel['prototype']['constructor']=Window_EventLabel,Window_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x2ac)]=function(_0x15d599){const _0x2df8b5=_0x237a7a;this[_0x2df8b5(0x479)]=_0x15d599;const _0x11791a=new Rectangle(0x0,0x0,Graphics['boxWidth']/0x4,this['fittingHeight'](0x1));this[_0x2df8b5(0x1b8)](),Window_Base[_0x2df8b5(0x2ed)]['initialize'][_0x2df8b5(0x275)](this,_0x11791a),this[_0x2df8b5(0x27a)]=0x0,this[_0x2df8b5(0x5dc)](0x2),this[_0x2df8b5(0x247)]='';},Window_EventLabel[_0x237a7a(0x2ed)]['initMembers']=function(){const _0x157b9d=_0x237a7a;this[_0x157b9d(0x3fd)]=![],this[_0x157b9d(0x5f8)]=$gameScreen[_0x157b9d(0x5fb)](),this[_0x157b9d(0x5c4)]=this[_0x157b9d(0x479)][_0x157b9d(0x4da)](),this['_eventScreenY']=this[_0x157b9d(0x479)]['screenY'](),this[_0x157b9d(0x2c7)]=this[_0x157b9d(0x479)][_0x157b9d(0x23b)][_0x157b9d(0x5c7)],this[_0x157b9d(0x154)]=this[_0x157b9d(0x479)]['_labelWindow'][_0x157b9d(0x2b7)],this[_0x157b9d(0x60e)]=this[_0x157b9d(0x479)][_0x157b9d(0x36c)],this[_0x157b9d(0x3b3)]=this['isLabelVisible'](),this[_0x157b9d(0x3ac)]=$gameSystem[_0x157b9d(0x2e0)](),this[_0x157b9d(0x604)]=$gamePlayer['x'],this[_0x157b9d(0x463)]=$gamePlayer['y'],this['_visibleEventX']=this['_event']['x'],this[_0x157b9d(0x5b4)]=this[_0x157b9d(0x479)]['y'];},Window_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x378)]=function(){const _0x5129dc=_0x237a7a;Window_Base[_0x5129dc(0x2ed)][_0x5129dc(0x378)][_0x5129dc(0x275)](this);if(!this['needsUpdate']())return;this[_0x5129dc(0x159)](),this[_0x5129dc(0x625)](),this['updatePosition'](),this[_0x5129dc(0x608)]();},Window_EventLabel['prototype'][_0x237a7a(0x412)]=function(){const _0xef72f1=_0x237a7a;if(!this[_0xef72f1(0x479)])return![];if(!this[_0xef72f1(0x479)]['_labelWindow'])return![];if(this[_0xef72f1(0x60e)]!==this[_0xef72f1(0x479)]['_pageIndex'])return!![];if(this[_0xef72f1(0x479)]['_erased']&&!this[_0xef72f1(0x3fd)])return!![];if(this['_event'][_0xef72f1(0x23b)][_0xef72f1(0x1e7)]==='')return![];if(this[_0xef72f1(0x5f8)]!==$gameScreen[_0xef72f1(0x5fb)]())return!![];if(this['_eventScreenX']!==this['_event']['screenX']())return!![];if(this[_0xef72f1(0x132)]!==this['_event'][_0xef72f1(0x1ad)]())return!![];if(this[_0xef72f1(0x2c7)]!==this[_0xef72f1(0x479)][_0xef72f1(0x23b)][_0xef72f1(0x5c7)])return!![];if(this[_0xef72f1(0x154)]!==this[_0xef72f1(0x479)][_0xef72f1(0x23b)][_0xef72f1(0x2b7)])return!![];if(this[_0xef72f1(0x604)]!==$gamePlayer['x'])return!![];if(this[_0xef72f1(0x463)]!==$gamePlayer['y'])return!![];if(this[_0xef72f1(0x12a)]!==this[_0xef72f1(0x479)]['x'])return!![];if(this['_visibleEventY']!==this[_0xef72f1(0x479)]['y'])return!![];if(this[_0xef72f1(0x3ac)]!==$gameSystem[_0xef72f1(0x2e0)]())return!![];if(this['_cacheVisibility']&&this[_0xef72f1(0x27a)]<0xff)return!![];if(!this[_0xef72f1(0x3b3)]&&this[_0xef72f1(0x27a)]>0x0)return!![];if(SceneManager[_0xef72f1(0x2be)][_0xef72f1(0x410)]>0x0)return!![];return![];},Window_EventLabel['prototype'][_0x237a7a(0x159)]=function(){const _0x5ab2a7=_0x237a7a;this[_0x5ab2a7(0x479)][_0x5ab2a7(0x2d2)]()!==this[_0x5ab2a7(0x247)]&&(this[_0x5ab2a7(0x247)]=this['_event']['labelWindowText'](),this[_0x5ab2a7(0x432)]());},Window_EventLabel[_0x237a7a(0x2ed)]['updateScale']=function(){const _0x3006aa=_0x237a7a;this[_0x3006aa(0x30d)]['x']=0x1/$gameScreen[_0x3006aa(0x5fb)](),this[_0x3006aa(0x30d)]['y']=0x1/$gameScreen[_0x3006aa(0x5fb)](),this[_0x3006aa(0x5f8)]=$gameScreen[_0x3006aa(0x5fb)]();},Window_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x354)]=function(){const _0x2b00bc=_0x237a7a;if(!SceneManager[_0x2b00bc(0x2be)])return;if(!SceneManager[_0x2b00bc(0x2be)][_0x2b00bc(0x3a2)])return;const _0xc1b7f6=SceneManager['_scene'][_0x2b00bc(0x3a2)][_0x2b00bc(0x1f2)](this['_event']);if(!_0xc1b7f6)return;this['x']=Math[_0x2b00bc(0x5f6)](this[_0x2b00bc(0x479)][_0x2b00bc(0x4da)]()-Math['floor'](this[_0x2b00bc(0x2d6)]*this[_0x2b00bc(0x30d)]['x']/0x2)),this['x']+=this[_0x2b00bc(0x479)][_0x2b00bc(0x23b)][_0x2b00bc(0x5c7)],this['y']=this['_event'][_0x2b00bc(0x1ad)]()-_0xc1b7f6[_0x2b00bc(0x2d0)],this['y']+=Math[_0x2b00bc(0x5f6)]($gameSystem[_0x2b00bc(0x557)]()*0.5),this['y']-=Math[_0x2b00bc(0x5f6)](this['height']*this[_0x2b00bc(0x30d)]['y']),this['y']+=this[_0x2b00bc(0x479)][_0x2b00bc(0x23b)]['offsetY'],this[_0x2b00bc(0x3fd)]=this[_0x2b00bc(0x479)]['_erased'],this[_0x2b00bc(0x5c4)]=this[_0x2b00bc(0x479)][_0x2b00bc(0x4da)](),this[_0x2b00bc(0x132)]=this[_0x2b00bc(0x479)][_0x2b00bc(0x1ad)](),this['_eventLabelOffsetX']=this[_0x2b00bc(0x479)][_0x2b00bc(0x23b)]['offsetX'],this[_0x2b00bc(0x154)]=this[_0x2b00bc(0x479)][_0x2b00bc(0x23b)]['offsetY'],this[_0x2b00bc(0x60e)]=this[_0x2b00bc(0x479)][_0x2b00bc(0x36c)],this[_0x2b00bc(0x3fd)]&&(this[_0x2b00bc(0x27a)]=0x0);},Window_EventLabel['prototype'][_0x237a7a(0x608)]=function(){const _0x32ef73=_0x237a7a;if(this['isLabelVisible']()){if(_0x32ef73(0x5eb)!==_0x32ef73(0x62e))this['contentsOpacity']+=this[_0x32ef73(0x4ac)]();else{if(this[_0x32ef73(0x316)]<=0x0)return;this[_0x32ef73(0x2c5)]=!![],this['_working']=!![];}}else SceneManager[_0x32ef73(0x2be)][_0x32ef73(0x410)]>0x0?this[_0x32ef73(0x27a)]=0x0:_0x32ef73(0x262)===_0x32ef73(0x51e)?_0x13c105[_0x32ef73(0x612)](_0x11a085[_0x32ef73(0x3fb)],_0x39b092['EventId']||_0x1ab30b[_0x32ef73(0x21f)]()):this['contentsOpacity']-=this['opacitySpeed']();},Window_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x24e)]=function(){const _0x7aaca6=_0x237a7a;if(!$gameSystem[_0x7aaca6(0x2e0)]())return![];if(this[_0x7aaca6(0x479)]?.['_erased'])return![];if(SceneManager['_scene'][_0x7aaca6(0x410)]>0x0)return![];const _0x52b041=$gamePlayer['x'],_0x390b75=$gamePlayer['y'],_0x25f6bc=this[_0x7aaca6(0x479)]['x'],_0x28b607=this['_event']['y'];if(this[_0x7aaca6(0x604)]===_0x52b041&&this[_0x7aaca6(0x463)]===_0x390b75&&this[_0x7aaca6(0x12a)]===_0x25f6bc&&this[_0x7aaca6(0x5b4)]===_0x28b607)return _0x7aaca6(0x175)===_0x7aaca6(0x231)?(this['_forceShowPlayer']===_0xf1c470&&this['setupPlayerVisibilityOverrides'](),this[_0x7aaca6(0x2c0)]):this[_0x7aaca6(0x3b3)];this[_0x7aaca6(0x604)]=$gamePlayer['x'],this[_0x7aaca6(0x463)]=$gamePlayer['y'],this['_visibleEventX']=this['_event']['x'],this[_0x7aaca6(0x5b4)]=this[_0x7aaca6(0x479)]['y'];if($gameMap[_0x7aaca6(0x382)](_0x52b041,_0x390b75,_0x25f6bc,_0x28b607)>this[_0x7aaca6(0x479)][_0x7aaca6(0x63d)]())return this['_cacheVisibility']=![],![];return this['_cacheVisibility']=!![],!![];},Window_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x4ac)]=function(){const _0xd4f1a=_0x237a7a;return VisuMZ[_0xd4f1a(0x1cc)][_0xd4f1a(0x3e2)][_0xd4f1a(0x4a6)][_0xd4f1a(0x38c)];},Window_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x4c7)]=function(){const _0x770c25=_0x237a7a,_0x2bfceb=this['textSizeEx'](this[_0x770c25(0x247)]);this[_0x770c25(0x2d6)]=_0x2bfceb['width']+($gameSystem[_0x770c25(0x557)]()+this['itemPadding']())*0x2,this[_0x770c25(0x2d0)]=Math[_0x770c25(0xf1)](this['lineHeight'](),_0x2bfceb[_0x770c25(0x2d0)])+$gameSystem[_0x770c25(0x557)]()*0x2,this[_0x770c25(0x5e9)]();},Window_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x42e)]=function(){const _0x885399=_0x237a7a;return VisuMZ[_0x885399(0x1cc)]['Settings']['Label'][_0x885399(0x3ed)];},Window_EventLabel['prototype'][_0x237a7a(0x273)]=function(){const _0x47f461=_0x237a7a;Window_Base[_0x47f461(0x2ed)][_0x47f461(0x273)]['call'](this),this[_0x47f461(0x2ce)]['fontSize']=this['defaultFontSize']();},Window_EventLabel['prototype'][_0x237a7a(0x186)]=function(){const _0x16304d=_0x237a7a;return VisuMZ[_0x16304d(0x1cc)][_0x16304d(0x3e2)][_0x16304d(0x4a6)]['FontSize'];},Window_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x432)]=function(){const _0xdc3175=_0x237a7a;this[_0xdc3175(0x4c7)](),this[_0xdc3175(0x2ce)][_0xdc3175(0x48a)]();const _0x1c3c33=this['_text'][_0xdc3175(0x51b)](/[\r\n]+/);let _0x4395ab=0x0;for(const _0xff66de of _0x1c3c33){const _0x147864=this[_0xdc3175(0x250)](_0xff66de),_0x3d2559=Math[_0xdc3175(0x4bf)]((this[_0xdc3175(0x203)]-_0x147864[_0xdc3175(0x2d6)])/0x2);this[_0xdc3175(0x17d)](_0xff66de,_0x3d2559,_0x4395ab),_0x4395ab+=_0x147864[_0xdc3175(0x2d0)];}},Window_EventLabel[_0x237a7a(0x2ed)]['processDrawIcon']=function(_0x2584bb,_0x1a6532){const _0x35a843=_0x237a7a;_0x1a6532['drawing']&&this[_0x35a843(0x41d)](_0x2584bb,_0x1a6532['x']+0x2,_0x1a6532['y']),_0x1a6532['x']+=Math[_0x35a843(0x128)](this['iconSize'](),ImageManager['iconWidth'])+0x4;},Window_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x41d)]=function(_0x3c904e,_0x5b7104,_0x32245b){const _0xd19aad=_0x237a7a,_0x5b66a1=ImageManager[_0xd19aad(0x145)](_0xd19aad(0x308)),_0x29e7b1=ImageManager[_0xd19aad(0x611)],_0x30e87c=ImageManager[_0xd19aad(0x396)],_0x30b088=_0x3c904e%0x10*_0x29e7b1,_0x4f4d44=Math[_0xd19aad(0x4bf)](_0x3c904e/0x10)*_0x30e87c,_0x22da63=Math[_0xd19aad(0x128)](this[_0xd19aad(0x15b)]()),_0x28e732=Math[_0xd19aad(0x128)](this[_0xd19aad(0x15b)]());this[_0xd19aad(0x2ce)][_0xd19aad(0x551)](_0x5b66a1,_0x30b088,_0x4f4d44,_0x29e7b1,_0x30e87c,_0x5b7104,_0x32245b,_0x22da63,_0x28e732);},Window_EventLabel[_0x237a7a(0x2ed)][_0x237a7a(0x15b)]=function(){const _0x3dc07f=_0x237a7a;return VisuMZ[_0x3dc07f(0x1cc)][_0x3dc07f(0x3e2)][_0x3dc07f(0x4a6)]['IconSize'];};