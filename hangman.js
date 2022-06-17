//the name
let sithMaster = '';
let hiddenName = '';
let hiddenNameArray = [];



var playBtn = document.getElementById('play');
var playAgainBtn=document.getElementById('playAgain');
var resultGif=document.getElementById('resultGif');

playAgainBtn.addEventListener('click',reset)
var sithName = document.getElementById('masterName');

//all the letter buttons

let letterButtonsElements = document.getElementsByClassName('letterButton');
let letterButtons = Array.from(letterButtonsElements);


//attach event listeners to all of them
letterButtons.forEach(letterButton => letterButton.addEventListener('click', function (e) {
    registerGuessess(e);
}))



playBtn.addEventListener('click', function () {
    let name = getRandomMaster();
    displayHiddenName();
    playBtn.style.display='none';
})

let guesses = [];


let sith_masters = [
    "Adas", "Amanoa", "Darth Andeddu", "Darth Andru", "Darth Angral", "Ardran", "YuthuraBan",
    "Darth Bane", "Darth Baras", "Beldiss", "Borthis", "Darth Caedus", "Darth Caldoth", "Calypho",
    "Darth Chratis", "Darth Cognus","Tari Darkspanner", "Darth Decimus","Ako Domi"," Darth Gean",
    "Githany", "Darth Gorgos", "Grathan", "Dathka Graush", "Darth Gravid","Darth Guile","Darth Hadra",
"Hezzoran", "Darth Howl", "Xat Hracken", "Darth Ikoral", "Darth Jadus","Skere Kaan","Kas'im","Kherus",
"Kopecz", "Korek","Darth Krayt","Kreia","Ludo Kressh","Kaox Krul","Exar Kun","Lumiya","Darth Malak",
"Darth Malgus","Darth Marr","Maul","Darth Mortis","Ruku Myal"]



//get random master

function getRandomMaster() {
    let min = 0;
    let max = sith_masters.length;
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomMasterIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    let randomMaster = sith_masters[randomMasterIndex].toLowerCase()
    console.log(randomMaster);
    sithMaster = randomMaster; //The maximum is inclusive and the minimum is inclusive 
}


//diplay hidden name

function displayHiddenName() {
    let secretNameArray = sithMaster.split('');
    console.log(secretNameArray);

    secretNameArray.forEach(letter => {
        if (letter !== " ") {
            hiddenNameArray.push("#");
        } else {
            hiddenNameArray.push(letter);
        }
    });
    hiddenName = hiddenNameArray.join("");
    sithName.textContent = hiddenName;
}

//register guesses
function registerGuessess(e) {
    let guess = e.target.dataset.letter;
    let sithMasterArray = sithMaster.split("");
    if (sithMasterArray.includes(guess)) {


        for (let i = 0; i < sithMasterArray.length; i++) {
            if (sithMasterArray[i] === (guess)) {
                hiddenNameArray[i] = guess;
                hiddenName = hiddenNameArray.join("");
            }
        }

        e.target.classList.add("rigthGuess");
        e.target.disabled = "true";
        updateName();

    } else {
        guesses.push(guess);
        //disable button
        e.target.disabled = "true";
        e.target.classList.add("wrongGuess");
        console.log(guesses);
        if (guesses.length > 5) {
            resultGif.src='https://dorksideoftheforce.com/files/2016/11/Vader-R1-Japan-Trailer.gif';
            sithName.textContent = sithMaster;
            playAgainBtn.style.display='block';
            playBtn.style.display='none';
        }
    }

}

function updateName() {
    sithName.textContent = hiddenName;
    if (sithMaster === hiddenName) {
  //DISPLAY MEME  
        resultGif.src="https://thumbs.gfycat.com/AltruisticTightGhostshrimp.webp";
        playAgainBtn.style.display="block";
    }
}

function reset() {    

    hiddenNameArray = [];

    //empty guesses
    guesses = [];

    //reset buttons
    for (let i=0; i<letterButtons.length;i++){
        letterButtons[i].disabled=false;
        letterButtons[i].style.backgroundColor='white';
    }

    getRandomMaster();
    displayHiddenName();
    playBtn.style.display='none';
    playAgainBtn.style.display='none';
    resultGif.src="";

}