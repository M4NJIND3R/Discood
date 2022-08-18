var express = require('express');
var router = express.Router();
var User = require('../model/User');
var Chat = require('../model/Chat');


//GET: /discood  (home page of the discord)
router.get('/', (req, res, next)=>{
     User.find({}, (err, friends)=>  {
        if(err) console.log(err);
        else{
            res.render('dd/index.hbs', {title: 'dicood', friends: friends, user: req.user});
        }
     }).sort({username: 1});
});

//GET: /discood/:friendName
router.get('/:friendName', (req, res, next)=>{
    if(req.params.friendName != req.user.username){
        Chat.find({
            $or: [
                {sender: req.user.username, receiver: req.params.friendName},
                {sender: req.params.friendName, receiver: req.user.username}
            ]
        }, (err, chats)=>  {
            if(err) console.log(err);
            if(chats.length == 0){
                console.log("was here in !chats");
                Chat.create({
                    sender: req.user.username,
                    receiver: req.params.friendName,
                    chatDescription: "Hello! It my first time chatting with you!",
                    createDate: Date.now()
                }, 
                (err, newChat)=>{
                    if(err) console.log(err);
                    else{
                        res.redirect('/discood/'+req.params.friendName);
                    }
                })
            }
            else{
                res.render('dd/mainChat', {title: 'Main Chat', chats: chats, user: req.user});
            }
         }).sort({createDate: 1});
    }else{
        res.render('dd/chatSplash', {title: 'chat Splash'});
    }
});

//POST: /discood/:friendName
router.post('/:friendName', (req, res, next)=>{
    Chat.create({
        sender: req.user.username,
        receiver: req.params.friendName,
        chatDescription: req.body.chatDescription,
        createDate: Date.now()
    }, 
    (err, newChat)=>{
        if(err) console.log(err);
        else{
            res.redirect('/discood/'+newChat.receiver);
        }
    })
});


//GET: /discood/settings
router.get(('/settings'), (req, res, next)=>{
    res.render('dd/settings', {title: 'Settings', user: req.user})
});

//POST /discodd/settings

module.exports = router;