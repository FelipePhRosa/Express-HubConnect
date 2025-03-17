import prismaClient from "../../src/prisma";

interface CreateUserProps{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: CreateUserProps){
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {email}
        })

        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        if(!name || !email || !password){
            throw new Error("Information Incomplete.")
        }	

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password,
            }
        })

        return user
    }
}

export { CreateUserService}