const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Model for users to be stored in database
const users = new Schema(
  {
    user_name: { type: String },
    visit: { type: String },
    status: {type: String},
    password: { type: String },
    phone: {type: String},
    email: { type: String },
    subscriptions: [{_id: Schema.Types.ObjectId, subscription:{type:String},start:{type:Date},renewal:{type:Number} }],

  },
  { timestamps: true }
);

module.exports = mongoose.model("Auths", users);
