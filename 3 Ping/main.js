var paddleW;
var paddleH;
var canv;
var ctx;
var player;
var foe;
var ballR;

var score1;
var score2;
var aiv;

function update() {

    if (ball.y + ballR < 0 && ball.yv < 0 || ball.y + ballR > canv.height && ball.yv > 0){
        ball.yv *= -1
    }

    if ((ball.x < paddleW && ball.y > player.y && ball.y < player.y + paddleH) ||
        (ball.x > canv.width - paddleW && ball.y > foe.y && ball.y < foe.y + paddleH)){
        ball.xv *= -1
    }

    if (ball.x < 0){
        score2++;
        reset();
    } else if (ball.x > canv.width) {
        score1++;
        reset();
    }

    ball.x += ball.xv
    ball.y += ball.yv

    if (foe.y < ball.y){
        foe.yv = aiv;
    } else if (foe.y > ball.y) {
        foe.yv = -aiv;
    }

    foe.y += foe.yv

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, paddleW, paddleH);
    ctx.fillRect(foe.x, foe.y, paddleW, paddleH)

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(ball.x, ball.y, ballR, 0, 2 * Math.PI);
    ctx.fill();


    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(score1, canv.width/4, canv.height/9);

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(score2, canv.width/4 * 3, canv.height/9);

    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(canv.width/2, 0)
    ctx.setLineDash([40, 30]);
    ctx.lineWidth = 5;
    ctx.lineTo(canv.width/2, canv.height);
    ctx.stroke();

    window.requestAnimationFrame(update);
}

function reset() {
    ball.x = canv.width/2 - ballR/2,
    ball.y = canv.height/2 - ballR/2,
    ball.xv = Math.random() < 0.5 ? -(Math.random() * 5 + 2) : (Math.random() * 5 + 2)
    ball.yv = Math.random() < 0.5 ? -(Math.random() * 5 + 2) : (Math.random() * 5 + 2)

}

function movePaddle(e) {
    console.log(e.clientY);
    player.y = e.clientY;
}

function init() {
    canv = document.getElementById("canv");
    ctx = canv.getContext("2d");

    paddleW = 10;
    paddleH = 80;
    ballR = 8;
    aiv = 3;
    score1 = score2 = 0;

    player = {
        x: 0,
        y: canv.height/2 - paddleH/2,
    }

    foe = {
        x: canv.width - paddleW,
        y: canv.height/2 - paddleH/2,
        yv: 0
    }

    ball = {
        x: canv.width/2 - ballR/2,
        y: canv.height/2 - ballR/2,
        xv: Math.random() < 0.5 ? -(Math.random() * 5 + 2) : (Math.random() * 5 + 2),
        yv: Math.random() < 0.5 ? -(Math.random() * 5 + 2) : (Math.random() * 5 + 2)
    }

    canv.onmousemove = movePaddle;
    window.requestAnimationFrame(update);
}

init();