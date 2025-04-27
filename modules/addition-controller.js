/**
 * Addition Adventure Controller Module
 * Manages the Addition Adventure module functionality
 */

import { appState } from './main.js';
import { clearFeedbackArea } from './ui-controller.js';
import { showWordProblemHint, showAdditionHint } from './hint-provider.js';
import { identifyPropertyType } from './property-helper.js';

// Addition Adventure initialization
export function initAdditionAdventure(additionModule) {
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
        
        // For Level 6 (Properties), show guide button before starting
        if (levelId === 6) {
            showPropertiesGuidePrompt();
        } else {
            // Generate and display the first problem
            generateNewAdditionProblem(additionModule);
            
            // Set up the input area
            setupAdditionInputArea(additionModule);
        }
    }
}

// Show prompt to view properties guide for Level 6
function showPropertiesGuidePrompt() {
    const problemDisplay = document.getElementById('current-addition-problem');
    const visualTools = document.getElementById('visual-tools');
    const inputArea = document.getElementById('input-area');
    
    // Clear existing content
    if (visualTools) visualTools.innerHTML = '';
    if (inputArea) inputArea.innerHTML = '';
    
    // Show the guide prompt
    problemDisplay.innerHTML = `
        <div class="properties-intro">
            <h4>Welcome to Addition Properties!</h4>
            <p>Before you start solving problems, it's important to understand the three main addition properties:</p>
            
            <div class="properties-preview">
                <div class="property-preview commutative">
                    <h5>Commutative Property</h5>
                    <div class="property-formula">a + b = b + a</div>
                    <p>The order of addends doesn't change the sum.</p>
                </div>
                
                <div class="property-preview associative">
                    <h5>Associative Property</h5>
                    <div class="property-formula">(a + b) + c = a + (b + c)</div>
                    <p>The grouping of addends doesn't change the sum.</p>
                </div>
                
                <div class="property-preview identity">
                    <h5>Identity Property</h5>
                    <div class="property-formula">a + 0 = a</div>
                    <p>Adding zero to any number gives the same number.</p>
                </div>
            </div>
            
            <div class="guide-cta">
                <p>Would you like to learn more about these properties before starting the exercises?</p>
                <a href="addition-properties-guide.html" target="_blank" class="guide-button large-guide-btn">
                    <span class="guide-icon">📚</span> View Properties Guide
                </a>
                <button id="start-properties-exercises" class="start-btn">Start Exercises</button>
            </div>
        </div>
    `;
    
    // Add event listener to the start button
    document.getElementById('start-properties-exercises').addEventListener('click', function() {
        // Import the module directly to avoid circular dependencies
        import('../addition-levels.js').then(additionModule => {
            generateNewAdditionProblem(additionModule);
            setupAdditionInputArea(additionModule);
        });
    });
}

// Generate a new addition problem
export function generateNewAdditionProblem(additionModule) {
    if (!appState.currentAdditionLevel) return;
    
    // Clear any existing feedback when generating a new problem
    clearFeedbackArea();
    
    appState.currentProblem = additionModule.getRandomProblem(appState.currentAdditionLevel.id);
    
    const problemDisplay = document.getElementById('current-addition-problem');
    
    if (appState.currentProblem.isWordProblem) {
        problemDisplay.innerHTML = `
            <div class="word-problem">
                <p>${appState.currentProblem.display}</p>
                <button id="show-hint-btn" class="hint-btn hint-pulse">Show Hint</button>
            </div>
        `;
    } else if (appState.currentProblem.multipleChoice) {
        // For property problems at Level 6
        if (appState.currentAdditionLevel.id === 6) {
            // Ensure the property type is identified and stored
            if (!appState.currentProblem.propertyType) {
                appState.currentProblem.propertyType = identifyPropertyType(appState.currentProblem);
            }
        }
        
        problemDisplay.innerHTML = `
            <div class="math-problem properties-problem">
                <h4>Addition Properties</h4>
                <p class="problem-text">${appState.currentProblem.display.split('\n')[0]}</p>
                <div class="multiple-choice-options">
                    <div class="option-row">
                        <input type="radio" id="option-a" name="property-option" value="A">
                        <label for="option-a">${appState.currentProblem.display.split('\n')[1].trim()}</label>
                    </div>
                    <div class="option-row">
                        <input type="radio" id="option-b" name="property-option" value="B">
                        <label for="option-b">${appState.currentProblem.display.split('\n')[2].trim()}</label>
                    </div>
                    <div class="option-row">
                        <input type="radio" id="option-c" name="property-option" value="C">
                        <label for="option-c">${appState.currentProblem.display.split('\n')[3].trim()}</label>
                    </div>
                    <div class="option-row">
                        <input type="radio" id="option-d" name="property-option" value="D">
                        <label for="option-d">${appState.currentProblem.display.split('\n')[4].trim()}</label>
                    </div>
                </div>
                <button id="show-hint-btn" class="hint-btn hint-pulse">Show Hint</button>
            </div>
        `;
    } else {
        const showHintForLevels = [2, 3, 4, 6, 7, 8];
        const showHint = showHintForLevels.includes(appState.currentAdditionLevel.id);
        
        problemDisplay.innerHTML = `
            <div class="math-problem">
                <h4>Solve:</h4>
                <p class="problem-text">${appState.currentProblem.display}</p>
                ${showHint ? '<button id="show-hint-btn" class="hint-btn hint-pulse">Show Hint</button>' : ''}
            </div>
        `;
    }
    
    // Set up visual tools based on level
    setupAdditionVisualTools();
    
    // Hide hint container when generating new problem
    const hintContainer = document.getElementById('hint-container');
    if (hintContainer) {
        hintContainer.style.display = 'none';
    }
    
    // Add event listener to hint button if it exists
    const hintBtn = document.getElementById('show-hint-btn');
    if (hintBtn) {
        hintBtn.addEventListener('click', function() {
            // Remove pulse effect when clicked
            this.classList.remove('hint-pulse');
            
            // Ensure the hint container is visible
            const hintContainer = document.getElementById('hint-container');
            if (hintContainer) {
                hintContainer.style.display = 'block';
                
                // Scroll to the hint container
                hintContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            if (appState.currentProblem.isWordProblem) {
                showWordProblemHint(appState.currentProblem);
            } else {
                showAdditionHint(appState.currentProblem, appState.currentAdditionLevel.id);
            }
        });
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
        } 
        else if (levelId === 7 || levelId === 8) {
            // Level 7/8: Four-digit place value chart
            const specialCarrying = levelId === 8;
            
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
                    <p class="chart-hint">${specialCarrying ? 
                        'Focus on carrying carefully from column to column, starting from the ones place.' : 
                        'Focus on adding each place value column separately, starting from the ones place and carrying when needed.'}
                    </p>
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
        
        // For property problems, show explanation
        if (appState.currentProblem.multipleChoice && appState.currentProblem.explanation) {
            // Add property-specific styling
            let propertyClass = '';
            if (appState.currentProblem.propertyType) {
                propertyClass = appState.currentProblem.propertyType + '-feedback';
            }
            
            feedbackArea.innerHTML += `
                <div class="explanation-box ${propertyClass}">
                    <h5>Explanation:</h5>
                    <p>${appState.currentProblem.explanation}</p>
                </div>
            `;
        }
        
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
