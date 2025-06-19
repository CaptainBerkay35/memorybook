import express from "express";
import {signin,signup, googleSignIn,getUserById} from '../controllers/users.js'


const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.post("/google", googleSignIn);

router.get("/:id", getUserById);



export default router;