// Coin Recognition Activity

// Indian currency coins
const coins = [
    { value: 1, name: "One Rupee", image: "1-rupee.png" },
    { value: 2, name: "Two Rupees", image: "2-rupee.png" },
    { value: 5, name: "Five Rupees", image: "5-rupee.png" },
    { value: 10, name: "Ten Rupees", image: "10-rupee.png" }
];

export function initCoinRecognition(contentElement, practiceElement) {
    // Set up introduction content
    contentElement.innerHTML = `
        <h2>Coin Recognition</h2>
        <p>Let's learn about the different coins we use in India!</p>
        <p>Click on each coin to learn more about it.</p>
        
        <div class="coin-grid">
            ${coins.map(coin => `
                <div class="coin" data-value="${coin.value}">
                    <img src="images/money-market/coins/${coin.image}" alt="${coin.name}">
                    <span class="coin-value">₹${coin.value}</span>
                </div>
            `).join('')}
        </div>
        
        <div id="coin-details">
            <p>Click on a coin to see details</p>
        </div>
        
        <div class="activity-instruction">
            <p>Ready to test your knowledge? Try the coin matching activity below!</p>
            <button id="start-coin-practice" class="start-btn">Start Practice</button>
        </div>
    `;
    
    // Set up coin click handlers
    const coinElements = contentElement.querySelectorAll('.coin');
    coinElements.forEach(coinElement => {
        coinElement.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            const coin = coins.find(c => c.value === parseInt(value));
            
            // Highlight selected coin
            coinElements.forEach(el => el.classList.remove('selected'));
            this.classList.add('selected');
            
            // Display coin details
            const coinDetails = contentElement.querySelector('#coin-details');
            coinDetails.innerHTML = `
                <h3>${coin.name}</h3>
                <p>Value: ₹${coin.value}</p>
                <p>This coin is used for everyday transactions in India.</p>
                <p>You can identify it by its size, color, and the markings on it.</p>
            `;
        });
    });
    
    // Start practice button
    const startButton = contentElement.querySelector('#start-coin-practice');
    startButton.addEventListener('click', function() {
        practiceElement.style.display = 'block';
        generateCoinPractice(practiceElement);
    });
}

// Generate coin matching practice
function generateCoinPractice(practiceElement) {
    // Shuffle coins for practice
    const practiceCoins = [...coins].sort(() => Math.random() - 0.5);
    
    // Create random question type (match name to coin or match value to coin)
    const questionType = Math.random() > 0.5 ? 'name' : 'value';
    
    // Select a random coin for the question
    const targetCoin = practiceCoins[0];
    
    // Prepare practice area
    const problemElement = practiceElement.querySelector('#money-problem');
    const inputElement = practiceElement.querySelector('#money-input-area');
    
    // Set up question
    if (questionType === 'name') {
        problemElement.innerHTML = `
            <div class="money-problem">
                <h4>Which coin is the ${targetCoin.name}?</h4>
                <p>Click on the correct coin below:</p>
            </div>
        `;
    } else {
        problemElement.innerHTML = `
            <div class="money-problem">
                <h4>Which coin is worth ₹${targetCoin.value}?</h4>
                <p>Click on the correct coin below:</p>
            </div>
        `;
    }
    
    // Set up coin selection options
    inputElement.innerHTML = `
        <div class="coin-grid practice-coins">
            ${practiceCoins.map(coin => `
                <div class="coin practice-coin" data-value="${coin.value}">
                    <img src="images/money-market/coins/${coin.image}" alt="Coin">
                </div>
            `).join('')}
        </div>
    `;
    
    // Handle coin selection
    const practiceCoinsElements = inputElement.querySelectorAll('.practice-coin');
    practiceCoinsElements.forEach(coinElement => {
        coinElement.addEventListener('click', function() {
            // Remove previous selections
            practiceCoinsElements.forEach(el => el.classList.remove('selected'));
            
            // Highlight selection
            this.classList.add('selected');
            
            // Store selected value for checking
            window.selectedCoinValue = parseInt(this.getAttribute('data-value'));
        });
    });
    
    // Set up checker function
    window.currentMoneyChecker = function() {
        const feedback = practiceElement.querySelector('#money-feedback');
        
        if (!window.selectedCoinValue) {
            feedback.innerHTML = `<p class="error">Please select a coin first!</p>`;
            return;
        }
        
        if (window.selectedCoinValue === targetCoin.value) {
            feedback.innerHTML = `
                <p class="success">Correct! That's the ${targetCoin.name} coin worth ₹${targetCoin.value}.</p>
                <p>Well done! 🎉</p>
            `;
        } else {
            const selectedCoin = coins.find(c => c.value === window.selectedCoinValue);
            feedback.innerHTML = `
                <p class="error">Not quite right. You selected the ${selectedCoin.name} coin.</p>
                <p>Try again! Look carefully at each coin.</p>
            `;
        }
    };
    
    // Set up hint function
    window.currentMoneyHint = function() {
        const feedback = practiceElement.querySelector('#money-feedback');
        
        if (questionType === 'name') {
            feedback.innerHTML = `
                <p class="hint">Hint: The ${targetCoin.name} coin is worth ₹${targetCoin.value}.</p>
                <p>Look for a coin that matches this value.</p>
            `;
        } else {
            feedback.innerHTML = `
                <p class="hint">Hint: The coin worth ₹${targetCoin.value} is called the ${targetCoin.name}.</p>
                <p>The coin size and color can help you identify it.</p>
            `;
        }
    };
    
    // Set up new problem generator
    window.currentMoneyGenerator = function() {
        generateCoinPractice(practiceElement);
        practiceElement.querySelector('#money-feedback').innerHTML = '';
    };
}
