import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import SellerRouter from './Routes/SellerRoute.js'
import UserRouter from './Routes/UserRoute.js'
import ProductRouter from './Routes/ProductRoute.js'
import CartRouter from './Routes/CartRoute.js'
import OrderRouter from './Routes/OrderRoute.js'
import { InsertInitialData } from './adminData.js'

const app = express()
const port = 4000

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/ownproject").then(console.log("Database Connected"))

InsertInitialData();

//function api's
app.use("/api/seller",SellerRouter)
app.use("/images",express.static('uploaded_files'))
app.use("/api/user",UserRouter)
app.use("/api/product",ProductRouter)
app.use("/api/cart",CartRouter)
app.use("/api/order",OrderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})