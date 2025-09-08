import axios from 'axios';
import { IdCard, Key, Mail } from 'lucide-react'
import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Login = ({ handleLogin }) => {
    const [role, setRole] = useState(1);
    const [email, setEmail] = useState('raj04@gmail.com');
    const [password, setPassword] = useState('raj@04');

    const navigate = useNavigate();

    console.log(role, email, password);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const loginRes = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
                role,
                email,
                password
            });

            console.log("lr", loginRes);

            if (loginRes.data.success) {
                handleLogin(loginRes.data.auth);

                toast.success("Login Success");

                if (loginRes.data.auth.role == '1') {
                    navigate("/items/items-list");
                }
                else if (loginRes.data.auth.role == '2') {
                    navigate("/shop/manage-items");
                }
            }
            else {
                console.log(loginRes);
                toast.error("Unable to login: ", loginRes.data);
            }
        } catch (error) {
            console.log("Error in login:", error);
            toast.error("Failed to login");
        }
    }

    return (
        <div className='px-60 py-10'>
            <div className="login-box bg-yellow-100 py-10 px-12 shadow-xl rounded-xl">

                <div className='text-2xl bold mt-2 mb-5'>Login</div>
                <b>Use credentials:</b>
                <p>Customer: Email - raj04@gmail.com | Password - raj04</p>
                <p className='mb-5'>Shop Owner: Email - harsh03@gmail.com | Password - harsh03</p>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <label className="input input-bordered flex items-center gap-2">
                        <IdCard /> User Type
                        <select className="select select-primary w-full max-w-xs border-gray-300" onChange={(e) => setRole(e.target.value)}>
                            <option selected={role == 0} disabled value={null}>Select User</option>
                            <option selected={role == 1} value={1}>User</option>
                            <option selected={role == 2} value={2}>ShopOwner</option>
                            {/* {categories.map((catg, id) => <option key={id} value={catg._id} selected={category == catg._id}>{catg.name}</option>)} */}
                        </select>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <Mail /> Email:
                        <input type="text" className="grow" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <Key /> Password:
                        <input type="password" className="grow" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <div className='mt-5'>Submit directly for dummy Customer login</div>
                    <button type='submit' className="btn btn-accent">Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Login;