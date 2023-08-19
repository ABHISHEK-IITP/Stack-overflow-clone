import mongoose from "mongoose";

const userschema = mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    about: {type: String},
    tags: {type: [String]},
    subscription: {type: String, default: "free"},
    subsExpire: {type: Number, default: 0},
    lastQuestionDate: { type: Number },
    todayQuestionCount: { type: Number, default: 0 },
    joinedOn: {type: Date, default:Date.now},

});

export default mongoose.model("User",userschema)