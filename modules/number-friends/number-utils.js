/**
 * Number Utilities
 * Common functions for working with numbers in the Number Friends module
 */

// Find all factors of a number
export function getFactors(number) {
    if (number === 0) return []; // Zero has infinite factors, so return empty
    
    const factors = [];
    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            factors.push(i);
        }
    }
    return factors;
}

// Generate multiples of a number
export function getMultiples(number, count) {
    if (number === 0) return [0]; // Zero times anything is zero
    
    const multiples = [];
    for (let i = 1; i <= count; i++) {
        multiples.push(number * i);
    }
    return multiples;
}

// Check if a number is prime
export function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    
    let i = 5;
    while (i * i <= number) {
        if (number % i === 0 || number % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}

// Check if a number is even
export function isEven(number) {
    return number % 2 === 0;
}

// Check if a number is odd
export function isOdd(number) {
    return !isEven(number);
}

// Get place values of a number
export function getPlaceValues(number) {
    const numStr = number.toString();
    const result = [];
    
    for (let i = 0; i < numStr.length; i++) {
        const digit = parseInt(numStr[i]);
        const place = numStr.length - 1 - i;
        const value = digit * Math.pow(10, place);
        
        result.push({
            digit: digit,
            place: place,
            name: getPlaceName(place),
            value: value
        });
    }
    
    return result;
}

// Get place name (ones, tens, hundreds, etc.)
function getPlaceName(place) {
    const placeNames = [
        'ones', 'tens', 'hundreds', 'thousands',
        'ten thousands', 'hundred thousands', 'millions'
    ];
    
    return place < placeNames.length ? placeNames[place] : `10^${place}`;
}
