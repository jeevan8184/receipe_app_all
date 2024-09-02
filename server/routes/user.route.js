
import express from 'express';
import { getCurrUser, saveUserDrink, saveUserMeal, SignIn, SignUp, updateUser } from '../actions/user.actions.js';

const router=express.Router();

router.post("/signin",SignIn);
router.post("/signup",SignUp);
router.post("/update",updateUser);
router.post("/meal",saveUserMeal);
router.post("/drink",saveUserDrink);
router.get("/:id",getCurrUser);

export default router;
