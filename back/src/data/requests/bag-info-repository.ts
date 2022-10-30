import { BagInfo,IBagInfo } from "../../data/models/BagInfo";
import mongoose from 'mongoose';

export const getBagInfos = (): any => {
    return BagInfo.find()
}

export const updateBagInfo = (id:string, newEntity: IBagInfo): any => {
    return BagInfo.updateOne({ _id: new mongoose.Types.ObjectId(id)},{...newEntity, id:undefined})
}

export const createBagInfo = (newEntity: IBagInfo): Promise<any> => {
    return BagInfo.create({...newEntity, id:undefined})
}

export const deleteBagInfo = (id:string): Promise<Boolean> => {
    return BagInfo.deleteOne({_id: new mongoose.Types.ObjectId(id)}).then(res => res.deletedCount != 0);
}