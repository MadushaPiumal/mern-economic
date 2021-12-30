import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/login", authUser);
router.route("/").post(registerUser).get(getUsers);
router.route("/profile").get(protect, getUserProfile);
router.route("/:id").delete(deleteUser).get(getUserProfile).put(updateUserProfile);

export default router;

