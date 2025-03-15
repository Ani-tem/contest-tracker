import pool from './db.js';
import bcrypt from 'bcryptjs';

// Register a new user
export async function registerUser(username, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2)',
            [username, hashedPassword]
        );
    } catch (error) {
        throw new Error('User registration failed');
    }
}

// Login user and return user object if valid
export async function loginUser(username, password) {
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isValid = await bcrypt.compare(password, user.password);
            return isValid ? user : null;
        }
        return null;
    } catch (error) {
        throw new Error('Login failed');
    }
}
