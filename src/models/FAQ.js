import mongoose from "mongoose";

const FAQSchema = mongoose.Schema({
  faqQuestion: { type: String, unique: true, require: true },
  faqAnswer: { type: String, require: true },
  createAt: { type: Date, default: Date.now() },
});

FAQSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

FAQSchema.set("toJSON", {
  virtual: true,
});

export const FAQModel = mongoose.model("faq", FAQSchema);
