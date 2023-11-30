const mongoose = require('mongoose');
const bcrypt=require('bcrypt'); 
const Schema=mongoose.Schema;

const userSchema=new Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    hash_password:{
        type:String,
    },
    created:{
        type:Date,
        default:Date.now()
    }
});

// userSchema.methods.compare=(password) => {
//     return bcrypt.compareSync(password,this.hash_password);
// };

const userModel=mongoose.model('jwt_user',userSchema);

module.exports=userModel;
