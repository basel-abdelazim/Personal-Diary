// Import necessary libraries using ES Modules syntax
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Dynamically import node-fetch
import fetch from 'node-fetch';

// Initialize the express app
const app = express();

// Enable CORS globally
app.use(cors());

// Middleware to handle JSON requests
app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files if any

// Define the chatbot route that interacts with OpenAI API
app.post('/api/chat', async (req, res) => {
const userMessage = req.body.message;  // Get the user's message from the request body

// Log the incoming message for debugging
console.log("User message received: ", userMessage);

try {
// Send the user's message to the OpenAI API
const response = await fetch('https://api.openai.com/v1/chat/completions', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,  // Use environment variable
},
body: JSON.stringify({
model: 'gpt-3.5-turbo',
messages: [{ role: 'user', content: userMessage }],
max_tokens: 100,
}),
});
// Parse the response from OpenAI
const data = await response.json();
console.log('OpenAI API response:', data);  // Log the response for debugging

// If OpenAI returned valid choices, send the response back to the frontend
if (data.choices && data.choices.length > 0) {
    res.json({ reply: data.choices[0].message.content });
} else {
    res.json({ reply: 'Sorry, I couldn’t process that.' });
}
} catch (error) {
// Catch and log any errors interacting with the OpenAI API
console.error('Error interacting with OpenAI API:', error);
res.status(500).json({ reply: 'Error interacting with OpenAI API' });
}
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});