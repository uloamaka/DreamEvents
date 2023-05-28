const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: false,
    validate: {
      validator: function (v) {
        // Use a regular expression to validate email format
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Use a regular expression to validate phone number format
        return /^\d{11}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  eventType: {
    type: String,
    required: true,
    enum: ["wedding", "birthday", "corporate", "other"],
  },
  requestedDate: {
    type: Date,
    required: true,
  },
  estimatedGuestCount: {
    type: Number,
    required: true,
    min: 1,
    max: 1000000,
  },
  additionalNote: {
    type: String,
    maxlength: 1000,
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
