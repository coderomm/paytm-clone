// src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { BottomWarning } from '../components/BottomWarning';
import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { SubHeading } from '../components/SubHeading';
import { useNotification } from '../notify/context/NotificationContext';
import SkeletonLoader from '../components/SkeletonLoader';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { signup } = useAuth();
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
    if (!firstName) {
      errors.firstName = 'First name is required';
    }
    if (!lastName) {
      errors.lastName = 'Last name is required';
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
      const response = await signup(username, firstName, lastName, password);
      if (response.data.user) {
        addNotification('success', response.data.message);
        navigate('/dashboard');
      }
    } catch (error) {
      console.log('Signup error ', error)
      addNotification('danger', error.response?.data?.message || 'Signup failed. Please try again.');
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

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, firstName: '' }));
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, lastName: '' }));
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign up" />
          <SubHeading label="Create an account to get started" />
          {loading ? (
            <SkeletonLoader count={5} height={20} width="100%" />
          ) : (
            <>
              <InputBox onChange={handleFirstNameChange} placeholder={"om"} label={"First Name"} />
              {errors.firstName && <div style={{ color: 'red', textAlign: 'left' }}>{errors.firstName}</div>}
              <InputBox onChange={handleLastNameChange} placeholder={"sharma"} label={"Last Name"} />
              {errors.lastName && <div style={{ color: 'red', textAlign: 'left' }}>{errors.lastName}</div>}
              <InputBox onChange={handleUsernameChange} placeholder={"om@gmail.com"} label={"Email"} />
              {errors.username && <div style={{ color: 'red', textAlign: 'left' }}>{errors.username}</div>}
              <InputBox onChange={handlePasswordChange} placeholder={"123456"} label={"Password"} />
              {errors.password && <div style={{ color: 'red', textAlign: 'left' }}>{errors.password}</div>}
            </>
          )}
          <div className="pt-4">
            <Button label="Sign up" onClick={handleSubmit} />
          </div>
          <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
        </div>
      </div>
    </div >
  );
};

export default Signup;
