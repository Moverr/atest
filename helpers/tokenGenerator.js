'use strict';
const jwt = require('jsonwebtoken');
// QR CODE GENERATION
const GenerateToken = async (user) => {
    const token = await jwt.sign(
        { 'email': user.email, 'user_id': user.id },
        process.env.JWT_SECRET,
        { expiresIn: '2 days', algorithm: 'HS256' } // set token expiration time and algorithm
    );
    return token;
};

module.exports = { GenerateToken };
