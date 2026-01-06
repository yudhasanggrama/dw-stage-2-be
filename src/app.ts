import "dotenv/config";
import express from "express";
import router from "./routes/product_order-routes";

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.listen(process.env.PORT, ()=> {
    console.log("server is running");
    
})