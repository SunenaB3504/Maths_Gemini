/**
 * UI Controller Module
 * Manages UI interactions and displays
 */

import { appState } from './main.js';

// Main menu navigation
export function initMainMenu() {
    console.log('Initializing main menu...');
    const menuButtons = document.querySelectorAll('#main-menu button');
    console.log('Found', menuButtons.length, 'menu buttons');
    
    menuButtons.forEach(button => {
        console.log('Setting up button:', button.id);
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent any default action
            const moduleId = this.id.replace('btn-', '');
            console.log('Button clicked:', moduleId); // Debug log
            
            // Hide all modules
            document.querySelectorAll('.module').forEach(module => {
                module.style.display = 'none';
            });
            
            // Hide welcome screen
            document.getElementById('welcome-screen').style.display = 'none';
            
            // Show the selected module
            if (moduleId === 'number-friends') {
                console.log('Showing Number Friends module');
                document.getElementById('number-friends-module').style.display = 'block';
                appState.currentModule = 'number-friends';
            } else if (moduleId === 'addition-adventure') {
                console.log('Showing Addition Adventure module');
                document.getElementById('addition-adventure-module').style.display = 'block';
                appState.currentModule = 'addition-adventure';
            } else if (moduleId === 'subtraction-safari') {
                // To be implemented
                console.log('Subtraction Safari not yet implemented');
                showWelcomeScreen(); // Fallback to welcome screen
                alert('Coming soon: Subtraction Safari!');
            } else if (moduleId === 'money-market') {
                // To be implemented
                console.log('Money Market not yet implemented');
                showWelcomeScreen(); // Fallback to welcome screen
                alert('Coming soon: Money Market!');
            } else {
                console.warn('Unknown module:', moduleId);
                showWelcomeScreen(); // Fallback to welcome screen
            }
        });
    });
}

// Show the welcome screen
export function showWelcomeScreen() {
    // Hide all modules
    document.querySelectorAll('.module').forEach(module => {
        module.style.display = 'none';
    });
    
    // Show welcome screen
    document.getElementById('welcome-screen').style.display = 'block';
    appState.currentModule = null;
}

// Clear feedback area
export function clearFeedbackArea() {
    const feedbackArea = document.getElementById('feedback-area');
    if (feedbackArea) {
        feedbackArea.innerHTML = '';
    }
}
