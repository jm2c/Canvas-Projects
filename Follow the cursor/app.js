// Crear el lienzo de dibujo
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Adaptarlo al tamaño de la ventana e incrustarlo dentro del documento HTML
(function init(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    addEventListener('resize', init);
})();
document.body.appendChild(canvas);

// Obtener constantemente las coordenadas del ratón
let mouseX, mouseY;
addEventListener('mousemove', evt => {
    mouseX = evt.x;
    mouseY = evt.y;
});

/**
 * Crea un círculo del tamaño y color dados que sigue al ratón
 * @param r = (Int) radio de la partícula
 * @param color = (String) color de la partícula en cualquier formato aceptado
 */
class Particle {
    constructor(r, color){
        this.r = r;
        this.color = color;
        this.x = undefined;
        this.y = undefined;
    }

    draw() {
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    update() {
        if(this.x && this.y){
            this.x += (mouseX-this.x)*.08;
            this.y += (mouseY - this.y)*.08;
        }else{
            this.x = mouseX;
            this.y = mouseY;
        }
        this.draw();
    }
}

// Crea una partícula
p1 = new Particle(10, '#22a6b3');

// Loop principal de la animación
(function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(0,0,innerWidth, innerHeight);
    p1.update();
})();
