class Snake {
    constructor() {
        this.body = [];
        this.head = createVector(floor(w / 2), floor(h / 2));
        this.dir = 0;
    }

    setDir(x, y) {
        this.dir = createVector(x, y);
    }

    update(food) {
        this.body.push(this.head.copy());
        this.head.add(this.dir);
        if (this.head.x === food.x && this.head.y === food.y) {
            return true; // yum!
        }
        this.body.shift();
        return false;
    }

    endGame() {
        let x = this.head.x;
        let y = this.head.y;
        if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
            return true;
        }
        for (let part of this.body) {
            if (part.x == x && part.y == y) {
                return true;
            }
        }
        return false;
    }

    show() {
        fill(255);
        noStroke();
        for (let part of this.body) {
            rect(part.x, part.y, 1, 1);
        }
        fill(255, 150, 150);
        rect(this.head.x, this.head.y, 1, 1);
    }
}