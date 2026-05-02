import mongoose from "mongoose";


const MONGO_URI = process.env.MONGO_URI

async function ConnectToDB() {
  try {
    const connection = await mongoose.connect(MONGO_URI)
    console.log('DataBase Connected ✅')
    
  } catch (error) {
    console.error('error while connecting to the Database',error)
    
  }
}

export default ConnectToDB;