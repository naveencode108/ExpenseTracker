import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense, getAllExpense } from '../../services/expense/expenseApi';
import { setExpense } from '../../slices/expenseSlice';
import {toast} from 'react-hot-toast';
import { MdDeleteOutline } from "react-icons/md";


const Expense = () => {

  const {token,userData}=useSelector(state=>state.auth);
  const {expenseData}=useSelector(state=>state.expense);
    
  const dispatch=useDispatch();

  const handleDelete=async(id)=>{
        let res=await deleteExpense(id);
        if(res?.data?.success){
           let filterData=expenseData.filter(item=>item._id!==id);
           dispatch(setExpense(filterData));
           toast.success(res.data.message);
        }
        else{
          toast.error(res?.message);
        }
  }
   
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
                <h1 className='text-2xl text-center py-2 border-b-[1px]'>All Expenses</h1>
               <div className='mt-4 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)] bg-gray-100 rounded-lg'>
                {expenseData?.map((item,index)=>(
                  <div key={index} className='px-2 py-2 border-[1px] rounded-lg flex justify-around'>
                      <p>{index+1}</p>
                      <p>{item?.expenseName}</p>
                      <p>{item?.expenseAmount}</p>
                      <p>{item?.createdAt}</p>
                      <div>
                         <button onClick={()=>handleDelete(item._id)} className='px-2 py-1 text-red-500 cursor-pointer '><MdDeleteOutline size={20}/></button>
                      </div>
                  </div>
                  ))}
               </div>
           </div>                      
    </div>
  )
}

export default Expense