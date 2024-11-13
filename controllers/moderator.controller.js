const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authrization?.split(' ')[1];
    if(!token) return res.status(401).json({ message: 'Unauthorized' });
    // TODO - take secret to env file
    jwt.verify(token, 'secret', (err, user) => {
        if(err) return res.status(403).json({ message: 'Forbidden' });
        req.user = user;
        next();
    })
}

router.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    // TODO - validate password with bcrypt. take email to env
    if(email === 'admin@admin.com' && password === 'admin123') {
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

router.get('/moderate', auth,  (req, res) => {
    // Fetch jokes for moderate
});

module.exports = router;