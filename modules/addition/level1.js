/**
 * Addition Adventure Level 1
 * Single Digit Addition
 */

export const Level1 = {
    id: 1,
    name: "Level 1: Single Digit",
    description: "Practice adding numbers from 0 to 9",
    problemCount: 5,
    generateProblem: function() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        return {
            num1: num1,
            num2: num2,
            answer: num1 + num2,
            display: `${num1} + ${num2} = ?`
        };
    },
    visualAid: "blocks" // Use block visualization
};
