import { useForm } from 'react-hook-form';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import { createBudget } from '../../services/budget/budgetApi';

const AddBudget = ({ onClose }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [emoji, setEmoji] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();
    
    setValue('userId',user.id)

    const onSubmit = async (data) => {
        let res = await createBudget(data);
        try {
            // create redux state
            if (res?.data?.success) {
                console.log(res.data.data);
            }


        } catch (er) {
            toast.error(res.message);
        }
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
            <div className="relative w-80 max-w-full bg-white rounded-lg shadow-lg p-6">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-lg cursor-pointer text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    X
                </button>

                <h1 className="text-2xl font-bold mb-4 text-center">Add Budget</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="w-full mb-4">
                        <button onClick={() => setEmoji(true)} className='p-3 bg-blue-100 rounded-full'>
                            <img className='size-7' src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f60a.png" alt="" />
                        </button>
                        <EmojiPicker
                            width="100%"
                            open={emoji}
                            height={240}
                            searchDisabled={true}
                            onEmojiClick={(e) => console.log(e)}
                        />
                    </div>

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
                            {...register('amount', { required: 'Amount is required' })}
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
            </div>
        </div>
    );
};

export default AddBudget;
