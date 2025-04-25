/**
 * Debug Utilities for Math Adventure with Nia
 * 
 * This file provides helpful debugging functions to diagnose issues in the application
 */

// Check if all required DOM elements exist
function checkDomElements() {
    console.log('=== DOM Element Check ===');
    
    const requiredElements = [
        'welcome-screen',
        'number-friends-module',
        'addition-adventure-module',
        'btn-number-friends',
        'btn-addition-adventure',
        'main-menu'
    ];
    
    requiredElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            console.log(`✓ Found element: #${id}`);
        } else {
            console.error(`✗ Missing element: #${id}`);
        }
    });
    
    console.log('=== Module Display Check ===');
    document.querySelectorAll('.module').forEach(module => {
        console.log(`Module ${module.id}: display = ${window.getComputedStyle(module).display}`);
    });
}

// Add a diagnostic button to the page
function addDebugButton() {
    const button = document.createElement('button');
    button.textContent = 'Run Diagnostics';
    button.id = 'debug-button';
    button.style.position = 'fixed';
    button.style.bottom = '10px';
    button.style.right = '10px';
    button.style.zIndex = '9999';
    button.style.backgroundColor = '#ff9800';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.padding = '8px 12px';
    button.style.cursor = 'pointer';
    
    button.addEventListener('click', function() {
        checkDomElements();
    });
    
    document.body.appendChild(button);
}

// Initialize debug tools in development environment
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('DOMContentLoaded', function() {
        console.log('Debug tools initialized');
        addDebugButton();
        
        // Install global error handler
        window.addEventListener('error', function(e) {
            console.error('Global error:', e.message, 'at', e.filename, ':', e.lineno);
        });
    });
}
