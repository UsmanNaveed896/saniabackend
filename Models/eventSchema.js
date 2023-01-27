import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    question: String,
    answers: []

}, {
    timestamps: true,
}, );

export default mongoose.model('Events', EventSchema);