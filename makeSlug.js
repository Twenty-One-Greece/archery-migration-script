module.exports = function returnSlug(value) {
    const letters = value.toLowerCase().split('') // makes chars lowercase and returns array of chars
    const englishLetters = 'abcdefghijklmnopqrstuvwxyz1234567890-'.split('')
    const convertedLetters = [] // array for converted letters

    letters.forEach((letter) => {
        if (!englishLetters.includes(letter)) { // check if conversion is needed
            const convertedLetter = convertToEnglish(letter) // convert letter
            convertedLetters.push(convertedLetter) // push converted letter to array
        } else convertedLetters.push(letter) // letter needs no conversion
    });

    const convertedString = convertedLetters.join("") // make array a string
    return convertedString // return converted string
}

// Converts characters to english (leaves out special chars)
const convertToEnglish = function(letter) {
    switch (letter) {
        case letter = 'α':
            letter = 'a'
            break;
        case letter = 'ά':
            letter = 'a'
            break;
        case letter = 'β':
            letter = 'b'
            break;
        case letter = 'γ':
            letter = 'g'
            break;
        case letter = 'δ':
            letter = 'd'
            break;
        case letter = 'ε':
            letter = 'e'
            break;
        case letter = 'έ':
            letter = 'e'
            break;
        case letter = 'ζ':
            letter = 'z'
            break;
        case letter = 'η':
            letter = 'i'
            break;
        case letter = 'ή':
            letter = 'i'
            break;
        case letter = 'θ':
            letter = 'th'
            break;
        case letter = 'ι':
            letter = 'i'
            break;
        case letter = 'ί':
            letter = 'i'
            break;
        case letter = 'κ':
            letter = 'k'
            break;
        case letter = 'λ':
            letter = 'l'
            break;
        case letter = 'μ':
            letter = 'm'
            break;
        case letter = 'ν':
            letter = 'n'
            break;
        case letter = 'ξ':
            letter = 'x'
            break;
        case letter = 'ο':
            letter = 'o'
            break;
        case letter = 'ό':
            letter = 'o'
            break;
        case letter = 'π':
            letter = 'p'
            break;
        case letter = 'ρ':
            letter = 'r'
            break;
        case letter = 'σ':
            letter = 's'
            break;
        case letter = 'τ':
            letter = 't'
            break;
        case letter = 'υ':
            letter = 'y'
            break;
        case letter = 'ύ':
            letter = 'y'
            break;
        case letter = 'φ':
            letter = 'f'
            break;
        case letter = 'χ':
            letter = 'h'
            break;
        case letter = 'ψ':
            letter = 'ps'
            break;
        case letter = 'ω':
            letter = 'o'
            break;
        case letter = 'ώ':
            letter = 'o'
            break;
        case letter = 'ς':
            letter = 's'
            break;
        case letter = ' ':
            letter = '-'
            break;
        default:
            return
    }
    return letter
}