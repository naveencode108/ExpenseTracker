import React, { useEffect, useState } from 'react'
import { GrAdd } from "react-icons/gr";
import BudgetCard from '../common/BudgetCard';
import AddBudget from '../common/AddBudget';
import { getBudget } from '../../services/budget/budgetApi';


const Budget = () => {

  const [openAdd, setOpenAdd] = useState(false);
  const user=JSON.parse(localStorage.getItem('user'));
  const token=localStorage.getItem('token');

  const [budget,setBudget]=useState(null);

  useEffect(()=>{

    const fetchBudget=async()=>{
         let res=await getBudget(token);
         console.log(res);
         if(res?.data?.success){
           setBudget(res.data.data);
         }
    }
    fetchBudget();

  },[]);

  return (
    <>
      {openAdd && <AddBudget  onClose={()=>setOpenAdd(false)}/>}
      <div className='flex-1 bg-gray-100 h-full px-2 py-3'>
        <div className='flex flex-wrap rounded-lg gap-3 max-h-full py-5 bg-white px-3 overflow-y-auto'>
          <button onClick={() => setOpenAdd(true)} className='w-80 hover:shadow-xl cursor-pointer h-40 bg-sky-200 backdrop-blur-md rounded-lg flex items-center justify-center'>
            <GrAdd size={40} />
          </button>
          {budget&&budget?.map((item,index)=>(
          <BudgetCard key={index} data={item}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default Budget