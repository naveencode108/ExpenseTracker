import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createExpense, updateExpense } from '../../services/expense/expenseApi';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { setExpense } from '../../slices/expenseSlice';

const ExpenseForm = ({ type, onClose, expData }) => {
    const { id } = useParams();
    const { userData } = useSelector(state => state.auth);
    const { expenseData } = useSelector(state => state.expense);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const onSubmit = async (data) => {
        if (type === 'ADD') {
            let res = await createExpense(data);
            if (res?.data?.success) {
                dispatch(setExpense([...expenseData, res.data.data]));
                toast.success(res.data.message);
                onClose();
            }
            else {
                toast.error(res?.message);
            }
        }
        else if (type === 'EDIT') {
            let formData = {};

            if (expData.expenseName != data.name) {
                formData.name = data.name;
            }

            if (expData.expenseAmount != data.amount) {
                formData.amount = data.amount;
            }

            let res = await updateExpense(expData._id, formData);
            if (res?.data?.success) {
                toast.success(res.data.message);
                let updated = expenseData.map(item => item._id == expData._id ? { ...res.data.data } : item)
                dispatch(setExpense(updated));
                onClose();
            }
            else {
                toast.error(res?.message);
            }
        }
    }

    useEffect(() => {
        if (type === 'ADD') {
            setValue('budgetId', id);
            setValue('userId', userData.id);
        }
        else if (type === 'EDIT') {
            setValue('name', expData.expenseName);
            setValue('amount', expData.expenseAmount);
        }

    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="budgetName" className="block text-gray-700 mb-1">
                    Expense Name
                </label>
                <input
                    {...register('name', { required: 'Expense is required' })}
                    type="text"
                    placeholder="Enter expense name"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                    <span className="text-sm text-red-500">
                        {errors.name.message}
                    </span>
                )}
            </div>

            <div>
                <label htmlFor="amount" className="block text-gray-700 mb-1">
                    Amount
                </label>
                <input
                    {...register('amount', {
                        required: 'Amount is required', pattern: {
                            value: /^[0-9]+$/,
                            message: 'Please enter a valid number',
                        },
                    })}
                    type="text"
                    placeholder="Enter amount"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.amount && (
                    <span className="text-sm text-red-500">
                        {errors.amount.message}
                    </span>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default ExpenseForm