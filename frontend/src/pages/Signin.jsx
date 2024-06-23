// src/pages/Signin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import axios from '../components/AxiosInstance';
=======
import axios from "../components/AxiosInstance";
>>>>>>> 8db593800610c7d140596254c199d37963d161af
import { BottomWarning } from '../components/BottomWarning';
import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { SubHeading } from '../components/SubHeading';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/user/signin', { username, password });
            if (response) {
                setSuccess(response.message);
                setError(null);
                navigate('/dashboard');
            } else {
                throw new Error('Login failed')
            }
        } catch (error) {
            setSuccess(null);
            setError(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label="Sign in" />
                    <SubHeading label="Enter your credentials to access your account" />
                    <InputBox onChange={e => { setUsername(e.target.value); }} placeholder="om@gmail.com" label={"Email"} />
                    <InputBox onChange={(e) => { setPassword(e.target.value) }} placeholder="123456" label={"Password"} />

                    {success && <div className="text-green-500">{success}</div>}
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
