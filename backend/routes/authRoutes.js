import express from "express";
import {
  authUser,
  deleteUser,
  getAllUserData,
  getuserProfile,
  registerNewUser,
  updateUserProfile,
} from "../controllers/authControllers.js";
import authMiddleware, { adminUser } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(registerNewUser)
  .get(authMiddleware, adminUser, getAllUserData);

router.route("/:id").delete(authMiddleware, adminUser, deleteUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(authMiddleware, getuserProfile)
  .put(authMiddleware, updateUserProfile);

export default router;
