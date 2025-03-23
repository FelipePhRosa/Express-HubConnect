import prismaClient from "../../src/prisma";

interface DeleteStoreProps{
    storeId: string;
    ownerId: string;
}

class DeleteStoreService{
    async execute({ storeId, ownerId }: DeleteStoreProps){

        if(!storeId || !ownerId){
            throw new Error("Invalid Request.")
        }

        const findStore = await prismaClient.store.findUnique({
            where: {
                id: storeId
            }
        })
        
        if(!findStore){
            throw new Error("Store not found.")
        }

        if (findStore.ownerId !== ownerId) {
            throw new Error("You are not authorized to delete this store.");
        }

        await prismaClient.store.delete({
            where: {    
                id: findStore.id
            }
        })
        
        return {message: "Store deleted successfully."}
    }
}

export { DeleteStoreService }