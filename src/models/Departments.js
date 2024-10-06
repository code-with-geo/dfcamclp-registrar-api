import mongoose from "mongoose";

const DepartmentSchema = mongoose.Schema({
	departmentName: { type: String, unique: true, require: true },
	departmentDescription: { type: String, require: true },
	createAt: { type: Date,
		default: Date.now(),}
});

DepartmentSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

DepartmentSchema.set("toJSON", {
	virtual: true,
});

export const DepartmentModel = mongoose.model("departments", DepartmentSchema);