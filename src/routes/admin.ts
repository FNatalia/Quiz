import { Router } from "express";
import { adminAuth } from "../middleware/adminAuth";
import { store } from "../store";

export const adminRouter = Router();

adminRouter.use(adminAuth);

adminRouter.post("/reset", (_req, res) => {
  for (const player of store.players) {
    player.score = 0;
    player.answered = [];
  }
  res.status(204).end();
});
