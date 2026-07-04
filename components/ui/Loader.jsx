export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-cyan-400"></div>
        </div>

        {/* Text */}
        <p className="animate-pulse text-lg font-medium tracking-wide text-white">
          Loading...
        </p>
      </div>
    </div>
  );
}