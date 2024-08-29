document.addEventListener('DOMContentLoaded', function() {
  const modeSwitch = document.querySelector('#mode-slider');
  const body = document.querySelector('body');
  const evilModeButton = document.querySelector('#evil-mode-button');
  const muteButton = document.querySelector('#mute');
  const newGameButton = document.querySelector('#ng');
  const keyboardButtons = document.querySelectorAll('.keyboard-button');
  const gameBoard = document.querySelector('#game-board');
  
  let isMuted = false;
  let currentRow = 0;
  const maxRows = 6;
  const maxLettersPerRow = 5;
  let currentWord = '';
  const correctWord = 'APPLE';

  function toggleMode() {
    if (modeSwitch.checked) {
      body.setAttribute('mode', 'light');
    } else {
      body.setAttribute('mode', 'dark');
    }
  }

  function toggleEvilMode() {
    if (body.getAttribute('evilness') === 'evil') {
      body.removeAttribute('evilness');
    } else {
      body.setAttribute('evilness', 'evil');
    }
  }

  function toggleMute() {
    isMuted = !isMuted;
    muteButton.setAttribute('data-muted', isMuted);
    console.log(isMuted ? 'Muted' : 'Unmuted');
  }

  function startNewGame() {
    resetGameBoard();
    currentRow = 0;
    currentWord = '';
  }

  function resetGameBoard() {
    const letterBoxes = document.querySelectorAll('.letter-box');
    letterBoxes.forEach(box => {
      box.textContent = '';
      box.classList.remove('filled-box');
    });
  }

  function handleKeyboardInput(event) {
    if (event.target.classList.contains('keyboard-button')) {
      const letter = event.target.textContent.toUpperCase();
      if (currentWord.length < maxLettersPerRow) {
        currentWord += letter;
        updateGameBoard(letter);
      }
    }
  }

  function updateGameBoard(letter) {
    const currentRowElements = gameBoard.querySelectorAll(`.letter-row:nth-child(${currentRow + 1}) .letter-box`);
    const emptyBox = Array.from(currentRowElements).find(box => !box.textContent);
    if (emptyBox) {
      emptyBox.textContent = letter;
      if (currentWord.length === maxLettersPerRow) {
        checkWord();
      }
    }
  }

  function checkWord() {
    if (currentWord === correctWord) {
      alert('Congratulations! You guessed the correct word!');
    } else {
      currentRow++;
      currentWord = '';
      if (currentRow >= maxRows) {
        alert('Game over! The correct word was: ' + correctWord);
      } else {
        alert('Incorrect guess, try again!');
      }
    }
  }

  function triggerAnimation(element, animationClass) {
    element.classList.add(animationClass);
    element.addEventListener('animationend', () => {
      element.classList.remove(animationClass);
    }, { once: true });
  }

  modeSwitch.addEventListener('change', toggleMode);
  evilModeButton.addEventListener('click', toggleEvilMode);
  muteButton.addEventListener('click', toggleMute);
  newGameButton.addEventListener('click', startNewGame);
  keyboardButtons.forEach(button => {
    button.addEventListener('click', handleKeyboardInput);
  });
});
