import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import fetchAndStoreContests from './models/contestModel.js';
import { router as contestRoutes } from './routes/contests.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Middleware for static files and URL encoded form data
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Express session for user authentication
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Fetch contests on server start and then every hour (3600000 ms)
fetchAndStoreContests();
setInterval(fetchAndStoreContests, 3600000);

// Mount routes
app.use('/', contestRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
