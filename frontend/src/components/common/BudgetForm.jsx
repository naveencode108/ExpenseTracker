import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { createBudget, updateBudget } from '../../services/budget/budgetApi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { setBudget } from '../../slices/budgetSlice';

const BudgetForm = ({ type, cardData, onClose }) => {
    const { userData } = useSelector(state => state.auth);
    const { budgetData } = useSelector(state => state.budget);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();


    const onSubmit = async (data) => {
        if (type === 'ADD') {
            let res = await createBudget(data);
                if (res?.data?.success) {
                    dispatch(setBudget([...budgetData, res.data.data]));
                    toast.success(res.data.message);
                    onClose();
                }
            else{
                toast.error(res?.message);
            }
        }
        else if (type === 'EDIT') {
            let formData = {};
            if (data.name !== cardData.name) {
                formData.name = data.name;
            }
            if (data.amount != cardData.amount) {
                formData.amount = data.amount;
            }
            let res = await updateBudget(cardData._id, formData);
                if (res?.data?.success) {
                    let update = budgetData.map(item => item._id == res.data.data._id ? { ...res.data.data } : item);
                    dispatch(setBudget(update));
                    toast.success(res.data.message);
                    onClose();
                }
                else{
                    toast.error(res?.message);
                }
        }
    };

    useEffect(() => {
        if (type === 'ADD') {
            setValue('userId', userData.id)
        }
        if (type === 'EDIT') {
            setValue('name', cardData.name);
            setValue('amount', cardData.amount);
        }
    }, []);

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="budgetName" className="block text-gray-700 mb-1">
                    Budget Name
                </label>
                <input
                    id="budgetName"
                    {...register('name', { required: 'Budget is required' })}
                    type="text"
                    placeholder="Enter budget name"
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
                    id="amount"
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

    );
};

export default BudgetForm;
