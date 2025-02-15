import {createSlice} from '@reduxjs/toolkit';

const initialState={
    token:localStorage.getItem('token')?localStorage.getItem('token'):null,
    userData:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
        },
        
        setUserData:(state,action)=>{
            state.userData=action.payload;
        }
    }
});

export const {setToken,setUserData}=authSlice.actions;

export default authSlice.reducer;

