
//顶点着色器   直接使用的是laya官方自带的
var vs: string = `
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
    `
//片元着色器  一个简单的功能 根据噪图 过滤掉低于阈值的颜色
var ps: string = `
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

//需要继承精灵
export default class DissolveSurfaceSprite extends Laya.Sprite {
    private shaderValue: Laya.Value2D;
    //定义一个shaderid  用于laya在查找shader 时使用   
    static DissolveSurfaceSaveName: number = 9999;

    tex: Laya.Texture2D;

    constructor() {
        super();
        this.init();
    }

    public init(): void {
        this.shaderValue = new Laya.Value2D(DissolveSurfaceSprite.DissolveSurfaceSaveName, DissolveSurfaceSprite.DissolveSurfaceSaveName);
        //重要的一步  将渲染设置为自定义
        this.customRenderEnable = true;

        this.shaderValue.shader = new Laya.Shader2X(vs, ps, DissolveSurfaceSprite.DissolveSurfaceSaveName);
    }

    public setTexture(t: Laya.Texture2D) {
        (this.tex as any) = t;
    }

    /**
     * 设置噪图纹理
     * @param t 
     */
    public setNoiseTexture(t: Laya.Texture2D) {
        //这里的名字是在shader里 定义好的。
        this.shaderValue['u_NoiseTex'] = t;
    }

    public setNoiseTexSkin(skin: string) {
        Laya.loader.load(skin,new Laya.Handler(this, (tex) => {
            console.log("tex::"+tex);
            this.shaderValue['u_NoiseTex'] = tex._bitmap._glTexture
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
     */
    public setDissolveThreshold(t) {
        this.shaderValue['u_DissolveThreshold'] = t;
    }

    // 自定义渲染提交
    public customRender(context: Laya.Context, x: number, y: number) {
        //这一步很重要 
        context.drawTarget(this.tex as any, x, y, this.tex.width, this.tex.height, null, this.shaderValue);
    }
}