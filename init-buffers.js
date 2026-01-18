function initBuffers(gl)
{
    const positionBuffer = initPositionBuffer(gl);
    
    return {
        position : positionBuffer,
    };
}

function initPositionBuffer(gl)
{
    //Create a buffer for the square pos

    const positionBuffer = gl.createBuffer();

    //select the posBuffer as the one to apply buffer
    //operations to from here out

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    //sqaure pos data
    const pos = [1.0,1.0,-1.0,1.0,1.0,-1.0,-1.0,-1.0];

    //Filling the current buffer with our pos data
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);

    return positionBuffer;
}

//other files can import and use this function
export {initBuffers};