var CommandOptionsDivArray = document.getElementsByName("OptionDiv");                   
var CommandOptionsIds = [];
for ( var commandOption of CommandOptionsDivArray){
  CommandOptionsIds.push(commandOption.id);
}
var EditedSequenceBlock = null;
function CommandOptionsWindow_HideAll(){
  for (const id of CommandOptionsIds){
    document.getElementById(id).style.display = "none";
  }
}
function CommandOptionsWindow_StartEdit(sequenceBlockObject){
  EditedSequenceBlock = sequenceBlockObject;
}

CommandOptionsWindow_HideAll();
    

    // Targets(Principal)
    document.getElementById("Command_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("Command_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("Command_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets1:arraystr'] = document.getElementById("Command_TargetSelect_InputText").innerText;
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("Command_TargetSelect_InputText").innerText;
      }
      this.value="null";
    }
    document.getElementById("Command_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets2:arraystr'] = this.innerText;
      }
    }

    // Targets(Destination)
    document.getElementById("Command_TargetSelectDestination_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("Command_TargetSelectDestination_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("Command_TargetSelectDestination_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets2:arraystr'] = document.getElementById("Command_TargetSelectDestination_InputText").innerText;
      }
      this.value="null";
    }
    document.getElementById("Command_TargetSelectDestination_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets2:arraystr'] = this.innerText;
      }
    }

    // Target Location
    document.getElementById("Command_TargetLocation_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['TargetLocation:str'] = this.value;
      }
    }

    // Melee Distance
    document.getElementById("Command_TargetLocation_MeleeDistance").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['MeleeDistance:eval'] = this.value;
      }
    }

    // Offset Adjustment
    document.getElementById("Command_OffsetAdjustment_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['OffsetAdjust:str'] = this.value;
      }
    }
    // Offset: X
    document.getElementById("Command_OffsetAdjustment_OffsetX").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['OffsetX:eval'] = this.value;
      }
    }
    // Offset: Y
    document.getElementById("Command_OffsetAdjustment_OffsetY").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['OffsetY:eval'] = this.value;
      }
    }

    // Duration ( input )
    document.getElementById("Command_Duration").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Duration:eval'] = this.value;
      }
    }

    // Face Destination ( radio )
    var RadioButtons_facedestination = document.getElementsByName('facedestination');
    for(const radioButton of RadioButtons_facedestination){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['FaceDirection:eval'] = radioButton.value;
        }
      }
    }

    // Movement Easing ( select )
    document.getElementById("Command_MovementEasing_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['EasingType:str'] = this.value;
      }
    }

    // Movement Motion ( select )
    document.getElementById("Command_MovementMotion_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['MotionType:str'] = this.value;
      }
    }

    // Wait For Movement ( radio )
    var RadioButtons_waitformovement = document.getElementsByName('waitformovement');
    for(const radioButton of RadioButtons_waitformovement){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForMovement:eval'] = radioButton.value;
        }
      }
    }

    // Jump Height ( input )
    document.getElementById("Command_JumpHeight").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Height:eval'] = this.value;
      }
    }

    // Wait For Jump ( radio )
    var RadioButtons_waitforjump = document.getElementsByName('waitforjump');
    for(const radioButton of RadioButtons_waitforjump){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForJump:eval'] = radioButton.value;
        }
      }
    }

    // AnimationID ( input )
    document.getElementById("Command_AnimationID").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['AnimationID:num'] = this.value;
      }
    }

    // Mirror Animation ( radio )
    var RadioButtons_mirroranimation = document.getElementsByName('mirroranimation');
    for(const radioButton of RadioButtons_mirroranimation){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['Mirror:eval'] = radioButton.value;
        }
      }
    }

    // Wait For Animation ( radio )
    var RadioButtons_waitforanimation = document.getElementsByName('waitforanimation');
    for(const radioButton of RadioButtons_waitforanimation){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForAnimation:eval'] = radioButton.value;
        }
      }
    }

    // ==================PROJECTILES==================
    // Start Location

    // Start Location Type ( select )
    var RadioButtons_Projectile_Start_Type = document.getElementsByName('projectile_start_type');
    for(const radioButton of RadioButtons_Projectile_Start_Type){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          let StartStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Start:struct']);

          StartStruct['Type:str'] = radioButton.value;

          EditedSequenceBlock.commandList[0].parameters[3]['Start:struct'] = JSON.stringify(StartStruct);
        }
      }
    }

    // Start Location Targets
    document.getElementById("Command_Projectile_Start_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("Command_Projectile_Start_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("Command_Projectile_Start_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        let StartStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Start:struct']);
        StartStruct['Targets:arraystr'] = document.getElementById("Command_Projectile_Start_TargetSelect_InputText").innerText;
        EditedSequenceBlock.commandList[0].parameters[3]['Start:struct'] = JSON.stringify(StartStruct);
      }
      this.value="null";
    }
    document.getElementById("Command_Projectile_Start_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        let StartStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Start:struct']);
        StartStruct['Targets:arraystr'] = this.innerText;
        EditedSequenceBlock.commandList[0].parameters[3]['Start:struct'] = JSON.stringify(StartStruct);
      }
    }

    // Start Location Centralize ( Radio )
    var RadioButtons_Projectile_Start_Centralize = document.getElementsByName('projectile_start_centralize');
    for(const radioButton of RadioButtons_Projectile_Start_Centralize){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          let StartStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Start:struct']);
          StartStruct['TargetCenter:eval'] = radioButton.value;
          EditedSequenceBlock.commandList[0].parameters[3]['Start:struct'] = JSON.stringify(StartStruct);
        }
      }
    }

    // Start Location - Target Location
    document.getElementById("Command_Projectile_Start_TargetLocation_Select").onchange = function(){
      if(EditedSequenceBlock){
        let StartStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Start:struct']);
        StartStruct['TargetLocation:str'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Start:struct'] = JSON.stringify(StartStruct);
      }
    }

    // Start Location - Point X
    document.getElementById("Command_Projectile_Start_PointX").onkeyup = function(){
      if(EditedSequenceBlock){
        let StartStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Start:struct']);
        StartStruct['PointX:eval'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Start:struct'] = JSON.stringify(StartStruct);
      }
    }

    // Start Location - Point Y
    document.getElementById("Command_Projectile_Start_PointY").onkeyup = function(){
      if(EditedSequenceBlock){
        let StartStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Start:struct']);
        StartStruct['PointY:eval'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Start:struct'] = JSON.stringify(StartStruct);
      }
    }

    // Start Location - Offset X
    document.getElementById("Command_Projectile_Start_OffsetX").onkeyup = function(){
      if(EditedSequenceBlock){
        let StartStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Start:struct']);
        StartStruct['OffsetX:eval'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Start:struct'] = JSON.stringify(StartStruct);
      }
    }

    // Start Location - Offset Y
    document.getElementById("Command_Projectile_Start_OffsetY").onkeyup = function(){
      if(EditedSequenceBlock){
        let StartStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Start:struct']);
        StartStruct['OffsetY:eval'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Start:struct'] = JSON.stringify(StartStruct);
      }
    }

     // Goal Location

     // Goal Location Type ( select )
    var RadioButtons_Projectile_End_Type = document.getElementsByName('projectile_end_type');
    for(const radioButton of RadioButtons_Projectile_End_Type){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          let GoalStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct']);

          GoalStruct['Type:str'] = radioButton.value;

          EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct'] = JSON.stringify(GoalStruct);
        }
      }
    }

    // Goal Location Targets
    document.getElementById("Command_Projectile_End_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("Command_Projectile_End_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("Command_Projectile_End_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        let GoalStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct']);
        GoalStruct['Targets:arraystr'] = document.getElementById("Command_Projectile_End_TargetSelect_InputText").innerText;
        EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct'] = JSON.stringify(GoalStruct);
      }
      this.value="null";
    }
    document.getElementById("Command_Projectile_End_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        let GoalStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct']);
        GoalStruct['Targets:arraystr'] = this.innerText;
        EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct'] = JSON.stringify(GoalStruct);
      }
    }

    // Goal Location Centralize ( Radio )
    var RadioButtons_Projectile_Goal_Centralize = document.getElementsByName('projectile_end_centralize');
    for(const radioButton of RadioButtons_Projectile_Goal_Centralize){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          let GoalStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct']);
          GoalStruct['TargetCenter:eval'] = radioButton.value;
          EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct'] = JSON.stringify(GoalStruct);
        }
      }
    }

    // Goal Location - Target Location ( select )
    document.getElementById("Command_Projectile_End_TargetLocation_Select").onchange = function(){
      if(EditedSequenceBlock){
        let GoalStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct']);
        GoalStruct['TargetLocation:str'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct'] = JSON.stringify(GoalStruct);
      }
    }

    // Goal Location - Point X
    document.getElementById("Command_Projectile_End_PointX").onkeyup = function(){
      if(EditedSequenceBlock){
        let GoalStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct']);
        GoalStruct['PointX:eval'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct'] = JSON.stringify(GoalStruct);
      }
    }

    // Goal Location - Point Y
    document.getElementById("Command_Projectile_End_PointY").onkeyup = function(){
      if(EditedSequenceBlock){
        let GoalStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct']);
        GoalStruct['PointY:eval'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct'] = JSON.stringify(GoalStruct);
      }
    }

    // Goal Location - Offset X
    document.getElementById("Command_Projectile_End_OffsetX").onkeyup = function(){
      if(EditedSequenceBlock){
        let GoalStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct']);
        GoalStruct['OffsetX:eval'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct'] = JSON.stringify(GoalStruct);
      }
    }

    // Goal Location - Offset Y
    document.getElementById("Command_Projectile_End_OffsetY").onkeyup = function(){
      if(EditedSequenceBlock){
        let GoalStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct']);
        GoalStruct['OffsetY:eval'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Goal:struct'] = JSON.stringify(GoalStruct);
      }
    }

    // Projectile AnimationID ( input )
    document.getElementById("Command_Projectile_AnimationID").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['AnimationID:num'] = this.value;
      }
    }

    // Projectile IconID ( input )
    document.getElementById("Command_Projectile_IconID").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Icon:eval'] = this.value;
      }
    }

    // Projectile PictureName ( input )
    document.getElementById("Command_Projectile_PictureName").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Picture:str'] = this.value;
      }
    }

    // Projectile Duration ( input )
    document.getElementById("Command_Projectile_Duration").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Duration:eval'] = this.value;
      }
    }

    // Wait For Projectile ( radio )
    var RadioButtons_waitforprojectile = document.getElementsByName('waitforprojectile');
    for(const radioButton of RadioButtons_waitforprojectile){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForProjectile:eval'] = radioButton.value;
        }
      }
    }

    // Projectile Auto Angle ( radio )
    var RadioButtons_Projectile_AutoAngle = document.getElementsByName('projectile_auto_angle');
    for(const radioButton of RadioButtons_Projectile_AutoAngle){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          let ExtraStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct']);
          ExtraStruct['AutoAngle:eval'] = radioButton.value;
          EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct'] = JSON.stringify(ExtraStruct);
        }
      }
    }

    // Projectile Angle Offset ( input )
    document.getElementById("Command_Projectile_AngleOffset").onkeyup = function(){
      if(EditedSequenceBlock){
        let ExtraStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct']);
        ExtraStruct['AngleOffset:eval'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct'] = JSON.stringify(ExtraStruct);
      }
    }

    // Projectile Arc Peaking ( input )
    document.getElementById("Command_Projectile_ArcPeaking").onkeyup = function(){
      if(EditedSequenceBlock){
        let ExtraStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct']);
        ExtraStruct['Arc:eval'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct'] = JSON.stringify(ExtraStruct);
      }
    }

    // Projectile Easing ( select )
    document.getElementById("Command_Projectile_Easing_Select").onchange = function(){
      if(EditedSequenceBlock){
        let ExtraStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct']);
        ExtraStruct['EasingType:str'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct'] = JSON.stringify(ExtraStruct);
      }
    }

    // Projectile Spin Speed ( input )
    document.getElementById("Command_Projectile_SpinSpeed").onkeyup = function(){
      if(EditedSequenceBlock){
        let ExtraStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct']);
        ExtraStruct['Spin:eval'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct'] = JSON.stringify(ExtraStruct);
      }
    }

    // Projectile BlendMode ( select )
    document.getElementById("Command_Projectile_BlendMode_Select").onchange = function(){
      if(EditedSequenceBlock){
        let ExtraStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct']);
        ExtraStruct['BlendMode:num'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct'] = JSON.stringify(ExtraStruct);
      }
    }

    // Projectile Hue ( input )
    document.getElementById("Command_Projectile_Hue").onkeyup = function(){
      if(EditedSequenceBlock){
        let ExtraStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct']);
        ExtraStruct['Hue:eval'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct'] = JSON.stringify(ExtraStruct);
      }
    }

    // Projectile Scale ( input )
    document.getElementById("Command_Projectile_Scale").onkeyup = function(){
      if(EditedSequenceBlock){
        let ExtraStruct = JSON.parse(EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct']);
        ExtraStruct['Scale:eval'] = this.value;
        EditedSequenceBlock.commandList[0].parameters[3]['Extra:struct'] = JSON.stringify(ExtraStruct);
      }
    }

    // Wait ( input )
    document.getElementById("Command_Wait").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[0] = parseInt(this.value);
      }
    }

    // Shake Screen - Power ( input )
    document.getElementById("Command_ShakeScreen_Power").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[0] = parseInt(this.value);
      }
    }

    // Shake Screen - Speed ( input )
    document.getElementById("Command_ShakeScreen_Speed").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[1] = parseInt(this.value);
      }
    }

    // Shake Screen - Duration ( input )
    document.getElementById("Command_ShakeScreen_Duration").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[2] = parseInt(this.value);
      }
    }

    // Shake Screen - Wait For Completion? ( radio )
    var RadioButtons_ShakeScreen_WaitForCompletion = document.getElementsByName('waitforshakescreen');
    for(const radioButton of RadioButtons_ShakeScreen_WaitForCompletion){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3] = JSON.parse(radioButton.value);
        }
      }
    }

    // Mech Action Effect Targets ( Select + Span )
    document.getElementById("Command_Mech_ActionEffect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("Command_Mech_ActionEffect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("Command_Mech_ActionEffect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("Command_Mech_ActionEffect_InputText").innerText;
      }
      this.value="null";
    }
    document.getElementById("Command_Mech_ActionEffect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }

    // Action Animation - Targets ( Select + Span )
    document.getElementById("Command_Anim_ActionAnimation_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("Command_Anim_ActionAnimation_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("Command_Anim_ActionAnimation_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("Command_Anim_ActionAnimation_InputText").innerText;
      }
      this.value="null";
    }
    document.getElementById("Command_Anim_ActionAnimation_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }

    // Action Animation - Mirror ( radio )
    var RadioButtons_Animation_ActionAnimation_Mirror = document.getElementsByName('mirroranimation_actionanimation');
    for(const radioButton of RadioButtons_Animation_ActionAnimation_Mirror){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['Mirror:eval'] = radioButton.value;
        }
      }
    }

    // Action Animation - Mirror ( radio )
    var RadioButtons_Animation_ActionAnimation_WaitForAnimation = document.getElementsByName('waitforanimation_actionanimation');
    for(const radioButton of RadioButtons_Animation_ActionAnimation_WaitForAnimation){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForAnimation:eval'] = radioButton.value;
        }
      }
    }

    // DB Animation - Targets ( Select + Span )
    document.getElementById("Command_DB_Animation_Target_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("Command_DB_Animation_Target_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("Command_DB_Animation_Target_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("Command_DB_Animation_Target_InputText").innerText;
      }
      this.value="null";
    }
    document.getElementById("Command_DB_Animation_Target_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }

    // DB Animation - Motion Animation ( input )
    document.getElementById("Command_DB_Animation_MotionAnimation").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['MotionAni:str'] = this.value;
      }
    }

    // Float - Targets ( Select + Span )
    document.getElementById("Command_Float_Target_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("Command_Float_Target_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("Command_Float_Target_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("Command_Float_Target_InputText").innerText;
      }
      this.value="null";
    }
    document.getElementById("Command_Float_Target_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }

    // Float - Height ( input )
    document.getElementById("Command_Float_Height").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Height:eval'] = this.value;
      }
    }

    // Float - Duration ( input )
    document.getElementById("Command_Float_Duration").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Duration:eval'] = this.value;
      }
    }

    // Float - Easing ( select )
    document.getElementById("Command_Float_Easing_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['EasingType:str'] = this.value;
      }
    }

    // Float - Wait For Float? ( radio )
    var RadioButtons_Move_Float_WaitForFloat = document.getElementsByName('waitforfloat');
    for(const radioButton of RadioButtons_Move_Float_WaitForFloat){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForFloat:eval'] = radioButton.value;
        }
      }
    }

    // ACSET - Finish Action - Immortal:Off  ( radio )
    var RadioButtons_ACSET_FinishAction_ImmortalOff = document.getElementsByName('acset_finishaction_immortaloff');
    for(const radioButton of RadioButtons_ACSET_FinishAction_ImmortalOff){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['ApplyImmortal:eval'] = radioButton.value;
        }
      }
    }

    // ACSET - Finish Action - Wait For New Line  ( radio )
    var RadioButtons_ACSET_FinishAction_WaitForNewLine = document.getElementsByName('acset_finishaction_waitfornewline');
    for(const radioButton of RadioButtons_ACSET_FinishAction_WaitForNewLine){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForNewLine:eval'] = radioButton.value;
        }
      }
    }

    // ACSET - Finish Action - Wait For Effects  ( radio )
    var RadioButtons_ACSET_FinishAction_WaitForEffects = document.getElementsByName('acset_finishaction_waitforeffects');
    for(const radioButton of RadioButtons_ACSET_FinishAction_WaitForEffects){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForEffect:eval'] = radioButton.value;
        }
      }
    }

    // ACSET - Finish Action - Clear Battle Log  ( radio )
    var RadioButtons_ACSET_FinishAction_ClearBattleLog = document.getElementsByName('acset_finishaction_clearbattlelog');
    for(const radioButton of RadioButtons_ACSET_FinishAction_ClearBattleLog){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['ClearBattleLog:eval'] = radioButton.value;
        }
      }
    }

    // ACSET - Finish Action - Home Reset  ( radio )
    var RadioButtons_ACSET_FinishAction_HomeReset = document.getElementsByName('acset_finishaction_homereset');
    for(const radioButton of RadioButtons_ACSET_FinishAction_HomeReset){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['ActionEnd:eval'] = radioButton.value;
        }
      }
    }

    // ACSET - Finish Action - Wait For Movement  ( radio )
    var RadioButtons_ACSET_FinishAction_WaitForMovement = document.getElementsByName('acset_finishaction_waitformovement');
    for(const radioButton of RadioButtons_ACSET_FinishAction_WaitForMovement){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForMovement:eval'] = radioButton.value;
        }
      }
    }

    // -----------------------------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------------

    // ACSET - Setup Action - Display Action  ( radio )
    var RadioButtons_ACSET_SetupAction_DisplayAction = document.getElementsByName('acset_setupaction_displayaction');
    for(const radioButton of RadioButtons_ACSET_SetupAction_DisplayAction){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['DisplayAction:eval'] = radioButton.value;
        }
      }
    }

    // ACSET - Setup Action - Immortal:On  ( radio )
    var RadioButtons_ACSET_SetupAction_Immortal_On = document.getElementsByName('acset_setupaction_immortal_on');
    for(const radioButton of RadioButtons_ACSET_SetupAction_Immortal_On){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['ApplyImmortal:eval'] = radioButton.value;
        }
      }
    }

    // ACSET - Setup Action - Battle Step  ( radio )
    var RadioButtons_ACSET_SetupAction_BattleStep = document.getElementsByName('acset_setupaction_battlestep');
    for(const radioButton of RadioButtons_ACSET_SetupAction_BattleStep){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['ActionStart:eval'] = radioButton.value;
        }
      }
    }

    // ACSET - Setup Action - Wait For Movement?  ( radio )
    var RadioButtons_ACSET_SetupAction_WaitForMovement = document.getElementsByName('acset_setupaction_waitformovement');
    for(const radioButton of RadioButtons_ACSET_SetupAction_WaitForMovement){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForMovement:eval'] = radioButton.value;
        }
      }
    }

    // ACSET - Setup Action - Cast Animation?  ( radio )
    var RadioButtons_ACSET_SetupAction_CastAnimation = document.getElementsByName('acset_setupaction_castanimation');
    for(const radioButton of RadioButtons_ACSET_SetupAction_CastAnimation){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['CastAnimation:eval'] = radioButton.value;
        }
      }
    }
    
    // ACSET - Setup Action - Wait For Animation?  ( radio )
    var RadioButtons_ACSET_SetupAction_WaitForAnimation = document.getElementsByName('acset_setupaction_waitforanimation');
    for(const radioButton of RadioButtons_ACSET_SetupAction_WaitForAnimation){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForAnimation:eval'] = radioButton.value;
        }
      }
    }

    // Movement - Move To Point - Targets ( Select + Span )
    document.getElementById("Command_MOVE_MoveToPoint_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("Command_MOVE_MoveToPoint_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("Command_MOVE_MoveToPoint_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("Command_MOVE_MoveToPoint_TargetSelect_InputText").innerText;
      }
      this.value="null";
    }
    document.getElementById("Command_MOVE_MoveToPoint_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }

    // Movement - Move To Point - Destination ( Span )
    document.getElementById("Command_MOVE_MoveToPoint_DestinationPoint_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Destination:str'] = this.innerText;
      }
    }

    // Movement - Move To Point - Offset Adjustment ( Select )
    document.getElementById("Command_MOVE_MoveToPoint_OffsetAdjustment_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['OffsetAdjust:str'] = this.value;
      }
    }
    // Movement - Move To Point - Offset: X ( Input )
    document.getElementById("Command_MOVE_MoveToPoint_OffsetX").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['OffsetX:eval'] = this.value;
      }
    }
    // Movement - Move To Point - Offset: Y ( Input )
    document.getElementById("Command_MOVE_MoveToPoint_OffsetY").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['OffsetY:eval'] = this.value;
      }
    }

    // Movement - Move To Point - Duration ( Input )
    document.getElementById("Command_MOVE_MoveToPoint_Duration").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Duration:eval'] = this.value;
      }
    }

    // Movement - Move To Point - Face Destination?  ( Radio )
    var RadioButtons_MOVE_MoveToPoint_FaceDestination = document.getElementsByName('move_movetopoint_facedestination');
    for(const radioButton of RadioButtons_MOVE_MoveToPoint_FaceDestination){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['FaceDirection:eval'] = radioButton.value;
        }
      }
    }

    // Movement - Move To Point - Movement Easing ( Select )
    document.getElementById("Command_MOVE_MoveToPoint_MovementEasing_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['EasingType:str'] = this.value;
      }
    }

    //  Movement - Move To Point - Movement Motion ( Select )
    document.getElementById("Command_MOVE_MoveToPoint_MovementMotion_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['MotionType:str'] = this.value;
      }
    }

    // Movement - Move To Point - Wait For Movement?  ( Radio )
    var RadioButtons_MOVE_MoveToPoint_WaitForMovement = document.getElementsByName('move_movetopoint_waitformovement');
    for(const radioButton of RadioButtons_MOVE_MoveToPoint_WaitForMovement){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForMovement:eval'] = radioButton.value;
        }
      }
    }

    // Motion - Motion Type - Targets ( Select + Span )
    document.getElementById("Command_MOTION_MotionType_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("Command_MOTION_MotionType_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("Command_MOTION_MotionType_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("Command_MOTION_MotionType_TargetSelect_InputText").innerText;
      }
      this.value="null";
    }
    document.getElementById("Command_MOTION_MotionType_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }
    //  Motion - Motion Type - Motion Type ( Select )
    document.getElementById("Command_MOTION_MotionType_MotionType_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['MotionType:str'] = this.value;
      }
    }
    // Motion - Motion Type - Show Weapon?  ( Radio )
    var RadioButtons_MOTION_MotionType_ShowWeapon = document.getElementsByName('motion_motiontype_showweapon');
    for(const radioButton of RadioButtons_MOTION_MotionType_ShowWeapon){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['ShowWeapon:eval'] = radioButton.value;
        }
      }
    }

    // Common Event Id ( Input )
    document.getElementById("Command_CommonEvent_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[0] = this.value;
      }
    }

    // Move - Spin/Rotate - Targets ( Select + Span )
    document.getElementById("Command_COMMAND_SpinRotate_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("Command_COMMAND_SpinRotate_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("Command_COMMAND_SpinRotate_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("Command_COMMAND_SpinRotate_TargetSelect_InputText").innerText;
      }
      this.value="null";
    }
    document.getElementById("Command_COMMAND_SpinRotate_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }

    // Move - Spin/Rotate - Angle ( Input )
    document.getElementById("Command_COMMAND_SpinRotate_Angle_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Angle:eval'] = this.value;
      }
    }

    // Move - Spin/Rotate - Duration ( Input )
    document.getElementById("Command_COMMAND_SpinRotate_Duration_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Duration:eval'] = this.value;
      }
    }

    // Move - Spin/Rotate - Easing ( select )
    document.getElementById("Command_COMMAND_SpinRotate_Easing_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['EasingType:str'] = this.value;
      }
    }

    // Move - Spin/Rotate - Revert Angle on Finish?  ( Radio )
    var RadioButtons_COMMAND_MOVE_SpinRotate_RevertAngle = document.getElementsByName('command_spinrotate_revertonfinish');
    for(const radioButton of RadioButtons_COMMAND_MOVE_SpinRotate_RevertAngle){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['RevertAngle:eval'] = radioButton.value;
        }
      }
    }

    // Move - Spin/Rotate - Wait For Spin?  ( Radio )
    var RadioButtons_COMMAND_MOVE_SpinRotate_WaitForSpin = document.getElementsByName('command_spinrotate_waitforspin');
    for(const radioButton of RadioButtons_COMMAND_MOVE_SpinRotate_WaitForSpin){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForSpin:eval'] = radioButton.value;
        }
      }
    }

    // Zoom:Scale - Scale ( Input )
    document.getElementById("COMMAND_ZOOM_Scale_Scale_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Scale:eval'] = this.value;
      }
    }

    // Zoom:Scale - Duration ( Input )
    document.getElementById("COMMAND_ZOOM_Scale_Duration_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Duration:eval'] = this.value;
      }
    }

    // Zoom:Scale - Easing ( select )
    document.getElementById("COMMAND_ZOOM_Scale_Easing_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['EasingType:str'] = this.value;
      }
    }

    // Zoom:Scale - Wait For Zoom?  ( Radio )
    var RadioButtons_COMMAND_ZOOM_Scale_WaitForZoom = document.getElementsByName('zoom_scale_waitforzoom');
    for(const radioButton of RadioButtons_COMMAND_ZOOM_Scale_WaitForZoom){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForZoom:eval'] = radioButton.value;
        }
      }
    }


    // Move:FaceDirection - Direction ( select )
    document.getElementById("COMMAND_MOVE_FaceDirection_Direction_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Direction:str'] = this.value;
      }
    }
    // Move:FaceDirection - Targets ( Select + Span )
    document.getElementById("COMMAND_MOVE_FaceDirection_Target_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("COMMAND_MOVE_FaceDirection_Target_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("COMMAND_MOVE_FaceDirection_Target_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("COMMAND_MOVE_FaceDirection_Target_TargetSelect_InputText").innerText;
      }
      this.value="null";
    }
    document.getElementById("COMMAND_MOVE_FaceDirection_Target_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }


    // Move:Distance - Targets ( Select + Span )
    document.getElementById("COMMAND_MOVE_Distance_Target_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("COMMAND_MOVE_Distance_Target_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("COMMAND_MOVE_Distance_Target_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("COMMAND_MOVE_Distance_Target_TargetSelect_InputText").innerText;
      }
      this.value="null";
    }// Span
    document.getElementById("COMMAND_MOVE_Distance_Target_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }
    // Move:Distance - Adjustment ( select )
    document.getElementById("COMMAND_MOVE_Distance_DistanceAdjustment_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['DistanceAdjust:str'] = this.value;
      }
    }
    // Move:Distance: Distance X ( Input )
    document.getElementById("COMMAND_MOVE_Distance_DistanceAdjustment_X").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['DistanceX:eval'] = this.value;
      }
    }
    // Move:Distance: Distance Y ( Input )
    document.getElementById("COMMAND_MOVE_Distance_DistanceAdjustment_Y").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['DistanceY:eval'] = this.value;
      }
    }
    // Move:Distance - Duration ( Input )
    document.getElementById("COMMAND_MOVE_Distance_Duration_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Duration:eval'] = this.value;
      }
    }
    // Move:Distance - Face Direction?  ( Radio )
    var RadioButtons_COMMAND_MOVE_MoveDistance_FaceDirection = document.getElementsByName('move_movedistance_facedestination');
    for(const radioButton of RadioButtons_COMMAND_MOVE_MoveDistance_FaceDirection){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['FaceDirection:eval'] = radioButton.value;
        }
      }
    }
    // Move:Distance - Easing ( select )
    document.getElementById("COMMAND_MOVE_Distance_Movement_Easing_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['EasingType:str'] = this.value;
      }
    }
    // Move:Distance - Motion Type ( select )
    document.getElementById("COMMAND_MOVE_Distance_MotionType_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['MotionType:str'] = this.value;
      }
    }
    // Move:Distance - Face Direction?  ( Radio )
    var RadioButtons_COMMAND_MOVE_MoveDistance_WaitForMovement = document.getElementsByName('move_movedistance_waitformovement');
    for(const radioButton of RadioButtons_COMMAND_MOVE_MoveDistance_WaitForMovement){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForMovement:eval'] = radioButton.value;
        }
      }
    }

    
    // IMPACT : Color Break - Intensity ( Input )
    document.getElementById("COMMAND_IMPACT_ColorBreak_Intensity_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Intensity:eval'] = this.value;
      }
    }
    // IMPACT : Color Break - Duration ( Input )
    document.getElementById("COMMAND_IMPACT_ColorBreak_Duration_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Duration:eval'] = this.value;
      }
    }
    // IMPACT : Color Break - Easing Type ( select )
    document.getElementById("COMMAND_IMPACT_ColorBreak_Easing_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['EasingType:str'] = this.value;
      }
    }


    // Move:Opacity - Targets ( Select + Span )
    document.getElementById("COMMAND_MOVE_Opacity_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("COMMAND_MOVE_Opacity_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("COMMAND_MOVE_Opacity_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("COMMAND_MOVE_Opacity_TargetSelect_InputText").innerText;
      }
      this.value="null";
    }// Span
    document.getElementById("COMMAND_MOVE_Opacity_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }
    // Move:Opacity - Desired Opacity ( Input )
    document.getElementById("COMMAND_MOVE_Opacity_Amount_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Opacity:eval'] = this.value;
      }
    }
    // Move:Opacity - Duration ( Input )
    document.getElementById("COMMAND_MOVE_Opacity_Duration_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Duration:eval'] = this.value;
      }
    }
    // Move:Opacity - Opacity Easing ( select )
    document.getElementById("COMMAND_MOVE_Opacity_Easing_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['EasingType:str'] = this.value;
      }
    }
    // Move:Opacity - Wait For Opacity?  ( Radio )
    var RadioButtons_COMMAND_MOVE_Opacity_WaitForOpacity = document.getElementsByName('move_opacity_waitforopacity');
    for(const radioButton of RadioButtons_COMMAND_MOVE_Opacity_WaitForOpacity){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForOpacity:eval'] = radioButton.value;
        }
      }
    }


    // MotionTrail:Create - Targets ( Select + Span )
    document.getElementById("COMMAND_MOTIONTRAIL_Create_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("COMMAND_MOTIONTRAIL_Create_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("COMMAND_MOTIONTRAIL_Create_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("COMMAND_MOTIONTRAIL_Create_TargetSelect_InputText").innerText;
      }
      this.value="null";
    }// Span
    document.getElementById("COMMAND_MOTIONTRAIL_Create_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }
    // MotionTrail:Create - Delay ( Input )
    document.getElementById("COMMAND_MOTIONTRAIL_Create_Delay_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['delay:num'] = this.value;
      }
    }
    // MotionTrail:Create - Duration ( Input )
    document.getElementById("COMMAND_MOTIONTRAIL_Create_Duration_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['duration:num'] = this.value;
      }
    }
    // MotionTrail:Create - Hue ( Input )
    document.getElementById("COMMAND_MOTIONTRAIL_Create_Hue_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['hue:num'] = this.value;
      }
    }
    // MotionTrail:Create - Starting Opacity ( Input )
    document.getElementById("COMMAND_MOTIONTRAIL_Create_StartingOpacity_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['opacityStart:num'] = this.value;
      }
    }
    // MotionTrail:Create - Color Tone ( Input )
    document.getElementById("COMMAND_MOTIONTRAIL_Create_ColorTone_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['tone:eval'] = this.value;
      }
    }


    // MotionTrail:Remove - Targets ( Select + Span )
    document.getElementById("COMMAND_MOTIONTRAIL_Remove_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("COMMAND_MOTIONTRAIL_Remove_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("COMMAND_MOTIONTRAIL_Remove_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("COMMAND_MOTIONTRAIL_Remove_TargetSelect_InputText").innerText;
      }
      this.value="null";
    }// Span
    document.getElementById("COMMAND_MOTIONTRAIL_Remove_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }



    // Camera : Focus Target - Targets ( Select + Span )
    document.getElementById("COMMAND_CAMERA_FOCUSTARGET_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("COMMAND_CAMERA_FOCUSTARGET_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("COMMAND_CAMERA_FOCUSTARGET_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("COMMAND_CAMERA_FOCUSTARGET_TargetSelect_InputText").innerText;
      }
      this.value="null";
    }// Span
    document.getElementById("COMMAND_CAMERA_FOCUSTARGET_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }
    // Camera : Focus Target - Duration ( Input )
    document.getElementById("COMMAND_CAMERA_FOCUSTARGET_Duration_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Duration:eval'] = this.value;
      }
    }
    // Camera : Focus Target - Camera Easing ( select )
    document.getElementById("COMMAND_CAMERA_FOCUSTARGET_Easing_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['EasingType:str'] = this.value;
      }
    }
    // Camera : Focus Target - Wait For Camera?  ( Radio )
    var RadioButtons_COMMAND_CAMERA_FOCUSTARGET_WaitForCamera = document.getElementsByName('camera_focustarget_waitforcamera');
    for(const radioButton of RadioButtons_COMMAND_CAMERA_FOCUSTARGET_WaitForCamera){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForCamera:eval'] = radioButton.value;
        }
      }
    }


    // Camera : Focus Point - X Coordinate ( Input )
    document.getElementById("COMMAND_CAMERA_FOCUSPOINT_X_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['FocusX:eval'] = this.value;
      }
    }
    // Camera : Focus Point - Y Coordinate ( Input )
    document.getElementById("COMMAND_CAMERA_FOCUSPOINT_Y_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['FocusY:eval'] = this.value;
      }
    }
    // Camera : Focus Point - Duration ( Input )
    document.getElementById("COMMAND_CAMERA_FOCUSPOINT_Duration_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Duration:eval'] = this.value;
      }
    }
    // Camera : Focus Point - Camera Easing ( select )
    document.getElementById("COMMAND_CAMERA_FOCUSPOINT_Easing_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['EasingType:str'] = this.value;
      }
    }
    // Camera : Focus Point - Wait For Camera?  ( Radio )
    var RadioButtons_COMMAND_CAMERA_FOCUSPOINT_WaitForCamera = document.getElementsByName('camera_focuspoint_waitforcamera');
    for(const radioButton of RadioButtons_COMMAND_CAMERA_FOCUSPOINT_WaitForCamera){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['WaitForCamera:eval'] = radioButton.value;
        }
      }
    }



    // IMPACT: Shockwave Each Target - Targets ( Select + Span )
    document.getElementById("COMMAND_IMPACT_Shockwave_EachTarget_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("COMMAND_IMPACT_Shockwave_EachTarget_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("COMMAND_IMPACT_Shockwave_EachTarget_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("COMMAND_IMPACT_Shockwave_EachTarget_TargetSelect_InputText").innerText;
      }
      this.value="null";
    }// Span
    document.getElementById("COMMAND_IMPACT_Shockwave_EachTarget_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }
    // IMPACT: Shockwave Each Target - Target Location ( Select )
    document.getElementById("COMMAND_IMPACT_Shockwave_EachTarget_TargetLocation_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['TargetLocation:str'] = this.value;
      }
    }
    // IMPACT: Shockwave Each Target - Offset X ( Input )
    document.getElementById("COMMAND_IMPACT_Shockwave_EachTarget_OffsetX_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['OffsetX:eval'] = this.value;
      }
    }
    // IMPACT: Shockwave Each Target - Offset Y ( Input )
    document.getElementById("COMMAND_IMPACT_Shockwave_EachTarget_OffsetY_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['OffsetY:eval'] = this.value;
      }
    }
    // IMPACT: Shockwave Each Target - Amplitude ( Input )
    document.getElementById("COMMAND_IMPACT_Shockwave_EachTarget_Amplitude_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Amp:eval'] = this.value;
      }
    }
    // IMPACT: Shockwave Each Target - Wavelength ( Input )
    document.getElementById("COMMAND_IMPACT_Shockwave_EachTarget_Wavelength_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Wave:eval'] = this.value;
      }
    }
    // IMPACT: Shockwave Each Target - Duration ( Input )
    document.getElementById("COMMAND_IMPACT_Shockwave_EachTarget_Duration_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Duration:eval'] = this.value;
      }
    }


    // Motion - Freeze Motion Frame - Targets ( Select + Span )
    document.getElementById("Command_MOTION_FreezeMotionFrame_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("Command_MOTION_FreezeMotionFrame_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("Command_MOTION_FreezeMotionFrame_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = document.getElementById("Command_MOTION_FreezeMotionFrame_TargetSelect_InputText").innerText;
      }
      this.value="null";
    }
    document.getElementById("Command_MOTION_FreezeMotionFrame_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Targets:arraystr'] = this.innerText;
      }
    }
    //  Motion - Freeze Motion Frame - Motion Type ( Select )
    document.getElementById("Command_MOTION_FreezeMotionFrame_MotionType_Select").onchange = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['MotionType:str'] = this.value;
      }
    }
    // Motion - Freeze Motion Frame - Frame Index ( Input )
    document.getElementById("COMMAND_MOTION_FreezeMotionFrame_FrameIndex_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.commandList[0].parameters[3]['Frame:num'] = this.value;
      }
    }
    // Motion - Freeze Motion Frame - Show Weapon?  ( Radio )
    var RadioButtons_MOTION_FreezeMotionFrame_ShowWeapon = document.getElementsByName('motion_freezemotionframe_showweapon');
    for(const radioButton of RadioButtons_MOTION_FreezeMotionFrame_ShowWeapon){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.commandList[0].parameters[3]['ShowWeapon:eval'] = radioButton.value;
        }
      }
    }


    // == FLASH SCREEN ==
    
    // Refs
    let flashScreenElements = {};
    flashScreenElements.colorInput = document.getElementById("flashscreen_color");
    flashScreenElements.intensityInput = document.getElementById("flashcreen_intensity");
    flashScreenElements.durationInput = document.getElementById("flashcreen_duration");
    flashScreenElements.waitRadios = document.getElementsByName('flashscreen_radio_waitForFlash');

    // Color
    flashScreenElements.colorInput.onchange = function() {
      if(EditedSequenceBlock){
        let colorsArr = HexToRGB(this.value);
        EditedSequenceBlock.data.red = colorsArr[0];
        EditedSequenceBlock.data.green = colorsArr[1];
        EditedSequenceBlock.data.blue = colorsArr[2];
        EditedSequenceBlock.parameters[0][0] = EditedSequenceBlock.data.red;
        EditedSequenceBlock.parameters[0][1] = EditedSequenceBlock.data.green;
        EditedSequenceBlock.parameters[0][2] = EditedSequenceBlock.data.blue;
      }
    }

    // Intensity
    flashScreenElements.intensityInput.onchange = function() {
      if(EditedSequenceBlock){
        EditedSequenceBlock.data.intensity = this.value;
        EditedSequenceBlock.parameters[0][3] = EditedSequenceBlock.data.intensity;
      }
    }
    
    // Duration
    flashScreenElements.durationInput.onkeyup = function() {
      if(EditedSequenceBlock){
        EditedSequenceBlock.data.duration = this.value;
        EditedSequenceBlock.parameters[1] = EditedSequenceBlock.data.duration;
      }
    }

    // Wait For Flash Screen
    for(const radioButton of flashScreenElements.waitRadios){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.data.waitForFlash = eval(radioButton.value);
          EditedSequenceBlock.parameters[2] = EditedSequenceBlock.data.waitForFlash;
        }
      }
    }

    
    // == SCALE ==
    let scaleElements = {};
    scaleElements.scaleXinput = document.getElementById("COMMAND_Scale_ScaleX");
    scaleElements.scaleYinput = document.getElementById("COMMAND_Scale_ScaleY");
    scaleElements.scaleDurationinput = document.getElementById("COMMAND_Scale_Duration");
    scaleElements.scaleEasingSelect = document.getElementById("COMMAND_Scale_Easing_Select");
    scaleElements.scaleWaitRadios = document.getElementsByName("command_scale_radio_waitForScale");

    // Targets
    document.getElementById("COMMAND_Scale_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("COMMAND_Scale_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("COMMAND_Scale_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.parameters['Targets:arraystr'] = document.getElementById("COMMAND_Scale_TargetSelect_InputText").innerText;
      }
      this.value="null";
    }
    document.getElementById("COMMAND_Scale_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.parameters['Targets:arraystr'] = this.innerText;
      }
    }

    // Scale X
    scaleElements.scaleXinput.onkeyup = function() {
      if(EditedSequenceBlock){
        EditedSequenceBlock.parameters["ScaleX:eval"] = this.value;
      }
    }

    // Scale Y
    scaleElements.scaleYinput.onkeyup = function() {
      if(EditedSequenceBlock){
        EditedSequenceBlock.parameters["ScaleY:eval"] = this.value;
      }
    }
    
    // Duration
    scaleElements.scaleDurationinput.onkeyup = function() {
      if(EditedSequenceBlock){
        EditedSequenceBlock.parameters["Duration:eval"] = this.value;
      }
    }

    // Easing
    scaleElements.scaleEasingSelect.onchange = function() {
      if(EditedSequenceBlock){
        EditedSequenceBlock.parameters["EasingType:str"] = this.value;
      }
    }

    // Wait For Scale
    for(const radioButton of scaleElements.scaleWaitRadios){
      radioButton.onclick = function(){
        if(EditedSequenceBlock){
          EditedSequenceBlock.parameters["WaitForScale:eval"] = radioButton.value;
        }
      }
    }


    // == SKEW ==
    let skewElements = {};
    skewElements.skewXinput = document.getElementById("COMMAND_Skew_SkewX");
    skewElements.skewYinput = document.getElementById("COMMAND_Skew_SkewY");
    skewElements.skewDurationinput = document.getElementById("COMMAND_Skew_Duration");
    skewElements.skewEasingSelect = document.getElementById("COMMAND_Skew_Easing_Select");
    skewElements.skewWaitRadios = document.getElementsByName("command_skew_radio_waitForSkew");

    // Targets
    document.getElementById("COMMAND_Skew_TargetSelect_DropList").onchange = function(){
      let elementsAlreadyThere;
      try{
        elementsAlreadyThere = JSON.parse(document.getElementById("COMMAND_Skew_TargetSelect_InputText").innerText);
      }catch(e){
        elementsAlreadyThere=[];
      }
      if(this.value != "" && this.value !="null" )
        elementsAlreadyThere.push(this.value);
      document.getElementById("COMMAND_Skew_TargetSelect_InputText").innerText = JSON.stringify(elementsAlreadyThere);
      if(EditedSequenceBlock){
        EditedSequenceBlock.parameters['Targets:arraystr'] = document.getElementById("COMMAND_Skew_TargetSelect_InputText").innerText;
      }
      this.value="null";
    }
    document.getElementById("COMMAND_Skew_TargetSelect_InputText").onkeyup = function(){
      if(EditedSequenceBlock){
        EditedSequenceBlock.parameters['Targets:arraystr'] = this.innerText;
      }
    }

    // Skew X
    skewElements.skewXinput.onkeyup = function() {
      if(EditedSequenceBlock){
        EditedSequenceBlock.parameters["SkewX:eval"] = this.value;
      }
    }

    // Skew Y
    skewElements.skewYinput.onkeyup = function() {
      if(EditedSequenceBlock){
        EditedSequenceBlock.parameters["SkewY:eval"] = this.value;
      }
    }
    
    // Duration
    skewElements.skewDurationinput.onkeyup = function() {
      if(EditedSequenceBlock){
        EditedSequenceBlock.parameters["Duration:eval"] = this.value;
      }
    }

    // Easing
    skewElements.skewEasingSelect.onchange = function() {
      if(EditedSequenceBlock) {
        EditedSequenceBlock.parameters["EasingType:str"] = this.value;
      }
    }

    // Wait For Skew
    for(const radioButton of skewElements.skewWaitRadios){
      radioButton.onclick = function(){
        if(EditedSequenceBlock) {
          EditedSequenceBlock.parameters["WaitForSkew:eval"] = radioButton.value;
        }
      }
    }


    // == ONCE PARALLEL ==
    let onceParallelElements = {};
    onceParallelElements.commonEventIdInput = document.getElementById("COMMAND_MECH_ONCEPARALLEL_commonEventId");

    // Common Event Id
    onceParallelElements.commonEventIdInput.onkeyup = function() {
      if(EditedSequenceBlock) {
        EditedSequenceBlock.parameters["CommonEventID:num"] = this.value;
      }
    }