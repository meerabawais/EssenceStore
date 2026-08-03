"use client";

import { useEffect, useState } from "react";
import "./Chat.css";

export default function Chat() {

    const [currentFolder, setCurrentFolder] = useState("inbox");
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);

    const [search, setSearch] = useState("");

    const [reply, setReply] = useState("");

    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    const [error, setError] = useState("");

    async function loadMessages() {

        try {

            setLoading(true);
            setError("");

            const response = await fetch("/admin/api/messages");

            const data = await response.json();

            console.log("MESSAGES API RESPONSE:", data);

            if (!response.ok) {

                throw new Error(
                    data?.message || "Failed to load messages"
                );
            }

            if (!Array.isArray(data)) {

                throw new Error(
                    "Invalid response received from messages API"
                );
            }

            setConversations(data);

        } catch (error) {

            console.error("Failed to load messages:", error);

            setError(error.message);

            setConversations([]);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {

        loadMessages();

    }, []);

    const filteredConversations = conversations.filter(
    (conversation) => {

        if (currentFolder === "trash") {
            if (!conversation.isTrashed) {
                return false;
            }
        }

        else if (currentFolder === "starred") {
            if (!conversation.isStarred || conversation.isTrashed) {
                return false;
            }
        }

        else {
            if (conversation.isTrashed) {
                return false;
            }
        }

        const searchText = search.toLowerCase();

        return (
            conversation.userName
                ?.toLowerCase()
                .includes(searchText) ||

            conversation.email
                ?.toLowerCase()
                .includes(searchText)
        );
    }
);


    function selectConversation(conversation) {

        setSelectedConversation(conversation);

        
        setReply("");
    }



    function getLatestMessage(conversation) {

        if (
            !conversation.messages ||
            conversation.messages.length === 0
        ) {
            return null;
        }

        return conversation.messages[
            conversation.messages.length - 1
        ];
    }



    function formatDate(date) {

        if (!date) {
            return "";
        }

        return new Date(date).toLocaleDateString();
    }


    function formatDateTime(date) {

        if (!date) {
            return "";
        }

        return new Date(date).toLocaleString();
    }


    async function handleSendReply() {

        if (!selectedConversation) {
            return;
        }

        if (!reply.trim()) {
            return;
        }

        try {

            setSending(true);
            setError("");

            const response = await fetch(
                `/admin/api/messages/${selectedConversation.id}/reply`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        message: reply.trim(),
                    }),
                }
            );

            const data = await response.json();

            console.log("REPLY RESPONSE:", data);

            if (!response.ok) {

                throw new Error(
                    data?.message || "Failed to send reply"
                );
            }


            if (data?.conversation) {

                setSelectedConversation(
                    data.conversation
                );

                setConversations((previous) =>
                    previous.map((conversation) =>
                        conversation.id ===
                        data.conversation.id
                            ? data.conversation
                            : conversation
                    )
                );

            } else {

                await loadMessages();

                const refreshed =
                    conversations.find(
                        (conversation) =>
                            conversation.id ===
                            selectedConversation.id
                    );

                if (refreshed) {
                    setSelectedConversation(refreshed);
                }
            }

            setReply("");

        } catch (error) {

            console.error(
                "Failed to send reply:",
                error
            );

            setError(error.message);

        } finally {

            setSending(false);
        }
    }


    function handleReplyKeyDown(event) {

    
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            handleSendReply();
        }
    }
    async function sendReply() {

    if (!reply.trim() || !selectedConversation) {
        return;
    }

    try {

        setSending(true);

        const response = await fetch(
            `/admin/api/messages/${selectedConversation.id}/reply`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: reply,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("REPLY ERROR:", data);
            alert(data.message || "Failed to send reply");
            return;
        }

        setSelectedConversation(data.conversation);

        setConversations((prev) =>
            prev.map((conversation) =>
                conversation.id === data.conversation.id
                    ? data.conversation
                    : conversation
            )
        );

        setReply("");

    } catch (error) {

        console.error("SEND REPLY ERROR:", error);

        alert("Something went wrong while sending the reply.");

    } finally {

        setSending(false);

    }
}
    return (

        <div className="chat-page">


            <div className="chat-header">

                <div>

                    <p className="communication-label">
                        COMMUNICATION
                    </p>

                    <h2>Inbox</h2>

                </div>


                <div className="chat-header-actions">

                    <button
                        className="compose-btn"
                    >
                        + Compose
                    </button>

                </div>

            </div>


            {error && (

                <div
                    className="alert alert-danger"
                    role="alert"
                >
                    {error}
                </div>

            )}



            <div className="chat-container">


                <aside className="chat-sidebar">

                   <button
    className={`folder ${
        currentFolder === "inbox" ? "active" : ""
    }`}
    onClick={() => {
        setCurrentFolder("inbox");
        setSelectedConversation(null);
    }}
>
    <span>📥</span>
    Inbox

    <span className="folder-count">
        {
            conversations.filter(
                (conversation) => !conversation.isTrashed
            ).length
        }
    </span>
</button>


<button
    className={`folder ${
        currentFolder === "starred" ? "active" : ""
    }`}
    onClick={() => {
        setCurrentFolder("starred");
        setSelectedConversation(null);
    }}
>
    <span>⭐</span>
    Starred

    <span className="folder-count">
        {
            conversations.filter(
                (conversation) =>
                    conversation.isStarred &&
                    !conversation.isTrashed
            ).length
        }
    </span>
</button>


<button
    className={`folder ${
        currentFolder === "trash" ? "active" : ""
    }`}
    onClick={() => {
        setCurrentFolder("trash");
        setSelectedConversation(null);
    }}
>
    <span>🗑</span>
    Trash

    <span className="folder-count">
        {
            conversations.filter(
                (conversation) => conversation.isTrashed
            ).length
        }
    </span>
</button>

                </aside>


                <section className="conversation-list">


                    {/* SEARCH */}

                    <div className="search-box">

                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                        />

                    </div>


                    {/* LOADING */}

                    {loading && (

                        <div className="empty-message">

                            Loading messages...

                        </div>

                    )}


                    {/* ERROR / EMPTY */}

                    {!loading &&
                        filteredConversations.length ===
                            0 && (

                            <div className="empty-message">

                                {search
                                    ? "No messages match your search."
                                    : "No messages found."}

                            </div>

                        )}


                    {/* CONVERSATIONS */}

                    {!loading &&
                        filteredConversations.length >
                            0 &&

                        filteredConversations.map(
                            (conversation) => {

                                const latestMessage =
                                    getLatestMessage(
                                        conversation
                                    );

                                return (

                                    <button
                                        key={
                                            conversation.id
                                        }
                                        className={`conversation ${
                                            selectedConversation?.id ===
                                            conversation.id
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            selectConversation(
                                                conversation
                                            )
                                        }
                                    >


                                        {/* TOP ROW */}

                                        <div className="conversation-top">

                                            <strong>

                                                {
                                                    conversation.userName
                                                }

                                            </strong>


                                            <span>

                                                {formatDate(
                                                    latestMessage?.createdAt
                                                )}

                                            </span>

                                        </div>


                                        {/* EMAIL */}

                                        <div className="conversation-email">

                                            {
                                                conversation.email
                                            }

                                        </div>


                                        {/* MESSAGE PREVIEW */}

                                        <p>

                                            {latestMessage
                                                ?.message ||
                                                "No message"}

                                        </p>

                                    </button>

                                );
                            }
                        )}

                </section>


                <section className="message-view">


                    {/* NOTHING SELECTED */}

                    {!selectedConversation && (

                        <div className="no-conversation">

                            <div className="mail-icon">
                                ✉
                            </div>

                            <h3>
                                Select a conversation
                            </h3>

                            <p>
                                Choose a message from
                                your inbox to view the
                                conversation.
                            </p>

                        </div>

                    )}


                    {/* CONVERSATION SELECTED */}

                    {selectedConversation && (

                        <>


                            <div className="message-header">

                                <div>

                                    <h3>

                                        {
                                            selectedConversation.userName
                                        }

                                    </h3>

                                    <p>

                                        {
                                            selectedConversation.email
                                        }

                                    </p>

                                </div>


                                <button
                                    className="star-btn"
                                    title="Star conversation"
                                >
                                    ⭐
                                </button>

                            </div>



                            <div className="messages-area">

                                {selectedConversation
                                    .messages
                                    ?.length ===
                                    0 && (

                                    <div className="empty-message">

                                        No messages in
                                        this conversation.

                                    </div>

                                )}


                                {selectedConversation.messages?.map(
                                    (message) => (

                                        <div
                                            key={
                                                message.id
                                            }
                                            className={`message ${
                                                message.sender ===
                                                "ADMIN"
                                                    ? "admin-message"
                                                    : "customer-message"
                                            }`}
                                        >


                                            {/* SENDER */}

                                            <div className="message-name">

                                                {message.sender ===
                                                "ADMIN"
                                                    ? "You"
                                                    : selectedConversation.userName}

                                            </div>


                                            {/* MESSAGE */}

                                            <div className="message-bubble">

                                                {
                                                    message.message
                                                }

                                            </div>


                                            {/* DATE */}

                                            <small>

                                                {formatDateTime(
                                                    message.createdAt
                                                )}

                                            </small>

                                        </div>

                                    )
                                )}

                            </div>

                            <div className="reply-area">

                                <textarea
                                    placeholder="Write a reply..."
                                    value={reply}
                                    onChange={(event) =>
                                        setReply(
                                            event.target.value
                                        )
                                    }
                                    disabled={sending}
                                />
                                <button
        onClick={sendReply}
        disabled={sending || !reply.trim()}
    >
        {sending ? "Sending..." : "Send"}
    </button>

                            </div>

                        </>

                    )}

                </section>

            </div>

        </div>
    );
}