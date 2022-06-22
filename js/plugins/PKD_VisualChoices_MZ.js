/*
 * Copyright (c) 2021 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *
* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

 */

 // * CHANGELOG ===================
 //
 // v1.0 (20.04.2021)
 //    - Release
 // ===============================

/*:
 * @plugindesc (v.1.0)[PRO] Visual choices
 * @author Pheonix KageDesu
 * @target MZ
 * @url http://kdworkshop.net/plugins/visual-choices
 *
 * 
 * @help
 * This plugin allows you to create visual buttons and replace standard
 * choices with them. To configure the visual buttons, use the plugin parameters
 * (or .json files). The plugin has plugin commands to set a visual choices
 * groups instead of the usual one.
 * 
 * I recommend try the demo project and read the guide:
 * https://kdworkshop.net/visual-choices-plugin-guide/
 *
 * Plugin contains plugin commands
 *
 * Thanks to Rehmlok for plugin idea
 * ---------------------------------------------------------------------------
  *
  *
 * If you like my Plugins, want more and offten updates,
 * please support me on Patreon!
 * 
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 * 
 * License: Creative Commons 4.0 Attribution, Share Alike, Commercial

 * 

 * @param visualItems:structA
 * @text Items
 * @type struct<LVisItem>[]
 * @default []
 * @desc Visual choices
 * 
 * @param menus:structA
 * @text Choice Groups
 * @type struct<LMenuGroup>[]
 * @default []
 * @desc Visual Choices Groups
 * 
 * @param tooltipSettingsGroup
 * @text Tooltips Settings
 * 
 * @param toolTipDelay:int
 * @parent tooltipSettingsGroup
 * @text Delay
 * @type number
 * @default 10
 * @min 0
 * @desc Delay in frames before tooltip will be displayed
 * 
 * @param toolTipAppearSpeed:int
 * @parent tooltipSettingsGroup
 * @text Appear Speed
 * @type number
 * @default 20
 * @min 0
 * @desc Spped in frames how fast tooltip will appear (from zero opacity)
 * 
 * @param toolTipHideSpeed:int
 * @parent tooltipSettingsGroup
 * @text Hide Speed
 * @type number
 * @default 30
 * @min 0
 * @desc Spped in frames how fast tooltip will hide (to zero opacity)
 * 
 * 
 * 


 * @command OpenVisualChoice
 * @text Visual Choices
 * @desc Show next choices as Visual Choices
 * 
 * @arg menuId
 * @text Group ID
 * @type text
 * @desc Group ID from Choice Groups plugin parameter  
 * 
 * @arg posType
 * @text Position type
 * @desc Anchor for visual choice menu position. Any number - event ID. 0 - Player, -1 - current event ID, -2 - on screen
 * @type number
 * @min -2
 * @default -2
 * 
 * @arg screenXY
 * @text Screen Position
 * @parent posType
 * @desc Position on screen for visual choice menu position. Position type should be -2
 * @type struct<XY>
 * @default {"x:int":"0","y:int":"0"}
 * 
 * @arg headerText
 * @text Header Text
 * @type text
 * @desc Visual choices menu header (title) text [optional]
 * 
 * @arg source
 * @text Settings from
 * @type select
 * @option Plugin parameters
 * @option Json files
 * @default Plugin parameters
 * @desc Where you define menu and items for this choice?
 * 
 * 
 * 


 */

/*~struct~LMenuGroup:

 * @param menuId
 * @text ID
 * @type text
 * @desc [Required] Unique ID for this visual choices menu. Used in Visual Choice plugin command
 * @default myMenu

 * @param offset:struct
 * @text Offset
 * @type struct<XY>
 * @default {"x:int":"0","y:int":"0"}
 * @desc Position offset relative binding point

 * @param headerText:struct
 * @text Title
 * @type struct<LCText>
 * @default {"text":"","size:struct":"{\"w:int\":\"100\",\"h:int\":\"100\"}","margins:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}","outline:struct":"{\"color:css\":\"#000000\",\"width:int\":\"3\"}","font:struct":"{\"face:str\":\"\",\"size:int\":\"24\",\"italic:bool\":\"false\"}"}
 * @desc [Optional] Choices group title
 
 * @param animation:struct
 * @text Animation
 * @type struct<LCMAnimation>
 * @desc Open and close animation settings
 * @default {"openDuration":"0.5","closeDuration":"0.3","opacityChangePerFrame:i":"10"}

 * @param choicesGroup
 * @text Choices Positions

 * @param choicePos1:struct
 * @parent choicesGroup
 * @text Choice #1
 * @type struct<LCMChoicePos>
 * @desc Start and end position for choice in this menu
 * @default {"positionS:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}","positionE:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}"}

 * @param choicePos2:struct
 * @parent choicesGroup
 * @text Choice #2
 * @type struct<LCMChoicePos>
 * @desc Start and end position for choice in this menu
 * @default {"positionS:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}","positionE:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}"}

 * @param choicePos3:struct
 * @parent choicesGroup
 * @text Choice #3
 * @type struct<LCMChoicePos>
 * @desc Start and end position for choice in this menu
 * @default {"positionS:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}","positionE:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}"}

 * @param choicePos4:struct
 * @parent choicesGroup
 * @text Choice #4
 * @type struct<LCMChoicePos>
 * @desc Start and end position for choice in this menu
 * @default {"positionS:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}","positionE:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}"}

 * @param choicePos5:struct
 * @parent choicesGroup
 * @text Choice #5
 * @type struct<LCMChoicePos>
 * @desc Start and end position for choice in this menu
 * @default {"positionS:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}","positionE:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}"}

 * @param choicePos6:struct
 * @parent choicesGroup
 * @text Choice #6
 * @type struct<LCMChoicePos>
 * @desc Start and end position for choice in this menu
 * @default {"positionS:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}","positionE:struct":"{\"x:int\":\"0\",\"y:int\":\"0\"}"}

*/

/*~struct~LCMChoicePos:

 @param positionS:struct
 @text Start
 @type struct<XY>
 @desc Position when menu is starts open
 @default 
 

 @param positionE:struct
 @text End
 @type struct<XY>
 @desc Position when menu is opened
 @default 
 
*/

/*~struct~LCMAnimation:

 @param openDuration
 @text Open duration
 @type number
 @decimals 2
 @min 0
 @max 2
 @desc Menu open animation duration (in seconds)
 @default 0.5
 

 @param closeDuration
 @text Close duration
 @type number
 @decimals 2
 @min 0
 @max 2
 @desc Menu close animation duration (in seconds)
 @default 0.3
 

 @param opacityChangePerFrame:i
 @text Opacity Rate
 @type number
 @min 0
 @max 255
 @desc Opacity value increase per frame
 @default 10
 
*/

/*~struct~LVisItem:

 * @param choiceId
 * @text ID
 * @type text
 * @desc [Required] Unique ID for this visual choice item. No spaces! Used in Show Choices event command
 * @default myChoice

 * @param main
 * @text Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc [Required] Image of this visual item

 * @param hover
 * @text Hovered Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default
 * @desc [Required] Image of this visual item when hovered (selected) by mouse

 * @param conditionGroup
 * @text Disabled Condition

 * @param condition
 * @parent conditionGroup
 * @text Switch ID or Script
 * @default
 * @desc [Optional] Condition for item state. If False - disabled. Any Number - game switch ID or Script

 * @param desaturate:b
 * @text Is Desaturate?
 * @parent conditionGroup
 * @default true
 * @desc Desaturate image when choice item is disabled? (Condition == false)

 * @param buttonText:struct
 * @text Caption
 * @type struct<LCText>
 * @desc [Optional] Default text on visual choice item (can be empty or modified in Show Choices event command)

 * @param tooltipText:struct
 * @text Tooltip
 * @type struct<LCText>
 * @desc [Optional] Tooltip text (when you hover or select visual choice item) 

 * @param disabledTooltipText:struct
 * @text Disabled Tooltip
 * @type struct<LCText>
 * @desc [Optional] Tooltip text (when visual choice item is disabled by condition)
 

*/

/*~struct~LCText:
 * @param text
 * @text Text
 * @desc Supports control characters (\V[x], \I[x], etc)
 * 
 * @param size:struct
 * @text TextBox Size
 * @type struct<WH>
 * @default
 * @desc Size of text zone
 * 
 * @param margins:struct
 * @text Margin
 * @type struct<XY>
 * @default
 * @desc Position of text, relative parent
 * 
 * @param outline:struct
 * @text Text Outline
 * @type struct<Outline>
 * @default
 * @desc Text outline settings
 * 
 * @param font:struct
 * @type struct<Font>
 * @text Font Settings
 * @default
 * @desc Text font settings
 * 
 */
/*~struct~XY:
 * @param x:int
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y:int
 * @text Y
 * @type number
 * @default 0
 * @min -1000
 */
/*~struct~XY2:
 * @param x:e
 * @text X
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param y:e
 * @text Y
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */
/*~struct~WH:
 * @param w:int
 * @text Width
 * @type number
 * @default 100
 * @min 0
 *
 * @param h:int
 * @text Height
 * @type number
 * @default 100
 * @min 0
 */
/*~struct~Font:
 * @param face:str
 * @text Face
 * @type text
 * @default
 *
 * @param size:int
 * @text Size
 * @type number
 * @default 24
 * @min 1
 * 
 * @param italic:bool
 * @text IsItalic
 * @type boolean
 * @default false
 */
/*~struct~Outline:
 * @param color:css
 * @text Color
 * @type text
 * @default #000000
 * @desc Outline color in HEX (#000000) or empty "" (black)
 *
 * @param width:int
 * @text Width
 * @type number
 * @default 3
 * @min 0
 * @desc Outline stroke width in px
 */

var Imported = Imported || {};
Imported.PKD_VisualChoices = true;

var PKD_VisualChoices = {};
PKD_VisualChoices.version = 100; // 1.0.0

PKD_VisualChoices.link = function (library) {
    this[library.name] = library;
};

// * For parameters
PKD_VisualChoices.PP = {};

// * JSON parameters (optional)

DataManager._databaseFiles.push({
    name: '$dataPKDVCGroups',
    src: 'PKD_VisualChoices_Groups.json'
});

DataManager._databaseFiles.push({
    name: '$dataPKDVCItems',
    src: 'PKD_VisualChoices_Items.json'
});
// Generated by CoffeeScript 2.5.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 13.04.21
var KDCore;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается
KDCore._fileVersion = '2.5';

if ((KDCore.Version != null) && KDCore.Version > KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new version');
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  console.warn("XDev KDCore is loaded " + KDCore.Version);
  (function() {
    var BitmapSrc, Color, DevLog, Point, SDK, __TMP_LOGS__, ___Sprite_alias_Move_KDCORE_2, __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll, i, l, m, o;
    // * Array Extension
    //------------------------------------------------------------------------------
    Array.prototype.delete = function() {
      var L, a, ax, what;
      what = void 0;
      a = arguments;
      L = a.length;
      ax = void 0;
      while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
        }
      }
      return this;
    };
    Array.prototype.max = function() {
      return Math.max.apply(null, this);
    };
    Array.prototype.min = function() {
      return Math.min.apply(null, this);
    };
    Array.prototype.sample = function() {
      if (this.length === 0) {
        return [];
      }
      return this[SDK.rand(0, this.length - 1)];
    };
    Array.prototype.first = function() {
      return this[0];
    };
    Array.prototype.last = function() {
      return this[this.length - 1];
    };
    Array.prototype.shuffle = function() {
      var k, n, v;
      n = this.length;
      while (n > 1) {
        n--;
        k = SDK.rand(0, n + 1);
        v = this[k];
        this[k] = this[n];
        this[n] = v;
      }
    };
    Array.prototype.count = function() {
      return this.length;
    };
    Array.prototype.isEmpty = function() {
      return this.length === 0;
    };
    // * Number Extension
    //------------------------------------------------------------------------------
    Number.prototype.do = function(method) {
      return SDK.times(this, method);
    };
    Number.prototype.clamp = function(min, max) {
      return Math.min(Math.max(this, min), max);
    };
    Number.prototype.any = function(number) {
      return (number != null) && number > 0;
    };
    // * String Extension
    //------------------------------------------------------------------------------
    String.prototype.toCss = function() {
      return KDCore.Color.FromHex(this).CSS;
    };
    String.prototype.toCSS = function() {
      return this.toCss();
    };
    String.prototype.isEmpty = function() {
      return this.length === 0 || !this.trim();
    };
    String.isNullOrEmpty = function(str) {
      return (str == null) || str.isEmpty();
    };
    String.any = function(str) {
      return !String.isNullOrEmpty(str);
    };
    String.prototype.replaceAll = function(search, replacement) {
      var target;
      target = this;
      return target.split(search).join(replacement);
    };
    // * Sprite Extension
    //------------------------------------------------------------------------------
    Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
      return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
    };
    Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
      this.x -= Math.round(this.width * floatX);
      this.y -= Math.round(this.height * floatY);
    };
    Sprite.prototype.moveToParentCenter = function() {
      if (!this.parent) {
        return;
      }
      return this.move(this.parent.width / 2, this.parent.height / 2);
    };
    ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
    Sprite.prototype.move = function(x, y) {
      if (x instanceof Array) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
      } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
      } else if ((x != null) && (x._x != null)) {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
      } else {
        return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
      }
    };
    Sprite.prototype.isContainsPoint = function(point) {
      var rect, rx, ry;
      if (this.width === 0 || this.height === 0) {
        return false;
      }
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = this._getProperFullRect(rx, ry);
      return rect.contains(point.x, point.y);
    };
    // * Возвращает Rect с учётом Scale и Anchor спрайта
    Sprite.prototype._getProperFullRect = function(rx, ry) {
      var height, width, x, y;
      width = this.width * Math.abs(this.scale.x);
      height = this.height * Math.abs(this.scale.y);
      x = rx - this.anchor.x * width;
      y = ry - this.anchor.y * height;
      if (this.anchor.x === 0 && this.scale.x < 0) {
        x += this.width * this.scale.x;
      }
      if (this.anchor.y === 0 && this.scale.y < 0) {
        y += this.height * this.scale.y;
      }
      return new PIXI.Rectangle(x, y, width, height);
    };
    Sprite.prototype.fillAll = function(color) {
      if (color != null) {
        return this.bitmap.fillAll(color);
      } else {
        return this.fillAll(KDCore.Color.WHITE);
      }
    };
    Sprite.prototype.removeFromParent = function() {
      if (this.parent != null) {
        return this.parent.removeChild(this);
      }
    };
    // * Bitmap Extension
    //------------------------------------------------------------------------------
    __alias_Bitmap_fillAll = Bitmap.prototype.fillAll;
    Bitmap.prototype.fillAll = function(color) {
      if (color instanceof KDCore.Color) {
        return this.fillRect(0, 0, this.width, this.height, color.CSS);
      } else {
        return __alias_Bitmap_fillAll.call(this, color);
      }
    };
    __alias_Bitmap_blt_kdCore = Bitmap.prototype.blt;
    Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
      if (this._needModBltDWH > 0) {
        dh = dw = this._needModBltDWH;
        __alias_Bitmap_blt_kdCore.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
        this._needModBltDWH = null;
      } else {
        __alias_Bitmap_blt_kdCore.call(this, ...arguments);
      }
    };
    Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
      var bitmap;
      bitmap = null;
      if (icon instanceof Bitmap) {
        bitmap = icon;
      } else {
        bitmap = BitmapSrc.LoadFromIconIndex(icon).bitmap;
      }
      return this.drawOnMe(bitmap, x, y, size, size);
    };
    Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
      if (sw <= 0) {
        sw = bitmap.width;
      }
      if (sh <= 0) {
        sh = bitmap.height;
      }
      this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
    };
    Bitmap.prototype.drawInMe = function(bitmap) {
      return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
    };
    Bitmap.prototype.drawTextFull = function(text, position = 'center') {
      return this.drawText(text, 0, 0, this.width, this.height, position);
    };
    // * Input Extension
    //------------------------------------------------------------------------------

    //TODO: Gamepad support
    Input.KeyMapperPKD = {};
//Numbers
    for (i = l = 48; l <= 57; i = ++l) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i);
    }
//Letters Upper
    for (i = m = 65; m <= 90; i = ++m) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
    }
//Letters Lower (for key code events)
    for (i = o = 97; o <= 122; i = ++o) {
      Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
    }
    (function() {
      var _input_onKeyDown, _input_onKeyUp;
      
      //@[ALIAS]
      _input_onKeyDown = Input._onKeyDown;
      Input._onKeyDown = function(event) {
        _input_onKeyDown.call(this, event);
        if (Input.keyMapper[event.keyCode]) {
          return;
        }
        Input._setStateWithMapperPKD(event.keyCode);
      };
      //@[ALIAS]
      _input_onKeyUp = Input._onKeyUp;
      Input._onKeyUp = function(event) {
        _input_onKeyUp.call(this, event);
        if (Input.keyMapper[event.keyCode]) {
          return;
        }
        Input._setStateWithMapperPKD(event.keyCode, false);
      };
      //?NEW
      Input._setStateWithMapperPKD = function(keyCode, state = true) {
        var symbol;
        symbol = Input.KeyMapperPKD[keyCode];
        if (symbol != null) {
          return this._currentState[symbol] = state;
        }
      };
      //?NEW
      Input.isCancel = function() {
        return Input.isTriggered('cancel') || TouchInput.isCancelled();
      };
      //?NEW
      TouchInput.toPoint = function() {
        return new KDCore.Point(TouchInput.x, TouchInput.y);
      };
    })();
    // * Window_Base Extension
    //------------------------------------------------------------------------------
    Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
      this.contents._needModBltDWH = finalSize;
      this.drawFace(faceName, faceIndex, x, y);
    };
    // * SDK
    //------------------------------------------------------------------------------
    SDK = function() {
      throw new Error('This is a static class');
    };
    SDK.rand = function(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    };
    SDK.setConstantToObject = function(object, constantName, constantValue) {
      object[constantName] = constantValue;
      if (typeof object[constantName] === 'object') {
        Object.freeze(object[constantName]);
      }
      Object.defineProperty(object, constantName, {
        writable: false
      });
    };
    SDK.convertBitmapToBase64Data = function(bitmap) {
      return bitmap._canvas.toDataURL('image/png');
    };
    SDK.times = function(times, method) {
      var results;
      i = 0;
      results = [];
      while (i < times) {
        method(i);
        results.push(i++);
      }
      return results;
    };
    SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
      var node, t;
      t = layer[coordSymbol];
      node = layer;
      while (node) {
        t -= node[coordSymbol];
        node = node.parent;
      }
      return (t * -1) + layer[coordSymbol];
    };
    SDK.canvasToLocalX = function(layer, x) {
      while (layer) {
        x -= layer.x;
        layer = layer.parent;
      }
      return x;
    };
    SDK.canvasToLocalY = function(layer, y) {
      while (layer) {
        y -= layer.y;
        layer = layer.parent;
      }
      return y;
    };
    SDK.isInt = function(n) {
      return Number(n) === n && n % 1 === 0;
    };
    SDK.isFloat = function(n) {
      return Number(n) === n && n % 1 !== 0;
    };
    SDK.checkSwitch = function(switchValue) {
      if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
        return true;
      }
      return false;
    };
    SDK.toNumber = function(string, none = 0) {
      var number;
      if (string == null) {
        return none;
      }
      number = Number(string);
      if (isNaN(number)) {
        return none;
      }
      return number;
    };
    // * Color
    //------------------------------------------------------------------------------
    Color = class Color {
      constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.a = a1;
      }

      getLightestColor(lightLevel) {
        var bf, newColor, p;
        bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        p = 0;
        newColor = [0, 0, 0, 0];
        if (bf - lightLevel >= 0) {
          if (bf >= 0) {
            p = Math.abs(bf - lightLevel) / lightLevel;
          }
          newColor = this.ARR.map(function(c) {
            return c - (p * c);
          });
        } else {
          if (bf >= 0) {
            p = (lightLevel - bf) / (255 - bf);
          }
          newColor = this.ARR.map(function(c) {
            return [(255 - c) * p + c, 255].min();
          });
        }
        return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
      }

      clone() {
        return this.reAlpha(this.a);
      }

      reAlpha(newAlpha) {
        return new Color(this.r, this.g, this.b, newAlpha || 255);
      }

      static AddConstantColor(name, color) {
        color.toHex();
        color.toArray();
        color.toCSS();
        SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
        return this._colorHex = '#' + r + g + b;
      }

      toArray() {
        if (this._colorArray != null) {
          return this._colorArray;
        }
        return this._colorArray = [this.r, this.g, this.b, this.a];
      }

      toCSS() {
        var na, nb, ng, nr;
        if (this._colorCss != null) {
          return this._colorCss;
        }
        nr = Math.round(this.r);
        ng = Math.round(this.g);
        nb = Math.round(this.b);
        na = this.a / 255;
        return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
      }

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = SDK.rand(1, 254);
        b = SDK.rand(1, 254);
        c = SDK.rand(1, 254);
        return new Color(a, b, c, 255);
      }

      static FromHex(hexString) {
        var color, result;
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        color = null;
        if (result != null) {
          color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        }
        if (color != null) {
          return new Color(color.r, color.g, color.b, 255);
        } else {
          return Color.NONE;
        }
      }

    };
    Object.defineProperties(Color.prototype, {
      R: {
        get: function() {
          return this.r;
        },
        configurable: true
      },
      G: {
        get: function() {
          return this.g;
        },
        configurable: true
      },
      B: {
        get: function() {
          return this.b;
        },
        configurable: true
      },
      A: {
        get: function() {
          return this.a;
        },
        configurable: true
      },
      ARR: {
        get: function() {
          return this.toArray();
        },
        configurable: true
      },
      CSS: {
        get: function() {
          return this.toCSS();
        },
        configurable: true
      },
      HEX: {
        get: function() {
          return this.toHex();
        },
        configurable: true
      },
      OX: {
        get: function() {
          return this.toNumber();
        },
        configurable: true
      }
    });
    Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));
    Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));
    Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));
    Color.AddConstantColor('RED', new Color(255, 0, 0, 255));
    Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));
    Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));
    Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));
    Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));
    Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));
    Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));
    BitmapSrc = (function() {
      
        //BitmapSrc
      //------------------------------------------------------------------------------
      class BitmapSrc {
        constructor() {
          this.bitmap = null;
        }

        static LoadFromIconIndex(iconIndex) {
          var bs, icon_bitmap, iconset, ph, pw, sx, sy;
          bs = new BitmapSrc();
          if (BitmapSrc.CACHE[iconIndex] == null) {
            iconset = ImageManager.loadSystem('IconSet');
            if (KDCore.isMV()) {
              pw = Window_Base._iconWidth;
              ph = Window_Base._iconHeight;
            } else {
              pw = ImageManager.iconWidth;
              ph = ImageManager.iconHeight;
            }
            sx = iconIndex % 16 * pw;
            sy = Math.floor(iconIndex / 16) * ph;
            icon_bitmap = new Bitmap(pw, ph);
            icon_bitmap.addLoadListener(function() {
              icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
            });
            BitmapSrc.CACHE[iconIndex] = icon_bitmap;
          }
          bs.bitmap = BitmapSrc.CACHE[iconIndex];
          return bs;
        }

        static LoadFromImageFolder(filename) {
          var bs;
          bs = new BitmapSrc();
          bs.bitmap = ImageManager.loadPicture(filename);
          return bs;
        }

        static LoadFromBase64(data, name) {
          var bs;
          bs = new BitmapSrc();
          if (name != null) {
            if (BitmapSrc.CACHE[name] != null) {
              bs.bitmap = BitmapSrc.CACHE[name];
            } else {
              BitmapSrc.CACHE[name] = Bitmap.load(data);
              bs.bitmap = BitmapSrc.CACHE[name];
            }
          } else {
            bs.bitmap = Bitmap.load(data);
          }
          return bs;
        }

        static LoadFromMemory(symbol) {
          var bs;
          bs = new BitmapSrc();
          if (BitmapSrc.CACHE[symbol] != null) {
            bs.bitmap = BitmapSrc.CACHE[symbol];
          } else {
            bs.bitmap = ImageManager.loadEmptyBitmap();
          }
          return bs;
        }

      };

      BitmapSrc.CACHE = {};

      return BitmapSrc;

    }).call(this);
    // * DevLog
    //------------------------------------------------------------------------------
    __TMP_LOGS__ = [];
    DevLog = class DevLog {
      constructor(prefix = "") {
        this.prefix = prefix;
        this._isShow = typeof DEV !== 'undefined';
        this._color = Color.BLACK;
        this._backColor = Color.WHITE;
        __TMP_LOGS__.push(this);
      }

      on() {
        this._isShow = true;
        return this;
      }

      off() {
        this._isShow = false;
        return this;
      }

      applyRandomColors() {
        this.applyRandomWithoutBackgroundColors();
        this.setBackColor(Color.Random());
        return this;
      }

      applyRandomWithoutBackgroundColors() {
        this.setColor(Color.Random());
        return this;
      }

      setColor(color) {
        this._color = color;
        return this;
      }

      setBackColor(backColor) {
        this._backColor = backColor;
        return this;
      }

      applyLibraryColors() {
        this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
        return this;
      }

      setColors(color, backColor) {
        this.setColor(color);
        this.setBackColor(backColor);
        return this;
      }

      applyExtensionColors() {
        this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
        return this;
      }

      applyWarningColors() {
        this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
        return this;
      }

      p(text) {
        if (!this._isShow) {
          return;
        }
        if (text == null) {
          console.log("");
        }
        this._printText(text);
      }

      _printText(text) {
        text = this.prefix + " : " + text;
        if (this._isUsingColor()) {
          return this._printTextWithColors(text);
        } else {
          return console.log(text);
        }
      }

      _isUsingColor() {
        return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
      }

      _printTextWithColors(text) {
        var args;
        args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
        return window.console.log.apply(console, args);
      }

      static CreateForLib(library) {
        var dlog;
        dlog = new DevLog(library.name);
        dlog.applyLibraryColors();
        return dlog;
      }

      static EnableAllLogs() {
        return __TMP_LOGS__.forEach(function(log) {
          return log.on();
        });
      }

    };
    // * ParametersManager
    //------------------------------------------------------------------------------
    PluginManager.getPluginParametersByRoot = function(rootName) {
      var pluginParameters, property;
      for (property in this._parameters) {
        if (this._parameters.hasOwnProperty(property)) {
          pluginParameters = this._parameters[property];
          if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
            return pluginParameters;
          }
        }
      }
      return PluginManager.parameters(rootName);
    };
    PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
      return pluginParameters[key] != null;
    };
    //@[AUTO EXTEND]
    //?[DEPRECATED]
    KDCore.ParametersManager = class ParametersManager {
      constructor(pluginName) {
        this.pluginName = pluginName;
        this._cache = {};
        this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
      }

      isLoaded() {
        return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
      }

      isHasParameter(name) {
        return this._parameters[name] != null;
      }

      getString(name) {
        return this._parameters[name];
      }

      convertField(object, fieldName) {
        var e;
        try {
          object[fieldName] = JSON.parse(object[fieldName] || 'false');
        } catch (error1) {
          e = error1;
          console.error('Error while convert field ' + e.name);
          object[fieldName] = false;
        }
        return object;
      }

      convertImage(object, fieldName) {
        return object[fieldName] = this.loadImage(object[fieldName]);
      }

      loadImage(filename, smooth) {
        var e, path;
        try {
          if (filename) {
            path = filename.split('/');
            filename = path.last();
            path = path.first() + '/';
            return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
          } else {
            return ImageManager.loadEmptyBitmap();
          }
        } catch (error1) {
          e = error1;
          console.error(e);
          return ImageManager.loadEmptyBitmap();
        }
      }

      getFromCacheOrInit(name, func) {
        var object;
        if (!this.isInCache(name)) {
          if (func != null) {
            object = func.call(this);
            this.putInCache(name, object);
          }
        }
        return this.getFromCache(name);
      }

      isInCache(name) {
        return this._cache.hasOwnProperty(name);
      }

      putInCache(name, object) {
        return this._cache[name] = object;
      }

      getFromCache(name) {
        return this._cache[name];
      }

      getNumber(name) {
        var number;
        number = this.getObject(name);
        if (SDK.isInt(number)) {
          return number;
        }
        return 0;
      }

      getObject(name) {
        if (this.isHasParameter(name)) {
          return JSON.parse(this.getString(name) || '{}');
        } else {
          return {};
        }
      }

      getBoolean(name) {
        if (this.isHasParameter(name)) {
          return JSON.parse(this.getString(name) || false);
        } else {
          return false;
        }
      }

      getBooleanFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getBooleanFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getNumberFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getNumberFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getStringFromCacheWithDefault(name, defaultValue) {
        if (this.isHasParameter(name)) {
          return this.getStringFromCache(name);
        } else {
          return defaultValue;
        }
      }

      getBooleanFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getBoolean(name);
        });
      }

      getNumberFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getNumber(name);
        });
      }

      getStringFromCache(name) {
        return this.getFromCacheOrInit(name, function() {
          return this.getString(name);
        });
      }

    };
    // * ParamLoader (ParametersManager alternative)

      //@[AUTO EXTEND]
    KDCore.ParamLoader = class ParamLoader {
      constructor(pluginName) {
        this.pluginName = pluginName;
        this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
        this.params = this.parseParameters(this.paramsRaw);
      }

      parseParameters(paramSet) {
        var clearKey, key, params, typeKey, value;
        params = {};
        for (key in paramSet) {
          value = paramSet[key];
          clearKey = this.parseKey(key);
          typeKey = this.parseKeyType(key);
          params[clearKey] = this.parseParamItem(typeKey, value);
        }
        return params;
      }

      parseKey(keyRaw) {
        return keyRaw.split(":")[0];
      }

      parseKeyType(keyRaw) {
        return keyRaw.split(":")[1];
      }

      // * Проверка, загружены ли параметры плагина
      isLoaded() {
        return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
      }

      // * Имя параметра без ключа
      isHasParameter(paramName) {
        return this.params[paramName] != null;
      }

      
        // * Возвращает значение параметра (def - по умолчанию, если не найден)
      getParam(paramName, def) {
        if (this.isHasParameter(paramName)) {
          return this.params[paramName];
        } else {
          return def;
        }
      }

      // * Данные ключи должны идти после названия параметра через :
      // * Пример: @param ShowDelay:int, @param TestBool:bool
      // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
      parseParamItem(type, item) {
        var e;
        if (type == null) {
          return item;
        }
        try {
          switch (type) {
            case "int":
            case "i":
              return parseInt(item);
            case "intA": // * массив чисел
              if (String.any(item)) {
                return JsonEx.parse(item).map((e) => {
                  return this.parseParamItem("int", e);
                });
              } else {
                return [];
              }
              break;
            case "bool":
            case "b":
            case "e":
              return eval(item);
            case "struct":
            case "s":
              if (String.any(item)) {
                return this.parseParameters(JsonEx.parse(item));
              } else {
                return null;
              }
              break;
            case "structA": // * массив структур
              return JsonEx.parse(item).map((e) => {
                return this.parseParameters(JsonEx.parse(e));
              });
            case "str":
              return item;
            case "strA":
              if (String.any(item)) {
                return JsonEx.parse(item).map((e) => {
                  return this.parseParamItem("str", e);
                });
              } else {
                return [];
              }
              break;
            case "note": // * если несколько строк в тексте
              return JsonEx.parse(item);
            case "css":
              return item.toCss();
            case "color":
              return KDCore.Color.FromHex(item);
            default:
              return item;
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
          return item;
        }
      }

    };
    Point = (function() {
      // * Point
      //------------------------------------------------------------------------------
      class Point {
        constructor(_x = 0, _y = 0) {
          this._x = _x;
          this._y = _y;
        }

        clone() {
          return new Point(this._x, this._y);
        }

        toString() {
          return "[" + this._x + " ; " + this._y + "]";
        }

        isSame(anotherPoint) {
          return this.x === anotherPoint.x && this.y === anotherPoint.y;
        }

        convertToCanvas() {
          return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
        }

        convertToMap() {
          return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
        }

        convertToScreen() {
          return new Point(this.screenX(), this.screenY());
        }

        screenX() {
          var t, tw;
          t = $gameMap.adjustX(this._x);
          tw = $gameMap.tileWidth();
          return Math.round(t * tw + tw / 2);
        }

        screenY() {
          var t, th;
          t = $gameMap.adjustY(this._y);
          th = $gameMap.tileHeight();
          return Math.round(t * th + th);
        }

        round() {
          return new Point(Math.round(this._x), Math.round(this._y));
        }

        floor() {
          return new Point(Math.floor(this._x), Math.floor(this._y));
        }

        mapPointOnScreen() {
          var nx, ny;
          nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
          ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
          return new Point(nx, ny);
        }

        multiplyBy(val) {
          return new Point(this._x * val, this._y * val);
        }

        simple() {
          return new PIXI.Point(this.x, this.y);
        }

        delta(point) {
          var dx, dy;
          dx = point.x - this._x;
          dy = point.y - this._y;
          return new KDCore.Point(dx, dy);
        }

        static _getEmpty() {
          if (Point._emptyPoint == null) {
            Point._emptyPoint = new Point(0, 0);
          }
          return Point._emptyPoint;
        }

      };

      Object.defineProperties(Point.prototype, {
        x: {
          get: function() {
            return this._x;
          },
          configurable: true
        },
        y: {
          get: function() {
            return this._y;
          },
          configurable: true
        }
      });

      Object.defineProperties(Point, {
        Empty: {
          get: function() {
            return Point._getEmpty();
          },
          configurable: false
        }
      });

      Array.prototype.toPoint = function() {
        return new Point(this[0], this[1]);
      };

      Sprite.prototype.toPoint = function() {
        return new Point(this.x, this.y);
      };

      Game_CharacterBase.prototype.toPoint = function() {
        return new Point(this.x, this.y);
      };

      return Point;

    }).call(this);
    // * Utils
    //------------------------------------------------------------------------------
    KDCore.Utils = {};
    (function() {
      var _;
      _ = KDCore.Utils;
      _.getJDataById = function(id, source) {
        var d, len, q;
        for (q = 0, len = source.length; q < len; q++) {
          d = source[q];
          if (d.id === id) {
            return d;
          }
        }
        return null;
      };
      _.hasMeta = function(symbol, obj) {
        return (obj.meta != null) && (obj.meta[symbol] != null);
      };
      _.getValueFromMeta = function(symbol, obj) {
        if (!_.hasMeta(symbol, obj)) {
          return null;
        }
        return obj.meta[symbol];
      };
      _.getNumberFromMeta = function(symbol, obj) {
        var value;
        if (!_.hasMeta(symbol, obj)) {
          return null;
        }
        if (obj.meta[symbol] === true) {
          return 0;
        } else {
          value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
        }
        return value;
      };
      _.isSceneMap = function() {
        try {
          return SceneManager._scene instanceof Scene_Map;
        } catch (error1) {
          return false;
        }
      };
      _.isSceneBattle = function() {
        try {
          return SceneManager._scene instanceof Scene_Battle;
        } catch (error1) {
          return false;
        }
      };
      _.getEventCommentValue = function(commentCode, list) {
        var comment, e, item;
        try {
          if (list && list.length > 1) {
            i = 0;
            while (i < list.length) {
              item = list[i++];
              if (!item) {
                continue;
              }
              if (item.code === 108) {
                comment = item.parameters[0];
                if (comment.contains(commentCode)) {
                  return comment;
                }
              }
            }
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
        }
        return null;
      };
      _.getPositionPointFromJSON = function(jsonSettings) {
        return _.convertPositionPointFromJSON(jsonSettings.position);
      };
      _.convertPositionPointFromJSON = function(position) {
        var e, x, y;
        try {
          x = position[0];
          y = position[1];
          if (!KDCore.SDK.isInt(x)) {
            x = eval(x);
          }
          if (!KDCore.SDK.isInt(y)) {
            y = eval(y);
          }
          return new KDCore.Point(x, y);
        } catch (error1) {
          e = error1;
          console.warn('Utils.getPositionPointFromJSON', e);
          return KDCore.Point.Empty;
        }
      };
      _.jsonPos = function(jsonPosition) {
        return _.convertPositionPointFromJSON(jsonPosition);
      };
      _.jsonPosXY = function(jsonPosition) {
        var e, x, y;
        try {
          ({x, y} = jsonPosition);
          return new KDCore.Point(eval(x), eval(y));
        } catch (error1) {
          e = error1;
          console.warn('Utils.jsonPosXY', e);
          return KDCore.Point.Empty;
        }
      };
      _.getVar = function(id) {
        return $gameVariables.value(id);
      };
      _.setVar = function(id, value) {
        return $gameVariables.setValue(id, value);
      };
      _.addToVar = function(id, value) {
        var prevVal;
        prevVal = _.getVar(id);
        return _.setVar(id, prevVal + value);
      };
      _.playSE = function(seFileName, pitch = 100, volume = 100) {
        var sound;
        if (seFileName == null) {
          return;
        }
        if (seFileName === "") {
          return;
        }
        sound = {
          name: seFileName,
          pan: 0,
          pitch: pitch,
          volume: volume
        };
        AudioManager.playStaticSe(sound);
      };
      _.getItemTypeId = function(item) {
        if (DataManager.isWeapon(item)) {
          return 1;
        } else if (DataManager.isArmor(item)) {
          return 2;
        }
        return 0;
      };
      _.getItemByType = function(itemId, typeId) {
        var data;
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      };
      _.loadFont = function(name) {
        if (!KDCore.isMZ()) {
          return;
        }
        if (String.isNullOrEmpty(name)) {
          return;
        }
        if (FontManager._states[name] != null) {
          return;
        }
        FontManager.load(name, name + ".ttf");
      };
      _.convertTimeShort = function(seconds) {
        var e;
        try {
          if (seconds > 59) {
            return Math.floor(seconds / 60) + 'm';
          } else {
            return seconds;
          }
        } catch (error1) {
          e = error1;
          console.warn(e);
          return seconds;
        }
      };
      _.isPointInScreen = function(point, margin = 10) {
        var maxH, maxW, screenMargin, x, y;
        ({x, y} = point);
        maxW = Graphics.width;
        maxH = Graphics.height;
        // * Граница от краёв экрана
        screenMargin = margin;
        if (x < screenMargin) {
          return false;
        }
        if (y < screenMargin) {
          return false;
        }
        if (x > (maxW - screenMargin)) {
          return false;
        }
        if (y > (maxH - screenMargin)) {
          return false;
        }
        return true;
      };
      // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
      // * Пример использования loadImageAsync(a, b).then(метод)
      // в метод будет передан bitmap первым аргументом
      _.loadImageAsync = async function(folder, filename) {
        var promise;
        promise = new Promise(function(resolve, reject) {
          var b;
          b = ImageManager.loadBitmap("img/" + folder + "/", filename);
          return b.addLoadListener(function() {
            return resolve(b);
          });
        });
        return (await promise);
      };
    })();
    // * TimedUpdate
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    KDCore.TimedUpdate = class TimedUpdate {
      constructor(interval, method1) {
        this.interval = interval;
        this.method = method1;
        this._timer = 0;
        this._once = false;
      }

      update() {
        if (this.interval == null) {
          return;
        }
        if (this._timer++ >= this.interval) {
          this.call();
          this._timer = 0;
          if (this._once === true) {
            return this.stop();
          }
        }
      }

      once() {
        return this._once = true;
      }

      onUpdate(method1) {
        this.method = method1;
      }

      stop() {
        return this.interval = null;
      }

      isAlive() {
        return this.interval != null;
      }

      // * Рандомизировать интервал @interval (-min, +max)
      applyTimeRange(min, max) {
        var value;
        if (!this.isAlive()) {
          return;
        }
        value = SDK.rand(min, max);
        return this.interval += value;
      }

      call() {
        if (this.method != null) {
          return this.method();
        }
      }

    };
    // * Button (Sprite_XButton)
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    //?DEPRECATED
    KDCore.Button = class Button extends Sprite {
      constructor() {
        super();
        this._mouseIn = false;
        this._touching = false;
        this._slowUpdateActive = false;
        this._localMode = false;
        this._images = [];
        this._checkAlpha = false;
        this._textSprite = null;
        this._textPosition = 0;
        this._override = false; // * TouchClick in game messages not work anymore if TRUE
        this._clickHandlers = [];
        this._manualHided = false;
        this._manualDisabled = false;
        this._condition = null; // * Условие для Visible
        this._condition2 = null; // * Условие для Enable \ Disable
        this._disabled = false;
        this._infoData = null;
        this._isNeedShowText = false;
        return;
      }

      isMouseInButton() {
        return this._mouseIn === true;
      }

      isActive() {
        return this.visible === true;
      }

      activateSlowUpdate() {
        return this._slowUpdateActive = true;
      }

      setLocalMode() {
        this._realX = this.x;
        this._realY = this.y;
        return this._localMode = true;
      }

      setAlphaMode() {
        return this._checkAlpha = true;
      }

      // * above, below
      setTextPosition(position) {
        return this._textPosition = position;
      }

      setHelpText(text, size) {
        return this._createText(text, size);
      }

      setInfoData(data) {
        return this._infoData = data;
      }

      setOverrideMode() {
        return this._override = true;
      }

      isOverride() {
        return this._override === true && this.isActive() && this.touchInButton();
      }

      isDisabled() {
        return this._disabled === true;
      }

      isEnabled() {
        return !this.isDisabled();
      }

      isNeedShowText() {
        return this._isNeedShowText === true;
      }

      addClickHandler(method) {
        return this._clickHandlers.push(method);
      }

      clearClickHandlers() {
        return this._clickHandlers = [];
      }

      isLocalMode() {
        return this._localMode === true;
      }

      setCondition(method) {
        return this._condition = method;
      }

      setConditionForDisable(method) {
        return this._condition2 = method;
      }

      getInfoData() {
        return this._infoData;
      }

      simulateClick() { //?NEW
        return this.applyClickedState();
      }

      simulateClickManual() { //?NEW
        this.simulateClick();
        return setTimeout((() => {
          try {
            return this.applyNormalState();
          } catch (error1) {

          }
        }), 50);
      }

      prepare() { //?NEW
        return this.slowUpdate();
      }

      realX() {
        if (this.isLocalMode()) {
          return this._realX;
        } else {
          return this.x;
        }
      }

      realY() {
        if (this.isLocalMode()) {
          return this._realY;
        } else {
          return this.y;
        }
      }

      show() {
        this.visible = true;
        return this._manualHided = false;
      }

      hide() {
        this.visible = false;
        return this._manualHided = true;
      }

      disable() {
        this._disabled = true;
        this._manualDisabled = true;
        this.refreshEnDisState();
        return this._mouseIn = false;
      }

      enable() {
        this._disabled = false;
        this._manualDisabled = false;
        return this.refreshEnDisState();
      }

      update() {
        super.update();
        if (this._destroyed === true) {
          return;
        }
        this.updateMouseClick();
        this.updatePosition();
        if (!this._slowUpdateActive) {
          this.slowUpdate();
        }
        return this.updateComplexTextVisible();
      }

      slowUpdate() {
        if (this._destroyed === true) {
          return;
        }
        this.updateMouseTracking();
        this.updateConditionForVisible();
        return this.updateConditionForEnabling();
      }

      updateMouseTracking() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (this.cursorInButton()) {
          this._onMouseEnter();
          return this._mouseIn = true;
        } else {
          this._onMouseLeave();
          return this._mouseIn = false;
        }
      }

      // * In MZ TouchInput always have X,Y
      cursorInButton() {
        return this.touchInButton();
      }

      xyInButton(x, y) {
        var inRect, rect, rx, ry;
        rx = KDCore.SDK.toGlobalCoord(this, 'x');
        ry = KDCore.SDK.toGlobalCoord(this, 'y');
        rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
        inRect = rect.contains(x, y);
        if (inRect === true && this._checkAlpha === true) {
          return this._checkAlphaPixel(x - rx, y - ry);
        } else {
          return inRect;
        }
      }

      _realWidth() {
        if (this._hasImage()) {
          return this._mainImage().width;
        } else {
          return this.width;
        }
      }

      _hasImage() {
        return this._mainImage() != null;
      }

      _mainImage() {
        return this._images[0];
      }

      _realHeight() {
        if (this._hasImage()) {
          return this._mainImage().height;
        } else {
          return this.height;
        }
      }

      _checkAlphaPixel(x, y) {
        var pixel;
        pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
        return pixel >= 200;
      }

      _onMouseEnter() {
        if (this._mouseIn === true) {
          return;
        }
        if (!this.isDisabled()) {
          this.applyCoverState();
        }
        this._showText();
        if (this.getInfoData() != null) {
          return this._startComplexTimer();
        }
      }

      _onMouseLeave() {
        if (this._mouseIn === false) {
          return;
        }
        if (!this.isDisabled()) {
          this.applyNormalState();
        }
        this._hideText();
        return this._stopComplexTimer();
      }

      _showText() {
        if (this._textSprite == null) {
          return;
        }
        this._updateTextPosition();
        return this._textSprite.visible = true;
      }

      _hideText() {
        if (this._textSprite == null) {
          return;
        }
        return this._textSprite.visible = false;
      }

      _startComplexTimer() {
        this._stopComplexTimer();
        return this._cTimer = setTimeout((() => {
          if (this._mouseIn === true) {
            return this._isNeedShowText = true;
          }
        }), 1000);
      }

      _stopComplexTimer() {
        if (this._cTimer != null) {
          clearTimeout(this._cTimer);
        }
        return this._isNeedShowText = false;
      }

      updateMouseClick() {
        if (!this.isActive()) {
          this._unTouch();
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (TouchInput.isTriggered() && this.touchInButton()) {
          this._touching = true;
          this.applyClickedState();
        }
        if (this._touching === true) {
          if (TouchInput.isReleased() || !this.touchInButton()) {
            this._unTouch();
            if (TouchInput.isReleased()) {
              return this.callClickHandler();
            }
          }
        }
      }

      _unTouch() {
        this._touching = false;
        if (this.touchInButton()) {
          return this.applyCoverState();
        } else {
          return this.applyNormalState();
        }
      }

      touchInButton() {
        return this.xyInButton(TouchInput.x, TouchInput.y);
      }

      callClickHandler() {
        if (this._clickHandlers.length > 0) {
          return this._clickHandlers.forEach(function(method) {
            return method();
          });
        }
      }

      updatePosition() {
        var p;
        if (!this._localMode) {
          return;
        }
        p = new KDCore.Point(this._realX, this._realY);
        return this.move(p.screenX(), p.screenY());
      }

      updateConditionForVisible() {
        var result;
        if (this._condition == null) {
          return;
        }
        if (this._manualHided === true) {
          return;
        }
        try {
          result = this._condition();
          return this.visible = !result;
        } catch (error1) {
          console.warn('wrong condition in button');
          return this.visible = true;
        }
      }

      updateConditionForEnabling() {
        if (!this._condition2) {
          return;
        }
        if (this._manualDisabled === true) {
          return;
        }
        try {
          this._disabled = this._condition2();
          return this.refreshEnDisState();
        } catch (error1) {
          console.warn('wrong condition in button for enable state');
          return this.disable();
        }
      }

      setButtonImages(img1, img2, img3, img4) {
        if (this._images != null) {
          this._images.forEach(function(img) {
            if (img != null) {
              return img.parent.removeChild(img);
            }
          });
        }
        this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
        this._images.forEach((img) => {
          if (img != null) {
            return this.addChild(img);
          }
        });
        return this.applyNormalState();
      }

      applyNormalState() {
        var ref;
        this.refreshImages();
        return (ref = this._images[0]) != null ? ref.visible = true : void 0;
      }

      refreshImages() {
        return this._images.forEach(function(img) {
          return img != null ? img.visible = false : void 0;
        });
      }

      applyCoverState() {
        this.refreshImages();
        if (this._images[1] != null) {
          return this._images[1].visible = true;
        } else {
          return this.applyNormalState();
        }
      }

      applyClickedState() {
        this.refreshImages();
        if (this._images[2] != null) {
          return this._images[2].visible = true;
        } else {
          return this.applyNormalState();
        }
      }

      _createText(text, size) {
        var h, w;
        if (this._textSprite) {
          this.removeChild(this._textSprite);
        }
        w = Math.round(((size / 10) + 1) * 5 * text.length);
        h = size + 4;
        this._textSprite = new Sprite(new Bitmap(w, h));
        this._textSprite.bitmap.fontSize = size;
        this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
        this._textSprite.visible = false;
        return this.addChild(this._textSprite);
      }

      _updateTextPosition() {
        var nx, ny;
        if (!this._textSprite) {
          return;
        }
        nx = this._realWidth() / 2 - this._textSprite.width / 2;
        if (this._textPosition === 0) {
          ny = -this._textSprite.height;
        } else {
          ny = this._realHeight() + this._textSprite.height / 2;
        }
        return this._textSprite.move(nx, ny);
      }

      applyDisableState() {
        var ref;
        this.refreshImages();
        return (ref = this._images[3]) != null ? ref.visible = true : void 0;
      }

      refreshEnDisState() {
        if (this.isDisabled()) {
          this.applyDisableState();
          return this._hideText();
        } else {
          if (this._mouseIn === false) {
            return this.applyNormalState();
          }
        }
      }

      //else
      //    do @applyCoverState
      updateComplexTextVisible() {}

      applyScale(mod) {
        var img, len, q, ref;
        ref = this._images;
        for (q = 0, len = ref.length; q < len; q++) {
          img = ref[q];
          if (img != null) {
            img.scale.x = mod;
            img.scale.y = mod;
          }
        }
      }

      static FromSet(imgName, sourceFolder = null) {
        var button, getterFunc, img0, img1;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        img0 = getterFunc(imgName + "_00");
        img1 = getterFunc(imgName + "_01");
        button = new KDCore.Button();
        button.setButtonImages(img0, img1, img0, img0);
        return button;
      }

      static FromSetFull(imgName, sourceFolder = null) {
        var button, getterFunc, img0, img1, img2, img3;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        img0 = getterFunc(imgName + "_00");
        img1 = getterFunc(imgName + "_01");
        img2 = getterFunc(imgName + "_02");
        img3 = getterFunc(imgName + "_03");
        button = new KDCore.Button();
        button.setButtonImages(img0, img1, img2, img3);
        return button;
      }

    };
    KDCore.Sprite = (function(superClass) {
      // * Sprite
      //------------------------------------------------------------------------------
      //@[AUTO EXTEND]
      class Sprite extends superClass {
        constructor() {
          super(...arguments);
        }

        b() {
          return this.bitmap;
        }

        clear() {
          return this.bitmap.clear();
        }

        add(child) {
          return this.addChild(child);
        }

        bNew(w, h) {
          if (h == null) {
            h = w;
          }
          return this.bitmap = new Bitmap(w, h);
        }

        bImg(filename, sourceFolder) {
          var getterFunc;
          getterFunc = function(filename) {
            return ImageManager.loadPicture(filename);
          };
          if (sourceFolder != null) {
            getterFunc = function(filename) {
              return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
            };
          }
          return this.bitmap = getterFunc(filename);
        }

        onReady(method) {
          if (method != null) {
            return this.bitmap.addLoadListener(method);
          }
        }

        drawText() {
          return this.bitmap.drawText(...arguments);
        }

        drawTextFull(text, position = "center") {
          if (this.textSettingsPosition != null) {
            position = this.textSettingsPosition;
          }
          return this.bitmap.drawTextFull(text, position);
        }

        //?DEPRECATED
        drawTextWithSettings(text) {
          this.clear();
          this.drawTextFull(text, this.textSettingsPosition);
        }

        //? x, y, icon, size
        drawIcon() {
          return this.bitmap.drawIcon(...arguments);
        }

        moveByJson(settings) {
          var pos;
          pos = KDCore.Utils.getPositionPointFromJSON(settings);
          return this.move(pos.x, pos.y);
        }

        applyTextSettingsByJson(sprite, settings) {
          this.applyTextSettingsByExtraSettings(sprite, settings.text);
        }

        applyTextSettingsByExtraSettings(sprite, s) {
          sprite.move(s.marginX, s.marginY);
          sprite.b().fontSize = s.fontSize;
          sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
          sprite.b().outlineWidth = s.outlineWidth;
          if (s.outlineColor != null) {
            sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
          }
          if (s.fontFace != null) {
            sprite.b().fontFace = s.fontFace;
          }
          sprite.b().fontItalic = s.fontItalic;
          sprite.visible = s.visible;
        }

        isReady() {
          var q, ref;
          if (this.bitmap != null) {
            if (!this.bitmap.isReady()) {
              return false;
            }
          }
          for (i = q = 0, ref = this.children.length; (0 <= ref ? q < ref : q > ref); i = 0 <= ref ? ++q : --q) {
            if (!this.children[i].bitmap.isReady()) {
              return false;
            }
          }
          return true;
        }

        inPosition(point) {
          return this.isContainsPoint(point);
        }

        isUnderMouse() {
          return this.inPosition(TouchInput);
        }

        // * Из параметров плагина
        applyFontParam(font) {
          var b;
          if (font == null) {
            return;
          }
          b = this.b();
          if (font.size != null) {
            b.fontSize = font.size;
          }
          if (!String.isNullOrEmpty(font.face)) {
            b.fontFace = font.face;
          }
          if (font.italic != null) {
            b.fontItalic = font.italic;
          }
        }

        applyOutlineParam(outline) {
          var b;
          if (outline == null) {
            return;
          }
          b = this.b();
          if (outline.width != null) {
            b.outlineWidth = outline.width;
          }
          if (!String.isNullOrEmpty(outline.color)) {
            b.outlineColor = outline.color;
          }
        }

        static FromImg(filename, sourceFolder) {
          var s;
          s = new KDCore.Sprite();
          s.bImg(filename, sourceFolder);
          return s;
        }

        static FromBitmap(w, h) {
          var s;
          s = new KDCore.Sprite();
          s.bNew(w, h);
          return s;
        }

        static FromTextSettings(settings) {
          var s;
          s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
          s.applyTextSettingsByExtraSettings(s, settings);
          s.textSettingsPosition = settings.position;
          return s;
        }

        // * Загрузчик из параметров плагина (безопасный)
        static FromParams(pluginParams) {
          var e, margins, s, size;
          try {
            size = pluginParams.size;
            s = KDCore.Sprite.FromBitmap(size.w, size.h);
            s.textSettingsPosition = pluginParams.alignment;
            margins = pluginParams.margins;
            if (margins != null) {
              s.move(margins.x, margins.y);
            }
            s.applyFontParam(pluginParams.font);
            s.applyOutlineParam(pluginParams.outline);
            if (!String.isNullOrEmpty(pluginParams.textColor)) {
              s.b().textColor = pluginParams.textColor;
            }
            if (pluginParams.visible != null) {
              s.visible = pluginParams.visible;
            }
            return s;
          } catch (error1) {
            e = error1;
            console.warn('Something wrong with Text Settings!', e);
            return KDCore.Sprite.FromBitmap(60, 30);
          }
        }

      };

      return Sprite;

    }).call(this, Sprite);
    // * Button M
    //------------------------------------------------------------------------------
    //@[AUTO EXTEND]
    // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

      // * Принимает название файла изображения кнопки без _00
    // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
    // * _02 - не используются в этом классе

      // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

      // * Если isFull - true, значит нужен _03
    KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
      constructor(filename, isFull = false, sourceFolder = null) {
        super();
        this._bitmaps = [];
        this._disabled = false;
        this._isTriggered = false;
        // * Когда произошло нажатие на кнопку
        this._handler = null;
        this._isCanBeClicked = true;
        this._isManualHoverMode = false;
        this._isManualSelected = false;
        this._loadBitmaps(filename, isFull, sourceFolder);
        this._setImageState(0);
        this._createThread();
      }

      setManualHover() {
        return this._isManualHoverMode = true;
      }

      disableManualHover() {
        return this._isManualHoverMode = false;
      }

      setManualSelected(_isManualSelected) {
        this._isManualSelected = _isManualSelected;
      }

      enableClick() {
        return this._isCanBeClicked = true;
      }

      disableClick() {
        return this._isCanBeClicked = false;
      }

      desaturate() {
        this.filters = [new PIXI.filters.ColorMatrixFilter()];
        this.filters[0].desaturate();
      }

      isMouseIn() {
        if (this._isManualHoverMode === true) {
          return this._isManualSelected;
        } else {
          return this.inPosition(TouchInput);
        }
      }

      isActive() {
        if (this._isCanBeClicked === false) {
          return false;
        }
        if (this.parent != null) {
          return this.parent.visible === true && this.visible === true;
        } else {
          return this.visible === true;
        }
      }

      isDisabled() {
        return this._disabled === true;
      }

      addClickHandler(_handler) {
        this._handler = _handler;
      }

      clearClickHandler() {
        return this._handler = null;
      }

      // * Воспроизводит визуальный эффект нажатия
      simulateClick() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (this.isMouseIn()) {
          return;
        }
        this._startSimulation();
      }

      isEnabled() {
        return !this.isDisabled();
      }

      refreshState(isEnable = true) {
        if (isEnable === true) {
          if (this.isDisabled()) {
            this.enable();
          }
        } else {
          if (this.isEnabled()) {
            this.disable();
          }
        }
      }

      disable() {
        this._disabled = true;
        return this._setImageState(2);
      }

      enable() {
        this._disabled = false;
        return this._setImageState(0);
      }

      click() {
        if (this._handler != null) {
          return this._handler();
        }
      }

      update() {
        super.update();
        return this._updateMain();
      }

    };
    (function() {      
      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ ButtonM Implementation
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
      //@[DEFINES]
      _ = KDCore.ButtonM.prototype;
      _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
        var getterFunc;
        getterFunc = this._getGetter(sourceFolder);
        this._bitmaps.push(getterFunc(filename + '_00'));
        this._bitmaps.push(getterFunc(filename + '_01'));
        if (isFull) {
          this._bitmaps.push(getterFunc(filename + '_03'));
        }
      };
      _._getGetter = function(sourceFolder = null) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder !== null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
          };
        }
        return getterFunc;
      };
      _._setImageState = function(index = 0) {
        if (this._bitmaps[index] == null) {
          index = 0;
        }
        this.bitmap = this._bitmaps[index];
        this._lastState = index;
      };
      _._createThread = function() {
        this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
        this.hoverThread.applyTimeRange(-1, 1);
        this.hoverThread.call();
      };
      //?[DYNAMIC]
      _._updateMain = function() {
        this._updateMouseLogic();
        if (!this.isActive()) {
          if (($gameTemp.kdButtonUnderMouse != null) && $gameTemp.kdButtonUnderMouse === this) {
            return $gameTemp.kdButtonUnderMouse = null;
          }
        }
      };
      _._updateMouseLogic = function() {
        this.hoverThread.update();
        return this._updateMouseClick();
      };
      _._updateHover = function() {
        if (!this.isActive()) {
          return;
        }
        // * чтобы эффект нажатия не прекратить
        if (this._isTriggered === true) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._lastState !== 1) {
            if (!this.isDisabled()) {
              this._setImageState(1);
            }
            $gameTemp.kdButtonUnderMouse = this;
          }
        } else {
          if (this._lastState !== 0) {
            if (!this.isDisabled()) {
              this._setImageState(0);
            }
            if ($gameTemp.kdButtonUnderMouse === this) {
              $gameTemp.kdButtonUnderMouse = null;
            }
          } else if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        }
      };
      _._updateMouseClick = function() {
        if (!this.isActive()) {
          return;
        }
        if (this.isDisabled()) {
          return;
        }
        if (TouchInput.isTriggered() && this.isMouseIn()) {
          this._isTriggered = true;
          this._setImageState(0);
        }
        if (this._isTriggered === true) {
          if (TouchInput.isReleased()) {
            this._isTriggered = false;
            if (this.isMouseIn()) {
              this.click();
            }
          }
        }
      };
      _._startSimulation = function() {
        this._setImageState(1);
        this._simulateThread = new KDCore.TimedUpdate(10, () => {
          return this._setImageState(0);
        });
        this._simulateThread.once();
        return this._updateMain = this._updateMouseClickSimulated;
      };
      _._updateMouseClickSimulated = function() {
        this._simulateThread.update();
        if (!this._simulateThread.isAlive()) {
          this._simulateThread = null;
          this._updateMain = this._updateMouseLogic;
        }
      };
      // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

      //@[ALIAS]
      alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
      Scene_Map.prototype.isAnyButtonPressed = function() {
        if ($gameTemp.kdButtonUnderMouse != null) {
          return true;
        } else {
          return alias_SM_isAnyButtonPressed.call(this);
        }
      };
      //@[ALIAS]
      alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
      Scene_Map.prototype.onMapLoaded = function() {
        $gameTemp.kdButtonUnderMouse = null;
        return alias_SM_onMapLoaded.call(this);
      };
    })();
    // ■ END ButtonM Implementation
    //---------------------------------------------------------------------------

      // * Button Mini User - класс с определением файла каждого состояния отдельно
    // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
    // ? states = { main, hover, disabled }
    KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
      constructor() {
        super(...arguments);
      }

      //$[OVER]
      _loadBitmaps(states, isFull = true, sourceFolder = null) {
        var getterFunc;
        getterFunc = this._getGetter(sourceFolder);
        this._bitmaps.push(getterFunc(states.main));
        this._bitmaps.push(getterFunc(states.hover));
        // * Optional 03
        if (String.any(states.disabled)) {
          this._bitmaps.push(getterFunc(states.disabled));
        }
      }

    };
    
    //@[EXTENSION TO GLOBAL]
    //------------------------------------------------------------------------------
    KDCore.SDK = SDK;
    KDCore.Color = Color;
    KDCore.DevLog = DevLog;
    KDCore.Point = Point;
    KDCore.BitmapSrc = BitmapSrc;
    //? SOME KDCORE METHODS
    //--------------------------------------------------------------------------------
    KDCore.isMV = function() {
      return Utils.RPGMAKER_NAME.contains("MV");
    };
    KDCore.isMZ = function() {
      return !KDCore.isMV();
    };
    KDCore.warning = function(msg, error) {
      if (msg != null) {
        console.warn(msg);
      }
      if (error != null) {
        console.warn(error);
      }
    };
    (function() {      //--------------------------------------------------------------------------------
      // Word Wrapping =================================================================
      //--------------------------------------------------------------------------------
      //?NEW
      Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
        var maxWidth, wrappedText;
        maxWidth = this.contentsWidth();
        wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
        this.drawTextEx(wrappedText, x, y);
      };
      //?NEW
      Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
        var j, line, lines, newLines, q, ref, ref1, result, spaceLeft, spaceWidth, u, wordWidth, wordWidthWithSpace, words;
        lines = text.split('\n');
        maxWidth = maxWidth;
        spaceWidth = this.contents.measureTextWidth(' ');
        result = '';
        newLines = 1;
        for (i = q = 0, ref = lines.length; (0 <= ref ? q < ref : q > ref); i = 0 <= ref ? ++q : --q) {
          spaceLeft = maxWidth;
          line = lines[i];
          words = line.split(' ');
          for (j = u = 0, ref1 = words.length; (0 <= ref1 ? u < ref1 : u > ref1); j = 0 <= ref1 ? ++u : --u) {
            wordWidth = this.contents.measureTextWidth(words[j]);
            wordWidthWithSpace = wordWidth + spaceWidth;
            if (j === 0 || wordWidthWithSpace > spaceLeft) {
              if (j > 0) {
                if (maxLines === newLines) {
                  return result;
                }
                result += '\n';
                newLines++;
              }
              result += words[j];
              spaceLeft = maxWidth - wordWidth;
              if (j === 0 && line.match(/\\n\w*\s*<\s*\\n\[\w*\s*\]\s*>*/gi)) {
                spaceLeft += 200;
              }
            } else {
              spaceLeft -= wordWidthWithSpace;
              result += ' ' + words[j];
            }
          }
          if (i < lines.length - 1) {
            result += '\n';
          }
        }
        return result;
      };
    })();
    //--------------------------------------------------------------------------------
    // MV TouchInput Extension =======================================================
    //--------------------------------------------------------------------------------

    // * Для совместимости MV и MZ
    //TouchInput.getMousePosition = -> new KDCore.Point(TouchInput.x, TouchInput.y)
    TouchInput.toMapPoint = function() {
      return this.toPoint().convertToMap();
    };
    //?SMouse better alternative
    (function() {
      var alias_SM_processMapTouch, alias_TIOMM;
      if (KDCore.isMZ()) {
        return;
      }
      
      // * Для ButtonM
      //@[ALIAS]
      alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
      Scene_Map.prototype.processMapTouch = function() {
        if ($gameTemp.kdButtonUnderMouse != null) {

        } else {
          return alias_SM_processMapTouch.call(this);
        }
      };
      //@[ALIAS]
      alias_TIOMM = TouchInput._onMouseMove;
      TouchInput._onMouseMove = function(event) {
        var x, y;
        alias_TIOMM.call(this, event);
        x = Graphics.pageToCanvasX(event.pageX);
        y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
          return this._onHover(x, y);
        }
      };
      
      //?NEW, from MZ
      TouchInput._onHover = function(_x, _y) {
        this._x = _x;
        this._y = _y;
      };
    })();
    (function() {      // * VirtualInput для RPG Maker MV
      //$[OVER]
      //TouchInput.getMousePosition = ->
      //    new KDCore.Point(TouchInput._x, TouchInput._y)
      var ALIAS__clear, ALIAS__update, _;
      if (KDCore.isMZ()) {
        return;
      }
      //@[DEFINES]
      _ = Input;
      //@[ALIAS]
      ALIAS__clear = _.clear;
      _.clear = function() {
        ALIAS__clear.call(this);
        return this._virtualButton = null;
      };
      //@[ALIAS]
      ALIAS__update = _.update;
      _.update = function() {
        ALIAS__update.call(this);
        if (this._virtualButton == null) {
          return;
        }
        this._latestButton = this._virtualButton;
        this._pressedTime = 0;
        return this._virtualButton = null;
      };
      _.virtualClick = function(buttonName) {
        return this._virtualButton = buttonName;
      };
    })();
    (function() {      // * Right mouse pressed
      // * Определение когда правая (вторая) кнопка мыши зажата и удерживается
      var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
      //@[DEFINES]
      _ = TouchInput;
      //@[ALIAS]
      ALIAS__clear = _.clear;
      _.clear = function() {
        ALIAS__clear.call(this);
        this._kdMousePressed2 = false;
        this._kdPressedTime2 = 0;
      };
      //@[ALIAS]
      ALIAS___onRightButtonDown = _._onRightButtonDown;
      _._onRightButtonDown = function(event) {
        var check;
        ALIAS___onRightButtonDown.call(this, event);
        // * Это значит что ALIAS метод прошёл (верные X и Y в Canvas)
        if (KDCore.isMZ()) {
          check = this._newState.cancelled === true;
        } else {
          check = this._events.cancelled === true;
        }
        if (check === true) {
          this._kdMousePressed2 = true;
          this._kdPressedTime2 = 0;
        }
      };
      //@[ALIAS]
      ALIAS___onMouseUp = _._onMouseUp;
      _._onMouseUp = function(event) {
        ALIAS___onMouseUp.call(this, event);
        if (event.button === 2) {
          this._kdMousePressed2 = false;
        }
      };
      //@[ALIAS]
      ALIAS__update = _.update;
      _.update = function() {
        ALIAS__update.call(this);
        if (this.kdIsPressed2()) {
          return this._kdPressedTime2++;
        }
      };
      //?[NEW]
      _.kdIsPressed2 = function() {
        return this._kdMousePressed2 === true;
      };
    })();
  })();
}

// ■ END KDCore.coffee
//---------------------------------------------------------------------------
//? КОНЕЦ KDCORE

// Generated by CoffeeScript 2.5.1
(function() {
  var HUDSprite;
  
    // * FROM MYP_ExtraHUD
  HUDSprite = class HUDSprite extends Sprite {
    constructor(bitmapSrc) {
      super(bitmapSrc);
      this.evId = 0;
      this.delta = 0;
      this._fadeToDelete = false;
      this.extraHUDIndex = -1;
      this._shakeTimer = null;
      this._shakeTimer2 = null;
      this._shouldErase = false;
    }

    moveTo(ddx, ddy, delta) {
      this.ddx = ddx;
      this.ddy = ddy;
      this.delta = delta;
      if (this.delta === 0) {
        if (this.evId === 0) {
          this.x = this.ddx;
          this.y = this.ddy;
        } else {
          this.dx = this.ddx;
          this.dy = this.ddy;
        }
      }
    }

    showWithFade(fadeSpeed) {
      this.fadeSpeed = fadeSpeed;
      if (this.fadeSpeed === 0) {
        return this.opacity = 255;
      } else {
        return this._isUpdateFadeIn = true;
      }
    }

    isFadingIn() {
      return this._isUpdateFadeIn === true;
    }

    isFadingOut() {
      return this._isUpdateFadeOut === true;
    }

    hideWithFade(fadeSpeed, toDelete) {
      this.fadeSpeed = fadeSpeed;
      //"HIDE WITH FADE".p()
      if (toDelete === true) {
        this._fadeToDelete = true;
      } else {
        this._fadeToDelete = false;
      }
      if (this.fadeSpeed === 0) {
        return this.opacity = 0;
      } else {
        return this._isUpdateFadeOut = true;
      }
    }

    //@_updateFade = @_updateFadeOut
    eraseWhenHide() {
      return this._shouldErase = true;
    }

    update() {
      var c, nx, ny;
      Sprite.prototype.update.call(this);
      this._updateMoving();
      this._updateFade();
      this._updateShake();
      this._updateShake2();
      this._updateFlash();
      if (this.evId === 0) {
        return;
      }
      if (this._fadeToDelete === false) {
        this._updateFadeRange();
      }
      if (this.opacity === 0) {
        return;
      }
      c = this._event();
      nx = c.screenX() + this.dx;
      ny = c.screenY() + this.dy;
      return this.move(nx, ny);
    }

    _updateFadeRange() {
      return this._fadeRangeThread.update();
    }

    _checkFadeRangeTick() {
      var dist, p1, p2;
      if ($gameSystem._isHudRangeNotAllowed === true) {
        this.showWithFade(0);
        return;
      }
      p1 = this._event();
      p2 = $gamePlayer;
      if (p1 === p2) {
        this.showWithFade(0);
        return;
      }
      dist = $gameMap.distance(p1.x, p1.y, p2.x, p2.y);
      if (dist > MYP.HUD_HIDE_RANGE) {
        return this.hideWithFade(20);
      } else {
        return this.showWithFade(25);
      }
    }

    _event() {
      if (this.evId === -1) {
        return $gamePlayer;
      } else {
        return $gameMap.event(this.evId);
      }
    }

    _updateFade() {
      if (this._isUpdateFadeIn === true) {
        return this._updateFadeIn();
      } else if (this._isUpdateFadeOut === true) {
        return this._updateFadeOut();
      }
    }

    _updateFadeIn() {
      this.opacity += this.fadeSpeed;
      if (this.opacity >= 255) {
        this.opacity = 255;
        return this._isUpdateFadeIn = false;
      }
    }

    _updateFadeOut() {
      this.opacity -= this.fadeSpeed;
      if (this.opacity <= 0) {
        this.opacity = 0;
        if (this._shouldErase === true) {
          MYP.Erase(this.extraHUDIndex);
        }
        return this._isUpdateFadeOut = false;
      }
    }

    isFaded() {
      return this.opacity === 0;
    }

    _updateMoving() {
      var d;
      if (this.delta <= 0) {
        return;
      }
      if (this.delta > 0) {
        d = this.delta;
        if (this.evId === 0) {
          this.x = (this.x * (d - 1) + this.ddx) / d;
          this.y = (this.y * (d - 1) + this.ddy) / d;
        } else {
          this.dx = (this.dx * (d - 1) + this.ddx) / d;
          this.dy = (this.dy * (d - 1) + this.ddy) / d;
        }
        d--;
      }
    }

    // * ==============================================

      // * Shaking
    _updateShake() {} // * EMTPY

    _updateShake2() {} // * EMPTY

    _updateShakeY() {
      this._shakeTimer.update();
      return this._shakeTimer2.update();
    }

    _updateShakeX() {
      this._shakeTimer3.update();
      return this._shakeTimer4.update();
    }

    shakeY(power, time) {
      this._shakeInitial = this.y;
      this._shakePower = power;
      this._shakeTimer = new KDCore.TimedUpdate(4, this._onShakeTick.bind(this));
      this._shakeMode = 0;
      this._shakeTimer2 = new KDCore.TimedUpdate(time, this._onShakeEnd.bind(this));
      this._shakeTimer2.once();
      return this._updateShake = this._updateShakeY;
    }

    _onShakeTick() {
      if (this._shakeMode === 0) {
        if (this.evId !== 0) {
          this.dy -= this._shakePower;
        } else {
          this.y -= this._shakePower;
        }
        return this._shakeMode = 1;
      } else {
        if (this.evId !== 0) {
          this.dy += this._shakePower;
        } else {
          this.y += this._shakePower;
        }
        return this._shakeMode = 0;
      }
    }

    _onShakeEnd() {
      this._shakeTimer.stop();
      this.y = this._shakeInitial;
      return this._updateShake = function() {}; // * EMPTY
    }

    shakeX(power, time) {
      this._shakeInitial2 = this.x;
      this._shakePower2 = power;
      this._shakeTimer3 = new KDCore.TimedUpdate(4, this._onShakeTickX.bind(this));
      this._shakeMode2 = 0;
      this._shakeTimer4 = new KDCore.TimedUpdate(time, this._onShakeEndX.bind(this));
      this._shakeTimer4.once();
      return this._updateShake2 = this._updateShakeX;
    }

    _onShakeTickX() {
      if (this._shakeMode2 === 0) {
        if (this.evId !== 0) {
          this.dx -= this._shakePower2;
        } else {
          this.x -= this._shakePower2;
        }
        return this._shakeMode2 = 1;
      } else {
        if (this.evId !== 0) {
          this.dx += this._shakePower2;
        } else {
          this.x += this._shakePower2;
        }
        return this._shakeMode2 = 0;
      }
    }

    _onShakeEndX() {
      this._shakeTimer3.stop();
      this.x = this._shakeInitial2;
      return this._updateShake2 = function() {}; // * EMPTY
    }

    
      // * ==============================================
    flash(power, speed, times) {
      if (times < 1) {
        return;
      }
      this._flashPower = power;
      this._flashTimes = times;
      this._flashMode = 0;
      this.opacity = 255;
      this._flashTimer = new KDCore.TimedUpdate(speed, this._onFlashTick.bind(this));
      return this._updateFlash = this._updateFlashThread;
    }

    _updateFlash() {} // * EMTPY

    _onFlashTick() {
      if (this._flashMode === 0) {
        this.opacity -= this._flashPower;
        if (this.opacity <= 0) {
          this.opacity = 0;
          this._flashMode = 1;
        }
      } else {
        this.opacity += this._flashPower;
        if (this.opacity >= 255) {
          this.opacity = 255;
          this._flashMode = 0;
          this._flashTimes--;
        }
      }
      if (this._flashTimes === 0) {
        this._flashTimer.stop();
        this.opacity = 255;
        return this._updateFlash = function() {}; // * #EMTPY
      }
    }

    _updateFlashThread() {
      return this._flashTimer.update();
    }

  };
  PKD_VisualChoices.link(HUDSprite);
})();

// * Загрузка и обработка параметров плагина
(function(){
    
    PKD_VisualChoices.LoadPluginSettings = () => {

        PKD_VisualChoices.PP._loader = new KDCore.ParamLoader("visualItems:structA");

        if(KDCore.isMZ())
            RegisterPluginCommnadsMZ();
        else {
            RegisterPluginCommandsMV();
        }
        
    };

    RegisterPluginCommnadsMZ = () => {

        RegisterPluginCommnadForName("PKD_VisualChoices");
        RegisterPluginCommnadForName("PKD_VisualChoices_MZ");

    };

    RegisterPluginCommnadForName = (pluginName) => {

        PluginManager.registerCommand(pluginName, 'OpenVisualChoice', args => {
            try {
                if(args.source == "Json files") {
                    $gameTemp._pVisualLoadFromJson = true;
                } else {
                    $gameTemp._pVisualLoadFromJson = false;
                }
                $gameTemp._visualMenuOptions = args;
                //console.info($gameTemp._visualMenuOptions)
                $gameTemp._nextChoiceShouldBeVisual = true;
            } catch (e) {
                console.warn(e);
            }
        });

    };

    RegisterPluginCommandsMV = () => {

        //@[ALIAS]
        var _Game_Interpreter_pluginCommand_3434 = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            _Game_Interpreter_pluginCommand_3434.call(this, command, args);
            if (command === 'VisualChoices') {
                try {
                    switch (args[0]) {
                        case "setup":
                            $gameTemp._pVisualLoadFromJson = false;
                            // * Создаём новый объект параметров
                            $gameTemp._visualMenuOptions = {
                                menuId: args[1],
                                headerText: "",
                                posType: "0",
                                // * Используется отдельный параметр для MV версии
                                screenXYmv: { x: 0, y: 0 }
                            };
                            switch (args[2]) {
                                case "onPlayer":
                                    $gameTemp._visualMenuOptions.posType = "0";
                                    if(args[3] == "json")
                                        $gameTemp._pVisualLoadFromJson = true;
                                    break;
                                case "onEvent":
                                    $gameTemp._visualMenuOptions.posType = args[3];
                                    if(args[4] == "json")
                                        $gameTemp._pVisualLoadFromJson = true;
                                    break;
                                case "onScreen":
                                    $gameTemp._visualMenuOptions.posType = "-2";
                                    $gameTemp._visualMenuOptions.screenXYmv.x = parseInt(args[3]);
                                    $gameTemp._visualMenuOptions.screenXYmv.y = parseInt(args[4]);
                                    if(args[5] == "json")
                                        $gameTemp._pVisualLoadFromJson = true;
                                    break;
                                default:
                                    break;
                            }
                            $gameTemp._nextChoiceShouldBeVisual = true;
                            break;
                        case "setHeader":
                            if($gameTemp._visualMenuOptions) {
                                args.shift();
                                $gameTemp._visualMenuOptions.headerText = args.join(" ");
                            }
                            break;
                        default:
                            break;
                    }
                    //"VisualChoices setup ID onPlayer [json]"
                    //"VisualChoices setup ID onEvent EV_ID [json]"
                    //"VisualChoices setup ID onScreen X Y [json]"
                    //"VisualChoices setHeader header"
                } catch (e) {
                    console.warn(e);
                }
            }
        };

    };



})();
// Generated by CoffeeScript 2.5.1
// * Общий класс для всех UI элементов
//? FROM AABSZ (rev 13.10.20), modified
(function() {
  var Sprite_UIElement;
  Sprite_UIElement = (function() {
    // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
    //@[ABSTRACT]
    class Sprite_UIElement extends KDCore.Sprite {
      constructor(params) {
        super();
        this.params = params;
        this._init();
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true
        };
      }

      // * Общий метод (есть у всех элементов)
      // * По умолчанию вызывает drawText, но потомки могут переопределить
      draw() {
        return this.drawText(...arguments);
      }

      // * Общий метод
      drawText() {} // * EMPTY

      
        // * Если изначально невидимый (из параметров), то не активный вообще
      isActive() {
        return this.params.visible === true;
      }

      rootImageFolder() {
        return Sprite_UIElement.RootImageFolder;
      }

      // * Сделать чёрно белым
      desaturate() {
        this.filters = [new PIXI.filters.ColorMatrixFilter()];
        this.filters[0].desaturate();
      }

      // * Общий метод (можно ли редактировать визуально)
      isCanBeEdited() {
        return false;
      }

      // * Общий метод (надо ли скрывать при игровом сообщнии)
      isHaveHideWithMessageFlag() {
        return false;
      }

      // * Общий метод (находится ли объект под мышкой)
      isUnderMouse() {
        var ref;
        return (ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0;
      }

      // * Параметры первого элемента (если он есть)
      realWidth() {
        var child;
        child = this.zeroChild();
        if (child != null) {
          if (child instanceof PKD_VisualChoices.Sprite_UIElement) {
            return child.realWidth();
          } else {
            return child.width;
          }
        }
        return 0;
      }

      realHeight() {
        var child;
        child = this.zeroChild();
        if (child != null) {
          if (child instanceof PKD_VisualChoices.Sprite_UIElement) {
            return child.realHeight();
          } else {
            return child.height;
          }
        }
        return 0;
      }

      // * Первый "физический" элемент (спрайт)
      zeroChild() {
        return this.children[0];
      }

      // * Метод восстановления значения на стандартные настройки
      reset(property) {
        var e;
        try {
          switch (property) {
            case "position":
              this._resetPosition();
              break;
            default:
              this[property] = this.params[property];
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }

    };

    // * Корневая директория для изображений
    Sprite_UIElement.RootImageFolder = "pictures";

    return Sprite_UIElement;

  }).call(this);
  PKD_VisualChoices.link(Sprite_UIElement);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_VisualChoices.Sprite_UIElement.prototype;
  _._init = function() {
    var e;
    this._prepare();
    try {
      return this._createContent();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      // * Если при создании произошла ошибка, отключаем элемент
      return this.isActive = function() {
        return false;
      };
    }
  };
  
  // * Подготовка элемента (проверка параметров)
  _._prepare = function() {
    if (this.params == null) {
      this.params = this.defaultParams();
    }
    return this.visible = this.params.visible;
  };
  // * Наследники создают свои элементы в этом методе
  _._createContent = function() {}; // * EMPTY
  
  // * Сброс позиции
  _._resetPosition = function() {
    var x, y;
    ({x, y} = this.params.position);
    this.move(x, y);
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
(function() {
  var HUDText;
  HUDText = class HUDText extends PKD_VisualChoices.HUDSprite {
    constructor(data1) {
      super();
      this.data = data1;
      this._createText();
      if (this._isHaveVariable === true) {
        this._textRefreshThread = new TimedUpdate(1, this._refreshText.bind(this));
      }
      return;
    }

    hide() {
      return this.opacity = 0;
    }

    drawText(text) {
      if (this.main == null) {
        return;
      }
      this.main.contents.clear();
      return this.main.drawTextExWithWordWrap(text, 0, 0);
    }

    _createText() {
      if (KDCore.isMZ()) {
        this.main = this._createNewWindowMZ();
      } else {
        this.main = this._createNewWindowMV();
      }
      this.main.setBackgroundType(2);
      this.main.resetFontSettings();
      if (this.data.outline.width != null) {
        this.main.contents.outlineWidth = this.data.outline.width;
      }
      if (String.any(this.data.outline.color)) {
        this.main.contents.outlineColor = this.data.outline.color;
      }
      this._isHaveVariable = this.data.text.contains("\V[");
      this.drawText(this.data.text, 0, 0);
      return this.addChild(this.main);
    }

    _createNewWindowMZ() {
      var data, w;
      w = new Window_Base(new Rectangle(0, 0, this.data.size.w, this.data.size.h));
      data = this.data;
      w.resetFontSettings = function() {
        if (data.font.face != null) {
          this.contents.fontFace = data.font.face;
        } else {
          this.contents.fontFace = $gameSystem.mainFontFace();
        }
        if (data.font.size != null) {
          this.contents.fontSize = data.font.size;
        } else {
          this.contents.fontSize = $gameSystem.mainFontSize();
        }
        return this.resetTextColor();
      };
      return w;
    }

    _createNewWindowMV() {
      var data, w;
      w = new Window_Base(0, 0, this.data.size.w, this.data.size.h);
      data = this.data;
      if (this.data.font.face != null) {
        w.standardFontFace = function() {
          return data.font.face;
        };
      }
      w.standardFontSize = function() {
        return data.font.size;
      };
      return w;
    }

    _refreshText() {
      if (this.main == null) {
        return;
      }
      this.main.contents.clear();
      this.main.drawTextExWithWordWrap(this.data.text, 0, 0);
    }

    update() {
      var ref;
      super.update();
      return (ref = this._textRefreshThread) != null ? ref.update() : void 0;
    }

  };
  PKD_VisualChoices.link(HUDText);
})();

// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Plugin Paramters.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_VisualChoices.PP;
  _.getChoiceItemById = function(id) {
    var i, item, len, ref;
    ref = this.getChoiceItemsList();
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      if (item.choiceId === id) {
        return item;
      }
    }
    return null;
  };
  _.getChoiceGroupById = function(id) {
    var i, item, len, ref;
    ref = this.getChoiceGroups();
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      if (item.menuId === id) {
        return item;
      }
    }
    return null;
  };
  _.getTooltipDelay = function() {
    return _._loader.getParam("toolTipDelay", 10);
  };
  _.getTooltipAppearSpeed = function() {
    return _._loader.getParam("toolTipAppearSpeed", 20);
  };
  _.getTooltipHideSpeed = function() {
    return _._loader.getParam("toolTipHideSpeed", 30);
  };
  _.getChoiceItemsList = function() {
    if ($gameTemp._pVisualLoadFromJson === true) {
      return $dataPKDVCItems;
    } else {
      return _._loader.getParam("visualItems", []);
    }
  };
  _.getChoiceGroups = function() {
    if ($gameTemp._pVisualLoadFromJson === true) {
      return $dataPKDVCGroups;
    } else {
      return _._loader.getParam("menus", []);
    }
  };
})();

// ■ END Plugin Paramters.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Элемент выбора (кнопка с Tooltip)
(function() {
  var Sprite_UIChoiceItem;
  Sprite_UIChoiceItem = class Sprite_UIChoiceItem extends PKD_VisualChoices.Sprite_UIElement {
    constructor(params) {
      super(params);
      this._tooltipTimer = 0;
      this._applyCondition();
    }

    isActive() {
      return true; // * Always
    }

    draw(extraText) {
      // * Внешний текст
      return this._buttonText.drawText(extraText);
    }

    defaultParams() {
      return {
        choiceId: "test",
        main: "JButton_AX_00",
        hover: "JButton_A_01",
        desaturate: true,
        condition: null,
        buttonText: {
          text: "X",
          size: {
            w: 80,
            h: 80
          },
          font: {
            face: "Tahoma",
            size: 38,
            italic: false
          },
          outline: {
            color: null,
            width: 3
          },
          margins: {
            x: 17,
            y: 45
          }
        },
        tooltipText: {
          text: "Test button",
          size: {
            w: 120,
            h: 80
          },
          font: {
            face: "Consolas",
            size: 14,
            italic: false
          },
          outline: {
            color: null,
            width: 2
          },
          margins: {
            x: 0,
            y: 0
          }
        },
        disabledTooltipText: {
          text: "\\C[4]Disabled",
          size: {
            w: 120,
            h: 80
          },
          font: {
            face: "Consolas",
            size: 14,
            italic: false
          },
          outline: {
            color: null,
            width: 2
          },
          margins: {
            x: 0,
            y: 0
          }
        }
      };
    }

    // * Индекс выбора при нажатии на кнопку
    addClickIndex(index) {
      this._button.addClickHandler(function() {
        return $gameTemp._pVCCI = index;
      });
    }

    // * При закрытии всего меню
    hideTooltip() {
      var ref;
      return (ref = this._tooltip) != null ? ref.hide() : void 0;
    }

    enableClick() {
      var ref;
      return (ref = this._button) != null ? ref.enableClick() : void 0;
    }

    disableClick() {
      var ref;
      return (ref = this._button) != null ? ref.disableClick() : void 0;
    }

    disableManualHover() {
      var ref;
      return (ref = this._button) != null ? ref.disableManualHover() : void 0;
    }

    setManualHover() {
      var ref;
      return (ref = this._button) != null ? ref.setManualHover() : void 0;
    }

    setManualSelected(state) {
      var ref;
      return (ref = this._button) != null ? ref.setManualSelected(state) : void 0;
    }

    update() {
      super.update();
      if (this._tooltip != null) {
        return this._updateTooltip();
      }
    }

  };
  PKD_VisualChoices.link(Sprite_UIChoiceItem);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_VisualChoices.Sprite_UIChoiceItem.prototype;
  // * Вычислить и приминить состояние
  _._applyCondition = function() {
    var condition, e, ref, switchId;
    try {
      condition = this.params.condition;
      if (condition == null) {
        return;
      }
      if (!String.any(condition)) {
        return;
      }
      if (isFinite(condition)) {
        switchId = parseInt(condition);
        if (((ref = $gameSwitches[switchId]) != null ? ref.value : void 0) === false) {
          this._disableButton();
        }
      } else {
        if (!eval(condition)) {
          this._disableButton();
        }
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  _._disableButton = function() {
    this._button.disable();
    if (this.params.desaturate === true) {
      this._button.desaturate();
    }
    // * Смена подсказки
    this._tooltip = this._tooltipD;
  };
  _._createContent = function() {
    this._createButton();
    this._createButtonText();
    this._createTooltipA();
    if (this.params.condition != null) {
      this._createTooltipD();
    }
    return this.visible = true; // * Always
  };
  _._createButton = function() {
    this._button = new KDCore.ButtonMU(this.params);
    this._button.anchor.x = 0.5;
    this._button.anchor.y = 0.5;
    this.addChild(this._button);
  };
  _._createButtonText = function() {
    var p;
    p = this.params.buttonText;
    if (p == null) {
      return;
    }
    this._buttonText = new PKD_VisualChoices.HUDText(p);
    // * Эмуляция Anchor
    this._buttonText.x = -p.size.w / 2; // 0.5
    this._buttonText.y = -p.size.h; // 1
    this._buttonText.x += p.margins.x;
    this._buttonText.y += p.margins.y;
    this._button.addChild(this._buttonText);
  };
  _._createTooltipA = function() {
    var p;
    p = this.params.tooltipText;
    if (p == null) {
      return;
    }
    this._tooltip = new PKD_VisualChoices.HUDText(p);
    // * Эмуляция Anchor
    this._tooltip.x = -p.size.w / 2; // 0.5
    this._tooltip.y = -p.size.h; // 1
    this._tooltip.x += p.margins.x;
    this._tooltip.y += p.margins.y;
    this._tooltip.hide();
    this.addChild(this._tooltip);
  };
  _._createTooltipD = function() {
    var p;
    p = this.params.disabledTooltipText;
    if (p == null) {
      return;
    }
    this._tooltipD = new PKD_VisualChoices.HUDText(p);
    // * Эмуляция Anchor
    this._tooltipD.x = -p.size.w / 2; // 0.5
    this._tooltipD.y = -p.size.h / 2; // 0.5
    this._tooltipD.x += p.margins.x;
    this._tooltipD.y += p.margins.y;
    this._tooltipD.hide();
    this.addChild(this._tooltipD);
  };
  _._updateTooltip = function() {
    if (this._button.isMouseIn()) {
      if (this._tooltipTimer < 0) {
        return;
      }
      this._tooltipTimer++;
      if (this._tooltipTimer > PKD_VisualChoices.PP.getTooltipDelay()) {
        this._tooltip.showWithFade(PKD_VisualChoices.PP.getTooltipAppearSpeed());
        this._tooltipTimer = -1;
      }
    } else {
      if (this._tooltipTimer < 0) {
        this._tooltip.hideWithFade(PKD_VisualChoices.PP.getTooltipHideSpeed());
        this._tooltipTimer = 0;
      } else if (this._tooltipTimer > 0) {
        this._tooltipTimer = 0;
      }
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.5.1
// * Группа выбора (меню)
(function() {
  var Sprite_UIChoiceGroup;
  // * rawChoices - это только ID элементов выбора (+ [текст на замену])
  Sprite_UIChoiceGroup = class Sprite_UIChoiceGroup extends PKD_VisualChoices.Sprite_UIElement {
    constructor(params) {
      super(params);
      // * Событие, к которому "привязано" меню
      this._bindedEvent = null;
      // * ID события к которому надо "привязать" меню
      this._bindEventId = 0;
      // * Меню было закрыто (для Interpreter)
      this.isBeenClosed = false;
    }

    isActive() {
      return true; // * Always
    }

    draw(rawChoices, headerText) {
      this.rawChoices = rawChoices;
      this.headerText = headerText;
      return this._createChoices();
    }

    defaultParams() {
      return {
        menuId: "testMenu",
        offset: {
          x: 0,
          y: 0
        },
        headerText: {
          text: "Test Menu",
          size: {
            w: 120,
            h: 80
          },
          font: {
            face: "Consolas",
            size: 14,
            italic: false
          },
          outline: {
            color: null,
            width: 2
          },
          margins: {
            x: 0,
            y: 0
          }
        },
        animation: {
          // * Продолжительность анимации открытия (движение, размер, прозрачность)
          openDuration: "0.5",
          // * Продолжительность анимации закрытия
          closeDuration: "0.3",
          // * Как меняется прозрачность за один кадр
          opacityChangePerFrame: 10,
          //TODO: С scale есть проблема
          // * Начальный scale
          scaleS: 1,
          // * Пред.конечный scale (но в итоге всегда будет 1)
          scaleE: 1
        },
        choicePos1: { // * Первый элемент выбора
          // * Начальная позиция относительно центра меню
          positionS: {
            x: 0,
            y: 0
          },
          // * Конечная позиция относительно центра меню
          positionE: {
            x: 0,
            y: -80
          }
        },
        choicePos2: { // * Второй элемент выбора
          positionS: {
            x: 0,
            y: 0
          },
          positionE: {
            x: 0,
            y: 80
          }
        },
        choicePos3: {
          positionS: {
            x: 0,
            y: 0
          },
          positionE: {
            x: 0,
            y: 0
          }
        },
        choicePos4: {
          positionS: {
            x: 0,
            y: 0
          },
          positionE: {
            x: 0,
            y: 0
          }
        },
        choicePos5: {
          positionS: {
            x: 0,
            y: 0
          },
          positionE: {
            x: 0,
            y: 0
          }
        },
        choicePos6: {
          positionS: {
            x: 0,
            y: 0
          },
          positionE: {
            x: 0,
            y: 0
          }
        }
      };
    }

    bindToEvent(_bindEventId) {
      this._bindEventId = _bindEventId;
      return this._bindedEvent = null; // * сбрасываем, чтобы переназначить событие
    }

    bindToScreen(sx, sy) {
      this.bindToEvent(-1); // * сбрасываем событие (если было)
      this.x = sx + this.params.offset.x;
      this.y = sy + this.params.offset.y;
    }

    open() {
      this.visible = true;
      this._duration = parseFloat(this.params.animation.openDuration) * 60;
      this._shouldClose = false;
      this._shouldOpen = true;
      this.setClickAllowed();
    }

    close() {
      var f;
      //$gameTemp.kdButtonUnderMouse = null
      this.setClickDisallowed();
      this._duration = parseFloat(this.params.animation.closeDuration) * 60;
      this._shouldOpen = false;
      this._headerElement.hide();
      // * Закрытие с небольшой задержкой
      f = function() {
        var c, j, len, ref, results;
        this._shouldClose = true;
        ref = this._choicesList;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          c = ref[j];
          results.push(c != null ? c.hideTooltip() : void 0);
        }
        return results;
      };
      setTimeout(f.bind(this), 100);
    }

    setKeyboardSelectMode(index) {
      var c, j, len, ref, ref1;
      ref = this._choicesList;
      for (j = 0, len = ref.length; j < len; j++) {
        c = ref[j];
        if (c == null) {
          continue;
        }
        c.setManualHover();
        c.setManualSelected(false);
      }
      if ((ref1 = this._choicesList[index]) != null) {
        ref1.setManualSelected(true);
      }
    }

    setMouseSelectMode() {
      var c, j, len, ref;
      ref = this._choicesList;
      for (j = 0, len = ref.length; j < len; j++) {
        c = ref[j];
        if (c == null) {
          continue;
        }
        c.disableManualHover();
        c.setManualSelected(false);
      }
    }

    update() {
      super.update();
      if (this._bindEventId >= 0) {
        this._updateBindPosition();
      }
      if (this._shouldOpen === true) {
        this._updateOpenProcess();
      }
      if (this._shouldClose === true) {
        return this._updateCloseProcess();
      }
    }

  };
  PKD_VisualChoices.link(Sprite_UIChoiceGroup);
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_VisualChoices.Sprite_UIChoiceGroup.prototype;
  _._createContent = function() {
    // * Чтобы Header был всегда выше, создаёт слой для кнопок
    this._contentLayer = new Sprite();
    this.addChild(this._contentLayer);
    this._createHeader();
    this._choicesList = [];
    // * Меню видимо всегда, а вот элементы зависят от Open \ Close
    // * Изменяется их Opacity
    return this.visible = true; // * Always visible
  };
  _._createHeader = function() {
    var p;
    p = this.params.headerText;
    this._headerElement = new PKD_VisualChoices.HUDText(p);
    // * Эмуляция Anchor
    this._headerElement.x = -p.size.w / 2; // 0.5
    this._headerElement.y = -p.size.h / 2; // 0.5
    this._headerElement.x += p.margins.x;
    this._headerElement.y += p.margins.y;
    this._headerElement.hide();
    this.addChild(this._headerElement);
  };
  _._createChoices = function() {
    var c, i, j, len, ref;
    ref = this.rawChoices;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      c = ref[i];
      this._createChoice(c, i);
    }
    // * Если был задан текст в команде плагина
    if (String.any(this.headerText)) {
      return this._headerElement.drawText(this.headerText);
    }
  };
  _._createChoice = function(choice, index) {
    var e, extraText, item, itemId, itemParams, regex;
    if (!String.any(choice)) {
      return;
    }
    try {
      //console.log(choice)
      itemId = choice.split(" ")[0];
      regex = /\[(.+)\]/i;
      extraText = choice.match(regex);
      if (extraText) {
        extraText = extraText[1];
      }
      if (!String.any(itemId)) {
        return;
      }
      itemParams = PKD_VisualChoices.PP.getChoiceItemById(itemId);
      if (itemParams == null) {
        return;
      }
      item = new PKD_VisualChoices.Sprite_UIChoiceItem(itemParams);
      if (extraText != null) {
        item.draw(extraText);
      }
      item.addClickIndex(index);
      this._configurateChoiceItem(item, index);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._choicesList[index] = null;
    }
  };
  _._configurateChoiceItem = function(item, index) {
    var position;
    this._choicesList[index] = item;
    item.visible = true;
    item.opacity = 0; // * at start always 0 opaticy
    position = this._getChoiceSettings(index).positionS;
    item.x = position.x;
    item.y = position.y;
    item.scale.x = 1; //@params.animation.scaleS
    item.scale.y = item.scale.x;
    item._choiceIndex = index;
    //@addChild item
    return this._contentLayer.addChild(item);
  };
  _._updateOpenProcess = function() {
    var c, j, len, ref;
    if (this._duration > 0) {
      this.increaseChoicesOpacity();
      ref = this._choicesList;
      //@changeChoicesScale(@params.animation.scaleE)
      for (j = 0, len = ref.length; j < len; j++) {
        c = ref[j];
        this.animateMoveChoice(c, "positionE");
      }
      return this._duration--;
    } else {
      return this._onOpenDone();
    }
  };
  _.increaseChoicesOpacity = function() {
    var c, j, len, ref;
    ref = this._choicesList;
    for (j = 0, len = ref.length; j < len; j++) {
      c = ref[j];
      if (c != null) {
        c.opacity += this.params.animation.opacityChangePerFrame;
      }
    }
  };
  _.changeChoicesScale = function(scale) {
    var c, d, j, len, ref;
    ref = this._choicesList;
    for (j = 0, len = ref.length; j < len; j++) {
      c = ref[j];
      if (c == null) {
        continue;
      }
      d = this._duration;
      c.scale.x = (c.scale.x * (d - 1) + scale) / d;
      c.scale.y = c.scale.x;
      return;
    }
  };
  _.animateMoveChoice = function(item, positionType) {
    var d, position, tx, ty;
    if (item == null) {
      return;
    }
    position = this._getChoiceSettings(item._choiceIndex)[positionType];
    tx = position.x;
    ty = position.y;
    d = this._duration;
    item.x = (item.x * (d - 1) + tx) / d;
    item.y = (item.y * (d - 1) + ty) / d;
  };
  _._getChoiceSettings = function(index) {
    return this.params["choicePos" + (index + 1)];
  };
  _._onOpenDone = function() {
    this._shouldOpen = false;
    this.setChoicesOpaque();
    this.resetChoicesScales();
    return this._headerElement.showWithFade(25);
  };
  _.setChoicesOpaque = function() {
    var c, j, len, ref, results;
    ref = this._choicesList;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      c = ref[j];
      results.push(c != null ? c.opacity = 255 : void 0);
    }
    return results;
  };
  _.resetChoicesScales = function() {
    var c, j, len, ref, results;
    ref = this._choicesList;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      c = ref[j];
      if (c == null) {
        continue;
      }
      c.scale.x = 1;
      results.push(c.scale.y = 1);
    }
    return results;
  };
  _._updateCloseProcess = function() {
    var c, j, len, ref;
    if (this._duration > 0) {
      this.decreaseChoicesOpacity();
      ref = this._choicesList;
      //@changeChoicesScale(@params.animation.scaleS)
      for (j = 0, len = ref.length; j < len; j++) {
        c = ref[j];
        this.animateMoveChoice(c, "positionS");
      }
      return this._duration--;
    } else {
      return this._onCloseDone();
    }
  };
  _.decreaseChoicesOpacity = function() {
    var c, j, len, ref;
    ref = this._choicesList;
    for (j = 0, len = ref.length; j < len; j++) {
      c = ref[j];
      if (c != null) {
        c.opacity -= this.params.animation.opacityChangePerFrame;
      }
    }
  };
  _._onCloseDone = function() {
    var ref;
    this._shouldClose = false;
    this.setChoicesTransparent();
    this.isBeenClosed = true;
    this.visible = false;
    if ((ref = this.parent) != null) {
      ref.removeChild(this);
    }
  };
  _.setChoicesTransparent = function() {
    var c, j, len, ref, results;
    ref = this._choicesList;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      c = ref[j];
      results.push(c != null ? c.opacity = 0 : void 0);
    }
    return results;
  };
  _.setClickAllowed = function() {
    var c, j, len, ref, results;
    ref = this._choicesList;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      c = ref[j];
      results.push(c != null ? c.enableClick() : void 0);
    }
    return results;
  };
  _.setClickDisallowed = function() {
    var c, j, len, ref, results;
    ref = this._choicesList;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      c = ref[j];
      results.push(c != null ? c.disableClick() : void 0);
    }
    return results;
  };
  _._updateBindPosition = function() {
    if (this._bindedEvent == null) {
      if (this._bindEventId > 0) {
        this._bindedEvent = $gameMap.event(this._bindEventId);
      } else {
        this._bindedEvent = $gamePlayer;
      }
      if (this._bindedEvent == null) {
        // * Something gone wrong
        this._bindEventId = -1;
      }
    } else {
      this.x = this._bindedEvent.screenX() + this.params.offset.x;
      this.y = this._bindedEvent.screenY() + this.params.offset.y;
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------

(function(){
    
    //@[ALIAS]
    var _alias_DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        PKD_VisualChoices.LoadPluginSettings();
        _alias_DataManager_loadDatabase.call(this);
    };

})();
// Generated by CoffeeScript 2.5.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__close, ALIAS__select, ALIAS__start, ALIAS__update, ALIAS__updatePlacement, _;
  //@[DEFINES]
  _ = Window_ChoiceList.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    this._pPrepareVisualMenu();
    ALIAS__start.call(this);
    if (this._pVisualMode === true) {
      return this._pShowVisualMenu();
    }
  };
  
  //@[ALIAS]
  ALIAS__updatePlacement = _.updatePlacement;
  _.updatePlacement = function() {
    ALIAS__updatePlacement.call(this);
    if (this._pVisualMode === true) {
      return this._pUpdatePlacementToOutScreen();
    } else {
      return ALIAS__updatePlacement.call(this);
    }
  };
  //@[ALIAS]
  ALIAS__close = _.close;
  _.close = function() {
    ALIAS__close.call(this);
    if (this._pVisualMode === true) {
      $gameTemp._nextChoiceShouldBeVisual = false;
      $gameTemp._visualMenuOptions = null;
      this._pHideVisualMenu();
    }
  };
  //@[ALIAS]
  ALIAS__select = _.select;
  _.select = function(index) {
    ALIAS__select.call(this, index);
    if (this._pVisualMode !== true) {
      return;
    }
    // * Если выбор мышкой, то не учитываем
    if ($gameTemp._pVCCI >= 0) {
      return;
    }
    this._pSwitchToVisualMenuKeyboardSelectMode(index);
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._pVisualMode === true) {
      this._pUpdateVisModeMouseLock();
      this._pUpdateVisModeSelecting();
    }
  };
})();

// ■ END Window_ChoiceList.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var a0_0x41e4=['1zngMNK','13603RcsTLb','_pSimulateDownClick','282253Myxmxz','_pSimulateUpClick','LYOaC','prototype','select','_pVisualMode','_pUpdateVisModeSelecting','IwsMO','addChild','1908094FaTtHS','menuId','choiceDefaultType','_pHideVisualMenu','right','SqDny','_nextChoiceShouldBeVisual','888184fwGuRB','bindToEvent','width','_visualMenuOptions','posType','GejKC','_pVCMenu','Jfwrv','KUBqI','CNmAq','_pUpdatePlacementToOutScreen','_pSwitchToVisualMenuKeyboardSelectMode','draw','773274PQMtha','struct','setMouseSelectMode','Sprite_UIChoiceGroup','parseParamItem','1Csjqyx','eventId','IbPdN','464413ruoQxv','_scene','_pVisualModeLockMouse','bindToScreen','_pApplyBindingOptionsToMenu','screenXY','warn','_pSimulateOkClick','1387869HLOCPr','choices','virtualClick','left','86QGrnSV','headerText','_pPrepareVisualMenu','_interpreter','down','setKeyboardSelectMode','isTriggered','cXoAl','close','ParamLoader','_pUpdateVisModeMouseLock','screenXYmv','_pVCCI'];var a0_0x1370=function(_0x480b80,_0x17f6a2){_0x480b80=_0x480b80-0x186;var _0x41e4c9=a0_0x41e4[_0x480b80];return _0x41e4c9;};(function(_0x34fd50,_0x324124){var _0x260dc6=a0_0x1370;while(!![]){try{var _0xd3c797=-parseInt(_0x260dc6(0x1ab))+parseInt(_0x260dc6(0x18e))*parseInt(_0x260dc6(0x1b0))+-parseInt(_0x260dc6(0x1bb))+-parseInt(_0x260dc6(0x1b3))*-parseInt(_0x260dc6(0x18b))+-parseInt(_0x260dc6(0x18c))*-parseInt(_0x260dc6(0x1bf))+-parseInt(_0x260dc6(0x19e))+parseInt(_0x260dc6(0x197));if(_0xd3c797===_0x324124)break;else _0x34fd50['push'](_0x34fd50['shift']());}catch(_0x2cde19){_0x34fd50['push'](_0x34fd50['shift']());}}}(a0_0x41e4,0xbd47b),function(){var _0x79c374=a0_0x1370,_0x28f999;_0x28f999=Window_ChoiceList[_0x79c374(0x191)],_0x28f999[_0x79c374(0x1c1)]=function(){var _0xf76ea7=_0x79c374;if(_0xf76ea7(0x195)!=='UamdQ'){$gameTemp[_0xf76ea7(0x18a)]=-0x1,this['_pVisualMode']=$gameTemp[_0xf76ea7(0x19d)]===!![];if($gameTemp[_0xf76ea7(0x1a1)]==null){if('LYOaC'===_0xf76ea7(0x190))this[_0xf76ea7(0x193)]=![];else{function _0x3820ad(){_0x5f22b6['setMouseSelectMode']();}}}this[_0xf76ea7(0x1b5)]=null;}else{function _0x1d499c(){_0x1abd96['setKeyboardSelectMode'](_0x523bd5);}}},_0x28f999[_0x79c374(0x1a8)]=function(){var _0x402239=_0x79c374;return this['x']=Graphics[_0x402239(0x1a0)]+0x3e8,this['y']=Graphics['height']+0x3e8;},_0x28f999[_0x79c374(0x1a9)]=function(_0x3073b7){var _0x283b5e=_0x79c374,_0x5f4e41;this[_0x283b5e(0x1b5)]=TouchInput['y'],(_0x5f4e41=this[_0x283b5e(0x1a4)])!=null&&_0x5f4e41[_0x283b5e(0x1c4)](_0x3073b7);},_0x28f999[_0x79c374(0x1ba)]=function(){var _0x123e03=_0x79c374;return Input[_0x123e03(0x1bd)]('ok');},_0x28f999[_0x79c374(0x18f)]=function(){if('mGgos'==='mGgos')return Input['virtualClick']('up');else{function _0x5a42aa(){var _0x19c789=a0_0x1370;return _0x2e40e3[_0x19c789(0x1bd)](_0x19c789(0x1c3));}}},_0x28f999['_pSimulateDownClick']=function(){return Input['virtualClick']('down');},_0x28f999['_pShowVisualMenu']=function(){var _0x25ede0=_0x79c374;if(_0x25ede0(0x1c6)!==_0x25ede0(0x19c)){var _0x4cfe5d,_0x2b62e2,_0x420def;try{_0x420def=$gameTemp['_visualMenuOptions'],_0x2b62e2=PKD_VisualChoices['PP']['getChoiceGroupById'](_0x420def[_0x25ede0(0x198)]);if(_0x2b62e2==null){this[_0x25ede0(0x193)]=![];return;}this[_0x25ede0(0x1a4)]=new PKD_VisualChoices[(_0x25ede0(0x1ae))](_0x2b62e2),this[_0x25ede0(0x1a4)][_0x25ede0(0x1aa)]($gameMessage[_0x25ede0(0x1bc)](),_0x420def[_0x25ede0(0x1c0)]),this[_0x25ede0(0x1b7)](_0x420def),this['_pVCMenu']['open']();try{this[_0x25ede0(0x1a9)]($gameMessage[_0x25ede0(0x199)]());}catch(_0x35b1f7){_0x4cfe5d=_0x35b1f7,console[_0x25ede0(0x1b9)](_0x4cfe5d);}SceneManager[_0x25ede0(0x1b4)][_0x25ede0(0x196)](this[_0x25ede0(0x1a4)]);}catch(_0x5e81c5){if(_0x25ede0(0x1a6)===_0x25ede0(0x1a6))_0x4cfe5d=_0x5e81c5,console[_0x25ede0(0x1b9)](_0x4cfe5d),this[_0x25ede0(0x193)]=![];else{function _0x1dfa43(){var _0x448393=_0x25ede0;_0x57f15e[_0x448393(0x18a)]>=0x0&&(this['select'](_0x4637df['_pVCCI']),this['_pSimulateOkClick'](),_0xf18186['_pVCCI']=-0x1),_0x181773['isTriggered'](_0x448393(0x1be))&&this[_0x448393(0x18f)](),_0xb22c2b[_0x448393(0x1c5)](_0x448393(0x19b))&&this[_0x448393(0x18d)]();}}}}else{function _0x2ba635(){this['_pSwitchToVisualMenuKeyboardSelectMode'](_0x24b018['choiceDefaultType']());}}},_0x28f999[_0x79c374(0x1b7)]=function(_0x55fdef){var _0xf350f6=_0x79c374,_0x3421a8,_0x475abd,_0x444008,_0x28874e;try{_0x28874e=parseInt(_0x55fdef[_0xf350f6(0x1a2)]);switch(_0x28874e){case-0x1:try{_0x444008=$gameMap[_0xf350f6(0x1c2)][_0xf350f6(0x1b1)]();}catch(_0x312283){_0x475abd=_0x312283,console['warn'](_0x475abd),_0x444008=0x0;}return this[_0xf350f6(0x1a4)]['bindToEvent'](_0x444008);case-0x2:try{if(_0x55fdef['screenXY']!=null){if(_0xf350f6(0x1b2)!=='YLLdy')_0x3421a8=new KDCore[(_0xf350f6(0x187))]('')[_0xf350f6(0x1af)](_0xf350f6(0x1ac),_0x55fdef[_0xf350f6(0x1b8)]);else{function _0x2f5d17(){var _0x2dd6cd=_0xf350f6;(_0x4d5c34=this['_pVCMenu'])!=null&&_0x34c545[_0x2dd6cd(0x1ad)](),this['_pVisualModeLockMouse']=null;}}}else _0x3421a8=_0x55fdef[_0xf350f6(0x189)];}catch(_0x105709){_0x475abd=_0x105709,console[_0xf350f6(0x1b9)](_0x475abd),_0x3421a8={'x':0x0,'y':0x0};}return this[_0xf350f6(0x1a4)][_0xf350f6(0x1b6)](_0x3421a8['x'],_0x3421a8['y']);default:return this[_0xf350f6(0x1a4)][_0xf350f6(0x19f)](_0x28874e);}}catch(_0x14b629){return _0x475abd=_0x14b629,console[_0xf350f6(0x1b9)](_0x475abd);}},_0x28f999[_0x79c374(0x19a)]=function(){var _0x32f59e=_0x79c374;if(_0x32f59e(0x1a7)===_0x32f59e(0x1a7))return this[_0x32f59e(0x1a4)][_0x32f59e(0x186)]();else{function _0xf2623b(){var _0x1c2280=_0x32f59e;this[_0x1c2280(0x18d)]();}}},_0x28f999[_0x79c374(0x188)]=function(){var _0x3366bd=_0x79c374,_0x474932;if(this[_0x3366bd(0x1b5)]!=null){if(_0x3366bd(0x1a3)!==_0x3366bd(0x1a5))TouchInput['y']!==this[_0x3366bd(0x1b5)]&&((_0x474932=this[_0x3366bd(0x1a4)])!=null&&_0x474932['setMouseSelectMode'](),this[_0x3366bd(0x1b5)]=null);else{function _0x3e1f51(){var _0x43e3cc=_0x3366bd;_0x3a88ac['y']!==this[_0x43e3cc(0x1b5)]&&((_0x27b8fc=this[_0x43e3cc(0x1a4)])!=null&&_0x35930a[_0x43e3cc(0x1ad)](),this[_0x43e3cc(0x1b5)]=null);}}}},_0x28f999[_0x79c374(0x194)]=function(){var _0x27e85e=_0x79c374;$gameTemp[_0x27e85e(0x18a)]>=0x0&&(this[_0x27e85e(0x192)]($gameTemp['_pVCCI']),this[_0x27e85e(0x1ba)](),$gameTemp[_0x27e85e(0x18a)]=-0x1),Input[_0x27e85e(0x1c5)](_0x27e85e(0x1be))&&this['_pSimulateUpClick'](),Input[_0x27e85e(0x1c5)]('right')&&this[_0x27e85e(0x18d)]();};}());
})();

//Plugin PKD_VisualChoices automatic build by PKD PluginBuilder 1.9.2 20.04.2021
