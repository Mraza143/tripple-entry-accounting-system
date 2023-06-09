import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import entryModel from "../models/entryModel.js";

export const entryPost = async (req, res) => {
  const { documentType, headerText, documentDate, postingDate, lineItems } =
    req.body;

  try {
    const entry = await entryModel.create({
      documentType,
      headerText,
      documentDate,
      postingDate,
      lineItems,
    });
    res.status(201).json({ entry });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getAllEntries = async (req, res, next) => {
  try {
    const entries = await entryModel.find();
    res.status(200).json({
      success: true,
      entries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getSingleEntry = async (req, res, next) => {
  const entry = await entryModel.findById(req.params.id);
  res.status(200).json({
    success: true,
    entry,
  });
};

export const updateEntry = async (req, res, next) => {
  const newEntryData = {
    documentType: req.body.documentType,
    headerText: req.body.headerText,
    documentDate: req.body.documentDate,
    postingDate: req.body.postingDate,
    lineItems: req.body.lineItems,
  };

  await entryModel.findByIdAndUpdate(req.params.id, newEntryData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
};

export const removeEntry = async (req, res, next) => {
  const entry = await entryModel.findById(req.params.id);
  await entry.deleteOne();
  res.status(200).json({
    success: true,
    message: "Entry Deleted Successfully",
  });
};
