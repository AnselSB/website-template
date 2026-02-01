const vsSource = `
    attribute vec4 pos; 
    uniform mat4 model;
    uniform mat4 project;

    void main (){
        gl_Position = project * model * model;
    } 
`;

const fsSource = `
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;


const goNext = (e) =>{
    window.location = '/test'
}

function setDeps(){
    document.getElementById('welcome-p').textContent='hahahahahahaha'

    const canvas = document.querySelector('#gl-canvas');
    const gl = canvas.getContext("webgl");
    
    if (gl === undefined) {
        console.alert('unable to load WebGL. Your browser or machine may not support it.')
        return;
    }
    
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

window.addEventListener('DOMContentLoaded', setDeps)
