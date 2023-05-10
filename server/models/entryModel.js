import mongoose from "mongoose";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const sequencer = require("mongoose-sequence")(mongoose);

const entrySchema = new mongoose.Schema({
  documentType: {
    type: String,
    // required: [true, "Please Enter Document Type"],
  },

  headerText: {
    type: String,
    // required: [true, "Please Enter Header Text"],
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
// entrySchema.plugin(sequencer, { inc_field: "id", start_seq: 1 });

export default mongoose.model("Entry", entrySchema);
