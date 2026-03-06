import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Sparkles, Send, Database, Lock } from 'lucide-react';

export default function RagOracle() {
    const [messages, setMessages] = useState([
        { id: 1, role: 'system', text: 'AUTONOMOUS RAG ORACLE ACTIVE', type: 'info' }
    ]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const scrollRef = useRef(null);

    const autoScroll = () => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    };

    useEffect(() => { autoScroll(); }, [messages]);

    const simulateProcessing = async (userText) => {
        setIsProcessing(true);
        setMessages(p => [...p, { id: Date.now(), role: 'user', text: userText }]);

        // Step 1: Embedding
        await new Promise(r => setTimeout(r, 600));
        setMessages(p => [...p, { id: Date.now() + 1, role: 'system', text: 'Generating text embeddings [dim: 1536]...', type: 'process' }]);

        // Step 2: Vector Search
        await new Promise(r => setTimeout(r, 800));
        setMessages(p => [...p, { id: Date.now() + 2, role: 'system', text: 'Querying secure Vector DB [0.94 cosine sim]...', type: 'process' }]);

        // Step 3: Synthesis
        await new Promise(r => setTimeout(r, 1000));
        const response = "Based on strict corporate policies extracted from `Manual_Embarque_v4.pdf` (p. 12), the standard procedure requires a 256-bit encrypted validation via the unified portal before 48h SLA.";

        setIsProcessing(false);
        setMessages(p => [...p, { id: Date.now() + 3, role: 'bot', text: response }]);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim() || isProcessing) return;
        const txt = input;
        setInput('');
        simulateProcessing(txt);
    };

    return (
        <div className="w-full h-full bg-bg-primary text-text-primary p-4 md:p-6 lg:p-10 flex flex-col font-sans overflow-hidden">

            <header className="flex flex-col sm:flex-row justify-between items-start mb-4 lg:mb-6 border-b border-white/5 pb-3 lg:pb-4 gap-3">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                        <Cpu className="text-accent-purple" />
                        <span className="hidden xs:inline">AUTONOMOUS RAG ORACLE</span>
                        <span className="xs:hidden">RAG ORACLE</span>
                    </h1>
                    <p className="text-text-muted text-[10px] md:text-sm mt-1 font-mono uppercase tracking-widest flex items-center gap-2">
                        <Lock size={12} /> Secure LLM Instantiation
                    </p>
                </div>
            </header>

            <div className="flex-1 overflow-hidden bg-bg-card border border-white/5 rounded-xl flex flex-col relative shadow-2xl min-h-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/5 rounded-full blur-3xl" />

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10" ref={scrollRef}>
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                layout
                                className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'ml-auto items-end' : 'items-start'}`}
                            >
                                {msg.role === 'system' && (
                                    <div className={`text-xs font-mono uppercase px-3 py-1.5 rounded items-center flex gap-2
                    ${msg.type === 'info' ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20' : 'text-text-muted bg-bg-secondary border border-white/5'}`}>
                                        {msg.type === 'info' ? <Terminal size={12} /> : <Database size={12} className="animate-pulse" />}
                                        {msg.text}
                                    </div>
                                )}

                                {msg.role === 'user' && (
                                    <div className="bg-white/10 text-white rounded-2xl rounded-tr-sm px-5 py-3 border border-white/5">
                                        {msg.text}
                                    </div>
                                )}

                                {msg.role === 'bot' && (
                                    <div className="bg-accent-purple/10 text-text-primary rounded-2xl rounded-tl-sm px-5 py-4 border border-accent-purple/20 shadow-[0_0_20px_rgba(139,92,246,0.1)] leading-relaxed">
                                        <Sparkles size={16} className="text-accent-purple inline-block mr-2 -mt-1" />
                                        {msg.text}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isProcessing && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-accent-purple text-xs font-mono">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-ping" />
                            Synthesizing response constraint...
                        </motion.div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/5 bg-bg-secondary/50 relative z-10">
                    <form onSubmit={handleSend} className="relative flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Query the restricted company domain..."
                            disabled={isProcessing}
                            className="w-full bg-bg-primary border border-white/10 rounded-xl px-5 py-3.5 pr-14 text-white placeholder-text-muted outline-none focus:border-accent-purple/50 focus:ring-1 ring-accent-purple/50 transition-all font-mono text-sm disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={isProcessing || !input.trim()}
                            className="absolute right-2 p-2 bg-accent-purple hover:bg-accent-purple/80 text-white rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-accent-purple"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
