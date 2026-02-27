import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";

main();

async function main()
{
    const canvas = document.getElementById("glcanvas");

    if(!canvas)
    {
        alert(
            "Unable to create canvas"
        );
        return;
    }

    //Initialize the gl context
    const gl = canvas.getContext("webgl");

    if(gl == null)
    {
        alert(
            "Unable to inititalize WebGL. Your browser or machine may not support it."
        );
        return;
    }
   
    
    
    const [vsSource, fsSource] = await Promise.all([
        loadShaderSource(new URL("./VS.glsl", import.meta.url)),
        loadShaderSource(new URL("./PS.glsl", import.meta.url)),
    ]);
    
    const shaderProgram = InitializeShaderProgram(gl, vsSource, fsSource);
    
    //Looking up attributes our shader program is using and uniform locations
    //Look up table
    const programInfo = {
        program: shaderProgram,
        attribLocations:{
            vertexPos: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        },
        uniformLocations:{
            projectionMatrix: gl.getUniformLocation(shaderProgram,"uProjectionMatrix"),
            modelViewMatrix : gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        }
    };
    
    const buffer = initBuffers(gl);
    
    let CubeRot = 0.0;
    let deltaTime = 0;
    let then = 0;

    function render(now)
    {
        now *= 0.001 // convert to seconds;
        deltaTime = now - then;
        then = now;

        drawScene(gl, programInfo, buffer, CubeRot);
        CubeRot += deltaTime; 

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

function InitializeShaderProgram(gl, vsSource, psSource)
{
    const VertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const PixelShader = loadShader(gl, gl.FRAGMENT_SHADER, psSource);

    //Create shader program

    const ShaderProgram = gl.createProgram();
    gl.attachShader(ShaderProgram, VertexShader);
    gl.attachShader(ShaderProgram, PixelShader);
    gl.linkProgram(ShaderProgram);

    //If creating program filed

    if (!gl.getProgramParameter(ShaderProgram, gl.LINK_STATUS)) 
    {
        //The alert uses string interpolations allowing vars to be placed 
        //right in the string
        alert(
            `Unable to initialize the shader program: ${gl.getProgramInfoLog(
            ShaderProgram,
        )}`,
    );
    return null;
  }

  return ShaderProgram;
}


function loadShader(gl, type, source)
{
   const Shader = gl.createShader(type);
    //const source = loadShaderSource(path);
    //Send source to shader object
    
    gl.shaderSource(Shader, source);
    
    //Compiles the shader 
    
    gl.compileShader(Shader);
    
    if (!gl.getShaderParameter(Shader, gl.COMPILE_STATUS)) 
    {
            //The alert uses string interpolations allowing vars to be placed 
            //right in the string
            alert(
                `An error occurred compiling the shaders: ${gl.getShaderInfoLog(Shader)}`,
            );
            
            gl.deleteShader(Shader);
            return null;
    }
        
    return Shader;
    
}   
    
async function loadShaderSource(path)
{
    const response = await fetch(path);
    if(!response.ok)
    {
        throw new Error(`Failed to load shader: ${path}`);
    }
    return await response.text();
}