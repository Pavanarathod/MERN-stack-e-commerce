import express from "express";
import { authUser, getuserProfile } from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(authMiddleware, getuserProfile);

export default router;