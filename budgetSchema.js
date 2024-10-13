const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    budget: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      require: true,
      validate: {
        validator: function (color) {
          return /^#[0-9A-Fa-f]{6}$/.test(color);
        },
        message: props => `${props.value} is not in valid hex color format.`
      }
    }
  },
  { collection: "budgetCollection" }
);

module.exports = mongoose.model("budgetCollection", budgetSchema);
