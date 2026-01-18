//This is a work in progress and will possibly not get completed, but I want to try to make my own math functions anyway..

//Column major order
class mat4 
{
    //when an mat4 is created it is a identity mat
    constructor()
    {
        this.data = new Float32Array(16); //16 values within a 4x4 matrix
        this.Identity();
    }

    Identity()
    {
        const m = this.data; //refers back to the flaot32Array
        m[0] = 1;m[4] = 0;m[8] = 0;m[12] = 0; 
        m[1] = 0;m[5] = 1;m[9] = 0;m[13] = 0;
        m[2] = 0;m[6] = 0;m[10] = 1;m[14] = 0;
        m[3] = 0;m[7] = 0;m[11] = 0;m[15] = 1;
    }

    //Creates a translation matrix that moves the object in the inputted direction
    Translation(x,y,z)
    {
        const m = this.data;
        m[12] = x;
        m[13] = y;
        m[14] = z;
        return this;
    }

    Scaling(x,y,z)
    {
       const  m = this.data;
        m[0] = x;
        m[10] = y;
        m[15] = z;
        return this;
    }


    // Multiply(inMat1, inMat2, outMat)
    // {
    //     m1 = intMat1;
    //     m2 = inMat2;

    //     outMat.data[0] = intMat1[0] * intMat2[0] + 
    // }

}

