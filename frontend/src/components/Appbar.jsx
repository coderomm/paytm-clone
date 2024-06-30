import { useAuth } from "./AuthProvider";
import { useNotification } from '../notify/context/NotificationContext';

export const Appbar = () => {
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
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4 flex-grow">
                PayTM App
            </div>
            <div className="flex flex-grow justify-end">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {currentUser ? currentUser.firstName[0].toUpperCase() + currentUser.firstName[1].toUpperCase() : 'G'}
                    </div>
                </div>
                <button onClick={handleLogout} className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1 m-1">
                    Logout
                </button>
            </div>
        </div>
    );
}
