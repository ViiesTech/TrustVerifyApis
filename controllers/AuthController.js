const UserModel = require("../models/UserModel.js")
const bcrypt = require('bcryptjs')
const JWT =  require('jsonwebtoken')
class AuthController {

    static Signup = async (req, res) => {
        const { email, password ,confirm_password} = req.body;

        try {
            const userExist = await UserModel.findOne({ email: email });


            if (userExist) {
                res.send({
                    success: false,
                    message: "User already exists",
                });
            } else {
                if (email && password && confirm_password ) {
                    try {
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password, salt);

                        const createAccount = new UserModel({
                            email: email,
                            password: hashPassword,
                        });

                        createAccount.save().then(async () => {
                            const savedUser = await UserModel.findOne({ email: email });

                            if (savedUser) {
                                const token = JWT.sign(
                                    { UserID: savedUser._id },
                                    "TrustVerifypoiuystrewq",
                                    { expiresIn: "30d" }
                                );
                                res.send({
                                    status: "true",
                                    message: "Registered successfully",
                                    token: token,
                                });
                            } else {
                                res.send({
                                    status: "false",
                                    message: "Registration Failed",
                                });
                            }
                        });
                    } catch (e) {
                        res.send({
                            status: "failed",
                            message: "Registration failed",
                            error: e.message,
                        });
                    }
                } else if(password !== confirm_password){
                    res.send({
                        status: "false",
                        message: "Password does not match",
                    });
                }else{
                    res.send({
                        status: "failed",
                        message: "All fields are required",
                    });
                }
            }
        } catch (error) {
            // Handle any error that might occur while querying the database
            res.send({
                status: "failed",
                message: "Error checking user existence",
                error: error.message,
            });
        }
    };

    static Login = async (req, res) => {
        const { email, password } = req.body

        try {
            const user = await UserModel.findOne({ email: email })

            if (user) {

                const isHashMatch = await bcrypt.compare(password, user.password);

                if (isHashMatch) {
                    // Generate a JWT token and send the user's data without the password
                    const token = JWT.sign({ UserID: user._id }, "JohnRadarpoiuytrewq", { expiresIn: '30d' });
                    const userData = { _id: user._id,  email: user.email, };

                    return res.send({
                        "status": "Success",
                        "message": "Successfully logged in",
                        "data": userData,
                        "token": token,
                    });
                } else {
                    return res.send({ "status": "failed", "message": "Incorrect password" });
                }
            } else {
                res.send({
                    success: "false",
                    message: "Please enter the valid email and password",

                });
            }
        } catch (error) {
            res.send({
                status: "failed",
                message: "Error checking user existence",
                error: error.message,
            });
        }



    }

}


module.exports = AuthController