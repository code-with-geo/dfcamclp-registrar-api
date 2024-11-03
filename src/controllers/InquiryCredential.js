import { InquiryCredentialModel } from "../models/InquiryCredential.js";
import dotenv from "dotenv";
dotenv.config();

export const addInquiryCredential = async (req, res) => {
  try {
    const { name, requirements, departmentID } = req.body;

    let inquiryCredential = await InquiryCredentialModel.findOne({
      inquiryCredentialName: name,
    });
    if (inquiryCredential) {
      return res.json({
        responsecode: "402",
        message: "Inquiry credential is already added.",
      });
    }

    inquiryCredential = await new InquiryCredentialModel({
      inquiryCredentialName: name,
      inquiryCredentialRequirements: requirements,
      departmentID,
    }).save();

    return res.json({
      responsecode: "200",
      message: "Inquiry credential successfully added.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const updateInquiryCredential = async (req, res) => {
  try {
    const { inquiryCredentialID, name, requirements } = req.body;

    if (!inquiryCredentialID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Inquiry credential not found.",
      });
    }

    let inquiryCredential = await InquiryCredentialModel.findOne({
      _id: inquiryCredentialID,
    });

    if (!inquiryCredential) {
      return res.json({
        responsecode: "402",
        message: "Inquiry credential not found.",
      });
    }

    await InquiryCredentialModel.updateOne(
      { _id: inquiryCredentialID },
      {
        $set: {
          inquiryCredentialName: name,
          inquiryCredentialRequirements: requirements,
        },
      }
    );

    return res.json({
      responsecode: "200",
      message: "Inquiry credential is successfully updated.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const removeInquiryCredential = async (req, res) => {
  try {
    const { inquiryCredentialID } = req.body;

    if (!inquiryCredentialID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Inquiry credential not found.",
      });
    }

    let inquiryCredential = await InquiryCredentialModel.findOne({
      _id: inquiryCredentialID,
    });

    if (!inquiryCredential) {
      return res.json({
        responsecode: "402",
        message: "Inquiry credential not found.",
      });
    }

    await InquiryCredentialModel.deleteOne({ _id: inquiryCredentialID });

    return res.json({
      responsecode: "200",
      message: "Inquiry credential is successfully removed.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getAllInquiryCredential = async (req, res) => {
  try {
    const inquiryCredential = await InquiryCredentialModel.find({});

    res.json({
      responsecode: "200",
      inquiryCredential: inquiryCredential,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getInquiryCredentialByID = async (req, res) => {
  try {
    const { inquiryCredentialID } = req.body;

    if (!inquiryCredentialID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Inquiry credential not found.",
      });
    }

    const inquiryCredential = await InquiryCredentialModel.findOne({
      _id: inquiryCredentialID,
    });

    res.json({
      responsecode: "200",
      inquiryCredential: inquiryCredential,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getInquiryCredentialByDepartment = async (req, res) => {
  try {
    const { departmentID } = req.body;

    if (!departmentID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Inquiry credential not found.",
      });
    }

    const inquiryCredential = await InquiryCredentialModel.find({
      departmentID,
    });

    res.json({
      responsecode: "200",
      inquiryCredential: inquiryCredential,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};
