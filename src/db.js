import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://romario91546:12121212@cluster0.bfse5nd.mongodb.net/");
    console.log("Conexion a la base de datos Existosa");
  } catch (error) {
    console.log(error);
  }
};