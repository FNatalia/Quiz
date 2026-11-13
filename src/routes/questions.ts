import { Router } from "express";
import { HttpError } from "../httpErrot";
import { store } from "../store";

export const questionsRouter = Router();

questionsRouter.delete("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const index = store.questions.findIndex((question) => question.id === id);

  if (index === -1) {
    next(new HttpError(404, "Question not found"));
    return;
  }

  store.questions.splice(index, 1);
  res.status(204).end();
});
