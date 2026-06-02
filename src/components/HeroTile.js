"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

import { useTab } from "@/context/TabContext";

export default function HeroTile() {
  const { userProfile } = useTab();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2 } },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-800"
      role="banner"
    >
      <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10">
        <motion.h1 variants={textVariants} className="text-4xl font-bold text-white">
          Welcome Back, {userProfile.name} 👋
        </motion.h1>

        <motion.div
          variants={textVariants}
          className="mt-5 flex items-center gap-2 text-orange-400 font-medium"
        >
          <Flame size={22} aria-hidden="true" />
          <span>12 Day Learning Streak</span>
        </motion.div>

        <motion.div
          variants={textVariants}
          className="mt-6 inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300"
        >
          Keep learning every day 🚀
        </motion.div>
      </div>
    </motion.section>
  );
}
