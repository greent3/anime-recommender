import { filmType } from "@prisma/client";

export type RowParsedFromCSV = {
  id: number;
  title: string;
  japaneseTitle: string | null;
  rating: string | null;
  bio: string | null;
  score: string | null;
  type: "tv" | "movie" | "ova" | "ona" | "special";
  episodes: string | null;
  startDate: string | null;
  endDate: string | null;
  imgPath: string | null;
  trailerUrl: string | null;
  categoryIds: idObj[] | null;
};

export type CreateSeriesInput = {
  id: number;
  title: string;
  japaneseTitle: string | null;
  rating: string | null;
  bio: string | null;
  score: number | null;
  type: filmType;
  episodes: number | null;
  startDate: string | null;
  endDate: string | null;
  imgPath: string | null;
  trailerUrl: string | null;
  categoryIds: idObj[] | null;
};

export type idObj = {
  id: number;
};

export type TypeToFilmTypeMap = Map<
  "tv" | "movie" | "ova" | "ona" | "special",
  filmType
>;
