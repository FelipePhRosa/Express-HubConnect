import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateProductProps{
    name: string;
    description?: string;
    price: number;
    urlImage: string;
    ownerId: string;
    storeId: string;
}

export class CreateProductService{
    async createProduct({ name, description, price, urlImage, ownerId, storeId }:CreateProductProps){
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
                urlimage: urlImage,
                storeId
            }
        });

        return product;
    }
}