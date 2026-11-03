import app from "./src/app.js";
import dotenv from "dotenv";
import { connectDb } from "./src/config/db.js";
dotenv.config();

const PORT = process.env.PORT;

connectDb();

app.listen(PORT, () => {
    console.log("Server is start on port 4000")
})