import crypto from 'crypto'

const generateRandomPassword = (length = 12, options = {}) => {
       
    const defaultOptions = {
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
        excludeChars: ''
    };

    const mergedOptions = { ...defaultOptions, ...options };
    
    const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let allowedChars = '';
    for (const [key, value] of Object.entries(mergedOptions)) {
        if (value && charSets[key]) {
        allowedChars += charSets[key];
        }
    }

    if (mergedOptions.excludeChars) {
        const excludeRegex = new RegExp(`[${mergedOptions.excludeChars}]`, 'g');
        allowedChars = allowedChars.replace(excludeRegex, '');
    }

    if (!allowedChars) {
        throw new Error('Pelo menos um conjunto de caracteres deve ser habilitado');
    }

    let password = '';
    const randomValues = new Uint8Array(length);
    
    crypto.randomFillSync(randomValues);

    for (let i = 0; i < length; i++) {
        const randomIndex = randomValues[i] % allowedChars.length;
        password += allowedChars[randomIndex];
    }

    return password;

}

export default generateRandomPassword;