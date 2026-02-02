export function initBuffers(gl){
    const posBuffer = initPosBuffer(gl);
    return {
        position: posBuffer
    };
}




function initPosBuffer(gl){
    const posBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);

    // this is crazy and evil, I guess you could use spread operator for it
    const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    return posBuffer;
}