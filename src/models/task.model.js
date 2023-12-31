import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    estado:{
      type:String,
      required:true,
    },
    responsable:{
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    prioridad: {
      type: String,
      required:true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);