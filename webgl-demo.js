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

    gl.clearColor(1.0,1.0,1.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}