// Level 4: Addition with Carrying

// Track question progress and score
let questionCount = 0;
let totalQuestions = 10;
let score = 0;
let currentProblem = null;

// Helper function to check if carrying is required for addition
function requiresCarrying(num1, num2) {
    // Convert numbers to strings to check individual digits
    const str1 = num1.toString();
    const str2 = num2.toString();
    
    // Get the maximum length of both numbers
    const maxLength = Math.max(str1.length, str2.length);
    
    // Pad the shorter number with leading zeros
    const paddedStr1 = str1.padStart(maxLength, '0');
    const paddedStr2 = str2.padStart(maxLength, '0');
    
    let carry = 0;
    
    // Check each digit position from right to left
    for (let i = maxLength - 1; i >= 0; i--) {
        const digit1 = parseInt(paddedStr1[i]);
        const digit2 = parseInt(paddedStr2[i]);
        
        // Check if adding these digits plus any previous carry results in a new carry
        if (digit1 + digit2 + carry >= 10) {
            return true;
        }
        
        // Update carry for next iteration
        carry = (digit1 + digit2 + carry >= 10) ? 1 : 0;
    }
    
    return false;
}

export function generateProblem(problemContainer, inputArea, feedbackArea) {
    // Clear previous feedback
    feedbackArea.innerHTML = '';
    
    // Hide hint container and block builder from previous question
    if (window.additionTools) {
        const hintContainer = document.getElementById('hint-container');
        const blockBuilder = document.getElementById('block-builder');
        
        if (hintContainer) hintContainer.style.display = 'none';
        if (blockBuilder) blockBuilder.style.display = 'none';
    }
    
    // Generate numbers that will require carrying
    let num1, num2;
    do {
        // Generate two-digit numbers
        num1 = Math.floor(Math.random() * 90) + 10; // 10-99
        num2 = Math.floor(Math.random() * 90) + 10; // 10-99
        
        // Check if ones digits sum to 10 or more (requires carrying)
        const requiresCarrying = (num1 % 10 + num2 % 10) >= 10;
    } while (!requiresCarrying);
    
    // Save current problem
    currentProblem = {
        num1: num1,
        num2: num2,
        answer: num1 + num2
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
            <h4>Add these numbers (remember to carry):</h4>
            <div class="addition-problem">
                <div class="number">${num1}</div>
                <div class="number">+${num2}</div>
                <div class="line"></div>
            </div>
        </div>
    `;
    
    // Create the input area
    inputArea.innerHTML = `
        <div class="answer-container">
            <input type="number" id="user-answer" class="answer-input" min="0" max="999">
            <button id="check-answer" class="check-btn">Check Answer</button>
        </div>
        <button id="show-hint" class="hint-btn">Show Hint</button>
        <button id="show-steps" class="steps-btn">Show Steps</button>
    `;
    
    // Check answer button
    document.getElementById('check-answer').addEventListener('click', function() {
        checkAnswer(currentProblem.answer, feedbackArea, problemContainer, inputArea);
    });
    
    // Enter key to check answer
    document.getElementById('user-answer').addEventListener('keyup', function(event) {
        if (event.key === "Enter") {
            checkAnswer(currentProblem.answer, feedbackArea, problemContainer, inputArea);
        }
    });
    
    // Show hint button
    document.getElementById('show-hint').addEventListener('click', function() {
        const onesDigit1 = num1 % 10;
        const tensDigit1 = Math.floor(num1 / 10);
        const onesDigit2 = num2 % 10;
        const tensDigit2 = Math.floor(num2 / 10);
        
        const onesSum = onesDigit1 + onesDigit2;
        const carry = onesSum >= 10 ? 1 : 0;
        const onesResult = onesSum % 10;
        
        const hintText = `
            <p>Start with the ones place:</p>
            <p>${onesDigit1} + ${onesDigit2} = ${onesSum}</p>
            <p>We write down ${onesResult} and carry the ${carry} to the tens place.</p>
            <p>Next, add the tens place (including the carry):</p>
            <p>${carry} + ${tensDigit1} + ${tensDigit2} = ${carry + tensDigit1 + tensDigit2}</p>
        `;
        window.additionTools.showHint(hintText);
    });
    
    // Show steps button
    document.getElementById('show-steps').addEventListener('click', function() {
        const onesDigit1 = num1 % 10;
        const tensDigit1 = Math.floor(num1 / 10);
        const onesDigit2 = num2 % 10;
        const tensDigit2 = Math.floor(num2 / 10);
        
        const onesSum = onesDigit1 + onesDigit2;
        const carry = onesSum >= 10 ? 1 : 0;
        const onesResult = onesSum % 10;
        const tensResult = carry + tensDigit1 + tensDigit2;
        
        const stepsHTML = `
            <div class="step-by-step">
                <h5>Step-by-Step Solution:</h5>
                <div class="aligned-addition-problem">
                    <div class="carry-container">
                        <span class="carry">${carry}</span><span class="empty-digit"></span>
                    </div>
                    <div class="problem-row">
                        <span class="digit">${tensDigit1}</span><span class="digit">${onesDigit1}</span>
                    </div>
                    <div class="problem-row">
                        <span class="operator">+</span><span class="digit">${tensDigit2}</span><span class="digit">${onesDigit2}</span>
                    </div>
                    <div class="problem-row line"></div>
                    <div class="problem-row">
                        <span class="digit">${tensResult}</span><span class="digit">${onesResult}</span>
                    </div>
                </div>
                <div class="step-explanation">
                    <p>1. Add ones: ${onesDigit1} + ${onesDigit2} = ${onesSum}</p>
                    <p>2. Write ${onesResult} in ones place, carry ${carry} to tens</p>
                    <p>3. Add tens with carry: ${carry} + ${tensDigit1} + ${tensDigit2} = ${tensResult}</p>
                    <p>4. Final answer: ${tensResult}${onesResult}</p>
                </div>
            </div>
        `;
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
                <p class="success">Correct! ${correctAnswer} is right! 🎉</p>
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
            <p>Hint: Remember to carry when digits add up to 10 or more!</p>
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
                <p>Great job! You've completed Level 4: Addition with Carrying</p>
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
        return '<p>Amazing! You\'re a carrying champion! 🌟</p>';
    } else if (percentage >= 70) {
        return '<p>Great job! You\'re getting really good with carrying! 👍</p>';
    } else if (percentage >= 50) {
        return '<p>Good effort! With more practice, you\'ll master carrying! 💪</p>';
    } else {
        return '<p>Keep practicing! Carrying takes time to master. You can do it! 🤗</p>';
    }
}
