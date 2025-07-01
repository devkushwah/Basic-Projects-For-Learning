import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const LoginForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    function changeHandler(event) {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value, 
        }));
    }

    const submitHandler = async e => {
        e.preventDefault();
        setError(''); // Reset error before making request
        try {
            const BASE_URL = process.env.REACT_APP_BASE_URL;  // ✅ Env variable import kiya

            const res = await axios.post(`${BASE_URL}/api/v1/login`, formData);  
            
            localStorage.setItem('token', res.data.token);
            setIsLoggedIn(true);
            toast.success('Logged In');
            navigate('/dashboard');
        } catch (err) {
            setError(err?.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div>
            <form className='flex flex-col w-full gap-y-4 mt-6' onSubmit={submitHandler}>
                {error && <p className='text-red-500'>{error}</p>}
                
                <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Email Address<sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        type='email'
                        required
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder='Enter email address'
                        name='email'
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                </label>

                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Password<sup className='text-pink-200'>*</sup>
                    </p>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder='Enter Password' 
                        name='password'
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                    
                    <span className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                          onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
                        ) : (
                            <AiOutlineEye fontSize={24} fill='#AFB2BF' />
                        )}
                    </span>
                </label>
                
                <Link to='#'>
                    <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                        Forgot Password?
                    </p>
                </Link>

                <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px]'>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
