// Subtraction With Regrouping Module - Borrowing Bridge

// Helper function to ensure we need regrouping in at least one place
function generateRegroupingNumbers(min, max) {
    const num1 = Math.floor(Math.random() * (max - min)) + min;
    let num2 = Math.floor(Math.random() * (num1 - 1000)) + 1000;
    
    let num1Str = num1.toString();
    let num2Str = num2.toString();
    
    // Ensure at least one digit requires regrouping
    let hasRegrouping = false;
    
    for (let i = 1; i <= Math.min(num1Str.length, num2Str.length); i++) {
        const digit1 = parseInt(num1Str[num1Str.length - i]);
        const digit2 = parseInt(num2Str[num2Str.length - i]);
        
        if (digit1 < digit2) {
            hasRegrouping = true;
            break;
        }
    }
    
    // If no regrouping needed, modify a digit to force regrouping
    if (!hasRegrouping) {
        const position = Math.floor(Math.random() * Math.min(num1Str.length, num2Str.length));
        let num2Arr = num2Str.split('');
        num2Arr[num2Str.length - 1 - position] = (parseInt(num1Str[num1Str.length - 1 - position]) + 1).toString();
        num2 = parseInt(num2Arr.join(''));
    }
    
    return {
        num1: num1,
        num2: num2
    };
}

// Generate a problem for this module
export function generateProblem() {
    const safariProblem = document.getElementById('safari-problem');
    
    // Generate numbers that will require regrouping
    const numbers = generateRegroupingNumbers(5000, 10000);
    const num1 = numbers.num1;
    const num2 = numbers.num2;
    
    // Store for later verification
    window.currentRegroupingProblem = {
        num1: num1,
        num2: num2,
        answer: num1 - num2
    };
    
    // Format numbers with commas
    const formattedNum1 = num1.toLocaleString();
    const formattedNum2 = num2.toLocaleString();
    
    safariProblem.innerHTML = `
        <h5>Borrowing Bridge Problem:</h5>
        <p>The safari park received ${formattedNum1} visitors last week. This week, there were ${formattedNum2} visitors. 
        How many fewer visitors came this week?</p>
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
    const expectedAnswer = window.currentRegroupingProblem?.answer || null;
    
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
    const problem = window.currentRegroupingProblem;
    if (!problem) return "First generate a problem!";
    
    return `When a digit in the top number is smaller than the digit below it, you need to borrow from the next place value.
    Subtract 1 from the digit to the left and add 10 to the current digit. Then perform the subtraction.`;
}
