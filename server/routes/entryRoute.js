import express from "express";
const router = express.Router();

import {
  entryPost,
  getAllEntries,
  removeEntry,
  getSingleEntry,
  updateEntry,
  updateSingleEntry,
} from "../controllers/entryController.js";

router.route("/entry").post(entryPost);
router.route("/allEntries").get(getAllEntries);
router.route("/updateSingleEntry/:id").put(updateSingleEntry);
router.route("/deleteEntry/:id").delete(removeEntry);
router.route("/updateEntry/:id").put(updateEntry);
router.route("/entry/:id").get(getSingleEntry);

export default router;
