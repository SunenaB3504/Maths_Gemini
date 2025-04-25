/**
 * Addition Adventure Level 5
 * Word Problems
 */

export const Level5 = {
    id: 5,
    name: "Level 5: Word Problems",
    description: "Solve simple word problems using addition",
    problemCount: 5,
    generateProblem: function() {
        const scenarios = [
            {
                template: "Nia has {num1} pencils. Her friend gives her {num2} more pencils. How many pencils does Nia have now?",
                range1: [3, 15],
                range2: [2, 10]
            },
            {
                template: "There are {num1} students in the classroom. {num2} more students join them. How many students are there altogether?",
                range1: [10, 25],
                range2: [5, 15]
            },
            {
                template: "Nia read {num1} pages on Monday and {num2} pages on Tuesday. How many pages did she read in total?",
                range1: [5, 25],
                range2: [5, 25]
            }
        ];
        
        // Select a random scenario
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        
        // Generate numbers based on the scenario ranges
        const num1 = scenario.range1[0] + Math.floor(Math.random() * (scenario.range1[1] - scenario.range1[0] + 1));
        const num2 = scenario.range2[0] + Math.floor(Math.random() * (scenario.range2[1] - scenario.range2[0] + 1));
        
        // Create the problem text
        const problemText = scenario.template
            .replace("{num1}", num1)
            .replace("{num2}", num2);
            
        return {
            num1: num1,
            num2: num2,
            answer: num1 + num2,
            display: problemText,
            isWordProblem: true
        };
    },
    visualAid: "picture-representation" // Show pictorial representations
};
