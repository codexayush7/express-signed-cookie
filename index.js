const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use a simple secret key for signed cookies
app.use(cookieParser("mySecretKey"));

// Set signed cookie
app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'ayush', {
        maxAge: 900000,
        httpOnly: true,
        signed: true
    });
    res.send('Signed cookie has been set!');
});

// Get signed cookie
app.get('/get-cookie', (req, res) => {
    const username = req.signedCookies.username;
    res.send(`Signed Username cookie: ${username}`);
});

// Clear cookie
app.get('/clear-cookie', (req, res) => {
    res.clearCookie('username');
    res.send('Cookie cleared.');
});

app.listen(9090, () => {
    console.log('Server running on port 9000...');
});
