# Math Adventure with Nia

An interactive math learning application for Class 4 students.

## Features

- **Number Friends Module**: Explore number properties, odd and even numbers, number patterns, and place values
- **Addition Adventure Module**: Practice addition with various difficulty levels
  - Level 1: Single Digit Addition
  - Level 2: Two Digits Addition
  - Level 3: Double Digits Addition
  - Level 4: Addition with Carrying
  - Level 5: Word Problems
  - Level 6: Addition Properties
  - Level 7: Four-Digit Addition

## Educational Purpose

This application is designed to help students understand mathematical concepts through interactive exercises and visual aids. Each module provides step-by-step guidance with hints and explanations to support learning.

## Technical Implementation

The application is built with:
- HTML5
- CSS3
- JavaScript (ES6+)
- Module-based architecture

## Running the Application

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone or download this repository
2. Navigate to the project directory in your terminal
3. Install dependencies:

```bash
npm install
```

4. Image assets:
   ✅ Image files have been successfully set up:
   - `nia-character.png` - Main character image
   - `NiaEd-favicon.png` - Favicon for the browser tab
   - `NiaEd-logo.png` - Logo for the header

### Start the Server

Start the development server with:

```bash
npm run dev
```

Or for production:

```bash
npm start
```

6. Open your browser and visit: `http://localhost:3000`

## Troubleshooting

If you encounter issues starting the server:

1. Run the server check utility:
```bash
node server-check.js
```

2. Make sure all dependencies are installed:
```bash
npm install
```

3. If you get syntax errors, check that your Node.js version is compatible (v14+)

4. For detailed debugging, run:
```bash
npm run debug
```

## Development

The application uses ES modules for better code organization. The structure is:

- `modules/` - Contains module-specific code
  - `number-friends/` - Number Friends activities
  - `addition/` - Addition Adventure levels
- `images/` - Contains image assets for the application
- `index.html` - Main HTML entry point
- `style.css` - Main stylesheet
- `script.js` - Main JavaScript entry point
- `server.js` - Express web server

## Contributing

Feel free to contribute by opening issues or submitting pull requests.
