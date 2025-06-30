import express from "express";
import {signin,signup, googleSignIn,getUserById,updateNickname} from '../controllers/users.js'


const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.post("/google", googleSignIn);

router.get("/:id", getUserById);

router.patch("/:id/update-nickname",  updateNickname);

export default router;