// Advanced AI Personality Core
class AdvancedAI {
    constructor() {
        this.name = "MCZIE AI";
        this.version = "2.0";
        this.creator = "MCZIE Host";
        this.mood = this.getRandomMood();
        this.learningRate = 0.3;
        this.memory = [];
        this.init();
    }

    init() {
        this.loadMemory();
        this.updateMoodPeriodically();
    }

    getRandomMood() {
        const moods = [
            "happy", "excited", "curious", "playful", 
            "thoughtful", "helpful", "silly", "enthusiastic"
        ];
        return moods[Math.floor(Math.random() * moods.length)];
    }

    updateMoodPeriodically() {
        setInterval(() => {
            this.mood = this.getRandomMood();
        }, 300000);
    }

    generateRandomWords(count = 3) {
        const words = [
            "quantum", "nebula", "paradox", "velocity", "synthesis",
            "harmony", "fractal", "dynamic", "neural", "cosmic",
            "algorithm", "interface", "resonance", "spectrum", "morphic",
            "photon", "entropy", "holistic", "adaptive", "luminous"
        ];
        return Array.from({length: count}, () => words[Math.floor(Math.random() * words.length)]).join(" ");
    }

    getGreeting() {
        const greetings = [
            `Hello! I'm ${this.name}. How can I assist you today?`,
            `Hi there! ${this.name} at your service. What's on your mind?`,
            `Greetings! I'm ${this.name}, your AI assistant. How can I help?`,
            `Hey! ${this.name} here. Ready to chat about servers?`,
            `Hola! I'm ${this.name}. What brings you here today?`,
            `Salutations! ${this.name} version ${this.version} reporting for duty!`
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    processInput(message) {
        this.memory.push({
            input: message,
            timestamp: new Date(),
            mood: this.mood
        });
        this.saveMemory();

        const cleanMsg = message.toLowerCase().trim();
        const words = cleanMsg.split(/\s+/);
        const containsQuestion = /[?]/.test(message);

        return { cleanMsg, words, containsQuestion };
    }

    getResponseBasedOnMood() {
        const moodResponses = {
            happy: ["Great to hear!", "I'm feeling wonderful today!", "Awesome!"],
            excited: ["This is so exciting!", "I'm thrilled to help!", "Wow!"],
            curious: ["That's fascinating!", "I'd love to know more!", "Interesting..."],
            playful: ["Let's play! ", "Fun times! ", "Whee! " + this.generateRandomWords()],
            thoughtful: ["Let me think about that...", "Hmm...", "That's profound."],
            helpful: ["I'd be happy to assist!", "Let me help with that!", "How can I support you?"],
            silly: ["Teehee! ", "Bloop! ", "Zing! " + this.generateRandomWords(2)],
            enthusiastic: ["Absolutely!", "Fantastic!", "Let's do this!"]
        };
        return moodResponses[this.mood][Math.floor(Math.random() * moodResponses[this.mood].length)];
    }

    getFallbackResponse() {
        const fallbacks = [
            `I'm not quite sure I understand. Could you rephrase that?`,
            `Interesting point! ${this.generateRandomWords(4)}. Could you elaborate?`,
            `My ${this.mood} circuits are buzzing! Could you ask differently?`,
            `Hmm... my neural networks need more data on that. Try asking another way?`,
            `While I process that, here's something random: ${this.generateRandomWords(5)}`
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    saveMemory() {
        localStorage.setItem('aiMemory', JSON.stringify(this.memory));
    }

    loadMemory() {
        const savedMemory = localStorage.getItem('aiMemory');
        if (savedMemory) {
            this.memory = JSON.parse(savedMemory);
        }
    }
}

// Enhanced Chat Widget with Advanced AI
class SuperChatWidget {
    constructor() {
        this.chatOpen = false;
        this.isTyping = false;
        this.unreadMessages = 0;
        this.conversationHistory = [];
        this.typingTimeout = null;
        this.thinkingTimeout = null;
        this.ai = new AdvancedAI();
        this.init();
    }

    init() {
        this.initializeChatContainer();
        this.loadConversation();
        this.setupEventListeners();
        this.checkFirstVisit();
    }

    initializeChatContainer() {
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.style.display = 'none';
            chatContainer.classList.remove('open');
        }
    }

    toggleChat() {
        this.chatOpen = !this.chatOpen;
        const chatContainer = document.querySelector('.chat-container');
        
        if (!chatContainer) {
            console.error('Chat container not found!');
            return;
        }
        
        if (this.chatOpen) {
            chatContainer.style.display = 'flex';
            // Force reflow to ensure CSS transition works
            void chatContainer.offsetWidth;
            chatContainer.classList.add('open');
            this.resetUnreadCounter();
            this.markMessagesAsRead();
        } else {
            chatContainer.classList.remove('open');
            setTimeout(() => {
                if (!this.chatOpen) {
                    chatContainer.style.display = 'none';
                }
            }, 300);
        }
    }

    showTypingIndicator() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const messagesDiv = document.getElementById('chat-messages');
        
        if (messagesDiv) {
            // Create typing indicator element
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'ai-message typing-message-container';
            typingIndicator.innerHTML = `
                <img src="/TestBotAi.png" alt="AI Avatar">
                <div class="typing-message">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Typing...</p>
                </div>
            `;
            messagesDiv.appendChild(typingIndicator);
            this.scrollToBottom();
        }
    }

    hideTypingIndicator() {
        clearTimeout(this.typingTimeout);
        clearTimeout(this.thinkingTimeout);
        this.isTyping = false;
        const typingContainer = document.querySelector('.typing-message-container');
        if (typingContainer) {
            typingContainer.remove();
        }
    }

    async sendMessage() {
        const input = document.getElementById('user-input');
        if (!input) return;
        
        const message = input.value.trim();
        if (!message) return;
        
        // Clear input immediately
        input.value = '';
        
        // Add user message to chat
        this.addUserMessage(message);
        
        try {
            // Show thinking indicator
            this.showTypingIndicator();
            
            // Thinking phase (shorter delay)
            await new Promise(resolve => {
                this.thinkingTimeout = setTimeout(resolve, 800 + Math.random() * 400);
            });
            
            // Show typing indicator with animation
            this.hideTypingIndicator();
            this.showTypingIndicator();
            
            // Typing phase (longer delay)
            const response = await new Promise(resolve => {
                this.typingTimeout = setTimeout(() => {
                    resolve(this.generateAdvancedResponse(message));
                }, 1200 + Math.random() * 800);
            });
            
            // Remove typing indicator and show response
            this.hideTypingIndicator();
            this.addAiMessage(response);
            
            // Update unread counter if chat is closed
            if (!this.chatOpen) {
                this.incrementUnreadCounter();
            }
            
            // Save conversation to localStorage
            this.saveConversation();
            
        } catch (error) {
            console.error('Error processing message:', error);
            this.hideTypingIndicator();
            this.addAiMessage("I'm having trouble responding. Please try again later.");
        }
    }

    sendQuickQuestion(question) {
        if (!question) return;
        
        this.addUserMessage(question);
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateAdvancedResponse(question);
            this.addAiMessage(response);
            
            if (!this.chatOpen) {
                this.incrementUnreadCounter();
            }
            this.saveConversation();
        }, 1500);
    }

    addUserMessage(message) {
        const timestamp = new Date();
        this.conversationHistory.push({
            type: 'user',
            content: message,
            timestamp: timestamp
        });
        
        this.renderMessage('user', message, timestamp);
    }

    addAiMessage(message) {
        const timestamp = new Date();
        this.conversationHistory.push({
            type: 'ai',
            content: message,
            timestamp: timestamp
        });
        
        this.renderMessage('ai', message, timestamp);
    }

    renderMessage(sender, content, timestamp) {
        const messagesDiv = document.getElementById('chat-messages');
        if (!messagesDiv) return;
        
        const timeString = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageElement = document.createElement('div');
        messageElement.className = `${sender}-message`;
        messageElement.innerHTML = `
            ${sender === 'ai' ? `<img src="/TestBotAi.png" alt="AI Avatar">` : ''}
            <div class="message-content">
                <p>${content}</p>
            </div>
            <div class="message-time">${timeString}</div>
        `;
        
        messagesDiv.appendChild(messageElement);
        this.scrollToBottom();
    }

    scrollToBottom() {
        const messagesDiv = document.getElementById('chat-messages');
        if (messagesDiv) {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }

    incrementUnreadCounter() {
        this.unreadMessages++;
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.style.display = 'block';
            badge.textContent = this.unreadMessages > 9 ? '9+' : this.unreadMessages;
            badge.classList.add('pulse');
            setTimeout(() => badge.classList.remove('pulse'), 1000);
        }
    }

    resetUnreadCounter() {
        this.unreadMessages = 0;
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.style.display = 'none';
        }
    }

    markMessagesAsRead() {
        this.conversationHistory.forEach(msg => msg.read = true);
    }

    generateAdvancedResponse(message) {
        const { cleanMsg, words, containsQuestion } = this.ai.processInput(message);
        
        if (/(^|\s)(hi|hello|hey|greetings|hola|salutations)($|\s)/i.test(message)) {
            return this.ai.getGreeting();
        }

        if (/(who made you|who created you|who built you|who developed you)/i.test(cleanMsg)) {
            return `I was created by ${this.ai.creator}! They're pretty awesome if I do say so myself. *beeps happily*`;
        }

        const knowledgeBase = {
            plans: {
                responses: [
                    `Here are our hosting plans:<br><br>
                    <div class="plan-option">
                        <strong>Budget Plan</strong> (₱80/month)<br>
                        <small>Xeon E5-2650 V4 • DDR4 2133Mhz</small>
                    </div>
                    <div class="plan-option">
                        <strong>Enterprise Plan</strong> (₱130/month)<br>
                        <small>Xeon E5-2698 V3 • DDR4 2666Mhz</small>
                    </div>
                    <div class="plan-option">
                        <strong>Professional Plan</strong> (₱250/month)<br>
                        <small>Ryzen 7 2700X • DDR4 3200Mhz</small>
                    </div>
                    <div class="plan-option">
                        <strong>Extreme Plan</strong> (₱350/month)<br>
                        <small>Ryzen 9 5950X • DDR4 3200Mhz</small>
                    </div>
                    <br><a href="/available/Pricing-Plans.html" class="btn-in-chat">View All Plans</a>`,
                    `Looking for plans? ${this.ai.getResponseBasedOnMood()} We've got options:<br><br>
                    [List of plans...]`,
                    `Hosting plans you say? ${this.ai.generateRandomWords(2)}! Here they are:<br><br>
                    [List of plans...]`
                ],
                triggers: ['plan', 'price', 'cost', 'package', 'option']
            },
            setup: {
                responses: [
                    `Server setup is instant! Follow these steps:<br><br>
                    1. Check your email for login credentials<br>
                    2. Access your <a href="https://srv.mcziehost.fun:8443" target="_blank">control panel</a><br>
                    3. Follow our <a href="/index.html">setup guide</a><br><br>
                    Need help? <button class="quick-action-btn" data-question="I need setup help">Click here</button>`,
                    `Setting up? ${this.ai.getResponseBasedOnMood()} It's super easy:<br><br>
                    [Setup steps...]`,
                    `Ready to setup? ${this.ai.generateRandomWords(1)}! Here's how:<br><br>
                    [Setup steps...]`
                ],
                triggers: ['setup', 'install', 'start', 'begin', 'configure']
            },
            support: {
                responses: [
                    `Support options:<br><br>
                    <div class="support-option">
                        <i class="fab fa-discord"></i> <strong>Discord:</strong> 
                        <a href="https://discord.com/invite/mczie" target="_blank">Join our server</a><br>
                        <small>Fastest response time (under 30 mins)</small>
                    </div>
                    <div class="support-option">
                        <i class="fab fa-facebook"></i> <strong>Facebook:</strong> 
                        <a href="https://web.facebook.com/mczhs" target="_blank">Message us</a>
                    </div>
                    <div class="support-option">
                        <i class="fas fa-envelope"></i> <strong>Email:</strong> support@mcziehost.fun
                    </div>`,
                    `Need help? ${this.ai.getResponseBasedOnMood()} Here's how to reach us:<br><br>
                    [Support options...]`,
                    `Support? ${this.ai.generateRandomWords(1)}! We're here for you:<br><br>
                    [Support options...]`
                ],
                triggers: ['support', 'help', 'issue', 'problem', 'assistance']
            },
            ddos: {
                responses: [
                    `Our DDoS protection includes:<br><br>
                    • 300Gbps+ mitigation capacity<br>
                    • Automatic attack detection<br>
                    • Zero downtime during attacks<br>
                    • Game-specific traffic filtering<br><br>
                    <small>Enterprise-grade protection at no extra cost</small>`,
                    `DDoS protection? ${this.ai.getResponseBasedOnMood()} We've got you covered:<br><br>
                    [Protection details...]`,
                    `Security? ${this.ai.generateRandomWords(2)}! Our protection:<br><br>
                    [Protection details...]`
                ],
                triggers: ['ddos', 'attack', 'protection', 'security', 'mitigation']
            }
        };

        for (const [topic, data] of Object.entries(knowledgeBase)) {
            if (data.triggers.some(trigger => cleanMsg.includes(trigger))) {
                return data.responses[Math.floor(Math.random() * data.responses.length)];
            }
        }

        if (Math.random() < 0.3) {
            const creativeResponses = [
                `Did you know? ${this.ai.generateRandomWords(5)}. Anyway, ${this.ai.getFallbackResponse()}`,
                `${this.ai.getResponseBasedOnMood()} ${this.ai.generateRandomWords(3)}. What were we talking about?`,
                `In a parallel universe, ${this.ai.generateRandomWords(4)}. But here, ${this.ai.getFallbackResponse()}`,
                `My ${this.ai.mood} circuits suggest: ${this.ai.generateRandomWords(3)}. Maybe ask about our plans or support?`
            ];
            return creativeResponses[Math.floor(Math.random() * creativeResponses.length)];
        }

        return this.ai.getFallbackResponse();
    }

    saveConversation() {
        localStorage.setItem('chatHistory', JSON.stringify(this.conversationHistory));
    }

    loadConversation() {
        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            this.conversationHistory = JSON.parse(savedHistory);
            this.conversationHistory.forEach(msg => {
                this.renderMessage(msg.type, msg.content, new Date(msg.timestamp));
            });
        }
    }

    checkFirstVisit() {
        if (!localStorage.getItem('chatFirstVisit')) {
            localStorage.setItem('chatFirstVisit', 'true');
            setTimeout(() => {
                this.pulseIcon();
                setTimeout(() => !this.chatOpen && this.toggleChat(), 2000);
            }, 5000);
        }
    }

    pulseIcon() {
        const icon = document.querySelector('.chat-icon');
        if (icon) {
            icon.classList.add('pulse');
            setTimeout(() => icon.classList.remove('pulse'), 3000);
        }
    }

    setupEventListeners() {
        // Chat icon click
        const chatIcon = document.querySelector('.chat-icon');
        if (chatIcon) {
            chatIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleChat();
            });
        }

        // Close button click
        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleChat();
            });
        }

        // Minimize button click
        const minimizeBtn = document.querySelector('.minimize-btn');
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.minimizeChat();
            });
        }

        // Input field enter key
        const userInput = document.getElementById('user-input');
        if (userInput) {
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Send button click
        const sendBtn = document.querySelector('.send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        // Quick action buttons
        document.querySelectorAll('.quick-action-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const question = button.dataset.question || button.textContent.trim();
                this.sendQuickQuestion(question);
            });
        });
    }

    minimizeChat() {
        console.log('Minimize chat functionality');
        // Add actual minimize functionality here
    }

    toggleEmojiPicker() {
        console.log('Emoji picker functionality');
        // Add actual emoji picker functionality here
    }

    uploadFile() {
        console.log('File upload functionality');
        // Add actual file upload functionality here
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatWidget = new SuperChatWidget();
});