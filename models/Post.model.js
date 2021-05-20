const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  codname: { type: String, required: true, trim: true }, //apelido

  body: { type: String, maxlength: 500 },
  imageUrl: { type: String },
  share: {
    image: { type: String },
    video: { type: String },
    link: { type: String },
  },
  like: { type: Number, default: 0 },
  comments: [
    {
      body: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  reshare: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Post", PostSchema);
