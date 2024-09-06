import React, { useState } from 'react';

const Chatbot = () => {
const [messages, setMessages] = useState([]);
const [userInput, setUserInput] = useState('');
const [isSending, setIsSending] = useState(false);  // To manage loading state

const sendMessage = async () => {
if (userInput.trim() === '' || isSending) return;  // Avoid sending if input is empty or already sending

setIsSending(true);  // Disable sending while waiting for a response

// Add the user's message to the chat
setMessages([...messages, { sender: 'You', text: userInput }]);
setUserInput('');  // Clear input field

try {
// Send the user's message to your backend API (which handles the OpenAI API)
const response = await fetch('http://localhost:3000/api/chat', {  // Full URL for backend
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ message: userInput }),
});

if (!response.ok) {
throw new Error(`Server error: ${response.status}`);
}

const data = await response.json();
const chatbotReply = data.reply;

// Add the chatbot's reply to the chat
setMessages(prevMessages => [...prevMessages, { sender: 'XCopilot', text: chatbotReply }]);
} catch (error) {
    console.error('Error sending message:', error);
    // Optionally add a message to the chat indicating there was an error
    setMessages(prevMessages => [...prevMessages, { sender: 'Error', text: 'Could not get a reply from the chatbot.' }]);
} finally {
    setIsSending(false);  // Re-enable sending after response or error
}
};

return (
<div id="chatbot" style={styles.chatbotContainer}>
    <h3>Chat with XCopilot</h3>
    <div id="chat-window" style={styles.chatWindow}>
    {messages.map((msg, index) => (
        <div key={index} className="message" style={styles.message}>
        <strong>{msg.sender}:</strong> {msg.text}
        </div>
    ))}
    </div>
    <textarea
    id="user-input"
    value={userInput}
    onChange={(e) => setUserInput(e.target.value)}
    placeholder="Ask me anything to help with your diary entry..."
    style={styles.textarea}
    disabled={isSending}  // Disable input while sending
    />
    <button id="send-btn" onClick={sendMessage} style={styles.button} disabled={isSending}>
    {isSending ? 'Sending...' : 'Send'}  {/* Display sending status */}
    </button>
</div>
);
};

const styles = {
chatbotContainer: {
border: '1px solid #ccc',
padding: '20px',
width: '300px',
marginTop: '20px',
},
chatWindow: {
height: '200px',
overflowY: 'scroll',
backgroundColor: '#f1f1f1',
padding: '10px',
marginBottom: '10px',
},
message: {
marginBottom: '10px',
},
textarea: {
width: '100%',
height: '50px',
},
button: {
width: '100%',
padding: '10px',
backgroundColor: '#007bff',
color: '#fff',
border: 'none',
cursor: 'pointer',
},
};

export default Chatbot;