// Direct implementation of Addition Adventure Level 4 (Carrying)

document.addEventListener('DOMContentLoaded', function() {
    // Find the Level 4 button
    const level4Btn = document.querySelector('.level-btn[data-level="4"]');
    
    if (level4Btn) {
        console.log('Adding direct implementation for Level 4 button');
        
        level4Btn.addEventListener('click', function() {
            // Get essential elements
            const currentAdditionProblem = document.getElementById('current-addition-problem');
            const inputArea = document.getElementById('input-area');
            const feedbackArea = document.getElementById('feedback-area');
            const levelDescription = document.getElementById('level-description');
            
            // Update the description
            if (levelDescription) {
                levelDescription.textContent = "Practice addition with carrying";
            }
            
            // Load Level 4 content directly
            currentAdditionProblem.innerHTML = `
                <div class="level-content">
                    <h3>Level 4: Addition with Carrying</h3>
                    
                    <div class="level-introduction">
                        <p>Welcome to Level 4 of your addition adventure! 🎉</p>
                        <p>Now you'll master the special skill of <strong>carrying</strong> when adding numbers!</p>
                    </div>
                    
                    <div class="concept-box">
                        <h4>What is Carrying?</h4>
                        <p>When we add digits and get a sum of 10 or more, we need to <strong>carry</strong> the extra tens to the next column.</p>
                        
                        <div class="example-container">
                            <h5>Example: Adding 47 + 38</h5>
                            <div class="aligned-addition-problem">
                                <div class="carry-container">
                                    <span class="carry">1</span><span class="empty-digit"></span>
                                </div>
                                <div class="problem-row">
                                    <span class="digit">4</span><span class="digit">7</span>
                                </div>
                                <div class="problem-row">
                                    <span class="operator">+</span><span class="digit">3</span><span class="digit">8</span>
                                </div>
                                <div class="problem-row line"></div>
                                <div class="problem-row">
                                    <span class="digit">8</span><span class="digit">5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tips-box">
                        <h4>Carrying Tips</h4>
                        <ul>
                            <li><strong>Always start with the ones place</strong> (rightmost digit)</li>
                            <li><strong>Write down the carry</strong> above the next column to help remember it</li>
                            <li><strong>Remember to add the carry</strong> when working on the next column</li>
                        </ul>
                    </div>

                    <div class="level-instructions">
                        <h4>Ready to Practice?</h4>
                        <p>Now it's your turn to practice addition with carrying! You'll get 10 problems to solve.</p>
                        <button id="start-practice-level4" class="start-btn">Start Practice!</button>
                    </div>
                </div>
            `;
            
            // Add direct event listener to the Start Practice button
            setTimeout(function() {
                const startPracticeBtn = document.getElementById('start-practice-level4');
                if (startPracticeBtn) {
                    console.log('Direct Start Practice button for Level 4 found');
                    
                    startPracticeBtn.addEventListener('click', function() {
                        console.log('Direct Level 4 Start Practice button clicked');
                        startLevel4Practice(currentAdditionProblem, inputArea, feedbackArea);
                    });
                } else {
                    console.error('Cannot find Level 4 Start Practice button');
                }
            }, 300);
        });
    }
});

// Track question progress and score
let questionCount = 0;
let totalQuestions = 10;
let score = 0;
let currentProblem = null;

function startLevel4Practice(problemContainer, inputArea, feedbackArea) {
    // Reset counters
    questionCount = 0;
    score = 0;
    
    // Generate the first problem
    generateProblem(problemContainer, inputArea, feedbackArea);
}

function generateProblem(problemContainer, inputArea, feedbackArea) {
    // Clear previous feedback
    feedbackArea.innerHTML = '';
    
    // Hide hint container and block builder
    const hintContainer = document.getElementById('hint-container');
    const blockBuilder = document.getElementById('block-builder');
    
    if (hintContainer) hintContainer.style.display = 'none';
    if (blockBuilder) blockBuilder.style.display = 'none';
    
    // Generate numbers that will require carrying
    let num1, num2;
    do {
        // Generate two-digit numbers
        num1 = Math.floor(Math.random() * 90) + 10; // 10-99
        num2 = Math.floor(Math.random() * 90) + 10; // 10-99
        
        // Check if ones digits sum to 10 or more (requires carrying)
        const requiresCarrying = (num1 % 10 + num2 % 10) >= 10;
    } while (!(num1 % 10 + num2 % 10 >= 10)); // Make sure it requires carrying
    
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
    `;
    
    // Set up additionTools object for hints
    window.additionTools = {
        showHint: function(hintText) {
            if (hintContainer) {
                hintContainer.style.display = 'block';
                hintContainer.innerHTML = `<h5>Hint</h5><div id="hint-content">${hintText}</div>`;
            }
        }
    };
    
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
