import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "../components/AxiosInstance";
import { useState } from 'react';
import { useNotification } from '../notify/context/NotificationContext';

const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const addNotification = useNotification();

    const validate = () => {
        const errors = {};
        if (!amount) {
            errors.amount = 'Amount cannot be empty.';
        } else if (isNaN(amount) || parseFloat(amount) <= 0) {
            errors.amount = 'Amount must be a positive number.';
        }
        return errors;
    };

    const handleTransfer = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await axios.post('/account/transfer', { to: id, amount: parseFloat(amount) }, { withCredentials: true });
            addNotification('success', response.data.message || 'Money sent successfully');
            navigate('/dashboard');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            setErrors({ ...errors, server: errorMessage });
            addNotification('danger', errorMessage);
        }
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, amount: '' }));
    };

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border w-full h-min text-card-foreground max-w-md p-4 space-y-8 min-w-[350px] bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={handleAmountChange}
                                    value={amount}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            {errors.amount && <div style={{ color: 'red', textAlign: 'left' }}>{errors.amount}</div>}
                            {errors.server && <div style={{ color: 'red', textAlign: 'left' }}>{errors.server}</div>}
                            <button
                                onClick={handleTransfer}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                            >
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendMoney;
