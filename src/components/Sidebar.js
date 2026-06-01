"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, BookOpen, BarChart3, Settings, Menu, X } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const items = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/" },
    { id: "courses", label: "Courses", icon: BookOpen, href: "/courses" },
    { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ];

  const getActiveId = () => {
    if (pathname === "/") return "dashboard";
    if (pathname.startsWith("/courses")) return "courses";
    if (pathname.startsWith("/analytics")) return "analytics";
    if (pathname.startsWith("/settings")) return "settings";
    return "dashboard";
  };

  const active = getActiveId();

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
            const isActive = active === item.id;

            return (
              <motion.li
                key={item.id}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link href={item.href}>
                  <motion.button
                    className="w-full flex gap-3 items-center px-3 py-2 rounded-lg text-left transition-colors relative"
                    whileHover={{ x: 4 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="highlight"
                        className="absolute inset-0 bg-blue-500/20 rounded-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                    <Icon size={20} className="relative z-10" aria-hidden="true" />
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                </Link>
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
                const isActive = active === item.id;

                return (
                  <motion.li
                    key={item.id}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link href={item.href}>
                      <motion.button
                        onClick={() => setIsMobileOpen(false)}
                        className="w-full flex gap-3 items-center px-3 py-2 rounded-lg text-left transition-colors relative"
                        whileHover={{ x: 4 }}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="mobile-highlight"
                            className="absolute inset-0 bg-blue-500/20 rounded-lg"
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          />
                        )}
                        <Icon size={20} className="relative z-10" aria-hidden="true" />
                        <span className="relative z-10">{item.label}</span>
                      </motion.button>
                    </Link>
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