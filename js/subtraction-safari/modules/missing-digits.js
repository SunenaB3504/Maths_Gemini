// Missing Digits Module - Missing Paw Prints

// Generate a subtraction problem with a missing digit
function generateMissingDigitProblem() {
    // Start with a simple 3-digit subtraction problem
    const num2 = Math.floor(Math.random() * 900) + 100;
    const answer = Math.floor(Math.random() * 900) + 100;
    const num1 = num2 + answer;
    
    // Position for the missing digit (0=ones, 1=tens, 2=hundreds)
    const missingPosition = Math.floor(Math.random() * 3);
    
    // Convert numbers to arrays of digits
    const num1Digits = num1.toString().padStart(3, '0').split('').map(Number);
    const num2Digits = num2.toString().padStart(3, '0').split('').map(Number);
    const answerDigits = answer.toString().padStart(3, '0').split('').map(Number);
    
    // Get the missing digit value and replace it with null
    const missingDigit = num1Digits[2 - missingPosition];
    num1Digits[2 - missingPosition] = null;
    
    return {
        num1Digits,
        num2Digits,
        answerDigits,
        missingDigit,
        missingPosition
    };
}

// Generate a problem for this module
export function generateProblem() {
    const safariProblem = document.getElementById('safari-problem');
    
    // Generate a missing digit problem
    const problem = generateMissingDigitProblem();
    
    // Store for later verification
    window.currentMissingDigitProblem = problem;
    
    // Create the HTML for the problem
    let html = `
        <h5>Missing Paw Prints:</h5>
        <p>Find the missing digit marked with a "?" to make this subtraction correct:</p>
        <div class="subtraction-layout missing-digits">
            <div class="number">
    `;
    
    // Add the minuend (top number) with the missing digit
    for (let i = 0; i < problem.num1Digits.length; i++) {
        const digit = problem.num1Digits[i];
        if (digit === null) {
            html += `<input type="number" min="0" max="9" class="digit-input" id="missing-digit" value="?">`;
        } else {
            html += `<input type="number" min="0" max="9" class="digit-input" readonly value="${digit}">`;
        }
    }
    
    // Add the subtrahend (bottom number)
    html += `
            </div>
            <div class="number">
                - 
    `;
    
    for (let digit of problem.num2Digits) {
        html += `<input type="number" min="0" max="9" class="digit-input" readonly value="${digit}">`;
    }
    
    // Add the answer
    html += `
            </div>
            <div class="line"></div>
            <div class="number">
    `;
    
    for (let digit of problem.answerDigits) {
        html += `<input type="number" min="0" max="9" class="digit-input" readonly value="${digit}">`;
    }
    
    html += `
            </div>
        </div>
        <p>Enter the missing digit in the box with "?".</p>
    `;
    
    safariProblem.innerHTML = html;
    
    // Focus on the missing digit input
    setTimeout(() => {
        const missingDigitInput = document.getElementById('missing-digit');
        if (missingDigitInput) {
            missingDigitInput.focus();
        }
    }, 100);
}

// Check the user's answer
export function checkAnswer() {
    const missingDigitInput = document.getElementById('missing-digit');
    const userAnswer = missingDigitInput ? missingDigitInput.value : '';
    const expectedAnswer = window.currentMissingDigitProblem?.missingDigit ?? null;
    
    if (expectedAnswer === null) {
        return { 
            isCorrect: false, 
            correctAnswer: "Error: No problem generated" 
        };
    }
    
    return {
        isCorrect: parseInt(userAnswer) === expectedAnswer,
        correctAnswer: expectedAnswer.toString()
    };
}

// Get a hint for the current problem
export function getHint() {
    const problem = window.currentMissingDigitProblem;
    if (!problem) return "First generate a problem!";
    
    // Convert missing position to place value name
    const placeNames = ['ones', 'tens', 'hundreds'];
    const placeName = placeNames[problem.missingPosition];
    
    // Build digit arrays for display in hint
    const num1Str = problem.num1Digits.map(d => d === null ? '?' : d).join('');
    const num2Str = problem.num2Digits.join('');
    const answerStr = problem.answerDigits.join('');
    
    return `Look at the ${placeName} place. Try different digits in place of "?" to make the equation ${num1Str} - ${num2Str} = ${answerStr} true.`;
}
