import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="navbar bg-base-300 shadow-sm">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">
                        <img src="/Brand_logo.png" alt="logo" className="w-9 h-9" />
                        LinkChat
                    </Link>
                </div>
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">"Where Every Link Matters"</a>
                </div>
                {user && (
                    <div className="flex gap-2">
                        {" "}
                        <p className="text-xl flex items-center">Welcome back, {user.firstName} 🚀</p>
                        <div className="dropdown dropdown-end mx-5">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img alt="User Photo" src={user.photoUrl} />
                                </div>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        Profile
                                        {/* <span className="badge">New</span> */}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/requests">Link Requests ⏳</Link>
                                </li>
                                <li>
                                    <Link to="/connections">Linkmates 🔗</Link>
                                </li>
                                <li>
                                    <a onClick={handleLogout}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
