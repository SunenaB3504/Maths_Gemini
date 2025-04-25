/**
 * Number Explorer Activity
 * Interactive component for exploring properties of individual numbers
 */

import { getFactors, getMultiples, isPrime } from './number-utils.js';

export function initNumberExplorer() {
    const currentNumberInput = document.getElementById('current-number');
    const decreaseBtn = document.getElementById('decrease-number');
    const increaseBtn = document.getElementById('increase-number');
    const numberDisplay = document.querySelector('.number-display');
    
    // Update number properties display
    function updateNumberProperties(number) {
        // Update the display
        numberDisplay.textContent = number;
        currentNumberInput.value = number;
        
        // Update Even/Odd property
        const evenOdd = number % 2 === 0 ? 'Even' : 'Odd';
        document.querySelector('#property-even-odd .property-value').textContent = evenOdd;
        
        // Update Factors
        const factors = getFactors(number);
        document.querySelector('#property-factors .property-value').textContent = 
            factors.join(', ') || 'None';
        
        // Update Multiples
        const multiples = getMultiples(number, 5);
        document.querySelector('#property-multiples .property-value').textContent = 
            multiples.join(', ') || 'None';
        
        // Update Prime status
        const primeElement = document.querySelector('#property-prime');
        if (primeElement) {
            const isPrimeNumber = isPrime(number);
            primeElement.querySelector('.property-value').textContent = 
                isPrimeNumber ? 'Yes' : 'No';
            
            // Apply styling based on prime status
            if (isPrimeNumber) {
                primeElement.classList.add('prime');
                primeElement.classList.remove('not-prime');
            } else {
                primeElement.classList.add('not-prime');
                primeElement.classList.remove('prime');
            }
        }
        
        // Update visual representation
        updateNumberVisual(number);
    }
    
    // Create visual representation of the number
    function updateNumberVisual(number) {
        const visualContainer = document.querySelector('.number-visual-container');
        if (!visualContainer) return;
        
        visualContainer.innerHTML = '';
        
        // Create dots to visually represent the number
        for (let i = 0; i < number; i++) {
            const dot = document.createElement('div');
            dot.className = 'number-dot';
            visualContainer.appendChild(dot);
        }
        
        // For larger numbers, add a message
        if (number > 50) {
            visualContainer.innerHTML = '<p>Number too large to display all dots!</p>';
            
            // Show only first 50 dots
            for (let i = 0; i < 50; i++) {
                const dot = document.createElement('div');
                dot.className = 'number-dot';
                visualContainer.appendChild(dot);
            }
            
            // Add ellipsis
            const ellipsis = document.createElement('div');
            ellipsis.className = 'number-ellipsis';
            ellipsis.textContent = '...';
            visualContainer.appendChild(ellipsis);
        }
    }
    
    // Event listeners
    decreaseBtn.addEventListener('click', function() {
        let number = parseInt(currentNumberInput.value);
        if (number > 0) {
            number--;
            updateNumberProperties(number);
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        let number = parseInt(currentNumberInput.value);
        if (number < 100) {
            number++;
            updateNumberProperties(number);
        }
    });
    
    currentNumberInput.addEventListener('change', function() {
        let number = parseInt(this.value);
        if (isNaN(number) || number < 0) number = 0;
        if (number > 100) number = 100;
        updateNumberProperties(number);
    });
    
    // Initialize with default value
    updateNumberProperties(5);
}
