//import mongoose
const mongoose = require('mongoose');

//create schema defination using maping notation+
//define what the data looks like
const chatSchemaDefination = {
    sender: {type: String, required: true},
    receiver: {type: String, required: true},
    chatDescription: {type: String, required: true},
    createDate: {type: Date, required: true}
};

//create mangoose schema using the defination object
const chatSchema = new mongoose.Schema(chatSchemaDefination);
//create monggose model using the mongoose schema
module.exports = mongoose.model('Chat', chatSchema);