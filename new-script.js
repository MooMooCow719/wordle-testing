// DOM elements
const slider = document.getElementById("wordLengthSlider");
const output = document.getElementById("slider-val");
const button1 = document.getElementById("fifteen");
const button2 = document.getElementById("twenty");
const button3 = document.getElementById("ng");
const modeToggle = document.getElementById('mode-toggle');
const bgm = document.getElementById("bgm");
const muteButton = document.getElementById("mute");

// Initial values
let wordLength = parseInt(slider.value);
let rightGuessString = '';
const NUMBER_OF_GUESSES_DEFAULT = 6;
let NUMBER_OF_GUESSES = NUMBER_OF_GUESSES_DEFAULT;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let interactions = 0;

// Event listeners
document.addEventListener('click', startBGM);
document.addEventListener('keypress', startBGM);

slider.oninput = function () {
    wordLength = parseInt(this.value);
    output.innerHTML = wordLength;
    resetGameSettings();
    initializeGame();
};

function startBGM() {
    if (interactions === 0) {
        setBGM();
    }
    interactions++;
}

function setBGM() {
    bgm.src = "calmbgm.mp3";
}

muteButton.onclick = function () {
    bgm.muted = !bgm.muted;
    muteButton.src = bgm.muted ? "no-sound.png" : "sound.png";
}

button1.onclick = function () {
    setGameSettings(15, 9);
    initializeGame();
}

button2.onclick = function () {
    setGameSettings(20, 12);
    triggerAnimations();
    document.documentElement.setAttribute('evilness', 'evil');
    bgm.src = "evilbgm.mp3";
    initializeGame();
    alert("Evil mode activated!");
}

button3.onclick = function () {
    if (wordLength < 11) {
        setGameSettings(wordLength, 6);
    } else if (wordLength < 20) {
        setGameSettings(wordLength, 9);
    } else {
        window.location.reload();
    }
    resetGameSettings();
    initializeGame();
}

function setGameSettings(length, guesses) {
    wordLength = length;
    output.innerHTML = wordLength;
    NUMBER_OF_GUESSES = guesses;
    guessesRemaining = guesses;
    resetGameSettings();
}

function resetGameSettings() {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        elem.style.backgroundColor = "grey";
    }
    currentGuess = [];
    nextLetter = 0;
}

function triggerAnimations() {
    slider.classList.add('shake');
    button1.classList.add('shake');
    modeToggle.classList.add('shake');

    setTimeout(function () {
        slider.classList.remove('shake');
        button1.classList.remove('shake');
        modeToggle.classList.remove('shake');
        slider.classList.add('fall');
        button1.classList.add('fall');
        modeToggle.classList.add('fall');
    }, 2000);
}

import { okWORDS } from "./okwords.js";
let WORDS;

async function initializeGame() {
    let modulePath = getModulePath(wordLength);

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

function getModulePath(length) {
    switch (length) {
        case 5: return './5words.js';
        case 6: return './6words.js';
        case 7: return './7words.js';
        case 8: return './8words.js';
        case 9: return './9words.js';
        case 10: return './10words.js';
        case 15: return './15words.js';
        case 20: return './20words.js';
        default:
            console.error('Unsupported word length');
            return '';
    }
}

function initBoard() {
    let board = document.getElementById("game-board");
    board.innerHTML = '';

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
            if (oldColor === "green") return;
            if (oldColor === "yellow" && color !== "green") return;
            elem.style.backgroundColor = color;
            break;
        }
    }
}

function insertLetter(pressedKey) {
    if (nextLetter >= wordLength) return;

    pressedKey = pressedKey.toLowerCase();
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    if (!row) return;

    let box = row.children[nextLetter];
    if (!box) return;

    animateCSS(box, "pulse").catch(console.error);
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    nextLetter += 1;
}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    if (!row) return;

    let box = row.children[nextLetter - 1];
    if (!box) return;

    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
}

async function checkGuess() {
    if (!rightGuessString) return;

    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    let guessString = currentGuess.join('');
    let rightGuess = Array.from(rightGuessString);

    if (guessString.length < wordLength) {
        toastr.error("Not enough letters!");
        return;
    }

    if (!okWORDS.includes(guessString) && !WORDS.includes(guessString)) {
        toastr.error("Word not in list!");
        return;
    }

    let letterColor = Array(wordLength).fill("gray");

    for (let i = 0; i < wordLength; i++) {
        if (rightGuess[i] === currentGuess[i]) {
            letterColor[i] = "green";
            rightGuess[i] = "#";
        }
    }

    for (let i = 0; i < wordLength; i++) {
        if (letterColor[i] === "green") continue;
        for (let j = 0; j < wordLength; j++) {
            if (rightGuess[j] === currentGuess[i]) {
                letterColor[i] = "yellow";
                rightGuess[j] = "#";
            }
        }
    }

    for (let i = 0; i < wordLength; i++) {
        let box = row.children[i];
        if (!box) return;

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
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            toastr.error("You've run out of guesses! Game over!");
            toastr.info(`The right word was: ${rightGuessString}`);
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
    if (guessesRemaining === 0) return;

    let pressedKey = e.key;
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter();
        return;
    }

    if (pressedKey === "Enter") {
        checkGuess();
        return;
    }

    if (/^[a-zA-Z]$/.test(pressedKey)) {
        insertLetter(pressedKey);
    }
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("keyboard-button")) {
        let key = target.textContent;
        if (key === "Backspace") {
            deleteLetter();
        } else if (key === "Enter") {
            checkGuess();
        } else {
            insertLetter(key);
        }
    }
});
