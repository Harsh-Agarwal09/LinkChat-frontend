import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setfirstName] = useState(user.firstName);
    const [lastName, setlastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const saveProfile = async () => {
        // Clear error before saving the profile
        setError("");

        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                { firstName, lastName, photoUrl, age, gender, about },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
        } catch (error) {
            setError(error.response.data);
        }
    };

    return (
        <div className="flex justify-center my-5">
            <div className="flex justify-center mx-20">
                <div className="card bg-base-300 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title justify-center">
                            Personalize Your Space ❤️
                        </h2>
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">First Name</legend>
                                <input
                                    type="text"
                                    value={firstName}
                                    className="input"
                                    onChange={(e) => setfirstName(e.target.value)}
                                />
                            </fieldset>
                        </div>
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name</legend>
                                <input
                                    type="text"
                                    value={lastName}
                                    className="input"
                                    onChange={(e) => setlastName(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Photo URL</legend>
                                <input
                                    type="text"
                                    value={photoUrl}
                                    className="input"
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Age</legend>
                                <input
                                    type="text"
                                    value={age}
                                    className="input"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Gender</legend>
                                <input
                                    type="text"
                                    value={gender}
                                    className="input"
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">About</legend>
                                <input
                                    type="text"
                                    value={about}
                                    className="input"
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </fieldset>
                        </div>
                        <p className="text-red-500">{error}</p>
                        <div className="card-actions justify-center">
                            <button className="btn btn-soft btn-warning text-xl" onClick={saveProfile}>
                                Just Save!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
        </div>
    );
};

export default EditProfile;
