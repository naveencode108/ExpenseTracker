import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   budgetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Budget'
   },
   expenseName: {
      type: String,
      trim: true
   },
   expenseAmount: {
      type: Number,
      required: true
   }
}, { timestamps: true });


export default mongoose.model('Expense', expenseSchema);