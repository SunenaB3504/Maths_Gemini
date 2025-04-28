// Place Value Activity

export function initPlaceValue() {
    console.log('Initializing Place Value activity');
    
    // DOM Elements
    const placeValueNumber = document.getElementById('place-value-number');
    const analyzeButton = document.getElementById('analyze-number');
    const hundredsValue = document.getElementById('hundreds-value');
    const tensValue = document.getElementById('tens-value');
    const onesValue = document.getElementById('ones-value');
    const hundredsBlocks = document.getElementById('hundreds-blocks');
    const tensBlocks = document.getElementById('tens-blocks');
    const onesBlocks = document.getElementById('ones-blocks');
    const expandedForm = document.getElementById('expanded-form');
    
    // Add event listeners
    analyzeButton.addEventListener('click', analyzeNumber);
    placeValueNumber.addEventListener('keyup', function(event) {
        if (event.key === "Enter") {
            analyzeNumber();
        }
    });
    
    // Initialize with default value
    analyzeNumber();
    
    // Function to analyze the number
    function analyzeNumber() {
        // Get the number value
        let number = parseInt(placeValueNumber.value);
        
        // Validate number
        if (isNaN(number) || number < 0) {
            number = 0;
            placeValueNumber.value = 0;
        } else if (number > 999) {
            number = 999;
            placeValueNumber.value = 999;
        }
        
        // Extract place values
        const hundreds = Math.floor(number / 100);
        const tens = Math.floor((number % 100) / 10);
        const ones = number % 10;
        
        // Update place value displays
        hundredsValue.textContent = hundreds;
        tensValue.textContent = tens;
        onesValue.textContent = ones;
        
        // Update blocks visualization
        updateBlocks(hundredsBlocks, hundreds, 'hundred-block');
        updateBlocks(tensBlocks, tens, 'ten-block');
        updateBlocks(onesBlocks, ones, 'one-block');
        
        // Update expanded form
        let expandedFormText = '';
        
        if (hundreds > 0) {
            expandedFormText += `${hundreds} × 100`;
        }
        
        if (tens > 0) {
            expandedFormText += expandedFormText ? ' + ' : '';
            expandedFormText += `${tens} × 10`;
        }
        
        if (ones > 0 || (hundreds === 0 && tens === 0)) {
            expandedFormText += expandedFormText ? ' + ' : '';
            expandedFormText += `${ones} × 1`;
        }
        
        expandedForm.textContent = expandedFormText;
    }
    
    // Function to update blocks visualization
    function updateBlocks(container, count, blockClass) {
        container.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const block = document.createElement('div');
            block.className = blockClass;
            container.appendChild(block);
        }
    }
}
