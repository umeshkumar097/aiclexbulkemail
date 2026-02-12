"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, User, Globe } from "lucide-react";

interface EmailPacket {
    id: number;
    status: "sending" | "sent";
    color: string;
}

export function LiveEmailSending() {
    const [packets, setPackets] = useState<EmailPacket[]>([]);
    const [sentCount, setSentCount] = useState(0);

    useEffect(() => {
        // Simulate sending emails continuously
        const interval = setInterval(() => {
            const newPacket = {
                id: Date.now(),
                status: "sending" as const,
                color: Math.random() > 0.5 ? "text-blue-500" : "text-cyan-500",
            };

            setPackets((prev) => [...prev.slice(-5), newPacket]); // Keep max 6 packets in DOM
            setSentCount((prev) => prev + 1);
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden h-full min-h-[200px] flex flex-col">
            <div className="flex justify-between items-center mb-6 z-10">
                <h3 className="text-lg font-bold text-slate-900">Live Activity</h3>
                <span className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Processing
                </span>
            </div>

            <div className="flex-1 flex items-center justify-between px-4 sm:px-12 relative z-10">
                {/* Source: User/Campaign */}
                <div className="flex flex-col items-center gap-2 relative">
                    <div className="h-14 w-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center z-10">
                        <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-xs font-semibold text-slate-600">Campaign</div>
                    <motion.div
                        className="absolute -inset-2 rounded-full border border-blue-200"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>

                {/* The Connection Line */}
                <div className="flex-1 h-0.5 bg-slate-100 mx-4 relative flex items-center">
                    {/* Travelling Packets */}
                    <AnimatePresence>
                        {packets.map((packet) => (
                            <motion.div
                                key={packet.id}
                                initial={{ x: 0, opacity: 0, scale: 0.5 }}
                                animate={{
                                    x: "100%",
                                    opacity: [0, 1, 1, 0],
                                    scale: 1
                                }}
                                transition={{ duration: 1.5, ease: "linear" }}
                                className="absolute left-0"
                                style={{ x: 0 }}
                            >
                                <div className={`p-1.5 rounded-full bg-white border shadow-sm ${packet.color}`}>
                                    <Mail className="h-3 w-3" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Destination: Server/Internet */}
                <div className="flex flex-col items-center gap-2 relative">
                    <div className="h-14 w-14 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center z-10">
                        <Globe className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div className="text-xs font-semibold text-slate-600">Delivered</div>
                    <motion.div
                        className="absolute -right-2 -top-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white shadow-sm"
                        key={sentCount}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                    >
                        {sentCount > 99 ? '99+' : sentCount}
                    </motion.div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-slate-50/50 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.3 }}>
            </div>
        </div>
    );
}
