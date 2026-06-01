import HeroTile from "@/components/HeroTile";
import CourseCard from "@/components/CourseCard";
import ActivityTile from "@/components/ActivityTile";
import AnimatedGrid from "@/components/AnimatedGrid";

import { getCourses } from "@/lib/getCourses";

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6 pt-16 lg:pt-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedGrid>
          <div className="md:col-span-2">
            <HeroTile />
          </div>

          <ActivityTile />

          {courses.slice(0, 4).map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index + 2}
            />
          ))}
        </AnimatedGrid>
      </div>
    </main>
  );
}