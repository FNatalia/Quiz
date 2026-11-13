import { Router } from "express";
import { adminAuth } from "../middleware/adminAuth";

export const adminRouter = Router();

adminRouter.use(adminAuth);
