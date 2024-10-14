import mongoose, { Schema } from "mongoose";

const TicketSchema = mongoose.Schema({
  ticketFirstName: { type: String, require: true },
  ticketLastName: { type: String, require: true },
  ticketContactNumber: { type: String, require: true },
  ticketStudentEmail: { type: String, require: true },
  departmentID: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "departments",
  },
  inquiryCredentialID: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "inquirycredential",
  },
  ticketMessage: { type: String, require: true },
  ticketStatus: { type: String, default: "New" },
  createAt: { type: Date, default: Date.now() },
});

TicketSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

TicketSchema.set("toJSON", {
  virtual: true,
});

export const TicketModel = mongoose.model("ticket", TicketSchema);
