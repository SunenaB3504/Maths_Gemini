/**
 * Legacy Navigation
 * 
 * This file provides basic navigation functionality without using ES modules.
 * It's a fallback for when the module system fails to load properly.
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded in legacy navigation');
    
    // Set up basic navigation
    setupMainMenu();
    
    // Set up module-specific functionality
    setupNumberFriends();
    setupAdditionAdventure();
    
    console.log('Legacy navigation initialized');
});

// Set up main menu buttons
function setupMainMenu() {
    const menuButtons = document.querySelectorAll('#main-menu button');
    
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moduleId = this.id.replace('btn-', '');
            console.log('Legacy nav: Button clicked:', moduleId);
            
            // Hide all modules
            document.querySelectorAll('.module').forEach(module => {
                module.style.display = 'none';
            });
            
            // Hide welcome screen
            document.getElementById('welcome-screen').style.display = 'none';
            
            // Show the selected module
            if (moduleId === 'number-friends') {
                document.getElementById('number-friends-module').style.display = 'block';
            } else if (moduleId === 'addition-adventure') {
                document.getElementById('addition-adventure-module').style.display = 'block';
            } else {
                // Show welcome for unimplemented modules
                document.getElementById('welcome-screen').style.display = 'block';
                alert('This module is coming soon!');
            }
        });
    });
}

// Set up Number Friends activity switching
function setupNumberFriends() {
    const activityButtons = document.querySelectorAll('.activity-btn');
    
    activityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const activityToShow = this.getAttribute('data-activity');
            
            // Update active button
            document.querySelectorAll('.activity-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Hide all activities and show the selected one
            document.querySelectorAll('.number-activity').forEach(activity => {
                activity.classList.remove('active');
            });
            document.getElementById(`${activityToShow}-activity`).classList.add('active');
        });
    });
}

// Set up Addition Adventure level selection
function setupAdditionAdventure() {
    const levelButtons = document.querySelectorAll('.level-btn');
    
    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button styling
            document.querySelectorAll('.level-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show a placeholder message for now
            document.getElementById('current-addition-problem').innerHTML = `
                <div class="math-problem">
                    <h4>Level Selected</h4>
                    <p class="problem-text">You selected ${this.textContent}.</p>
                    <p>The full functionality requires the module system to be working.</p>
                </div>
            `;
        });
    });
}
