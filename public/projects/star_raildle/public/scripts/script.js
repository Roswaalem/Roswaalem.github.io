
/***** 
*   Dictionary to store character paths and types, as well as their corresponding symbols
*****/
const symbols = {
    "path": {
        "Remembrance": "https://img.game8.co/4045619/1a57036ae00b8930ee5dee6817b24d50.png/show",
        "Nihility": "https://img.game8.co/3642328/7b27cafae1e58a77db6607cb76b9b0eb.png/show",
        "Erudition": "https://img.game8.co/3649188/af004599288ead465807a176da013d12.png/show",
        "Destruction": "https://img.game8.co/3649190/4b1dd82c7e27c8d3311ebd478b12e6f1.png/show",
        "Harmony": "https://img.game8.co/3649191/40e278c3e7b0bf35e53cdd259aca5c92.png/show",
        "Preservation": "https://img.game8.co/3649192/44a1f6aa63d4d2c0a46363946a2a1f69.png/show",
        "Abundance": "https://img.game8.co/3649187/1c3fb72d6888e3a26ea7112549ef4b85.png/show",
        "The Hunt": "https://img.game8.co/3649189/caa439e94a7dce5e8731b0cca4d42ba3.png/show"
    },
    "type": {
        "Physical": "https://img.game8.co/3649219/9e6591d2f238beeb734eeeb10fd278b7.png/show",
        "Fire": "https://img.game8.co/3649221/41f5578f3193cfb84668e6207d8ab6a4.png/show",
        "Ice": "https://img.game8.co/3649217/ce61c159254847831c07d19cf13b4223.png/show",
        "Lightning": "https://img.game8.co/3649222/7ac92792d400707e9483e8ffa4470b8f.png/show",
        "Wind": "https://img.game8.co/3649218/1ab2b157ec68b4f5d9e5990175c33f87.png/show",
        "Quantum": "https://img.game8.co/3649220/fcf4120eafac20f910e7a57c2bda0d8c.png/show",
        "Imaginary": "https://img.game8.co/3649216/62f29e86fc98f951df761bea314b8aa7.png/show",
    }
}

/* Global variables */
const releaseRange = {
    min: -999,
    max: 999
};

let isVerifying = false; // Flag to control the verification process

/**
 * Pick a daily character based on the current date.
 * @param {Array} characters - Array of character objects.
 * @returns {Object} - The selected character object.
 */
function pickDailyCharacter(characters) {
    const today = new Date();
    const seed = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

    // Hash the seed to get a pseudo-random number
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % characters.length;
    return characters[index];
}

/**
 * Pick a random character (only for testing purposes).
 * @param {Array} characters - Array of character objects.
 * @returns {Object} - The selected character object.
 */
function pickRandomCharacter(characters) {
    const index = Math.floor(Math.random() * characters.length);
    return characters[index];
}

document.addEventListener("DOMContentLoaded", function() {
    // Fetch the json data
    let character;

    fetch('./public/json/chars.json')
        .then(res => res.json())
        .then(data => {
            character = pickDailyCharacter(data);
            console.log('Personnage du jour: ', character.name); // DEBUG ONLY
        })
        .catch(err => console.error('Erreur lors de la récupération des données: ', err));
    
    // Manage the text input submission with the character name and debounce
    const input = document.getElementById('guess-input');
    const suggestionsContainer = document.getElementById('suggestions-container');
    let summaryContainer = document.getElementById('guess-infos-container');
    let validateItems = [];
    let debounceTimer;
    let canGuess = true; // Flag to control guessing
    let triesDiv = document.getElementById('tries');
    let streakDiv = document.getElementById('streak');
    let tries = localStorage.getItem('tries') ? parseInt(localStorage.getItem('tries')) : 0; // Number of tries
    let streak = localStorage.getItem('streak') ? parseInt(localStorage.getItem('streak')) : 0; // Streak of correct guesses
    streakDiv.textContent = 'Streak: ' + streak + ' | ';
    let maxTries = 7; // Maximum number of tries
    document.getElementById('max-streak').textContent = localStorage.getItem('max-streak') ? 'Max Streak: ' + localStorage.getItem('max-streak') : 'Max Streak: ' + 0; // Maximum streak of correct guesses
    let latestDate = localStorage.getItem('latest-date') ? localStorage.getItem('latest-date') : '0000-00-00'; // Latest date of the game
    let currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    releaseRange.min = localStorage.getItem('release-min') ? parseFloat(localStorage.getItem('release-min')) : -999; // Minimum release version
    releaseRange.max = localStorage.getItem('release-max') ? parseFloat(localStorage.getItem('release-max')) : 999; // Maximum release version

    // If the player has already guessed at least once today, display the previous guesses
    if (tries > 0) {
        // Display the results of the previous game
        for (let index = 0; index < 6; index++) {
            const childOfSummary = summaryContainer.children[index];
            const childP = childOfSummary.children[0];
            childOfSummary.classList = localStorage.getItem('guess-info-class-' + index);

            if (index === 2 || index === 3) {
                // Handle cases for path and type with images
                childP.innerHTML = localStorage.getItem('guess-info-' + index);
            } else {
                childP.textContent = localStorage.getItem('guess-info-' + index);
            }

            if (childOfSummary.classList.contains('interval')) {
                let bottom = releaseRange.min.toFixed(1).replace(/\.0$/, '.0');
                let top = releaseRange.max == 42.0 ? 'Upcoming' : releaseRange.max.toFixed(1).replace(/\.0$/, '.0');
                childP.textContent = bottom + ' - ' + top;
            }

            if (index == 4) {
                childP.style.fontSize = '1.3rem'; // Adapt font size for the stars
            }
        }

        triesDiv.textContent = 'Tries: ' + tries + '/' + maxTries + ' | '; // Display the number of tries
    }

    if (latestDate === currentDate) {
        const gameStatus = localStorage.getItem('game-status'); // Check if the player has won or lost
        if (gameStatus === 'won' || gameStatus === 'lost') {
            canGuess = false; // Disable guessing if the player has already played today

            setTimeout(() => {
                alert('You have already played today. The character was "' + character.name + '". Come back tomorrow for a new character !'); // Alert the player that they have already played today
            }, 400); // Add a timeout of 500ms before showing the alert to let the page load
        }
    } else {
        localStorage.setItem('latest-date', currentDate); // Update the latest date
        localStorage.setItem('game-status', ''); // Reset the game status for the new day
        localStorage.removeItem('tries'); // Reset the number of tries for the new day
        
        // Remove the previous game results from local storage
        for (let index = 0; index < 6; index++) {
            localStorage.removeItem('guess-info-' + index);
            localStorage.removeItem('guess-info-class-' + index);
        }
    }

    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.altKey && event.code === 'KeyR') {
            const confirmation = confirm('Are you sure you want to clear the local storage?');
            if (confirmation) {
                localStorage.clear();
                window.location.reload(); // Reload the page to apply changes
            }
        }
    });
    
    input.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = input.value.trim().toLowerCase();
            if (query && canGuess) {
                fetch('./public/json/chars.json')
                    .then(res => res.json())
                    .then(data => {
                        const matches = data.filter(character =>
                            character.name.toLowerCase().includes(query)
                        );
                        displaySuggestions(matches);
                    })
                    .catch(err => console.error('Erreur lors de la récupération des données: ', err));
            } else {
                clearSuggestions();
                suggestionsContainer.style.display = 'none'; // Hide suggestions if input is empty
            }
        }, 500);
    });

    input.addEventListener('blur', function (event) {
        setTimeout(() => {
            clearSuggestions();
        }, 200); // Delay to allow click event on suggestion to register
    });

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && canGuess) {
            event.preventDefault();
            const firstSuggestion = suggestionsContainer.firstChild;
            if (firstSuggestion) {
                if (firstSuggestion.classList.contains('no-match-message') || validateItems.includes(firstSuggestion.textContent)) {
                    return; // Do nothing if the no-match message is displayed
                }

                input.value = '';
                clearSuggestions();
                itemValid(firstSuggestion.textContent);
            }
        }
    });

    input.addEventListener('focus', function () {
        const query = input.value.trim().toLowerCase();
        if (query && canGuess) {
            fetch('./chars.json')
                .then(res => res.json())
                .then(data => {
                    const matches = data.filter(character =>
                        character.name.toLowerCase().includes(query)
                    );
                    displaySuggestions(matches);
                })
                .catch(err => console.error('Erreur lors de la récupération des données: ', err));
        }
    });

    function displaySuggestions(matches) {
        clearSuggestions();

        if (matches.length === 0 || matches.every(match => validateItems.includes(match.name))) {
            const noMatchMessage = document.createElement('div');
            noMatchMessage.textContent = 'Aucun personnage correspondant';
            suggestionsContainer.appendChild(noMatchMessage);
            noMatchMessage.classList.add('no-match-message');
            suggestionsContainer.style.display = 'flex'; // Show the message
            return;
        }

        suggestionsContainer.style.display = 'flex'; // Show the suggestions container

        matches.forEach(match => {
            if (validateItems.includes(match.name)) {
                return; // Skip already validated items
            }

            const suggestion = document.createElement('div');
            suggestion.textContent = match.name;
            suggestion.classList.add('suggestion');
            suggestion.addEventListener('click', () => {
                input.value = '';
                clearSuggestions();
                itemValid(match.name); // Pass the character name to itemValid
            });
            suggestionsContainer.appendChild(suggestion);
        });
    }
    
    function clearSuggestions() {
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.style.display = 'none'; // Ensure the container is hidden
    }
    
    async function itemValid(item) {
        // Handle the item validation logic here
        if (validateItems.includes(item)) {
            return;
        }

        if (isVerifying) {
            return; // Prevent multiple verifications at the same time
        }

        isVerifying = true; // Set the flag to indicate verification is in progress

        // Show the result compared to the daily character
        let res = await verifyingRoutine(item, character);
        console.log('Résultat de la vérification: ', res); // DEBUG ONLY

        if (res) {
            setTimeout(() => {
                // Update the streak and local storage
                streak++;
                localStorage.setItem('streak', streak);
                streakDiv.textContent = 'Streak: ' + streak + ' | ';

                if (streak > localStorage.getItem('max-streak')) {
                    localStorage.setItem('max-streak', streak);
                    document.getElementById('max-streak').textContent = 'Max Streak: ' + streak; // Update the max streak display
                }

                localStorage.setItem('game-status', 'won'); // Set the game status to won
                localStorage.setItem('latest-date', currentDate); // Update the latest date

                alert('Congratulations, you have found the character of the day!');
                canGuess = false; // Disable further guessing
                isVerifying = false;
            }, 502 * 7);
        } else if (tries >= maxTries) {
            setTimeout(() => {
                // Reset the streak and local storage
                streak = 0;
                localStorage.setItem('streak', streak);
                streakDiv.textContent = 'Streak: ' + streak + ' | ';

                localStorage.setItem('game-status', 'lost'); // Set the game status to lost
                localStorage.setItem('latest-date', currentDate); // Update the latest date

                alert('Almost, you have used up all your chances! The daily character was "' + character.name + '". Come back tomorrow for a new character !');
                canGuess = false; // Disable further guessing
                isVerifying = false;
            }, 502 * 7);
        } else {
            setTimeout(() => {
                isVerifying = false; // Reset the flag after verification
            }, 502 * 7);
        }

        validateItems.push(item);
    }

    /**
     * Verifying routine to check if the guessed character matches the daily character, element by element.
     * @param {string} guessedCharacter - The name of the guessed character.
     * @param {Object} dailyCharacter - The daily character object.
     * @returns {boolean} - True if the guessed character matches the daily character, false otherwise.
     */
    async function verifyingRoutine(guessedCharacter, dailyCharacter) {
        let criterias = [];
        let result = false;

        try {
            const response = await fetch('./public/json/chars.json');
            const data = await response.json();

            const guessedCharacterObj = data.find(character => character.name === guessedCharacter);
            if (!guessedCharacterObj) {
                console.error('Personnage non trouvé dans le fichier JSON:', guessedCharacter);
                return result;
            }

            // Add a try
            tries++;
            localStorage.setItem('tries', tries); // Store the number of tries in local storage
            triesDiv.textContent = 'Tries: ' + tries + '/' + maxTries + ' | ';
            if (tries >= maxTries || guessedCharacterObj.name === dailyCharacter.name) {
                canGuess = false; // Disable further guessing
            }

            console.log('Personnage deviné: ', guessedCharacterObj); // DEBUG ONLY

            // Compute name similarity
            if (guessedCharacter === dailyCharacter.name) {
                criterias.push('true');
            } else if (guessedCharacter.split(' ')[0] === dailyCharacter.name.split(' ')[0]) {
                criterias.push('partial');
            } else {
                criterias.push('false');
            }

            // Compute gender similarity
            if (guessedCharacterObj.gender === dailyCharacter.gender) {
                criterias.push('true');
            } else if (guessedCharacterObj.gender === 'F/M') {
                criterias.push('partial');
            } else {
                criterias.push('false');
            }

            // Compute path similarity
            if (guessedCharacterObj.path === dailyCharacter.path) {
                criterias.push('true');
            } else {
                criterias.push('false');
            }

            // Compute type similarity
            if (guessedCharacterObj.type === dailyCharacter.type) {
                criterias.push('true');
            } else {
                criterias.push('false');
            }

            // Compute rarity similarity
            if (guessedCharacterObj.rarity === dailyCharacter.rarity) {
                criterias.push('true');
            } else {
                criterias.push('false');
            }

            // Compute release version similarity by checking if the guessed character was released before, on, or after the daily character
            if (guessedCharacterObj.release === dailyCharacter.release) {
                criterias.push('true');
            } else if (guessedCharacterObj.release === 42 || guessedCharacterObj.release > dailyCharacter.release) {
                criterias.push('after');
            } else {
                criterias.push('before');
            }

            result = !criterias.includes('false');

            // Create a new div to display the result
            const guessResultDiv = document.getElementById('guess-results-container');
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');

            for (let index = 0; index < criterias.length; index++) {
                const criteriaDiv = document.createElement('div');
                criteriaDiv.classList.add(criterias[index]);
                criteriaDiv.style.opacity = '0'; // Initially invisible
                criteriaDiv.style.transition = 'opacity 0.5s'; // Smooth transition for opacity

                // Display the corresponding label and result
                switch (index) {
                    case 0:
                        criteriaDiv.textContent = guessedCharacterObj.name;
                        break;
                    case 1:
                        criteriaDiv.textContent = guessedCharacterObj.gender;
                        break;
                    case 2:
                        criteriaDiv.innerHTML = `<img src="${symbols.path[guessedCharacterObj.path]}" alt="${guessedCharacterObj.path}" class="symbol" title="${guessedCharacterObj.path}">`;
                        break;
                    case 3:
                        criteriaDiv.innerHTML = `<img src="${symbols.type[guessedCharacterObj.type]}" alt="${guessedCharacterObj.type}" class="symbol" title="${guessedCharacterObj.type}">`;
                        break;
                    case 4:
                        criteriaDiv.textContent = guessedCharacterObj.rarity === 5 ? '⭐⭐⭐⭐⭐' : '⭐⭐⭐⭐';
                        criteriaDiv.style.fontSize = '1.3rem';
                        break;
                    case 5:
                        criteriaDiv.textContent = guessedCharacterObj.release == 42.0
                            ? 'Upcoming'
                            : guessedCharacterObj.release.toFixed(1).replace(/\.0$/, '.0');
                        break;
                }

                // Append the criteria div to the result div
                resultDiv.appendChild(criteriaDiv);

                // Use temporary variables for summary and child elements
                const tempChildOfSummary = summaryContainer.children[index].cloneNode(true);
                const tempChildP = tempChildOfSummary.children[0].cloneNode(true);
                console.log('Child: ', tempChildOfSummary); // DEBUG ONLY

                // Adapt the summary based on the found criterias
                if (tempChildOfSummary.classList.contains('true')) {
                    // Do nothing;
                } else if (criteriaDiv.classList.contains('true')) {
                    tempChildOfSummary.classList = 'guess-info true';
                    tempChildP.innerHTML = criteriaDiv.innerHTML; // Use innerHTML to include the image
                } else if ((criteriaDiv.classList.contains('after') && tempChildOfSummary.classList.contains('before')) || (criteriaDiv.classList.contains('before') && tempChildOfSummary.classList.contains('after')) || tempChildOfSummary.classList.contains('interval')) {
                    tempChildOfSummary.classList = 'guess-info interval';
                    let rel = guessedCharacterObj.release;

                    /* Check if the min or max values have to be updated :
                     * - If the max value is 999, it means that we need to set it to the guessed character release version
                     * - If the min value is -999, it means that we need to set it to the guessed character release version
                     * - If the guessed character release version is below the max value, above the min value and above the hidden character release version, we need to update the min value
                     * - If the guessed character release version is below the max value, above the min value and below the hidden character release version, we need to update the max value
                     * - 
                     * In all other cases, we do nothing.
                     */
                    if (releaseRange.max === 999) {
                        releaseRange.max = rel;
                        localStorage.setItem('release-max', releaseRange.max); // Update the max release version in local storage
                    } else if (releaseRange.min === -999) {
                        releaseRange.min = rel;
                        localStorage.setItem('release-min', releaseRange.min); // Update the min release version in local storage
                    } else if (rel < releaseRange.max && rel > releaseRange.min && rel > dailyCharacter.release) {
                        releaseRange.max = rel;
                        localStorage.setItem('release-max', releaseRange.max); // Update the max release version in local storage
                    } else if (rel < releaseRange.max && rel > releaseRange.min && rel < dailyCharacter.release) {
                        releaseRange.min = rel;
                        localStorage.setItem('release-min', releaseRange.min); // Update the min release version in local storage
                    }

                    // Display the range of release versions, taking care of the special case of 42.0
                    let bottom = releaseRange.min.toFixed(1).replace(/\.0$/, '.0');
                    let top = releaseRange.max == 42.0 ? 'Upcoming' : releaseRange.max.toFixed(1).replace(/\.0$/, '.0');
                    tempChildP.textContent = bottom + ' - ' + top;
                } else if (criteriaDiv.classList.contains('after')) {
                    // If the entered character has been released after the daily character
                    tempChildOfSummary.classList = 'guess-info after';
                    let rel = guessedCharacterObj.release;

                    if (rel < releaseRange.max) {
                        releaseRange.max = rel;
                        rel == 42.0 ? tempChildP.textContent = '< Upcoming' : tempChildP.textContent = '< ' + rel.toFixed(1).replace(/\.0$/, '.0');
                        localStorage.setItem('release-max', releaseRange.max); // Update the max release version in local storage
                    }
                } else if (criteriaDiv.classList.contains('before')) {
                    // If the entered character has been released before the daily character
                    tempChildOfSummary.classList = 'guess-info before';
                    let rel = guessedCharacterObj.release;

                    if (rel > releaseRange.min) {
                        releaseRange.min = rel;
                        tempChildP.textContent = '> ' + rel.toFixed(1).replace(/\.0$/, '.0');
                        localStorage.setItem('release-min', releaseRange.min); // Update the min release version in local storage
                    }
                } else if (criteriaDiv.classList.contains('partial')) {
                    tempChildOfSummary.classList = 'guess-info partial';
                    tempChildP.textContent = criteriaDiv.textContent;
                }

                // Adapt font size for the stars
                if (index == 4) {
                    tempChildP.style.fontSize = '1.3rem';
                }

                // Add the current criteria to the local storage
                if (index === 2 || index === 3) {
                    // Handle cases for path and type with images
                    localStorage.setItem('guess-info-' + index, tempChildP.innerHTML);
                } else {
                    localStorage.setItem('guess-info-' + index, tempChildP.textContent);
                }
                localStorage.setItem('guess-info-class-' + index, tempChildOfSummary.classList);

                // Set a timeout to assign the temporary variables to the actual elements
                setTimeout(() => {
                    criteriaDiv.style.opacity = '1'; // Fade in the element
                    
                    // Assign the temporary variables to the actual elements
                    summaryContainer.children[index].classList = tempChildOfSummary.classList;
                    summaryContainer.children[index].children[0].innerHTML = tempChildP.innerHTML; // Use innerHTML to include the image

                    if (index == 4) {
                        summaryContainer.children[index].children[0].style.fontSize = '1.3rem'; // Adapt font size for the stars
                    }
                }, index == 0 ? 20 : 500 * index); // Delay for each criteria
            }

            guessResultDiv.appendChild(resultDiv);
        } catch (err) {
            console.error('Erreur lors de la récupération des données: ', err);
        }

        console.log('Résultat de la vérification: ', result); // DEBUG ONLY
        return result;
    }
});