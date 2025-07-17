import express from "express";
import {signin,signup, googleSignIn,getUserById,updateUserProfile,deleteAccount,updateUserInterests,getUserInterests} from '../controllers/users.js'
import auth from "../middleware/auth.js";



const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.post("/google", googleSignIn);

router.get("/:id", getUserById);

router.patch("/update-profile/:id", updateUserProfile);

router.delete('/:id', auth, deleteAccount);

//router.put("/:id/interests", auth, updateUserInterests);
router.get("/:id/interests", auth, getUserInterests);
router.patch('/:id/interests', auth, updateUserInterests);


export default router;