import mongoose from "mongoose";

export const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    validate(val) {
      if (val.split(" ").length !== 2) {
        throw new Error("you must insert first and last name");
      }
    },
  },
  passportId: {
    type: String,
    require: true,
    unique: true,
    minLength: 9,
    maxLength: 9,
  },
  cash: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
