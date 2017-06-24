var canv;
var ctx;
var sf;
var cols;
var rows;
var snake;
var xv;
var yv;
var food;
var score;

function reset() {
    xv = 1;
    yv = 0;

    cX = 0;
    cY = 0;

    snake = [{
        x: 0,
        y: 0
    }];
    score = 0;
}

function update() {

    cX = snake[snake.length - 1].x
    cY = snake[snake.length - 1].y


    if (cY < 0 || cY > rows || cX < 0 || cX > cols) {
        reset();
    }


    if (food.x == cX && food.y == cY) {
        cX += xv;
        cY += yv;
        score++;
        food = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
        };

        snake.push({x: cX, y: cY});

    } else {
        cX += xv;
        cY += yv;

        for (let i = 0; i < snake.length - 1; i++){
            if (cX == snake[i].x && cY == snake[i].y){
                reset();
            }
        }

        snake.push({x: cX, y: cY});
        snake.shift();
    }

    draw();
    window.requestAnimationFrame(frames);

}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    for (let i = 0; i < snake.length; i++){
        if (i == snake.length - 1){
            ctx.fillStyle = "red";
        } else {
             ctx.fillStyle = "white";
        }
        ctx.fillRect(snake[i].x * sf, snake[i].y * sf, sf, sf);
    }
    ctx.fillStyle = "white";
    ctx.font = "20pt Arial";
    ctx.fillText("Score: " + score, 20, 40);

    ctx.fillStyle = "green";
    ctx.fillRect(food.x * sf, food.y * sf, sf, sf);
}

function frames() {
    setTimeout(update, 1000/10);
}


function keyDown(e) {
    switch (e.key) {
        case "ArrowLeft":
            xv = -1;
            yv = 0;
            break;
        case "ArrowUp":
            yv = -1;
            xv = 0;
            break;
        case "ArrowRight":
            xv = 1;
            yv = 0
            break;
        case "ArrowDown":
            yv = 1;
            xv = 0;
            break;
        default:
            // pass
    }
}


function init() {
    canv = document.getElementById("canv");
    ctx = canv.getContext("2d");

    sf = 20;
    cols = Math.floor(canv.width / sf);
    rows = Math.floor(canv.height / sf);
    xv = 1;
    yv = 0;
    snake = [{
        x: 0,
        y: 0
    }];
    score = 0;
    food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
    };

    document.onkeydown = keyDown;
    window.requestAnimationFrame(frames);
}


document.onload = init();
