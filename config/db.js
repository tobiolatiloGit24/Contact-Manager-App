const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb://127.0.0.1:27017/customer-contact");
        
        console.log('Database Connected')
    } catch (error) {
        console.log(error)
    }
}


// mongoose.set('strictQuery', false);
// const connectDB = async () => {
//     try {
//         const connect = await mongoose.connect(process.env.MONGODB_URI);
//         console.log(`Database Connected: ${connect.connection.host}`)
//     } catch (error) {
//         console.log(error)
//     }
// }


module.exports = connectDB;
