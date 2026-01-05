import express from "express";
import router from "./routes/product_orders-route";

const app = express()
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", router)

app.listen(PORT, ()=> {
    console.log("server is running");
})