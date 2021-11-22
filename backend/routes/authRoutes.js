import express from "express";
import {
  authUser,
  getuserProfile,
  registerNewUser,
} from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerNewUser);
router.post("/login", authUser);
router.route("/profile").get(authMiddleware, getuserProfile);

export default router;
