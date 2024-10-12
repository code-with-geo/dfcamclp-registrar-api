import { DepartmentModel } from "../models/Departments.js";
import dotenv from "dotenv";
dotenv.config();

export const addDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    let department = await DepartmentModel.findOne({ departmentName: name });
    if (department) {
      return res.json({
        responsecode: "402",
        message: "This department name is already added.",
      });
    }

    department = await new DepartmentModel({
      departmentName: name,
      departmentDescription: description,
    }).save();

    return res.json({
      responsecode: "200",
      message: "Successfully added.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    const { departmentID, name, description } = req.body;

    if (!departmentID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Department not found.",
      });
    }

    let department = await DepartmentModel.findOne({ _id: departmentID });

    if (!department) {
      return res.json({
        responsecode: "402",
        message: "Frequently ask question not found.",
      });
    }

    await DepartmentModel.updateOne(
      { _id: departmentID },
      {
        $set: {
          departmentName: name,
          departmentDescription: description,
        },
      }
    );

    return res.json({
      responsecode: "200",
      message: "Department is successfully updated.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const removeDepartment = async (req, res) => {
  try {
    const { departmentID } = req.body;

    if (!departmentID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Department not found.",
      });
    }

    let department = await DepartmentModel.findOne({ _id: departmentID });

    if (!department) {
      return res.json({
        responsecode: "402",
        message: "Department not found.",
      });
    }

    await DepartmentModel.deleteOne({ _id: departmentID });

    return res.json({
      responsecode: "200",
      message: "Department is successfully removed.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getAllDepartment = async (req, res) => {
  try {
    const department = await DepartmentModel.find({});

    res.json({
      responsecode: "200",
      department: department,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getDepartmentByID = async (req, res) => {
  try {
    const { departmentID } = req.body;

    if (!departmentID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Department not found.",
      });
    }

    const department = await DepartmentModel.findOne({ _id: departmentID });

    res.json({
      responsecode: "200",
      department: department,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};
