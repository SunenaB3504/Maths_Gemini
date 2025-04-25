/**
 * Addition Adventure Level 3
 * Double Digits Addition
 */

export const Level3 = {
    id: 3,
    name: "Level 3: Double Digits",
    description: "Practice adding two two-digit numbers",
    problemCount: 5,
    generateProblem: function() {
        const num1 = 10 + Math.floor(Math.random() * 90); // 10-99
        const num2 = 10 + Math.floor(Math.random() * 90); // 10-99
        return {
            num1: num1,
            num2: num2,
            answer: num1 + num2,
            display: `${num1} + ${num2} = ?`
        };
    },
    visualAid: "place-value" // Use place value chart
};
