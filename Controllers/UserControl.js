import UserModel from "../Models/UserModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

//seller registration
const UserRegister = async (req, res) => {
    let image_name = `${req.file.filename}`
    const { name, email, password,type } = req.body

    //email check
    try {
        const exist = await UserModel.findOne({ email })
        if (exist) {
            res.json({ success: false, message: "User Already Exist" })
        }

        if (!validator.isEmail(email)) {
            res.json({ success: false, message: "Please enter a Valid Email" })
        }

        if (password.length < 8) {
            res.json({ success: false, message: "Password should be 8 characters or above" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        const newUser = new UserModel({
            name: name,
            password: hashpassword,
            email: email,
            image: image_name,
            type:type
        })

        const user = await newUser.save()
        const userId = user._id
        res.json({ success: true,  userId, message: "Register Successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Can't Enter a Seller" })
    }
}

const UserLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })

        if (!user) {
            res.json({ success: false, message: "User Doesn't Exist" })
        }

        const passMatch = await bcrypt.compare(password, user.password)
        if (!passMatch) {
            res.json({ success: false, message: "Incorrect Password" })
        }

        const userId = user._id
        const type = user.type
        res.json({ success: true,data:user,type, userId, message: "Login successfully" })
    } catch (error) {

    }

}

export {UserLogin, UserRegister}