const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send({ "msg": "This is Home Page" });
});

app.use("/api/users", userRouter);

app.listen(3000, async () => {
    try {
        await connection;
        console.log("Connected to the DB");
        console.log(`Server is running on port 3000`);
    } catch (error) {
        console.log(error);
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
