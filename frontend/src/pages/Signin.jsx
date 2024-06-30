// src/pages/Signin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomWarning } from '../components/BottomWarning';
import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { SubHeading } from '../components/SubHeading';
import { useAuth } from '../components/AuthProvider';
import { useNotification } from '../notify/context/NotificationContext';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const addNotification = useNotification();

    const handleSubmit = async () => {
        try {
            const response = await login(username, password);
            console.log('log res ', response)
            if (response.data.user) {
                addNotification('success', response.data.message);
                navigate('/dashboard');
            } else {
                addNotification('warning', response.data.message);
            }
        } catch (error) {
            console.error('Failed:', error);
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
