const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name:{
        type:String,

    },
    last_name:{
        type:String,
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    registration_number:{
        type:String,
        default:"Enter  your Registration Number"
        
    },
    full_name:{
        type:String,
        default:"Enter Your Full Name"

    },
    name_with_initials:{
        type:String,
        default: "Enter Your Name with Initials"

    },
    gender:{
        type:String,
        default:"Enter your Gender"

    },
    batch:{
        type:String,
        default: "Batch not assigned yet!"

    },
    specialization:{
        type:String,
        default: "Select a Specialization"

    },
    profile:{
        type:String,
        default: "Add Profile Picture Here"

    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports= User = mongoose.model('user',UserSchema);