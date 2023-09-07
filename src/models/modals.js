import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: "Enter a first name.",
  },
  lastName: {
    type: String,
    required: "Enter a last name.",
  },
  email: {
    type: String,
    required: "Enter a email.",
  },
  company: {
    type: String,
    required: "Enter a company.",
  },
  phone: {
    type: Number,
    required: "Enter a phone.",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});
