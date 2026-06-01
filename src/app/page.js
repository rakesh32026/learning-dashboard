"use client";

import { useEffect, useState } from "react";
import { useTab } from "@/context/TabContext";
import HeroTile from "@/components/HeroTile";
import CourseCard from "@/components/CourseCard";
import ActivityTile from "@/components/ActivityTile";
import AnimatedGrid from "@/components/AnimatedGrid";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const { activeTab } = useTab();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const client = await supabase.from("courses");
        const { data, error } = await client.select("*");
        if (!error && data) {
          setCourses(data);
        }
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6 pt-16 lg:pt-6">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <AnimatedGrid>
            <div className="md:col-span-2">
              <HeroTile />
            </div>
            <ActivityTile />
            {courses.slice(0, 4).map((course, index) => (
              <CourseCard key={course.id} course={course} index={index + 2} />
            ))}
          </AnimatedGrid>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div>
            <h1 className="text-4xl font-bold mb-8">My Courses</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
            {courses.length === 0 && (
              <p className="text-zinc-400 text-center py-12">No courses found</p>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div>
            <h1 className="text-4xl font-bold mb-8">Analytics</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <p className="text-zinc-400 mb-2">Total Courses</p>
                <p className="text-3xl font-bold">{courses.length}</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <p className="text-zinc-400 mb-2">Average Progress</p>
                <p className="text-3xl font-bold">
                  {courses.length > 0
                    ? Math.round(
                        courses.reduce((a, b) => a + b.progress, 0) / courses.length
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <p className="text-zinc-400 mb-2">Learning Streak</p>
                <p className="text-3xl font-bold">12 days 🔥</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <p className="text-zinc-400 mb-2">Total Hours</p>
                <p className="text-3xl font-bold">142 hrs</p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div>
            <h1 className="text-4xl font-bold mb-8">Settings</h1>
            <div className="max-w-2xl space-y-6">
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
                <p className="text-zinc-400">Manage your personal information</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <h3 className="text-xl font-semibold mb-4">Privacy & Security</h3>
                <p className="text-zinc-400">Control your privacy settings</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <h3 className="text-xl font-semibold mb-4">Notifications</h3>
                <p className="text-zinc-400">Manage email and push notifications</p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <h3 className="text-xl font-semibold mb-4">Daily Goal</h3>
                <input
                  type="number"
                  defaultValue="2"
                  className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 w-20 text-white"
                />
                <p className="text-sm text-zinc-400 mt-2">hours per day</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}