import { useEffect, useState } from "react";
import { Header } from "../components/Header"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from '../components/AxiosInstance'
import { Footer } from "../components/Footer";

const Dashboard = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get('/account/balance', { withCredentials: true });
                if (response.data.balance) setBalance(response.data.balance);
            } catch (error) {
                console.log('Error while fetching balance', error)
            }
        };
        fetchBalance();
    }, [])
    return (
        <div>
            <Header />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;