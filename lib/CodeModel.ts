import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  status: { type: String, default: "UNUSED" },
  createdAt: { type: Date, default: Date.now },
  verifiedAt: { type: Date, default: null },
});

const Code =
  mongoose.models.Code || mongoose.model("Code", CodeSchema);

export default Code;
