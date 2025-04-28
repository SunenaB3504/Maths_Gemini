// Add main script functionality

// Module navigation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Math Adventure with Nia');
    
    // Get module elements
    const welcomeScreen = document.getElementById('welcome-screen');
    const numberFriendsModule = document.getElementById('number-friends-module');
    const additionAdventureModule = document.getElementById('addition-adventure-module');
    
    // Get navigation buttons
    const numberFriendsBtn = document.getElementById('btn-number-friends');
    const additionAdventureBtn = document.getElementById('btn-addition-adventure');
    
    // Function to hide all modules
    function hideAllModules() {
        welcomeScreen.style.display = 'none';
        numberFriendsModule.style.display = 'none';
        additionAdventureModule.style.display = 'none';
    }
    
    // Initialize navigation
    if (numberFriendsBtn) {
        numberFriendsBtn.addEventListener('click', function() {
            hideAllModules();
            numberFriendsModule.style.display = 'block';
            // Additional initialization if needed
        });
    }
    
    if (additionAdventureBtn) {
        additionAdventureBtn.addEventListener('click', function() {
            hideAllModules();
            additionAdventureModule.style.display = 'block';
            // Additional initialization if needed
        });
    }
    
    // Number Explorer activity
    document.addEventListener('DOMContentLoaded', function() {
        const activityButtons = document.querySelectorAll('.activity-btn');
        const numberActivities = document.querySelectorAll('.number-activity');
        
        activityButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get selected activity
                const activity = this.getAttribute('data-activity');
                
                // Update active button
                activityButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Show selected activity
                numberActivities.forEach(act => act.classList.remove('active'));
                document.getElementById(`${activity}-activity`).classList.add('active');
            });
        });
    });
    
    // Addition Adventure Level Selection
    const levelButtons = document.querySelectorAll('.level-btn');
    const levelDescription = document.getElementById('level-description');
    const currentAdditionProblem = document.getElementById('current-addition-problem');
    const inputArea = document.getElementById('input-area');
    const visualTools = document.getElementById('visual-tools');
    const feedbackArea = document.getElementById('feedback-area');
    const blockBuilder = document.getElementById('block-builder');
    const hintContainer = document.getElementById('hint-container');
    
    if (levelButtons) {
        levelButtons.forEach(button => {
            button.addEventListener('click', function() {
                const level = this.getAttribute('data-level');
                
                // Update description based on level
                switch(level) {
                    case "1":
                        levelDescription.textContent = "Practice adding single-digit numbers (0-9)";
                        loadLevelContent(1);
                        break;
                    case "2":
                        levelDescription.textContent = "Practice adding a single digit to a two-digit number";
                        loadLevelContent(2);
                        break;
                    case "3":
                        levelDescription.textContent = "Practice adding two two-digit numbers";
                        loadLevelContent(3);
                        break;
                    case "4":
                        levelDescription.textContent = "Practice addition with carrying";
                        loadLevelContent(4);
                        break;
                    case "5":
                        levelDescription.textContent = "Solve addition word problems";
                        loadLevelContent(5);
                        break;
                    case "6":
                        levelDescription.textContent = "Learn about addition properties";
                        loadLevelContent(6);
                        break;
                    case "7":
                        levelDescription.textContent = "Practice adding four-digit numbers";
                        loadLevelContent(7);
                        break;
                    case "8":
                        levelDescription.textContent = "Practice four-digit addition with carrying";
                        loadLevelContent(8);
                        break;
                    default:
                        levelDescription.textContent = "Select a level to start practicing addition!";
                }
                
                // Highlight selected button
                levelButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Function to load level content
    function loadLevelContent(level) {
        console.log(`Loading content for Level ${level}`);
        
        // Clear previous content
        currentAdditionProblem.innerHTML = '<div class="loading">Loading...</div>';
        inputArea.innerHTML = '';
        feedbackArea.innerHTML = '';
        
        // Hide any previous hints or visualizations
        if (hintContainer) hintContainer.style.display = 'none';
        if (blockBuilder) blockBuilder.style.display = 'none';
        
        // Fetch the level content
        fetch(`content/addition-adventure/level${level}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Display the level content
                currentAdditionProblem.innerHTML = html;
                console.log(`Level ${level} content loaded, looking for Start Practice button...`);
                
                // Set up the start practice button with a slight delay to ensure DOM is ready
                setTimeout(() => {
                    const startPracticeBtn = document.getElementById('start-practice');
                    if (startPracticeBtn) {
                        console.log(`Start Practice button found for Level ${level}, adding event listener`);
                        
                        // Remove any existing event listeners to prevent duplicates
                        const newStartBtn = startPracticeBtn.cloneNode(true);
                        startPracticeBtn.parentNode.replaceChild(newStartBtn, startPracticeBtn);
                        
                        newStartBtn.addEventListener('click', function() {
                            console.log(`Start Practice button clicked for Level ${level}`);
                            
                            // Clear content and prepare for problems
                            currentAdditionProblem.innerHTML = '';
                            inputArea.innerHTML = '';
                            feedbackArea.innerHTML = '';
                            
                            // Create a module-level tools object
                            window.additionTools = {
                                showHint: function(hintText) {
                                    hintContainer.style.display = 'block';
                                    document.getElementById('hint-content').innerHTML = hintText;
                                },
                                initBlockBuilder: function(num1, num2) {
                                    blockBuilder.style.display = 'block';
                                    blockBuilder.innerHTML = `
                                        <h5>Block Builder</h5>
                                        <div class="blocks-visualization">
                                            <div class="block-group">
                                                ${Array(num1).fill('<div class="block"></div>').join('')}
                                            </div>
                                            <div class="block-operator">+</div>
                                            <div class="block-group">
                                                ${Array(num2).fill('<div class="block"></div>').join('')}
                                            </div>
                                            <div class="block-equals">=</div>
                                            <div class="block-group total">
                                                ${Array(num1 + num2).fill('<div class="block"></div>').join('')}
                                            </div>
                                        </div>
                                    `;
                                }
                            };
                            
                            // Use a complete absolute path for the module
                            const modulePath = `/js/addition-adventure/levels/level${level}.js`;
                            console.log(`Attempting to load module from: ${modulePath}`);
                            
                            try {
                                // Import the level module with error handling
                                import(modulePath)
                                    .then(module => {
                                        console.log(`Level ${level} module loaded successfully`);
                                        if (typeof module.generateProblem === 'function') {
                                            module.generateProblem(currentAdditionProblem, inputArea, feedbackArea);
                                        } else {
                                            throw new Error('Module does not have generateProblem function');
                                        }
                                    })
                                    .catch(error => {
                                        console.error(`Error importing level ${level} module:`, error);
                                        // Attempt a fallback path
                                        console.log('Attempting fallback module path...');
                                        import(`./js/addition-adventure/levels/level${level}.js`)
                                            .then(module => {
                                                console.log('Fallback path successful!');
                                                module.generateProblem(currentAdditionProblem, inputArea, feedbackArea);
                                            })
                                            .catch(fallbackError => {
                                                console.error('Fallback also failed:', fallbackError);
                                                currentAdditionProblem.innerHTML = `
                                                    <div class="error-message">
                                                        <p>Sorry, there was an error loading Level ${level}.</p>
                                                        <p>Error details: ${fallbackError.message}</p>
                                                        <p>Please make sure the file exists at: js/addition-adventure/levels/level${level}.js</p>
                                                    </div>
                                                `;
                                            });
                                    });
                            } catch (error) {
                                console.error('Error in module loading process:', error);
                                currentAdditionProblem.innerHTML = `
                                    <div class="error-message">
                                        <p>Sorry, there was an error starting the practice.</p>
                                        <p>Error details: ${error.message}</p>
                                    </div>
                                `;
                            }
                        });
                    } else {
                        console.error(`Start Practice button NOT found for Level ${level}`);
                        currentAdditionProblem.innerHTML += `
                            <div class="error-message">
                                <p>Error: Could not find the Start Practice button.</p>
                                <p>Please make sure the HTML content includes a button with id="start-practice"</p>
                            </div>
                        `;
                    }
                }, 500); // Increased delay to ensure DOM is fully processed
            })
            .catch(error => {
                console.error(`Error fetching Level ${level} content:`, error);
                currentAdditionProblem.innerHTML = `
                    <div class="error-message">
                        <p>Sorry, there was an error loading Level ${level} content.</p>
                        <p>Error details: ${error.message}</p>
                        <p>Please make sure the file exists at: content/addition-adventure/level${level}.html</p>
                    </div>
                `;
            });
    }
    
    // Subtraction Safari selection
    const safariButtons = document.querySelectorAll('.safari-btn');
    const safariDescription = document.getElementById('safari-description');
    const currentSafariContent = document.getElementById('current-safari-content');
    
    if (safariButtons) {
        safariButtons.forEach(button => {
            button.addEventListener('click', function() {
                const safari = this.getAttribute('data-safari');
                
                // Update description based on safari
                switch(safari) {
                    case "1":
                        safariDescription.textContent = "Start your subtraction journey!";
                        loadSafariContent(1);
                        break;
                    // ...cases for other safari paths...
                    default:
                        safariDescription.textContent = "Select a trail to start your subtraction adventure!";
                }
                
                // Highlight selected button
                safariButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Function to load safari content
    function loadSafariContent(safari) {
        // Implementation for loading safari content
        // ...
    }
    
    // Money Market selection
    const moneyButtons = document.querySelectorAll('.money-btn');
    const moneyDescription = document.getElementById('money-description');
    const currentMoneyContent = document.getElementById('current-money-content');
    
    // Add click events for money buttons
    moneyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moneyId = this.getAttribute('data-money');
            
            // Update active button
            moneyButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Demo functionality - just update money description
            moneyDescription.textContent = `You selected Money Activity ${moneyId}. Content coming soon!`;
            currentMoneyContent.innerHTML = `<p>Learning about money will be available soon!</p>`;
        });
    });
});