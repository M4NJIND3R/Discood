const mongo = require('mongoose');
const plm = require('passport-local-mongoose');

var userSchemaStruc = {
    dp: {type: String}, 
    userName: {type: String},
    password: {type:String},
    oauthId: {type: String},
    oauthProvider: {type: String},
    created: {type: Date}
};

var userSchema = new mongo.Schema(userSchemaStruc);

//once i have the schema obj i can expand its functionality
userSchema.plugin(plm);

module.exports = new mongo.model('User', userSchema);