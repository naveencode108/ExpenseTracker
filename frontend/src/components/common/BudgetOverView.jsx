import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddExpense from './AddExpense';
import { deleteExpense, getExpense } from '../../services/expense/expenseApi';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setExpense } from '../../slices/expenseSlice';
import EditExpense from './EditExpense';

const BudgetOverView = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { id } = useParams();
  const { expenseData } = useSelector(state => state.expense);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    let res = await deleteExpense(id);
    if (res?.data?.success) {
      let filter = expenseData.filter(item => item._id != id);
      dispatch(setExpense(filter));
      toast.success(res.data.message);
    }
    else {
      // toast.error(res);
      console.log(res);
    }
  }

  useEffect(() => {

    const fetchExpense = async () => {
      let res = await getExpense(id);
      if (res?.data?.success) {
        dispatch(setExpense(res.data.data));
      }
      else {
        console.log(res);
        // toast.error(res);
      }

    }
    fetchExpense();

  }, [])
  return (
    <>
      {open && <AddExpense onClose={() => setOpen(false)} />}
      {editOpen && <EditExpense onClose={() => setEditOpen(false)} data={editData} />}
      <div className='flex-1 bg-gray-100 h-full px-2 py-3'>
        <div className='h-full bg-white overflow-y-auto p-3 rounded-2xl'>
          <button onClick={() => setOpen(true)} className='px-3 py-2 bg-sky-500 rounded-lg text-white cursor-pointer'>Add Expense</button>
          <div className='mt-6 border-t-2'>
            <table className='w-full'>
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>BudgetName</th>
                  <th>ExpenseName</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {expenseData?.map((item, index) => (
                  <tr key={index}>
                    <td className='py-3 border-b-[1px] text-sm capitalize '>{index + 1}</td>
                    <td className='py-3 border-b-[1px] text-sm capitalize '>{item?.budgetId?.name}</td>
                    <td className='py-3 border-b-[1px] text-sm capitalize '>{item?.expenseName}</td>
                    <td className='py-3 border-b-[1px] text-sm capitalize '>{item?.expenseAmount}</td>
                    <td className='py-3 border-b-[1px] text-sm capitalize '>{item?.createdAt}</td>
                    <td className='py-3 border-b-[1px] text-sm capitalize '>
                      <button onClick={() => {
                        setEditOpen(true)
                        setEditData(item)
                      }} className='px-2 py-1 rounded-lg  cursor-pointer text-green-500 capitalize'>edit</button>
                      <button onClick={() => handleDelete(item._id)} className='px-2 py-1 rounded-lg  cursor-pointer text-red-500 capitalize'>delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default BudgetOverView