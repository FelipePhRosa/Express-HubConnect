import prismaClient from "../../src/prisma";

export class ListProductService{
    async execute(){
        try{
            const products = await prismaClient.product.findMany()
            return products;
        } 
        catch (error)
        {
            console.error("Error Fetching Products: ", error)
            throw new Error("Error listing products")   
        }
    }
}