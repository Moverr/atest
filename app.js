const express = require('express')
const helmet = require('helmet');
const app = express()
const path = require('path');
const cors = require('cors');
const ApiRoutes = require('./routes')
require("dotenv").config();

// Enable Content Security Policy (CSP)
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", 'trusted-cdn.com'],
            objectSrc: ["'none'"],
        },
    })
);
// Set X-Frame-Options header to prevent clickjacking
app.use(helmet.frameguard({ action: 'deny' }));
// Enable XSS protection in the browser
app.use(helmet.xssFilter());
// Set X-Content-Type-Options header to prevent MIME type sniffing
app.use(helmet.noSniff());
// Use HTTPS
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));

// MIDDLEWARES
app.use(cors({
    origin: process.env.FRONTENDURL
}));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// ROUTES
app.use('/api', ApiRoutes)
app.get('/', (req, res) => res.status(200).send({ 'msg': "Vision Voting API", "status": 'running...' }))
app.use((req, res, next) => res.status(404).send({ "msg": 'API route not found', "code": '404' }))
module.exports = app