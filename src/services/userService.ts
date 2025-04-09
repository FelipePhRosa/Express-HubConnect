import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connection from "../SQL/connection"

interface UserData{
    nameUser: string
    lastName: string
    email: string
    ageUser: number
    password_hash: string
    nationalityUser: string
}

export default class UserService {
    async createUser(userData: UserData) {
        return await connection('Users').insert(userData);
    }

    async getAllUsers() {
        return await connection('Users').select('*');
    }

    async getUserById(userId: number) {
        return await connection('Users').where({ id_user: userId }).select('*').first();
    }

    async deleteUser(userId: number) {
        return await connection('Users').where({ id_user: userId }).delete();
    }
    
}

