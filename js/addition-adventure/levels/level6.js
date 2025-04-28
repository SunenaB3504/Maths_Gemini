// Level 6: Properties of Addition

// Track question progress and score
let questionCount = 0;
let totalQuestions = 10;
let score = 0;
let currentProblem = null;

// Problem types for properties
const problemTypes = [
    { 
        type: 'commutative',
        title: 'Commutative Property',
        description: 'The order of numbers in addition doesn\'t change the result.',
        formula: 'a + b = b + a'
    },
    { 
        type: 'associative',
        title: 'Associative Property',
        description: 'The grouping of numbers in addition doesn\'t change the result.',
        formula: '(a + b) + c = a + (b + c)'
    },
    { 
        type: 'identity',
        title: 'Identity Property',
        description: 'Adding zero to a number gives the same number.',
        formula: 'a + 0 = a'
    }
];

// Problem bank for practice
const problems = [
    {
        type: 'commutative',
        question: 'What property is shown in 8 + 12 = 12 + 8?',
        options: ['Commutative Property', 'Associative Property', 'Identity Property'],
        correct: 0,
        explanation: 'The commutative property states that you can change the order of the numbers you add and still get the same result. 8 + 12 = 12 + 8 = 20'
    },
    {
        type: 'associative',
        question: 'What property is shown in (5 + 3) + 7 = 5 + (3 + 7)?',
        options: ['Identity Property', 'Associative Property', 'Commutative Property'],
        correct: 1,
        explanation: 'The associative property states that you can group numbers differently when adding three or more numbers and still get the same result. (5 + 3) + 7 = 8 + 7 = 15 and 5 + (3 + 7) = 5 + 10 = 15'
    },
    {
        type: 'identity',
        question: 'What property is shown in 24 + 0 = 24?',
        options: ['Associative Property', 'Commutative Property', 'Identity Property'],
        correct: 2,
        explanation: 'The identity property states that adding zero to any number gives the original number. 24 + 0 = 24'
    },
    {
        type: 'commutative',
        question: 'Which shows the commutative property?',
        options: ['13 + 7 = 7 + 13', '(4 + 2) + 3 = 4 + (2 + 3)', '15 + 0 = 15'],
        correct: 0,
        explanation: 'The commutative property involves changing the order of numbers: 13 + 7 = 7 + 13 = 20'
    },
    {
        type: 'associative',
        question: 'Which shows the associative property?',
        options: ['9 + 0 = 9', '(6 + 4) + 5 = 6 + (4 + 5)', '7 + 8 = 8 + 7'],
        correct: 1,
        explanation: 'The associative property involves changing the grouping of numbers: (6 + 4) + 5 = 10 + 5 = 15 and 6 + (4 + 5) = 6 + 9 = 15'
    },
    {
        type: 'identity',
        question: 'Which shows the identity property of addition?',
        options: ['7 + 7 = 14', '0 + 36 = 36', '(2 + 6) + 3 = 2 + (6 + 3)'],
        correct: 1,
        explanation: 'The identity property involves adding zero: 0 + 36 = 36'
    },
    {
        type: 'application',
        question: 'To make this calculation easier: 35 + 25 + 15, which property would help?',
        options: ['Identity Property', 'Commutative Property', 'Associative Property'],
        correct: 2,
        explanation: 'The associative property helps: 35 + 25 + 15 = 35 + (25 + 15) = 35 + 40 = 75. Adding 25 + 15 first gives a nice number 40'
    },
    {
        type: 'application',
        question: 'If you know that 16 + 28 = 44, what else must be true?',
        options: ['28 + 16 = 44', '16 + 0 = 16', '(1 + 6) + 28 = 1 + (6 + 28)'],
        correct: 0,
        explanation: 'By the commutative property, if 16 + 28 = 44, then 28 + 16 = 44 as well'
    },
    {
        type: 'application',
        question: 'To add 97 + 68, you could first add 97 + 70 and then subtract 2. Which property allows you to do this?',
        options: ['Identity Property', 'Associative Property', 'Commutative Property'],
        correct: 1,
        explanation: 'The associative property allows you to regroup: 97 + 68 = 97 + (70 - 2) = (97 + 70) - 2 = 167 - 2 = 165'
    },
    {
        type: 'identity',
        question: 'Which equation shows that the sum of any number and zero is always that number?',
        options: ['5 + 5 = 10', 'n + 0 = n', '4 + 6 = 6 + 4'],
        correct: 1,
        explanation: 'The identity property is shown by n + 0 = n, which means the sum of any number and zero is always that number'
    },
    {
        type: 'commutative',
        question: 'In the equation 12 + 43 = 43 + 12, what stays the same?',
        options: ['The order of the numbers', 'The sum', 'The difference'],
        correct: 1,
        explanation: 'In the commutative property, the order changes but the sum stays the same: 12 + 43 = 55 and 43 + 12 = 55'
    },
    {
        type: 'associative',
        question: 'The associative property allows us to:',
        options: ['Add zero to any number', 'Change the order of numbers', 'Change the grouping of numbers'],
        correct: 2,
        explanation: 'The associative property allows us to change how we group the numbers when adding: (a + b) + c = a + (b + c)'
    }
];

export function generateProblem(problemContainer, inputArea, feedbackArea) {
    // Clear previous feedback
    feedbackArea.innerHTML = '';
    
    // Hide hint container from previous question
    if (window.additionTools) {
        const hintContainer = document.getElementById('hint-container');
        
        if (hintContainer) hintContainer.style.display = 'none';
    }
    
    // Select a random problem
    const problemIndex = Math.floor(Math.random() * problems.length);
    const problem = problems[problemIndex];
    
    // Save current problem
    currentProblem = {
        index: problemIndex,
        type: problem.type,
        question: problem.question,
        options: problem.options,
        correct: problem.correct,
        explanation: problem.explanation
    };
    
    // Update question counter
    questionCount++;
    
    // Create the problem display
    problemContainer.innerHTML = `
        <div class="problem-container">
            <div class="progress-tracker">
                <div class="score-display">Score: <span id="score-value">${score}</span> points</div>
                <div class="question-counter">Question <span id="current-question">${questionCount}</span> of <span id="total-questions">${totalQuestions}</span></div>
            </div>
            <div class="property-problem">
                <h4>${problem.question}</h4>
                <div class="property-options">
                    ${problem.options.map((option, index) => `
                        <div class="property-option">
                            <input type="radio" name="property-answer" id="option-${index}" value="${index}">
                            <label for="option-${index}">${option}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Create the input area
    inputArea.innerHTML = `
        <div class="answer-container">
            <button id="check-answer" class="check-btn">Check Answer</button>
        </div>
        <button id="show-hint" class="hint-btn">Show Hint</button>
    `;
    
    // Check answer button
    document.getElementById('check-answer').addEventListener('click', function() {
        checkAnswer(currentProblem.correct, feedbackArea, problemContainer, inputArea);
    });
    
    // Show hint button
    document.getElementById('show-hint').addEventListener('click', function() {
        const propertyInfo = problemTypes.find(pt => pt.type === problem.type) || problemTypes[0];
        const hintText = `
            <div class="property-hint">
                <h5>${propertyInfo.title}</h5>
                <p>${propertyInfo.description}</p>
                <p class="formula">${propertyInfo.formula}</p>
                <p>Try to see how this property applies to the question.</p>
            </div>
        `;
        window.additionTools.showHint(hintText);
    });
}

function checkAnswer(correctIndex, feedbackArea, problemContainer, inputArea) {
    // Get selected option
    const selectedOption = document.querySelector('input[name="property-answer"]:checked');
    
    if (!selectedOption) {
        feedbackArea.innerHTML = '<p class="error">Please select an answer!</p>';
        return;
    }
    
    const userAnswerIndex = parseInt(selectedOption.value);
    
    if (userAnswerIndex === correctIndex) {
        // Update score
        score += 10;
        document.getElementById('score-value').textContent = score;
        
        feedbackArea.innerHTML = `
            <div class="success-feedback">
                <p class="success">Correct! 🎉</p>
                <p>${currentProblem.explanation}</p>
                <p>You earned 10 points!</p>
            </div>
        `;
        
        // Check if we've completed all questions
        if (questionCount >= totalQuestions) {
            showFinalResults(feedbackArea, problemContainer, inputArea);
        } else {
            // Show next question button
            feedbackArea.innerHTML += `
                <button id="next-question" class="next-btn">Next Question</button>
            `;
            document.getElementById('next-question').addEventListener('click', function() {
                generateProblem(problemContainer, inputArea, feedbackArea);
            });
        }
    } else {
        feedbackArea.innerHTML = `
            <p class="error">Not quite right. Try again!</p>
            <p>Hint: Think about how the numbers are arranged in the example.</p>
        `;
    }
}

function showFinalResults(feedbackArea, problemContainer, inputArea) {
    // Calculate percentage score
    const percentage = Math.floor((score / (totalQuestions * 10)) * 100);
    
    // Clear problem and input areas
    problemContainer.innerHTML = '';
    inputArea.innerHTML = '';
    
    // Display final results
    feedbackArea.innerHTML = `
        <div class="final-results">
            <h3>Level Complete! 🏆</h3>
            <div class="results-content">
                <p>Great job! You've completed Level 6: Properties of Addition</p>
                <div class="score-summary">
                    <p>Your score: <strong>${score}</strong> points out of ${totalQuestions * 10} possible</p>
                    <p>Percentage: <strong>${percentage}%</strong></p>
                </div>
                <div class="stars-earned">
                    ${getStarsHTML(percentage)}
                </div>
                <div class="level-message">
                    ${getLevelMessage(percentage)}
                </div>
            </div>
            <button id="retry-level" class="retry-btn">Try Again</button>
            <button id="return-to-menu" class="menu-btn">Return to Level Menu</button>
        </div>
    `;
    
    // Add event listeners to buttons
    document.getElementById('retry-level').addEventListener('click', function() {
        // Reset counters
        questionCount = 0;
        score = 0;
        // Start fresh
        generateProblem(problemContainer, inputArea, feedbackArea);
    });
    
    document.getElementById('return-to-menu').addEventListener('click', function() {
        // Reset counters
        questionCount = 0;
        score = 0;
        // Clear areas
        problemContainer.innerHTML = '';
        inputArea.innerHTML = '';
        feedbackArea.innerHTML = '';
    });
}

function getStarsHTML(percentage) {
    if (percentage >= 90) {
        return '<span class="star">⭐</span><span class="star">⭐</span><span class="star">⭐</span>';
    } else if (percentage >= 70) {
        return '<span class="star">⭐</span><span class="star">⭐</span>';
    } else if (percentage >= 50) {
        return '<span class="star">⭐</span>';
    } else {
        return '<span class="try-again">Keep practicing!</span>';
    }
}

function getLevelMessage(percentage) {
    if (percentage >= 90) {
        return '<p>Amazing! You\'re a math properties master! 🌟</p>';
    } else if (percentage >= 70) {
        return '<p>Great job! You\'re understanding addition properties well! 👍</p>';
    } else if (percentage >= 50) {
        return '<p>Good effort! With more practice, you\'ll master these properties! 💪</p>';
    } else {
        return '<p>Keep practicing! Understanding properties takes time. You can do it! 🤗</p>';
    }
}
