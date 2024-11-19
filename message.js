const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/messages", (req, res) => {
    fs.readFile("username.txt", "utf-8", (err, data) => {
        if (err) {
            data = "No chats yet!";
        }
        res.send(`
            <div>${data}</div>
            <form action="/messages" method="POST" onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
                <input type="text" id="message" name="message" placeholder="Enter message" required />
                <input type="hidden" id="username" name="username" />
                <button type="submit">Send</button>
            </form>
        `);
    });
});

router.post("/messages", (req, res) => {
    const { username, message } = req.body;
    if (username && message) {
        const log = `${username}: ${message}\n`;
        fs.appendFile("username.txt", log, (err) => {
            if (err) {
                console.error("Error writing to file", err);
            }
        });
    }
    res.redirect("/messages");
});

module.exports = router;
