import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Users, Clock, AlertTriangle } from 'lucide-react';

export default function AlgorithmicWorkforce() {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        // Generate grid nodes
        const initialNodes = Array.from({ length: 42 }).map((_, i) => ({
            id: i,
            state: Math.random() > 0.7 ? 'active' : (Math.random() > 0.8 ? 'allocating' : 'idle'),
            efficiency: Math.floor(Math.random() * 40) + 60
        }));
        setNodes(initialNodes);

        const interval = setInterval(() => {
            setNodes(prev => {
                const next = [...prev];
                const idx = Math.floor(Math.random() * next.length);
                const current = next[idx];

                // State machine transition
                let nextState = 'idle';
                if (current.state === 'idle') nextState = 'allocating';
                else if (current.state === 'allocating') nextState = 'active';
                else if (current.state === 'active') nextState = Math.random() > 0.8 ? 'idle' : 'active';

                next[idx] = { ...current, state: nextState, efficiency: nextState === 'active' ? Math.floor(Math.random() * 20) + 80 : current.efficiency };
                return next;
            });
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full bg-bg-primary text-text-primary p-4 md:p-6 lg:p-10 flex flex-col font-sans overflow-y-auto">

            <header className="flex flex-col sm:flex-row justify-between items-start mb-6 lg:mb-8 border-b border-bg-card pb-4 lg:pb-6 gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                        <Network className="text-accent-indigo" />
                        CORE WORKFORCE
                    </h1>
                    <p className="text-text-muted text-[10px] md:text-sm mt-1 font-mono uppercase tracking-widest">Neural Schedule Optimization</p>
                </div>
                <div className="flex w-full sm:w-auto">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none px-4 py-2 bg-accent-indigo/10 border border-accent-indigo/20 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        <Users size={14} className="text-accent-indigo" />
                        <span className="font-bold text-white text-xs md:text-sm">{nodes.filter(n => n.state === 'active').length} Active</span>
                    </motion.div>
                </div>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
                {/* Dynamic Allocation Matrix */}
                <div className="flex-1 bg-bg-card border border-white/5 rounded-xl p-4 lg:p-6 relative flex flex-col min-h-[400px]">
                    <h3 className="text-[10px] md:text-sm font-mono uppercase text-text-muted mb-4 flex items-center gap-2">
                        <Clock size={14} /> Allocation Matrix
                    </h3>

                    <div className="flex-1 grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 gap-2 lg:gap-3">
                        {nodes.map(node => (
                            <motion.div
                                key={node.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    backgroundColor: node.state === 'active' ? 'rgba(99, 102, 241, 0.15)' :
                                        node.state === 'allocating' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(22, 22, 30, 1)',
                                    borderColor: node.state === 'active' ? 'rgba(99, 102, 241, 0.5)' :
                                        node.state === 'allocating' ? 'rgba(245, 158, 11, 0.5)' : 'rgba(255, 255, 255, 0.05)'
                                }}
                                transition={{ duration: 0.5 }}
                                className="border rounded-lg p-3 flex flex-col justify-between relative overflow-hidden"
                            >
                                {node.state === 'allocating' && (
                                    <motion.div
                                        className="absolute inset-0 bg-accent-amber/10"
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                )}
                                <div className="flex justify-between items-start z-10">
                                    <span className="text-xs font-mono text-text-muted">N-{node.id.toString().padStart(2, '0')}</span>
                                    {node.efficiency < 70 && node.state === 'active' && <AlertTriangle size={12} className="text-accent-rose animate-pulse" />}
                                </div>
                                <div className="z-10 mt-2">
                                    <div className={`text-[10px] uppercase font-bold tracking-wider ${node.state === 'active' ? 'text-accent-indigo' :
                                        node.state === 'allocating' ? 'text-accent-amber' : 'text-text-muted'
                                        }`}>
                                        {node.state}
                                    </div>
                                    {node.state === 'active' && (
                                        <div className="text-sm font-bold text-white mt-1">
                                            {node.efficiency}% EFF
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Console output */}
                <div className="w-72 bg-bg-secondary rounded-xl border border-white/5 p-4 font-mono text-xs overflow-hidden flex flex-col">
                    <h3 className="text-text-muted uppercase mb-4 border-b border-white/5 pb-2">Solver Kernel Log</h3>
                    <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2 flex flex-col-reverse text-text-secondary">
                        {nodes.filter(n => n.state !== 'idle').slice(0, 15).map((n, i) => (
                            <div key={`log-${n.id}-${i}`} className="opacity-80 break-words">
                                <span className="text-accent-blue">&gt;</span> [T+{(Math.random() * 100).toFixed(2)}] Node {n.id} transition to <span className={n.state === 'active' ? 'text-accent-emerald' : 'text-accent-amber'}>{n.state.toUpperCase()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
