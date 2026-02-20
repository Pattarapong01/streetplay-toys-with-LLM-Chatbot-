import React, { useState } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<{ role: string, text: string }[]>([]);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    // บันทึกข้อความที่เราพิมพ์
    const newLog = [...chatLog, { role: 'user', text: message }];
    setChatLog(newLog);
    setMessage('');

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: "test_user", // ID สำหรับจำประวัติการคุย
          message: message
        }),
      });
      const data = await response.json();
      // บันทึกคำตอบจากบอท (ที่จะลงท้ายด้วย yo yo)
      setChatLog([...newLog, { role: 'bot', text: data.reply }]);
    } catch (error) {
      setChatLog([...newLog, { role: 'bot', text: "Error: Can't connect to server yo yo." }]);
    }
  };

  return (
    <div className="chat-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">SP Assistant 🤖</div>
          <div className="chat-messages">
            {chatLog.map((msg, i) => (
              <div key={i} className={`message ${msg.role}`}>{msg.text}</div>
            ))}
          </div>
          <div className="chat-input">
            <input 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type here..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
      <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✖' : '💬'}
      </button>
    </div>
  );
};

export default ChatWidget;