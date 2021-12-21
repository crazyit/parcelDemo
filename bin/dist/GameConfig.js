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

//顶点着色器   直接使用的是laya官方自带的
var vs = "\n        attribute vec4 posuv;\n        attribute vec4 attribColor;\n        attribute vec4 attribFlags;\n        attribute vec4 clipDir;\n        attribute vec2 clipRect;\n        uniform vec4 clipMatDir;\n        uniform vec2 clipMatPos;\n        varying vec2 cliped;\n        uniform vec2 size;\n        uniform vec2 clipOff;\n        #ifdef WORLDMAT\n            uniform mat4 mmat;\n        #endif\n        #ifdef MVP3D\n            uniform mat4 u_MvpMatrix;\n        #endif\n        varying vec4 v_texcoordAlpha;\n        varying vec4 v_color;\n        varying float v_useTex;\n        void main() {\n            vec4 pos = vec4(posuv.xy,0.,1.);\n            #ifdef WORLDMAT\n                pos=mmat*pos;\n            #endif\n            vec4 pos1  =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,0.,1.0);\n            #ifdef MVP3D\n                gl_Position=u_MvpMatrix*pos1;\n            #else\n                gl_Position=pos1;\n            #endif\n            v_texcoordAlpha.xy = posuv.zw;\n            v_texcoordAlpha.z = attribColor.a/255.0;\n            v_color = attribColor/255.0;\n            v_color.xyz*=v_color.w;\n            v_useTex = attribFlags.r/255.0;\n            float clipw = length(clipMatDir.xy);\n            float cliph = length(clipMatDir.zw);\n            vec2 clpos = clipMatPos.xy;\n            #ifdef WORLDMAT\n            if(clipOff[0]>0.0){\n                clpos.x+=mmat[3].x;\n                clpos.y+=mmat[3].y;\n            }\n            #endif\n            vec2 clippos = pos.xy - clpos;\n\n            if(clipw>20000. && cliph>20000.)\n                cliped = vec2(0.5,0.5);\n            else {\n                cliped=vec2( dot(clippos,clipMatDir.xy)/clipw/clipw, dot(clippos,clipMatDir.zw)/cliph/cliph);\n            }\n        }\n    "; //片元着色器  一个简单的功能 根据噪图 过滤掉低于阈值的颜色

var ps = "\n        precision mediump float;\n        varying vec2 v_texcoord;\n        varying vec4 v_color;\n        uniform sampler2D texture;\n        uniform sampler2D u_NoiseTex;\n        //\u6D88\u878D\u9608\u503C  0 - 1\n        uniform float u_DissolveThreshold;\n\n        varying vec4 v_texcoordAlpha;\n\n        void main(){\n            vec4 noiseTexValue = texture2D(u_NoiseTex, v_texcoordAlpha.xy);\n            if (noiseTexValue.r < u_DissolveThreshold)\n            {\n                discard;\n            }\n            \n            gl_FragColor = texture2D(texture, v_texcoordAlpha.xy);\n        }\n    "; //需要继承精灵

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
      this.shaderValue = new Laya.Value2D(DissolveSurfaceSprite.DissolveSurfaceSaveName, DissolveSurfaceSprite.DissolveSurfaceSaveName); //重要的一步  将渲染设置为自定义

      this.customRenderEnable = true;
      this.shaderValue.shader = new Laya.Shader2X(vs, ps, DissolveSurfaceSprite.DissolveSurfaceSaveName);
    }
  }, {
    key: "setTexture",
    value: function setTexture(t) {
      this.tex = t;
    }
    /**
     * 设置噪图纹理
     * @param t
     */

  }, {
    key: "setNoiseTexture",
    value: function setNoiseTexture(t) {
      //这里的名字是在shader里 定义好的。
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
     * 设置消融范围  0 是原图  1 是消失完成
     * @param t
     */

  }, {
    key: "setDissolveThreshold",
    value: function setDissolveThreshold(t) {
      this.shaderValue['u_DissolveThreshold'] = t;
    } // 自定义渲染提交

  }, {
    key: "customRender",
    value: function customRender(context, x, y) {
      //这一步很重要 
      context.drawTarget(this.tex, x, y, this.tex.width, this.tex.height, null, this.shaderValue);
    }
  }]);

  return DissolveSurfaceSprite;
}(Laya.Sprite); //定义一个shaderid  用于laya在查找shader 时使用   


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
 * 游戏控制脚本。定义了几个dropBox，bullet，createBoxInterval等变量，能够在IDE显示及设置该变量
 * 更多类型定义，请参考官方文档
 */
var GameControl = /*#__PURE__*/function (_Laya$Script) {
  _inherits(GameControl, _Laya$Script);

  var _super = _createSuper(GameControl);

  function GameControl() {
    var _this;

    _classCallCheck(this, GameControl);

    _this = _super.call(this);
    /** @prop {name:createBoxInterval,tips:"间隔多少毫秒创建一个下跌的容器",type:int,default:1000}*/

    _this.createBoxInterval = 1000;
    /**开始时间*/

    _this._time = 0;
    /**是否已经开始游戏 */

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
      //每间隔一段时间创建一个盒子
      var now = Date.now();

      if (now - this._time > this.createBoxInterval && this._started) {
        this._time = now;
        this.createBox();
      }
    }
  }, {
    key: "createBox",
    value: function createBox() {
      //使用对象池创建盒子
      var box = Laya.Pool.getItemByCreateFun("dropBox", this.dropBox.create, this.dropBox);
      box.pos(Math.random() * (Laya.stage.width - 100), -100);

      this._gameBox.addChild(box);
    }
  }, {
    key: "onStageClick",
    value: function onStageClick(e) {
      //停止事件冒泡，提高性能，当然也可以不要
      e.stopPropagation(); //舞台被点击后，使用对象池创建子弹

      var flyer = Laya.Pool.getItemByCreateFun("bullet", this.bullet.create, this.bullet);
      flyer.pos(Laya.stage.mouseX, Laya.stage.mouseY);

      this._gameBox.addChild(flyer);
    }
    /**开始游戏，通过激活本脚本方式开始游戏*/

  }, {
    key: "startGame",
    value: function startGame() {
      if (!this._started) {
        this._started = true;
        this.enabled = true;
      }
    }
    /**结束游戏，通过非激活本脚本停止游戏 */

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
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
var GameUI = /*#__PURE__*/function (_ui$test$TestSceneUI) {
  _inherits(GameUI, _ui$test$TestSceneUI);

  var _super = _createSuper(GameUI);

  function GameUI() {
    var _this;

    _classCallCheck(this, GameUI);

    _this = _super.call(this);
    GameUI.instance = _assertThisInitialized(_this); //关闭多点触控，否则就无敌了

    Laya.MouseManager.multiTouchEnabled = false; //加载一个图片

    Laya.loader.load("res/Snipaste.png", Laya.Handler.create(_assertThisInitialized(_this), function () {
      var texture = Laya.Loader.getRes("res/Snipaste.png");
      var spe = new _DissolveSurfaceSprite.default();
      spe.setTexture(texture); //设置噪图路径

      spe.setNoiseTexSkin('res/timg1.jpg');
      spe.setDissolveThreshold(10);
      spe.x = Laya.stage.width / 2 - texture.width / 2;
      spe.y = Laya.stage.height / 2 - texture.height / 2;
      Laya.stage.addChild(spe); // spe.scaleX = spe.scaleY = 0.4;
      // this.slider.on(Laya.Event.CHANGE, this, () => {
      //     //修改显示
      //     spe.setDissolveThreshold(this.slider.value);
      // })
    }));
    return _this;
  }

  _createClass(GameUI, [{
    key: "onEnable",
    value: function onEnable() {
      this._control = this.getComponent(_GameControl.default); //点击提示文字，开始游戏

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
    /**增加分数 */

  }, {
    key: "addScore",
    value: function addScore() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this._score += value;
      this.scoreLbl.changeText("分数：" + this._score); //随着分数越高，难度增大

      if (this._control.createBoxInterval > 600 && this._score % 20 == 0) this._control.createBoxInterval -= 20;
    }
    /**停止游戏 */

  }, {
    key: "stopGame",
    value: function stopGame() {
      this.tipLbll.visible = true;
      this.tipLbll.text = "游戏结束了，点击屏幕重新开始";
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
 * 子弹脚本，实现子弹飞行逻辑及对象池回收机制
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
      //设置初始速度
      var rig = this.owner.getComponent(Laya.RigidBody);
      rig.setVelocity({
        x: 0,
        y: -10
      });
    }
  }, {
    key: "onTriggerEnter",
    value: function onTriggerEnter(other, self, contact) {
      //如果被碰到，则移除子弹
      this.owner.removeSelf();
    }
  }, {
    key: "onUpdate",
    value: function onUpdate() {
      //如果子弹超出屏幕，则移除子弹
      if (this.owner.y < -10) {
        this.owner.removeSelf();
      }
    }
  }, {
    key: "onDisable",
    value: function onDisable() {
      //子弹被移除时，回收子弹到对象池，方便下次复用，减少对象创建开销
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
 * 掉落盒子脚本，实现盒子碰撞及回收流程
 */
var DropBox = /*#__PURE__*/function (_Laya$Script) {
  _inherits(DropBox, _Laya$Script);

  var _super = _createSuper(DropBox);

  function DropBox() {
    var _this;

    _classCallCheck(this, DropBox);

    _this = _super.call(this);
    /**盒子等级 */

    _this.level = 1;
    return _this;
  }

  _createClass(DropBox, [{
    key: "onEnable",
    value: function onEnable() {
      /**获得组件引用，避免每次获取组件带来不必要的查询开销 */
      this._rig = this.owner.getComponent(Laya.RigidBody);
      this.level = Math.round(Math.random() * 5) + 1;
      this._text = this.owner.getChildByName("levelTxt");
      this._text.text = this.level + "";
    }
  }, {
    key: "onUpdate",
    value: function onUpdate() {
      //让持续盒子旋转
      this.owner.rotation++;
    }
  }, {
    key: "onTriggerEnter",
    value: function onTriggerEnter(other, self, contact) {
      var owner = this.owner;

      if (other.label === "buttle") {
        //碰撞到子弹后，增加积分，播放声音特效
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
        //只要有一个盒子碰到地板，则停止游戏
        owner.removeSelf();

        _GameUI.default.instance.stopGame();
      }
    }
    /**使用对象池创建爆炸动画 */

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
      //盒子被移除时，回收盒子到对象池，方便下次复用，减少对象创建开销。
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
* 游戏初始化配置;
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