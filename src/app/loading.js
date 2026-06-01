export default function Loading() {
  return (
    <main className="min-h-screen bg-black p-6">
      <div className="animate-pulse grid gap-6">

        <div className="h-40 rounded-3xl bg-zinc-800"></div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="h-36 rounded-2xl bg-zinc-800"></div>

          <div className="h-36 rounded-2xl bg-zinc-800"></div>

          <div className="h-36 rounded-2xl bg-zinc-800"></div>

          <div className="h-36 rounded-2xl bg-zinc-800"></div>

        </div>
      </div>
    </main>
  );
}