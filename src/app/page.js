import { getCourses } from "@/lib/getCourses";
import DashboardClient from "@/components/DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const courses = await getCourses();

  return <DashboardClient initialCourses={courses} />;
}
