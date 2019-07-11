import Clock from './Clock.js';

let clock = new Clock();
let canvas = clock.toCanvas(innerHeight*0.8);
// clock.handlersColor = '#666';
// clock.bgColor = '#222';
// clock.fgColor = '#999';
// clock.name = '@jmcareaga';
clockUpdate();
document.body.appendChild(canvas);

function clockUpdate() {
    clock.setSystemTime();
    clock.draw(canvas);
};

setInterval(clockUpdate, 1E3);