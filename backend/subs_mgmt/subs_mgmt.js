const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const accountSid = "AC97c5362537e8030f89db1853d5e62415";
const authToken = "88cac80584dd0b65acb4ed119dab0ca1";
const client = require('twilio')(accountSid, authToken);

const users = require("../models/user_model.js");



exports.getSubs = async (req, res) => {
  var email = req.params.email;
 users.findOne({ email: req.params.email }).then(
    function (usr) {
      if (usr === null) {
          console.log("here");
        res.status(404).send("User not found!");
      } else {
         res.status(200).send(usr);
      }
    },
    function (err) {
    console.log(err);
      res.status.send(err);
    }
  )
  .catch((err) => {
        res.status(404).send("Error getting subscription list");
      });
};

exports.addSubs = async (req, res) => {
const date = new Date(req.body.start);
obj={subscription:req.body.subscription , start:date , renewal:req.body.renewal };
users.findOneAndUpdate(
        { email: req.body.email },
        { $push: { subscriptions: obj}},
        { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send("Cannot add subscription . Maybe user was not found!");
        } else {
        	
            var str='Deadline for '+obj.subscription+' subscription has approached!';
          
              client.messages
              .create({
                 body: 'Deadline approaching',
                 from: '+19106598964',
                 to: '+917595825944'
               })
              .then(message => console.log(message.sid))
              .catch(error=>console.log(error));
              
            
          res.status(201).send(data);
        }
      })
      .catch((err) => {
        res.status(404).send("Error adding subscription");
      });
};



exports.changeSubs = async(req,res) => {
const oldstart = new Date(req.body.oldstart);
const newstart = new Date(req.body.newstart);
objold={subscription: req.body.oldsubscription , start:oldstart , renewal:req.body.oldrenewal };
objnew={subscription: req.body.newsubscription , start:newstart , renewal:req.body.newrenewal };
	users.findOneAndUpdate(
        { email: req.body.email , subscriptions: objold },
        { $set: { "subscriptions.$" : objnew } },
        { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send("Cannot delete subscription ! User not found");
        } else {
          res.status(201).send(data);
        }
      })
      .catch((err) => {
        res.status(404).send("Error deleting subscription");
      });

};


exports.deleteSubs = async (req,res) => {
const date = new Date(req.body.start);
obj={subscription:req.body.subscription , start:date , renewal:req.body.renewal };
	users.findOneAndUpdate(
        { email: req.body.email },
        { $pull: { subscriptions: obj } },
        { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send("Cannot delete subscription ! User not found");
        } else {
          res.status(201).send(data);
        }
      })
      .catch((err) => {
        res.status(404).send("Error deleting subscription");
      });
};



