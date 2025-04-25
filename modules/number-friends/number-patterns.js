/**
 * Number Patterns Activity
 * Find missing numbers in sequences by recognizing patterns
 */

export function initNumberPatterns() {
    const patternSequence = document.getElementById('pattern-sequence');
    const checkBtn = document.getElementById('check-pattern');
    const newPatternBtn = document.getElementById('new-pattern');
    const hintBtn = document.getElementById('pattern-hint');
    const feedbackArea = document.getElementById('pattern-feedback');
    
    let currentPattern = [];
    let missingIndices = [];
    let currentPatternType = null;
    
    // Pattern types
    const patternTypes = [
        { 
            name: 'Add 2', 
            generator: (start) => start + 2,
            hint: "Try adding 2 to each number to find the next one." 
        },
        { 
            name: 'Add 3', 
            generator: (start) => start + 3,
            hint: "Try adding 3 to each number to find the next one." 
        },
        { 
            name: 'Add 5', 
            generator: (start) => start + 5,
            hint: "Try adding 5 to each number to find the next one." 
        },
        { 
            name: 'Double', 
            generator: (start) => start * 2,
            hint: "Try doubling each number to find the next one." 
        },
        { 
            name: 'Square', 
            generator: (index, start) => (start + index) * (start + index),
            hint: "These are related to square numbers. Look carefully at how they grow!" 
        }
    ];
    
    // Generate a sequence based on a pattern
    function generatePattern() {
        // Select a random pattern type
        currentPatternType = patternTypes[Math.floor(Math.random() * patternTypes.length)];
        
        // Generate the full sequence
        const startValue = Math.floor(Math.random() * 5) + 1; // Start with 1-5
        currentPattern = [startValue];
        
        for (let i = 1; i < 8; i++) {
            if (currentPatternType.name === 'Square') {
                currentPattern.push(currentPatternType.generator(i, startValue));
            } else {
                currentPattern.push(currentPatternType.generator(currentPattern[i-1]));
            }
        }
        
        // Determine which positions to leave blank (2-3 blanks)
        missingIndices = [];
        const blanksCount = Math.floor(Math.random() * 2) + 2; // 2-3 blanks
        
        while (missingIndices.length < blanksCount) {
            const index = Math.floor(Math.random() * 6) + 1; // Don't make the first one blank
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
                input.type = 'number';
                input.className = 'pattern-input';
                input.setAttribute('data-index', index);
                input.min = 0;
                input.max = 999;
                numberElement.appendChild(input);
            } else {
                numberElement.textContent = number;
            }
            
            patternSequence.appendChild(numberElement);
        });
        
        // Clear any previous feedback and hints
        if (feedbackArea) feedbackArea.textContent = '';
        
        // Hide any existing hint text
        const hintText = document.getElementById('pattern-hint-text');
        if (hintText) {
            hintText.style.display = 'none';
        }
    }
    
    // Show hint for the current pattern
    function showHint() {
        if (!currentPatternType) return;
        
        let hintText = document.getElementById('pattern-hint-text');
        
        if (!hintText) {
            hintText = document.createElement('div');
            hintText.id = 'pattern-hint-text';
            hintText.className = 'pattern-hint-text';
            document.querySelector('.pattern-game').appendChild(hintText);
        }
        
        hintText.textContent = currentPatternType.hint;
        hintText.style.display = 'block';
    }
    
    // Check if the user's inputs match the pattern
    function checkPattern() {
        let allCorrect = true;
        const inputs = document.querySelectorAll('.pattern-input');
        
        inputs.forEach(input => {
            const index = parseInt(input.getAttribute('data-index'));
            const userAnswer = parseInt(input.value);
            
            if (userAnswer === currentPattern[index]) {
                input.classList.add('correct-input');
                input.classList.remove('incorrect-input');
            } else {
                input.classList.add('incorrect-input');
                input.classList.remove('correct-input');
                allCorrect = false;
            }
        });
        
        // Provide feedback
        feedbackArea.textContent = allCorrect ? 
            'Great job! You found the pattern!' : 
            'Some numbers don\'t match the pattern. Try again!';
        feedbackArea.className = 'pattern-feedback ' + (allCorrect ? 'correct-feedback' : 'incorrect-feedback');
        
        // If all correct, reveal the pattern rule
        if (allCorrect && currentPatternType) {
            const patternRule = document.createElement('p');
            patternRule.className = 'pattern-rule';
            patternRule.textContent = `Pattern Rule: ${currentPatternType.name}`;
            feedbackArea.appendChild(patternRule);
        }
    }
    
    // Event listeners
    checkBtn.addEventListener('click', checkPattern);
    newPatternBtn.addEventListener('click', generatePattern);
    if (hintBtn) hintBtn.addEventListener('click', showHint);
    
    // Initialize the activity
    generatePattern();
}
