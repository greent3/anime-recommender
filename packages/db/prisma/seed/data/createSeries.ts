import { PrismaClient } from "@prisma/client"

const createSeries = async (prisma: PrismaClient) => {
    try {
        const result = await prisma.series.createMany({
            data: [
                // User 1
                {
                    id: 0,
                    title: 'Bleach: Thousand Year Blood War',
                    bio: 'In this arc, the quincies return with....'
                },
                // User 2
                {
                    id: 1,
                    title: 'One Piece',
                    bio: 'With the power of the gumgum fruit on his side, Monkey D. Loofy and his comrades set sail for the grand...'
                },
            ],
        })

        return Promise.resolve({ name: "series", data: result })
    } catch (error) {
        return Promise.reject(error)
    }
}

export default createSeries