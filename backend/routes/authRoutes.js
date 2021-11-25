import express from "express";
import {
  authUser,
  deleteUser,
  getAllUserData,
  getUserById,
  getuserProfile,
  registerNewUser,
  updateUserProfile,
  updateUser,
} from "../controllers/authControllers.js";
import authMiddleware, { adminUser } from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(registerNewUser)
  .get(authMiddleware, adminUser, getAllUserData);

router.post("/login", authUser);

router
  .route("/profile")
  .get(authMiddleware, getuserProfile)
  .put(authMiddleware, updateUserProfile);

router
  .route("/:id")
  .get(authMiddleware, adminUser, getUserById)
  .put(authMiddleware, adminUser, updateUser)
  .delete(authMiddleware, adminUser, deleteUser);

export default router;
