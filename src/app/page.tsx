import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
            <span className="text-2xl font-bold">N</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Next.js full-stack authentication system.
          </h1>

          <p className="mt-3 text-gray-400">
            Digital Learning & Course Management Platform
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-center">
            Welcome to Next.js full-stack authentication system.
          </h2>

          <p className="mt-2 text-center text-sm text-gray-400">
            Choose an option to continue
          </p>

          <div className="mt-8 space-y-3">
            {/* Login */}
            <Link
              href="/login"
              className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 font-medium transition hover:bg-blue-500"
            >
              Login
            </Link>

            {/* Signup */}
            <Link
              href="/signup"
              className="flex h-12 w-full items-center justify-center rounded-xl border border-gray-700 bg-gray-800 font-medium transition hover:bg-gray-750"
            >
              Create Account
            </Link>

            {/* Dashboard */}
            <Link
              href="/"
              className="flex h-12 w-full items-center justify-center rounded-xl border border-gray-800 text-gray-300 transition hover:bg-gray-800 hover:text-white"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-600">
          Next.js full-stack authentication system. • Digital Learning Platform
        </p>
      </div>
    </main>
  );
}