import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from '../components/AxiosInstance'

const Dashboard = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get('/account/balance', { withCredentials: true });
                console.log('balance res: ', response)
                if (response.data.balance) setBalance(response.data.balance);
            } catch (error) {
                console.log('Error while fetching balance', error)
            }
        };
        fetchBalance();
    }, [])
    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    );
};

export default Dashboard;