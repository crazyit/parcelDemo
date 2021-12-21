// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3zseh":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "4f8626a3fb345626";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"2V94K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _gameConfig = require("./GameConfig");
var _gameConfigDefault = parcelHelpers.interopDefault(_gameConfig);
var _tstest = require("./TSTest");
var _tstestDefault = parcelHelpers.interopDefault(_tstest);
class Main {
    constructor(){
        //根据IDE设置初始化引擎		
        if (window["Laya3D"]) Laya3D.init(_gameConfigDefault.default.width, _gameConfigDefault.default.height);
        else Laya.init(_gameConfigDefault.default.width, _gameConfigDefault.default.height, Laya["WebGL"]);
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = _gameConfigDefault.default.scaleMode;
        Laya.stage.screenMode = _gameConfigDefault.default.screenMode;
        Laya.stage.alignV = _gameConfigDefault.default.alignV;
        Laya.stage.alignH = _gameConfigDefault.default.alignH;
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = _gameConfigDefault.default.exportSceneToJson;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (_gameConfigDefault.default.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
        if (_gameConfigDefault.default.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
        if (_gameConfigDefault.default.stat) Laya.Stat.show(50, 150);
        Laya.alertGlobalError(true);
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        console.log("Main");
    }
    onVersionLoaded() {
        console.log("onVersionLoaded");
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    }
    onConfigLoaded() {
        //加载IDE指定的场景
        _gameConfigDefault.default.startScene && Laya.Scene.open(_gameConfigDefault.default.startScene);
        console.log("onConfigLoaded");
        const tsTest = new _tstestDefault.default();
    }
}
//激活启动类
new Main();

},{"./GameConfig":"a2xIz","@parcel/transformer-js/src/esmodule-helpers.js":"9ro9U","./TSTest":"6iffc"}],"a2xIz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/*
* 游戏初始化配置;
*/ parcelHelpers.export(exports, "default", ()=>GameConfig
);
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */ var _gameUI = require("./script/GameUI");
var _gameUIDefault = parcelHelpers.interopDefault(_gameUI);
var _gameControl = require("./script/GameControl");
var _gameControlDefault = parcelHelpers.interopDefault(_gameControl);
var _bullet = require("./script/Bullet");
var _bulletDefault = parcelHelpers.interopDefault(_bullet);
var _dropBox = require("./script/DropBox");
var _dropBoxDefault = parcelHelpers.interopDefault(_dropBox);
class GameConfig {
    constructor(){
    }
    static init() {
        var reg = Laya.ClassUtils.regClass;
        reg("script/GameUI.ts", _gameUIDefault.default);
        reg("script/GameControl.ts", _gameControlDefault.default);
        reg("script/Bullet.ts", _bulletDefault.default);
        reg("script/DropBox.ts", _dropBoxDefault.default);
    }
}
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

},{"./script/GameUI":"iEqpC","./script/GameControl":"96sx6","./script/Bullet":"cTWjU","./script/DropBox":"90oR7","@parcel/transformer-js/src/esmodule-helpers.js":"9ro9U"}],"iEqpC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */ parcelHelpers.export(exports, "default", ()=>GameUI
);
var _dissolveSurfaceSprite = require("../DissolveSurfaceSprite");
var _dissolveSurfaceSpriteDefault = parcelHelpers.interopDefault(_dissolveSurfaceSprite);
var _layaMaxUI = require("./../ui/layaMaxUI");
var _gameControl = require("./GameControl");
var _gameControlDefault = parcelHelpers.interopDefault(_gameControl);
class GameUI extends _layaMaxUI.ui.test.TestSceneUI {
    constructor(){
        super();
        GameUI.instance = this;
        //关闭多点触控，否则就无敌了
        Laya.MouseManager.multiTouchEnabled = false;
        //加载一个图片
        Laya.loader.load("res/Snipaste.png", Laya.Handler.create(this, ()=>{
            var texture = Laya.Loader.getRes("res/Snipaste.png");
            var spe = new _dissolveSurfaceSpriteDefault.default();
            spe.setTexture(texture);
            //设置噪图路径
            spe.setNoiseTexSkin('res/timg1.jpg');
            spe.setDissolveThreshold(10);
            spe.x = Laya.stage.width / 2 - texture.width / 2;
            spe.y = Laya.stage.height / 2 - texture.height / 2;
            Laya.stage.addChild(spe);
        // spe.scaleX = spe.scaleY = 0.4;
        // this.slider.on(Laya.Event.CHANGE, this, () => {
        //     //修改显示
        //     spe.setDissolveThreshold(this.slider.value);
        // })
        }));
    }
    onEnable() {
        this._control = this.getComponent(_gameControlDefault.default);
        //点击提示文字，开始游戏
        this.tipLbll.on(Laya.Event.CLICK, this, this.onTipClick);
    }
    onTipClick(e) {
        this.tipLbll.visible = false;
        this._score = 0;
        this.scoreLbl.text = "";
        this._control.startGame();
    }
    /**增加分数 */ addScore(value = 1) {
        this._score += value;
        this.scoreLbl.changeText("分数：" + this._score);
        //随着分数越高，难度增大
        if (this._control.createBoxInterval > 600 && this._score % 20 == 0) this._control.createBoxInterval -= 20;
    }
    /**停止游戏 */ stopGame() {
        this.tipLbll.visible = true;
        this.tipLbll.text = "游戏结束了，点击屏幕重新开始";
        this.tipLbll.alpha = 0.2;
        this._control.stopGame();
    }
}

},{"../DissolveSurfaceSprite":"iSlpf","./../ui/layaMaxUI":"4XZZx","./GameControl":"96sx6","@parcel/transformer-js/src/esmodule-helpers.js":"9ro9U"}],"iSlpf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//需要继承精灵
parcelHelpers.export(exports, "default", ()=>DissolveSurfaceSprite
);
//顶点着色器   直接使用的是laya官方自带的
var vs = `
        attribute vec4 posuv;
        attribute vec4 attribColor;
        attribute vec4 attribFlags;
        attribute vec4 clipDir;
        attribute vec2 clipRect;
        uniform vec4 clipMatDir;
        uniform vec2 clipMatPos;
        varying vec2 cliped;
        uniform vec2 size;
        uniform vec2 clipOff;
        #ifdef WORLDMAT
            uniform mat4 mmat;
        #endif
        #ifdef MVP3D
            uniform mat4 u_MvpMatrix;
        #endif
        varying vec4 v_texcoordAlpha;
        varying vec4 v_color;
        varying float v_useTex;
        void main() {
            vec4 pos = vec4(posuv.xy,0.,1.);
            #ifdef WORLDMAT
                pos=mmat*pos;
            #endif
            vec4 pos1  =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,0.,1.0);
            #ifdef MVP3D
                gl_Position=u_MvpMatrix*pos1;
            #else
                gl_Position=pos1;
            #endif
            v_texcoordAlpha.xy = posuv.zw;
            v_texcoordAlpha.z = attribColor.a/255.0;
            v_color = attribColor/255.0;
            v_color.xyz*=v_color.w;
            v_useTex = attribFlags.r/255.0;
            float clipw = length(clipMatDir.xy);
            float cliph = length(clipMatDir.zw);
            vec2 clpos = clipMatPos.xy;
            #ifdef WORLDMAT
            if(clipOff[0]>0.0){
                clpos.x+=mmat[3].x;
                clpos.y+=mmat[3].y;
            }
            #endif
            vec2 clippos = pos.xy - clpos;

            if(clipw>20000. && cliph>20000.)
                cliped = vec2(0.5,0.5);
            else {
                cliped=vec2( dot(clippos,clipMatDir.xy)/clipw/clipw, dot(clippos,clipMatDir.zw)/cliph/cliph);
            }
        }
    `;
//片元着色器  一个简单的功能 根据噪图 过滤掉低于阈值的颜色
var ps = `
        precision mediump float;
        varying vec2 v_texcoord;
        varying vec4 v_color;
        uniform sampler2D texture;
        uniform sampler2D u_NoiseTex;
        //消融阈值  0 - 1
        uniform float u_DissolveThreshold;

        varying vec4 v_texcoordAlpha;

        void main(){
            vec4 noiseTexValue = texture2D(u_NoiseTex, v_texcoordAlpha.xy);
            if (noiseTexValue.r < u_DissolveThreshold)
            {
                discard;
            }
            
            gl_FragColor = texture2D(texture, v_texcoordAlpha.xy);
        }
    `;
class DissolveSurfaceSprite extends Laya.Sprite {
    constructor(){
        super();
        this.init();
    }
    init() {
        this.shaderValue = new Laya.Value2D(DissolveSurfaceSprite.DissolveSurfaceSaveName, DissolveSurfaceSprite.DissolveSurfaceSaveName);
        //重要的一步  将渲染设置为自定义
        this.customRenderEnable = true;
        this.shaderValue.shader = new Laya.Shader2X(vs, ps, DissolveSurfaceSprite.DissolveSurfaceSaveName);
    }
    setTexture(t) {
        this.tex = t;
    }
    /**
     * 设置噪图纹理
     * @param t 
     */ setNoiseTexture(t) {
        //这里的名字是在shader里 定义好的。
        this.shaderValue['u_NoiseTex'] = t;
    }
    setNoiseTexSkin(skin) {
        Laya.loader.load(skin, new Laya.Handler(this, (tex)=>{
            console.log("tex::" + tex);
            this.shaderValue['u_NoiseTex'] = tex._bitmap._glTexture;
        // this.shaderValue['u_NoiseTex'] = tex._getSource();
        }));
    // Laya.Texture2D.load(skin, new Laya.Handler(this, (tex) => {
    //     console.log("tex::"+tex);
    //     // this.shaderValue['u_NoiseTex'] = tex._bitmap._glTexture
    //     // this.shaderValue['u_NoiseTex'] = tex._getSource();
    // }));
    }
    /**
     * 设置消融范围  0 是原图  1 是消失完成
     * @param t 
     */ setDissolveThreshold(t) {
        this.shaderValue['u_DissolveThreshold'] = t;
    }
    // 自定义渲染提交
    customRender(context, x, y) {
        //这一步很重要 
        context.drawTarget(this.tex, x, y, this.tex.width, this.tex.height, null, this.shaderValue);
    }
}
DissolveSurfaceSprite.DissolveSurfaceSaveName = 9999;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9ro9U"}],"9ro9U":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"4XZZx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var View = Laya.View;
var Dialog = Laya.Dialog;
var Scene = Laya.Scene;
var REG = Laya.ClassUtils.regClass;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9ro9U"}],"96sx6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 游戏控制脚本。定义了几个dropBox，bullet，createBoxInterval等变量，能够在IDE显示及设置该变量
 * 更多类型定义，请参考官方文档
 */ parcelHelpers.export(exports, "default", ()=>GameControl
);
class GameControl extends Laya.Script {
    constructor(){
        super();
        /** @prop {name:createBoxInterval,tips:"间隔多少毫秒创建一个下跌的容器",type:int,default:1000}*/ this.createBoxInterval = 1000;
        /**开始时间*/ this._time = 0;
        /**是否已经开始游戏 */ this._started = false;
    }
    onEnable() {
        this._time = Date.now();
        this._gameBox = this.owner.getChildByName("gameBox");
    }
    onUpdate() {
        //每间隔一段时间创建一个盒子
        let now = Date.now();
        if (now - this._time > this.createBoxInterval && this._started) {
            this._time = now;
            this.createBox();
        }
    }
    createBox() {
        //使用对象池创建盒子
        let box = Laya.Pool.getItemByCreateFun("dropBox", this.dropBox.create, this.dropBox);
        box.pos(Math.random() * (Laya.stage.width - 100), -100);
        this._gameBox.addChild(box);
    }
    onStageClick(e) {
        //停止事件冒泡，提高性能，当然也可以不要
        e.stopPropagation();
        //舞台被点击后，使用对象池创建子弹
        let flyer = Laya.Pool.getItemByCreateFun("bullet", this.bullet.create, this.bullet);
        flyer.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        this._gameBox.addChild(flyer);
    }
    /**开始游戏，通过激活本脚本方式开始游戏*/ startGame() {
        if (!this._started) {
            this._started = true;
            this.enabled = true;
        }
    }
    /**结束游戏，通过非激活本脚本停止游戏 */ stopGame() {
        this._started = false;
        this.enabled = false;
        this.createBoxInterval = 1000;
        this._gameBox.removeChildren();
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9ro9U"}],"cTWjU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 子弹脚本，实现子弹飞行逻辑及对象池回收机制
 */ parcelHelpers.export(exports, "default", ()=>Bullet
);
class Bullet extends Laya.Script {
    constructor(){
        super();
    }
    onEnable() {
        //设置初始速度
        var rig = this.owner.getComponent(Laya.RigidBody);
        rig.setVelocity({
            x: 0,
            y: -10
        });
    }
    onTriggerEnter(other, self, contact) {
        //如果被碰到，则移除子弹
        this.owner.removeSelf();
    }
    onUpdate() {
        //如果子弹超出屏幕，则移除子弹
        if (this.owner.y < -10) this.owner.removeSelf();
    }
    onDisable() {
        //子弹被移除时，回收子弹到对象池，方便下次复用，减少对象创建开销
        Laya.Pool.recover("bullet", this.owner);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9ro9U"}],"90oR7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * 掉落盒子脚本，实现盒子碰撞及回收流程
 */ parcelHelpers.export(exports, "default", ()=>DropBox
);
var _gameUI = require("./GameUI");
var _gameUIDefault = parcelHelpers.interopDefault(_gameUI);
class DropBox extends Laya.Script {
    constructor(){
        super();
        /**盒子等级 */ this.level = 1;
    }
    onEnable() {
        /**获得组件引用，避免每次获取组件带来不必要的查询开销 */ this._rig = this.owner.getComponent(Laya.RigidBody);
        this.level = Math.round(Math.random() * 5) + 1;
        this._text = this.owner.getChildByName("levelTxt");
        this._text.text = this.level + "";
    }
    onUpdate() {
        //让持续盒子旋转
        this.owner.rotation++;
    }
    onTriggerEnter(other, self, contact) {
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
            } else if (owner.parent) {
                let effect = Laya.Pool.getItemByCreateFun("effect", this.createEffect, this);
                effect.pos(owner.x, owner.y);
                owner.parent.addChild(effect);
                effect.play(0, true);
                owner.removeSelf();
                Laya.SoundManager.playSound("sound/destroy.wav");
            }
            _gameUIDefault.default.instance.addScore(1);
        } else if (other.label === "ground") {
            //只要有一个盒子碰到地板，则停止游戏
            owner.removeSelf();
            _gameUIDefault.default.instance.stopGame();
        }
    }
    /**使用对象池创建爆炸动画 */ createEffect() {
        let ani = new Laya.Animation();
        ani.loadAnimation("test/TestAni.ani");
        ani.on(Laya.Event.COMPLETE, null, recover);
        function recover() {
            ani.removeSelf();
            Laya.Pool.recover("effect", ani);
        }
        return ani;
    }
    onDisable() {
        //盒子被移除时，回收盒子到对象池，方便下次复用，减少对象创建开销。
        Laya.Pool.recover("dropBox", this.owner);
    }
}

},{"./GameUI":"iEqpC","@parcel/transformer-js/src/esmodule-helpers.js":"9ro9U"}],"6iffc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>TSTest
);
var _demoA = require("./dir/DemoA");
var _demoADefault = parcelHelpers.interopDefault(_demoA);
class TSTest {
    constructor(){
        new _demoADefault.default();
        console.log("TSTest constructor");
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9ro9U","./dir/DemoA":"5T2q3"}],"5T2q3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>DemoA
);
class DemoA {
    constructor(){
        console.log("DemoA constructor");
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"9ro9U"}]},["3zseh","2V94K"], "2V94K", "parcelRequiree8ef")

//# sourceMappingURL=Main.js.map
