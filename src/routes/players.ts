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