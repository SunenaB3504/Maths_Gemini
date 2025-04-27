/**
 * Four-Digit Addition Helper Module
 * Provides enhanced visual and conceptual guidance for four-digit addition
 */

/**
 * Generate detailed step-by-step hint for four-digit addition
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @returns {string} HTML string with detailed hint content
 */
export function generateDetailedFourDigitHint(num1, num2) {
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
    
    // Determine the difficulty level of the problem
    const hasNoCarrying = onesCarry === 0 && tensCarry === 0 && hundredsCarry === 0;
    const hasMultipleCarries = (onesCarry + tensCarry + hundredsCarry) > 1;
    const hasCarryToFifthDigit = tenThousandsResult > 0;
    
    let difficultyConcept = "";
    if (hasNoCarrying) {
        difficultyConcept = "simple";
    } else if (hasMultipleCarries) {
        difficultyConcept = "multiple carries";
    } else if (hasCarryToFifthDigit) {
        difficultyConcept = "carry to fifth digit";
    } else {
        difficultyConcept = "single carry";
    }
    
    return `
        <div class="elaborate-hint">
            <div class="hint-header">
                <h4>Four-Digit Addition Guide</h4>
                <div class="hint-summary">
                    <p>Adding <span class="num-highlight">${num1}</span> + <span class="num-highlight">${num2}</span></p>
                    <p class="hint-type">${hasNoCarrying ? 'Simple addition' : hasMultipleCarries ? 'Addition with multiple carries' : 'Addition with carrying'}</p>
                </div>
            </div>
            
            <div class="strategy-section">
                <div class="hint-section-header">
                    <span class="section-icon">🧠</span>
                    <h5>Understanding the Strategy</h5>
                </div>
                <p>To add large numbers, we use the <strong>column method</strong>, where we:</p>
                <ul class="strategy-steps">
                    <li>Line up digits by place value (ones, tens, hundreds, thousands)</li>
                    <li>Add digits in each column, starting from the right (ones place)</li>
                    <li>When a column sum is 10 or more, "carry" the tens digit to the next column</li>
                </ul>
            </div>
            
            <div class="place-value-section">
                <div class="hint-section-header">
                    <span class="section-icon">📊</span>
                    <h5>Place Value Breakdown</h5>
                </div>
                <div class="place-value-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Thousands</th>
                                <th>Hundreds</th>
                                <th>Tens</th>
                                <th>Ones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${num1}</td>
                                <td>${thousands1}</td>
                                <td>${hundreds1}</td>
                                <td>${tens1}</td>
                                <td>${ones1}</td>
                            </tr>
                            <tr>
                                <td>${num2}</td>
                                <td>${thousands2}</td>
                                <td>${hundreds2}</td>
                                <td>${tens2}</td>
                                <td>${ones2}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="step-by-step-section">
                <div class="hint-section-header">
                    <span class="section-icon">📝</span>
                    <h5>Step-by-Step Solution</h5>
                </div>
                
                <div class="visual-step">
                    <div class="step-header">
                        <div class="step-number">1</div>
                        <div class="step-description">Line up the numbers by place value</div>
                    </div>
                    <div class="step-visual setup-step">
                        <div class="column-addition-visual">
                            <div class="equation-row number1">
                                <span class="digit">${thousands1}</span>
                                <span class="digit">${hundreds1}</span>
                                <span class="digit">${tens1}</span>
                                <span class="digit">${ones1}</span>
                            </div>
                            <div class="equation-row">
                                <span class="operator">+</span>
                            </div>
                            <div class="equation-row number2">
                                <span class="digit">${thousands2}</span>
                                <span class="digit">${hundreds2}</span>
                                <span class="digit">${tens2}</span>
                                <span class="digit">${ones2}</span>
                            </div>
                            <div class="equation-line"></div>
                            <div class="equation-row result">
                                <span class="placeholder">____</span>
                            </div>
                        </div>
                        <div class="place-value-labels">
                            <span>Th</span>
                            <span>H</span>
                            <span>T</span>
                            <span>O</span>
                        </div>
                    </div>
                </div>
                
                <div class="visual-step">
                    <div class="step-header">
                        <div class="step-number">2</div>
                        <div class="step-description">
                            Add the ones place: ${ones1} + ${ones2} = ${onesSum}
                            ${onesCarry ? `(Write ${onesResult}, carry ${Math.floor(onesSum/10)})` : ''}
                        </div>
                    </div>
                    <div class="step-visual">
                        <div class="column-addition-visual">
                            <div class="carry-row">
                                ${onesCarry ? '<span class="carry-digit">1</span>' : '<span></span>'}
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div class="equation-row number1">
                                <span class="digit">${thousands1}</span>
                                <span class="digit">${hundreds1}</span>
                                <span class="digit">${tens1}</span>
                                <span class="digit">${ones1}</span>
                            </div>
                            <div class="equation-row">
                                <span class="operator">+</span>
                            </div>
                            <div class="equation-row number2">
                                <span class="digit">${thousands2}</span>
                                <span class="digit">${hundreds2}</span>
                                <span class="digit">${tens2}</span>
                                <span class="digit">${ones2}</span>
                            </div>
                            <div class="equation-line"></div>
                            <div class="equation-row result">
                                <span class="digit result-digit">${onesResult}</span>
                            </div>
                        </div>
                        <div class="place-value-labels">
                            <span>Th</span>
                            <span>H</span>
                            <span>T</span>
                            <span class="active-column">O</span>
                        </div>
                        ${onesCarry ? `
                        <div class="carry-explanation">
                            <p>${ones1} + ${ones2} = ${onesSum}, which is 10 or more.</p>
                            <p>Write <strong>${onesResult}</strong> in the ones place and carry the <strong>1</strong> to the tens place.</p>
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="visual-step">
                    <div class="step-header">
                        <div class="step-number">3</div>
                        <div class="step-description">
                            Add the tens place: ${onesCarry ? '1 + ' : ''}${tens1} + ${tens2} = ${tensSum}
                            ${tensCarry ? `(Write ${tensResult}, carry ${Math.floor(tensSum/10)})` : ''}
                        </div>
                    </div>
                    <div class="step-visual">
                        <div class="column-addition-visual">
                            <div class="carry-row">
                                ${tensCarry ? '<span class="carry-digit">1</span>' : '<span></span>'}
                                ${onesCarry ? '<span class="carry-digit">1</span>' : '<span></span>'}
                                <span></span>
                                <span></span>
                            </div>
                            <div class="equation-row number1">
                                <span class="digit">${thousands1}</span>
                                <span class="digit">${hundreds1}</span>
                                <span class="digit">${tens1}</span>
                                <span class="digit">${ones1}</span>
                            </div>
                            <div class="equation-row">
                                <span class="operator">+</span>
                            </div>
                            <div class="equation-row number2">
                                <span class="digit">${thousands2}</span>
                                <span class="digit">${hundreds2}</span>
                                <span class="digit">${tens2}</span>
                                <span class="digit">${ones2}</span>
                            </div>
                            <div class="equation-line"></div>
                            <div class="equation-row result">
                                <span class="digit">${tensResult}</span>
                                <span class="digit">${onesResult}</span>
                            </div>
                        </div>
                        <div class="place-value-labels">
                            <span>Th</span>
                            <span>H</span>
                            <span class="active-column">T</span>
                            <span>O</span>
                        </div>
                        ${tensCarry ? `
                        <div class="carry-explanation">
                            <p>${onesCarry ? '1 + ' : ''}${tens1} + ${tens2} = ${tensSum}, which is 10 or more.</p>
                            <p>Write <strong>${tensResult}</strong> in the tens place and carry the <strong>1</strong> to the hundreds place.</p>
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="visual-step">
                    <div class="step-header">
                        <div class="step-number">4</div>
                        <div class="step-description">
                            Add the hundreds place: ${tensCarry ? '1 + ' : ''}${hundreds1} + ${hundreds2} = ${hundredsSum}
                            ${hundredsCarry ? `(Write ${hundredsResult}, carry ${Math.floor(hundredsSum/10)})` : ''}
                        </div>
                    </div>
                    <div class="step-visual">
                        <div class="column-addition-visual">
                            <div class="carry-row">
                                ${hundredsCarry ? '<span class="carry-digit">1</span>' : '<span></span>'}
                                ${tensCarry ? '<span class="carry-digit">1</span>' : '<span></span>'}
                                ${onesCarry ? '<span class="carry-digit">1</span>' : '<span></span>'}
                                <span></span>
                            </div>
                            <div class="equation-row number1">
                                <span class="digit">${thousands1}</span>
                                <span class="digit">${hundreds1}</span>
                                <span class="digit">${tens1}</span>
                                <span class="digit">${ones1}</span>
                            </div>
                            <div class="equation-row">
                                <span class="operator">+</span>
                            </div>
                            <div class="equation-row number2">
                                <span class="digit">${thousands2}</span>
                                <span class="digit">${hundreds2}</span>
                                <span class="digit">${tens2}</span>
                                <span class="digit">${ones2}</span>
                            </div>
                            <div class="equation-line"></div>
                            <div class="equation-row result">
                                <span class="digit">${hundredsResult}</span>
                                <span class="digit">${tensResult}</span>
                                <span class="digit">${onesResult}</span>
                            </div>
                        </div>
                        <div class="place-value-labels">
                            <span>Th</span>
                            <span class="active-column">H</span>
                            <span>T</span>
                            <span>O</span>
                        </div>
                        ${hundredsCarry ? `
                        <div class="carry-explanation">
                            <p>${tensCarry ? '1 + ' : ''}${hundreds1} + ${hundreds2} = ${hundredsSum}, which is 10 or more.</p>
                            <p>Write <strong>${hundredsResult}</strong> in the hundreds place and carry the <strong>1</strong> to the thousands place.</p>
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="visual-step">
                    <div class="step-header">
                        <div class="step-number">5</div>
                        <div class="step-description">
                            Add the thousands place: ${hundredsCarry ? '1 + ' : ''}${thousands1} + ${thousands2} = ${thousandsSum}
                            ${tenThousandsResult ? `(Write ${thousandsResult} and ${tenThousandsResult} in the ten-thousands place)` : ''}
                        </div>
                    </div>
                    <div class="step-visual">
                        <div class="column-addition-visual final-step">
                            <div class="carry-row">
                                <span></span>
                                ${hundredsCarry ? '<span class="carry-digit">1</span>' : '<span></span>'}
                                ${tensCarry ? '<span class="carry-digit">1</span>' : '<span></span>'}
                                ${onesCarry ? '<span class="carry-digit">1</span>' : '<span></span>'}
                            </div>
                            <div class="equation-row number1">
                                <span class="digit">${thousands1}</span>
                                <span class="digit">${hundreds1}</span>
                                <span class="digit">${tens1}</span>
                                <span class="digit">${ones1}</span>
                            </div>
                            <div class="equation-row">
                                <span class="operator">+</span>
                            </div>
                            <div class="equation-row number2">
                                <span class="digit">${thousands2}</span>
                                <span class="digit">${hundreds2}</span>
                                <span class="digit">${tens2}</span>
                                <span class="digit">${ones2}</span>
                            </div>
                            <div class="equation-line"></div>
                            <div class="equation-row result">
                                ${tenThousandsResult ? `<span class="digit extra-digit">${tenThousandsResult}</span>` : ''}
                                <span class="digit">${thousandsResult}</span>
                                <span class="digit">${hundredsResult}</span>
                                <span class="digit">${tensResult}</span>
                                <span class="digit">${onesResult}</span>
                            </div>
                        </div>
                        <div class="place-value-labels">
                            ${tenThousandsResult ? '<span>TTh</span>' : ''}
                            <span class="active-column">Th</span>
                            <span>H</span>
                            <span>T</span>
                            <span>O</span>
                        </div>
                        ${tenThousandsResult ? `
                        <div class="carry-explanation">
                            <p>${hundredsCarry ? '1 + ' : ''}${thousands1} + ${thousands2} = ${thousandsSum}, which is 10 or more.</p>
                            <p>Write <strong>${thousandsResult}</strong> in the thousands place and write <strong>${tenThousandsResult}</strong> in the ten-thousands place.</p>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            <div class="final-answer-section">
                <div class="hint-section-header">
                    <span class="section-icon">✓</span>
                    <h5>Final Answer</h5>
                </div>
                <div class="final-answer">
                    <div class="equation">
                        <span>${num1}</span>
                        <span>+</span>
                        <span>${num2}</span>
                        <span>=</span>
                        <span class="result-value">${num1 + num2}</span>
                    </div>
                </div>
            </div>
            
            <div class="helpful-tips-section">
                <div class="hint-section-header">
                    <span class="section-icon">💡</span>
                    <h5>Helpful Tips</h5>
                </div>
                <div class="tips-container">
                    <div class="tip">
                        <span class="tip-icon">👉</span>
                        <div class="tip-content">
                            <h6>Line Up Digits</h6>
                            <p>Always align digits by their place value: ones under ones, tens under tens, etc.</p>
                        </div>
                    </div>
                    <div class="tip">
                        <span class="tip-icon">👉</span>
                        <div class="tip-content">
                            <h6>Start from the Right</h6>
                            <p>Always start adding from the rightmost column (ones place) and move left.</p>
                        </div>
                    </div>
                    <div class="tip">
                        <span class="tip-icon">👉</span>
                        <div class="tip-content">
                            <h6>Remember to Carry</h6>
                            <p>If a column sum is 10 or more, write down the ones digit and carry the tens digit to the next column.</p>
                        </div>
                    </div>
                    <div class="tip">
                        <span class="tip-icon">👉</span>
                        <div class="tip-content">
                            <h6>Check Your Answer</h6>
                            <p>Verify your answer by estimating or adding the columns again from left to right.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="common-mistakes-section">
                <div class="hint-section-header">
                    <span class="section-icon">⚠️</span>
                    <h5>Watch Out For</h5>
                </div>
                <ul class="mistake-list">
                    <li>Forgetting to include carried digits in your addition</li>
                    <li>Misaligning place values when setting up the problem</li>
                    <li>Simple calculation errors when adding digits</li>
                    ${hasCarryToFifthDigit ? '<li>Forgetting the "1" in the ten-thousands place for the final answer</li>' : ''}
                </ul>
            </div>
        </div>
    `;
}

/**
 * Generate detailed hint specifically for Level 8 (Four-digit addition with multiple carries)
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @returns {string} HTML string with detailed hint content
 */
export function generateDetailedLevel8Hint(num1, num2) {
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
    
    // Count carries for this problem
    const totalCarries = onesCarry + tensCarry + hundredsCarry + (tenThousandsResult > 0 ? 1 : 0);
    
    return `
        <div class="elaborate-hint level-8-hint">
            <div class="hint-header">
                <h4>Four-Digit Addition with Multiple Carries</h4>
                <div class="hint-summary">
                    <p>Adding <span class="num-highlight">${num1}</span> + <span class="num-highlight">${num2}</span></p>
                    <p class="hint-type">Advanced addition with ${totalCarries} carries</p>
                </div>
            </div>
            
            <div class="carrying-focus-section">
                <div class="carry-badge">
                    <span class="carry-count">${totalCarries}</span>
                    <span class="carry-label">Carries</span>
                </div>
                <div class="carry-explanation">
                    <h5>Level 8 Focus: Managing Multiple Carries</h5>
                    <p>Problems in this level are designed to give you practice with multiple carrying operations. 
                    When a column sum is 10 or greater, we "carry" a digit to the next column.</p>
                    <div class="carry-tips">
                        <p><strong>Key to Success:</strong> Keep track of all carries and add them first when working on the next column.</p>
                    </div>
                </div>
            </div>
            
            <div class="step-by-step-section">
                <div class="hint-section-header">
                    <span class="section-icon">🔢</span>
                    <h5>Step-by-Step Solution</h5>
                </div>
                
                <div class="visualization-container">
                    <div class="steps-container">
                        <!-- Initial setup -->
                        <div class="addition-step">
                            <div class="step-header">
                                <div class="step-number">1</div>
                                <div class="step-title">Set up the problem</div>
                            </div>
                            <div class="addition-work">
                                <div class="addition-grid">
                                    <div class="carry-row">
                                        <span></span><span></span><span></span><span></span>
                                    </div>
                                    <div class="number-row">
                                        <span class="digit">${thousands1}</span>
                                        <span class="digit">${hundreds1}</span>
                                        <span class="digit">${tens1}</span>
                                        <span class="digit">${ones1}</span>
                                    </div>
                                    <div class="plus-row">
                                        <span class="operator">+</span>
                                    </div>
                                    <div class="number-row">
                                        <span class="digit">${thousands2}</span>
                                        <span class="digit">${hundreds2}</span>
                                        <span class="digit">${tens2}</span>
                                        <span class="digit">${ones2}</span>
                                    </div>
                                    <div class="line-row">
                                        <span class="line" colspan="4"></span>
                                    </div>
                                    <div class="result-row">
                                        <span></span><span></span><span></span><span></span>
                                    </div>
                                </div>
                                <div class="step-explanation">
                                    <p>Line up the numbers by place value.</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Ones column -->
                        <div class="addition-step">
                            <div class="step-header">
                                <div class="step-number">2</div>
                                <div class="step-title">Add the ones place</div>
                            </div>
                            <div class="addition-work">
                                <div class="addition-grid">
                                    <div class="carry-row">
                                        ${onesCarry ? '<span></span><span></span><span class="carry">1</span><span></span>' : '<span></span><span></span><span></span><span></span>'}
                                    </div>
                                    <div class="number-row">
                                        <span class="digit">${thousands1}</span>
                                        <span class="digit">${hundreds1}</span>
                                        <span class="digit">${tens1}</span>
                                        <span class="digit highlight">${ones1}</span>
                                    </div>
                                    <div class="plus-row">
                                        <span class="operator">+</span>
                                    </div>
                                    <div class="number-row">
                                        <span class="digit">${thousands2}</span>
                                        <span class="digit">${hundreds2}</span>
                                        <span class="digit">${tens2}</span>
                                        <span class="digit highlight">${ones2}</span>
                                    </div>
                                    <div class="line-row">
                                        <span class="line" colspan="4"></span>
                                    </div>
                                    <div class="result-row">
                                        <span></span><span></span><span></span><span class="digit result">${onesResult}</span>
                                    </div>
                                </div>
                                <div class="step-explanation">
                                    <div class="calculation">
                                        <span>${ones1}</span>
                                        <span>+</span>
                                        <span>${ones2}</span>
                                        <span>=</span>
                                        <span class="calc-result">${onesSum}</span>
                                    </div>
                                    ${onesCarry ? `
                                    <p>Since ${onesSum} is 10 or greater:</p>
                                    <ul>
                                        <li>Write down ${onesResult} in the ones place</li>
                                        <li>Carry the 1 to the tens column</li>
                                    </ul>
                                    ` : `
                                    <p>Write ${onesSum} in the ones place.</p>
                                    `}
                                </div>
                            </div>
                        </div>
                        
                        <!-- Tens column -->
                        <div class="addition-step">
                            <div class="step-header">
                                <div class="step-number">3</div>
                                <div class="step-title">Add the tens place</div>
                            </div>
                            <div class="addition-work">
                                <div class="addition-grid">
                                    <div class="carry-row">
                                        ${tensCarry ? 
                                        `<span></span><span class="carry">1</span>${onesCarry ? '<span class="carry faded">1</span>' : '<span></span>'}<span></span>` :
                                        `<span></span><span></span>${onesCarry ? '<span class="carry faded">1</span>' : '<span></span>'}<span></span>`}
                                    </div>
                                    <div class="number-row">
                                        <span class="digit">${thousands1}</span>
                                        <span class="digit">${hundreds1}</span>
                                        <span class="digit highlight">${tens1}</span>
                                        <span class="digit faded">${ones1}</span>
                                    </div>
                                    <div class="plus-row">
                                        <span class="operator">+</span>
                                    </div>
                                    <div class="number-row">
                                        <span class="digit">${thousands2}</span>
                                        <span class="digit">${hundreds2}</span>
                                        <span class="digit highlight">${tens2}</span>
                                        <span class="digit faded">${ones2}</span>
                                    </div>
                                    <div class="line-row">
                                        <span class="line" colspan="4"></span>
                                    </div>
                                    <div class="result-row">
                                        <span></span><span></span><span class="digit result">${tensResult}</span><span class="digit faded-result">${onesResult}</span>
                                    </div>
                                </div>
                                <div class="step-explanation">
                                    <div class="calculation">
                                        ${onesCarry ? '<span class="carry-note">1</span>' : ''}<span>${tens1}</span>
                                        <span>+</span>
                                        <span>${tens2}</span>
                                        <span>=</span>
                                        <span class="calc-result">${tensSum}</span>
                                    </div>
                                    ${tensCarry ? `
                                    <p>Since ${tensSum} is 10 or greater:</p>
                                    <ul>
                                        <li>Write down ${tensResult} in the tens place</li>
                                        <li>Carry the 1 to the hundreds column</li>
                                    </ul>
                                    ` : `
                                    <p>Write ${tensSum} in the tens place.</p>
                                    `}
                                    ${onesCarry ? `
                                    <p class="carry-reminder"><strong>Remember:</strong> We included the carried 1 from the previous step!</p>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                        
                        <!-- Hundreds column -->
                        <div class="addition-step">
                            <div class="step-header">
                                <div class="step-number">4</div>
                                <div class="step-title">Add the hundreds place</div>
                            </div>
                            <div class="addition-work">
                                <div class="addition-grid">
                                    <div class="carry-row">
                                        ${hundredsCarry ? 
                                        `<span class="carry">1</span>${tensCarry ? '<span class="carry faded">1</span>' : '<span></span>'}<span></span><span></span>` :
                                        `<span></span>${tensCarry ? '<span class="carry faded">1</span>' : '<span></span>'}<span></span><span></span>`}
                                    </div>
                                    <div class="number-row">
                                        <span class="digit">${thousands1}</span>
                                        <span class="digit highlight">${hundreds1}</span>
                                        <span class="digit faded">${tens1}</span>
                                        <span class="digit faded">${ones1}</span>
                                    </div>
                                    <div class="plus-row">
                                        <span class="operator">+</span>
                                    </div>
                                    <div class="number-row">
                                        <span class="digit">${thousands2}</span>
                                        <span class="digit highlight">${hundreds2}</span>
                                        <span class="digit faded">${tens2}</span>
                                        <span class="digit faded">${ones2}</span>
                                    </div>
                                    <div class="line-row">
                                        <span class="line" colspan="4"></span>
                                    </div>
                                    <div class="result-row">
                                        <span></span><span class="digit result">${hundredsResult}</span><span class="digit faded-result">${tensResult}</span><span class="digit faded-result">${onesResult}</span>
                                    </div>
                                </div>
                                <div class="step-explanation">
                                    <div class="calculation">
                                        ${tensCarry ? '<span class="carry-note">1</span>' : ''}<span>${hundreds1}</span>
                                        <span>+</span>
                                        <span>${hundreds2}</span>
                                        <span>=</span>
                                        <span class="calc-result">${hundredsSum}</span>
                                    </div>
                                    ${hundredsCarry ? `
                                    <p>Since ${hundredsSum} is 10 or greater:</p>
                                    <ul>
                                        <li>Write down ${hundredsResult} in the hundreds place</li>
                                        <li>Carry the 1 to the thousands column</li>
                                    </ul>
                                    ` : `
                                    <p>Write ${hundredsSum} in the hundreds place.</p>
                                    `}
                                    ${tensCarry ? `
                                    <p class="carry-reminder"><strong>Remember:</strong> We included the carried 1 from the previous step!</p>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                        
                        <!-- Thousands column -->
                        <div class="addition-step">
                            <div class="step-header">
                                <div class="step-number">5</div>
                                <div class="step-title">Add the thousands place</div>
                            </div>
                            <div class="addition-work">
                                <div class="addition-grid final">
                                    <div class="carry-row">
                                        ${tenThousandsResult ? '<span class="carry carry-out">1</span>' : '<span></span>'}
                                        ${hundredsCarry ? '<span class="carry faded">1</span>' : '<span></span>'}
                                        <span></span><span></span>
                                    </div>
                                    <div class="number-row">
                                        <span class="digit highlight">${thousands1}</span>
                                        <span class="digit faded">${hundreds1}</span>
                                        <span class="digit faded">${tens1}</span>
                                        <span class="digit faded">${ones1}</span>
                                    </div>
                                    <div class="plus-row">
                                        <span class="operator">+</span>
                                    </div>
                                    <div class="number-row">
                                        <span class="digit highlight">${thousands2}</span>
                                        <span class="digit faded">${hundreds2}</span>
                                        <span class="digit faded">${tens2}</span>
                                        <span class="digit faded">${ones2}</span>
                                    </div>
                                    <div class="line-row">
                                        <span class="line" colspan="4"></span>
                                    </div>
                                    <div class="result-row">
                                        ${tenThousandsResult ? 
                                        `<span class="digit result extra-digit">${tenThousandsResult}</span>` : 
                                        ''}
                                        <span class="digit result">${thousandsResult}</span>
                                        <span class="digit faded-result">${hundredsResult}</span>
                                        <span class="digit faded-result">${tensResult}</span>
                                        <span class="digit faded-result">${onesResult}</span>
                                    </div>
                                </div>
                                <div class="step-explanation">
                                    <div class="calculation">
                                        ${hundredsCarry ? '<span class="carry-note">1</span>' : ''}<span>${thousands1}</span>
                                        <span>+</span>
                                        <span>${thousands2}</span>
                                        <span>=</span>
                                        <span class="calc-result">${thousandsSum}</span>
                                    </div>
                                    ${tenThousandsResult ? `
                                    <p>Since ${thousandsSum} is 10 or greater:</p>
                                    <ul>
                                        <li>Write down ${thousandsResult} in the thousands place</li>
                                        <li>Write ${tenThousandsResult} in the ten-thousands place</li>
                                    </ul>
                                    ` : `
                                    <p>Write ${thousandsSum} in the thousands place.</p>
                                    `}
                                    ${hundredsCarry ? `
                                    <p class="carry-reminder"><strong>Remember:</strong> We included the carried 1 from the previous step!</p>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="final-answer-section">
                <div class="hint-section-header">
                    <span class="section-icon">✓</span>
                    <h5>Final Answer</h5>
                </div>
                <div class="final-answer">
                    <div class="equation">
                        <span>${num1}</span>
                        <span>+</span>
                        <span>${num2}</span>
                        <span>=</span>
                        <span class="result-value">${num1 + num2}</span>
                    </div>
                </div>
            </div>
            
            <div class="carrying-rules-section">
                <div class="hint-section-header">
                    <span class="section-icon">📋</span>
                    <h5>Rules for Multiple Carries</h5>
                </div>
                <ol class="carrying-rules">
                    <li>Always work from right to left (ones place first)</li>
                    <li>When a column sum is 10 or greater, carry the tens digit to the next column</li>
                    <li>Add all carried digits first when working on each column</li>
                    <li>For the final column, write any carry as a new digit in your answer</li>
                </ol>
                <div class="carrying-summary">
                    <p>In this problem, we had ${totalCarries} carrying operation${totalCarries !== 1 ? 's' : ''}:
                    ${onesCarry ? ' from ones to tens' : ''}
                    ${tensCarry ? ', from tens to hundreds' : ''}
                    ${hundredsCarry ? ', from hundreds to thousands' : ''}
                    ${tenThousandsResult ? ', and from thousands to ten-thousands' : ''}.
                    </p>
                </div>
            </div>
        </div>
    `;
}
