import { Router } from "express";
import { HttpError } from "../httpErrot";
import { store, toPublic } from "../store";
import { Question } from "../types";

export const questionsRouter = Router();

questionsRouter.post("/", (req, res, next) => {
  const { text, options, correctIndex } = req.body ?? {};
  const details: string[] = [];

  if (typeof text !== "string" || text.trim().length < 5) {
    details.push("text must be a string of at least 5 characters after trim");
  }

  if (
    !Array.isArray(options) ||
    options.length < 2 ||
    options.length > 4 ||
    !options.every((option) => typeof option === "string" && option.trim() !== "")
  ) {
    details.push("options must be an array of 2 to 4 non-empty strings");
  }

  if (
    !Number.isInteger(correctIndex) ||
    !Array.isArray(options) ||
    correctIndex < 0 ||
    correctIndex > options.length - 1
  ) {
    details.push("correctIndex must be an integer within the options range");
  }

  if (details.length > 0) {
    next(new HttpError(400, "Validation failed", details));
    return;
  }

  const question: Question = {
    id: store.nextQuestionId++,
    text,
    options,
    correctIndex,
  };
  store.questions.push(question);

  res.status(201).json(toPublic(question));
});

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
