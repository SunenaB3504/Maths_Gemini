// Number Patterns Activity

export function initNumberPatterns() {
    console.log('Initializing Number Patterns activity');
    
    // DOM Elements
    const patternSequence = document.getElementById('pattern-sequence');
    const checkPatternButton = document.getElementById('check-pattern');
    const patternHintButton = document.getElementById('pattern-hint');
    const newPatternButton = document.getElementById('new-pattern');
    const patternFeedback = document.getElementById('pattern-feedback');
    
    // Pattern templates
    const patternTemplates = [
        {
            name: 'Add 2',
            generate: () => {
                const start = Math.floor(Math.random() * 10) + 1;
                return {
                    sequence: [start, start+2, start+4, start+6, start+8, start+10],
                    rule: 'Add 2 to each number',
                    step: 2
                };
            }
        },
        {
            name: 'Add 3',
            generate: () => {
                const start = Math.floor(Math.random() * 10) + 1;
                return {
                    sequence: [start, start+3, start+6, start+9, start+12, start+15],
                    rule: 'Add 3 to each number',
                    step: 3
                };
            }
        },
        {
            name: 'Add 5',
            generate: () => {
                const start = Math.floor(Math.random() * 10) + 1;
                return {
                    sequence: [start, start+5, start+10, start+15, start+20, start+25],
                    rule: 'Add 5 to each number',
                    step: 5
                };
            }
        },
        {
            name: 'Add 10',
            generate: () => {
                const start = Math.floor(Math.random() * 20) + 1;
                return {
                    sequence: [start, start+10, start+20, start+30, start+40, start+50],
                    rule: 'Add 10 to each number',
                    step: 10
                };
            }
        },
        {
            name: 'Multiply by 2',
            generate: () => {
                const start = Math.floor(Math.random() * 5) + 1;
                return {
                    sequence: [start, start*2, start*4, start*8, start*16, start*32],
                    rule: 'Multiply each number by 2',
                    step: 'multiply by 2'
                };
            }
        }
    ];
    
    // Game state
    let currentPattern = null;
    let missingIndices = [];
    
    // Initialize game
    generateNewPattern();
    
    // Add event listeners
    checkPatternButton.addEventListener('click', checkPattern);
    patternHintButton.addEventListener('click', showHint);
    newPatternButton.addEventListener('click', generateNewPattern);
    
    // Function to generate a new pattern
    function generateNewPattern() {
        // Clear feedback
        patternFeedback.innerHTML = '';
        
        // Select a random pattern template
        const templateIndex = Math.floor(Math.random() * patternTemplates.length);
        const template = patternTemplates[templateIndex];
        
        // Generate pattern based on template
        const pattern = template.generate();
        currentPattern = pattern;
        
        // Decide which indices to hide (2-3 random positions)
        missingIndices = [];
        const numToHide = Math.random() < 0.5 ? 2 : 3;
        
        while (missingIndices.length < numToHide) {
            const index = Math.floor(Math.random() * pattern.sequence.length);
            // Don't hide first or last number, and don't duplicate
            if (index !== 0 && index !== pattern.sequence.length - 1 && !missingIndices.includes(index)) {
                missingIndices.push(index);
            }
        }
        
        // Create the pattern display
        patternSequence.innerHTML = '';
        
        pattern.sequence.forEach((number, index) => {
            const numberBox = document.createElement('div');
            numberBox.className = 'pattern-number';
            
            if (missingIndices.includes(index)) {
                // Create input for missing number
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'pattern-input';
                input.setAttribute('data-index', index);
                numberBox.appendChild(input);
            } else {
                // Display the number
                numberBox.textContent = number;
            }
            
            patternSequence.appendChild(numberBox);
        });
    }
    
    // Function to check the pattern
    function checkPattern() {
        let allCorrect = true;
        
        // Check each missing number
        missingIndices.forEach(index => {
            const input = document.querySelector(`input[data-index="${index}"]`);
            const userAnswer = parseInt(input.value);
            const correctAnswer = currentPattern.sequence[index];
            
            if (userAnswer === correctAnswer) {
                input.classList.remove('incorrect');
                input.classList.add('correct');
            } else {
                input.classList.remove('correct');
                input.classList.add('incorrect');
                allCorrect = false;
            }
        });
        
        // Display feedback
        if (allCorrect) {
            patternFeedback.innerHTML = '<p class="success">Great job! You found all the missing numbers! 🎉</p>';
        } else {
            patternFeedback.innerHTML = '<p class="error">Not all answers are correct. Try again!</p>';
        }
    }
    
    // Function to show hint
    function showHint() {
        patternFeedback.innerHTML = `<p class="hint">Pattern rule: ${currentPattern.rule}</p>`;
    }
}
