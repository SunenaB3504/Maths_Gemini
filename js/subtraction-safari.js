// Subtraction Safari Module

document.addEventListener('DOMContentLoaded', function() {
    // Safari paths content - these match the markdown files
    const safariContent = {
        1: {
            title: "Jungle Introduction",
            file: "Basic_Subtraction_Safari.md",
            badge: "🥇 Basic Subtraction Explorer"
        },
        2: {
            title: "Clear Path Trail",
            file: "Subtraction_Without_Regrouping_Safari.md",
            badge: "🥈 Clear Path Navigator"
        },
        3: {
            title: "Borrowing Bridge",
            file: "Subtraction_With_Regrouping_Safari.md",
            badge: "🥉 Borrowing Bridge Expert"
        },
        4: {
            title: "Safari Rules",
            file: "Properties_of_Subtraction_Safari.md",
            badge: "🏅 Safari Rule Expert"
        },
        5: {
            title: "Jungle Problems",
            file: "Word_Problems_Safari.md",
            badge: "🏆 Problem Solver Explorer"
        },
        6: {
            title: "Missing Paw Prints",
            file: "Missing_Digits_Safari.md",
            badge: "🔍 Paw Print Detective"
        },
        7: {
            title: "Mystery Numbers",
            file: "Unknown_Numbers_Safari.md",
            badge: "🧩 Mystery Number Hunter"
        }
    };

    // DOM Elements
    const subtractionSafariButton = document.getElementById('btn-subtraction-safari');
    const subtractionSafariModule = document.getElementById('subtraction-safari-module');
    const safariButtons = document.querySelectorAll('.safari-btn');
    const safariDescription = document.getElementById('safari-description');
    const currentSafariContent = document.getElementById('current-safari-content');
    const safariPracticeArea = document.getElementById('safari-practice-area');
    const safariBadgeDisplay = document.getElementById('safari-badge-display');
    
    // Initialize Safari module
    function initSubtractionSafari() {
        // Add click event for main menu button
        subtractionSafariButton.addEventListener('click', function() {
            // Hide all other modules
            document.querySelectorAll('.module').forEach(module => {
                module.style.display = 'none';
            });
            
            // Show Subtraction Safari module
            subtractionSafariModule.style.display = 'block';
            
            // Reset content
            currentSafariContent.innerHTML = '<p>Select a trail to begin your safari adventure!</p>';
            safariPracticeArea.style.display = 'none';
            
            // Show badges if any have been earned
            updateBadgeDisplay();
        });
        
        // Add click events for safari buttons
        safariButtons.forEach(button => {
            button.addEventListener('click', function() {
                const safariId = this.getAttribute('data-safari');
                loadSafariContent(safariId);
                
                // Update active button
                safariButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update description
                safariDescription.textContent = safariContent[safariId].title;
                
                // Show practice area for applicable sections
                if (safariId >= 1 && safariId <= 7) {
                    safariPracticeArea.style.display = 'block';
                    generateSafariProblem(safariId);
                } else {
                    safariPracticeArea.style.display = 'none';
                }
            });
        });
        
        // Initialize other controls
        document.getElementById('check-safari').addEventListener('click', checkSafariAnswer);
        document.getElementById('safari-hint').addEventListener('click', showSafariHint);
        document.getElementById('new-safari-problem').addEventListener('click', function() {
            const activeButton = document.querySelector('.safari-btn.active');
            if (activeButton) {
                generateSafariProblem(activeButton.getAttribute('data-safari'));
            }
        });
    }
    
    // Load content from markdown files
    async function loadSafariContent(safariId) {
        try {
            const filename = safariContent[safariId].file;
            const response = await fetch(filename);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}`);
            }
            
            let content = await response.text();
            
            // Convert markdown to HTML (simple conversion for demonstration)
            content = convertMarkdownToHTML(content);
            
            // Display the content
            currentSafariContent.innerHTML = content;
            
            // Highlight this adventure on the badge display
            highlightCurrentBadge(safariId);
            
        } catch (error) {
            console.error('Error loading safari content:', error);
            currentSafariContent.innerHTML = `<p>Oops! We couldn't find that safari trail. Please try another path.</p>`;
        }
    }
    
    // Simple markdown to HTML converter
    function convertMarkdownToHTML(markdown) {
        // A very basic markdown converter (would need to be more sophisticated in a real implementation)
        let html = markdown;
        
        // Convert headers
        html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
        
        // Convert bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Convert italics
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Convert lists
        html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
        html = html.replace(/<li>(.+?)<\/li>/g, '<ul><li>$1</li></ul>');
        
        // Convert code blocks
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        
        // Convert links
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
        
        // Convert paragraphs
        html = html.replace(/^(?!<[a-z])/gm, '<p>');
        html = html.replace(/^(?!<\/[a-z])/gm, '</p>');
        
        return html;
    }
    
    // Generate practice problems based on the safari section
    function generateSafariProblem(safariId) {
        const safariProblem = document.getElementById('safari-problem');
        const safariInputArea = document.getElementById('safari-input-area');
        
        switch (parseInt(safariId)) {
            case 1: // Basic Subtraction
                safariProblem.innerHTML = `
                    <h5>Jungle Problem:</h5>
                    <p>Ranger Maya spotted 45 monkeys in the trees. After a while, 23 monkeys moved away. How many monkeys remain?</p>
                    <div class="subtraction-layout">
                        <div class="number">45</div>
                        <div class="number">- 23</div>
                        <div class="line"></div>
                        <div class="answer-box">
                            <input type="number" id="safari-answer" class="safari-input" min="0" max="999">
                        </div>
                    </div>
                `;
                break;
            case 2: // Without Regrouping
                safariProblem.innerHTML = `
                    <h5>Clear Path Problem:</h5>
                    <p>The safari park has 8,756 trees. Rangers planted 4,321 new trees. How many trees were in the park before the new ones were planted?</p>
                    <div class="subtraction-layout">
                        <div class="number">8,756</div>
                        <div class="number">- 4,321</div>
                        <div class="line"></div>
                        <div class="answer-box">
                            <input type="number" id="safari-answer" class="safari-input" min="0" max="9999">
                        </div>
                    </div>
                `;
                break;
            case 3: // With Regrouping
                safariProblem.innerHTML = `
                    <h5>Borrowing Bridge Problem:</h5>
                    <p>The safari park received 5,432 visitors last week. This week, there were 2,675 visitors. How many fewer visitors came this week?</p>
                    <div class="subtraction-layout">
                        <div class="number">5,432</div>
                        <div class="number">- 2,675</div>
                        <div class="line"></div>
                        <div class="answer-box">
                            <input type="number" id="safari-answer" class="safari-input" min="0" max="9999">
                        </div>
                    </div>
                `;
                break;
            case 4: // Properties
                safariProblem.innerHTML = `
                    <h5>Safari Rules Problem:</h5>
                    <p>Choose the correct rule for this equation:</p>
                    <p>75,839 - 0 = 75,839</p>
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
                break;
            case 5: // Word Problems
                safariProblem.innerHTML = `
                    <h5>Jungle Word Problem:</h5>
                    <p>A conservation project had a target of planting 9,500 trees. They have already planted 6,745 trees. How many more trees do they need to plant to reach their target?</p>
                    <div class="answer-area">
                        <input type="number" id="safari-answer" class="safari-input" min="0" max="9999">
                    </div>
                `;
                break;
            case 6: // Missing Digits
                safariProblem.innerHTML = `
                    <h5>Missing Paw Prints:</h5>
                    <p>Find the missing digit:</p>
                    <div class="subtraction-layout missing-digits">
                        <div class="number">
                            <input type="number" min="0" max="9" class="digit-input" id="digit1" readonly value="5">
                            <input type="number" min="0" max="9" class="digit-input" id="digit2" readonly value="4">
                            <input type="number" min="0" max="9" class="digit-input" id="digit3" value="">
                        </div>
                        <div class="number">
                            - <input type="number" min="0" max="9" class="digit-input" id="digit4" readonly value="2">
                            <input type="number" min="0" max="9" class="digit-input" id="digit5" readonly value="8">
                            <input type="number" min="0" max="9" class="digit-input" id="digit6" readonly value="9">
                        </div>
                        <div class="line"></div>
                        <div class="number">
                            <input type="number" min="0" max="9" class="digit-input" id="digit7" readonly value="2">
                            <input type="number" min="0" max="9" class="digit-input" id="digit8" readonly value="5">
                            <input type="number" min="0" max="9" class="digit-input" id="digit9" readonly value="7">
                        </div>
                    </div>
                `;
                break;
            case 7: // Mystery Numbers
                safariProblem.innerHTML = `
                    <h5>Mystery Number:</h5>
                    <p>Find the mystery number:</p>
                    <p>When this number is subtracted from 9,000, the result is 3,456.</p>
                    <div class="answer-area">
                        <input type="number" id="safari-answer" class="safari-input" min="0" max="9999">
                    </div>
                `;
                break;
            default:
                safariProblem.innerHTML = `<p>Select a safari path to get a problem!</p>`;
        }
    }
    
    // Check the user's answer
    function checkSafariAnswer() {
        const safariId = document.querySelector('.safari-btn.active')?.getAttribute('data-safari');
        const safariFeedback = document.getElementById('safari-feedback');
        
        if (!safariId) {
            safariFeedback.innerHTML = `<p class="error">Please select a safari path first!</p>`;
            return;
        }
        
        let isCorrect = false;
        let correctAnswer = '';
        
        switch (parseInt(safariId)) {
            case 1:
                const basicAnswer = document.getElementById('safari-answer').value;
                isCorrect = basicAnswer === '22';
                correctAnswer = '22';
                break;
            case 2:
                const noRegroupAnswer = document.getElementById('safari-answer').value;
                isCorrect = noRegroupAnswer === '4435';
                correctAnswer = '4,435';
                break;
            case 3:
                const regroupAnswer = document.getElementById('safari-answer').value;
                isCorrect = regroupAnswer === '2757';
                correctAnswer = '2,757';
                break;
            case 4:
                const ruleChoice = document.querySelector('input[name="rule"]:checked')?.value;
                isCorrect = ruleChoice === 'zero';
                correctAnswer = 'The Zero Rule';
                break;
            case 5:
                const wordProblemAnswer = document.getElementById('safari-answer').value;
                isCorrect = wordProblemAnswer === '2755';
                correctAnswer = '2,755';
                break;
            case 6:
                const missingDigit = document.getElementById('digit3').value;
                isCorrect = missingDigit === '6';
                correctAnswer = '6';
                break;
            case 7:
                const mysteryAnswer = document.getElementById('safari-answer').value;
                isCorrect = mysteryAnswer === '5544';
                correctAnswer = '5,544';
                break;
        }
        
        if (isCorrect) {
            safariFeedback.innerHTML = `
                <p class="success">Great job! That's correct! 🎉</p>
                <div class="badge-earned">
                    <p>You've earned the ${safariContent[safariId].badge} badge!</p>
                </div>
            `;
            earnBadge(safariId);
        } else {
            safariFeedback.innerHTML = `
                <p class="error">Not quite right. Try again!</p>
                <p>Hint: The correct answer is ${correctAnswer}.</p>
            `;
        }
    }
    
    // Show hint for current problem
    function showSafariHint() {
        const safariId = document.querySelector('.safari-btn.active')?.getAttribute('data-safari');
        const safariFeedback = document.getElementById('safari-feedback');
        
        if (!safariId) {
            safariFeedback.innerHTML = `<p class="error">Please select a safari path first!</p>`;
            return;
        }
        
        let hint = '';
        
        switch (parseInt(safariId)) {
            case 1:
                hint = "Subtract the smaller number (23) from the larger number (45).";
                break;
            case 2:
                hint = "Subtract each digit from right to left: 6-1=5, 5-2=3, 7-3=4, 8-4=4";
                break;
            case 3:
                hint = "Remember to borrow when necessary. For example, 2 can't be subtracted from 5 directly in the ones place.";
                break;
            case 4:
                hint = "This is an example of the Zero Rule. When you subtract zero from any number, the result is that same number.";
                break;
            case 5:
                hint = "To find how many more trees are needed, subtract the number of trees already planted from the target.";
                break;
            case 6:
                hint = "For this to work, 546 - 289 must equal 257. Try a digit that would make this equation true.";
                break;
            case 7:
                hint = "If mystery number - 9,000 = 3,456, then mystery number = 9,000 - 3,456";
                break;
        }
        
        safariFeedback.innerHTML = `<p class="hint">${hint}</p>`;
    }
    
    // Badge management
    function earnBadge(safariId) {
        const badges = JSON.parse(localStorage.getItem('safariBadges')) || [];
        if (!badges.includes(safariId)) {
            badges.push(safariId);
            localStorage.setItem('safariBadges', JSON.stringify(badges));
        }
        updateBadgeDisplay();
    }
    
    function updateBadgeDisplay() {
        const badges = JSON.parse(localStorage.getItem('safariBadges')) || [];
        const badgeContainer = document.querySelector('.badge-container');
        
        if (badges.length > 0) {
            safariBadgeDisplay.style.display = 'block';
            
            badgeContainer.innerHTML = '';
            badges.forEach(id => {
                if (safariContent[id]) {
                    badgeContainer.innerHTML += `
                        <div class="badge" data-safari="${id}">
                            <span class="badge-icon">${safariContent[id].badge.split(' ')[0]}</span>
                            <span class="badge-name">${safariContent[id].title}</span>
                        </div>
                    `;
                }
            });
        } else {
            safariBadgeDisplay.style.display = 'none';
        }
    }
    
    function highlightCurrentBadge(safariId) {
        const badges = document.querySelectorAll('.badge');
        badges.forEach(badge => {
            badge.classList.remove('active');
            if (badge.getAttribute('data-safari') === safariId) {
                badge.classList.add('active');
            }
        });
    }
    
    // Initialize when the DOM is loaded
    initSubtractionSafari();
});
