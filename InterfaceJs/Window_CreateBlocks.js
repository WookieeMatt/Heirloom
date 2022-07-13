
let Blocks = [];
let CurrentBlockId = 10;


function CreateBlock(name = "MoveToTarget") {
  let newBlock = new SequenceBlock(CurrentBlockId);
  CurrentBlockId++;
  switch(name) {
    // SETTINGS
    case 'AcsetSetup': newBlock.SetAs_ACSET_SetupAction_Block(); break;
    case 'AcsetFinish': newBlock.SetAs_ACSET_FinishAction_Block(); break;

    // MOVEMENT
    case 'MoveToTarget': newBlock.SetAsMoveToTargetBlock(); break;
    case 'MoveToPoint': newBlock.SetAs_MOVE_MoveToPoint_Block(); break;
    case 'MoveDistance': newBlock.SetAs_MOVE_MoveDistance(); break;
    case 'Jump': newBlock.SetAsJumpBlock(); break;
    case 'SpinRotate': newBlock.SetAs_MOVE_SpinRotate(); break;
    case 'Float': newBlock.SetAsMoveFloatBlock(); break;
    
    // ANIMATION
    case 'ShowAnimation': newBlock.SetAsShowAnimationBlock(); break;
    case 'ActionAnimation': newBlock.SetAsAnimActionAnimationBlock(); break;
    case 'ProjectileAnimation': newBlock.SetAsProjectileAnimationBlock(); break;
    case 'ProjectileIcon': newBlock.SetAsProjectileIconBlock(); break;
    case 'ProjectilePicture': newBlock.SetAsProjectilePictureBlock(); break;
    
    // MECH
    case 'ActionEffect': newBlock.SetAsMechActionEffectBlock(); break;
    case 'OnceParallel': newBlock.SetAsOnceParallelBlock(); break;

    // SCREEN EFFECTS
    case 'ShakeScreen': newBlock.SetAsShakeScreenBlock(); break;
    case 'FlashScreen': newBlock.SetAsFlashScreenBlock(); break;
    case 'Zoom': newBlock.SetAs_ZOOM_Scale(); break;
    case 'CameraFocusTarget': newBlock.SetAs_CAMERA_FocusTarget(); break;
    case 'CameraFocusPoint': newBlock.SetAs_CAMERA_FocusPoint(); break;
    case 'ColorBreak': newBlock.SetAs_IMPACT_ColorBreak(); break;
    case 'ShockwaveEachTarget': newBlock.SetAs_IMPACT_Shockwave_EachTarget(); break;

    // CHARACTER
    case 'DBAnimation': newBlock.SetAsDBAnimationBlock(); break;
    case 'MotionType': newBlock.SetAs_MOTION_MotionType_Block(); break;
    case 'FaceDirection': newBlock.SetAs_MOVE_FACEDIRECTION(); break;
    case 'Opacity': newBlock.SetAs_MOVE_Opacity(); break;
    case 'Scale': newBlock.SetAsScaleBlock(); break;
    case 'Skew': newBlock.SetAsSkewBlock(); break;
    case 'MotionTrailCreate': newBlock.SetAs_MOTIONTRAIL_Create(); break;
    case 'MotionTrailRemove': newBlock.SetAs_MOTIONTRAIL_Remove(); break;
    case 'FreezeFrame': newBlock.SetAs_MOTION_FreezeMotionFrame_Block(); break;

    // OTHER
    case 'Wait': newBlock.SetAsWaitBlock(); break;
    case 'CommonEvent': newBlock.SetAs_CommonEvent_Block(); break;

    default: return;
  }
  Blocks.push(newBlock);
}



CommonEventsCommandsWindow = document.createElement('div');



// == NEW INTERFACE
CommonEventsCommandsWindow.classList.add('managementDiv');
document.getElementById("Management").appendChild(CommonEventsCommandsWindow);

CommonEventsCommandsWindow_SelectCommonEventID = document.createElement('select');
CommonEventsCommandsWindow_SelectCommonEventID.classList.add("selectCommonEvent");
CommonEventsCommandsWindow_SelectCommonEventID.classList.add("growAnimation");
if(typeof(dataCommonEvents) !== "undefined") {
  for(let i = 1; i<dataCommonEvents.length; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i + "_" + dataCommonEvents[i].name;
    CommonEventsCommandsWindow_SelectCommonEventID.appendChild(option);
  }
} else {
  for(let i = 1; i<=6; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = "CE_" + i;
    CommonEventsCommandsWindow_SelectCommonEventID.appendChild(option);
  }
}
// Common Events Drop List - OnClick => Stop Animation + Remove Focus background div
CommonEventsCommandsWindow_SelectCommonEventID.onclick = function() {
  CommonEventsCommandsWindow_SelectCommonEventID.classList.remove("growAnimation");
  document.getElementById("focusSelectCommonEvent").classList.add("focusDisappear");
}

CommonEventsCommandsWindow_InputCommonEventID = document.createElement('input');
CommonEventsCommandsWindow_InputCommonEventID.style.width = '50px';
CommonEventsCommandsWindow_InputCommonEventID.placeholder = "ID?";
//CommonEventsCommandsWindow_InputCommonEventID.style.position = 'absolute';




CommonEventsCommandsWindow_ImportSequenceButton = document.createElement('button');
CommonEventsCommandsWindow_ImportSequenceButton.classList.add("defaultFont");
CommonEventsCommandsWindow_ImportSequenceButton.classList.add("importButton");
CommonEventsCommandsWindow_ImportSequenceButton.innerText = 'Import Sequence in game';
CommonEventsCommandsWindow_ImportSequenceButton.onclick = function(){
  ImportSequence();
}
//CommonEventsCommandsWindow_ImportSequenceButton.style.position = 'absolute';
CommonEventsCommandsWindow_SaveCommonEventsFile = document.createElement('button');
CommonEventsCommandsWindow_SaveCommonEventsFile.classList.add("defaultFont");
CommonEventsCommandsWindow_SaveCommonEventsFile.classList.add("saveCommonEventsButton");
CommonEventsCommandsWindow_SaveCommonEventsFile.innerText = 'Save to Common Events.json';
CommonEventsCommandsWindow_SaveCommonEventsFile.onclick = function(){
  SaveCommonEventsFile();
}// END ONCLICK SAVE COMMON EVENTS

function ImportSequence() {
  console.log('onclick Import Sequence');
  let getInputValue = CommonEventsCommandsWindow_SelectCommonEventID.value;
  if(getInputValue){
    if( parseInt(getInputValue) ){
      console.log('SUCCESS');
      dataCommonEvents[getInputValue].list = GetSequence();
    }
  }
}

function SaveCommonEventsFile() {
  const fs = require('fs');
  if(confirm('Save data in your project? ( It will close the game and this window )')){
      fs.writeFile("data/CommonEvents.json",JSON.stringify(dataCommonEvents),{
          encoding: "utf8",
          flag: "w",
          mode: 0o666
          },(err) => {
              if (err){
                  console.log(err);
              }else{
                  console.log("File written successfully\n");
                  console.log("The written has the following contents:");
                  console.log(fs.readFileSync("movies.txt", "utf8"));
          }
    });// END FS WRITEFILE
  }// END OF CONFIRM
}

//CommonEventsCommandsWindow_SaveCommonEventsFile.style.position = 'absolute';

CommonEventsCommandsWindow.appendChild(CommonEventsCommandsWindow_SelectCommonEventID);
CommonEventsCommandsWindow.appendChild(CommonEventsCommandsWindow_ImportSequenceButton);
CommonEventsCommandsWindow.appendChild(CommonEventsCommandsWindow_SaveCommonEventsFile);