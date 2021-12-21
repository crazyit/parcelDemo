(function () {
    'use strict';

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
        constructor() {
            super();
            this.init();
        }
        init() {
            this.shaderValue = new Laya.Value2D(DissolveSurfaceSprite.DissolveSurfaceSaveName, DissolveSurfaceSprite.DissolveSurfaceSaveName);
            this.customRenderEnable = true;
            this.shaderValue.shader = new Laya.Shader2X(vs, ps, DissolveSurfaceSprite.DissolveSurfaceSaveName);
        }
        setTexture(t) {
            this.tex = t;
        }
        setNoiseTexture(t) {
            this.shaderValue['u_NoiseTex'] = t;
        }
        setNoiseTexSkin(skin) {
            Laya.loader.load(skin, new Laya.Handler(this, (tex) => {
                console.log("tex::" + tex);
                this.shaderValue['u_NoiseTex'] = tex._bitmap._glTexture;
            }));
        }
        setDissolveThreshold(t) {
            this.shaderValue['u_DissolveThreshold'] = t;
        }
        customRender(context, x, y) {
            context.drawTarget(this.tex, x, y, this.tex.width, this.tex.height, null, this.shaderValue);
        }
    }
    DissolveSurfaceSprite.DissolveSurfaceSaveName = 9999;

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var test;
        (function (test) {
            class TestSceneUI extends Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("test/TestScene");
                }
            }
            test.TestSceneUI = TestSceneUI;
            REG("ui.test.TestSceneUI", TestSceneUI);
        })(test = ui.test || (ui.test = {}));
    })(ui || (ui = {}));

    class GameControl extends Laya.Script {
        constructor() {
            super();
            this.createBoxInterval = 1000;
            this._time = 0;
            this._started = false;
        }
        onEnable() {
            this._time = Date.now();
            this._gameBox = this.owner.getChildByName("gameBox");
        }
        onUpdate() {
            let now = Date.now();
            if (now - this._time > this.createBoxInterval && this._started) {
                this._time = now;
                this.createBox();
            }
        }
        createBox() {
            let box = Laya.Pool.getItemByCreateFun("dropBox", this.dropBox.create, this.dropBox);
            box.pos(Math.random() * (Laya.stage.width - 100), -100);
            this._gameBox.addChild(box);
        }
        onStageClick(e) {
            e.stopPropagation();
            let flyer = Laya.Pool.getItemByCreateFun("bullet", this.bullet.create, this.bullet);
            flyer.pos(Laya.stage.mouseX, Laya.stage.mouseY);
            this._gameBox.addChild(flyer);
        }
        startGame() {
            if (!this._started) {
                this._started = true;
                this.enabled = true;
            }
        }
        stopGame() {
            this._started = false;
            this.enabled = false;
            this.createBoxInterval = 1000;
            this._gameBox.removeChildren();
        }
    }

    class GameUI extends ui.test.TestSceneUI {
        constructor() {
            super();
            GameUI.instance = this;
            Laya.MouseManager.multiTouchEnabled = false;
            Laya.loader.load("res/Snipaste.png", Laya.Handler.create(this, () => {
                var texture = Laya.Loader.getRes("res/Snipaste.png");
                var spe = new DissolveSurfaceSprite();
                spe.setTexture(texture);
                spe.setNoiseTexSkin('res/timg1.jpg');
                spe.setDissolveThreshold(10);
                spe.x = Laya.stage.width / 2 - texture.width / 2;
                spe.y = Laya.stage.height / 2 - texture.height / 2;
                Laya.stage.addChild(spe);
            }));
        }
        onEnable() {
            this._control = this.getComponent(GameControl);
            this.tipLbll.on(Laya.Event.CLICK, this, this.onTipClick);
        }
        onTipClick(e) {
            this.tipLbll.visible = false;
            this._score = 0;
            this.scoreLbl.text = "";
            this._control.startGame();
        }
        addScore(value = 1) {
            this._score += value;
            this.scoreLbl.changeText("分数：" + this._score);
            if (this._control.createBoxInterval > 600 && this._score % 20 == 0)
                this._control.createBoxInterval -= 20;
        }
        stopGame() {
            this.tipLbll.visible = true;
            this.tipLbll.text = "游戏结束了，点击屏幕重新开始";
            this.tipLbll.alpha = 0.2;
            this._control.stopGame();
        }
    }

    class Bullet extends Laya.Script {
        constructor() { super(); }
        onEnable() {
            var rig = this.owner.getComponent(Laya.RigidBody);
            rig.setVelocity({ x: 0, y: -10 });
        }
        onTriggerEnter(other, self, contact) {
            this.owner.removeSelf();
        }
        onUpdate() {
            if (this.owner.y < -10) {
                this.owner.removeSelf();
            }
        }
        onDisable() {
            Laya.Pool.recover("bullet", this.owner);
        }
    }

    class DropBox extends Laya.Script {
        constructor() {
            super();
            this.level = 1;
        }
        onEnable() {
            this._rig = this.owner.getComponent(Laya.RigidBody);
            this.level = Math.round(Math.random() * 5) + 1;
            this._text = this.owner.getChildByName("levelTxt");
            this._text.text = this.level + "";
        }
        onUpdate() {
            this.owner.rotation++;
        }
        onTriggerEnter(other, self, contact) {
            var owner = this.owner;
            if (other.label === "buttle") {
                if (this.level > 1) {
                    this.level--;
                    this._text.changeText(this.level + "");
                    owner.getComponent(Laya.RigidBody).setVelocity({ x: 0, y: -10 });
                    Laya.SoundManager.playSound("sound/hit.wav");
                }
                else {
                    if (owner.parent) {
                        let effect = Laya.Pool.getItemByCreateFun("effect", this.createEffect, this);
                        effect.pos(owner.x, owner.y);
                        owner.parent.addChild(effect);
                        effect.play(0, true);
                        owner.removeSelf();
                        Laya.SoundManager.playSound("sound/destroy.wav");
                    }
                }
                GameUI.instance.addScore(1);
            }
            else if (other.label === "ground") {
                owner.removeSelf();
                GameUI.instance.stopGame();
            }
        }
        createEffect() {
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
            Laya.Pool.recover("dropBox", this.owner);
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/GameUI.ts", GameUI);
            reg("script/GameControl.ts", GameControl);
            reg("script/Bullet.ts", Bullet);
            reg("script/DropBox.ts", DropBox);
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

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
