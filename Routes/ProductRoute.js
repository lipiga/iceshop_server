import express from 'express'
import multer from 'multer'
import { AddProduct, DeleteProduct, GetProductById, GetSellerProduct, ProductList, UpdateProduct } from '../Controllers/ProductControl.js'

const ProductRouter = express.Router()

const storage = multer.diskStorage({
    destination: "uploaded_files",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

ProductRouter.post("/addproduct",upload.single("image"),AddProduct)
ProductRouter.get("/listproduct",ProductList)
ProductRouter.post("/deleteproduct",DeleteProduct)
ProductRouter.get("/getsellerproduct",GetSellerProduct)
ProductRouter.get("/fetchproduct",GetProductById)
ProductRouter.post("/updateproduct",upload.single("image"),UpdateProduct)

export default ProductRouter