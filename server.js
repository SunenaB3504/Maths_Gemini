/**
 * Web Server for Math Adventure with Nia
 * 
 * This server provides:
 * - Static file serving for HTML, CSS, and JavaScript files
 * - Support for ES6 modules in the browser
 * - Basic error handling
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()} - ${req.method} ${req.url}`);
    next();
});

// Set up static file serving
app.use(express.static(__dirname));

// Special handling for ES modules
app.get('*.js', (req, res, next) => {
    const filePath = path.join(__dirname, req.path);
    
    // Check if the file exists
    if (fs.existsSync(filePath)) {
        // Set the correct MIME type for ES modules
        res.set('Content-Type', 'application/javascript; charset=UTF-8');
    }
    next();
});

// Redirect all other requests to index.html for SPA-like behavior
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke on the server!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Math Adventure server is running!`);
    console.log(`Open your browser and visit: http://localhost:${PORT}`);
    console.log(`Server started at: ${new Date().toLocaleString()}`);
    console.log(`Press Ctrl+C to stop the server`);
});
