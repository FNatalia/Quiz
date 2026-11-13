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

gameRouter.post("/answer", (req, res) => {
    const { questionId, answerIndex } = req.body ?? {};

    if (!Number.isInteger(questionId) || !Number.isInteger(answerIndex)) {
        res.status(400).json({ error: "questionId and answerIndex must be integers" });
        return;
    }

    const question = store.questions.find((item) => item.id === questionId);

    if (!question) {
        res.status(404).json({ error: "Question not found" });
        return;
    }

    const player: Player = res.locals.player;

    if (player.answered.includes(questionId)) {
        res.status(409).json({ error: "Question already answered" });
        return;
    }

    player.answered.push(questionId);

    res.json({ accepted: true });
});