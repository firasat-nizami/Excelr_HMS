import React, { useEffect, useState, useRef } from 'react';
import { save, load } from '../utils/storage';

const Messages = ({ initialMessages = [] }) => {
  const [chatPatients, setChatPatients] = useState(() => load('chatPatients', initialMessages));
  const [active, setActive] = useState(null);
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    save('chatPatients', chatPatients);
  }, [chatPatients]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatPatients, active]);

  const openChat = i => setActive(i);

  const sendMessage = () => {
    if (active === null || !text.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatPatients(prev =>
      prev.map((p, idx) =>
        idx === active
          ? {
              ...p,
              messages: [...(p.messages || []), { text: text.trim(), type: 'sent', time }]
            }
          : p
      )
    );
    setText('');

    // Simulate auto-reply
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatPatients(prev =>
        prev.map((p, idx) =>
          idx === active
            ? {
                ...p,
                messages: [...(p.messages || []), { text: 'Thank you, Doctor!', type: 'received', time: replyTime }]
              }
            : p
        )
      );
    }, 1500);
  };

  return (
    <div className="messages-container">
      {/* Patients list */}
      <div className="card patients-list">
        <h3>Patients</h3>
        <ul className="chat-list">
          {chatPatients.map((p, i) => (
            <li key={i} className={active === i ? 'active' : ''} onClick={() => openChat(i)}>
              {p.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat window */}
      <div className="card chat-window">
        {active === null ? (
          <p style={{ textAlign: 'center', marginTop: '50%' }}>Select a patient to open chat</p>
        ) : (
          <>
            <div className="messages" >
              {(chatPatients[active].messages || []).map((m, i) => (
                <div key={i} className={`message ${m.type}`}>
                  <div>{m.text}</div>
                  <small>{m.time}</small>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
              <input
                className="input"
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => { if(e.key === 'Enter') sendMessage() }}
                placeholder="Type a message..."
              />
              <button className="btn btn-primary" onClick={sendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;
