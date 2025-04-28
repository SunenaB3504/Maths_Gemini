// Content loader for markdown files

// Load and render markdown content
export async function loadMarkdownContent(filename, targetElement) {
    try {
        const response = await fetch(filename);
        
        if (!response.ok) {
            throw new Error(`Failed to load ${filename}`);
        }
        
        const content = await response.text();
        
        // Convert markdown to HTML
        const html = convertMarkdownToHTML(content);
        
        // Display the content
        targetElement.innerHTML = html;
        
        return true;
    } catch (error) {
        console.error('Error loading content:', error);
        targetElement.innerHTML = `<p>Failed to load content. Please try again.</p>`;
        return false;
    }
}

// Simple markdown to HTML converter
export function convertMarkdownToHTML(markdown) {
    // A basic markdown converter
    let html = markdown;
    
    // Remove any HTML comments (like filepath comments)
    html = html.replace(/<!--[\s\S]*?-->/g, '');
    
    // Convert headers
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
    
    // Convert bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert italics
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert lists
    html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
    
    // Group list items into lists
    let inList = false;
    html = html.split('\n').map(line => {
        if (line.startsWith('<li>')) {
            if (!inList) {
                inList = true;
                return '<ul>' + line;
            }
            return line;
        } else if (inList) {
            inList = false;
            return '</ul>' + line;
        } else {
            return line;
        }
    }).join('\n');
    
    if (inList) {
        html += '</ul>';
    }
    
    // Convert code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Convert inline code
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Convert links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    // Convert paragraphs (text not preceded by HTML tags)
    const lines = html.split('\n');
    let result = '';
    let insideParagraph = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') {
            if (insideParagraph) {
                result += '</p>\n';
                insideParagraph = false;
            }
            result += '\n';
        } else if (line.startsWith('<')) {
            if (insideParagraph) {
                result += '</p>\n';
                insideParagraph = false;
            }
            result += line + '\n';
        } else {
            if (!insideParagraph) {
                result += '<p>';
                insideParagraph = true;
            } else {
                result += ' ';
            }
            result += line;
        }
    }
    
    if (insideParagraph) {
        result += '</p>';
    }
    
    // Add special classes for emojis
    result = result.replace(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g, '<span class="emoji">$1</span>');
    
    return result;
}
