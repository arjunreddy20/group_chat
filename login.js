const express = require("express");
const router = express.Router();

// Login page to set username
router.get("/login", (req, res) => {
    res.send(`
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Enter your username" required />
            <button type="submit">Login</button>
        </form>
        <script>
            if (localStorage.getItem('username')) {
                window.location.href = '/messages';
            }
        </script>
    `);
});

// Save username to local storage and redirect to message page
router.post("/login", (req, res) => {
    const username = req.body.username;
    if (username) {
        res.send(`
            <script>
                localStorage.setItem('username', '${username}');
                window.location.href = '/messages';
            </script>
        `);
    } else {
        res.redirect("/login");
    }
});

module.exports = router;
