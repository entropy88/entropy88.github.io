
// https://www.youtube.com/watch?v=YoVJWZrS2WU

const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";




var btn = document.getElementById('btn');
var download = document.getElementById('download');
var input = document.getElementById('input');
console.log(input)

var output = document.getElementById('output');

//custom font stuff
var myFont = new FontFace('myFont', 'url(Aurebesh.ttf)');

myFont.load().then(function (font) {

    // with canvas, if this is ommited won't work
    document.fonts.add(font);
    console.log('Font loaded');

});


btn.addEventListener('click', function () {


    let userInput = input.value;
    console.log(userInput);

    ctx.font = "50px myFont"; // set font
    ctx.shadowColor = 'rgb(240,248,255)';
    ctx.shadowBlur = 15;
    ctx.fillText(userInput, 80, 80);


    // const bck= new Image();
    // bck.src = "destroyer.jpg";
    // bck.onload = () => {  ctx.drawImage(img, 0, 0)}

    const dataURI = canvas.toDataURL("image/jpeg");

    output.src = dataURI;


})

download.addEventListener('click', function () {
    //ie, edge
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.toBlob(), "canvas-image.png");
    } else {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = canvas.toDataURL("image/jpeg");
        a.download = "canvas-image.jpg";
        a.click();
        document.body.removeChild(a);
    }
})
