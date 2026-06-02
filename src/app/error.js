"use client";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-3xl font-bold text-red-500">Something went wrong</h1>

      <p className="mt-4 text-zinc-400">Failed to load dashboard.</p>

      <button onClick={() => reset()} className="mt-6 px-5 py-2 bg-blue-600 rounded-lg">
        Try Again
      </button>
    </div>
  );
}
