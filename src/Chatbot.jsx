import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Set the initial message from the bot
  useEffect(() => {
    const initialMessage1 = { text: 'Hello, this is SOGPT !', sender: 'bot' };
    const initialMessage2 = { text: 'How can I help you ?', sender: 'bot' };

    setMessages([initialMessage1, initialMessage2]);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input) return;

    const newMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, newMessage]);

    try {
      // Uncomment and adjust the URL as needed
      // const response = await axios.put('http://127.0.0.1:5000/chat', { message: input });
      const botResponse = { text: 'Hello!', sender: 'bot' }; // Placeholder response
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { text: "Sorry, something went wrong!", sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="chatbot-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          aria-label="Chat input"
        />
        <button type="submit" aria-label="Send message">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;