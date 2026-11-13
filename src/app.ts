import { errorHandler, notFound } from "./middleware/errors";

import { adminRouter } from "./routes/admin";
import express from "express";
import { gameRouter } from "./routes/game";
import { playersRouter } from "./routes/players";
import { questionsRouter } from "./routes/questions";
import { requestLogger } from "./middleware/requestLogger";
import { statsRouter } from "./routes/stats";

export const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/questions", questionsRouter);
app.use("/players", playersRouter);
app.use("/game", gameRouter);
app.use("/stats", statsRouter);
app.use("/admin", adminRouter);

app.use(notFound);
app.use(errorHandler);
