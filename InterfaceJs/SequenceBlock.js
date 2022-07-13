function SequenceBlock(id){
    // INIT

    this.blockId = id;

    this.CreateElements = function(){
      this.parentBlock = null;
      this.childBlock = null;
      this.commandList = [];
      this.commandOptionsId = []; // Div IDs for options Window
      this.main = this.CreateMainElement(100,100,'blue');
      //dragElement(this.main);
      this.expandButton = this.CreateExpandButton(30,30,'+');
      this.deleteButton = this.CreateDeleteButton(30,30,'-');
      this.moveBeforeButton = this.CreateMoveBeforeButton(30,30,'>');
      this.moveAfterButton = this.CreateMoveAfterButton(30,30,'<');
      this.blockTitle = this.CreateBlockTitle();
      this.duplicateButton = this.CreateDuplicateButton(30,30,'D');
      this.PlaceElements();
      this.AppendChildren();
      this.line = new Line();
      //this.line.ConnectStart(this.GetMoveAfterButton());
      //this.line.ConnectEnd(this.GetMoveAfterButton())
    }
    this.CreateMainElement = function(width,height,backgroundColor){
      let mainElement = document.createElement('span');
      mainElement.classList.add("sequenceBlockNode");
      mainElement.classList.add("popOnAppear");
      mainElement.id = this.blockId;
      //mainElement.style.position = 'relative';
      dragElement(mainElement);
      mainElement.style.position = 'absolute';
      mainElement.style.zIndex = '900';
      mainElement.style.display = 'inline-block';
      mainElement.style.width = width + 'px';
      mainElement.style.height = height + 'px';
      mainElement.style.border = 'solid';
      //mainElement.style.borderRadius = '300px';
      mainElement.style.borderRadius = '100px';
      mainElement.style.borderColor = '#000000';
      mainElement.style.borderWidth = '3px 3px';
      mainElement.style.fontSize = '1.5rem';
      mainElement.style.padding = '0';
      mainElement.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5) ';
      mainElement.style.background = 'linear-gradient(180deg, transparent, ' + backgroundColor + ');';
      mainElement.style.top = Math.round(window.innerHeight /2 - height/2).toString() + 'px';
      mainElement.style.left = Math.round(window.innerWidth /2 - width/2).toString() + 'px';
      return mainElement;
    }
    this.CreateExpandButton = function(width,height,content='+'){
      let expandButton = document.createElement('button');
      expandButton.style.position = 'absolute';
      expandButton.style.width = width + 'px';
      expandButton.style.height = height + 'px';
      expandButton.innerText = content;
      expandButton.style.borderRadius = '300px';
      expandButton.style.fontSize = '1.5rem';
      expandButton.style.padding = '0';
      expandButton.sequenceBlockRef = this;
      expandButton.onclick = function(){
        CommandOptionsWindow_HideAll();

        let seqBlockRef = this.sequenceBlockRef;
        for(const id of seqBlockRef.commandOptionsId){
          document.getElementById(id).style.display ="block";
        }
        seqBlockRef.OnExpand();
      }
      return expandButton;
    }
    this.CreateDeleteButton = function(width,height,content='+'){
      let deleteButton = document.createElement('button');
      deleteButton.style.position = 'absolute';
      deleteButton.style.backgroundColor = "red";
      deleteButton.style.width = width + 'px';
      deleteButton.style.height = height + 'px';
      deleteButton.innerText = content;
      deleteButton.style.borderRadius = '300px';
      deleteButton.style.fontSize = '1.5rem';
      deleteButton.style.padding = '0';
      deleteButton.sequenceBlockRef = this;
      deleteButton.onclick = function(){
        this.sequenceBlockRef.OnDelete();
      }
      return deleteButton;
    }
    // CreateMoveBefore && CreateMoveAfter == nodes connection points (wrong name)
    this.CreateMoveBeforeButton = function(width,height,content='<'){
      let moveBeforeButton = document.createElement('button');
      moveBeforeButton.style.position = 'absolute';
      moveBeforeButton.style.width = width + 'px';
      moveBeforeButton.style.height = height + 'px';
      moveBeforeButton.innerText = content;
      moveBeforeButton.style.borderRadius = '300px';
      moveBeforeButton.style.fontSize = '1.5rem';
      moveBeforeButton.style.padding = '0';
      moveBeforeButton.sequenceBlockRef = this;
      moveBeforeButton.lineRef = moveBeforeButton.sequenceBlockRef.line;
      moveBeforeButton.onclick = function(e){

          let sequenceBlockObject = this.sequenceBlockRef;

          if(GetCurrentConnectionAttempter()){ // If something is trying to connect
            if(GetCurrentConnectionAttempter().sequenceBlockRef !== this.sequenceBlockRef){ // If it's an attempt to connect to this object, and it's different from the attempter
              GetCurrentConnectionAttempter().sequenceBlockRef.line.ConnectEnd(this);
              this.sequenceBlockRef.SetParentBlock(GetCurrentConnectionAttempter().sequenceBlockRef);
              GetCurrentConnectionAttempter().sequenceBlockRef.SetChildBlock(this.sequenceBlockRef);
            }else{// If self attempt to connect

              //Clear Bindings
              if(sequenceBlockObject.GetChildBlock()){
                
                sequenceBlockObject.GetChildBlock().UnbindParentBlock();
                sequenceBlockObject.UnbindChildBlock();
              }
              //Line Management
              GetCurrentConnectionAttempter().sequenceBlockRef.line.BreakConnection();
            }
            RemoveCurrentConnectionAttempter();
          }
      }
      return moveBeforeButton;
    }
    this.CreateMoveAfterButton = function(width,height,content='>'){
      let moveAfterButton = document.createElement('button');
      moveAfterButton.style.position = 'absolute';
      moveAfterButton.style.width = width + 'px';
      moveAfterButton.style.height = height + 'px';
      moveAfterButton.innerText = content;
      moveAfterButton.style.borderRadius = '300px';
      moveAfterButton.style.fontSize = '1.5rem';
      moveAfterButton.style.padding = '0';
      moveAfterButton.sequenceBlockRef = this;
      moveAfterButton.lineRef = moveAfterButton.sequenceBlockRef.line;
      moveAfterButton.onclick = function(e){

          let sequenceBlockObject = this.sequenceBlockRef;

          // Clear objects bindings
          if(sequenceBlockObject.GetChildBlock()){// if parent already attached
              // Unbind this from parent + Unbind parent from this
              sequenceBlockObject.GetChildBlock().UnbindParentBlock();
              sequenceBlockObject.UnbindChildBlock();
          }

          // Manage Lines
          let lineRef = this.sequenceBlockRef.line;
          if(!lineRef.IsAttemptingConnection() && !IsElementCurrentlyAttemptingToConnect()){
            // Line Management
            lineRef.AttemptConnectionFrom(this);
            SetCurrentConnectionAttempter(this);
          }else if(lineRef.IsAttemptingConnection()){
            lineRef.BreakConnection();
            RemoveCurrentConnectionAttempter();
          }
      }
      return moveAfterButton;
    }
    this.CreateBlockTitle = function(){
      let blockTitle = document.createElement('span');
      blockTitle.style.position = 'absolute';
      blockTitle.style.width = '95%';
      blockTitle.style.fontSize = '1rem';
      blockTitle.style.color = 'black';
      blockTitle.style.border = '2px solid black';
      blockTitle.style.borderRadius = '15px';
      blockTitle.style.fontWeight = '1000';
      blockTitle.style.textAlign = 'center';
      blockTitle.style.zIndex = "90";
      blockTitle.style.backgroundColor = "white";
      blockTitle.innerHTML = 'BLOCKTITLE';
      return blockTitle;
    }
    this.CreateDuplicateButton = function(width,height,content='D'){
      let duplicateButton = document.createElement('button');
      duplicateButton.style.position = 'absolute';
      duplicateButton.style.width = width + 'px';
      duplicateButton.style.height = height + 'px';
      duplicateButton.innerText = content;
      duplicateButton.style.borderRadius = '300px';
      duplicateButton.style.fontSize = '1.5rem';
      duplicateButton.style.padding = '0';
      duplicateButton.sequenceBlockRef = this;
      duplicateButton.onclick = function(){
        this.sequenceBlockRef.CreateCopy();
      }
      return duplicateButton;
    }
    this.PlaceElements = function(){
      this.PlaceExpandButton(37,68);
      this.PlaceDeleteButton(83,0);
      this.PlaceMoveBeforeButton(0,75);
      this.PlaceMoveAfterButton(75,75);
      this.PlaceBlockTitle(0,20);
      this.PlaceDuplicateButton(-15,0);
    }
    this.PlaceExpandButton = function(x,y){
      let expandButton = this.GetExpandButton();
      expandButton.style.left = x + 'px';
      expandButton.style.top = y + 'px';
    }
    this.PlaceDeleteButton = function(x,y){
      let deleteButton = this.GetDeleteButton();
      deleteButton.style.left = x + 'px';
      deleteButton.style.top = y + 'px';
    }
    this.PlaceMoveBeforeButton = function(x,y){
      let moveBeforeButton = this.GetMoveBeforeButton();
      moveBeforeButton.style.left = x + 'px';
      moveBeforeButton.style.top = y + 'px';
    }
    this.PlaceMoveAfterButton = function(x,y){
      let moveAfterButton = this.GetMoveAfterButton();
      moveAfterButton.style.left = x + 'px';
      moveAfterButton.style.top = y + 'px';
    }
    this.PlaceBlockTitle = function(x,y){
      let blockTitle = this.GetBlockTitle();
      blockTitle.style.left = x + 'px';
      blockTitle.style.top = y + 'px';
    }
    this.PlaceDuplicateButton = function(x,y){
      let duplicateButton = this.GetDuplicateButton();
      duplicateButton.style.left = x + 'px';
      duplicateButton.style.top = y + 'px';
    }
    this.AppendChildren = function(){
      this.main.appendChild(this.expandButton);
      this.main.appendChild(this.deleteButton);
      this.main.appendChild(this.moveBeforeButton);
      this.main.appendChild(this.moveAfterButton);
      this.main.appendChild(this.blockTitle);
      this.main.appendChild(this.duplicateButton);
    }

    // GET
    this.GetBlockElement = function(){
      return this.main;
    }
    this.GetId = function(){
      return this.blockId;
    }
    this.GetExpandButton = function(){
      return this.expandButton;
    }
    this.GetDeleteButton = function(){
      return this.deleteButton;
    }
    this.GetMoveBeforeButton = function(){
      return this.moveBeforeButton;
    }
    this.GetMoveAfterButton = function(){
      return this.moveAfterButton;
    }
    this.GetBlockTitle = function(){
      return this.blockTitle;
    }
    this.GetDuplicateButton = function(){
      return this.duplicateButton;
    }
    this.GetParentBlock = function(){
      return this.parentBlock;
    }
    this.GetChildBlock = function(){
      return this.childBlock;
    }

    this.MoveBefore = function(){
      if (document.getElementById(this.blockId) !== document.document.getElementById(this.blockId).firstElementChild)
        document.getElementById(this.blockId).parentElement.insertBefore(document.getElementById(this.blockId),document.getElementById(this.blockId).previousElementSibling);
    }
    this.MoveAfter = function(){
      if (document.getElementById(this.blockId) !== document.document.getElementById(this.blockId).lastElementChild 
      && document.getElementById(this.blockId).nextElementSibling)
        document.getElementById(this.blockId).parentElement.insertBefore(document.getElementById(this.blockId).nextElementSibling,document.getElementById(this.blockId));
    }
    this.MoveFirst = function(){
      if (document.getElementById(this.blockId) !== document.document.getElementById(this.blockId).firstElementChild)
        document.getElementById(this.blockId).parentElement.insertBefore(document.getElementById(this.blockId),document.getElementById(this.blockId).firstChild);
    }
    this.MoveLast = function(){
      if (document.getElementById(this.blockId) !== document.document.getElementById(this.blockId).lastElementChild){
        document.getElementById(this.blockId).parentElement.insertBefore(document.getElementById(this.blockId),document.getElementById(this.blockId).parentElement.lastChild);
        document.getElementById(this.blockId).parentElement.insertBefore(document.getElementById(this.blockId).parentElement.lastChild,document.getElementById(this.blockId));
      }
    }
    this.AddToBody = function(){
      document.body.appendChild(this.main);
    }

    this.SetParentBlock = function(ParentSeqBlock){
      this.parentBlock = ParentSeqBlock;
    }
    this.SetChildBlock = function(ChildSeqBlock){
      this.childBlock = ChildSeqBlock;
    }
    this.OnExpand = function(){
      // Setup with SetAsJumpBlock, SetAsMoveToTargets, etc
    }
    this.OnDelete = function(){
      if( confirm('Delete this block?') ){
        if(this.GetParentBlock()){
          this.GetParentBlock().UnbindChildBlock();
          this.parentBlock = null;
        }
        if(this.GetChildBlock()){
          this.GetChildBlock().UnbindParentBlock();
          this.line.BreakConnection();
        }
        this.main.parentElement.removeChild(this.main);
      }
    }
    this.UnbindChildBlock = function(){
      this.childBlock = null;
      this.line.BreakConnection();
    }
    this.UnbindParentBlock = function(){
      this.parentBlock = null;
    }
    this.SetColor =function(color){
      //this.main.style.backgroundColor = color;
      this._color = color;
      this.main.style.background = 'linear-gradient(180deg, transparent, ' + color + ')';
    }
    this.SetBlockTitle =function(text){
      this.GetBlockTitle().innerHTML = text;
    }
    this.SetPosition =function(x,y){
      this.main.style.left = x + 'px';
      this.main.style.top = y + 'px';
    }
    this.SetBorderColor = function( color ){
      this.main.style.borderColor = color;
    }
    this.SetBorderNormalColor = function(){
      this.main.style.borderColor = "white";
    }
    this.SetBorderWaitColor = function (){
      this.main.style.borderColor = "red";
    }

    this.DeactivateMoveBeforeButton = function(){
      this.main.removeChild(this.GetMoveBeforeButton() );
    }
    this.DeactivateMoveAfterButton = function(){
      this.main.removeChild(this.GetMoveAfterButton() );
    }
    this.DeactivateExpandButton = function(){
      this.main.removeChild(this.GetExpandButton() );
    }
    this.DeactivateDeleteButton = function(){
      this.main.removeChild(this.GetDeleteButton() );
    }
    this.DeactivateDuplicateButton = function(){
      this.main.removeChild(this.GetDuplicateButton() );
    }

    this.SetAsStartBlock = function(){
      this.commandList = [];
      this.DeactivateMoveBeforeButton();
      this.SetBlockTitle('START');
      this.DeactivateExpandButton();
      this.DeactivateDeleteButton();
      this.DeactivateDuplicateButton();
      this.SetColor('grey');
      // == OLD INTERFACE ==
      this.SetPosition(300,0);
      // == NEW INTERFACE ==
      this.SetPosition(300,40);
    }
    this.SetAsEndBlock = function(){
      let endblockJsonString = '{"code":0,"indent":0,"parameters":[]}';
      let endblockObject = JSON.parse(endblockJsonString);
      this.commandList = [endblockObject];
      this.DeactivateMoveAfterButton();
      this.SetBlockTitle('END');
      this.DeactivateExpandButton();
      this.DeactivateDeleteButton();
      this.DeactivateDuplicateButton();
      this.SetColor('grey');
      // == OLD INTERFACE ==
      this.SetPosition(350,100);
      // == NEW INTERFACE ==
      this.SetPosition(500,40);
    }
    this.SetAsShowAnimationBlock = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_ShowAnimation').innerText)];
      this.commandOptionsId = ['Div_TargetSelect','Div_AnimationID','Div_MirrorAnimation','Div_WaitForAnimation'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('Command_TargetSelect_InputText').innerText = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('Command_AnimationID').value = this.commandList[0].parameters[3]['AnimationID:num'];
        SetRadioValue('mirroranimation',this.commandList[0].parameters[3]['Mirror:eval'] );
        SetRadioValue('waitforanimation',this.commandList[0].parameters[3]['WaitForAnimation:eval'] );
      }
      this.SetBlockTitle('ANIMATION');
      this.SetColor('yellow');
    }
    this.SetAsJumpBlock = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_Jump').innerText)];
      this.commandOptionsId = ['Div_TargetSelect','Div_JumpHeight','Div_Duration','Div_WaitForJump'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('Command_TargetSelect_InputText').innerText = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('Command_JumpHeight').value = this.commandList[0].parameters[3]['Height:eval'];
        document.getElementById('Command_Duration').value = this.commandList[0].parameters[3]['Duration:eval'];
        SetRadioValue('waitforjump',this.commandList[0].parameters[3]['WaitForJump:eval'] );
      }
      this.SetBlockTitle('JUMP');
      this.SetColor('red');
    }
    this.SetAsMoveToTargetBlock = function(){ // EXAMPLE MAKE BLOCK EDITABLE
      this.commandList = [JSON.parse(document.getElementById('COMMAND_MoveToTarget').innerText)];
      this.commandOptionsId = ['Div_TargetSelect','Div_TargetSelectDestination','Div_Duration','Div_FaceDestination','Div_MovementEasing','Div_MovementMotion','Div_WaitForMovement'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('Command_TargetSelect_InputText').innerText = this.commandList[0].parameters[3]['Targets1:arraystr'];
        document.getElementById('Command_TargetSelectDestination_InputText').innerText = this.commandList[0].parameters[3]['Targets2:arraystr'];
        document.getElementById('Command_TargetLocation_Select').value = this.commandList[0].parameters[3]['TargetLocation:str'];
        document.getElementById('Command_TargetLocation_MeleeDistance').value = this.commandList[0].parameters[3]['MeleeDistance:eval'];
        document.getElementById('Command_OffsetAdjustment_Select').value = this.commandList[0].parameters[3]['OffsetAdjust:str'];
        document.getElementById('Command_OffsetAdjustment_OffsetX').value = this.commandList[0].parameters[3]['OffsetX:eval'];
        document.getElementById('Command_OffsetAdjustment_OffsetY').value = this.commandList[0].parameters[3]['OffsetY:eval'];
        document.getElementById('Command_Duration').value = this.commandList[0].parameters[3]['Duration:eval'];
        SetRadioValue('facedestination',this.commandList[0].parameters[3]['FaceDirection:eval'] );
        document.getElementById('Command_MovementEasing_Select').value = this.commandList[0].parameters[3]['EasingType:str'];
        document.getElementById('Command_MovementMotion_Select').value = this.commandList[0].parameters[3]['MotionType:str'];
        SetRadioValue('waitformovement',this.commandList[0].parameters[3]['WaitForMovement:eval'] );
      }
      this.SetBlockTitle('MOVE');
      this.SetColor('green');
    }
    this.SetAsProjectileAnimationBlock = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_Projectile_Animation').innerText)];
      this.commandOptionsId = ['Div_Projectile_StartLocation','Div_Projectile_EndLocation','Div_Projectile_AnimationID','Div_Projectile_Duration',
      'Div_WaitForProjectile','Div_Projectile_ExtraSettings'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window

        // START LOCATION
        let StartStruct = JSON.parse(this.commandList[0].parameters[3]['Start:struct']);

        SetRadioValue('projectile_start_type',StartStruct['Type:str'] );
        document.getElementById('Command_Projectile_Start_TargetSelect_InputText').innerText = StartStruct['Targets:arraystr'];
        SetRadioValue('projectile_start_centralize',StartStruct['TargetCenter:eval'] );
        document.getElementById('Command_Projectile_Start_TargetLocation_Select').value = StartStruct['TargetLocation:str'] || "middle center";
        document.getElementById('Command_Projectile_Start_PointX').value = StartStruct['PointX:eval'];
        document.getElementById('Command_Projectile_Start_PointY').value = StartStruct['PointY:eval'];
        document.getElementById('Command_Projectile_Start_OffsetX').value = StartStruct['OffsetX:eval'];
        document.getElementById('Command_Projectile_Start_OffsetY').value = StartStruct['OffsetY:eval'];

        this.commandList[0].parameters[3]['Start:struct'] = JSON.stringify(StartStruct);

        // GOAL LOCATION
        let GoalStruct = JSON.parse(this.commandList[0].parameters[3]['Goal:struct']);

        SetRadioValue('projectile_end_type',GoalStruct['Type:str'] );
        document.getElementById('Command_Projectile_End_TargetSelect_InputText').innerText = GoalStruct['Targets:arraystr'];
        SetRadioValue('projectile_end_centralize',GoalStruct['TargetCenter:eval'] );
        document.getElementById('Command_Projectile_End_TargetLocation_Select').value = GoalStruct['TargetLocation:str'] || "middle center";
        document.getElementById('Command_Projectile_End_PointX').value = GoalStruct['PointX:eval'];
        document.getElementById('Command_Projectile_End_PointY').value = GoalStruct['PointY:eval'];
        document.getElementById('Command_Projectile_End_OffsetX').value = GoalStruct['OffsetX:eval'];
        document.getElementById('Command_Projectile_End_OffsetY').value = GoalStruct['OffsetY:eval'];

        this.commandList[0].parameters[3]['Goal:struct'] = JSON.stringify(GoalStruct);

        // SETTINGS
        document.getElementById('Command_Projectile_AnimationID').value = this.commandList[0].parameters[3]['AnimationID:num'];
        document.getElementById('Command_Projectile_Duration').value = this.commandList[0].parameters[3]['Duration:eval'];
        SetRadioValue('waitforprojectile',this.commandList[0].parameters[3]['WaitForProjectile:eval'] );

        // EXTRA SETTINGS
        let ExtraStruct = JSON.parse(this.commandList[0].parameters[3]['Extra:struct']);

        SetRadioValue('projectile_auto_angle',ExtraStruct['AutoAngle:eval'] );
        document.getElementById('Command_Projectile_AngleOffset').value = ExtraStruct['AngleOffset:eval'];
        document.getElementById('Command_Projectile_ArcPeaking').value = ExtraStruct['Arc:eval'];
        document.getElementById('Command_Projectile_Easing_Select').value = ExtraStruct['EasingType:str'];
        document.getElementById('Command_Projectile_SpinSpeed').value = ExtraStruct['Spin:eval'];

        this.commandList[0].parameters[3]['Extra:struct'] = JSON.stringify(ExtraStruct);
      }
      this.SetBlockTitle('PROJ: ANIM');
      this.SetColor('brown');
    }
    this.SetAsProjectileIconBlock = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_Projectile_Icon').innerText)];
      this.commandOptionsId = ['Div_Projectile_StartLocation','Div_Projectile_EndLocation','Div_Projectile_IconID','Div_Projectile_Duration',
      'Div_WaitForProjectile','Div_Projectile_ExtraSettings','Div_Projectile_ExtraSettings_Picture_Icon'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window

        // START LOCATION
        let StartStruct = JSON.parse(this.commandList[0].parameters[3]['Start:struct']);

        SetRadioValue('projectile_start_type',StartStruct['Type:str'] );
        document.getElementById('Command_Projectile_Start_TargetSelect_InputText').innerText = StartStruct['Targets:arraystr'];
        SetRadioValue('projectile_start_centralize',StartStruct['TargetCenter:eval'] );
        document.getElementById('Command_Projectile_Start_TargetLocation_Select').value = StartStruct['TargetLocation:str'] || "middle center";
        document.getElementById('Command_Projectile_Start_PointX').value = StartStruct['PointX:eval'];
        document.getElementById('Command_Projectile_Start_PointY').value = StartStruct['PointY:eval'];
        document.getElementById('Command_Projectile_Start_OffsetX').value = StartStruct['OffsetX:eval'];
        document.getElementById('Command_Projectile_Start_OffsetY').value = StartStruct['OffsetY:eval'];

        this.commandList[0].parameters[3]['Start:struct'] = JSON.stringify(StartStruct);

        // GOAL LOCATION
        let GoalStruct = JSON.parse(this.commandList[0].parameters[3]['Goal:struct']);

        SetRadioValue('projectile_end_type',GoalStruct['Type:str'] );
        document.getElementById('Command_Projectile_End_TargetSelect_InputText').innerText = GoalStruct['Targets:arraystr'];
        SetRadioValue('projectile_end_centralize',GoalStruct['TargetCenter:eval'] );
        document.getElementById('Command_Projectile_End_TargetLocation_Select').value = GoalStruct['TargetLocation:str'] || "middle center";
        document.getElementById('Command_Projectile_End_PointX').value = GoalStruct['PointX:eval'];
        document.getElementById('Command_Projectile_End_PointY').value = GoalStruct['PointY:eval'];
        document.getElementById('Command_Projectile_End_OffsetX').value = GoalStruct['OffsetX:eval'];
        document.getElementById('Command_Projectile_End_OffsetY').value = GoalStruct['OffsetY:eval'];

        this.commandList[0].parameters[3]['Goal:struct'] = JSON.stringify(GoalStruct);

        // SETTINGS
        document.getElementById('Command_Projectile_IconID').value = this.commandList[0].parameters[3]['Icon:eval'];
        document.getElementById('Command_Projectile_Duration').value = this.commandList[0].parameters[3]['Duration:eval'];
        SetRadioValue('waitforprojectile',this.commandList[0].parameters[3]['WaitForProjectile:eval'] );

        // EXTRA SETTINGS
        let ExtraStruct = JSON.parse(this.commandList[0].parameters[3]['Extra:struct']);

        SetRadioValue('projectile_auto_angle',ExtraStruct['AutoAngle:eval'] );
        document.getElementById('Command_Projectile_AngleOffset').value = ExtraStruct['AngleOffset:eval'];
        document.getElementById('Command_Projectile_ArcPeaking').value = ExtraStruct['Arc:eval'];
        document.getElementById('Command_Projectile_Easing_Select').value = ExtraStruct['EasingType:str'];
        document.getElementById('Command_Projectile_SpinSpeed').value = ExtraStruct['Spin:eval'];

        document.getElementById('Command_Projectile_BlendMode_Select').value = ExtraStruct['BlendMode:num'];
        document.getElementById('Command_Projectile_Hue').value = ExtraStruct['Hue:eval'];
        document.getElementById('Command_Projectile_Scale').value = ExtraStruct['Scale:eval'];

        this.commandList[0].parameters[3]['Extra:struct'] = JSON.stringify(ExtraStruct);
      }
      this.SetBlockTitle('PROJ: ICON');
      this.SetColor('brown');
    }
    this.SetAsProjectilePictureBlock = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_Projectile_Picture').innerText)];
      this.commandOptionsId = ['Div_Projectile_StartLocation','Div_Projectile_EndLocation','Div_Projectile_PictureName','Div_Projectile_Duration',
      'Div_WaitForProjectile','Div_Projectile_ExtraSettings','Div_Projectile_ExtraSettings_Picture_Icon'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window

        // START LOCATION
        let StartStruct = JSON.parse(this.commandList[0].parameters[3]['Start:struct']);

        SetRadioValue('projectile_start_type',StartStruct['Type:str'] );
        document.getElementById('Command_Projectile_Start_TargetSelect_InputText').innerText = StartStruct['Targets:arraystr'];
        SetRadioValue('projectile_start_centralize',StartStruct['TargetCenter:eval'] );
        document.getElementById('Command_Projectile_Start_TargetLocation_Select').value = StartStruct['TargetLocation:str'] || "middle center";
        document.getElementById('Command_Projectile_Start_PointX').value = StartStruct['PointX:eval'];
        document.getElementById('Command_Projectile_Start_PointY').value = StartStruct['PointY:eval'];
        document.getElementById('Command_Projectile_Start_OffsetX').value = StartStruct['OffsetX:eval'];
        document.getElementById('Command_Projectile_Start_OffsetY').value = StartStruct['OffsetY:eval'];

        this.commandList[0].parameters[3]['Start:struct'] = JSON.stringify(StartStruct);

        // GOAL LOCATION
        let GoalStruct = JSON.parse(this.commandList[0].parameters[3]['Goal:struct']);

        SetRadioValue('projectile_end_type',GoalStruct['Type:str'] );
        document.getElementById('Command_Projectile_End_TargetSelect_InputText').innerText = GoalStruct['Targets:arraystr'];
        SetRadioValue('projectile_end_centralize',GoalStruct['TargetCenter:eval'] );
        document.getElementById('Command_Projectile_End_TargetLocation_Select').value = GoalStruct['TargetLocation:str'] || "middle center";
        document.getElementById('Command_Projectile_End_PointX').value = GoalStruct['PointX:eval'];
        document.getElementById('Command_Projectile_End_PointY').value = GoalStruct['PointY:eval'];
        document.getElementById('Command_Projectile_End_OffsetX').value = GoalStruct['OffsetX:eval'];
        document.getElementById('Command_Projectile_End_OffsetY').value = GoalStruct['OffsetY:eval'];

        this.commandList[0].parameters[3]['Goal:struct'] = JSON.stringify(GoalStruct);

        // SETTINGS
        document.getElementById('Command_Projectile_PictureName').value = this.commandList[0].parameters[3]['Picture:str'];
        document.getElementById('Command_Projectile_Duration').value = this.commandList[0].parameters[3]['Duration:eval'];
        SetRadioValue('waitforprojectile',this.commandList[0].parameters[3]['WaitForProjectile:eval'] );

        // EXTRA SETTINGS
        let ExtraStruct = JSON.parse(this.commandList[0].parameters[3]['Extra:struct']);

        SetRadioValue('projectile_auto_angle',ExtraStruct['AutoAngle:eval'] );
        document.getElementById('Command_Projectile_AngleOffset').value = ExtraStruct['AngleOffset:eval'];
        document.getElementById('Command_Projectile_ArcPeaking').value = ExtraStruct['Arc:eval'];
        document.getElementById('Command_Projectile_Easing_Select').value = ExtraStruct['EasingType:str'];
        document.getElementById('Command_Projectile_SpinSpeed').value = ExtraStruct['Spin:eval'];

        document.getElementById('Command_Projectile_BlendMode_Select').value = ExtraStruct['BlendMode:num'];
        document.getElementById('Command_Projectile_Hue').value = ExtraStruct['Hue:eval'];
        document.getElementById('Command_Projectile_Scale').value = ExtraStruct['Scale:eval'];

        this.commandList[0].parameters[3]['Extra:struct'] = JSON.stringify(ExtraStruct);
      }
      this.SetBlockTitle('PROJ: PICT');
      this.SetColor('brown');
    }
    this.SetAsWaitBlock = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_Wait').innerText)];
      this.commandOptionsId = ['Div_Wait'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('Command_Wait').value = this.commandList[0].parameters[0];
      }
      this.SetBlockTitle('WAIT');
      this.SetColor('grey');
    }
    this.SetAsShakeScreenBlock = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_ShakeScreen').innerText)];
      this.commandOptionsId = ['Div_ShakeScreen'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('Command_ShakeScreen_Power').value = this.commandList[0].parameters[0];
        document.getElementById('Command_ShakeScreen_Speed').value = this.commandList[0].parameters[1];
        document.getElementById('Command_ShakeScreen_Duration').value = this.commandList[0].parameters[2];
        console.log('Before Radio:' + JSON.stringify(this.commandList[0].parameters[3]));
        SetRadioValue('waitforshakescreen', JSON.stringify(this.commandList[0].parameters[3]) );
        console.log('After Radio:' + JSON.stringify(this.commandList[0].parameters[3]));
      }
      this.SetBlockTitle('SHAKE SCR');
      this.SetColor('grey');
    }
    this.SetAsMechActionEffectBlock = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_Mech_ActionEffect').innerText)];
      this.commandOptionsId = ['Div_Mech_ActionEffect'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        let TargetsArrayString = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('Command_Mech_ActionEffect_InputText').innerText = TargetsArrayString;
  
      }
      this.SetBlockTitle('ACT. EFFECT');
      this.SetColor('blue');
    }
    this.SetAsAnimActionAnimationBlock = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_Anim_ActionAnimation').innerText)];
      this.commandOptionsId = ['Div_Anim_ActionAnimation'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        let TargetsArrayString = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('Command_Anim_ActionAnimation_InputText').innerText = TargetsArrayString;
        SetRadioValue('mirroranimation_actionanimation', this.commandList[0].parameters[3]['Mirror:eval'].toString() || "false" );
        SetRadioValue('waitforanimation_actionanimation', this.commandList[0].parameters[3]['WaitForAnimation:eval'].toString() );
      }
      this.SetBlockTitle('ACT. ANIM');
      this.SetColor('blue');
    }
    this.SetAsDBAnimationBlock = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_DB_Animation').innerText)];
      this.commandOptionsId = ['Div_DB_Animation'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        let TargetsArrayString = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('Command_DB_Animation_Target_InputText').innerText = TargetsArrayString;
        document.getElementById('Command_DB_Animation_MotionAnimation').value = this.commandList[0].parameters[3]['MotionAni:str'];
      }
      this.SetBlockTitle('DB ANIM');
      this.SetColor('pink');
    }
    this.SetAsMoveFloatBlock = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_Float').innerText)];
      this.commandOptionsId = ['Div_Float'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        let TargetsArrayString = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('Command_Float_Target_InputText').innerText = TargetsArrayString;
        document.getElementById('Command_Float_Height').value = this.commandList[0].parameters[3]['Height:eval'];
        document.getElementById('Command_Float_Duration').value = this.commandList[0].parameters[3]['Duration:eval'];
        document.getElementById('Command_Float_Easing_Select').value = this.commandList[0].parameters[3]['EasingType:str'];
        SetRadioValue('waitforfloat', this.commandList[0].parameters[3]['WaitForFloat:eval'].toString() );
      }
      this.SetBlockTitle('FLOAT');
      this.SetColor('yellow');
    }
    this.SetAs_ACSET_FinishAction_Block = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_ACSET_FinishAction').innerText)];
      this.commandOptionsId = ['Div_ACSET_FinishAction'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        SetRadioValue('acset_finishaction_immortaloff', this.commandList[0].parameters[3]['ApplyImmortal:eval'].toString() );
        SetRadioValue('acset_finishaction_waitfornewline', this.commandList[0].parameters[3]['WaitForNewLine:eval'].toString() );
        SetRadioValue('acset_finishaction_waitforeffects', this.commandList[0].parameters[3]['WaitForEffect:eval'].toString() );
        SetRadioValue('acset_finishaction_clearbattlelog', this.commandList[0].parameters[3]['ClearBattleLog:eval'].toString() );
        SetRadioValue('acset_finishaction_homereset', this.commandList[0].parameters[3]['ActionEnd:eval'].toString() );
        SetRadioValue('acset_finishaction_waitformovement', this.commandList[0].parameters[3]['WaitForMovement:eval'].toString() );
      }
      this.SetBlockTitle('FINISH ACT.');
      this.SetColor('white');
    }
    this.SetAs_ACSET_SetupAction_Block = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_ACSET_SetupAction').innerText)];
      this.commandOptionsId = ['Div_ACSET_SetupAction'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        SetRadioValue('acset_setupaction_displayaction', this.commandList[0].parameters[3]['DisplayAction:eval'].toString() );
        SetRadioValue('acset_setupaction_immortal_on', this.commandList[0].parameters[3]['ApplyImmortal:eval'].toString() );
        SetRadioValue('acset_setupaction_battlestep', this.commandList[0].parameters[3]['ActionStart:eval'].toString() );
        SetRadioValue('acset_setupaction_waitformovement', this.commandList[0].parameters[3]['WaitForMovement:eval'] );
        SetRadioValue('acset_setupaction_castanimation', this.commandList[0].parameters[3]['CastAnimation:eval'].toString() );
        SetRadioValue('acset_setupaction_waitforanimation', this.commandList[0].parameters[3]['WaitForAnimation:eval'].toString() );
      }
      this.SetBlockTitle('SETUP ACT.');
      this.SetColor('white');
    }
    this.SetAs_MOVE_MoveToPoint_Block = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_MOVE_MoveToPoint').innerText)];
      this.commandOptionsId = ['Div_MOVE_MoveToPoint'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('Command_MOVE_MoveToPoint_TargetSelect_InputText').innerText = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('Command_MOVE_MoveToPoint_DestinationPoint_InputText').innerText = this.commandList[0].parameters[3]['Destination:str'];
        document.getElementById('Command_MOVE_MoveToPoint_OffsetAdjustment_Select').value = this.commandList[0].parameters[3]['OffsetAdjust:str'];
        document.getElementById('Command_MOVE_MoveToPoint_OffsetX').value = this.commandList[0].parameters[3]['OffsetX:eval'];
        document.getElementById('Command_MOVE_MoveToPoint_OffsetY').value = this.commandList[0].parameters[3]['OffsetY:eval'];
        document.getElementById('Command_MOVE_MoveToPoint_Duration').value = this.commandList[0].parameters[3]['Duration:eval'];
        SetRadioValue('move_movetopoint_facedestination',this.commandList[0].parameters[3]['FaceDirection:eval'] );
        document.getElementById('Command_MOVE_MoveToPoint_MovementEasing_Select').value = this.commandList[0].parameters[3]['EasingType:str'];
        document.getElementById('Command_MOVE_MoveToPoint_MovementMotion_Select').value = this.commandList[0].parameters[3]['MotionType:str'];
        SetRadioValue('move_movetopoint_waitformovement',this.commandList[0].parameters[3]['WaitForMovement:eval'] );
      }
      this.SetBlockTitle('MOVE TO POINT');
      this.SetColor('green');
    }
    this.SetAs_MOTION_MotionType_Block = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_MOTION_MotionType').innerText)];
      this.commandOptionsId = ['Div_MOTION_MotionType'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('Command_MOTION_MotionType_TargetSelect_InputText').innerText = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('Command_MOTION_MotionType_MotionType_Select').value = this.commandList[0].parameters[3]['MotionType:str'];
        SetRadioValue('motion_motiontype_showweapon',this.commandList[0].parameters[3]['ShowWeapon:eval'] );
      }
      this.SetBlockTitle('MOTION TYPE');
      this.SetColor('orange');
    }
    this.SetAs_CommonEvent_Block = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_CommonEvent').innerText)];
      this.commandOptionsId = ['Div_COMMAND_CommonEvent'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById("Command_CommonEvent_InputText").value = this.commandList[0].parameters[0];
      }
      this.SetBlockTitle('COMMON EVENT');
      this.SetColor('grey');
    }
    this.SetAs_MOVE_SpinRotate = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_SpinRotate').innerText)];
      this.commandOptionsId = ['Div_COMMAND_SpinRotate'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('Command_COMMAND_SpinRotate_TargetSelect_InputText').innerText = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('Command_COMMAND_SpinRotate_Angle_InputText').value = this.commandList[0].parameters[3]['Angle:eval'];
        document.getElementById('Command_COMMAND_SpinRotate_Duration_InputText').value = this.commandList[0].parameters[3]['Duration:eval'];
        document.getElementById('Command_COMMAND_SpinRotate_Easing_Select').value = this.commandList[0].parameters[3]['EasingType:str'];
        SetRadioValue('command_spinrotate_revertonfinish',this.commandList[0].parameters[3]['RevertAngle:eval'] );
        SetRadioValue('command_spinrotate_waitforspin',this.commandList[0].parameters[3]['WaitForSpin:eval'] );
      }
      this.SetBlockTitle('SPIN');
      this.SetColor('green');
    }
    this.SetAs_ZOOM_Scale = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_ZOOM_Scale').innerText)];
      this.commandOptionsId = ['Div_COMMAND_ZOOM_Scale'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('COMMAND_ZOOM_Scale_Scale_InputText').value = this.commandList[0].parameters[3]['Scale:eval'];
        document.getElementById('COMMAND_ZOOM_Scale_Duration_InputText').value = this.commandList[0].parameters[3]['Duration:eval'];
        document.getElementById('COMMAND_ZOOM_Scale_Easing_Select').value = this.commandList[0].parameters[3]['EasingType:str'];
        SetRadioValue('zoom_scale_waitforzoom',this.commandList[0].parameters[3]['WaitForZoom:eval'] );

      }
      this.SetBlockTitle('ZOOM:Scale');
      this.SetColor('green');
    }
    this.SetAs_MOVE_FACEDIRECTION = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_MOVE_FaceDirection').innerText)];
      this.commandOptionsId = ['Div_COMMAND_MOVE_FaceDirection'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('COMMAND_MOVE_FaceDirection_Target_TargetSelect_InputText').innerText = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('COMMAND_MOVE_FaceDirection_Direction_Select').value = this.commandList[0].parameters[3]['Direction:str'];
      }
      this.SetBlockTitle('MOVE:Fc.Dir');
      this.SetColor('green');
    }
    this.SetAs_MOVE_MoveDistance = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_MoveDistance').innerText)];
      this.commandOptionsId = ['Div_COMMAND_MOVE_Distance'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('COMMAND_MOVE_Distance_Target_TargetSelect_InputText').innerText = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('COMMAND_MOVE_Distance_DistanceAdjustment_Select').value = this.commandList[0].parameters[3]['DistanceAdjust:str'];
        document.getElementById('COMMAND_MOVE_Distance_DistanceAdjustment_X').value = this.commandList[0].parameters[3]['DistanceX:eval'];
        document.getElementById('COMMAND_MOVE_Distance_DistanceAdjustment_Y').value = this.commandList[0].parameters[3]['DistanceY:eval'];
        document.getElementById('COMMAND_MOVE_Distance_Duration_InputText').value = this.commandList[0].parameters[3]['Duration:eval'];
        SetRadioValue('move_movedistance_facedestination',this.commandList[0].parameters[3]['FaceDirection:eval'] );
        document.getElementById('COMMAND_MOVE_Distance_Movement_Easing_Select').value = this.commandList[0].parameters[3]['EasingType:str'];
        document.getElementById('COMMAND_MOVE_Distance_MotionType_Select').value = this.commandList[0].parameters[3]['MotionType:str'];
        SetRadioValue('move_movedistance_waitformovement',this.commandList[0].parameters[3]['WaitForMovement:eval'] );
      }
      this.SetBlockTitle('MOVE:Distance');
      this.SetColor('green');
    }
    this.SetAs_IMPACT_ColorBreak = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_IMPACT_ColorBreak').innerText)];
      this.commandOptionsId = ['Div_COMMAND_IMPACT_ColorBreak'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('COMMAND_IMPACT_ColorBreak_Intensity_InputText').value = this.commandList[0].parameters[3]['Intensity:eval'];
        document.getElementById('COMMAND_IMPACT_ColorBreak_Duration_InputText').value = this.commandList[0].parameters[3]['Duration:eval'];
        document.getElementById('COMMAND_IMPACT_ColorBreak_Easing_Select').value = this.commandList[0].parameters[3]['EasingType:str'];
      }
      this.SetBlockTitle('COLOR BRK');
      this.SetColor('red');
    }
    this.SetAs_MOVE_Opacity = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_MOVE_Opacity').innerText)];
      this.commandOptionsId = ['Div_COMMAND_MOVE_Opacity'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('COMMAND_MOVE_Opacity_TargetSelect_InputText').innerText = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('COMMAND_MOVE_Opacity_Amount_InputText').value = this.commandList[0].parameters[3]['Opacity:eval'];
        document.getElementById('COMMAND_MOVE_Opacity_Duration_InputText').value = this.commandList[0].parameters[3]['Duration:eval'];
        document.getElementById('COMMAND_MOVE_Opacity_Easing_Select').value = this.commandList[0].parameters[3]['EasingType:str'];
        SetRadioValue('move_opacity_waitforopacity',this.commandList[0].parameters[3]['WaitForOpacity:eval'] );
      }
      this.SetBlockTitle('OPACITY');
      this.SetColor('red');
    }
    this.SetAs_MOTIONTRAIL_Create = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_MOTIONTRAIL_Create').innerText)];
      this.commandOptionsId = ['Div_COMMAND_MOTIONTRAIL_Create'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('COMMAND_MOTIONTRAIL_Create_TargetSelect_InputText').innerText = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('COMMAND_MOTIONTRAIL_Create_Delay_InputText').value = this.commandList[0].parameters[3]['delay:num'];
        document.getElementById('COMMAND_MOTIONTRAIL_Create_Duration_InputText').value = this.commandList[0].parameters[3]['duration:num'];
        document.getElementById('COMMAND_MOTIONTRAIL_Create_Hue_InputText').value = this.commandList[0].parameters[3]['hue:num'];
        document.getElementById('COMMAND_MOTIONTRAIL_Create_StartingOpacity_InputText').value = this.commandList[0].parameters[3]['opacityStart:num'];
        document.getElementById('COMMAND_MOTIONTRAIL_Create_ColorTone_InputText').value = this.commandList[0].parameters[3]['tone:eval'];
      }
      this.SetBlockTitle('M.TRAIL Create');
      this.SetColor('orange');
    }
    this.SetAs_MOTIONTRAIL_Remove = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_MOTIONTRAIL_Remove').innerText)];
      this.commandOptionsId = ['Div_COMMAND_MOTIONTRAIL_Remove'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('COMMAND_MOTIONTRAIL_Remove_TargetSelect_InputText').innerText = this.commandList[0].parameters[3]['Targets:arraystr'];
      }
      this.SetBlockTitle('M.TRAIL Remove');
      this.SetColor('orange');
    }
    this.SetAs_CAMERA_FocusTarget = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_CAMERA_FOCUSTARGET').innerText)];
      this.commandOptionsId = ['Div_COMMAND_CAMERA_FOCUSTARGET'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('COMMAND_CAMERA_FOCUSTARGET_TargetSelect_InputText').innerText = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('COMMAND_CAMERA_FOCUSTARGET_Duration_InputText').value = this.commandList[0].parameters[3]['Duration:eval'];
        document.getElementById('COMMAND_CAMERA_FOCUSTARGET_Easing_Select').value = this.commandList[0].parameters[3]['EasingType:str'];
        SetRadioValue('camera_focustarget_waitforcamera',this.commandList[0].parameters[3]['WaitForCamera:eval'] );
      }
      this.SetBlockTitle('CAM.FOCUS:Target');
      this.SetColor('green');
    }
    this.SetAs_CAMERA_FocusPoint = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_CAMERA_FOCUSPOINT').innerText)];
      this.commandOptionsId = ['Div_COMMAND_CAMERA_FOCUSPOINT'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('COMMAND_CAMERA_FOCUSPOINT_X_InputText').value = this.commandList[0].parameters[3]['FocusX:eval'];
        document.getElementById('COMMAND_CAMERA_FOCUSPOINT_Y_InputText').value = this.commandList[0].parameters[3]['FocusY:eval'];
        document.getElementById('COMMAND_CAMERA_FOCUSPOINT_Duration_InputText').value = this.commandList[0].parameters[3]['Duration:eval'];
        document.getElementById('COMMAND_CAMERA_FOCUSPOINT_Easing_Select').value = this.commandList[0].parameters[3]['EasingType:str'];
        SetRadioValue('camera_focuspoint_waitforcamera',this.commandList[0].parameters[3]['WaitForCamera:eval'] );
      }
      this.SetBlockTitle('CAM.FOCUS:Point');
      this.SetColor('green');
    }
    this.SetAs_IMPACT_Shockwave_EachTarget = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_IMPACT_Shockwave_EachTarget').innerText)];
      this.commandOptionsId = ['Div_COMMAND_IMPACT_Shockwave_EachTarget'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('COMMAND_IMPACT_Shockwave_EachTarget_TargetSelect_InputText').innerText = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('COMMAND_IMPACT_Shockwave_EachTarget_TargetLocation_Select').value = this.commandList[0].parameters[3]['TargetLocation:str'];
        document.getElementById('COMMAND_IMPACT_Shockwave_EachTarget_OffsetX_InputText').value = this.commandList[0].parameters[3]['OffsetX:eval'];
        document.getElementById('COMMAND_IMPACT_Shockwave_EachTarget_OffsetY_InputText').value = this.commandList[0].parameters[3]['OffsetY:eval'];
        document.getElementById('COMMAND_IMPACT_Shockwave_EachTarget_Amplitude_InputText').value = this.commandList[0].parameters[3]['Amp:eval'];
        document.getElementById('COMMAND_IMPACT_Shockwave_EachTarget_Wavelength_InputText').value = this.commandList[0].parameters[3]['Wave:eval'];
        document.getElementById('COMMAND_IMPACT_Shockwave_EachTarget_Duration_InputText').value = this.commandList[0].parameters[3]['Duration:eval'];
      }
      this.SetBlockTitle('ShkWave:EachTarget');
      this.SetColor('orange');
    }
    this.SetAs_MOTION_FreezeMotionFrame_Block = function(){
      this.commandList = [JSON.parse(document.getElementById('COMMAND_MOTION_FreezeMotionFrame').innerText)];
      this.commandOptionsId = ['Div_MOTION_FreezeMotionFrame'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        // Show Data in Window
        document.getElementById('Command_MOTION_FreezeMotionFrame_TargetSelect_InputText').innerText = this.commandList[0].parameters[3]['Targets:arraystr'];
        document.getElementById('Command_MOTION_FreezeMotionFrame_MotionType_Select').value = this.commandList[0].parameters[3]['MotionType:str'];
        document.getElementById('COMMAND_MOTION_FreezeMotionFrame_FrameIndex_InputText').value = this.commandList[0].parameters[3]['Frame:num'];
        SetRadioValue('motion_freezemotionframe_showweapon',this.commandList[0].parameters[3]['ShowWeapon:eval'] );
      }
      this.SetBlockTitle('MOTION: Freeze Frame');
      this.SetColor('blue');
    };
    this.SetAsFlashScreenBlock = function() {
      this.commandList = [JSON.parse(document.getElementById('COMMAND_FlashScreen').innerText)];
      this.commandOptionsId = ['Div_COMMAND_FlashScreen'];
      this.OnExpand = function(){
        // Set Up Window
        CommandOptionsWindow_StartEdit(this);
        
        // Reference parameters
        this.parameters = this.commandList[0].parameters;

        // Show Data in Window
        this.data = {};
        this.data.red =  Number(this.parameters[0][0]); 
        this.data.green =  Number(this.parameters[0][1]); 
        this.data.blue =  Number(this.parameters[0][2]);
        this.data.intensity =  Number(this.parameters[0][3]);
        this.data.duration =  Number(this.parameters[1]);
        this.data.waitForFlash =  this.parameters[2];

        document.getElementById('flashscreen_color').value = GetHex(this.data.red, this.data.green, this.data.blue);
        document.getElementById('flashcreen_intensity').value = this.data.intensity;
        document.getElementById('flashcreen_duration').value = this.data.duration;
        SetRadioValue('flashscreen_radio_waitForFlash', this.data.waitForFlash.toString());
      }
      this.SetBlockTitle('FLASH SCR');
      this.SetColor('grey');
    };
    this.SetAsScaleBlock = function() {
      this.commandList = [JSON.parse(document.getElementById('COMMAND_Scale').innerText)];
      this.commandOptionsId = ['Div_COMMAND_Scale'];
      this.parameters = this.commandList[0].parameters[3];
      this.OnExpand = function() {
        CommandOptionsWindow_StartEdit(this);
        document.getElementById('COMMAND_Scale_TargetSelect_InputText').innerText = this.parameters["Targets:arraystr"];
        document.getElementById('COMMAND_Scale_ScaleX').value = this.parameters["ScaleX:eval"];
        document.getElementById('COMMAND_Scale_ScaleY').value = this.parameters["ScaleY:eval"];
        document.getElementById('COMMAND_Scale_Duration').value = this.parameters["Duration:eval"];
        document.getElementById('COMMAND_Scale_Easing_Select').value = this.parameters["EasingType:str"];
        SetRadioValue('command_scale_radio_waitForScale', this.parameters["WaitForScale:eval"]);
      }
      this.SetBlockTitle('SCALE');
      this.SetColor('green');
    };
    this.SetAsSkewBlock = function() {
      this.commandList = [JSON.parse(document.getElementById('COMMAND_Skew').innerText)];
      this.commandOptionsId = ['Div_COMMAND_Skew'];
      this.parameters = this.commandList[0].parameters[3];
      this.OnExpand = function() {
        CommandOptionsWindow_StartEdit(this);
        document.getElementById('COMMAND_Skew_TargetSelect_InputText').innerText = this.parameters["Targets:arraystr"];
        document.getElementById('COMMAND_Skew_SkewX').value = this.parameters["SkewX:eval"];
        document.getElementById('COMMAND_Skew_SkewY').value = this.parameters["SkewY:eval"];
        document.getElementById('COMMAND_Skew_Duration').value = this.parameters["Duration:eval"];
        document.getElementById('COMMAND_Skew_Easing_Select').value = this.parameters["EasingType:str"];
        SetRadioValue('command_skew_radio_waitForSkew', this.parameters["WaitForSkew:eval"]);
      }
      this.SetBlockTitle('SKEW');
      this.SetColor('green');
    };
    this.SetAsOnceParallelBlock = function() {
      this.commandList = [JSON.parse(document.getElementById('COMMAND_OnceParallel').innerText)];
      this.commandOptionsId = ['Div_COMMAND_OnceParallel'];
      this.parameters = this.commandList[0].parameters[3];
      this.OnExpand = function() {
        CommandOptionsWindow_StartEdit(this);
        document.getElementById("COMMAND_MECH_ONCEPARALLEL_commonEventId").value = this.parameters["CommonEventID:num"];
      };
      this.SetBlockTitle('ONCE PRLL');
      this.SetColor('orange');
    };
    
    this.CopyAttributesTo = function(target){ // target is a Sequence Block Object
      switch(this.GetBlockTitle().innerHTML){
        // Check the Block Title
        case 'ANIMATION': target.SetAsShowAnimationBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'JUMP': target.SetAsJumpBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'MOVE': target.SetAsMoveToTargetBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'PROJ: ANIM': target.SetAsProjectileAnimationBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'PROJ: ICON': target.SetAsProjectileIconBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'PROJ: PICT': target.SetAsProjectilePictureBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'WAIT': target.SetAsWaitBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'SHAKE SCR': target.SetAsShakeScreenBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'FLASH SCR': target.SetAsFlashScreenBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'ACT. EFFECT': target.SetAsMechActionEffectBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'ONCE PRLL': target.SetAsOnceParallelBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'ACT. ANIM': target.SetAsAnimActionAnimationBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'DB ANIM': target.SetAsDBAnimationBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'FLOAT': target.SetAsMoveFloatBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'FINISH ACT.': target.SetAs_ACSET_FinishAction_Block(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'SETUP ACT.': target.SetAs_ACSET_SetupAction_Block(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'MOVE TO POINT': target.SetAs_MOVE_MoveToPoint_Block(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'MOTION TYPE': target.SetAs_MOTION_MotionType_Block(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'COMMON EVENT': target.SetAs_CommonEvent_Block(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'SPIN': target.SetAs_MOVE_SpinRotate(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'ZOOM:Scale': target.SetAs_ZOOM_Scale(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'MOVE:Fc.Dir': target.SetAs_MOVE_FACEDIRECTION(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'MOVE:Distance': target.SetAs_MOVE_MoveDistance(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'COLOR BRK': target.SetAs_IMPACT_ColorBreak(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'OPACITY': target.SetAs_MOVE_Opacity(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'SCALE': target.SetAsScaleBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'SKEW': target.SetAsSkewBlock(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'M.TRAIL Create': target.SetAs_MOTIONTRAIL_Create(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'M.TRAIL Remove': target.SetAs_MOTIONTRAIL_Remove(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'CAM.FOCUS:Target': target.SetAs_CAMERA_FocusTarget(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'CAM.FOCUS:Point': target.SetAs_CAMERA_FocusPoint(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'ShkWave:EachTarget': target.SetAs_IMPACT_Shockwave_EachTarget(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        case 'MOTION: Freeze Frame': target.SetAs_MOTION_FreezeMotionFrame_Block(); target.commandList = JSON.parse(JSON.stringify(this.commandList)); break;
        default: console.log('Wrong Copy Type'); break;
      }
    }
    this.CreateCopy = function(){
      let newBlock = new SequenceBlock(CurrentBlockId);
      Blocks.push(newBlock);
      CurrentBlockId++;
      this.CopyAttributesTo(newBlock);
    }

    this.CreateElements();
    this.AddToBody();

    return this;

  }// END OF SequenceBlock()
