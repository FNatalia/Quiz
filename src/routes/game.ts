import { Router } from "express";
import { requirePlayer } from "../middleware/requirePlayer";
import { store, toPublic } from "../store";
import type { Player } from "../types";

export const gameRouter = Router();

gameRouter.use(requirePlayer);

gameRouter.get("/question", (_req, res) => {
    const player: Player = res.locals.player;
    const unansweredQuestions = store.questions.filter(
        (question) => !player.answered.includes(question.id)
    );

    if (unansweredQuestions.length === 0) {
        res.status(204).end();
        return;
    }

    const index = Math.floor(Math.random() * unansweredQuestions.length);
    const question = unansweredQuestions[index];

    res.json(toPublic(question));
});