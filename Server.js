import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is start on port 4000")
})