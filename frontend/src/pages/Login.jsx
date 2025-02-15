import { GoogleLogin } from '@react-oauth/google';
import React from 'react'
import { googleLogin, login } from '../services/auth/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import {useDispatch} from 'react-redux';
import { setToken, setUserData } from '../slices/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const { handleSubmit, register, formState: { errors } } = useForm();

    const handleGoogleLogin = async (authRes) => {
        try {

            if (authRes?.credential) {
                let googleToken = authRes.credential;
                let res = await googleLogin(googleToken)
                if (res?.data?.success) {
                    dispatch(setToken(res.data.clientToken));
                    dispatch(setUserData(res.data.data));
                    localStorage.setItem('token', res.data.clientToken);
                    localStorage.setItem('user', JSON.stringify(res.data.data));
                    navigate('/dashboard');
                    toast.success(res.data.message);
                }
                else {
                    toast.error(res?.data?.message);
                }
            }
            else {
                console.log("something went wrong")
            }
        } catch (er) {
            console.log(er.message);
        }
    }

    const onSubmit = async (data) => {
        let res = await login(data);
        try {
            console.log(res);
            if (res?.data?.success) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.data));
                dispatch(setToken(res.data.token));
                dispatch(setUserData(res.data.data));
                navigate('/');
                toast.success(res.data.message);
            }
            else {
                toast.error(res.data.message);
            }

        } catch (er) {
            toast.error(res.message);
        }
    }

    return (
        <>
            <div className='w-full h-screen bg-gray-100 flex items-center justify-center'>
                <div className='w-72 p-4 shadow-lg'>
                    <h1 className='text-center text-2xl'>Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='px-1 py-4 space-y-4'>
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
                        <button className='w-full text-center bg-sky-500 rounded-lg cursor-pointer py-2'>Login</button>
                    </form>
                    <p className='text-sm text-center'>
                        Dont have Account?
                        <Link to='/signup' className='text-blue-500'>
                          Signup Here
                        </Link>
                    </p>
                    <p className='w-full text-center'>or</p>
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={handleGoogleLogin}
                        useOneTap
                    />
                </div>
            </div>
        </>
    )
}

export default Login