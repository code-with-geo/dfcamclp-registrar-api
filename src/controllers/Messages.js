import { MessagesModel } from "../models/Messages.js";
import dotenv from "dotenv";
dotenv.config();

export const getAllMessageByTicketID = async (req, res) => {
  try {
    const { ticketID } = req.body;

    if (!ticketID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Ticket not found.",
      });
    }

    const messages = await MessagesModel.find({ ticketID });

    res.json({
      responsecode: "200",
      messages: messages,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { ticketID, ticketMessage, sender } = req.body;
    if (!ticketID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Ticket not found.",
      });
    }

    let messages = await MessagesModel.find({ ticketID });

    if (!messages) {
      return res.send({
        responsecode: "402",
        message: "Ticket not found.",
      });
    }

    messages = await new MessagesModel({
      ticketID,
      ticketMessage,
      isSender: sender,
    }).save();

    res.json({
      responsecode: "200",
      message: "Successfully saved.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};
