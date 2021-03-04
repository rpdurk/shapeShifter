import COLORS from './gamecontroller';
import SIZE from './gamecontroller';

class Square {
    constructor(color, x, y, ctx) {
        this.color1 = color;
        this.color2 = COLORS[color];
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = SIZE;
    }

    render() {
        const size = this.size;
        this.ctx.fillStyle = this.color1;
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
        this.ctx.fillStyle = this.color2;
        this.ctx.fillRect(this.x + 4, this.y + 4, this.size - 8, this.size - 8);
    }
}

export default Square;