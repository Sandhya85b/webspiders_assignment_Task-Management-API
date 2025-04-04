const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100 }, // Required, max 100 characters
    description: String, // Optional
    status: { type: String, enum: ["TODO", "IN_PROGRESS", "COMPLETED"] }, // Enum: ['TODO', 'IN_PROGRESS', 'COMPLETED']
    priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"] }, // Enum: ['LOW', 'MEDIUM', 'HIGH']
    dueDate: Date, // Optional
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tasks", taskSchema);
