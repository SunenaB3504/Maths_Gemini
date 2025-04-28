// Properties of Subtraction Module - Safari Rules

// Constants for property types
const ZERO_RULE = 'zero';
const SELF_RULE = 'self';
const PREDECESSOR_RULE = 'predecessor';

// Generate a problem for this module
export function generateProblem() {
    const safariProblem = document.getElementById('safari-problem');
    
    // Randomly select a property to test
    const properties = [ZERO_RULE, SELF_RULE, PREDECESSOR_RULE];
    const selectedProperty = properties[Math.floor(Math.random() * properties.length)];
    
    // Generate a random number
    const baseNumber = Math.floor(Math.random() * 90000) + 10000;
    
    // Store for later verification
    window.currentPropertyProblem = {
        property: selectedProperty,
        baseNumber: baseNumber
    };
    
    // Format the number with commas
    const formattedNumber = baseNumber.toLocaleString();
    
    let equation, question;
    
    switch (selectedProperty) {
        case ZERO_RULE:
            equation = `${formattedNumber} - 0 = ${formattedNumber}`;
            question = "Which property of subtraction is illustrated in this equation?";
            break;
        case SELF_RULE:
            equation = `${formattedNumber} - ${formattedNumber} = 0`;
            question = "What property of subtraction allows us to know this result immediately?";
            break;
        case PREDECESSOR_RULE:
            equation = `${formattedNumber} - 1 = ${(baseNumber - 1).toLocaleString()}`;
            question = "This equation demonstrates which subtraction property?";
            break;
    }
    
    safariProblem.innerHTML = `
        <h5>Safari Rules Problem:</h5>
        <p>${question}</p>
        <p class="equation">${equation}</p>
        <div class="multiple-choice">
            <div class="choice">
                <input type="radio" id="choice1" name="rule" value="zero">
                <label for="choice1">The Zero Rule: Any Number - 0 = That Same Number</label>
            </div>
            <div class="choice">
                <input type="radio" id="choice2" name="rule" value="self">
                <label for="choice2">The Self Rule: Any Number - That Same Number = 0</label>
            </div>
            <div class="choice">
                <input type="radio" id="choice3" name="rule" value="predecessor">
                <label for="choice3">The Predecessor Rule: Any Number - 1 = The Previous Number</label>
            </div>
        </div>
    `;
}

// Check the user's answer
export function checkAnswer() {
    const selectedRule = document.querySelector('input[name="rule"]:checked')?.value;
    const expectedRule = window.currentPropertyProblem?.property || null;
    
    if (expectedRule === null) {
        return { 
            isCorrect: false, 
            correctAnswer: "Error: No problem generated" 
        };
    }
    
    let correctAnswerText;
    switch (expectedRule) {
        case ZERO_RULE:
            correctAnswerText = "The Zero Rule";
            break;
        case SELF_RULE:
            correctAnswerText = "The Self Rule";
            break;
        case PREDECESSOR_RULE:
            correctAnswerText = "The Predecessor Rule";
            break;
    }
    
    return {
        isCorrect: selectedRule === expectedRule,
        correctAnswer: correctAnswerText
    };
}

// Get a hint for the current problem
export function getHint() {
    const problem = window.currentPropertyProblem;
    if (!problem) return "First generate a problem!";
    
    switch (problem.property) {
        case ZERO_RULE:
            return "Look at what happens when you subtract zero from a number. Does the number change?";
        case SELF_RULE:
            return "Consider what happens when you subtract a number from itself. What's always left?";
        case PREDECESSOR_RULE:
            return "When you subtract 1 from a number, you get the number that comes just before it.";
        default:
            return "Look carefully at the equation and think about which rule applies.";
    }
}
