import express from 'express';
import { createExpense, deleteExpense, getExpense, getUserAllExpense, updateExpense } from '../controllers/expenseController.js';


const router = express.Router();


router.post('/', createExpense);
router.get('/:id', getExpense);

router.put('/:id', updateExpense);

router.delete('/:id', deleteExpense);

router.get('/', getUserAllExpense);


export default router;