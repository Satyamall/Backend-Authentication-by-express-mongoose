

const mongoose  = require("mongoose");
const bcrypt = require('bcrypt');

//Schema
const UserSchema= new mongoose.Schema({
    email: {type: String, required: true,unique: true},
    password: {type: String, required: true},}
    ,
    { timestamps: true}
)

UserSchema.pre('save', function(next){
    if(!this.isModified('password')) return next();
    bcrypt.hash(this.password, 0, (err,hash)=>{
         if(err) return next(err);

         this.password = hash;
         next()
    })
})

UserSchema.method.comparePassword = function(password){

    const hashedPassword = this.password;
    return bcrypt.compare(password, hashedPassword);
}
//Models
const User= mongoose.model("users",UserSchema);

module.exports=User;