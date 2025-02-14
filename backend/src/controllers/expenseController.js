import expenseModel from "../models/expenseModel.js";


export const createExpense = async (req, res) => {
    try {

        let { budgetId, name, amount, userId } = req.body;

        if (!name || !amount || !budgetId || !userId) return res.status(401).json({ success: false, message: "All fields are required" });

        let createdExpense = await expenseModel.create({
            userId,
            budgetId,
            expenseName: name,
            expenseAmount: amount
        })

        return res.status(200).json({ success: true, message: "Expense created", data: createdExpense });

    } catch (er) {
        return res.status(500).json({ success: false, message: er.message });
    }
}

export const getExpense = async (req, res) => {
    try {

        let { budgetId } = req.params;

        if (!budgetId) return res.status(401).json({ success: false, message: "Id is not provided" });

        let expense = await expenseModel.find({ budgetId }).populate('budgetId');

        return res.status(200).json({ success: true, data: expense });


    } catch (er) {
        return res.status(500).json({ success: false, message: er.message });
    }
}

export const updateExpense = async (req, res) => {
    try {

        let { id: expenseId } = req.params;
        let { name, amount } = req.body;

        if (!expenseId) return res.status(401).json({ success: false, message: "ExpenseId is not provided" });

        let expense = await expenseModel.findById(expenseId);

        if (name) {
            expense.expenseName = name
        }
        if (amount) {
            expense.expenseAmount = amount
        }

        let updatedExpense = await expense.save();

        return res.status(200).json({ success: true, message: "Expense Update", data: updatedExpense });


    } catch (er) {
        return res.status(500).json({ success: false, message: er.message });
    }
}

export const deleteExpense = async (req, res) => {
    try {

        let { id } = req.body;

        if (!id) return res.status(401).json({ success: false, message: "Id is not provided" });

        await expenseModel.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Expense deleted" });


    } catch (er) {
        return res.status(500).json({ success: false, message: er.message });
    }
}

export const getUserAllExpense = async (req, res) => {
    try {

        let {userId}=req.body;

        if(!userId) return res.status(401).json({success:false,message:"User id is not provided"});

        let expense=await expenseModel.find({userId});

        return res.status(200).json({success:true,data:expense});

    } catch (er) {
        return res.status(500).json({ success: false, message: er.message });
    }
}