import UserModel from './Models/UserModel.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


const InsertInitialData = async ()=>{
    const existingData = await UserModel.find();
    const salt = await bcrypt.genSalt(10)
    
    if(existingData.length === 0){
        const users = [
            {
                name:"Lipiga",
                email:"lipiga1771@gmail.com",
                password: await bcrypt.hash("lipiga1771", salt),
                image:"team-2.jpg",
                type:"admin"
            },
            {
                name:"Yoga",
                email:"yoga12345@gmail.com",
                password: await bcrypt.hash("yoga12345", salt),
                image:"team-2.jpg",
                type:"superadmin"
            }
        ]
        await UserModel.insertMany(users);
    }
}

export { InsertInitialData }