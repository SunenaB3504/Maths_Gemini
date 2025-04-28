// Level 7: Four-Digit Addition

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
    
    // Generate two random four-digit numbers
    const num1 = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
    const num2 = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
    
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
            <h4>Add these four-digit numbers:</h4>
            <div class="four-digit-addition-problem">
                <div class="large-number">${num1.toLocaleString()}</div>
                <div class="large-number">+${num2.toLocaleString()}</div>
                <div class="line"></div>
            </div>
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
        const num1Tens = Math.floor((num1 % 100) / 10);
        const num1Hundreds = Math.floor((num1 % 1000) / 100);
        const num1Thousands = Math.floor(num1 / 1000);
        
        const num2Ones = num2 % 10;
        const num2Tens = Math.floor((num2 % 100) / 10);
        const num2Hundreds = Math.floor((num2 % 1000) / 100);
        const num2Thousands = Math.floor(num2 / 1000);
        
        const hintText = `
            <div class="place-value-hint">
                <h5>Break down the numbers by place value:</h5>
                <table class="hint-table">
                    <tr>
                        <th>Place</th>
                        <th>Thousands</th>
                        <th>Hundreds</th>
                        <th>Tens</th>
                        <th>Ones</th>
                    </tr>
                    <tr>
                        <td>First number</td>
                        <td>${num1Thousands}</td>
                        <td>${num1Hundreds}</td>
                        <td>${num1Tens}</td>
                        <td>${num1Ones}</td>
                    </tr>
                    <tr>
                        <td>Second number</td>
                        <td>${num2Thousands}</td>
                        <td>${num2Hundreds}</td>
                        <td>${num2Tens}</td>
                        <td>${num2Ones}</td>
                    </tr>
                </table>
                <p>Remember to:</p>
                <ol>
                    <li>Start with the ones place (${num1Ones} + ${num2Ones})</li>
                    <li>Move to the tens place (${num1Tens} + ${num2Tens})</li>
                    <li>Then to the hundreds place (${num1Hundreds} + ${num2Hundreds})</li>
                    <li>Finally to the thousands place (${num1Thousands} + ${num2Thousands})</li>
                    <li>Don't forget to carry when needed!</li>
                </ol>
            </div>
        `;
        window.additionTools.showHint(hintText);
    });
    
    // Show steps button
    document.getElementById('show-steps').addEventListener('click', function() {
        // Calculate the addition step by step, with carries
        const steps = calculateSteps(num1, num2);
        
        const stepsHtml = `
            <div class="four-digit-steps">
                <h5>Step-by-Step Solution:</h5>
                <div class="step-container">
                    ${steps.stepsHtml}
                </div>
                <div class="final-result">
                    <strong>Answer: ${steps.answer.toLocaleString()}</strong>
                </div>
            </div>
        `;
        
        window.additionTools.showHint(stepsHtml);
    });
    
    // Focus on answer input
    document.getElementById('user-answer').focus();
}

function calculateSteps(num1, num2) {
    // Extract digits
    const num1Digits = [
        Math.floor(num1 / 1000),          // thousands
        Math.floor((num1 % 1000) / 100),  // hundreds
        Math.floor((num1 % 100) / 10),    // tens
        num1 % 10                          // ones
    ];
    
    const num2Digits = [
        Math.floor(num2 / 1000),          // thousands
        Math.floor((num2 % 1000) / 100),  // hundreds
        Math.floor((num2 % 100) / 10),    // tens
        num2 % 10                          // ones
    ];
    
    // Perform addition with carrying
    let carries = [0, 0, 0, 0, 0]; // Extra position for possible carry to ten thousands
    let results = [0, 0, 0, 0, 0]; // Results for each position (including potential ten thousands)
    let stepsHtml = '';
    
    // Ones place (index 3)
    let onesSum = num1Digits[3] + num2Digits[3];
    results[4] = onesSum % 10;
    carries[3] = Math.floor(onesSum / 10);
    
    stepsHtml += `
        <div class="addition-step">
            <p>Step 1: Add the ones place</p>
            <p>${num1Digits[3]} + ${num2Digits[3]} = ${onesSum}</p>
            ${carries[3] > 0 ? `<p>Write ${results[4]}, carry ${carries[3]} to tens place</p>` : '<p>Write ' + results[4] + '</p>'}
        </div>
    `;
    
    // Tens place (index 2)
    let tensSum = num1Digits[2] + num2Digits[2] + carries[3];
    results[3] = tensSum % 10;
    carries[2] = Math.floor(tensSum / 10);
    
    stepsHtml += `
        <div class="addition-step">
            <p>Step 2: Add the tens place</p>
            <p>${carries[3] > 0 ? carries[3] + ' (carry) + ' : ''}${num1Digits[2]} + ${num2Digits[2]} = ${tensSum}</p>
            ${carries[2] > 0 ? `<p>Write ${results[3]}, carry ${carries[2]} to hundreds place</p>` : '<p>Write ' + results[3] + '</p>'}
        </div>
    `;
    
    // Hundreds place (index 1)
    let hundredsSum = num1Digits[1] + num2Digits[1] + carries[2];
    results[2] = hundredsSum % 10;
    carries[1] = Math.floor(hundredsSum / 10);
    
    stepsHtml += `
        <div class="addition-step">
            <p>Step 3: Add the hundreds place</p>
            <p>${carries[2] > 0 ? carries[2] + ' (carry) + ' : ''}${num1Digits[1]} + ${num2Digits[1]} = ${hundredsSum}</p>
            ${carries[1] > 0 ? `<p>Write ${results[2]}, carry ${carries[1]} to thousands place</p>` : '<p>Write ' + results[2] + '</p>'}
        </div>
    `;
    
    // Thousands place (index 0)
    let thousandsSum = num1Digits[0] + num2Digits[0] + carries[1];
    results[1] = thousandsSum % 10;
    carries[0] = Math.floor(thousandsSum / 10);
    
    stepsHtml += `
        <div class="addition-step">
            <p>Step 4: Add the thousands place</p>
            <p>${carries[1] > 0 ? carries[1] + ' (carry) + ' : ''}${num1Digits[0]} + ${num2Digits[0]} = ${thousandsSum}</p>
            ${carries[0] > 0 ? `<p>Write ${results[1]}, carry ${carries[0]} to ten thousands place</p>` : '<p>Write ' + results[1] + '</p>'}
        </div>
    `;
    
    // Ten thousands (if needed)
    if (carries[0] > 0) {
        results[0] = carries[0];
        stepsHtml += `
            <div class="addition-step">
                <p>Step 5: Write the final carry in ten thousands place</p>
                <p>Write ${carries[0]}</p>
            </div>
        `;
    }
    
    // Construct the answer
    let answer = 0;
    for (let i = 0; i < 5; i++) {
        answer += results[i] * Math.pow(10, 4-i);
    }
    
    return {
        stepsHtml: stepsHtml,
        answer: answer
    };
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
            <p>Hint: Check your work carefully and watch for carries!</p>
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
                <p>Great job! You've completed Level 7: Four-Digit Addition</p>
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
        return '<p>Amazing! You\'re a four-digit addition master! 🌟</p>';
    } else if (percentage >= 70) {
        return '<p>Great job! You\'re getting really good with larger numbers! 👍</p>';
    } else if (percentage >= 50) {
        return '<p>Good effort! With more practice, you\'ll master four-digit addition! 💪</p>';
    } else {
        return '<p>Keep practicing! Four-digit addition takes time to master. You can do it! 🤗</p>';
    }
}
