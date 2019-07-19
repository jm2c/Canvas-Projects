import Circle from './Circle.js';
import Holder from './Holder.js';

// Create the canvas and context
const canvas = document.createElement('canvas');
const ctx    = canvas.getContext('2d');
document.body.appendChild(canvas);

// Setup for fullscreen canvas
canvas.style.backgroundColor = 'black';
(function init(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    addEventListener('resize', init);
})();

// Here starts the project
const radius = canvas.width / 10;
const circle = new Circle(canvas.width / 2, canvas.height / 2, radius);
const holder = new Holder(canvas.width / 2, canvas.height / 2, radius);
const dist = (x1, y1, x2, y2) => Math.sqrt((x2-x1)**2+(y2-y1)**2);
const mouseHover = () => dist(mouseX, mouseY, circle.x, circle.y) < circle.r;
const holderHover = () => dist(holder.x, holder.y, circle.x, circle.y) < circle.r*.7;

let mouseX, mouseY;
addEventListener('mousemove', evt => {
    mouseX = evt.clientX;
    mouseY = evt.clientY;

    // The mouse is hover, but not dragging
    if (mouseHover() && !circle.dragged) {
        document.body.style.cursor = 'grab';
    }
    // The dragging action is active
    else if (circle.dragged) {
        document.body.style.cursor = 'grabbing';
        if (holderHover()) holder.setHover();
        else holder.setHollow();
    }
    // Mouse is not hover
    else {
        document.body.style.cursor = 'auto';
        if (holderHover()) holder.setFilled();
        else holder.setHollow();
    }
});

let dx, dy;
addEventListener('mousedown', evt => {
    if (mouseHover()){
        circle.dragged = true;
        dx = circle.x - mouseX;
        dy = circle.y - mouseY;
    }
});

addEventListener('mouseup', evt => {
    circle.dragged = false;

    // Snap circle to holder
    if (holderHover()) {
        circle.x = holder.x;
        circle.y = holder.y;
        holder.setFilled();
    }
});

// Main loop for animations
(function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (circle.dragged){
        circle.x = mouseX + dx;
        circle.y = mouseY + dy;
    }
    holder.draw(ctx);
    circle.draw(ctx);
})();
