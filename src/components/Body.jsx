import { Outlet } from "react-router-dom";
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.users);

    const fetchUser = async () => {
        // If user data is already present in the store, do not fetch again
        if (userData) {
            return;
        }
        // Fetch user data from backend
        try {

            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });
            dispatch(addUser(res.data));
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/login");
            }
            console.error(error);
        }
    };

    // Fetch user data from backend by calling the fetchUser function
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Body;
