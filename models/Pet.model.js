const mongoose = require("mongoose");
const PetSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  birthDate: { type: String, required: true },
  gender: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Pet", PetSchema);
