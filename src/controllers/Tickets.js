import { TicketModel } from "../models/Tickets.js";
import { MessagesModel } from "../models/Messages.js";
import dotenv from "dotenv";
dotenv.config();
import EmailSender from "../helper/EmailSender.js";

const ticketID = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const addTicket = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contactNo,
      studentEmail,
      departmentID,
      inquiryCredentialID,
      message,
    } = req.body;

    let ticket = await TicketModel({
      ticketID: ticketID(8),
      ticketFirstName: firstName,
      ticketLastName: lastName,
      ticketContactNumber: contactNo,
      ticketStudentEmail: studentEmail,
      departmentID,
      inquiryCredentialID,
    }).save();

    await MessagesModel({
      ticketID: ticket._id,
      ticketMessage: message,
    }).save();

    await EmailSender(
      ticket.ticketStudentEmail,
      "Inquiry Notification",
      `Hi ${ticket.ticketFirstName} ${ticket.ticketLastName}, \n\nYour inquiry ticket is already sent. \nHere's your ticket id ${ticket.ticketID}. If you need further details or have additional questions, please feel free to reach out. We're here to ensure you have all the information you need and look forward to assisting you with any next steps. \n\nThank you & Regards, \nDFCAMCLP Management`
    );
    return res.json({
      responsecode: "200",
      message: "Inquiry ticket successfully created.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await TicketModel.find({});

    res.json({
      responsecode: "200",
      tickets: tickets,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getTicketsByID = async (req, res) => {
  try {
    const { ticketID } = req.body;

    if (!ticketID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Ticket not found.",
      });
    }

    const tickets = await TicketModel.findOne({ _id: ticketID }).populate([
      {
        path: "departmentID",
        select: "departmentName", // Only include the departmentName field
      },
      {
        path: "inquiryCredentialID",
        select: "inquiryCredentialName", // Only include the departmentName field
      },
    ]);

    res.json({
      responsecode: "200",
      tickets: tickets,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const updateTicketStatus = async (req, res) => {
  try {
    const { ticketID, status } = req.body;

    if (!ticketID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Ticket not found.",
      });
    }

    let tickets = await TicketModel.findOne({ _id: ticketID });

    if (!tickets) {
      return res.json({
        responsecode: "402",
        message: "Ticket not found.",
      });
    }

    await TicketModel.updateOne(
      { _id: ticketID },
      {
        $set: {
          ticketStatus: status,
        },
      }
    );

    return res.json({
      responsecode: "200",
      message: "Ticket is successfully updated.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const removeTicket = async (req, res) => {
  try {
    const { ticketID } = req.body;

    if (!ticketID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Ticket not found.",
      });
    }

    let ticket = await TicketModel.findOne({ _id: ticketID });

    if (!ticket) {
      return res.json({
        responsecode: "402",
        message: "Ticket not found.",
      });
    }

    await TicketModel.deleteOne({ _id: ticketID });

    return res.json({
      responsecode: "200",
      message: "Ticket is successfully removed.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getAllTicketsByDepartment = async (req, res) => {
  try {
    const { departmentID } = req.body;
    if (!departmentID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Ticket not found.",
      });
    }
    const tickets = await TicketModel.find({ departmentID });

    if (!tickets) {
      return res.json({
        responsecode: "402",
        message: "Ticket not found.",
      });
    }

    res.json({
      responsecode: "200",
      tickets: tickets,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getTicketsByTicketID = async (req, res) => {
  try {
    const { ticketID } = req.body;

    const tickets = await TicketModel.findOne({ ticketID }).populate([
      {
        path: "departmentID",
        select: "departmentName", // Only include the departmentName field
      },
      {
        path: "inquiryCredentialID",
        select: "inquiryCredentialName", // Only include the departmentName field
      },
    ]);

    if (!tickets) {
      return res.json({
        responsecode: "402",
        message: "Ticket not found.",
      });
    }

    res.json({
      responsecode: "200",
      tickets: tickets,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};
