
function drawScene(gl, programInfo, buffers)
{
    gl.clearColor(0.0,0.0,0.0,1.0); // set screen to black and fully opaque
    gl.clearDepth(0.0); // clearn everything
    gl.enable(gl.DEPTH_TEST); // enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things

    // Clearn canvas

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    //Creates a PerspectiveMatrix
    const FOV = (45 * Math.PI) / 180; //convert to radians

    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1; 
    const zFar = 100.0;

    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, FOV, aspect, zNear, zFar);

    //Set drawing to the center of the screen
    const modelViewMat = mat4.create();

    mat4.translate(
        modelViewMat, //destination matrix
        modelViewMat, //matrix to translate
        [-0.0,0.0,-6.0], //amount to translate by
    ); 

    //Telling webgl how to pull out the positon from the postion buffer into the vertexpostion attribute.
 
    //Tell webgl how to use the program when drawing
    gl.useProgram(programInfo.program);

    //Set shader uniforms
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix,
    );
    gl.uniformMatrix4fv
    (
        programInfo.uniformLocations.modelViewMat,
        false,
        modelViewMat,
    );
    
    {
        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }

}


//Tell WebGL how to pull out the position from the position buffer
//and into vertexPosition attribute.

function setPostionAttribute(gl, buffers, programInfo)
{
    const numComponents = 2; // put out 2 values per iteration
    const type = gl.FLOAT; // data in buffer is a float
    const normalize = false;
    const stride = 0; //how many bytes to get from one set of values to the next

    const offset = 0 // where to start reading data in the buffer

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents, type, normalize, stride, offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

export {drawScene};