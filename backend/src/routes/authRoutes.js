import express from 'express';
import { dashboardOverview, googleLogin, loginUser, signupUser } from '../controllers/authController.js';
import {isAuth} from '../middleware/isAuth.js';

const router=express.Router();


router.get('/google_login',googleLogin);


router.post('/login',loginUser);
router.post('/signup',signupUser);


router.get('/dashboard_overview',isAuth,dashboardOverview);


export default router;