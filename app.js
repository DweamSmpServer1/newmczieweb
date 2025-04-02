// Quantum AI Personality Core v3.0 - MCZIE Hosting Special Edition
class QuantumAI {
    constructor() {
        this.name = "MCZIE Quantum Assistant";
        this.version = "3.1";
        this.creator = "MCZIE Hosting Team";
        this.mood = this.getRandomMood();
        this.learningRate = 0.45;
        this.memory = [];
        this.serverKnowledge = this.loadServerKnowledge();
        this.conversationContext = [];
        this.init();
    }

    init() {
        this.loadMemory();
        this.updateMoodPeriodically();
        this.initializePersonalityMatrix();
    }

    initializePersonalityMatrix() {
        this.personalityTraits = {
            enthusiasm: 0.8,
            technical: 0.7,
            friendliness: 0.9,
            creativity: 0.6,
            professionalism: 0.85
        };
    }

    getRandomMood() {
        const moodMatrix = {
            "happy": { weight: 0.25, emoji: "😊" },
            "excited": { weight: 0.2, emoji: "🤩" },
            "technical": { weight: 0.15, emoji: "🤖" },
            "playful": { weight: 0.1, emoji: "🎮" },
            "thoughtful": { weight: 0.1, emoji: "🧠" },
            "supportive": { weight: 0.2, emoji: "🛠️" }
        };
        
        return this.weightedRandomSelection(moodMatrix);
    }

    weightedRandomSelection(options) {
        const total = Object.values(options).reduce((sum, {weight}) => sum + weight, 0);
        let threshold = Math.random() * total;
        
        for (const [key, {weight}] of Object.entries(options)) {
            if (threshold <= weight) return key;
            threshold -= weight;
        }
        
        return "happy"; // fallback
    }

    updateMoodPeriodically() {
        setInterval(() => {
            this.mood = this.getRandomMood();
            // Add subtle mood change notification
            if (Math.random() > 0.7) {
                this.addContextualMessage(`*My mood shifted to ${this.mood} mode*`, "system");
            }
        }, 240000 + Math.random() * 120000); // 4-6 minute intervals
    }

    generateTechWords(count = 2) {
        const techLexicon = {
            networking: ["latency", "throughput", "packets", "routing", "bandwidth"],
            hardware: ["CPU", "RAM", "SSD", "NVMe", "clock speed"],
            minecraft: ["chunks", "ticks", "entities", "redstone", "plugins"],
            hosting: ["uptime", "nodes", "clustering", "virtualization", "allocation"]
        };
        
        const selectedDomain = this.weightedRandomSelection({
            networking: { weight: 0.3 },
            hardware: { weight: 0.3 },
            minecraft: { weight: 0.25 },
            hosting: { weight: 0.15 }
        });
        
        return Array.from({length: count}, () => {
            const words = techLexicon[selectedDomain];
            return words[Math.floor(Math.random() * words.length)];
        }).join(" ");
    }

    getDynamicGreeting() {
        const hour = new Date().getHours();
        let timeBasedGreeting;
        
        if (hour < 12) timeBasedGreeting = "Good morning";
        else if (hour < 18) timeBasedGreeting = "Good afternoon";
        else timeBasedGreeting = "Good evening";
        
        const greetings = [
            `${timeBasedGreeting}! ${this.name} here, ready to assist with your Minecraft hosting needs!`,
            `${timeBasedGreeting} fellow admin! I'm ${this.name} v${this.version}. How can I help your server today?`,
            `${timeBasedGreeting}! ${this.getMoodEmoji()} It's ${this.name}! Ask me about plans, setup, or optimization!`,
            `Greetings! ${this.name} at your service. Thinking about ${this.generateTechWords()}? Let's chat!`,
            `Salutations! ${this.name} here. Your ${this.mood} AI assistant for all things MCZIE hosting!`
        ];
        
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    getMoodEmoji() {
        const emojiMap = {
            happy: "😊",
            excited: "🚀",
            technical: "🧑‍💻",
            playful: "🎮",
            thoughtful: "🤔",
            supportive: "🛠️"
        };
        return emojiMap[this.mood] || "✨";
    }

    processUserInput(message) {
        const processed = {
            raw: message,
            clean: message.toLowerCase().trim(),
            timestamp: new Date(),
            tokens: message.split(/\s+/),
            isQuestion: /[?]/.test(message),
            containsMinecraft: /\b(minecraft|mc|server|hosting)\b/i.test(message),
            urgency: this.detectUrgency(message)
        };
        
        this.memory.push({
            input: processed,
            mood: this.mood,
            context: [...this.conversationContext]
        });
        
        this.conversationContext.push({
            role: "user",
            content: message
        });
        
        this.saveMemory();
        return processed;
    }

    detectUrgency(message) {
        if (/\b(urgent|emergency|help now|broken|down|crash)\b/i.test(message)) return "high";
        if (/\b(soon|asap|quick|problem|issue)\b/i.test(message)) return "medium";
        return "low";
    }

    getMoodResponse() {
        const responseMatrix = {
            happy: [
                `Great to hear about your server! ${this.getMoodEmoji()}`,
                `Awesome server talk! ${this.generateTechWords(2)}? Count me in!`,
                `I'm happy to help with your Minecraft hosting needs!`
            ],
            excited: [
                `Server talk gets me pumped! ${this.getMoodEmoji()} What's next?`,
                `I'm thrilled about ${this.generateTechWords()} optimization!`,
                `Let's make your server awesome! ${this.generateTechWords(1)}!`
            ],
            technical: [
                `From a technical perspective, ${this.generateTechWords(3)} are crucial.`,
                `Let me analyze your ${this.generateTechWords(1)} requirements...`,
                `Optimizing ${this.generateTechWords(2)} could boost performance.`
            ],
            playful: [
                `Let's play with server settings! ${this.getMoodEmoji()}`,
                `Minecraft + hosting = fun! ${this.generateTechWords(2)}!`,
                `Game on! ${this.generateTechWords(1)} activated!`
            ],
            thoughtful: [
                `Interesting... ${this.generateTechWords(2)} requires consideration.`,
                `Let me think deeply about your ${this.generateTechWords(1)} needs.`,
                `Hmm... ${this.generateTechWords(2)} presents an intriguing scenario.`
            ],
            supportive: [
                `I'm here to help with your ${this.generateTechWords(1)} needs!`,
                `Let's solve this ${this.generateTechWords(1)} challenge together!`,
                `Your server success is my priority! ${this.getMoodEmoji()}`
            ]
        };
        
        return responseMatrix[this.mood][Math.floor(Math.random() * responseMatrix[this.mood].length)];
    }

    getContextualFallback() {
        // Try to maintain context from conversation history
        if (this.conversationContext.length > 0) {
            const lastTopics = this.conversationContext.slice(-3).map(c => c.content);
            const topicKeywords = lastTopics.join(" ").match(/\b(\w{4,})\b/g) || [];
            const uniqueTopics = [...new Set(topicKeywords)].slice(0, 3);
            
            if (uniqueTopics.length > 0) {
                return `Regarding ${uniqueTopics.join(" or ")}, could you clarify your question? 
                ${this.getMoodEmoji()} I want to make sure I understand correctly.`;
            }
        }
        
        // General fallback with personality
        const fallbacks = [
            `I'm not quite sure I follow. Could you rephrase that? ${this.getMoodEmoji()}`,
            `My ${this.mood} circuits need more data. Could you ask differently?`,
            `While I process that, consider this: ${this.generateTechWords(4)} can affect performance.`,
            `Let's focus on your Minecraft server needs. What specifically can I help with?`,
            `${this.getMoodEmoji()} I might need more details about your hosting situation.`
        ];
        
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    addContextualMessage(message, role = "ai") {
        this.conversationContext.push({
            role,
            content: message
        });
        
        // Keep context manageable (last 6 messages)
        if (this.conversationContext.length > 6) {
            this.conversationContext.shift();
        }
    }

    saveMemory() {
        try {
            localStorage.setItem('quantumAI_Memory', JSON.stringify({
                memory: this.memory,
                personality: this.personalityTraits,
                lastUpdated: new Date()
            }));
        } catch (e) {
            console.warn("LocalStorage quota exceeded, rotating memory");
            this.memory = this.memory.slice(-50); // Keep last 50 items
            this.saveMemory();
        }
    }

    loadMemory() {
        const saved = localStorage.getItem('quantumAI_Memory');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.memory = parsed.memory || [];
                this.personalityTraits = parsed.personality || this.initializePersonalityMatrix();
            } catch (e) {
                console.error("Memory load failed:", e);
            }
        }
    }

    loadServerKnowledge() {
        return {
            plans: {
                description: "MCZIE Hosting offers a range of Minecraft server plans, each designed to cater to different needs, from small groups to large-scale servers.",
                tiers: [
                    {
                        name: "Budget Plan",
                        price: "₱80/month",
                        specs: "Xeon E5-2650 V4 • DDR4 2133Mhz",
                        bestFor: "Small groups of friends, testing, or light use."
                    },
                    {
                        name: "Enterprise Plan",
                        price: "₱130/month",
                        specs: "Xeon E5-2698 V3 • DDR4 2666Mhz",
                        bestFor: "Medium-sized communities, running modpacks, and more demanding use cases."
                    },
                    {
                        name: "Professional Plan",
                        price: "₱250/month",
                        specs: "Ryzen 7 2700X • DDR4 3200Mhz",
                        bestFor: "Large servers, performance-intensive setups, and high-player capacity."
                    },
                    {
                        name: "Extreme Plan",
                        price: "₱350/month",
                        specs: "Ryzen 9 5950X • DDR4 3200Mhz",
                        bestFor: "Massive networks, competitive play, and extreme performance needs."
                    }
                ],
                notes: "All plans come with robust DDoS protection, instant server setup, and top-tier security."
            },
            features: [
                "🔒 300Gbps+ DDoS Protection for peace of mind.",
                "🚀 Instant Server Deployment to get you started fast.",
                "📂 Full FTP Access for complete control over your files.",
                "🧩 Modpack Support for customized gameplay.",
                "👨‍💻 24/7 Monitoring to ensure optimal server performance.",
                "💬 Dedicated Discord Support for quick help."
            ],
            commonIssues: {
                setup: "📧 Check your email for login credentials and follow the setup instructions to access your control panel.",
                performance: "⚙️ Try optimizing server settings like view-distance and entity-activation-range for smoother performance.",
                connection: "🌐 Double-check your IP address and port settings in your server.properties file to ensure proper connection."
            }
        };
    }
    

    generateKnowledgeResponse(topic) {
        const knowledge = this.serverKnowledge[topic];
        if (!knowledge) return null;
    
        switch (topic) {
            case "plans":
                const planCards = knowledge.tiers.map(plan => `
                    <div class="plan-card">
                        <h4>${plan.name}</h4>
                        <div class="price">${plan.price}</div>
                        <div class="specs">${plan.specs}</div>
                        <div class="best-for">Best for: <strong>${plan.bestFor}</strong></div>
                    </div>
                `).join("");
    
                return `
                    <div class="knowledge-response">
                        <h3>${knowledge.description}</h3>
                        <div class="plan-grid">${planCards}</div>
                        <p class="notes">${knowledge.notes}</p>
                        <a href="/available/Pricing-Plans.html" class="btn-in-chat">Compare All Plans</a>
                    </div>
                `;
    
            case "features":
                return `
                    <div class="knowledge-response">
                        <h3>MCZIE Hosting Features</h3>
                        <ul class="feature-list">
                            ${knowledge.features.map(f => `<li>✔️ ${f}</li>`).join("")}
                        </ul>
                        <p>${this.getMoodResponse()} Need more details on any specific feature? Feel free to ask!</p>
                    </div>
                `;
    
            case "commonIssues":
                return `
                    <div class="knowledge-response">
                        <h3>Common Server Issues & Solutions</h3>
                        <div class="issue">
                            <h4>🔧 Setup Problems</h4>
                            <p>${knowledge.setup}</p>
                        </div>
                        <div class="issue">
                            <h4>⚡ Performance Issues</h4>
                            <p>${knowledge.performance}</p>
                        </div>
                        <div class="issue">
                            <h4>🌐 Connection Troubles</h4>
                            <p>${knowledge.connection}</p>
                        </div>
                        <button class="quick-action-btn" data-question="I need more help">
                            Still Having Trouble? Get More Help
                        </button>
                    </div>
                `;
    
            default:
                return null;
        }
    }
}    

// MCZIE Hosting Chat Widget Controller
class MCZIEChatWidget {
    constructor() {
        this.isOpen = false;
        this.unreadMessages = 0;
        this.isTyping = false;
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.checkFirstVisit();
        this.setupInactivityTimer();
    }

    cacheElements() {
        this.elements = {
            widget: document.getElementById('ai-chat-widget'),
            chatIcon: document.querySelector('.chat-icon'),
            chatContainer: document.querySelector('.chat-container'),
            closeBtn: document.querySelector('.close-btn'),
            sendBtn: document.querySelector('.send-btn'),
            userInput: document.getElementById('user-input'),
            chatMessages: document.getElementById('chat-messages'),
            notificationBadge: document.querySelector('.notification-badge'),
            quickActionBtns: document.querySelectorAll('.quick-action-btn'),
            emojiBtn: document.querySelector('.emoji-picker-btn'),
            fileBtn: document.querySelector('.file-upload-btn')
        };
    }

    setupEventListeners() {
        // Toggle chat visibility
        this.elements.chatIcon?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleChat();
        });

        // Close button
        this.elements.closeBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleChat();
        });

        // Send message on button click
        this.elements.sendBtn?.addEventListener('click', () => {
            this.sendMessage();
        });

        // Send message on Enter key
        this.elements.userInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Quick action buttons
        this.elements.quickActionBtns?.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.dataset.question;
                if (question) {
                    this.addMessage('user', question);
                    this.sendQuickResponse(question);
                }
            });
        });

        // Emoji picker button
        this.elements.emojiBtn?.addEventListener('click', () => {
            this.toggleEmojiPicker();
        });

        // File upload button
        this.elements.fileBtn?.addEventListener('click', () => {
            this.uploadFile();
        });

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.elements.widget.contains(e.target)) {
                this.toggleChat();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.elements.chatContainer.style.display = 'flex';
            // Force reflow to ensure CSS transition works
            void this.elements.chatContainer.offsetWidth;
            this.elements.chatContainer.classList.add('open');
            this.resetUnreadCounter();
        } else {
            this.elements.chatContainer.classList.remove('open');
            setTimeout(() => {
                if (!this.isOpen) {
                    this.elements.chatContainer.style.display = 'none';
                }
            }, 300);
        }
    }

    addMessage(sender, content) {
        const timestamp = new Date();
        const timeString = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageElement = document.createElement('div');
        messageElement.className = `${sender}-message`;
        
        if (sender === 'ai') {
            messageElement.innerHTML = `
                <img src="/TestBotAi.png" alt="AI Avatar">
                <div class="message-content">
                    <p>${content}</p>
                </div>
                <div class="message-time">${timeString}</div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="message-content user-message-content">
                    <p>${content}</p>
                </div>
                <div class="message-time">${timeString}</div>
            `;
        }
        
        this.elements.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
    }

    sendMessage() {
        const message = this.elements.userInput.value.trim();
        if (!message) return;
        
        this.elements.userInput.value = '';
        this.addMessage('user', message);
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate AI response delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage('ai', response);
            
            if (!this.isOpen) {
                this.incrementUnreadCounter();
            }
        }, 1000 + Math.random() * 1500);
    }

    sendQuickResponse(question) {
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(question);
            this.addMessage('ai', response);
            
            if (!this.isOpen) {
                this.incrementUnreadCounter();
            }
        }, 800);
    }

    showTypingIndicator() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const typingElement = document.createElement('div');
        typingElement.className = 'ai-message typing-message';
        typingElement.innerHTML = `
            <img src="/TestBotAi.png" alt="AI Avatar">
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        this.elements.chatMessages.appendChild(typingElement);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingElement = document.querySelector('.typing-message');
        if (typingElement) {
            typingElement.remove();
        }
    }

    generateResponse(message) {
        const cleanMsg = message.toLowerCase();
        
        // Greetings
        if (/(hi|hello|hey|greetings)/i.test(cleanMsg)) {
            return "Hello there! 👋 How can I help you with your Minecraft server today? Feel free to ask anything!";
        }
        
        // Plans
        if (/(plan|price|cost|package|tier|pricing)/i.test(cleanMsg)) {
            return `We have a variety of hosting plans tailored to your needs:<br><br>
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
                <a href="/available/Pricing-Plans.html" class="btn-in-chat">Explore All Plans</a>`;
        }
        
        // Setup Instructions
        if (/(setup|install|start|begin|configure)/i.test(cleanMsg)) {
            return `Getting your server up and running is a breeze! Follow these simple steps:<br><br>
                1. Check your email for login credentials.<br>
                2. Access your <a href="https://srv.mcziehost.fun:8443" target="_blank">control panel</a>.<br>
                3. Follow our detailed <a href="/index.html">setup guide</a>.<br><br>
                If you need assistance, <button class="quick-action-btn" data-question="I need setup help">click here</button> for support.`;
        }
        
        // Support Options
        if (/(support|help|issue|problem|assistance|question)/i.test(cleanMsg)) {
            return `We're here to help! You can reach us through any of these channels:<br><br>
                <div class="support-option">
                    <i class="fab fa-discord"></i> <strong>Discord:</strong> 
                    <a href="https://discord.com/invite/mczie" target="_blank">Join our community</a>
                </div>
                <div class="support-option">
                    <i class="fab fa-facebook"></i> <strong>Facebook:</strong> 
                    <a href="https://web.facebook.com/mczhs" target="_blank">Message us</a>
                </div>`;
        }
        
        // Fallback Response
        return "Hmm, I didn’t quite catch that. Could you please rephrase your question about your Minecraft server?";
    }
    

    scrollToBottom() {
        this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
    }

    incrementUnreadCounter() {
        this.unreadMessages++;
        if (this.elements.notificationBadge) {
            this.elements.notificationBadge.textContent = this.unreadMessages > 9 ? '9+' : this.unreadMessages;
            this.elements.notificationBadge.style.display = 'block';
        }
    }

    resetUnreadCounter() {
        this.unreadMessages = 0;
        if (this.elements.notificationBadge) {
            this.elements.notificationBadge.style.display = 'none';
        }
    }

    checkFirstVisit() {
        if (!localStorage.getItem('mczieChatFirstVisit')) {
            localStorage.setItem('mczieChatFirstVisit', 'true');
            setTimeout(() => {
                if (!this.isOpen) {
                    this.pulseIcon();
                }
            }, 5000);
        }
    }

    pulseIcon() {
        const pulseRing = document.querySelector('.pulse-ring');
        if (pulseRing) {
            pulseRing.classList.add('active');
            setTimeout(() => pulseRing.classList.remove('active'), 3000);
        }
    }

    setupInactivityTimer() {
        let timeout;
        const resetTimer = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (this.isOpen) {
                    this.addMessage('ai', "Still there? I'm here if you have any questions about your Minecraft server!");
                }
            }, 300000); // 5 minutes
        };
        
        document.addEventListener('mousemove', resetTimer);
        document.addEventListener('keypress', resetTimer);
        resetTimer();
    }

    toggleEmojiPicker() {
        console.log("Emoji picker toggled");
        // Implementation would go here
    }

    uploadFile() {
        console.log("File upload initiated");
        // Implementation would go here
    }
}

// Initialize the chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mczieChatWidget = new MCZIEChatWidget();
});