//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.39;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.39] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 * 
 * <Party Artifact>
 * <Troop Artifact>
 * 
 * <Stackable Party Artifact>
 * <Stackable Troop Artifact>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped at all. However, by simply being in the
 *   party's inventory, its parameter bonuses and traits will be applied
 *   globally throughout the whole party or troop (depending on the notetag).
 * - Add both notetags to affect both groups.
 * - The normal versions of the notetag is only applied once regardless of the
 *   number of copies are found in the party's inventory.
 * - The stackable versions of the notetag will have the bonuses and traits
 *   stacked multiple times relative to the number of copies found in the
 *   party's inventory.
 * - This item will NOT be added during the setup phase for Battle Tests.
 *   - If you want to add the item, do it manually.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.39: September 29, 2022:
 * * Feature Update!
 * ** Changed the default code for the equip scene's status window display to
 *    prevent the face graphic and basic actor stats from going above the
 *    window boundaries if there are too many parameters displayed in the
 *    status window at a time.
 * ** If you already have this plugin installed the changes will not be
 *    reflected unless you do the following:
 * **** BACKUP your game project.
 * **** REMOVE this plugin from the Plugin Manager list.
 * **** REINSTALL this plugin into the Plugin Manager list.
 * **** SAVE the game project.
 * 
 * Version 1.38: March 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New mechanics and notetags added by Olivia and sponsored by Anon:
 * *** <Party Artifact>
 * *** <Troop Artifact>
 * *** <Stackable Party Artifact>
 * *** <Stackable Troop Artifact>
 * **** Armors only! This armor cannot be equipped at all. However, by simply
 *      being in the party's inventory, its parameter bonuses and traits will
 *      be applied globally throughout the whole party or troop (depending on
 *      the notetag). Add both notetags to affect both groups.
 * **** The normal versions of the notetag is only applied once regardless of
 *      the number of copies are found in the party's inventory.
 * **** The stackable versions of the notetag will have the bonuses and traits
 *      stacked multiple times relative to the number of copies found in the
 *      party's inventory.
 * **** This item will NOT be added during the setup phase for Battle Tests.
 * ***** If you want to add the item, do it manually.
 * 
 * Version 1.37: December 23, 2021
 * * Compatibility Update
 * ** Created foundation for proxy items to be used in any applicable system
 *    and extension plugins. Update made by Arisu.
 * 
 * Version 1.36: December 2, 2021
 * * Feature Update!
 * ** For those using custom parameters from the Core Engine and do not have
 *    the parameters all-capitalized, the plugin will automatically do it for
 *    you to prevent errors. Update made by Olivia.
 * 
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"true","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x14015d=_0x29b4;(function(_0xdb3270,_0x3d4d2c){const _0x1e7786=_0x29b4,_0x3e8d71=_0xdb3270();while(!![]){try{const _0x5670a3=parseInt(_0x1e7786(0x5f9))/0x1+parseInt(_0x1e7786(0x318))/0x2*(-parseInt(_0x1e7786(0x4be))/0x3)+-parseInt(_0x1e7786(0x2a3))/0x4+-parseInt(_0x1e7786(0x476))/0x5*(-parseInt(_0x1e7786(0x50b))/0x6)+parseInt(_0x1e7786(0x29f))/0x7+parseInt(_0x1e7786(0x57e))/0x8*(-parseInt(_0x1e7786(0x23d))/0x9)+parseInt(_0x1e7786(0x28b))/0xa;if(_0x5670a3===_0x3d4d2c)break;else _0x3e8d71['push'](_0x3e8d71['shift']());}catch(_0x51d939){_0x3e8d71['push'](_0x3e8d71['shift']());}}}(_0x1f12,0xb500e));var label=_0x14015d(0x502),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x14015d(0x515)](function(_0x2f77a2){const _0x321cd7=_0x14015d;return _0x2f77a2[_0x321cd7(0x4d5)]&&_0x2f77a2[_0x321cd7(0x53e)][_0x321cd7(0x415)]('['+label+']');})[0x0];VisuMZ[label][_0x14015d(0x524)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x14015d(0x2b2)]=function(_0x16b601,_0x41c4a9){const _0x5c5fc4=_0x14015d;for(const _0x7fbe3b in _0x41c4a9){if(_0x7fbe3b[_0x5c5fc4(0x497)](/(.*):(.*)/i)){const _0x5205d3=String(RegExp['$1']),_0x725566=String(RegExp['$2'])[_0x5c5fc4(0x34e)]()[_0x5c5fc4(0x4e3)]();let _0x5de222,_0x350f7f,_0xce0ed4;switch(_0x725566){case _0x5c5fc4(0x484):_0x5de222=_0x41c4a9[_0x7fbe3b]!==''?Number(_0x41c4a9[_0x7fbe3b]):0x0;break;case _0x5c5fc4(0x3af):_0x350f7f=_0x41c4a9[_0x7fbe3b]!==''?JSON['parse'](_0x41c4a9[_0x7fbe3b]):[],_0x5de222=_0x350f7f[_0x5c5fc4(0x2d3)](_0x4bb8ef=>Number(_0x4bb8ef));break;case _0x5c5fc4(0x2ec):_0x5de222=_0x41c4a9[_0x7fbe3b]!==''?eval(_0x41c4a9[_0x7fbe3b]):null;break;case _0x5c5fc4(0x492):_0x350f7f=_0x41c4a9[_0x7fbe3b]!==''?JSON[_0x5c5fc4(0x35c)](_0x41c4a9[_0x7fbe3b]):[],_0x5de222=_0x350f7f[_0x5c5fc4(0x2d3)](_0x430f92=>eval(_0x430f92));break;case'JSON':_0x5de222=_0x41c4a9[_0x7fbe3b]!==''?JSON['parse'](_0x41c4a9[_0x7fbe3b]):'';break;case'ARRAYJSON':_0x350f7f=_0x41c4a9[_0x7fbe3b]!==''?JSON[_0x5c5fc4(0x35c)](_0x41c4a9[_0x7fbe3b]):[],_0x5de222=_0x350f7f[_0x5c5fc4(0x2d3)](_0x41f947=>JSON[_0x5c5fc4(0x35c)](_0x41f947));break;case'FUNC':_0x5de222=_0x41c4a9[_0x7fbe3b]!==''?new Function(JSON[_0x5c5fc4(0x35c)](_0x41c4a9[_0x7fbe3b])):new Function(_0x5c5fc4(0x53f));break;case _0x5c5fc4(0x568):_0x350f7f=_0x41c4a9[_0x7fbe3b]!==''?JSON[_0x5c5fc4(0x35c)](_0x41c4a9[_0x7fbe3b]):[],_0x5de222=_0x350f7f[_0x5c5fc4(0x2d3)](_0x4adf0f=>new Function(JSON[_0x5c5fc4(0x35c)](_0x4adf0f)));break;case _0x5c5fc4(0x48c):_0x5de222=_0x41c4a9[_0x7fbe3b]!==''?String(_0x41c4a9[_0x7fbe3b]):'';break;case _0x5c5fc4(0x556):_0x350f7f=_0x41c4a9[_0x7fbe3b]!==''?JSON['parse'](_0x41c4a9[_0x7fbe3b]):[],_0x5de222=_0x350f7f['map'](_0x5a1228=>String(_0x5a1228));break;case'STRUCT':_0xce0ed4=_0x41c4a9[_0x7fbe3b]!==''?JSON[_0x5c5fc4(0x35c)](_0x41c4a9[_0x7fbe3b]):{},_0x16b601[_0x5205d3]={},VisuMZ[_0x5c5fc4(0x2b2)](_0x16b601[_0x5205d3],_0xce0ed4);continue;case _0x5c5fc4(0x564):_0x350f7f=_0x41c4a9[_0x7fbe3b]!==''?JSON[_0x5c5fc4(0x35c)](_0x41c4a9[_0x7fbe3b]):[],_0x5de222=_0x350f7f[_0x5c5fc4(0x2d3)](_0x11cf46=>VisuMZ['ConvertParams']({},JSON['parse'](_0x11cf46)));break;default:continue;}_0x16b601[_0x5205d3]=_0x5de222;}}return _0x16b601;},(_0x13b0b9=>{const _0x212ed5=_0x14015d,_0xcbc3c7=_0x13b0b9[_0x212ed5(0x4c6)];for(const _0xdb8bb9 of dependencies){if(!Imported[_0xdb8bb9]){if(_0x212ed5(0x1e6)!==_0x212ed5(0x370)){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x212ed5(0x2c8)](_0xcbc3c7,_0xdb8bb9)),SceneManager[_0x212ed5(0x340)]();break;}else _0x25796f=_0x1c94dc[_0x212ed5(0x5a8)]((this[_0x212ed5(0x447)]-_0x296444)/0x2);}}const _0x2adc74=_0x13b0b9['description'];if(_0x2adc74[_0x212ed5(0x497)](/\[Version[ ](.*?)\]/i)){const _0x4ef95f=Number(RegExp['$1']);_0x4ef95f!==VisuMZ[label][_0x212ed5(0x507)]&&(alert(_0x212ed5(0x263)[_0x212ed5(0x2c8)](_0xcbc3c7,_0x4ef95f)),SceneManager[_0x212ed5(0x340)]());}if(_0x2adc74[_0x212ed5(0x497)](/\[Tier[ ](\d+)\]/i)){if(_0x212ed5(0x4b8)!==_0x212ed5(0x538)){const _0x263ef1=Number(RegExp['$1']);if(_0x263ef1<tier)_0x212ed5(0x50d)!==_0x212ed5(0x50d)?(_0x4a39ea[_0x212ed5(0x502)][_0x212ed5(0x36c)][_0x212ed5(0x207)](this),this[_0x212ed5(0x4fb)]()):(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x212ed5(0x2c8)](_0xcbc3c7,_0x263ef1,tier)),SceneManager[_0x212ed5(0x340)]());else{if(_0x212ed5(0x65c)!==_0x212ed5(0x65c)){if(this[_0x212ed5(0x398)]())return this[_0x212ed5(0x4a8)]();else{const _0x18059e=_0x5d81d7[_0x212ed5(0x502)][_0x212ed5(0x3ff)][_0x212ed5(0x207)](this);return this[_0x212ed5(0x3c5)]()&&this[_0x212ed5(0x3a3)]()&&(_0x18059e['width']-=this[_0x212ed5(0x25d)]()),_0x18059e;}}else tier=Math['max'](_0x263ef1,tier);}}else{let _0x262d09=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];return _0x39ee68['VisuMZ_0_CoreEngine']&&(_0x262d09=_0x159dc7[_0x212ed5(0x31a)]['Settings']['Param']['ExtDisplayedParams']),_0x262d09=_0x262d09[_0x212ed5(0x2d3)](_0x3d6abf=>typeof _0x3d6abf===_0x212ed5(0x521)?_0x3d6abf:_0x3d6abf[_0x212ed5(0x34e)]()[_0x212ed5(0x4e3)]()),_0x262d09;}}VisuMZ['ConvertParams'](VisuMZ[label][_0x212ed5(0x524)],_0x13b0b9[_0x212ed5(0x425)]);})(pluginData),PluginManager[_0x14015d(0x26c)](pluginData['name'],_0x14015d(0x4a0),_0x316ba9=>{const _0x581116=_0x14015d;VisuMZ['ConvertParams'](_0x316ba9,_0x316ba9);const _0x14347c=_0x316ba9['Actors'][_0x581116(0x2d3)](_0x13d69c=>$gameActors[_0x581116(0x496)](_0x13d69c)),_0x708472=_0x316ba9[_0x581116(0x339)][_0x581116(0x2d3)](_0x422ce7=>$dataSystem[_0x581116(0x622)]['indexOf'](_0x422ce7[_0x581116(0x4e3)]()));for(const _0x4c77f9 of _0x14347c){if(_0x581116(0x2d5)===_0x581116(0x40c))return _0x2a86b4['getInputMultiButtonStrings'](_0x581116(0x4ff),_0x581116(0x592));else{if(!_0x4c77f9)continue;_0x4c77f9[_0x581116(0x4e4)](_0x708472);}}}),PluginManager['registerCommand'](pluginData[_0x14015d(0x4c6)],_0x14015d(0x505),_0x53ff83=>{const _0xd8b1b=_0x14015d;VisuMZ[_0xd8b1b(0x2b2)](_0x53ff83,_0x53ff83);const _0x459297=_0x53ff83['Actors'][_0xd8b1b(0x2d3)](_0x1e10d5=>$gameActors[_0xd8b1b(0x496)](_0x1e10d5));for(const _0x2a5cdc of _0x459297){if(!_0x2a5cdc)continue;_0x2a5cdc[_0xd8b1b(0x1ef)]();}}),PluginManager[_0x14015d(0x26c)](pluginData['name'],_0x14015d(0x5ad),_0x405ad5=>{const _0x20fdc0=_0x14015d;VisuMZ['ConvertParams'](_0x405ad5,_0x405ad5);const _0x425d1f=[],_0x5eb8e1=_0x405ad5[_0x20fdc0(0x213)][_0x20fdc0(0x2d3)](_0x363e78=>_0x363e78[_0x20fdc0(0x34e)]()[_0x20fdc0(0x4e3)]()),_0x5e3f23=_0x405ad5[_0x20fdc0(0x649)][_0x20fdc0(0x2d3)](_0x2fd9ee=>_0x2fd9ee['toUpperCase']()['trim']()),_0x4d69a0=_0x405ad5[_0x20fdc0(0x3ba)]>=_0x405ad5[_0x20fdc0(0x512)]?_0x405ad5[_0x20fdc0(0x512)]:_0x405ad5[_0x20fdc0(0x3ba)],_0x1b6dde=_0x405ad5['Step1End']>=_0x405ad5[_0x20fdc0(0x512)]?_0x405ad5[_0x20fdc0(0x3ba)]:_0x405ad5[_0x20fdc0(0x512)],_0x191154=Array(_0x1b6dde-_0x4d69a0+0x1)[_0x20fdc0(0x2b4)]()[_0x20fdc0(0x2d3)]((_0x2068da,_0x1618bf)=>_0x4d69a0+_0x1618bf);for(const _0x2c6f81 of _0x191154){const _0x289b76=$dataItems[_0x2c6f81];if(!_0x289b76)continue;if(!VisuMZ[_0x20fdc0(0x502)][_0x20fdc0(0x2df)](_0x289b76,_0x5eb8e1,_0x5e3f23))continue;_0x425d1f['push']([0x0,_0x2c6f81,0x0,_0x289b76[_0x20fdc0(0x421)]]);}const _0x3b8835=_0x405ad5['Step2End']>=_0x405ad5[_0x20fdc0(0x491)]?_0x405ad5['Step2Start']:_0x405ad5['Step2End'],_0x35550d=_0x405ad5[_0x20fdc0(0x554)]>=_0x405ad5[_0x20fdc0(0x491)]?_0x405ad5['Step2End']:_0x405ad5[_0x20fdc0(0x491)],_0x2f4499=Array(_0x35550d-_0x3b8835+0x1)['fill']()[_0x20fdc0(0x2d3)]((_0xf37558,_0x477997)=>_0x3b8835+_0x477997);for(const _0x325764 of _0x2f4499){if(_0x20fdc0(0x2d9)!==_0x20fdc0(0x2d9)){const _0x434673=this[_0x20fdc0(0x465)](_0x5b51c2);if(_0x434673==='iconText')this[_0x20fdc0(0x43e)](_0xf487e9);else _0x434673===_0x20fdc0(0x64e)?this[_0x20fdc0(0x404)](_0x1e693d):_0x31b91d[_0x20fdc0(0x39a)][_0x20fdc0(0x586)][_0x20fdc0(0x207)](this,_0x3ac55a);}else{const _0x4509b8=$dataWeapons[_0x325764];if(!_0x4509b8)continue;if(!VisuMZ[_0x20fdc0(0x502)][_0x20fdc0(0x2df)](_0x4509b8,_0x5eb8e1,_0x5e3f23))continue;_0x425d1f[_0x20fdc0(0x58d)]([0x1,_0x325764,0x0,_0x4509b8[_0x20fdc0(0x421)]]);}}const _0x21b088=_0x405ad5[_0x20fdc0(0x4e1)]>=_0x405ad5[_0x20fdc0(0x3b0)]?_0x405ad5['Step3Start']:_0x405ad5[_0x20fdc0(0x4e1)],_0x1363c9=_0x405ad5[_0x20fdc0(0x4e1)]>=_0x405ad5[_0x20fdc0(0x3b0)]?_0x405ad5[_0x20fdc0(0x4e1)]:_0x405ad5[_0x20fdc0(0x3b0)],_0x2d1591=Array(_0x1363c9-_0x21b088+0x1)['fill']()['map']((_0xcc7ab9,_0x266374)=>_0x21b088+_0x266374);for(const _0x40e338 of _0x2d1591){const _0x3ac02f=$dataArmors[_0x40e338];if(!_0x3ac02f)continue;if(!VisuMZ['ItemsEquipsCore']['IncludeShopItem'](_0x3ac02f,_0x5eb8e1,_0x5e3f23))continue;_0x425d1f[_0x20fdc0(0x58d)]([0x2,_0x40e338,0x0,_0x3ac02f[_0x20fdc0(0x421)]]);}SceneManager[_0x20fdc0(0x58d)](Scene_Shop),SceneManager[_0x20fdc0(0x49d)](_0x425d1f,_0x405ad5['PurchaseOnly']);}),VisuMZ[_0x14015d(0x502)][_0x14015d(0x2df)]=function(_0x383372,_0xf3af09,_0x47dcd5){const _0x4d7fad=_0x14015d;if(_0x383372[_0x4d7fad(0x4c6)][_0x4d7fad(0x4e3)]()==='')return![];if(_0x383372['name']['match'](/-----/i))return![];const _0x4bd2ce=_0x383372[_0x4d7fad(0x4f5)];if(_0xf3af09[_0x4d7fad(0x536)]>0x0)for(const _0x34993e of _0xf3af09){if(_0x4d7fad(0x493)===_0x4d7fad(0x636))return _0x5d4f9d['ScopeRandomAny'][_0x4d7fad(0x2c8)](_0x13e799(_0x42ca63['$1']));else{if(!_0x34993e)continue;if(_0x4bd2ce['includes'](_0x34993e))return![];}}if(_0x47dcd5['length']>0x0){if(_0x4d7fad(0x55a)!==_0x4d7fad(0x55a)){const _0x44f3a5=this[_0x4d7fad(0x60a)](_0x2a8917);if(_0x44f3a5['match'](/\\I\[(\d+)\]/i)){const _0x5344dc=this['itemLineRect'](_0x27b37c),_0x28fda7=this[_0x4d7fad(0x5dc)](_0x44f3a5)[_0x4d7fad(0x5ed)];return _0x28fda7<=_0x5344dc[_0x4d7fad(0x5ed)]?'iconText':_0x4d7fad(0x64e);}}else{for(const _0x517b5c of _0x47dcd5){if('Kjuup'==='Kjuup'){if(!_0x517b5c)continue;if(_0x4bd2ce[_0x4d7fad(0x415)](_0x517b5c))return!![];}else _0x4c0f7e['ItemsEquipsCore'][_0x4d7fad(0x4ef)][_0x4d7fad(0x207)](this),this[_0x4d7fad(0x398)]()&&this[_0x4d7fad(0x577)](),this[_0x4d7fad(0x593)]();}return![];}}return!![];},VisuMZ['ItemsEquipsCore'][_0x14015d(0x501)]=Scene_Boot[_0x14015d(0x39a)]['onDatabaseLoaded'],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x1f6117=_0x14015d;this['process_VisuMZ_ItemsEquipsCore_RegExp'](),VisuMZ[_0x1f6117(0x502)]['Scene_Boot_onDatabaseLoaded'][_0x1f6117(0x207)](this),this['process_VisuMZ_ItemsEquipsCore_Notetags'](),VisuMZ[_0x1f6117(0x502)]['SetupProxyItemGroups']();},Scene_Boot[_0x14015d(0x39a)][_0x14015d(0x58b)]=function(){const _0x46ed26=_0x14015d;VisuMZ[_0x46ed26(0x502)][_0x46ed26(0x222)]={},VisuMZ['ItemsEquipsCore'][_0x46ed26(0x222)][_0x46ed26(0x266)]=[],VisuMZ[_0x46ed26(0x502)][_0x46ed26(0x222)][_0x46ed26(0x228)]=[];const _0x42d544=[_0x46ed26(0x5aa),'MaxMP','ATK',_0x46ed26(0x440),_0x46ed26(0x223),_0x46ed26(0x1ed),_0x46ed26(0x21a),_0x46ed26(0x3aa)];for(const _0x3213f2 of _0x42d544){const _0x407864='<%1:[\x20]([\x5c+\x5c-]\x5cd+)>'['format'](_0x3213f2);VisuMZ[_0x46ed26(0x502)]['RegExp']['EquipParams'][_0x46ed26(0x58d)](new RegExp(_0x407864,'i'));const _0x27a253='\x5cb%1\x5cb'['format'](_0x3213f2);VisuMZ[_0x46ed26(0x502)][_0x46ed26(0x222)][_0x46ed26(0x228)]['push'](new RegExp(_0x27a253,'g'));}},Scene_Boot[_0x14015d(0x39a)][_0x14015d(0x252)]=function(){const _0x17f84b=_0x14015d;if(VisuMZ[_0x17f84b(0x28e)])return;this[_0x17f84b(0x22f)]();const _0x55caa5=[$dataItems,$dataWeapons,$dataArmors];for(const _0x40ecb4 of _0x55caa5){if('ZECdy'!=='ZECdy'){const _0x5b1850=_0x2a56a6+_0x46ee51+_0x43d633*_0x3dcfa6;this['drawItemDarkRect'](_0x5b1850,_0x558a52,_0xf8d001,_0xbc1048-_0x3befc0);}else for(const _0x4d69bb of _0x40ecb4){if(!_0x4d69bb)continue;VisuMZ[_0x17f84b(0x502)]['Parse_Notetags_Category'](_0x4d69bb,_0x40ecb4),VisuMZ[_0x17f84b(0x502)][_0x17f84b(0x628)](_0x4d69bb,_0x40ecb4),VisuMZ[_0x17f84b(0x502)][_0x17f84b(0x2c1)](_0x4d69bb,_0x40ecb4),VisuMZ['ItemsEquipsCore'][_0x17f84b(0x602)](_0x4d69bb,_0x40ecb4),VisuMZ[_0x17f84b(0x502)][_0x17f84b(0x369)](_0x4d69bb,_0x40ecb4);}}},Scene_Boot['prototype']['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){const _0x5d64c2=_0x14015d;for(const _0x501963 of $dataClasses){if(!_0x501963)continue;VisuMZ[_0x5d64c2(0x502)][_0x5d64c2(0x3c7)](_0x501963);}},VisuMZ['ItemsEquipsCore'][_0x14015d(0x46b)]=VisuMZ[_0x14015d(0x46b)],VisuMZ[_0x14015d(0x46b)]=function(_0xf586f6){const _0x5dd0b7=_0x14015d;VisuMZ[_0x5dd0b7(0x502)][_0x5dd0b7(0x46b)][_0x5dd0b7(0x207)](this,_0xf586f6),VisuMZ[_0x5dd0b7(0x502)][_0x5dd0b7(0x3c7)](_0xf586f6);},VisuMZ[_0x14015d(0x502)]['ParseItemNotetags']=VisuMZ['ParseItemNotetags'],VisuMZ[_0x14015d(0x26f)]=function(_0x1d82bb){const _0x2d8c98=_0x14015d;VisuMZ['ItemsEquipsCore'][_0x2d8c98(0x26f)]['call'](this,_0x1d82bb),VisuMZ[_0x2d8c98(0x502)][_0x2d8c98(0x510)](_0x1d82bb,$dataItems);},VisuMZ['ItemsEquipsCore'][_0x14015d(0x4cf)]=VisuMZ[_0x14015d(0x4cf)],VisuMZ[_0x14015d(0x4cf)]=function(_0x16d29b){const _0x469048=_0x14015d;VisuMZ[_0x469048(0x502)][_0x469048(0x4cf)][_0x469048(0x207)](this,_0x16d29b),VisuMZ[_0x469048(0x502)][_0x469048(0x510)](_0x16d29b,$dataWeapons);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x4cb)]=VisuMZ[_0x14015d(0x4cb)],VisuMZ[_0x14015d(0x4cb)]=function(_0x54994b){const _0x5850ff=_0x14015d;VisuMZ[_0x5850ff(0x502)][_0x5850ff(0x4cb)]['call'](this,_0x54994b),VisuMZ[_0x5850ff(0x502)][_0x5850ff(0x510)](_0x54994b,$dataArmors);},VisuMZ[_0x14015d(0x502)]['Parse_Notetags_EquipSlots']=function(_0xb535ee){const _0x12e493=_0x14015d;_0xb535ee[_0x12e493(0x30c)]=[];if(!BattleManager[_0x12e493(0x3a9)]()&&_0xb535ee[_0x12e493(0x4f1)][_0x12e493(0x497)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x3b58e2=String(RegExp['$1'])[_0x12e493(0x351)](/[\r\n]+/);for(const _0x43429a of _0x3b58e2){const _0x4af377=$dataSystem[_0x12e493(0x622)][_0x12e493(0x42c)](_0x43429a['trim']());if(_0x4af377>0x0)_0xb535ee[_0x12e493(0x30c)]['push'](_0x4af377);}}else for(const _0x39829d of $dataSystem[_0x12e493(0x622)]){const _0x33b4c5=$dataSystem[_0x12e493(0x622)]['indexOf'](_0x39829d[_0x12e493(0x4e3)]());if(_0x33b4c5>0x0)_0xb535ee[_0x12e493(0x30c)][_0x12e493(0x58d)](_0x33b4c5);}},VisuMZ[_0x14015d(0x502)][_0x14015d(0x510)]=function(_0x558e7c,_0x3f7569){const _0x3a4e8b=_0x14015d;VisuMZ['ItemsEquipsCore'][_0x3a4e8b(0x513)](_0x558e7c,_0x3f7569),VisuMZ[_0x3a4e8b(0x502)]['Parse_Notetags_Prices'](_0x558e7c,_0x3f7569),VisuMZ[_0x3a4e8b(0x502)][_0x3a4e8b(0x2c1)](_0x558e7c,_0x3f7569),VisuMZ[_0x3a4e8b(0x502)][_0x3a4e8b(0x602)](_0x558e7c,_0x3f7569),VisuMZ[_0x3a4e8b(0x502)]['Parse_Notetags_EnableJS'](_0x558e7c,_0x3f7569);},VisuMZ['ItemsEquipsCore'][_0x14015d(0x513)]=function(_0xa3aeb,_0x2bc632){const _0x19e0f5=_0x14015d;_0xa3aeb[_0x19e0f5(0x4f5)]=[];const _0xe3d13=_0xa3aeb[_0x19e0f5(0x4f1)],_0x313e81=_0xe3d13[_0x19e0f5(0x497)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x313e81)for(const _0x2a6d86 of _0x313e81){if('XiOrQ'===_0x19e0f5(0x25e)){if(this[_0x19e0f5(0x5b5)]()===_0x19e0f5(0x1f6))_0x2b05fa[_0x19e0f5(0x39a)]['playOkSound'][_0x19e0f5(0x207)](this);}else{_0x2a6d86[_0x19e0f5(0x497)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x2c17fc=String(RegExp['$1'])['toUpperCase']()[_0x19e0f5(0x4e3)]()[_0x19e0f5(0x351)](',');for(const _0x5067d8 of _0x2c17fc){_0xa3aeb[_0x19e0f5(0x4f5)][_0x19e0f5(0x58d)](_0x5067d8[_0x19e0f5(0x4e3)]());}}}if(_0xe3d13[_0x19e0f5(0x497)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x2cee53=RegExp['$1'][_0x19e0f5(0x351)](/[\r\n]+/);for(const _0x163181 of _0x2cee53){_0xa3aeb[_0x19e0f5(0x4f5)][_0x19e0f5(0x58d)](_0x163181['toUpperCase']()['trim']());}}},VisuMZ[_0x14015d(0x502)][_0x14015d(0x628)]=function(_0x19a8b4,_0x5bf71b){const _0x510360=_0x14015d;_0x19a8b4[_0x510360(0x4f1)]['match'](/<PRICE:[ ](\d+)>/i)&&(_0x19a8b4[_0x510360(0x421)]=Number(RegExp['$1']));},VisuMZ[_0x14015d(0x502)][_0x14015d(0x2c1)]=function(_0x4a8d78,_0x2af9f1){const _0x34c212=_0x14015d;if(_0x2af9f1===$dataItems)return;for(let _0x354d7b=0x0;_0x354d7b<0x8;_0x354d7b++){const _0x45b592=VisuMZ[_0x34c212(0x502)][_0x34c212(0x222)][_0x34c212(0x266)][_0x354d7b];if(_0x4a8d78[_0x34c212(0x4f1)]['match'](_0x45b592)){if(_0x34c212(0x3cf)!==_0x34c212(0x3cf))return this[_0x34c212(0x555)]()[_0x34c212(0x497)](/LOWER/i);else _0x4a8d78[_0x34c212(0x2e9)][_0x354d7b]=parseInt(RegExp['$1']);}}},VisuMZ['ItemsEquipsCore'][_0x14015d(0x389)]={},VisuMZ[_0x14015d(0x502)][_0x14015d(0x602)]=function(_0x1d5719,_0x59265b){const _0x124ea2=_0x14015d;if(_0x59265b===$dataItems)return;if(_0x1d5719[_0x124ea2(0x4f1)][_0x124ea2(0x497)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){if(_0x124ea2(0x5ef)!=='Cktrk'){_0x38275b+=_0x124ea2(0x3f9)[_0x124ea2(0x2c8)](_0x5a54fc),_0x2bad51++;if(_0x33d610>=_0x2b9253)return _0x5c9f68;}else{const _0x5cc8e9=String(RegExp['$1']),_0x1a9a74=(_0x59265b===$dataWeapons?_0x124ea2(0x225):_0x124ea2(0x2e6))['format'](_0x1d5719['id']),_0x2d759f='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'[_0x124ea2(0x2c8)](_0x5cc8e9);for(let _0x1355d8=0x0;_0x1355d8<0x8;_0x1355d8++){if(_0x5cc8e9[_0x124ea2(0x497)](VisuMZ[_0x124ea2(0x502)][_0x124ea2(0x222)][_0x124ea2(0x228)][_0x1355d8])){const _0x5b3e01='%1-%2'[_0x124ea2(0x2c8)](_0x1a9a74,_0x1355d8);VisuMZ[_0x124ea2(0x502)][_0x124ea2(0x389)][_0x5b3e01]=new Function('item','paramId',_0x2d759f);}}}}},VisuMZ[_0x14015d(0x502)][_0x14015d(0x3bc)]={},VisuMZ[_0x14015d(0x502)]['Parse_Notetags_EnableJS']=function(_0x135170,_0x2a43ec){const _0x381ece=_0x14015d;if(_0x2a43ec!==$dataItems)return;if(_0x135170[_0x381ece(0x4f1)]['match'](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){if('yunlx'!==_0x381ece(0x537)){const _0xad4ca5=String(RegExp['$1']),_0x316db8=_0x381ece(0x385)[_0x381ece(0x2c8)](_0xad4ca5);VisuMZ[_0x381ece(0x502)][_0x381ece(0x3bc)][_0x135170['id']]=new Function('item',_0x316db8);}else{if(!this[_0x381ece(0x509)]){const _0x29d382=_0x5207c3['makeDeepCopy'](this);_0x29d382[_0x381ece(0x509)]=!![],_0xb5e52d[_0x381ece(0x502)][_0x381ece(0x3d8)]['call'](this,_0x1a7971,_0xfe1bc4),this['equipAdjustHpMp'](_0x29d382);}else _0x4d29bb[_0x381ece(0x502)][_0x381ece(0x3d8)][_0x381ece(0x207)](this,_0x78e2f7,_0x57683a);}}},DataManager[_0x14015d(0x381)]=function(_0x570f47){const _0x3d7806=_0x14015d;return this[_0x3d7806(0x342)](_0x570f47)&&_0x570f47[_0x3d7806(0x3e2)]===0x2;},DataManager[_0x14015d(0x1fc)]=function(_0x31acf1){const _0x2a6dcb=_0x14015d;if(!_0x31acf1)return 0x63;else{if(_0x31acf1[_0x2a6dcb(0x4f1)][_0x2a6dcb(0x497)](/<MAX:[ ](\d+)>/i)){if(_0x2a6dcb(0x53d)!==_0x2a6dcb(0x53d))_0x21b3af(_0x2a6dcb(0x263)[_0x2a6dcb(0x2c8)](_0x5800e0,_0x582a09)),_0x443b86[_0x2a6dcb(0x340)]();else return parseInt(RegExp['$1']);}else return this['defaultItemMax'](_0x31acf1);}},DataManager[_0x14015d(0x55f)]=function(_0x40d351){const _0x5e8a5b=_0x14015d;if(this[_0x5e8a5b(0x342)](_0x40d351))return VisuMZ[_0x5e8a5b(0x502)][_0x5e8a5b(0x524)][_0x5e8a5b(0x5b4)][_0x5e8a5b(0x31d)];else{if(this[_0x5e8a5b(0x3ec)](_0x40d351))return _0x5e8a5b(0x3b7)!==_0x5e8a5b(0x3b7)?_0x5e8a5b(0x54c):VisuMZ[_0x5e8a5b(0x502)]['Settings'][_0x5e8a5b(0x5b4)][_0x5e8a5b(0x544)];else{if(this['isArmor'](_0x40d351)){if(_0x5e8a5b(0x543)===_0x5e8a5b(0x1df)){const _0xa77b05=this['_item'];this[_0x5e8a5b(0x4b0)]=_0x24d6cc;const _0x3df97c=this[_0x5e8a5b(0x30f)]();return this[_0x5e8a5b(0x4b0)]=_0xa77b05,_0x3df97c;}else return VisuMZ['ItemsEquipsCore'][_0x5e8a5b(0x524)][_0x5e8a5b(0x5b4)][_0x5e8a5b(0x645)];}}}},DataManager[_0x14015d(0x3ac)]=function(_0x1d330f){const _0x3c79f9=_0x14015d;_0x1d330f=_0x1d330f[_0x3c79f9(0x34e)]()[_0x3c79f9(0x4e3)](),this[_0x3c79f9(0x58e)]=this[_0x3c79f9(0x58e)]||{};if(this[_0x3c79f9(0x58e)][_0x1d330f])return this['_itemIDs'][_0x1d330f];for(const _0x71b1cc of $dataItems){if(!_0x71b1cc)continue;this['_itemIDs'][_0x71b1cc[_0x3c79f9(0x4c6)][_0x3c79f9(0x34e)]()['trim']()]=_0x71b1cc['id'];}return this['_itemIDs'][_0x1d330f]||0x0;},DataManager[_0x14015d(0x542)]=function(_0x2b89b3){const _0x539fd5=_0x14015d;_0x2b89b3=_0x2b89b3[_0x539fd5(0x34e)]()[_0x539fd5(0x4e3)](),this[_0x539fd5(0x274)]=this[_0x539fd5(0x274)]||{};if(this[_0x539fd5(0x274)][_0x2b89b3])return this[_0x539fd5(0x274)][_0x2b89b3];for(const _0x530e73 of $dataWeapons){if(!_0x530e73)continue;this[_0x539fd5(0x274)][_0x530e73[_0x539fd5(0x4c6)]['toUpperCase']()[_0x539fd5(0x4e3)]()]=_0x530e73['id'];}return this[_0x539fd5(0x274)][_0x2b89b3]||0x0;},DataManager[_0x14015d(0x55d)]=function(_0x425617){const _0x48aff2=_0x14015d;_0x425617=_0x425617[_0x48aff2(0x34e)]()[_0x48aff2(0x4e3)](),this[_0x48aff2(0x34d)]=this[_0x48aff2(0x34d)]||{};if(this['_armorIDs'][_0x425617])return this[_0x48aff2(0x34d)][_0x425617];for(const _0x4bd238 of $dataArmors){if(_0x48aff2(0x36a)!==_0x48aff2(0x41d)){if(!_0x4bd238)continue;this[_0x48aff2(0x34d)][_0x4bd238[_0x48aff2(0x4c6)][_0x48aff2(0x34e)]()['trim']()]=_0x4bd238['id'];}else _0x52710e=_0x48aff2(0x4a1)[_0x48aff2(0x2c8)](_0x50eda6['id']);}return this[_0x48aff2(0x34d)][_0x425617]||0x0;},VisuMZ['ItemsEquipsCore']['SetupProxyItemGroups']=function(){const _0x250487=_0x14015d;VisuMZ[_0x250487(0x502)]['SetupProxyItemGroup']($dataItems),VisuMZ[_0x250487(0x502)][_0x250487(0x55c)]($dataWeapons),VisuMZ[_0x250487(0x502)][_0x250487(0x55c)]($dataArmors);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x55c)]=function(_0x2988f6){const _0xe58afc=_0x14015d;for(const _0x4cafa0 of _0x2988f6){if(!_0x4cafa0)continue;if(!DataManager[_0xe58afc(0x392)](_0x4cafa0))continue;const _0x38ff9c=DataManager[_0xe58afc(0x473)](_0x4cafa0),_0x2c4424=['name',_0xe58afc(0x612),_0xe58afc(0x53e)];for(const _0x3021dd of _0x2c4424){_0x4cafa0[_0x3021dd]=_0x38ff9c[_0x3021dd];}}},DataManager[_0x14015d(0x392)]=function(_0x13acde){const _0x42dc0e=_0x14015d;if(!_0x13acde)return![];if(!_0x13acde[_0x42dc0e(0x4f1)])return![];return _0x13acde&&_0x13acde['note'][_0x42dc0e(0x497)](/<PROXY:[ ](.*)>/i);},DataManager[_0x14015d(0x473)]=function(_0x1d034d){const _0x15f1bc=_0x14015d;if(this[_0x15f1bc(0x392)](_0x1d034d))return _0x1d034d=this[_0x15f1bc(0x22e)](_0x1d034d)||_0x1d034d,this['isProxyItem'](_0x1d034d)?this[_0x15f1bc(0x473)](_0x1d034d):_0x1d034d;else{if(_0x15f1bc(0x2ca)!=='immzU')return _0x1d034d;else this[_0x15f1bc(0x4ba)]=_0x253e37[_0x15f1bc(0x3ea)][_0x15f1bc(0x37d)]();}},DataManager[_0x14015d(0x22e)]=function(_0x1ae2f6){const _0x2a56bc=_0x14015d;_0x1ae2f6['note'][_0x2a56bc(0x497)](/<PROXY:[ ](.*)>/i);const _0x42275a=RegExp['$1'][_0x2a56bc(0x4e3)](),_0x154b52=/^\d+$/[_0x2a56bc(0x2c0)](_0x42275a);if(this[_0x2a56bc(0x342)](_0x1ae2f6)){if(_0x2a56bc(0x530)===_0x2a56bc(0x530)){const _0x41be55=_0x154b52?Number(RegExp['$1']):DataManager[_0x2a56bc(0x3ac)](_0x42275a);return $dataItems[_0x41be55]||_0x1ae2f6;}else{const _0x130167=_0x5a2ae2[_0x2a56bc(0x52d)];this['drawItemKeyData'](_0x130167,_0x8607d3,_0x2a34e2,_0x36d039,!![]);const _0x327acf=this['getItemQuantityText']();this[_0x2a56bc(0x355)](_0x327acf,_0x2f3ada,_0x5b78ab,_0x48ef69,![],'right');}}else{if(this[_0x2a56bc(0x3ec)](_0x1ae2f6)){const _0x311310=_0x154b52?Number(RegExp['$1']):DataManager[_0x2a56bc(0x542)](_0x42275a);return $dataWeapons[_0x311310]||_0x1ae2f6;}else{if(this[_0x2a56bc(0x48d)](_0x1ae2f6)){if('dCoAq'!==_0x2a56bc(0x5e4))return _0x45b11e['ItemsEquipsCore'][_0x2a56bc(0x608)][_0x2a56bc(0x207)](this);else{const _0x4ffead=_0x154b52?Number(RegExp['$1']):DataManager['getArmorIdWithName'](_0x42275a);return $dataArmors[_0x4ffead]||_0x1ae2f6;}}}}return _0x1ae2f6;},VisuMZ[_0x14015d(0x502)]['Window_ItemList_item']=Window_ItemList[_0x14015d(0x39a)][_0x14015d(0x5e5)],Window_ItemList[_0x14015d(0x39a)][_0x14015d(0x5e5)]=function(){const _0x1b5891=_0x14015d;if($gameTemp[_0x1b5891(0x442)])return VisuMZ['ItemsEquipsCore'][_0x1b5891(0x1fb)][_0x1b5891(0x207)](this);return DataManager[_0x1b5891(0x473)](VisuMZ[_0x1b5891(0x502)][_0x1b5891(0x1fb)][_0x1b5891(0x207)](this));},Window_ItemList['prototype'][_0x14015d(0x38b)]=function(){const _0x506283=_0x14015d;return VisuMZ[_0x506283(0x502)][_0x506283(0x1fb)][_0x506283(0x207)](this);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x522)]=Window_ShopBuy[_0x14015d(0x39a)][_0x14015d(0x5e5)],Window_ShopBuy[_0x14015d(0x39a)][_0x14015d(0x5e5)]=function(){const _0x1d4768=_0x14015d;if($gameTemp[_0x1d4768(0x442)])return VisuMZ['ItemsEquipsCore'][_0x1d4768(0x522)][_0x1d4768(0x207)](this);return DataManager[_0x1d4768(0x473)](VisuMZ[_0x1d4768(0x502)]['Window_ShopBuy_item'][_0x1d4768(0x207)](this));},Window_ShopBuy[_0x14015d(0x39a)]['proxyItem']=function(){const _0x5c8408=_0x14015d;return VisuMZ[_0x5c8408(0x502)]['Window_ShopBuy_item']['call'](this);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x62e)]=Window_ShopStatus['prototype'][_0x14015d(0x60b)],Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x60b)]=function(_0x46457b){const _0x527408=_0x14015d;_0x46457b=DataManager[_0x527408(0x473)](_0x46457b),VisuMZ[_0x527408(0x502)][_0x527408(0x62e)][_0x527408(0x207)](this,_0x46457b);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x322)]=Game_Item[_0x14015d(0x39a)][_0x14015d(0x3b9)],Game_Item[_0x14015d(0x39a)][_0x14015d(0x3b9)]=function(_0x2a0ef2){const _0x14cb94=_0x14015d;if(DataManager['isProxyItem'](_0x2a0ef2))return;VisuMZ['ItemsEquipsCore'][_0x14cb94(0x322)][_0x14cb94(0x207)](this,_0x2a0ef2);},DataManager[_0x14015d(0x5d0)]=function(_0x2f3389){const _0x235862=_0x14015d;if(!this[_0x235862(0x48d)](_0x2f3389))return![];const _0xf99f28=_0x2f3389[_0x235862(0x4f1)];if(!_0xf99f28)return![];if(_0xf99f28[_0x235862(0x497)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0xf99f28[_0x235862(0x497)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0xf99f28[_0x235862(0x497)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0xf99f28[_0x235862(0x497)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x14015d(0x2d1)]=function(_0x3e880a){const _0x5aba79=_0x14015d;if(!this[_0x5aba79(0x5d0)](_0x3e880a))return![];const _0x5e39a9=_0x3e880a[_0x5aba79(0x4f1)];if(!_0x5e39a9)return![];if(_0x5e39a9[_0x5aba79(0x497)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x5e39a9[_0x5aba79(0x497)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x14015d(0x27b)]=function(_0x42b355){const _0x3b2c47=_0x14015d;if(!this[_0x3b2c47(0x5d0)](_0x42b355))return![];const _0x4f030f=_0x42b355[_0x3b2c47(0x4f1)];if(!_0x4f030f)return![];if(_0x4f030f['match'](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x4f030f[_0x3b2c47(0x497)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x14015d(0x56a)]=function(_0x3aeac6){const _0x38e59b=_0x14015d;if(!this['isArtifact'](_0x3aeac6))return![];const _0x432ad9=_0x3aeac6[_0x38e59b(0x4f1)];if(!_0x432ad9)return![];if(_0x432ad9[_0x38e59b(0x497)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x432ad9['match'](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},VisuMZ[_0x14015d(0x502)][_0x14015d(0x62f)]=Game_BattlerBase['prototype'][_0x14015d(0x2a4)],Game_BattlerBase['prototype'][_0x14015d(0x2a4)]=function(_0x891592){const _0x4d9eed=_0x14015d;if(DataManager['isArtifact'](_0x891592))return![];return VisuMZ[_0x4d9eed(0x502)][_0x4d9eed(0x62f)][_0x4d9eed(0x207)](this,_0x891592);},VisuMZ[_0x14015d(0x502)]['Game_BattlerBase_param_artifact']=Game_BattlerBase[_0x14015d(0x39a)][_0x14015d(0x245)],Game_BattlerBase[_0x14015d(0x39a)][_0x14015d(0x245)]=function(_0x52fe2e){const _0x4a3110=_0x14015d;this['_allowArtifactParamBase']=!![];const _0x3a41d6=VisuMZ[_0x4a3110(0x502)][_0x4a3110(0x343)][_0x4a3110(0x207)](this,_0x52fe2e);return this[_0x4a3110(0x3dc)]=undefined,_0x3a41d6;},VisuMZ[_0x14015d(0x502)][_0x14015d(0x4a4)]=Game_Actor[_0x14015d(0x39a)][_0x14015d(0x2e3)],Game_Actor[_0x14015d(0x39a)][_0x14015d(0x2e3)]=function(){const _0x32e65b=_0x14015d;this[_0x32e65b(0x23a)]=!![];const _0x103b95=VisuMZ[_0x32e65b(0x502)][_0x32e65b(0x4a4)]['call'](this);return this[_0x32e65b(0x23a)]=undefined,_0x103b95;},VisuMZ[_0x14015d(0x502)][_0x14015d(0x379)]=Game_Actor['prototype']['equips'],Game_Actor[_0x14015d(0x39a)][_0x14015d(0x520)]=function(){const _0x1abb11=_0x14015d,_0x5ae166=VisuMZ[_0x1abb11(0x502)][_0x1abb11(0x379)][_0x1abb11(0x207)](this);if(this[_0x1abb11(0x23a)]||this[_0x1abb11(0x3dc)]){if(_0x1abb11(0x5b7)===_0x1abb11(0x5b7)){const _0x4f2a04=_0x5ae166[_0x1abb11(0x22b)]($gameParty[_0x1abb11(0x229)]());return _0x4f2a04;}else{const _0x5607a3=_0x262737[_0x4f062e];if(_0x5607a3&&_0x5607a3[_0x1abb11(0x612)]>0x0){_0x2c3370+=_0x1abb11(0x3f9)[_0x1abb11(0x2c8)](_0x5607a3['iconIndex']),_0x3350c8++;if(_0x490bf2>=_0x5a51ab)return _0x5e993e;}}}else return _0x5ae166;},VisuMZ[_0x14015d(0x502)][_0x14015d(0x353)]=Game_BattlerBase['prototype'][_0x14015d(0x416)],Game_BattlerBase[_0x14015d(0x39a)][_0x14015d(0x416)]=function(_0x12130b){const _0x39684d=_0x14015d;let _0x212552=VisuMZ[_0x39684d(0x502)][_0x39684d(0x353)]['call'](this,_0x12130b);if(this[_0x39684d(0x603)]===Game_Enemy)for(const _0xbfbda0 of $gameParty[_0x39684d(0x22d)]()){if(_0xbfbda0)_0x212552+=_0xbfbda0['params'][_0x12130b];}return _0x212552;},VisuMZ['ItemsEquipsCore']['Game_Enemy_traitObjects_artifact']=Game_Enemy[_0x14015d(0x39a)][_0x14015d(0x2e3)],Game_Enemy['prototype'][_0x14015d(0x2e3)]=function(){const _0x65011f=_0x14015d;let _0x3b72d7=VisuMZ['ItemsEquipsCore'][_0x65011f(0x1ee)][_0x65011f(0x207)](this);return _0x3b72d7[_0x65011f(0x22b)]($gameParty[_0x65011f(0x22d)]());},VisuMZ['ItemsEquipsCore'][_0x14015d(0x48b)]=Game_Party[_0x14015d(0x39a)][_0x14015d(0x3cc)],Game_Party['prototype']['gainItem']=function(_0x51889c,_0x1ecd35,_0x4032e5){const _0x42e380=_0x14015d;VisuMZ[_0x42e380(0x502)][_0x42e380(0x48b)][_0x42e380(0x207)](this,_0x51889c,_0x1ecd35,_0x4032e5);if(DataManager[_0x42e380(0x5d0)](_0x51889c)){let _0x361fc4=$gameParty[_0x42e380(0x21d)]();if($gameParty[_0x42e380(0x503)]())_0x361fc4=_0x361fc4['concat']($gameTroop[_0x42e380(0x350)]());for(const _0x4575e9 of $gameTroop[_0x42e380(0x350)]()){if('Tfxhl'===_0x42e380(0x314)){if(!_0x4575e9)continue;_0x4575e9[_0x42e380(0x5e0)]={};}else _0x26243f[_0x42e380(0x502)][_0x42e380(0x4cf)][_0x42e380(0x207)](this,_0x185a65),_0x4a0d11[_0x42e380(0x502)][_0x42e380(0x510)](_0x324ec3,_0x59e508);}}},Game_Party[_0x14015d(0x39a)][_0x14015d(0x229)]=function(){const _0x1ac00f=_0x14015d;let _0x1a0c96=[];for(const _0x41822e of this[_0x1ac00f(0x452)]()){if(!_0x41822e)continue;if(!DataManager[_0x1ac00f(0x5d0)](_0x41822e))continue;if(!DataManager[_0x1ac00f(0x27b)](_0x41822e))continue;let _0x1058a7=0x1;if(DataManager[_0x1ac00f(0x2d1)](_0x41822e))_0x1058a7=this[_0x1ac00f(0x570)](_0x41822e);while(_0x1058a7--)_0x1a0c96[_0x1ac00f(0x58d)](_0x41822e);}return _0x1a0c96;},Game_Party[_0x14015d(0x39a)][_0x14015d(0x22d)]=function(){const _0x53e534=_0x14015d;let _0x2db196=[];for(const _0x2566db of this['armors']()){if(!_0x2566db)continue;if(!DataManager[_0x53e534(0x5d0)](_0x2566db))continue;if(!DataManager[_0x53e534(0x56a)](_0x2566db))continue;let _0x15f5cb=0x1;if(DataManager[_0x53e534(0x2d1)](_0x2566db))_0x15f5cb=this['numItems'](_0x2566db);while(_0x15f5cb--)_0x2db196['push'](_0x2566db);}return _0x2db196;},Game_Party['prototype'][_0x14015d(0x237)]=function(){const _0x5b0b19=_0x14015d;return this[_0x5b0b19(0x229)]()[_0x5b0b19(0x22b)](this['troopArtifacts']());},VisuMZ[_0x14015d(0x502)][_0x14015d(0x20e)]=Game_Party[_0x14015d(0x39a)][_0x14015d(0x20c)],Game_Party[_0x14015d(0x39a)][_0x14015d(0x20c)]=function(){const _0x3a196d=_0x14015d;VisuMZ[_0x3a196d(0x502)][_0x3a196d(0x20e)]['call'](this),this[_0x3a196d(0x271)]();},Game_Party['prototype']['removeBattleTestArtifacts']=function(){const _0x2e9d2=_0x14015d,_0x134ab9=$gameParty[_0x2e9d2(0x452)]()[_0x2e9d2(0x515)](_0x55d99a=>DataManager['isArtifact'](_0x55d99a));for(const _0x523b83 of _0x134ab9){if(_0x2e9d2(0x387)!==_0x2e9d2(0x387))return this[_0x2e9d2(0x398)]()?this[_0x2e9d2(0x345)]():_0x188735['ItemsEquipsCore'][_0x2e9d2(0x3df)][_0x2e9d2(0x207)](this);else{const _0x4d22e3=this['numItems'](_0x523b83);if(_0x4d22e3)this['loseItem'](_0x523b83,_0x4d22e3);}}},ColorManager['getItemColor']=function(_0x3a5784){const _0x5be961=_0x14015d;if(!_0x3a5784)return this[_0x5be961(0x26b)]();else{if(_0x3a5784[_0x5be961(0x4f1)][_0x5be961(0x497)](/<COLOR:[ ](\d+)>/i))return this[_0x5be961(0x4fd)](Number(RegExp['$1'])['clamp'](0x0,0x1f));else return _0x3a5784['note'][_0x5be961(0x497)](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x5be961(0x26b)]();}},ColorManager[_0x14015d(0x2b1)]=function(_0x1e8856){const _0x40fa2f=_0x14015d;_0x1e8856=String(_0x1e8856);if(_0x1e8856[_0x40fa2f(0x497)](/#(.*)/i))return _0x40fa2f(0x677)[_0x40fa2f(0x2c8)](String(RegExp['$1']));else{if(_0x40fa2f(0x40e)===_0x40fa2f(0x210)){if(_0x1495b8[_0x40fa2f(0x663)](_0x395629))return!![];}else return this['textColor'](Number(_0x1e8856));}},SceneManager[_0x14015d(0x5a7)]=function(){const _0xe66863=_0x14015d;return this[_0xe66863(0x3ea)]&&this[_0xe66863(0x3ea)][_0xe66863(0x603)]===Scene_Shop;},Game_Temp[_0x14015d(0x39a)][_0x14015d(0x44f)]=function(){const _0x15e8a8=_0x14015d;if(this[_0x15e8a8(0x2c3)])return![];return VisuMZ[_0x15e8a8(0x502)][_0x15e8a8(0x524)][_0x15e8a8(0x533)][_0x15e8a8(0x220)];},VisuMZ[_0x14015d(0x376)]=VisuMZ['ItemsEquipsCore'][_0x14015d(0x524)]['StatusWindow'][_0x14015d(0x563)],VisuMZ[_0x14015d(0x502)][_0x14015d(0x4a2)]=Game_BattlerBase['prototype'][_0x14015d(0x245)],Game_BattlerBase[_0x14015d(0x39a)][_0x14015d(0x245)]=function(_0x1c86e0){const _0x32c2c8=_0x14015d;if(this['_shopStatusMenuMode']){if(_0x32c2c8(0x5ff)!=='okQjH'){const _0x439719=_0x26d21e[_0x26e90e];if(_0x439719&&_0x439719[_0x32c2c8(0x612)]>0x0){_0x1a0eb2+='\x5cI[%1]'[_0x32c2c8(0x2c8)](_0x439719[_0x32c2c8(0x612)]),_0x3e2016++;if(_0x263cf0>=_0x3d0b41)return _0x32ed3e;}}else return this[_0x32c2c8(0x3dd)]?VisuMZ[_0x32c2c8(0x376)]:0x1;}else return VisuMZ['ItemsEquipsCore'][_0x32c2c8(0x4a2)][_0x32c2c8(0x207)](this,_0x1c86e0);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x244)]=Game_BattlerBase[_0x14015d(0x39a)][_0x14015d(0x635)],Game_BattlerBase['prototype']['meetsItemConditions']=function(_0x2ed782){const _0x21c8f4=_0x14015d;if(!_0x2ed782)return![];if(!VisuMZ[_0x21c8f4(0x502)]['Game_BattlerBase_meetsItemConditions'][_0x21c8f4(0x207)](this,_0x2ed782))return![];if(!this['meetsItemConditionsNotetags'](_0x2ed782))return![];if(!this[_0x21c8f4(0x4ca)](_0x2ed782))return![];return!![];},Game_BattlerBase[_0x14015d(0x39a)]['meetsItemConditionsNotetags']=function(_0x2ba8a9){const _0x3b0eaf=_0x14015d;if(!this[_0x3b0eaf(0x2c6)](_0x2ba8a9))return![];return!![];},Game_BattlerBase[_0x14015d(0x39a)][_0x14015d(0x2c6)]=function(_0x17ddd4){const _0x40ee07=_0x14015d,_0x454dfb=_0x17ddd4['note'];if(_0x454dfb[_0x40ee07(0x497)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x40ee07(0x377)===_0x40ee07(0x5c7))this[_0x40ee07(0x37a)](_0x50e2aa,_0x55fe88['x'],_0x4c72ef['y'],_0x305246);else{const _0xbc6ec0=JSON[_0x40ee07(0x35c)]('['+RegExp['$1'][_0x40ee07(0x497)](/\d+/g)+']');for(const _0x271568 of _0xbc6ec0){if('XiQeS'===_0x40ee07(0x301))return this[_0x40ee07(0x2a7)]()?![]:_0x1996ef['prototype']['isHoverEnabled']['call'](this);else{if(!$gameSwitches['value'](_0x271568))return![];}}return!![];}}if(_0x454dfb[_0x40ee07(0x497)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x40ee07(0x28d)!==_0x40ee07(0x28d))_0x5dd333+=_0x5efc48(_0x53fec7['$1']);else{const _0x422fa6=JSON[_0x40ee07(0x35c)]('['+RegExp['$1'][_0x40ee07(0x497)](/\d+/g)+']');for(const _0x1c655a of _0x422fa6){if('pAtjt'!==_0x40ee07(0x4ab)){if(!$gameSwitches[_0x40ee07(0x663)](_0x1c655a))return![];}else{const _0x22963f=_0x4bb07a['parse']('['+_0x24beec['$1'][_0x40ee07(0x497)](/\d+/g)+']');for(const _0x48d4c6 of _0x22963f){if(_0x43544b[_0x40ee07(0x663)](_0x48d4c6))return!![];}return![];}}return!![];}}if(_0x454dfb[_0x40ee07(0x497)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2780ad=JSON[_0x40ee07(0x35c)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x17176a of _0x2780ad){if(_0x40ee07(0x43a)!==_0x40ee07(0x43a))this[_0x40ee07(0x2fa)]={},this['_newLabelOpacity']=0xff,this[_0x40ee07(0x652)]=_0xee4c8e[_0x40ee07(0x502)][_0x40ee07(0x524)][_0x40ee07(0x533)]['FadeSpeed'],this['_newLabelOpacityUpperLimit']=_0x2089d2[_0x40ee07(0x502)][_0x40ee07(0x524)]['New'][_0x40ee07(0x5cf)];else{if($gameSwitches[_0x40ee07(0x663)](_0x17176a))return!![];}}return![];}if(_0x454dfb[_0x40ee07(0x497)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('BQGxb'!=='BQGxb')_0x4b1d0d[_0x40ee07(0x502)][_0x40ee07(0x26f)][_0x40ee07(0x207)](this,_0xb67a6),_0x58ee08['ItemsEquipsCore'][_0x40ee07(0x510)](_0x34fe60,_0x32dcac);else{const _0x3c2d5e=JSON[_0x40ee07(0x35c)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x30e6c1 of _0x3c2d5e){if(_0x40ee07(0x590)===_0x40ee07(0x211))this[_0x40ee07(0x4b2)]();else{if(!$gameSwitches['value'](_0x30e6c1))return!![];}}return![];}}if(_0x454dfb[_0x40ee07(0x497)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x40ee07(0x632)===_0x40ee07(0x3f3))_0x46a0c6['a']=_0x201dc0,_0x2e5e88['b']=_0x355a27;else{const _0x37e72d=JSON[_0x40ee07(0x35c)]('['+RegExp['$1'][_0x40ee07(0x497)](/\d+/g)+']');for(const _0x3dfbcb of _0x37e72d){if(!$gameSwitches[_0x40ee07(0x663)](_0x3dfbcb))return!![];}return![];}}if(_0x454dfb['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x40ee07(0x516)===_0x40ee07(0x516)){const _0x4f0e9a=JSON['parse']('['+RegExp['$1'][_0x40ee07(0x497)](/\d+/g)+']');for(const _0x4f5fa4 of _0x4f0e9a){if($gameSwitches[_0x40ee07(0x663)](_0x4f5fa4))return![];}return!![];}else return _0x23fff4[_0x40ee07(0x502)][_0x40ee07(0x524)][_0x40ee07(0x661)][_0x40ee07(0x65d)];}return!![];},Game_BattlerBase[_0x14015d(0x39a)][_0x14015d(0x4ca)]=function(_0xdf795a){const _0x8c068e=_0x14015d,_0xe1f042=_0xdf795a[_0x8c068e(0x4f1)],_0x40685f=VisuMZ[_0x8c068e(0x502)][_0x8c068e(0x3bc)];return _0x40685f[_0xdf795a['id']]?_0x40685f[_0xdf795a['id']]['call'](this,_0xdf795a):!![];},Game_Actor['prototype'][_0x14015d(0x50f)]=function(_0x278d6b){const _0x4ac777=_0x14015d;_0x278d6b=this[_0x4ac777(0x291)](_0x278d6b);const _0x97ae71=this['equipSlots']();this[_0x4ac777(0x2af)]=[];for(let _0x14010b=0x0;_0x14010b<_0x97ae71[_0x4ac777(0x536)];_0x14010b++){this[_0x4ac777(0x2af)][_0x14010b]=new Game_Item();}for(let _0x1baf1a=0x0;_0x1baf1a<_0x97ae71['length'];_0x1baf1a++){const _0xadccd0=_0x97ae71[_0x1baf1a],_0x4e05a0=this[_0x4ac777(0x5d8)](_0x278d6b,_0xadccd0);if(this[_0x4ac777(0x2a4)](_0x4e05a0))this[_0x4ac777(0x2af)][_0x1baf1a][_0x4ac777(0x3b9)](_0x4e05a0);}this[_0x4ac777(0x51b)](!![]),this[_0x4ac777(0x4f8)]();},Game_Actor[_0x14015d(0x39a)][_0x14015d(0x291)]=function(_0x4ea979){const _0x45088a=_0x14015d,_0x3527bb=[];for(let _0x3884a6=0x0;_0x3884a6<_0x4ea979['length'];_0x3884a6++){const _0x3cfd67=_0x4ea979[_0x3884a6];if(_0x3cfd67<=0x0)continue;const _0x184b61=$dataSystem[_0x45088a(0x622)][_0x3884a6+0x1];if(_0x184b61===$dataSystem[_0x45088a(0x622)][0x1]||_0x3884a6===0x1&&this[_0x45088a(0x41f)]())_0x3527bb[_0x45088a(0x58d)]($dataWeapons[_0x3cfd67]);else{if(BattleManager['isBattleTest']()){const _0x1ee6de=$dataArmors[_0x3cfd67];_0x1ee6de&&_0x1ee6de['etypeId']===_0x3884a6+0x1&&_0x3527bb[_0x45088a(0x58d)](_0x1ee6de);}else{if(_0x45088a(0x5c0)==='kWWJa')return _0x5e1c95['ItemsEquipsCore'][_0x45088a(0x53a)]['call'](this);else{const _0x16fae0=$dataArmors[_0x3cfd67];_0x16fae0&&_0x16fae0[_0x45088a(0x59b)]===_0x3884a6+0x1&&_0x3527bb[_0x45088a(0x58d)](_0x16fae0);}}}}return _0x3527bb;},Game_Actor[_0x14015d(0x39a)][_0x14015d(0x5d8)]=function(_0x13afd9,_0x1b8583){const _0x1a5c5f=_0x14015d;for(const _0x1d0c0c of _0x13afd9){if(_0x1a5c5f(0x62a)!=='gkyDE'){const _0xcac23b=_0xa7fa03[_0x1a5c5f(0x657)]()[_0x1a5c5f(0x42c)](_0x54ef64),_0x7de287=_0xf4fa92+_0x3692c1+_0xcac23b*_0x13bbd7;this['changePaintOpacity'](_0x5995f2[_0x1a5c5f(0x2a4)](this[_0x1a5c5f(0x4b0)])),this['drawActorCharacter'](_0xf6583a,_0x7de287+_0x1ebc9e/0x2,_0x700ef9);let _0x4b735d=_0x43e07d;for(const _0x5a6f69 of _0xc85f06){const _0x3b66c7=_0x4b735d-(_0x3dc8e5-_0x17b084)/0x2;this[_0x1a5c5f(0x579)](_0x355ac3,_0x5a6f69,_0x7de287,_0x3b66c7,_0x116869),_0x4b735d+=_0x404ff8;}}else{if(!_0x1d0c0c)continue;if(_0x1d0c0c[_0x1a5c5f(0x59b)]===_0x1b8583)return _0x13afd9[_0x1a5c5f(0x29c)](_0x13afd9[_0x1a5c5f(0x42c)](_0x1d0c0c),0x1),_0x1d0c0c;}}return null;},Game_Actor[_0x14015d(0x39a)][_0x14015d(0x30c)]=function(){const _0x4be36d=_0x14015d,_0x51e1e6=JsonEx[_0x4be36d(0x362)](this[_0x4be36d(0x47c)]||this[_0x4be36d(0x3d3)]()['equipSlots']);if(_0x51e1e6['length']>=0x2&&this[_0x4be36d(0x41f)]())_0x51e1e6[0x1]=0x1;return _0x51e1e6;},Game_Actor[_0x14015d(0x39a)][_0x14015d(0x4e4)]=function(_0x456129){const _0x7f5763=_0x14015d;_0x456129[_0x7f5763(0x1e2)](0x0),_0x456129[_0x7f5763(0x1e2)](-0x1),this[_0x7f5763(0x47c)]=_0x456129,this[_0x7f5763(0x4f8)](),this[_0x7f5763(0x293)]();},Game_Actor[_0x14015d(0x39a)]['forceResetEquipSlots']=function(){const _0x52a098=_0x14015d;this[_0x52a098(0x47c)]=undefined,this[_0x52a098(0x4f8)](),this[_0x52a098(0x293)]();},Game_Actor['prototype'][_0x14015d(0x293)]=function(){const _0x55e561=_0x14015d;let _0x3f74df=this[_0x55e561(0x30c)]()[_0x55e561(0x536)];while(this[_0x55e561(0x2af)][_0x55e561(0x536)]>_0x3f74df){if(_0x55e561(0x676)===_0x55e561(0x3f2)){const _0x1b958d=_0x45aeac[_0x55e561(0x502)][_0x55e561(0x524)]['StatusWindow'],_0xbb33cc=_0x55e561(0x3b6)[_0x55e561(0x2c8)](this[_0x55e561(0x4b0)][_0x55e561(0x3f5)][_0x55e561(0x32f)]),_0x2b689f=[null,_0x226486['hp'],_0x24b099['mp'],_0x546f5d['hp'],_0x4243fc['mp'],_0x593d2e['hp'],_0x3029a3['mp']][this[_0x55e561(0x4b0)][_0x55e561(0x3f5)][_0x55e561(0x32f)]];return _0x1b958d[_0xbb33cc][_0x55e561(0x2c8)](_0x2b689f);}else{const _0x963ff7=this[_0x55e561(0x2af)][this['_equips']['length']-0x1];if(_0x963ff7&&_0x963ff7[_0x55e561(0x45e)]()){if(_0x55e561(0x43c)!==_0x55e561(0x43c))return this[_0x55e561(0x4fd)](_0x31b3af(_0x353579));else $gameParty['gainItem'](_0x963ff7[_0x55e561(0x45e)](),0x1);}this[_0x55e561(0x2af)][_0x55e561(0x38f)]();}}while(_0x3f74df>this[_0x55e561(0x2af)][_0x55e561(0x536)]){this[_0x55e561(0x2af)]['push'](new Game_Item());}},Game_Actor[_0x14015d(0x39a)][_0x14015d(0x4d4)]=function(){const _0x78f39d=_0x14015d,_0x1e84b5=this[_0x78f39d(0x30c)]();for(let _0x358a22=0x0;_0x358a22<_0x1e84b5[_0x78f39d(0x536)];_0x358a22++){if(_0x78f39d(0x347)!==_0x78f39d(0x36e)){if(!this[_0x78f39d(0x2af)][_0x358a22])this[_0x78f39d(0x2af)][_0x358a22]=new Game_Item();}else{if(!this['isEquipItem']()&&!_0xd03525[_0x78f39d(0x342)](this[_0x78f39d(0x4b0)]))return![];if(_0x1b6845['isKeyItem'](this[_0x78f39d(0x4b0)])&&!_0x43a8c8['optKeyItemsNumber']){const _0x282cd3=_0x57ad55[_0x78f39d(0x31b)];this['drawItemKeyData'](_0x282cd3,_0x1591f0,_0x2673e1,_0x351c2a,!![],'center');}else{const _0x38fceb=_0x5c2996['possession'];this['drawItemKeyData'](_0x38fceb,_0x5b9fe0,_0xe73e4f,_0x5941af,!![]);const _0x312043=this[_0x78f39d(0x541)]();this[_0x78f39d(0x355)](_0x312043,_0x21142d,_0x1915cc,_0xe4db3c,![],_0x78f39d(0x668));}return this['drawItemDarkRect'](_0x76600b,_0xe2fbc9,_0xb1eb03),this['resetFontSettings'](),!![];}}this['releaseUnequippableItems'](![]),this[_0x78f39d(0x4f8)]();},VisuMZ[_0x14015d(0x502)][_0x14015d(0x21f)]=Game_Actor[_0x14015d(0x39a)]['changeEquip'],Game_Actor['prototype'][_0x14015d(0x397)]=function(_0x5c450e,_0x3e8a5d){const _0x3f1222=_0x14015d;if(!this[_0x3f1222(0x509)]){const _0x8f6dd0=JsonEx[_0x3f1222(0x362)](this);_0x8f6dd0['_tempActor']=!![],VisuMZ[_0x3f1222(0x502)][_0x3f1222(0x21f)][_0x3f1222(0x207)](this,_0x5c450e,_0x3e8a5d),this[_0x3f1222(0x5a0)](_0x8f6dd0);}else VisuMZ['ItemsEquipsCore'][_0x3f1222(0x21f)]['call'](this,_0x5c450e,_0x3e8a5d);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x3d8)]=Game_Actor[_0x14015d(0x39a)][_0x14015d(0x2f1)],Game_Actor['prototype'][_0x14015d(0x2f1)]=function(_0x2698a4,_0x133339){const _0x251fd6=_0x14015d;if(!this[_0x251fd6(0x509)]){if(_0x251fd6(0x3cd)!==_0x251fd6(0x3cd))_0xf6cbbf[_0x251fd6(0x502)]['Game_Party_initialize'][_0x251fd6(0x207)](this),this[_0x251fd6(0x2aa)]();else{const _0x1736b9=JsonEx[_0x251fd6(0x362)](this);_0x1736b9[_0x251fd6(0x509)]=!![],VisuMZ[_0x251fd6(0x502)][_0x251fd6(0x3d8)][_0x251fd6(0x207)](this,_0x2698a4,_0x133339),this['equipAdjustHpMp'](_0x1736b9);}}else _0x251fd6(0x519)==='sLixt'?VisuMZ[_0x251fd6(0x502)]['Game_Actor_forceChangeEquip'][_0x251fd6(0x207)](this,_0x2698a4,_0x133339):this[_0x251fd6(0x620)][_0x251fd6(0x61b)](this[_0x251fd6(0x3c8)]);},VisuMZ[_0x14015d(0x502)]['Game_Actor_discardEquip']=Game_Actor[_0x14015d(0x39a)][_0x14015d(0x666)],Game_Actor[_0x14015d(0x39a)][_0x14015d(0x666)]=function(_0x5aeded){const _0x3fbd1b=_0x14015d;if(!this['_tempActor']){const _0xc1b233=JsonEx[_0x3fbd1b(0x362)](this);_0xc1b233[_0x3fbd1b(0x509)]=!![],VisuMZ[_0x3fbd1b(0x502)][_0x3fbd1b(0x396)][_0x3fbd1b(0x207)](this,_0x5aeded),this[_0x3fbd1b(0x5a0)](_0xc1b233);}else{if(_0x3fbd1b(0x268)===_0x3fbd1b(0x598))return _0x3c3a2b=this[_0x3fbd1b(0x22e)](_0x110241)||_0x2a2578,this[_0x3fbd1b(0x392)](_0xc12b47)?this[_0x3fbd1b(0x473)](_0x4b5fc7):_0x4069bb;else VisuMZ[_0x3fbd1b(0x502)][_0x3fbd1b(0x396)][_0x3fbd1b(0x207)](this,_0x5aeded);}},Game_Actor[_0x14015d(0x39a)][_0x14015d(0x51b)]=function(_0x42159d){const _0xdd406e=_0x14015d;if(this[_0xdd406e(0x4ae)])return;for(;;){if(_0xdd406e(0x5af)===_0xdd406e(0x5af)){const _0x5e8631=this[_0xdd406e(0x30c)](),_0xbb7b9b=this['equips'](),_0x2d7850=_0xbb7b9b[_0xdd406e(0x536)];let _0x2a327a=![];for(let _0x540fe7=0x0;_0x540fe7<_0x2d7850;_0x540fe7++){const _0x110144=_0xbb7b9b[_0x540fe7];if(_0x110144&&(!this['canEquip'](_0x110144)||_0x110144[_0xdd406e(0x59b)]!==_0x5e8631[_0x540fe7])){if(!_0x42159d){if('eRzgs'!==_0xdd406e(0x2ff)){const _0x5a27ae=_0x2e4452[_0xdd406e(0x35c)]('['+_0x13b1a1['$1']['match'](/\d+/g)+']');for(const _0x45bcc3 of _0x5a27ae){if(!_0xc1210f[_0xdd406e(0x663)](_0x45bcc3))return!![];}return![];}else this[_0xdd406e(0x4c0)](null,_0x110144);}if(!this['_tempActor']){if(_0xdd406e(0x32a)!==_0xdd406e(0x32a)){const _0x1d916e=this['getItemHitTypeLabel']();this[_0xdd406e(0x355)](_0x1d916e,_0x24b007,_0x28efa2,_0x1c0e43,!![]);const _0x31fba8=this[_0xdd406e(0x33f)]();return this[_0xdd406e(0x355)](_0x31fba8,_0x23e2d6,_0x4fb4fa,_0xd623fe,![],_0xdd406e(0x668)),this[_0xdd406e(0x423)](_0x2ca993,_0x5840e5,_0x259e51),this[_0xdd406e(0x647)](),!![];}else{const _0x19eb52=JsonEx[_0xdd406e(0x362)](this);_0x19eb52[_0xdd406e(0x509)]=!![],this[_0xdd406e(0x2af)][_0x540fe7][_0xdd406e(0x3b9)](null),this[_0xdd406e(0x4ae)]=!![],this[_0xdd406e(0x5a0)](_0x19eb52),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=undefined;}}else this[_0xdd406e(0x2af)][_0x540fe7][_0xdd406e(0x3b9)](null);_0x2a327a=!![];}}if(!_0x2a327a)break;}else return _0x1d2893['ItemsEquipsCore']['Settings'][_0xdd406e(0x656)][_0xdd406e(0x2b9)];}},Game_Actor[_0x14015d(0x39a)][_0x14015d(0x5a0)]=function(_0x3172b6){const _0x4ce24e=_0x14015d;if(this[_0x4ce24e(0x509)])return;if(!VisuMZ[_0x4ce24e(0x502)]['Settings'][_0x4ce24e(0x656)][_0x4ce24e(0x3eb)])return;const _0x3b8f2b=Math[_0x4ce24e(0x5a8)](_0x3172b6[_0x4ce24e(0x49b)]()*this[_0x4ce24e(0x571)]),_0x4a32c5=Math['round'](_0x3172b6[_0x4ce24e(0x39b)]()*this[_0x4ce24e(0x2cc)]);if(this['hp']>0x0)this[_0x4ce24e(0x58c)](_0x3b8f2b);if(this['mp']>0x0)this['setMp'](_0x4a32c5);},Game_Actor[_0x14015d(0x39a)][_0x14015d(0x29a)]=function(){const _0x12615f=_0x14015d,_0x1dff3f=this[_0x12615f(0x30c)]()[_0x12615f(0x536)];for(let _0x53e0f1=0x0;_0x53e0f1<_0x1dff3f;_0x53e0f1++){if(_0x12615f(0x62b)!==_0x12615f(0x62b))return _0x1577fc['ItemsEquipsCore'][_0x12615f(0x524)][_0x12615f(0x656)][_0x12615f(0x549)];else{if(this['isClearEquipOk'](_0x53e0f1))this[_0x12615f(0x397)](_0x53e0f1,null);}}},Game_Actor['prototype'][_0x14015d(0x48e)]=function(_0x5a2d18){const _0x458507=_0x14015d;if(this['nonRemovableEtypes']()[_0x458507(0x415)](this[_0x458507(0x30c)]()[_0x5a2d18]))return![];else{if(_0x458507(0x2de)==='OqTFZ')_0x254c0d[_0x458507(0x5e3)](_0x458507(0x592))&&this[_0x458507(0x573)](),_0x243611[_0x458507(0x5e3)](_0x458507(0x4ff))&&this['cursorPageup']();else return this[_0x458507(0x47f)](_0x5a2d18);}},Game_Actor[_0x14015d(0x39a)][_0x14015d(0x295)]=function(){const _0x46486b=_0x14015d;return VisuMZ[_0x46486b(0x502)][_0x46486b(0x524)][_0x46486b(0x656)][_0x46486b(0x3e9)];},Game_Actor['prototype'][_0x14015d(0x406)]=function(){const _0x1995ee=_0x14015d,_0x3b0602=this['equipSlots']()[_0x1995ee(0x536)];for(let _0x1f00c7=0x0;_0x1f00c7<_0x3b0602;_0x1f00c7++){if(this[_0x1995ee(0x3ed)](_0x1f00c7))this['changeEquip'](_0x1f00c7,null);}for(let _0x20e236=0x0;_0x20e236<_0x3b0602;_0x20e236++){if(this[_0x1995ee(0x3ed)](_0x20e236))this[_0x1995ee(0x397)](_0x20e236,this['bestEquipItem'](_0x20e236));}},Game_Actor[_0x14015d(0x39a)]['isOptimizeEquipOk']=function(_0x50dfb8){const _0x1ecef7=_0x14015d;if(this[_0x1ecef7(0x500)]()[_0x1ecef7(0x415)](this['equipSlots']()[_0x50dfb8])){if(_0x1ecef7(0x40f)!==_0x1ecef7(0x40f)){const _0x3c4838=new _0x5a59cd();return _0x5d66ba[_0x4d3ca7]=_0x3c4838,this[_0x1ecef7(0x64b)](_0x3c4838),_0x3c4838;}else return![];}else{if(_0x1ecef7(0x439)!=='jRDmf')return this[_0x1ecef7(0x47f)](_0x50dfb8);else _0x43ab9e[_0x1ecef7(0x58d)](_0x15e78b);}},Game_Actor[_0x14015d(0x39a)]['nonOptimizeEtypes']=function(){const _0x95dd27=_0x14015d;return VisuMZ[_0x95dd27(0x502)][_0x95dd27(0x524)][_0x95dd27(0x656)][_0x95dd27(0x400)];},VisuMZ[_0x14015d(0x502)][_0x14015d(0x358)]=Game_Actor[_0x14015d(0x39a)][_0x14015d(0x4c0)],Game_Actor['prototype'][_0x14015d(0x4c0)]=function(_0x44cfb1,_0x48b32e){const _0x33c166=_0x14015d;if(this[_0x33c166(0x509)])return![];$gameTemp[_0x33c166(0x2c3)]=!![];const _0xc72bb2=VisuMZ['ItemsEquipsCore']['Game_Actor_tradeItemWithParty'][_0x33c166(0x207)](this,_0x44cfb1,_0x48b32e);return $gameTemp[_0x33c166(0x2c3)]=![],_0xc72bb2;},Game_Actor[_0x14015d(0x39a)][_0x14015d(0x460)]=function(_0x3dab02,_0x3f0c26){const _0x53e6bc=this['getNextAvailableEtypeId'](_0x3dab02);if(_0x53e6bc<0x0)return;const _0x6e14c9=_0x3dab02===0x1?$dataWeapons[_0x3f0c26]:$dataArmors[_0x3f0c26];this['changeEquip'](_0x53e6bc,_0x6e14c9);},Game_Actor[_0x14015d(0x39a)][_0x14015d(0x64f)]=function(_0x319ff5){const _0x45ee82=_0x14015d;let _0x3b7722=0x0;const _0xdfa671=this[_0x45ee82(0x30c)](),_0xb64b82=this['equips']();for(let _0x56abad=0x0;_0x56abad<_0xdfa671[_0x45ee82(0x536)];_0x56abad++){if(_0x45ee82(0x239)===_0x45ee82(0x2f3))this[_0x45ee82(0x43e)](_0xe8e84d);else{if(_0xdfa671[_0x56abad]===_0x319ff5){if(_0x45ee82(0x315)!==_0x45ee82(0x315))return _0x141969[_0x45ee82(0x502)][_0x45ee82(0x3df)][_0x45ee82(0x207)](this);else{_0x3b7722=_0x56abad;if(!_0xb64b82[_0x56abad])return _0x3b7722;}}}}return _0x3b7722;},VisuMZ['ItemsEquipsCore'][_0x14015d(0x565)]=Game_Actor['prototype'][_0x14015d(0x416)],Game_Actor[_0x14015d(0x39a)][_0x14015d(0x416)]=function(_0x3a5d33){const _0x2139cb=_0x14015d;let _0x284e55=VisuMZ[_0x2139cb(0x502)][_0x2139cb(0x565)]['call'](this,_0x3a5d33);for(const _0x2c2bfc of this[_0x2139cb(0x520)]()){if(_0x2c2bfc)_0x284e55+=this[_0x2139cb(0x485)](_0x2c2bfc,_0x3a5d33);}return _0x284e55;},Game_Actor[_0x14015d(0x39a)][_0x14015d(0x485)]=function(_0x5c7a5b,_0x561725){const _0x4e5735=_0x14015d;if(this['_calculatingJSParameters'])return 0x0;const _0x358dc=(DataManager[_0x4e5735(0x3ec)](_0x5c7a5b)?'W%1':'A%1')[_0x4e5735(0x2c8)](_0x5c7a5b['id']),_0x550416=_0x4e5735(0x49f)['format'](_0x358dc,_0x561725);if(VisuMZ[_0x4e5735(0x502)][_0x4e5735(0x389)][_0x550416]){this['_calculatingJSParameters']=!![];const _0x4e02dd=VisuMZ[_0x4e5735(0x502)][_0x4e5735(0x389)][_0x550416][_0x4e5735(0x207)](this,_0x5c7a5b,_0x561725);return this[_0x4e5735(0x2e0)]=![],_0x4e02dd;}else return 0x0;},Game_Actor[_0x14015d(0x39a)]['setShopStatusWindowMode']=function(_0xaea201){const _0x371a12=_0x14015d;this['_shopStatusMenuMode']=!![],this[_0x371a12(0x3dd)]=_0xaea201;},VisuMZ['ItemsEquipsCore']['Game_Party_initialize']=Game_Party[_0x14015d(0x39a)][_0x14015d(0x2c7)],Game_Party['prototype'][_0x14015d(0x2c7)]=function(){const _0x1d769f=_0x14015d;VisuMZ[_0x1d769f(0x502)][_0x1d769f(0x483)][_0x1d769f(0x207)](this),this[_0x1d769f(0x2aa)]();},Game_Party[_0x14015d(0x39a)][_0x14015d(0x2aa)]=function(){const _0x20c214=_0x14015d;this[_0x20c214(0x5de)]=[];},Game_Party['prototype'][_0x14015d(0x642)]=function(_0x5d7556){const _0x3c6f3f=_0x14015d;if(!$gameTemp['newLabelEnabled']())return![];if(this[_0x3c6f3f(0x5de)]===undefined)this['initNewItemsList']();let _0x6d8da4='';if(DataManager[_0x3c6f3f(0x342)](_0x5d7556))_0x6d8da4=_0x3c6f3f(0x388)[_0x3c6f3f(0x2c8)](_0x5d7556['id']);else{if(DataManager[_0x3c6f3f(0x3ec)](_0x5d7556)){if(_0x3c6f3f(0x409)!==_0x3c6f3f(0x331))_0x6d8da4=_0x3c6f3f(0x3da)['format'](_0x5d7556['id']);else return this[_0x3c6f3f(0x555)]()[_0x3c6f3f(0x497)](/LOWER/i);}else{if(DataManager['isArmor'](_0x5d7556))_0x6d8da4='armor-%1'[_0x3c6f3f(0x2c8)](_0x5d7556['id']);else{if('JesWP'==='oVIGY'){const _0x3d7ed7=_0x52acd5['parse']('['+_0x16eb23['$1']['match'](/\d+/g)+']');for(const _0x284beb of _0x3d7ed7){if(_0x194562[_0x3c6f3f(0x663)](_0x284beb))return![];}return!![];}else return;}}}return this[_0x3c6f3f(0x5de)][_0x3c6f3f(0x415)](_0x6d8da4);},Game_Party[_0x14015d(0x39a)][_0x14015d(0x5d6)]=function(_0x11639c){const _0x3f347e=_0x14015d;if(!$gameTemp[_0x3f347e(0x44f)]())return;if(this[_0x3f347e(0x5de)]===undefined)this[_0x3f347e(0x2aa)]();let _0x266719='';if(DataManager[_0x3f347e(0x342)](_0x11639c))_0x266719=_0x3f347e(0x388)[_0x3f347e(0x2c8)](_0x11639c['id']);else{if(DataManager[_0x3f347e(0x3ec)](_0x11639c))_0x266719=_0x3f347e(0x3da)[_0x3f347e(0x2c8)](_0x11639c['id']);else{if(DataManager[_0x3f347e(0x48d)](_0x11639c))_0x3f347e(0x5c2)===_0x3f347e(0x3b4)?_0x482352[_0x3f347e(0x2e2)]=this[_0x3f347e(0x4c7)]:_0x266719=_0x3f347e(0x4a1)[_0x3f347e(0x2c8)](_0x11639c['id']);else{if(_0x3f347e(0x59d)!==_0x3f347e(0x659))return;else this[_0x3f347e(0x5de)][_0x3f347e(0x29c)](this['_newItemsList']['indexOf'](_0x579d2a),0x1);}}}if(!this[_0x3f347e(0x5de)][_0x3f347e(0x415)](_0x266719))this[_0x3f347e(0x5de)][_0x3f347e(0x58d)](_0x266719);},Game_Party[_0x14015d(0x39a)][_0x14015d(0x5cc)]=function(_0x28fca3){const _0x5a270f=_0x14015d;if(!$gameTemp[_0x5a270f(0x44f)]())return;if(this[_0x5a270f(0x5de)]===undefined)this['initNewItemsList']();let _0x402e71='';if(DataManager[_0x5a270f(0x342)](_0x28fca3))_0x402e71=_0x5a270f(0x388)[_0x5a270f(0x2c8)](_0x28fca3['id']);else{if(DataManager[_0x5a270f(0x3ec)](_0x28fca3))_0x402e71='weapon-%1'[_0x5a270f(0x2c8)](_0x28fca3['id']);else{if(DataManager[_0x5a270f(0x48d)](_0x28fca3)){if(_0x5a270f(0x34b)===_0x5a270f(0x3d6)){if(!_0x4f52ce[_0x5a270f(0x663)](_0x3c2a47))return!![];}else _0x402e71='armor-%1'[_0x5a270f(0x2c8)](_0x28fca3['id']);}else return;}}this[_0x5a270f(0x5de)][_0x5a270f(0x415)](_0x402e71)&&this[_0x5a270f(0x5de)][_0x5a270f(0x29c)](this[_0x5a270f(0x5de)][_0x5a270f(0x42c)](_0x402e71),0x1);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x614)]=Game_Party[_0x14015d(0x39a)][_0x14015d(0x570)],Game_Party[_0x14015d(0x39a)]['numItems']=function(_0x1359fc){const _0x4c3209=_0x14015d;if(DataManager[_0x4c3209(0x392)](_0x1359fc))_0x1359fc=DataManager['getProxyItem'](_0x1359fc);return VisuMZ['ItemsEquipsCore'][_0x4c3209(0x614)]['call'](this,_0x1359fc);},VisuMZ[_0x14015d(0x502)]['Game_Party_gainItem']=Game_Party[_0x14015d(0x39a)][_0x14015d(0x3cc)],Game_Party['prototype'][_0x14015d(0x3cc)]=function(_0x53c42d,_0x56afed,_0x3f5030){const _0x37e5c8=_0x14015d;if(DataManager[_0x37e5c8(0x392)](_0x53c42d))_0x53c42d=null;const _0xdd1dc6=this['numItems'](_0x53c42d);VisuMZ[_0x37e5c8(0x502)][_0x37e5c8(0x617)]['call'](this,_0x53c42d,_0x56afed,_0x3f5030);if(this['numItems'](_0x53c42d)>_0xdd1dc6)this[_0x37e5c8(0x5d6)](_0x53c42d);},Game_Party[_0x14015d(0x39a)][_0x14015d(0x1e4)]=function(_0x1ec2af){const _0x4ca193=_0x14015d;if(DataManager[_0x4ca193(0x392)](_0x1ec2af))_0x1ec2af=DataManager[_0x4ca193(0x473)](_0x1ec2af);return DataManager[_0x4ca193(0x1fc)](_0x1ec2af);},VisuMZ['ItemsEquipsCore'][_0x14015d(0x456)]=Scene_ItemBase['prototype'][_0x14015d(0x665)],Scene_ItemBase[_0x14015d(0x39a)][_0x14015d(0x665)]=function(){const _0x5ae69a=_0x14015d;VisuMZ['ItemsEquipsCore'][_0x5ae69a(0x456)][_0x5ae69a(0x207)](this),this['_itemWindow'][_0x5ae69a(0x22a)]();},Scene_Item['prototype'][_0x14015d(0x208)]=function(){const _0x18237=_0x14015d;if(ConfigManager[_0x18237(0x30a)]&&ConfigManager[_0x18237(0x4e0)]!==undefined){if(_0x18237(0x466)!==_0x18237(0x466))_0x4015d9='armor-%1'[_0x18237(0x2c8)](_0x13adf1['id']);else return ConfigManager[_0x18237(0x4e0)];}else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x18237(0x555)]()[_0x18237(0x497)](/LOWER/i);else Scene_ItemBase['prototype'][_0x18237(0x446)]['call'](this);}},Scene_Item[_0x14015d(0x39a)]['isRightInputMode']=function(){const _0xc6be99=_0x14015d;if(ConfigManager[_0xc6be99(0x30a)]&&ConfigManager[_0xc6be99(0x27e)]!==undefined)return'lyMLQ'!=='lIqbf'?ConfigManager[_0xc6be99(0x27e)]:this[_0xc6be99(0x295)]()[_0xc6be99(0x415)](this['equipSlots']()[_0x2fedae])?![]:this[_0xc6be99(0x47f)](_0x47e557);else{if(this[_0xc6be99(0x398)]())return this[_0xc6be99(0x555)]()[_0xc6be99(0x497)](/RIGHT/i);else _0xc6be99(0x4d3)===_0xc6be99(0x4d3)?Scene_ItemBase['prototype'][_0xc6be99(0x446)]['call'](this):(_0x3eeda0(_0xc6be99(0x3b3)[_0xc6be99(0x2c8)](_0x2d1e22,_0x421a26,_0x257742)),_0x4cdcce['exit']());}},Scene_Item[_0x14015d(0x39a)][_0x14015d(0x555)]=function(){const _0x1472ba=_0x14015d;return VisuMZ[_0x1472ba(0x502)][_0x1472ba(0x524)][_0x1472ba(0x5b4)][_0x1472ba(0x45a)];},Scene_Item[_0x14015d(0x39a)][_0x14015d(0x2a7)]=function(){const _0x50d0f0=_0x14015d;return this[_0x50d0f0(0x4eb)]&&this[_0x50d0f0(0x4eb)][_0x50d0f0(0x2a7)]();},Scene_Item[_0x14015d(0x39a)][_0x14015d(0x398)]=function(){const _0x1e1361=_0x14015d;return VisuMZ['ItemsEquipsCore'][_0x1e1361(0x524)][_0x1e1361(0x5b4)]['EnableLayout'];},VisuMZ[_0x14015d(0x502)][_0x14015d(0x4b7)]=Scene_Item[_0x14015d(0x39a)][_0x14015d(0x374)],Scene_Item[_0x14015d(0x39a)]['create']=function(){const _0x4b866e=_0x14015d;VisuMZ[_0x4b866e(0x502)][_0x4b866e(0x4b7)][_0x4b866e(0x207)](this),this[_0x4b866e(0x2a7)]()&&this['onCategoryOk']();},VisuMZ[_0x14015d(0x502)]['Scene_Item_helpWindowRect']=Scene_Item['prototype'][_0x14015d(0x327)],Scene_Item[_0x14015d(0x39a)]['helpWindowRect']=function(){const _0x408c83=_0x14015d;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x408c83(0x303)]():VisuMZ[_0x408c83(0x502)][_0x408c83(0x24a)]['call'](this);},Scene_Item[_0x14015d(0x39a)][_0x14015d(0x303)]=function(){const _0x5898a2=_0x14015d,_0x57238b=0x0,_0x56f74c=this[_0x5898a2(0x346)](),_0x40b295=Graphics[_0x5898a2(0x5c1)],_0x3687df=this[_0x5898a2(0x32c)]();return new Rectangle(_0x57238b,_0x56f74c,_0x40b295,_0x3687df);},VisuMZ[_0x14015d(0x502)]['Scene_Item_createCategoryWindow']=Scene_Item[_0x14015d(0x39a)][_0x14015d(0x504)],Scene_Item[_0x14015d(0x39a)]['createCategoryWindow']=function(){const _0x1f31c0=_0x14015d;VisuMZ['ItemsEquipsCore'][_0x1f31c0(0x4df)]['call'](this),this['isUseModernControls']()&&this[_0x1f31c0(0x633)]();},Scene_Item['prototype'][_0x14015d(0x633)]=function(){const _0x14b43d=_0x14015d;delete this['_categoryWindow'][_0x14b43d(0x470)]['ok'],delete this[_0x14b43d(0x4eb)]['_handlers'][_0x14b43d(0x233)];},VisuMZ[_0x14015d(0x502)][_0x14015d(0x33e)]=Scene_Item['prototype'][_0x14015d(0x38d)],Scene_Item['prototype'][_0x14015d(0x38d)]=function(){const _0x40540d=_0x14015d;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['categoryWindowRectItemsEquipsCore']():VisuMZ[_0x40540d(0x502)]['Scene_Item_categoryWindowRect'][_0x40540d(0x207)](this);},Scene_Item[_0x14015d(0x39a)]['categoryWindowRectItemsEquipsCore']=function(){const _0x2c470a=_0x14015d,_0x53633d=0x0,_0x5184f2=this[_0x2c470a(0x5d3)](),_0x3c6249=Graphics['boxWidth'],_0x403332=this[_0x2c470a(0x59c)](0x1,!![]);return new Rectangle(_0x53633d,_0x5184f2,_0x3c6249,_0x403332);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x624)]=Scene_Item[_0x14015d(0x39a)][_0x14015d(0x62c)],Scene_Item[_0x14015d(0x39a)][_0x14015d(0x62c)]=function(){const _0x1e5d84=_0x14015d;VisuMZ[_0x1e5d84(0x502)][_0x1e5d84(0x624)][_0x1e5d84(0x207)](this);this[_0x1e5d84(0x2a7)]()&&this[_0x1e5d84(0x371)]();if(this[_0x1e5d84(0x3c5)]()){if(_0x1e5d84(0x646)===_0x1e5d84(0x646))this[_0x1e5d84(0x4db)]();else return _0x4ad15a[_0x1e5d84(0x39a)][_0x1e5d84(0x5ce)][_0x1e5d84(0x207)](this);}},VisuMZ['ItemsEquipsCore'][_0x14015d(0x3ff)]=Scene_Item[_0x14015d(0x39a)][_0x14015d(0x33c)],Scene_Item['prototype'][_0x14015d(0x33c)]=function(){const _0x40e4bf=_0x14015d;if(this[_0x40e4bf(0x398)]())return this[_0x40e4bf(0x4a8)]();else{const _0x2a74b9=VisuMZ[_0x40e4bf(0x502)][_0x40e4bf(0x3ff)][_0x40e4bf(0x207)](this);return this[_0x40e4bf(0x3c5)]()&&this[_0x40e4bf(0x3a3)]()&&(_0x2a74b9['width']-=this['statusWidth']()),_0x2a74b9;}},Scene_Item[_0x14015d(0x39a)][_0x14015d(0x4a8)]=function(){const _0x5e6be8=_0x14015d,_0x311abc=this[_0x5e6be8(0x446)]()?this[_0x5e6be8(0x25d)]():0x0,_0x4a61e6=this[_0x5e6be8(0x4eb)]['y']+this[_0x5e6be8(0x4eb)]['height'],_0x2bae67=Graphics[_0x5e6be8(0x5c1)]-this[_0x5e6be8(0x25d)](),_0xb7cc7f=this[_0x5e6be8(0x631)]()-_0x4a61e6;return new Rectangle(_0x311abc,_0x4a61e6,_0x2bae67,_0xb7cc7f);},Scene_Item[_0x14015d(0x39a)][_0x14015d(0x371)]=function(){const _0x46584f=_0x14015d;this[_0x46584f(0x4c9)]['setHandler'](_0x46584f(0x233),this[_0x46584f(0x4a7)][_0x46584f(0x3e7)](this));},Scene_Item['prototype'][_0x14015d(0x3c5)]=function(){const _0x1db152=_0x14015d;return this[_0x1db152(0x398)]()?!![]:VisuMZ[_0x1db152(0x502)][_0x1db152(0x524)][_0x1db152(0x5b4)][_0x1db152(0x3c4)];},Scene_Item['prototype'][_0x14015d(0x3a3)]=function(){const _0x206c6d=_0x14015d;return VisuMZ['ItemsEquipsCore']['Settings'][_0x206c6d(0x5b4)][_0x206c6d(0x42d)];},Scene_Item[_0x14015d(0x39a)]['createStatusWindow']=function(){const _0x4e441c=_0x14015d,_0x499859=this[_0x4e441c(0x60c)]();this[_0x4e441c(0x3c8)]=new Window_ShopStatus(_0x499859),this['addWindow'](this[_0x4e441c(0x3c8)]),this['_itemWindow'][_0x4e441c(0x61b)](this[_0x4e441c(0x3c8)]);const _0x10effd=VisuMZ[_0x4e441c(0x502)][_0x4e441c(0x524)][_0x4e441c(0x5b4)][_0x4e441c(0x418)];this['_statusWindow'][_0x4e441c(0x517)](_0x10effd||0x0);},Scene_Item[_0x14015d(0x39a)][_0x14015d(0x60c)]=function(){const _0x4d8eed=_0x14015d;return this[_0x4d8eed(0x398)]()?this[_0x4d8eed(0x527)]():VisuMZ[_0x4d8eed(0x502)][_0x4d8eed(0x524)]['ItemScene'][_0x4d8eed(0x227)][_0x4d8eed(0x207)](this);},Scene_Item[_0x14015d(0x39a)][_0x14015d(0x527)]=function(){const _0x2fa295=_0x14015d,_0x518eec=this['statusWidth'](),_0x5d87af=this['_itemWindow'][_0x2fa295(0x206)],_0x1d4fd6=this['isRightInputMode']()?0x0:Graphics[_0x2fa295(0x5c1)]-this['statusWidth'](),_0x113f3b=this['_itemWindow']['y'];return new Rectangle(_0x1d4fd6,_0x113f3b,_0x518eec,_0x5d87af);},Scene_Item[_0x14015d(0x39a)][_0x14015d(0x25d)]=function(){const _0x50b12f=_0x14015d;return Scene_Shop[_0x50b12f(0x39a)][_0x50b12f(0x25d)]();},Scene_Item[_0x14015d(0x39a)]['buttonAssistItemListRequirement']=function(){const _0x59a4e9=_0x14015d;if(!this['updatedLayoutStyle']())return![];if(!this[_0x59a4e9(0x2a7)]())return![];if(!this[_0x59a4e9(0x4c9)])return![];if(!this[_0x59a4e9(0x4c9)][_0x59a4e9(0x653)])return![];return this[_0x59a4e9(0x555)]()&&this[_0x59a4e9(0x2a7)]();},Scene_Item['prototype'][_0x14015d(0x5cb)]=function(){const _0x1e95b3=_0x14015d;if(this['buttonAssistItemListRequirement']()){if(this[_0x1e95b3(0x4c9)][_0x1e95b3(0x60f)]()===0x1){if(_0x1e95b3(0x44d)!==_0x1e95b3(0x44d))this[_0x1e95b3(0x573)]();else return TextManager[_0x1e95b3(0x33d)](_0x1e95b3(0x21e),_0x1e95b3(0x668));}else return TextManager[_0x1e95b3(0x33d)](_0x1e95b3(0x4ff),'pagedown');}return Scene_ItemBase[_0x1e95b3(0x39a)][_0x1e95b3(0x5cb)]['call'](this);},Scene_Item[_0x14015d(0x39a)][_0x14015d(0x63d)]=function(){const _0x5439fb=_0x14015d;if(this[_0x5439fb(0x4e7)]()){if(_0x5439fb(0x2ed)!=='nTgri')_0x5dac48=_0x44575f['CoreEngine']['Settings'][_0x5439fb(0x5e8)][_0x5439fb(0x45b)];else return VisuMZ['ItemsEquipsCore'][_0x5439fb(0x524)]['ItemScene'][_0x5439fb(0x287)];}return Scene_ItemBase[_0x5439fb(0x39a)][_0x5439fb(0x63d)][_0x5439fb(0x207)](this);},Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x208)]=function(){const _0x4c8501=_0x14015d;if(ConfigManager[_0x4c8501(0x30a)]&&ConfigManager[_0x4c8501(0x4e0)]!==undefined)return ConfigManager[_0x4c8501(0x4e0)];else{if(this[_0x4c8501(0x398)]())return this[_0x4c8501(0x555)]()['match'](/LOWER/i);else Scene_MenuBase['prototype']['isRightInputMode']['call'](this);}},Scene_Equip[_0x14015d(0x39a)]['isRightInputMode']=function(){const _0x8ed99a=_0x14015d;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x8ed99a(0x27e)]!==undefined)return ConfigManager[_0x8ed99a(0x27e)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x8ed99a(0x555)]()[_0x8ed99a(0x497)](/RIGHT/i);else{if(_0x8ed99a(0x2b6)!==_0x8ed99a(0x2b6)){let _0x5330f3=0x0;const _0x57f054=this[_0x8ed99a(0x30c)](),_0x5c3c75=this[_0x8ed99a(0x520)]();for(let _0x303ec4=0x0;_0x303ec4<_0x57f054[_0x8ed99a(0x536)];_0x303ec4++){if(_0x57f054[_0x303ec4]===_0x4021a5){_0x5330f3=_0x303ec4;if(!_0x5c3c75[_0x303ec4])return _0x5330f3;}}return _0x5330f3;}else Scene_MenuBase[_0x8ed99a(0x39a)]['isRightInputMode'][_0x8ed99a(0x207)](this);}}},Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x555)]=function(){const _0x3300e0=_0x14015d;return VisuMZ[_0x3300e0(0x502)]['Settings'][_0x3300e0(0x656)][_0x3300e0(0x45a)];},Scene_Equip['prototype']['isUseModernControls']=function(){const _0x2b3f8f=_0x14015d;return this[_0x2b3f8f(0x61d)]&&this[_0x2b3f8f(0x61d)][_0x2b3f8f(0x2a7)]();},Scene_Equip[_0x14015d(0x39a)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x230e04=_0x14015d;return VisuMZ[_0x230e04(0x502)]['Settings'][_0x230e04(0x656)][_0x230e04(0x2d2)];},VisuMZ[_0x14015d(0x502)][_0x14015d(0x24e)]=Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x374)],Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x374)]=function(){const _0x3c1965=_0x14015d;VisuMZ[_0x3c1965(0x502)][_0x3c1965(0x24e)][_0x3c1965(0x207)](this),this[_0x3c1965(0x2a7)]()&&this[_0x3c1965(0x341)]();},VisuMZ[_0x14015d(0x502)][_0x14015d(0x332)]=Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x327)],Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x327)]=function(){const _0x182b7e=_0x14015d;return this[_0x182b7e(0x398)]()?this[_0x182b7e(0x303)]():'rOKOD'===_0x182b7e(0x1e0)?VisuMZ[_0x182b7e(0x502)][_0x182b7e(0x332)][_0x182b7e(0x207)](this):_0x182b7e(0x64e);},Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x303)]=function(){const _0x16a5e3=_0x14015d,_0x585bbc=0x0,_0x4e2320=this[_0x16a5e3(0x346)](),_0x34f7d2=Graphics[_0x16a5e3(0x5c1)],_0x559d45=this[_0x16a5e3(0x32c)]();return new Rectangle(_0x585bbc,_0x4e2320,_0x34f7d2,_0x559d45);},VisuMZ['ItemsEquipsCore'][_0x14015d(0x3be)]=Scene_Equip[_0x14015d(0x39a)]['statusWindowRect'],Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x60c)]=function(){const _0x14d2cc=_0x14015d;if(this[_0x14d2cc(0x398)]()){if('LTdqR'!==_0x14d2cc(0x50c))return this[_0x14d2cc(0x527)]();else _0xfd80d4+=_0x3b49ef['iconWidth']+0x4;}else return VisuMZ[_0x14d2cc(0x502)][_0x14d2cc(0x3be)][_0x14d2cc(0x207)](this);},Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x527)]=function(){const _0x4175a3=_0x14015d,_0x268cf7=this['isRightInputMode']()?0x0:Graphics[_0x4175a3(0x5c1)]-this['statusWidth'](),_0x585383=this[_0x4175a3(0x5d3)](),_0x214e9e=this[_0x4175a3(0x25d)](),_0x482fca=this[_0x4175a3(0x432)]();return new Rectangle(_0x268cf7,_0x585383,_0x214e9e,_0x482fca);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x54d)]=Scene_Equip['prototype'][_0x14015d(0x250)],Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x250)]=function(){const _0x4c5c0a=_0x14015d;return this[_0x4c5c0a(0x398)]()?this['commandWindowRectItemsEquipsCore']():VisuMZ[_0x4c5c0a(0x502)]['Scene_Equip_commandWindowRect'][_0x4c5c0a(0x207)](this);},Scene_Equip[_0x14015d(0x39a)]['shouldCommandWindowExist']=function(){const _0x47aa21=_0x14015d,_0x203599=VisuMZ[_0x47aa21(0x502)]['Settings'][_0x47aa21(0x656)];return _0x203599['CommandAddOptimize']||_0x203599[_0x47aa21(0x47b)];},Scene_Equip[_0x14015d(0x39a)]['commandWindowRectItemsEquipsCore']=function(){const _0x2802a4=_0x14015d,_0x5c2e36=this['shouldCommandWindowExist'](),_0x44e43a=this[_0x2802a4(0x446)]()?this[_0x2802a4(0x25d)]():0x0,_0x506ecf=this[_0x2802a4(0x5d3)](),_0x25cc0b=Graphics[_0x2802a4(0x5c1)]-this['statusWidth'](),_0x244e27=_0x5c2e36?this[_0x2802a4(0x59c)](0x1,!![]):0x0;return new Rectangle(_0x44e43a,_0x506ecf,_0x25cc0b,_0x244e27);},VisuMZ['ItemsEquipsCore'][_0x14015d(0x52b)]=Scene_Equip['prototype'][_0x14015d(0x2a5)],Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x2a5)]=function(){const _0xf9c95=_0x14015d;VisuMZ['ItemsEquipsCore'][_0xf9c95(0x52b)][_0xf9c95(0x207)](this);if(this[_0xf9c95(0x2a7)]()){if('Gdcwk'==='NaMax')return _0x3ca840[_0xf9c95(0x33d)](_0xf9c95(0x21e),_0xf9c95(0x668));else this['postCreateSlotWindowItemsEquipsCore']();}},VisuMZ[_0x14015d(0x502)]['Scene_Equip_slotWindowRect']=Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x402)],Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x402)]=function(){const _0x498449=_0x14015d;if(this[_0x498449(0x398)]()){if('DVAHe'!==_0x498449(0x5bf))return this[_0x498449(0x282)]();else{if(_0x4faebe[_0x498449(0x30a)]&&_0x2f0c38['uiInputPosition']!==_0x52bd74)return _0x387483[_0x498449(0x27e)];else{if(this[_0x498449(0x398)]())return this[_0x498449(0x555)]()['match'](/RIGHT/i);else _0x4f4a2e[_0x498449(0x39a)]['isRightInputMode'][_0x498449(0x207)](this);}}}else{if(_0x498449(0x3e4)===_0x498449(0x3e4))return VisuMZ['ItemsEquipsCore']['Scene_Equip_slotWindowRect']['call'](this);else{const _0x4e80c0=_0x5ed0a2[_0xe9fcdd];_0x4e80c0&&_0x4e80c0[_0x498449(0x59b)]===_0x410e35+0x1&&_0xd4e8bb[_0x498449(0x58d)](_0x4e80c0);}}},Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x282)]=function(){const _0x45308b=_0x14015d,_0x8a0e56=this['commandWindowRect'](),_0x226d31=this['isRightInputMode']()?this[_0x45308b(0x25d)]():0x0,_0x4ff0b5=_0x8a0e56['y']+_0x8a0e56[_0x45308b(0x206)],_0x47ded9=Graphics[_0x45308b(0x5c1)]-this[_0x45308b(0x25d)](),_0x4575fc=this[_0x45308b(0x432)]()-_0x8a0e56[_0x45308b(0x206)];return new Rectangle(_0x226d31,_0x4ff0b5,_0x47ded9,_0x4575fc);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x3ae)]=Scene_Equip[_0x14015d(0x39a)]['itemWindowRect'],Scene_Equip['prototype']['itemWindowRect']=function(){const _0x38e926=_0x14015d;if(this[_0x38e926(0x398)]())return this[_0x38e926(0x402)]();else{if('DKEgI'===_0x38e926(0x285)){const _0x231e05=_0x22a2f1[_0x38e926(0x502)][_0x38e926(0x524)]['StatusWindow']['LabelDamageTP'];return _0x231e05['format'](_0x8dd7e8['tp']);}else return VisuMZ[_0x38e926(0x502)][_0x38e926(0x3ae)][_0x38e926(0x207)](this);}},Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x25d)]=function(){const _0x7e15ad=_0x14015d;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['geUpdatedLayoutStatusWidth']():'tVYCc'==='hQNkg'?0x0:VisuMZ[_0x7e15ad(0x502)][_0x7e15ad(0x524)]['EquipScene']['StatusWindowWidth'];},Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x64d)]=function(){const _0x4a5bce=_0x14015d;return Math[_0x4a5bce(0x31f)](Graphics['boxWidth']/0x2);},Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x375)]=function(){const _0x5ba9b0=_0x14015d;this[_0x5ba9b0(0x296)]['setHandler'](_0x5ba9b0(0x233),this[_0x5ba9b0(0x4a7)][_0x5ba9b0(0x3e7)](this)),this[_0x5ba9b0(0x296)][_0x5ba9b0(0x410)](_0x5ba9b0(0x592),this[_0x5ba9b0(0x51d)][_0x5ba9b0(0x3e7)](this)),this[_0x5ba9b0(0x296)]['setHandler'](_0x5ba9b0(0x4ff),this[_0x5ba9b0(0x56b)]['bind'](this));},VisuMZ['ItemsEquipsCore']['Scene_Equip_commandEquip']=Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x341)],Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x341)]=function(){const _0x20db68=_0x14015d;if(this[_0x20db68(0x2a7)]()){if('AjMKo'!==_0x20db68(0x262)){const _0x4252ca=_0x2aab2c-(_0x31dbc6-_0xa4ca88)/0x2;this[_0x20db68(0x579)](_0x500dda,_0xf7c4b8,_0x22b9dd,_0x4252ca,_0x22fdcc),_0xb3eedf+=_0x479587;}else this[_0x20db68(0x61d)][_0x20db68(0x37b)](),this[_0x20db68(0x61d)][_0x20db68(0x333)]();}VisuMZ['ItemsEquipsCore'][_0x20db68(0x5d1)][_0x20db68(0x207)](this);},VisuMZ['ItemsEquipsCore']['Scene_Equip_onSlotOk']=Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x5df)],Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x5df)]=function(){const _0x20a605=_0x14015d;if(this[_0x20a605(0x296)][_0x20a605(0x63e)]()>=0x0)VisuMZ[_0x20a605(0x502)]['Scene_Equip_onSlotOk'][_0x20a605(0x207)](this),this['onSlotOkAutoSelect']();else{if(_0x20a605(0x298)===_0x20a605(0x298))this['_slotWindow'][_0x20a605(0x467)](0x0),this[_0x20a605(0x296)][_0x20a605(0x429)]();else{const _0x359ed9=this[_0x20a605(0x529)]();this[_0x20a605(0x355)](_0x359ed9,_0x337043,_0x52f558,_0x12c8a3,!![]),this['setupItemDamageTempActors']();const _0x563656=this[_0x20a605(0x3b1)](),_0x27bc5b=_0x2ccf99[_0x20a605(0x59a)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this['_item']['damage'][_0x20a605(0x32f)]]);return this[_0x20a605(0x2b3)](_0x27bc5b),this[_0x20a605(0x355)](_0x563656,_0x28d148,_0x212cb1,_0x3402d7,![],_0x20a605(0x668)),this[_0x20a605(0x423)](_0x5584ab,_0x3229b0,_0xf1a13a),this[_0x20a605(0x647)](),!![];}}},Scene_Equip['prototype'][_0x14015d(0x27a)]=function(){const _0x5457e4=_0x14015d;this[_0x5457e4(0x4c9)][_0x5457e4(0x4f8)]();const _0x1297ef=this[_0x5457e4(0x296)][_0x5457e4(0x5e5)](),_0xeae51f=this[_0x5457e4(0x4c9)]['_data'][_0x5457e4(0x42c)](_0x1297ef),_0x3f5a7a=Math['floor'](this[_0x5457e4(0x4c9)][_0x5457e4(0x215)]()/0x2)-0x1;this[_0x5457e4(0x4c9)]['smoothSelect'](_0xeae51f>=0x0?_0xeae51f:0x0),this[_0x5457e4(0x4c9)]['setTopRow'](this[_0x5457e4(0x4c9)][_0x5457e4(0x63e)]()-_0x3f5a7a);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x2d6)]=Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x209)],Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x209)]=function(){const _0x40fa97=_0x14015d;VisuMZ[_0x40fa97(0x502)][_0x40fa97(0x2d6)][_0x40fa97(0x207)](this),this[_0x40fa97(0x2a7)]()&&(this[_0x40fa97(0x61d)][_0x40fa97(0x467)](0x0),this[_0x40fa97(0x296)][_0x40fa97(0x333)]());},VisuMZ[_0x14015d(0x502)]['Scene_Equip_onActorChange']=Scene_Equip[_0x14015d(0x39a)][_0x14015d(0x426)],Scene_Equip['prototype'][_0x14015d(0x426)]=function(){const _0xf91298=_0x14015d;VisuMZ[_0xf91298(0x502)]['Scene_Equip_onActorChange'][_0xf91298(0x207)](this),this[_0xf91298(0x2a7)]()&&(this[_0xf91298(0x61d)][_0xf91298(0x333)](),this[_0xf91298(0x61d)][_0xf91298(0x37b)](),this[_0xf91298(0x296)][_0xf91298(0x467)](0x0),this[_0xf91298(0x296)][_0xf91298(0x429)]());},Scene_Equip[_0x14015d(0x39a)]['buttonAssistSlotWindowShift']=function(){const _0x2a8ebe=_0x14015d;if(!this['_slotWindow'])return![];if(!this['_slotWindow'][_0x2a8ebe(0x653)])return![];return this[_0x2a8ebe(0x296)]['isShiftRemoveShortcutEnabled']();},Scene_Equip['prototype'][_0x14015d(0x326)]=function(){const _0x1c472c=_0x14015d;if(this[_0x1c472c(0x4ac)]())return TextManager[_0x1c472c(0x3e8)]('shift');return Scene_MenuBase['prototype'][_0x1c472c(0x326)][_0x1c472c(0x207)](this);},Scene_Equip[_0x14015d(0x39a)]['buttonAssistText3']=function(){const _0x238e30=_0x14015d;if(this[_0x238e30(0x4ac)]())return VisuMZ['ItemsEquipsCore'][_0x238e30(0x524)][_0x238e30(0x656)]['buttonAssistRemove'];return Scene_MenuBase['prototype'][_0x238e30(0x1f4)][_0x238e30(0x207)](this);},Scene_Equip['prototype'][_0x14015d(0x4ec)]=function(){const _0x564ae7=_0x14015d;if(this[_0x564ae7(0x4ac)]()){if(_0x564ae7(0x2f9)===_0x564ae7(0x4f9))this['onTouchCancel']();else return this[_0x564ae7(0x5c5)][_0x564ae7(0x5ed)]/0x5/-0x3;}return Scene_MenuBase['prototype'][_0x564ae7(0x4ec)][_0x564ae7(0x207)](this);},Scene_Equip[_0x14015d(0x39a)]['popScene']=function(){const _0x3b3c1d=_0x14015d;SceneManager[_0x3b3c1d(0x38f)]();},VisuMZ['ItemsEquipsCore']['Scene_Load_reloadMapIfUpdated']=Scene_Load[_0x14015d(0x39a)][_0x14015d(0x5dd)],Scene_Load[_0x14015d(0x39a)][_0x14015d(0x5dd)]=function(){const _0x57dcee=_0x14015d;VisuMZ[_0x57dcee(0x502)][_0x57dcee(0x36c)][_0x57dcee(0x207)](this),this[_0x57dcee(0x4fb)]();},Scene_Load[_0x14015d(0x39a)][_0x14015d(0x4fb)]=function(){const _0x28524c=_0x14015d;if($gameSystem[_0x28524c(0x4c3)]()!==$dataSystem[_0x28524c(0x4c3)])for(const _0x41d5d8 of $gameActors[_0x28524c(0x4b5)]){if(_0x41d5d8)_0x41d5d8['prepareNewEquipSlotsOnLoad']();}},Scene_Shop[_0x14015d(0x39a)]['isBottomHelpMode']=function(){const _0x431e7a=_0x14015d;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x431e7a(0x4e0)]!==undefined)return ConfigManager[_0x431e7a(0x4e0)];else{if(this[_0x431e7a(0x398)]()){if(_0x431e7a(0x5db)==='BDqro')return this['updatedLayoutStyle']()['match'](/LOWER/i);else{const _0x4c63c4=_0x3aa045(_0x4eb6c4['$1']);let _0x30f623=this[_0x431e7a(0x4b0)],_0xfd3056=_0x1d128b*this[_0x431e7a(0x561)]();try{_0x3247a7(_0x4c63c4);}catch(_0x468d67){if(_0x387a49[_0x431e7a(0x45f)]())_0x34cbac[_0x431e7a(0x46d)](_0x468d67);}if(_0x10b3fa(_0xfd3056))_0xfd3056=0x0;return _0x58f876[_0x431e7a(0x31f)](_0xfd3056);}}else Scene_MenuBase[_0x431e7a(0x39a)][_0x431e7a(0x446)][_0x431e7a(0x207)](this);}},Scene_Shop['prototype'][_0x14015d(0x446)]=function(){const _0x565868=_0x14015d;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x565868(0x27e)]!==undefined)return ConfigManager[_0x565868(0x27e)];else{if(this[_0x565868(0x398)]())return this[_0x565868(0x555)]()[_0x565868(0x497)](/RIGHT/i);else Scene_MenuBase[_0x565868(0x39a)][_0x565868(0x446)][_0x565868(0x207)](this);}},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x555)]=function(){const _0x3b4c23=_0x14015d;return VisuMZ[_0x3b4c23(0x502)][_0x3b4c23(0x524)]['ShopScene'][_0x3b4c23(0x45a)];},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x2a7)]=function(){const _0x1c762c=_0x14015d;return this['_categoryWindow']&&this[_0x1c762c(0x4eb)][_0x1c762c(0x2a7)]();},Scene_Shop[_0x14015d(0x39a)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x1745ef=_0x14015d;return VisuMZ[_0x1745ef(0x502)][_0x1745ef(0x524)][_0x1745ef(0x661)][_0x1745ef(0x2d2)];},VisuMZ[_0x14015d(0x502)]['Scene_Shop_prepare']=Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x3c9)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x3c9)]=function(_0x17f63c,_0x180b72){const _0x1c24d7=_0x14015d;_0x17f63c=JsonEx['makeDeepCopy'](_0x17f63c),VisuMZ[_0x1c24d7(0x502)][_0x1c24d7(0x574)]['call'](this,_0x17f63c,_0x180b72),this[_0x1c24d7(0x639)]();},Scene_Shop['prototype']['adjustHiddenShownGoods']=function(){const _0x58ce3f=_0x14015d;this['_goodsCount']=0x0;const _0x5d3c2f=[];for(const _0x4b0493 of this[_0x58ce3f(0x40b)]){if(this[_0x58ce3f(0x534)](_0x4b0493))'WpebT'===_0x58ce3f(0x601)?this[_0x58ce3f(0x25c)](_0x42021c[_0x58ce3f(0x5e3)](_0x58ce3f(0x4ff))):this[_0x58ce3f(0x36b)]++;else{if(_0x58ce3f(0x2b5)===_0x58ce3f(0x589)){const _0x4ed381=_0x1e7307(_0x8c5841['$1'])[_0x58ce3f(0x351)](/[\r\n]+/);for(const _0xe7e389 of _0x4ed381){if(_0xe7e389[_0x58ce3f(0x497)](/(.*):[ ](.*)/i)){const _0x3065dc=_0x5cf788(_0x4abbb3['$1'])[_0x58ce3f(0x34e)]()['trim'](),_0x125c28=_0x28ffda(_0x1482fe['$2'])[_0x58ce3f(0x4e3)]();this[_0x58ce3f(0x306)][_0x3065dc]=_0x125c28;}}}else _0x5d3c2f[_0x58ce3f(0x58d)](_0x4b0493);}}for(const _0x5c92ea of _0x5d3c2f){this[_0x58ce3f(0x40b)][_0x58ce3f(0x1e2)](_0x5c92ea);}},Scene_Shop['prototype'][_0x14015d(0x534)]=function(_0x292f78){const _0x1396af=_0x14015d;if(_0x292f78[0x0]>0x2||_0x292f78[0x0]<0x0)return![];const _0x5166fa=[$dataItems,$dataWeapons,$dataArmors][_0x292f78[0x0]][_0x292f78[0x1]];if(!_0x5166fa)return![];const _0x2e4cfb=_0x5166fa[_0x1396af(0x4f1)]||'';if(_0x2e4cfb[_0x1396af(0x497)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1396af(0x3bf)!==_0x1396af(0x3bf))this[_0x1396af(0x467)](0x0);else{const _0xda83=JSON['parse']('['+RegExp['$1'][_0x1396af(0x497)](/\d+/g)+']');for(const _0x18d897 of _0xda83){if(!$gameSwitches[_0x1396af(0x663)](_0x18d897))return![];}return!![];}}if(_0x2e4cfb[_0x1396af(0x497)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('SBaPY'!==_0x1396af(0x43b)){const _0x1575f8=JSON[_0x1396af(0x35c)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x37b6d9 of _0x1575f8){if(!$gameSwitches[_0x1396af(0x663)](_0x37b6d9))return![];}return!![];}else{const _0x5f5aac=0x0,_0x5c791f=this['helpAreaTop'](),_0x2dc70b=_0x4ab63b[_0x1396af(0x5c1)],_0x192ddb=this[_0x1396af(0x32c)]();return new _0x1100ca(_0x5f5aac,_0x5c791f,_0x2dc70b,_0x192ddb);}}if(_0x2e4cfb[_0x1396af(0x497)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1396af(0x37c)===_0x1396af(0x37c)){const _0x1e04f0=JSON[_0x1396af(0x35c)]('['+RegExp['$1'][_0x1396af(0x497)](/\d+/g)+']');for(const _0x3cfa1c of _0x1e04f0){if($gameSwitches[_0x1396af(0x663)](_0x3cfa1c))return!![];}return![];}else return;}if(_0x2e4cfb[_0x1396af(0x497)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1396af(0x4e2)!==_0x1396af(0x66d)){const _0x24c0dd=JSON[_0x1396af(0x35c)]('['+RegExp['$1'][_0x1396af(0x497)](/\d+/g)+']');for(const _0x327c16 of _0x24c0dd){if(!$gameSwitches[_0x1396af(0x663)](_0x327c16))return!![];}return![];}else return _0x263782['ItemsEquipsCore'][_0x1396af(0x33e)][_0x1396af(0x207)](this);}if(_0x2e4cfb[_0x1396af(0x497)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1396af(0x448)===_0x1396af(0x448)){const _0x59514a=JSON[_0x1396af(0x35c)]('['+RegExp['$1'][_0x1396af(0x497)](/\d+/g)+']');for(const _0x1fd578 of _0x59514a){if(!$gameSwitches[_0x1396af(0x663)](_0x1fd578))return!![];}return![];}else{_0x4a83af+=0x1;if(_0x41c5c3[_0x1396af(0x4f1)][_0x1396af(0x497)](_0x45a796)){const _0x2e352c=_0x5df97d(_0x417466['$1'])||0x1;if(_0xec6b39>=_0x2e352c)return!![];}if(_0x1342b0[_0x1396af(0x4f1)][_0x1396af(0x497)](_0x40207a)){const _0x157c42=_0xbaa8af(_0x19f979['$1'])||0x1;if(_0xe58151>=_0x157c42)return!![];}}}if(_0x2e4cfb['match'](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1396af(0x609)===_0x1396af(0x609)){const _0x26d6aa=JSON[_0x1396af(0x35c)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1b9a23 of _0x26d6aa){if(_0x1396af(0x5ae)===_0x1396af(0x2ce)){if(_0xb08760['isPlaytest']())_0x5e5e7c['log'](_0x1f9c22);}else{if($gameSwitches['value'](_0x1b9a23))return![];}}return!![];}else return this[_0x1396af(0x398)]()?this[_0x1396af(0x527)]():_0x3a993f[_0x1396af(0x502)][_0x1396af(0x524)][_0x1396af(0x5b4)]['ItemMenuStatusRect']['call'](this);}return!![];},VisuMZ[_0x14015d(0x502)][_0x14015d(0x4ef)]=Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x374)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x374)]=function(){const _0x1e4180=_0x14015d;VisuMZ['ItemsEquipsCore']['Scene_Shop_create']['call'](this),this[_0x1e4180(0x398)]()&&this['postCreateItemsEquipsCore'](),this[_0x1e4180(0x593)]();},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x577)]=function(){const _0x37d8e5=_0x14015d;this[_0x37d8e5(0x3a0)]['hide'](),this[_0x37d8e5(0x3a1)][_0x37d8e5(0x26a)](),this[_0x37d8e5(0x3a1)][_0x37d8e5(0x37b)](),this[_0x37d8e5(0x3c8)][_0x37d8e5(0x26a)]();},VisuMZ[_0x14015d(0x502)][_0x14015d(0x391)]=Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x327)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x327)]=function(){const _0x45d2ce=_0x14015d;return this[_0x45d2ce(0x398)]()?this[_0x45d2ce(0x303)]():VisuMZ[_0x45d2ce(0x502)][_0x45d2ce(0x391)][_0x45d2ce(0x207)](this);},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x303)]=function(){const _0x1fcc37=_0x14015d,_0x16b68f=0x0,_0xe0669b=this['helpAreaTop'](),_0x1e205c=Graphics['boxWidth'],_0x2dce76=this[_0x1fcc37(0x32c)]();return new Rectangle(_0x16b68f,_0xe0669b,_0x1e205c,_0x2dce76);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x34c)]=Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x2cb)],Scene_Shop['prototype']['goldWindowRect']=function(){const _0x5f16de=_0x14015d;return this[_0x5f16de(0x398)]()?this[_0x5f16de(0x26e)]():VisuMZ[_0x5f16de(0x502)][_0x5f16de(0x34c)][_0x5f16de(0x207)](this);},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x26e)]=function(){const _0x1064eb=_0x14015d,_0x4d0731=this['mainCommandWidth'](),_0x25716c=this['calcWindowHeight'](0x1,!![]),_0x148f7e=this[_0x1064eb(0x446)]()?0x0:Graphics[_0x1064eb(0x5c1)]-_0x4d0731,_0x59fe1d=this[_0x1064eb(0x5d3)]();return new Rectangle(_0x148f7e,_0x59fe1d,_0x4d0731,_0x25716c);},VisuMZ[_0x14015d(0x502)]['Scene_Shop_commandWindowRect']=Scene_Shop['prototype'][_0x14015d(0x250)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x250)]=function(){const _0xc369a7=_0x14015d;if(this[_0xc369a7(0x398)]())return this[_0xc369a7(0x260)]();else{if(_0xc369a7(0x489)==='tHDqo')return VisuMZ[_0xc369a7(0x502)][_0xc369a7(0x2a8)][_0xc369a7(0x207)](this);else return;}},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x260)]=function(){const _0x329b0f=_0x14015d,_0x5035a=this[_0x329b0f(0x446)]()?this[_0x329b0f(0x4ed)]():0x0,_0x5d7ef2=this['mainAreaTop'](),_0x1d20c8=Graphics['boxWidth']-this[_0x329b0f(0x4ed)](),_0x2860d9=this[_0x329b0f(0x59c)](0x1,!![]);return new Rectangle(_0x5035a,_0x5d7ef2,_0x1d20c8,_0x2860d9);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x54e)]=Scene_Shop['prototype'][_0x14015d(0x394)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x394)]=function(){const _0x56054b=_0x14015d;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['numberWindowRectItemsEquipsCore']():VisuMZ[_0x56054b(0x502)][_0x56054b(0x54e)][_0x56054b(0x207)](this);},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x56e)]=function(){const _0x5f0592=_0x14015d,_0x5982f4=this[_0x5f0592(0x61d)]['y']+this[_0x5f0592(0x61d)][_0x5f0592(0x206)],_0x502600=Graphics[_0x5f0592(0x5c1)]-this[_0x5f0592(0x25d)](),_0x376d57=this[_0x5f0592(0x446)]()?Graphics[_0x5f0592(0x5c1)]-_0x502600:0x0,_0x32cd8d=this[_0x5f0592(0x432)]()-this['_commandWindow'][_0x5f0592(0x206)];return new Rectangle(_0x376d57,_0x5982f4,_0x502600,_0x32cd8d);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x32d)]=Scene_Shop['prototype'][_0x14015d(0x60c)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x60c)]=function(){const _0x143b2d=_0x14015d;return this[_0x143b2d(0x398)]()?this[_0x143b2d(0x527)]():VisuMZ[_0x143b2d(0x502)]['Scene_Shop_statusWindowRect']['call'](this);},Scene_Shop['prototype'][_0x14015d(0x527)]=function(){const _0x7dbdaa=_0x14015d,_0x101c95=this[_0x7dbdaa(0x25d)](),_0x2da2c7=this[_0x7dbdaa(0x432)]()-this[_0x7dbdaa(0x61d)]['height'],_0x39dfaf=this[_0x7dbdaa(0x446)]()?0x0:Graphics['boxWidth']-_0x101c95,_0x593cfe=this['_commandWindow']['y']+this[_0x7dbdaa(0x61d)][_0x7dbdaa(0x206)];return new Rectangle(_0x39dfaf,_0x593cfe,_0x101c95,_0x2da2c7);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x66a)]=Scene_Shop['prototype'][_0x14015d(0x634)],Scene_Shop[_0x14015d(0x39a)]['buyWindowRect']=function(){const _0xb15fd5=_0x14015d;if(this[_0xb15fd5(0x398)]())return this[_0xb15fd5(0x4ea)]();else{if(_0xb15fd5(0x25f)!=='NUAfy')return VisuMZ[_0xb15fd5(0x502)][_0xb15fd5(0x66a)][_0xb15fd5(0x207)](this);else{this['contents'][_0xb15fd5(0x28a)]();if(!this['_actor'])return;if(this[_0xb15fd5(0x658)]()){const _0x5599f4=_0x28b987['loadPicture'](this[_0xb15fd5(0x3c2)]['getMenuImage']());_0x5599f4[_0xb15fd5(0x47a)](this[_0xb15fd5(0x236)][_0xb15fd5(0x3e7)](this));}else this[_0xb15fd5(0x60d)]();}}},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x4ea)]=function(){const _0x684931=_0x14015d,_0x485e42=this['_commandWindow']['y']+this['_commandWindow'][_0x684931(0x206)],_0x3011a2=Graphics[_0x684931(0x5c1)]-this[_0x684931(0x25d)](),_0x39b3ca=this[_0x684931(0x432)]()-this[_0x684931(0x61d)][_0x684931(0x206)],_0x297dcc=this[_0x684931(0x446)]()?Graphics[_0x684931(0x5c1)]-_0x3011a2:0x0;return new Rectangle(_0x297dcc,_0x485e42,_0x3011a2,_0x39b3ca);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x54f)]=Scene_Shop['prototype'][_0x14015d(0x504)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x504)]=function(){const _0x4dcd32=_0x14015d;VisuMZ[_0x4dcd32(0x502)][_0x4dcd32(0x54f)][_0x4dcd32(0x207)](this),this[_0x4dcd32(0x2a7)]()&&this[_0x4dcd32(0x633)]();},VisuMZ[_0x14015d(0x502)][_0x14015d(0x3df)]=Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x38d)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x38d)]=function(){const _0x140068=_0x14015d;return this[_0x140068(0x398)]()?this[_0x140068(0x345)]():VisuMZ[_0x140068(0x502)][_0x140068(0x3df)]['call'](this);},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x345)]=function(){const _0x2d5ba8=_0x14015d,_0x32b55c=this['_commandWindow']['y'],_0x1aa096=this[_0x2d5ba8(0x61d)][_0x2d5ba8(0x5ed)],_0x39e9c2=this[_0x2d5ba8(0x59c)](0x1,!![]),_0xde3d9f=this[_0x2d5ba8(0x446)]()?Graphics[_0x2d5ba8(0x5c1)]-_0x1aa096:0x0;return new Rectangle(_0xde3d9f,_0x32b55c,_0x1aa096,_0x39e9c2);},Scene_Shop[_0x14015d(0x39a)]['postCreateCategoryWindowItemsEquipsCore']=function(){const _0xa85370=_0x14015d;delete this[_0xa85370(0x4eb)][_0xa85370(0x470)]['ok'],delete this[_0xa85370(0x4eb)][_0xa85370(0x470)][_0xa85370(0x233)];},VisuMZ[_0x14015d(0x502)][_0x14015d(0x1e1)]=Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x324)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x324)]=function(){const _0x3455a0=_0x14015d;VisuMZ['ItemsEquipsCore'][_0x3455a0(0x1e1)][_0x3455a0(0x207)](this);if(this[_0x3455a0(0x398)]()){if(_0x3455a0(0x667)!==_0x3455a0(0x4a3))this['postCreateSellWindowItemsEquipsCore']();else return this[_0x3455a0(0x4a8)]();}},VisuMZ['ItemsEquipsCore'][_0x14015d(0x53a)]=Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x626)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x626)]=function(){const _0x389bce=_0x14015d;return this[_0x389bce(0x398)]()?this[_0x389bce(0x55e)]():'rXtai'!==_0x389bce(0x3f0)?this[_0x389bce(0x398)]()?this['slotWindowRectItemsEquipsCore']():_0x5df676[_0x389bce(0x502)][_0x389bce(0x608)][_0x389bce(0x207)](this):VisuMZ[_0x389bce(0x502)][_0x389bce(0x53a)]['call'](this);},Scene_Shop[_0x14015d(0x39a)]['sellWindowRectItemsEquipsCore']=function(){const _0x26e625=_0x14015d,_0x224af3=this[_0x26e625(0x4eb)]['y']+this[_0x26e625(0x4eb)][_0x26e625(0x206)],_0x367d52=Graphics[_0x26e625(0x5c1)]-this[_0x26e625(0x25d)](),_0x2cb822=this['mainAreaHeight']()-this['_categoryWindow']['height'],_0x5d5249=this[_0x26e625(0x446)]()?Graphics[_0x26e625(0x5c1)]-_0x367d52:0x0;return new Rectangle(_0x5d5249,_0x224af3,_0x367d52,_0x2cb822);},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x5fa)]=function(){const _0x34fec2=_0x14015d;this['_sellWindow'][_0x34fec2(0x61b)](this[_0x34fec2(0x3c8)]);},Scene_Shop['prototype']['statusWidth']=function(){const _0x1632a1=_0x14015d;return VisuMZ[_0x1632a1(0x502)][_0x1632a1(0x524)][_0x1632a1(0x204)][_0x1632a1(0x66b)];},VisuMZ['ItemsEquipsCore'][_0x14015d(0x5fb)]=Scene_Shop[_0x14015d(0x39a)]['activateSellWindow'],Scene_Shop['prototype'][_0x14015d(0x55b)]=function(){const _0x5f1fb6=_0x14015d;VisuMZ[_0x5f1fb6(0x502)][_0x5f1fb6(0x5fb)][_0x5f1fb6(0x207)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x5f1fb6(0x3c8)][_0x5f1fb6(0x26a)](),this[_0x5f1fb6(0x620)][_0x5f1fb6(0x20b)]();},VisuMZ[_0x14015d(0x502)]['Scene_Shop_commandBuy']=Scene_Shop['prototype']['commandBuy'],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x403)]=function(){const _0x3db26b=_0x14015d;VisuMZ[_0x3db26b(0x502)]['Scene_Shop_commandBuy'][_0x3db26b(0x207)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['commandBuyItemsEquipsCore']();},Scene_Shop[_0x14015d(0x39a)]['commandBuyItemsEquipsCore']=function(){const _0x278486=_0x14015d;this['_buyWindowLastIndex']=this[_0x278486(0x595)]||0x0,this[_0x278486(0x3a1)][_0x278486(0x467)](this['_buyWindowLastIndex']);},VisuMZ['ItemsEquipsCore'][_0x14015d(0x478)]=Scene_Shop['prototype'][_0x14015d(0x625)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x625)]=function(){const _0x29cab0=_0x14015d;VisuMZ[_0x29cab0(0x502)]['Scene_Shop_commandSell'][_0x29cab0(0x207)](this),this[_0x29cab0(0x398)]()&&this[_0x29cab0(0x372)](),this[_0x29cab0(0x2a7)]()&&(this['_categoryWindow']['smoothSelect'](0x0),this[_0x29cab0(0x62d)]());},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x372)]=function(){const _0x4a6687=_0x14015d;this[_0x4a6687(0x3a1)]['hide'](),this[_0x4a6687(0x61d)][_0x4a6687(0x619)]();},VisuMZ['ItemsEquipsCore'][_0x14015d(0x5b8)]=Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x407)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x407)]=function(){const _0x48c03d=_0x14015d;VisuMZ['ItemsEquipsCore']['Scene_Shop_onBuyCancel'][_0x48c03d(0x207)](this),this[_0x48c03d(0x398)]()&&this[_0x48c03d(0x2d7)]();},Scene_Shop[_0x14015d(0x39a)]['onBuyCancelItemsEquipsCore']=function(){const _0x18338c=_0x14015d;this['_buyWindowLastIndex']=this[_0x18338c(0x3a1)][_0x18338c(0x63e)](),this[_0x18338c(0x3a1)][_0x18338c(0x26a)](),this['_buyWindow'][_0x18338c(0x37b)](),this[_0x18338c(0x3a1)][_0x18338c(0x3db)](0x0,0x0),this['_statusWindow']['show'](),this['_dummyWindow'][_0x18338c(0x619)]();},VisuMZ[_0x14015d(0x502)]['Scene_Shop_onCategoryCancel']=Scene_Shop[_0x14015d(0x39a)]['onCategoryCancel'],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x63f)]=function(){const _0x213556=_0x14015d;VisuMZ['ItemsEquipsCore'][_0x213556(0x430)][_0x213556(0x207)](this),this[_0x213556(0x398)]()&&this[_0x213556(0x4c8)]();},Scene_Shop[_0x14015d(0x39a)]['onCategoryCancelItemsEquipsCore']=function(){const _0x17aa38=_0x14015d;this[_0x17aa38(0x3a1)][_0x17aa38(0x26a)](),this[_0x17aa38(0x61d)][_0x17aa38(0x26a)]();},VisuMZ['ItemsEquipsCore'][_0x14015d(0x427)]=Scene_Shop['prototype'][_0x14015d(0x3c0)],Scene_Shop[_0x14015d(0x39a)]['onBuyOk']=function(){const _0xd8dc4d=_0x14015d;$gameTemp['_bypassProxy']=!![],VisuMZ['ItemsEquipsCore'][_0xd8dc4d(0x427)][_0xd8dc4d(0x207)](this),$gameTemp[_0xd8dc4d(0x442)]=![],this['_item']=this[_0xd8dc4d(0x3a1)][_0xd8dc4d(0x5e5)]();},VisuMZ['ItemsEquipsCore'][_0x14015d(0x2a9)]=Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x5a6)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x5a6)]=function(){const _0x1961ee=_0x14015d;$gameTemp[_0x1961ee(0x442)]=!![],this['_item']=this[_0x1961ee(0x3a1)]['item']();const _0x2a47e2=VisuMZ['ItemsEquipsCore'][_0x1961ee(0x2a9)][_0x1961ee(0x207)](this);return $gameTemp[_0x1961ee(0x442)]=![],this[_0x1961ee(0x4b0)]=this['_buyWindow'][_0x1961ee(0x5e5)](),_0x2a47e2;},VisuMZ[_0x14015d(0x502)][_0x14015d(0x606)]=Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x61f)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x61f)]=function(){const _0x587bc2=_0x14015d;VisuMZ[_0x587bc2(0x502)][_0x587bc2(0x606)][_0x587bc2(0x207)](this),this[_0x587bc2(0x398)]()&&this[_0x587bc2(0x596)]();},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x596)]=function(){const _0x1cbb76=_0x14015d;this['_categoryWindow'][_0x1cbb76(0x26a)]();},VisuMZ['ItemsEquipsCore'][_0x14015d(0x272)]=Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x3c6)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x3c6)]=function(){const _0x147c5f=_0x14015d;VisuMZ['ItemsEquipsCore']['Scene_Shop_onSellCancel'][_0x147c5f(0x207)](this),this[_0x147c5f(0x2a7)]()&&this[_0x147c5f(0x63f)](),this[_0x147c5f(0x398)]()&&this[_0x147c5f(0x3a0)]['hide']();},Scene_Shop['prototype'][_0x14015d(0x3e5)]=function(_0x2e9f66){const _0x57f25f=_0x14015d,_0x11d373=this[_0x57f25f(0x4b0)];this[_0x57f25f(0x4b0)]=_0x2e9f66;const _0xabcda0=this[_0x57f25f(0x30f)]();return this[_0x57f25f(0x4b0)]=_0x11d373,_0xabcda0;},VisuMZ[_0x14015d(0x502)][_0x14015d(0x24d)]=Scene_Shop['prototype'][_0x14015d(0x30f)],Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x30f)]=function(){const _0x5c1475=_0x14015d;let _0x427ebc=this[_0x5c1475(0x1f0)]();const _0x2cf2ab=this[_0x5c1475(0x4b0)];return _0x427ebc=VisuMZ[_0x5c1475(0x502)]['Settings'][_0x5c1475(0x661)][_0x5c1475(0x267)][_0x5c1475(0x207)](this,_0x2cf2ab,_0x427ebc),_0x427ebc;},Scene_Shop[_0x14015d(0x39a)]['determineBaseSellingPrice']=function(){const _0x50c58b=_0x14015d;let _0x1e748e=this[_0x50c58b(0x4b0)][_0x50c58b(0x421)];if(!this[_0x50c58b(0x4b0)])return _0x50c58b(0x35d)===_0x50c58b(0x336)?_0x31297f[_0x50c58b(0x48d)](_0x5f4464)&&_0xee8f69['atypeId']===_0x4dc611(_0xf58092['$1']):0x0;else{if(this['_item'][_0x50c58b(0x4f1)][_0x50c58b(0x497)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){const _0x58b597=String(RegExp['$1']);let _0x5c62b6=this[_0x50c58b(0x4b0)],_0x2b3cf3=_0x1e748e*this['sellPriceRate']();try{if(_0x50c58b(0x2ee)==='Fsvpn')return _0x5ed872[_0x50c58b(0x502)][_0x50c58b(0x488)][_0x50c58b(0x207)](this,_0x38db3b);else eval(_0x58b597);}catch(_0x5ec08e){if(_0x50c58b(0x5ee)==='YLfmb'){if($gameTemp[_0x50c58b(0x45f)]())console[_0x50c58b(0x46d)](_0x5ec08e);}else return'#'+_0x2e6efd(_0x2df711['$1']);}if(isNaN(_0x2b3cf3))_0x2b3cf3=0x0;return Math[_0x50c58b(0x31f)](_0x2b3cf3);}else{if(this[_0x50c58b(0x4b0)][_0x50c58b(0x4f1)][_0x50c58b(0x497)](/<SELL PRICE:[ ](\d+)>/i)){if(_0x50c58b(0x2c2)==='zrPEk'){const _0x166853=_0x6b3d2f[_0x50c58b(0x269)](this[_0x50c58b(0x3c2)][_0x50c58b(0x648)]());_0x166853[_0x50c58b(0x47a)](this[_0x50c58b(0x236)][_0x50c58b(0x3e7)](this));}else return parseInt(RegExp['$1']);}else return Math[_0x50c58b(0x31f)](this[_0x50c58b(0x280)]());}}},Scene_Shop[_0x14015d(0x39a)]['baseSellingPrice']=function(){const _0xbde357=_0x14015d;return this[_0xbde357(0x4b0)][_0xbde357(0x421)]*this[_0xbde357(0x561)]();},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x561)]=function(){const _0x458222=_0x14015d;return VisuMZ[_0x458222(0x502)][_0x458222(0x524)][_0x458222(0x661)][_0x458222(0x3bd)];},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x4e7)]=function(){const _0x25c116=_0x14015d;if(!this['updatedLayoutStyle']())return![];if(!this[_0x25c116(0x2a7)]())return![];if(!this['_sellWindow'])return![];if(!this['_sellWindow']['active'])return![];return this['updatedLayoutStyle']()&&this[_0x25c116(0x2a7)]();},Scene_Shop['prototype'][_0x14015d(0x5cb)]=function(){const _0x498a96=_0x14015d;if(this[_0x498a96(0x4e7)]()){if(this[_0x498a96(0x620)][_0x498a96(0x60f)]()===0x1){if(_0x498a96(0x551)!==_0x498a96(0x2f0))return TextManager[_0x498a96(0x33d)]('left',_0x498a96(0x668));else this[_0x498a96(0x296)][_0x498a96(0x63e)]()>=0x0?(_0x25b320[_0x498a96(0x502)][_0x498a96(0x3a4)][_0x498a96(0x207)](this),this[_0x498a96(0x27a)]()):(this[_0x498a96(0x296)][_0x498a96(0x467)](0x0),this[_0x498a96(0x296)][_0x498a96(0x429)]());}else return TextManager[_0x498a96(0x33d)](_0x498a96(0x4ff),'pagedown');}else{if(this[_0x498a96(0x1ff)]&&this['_numberWindow'][_0x498a96(0x653)])return TextManager[_0x498a96(0x33d)]('left',_0x498a96(0x668));}return Scene_MenuBase[_0x498a96(0x39a)][_0x498a96(0x5cb)]['call'](this);},Scene_Shop['prototype'][_0x14015d(0x4e8)]=function(){const _0xc76407=_0x14015d;if(this[_0xc76407(0x1ff)]&&this[_0xc76407(0x1ff)][_0xc76407(0x653)])return TextManager[_0xc76407(0x33d)]('up','down');return Scene_MenuBase[_0xc76407(0x39a)]['buttonAssistKey2'][_0xc76407(0x207)](this);},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x63d)]=function(){const _0xf71074=_0x14015d;if(this[_0xf71074(0x4e7)]()){if(_0xf71074(0x24f)==='REfmn')return VisuMZ[_0xf71074(0x502)][_0xf71074(0x524)]['ItemScene']['buttonAssistCategory'];else _0x502f34=this[_0xf71074(0x3c2)]['param'](_0x26d063),_0x987239=this[_0xf71074(0x509)]['param'](_0x3f87a8),_0x6130bf=_0xd40a12%0x1!==0x0||_0x97746d%0x1!==0x0;}else{if(this[_0xf71074(0x1ff)]&&this[_0xf71074(0x1ff)]['active'])return VisuMZ['ItemsEquipsCore'][_0xf71074(0x524)][_0xf71074(0x661)][_0xf71074(0x65d)];}return Scene_MenuBase[_0xf71074(0x39a)][_0xf71074(0x63d)][_0xf71074(0x207)](this);},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x27f)]=function(){const _0x486c97=_0x14015d;if(this[_0x486c97(0x1ff)]&&this[_0x486c97(0x1ff)][_0x486c97(0x653)]){if(_0x486c97(0x1eb)===_0x486c97(0x523))this[_0x486c97(0x424)](!![]);else return VisuMZ['ItemsEquipsCore']['Settings'][_0x486c97(0x661)][_0x486c97(0x444)];}return Scene_MenuBase[_0x486c97(0x39a)]['buttonAssistText2'][_0x486c97(0x207)](this);},Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x593)]=function(){const _0x24b21a=_0x14015d;if(!SceneManager['isSceneShop']())return;const _0x2a04e0=VisuMZ[_0x24b21a(0x502)]['Settings'][_0x24b21a(0x661)];if(_0x2a04e0[_0x24b21a(0x51a)]){if(_0x24b21a(0x42f)===_0x24b21a(0x42f))$gameSwitches[_0x24b21a(0x2e7)](_0x2a04e0[_0x24b21a(0x51a)],![]);else{const _0xfc981f=_0x29efac[_0x24b21a(0x39a)]['buffIconIndex'](-0x1,_0x506bb5);if(_0xfc981f>0x0){_0x55c849+=_0x24b21a(0x3f9)[_0x24b21a(0x2c8)](_0xfc981f),_0x4ad701++;if(_0x5ee109>=_0x15945f)return _0xe99668;}}}_0x2a04e0[_0x24b21a(0x2fc)]&&(_0x24b21a(0x494)===_0x24b21a(0x494)?$gameSwitches[_0x24b21a(0x2e7)](_0x2a04e0[_0x24b21a(0x2fc)],![]):(this[_0x24b21a(0x45c)][_0x24b21a(0x28a)](),this[_0x24b21a(0x276)][_0x24b21a(0x28a)](),this[_0x24b21a(0x4b0)]&&(this[_0x24b21a(0x647)](),this[_0x24b21a(0x2d0)](!![]),this[_0x24b21a(0x249)](),this[_0x24b21a(0x32b)]()?this[_0x24b21a(0x5a2)]():this[_0x24b21a(0x4fe)](),this[_0x24b21a(0x559)]())));},VisuMZ[_0x14015d(0x502)]['Scene_Shop_doBuy']=Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x4d6)],Scene_Shop['prototype']['doBuy']=function(_0x589e4e){const _0x2caf6d=_0x14015d;VisuMZ['ItemsEquipsCore'][_0x2caf6d(0x616)][_0x2caf6d(0x207)](this,_0x589e4e);if(_0x589e4e<=0x0)return;const _0x4be0a4=VisuMZ[_0x2caf6d(0x502)][_0x2caf6d(0x524)][_0x2caf6d(0x661)];_0x4be0a4[_0x2caf6d(0x51a)]&&$gameSwitches[_0x2caf6d(0x2e7)](_0x4be0a4[_0x2caf6d(0x51a)],!![]);},VisuMZ[_0x14015d(0x502)]['Scene_Shop_doSell']=Scene_Shop[_0x14015d(0x39a)][_0x14015d(0x4f0)],Scene_Shop[_0x14015d(0x39a)]['doSell']=function(_0x5d06db){const _0x5980ef=_0x14015d;VisuMZ[_0x5980ef(0x502)][_0x5980ef(0x545)]['call'](this,_0x5d06db);if(_0x5d06db<=0x0)return;const _0x84edec=VisuMZ[_0x5980ef(0x502)][_0x5980ef(0x524)][_0x5980ef(0x661)];_0x84edec[_0x5980ef(0x51a)]&&$gameSwitches['setValue'](_0x84edec['SwitchSell'],!![]);};function _0x1f12(){const _0x26d043=['Scene_Shop_onSellOk','VyQyy','Scene_Equip_slotWindowRect','OhtVc','commandName','setItem','statusWindowRect','refreshItemsEquipsCoreNoMenuImage','SBNuB','maxCols','ytPOf','wHnKs','iconIndex','onTouchSelectModern','Game_Party_numItems','USER\x20TP\x20GAIN','Scene_Shop_doBuy','Game_Party_gainItem','Window_ItemList_colSpacing','hide','drawUpdatedParamName','setStatusWindow','LabelDamageHP','_commandWindow','Icon','onSellOk','_sellWindow','viSEK','equipTypes','drawItemEffectsRemovedStatesBuffs','Scene_Item_createItemWindow','commandSell','sellWindowRect','Window_ShopBuy_price','Parse_Notetags_Prices','weaponTypes','gkyDE','TYmvq','createItemWindow','onCategoryOk','Window_ShopStatus_setItem','Game_BattlerBase_canEquip_artifact','NoChangeMarker','mainAreaBottom','mXJGW','postCreateCategoryWindowItemsEquipsCore','buyWindowRect','meetsItemConditions','pTstA','INdKW','+%1','adjustHiddenShownGoods','top','aMMwu','dkysV','buttonAssistText1','index','onCategoryCancel','drawItemOccasion','dPnkc','isNewItem','uLyCE','SRCMz','MaxArmors','PGAiM','resetFontSettings','getMenuImage','Whitelist','Window_EquipCommand_initialize','addInnerChild','wAjRf','geUpdatedLayoutStatusWidth','icon','getNextAvailableEtypeId','drawIcon','ubISP','_newLabelOpacityChange','active','drawItemNumber','placeItemNewLabel','EquipScene','battleMembers','isMainMenuCoreMenuImageOptionAvailable','Jmqlp','uiEXr','FadeSpeed','ENzon','buttonAssistSmallIncrement','value1','getItemDamageAmountLabelOriginal','getItemEffectsRemovedStatesBuffsLabel','ShopScene','Scope%1','value','itemAt','activateItemWindow','discardEquip','Rmpax','right','LabelRecoverHP','Scene_Shop_buyWindowRect','Width','RemoveEquipText','lKFcE','DRUez','getItemsEquipsCoreBackColor2','resetTextColor','formula','text','getItemSpeedText','iconWidth','getItemEffectsMpRecoveryLabel','xLEbu','#%1','createCategoryNameWindow','setHelpWindowItem','vRtCw','rOKOD','Scene_Shop_createSellWindow','remove','xYrDh','maxItems','getItemEffectsSelfTpGainText','qgSGB','Categories','Vyvti','updateCommandNameWindow','YzZJk','fGxzK','Damage\x20Formula\x20Error\x20for\x20%1','MDF','Game_Enemy_traitObjects_artifact','forceResetEquipSlots','determineBaseSellingPrice','CmdTextAlign','setItemWindow','mScuM','buttonAssistText3','background','equip','currencyUnit','MenuPortraits','FwMxs','drawItemEffectsHpRecovery','Window_ItemList_item','maxItemAmount','LabelConsume','limitedPageUpDownSceneCheck','_numberWindow','isCommandEnabled','LabelElement','ADDED\x20EFFECTS','ExnCg','StatusWindow','categoryNameWindowDrawBackground','height','call','isBottomHelpMode','onSlotCancel','isClearCommandEnabled','updateHelp','setupBattleTestItems','ItemQuantityFmt','Game_Party_setupBattleTestItems_artifact','elementId','rnuaB','qqPUn','drawItemEffects','Blacklist','processCursorSpecialCheckModernControls','maxVisibleItems','SpeedNeg999','drawItemEffectsHpDamage','itemTextAlign','CtgAg','AGI','loadCharacter','EerGX','allMembers','left','Game_Actor_changeEquip','Enable','VisuMZ_1_BattleCore','RegExp','MAT','getItemEffectsHpRecoveryText','W%1','isClearCommandAdded','ItemMenuStatusRect','BorderRegExp','partyArtifacts','callUpdateHelp','concat','drawItemSpeed','troopArtifacts','switchProxyItem','process_VisuMZ_ItemsEquipsCore_EquipSlots','smallParamFontSize','SPEED','DrawPortraitJS','cancel','CmdIconClear','Translucent','onMenuImageLoad','artifacts','CmdIconEquip','YbBOn','_allowArtifactTraitObjects','textWidth','atypeId','45dThlGZ','StatusWindowWidth','OCCASION','optimize','drawItemActorMenuImage','isOptimizeCommandEnabled','addStateBuffChanges','Game_BattlerBase_meetsItemConditions','param','isHovered','getItemEffectsTpRecoveryLabel','successRate','prepareItemCustomData','Scene_Item_helpWindowRect','ceil','middle','Scene_Shop_sellingPrice','Scene_Equip_create','REfmn','commandWindowRect','UUOWR','process_VisuMZ_ItemsEquipsCore_Notetags','(%1)','commandNameWindowDrawBackground','Nonconsumable','DKIpX','rateHP','nKTPY','MP\x20DAMAGE','iconHeight','LabelDamageTP','cursorLeft','statusWidth','CdGrq','oGCUe','commandWindowRectItemsEquipsCore','drawNewLabelText','AjMKo','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','getItemEffectsAddedStatesBuffsText','replace','EquipParams','SellPriceJS','uApyg','loadPicture','show','normalColor','registerCommand','drawItemCustomEntries','goldWindowRectItemsEquipsCore','ParseItemNotetags','addItemCategories','removeBattleTestArtifacts','Scene_Shop_onSellCancel','CuQhk','_weaponIDs','setCategory','contentsBack','Window_ShopSell_isEnabled','\x5cI[%1]%2','Vavmw','onSlotOkAutoSelect','isPartyArtifact','AllItems','zZJKL','uiInputPosition','buttonAssistText2','baseSellingPrice','ScopeAlliesButUser','slotWindowRectItemsEquipsCore','isSoleWeaponType','CeppG','RaFly','max','buttonAssistCategory','isOpen','phCoZ','clear','11424890Cpspzh','SpeedNeg1999','nnHfC','ParseAllNotetags','hitType','PGYqf','convertInitEquipsToItems','addCancelCommand','updateChangedSlots','EFFECT_REMOVE_STATE','nonRemovableEtypes','_slotWindow','(+%1)','fQRpU','drawRemoveItem','clearEquipments','RASsv','splice','ClFHd','dhlvE','8996750Rsizmm','Text','cezVY','gaugeBackColor','3391216vxJFJa','canEquip','createSlotWindow','Window_ItemList_updateHelp','isUseModernControls','Scene_Shop_commandWindowRect','Scene_Shop_buyingPrice','initNewItemsList','removeDebuff','Window_EquipItem_isEnabled','ABVRE','categoryNameWindowDrawText','_equips','REMOVED\x20EFFECTS','getColor','ConvertParams','changeTextColor','fill','zZvgp','DJsxW','sell','TP\x20RECOVERY','CmdStyle','mainFontSize','fontSizeRatio','sMBti','makeItemData','isDrawItemNumber','down','test','Parse_Notetags_ParamValues','PRLfB','_bypassNewLabel','REPEAT','fAurt','checkItemConditionsSwitchNotetags','initialize','format','nBRzp','PDzez','goldWindowRect','mmp','FLndt','BcJoJ','QUANTITY','changePaintOpacity','isStackableArtifact','EnableLayout','map','agCoV','jchab','Scene_Equip_onSlotCancel','onBuyCancelItemsEquipsCore','initNewLabelSprites','tjRCe','lfjPP','getItemRepeatsText','Window_ItemList_drawItem','Window_Selectable_setHelpWindowItem','tKsoA','IncludeShopItem','_calculatingJSParameters','DrawIcons','opacity','traitObjects','optKeyItemsNumber','LCLIS','A%1','setValue','itemHasEquipLimit','params','weapon','armorTypes','EVAL','nTgri','wpBZi','drawItemName','kyHwf','forceChangeEquip','getItemSuccessRateText','kqTcC','pdTja','consumable','drawItemEffectsTpDamage','powerDownColor','playOkSound','kWiax','_newLabelSprites','commandNameWindowDrawText','SwitchSell','_tempActorA','_commandNameWindow','eRzgs','drawActorCharacter','zMbsU','Occasion%1','helpWindowRectItemsEquipsCore','_doubleTouch','characterName','_customItemInfo','EFFECT_RECOVER_HP','Window_ItemCategory_initialize','CmdIconOptimize','uiMenuStyle','Speed0','equipSlots','XFGHh','visible','sellingPrice','getItemOccasionText','CommandAddOptimize','LRSnZ','getItemDamageElementLabel','Tfxhl','LOKxe','getItemConsumableLabel','EFFECT_REMOVE_DEBUFF','2ovdiYq','drawItemDamage','CoreEngine','keyItem','NFpue','MaxItems','addEquipCommand','floor','makeCommandList','processDrawIcon','Game_Item_setObject','drawItemEquipType','createSellWindow','paramValueByName','buttonAssistKey3','helpWindowRect','selfTP','getItemHitTypeLabel','zTQNG','isEquipItem','helpAreaHeight','Scene_Shop_statusWindowRect','mainFontFace','type','value2','oIucE','Scene_Equip_helpWindowRect','deactivate','VdXYj','UMMIf','sEntY','EFFECT_ADD_BUFF','categoryItemTypes','Slots','RemoveEquipIcon','AlreadyEquipMarker','itemWindowRect','getInputMultiButtonStrings','Scene_Item_categoryWindowRect','getItemHitTypeText','exit','commandEquip','isItem','Game_BattlerBase_param_artifact','NeverUsable','categoryWindowRectItemsEquipsCore','helpAreaTop','QoFCw','CmdIconCancel','LabelHitType','addClearCommand','yvcQI','Scene_Shop_goldWindowRect','_armorIDs','toUpperCase','IkiWD','members','split','isEnabled','Game_BattlerBase_paramPlus_artifact','buy','drawItemKeyData','drawParamsItemsEquipsCore','bitmap','Game_Actor_tradeItemWithParty','cROoT','getItemEffectsHpDamageLabel','windowPadding','parse','kxQjw','removeState','drawText','drawItemScope','getItemEffectsMpDamageText','makeDeepCopy','updateMoneyAmount','addCommand','iconText','ljicx','drawItemHitType','isShiftShortcutKeyForRemove','Parse_Notetags_EnableJS','MOIVi','_goodsCount','Scene_Load_reloadMapIfUpdated','getItemDamageElementText','ICbyk','EJunf','bFunP','postCreateItemWindowModernControls','commandSellItemsEquipsCore','getTextColor','create','postCreateSlotWindowItemsEquipsCore','ShopMenuStatusStandard','ztZhX','blt','Game_Actor_equips_artifacts','drawTextEx','deselect','TNqWX','money','lTWRy','clearNewLabelFromItem','speed','isKeyItem','drawItemDamageAmount','select','TRWxN','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','tTHEQ','OsiNu','item-%1','paramJS','Scene_Shop_commandBuy','proxyItem','actorParams','categoryWindowRect','AllArmors','pop','isEquipCommandEnabled','Scene_Shop_helpWindowRect','isProxyItem','Window_Selectable_initialize','numberWindowRect','isHandled','Game_Actor_discardEquip','changeEquip','isUseItemsEquipsCoreUpdatedLayout','TextAlign','prototype','mpRate','getItemDamageAmountTextBattleCore','createCommandNameWindow','colSpacing','scrollTo','_dummyWindow','_buyWindow','commandNameWindowCenter','adjustItemWidthByStatus','Scene_Equip_onSlotOk','WTLxE','occasion','ParamChangeFontSize','ANoMm','isBattleTest','LUK','DrawEquipData','getItemIdWithName','Speed1000','Scene_Equip_itemWindowRect','ARRAYNUM','Step3Start','getItemDamageAmountText','getItemDamageAmountTextOriginal','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','qQvyG','drawParamText','DamageType%1','JUYwv','ScopeRandomEnemies','setObject','Step1End','toLowerCase','itemEnableJS','SellPriceRate','Scene_Equip_statusWindowRect','mSweU','onBuyOk','BADJA','_actor','effects','ShowShopStatus','allowCreateStatusWindow','onSellCancel','Parse_Notetags_EquipSlots','_statusWindow','prepare','Eatso','ZNueh','gainItem','zULCK','SwitchID','FkrIO','isSellCommandEnabled','Window_EquipStatus_refresh','JCZiS','currentClass','ShiftShortcutKey','addItemCategory','XffOU','foreground','Game_Actor_forceChangeEquip','addChild','weapon-%1','smoothScrollTo','_allowArtifactParamBase','_shopStatusMenuAlly','onTouchSelect','Scene_Shop_categoryWindowRect','isShiftRemoveShortcutEnabled','VisuMZ_0_CoreEngine','itypeId','MANUAL','zsoZD','sellPriceOfItem','EFFECT_ADD_DEBUFF','bind','getInputButtonString','NonRemoveETypes','_scene','EquipAdjustHpMp','isWeapon','isOptimizeEquipOk','drawUpdatedAfterParamValue','addSellCommand','rXtai','getItemsEquipsCoreBackColor1','PykMF','Diwql','isPressed','damage','HitType%1','fontSize','updateNewLabelOpacity','\x5cI[%1]','SdLNd','gainTP','isEquipped','HP\x20RECOVERY','zksLQ','Scene_Item_itemWindowRect','NonOptimizeETypes','wtypeId','slotWindowRect','commandBuy','drawItemStyleIcon','loadSystem','optimizeEquipments','onBuyCancel','EFFECT_RECOVER_MP','qAmPs','ParamValueFontSize','_goods','hYpUF','QEvkJ','IOnyN','AtxBo','setHandler','repeats','Window_ItemList_maxCols','ElementNone','cursorRight','includes','paramPlus','rIWYQ','ItemMenuStatusBgType','tlaZr','onTouchCancel','addState','getItemScopeText','KHOSv','removeStateBuffChanges','isDualWield','DrawBackRect','price','zUqjz','drawItemDarkRect','onTouchSelectModernControls','parameters','onActorChange','Scene_Shop_onBuyOk','coDmt','activate','setShopStatusWindowMode','Consumable','indexOf','ItemSceneAdjustItemList','%1%','CSGNY','Scene_Shop_onCategoryCancel','KOTpo','mainAreaHeight','BeDAj','isBuyCommandEnabled','HYDst','move','WAfuB','KYzAb','GhtnT','IKpKr','jacbq','pLELR','drawItemEffectsAddedStatesBuffs','drawItemStyleIconText','pCxQO','DEF','powerUpColor','_bypassProxy','UvXXL','buttonAssistLargeIncrement','commandBuyItemsEquipsCore','isRightInputMode','innerWidth','UVKVn','fnXuw','OffsetX','prepareRefreshItemsEquipsCoreLayout','fontFace','SLWsQ','isCursorMovable','newLabelEnabled','getItemSpeedLabel','canConsumeItem','armors','categoryStyle','PYYVZ','KeyItems','Scene_ItemBase_activateItemWindow','drawItemConsumable','CONSUMABLE','cursorPageup','LayoutStyle','ExtDisplayedParams','contents','hideDisabledCommands','object','isPlaytest','changeEquipById','EFFECT_ADD_STATE','getItemRepeatsLabel','IconSet','_list','commandStyleCheck','oxfGK','smoothSelect','BaKAJ','processShiftRemoveShortcut','maxBattleMembers','ParseClassNotetags','center','log','drawUpdatedParamValueDiff','processCursorMoveModernControls','_handlers','EXDli','XugDz','getProxyItem','YHRdv','Window_Selectable_refresh','1465VsajPr','AlwaysUsable','Scene_Shop_commandSell','+%1%','addLoadListener','CommandAddClear','_forcedSlots','_category','nJtIp','isEquipChangeOk','QoL','LabelSelfGainTP','cEUQo','Game_Party_initialize','NUM','paramPlusItemsEquipsCoreCustomJS','xgIZV','_newLabelOpacityUpperLimit','Window_EquipItem_includes','tHDqo','getItemEffectsTpDamageLabel','Game_Party_gainItem_artifact','STR','isArmor','isClearEquipOk','DrawFaceJS','JraFt','Step2Start','ARRAYEVAL','XvByg','bmsaX','LabelDamageMP','actor','match','alMmK','QzFfe','getItemEffectsHpRecoveryLabel','hpRate','Window_Selectable_update','prepareNextScene','drawCurrencyValue','%1-%2','ActorChangeEquipSlots','armor-%1','Game_BattlerBase_param','XBlKo','Game_Actor_artifact','drawItemEffectsMpDamage','isOptimizeCommandAdded','popScene','itemWindowRectItemsEquipsCore','updateCategoryNameWindow','drawItemEffectsSelfTpGain','rulHQ','buttonAssistSlotWindowShift','NQPht','_bypassReleaseUnequippableItemsItemsEquipsCore','isEquipCommandAdded','_item','vSUJv','playCursorSound','qtNEX','PGcMx','_data','createBitmap','Scene_Item_create','GVMwn','playBuzzerSound','_money','LabelRepeats','flatMP','getItemEffectsAddedStatesBuffsLabel','3446763lFdgPi','IKzvj','tradeItemWithParty','NkVHF','isShowNew','versionId','paramValueFontSize','_categoryNameWindow','name','_newLabelOpacity','onCategoryCancelItemsEquipsCore','_itemWindow','meetsItemConditionsJS','ParseArmorNotetags','modifiedBuyPriceItemsEquipsCore','qqCaY','AllWeapons','ParseWeaponNotetags','getItemSuccessRateLabel','FieldUsable','paramchangeTextColor','PfDVY','prepareNewEquipSlotsOnLoad','status','doBuy','drawItemQuantity','code','dQZoF','itemLineRect','createStatusWindow','Window_ShopCommand_initialize','Speed2000','HAiFH','Scene_Item_createCategoryWindow','uiHelpPosition','Step3End','fnRSk','trim','forceChangeEquipSlots','drawParamName','createNewLabelSprite','buttonAssistItemListRequirement','buttonAssistKey2','Vjyif','buyWindowRectItemsEquipsCore','_categoryWindow','buttonAssistOffset3','mainCommandWidth','lineHeight','Scene_Shop_create','doSell','note','wSHOv','Window_ItemCategory_setItemWindow','CannotEquipMarker','categories','clamp','loadFaceImages','refresh','pCGga','FXKax','refreshActorEquipSlotsIfUpdated','uKcjl','textColor','drawItemData','pageup','nonOptimizeEtypes','Scene_Boot_onDatabaseLoaded','ItemsEquipsCore','inBattle','createCategoryWindow','ActorResetEquipSlots','ngOXT','version','getItemDamageAmountLabelBattleCore','_tempActor','FxuLu','21198XTBJdp','gjyTQ','EWgPu','kSuuV','initEquips','Parse_Notetags_Batch','getItemEffectsHpDamageText','Step1Start','Parse_Notetags_Category','HiddenItemA','filter','IywZq','setBackgroundType','buffIconIndex','sLixt','SwitchBuy','releaseUnequippableItems','drawItemEffectsTpRecovery','nextActor','drawItemCustomEntryLine','auto','equips','number','Window_ShopBuy_item','bnUYO','Settings','TP\x20DAMAGE','CmdHideDisabled','statusWindowRectItemsEquipsCore','oezSo','getItemDamageAmountLabel','getItemEffectsTpRecoveryText','Scene_Equip_createSlotWindow','allowCommandWindowCursorUp','possession','getItemEffectsMpDamageLabel','Window_ShopBuy_refresh','gHLtc','dataId','_resetFontColor','New','isGoodShown','getItemEffectsSelfTpGainLabel','length','evSFt','rszAu','changeBuff','Scene_Shop_sellWindowRect','translucentOpacity','MaxIcons','DZUXx','description','return\x200','getItemColor','getItemQuantityText','getWeaponIdWithName','VNOEF','MaxWeapons','Scene_Shop_doSell','LabelRecoverMP','HIT\x20TYPE','fillRect','buttonAssistRemove','getItemConsumableText','hideNewLabelSprites','?????','Scene_Equip_commandWindowRect','Scene_Shop_numberWindowRect','Scene_Shop_createCategoryWindow','checkShiftRemoveShortcut','uzqOV','update','innerHeight','Step2End','updatedLayoutStyle','ARRAYSTR','itemPadding','rateMP','drawCustomShopGraphic','wLndp','activateSellWindow','SetupProxyItemGroup','getArmorIdWithName','sellWindowRectItemsEquipsCore','defaultItemMax','KeyItemProtect','sellPriceRate','Type','MultiplierStandard','ARRAYSTRUCT','Game_Actor_paramPlus','RyaQK','processCursorHomeEndTrigger','ARRAYFUNC','HiddenItemB','isTroopArtifact','previousActor','equipSlotIndex','refreshCursor','numberWindowRectItemsEquipsCore','categoryStyleCheck','numItems','mhp','fRMbS','cursorPagedown','Scene_Shop_prepare','CmdIconSell','xUhYZ','postCreateItemsEquipsCore','getItemEffectsRemovedStatesBuffsText','drawActorParamDifference','Zsnyd','BattleUsable','processTouchModernControls','setTempActor','1827296IqjCBh','addBuyCommand','currentExt','isCancelled','RDcNJ','placeNewLabel','drawCustomShopGraphicLoad','VisuMZ_1_MainMenuCore','drawItem','isSoleArmorType','getItemEffects','cQqGq','MP\x20RECOVERY','process_VisuMZ_ItemsEquipsCore_RegExp','setHp','push','_itemIDs','getItemEffectsTpDamageText','nVqKL','OffsetY','pagedown','resetShopSwitches','WjvEi','_buyWindowLastIndex','onSellOkItemsEquipsCore','flatHP','XGGBM','oWwna','damageColor','etypeId','calcWindowHeight','uXDEw','BackRectColor','_resetFontSize','equipAdjustHpMp','HP\x20DAMAGE','drawEquipData','vnvFM','gaugeLineHeight','hitIndex','buyingPrice','isSceneShop','round','_itemData','MaxHP','DeLma','ScopeRandomAny','BatchShop','dfakW','sUlhO','ELEMENT','IYhnU','processCursorMove','LabelRecoverTP','ItemScene','currentSymbol','ATXat','eeoZJ','Scene_Shop_onBuyCancel','paintOpacity','naGQj','_slotId','systemColor','getItemEffectsMpRecoveryText','removeBuff','qPCza','nKzZS','boxWidth','iQMrH','kKrQs','fftCS','_buttonAssistWindow','canShiftRemoveEquipment','xismq','XLVYt','eCYzJ','FgSYk','buttonAssistKey1','clearNewItem','drawItemCost','isHoverEnabled','FadeLimit','isArtifact','Scene_Equip_commandEquip','oMGSb','mainAreaTop','commandStyle','dhsiu','setNewItem','categoryList','getMatchingInitEquip','shift','tpGain','BDqro','textSizeEx','reloadMapIfUpdated','_newItemsList','onSlotOk','_cache','vaQnc','SpeedNeg2000','isTriggered','dCoAq','item','revertGlobalNamespaceVariables','xnrWZ','Param','_purchaseOnly','RWfJs','jHTHo','values','width','YLfmb','Cktrk','XQsof','setupItemDamageTempActors','SCOPE','cursorDown','equip2','xjxsu','HUsAO','min','Bnlwn','417267pzGZZT','postCreateSellWindowItemsEquipsCore','Scene_Shop_activateSellWindow','nTBCI','VUlGs','categoryNameWindowCenter','okQjH','nVOCe','yvVJb','Parse_Notetags_ParamJS','constructor','isRepeated','onTouchOk'];_0x1f12=function(){return _0x26d043;};return _0x1f12();}function Sprite_NewLabel(){const _0x111675=_0x14015d;this[_0x111675(0x2c7)](...arguments);}function _0x29b4(_0x2752d4,_0x35400d){const _0x1f12e8=_0x1f12();return _0x29b4=function(_0x29b4ae,_0x5c3608){_0x29b4ae=_0x29b4ae-0x1df;let _0x19c62f=_0x1f12e8[_0x29b4ae];return _0x19c62f;},_0x29b4(_0x2752d4,_0x35400d);}Sprite_NewLabel[_0x14015d(0x39a)]=Object[_0x14015d(0x374)](Sprite[_0x14015d(0x39a)]),Sprite_NewLabel[_0x14015d(0x39a)][_0x14015d(0x603)]=Sprite_NewLabel,Sprite_NewLabel['prototype'][_0x14015d(0x2c7)]=function(){const _0x4c5c85=_0x14015d;Sprite['prototype'][_0x4c5c85(0x2c7)][_0x4c5c85(0x207)](this),this[_0x4c5c85(0x4b6)]();},Sprite_NewLabel[_0x14015d(0x39a)][_0x14015d(0x4b6)]=function(){const _0x206c5a=_0x14015d,_0x33f828=ImageManager[_0x206c5a(0x674)],_0x1f9737=ImageManager['iconHeight'];this[_0x206c5a(0x357)]=new Bitmap(_0x33f828,_0x1f9737),this['drawNewLabelIcon'](),this[_0x206c5a(0x261)]();},Sprite_NewLabel[_0x14015d(0x39a)]['drawNewLabelIcon']=function(){const _0x588a85=_0x14015d,_0x2cd991=VisuMZ[_0x588a85(0x502)][_0x588a85(0x524)][_0x588a85(0x533)][_0x588a85(0x61e)];if(_0x2cd991<=0x0)return;const _0xa6f589=ImageManager[_0x588a85(0x405)](_0x588a85(0x463)),_0x1ce90a=ImageManager[_0x588a85(0x674)],_0x3dff84=ImageManager['iconHeight'],_0x119666=_0x2cd991%0x10*_0x1ce90a,_0x177e01=Math[_0x588a85(0x31f)](_0x2cd991/0x10)*_0x3dff84;this[_0x588a85(0x357)]['blt'](_0xa6f589,_0x119666,_0x177e01,_0x1ce90a,_0x3dff84,0x0,0x0);},Sprite_NewLabel['prototype']['drawNewLabelText']=function(){const _0x262dd1=_0x14015d,_0x5f150b=VisuMZ[_0x262dd1(0x502)]['Settings'][_0x262dd1(0x533)],_0x2eb102=_0x5f150b[_0x262dd1(0x2a0)];if(_0x2eb102==='')return;const _0x5a3837=ImageManager['iconWidth'],_0x58a6bd=ImageManager[_0x262dd1(0x25a)];this[_0x262dd1(0x357)][_0x262dd1(0x44c)]=_0x5f150b['FontFace']||$gameSystem[_0x262dd1(0x32e)](),this['bitmap']['textColor']=this[_0x262dd1(0x373)](),this['bitmap'][_0x262dd1(0x3f7)]=_0x5f150b['FontSize'],this[_0x262dd1(0x357)]['drawText'](_0x2eb102,0x0,_0x58a6bd/0x2,_0x5a3837,_0x58a6bd/0x2,_0x262dd1(0x46c));},Sprite_NewLabel[_0x14015d(0x39a)][_0x14015d(0x373)]=function(){const _0x1dab54=_0x14015d,_0x2b4605=VisuMZ[_0x1dab54(0x502)][_0x1dab54(0x524)][_0x1dab54(0x533)]['FontColor'];return _0x2b4605[_0x1dab54(0x497)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x1dab54(0x4fd)](_0x2b4605);},Window_Base[_0x14015d(0x39a)][_0x14015d(0x2ef)]=function(_0x559229,_0x1e293c,_0x585139,_0x610735){const _0x1e3569=_0x14015d;if(_0x559229){const _0x37b760=_0x585139+(this[_0x1e3569(0x4ee)]()-ImageManager[_0x1e3569(0x25a)])/0x2,_0x46b669=ImageManager[_0x1e3569(0x674)]+0x4,_0xa02db8=Math['max'](0x0,_0x610735-_0x46b669);this[_0x1e3569(0x2b3)](ColorManager[_0x1e3569(0x540)](_0x559229)),this['drawIcon'](_0x559229[_0x1e3569(0x612)],_0x1e293c,_0x37b760),this[_0x1e3569(0x35f)](_0x559229[_0x1e3569(0x4c6)],_0x1e293c+_0x46b669,_0x585139,_0xa02db8),this['resetTextColor']();}},Window_Base['prototype']['drawItemNumber']=function(_0x26bdb3,_0x2b0945,_0x64c31,_0x28ecd4){const _0x2f15ca=_0x14015d;if(this[_0x2f15ca(0x2be)](_0x26bdb3)){this[_0x2f15ca(0x647)]();const _0x15717e=VisuMZ[_0x2f15ca(0x502)][_0x2f15ca(0x524)]['ItemScene'],_0x23424b=_0x15717e['ItemQuantityFmt'],_0x12e9c8=_0x23424b[_0x2f15ca(0x2c8)]($gameParty[_0x2f15ca(0x570)](_0x26bdb3));this[_0x2f15ca(0x45c)]['fontSize']=_0x15717e['ItemQuantityFontSize'],this[_0x2f15ca(0x35f)](_0x12e9c8,_0x2b0945,_0x64c31,_0x28ecd4,_0x2f15ca(0x668)),this[_0x2f15ca(0x647)]();}},Window_Base['prototype']['isDrawItemNumber']=function(_0x2af3f8){const _0x1af042=_0x14015d;if(DataManager[_0x1af042(0x381)](_0x2af3f8))return $dataSystem[_0x1af042(0x2e4)];return!![];},Window_Base[_0x14015d(0x39a)]['drawItemDarkRect']=function(_0x2c935e,_0x41d405,_0x3c0afd,_0x33d0f5,_0x35f643){const _0x20910a=_0x14015d;_0x35f643=Math[_0x20910a(0x286)](_0x35f643||0x1,0x1);while(_0x35f643--){_0x33d0f5=_0x33d0f5||this[_0x20910a(0x4ee)](),this[_0x20910a(0x276)][_0x20910a(0x5b9)]=0xa0;const _0xb00e86=ColorManager[_0x20910a(0x2a2)]();this['contentsBack'][_0x20910a(0x548)](_0x2c935e+0x1,_0x41d405+0x1,_0x3c0afd-0x2,_0x33d0f5-0x2,_0xb00e86),this[_0x20910a(0x276)]['paintOpacity']=0xff;}},VisuMZ[_0x14015d(0x502)][_0x14015d(0x393)]=Window_Selectable[_0x14015d(0x39a)]['initialize'],Window_Selectable['prototype'][_0x14015d(0x2c7)]=function(_0x5ebc99){const _0x5d71f2=_0x14015d;this[_0x5d71f2(0x2d8)](),VisuMZ[_0x5d71f2(0x502)][_0x5d71f2(0x393)]['call'](this,_0x5ebc99);},Window_Selectable['prototype'][_0x14015d(0x2d8)]=function(){const _0x4de8b9=_0x14015d;this['_newLabelSprites']={},this[_0x4de8b9(0x4c7)]=0xff,this[_0x4de8b9(0x652)]=VisuMZ['ItemsEquipsCore']['Settings'][_0x4de8b9(0x533)][_0x4de8b9(0x65b)],this['_newLabelOpacityUpperLimit']=VisuMZ[_0x4de8b9(0x502)]['Settings']['New']['FadeLimit'];},Window_Selectable[_0x14015d(0x39a)][_0x14015d(0x4c2)]=function(){return![];},VisuMZ[_0x14015d(0x502)][_0x14015d(0x2dd)]=Window_Selectable[_0x14015d(0x39a)]['setHelpWindowItem'],Window_Selectable['prototype'][_0x14015d(0x679)]=function(_0x57d705){const _0x347ec4=_0x14015d;VisuMZ[_0x347ec4(0x502)][_0x347ec4(0x2dd)][_0x347ec4(0x207)](this,_0x57d705);if(this[_0x347ec4(0x4c2)]())this[_0x347ec4(0x37f)](_0x57d705);},Window_Selectable[_0x14015d(0x39a)][_0x14015d(0x37f)]=function(_0x1a195e){const _0x329148=_0x14015d;if(!_0x1a195e)return;$gameParty['clearNewItem'](_0x1a195e);let _0x4ae993='';if(DataManager[_0x329148(0x342)](_0x1a195e)){if(_0x329148(0x474)===_0x329148(0x474))_0x4ae993='item-%1'['format'](_0x1a195e['id']);else{_0x47cdf9[_0x329148(0x442)]=!![],this[_0x329148(0x4b0)]=this['_buyWindow'][_0x329148(0x5e5)]();const _0x137932=_0x2fc6b2[_0x329148(0x502)][_0x329148(0x2a9)][_0x329148(0x207)](this);return _0x3261a6[_0x329148(0x442)]=![],this[_0x329148(0x4b0)]=this['_buyWindow'][_0x329148(0x5e5)](),_0x137932;}}else{if(DataManager[_0x329148(0x3ec)](_0x1a195e))_0x4ae993=_0x329148(0x3da)[_0x329148(0x2c8)](_0x1a195e['id']);else{if(DataManager[_0x329148(0x48d)](_0x1a195e))_0x4ae993=_0x329148(0x4a1)['format'](_0x1a195e['id']);else return;}}const _0x3e9bf9=this[_0x329148(0x2fa)][_0x4ae993];if(_0x3e9bf9)_0x3e9bf9[_0x329148(0x619)]();},VisuMZ['ItemsEquipsCore'][_0x14015d(0x475)]=Window_Selectable['prototype'][_0x14015d(0x4f8)],Window_Selectable[_0x14015d(0x39a)][_0x14015d(0x4f8)]=function(){const _0x15d529=_0x14015d;this[_0x15d529(0x54b)](),VisuMZ[_0x15d529(0x502)][_0x15d529(0x475)][_0x15d529(0x207)](this);},Window_Selectable[_0x14015d(0x39a)][_0x14015d(0x54b)]=function(){const _0x33f889=_0x14015d;for(const _0x57ad97 of Object[_0x33f889(0x5ec)](this[_0x33f889(0x2fa)])){_0x57ad97[_0x33f889(0x619)]();}},VisuMZ[_0x14015d(0x502)]['Window_Selectable_update']=Window_Selectable['prototype'][_0x14015d(0x552)],Window_Selectable[_0x14015d(0x39a)]['update']=function(){const _0x43ac1e=_0x14015d;this[_0x43ac1e(0x3f8)](),VisuMZ[_0x43ac1e(0x502)][_0x43ac1e(0x49c)][_0x43ac1e(0x207)](this);},Window_Selectable[_0x14015d(0x39a)][_0x14015d(0x3f8)]=function(){const _0x54e6e3=_0x14015d;if(!this[_0x54e6e3(0x4c2)]())return;const _0xe69c19=this[_0x54e6e3(0x487)];this[_0x54e6e3(0x4c7)]+=this[_0x54e6e3(0x652)];if(this[_0x54e6e3(0x4c7)]>=_0xe69c19||this[_0x54e6e3(0x4c7)]<=0x0){if(_0x54e6e3(0x5c3)!=='XtWCJ')this[_0x54e6e3(0x652)]*=-0x1;else{if(this['isItem'](_0x2a4687))return _0x17ea87[_0x54e6e3(0x502)][_0x54e6e3(0x524)]['ItemScene'][_0x54e6e3(0x31d)];else{if(this[_0x54e6e3(0x3ec)](_0xc19ed4))return _0x43692c[_0x54e6e3(0x502)][_0x54e6e3(0x524)][_0x54e6e3(0x5b4)][_0x54e6e3(0x544)];else{if(this[_0x54e6e3(0x48d)](_0x51d490))return _0x28ea2e[_0x54e6e3(0x502)][_0x54e6e3(0x524)][_0x54e6e3(0x5b4)]['MaxArmors'];}}}}this[_0x54e6e3(0x4c7)]=this[_0x54e6e3(0x4c7)]['clamp'](0x0,_0xe69c19);for(const _0x4f9a6e of Object[_0x54e6e3(0x5ec)](this[_0x54e6e3(0x2fa)])){if(_0x54e6e3(0x486)==='xgIZV')_0x4f9a6e[_0x54e6e3(0x2e2)]=this[_0x54e6e3(0x4c7)];else{if(!this[_0x54e6e3(0x4af)]())return;const _0x29dc47=this[_0x54e6e3(0x5d4)](),_0x297db5=_0xe549ab[_0x54e6e3(0x502)][_0x54e6e3(0x524)][_0x54e6e3(0x656)][_0x54e6e3(0x238)],_0x2e1756=_0x29dc47==='text'?_0x15bc4e[_0x54e6e3(0x5f4)]:_0x54e6e3(0x278)[_0x54e6e3(0x2c8)](_0x297db5,_0x2943f1[_0x54e6e3(0x5f4)]),_0x137f84=this[_0x54e6e3(0x390)]();this[_0x54e6e3(0x364)](_0x2e1756,_0x54e6e3(0x1f6),_0x137f84);}}},Window_Selectable[_0x14015d(0x39a)]['createNewLabelSprite']=function(_0x2b5731){const _0x129b0a=_0x14015d,_0x45db93=this[_0x129b0a(0x2fa)];if(_0x45db93[_0x2b5731])return _0x45db93[_0x2b5731];else{const _0x2295ef=new Sprite_NewLabel();return _0x45db93[_0x2b5731]=_0x2295ef,this[_0x129b0a(0x64b)](_0x2295ef),_0x2295ef;}},Window_Selectable[_0x14015d(0x39a)][_0x14015d(0x583)]=function(_0x2e64d4,_0x452398,_0x4be943){const _0x2813e3=_0x14015d;let _0x24d0cf='';if(DataManager['isItem'](_0x2e64d4))_0x24d0cf=_0x2813e3(0x388)[_0x2813e3(0x2c8)](_0x2e64d4['id']);else{if(DataManager[_0x2813e3(0x3ec)](_0x2e64d4))_0x24d0cf=_0x2813e3(0x3da)[_0x2813e3(0x2c8)](_0x2e64d4['id']);else{if(DataManager[_0x2813e3(0x48d)](_0x2e64d4))_0x2813e3(0x47e)!==_0x2813e3(0x47e)?this['_itemWindow'][_0x2813e3(0x410)]('cancel',this['popScene'][_0x2813e3(0x3e7)](this)):_0x24d0cf=_0x2813e3(0x4a1)[_0x2813e3(0x2c8)](_0x2e64d4['id']);else{if(_0x2813e3(0x641)===_0x2813e3(0x63c))return this[_0x2813e3(0x4b0)][_0x2813e3(0x2f5)];else return;}}}const _0x6c5921=this[_0x2813e3(0x4e6)](_0x24d0cf);_0x6c5921[_0x2813e3(0x436)](_0x452398,_0x4be943),_0x6c5921['show'](),_0x6c5921['opacity']=this[_0x2813e3(0x4c7)];},Window_ItemCategory[_0x14015d(0x5d7)]=VisuMZ[_0x14015d(0x502)][_0x14015d(0x524)]['Categories']['List'],Window_ItemCategory[_0x14015d(0x338)]=['HiddenItemA',_0x14015d(0x569),_0x14015d(0x255),'Consumable',_0x14015d(0x477),_0x14015d(0x57b),_0x14015d(0x4d1),_0x14015d(0x344)],VisuMZ['ItemsEquipsCore'][_0x14015d(0x308)]=Window_ItemCategory[_0x14015d(0x39a)][_0x14015d(0x2c7)],Window_ItemCategory[_0x14015d(0x39a)]['initialize']=function(_0xc23650){const _0x327663=_0x14015d;VisuMZ['ItemsEquipsCore']['Window_ItemCategory_initialize'][_0x327663(0x207)](this,_0xc23650),this['createCategoryNameWindow'](_0xc23650);},Window_ItemCategory[_0x14015d(0x39a)][_0x14015d(0x678)]=function(_0x3035b4){const _0x47bbb0=_0x14015d,_0x5d51b8=new Rectangle(0x0,0x0,_0x3035b4[_0x47bbb0(0x5ed)],_0x3035b4[_0x47bbb0(0x206)]);this[_0x47bbb0(0x4c5)]=new Window_Base(_0x5d51b8),this['_categoryNameWindow'][_0x47bbb0(0x2e2)]=0x0,this['addChild'](this[_0x47bbb0(0x4c5)]),this[_0x47bbb0(0x4a9)]();},Window_ItemCategory['prototype'][_0x14015d(0x2a7)]=function(){const _0x11436d=_0x14015d;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x11436d(0x39a)]['isUseModernControls']['call'](this);},Window_ItemCategory[_0x14015d(0x39a)][_0x14015d(0x567)]=function(){},Window_ItemCategory['prototype']['playOkSound']=function(){const _0x58f2e4=_0x14015d;if(!this['isUseModernControls']())Window_HorzCommand[_0x58f2e4(0x39a)][_0x58f2e4(0x2f8)]['call'](this);},Window_ItemCategory[_0x14015d(0x39a)]['maxCols']=function(){const _0x2bf0b4=_0x14015d;return this['_list']?this[_0x2bf0b4(0x1e4)]():0x4;},Window_ItemCategory[_0x14015d(0x39a)][_0x14015d(0x552)]=function(){const _0x40637a=_0x14015d;Window_HorzCommand[_0x40637a(0x39a)][_0x40637a(0x552)][_0x40637a(0x207)](this),this[_0x40637a(0x4c9)]&&this[_0x40637a(0x4c9)][_0x40637a(0x275)](this[_0x40637a(0x580)]());},Window_ItemCategory[_0x14015d(0x39a)][_0x14015d(0x46f)]=function(){const _0x5befcb=_0x14015d;if(this[_0x5befcb(0x44e)]()){const _0x30967a=this[_0x5befcb(0x63e)]();if(this[_0x5befcb(0x4c9)]&&this[_0x5befcb(0x4c9)][_0x5befcb(0x60f)]()<=0x1)Input[_0x5befcb(0x604)](_0x5befcb(0x668))&&this[_0x5befcb(0x414)](Input[_0x5befcb(0x5e3)](_0x5befcb(0x668))),Input['isRepeated']('left')&&(_0x5befcb(0x5ba)!==_0x5befcb(0x384)?this[_0x5befcb(0x25c)](Input[_0x5befcb(0x5e3)](_0x5befcb(0x21e))):_0x704ab[_0x5befcb(0x39a)][_0x5befcb(0x3de)][_0x5befcb(0x207)](this,_0x1e3df1));else this['_itemWindow']&&this['_itemWindow'][_0x5befcb(0x60f)]()>0x1&&(Input['isRepeated']('pagedown')&&!Input[_0x5befcb(0x3f4)](_0x5befcb(0x5d9))&&this[_0x5befcb(0x414)](Input[_0x5befcb(0x5e3)](_0x5befcb(0x592))),Input[_0x5befcb(0x604)](_0x5befcb(0x4ff))&&!Input[_0x5befcb(0x3f4)]('shift')&&(_0x5befcb(0x2f4)!==_0x5befcb(0x2f4)?this[_0x5befcb(0x4c0)](null,_0x2cc5aa):this[_0x5befcb(0x25c)](Input['isTriggered'](_0x5befcb(0x4ff)))));this[_0x5befcb(0x63e)]()!==_0x30967a&&this[_0x5befcb(0x4b2)]();}},Window_ItemCategory[_0x14015d(0x39a)]['processHandling']=function(){const _0x5dee4c=_0x14015d;if(this[_0x5dee4c(0x2a7)]())return;Window_HorzCommand['prototype']['processHandling'][_0x5dee4c(0x207)](this);},Window_ItemCategory[_0x14015d(0x39a)]['isHoverEnabled']=function(){const _0x768e67=_0x14015d;return this['isUseModernControls']()?_0x768e67(0x290)===_0x768e67(0x449)?this[_0x768e67(0x398)]()?this['geUpdatedLayoutStatusWidth']():_0x2f7a89[_0x768e67(0x502)][_0x768e67(0x524)][_0x768e67(0x656)][_0x768e67(0x23e)]:![]:Window_HorzCommand['prototype'][_0x768e67(0x5ce)][_0x768e67(0x207)](this);},Window_ItemCategory['prototype'][_0x14015d(0x57c)]=function(){const _0x1b49d1=_0x14015d;if(this['isOpenAndActive']()){if(_0x1b49d1(0x30d)===_0x1b49d1(0x30d)){if(TouchInput['isTriggered']()){if(_0x1b49d1(0x359)!==_0x1b49d1(0x2bc))this[_0x1b49d1(0x3de)](!![]);else return _0x404740[_0x1b49d1(0x502)]['Settings'][_0x1b49d1(0x661)][_0x1b49d1(0x45a)];}if(TouchInput['isClicked']())this[_0x1b49d1(0x605)]();else TouchInput[_0x1b49d1(0x581)]()&&this[_0x1b49d1(0x41a)]();}else _0x4ffa22['_bypassProxy']=!![],_0x250393[_0x1b49d1(0x502)][_0x1b49d1(0x427)][_0x1b49d1(0x207)](this),_0x3fc46e[_0x1b49d1(0x442)]=![],this[_0x1b49d1(0x4b0)]=this['_buyWindow'][_0x1b49d1(0x5e5)]();}},Window_ItemCategory[_0x14015d(0x39a)][_0x14015d(0x3de)]=function(_0x43237f){const _0xc84f6a=_0x14015d;if(this[_0xc84f6a(0x2a7)]())this[_0xc84f6a(0x613)](!![]);else{if(_0xc84f6a(0x289)!==_0xc84f6a(0x2d4))Window_HorzCommand[_0xc84f6a(0x39a)]['onTouchSelect'][_0xc84f6a(0x207)](this,_0x43237f);else{if(this[_0xc84f6a(0x2e0)])return 0x0;const _0xe167cd=(_0x22df50[_0xc84f6a(0x3ec)](_0x231835)?'W%1':_0xc84f6a(0x2e6))[_0xc84f6a(0x2c8)](_0x24aac6['id']),_0x357c49='%1-%2'['format'](_0xe167cd,_0x37ab42);if(_0x266797[_0xc84f6a(0x502)][_0xc84f6a(0x389)][_0x357c49]){this[_0xc84f6a(0x2e0)]=!![];const _0x3ff4af=_0x165b3c[_0xc84f6a(0x502)][_0xc84f6a(0x389)][_0x357c49]['call'](this,_0x58468d,_0x4261e6);return this[_0xc84f6a(0x2e0)]=![],_0x3ff4af;}else return 0x0;}}},Window_ItemCategory[_0x14015d(0x39a)]['onTouchSelectModern']=function(_0x27e2bc){const _0x24c5dc=_0x14015d;this['_doubleTouch']=![];if(this[_0x24c5dc(0x44e)]()){if(_0x24c5dc(0x273)!==_0x24c5dc(0x566)){const _0xa40b84=this[_0x24c5dc(0x63e)](),_0x43fee0=this[_0x24c5dc(0x5a5)]();_0x43fee0>=0x0&&_0x43fee0!==this['index']()&&this[_0x24c5dc(0x383)](_0x43fee0),_0x27e2bc&&this['index']()!==_0xa40b84&&this[_0x24c5dc(0x4b2)]();}else{if(_0x4593e0['ItemsEquipsCore'][_0x24c5dc(0x524)][_0x24c5dc(0x204)][_0x24c5dc(0x420)]===![])return;_0x1f3352=_0xdeb134['max'](_0x1d3b54||0x1,0x1);while(_0x5d7e2f--){_0x3e3877=_0x41202d||this[_0x24c5dc(0x4ee)](),this[_0x24c5dc(0x276)][_0x24c5dc(0x5b9)]=0xa0;const _0x4791c2=_0x31edf9[_0x24c5dc(0x3f1)]();this[_0x24c5dc(0x276)]['fillRect'](_0x2c7259+0x1,_0x5d888b+0x1,_0x120ffb-0x2,_0x4cf9b8-0x2,_0x4791c2),this['contentsBack']['paintOpacity']=0xff;}}}},Window_ItemCategory[_0x14015d(0x39a)][_0x14015d(0x320)]=function(){const _0x4c7212=_0x14015d;this[_0x4c7212(0x270)](),this[_0x4c7212(0x383)](this['index']());},Window_ItemCategory['prototype'][_0x14015d(0x270)]=function(){const _0x5b708c=_0x14015d;for(const _0x10bb17 of Window_ItemCategory[_0x5b708c(0x5d7)]){this[_0x5b708c(0x3d5)](_0x10bb17);}},Window_ItemCategory[_0x14015d(0x39a)][_0x14015d(0x3d5)]=function(_0x1ed504){const _0x27b9d3=_0x14015d,_0x10cc7d=_0x1ed504[_0x27b9d3(0x562)],_0x49885d=_0x1ed504[_0x27b9d3(0x61e)],_0x5f41f7=_0x1ed504[_0x27b9d3(0x3ce)]||0x0;if(_0x5f41f7>0x0&&!$gameSwitches[_0x27b9d3(0x663)](_0x5f41f7))return;let _0x16b5b6='',_0x425a37='category',_0x4d60e8=_0x10cc7d;if(_0x10cc7d[_0x27b9d3(0x497)](/Category:(.*)/i))_0x27b9d3(0x437)===_0x27b9d3(0x431)?_0x6cc2ae=_0x27b9d3(0x3da)['format'](_0x2060c7['id']):_0x16b5b6=String(RegExp['$1'])[_0x27b9d3(0x4e3)]();else{if(Window_ItemCategory['categoryItemTypes']['includes'](_0x10cc7d))_0x27b9d3(0x1f9)!==_0x27b9d3(0x1f9)?_0x518406=_0xcf15c4[_0x27b9d3(0x629)][_0x2bcb33(_0x277203['$1'])]||'':_0x16b5b6=VisuMZ[_0x27b9d3(0x502)][_0x27b9d3(0x524)][_0x27b9d3(0x1e7)][_0x10cc7d];else{if(['AllItems','RegularItems'][_0x27b9d3(0x415)](_0x10cc7d))_0x16b5b6=TextManager[_0x27b9d3(0x5e5)];else{if(_0x10cc7d===_0x27b9d3(0x455))_0x16b5b6=TextManager[_0x27b9d3(0x31b)];else{if(_0x10cc7d===_0x27b9d3(0x4ce))_0x16b5b6=TextManager[_0x27b9d3(0x2ea)];else{if(_0x10cc7d==='AllArmors')'HmvYA'!==_0x27b9d3(0x29d)?_0x16b5b6=TextManager['armor']:(_0x1b605a[_0x27b9d3(0x502)]['Window_ItemCategory_initialize'][_0x27b9d3(0x207)](this,_0x17e401),this['createCategoryNameWindow'](_0x50eef5));else{if(_0x10cc7d[_0x27b9d3(0x497)](/WTYPE:(\d+)/i))_0x27b9d3(0x621)!==_0x27b9d3(0x621)?_0x1509be['prototype'][_0x27b9d3(0x654)]['call'](this,_0x41e073,_0x4f3e07,_0x1d4aa1,_0x5236ca):_0x16b5b6=$dataSystem[_0x27b9d3(0x629)][Number(RegExp['$1'])]||'';else{if(_0x10cc7d['match'](/ATYPE:(\d+)/i))_0x16b5b6=$dataSystem[_0x27b9d3(0x2eb)][Number(RegExp['$1'])]||'';else _0x10cc7d[_0x27b9d3(0x497)](/ETYPE:(\d+)/i)&&(_0x16b5b6=$dataSystem[_0x27b9d3(0x622)][Number(RegExp['$1'])]||'');}}}}}}}_0x49885d>0x0&&this[_0x27b9d3(0x453)]()!==_0x27b9d3(0x672)&&(_0x16b5b6='\x5cI[%1]%2'[_0x27b9d3(0x2c8)](_0x49885d,_0x16b5b6)),this[_0x27b9d3(0x364)](_0x16b5b6,_0x425a37,!![],_0x4d60e8);},Window_ItemCategory['prototype'][_0x14015d(0x218)]=function(){const _0x1c3b1a=_0x14015d;return VisuMZ[_0x1c3b1a(0x502)][_0x1c3b1a(0x524)][_0x1c3b1a(0x1e7)][_0x1c3b1a(0x399)];},Window_ItemCategory[_0x14015d(0x39a)][_0x14015d(0x586)]=function(_0x58d1b6){const _0x396723=_0x14015d,_0x3ab52f=this['categoryStyleCheck'](_0x58d1b6);if(_0x3ab52f===_0x396723(0x365))this['drawItemStyleIconText'](_0x58d1b6);else _0x3ab52f===_0x396723(0x64e)?this[_0x396723(0x404)](_0x58d1b6):Window_HorzCommand[_0x396723(0x39a)][_0x396723(0x586)][_0x396723(0x207)](this,_0x58d1b6);},Window_ItemCategory[_0x14015d(0x39a)][_0x14015d(0x453)]=function(){const _0x3a29bb=_0x14015d;return VisuMZ[_0x3a29bb(0x502)][_0x3a29bb(0x524)][_0x3a29bb(0x1e7)]['Style'];},Window_ItemCategory['prototype'][_0x14015d(0x56f)]=function(_0x5cf68c){const _0x54bd4f=_0x14015d;if(_0x5cf68c<0x0)return _0x54bd4f(0x672);const _0x1842fe=this[_0x54bd4f(0x453)]();if(_0x1842fe!==_0x54bd4f(0x51f))return _0x1842fe;else{const _0x979391=this[_0x54bd4f(0x60a)](_0x5cf68c);if(_0x979391[_0x54bd4f(0x497)](/\\I\[(\d+)\]/i)){const _0xc5feff=this[_0x54bd4f(0x4da)](_0x5cf68c),_0x3df493=this['textSizeEx'](_0x979391)['width'];if(_0x3df493<=_0xc5feff[_0x54bd4f(0x5ed)])return _0x54bd4f(0x365);else{if(_0x54bd4f(0x5fc)==='pbwOI')this[_0x54bd4f(0x469)](),this[_0x54bd4f(0x20b)]();else return _0x54bd4f(0x64e);}}else return _0x54bd4f(0x672);}},Window_ItemCategory[_0x14015d(0x39a)][_0x14015d(0x43e)]=function(_0xb2e726){const _0x56a72b=_0x14015d,_0x3cb91f=this['itemLineRect'](_0xb2e726),_0x39fe2b=this[_0x56a72b(0x60a)](_0xb2e726),_0x5ac45f=this['textSizeEx'](_0x39fe2b)[_0x56a72b(0x5ed)];this[_0x56a72b(0x2d0)](this[_0x56a72b(0x200)](_0xb2e726));const _0x3a585a=this['itemTextAlign']();if(_0x3a585a===_0x56a72b(0x668)){if(_0x56a72b(0x428)!=='uIRgQ')this['drawTextEx'](_0x39fe2b,_0x3cb91f['x']+_0x3cb91f[_0x56a72b(0x5ed)]-_0x5ac45f,_0x3cb91f['y'],_0x5ac45f);else return![];}else{if(_0x3a585a===_0x56a72b(0x46c)){if('oezSo'!==_0x56a72b(0x528)){if(_0x5f561a['value'](_0x56752e))return!![];}else{const _0x9a7e27=_0x3cb91f['x']+Math[_0x56a72b(0x31f)]((_0x3cb91f[_0x56a72b(0x5ed)]-_0x5ac45f)/0x2);this[_0x56a72b(0x37a)](_0x39fe2b,_0x9a7e27,_0x3cb91f['y'],_0x5ac45f);}}else this[_0x56a72b(0x37a)](_0x39fe2b,_0x3cb91f['x'],_0x3cb91f['y'],_0x5ac45f);}},Window_ItemCategory[_0x14015d(0x39a)]['drawItemStyleIcon']=function(_0x2bea98){const _0x41da7b=_0x14015d,_0xb3345f=this[_0x41da7b(0x60a)](_0x2bea98);if(_0xb3345f[_0x41da7b(0x497)](/\\I\[(\d+)\]/i)){const _0x7e4f7a=Number(RegExp['$1'])||0x0,_0x98c7bd=this[_0x41da7b(0x4da)](_0x2bea98),_0x420b62=_0x98c7bd['x']+Math['floor']((_0x98c7bd['width']-ImageManager[_0x41da7b(0x674)])/0x2),_0x17238d=_0x98c7bd['y']+(_0x98c7bd[_0x41da7b(0x206)]-ImageManager[_0x41da7b(0x25a)])/0x2;this['drawIcon'](_0x7e4f7a,_0x420b62,_0x17238d);}},VisuMZ[_0x14015d(0x502)][_0x14015d(0x4f3)]=Window_ItemCategory['prototype']['setItemWindow'],Window_ItemCategory[_0x14015d(0x39a)][_0x14015d(0x1f2)]=function(_0x50369a){const _0x1e1901=_0x14015d;VisuMZ[_0x1e1901(0x502)][_0x1e1901(0x4f3)][_0x1e1901(0x207)](this,_0x50369a),_0x50369a['_categoryWindow']=this;},Window_ItemCategory[_0x14015d(0x39a)]['callUpdateHelp']=function(){const _0x141132=_0x14015d;Window_HorzCommand[_0x141132(0x39a)]['callUpdateHelp'][_0x141132(0x207)](this);if(this['_categoryNameWindow'])this[_0x141132(0x4a9)]();},Window_ItemCategory[_0x14015d(0x39a)][_0x14015d(0x4a9)]=function(){const _0x530a39=_0x14015d,_0x262eb1=this[_0x530a39(0x4c5)];_0x262eb1[_0x530a39(0x45c)]['clear']();const _0x5ddb9a=this['categoryStyleCheck'](this['index']());if(_0x5ddb9a===_0x530a39(0x64e)){const _0x209ea0=this[_0x530a39(0x4da)](this[_0x530a39(0x63e)]());let _0x42a420=this[_0x530a39(0x60a)](this['index']());_0x42a420=_0x42a420[_0x530a39(0x265)](/\\I\[(\d+)\]/gi,''),_0x262eb1[_0x530a39(0x647)](),this[_0x530a39(0x205)](_0x42a420,_0x209ea0),this[_0x530a39(0x2ae)](_0x42a420,_0x209ea0),this[_0x530a39(0x5fe)](_0x42a420,_0x209ea0);}},Window_ItemCategory[_0x14015d(0x39a)][_0x14015d(0x205)]=function(_0x174533,_0x450e57){},Window_ItemCategory['prototype']['categoryNameWindowDrawText']=function(_0x322ac7,_0x391285){const _0x22df64=_0x14015d,_0xe6c9a9=this[_0x22df64(0x4c5)];_0xe6c9a9['drawText'](_0x322ac7,0x0,_0x391285['y'],_0xe6c9a9[_0x22df64(0x447)],_0x22df64(0x46c));},Window_ItemCategory[_0x14015d(0x39a)]['categoryNameWindowCenter']=function(_0x2c0b9b,_0x1606bc){const _0x83a1db=_0x14015d,_0x4ef149=this[_0x83a1db(0x4c5)],_0x4b457b=$gameSystem[_0x83a1db(0x35b)](),_0x39e8a4=_0x1606bc['x']+Math[_0x83a1db(0x31f)](_0x1606bc['width']/0x2)+_0x4b457b;_0x4ef149['x']=_0x4ef149['width']/-0x2+_0x39e8a4,_0x4ef149['y']=Math['floor'](_0x1606bc['height']/0x2);},Window_ItemList['prototype'][_0x14015d(0x46f)]=function(){const _0x2f7488=_0x14015d;if(this[_0x2f7488(0x44e)]()){const _0x2c4d3c=this[_0x2f7488(0x63e)]();if(this[_0x2f7488(0x60f)]()<=0x1){if(!this['isHandled'](_0x2f7488(0x592))&&Input[_0x2f7488(0x5e3)](_0x2f7488(0x592))){if(_0x2f7488(0x21c)!==_0x2f7488(0x651))this[_0x2f7488(0x573)]();else{if(!_0x4a3ee9[_0x2f7488(0x663)](_0x40b694))return![];}}!this[_0x2f7488(0x395)]('pageup')&&Input[_0x2f7488(0x5e3)](_0x2f7488(0x4ff))&&this[_0x2f7488(0x459)]();}else{if(this[_0x2f7488(0x60f)]()>0x1){if(Input[_0x2f7488(0x604)]('right')){if(_0x2f7488(0x576)!==_0x2f7488(0x576)){if(_0x4c22f6[_0x2f7488(0x663)](_0x11ee85))return![];}else this[_0x2f7488(0x414)](Input[_0x2f7488(0x5e3)](_0x2f7488(0x668)));}Input[_0x2f7488(0x604)](_0x2f7488(0x21e))&&this[_0x2f7488(0x25c)](Input['isTriggered'](_0x2f7488(0x21e)));if(this[_0x2f7488(0x1fe)]()){if('PtCJB'==='PtCJB'){Input[_0x2f7488(0x5e3)](_0x2f7488(0x592))&&Input[_0x2f7488(0x3f4)](_0x2f7488(0x5d9))&&this['cursorPagedown']();if(Input[_0x2f7488(0x5e3)]('pageup')&&Input['isPressed'](_0x2f7488(0x5d9))){if(_0x2f7488(0x43f)==='tJFuq'){const _0x57135f=this['itemAt'](_0x66ff98);_0x57135f?_0x437f38[_0x2f7488(0x39a)][_0x2f7488(0x586)][_0x2f7488(0x207)](this,_0x40877c):this[_0x2f7488(0x299)](_0x19b1ad);}else this[_0x2f7488(0x459)]();}}else this[_0x2f7488(0x652)]*=-0x1;}else Input[_0x2f7488(0x5e3)](_0x2f7488(0x592))&&this[_0x2f7488(0x573)](),Input[_0x2f7488(0x5e3)](_0x2f7488(0x4ff))&&(_0x2f7488(0x5b6)!==_0x2f7488(0x5b6)?_0x50f213['setValue'](_0x246767['SwitchBuy'],![]):this['cursorPageup']());}}if(Input[_0x2f7488(0x604)](_0x2f7488(0x2bf))){if(Input[_0x2f7488(0x3f4)](_0x2f7488(0x5d9))&&this['allowShiftScrolling']())this[_0x2f7488(0x573)]();else{if('qrGxl'===_0x2f7488(0x4ad)){if(!this[_0x2f7488(0x32b)]())return![];const _0x506a8b=_0x2ba31a[_0x2f7488(0x622)][this[_0x2f7488(0x4b0)]['etypeId']];return this['drawItemKeyData'](_0x506a8b,_0x42b307,_0x1248a1,_0x307d55,!![]),this[_0x2f7488(0x423)](_0x5ed885,_0x545bf4,_0x1452e9),this[_0x2f7488(0x647)](),!![];}else this[_0x2f7488(0x5f3)](Input[_0x2f7488(0x5e3)]('down'));}}Input[_0x2f7488(0x604)]('up')&&(Input[_0x2f7488(0x3f4)](_0x2f7488(0x5d9))&&this['allowShiftScrolling']()?_0x2f7488(0x438)!==_0x2f7488(0x2cd)?this[_0x2f7488(0x459)]():(_0x7cd637[_0x2f7488(0x502)]['Scene_Item_createItemWindow'][_0x2f7488(0x207)](this),this[_0x2f7488(0x2a7)]()&&this[_0x2f7488(0x371)](),this[_0x2f7488(0x3c5)]()&&this[_0x2f7488(0x4db)]()):this['cursorUp'](Input[_0x2f7488(0x5e3)]('up'))),Imported[_0x2f7488(0x3e1)]&&this['processCursorHomeEndTrigger'](),this[_0x2f7488(0x63e)]()!==_0x2c4d3c&&this[_0x2f7488(0x4b2)]();}},Window_ItemList['prototype'][_0x14015d(0x1fe)]=function(){const _0x295f88=_0x14015d,_0x213b25=SceneManager[_0x295f88(0x3ea)],_0x2abbc9=[Scene_Item,Scene_Shop];return _0x2abbc9['includes'](_0x213b25['constructor']);},Window_ItemList[_0x14015d(0x39a)]['activate']=function(){const _0x5ea288=_0x14015d;Window_Selectable[_0x5ea288(0x39a)][_0x5ea288(0x429)][_0x5ea288(0x207)](this),this[_0x5ea288(0x4eb)]&&this[_0x5ea288(0x4eb)][_0x5ea288(0x2a7)]()&&this['_categoryWindow'][_0x5ea288(0x429)]();},Window_ItemList[_0x14015d(0x39a)][_0x14015d(0x333)]=function(){const _0x37b9a1=_0x14015d;Window_Selectable['prototype']['deactivate'][_0x37b9a1(0x207)](this);if(this[_0x37b9a1(0x4eb)]&&this[_0x37b9a1(0x4eb)]['isUseModernControls']()){if(_0x37b9a1(0x2c9)!==_0x37b9a1(0x5f5))this['_categoryWindow']['deactivate']();else{const _0x413d38=_0x37b9a1(0x3fd);if(this['_customItemInfo'][_0x413d38])return this[_0x37b9a1(0x306)][_0x413d38];let _0x46a674='';if(this['_itemData'][_0x37b9a1(0x257)]>0x0)_0x46a674+=_0x37b9a1(0x479)[_0x37b9a1(0x2c8)](_0x216136[_0x37b9a1(0x31f)](this[_0x37b9a1(0x5a9)]['rateHP']*0x64));if(this['_itemData'][_0x37b9a1(0x257)]>0x0&&this['_itemData'][_0x37b9a1(0x597)]>0x0)_0x46a674+='\x20';if(this[_0x37b9a1(0x5a9)][_0x37b9a1(0x597)]>0x0)_0x46a674+=_0x37b9a1(0x638)[_0x37b9a1(0x2c8)](this[_0x37b9a1(0x5a9)][_0x37b9a1(0x597)]);return _0x46a674;}}},Window_ItemList['prototype'][_0x14015d(0x275)]=function(_0x1482c6){const _0x13ec6c=_0x14015d;this[_0x13ec6c(0x47d)]!==_0x1482c6&&(this[_0x13ec6c(0x47d)]=_0x1482c6,this['refresh'](),this[_0x13ec6c(0x4eb)]&&this[_0x13ec6c(0x4eb)][_0x13ec6c(0x2a7)]()?this[_0x13ec6c(0x467)](0x0):this[_0x13ec6c(0x39f)](0x0,0x0));},VisuMZ['ItemsEquipsCore']['Window_ItemList_maxCols']=Window_ItemList[_0x14015d(0x39a)]['maxCols'],Window_ItemList[_0x14015d(0x39a)]['maxCols']=function(){const _0x5a1fe0=_0x14015d;if(SceneManager[_0x5a1fe0(0x3ea)][_0x5a1fe0(0x603)]===Scene_Battle){if(_0x5a1fe0(0x5eb)===_0x5a1fe0(0x5eb))return VisuMZ['ItemsEquipsCore'][_0x5a1fe0(0x412)][_0x5a1fe0(0x207)](this);else this['cursorRight'](_0x42f103[_0x5a1fe0(0x5e3)](_0x5a1fe0(0x668)));}else{if(SceneManager[_0x5a1fe0(0x3ea)][_0x5a1fe0(0x603)]===Scene_Map){if(_0x5a1fe0(0x3fa)===_0x5a1fe0(0x3fa))return VisuMZ['ItemsEquipsCore']['Window_ItemList_maxCols'][_0x5a1fe0(0x207)](this);else _0x585862=_0x61cd93[_0x5a1fe0(0x31b)];}else{if('ebScu'!=='tvaNn')return VisuMZ['ItemsEquipsCore']['Settings'][_0x5a1fe0(0x5b4)]['ListWindowCols'];else this[_0x5a1fe0(0x372)]();}}},VisuMZ[_0x14015d(0x502)][_0x14015d(0x618)]=Window_ItemList[_0x14015d(0x39a)]['colSpacing'],Window_ItemList['prototype'][_0x14015d(0x39e)]=function(){const _0x888e7d=_0x14015d;if(this[_0x888e7d(0x60f)]()<=0x1){if(_0x888e7d(0x2da)===_0x888e7d(0x2da))return Window_Selectable[_0x888e7d(0x39a)][_0x888e7d(0x39e)][_0x888e7d(0x207)](this);else{const _0x4f4f42=_0x352689(_0x22a77b['$1'])[_0x888e7d(0x351)](/[\r\n]+/);for(const _0x22c94d of _0x4f4f42){const _0x2bec2b=_0xa7bb3['equipTypes'][_0x888e7d(0x42c)](_0x22c94d['trim']());if(_0x2bec2b>0x0)_0x7de00d['equipSlots'][_0x888e7d(0x58d)](_0x2bec2b);}}}else return VisuMZ[_0x888e7d(0x502)]['Window_ItemList_colSpacing'][_0x888e7d(0x207)](this);},Window_ItemList[_0x14015d(0x39a)][_0x14015d(0x415)]=function(_0x48b349){const _0x23ca27=_0x14015d;switch(this[_0x23ca27(0x47d)]){case _0x23ca27(0x27c):return DataManager['isItem'](_0x48b349);case'RegularItems':return DataManager['isItem'](_0x48b349)&&_0x48b349['itypeId']===0x1;case'KeyItems':return DataManager[_0x23ca27(0x342)](_0x48b349)&&_0x48b349['itypeId']===0x2;case _0x23ca27(0x514):return DataManager['isItem'](_0x48b349)&&_0x48b349['itypeId']===0x3;case _0x23ca27(0x569):return DataManager[_0x23ca27(0x342)](_0x48b349)&&_0x48b349[_0x23ca27(0x3e2)]===0x4;case _0x23ca27(0x42b):return DataManager[_0x23ca27(0x342)](_0x48b349)&&_0x48b349[_0x23ca27(0x2f5)];case _0x23ca27(0x255):return DataManager[_0x23ca27(0x342)](_0x48b349)&&!_0x48b349[_0x23ca27(0x2f5)];case _0x23ca27(0x477):return DataManager['isItem'](_0x48b349)&&[0x0]['includes'](_0x48b349[_0x23ca27(0x3a6)]);case _0x23ca27(0x57b):return DataManager['isItem'](_0x48b349)&&[0x0,0x1]['includes'](_0x48b349[_0x23ca27(0x3a6)]);case _0x23ca27(0x4d1):return DataManager[_0x23ca27(0x342)](_0x48b349)&&[0x0,0x2][_0x23ca27(0x415)](_0x48b349[_0x23ca27(0x3a6)]);case _0x23ca27(0x344):return DataManager[_0x23ca27(0x342)](_0x48b349)&&[0x3][_0x23ca27(0x415)](_0x48b349['occasion']);case _0x23ca27(0x4ce):return DataManager[_0x23ca27(0x3ec)](_0x48b349);case _0x23ca27(0x38e):return DataManager[_0x23ca27(0x48d)](_0x48b349);default:if(this['_category'][_0x23ca27(0x497)](/WTYPE:(\d+)/i))return _0x23ca27(0x2c5)!==_0x23ca27(0x4e9)?DataManager[_0x23ca27(0x3ec)](_0x48b349)&&_0x48b349[_0x23ca27(0x401)]===Number(RegExp['$1']):!![];else{if(this['_category']['match'](/WTYPE:(.*)/i)){const _0x2bbd1a=$dataSystem['weaponTypes'][_0x23ca27(0x42c)](String(RegExp['$1'])[_0x23ca27(0x4e3)]());return DataManager[_0x23ca27(0x3ec)](_0x48b349)&&_0x48b349['wtypeId']===_0x2bbd1a;}else{if(this[_0x23ca27(0x47d)][_0x23ca27(0x497)](/ATYPE:(\d+)/i))return DataManager['isArmor'](_0x48b349)&&_0x48b349['atypeId']===Number(RegExp['$1']);else{if(this[_0x23ca27(0x47d)][_0x23ca27(0x497)](/ATYPE:(.*)/i)){const _0x1a991a=$dataSystem[_0x23ca27(0x2eb)][_0x23ca27(0x42c)](String(RegExp['$1'])[_0x23ca27(0x4e3)]());return DataManager['isArmor'](_0x48b349)&&_0x48b349['atypeId']===_0x1a991a;}else{if(this[_0x23ca27(0x47d)][_0x23ca27(0x497)](/ETYPE:(\d+)/i))return!!_0x48b349&&_0x48b349[_0x23ca27(0x59b)]===Number(RegExp['$1']);else{if(this[_0x23ca27(0x47d)][_0x23ca27(0x497)](/ETYPE:(.*)/i)){const _0x565e85=$dataSystem[_0x23ca27(0x622)]['indexOf'](String(RegExp['$1'])['trim']());return DataManager[_0x23ca27(0x48d)](_0x48b349)&&_0x48b349[_0x23ca27(0x59b)]===_0x565e85;}else{if(this[_0x23ca27(0x47d)][_0x23ca27(0x497)](/Category:(.*)/i))return!!_0x48b349&&_0x48b349[_0x23ca27(0x4f5)]['includes'](String(RegExp['$1'])[_0x23ca27(0x34e)]()[_0x23ca27(0x4e3)]());}}}}}}}return![];},Window_ItemList[_0x14015d(0x39a)][_0x14015d(0x4c2)]=function(){return!![];},VisuMZ[_0x14015d(0x502)][_0x14015d(0x2dc)]=Window_ItemList[_0x14015d(0x39a)][_0x14015d(0x586)],Window_ItemList[_0x14015d(0x39a)]['drawItem']=function(_0x5d9661){const _0x23ee96=_0x14015d;VisuMZ[_0x23ee96(0x502)][_0x23ee96(0x2dc)]['call'](this,_0x5d9661),this[_0x23ee96(0x655)](_0x5d9661);},Window_ItemList['prototype'][_0x14015d(0x654)]=function(_0x1bec38,_0x102796,_0x32671c,_0xcff0d6){const _0x2ac4fc=_0x14015d;Window_Selectable[_0x2ac4fc(0x39a)][_0x2ac4fc(0x654)][_0x2ac4fc(0x207)](this,_0x1bec38,_0x102796,_0x32671c,_0xcff0d6);},Window_ItemList[_0x14015d(0x39a)][_0x14015d(0x655)]=function(_0xc783ae){const _0x4746d2=_0x14015d,_0x1510be=this[_0x4746d2(0x664)](_0xc783ae);if(!_0x1510be||!this[_0x4746d2(0x4c2)]())return;if(!$gameParty[_0x4746d2(0x642)](_0x1510be))return;const _0x40576b=this[_0x4746d2(0x4da)](_0xc783ae),_0xb2767c=_0x40576b['x'],_0x39d959=_0x40576b['y']+(this[_0x4746d2(0x4ee)]()-ImageManager[_0x4746d2(0x25a)])/0x2,_0x31f933=VisuMZ[_0x4746d2(0x502)][_0x4746d2(0x524)][_0x4746d2(0x533)][_0x4746d2(0x44a)],_0x315fd7=VisuMZ[_0x4746d2(0x502)]['Settings']['New'][_0x4746d2(0x591)];this[_0x4746d2(0x583)](_0x1510be,_0xb2767c+_0x31f933,_0x39d959+_0x315fd7);},Window_ItemList[_0x14015d(0x39a)][_0x14015d(0x61b)]=function(_0x27e192){const _0x3358b0=_0x14015d;this['_statusWindow']=_0x27e192,this[_0x3358b0(0x22a)]();},VisuMZ[_0x14015d(0x502)][_0x14015d(0x2a6)]=Window_ItemList[_0x14015d(0x39a)][_0x14015d(0x20b)],Window_ItemList[_0x14015d(0x39a)][_0x14015d(0x20b)]=function(){const _0x18af49=_0x14015d;VisuMZ[_0x18af49(0x502)][_0x18af49(0x2a6)][_0x18af49(0x207)](this),this['_statusWindow']&&this['_statusWindow']['constructor']===Window_ShopStatus&&this[_0x18af49(0x3c8)][_0x18af49(0x60b)](this['item']());},Window_BattleItem[_0x14015d(0x39a)][_0x14015d(0x352)]=function(_0x2f2aee){const _0x57995e=_0x14015d;return BattleManager['actor']()?BattleManager[_0x57995e(0x496)]()['canUse'](_0x2f2aee):Window_ItemList[_0x57995e(0x39a)][_0x57995e(0x352)]['call'](this,_0x2f2aee);},Window_EventItem['prototype'][_0x14015d(0x4c2)]=function(){return![];},Window_EquipStatus[_0x14015d(0x39a)][_0x14015d(0x398)]=function(){const _0x4fdd81=_0x14015d;return VisuMZ[_0x4fdd81(0x502)][_0x4fdd81(0x524)]['EquipScene'][_0x4fdd81(0x2d2)];},VisuMZ[_0x14015d(0x502)][_0x14015d(0x3d1)]=Window_EquipStatus[_0x14015d(0x39a)]['refresh'],Window_EquipStatus['prototype'][_0x14015d(0x4f8)]=function(){const _0x184064=_0x14015d;this['hideAdditionalSprites'](),this[_0x184064(0x647)]();if(this[_0x184064(0x3c2)])this[_0x184064(0x3c2)][_0x184064(0x4f8)]();this[_0x184064(0x398)]()?this[_0x184064(0x44b)]():VisuMZ[_0x184064(0x502)][_0x184064(0x3d1)][_0x184064(0x207)](this);},Window_EquipStatus[_0x14015d(0x39a)][_0x14015d(0x44b)]=function(){const _0xf6313f=_0x14015d;this[_0xf6313f(0x45c)][_0xf6313f(0x28a)]();if(!this[_0xf6313f(0x3c2)])return;if(this['isMainMenuCoreMenuImageOptionAvailable']()){const _0x468247=ImageManager[_0xf6313f(0x269)](this['_actor'][_0xf6313f(0x648)]());_0x468247[_0xf6313f(0x47a)](this[_0xf6313f(0x236)][_0xf6313f(0x3e7)](this));}else this[_0xf6313f(0x60d)]();},Window_EquipStatus[_0x14015d(0x39a)]['isMainMenuCoreMenuImageOptionAvailable']=function(){const _0x7b2cb2=_0x14015d;return Imported[_0x7b2cb2(0x585)]&&this[_0x7b2cb2(0x3c2)]['getMenuImage']()!==''&&VisuMZ[_0x7b2cb2(0x502)][_0x7b2cb2(0x524)][_0x7b2cb2(0x656)][_0x7b2cb2(0x1f8)];},Window_EquipStatus[_0x14015d(0x39a)][_0x14015d(0x236)]=function(){const _0x58d735=_0x14015d;VisuMZ['ItemsEquipsCore'][_0x58d735(0x524)][_0x58d735(0x656)][_0x58d735(0x232)]['call'](this),this[_0x58d735(0x356)]();},Window_EquipStatus[_0x14015d(0x39a)][_0x14015d(0x60d)]=function(){const _0x44ac6c=_0x14015d;VisuMZ['ItemsEquipsCore'][_0x44ac6c(0x524)][_0x44ac6c(0x656)][_0x44ac6c(0x48f)][_0x44ac6c(0x207)](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus[_0x14015d(0x39a)][_0x14015d(0x356)]=function(){const _0x5f0553=_0x14015d;this[_0x5f0553(0x647)](),VisuMZ[_0x5f0553(0x502)][_0x5f0553(0x524)]['EquipScene']['DrawParamJS'][_0x5f0553(0x207)](this);},Window_EquipStatus['prototype'][_0x14015d(0x241)]=function(_0x1b242f,_0x474e9a,_0x4d390f,_0x587a66,_0xc47b98){const _0x259463=_0x14015d,_0x29dffe=ImageManager[_0x259463(0x269)](_0x1b242f[_0x259463(0x648)]()),_0x16923e=this[_0x259463(0x447)]-_0x29dffe[_0x259463(0x5ed)];_0x474e9a+=_0x16923e/0x2;if(_0x16923e<0x0)_0x587a66-=_0x16923e;Window_StatusBase[_0x259463(0x39a)]['drawItemActorMenuImage']['call'](this,_0x1b242f,_0x474e9a,_0x4d390f,_0x587a66,_0xc47b98);},Window_EquipStatus[_0x14015d(0x39a)][_0x14015d(0x38c)]=function(){const _0x723d6f=_0x14015d;if(Imported[_0x723d6f(0x3e1)]){if('vaQnc'===_0x723d6f(0x5e1))return VisuMZ[_0x723d6f(0x31a)][_0x723d6f(0x524)]['Param'][_0x723d6f(0x45b)];else{const _0x1e8004=_0x4ac4ff(_0xcb95e2['$1'])||0x1;if(_0x24bce7>=_0x1e8004)return!![];}}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x14015d(0x39a)][_0x14015d(0x4c4)]=function(){const _0x6be530=_0x14015d;return VisuMZ[_0x6be530(0x502)][_0x6be530(0x524)]['EquipScene'][_0x6be530(0x40a)];},Window_EquipStatus[_0x14015d(0x39a)]['isUseParamNamesWithIcons']=function(){const _0x11e4aa=_0x14015d;return Imported[_0x11e4aa(0x3e1)]&&VisuMZ[_0x11e4aa(0x31a)][_0x11e4aa(0x524)]['Param']['DrawIcons'];},Window_EquipStatus[_0x14015d(0x39a)][_0x14015d(0x61a)]=function(_0x4e7eb2,_0x5015d7,_0x2e2007,_0x48fa6e){const _0x168482=_0x14015d,_0x4a7890=this[_0x168482(0x557)]();Imported[_0x168482(0x3e1)]?this['drawParamText'](_0x5015d7+_0x4a7890,_0x2e2007,_0x48fa6e,_0x4e7eb2,![]):this[_0x168482(0x35f)](TextManager['param'](_0x4e7eb2),_0x5015d7+_0x4a7890,_0x2e2007,_0x48fa6e);},Window_EquipStatus[_0x14015d(0x39a)]['drawUpdatedBeforeParamValue']=function(_0xee6240,_0x3db777,_0x51a489,_0x5e9778){const _0x2de7bb=_0x14015d,_0x48bae0=this[_0x2de7bb(0x557)]();let _0x5eee2f=0x0;if(Imported[_0x2de7bb(0x3e1)]){if(_0x2de7bb(0x643)!==_0x2de7bb(0x643)){if(!this[_0x2de7bb(0x2af)][_0x4ffb7a])this[_0x2de7bb(0x2af)][_0x31e21d]=new _0x3901a2();}else _0x5eee2f=this[_0x2de7bb(0x3c2)][_0x2de7bb(0x325)](_0xee6240,!![]);}else{if('cezVY'===_0x2de7bb(0x2a1))_0x5eee2f=this[_0x2de7bb(0x3c2)][_0x2de7bb(0x245)](_0xee6240);else for(const _0x5af60c of _0x1c2b94){_0x5af60c[_0x2de7bb(0x497)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x298df1=_0x2c5353(_0x68fc2f['$1'])['toUpperCase']()[_0x2de7bb(0x4e3)]()['split'](',');for(const _0x2ebc6d of _0x298df1){_0x4cecb2[_0x2de7bb(0x4f5)][_0x2de7bb(0x58d)](_0x2ebc6d[_0x2de7bb(0x4e3)]());}}}const _0xf5d567=_0x5eee2f;this[_0x2de7bb(0x35f)](_0x5eee2f,_0x3db777,_0x51a489,_0x5e9778-_0x48bae0,'right');},Window_EquipStatus[_0x14015d(0x39a)][_0x14015d(0x3ee)]=function(_0x46abeb,_0x247b49,_0x5a1df8,_0x216d9d){const _0x1767bb=_0x14015d,_0x3073a5=this[_0x1767bb(0x557)]();let _0x307bec=0x0,_0x14d3c7=0x0,_0x30d7b6='';if(this['_tempActor']){Imported[_0x1767bb(0x3e1)]?(_0x307bec=this['_actor']['paramValueByName'](_0x46abeb,![]),_0x14d3c7=this[_0x1767bb(0x509)]['paramValueByName'](_0x46abeb,![]),_0x30d7b6=this['_tempActor'][_0x1767bb(0x325)](_0x46abeb,!![])):(_0x307bec=this[_0x1767bb(0x3c2)]['param'](_0x46abeb),_0x14d3c7=this[_0x1767bb(0x509)][_0x1767bb(0x245)](_0x46abeb),_0x30d7b6=this[_0x1767bb(0x509)][_0x1767bb(0x245)](_0x46abeb));const _0x212e6d=_0x307bec,_0x33c206=_0x14d3c7;diffValue=_0x33c206-_0x212e6d,this[_0x1767bb(0x2b3)](ColorManager[_0x1767bb(0x4d2)](diffValue)),this[_0x1767bb(0x35f)](_0x30d7b6,_0x247b49,_0x5a1df8,_0x216d9d-_0x3073a5,_0x1767bb(0x668));}},Window_EquipStatus[_0x14015d(0x39a)][_0x14015d(0x46e)]=function(_0xc790e9,_0x26f779,_0x392d6c,_0x538c71){const _0x1133f1=_0x14015d,_0x1c9ade=this['itemPadding']();let _0x35560b=0x0,_0x31e6c2=0x0,_0x496a9f=![];if(this[_0x1133f1(0x509)]){if(Imported[_0x1133f1(0x3e1)])_0x35560b=this[_0x1133f1(0x3c2)][_0x1133f1(0x325)](_0xc790e9,![]),_0x31e6c2=this[_0x1133f1(0x509)][_0x1133f1(0x325)](_0xc790e9,![]),_0x496a9f=String(this[_0x1133f1(0x3c2)][_0x1133f1(0x325)](_0xc790e9,!![]))[_0x1133f1(0x497)](/([%％])/i);else{if('mzavm'===_0x1133f1(0x63b)){if(_0x571007[_0x1133f1(0x392)](_0xc6c97a))_0x347c21=null;const _0x5efc26=this[_0x1133f1(0x570)](_0xae1db4);_0x32a53b[_0x1133f1(0x502)][_0x1133f1(0x617)][_0x1133f1(0x207)](this,_0x119c27,_0x54ca51,_0x27161b);if(this[_0x1133f1(0x570)](_0x434540)>_0x5efc26)this[_0x1133f1(0x5d6)](_0x21bf75);}else _0x35560b=this[_0x1133f1(0x3c2)][_0x1133f1(0x245)](_0xc790e9),_0x31e6c2=this[_0x1133f1(0x509)][_0x1133f1(0x245)](_0xc790e9),_0x496a9f=_0x35560b%0x1!==0x0||_0x31e6c2%0x1!==0x0;}const _0xd997cc=_0x35560b,_0x2faeec=_0x31e6c2,_0x5ec1f2=_0x2faeec-_0xd997cc;let _0x45580e=_0x5ec1f2;if(_0x496a9f)_0x45580e=Math[_0x1133f1(0x5a8)](_0x5ec1f2*0x64)+'%';_0x5ec1f2!==0x0&&(this[_0x1133f1(0x2b3)](ColorManager[_0x1133f1(0x4d2)](_0x5ec1f2)),_0x45580e=(_0x5ec1f2>0x0?_0x1133f1(0x297):_0x1133f1(0x253))[_0x1133f1(0x2c8)](_0x45580e),this['drawText'](_0x45580e,_0x26f779+_0x1c9ade,_0x392d6c,_0x538c71,_0x1133f1(0x21e)));}},Window_EquipStatus[_0x14015d(0x39a)][_0x14015d(0x423)]=function(_0x290d7b,_0xf0101e,_0x37fa4e,_0x42d8a3,_0x100f9a){const _0x4f93b8=_0x14015d;if(VisuMZ[_0x4f93b8(0x502)][_0x4f93b8(0x524)][_0x4f93b8(0x656)][_0x4f93b8(0x420)]===![])return;_0x100f9a=Math['max'](_0x100f9a||0x1,0x1);while(_0x100f9a--){if(_0x4f93b8(0x4c1)===_0x4f93b8(0x3cb))_0x326833='item-%1'[_0x4f93b8(0x2c8)](_0x1b9232['id']);else{_0x42d8a3=_0x42d8a3||this[_0x4f93b8(0x4ee)](),this[_0x4f93b8(0x45c)][_0x4f93b8(0x5b9)]=0xa0;const _0x3dfc61=ColorManager[_0x4f93b8(0x66f)]();this[_0x4f93b8(0x45c)][_0x4f93b8(0x548)](_0x290d7b+0x1,_0xf0101e+0x1,_0x37fa4e-0x2,_0x42d8a3-0x2,_0x3dfc61),this[_0x4f93b8(0x45c)][_0x4f93b8(0x5b9)]=0xff;}}},ColorManager[_0x14015d(0x66f)]=function(){const _0x335952=_0x14015d,_0x52609f=VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'];let _0x16852f=_0x52609f[_0x335952(0x59e)]!==undefined?_0x52609f[_0x335952(0x59e)]:0x13;return ColorManager[_0x335952(0x2b1)](_0x16852f);},VisuMZ[_0x14015d(0x502)][_0x14015d(0x64a)]=Window_EquipCommand[_0x14015d(0x39a)][_0x14015d(0x2c7)],Window_EquipCommand[_0x14015d(0x39a)]['initialize']=function(_0x2022ef){const _0x30e638=_0x14015d;VisuMZ[_0x30e638(0x502)][_0x30e638(0x64a)]['call'](this,_0x2022ef),this[_0x30e638(0x39d)](_0x2022ef);},Window_EquipCommand[_0x14015d(0x39a)][_0x14015d(0x39d)]=function(_0x23a9ea){const _0x57110a=_0x14015d,_0x19adf2=new Rectangle(0x0,0x0,_0x23a9ea[_0x57110a(0x5ed)],_0x23a9ea['height']);this['_commandNameWindow']=new Window_Base(_0x19adf2),this[_0x57110a(0x2fe)][_0x57110a(0x2e2)]=0x0,this[_0x57110a(0x3d9)](this[_0x57110a(0x2fe)]),this[_0x57110a(0x1e9)]();},Window_EquipCommand['prototype']['callUpdateHelp']=function(){const _0x309de1=_0x14015d;Window_HorzCommand['prototype'][_0x309de1(0x22a)][_0x309de1(0x207)](this);if(this[_0x309de1(0x2fe)])this['updateCommandNameWindow']();},Window_EquipCommand[_0x14015d(0x39a)][_0x14015d(0x1e9)]=function(){const _0x2ffee5=_0x14015d,_0x12a10f=this[_0x2ffee5(0x2fe)];_0x12a10f[_0x2ffee5(0x45c)][_0x2ffee5(0x28a)]();const _0x26f0ef=this[_0x2ffee5(0x465)](this['index']());if(_0x26f0ef===_0x2ffee5(0x64e)){const _0x507858=this[_0x2ffee5(0x4da)](this[_0x2ffee5(0x63e)]());let _0x2d4888=this[_0x2ffee5(0x60a)](this[_0x2ffee5(0x63e)]());_0x2d4888=_0x2d4888[_0x2ffee5(0x265)](/\\I\[(\d+)\]/gi,''),_0x12a10f[_0x2ffee5(0x647)](),this[_0x2ffee5(0x254)](_0x2d4888,_0x507858),this[_0x2ffee5(0x2fb)](_0x2d4888,_0x507858),this[_0x2ffee5(0x3a2)](_0x2d4888,_0x507858);}},Window_EquipCommand['prototype'][_0x14015d(0x254)]=function(_0x276994,_0x201c75){},Window_EquipCommand[_0x14015d(0x39a)][_0x14015d(0x2fb)]=function(_0x5766a9,_0x1a53d8){const _0x860342=_0x14015d,_0x531203=this['_commandNameWindow'];_0x531203[_0x860342(0x35f)](_0x5766a9,0x0,_0x1a53d8['y'],_0x531203[_0x860342(0x447)],_0x860342(0x46c));},Window_EquipCommand[_0x14015d(0x39a)][_0x14015d(0x3a2)]=function(_0x2498b,_0x5cca5c){const _0x1b170a=_0x14015d,_0x2a6485=this[_0x1b170a(0x2fe)],_0xfa8adf=$gameSystem[_0x1b170a(0x35b)](),_0x1f1ad3=_0x5cca5c['x']+Math[_0x1b170a(0x31f)](_0x5cca5c[_0x1b170a(0x5ed)]/0x2)+_0xfa8adf;_0x2a6485['x']=_0x2a6485['width']/-0x2+_0x1f1ad3,_0x2a6485['y']=Math[_0x1b170a(0x31f)](_0x5cca5c[_0x1b170a(0x206)]/0x2);},Window_EquipCommand[_0x14015d(0x39a)][_0x14015d(0x2a7)]=function(){const _0x2261c4=_0x14015d;return Imported[_0x2261c4(0x3e1)]&&Window_HorzCommand[_0x2261c4(0x39a)][_0x2261c4(0x2a7)][_0x2261c4(0x207)](this);},Window_EquipCommand[_0x14015d(0x39a)][_0x14015d(0x2f8)]=function(){const _0x52873d=_0x14015d;if(this[_0x52873d(0x5b5)]()==='equip')Window_HorzCommand[_0x52873d(0x39a)][_0x52873d(0x2f8)][_0x52873d(0x207)](this);},Window_EquipCommand['prototype'][_0x14015d(0x46f)]=function(){const _0x5b509e=_0x14015d;if(!this['processCursorSpecialCheckModernControls']()){if(_0x5b509e(0x582)==='RDcNJ')Window_HorzCommand['prototype'][_0x5b509e(0x46f)]['call'](this);else{const _0x2243bf=this[_0x5b509e(0x250)](),_0x59bba9=this[_0x5b509e(0x446)]()?this[_0x5b509e(0x25d)]():0x0,_0x3e2f84=_0x2243bf['y']+_0x2243bf[_0x5b509e(0x206)],_0x35af29=_0x815932[_0x5b509e(0x5c1)]-this[_0x5b509e(0x25d)](),_0x387dee=this[_0x5b509e(0x432)]()-_0x2243bf['height'];return new _0xe4aac4(_0x59bba9,_0x3e2f84,_0x35af29,_0x387dee);}}},Window_EquipCommand[_0x14015d(0x39a)][_0x14015d(0x214)]=function(){const _0xc32401=_0x14015d;if(!this[_0xc32401(0x44e)]())return![];if(SceneManager[_0xc32401(0x3ea)][_0xc32401(0x603)]!==Scene_Equip)return![];return Input[_0xc32401(0x5e3)](_0xc32401(0x2bf))&&(this[_0xc32401(0x4b2)](),SceneManager[_0xc32401(0x3ea)][_0xc32401(0x341)](),SceneManager[_0xc32401(0x3ea)]['_slotWindow'][_0xc32401(0x467)](-0x1)),![];},Window_EquipCommand['prototype'][_0x14015d(0x60f)]=function(){const _0x4eb7e2=_0x14015d;return this[_0x4eb7e2(0x464)]?this[_0x4eb7e2(0x464)]['length']:0x3;},Window_EquipCommand[_0x14015d(0x39a)]['processTouchModernControls']=function(){const _0x5efcc5=_0x14015d;if(this[_0x5efcc5(0x288)]()&&this['visible']&&SceneManager['_scene'][_0x5efcc5(0x603)]===Scene_Equip){if('qkLwx'===_0x5efcc5(0x37e))return this[_0x5efcc5(0x4b0)][_0x5efcc5(0x421)]*this[_0x5efcc5(0x561)]();else{if(this[_0x5efcc5(0x5ce)]()&&TouchInput[_0x5efcc5(0x246)]())this[_0x5efcc5(0x424)](![]);else TouchInput[_0x5efcc5(0x5e3)]()&&this[_0x5efcc5(0x424)](!![]);if(TouchInput['isClicked']()){if(_0x5efcc5(0x5b1)!=='zLtDA')this[_0x5efcc5(0x605)]();else return![];}}}},Window_EquipCommand[_0x14015d(0x39a)]['onTouchSelectModernControls']=function(_0x2faa2a){const _0x50ebd1=_0x14015d;this['_doubleTouch']=![];const _0x3dc69e=this[_0x50ebd1(0x63e)](),_0x30e339=this['hitIndex'](),_0xb59328=SceneManager['_scene']['_slotWindow'];if(_0xb59328[_0x50ebd1(0x288)]()&&_0xb59328[_0x50ebd1(0x30e)]){if(_0x30e339>=0x0){if(_0x50ebd1(0x637)===_0x50ebd1(0x31c))return _0x3a6be6[_0x50ebd1(0x502)][_0x50ebd1(0x66a)]['call'](this);else _0x30e339===this[_0x50ebd1(0x63e)]()&&(_0x50ebd1(0x4d9)!==_0x50ebd1(0x4cd)?this[_0x50ebd1(0x304)]=!![]:(_0x102a81[_0x50ebd1(0x502)][_0x50ebd1(0x55c)](_0x512552),_0x1c3c44[_0x50ebd1(0x502)][_0x50ebd1(0x55c)](_0x31bdec),_0x296448['ItemsEquipsCore'][_0x50ebd1(0x55c)](_0x163c05))),this['activate'](),this[_0x50ebd1(0x383)](_0x30e339);}else _0xb59328[_0x50ebd1(0x5a5)]()>=0x0&&(this[_0x50ebd1(0x333)](),this[_0x50ebd1(0x37b)]());}_0x2faa2a&&this[_0x50ebd1(0x63e)]()!==_0x3dc69e&&this[_0x50ebd1(0x4b2)]();},Window_EquipCommand['prototype'][_0x14015d(0x320)]=function(){const _0x3f955b=_0x14015d;this[_0x3f955b(0x31e)](),this['addOptimizeCommand'](),this[_0x3f955b(0x34a)]();},Window_EquipCommand[_0x14015d(0x39a)]['refresh']=function(){const _0x4a9b4c=_0x14015d;Window_HorzCommand[_0x4a9b4c(0x39a)]['refresh'][_0x4a9b4c(0x207)](this),this[_0x4a9b4c(0x56d)]();},Window_EquipCommand[_0x14015d(0x39a)][_0x14015d(0x31e)]=function(){const _0x565672=_0x14015d;if(!this[_0x565672(0x4af)]())return;const _0xeb4df4=this['commandStyle'](),_0x54fa3e=VisuMZ[_0x565672(0x502)][_0x565672(0x524)][_0x565672(0x656)][_0x565672(0x238)],_0x47cf81=_0xeb4df4===_0x565672(0x672)?TextManager[_0x565672(0x5f4)]:_0x565672(0x278)[_0x565672(0x2c8)](_0x54fa3e,TextManager[_0x565672(0x5f4)]),_0xa87b77=this[_0x565672(0x390)]();this[_0x565672(0x364)](_0x47cf81,'equip',_0xa87b77);},Window_EquipCommand[_0x14015d(0x39a)][_0x14015d(0x4af)]=function(){return!this['isUseModernControls']();},Window_EquipCommand['prototype'][_0x14015d(0x390)]=function(){return!![];},Window_EquipCommand[_0x14015d(0x39a)]['addOptimizeCommand']=function(){const _0x598789=_0x14015d;if(!this[_0x598789(0x4a6)]())return;const _0x5a5398=this[_0x598789(0x5d4)](),_0x4a7ff8=VisuMZ[_0x598789(0x502)]['Settings'][_0x598789(0x656)][_0x598789(0x309)],_0x118fab=_0x5a5398===_0x598789(0x672)?TextManager[_0x598789(0x240)]:_0x598789(0x278)[_0x598789(0x2c8)](_0x4a7ff8,TextManager[_0x598789(0x240)]),_0x10374f=this[_0x598789(0x242)]();this[_0x598789(0x364)](_0x118fab,_0x598789(0x240),_0x10374f);},Window_EquipCommand[_0x14015d(0x39a)][_0x14015d(0x4a6)]=function(){const _0x62c127=_0x14015d;return VisuMZ[_0x62c127(0x502)]['Settings']['EquipScene']['CommandAddOptimize'];},Window_EquipCommand[_0x14015d(0x39a)]['isOptimizeCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x14015d(0x39a)][_0x14015d(0x34a)]=function(){const _0x42212d=_0x14015d;if(!this[_0x42212d(0x226)]())return;const _0x44bf2a=this[_0x42212d(0x5d4)](),_0x5d30a7=VisuMZ[_0x42212d(0x502)]['Settings']['EquipScene'][_0x42212d(0x234)],_0x590ea7=_0x44bf2a===_0x42212d(0x672)?TextManager[_0x42212d(0x28a)]:'\x5cI[%1]%2'[_0x42212d(0x2c8)](_0x5d30a7,TextManager[_0x42212d(0x28a)]),_0x1d8b34=this[_0x42212d(0x20a)]();this['addCommand'](_0x590ea7,_0x42212d(0x28a),_0x1d8b34);},Window_EquipCommand[_0x14015d(0x39a)]['isClearCommandAdded']=function(){const _0x31cfb3=_0x14015d;return VisuMZ[_0x31cfb3(0x502)][_0x31cfb3(0x524)][_0x31cfb3(0x656)]['CommandAddClear'];},Window_EquipCommand[_0x14015d(0x39a)][_0x14015d(0x20a)]=function(){return!![];},Window_EquipCommand['prototype'][_0x14015d(0x218)]=function(){const _0x2cf69c=_0x14015d;return VisuMZ[_0x2cf69c(0x502)][_0x2cf69c(0x524)][_0x2cf69c(0x656)]['CmdTextAlign'];},Window_EquipCommand[_0x14015d(0x39a)][_0x14015d(0x586)]=function(_0x5575f1){const _0x340f4c=_0x14015d,_0x305c5d=this['commandStyleCheck'](_0x5575f1);if(_0x305c5d===_0x340f4c(0x365))this[_0x340f4c(0x43e)](_0x5575f1);else _0x305c5d===_0x340f4c(0x64e)?this['drawItemStyleIcon'](_0x5575f1):Window_HorzCommand['prototype']['drawItem']['call'](this,_0x5575f1);},Window_EquipCommand['prototype']['commandStyle']=function(){const _0x39cce3=_0x14015d;return VisuMZ[_0x39cce3(0x502)][_0x39cce3(0x524)][_0x39cce3(0x656)][_0x39cce3(0x2b9)];},Window_EquipCommand['prototype']['commandStyleCheck']=function(_0xde0dcc){const _0x53836b=_0x14015d;if(_0xde0dcc<0x0)return _0x53836b(0x672);const _0x108506=this['commandStyle']();if(_0x108506!==_0x53836b(0x51f)){if('jRXad'===_0x53836b(0x1ea)){if(!this['isCursorMovable']())return![];if(_0xaaad88[_0x53836b(0x3ea)][_0x53836b(0x603)]!==_0x5533ab)return![];return _0x321042[_0x53836b(0x5e3)](_0x53836b(0x2bf))&&(this[_0x53836b(0x4b2)](),_0x2b9e29[_0x53836b(0x3ea)][_0x53836b(0x341)](),_0x3c3aa8[_0x53836b(0x3ea)][_0x53836b(0x296)][_0x53836b(0x467)](-0x1)),![];}else return _0x108506;}else{if(this[_0x53836b(0x1e4)]()>0x0){const _0x545f8a=this[_0x53836b(0x60a)](_0xde0dcc);if(_0x545f8a['match'](/\\I\[(\d+)\]/i)){if(_0x53836b(0x5d2)==='oMGSb'){const _0x45966d=this[_0x53836b(0x4da)](_0xde0dcc),_0x224105=this[_0x53836b(0x5dc)](_0x545f8a)[_0x53836b(0x5ed)];return _0x224105<=_0x45966d[_0x53836b(0x5ed)]?_0x53836b(0x365):_0x53836b(0x64e);}else{if(this['_tempActor'])return![];_0x22d5c2['_bypassNewLabel']=!![];const _0x3e79e2=_0x6f898d[_0x53836b(0x502)]['Game_Actor_tradeItemWithParty'][_0x53836b(0x207)](this,_0x369367,_0x5c2333);return _0xdfbf31[_0x53836b(0x2c3)]=![],_0x3e79e2;}}}}return _0x53836b(0x672);},Window_EquipCommand['prototype'][_0x14015d(0x43e)]=function(_0x3c49b7){const _0x5ae907=_0x14015d,_0x45e1d0=this[_0x5ae907(0x4da)](_0x3c49b7),_0xe93a8d=this['commandName'](_0x3c49b7),_0x34959a=this[_0x5ae907(0x5dc)](_0xe93a8d)[_0x5ae907(0x5ed)];this[_0x5ae907(0x2d0)](this[_0x5ae907(0x200)](_0x3c49b7));const _0x9949=this[_0x5ae907(0x218)]();if(_0x9949===_0x5ae907(0x668))this[_0x5ae907(0x37a)](_0xe93a8d,_0x45e1d0['x']+_0x45e1d0['width']-_0x34959a,_0x45e1d0['y'],_0x34959a);else{if(_0x9949===_0x5ae907(0x46c)){const _0x1f61ed=_0x45e1d0['x']+Math[_0x5ae907(0x31f)]((_0x45e1d0[_0x5ae907(0x5ed)]-_0x34959a)/0x2);this[_0x5ae907(0x37a)](_0xe93a8d,_0x1f61ed,_0x45e1d0['y'],_0x34959a);}else this[_0x5ae907(0x37a)](_0xe93a8d,_0x45e1d0['x'],_0x45e1d0['y'],_0x34959a);}},Window_EquipCommand[_0x14015d(0x39a)]['drawItemStyleIcon']=function(_0xf614d4){const _0x58c725=_0x14015d;this[_0x58c725(0x60a)](_0xf614d4)[_0x58c725(0x497)](/\\I\[(\d+)\]/i);const _0x1708b5=Number(RegExp['$1'])||0x0,_0xbd2e9d=this[_0x58c725(0x4da)](_0xf614d4),_0x1ef851=_0xbd2e9d['x']+Math[_0x58c725(0x31f)]((_0xbd2e9d[_0x58c725(0x5ed)]-ImageManager[_0x58c725(0x674)])/0x2),_0x1a69af=_0xbd2e9d['y']+(_0xbd2e9d['height']-ImageManager[_0x58c725(0x25a)])/0x2;this['drawIcon'](_0x1708b5,_0x1ef851,_0x1a69af);},Window_EquipSlot[_0x14015d(0x39a)]['isUseModernControls']=function(){const _0x4d4041=_0x14015d;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand['prototype']['isUseModernControls'][_0x4d4041(0x207)](this);},Window_EquipSlot[_0x14015d(0x39a)][_0x14015d(0x429)]=function(){const _0x5e2938=_0x14015d;Window_StatusBase[_0x5e2938(0x39a)]['activate'][_0x5e2938(0x207)](this),this[_0x5e2938(0x22a)]();},Window_EquipSlot[_0x14015d(0x39a)][_0x14015d(0x5b2)]=function(){const _0x328c50=_0x14015d;Window_StatusBase['prototype'][_0x328c50(0x5b2)][_0x328c50(0x207)](this),this[_0x328c50(0x550)]();},Window_EquipSlot['prototype']['checkShiftRemoveShortcut']=function(){const _0x50c736=_0x14015d;if(!this['isShiftRemoveShortcutEnabled']())return;if(Input[_0x50c736(0x5e3)](_0x50c736(0x5d9))&&this['item']()){if(_0x50c736(0x2e5)!==_0x50c736(0x2e5)){if(!_0x2736f6[_0x50c736(0x663)](_0x130ff7))return![];}else{const _0x3b8d20=SceneManager[_0x50c736(0x3ea)][_0x50c736(0x3c2)];_0x3b8d20&&('zksLQ'!==_0x50c736(0x3fe)?(_0x6978b7[_0x50c736(0x39a)][_0x50c736(0x4f8)][_0x50c736(0x207)](this),this[_0x50c736(0x56d)]()):this[_0x50c736(0x5c6)](this[_0x50c736(0x63e)]())?(this['processShiftRemoveShortcut'](),this[_0x50c736(0x20b)]()):_0x50c736(0x499)!=='QzFfe'?this['cursorDown'](_0x1aaf43[_0x50c736(0x5e3)](_0x50c736(0x2bf))):this[_0x50c736(0x4b9)]());}}},Window_EquipSlot['prototype'][_0x14015d(0x5c6)]=function(_0x532bd8){const _0x4707cb=_0x14015d,_0x214eff=SceneManager[_0x4707cb(0x3ea)][_0x4707cb(0x3c2)];if(!_0x214eff)return;if(!_0x214eff[_0x4707cb(0x47f)](this['index']()))return![];const _0x74c0cb=_0x214eff[_0x4707cb(0x30c)]()[this[_0x4707cb(0x63e)]()];if(_0x214eff[_0x4707cb(0x295)]()[_0x4707cb(0x415)](_0x74c0cb))return![];return!![];;},Window_EquipSlot[_0x14015d(0x39a)][_0x14015d(0x469)]=function(){const _0x4d729a=_0x14015d;SoundManager['playEquip']();const _0x4e269d=SceneManager['_scene'][_0x4d729a(0x3c2)];_0x4e269d['changeEquip'](this[_0x4d729a(0x63e)](),null),this[_0x4d729a(0x4f8)](),this['_itemWindow'][_0x4d729a(0x4f8)](),this[_0x4d729a(0x22a)]();const _0x2e1c4a=SceneManager[_0x4d729a(0x3ea)][_0x4d729a(0x3c8)];if(_0x2e1c4a)_0x2e1c4a[_0x4d729a(0x4f8)]();},Window_EquipSlot['prototype'][_0x14015d(0x3e0)]=function(){const _0x2c3c1f=_0x14015d;if(!this[_0x2c3c1f(0x653)])return![];if(!VisuMZ[_0x2c3c1f(0x502)][_0x2c3c1f(0x524)]['EquipScene'][_0x2c3c1f(0x3d4)])return![];return!![];},Window_EquipSlot[_0x14015d(0x39a)]['processCursorMoveModernControls']=function(){const _0x58b2c2=_0x14015d;!this[_0x58b2c2(0x214)]()&&Window_StatusBase[_0x58b2c2(0x39a)][_0x58b2c2(0x46f)]['call'](this);},Window_EquipSlot[_0x14015d(0x39a)][_0x14015d(0x214)]=function(){const _0x216205=_0x14015d;if(!this[_0x216205(0x44e)]())return![];if(SceneManager[_0x216205(0x3ea)][_0x216205(0x603)]!==Scene_Equip)return![];if(this[_0x216205(0x52c)]())return this[_0x216205(0x4b2)](),Input[_0x216205(0x28a)](),SceneManager[_0x216205(0x3ea)][_0x216205(0x209)](),![];else{if(Input[_0x216205(0x604)]('down')){const _0x596430=this[_0x216205(0x63e)]();if(Input[_0x216205(0x3f4)](_0x216205(0x5d9))){if(_0x216205(0x27d)==='zZJKL')this['cursorPagedown']();else{if(!this[_0x216205(0x226)]())return;const _0x36f030=this[_0x216205(0x5d4)](),_0x58cfb6=_0x188a5b[_0x216205(0x502)][_0x216205(0x524)][_0x216205(0x656)][_0x216205(0x234)],_0x47e42f=_0x36f030===_0x216205(0x672)?_0x12814f[_0x216205(0x28a)]:_0x216205(0x278)[_0x216205(0x2c8)](_0x58cfb6,_0x10e776['clear']),_0x50eb4b=this[_0x216205(0x20a)]();this[_0x216205(0x364)](_0x47e42f,_0x216205(0x28a),_0x50eb4b);}}else _0x216205(0x607)!==_0x216205(0x5f6)?this[_0x216205(0x5f3)](Input[_0x216205(0x5e3)]('down')):_0x1c06e4=_0x24019c(_0x51889a['$1']);if(this['index']()!==_0x596430){if(_0x216205(0x60e)==='RnwIt')return _0x836d9c['ItemsEquipsCore'][_0x216205(0x524)][_0x216205(0x661)]['buttonAssistLargeIncrement'];else this[_0x216205(0x4b2)]();}return!![];}else{if(this[_0x216205(0x368)]()&&Input['isTriggered'](_0x216205(0x5d9)))return!![];}}return![];},Window_EquipSlot['prototype'][_0x14015d(0x52c)]=function(){const _0x11972b=_0x14015d;if(this[_0x11972b(0x63e)]()!==0x0)return![];const _0x4dad30=VisuMZ['ItemsEquipsCore'][_0x11972b(0x524)]['EquipScene'];if(!_0x4dad30[_0x11972b(0x311)]&&!_0x4dad30[_0x11972b(0x47b)])return![];return Input[_0x11972b(0x5e3)]('up');},Window_EquipSlot['prototype'][_0x14015d(0x368)]=function(){const _0x2a2d8a=_0x14015d;return VisuMZ['ItemsEquipsCore'][_0x2a2d8a(0x524)][_0x2a2d8a(0x656)][_0x2a2d8a(0x3d4)];},Window_EquipSlot[_0x14015d(0x39a)][_0x14015d(0x57c)]=function(){const _0x390f8c=_0x14015d;if(this[_0x390f8c(0x288)]()&&this[_0x390f8c(0x30e)]&&SceneManager[_0x390f8c(0x3ea)]['constructor']===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput['isHovered']())this[_0x390f8c(0x424)](![]);else TouchInput[_0x390f8c(0x5e3)]()&&this[_0x390f8c(0x424)](!![]);if(TouchInput['isClicked']()){if('VTRnu'===_0x390f8c(0x4bf)){const _0x592b1e='QUANTITY';if(this[_0x390f8c(0x306)][_0x592b1e])return this['_customItemInfo'][_0x592b1e];const _0x4e0c6c=_0x5a67ea[_0x390f8c(0x502)][_0x390f8c(0x524)][_0x390f8c(0x5b4)][_0x390f8c(0x20d)];return _0x4e0c6c[_0x390f8c(0x2c8)](_0xe28f68['numItems'](this[_0x390f8c(0x4b0)]));}else this[_0x390f8c(0x605)]();}else{if(TouchInput[_0x390f8c(0x581)]()){if(_0x390f8c(0x65a)!==_0x390f8c(0x498))this['onTouchCancel']();else{const _0x5029a1=_0x390f8c(0x259);if(this[_0x390f8c(0x5a9)][_0x390f8c(0x558)]>=0x0&&this[_0x390f8c(0x5a9)][_0x390f8c(0x4bc)]>=0x0&&!this[_0x390f8c(0x306)][_0x5029a1])return![];const _0x4ec42b=this['getItemEffectsMpDamageLabel']();this[_0x390f8c(0x355)](_0x4ec42b,_0x5736b7,_0x548d47,_0xa698d0,!![]);const _0x3786f4=this[_0x390f8c(0x361)]();return this[_0x390f8c(0x2b3)](_0x419848[_0x390f8c(0x59a)](0x2)),this[_0x390f8c(0x355)](_0x3786f4,_0x360e45,_0x31cb7b,_0x2439b0,![],_0x390f8c(0x668)),this[_0x390f8c(0x423)](_0x362b22,_0x52ea92,_0xa1895d),this[_0x390f8c(0x647)](),!![];}}}}},Window_EquipSlot[_0x14015d(0x39a)][_0x14015d(0x424)]=function(_0x5bc2ba){const _0x1e0c07=_0x14015d;this['_doubleTouch']=![];const _0x19f3bd=this[_0x1e0c07(0x63e)](),_0x41ea4e=this[_0x1e0c07(0x5a5)](),_0x35828c=SceneManager[_0x1e0c07(0x3ea)]['_commandWindow'];if(_0x35828c['isOpen']()&&_0x35828c[_0x1e0c07(0x30e)]){if('wpEgA'!==_0x1e0c07(0x5e7)){if(_0x41ea4e>=0x0){if(_0x1e0c07(0x386)===_0x1e0c07(0x386))_0x41ea4e===this[_0x1e0c07(0x63e)]()&&('uKcjl'===_0x1e0c07(0x4fc)?this['_doubleTouch']=!![]:_0x238a70=0x0),this['activate'](),this[_0x1e0c07(0x383)](_0x41ea4e);else{const _0x2e5365=_0x337543[_0x1e0c07(0x405)](_0x1e0c07(0x463)),_0x5e6c83=_0x3e9be6['iconWidth'],_0x275c81=_0xcc7adc[_0x1e0c07(0x25a)],_0x4d571d=_0x3de9f2%0x10*_0x5e6c83,_0x56480a=_0x116c9a['floor'](_0x1c601d/0x10)*_0x275c81,_0x30cecc=_0x403167[_0x1e0c07(0x24b)](_0x5e6c83*this[_0x1e0c07(0x2bb)]()),_0x72342a=_0x6bdbd8[_0x1e0c07(0x24b)](_0x275c81*this[_0x1e0c07(0x2bb)]());this[_0x1e0c07(0x45c)][_0x1e0c07(0x378)](_0x2e5365,_0x4d571d,_0x56480a,_0x5e6c83,_0x275c81,_0x317cab,_0x25e662,_0x30cecc,_0x72342a);}}else{if(_0x35828c['hitIndex']()>=0x0){if(_0x1e0c07(0x472)!==_0x1e0c07(0x472)){const _0x10cca1=this[_0x1e0c07(0x4da)](_0x516143),_0x10455b=this[_0x1e0c07(0x60a)](_0x55b94b),_0x41331b=this[_0x1e0c07(0x5dc)](_0x10455b)['width'];this['changePaintOpacity'](this[_0x1e0c07(0x200)](_0x4023bc));const _0x27221f=this[_0x1e0c07(0x218)]();if(_0x27221f==='right')this[_0x1e0c07(0x37a)](_0x10455b,_0x10cca1['x']+_0x10cca1[_0x1e0c07(0x5ed)]-_0x41331b,_0x10cca1['y'],_0x41331b);else{if(_0x27221f===_0x1e0c07(0x46c)){const _0x313dc9=_0x10cca1['x']+_0x683c62[_0x1e0c07(0x31f)]((_0x10cca1[_0x1e0c07(0x5ed)]-_0x41331b)/0x2);this['drawTextEx'](_0x10455b,_0x313dc9,_0x10cca1['y'],_0x41331b);}else this[_0x1e0c07(0x37a)](_0x10455b,_0x10cca1['x'],_0x10cca1['y'],_0x41331b);}}else this['deactivate'](),this['deselect']();}}}else for(const _0x1e2f46 of _0x1dd287[_0x1e0c07(0x5d7)]){this['addItemCategory'](_0x1e2f46);}}_0x5bc2ba&&this['index']()!==_0x19f3bd&&this['playCursorSound']();},Window_EquipSlot[_0x14015d(0x39a)][_0x14015d(0x56c)]=function(){const _0x169b75=_0x14015d;return this[_0x169b75(0x63e)]();},VisuMZ[_0x14015d(0x502)][_0x14015d(0x488)]=Window_EquipItem[_0x14015d(0x39a)]['includes'],Window_EquipItem['prototype'][_0x14015d(0x415)]=function(_0x3c703a){const _0x41c73b=_0x14015d;if(_0x3c703a===null&&this[_0x41c73b(0x295)]()['includes'](this[_0x41c73b(0x59b)]()))return![];else{if(_0x41c73b(0x4b1)===_0x41c73b(0x4b1))return VisuMZ[_0x41c73b(0x502)][_0x41c73b(0x488)]['call'](this,_0x3c703a);else _0x121193['ItemsEquipsCore']['Game_Actor_changeEquip'][_0x41c73b(0x207)](this,_0x123ebf,_0x116df3);}},VisuMZ[_0x14015d(0x502)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x14015d(0x39a)]['isEnabled'],Window_EquipItem[_0x14015d(0x39a)][_0x14015d(0x352)]=function(_0xe19bd2){const _0x586fa4=_0x14015d;if(_0xe19bd2&&this[_0x586fa4(0x3c2)]){if(this[_0x586fa4(0x2e8)](_0xe19bd2))return![];if(this['isSoleWeaponType'](_0xe19bd2))return![];if(this[_0x586fa4(0x587)](_0xe19bd2))return![];}if(!_0xe19bd2){if(_0x586fa4(0x5fd)==='gZmbt')this[_0x586fa4(0x5de)]=[];else return!this[_0x586fa4(0x295)]()[_0x586fa4(0x415)](this[_0x586fa4(0x59b)]());}return VisuMZ[_0x586fa4(0x502)][_0x586fa4(0x2ac)][_0x586fa4(0x207)](this,_0xe19bd2);},Window_EquipItem['prototype'][_0x14015d(0x2e8)]=function(_0x44b1de){const _0x4006b7=_0x14015d,_0x460225=_0x44b1de[_0x4006b7(0x4f1)];if(_0x460225[_0x4006b7(0x497)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){if(_0x4006b7(0x64c)!==_0x4006b7(0x64c))return _0xd783a1[_0x4006b7(0x502)]['Settings'][_0x4006b7(0x5b4)]['MaxArmors'];else{const _0x32bc52=Number(RegExp['$1'])||0x1;let _0x2e3ca4=0x0;const _0x3146aa=this['_actor'][_0x4006b7(0x520)](),_0x15ed88=SceneManager['_scene'][_0x4006b7(0x296)][_0x4006b7(0x56c)]();_0x3146aa[_0x15ed88]=null;for(const _0x5998fd of _0x3146aa){if(_0x4006b7(0x490)===_0x4006b7(0x279))this[_0x4006b7(0x383)](_0x323b27);else{if(!_0x5998fd)continue;if(DataManager[_0x4006b7(0x3ec)](_0x44b1de)===DataManager[_0x4006b7(0x3ec)](_0x5998fd)){if(_0x44b1de['id']===_0x5998fd['id'])_0x2e3ca4+=0x1;}}}return _0x2e3ca4>=_0x32bc52;}}else{if(_0x4006b7(0x5c4)!==_0x4006b7(0x482))return![];else{const _0x1cdf05=_0x4006b7(0x202);if(!this[_0x4006b7(0x5a9)][_0x4006b7(0x243)]&&!this[_0x4006b7(0x306)][_0x1cdf05])return![];const _0x4494f7=this[_0x4006b7(0x4bd)]();this['drawItemKeyData'](_0x4494f7,_0x3447c4,_0x155910,_0x777cf7,!![]);const _0x4c0521=this[_0x4006b7(0x264)]();return this['drawItemKeyData'](_0x4c0521,_0x36aff6,_0x372396,_0x2dcdf1,![],_0x4006b7(0x668)),this['drawItemDarkRect'](_0x20a7e8,_0x206899,_0x3a0c28),this[_0x4006b7(0x647)](),!![];}}},Window_EquipItem['prototype'][_0x14015d(0x283)]=function(_0x5032f2){const _0x1a9e0b=_0x14015d;if(!DataManager[_0x1a9e0b(0x3ec)](_0x5032f2))return![];const _0x523009=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x26f343=0x0;const _0x434435=this[_0x1a9e0b(0x3c2)][_0x1a9e0b(0x520)](),_0xf0132e=SceneManager[_0x1a9e0b(0x3ea)][_0x1a9e0b(0x296)]['equipSlotIndex']();_0x434435[_0xf0132e]=null;for(const _0x34e7b2 of _0x434435){if(_0x1a9e0b(0x443)===_0x1a9e0b(0x443)){if(!_0x34e7b2)continue;if(!DataManager[_0x1a9e0b(0x3ec)](_0x34e7b2))continue;if(_0x5032f2[_0x1a9e0b(0x401)]===_0x34e7b2['wtypeId']){if(_0x1a9e0b(0x5ab)===_0x1a9e0b(0x5ab)){_0x26f343+=0x1;if(_0x5032f2[_0x1a9e0b(0x4f1)][_0x1a9e0b(0x497)](_0x523009)){const _0x480ef3=Number(RegExp['$1'])||0x1;if(_0x26f343>=_0x480ef3)return!![];}if(_0x34e7b2['note'][_0x1a9e0b(0x497)](_0x523009)){const _0x13a244=Number(RegExp['$1'])||0x1;if(_0x26f343>=_0x13a244)return!![];}}else{const _0x2dd3c0=this[_0x1a9e0b(0x465)](_0x55aab4);if(_0x2dd3c0==='iconText')this[_0x1a9e0b(0x43e)](_0x3ed232);else _0x2dd3c0==='icon'?this[_0x1a9e0b(0x404)](_0x295735):_0x1cf6f1['prototype'][_0x1a9e0b(0x586)][_0x1a9e0b(0x207)](this,_0x5ba2fd);}}}else{if(_0x1fefb0!==_0x12b531)return;if(_0x3cdd1a[_0x1a9e0b(0x4f1)][_0x1a9e0b(0x497)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x1b6b11=_0x410baf(_0x2700e9['$1']),_0x12a136=_0x1a9e0b(0x385)['format'](_0x1b6b11);_0x5bd87b[_0x1a9e0b(0x502)][_0x1a9e0b(0x3bc)][_0x39b157['id']]=new _0x8566b5(_0x1a9e0b(0x5e5),_0x12a136);}}}return![];},Window_EquipItem[_0x14015d(0x39a)][_0x14015d(0x587)]=function(_0x39f401){const _0x146c71=_0x14015d;if(!DataManager[_0x146c71(0x48d)](_0x39f401))return![];const _0x3b03d6=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x38c801=0x0;const _0x571aae=this[_0x146c71(0x3c2)][_0x146c71(0x520)](),_0x2ddd21=SceneManager[_0x146c71(0x3ea)][_0x146c71(0x296)][_0x146c71(0x56c)]();_0x571aae[_0x2ddd21]=null;for(const _0x34c46f of _0x571aae){if(_0x146c71(0x611)==='wHnKs'){if(!_0x34c46f)continue;if(!DataManager['isArmor'](_0x34c46f))continue;if(_0x39f401[_0x146c71(0x23c)]===_0x34c46f[_0x146c71(0x23c)]){_0x38c801+=0x1;if(_0x39f401[_0x146c71(0x4f1)][_0x146c71(0x497)](_0x3b03d6)){const _0x846071=Number(RegExp['$1'])||0x1;if(_0x38c801>=_0x846071)return!![];}if(_0x34c46f[_0x146c71(0x4f1)][_0x146c71(0x497)](_0x3b03d6)){if('PGcMx'!==_0x146c71(0x4b4)){const _0x3b91d3=this[_0x146c71(0x30c)]()[_0x146c71(0x536)];for(let _0x2835e2=0x0;_0x2835e2<_0x3b91d3;_0x2835e2++){if(this['isClearEquipOk'](_0x2835e2))this[_0x146c71(0x397)](_0x2835e2,null);}}else{const _0x124698=Number(RegExp['$1'])||0x1;if(_0x38c801>=_0x124698)return!![];}}}}else return _0x38210c['uiHelpPosition'];}return![];},Window_EquipItem[_0x14015d(0x39a)][_0x14015d(0x295)]=function(){const _0x47ff88=_0x14015d;return VisuMZ[_0x47ff88(0x502)]['Settings'][_0x47ff88(0x656)]['NonRemoveETypes'];},Window_EquipItem[_0x14015d(0x39a)]['drawItem']=function(_0x20b30b){const _0x3b41a9=_0x14015d,_0x9866ab=this[_0x3b41a9(0x664)](_0x20b30b);if(_0x9866ab){if(_0x3b41a9(0x312)!=='nACAM')Window_ItemList[_0x3b41a9(0x39a)][_0x3b41a9(0x586)][_0x3b41a9(0x207)](this,_0x20b30b);else return _0x3c19ad['actor']()['canUse'](_0x135819);}else{if(_0x3b41a9(0x57a)==='Zsnyd')this[_0x3b41a9(0x299)](_0x20b30b);else return _0x1fa732['uiInputPosition'];}},Window_EquipItem['prototype'][_0x14015d(0x299)]=function(_0x45dcdb){const _0x2c8ae8=_0x14015d;this[_0x2c8ae8(0x2d0)](this[_0x2c8ae8(0x352)](null));const _0x3aea2b=VisuMZ[_0x2c8ae8(0x502)][_0x2c8ae8(0x524)]['EquipScene'],_0x252972=this[_0x2c8ae8(0x4da)](_0x45dcdb),_0x122aae=_0x252972['y']+(this[_0x2c8ae8(0x4ee)]()-ImageManager[_0x2c8ae8(0x25a)])/0x2,_0x3a5941=ImageManager['iconWidth']+0x4,_0xd1674f=Math[_0x2c8ae8(0x286)](0x0,_0x252972[_0x2c8ae8(0x5ed)]-_0x3a5941);this[_0x2c8ae8(0x670)](),this[_0x2c8ae8(0x650)](_0x3aea2b[_0x2c8ae8(0x33a)],_0x252972['x'],_0x122aae),this[_0x2c8ae8(0x35f)](_0x3aea2b[_0x2c8ae8(0x66c)],_0x252972['x']+_0x3a5941,_0x252972['y'],_0xd1674f),this[_0x2c8ae8(0x2d0)](!![]);},Window_EquipItem[_0x14015d(0x39a)][_0x14015d(0x20b)]=function(){const _0x5d11e1=_0x14015d;Window_ItemList[_0x5d11e1(0x39a)][_0x5d11e1(0x20b)][_0x5d11e1(0x207)](this);if(this['_actor']&&this[_0x5d11e1(0x3c8)]&&this[_0x5d11e1(0x5bb)]>=0x0){if(_0x5d11e1(0x334)===_0x5d11e1(0x334)){const _0x1afbb3=JsonEx['makeDeepCopy'](this['_actor']);_0x1afbb3[_0x5d11e1(0x509)]=!![],_0x1afbb3[_0x5d11e1(0x2f1)](this[_0x5d11e1(0x5bb)],this[_0x5d11e1(0x5e5)]()),this['_statusWindow'][_0x5d11e1(0x57d)](_0x1afbb3);}else{const _0x451f4d=_0x54176f[_0x5d11e1(0x502)][_0x5d11e1(0x524)]['StatusWindow']['LabelSelfGainTP'];return _0x451f4d['format'](_0xb284c1['tp']);}}},VisuMZ[_0x14015d(0x502)][_0x14015d(0x4dc)]=Window_ShopCommand['prototype'][_0x14015d(0x2c7)],Window_ShopCommand['prototype'][_0x14015d(0x2c7)]=function(_0x34b01f){const _0x44145c=_0x14015d;VisuMZ[_0x44145c(0x502)]['Window_ShopCommand_initialize'][_0x44145c(0x207)](this,_0x34b01f),this[_0x44145c(0x39d)](_0x34b01f);},Window_ShopCommand['prototype'][_0x14015d(0x39d)]=function(_0x37c023){const _0x2d1182=_0x14015d,_0x52d703=new Rectangle(0x0,0x0,_0x37c023[_0x2d1182(0x5ed)],_0x37c023[_0x2d1182(0x206)]);this[_0x2d1182(0x2fe)]=new Window_Base(_0x52d703),this[_0x2d1182(0x2fe)][_0x2d1182(0x2e2)]=0x0,this[_0x2d1182(0x3d9)](this[_0x2d1182(0x2fe)]),this[_0x2d1182(0x1e9)]();},Window_ShopCommand[_0x14015d(0x39a)][_0x14015d(0x22a)]=function(){const _0x565da6=_0x14015d;Window_HorzCommand['prototype'][_0x565da6(0x22a)]['call'](this);if(this['_commandNameWindow'])this[_0x565da6(0x1e9)]();},Window_ShopCommand[_0x14015d(0x39a)][_0x14015d(0x1e9)]=function(){const _0x416f87=_0x14015d,_0x474817=this[_0x416f87(0x2fe)];_0x474817['contents'][_0x416f87(0x28a)]();const _0x1fbbbc=this[_0x416f87(0x465)](this[_0x416f87(0x63e)]());if(_0x1fbbbc===_0x416f87(0x64e)){const _0x488bb4=this['itemLineRect'](this[_0x416f87(0x63e)]());let _0x240274=this[_0x416f87(0x60a)](this[_0x416f87(0x63e)]());_0x240274=_0x240274[_0x416f87(0x265)](/\\I\[(\d+)\]/gi,''),_0x474817['resetFontSettings'](),this['commandNameWindowDrawBackground'](_0x240274,_0x488bb4),this['commandNameWindowDrawText'](_0x240274,_0x488bb4),this['commandNameWindowCenter'](_0x240274,_0x488bb4);}},Window_ShopCommand[_0x14015d(0x39a)]['commandNameWindowDrawBackground']=function(_0x2a7239,_0x5b4ce7){},Window_ShopCommand[_0x14015d(0x39a)][_0x14015d(0x2fb)]=function(_0x40376a,_0x29bbdc){const _0x488049=_0x14015d,_0x29e806=this[_0x488049(0x2fe)];_0x29e806[_0x488049(0x35f)](_0x40376a,0x0,_0x29bbdc['y'],_0x29e806['innerWidth'],_0x488049(0x46c));},Window_ShopCommand[_0x14015d(0x39a)]['commandNameWindowCenter']=function(_0x1e6aae,_0x283e04){const _0x1b8815=_0x14015d,_0x495be6=this[_0x1b8815(0x2fe)],_0x39d3e8=$gameSystem[_0x1b8815(0x35b)](),_0x5d414b=_0x283e04['x']+Math['floor'](_0x283e04[_0x1b8815(0x5ed)]/0x2)+_0x39d3e8;_0x495be6['x']=_0x495be6[_0x1b8815(0x5ed)]/-0x2+_0x5d414b,_0x495be6['y']=Math[_0x1b8815(0x31f)](_0x283e04[_0x1b8815(0x206)]/0x2);},Window_ShopCommand['prototype'][_0x14015d(0x60f)]=function(){const _0x3f61b7=_0x14015d;return this[_0x3f61b7(0x464)]?this[_0x3f61b7(0x464)][_0x3f61b7(0x536)]:0x3;},Window_ShopCommand[_0x14015d(0x39a)][_0x14015d(0x45d)]=function(){const _0x34c62a=_0x14015d;return VisuMZ['ItemsEquipsCore']['Settings'][_0x34c62a(0x661)][_0x34c62a(0x526)];},Window_ShopCommand['prototype'][_0x14015d(0x320)]=function(){const _0x2fa7e5=_0x14015d;this[_0x2fa7e5(0x57f)](),this[_0x2fa7e5(0x3ef)](),this[_0x2fa7e5(0x292)]();},Window_ShopCommand[_0x14015d(0x39a)][_0x14015d(0x4f8)]=function(){const _0x3a83d6=_0x14015d;Window_HorzCommand['prototype']['refresh'][_0x3a83d6(0x207)](this),this['refreshCursor']();},Window_ShopCommand['prototype'][_0x14015d(0x57f)]=function(){const _0x3bf7c1=_0x14015d,_0x375bbd=this[_0x3bf7c1(0x5d4)](),_0xae16b9=VisuMZ[_0x3bf7c1(0x502)][_0x3bf7c1(0x524)][_0x3bf7c1(0x661)]['CmdIconBuy'],_0x552c01=_0x375bbd==='text'?TextManager[_0x3bf7c1(0x354)]:_0x3bf7c1(0x278)[_0x3bf7c1(0x2c8)](_0xae16b9,TextManager['buy']),_0x27edfd=this['isBuyCommandEnabled']();if(this[_0x3bf7c1(0x45d)]()&&!_0x27edfd)return;this[_0x3bf7c1(0x364)](_0x552c01,_0x3bf7c1(0x354),_0x27edfd);},Window_ShopCommand[_0x14015d(0x39a)][_0x14015d(0x434)]=function(){const _0x92a7c4=_0x14015d;if(SceneManager[_0x92a7c4(0x3ea)][_0x92a7c4(0x603)]===Scene_Shop)return SceneManager['_scene'][_0x92a7c4(0x36b)]>0x0;else{if(_0x92a7c4(0x203)===_0x92a7c4(0x203))return!![];else _0x11f8c4+=_0x92a7c4(0x638)[_0x92a7c4(0x2c8)](this[_0x92a7c4(0x5a9)][_0x92a7c4(0x328)]);}},Window_ShopCommand[_0x14015d(0x39a)][_0x14015d(0x3ef)]=function(){const _0x3073af=_0x14015d,_0x15ca60=this[_0x3073af(0x5d4)](),_0xc744a=VisuMZ['ItemsEquipsCore']['Settings'][_0x3073af(0x661)][_0x3073af(0x575)],_0x358c1c=_0x15ca60==='text'?TextManager['sell']:_0x3073af(0x278)[_0x3073af(0x2c8)](_0xc744a,TextManager[_0x3073af(0x2b7)]),_0x8124ea=this[_0x3073af(0x3d0)]();if(this['hideDisabledCommands']()&&!_0x8124ea)return;this['addCommand'](_0x358c1c,_0x3073af(0x2b7),_0x8124ea);},Window_ShopCommand[_0x14015d(0x39a)][_0x14015d(0x3d0)]=function(){const _0x3d1bcd=_0x14015d;return!this[_0x3d1bcd(0x5e9)];},Window_ShopCommand[_0x14015d(0x39a)][_0x14015d(0x292)]=function(){const _0x21ceaa=_0x14015d,_0x9cacbf=this[_0x21ceaa(0x5d4)](),_0x11adc4=VisuMZ[_0x21ceaa(0x502)]['Settings']['ShopScene'][_0x21ceaa(0x348)],_0x2fa0bf=VisuMZ[_0x21ceaa(0x502)][_0x21ceaa(0x524)][_0x21ceaa(0x661)]['CmdCancelRename'],_0x51e381=_0x9cacbf===_0x21ceaa(0x672)?_0x2fa0bf:_0x21ceaa(0x278)[_0x21ceaa(0x2c8)](_0x11adc4,_0x2fa0bf);this[_0x21ceaa(0x364)](_0x51e381,'cancel');},Window_ShopCommand[_0x14015d(0x39a)][_0x14015d(0x218)]=function(){const _0x4baf2a=_0x14015d;return VisuMZ['ItemsEquipsCore']['Settings'][_0x4baf2a(0x661)]['CmdTextAlign'];},Window_ShopCommand['prototype'][_0x14015d(0x586)]=function(_0xe3a140){const _0x2563ea=_0x14015d,_0x481c74=this[_0x2563ea(0x465)](_0xe3a140);if(_0x481c74===_0x2563ea(0x365)){if(_0x2563ea(0x468)==='BaKAJ')this[_0x2563ea(0x43e)](_0xe3a140);else{if(this[_0x2563ea(0x4e7)]())return _0x10ea21['ItemsEquipsCore'][_0x2563ea(0x524)][_0x2563ea(0x5b4)][_0x2563ea(0x287)];else{if(this[_0x2563ea(0x1ff)]&&this[_0x2563ea(0x1ff)]['active'])return _0x1153f8[_0x2563ea(0x502)][_0x2563ea(0x524)][_0x2563ea(0x661)]['buttonAssistSmallIncrement'];}return _0x189c69[_0x2563ea(0x39a)][_0x2563ea(0x63d)][_0x2563ea(0x207)](this);}}else{if(_0x481c74===_0x2563ea(0x64e)){if('NqspT'!=='NqspT')return _0x4c1e36[_0x2563ea(0x3e1)]&&_0x35e9d4['prototype'][_0x2563ea(0x2a7)][_0x2563ea(0x207)](this);else this[_0x2563ea(0x404)](_0xe3a140);}else Window_HorzCommand['prototype'][_0x2563ea(0x586)][_0x2563ea(0x207)](this,_0xe3a140);}},Window_ShopCommand[_0x14015d(0x39a)][_0x14015d(0x5d4)]=function(){const _0x1d291b=_0x14015d;return VisuMZ[_0x1d291b(0x502)][_0x1d291b(0x524)]['ShopScene'][_0x1d291b(0x2b9)];},Window_ShopCommand[_0x14015d(0x39a)][_0x14015d(0x465)]=function(_0x4e3f4f){const _0x1da15d=_0x14015d;if(_0x4e3f4f<0x0)return _0x1da15d(0x672);const _0x1db7a9=this[_0x1da15d(0x5d4)]();if(_0x1db7a9!==_0x1da15d(0x51f))return _0x1db7a9;else{if(this[_0x1da15d(0x1e4)]()>0x0){const _0x3053a1=this[_0x1da15d(0x60a)](_0x4e3f4f);if(_0x3053a1[_0x1da15d(0x497)](/\\I\[(\d+)\]/i)){if(_0x1da15d(0x5f8)!==_0x1da15d(0x3a8)){const _0x404a4c=this['itemLineRect'](_0x4e3f4f),_0x553ad2=this[_0x1da15d(0x5dc)](_0x3053a1)[_0x1da15d(0x5ed)];if(_0x553ad2<=_0x404a4c[_0x1da15d(0x5ed)]){if(_0x1da15d(0x433)!==_0x1da15d(0x433)){_0x1809dc[_0x1da15d(0x39a)]['callUpdateHelp']['call'](this);if(this['_categoryNameWindow'])this['updateCategoryNameWindow']();}else return'iconText';}else{if(_0x1da15d(0x610)===_0x1da15d(0x610))return _0x1da15d(0x64e);else this[_0x1da15d(0x404)](_0x208ff5);}}else _0x3c0d97=_0x29b14f(_0x5e7e9f['$1']);}}}return _0x1da15d(0x672);},Window_ShopCommand[_0x14015d(0x39a)][_0x14015d(0x43e)]=function(_0x4fe996){const _0x1ef828=_0x14015d,_0x3f8d93=this[_0x1ef828(0x4da)](_0x4fe996),_0x129ab2=this[_0x1ef828(0x60a)](_0x4fe996),_0x3a9149=this[_0x1ef828(0x5dc)](_0x129ab2)[_0x1ef828(0x5ed)];this['changePaintOpacity'](this['isCommandEnabled'](_0x4fe996));const _0xec3db9=this[_0x1ef828(0x218)]();if(_0xec3db9===_0x1ef828(0x668))this['drawTextEx'](_0x129ab2,_0x3f8d93['x']+_0x3f8d93['width']-_0x3a9149,_0x3f8d93['y'],_0x3a9149);else{if(_0xec3db9===_0x1ef828(0x46c)){if(_0x1ef828(0x34f)===_0x1ef828(0x34f)){const _0x2207dc=_0x3f8d93['x']+Math[_0x1ef828(0x31f)]((_0x3f8d93[_0x1ef828(0x5ed)]-_0x3a9149)/0x2);this[_0x1ef828(0x37a)](_0x129ab2,_0x2207dc,_0x3f8d93['y'],_0x3a9149);}else this[_0x1ef828(0x5f3)](_0x502109[_0x1ef828(0x5e3)]('down'));}else{if(_0x1ef828(0x66e)!==_0x1ef828(0x66e))return _0x3fe0c2['ItemsEquipsCore'][_0x1ef828(0x3ae)][_0x1ef828(0x207)](this);else this['drawTextEx'](_0x129ab2,_0x3f8d93['x'],_0x3f8d93['y'],_0x3a9149);}}},Window_ShopCommand[_0x14015d(0x39a)][_0x14015d(0x404)]=function(_0x120db8){const _0x334205=_0x14015d;this['commandName'](_0x120db8)[_0x334205(0x497)](/\\I\[(\d+)\]/i);const _0x406410=Number(RegExp['$1'])||0x0,_0x471ef6=this[_0x334205(0x4da)](_0x120db8),_0x4c2c6c=_0x471ef6['x']+Math[_0x334205(0x31f)]((_0x471ef6[_0x334205(0x5ed)]-ImageManager[_0x334205(0x674)])/0x2),_0x9d2302=_0x471ef6['y']+(_0x471ef6[_0x334205(0x206)]-ImageManager['iconHeight'])/0x2;this[_0x334205(0x650)](_0x406410,_0x4c2c6c,_0x9d2302);},VisuMZ['ItemsEquipsCore'][_0x14015d(0x52f)]=Window_ShopBuy['prototype'][_0x14015d(0x4f8)],Window_ShopBuy[_0x14015d(0x39a)]['refresh']=function(){const _0x32e88d=_0x14015d;this[_0x32e88d(0x363)](),VisuMZ[_0x32e88d(0x502)][_0x32e88d(0x52f)][_0x32e88d(0x207)](this);},Window_ShopBuy['prototype'][_0x14015d(0x363)]=function(){const _0x1ea099=_0x14015d;SceneManager[_0x1ea099(0x3ea)]['constructor']===Scene_Shop&&(this[_0x1ea099(0x4ba)]=SceneManager['_scene']['money']());},VisuMZ[_0x14015d(0x502)][_0x14015d(0x627)]=Window_ShopBuy['prototype'][_0x14015d(0x421)],Window_ShopBuy[_0x14015d(0x39a)][_0x14015d(0x421)]=function(_0x50c8a5){const _0x42de0a=_0x14015d;if(!_0x50c8a5)return 0x0;let _0x2b846a=VisuMZ[_0x42de0a(0x502)][_0x42de0a(0x627)][_0x42de0a(0x207)](this,_0x50c8a5);return Math[_0x42de0a(0x286)](0x0,this[_0x42de0a(0x4cc)](_0x50c8a5,_0x2b846a));},Window_ShopBuy['prototype'][_0x14015d(0x4cc)]=function(_0x3bb06f,_0x54f05f){const _0x467a27=_0x14015d,_0x3b9d6a=_0x3bb06f['note'];if(_0x3b9d6a['match'](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0xafb682=String(RegExp['$1']);try{if('CjAYf'!=='CjAYf'){const _0x3ad70e=this['itemLineRect'](_0x19ad25),_0x4c6d70=this[_0x467a27(0x60a)](_0x3309f7),_0x5ebb9a=this[_0x467a27(0x5dc)](_0x4c6d70)[_0x467a27(0x5ed)];this[_0x467a27(0x2d0)](this['isCommandEnabled'](_0xea6ea6));const _0x30c022=this['itemTextAlign']();if(_0x30c022==='right')this[_0x467a27(0x37a)](_0x4c6d70,_0x3ad70e['x']+_0x3ad70e[_0x467a27(0x5ed)]-_0x5ebb9a,_0x3ad70e['y'],_0x5ebb9a);else{if(_0x30c022===_0x467a27(0x46c)){const _0x24dbe5=_0x3ad70e['x']+_0x29eb07['floor']((_0x3ad70e['width']-_0x5ebb9a)/0x2);this['drawTextEx'](_0x4c6d70,_0x24dbe5,_0x3ad70e['y'],_0x5ebb9a);}else this[_0x467a27(0x37a)](_0x4c6d70,_0x3ad70e['x'],_0x3ad70e['y'],_0x5ebb9a);}}else eval(_0xafb682);}catch(_0x287667){if(_0x467a27(0x29e)!==_0x467a27(0x29e))return this[_0x467a27(0x26b)]();else{if($gameTemp[_0x467a27(0x45f)]())console[_0x467a27(0x46d)](_0x287667);}}}_0x54f05f=VisuMZ[_0x467a27(0x502)][_0x467a27(0x524)][_0x467a27(0x661)]['BuyPriceJS'][_0x467a27(0x207)](this,_0x3bb06f,_0x54f05f);if(isNaN(_0x54f05f))_0x54f05f=0x0;return Math[_0x467a27(0x31f)](_0x54f05f);},Window_ShopBuy[_0x14015d(0x39a)]['drawItem']=function(_0x3e8a9b){const _0x338685=_0x14015d;this['resetFontSettings']();const _0x51cd22=this[_0x338685(0x664)](_0x3e8a9b),_0x1b636e=this[_0x338685(0x4da)](_0x3e8a9b),_0x27101e=_0x1b636e[_0x338685(0x5ed)];this['changePaintOpacity'](this[_0x338685(0x352)](_0x51cd22)),this[_0x338685(0x2ef)](_0x51cd22,_0x1b636e['x'],_0x1b636e['y'],_0x27101e),this[_0x338685(0x5cd)](_0x51cd22,_0x1b636e),this[_0x338685(0x2d0)](!![]);},Window_ShopBuy[_0x14015d(0x39a)][_0x14015d(0x5cd)]=function(_0xf3abbf,_0x381120){const _0x3f06b9=_0x14015d,_0x266808=this[_0x3f06b9(0x421)](_0xf3abbf);this[_0x3f06b9(0x49e)](_0x266808,TextManager[_0x3f06b9(0x1f7)],_0x381120['x'],_0x381120['y'],_0x381120[_0x3f06b9(0x5ed)]);},Window_ShopSell[_0x14015d(0x39a)][_0x14015d(0x60f)]=function(){const _0x37ac29=_0x14015d;return SceneManager['_scene'][_0x37ac29(0x398)]()?0x1:0x2;},VisuMZ[_0x14015d(0x502)][_0x14015d(0x277)]=Window_ShopSell['prototype']['isEnabled'],Window_ShopSell[_0x14015d(0x39a)][_0x14015d(0x352)]=function(_0x4625c4){const _0x154a21=_0x14015d;if(!_0x4625c4)return![];const _0x52b1cc=_0x4625c4[_0x154a21(0x4f1)];if(_0x52b1cc[_0x154a21(0x497)](/<CANNOT SELL>/i))return![];if(_0x52b1cc['match'](/<CAN SELL>/i))return!![];if(_0x52b1cc[_0x154a21(0x497)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x10a0c8=JSON[_0x154a21(0x35c)]('['+RegExp['$1'][_0x154a21(0x497)](/\d+/g)+']');for(const _0x3437c6 of _0x10a0c8){if(!$gameSwitches[_0x154a21(0x663)](_0x3437c6))return![];}}if(_0x52b1cc[_0x154a21(0x497)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x154a21(0x284)===_0x154a21(0x284)){const _0x2b6fdc=JSON[_0x154a21(0x35c)]('['+RegExp['$1'][_0x154a21(0x497)](/\d+/g)+']');for(const _0x59544a of _0x2b6fdc){if(!$gameSwitches['value'](_0x59544a))return![];}}else _0x404f73[_0x154a21(0x502)][_0x154a21(0x3d1)][_0x154a21(0x207)](this);}if(_0x52b1cc[_0x154a21(0x497)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x476096=JSON[_0x154a21(0x35c)]('['+RegExp['$1'][_0x154a21(0x497)](/\d+/g)+']');for(const _0x4ffc7a of _0x476096){if($gameSwitches[_0x154a21(0x663)](_0x4ffc7a))return![];}}return VisuMZ['ItemsEquipsCore'][_0x154a21(0x277)][_0x154a21(0x207)](this,_0x4625c4);},Window_ShopStatus[_0x14015d(0x39a)]['isPageChangeRequested']=function(){return![];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x4f7)]=function(){const _0x959a8d=_0x14015d;Window_StatusBase[_0x959a8d(0x39a)]['loadFaceImages']['call'](this);for(const _0x8dbff0 of $gameParty['members']()){if(_0x959a8d(0x3a5)===_0x959a8d(0x3a5))ImageManager[_0x959a8d(0x21b)](_0x8dbff0[_0x959a8d(0x305)]());else return _0x2960df=_0x1ef987(_0x18ad48),_0x3e8a12['match'](/#(.*)/i)?'#%1'[_0x959a8d(0x2c8)](_0x22d21c(_0x4bfc3a['$1'])):this[_0x959a8d(0x4fd)](_0x51c072(_0x177d4f));}},Window_ShopStatus['prototype'][_0x14015d(0x53b)]=function(){const _0x4ce6ec=_0x14015d;return VisuMZ['ItemsEquipsCore'][_0x4ce6ec(0x524)]['StatusWindow'][_0x4ce6ec(0x235)];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x4f8)]=function(){const _0x3b3d04=_0x14015d;this['contents'][_0x3b3d04(0x28a)](),this[_0x3b3d04(0x276)][_0x3b3d04(0x28a)](),this[_0x3b3d04(0x4b0)]&&(this['resetFontSettings'](),this[_0x3b3d04(0x2d0)](!![]),this[_0x3b3d04(0x249)](),this[_0x3b3d04(0x32b)]()?this[_0x3b3d04(0x5a2)]():_0x3b3d04(0x5c9)===_0x3b3d04(0x471)?this[_0x3b3d04(0x37a)](_0x44660c,_0x559b6c['x']+_0x3f78cc[_0x3b3d04(0x5ed)]-_0x2cd43e,_0x1284dc['y'],_0x73cef4):this[_0x3b3d04(0x4fe)](),this['drawCustomShopGraphic']());},Window_ShopStatus[_0x14015d(0x39a)]['drawPossession']=function(_0x5d34d1,_0x525520){const _0x2f9811=_0x14015d;if(!this[_0x2f9811(0x32b)]()&&!DataManager[_0x2f9811(0x342)](this[_0x2f9811(0x4b0)]))return;const _0xb9def2=this[_0x2f9811(0x447)]-this[_0x2f9811(0x557)]()-_0x5d34d1,_0x27f5c4=this['textWidth']('0000');this[_0x2f9811(0x2b3)](ColorManager[_0x2f9811(0x5bc)]()),this['drawText'](TextManager[_0x2f9811(0x52d)],_0x5d34d1+this[_0x2f9811(0x557)](),_0x525520,_0xb9def2-_0x27f5c4),this[_0x2f9811(0x670)](),this[_0x2f9811(0x654)](this[_0x2f9811(0x4b0)],_0x5d34d1,_0x525520,_0xb9def2);},Window_ShopStatus[_0x14015d(0x39a)]['drawItemDarkRect']=function(_0xe5ee28,_0x337567,_0x3cd517,_0x43f291,_0x426b95){const _0x145dd0=_0x14015d;if(VisuMZ[_0x145dd0(0x502)]['Settings']['StatusWindow'][_0x145dd0(0x420)]===![])return;_0x426b95=Math[_0x145dd0(0x286)](_0x426b95||0x1,0x1);while(_0x426b95--){if(_0x145dd0(0x5ca)==='luGkG')return this[_0x145dd0(0x4b0)][_0x145dd0(0x3c3)];else{_0x43f291=_0x43f291||this[_0x145dd0(0x4ee)](),this[_0x145dd0(0x276)][_0x145dd0(0x5b9)]=0xa0;const _0x47c10b=ColorManager[_0x145dd0(0x3f1)]();this[_0x145dd0(0x276)][_0x145dd0(0x548)](_0xe5ee28+0x1,_0x337567+0x1,_0x3cd517-0x2,_0x43f291-0x2,_0x47c10b),this[_0x145dd0(0x276)][_0x145dd0(0x5b9)]=0xff;}}},ColorManager['getItemsEquipsCoreBackColor1']=function(){const _0x2c5621=_0x14015d,_0x344eaa=VisuMZ[_0x2c5621(0x502)]['Settings'][_0x2c5621(0x204)];let _0x4407e0=_0x344eaa['BackRectColor']!==undefined?_0x344eaa[_0x2c5621(0x59e)]:0x13;return ColorManager[_0x2c5621(0x2b1)](_0x4407e0);},Window_ShopStatus['prototype'][_0x14015d(0x5a2)]=function(){const _0x4d1ecb=_0x14015d;if(VisuMZ['ItemsEquipsCore'][_0x4d1ecb(0x524)][_0x4d1ecb(0x204)]['DrawEquipData']){if(_0x4d1ecb(0x258)===_0x4d1ecb(0x258)){VisuMZ[_0x4d1ecb(0x502)][_0x4d1ecb(0x524)]['StatusWindow'][_0x4d1ecb(0x3ab)][_0x4d1ecb(0x207)](this);return;}else{const _0x295b39=_0x521649['_scene'],_0x4a802f=[_0xd56b56,_0xb72e64];return _0x4a802f[_0x4d1ecb(0x415)](_0x295b39['constructor']);}}const _0x164186=this[_0x4d1ecb(0x4ee)](),_0x3cfa72=this[_0x4d1ecb(0x5a4)]()+0x8;let _0x40d39a=0x0,_0xf37b9e=0x0,_0x1bb44e=this[_0x4d1ecb(0x447)],_0x1c089f=this[_0x4d1ecb(0x553)],_0x10f288=Math[_0x4d1ecb(0x31f)](_0x1bb44e/0x2),_0x258d8b=_0x40d39a+_0x1bb44e-_0x10f288;this[_0x4d1ecb(0x2ef)](this['_item'],_0x40d39a+this[_0x4d1ecb(0x557)](),_0xf37b9e,_0x1bb44e-this[_0x4d1ecb(0x557)]()*0x2),this['drawItemDarkRect'](_0x40d39a,_0xf37b9e,_0x1bb44e),_0xf37b9e+=_0x164186;if(this[_0x4d1ecb(0x323)](_0x40d39a,_0xf37b9e,_0x10f288))_0xf37b9e+=0x0;if(this[_0x4d1ecb(0x4d7)](_0x258d8b,_0xf37b9e,_0x10f288))_0xf37b9e+=_0x164186;const _0x129c34=this['actorParams'](),_0x17ddf6=_0xf37b9e;_0xf37b9e=_0x1c089f-_0x129c34[_0x4d1ecb(0x536)]*_0x3cfa72-0x4;let _0x3415e6=_0x40d39a,_0x2bc5b4=0x0,_0x3c51e5=_0xf37b9e;for(const _0x1963aa of _0x129c34){_0x2bc5b4=Math[_0x4d1ecb(0x286)](this[_0x4d1ecb(0x4e5)](_0x1963aa,_0x40d39a+0x4,_0xf37b9e+0x4,_0x1bb44e),_0x2bc5b4),_0xf37b9e+=_0x3cfa72;}const _0xf4b0b8=$gameParty[_0x4d1ecb(0x46a)](),_0x4fab8d=Math[_0x4d1ecb(0x31f)]((_0x1bb44e-_0x2bc5b4)/_0xf4b0b8);_0x2bc5b4=_0x1bb44e-_0x4fab8d*_0xf4b0b8;for(const _0x40b850 of $gameParty[_0x4d1ecb(0x657)]()){const _0x4eafb3=$gameParty[_0x4d1ecb(0x657)]()['indexOf'](_0x40b850),_0x4ef801=_0x3415e6+_0x2bc5b4+_0x4eafb3*_0x4fab8d;this[_0x4d1ecb(0x2d0)](_0x40b850[_0x4d1ecb(0x2a4)](this[_0x4d1ecb(0x4b0)])),this[_0x4d1ecb(0x300)](_0x40b850,_0x4ef801+_0x4fab8d/0x2,_0x3c51e5);let _0x4cb3b0=_0x3c51e5;for(const _0x5b7c23 of _0x129c34){const _0x57e367=_0x4cb3b0-(_0x164186-_0x3cfa72)/0x2;this[_0x4d1ecb(0x579)](_0x40b850,_0x5b7c23,_0x4ef801,_0x57e367,_0x4fab8d),_0x4cb3b0+=_0x3cfa72;}}this[_0x4d1ecb(0x423)](_0x3415e6,_0x17ddf6,_0x2bc5b4,_0x3c51e5-_0x17ddf6);for(let _0x4cae7c=0x0;_0x4cae7c<_0xf4b0b8;_0x4cae7c++){if(_0x4d1ecb(0x1e8)==='Vyvti'){const _0x39dae5=_0x3415e6+_0x2bc5b4+_0x4cae7c*_0x4fab8d;this[_0x4d1ecb(0x423)](_0x39dae5,_0x17ddf6,_0x4fab8d,_0x3c51e5-_0x17ddf6);}else _0x2ae0c8[_0x4d1ecb(0x21b)](_0x4f1fee['characterName']());}for(const _0x37365d of _0x129c34){this[_0x4d1ecb(0x423)](_0x3415e6,_0x3c51e5,_0x2bc5b4,_0x3cfa72);for(let _0x4efba1=0x0;_0x4efba1<_0xf4b0b8;_0x4efba1++){const _0x175ecd=_0x3415e6+_0x2bc5b4+_0x4efba1*_0x4fab8d;this[_0x4d1ecb(0x423)](_0x175ecd,_0x3c51e5,_0x4fab8d,_0x3cfa72);}_0x3c51e5+=_0x3cfa72;}},Window_ShopStatus['prototype'][_0x14015d(0x323)]=function(_0xe38b0b,_0x32cc3e,_0x2a57ff){const _0x143440=_0x14015d;if(!this[_0x143440(0x32b)]())return![];const _0x2fa5fc=$dataSystem[_0x143440(0x622)][this['_item'][_0x143440(0x59b)]];return this[_0x143440(0x355)](_0x2fa5fc,_0xe38b0b,_0x32cc3e,_0x2a57ff,!![]),this['drawItemDarkRect'](_0xe38b0b,_0x32cc3e,_0x2a57ff),this[_0x143440(0x647)](),!![];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x541)]=function(){const _0xa3623d=_0x14015d,_0x4e7a41=VisuMZ[_0xa3623d(0x502)][_0xa3623d(0x524)][_0xa3623d(0x5b4)]['ItemQuantityFmt'];return _0x4e7a41['format']($gameParty[_0xa3623d(0x570)](this[_0xa3623d(0x4b0)]));},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x38c)]=function(){const _0x4d07fa=_0x14015d;let _0x3b49a7=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];return Imported[_0x4d07fa(0x3e1)]&&(_0x3b49a7=VisuMZ[_0x4d07fa(0x31a)][_0x4d07fa(0x524)][_0x4d07fa(0x5e8)][_0x4d07fa(0x45b)]),_0x3b49a7=_0x3b49a7['map'](_0x21149b=>typeof _0x21149b===_0x4d07fa(0x521)?_0x21149b:_0x21149b[_0x4d07fa(0x34e)]()['trim']()),_0x3b49a7;},Window_ShopStatus['prototype'][_0x14015d(0x230)]=function(){const _0x247510=_0x14015d;return VisuMZ[_0x247510(0x502)][_0x247510(0x524)]['StatusWindow'][_0x247510(0x3a7)];},Window_ShopStatus[_0x14015d(0x39a)]['drawParamName']=function(_0x32595e,_0x1b9b7b,_0x134103,_0x462ade){const _0x35ff3f=_0x14015d;this['resetFontSettings'](),this['contents']['fontSize']=this['smallParamFontSize']();let _0x5c6902=this[_0x35ff3f(0x23b)](TextManager['param'](_0x32595e))+0x4+_0x1b9b7b;return Imported[_0x35ff3f(0x3e1)]?(this[_0x35ff3f(0x3b5)](_0x1b9b7b,_0x134103,_0x462ade,_0x32595e,!![]),VisuMZ[_0x35ff3f(0x31a)][_0x35ff3f(0x524)][_0x35ff3f(0x5e8)][_0x35ff3f(0x2e1)]&&(_0x5c6902+=ImageManager[_0x35ff3f(0x674)]+0x4)):(this[_0x35ff3f(0x2b3)](ColorManager[_0x35ff3f(0x5bc)]()),this[_0x35ff3f(0x35f)](TextManager['param'](_0x32595e),_0x1b9b7b,_0x134103,_0x462ade)),this[_0x35ff3f(0x647)](),_0x5c6902;},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x579)]=function(_0x54d9c0,_0x1b3612,_0x5b063b,_0x31f1bf,_0xbd1907){const _0x820239=_0x14015d;_0x5b063b+=this[_0x820239(0x557)](),_0xbd1907-=this[_0x820239(0x557)]()*0x2;const _0x39bf13=VisuMZ[_0x820239(0x502)]['Settings'][_0x820239(0x204)];this['contents'][_0x820239(0x3f7)]=_0x39bf13[_0x820239(0x3a7)],this[_0x820239(0x2d0)](_0x54d9c0['canEquip'](this[_0x820239(0x4b0)]));if(_0x54d9c0[_0x820239(0x3fc)](this[_0x820239(0x4b0)])){const _0x4f7009=_0x39bf13[_0x820239(0x33b)];this[_0x820239(0x35f)](_0x4f7009,_0x5b063b,_0x31f1bf,_0xbd1907,_0x820239(0x46c));}else{if(_0x54d9c0['canEquip'](this[_0x820239(0x4b0)])){const _0x25cbc4=JsonEx['makeDeepCopy'](_0x54d9c0);_0x25cbc4[_0x820239(0x509)]=!![];const _0x1b9d34=_0x25cbc4['equipSlots']()[_0x820239(0x42c)](this['_item'][_0x820239(0x59b)]);if(_0x1b9d34>=0x0)_0x25cbc4[_0x820239(0x2f1)](_0x1b9d34,this[_0x820239(0x4b0)]);let _0x1d3801=0x0,_0x3fc404=0x0,_0x1904e1=0x0;Imported[_0x820239(0x3e1)]?(_0x1d3801=_0x25cbc4['paramValueByName'](_0x1b3612),_0x3fc404=_0x1d3801-_0x54d9c0['paramValueByName'](_0x1b3612),this[_0x820239(0x2b3)](ColorManager[_0x820239(0x4d2)](_0x3fc404)),_0x1904e1=(_0x3fc404>=0x0?'+':'')+VisuMZ['ConvertNumberToString'](_0x3fc404,0x0,_0x1b3612)):(_0x1d3801=_0x25cbc4[_0x820239(0x245)](_0x1b3612),_0x3fc404=_0x1d3801-_0x54d9c0[_0x820239(0x245)](_0x1b3612),this[_0x820239(0x2b3)](ColorManager[_0x820239(0x4d2)](_0x3fc404)),_0x1904e1=(_0x3fc404>=0x0?'+':'')+_0x3fc404);if(_0x1904e1==='+0')_0x1904e1=_0x39bf13[_0x820239(0x630)];this[_0x820239(0x35f)](_0x1904e1,_0x5b063b,_0x31f1bf,_0xbd1907,'center');}else{const _0xce8e87=_0x39bf13[_0x820239(0x4f4)];this['drawText'](_0xce8e87,_0x5b063b,_0x31f1bf,_0xbd1907,_0x820239(0x46c));}}this['resetFontSettings'](),this[_0x820239(0x2d0)](!![]);},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x4fe)]=function(){const _0x441db4=_0x14015d;VisuMZ[_0x441db4(0x502)][_0x441db4(0x524)][_0x441db4(0x204)]['DrawItemData'][_0x441db4(0x207)](this);},Window_ShopStatus[_0x14015d(0x39a)]['prepareItemCustomData']=function(){const _0x464c28=_0x14015d;this[_0x464c28(0x306)]={};if(!this[_0x464c28(0x4b0)])return;const _0x1cd38c=this['_item']['note'];if(_0x1cd38c[_0x464c28(0x497)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x1d0f80=String(RegExp['$1'])[_0x464c28(0x351)](/[\r\n]+/);for(const _0x4a58a6 of _0x1d0f80){if(_0x4a58a6[_0x464c28(0x497)](/(.*):[ ](.*)/i)){const _0x327716=String(RegExp['$1'])[_0x464c28(0x34e)]()[_0x464c28(0x4e3)](),_0x3ec0c0=String(RegExp['$2'])[_0x464c28(0x4e3)]();this[_0x464c28(0x306)][_0x327716]=_0x3ec0c0;}}}},Window_ShopStatus[_0x14015d(0x39a)]['itemDataFontSize']=function(){const _0x390d01=_0x14015d;return Math[_0x390d01(0x286)](0x1,$gameSystem[_0x390d01(0x2ba)]()-0x4);},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x647)]=function(){const _0x51f0e4=_0x14015d;Window_StatusBase['prototype'][_0x51f0e4(0x647)]['call'](this),this['contents'][_0x51f0e4(0x3f7)]=this[_0x51f0e4(0x59f)]||this['contents'][_0x51f0e4(0x3f7)],this[_0x51f0e4(0x45c)][_0x51f0e4(0x4fd)]=this[_0x51f0e4(0x532)]||this[_0x51f0e4(0x45c)][_0x51f0e4(0x4fd)];},Window_ShopStatus[_0x14015d(0x39a)]['fontSizeRatio']=function(){const _0x2e19df=_0x14015d;return this[_0x2e19df(0x45c)]['fontSize']/$gameSystem[_0x2e19df(0x2ba)]();},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x650)]=function(_0x5ba022,_0x24af51,_0x45d90c){const _0x42c422=_0x14015d,_0x2fda54=ImageManager[_0x42c422(0x405)](_0x42c422(0x463)),_0x16f7ad=ImageManager['iconWidth'],_0x19a77e=ImageManager['iconHeight'],_0x425c84=_0x5ba022%0x10*_0x16f7ad,_0x14367b=Math['floor'](_0x5ba022/0x10)*_0x19a77e,_0x440945=Math[_0x42c422(0x24b)](_0x16f7ad*this['fontSizeRatio']()),_0x41ba8c=Math[_0x42c422(0x24b)](_0x19a77e*this[_0x42c422(0x2bb)]());this[_0x42c422(0x45c)][_0x42c422(0x378)](_0x2fda54,_0x425c84,_0x14367b,_0x16f7ad,_0x19a77e,_0x24af51,_0x45d90c,_0x440945,_0x41ba8c);},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x321)]=function(_0x3ff78d,_0x384a2a){const _0x225f73=_0x14015d;if(_0x384a2a['drawing']){if(_0x225f73(0x5d5)!==_0x225f73(0x5a3))this[_0x225f73(0x650)](_0x3ff78d,_0x384a2a['x'],_0x384a2a['y']+0x2);else{const _0x4cf81b=_0x2d8d55['x']+_0x717961[_0x225f73(0x31f)]((_0x1a979d[_0x225f73(0x5ed)]-_0x5efb2a)/0x2);this[_0x225f73(0x37a)](_0x3a32b1,_0x4cf81b,_0x2ec061['y'],_0x5def4f);}}_0x384a2a['x']+=Math[_0x225f73(0x24b)](ImageManager['iconWidth']*this[_0x225f73(0x2bb)]());if(this['fontSizeRatio']()===0x1)_0x384a2a['x']+=0x4;},Window_ShopStatus['prototype'][_0x14015d(0x355)]=function(_0x128cdd,_0x1c4be4,_0x3e5af8,_0x444cf6,_0x56d471,_0x5f580c){const _0x3392e1=_0x14015d;_0x128cdd=_0x128cdd||'',_0x5f580c=_0x5f580c||_0x3392e1(0x21e),this['_resetFontSize']=this['itemDataFontSize'](),this[_0x3392e1(0x532)]=_0x56d471?ColorManager[_0x3392e1(0x5bc)]():this[_0x3392e1(0x45c)][_0x3392e1(0x4fd)],_0x1c4be4+=this[_0x3392e1(0x557)](),_0x444cf6-=this[_0x3392e1(0x557)]()*0x2;const _0x21bcdb=this[_0x3392e1(0x5dc)](_0x128cdd);if(_0x5f580c===_0x3392e1(0x46c))_0x1c4be4=_0x1c4be4+Math['floor']((_0x444cf6-_0x21bcdb[_0x3392e1(0x5ed)])/0x2);else _0x5f580c===_0x3392e1(0x668)&&(_0x1c4be4=_0x1c4be4+_0x444cf6-_0x21bcdb[_0x3392e1(0x5ed)]);_0x3e5af8+=(this['lineHeight']()-_0x21bcdb[_0x3392e1(0x206)])/0x2,this[_0x3392e1(0x37a)](_0x128cdd,_0x1c4be4,_0x3e5af8,_0x444cf6),this[_0x3392e1(0x59f)]=undefined,this[_0x3392e1(0x532)]=undefined,this[_0x3392e1(0x647)]();},Window_ShopStatus['prototype'][_0x14015d(0x457)]=function(_0x1525b3,_0xc92508,_0x310790){const _0x155653=_0x14015d;if(!DataManager['isItem'](this[_0x155653(0x4b0)]))return![];const _0x32fdcc=this['getItemConsumableLabel']();this[_0x155653(0x355)](_0x32fdcc,_0x1525b3,_0xc92508,_0x310790,!![]);const _0x265591=this[_0x155653(0x54a)]();return this['drawItemKeyData'](_0x265591,_0x1525b3,_0xc92508,_0x310790,![],_0x155653(0x668)),this[_0x155653(0x423)](_0x1525b3,_0xc92508,_0x310790),this[_0x155653(0x647)](),!![];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x316)]=function(){const _0x934c37=_0x14015d;return VisuMZ[_0x934c37(0x502)][_0x934c37(0x524)]['StatusWindow'][_0x934c37(0x1fd)];},Window_ShopStatus['prototype'][_0x14015d(0x54a)]=function(){const _0x15d25e=_0x14015d,_0x18bc12=_0x15d25e(0x458);if(this['_customItemInfo'][_0x18bc12])return this[_0x15d25e(0x306)][_0x18bc12];return this[_0x15d25e(0x451)]()?VisuMZ['ItemsEquipsCore']['Settings'][_0x15d25e(0x204)]['Consumable']:VisuMZ[_0x15d25e(0x502)][_0x15d25e(0x524)][_0x15d25e(0x204)]['NotConsumable'];},Window_ShopStatus[_0x14015d(0x39a)]['canConsumeItem']=function(){const _0x1cf8cf=_0x14015d;return VisuMZ[_0x1cf8cf(0x31a)]&&VisuMZ['CoreEngine'][_0x1cf8cf(0x524)][_0x1cf8cf(0x480)][_0x1cf8cf(0x560)]&&DataManager[_0x1cf8cf(0x381)](this['_item'])?![]:this['_item'][_0x1cf8cf(0x2f5)];},Window_ShopStatus[_0x14015d(0x39a)]['drawItemQuantity']=function(_0x2d8047,_0x46ddca,_0x58bb47){const _0x372e27=_0x14015d;if(!this[_0x372e27(0x32b)]()&&!DataManager[_0x372e27(0x342)](this[_0x372e27(0x4b0)]))return![];if(DataManager['isKeyItem'](this[_0x372e27(0x4b0)])&&!$dataSystem['optKeyItemsNumber']){const _0x168599=TextManager[_0x372e27(0x31b)];this[_0x372e27(0x355)](_0x168599,_0x2d8047,_0x46ddca,_0x58bb47,!![],_0x372e27(0x46c));}else{const _0x900993=TextManager[_0x372e27(0x52d)];this['drawItemKeyData'](_0x900993,_0x2d8047,_0x46ddca,_0x58bb47,!![]);const _0x5c6987=this[_0x372e27(0x541)]();this['drawItemKeyData'](_0x5c6987,_0x2d8047,_0x46ddca,_0x58bb47,![],_0x372e27(0x668));}return this['drawItemDarkRect'](_0x2d8047,_0x46ddca,_0x58bb47),this[_0x372e27(0x647)](),!![];},Window_ShopStatus[_0x14015d(0x39a)]['getItemQuantityText']=function(){const _0x459ef7=_0x14015d,_0x45b785=_0x459ef7(0x2cf);if(this['_customItemInfo'][_0x45b785])return this[_0x459ef7(0x306)][_0x45b785];const _0x249226=VisuMZ[_0x459ef7(0x502)]['Settings'][_0x459ef7(0x5b4)][_0x459ef7(0x20d)];return _0x249226['format']($gameParty[_0x459ef7(0x570)](this[_0x459ef7(0x4b0)]));},Window_ShopStatus['prototype'][_0x14015d(0x640)]=function(_0x5eb8f6,_0x38d47b,_0x4b0c16){const _0x27c836=_0x14015d,_0x318319=this[_0x27c836(0x310)]();return this[_0x27c836(0x355)](_0x318319,_0x5eb8f6,_0x38d47b,_0x4b0c16,![],_0x27c836(0x46c)),this[_0x27c836(0x423)](_0x5eb8f6,_0x38d47b,_0x4b0c16),this[_0x27c836(0x647)](),!![];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x310)]=function(){const _0xe0727c=_0x14015d,_0x2e6ff9=_0xe0727c(0x23f);if(this[_0xe0727c(0x306)][_0x2e6ff9])return this[_0xe0727c(0x306)][_0x2e6ff9];const _0x5802f0=VisuMZ['ItemsEquipsCore'][_0xe0727c(0x524)]['StatusWindow'],_0x4993a3=_0xe0727c(0x302)['format'](this[_0xe0727c(0x4b0)][_0xe0727c(0x3a6)]);return _0x5802f0[_0x4993a3];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x360)]=function(_0x337240,_0x4054a5,_0x2a760d){const _0x2fb1c4=_0x14015d,_0x1c482f=this['getItemScopeText']();return this[_0x2fb1c4(0x355)](_0x1c482f,_0x337240,_0x4054a5,_0x2a760d,![],_0x2fb1c4(0x46c)),this[_0x2fb1c4(0x423)](_0x337240,_0x4054a5,_0x2a760d),this[_0x2fb1c4(0x647)](),!![];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x41c)]=function(){const _0x447273=_0x14015d,_0x297f36=_0x447273(0x5f2);if(this['_customItemInfo'][_0x297f36])return this['_customItemInfo'][_0x297f36];const _0x23618c=VisuMZ[_0x447273(0x502)][_0x447273(0x524)][_0x447273(0x204)];if(Imported[_0x447273(0x221)]){if(_0x447273(0x4f2)===_0x447273(0x4f2)){const _0x8a7ae2=this['_item'][_0x447273(0x4f1)];if(_0x8a7ae2['match'](/<TARGET:[ ](.*)>/i)){const _0x435b43=String(RegExp['$1']);if(_0x435b43[_0x447273(0x497)](/(\d+) RANDOM ANY/i))return _0x23618c[_0x447273(0x5ac)][_0x447273(0x2c8)](Number(RegExp['$1']));else{if(_0x435b43[_0x447273(0x497)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x23618c[_0x447273(0x3b8)]['format'](Number(RegExp['$1']));else{if(_0x435b43[_0x447273(0x497)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){if('TeqrH'!==_0x447273(0x3d2))return _0x23618c['ScopeRandomAllies'][_0x447273(0x2c8)](Number(RegExp['$1']));else _0xa053fb=_0x447273(0x4a1)[_0x447273(0x2c8)](_0x10efe8['id']);}else{if(_0x435b43['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if(_0x447273(0x422)!==_0x447273(0x1f3))return _0x23618c[_0x447273(0x281)];else{if(this['_numberWindow']&&this['_numberWindow'][_0x447273(0x653)])return _0x1fb2e0[_0x447273(0x33d)]('up',_0x447273(0x2bf));return _0xdf98b[_0x447273(0x39a)][_0x447273(0x4e8)][_0x447273(0x207)](this);}}}}}}}else{const _0x325a7b=_0xf9593[_0x447273(0x3ea)][_0x447273(0x3c2)];_0x325a7b&&(this[_0x447273(0x5c6)](this[_0x447273(0x63e)]())?(this['processShiftRemoveShortcut'](),this[_0x447273(0x20b)]()):this[_0x447273(0x4b9)]());}}const _0x2e531c=_0x447273(0x662)['format'](this[_0x447273(0x4b0)]['scope']);return _0x23618c[_0x2e531c];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x22c)]=function(_0xbf2c85,_0x1e23c9,_0x435c0d){const _0x6eb18b=_0x14015d,_0x3c0b73=this[_0x6eb18b(0x450)]();this[_0x6eb18b(0x355)](_0x3c0b73,_0xbf2c85,_0x1e23c9,_0x435c0d,!![]);const _0x18299c=this[_0x6eb18b(0x673)]();return this['drawItemKeyData'](_0x18299c,_0xbf2c85,_0x1e23c9,_0x435c0d,![],'right'),this[_0x6eb18b(0x423)](_0xbf2c85,_0x1e23c9,_0x435c0d),this[_0x6eb18b(0x647)](),!![];},Window_ShopStatus[_0x14015d(0x39a)]['getItemSpeedLabel']=function(){const _0x17bed4=_0x14015d;return VisuMZ['ItemsEquipsCore'][_0x17bed4(0x524)][_0x17bed4(0x204)]['LabelSpeed'];},Window_ShopStatus['prototype'][_0x14015d(0x673)]=function(){const _0x17afc6=_0x14015d,_0x3d25df=_0x17afc6(0x231);if(this['_customItemInfo'][_0x3d25df])return this['_customItemInfo'][_0x3d25df];const _0x462324=this[_0x17afc6(0x4b0)][_0x17afc6(0x380)];if(_0x462324>=0x7d0)return VisuMZ[_0x17afc6(0x502)]['Settings']['StatusWindow'][_0x17afc6(0x4dd)];else{if(_0x462324>=0x3e8)return VisuMZ[_0x17afc6(0x502)]['Settings'][_0x17afc6(0x204)][_0x17afc6(0x3ad)];else{if(_0x462324>0x0)return VisuMZ[_0x17afc6(0x502)][_0x17afc6(0x524)][_0x17afc6(0x204)]['Speed1'];else{if(_0x462324===0x0)return VisuMZ[_0x17afc6(0x502)][_0x17afc6(0x524)][_0x17afc6(0x204)][_0x17afc6(0x30b)];else{if(_0x462324>-0x3e8){if(_0x17afc6(0x3c1)!==_0x17afc6(0x644))return VisuMZ[_0x17afc6(0x502)]['Settings']['StatusWindow'][_0x17afc6(0x216)];else{const _0x3383ac=this[_0x17afc6(0x25d)](),_0x158c40=this[_0x17afc6(0x432)]()-this[_0x17afc6(0x61d)][_0x17afc6(0x206)],_0x1950ad=this[_0x17afc6(0x446)]()?0x0:_0x5ba3a0[_0x17afc6(0x5c1)]-_0x3383ac,_0x1dc3e8=this[_0x17afc6(0x61d)]['y']+this[_0x17afc6(0x61d)][_0x17afc6(0x206)];return new _0x5231b6(_0x1950ad,_0x1dc3e8,_0x3383ac,_0x158c40);}}else{if(_0x462324>-0x7d0)return VisuMZ['ItemsEquipsCore'][_0x17afc6(0x524)]['StatusWindow'][_0x17afc6(0x28c)];else return _0x462324<=-0x7d0?VisuMZ[_0x17afc6(0x502)][_0x17afc6(0x524)][_0x17afc6(0x204)][_0x17afc6(0x5e2)]:_0x17afc6(0x50e)!==_0x17afc6(0x50e)?_0x4eef16[_0x17afc6(0x4e0)]:'?????';}}}}}},Window_ShopStatus[_0x14015d(0x39a)]['drawItemSuccessRate']=function(_0x20f232,_0x30ffe7,_0x2db2d7){const _0x45d3e2=_0x14015d,_0x5d3ffc=this['getItemSuccessRateLabel']();this[_0x45d3e2(0x355)](_0x5d3ffc,_0x20f232,_0x30ffe7,_0x2db2d7,!![]);const _0x496998=this['getItemSuccessRateText']();return this['drawItemKeyData'](_0x496998,_0x20f232,_0x30ffe7,_0x2db2d7,![],'right'),this[_0x45d3e2(0x423)](_0x20f232,_0x30ffe7,_0x2db2d7),this[_0x45d3e2(0x647)](),!![];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x4d0)]=function(){const _0x377990=_0x14015d;return VisuMZ[_0x377990(0x502)]['Settings']['StatusWindow']['LabelSuccessRate'];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x2f2)]=function(){const _0x45e155=_0x14015d,_0x4847ae='SUCCESS\x20RATE';if(this[_0x45e155(0x306)][_0x4847ae])return this['_customItemInfo'][_0x4847ae];if(Imported[_0x45e155(0x221)]){const _0x5a90b9=this[_0x45e155(0x4b0)][_0x45e155(0x4f1)];if(_0x5a90b9[_0x45e155(0x497)](/<ALWAYS HIT>/i))return _0x45e155(0x36f)!=='EJunf'?![]:'100%';else{if(_0x5a90b9['match'](/<ALWAYS HIT RATE: (\d+)([%％])>/i)){if('UUOWR'===_0x45e155(0x251))return'%1%'[_0x45e155(0x2c8)](Number(RegExp['$1']));else{_0x3e24bd[_0x45e155(0x5e3)]()&&this[_0x45e155(0x3de)](!![]);if(_0x2857e3['isClicked']())this[_0x45e155(0x605)]();else _0x1d222a['isCancelled']()&&this[_0x45e155(0x41a)]();}}}}return _0x45e155(0x42e)[_0x45e155(0x2c8)](this[_0x45e155(0x4b0)][_0x45e155(0x248)]);},Window_ShopStatus[_0x14015d(0x39a)]['drawItemRepeats']=function(_0x3f92e3,_0x30faec,_0x3c338a){const _0x1c3d65=_0x14015d,_0x47f5a5=this[_0x1c3d65(0x462)]();this['drawItemKeyData'](_0x47f5a5,_0x3f92e3,_0x30faec,_0x3c338a,!![]);const _0x3744bc=this[_0x1c3d65(0x2db)]();return this['drawItemKeyData'](_0x3744bc,_0x3f92e3,_0x30faec,_0x3c338a,![],_0x1c3d65(0x668)),this[_0x1c3d65(0x423)](_0x3f92e3,_0x30faec,_0x3c338a),this[_0x1c3d65(0x647)](),!![];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x462)]=function(){const _0x377ed3=_0x14015d;return VisuMZ[_0x377ed3(0x502)]['Settings']['StatusWindow'][_0x377ed3(0x4bb)];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x2db)]=function(){const _0x2bb698=_0x14015d,_0x38e952=_0x2bb698(0x2c4);if(this[_0x2bb698(0x306)][_0x38e952])return this[_0x2bb698(0x306)][_0x38e952];const _0x41af59='×%1';return _0x41af59[_0x2bb698(0x2c8)](this[_0x2bb698(0x4b0)][_0x2bb698(0x411)]);},Window_ShopStatus['prototype'][_0x14015d(0x367)]=function(_0x4ec34d,_0x39ff39,_0xa7976c){const _0x19db74=_0x14015d,_0x145859=this['getItemHitTypeLabel']();this[_0x19db74(0x355)](_0x145859,_0x4ec34d,_0x39ff39,_0xa7976c,!![]);const _0x36896e=this[_0x19db74(0x33f)]();return this['drawItemKeyData'](_0x36896e,_0x4ec34d,_0x39ff39,_0xa7976c,![],_0x19db74(0x668)),this[_0x19db74(0x423)](_0x4ec34d,_0x39ff39,_0xa7976c),this[_0x19db74(0x647)](),!![];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x329)]=function(){const _0x71e7a=_0x14015d;return VisuMZ['ItemsEquipsCore'][_0x71e7a(0x524)]['StatusWindow'][_0x71e7a(0x349)];},Window_ShopStatus['prototype'][_0x14015d(0x33f)]=function(){const _0x246b4e=_0x14015d,_0x448b4a=_0x246b4e(0x547);if(this['_customItemInfo'][_0x448b4a])return this[_0x246b4e(0x306)][_0x448b4a];const _0x33b328=VisuMZ['ItemsEquipsCore'][_0x246b4e(0x524)][_0x246b4e(0x204)],_0x3fbc03=_0x246b4e(0x3f6)[_0x246b4e(0x2c8)](this[_0x246b4e(0x4b0)][_0x246b4e(0x28f)]);return _0x33b328[_0x3fbc03];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x319)]=function(_0x2fd9b5,_0x163e21,_0x36ffbb){const _0x5725f7=_0x14015d;if(this[_0x5725f7(0x4b0)][_0x5725f7(0x3f5)][_0x5725f7(0x32f)]<=0x0)return _0x163e21;if(this['drawItemDamageElement'](_0x2fd9b5,_0x163e21,_0x36ffbb))_0x163e21+=this['lineHeight']();if(this['drawItemDamageAmount'](_0x2fd9b5,_0x163e21,_0x36ffbb))_0x163e21+=this[_0x5725f7(0x4ee)]();return this[_0x5725f7(0x647)](),_0x163e21;},Window_ShopStatus[_0x14015d(0x39a)]['drawItemDamageElement']=function(_0xa7ac68,_0x4050a1,_0x188604){const _0x20e9d8=_0x14015d,_0x10f6ac=this[_0x20e9d8(0x313)]();this[_0x20e9d8(0x355)](_0x10f6ac,_0xa7ac68,_0x4050a1,_0x188604,!![]);const _0x3b339b=this[_0x20e9d8(0x36d)]();return this[_0x20e9d8(0x355)](_0x3b339b,_0xa7ac68,_0x4050a1,_0x188604,![],_0x20e9d8(0x668)),this[_0x20e9d8(0x423)](_0xa7ac68,_0x4050a1,_0x188604),this[_0x20e9d8(0x647)](),!![];},Window_ShopStatus['prototype'][_0x14015d(0x313)]=function(){const _0x92a295=_0x14015d;return VisuMZ[_0x92a295(0x502)][_0x92a295(0x524)][_0x92a295(0x204)][_0x92a295(0x201)];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x36d)]=function(){const _0x2ad15f=_0x14015d,_0x5c5319=_0x2ad15f(0x5b0);if(this[_0x2ad15f(0x306)][_0x5c5319])return this[_0x2ad15f(0x306)][_0x5c5319];if(this[_0x2ad15f(0x4b0)][_0x2ad15f(0x3f5)][_0x2ad15f(0x20f)]<=-0x1)return VisuMZ[_0x2ad15f(0x502)][_0x2ad15f(0x524)][_0x2ad15f(0x204)]['ElementWeapon'];else return this['_item']['damage'][_0x2ad15f(0x20f)]===0x0?VisuMZ[_0x2ad15f(0x502)]['Settings'][_0x2ad15f(0x204)][_0x2ad15f(0x413)]:$dataSystem['elements'][this[_0x2ad15f(0x4b0)][_0x2ad15f(0x3f5)][_0x2ad15f(0x20f)]];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x382)]=function(_0x3bdb66,_0x2c4c68,_0x592fcd){const _0x389dd2=_0x14015d,_0x110b7a=this['getItemDamageAmountLabel']();this[_0x389dd2(0x355)](_0x110b7a,_0x3bdb66,_0x2c4c68,_0x592fcd,!![]),this['setupItemDamageTempActors']();const _0x4eab6e=this[_0x389dd2(0x3b1)](),_0x1414ab=ColorManager['damageColor']([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x389dd2(0x4b0)]['damage']['type']]);return this[_0x389dd2(0x2b3)](_0x1414ab),this['drawItemKeyData'](_0x4eab6e,_0x3bdb66,_0x2c4c68,_0x592fcd,![],_0x389dd2(0x668)),this[_0x389dd2(0x423)](_0x3bdb66,_0x2c4c68,_0x592fcd),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x529)]=function(){const _0x422664=_0x14015d;if(Imported[_0x422664(0x221)]&&DataManager['getDamageStyle'](this[_0x422664(0x4b0)])!==_0x422664(0x3e3))return this[_0x422664(0x508)]();else{if(_0x422664(0x5f0)!==_0x422664(0x506))return this[_0x422664(0x65f)]();else{const _0x10b0b8=_0x408ee1['equipTypes'][_0x422664(0x42c)](_0x338ff4['trim']());if(_0x10b0b8>0x0)_0x4ab31c['equipSlots'][_0x422664(0x58d)](_0x10b0b8);}}},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x65f)]=function(){const _0x52b482=_0x14015d,_0x2d277a=VisuMZ[_0x52b482(0x502)][_0x52b482(0x524)][_0x52b482(0x204)],_0xd35247=_0x52b482(0x3b6)[_0x52b482(0x2c8)](this[_0x52b482(0x4b0)]['damage'][_0x52b482(0x32f)]),_0x2cbb11=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item'][_0x52b482(0x3f5)][_0x52b482(0x32f)]];return _0x2d277a[_0xd35247][_0x52b482(0x2c8)](_0x2cbb11);},Window_ShopStatus['prototype'][_0x14015d(0x5f1)]=function(){const _0x11873d=_0x14015d,_0xec7392=$gameActors[_0x11873d(0x496)](0x1);this[_0x11873d(0x2fd)]=JsonEx[_0x11873d(0x362)](_0xec7392),this['_tempActorB']=JsonEx['makeDeepCopy'](_0xec7392);},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x3b1)]=function(){const _0x1eb52e=_0x14015d,_0x182f1b='DAMAGE\x20MULTIPLIER';if(this[_0x1eb52e(0x306)][_0x182f1b])return this[_0x1eb52e(0x306)][_0x182f1b];return Imported[_0x1eb52e(0x221)]&&DataManager['getDamageStyle'](this[_0x1eb52e(0x4b0)])!==_0x1eb52e(0x3e3)?_0x1eb52e(0x417)!==_0x1eb52e(0x417)?_0x40d4d5[_0x1eb52e(0x502)][_0x1eb52e(0x524)][_0x1eb52e(0x656)][_0x1eb52e(0x1f1)]:this['getItemDamageAmountTextBattleCore']():this[_0x1eb52e(0x3b2)]();},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x3b2)]=function(){const _0x47f470=_0x14015d;window['a']=this['_tempActorA'],window['b']=this['_tempActorB'],this[_0x47f470(0x2fd)][_0x47f470(0x42a)](!![]),this['_tempActorB'][_0x47f470(0x42a)]([0x3,0x4][_0x47f470(0x415)](this[_0x47f470(0x4b0)]['damage'][_0x47f470(0x32f)]));let _0x4bcd6f=this[_0x47f470(0x4b0)][_0x47f470(0x3f5)][_0x47f470(0x671)];try{if(_0x47f470(0x50a)===_0x47f470(0x572))return _0x47f470(0x365);else{const _0x4cab6c=Math[_0x47f470(0x286)](eval(_0x4bcd6f),0x0)/window['a']['atk'];return this[_0x47f470(0x5e6)](),isNaN(_0x4cab6c)?_0x47f470(0x54c):'vMCNt'!==_0x47f470(0x40d)?'%1%'['format'](Math[_0x47f470(0x5a8)](_0x4cab6c*0x64)):this[_0x47f470(0x39c)]();}}catch(_0x5b70e8){return $gameTemp[_0x47f470(0x45f)]()&&(console['log'](_0x47f470(0x1ec)['format'](this[_0x47f470(0x4b0)][_0x47f470(0x4c6)])),console[_0x47f470(0x46d)](_0x5b70e8)),this[_0x47f470(0x5e6)](),_0x47f470(0x54c);}},Window_ShopStatus[_0x14015d(0x39a)]['revertGlobalNamespaceVariables']=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x212)]=function(_0xfd3046,_0x39b119,_0x1833ff){const _0x478092=_0x14015d;if(!this[_0x478092(0x2bd)]())return _0x39b119;if(this[_0x478092(0x1fa)](_0xfd3046,_0x39b119,_0x1833ff))_0x39b119+=this['lineHeight']();if(this['drawItemEffectsMpRecovery'](_0xfd3046,_0x39b119,_0x1833ff))_0x39b119+=this['lineHeight']();if(this[_0x478092(0x51c)](_0xfd3046,_0x39b119,_0x1833ff))_0x39b119+=this[_0x478092(0x4ee)]();if(this[_0x478092(0x217)](_0xfd3046,_0x39b119,_0x1833ff))_0x39b119+=this[_0x478092(0x4ee)]();if(this[_0x478092(0x4a5)](_0xfd3046,_0x39b119,_0x1833ff))_0x39b119+=this[_0x478092(0x4ee)]();if(this[_0x478092(0x2f6)](_0xfd3046,_0x39b119,_0x1833ff))_0x39b119+=this['lineHeight']();if(this['drawItemEffectsSelfTpGain'](_0xfd3046,_0x39b119,_0x1833ff))_0x39b119+=this['lineHeight']();if(this[_0x478092(0x43d)](_0xfd3046,_0x39b119,_0x1833ff))_0x39b119+=this[_0x478092(0x4ee)]();if(this[_0x478092(0x623)](_0xfd3046,_0x39b119,_0x1833ff))_0x39b119+=this['lineHeight']();return this[_0x478092(0x647)](),_0x39b119;},Window_ShopStatus[_0x14015d(0x39a)]['getItemEffects']=function(){const _0x3c2706=_0x14015d;return this[_0x3c2706(0x4b0)][_0x3c2706(0x3c3)];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x2bd)]=function(){const _0x4b3145=_0x14015d;let _0x25659c=![];this[_0x4b3145(0x5a9)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x3f6c34=this[_0x4b3145(0x588)]();for(const _0x72819a of _0x3f6c34){if(_0x4b3145(0x5ea)==='RWfJs')switch(_0x72819a[_0x4b3145(0x4d8)]){case Game_Action[_0x4b3145(0x307)]:this['_itemData'][_0x4b3145(0x257)]+=_0x72819a[_0x4b3145(0x65e)],this['_itemData']['flatHP']+=_0x72819a[_0x4b3145(0x330)],_0x25659c=!![];break;case Game_Action[_0x4b3145(0x408)]:this[_0x4b3145(0x5a9)]['rateMP']+=_0x72819a[_0x4b3145(0x65e)],this[_0x4b3145(0x5a9)][_0x4b3145(0x4bc)]+=_0x72819a[_0x4b3145(0x330)],_0x25659c=!![];break;case Game_Action['EFFECT_GAIN_TP']:this[_0x4b3145(0x5a9)][_0x4b3145(0x3fb)]+=_0x72819a[_0x4b3145(0x65e)],_0x25659c=!![];break;case Game_Action[_0x4b3145(0x461)]:this[_0x4b3145(0x5a9)]['addState'][_0x4b3145(0x58d)](_0x72819a['dataId']),_0x25659c=!![];break;case Game_Action[_0x4b3145(0x294)]:this[_0x4b3145(0x5a9)][_0x4b3145(0x35e)][_0x4b3145(0x58d)](_0x72819a['dataId']),this['_itemData']['removeStateBuffChanges']=!![],_0x25659c=!![];break;case Game_Action[_0x4b3145(0x337)]:this[_0x4b3145(0x5a9)][_0x4b3145(0x539)][_0x72819a[_0x4b3145(0x531)]]+=0x1,_0x25659c=!![];break;case Game_Action[_0x4b3145(0x3e6)]:this[_0x4b3145(0x5a9)][_0x4b3145(0x539)][_0x72819a['dataId']]-=0x1,_0x25659c=!![];break;case Game_Action['EFFECT_REMOVE_BUFF']:this[_0x4b3145(0x5a9)][_0x4b3145(0x5be)]['push'](_0x72819a['dataId']),this[_0x4b3145(0x5a9)][_0x4b3145(0x41e)]=!![],_0x25659c=!![];break;case Game_Action[_0x4b3145(0x317)]:this['_itemData'][_0x4b3145(0x2ab)][_0x4b3145(0x58d)](_0x72819a[_0x4b3145(0x531)]),this['_itemData']['removeStateBuffChanges']=!![],_0x25659c=!![];break;}else _0x3cd764['ItemsEquipsCore'][_0x4b3145(0x38a)][_0x4b3145(0x207)](this),this[_0x4b3145(0x398)]()&&this[_0x4b3145(0x445)]();}if(this[_0x4b3145(0x5a9)][_0x4b3145(0x41b)][_0x4b3145(0x536)]>0x0)this['_itemData'][_0x4b3145(0x243)]=!![];for(let _0x1ee6d8=0x0;_0x1ee6d8<this[_0x4b3145(0x5a9)][_0x4b3145(0x539)][_0x4b3145(0x536)];_0x1ee6d8++){if(this['_itemData']['changeBuff'][_0x1ee6d8]!==0x0)this[_0x4b3145(0x5a9)][_0x4b3145(0x243)]=!![];}this['_item'][_0x4b3145(0x5da)]!==0x0&&(this[_0x4b3145(0x5a9)][_0x4b3145(0x328)]=this['_item'][_0x4b3145(0x5da)],_0x25659c=!![]);const _0x37d019=['HP\x20RECOVERY',_0x4b3145(0x58a),_0x4b3145(0x2b8),'HP\x20DAMAGE',_0x4b3145(0x259),_0x4b3145(0x525),_0x4b3145(0x615),_0x4b3145(0x202),_0x4b3145(0x2b0)];for(const _0x17a2bb of _0x37d019){if(_0x4b3145(0x454)==='QpqZM')this[_0x4b3145(0x4b2)]();else{if(this[_0x4b3145(0x306)][_0x17a2bb]){if(_0x4b3145(0x1e3)!==_0x4b3145(0x2ad)){_0x25659c=!![];break;}else{const _0x3d9ee4=_0x38439b(_0x2a6c33['$1'])[_0x4b3145(0x351)](/[\r\n]+/);for(const _0x176c32 of _0x3d9ee4){if(_0x176c32[_0x4b3145(0x497)](/(.*):[ ](.*)/i)){const _0x437cce=_0x1525d9(_0x38ae37['$1'])[_0x4b3145(0x4e3)](),_0xf332ce=_0x5bdd98(_0x34b581['$2'])[_0x4b3145(0x4e3)]();this[_0x4b3145(0x51e)](_0x437cce,_0xf332ce,_0x3a5df8,_0x2c1aae,_0x5aa47c),_0x442fd7+=this[_0x4b3145(0x4ee)]();}}}}}}return _0x25659c;},Window_ShopStatus['prototype'][_0x14015d(0x1fa)]=function(_0x4b6b6,_0x293661,_0x1ad433){const _0xece3e=_0x14015d,_0x395e3b=_0xece3e(0x3fd);if(this[_0xece3e(0x5a9)][_0xece3e(0x257)]<=0x0&&this[_0xece3e(0x5a9)][_0xece3e(0x597)]<=0x0&&!this[_0xece3e(0x306)][_0x395e3b])return![];const _0x22645b=this['getItemEffectsHpRecoveryLabel']();this[_0xece3e(0x355)](_0x22645b,_0x4b6b6,_0x293661,_0x1ad433,!![]);const _0x5814d1=this[_0xece3e(0x224)]();return this[_0xece3e(0x2b3)](ColorManager[_0xece3e(0x59a)](0x1)),this[_0xece3e(0x355)](_0x5814d1,_0x4b6b6,_0x293661,_0x1ad433,![],'right'),this[_0xece3e(0x423)](_0x4b6b6,_0x293661,_0x1ad433),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x49a)]=function(){const _0x553b45=_0x14015d,_0x3c80ab=VisuMZ[_0x553b45(0x502)][_0x553b45(0x524)]['StatusWindow'][_0x553b45(0x669)];return _0x3c80ab[_0x553b45(0x2c8)](TextManager['hp']);},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x224)]=function(){const _0x23e660=_0x14015d,_0x25ef07='HP\x20RECOVERY';if(this[_0x23e660(0x306)][_0x25ef07])return this['_customItemInfo'][_0x25ef07];let _0x286312='';if(this[_0x23e660(0x5a9)][_0x23e660(0x257)]>0x0)_0x286312+=_0x23e660(0x479)[_0x23e660(0x2c8)](Math[_0x23e660(0x31f)](this['_itemData'][_0x23e660(0x257)]*0x64));if(this[_0x23e660(0x5a9)][_0x23e660(0x257)]>0x0&&this[_0x23e660(0x5a9)][_0x23e660(0x597)]>0x0)_0x286312+='\x20';if(this[_0x23e660(0x5a9)][_0x23e660(0x597)]>0x0)_0x286312+='+%1'[_0x23e660(0x2c8)](this['_itemData'][_0x23e660(0x597)]);return _0x286312;},Window_ShopStatus[_0x14015d(0x39a)]['drawItemEffectsMpRecovery']=function(_0x27d3d1,_0xf3cab1,_0x91b7f7){const _0x18f3cf=_0x14015d,_0x35fd88='MP\x20RECOVERY';if(this[_0x18f3cf(0x5a9)][_0x18f3cf(0x558)]<=0x0&&this[_0x18f3cf(0x5a9)][_0x18f3cf(0x4bc)]<=0x0&&!this['_customItemInfo'][_0x35fd88])return![];const _0x22e05b=this[_0x18f3cf(0x675)]();this[_0x18f3cf(0x355)](_0x22e05b,_0x27d3d1,_0xf3cab1,_0x91b7f7,!![]);const _0x2f9746=this[_0x18f3cf(0x5bd)]();return this['changeTextColor'](ColorManager[_0x18f3cf(0x59a)](0x3)),this['drawItemKeyData'](_0x2f9746,_0x27d3d1,_0xf3cab1,_0x91b7f7,![],_0x18f3cf(0x668)),this['drawItemDarkRect'](_0x27d3d1,_0xf3cab1,_0x91b7f7),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x675)]=function(){const _0x36ac85=_0x14015d,_0x131542=VisuMZ[_0x36ac85(0x502)][_0x36ac85(0x524)][_0x36ac85(0x204)][_0x36ac85(0x546)];return _0x131542['format'](TextManager['mp']);},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x5bd)]=function(){const _0xefd977=_0x14015d,_0x5d5472=_0xefd977(0x58a);if(this[_0xefd977(0x306)][_0x5d5472])return this[_0xefd977(0x306)][_0x5d5472];let _0x3e4e02='';if(this[_0xefd977(0x5a9)][_0xefd977(0x558)]>0x0)_0x3e4e02+=_0xefd977(0x479)[_0xefd977(0x2c8)](Math[_0xefd977(0x31f)](this[_0xefd977(0x5a9)]['rateMP']*0x64));if(this[_0xefd977(0x5a9)][_0xefd977(0x558)]>0x0&&this[_0xefd977(0x5a9)][_0xefd977(0x4bc)]>0x0)_0x3e4e02+='\x20';if(this['_itemData'][_0xefd977(0x4bc)]>0x0)_0x3e4e02+='+%1'[_0xefd977(0x2c8)](this[_0xefd977(0x5a9)][_0xefd977(0x4bc)]);return _0x3e4e02;},Window_ShopStatus['prototype']['drawItemEffectsTpRecovery']=function(_0x4c3e36,_0x4f3e2c,_0x1787c7){const _0x320abe=_0x14015d,_0x4f915c='TP\x20RECOVERY';if(this['_itemData']['gainTP']<=0x0&&!this[_0x320abe(0x306)][_0x4f915c])return![];const _0x41b37e=this['getItemEffectsTpRecoveryLabel']();this[_0x320abe(0x355)](_0x41b37e,_0x4c3e36,_0x4f3e2c,_0x1787c7,!![]);const _0x2763b8=this['getItemEffectsTpRecoveryText']();return this[_0x320abe(0x2b3)](ColorManager[_0x320abe(0x441)]()),this[_0x320abe(0x355)](_0x2763b8,_0x4c3e36,_0x4f3e2c,_0x1787c7,![],_0x320abe(0x668)),this[_0x320abe(0x423)](_0x4c3e36,_0x4f3e2c,_0x1787c7),this[_0x320abe(0x647)](),!![];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x247)]=function(){const _0x50ba1d=_0x14015d,_0x1d69b5=VisuMZ[_0x50ba1d(0x502)][_0x50ba1d(0x524)][_0x50ba1d(0x204)][_0x50ba1d(0x5b3)];return _0x1d69b5[_0x50ba1d(0x2c8)](TextManager['tp']);},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x52a)]=function(){const _0x426a24=_0x14015d,_0x23a92c=_0x426a24(0x2b8);if(this[_0x426a24(0x306)][_0x23a92c])return this[_0x426a24(0x306)][_0x23a92c];let _0x56c89b='';return _0x56c89b+='+%1'['format'](this[_0x426a24(0x5a9)]['gainTP']),_0x56c89b;},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x4aa)]=function(_0x378ff8,_0x5a3ccc,_0x4f8031){const _0x34de2b=_0x14015d,_0x2992ef='USER\x20TP\x20GAIN';if(this[_0x34de2b(0x5a9)]['selfTP']===0x0&&!this[_0x34de2b(0x306)][_0x2992ef])return![];const _0x17e9c6=this[_0x34de2b(0x535)]();this['drawItemKeyData'](_0x17e9c6,_0x378ff8,_0x5a3ccc,_0x4f8031,!![]);const _0x248872=this[_0x34de2b(0x1e5)]();return this[_0x34de2b(0x5a9)]['selfTP']>0x0?this['changeTextColor'](ColorManager['powerUpColor']()):this[_0x34de2b(0x2b3)](ColorManager[_0x34de2b(0x2f7)]()),this[_0x34de2b(0x355)](_0x248872,_0x378ff8,_0x5a3ccc,_0x4f8031,![],_0x34de2b(0x668)),this[_0x34de2b(0x423)](_0x378ff8,_0x5a3ccc,_0x4f8031),this[_0x34de2b(0x647)](),!![];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x535)]=function(){const _0x4d87b9=_0x14015d,_0x189c44=VisuMZ['ItemsEquipsCore'][_0x4d87b9(0x524)][_0x4d87b9(0x204)][_0x4d87b9(0x481)];return _0x189c44[_0x4d87b9(0x2c8)](TextManager['tp']);},Window_ShopStatus['prototype']['getItemEffectsSelfTpGainText']=function(){const _0x4685e9=_0x14015d,_0x52c52b=_0x4685e9(0x615);if(this[_0x4685e9(0x306)][_0x52c52b])return this[_0x4685e9(0x306)][_0x52c52b];let _0xe391f2='';return this[_0x4685e9(0x5a9)][_0x4685e9(0x328)]>0x0?_0xe391f2+=_0x4685e9(0x638)[_0x4685e9(0x2c8)](this['_itemData'][_0x4685e9(0x328)]):_0xe391f2+='%1'['format'](this['_itemData'][_0x4685e9(0x328)]),_0xe391f2;},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x217)]=function(_0x2bf604,_0x3bd12f,_0x3e1632){const _0x3f749a=_0x14015d,_0x3976ac='HP\x20DAMAGE';if(this[_0x3f749a(0x5a9)][_0x3f749a(0x257)]>=0x0&&this['_itemData'][_0x3f749a(0x597)]>=0x0&&!this[_0x3f749a(0x306)][_0x3976ac])return![];const _0x44f313=this[_0x3f749a(0x35a)]();this['drawItemKeyData'](_0x44f313,_0x2bf604,_0x3bd12f,_0x3e1632,!![]);const _0x1b4e8b=this[_0x3f749a(0x511)]();return this[_0x3f749a(0x2b3)](ColorManager[_0x3f749a(0x59a)](0x0)),this[_0x3f749a(0x355)](_0x1b4e8b,_0x2bf604,_0x3bd12f,_0x3e1632,![],_0x3f749a(0x668)),this[_0x3f749a(0x423)](_0x2bf604,_0x3bd12f,_0x3e1632),this[_0x3f749a(0x647)](),!![];},Window_ShopStatus['prototype'][_0x14015d(0x35a)]=function(){const _0x12735d=_0x14015d,_0x491810=VisuMZ['ItemsEquipsCore'][_0x12735d(0x524)][_0x12735d(0x204)][_0x12735d(0x61c)];return _0x491810['format'](TextManager['hp']);},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x511)]=function(){const _0x39716a=_0x14015d,_0x1c1b9b=_0x39716a(0x5a1);if(this[_0x39716a(0x306)][_0x1c1b9b])return this[_0x39716a(0x306)][_0x1c1b9b];let _0x3ba57a='';if(this['_itemData']['rateHP']<0x0)_0x3ba57a+=_0x39716a(0x42e)[_0x39716a(0x2c8)](Math['floor'](this[_0x39716a(0x5a9)][_0x39716a(0x257)]*0x64));if(this['_itemData'][_0x39716a(0x257)]<0x0&&this['_itemData']['flatHP']<0x0)_0x3ba57a+='\x20';if(this[_0x39716a(0x5a9)]['flatHP']<0x0)_0x3ba57a+='%1'['format'](this['_itemData']['flatHP']);return _0x3ba57a;},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x4a5)]=function(_0x1d44f4,_0x17bb88,_0x423efd){const _0x3c0aac=_0x14015d,_0x2e44e2=_0x3c0aac(0x259);if(this['_itemData'][_0x3c0aac(0x558)]>=0x0&&this['_itemData'][_0x3c0aac(0x4bc)]>=0x0&&!this['_customItemInfo'][_0x2e44e2])return![];const _0x5d3707=this[_0x3c0aac(0x52e)]();this[_0x3c0aac(0x355)](_0x5d3707,_0x1d44f4,_0x17bb88,_0x423efd,!![]);const _0x32ae53=this[_0x3c0aac(0x361)]();return this[_0x3c0aac(0x2b3)](ColorManager['damageColor'](0x2)),this['drawItemKeyData'](_0x32ae53,_0x1d44f4,_0x17bb88,_0x423efd,![],'right'),this[_0x3c0aac(0x423)](_0x1d44f4,_0x17bb88,_0x423efd),this[_0x3c0aac(0x647)](),!![];},Window_ShopStatus[_0x14015d(0x39a)]['getItemEffectsMpDamageLabel']=function(){const _0x1f8747=_0x14015d,_0x2a07d8=VisuMZ[_0x1f8747(0x502)][_0x1f8747(0x524)][_0x1f8747(0x204)][_0x1f8747(0x495)];return _0x2a07d8[_0x1f8747(0x2c8)](TextManager['mp']);},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x361)]=function(){const _0x4d210d=_0x14015d,_0x96dc70=_0x4d210d(0x259);if(this[_0x4d210d(0x306)][_0x96dc70])return this['_customItemInfo'][_0x96dc70];let _0x3f8044='';if(this[_0x4d210d(0x5a9)]['rateMP']<0x0)_0x3f8044+=_0x4d210d(0x42e)['format'](Math[_0x4d210d(0x31f)](this[_0x4d210d(0x5a9)][_0x4d210d(0x558)]*0x64));if(this[_0x4d210d(0x5a9)]['rateMP']<0x0&&this['_itemData']['flatMP']<0x0)_0x3f8044+='\x20';if(this['_itemData'][_0x4d210d(0x4bc)]<0x0)_0x3f8044+='%1'[_0x4d210d(0x2c8)](this['_itemData']['flatMP']);return _0x3f8044;},Window_ShopStatus[_0x14015d(0x39a)]['drawItemEffectsTpDamage']=function(_0x5781c4,_0x494edd,_0x5e77c5){const _0x406fac=_0x14015d,_0x3afc63=_0x406fac(0x525);if(this['_itemData'][_0x406fac(0x3fb)]>=0x0&&!this[_0x406fac(0x306)][_0x3afc63])return![];const _0x453be5=this[_0x406fac(0x48a)]();this[_0x406fac(0x355)](_0x453be5,_0x5781c4,_0x494edd,_0x5e77c5,!![]);const _0x3a8c99=this['getItemEffectsTpDamageText']();return this[_0x406fac(0x2b3)](ColorManager[_0x406fac(0x2f7)]()),this[_0x406fac(0x355)](_0x3a8c99,_0x5781c4,_0x494edd,_0x5e77c5,![],_0x406fac(0x668)),this['drawItemDarkRect'](_0x5781c4,_0x494edd,_0x5e77c5),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x48a)]=function(){const _0x404a0c=_0x14015d,_0x38f4d4=VisuMZ[_0x404a0c(0x502)][_0x404a0c(0x524)][_0x404a0c(0x204)][_0x404a0c(0x25b)];return _0x38f4d4['format'](TextManager['tp']);},Window_ShopStatus['prototype'][_0x14015d(0x58f)]=function(){const _0x1cae57=_0x14015d,_0x486c82=_0x1cae57(0x525);if(this[_0x1cae57(0x306)][_0x486c82])return this[_0x1cae57(0x306)][_0x486c82];let _0xc99b72='';return _0xc99b72+='%1'[_0x1cae57(0x2c8)](this['_itemData'][_0x1cae57(0x3fb)]),_0xc99b72;},Window_ShopStatus[_0x14015d(0x39a)]['drawItemEffectsAddedStatesBuffs']=function(_0x421574,_0x2d3b8f,_0x2b34c2){const _0x29e712=_0x14015d,_0x2f1754='ADDED\x20EFFECTS';if(!this[_0x29e712(0x5a9)]['addStateBuffChanges']&&!this['_customItemInfo'][_0x2f1754])return![];const _0x3054b9=this[_0x29e712(0x4bd)]();this[_0x29e712(0x355)](_0x3054b9,_0x421574,_0x2d3b8f,_0x2b34c2,!![]);const _0x161ddd=this['getItemEffectsAddedStatesBuffsText']();return this[_0x29e712(0x355)](_0x161ddd,_0x421574,_0x2d3b8f,_0x2b34c2,![],_0x29e712(0x668)),this['drawItemDarkRect'](_0x421574,_0x2d3b8f,_0x2b34c2),this[_0x29e712(0x647)](),!![];},Window_ShopStatus['prototype'][_0x14015d(0x4bd)]=function(){const _0x4df692=_0x14015d;return VisuMZ[_0x4df692(0x502)][_0x4df692(0x524)][_0x4df692(0x204)]['LabelApply'];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x264)]=function(){const _0x3cfdf8=_0x14015d,_0x423416='ADDED\x20EFFECTS';if(this[_0x3cfdf8(0x306)][_0x423416])return this[_0x3cfdf8(0x306)][_0x423416];let _0x324ed0='',_0xb2fdd2=0x0;const _0x26398e=0x8;for(const _0x6bd154 of this['_itemData'][_0x3cfdf8(0x41b)]){const _0x2d592a=$dataStates[_0x6bd154];if(_0x2d592a&&_0x2d592a['iconIndex']>0x0){_0x324ed0+='\x5cI[%1]'[_0x3cfdf8(0x2c8)](_0x2d592a[_0x3cfdf8(0x612)]),_0xb2fdd2++;if(_0xb2fdd2>=_0x26398e)return _0x324ed0;}}for(let _0x4e69bd=0x0;_0x4e69bd<this['_itemData'][_0x3cfdf8(0x539)][_0x3cfdf8(0x536)];_0x4e69bd++){if(_0x3cfdf8(0x4b3)==='qtNEX'){const _0x4cc1cc=this[_0x3cfdf8(0x5a9)][_0x3cfdf8(0x539)][_0x4e69bd],_0x4b132d=Game_BattlerBase[_0x3cfdf8(0x39a)]['buffIconIndex'](_0x4cc1cc,_0x4e69bd);if(_0x4b132d>0x0){if(_0x3cfdf8(0x366)!==_0x3cfdf8(0x600)){_0x324ed0+=_0x3cfdf8(0x3f9)['format'](_0x4b132d),_0xb2fdd2++;if(_0xb2fdd2>=_0x26398e)return _0x324ed0;}else return this['nonOptimizeEtypes']()[_0x3cfdf8(0x415)](this[_0x3cfdf8(0x30c)]()[_0x1175da])?![]:this[_0x3cfdf8(0x47f)](_0x3f3977);}}else return _0x49880c;}return _0x324ed0;},Window_ShopStatus[_0x14015d(0x39a)]['drawItemEffectsRemovedStatesBuffs']=function(_0x5ec4ce,_0x52ea51,_0x1d2c37){const _0x3d504b=_0x14015d,_0x1b2850='REMOVED\x20EFFECTS';if(!this[_0x3d504b(0x5a9)][_0x3d504b(0x41e)]&&!this[_0x3d504b(0x306)][_0x1b2850])return![];const _0x4f6202=this[_0x3d504b(0x660)]();this[_0x3d504b(0x355)](_0x4f6202,_0x5ec4ce,_0x52ea51,_0x1d2c37,!![]);const _0xcb8d27=this[_0x3d504b(0x578)]();return this[_0x3d504b(0x355)](_0xcb8d27,_0x5ec4ce,_0x52ea51,_0x1d2c37,![],'right'),this['drawItemDarkRect'](_0x5ec4ce,_0x52ea51,_0x1d2c37),this[_0x3d504b(0x647)](),!![];},Window_ShopStatus['prototype'][_0x14015d(0x660)]=function(){const _0x5425f9=_0x14015d;return VisuMZ['ItemsEquipsCore']['Settings'][_0x5425f9(0x204)]['LabelRemove'];},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x578)]=function(){const _0x10f7bb=_0x14015d,_0x1ecb2b=_0x10f7bb(0x2b0);if(this['_customItemInfo'][_0x1ecb2b])return this[_0x10f7bb(0x306)][_0x1ecb2b];let _0x4bf669='',_0x158f86=0x0;const _0x472565=VisuMZ[_0x10f7bb(0x502)]['Settings'][_0x10f7bb(0x204)][_0x10f7bb(0x53c)];for(const _0x3e0b4f of this[_0x10f7bb(0x5a9)][_0x10f7bb(0x35e)]){const _0x34c00c=$dataStates[_0x3e0b4f];if(_0x34c00c&&_0x34c00c['iconIndex']>0x0){if('oWwna'!==_0x10f7bb(0x599)){const _0x204d84=this[_0x10f7bb(0x61d)]['y']+this[_0x10f7bb(0x61d)][_0x10f7bb(0x206)],_0x478298=_0x2ea896[_0x10f7bb(0x5c1)]-this[_0x10f7bb(0x25d)](),_0x18e00b=this[_0x10f7bb(0x446)]()?_0x3ee398['boxWidth']-_0x478298:0x0,_0x48d857=this['mainAreaHeight']()-this['_commandWindow'][_0x10f7bb(0x206)];return new _0x29cb0a(_0x18e00b,_0x204d84,_0x478298,_0x48d857);}else{_0x4bf669+=_0x10f7bb(0x3f9)['format'](_0x34c00c[_0x10f7bb(0x612)]),_0x158f86++;if(_0x158f86>=_0x472565)return _0x4bf669;}}}for(let _0x39e4a3=0x0;_0x39e4a3<this[_0x10f7bb(0x5a9)][_0x10f7bb(0x5be)][_0x10f7bb(0x536)];_0x39e4a3++){const _0x233889=Game_BattlerBase[_0x10f7bb(0x39a)][_0x10f7bb(0x518)](0x1,_0x39e4a3);if(_0x233889>0x0){_0x4bf669+='\x5cI[%1]'['format'](_0x233889),_0x158f86++;if(_0x158f86>=_0x472565)return _0x4bf669;}}for(let _0x1ae9f3=0x0;_0x1ae9f3<this['_itemData'][_0x10f7bb(0x2ab)][_0x10f7bb(0x536)];_0x1ae9f3++){const _0x27d305=Game_BattlerBase[_0x10f7bb(0x39a)][_0x10f7bb(0x518)](-0x1,_0x1ae9f3);if(_0x27d305>0x0){if(_0x10f7bb(0x4de)!==_0x10f7bb(0x4de)){const _0x1ee692=this['_commandNameWindow'],_0x31604f=_0x3d4bfe[_0x10f7bb(0x35b)](),_0x1cc3c7=_0x34de2e['x']+_0x4e15e5[_0x10f7bb(0x31f)](_0x2e0b74[_0x10f7bb(0x5ed)]/0x2)+_0x31604f;_0x1ee692['x']=_0x1ee692[_0x10f7bb(0x5ed)]/-0x2+_0x1cc3c7,_0x1ee692['y']=_0x2530a7['floor'](_0x387f1f[_0x10f7bb(0x206)]/0x2);}else{_0x4bf669+='\x5cI[%1]'['format'](_0x27d305),_0x158f86++;if(_0x158f86>=_0x472565)return _0x4bf669;}}}return _0x4bf669;},Window_ShopStatus['prototype'][_0x14015d(0x26d)]=function(_0x4f9696,_0x5663c2,_0x15935d){const _0x41e6db=_0x14015d;if(this[_0x41e6db(0x4b0)][_0x41e6db(0x4f1)][_0x41e6db(0x497)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x5c5f92=String(RegExp['$1'])[_0x41e6db(0x351)](/[\r\n]+/);for(const _0x15653a of _0x5c5f92){if(_0x15653a[_0x41e6db(0x497)](/(.*):[ ](.*)/i)){if(_0x41e6db(0x3ca)===_0x41e6db(0x335)){const _0x100357=this[_0x41e6db(0x2fe)],_0xe071ec=_0x5a49bd['windowPadding'](),_0x12905f=_0x415e4a['x']+_0x3dcba3[_0x41e6db(0x31f)](_0x3743ac[_0x41e6db(0x5ed)]/0x2)+_0xe071ec;_0x100357['x']=_0x100357[_0x41e6db(0x5ed)]/-0x2+_0x12905f,_0x100357['y']=_0x5a01c5[_0x41e6db(0x31f)](_0x28504e[_0x41e6db(0x206)]/0x2);}else{const _0x2335f4=String(RegExp['$1'])['trim'](),_0xc7fb22=String(RegExp['$2'])['trim']();this[_0x41e6db(0x51e)](_0x2335f4,_0xc7fb22,_0x4f9696,_0x5663c2,_0x15935d),_0x5663c2+=this[_0x41e6db(0x4ee)]();}}}}return this['resetFontSettings'](),_0x5663c2;},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x51e)]=function(_0x499adb,_0x489feb,_0x1560b9,_0x59f419,_0x532171){const _0x1cc1e7=_0x14015d;this[_0x1cc1e7(0x355)](_0x499adb,_0x1560b9,_0x59f419,_0x532171,!![]),this[_0x1cc1e7(0x355)](_0x489feb,_0x1560b9,_0x59f419,_0x532171,![],_0x1cc1e7(0x668)),this['drawItemDarkRect'](_0x1560b9,_0x59f419,_0x532171),this[_0x1cc1e7(0x647)]();},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x559)]=function(){const _0x1f6af3=_0x14015d;if(!this[_0x1f6af3(0x4b0)])return;const _0x341db6=this[_0x1f6af3(0x4b0)]['note'],_0x48ceff=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x144988=_0x341db6['match'](_0x48ceff);if(_0x144988)for(const _0x52ce58 of _0x144988){_0x52ce58['match'](_0x48ceff);const _0x250029=String(RegExp['$1'])[_0x1f6af3(0x4e3)]()||'';if(_0x250029==='')continue;const _0x3b0d36=ImageManager[_0x1f6af3(0x269)](_0x250029);_0x3b0d36[_0x1f6af3(0x47a)](this[_0x1f6af3(0x584)][_0x1f6af3(0x3e7)](this,_0x3b0d36,this[_0x1f6af3(0x4b0)]));}},Window_ShopStatus[_0x14015d(0x39a)][_0x14015d(0x584)]=function(_0x9fbf6d,_0x1ecd83){const _0x1325e3=_0x14015d;if(this[_0x1325e3(0x4b0)]!==_0x1ecd83)return;if(!_0x9fbf6d)return;if(_0x9fbf6d[_0x1325e3(0x5ed)]<=0x0||_0x9fbf6d['height']<=0x0)return;const _0x3e8d88=_0x1ecd83['note'];let _0x184147=_0x1325e3(0x1f5);if(_0x3e8d88['match'](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)){if('dNRNz'!==_0x1325e3(0x219))_0x184147=_0x1325e3(0x3d7);else for(const _0x2e8edf of _0x4a7699['_data']){if(_0x2e8edf)_0x2e8edf[_0x1325e3(0x4d4)]();}}const _0x57593b=_0x184147==='background'?this['contentsBack']:this[_0x1325e3(0x45c)];let _0xca9d97=this[_0x1325e3(0x447)],_0x34cbe6=this[_0x1325e3(0x553)];_0x3e8d88[_0x1325e3(0x497)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0xca9d97=Number(RegExp['$1']));_0x3e8d88[_0x1325e3(0x497)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x34cbe6=Number(RegExp['$1']));_0x3e8d88['match'](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0xca9d97=Number(RegExp['$1']),_0x34cbe6=Number(RegExp['$2']));const _0x2debc2=Math[_0x1325e3(0x5f7)](0x1,_0xca9d97/_0x9fbf6d['width'],_0x34cbe6/_0x9fbf6d[_0x1325e3(0x206)]);let _0x241f05=0x0,_0x49239e=0x0,_0x279668=Math['floor'](_0x9fbf6d[_0x1325e3(0x5ed)]*_0x2debc2),_0x53034b=Math[_0x1325e3(0x31f)](_0x9fbf6d[_0x1325e3(0x206)]*_0x2debc2),_0x316190='center';_0x3e8d88['match'](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x316190=String(RegExp['$1'])['toLowerCase']()['trim']());if(_0x316190===_0x1325e3(0x21e))'RASsv'!==_0x1325e3(0x29b)?_0x2b012f=this['innerHeight']-_0x229202:_0x241f05=0x0;else _0x316190===_0x1325e3(0x46c)?'HYDst'===_0x1325e3(0x435)?_0x241f05=Math['round']((this[_0x1325e3(0x447)]-_0x279668)/0x2):(_0x1bf138[_0x1325e3(0x502)]['Scene_Item_create'][_0x1325e3(0x207)](this),this[_0x1325e3(0x2a7)]()&&this[_0x1325e3(0x62d)]()):_0x241f05=this['innerWidth']-_0x279668;let _0x4d245d=_0x1325e3(0x24c);_0x3e8d88[_0x1325e3(0x497)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x4d245d=String(RegExp['$1'])[_0x1325e3(0x3bb)]()[_0x1325e3(0x4e3)]());if(_0x4d245d===_0x1325e3(0x63a))_0x49239e=0x0;else{if(_0x4d245d===_0x1325e3(0x24c)){if(_0x1325e3(0x5c8)===_0x1325e3(0x5c8))_0x49239e=Math[_0x1325e3(0x5a8)]((this[_0x1325e3(0x553)]-_0x53034b)/0x2);else{const _0x1a6fc4=_0x45ffaf?_0x2a40c1(_0xbad7a3['$1']):_0x156059[_0x1325e3(0x542)](_0x1e904d);return _0x313a98[_0x1a6fc4]||_0x2ea8b8;}}else{if('istHQ'==='UrIHu'){const _0x57b8cb=_0x2db8c4[_0x1325e3(0x39a)][_0x1325e3(0x518)](0x1,_0x5363aa);if(_0x57b8cb>0x0){_0x1c588b+=_0x1325e3(0x3f9)[_0x1325e3(0x2c8)](_0x57b8cb),_0xfc1f98++;if(_0x39e425>=_0xa25765)return _0x3663b0;}}else _0x49239e=this['innerHeight']-_0x53034b;}}_0x3e8d88[_0x1325e3(0x497)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x241f05+=Number(RegExp['$1']));_0x3e8d88[_0x1325e3(0x497)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x1325e3(0x419)===_0x1325e3(0x256)?_0xc89677=_0x1429dc['weapon']:_0x49239e+=Number(RegExp['$1']));_0x3e8d88[_0x1325e3(0x497)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&(_0x241f05+=Number(RegExp['$1']),_0x49239e+=Number(RegExp['$2']));let _0x4e3806=0xff;if(_0x3e8d88[_0x1325e3(0x497)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0x4e3806=Number(RegExp['$1']);else{if(_0x3e8d88[_0x1325e3(0x497)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)){if(_0x1325e3(0x594)===_0x1325e3(0x4fa))return _0xaa5d84[_0x1325e3(0x502)][_0x1325e3(0x524)][_0x1325e3(0x204)]['LabelRemove'];else _0x4e3806=Math[_0x1325e3(0x5a8)](Number(RegExp['$1'])*0.01*0xff)[_0x1325e3(0x4f6)](0x0,0xff);}}_0x57593b[_0x1325e3(0x5b9)]=_0x4e3806,_0x57593b[_0x1325e3(0x378)](_0x9fbf6d,0x0,0x0,_0x9fbf6d[_0x1325e3(0x5ed)],_0x9fbf6d['height'],_0x241f05,_0x49239e,_0x279668,_0x53034b),_0x57593b[_0x1325e3(0x5b9)]=0xff;};