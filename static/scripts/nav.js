import { initBuffers } from "./buffers.js";
import { drawScene } from "./draw.js";

const vsSource = `
    attribute vec4 pos; 
    uniform mat4 model;
    uniform mat4 project;

    void main (){
        gl_Position = project * model * pos;
    } 
`;

const fsSource = `
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;

// this function is responsible for initializing the shader program so webgl can compile/execute the written shader
function initShaderProgram(gl, vsSource, fsSource) {
    const vertShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // create the shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);

    // alert any possible failures
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.alert(`unable to link shader program to instance: ${gl.getProgramInfoLog(shaderProgram)}`);
        return undefined;
    }
    return shaderProgram;
}

function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // send source to the shader object

    gl.shaderSource(shader, source);

    // compile the shader 
    gl.compileShader(shader);

    // check for error
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log(`failed to load shader: ${gl.getShaderInfoLog(shader)}`);
        // IMPORTANT SHADERS ARE NOT GARBAGE COLLECTED
        gl.deleteShader(shader);
        return undefined;
    }
    return shader;
}





function goNext(e) {
    window.location = '/test';
}

function setDeps() {
    document.getElementById('welcome-p').textContent = 'hahahahahahaha';

    const canvas = document.querySelector('#gl-canvas');
    const gl = canvas.getContext("webgl");

    if (gl === undefined) {
        console.alert('unable to load WebGL. Your browser or machine may not support it.')
        return;
    }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, "pos"),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, "project"),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, "model"),
        },
    };



    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    renderSquare(gl, programInfo);



}

window.addEventListener('DOMContentLoaded', setDeps);
async function renderSquare(gl, programInfo) {
    const square = {
        p1: { x: 1.0, y: 1.0 },
        p2: { x: -1.0, y: 1.0 },
        p3: { x: 1.0, y: -1.0 },
        p4: { x: -1.0, y: -1.0 },
    };
    while (true) {
        square.p1.x = Math.random();
        square.p1.y = Math.random();

        square.p2.x = -1 * Math.random();
        square.p2.y = Math.random();

        square.p3.x = Math.random();
        square.p3.y = -1 * Math.random();

        square.p4.x = -1 * Math.random();
        square.p4.y = -1 * Math.random();

        const buffers = initBuffers(gl, square);

        drawScene(gl, programInfo, buffers);
    }
}