const express = require('express');
require('dotenv').config();

const app = express();

// import my custom modules
const novice = require('./routes/novice')
const users = require('./routes/users')
app.use(express.json())

app.get('/', (req, res) => {
    res.send("<h1>Hello from Express Server!</h1>");
    res.end()
})

app.use('/novice', novice)
app.use('/users', users)

const PORT = process.env.PORT || 5056;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
