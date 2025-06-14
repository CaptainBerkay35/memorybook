import express from "express";
import {signin,signup, googleSignIn} from '../controllers/users.js'


const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.post("/google", googleSignIn);


export default router;