// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthProvider';
import { BottomWarning } from '../components/BottomWarning';
import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { SubHeading } from '../components/SubHeading';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/user/signup', {
        username,
        firstName,
        lastName,
        password
      });
      console.log('states: ', username, password)
      await login(username, password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign up" />
          <SubHeading label="Create an account to get started" />
          <InputBox onChange={e => { setFirstName(e.target.value); }} placeholder={"om"} label={"First Name"} />
          <InputBox onChange={(e) => { setLastName(e.target.value); }} placeholder={"sharma"} label={"Last Name"} />
          <InputBox onChange={e => { setUsername(e.target.value); }} placeholder={"om@gmail.com"} label={"Email"} />
          <InputBox onChange={(e) => { setPassword(e.target.value) }} placeholder={"123456"} label={"Password"} />
          {error && <div className="text-red-500">{error}</div>}
          <div className="pt-4">
            <Button label="Sign up" onClick={handleSubmit} />
          </div>
          <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
