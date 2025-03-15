import express from 'express';
import pool from '../models/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contests ORDER BY start_time ASC');
        // Pass session data so the view can show user info if logged in
        res.render('index', { contests: result.rows, session: req.session });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// ... your code ...
export { router };

