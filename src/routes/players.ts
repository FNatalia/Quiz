import { json, Router } from "express";
import { store } from "../store";

export const playersRouter = Router();

playersRouter.post("/", json(), (req, res) => {
    const name = req.body.name;

    const player = {
        id: store.nextPlayerId++,
        name: name,
        score: 0,
        answered: []
    };
    store.players.push(player);
    res.status(201).json(player);
});

playersRouter.get("/", (_req, res) => {
    res.json(store.players);
});

playersRouter.get("/leaderboard", json(), (_req, res) => {
    const limit = parseInt(_req.query.limit as string) || 10;
    const sortedPlayers = [...store.players].sort((a, b) => b.score - a.score);
    res.json(sortedPlayers);
});

playersRouter.get("/:id", (req, res) => {
    const playerId = parseInt(req.params.id, 10);
    const player = store.players.find(p => p.id === playerId);

    if(typeof playerId !== "number" || isNaN(playerId)) {
        return res.status(400).json({ error: "Invalid player ID" });
    }

    if (!player) {
        return res.status(404).json({ error: "Player not found" });
    }
    res.status(200).json(player);

});
