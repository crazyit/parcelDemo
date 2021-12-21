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
},{}]},{},["DissolveSurfaceSprite.ts"], null)
//# sourceMappingURL=/DissolveSurfaceSprite.js.map