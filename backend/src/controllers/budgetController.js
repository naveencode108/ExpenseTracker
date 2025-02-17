import budgetModel from "../models/budgetModel.js";
import jwt from 'jsonwebtoken'
import expenseModel from "../models/expenseModel.js";

export const createBudget = async (req, res) => {
  try {

    let { userId, name, amount } = req.body;

    if (!name || !amount || !userId) return res.status(401).json({ success: false, message: "All fields are required" });

    let isBudget = await budgetModel.findOne({ name });

    if (isBudget) return res.status(409).json({ success: false, message: "Budget Exists" });

    let createdBudget = await budgetModel.create({
      userId,
      name,
      amount
    })


    let newBudget = { ...createdBudget.toObject(), count: 0, totalExpense: 0 }

    return res.status(200).json({ success: true, message: "Budget Created", data: newBudget });

  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
}

export const getBudget = async (req, res) => {
  try {
    let userId = req.userId;
    let budget = await budgetModel.find({ userId });

    const budgetDetails = await budgetModel.aggregate([
      {
        $match: { _id: { $in: budget.map(item => item._id) } }
      },
      {
        $lookup: {
          from: 'expenses',
          let: { budgetId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$budgetId", "$$budgetId"] }
              }
            },
            {
              $group: {
                _id: null,
                totalExpense: { $sum: "$expenseAmount" },
                count: { $sum: 1 }
              }
            }
          ],
          as: 'expenseSummary'
        }
      },
      {
        $unwind: {
          path: "$expenseSummary",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          totalExpense: { $ifNull: ["$expenseSummary.totalExpense", 0] },
          count: { $ifNull: ["$expenseSummary.count", 0] }
        }
      },
      {
        $project: {
          expenseSummary: 0
        }
      }
    ]);
    return res.status(200).json({ success: true, data: budgetDetails });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
}

export const updateBudget = async (req, res) => {
  try {

    let { id } = req.params
    let { name, amount } = req.body;

    if (!id) return res.status(401).json({ success: false, message: "BudgetId is not provided " })

    let findBudget = await budgetModel.findOne({ _id: id });

    if (!findBudget) return res.status(404).json({ success: false, message: "Not found" });

    if (name) {
      findBudget.name = name;
    }

    if (amount) {
      findBudget.amount = amount;
    }

    let updatedBudget = await findBudget.save();


    let getDetailofBudget = await budgetModel.aggregate([
      { $match: { _id: findBudget._id } },
      {
        $lookup: {
          from: 'expenses',
          let: { budgetId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$budgetId', '$$budgetId'] }
              }
            },
            {
              $group: {
                _id: null,
                totalExpense: { $sum: '$expenseAmount' },
                count: { $sum: 1 }
              }
            }
          ],
          as: 'expenseData'
        }
      },
      {
        $unwind: {
          path: "$expenseData",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          totalExpense: { $ifNull: ["$expenseData.totalExpense", 0] },
          count: { $ifNull: ["$expenseData.count", 0] }
        }
      },
      {
        $project: {
          expenseData: 0
        }
      }
    ])

    return res.status(200).json({ success: true, message: "Budget is Updated", data: getDetailofBudget[0] });
  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
}

export const deleteBudget = async (req, res) => {
  try {

    let { id } = req.params

    if (!id) return res.status(401).json({ success: false, message: "Id not provided" });

    await expenseModel.deleteMany({ budgetId: id });

    await budgetModel.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Budget Deleted" });

  } catch (er) {
    return res.status(500).json({ success: false, message: er.message });
  }
}