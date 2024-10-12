import { AnnouncementModel } from "../models/Announcement.js";
import dotenv from "dotenv";
dotenv.config();

export const addAnnouncement = async (req, res) => {
  try {
    const { title, details } = req.body;

    let announcement = await AnnouncementModel.findOne({
      announcementTitle: title,
    });
    if (announcement) {
      return res.json({
        responsecode: "402",
        message: "This announcement is already added.",
      });
    }

    announcement = await new AnnouncementModel({
      announcementTitle: title,
      announcementDetails: details,
    }).save();

    return res.json({
      responsecode: "200",
      message: "Announcement successfully added.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { announcementID, title, details } = req.body;

    if (!announcementID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Announcement not found.",
      });
    }

    let announcement = await AnnouncementModel.findOne({ _id: announcementID });

    if (!announcement) {
      return res.json({
        responsecode: "402",
        message: "Announcement not found.",
      });
    }

    await AnnouncementModel.updateOne(
      { _id: announcementID },
      {
        $set: {
          announcementTitle: title,
          announcementDetails: details,
        },
      }
    );

    return res.json({
      responsecode: "200",
      message: "Announcement is successfully updated.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const removeAnnouncement = async (req, res) => {
  try {
    const { announcementID } = req.body;

    if (!announcementID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Announcement not found.",
      });
    }

    let announcement = await AnnouncementModel.findOne({ _id: announcementID });

    if (!announcement) {
      return res.json({
        responsecode: "402",
        message: "Announcement not found.",
      });
    }

    await AnnouncementModel.deleteOne({ _id: announcementID });

    return res.json({
      responsecode: "200",
      message: "Announcement is successfully removed.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getAllAnnouncement = async (req, res) => {
  try {
    const announcement = await AnnouncementModel.find({});

    res.json({
      responsecode: "200",
      announcement: announcement,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};

export const getAnnouncementByID = async (req, res) => {
  try {
    const { announcementID } = req.body;

    if (!announcementID.match(/^[0-9a-fA-F]{24}$/)) {
      return res.send({
        responsecode: "402",
        message: "Department not found.",
      });
    }

    const announcement = await AnnouncementModel.findOne({
      _id: announcementID,
    });

    res.json({
      responsecode: "200",
      announcement: announcement,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      responsecode: "500",
      message: "Please contact technical support.",
    });
  }
};
