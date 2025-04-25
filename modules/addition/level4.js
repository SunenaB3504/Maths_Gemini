/**
 * Addition Adventure Level 4
 * Addition with Carrying
 */

export const Level4 = {
    id: 4,
    name: "Level 4: Carrying",
    description: "Practice addition with carrying/regrouping",
    problemCount: 5,
    generateProblem: function() {
        // Generate problems where ones place sum > 9 (requiring carrying)
        let num1, num2;
        do {
            num1 = 10 + Math.floor(Math.random() * 90); // 10-99
            num2 = 10 + Math.floor(Math.random() * 90); // 10-99
        } while ((num1 % 10 + num2 % 10) <= 9); // Ensure ones place sum > 9
        
        return {
            num1: num1,
            num2: num2,
            answer: num1 + num2,
            display: `${num1} + ${num2} = ?`
        };
    },
    visualAid: "place-value-animated" // Animated place value chart showing carrying
};
