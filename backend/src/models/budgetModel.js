import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Budget', budgetSchema);