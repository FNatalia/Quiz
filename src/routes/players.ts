import { json, Router } from "express";
import { store } from "../store";

export const playersRouter = Router();

playersRouter.post("/", json(), (req, res) => {
    const name = req.body.name.trim();
    if (name.length < 2 || name.length > 20) {
        return res.status(400).json({ error: "Player name must be between 2 and 20 characters long." });
    }
    if (store.players.some(player => player.name === name)) {
        return res.status(409).json({ error: "Player name must be unique." });
    }
    const player = {
        id: store.nextPlayerId++,
        name: name,
        score: 0,
        answered: []
    };
    store.players.push(player);
    res.status(201).json(player);
});