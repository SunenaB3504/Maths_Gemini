// Basic Subtraction Module - Jungle Introduction

// Generate a problem for this module
export function generateProblem() {
    const safariProblem = document.getElementById('safari-problem');
    
    // Generate two random numbers for basic subtraction
    const num1 = Math.floor(Math.random() * 50) + 30;  // 30-79
    const num2 = Math.floor(Math.random() * 25) + 5;   // 5-29
    
    // Store the numbers for later verification
    window.currentBasicSubtractionProblem = {
        num1: num1,
        num2: num2,
        answer: num1 - num2
    };
    
    safariProblem.innerHTML = `
        <h5>Jungle Problem:</h5>
        <p>Ranger Maya spotted ${num1} monkeys in the trees. After a while, ${num2} monkeys moved away. 
        How many monkeys remain?</p>
        <div class="subtraction-layout">
            <div class="number">${num1}</div>
            <div class="number">- ${num2}</div>
            <div class="line"></div>
            <div class="answer-box">
                <input type="number" id="safari-answer" class="safari-input" min="0" max="999">
            </div>
        </div>
    `;
}

// Check the user's answer
export function checkAnswer() {
    const userAnswer = document.getElementById('safari-answer').value;
    const expectedAnswer = window.currentBasicSubtractionProblem?.answer || null;
    
    if (expectedAnswer === null) {
        return { 
            isCorrect: false, 
            correctAnswer: "Error: No problem generated" 
        };
    }
    
    return {
        isCorrect: parseInt(userAnswer) === expectedAnswer,
        correctAnswer: expectedAnswer
    };
}

// Get a hint for the current problem
export function getHint() {
    const problem = window.currentBasicSubtractionProblem;
    if (!problem) return "First generate a problem!";
    
    return `To solve this problem, subtract the smaller number (${problem.num2}) from the larger number (${problem.num1}).`;
}
