import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, Zap, Droplets, Target, ShieldCheck } from 'lucide-react';

export default function EsgEngine() {
    const [data, setData] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        // Generate streaming data
        const generateData = () => {
            let currentVal = 400;
            return Array.from({ length: 30 }).map((_, i) => {
                currentVal = Math.max(100, currentVal + (Math.random() - 0.5) * 50);
                return { time: i, co2: currentVal, baseline: 350 };
            });
        };

        setData(generateData());
        setScore(89.4);

        const interval = setInterval(() => {
            setData(prev => {
                const newD = [...prev.slice(1)];
                const last = newD[newD.length - 1].co2;
                newD.push({
                    time: newD[newD.length - 1].time + 1,
                    co2: Math.max(100, last + (Math.random() - 0.5) * 50),
                    baseline: 350
                });
                return newD;
            });
            setScore(prev => +(prev + (Math.random() - 0.5) * 0.2).toFixed(1));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full bg-bg-primary text-text-primary p-4 md:p-6 lg:p-10 flex flex-col font-sans overflow-y-auto">

            {/* Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start mb-6 lg:mb-8 border-b border-bg-card pb-4 lg:pb-6 gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                        <Leaf className="text-accent-emerald" />
                        ESG NEURAL ENGINE
                    </h1>
                    <p className="text-text-muted text-[10px] md:text-sm mt-1 font-mono uppercase tracking-widest">Sustainability Matrix Simulation</p>
                </div>
                <div className="flex w-full sm:w-auto">
                    <motion.div
                        key={score}
                        initial={{ scale: 1.1, color: '#10b981' }}
                        animate={{ scale: 1, color: '#a0a0b8' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 sm:flex-none bg-bg-card px-4 py-2 rounded-lg border border-accent-emerald/30 flex flex-col items-center sm:items-end cursor-pointer hover:border-accent-emerald transition-colors"
                    >
                        <span className="text-[10px] text-text-muted uppercase tracking-widest">ESG Score</span>
                        <span className="text-2xl md:text-3xl font-black text-white">{score}</span>
                    </motion.div>
                </div>
            </header>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                {[
                    { icon: <Zap size={20} />, label: "Grid Energy", val: "142.5 MWh", diff: "-12%" },
                    { icon: <Droplets size={20} />, label: "Water Nexus", val: "84k L", diff: "-4%" },
                    { icon: <Target size={20} />, label: "Carbon Offset", val: "12k ton", diff: "+28%", good: true },
                    { icon: <ShieldCheck size={20} />, label: "Compliance", val: "99.9%", diff: "Nominal", good: true }
                ].map((kpi, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-bg-secondary p-5 rounded-xl border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-emerald/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent-emerald/10 transition-colors" />
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="p-2 bg-bg-primary rounded-lg text-accent-emerald border border-accent-emerald/20">
                                {kpi.icon}
                            </div>
                            <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${kpi.good ? 'bg-accent-emerald/10 text-accent-emerald' : 'bg-accent-blue/10 text-accent-blue'}`}>
                                {kpi.diff}
                            </span>
                        </div>
                        <div className="text-sm text-text-muted uppercase tracking-wider relative z-10">{kpi.label}</div>
                        <div className="text-2xl font-bold text-white mt-1 relative z-10">{kpi.val}</div>
                    </motion.div>
                ))}
            </div>

            {/* Chart Area */}
            <div className="flex-1 bg-bg-card border border-white/5 rounded-xl p-6 relative overflow-hidden flex flex-col">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent-rose animate-pulse" />
                    Live CO2e Emissions Target Projection
                </h3>

                <div className="flex-1 min-h-0 relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" hide />
                            <YAxis stroke="#6b6b80" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#16161e', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="co2" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorCo2)" isAnimationActive={false} />
                            <Area type="monotone" dataKey="baseline" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorBase)" isAnimationActive={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute bottom-6 right-6 px-4 py-2 bg-accent-purple/10 border border-accent-purple/20 rounded-md text-accent-purple font-mono text-sm z-10 cursor-pointer shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                >
                    Predictive Offset: Active
                </motion.button>
            </div>
        </div>
    );
}
