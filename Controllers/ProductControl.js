import ProductModel from "../Models/ProductModel.js";
import fs from 'fs'

//product add

const AddProduct = async (req,res) => {
    const image_name = `${req.file.filename}`
    const {name,price,stock,product_detail,seller_id}= req.body

    try {
        const newProduct = new ProductModel({
            name:name,
            seller_id:seller_id,
            price:price,
            stock:stock,
            product_detail:product_detail,
            image:image_name
        })
        const product = await newProduct.save()
        res.json({success:true,message:"product added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}
const ProductList = async (req,res) => {
    try {
        const products = await ProductModel.find({})
        res.json({success:true,data:products})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"No products"})
    }
}

const DeleteProduct = async(req,res) =>{
    const product = await ProductModel.findById(req.body.id)
    fs.unlink(`uploaded_files/${product.image}`,()=>{})

    await ProductModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Product deleted"})
}

const GetSellerProduct = async (req, res) => {
    const { seller_id } = req.headers
    const getProducts = await ProductModel.find({ "seller_id": seller_id })
    res.json({ success: true, data: getProducts })
}

const GetProductById = async (req,res)=>{
    const {product_id} = req.headers
    const fetchProduct = await ProductModel.findById(product_id)
    res.json({success:true,data:fetchProduct})
}

const UpdateProduct = async(req,res)=>{
    
    const { name, price, product_id, stock, product_detail} = req.body
    const image_name = `${req.file.filename}`
    
    try{
        const product = await ProductModel.findByIdAndUpdate(product_id,{
            "name":name,
            "price":price,
            "product_detail":product_detail,
            "stock":stock,
            "image":image_name
        })
        res.json({success:true,message:"updated"})
    }catch(error){

    }
}

export {AddProduct,ProductList,DeleteProduct,GetSellerProduct,GetProductById,UpdateProduct}