import "dotenv/config";
import express from "express";
import router from "./routes/transfer-points";
import { globalErrorHandler } from "./middleware/error.middleware";

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", router);


// global handler
app.use(globalErrorHandler)

app.listen(process.env.PORT, ()=> {
    console.log("server is running");
})