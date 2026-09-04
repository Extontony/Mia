// ═══════════════════════════════════════════════════════════════════════
//
//                    QUEEN MIA  MD - BOT CONFIGURATION (SANITIZED)
//
// ═══════════════════════════════════════════════════════════════════════

const fs = require('fs');
const dotenv = require('dotenv');

// ────────────────────────────────────────────────────────────────────────
//  🔄 ENVIRONMENT LOADER
// ────────────────────────────────────────────────────────────────────────
if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
}

// ────────────────────────────────────────────────────────────────────────
//  📦 CONFIGURATION EXPORT
// ────────────────────────────────────────────────────────────────────────
module.exports = {

    // ═══════════════════════════════════════════════════════════════════
    //  🔐 SESSION & DATABASE
    // ═══════════════════════════════════════════════════════════════════
    
    /** 
     * @description Session ID for bot authentication and persistence
     * @type {string}
     * @default "MINI BOT"
     */
    SESSION_ID: process.env.SESSION_ID || "MINI BOT",
    
    /** 
     * @description MongoDB Atlas connection string (REQUIRED via env)
     * @type {string}
     * @default ""
     */
    MONGODB_URI: process.env.MONGODB_URI || '',

    // ═══════════════════════════════════════════════════════════════════
    //  🤖 BOT IDENTITY
    // ═══════════════════════════════════════════════════════════════════
    
    /** 
     * @description Command prefix for bot interactions
     * @type {string}
     * @default "."
     */
    PREFIX: process.env.PREFIX || '.',
    
    /** 
     * @description Owner's WhatsApp number with country code (set via env)
     * @type {string}
     * @default ""
     */
    OWNER_NUMBER: process.env.OWNER_NUMBER || '',
    
    /** 
     * @description Display name of the bot
     * @type {string}
     * @default "Queen Mia MD Mini"
     */
    BOT_NAME: process.env.BOT_NAME || "QUEEN MIA  MD Mini",
    
    /** 
     * @description Footer text for bot messages
     * @type {string}
     * @default "© ᴘᴏᴡᴇʀᴇᴅ ʙʏ QUEEN MIA -ᴍᴅ"
     */
    BOT_FOOTER: process.env.BOT_FOOTER || '© ᴘᴏᴡᴇʀᴇᴅ ʙʏ QUEEN MIA ',
    
    /** 
     * @description Bot work mode
     * @type {('public'|'private'|'group'|'inbox')}
     * @default "private"
     */
    WORK_TYPE: process.env.WORK_TYPE || "private",

    // ═══════════════════════════════════════════════════════════════════
    //  🤖 AI CONFIGURATION
    // ═══════════════════════════════════════════════════════════════════
    
    /** 
     * @description Enable AI mode - Responds to all messages without prefix
     * @type {string}
     * @default "true"
     */
    AI_MODE: process.env.AI_MODE || 'true',
    
    /** 
     * @description AI API URL (recommended to set via environment)
     * @type {string}
     * @default ""
     */
    AI_API_URL: process.env.AI_API_URL || '',
    
    /** 
     * @description AI API Key (REQUIRED via env)
     * @type {string}
     * @default ""
     */
    AI_API_KEY: process.env.AI_API_KEY || '',
    
    /** 
     * @description AI Response timeout in milliseconds
     * @type {number}
     * @default 10000
     */
    AI_TIMEOUT: process.env.AI_TIMEOUT || 10000,
    
    /** 
     * @description Enable memory/conversation history for AI
     * @type {string}
     * @default "true"
     */
    AI_MEMORY: process.env.AI_MEMORY || 'true',
    
    /** 
     * @description Enable view-once message opening
     * @type {string}
     * @default "true"
     */
    ANTI_VIEWONCE: process.env.ANTI_VIEWONCE || 'true',

    // ═══════════════════════════════════════════════════════════════════
    //  👁️ STATUS AUTOMATION
    // ═══════════════════════════════════════════════════════════════════
    
    /** 
     * @description Auto-view WhatsApp status updates
     * @type {string}
     * @default "true"
     */
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || 'true',
    
    /** 
     * @description Auto-like status updates with random emojis
     * @type {string}
     * @default "true"
     */
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'true',
    
    /** 
     * @description Emoji pool for auto-like feature
     * @type {string[]}
     */
    AUTO_LIKE_EMOJI: process.env.AUTO_LIKE_EMOJI ? process.env.AUTO_LIKE_EMOJI.split(',') : ['❤️', '🌹', '✨', '🥰', '😍', '💞', '💕', '☺️', '🤗'],
    
    /** 
     * @description Auto-reply to status updates
     * @type {string}
     * @default "false"
     */
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'false',
    
    /** 
     * @description Default message for status reply
     * @type {string}
     * @default "🤗"
     */
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || '🤗',

    // ═══════════════════════════════════════════════════════════════════
    //  💬 PRESENCE & CHAT SETTINGS
    // ═══════════════════════════════════════════════════════════════════
    
    /** 
     * @description Mark messages as read (blue ticks)
     * @type {string}
     * @default "false"
     */
    READ_MESSAGE: process.env.READ_MESSAGE || 'false',
    
    /** 
     * @description Show typing indicator in chat
     * @type {string}
     * @default "false"
     */
    AUTO_TYPING: process.env.AUTO_TYPING || 'false',
    
    /** 
     * @description Show recording indicator in chat
     * @type {string}
     * @default "false"
     */
    AUTO_RECORDING: process.env.AUTO_RECORDING || 'false',

    // ═══════════════════════════════════════════════════════════════════
    //  👥 GROUP MANAGEMENT
    // ═══════════════════════════════════════════════════════════════════
    
    /** 
     * @description Send welcome message when new member joins
     * @type {string}
     * @default "true"
     */
    WELCOME_ENABLE: process.env.WELCOME_ENABLE || 'true',
    
    /** 
     * @description Send goodbye message when member leaves
     * @type {string}
     * @default "true"
     */
    GOODBYE_ENABLE: process.env.GOODBYE_ENABLE || 'true',
    
    /** 
     * @description Custom welcome message (null = use default)
     * @type {string|null}
     * @default null
     */
    WELCOME_MSG: process.env.WELCOME_MSG || null,
    
    /** 
     * @description Custom goodbye message (null = use default)
     * @type {string|null}
     * @default null
     */
    GOODBYE_MSG: process.env.GOODBYE_MSG || null,
    
    /** 
     * @description Custom welcome image URL (null = use default)
     * @type {string|null}
     * @default null
     */
    WELCOME_IMAGE: process.env.WELCOME_IMAGE || null,
    
    /** 
     * @description Custom goodbye image URL (null = use default)
     * @type {string|null}
     * @default null
     */
    GOODBYE_IMAGE: process.env.GOODBYE_IMAGE || null,
    
    /** 
     * @description WhatsApp group invite link (set via env if needed)
     * @type {string|null}
     */
    GROUP_INVITE_LINK: process.env.GROUP_INVITE_LINK || null,

    // ═══════════════════════════════════════════════════════════════════
    //  🛡️ SECURITY & ANTI-CALL
    // ═══════════════════════════════════════════════════════════════════
    
    /** 
     * @description Reject incoming calls automatically
     * @type {string}
     * @default "false"
     */
    ANTI_CALL: process.env.ANTI_CALL || 'false',
    
    /** 
     * @description Message sent when rejecting calls
     * @type {string}
     * @default "*CALL LATER PLEASE ☺️🌹*"
     */
    REJECT_MSG: process.env.REJECT_MSG || '*CALL LATER PLEASE ☺️🌹*',

    // ═══════════════════════════════════════════════════════════════════
    //  🖼️ MEDIA & LINKS
    // ═══════════════════════════════════════════════════════════════════
    
    /** 
     * @description Default bot profile image path/URL (set via env)
     * @type {string|null}
     */
    IMAGE_PATH: process.env.IMAGE_PATH || null,
    
    /** 
     * @description WhatsApp channel link for updates (set via env)
     * @type {string|null}
     */
    CHANNEL_LINK: process.env.CHANNEL_LINK || null,

    // ═══════════════════════════════════════════════════════════════════
    //  📡 EXTERNAL API INTEGRATIONS
    // ═══════════════════════════════════════════════════════════════════
    
    /** 
     * @description Telegram bot token for notifications (REQUIRED via env)
     * @type {string}
     * @default ""
     */
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
    
    /** 
     * @description Telegram chat ID for sending notifications
     * @type {string}
     * @default ""
     */
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || ''

};

// ────────────────────────────────────────────────────────────────────────
//  📖 USAGE EXAMPLES
// ────────────────────────────────────────────────────────────────────────

/**
 * @example
 * // Import configuration
 * const config = require('./config');
 * 
 * // Access bot settings
 * console.log(`Bot: ${config.BOT_NAME}`);
 * console.log(`Prefix: ${config.PREFIX}`);
 * console.log(`Owner: ${config.OWNER_NUMBER}`);
 * console.log(`Work Type: ${config.WORK_TYPE}`);
 * 
 * // Check if AI mode is enabled
 * if (config.AI_MODE === 'true') {
 *     console.log('AI mode is active');
 * }
 * 
 * // Check if memory is enabled
 * if (config.AI_MEMORY === 'true') {
 *     console.log('Conversation memory is active');
 * }
 */

// ────────────────────────────────────────────────────────────────────────
//  🏷️ EXPORT METADATA
// ────────────────────────────────────────────────────────────────────────

/**
 * @module config
 * @description QUEEN MIA  MD Bot Configuration Module (sanitized defaults)
 * @version 2.2.0
 * @queen Mia MD
 * @license MIT
 * @features
 * - AI Mode with configurable API
 * - Conversation Memory System
 * - View-Once Message Opening
 * - Private Mode (DM only)
 */
