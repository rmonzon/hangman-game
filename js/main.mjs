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

document.addEventListener("DOMContentLoaded", function(event) {
    btnsContainerHTML = document.querySelector('.keyboard-btns-container');
    wordPlaceholderContainerHTML = document.querySelector('.word-placeholder-container');
    incorrectGuessesHTML = document.querySelector('#incorrectGuesses');
    hangmanProgressImgHTML = document.querySelector('#hangmanProgressImg');
    hintButtonHTML = document.querySelector('.btn-hint');
    hintsLabelHTML = document.querySelector('#hints');
    hintButtonHTML.onclick = hintButtonClickHandler;
    createKeyboard();
    word = fetchWords();
    wordLength = word.length;
    numberOfHints = calculateHints(wordLength);
    hintsLabelHTML.innerHTML = `0 / ${numberOfHints}`;
    createWordPlaceholder(word, wordPlaceholderContainerHTML);
});

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
    } else {
        if (word.includes(letter)) {
            // letter guessed!
            btn.classList.add('letter-btn__status--green');
            lettersGuessed.push(letter);
            uncoverLetters(word, wordPlaceholderContainerHTML.children, letter);
        } else {
            // wrong guess!
            numIncorrectGuesses++;
            incorrectGuessesHTML.innerHTML = `${numIncorrectGuesses} / ${6}`;
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
            break;
        }
    }
}