import mongoose, { Schema } from "mongoose";

const MessagesSchema = mongoose.Schema({
  ticketMessage: { type: String, require: true },
  ticketID: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "tickets",
  },
  isSender: { type: Boolean, default: true },
  createAt: { type: Date, default: Date.now() },
});

MessagesSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

MessagesSchema.set("toJSON", {
  virtual: true,
});

export const MessagesModel = mongoose.model("messages", MessagesSchema);
