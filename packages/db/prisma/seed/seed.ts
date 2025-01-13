import { prisma, filmType } from "../../";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import { fileURLToPath } from "url";
import { parseCategories } from "./utils/parseCategories";
import { CreateSeriesInput, RowParsedFromCSV } from "./types/types";
import { columnHeaders, filmTypeMap, approvedCategories } from "./constants";
import { parseVideoId } from "./utils/parseVideoId";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvFilePath = path.resolve(__dirname, "./data/animes.csv");

async function main() {
  // create categories in db
  const catObjArr = approvedCategories.map((cat) => {
    return { title: cat };
  });
  await prisma.category.createMany({
    data: catObjArr,
  });
  const allCategoriesInDb = await prisma.category.findMany();
  const categoryToCategoryIdMap = new Map<string, number>();
  allCategoriesInDb.forEach((category) => {
    categoryToCategoryIdMap.set(category.title, category.id);
  });

  // parse csv of anime data
  let arrayOfRowsToAddToDb: Array<CreateSeriesInput> = [];
  let fileParser: unknown;
  const fileContents = await fs.promises.readFile(csvFilePath, "utf-8");
  fileParser = await new Promise((resolve, reject) => {
    parse(
      fileContents,
      { delimiter: ",", trim: true, columns: columnHeaders, from_line: 2 },
      function (err, rows: Array<RowParsedFromCSV>) {
        if (err) {
          reject(err);
        }
        rows.map((row: RowParsedFromCSV) => {
          let rowToAddToDb: CreateSeriesInput = {
            ...row,
            type: filmTypeMap.get(row.type) || filmType.TV,
            score: row.score ? parseFloat(row.score) : null,
            episodes: row.episodes ? parseInt(row.episodes) : null,
          };

          // combine themes and categories into a single list
          const combindedCategories = [
            ...parseCategories(row["themes"]),
            ...parseCategories(row["categories"]),
          ];

          // create one to many relation between this row's anime and it's categories
          let arrayOfCategoryIdsForThisRow: number[] = [];
          combindedCategories.map((currentCategory: string) => {
            let idForCurrentCategory =
              categoryToCategoryIdMap.get(currentCategory);
            if (idForCurrentCategory) {
              arrayOfCategoryIdsForThisRow.push(idForCurrentCategory);
            }
          });
          rowToAddToDb.categoryIds = arrayOfCategoryIdsForThisRow.map(
            (catId: number) => {
              return { id: catId };
            },
          );
          arrayOfRowsToAddToDb.push(rowToAddToDb);
        });
        resolve(fileParser);
      },
    );
  });

  // seed cleaned rows into db
  // arrayOfRowsToAddToDb.map(async (record: CreateSeriesInput) => {
  // await prisma.series.create({
  //   data: {
  //     title: record.title || record.japaneseTitle || "",
  //     japaneseTitle: record.japaneseTitle,
  //     type: record.type,
  //     score: record.score,
  //     episodes: record.episodes,
  //     startDate: record.startDate,
  //     endDate: record.endDate,
  //     rating: record.rating,
  //     bio: record.bio,
  //     categories: {
  //       connect: record.categoryIds || [],
  //     },
  //     imgPath: record.imgPath,
  //     trailerUrl: record.trailerUrl ? parseVideoId(record.trailerUrl) : null,
  //   },
  // });
  for (const record of arrayOfRowsToAddToDb) {
    await prisma.series.create({
      data: {
        title: record.title || record.japaneseTitle || "",
        japaneseTitle: record.japaneseTitle,
        type: record.type,
        score: record.score,
        episodes: record.episodes,
        startDate: record.startDate,
        endDate: record.endDate,
        rating: record.rating,
        bio: record.bio,
        categories: {
          connect: record.categoryIds || [],
        },
        imgPath: record.imgPath,
        trailerUrl: record.trailerUrl ? parseVideoId(record.trailerUrl) : null,
      },
    });
  }
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
