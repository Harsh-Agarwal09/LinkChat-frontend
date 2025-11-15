import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((store) => store.user);
    const userId = user?._id;

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
            withCredentials: true,
        });

        console.log(chat.data.messages);

        const chatMessages = chat?.data?.messages.map((msg) => {
            const { senderId, text } = msg;
            return {
                firstName: senderId?.firstName,
                lastName: senderId?.lastName,
                text,
            };
        });
        setMessages(chatMessages);
    };
    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createSocketConnection();
        // As soon as the page loaded, the socket connection is made and joinChat event is emitted
        socket.emit("joinChat", {
            firstName: user.firstName,
            userId,
            targetUserId,
        });

        socket.on("messageReceived", ({ firstName, lastName, text }) => {
            console.log(firstName + " :  " + text);
            setMessages((messages) => [...messages, { firstName, lastName, text }]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMessage,
        });
        setNewMessage("");
    };

    // Auto-scroll reference
    const messagesEndRef = useRef(null);

    // Auto scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="w-3/4 mx-auto bg-base-200 border border-gray-700 rounded-xl m-5 h-[70vh] flex flex-col shadow-lg">

            {/* Header */}
            <h1 className="p-5 border-b border-gray-700 text-2xl font-bold bg-base-300 rounded-t-xl">
                Chat with Linkmates
            </h1>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={
                            "chat " +
                            (user.firstName === msg.firstName ? "chat-end" : "chat-start")
                        }
                    >
                        <div className="chat-header font-semibold">
                            {msg.firstName} {msg.lastName}
                            <time className="text-xs opacity-50 ml-2">Just now</time>
                        </div>

                        <div className="chat-bubble chat-bubble-secondary text-white">
                            {msg.text}
                        </div>

                        <div className="chat-footer opacity-50 text-xs">
                            Delivered
                        </div>
                    </div>
                ))}

                {/* Auto-scroll anchor */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="p-4 border-t border-gray-700 bg-base-300 flex items-center gap-3 rounded-b-xl">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                    className="input input-bordered w-full"
                    placeholder="Type your message..."
                />

                <button
                    onClick={sendMessage}
                    className="btn btn-primary px-6"
                >
                    Send
                </button>
            </div>
        </div>
    );
};
export default Chat;