import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  vehicle: {
    type: String,
    required: true
  },
  phoneClient: {
    type: String,
    required: false
  },
  vehiclePlate: {
    type: String,
    required: true
  },
  serviceValue: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
});

export default mongoose.model('Service', serviceSchema);