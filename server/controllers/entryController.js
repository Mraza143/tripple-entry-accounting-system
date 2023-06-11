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
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Invalid entry id",
      });
    }

    const entry = await entryModel.findOne({ id });
    res.status(200).json({
      success: true,
      entry,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateSingleEntry = async (req, res, next) => {
  try {
    const entryId = req.params.id;
    const updateData = req.body;

    if (!entryId) {
      return res.status(400).json({
        success: false,
        error: "Invalid entry id",
      });
    }

    // Find the entry by ID
    const entry = await entryModel.findOne({ id: entryId });

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    // Update all fields of the entry
    for (const field in updateData) {
      entry[field] = updateData[field];
    }

    // Save the updated entry
    const updatedEntry = await entry.save();
    return res.json(updatedEntry);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeEntry = async (req, res, next) => {
  try {
    const entryId = req.params.id;

    if (!entryId) {
      return res.status(400).json({
        success: false,
        error: "Invalid entry id",
      });
    }

    // Find the entry by ID
    const entry = await entryModel.findOne({ id: entryId });

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    await entry.deleteOne();

    res.status(200).json({
      success: true,
      message: "Entry Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
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
