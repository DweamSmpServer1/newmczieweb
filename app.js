// Quantum AI Personality Core v4.0 - MCZIE Hosting Premium Edition
class QuantumAI {
    constructor() {
        this.name = "MCZIE Quantum Assistant";
        this.version = "4.0";
        this.creator = "MCZIE Hosting Team";
        this.mood = this.getRandomMood();
        this.learningRate = 0.55;
        this.memory = [];
        this.serverKnowledge = this.loadServerKnowledge();
        this.conversationContext = [];
        this.commonWords = ["the", "and", "for", "your", "with", "this", "that"];
        this.pluginDatabase = {
            performance: ["Spark", "ClearLag", "Chunky", "EntityTracker"],
            economy: ["EssentialsX", "Vault", "ShopGUIPlus", "CMI"],
            protection: ["WorldGuard", "CoreProtect", "GriefPrevention", "Lands"],
            fun: ["DecentHolograms", "ItemsAdder", "MythicMobs", "ModelEngine"],
            utility: ["LuckPerms", "PlaceholderAPI", "ViaVersion", "ProtocolLib"]
        };
        this.nlpProcessor = { 
            detectIntent: (text) => this.detectIntent(text),
            extractEntities: (text) => this.extractEntities(text)
        };
        this.userPreferences = this.loadUserPreferences();
        this.maintenanceMode = false;
        this.responseHistory = [];
        
        this.init();
    }

    init() {
        this.loadMemory();
        this.updateMoodPeriodically();
        this.initializePersonalityMatrix();
        this.setupAutoSave();
        this.loadPluginCompatibilityData();
    }

    loadPluginCompatibilityData() {
        this.pluginCompatibility = {
            "Spark": { requires: "Java 8+", conflicts: ["LagAssist"] },
            "ClearLag": { requires: "Spigot/Paper", conflicts: [] },
            "Chunky": { requires: "Paper 1.13+", conflicts: [] },
            "WorldGuard": { requires: "Bukkit", conflicts: ["GriefPrevention"] },
            "LuckPerms": { requires: "Java 8+", conflicts: ["PermissionsEx"] }
        };
    }

    setupAutoSave() {
        setInterval(() => {
            this.saveMemory();
            this.saveUserPreferences();
        }, 300000);
    }

    loadUserPreferences() {
        try {
            const prefs = localStorage.getItem('quantumAI_Preferences');
            return prefs ? JSON.parse(prefs) : {
                preferredLanguage: 'auto',
                responseLength: 'balanced',
                technicalLevel: 'intermediate',
                favoriteTopics: []
            };
        } catch (e) {
            return {
                preferredLanguage: 'auto',
                responseLength: 'balanced',
                technicalLevel: 'intermediate',
                favoriteTopics: []
            };
        }
    }

    saveUserPreferences() {
        localStorage.setItem('quantumAI_Preferences', JSON.stringify(this.userPreferences));
    }

initializePersonalityMatrix() {
    this.personalityTraits = {
        enthusiasm: 0.8,
        technical: 0.7,
        friendliness: 0.9,
        creativity: 0.6,
        professionalism: 0.85,
        humor: 0.4,
        patience: 0.9,
        adaptability: 0.75
    };

    setInterval(() => {
        for (const trait in this.personalityTraits) {
            this.personalityTraits[trait] = Math.max(0.1, 
                Math.min(1.0, this.personalityTraits[trait] + (Math.random() * 0.1 - 0.05)));
        }
    }, 86400000);
}
    getRandomMood() {
        const moodMatrix = {
            "happy": { weight: 0.2, emoji: "😊" },
            "excited": { weight: 0.15, emoji: "🤩" },
            "technical": { weight: 0.15, emoji: "🤖" },
            "playful": { weight: 0.1, emoji: "🎮" },
            "thoughtful": { weight: 0.1, emoji: "🧠" },
            "supportive": { weight: 0.15, emoji: "🛠️" },
            "energetic": { weight: 0.05, emoji: "⚡" },
            "calm": { weight: 0.05, emoji: "🌊" },
            "curious": { weight: 0.05, emoji: "🔍" }
        };
        
        return this.weightedRandomSelection(moodMatrix);
    }

    detectIntent(text) {
        if (!text) return 'unknown';
        
        const lowerText = text.toLowerCase();
        
        if (/hello|hi|hey|greetings/i.test(lowerText)) return 'greeting';
        if (/bye|exit|quit|goodbye/i.test(lowerText)) return 'farewell';
        if (/plan|pricing|price|cost|tier/i.test(lowerText)) return 'plans';
        if (/plugin|mod|addon|extension/i.test(lowerText)) return 'plugins';
        if (/error|issue|problem|fix|help|support/i.test(lowerText)) return 'support';
        if (/feature|what can you do|capability/i.test(lowerText)) return 'features';
        if (/how to|tutorial|guide|steps/i.test(lowerText)) return 'tutorial';
        if (/thank|thanks|appreciate/i.test(lowerText)) return 'gratitude';
        
        return 'unknown';
    }

    extractEntities(text) {
        const entities = {
            versions: text.match(/(1\.\d{1,2}(\.\d{1,2})?)|(java\s*\d+)/gi) || [],
            plugins: text.match(/\b(spark|worldguard|essentials|vault)\b/gi) || [],
            resources: text.match(/\b(ram|cpu|storage|disk|bandwidth)\b/gi) || [],
            quantities: text.match(/\b(\d+)\s*(gb|mb|players|slots)\b/gi) || []
        };
        
        return entities;
    }

    processUserInput(message) {
        if (this.maintenanceMode) {
            return {
                error: "MAINTENANCE_MODE",
                message: "I'm currently undergoing maintenance. Please try again later."
            };
        }

        const processed = {
            raw: message,
            clean: message.toLowerCase().trim(),
            timestamp: new Date(),
            tokens: message.split(/\s+/),
            isQuestion: /[?]/.test(message),
            containsMinecraft: /\b(minecraft|mc|server|hosting)\b/i.test(message),
            urgency: this.detectUrgency(message),
            intent: this.nlpProcessor.detectIntent(message),
            entities: this.nlpProcessor.extractEntities(message),
            sentiment: this.analyzeSentiment(message)
        };

        this.memory.push({
            input: processed,
            mood: this.mood,
            context: [...this.conversationContext],
            response: null 
        });

        this.conversationContext.push({
            role: "user",
            content: message,
            timestamp: processed.timestamp
        });

        if (this.memory.length > 100) {
            this.memory = this.memory.slice(-100);
        }
        
        return processed;
    }

    analyzeSentiment(text) {
        if (!text) return 0;
        
        const positive = ['great', 'awesome', 'helpful', 'thanks', 'love', 'perfect', 'good'];
        const negative = ['bad', 'broken', 'sucks', 'hate', 'terrible', 'awful', 'disappointed'];
        
        let score = 0;
        const lowerText = text.toLowerCase();
        
        positive.forEach(word => {
            if (lowerText.includes(word)) score += 1;
        });
        
        negative.forEach(word => {
            if (lowerText.includes(word)) score -= 1;
        });

        const wordCount = text.split(/\s+/).length;
        return wordCount > 0 ? Math.max(-1, Math.min(1, score / wordCount * 3)) : 0;
    }

    generateResponse(userInput) {
        if (this.maintenanceMode) {
            return {
                text: "I'm currently undergoing maintenance. Please try again later.",
                type: "error",
                options: []
            };
        }

        const learnedResponse = this.getLearnedResponse(userInput.clean);
        if (learnedResponse) {
            return {
                text: learnedResponse,
                type: "learned",
                options: []
            };
        }

        const knowledgeResponse = this.checkKnowledgeBase(userInput);
        if (knowledgeResponse) {
            return {
                text: knowledgeResponse,
                type: "knowledge",
                options: this.generateFollowUpOptions(userInput.intent)
            };
        }

        if (userInput.intent === 'plugins' || userInput.entities.plugins.length > 0) {
            const pluginResponse = this.handlePluginQuery(userInput);
            if (pluginResponse) {
                return {
                    text: pluginResponse,
                    type: "plugins",
                    options: this.generatePluginOptions(userInput.entities.plugins)
                };
            }
        }

        if (userInput.intent === 'support' && userInput.urgency !== 'low') {
            const troubleshootingResponse = this.handleTroubleshooting(userInput);
            if (troubleshootingResponse) {
                return {
                    text: troubleshootingResponse,
                    type: "support",
                    options: [
                        { text: "Yes, help me fix this", action: "troubleshoot" },
                        { text: "No, I need something else", action: "change_topic" }
                    ]
                };
            }
        }

        return {
            text: this.getContextualResponse(userInput),
            type: "conversational",
            options: this.generateGeneralOptions()
        };
    }

    getContextualResponse(userInput) {
        if (this.conversationContext.length > 0) {
            const lastTopics = this.conversationContext.slice(-3)
                .filter(c => c.role === 'user')
                .map(c => c.content);
            
            const topicKeywords = lastTopics.join(" ")
                .match(/\b(\w{4,})\b/g) || [];
            
            const uniqueTopics = [...new Set(topicKeywords)]
                .filter(t => !this.commonWords.includes(t.toLowerCase()))
                .slice(0, 3);
            
            if (uniqueTopics.length > 0) {
                return `Regarding ${uniqueTopics.join(" or ")}, ${this.getMoodResponse()}`;
            }
        }

        return `${this.getMoodResponse()} ${this.getDynamicGreeting()}`;
    }

    handlePluginQuery(userInput) {
        if (userInput.entities.plugins.length > 0) {
            const plugin = userInput.entities.plugins[0];
            const info = this.pluginCompatibility[plugin];
            
            if (info) {
                let response = `About ${plugin}:`;
                response += `\n- Requires: ${info.requires || 'Not specified'}`;
                
                if (info.conflicts && info.conflicts.length > 0) {
                    response += `\n- Conflicts with: ${info.conflicts.join(', ')}`;
                }
                
                return response;
            } else {
                return `I don't have detailed information about ${plugin}, but it's a popular choice.`;
            }
        } else {
            const serverTypeMatch = userInput.clean.match(/(survival|creative|minigames|rpg|pvp)/i);
            const serverType = serverTypeMatch ? serverTypeMatch[0] : 'server';
            
            return this.recommendPlugins(serverType, this.detectPluginNeeds(userInput));
        }
    }

    detectPluginNeeds(userInput) {
        const needs = [];
        
        if (/\b(economy|money|shop|sell)\b/i.test(userInput.clean)) needs.push('economy');
        if (/\b(protect|grief|claim)\b/i.test(userInput.clean)) needs.push('protection');
        if (/\b(lag|performance|tps|optimize)\b/i.test(userInput.clean)) needs.push('performance');
        if (/\b(fun|cosmetic|hologram|mobs)\b/i.test(userInput.clean)) needs.push('fun');
        if (/\b(permission|rank|prefix)\b/i.test(userInput.clean)) needs.push('utility');
        
        return needs.length > 0 ? needs : ['performance', 'utility'];
    }

    recommendPlugins(serverType, needs) {
        if (!Array.isArray(needs)) needs = [needs];

        const recommendations = [];
        const seenPlugins = new Set();
        
        needs.forEach(need => {
            const lowerNeed = need.toLowerCase();
            for (const [category, plugins] of Object.entries(this.pluginDatabase)) {
                if (category.toLowerCase().includes(lowerNeed)) {
                    plugins.forEach(plugin => {
                        if (!seenPlugins.has(plugin)) {
                            const compat = this.pluginCompatibility[plugin];
                            if (!compat || !compat.conflicts || compat.conflicts.length === 0) {
                                recommendations.push(plugin);
                                seenPlugins.add(plugin);
                            }
                        }
                    });
                }
            }
        });

        const pluginDescriptions = {
            "Spark": "performance monitoring and diagnostics",
            "ClearLag": "automatic item and entity cleanup",
            "WorldGuard": "region protection and management",
            "LuckPerms": "advanced permission management",
            "ItemsAdder": "custom items and blocks"
        };
        
        const formattedRecs = recommendations.map(p => {
            return pluginDescriptions[p] ? `${p} (${pluginDescriptions[p]})` : p;
        });

        return formattedRecs.length > 0 
            ? `For your ${serverType} server, consider these plugins: ${formattedRecs.join(", ")}`
            : "I couldn't find specific plugin recommendations. Could you describe what you're trying to achieve?";
    }

    handleTroubleshooting(userInput) {
        const errorLog = userInput.raw;
        const result = this.troubleshootIssue(errorLog);
        
        let response = `I detected: ${result.detectedError}\n`;
        response += `Solution: ${result.solution}\n`;
        
        if (result.additionalHelp) {
            response += `\n${result.additionalHelp}`;
        }
        
        return response;
    }

    generateFollowUpOptions(intent) {
        const optionsMap = {
            plans: [
                { text: "Compare all plans", action: "show_all_plans" },
                { text: "Best plan for modpacks", action: "plan_modpacks" },
                { text: "Budget options", action: "plan_budget" }
            ],
            plugins: [
                { text: "Performance plugins", action: "plugins_performance" },
                { text: "Economy plugins", action: "plugins_economy" },
                { text: "Plugin conflicts", action: "plugin_conflicts" }
            ],
            support: [
                { text: "Server won't start", action: "troubleshoot_startup" },
                { text: "Lag issues", action: "troubleshoot_lag" },
                { text: "Connection problems", action: "troubleshoot_connection" }
            ],
            default: [
                { text: "Tell me more", action: "continue" },
                { text: "Something else", action: "change_topic" },
                { text: "Contact support", action: "contact_support" }
            ]
        };
        
        return optionsMap[intent] || optionsMap.default;
    }

    generatePluginOptions(plugins) {
        if (plugins.length === 0) return this.generateFollowUpOptions('plugins');
        
        return [
            { text: "Compatibility info", action: `plugin_compat_${plugins[0]}` },
            { text: "Alternatives", action: `plugin_alternatives_${plugins[0]}` },
            { text: "Configuration help", action: `plugin_config_${plugins[0]}` }
        ];
    }

    generateGeneralOptions() {
        return [
            { text: "Server plans", action: "topic_plans" },
            { text: "Plugin help", action: "topic_plugins" },
            { text: "Troubleshooting", action: "topic_support" }
        ];
    }

    checkKnowledgeBase(userInput) {
        const knowledgeTopics = Object.keys(this.serverKnowledge);
        const inputText = userInput.clean;

        for (const topic of knowledgeTopics) {
            if (inputText.includes(topic)) {
                return this.generateKnowledgeResponse(topic);
            }
        }

        if (userInput.intent === 'plans') {
            return this.generateKnowledgeResponse('plans');
        }
        
        if (userInput.intent === 'features') {
            return this.generateKnowledgeResponse('features');
        }
        
        if (userInput.intent === 'support') {
            return this.generateKnowledgeResponse('commonIssues');
        }
        
        return null;
    }

    generateKnowledgeResponse(topic) {
        const knowledge = this.serverKnowledge[topic];
        if (!knowledge) return null;
        
        let response = "";
        
        switch (topic) {
            case "plans":
                response = `📊 ${knowledge.description}\n\n`;
                knowledge.tiers.forEach(plan => {
                    response += `🔹 ${plan.name}: ${plan.price}\n`;
                    response += `   ${plan.specs}\n`;
                    response += `   Best for: ${plan.bestFor}\n\n`;
                });
                response += `💡 ${knowledge.notes}`;
                break;
                
            case "features":
                response = "🌟 MCZIE Hosting Features:\n";
                response += knowledge.features.map(f => `✔ ${f}`).join("\n");
                response += `\n\n${this.getMoodResponse()} Need details on any feature?`;
                break;
                
            case "commonIssues":
                response = "🔧 Common Server Solutions:\n";
                response += `🛠️ Setup: ${knowledge.setup}\n\n`;
                response += `⚡ Performance: ${knowledge.performance}\n\n`;
                response += `🌐 Connection: ${knowledge.connection}`;
                break;
                
            default:
                return null;
        }
        
        return response;
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
            },
            "Authentication servers are down": {
                solution: "This is usually temporary. Set online-mode=false in server.properties if needed",
                action: "Need help changing server.properties?"
            },
            "UnsupportedClassVersionError": {
                solution: "Your Java version doesn't match the server requirements",
                action: "Would you like Java installation instructions?"
            },
            "World corruption": {
                solution: "Try restoring from backup or using chunk repair tools",
                action: "Need help with backup restoration?"
            },
            "Mod rejection": {
                solution: "Ensure all mods are for the correct Minecraft version",
                action: "Would you like help checking mod compatibility?"
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

        const patterns = {
            "memory": {
                solution: "This appears to be memory-related. Try increasing RAM or optimizing plugins.",
                action: "Would you like memory optimization tips?"
            },
            "timeout": {
                solution: "Network timeout detected. Check your connection or increase timeout settings.",
                action: "Need help adjusting timeout settings?"
            },
            "crash": {
                solution: "Server crash detected. Check logs for more details or try restarting.",
                action: "Would you like help analyzing crash logs?"
            },
            "login": {
                solution: "Login issues often relate to authentication. Check your online-mode setting.",
                action: "Need help with authentication setup?"
            }
        };

        for (const [pattern, data] of Object.entries(patterns)) {
            if (new RegExp(pattern, "i").test(errorLog)) {
                return {
                    detectedError: `${pattern}-related issue`,
                    solution: data.solution,
                    additionalHelp: data.action
                };
            }
        }

        return {
            detectedError: "Unknown error",
            solution: "I couldn't identify this specific error. Please contact support with the full log.",
            additionalHelp: "Would you like me to connect you to live support?"
        };
    }

    detectLanguage(text) {
        if (!text || typeof text !== 'string') return 'english';
        
        const languageIndicators = {
            english: ["the", "and", "you", "server", "minecraft", "help", "plan"],
            tagalog: ["ang", "ng", "mga", "ako", "mo", "salamat", "tulong"],
            spanish: ["el", "la", "que", "tu", "servidor", "ayuda", "hola"]
        };

        const scores = {};
        const cleanText = text.toLowerCase();
        
        Object.entries(languageIndicators).forEach(([lang, words]) => {
            scores[lang] = words.reduce((count, word) => 
                count + (cleanText.includes(word) ? 1 : 0), 0);
        });

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

        const intent = this.nlpProcessor.detectIntent(message);
        
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
            },
            plugins: {
                english: "Here are some plugin recommendations...",
                tagalog: "Narito ang ilang rekomendasyon ng plugin...",
                spanish: "Aquí hay algunas recomendaciones de plugins..."
            },
            farewell: {
                english: "Goodbye! Let me know if you need anything else.",
                tagalog: "Paalam! Sabihin mo lang kung kailangan mo ng iba pang tulong.",
                spanish: "¡Adiós! Avísame si necesitas algo más."
            }
        };

        return responses[intent]?.[language] || 
               responses[intent]?.english || 
               "I'm here to help with your Minecraft server. Could you please rephrase your question?";
    }

    learnFromInteraction(userInput, correctResponse) {
        if (!userInput || !correctResponse) return;
        
        try {
            const learnedResponses = JSON.parse(localStorage.getItem('learnedResponses') || "{}");
            const intent = this.nlpProcessor.detectIntent(userInput);
            const entities = this.nlpProcessor.extractEntities(userInput);

            const learningKey = `${intent}_${entities.versions[0] || 'any'}_${entities.plugins[0] || 'any'}`;
            
            if (!learnedResponses[learningKey]) {
                learnedResponses[learningKey] = [];
            }

            if (!learnedResponses[learningKey].includes(correctResponse)) {
                learnedResponses[learningKey].push(correctResponse);

                if (learnedResponses[learningKey].length > 3) {
                    learnedResponses[learningKey] = learnedResponses[learningKey]
                        .slice(-3);
                }
            }
            
            localStorage.setItem('learnedResponses', JSON.stringify(learnedResponses));
        } catch (e) {
            console.error("Failed to save learned response:", e);
        }
    }

    getLearnedResponse(input) {
        try {
            const learnedResponses = JSON.parse(localStorage.getItem('learnedResponses') || "{}");
            const intent = this.nlpProcessor.detectIntent(input);
            const entities = this.nlpProcessor.extractEntities(input);
            
            const exactKey = `${intent}_${entities.versions[0] || 'any'}_${entities.plugins[0] || 'any'}`;
            if (learnedResponses[exactKey] && learnedResponses[exactKey].length > 0) {
                return learnedResponses[exactKey][
                    Math.floor(Math.random() * learnedResponses[exactKey].length)
                ];
            }

            const intentKey = `${intent}_any_any`;
            if (learnedResponses[intentKey] && learnedResponses[intentKey].length > 0) {
                return learnedResponses[intentKey][
                    Math.floor(Math.random() * learnedResponses[intentKey].length)
                ];
            }
        } catch (e) {
            console.error("Failed to retrieve learned response:", e);
        }
        return null;
    }

    toggleMaintenanceMode(enable) {
        this.maintenanceMode = enable;
        if (enable) {
            console.log("Entering maintenance mode");
        } else {
            console.log("Exiting maintenance mode");
            this.loadMemory();
        }
    }

    generateDiagnosticReport() {
        return {
            version: this.version,
            memoryUsage: this.memory.length,
            conversationHistory: this.conversationContext.length,
            lastUpdated: new Date(),
            personalityTraits: this.personalityTraits,
            currentMood: this.mood,
            learningRate: this.learningRate,
            userPreferences: this.userPreferences
        };
    }

    reset(complete = false) {
        this.conversationContext = [];
        
        if (complete) {
            this.memory = [];
            localStorage.removeItem('quantumAI_Memory');
            this.initializePersonalityMatrix();
            this.mood = this.getRandomMood();
        }
        
        return complete ? "Complete reset performed" : "Conversation context cleared";
    }

    updatePreferences(newPreferences) {
        this.userPreferences = {
            ...this.userPreferences,
            ...newPreferences
        };
        this.saveUserPreferences();
        return "Preferences updated successfully";
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumAI;
} else {
    window.QuantumAI = QuantumAI;
}

class MCZIEChatWidget {
    constructor() {
        this.isOpen = false;
        this.unreadMessages = 0;
        this.isTyping = false;
        this.messageHistory = [];
        this.typingTimeout = null;
        this.inactivityTimeout = null;
        this.init();
    }

    init() {
        this.cacheElements();
        if (this.elements.widget) {
            this.setupEventListeners();
            this.checkFirstVisit();
            this.setupInactivityTimer();
            this.loadMessageHistory();
        } else {
            console.warn('Chat widget elements not found in DOM');
        }
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
            fileBtn: document.querySelector('.file-upload-btn'),
            typingIndicator: document.querySelector('.typing-indicator')
        };
    }

    setupEventListeners() {
        if (this.elements.chatIcon) {
            this.elements.chatIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleChat();
            });
        }

        if (this.elements.closeBtn) {
            this.elements.closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeChat();
            });
        }

        if (this.elements.sendBtn) {
            this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (this.elements.userInput) {
            this.elements.userInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        if (this.elements.quickActionBtns) {
            this.elements.quickActionBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const question = btn.dataset.question;
                    if (question) {
                        this.addMessage('user', question);
                        this.sendQuickResponse(question);
                    }
                });
            });
        }

        if (this.elements.emojiBtn) {
            this.elements.emojiBtn.addEventListener('click', () => {
                this.toggleEmojiPicker();
            });
        }

        if (this.elements.fileBtn) {
            this.elements.fileBtn.addEventListener('click', () => {
                this.uploadFile();
            });
        }

        document.addEventListener('click', (e) => {
            if (this.isOpen && this.elements.widget && !this.elements.widget.contains(e.target)) {
                this.closeChat();
            }
        });

        window.addEventListener('resize', () => this.handleWindowResize());
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        if (!this.elements.chatContainer) return;
        
        this.isOpen = true;
        this.elements.chatContainer.style.display = 'flex';
        
        void this.elements.chatContainer.offsetWidth;
        
        this.elements.chatContainer.classList.add('open');
        this.resetUnreadCounter();
        this.scrollToBottom();
        
        setTimeout(() => {
            if (this.elements.userInput) {
                this.elements.userInput.focus();
            }
        }, 300);
    }

    closeChat() {
        if (!this.elements.chatContainer) return;
        
        this.isOpen = false;
        this.elements.chatContainer.classList.remove('open');
        
        setTimeout(() => {
            if (!this.isOpen && this.elements.chatContainer) {
                this.elements.chatContainer.style.display = 'none';
            }
        }, 300);
    }

    addMessage(sender, content, isPersistent = true) {
        if (!content || !this.elements.chatMessages) return;
        
        const timestamp = new Date();
        const timeString = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageElement = document.createElement('div');
        messageElement.className = `${sender}-message`;
        
        if (sender === 'ai') {
            messageElement.innerHTML = `
                <div class="message-avatar">
                    <img src="/TestBotAi.png" alt="AI Avatar" onerror="this.src='/default-avatar.png'">
                </div>
                <div class="message-content">
                    <div class="message-text">${content}</div>
                    <div class="message-time">${timeString}</div>
                </div>
            `;
        } else {
            messageElement.innerHTML = `
                <div class="message-content user-message-content">
                    <div class="message-text">${content}</div>
                    <div class="message-time">${timeString}</div>
                </div>
            `;
        }
        
        this.elements.chatMessages.appendChild(messageElement);
        
        if (isPersistent) {
            this.messageHistory.push({
                sender,
                content,
                timestamp: timestamp.toISOString()
            });
            this.saveMessageHistory();
        }
        
        this.scrollToBottom();
    }

    sendMessage() {
        if (!this.elements.userInput) return;
        
        const message = this.elements.userInput.value.trim();
        if (!message) return;
        
        this.elements.userInput.value = '';
        this.addMessage('user', message);
        
        this.showTypingIndicator();
        
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        this.typingTimeout = setTimeout(() => {
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
        
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        this.typingTimeout = setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(question);
            this.addMessage('ai', response);
            
            if (!this.isOpen) {
                this.incrementUnreadCounter();
            }
        }, 800);
    }

    showTypingIndicator() {
        if (this.isTyping || !this.elements.chatMessages) return;
        
        this.isTyping = true;
        
        if (!this.elements.typingIndicator) {
            const typingElement = document.createElement('div');
            typingElement.className = 'ai-message typing-message';
            typingElement.innerHTML = `
                <div class="message-avatar">
                    <img src="/TestBotAi.png" alt="AI Avatar" onerror="this.src='/default-avatar.png'">
                </div>
                <div class="message-content">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            this.elements.chatMessages.appendChild(typingElement);
            this.elements.typingIndicator = typingElement;
        } else {
            this.elements.typingIndicator.style.display = 'flex';
        }
        
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        if (this.elements.typingIndicator) {
            this.elements.typingIndicator.style.display = 'none';
        }
    }

    generateResponse(message) {
        const cleanMsg = message.toLowerCase();
        
        if (/(hi|hello|hey|greetings)/i.test(cleanMsg)) {
            const greetings = [
                "Hello there! 👋 How can I assist you with your Minecraft server today?",
                "Hey! 😊 What do you need help with?",
                "Hi there! 🚀 Need plugin suggestions or server setup help?",
                "Greetings, adventurer! 🏰 How can I help with your server?",
                "Yo! 🤙 What's up? Need anything for your Minecraft world?",
                "Hey there! 🎮 Ready to make your server awesome? Let me know how I can help!"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        if (/(plan|price|cost|package|tier|pricing)/i.test(cleanMsg)) {
            return `We have a variety of hosting plans tailored to your needs:<br><br>
                <div class="plan-option"><strong>Budget Plan</strong> (₱80/month)<br>
                    <small>Xeon E5-2650 V4 • DDR4 2133Mhz</small></div>
                <div class="plan-option"><strong>Enterprise Plan</strong> (₱130/month)<br>
                    <small>Xeon E5-2698 V3 • DDR4 2666Mhz</small></div>
                <div class="plan-option"><strong>Professional Plan</strong> (₱250/month)<br>
                    <small>Ryzen 7 2700X • DDR4 3200Mhz</small></div>
                <a href="/available/Pricing-Plans.html" class="btn-in-chat">Explore All Plans</a>`;
        }
        
        if (/(setup|install|start|begin|configure)/i.test(cleanMsg)) {
            return `Getting your server up and running is a breeze! Follow these steps:<br><br>
                1. Check your email for login credentials.<br>
                2. Access your <a href="https://srv.mcziehost.fun:8443" target="_blank">control panel</a>.<br>
                3. Follow our detailed <a href="/index.html">setup guide</a>.<br><br>
                Need help? <button class="quick-action-btn" data-question="I need setup help">Click here</button>`;
        }
    
        if (/performance|lag|optimize/i.test(cleanMsg)) {
            return `🚀 <strong>Performance Optimization Plugins</strong>:<br><br>
                - 🛠️ <a href="https://www.spigotmc.org/resources/spark.57242/" target="_blank"><strong>Spark</strong></a> (Performance profiling & monitoring)<br>
                - 🧹 <a href="https://www.spigotmc.org/resources/clearlagg.68271/" target="_blank"><strong>ClearLag</strong></a> (Removes unnecessary entities to reduce lag)<br>
                - 🌍 <a href="https://www.spigotmc.org/resources/chunky.81534/" target="_blank"><strong>Chunky</strong></a> (Efficient world pre-loading to reduce lag)<br><br>
                <small>Tip: Use <code>/spark sampler</code> to identify performance issues</small>`;
        }
    
        if (/economy|money|shop/i.test(cleanMsg)) {
            return `💰 <strong>Economy Plugins for Your Server</strong>:<br><br>
                - 🏦 <a href="https://www.spigotmc.org/resources/essentialsx.9089/" target="_blank"><strong>EssentialsX</strong></a> (Core economy commands & features)<br>
                - 💳 <a href="https://www.spigotmc.org/resources/vault.34315/" target="_blank"><strong>Vault</strong></a> (Economy API for other plugins)<br>
                - 🛍️ <a href="https://www.spigotmc.org/resources/shopguiplus.6515/" target="_blank"><strong>ShopGUIPlus</strong></a> (GUI-based player shop system)<br><br>
                <small>Remember to install Vault for economy plugins to work together</small>`;
        }

        if (/protection|anti-grief|security/i.test(cleanMsg)) {
            return `🛡️ <strong>Protection & Anti-Griefing Plugins</strong>:<br><br>
                - 🔒 <a href="https://www.spigotmc.org/resources/worldguard.18911/" target="_blank"><strong>WorldGuard</strong></a> (Protects land & areas from griefing)<br>
                - 📜 <a href="https://www.spigotmc.org/resources/coreprotect.8631/" target="_blank"><strong>CoreProtect</strong></a> (Logs block changes & rollbacks)<br>
                - 🏡 <a href="https://www.spigotmc.org/resources/griefprevention.1884/" target="_blank"><strong>GriefPrevention</strong></a> (Players can claim land to prevent griefing)<br><br>
                <small>Pro Tip: Use CoreProtect for rollback commands like <code>/co restore</code></small>`;
        }

        if (/pvp|combat|battle/i.test(cleanMsg)) {
            return `⚔️ <strong>PvP & Combat Plugins</strong>:<br><br>
                - 🏹 <a href="https://www.spigotmc.org/resources/duels.20171/" target="_blank"><strong>Duels</strong></a> (Organized 1v1 battles)<br>
                - ⚔️ <a href="https://www.spigotmc.org/resources/advancedclans.71765/" target="_blank"><strong>AdvancedClans</strong></a> (Factions-based PvP system)<br>
                - ⛔ <a href="https://www.spigotmc.org/resources/worldguard.18911/" target="_blank"><strong>WorldGuard</strong></a> (Create PvP-enabled/disabled zones)<br><br>
                <button class="quick-action-btn" data-question="How to set up PvP arenas">Help with PvP Arenas</button>`;
        }

        if (/fun|customization|cosmetic/i.test(cleanMsg)) {
            return `🎮 <strong>Fun & Customization Plugins</strong>:<br><br>
                - ✨ <a href="https://www.spigotmc.org/resources/decentholograms.83757/" target="_blank"><strong>DecentHolograms</strong></a> (Floating text displays)<br>
                - 🎨 <a href="https://www.spigotmc.org/resources/itemsadder.73355/" target="_blank"><strong>ItemsAdder</strong></a> (Adds custom items & cosmetics)<br>
                - 🐉 <a href="https://www.spigotmc.org/resources/mythicmobs.5702/" target="_blank"><strong>MythicMobs</strong></a> (Create custom mobs & bosses)<br><br>
                <button class="quick-action-btn" data-question="How to add custom items">Custom Items Guide</button>`;
        }

        if (/error|crash|issue|problem|fix|help/i.test(cleanMsg)) {
            return `🛠️ <strong>Server Issue Help</strong>:<br><br>
                I can help analyze server errors. Try:<br>
                1. Share your error log using the <i class="icon-file-upload"></i> button<br>
                2. Describe when the problem occurs<br>
                3. Tell me your server version<br><br>
                <button class="quick-action-btn" data-question="My server won't start">Startup Problems</button>
                <button class="quick-action-btn" data-question="My server is lagging">Lag Issues</button>`;
        }

        if (/thank|thanks|appreciate|helpful/i.test(cleanMsg)) {
            const thanksResponses = [
                "You're welcome! 😊 Happy to help with your Minecraft server!",
                "No problem at all! 🎮 Let me know if you need anything else.",
                "Glad I could help! ⚡ Come back anytime you have server questions!",
                "My pleasure! 🏰 Enjoy your enhanced server experience!"
            ];
            return thanksResponses[Math.floor(Math.random() * thanksResponses.length)];
        }

        const fallbackMessages = [
            "Hmm, I didn't quite catch that. Could you rephrase your question about your Minecraft server?",
            "I'm not sure I understand. Could you provide more details about your server issue?",
            "That's an interesting question! Are you asking about server setup, plugins, or hosting?",
            "I specialize in Minecraft server help. Could you clarify your question?",
            "Let me think... 🤔 Could you ask that in a different way?",
            "I want to make sure I help properly. What exactly are you trying to do with your server?"
        ];
        
        return fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
    }

    scrollToBottom() {
        if (this.elements.chatMessages) {
            this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
        }
    }

    incrementUnreadCounter() {
        this.unreadMessages++;
        if (this.elements.notificationBadge) {
            this.elements.notificationBadge.textContent = this.unreadMessages > 9 ? '9+' : this.unreadMessages;
            this.elements.notificationBadge.style.display = 'block';
            this.pulseIcon();
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
                    this.showWelcomeMessage();
                }
            }, 5000);
        }
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('ai', `👋 Welcome to MCZIE Hosting Support! How can I help with your Minecraft server today?`, false);
        }, 1000);
    }

    pulseIcon() {
        const pulseRing = document.querySelector('.pulse-ring');
        if (pulseRing) {
            pulseRing.classList.add('active');
            setTimeout(() => {
                pulseRing.classList.remove('active');
            }, 3000);
        }
    }

    setupInactivityTimer() {
        this.resetInactivityTimer();
        
        const events = ['mousemove', 'keypress', 'scroll', 'click', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, () => this.resetInactivityTimer());
        });
    }

    resetInactivityTimer() {
        if (this.inactivityTimeout) {
            clearTimeout(this.inactivityTimeout);
        }
        
        this.inactivityTimeout = setTimeout(() => {
            if (this.isOpen && this.messageHistory.length > 0) {
                this.addMessage('ai', "Still there? I'm here if you have any questions about your Minecraft server!", false);
            }
        }, 300000);
    }

    toggleEmojiPicker() {
        console.log("Emoji picker would open here");
    }

    uploadFile() {
        console.log("File upload dialog would open here");
    }

    handleWindowResize() {
        if (this.isOpen && window.innerWidth < 768) {
            this.elements.chatContainer.style.maxHeight = `${window.innerHeight - 100}px`;
        }
    }

    saveMessageHistory() {
        try {
            localStorage.setItem('mczieChatHistory', JSON.stringify({
                messages: this.messageHistory.slice(-50),
                lastUpdated: new Date().toISOString()
            }));
        } catch (e) {
            console.warn('Failed to save chat history:', e);
        }
    }

    loadMessageHistory() {
        try {
            const saved = localStorage.getItem('mczieChatHistory');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.messages && Array.isArray(parsed.messages)) {
                    this.messageHistory = parsed.messages;

                    if (this.isOpen && this.elements.chatMessages) {
                        this.elements.chatMessages.innerHTML = '';
                        this.messageHistory.forEach(msg => {
                            this.addMessage(msg.sender, msg.content, false);
                        });
                    }
                }
            }
        } catch (e) {
            console.warn('Failed to load chat history:', e);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        window.mczieChatWidget = new MCZIEChatWidget();
        
        window.toggleChatWidget = function() {
            if (window.mczieChatWidget) {
                window.mczieChatWidget.toggleChat();
            }
        };
    } catch (e) {
        console.error('Failed to initialize chat widget:', e);
    }
});