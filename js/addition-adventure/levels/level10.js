// Level 10: Missing Number in 4-Digit Addition

// Track question progress and score
let questionCount = 0;
let totalQuestions = 10;
let score = 0;
let currentProblem = null;

// Problem types
const PROBLEM_TYPES = {
    MISSING_FIRST: 'missing_first',
    MISSING_SECOND: 'missing_second',
    MISSING_SUM: 'missing_sum'
};

export function generateProblem(problemContainer, inputArea, feedbackArea) {
    // Clear previous feedback
    feedbackArea.innerHTML = '';
    
    // Hide hint container from previous question
    if (window.additionTools) {
        const hintContainer = document.getElementById('hint-container');
        
        if (hintContainer) hintContainer.style.display = 'none';
    }
    
    // Select problem type randomly, but favor missing addends more than missing sums
    const problemTypeChoices = [
        PROBLEM_TYPES.MISSING_FIRST,
        PROBLEM_TYPES.MISSING_FIRST,
        PROBLEM_TYPES.MISSING_SECOND,
        PROBLEM_TYPES.MISSING_SECOND,
        PROBLEM_TYPES.MISSING_SUM
    ];
    const problemType = problemTypeChoices[Math.floor(Math.random() * problemTypeChoices.length)];
    
    // Generate four-digit numbers for the problem
    const num1 = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
    const num2 = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
    const sum = num1 + num2;
    
    // Save current problem
    currentProblem = {
        type: problemType,
        num1: num1,
        num2: num2,
        sum: sum,
        missingValue: null
    };
    
    // Set the missing value based on problem type
    switch (problemType) {
        case PROBLEM_TYPES.MISSING_FIRST:
            currentProblem.missingValue = num1;
            break;
        case PROBLEM_TYPES.MISSING_SECOND:
            currentProblem.missingValue = num2;
            break;
        case PROBLEM_TYPES.MISSING_SUM:
            currentProblem.missingValue = sum;
            break;
    }
    
    // Update question counter
    questionCount++;
    
    // Create the problem display based on problem type
    let problemHTML = '';
    
    switch (problemType) {
        case PROBLEM_TYPES.MISSING_FIRST:
            problemHTML = `
                <div class="missing-number-problem">
                    <span class="missing-box">?</span> + ${num2.toLocaleString()} = ${sum.toLocaleString()}
                </div>
            `;
            break;
        case PROBLEM_TYPES.MISSING_SECOND:
            problemHTML = `
                <div class="missing-number-problem">
                    ${num1.toLocaleString()} + <span class="missing-box">?</span> = ${sum.toLocaleString()}
                </div>
            `;
            break;
        case PROBLEM_TYPES.MISSING_SUM:
            problemHTML = `
                <div class="missing-number-problem">
                    ${num1.toLocaleString()} + ${num2.toLocaleString()} = <span class="missing-box">?</span>
                </div>
            `;
            break;
    }
    
    problemContainer.innerHTML = `
        <div class="problem-container">
            <div class="progress-tracker">
                <div class="score-display">Score: <span id="score-value">${score}</span> points</div>
                <div class="question-counter">Question <span id="current-question">${questionCount}</span> of <span id="total-questions">${totalQuestions}</span></div>
            </div>
            <h4>Find the missing number:</h4>
            ${problemHTML}
        </div>
    `;
    
    // Create the input area
    inputArea.innerHTML = `
        <div class="answer-container">
            <input type="number" id="user-answer" class="answer-input" min="0" max="99999">
            <button id="check-answer" class="check-btn">Check Answer</button>
        </div>
        <button id="show-hint" class="hint-btn">Show Hint</button>
        <button id="show-steps" class="steps-btn">Show Steps</button>
    `;
    
    // Check answer button
    document.getElementById('check-answer').addEventListener('click', function() {
        checkAnswer(currentProblem.missingValue, feedbackArea, problemContainer, inputArea);
    });
    
    // Enter key to check answer
    document.getElementById('user-answer').addEventListener('keyup', function(event) {
        if (event.key === "Enter") {
            checkAnswer(currentProblem.missingValue, feedbackArea, problemContainer, inputArea);
        }
    });
    
    // Show hint button
    document.getElementById('show-hint').addEventListener('click', function() {
        let hintText = '';
        
        switch (currentProblem.type) {
            case PROBLEM_TYPES.MISSING_FIRST:
                hintText = `
                    <div class="hint-content">
                        <p>To find the missing first addend, subtract the known addend from the sum:</p>
                        <p>${currentProblem.sum.toLocaleString()} - ${currentProblem.num2.toLocaleString()} = ?</p>
                        <p>This is a 4-digit subtraction problem that may require regrouping (borrowing).</p>
                    </div>
                `;
                break;
            case PROBLEM_TYPES.MISSING_SECOND:
                hintText = `
                    <div class="hint-content">
                        <p>To find the missing second addend, subtract the known addend from the sum:</p>
                        <p>${currentProblem.sum.toLocaleString()} - ${currentProblem.num1.toLocaleString()} = ?</p>
                        <p>Be careful with regrouping (borrowing) when working with these large numbers.</p>
                    </div>
                `;
                break;
            case PROBLEM_TYPES.MISSING_SUM:
                hintText = `
                    <div class="hint-content">
                        <p>To find the missing sum, add the two addends:</p>
                        <p>${currentProblem.num1.toLocaleString()} + ${currentProblem.num2.toLocaleString()} = ?</p>
                        <p>Remember to carry when digits in the same place value add up to 10 or more.</p>
                    </div>
                `;
                break;
        }
        
        window.additionTools.showHint(hintText);
    });
    
    // Show steps button
    document.getElementById('show-steps').addEventListener('click', function() {
        let stepsHTML = '';
        
        switch (currentProblem.type) {
            case PROBLEM_TYPES.MISSING_FIRST:
            case PROBLEM_TYPES.MISSING_SECOND:
                const known = currentProblem.type === PROBLEM_TYPES.MISSING_FIRST ? 
                    currentProblem.num2 : currentProblem.num1;
                
                stepsHTML = `
                    <div class="steps-content">
                        <h5>Step-by-Step Solution:</h5>
                        <p>1. To find the missing addend, we need to subtract:</p>
                        <p>${currentProblem.sum.toLocaleString()} - ${known.toLocaleString()} = ?</p>
                        
                        <p>2. Set up the subtraction problem with place values aligned:</p>
                        <div class="aligned-subtraction-problem">
                            <div class="problem-row">
                                <span class="digit">${Math.floor(currentProblem.sum/1000)}</span>
                                <span class="digit">${Math.floor((currentProblem.sum % 1000)/100)}</span>
                                <span class="digit">${Math.floor((currentProblem.sum % 100)/10)}</span>
                                <span class="digit">${currentProblem.sum % 10}</span>
                            </div>
                            <div class="problem-row">
                                <span class="operator">-</span>
                                <span class="digit">${Math.floor(known/1000)}</span>
                                <span class="digit">${Math.floor((known % 1000)/100)}</span>
                                <span class="digit">${Math.floor((known % 100)/10)}</span>
                                <span class="digit">${known % 10}</span>
                            </div>
                            <div class="problem-row line"></div>
                            <div class="problem-row">
                                <span class="digit">${Math.floor(currentProblem.missingValue/1000)}</span>
                                <span class="digit">${Math.floor((currentProblem.missingValue % 1000)/100)}</span>
                                <span class="digit">${Math.floor((currentProblem.missingValue % 100)/10)}</span>
                                <span class="digit">${currentProblem.missingValue % 10}</span>
                            </div>
                        </div>
                        
                        <p>3. The missing number is ${currentProblem.missingValue.toLocaleString()}</p>
                        <p>4. Verify: ${currentProblem.missingValue.toLocaleString()} + ${known.toLocaleString()} = ${currentProblem.sum.toLocaleString()} ✓</p>
                    </div>
                `;
                break;
                
            case PROBLEM_TYPES.MISSING_SUM:
                stepsHTML = `
                    <div class="steps-content">
                        <h5>Step-by-Step Solution:</h5>
                        <p>1. To find the missing sum, we need to add:</p>
                        <p>${currentProblem.num1.toLocaleString()} + ${currentProblem.num2.toLocaleString()} = ?</p>
                        
                        <p>2. Set up the addition problem with place values aligned:</p>
                        <div class="aligned-addition-problem">
                            <div class="problem-row">
                                <span class="digit">${Math.floor(currentProblem.num1/1000)}</span>
                                <span class="digit">${Math.floor((currentProblem.num1 % 1000)/100)}</span>
                                <span class="digit">${Math.floor((currentProblem.num1 % 100)/10)}</span>
                                <span class="digit">${currentProblem.num1 % 10}</span>
                            </div>
                            <div class="problem-row">
                                <span class="operator">+</span>
                                <span class="digit">${Math.floor(currentProblem.num2/1000)}</span>
                                <span class="digit">${Math.floor((currentProblem.num2 % 1000)/100)}</span>
                                <span class="digit">${Math.floor((currentProblem.num2 % 100)/10)}</span>
                                <span class="digit">${currentProblem.num2 % 10}</span>
                            </div>
                            <div class="problem-row line"></div>
                            <div class="problem-row">
                                <span class="digit">${Math.floor(currentProblem.sum/1000)}</span>
                                <span class="digit">${Math.floor((currentProblem.sum % 1000)/100)}</span>
                                <span class="digit">${Math.floor((currentProblem.sum % 100)/10)}</span>
                                <span class="digit">${currentProblem.sum % 10}</span>
                            </div>
                        </div>
                        
                        <p>3. The missing sum is ${currentProblem.sum.toLocaleString()}</p>
                    </div>
                `;
                break;
        }
        
        window.additionTools.showHint(stepsHTML);
    });
    
    // Focus on answer input
    document.getElementById('user-answer').focus();
}

function checkAnswer(correctAnswer, feedbackArea, problemContainer, inputArea) {
    const userAnswer = parseInt(document.getElementById('user-answer').value);
    
    if (isNaN(userAnswer)) {
        feedbackArea.innerHTML = '<p class="error">Please enter a number!</p>';
        return;
    }
    
    if (userAnswer === correctAnswer) {
        // Update score
        score += 10;
        document.getElementById('score-value').textContent = score;
        
        feedbackArea.innerHTML = `
            <div class="success-feedback">
                <p class="success">Correct! ${correctAnswer.toLocaleString()} is right! 🎉</p>
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
            <p>Hint: Be careful with the arithmetic operations. For missing addends, use subtraction. For missing sums, use addition.</p>
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
                <p>Congratulations! You've completed Level 10: Missing Number in 4-Digit Addition</p>
                <p>This is the most advanced addition level - you're a math champion!</p>
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
        return '<p>Amazing! You\'ve mastered missing number problems with 4-digit addition! 🌟</p>';
    } else if (percentage >= 70) {
        return '<p>Great job! Your skills with large missing number problems are impressive! 👍</p>';
    } else if (percentage >= 50) {
        return '<p>Good effort! With more practice, you\'ll master these challenging problems! 💪</p>';
    } else {
        return '<p>Keep practicing! 4-digit missing number problems are tough, but you\'ll get there! 🤗</p>';
    }
}
