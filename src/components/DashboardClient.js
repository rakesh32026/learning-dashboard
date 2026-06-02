"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTab } from "@/context/TabContext";
import HeroTile from "@/components/HeroTile";
import CourseCard from "@/components/CourseCard";
import ActivityTile from "@/components/ActivityTile";
import AnimatedGrid from "@/components/AnimatedGrid";
import { Bell, Lock, User, Moon, Save } from "lucide-react";

export default function DashboardClient({ initialCourses }) {
  const { activeTab, userProfile, setUserProfile } = useTab();
  const [courses] = useState(initialCourses || []);

  const [name, setName] = useState(userProfile?.name || "Rakesh");
  const [dailyGoal, setDailyGoal] = useState(userProfile?.dailyGoal || 2);
  const [emailReminders, setEmailReminders] = useState(
    userProfile?.emailReminders !== undefined ? userProfile.emailReminders : true
  );
  const [publicProfile, setPublicProfile] = useState(
    userProfile?.publicProfile !== undefined ? userProfile.publicProfile : false
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setUserProfile({
      name,
      dailyGoal: Number(dailyGoal),
      emailReminders,
      publicProfile,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white">
      {/* Dashboard Tab */}
      {activeTab === "dashboard" && (
        <div className="p-4 sm:p-8 lg:p-12 pt-20 lg:pt-12">
          <div className="max-w-7xl mx-auto">
            <AnimatedGrid>
              <div className="md:col-span-2 lg:col-span-2">
                <HeroTile />
              </div>
              <div className="md:col-span-1 lg:col-span-1">
                <ActivityTile />
              </div>
              {courses.slice(0, 4).map((course, index) => (
                <CourseCard key={course.id} course={course} index={index + 2} />
              ))}
            </AnimatedGrid>
          </div>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-4 sm:p-8 lg:p-12 pt-20 lg:pt-12"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="mb-12">
              <h1 className="text-5xl font-bold mb-2">My Courses</h1>
              <p className="text-zinc-400 text-lg">
                {courses.length} active course{courses.length !== 1 ? "s" : ""}
              </p>
            </motion.div>

            {courses.length > 0 ? (
              <motion.div
                variants={containerVariants}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {courses.map((course, index) => (
                  <motion.div key={course.id} variants={itemVariants}>
                    <CourseCard course={course} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="text-center py-16 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-3xl border border-zinc-800"
              >
                <p className="text-zinc-400 text-lg">No courses yet. Start learning today!</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-4 sm:p-8 lg:p-12 pt-20 lg:pt-12"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="mb-12">
              <h1 className="text-5xl font-bold mb-2">Your Analytics</h1>
              <p className="text-zinc-400 text-lg">Track your learning progress and insights</p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {[
                {
                  label: "Total Courses",
                  value: courses.length,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  label: "Average Progress",
                  value:
                    courses.length > 0
                      ? Math.round(courses.reduce((a, b) => a + b.progress, 0) / courses.length) +
                        "%"
                      : "0%",
                  color: "from-purple-500 to-pink-500",
                },
                { label: "Learning Streak", value: "12 days", color: "from-orange-500 to-red-500" },
                { label: "Total Hours", value: "142 hrs", color: "from-green-500 to-emerald-500" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <p className="text-zinc-400 text-sm font-medium mb-3">{stat.label}</p>
                  <p
                    className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Chart Section */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-3xl border border-zinc-800 p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Learning Activity (Weekly)</h2>
              <div className="flex items-end gap-4 h-64 justify-between">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                  const heights = [60, 80, 100, 70, 90, 110, 75];
                  return (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ delay: i * 0.1 + 0.5 }}
                      className="flex-1 flex flex-col items-center justify-end"
                    >
                      <motion.div
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-400 hover:to-blue-300 transition-all"
                        style={{ height: `${(heights[i] / 110) * 100}%` }}
                        whileHover={{ scale: 1.05 }}
                      />
                      <span className="text-xs text-zinc-400 mt-3">{day}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-4 sm:p-8 lg:p-12 pt-20 lg:pt-12"
        >
          <div className="max-w-3xl mx-auto">
            <motion.div variants={itemVariants} className="mb-12">
              <h1 className="text-5xl font-bold mb-2">Settings</h1>
              <p className="text-zinc-400 text-lg">Customize your learning experience</p>
            </motion.div>

            {/* Profile Settings */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl border border-zinc-800 p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-400 text-sm font-semibold">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 w-full text-white font-medium focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl border border-zinc-800 p-8"
            >
              <h2 className="text-2xl font-bold mb-8">Learning Preferences</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                  <div>
                    <p className="font-semibold text-lg">Daily Learning Goal</p>
                    <p className="text-sm text-zinc-400 mt-1">Set your target hours per day</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={dailyGoal}
                      onChange={(e) => setDailyGoal(e.target.value)}
                      className="bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 w-24 text-white font-semibold focus:outline-none focus:border-blue-500"
                    />
                    <span className="text-zinc-400">hours</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                  <div>
                    <p className="font-semibold text-lg">Email Reminders</p>
                    <p className="text-sm text-zinc-400 mt-1">Get daily learning notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={emailReminders}
                      onChange={(e) => setEmailReminders(e.target.checked)}
                    />
                    <div className="w-12 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">Public Profile</p>
                    <p className="text-sm text-zinc-400 mt-1">
                      Make your profile visible to others
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={publicProfile}
                      onChange={(e) => setPublicProfile(e.target.checked)}
                    />
                    <div className="w-12 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="mt-8 w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Save size={20} />
                  Save Changes
                </motion.button>

                {isSaved && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 font-semibold text-sm"
                  >
                    ✓ Changes saved successfully!
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </main>
  );
}
