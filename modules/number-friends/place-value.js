/**
 * Place Value Activity
 * Interactive exploration of place value concepts
 */

import { getPlaceValues } from './number-utils.js';

export function initPlaceValue() {
    const numberInput = document.getElementById('place-value-number');
    const analyzeBtn = document.getElementById('analyze-number');
    
    // Update the place value chart
    function updatePlaceValue(number) {
        // Ensure number is 3 digits or less
        number = Math.min(999, Math.max(0, number));
        numberInput.value = number;
        
        const hundreds = Math.floor(number / 100);
        const tens = Math.floor((number % 100) / 10);
        const ones = number % 10;
        
        // Update the values
        document.getElementById('hundreds-value').textContent = hundreds;
        document.getElementById('tens-value').textContent = tens;
        document.getElementById('ones-value').textContent = ones;
        
        // Update the visual blocks
        updateBlocks('hundreds-blocks', hundreds);
        updateBlocks('tens-blocks', tens);
        updateBlocks('ones-blocks', ones);
        
        // Update expanded form
        const expandedFormDisplay = document.getElementById('expanded-form');
        if (expandedFormDisplay) {
            let expandedForm = [];
            
            if (hundreds > 0) expandedForm.push(`${hundreds} × 100`);
            if (tens > 0) expandedForm.push(`${tens} × 10`);
            if (ones > 0) expandedForm.push(`${ones} × 1`);
            
            expandedFormDisplay.textContent = expandedForm.length > 0 ? 
                expandedForm.join(' + ') : '0';
        }
    }
    
    // Create visual blocks for each place value
    function updateBlocks(containerId, count) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const block = document.createElement('div');
            block.className = 'place-block';
            
            if (containerId === 'hundreds-blocks') {
                block.classList.add('hundred-block');
            } else if (containerId === 'tens-blocks') {
                block.classList.add('ten-block');
            } else {
                block.classList.add('one-block');
            }
            
            container.appendChild(block);
        }
    }
    
    // Event listeners
    analyzeBtn.addEventListener('click', function() {
        updatePlaceValue(parseInt(numberInput.value) || 0);
    });
    
    numberInput.addEventListener('change', function() {
        updatePlaceValue(parseInt(this.value) || 0);
    });
    
    // Initialize with default value
    updatePlaceValue(352);
}
