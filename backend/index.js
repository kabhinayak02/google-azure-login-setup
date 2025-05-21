const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./models/dbConnection');
const PORT = process.env.PORT || 8080;

const authRoutes = require('./routers/authRoute');

app.use(cors());
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
});