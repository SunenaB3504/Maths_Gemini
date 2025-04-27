/**
 * Property Helper Module
 * Provides utilities for identifying and handling addition properties
 */

export const PROPERTY_TYPES = {
    COMMUTATIVE: 'commutative',
    ASSOCIATIVE: 'associative',
    IDENTITY: 'identity'
};

/**
 * Identify the property type from problem text
 * @param {Object} problem - The problem object
 * @returns {string} The identified property type
 */
export function identifyPropertyType(problem) {
    // If problem already has propertyType, return it
    if (problem.propertyType) {
        return problem.propertyType;
    }
    
    // Otherwise try to detect it from the question text
    const problemText = problem.display ? problem.display.toLowerCase() : '';
    
    if (problemText.includes("commutative") || 
        problemText.includes("order") || 
        problemText.includes("a + b = b + a")) {
        return PROPERTY_TYPES.COMMUTATIVE;
    } 
    else if (problemText.includes("associative") || 
             problemText.includes("grouping") || 
             problemText.includes("(a + b) + c") ||
             problemText.includes("a + (b + c)")) {
        return PROPERTY_TYPES.ASSOCIATIVE;
    } 
    else if (problemText.includes("identity") || 
             problemText.includes("zero") || 
             problemText.includes("a + 0") ||
             problemText.includes("0 + a")) {
        return PROPERTY_TYPES.IDENTITY;
    }
    
    // Default case
    return PROPERTY_TYPES.COMMUTATIVE;
}
