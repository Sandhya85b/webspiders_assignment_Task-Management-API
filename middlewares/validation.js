const Joi = require("joi");
const inputValidationSchema = Joi.object({
  title: Joi.string.max(100).required(), // Required, max 100 characters
  description: Joi.string().allow(""), // Optional
  status: Joi.string().valid("TODO", "IN_PROGRESS", "COMPLETED"), // Enum: ['TODO', 'IN_PROGRESS', 'COMPLETED']
  priority: Joi.string().valid("LOW", "MEDIUM", "HIGH"), // Enum: ['LOW', 'MEDIUM', 'HIGH']
  dueDate: Joi.date().optional(), // Optional
});
module.exports = (req, res, next) => {
  const { error } = inputValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  next();
};
