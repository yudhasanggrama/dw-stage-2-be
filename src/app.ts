import "dotenv/config";
import express from "express";
import router from "./routes/post_user-route"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1", router)

app.listen(process.env.PORT, ()=> {
    console.log("server is running");
    
})