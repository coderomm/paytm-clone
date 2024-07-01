import { useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomWarning } from '../components/BottomWarning';
import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { SubHeading } from '../components/SubHeading';
import { useAuth } from '../components/AuthProvider';
import { useNotification } from '../notify/context/NotificationContext';
import SkeletonLoader from '../components/SkeletonLoader';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();
    const addNotification = useNotification();
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const errors = {};
        if (!username) {
            errors.username = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(username)) {
            errors.username = 'Email address is invalid';
        }
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        return errors;
    };

    const handleSubmit = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);
        try {
            const response = await login(username, password);
            if (response.data.user) {
                addNotification('success', response.data.message);
                navigate('/dashboard');
            }
        } catch (error) {
            console.log('login error ', error)
            addNotification('danger', error.response?.data?.message || 'Signin failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, username: '' }));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                {loading ? (
                    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                        <SkeletonLoader height={30} width="80%" className="mx-auto" />
                        <SkeletonLoader height={20} width="60%" className="mx-auto mt-2" />
                        <SkeletonLoader height={40} width="90%" className="mt-4" />
                        <SkeletonLoader height={40} width="90%" className="mt-4" />
                        <SkeletonLoader height={40} width="90%" className="mt-4" />
                    </div>
                ) : (<div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label="Sign in" />
                    <SubHeading label="Enter your credentials to access your account" />
                    <InputBox onChange={handleUsernameChange} placeholder="om@gmail.com" label={"Email"} />
                    {errors.username && <div style={{ color: 'red', textAlign: 'left' }}>{errors.username}</div>}
                    <InputBox onChange={handlePasswordChange} placeholder="123456" label={"Password"} />
                    {errors.password && <div style={{ color: 'red', textAlign: 'left' }}>{errors.password}</div>}
                    <div className="pt-4">
                        <Button label={loading ? "Signing in..." : "Sign in"} onClick={handleSubmit} disabled={loading} />
                    </div>
                    <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
                </div>
                )}
            </div>
        </div>
    );
};

export default Signin;
