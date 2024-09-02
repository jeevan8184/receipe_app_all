
import mongoose, { model, Schema } from "mongoose";

const UserSchema=new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    photo:{type:String},
    phoneNo:{type:String},
    receipe:{type:String},
    bio:{type:String},
    allMeals:[{type:String}],
    allDrinks:[{type:String}]
})

const User = mongoose.models.User || model('User', UserSchema);

export default User;
