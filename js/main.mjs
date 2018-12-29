import { 
    calculateHints, 
    fetchWords, 
    uncoverLetters, 
    isGameOver, 
    createWordPlaceholder 
} from './helpers.mjs';

// HTML elements
let wordPlaceholderContainerHTML = null;
let incorrectGuessesHTML = null;
let hangmanProgressImgHTML = null;
let hintButtonHTML = null;
let hintsLabelHTML = null;
let btnsContainerHTML = null;

// Global variables
let word = '';
let wordLength = 0;
let hintsSoFar = 0;
let numberOfHints = 0;
let lettersGuessed = [];
let numIncorrectGuesses = 0;

/**
 * Dynamically creates english alphabet letters as buttons and appends them to the DOM
 */
function createKeyboard() {
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        const btn = document.createElement('button');
        btn.id = letter;
        btn.innerHTML = letter;
        btn.classList.add('letter-btn__base', 'letter-btn__status--normal');
        btn.onclick = letterOnClickHandler;
        btnsContainerHTML.appendChild(btn);
    }
}

function letterOnClickHandler(event) {
    event.preventDefault();
    const btn = event.target;
    const letter = btn.textContent;
    btn.disabled = true;
    btn.classList.remove('letter-btn__status--normal');
    if (isGameOver(numIncorrectGuesses)) {
        // game over!
        resetGame();
    } else {
        if (word.includes(letter)) {
            // letter guessed!
            btn.classList.add('letter-btn__status--green');
            lettersGuessed.push(letter);
            uncoverLetters(word, wordPlaceholderContainerHTML.children, letter);
        } else {
            // wrong guess!
            numIncorrectGuesses++;
            setIncorrectGuess(numIncorrectGuesses);
            btn.classList.add('letter-btn__status--red');
            hangmanProgressImgHTML.src = `images/Hangman-${numIncorrectGuesses}.png`;
        }
    }
}

function hintButtonClickHandler(event) {
    event.preventDefault();
    for (let i = 0; i < wordLength; i++) {
        if (!lettersGuessed.includes(word[i])) {
            lettersGuessed.push(word[i]);
            const btn = btnsContainerHTML.children.namedItem(word[i]);
            btn.classList.add('letter-btn__status--green');
            uncoverLetters(word, wordPlaceholderContainerHTML.children, word[i]);
            hintsSoFar++;
            hintsLabelHTML.innerHTML = `${hintsSoFar} / ${numberOfHints}`;
            numIncorrectGuesses--;
            setIncorrectGuess(numIncorrectGuesses);
            break;
        }
    }
}

/**
 * Sets the value of the incorrect guesses HTML element
 * @param {Number} currentValue - current incorrect guess value
 */
function setIncorrectGuess(currentValue) {
    incorrectGuessesHTML.innerHTML = `${currentValue} / ${6}`;
}

/**
 * Resets all values of the game and starts a new one
 */
function resetGame() {

}

/**
 * Initializes all variables that manipulate the DOM
 */
function initHTMLVariables() {
    btnsContainerHTML = document.querySelector('.keyboard-btns-container');
    wordPlaceholderContainerHTML = document.querySelector('.word-placeholder-container');
    incorrectGuessesHTML = document.querySelector('#incorrectGuesses');
    hangmanProgressImgHTML = document.querySelector('#hangmanProgressImg');
    hintButtonHTML = document.querySelector('.btn-hint');
    hintsLabelHTML = document.querySelector('#hints');
}

document.addEventListener("DOMContentLoaded", function(event) {
    initHTMLVariables();
    hintButtonHTML.onclick = hintButtonClickHandler;
    createKeyboard();
    word = fetchWords(1);
    wordLength = word.length;
    numberOfHints = calculateHints(wordLength);
    hintsLabelHTML.innerHTML = `0 / ${numberOfHints}`;
    createWordPlaceholder(word, wordPlaceholderContainerHTML);
});