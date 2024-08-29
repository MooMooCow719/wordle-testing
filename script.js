// DOM elements
const slider = document.getElementById("wordLengthSlider");
const output = document.getElementById("slider-val");

// Initial word length
let wordLength = parseInt(slider.value);
output.innerHTML = wordLength;

// Event listener for slider input
slider.oninput = function () {
    if (parseInt(this.value) === 11) {
        this.value = 15;
    }
    wordLength = parseInt(this.value);
    output.innerHTML = wordLength;
    initializeGame();
};

// Initialize the game based on the current word length
async function initializeGame() {
    let modulePath = getModulePath(wordLength);
    if (modulePath) {
        try {
            const module = await import(modulePath);
            const { WORDS } = module;
            rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
            console.log('Right guess string:', rightGuessString);
        } catch (error) {
            console.error('Error loading words module:', error);
        }
    } else {
        console.error('Unsupported word length');
    }
    initBoard();
}

// Get the module path based on word length
function getModulePath(length) {
    switch (length) {
        case 5: return './5words.js';
        case 6: return './6words.js';
        case 7: return './7words.js';
        case 8: return './8words.js';
        case 9: return './9words.js';
        case 10: return './10words.js';
        case 15: return './15words.js';
        default: return '';
    }
}

// Initialize game board
function initBoard() {
    const board = document.getElementById("game-board");
    board.innerHTML = '';

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        const row = document.createElement("div");
        row.className = "letter-row";

        for (let j = 0; j < wordLength; j++) {
            const box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box);
        }

        board.appendChild(row);
    }
}

// Handle keyboard shading
function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            const oldColor = elem.style.backgroundColor;
            if (oldColor === "green" || (oldColor === "yellow" && color !== "green")) {
                return;
            }
            elem.style.backgroundColor = color;
            break;
        }
    }
}

// Insert a letter into the current guess
function insertLetter(pressedKey) {
    if (nextLetter >= wordLength) return;

    pressedKey = pressedKey.toLowerCase();
    const row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    if (!row) return;

    const box = row.children[nextLetter];
    if (!box) return;

    animateCSS(box, "pulse").catch(console.error);
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    nextLetter += 1;
}

// Delete the last letter from the current guess
function deleteLetter() {
    const row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    if (!row) return;

    const box = row.children[nextLetter - 1];
    if (!box) return;

    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
}

// Check the current guess against the right guess
async function checkGuess() {
    if (!rightGuessString) return;

    const row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    const guessString = currentGuess.join('');
    const rightGuess = Array.from(rightGuessString);

    if (guessString.length !== wordLength) {
        toastr.error("Not enough letters!");
        return;
    }

    if (!WORDS.includes(guessString)) {
        toastr.error("Word not in list!");
        return;
    }

    const letterColor = Array(wordLength).fill("gray");

    // Check for correct letters
    for (let i = 0; i < wordLength; i++) {
        if (rightGuess[i] === currentGuess[i]) {
            letterColor[i] = "green";
            rightGuess[i] = "#";
        }
    }

    // Check for correct letters in wrong positions
    for (let i = 0; i < wordLength; i++) {
        if (letterColor[i] === "green") continue;
        for (let j = 0; j < wordLength; j++) {
            if (rightGuess[j] === currentGuess[i]) {
                letterColor[i] = "yellow";
                rightGuess[j] = "#";
            }
        }
    }

    // Update the board with the result
    for (let i = 0; i < wordLength; i++) {
        const box = row.children[i];
        const delay = 250 * i;
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
            toastr.info(`The right word was: "${rightGuessString}"`);
        }
    }
}

// Function for animating CSS elements
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

// Keyboard event handling
document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) return;

    const pressedKey = e.key;
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

// Keyboard button click handling
document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("keyboard-button")) {
        let key = target.textContent;
        if (key === "Del") key = "Backspace";
        document.dispatchEvent(new KeyboardEvent("keyup", { key }));
    }
});

// Initialize the board on page load
window.onload = initBoard;
