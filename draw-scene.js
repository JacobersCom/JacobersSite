
function drawScene(gl, programInfo, buffers, CubeRot)
{
    gl.clearColor(0.0,0.0,0.0,1.0); // set screen to black and fully opaque
    gl.clearDepth(1.0); // clearn everything
    gl.enable(gl.DEPTH_TEST); // enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things

    // Clear canvas

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    //Creates a PerspectiveMatrix
    const FOV = 45 * Math.PI / 180; //convert to radians

    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1; 
    const zFar = 100.0;

    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, FOV, aspect, zNear, zFar);

    //Set drawing to the center of the screen

    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -12.0]);
    
    mat4.rotate(
        modelViewMatrix, // destination matrix
         modelViewMatrix, // matrix to rotate
         CubeRot, // amount to rotate in radians
         [0,0,1]    
    ); //axis to rotate on(Z) 
    
    mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    CubeRot * 0.7, // amount to rotate in radians
    [0, 1, 0],
    ); // axis to rotate around (Y)
    
    mat4.rotate(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to rotate
    CubeRot * 0.3, // amount to rotate in radians
    [1, 0, 0],
    ); // axis to rotate around (X)

    //Telling webgl how to pull out the positon from the postion buffer into the vertexpostion attribute.
    setPositionAttribute(gl, buffers, programInfo);
    //Tell webgl how to use the program when drawing

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    

    gl.useProgram(programInfo.program);
    
    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
    
    {
        const vertexCount = 36;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
}


//Tell WebGL how to pull out the position from the position buffer
//and into vertexPosition attribute.

function setPositionAttribute(gl, buffers, programInfo)
{
    const numComponents = 3; // put out 2 values per iteration
    const type = gl.FLOAT; // data in buffer is a float
    const normalize = false;
    const stride = 0; //how many bytes to get from one set of values to the next
    const offset = 0 // where to start reading data in the buffer

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);

    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPos,
        numComponents, type, normalize, stride, offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPos);
}

export {drawScene};