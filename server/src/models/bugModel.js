import mongoose from "mongoose";

const bugSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Bug title is required"],
    },
    description: {
      type: String,
      required: [true, "Bug description is required"],
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved"], // ✅ all lowercase
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
  },
  { timestamps: true }
);

const Bug = mongoose.model("Bug", bugSchema);
export default Bug;
