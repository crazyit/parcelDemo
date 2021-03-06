// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"DissolveSurfaceSprite.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

//???????????????   ??????????????????laya???????????????
var vs = "\n        attribute vec4 posuv;\n        attribute vec4 attribColor;\n        attribute vec4 attribFlags;\n        attribute vec4 clipDir;\n        attribute vec2 clipRect;\n        uniform vec4 clipMatDir;\n        uniform vec2 clipMatPos;\n        varying vec2 cliped;\n        uniform vec2 size;\n        uniform vec2 clipOff;\n        #ifdef WORLDMAT\n            uniform mat4 mmat;\n        #endif\n        #ifdef MVP3D\n            uniform mat4 u_MvpMatrix;\n        #endif\n        varying vec4 v_texcoordAlpha;\n        varying vec4 v_color;\n        varying float v_useTex;\n        void main() {\n            vec4 pos = vec4(posuv.xy,0.,1.);\n            #ifdef WORLDMAT\n                pos=mmat*pos;\n            #endif\n            vec4 pos1  =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,0.,1.0);\n            #ifdef MVP3D\n                gl_Position=u_MvpMatrix*pos1;\n            #else\n                gl_Position=pos1;\n            #endif\n            v_texcoordAlpha.xy = posuv.zw;\n            v_texcoordAlpha.z = attribColor.a/255.0;\n            v_color = attribColor/255.0;\n            v_color.xyz*=v_color.w;\n            v_useTex = attribFlags.r/255.0;\n            float clipw = length(clipMatDir.xy);\n            float cliph = length(clipMatDir.zw);\n            vec2 clpos = clipMatPos.xy;\n            #ifdef WORLDMAT\n            if(clipOff[0]>0.0){\n                clpos.x+=mmat[3].x;\n                clpos.y+=mmat[3].y;\n            }\n            #endif\n            vec2 clippos = pos.xy - clpos;\n\n            if(clipw>20000. && cliph>20000.)\n                cliped = vec2(0.5,0.5);\n            else {\n                cliped=vec2( dot(clippos,clipMatDir.xy)/clipw/clipw, dot(clippos,clipMatDir.zw)/cliph/cliph);\n            }\n        }\n    "; //???????????????  ????????????????????? ???????????? ??????????????????????????????

var ps = "\n        precision mediump float;\n        varying vec2 v_texcoord;\n        varying vec4 v_color;\n        uniform sampler2D texture;\n        uniform sampler2D u_NoiseTex;\n        //\u6D88\u878D\u9608\u503C  0 - 1\n        uniform float u_DissolveThreshold;\n\n        varying vec4 v_texcoordAlpha;\n\n        void main(){\n            vec4 noiseTexValue = texture2D(u_NoiseTex, v_texcoordAlpha.xy);\n            if (noiseTexValue.r < u_DissolveThreshold)\n            {\n                discard;\n            }\n            \n            gl_FragColor = texture2D(texture, v_texcoordAlpha.xy);\n        }\n    "; //??????????????????

var DissolveSurfaceSprite = /*#__PURE__*/function (_Laya$Sprite) {
  _inherits(DissolveSurfaceSprite, _Laya$Sprite);

  var _super = _createSuper(DissolveSurfaceSprite);

  function DissolveSurfaceSprite() {
    var _this;

    _classCallCheck(this, DissolveSurfaceSprite);

    _this = _super.call(this);

    _this.init();

    return _this;
  }

  _createClass(DissolveSurfaceSprite, [{
    key: "init",
    value: function init() {
      this.shaderValue = new Laya.Value2D(DissolveSurfaceSprite.DissolveSurfaceSaveName, DissolveSurfaceSprite.DissolveSurfaceSaveName); //???????????????  ???????????????????????????

      this.customRenderEnable = true;
      this.shaderValue.shader = new Laya.Shader2X(vs, ps, DissolveSurfaceSprite.DissolveSurfaceSaveName);
    }
  }, {
    key: "setTexture",
    value: function setTexture(t) {
      this.tex = t;
    }
    /**
     * ??????????????????
     * @param t
     */

  }, {
    key: "setNoiseTexture",
    value: function setNoiseTexture(t) {
      //?????????????????????shader??? ???????????????
      this.shaderValue['u_NoiseTex'] = t;
    }
  }, {
    key: "setNoiseTexSkin",
    value: function setNoiseTexSkin(skin) {
      var _this2 = this;

      Laya.loader.load(skin, new Laya.Handler(this, function (tex) {
        console.log("tex::" + tex);
        _this2.shaderValue['u_NoiseTex'] = tex._bitmap._glTexture; // this.shaderValue['u_NoiseTex'] = tex._getSource();
      })); // Laya.Texture2D.load(skin, new Laya.Handler(this, (tex) => {
      //     console.log("tex::"+tex);
      //     // this.shaderValue['u_NoiseTex'] = tex._bitmap._glTexture
      //     // this.shaderValue['u_NoiseTex'] = tex._getSource();
      // }));
    }
    /**
     * ??????????????????  0 ?????????  1 ???????????????
     * @param t
     */

  }, {
    key: "setDissolveThreshold",
    value: function setDissolveThreshold(t) {
      this.shaderValue['u_DissolveThreshold'] = t;
    } // ?????????????????????

  }, {
    key: "customRender",
    value: function customRender(context, x, y) {
      //?????????????????? 
      context.drawTarget(this.tex, x, y, this.tex.width, this.tex.height, null, this.shaderValue);
    }
  }]);

  return DissolveSurfaceSprite;
}(Laya.Sprite); //????????????shaderid  ??????laya?????????shader ?????????   


exports.default = DissolveSurfaceSprite;
DissolveSurfaceSprite.DissolveSurfaceSaveName = 9999;
},{}],"ui/layaMaxUI.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ui = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Scene = Laya.Scene;
var REG = Laya.ClassUtils.regClass;
var ui;
exports.ui = ui;

(function (ui) {
  var test;

  (function (test) {
    var TestSceneUI = /*#__PURE__*/function (_Scene) {
      _inherits(TestSceneUI, _Scene);

      var _super = _createSuper(TestSceneUI);

      function TestSceneUI() {
        _classCallCheck(this, TestSceneUI);

        return _super.call(this);
      }

      _createClass(TestSceneUI, [{
        key: "createChildren",
        value: function createChildren() {
          _get(_getPrototypeOf(TestSceneUI.prototype), "createChildren", this).call(this);

          this.loadScene("test/TestScene");
        }
      }]);

      return TestSceneUI;
    }(Scene);

    test.TestSceneUI = TestSceneUI;
    REG("ui.test.TestSceneUI", TestSceneUI);
  })(test = ui.test || (ui.test = {}));
})(ui || (exports.ui = ui = {}));
},{}],"script/GameControl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * ????????????????????????????????????dropBox???bullet???createBoxInterval?????????????????????IDE????????????????????????
 * ??????????????????????????????????????????
 */
var GameControl = /*#__PURE__*/function (_Laya$Script) {
  _inherits(GameControl, _Laya$Script);

  var _super = _createSuper(GameControl);

  function GameControl() {
    var _this;

    _classCallCheck(this, GameControl);

    _this = _super.call(this);
    /** @prop {name:createBoxInterval,tips:"?????????????????????????????????????????????",type:int,default:1000}*/

    _this.createBoxInterval = 1000;
    /**????????????*/

    _this._time = 0;
    /**???????????????????????? */

    _this._started = false;
    return _this;
  }

  _createClass(GameControl, [{
    key: "onEnable",
    value: function onEnable() {
      this._time = Date.now();
      this._gameBox = this.owner.getChildByName("gameBox");
    }
  }, {
    key: "onUpdate",
    value: function onUpdate() {
      //???????????????????????????????????????
      var now = Date.now();

      if (now - this._time > this.createBoxInterval && this._started) {
        this._time = now;
        this.createBox();
      }
    }
  }, {
    key: "createBox",
    value: function createBox() {
      //???????????????????????????
      var box = Laya.Pool.getItemByCreateFun("dropBox", this.dropBox.create, this.dropBox);
      box.pos(Math.random() * (Laya.stage.width - 100), -100);

      this._gameBox.addChild(box);
    }
  }, {
    key: "onStageClick",
    value: function onStageClick(e) {
      //?????????????????????????????????????????????????????????
      e.stopPropagation(); //????????????????????????????????????????????????

      var flyer = Laya.Pool.getItemByCreateFun("bullet", this.bullet.create, this.bullet);
      flyer.pos(Laya.stage.mouseX, Laya.stage.mouseY);

      this._gameBox.addChild(flyer);
    }
    /**??????????????????????????????????????????????????????*/

  }, {
    key: "startGame",
    value: function startGame() {
      if (!this._started) {
        this._started = true;
        this.enabled = true;
      }
    }
    /**??????????????????????????????????????????????????? */

  }, {
    key: "stopGame",
    value: function stopGame() {
      this._started = false;
      this.enabled = false;
      this.createBoxInterval = 1000;

      this._gameBox.removeChildren();
    }
  }]);

  return GameControl;
}(Laya.Script);

exports.default = GameControl;
},{}],"script/GameUI.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DissolveSurfaceSprite = _interopRequireDefault(require("../DissolveSurfaceSprite"));

var _layaMaxUI = require("./../ui/layaMaxUI");

var _GameControl = _interopRequireDefault(require("./GameControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * ????????????????????????????????????????????????????????????????????????????????????????????????IDE?????????????????????Runtime?????????????????????????????????
 * ??????????????????????????????????????????????????????????????????????????????????????????IDE???var????????????????????????this.tipLbll???this.scoreLbl???????????????????????????
 * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
 */
var GameUI = /*#__PURE__*/function (_ui$test$TestSceneUI) {
  _inherits(GameUI, _ui$test$TestSceneUI);

  var _super = _createSuper(GameUI);

  function GameUI() {
    var _this;

    _classCallCheck(this, GameUI);

    _this = _super.call(this);
    GameUI.instance = _assertThisInitialized(_this); //???????????????????????????????????????

    Laya.MouseManager.multiTouchEnabled = false; //??????????????????

    Laya.loader.load("res/Snipaste.png", Laya.Handler.create(_assertThisInitialized(_this), function () {
      var texture = Laya.Loader.getRes("res/Snipaste.png");
      var spe = new _DissolveSurfaceSprite.default();
      spe.setTexture(texture); //??????????????????

      spe.setNoiseTexSkin('res/timg1.jpg');
      spe.setDissolveThreshold(10);
      spe.x = Laya.stage.width / 2 - texture.width / 2;
      spe.y = Laya.stage.height / 2 - texture.height / 2;
      Laya.stage.addChild(spe); // spe.scaleX = spe.scaleY = 0.4;
      // this.slider.on(Laya.Event.CHANGE, this, () => {
      //     //????????????
      //     spe.setDissolveThreshold(this.slider.value);
      // })
    }));
    return _this;
  }

  _createClass(GameUI, [{
    key: "onEnable",
    value: function onEnable() {
      this._control = this.getComponent(_GameControl.default); //?????????????????????????????????

      this.tipLbll.on(Laya.Event.CLICK, this, this.onTipClick);
    }
  }, {
    key: "onTipClick",
    value: function onTipClick(e) {
      this.tipLbll.visible = false;
      this._score = 0;
      this.scoreLbl.text = "";

      this._control.startGame();
    }
    /**???????????? */

  }, {
    key: "addScore",
    value: function addScore() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this._score += value;
      this.scoreLbl.changeText("?????????" + this._score); //?????????????????????????????????

      if (this._control.createBoxInterval > 600 && this._score % 20 == 0) this._control.createBoxInterval -= 20;
    }
    /**???????????? */

  }, {
    key: "stopGame",
    value: function stopGame() {
      this.tipLbll.visible = true;
      this.tipLbll.text = "??????????????????????????????????????????";
      this.tipLbll.alpha = 0.2;

      this._control.stopGame();
    }
  }]);

  return GameUI;
}(_layaMaxUI.ui.test.TestSceneUI);

exports.default = GameUI;
},{"../DissolveSurfaceSprite":"DissolveSurfaceSprite.ts","./../ui/layaMaxUI":"ui/layaMaxUI.ts","./GameControl":"script/GameControl.ts"}],"script/Bullet.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * ???????????????????????????????????????????????????????????????
 */
var Bullet = /*#__PURE__*/function (_Laya$Script) {
  _inherits(Bullet, _Laya$Script);

  var _super = _createSuper(Bullet);

  function Bullet() {
    _classCallCheck(this, Bullet);

    return _super.call(this);
  }

  _createClass(Bullet, [{
    key: "onEnable",
    value: function onEnable() {
      //??????????????????
      var rig = this.owner.getComponent(Laya.RigidBody);
      rig.setVelocity({
        x: 0,
        y: -10
      });
    }
  }, {
    key: "onTriggerEnter",
    value: function onTriggerEnter(other, self, contact) {
      //?????????????????????????????????
      this.owner.removeSelf();
    }
  }, {
    key: "onUpdate",
    value: function onUpdate() {
      //??????????????????????????????????????????
      if (this.owner.y < -10) {
        this.owner.removeSelf();
      }
    }
  }, {
    key: "onDisable",
    value: function onDisable() {
      //?????????????????????????????????????????????????????????????????????????????????????????????
      Laya.Pool.recover("bullet", this.owner);
    }
  }]);

  return Bullet;
}(Laya.Script);

exports.default = Bullet;
},{}],"script/DropBox.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GameUI = _interopRequireDefault(require("./GameUI"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * ??????????????????????????????????????????????????????
 */
var DropBox = /*#__PURE__*/function (_Laya$Script) {
  _inherits(DropBox, _Laya$Script);

  var _super = _createSuper(DropBox);

  function DropBox() {
    var _this;

    _classCallCheck(this, DropBox);

    _this = _super.call(this);
    /**???????????? */

    _this.level = 1;
    return _this;
  }

  _createClass(DropBox, [{
    key: "onEnable",
    value: function onEnable() {
      /**??????????????????????????????????????????????????????????????????????????? */
      this._rig = this.owner.getComponent(Laya.RigidBody);
      this.level = Math.round(Math.random() * 5) + 1;
      this._text = this.owner.getChildByName("levelTxt");
      this._text.text = this.level + "";
    }
  }, {
    key: "onUpdate",
    value: function onUpdate() {
      //?????????????????????
      this.owner.rotation++;
    }
  }, {
    key: "onTriggerEnter",
    value: function onTriggerEnter(other, self, contact) {
      var owner = this.owner;

      if (other.label === "buttle") {
        //??????????????????????????????????????????????????????
        if (this.level > 1) {
          this.level--;

          this._text.changeText(this.level + "");

          owner.getComponent(Laya.RigidBody).setVelocity({
            x: 0,
            y: -10
          });
          Laya.SoundManager.playSound("sound/hit.wav");
        } else {
          if (owner.parent) {
            var effect = Laya.Pool.getItemByCreateFun("effect", this.createEffect, this);
            effect.pos(owner.x, owner.y);
            owner.parent.addChild(effect);
            effect.play(0, true);
            owner.removeSelf();
            Laya.SoundManager.playSound("sound/destroy.wav");
          }
        }

        _GameUI.default.instance.addScore(1);
      } else if (other.label === "ground") {
        //???????????????????????????????????????????????????
        owner.removeSelf();

        _GameUI.default.instance.stopGame();
      }
    }
    /**????????????????????????????????? */

  }, {
    key: "createEffect",
    value: function createEffect() {
      var ani = new Laya.Animation();
      ani.loadAnimation("test/TestAni.ani");
      ani.on(Laya.Event.COMPLETE, null, recover);

      function recover() {
        ani.removeSelf();
        Laya.Pool.recover("effect", ani);
      }

      return ani;
    }
  }, {
    key: "onDisable",
    value: function onDisable() {
      //????????????????????????????????????????????????????????????????????????????????????????????????
      Laya.Pool.recover("dropBox", this.owner);
    }
  }]);

  return DropBox;
}(Laya.Script);

exports.default = DropBox;
},{"./GameUI":"script/GameUI.ts"}],"GameConfig.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GameUI = _interopRequireDefault(require("./script/GameUI"));

var _GameControl = _interopRequireDefault(require("./script/GameControl"));

var _Bullet = _interopRequireDefault(require("./script/Bullet"));

var _DropBox = _interopRequireDefault(require("./script/DropBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
* ?????????????????????;
*/
var GameConfig = /*#__PURE__*/function () {
  function GameConfig() {
    _classCallCheck(this, GameConfig);
  }

  _createClass(GameConfig, null, [{
    key: "init",
    value: function init() {
      var reg = Laya.ClassUtils.regClass;
      reg("script/GameUI.ts", _GameUI.default);
      reg("script/GameControl.ts", _GameControl.default);
      reg("script/Bullet.ts", _Bullet.default);
      reg("script/DropBox.ts", _DropBox.default);
    }
  }]);

  return GameConfig;
}();

exports.default = GameConfig;
GameConfig.width = 640;
GameConfig.height = 1136;
GameConfig.scaleMode = "fixedwidth";
GameConfig.screenMode = "none";
GameConfig.alignV = "top";
GameConfig.alignH = "left";
GameConfig.startScene = "test/TestScene.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;
GameConfig.init();
},{"./script/GameUI":"script/GameUI.ts","./script/GameControl":"script/GameControl.ts","./script/Bullet":"script/Bullet.ts","./script/DropBox":"script/DropBox.ts"}]},{},["GameConfig.ts"], null)
//# sourceMappingURL=/GameConfig.js.map