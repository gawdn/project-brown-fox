/** Inspired by Daniel Shiffman's brightness mirror
* https://github.com/CodingTrain/Rainbow-Code/tree/master/Tutorials/P5JS/p5.js_video/10.4_p5.js_brightness_mirror
* Shiffman, D 2016, 10.4: Brightness Mirror - p5.js Tutorial, https://www.youtube.com/watch?v=rNqaw8LT2ZU
*
* author: Gordon Zhong
* date: 2017-06-24
*
**/

var vidcanv;
var vctx;
var vEle;
var sf;

function map(v, x1, x2, y1, y2) {
    return y1 + ((y2 - y1) / (x2 - x1)) * (v - x1)
}

function update() {
    sf = slider.value;
    slbl.innerHTML = "Scale factor: " + sf;
    vidcanv.height = canv.height / sf;
    vidcanv.width = canv.width / sf;
    vEle.height = vidcanv;
    vEle.width = vidcanv;

    vctx.drawImage(vEle, 0, 0, vidcanv.width, vidcanv.height);
    frame = vctx.getImageData(0, 0, vidcanv.width, vidcanv.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    for (i = 0; i < frame.data.length/4; i++){
        r = frame.data[i * 4]
        g = frame.data[i * 4 + 1]
        b = frame.data[i * 4 + 2]

        l = (r+g+b)/3

        w = map(l, 0, 255, 1, sf);

        ctx.fillStyle = "white";

        y = Math.floor((i)/vidcanv.width) * sf
        x = i % vidcanv.width * sf
        ctx.fillRect(x, y, w, w);

    }

    window.requestAnimationFrame(update);
}
function capVid(mediaStream) {
    vEle = document.querySelector('video');
    vEle.height = vidcanv;
    vEle.width = vidcanv;
    vEle.srcObject = mediaStream;
    vEle.onloadedmetadata = function (e) {
        vEle.play();
    };
    window.requestAnimationFrame(update);
}

function pError(e) {
    console.log(e)
}

function init() {
    slider = document.getElementById("sf");
    slbl = document.querySelector("label")
    sf = slider.value;

    canv = document.getElementById("canv");
    ctx = canv.getContext("2d");

    vidcanv = document.getElementById("vidcanv");
    vidcanv.height = canv.height / sf;
    vidcanv.width = canv.width / sf;
    vctx = vidcanv.getContext("2d");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true}).then(capVid).catch(pError)
    }
}

document.onload = init();