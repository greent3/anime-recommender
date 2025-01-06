import { router } from "../trpc";
import { seriesRouter } from "./series";
import { reviewRouter } from "./review";
import { userRouter } from "./user";

export const appRouter = router({
  series: seriesRouter,
  review: reviewRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
