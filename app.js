// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const upperEl = document.getElementById('uppercase');
const lowerEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// *****
// getting values - event listeners
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = upperEl.checked;
    const hasLower = lowerEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;

    resultEl.innerText = generatePassword(length, hasLower, hasUpper, hasNumbers, hasSymbols);
})

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
})

// *****
// Generate Pass function
function generatePassword(length, lower, upper, number, symbol) {
    // 1. Init passwoord variable
    // 2. Filter out unchecked types
    // 3. Loop over the length, call generator function for each type
    // 4. Add the final password to the password variable and return

    let generatedPassword = '';

    // count checked options
    const typesCount = lower + upper + number + symbol;
    // array based on typesCount
    const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    console.log(typesArray);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        })
    }
    const finalPass = generatedPassword.slice(0, length);
    console.log(finalPass);
    return finalPass;
}

// *****
// Generator functions based on charset

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

function getRandomSymbol() {
    const symbols = '~!@#$%^&*()_+}|{=-<>?/.,:'
    return symbols[Math.floor(Math.random() * symbols.length)];
};

console.log(getRandomLower(), getRandomUpper(), getRandomNumber(), getRandomSymbol());