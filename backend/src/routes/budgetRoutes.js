import express from 'express';
import { createBudget, deleteBudget, getBudget, updateBudget } from '../controllers/budgetController.js';

const router = express.Router();


router.post('/', createBudget);
router.get('/', getBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);



export default router;