import { PublicQuestion, Question, Store } from "./types";

export const store: Store = {
  questions: [
    {
      id: 1,
      text: "Какой метод создаёт мини-приложение с маршрутами?",
      options: ["express.Router()", "express.static()", "express.json()"],
      correctIndex: 0,
    },
    {
      id: 2,
      text: "Что вызывают в middleware, чтобы передать управление дальше?",
      options: ["res.end()", "next()", "app.listen()"],
      correctIndex: 1,
    },
    {
      id: 3,
      text: "Сколько аргументов у обработчика ошибок в Express?",
      options: ["2", "3", "4"],
      correctIndex: 2,
    },
  ],
  players: [{ id: 1, name: "Test", score: 0, answered: [] }], // тестовый игрок для роли D
  nextQuestionId: 4,
  nextPlayerId: 2,
};

export const toPublic = ({ correctIndex, ...rest }: Question): PublicQuestion =>
  rest;
