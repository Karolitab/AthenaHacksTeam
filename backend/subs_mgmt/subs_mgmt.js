const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const users = require("../models/user_model.js");

//searching a user in database based on email and adding roomId to the list of rooms he has ever joined
exports.getSubs = async (req, res) => {
  await users
    .findOneAndUpdate(
      { email: req.body.email },
      { $push: { rooms: req.body.room } },
      { useFindAndModify: false }
    )
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send("Cannot update status . Maybe user was not found!");
      } else {
        //console.log(data);
        res.status(201).send("Room id added to user's room-list");
      }
    })
    .catch((err) => {
      res.status(404).send("Error updating room list");
    });
};

/*searching for a chat thread according to roomId
 * and pushing a message to the chat room thread along with the username and email of person sending the message.
 * If chat room doesn't exist in database. create thread with empty arrays.
 */
// getting all chat threads user has engaged in
exports.getSubs = async (req, res) => {
  var email = req.params.email;
 users.findOne({ user_name: user }).then(
    function (usr) {
      if (usr === null) {
        res.status(404).end("User not found!");
      } else {
         res.status(200).send(usr);
      }
    },
    function (err) {
      res.status.send(err);
    }
  );
};

//creating a room with the url given from frontend, using the daily api

exports.getRoom = async (req, res) => {
  const exp = Math.round(Date.now() / 1000) + 10 * 30;
  const newRoomEndpoint = "https://api.daily.co/v1/rooms";
  const options = {
    properties: {
      exp: exp,
    },
  };
  const headers = {
    Authorization: `${process.env.DAILY_API_KEY}`,
  };
  let response = await fetch(newRoomEndpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.DAILY_API_KEY}` },
      body: JSON.stringify(options),
      mode: "cors",
    }),
    room = await response.json();

  return res.status(200).send(room);
};
