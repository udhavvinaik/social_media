import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { updateUserProfile } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/User.js";
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

router.put("/:id", verifyToken, updateUserProfile);

export default router;

