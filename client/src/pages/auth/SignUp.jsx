import axios from 'axios';
import { IdCard, Key, Mail, User } from 'lucide-react'
import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const SignUp = ({ handleLogin }) => {
    const [role, setRole] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(role, name, email, password);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const signUpRes = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, {
                role,
                name,
                email,
                password
            });

            if (signUpRes.data.success) {
                handleLogin(signUpRes.data.auth);

                toast.success("SignUp Success");

                if (signUpRes.data.auth.role == '1') {
                    navigate("/items/items-list");
                }
                else if (signUpRes.data.auth.role == '2') {
                    navigate("/shop/manage-items");
                }
            } else {
                toast.error("Unable to signup: ", signUpRes.data);
            }
        } catch (error) {
            console.log("Error in signup:", error);
            toast.error("Failed to signup");
        }
    }

    return (
        <div className='px-60 py-10'>
            <div className="signup-box bg-yellow-100 py-10 px-12 shadow-xl rounded-xl">

                <div className='text-2xl bold mt-2 mb-5'>Sign Up</div>
                <form className='flex flex-col gap-3' onSubmit={handleSignUp}>
                    <label className="input input-bordered flex items-center gap-2">
                        <IdCard /> User Role
                        <select className="select select-primary w-full max-w-xs border-gray-300" onChange={(e) => setRole(e.target.value)}>
                            <option selected disabled value={0}>Select User</option>
                            <option value={1}>User</option>
                            <option value={2}>ShopOwner</option>
                            {/* {categories.map((catg, id) => <option key={id} value={catg._id} selected={category == catg._id}>{catg.name}</option>)} */}
                        </select>
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <User /> Name:
                        <input type="text" className="grow" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <Mail /> Email:
                        <input type="text" className="grow" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <Key /> Password:
                        <input type="password" className="grow" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type='submit' className="btn btn-accent">Submit</button>
                </form>
            </div>

        </div>
    )
}

export default SignUp