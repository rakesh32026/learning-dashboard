import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/getCourses";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Courses</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
            />
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-400 text-lg">No courses found</p>
          </div>
        )}
      </div>
    </main>
  );
}
