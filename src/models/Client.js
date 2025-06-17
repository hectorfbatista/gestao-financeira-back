import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  clientName: { 
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  observations: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }, userId: {
    type: String,
    required: true
  },
}, { strict: true });

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;