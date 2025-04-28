// Level 5: Addition Word Problems

// Track question progress and score
let questionCount = 0;
let totalQuestions = 10;
let score = 0;
let currentProblem = null;

// Word problems data bank
const wordProblems = [
    {
        text: "Aarav has 24 red marbles and 35 blue marbles. How many marbles does he have altogether?",
        num1: 24,
        num2: 35,
        answer: 59,
        hint: "Add the number of red marbles to the number of blue marbles.",
        unit: "marbles"
    },
    {
        text: "Priya read 15 pages of her book yesterday and 23 pages today. How many pages has she read in total?",
        num1: 15,
        num2: 23,
        answer: 38,
        hint: "Add the pages read yesterday to the pages read today.",
        unit: "pages"
    },
    {
        text: "The bakery made 125 regular cookies and 87 chocolate chip cookies. How many cookies did they make in all?",
        num1: 125,
        num2: 87,
        answer: 212,
        hint: "Add the number of regular cookies to the number of chocolate chip cookies.",
        unit: "cookies"
    },
    {
        text: "Rahul scored 46 points in the first game and 53 points in the second game. What was his total score?",
        num1: 46,
        num2: 53,
        answer: 99,
        hint: "Add the points from the first game to the points from the second game.",
        unit: "points"
    },
    {
        text: "Mrs. Sharma's class collected 78 cans for recycling. Mr. Patel's class collected 65 cans. How many cans did they collect altogether?",
        num1: 78,
        num2: 65,
        answer: 143,
        hint: "Add the number of cans from Mrs. Sharma's class to the number from Mr. Patel's class.",
        unit: "cans"
    },
    {
        text: "There are 142 girls and 138 boys in the school. How many students are there in total?",
        num1: 142,
        num2: 138,
        answer: 280,
        hint: "Add the number of girls to the number of boys.",
        unit: "students"
    },
    {
        text: "The theater sold 256 tickets on Saturday and 187 tickets on Sunday. How many tickets were sold over the weekend?",
        num1: 256,
        num2: 187,
        answer: 443,
        hint: "Add the number of tickets sold on Saturday to the number sold on Sunday.",
        unit: "tickets"
    },
    {
        text: "Neha has saved ₹175 from her pocket money and ₹225 from doing chores. How much money has she saved in total?",
        num1: 175,
        num2: 225,
        answer: 400,
        hint: "Add her pocket money savings to her chore money savings.",
        unit: "rupees"
    },
    {
        text: "A train had 93 passengers when it departed. At the next station, 68 more passengers boarded. How many passengers are now on the train?",
        num1: 93,
        num2: 68,
        answer: 161,
        hint: "Add the initial number of passengers to the number who boarded at the station.",
        unit: "passengers"
    },
    {
        text: "Grandma baked 115 samosas and 95 pakoras for the family gathering. How many snacks did she make in all?",
        num1: 115,
        num2: 95,
        answer: 210,
        hint: "Add the number of samosas to the number of pakoras.",
        unit: "snacks"
    },
    {
        text: "The school library has 324 fiction books and 267 non-fiction books. How many books are in the library?",
        num1: 324,
        num2: 267,
        answer: 591,
        hint: "Add the number of fiction books to the number of non-fiction books.",
        unit: "books"
    },
    {
        text: "Ravi scored 278 runs in the first cricket match and 183 runs in the second match. What is his total score?",
        num1: 278,
        num2: 183,
        answer: 461,
        hint: "Add the runs from the first match to the runs from the second match.",
        unit: "runs"
    }
];

export function generateProblem(problemContainer, inputArea, feedbackArea) {
    // Clear previous feedback
    feedbackArea.innerHTML = '';
    
    // Hide hint container and block builder from previous question
    if (window.additionTools) {
        const hintContainer = document.getElementById('hint-container');
        
        if (hintContainer) hintContainer.style.display = 'none';
    }
    
    // Select a random word problem
    const problemIndex = Math.floor(Math.random() * wordProblems.length);
    const problem = wordProblems[problemIndex];
    
    // Save current problem
    currentProblem = {
        index: problemIndex,
        num1: problem.num1,
        num2: problem.num2,
        answer: problem.answer,
        text: problem.text,
        unit: problem.unit
    };
    
    // Update question counter
    questionCount++;
    
    // Create the problem display
    problemContainer.innerHTML = `
        <div class="problem-container">
            <div class="progress-tracker">
                <div class="score-display">Score: <span id="score-value">${score}</span> points</div>
                <div class="question-counter">Question <span id="current-question">${questionCount}</span> of <span id="total-questions">${totalQuestions}</span></div>
            </div>
            <div class="word-problem-container">
                <h4>Solve this problem:</h4>
                <p class="word-problem-text">${problem.text}</p>
                <div class="problem-workspace">
                    <div class="number-sentence">
                        <p>Number sentence: ${problem.num1} + ${problem.num2} = ?</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Create the input area
    inputArea.innerHTML = `
        <div class="answer-container">
            <label for="user-answer">Your answer:</label>
            <input type="number" id="user-answer" class="answer-input" min="0" max="999">
            <span class="unit-label">${problem.unit}</span>
            <button id="check-answer" class="check-btn">Check Answer</button>
        </div>
        <button id="show-hint" class="hint-btn">Show Hint</button>
        <button id="show-work" class="work-btn">Show Work</button>
    `;
    
    // Check answer button
    document.getElementById('check-answer').addEventListener('click', function() {
        checkAnswer(currentProblem.answer, feedbackArea, problemContainer, inputArea);
    });
    
    // Enter key to check answer
    document.getElementById('user-answer').addEventListener('keyup', function(event) {
        if (event.key === "Enter") {
            checkAnswer(currentProblem.answer, feedbackArea, problemContainer, inputArea);
        }
    });
    
    // Show hint button
    document.getElementById('show-hint').addEventListener('click', function() {
        const hintText = `
            <p><strong>Hint:</strong> ${problem.hint}</p>
            <p>Remember to add: ${problem.num1} + ${problem.num2}</p>
        `;
        window.additionTools.showHint(hintText);
    });
    
    // Show work button
    document.getElementById('show-work').addEventListener('click', function() {
        const workText = `
            <div class="work-solution">
                <h5>Step-by-Step Solution:</h5>
                <p>1. We need to add ${problem.num1} and ${problem.num2}</p>
                <div class="aligned-addition-problem">
                    <div class="problem-row">
                        <span class="digit">${problem.num1}</span>
                    </div>
                    <div class="problem-row">
                        <span class="operator">+</span><span class="digit">${problem.num2}</span>
                    </div>
                    <div class="problem-row line"></div>
                    <div class="problem-row">
                        <span class="digit">${problem.answer}</span>
                    </div>
                </div>
                <p>2. The answer is ${problem.answer} ${problem.unit}</p>
            </div>
        `;
        window.additionTools.showHint(workText);
    });
    
    // Focus on answer input
    document.getElementById('user-answer').focus();
}

function checkAnswer(correctAnswer, feedbackArea, problemContainer, inputArea) {
    const userAnswer = parseInt(document.getElementById('user-answer').value);
    
    if (isNaN(userAnswer)) {
        feedbackArea.innerHTML = '<p class="error">Please enter a number!</p>';
        return;
    }
    
    if (userAnswer === correctAnswer) {
        // Update score
        score += 10;
        document.getElementById('score-value').textContent = score;
        
        feedbackArea.innerHTML = `
            <div class="success-feedback">
                <p class="success">Correct! The answer is ${correctAnswer} ${currentProblem.unit}! 🎉</p>
                <p>You earned 10 points!</p>
            </div>
        `;
        
        // Check if we've completed all questions
        if (questionCount >= totalQuestions) {
            showFinalResults(feedbackArea, problemContainer, inputArea);
        } else {
            // Show next question button
            feedbackArea.innerHTML += `
                <button id="next-question" class="next-btn">Next Question</button>
            `;
            document.getElementById('next-question').addEventListener('click', function() {
                generateProblem(problemContainer, inputArea, feedbackArea);
            });
        }
    } else {
        feedbackArea.innerHTML = `
            <p class="error">Not quite right. Try again!</p>
            <p>Hint: Read the problem carefully and make sure you're adding the right numbers.</p>
        `;
    }
}

function showFinalResults(feedbackArea, problemContainer, inputArea) {
    // Calculate percentage score
    const percentage = Math.floor((score / (totalQuestions * 10)) * 100);
    
    // Clear problem and input areas
    problemContainer.innerHTML = '';
    inputArea.innerHTML = '';
    
    // Display final results
    feedbackArea.innerHTML = `
        <div class="final-results">
            <h3>Level Complete! 🏆</h3>
            <div class="results-content">
                <p>Great job! You've completed Level 5: Addition Word Problems</p>
                <div class="score-summary">
                    <p>Your score: <strong>${score}</strong> points out of ${totalQuestions * 10} possible</p>
                    <p>Percentage: <strong>${percentage}%</strong></p>
                </div>
                <div class="stars-earned">
                    ${getStarsHTML(percentage)}
                </div>
                <div class="level-message">
                    ${getLevelMessage(percentage)}
                </div>
            </div>
            <button id="retry-level" class="retry-btn">Try Again</button>
            <button id="return-to-menu" class="menu-btn">Return to Level Menu</button>
        </div>
    `;
    
    // Add event listeners to buttons
    document.getElementById('retry-level').addEventListener('click', function() {
        // Reset counters
        questionCount = 0;
        score = 0;
        // Start fresh
        generateProblem(problemContainer, inputArea, feedbackArea);
    });
    
    document.getElementById('return-to-menu').addEventListener('click', function() {
        // Reset counters
        questionCount = 0;
        score = 0;
        // Clear areas
        problemContainer.innerHTML = '';
        inputArea.innerHTML = '';
        feedbackArea.innerHTML = '';
    });
}

function getStarsHTML(percentage) {
    if (percentage >= 90) {
        return '<span class="star">⭐</span><span class="star">⭐</span><span class="star">⭐</span>';
    } else if (percentage >= 70) {
        return '<span class="star">⭐</span><span class="star">⭐</span>';
    } else if (percentage >= 50) {
        return '<span class="star">⭐</span>';
    } else {
        return '<span class="try-again">Keep practicing!</span>';
    }
}

function getLevelMessage(percentage) {
    if (percentage >= 90) {
        return '<p>Amazing! You\'re a word problem solving champion! 🌟</p>';
    } else if (percentage >= 70) {
        return '<p>Great job! You\'re getting really good with addition word problems! 👍</p>';
    } else if (percentage >= 50) {
        return '<p>Good effort! With more practice, you\'ll master word problems! 💪</p>';
    } else {
        return '<p>Keep practicing! Word problems take time to master. You can do it! 🤗</p>';
    }
}
