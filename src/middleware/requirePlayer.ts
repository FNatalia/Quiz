import type { RequestHandler } from 'express';
import { store } from '../store';

export const requirePlayer: RequestHandler = (req, res, next) => {
    const header = req.get("X-Player-Id")?.trim();
    const playerId = Number(header);

    if (!header || !Number.isFinite(playerId)) {
        res.status(401).json({ error: "X-Player-Id must contain a number" });
        return;
    }

    const player = store.players.find((item) => item.id === playerId);

    if (!player) {
        res.status(404).json({ error: "Player not found" });
        return;
    }

    res.locals.player = player;
    next();
};
