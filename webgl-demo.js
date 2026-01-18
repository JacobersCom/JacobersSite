main();

function main()
{
    const canvas = document.querySelector("#gl-canvas");

    //Initialize the gl context
    const gl = canvas.getContext("webgl");

    if(gl == null)
    {
        alert(
            "Unable to inititalize WebGL. Your browser or machine may not support it."
        );
        return;
    }
    // Set clear color to black, fully opaque
    gl.clearColor(0.0,0.0,0.0,0.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    const shaderProgram = InitializeShaderProgram(gl, "VS.glsl", "PS.glsl");

    //Looking up attributes our shader program is using and uniform locations
    //Look up table
    const programInfo = {
        program: shaderProgram,
        attribLocations:{
            vertexPos: shaderProgram.attribLocations.vPos,
        },
        uniformLocations:{
            projectionMatrix: shaderProgram.uniformLocations.uProjectionMat,
            modelViewMatrix : shaderProgram.uniformLocations.uModelViewMat,
        },
    };
}

function InitializeShaderProgram(gl, vsSource, psSource)
{
    const VertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const PixelShader = loadShader(gl, gl.VERTEX_SHADER, psSource);

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

    //Send source to shader object

    gl.shaderSource(Shader, source);

    //Compiles the shader 

    gl.compileShader(Shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
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