export function initBuffers(gl, square) {
    const posBuffer = initPosBuffer(gl, square);
    return {
        position: posBuffer
    };
}




function initPosBuffer(gl, square) {
    const posBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);

    // this is crazy and evil, I guess you could use spread operator for it
    const positions = [square.p1.x, square.p1.y, square.p2.x, square.p2.y, square.p3.x, square.p3.y, square.p4.x, square.p4.y];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    return posBuffer;
}