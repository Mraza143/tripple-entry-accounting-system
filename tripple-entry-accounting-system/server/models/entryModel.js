import mongoose from "mongoose";
import validator from "validator";

const entrySchema = new mongoose.Schema({
  documentType: {
    type: String,
    required: [true, "Please Enter Document Type"],
  },

  headerText: {
    type: String,
    required: [true, "Please Enter Header Text"],
    unique: true,
  },

  documentDate: {
    type: Date,
    default:Date.now,
  },

  postingDate: {
    type: Date,
    default:Date.now,
  },
  lineItems:[
    {
      generalLedger:{
        type: Number,
        required: [true, "Please Enter General Ledger Type"]
      },
      costCenter:{
        type: Number,
        required: [true, "Please Enter The Cost Center"]
      },
      lineItemText:{
        type: String,
        required: [true, "Please Enter Line Item Text"]
      },
      amount:{
        type: Number,
        required: [true, "Please Enter The Amount"]
      },
    },
  ],

});

export default mongoose.model("Entry", entrySchema);
