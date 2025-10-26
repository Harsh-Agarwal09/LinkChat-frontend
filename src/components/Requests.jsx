import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";
import { removeRequest } from "../utils/requestSlice";

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(
                // {} This is the request body. Since you don’t need to send extra data, it’s just an empty object.
                BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true }
            );
            dispatch(removeRequest(_id));
        } catch (error) {
            console.log(error);
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });

            dispatch(addRequests(res.data.data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // avoid react from crashing during the first render.
    if (!requests) return;

    if (requests.length === 0)
        return (
            <h1 className="text-center text-xl mt-10">
                No requests waiting — your LinkChat network is up to date!
            </h1>
        );

    return (
        <div className="text-center my-5 h-screen ">
            <h1 className="text-bold text-3xl my-2">Pending Link Requests</h1>

            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } =
                    request.fromUserId;

                return (
                    <div
                        key={_id}
                        className="flex m-4 p-2 rounded-lg bg-base-300 w-2/3 mx-auto "
                    >
                        <div>
                            <img
                                alt="Photo"
                                className="w-25 h-25 rounded-full"
                                src={photoUrl}
                            />
                        </div>
                        <div className="text-left mx-5">
                            <h1 className="font-bold text-xl">
                                {firstName + " " + lastName}
                            </h1>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div className="flex gap-4 items-center ml-auto w-fit">
                            <button className="btn btn-outline btn-warning w-28" onClick={() => reviewRequest("accepted", request._id)}>
                                Connect
                            </button>
                            <button className="btn btn-outline btn-error w-28" onClick={() => reviewRequest("rejected", request._id)}>Ignore</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;
