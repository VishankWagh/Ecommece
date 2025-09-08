import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import Customer from "../models/customerModel.js";
import Shop from "../models/shopModel.js";

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};


export const signUpController = async (req, res) => {
    try {
        const { role, name, email, password } = req.body;


        let message;
        if (role != '1' && role != '2') {
            message = "Invalid User role";
        }
        else if (!validator.isEmail(email)) {
            message = "Email is not valid";
        }
        // Commented for Testing
        // else if (!validator.isStrongPassword(password)) {
        //     message = "Password is not strong enough";
        // }


        let model;
        if (role == '1') //customer
            model = Customer;
        else if (role == '2') //shop owner
            model = Shop;
        console.log("req.body", email, role);

        const exists = await model.findOne({ email });

        if (exists)
            message = "User already exists"

        if (message) {
            return res.status(200).send({
                success: false,
                message
            });
        }

        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        // UNCOMMENT BELLOW LINE TO ENCRYPT PASSWORD BEFORE STORING AND REMOVE THE NEXT LINE.
        const hashedPassword = await bcrypt.hash(password, salt);
        // const hashedPassword = password;

        console.log("hased");


        let newUser;

        if (role == '1') {
            newUser = new Customer({
                name,
                email,
                password: hashedPassword,
            });
        }
        else if (role == '2') {
            console.log("11");
            newUser = new Shop({
                name,
                email,
                password: hashedPassword,
            });
        }
        console.log("created", role);


        const newentry = await newUser.save();

        const token = createToken(newentry._id);

        console.log("id", newentry._id);


        return res.status(200).send({
            success: true,
            auth: {
                role,
                name,
                id: newentry._id,
                token
            }
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "500 Internal Server Error, User not created",
            error
        });
    }
}

export const loginController = async (req, res) => {
    try {
        const { role, email, password } = req.body;

        let message;

        if (!email || !password) {
            message = "All fields are required";
        }

        if (!validator.isEmail(email.emailId || email)) {
            message = "Email is not valid";
        }

        if (message) {
            return res.status(200).send({
                message,
                success: false
            });
        }

        let user;

        if (role == 1) {//customer
            user = await Customer.findOne({ email });
        }

        else if (role == 2) {//shop owner
            user = await Shop.findOne({ email });
        }

        if (!user) {
            return res.status(200).send({
                message: "Email not found",
                success: false
            });
        }

        // UNCOMMENT BELLOW LINE TO CHECK ENCRYPTED PASSWORD
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(200).send({
                message: "Password Incorrect",
                success: false
            });
        }

        const token = createToken(user._id);

        return res.status(200).send({
            success: true,
            auth: {
                role,
                name: user.name,
                id: user._id,
                token
            }
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "500 Internal Server Error, User not logged in",
        });
    }
}