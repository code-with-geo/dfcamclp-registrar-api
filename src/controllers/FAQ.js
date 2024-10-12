import { FAQModel } from "../models/FAQ.js";
import dotenv from "dotenv";
dotenv.config();

export const addFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    let faq = await FAQModel.findOne({ faqQuestion: question });
    if (faq) {
      return res.json({
        responsecode: "402",
        message: "This question is already added.",
      });
    }

    faq = await new FAQModel({
      faqQuestion: question,
      faqAnswer: answer,
    }).save();

    return res.json({
      responsecode: "200",
      message: "Frequently ask question successfully added.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const updateFAQ = async (req, res) => {
  try {
    const { faqID, question, answer } = req.body;

    if (!faqID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Frequently ask question not found.",
      });
    }

    let faq = await FAQModel.findOne({ _id: faqID });

    if (!faq) {
      return res.json({
        responsecode: "402",
        message: "Frequently ask question not found.",
      });
    }

    await FAQModel.updateOne(
      { _id: faqID },
      {
        $set: {
          faqQuestion: question,
          faqAnswer: answer,
        },
      }
    );

    return res.json({
      responsecode: "200",
      message: "Frequently ask question is successfully updated.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const removeFAQ = async (req, res) => {
  try {
    const { faqID } = req.body;

    if (!faqID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Frequently ask question not found.",
      });
    }

    let faq = await FAQModel.findOne({ _id: faqID });

    if (!faq) {
      return res.json({
        responsecode: "402",
        message: "Frequently ask question not found.",
      });
    }

    await FAQModel.deleteOne({ _id: faqID });

    return res.json({
      responsecode: "200",
      message: "Frequently ask question is successfully removed.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getAllFAQ = async (req, res) => {
  try {
    const faq = await FAQModel.find({});

    res.json({
      responsecode: "200",
      faq: faq,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getFAQByID = async (req, res) => {
  try {
    const { faqID } = req.body;

    if (!faqID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Frequently ask question not found.",
      });
    }

    const faq = await FAQModel.findOne({ _id: faqID });

    res.json({
      responsecode: "200",
      faq: faq,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};
