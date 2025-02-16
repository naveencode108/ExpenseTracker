import express from 'express';
import { createBudget, deleteBudget, getBudget, updateBudget } from '../controllers/budgetController.js';
import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();


router.post('/', createBudget);
router.get('/', isAuth,getBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);



export default router;