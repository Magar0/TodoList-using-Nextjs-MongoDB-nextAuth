const mongoose = require("mongoose");
const { title } = require("process");

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.models.todos || mongoose.model("todos", todoSchema);
module.exports = Todo;
