const jwt = require('jsonwebtoken');
const models = require('../models');

// MODELS
const User = models.User;

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] }); // verify token and set algorithm
        const user = await User.findOne({ where: { email: decodedToken.email, id: decodedToken.user_id } });
        if (!user) return res.status(401).send({ msg: 'Your token is invalid' });
        req.user = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            image: user.image,
            countryId: user.countryId,
            phone: user.phone,
            isActive: user.isActive,
            userType: user.userType,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ msg: 'Your token has expired' }); // handle expired token error
        } else {
            return res.status(401).send({ msg: 'You are unauthenticated' }); // handle other token verification errors
        }
    }
};

module.exports = { checkAuth };
