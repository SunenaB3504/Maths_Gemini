// Level 3: Double Digit Addition

// Track question progress and score
let questionCount = 0;
let totalQuestions = 10;
let score = 0;
let currentProblem = null;

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
    
    // Generate two random two-digit numbers
    const num1 = Math.floor(Math.random() * 90) + 10; // 10-99
    const num2 = Math.floor(Math.random() * 90) + 10; // 10-99
    
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
            <h4>Add these numbers:</h4>
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
        <button id="show-blocks" class="visual-btn">Show Blocks</button>
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
        const num1Ones = num1 % 10;
        const num1Tens = Math.floor(num1 / 10);
        const num2Ones = num2 % 10;
        const num2Tens = Math.floor(num2 / 10);
        
        const onesSum = num1Ones + num2Ones;
        const onesDigit = onesSum % 10;
        const onesCarry = Math.floor(onesSum / 10);
        
        const tensSum = num1Tens + num2Tens + onesCarry;
        
        const hintText = `
            <p>To add ${num1} and ${num2}, break them into tens and ones:</p>
            <p>${num1} = ${num1Tens} tens + ${num1Ones} ones</p>
            <p>${num2} = ${num2Tens} tens + ${num2Ones} ones</p>
            <p>Step 1: Add the ones: ${num1Ones} + ${num2Ones} = ${onesSum}</p>
            ${onesCarry ? `<p>Since ${onesSum} > 9, put ${onesDigit} in the ones place and carry ${onesCarry} to the tens column</p>` : ''}
            <p>Step 2: Add the tens: ${num1Tens} + ${num2Tens}${onesCarry ? ` + ${onesCarry} (carry)` : ''} = ${tensSum}</p>
            <p>Step 3: Put them together: ${tensSum}${onesDigit} = ${tensSum * 10 + onesDigit}</p>
        `;
        window.additionTools.showHint(hintText);
    });
    
    // Show blocks button
    document.getElementById('show-blocks').addEventListener('click', function() {
        window.additionTools.initBlockBuilder(num1, num2);
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
            <p>Hint: Add the ones first, then the tens</p>
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
                <p>Great job! You've completed Level 3: Double Digit Addition</p>
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
        return '<p>Amazing! You\'re a double-digit addition master! 🌟</p>';
    } else if (percentage >= 70) {
        return '<p>Great job! You\'re getting really good with double-digit addition! 👍</p>';
    } else if (percentage >= 50) {
        return '<p>Good effort! With a little more practice, you\'ll master double-digit addition! 💪</p>';
    } else {
        return '<p>Keep practicing! Double-digit addition takes time to master. You can do it! 🤗</p>';
    }
}
