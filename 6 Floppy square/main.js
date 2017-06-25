// in memory and dedicated to my dear floppy

var canv;
var ctx;
var pipeUpper;
var pipeLower;
var pNo;
var gsf;
var pW;
var gapS;
var player;
var fLock;
var fLocked;
var fLockCt;
var grav;
var score;

function update() {

    fLock = 30;
    grav = 6;
    score++;
    for (let i = 0; i < pNo; i++){
        let pU = pipeUpper[i];
        let pL = pipeLower[i];

        if (i === 1  && player.x < pU.x + pU.w){
            console.log(pU);
        }


        if (player.x < pU.x + pU.w
            && player.x + player.w > pU.x
            && player.y < pU.y + pU.h
            && player.y + player.h > pU.y){
            reset();
        }

        if (player.x + player.w > pL.x
            && player.x < pL.x + pL.w
            && player.y < pL.y + pL.h
            && player.y + player.h > pL.y){
            reset();
        }

        pU.x += pU.xv;
        pL.x += pL.xv;

        if (pU.x + pW < 0){
            pipeUpper.splice(i, 1);
            pipeLower.splice(i, 1);
            genPipe(1);
        }

        if (player.y > canv.height || player.y < 0) {
            reset();
        }

    }

    if (fLocked && fLockCt > fLock){
        console.log("unlocked");
        player.yv = 0;
        fLocked = false;
        fLockCt = 0;
    }

    if (fLocked){
        console.log(player.y);
        player.yv *= 0.98
        player.y += player.yv;
        fLockCt++;
    } else {
        player.y += grav;
    }

    draw();

    window.requestAnimationFrame(update);
}

function reset() {
    score = 0;
    plR = 20
    player = {
        x: plR * 5,
        y: canv.height / 2,
        w: plR,
        h: plR,
        yv: 0
    };

    pNo = 5
    pipeUpper = [];
    pipeLower = [];
    gsf = (canv.width / pNo)
    pW = 30

    for (let i = 0; i < pNo; i++){
        genPipe(i);
    }

}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.w, player.h);
    ctx.font = "20pt Arial";
    ctx.fillText("Score: " + score, 20, 50);

    for (let i = 0; i < pNo; i++){
        let pU = pipeUpper[i];
        let pL = pipeLower[i];

        ctx.fillStyle = "green";
        ctx.fillRect(pU.x, pU.y, pW, pU.h);
        ctx.fillRect(pL.x, pL.y, pW, pL.h);
    }
}

function genPipe(i) {
    fLocked = false;
    fLockCt = 0;
    gapS = Math.random() * 100 + 150;

    let h = (canv.height / 2) - (Math.random() * 150 + 20);
    pipe = {
        x: canv.width - gsf + (i * gsf),
        y: 0,
        xv: -2,
        w: pW,
        h: h
    };
    pipeUpper.push(pipe);

    h = canv.height - h - gapS;
    pipe = {
        x: canv.width - gsf + (i * gsf),
        y: canv.height - h,
        xv: -2,
        w: pW,
        h: h
    }
    pipeLower.push(pipe);
}

function keyDown(e) {

    switch (e.keyCode) {
        case 32:
            e.preventDefault()
            if (!fLocked){
                fLocked = true;
                player.yv = -5;
            }
            break;
        default:

    }
}

function init() {
    canv = document.querySelector("#canv");
    ctx = canv.getContext("2d");
    plR = 20
    player = {
        x: plR * 5,
        y: canv.height / 2,
        w: plR,
        h: plR,
        yv: 0
    };

    pNo = 5
    score = 0;
    pipeUpper = [];
    pipeLower = [];
    gsf = (canv.width / pNo)
    pW = 30

    for (let i = 0; i < pNo; i++){
        genPipe(i);
    }

    document.onkeydown = keyDown;

    window.requestAnimationFrame(update);
}

document.onload = init();
