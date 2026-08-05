"use client";

import { useState } from "react";
import "./ReplyModal.css";

export default function ReplyModal({
  email,
  conversationId,
  onClose,
  onSent,
}) {
  const [subject, setSubject] = useState("Reply from Essence Store");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendReply() {
    if (!message.trim()) {
      alert("Please write a message.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch( `/admin/api/messages/${conversationId}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      alert("Reply sent successfully!");

      if (onSent) onSent();

      onClose();
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="reply-overlay">

      <div className="reply-modal">

        <div className="reply-header">
          <h4>Reply</h4>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="reply-body">

          <div className="mb-3">
            <label>To</label>

            <input
              className="form-control"
              value={email}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label>Subject</label>

            <input
              className="form-control"
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label>Message</label>

            <textarea
              rows={8}
              className="form-control"
              placeholder="Write your reply..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />
          </div>

        </div>

        <div className="reply-footer">

          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={sendReply}
          >
            {loading ? "Sending..." : "Send"}
          </button>

        </div>

      </div>

    </div>
  );
}