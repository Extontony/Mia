const mongoose = require('mongoose');

// Memory Schema for storing conversation history
const memorySchema = new mongoose.Schema({
    chatId: { type: String, required: true, unique: true },
    memories: [{
        role: { type: String, enum: ['user', 'assistant'], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        sender: String,
        messageType: String
    }],
    viewOnceOpened: [{
        messageId: String,
        content: String,
        sender: String,
        openedAt: { type: Date, default: Date.now }
    }],
    lastUpdated: { type: Date, default: Date.now },
    maxMemories: { type: Number, default: 50 }
});

const Memory = mongoose.model('Memory', memorySchema);

/**
 * Add a message to memory/conversation history
 */
async function addToMemory(chatId, role, content, senderInfo = {}) {
    try {
        let memory = await Memory.findOne({ chatId });
        
        if (!memory) {
            memory = new Memory({ chatId, memories: [] });
        }

        memory.memories.push({
            role,
            content,
            sender: senderInfo.sender || 'unknown',
            messageType: senderInfo.messageType || 'text'
        });

        // Keep only last 50 messages
        if (memory.memories.length > memory.maxMemories) {
            memory.memories = memory.memories.slice(-memory.maxMemories);
        }

        memory.lastUpdated = new Date();
        await memory.save();
        return true;
    } catch (e) {
        console.error('Error adding to memory:', e.message);
        return false;
    }
}

/**
 * Get conversation history/memory
 */
async function getMemory(chatId, limit = 20) {
    try {
        const memory = await Memory.findOne({ chatId });
        if (!memory) return [];
        
        // Return last 'limit' messages for context
        return memory.memories.slice(-limit);
    } catch (e) {
        console.error('Error getting memory:', e.message);
        return [];
    }
}

/**
 * Add view-once opened message to memory
 */
async function addViewOnceOpened(chatId, messageId, content, sender) {
    try {
        let memory = await Memory.findOne({ chatId });
        
        if (!memory) {
            memory = new Memory({ chatId });
        }

        memory.viewOnceOpened.push({
            messageId,
            content,
            sender
        });

        // Keep only last 100 view-once messages
        if (memory.viewOnceOpened.length > 100) {
            memory.viewOnceOpened = memory.viewOnceOpened.slice(-100);
        }

        memory.lastUpdated = new Date();
        await memory.save();
        return true;
    } catch (e) {
        console.error('Error adding view-once:', e.message);
        return false;
    }
}

/**
 * Get view-once opened messages
 */
async function getViewOnceOpened(chatId) {
    try {
        const memory = await Memory.findOne({ chatId });
        return memory ? memory.viewOnceOpened : [];
    } catch (e) {
        console.error('Error getting view-once:', e.message);
        return [];
    }
}

/**
 * Clear memory for a chat
 */
async function clearMemory(chatId) {
    try {
        await Memory.deleteOne({ chatId });
        return true;
    } catch (e) {
        console.error('Error clearing memory:', e.message);
        return false;
    }
}

/**
 * Get memory summary for AI context
 */
async function getMemorySummary(chatId, limit = 10) {
    try {
        const memories = await getMemory(chatId, limit);
        if (!memories || memories.length === 0) return '';

        const summary = memories
            .map(m => `${m.role === 'user' ? '👤' : '🤖'} ${m.sender || 'User'}: ${m.content.substring(0, 100)}`)
            .join('\n');

        return summary;
    } catch (e) {
        console.error('Error getting memory summary:', e.message);
        return '';
    }
}

module.exports = {
    Memory,
    addToMemory,
    getMemory,
    addViewOnceOpened,
    getViewOnceOpened,
    clearMemory,
    getMemorySummary
};
