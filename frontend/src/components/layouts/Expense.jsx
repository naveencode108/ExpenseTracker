import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllExpense } from '../../services/expense/expenseApi';
import { setExpense } from '../../slices/expenseSlice';
import {toast} from 'react-hot-toast';

const Expense = () => {

  const {token,userData}=useSelector(state=>state.auth);
  const {expenseData}=useSelector(state=>state.expense);
    
  const dispatch=useDispatch();
   
  useEffect(()=>{
    
    const fetchAllExpense=async()=>{
        let res=await getAllExpense(token);
        if(res?.data?.success){
           dispatch(setExpense(res.data.data));
        }
        else{
           toast.error(res?.message);
        }
    }
    fetchAllExpense();
  },[]);

  return (
    <div className='h-full bg-gray-100 flex-1 p-2'>
           <div className='h-full p-2 bg-white rounded-lg'>
               <button className='px-2 text-white py-1 rounded-lg bg-blue-500'>Add Expense</button>
               <div className='mt-4 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)] bg-gray-100 rounded-lg'>
                {expenseData?.map((item,index)=>(
                  <div key={index} className='px-2 py-2 border-[1px] rounded-lg flex justify-around'>
                      <p>{index+1}</p>
                      <p>{item?.expenseName}</p>
                      <p>{item?.expenseAmount}</p>
                      <p>{item?.createdAt}</p>
                      <div>
                         <button className='px-2 py-1 text-green-500 cursor-pointer'>Edit</button>
                         <button className='px-2 py-1 text-red-500 cursor-pointer'>Delete</button>
                      </div>
                  </div>
                  ))}
               </div>
           </div>                      
    </div>
  )
}

export default Expense