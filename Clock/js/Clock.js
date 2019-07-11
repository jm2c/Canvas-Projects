export default class Clock {
    constructor(milliseconds = false, twentyfour = false) {
        this.twentyfour = twentyfour;
        this.milliseconds = milliseconds;
        this.setSystemTime();

        // Canvas Personilizer
        this.name          = 'QUARTZ';
        this.fgColor       = 'black';
        this.bgColor       = 'white';
        this.handlersColor = 'midnightblue';
    }

    // Getters for system time
    getSystemHours()        { return new Date().getHours();        }
    getSystemMinutes()      { return new Date().getMinutes();      }
    getSystemSeconds()      { return new Date().getSeconds();      }
    getSystemMilliseconds() { return new Date().getMilliseconds(); }

    // Set the time to actual system time
    setSystemTime() {
        this.h = this.getSystemHours();
        this.m = this.getSystemMinutes();
        this.s = this.getSystemSeconds();
        this.l = this.milliseconds ? this.getSystemMilliseconds() : 0;
    }

    // Set to any time
    setTime(h,m,s,l) {
        if (h > 24  || h < 0) throw 'Invalid hour format';
        if (m > 60  || m < 0) throw 'Invalid minutes format';
        if (s > 60  || s < 0) throw 'Invalid seconds format';
        if (l > 999 || l < 0) throw 'Invalid milliseconds format';

        if (h == 24) this.h = 0;
        else this.h = h || 0;
        this.m = m || 0;
        this.s = s || 0;
        this.l = l || 0;
    }

    // Return a DOM Canvas element with the clock drawn
    toCanvas(size = 200) {
        // Prepare the canvas
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        canvas.getContext('2d').translate(size / 2, size / 2);
        this.draw(canvas);

        // Return the final result
        return canvas;
    }

    // Draws the clock in the canvas
    draw(canvas) {
        const ctx = canvas.getContext('2d');
        const size = canvas.width;
        const alignmentFactor = (size/2)*0.75;
        const cos30 = Math.cos(Math.PI/6),
              cos60 = Math.cos(Math.PI/3),
              sin30 = Math.sin(Math.PI/6),
              sin60 = Math.sin(Math.PI/3);

        ctx.clearRect(-size/2,-size/2,size,size);
        ctx.beginPath();
        // Draw the circle
        ctx.strokeStyle = this.fgColor;
        ctx.fillStyle = this.bgColor;
        ctx.lineWidth = size / 40;
        ctx.arc(0, 0, size*0.95 / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        // Draw marks
        ctx.fillStyle = this.fgColor;
        dot(ctx, 0, 0, size / 50);
        dot(ctx,  alignmentFactor * cos60, -alignmentFactor * sin60, size / 80);
        dot(ctx,  alignmentFactor * cos30, -alignmentFactor * sin30, size / 80);
        dot(ctx,  alignmentFactor * cos60,  alignmentFactor * sin60, size / 80);
        dot(ctx,  alignmentFactor * cos30,  alignmentFactor * sin30, size / 80);
        dot(ctx, -alignmentFactor * cos60,  alignmentFactor * sin60, size / 80);
        dot(ctx, -alignmentFactor * cos30,  alignmentFactor * sin30, size / 80);
        dot(ctx, -alignmentFactor * cos60, -alignmentFactor * sin60, size / 80);
        dot(ctx, -alignmentFactor * cos30, -alignmentFactor * sin30, size / 80);

        // Draw the numbers
        ctx.font = `${size / 10}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('12', 0, -alignmentFactor);
        ctx.fillText('3', alignmentFactor, 0);
        ctx.fillText('6', 0, alignmentFactor);
        ctx.fillText('9', -alignmentFactor, 0);
        // And the name
        ctx.font = `${size/30}px serif`;
        ctx.fillText(this.name, 0, alignmentFactor-size/8);

        // Draw handlers
        let r, angle, width;
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.handlersColor;
        // Hour handler
        r = -(size / 2)*.55;
        angle = (this.h % 24)*30 + this.m * 0.5;
        width = size / 35;
        drawHandler(ctx, r, angle, width);
        // Minute handler
        r = -(size / 2)*.65;
        angle = this.m*6 + this.s * .1;
        width = size / 50;
        drawHandler(ctx, r, angle, width);
        // Seconds handler
        r = -(size / 2)*.75;
        width = size / 90;
        angle = this.s*6 + this.l * .006;
        drawHandler(ctx, r, angle, width, true);

        // Finally, the central dot
        ctx.fillStyle = this.fgColor;
        dot(ctx, 0, 0, size / 40);
    }

    // Return the time of the clock in friendly format
    toString() {
        const h = this.twentyfour ? this.h : this.h % 12,
              m = this.m,
              s = this.s,
              l = this.l;
        let str = this.h == 12 && !this.twentyfour ? '12:' : h.toString() + ':';
        str += m < 10 ? '0'+m.toString() : m.toString();
        str += ':';
        str += s < 10 ? '0'+s.toString() : s.toString();
        if (this.milliseconds)
            str += l < 10 ? ':0'+l.toString() : ':'+l.toString();
        return str;
    }
}

/**
 * Private methods
 */

//  Draw a filled circle
function dot(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fill();
}

// To draw the clock handlers, obviously
function drawHandler(ctx, r, angle, width, tail = false){
    const x = r * Math.cos( toRad(angle + 90) );
    const y = r * Math.sin( toRad(angle + 90) );
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.moveTo(0,0);
    ctx.lineTo(x, y);
    ctx.stroke();

    if (tail) {
        ctx.lineCap = 'butt';
        drawHandler(ctx, r*.25, angle+180, width*1.8, false);
    }
}

// Tranform from degrees to radians
function toRad(deg) {
    return deg * Math.PI / 180;
}
