const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authenticate = require('./middleware/authenticate');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const teamRoutes = require('./routes/teamRoutes');
const deliverableRoutes = require('./routes/deliverableRoutes');
const gradeRoutes = require('./routes/gradeRoutes');

const sequelize = require('./db/index');
const associations = require('./db/associations');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/projects', authenticate(), projectRoutes);
app.use('/api/teams', authenticate(), teamRoutes);
app.use('/api/users', authenticate(), userRoutes);
app.use('/api/deliverables', authenticate(), deliverableRoutes);
app.use('/api/grades', authenticate(), gradeRoutes);

app.use((err, req, res, next) => {
    console.log('🚨 An error occurred')
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});

module.exports = app;
