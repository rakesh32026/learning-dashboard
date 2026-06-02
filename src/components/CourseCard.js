"use client";

import { motion } from "framer-motion";
import { Code, Rocket, Book, Sparkles } from "lucide-react";

export default function CourseCard({ course, index = 0 }) {
  const icons = {
    Code,
    Rocket,
    Book,
    Sparkles,
  };

  const Icon = icons[course.icon_name] || Code;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 20px rgba(59,130,246,0.4)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-zinc-800 p-5 rounded-2xl relative overflow-hidden"
      role="article"
      tabIndex={0}
    >
      {/* Abstract Gradient Mesh */}
      <div className="absolute -top-10 -right-10 h-32 w-32 bg-blue-500/15 blur-3xl rounded-full" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-purple-500/10 blur-3xl rounded-full" />
      <div className="relative z-10">
        <div className="mb-4 text-blue-400">
          <Icon size={32} aria-hidden="true" />
        </div>

        <h2 className="font-semibold text-lg">{course.title}</h2>

        <div className="mt-4 w-full bg-zinc-700 h-3 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${course.progress}%`,
            }}
            transition={{
              duration: 1,
            }}
            className="bg-blue-500 h-3 rounded-full"
            aria-valuenow={course.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          />
        </div>

        <p className="mt-3 text-zinc-300">{course.progress}%</p>
      </div>
    </motion.article>
  );
}
