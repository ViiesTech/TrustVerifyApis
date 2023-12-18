
import mongoose from "mongoose";

const ConnectDatabase = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect('mongodb://localhost:27017/TrustVerify');
    const db = mongoose.connection;
    db.on("error", (error) => console.log(error));
    db.once("open", () => console.log("DB Connected"));
}

export default ConnectDatabase