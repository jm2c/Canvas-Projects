const PI = Math.PI;
const TAU = 2 * PI;
const canvasSize = 600;
const sin = x => Math.sin(x);
const cos = x => Math.cos(x);

let zoom = 40;
let pointWidth = 0.08;
let pointColor = 'yellow';

let x = t => 3 * cos(t);
let y = t => 3 * sin(t);
let valuesTable = [];
let frame;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const w = canvas.width = canvasSize;
const h = canvas.height = canvasSize;

canvas.style.backgroundColor = 'black';
ctx.translate(w/2, h/2);
ctx.scale(zoom, zoom);
document.body.appendChild(canvas);

function dot(x, y) {
    ctx.beginPath();
    ctx.fillStyle = pointColor;
    ctx.arc(x, y, pointWidth / 2, 0, TAU);
    ctx.fill();
    ctx.closePath();
}

function line(x1, y1, x2, y2, color = 'silver') {
    ctx.beginPath();
    ctx.lineWidth = pointWidth * .8;
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function drawAxis(){
    line(-w/2, 0, w/2, 0);
    line(0,-h/2, 0, h/2);
}

function clear() {
    stop();
    valuesTable = [];
    ctx.clearRect(-w/2, -h/2, w, h);
    drawAxis();
}

function stop() {
    cancelAnimationFrame(frame);
}

clear();

function parametric(ti = 0, tf = TAU, step = 100, scl = 1, table = false) {
    const t = ti;
    const xt = x(t);
    const yt = -y(t);
    valuesTable.push({t: t, x:xt, y:yt});
    dot(xt*scl, yt*scl);

    if(t < tf) {
        frame = requestAnimationFrame(()=>{
            parametric(t + 1 / step, tf, step, scl, table);
        });
    } else {
        if(table){
            console.table(valuesTable);
        }
    }
}
