document.onmousemoveActions = [];
function OnMouseMove_Action_Add(action){
  if( document.onmousemoveActions.filter( elmt => elmt === action ).length == 0 )
    document.onmousemoveActions.push(action);
}
function OnMouseMove_Action_Remove(action){
  document.onmousemoveActions = document.onmousemoveActions.filter( elmt => elmt !== action );
}

document.currentAction = "";
document.currentConnectionAttempter = null;
function GetCurrentConnectionAttempter(){
  return document.currentConnectionAttempter;
}
function GetCurrentConnectionAttempterBlock(){
  return document.currentConnectionAttempter.sequenceBlockRef;
}
function SetCurrentConnectionAttempter(element){
  document.currentConnectionAttempter = element;
  return document.currentConnectionAttempter;
}
function RemoveCurrentConnectionAttempter(){
  document.currentConnectionAttempter = null;
  return document.currentConnectionAttempter;
}
function IsElementCurrentlyAttemptingToConnect(){
  let ret = false;
  if(document.currentConnectionAttempter){
    ret = true;
  }
  return ret;
}