
//Read only vars that will pass from the CPU to the GPU
attribute vec4 vPos;

// global var passed from the CPU
uniform mat4 uModelViewMat; 
uniform mat4 uProjectionMat;

void main()
{
    gl_Position = uProjectionMat * uModelViewMat * vPos;
}