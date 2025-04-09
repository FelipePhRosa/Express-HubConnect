import connection from "../SQL/connection"

interface StoreData{
    ownerId: number;
    nameStore: string;
    descriptionStore: string;
    category: string;
    urlImage: string;
}

export default class storeService {
    async createStore(storeData: StoreData) {
        return await connection('Store').insert(storeData);
    }

    async getAllStores() {
        return await connection('Store').select('*');
    }

    async getStoreById(storeId: number) {
        return await connection('Store').where({ id_store: storeId }).select('*').first();
    }

    async deleteStore(storeId: number) {
        return await connection('Store').where({ id_store: storeId}).select('*').delete();
    }
    
}