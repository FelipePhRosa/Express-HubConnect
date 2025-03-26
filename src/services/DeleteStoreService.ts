import prismaClient from "../../src/prisma";

interface DeleteStoreProps{
    storeId: string;
    ownerId: string;
}

class DeleteStoreService{
    async execute({ storeId, ownerId }: DeleteStoreProps){
        // Verificando se os parâmetros estão presentes
        if(!storeId || !ownerId){
            throw new Error("Invalid Request.");
        }

        // Verificando se o usuário (owner) existe
        const owner = await prismaClient.user.findFirst({ where: { id: ownerId }});
        if (!owner) {
            throw new Error("User not found!");
        }

        // Buscando a loja com o storeId
        const findStore = await prismaClient.store.findFirst({
            where: {
                id: storeId
            }
        })
        
        if(!findStore){
            throw new Error("Store not found.");
        }

        // Verificando se o ownerId da loja corresponde ao ownerId que está tentando deletar
        if (findStore.ownerId !== ownerId) {
            throw new Error("You are not authorized to delete this store.");
        }

        // Deletando a loja
        await prismaClient.store.delete({
            where: {    
                id: findStore.id
            }
        })
        
        return { message: "Store deleted successfully." }
    }
}

export { DeleteStoreService };
