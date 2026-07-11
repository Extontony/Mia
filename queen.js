const axios = require('axios');

// AI-ONLY BOT - NO PREFIX NEEDED
// Responds to all messages using AI API

const events = {
    commands: [
        {
            on: 'text',
            dontAddCommandList: true,
            async function(conn, mek, m, ctx) {
                try {
                    const { from, body, isCmd } = ctx;
                    
                    // Skip if it's a command (has prefix)
                    if (isCmd) return;
                    
                    // Get user message
                    const userMessage = body.trim();
                    if (!userMessage || userMessage.length === 0) return;

                    // Show typing indicator
                    await conn.sendPresenceUpdate('composing', from);

                    // Call AI API
                    const apiUrl = `https://api.princetechn.com/api/ai/chat?apikey=prince&q=${encodeURIComponent(userMessage)}`;
                    
                    const response = await axios.get(apiUrl, {
                        timeout: 10000
                    });
                    
                    const aiReply = response.data.message || 
                                   response.data.reply || 
                                   response.data.result ||
                                   "Sorry, I couldn't understand that.";

                    // Send AI response
                    await conn.sendMessage(from, { text: aiReply }, { quoted: mek });

                } catch (error) {
                    console.error('AI Error:', error.message);
                    await conn.sendMessage(ctx.from, { text: '❌ Error: Unable to reach AI service' }, { quoted: mek });
                }
            }
        }
    ]
};

module.exports = events;