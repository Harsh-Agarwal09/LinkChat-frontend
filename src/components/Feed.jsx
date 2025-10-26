import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + "/user/feed", {
                withCredentials: true,
            });
            dispatch(addFeed(res?.data?.data));
        } catch (error) {
            // console.error(error);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    if (!feed) return;

    if (feed.length === 0) return <h1 className="text-center text-xl mt-10">You’ve caught up with everyone! Check back soon for new people to connect with</h1>

    return (
        feed && (
            <div className="flex flex-wrap justify-center gap-4 my-3">
                <UserCard user={feed[0]} />
            </div>
        )
    );
};

export default Feed;
