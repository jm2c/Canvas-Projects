// Create the canvas and context
const canvas = document.createElement('canvas');
const ctx    = canvas.getContext('2d');
let w, h;
document.body.appendChild(canvas);

// Setup for fullscreen canvas
canvas.style.backgroundColor = 'black';
(function init(){
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    addEventListener('resize', init);
})();

// Drag and Drop
let mouseX, mouseY;
addEventListener('mousemove', evt => {
    mouseX = evt.x;
    mouseY = evt.y;

    for (const p in points) {
        var point = points[p];
        if (point.dragging) {
            point.x = mouseX;
            point.y = mouseY;
        }
    }
});

addEventListener('mousedown', evt => {
    for (const p in points) {
        var point = points[p];
        if (point.inCircle(mouseX, mouseY)) {
            point.dragging = true;
        }
    }
});

addEventListener('mouseup', evt => {
    for (const p in points) {
        var point = points[p];
        point.dragging = false;
    }
});


const points = {
    p0: new Point(w/5, h/2),
    p1: new Point(2*w/5, h/2, true  ),
    p2: new Point(3*w/5, h/2, true),
    p3: new Point(4*w/5, h/2),
};

// This are the parametric equations that describe the bézier curve
let x0, y0, x1, y1, x2, y2, x3, y3;
let x = t => x0*(1-t)**3 + 3*x1*t*(1-t)**2 + 3*x2*t**2*(1-t) + x3*t**3;
let y = t => y0*(1-t)**3 + 3*y1*t*(1-t)**2 + 3*y2*t**2*(1-t) + y3*t**3;

// Draws the bézier curve in the canvas
function bézier(){
    ctx.strokeStyle = 'green';
    ctx.lineWidth = h/100;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    for (let t = 0; t < 1; t+=0.005) {
        ctx.lineTo(x(t), y(t));
    }
    ctx.lineTo(x3, y3);
    ctx.stroke();
}

function line(x1, y1, x2, y2, lw, color) {
    ctx.beginPath();
    ctx.lineWidth = lw;
    ctx.strokeStyle = color;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}

// Main loop
(function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, w, h);
    ctx.font = '15px sans';
    ctx.fillStyle = ' white';
    ctx.fillText('Move the control points around', 5, 18);

    x0 = points.p0.x;
    y0 = points.p0.y;
    x1 = points.p1.x;
    y1 = points.p1.y;
    x2 = points.p2.x;
    y2 = points.p2.y;
    x3 = points.p3.x;
    y3 = points.p3.y;
    
    bézier();
    line(x0, y0, x1, y1, 1, 'rgba(190,190,190,0.4');
    line(x2, y2, x3, y3, 1, 'rgba(190,190,190,0.4');
    
    for (const p in points) {
        points[p].draw();
    }

})();