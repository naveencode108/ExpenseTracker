import BudgetForm from './BudgetForm';
import ExpenseForm from './ExpenseForm';

const AddExpense = ({ onClose }) => {
    
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

                <h1 className="text-2xl font-bold mb-4 text-center">Add Expense</h1>
                <ExpenseForm type={'ADD'} onClose={onClose}/>
            </div>
        </div>
    );
};

export default AddExpense;
