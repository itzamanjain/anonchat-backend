// const mongoose = require("mongoose");

// const dbConnection = (url) => {
//   return mongoose.connect(url);
// };

// module.exports = { };

// import { DB_NAME } from '../constant.js'
import mongoose from 'mongoose'

const DB_NAME = "apna DB"
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected ! DB host: ${connectionInstance.connection.host}`);
        // console.log(connectionInstance);
    } catch (error) {
        console.log("Mongodb connection failed",error);
        process.exit(1);
    }
}

export default connectDB