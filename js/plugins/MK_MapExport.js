/*:
 * @target MZ
 * @plugindesc (auto-disables itself when not in Testplay)
 * @author Aerosys
 * 
 * @help When pressing the Action Key, the current Map is exported as json file and
 * attached to the game project. Mind closing and re-opening RPG Maker.
 * 
 * This plugin works in Testplay only.
 * 
 * This plugin is a free bonus and can be used without any rules in both, free
 * and commercial projects. You can modify it to your own needs.
 *
 * @param key
 * @text Action Key
 * @type select
 * @option pageup
 * @option pagedown
 * @option ctrl
 * @default pageup
 */

var mapExportActionKey = PluginManager.parameters('MK_MapExport').key;

const alias = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    alias.call(this);

    if ($gameTemp.isPlaytest() && Input.isTriggered(mapExportActionKey)) {
        const fs = require('fs');
      
        let nextMapId;
        for (nextMapId = 1; $dataMapInfos[nextMapId]; nextMapId++) { }
        const paddedMapId = String(nextMapId).padStart(3, '0');
        const fileId = `data/Map${paddedMapId}.json`;
        
        // create a new file to export current map
        fs.writeFile(
            fileId,
            JSON.stringify($dataMap),
            error => { if (error) throw error }
        );
        
        // insert map into MapInfos
        $dataMapInfos[nextMapId] = {
            id: nextMapId,
            expanded: false,
            name: "Exported_" + nextMapId,
            order: $dataMapInfos.length,
            parentId: 0,
            scrollX: 100,
            scrollY: 100
        };
        fs.writeFile(
            'data/MapInfos.json',
            JSON.stringify($dataMapInfos),
            error => { if (error) throw error }
        );
        
        // alert
        alert("Map exported");
    }
}