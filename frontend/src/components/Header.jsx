import { Link } from "react-router-dom"
import { useAuth } from "./AuthProvider";
import { useNotification } from '../notify/context/NotificationContext';

export const Header = () => {
    const { currentUser, logout } = useAuth();
    const addNotification = useNotification();

    if (currentUser === undefined) {
        return <div>Loading...</div>;
    }

    const handleLogout = async () => {
        try {
            const response = await logout();
            addNotification('success', response.message || 'Logged out successfully');
        } catch (error) {
            console.error('Failed to logout:', error);
            addNotification('danger', error.response?.data?.message || 'Logout failed. Please try again.');
        }
    };

    return (
        <header className="bg-[#163300]">
            <div className="px-1 md:px-32 py-1 flex items-center">
                <div className="flex gap-1 md:gap-2 items-center justify-start flex-grow">
                    <Link to={'/'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-14 md:size-16 stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </Link>
                    {!currentUser && <Link to={"/dashboard"} className="text-base rounded-full py-1 px-4 text-[#163300] bg-[#9fe870] border border-[#9fe870] ">Send Money</Link>}
                    {currentUser && <h6 className="text-base ms-4 rounded-full py-1 px-4 text-[#163300] bg-[#9fe870] border border-[#9fe870] ">Hi {currentUser ? currentUser.firstName[0].toUpperCase() + currentUser.firstName[1].toUpperCase() : 'G'}!</h6>}
                </div>
                <div className="flex gap-1 md:gap-2 items-center justify-end flex-grow">
                    {!currentUser && <Link to={"/signin"} className="transition-colors duration-150 ease-in-out hover:bg-[#ffffff1a] text-base ms-4 rounded-full py-1 px-2 text-[#9fe870] border border-transparent ">Log in</Link>}
                    {!currentUser && <Link to={"/signup"} className="text-base ms-4 rounded-full py-1 px-4 text-[#163300] bg-[#9fe870] border border-[#9fe870] ">Register</Link>}
                    {currentUser && <button onClick={handleLogout} className="text-base ms-4 rounded-full py-1 px-4 text-[#163300] bg-[#9fe870] border border-[#9fe870] ">Logout</button>}
                </div>
            </div>
        </header>)
}