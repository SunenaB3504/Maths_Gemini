/**
 * Addition Adventure Level 2
 * Two Digits + One Digit
 */

export const Level2 = {
    id: 2,
    name: "Level 2: Two Digits",
    description: "Practice adding a two-digit number and a one-digit number",
    problemCount: 5,
    generateProblem: function() {
        const num1 = 10 + Math.floor(Math.random() * 90); // 10-99
        const num2 = Math.floor(Math.random() * 10); // 0-9
        return {
            num1: num1,
            num2: num2,
            answer: num1 + num2,
            display: `${num1} + ${num2} = ?`
        };
    },
    visualAid: "number-line" // Use number line visualization
};
