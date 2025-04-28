// Unknown Numbers Module - Mystery Numbers

// Constants for problem types
const FIND_MINUEND = 'findMinuend';  // Find x in: x - a = b
const FIND_SUBTRAHEND = 'findSubtrahend';  // Find x in: a - x = b

// Generate a problem for this module
export function generateProblem() {
    const safariProblem = document.getElementById('safari-problem');
    
    // Randomly choose problem type
    const problemType = Math.random() < 0.5 ? FIND_MINUEND : FIND_SUBTRAHEND;
    
    let scenario, answer;
    
    if (problemType === FIND_MINUEND) {
        // Generate numbers for "Find x in: x - a = b"
        const subtrahend = Math.floor(Math.random() * 4000) + 1000;
        const difference = Math.floor(Math.random() * 5000) + 1000;
        answer = subtrahend + difference;
        
        scenario = `
            <p>Find the mystery number:</p>
            <p>When this number is subtracted from ${subtrahend.toLocaleString()}, 
            the result is ${difference.toLocaleString()}.</p>
        `;
    } else {
        // Generate numbers for "Find x in: a - x = b"
        const minuend = Math.floor(Math.random() * 9000) + 1000;
        const difference = Math.floor(Math.random() * (minuend - 500)) + 500;
        answer = minuend - difference;
        
        scenario = `
            <p>Find the mystery number:</p>
            <p>When we subtract this number from ${minuend.toLocaleString()}, 
            the result is ${difference.toLocaleString()}.</p>
        `;
    }
    
    // Store for later verification
    window.currentMysteryNumberProblem = {
        type: problemType,
        answer: answer
    };
    
    safariProblem.innerHTML = `
        <h5>Mystery Number:</h5>
        ${scenario}
        <div class="answer-area">
            <input type="number" id="safari-answer" class="safari-input" min="0">
        </div>
    `;
}

// Check the user's answer
export function checkAnswer() {
    const userAnswer = document.getElementById('safari-answer').value;
    const expectedAnswer = window.currentMysteryNumberProblem?.answer || null;
    
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
    const problem = window.currentMysteryNumberProblem;
    if (!problem) return "First generate a problem!";
    
    if (problem.type === FIND_MINUEND) {
        return "If you're looking for a number that gives a specific result when subtracted from another number, you need to add the result to the known number.";
    } else {
        return "If you're looking for a number that, when subtracted from another number, gives a specific result, you need to subtract the result from the known number.";
    }
}
