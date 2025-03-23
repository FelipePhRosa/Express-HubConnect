import prismaClient from "../../src/prisma";

interface CreateProductProps{
    name: string;
    price: number;
    description?: string;
    storeId: string;
}

class CreateProductService{
    async execute({name, price, description, storeId}: CreateProductProps){
        const store = await prismaClient.store.findFirst({
            where: {id: storeId}
        })

        if(!store){
            throw new Error("Store not found!")
        }

        if(!name || !price){
            throw new Error("Information Incomplete.")
        }

        const product = await prismaClient.product.create({
            data:{
                name,
                price,
                description,
                storeId
            }
        })

        return product;
    }
}

export { CreateProductService }