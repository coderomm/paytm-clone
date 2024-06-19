// src/pages/Signin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthProvider';
import { BottomWarning } from '../components/BottomWarning';
import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { SubHeading } from '../components/SubHeading';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/signin', { email, password });
            login(response.data.token);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label="Sign in" />
                    <SubHeading label="Enter your credentials to access your account" />
                    <InputBox placeholder="harkirat@gmail.com" label="Email" onChange={(e) => setEmail(e.target.value)} />
                    <InputBox placeholder="123456" label="Password" onChange={(e) => setPassword(e.target.value)} type="password" />
                    {error && <div className="text-red-500">{error}</div>}
                    <div className="pt-4">
                        <Button label="Sign in" onClick={handleSubmit} />
                    </div>
                    <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
                </div>
            </div>
        </div>
    );
};

export default Signin;
