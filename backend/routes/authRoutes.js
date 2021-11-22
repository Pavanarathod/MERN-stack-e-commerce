import express from "express";
import {
  authUser,
  getuserProfile,
  registerNewUser,
  updateUserProfile,
} from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerNewUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(authMiddleware, getuserProfile)
  .put(authMiddleware, updateUserProfile);

export default router;
