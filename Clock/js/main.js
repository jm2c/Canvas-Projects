import Clock from './Clock.js';

let clock = new Clock();
let canvas = clock.toCanvas(innerHeight*0.8);
document.body.appendChild(canvas);

(function animate() {
    requestAnimationFrame(animate);
    clock.update();
    clock.draw(canvas);
})();