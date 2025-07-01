import mongoose from "mongoose";

const agendaSchema = new mongoose.Schema({
  clientName: { 
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  service: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }, userId: {
    type: String,
    required: true
  },
}, { strict: true });

const Agenda = mongoose.models.Agenda || mongoose.model("Agenda", agendaSchema);

export default Agenda;