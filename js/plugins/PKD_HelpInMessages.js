/*
 * Copyright (c) 2022 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

 */

/*:
 * @plugindesc (v.1.1)[PRO] Allows you create mini hint messages for any word or sentence in messages
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/help-in-messages
 *
 * @help
 * ---------------------------------------------------------------------------
 * 
 * ===========================================================================
 * Use pair escape-code \TM
 *   \TM[ID]WORD\TM
 * ID - it's information ID from Help Messages Plugin Parameter
 * WORD - it's word you want show help window when hovered
 * 
 * Example Message
 * Can you bring me \TM[test]Magic Shard\TM?
 *
 * You can find examples in Demo Project
 * ---------------------------------------------------------------------------
 * Add hints for Items and Skills [PRO only]
 *
 * Add to Item\Weapon\Armor\Skill Note's
 * <pHint:ID>
 *      ID - it's information ID from Help Messages Plugin Parameter
 *  ! Plugin Parameter: Is Show Item Hints? should be ON
 *
 * You can find examples in Demo Project
 * ---------------------------------------------------------------------------
 *
 * Plugin commands:
 *
 *  For RPG Maker MZ:
 *      SetWrap - Activate or Deactivate Auto Wraping
 *      SetHints - Activate or Deactivate Hint windows 
 *
 *  For RPG Maker MV:
 *      HIM SetWrap true
 *      HIM SetWrap false
 *      HIM SetHints true
 *      HIM SetHints false
 * ---------------------------------------------------------------------------
 * Extra control characters [ONLY FOR RPG MAKER MZ]
 * 
 * \Chex[HEX] - hex color
 *
 *      Example: \Chex[#9842f5] hex color example \C[0]
 *
 * \Isz[INDEX, SIZE, X, Y] - icon with size and extra margins
 *
 *      Example: \Isz[44, 20, 0, 6] - show icon 44 (20 x 20 px) and move extra 6 by Y
 *
 * \Psz[FILENAME, W, H, X, Y] - picture with size and extra margins
 *
 *      Example: \Psz[Actor1_1, 30, 30, -4, 0] - show image pictures\Actor1_1.png
 *                                              with size 30px x 30px and move -4 by X
 * 
 * You can find examples in Demo Project
 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty or Patreon!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 * 

* License: Creative Commons 4.0 Attribution, Share Alike, Commercial

 *
 * @param Show Delay
 * @text Show Delay
 * @type number
 * @min 1
 * @max 1000
 * @default 20
 * @desc Delay before Help window will appear
 * 
 * @param Help Messages
 * @text Help Messages
 * @type struct<LinkInfo>[]
 * @default ["{\"Id\":\"test\",\"Width\":\"220\",\"Height\":\"120\",\"Background Type\":\"Window\",\"Windowskin\":\"HelpWindowSkin\",\"Text\":\"\\\"\\\\\\\\C[1]Magic Shard \\\\\\\\I[312]\\\\\\\\C[0]\\\\n\\\\\\\\}Some cool and rare item...\\\\nMagic shard used for....\\\\n\\\"\"}", "{\"Id\":\"test2\",\"Width\":\"280\",\"Height\":\"120\",\"Background Type\":\"Window\",\"Windowskin\":\"HelpWindowSkin\",\"Text\":\"\\\"\\\\\\\\C[2]Slime \\\\\\\\I[320]\\\\\\\\C[0]\\\\n\\\\\\\\}Some monster description...\\\\nBe aware of slimes water attacks\\\\n\\\\n\\\"\"}"]
 * 
 * @param Auto Wrap Sentences
 * @text Auto Wrap Sentences
 * @type struct<ExtraWrap>[]
 * @desc You can add auto wrapping for some sentance in messages
 * @default []
 * 
 * @param spacer|ItemsAndSkills @text‏‏‎ ‎@desc ===============================================
 * 
 * @param IsShowItemHints
 * @type boolean
 * @text Is Show Item Hints?
 * @on Show
 * @off No
 * @default true
 * @desc Shows hints for items and skills [PRO only] if item (or skill) have a special Notetag
 * 
 * @param ShowItemHintTimeDelay
 * @text Delay
 * @parent IsShowItemHints
 * @default 10
 * @min 0
 * @desc Delay (in frames) before hint appears after item (skill) is selected
 * 
 * @param ItemHelpWindowPosToCursor
 * @text At mouse pos?
 * @parent IsShowItemHints
 * @type boolean
 * @default false
 * @on Mouse cursor
 * @off Item itself
 * @desc Bind hint window position to mouse cursor or item itself?
 * 
 * @param ItemHelpWindowPosMargins
 * @text Margins
 * @parent ItemHelpWindowPosToCursor
 * @type struct<XY>
 * @desc Extra margins for hint window position (this values will be added to position X, Y)
 * @default {"x":"0","y":"0"}
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * @command SetWrap
 * @text Set Wrap State
 * @desc Activate or Deactivate Auto Wraping
 * 
 * @arg active
 * @text Active
 * @desc Active Or Not
 * @type boolean
 * @default true
 * 
 * @command SetHints
 * @text Set Hints State
 * @desc Activate or Deactivate Hint windows
 * 
 * @arg active
 * @text Active
 * @desc Active Or Not
 * @type boolean
 * @default true
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*
 * Copyright (c) 2022 Владимир Скрыпников (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

* Лицензия: Creative Commons 4.0 Attribution, Share Alike, Commercial

 */

/*:ru
 * @plugindesc (v.1.1)[PRO] Создавайте подсказки в сообщениях или для предметов
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/help-in-messages
 *
 * @help
 * ---------------------------------------------------------------------------
 * 
 * ===========================================================================
 * Используйте парный код \TM
 *   \TM[ID]СЛОВО\TM
 * ID - Уникальный идентификатор подсказки (из параметра Подсказки, поле ID)
 * СЛОВО - Это собственно слово (или предложение) при наведении курсора на которое
 *      будет показана подсказка
 * 
 * Пример:
 * Можешь принести мне \TM[шар]магический шар\TM?
 *
 * Примеры можно найти в демке
 * ---------------------------------------------------------------------------
 * Добавляем подсказки для предметов и навыков [только для ПРО версии]
 *
 * Добавить для Предмета\Оружия\Экипировки\Навыка след. заметку:
 * <pHint:ID>
 *      ID - Уникальный идентификатор подсказки
 *  ! Параметр плагина: "Для предметов?" должен быть ВКЛ.
 *
 * Примеры можно найти в демке
 * ---------------------------------------------------------------------------
 *
 * Команды плагина:
 *
 *  Для RPG Maker MZ:
 *      SetWrap - Вкл. или Выкл. авто-подстановку в игре
 *      SetHints - Вкл. или Выкл. подсказки в игре 
 *
 *  Для RPG Maker MV:
 *      HIM SetWrap true
 *      HIM SetWrap false
 *      HIM SetHints true
 *      HIM SetHints false
 * ---------------------------------------------------------------------------
 * Доп. управляющие символы [Только для RPG MAKER MZ]
 * 
 * \Chex[HEX] - цвет в hex формате
 *
 *      Пример: \Chex[#9842f5] пример цвета в 16 формате \C[0]
 *
 * \Isz[INDEX, SIZE, X, Y] - иконка с указанным размером SIZE и отступами по X и Y
 *
 *      Пример: \Isz[44, 20, 0, 6]
 *          - показать иконку 44 (20 x 20 размер) и сдвинуть по Y на 6 пикселей
 *
 * \Psz[FILENAME, W, H, X, Y] - картинка (W, H - размер)
 *
 *      Пример: \Psz[Actor1_1, 30, 30, -4, 0] - показать картинку pictures\Actor1_1.png
 *                                              размером 30px x 30px и сдвиг -4 по X
 * 
 * Примеры можно найти в демке
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * 

* Лицензия: Creative Commons 4.0 Attribution, Share Alike, Commercial

 *

 * @param Show Delay
 * @text Задержка
 * @type number
 * @min 1
 * @max 1000
 * @default 20
 * @desc Задержка (в кадрах) перед появлением окна подсказки
 * 
 * @param Help Messages
 * @text Подсказки
 * @type struct<LinkInfo>[]
 * @default ["{\"Id\":\"test\",\"Width\":\"220\",\"Height\":\"120\",\"Background Type\":\"Window\",\"Windowskin\":\"HelpWindowSkin\",\"Text\":\"\\\"\\\\\\\\C[1]Magic Shard \\\\\\\\I[312]\\\\\\\\C[0]\\\\n\\\\\\\\}Some cool and rare item...\\\\nMagic shard used for....\\\\n\\\"\"}", "{\"Id\":\"test2\",\"Width\":\"280\",\"Height\":\"120\",\"Background Type\":\"Window\",\"Windowskin\":\"HelpWindowSkin\",\"Text\":\"\\\"\\\\\\\\C[2]Slime \\\\\\\\I[320]\\\\\\\\C[0]\\\\n\\\\\\\\}Some monster description...\\\\nBe aware of slimes water attacks\\\\n\\\\n\\\"\"}"]
 * 
 * @param Auto Wrap Sentences
 * @text Авто-подстановка
 * @type struct<ExtraWrap>[]
 * @desc Вы можете задать авто-подстановку контрольных символов для определённых предложений или слов
 * @default []
 * 
 * @param spacer|ItemsAndSkills @text‏‏‎ ‎@desc ===============================================
 * 
 * @param IsShowItemHints
 * @type boolean
 * @text Для предметов?
 * @on Показывать
 * @off Нет
 * @default true
 * @desc Показывать подсказки для предметов или навыков [PRO] если у них есть специальная заметка
 * 
 * @param ShowItemHintTimeDelay
 * @text Задержка
 * @parent IsShowItemHints
 * @default 10
 * @min 0
 * @desc Задержка (в кадрах) перед появлением окна подсказки (когда предмет выбран)
 * 
 * @param ItemHelpWindowPosToCursor
 * @text Позиция - курсор?
 * @parent IsShowItemHints
 * @type boolean
 * @default false
 * @on Курсор мышки
 * @off Название предмета
 * @desc Подсказка будет появляться относительно позиции курсора мышки или текста предмета?
 * 
 * @param ItemHelpWindowPosMargins
 * @text Отступы
 * @parent ItemHelpWindowPosToCursor
 * @type struct<XY>
 * @desc Доп. отступы для позиции окна подсказки (будут прибавлены к позиции окна подсказки)
 * @default {"x":"0","y":"0"}
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * @command SetWrap
 * @text Авто-подстановка
 * @desc Вкл. или Выкл. автоподстановку в тексте
 * 
 * @arg active
 * @text Включена?
 * @desc
 * @type boolean
 * @default true
 * 
 * @command SetHints
 * @text Подсказки
 * @desc Включить или выключить показ подсказок в тексте
 * 
 * @arg active
 * @text Включена?
 * @desc
 * @type boolean
 * @default true
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*~struct~LinkInfo:
 * @param Id
 * @type text
 * @default new
 * @desc Any word, but should be unique for each Help message!
 *
 * @param Width
 * @type number
 * @min 1
 * @max 1000
 * @default 320
 * @desc Text window width
 * 
 * @param Height
 * @type number
 * @min 1
 * @max 1000
 * @default 140
 * @desc Text window height
 * 
 * @param Background Type
 * @type combo
 * @option Window
 * @option Dim
 * @option Transparent
 * @default Window
 * 
 * @param Windowskin
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default HelpWindowSkin
 * 
 * @param Text
 * @type note
 * @desc Message text, support escape symbols
 * @default Some text...
 *
 * @param Txt
 * @desc Message text from .txt file. Have priority. Filename without extension. File should be in data\Hints\NAME.txt
 * @default
 */

/*~struct~LinkInfo:ru
 * @param Id
 * @type text
 * @default new
 * @desc Идентификатор, любое слово, но уникальное!
 *
 * @param Width
 * @text Ширина
 * @type number
 * @min 1
 * @max 1000
 * @default 320
 * @desc Ширина окна подсказки
 * 
 * @param Height
 * @text Высота
 * @type number
 * @min 1
 * @max 1000
 * @default 140
 * @desc Высота окна подсказки
 * 
 * @param Background Type
 * @text Задник
 * @type combo
 * @option Window
 * @option Dim
 * @option Transparent
 * @default Window
 * @desc Задник окна (window - обычный, dim - затемнённый, transparent - прозрачный (нету))
 * 
 * @param Windowskin
 * @text Графика
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default HelpWindowSkin
 * @desc Графика для задника окна (если используеются опция Window)
 * 
 * @param Text
 * @text Текст
 * @type note
 * @desc Текст подсказки, поддержкивает контрольные символы \V, \С и т.д.
 * @default Some text...
 *
 * @param Txt
 * @text TXT файл (имя)
 * @desc Имя .txt файла для подсказки. Приоритет. Имя файла без расширения. Файл должен быть в data\Hints\ИМЯ.txt
 * @default
 */


/*~struct~ExtraWrap:
 * @param Sentence
 * @type text
 * @default Hello World
 * @desc Sentence that be wrapped
 *
 * @param Start
 * @type text
 * @default \C[1]
 * @desc Symbol before sentence
 * 
 * @param End
 * @type text
 * @default \C[0]
 * @desc Symbol after sentence
 */

 /*~struct~ExtraWrap:ru
 * @param Sentence
 * @text Предложение
 * @type text
 * @default Hello World
 * @desc Предложение, которое будет обёрнуто
 *
 * @param Start
 * @text В начало
 * @type text
 * @default \C[1]
 * @desc Символы, которые будут добавлены в начало предложения
 * 
 * @param End
 * @text В конец
 * @type text
 * @default \C[0]
 * @desc Символы, которые будут добавлены в конец предложения
 */

/*~struct~XY:

 * @param x
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y
 * @text Y
 * @type number
 * @default 0
 * @min -1000

*/
/*~struct~XY:ru

 * @param x
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y
 * @text Y
 * @type number
 * @default 0
 * @min -1000

*/


window.Imported = window.Imported || {};
Imported.PKD_HelpInMsg = true;

window.PKD_HelpInMsg = {};
PKD_HelpInMsg.version = 100;

PKD_HelpInMsg.isPro = () => true;



(function(){
    
    PKD_HelpInMsg.isMV = function() {
        return Utils.RPGMAKER_NAME.contains("MV");
    };

    PKD_HelpInMsg.getHelpMessage = function (id) {
        return PKD_HelpInMsg.getJDataById(id, PKD_HelpInMsg.HelpMessagesData);
    };

    PKD_HelpInMsg.getWrapSymbols = function(sentence) {
        return PKD_HelpInMsg.AutoWrapWords.find((element) => element.Sentence == sentence);
    };

    PKD_HelpInMsg.prepareHelpMessageSkin = function (id) {
        var data = PKD_HelpInMsg.getHelpMessage(id);
        if(data) {
            ImageManager.loadPicture(data.Windowskin);
        }
    };


})();

PKD_HelpInMsg.loadParams = function(){
        PKD_HelpInMsg.initTxtDB();
        const pluginName = "PKD_HelpInMessages";
        const params = PluginManager.parameters(pluginName);

        let ParsePluginHelpData = () => {
            let lines = JsonEx.parse(params["Help Messages"]);
            let parsed = lines.map((l) => JsonEx.parse(l));
            parsed.forEach(element => {
                if(element.Text)
                    element.Text = JsonEx.parse(element.Text);
                else
                    element.Text = "";
                PKD_HelpInMsg.loadTxt(element.Txt);
                element.Width = parseInt(element.Width);
                element.Height = parseInt(element.Height);
            });
            return parsed;
        };

        let ParsePluginAutoWrapData = () => {
            let lines = JsonEx.parse(params["Auto Wrap Sentences"]);
            let parsed = lines.map((l) => JsonEx.parse(l));
            return parsed;
        };

        PKD_HelpInMsg.HelpMessagesData = ParsePluginHelpData();
        PKD_HelpInMsg.AutoWrapWords = ParsePluginAutoWrapData();
        PKD_HelpInMsg.WordsCollection = PKD_HelpInMsg.AutoWrapWords.map((element) => element.Sentence);
        PKD_HelpInMsg.TIME_TO_SHOW = parseInt(params["Show Delay"]) || 20;
        PKD_HelpInMsg.LINK_SYMBOL = 'TM';

        // * ITEMS HINTS
        PKD_HelpInMsg.IsShowItemHints = eval(params.IsShowItemHints || 'true');
        PKD_HelpInMsg.ShowItemHintTimeDelay = parseInt(params.ShowItemHintTimeDelay || 10);
        PKD_HelpInMsg.ItemHelpWindowPosToCursor = eval(params.ItemHelpWindowPosToCursor || 'false');
        PKD_HelpInMsg.ItemHelpWindowPosMargins = JsonEx.parse(params.ItemHelpWindowPosMargins || '{"x":"0","y":"0"}');
        PKD_HelpInMsg.ItemHelpWindowPosMargins.x = parseInt(PKD_HelpInMsg.ItemHelpWindowPosMargins.x);
        PKD_HelpInMsg.ItemHelpWindowPosMargins.y = parseInt(PKD_HelpInMsg.ItemHelpWindowPosMargins.y);

        if(!PKD_HelpInMsg.isMV()) {
            PluginManager.registerCommand(pluginName, 'SetWrap', args => {
                try {
                    let value = eval(args.active);
                    $gameSystem.him_autoWW = value;
                } catch (e) {
                    console.warn(e);
                }
            });

            PluginManager.registerCommand(pluginName, 'SetHints', args => {
                try {
                    let value = eval(args.active);
                    $gameSystem.him_hints = value;
                } catch (e) {
                    console.warn(e);
                }
            });
        }
};


(function(){
    
    // * Только для RPG Maker MV
    if(!PKD_HelpInMsg.isMV()) {
        return;
    }

    //@[ALIAS]
    var _Game_Interpreter_pluginCommand_3434 = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand_3434.call(this, command, args);
        if (command === 'HIM') {
            try {
                var state = false;
                switch (args[0]) {
                    case "SetWrap":
                        state = eval(args[1]);
                        $gameSystem.him_autoWW = state;
                        break;
                    case "SetHints":
                        state = eval(args[1]);
                        $gameSystem.him_hints = state;
                        break;
                    default:
                        break;
                }
            } catch (e) {
                console.warn(e);
            }
        }
    };

})();

// Generated by CoffeeScript 2.6.1
String.prototype.replaceAll = function(search, replacement) {
  var target;
  target = this;
  return target.split(search).join(replacement);
};


// Generated by CoffeeScript 2.6.1
(function() {
  if (!PKD_HelpInMsg.isMV()) {
    return;
  }
  if ((window.KDCore != null) && window.KDCore.Version >= '2.8') {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__initialize, _;
    
    //@[DEFINES]
    _ = Window_Base.prototype;
    
    // * Чтоб можно было Rectangle принимать в конструктор
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(x, y, w, h) {
      if (x instanceof PIXI.Rectangle || x instanceof Rectangle) {
        return ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
      } else {
        return ALIAS__initialize.call(this, ...arguments);
      }
    };
  })();
})();

// ■ END Window_Base.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  var alias_TIOMM;
  if (!PKD_HelpInMsg.isMV()) {
    return;
  }
  if ((window.KDCore != null) && window.KDCore.Version >= '2.8') {
    return;
  }
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


// Generated by CoffeeScript 2.6.1
(function() {
  PKD_HelpInMsg.initTxtDB = function() {
    if (this.txtDb == null) {
      return this.txtDb = {};
    }
  };
  PKD_HelpInMsg.loadTxt = function(filename) {
    var e;
    if (filename == null) {
      return;
    }
    if (filename === "") {
      return;
    }
    try {
      PKD_HelpInMsg.loadTxtFile(filename, filename + ".txt");
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  PKD_HelpInMsg.loadTxtFile = function(name, src) {
    var url, xhr;
    xhr = new XMLHttpRequest();
    url = "data/Hints/" + src;
    xhr.open("GET", url);
    xhr.overrideMimeType('text/plain');
    xhr.onload = function() {
      if (xhr.status < 400) {
        return PKD_HelpInMsg.txtDb[name] = xhr.responseText;
      } else {
        return console.warn("Can't load hint .txt file " + src);
      }
    };
    xhr.send();
  };
})();


// Generated by CoffeeScript 2.6.1
(function() {
  PKD_HelpInMsg.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  PKD_HelpInMsg.getJDataById = function(id, source) {
    var d, i, len;
    for (i = 0, len = source.length; i < len; i++) {
      d = source[i];
      if (d.Id === id) {
        return d;
      }
    }
    return null;
  };
  PKD_HelpInMsg.processExtraWrapText = function(text) {
    var End, Start, i, len, ref, result, w;
    if (PKD_HelpInMsg.WordsCollection.length === 0) {
      return text;
    }
    if (!$gameSystem.pkdIsAutoWWEnabled()) {
      return text;
    }
    ref = PKD_HelpInMsg.WordsCollection;
    for (i = 0, len = ref.length; i < len; i++) {
      w = ref[i];
      if (text.contains(w)) {
        ({Start, End} = PKD_HelpInMsg.getWrapSymbols(w));
        if (!((Start != null) || (End != null))) {
          continue;
        }
        result = Start + w + End;
        text = text.replaceAll(w, result);
      }
    }
    return text;
  };
  PKD_HelpInMsg.getItemHint = function(item) {
    var hintId;
    if ((item != null) && (item.meta != null) && (item.meta.pHint != null) && item.meta.pHint !== "") {
      hintId = item.meta.pHint;
      return PKD_HelpInMsg.getHelpMessage(hintId);
    }
    return null;
  };
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDatabase, _;
  //@[DEFINES]
  _ = DataManager;
  //@[ALIAS]
  ALIAS__loadDatabase = _.loadDatabase;
  _.loadDatabase = function() {
    ALIAS__loadDatabase.call(this);
    PKD_HelpInMsg.loadParams();
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Game_System.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    this.him_autoWW = true;
    return this.him_hints = true;
  };
  _.pkdIsHintsEnabled = function() {
    return this.him_hints === true;
  };
  _.pkdIsAutoWWEnabled = function() {
    return this.him_autoWW === true;
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  var Sprite_HoverLinkZone;
  Sprite_HoverLinkZone = class Sprite_HoverLinkZone extends Sprite {
    constructor(w, h, info) {
      super(new Bitmap(w, h));
      this.info = info;
    }

    isContainsPoint(point) {
      var rect, rx, ry;
      rx = PKD_HelpInMsg.toGlobalCoord(this, 'x');
      ry = PKD_HelpInMsg.toGlobalCoord(this, 'y');
      rect = new Rectangle(rx, ry, this.width, this.height);
      return rect.contains(point.x, point.y);
    }

    isMouseIn() {
      if (this.visible === true) {
        return this.isContainsPoint(TouchInput);
      } else {
        return false;
      }
    }

    removeFromParent() {
      if (this.parent != null) {
        return this.parent.removeChild(this);
      }
    }

  };
  PKD_HelpInMsg.Sprite_HoverLinkZone = Sprite_HoverLinkZone;
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__processEscapeCharacter, CACHE, LoadFromIconIndex, _;
  // * ИЗ KDCORE, вынес отдельно, так как плагин не требует KDCORE и не хотелось код раздувать

  // * ONLY FOR MZ
  if (PKD_HelpInMsg.isMV()) {
    return;
  }
  // * NOT NEED IF KDCORE INSTALLED
  if ((window.KDCore != null) && window.KDCore.Version >= '2.8') {
    return;
  }
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  String.prototype.isEmpty = function() {
    return this.length === 0 || !this.trim();
  };
  String.isNullOrEmpty = function(str) {
    if (str != null) {
      return str.toString().isEmpty();
    } else {
      return true;
    }
  };
  String.any = function(str) {
    return !String.isNullOrEmpty(str);
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
  CACHE = {};
  LoadFromIconIndex = function(iconIndex) {
    var icon_bitmap, iconset, ph, pw, sx, sy;
    if (CACHE[iconIndex] == null) {
      iconset = ImageManager.loadSystem('IconSet');
      if (Utils.RPGMAKER_NAME.contains("MV")) {
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
      CACHE[iconIndex] = icon_bitmap;
    }
    return CACHE[iconIndex];
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = LoadFromIconIndex(icon);
    }
    return this.drawOnMe(bitmap, x, y, size, size);
  };
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    switch (code) {
      case 'CHEX':
        this.pProcessColorChangeHex(this.pObtainEscapeParamHexColor(textState));
        break;
      case 'ISZ':
        this.pProcessDrawIconSized(this.pObtainEscapeParamIconArr(textState), textState);
        break;
      case 'PSZ':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, false);
        break;
      case 'PSB':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, true);
        break;
      default:
        ALIAS__processEscapeCharacter.call(this, code, textState);
    }
  };
  //?NEW
  _.pObtainEscapeParamHexColor = function(textState) {
    var arr, regExp, textPart;
    regExp = /^\[(#?([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return "";
    }
  };
  //?NEW
  _.pObtainEscapeParamIconArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          return parseInt(i.trim());
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pObtainEscapeParamImgArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\w+,\s*\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          if (isFinite(i)) {
            return parseInt(i.trim());
          } else {
            return i;
          }
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pProcessColorChangeHex = function(colorHex) {
    var e;
    try {
      this.changeTextColor(colorHex);
    } catch (error) {
      e = error;
      console.warn(e);
      this.resetTextColor();
    }
  };
  //?NEW
  //?params: [INDEX, SIZE, DX, DY]
  _.pProcessDrawIconSized = function(params, textState) {
    var dx, dy, e, iconIndex, size, staticMargin, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      size = params[1];
      if (params[1] == null) {
        size = ImageManager.iconWidth;
      }
      if (params[2] == null) {
        params[2] = 0;
      }
      if (params[3] == null) {
        params[3] = 0;
      }
      iconIndex = params[0];
      dx = params[2];
      dy = params[3];
      staticMargin = 2;
      x = textState.x + staticMargin + dx;
      y = textState.y + staticMargin + dy;
      // * Только в режиме рисования
      if (textState.drawing === true) {
        this.contents.drawIcon(x, y, iconIndex, size);
      }
      textState.x += size + (staticMargin * 2) + dx;
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  //?NEW
  //?params: [NAME, W, H, DX, DY]
  _.pProcessDrawPictureSized = function(params, textState, isUnderText = false) {
    var drawBitmap, drawProcess, e, height, name, source, width, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      name = params[0];
      if (!String.any(name)) {
        return;
      }
      width = params[1];
      height = params[2];
      if (params[3] == null) {
        params[3] = 0;
      }
      if (params[4] == null) {
        params[4] = 0;
      }
      x = textState.x + 2 + params[3];
      y = textState.y + 2 + params[4];
      drawBitmap = this.contents;
      source = this.pGetSourceImageForDrawPictureSized(name);
      if (textState.drawing === true) {
        drawProcess = function() {
          var e;
          try {
            if (drawBitmap == null) {
              return;
            }
            return drawBitmap.drawOnMe(source, x, y, width, height);
          } catch (error) {
            e = error;
            return console.warn(e);
          }
        };
        source.addLoadListener(drawProcess);
      }
      if (isUnderText !== true) {
        // * Вариант, что текст не будет "перескакивать" за ширину картинки а пойдёт поверх (т.е. фоновая картинка)
        // * Если картине не preload, то может "вылезти" на текст потом, так как рисоваться будет позже
        textState.x += width + 4 + params[3];
      }
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  // * Данный метод вынесен отдельно, чтобы можно было переопределять папки
  _.pGetSourceImageForDrawPictureSized = function(name) {
    return ImageManager.loadPicture(name);
  };
})();

// ■ END Window_Base.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__convertEscapeCharacters, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__convertEscapeCharacters = _.convertEscapeCharacters;
  _.convertEscapeCharacters = function(text) {
    text = ALIAS__convertEscapeCharacters.call(this, text);
    return this.pkdProcessExtraWrapText(text);
  };
  _.pkdProcessExtraWrapText = function(text) {
    text = PKD_HelpInMsg.processExtraWrapText(text);
    text = text.replace(/\\/g, "\x1b");
    text = text.replace(/\x1b\x1b/g, "\\");
    return text;
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//$[ENCODE]
(function() {
  var Window_EventHelpInfo;
  Window_EventHelpInfo = class Window_EventHelpInfo extends Window_Base {
    constructor(infoData) {
      var backgroundType;
      super(new Rectangle(0, 0, infoData.Width, infoData.Height));
      this.infoData = infoData;
      this._windowskin;
      this.openness = 0;
      if ((this.infoData.Windowskin != null) && this.infoData.Windowskin !== "") {
        this.windowskin = ImageManager.loadPicture(this.infoData.Windowskin);
      }
      if ((this.infoData.Txt != null) && this.infoData.Txt !== "") {
        this.drawInfoTextFromTxt();
      } else if (this.infoData.Text != null) {
        this.drawInfoText();
      }
      backgroundType = this._convertBackgroundType(this.infoData["Background Type"]);
      if (backgroundType >= 0) {
        this.setBackgroundType(backgroundType);
      }
      return;
    }

    _convertBackgroundType(string) {
      switch (string) {
        case "Window":
          return 0;
        case "Dim":
          return 1;
        default:
          return 2;
      }
    }

    moveToCursor() {
      return this.updatePlacementRelative(TouchInput.x, TouchInput.y);
    }

    updatePlacementRelative(x, y) {
      var dx, dy;
      dx = dy = 0;
      if (this.width + x + 5 > Graphics.width) {
        dx = 1;
      }
      if (this.height + y + 5 > Graphics.height) {
        dy = 1;
      }
      this.x = x;
      this.y = y;
      this.setStaticAnchor(dx, dy);
    }

    setStaticAnchor(vx, vy) {
      this.x -= Math.round(this.width * vx);
      return this.y -= Math.round(this.height * vy);
    }

    drawInfoText() {
      var text;
      text = this.infoData.Text;
      return this.drawTextEx(text, 0, 0);
    }

    drawInfoTextFromTxt() {
      var e, text, txtFilename;
      text = this.infoData.Text;
      try {
        txtFilename = this.infoData.Txt;
        if (PKD_HelpInMsg.txtDb[txtFilename] != null) {
          text = PKD_HelpInMsg.txtDb[txtFilename];
        } else {
          text = ".txt file data for" + txtFilename + " not found";
        }
      } catch (error) {
        e = error;
        console.warn(e);
        text = "Error read .txt file " + this.infoData.Txt;
      }
      return this.drawTextEx(text, 0, 0);
    }

    removeFromParent() {
      if (this.parent != null) {
        return this.parent.removeChild(this);
      }
    }

    pkdProcessExtraWrapText(text) {
      return text; // * NOT INCLUDE
    }

  };
  PKD_HelpInMsg.Window_EventHelpInfo = Window_EventHelpInfo;
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ItemList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//$[ENCODE]
(function() {
  var _;
  //@[DEFINES]
  _ = Window_ItemList.prototype;
  //$[OVER MY]
  _.pIsHintsAllowed = function() {
    return PKD_HelpInMsg.IsShowItemHints === true;
  };
  //$[OVER MY]
  _.pItemForHint = function() {
    return this.item();
  };
})();

// ■ END Window_ItemList.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__processEscapeCharacter, ALIAS__startMessage, ALIAS__terminateMessage, ALIAS__update, _;
  //@[DEFINES]
  _ = Window_Message.prototype;
  //@[ALIAS]
  ALIAS__startMessage = _.startMessage;
  _.startMessage = function() {
    this._tLinks = [];
    this._showLInfoTimer = 0;
    return ALIAS__startMessage.call(this);
  };
  
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    ALIAS__processEscapeCharacter.call(this, ...arguments);
    if (code === PKD_HelpInMsg.LINK_SYMBOL) {
      this._workWithLink(textState);
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._tLinks == null) {
      return;
    }
    if (!$gameSystem.pkdIsHintsEnabled()) {
      return;
    }
    if (this._isAnyHelpLinkUnderCursor()) {
      this._showLInfoTimer += 1;
      if (this._showLInfoTimer >= PKD_HelpInMsg.TIME_TO_SHOW) {
        return this._showHelpLinkInfo();
      }
    } else {
      this._showLInfoTimer = 0;
      return this._hideHelpLinksInfo();
    }
  };
  //@[ALIAS]
  ALIAS__terminateMessage = _.terminateMessage;
  _.terminateMessage = function() {
    ALIAS__terminateMessage.call(this);
    this._hideHelpLinksInfo();
    this.terminateHelpLinks();
    return this._tLinks = null;
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//$[ENCODE]
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Message.prototype;
  _.terminateHelpLinks = function() {
    var i, l, len, ref;
    if (this._tLinks == null) {
      return;
    }
    ref = this._tLinks;
    for (i = 0, len = ref.length; i < len; i++) {
      l = ref[i];
      l.removeFromParent();
    }
  };
  _._isAnyHelpLinkUnderCursor = function() {
    if (this._tLinks == null) {
      return false;
    }
    return this._tLinks.some(function(l) {
      return l.isMouseIn();
    });
  };
  _._showHelpLinkInfo = function() {
    var e, info, infoData, underMouse;
    underMouse = this._tLinks.find(function(l) {
      return l.isMouseIn();
    });
    if (underMouse == null) {
      return;
    }
    info = underMouse != null ? underMouse.info : void 0;
    if (info == null) {
      return;
    }
    if (this.__lastLinkHelpInfo === info) {
      return;
    }
    try {
      this.__lastLinkHelpInfo = info;
      this._hideHelpLinksInfo();
      infoData = PKD_HelpInMsg.getHelpMessage(info);
      if (infoData == null) {
        return;
      }
      this.__helpLinkInfoWindow = new PKD_HelpInMsg.Window_EventHelpInfo(infoData);
      SceneManager._scene.addChild(this.__helpLinkInfoWindow);
      this.__helpLinkInfoWindow.moveToCursor();
      return this.__helpLinkInfoWindow.open();
    } catch (error) {
      e = error;
      console.warn(e);
      return this._hideHelpLinksInfo();
    }
  };
  _._hideHelpLinksInfo = function() {
    if (this.__helpLinkInfoWindow == null) {
      return;
    }
    this.__helpLinkInfoWindow.close();
    this.__helpLinkInfoWindow.removeFromParent();
    this.__helpLinkInfoWindow = null;
    return this.__lastLinkHelpInfo = null;
  };
  _._workWithLink = function(textState) {
    var value;
    value = this._obtainEscapeTextCodeX(textState);
    if (value !== "") {
      return this._startHelpLink(value, textState);
    } else {
      return this._stopHelpLink(textState);
    }
  };
  _._startHelpLink = function(value, textState) {
    if (this.__tLink != null) {
      return;
    }
    this.__tLink = {};
    this.__tLink.startX = textState.x;
    this.__tLink.y = textState.y;
    this.__tLink.endX = 0;
    this.__tLink.StartIndex = textState.index;
    this.__tLink.value = value;
    // * Предзагрузка картинки
    PKD_HelpInMsg.prepareHelpMessageSkin(value);
  };
  _._stopHelpLink = function(textState) {
    if (this.__tLink == null) {
      return;
    }
    this.__tLink.endX = textState.x;
    this.__tLink.EndIndex = textState.index;
    this._createTLinkHoverZone();
    return this.__tLink = null;
  };
  _._createTLinkHoverZone = function() {
    var h, spr, w;
    w = this.__tLink.endX - this.__tLink.startX;
    h = this.lineHeight();
    spr = new PKD_HelpInMsg.Sprite_HoverLinkZone(w, h, this.__tLink.value);
    //spr.bitmap.fillAll KDCore.Color.RED
    spr.move(this.__tLink.startX + 14, this.__tLink.y + 16);
    this.addChild(spr);
    return this._tLinks.push(spr);
  };
  //?[NEW]
  _._obtainEscapeTextCodeX = function(textState) {
    var arr;
    arr = /^\[(\w+)\]/.exec(textState.text.slice(textState.index));
    if (arr != null) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return '';
    }
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__close, ALIAS__initialize, ALIAS__select, ALIAS__update, _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this, ...arguments);
    if (this.pIsHintsAllowed()) {
      return this._himInitHints();
    }
  };
  
  //@[ALIAS]
  ALIAS__select = _.select;
  _.select = function() {
    ALIAS__select.call(this, ...arguments);
    if (this.pIsHintsAllowed()) {
      this._himShowHintDelayed();
    }
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this, ...arguments);
    this._himUpdateHintShow();
  };
  //@[ALIAS]
  ALIAS__close = _.close;
  _.close = function() {
    this._himHideHintNow();
    return ALIAS__close.call(this, ...arguments);
  };
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
  _.pIsHintsAllowed = function() {
    return false;
  };
  _.pItemForHint = function() {
    return null;
  };
  _._himInitHints = function() {
    this._himHintTimerMax = PKD_HelpInMsg.ShowItemHintTimeDelay;
    this._himHintTimer = -1;
    this._himUpdateHintShow = this._himUpdateHintShowBody;
    this._himLastHintItem = -1;
    this._himHintWindow = null;
  };
  _._himShowHintDelayed = function() {
    if (this._himLastHintItem === this.pItemForHint()) {
      return;
    }
    this._himHideHintNow();
    this._himHintTimer = 0;
  };
  //@[DYNAMIC]
  _._himUpdateHintShow = function() {};
  _._himUpdateHintShowBody = function() {
    if (!this.isOpenAndActive()) {
      this._himHideHintNow();
      return;
    }
    if (this._himHintTimer < 0) {
      return;
    }
    this._himHintTimer++;
    if (this._himHintTimer >= this._himHintTimerMax) {
      this._himHintTimer = -1;
      this._himShowHintNow();
    }
  };
  _._himHideHintNow = function() {
    if (this._himHintWindow == null) {
      return;
    }
    this._himHintWindow.close();
    this._himHintWindow.removeFromParent();
    this._himHintWindow = null;
    this._himLastHintItem = null;
  };
  _._himShowHintNow = function() {
    var hintData;
    this._himLastHintItem = this.pItemForHint();
    //console.log(@_himLastHintItem)
    if (this._himLastHintItem != null) {
      hintData = PKD_HelpInMsg.getItemHint(this._himLastHintItem);
      if (hintData != null) {
        //console.log("SHOW HINT " + @_himLastHintItem.name)
        //console.log(hintData)
        this._himCreateHintWindow(hintData);
      }
    }
  };
  _._himCreateHintWindow = function(hintData) {
    var mx, my, rect, x, y;
    if (hintData == null) {
      return;
    }
    this._himHintWindow = new PKD_HelpInMsg.Window_EventHelpInfo(hintData);
    SceneManager._scene.addChild(this._himHintWindow);
    if (PKD_HelpInMsg.ItemHelpWindowPosToCursor === true) {
      x = TouchInput.x + PKD_HelpInMsg.ItemHelpWindowPosMargins.x;
      y = TouchInput.y + PKD_HelpInMsg.ItemHelpWindowPosMargins.y;
    } else {
      if (PKD_HelpInMsg.isMV()) {
        rect = this.itemRectForText(this.index());
      } else {
        rect = this.itemRectWithPadding(this.index());
      }
      mx = (rect.width / 3) + PKD_HelpInMsg.ItemHelpWindowPosMargins.x;
      my = (rect.height + 2) + PKD_HelpInMsg.ItemHelpWindowPosMargins.y;
      x = (PKD_HelpInMsg.toGlobalCoord(this, 'x')) + rect.x + mx;
      y = (PKD_HelpInMsg.toGlobalCoord(this, 'y')) + rect.y + my;
    }
    this._himHintWindow.updatePlacementRelative(x, y);
    this._himHintWindow.open();
  };
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_SkillList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_SkillList.prototype;
  //$[OVER MY]
  _.pIsHintsAllowed = function() {
    return PKD_HelpInMsg.IsShowItemHints === true;
  };
  //$[OVER MY]
  _.pItemForHint = function() {
    return this.item();
  };
})();

// ■ END Window_SkillList.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------

//Plugin PKD_HelpInMessages builded by PKD PluginBuilder 2.1 - 15.05.2022