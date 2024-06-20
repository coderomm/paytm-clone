import { AuthProvider, useAuth } from "./AuthProvider";

export const Appbar = () => {
    const { user } = useAuth();

    // Function to get the first initial of the username
    const getUserInitial = (username) => {
        return username ? username.charAt(0).toUpperCase() : '';
    }

    // Check if user is still being fetched and not yet available
    if (user === undefined) {
        return <div>Loading...</div>; // or any other loading indicator you prefer
    }

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello, {user ? user.firstName : 'Guest'}
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user ? getUserInitial(user.username) : ''}
                    </div>
                </div>
            </div>
        </div>
    );
}
