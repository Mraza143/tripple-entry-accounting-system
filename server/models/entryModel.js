import mongoose from "mongoose";
import validator from "validator";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const AutoIncrement = require("mongoose-sequence")(mongoose);

const entrySchema = new mongoose.Schema({
  // _id: Number,
  documentType: {
    type: String,
    // required: [true, "Please Enter Document Type"],
  },

  headerText: {
    type: String,
    // required: [true, "Please Enter Header Text"],
    unique: true,
  },

  documentDate: {
    type: Date,
    default: Date.now,
  },

  postingDate: {
    type: Date,
    default: Date.now,
  },
  lineItems: [
    {
      generalLedger: {
        type: Number,
        // required: [true, "Please Enter General Ledger Type"],
      },
      costCenter: {
        type: Number,
        // required: [true, "Please Enter The Cost Center"],
      },
      lineItemText: {
        type: String,
        // required: [true, "Please Enter Line Item Text"],
      },
      amount: {
        type: Number,
        // required: [true, "Please Enter The Amount"],
      },
    },
  ],
});
entrySchema.plugin(AutoIncrement, { inc_field: "id" });

export default mongoose.model("Entry", entrySchema);
