import mongoose from "mongoose";


export const criteriosSchema = new mongoose.Schema({
    type:String,
    valor:Number,
})