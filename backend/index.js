import express from 'express';
import { connection } from './db.js';
import { userRouter } from './routes/user.routes.js';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';


dotenv.config();


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

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
