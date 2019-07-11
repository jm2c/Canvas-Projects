export default class Clock {
    constructor(twentyfour = false, milliseconds = false) {
        this.twentyfour = twentyfour;
        this.milliseconds = milliseconds;
        this.update();
    }

    // Getters for system time
    getSystemHours()        { return new Date().getHours();        }
    getSystemMinutes()      { return new Date().getMinutes();      }
    getSystemSeconds()      { return new Date().getSeconds();      }
    getSystemMilliseconds() { return new Date().getMilliseconds(); }

    update() {
        this.h = this.getSystemHours();
        this.m = this.getSystemMinutes();
        this.s = this.getSystemSeconds();
        this.l = this.milliseconds ? this.getSystemMilliseconds() : 0;
    }

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
        ctx.strokeStyle = 'black';
        ctx.lineWidth = size / 40;
        ctx.arc(0, 0, size*0.95 / 2, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw marks
        ctx.fillStyle = 'black';
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

        // Draw handlers
        ctx.lineCap = 'round';
        // Hour handler
        ctx.strokeStyle = 'steelblue';
        let r = -(size / 2)*.55;
        let angle = (this.h % 24)*30 + this.m * 0.5;
        let x = r*Math.cos((angle+90)*Math.PI/180);
        let y = r*Math.sin((angle+90)*Math.PI/180);
        ctx.beginPath();
        ctx.lineWidth = size / 35;
        ctx.moveTo(0,0);
        ctx.lineTo(x, y);
        ctx.stroke();
        // Minute handler
        ctx.strokeStyle = 'royalblue';
        r = -(size / 2)*.65;
        angle = this.m*6;
        x = r*Math.cos((angle+90)*Math.PI/180);
        y = r*Math.sin((angle+90)*Math.PI/180);
        ctx.beginPath();
        ctx.lineWidth = size / 50;
        ctx.moveTo(0,0);
        ctx.lineTo(x, y);
        ctx.stroke();
        // Seconds handler
        ctx.strokeStyle = 'midnightblue';
        r = -(size / 2)*.75;
        angle = this.s*6;
        x = r*Math.cos((angle+90)*Math.PI/180);
        y = r*Math.sin((angle+90)*Math.PI/180);
        ctx.beginPath();
        ctx.lineWidth = size / 90;
        ctx.moveTo(0,0);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Finally, the central dot
        ctx.fillStyle = 'lightsteelblue';
        dot(ctx, 0, 0, size / 40);
    }

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

// Private methods
function dot(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fill();
}