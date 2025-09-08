import { LogIn, PlusIcon, Power } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router'

const Navbar = ({ auth, handleLogout }) => {
    const [role, setRole] = useState();
    console.log("rle", role, auth);

    useEffect(() => {
        setRole(auth?.role);
    }, [auth])


    return (
        <header>
            <div className="max-w-6xl p-4 px-6 bg-slate-100 b-rad">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">Ecommece</h1>
                    <div className="flex items-center gap-3">
                        {role == '1' && <>
                            <Link to="/items/items-list" className="flex hover:bg-slate-200 p-3 b-rad">Items</Link>
                            <Link to="/items/cart" className="flex hover:bg-slate-200 p-3 b-rad">Cart</Link>
                        </>}
                        {role == '2' && <>
                            <Link to="/shop/manage-items" className="flex hover:bg-slate-200 p-3 b-rad">Manage Items</Link>
                        </>}
                        {/* <label className="input input-bordered flex items-center gap-2 b-rad bg-lime-200">
                            Role
                            <select
                                className="select select-primary w-full max-w-xs b-rad border-gray-300 bg-lime-100"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option selected={role == 0} value={0} disabled>Select Role</option>
                                <option selected={role == 1} value={1}>Admin</option>
                                <option selected={role == 2} value={2}>Normal User</option>
                                <option selected={role == 3} value={3}>Store Owner</option>
                            </select>
                        </label> */}
                        {auth
                            ?
                            <div className="avatar placeholder flex gap-4">
                                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                                    <span>{auth.name.slice(0, 1)}</span>
                                </div>
                                <button onClick={handleLogout} className="btn btn-primary b-rad">
                                    <Power className="size-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                            : <>
                                <Link to="/items/items-list" className="flex hover:bg-slate-200 p-3 b-rad">Items</Link>
                                <Link to={"/auth/login"} className="btn btn-primary b-rad">
                                    <LogIn className="size-5" />
                                    <span>Login</span>
                                </Link>
                                <Link to={"/auth/signup"} className="btn btn-primary b-rad">
                                    <LogIn className="size-5" />
                                    <span>Sign Up</span>
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar