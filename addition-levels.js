/**
 * Addition Adventure Levels
 * Defines the levels and problem generators for Addition Adventure module
 */

// Addition Level Definitions
const additionLevels = [
    {
        id: 1,
        name: "Single Digit",
        description: "Add single-digit numbers from 0 to 9.",
        problemCount: 5,
        visualAid: "blocks"
    },
    {
        id: 2,
        name: "Two Digits",
        description: "Add a two-digit number and a one-digit number.",
        problemCount: 5,
        visualAid: "place-value"
    },
    {
        id: 3,
        name: "Double Digits",
        description: "Add two two-digit numbers together.",
        problemCount: 8, // Increased problem count for more practice
        visualAid: "place-value"
    },
    {
        id: 4,
        name: "Carrying",
        description: "Practice addition with carrying (regrouping).",
        problemCount: 5,
        visualAid: "place-value"
    },
    {
        id: 5,
        name: "Word Problems",
        description: "Solve real-world word problems using addition.",
        problemCount: 5,
        visualAid: "pictures"
    },
    {
        id: 6,
        name: "Addition Properties",
        description: "Explore commutative, associative, and identity properties of addition.",
        problemCount: 5,
        visualAid: "properties"
    },
    {
        id: 7,
        name: "4-Digit Addition",
        description: "Practice adding four-digit numbers with multiple carrying steps.",
        problemCount: 5,
        visualAid: "place-value"
    }
];

// Get level by ID
export function getLevelById(id) {
    return additionLevels.find(level => level.id === id);
}

// Generate a random problem based on level ID
export function getRandomProblem(levelId) {
    switch (levelId) {
        case 1:
            return generateSingleDigitProblem();
        case 2:
            return generateTwoDigitProblem();
        case 3:
            return generateDoubleDigitProblem();
        case 4:
            return generateCarryingProblem();
        case 5:
            return generateWordProblem();
        case 6:
            return generatePropertiesProblem();
        case 7:
            return generateFourDigitProblem();
        default:
            return generateSingleDigitProblem();
    }
}

// Generate a single digit addition problem (Level 1)
function generateSingleDigitProblem() {
    const num1 = Math.floor(Math.random() * 10); // 0-9
    const num2 = Math.floor(Math.random() * 10); // 0-9
    
    return {
        num1: num1,
        num2: num2,
        answer: num1 + num2,
        display: `${num1} + ${num2} = ?`,
        isWordProblem: false
    };
}

// Generate a two-digit plus one-digit problem (Level 2)
function generateTwoDigitProblem() {
    const num1 = Math.floor(Math.random() * 90) + 10; // 10-99
    const num2 = Math.floor(Math.random() * 10); // 0-9
    
    return {
        num1: num1,
        num2: num2,
        answer: num1 + num2,
        display: `${num1} + ${num2} = ?`,
        isWordProblem: false
    };
}

// Generate a double-digit addition problem (Level 3)
function generateDoubleDigitProblem() {
    // Define different problem types for variety
    const problemTypes = [
        // Standard two-digit addition
        () => {
            const num1 = Math.floor(Math.random() * 90) + 10; // 10-99
            const num2 = Math.floor(Math.random() * 90) + 10; // 10-99
            return { num1, num2 };
        },
        // Tens only (multiples of 10)
        () => {
            const num1 = Math.floor(Math.random() * 10) * 10; // 0, 10, 20, ..., 90
            const num2 = Math.floor(Math.random() * 10) * 10; // 0, 10, 20, ..., 90
            return { num1, num2 };
        },
        // Close to multiples of 10
        () => {
            const tens1 = Math.floor(Math.random() * 9) + 1; // 1-9
            const tens2 = Math.floor(Math.random() * 9) + 1; // 1-9
            const num1 = tens1 * 10 + (Math.random() < 0.5 ? 1 : 9); // X1 or X9
            const num2 = tens2 * 10 + (Math.random() < 0.5 ? 1 : 9); // X1 or X9
            return { num1, num2 };
        },
        // Same tens digit
        () => {
            const tens = Math.floor(Math.random() * 9) + 1; // 1-9
            const ones1 = Math.floor(Math.random() * 10); // 0-9
            const ones2 = Math.floor(Math.random() * 10); // 0-9
            const num1 = tens * 10 + ones1;
            const num2 = tens * 10 + ones2;
            return { num1, num2 };
        },
        // Same ones digit
        () => {
            const ones = Math.floor(Math.random() * 10); // 0-9
            const tens1 = Math.floor(Math.random() * 9) + 1; // 1-9
            const tens2 = Math.floor(Math.random() * 9) + 1; // 1-9
            const num1 = tens1 * 10 + ones;
            const num2 = tens2 * 10 + ones;
            return { num1, num2 };
        },
        // Numbers that sum to 100
        () => {
            const num1 = Math.floor(Math.random() * 90) + 10; // 10-99
            const num2 = 100 - num1;
            return { num1, num2 };
        },
        // Numbers with carrying in the ones place only
        () => {
            const tens1 = Math.floor(Math.random() * 5) + 1; // 1-5
            const tens2 = Math.floor(Math.random() * 5) + 1; // 1-5
            const ones1 = Math.floor(Math.random() * 5) + 5; // 5-9
            const ones2 = Math.floor(Math.random() * 5) + 5; // 5-9
            const num1 = tens1 * 10 + ones1;
            const num2 = tens2 * 10 + ones2;
            return { num1, num2 };
        },
        // Numbers close to each other
        () => {
            const base = Math.floor(Math.random() * 80) + 10; // 10-89
            const diff = Math.floor(Math.random() * 5) + 1; // 1-5
            const num1 = base;
            const num2 = base + diff;
            return { num1, num2 };
        }
    ];
    
    // Select a random problem type
    const selectedProblemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    const { num1, num2 } = selectedProblemType();
    
    return {
        num1: num1,
        num2: num2,
        answer: num1 + num2,
        display: `${num1} + ${num2} = ?`,
        isWordProblem: false
    };
}

// Generate a carrying/regrouping problem (Level 4)
function generateCarryingProblem() {
    // Ensure the ones digits sum to more than 9 to force carrying
    const ones1 = Math.floor(Math.random() * 6) + 4; // 4-9
    const ones2 = Math.floor(Math.random() * 6) + 4; // 4-9
    
    // Randomize tens digits
    const tens1 = Math.floor(Math.random() * 9) + 1; // 1-9
    const tens2 = Math.floor(Math.random() * 9) + 1; // 1-9
    
    const num1 = tens1 * 10 + ones1;
    const num2 = tens2 * 10 + ones2;
    
    return {
        num1: num1,
        num2: num2,
        answer: num1 + num2,
        display: `${num1} + ${num2} = ?`,
        isWordProblem: false
    };
}

// Generate a word problem (Level 5)
function generateWordProblem() {
    // Generate two numbers based on the context
    const num1 = Math.floor(Math.random() * 50) + 10; // 10-59
    const num2 = Math.floor(Math.random() * 40) + 10; // 10-49
    
    // Word problem contexts
    const contexts = [
        {
            context: "fruits",
            template: `Nia has ${num1} apples and ${num2} oranges. How many fruits does she have in total?`
        },
        {
            context: "marbles",
            template: `Sam has ${num1} blue marbles and ${num2} red marbles. How many marbles does he have altogether?`
        },
        {
            context: "stickers",
            template: `Maya collected ${num1} star stickers and ${num2} heart stickers. How many stickers did she collect in all?`
        },
        {
            context: "books",
            template: `The classroom bookshelf has ${num1} fiction books and ${num2} non-fiction books. How many books are on the shelf?`
        },
        {
            context: "stamps",
            template: `Raj has ${num1} stamps in his album. His friend gave him ${num2} more stamps. How many stamps does Raj have now?`
        },
        {
            context: "pencils",
            template: `The first box has ${num1} pencils and the second box has ${num2} pencils. How many pencils are there in total?`
        },
        {
            context: "flowers",
            template: `In the garden, there are ${num1} roses and ${num2} sunflowers. How many flowers are there altogether?`
        },
        {
            context: "coins",
            template: `Leila found ${num1} coins in her piggy bank and ${num2} coins under her bed. How many coins did she find in total?`
        }
    ];
    
    // Select a random context
    const selectedContext = contexts[Math.floor(Math.random() * contexts.length)];
    
    return {
        num1: num1,
        num2: num2,
        answer: num1 + num2,
        display: selectedContext.template,
        isWordProblem: true,
        wordContext: selectedContext.context
    };
}

// Generate a problem focusing on addition properties (Level 6)
function generatePropertiesProblem() {
    // Choose which property to focus on
    const propertyTypes = ["commutative", "associative", "identity"];
    const selectedProperty = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    
    let problem = {
        property: selectedProperty,
        isWordProblem: false
    };
    
    if (selectedProperty === "commutative") {
        // Commutative property: a + b = b + a
        const a = Math.floor(Math.random() * 20) + 1; // 1-20
        const b = Math.floor(Math.random() * 20) + 1; // 1-20
        
        // Randomly choose whether to ask for the result or the missing addend
        const askForResult = Math.random() > 0.5;
        
        if (askForResult) {
            problem.num1 = a;
            problem.num2 = b;
            problem.answer = a + b;
            problem.display = `${a} + ${b} = ? (Commutative Property)`;
            problem.hint = `The commutative property means the order of addends doesn't matter: ${a} + ${b} = ${b} + ${a}`;
        } else {
            // Ask for missing value in the equation
            const sum = a + b;
            problem.num1 = b;
            problem.answer = a;
            problem.display = `${b} + ? = ${sum} (Commutative Property: We know that ${a} + ${b} = ${sum})`;
            problem.hint = `According to the commutative property, if ${a} + ${b} = ${sum}, then ${b} + ${a} = ${sum} too.`;
        }
        
    } else if (selectedProperty === "associative") {
        // Associative property: (a + b) + c = a + (b + c)
        const a = Math.floor(Math.random() * 10) + 1; // 1-10
        const b = Math.floor(Math.random() * 10) + 1; // 1-10
        const c = Math.floor(Math.random() * 10) + 1; // 1-10
        
        // Different ways of grouping
        const result1 = (a + b) + c;
        const result2 = a + (b + c);
        
        problem.num1 = a;
        problem.num2 = b;
        problem.num3 = c;
        problem.answer = result1; // same as result2
        problem.display = `Which is equal to ${a} + ${b} + ${c}? (Associative Property)
                         \nA) (${a} + ${b}) + ${c}
                         \nB) ${a} + (${b} + ${c})
                         \nC) Both are equal
                         \nD) Neither`;
        problem.hint = `The associative property states that the grouping of addends doesn't matter: (${a} + ${b}) + ${c} = ${a} + (${b} + ${c})`;
        problem.multipleChoice = true;
        problem.options = ["A", "B", "C", "D"];
        problem.correctOption = "C";
        
    } else { // identity property
        // Identity property: a + 0 = a
        const a = Math.floor(Math.random() * 50) + 1; // 1-50
        
        // Choose between asking for the sum or the missing addend
        const askType = Math.floor(Math.random() * 3); // 0, 1, or 2
        
        if (askType === 0) {
            // Ask for the sum
            problem.num1 = a;
            problem.num2 = 0;
            problem.answer = a;
            problem.display = `${a} + 0 = ? (Identity Property)`;
            problem.hint = `The identity property states that any number plus zero equals the original number.`;
        } else if (askType === 1) {
            // Ask for the missing addend
            problem.num1 = a;
            problem.answer = 0;
            problem.display = `${a} + ? = ${a} (Identity Property)`;
            problem.hint = `What number can you add to ${a} to still get ${a}?`;
        } else {
            // Ask for the value where 0 is added to it
            problem.num1 = 0;
            problem.answer = a;
            problem.display = `0 + ? = ${a} (Identity Property)`;
            problem.hint = `When zero is added to any number, the result is that number.`;
        }
    }
    
    return problem;
}

// Generate a 4-digit addition problem (Level 7)
function generateFourDigitProblem() {
    // Define different problem types for variety
    const problemTypes = [
        // Standard 4-digit addition with carrying
        () => {
            const num1 = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
            const num2 = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
            return { num1, num2 };
        },
        // Carrying in all places
        () => {
            const num1 = generateNumberWithDigits(9, 9, 9, 9);
            const num2 = generateNumberWithDigits(1, 1, 1, 1);
            return { num1, num2 };
        },
        // Carrying in ones, tens, hundreds places
        () => {
            const num1 = generateNumberWithDigits(Math.floor(Math.random() * 9) + 1, 9, 9, 9);
            const num2 = generateNumberWithDigits(Math.floor(Math.random() * 9) + 1, 1, 1, 1);
            return { num1, num2 };
        },
        // Numbers ending in zeros (focus on thousands place)
        () => {
            const num1 = Math.floor(Math.random() * 9 + 1) * 1000; // 1000, 2000, ..., 9000
            const num2 = Math.floor(Math.random() * 9 + 1) * 1000; // 1000, 2000, ..., 9000
            return { num1, num2 };
        },
        // Near round numbers
        () => {
            const baseThousands = Math.floor(Math.random() * 9) + 1;
            const num1 = baseThousands * 1000;
            const num2 = baseThousands * 1000 - 1; // 999, 1999, 2999, etc.
            return { num1, num2 };
        }
    ];
    
    // Select a random problem type
    const selectedProblemType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
    const { num1, num2 } = selectedProblemType();
    
    return {
        num1: num1,
        num2: num2,
        answer: num1 + num2,
        display: `${num1} + ${num2} = ?`,
        isWordProblem: false
    };
}

// Helper function to generate a number with specific digits
function generateNumberWithDigits(thousands, hundreds, tens, ones) {
    return thousands * 1000 + hundreds * 100 + tens * 10 + ones;
}

// Check if an answer is correct
export function checkAnswer(problem, userAnswer) {
    // For multiple choice questions (used in properties level)
    if (problem.multipleChoice) {
        return userAnswer.toUpperCase() === problem.correctOption;
    }
    
    // For regular numerical answers
    const parsedAnswer = parseInt(userAnswer);
    return !isNaN(parsedAnswer) && parsedAnswer === problem.answer;
}
