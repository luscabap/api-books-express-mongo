import mongoose from "mongoose";

async function conectaNaDataBase(){
    mongoose.connect("mongodb+srv://lucas:123@cluster0.ksoh24z.mongodb.net/livraria?retryWrites=true&w=majority&appName=Cluster0")
    
    return mongoose.connection;
};

export default conectaNaDataBase;