import mongoose from 'mongoose';

export interface IBagInfo {
    id:string;
    Name:string;
    Bags:number;
}

const BagInfoSchema = new mongoose.Schema({
    id:String,
    Name:String,
    Bags:Number
},{versionKey:false});

export const BagInfo = mongoose.model('userbags', BagInfoSchema);