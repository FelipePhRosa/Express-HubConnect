import prismaClient from "../../src/prisma";

interface DeleteUserProps{
    id: string;
}

class DeleteUserService{
    async execute({ id }: DeleteUserProps){

        if(!id){
            throw new Error("Invalid Request.")
        }

        const findUser = await prismaClient.user.findFirst({
            where:{
                id: id
            }
        })

        if(!findUser){
            throw new Error("User not found.")
        }

        await prismaClient.user.delete({
            where:{
                id: findUser.id
            }
        })

        return {message: "User deleted successfully."}

    }
}

export { DeleteUserService }