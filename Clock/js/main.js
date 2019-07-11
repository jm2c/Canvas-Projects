import Clock from './Clock.js';

let clock = new Clock();
let canvas = clock.toCanvas(innerHeight*0.8);
// clock.handlersColor = 'orange';
// clock.bgColor = 'midnightblue';
// clock.fgColor = 'goldenrod';
// clock.name = '@jmcareaga';
document.body.appendChild(canvas);

(function animate() {
    requestAnimationFrame(animate);
    clock.setSystemTime();
    clock.draw(canvas);
})();