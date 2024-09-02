
import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const SignUp=async(req,res)=>{
    console.log("req",req.body);
    const {username,email,password}=req.body;
    try {
        const existUser=await User.findOne({email});
        if(existUser) return res.status(200).json({error:"User already exists please signin"});
        const newPass=await bcrypt.hash(password,12);
        const newUser=await User.create({username,email,password:newPass});

        return res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        // return res.status(500).json({error:"Internal server error"});
    }
}

export const SignIn=async(req,res)=>{
    console.log("sign-in",req.body);
    const {email,password}=req.body;
    console.log("req",req.body);

    try {
        const existUser=await User.findOne({email});
        if(!existUser) return res.status(200).json({error:"User does not exists please signup"});
        const newPass=await bcrypt.compare(password,existUser.password);
        if(!newPass) return res.status(200).json({error:"incorrect password"});

        return res.status(200).json(existUser);
    } catch (error) {
        console.log(error);
        // return res.status(500).json({error:"Internal server error"});
    }
}

export const getCurrUser=async(req,res)=>{
    const {id}=req.params;
    try {
        if(!id) return;
        console.log("user",id);
        const existUser=await User.findById(id);
        return res.status(200).json(existUser);
    } catch (error) {
        console.log(error);
    }
}

export const updateUser=async(req,res)=>{
    const {id,photo,phoneNo,receipe,bio,username}=req.body;

    try {
        if(!id) return;
        console.log("update",req.body);
        const existUser=await User.findByIdAndUpdate(id,
            {
                photo,phoneNo,receipe,bio,username
            },
            {new:true}
        );
        console.log("updateUser",existUser);
        return res.status(200).json(existUser);
    } catch (error) {
        console.log(error);
    }
}

export const saveUserMeal=async(req,res)=>{
    const {userId,mealId}=req.body;

    try {
        const existUser=await User.findById(userId);

        if (existUser.allMeals.includes(mealId)) {
            existUser.allMeals = existUser.allMeals.filter((id) => JSON.stringify(id) !==JSON.stringify(mealId));
        } else {
            existUser.allMeals.push(mealId);
        }
        await existUser.save();
        console.log("save",existUser);
        return res.status(200).json(existUser);
    } catch (error) {
        console.log(error);
    }
}

export const saveUserDrink=async(req,res)=>{
    const {userId,drinkId}=req.body;

    try {
        const existUser=await User.findById(userId);

        if (existUser.allDrinks.includes(drinkId)) {
            existUser.allDrinks = existUser.allDrinks.filter((id) => JSON.stringify(id) !==JSON.stringify(drinkId));
        } else {
            existUser.allDrinks.push(drinkId);
        }
        await existUser.save();
        console.log("save",existUser);
        return res.status(200).json(existUser);
    } catch (error) {
        console.log(error);
    }
}
