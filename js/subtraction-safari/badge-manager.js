// Badge management for Subtraction Safari

// Award a badge to the user
export function earnBadge(safariId, safariContent) {
    const badges = JSON.parse(localStorage.getItem('safariBadges')) || [];
    if (!badges.includes(safariId)) {
        badges.push(safariId);
        localStorage.setItem('safariBadges', JSON.stringify(badges));
    }
    updateBadgeDisplay(safariContent);
}

// Update the badge display
export function updateBadgeDisplay(safariContent) {
    const badges = JSON.parse(localStorage.getItem('safariBadges')) || [];
    const safariBadgeDisplay = document.getElementById('safari-badge-display');
    const badgeContainer = document.querySelector('.badge-container');
    
    if (!badgeContainer) return;
    
    if (badges.length > 0) {
        safariBadgeDisplay.style.display = 'block';
        
        badgeContainer.innerHTML = '';
        badges.forEach(id => {
            if (safariContent[id]) {
                badgeContainer.innerHTML += `
                    <div class="badge" data-safari="${id}">
                        <span class="badge-icon">${safariContent[id].badge.split(' ')[0]}</span>
                        <span class="badge-name">${safariContent[id].title}</span>
                    </div>
                `;
            }
        });
    } else {
        safariBadgeDisplay.style.display = 'none';
    }
}

// Highlight the current badge
export function highlightCurrentBadge(safariId) {
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.classList.remove('active');
        if (badge.getAttribute('data-safari') === safariId) {
            badge.classList.add('active');
        }
    });
}

// Clear all badges (for testing)
export function clearAllBadges() {
    localStorage.removeItem('safariBadges');
}
