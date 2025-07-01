import express from "express";
import {signin,signup, googleSignIn,getUserById,updateUserProfile} from '../controllers/users.js'


const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.post("/google", googleSignIn);

router.get("/:id", getUserById);

router.patch("/update-profile/:id", updateUserProfile);


export default router;