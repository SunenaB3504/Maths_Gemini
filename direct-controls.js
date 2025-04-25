/**
 * Direct Controls Script
 * 
 * This script provides direct DOM manipulation for critical UI controls
 * without relying on module loading.
 */

// Set up direct controls once DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Setting up direct controls");
    setupNumberExplorerControls();
    setupActivitySwitching();
    setupOddEvenActivity();
        setupNumberPatternsActivity();
    setupPlaceValueActivity();
    setupAdditionLevelSwitching(); // Add direct control for addition levels
});

// Detect if using a touch device and update UI accordingly
function detectTouchDevice() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const deviceMessage = document.querySelector('.device-message');
    
    if (deviceMessage) {
        if (isTouchDevice) {
            deviceMessage.textContent = "Touch mode activated: Tap a number, then tap 'Sort to Even' or 'Sort to Odd'";
            deviceMessage.classList.add('touch-device');
            document.body.classList.add('touch-device');
        } else {
            deviceMessage.textContent = "Desktop mode: Drag and drop numbers to sort them";
            deviceMessage.classList.add('desktop-device');
        }
    }
    
    console.log("Device detection: " + (isTouchDevice ? "Touch device" : "Desktop device"));
}

// Setup activity switching between Number Friends activities
function setupActivitySwitching() {
    const activityButtons = document.querySelectorAll('.activity-btn');
    
    activityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const activityToShow = this.getAttribute('data-activity');
            console.log('Switching to activity:', activityToShow);
            
            // Update active button
            document.querySelectorAll('.activity-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Hide all activities and show the selected one
            document.querySelectorAll('.number-activity').forEach(activity => {
                activity.classList.remove('active');
            });
            
            const selectedActivity = document.getElementById(`${activityToShow}-activity`);
            if (selectedActivity) {
                selectedActivity.classList.add('active');
                
                // Initialize specific activities if needed
                if (activityToShow === 'odd-even' && !window.oddEvenInitialized) {
                    initializeOddEvenGame();
                }
            }
        });
    });
    
    console.log("Activity switching initialized");
}

// Setup Odd & Even activity
function setupOddEvenActivity() {
    const oddEvenButton = document.querySelector('.activity-btn[data-activity="odd-even"]');
    if (oddEvenButton) {
        oddEvenButton.addEventListener('click', function() {
            initializeOddEvenGame();
        });
    }
}

// Initialize Odd & Even sorting game with tablet-friendly controls
function initializeOddEvenGame() {
    console.log("Initializing Odd & Even game with tablet-friendly controls");
    const numbersToSort = document.getElementById('numbers-to-sort');
    const evenContainer = document.getElementById('even-numbers');
    const oddContainer = document.getElementById('odd-numbers');
    const checkBtn = document.getElementById('check-sorting');
    const newGameBtn = document.getElementById('new-sorting-game');
    
    if (!numbersToSort || !evenContainer || !oddContainer || !checkBtn || !newGameBtn) {
        console.error("Missing required elements for Odd & Even game");
        return;
    }
    
    // Generate random numbers for sorting
    function generateNumbers(count = 10, max = 20) {
        const numbers = [];
        for (let i = 0; i < count; i++) {
            numbers.push(Math.floor(Math.random() * max) + 1);
        }
        return numbers;
    }
    
    // Create number elements with action buttons
    function createNumberElements(numbers) {
        numbersToSort.innerHTML = '';
        
        numbers.forEach(num => {
            // Create a container for each number with its sorting buttons
            const numberContainer = document.createElement('div');
            numberContainer.className = 'number-container';
            numberContainer.setAttribute('data-number', num);
            
            // Create the number display
            const numberDisplay = document.createElement('div');
            numberDisplay.className = 'tablet-number';
            numberDisplay.textContent = num;
            
            // Create button container
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'number-sort-buttons';
            
            // Create Even button
            const evenButton = document.createElement('button');
            evenButton.className = 'mini-sort-btn even-btn';
            evenButton.textContent = 'Even';
            evenButton.addEventListener('click', function() {
                moveNumberTo(numberContainer, evenContainer);
            });
            
            // Create Odd button
            const oddButton = document.createElement('button');
            oddButton.className = 'mini-sort-btn odd-btn';
            oddButton.textContent = 'Odd';
            oddButton.addEventListener('click', function() {
                moveNumberTo(numberContainer, oddContainer);
            });
            
            // Add elements to container
            buttonContainer.appendChild(evenButton);
            buttonContainer.appendChild(oddButton);
            numberContainer.appendChild(numberDisplay);
            numberContainer.appendChild(buttonContainer);
            
            // Add to the sorting area
            numbersToSort.appendChild(numberContainer);
        });
    }
    
    // Move a number to a container
    function moveNumberTo(numberContainer, targetContainer) {
        // Create a simplified version of the number element for the sorted container
        const number = parseInt(numberContainer.getAttribute('data-number'));
        const sortedNumber = document.createElement('div');
        sortedNumber.className = 'sortable-number';
        sortedNumber.textContent = number;
        sortedNumber.setAttribute('data-number', number);
        
        // Add a reset button to move back to sorting area
        const resetButton = document.createElement('button');
        resetButton.className = 'reset-sort-btn';
        resetButton.innerHTML = '&times;'; // × symbol
        resetButton.title = 'Remove from sorting';
        resetButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent other click events
            sortedNumber.remove();
            
            // Find or create corresponding number container in original list
            let originalContainer = document.querySelector(`.number-container[data-number="${number}"]`);
            if (!originalContainer) {
                // If it doesn't exist (was removed), recreate it
                originalContainer = document.createElement('div');
                originalContainer.className = 'number-container';
                originalContainer.setAttribute('data-number', number);
                
                const numberDisplay = document.createElement('div');
                numberDisplay.className = 'tablet-number';
                numberDisplay.textContent = number;
                
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'number-sort-buttons';
                
                const evenButton = document.createElement('button');
                evenButton.className = 'mini-sort-btn even-btn';
                evenButton.textContent = 'Even';
                evenButton.addEventListener('click', function() {
                    moveNumberTo(originalContainer, evenContainer);
                });
                
                const oddButton = document.createElement('button');
                oddButton.className = 'mini-sort-btn odd-btn';
                oddButton.textContent = 'Odd';
                oddButton.addEventListener('click', function() {
                    moveNumberTo(originalContainer, oddContainer);
                });
                
                buttonContainer.appendChild(evenButton);
                buttonContainer.appendChild(oddButton);
                originalContainer.appendChild(numberDisplay);
                originalContainer.appendChild(buttonContainer);
                
                numbersToSort.appendChild(originalContainer);
            } else {
                // Make it visible again if it exists
                originalContainer.style.display = 'flex';
            }
        });
        
        sortedNumber.appendChild(resetButton);
        targetContainer.appendChild(sortedNumber);
        
        // Hide the original container
        numberContainer.style.display = 'none';
    }
    
    // Check sorting correctness
    function checkSorting() {
        let allCorrect = true;
        
        // Check even numbers
        const evenNumbers = Array.from(evenContainer.children);
        evenNumbers.forEach(numEl => {
            const number = parseInt(numEl.getAttribute('data-number'));
            if (number % 2 !== 0) {
                numEl.classList.add('incorrect');
                allCorrect = false;
            } else {
                numEl.classList.add('correct');
            }
        });
        
        // Check odd numbers
        const oddNumbers = Array.from(oddContainer.children);
        oddNumbers.forEach(numEl => {
            const number = parseInt(numEl.getAttribute('data-number'));
            if (number % 2 === 0) {
                numEl.classList.add('incorrect');
                allCorrect = false;
            } else {
                numEl.classList.add('correct');
            }
        });
        
        // Provide feedback
        const feedbackArea = document.createElement('div');
        feedbackArea.className = 'sorting-feedback';
        
        if (evenNumbers.length === 0 && oddNumbers.length === 0) {
            feedbackArea.textContent = "Please sort some numbers first!";
            feedbackArea.classList.add('info-feedback');
        } else {
            feedbackArea.textContent = allCorrect ? 
                'Great job! All numbers are correctly sorted!' : 
                'Some numbers are in the wrong place. Try again!';
            feedbackArea.classList.add(allCorrect ? 'correct-feedback' : 'incorrect-feedback');
        }
        
        // Remove any existing feedback
        const existingFeedback = document.querySelector('.sorting-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Add new feedback
        document.querySelector('.sorting-game').appendChild(feedbackArea);
    }
    
    // Start a new game
    function startNewGame() {
        const numbers = generateNumbers();
        createNumberElements(numbers);
        
        // Clear the sorted containers
        evenContainer.innerHTML = '';
        oddContainer.innerHTML = '';
        
        // Remove any existing feedback
        const existingFeedback = document.querySelector('.sorting-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
    }
    
    // Event listeners
    checkBtn.addEventListener('click', checkSorting);
    newGameBtn.addEventListener('click', startNewGame);
    
    // Initialize the activity
    startNewGame();
    
    // Mark as initialized
    window.oddEvenInitialized = true;
    console.log("Odd & Even game initialized with tablet-friendly controls");
}

// Set up Number Explorer +/- controls
function setupNumberExplorerControls() {
    const decreaseBtn = document.getElementById('decrease-number');
    const increaseBtn = document.getElementById('increase-number');
    const numberInput = document.getElementById('current-number');
    const numberDisplay = document.querySelector('.number-display');
    
    if (decreaseBtn && increaseBtn && numberInput && numberDisplay) {
        // Decrease button
        decreaseBtn.addEventListener('click', function() {
            let number = parseInt(numberInput.value);
            if (number > 0) {
                number--;
                updateNumber(number);
            }
        });
        
        // Increase button
        increaseBtn.addEventListener('click', function() {
            let number = parseInt(numberInput.value);
            if (number < 100) {
                number++;
                updateNumber(number);
            }
        });
        
        // Input change
        numberInput.addEventListener('change', function() {
            let number = parseInt(this.value);
            if (isNaN(number)) number = 0;
            if (number < 0) number = 0;
            if (number > 100) number = 100;
            updateNumber(number);
        });
        
        console.log("Number Explorer controls initialized");
    } else {
        console.error("Could not find all required Number Explorer elements");
    }
    
    // Update number display and properties
    function updateNumber(number) {
        // Update input and display
        numberInput.value = number;
        numberDisplay.textContent = number;
        
        // Update even/odd
        const evenOddValue = document.querySelector('#property-even-odd .property-value');
        if (evenOddValue) {
            evenOddValue.textContent = number % 2 === 0 ? 'Even' : 'Odd';
        }
        
        // Update prime status
        const primeValue = document.querySelector('#property-prime .property-value');
        if (primeValue) {
            primeValue.textContent = isPrime(number) ? 'Yes' : 'No';
        }
        
        // Update factors
        const factorsValue = document.querySelector('#property-factors .property-value');
        if (factorsValue) {
            factorsValue.textContent = getFactors(number).join(', ') || 'None';
        }
        
        // Update multiples
        const multiplesValue = document.querySelector('#property-multiples .property-value');
        if (multiplesValue) {
            const multiples = [];
            for (let i = 1; i <= 5; i++) {
                multiples.push(number * i);
            }
            multiplesValue.textContent = number === 0 ? '0' : multiples.join(', ');
        }
        
        // Update visual representation
        updateNumberVisual(number);
    }
    
    // Create visual representation of the number
    function updateNumberVisual(number) {
        const visualContainer = document.querySelector('.number-visual-container');
        if (visualContainer) {
            visualContainer.innerHTML = '';
            
            if (number > 50) {
                visualContainer.innerHTML = '<p>Number too large to display all dots!</p>';
                number = 50; // Limit dots
            }
            
            for (let i = 0; i < number; i++) {
                const dot = document.createElement('div');
                dot.className = 'number-dot';
                visualContainer.appendChild(dot);
            }
        }
    }
    
    // Check if a number is prime
    function isPrime(number) {
        if (number <= 1) return false;
        if (number <= 3) return true;
        if (number % 2 === 0 || number % 3 === 0) return false;
        for (let i = 5; i * i <= number; i += 6) {
            if (number % i === 0 || number % (i + 2) === 0) return false;
        }
        return true;
    }
    
    // Get factors of a number
    function getFactors(number) {
        if (number === 0) return [];
        const factors = [];
        for (let i = 1; i <= number; i++) {
            if (number % i === 0) {
                factors.push(i);
            }
        }
        return factors;
    }
}

// Initialize Number Patterns Activity
function setupNumberPatternsActivity() {
    console.log("Initializing Number Patterns activity");
    const patternSequence = document.getElementById('pattern-sequence');
    const checkBtn = document.getElementById('check-pattern');
    const newPatternBtn = document.getElementById('new-pattern');
    const hintBtn = document.getElementById('pattern-hint');
    const feedbackArea = document.getElementById('pattern-feedback');
    
    if (!patternSequence || !checkBtn || !newPatternBtn || !hintBtn || !feedbackArea) {
        console.error("Missing required elements for Number Patterns activity");
        return;
    }
    
    let currentPattern = [];
    let missingIndices = [];
    let currentPatternType = null;
    
    // Pattern types
    const patternTypes = [
        { 
            name: 'Add 2', 
            generator: (prev) => prev + 2,
            hint: "Try adding 2 to each number to find the next one."
        },
        { 
            name: 'Add 3', 
            generator: (prev) => prev + 3,
            hint: "Try adding 3 to each number to find the next one."
        },
        { 
            name: 'Add 5', 
            generator: (prev) => prev + 5,
            hint: "Try adding 5 to each number to find the next one."
        },
        { 
            name: 'Add 10', 
            generator: (prev) => prev + 10,
            hint: "Try adding 10 to each number to find the next one."
        },
        { 
            name: 'Double', 
            generator: (prev) => prev * 2,
            hint: "Try doubling each number to find the next one."
        },
        { 
            name: 'Triple', 
            generator: (prev) => prev * 3,
            hint: "Try multiplying each number by 3 to find the next one."
        },
        { 
            name: 'Count by 2s', 
            specialType: true,
            generator: (index) => 2 * (index + 1),
            hint: "These are the counting by 2s numbers: 2, 4, 6, 8..."
        },
        { 
            name: 'Count by 5s', 
            specialType: true,
            generator: (index) => 5 * (index + 1),
            hint: "These are the counting by 5s numbers: 5, 10, 15, 20..."
        }
    ];
    
    // Generate a pattern sequence
    function generatePattern() {
        // Select a random pattern type
        currentPatternType = patternTypes[Math.floor(Math.random() * patternTypes.length)];
        console.log("Selected pattern type:", currentPatternType.name);
        
        currentPattern = [];
        
        // Special patterns (like count by 2s) use index-based generation
        if (currentPatternType.specialType) {
            for (let i = 0; i < 8; i++) {
                currentPattern.push(currentPatternType.generator(i));
            }
        } 
        // Regular patterns use the previous number
        else {
            // Start with a small number between 1 and 10
            const startValue = Math.floor(Math.random() * 10) + 1;
            currentPattern.push(startValue);
            
            // Generate 7 more numbers in the sequence
            for (let i = 1; i < 8; i++) {
                currentPattern.push(currentPatternType.generator(currentPattern[i-1]));
            }
        }
        
        // Determine which positions to leave blank (2-3 blanks)
        missingIndices = [];
        const blanksCount = Math.floor(Math.random() * 2) + 2; // 2-3 blanks
        
        // Don't make the first one blank
        while (missingIndices.length < blanksCount) {
            const index = Math.floor(Math.random() * 7) + 1;
            if (!missingIndices.includes(index)) {
                missingIndices.push(index);
            }
        }
        
        // Create the pattern display with inputs for missing numbers
        patternSequence.innerHTML = '';
        
        currentPattern.forEach((number, index) => {
            const numberElement = document.createElement('div');
            numberElement.className = 'pattern-number';
            
            if (missingIndices.includes(index)) {
                const input = document.createElement('input');
                input.type = "number";
                input.className = 'pattern-input';
                input.setAttribute('data-index', index);
                input.setAttribute('aria-label', `Missing number at position ${index + 1}`);
                
                // Add keypress event for Enter key
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        checkPattern();
                    }
                });
                
                numberElement.appendChild(input);
            } else {
                numberElement.textContent = number;
            }
            
            patternSequence.appendChild(numberElement);
        });
        
        // Clear the feedback area
        feedbackArea.innerHTML = '';
        
        // Hide any previous hint
        hideHint();
    }
    
    // Show hint for the current pattern
    function showHint() {
        if (!currentPatternType) return;
        
        let hintText = document.getElementById('pattern-hint-text');
        if (!hintText) {
            hintText = document.createElement('div');
            hintText.id = 'pattern-hint-text';
            hintText.className = 'pattern-hint-text';
            
            // Insert before feedback area
            feedbackArea.parentNode.insertBefore(hintText, feedbackArea);
        }
        
        hintText.textContent = currentPatternType.hint;
        hintText.style.display = 'block';
        
        // Add animation class
        hintText.classList.add('hint-animation');
    }
    
    // Hide the hint
    function hideHint() {
        const hintText = document.getElementById('pattern-hint-text');
        if (hintText) {
            hintText.style.display = 'none';
            hintText.classList.remove('hint-animation');
        }
    }
    
    // Check the user's pattern inputs
    function checkPattern() {
        if (missingIndices.length === 0) return;
        
        let allCorrect = true;
        const inputs = document.querySelectorAll('.pattern-input');
        
        inputs.forEach(input => {
            // Get the index and user's answer
            const index = parseInt(input.getAttribute('data-index'));
            const userAnswer = parseInt(input.value);
            
            // Check if the answer is correct
            if (userAnswer === currentPattern[index]) {
                input.classList.add('correct-input');
                input.classList.remove('incorrect-input');
            } else {
                input.classList.add('incorrect-input');
                input.classList.remove('correct-input');
                allCorrect = false;
            }
        });
        
        // Update the feedback area based on correctness
        if (allCorrect) {
            feedbackArea.innerHTML = `
                <div class="pattern-feedback correct-feedback">
                    <p>Great job! You found the pattern!</p>
                    <p class="pattern-rule">The rule was: <strong>${currentPatternType.name}</strong></p>
                </div>
            `;
            
            // Highlight all numbers to show the complete pattern
            document.querySelectorAll('.pattern-number').forEach(numEl => {
                numEl.classList.add('pattern-complete');
            });
        } else {
            feedbackArea.innerHTML = `
                <div class="pattern-feedback incorrect-feedback">
                    <p>Some numbers don't match the pattern. Try again!</p>
                </div>
            `;
        }
    }
    
    // Event listeners
    checkBtn.addEventListener('click', checkPattern);
    newPatternBtn.addEventListener('click', generatePattern);
    hintBtn.addEventListener('click', showHint);
    
    // Activity-switching integration
    const numberPatternsButton = document.querySelector('.activity-btn[data-activity="number-patterns"]');
    if (numberPatternsButton) {
        numberPatternsButton.addEventListener('click', function() {
            // If first time, initialize the pattern
            if (!window.patternInitialized) {
                generatePattern();
                window.patternInitialized = true;
            }
        });
    }
    
    // Initialize with a pattern
    generatePattern();
    console.log("Number Patterns activity initialized");
}

// Initialize Place Value Activity
function setupPlaceValueActivity() {
    console.log("Initializing Place Value activity");
    const numberInput = document.getElementById('place-value-number');
    const analyzeBtn = document.getElementById('analyze-number');
    const hundredsValue = document.getElementById('hundreds-value');
    const tensValue = document.getElementById('tens-value');
    const onesValue = document.getElementById('ones-value');
    const hundredsBlocks = document.getElementById('hundreds-blocks');
    const tensBlocks = document.getElementById('tens-blocks');
    const onesBlocks = document.getElementById('ones-blocks');
    const expandedForm = document.getElementById('expanded-form');
    
    if (!numberInput || !analyzeBtn || !hundredsValue || !tensValue || !onesValue || 
        !hundredsBlocks || !tensBlocks || !onesBlocks || !expandedForm) {
        console.error("Missing required elements for Place Value activity");
        return;
    }
    
    // Update the place value display and visuals
    function updatePlaceValue(number) {
        // Ensure number is between 0-999
        number = Math.min(999, Math.max(0, number));
        numberInput.value = number;
        
        // Calculate place values
        const hundreds = Math.floor(number / 100);
        const tens = Math.floor((number % 100) / 10);
        const ones = number % 10;
        
        // Update numeric displays with animation
        animateValueChange(hundredsValue, hundreds);
        animateValueChange(tensValue, tens);
        animateValueChange(onesValue, ones);
        
        // Update block visuals
        updateBlocks(hundredsBlocks, hundreds, 'hundred-block');
        updateBlocks(tensBlocks, tens, 'ten-block');
        updateBlocks(onesBlocks, ones, 'one-block');
        
        // Update expanded form
        updateExpandedForm(hundreds, tens, ones);
    }
    
    // Animate value change with counting effect
    function animateValueChange(element, newValue) {
        const currentValue = parseInt(element.textContent) || 0;
        
        // If same value, no animation needed
        if (currentValue === newValue) return;
        
        // Add animation class
        element.classList.add('value-changing');
        
        // After brief delay, update the value and remove animation class
        setTimeout(() => {
            element.textContent = newValue;
            element.classList.remove('value-changing');
        }, 300);
    }
    
    // Create place value blocks with animation
    function updateBlocks(container, count, blockClass) {
        // Clear existing blocks with fade-out effect
        const existingBlocks = container.querySelectorAll('.place-block');
        existingBlocks.forEach(block => {
            block.classList.add('fade-out');
        });
        
        // Short delay before removing old blocks and adding new ones
        setTimeout(() => {
            container.innerHTML = '';
            
            // Create new blocks with fade-in effect
            for (let i = 0; i < count; i++) {
                const block = document.createElement('div');
                block.className = `place-block ${blockClass} fade-in`;
                
                // Add a slight delay for each block for cascading effect
                block.style.animationDelay = `${i * 50}ms`;
                
                container.appendChild(block);
            }
        }, 300);
    }
    
    // Update the expanded form representation
    function updateExpandedForm(hundreds, tens, ones) {
        const expandedParts = [];
        
        if (hundreds > 0) expandedParts.push(`${hundreds} × 100`);
        if (tens > 0) expandedParts.push(`${tens} × 10`);
        if (ones > 0) expandedParts.push(`${ones} × 1`);
        
        const formText = expandedParts.length > 0 ? expandedParts.join(' + ') : '0';
        
        // Animate the expanded form update
        expandedForm.classList.add('updating');
        setTimeout(() => {
            expandedForm.textContent = formText;
            expandedForm.classList.remove('updating');
        }, 300);
        
        // Optional: Add the numerical sum at the end
        const totalSum = hundreds * 100 + tens * 10 + ones;
        const expandedFormContainer = expandedForm.parentElement;
        
        let sumDisplay = expandedFormContainer.querySelector('.sum-display');
        if (!sumDisplay) {
            sumDisplay = document.createElement('p');
            sumDisplay.className = 'sum-display';
            expandedFormContainer.appendChild(sumDisplay);
        }
        
        sumDisplay.textContent = `= ${totalSum}`;
    }
    
    // Add interactive features like picking a random number
    function addInteractiveFeatures() {
        // Add a "Random Number" button
        const randomBtn = document.createElement('button');
        randomBtn.id = 'random-number';
        randomBtn.className = 'random-btn';
        randomBtn.textContent = 'Random Number';
        randomBtn.title = 'Generate a random number';
        
        // Insert after the analyze button
        analyzeBtn.parentNode.insertBefore(randomBtn, analyzeBtn.nextSibling);
        
        // Event listener for random button
        randomBtn.addEventListener('click', function() {
            const randomNum = Math.floor(Math.random() * 1000);
            numberInput.value = randomNum;
            updatePlaceValue(randomNum);
        });
        
        // Add place value challenge
        const challengeContainer = document.createElement('div');
        challengeContainer.className = 'place-value-challenge';
        challengeContainer.innerHTML = `
            <h5>Place Value Challenge</h5>
            <button id="start-challenge" class="challenge-btn">Start Challenge</button>
            <div id="challenge-area" class="challenge-area" style="display: none;"></div>
        `;
        
        // Add after the expanded form container
        const expandedFormContainer = expandedForm.parentElement;
        expandedFormContainer.parentNode.insertBefore(challengeContainer, expandedFormContainer.nextSibling);
        
        // Event listener for challenge button
        document.getElementById('start-challenge').addEventListener('click', startPlaceValueChallenge);
    }
    
    // Start a place value challenge
    function startPlaceValueChallenge() {
        const challengeArea = document.getElementById('challenge-area');
        challengeArea.style.display = 'block';
        
        // Generate a random number for the challenge
        const challengeNumber = Math.floor(Math.random() * 900) + 100; // 100-999
        
        challengeArea.innerHTML = `
            <p>What is the value of each digit in the number <strong>${challengeNumber}</strong>?</p>
            <div class="challenge-inputs">
                <div class="challenge-input-group">
                    <label>Hundreds:</label>
                    <input type="number" id="challenge-hundreds" min="0" max="9">
                </div>
                <div class="challenge-input-group">
                    <label>Tens:</label>
                    <input type="number" id="challenge-tens" min="0" max="9">
                </div>
                <div class="challenge-input-group">
                    <label>Ones:</label>
                    <input type="number" id="challenge-ones" min="0" max="9">
                </div>
            </div>
            <button id="check-challenge" class="check-btn">Check Answer</button>
            <div id="challenge-feedback"></div>
        `;
        
        // Store the challenge number for checking
        challengeArea.setAttribute('data-challenge', challengeNumber);
        
        // Event listener for checking challenge answer
        document.getElementById('check-challenge').addEventListener('click', function() {
            checkChallengeAnswer(challengeNumber);
        });
        
        // Let the input fields be navigated with arrow keys and Enter
        setupChallengeNavigation();
    }
    
    // Set up keyboard navigation for challenge inputs
    function setupChallengeNavigation() {
        const inputs = [
            document.getElementById('challenge-hundreds'),
            document.getElementById('challenge-tens'),
            document.getElementById('challenge-ones')
        ];
        
        inputs.forEach((input, index) => {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    if (index < inputs.length - 1) {
                        // Move to next input
                        inputs[index + 1].focus();
                    } else {
                        // On last input, check answer
                        const challengeNumber = parseInt(this.closest('#challenge-area').getAttribute('data-challenge'));
                        checkChallengeAnswer(challengeNumber);
                    }
                }
            });
        });
    }
    
    // Check the challenge answer
    function checkChallengeAnswer(challengeNumber) {
        const hundredsInput = document.getElementById('challenge-hundreds');
        const tensInput = document.getElementById('challenge-tens');
        const onesInput = document.getElementById('challenge-ones');
        const feedbackEl = document.getElementById('challenge-feedback');
        
        // Get user answers
        const userHundreds = parseInt(hundredsInput.value) || 0;
        const userTens = parseInt(tensInput.value) || 0;
        const userOnes = parseInt(onesInput.value) || 0;
        
        // Calculate correct answers
        const correctHundreds = Math.floor(challengeNumber / 100);
        const correctTens = Math.floor((challengeNumber % 100) / 10);
        const correctOnes = challengeNumber % 10;
        
        // Check if answers are correct
        const hundredsCorrect = userHundreds === correctHundreds;
        const tensCorrect = userTens === correctTens;
        const onesCorrect = userOnes === correctOnes;
        const allCorrect = hundredsCorrect && tensCorrect && onesCorrect;
        
        // Apply visual feedback to inputs
        applyInputFeedback(hundredsInput, hundredsCorrect);
        applyInputFeedback(tensInput, tensCorrect);
        applyInputFeedback(onesInput, onesCorrect);
        
        // Show overall feedback
        if (allCorrect) {
            feedbackEl.innerHTML = `
                <div class="correct-feedback">
                    <p>Great job! You correctly identified all digit values!</p>
                    <p>The expanded form is: ${correctHundreds} × 100 + ${correctTens} × 10 + ${correctOnes} × 1</p>
                </div>
            `;
            
            // Show the analyzed number in the main place value display
            updatePlaceValue(challengeNumber);
        } else {
            feedbackEl.innerHTML = `
                <div class="incorrect-feedback">
                    <p>Some answers are not correct. Try again!</p>
                </div>
            `;
        }
    }
    
    // Apply visual feedback to challenge inputs
    function applyInputFeedback(input, isCorrect) {
        input.classList.remove('correct-input', 'incorrect-input');
        input.classList.add(isCorrect ? 'correct-input' : 'incorrect-input');
    }
    
    // Event listeners
    analyzeBtn.addEventListener('click', function() {
        updatePlaceValue(parseInt(numberInput.value) || 0);
    });
    
    numberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            updatePlaceValue(parseInt(this.value) || 0);
        }
    });
    
    // Activity-switching integration
    const placeValueButton = document.querySelector('.activity-btn[data-activity="place-value"]');
    if (placeValueButton) {
        placeValueButton.addEventListener('click', function() {
            // If first time, initialize
            if (!window.placeValueInitialized) {
                addInteractiveFeatures();
                window.placeValueInitialized = true;
            }
        });
    }
    
    // Initialize with default value
    updatePlaceValue(352);
    addInteractiveFeatures();
    console.log("Place Value activity initialized");
}

// Direct control for addition level switching
function setupAdditionLevelSwitching() {
    const levelButtons = document.querySelectorAll('.level-btn');
    
    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Clear feedback area when switching levels
            const feedbackArea = document.getElementById('feedback-area');
            if (feedbackArea) {
                feedbackArea.innerHTML = '';
            }
            
            // Clear hint container when switching levels
            const hintContainer = document.getElementById('hint-container');
            if (hintContainer) {
                hintContainer.style.display = 'none';
            }
            
            // For Level 7 (Four Digits), add specific setup
            if (this.getAttribute('data-level') === '7') {
                setTimeout(() => {
                    const hintBtn = document.getElementById('show-hint-btn');
                    if (hintBtn) {
                        hintBtn.title = "Get help with four-digit addition";
                    }
                }, 100);
            }
        });
    });
    
    console.log("Addition level buttons enhanced with direct controls");
}
