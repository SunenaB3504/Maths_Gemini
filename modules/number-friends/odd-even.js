/**
 * Odd & Even Activity
 * Sorting game for classifying numbers as odd or even
 */

import { isEven, isOdd } from './number-utils.js';

export function initOddEvenActivity() {
    const numbersToSort = document.getElementById('numbers-to-sort');
    const evenContainer = document.getElementById('even-numbers');
    const oddContainer = document.getElementById('odd-numbers');
    const checkBtn = document.getElementById('check-sorting');
    const newGameBtn = document.getElementById('new-sorting-game');
    
    // Generate random numbers for sorting
    function generateNumbers(count = 10, max = 20) {
        const numbers = [];
        for (let i = 0; i < count; i++) {
            numbers.push(Math.floor(Math.random() * max) + 1);
        }
        return numbers;
    }
    
    // Create draggable number elements
    function createNumberElements(numbers) {
        numbersToSort.innerHTML = '';
        
        numbers.forEach(num => {
            const numberElement = document.createElement('div');
            numberElement.className = 'sortable-number';
            numberElement.textContent = num;
            numberElement.setAttribute('data-number', num);
            numberElement.draggable = true;
            
            numberElement.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', num);
                this.classList.add('dragging');
            });
            
            numberElement.addEventListener('dragend', function() {
                this.classList.remove('dragging');
            });
            
            numbersToSort.appendChild(numberElement);
        });
    }
    
    // Set up drop zones
    function setupDropZones() {
        evenContainer.innerHTML = '';
        oddContainer.innerHTML = '';
        
        [evenContainer, oddContainer].forEach(container => {
            container.addEventListener('dragover', function(e) {
                e.preventDefault(); // Allow drop
                this.classList.add('drag-over');
            });
            
            container.addEventListener('dragleave', function() {
                this.classList.remove('drag-over');
            });
            
            container.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('drag-over');
                
                const number = parseInt(e.dataTransfer.getData('text/plain'));
                const numberElement = document.querySelector(`[data-number="${number}"]`);
                
                if (numberElement) {
                    this.appendChild(numberElement);
                }
            });
        });
    }
    
    // Check sorting correctness
    function checkSorting() {
        let allCorrect = true;
        
        // Check even numbers
        const evenNumbers = Array.from(evenContainer.children);
        evenNumbers.forEach(numEl => {
            const number = parseInt(numEl.getAttribute('data-number'));
            if (!isEven(number)) {
                numEl.classList.add('incorrect');
                allCorrect = false;
            } else {
                numEl.classList.add('correct');
            }
        });
        
        // Check odd numbers
        const oddNumbers = Array.from(oddContainer.children);
        oddNumbers.forEach(numEl => {
            const number = parseInt(numEl.getAttribute('data-number'));
            if (!isOdd(number)) {
                numEl.classList.add('incorrect');
                allCorrect = false;
            } else {
                numEl.classList.add('correct');
            }
        });
        
        // Provide feedback
        const feedbackArea = document.createElement('div');
        feedbackArea.className = 'sorting-feedback';
        feedbackArea.textContent = allCorrect ? 
            'Great job! All numbers are correctly sorted!' : 
            'Some numbers are in the wrong place. Try again!';
        feedbackArea.classList.add(allCorrect ? 'correct-feedback' : 'incorrect-feedback');
        
        // Remove any existing feedback
        const existingFeedback = document.querySelector('.sorting-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Add new feedback
        document.querySelector('.sorting-game').appendChild(feedbackArea);
    }
    
    // Start a new game
    function startNewGame() {
        const numbers = generateNumbers();
        createNumberElements(numbers);
        setupDropZones();
        
        // Remove any existing feedback
        const existingFeedback = document.querySelector('.sorting-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
    }
    
    // Event listeners
    checkBtn.addEventListener('click', checkSorting);
    newGameBtn.addEventListener('click', startNewGame);
    
    // Initialize the activity
    startNewGame();
}
