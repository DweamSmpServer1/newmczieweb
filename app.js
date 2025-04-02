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
        this.commonWords = ["the", "and", "for", "your", "with"];
        this.pluginDatabase = {
            performance: ["Spark", "ClearLag", "Chunky"],
            economy: ["EssentialsX", "Vault", "ShopGUIPlus"],
            protection: ["WorldGuard", "CoreProtect", "GriefPrevention"],
            fun: ["DecentHolograms", "ItemsAdder", "MythicMobs"]
        };
        this.nlpProcessor = { detectIntent: () => 'greeting' }; // Placeholder if not defined elsewhere
        
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
                description: "MCZIE Hosting offers tiered Minecraft server plans",
                tiers: [
                    {
                        name: "Budget Plan",
                        price: "₱80/month",
                        specs: "Xeon E5-2650 V4 • DDR4 2133Mhz",
                        bestFor: "Small friend groups, testing"
                    },
                    {
                        name: "Enterprise Plan",
                        price: "₱130/month",
                        specs: "Xeon E5-2698 V3 • DDR4 2666Mhz",
                        bestFor: "Medium communities, modpacks"
                    },
                    {
                        name: "Professional Plan",
                        price: "₱250/month",
                        specs: "Ryzen 7 2700X • DDR4 3200Mhz",
                        bestFor: "Large servers, performance needs"
                    },
                    {
                        name: "Extreme Plan",
                        price: "₱350/month",
                        specs: "Ryzen 9 5950X • DDR4 3200Mhz",
                        bestFor: "Massive networks, competitive play"
                    }
                ],
                notes: "All plans include DDoS protection and instant setup"
            },
            features: [
                "300Gbps+ DDoS Protection",
                "Instant Server Deployment",
                "Full FTP Access",
                "Modpack Support",
                "24/7 Monitoring",
                "Discord Support"
            ],
            commonIssues: {
                setup: "Check your email for credentials and access the control panel",
                performance: "Try optimizing view-distance and entity-activation-range",
                connection: "Verify your IP and port settings in server.properties"
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
                        <div class="best-for">Best for: ${plan.bestFor}</div>
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
                            ${knowledge.features.map(f => `<li>${f}</li>`).join("")}
                        </ul>
                        <p>${this.getMoodResponse()} Need details on any specific feature?</p>
                    </div>
                `;
                
            case "commonIssues":
                return `
                    <div class="knowledge-response">
                        <h3>Common Server Solutions</h3>
                        <div class="issue">
                            <h4>Setup Problems</h4>
                            <p>${knowledge.setup}</p>
                        </div>
                        <div class="issue">
                            <h4>Performance Issues</h4>
                            <p>${knowledge.performance}</p>
                        </div>
                        <div class="issue">
                            <h4>Connection Troubles</h4>
                            <p>${knowledge.connection}</p>
                        </div>
                        <button class="quick-action-btn" data-question="I need more help">
                            Still Having Trouble?
                        </button>
                    </div>
                `;
                
            default:
                return null;
        }
    }

    recommendPlugins(serverType, needs) {
        if (!Array.isArray(needs)) {
            needs = [needs]; // Convert single string to array
        }

        const recommendations = [];
        needs.forEach(need => {
            const lowerNeed = need.toLowerCase();
            for (const [category, plugins] of Object.entries(this.pluginDatabase)) {
                if (category.toLowerCase().includes(lowerNeed)) {
                    recommendations.push(...plugins);
                }
            }
        });

        // Remove duplicates
        const uniqueRecommendations = [...new Set(recommendations)];

        return uniqueRecommendations.length > 0 
            ? `For ${serverType}, consider these plugins: ${uniqueRecommendations.join(", ")}`
            : "I couldn't find specific plugin recommendations for your needs. Could you describe what you're trying to achieve?";
    }

    troubleshootIssue(errorLog) {
        if (!errorLog || typeof errorLog !== 'string') {
            return {
                detectedError: "Invalid input",
                solution: "Please provide the actual error message",
                additionalHelp: null
            };
        }

        const commonIssues = {
            "java.lang.OutOfMemoryError": {
                solution: "Increase RAM allocation in your server settings",
                action: "Would you like me to show you how to increase RAM allocation?"
            },
            "Can't keep up": {
                solution: "Try optimizing with plugins like Spark or reducing view-distance",
                action: "I can guide you through server optimization steps"
            },
            "Failed to bind to port": {
                solution: "Check if another service is using the same port (like another server)",
                action: "Would you like help checking port usage?"
            },
            "Connection refused": {
                solution: "Verify your server IP and port are correct in server.properties",
                action: "I can help you verify your server configuration"
            }
        };

        for (const [error, data] of Object.entries(commonIssues)) {
            if (errorLog.includes(error)) {
                return {
                    detectedError: error,
                    solution: data.solution,
                    additionalHelp: data.action
                };
            }
        }

        // Check for common patterns if exact match not found
        if (/memory/i.test(errorLog)) {
            return {
                detectedError: "Memory-related issue",
                solution: "This appears to be memory-related. Try increasing RAM or optimizing plugins.",
                additionalHelp: "Would you like memory optimization tips?"
            };
        }

        return {
            detectedError: "Unknown error",
            solution: "I couldn't identify this specific error. Please contact support with the full log.",
            additionalHelp: "Would you like me to connect you to live support?"
        };
    }

    learnFromInteraction(userInput, correctResponse) {
        if (!userInput || !correctResponse) return;
        
        try {
            const learnedResponses = JSON.parse(localStorage.getItem('learnedResponses') || "{}");
            
            // Improved keyword extraction
            const keywords = userInput.toLowerCase().match(/\b[\w']+\b/g) || [];
            const filteredKeywords = keywords.filter(word => 
                word.length > 3 && 
                !this.commonWords.includes(word) &&
                !/\d+/.test(word)
            );
            
            filteredKeywords.forEach(keyword => {
                if (!learnedResponses[keyword]) {
                    learnedResponses[keyword] = [];
                }
                // Don't store duplicates
                if (!learnedResponses[keyword].includes(correctResponse)) {
                    learnedResponses[keyword].push(correctResponse);
                }
            });
            
            localStorage.setItem('learnedResponses', JSON.stringify(learnedResponses));
        } catch (e) {
            console.error("Failed to save learned response:", e);
        }
    }

    getLearnedResponse(input) {
        try {
            const learnedResponses = JSON.parse(localStorage.getItem('learnedResponses') || "{}");
            const keywords = (input.toLowerCase().match(/\b[\w']+\b/g) || [])
                .filter(word => learnedResponses[word]);
                
            if (keywords.length > 0) {
                // Sort by most relevant (most matches)
                const keywordCounts = {};
                keywords.forEach(keyword => {
                    keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
                });
                
                const sortedKeywords = Object.keys(keywordCounts)
                    .sort((a, b) => keywordCounts[b] - keywordCounts[a]);
                
                for (const keyword of sortedKeywords) {
                    const possibleResponses = learnedResponses[keyword];
                    if (possibleResponses && possibleResponses.length > 0) {
                        return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
                    }
                }
            }
        } catch (e) {
            console.error("Failed to retrieve learned response:", e);
        }
        return null;
    }

    detectLanguage(text) {
        if (!text || typeof text !== 'string') return 'english';
        
        const languageIndicators = {
            english: ["the", "and", "you", "server", "minecraft"],
            tagalog: ["ang", "ng", "mga", "ako", "mo"],
            spanish: ["el", "la", "que", "tu", "servidor"]
        };

        const scores = {};
        const cleanText = text.toLowerCase();
        
        Object.entries(languageIndicators).forEach(([lang, words]) => {
            scores[lang] = words.reduce((count, word) => 
                count + (cleanText.includes(word) ? 1 : 0), 0);
        });

        // Only return a language if we have reasonable confidence
        const maxScore = Math.max(...Object.values(scores));
        if (maxScore >= 2) {
            return Object.keys(scores).find(key => scores[key] === maxScore);
        }
        return 'english';
    }

    getLocalizedResponse(message, language = null) {
        if (!language) {
            language = this.detectLanguage(message);
        }

        const responses = {
            greeting: {
                english: "Hello! How can I help with your Minecraft server today?",
                tagalog: "Kumusta! Paano ako makakatulong sa iyong Minecraft server ngayon?",
                spanish: "¡Hola! ¿Cómo puedo ayudarte con tu servidor de Minecraft hoy?"
            },
            plans: {
                english: "We offer several hosting plans to suit your needs...",
                tagalog: "Mayroon kaming iba't ibang hosting plan para sa iyong pangangailangan...",
                spanish: "Ofrecemos varios planes de hosting para satisfacer sus necesidades..."
            },
            support: {
                english: "I can help you with server support issues...",
                tagalog: "Maaari kitang tulungan sa mga isyu ng suporta sa server...",
                spanish: "Puedo ayudarte con problemas de soporte del servidor..."
            }
        };

        const intent = this.nlpProcessor.detectIntent(message);
        return responses[intent]?.[language] || 
               responses[intent]?.english || 
               "I'm here to help with your Minecraft server. Could you please rephrase your question?";
    }
}

// Example usage (you can remove this in production)
const ai = new QuantumAI();

// Plugin recommendations
const plugins = ai.recommendPlugins("Faction server", ["protection", "economy"]);
console.log(plugins);

// Troubleshooting
const solution = ai.troubleshootIssue("java.lang.OutOfMemoryError: Java heap space");
console.log(solution);

// Learning system
ai.learnFromInteraction("How to increase RAM", "You can increase RAM in your server settings...");
const learnedResponse = ai.getLearnedResponse("increase RAM");
console.log(learnedResponse);

// Language detection
const language = ai.detectLanguage("¿Cómo configuro mi servidor?");
console.log(language); // "spanish"
const response = ai.getLocalizedResponse("Hello", "tagalog");
console.log(response);



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