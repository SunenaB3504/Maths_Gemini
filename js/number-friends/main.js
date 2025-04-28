// Number Friends Module - Main Controller

// Initialize Number Friends module
export function initNumberFriends() {
    console.log('Initializing Number Friends module');
    
    // DOM Elements
    const numberFriendsButton = document.getElementById('btn-number-friends');
    const numberFriendsModule = document.getElementById('number-friends-module');
    const activityButtons = document.querySelectorAll('.activity-btn');
    const activities = document.querySelectorAll('.number-activity');
    
    // Activity buttons functionality
    activityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const activityName = this.getAttribute('data-activity');
            console.log(`Activity button clicked: ${activityName}`);
            
            // Update active button
            activityButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all activities
            activities.forEach(activity => {
                activity.classList.remove('active');
            });
            
            // Show selected activity
            const selectedActivity = document.getElementById(`${activityName}-activity`);
            if (selectedActivity) {
                selectedActivity.classList.add('active');
            }
        });
    });
    
    // Initialize Number Explorer
    initNumberExplorer();
    
    console.log('Number Friends module initialized');
}

// Initialize Number Explorer Activity
function initNumberExplorer() {
    // DOM Elements
    const decreaseButton = document.getElementById('decrease-number');
    const increaseButton = document.getElementById('increase-number');
    const currentNumberInput = document.getElementById('current-number');
    const numberDisplay = document.querySelector('.number-display');
    
    // Add event listeners if elements exist
    if (decreaseButton && increaseButton && currentNumberInput && numberDisplay) {
        decreaseButton.addEventListener('click', () => {
            let currentValue = parseInt(currentNumberInput.value);
            if (currentValue > 0) {
                currentValue--;
                updateNumber(currentValue);
            }
        });
        
        increaseButton.addEventListener('click', () => {
            let currentValue = parseInt(currentNumberInput.value);
            if (currentValue < 100) {
                currentValue++;
                updateNumber(currentValue);
            }
        });
        
        currentNumberInput.addEventListener('change', () => {
            let currentValue = parseInt(currentNumberInput.value);
            if (currentValue < 0) currentValue = 0;
            if (currentValue > 100) currentValue = 100;
            updateNumber(currentValue);
        });
        
        // Initialize with default value
        updateNumber(parseInt(currentNumberInput.value) || 5);
        
        // Function to update the number display
        function updateNumber(number) {
            currentNumberInput.value = number;
            numberDisplay.textContent = number;
            updateNumberProperties(number);
            updateVisualRepresentation(number);
        }
    }
}

// Update number properties
function updateNumberProperties(number) {
    // Update even/odd
    const evenOddProp = document.querySelector('#property-even-odd .property-value');
    if (evenOddProp) {
        evenOddProp.textContent = number % 2 === 0 ? 'Even' : 'Odd';
    }
    
    // Update prime
    const primeProp = document.querySelector('#property-prime .property-value');
    if (primeProp) {
        primeProp.textContent = isPrime(number) ? 'Yes' : 'No';
    }
    
    // Update factors
    const factorsProp = document.querySelector('#property-factors .property-value');
    if (factorsProp) {
        const factors = getFactors(number);
        factorsProp.textContent = factors.join(', ');
    }
    
    // Update multiples
    const multiplesProp = document.querySelector('#property-multiples .property-value');
    if (multiplesProp) {
        const multiples = [];
        for (let i = 1; i <= 5; i++) {
            multiples.push(number * i);
        }
        multiplesProp.textContent = multiples.join(', ');
    }
}

// Update visual representation
function updateVisualRepresentation(number) {
    const visualContainer = document.querySelector('.number-visual-container');
    if (visualContainer) {
        visualContainer.innerHTML = '';
        for (let i = 0; i < number; i++) {
            const dot = document.createElement('div');
            dot.className = 'number-dot';
            visualContainer.appendChild(dot);
        }
    }
}

// Check if number is prime
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    let i = 5;
    while (i * i <= num) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}

// Get factors of a number
function getFactors(num) {
    const factors = [];
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            factors.push(i);
        }
    }
    return factors;
}
