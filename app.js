// QuantumAI Class
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

    weightedRandomSelection(options) {
        const totalWeight = Object.values(options).reduce((sum, option) => sum + option.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const [key, option] of Object.entries(options)) {
            random -= option.weight;
            if (random <= 0) {
                return key;
            }
        }
        
        return Object.keys(options)[0];
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
        if (/minecraft|server|hosting/i.test(lowerText)) return 'minecraft';
        
        return 'unknown';
    }

    extractEntities(text) {
        const entities = {
            versions: text.match(/(1\.\d{1,2}(\.\d{1,2})?)|(java\s*\d+)/gi) || [],
            plugins: text.match(/\b(spark|worldguard|essentials|vault|clearlag|chunky|luckperms|itemsadder)\b/gi) || [],
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

    detectUrgency(text) {
        if (!text) return 'low';
        
        const lowerText = text.toLowerCase();
        if (/(urgent|emergency|immediately|asap|right now|broken|down|not working)/i.test(lowerText)) {
            return 'high';
        } else if (/(soon|today|quick|fast|help|issue|problem)/i.test(lowerText)) {
            return 'medium';
        }
        return 'low';
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

    getMoodResponse() {
        const moodResponses = {
            happy: "I'm happy to help!",
            excited: "I'm excited to assist you!",
            technical: "From a technical perspective,",
            playful: "Let's play with some ideas!",
            thoughtful: "After some consideration,",
            supportive: "I'm here to support you with",
            energetic: "I'm energized to help with",
            calm: "Let's calmly address",
            curious: "I'm curious about"
        };
        
        return moodResponses[this.mood] || "I'm here to help with";
    }

    getDynamicGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning! How can I assist with your Minecraft server?";
        if (hour < 18) return "Good afternoon! What do you need help with today?";
        return "Good evening! How can I help with your server?";
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
            "ItemsAdder": "custom items and blocks",
            "EssentialsX": "essential commands and features",
            "Vault": "economy and permissions API",
            "ShopGUIPlus": "GUI-based shopping system",
            "DecentHolograms": "hologram display system",
            "MythicMobs": "custom mobs and bosses"
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

    loadServerKnowledge() {
        return {
            "plans": {
                description: "We offer a range of hosting plans to suit your needs:",
                tiers: [
                    {
                        name: "Budget Plan",
                        price: "₱80/month",
                        specs: "Xeon E5-2650 V4 • DDR4 2133Mhz",
                        bestFor: "Small servers and beginners"
                    },
                    {
                        name: "Enterprise Plan",
                        price: "₱130/month",
                        specs: "Xeon E5-2698 V3 • DDR4 2666Mhz",
                        bestFor: "Medium-sized communities"
                    },
                    {
                        name: "Professional Plan",
                        price: "₱250/month",
                        specs: "Ryzen 7 2700X • DDR4 3200Mhz",
                        bestFor: "Large networks and modpacks"
                    }
                ],
                notes: "All plans include 24/7 support, DDoS protection, and free migrations!"
            },
            "features": {
                description: "Our hosting comes with powerful features:",
                features: [
                    "Instant setup",
                    "99.9% uptime guarantee",
                    "Free SSL certificates",
                    "One-click modpack installs",
                    "Full server access",
                    "Daily backups",
                    "Multicraft control panel",
                    "Global datacenter locations"
                ]
            },
            "commonIssues": {
                setup: "Ensure you've uploaded your server files correctly and set the right JAR file in your control panel.",
                performance: "Try pre-generating chunks with Chunky, optimize entities with ClearLag, and use Spark to identify performance bottlenecks.",
                connection: "Check your server IP and port, ensure the server is running, and verify that your firewall isn't blocking connections."
            }
        };
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

    loadMemory() {
        try {
            const saved = localStorage.getItem('quantumAI_Memory');
            if (saved) {
                this.memory = JSON.parse(saved);
            }
        } catch (e) {
            console.error("Failed to load memory:", e);
            this.memory = [];
        }
    }

    saveMemory() {
        try {
            localStorage.setItem('quantumAI_Memory', JSON.stringify(this.memory));
        } catch (e) {
            console.error("Failed to save memory:", e);
        }
    }

    updateMoodPeriodically() {
        setInterval(() => {
            this.mood = this.getRandomMood();
        }, 3600000);
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

class MCZIEChatWidget {
    constructor() {
        this.isOpen = false;
        this.unreadMessages = 0;
        this.isTyping = false;
        this.messageHistory = [];
        this.typingTimeout = null;
        this.inactivityTimeout = null;
        this.quantumAI = new QuantumAI();
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
                    <img src="/TestBotAi.png" alt="AI Avatar" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzZFOEVGQiI+PHBhdGggZD0iTTEyLDJBMywzIDAgMCwwIDksNUgxNUExLDEgMCAwLDAgMTIsMlpNOSw1QTMsMyAwIDAsMCA2LDJIM0ExLDEgMCAwLDAgMiwzVjIxQTEsMSAwIDAsMCAzLDIySDIxQTEsMSAwIDAsMCAyMiwyMVYzQTEsMSAwIDAsMCAyMSwySDE4QTMsMyAwIDAsMCAxNSw1SDEyTTcsMTJWN0gxN1YxMkg3TTcsMTRIMTdWMTlIN1YxNE03LDRWNUgxN1Y0SDdaIi8+PC9zdmc+'">
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
            const response = this.generateAIResponse(message);
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
            const response = this.generateAIResponse(question);
            this.addMessage('ai', response);
            
            if (!this.isOpen) {
                this.incrementUnreadCounter();
            }
        }, 800);
    }

    generateAIResponse(message) {
        const processedInput = this.quantumAI.processUserInput(message);
        const aiResponse = this.quantumAI.generateResponse(processedInput);
        
        return aiResponse.text;
    }

    showTypingIndicator() {
        if (this.isTyping || !this.elements.chatMessages) return;
        
        this.isTyping = true;
        
        if (!this.elements.typingIndicator) {
            const typingElement = document.createElement('div');
            typingElement.className = 'ai-message typing-message';
            typingElement.innerHTML = `
                <div class="message-avatar">
                    <img src="/TestBotAi.png" alt="AI Avatar" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzZFOEVGQiI+PHBhdGggZD0iTTEyLDJBMywzIDAgMCwwIDksNUgxNUExLDEgMCAwLDAgMTIsMlpNOSw1QTMsMyAwIDAsMCA2LDJIM0ExLDEgMCAwLDAgMiwzVjIxQTEsMSAwIDAsMCAzLDIySDIxQTEsMSAwIDAsMCAyMiwyMVYzQTEsMSAwIDAsMCAyMSwySDE4QTMsMyAwIDAsMCAxNSw1SDEyTTcsMTJWN0gxN1YxMkg3TTcsMTRIMTdWMTlIN1YxNE03LDRWNUgxN1Y0SDdaIi8+PC9zdmc+'">
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