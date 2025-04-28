// Word Problems Module - Jungle Problems

// Array of word problem templates
const wordProblemTemplates = [
    {
        template: "A conservation project had a target of planting {target} trees. They have already planted {current} trees. How many more trees do they need to plant to reach their target?",
        generateNumbers: () => {
            const current = Math.floor(Math.random() * 7000) + 1000;
            const target = current + Math.floor(Math.random() * 5000) + 1000;
            return { target, current, answer: target - current };
        },
        answerPrefix: ""
    },
    {
        template: "The safari park has {total} animals. {left} animals were moved to another park. How many animals remain in the safari park?",
        generateNumbers: () => {
            const left = Math.floor(Math.random() * 900) + 100;
            const total = left + Math.floor(Math.random() * 900) + 100;
            return { total, left, answer: total - left };
        },
        answerPrefix: ""
    },
    {
        template: "A wildlife photographer took {total} photos during a safari. After reviewing them, {deleted} were blurry and deleted. How many good photos remain?",
        generateNumbers: () => {
            const deleted = Math.floor(Math.random() * 90) + 10;
            const total = deleted + Math.floor(Math.random() * 900) + 100;
            return { total, deleted, answer: total - deleted };
        },
        answerPrefix: ""
    },
    {
        template: "The safari guide needs to travel {total} kilometers for a tour. They have already traveled {traveled} kilometers. How much further do they need to go?",
        generateNumbers: () => {
            const traveled = Math.floor(Math.random() * 90) + 10;
            const total = traveled + Math.floor(Math.random() * 90) + 30;
            return { total, traveled, answer: total - traveled };
        },
        answerPrefix: ""
    }
];

// Generate a problem for this module
export function generateProblem() {
    const safariProblem = document.getElementById('safari-problem');
    
    // Randomly select a word problem template
    const selectedTemplate = wordProblemTemplates[Math.floor(Math.random() * wordProblemTemplates.length)];
    
    // Generate the numbers for this template
    const numbers = selectedTemplate.generateNumbers();
    
    // Store for later verification
    window.currentWordProblem = {
        ...numbers,
        answerPrefix: selectedTemplate.answerPrefix
    };
    
    // Format the problem text with the generated numbers
    let problemText = selectedTemplate.template;
    for (const [key, value] of Object.entries(numbers)) {
        if (key !== 'answer') {
            problemText = problemText.replace(`{${key}}`, value.toLocaleString());
        }
    }
    
    safariProblem.innerHTML = `
        <h5>Jungle Word Problem:</h5>
        <p>${problemText}</p>
        <div class="answer-area">
            ${selectedTemplate.answerPrefix ? `<span class="answer-prefix">${selectedTemplate.answerPrefix}</span>` : ''}
            <input type="number" id="safari-answer" class="safari-input" min="0">
        </div>
    `;
}

// Check the user's answer
export function checkAnswer() {
    const userAnswer = document.getElementById('safari-answer').value;
    const expectedAnswer = window.currentWordProblem?.answer || null;
    
    if (expectedAnswer === null) {
        return { 
            isCorrect: false, 
            correctAnswer: "Error: No problem generated" 
        };
    }
    
    const prefix = window.currentWordProblem.answerPrefix || '';
    
    return {
        isCorrect: parseInt(userAnswer) === expectedAnswer,
        correctAnswer: `${prefix}${expectedAnswer.toLocaleString()}`
    };
}

// Get a hint for the current problem
export function getHint() {
    const problem = window.currentWordProblem;
    if (!problem) return "First generate a problem!";
    
    // Create a generic hint based on the available problem data
    const keys = Object.keys(problem).filter(k => k !== 'answer' && k !== 'answerPrefix');
    
    if (keys.includes('target') && keys.includes('current')) {
        return `To find how many more are needed, subtract what you already have from the target: ${problem.target} - ${problem.current}`;
    } else if (keys.includes('total') && keys.includes('left')) {
        return `To find how many remain, subtract how many left from the total: ${problem.total} - ${problem.left}`;
    } else if (keys.includes('total') && keys.includes('deleted')) {
        return `To find how many good photos remain, subtract the deleted ones from the total: ${problem.total} - ${problem.deleted}`;
    } else if (keys.includes('total') && keys.includes('traveled')) {
        return `To find how much further to go, subtract the distance already traveled from the total distance: ${problem.total} - ${problem.traveled}`;
    }
    
    return "In word problems about 'how many left' or 'how many more needed', you usually need to subtract.";
}
