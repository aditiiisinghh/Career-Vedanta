import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','recruiter'], //when two optiosn then we use enum
        required:true
    },
    profile:{
        bio:{type:String},//required true isliye ni rkha h kyoki bio baadme add krte h after file create
        skills:[{type:String}],
      resume: {
   public_id: { type: String },
   url: { type: String },
   original_filename: { type: String }
},

        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
        profilePhoto:{
            type:String,
        default:""
        }
    },
    savedJobs: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
],

},{timestamps:true});
export const User = mongoose.model('User', userSchema);