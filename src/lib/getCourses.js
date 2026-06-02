import { initSupabase } from "./supabase";

export async function getCourses() {
  try {
    const supabase = await initSupabase();
    const { data, error } = await supabase.from("courses").select("*");

    if (error) {
      console.error("Supabase error:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
}
