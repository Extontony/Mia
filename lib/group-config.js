const config = require('../config');
// NOTE: The complete code depends on the 'get' function if you want per-group messages
// const { get } = require('./database'); 

/**
 * Manages group participant events (addition or removal).
 * @param {import('@whiskeysockets/baileys').WASocket} conn The Baileys connection socket.
 * @param {import('@whiskeysockets/baileys').GroupParticipantsUpdate} update The participant update object.
 */
async function groupEvents(conn, update) {
    // Configuration variables (Ensure they exist in config.js)
    const isWelcomeEnabled = config.WELCOME_ENABLE === 'true'; 
    const isGoodbyeEnabled = config.GOODBYE_ENABLE === 'true'; 
    
    if (!isWelcomeEnabled && !isGoodbyeEnabled) return;

    try {
        const metadata = await conn.groupMetadata(update.id);
        const groupName = metadata.subject;
        const groupJid = update.id;
        const participants = update.participants;

        for (const participantJid of participants) {
            const username = `@${participantJid.split('@')[0]}`;
            
            // 1. WELCOME MESSAGE MANAGEMENT (ADD)
            if (update.action === 'add' && isWelcomeEnabled) {
                
                const defaultWelcomeMsg = 
`*╭─「 WELCOME TO THE CREW 」─◇*
*│*
*│* *🌟 ɴᴇᴡ ᴍᴇᴍʙᴇʀ ᴀʀʀɪᴠᴇᴅ!*
*│* *👋 ʜᴇʟʟᴏ:* ${username}
*│* *🏰 ɢʀᴏᴜᴘ:* ${groupName}
*│* *📝 ʀᴜʟᴇs:* Please read the rules in the group description.
*│*
*╰────────────────────○*`;
                
                const welcomeText = config.WELCOME_MSG || defaultWelcomeMsg;

                const message = welcomeText
                    .replace(/@user/g, username)
                    .replace(/@group/g, groupName);

                // Send welcome image if configured
                if (config.WELCOME_IMAGE && config.WELCOME_IMAGE.length > 5) {
                    await conn.sendMessage(groupJid, {
                        image: { url: config.WELCOME_IMAGE },
                        caption: message,
                        mentions: [participantJid]
                    });
                } else {
                    await conn.sendMessage(groupJid, { text: message, mentions: [participantJid] });
                }
            }
            
            // 2. GOODBYE MESSAGE MANAGEMENT (REMOVE)
            else if (update.action === 'remove' && isGoodbyeEnabled) {
                
                const defaultGoodbyeMsg = 
`*╭─「 FAREWELL LEGEND 」─◇*
*│*
*│* *😔 ᴍᴇᴍʙᴇʀ ʟᴇғᴛ ᴛʜᴇ ᴄʜᴀᴛ...*
*│* *👤 ʙʏᴇ ʙʏᴇ:* ${username}
*│* *📢 ᴍsɢ:* We hope to see you again soon!
*│*
*╰────────────────────○*`;
                
                const goodbyeText = config.GOODBYE_MSG || defaultGoodbyeMsg;

                const message = goodbyeText
                    .replace(/@user/g, username)
                    .replace(/@group/g, groupName);
                
                // Send goodbye image if configured
                if (config.GOODBYE_IMAGE && config.GOODBYE_IMAGE.length > 5) {
                    await conn.sendMessage(groupJid, {
                        image: { url: config.GOODBYE_IMAGE },
                        caption: message,
                        mentions: [participantJid]
                    });
                } else {
                    await conn.sendMessage(groupJid, { text: message, mentions: [participantJid] });
                }
            }
        }
    } catch (e) {
        console.error("Group Events Error:", e.message);
    }
}

module.exports = {
    groupEvents
};
