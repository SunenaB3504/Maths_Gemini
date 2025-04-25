/**
 * Main Application Script
 * Imports and initializes all modules
 */

// Global app state
const appState = {
    currentModule: null,
    currentAdditionLevel: null,
    currentProblem: null
};

// Make sure DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - initializing application');
    
    // Set up main menu navigation first, before any module loading
    initMainMenu();
    
    // Start with welcome screen
    showWelcomeScreen();
    
    // Mark the app as initialized to prevent fallback scripts from interfering
    window.appInitialized = true;
    
    // Then load modules
    loadModules();
});

// Import module controllers
function loadModules() {
    try {
        console.log('Loading modules...');
        // Dynamically import modules (this provides better error handling than static imports)
        import('./number-friends.js')
            .then(numberFriendsModule => {
                console.log('Number Friends module loaded successfully');
            })
            .catch(error => {
                console.error('Failed to load Number Friends module:', error);
            });
            
        import('./addition-levels.js')
            .then(additionModule => {
                console.log('Addition Adventure module loaded successfully');
                initAdditionAdventure(additionModule);
            })
            .catch(error => {
                console.error('Failed to load Addition Adventure module:', error);
            });
    } catch (err) {
        console.error('Error in module initialization:', err);
        
        // Display user-friendly error
        const errorElement = document.createElement('div');
        errorElement.className = 'module-error';
        errorElement.innerHTML = `
            <h3>Module Loading Error</h3>
            <p>There was a problem loading the application modules.</p>
            <p>Please make sure you're running the app using the provided server.</p>
            <button id="close-error">Close</button>
        `;
        document.body.prepend(errorElement);
        
        document.getElementById('close-error').addEventListener('click', function() {
            errorElement.remove();
        });
    }
}

// Main menu navigation
function initMainMenu() {
    console.log('Initializing main menu...');
    const menuButtons = document.querySelectorAll('#main-menu button');
    console.log('Found', menuButtons.length, 'menu buttons');
    
    menuButtons.forEach(button => {
        console.log('Setting up button:', button.id);
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent any default action
            const moduleId = this.id.replace('btn-', '');
            console.log('Button clicked:', moduleId); // Debug log
            
            // Hide all modules
            document.querySelectorAll('.module').forEach(module => {
                module.style.display = 'none';
            });
            
            // Hide welcome screen
            document.getElementById('welcome-screen').style.display = 'none';
            
            // Show the selected module
            if (moduleId === 'number-friends') {
                console.log('Showing Number Friends module');
                document.getElementById('number-friends-module').style.display = 'block';
                appState.currentModule = 'number-friends';
            } else if (moduleId === 'addition-adventure') {
                console.log('Showing Addition Adventure module');
                document.getElementById('addition-adventure-module').style.display = 'block';
                appState.currentModule = 'addition-adventure';
            } else if (moduleId === 'subtraction-safari') {
                // To be implemented
                console.log('Subtraction Safari not yet implemented');
                showWelcomeScreen(); // Fallback to welcome screen
                alert('Coming soon: Subtraction Safari!');
            } else if (moduleId === 'money-market') {
                // To be implemented
                console.log('Money Market not yet implemented');
                showWelcomeScreen(); // Fallback to welcome screen
                alert('Coming soon: Money Market!');
            } else {
                console.warn('Unknown module:', moduleId);
                showWelcomeScreen(); // Fallback to welcome screen
            }
        });
    });
}

// Show the welcome screen
function showWelcomeScreen() {
    // Hide all modules
    document.querySelectorAll('.module').forEach(module => {
        module.style.display = 'none';
    });
    
    // Show welcome screen
    document.getElementById('welcome-screen').style.display = 'block';
    appState.currentModule = null;
}

// Addition Adventure initialization
function initAdditionAdventure(additionModule) {
    // Set up level button click handlers
    const levelButtons = document.querySelectorAll('.level-btn');
    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const levelId = parseInt(this.getAttribute('data-level'));
            
            // Clear any previous feedback before starting new level
            clearFeedbackArea();
            
            startAdditionLevel(levelId, additionModule);
            
            // Update active button styling
            document.querySelectorAll('.level-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

// Start a specific addition level
function startAdditionLevel(levelId, additionModule) {
    const level = additionModule.getLevelById(levelId);
    appState.currentAdditionLevel = level;
    appState.problemsCompleted = 0;
    
    if (level) {
        // Clear any previous feedback messages
        clearFeedbackArea();
        
        // Update level description
        document.getElementById('level-description').textContent = level.description;
        
        // Generate and display the first problem
        generateNewAdditionProblem(additionModule);
        
        // Set up the input area
        setupAdditionInputArea(additionModule);
    }
}

// Clear feedback area
function clearFeedbackArea() {
    const feedbackArea = document.getElementById('feedback-area');
    if (feedbackArea) {
        feedbackArea.innerHTML = '';
    }
}

// Generate a new addition problem
function generateNewAdditionProblem(additionModule) {
    if (!appState.currentAdditionLevel) return;
    
    // Clear any existing feedback when generating a new problem
    clearFeedbackArea();
    
    appState.currentProblem = additionModule.getRandomProblem(appState.currentAdditionLevel.id);
    
    const problemDisplay = document.getElementById('current-addition-problem');
    
    if (appState.currentProblem.isWordProblem) {
        // ...existing code...
    } else if (appState.currentProblem.multipleChoice) {
        // ...existing code...
    } else {
        problemDisplay.innerHTML = `
            <div class="math-problem">
                <h4>Solve:</h4>
                <p class="problem-text">${appState.currentProblem.display}</p>
                ${(appState.currentAdditionLevel.id === 2 || 
                   appState.currentAdditionLevel.id === 3 ||
                   appState.currentAdditionLevel.id === 4 ||
                   appState.currentAdditionLevel.id === 6 ||
                   appState.currentAdditionLevel.id === 7) ? 
                    '<button id="show-hint-btn" class="hint-btn">Show Hint</button>' : ''}
            </div>
        `;
        
        // Add event listener to hint button if it exists
        const hintBtn = document.getElementById('show-hint-btn');
        if (hintBtn) {
            hintBtn.addEventListener('click', function() {
                if (appState.currentProblem.isWordProblem) {
                    showWordProblemHint(appState.currentProblem);
                } else {
                    showAdditionHint(appState.currentProblem, appState.currentAdditionLevel.id);
                }
            });
        }
    }
    
    // Set up visual tools based on level
    setupAdditionVisualTools();
    
    // Hide hint container when generating new problem
    const hintContainer = document.getElementById('hint-container');
    if (hintContainer) {
        hintContainer.style.display = 'none';
    }
}

// Set up visual tools for addition problems
function setupAdditionVisualTools() {
    const visualTools = document.getElementById('visual-tools');
    if (!visualTools) return;
    
    // Clear previous content
    visualTools.innerHTML = '';
    
    // Set up different visual aids based on current level
    if (appState.currentAdditionLevel) {
        const levelId = appState.currentAdditionLevel.id;
        
        if (levelId === 1) {
            // Level 1: Block builder
            visualTools.innerHTML = `
                <div id="block-builder">
                    <h5>Block Builder</h5>
                    <div class="blocks-container"></div>
                </div>
            `;
            // Block builder initialization could go here
        } 
        else if (levelId === 7) {
            // Level 7: Four-digit place value chart
            visualTools.innerHTML = `
                <div id="place-value-container">
                    <h5>Place Value Chart</h5>
                    <div class="digit-chart">
                        <table class="place-value-table">
                            <thead>
                                <tr>
                                    <th>Thousands</th>
                                    <th>Hundreds</th>
                                    <th>Tens</th>
                                    <th>Ones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="first-number-row">
                                    <td>${Math.floor(appState.currentProblem.num1 / 1000) % 10}</td>
                                    <td>${Math.floor(appState.currentProblem.num1 / 100) % 10}</td>
                                    <td>${Math.floor(appState.currentProblem.num1 / 10) % 10}</td>
                                    <td>${appState.currentProblem.num1 % 10}</td>
                                </tr>
                                <tr class="second-number-row">
                                    <td>${Math.floor(appState.currentProblem.num2 / 1000) % 10}</td>
                                    <td>${Math.floor(appState.currentProblem.num2 / 100) % 10}</td>
                                    <td>${Math.floor(appState.currentProblem.num2 / 10) % 10}</td>
                                    <td>${appState.currentProblem.num2 % 10}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p class="chart-hint">Focus on adding each place value column separately, starting from the ones place and carrying when needed.</p>
                </div>
            `;
        }
        
        // Add hint container at the end
        visualTools.innerHTML += `
            <div id="hint-container" style="display: none;">
                <h5>Hint</h5>
                <div id="hint-content"></div>
            </div>
        `;
    }
}

// Function to show hints for word problems
function showWordProblemHint(problem) {
    const hintContainer = document.getElementById('hint-container');
    const hintContent = document.getElementById('hint-content');
    
    if (!hintContainer || !hintContent) return;
    
    // Show the hint container
    hintContainer.style.display = 'block';
    
    // Extract numbers from the problem for the hint
    const num1 = problem.num1;
    const num2 = problem.num2;
    
    // Create a general structure for solving word problems
    let hintHTML = `
        <div class="word-problem-hint">
            <h4>How to Solve This Word Problem</h4>
            
            <div class="hint-step">
                <h5>Step 1: Understand what the problem is asking</h5>
                <p>This is a word problem about <span class="hint-highlight">${problem.wordContext || 'addition'}</span>.</p>
                <p>We need to add two numbers to find the total.</p>
            </div>
            
            <div class="hint-step">
                <h5>Step 2: Identify the important information</h5>
                <p>The first number is <span class="hint-highlight">${num1}</span>.</p>
                <p>The second number is <span class="hint-highlight">${num2}</span>.</p>
            </div>
            
            <div class="hint-step">
                <h5>Step 3: Set up the addition equation</h5>
                <p>We need to calculate: ${num1} + ${num2}</p>
            </div>
            
            <div class="hint-step">
                <h5>Step 4: Solve the equation</h5>
                <div class="word-problem-calculation">
                    <div class="calculation-steps">
                        <div class="step-row">
                            <span class="num">${num1}</span>
                        </div>
                        <div class="step-row">
                            <span class="op">+</span>
                            <span class="num">${num2}</span>
                        </div>
                        <div class="step-row result">
                            <span class="num">${num1 + num2}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="hint-answer">
                <h5>Step 5: Write the final answer</h5>
                <p>The answer is <span class="hint-highlight">${num1 + num2}</span>.</p>
            </div>
        </div>
        
        <div class="problem-solving-tips">
            <h5>Tips for Solving Word Problems:</h5>
            <ul>
                <li>Read the problem carefully and identify what you need to find.</li>
                <li>Look for key words that tell you what operation to use:
                    <ul>
                        <li>"In total", "altogether", "sum", and "combined" usually mean addition.</li>
                        <li>"More than", "increased by", and "added to" also indicate addition.</li>
                    </ul>
                </li>
                <li>Write out the equation before solving.</li>
                <li>Check your answer: Does it make sense in the context of the problem?</li>
            </ul>
        </div>
    `;
    
    hintContent.innerHTML = hintHTML;
}

// Function to show hints for addition problems
function showAdditionHint(problem, levelId) {
    const hintContainer = document.getElementById('hint-container');
    const hintContent = document.getElementById('hint-content');
    
    if (!hintContainer || !hintContent) return;
    
    // Show the hint container
    hintContainer.style.display = 'block';
    
    const num1 = problem.num1;
    const num2 = problem.num2;
    
    // For Level 2 (two-digit + one-digit)
    if (levelId === 2) {
        // ...existing code...
    }
    // For Level 3 (double-digit addition)
    else if (levelId === 3) {
        // ...existing code...
    }
    // For Level 4 (addition with carrying)
    else if (levelId === 4) {
        // ...existing code...
    }
    // For Level 6 (Addition Properties)
    else if (levelId === 6) {
        // ...existing code...
    }
    // For Level 7 (four-digit addition)
    else if (levelId === 7) {
        // Break down numbers by place value
        const num1Digits = num1.toString().padStart(4, '0').split('').map(Number);
        const num2Digits = num2.toString().padStart(4, '0').split('').map(Number);
        
        const thousands1 = num1Digits[0];
        const hundreds1 = num1Digits[1];
        const tens1 = num1Digits[2];
        const ones1 = num1Digits[3];
        
        const thousands2 = num2Digits[0];
        const hundreds2 = num2Digits[1];
        const tens2 = num2Digits[2];
        const ones2 = num2Digits[3];
        
        // Calculate sums and carries
        const onesSum = ones1 + ones2;
        const onesCarry = onesSum >= 10 ? 1 : 0;
        const onesResult = onesSum % 10;
        
        const tensSum = tens1 + tens2 + onesCarry;
        const tensCarry = tensSum >= 10 ? 1 : 0;
        const tensResult = tensSum % 10;
        
        const hundredsSum = hundreds1 + hundreds2 + tensCarry;
        const hundredsCarry = hundredsSum >= 10 ? 1 : 0;
        const hundredsResult = hundredsSum % 10;
        
        const thousandsSum = thousands1 + thousands2 + hundredsCarry;
        const thousandsResult = thousandsSum % 10;
        const tenThousandsResult = Math.floor(thousandsSum / 10);
        
        let hintHTML = `
            <h4>Four-Digit Addition with Carrying</h4>
            
            <div class="hint-step">
                <p><strong>Step 1:</strong> Line up the numbers by place value</p>
                <div class="big-number-visual">
                    <div class="place-labels">
                        <span>Th</span>
                        <span>H</span>
                        <span>T</span>
                        <span>O</span>
                    </div>
                    <div class="number-row">
                        <span class="digit">${thousands1}</span>
                        <span class="digit">${hundreds1}</span>
                        <span class="digit">${tens1}</span>
                        <span class="digit">${ones1}</span>
                    </div>
                    <div class="number-row">
                        <span class="operator">+</span>
                    </div>
                    <div class="number-row">
                        <span class="digit">${thousands2}</span>
                        <span class="digit">${hundreds2}</span>
                        <span class="digit">${tens2}</span>
                        <span class="digit">${ones2}</span>
                    </div>
                    <div class="number-row">
                        <div class="line"></div>
                    </div>
                    <div class="number-row empty-row">
                        <span class="digit"></span>
                        <span class="digit"></span>
                        <span class="digit"></span>
                        <span class="digit"></span>
                    </div>
                </div>
                <p class="explanation">Match up each place value column: ones with ones, tens with tens, etc.</p>
            </div>
            
            <div class="hint-step">
                <p><strong>Step 2:</strong> Add the ones place: ${ones1} + ${ones2} = ${onesSum}</p>
                <div class="big-number-visual">
                    <div class="carry-row">
                        ${onesCarry ? '<span class="carry-mark">1</span>' : '<span></span>'}
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div class="place-labels">
                        <span>Th</span>
                        <span>H</span>
                        <span>T</span>
                        <span>O</span>
                    </div>
                    <div class="number-row">
                        <span class="digit">${thousands1}</span>
                        <span class="digit">${hundreds1}</span>
                        <span class="digit">${tens1}</span>
                        <span class="digit">${ones1}</span>
                    </div>
                    <div class="number-row">
                        <span class="operator">+</span>
                    </div>
                    <div class="number-row">
                        <span class="digit">${thousands2}</span>
                        <span class="digit">${hundreds2}</span>
                        <span class="digit">${tens2}</span>
                        <span class="digit">${ones2}</span>
                    </div>
                    <div class="number-row">
                        <div class="line"></div>
                    </div>
                    <div class="number-row">
                        <span class="digit"></span>
                        <span class="digit"></span>
                        <span class="digit"></span>
                        <span class="digit highlighted">${onesResult}</span>
                    </div>
                </div>
                <div class="carrying-explanation">
                    ${onesCarry ? `
                        <p>Since ${ones1} + ${ones2} = ${onesSum}, which is 10 or more:</p>
                        <ul>
                            <li>Write down ${onesResult} in the ones place</li>
                            <li>Carry the 1 to the tens column (${Math.floor(onesSum/10)})</li>
                        </ul>
                    ` : `
                        <p>Write down ${onesSum} in the ones place.</p>
                    `}
                </div>
            </div>
            
            <div class="hint-step">
                <p><strong>Step 3:</strong> Add the tens place: ${onesCarry ? '1 + ' : ''}${tens1} + ${tens2} = ${tensSum}</p>
                <div class="big-number-visual">
                    <div class="carry-row">
                        ${tensCarry ? '<span class="carry-mark">1</span>' : '<span></span>'}
                        ${onesCarry ? '<span class="carry-mark">1</span>' : '<span></span>'}
                        <span></span>
                        <span></span>
                    </div>
                    <div class="place-labels">
                        <span>Th</span>
                        <span>H</span>
                        <span>T</span>
                        <span>O</span>
                    </div>
                    <div class="number-row">
                        <span class="digit">${thousands1}</span>
                        <span class="digit">${hundreds1}</span>
                        <span class="digit">${tens1}</span>
                        <span class="digit">${ones1}</span>
                    </div>
                    <div class="number-row">
                        <span class="operator">+</span>
                    </div>
                    <div class="number-row">
                        <span class="digit">${thousands2}</span>
                        <span class="digit">${hundreds2}</span>
                        <span class="digit">${tens2}</span>
                        <span class="digit">${ones2}</span>
                    </div>
                    <div class="number-row">
                        <div class="line"></div>
                    </div>
                    <div class="number-row">
                        <span class="digit"></span>
                        <span class="digit"></span>
                        <span class="digit highlighted">${tensResult}</span>
                        <span class="digit">${onesResult}</span>
                    </div>
                </div>
                <div class="carrying-explanation">
                    ${tensCarry ? `
                        <p>Since ${onesCarry ? '1 + ' : ''}${tens1} + ${tens2} = ${tensSum}, which is 10 or more:</p>
                        <ul>
                            <li>Write down ${tensResult} in the tens place</li>
                            <li>Carry the 1 to the hundreds column (${Math.floor(tensSum/10)})</li>
                        </ul>
                    ` : `
                        <p>Write down ${tensSum} in the tens place.</p>
                    `}
                </div>
            </div>
            
            <div class="hint-step">
                <p><strong>Step 4:</strong> Add the hundreds place: ${tensCarry ? '1 + ' : ''}${hundreds1} + ${hundreds2} = ${hundredsSum}</p>
                <div class="big-number-visual">
                    <div class="carry-row">
                        ${hundredsCarry ? '<span class="carry-mark">1</span>' : '<span></span>'}
                        ${tensCarry ? '<span class="carry-mark">1</span>' : '<span></span>'}
                        <span></span>
                        <span></span>
                    </div>
                    <div class="place-labels">
                        <span>Th</span>
                        <span>H</span>
                        <span>T</span>
                        <span>O</span>
                    </div>
                    <div class="number-row">
                        <span class="digit">${thousands1}</span>
                        <span class="digit">${hundreds1}</span>
                        <span class="digit">${tens1}</span>
                        <span class="digit">${ones1}</span>
                    </div>
                    <div class="number-row">
                        <span class="operator">+</span>
                    </div>
                    <div class="number-row">
                        <span class="digit">${thousands2}</span>
                        <span class="digit">${hundreds2}</span>
                        <span class="digit">${tens2}</span>
                        <span class="digit">${ones2}</span>
                    </div>
                    <div class="number-row">
                        <div class="line"></div>
                    </div>
                    <div class="number-row">
                        <span class="digit"></span>
                        <span class="digit highlighted">${hundredsResult}</span>
                        <span class="digit">${tensResult}</span>
                        <span class="digit">${onesResult}</span>
                    </div>
                </div>
                <div class="carrying-explanation">
                    ${hundredsCarry ? `
                        <p>Since ${tensCarry ? '1 + ' : ''}${hundreds1} + ${hundreds2} = ${hundredsSum}, which is 10 or more:</p>
                        <ul>
                            <li>Write down ${hundredsResult} in the hundreds place</li>
                            <li>Carry the 1 to the thousands column (${Math.floor(hundredsSum/10)})</li>
                        </ul>
                    ` : `
                        <p>Write down ${hundredsSum} in the hundreds place.</p>
                    `}
                </div>
            </div>
            
            <div class="hint-step">
                <p><strong>Step 5:</strong> Add the thousands place: ${hundredsCarry ? '1 + ' : ''}${thousands1} + ${thousands2} = ${thousandsSum}</p>
                <div class="big-number-visual">
                    <div class="carry-row">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div class="place-labels">
                        <span>Th</span>
                        <span>H</span>
                        <span>T</span>
                        <span>O</span>
                    </div>
                    <div class="number-row">
                        <span class="digit">${thousands1}</span>
                        <span class="digit">${hundreds1}</span>
                        <span class="digit">${tens1}</span>
                        <span class="digit">${ones1}</span>
                    </div>
                    <div class="number-row">
                        <span class="operator">+</span>
                    </div>
                    <div class="number-row">
                        <span class="digit">${thousands2}</span>
                        <span class="digit">${hundreds2}</span>
                        <span class="digit">${tens2}</span>
                        <span class="digit">${ones2}</span>
                    </div>
                    <div class="number-row">
                        <div class="line"></div>
                    </div>
                    <div class="number-row">
                        ${tenThousandsResult ? `<span class="digit highlighted extra-digit">${tenThousandsResult}</span>` : ''}
                        <span class="digit highlighted">${thousandsResult}</span>
                        <span class="digit">${hundredsResult}</span>
                        <span class="digit">${tensResult}</span>
                        <span class="digit">${onesResult}</span>
                    </div>
                </div>
                ${tenThousandsResult ? `
                    <div class="carrying-explanation">
                        <p>Since ${hundredsCarry ? '1 + ' : ''}${thousands1} + ${thousands2} = ${thousandsSum}, which is 10 or more:</p>
                        <ul>
                            <li>Write down ${thousandsResult} in the thousands place</li>
                            <li>Write down ${tenThousandsResult} in the ten thousands place</li>
                        </ul>
                    </div>
                ` : `
                    <div class="carrying-explanation">
                        <p>Write down ${thousandsSum} in the thousands place.</p>
                    </div>
                `}
            </div>
            
            <div class="hint-answer">
                <p>Therefore, ${num1} + ${num2} = ${num1 + num2}</p>
            </div>
            
            <div class="hint-tips">
                <h4>Tips for 4-Digit Addition with Carrying:</h4>
                <ul>
                    <li><strong>Line up digits:</strong> Always align by place value (ones under ones, tens under tens, etc.)</li>
                    <li><strong>Work from right to left:</strong> Always start with the ones place</li>
                    <li><strong>Carrying:</strong> When a column sum is 10 or greater, write down the ones digit and carry the tens digit to the next column</li>
                    <li><strong>Don't forget carries:</strong> Always add carried digits first in the next column</li>
                    <li><strong>Final carry:</strong> If the leftmost column has a carry, write it down as a new digit</li>
                </ul>
            </div>
        `;
        
        hintContent.innerHTML = hintHTML;
    }
    // Default case - basic hint
    else {
        hintContent.innerHTML = `
            <div class="basic-hint">
                <h4>Addition Hint</h4>
                <p>To add numbers, combine the quantities they represent.</p>
                <p>For this problem: ${num1} + ${num2} = ${num1 + num2}</p>
            </div>
        `;
    }
}

// Set up the input area for addition problems
function setupAdditionInputArea(additionModule) {
    const inputArea = document.getElementById('input-area');
    
    if (appState.currentProblem.multipleChoice) {
        // For multiple choice questions, we already set up the inputs in generateNewAdditionProblem
        inputArea.innerHTML = `
            <div class="answer-form">
                <button id="submit-answer" class="answer-btn">Check Answer</button>
            </div>
        `;
    } else {
        inputArea.innerHTML = `
            <div class="answer-form">
                <label for="user-answer">Your answer:</label>
                <input type="number" id="user-answer" class="answer-input">
                <button id="submit-answer" class="answer-btn">Check</button>
            </div>
        `;
    }
    
    // If level 6 (Properties), add link to the properties guide
    if (appState.currentAdditionLevel && appState.currentAdditionLevel.id === 6) {
        inputArea.innerHTML += `
            <div class="guide-link">
                <a href="addition-properties-guide.html" target="_blank" class="guide-button">
                    View Properties Guide
                </a>
            </div>
        `;
    }
    
    // Add event listener for the submit button
    document.getElementById('submit-answer').addEventListener('click', function() {
        checkAdditionAnswer(additionModule);
    });
}

// Check the user's answer for addition problems
function checkAdditionAnswer(additionModule) {
    let userAnswer;
    const feedbackArea = document.getElementById('feedback-area');
    
    // Different handling for multiple choice vs. number input
    if (appState.currentProblem.multipleChoice) {
        const selectedOption = document.querySelector('input[name="property-option"]:checked');
        
        if (!selectedOption) {
            feedbackArea.innerHTML = '<p class="feedback error">Please select an answer option.</p>';
            return;
        }
        
        userAnswer = selectedOption.value;
    } else {
        userAnswer = document.getElementById('user-answer').value.trim();
        
        if (userAnswer === '') {
            feedbackArea.innerHTML = '<p class="feedback error">Please enter an answer.</p>';
            return;
        }
    }
    
    const isCorrect = additionModule.checkAnswer(appState.currentProblem, userAnswer);
    
    if (isCorrect) {
        feedbackArea.innerHTML = '<p class="feedback correct">Correct! Great job!</p>';
        appState.problemsCompleted++;
        
        // Check if level is complete
        if (appState.problemsCompleted >= appState.currentAdditionLevel.problemCount) {
            feedbackArea.innerHTML += '<p class="level-complete">Level complete! Choose another level or try again.</p>';
        } else {
            // Generate a new problem after a short delay
            setTimeout(() => generateNewAdditionProblem(additionModule), 1500);
        }
    } else {
        feedbackArea.innerHTML = '<p class="feedback incorrect">Not quite right. Try again!</p>';
    }
    
    // Clear the input
    if (!appState.currentProblem.multipleChoice) {
        document.getElementById('user-answer').value = '';
    }
}

// Fallback for browsers without module support
function handleModuleError() {
    const mainContainer = document.getElementById('game-area');
    if (mainContainer) {
        mainContainer.innerHTML = `
            <div class="error-message">
                <h2>Browser Compatibility Issue</h2>
                <p>This application requires a modern browser that supports JavaScript modules.</p>
                <p>Please try using a recent version of Chrome, Firefox, Safari, or Edge.</p>
            </div>
        `;
    }
}

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.message);
});