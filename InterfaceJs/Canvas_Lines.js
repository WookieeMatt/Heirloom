// == SETTINGS FOR NEW INTERFACE ==
const LinesSettings = Object.freeze({
  offset: [-115, -10],
  mouseOffset: [-13,-20]
});

/*
// == SETTINGS FOR OLD INTERFACE ==
const LinesSettings = Object.freeze({
  offset: [0, 0],
  mouseOffset: [0,0]
});
*/

BlocksContainerCanvas = document.createElement('canvas');
      BlocksContainerCanvas.width = 1920;
      BlocksContainerCanvas.height = 1080;
      // WIDTH/HEIGHT 100% moves lines only but not blocks => ugly
      //BlocksContainerCanvas.style.width = "100%";
      //BlocksContainerCanvas.style.height = "100%";
      BlocksContainerCanvas.style.top = '0';
      BlocksContainerCanvas.style.left = '0';
      BlocksContainerCanvas.style.position = 'relative';
      BlocksContainerCanvas.style.zIndex = '90';
      // == NEW INTERFACE ==
      BlocksContainerCanvas.containerElement = document.getElementById("NodesCanvasContainer");
      BlocksContainerCanvas.containerElement.appendChild(BlocksContainerCanvas);
      // == OLD INTERFACE
      //document.body.appendChild(BlocksContainerCanvas);

      BlocksContainerCanvas.context = BlocksContainerCanvas.getContext("2d");

      Lines = [];
      Canvas_AddLine = function(line){
        if(Lines.filter(el=>(el===line).length == 0) )
          Lines.push(line);
      }
      Canvas_RemoveLine = function(line){
        Lines = Lines.filter( el=>(el!==line) );
      }

      function Line(){
          this.line = {StartX: 0,StartY: 0,EndX:0,EndY:0 };
          this.connectedElementStart = null;
          this.connectedElementEnd = null;
          this.connected = false;
          this.SetStart = function(x,y){
            this.line.StartX = x + LinesSettings.offset[0];
            this.line.StartY = y + LinesSettings.offset[1];
          }
          this.SetEnd = function(x,y){
            this.line.EndX = x + LinesSettings.offset[0];
            this.line.EndY = y + LinesSettings.offset[1];
          }
          this.ConnectStart = function(element){
            this.connectedElementStart = element;
            let elementRect = this.connectedElementStart.getBoundingClientRect();
            this.line.StartX = elementRect.left + LinesSettings.offset[0];
            this.line.StartY = elementRect.top + LinesSettings.offset[1];
          }
          this.ConnectEnd = function(element){
            this.connectedElementEnd = element;
            let elementRect = this.connectedElementEnd.getBoundingClientRect();
            this.line.EndX = elementRect.left + LinesSettings.offset[0];
            this.line.EndY = elementRect.top + LinesSettings.offset[1];
          }
          this.AttemptConnectionFrom = function(element){
            this.ConnectStart(element);
            this.connectedElementEnd = null; // so it connects with mouse
            Canvas_AddLine(this);
          }
          this.BreakConnection = function(){
            this.connectedElementStart = null;
            this.connectedElementEnd = null;
            Canvas_RemoveLine(this);
          }
          this.IsAttemptingConnection = function(){
              let ret = false;
              if(this.connectedElementStart && !this.connectedElementEnd)
                ret = true;
              return ret;
          }
          this.onMouseMoveAction = function(){
            let startRect = {left: 0, top:0};
            if(this.connectedElementStart)
              startRect = this.connectedElementStart.getBoundingClientRect();
            let endRect = {left: 0, top:0};
            if(this.connectedElementEnd){
              endRect = this.connectedElementEnd.getBoundingClientRect();
            } else {
              endRect = {
                left: document.GetMousePosition().left + LinesSettings.mouseOffset[0],
                top: document.GetMousePosition().top + LinesSettings.mouseOffset[1]
              };
            }
            this.line.StartX = startRect.left + LinesSettings.offset[0];
            this.line.StartY = startRect.top + LinesSettings.offset[1];
            this.line.EndX = endRect.left + LinesSettings.offset[0];
            this.line.EndY = endRect.top + LinesSettings.offset[1];
          }
          OnMouseMove_Action_Add(this.onMouseMoveAction.bind(this));
          this.GetStart = function(){
            let ret = {};
            ret.x = this.line.StartX + LinesSettings.offset[0];
            ret.y = this.line.StartY + LinesSettings.offset[1];
            return ret;
          }
          this.GetEnd = function(){
            let ret = {};
            ret.x = this.line.EndX + LinesSettings.offset[0];
            ret.y = this.line.EndY + LinesSettings.offset[1];
            return ret;
          }
          return this;
      }
      
      function TraceLines(){
        BlocksContainerCanvas.context.clearRect(0,0,BlocksContainerCanvas.width,BlocksContainerCanvas.height);
        for(const line of Lines){
          let minDistForCurve = 90;
          var ctx = BlocksContainerCanvas.context;
          ctx.beginPath();
          ctx.moveTo(line.GetStart().x,line.GetStart().y);
          //ctx.lineTo(line.GetEnd().x,line.GetEnd().y);
          ctx.bezierCurveTo(line.GetStart().x+minDistForCurve,line.GetStart().y, line.GetEnd().x-minDistForCurve,line.GetEnd().y, line.GetEnd().x,line.GetEnd().y);
          ctx.lineWidth = 5;
          ctx.strokeStyle = '#ededed';
          ctx.stroke();
        }
      }