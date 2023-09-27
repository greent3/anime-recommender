import createSeries from "./data/createSeries";
import createUsers from "./data/createUsers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const seeds = [
        createSeries,
        createUsers
    ]

    const results: { name: string; data: object }[] = []

    for (const seed of seeds) {
        const response = (await seed(prisma)) as { name: string; data: object }
        results.push(response)
    }

    results.forEach((result) => {
        console.info(`Create ${result.name}:`, result.data)
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })