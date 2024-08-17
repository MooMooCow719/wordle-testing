const slider = document.getElementById("wordLengthSlider");
const output = document.getElementById("slider-val");
const button1 = document.getElementById("fifteen");
const button2 = document.getElementById("twenty");

document.getElementById('mode-toggle').addEventListener('change', function() {
    const currentMode = document.documentElement.getAttribute('mode');
    if (currentMode === 'light') {
        document.documentElement.removeAttribute('mode');
    } else {
        document.documentElement.setAttribute('mode', 'light');
    }
});

let wordLength = slider.value;
let rightGuessString = '';
let NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;

slider.oninput = function() {    
    wordLength = this.value;
    output.innerHTML = wordLength;
    NUMBER_OF_GUESSES = 6;
    guessesRemaining = 6;
    initializeGame();
    //initBoard();

};

button1.onclick = function(){
    wordLength = 15;
    output.innerHTML = wordLength;
    NUMBER_OF_GUESSES = 9;
    guessesRemaining = 9;
    initializeGame();
    //initBoard();

}

button2.onclick = function(){
    wordLength = 20;
    output.innerHTML = wordLength;
    NUMBER_OF_GUESSES = 12;
    guessesRemaining = 12;
    initializeGame();
    //initBoard();
 





    alert("a̴̧̧̨̧̡̧̰͈̬̼̥̫̭͎͇̺̤̩̯͔̪̞̺͑͆̅̉̍̂̽͐̇͐̓͆̽͗̀̃̀̎̾̌̽̋͊̑͜͜͝͝b̶̧̦̪͔̳̞̦̞̮̠̥͔͈̗̤̝̗͍̟̱͕͎̦̝̦̥̤̱͙̱̰̦͑̏̏̽̓̀͂̀̓̅̒̅͒̈̏͑͘̚̚͝ͅå̴̢͈̲̘̩̱͍̥̹̣͉͙̩̫̜̙̦̟̬̘̖̮̙̹̞̳̥̱̤̼̭͎͊̏͌͌̈́̍̈́̇̒̿̀̋͊̓̈͒͘͘̚͜͠n̵̢̗̜̠̥̞̈́̄̐́͋̂͠͝͝d̴̨̛̞̗̟̩͙̤̤̑̐̀̍̂̂̈́̿͌̑͆̏̆̊͋̾͘͝ở̶̧̟͇̯͇̥̰̜̟͈̈́̂͛̌͂́̂̾̏͌̄̑͘ǹ̷̡̠̘͚̠̙̣͔̝͍̞̞̟̙̪̠̟̳̩̏̔͛̍̏̎͂̑́̌͑́́͒̇͆̋̅̕͠͠ͅͅ ̴̡̧̢̡̢̡̡͙̯͖̺̠̬̣͎͇̦̖͙̖̰͍̙̥̦͎̝̹͇̪̳̳̳̣̱͇̫͎̺̪̹̬͕̾̂͊̐͗̑̆̀̎͒̓̓̅͋͘͝͝ͅͅa̶̧̛͍̳̫̱͓̗͕̘̱̟͉̺͍̗͈͚͇̭̮̦͉̝̜̥̰̤͔̭̳͎̿̿̾͌̏͛͛̆̾̏́̈́̈́̌̀̓̊̄̆̀̓̔̂̀̃̾͂̎́̑̍̐̈́̔̉̇̎̅͆̓̓͐̿̄̽͐̚͜͝͠ͅl̶̡̨̧̡̢̧̫͍̰̺̹͔͎͖͙̘͎̫̮̟̟̭̦̪͙̠͖̞̞͕̰͙͖̤̬͔̰͔̩̮̲̈́̎̅̔̐́̏̄̔̆͛͛̊̒̽͛̽̒̽̀͘̚l̷̨̧̛̯̤̮̼̻̖͔͉͕̟̯͍̻̱̘̟̙̳̘̪̠̦̖͇͍͎̉̊͒̍̂̚͜͝͠ͅ ̸̢̢̡̡̨̛̞̦̠̠̹̟̺̘͎͈̳̞̞͕͈̻̳̯̖̲̗̪̯̠̩̪̬̭̓̾̌̍̅͌͆̐̔̿̈́̀̏̈́̎̿͋͑͛̐͑͑̐̔̈̀͗͐̽̀̊̍̋̽̎̏̈̎̓̎̆̄͆̑́̚͜͠͝h̷̡͉̩̳̜̹͈̦̘͔͉̟̠̺̩̼͈̞̹͔͚̮̤͓͗̓̾̈́͌̐̓́̑̈̌̍͂̈́̊̍̇̅͆̎͒̃̿̌̉͌͌͆́̉̔̾͊͊͑̒̚͘̚̕͜͜͠͝͝͝ȍ̵͖̼͙̮̞̼̘͓͖̜͖͚̥͍͔̣̪͈̪̻̇̽̀̎̈́̂̈̇͆̇̉̓̒̋́̾́̔̔̾ͅp̶̡̢̣̥̣̦͎̻̣̗̗̼̭̦̦̠̮͕͓̟͕͙̠̩̠̰̦̣̈̍ͅë̸͉̙̗͔̼̣̙̍̌̐̆͘ ̴̢̢̢̧̛͈̮̰͉̦̩̖͎̼̼̰͔͖̹̙̯̪͇͉̫͈̉̾͌͆̇͂̊̽̀̂̈̔̌̓̃̀͑̑̍́̈́̃̊̅̐̓̀̐͠͝͠y̴̢̢̡̛̛̻̮̩̙̘̹͓͎̥̬̞̘̯̟͈͍̞̋͗̀̅̑̏̓̂̎̉̂̋̋̄͑̊́̉̆͋̈̾́̈́͝͝͝ͅḛ̵̛̓̃̇͌͑͛͛͐̍͋̐̌͑̓̅̈́̽̅̿̈́͂͌͆̈̊́̈́͘͘̚͝ ̷̭̤͔̳̳̰̮͔̹̗͋̐̽̅̿̉̏̑̄̊̈́̐́̽͛̆́̒̈̈̚̕ͅw̶̯͍̫̉̉̐͊͒͐́̋̆͌̐̔͋̐͋͗̀̅͆́̊̿̈́̇̆̂̊̓͘̚͠͝͝h̴̡̛̞̖̲͕͓̳͚̲͔̗̲͓͔̺̘͓́̎͌̎̀̈́̄͑̀̄͊͛̅̊̐͆͂̆̆̿̆̃͒̋̈́͋̏͘̕̕͜͠͠͠o̴̧̝̯̱͖͙͌̈͗̓̈̀́̏̇̉̀͋̏͑̒͂͊̅́̐̊̓͋̑͋̈́̔̈́̌͆͗̂̆͆̆̊̎̈́͘̚̕͘͝͝͝͝͝ ̴̢̨̛̛͕̮̣͖͍͓̠̘͓̳̮͍̪̤̇͐͒̒͋͂́̊̌̈́̎̊̍̌̍̎̐̔̾͋̔̍̀̓̍̌̾͂̊̎̅̓́̆͆̓̀̒͘̕̕͝͠͠e̷̡̧̨̜̤̦̘̝͙̹̺̩̟̲̠̾̀̾͛̽̓̂͋̉̋́̿̂̇̀́̓͂̎͘ñ̸̢̥͍̼̭̺̦̰̪͈̀̽̄̀̒̎̂͘͜ͅţ̶̡̥̯̝̬̝̰̦̫̱̟̭͙̪̱̝̓̀̈́̅̒̓͊̋̀͆͑̀̋̄͒̀̽̍̋͊̋͒̅̀̏͗͗͋͗͘̚̚̚͝ę̸̨̨̘̫̟̠̪̝͖͔͍͇̘͔̤̯̯̠͙̰̱̬̥̘͓̼̻̟̮̦͕͉̫̈́̒̉̊͌̏̊̑͋̄̓͐̃̂̃̑͒͒́̉͊̚͘̕̕͝ͅͅȑ̶̨̨̧̻̠̭͖͔̺̟̗͔͔̦͖͇̲̣̘̝̫̠̟͔̜̩̦̲͖͉̪̪͔̭̫̟̜͍̦̫̲̎͒̊͒̂̊̄͜ͅͅ ̷̢̧̡̢̧̛͎͚̖̣͕̪̯̲̯̲͖̭͉̝̠̳͇͍̺̠̞͚͓̥̖͕͖̱͖͉̖̠͙͙̙̝͚͎̹͍̻̮̐̓͆̓̃̂̽̂̓̏̈́͆̎̐͂̄̇͒͒̒̈́̇͌̎̌̚̕͜͝͝h̴̡̡̢̞̞̦̱̭̲̗̣̰̬̰̳̘̥͕̝̦͕͉͖̺̜̪͕͍̤̗͖̻̖̥̲̤̳̪͓̙̟͖̜͓̱͖̫̫̏̒̾͆̇͐͒̎͂͐̕͝ḙ̵̛̲̬̭͉͙̖̱̉̈̆̾̄̎̊̓͐͑̈͌͌̄̆̏͂̋̐̎̈́̈̂͆̌͘͘͜ͅr̴͓̗͎͔̣̙̥̱̪̥̹͍͚̠̦͙͚̿͌̊͒̀͆̿̅̌̓͘͘͝͝ͅe̴̡̨̨̧̛̛̖̘͔̟̩̤̬͚͓̹͈͚̖͈̳͔̣̠̱̘͎̙͕̟̩̻̫͍̫͈͚͍̜̬̟̼̬̥̻̾͊̽̈́̊̀̄͌̈́͌̎̉́̆̎͌̈̓͒̏̈́̄͋́̀̀͌̆͆̓͐̈́̀̍͋̽̅̍̓͒̋͗͊̕͜͜͠͠͝");





}

import { okWORDS } from "./okwords.js";

let WORDS;

output.innerHTML = wordLength;

async function initializeGame() {
    let modulePath = '';

    switch (wordLength) {
        case '5':
            modulePath = './5words.js';
            break;
        case '6':
            modulePath = './6words.js';
            break;
        case '7':
            modulePath = './7words.js';
            break;
        case '8':
            modulePath = './8words.js';
            break;
        case '9':
            modulePath = './9words.js';
            break;
        case '10':
            modulePath = './10words.js';
            break;
        case '15':
            modulePath = './15words.js';
            break;
        case '20':
            modulePath = './20words.js';
            break;
        default:
            console.error('Unsupported word length');
            return;
    }

    try {
        const module = await import(modulePath);
        ({ WORDS } = module);
        rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
        console.log('Right guess string:', rightGuessString);
        initBoard();
    } catch (error) {
        console.error('Error loading words module:', error);
    }
}

function initBoard() {
    let board = document.getElementById("game-board");
    board.innerHTML = ''; // Clear previous board if any

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div");
        row.className = "letter-row";

        for (let j = 0; j < wordLength; j++) {
            let box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box);
        }

        board.appendChild(row);
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor;
            if (oldColor === "green") {
                return;
            }

            if (oldColor === "yellow" && color !== "green") {
                return;
            }

            elem.style.backgroundColor = color;
            break;
        }
    }
}

function insertLetter(pressedKey) {
    if (nextLetter >= wordLength) { // Ensure we do not exceed the length
        return;
    }
    pressedKey = pressedKey.toLowerCase();

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    if (!row) {
        console.error("Row not found");
        return;
    }

    let box = row.children[nextLetter];
    if (!box) {
        console.error("Box not found");
        return;
    }

    animateCSS(box, "pulse").catch(console.error);
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    nextLetter += 1;
}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    if (!row) {
        console.error("Row not found");
        return;
    }

    let box = row.children[nextLetter - 1];
    if (!box) {
        console.error("Box not found");
        return;
    }

    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
}

async function checkGuess() {
    if (!rightGuessString) {
        console.error("rightGuessString is not set");
        return;
    }

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let guessString = currentGuess.join('');
    let rightGuess = Array.from(rightGuessString);

    if (guessString.length != wordLength) {
        toastr.error("Not enough letters!");
        return;
    }

    // Ensure WORDS is accessible in the scope
    if (!okWORDS.includes(guessString) && !WORDS.includes(guessString)) {
        toastr.error("Word not in list!");
        return;
    }

    var letterColor = Array(wordLength).fill("gray");

    // Check for green
    for (let i = 0; i < wordLength; i++) {
        if (rightGuess[i] == currentGuess[i]) {
            letterColor[i] = "green";
            rightGuess[i] = "#";
        }
    }

    // Check for yellow
    for (let i = 0; i < wordLength; i++) {
        if (letterColor[i] == "green") continue;
        for (let j = 0; j < wordLength; j++) {
            if (rightGuess[j] == currentGuess[i]) {
                letterColor[i] = "yellow";
                rightGuess[j] = "#";
            }
        }
    }

    for (let i = 0; i < wordLength; i++) {
        let box = row.children[i];
        if (!box) {
            console.error("Box not found");
            return;
        }

        let delay = 250 * i;
        setTimeout(() => {
            animateCSS(box, "flipInX").catch(console.error);
            box.style.backgroundColor = letterColor[i];
            shadeKeyBoard(guessString.charAt(i), letterColor[i]);
        }, delay);
    }

    if (guessString === rightGuessString) {
        toastr.success("You guessed right! Game over!");
        guessesRemaining = 0;
        return;
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!");
            toastr.info(`The right word was: "${rightGuessString}"`);
        }
    }
}

const animateCSS = (element, animation, prefix = "animate__") =>
    new Promise((resolve, reject) => {
        if (!element) {
            reject("Element is undefined");
            return;
        }

        const animationName = `${prefix}${animation}`;
        element.style.setProperty("--animate-duration", "0.3s");
        element.classList.add(`${prefix}animated`, animationName);

        function handleAnimationEnd(event) {
            event.stopPropagation();
            element.classList.remove(`${prefix}animated`, animationName);
            resolve("Animation ended");
        }

        element.addEventListener("animationend", handleAnimationEnd, { once: true });
    });

document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) {
        return;
    }

    let pressedKey = String(e.key);
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter();
        return;
    }

    if (pressedKey === "Enter") {
        checkGuess();
        return;
    }

    let found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
        return;
    } else {
        insertLetter(pressedKey);
    }
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target;

    if (!target.classList.contains("keyboard-button")) {
        return;
    }
    let key = target.textContent;

    if (key === "Del") {
        key = "Backspace";
    }

    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
});

// Initialize the game on page load
window.onload = () => {
    initializeGame();
};