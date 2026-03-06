import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { LayoutDashboard, Target, TrendingUp, Layers } from 'lucide-react';

export default function CLevelMatrix() {
    const [radarData, setRadarData] = useState([]);
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        const randomize = () => {
            setRadarData([
                { subject: 'Efficiency', A: Math.random() * 50 + 50 },
                { subject: 'Growth', A: Math.random() * 50 + 50 },
                { subject: 'Stability', A: Math.random() * 50 + 50 },
                { subject: 'Innovation', A: Math.random() * 50 + 50 },
                { subject: 'ESG', A: Math.random() * 50 + 50 }
            ]);
            setPieData([
                { name: 'OPEX', value: Math.random() * 400 + 100 },
                { name: 'CAPEX', value: Math.random() * 300 + 100 },
                { name: 'R&D', value: Math.random() * 200 + 100 }
            ]);
        };

        randomize();
        const interval = setInterval(randomize, 3000);
        return () => clearInterval(interval);
    }, []);

    const COLORS = ['#10b981', '#6366f1', '#f59e0b'];

    return (
        <div className="w-full h-full bg-bg-primary text-text-primary p-4 md:p-6 lg:p-10 flex flex-col font-sans overflow-y-auto">

            <header className="flex flex-col sm:flex-row justify-between items-start mb-6 lg:mb-8 border-b border-bg-card pb-4 lg:pb-6 gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                        <LayoutDashboard className="text-accent-emerald" />
                        PREDICTIVE C-LEVEL MATRIX
                    </h1>
                    <p className="text-text-muted text-[10px] md:text-sm mt-1 font-mono uppercase tracking-widest">Multi-dimensional BI Simulation</p>
                </div>
                <div className="flex bg-bg-card border border-white/5 rounded-lg p-1 w-fit">
                    <button className="px-3 md:px-4 py-1.5 bg-white/10 text-white text-[10px] md:text-xs uppercase font-bold rounded shadow">Exec</button>
                    <button className="px-3 md:px-4 py-1.5 text-text-muted text-[10px] md:text-xs uppercase font-bold rounded hover:text-white">Fin</button>
                    <button className="px-3 md:px-4 py-1.5 text-text-muted text-[10px] md:text-xs uppercase font-bold rounded hover:text-white">Ops</button>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* KPI 1 */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-bg-card border border-white/5 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-4 opacity-10">
                        <TrendingUp size={80} />
                    </div>
                    <div className="text-text-muted text-sm uppercase tracking-wider flex items-center gap-2">
                        <Target size={16} className="text-accent-blue" /> Goal Trajectory
                    </div>
                    <div>
                        <div className="text-4xl font-black text-white">142.8%</div>
                        <div className="text-accent-emerald text-sm font-bold mt-1">+12% vs last quarter</div>
                    </div>
                </motion.div>

                {/* Radar Chart */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="col-span-1 row-span-2 bg-bg-card border border-white/5 rounded-xl p-6 flex flex-col">
                    <div className="text-text-muted text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Layers size={16} className="text-accent-purple" /> Performance Vectors
                    </div>
                    <div className="flex-1 min-h-0 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a0a0b8', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Company" dataKey="A" stroke="#8b5cf6" strokeWidth={2} fill="#8b5cf6" fillOpacity={0.3} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Pie Chart */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="col-span-1 row-span-2 bg-bg-card border border-white/5 rounded-xl p-6 flex flex-col">
                    <div className="text-text-muted text-sm uppercase tracking-wider mb-4">Capital Distribution (Simulated)</div>
                    <div className="flex-1 min-h-0 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        {pieData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-text-muted uppercase">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                {entry.name}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* KPI 2 */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-bg-card border border-white/5 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-accent-amber/10 blur-2xl rounded-full" />
                    <div className="text-text-muted text-sm uppercase tracking-wider z-10">Risk Index</div>
                    <div className="z-10">
                        <div className="text-4xl font-black text-white">0.024</div>
                        <div className="text-accent-amber text-sm font-bold mt-1">Acceptable tolerance</div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
