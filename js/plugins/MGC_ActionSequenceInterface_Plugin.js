//=============================================================================
 /*:
 * @target MZ
 * @plugindesc Action Sequence Node Editor  - ASNE v1.1.3
 * @author ManuGamingCreations
 * @url https://manugamingcreations.itch.io
 *
 * @help
 * Adds a button on screen to allow you the edition of Action Sequence 
 * during playtime through a Node Editor.
 * 
 * @param buttonYPosSelect
 * @text Button Vertical Position
 * @type select
 * @option Top
 * @value 0
 * @option Middle
 * @value 50
 * @option Bottom
 * @value 90
 * @desc Change 'Open Interface' button vertical position
 * @default 0
 * 
 * @param buttonScale
 * @text Button Scale
 * @desc Scale?
 * @default 1
 * @type number
 * 
 * == UPDATES ==
 * 
 * V1.0.1
 * Added 5 new commands:
 * -ZOOM: Scale
 * -Face Direction
 * -Move Distance
 * -Color Break ( requires Impact plugin from Visustella )
 * -Opacity
 * 
 * V1.0.2
 * Added 5 new commands:
 * -MOTION TRAIL: Create
 * -MOTION TRAIL: Remove
 * -CAMERA FOCUS Target 
 * -CAMERA FOCUS Point 
 * -SHOCKWAVE 
 * 
 * V1.0.2b
 * Added 1 new command:
 * -MOTION: Freeze Motion Frame
 * 
 * V1.1
 * Brand new interface
 * 
 * V1.1.2
 * Plugin Parameters:
 * -Change the button vertical position
 * -Change the button scale
 * 
 * More commands:
 * -Flash Screen (native RPG Maker)
 * -Scale (Visustella)
 * -Skew (Visustella)
 * 
 * V1.1.3
 * -Bug fix: The sequence didn't update when clicking on "Import Sequence"
 * 
 * [NEXT]V1.1.4
 * 6 more commands:
 * -Freeze Time
 * -Time Scale
 * -Anime Impact Effect
 * -Still Blur Effect
 * -Local Shockwave Effect
 * -Reverse Shockwave Effect
*/

document.OpenInterfaceButtonStyle = document.createElement("link");
document.OpenInterfaceButtonStyle.setAttribute("rel", "stylesheet");
document.OpenInterfaceButtonStyle.setAttribute("type", "text/css");
document.OpenInterfaceButtonStyle.setAttribute("href", "./InterfaceJs/openInterfaceButtonStyle.css");
document.head.appendChild(document.OpenInterfaceButtonStyle);

document.extraDiv = document.createElement('div');

document.ActionSequenceInterfaceButton = document.createElement('button');

document.ActionSequenceInterfaceButton.classList.add("openInterfaceButton");

// Plugin parameters
let buttonYPos = PluginManager.parameters('MGC_ActionSequenceInterface_Plugin')['buttonYPosSelect'];
document.ActionSequenceInterfaceButton.style.top = buttonYPos + "%";
let buttonScale = PluginManager.parameters('MGC_ActionSequenceInterface_Plugin')['buttonScale'];
document.ActionSequenceInterfaceButton.style.transform = "scale(" + buttonScale + ")";

document.ActionSequenceInterfaceButton.innerText = 'Open Action Sequence Interface';
document.extraDiv.appendChild(document.ActionSequenceInterfaceButton);


document.body.appendChild(document.extraDiv);


document.body.style.overflow = 'hidden';

document.extraDiv.style.left = 0 + 'px' ;
document.extraDiv.style.top = 0 + 'px' ;
document.ActionSequenceInterfaceButton.onclick = function(e){
    let interfaceWindow = window.open('ActionSequenceInterface.html');
    interfaceWindow.dataCommonEvents = $dataCommonEvents;
}

// REQUIRED CORE CHANGES

// == Required for Flash Command ==
Game_Screen.prototype.startFlash = function(color, duration) {
    this._flashColor = JSON.parse(JSON.stringify(color));
    this._flashDuration = duration;
};

// == Required for Tint Screen Command ==
// Will enable later not needed now

/*Game_Screen.prototype.startTint = function(tone, duration) {
    this._toneTarget = tone.clone();
    this._toneDuration = duration;
    if (this._toneDuration === 0) {
        this._tone = this._toneTarget.clone();
    }
};*/

