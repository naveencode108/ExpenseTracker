import React from 'react'
import Login from './pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DashboardOverview from './components/layouts/DashboardOverview';
import Budget from './components/layouts/Budget';
import Expense from './components/layouts/Expense';


const App = () => {


  return (
    <>
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Navigate to='/dashboard' />} />

        <Route element={<Dashboard />} >
          <Route path='/dashboard' element={<DashboardOverview/>}/>
          <Route path='/budget' element={<Budget/>}/>
          <Route path='/expense' element={<Expense/>}/>
        </Route>

      </Routes>
    </>
  )
}

export default App