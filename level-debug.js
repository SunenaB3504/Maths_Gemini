/**
 * Debug script for tracing Level 9 and Level 10 content loading
 */

// Global debug flag - set to true to enable all debug messages
window.DEBUG_LEVELS = true;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Level Debug: Initializing level debugging');
    
    // Check for level buttons
    const level9Btn = document.querySelector('.level-btn[data-level="9"]');
    const level10Btn = document.querySelector('.level-btn[data-level="10"]');
    
    console.log('Level Debug: Level 9 button found:', level9Btn !== null);
    console.log('Level Debug: Level 10 button found:', level10Btn !== null);
    
    // Check if HTML content files exist
    checkFileExists('content/addition-adventure/level9.html', 'Level 9 HTML content');
    checkFileExists('content/addition-adventure/level10.html', 'Level 10 HTML content');
    
    // Check if JS implementation files exist
    checkFileExists('js/addition-adventure/levels/level9.js', 'Level 9 JS implementation');
    checkFileExists('js/addition-adventure/levels/level10.js', 'Level 10 JS implementation');
    
    // Add event listeners to level buttons
    if (level9Btn) {
        level9Btn.addEventListener('click', function() {
            console.log('Level Debug: Level 9 button clicked');
            traceContentLoading(9);
        });
    }
    
    if (level10Btn) {
        level10Btn.addEventListener('click', function() {
            console.log('Level Debug: Level 10 button clicked');
            traceContentLoading(10);
        });
    }
});

// Function to check if a file exists and log the result
function checkFileExists(url, description) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log(`Level Debug: ${description} file exists (status ${response.status})`);
            } else {
                console.error(`Level Debug: ${description} file NOT found (status ${response.status})`);
            }
        })
        .catch(error => {
            console.error(`Level Debug: Error checking ${description}:`, error);
        });
}

// Trace content loading for a specific level
function traceContentLoading(level) {
    console.log(`Level Debug: Tracing content loading for Level ${level}`);
    
    // Monitor additions to the DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                console.log(`Level Debug: DOM changed after Level ${level} selection`);
            }
        });
    });
    
    // Start observing the target element and its descendants for changes
    observer.observe(document.getElementById('current-addition-problem'), { 
        childList: true,
        subtree: true
    });
    
    // Log what module loading system is being used
    if (window.require) {
        console.log('Level Debug: CommonJS/RequireJS module system detected');
    } else if (window.System) {
        console.log('Level Debug: SystemJS module system detected');
    } else if (window.import) {
        console.log('Level Debug: ES6 import detected');
    } else {
        console.log('Level Debug: No module system detected - may be using direct script tags');
    }
    
    // Check if level script is manually loaded via global object
    if (window.additionLevels && window.additionLevels[`level${level}`]) {
        console.log(`Level Debug: Level ${level} found in global additionLevels object`);
    } else {
        console.log(`Level Debug: Level ${level} NOT found in global object`);
    }
    
    // Stop observing after 5 seconds
    setTimeout(() => {
        observer.disconnect();
        console.log(`Level Debug: Finished tracing for Level ${level}`);
    }, 5000);
}

// Attempt direct loading of level content
function attemptDirectLoading(level) {
    console.log(`Level Debug: Attempting direct loading of Level ${level} content`);
    
    fetch(`content/addition-adventure/level${level}.html`)
        .then(response => {
            if (!response.ok) throw new Error('Content file not found');
            return response.text();
        })
        .then(html => {
            document.getElementById('current-addition-problem').innerHTML = html;
            console.log(`Level Debug: Successfully loaded Level ${level} HTML content`);
            
            // Connect start button
            setTimeout(() => {
                const startBtn = document.getElementById('start-practice');
                if (startBtn) {
                    startBtn.addEventListener('click', function() {
                        console.log(`Level Debug: Start practice clicked for Level ${level}`);
                        directlyLoadPractice(level);
                    });
                }
            }, 100);
        })
        .catch(error => {
            console.error(`Level Debug: Error loading level ${level} content:`, error);
        });
}

// Direct implementation of practice for the specific levels
function directlyLoadPractice(level) {
    console.log(`Level Debug: Direct practice implementation for Level ${level}`);
    
    // This would contain direct implementations if needed
    if (level === 9) {
        console.log('Level Debug: Loading direct Level 9 practice implementation');
        // Implementation would go here if needed
    } else if (level === 10) {
        console.log('Level Debug: Loading direct Level 10 practice implementation');
        // Implementation would go here if needed
    }
}
