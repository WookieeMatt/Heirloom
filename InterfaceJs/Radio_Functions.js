function GetRadioValue(radioName){
    let ret = null;
    var radios = document.getElementsByName(radioName);
    for(const radioButton of radios){
      if(radioButton.checked)
        ret = radioButton.value;
        break;
    }
    return ret;
  }

  function SetRadioValue(radioName,radioValue){
    var radios = document.getElementsByName(radioName);
    for(const radioButton of radios){
      if(radioButton.value == radioValue){
        radioButton.checked = true;
        break;
      }
    }
    return;
  }