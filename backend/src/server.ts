import app from "./app.ts";
import { connectDB } from "./db/index.ts";


const PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started at 5000.");
    })
}).catch((error) => {
    console.log("DB Connection error.", error);
})

