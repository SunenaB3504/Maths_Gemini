// Odd & Even Activity

export function initOddEven() {
    console.log('Initializing Odd & Even activity');
    
    // DOM Elements
    const numbersToSort = document.getElementById('numbers-to-sort');
    const evenContainer = document.getElementById('even-numbers');
    const oddContainer = document.getElementById('odd-numbers');
    const checkSortingButton = document.getElementById('check-sorting');
    const newSortingGameButton = document.getElementById('new-sorting-game');
    
    // Game state
    let currentNumbers = [];
    let userSorted = {
        even: [],
        odd: []
    };
    
    // Initialize game
    generateNewGame();
    
    // Add event listeners
    checkSortingButton.addEventListener('click', checkSorting);
    newSortingGameButton.addEventListener('click', generateNewGame);
    
    // Function to generate a new sorting game
    function generateNewGame() {
        // Reset game state
        currentNumbers = [];
        userSorted = {
            even: [],
            odd: []
        };
        
        // Clear containers
        numbersToSort.innerHTML = '';
        evenContainer.innerHTML = '';
        oddContainer.innerHTML = '';
        
        // Generate random numbers (1-50)
        for (let i = 0; i < 10; i++) {
            const number = Math.floor(Math.random() * 50) + 1;
            currentNumbers.push(number);
        }
        
        // Add numbers to the sorting grid
        currentNumbers.forEach(number => {
            const numberElement = document.createElement('div');
            numberElement.className = 'number-item';
            numberElement.textContent = number;
            numberElement.setAttribute('data-number', number);
            
            // Add drag functionality
            numberElement.draggable = true;
            
            numberElement.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', number);
                setTimeout(() => {
                    numberElement.classList.add('dragging');
                }, 0);
            });
            
            numberElement.addEventListener('dragend', () => {
                numberElement.classList.remove('dragging');
            });
            
            // Add click functionality for mobile
            numberElement.addEventListener('click', () => {
                showSortingOptions(number, numberElement);
            });
            
            numbersToSort.appendChild(numberElement);
        });
        
        // Add drop zones
        setupDropZone(evenContainer, 'even');
        setupDropZone(oddContainer, 'odd');
    }
    
    // Function to set up drop zones
    function setupDropZone(container, type) {
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            container.classList.add('dragover');
        });
        
        container.addEventListener('dragleave', () => {
            container.classList.remove('dragover');
        });
        
        container.addEventListener('drop', (e) => {
            e.preventDefault();
            container.classList.remove('dragover');
            
            const number = parseInt(e.dataTransfer.getData('text/plain'));
            moveNumberToContainer(number, type);
        });
    }
    
    // Function to show sorting options for mobile
    function showSortingOptions(number, element) {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'sorting-options';
        
        const evenOption = document.createElement('button');
        evenOption.textContent = 'Even';
        evenOption.addEventListener('click', () => {
            moveNumberToContainer(number, 'even');
            document.body.removeChild(optionsContainer);
        });
        
        const oddOption = document.createElement('button');
        oddOption.textContent = 'Odd';
        oddOption.addEventListener('click', () => {
            moveNumberToContainer(number, 'odd');
            document.body.removeChild(optionsContainer);
        });
        
        const cancelOption = document.createElement('button');
        cancelOption.textContent = 'Cancel';
        cancelOption.addEventListener('click', () => {
            document.body.removeChild(optionsContainer);
        });
        
        optionsContainer.appendChild(evenOption);
        optionsContainer.appendChild(oddOption);
        optionsContainer.appendChild(cancelOption);
        
        // Position the options container near the element
        const rect = element.getBoundingClientRect();
        optionsContainer.style.position = 'absolute';
        optionsContainer.style.top = `${rect.bottom}px`;
        optionsContainer.style.left = `${rect.left}px`;
        
        document.body.appendChild(optionsContainer);
    }
    
    // Function to move a number to a container
    function moveNumberToContainer(number, type) {
        // Remove the number from the sorting grid
        const numberElement = document.querySelector(`[data-number="${number}"]`);
        if (numberElement) {
            numberElement.parentNode.removeChild(numberElement);
        }
        
        // Add the number to the appropriate container
        const newElement = document.createElement('div');
        newElement.className = 'number-item sorted';
        newElement.textContent = number;
        newElement.setAttribute('data-number', number);
        
        // Add click listener to return to sorting grid
        newElement.addEventListener('click', () => {
            returnNumberToGrid(number, type);
        });
        
        if (type === 'even') {
            evenContainer.appendChild(newElement);
            userSorted.even.push(number);
        } else {
            oddContainer.appendChild(newElement);
            userSorted.odd.push(number);
        }
    }
    
    // Function to return a number to the sorting grid
    function returnNumberToGrid(number, fromType) {
        // Remove from container
        const numberElement = document.querySelector(`${fromType === 'even' ? '#even-numbers' : '#odd-numbers'} [data-number="${number}"]`);
        if (numberElement) {
            numberElement.parentNode.removeChild(numberElement);
        }
        
        // Remove from userSorted
        if (fromType === 'even') {
            userSorted.even = userSorted.even.filter(n => n !== number);
        } else {
            userSorted.odd = userSorted.odd.filter(n => n !== number);
        }
        
        // Add back to grid
        const newElement = document.createElement('div');
        newElement.className = 'number-item';
        newElement.textContent = number;
        newElement.setAttribute('data-number', number);
        newElement.draggable = true;
        
        newElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', number);
            setTimeout(() => {
                newElement.classList.add('dragging');
            }, 0);
        });
        
        newElement.addEventListener('dragend', () => {
            newElement.classList.remove('dragging');
        });
        
        newElement.addEventListener('click', () => {
            showSortingOptions(number, newElement);
        });
        
        numbersToSort.appendChild(newElement);
    }
    
    // Function to check sorting
    function checkSorting() {
        let isCorrect = true;
        const feedback = document.createElement('div');
        feedback.className = 'sorting-feedback';
        
        // Check even numbers
        for (const number of userSorted.even) {
            if (number % 2 !== 0) {
                isCorrect = false;
                feedback.innerHTML += `<p class="error">${number} is not an even number!</p>`;
            }
        }
        
        // Check odd numbers
        for (const number of userSorted.odd) {
            if (number % 2 === 0) {
                isCorrect = false;
                feedback.innerHTML += `<p class="error">${number} is not an odd number!</p>`;
            }
        }
        
        // Check if all numbers were sorted
        if (userSorted.even.length + userSorted.odd.length !== currentNumbers.length) {
            isCorrect = false;
            feedback.innerHTML += `<p class="error">You haven't sorted all the numbers yet!</p>`;
        }
        
        // Show result
        if (isCorrect) {
            feedback.innerHTML = '<p class="success">Great job! Your sorting is correct! 🎉</p>';
        }
        
        // Remove any existing feedback
        const oldFeedback = document.querySelector('.sorting-feedback');
        if (oldFeedback) {
            oldFeedback.parentNode.removeChild(oldFeedback);
        }
        
        // Add feedback to page
        const sortingGame = document.querySelector('.sorting-game');
        sortingGame.appendChild(feedback);
        
        // Auto-remove feedback after 5 seconds
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 5000);
    }
}
