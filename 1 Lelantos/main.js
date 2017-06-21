var player;
var foes;
var foeCount = 20;
var holdLeft;
var holdRight;
var updateTimer;

function update() {

    while (foes.length < foeCount) {
        foes.push(makeFoe())
    }

    for (i = 0; i < foes.length; i++){
        foe = foes[i];

        if (player.x < foe.x + foe.w &&
            player.x + player.w > foe.x &&
            player.y < foe.y + foe.h &&
            player.y + player.h > foe.y) {
            init();
        }

        if (foe.y > canv.width){
            foes.splice(i, 1);
        }

        if (foe.yv < 5) {
            foe.yv *= 1.2;
        }

        foe.y += foe.yv
    }

    if (holdLeft) {
        player.xv = -2;
    }
    if (holdRight) {
        player.xv = 2;
    }
    player.xv *= 0.8;
    player.x += player.xv;
    draw();
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    ctx.fillStyle = "white";

    for (var i = 0; i < foes.length; i++){
        foe = foes[i];
        ctx.fillRect(foe.x, foe.y, foe.w, foe.h);
    }

    ctx.fillRect(player.x, player.y, player.w, player.h)

}

function makeFoe() {
    foe = {
        x: Math.random() * canv.width,
        y: -(Math.random() * 800),
        w: Math.random() * 20 + 10,
        h: Math.random() * 20 + 10,
        yv: Math.random() * 4 + 1
    };
    return foe;
}

function keyDown(e) {
    switch (e.key) {
        case "ArrowLeft":
            holdLeft = true;
            break;
        case "ArrowRight":
            holdRight = true;
            break;
    }
}

function keyUp(e) {
    switch (e.key) {
        case "ArrowLeft":
            holdLeft = false;
            break;
        case "ArrowRight":
            holdRight = false;
            break;
    }
}

function init() {
    canv = document.getElementById("canv");
    ctx = canv.getContext("2d");

    player = {
        x: canv.width / 2 - 25,
        y: canv.height - 50,
        w: 50,
        h: 20,
        xv: 0
    };

    foes = [];
    holdLeft = holdRight = false;
    window.onkeydown = keyDown;
    window.onkeyup = keyUp;
    clearInterval(updateTimer);
    updateTimer = setInterval(update, 1000/60);
}

init();