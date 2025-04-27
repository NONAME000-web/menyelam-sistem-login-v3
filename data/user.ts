import { Database } from "@/lib/db";

export const getUserById = async(id: string | undefined) => {
    try {
        const user = await Database.user.findUnique({
            where: { id }
        })
        return user;
    } catch (error) {
        return null;
    }
}