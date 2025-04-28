// Number Explorer Activity

export function initNumberExplorer() {
    console.log('Initializing Number Explorer activity');
    
    // DOM Elements
    const decreaseButton = document.getElementById('decrease-number');
    const increaseButton = document.getElementById('increase-number');
    const currentNumberInput = document.getElementById('current-number');
    const numberDisplay = document.querySelector('.number-display');
    const numberVisualContainer = document.querySelector('.number-visual-container');
    
    // Add event listeners
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
    
    // Function to update number and its properties
    function updateNumber(number) {
        // Update input and display
        currentNumberInput.value = number;
        numberDisplay.textContent = number;
        
        // Update visual representation
        updateVisualRepresentation(number);
        
        // Update properties
        updateEvenOddProperty(number);
        updatePrimeProperty(number);
        updateFactorsProperty(number);
        updateMultiplesProperty(number);
    }
    
    // Function to update visual representation
    function updateVisualRepresentation(number) {
        numberVisualContainer.innerHTML = '';
        
        // Create visual dots for the number
        for (let i = 0; i < number; i++) {
            const dot = document.createElement('div');
            dot.className = 'number-dot';
            numberVisualContainer.appendChild(dot);
        }
    }
    
    // Function to update even/odd property
    function updateEvenOddProperty(number) {
        const propertyValue = document.querySelector('#property-even-odd .property-value');
        propertyValue.textContent = number % 2 === 0 ? 'Even' : 'Odd';
    }
    
    // Function to check if a number is prime
    function isPrime(number) {
        if (number <= 1) return false;
        if (number <= 3) return true;
        if (number % 2 === 0 || number % 3 === 0) return false;
        
        for (let i = 5; i * i <= number; i += 6) {
            if (number % i === 0 || number % (i + 2) === 0) return false;
        }
        return true;
    }
    
    // Function to update prime property
    function updatePrimeProperty(number) {
        const propertyValue = document.querySelector('#property-prime .property-value');
        propertyValue.textContent = isPrime(number) ? 'Yes' : 'No';
    }
    
    // Function to get factors of a number
    function getFactors(number) {
        const factors = [];
        for (let i = 1; i <= number; i++) {
            if (number % i === 0) {
                factors.push(i);
            }
        }
        return factors;
    }
    
    // Function to update factors property
    function updateFactorsProperty(number) {
        const propertyValue = document.querySelector('#property-factors .property-value');
        const factors = getFactors(number);
        propertyValue.textContent = factors.join(', ');
    }
    
    // Function to update multiples property
    function updateMultiplesProperty(number) {
        const propertyValue = document.querySelector('#property-multiples .property-value');
        if (number === 0) {
            propertyValue.textContent = '0, 0, 0, 0, 0';
            return;
        }
        
        const multiples = [];
        for (let i = 1; i <= 5; i++) {
            multiples.push(number * i);
        }
        propertyValue.textContent = multiples.join(', ');
    }
}
