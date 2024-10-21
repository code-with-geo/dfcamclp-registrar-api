import { UsersModel } from "../models/Users.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const addUsers = async (req, res) => {
  try {
    const {
      username,
      password,
      firstName,
      lastName,
      middleName,
      contactNumber,
      departmentID,
    } = req.body;

    let user = await UsersModel.findOne({ username });

    if (user) {
      return res.json({
        responsecode: "402",
        message: "Username already taken. Please try other username.",
      });
    }

    user = await new UsersModel({
      username,
      password,
      firstName,
      lastName,
      middleName,
      contactNumber,
      departmentID,
    }).save();

    return res.json({
      responsecode: "200",
      message: "User successfully added.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const {
      userID,
      username,
      password,
      firstName,
      lastName,
      middleName,
      contactNumber,
      departmentID,
    } = req.body;

    let user = await UsersModel.findOne({ _id: userID });

    if (!user) {
      return res.json({
        responsecode: "402",
        message: "User not found.",
      });
    }

    await UsersModel.updateOne(
      { _id: userID },
      {
        $set: {
          username,
          password,
          firstName,
          lastName,
          middleName,
          contactNumber,
        },
      }
    );

    return res.json({
      responsecode: "200",
      message: "User is successfully updated.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { userID } = req.body;

    if (!userID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "User not found.",
      });
    }

    let user = await UsersModel.findOne({ _id: userID });

    if (!user) {
      return res.json({
        responsecode: "402",
        message: "User not found.",
      });
    }

    await UsersModel.deleteOne({ _id: userID });

    return res.json({
      responsecode: "200",
      message: "User is successfully removed.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await UsersModel.findOne({ username });

    if (!user) {
      return res.json({
        message: "This user is not registered.",
        responsecode: "402",
      });
    }

    user = await UsersModel.findOne({ username, password });

    if (!user) {
      return res.json({
        message: "Incorrect email or password. Please try again.",
        responsecode: "402",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.json({
      responsecode: "200",
      message: "Successfully Login!",
      token,
      userID: user._id,
      department: user.departmentID,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const { departmentID } = req.body;
    if (!departmentID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Department not found.",
      });
    }
    const user = await UsersModel.find({ departmentID });

    res.json({
      responsecode: "200",
      user: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const { userID } = req.body;
    if (!userID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "User not found.",
      });
    }
    const user = await UsersModel.findOne({ _id: userID });

    res.json({
      responsecode: "200",
      user: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};
