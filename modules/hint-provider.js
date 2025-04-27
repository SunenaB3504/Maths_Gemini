/**
 * Hint Provider Module
 * Provides hints for various problem types
 */

import { identifyPropertyType, PROPERTY_TYPES } from './property-helper.js';
import { generateDetailedFourDigitHint, generateDetailedLevel8Hint } from './four-digit-helper.js';

// Function to show hints for word problems
export function showWordProblemHint(problem) {
    const hintContainer = document.getElementById('hint-container');
    const hintContent = document.getElementById('hint-content');
    
    if (!hintContainer || !hintContent) return;
    
    // Show the hint container
    hintContainer.style.display = 'block';
    
    // Extract numbers from the problem for the hint
    const num1 = problem.num1;
    const num2 = problem.num2;
    const wordContext = problem.wordContext || 'addition';
    const answer = num1 + num2;
    
    // Create a general structure for solving word problems
    let hintHTML = `
        <div class="word-problem-hint">
            <h4>Solving this Word Problem Step-by-Step</h4>
            
            <div class="hint-step">
                <div class="step-header">
                    <span class="step-number">1</span>
                    <h5>Read and understand what the problem is asking</h5>
                </div>
                <div class="step-content">
                    <p>This problem is about <span class="hint-highlight">${wordContext}</span>.</p>
                    <p class="hint-tip"><strong>Tip:</strong> Identify the question by looking for phrases like "How many in total?", "How many altogether?", or "What is the sum?"</p>
                </div>
                <div class="step-visual">
                    <img src="images/read-problem-icon.png" alt="Read Problem" class="step-icon" onerror="this.style.display='none';">
                </div>
            </div>
            
            <div class="hint-step">
                <div class="step-header">
                    <span class="step-number">2</span>
                    <h5>Identify the important information</h5>
                </div>
                <div class="step-content">
                    <p>Look for the key numbers or quantities in the problem:</p>
                    <ul class="hint-data">
                        <li>First value: <span class="hint-highlight">${num1}</span></li>
                        <li>Second value: <span class="hint-highlight">${num2}</span></li>
                    </ul>
                    <p class="hint-tip"><strong>Tip:</strong> Underline the numbers and what they represent as you read the problem.</p>
                </div>
            </div>
            
            <div class="hint-step">
                <div class="step-header">
                    <span class="step-number">3</span>
                    <h5>Decide on the operation needed</h5>
                </div>
                <div class="step-content">
                    <p>This problem requires <span class="hint-highlight">addition</span> because we need to find the total or combined amount.</p>
                    <p class="hint-tip"><strong>Tip:</strong> Look for key words that signal addition:</p>
                    <div class="keyword-list">
                        <span class="math-keyword">total</span>
                        <span class="math-keyword">altogether</span>
                        <span class="math-keyword">sum</span>
                        <span class="math-keyword">combined</span>
                        <span class="math-keyword">in all</span>
                        <span class="math-keyword">more</span>
                    </div>
                </div>
            </div>
            
            <div class="hint-step">
                <div class="step-header">
                    <span class="step-number">4</span>
                    <h5>Set up the equation</h5>
                </div>
                <div class="step-content">
                    <div class="equation-setup">
                        <p>We need to find the total of ${num1} and ${num2}</p>
                        <div class="equation">${num1} + ${num2} = ?</div>
                    </div>
                </div>
            </div>
            
            <div class="hint-step">
                <div class="step-header">
                    <span class="step-number">5</span>
                    <h5>Solve the equation</h5>
                </div>
                <div class="step-content">
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
                                <span class="num">${answer}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="hint-step answer-step">
                <div class="step-header">
                    <span class="step-number">6</span>
                    <h5>Write your final answer with units</h5>
                </div>
                <div class="step-content">
                    <p>The answer is <span class="hint-answer">${answer}</span>.</p>
                    <p class="hint-tip"><strong>Remember:</strong> Include the appropriate units in your answer (like apples, students, etc.)</p>
                </div>
            </div>
            
            <div class="hint-step">
                <div class="step-header">
                    <span class="step-number">7</span>
                    <h5>Check your answer</h5>
                </div>
                <div class="step-content">
                    <p>Always check if your answer makes sense in the context of the problem:</p>
                    <ul class="check-questions">
                        <li>Is the answer reasonable?</li>
                        <li>Did I answer the question that was asked?</li>
                        <li>Did I use the correct operation?</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="problem-solving-summary">
            <h4>Summary: Word Problem Solving Strategy</h4>
            <ol class="strategy-list">
                <li>Read and understand the problem</li>
                <li>Identify the important information</li>
                <li>Decide on the operation</li>
                <li>Set up the equation</li>
                <li>Solve the equation</li>
                <li>Write the answer with units</li>
                <li>Check your work</li>
            </ol>
        </div>
    `;
    
    hintContent.innerHTML = hintHTML;
}

// Function to show hints for addition problems
export function showAdditionHint(problem, levelId) {
    const hintContainer = document.getElementById('hint-container');
    const hintContent = document.getElementById('hint-content');
    
    if (!hintContainer || !hintContent) {
        console.error("Hint container or content elements not found");
        return;
    }
    
    // Show the hint container
    hintContainer.style.display = 'block';
    
    const num1 = problem.num1;
    const num2 = problem.num2;
    
    // For Level 2 (two-digit + one-digit)
    if (levelId === 2) {
        const tens = Math.floor(num1 / 10);
        const ones = num1 % 10;
        const newOnes = ones + num2;
        const carryNeeded = newOnes > 9;
        
        let hintHTML = `
            <div class="hint-step">
                <p><strong>Step 1:</strong> Break down ${num1} into tens and ones.</p>
                <p>${num1} = ${tens} tens and ${ones} ones</p>
            </div>
            
            <div class="hint-step">
                <p><strong>Step 2:</strong> Add the ones digits: ${ones} + ${num2}</p>
                <p>${ones} + ${num2} = ${ones + num2}</p>
            </div>
        `;
        
        // Add additional hint content for Level 2...
        
        hintContent.innerHTML = hintHTML;
    }
    // For Level 3 (double-digit addition)
    else if (levelId === 3) {
        const tens1 = Math.floor(num1 / 10);
        const ones1 = num1 % 10;
        const tens2 = Math.floor(num2 / 10);
        const ones2 = num2 % 10;
        
        const onesSum = ones1 + ones2;
        const onesCarry = onesSum >= 10 ? 1 : 0;
        const onesResult = onesSum % 10;
        
        const tensSum = tens1 + tens2 + onesCarry;
        const tensResult = tensSum % 10;
        const hundredsCarry = Math.floor(tensSum / 10);
        
        let hintHTML = `
            <h4>Double-Digit Addition</h4>
            
            <div class="hint-step">
                <p><strong>Step 1:</strong> Line up the numbers by place value</p>
                <div class="double-digit-addition-hint">
                    <div class="carries"></div>
                    <div class="first-number">${tens1}${ones1}</div>
                    <div class="operator">+</div>
                    <div class="second-number">${tens2}${ones2}</div>
                    <div class="underline"></div>
                    <div class="result">?</div>
                </div>
                <p class="explanation">Make sure to align the tens and ones places.</p>
            </div>
            
            <div class="hint-step">
                <p><strong>Step 2:</strong> Add the ones place digits: ${ones1} + ${ones2} = ${onesSum}</p>
                <div class="double-digit-addition-hint">
                    <div class="carries">
                        ${onesCarry ? '<span class="tens-carry">1</span>' : ''}
                    </div>
                    <div class="first-number">${tens1}${ones1}</div>
                    <div class="operator">+</div>
                    <div class="second-number">${tens2}${ones2}</div>
                    <div class="underline"></div>
                    <div class="result">
                        <span class="ones-digit">${onesResult}</span>
                    </div>
                </div>
                <div class="place-value-explanation">
                    ${onesCarry ? `
                        <p>Since ${ones1} + ${ones2} = ${onesSum}, which is 10 or more:</p>
                        <ul>
                            <li>Write ${onesResult} in the ones place</li>
                            <li>Carry the 1 to the tens column</li>
                        </ul>
                    ` : `
                        <p>Write ${onesSum} in the ones place.</p>
                    `}
                </div>
            </div>
            
            <div class="hint-step">
                <p><strong>Step 3:</strong> Add the tens place digits: ${onesCarry ? '1 + ' : ''}${tens1} + ${tens2} = ${tensSum}</p>
                <div class="double-digit-addition-hint">
                    <div class="carries">
                        ${onesCarry ? '<span class="tens-carry">1</span>' : ''}
                        ${hundredsCarry ? '<span class="hundreds-carry">1</span>' : ''}
                    </div>
                    <div class="first-number">${tens1}${ones1}</div>
                    <div class="operator">+</div>
                    <div class="second-number">${tens2}${ones2}</div>
                    <div class="underline"></div>
                    <div class="result">
                        ${hundredsCarry ? '<span class="hundreds-digit">1</span>' : ''}
                        <span class="tens-digit">${tensResult}</span>
                        <span class="ones-digit">${onesResult}</span>
                    </div>
                </div>
                <div class="place-value-explanation">
                    ${onesCarry ? `
                        <p>Remember to include the carried 1 when adding the tens place:</p>
                        <p>1 + ${tens1} + ${tens2} = ${tensSum}</p>
                    ` : `
                        <p>${tens1} + ${tens2} = ${tensSum}</p>
                    `}
                    
                    ${hundredsCarry ? `
                        <p>Since the tens column sum (${tensSum}) is 10 or more:</p>
                        <ul>
                            <li>Write ${tensResult} in the tens place</li>
                            <li>Write 1 in the hundreds place</li>
                        </ul>
                    ` : `
                        <p>Write ${tensSum} in the tens place.</p>
                    `}
                </div>
            </div>
            
            <div class="hint-answer">
                <p>Therefore, ${num1} + ${num2} = ${num1 + num2}</p>
            </div>
            
            <div class="hint-tips">
                <h4>Tips for Double-Digit Addition:</h4>
                <ul>
                    <li><strong>Align properly:</strong> Make sure the ones and tens places are properly aligned.</li>
                    <li><strong>Start with ones:</strong> Always start adding from the rightmost column (ones place).</li>
                    <li><strong>Carry when needed:</strong> If the sum in any place is 10 or more, carry to the next place.</li>
                    <li><strong>Check your work:</strong> Add again from left to right to verify your answer.</li>
                </ul>
            </div>
        `;
        
        hintContent.innerHTML = hintHTML;
    }
    // For Level 6 (Addition Properties)
    else if (levelId === 6) {
        // Use the helper to identify which property the problem is focusing on
        const propertyType = identifyPropertyType(problem);
        
        let hintHTML = `
            <div class="property-explanation">
                <h4>Addition Properties</h4>
                <p>Addition properties help us understand how addition works and give us shortcuts for solving problems.</p>
        `;
        
        // Add specific property explanation based on problem type
        if (propertyType === PROPERTY_TYPES.COMMUTATIVE) {
            hintHTML += `
                <div class="property-section commutative">
                    <h4>Commutative Property</h4>
                    <div class="property-formula">
                        a + b = b + a
                    </div>
                    <p>The <strong>commutative property</strong> states that the order of addends doesn't change the sum.</p>
                    <div class="property-example">
                        <p>For example: ${num1} + ${num2} = ${num2} + ${num1} = ${num1 + num2}</p>
                        <p>No matter which number we add first, the result is the same!</p>
                    </div>
                    <div class="property-visual commutative-visual">
                        <div class="visual-row">
                            <div class="blocks-container">
                                <div class="block-group">
                                    ${generateVisualBlocks("a", num1)}
                                </div>
                                <span class="operator-symbol">+</span>
                                <div class="block-group">
                                    ${generateVisualBlocks("b", num2)}
                                </div>
                            </div>
                            <span class="equals-symbol">=</span>
                            <span class="result">${num1 + num2}</span>
                        </div>
                        <div class="visual-row">
                            <div class="blocks-container">
                                <div class="block-group">
                                    ${generateVisualBlocks("b", num2)}
                                </div>
                                <span class="operator-symbol">+</span>
                                <div class="block-group">
                                    ${generateVisualBlocks("a", num1)}
                                </div>
                            </div>
                            <span class="equals-symbol">=</span>
                            <span class="result">${num1 + num2}</span>
                        </div>
                        <p class="property-name">Commutative Property: a + b = b + a</p>
                    </div>
                    <div class="property-tips">
                        <h5>When to use this property:</h5>
                        <ul>
                            <li>When you want to rearrange addends to make calculation easier</li>
                            <li>When you want to check if two expressions are equal</li>
                        </ul>
                    </div>
                </div>
            `;
        } 
        // ...rest of the hint generation for other properties remains the same
        
        // Store the identified property type in the problem object for later reference
        problem.propertyType = propertyType;
        
        hintContent.innerHTML = hintHTML;
    }
    // For Level 7 (four-digit addition)
    else if (levelId === 7) {
        try {
            // Generate enhanced detailed hint
            let hintHTML = generateDetailedFourDigitHint(num1, num2);
            hintContent.innerHTML = hintHTML;
        } catch (err) {
            console.error("Error generating Level 7 hint:", err);
            // Fallback to basic hint if there's an error
            hintContent.innerHTML = `
                <div class="basic-hint">
                    <h4>Addition Hint</h4>
                    <p>To add four-digit numbers:</p>
                    <ol>
                        <li>Line up the numbers by place value</li>
                        <li>Add each column from right to left</li>
                        <li>Carry when needed</li>
                    </ol>
                    <p>For this problem: ${num1} + ${num2} = ${num1 + num2}</p>
                </div>
            `;
        }
    }
    // For Level 8 (four-digit addition with multiple carries)
    else if (levelId === 8) {
        try {
            // Generate specialized Level 8 hint with focus on carrying
            let hintHTML = generateDetailedLevel8Hint(num1, num2);
            hintContent.innerHTML = hintHTML;
        } catch (err) {
            console.error("Error generating Level 8 hint:", err);
            // Fallback to basic hint if there's an error
            hintContent.innerHTML = `
                <div class="basic-hint">
                    <h4>Addition with Multiple Carries</h4>
                    <p>This level focuses on four-digit addition problems that require multiple carrying operations.</p>
                    <ol>
                        <li>Line up the numbers by place value</li>
                        <li>Add each column from right to left (starting with ones)</li>
                        <li>When a column sum is 10 or more, carry the tens digit to the next column</li>
                        <li>Don't forget to include carried digits in your calculation for each column</li>
                    </ol>
                    <p>For this problem: ${num1} + ${num2} = ${num1 + num2}</p>
                </div>
            `;
        }
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

// Helper function to generate visual blocks for addition properties
function generateVisualBlocks(type, count) {
    let blocks = '';
    const className = type === 'a' ? 'block-a' : (type === 'b' ? 'block-b' : 'block-c');
    
    for (let i = 0; i < count; i++) {
        blocks += `<div class="block ${className}">${type}</div>`;
    }
    
    return blocks;
}
