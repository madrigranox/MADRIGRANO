import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadioTower, ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';

export default function FleetSync() {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const generateFlight = (id) => ({
            id,
            code: `QTX-${Math.floor(Math.random() * 9000) + 1000}`,
            dest: ['FPSO Alpha', 'Orbital Base', 'Platform Omega', 'Sector 7', 'Hub Central'][Math.floor(Math.random() * 5)],
            status: ['SYNCING', 'DEPARTED', 'ARRIVED', 'DELAYED'][Math.floor(Math.random() * 4)],
            syncRate: (Math.random() * 99).toFixed(2),
            trend: Math.random() > 0.5 ? 'up' : 'down'
        });

        setFlights(Array.from({ length: 8 }).map((_, i) => generateFlight(i)));

        const interval = setInterval(() => {
            setFlights(prev => {
                const next = [...prev];
                const updateIdx = Math.floor(Math.random() * next.length);
                next[updateIdx] = { ...generateFlight(next[updateIdx].id), status: 'SYNCING' };
                return next;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'SYNCING': return 'text-accent-blue bg-accent-blue/10 border-accent-blue/30';
            case 'DEPARTED': return 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/30';
            case 'ARRIVED': return 'text-text-muted bg-white/5 border-white/10';
            case 'DELAYED': return 'text-accent-rose bg-accent-rose/10 border-accent-rose/30';
            default: return '';
        }
    };

    return (
        <div className="w-full h-full bg-bg-primary text-text-primary p-4 md:p-6 lg:p-10 flex flex-col font-mono overflow-y-auto">

            <header className="flex flex-col sm:flex-row justify-between items-start mb-6 lg:mb-8 border-b border-white/10 pb-4 lg:pb-6 gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                        <RadioTower className="text-accent-amber animate-pulse" />
                        QUANTUM FLEET SYNC
                    </h1>
                    <p className="text-text-muted text-[10px] md:text-sm mt-1 uppercase tracking-widest">Sub-space array data stream active</p>
                </div>
                <div className="flex items-center gap-2 text-accent-amber bg-accent-amber/10 px-3 md:px-4 py-2 rounded-lg border border-accent-amber/20 w-fit">
                    <RefreshCcw size={14} className="animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="text-xs md:text-sm font-bold uppercase">128ms PING</span>
                </div>
            </header>

            <div className="flex-1 overflow-hidden bg-bg-card border border-white/5 rounded-xl flex flex-col relative min-h-[400px]">
                {/* Glow behind table */}
                <div className="absolute top-0 left-1/2 w-3/4 h-32 bg-accent-amber/5 blur-3xl -translate-x-1/2" />

                {/* Table Header - Desktop Only */}
                <div className="hidden md:grid grid-cols-5 text-[10px] lg:text-sm uppercase tracking-wider text-text-muted p-4 border-b border-white/5 bg-bg-secondary relative z-10">
                    <div>Entity Signature</div>
                    <div>Destination Vector</div>
                    <div>Sync Status</div>
                    <div>Data Rate (TB/s)</div>
                    <div>Telemetry</div>
                </div>

                <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar p-2 lg:p-4">
                    <AnimatePresence>
                        {flights.map((flight) => (
                            <motion.div
                                key={`${flight.id}-${flight.code}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col md:grid md:grid-cols-5 items-start md:items-center p-4 mb-3 rounded-lg border border-white/5 bg-bg-secondary md:bg-transparent md:hover:bg-white/5 transition-colors group gap-3 md:gap-0"
                            >
                                <div className="font-bold text-white flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-amber group-hover:animate-ping" />
                                    <span className="md:hidden text-text-muted text-[10px] uppercase font-normal mr-1">ID:</span>
                                    {flight.code}
                                </div>
                                <div className="text-text-secondary text-sm md:text-base">
                                    <span className="md:hidden text-text-muted text-[10px] uppercase font-normal block mb-1">Destination:</span>
                                    {flight.dest}
                                </div>
                                <div>
                                    <span className={`px-2 py-1 text-[10px] lg:text-xs font-bold rounded border ${getStatusColor(flight.status)}`}>
                                        {flight.status}
                                    </span>
                                </div>
                                <div className="text-white flex items-center gap-2 font-bold text-sm md:text-base">
                                    <span className="md:hidden text-text-muted text-[10px] uppercase font-normal mr-1">Rate:</span>
                                    {flight.syncRate}
                                    {flight.trend === 'up' ? <ArrowUpRight size={14} className="text-accent-emerald" /> : <ArrowDownRight size={14} className="text-accent-rose" />}
                                </div>
                                <div className="w-full md:w-auto">
                                    <span className="md:hidden text-text-muted text-[10px] uppercase font-normal block mb-1">Sync Telemetry:</span>
                                    <div className="w-full bg-bg-primary h-1.5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-accent-amber/50 to-accent-amber"
                                            initial={{ width: '0%' }}
                                            animate={{ width: `${flight.syncRate}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
