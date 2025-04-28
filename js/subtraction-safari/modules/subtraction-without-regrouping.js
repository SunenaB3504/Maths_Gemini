// Subtraction Without Regrouping Module - Clear Path Trail

// Helper function to generate a number where each digit is >= the corresponding digit in another number
function generateLargerDigitNumber(min, max) {
    const num2 = Math.floor(Math.random() * (max - min)) + min;
    let num2Str = num2.toString();
    let num1Str = '';
    
    // Create num1 such that each digit is >= corresponding digit in num2
    for (let i = 0; i < num2Str.length; i++) {
        const digit2 = parseInt(num2Str[i]);
        // Generate a digit that's at least as large as the corresponding digit in num2
        const digit1 = digit2 + Math.floor(Math.random() * (10 - digit2));
        num1Str += digit1;
    }
    
    return {
        num1: parseInt(num1Str),
        num2: num2
    };
}

// Generate a problem for this module
export function generateProblem() {
    const safariProblem = document.getElementById('safari-problem');
    
    // Generate numbers for subtraction without regrouping
    // Ensure each digit in num1 is >= corresponding digit in num2
    const numbers = generateLargerDigitNumber(1000, 9000);
    const num1 = numbers.num1;
    const num2 = numbers.num2;
    
    // Store for later verification
    window.currentNoRegroupingProblem = {
        num1: num1,
        num2: num2,
        answer: num1 - num2
    };
    
    // Format numbers with commas
    const formattedNum1 = num1.toLocaleString();
    const formattedNum2 = num2.toLocaleString();
    
    safariProblem.innerHTML = `
        <h5>Clear Path Problem:</h5>
        <p>The safari park has ${formattedNum1} trees. Rangers removed ${formattedNum2} diseased trees. 
        How many trees remain in the park?</p>
        <div class="subtraction-layout">
            <div class="number">${formattedNum1}</div>
            <div class="number">- ${formattedNum2}</div>
            <div class="line"></div>
            <div class="answer-box">
                <input type="number" id="safari-answer" class="safari-input" min="0">
            </div>
        </div>
    `;
}

// Check the user's answer
export function checkAnswer() {
    const userAnswer = document.getElementById('safari-answer').value;
    const expectedAnswer = window.currentNoRegroupingProblem?.answer || null;
    
    if (expectedAnswer === null) {
        return { 
            isCorrect: false, 
            correctAnswer: "Error: No problem generated" 
        };
    }
    
    return {
        isCorrect: parseInt(userAnswer) === expectedAnswer,
        correctAnswer: expectedAnswer.toLocaleString()
    };
}

// Get a hint for the current problem
export function getHint() {
    const problem = window.currentNoRegroupingProblem;
    if (!problem) return "First generate a problem!";
    
    return `For subtraction without regrouping, subtract each digit separately from right to left. 
    Each digit in the top number is larger than or equal to the corresponding digit below, 
    so you don't need to borrow.`;
}
