import { Filter, Texture, WRAP_MODES } from "pixi.js";

export default class FlameFilter extends Filter {

  public time: number = 0.0;

  constructor(texture: Texture, time = 0.0) {
    super(null, FRAGMENT_SHADER);
    
    // On définit les dimensions et on applique la texture
    this.uniforms.dimensions = new Float32Array(2);
    this.texture = texture;
    this.time = time;
  }

  set texture(texture: Texture) {
    texture.baseTexture.wrapMode = WRAP_MODES.REPEAT;
    this.uniforms.mapSampler = texture; // Appliquer la texture directement ici
  }

  apply(filterManager, input, output, clear) {
    const width = input.baseTexture.width;
    const height = input.baseTexture.height;

    this.uniforms.dimensions[0] = width;
    this.uniforms.dimensions[1] = height;

    this.uniforms.time = this.time;

    filterManager.applyFilter(this, input, output, clear);
  }
}


  const FRAGMENT_SHADER =   `
  
  /**
  * Original shader by @kuvkar (https://www.shadertoy.com/view/4tXXRn) 
  */
 
 varying vec2 vTextureCoord;  
 
 uniform sampler2D uSampler;
 uniform sampler2D mapSampler;  
 uniform vec4 filterArea;  
 uniform vec2 dimensions;
 uniform float time;
 
 float rand(vec2 co) {
   return fract(sin(dot(co.xy ,vec2(12.9898, 78.233))) * 43758.5453);
 }
 
 mat2 rotz(float angle) {
   mat2 m;
   m[0][0] = cos(angle); m[0][1] = -sin(angle);
   m[1][0] = sin(angle); m[1][1] = cos(angle);
   return m;
 }  
 
 // Fractal Brownian Motion
 float fbm(vec2 uv) {        
   
   float n = (texture2D(mapSampler, uv).r - 0.5) * 0.5;
   n += (texture2D(mapSampler, uv * 2.0).r - 0.5) * 0.5 * 0.5;
   n += (texture2D(mapSampler, uv * 3.0).r - 0.5) * 0.5 * 0.5 * 0.5;    
   return n + 0.5;    
 }
 
 void main() {
   
   vec2 uv = (vTextureCoord * filterArea.xy) / dimensions;
   uv.y = 1.0 - uv.y;
   
   vec2 _uv = uv;
   uv -= vec2(0.5);
   uv.y /= dimensions.x / dimensions.y;      
   
   vec2 centerUV = uv;
   
   // height variation from fbm
   float variationH = fbm(vec2(time * 0.3)) * 1.1;
   
   // flame "speed"
   vec2 offset = vec2(0.0, -time * 0.05);
       
   // flame turbulence
   float f = fbm(uv * 0.1 + offset); // rotation from fbm        
   float l = max(0.1, length(uv)); // rotation amount normalized over distance
     uv += rotz(((f - 0.5) / l) * smoothstep(-0.2, 0.4, _uv.y) * 0.45) * uv;    
   
   // flame thickness
   float flame = 1.3 - length(uv.x) * 5.0;
   
   // bottom of flame 
   float blueflame = pow(flame * 0.9, 15.0);
   blueflame *= smoothstep(0.2, -1.0, _uv.y);
   blueflame /= abs(uv.x * 2.0);
   blueflame = clamp(blueflame, 0.0, 1.0);
   
   // flame
   flame *= smoothstep(1.0, variationH * 0.5, _uv.y);
     flame = clamp(flame, 0.0, 1.0);
   flame = pow(flame, 3.0);
   flame /= smoothstep(1.1, -0.1, _uv.y);    
   
   // colors
   vec4 col = mix(vec4(1.0, 1.0, 0.0, 0.0), vec4(1.0, 1.0, 0.6, 0.0), flame);
   col = mix(vec4(1.0, 0.0, 0.0, 0.0), col, smoothstep(0.0, 1.6, flame));
   gl_FragColor = col;
   
     // a bit blueness on the bottom
   vec4 bluecolor = mix(vec4(0.0, 0.0, 1.0, 0.0), gl_FragColor, 0.95);
   gl_FragColor = mix(gl_FragColor, bluecolor, blueflame);
   
   // clear bg outside of the flame
   gl_FragColor *= flame;
   gl_FragColor.a = flame;
   
   // bg halo
   /*
   float haloSize = 0.5;
   float centerL = 1.0 - (length(centerUV + vec2(0.0, 0.1)) / haloSize);
   vec4 halo = vec4(0.8, 0.3, 0.3, 0.0) * 1.0 * fbm(vec2(time * 0.035)) * centerL + 0.02;
   vec4 finalCol = mix(halo, gl_FragColor, gl_FragColor.a);
   gl_FragColor = finalCol;
   */

   // just a hint of noise
   gl_FragColor *= mix(rand(uv) + rand(uv * 0.45), 1.0, 0.9);
   gl_FragColor = clamp(gl_FragColor, 0.0, 1.0);
 }`;