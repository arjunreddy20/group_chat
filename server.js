const express = require("express");
const bodyparser = require("body-parser");
const loginRoute = require("./login");
const messageRoute = require("./message");

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));

// Redirect to login if no username is set
app.get("/", (req, res) => {
    res.send(`
        <script>
            if (!localStorage.getItem('username')) {
                window.location.href = '/login';
            } else {
                window.location.href = '/messages';
            }
        </script>
    `);
});

// Use login and message routes
app.use(loginRoute);
app.use(messageRoute);

// Listen on port 3000
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
