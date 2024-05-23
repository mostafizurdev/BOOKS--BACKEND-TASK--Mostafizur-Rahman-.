const express = require('express');
const connectDB = require('./helper/db');  
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authorRoutes');
const userRoutes = require('./routes/userRoutes')
const auth = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', express.static('./static', {maxAge: 60*60*24*1000}));

// Routes
app.use('/api/auth', authRoutes);

app.use('/users', userRoutes);


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
