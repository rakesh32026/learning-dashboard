"use client";

import { motion } from "framer-motion";

export default function ActivityTile() {
  const bars = [40, 90, 50, 120, 80, 60, 110];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const barVariants = {
    hidden: { height: 0 },
    visible: (i) => ({
      height: "auto",
      transition: {
        delay: 0.4 + i * 0.05,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-800"
      role="region"
      aria-label="Activity chart"
    >
      <h2 className="mb-6 text-xl font-semibold">Activity</h2>

      <div className="flex items-end gap-3 h-36">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={barVariants}
            initial="hidden"
            animate="visible"
            className="bg-blue-500 rounded w-6"
            style={{
              height: `${height}px`,
            }}
            role="img"
            aria-label={`Activity bar ${index + 1}: ${height} units`}
          />
        ))}
      </div>
    </motion.section>
  );
}
