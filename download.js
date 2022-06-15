
let input=document.getElementById('userInput');
let outputDiv=document.getElementById('captureThis');
let downloadBtn=document.getElementById('downloadBtn');
let resetBtn=document.getElementById('resetBtn');

function downloadImage(data, filename = 'untitled.jpeg') {
    console.log('hello?')
    console.log(data)
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}

function reset(){
    console.log('reset this');
    input.value='';
    outputDiv.textContent='';
    downloadBtn.style.display='none';
    resetBtn.style.display='none';
}