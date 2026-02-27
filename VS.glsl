
//Read only vars that will pass from the CPU to the GPU
attribute vec4 aVertexPosition;

//Passed from the CPU to GPU
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
void main() 
{
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}