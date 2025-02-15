import express from 'express';
import { createExpense, deleteExpense, getExpense, getUserAllExpense, updateExpense } from '../controllers/expenseController.js';
import { isAuth } from '../middleware/isAuth.js';


const router = express.Router();

router.get('/',isAuth, getUserAllExpense);

router.post('/', createExpense);
router.get('/:id', getExpense);

router.put('/:id', updateExpense);

router.delete('/:id', deleteExpense);



export default router;