import { GoogleLogin } from '@react-oauth/google';
import React from 'react'
import { googleLogin } from '../services/auth/authApi';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';

const Login = () => {
    const navigate=useNavigate();

    const handleGoogleLogin = async (authRes) => {
        try {

            if (authRes?.credential) {
                let googleToken = authRes.credential;
                let res = await googleLogin(googleToken)
                console.log(res);
                if(res?.data?.success){
                    localStorage.setItem('token',res.data.clientToken);
                    localStorage.setItem('user',JSON.stringify(res.data.data));
                    navigate('/dashboard');
                    toast.success(res.data.message);
                }
                else{
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

    return (
        <>
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={handleGoogleLogin}
                useOneTap
            />
            <div>Login</div>
        </>
    )
}

export default Login