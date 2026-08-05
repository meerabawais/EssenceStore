"use client";
import {useState} from "react";
import "./ForwardModal.css";

export default function ForwardModal({conversation,onClose,onSent}){
 const latestMessage =
        conversation.messages[
            conversation.messages.length - 1
        ];

    const [email, setEmail] = useState("");

    const [subject, setSubject] = useState(
        `Fwd: ${latestMessage.subject || "Message"}`
    );

    const [message, setMessage] = useState(

`---- Forwarded message ----

From: ${conversation.userName} <${conversation.email}>

Date: ${new Date(latestMessage.createdAt).toLocaleString()}

Subject: ${latestMessage.subject || ""}


${latestMessage.message}`

    );

    async function sendForward() {

        const response = await fetch(
            `/admin/api/messages/forward`,
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json",
                },

                body:JSON.stringify({

                    to: email,

                    subject,

                    message,

                }),

            }
        );

        if(response.ok){

            onSent();

        }

    }

    return (

<div className="forward-overlay">

<div className="forward-modal">

<div className="forward-header">

<h4>New message</h4>

<button onClick={onClose}>
×
</button>

</div>

<div className="forward-body">

<label>To</label>

<input

type="email"

value={email}

placeholder="recipient@example.com"

onChange={(e)=>setEmail(e.target.value)}

/>

<label>Subject</label>

<input

value={subject}

onChange={(e)=>setSubject(e.target.value)}

/>

<label>Message</label>

<textarea

rows={10}

value={message}

onChange={(e)=>setMessage(e.target.value)}

/>

</div>

<div className="forward-footer">

<button
className="btn btn-light"
onClick={onClose}
>

Discard

</button>

<button
className="btn btn-success"
onClick={sendForward}
>

Send

</button>

</div>

</div>

</div>

    );
}