'use strict';
const argon2 = require('argon2');
const Joi = require('joi');
const models = require('../models')
const AuthTokenHelper = require('../helpers/tokenGenerator')
const RandomCodeHelper = require('../helpers/radomcodeGenerator')
// MODELS
const User = models.User
const Audit = models.Audit
// CREATE USER

const Register = async (req, res) => {
    try {
        const schema = Joi.object({
            fullName: Joi.string().max(100).required(),
            email: Joi.string().email().max(100).required(),
            password: Joi.string().min(6).required(),
            confirm_password: Joi.string().min(6).required(),
            countryId: Joi.required(),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ msg: error.details[0].message });

        const image = "default.png";
        const { fullName, email, phone, countryId, password } = req.body;
        const hashedPassword = await argon2.hash(password);
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) return res.status(409).send({ msg: 'User with this email already exists' });
        const code = await RandomCodeHelper.generateCode(8)
        const newUser = await User.create({ code, fullName, email, image, countryId, password: hashedPassword, });
        res.status(200).send({
            msg: `User ${newUser.fullName} registered successfully`,
            user: {
                'id': newUser.id,
                'fullName': newUser.fullName,
                'email': newUser.email,
                'isActive': newUser.isActive,
            }
        });
        const userId = newUser.id
        const action = `New user ${newUser.fullName} joined successfully`
        await Audit.create({ action, userId })
    } catch (error) {
        res.status(500).send({ msg: 'Error creating user', error });
    }
};
// USER LOGIN
const Login = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ 'msg': error.details[0].message });
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(404).send({ 'msg': 'Invalid credentials' });
        const match = await await argon2.verify(user.password, req.body.password);

        if (!match) return res.status(404).send({ 'msg': 'Invalid credentials' });
        const token = await AuthTokenHelper.GenerateToken(user)
        return res.status(200).send({
            'msg': `User ${user.fullName} authenticated successfully`,
            'token': token,
            "user": { "id": user.id, "name": user.fullName, "phone": user.phone,"type": user.userType, "email": user.email, "isActive": true  },
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({ 'msg': 'Server error', });
    }
};
const Authenticated_user = async (req, res) => {
    const user = req.user
   return res.status(200).send({
            "user": { "id": user.id, "name": user.fullName, "phone": user.phone,"type": user.userType, "email": user.email, "isActive": true  },
        });
}

module.exports = {
    Register,
    Login,
    Authenticated_user
}