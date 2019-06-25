class Board {
    constructor(size, color) {
        this.size = size;
        this.color = color;

        // Pixelart numbers in a 6x7 grid
        this.chars = [
            '011110110011110011110011110011110011011110',
            '001100011100001100001100001100001100011110',
            '011110110011000011001110011000110000111111',
            '011110110011000011001110000011110011011110',
            '110011110011110011110011011111000011000011',
            '111111110000111110000011000011110011011110',
            '011110110011110000111110110011110011011110',
            '111111000011000110001100001100001100001100',
            '011110110011110011011110110011110011011110',
            '011110110011110011011111000011110011011110'
        ];
    }
    digit(n) {
        if (!this.chars[n]) throw "Invalid number";

        const dig     = this.chars[n].split('');
        const canvas  = document.createElement('canvas');
        const ctx     = canvas.getContext('2d');
        canvas.width  = 6 * this.size;
        canvas.height = 7 * this.size;
        ctx.fillStyle = this.color;
        for (let row = 0; row < 7; row++) {
            for (let col = 0; col < 6; col++) {
                if (parseInt(dig[col + 6*row]) == 1) {
                    // Draw a Pixel
                    ctx.fillRect(
                        col * this.size,
                        row * this.size,
                        this.size,
                        this.size
                    );
                }
            }
        }
        return canvas;
    }
    number(n) {
        const canvas = document.createElement('canvas');
        const ctx    = canvas.getContext('2d');
        const len    = n.toString().length
        canvas.width  = 7 * len * this.size;
        canvas.height = this.size * 7;

        n.toString().split('').forEach( (c, index) => {
            ctx.drawImage(
                this.digit(parseInt(c)),
                7 * index * this.size,
                0
            );
        });
        return canvas;
    }
}