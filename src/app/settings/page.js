"use client";

import { motion } from "framer-motion";
import { Bell, Lock, User, Moon, LogOut } from "lucide-react";

export default function SettingsPage() {
  const settings = [
    {
      icon: User,
      title: "Profile Settings",
      description: "Manage your personal information",
      action: "Edit Profile",
    },
    {
      icon: Lock,
      title: "Privacy & Security",
      description: "Control your privacy settings and security options",
      action: "Manage",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage email and push notifications",
      action: "Configure",
    },
    {
      icon: Moon,
      title: "Theme Preferences",
      description: "Customize your learning experience",
      action: "Settings",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>

        {/* Settings List */}
        <div className="space-y-4 mb-8">
          {settings.map((setting, i) => {
            const Icon = setting.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl p-6 border border-zinc-800 flex items-center justify-between hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Icon size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{setting.title}</h3>
                    <p className="text-sm text-zinc-400">{setting.description}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {setting.action}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Preferences Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl p-8 border border-zinc-800 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Learning Preferences</h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Daily Goal</p>
                <p className="text-sm text-zinc-400">Set your daily learning hours</p>
              </div>
              <input
                type="number"
                defaultValue="2"
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 w-20 text-white"
              />
            </div>

            <div className="h-px bg-zinc-800"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Email Reminders</p>
                <p className="text-sm text-zinc-400">Get daily learning reminders</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="h-px bg-zinc-800"></div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Public Profile</p>
                <p className="text-sm text-zinc-400">Make your profile visible to others</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </motion.button>
      </div>
    </main>
  );
}
