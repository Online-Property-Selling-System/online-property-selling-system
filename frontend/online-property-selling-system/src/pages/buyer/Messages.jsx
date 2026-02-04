import { useState, useEffect, useRef } from "react";
import "./messages.css";

function Messages() {
  const [messages, setMessages] = useState([
    { id: 1, from: "seller", text: "Hello! How can I assist you today?", time: "10:05 AM" }
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  const sellerResponses = [
    "Sure! When would you like to visit?",
    "Yes, it's still available!",
    "Can you please share your preferred timing?",
    "I will arrange a site visit for you.",
    "Please check your mail for details."
  ];

  const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), from: "buyer", text: input, time: now() };
    setMessages(prev => [...prev, newMsg]);
    setInput("");

    simulateSellerReply();
  };

  const simulateSellerReply = () => {
    setTyping(true);

    setTimeout(() => {
      const reply = sellerResponses[Math.floor(Math.random() * sellerResponses.length)];
      const sellerMsg = { id: Date.now(), from: "seller", text: reply, time: now() };

      setMessages(prev => [...prev, sellerMsg]);
      setTyping(false);
    }, 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const addEmoji = (emoji) => setInput(input + emoji);

  return (
    <div className="messages-container">

      {/* HEADER */}
      <div className="chat-header">
        <div className="seller-info">
          <div className="avatar">AS</div>
          <div>
            <h6 className="fw-bold mb-0">Anjali Sharma</h6>
            <small className="text-success">Online</small>
          </div>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="chat-box custom-scroll">
        {messages.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.from}`}>
            <div className="chat-bubble">
              <p className="mb-1">{msg.text}</p>
              <small className="chat-time">{msg.time}</small>
            </div>
          </div>
        ))}

        {typing && (
          <div className="chat-message seller">
            <div className="chat-bubble typing-bubble">
              <span className="typing-dots"></span>
            </div>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* INPUT AREA */}
      <div className="chat-input-area">
        <button className="emoji-btn" onClick={() => addEmoji("😊")}>😊</button>

        <input
          type="text"
          className="chat-input"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          className="btn-send"
          onClick={sendMessage}
          disabled={!input.trim()}
        >
          <i className="bi bi-send-fill"></i>
        </button>
      </div>
    </div>
  );
}

export default Messages;
