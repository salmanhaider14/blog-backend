const { default: mongoose } = require("mongoose");

const blogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  desc: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Blog", blogsSchema);
