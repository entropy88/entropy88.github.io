
let input=document.getElementById('userInput');
let outputDiv=document.getElementById('captureThis');

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
}