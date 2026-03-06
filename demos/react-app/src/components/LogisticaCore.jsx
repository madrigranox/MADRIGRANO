import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Truck, Ship, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LogisticaCore() {
    const [entities, setEntities] = useState([]);

    // Generate random entities
    useEffect(() => {
        const types = ['plane', 'truck', 'ship'];
        const initial = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            type: types[Math.floor(Math.random() * types.length)],
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            status: Math.random() > 0.8 ? 'alert' : 'ok',
            speed: Math.random() * 2 + 0.5
        }));
        setEntities(initial);

        const interval = setInterval(() => {
            setEntities(prev => prev.map(e => ({
                ...e,
                x: e.x + (Math.random() - 0.5) * e.speed,
                y: e.y + (Math.random() - 0.5) * e.speed,
                status: Math.random() > 0.95 ? (e.status === 'ok' ? 'alert' : 'ok') : e.status
            })));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full bg-bg-primary text-text-primary p-4 md:p-6 lg:p-10 flex flex-col font-sans overflow-y-auto lg:overflow-hidden">

            {/* Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start mb-6 lg:mb-8 border-b border-bg-card pb-4 lg:pb-6 gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                        <Activity className="text-accent-blue animate-pulse" />
                        <span className="hidden xs:inline">OMNISCIENT LOGISTICS CORE</span>
                        <span className="xs:hidden">LOGISTICS CORE</span>
                    </h1>
                    <p className="text-text-muted text-[10px] md:text-sm mt-1 font-mono uppercase tracking-widest">Global Fleet Sync • Neural Tracking</p>
                </div>
                <div className="flex gap-3 md:gap-4 w-full sm:w-auto">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none bg-bg-card px-3 md:px-4 py-2 rounded-lg border border-accent-blue/20 flex flex-col items-center sm:items-end cursor-pointer">
                        <span className="text-[10px] text-text-muted uppercase">Nodes</span>
                        <span className="text-lg md:text-xl font-bold text-accent-blue">{entities.length}</span>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none bg-bg-card px-3 md:px-4 py-2 rounded-lg border border-accent-rose/20 flex flex-col items-center sm:items-end cursor-pointer">
                        <span className="text-[10px] text-text-muted uppercase">Alerts</span>
                        <span className="text-lg md:text-xl font-bold text-accent-rose">
                            {entities.filter(e => e.status === 'alert').length}
                        </span>
                    </motion.div>
                </div>
            </header>

            {/* Main Grid View */}
            <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">

                {/* Radar Map */}
                <div className="flex-1 min-h-[300px] bg-bg-card rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                    {/* Grid lines */}
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                    {/* Radar Sweep */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[150%] h-[150%] rounded-full"
                        style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(59, 130, 246, 0.1) 100%)' }}
                    />

                    {/* Entities */}
                    {entities.map(entity => (
                        <motion.div
                            key={entity.id}
                            animate={{ left: `${entity.x}%`, top: `${entity.y}%` }}
                            transition={{ duration: 1, ease: 'linear' }}
                            className={`absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2`}
                        >
                            <motion.div
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className={`p-2 rounded-full backdrop-blur-md border cursor-pointer ${entity.status === 'alert' ? 'bg-accent-rose/20 border-accent-rose text-accent-rose shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'bg-accent-blue/20 border-accent-blue text-accent-blue hover:bg-accent-blue/40 transition-colors'}`}
                            >
                                {entity.type === 'plane' && <Plane size={14} />}
                                {entity.type === 'truck' && <Truck size={14} />}
                                {entity.type === 'ship' && <Ship size={14} />}
                            </motion.div>
                            {entity.status === 'alert' && (
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="absolute inset-0 border border-accent-rose rounded-full"
                                />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Side Panel */}
                <div className="w-80 bg-bg-card rounded-xl border border-white/5 p-5 pr-2 flex flex-col hidden lg:flex">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-4">Live Feed</h3>
                    <div className="flex-1 overflow-y-auto pr-3 space-y-3 custom-scrollbar">
                        {entities.map(e => (
                            <div key={`feed-${e.id}`} className="bg-bg-secondary p-3 rounded-lg border border-white/5 flex items-start gap-3">
                                <div className={`mt-0.5 ${e.status === 'alert' ? 'text-accent-rose' : 'text-accent-emerald'}`}>
                                    {e.status === 'alert' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-white flex items-center gap-2">
                                        {e.type.toUpperCase()}-{String(e.id).padStart(4, '0')}
                                        <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-text-muted">{e.speed.toFixed(1)}x</span>
                                    </div>
                                    <div className="text-xs text-text-muted mt-1 font-mono">
                                        [{e.x.toFixed(2)}, {e.y.toFixed(2)}]
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
