
// https://www.youtube.com/watch?v=YoVJWZrS2WU

const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";


var aurebeshOutput=document.getElementById("aurebeshOutput");

var btn = document.getElementById('btn');
var download = document.getElementById('download');
var reset=document.getElementById('reset');
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

//display
btn.addEventListener('click', function () {
    let userInput = input.value;
    console.log(userInput);


    //print text
    ctx.font = "20px myFont"; // set font
    ctx.shadowColor = 'rgb(240,248,255)';
    ctx.shadowBlur = 15;
    
    //center text
    const x = canvas.width / 2;
    const y=canvas.height/2;
    ctx.textAlign = 'center';
    ctx.fillText(userInput, x, y);

    //fill p
    aurebeshOutput.textContent=userInput;
   


    // const bck= new Image();
    // bck.src = "destroyer.jpg";
    // bck.onload = () => {  ctx.drawImage(img, 0, 0)}

    const dataURI = canvas.toDataURL("image/jpeg");

    // output.src = dataURI;


})

//reset canvas
reset.addEventListener('click', function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    aurebeshOutput.textContent='';
    input.value='';
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
