import express from "express";
import router from "./routes/post-route"

const app = express()
const PORT = 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1", router)

app.listen(PORT, ()=> {
    console.log("server is running");
    
})