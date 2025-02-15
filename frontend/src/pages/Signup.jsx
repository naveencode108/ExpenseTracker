import { GoogleLogin } from '@react-oauth/google';
import React from 'react'
import { googleLogin, login, signup } from '../services/auth/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const Signup = () => {
  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors } } = useForm();


  const onSubmit = async (data) => {
    try {
      let res = await signup(data);
      if (res?.data?.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
      else {
        toast.error(res.data.message);
      }

    } catch (er) {
      console.log(er);
    }
  }

  return (
    <>
      <div className='w-full h-screen bg-gray-100 flex items-center justify-center'>
        <div className='w-72 p-4 shadow-lg'>
          <h1 className='text-center text-2xl'>SignUp</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='px-1 py-4 space-y-4'>
            <div>
              <label className='capitalize text-sm text-gray-700' htmlFor="">name</label>
              <input {...register('name', { required: 'Name is Required' })}
                className='w-full px-2 py-2 rounded-lg outline-none ring-1' type="text" placeholder='enter name' />
              <span className='text-sm text-red-500'>{errors.name && errors.name.message}</span>
            </div>

            <div>
              <label className='capitalize text-sm text-gray-700' htmlFor="">email</label>
              <input {...register('email', { required: 'Email is Required' })}
                className='w-full px-2 py-2 rounded-lg outline-none ring-1' type="email" placeholder='enter email' />
              <span className='text-sm text-red-500'>{errors.email && errors.email.message}</span>
            </div>

            <div>
              <label className='capitalize text-sm text-gray-700' htmlFor="">password</label>
              <input
                {...register('password', { required: 'Password is Required' })}
                className='w-full px-2 py-2 rounded-lg outline-none ring-1' type="password" placeholder='enter password' />
              <span className='text-sm text-red-500'>{errors.password && errors.password.message}</span>

            </div>
            <button className='w-full text-center bg-sky-500 rounded-lg cursor-pointer py-2'>Signup</button>
          </form>
          <p className='text-sm text-center'>
            Already have Account?
            <Link to='/login' className='text-blue-500'>
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup;