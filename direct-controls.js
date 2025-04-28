/**
 * Direct Controls Script
 * Provides critical UI functionality that should work even if main scripts fail
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing direct controls');
    
    // Module switching functionality
    const modules = {
        'welcome': document.getElementById('welcome-screen'),
        'number-friends': document.getElementById('number-friends-module'),
        'addition-adventure': document.getElementById('addition-adventure-module')
        // Remove references to Subtraction Safari module
        // Remove references to Money Market module
    };
    
    const buttons = {
        'number-friends': document.getElementById('btn-number-friends'),
        'addition-adventure': document.getElementById('btn-addition-adventure')
        // Remove references to Subtraction Safari button
        // Remove references to Money Market button
    };
    
    // Function to show a specific module
    function showModule(moduleId) {
        // Hide all modules
        Object.values(modules).forEach(module => {
            if (module) module.style.display = 'none';
        });
        
        // Show selected module
        const moduleToShow = modules[moduleId];
        if (moduleToShow) moduleToShow.style.display = 'block';
    }
    
    // Attach click handlers to buttons
    Object.entries(buttons).forEach(([moduleId, button]) => {
        if (button) {
            button.addEventListener('click', function() {
                showModule(moduleId);
            });
        }
    });
    
    // ... any other direct control implementations ...
});
