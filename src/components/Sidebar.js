"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BookOpen, BarChart3, Settings, Menu, X } from "lucide-react";

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const items = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const sidebarVariants = {
    hidden: { x: -300 },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700"
        aria-label="Toggle navigation menu"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:block bg-zinc-900 p-4 rounded-xl h-full border border-zinc-800">
        <ul className="space-y-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.id}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                layoutId={item.id}
              >
                <motion.button
                  onClick={() => setActive(item.id)}
                  className="w-full flex gap-3 items-center px-3 py-2 rounded-lg text-left transition-colors relative"
                  whileHover={{ x: 4 }}
                >
                  {active === item.id && (
                    <motion.div
                      layoutId="highlight"
                      className="absolute inset-0 bg-blue-500/20 rounded-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                  <Icon size={20} className="relative z-10" aria-hidden="true" />
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.nav
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed left-0 top-16 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 p-4 z-40 lg:hidden"
          >
            <ul className="space-y-3">
              {items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.id}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    layoutId={`mobile-${item.id}`}
                  >
                    <motion.button
                      onClick={() => {
                        setActive(item.id);
                        setIsMobileOpen(false);
                      }}
                      className="w-full flex gap-3 items-center px-3 py-2 rounded-lg text-left transition-colors relative"
                      whileHover={{ x: 4 }}
                    >
                      {active === item.id && (
                        <motion.div
                          layoutId="mobile-highlight"
                          className="absolute inset-0 bg-blue-500/20 rounded-lg"
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                      )}
                      <Icon size={20} className="relative z-10" aria-hidden="true" />
                      <span className="relative z-10">{item.label}</span>
                    </motion.button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}