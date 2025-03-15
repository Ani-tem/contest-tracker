import express from 'express';
import { registerUser, loginUser } from '../models/userModel.js';

const router = express.Router();

// GET login page
router.get('/login', (req, res) => {
    res.render('login');
});

// POST login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await loginUser(username, password);
        if (user) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Server error during login');
    }
});

// GET register page
router.get('/register', (req, res) => {
    res.render('register');
});

// POST register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        await registerUser(username, password);
        res.redirect('/users/login');
    } catch (error) {
        res.status(500).send('Server error during registration');
    }
});

// GET logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
});

export default router;
