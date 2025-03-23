import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class createProductService{
    async createProduct(name: string, description: string, price: number, ownerId: string, storeId: string ){
        const owner = await prisma.user.findUnique({ where: { id: ownerId }});
        if(!owner){
            throw new Error("User not found!");
        }
        
        const store = await prisma.store.findUnique({ where: { id: storeId }});
        if(!store){
            throw new Error("Store not found!");
        }

        if (store.ownerId !== ownerId) {
            throw new Error("You are not the owner of this store!");
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                storeId
            }
        });

        return product;
    }
}