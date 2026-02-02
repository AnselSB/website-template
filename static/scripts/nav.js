import { initBuffers } from "./buffers";
import { drawScene } from "./draw";

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





const goNext = (e) => {
    window.location = '/test'
}

function setDeps() {
    document.getElementById('welcome-p').textContent = 'hahahahahahaha'

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

    const buffers = initBuffers(gl);
    drawScene(gl, programInfo, buffers);
}

window.addEventListener('DOMContentLoaded', setDeps)
