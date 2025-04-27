/**
 * Addition Properties Exercises
 * Contains exercise data for Level 6: Addition Properties
 */

import { PROPERTY_TYPES } from './modules/property-helper.js';

// Exercise types - use the shared constants
const PROPERTY_TYPES_LOCAL = PROPERTY_TYPES;

// Commutative Property Exercises
export const commutativeExercises = [
    {
        id: 'comm1',
        question: "Which property is shown by: 8 + 5 = 5 + 8?",
        options: [
            "A) Associative Property",
            "B) Commutative Property",
            "C) Identity Property",
            "D) Distributive Property"
        ],
        answer: "B",
        explanation: "The commutative property states that changing the order of addends doesn't change the sum. In this example, 8 + 5 = 5 + 8 = 13."
    },
    {
        id: 'comm2',
        question: "Solve using the commutative property: 37 + 25 = ? + 37",
        options: [
            "A) 25",
            "B) 37",
            "C) 62",
            "D) 12"
        ],
        answer: "A",
        explanation: "By the commutative property, if 37 + 25 = x + 37, then x must be 25."
    },
    {
        id: 'comm3',
        question: "Which equation demonstrates the commutative property?",
        options: [
            "A) (3 + 4) + 5 = 3 + (4 + 5)",
            "B) 7 + 0 = 7",
            "C) 9 + 6 = 6 + 9",
            "D) 2 + 2 = 4"
        ],
        answer: "C",
        explanation: "The commutative property is shown when numbers are added in a different order but give the same sum. 9 + 6 = 6 + 9 demonstrates this."
    },
    {
        id: 'comm4',
        question: "Jacob calculated 14 + 23 = 37. Without calculating again, what is 23 + 14?",
        options: [
            "A) 14",
            "B) 23",
            "C) 37",
            "D) 28"
        ],
        answer: "C",
        explanation: "By the commutative property, 14 + 23 = 23 + 14, so 23 + 14 = 37."
    },
    {
        id: 'comm5',
        question: "Complete the equation using the commutative property: 42 + 18 = ___ + 42",
        options: [
            "A) 18",
            "B) 42",
            "C) 60",
            "D) 24"
        ],
        answer: "A",
        explanation: "The commutative property states that a + b = b + a. So if 42 + 18 = x + 42, then x = 18."
    }
];

// Associative Property Exercises
export const associativeExercises = [
    {
        id: 'assoc1',
        question: "Which property is shown by: (2 + 3) + 4 = 2 + (3 + 4)?",
        options: [
            "A) Commutative Property",
            "B) Associative Property",
            "C) Identity Property",
            "D) Distributive Property"
        ],
        answer: "B",
        explanation: "The associative property states that changing the grouping (using parentheses) doesn't change the sum. In both cases, the result is 9."
    },
    {
        id: 'assoc2',
        question: "Using the associative property, which of these is equal to (5 + 2) + 8?",
        options: [
            "A) 5 + (2 + 8)",
            "B) (8 + 5) + 2",
            "C) 5 + (8 + 2)",
            "D) 8 + (5 + 2)"
        ],
        answer: "A",
        explanation: "The associative property allows us to regroup the numbers: (5 + 2) + 8 = 5 + (2 + 8)."
    },
    {
        id: 'assoc3',
        question: "Evaluate these expressions:\n(3 + 7) + 3 and 3 + (7 + 3)\nWhat property explains why they are equal?",
        options: [
            "A) Commutative Property",
            "B) Associative Property",
            "C) Identity Property",
            "D) They are not equal"
        ],
        answer: "B",
        explanation: "(3 + 7) + 3 = 10 + 3 = 13 and 3 + (7 + 3) = 3 + 10 = 13. They are equal because of the associative property, which allows us to change how we group numbers."
    },
    {
        id: 'assoc4',
        question: "Which equation shows the associative property of addition?",
        options: [
            "A) 4 + 7 = 7 + 4",
            "B) 5 + 0 = 5",
            "C) (6 + 4) + 9 = 6 + (4 + 9)",
            "D) 3 + 3 = 6"
        ],
        answer: "C",
        explanation: "The associative property is demonstrated when we regroup numbers with parentheses: (6 + 4) + 9 = 6 + (4 + 9)."
    },
    {
        id: 'assoc5',
        question: "Meera wants to add 24, 16, and 6. She first adds 24 + 6 = 30, then adds 30 + 16 = 46. What property did she use?",
        options: [
            "A) Commutative Property",
            "B) Associative Property",
            "C) Identity Property",
            "D) Distributive Property"
        ],
        answer: "B",
        explanation: "Meera regrouped the addition as (24 + 6) + 16 instead of 24 + (16 + 6). This uses the associative property, which states that changing the grouping doesn't change the sum."
    }
];

// Identity Property Exercises
export const identityExercises = [
    {
        id: 'iden1',
        question: "Which property is shown by: 12 + 0 = 12?",
        options: [
            "A) Commutative Property",
            "B) Associative Property",
            "C) Identity Property",
            "D) Distributive Property"
        ],
        answer: "C",
        explanation: "The identity property states that adding zero to any number gives the same number. 12 + 0 = 12 demonstrates this property."
    },
    {
        id: 'iden2',
        question: "What is the identity element for addition?",
        options: [
            "A) 1",
            "B) -1",
            "C) 0",
            "D) 10"
        ],
        answer: "C",
        explanation: "Zero is the identity element for addition, because adding 0 to any number gives the same number."
    },
    {
        id: 'iden3',
        question: "Which equation demonstrates the identity property of addition?",
        options: [
            "A) 5 + 5 = 10",
            "B) 8 + 0 = 8",
            "C) 9 + 3 = 3 + 9",
            "D) (2 + 6) + 4 = 2 + (6 + 4)"
        ],
        answer: "B",
        explanation: "The identity property states that any number plus zero equals the original number. 8 + 0 = 8 shows this property."
    },
    {
        id: 'iden4',
        question: "Fill in the blank: The identity property states that when you add ___ to any number, the result is that same number.",
        options: [
            "A) the number itself",
            "B) one",
            "C) zero",
            "D) any odd number"
        ],
        answer: "C",
        explanation: "When you add zero to any number, the result is that same number. This is the identity property of addition."
    },
    {
        id: 'iden5',
        question: "Which of these is the correct statement of the identity property of addition?",
        options: [
            "A) a + b = b + a",
            "B) (a + b) + c = a + (b + c)",
            "C) a + 0 = a",
            "D) a × 1 = a"
        ],
        answer: "C",
        explanation: "The identity property of addition states that a + 0 = a, where 0 is the identity element."
    }
];

/**
 * Get random exercises for each property type
 * @param {number} count - Number of exercises to get for each property
 * @returns {Array} Array of exercise objects
 */
export function getPropertyExercises(count = 5) {
    const exercises = [];
    
    // Add commutative property exercises
    const commutativeSelected = selectRandomItems(commutativeExercises, count);
    commutativeSelected.forEach(exercise => {
        exercises.push({
            ...exercise,
            propertyType: PROPERTY_TYPES.COMMUTATIVE
        });
    });
    
    // Add associative property exercises
    const associativeSelected = selectRandomItems(associativeExercises, count);
    associativeSelected.forEach(exercise => {
        exercises.push({
            ...exercise,
            propertyType: PROPERTY_TYPES.ASSOCIATIVE
        });
    });
    
    // Add identity property exercises
    const identitySelected = selectRandomItems(identityExercises, count);
    identitySelected.forEach(exercise => {
        exercises.push({
            ...exercise,
            propertyType: PROPERTY_TYPES.IDENTITY
        });
    });
    
    return exercises;
}

/**
 * Select random items from an array
 * @param {Array} array - The array to select from
 * @param {number} count - Number of items to select
 * @returns {Array} Array of selected items
 */
function selectRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Get exercises for a specific property type
 * @param {string} propertyType - The property type to get exercises for
 * @param {number} count - Number of exercises to get
 * @returns {Array} Array of exercise objects
 */
export function getExercisesByPropertyType(propertyType, count = 5) {
    switch (propertyType) {
        case PROPERTY_TYPES.COMMUTATIVE:
            return selectRandomItems(commutativeExercises, count).map(exercise => ({
                ...exercise, propertyType
            }));
        case PROPERTY_TYPES.ASSOCIATIVE:
            return selectRandomItems(associativeExercises, count).map(exercise => ({
                ...exercise, propertyType
            }));
        case PROPERTY_TYPES.IDENTITY:
            return selectRandomItems(identityExercises, count).map(exercise => ({
                ...exercise, propertyType
            }));
        default:
            return [];
    }
}
