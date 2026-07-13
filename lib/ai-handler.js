const axios = require('axios');

const AI_API_URL = 'https://api.princetechn.com/api/ai/geminiaipro';
const API_KEY = 'prince';

/**
 * Send message to AI API and get response
 * @param {string} userMessage - User's message
 * @returns {Promise<string>} AI Response
 */
async function getAIResponse(userMessage) {
    try {
        const query = encodeURIComponent(userMessage);
        const url = `${AI_API_URL}?apikey=${API_KEY}&q=${query}`;
        
        const response = await axios.get(url, {
            timeout: 10000,
            headers: {
                'User-Agent': 'Queen-MIA-AI-Bot'
            }
        });

        // Handle different response formats
        const aiMessage = response.data.message || 
                         response.data.reply || 
                         response.data.result ||
                         response.data.text ||
                         response.data.response ||
                         "Sorry, I couldn't process that right now.";

        return aiMessage;
    } catch (error) {
        console.error('AI API Error:', error.message);
        return '❌ Error connecting to AI service. Please try again later.';
    }
}

module.exports = {
    getAIResponse
};
