import OrderModel from "../Models/OrderModel.js";

import CartModel from "../Models/CartModel.js"



const PlaceOrder = async (req,res)=>{

    
    const {user_id,doorno,street,area,amount,district,state,username,phone,pincode,product} = req.body
    try {
        const order = new OrderModel({
            username:username,
            phone:phone,
            user_id : user_id,
            doorno:doorno,
            street:street,
            area:area,
            district:district,
            state:state,
            pincode:pincode,
            product:product,
            amount:amount
        })
        const orderPlaced = order.save()
        await CartModel.deleteMany({"user_id":user_id})
       
        if(orderPlaced){
            res.json({success:true, message:"order placed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:true,message:"error"})
    }
}

const UserOrder = async(req,res)=>{

    const { user_id } = req.headers
    const userOrder = await OrderModel.find({ "user_id": user_id })
    res.json({ success: true, data: userOrder })
}

const SellerOrder = async(req,res)=>{
    const {seller_id} = req.headers
    const sellerOrder = await OrderModel.find({ 'product.seller_id':seller_id } )
    res.json({success:true,data:sellerOrder})
}

const UpdateStatus = async(req,res)=>{
    const {seller_id} = req.headers
    const sellerOrder = await OrderModel.find({ 'product.seller_id': seller_id })
    res.json({success:true})
}

export {PlaceOrder,UserOrder,SellerOrder,UpdateStatus}