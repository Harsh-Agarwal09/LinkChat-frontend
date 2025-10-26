import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/login",
                {
                    emailId,
                    password,
                },
                { withCredentials: true }
            );
            // Use dispatch to add user data to redux store
            dispatch(addUser(res.data));
            return navigate("/");
        } catch (error) {
            setError(error?.response?.data || "Something went wrong");
        }
    };

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data.data));
            return navigate("/profile");
        } catch (error) {
            setError(error?.response?.data || "Something went wrong");
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">
                        {isLoginForm ? "Login" : "Sign Up"}
                    </h2>
                    {!isLoginForm && (
                        <>
                            <div className="my-2">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input
                                        type="text"
                                        value={firstName}
                                        placeholder="First Name"
                                        className="input"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </fieldset>
                            </div>
                            <div className="my-2">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input
                                        type="text"
                                        value={lastName}
                                        placeholder="Last Name"
                                        className="input"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </fieldset>
                            </div>
                        </>
                    )}
                    <div className="my-2">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input
                                type="text"
                                value={emailId}
                                placeholder="Email ID"
                                className="input"
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </fieldset>
                    </div>
                    <div className="my-2">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input
                                type="password"
                                value={password}
                                placeholder="Password"
                                className="input"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </fieldset>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center m-2">
                        <button
                            className="btn btn-outline"
                            onClick={isLoginForm ? handleLogin : handleSignUp}
                        >
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>
                    <p
                        className="cursor-pointer"
                        onClick={() => setIsLoginForm((value) => !value)}
                    >
                        {isLoginForm
                            ? "New to LinkChat? Sign Up🚀"
                            : "Already part of LinkChat? Log In 🔑"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
