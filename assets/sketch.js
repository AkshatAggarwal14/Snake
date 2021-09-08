/// <reference path="p5.global-mode.d.ts" />

let snake; //the snake
let rez = 20; //resolution
let food; //food vector
let w;
let h;
let score = 0;
let mode = 0;
let max_score = 0;

function setup() {
    createCanvas(window.innerWidth / 2, 2 * window.innerHeight / 3);
    w = floor(width / rez);
    h = floor(height / rez);
    // to give the game an arcade feel
    frameRate(10);
    snake = new Snake();
    foodLocation();
}

function foodLocation() {
    let x = floor(random(w));
    let y = floor(random(h));
    food = createVector(x, y); // food at random pos
}

function keyPressed() {
    if (mode == 0 || mode == 2) {
        if (keyCode === ENTER) {
            mode = 1;
            score = 0;
            snake = new Snake();
            foodLocation();
        }
    }
    if (keyCode === LEFT_ARROW && snake.xdir != 1) {
        snake.setDir(-1, 0);
    } else if (keyCode === RIGHT_ARROW && snake.xdir != -1) {
        snake.setDir(1, 0);
    } else if (keyCode === DOWN_ARROW && snake.ydir != -1) {
        snake.setDir(0, 1);
    } else if (keyCode === UP_ARROW && snake.ydir != 1) {
        snake.setDir(0, -1);
    }
    // else if (key == ' ') {
    //     snake.grow();
    // }
}

function draw() {
    clear();
    if (mode == 0) {
        fill(120, 240, 230);
        textSize(25);
        text('Press \"Enter\" to start playing...', 20, 40);
    } else if (mode == 1) {
        print("Game started");
        scale(rez);
        background(51);
        if (snake.eat(food)) {
            score++;
            foodLocation();
            max_score = max(max_score, score);
        }
        snake.update();
        snake.show();
        if (snake.endGame()) {
            background(255, 0, 0);
            mode = 2;
        }
        document.getElementById("score").innerHTML = "Score: " + score + "&nbsp;&nbsp;&nbsp;&nbsp;" + "High Score: " + max_score;
        noStroke();
        fill(255, 0, 0);
        rect(food.x, food.y, 1, 1);
    } else {
        background(51);
        fill(120, 240, 230);
        textSize(25);
        text('Game Over.. \nPress "Enter" to play again!', 20, 40);
        print("GAME OVER!");
    }
}