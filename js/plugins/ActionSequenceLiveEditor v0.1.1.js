//=============================================================================
 /*:
 * @target MZ
 * @plugindesc Edit Action Sequences during playtime !  - ASLE v0.1
 * @author ManuGamingCreations
 * @url https://manugamingcreations.itch.io
 *
 * @help
 * Adds a button on screen to allow you the edition of Action Sequence 
 * during playtime.
*/

document.extraDiv = document.createElement('div');
document.ActionSequenceReloaderButton = document.createElement('button');


document.ActionSequenceReloaderButton.style.position = 'absolute';
document.ActionSequenceReloaderButton.style.zIndex = 999;
document.ActionSequenceReloaderButton.innerText = 'Reload Action Sequences';
document.extraDiv.appendChild(document.ActionSequenceReloaderButton);


document.body.appendChild(document.extraDiv);


document.body.style.overflow = 'hidden';

document.extraDiv.style.left = 0 + 'px' ;
document.extraDiv.style.top = 0 + 'px' ;
document.ActionSequenceReloaderButton.onclick = function(e){
    DataManager.loadDataFile('$dataCommonEvents', 'CommonEvents.json');
}