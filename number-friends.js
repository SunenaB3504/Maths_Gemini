/**
 * Number Friends Module
 * Main controller for Number Friends activities
 */

// Import activity modules
import { initNumberExplorer } from './modules/number-friends/number-explorer.js';
import { initOddEvenActivity } from './modules/number-friends/odd-even.js';
import { initNumberPatterns } from './modules/number-friends/number-patterns.js';
import { initPlaceValue } from './modules/number-friends/place-value.js';

document.addEventListener('DOMContentLoaded', function() {
    // Set up activity switching
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
    
    // Initialize Number Explorer
    initNumberExplorer();
    
    // Initialize Odd & Even activity
    initOddEvenActivity();
    
    // Initialize Number Patterns activity
    initNumberPatterns();
    
    // Initialize Place Value activity
    initPlaceValue();
});
