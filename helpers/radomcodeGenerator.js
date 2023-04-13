'use strict';
const generateCode = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let activationCode = '';
    for (let i = 0; i < length; i++) {
        activationCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return activationCode;
}

module.exports = { generateCode }