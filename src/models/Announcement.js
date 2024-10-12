import mongoose from "mongoose";

const AnnouncementSchema = mongoose.Schema({
  announcementTitle: { type: String, unique: true, require: true },
  announcementDetails: { type: String, require: true },
  createAt: { type: Date, default: Date.now() },
});

AnnouncementSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

AnnouncementSchema.set("toJSON", {
  virtual: true,
});

export const AnnouncementModel = mongoose.model(
  "announcement",
  AnnouncementSchema
);
