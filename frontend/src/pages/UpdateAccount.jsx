import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import axios from "../components/AxiosInstance";
import { useNavigate } from "react-router-dom";

const UpdateAccount = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUpdate = async () => {
        try {
            await axios.put("/user", { firstName, lastName, password });
            navigate("/dashboard");
        } catch (error) {
            console.error("Error updating user:", error.response.data.message);
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Update Account"} />
                    <InputBox
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        placeholder="First Name"
                        label={"First Name"}
                    />
                    <InputBox
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Last Name"
                        label={"Last Name"}
                    />
                    <InputBox
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New Password (optional)"
                        label={"Password"}
                    />
                    <div className="pt-4">
                        <Button onClick={handleUpdate} label={"Update"} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UpdateAccount;