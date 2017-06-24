// you wouldn't believe your eyes if 203 fireflies
// needed 1 hour to simulate

var fireflyCount;
var fireflies;
var fps;

function Firefly() {
    this.x = Math.random() * canv.width
    this.y = Math.random() * canv.height
    this.xv = Math.random() * 9 - 4
    this.yv = Math.random() * 9 - 4
    this.px = this.x
    this.py = this.y
    this.w = 4
    this.h = 4
    this.theta = 0;

    this.isOn = true;

    this.offTime = Math.random() * 4000 + 1000;

}


Firefly.prototype.move = function() {

    this.px = this.x
    this.py = this.y

    if (this.x > canv.width && this.xv > 0 || this.x < 0 && this.xv < 0) {
        this.xv *= -(Math.random() * 1.01);
    }

    if (this.y > canv.height && this.yv > 0 || this.y < 0 && this.yv < 0){
        this.yv *= -(Math.random() * 1.01);
    }

    this.x += this.xv;
    this.y += this.yv;

}

Firefly.prototype.draw = function(drawOff) {

    ctx.beginPath();

    ctx.fillStyle = "#7f752c";

    ctx.ellipse(this.px, this.py, this.w * 0.8, this.h * 0.8, this.theta, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    if (drawOff) {
        ctx.fillStyle = "#7f752c";
    } else {
        ctx.fillStyle = "#ffdf0b";
    }
    ctx.ellipse(this.x, this.y, this.w, this.h, this.theta, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

}

function update() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canv.width, canv.height);

    for (i = 0; i < fireflyCount; i++){
        firefly = fireflies[i];
        firefly.move();

        if (Math.random() < 0.1 && !firefly.isOn){
            firefly.isOn = true;
            firefly.xv *= 1.6
        }

        if (Math.random() < 0.01 && firefly.isOn) {
            firefly.isOn = false;
            firefly.xv *= 0.7
        }

        if (firefly.isOn) {
            firefly.draw(false);
        } else {
            firefly.draw(true);
        }
    }
    window.requestAnimationFrame(update);
}

function init() {
    canv = document.getElementById("canv");
    ctx = canv.getContext("2d");

    fireflyCount = 203;
    fireflies = [];


    for (i = 0; i < fireflyCount; i++){
        firefly = new Firefly();
        fireflies.push(firefly);
    }

    window.requestAnimationFrame(update);
}

init();
