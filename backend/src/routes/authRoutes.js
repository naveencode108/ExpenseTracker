import express from 'express';
import { googleLogin, loginUser, signupUser } from '../controllers/authController.js';

const router=express.Router();


router.get('/google_login',googleLogin);


router.post('/login',loginUser);
router.post('/signup',signupUser);



export default router;