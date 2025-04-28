/**
 * Number Sorter - Manages the Odd & Even sorting activity
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Number Sorter loaded');
    initNumberSorter();
});

function initNumberSorter() {
    // Get DOM elements
    const numbersToSort = document.getElementById('numbers-to-sort');
    const evenNumbers = document.getElementById('even-numbers');
    const oddNumbers = document.getElementById('odd-numbers');
    const checkSortingBtn = document.getElementById('check-sorting');
    const newSortingBtn = document.getElementById('new-sorting-game');
    
    if (!numbersToSort || !evenNumbers || !oddNumbers) {
        console.warn('Required DOM elements for number sorting not found');
        return; // Exit if elements not found
    }
    
    console.log('Number Sorter initialized');
    
    // Initialize when the odd-even button is clicked
    document.querySelector('[data-activity="odd-even"]').addEventListener('click', function() {
        console.log('Odd & Even activity selected');
        generateNumbers();
    });
    
    // Add click handlers for buttons
    if (checkSortingBtn) {
        checkSortingBtn.addEventListener('click', checkSorting);
    }
    
    if (newSortingBtn) {
        newSortingBtn.addEventListener('click', generateNumbers);
    }
    
    // Generate random numbers
    function generateNumbers() {
        console.log('Generating numbers for sorting');
        
        // Clear existing content
        numbersToSort.innerHTML = '';
        evenNumbers.innerHTML = '';
        oddNumbers.innerHTML = '';
        
        // Remove any existing feedback
        const existingFeedback = document.querySelector('.sorting-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Generate 10 random numbers
        for (let i = 0; i < 10; i++) {
            const num = Math.floor(Math.random() * 100) + 1;
            createNumberElement(num);
        }
    }
    
    // Create a number element
    function createNumberElement(number) {
        const numberElem = document.createElement('div');
        numberElem.className = 'number-item';
        numberElem.textContent = number;
        numberElem.dataset.value = number;
        
        // Add click handler
        numberElem.addEventListener('click', function() {
            moveNumber(this);
        });
        
        numbersToSort.appendChild(numberElem);
    }
    
    // Move a number to the appropriate container
    function moveNumber(element) {
        const number = parseInt(element.dataset.value);
        const isEven = number % 2 === 0;
        const container = isEven ? evenNumbers : oddNumbers;
        
        // Create copy in the target container
        const numberCopy = document.createElement('div');
        numberCopy.className = 'number-item sorted';
        numberCopy.textContent = number;
        numberCopy.dataset.value = number;
        
        // When clicking on a sorted number, return it to the source
        numberCopy.addEventListener('click', function() {
            // Return to original container
            createNumberElement(number);
            this.remove();
        });
        
        // Add to target container and remove from source
        container.appendChild(numberCopy);
        element.remove();
    }
    
    // Check if numbers are sorted correctly
    function checkSorting() {
        console.log('Checking number sorting');
        let allCorrect = true;
        const feedbackContainer = document.querySelector('.sorting-controls');
        
        // Remove any existing feedback
        const existingFeedback = document.querySelector('.sorting-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Check each number in the even container
        const evenItems = evenNumbers.querySelectorAll('.number-item');
        evenItems.forEach(item => {
            const num = parseInt(item.dataset.value);
            if (num % 2 !== 0) {
                allCorrect = false;
                highlightError(item);
            } else {
                highlightSuccess(item);
            }
        });
        
        // Check each number in the odd container
        const oddItems = oddNumbers.querySelectorAll('.number-item');
        oddItems.forEach(item => {
            const num = parseInt(item.dataset.value);
            if (num % 2 === 0) {
                allCorrect = false;
                highlightError(item);
            } else {
                highlightSuccess(item);
            }
        });
        
        // Create feedback message
        const feedback = document.createElement('div');
        feedback.className = 'sorting-feedback';
        
        if (allCorrect && (evenItems.length > 0 || oddItems.length > 0)) {
            feedback.classList.add('success');
            feedback.textContent = 'Great job! All numbers are sorted correctly! 🎉';
        } else {
            feedback.classList.add('error');
            feedback.textContent = 'Some numbers are not sorted correctly. Try again!';
        }
        
        feedbackContainer.appendChild(feedback);
    }
    
    // Highlight an incorrect number
    function highlightError(element) {
        element.style.backgroundColor = 'var(--light-red)';
        element.style.borderColor = 'var(--rainbow-red)';
    }
    
    // Highlight a correct number
    function highlightSuccess(element) {
        element.style.backgroundColor = 'var(--light-green)';
        element.style.borderColor = 'var(--rainbow-green)';
    }
    
    // Generate initial numbers when the page loads
    // Timeout to ensure DOM is fully rendered
    setTimeout(function() {
        if (document.querySelector('#odd-even-activity').classList.contains('active')) {
            generateNumbers();
        }
    }, 500);
}
