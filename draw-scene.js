
function drawScene(gl, programInfo, buffers)
{
    gl.clearColor(0.0,0.0,0.0,1.0); // set screen to black and fully opaque
    gl.clearDepth(0.0); // clearn everything
    gl.enable(gl.DEPTH_TEST); // enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things

    // Clearn canvas

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    
}