import { PrismaClient } from "@prisma/client"

const createUsers = async (prisma: PrismaClient) => {
    try {
        const result = await prisma.user.createMany({
            data: [
                // User 1
                {
                    id: 0,
                    username: 'Hingle McCringleberry',
                    email: 'HKringle7@gmail.com'
                },
                // User 2
                {
                    id: 1,
                    username: 'Isaih T. Billings-Clyde',
                    email: 'BigBillings99@yahoo.com'
                },
            ],
        })

        return Promise.resolve({ name: "users", data: result })
    } catch (error) {
        return Promise.reject(error)
    }
}

export default createUsers