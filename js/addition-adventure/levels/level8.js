// Level 8: Four-Digit Addition with Carrying

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
    
    // Generate two random four-digit numbers that will require multiple carries
    let num1, num2, requiresMultipleCarries;
    
    do {
        num1 = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
        num2 = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
        
        // Check if problem requires at least 3 carries
        const carries = countCarries(num1, num2);
        requiresMultipleCarries = carries >= 3;
        
    } while (!requiresMultipleCarries);
    
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
            <h4>Add these numbers (watch for multiple carries):</h4>
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
        // Extract digits for hint
        const digits1 = getDigitArray(num1);
        const digits2 = getDigitArray(num2);
        
        const hintText = `
            <div class="place-value-hint">
                <h5>Careful with the Carries!</h5>
                <table class="hint-table">
                    <tr>
                        <th></th>
                        <th>Thousands</th>
                        <th>Hundreds</th>
                        <th>Tens</th>
                        <th>Ones</th>
                    </tr>
                    <tr>
                        <td>First number</td>
                        <td>${digits1[0]}</td>
                        <td>${digits1[1]}</td>
                        <td>${digits1[2]}</td>
                        <td>${digits1[3]}</td>
                    </tr>
                    <tr>
                        <td>Second number</td>
                        <td>${digits2[0]}</td>
                        <td>${digits2[1]}</td>
                        <td>${digits2[2]}</td>
                        <td>${digits2[3]}</td>
                    </tr>
                </table>
                <p>This problem has <strong>multiple carries</strong>. Remember these tips:</p>
                <ul>
                    <li>Start from the ones place (right-most digit)</li>
                    <li>Add the digits in each column plus any carry from the previous column</li>
                    <li>If the sum is 10 or more, write down the ones digit and carry the tens digit</li>
                    <li>Double-check your work - easy to miss a carry!</li>
                </ul>
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
                <div class="carries-explanation">
                    <h6>Carry Summary:</h6>
                    <p>${steps.carryText}</p>
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

// Count how many carries will be needed
function countCarries(num1, num2) {
    let carries = 0;
    let carry = 0;
    
    for (let i = 0; i < 4; i++) {
        const digit1 = Math.floor((num1 % Math.pow(10, i + 1)) / Math.pow(10, i));
        const digit2 = Math.floor((num2 % Math.pow(10, i + 1)) / Math.pow(10, i));
        
        const sum = digit1 + digit2 + carry;
        if (sum >= 10) {
            carries++;
            carry = 1;
        } else {
            carry = 0;
        }
    }
    
    return carries;
}

// Extract digits from a number into an array [thousands, hundreds, tens, ones]
function getDigitArray(num) {
    return [
        Math.floor(num / 1000),          // thousands
        Math.floor((num % 1000) / 100),  // hundreds
        Math.floor((num % 100) / 10),    // tens
        num % 10                          // ones
    ];
}

function calculateSteps(num1, num2) {
    // Extract digits
    const digits1 = [
        Math.floor(num1 / 1000),          // thousands
        Math.floor((num1 % 1000) / 100),  // hundreds
        Math.floor((num1 % 100) / 10),    // tens
        num1 % 10                          // ones
    ];
    
    const digits2 = [
        Math.floor(num2 / 1000),          // thousands
        Math.floor((num2 % 1000) / 100),  // hundreds
        Math.floor((num2 % 100) / 10),    // tens
        num2 % 10                          // ones
    ];
    
    // Perform addition with carrying
    let carries = [0, 0, 0, 0, 0]; // Extra position for possible carry to ten thousands
    let results = [0, 0, 0, 0, 0]; // Results for each position (including potential ten thousands)
    let stepsHtml = '';
    let carryLocations = [];
    
    // Ones place (index 3)
    let onesSum = digits1[3] + digits2[3];
    results[4] = onesSum % 10;
    carries[3] = Math.floor(onesSum / 10);
    
    if (carries[3] > 0) carryLocations.push('ones to tens');
    
    stepsHtml += `
        <div class="addition-step">
            <p>Step 1: Add the ones place</p>
            <p>${digits1[3]} + ${digits2[3]} = ${onesSum}</p>
            ${carries[3] > 0 ? `<p>Write ${results[4]}, carry ${carries[3]} to tens place</p>` : '<p>Write ' + results[4] + '</p>'}
        </div>
    `;
    
    // Tens place (index 2)
    let tensSum = digits1[2] + digits2[2] + carries[3];
    results[3] = tensSum % 10;
    carries[2] = Math.floor(tensSum / 10);
    
    if (carries[2] > 0) carryLocations.push('tens to hundreds');
    
    stepsHtml += `
        <div class="addition-step">
            <p>Step 2: Add the tens place</p>
            <p>${carries[3] > 0 ? carries[3] + ' (carry) + ' : ''}${digits1[2]} + ${digits2[2]} = ${tensSum}</p>
            ${carries[2] > 0 ? `<p>Write ${results[3]}, carry ${carries[2]} to hundreds place</p>` : '<p>Write ' + results[3] + '</p>'}
        </div>
    `;
    
    // Hundreds place (index 1)
    let hundredsSum = digits1[1] + digits2[1] + carries[2];
    results[2] = hundredsSum % 10;
    carries[1] = Math.floor(hundredsSum / 10);
    
    if (carries[1] > 0) carryLocations.push('hundreds to thousands');
    
    stepsHtml += `
        <div class="addition-step">
            <p>Step 3: Add the hundreds place</p>
            <p>${carries[2] > 0 ? carries[2] + ' (carry) + ' : ''}${digits1[1]} + ${digits2[1]} = ${hundredsSum}</p>
            ${carries[1] > 0 ? `<p>Write ${results[2]}, carry ${carries[1]} to thousands place</p>` : '<p>Write ' + results[2] + '</p>'}
        </div>
    `;
    
    // Thousands place (index 0)
    let thousandsSum = digits1[0] + digits2[0] + carries[1];
    results[1] = thousandsSum % 10;
    carries[0] = Math.floor(thousandsSum / 10);
    
    if (carries[0] > 0) carryLocations.push('thousands to ten thousands');
    
    stepsHtml += `
        <div class="addition-step">
            <p>Step 4: Add the thousands place</p>
            <p>${carries[1] > 0 ? carries[1] + ' (carry) + ' : ''}${digits1[0]} + ${digits2[0]} = ${thousandsSum}</p>
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
    
    // Create a text description of the carries
    let carryText = carryLocations.length > 0 ? 
        `This problem required carrying from ${carryLocations.join(', ')}. Always be careful to include all carries!` :
        `No carries were needed in this problem.`;
    
    return {
        stepsHtml: stepsHtml,
        answer: answer,
        carryText: carryText
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
            <p>Hint: Double-check your carrying steps. It's easy to miss a carry with large numbers.</p>
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
                <p>Congratulations! You've completed Level 8: Four-Digit Addition with Carrying</p>
                <p>You have mastered the most challenging addition problems!</p>
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
        return '<p>Amazing! You\'re an addition grandmaster! You can solve any addition problem! 🌟</p>';
    } else if (percentage >= 70) {
        return '<p>Great job! You\'re becoming very skilled with complex addition problems! 👍</p>';
    } else if (percentage >= 50) {
        return '<p>Good effort! With more practice, you\'ll master these challenging problems! 💪</p>';
    } else {
        return '<p>Keep practicing! Complex addition takes time to master. You can do it! 🤗</p>';
    }
}
