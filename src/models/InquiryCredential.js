import mongoose, { Schema } from "mongoose";

const InquiryCredentialSchema = mongoose.Schema({
  inquiryCredentialName: { type: String, unique: true, require: true },
  inquiryCredentialRequirements: { type: String, require: true },
  departmentID: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "departments",
  },
  createAt: { type: Date, default: Date.now() },
});

InquiryCredentialSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

InquiryCredentialSchema.set("toJSON", {
  virtual: true,
});

export const InquiryCredentialModel = mongoose.model(
  "inquirycredential",
  InquiryCredentialSchema
);
