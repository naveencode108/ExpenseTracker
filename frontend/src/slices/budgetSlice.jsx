import { createSlice } from "@reduxjs/toolkit";

const initialState={
     budgetData:null
}


const budgetSlice=createSlice({
    name:'budget',
    initialState,
    reducers:{
        setBudget:(state,action)=>{
            state.budgetData=action.payload;
        }
    }
});

export const {setBudget} = budgetSlice.actions;

export default budgetSlice.reducer;