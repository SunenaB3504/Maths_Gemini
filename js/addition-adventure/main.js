// Addition Adventure Module - Main Controller

// Level configurations
const levels = {
    1: {
        title: "Single Digit Addition",
        description: "Practice adding single-digit numbers (0-9)"
    },
    2: {
        title: "Two Digits Addition",
        description: "Practice adding two-digit numbers without carrying"
    },
    3: {
        title: "Double Digits Addition",
        description: "Practice adding double-digit numbers without carrying"
    },
    4: {
        title: "Addition with Carrying",
        description: "Practice addition with carrying/regrouping"
    },
    5: {
        title: "Word Problems",
        description: "Solve addition word problems"
    },
    6: {
        title: "Properties of Addition",
        description: "Explore commutative and associative properties"
    },
    7: {
        title: "Four Digits Addition",
        description: "Practice adding large numbers without carrying"
    },
    8: {
        title: "4D Addition with Carrying",
        description: "Practice adding large numbers with carrying"
    }
};

// Initialize Addition Adventure module
export function initAdditionAdventure() {
    console.log('Initializing Addition Adventure module');
    
    // DOM Elements
    const levelButtons = document.querySelectorAll('.level-btn');
    const levelDescription = document.getElementById('level-description');
    const currentAdditionProblem = document.getElementById('current-addition-problem');
    const visualTools = document.getElementById('visual-tools');
    const inputArea = document.getElementById('input-area');
    const feedbackArea = document.getElementById('feedback-area');
    
    // Add click events for level buttons
    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const levelId = parseInt(this.getAttribute('data-level'));
            
            // Update active button
            levelButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update level description
            if (levels[levelId]) {
                levelDescription.textContent = levels[levelId].description;
                generateLevelContent(levelId, currentAdditionProblem, inputArea, feedbackArea);
            }
        });
    });
    
    console.log('Addition Adventure module initialized');
}

// Generate level content
function generateLevelContent(levelId, problemContainer, inputArea, feedbackArea) {
    // Clear previous content
    problemContainer.innerHTML = '';
    inputArea.innerHTML = '';
    feedbackArea.innerHTML = '';
    
    // Generate sample problems based on level
    switch(levelId) {
        case 1:
            generateSingleDigitProblem(problemContainer, inputArea);
            break;
        case 2:
        case 3:
            generateTwoDigitProblem(problemContainer, inputArea, levelId === 3);
            break;
        case 4:
            generateCarryingProblem(problemContainer, inputArea);
            break;
        case 5:
            generateWordProblem(problemContainer, inputArea);
            break;
        case 6:
            generatePropertiesProblem(problemContainer, inputArea);
            break;
        case 7:
        case 8:
            generateLargeNumberProblem(problemContainer, inputArea, levelId === 8);
            break;
        default:
            problemContainer.innerHTML = `<p>Level ${levelId} is coming soon!</p>`;
    }
    
    // Add a generic check button
    const checkButton = document.createElement('button');
    checkButton.textContent = 'Check Answer';
    checkButton.className = 'check-btn';
    checkButton.addEventListener('click', () => {
        feedbackArea.innerHTML = '<p class="success">Great job! You\'ve got it! 🎉</p>';
    });
    
    inputArea.appendChild(checkButton);
}

// Generate level 1 problem
function generateSingleDigitProblem(problemContainer, inputArea) {
    // Generate two random single-digit numbers
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    
    problemContainer.innerHTML = `
        <div class="problem">
            <h4>Add these numbers:</h4>
            <div class="addition-problem">
                <div class="number">${num1}</div>
                <div class="number">+${num2}</div>
                <div class="line"></div>
            </div>
        </div>
    `;
    
    inputArea.innerHTML = `
        <div class="answer-container">
            <input type="number" id="answer-input" class="answer-input">
        </div>
    `;
}

// Generate level 2/3 problem
function generateTwoDigitProblem(problemContainer, inputArea, isDouble) {
    const maxValue = isDouble ? 99 : 89;
    const num1 = Math.floor(Math.random() * maxValue) + 10;
    const num2 = Math.floor(Math.random() * maxValue) + 10;
    
    problemContainer.innerHTML = `
        <div class="problem">
            <h4>Add these numbers:</h4>
            <div class="addition-problem">
                <div class="number">${num1}</div>
                <div class="number">+${num2}</div>
                <div class="line"></div>
            </div>
        </div>
    `;
    
    inputArea.innerHTML = `
        <div class="answer-container">
            <input type="number" id="answer-input" class="answer-input">
        </div>
    `;
}

// Other level generators would be implemented similarly
function generateCarryingProblem(problemContainer, inputArea) {
    problemContainer.innerHTML = `<p>Addition with carrying practice coming soon!</p>`;
}

function generateWordProblem(problemContainer, inputArea) {
    problemContainer.innerHTML = `<p>Addition word problems coming soon!</p>`;
}

function generatePropertiesProblem(problemContainer, inputArea) {
    problemContainer.innerHTML = `<p>Properties of addition coming soon!</p>`;
}

function generateLargeNumberProblem(problemContainer, inputArea, withCarrying) {
    problemContainer.innerHTML = `<p>Large number addition ${withCarrying ? 'with' : 'without'} carrying coming soon!</p>`;
}
