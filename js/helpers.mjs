/**
 * Calculates the number of hints provided to each game based on the word's length
 * @param {Number} numberOfLetters - Current word's length
 */
export function calculateHints(numberOfLetters) {
    if (numberOfLetters % 2 === 0) {
        // even
        return numberOfLetters / 2 - 1;
    }
    // odd
    return Math.floor(numberOfLetters / 2); 
}

/**
 * Makes a call to the API and fetches the list of words to pick from
 */
export function fetchWords() {
    // here we'll fetch the words and randomly select one
    return 'california';
}

/**
 * Traverses the ghost letters array and replaces all occurrences of the guessed letter
 * @param {string} word - the current game's word
 * @param {Array} ghostLetters - the word's placeholder in HTML
 * @param {string} guessedLetter - the guessed letter
 */
export function uncoverLetters(word, ghostLetters, guessedLetter) {
    for (let i = 0, len = word.length; i < len; i++) {
        if (word[i] === guessedLetter) {
            ghostLetters[i].innerHTML = guessedLetter.toUpperCase();
        }
    }
}

/**
 * Returns true if the player has reached the maximum number of incorrect guesses
 * @param {Number} wrongGuesses - Number of incorrect guesses that the player has made so far
 */
export function isGameOver(wrongGuesses) {
    return wrongGuesses >= 6;
}

/**
 * Creates the placeholder of the word to be guessed using underscores
 * @param {string} word - the selected word to play the game
 * @param {Object} wordPlaceholder - HTML element container that will have all 26 letters as buttons
 */
export function createWordPlaceholder(word, wordPlaceholder) {
    for (let i = 0, len = word.length; i < len; i++) {
        const underscore = document.createElement('span');
        underscore.innerHTML = '_';
        underscore.classList.add('letter-placeholder');
        wordPlaceholder.appendChild(underscore);
    }
}

/**
 * Generates an arbitrary number between two numbers
 * @param {Number} min - Lower bound to generate a random number between
 * @param {Number} max - Upper bound to generate a random number between
 * @returns {Number} a random number
 */
export function getRandomNumber(min, max) {
    var randomFloat = Math.random() * (max - min) + min;
    return Math.floor(randomFloat); 
}