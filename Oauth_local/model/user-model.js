const mongoose = require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{type:String, required:true},
    email:{type:String, required:true}
});

userSchema.plugin(passportLocalMongoose);

const User=mongoose.model('local_user',userSchema);
module.exports = User;

