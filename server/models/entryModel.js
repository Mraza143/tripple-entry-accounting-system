import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  _id: String,
  seq: Number,
});

const Counter = mongoose.model("Counter", CounterSchema);

const entrySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
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
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // modifiedAt: { type: Date, default: Date.now },
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
  },
  { timestamps: true }
);

const getNextId = async function (sequenceName) {
  const sequenceDocument = await this.model("Counter").findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.seq;
};

entrySchema.pre("save", async function (next) {
  if (!this.id) {
    this.id = await getNextId.call(this, "mysequence");
  }
  next();
});

export default mongoose.model("Entry", entrySchema);
