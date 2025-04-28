/**
 * Direct Controls Script
 * Provides critical UI functionality that should work even if main scripts fail
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Direct controls initializing...');
    
    // Setup main navigation as a fallback
    setupMainNavigationFallback();
});

function setupMainNavigationFallback() {
    // Main menu buttons - critical functionality
    const modules = {
        'btn-number-friends': 'number-friends-module',
        'btn-addition-adventure': 'addition-adventure-module',
        'btn-subtraction-safari': 'subtraction-safari-module',
        'btn-money-market': 'money-market-module'
    };
    
    // Add click handlers for all main navigation buttons
    Object.keys(modules).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        const moduleId = modules[buttonId];
        
        if (button && moduleId) {
            button.addEventListener('click', function(event) {
                // Prevent default behavior to avoid conflicts
                event.preventDefault();
                
                // Hide welcome screen
                document.getElementById('welcome-screen').style.display = 'none';
                
                // Hide all modules
                document.querySelectorAll('.module').forEach(module => {
                    module.style.display = 'none';
                });
                
                // Show selected module
                document.getElementById(moduleId).style.display = 'block';
                
                console.log(`[Direct Control] Showing module: ${moduleId}`);
            });
            
            console.log(`[Direct Control] Added handler for ${buttonId}`);
        }
    });
}
