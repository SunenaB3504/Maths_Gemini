// Subtraction Safari Module - Main Controller

// Safari content configuration
const safariContent = {
    1: {
        title: "Jungle Introduction",
        file: "Basic_Subtraction_Safari.md"
    },
    2: {
        title: "Clear Path Trail",
        file: "Subtraction_Without_Regrouping_Safari.md"
    },
    3: {
        title: "Borrowing Bridge",
        file: "Subtraction_With_Regrouping_Safari.md"
    },
    4: {
        title: "Safari Rules",
        file: "Properties_of_Subtraction_Safari.md"
    },
    5: {
        title: "Jungle Problems",
        file: "Word_Problems_Safari.md"
    },
    6: {
        title: "Missing Paw Prints",
        file: "Missing_Digits_Safari.md"
    },
    7: {
        title: "Mystery Numbers",
        file: "Unknown_Numbers_Safari.md"
    }
};

// Initialize Subtraction Safari module
export function initSubtractionSafari() {
    console.log('Initializing Subtraction Safari module');
    
    // DOM Elements
    const safariButtons = document.querySelectorAll('.safari-btn');
    const safariDescription = document.getElementById('safari-description');
    const currentSafariContent = document.getElementById('current-safari-content');
    
    // Add click events for safari buttons
    safariButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const safariId = this.getAttribute('data-safari');
            
            // Update active button
            safariButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update description
            if (safariContent[safariId]) {
                safariDescription.textContent = safariContent[safariId].title;
                await loadSafariContent(safariId, currentSafariContent);
            }
        });
    });
    
    console.log('Subtraction Safari module initialized');
}

// Load content from markdown file
async function loadSafariContent(safariId, contentElement) {
    try {
        const filename = safariContent[safariId].file;
        const response = await fetch(filename);
        
        if (!response.ok) {
            throw new Error(`Failed to load ${filename}`);
        }
        
        const content = await response.text();
        contentElement.innerHTML = convertMarkdownToHTML(content);
        
        // Show practice area after content is loaded
        document.getElementById('safari-practice-area').style.display = 'block';
        
    } catch (error) {
        console.error('Error loading safari content:', error);
        contentElement.innerHTML = 
            `<p>Oops! We couldn't find that safari trail. Please try another path.</p>`;
    }
}

// Simple markdown to HTML converter
function convertMarkdownToHTML(markdown) {
    let html = markdown;
    
    // Remove any HTML comments
    html = html.replace(/<!--[\s\S]*?-->/g, '');
    
    // Convert headers
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Convert bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert italics
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert lists
    html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
    
    // Group list items
    const lines = html.split('\n');
    let result = '';
    let inList = false;
    
    for (const line of lines) {
        if (line.startsWith('<li>')) {
            if (!inList) {
                result += '<ul>';
                inList = true;
            }
            result += line;
        } else {
            if (inList) {
                result += '</ul>';
                inList = false;
            }
            result += line;
        }
        result += '\n';
    }
    
    if (inList) {
        result += '</ul>';
    }
    
    // Convert paragraphs
    const paragraphs = result.split('\n\n');
    result = paragraphs.map(p => {
        if (!p.trim().startsWith('<')) {
            return `<p>${p}</p>`;
        }
        return p;
    }).join('\n\n');
    
    return result;
}
