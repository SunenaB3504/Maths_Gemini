/**
 * Addition Adventure - Level 1: Single Digit
 * This module handles the content and functionality for the first level
 * of addition, focusing on single-digit numbers.
 */

// Initialize Level 1 functionality
function initAdditionLevel1() {
    console.log('Initializing Addition Level 1: Single Digit');
    
    const currentAdditionProblem = document.getElementById('current-addition-problem');
    const inputArea = document.getElementById('input-area');
    const visualTools = document.getElementById('visual-tools');
    const blockBuilder = document.getElementById('block-builder');
    const hintContainer = document.getElementById('hint-container');
    const hintContent = document.getElementById('hint-content');
    const feedbackArea = document.getElementById('feedback-area');
    
    let currentProblem = null;
    
    // Display level introduction
    function showLevelIntro() {
        currentAdditionProblem.innerHTML = `
            <div class="level-intro">
                <h4>Level 1: Single Digit Addition</h4>
                <div class="level-description-box">
                    <p>Welcome to your first addition adventure! 🎉</p>
                    <p>In this level, we'll practice adding single-digit numbers (0-9).</p>
                    <p>For example: 3 + 4 = 7 or 5 + 2 = 7</p>
                </div>
                
                <div class="addition-example">
                    <div class="example-container">
                        <div class="example-title">Example:</div>
                        <div class="example-problem">
                            <span class="addend">6</span>
                            <span class="operator">+</span>
                            <span class="addend">3</span>
                            <span class="equals">=</span>
                            <span class="sum">9</span>
                        </div>
                        <div class="visual-example">
                            <div class="blocks first-addend">
                                <div class="block"></div>
                                <div class="block"></div>
                                <div class="block"></div>
                                <div class="block"></div>
                                <div class="block"></div>
                                <div class="block"></div>
                            </div>
                            <div class="plus-sign">+</div>
                            <div class="blocks second-addend">
                                <div class="block"></div>
                                <div class="block"></div>
                                <div class="block"></div>
                            </div>
                            <div class="equals-sign">=</div>
                            <div class="blocks sum-blocks">
                                <div class="block"></div>
                                <div class="block"></div>
                                <div class="block"></div>
                                <div class="block"></div>
                                <div class="block"></div>
                                <div class="block"></div>
                                <div class="block"></div>
                                <div class="block"></div>
                                <div class="block"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="start-practice">
                    <p>Are you ready to start practicing?</p>
                    <button id="start-level1" class="start-btn">Start Practice!</button>
                </div>
            </div>
        `;
        
        // Add event listener to start button
        const startBtn = document.getElementById('start-level1');
        if (startBtn) {
            startBtn.addEventListener('click', generateProblem);
        }
    }
    
    // Generate a new addition problem
    function generateProblem() {
        // Generate two random single-digit numbers
        const num1 = Math.floor(Math.random() * 9) + 1; // 1-9
        const num2 = Math.floor(Math.random() * 9) + 1; // 1-9
        const sum = num1 + num2;
        
        currentProblem = {
            addend1: num1,
            addend2: num2,
            sum: sum
        };
        
        // Display the problem
        currentAdditionProblem.innerHTML = `
            <div class="addition-problem">
                <div class="problem-title">Solve this addition problem:</div>
                <div class="problem-display">
                    <span class="addend">${num1}</span>
                    <span class="operator">+</span>
                    <span class="addend">${num2}</span>
                    <span class="equals">=</span>
                    <span class="sum">?</span>
                </div>
            </div>
        `;
        
        // Create input area
        inputArea.innerHTML = `
            <div class="addition-input">
                <input type="number" id="sum-input" placeholder="?" min="0" max="18">
                <button id="check-answer" class="check-btn">Check Answer</button>
                <button id="new-problem" class="new-game-btn">New Problem</button>
                <button id="show-hint" class="hint-btn">Show Hint</button>
            </div>
        `;
        
        // Setup visual blocks
        setupVisualBlocks(num1, num2);
        
        // Add event listeners
        document.getElementById('check-answer').addEventListener('click', checkAnswer);
        document.getElementById('new-problem').addEventListener('click', generateProblem);
        document.getElementById('show-hint').addEventListener('click', showHint);
        
        // Clear previous feedback
        feedbackArea.innerHTML = '';
        hintContainer.style.display = 'none';
    }
    
    // Setup visual blocks for the addends
    function setupVisualBlocks(num1, num2) {
        blockBuilder.style.display = 'block';
        blockBuilder.innerHTML = `
            <div class="block-container">
                <div class="blocks first-addend">
                    ${Array(num1).fill('<div class="block"></div>').join('')}
                </div>
                <div class="plus-sign">+</div>
                <div class="blocks second-addend">
                    ${Array(num2).fill('<div class="block"></div>').join('')}
                </div>
            </div>
        `;
    }
    
    // Check the user's answer
    function checkAnswer() {
        const userAnswer = parseInt(document.getElementById('sum-input').value);
        
        if (isNaN(userAnswer)) {
            feedbackArea.innerHTML = `<div class="error-feedback">Please enter a number.</div>`;
            return;
        }
        
        if (userAnswer === currentProblem.sum) {
            // Correct answer
            feedbackArea.innerHTML = `
                <div class="success-feedback">
                    <p>✨ Excellent! ${currentProblem.addend1} + ${currentProblem.addend2} = ${currentProblem.sum} ✨</p>
                    <div class="celebration">🎊🎉</div>
                </div>
            `;
            
            // Show the complete visual with sum
            blockBuilder.innerHTML += `
                <div class="block-container result">
                    <div class="equals-sign">=</div>
                    <div class="blocks sum-blocks">
                        ${Array(currentProblem.sum).fill('<div class="block"></div>').join('')}
                    </div>
                </div>
            `;
        } else {
            // Incorrect answer
            feedbackArea.innerHTML = `
                <div class="error-feedback">
                    <p>Not quite right. Try again!</p>
                    <p>Hint: Count all the blocks together.</p>
                </div>
            `;
        }
    }
    
    // Show hint for the problem
    function showHint() {
        hintContainer.style.display = 'block';
        hintContent.innerHTML = `
            <p>Count the first group of blocks: ${currentProblem.addend1}</p>
            <p>Count the second group of blocks: ${currentProblem.addend2}</p>
            <p>Now count all the blocks together!</p>
            <p>Remember: Adding means combining two groups into one larger group.</p>
        `;
    }
    
    // Start with the level introduction
    showLevelIntro();
}

// Setup level initialization when the level button is clicked
document.addEventListener('DOMContentLoaded', function() {
    const level1Btn = document.querySelector('.level-btn[data-level="1"]');
    if (level1Btn) {
        level1Btn.addEventListener('click', function() {
            // Update level description
            document.getElementById('level-description').textContent = 'Practice adding single-digit numbers (0-9).';
            
            // Initialize level content
            initAdditionLevel1();
        });
    }
});
