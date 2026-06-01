"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Zap } from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    { label: "Total Courses", value: "8", icon: BarChart3, color: "bg-blue-500" },
    { label: "Completed", value: "3", icon: TrendingUp, color: "bg-green-500" },
    { label: "In Progress", value: "5", icon: Users, color: "bg-purple-500" },
    { label: "Total Hours", value: "142", icon: Zap, color: "bg-orange-500" },
  ];

  const monthData = [
    { month: "Jan", hours: 12 },
    { month: "Feb", hours: 18 },
    { month: "Mar", hours: 24 },
    { month: "Apr", hours: 19 },
    { month: "May", hours: 31 },
    { month: "Jun", hours: 38 },
  ];

  const maxHours = Math.max(...monthData.map(d => d.hours));

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Analytics</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-800"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-zinc-400">{stat.label}</h3>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon size={20} className="text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl p-8 border border-zinc-800"
        >
          <h2 className="text-2xl font-bold mb-6">Learning Hours This Month</h2>

          <div className="flex items-end gap-4 h-64">
            {monthData.map((data, i) => (
              <motion.div
                key={i}
                className="flex-1 flex flex-col items-center gap-2"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <motion.div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg"
                  style={{
                    height: `${(data.hours / maxHours) * 100}%`,
                  }}
                  whileHover={{ scale: 1.05 }}
                />
                <span className="text-xs text-zinc-400">{data.month}</span>
                <span className="text-sm font-semibold">{data.hours}h</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activity Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl p-8 border border-zinc-800"
        >
          <h2 className="text-2xl font-bold mb-4">Activity Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Current Streak</span>
              <span className="font-bold text-orange-400">12 days 🔥</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Weekly Average</span>
              <span className="font-bold text-blue-400">28 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total XP</span>
              <span className="font-bold text-purple-400">2,450 XP</span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
