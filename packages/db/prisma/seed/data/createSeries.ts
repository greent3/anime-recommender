import { PrismaClient } from "@prisma/client";

const createSeries = async (prisma: PrismaClient) => {
  try {
    const result = await prisma.series.createMany({
      data: [
        {
          //   id: 0,
          title: "Bleach: Thousand Year Blood War",
          bio: "In this arc, the quincies return with....",
          type: "TV",
          episodes: 24,
          airDate: "22 Dec 2021",
          imgPath: "/bleach.jpeg",
        },
        {
          //   id: 1,
          title: "One Piece",
          bio: "With the power of the gumgum fruit on his side, Monkey D. Loofy and his comrades set sail for the grand...",
          type: "TV",
          episodes: 1119,
          airDate: "11 Apr 2001",
          imgPath: null,
        },
      ],
    });

    return Promise.resolve({ name: "series", data: result });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default createSeries;
