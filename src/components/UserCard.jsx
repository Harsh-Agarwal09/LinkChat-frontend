import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about, interests } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(userId))
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card bg-base-300 w-96 shadow-sm ">
            <figure>
                <img
                    className="w-full h-85 rounded-t-lg"
                    src={user.photoUrl}
                    alt="User Photo"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-active btn-success btn-wide" onClick={() => handleSendRequest("interested", _id)}>
                        Link 💬
                    </button>
                    <button className="btn btn-active btn-error btn-wide" onClick={() => handleSendRequest("ignored", _id)}>Skip 🚫</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
