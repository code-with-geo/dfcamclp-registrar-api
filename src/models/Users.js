import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
	username: { type: String, unique: true, require: true },
	password: { type: String, require: true },
	firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    middleName: { type: String },
	contactNumber: { type: String },
    departmentID:{
        type: Schema.Types.ObjectId,
		ref: "departments",
    },
	isAdmin: { type: Boolean, default: false },
});

UserSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

UserSchema.set("toJSON", {
	virtual: true,
});

export const UsersModel = mongoose.model("users", UserSchema);