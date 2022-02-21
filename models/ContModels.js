const { model, Schema } = require("mongoose");

const ContSchema = model("Contabilidade", new Schema({
  date: {
    type: Date,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  opcode: {
    type: Boolean,
    required: true,
  },
}));

module.exports = ContSchema;