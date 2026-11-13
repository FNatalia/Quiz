import { Router } from "express";
import { requirePlayer } from "../middleware/requirePlayer";

export const gameRouter = Router();

gameRouter.use(requirePlayer);