import Sidebar from "../components/Sidebar";
import HeroTile from "../components/HeroTile";
import CourseCard from "../components/CourseCard";
import ActivityTile from "../components/ActivityTile";
import AnimatedGrid from "../components/AnimatedGrid";

import { getCourses } from "../lib/getCourses";

export default async function Page() {
  const courses = await getCourses();

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6 pt-16 lg:pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <aside className="hidden lg:block lg:col-span-1">
          <Sidebar />
        </aside>

        <section className="col-span-1 lg:col-span-4">
          <AnimatedGrid>
            <div className="md:col-span-2">
              <HeroTile />
            </div>

            <ActivityTile />

            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index + 2}
              />
            ))}
          </AnimatedGrid>
        </section>
      </div>
    </main>
  );
}