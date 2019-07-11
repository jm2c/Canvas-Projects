import Clock from './Clock.js';

let clock = new Clock(true); // Change it to false to step movement
let canvas = clock.toCanvas(innerHeight*0.8);
// clock.handlersColor = '#666';
// clock.bgColor = '#222';
// clock.fgColor = '#999';
// clock.name = '@jmcareaga';

document.body.appendChild(canvas);

(function clockUpdate() {
    requestAnimationFrame(clockUpdate);
    clock.setSystemTime();
    clock.draw(canvas);
})();
