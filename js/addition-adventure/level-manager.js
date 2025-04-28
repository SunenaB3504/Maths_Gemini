// Level Manager for Addition Adventure

import * as Level1 from './levels/level1.js';
import * as Level2 from './levels/level2.js';
import * as Level3 from './levels/level3.js';
import * as Level4 from './levels/level4.js';
import * as Level5 from './levels/level5.js';
import * as Level6 from './levels/level6.js';
import * as Level7 from './levels/level7.js';
import * as Level8 from './levels/level8.js';

// Level configuration
export const levels = {
    1: {
        name: 'Single Digit Addition',
        description: 'Practice adding single-digit numbers (0-9)',
        module: Level1
    },
    2: {
        name: 'Two Digits Addition',
        description: 'Practice adding two-digit numbers without carrying',
        module: Level2
    },
    3: {
        name: 'Double Digits Addition',
        description: 'Practice adding double-digit numbers without carrying',
        module: Level3
    },
    4: {
        name: 'Addition with Carrying',
        description: 'Practice addition with carrying/regrouping',
        module: Level4
    },
    5: {
        name: 'Word Problems',
        description: 'Solve addition word problems',
        module: Level5
    },
    6: {
        name: 'Properties of Addition',
        description: 'Explore commutative and associative properties',
        module: Level6
    },
    7: {
        name: 'Four Digits Addition',
        description: 'Practice adding large numbers without carrying',
        module: Level7
    },
    8: {
        name: '4D Addition with Carrying',
        description: 'Practice adding large numbers with carrying',
        module: Level8
    }
};

// Initialize level buttons and functionality
export function initLevels(levelButtons, problemContainer, inputArea, feedbackArea, levelDescription) {
    let currentLevel = null;
    let activeButton = null;
    
    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const levelId = parseInt(this.getAttribute('data-level'));
            
            // Update active button
            if (activeButton) {
                activeButton.classList.remove('active');
            }
            this.classList.add('active');
            activeButton = this;
            
            // Update level description
            levelDescription.textContent = levels[levelId].description;
            
            // Clear existing problem and input
            problemContainer.innerHTML = '';
            inputArea.innerHTML = '';
            feedbackArea.innerHTML = '';
            
            // Hide all visual tools
            document.getElementById('block-builder').style.display = 'none';
            document.getElementById('hint-container').style.display = 'none';
            
            // Load new level
            currentLevel = levelId;
            loadLevel(levelId, problemContainer, inputArea, feedbackArea);
        });
    });
    
    // New Problem button
    const newProblemButton = document.createElement('button');
    newProblemButton.id = 'new-problem';
    newProblemButton.textContent = 'New Problem';
    newProblemButton.className = 'new-game-btn';
    newProblemButton.style.display = 'none';
    
    newProblemButton.addEventListener('click', function() {
        if (currentLevel) {
            loadLevel(currentLevel, problemContainer, inputArea, feedbackArea);
        }
    });
    
    inputArea.appendChild(newProblemButton);
}

// Load a specific level
function loadLevel(levelId, problemContainer, inputArea, feedbackArea) {
    const level = levels[levelId];
    
    if (level && level.module && typeof level.module.generateProblem === 'function') {
        // Generate a new problem for this level
        level.module.generateProblem(problemContainer, inputArea, feedbackArea);
        
        // Show New Problem button
        const newProblemButton = document.getElementById('new-problem');
        if (newProblemButton) {
            newProblemButton.style.display = 'inline-block';
        }
    } else {
        problemContainer.innerHTML = `<p>Level ${levelId} is under construction. Please try another level!</p>`;
    }
}
