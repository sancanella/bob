import { getBagInfos, createBagInfo, deleteBagInfo, updateBagInfo } from "../../data/requests/bag-info-repository";
import { BagInfo, IBagInfo } from "../../data/models/BagInfo";

export class BackOfficeService {

    public getBagInfo = (): Promise<Array<typeof BagInfo>> => {
        try {
            return getBagInfos()
        } catch (error) {
            return Promise.resolve([])   
        }
    }

    public createBagInfo = (newEntity: IBagInfo): Promise<typeof BagInfo | undefined> => {
        try {
            return createBagInfo(newEntity)
        } catch (error) {
            return Promise.resolve(undefined)   
        }
    }

    public updateBagInfo = (id:string, newEntity: IBagInfo): Promise<typeof BagInfo | undefined> => {
        try {
            return updateBagInfo(id, newEntity)
        } catch (error) {
            return Promise.resolve(undefined)   
        }
    }

    public deleteBagInfo = (id:string): Promise<Boolean> => {
        try {
            return deleteBagInfo(id)
        } catch (error) {
            return Promise.resolve(false)   
        }
    }


}

export default new BackOfficeService();