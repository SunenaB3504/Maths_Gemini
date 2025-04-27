/**
 * Main Application Entry Point
 * Imports and initializes all modules
 */

import { initAdditionAdventure } from './addition-controller.js';
import { initMainMenu, showWelcomeScreen } from './ui-controller.js';

// Global app state
export const appState = {
    currentModule: null,
    currentAdditionLevel: null,
    currentProblem: null
};

// Make sure DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - initializing application');
    
    // Set up main menu navigation first, before any module loading
    initMainMenu();
    
    // Start with welcome screen
    showWelcomeScreen();
    
    // Mark the app as initialized to prevent fallback scripts from interfering
    window.appInitialized = true;
    
    // Then load modules
    loadModules();
});

// Import module controllers
function loadModules() {
    try {
        console.log('Loading modules...');
        // Dynamically import modules (this provides better error handling than static imports)
        import('../number-friends.js')
            .then(numberFriendsModule => {
                console.log('Number Friends module loaded successfully');
            })
            .catch(error => {
                console.error('Failed to load Number Friends module:', error);
            });
            
        import('../addition-levels.js')
            .then(additionModule => {
                console.log('Addition Adventure module loaded successfully');
                initAdditionAdventure(additionModule);
            })
            .catch(error => {
                console.error('Failed to load Addition Adventure module:', error);
            });
    } catch (err) {
        console.error('Error in module initialization:', err);
        
        // Display user-friendly error
        const errorElement = document.createElement('div');
        errorElement.className = 'module-error';
        errorElement.innerHTML = `
            <h3>Module Loading Error</h3>
            <p>There was a problem loading the application modules.</p>
            <p>Please make sure you're running the app using the provided server.</p>
            <button id="close-error">Close</button>
        `;
        document.body.prepend(errorElement);
        
        document.getElementById('close-error').addEventListener('click', function() {
            errorElement.remove();
        });
    }
}

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.message);
});

// Fallback for browsers without module support
export function handleModuleError() {
    const mainContainer = document.getElementById('game-area');
    if (mainContainer) {
        mainContainer.innerHTML = `
            <div class="error-message">
                <h2>Browser Compatibility Issue</h2>
                <p>This application requires a modern browser that supports JavaScript modules.</p>
                <p>Please try using a recent version of Chrome, Firefox, Safari, or Edge.</p>
            </div>
        `;
    }
}
