/**
 * Debug Script
 * This script adds debugging functionality for developers.
 * Only runs on localhost or when debug mode is enabled.
 */

(function() {
    // Check if we're in a development environment
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1';
    const debugMode = localStorage.getItem('niaDebugMode') === 'true';
    
    if (!isLocalhost && !debugMode) return;
    
    console.log('Debug mode active');
    
    // Add debug tools
    document.addEventListener('DOMContentLoaded', function() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', function(event) {
            // Shift+D to toggle debug panel
            if (event.shiftKey && event.key === 'D') {
                toggleDebugPanel();
            }
        });
        
        // Create debug panel
        createDebugPanel();
    });
    
    // Create debug panel
    function createDebugPanel() {
        const panel = document.createElement('div');
        panel.id = 'debug-panel';
        panel.style.position = 'fixed';
        panel.style.bottom = '10px';
        panel.style.right = '10px';
        panel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        panel.style.color = 'white';
        panel.style.padding = '10px';
        panel.style.borderRadius = '5px';
        panel.style.zIndex = '10000';
        panel.style.display = 'none';
        panel.style.maxWidth = '300px';
        panel.style.maxHeight = '400px';
        panel.style.overflow = 'auto';
        
        panel.innerHTML = `
            <h3>Debug Tools</h3>
            <button id="debug-reset">Reset All</button>
            <button id="debug-modules">Show Modules</button>
            <div id="debug-info"></div>
        `;
        
        document.body.appendChild(panel);
        
        // Add event listeners
        document.getElementById('debug-reset').addEventListener('click', resetApp);
        document.getElementById('debug-modules').addEventListener('click', showModuleInfo);
    }
    
    // Toggle debug panel
    function toggleDebugPanel() {
        const panel = document.getElementById('debug-panel');
        if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
    }
    
    // Reset app
    function resetApp() {
        localStorage.clear();
        location.reload();
    }
    
    // Show module info
    function showModuleInfo() {
        const info = document.getElementById('debug-info');
        info.innerHTML = '';
        
        const modules = document.querySelectorAll('.module');
        modules.forEach(module => {
            info.innerHTML += `<p>${module.id}: ${module.style.display}</p>`;
        });
    }
})();
