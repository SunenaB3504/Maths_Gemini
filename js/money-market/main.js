// Money Market Module - Main Controller

// Money activities configuration
const moneyActivities = {
    1: {
        title: "Coin Recognition",
        description: "Learn about different coins and their values"
    },
    2: {
        title: "Count The Money",
        description: "Practice adding up different coins and bills"
    },
    3: {
        title: "Making Change",
        description: "Learn how to calculate and return correct change"
    },
    4: {
        title: "Shopping Fun",
        description: "Solve fun shopping problems and practice using money"
    }
};

// Initialize Money Market module
export function initMoneyMarket() {
    console.log('Initializing Money Market module');
    
    // DOM Elements
    const moneyButtons = document.querySelectorAll('.money-btn');
    const moneyDescription = document.getElementById('money-description');
    const currentMoneyContent = document.getElementById('current-money-content');
    const moneyPracticeArea = document.getElementById('money-practice-area');
    
    // Add click events for money activity buttons
    moneyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const activityId = this.getAttribute('data-money');
            
            // Update active button
            moneyButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update description
            if (moneyActivities[activityId]) {
                moneyDescription.textContent = moneyActivities[activityId].description;
                generateMoneyActivity(activityId, currentMoneyContent, moneyPracticeArea);
            }
        });
    });
    
    console.log('Money Market module initialized');
}

// Generate money activity content
function generateMoneyActivity(activityId, contentElement, practiceElement) {
    // Clear previous content
    contentElement.innerHTML = '';
    practiceElement.style.display = 'none';
    
    // Generate content based on activity
    switch(parseInt(activityId)) {
        case 1:
            generateCoinRecognition(contentElement, practiceElement);
            break;
        case 2:
            generateCountMoney(contentElement, practiceElement);
            break;
        case 3:
            generateMakingChange(contentElement, practiceElement);
            break;
        case 4:
            generateShoppingFun(contentElement, practiceElement);
            break;
        default:
            contentElement.innerHTML = `<p>Activity ${activityId} is coming soon!</p>`;
    }
}

// Generate coin recognition activity
function generateCoinRecognition(contentElement, practiceElement) {
    contentElement.innerHTML = `
        <h2>Coin Recognition</h2>
        <p>Let's learn about different coins!</p>
        
        <div class="coin-gallery">
            <div class="coin">
                <img src="images/coins/1rupee.png" alt="1 Rupee">
                <p>1 Rupee</p>
            </div>
            <div class="coin">
                <img src="images/coins/2rupee.png" alt="2 Rupee">
                <p>2 Rupee</p>
            </div>
            <div class="coin">
                <img src="images/coins/5rupee.png" alt="5 Rupee">
                <p>5 Rupee</p>
            </div>
            <div class="coin">
                <img src="images/coins/10rupee.png" alt="10 Rupee">
                <p>10 Rupee</p>
            </div>
        </div>
        
        <button id="start-practice" class="start-btn">Start Practice</button>
    `;
    
    // Add event listener to start practice button
    document.getElementById('start-practice').addEventListener('click', function() {
        practiceElement.style.display = 'block';
        practiceElement.querySelector('#money-problem').innerHTML = `
            <h3>Which coin is worth 5 Rupees?</h3>
            <div class="coin-choices">
                <div class="coin-choice"><img src="images/coins/1rupee.png" alt="1 Rupee"></div>
                <div class="coin-choice"><img src="images/coins/2rupee.png" alt="2 Rupee"></div>
                <div class="coin-choice"><img src="images/coins/5rupee.png" alt="5 Rupee"></div>
                <div class="coin-choice"><img src="images/coins/10rupee.png" alt="10 Rupee"></div>
            </div>
        `;
    });
}

// Other activity generators
function generateCountMoney(contentElement, practiceElement) {
    contentElement.innerHTML = `<p>Count The Money activity coming soon!</p>`;
}

function generateMakingChange(contentElement, practiceElement) {
    contentElement.innerHTML = `<p>Making Change activity coming soon!</p>`;
}

function generateShoppingFun(contentElement, practiceElement) {
    contentElement.innerHTML = `<p>Shopping Fun activity coming soon!</p>`;
}
