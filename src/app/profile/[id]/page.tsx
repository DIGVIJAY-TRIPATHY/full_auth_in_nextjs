export default async function UserProfile({ params }: any) {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-lg">

                {/* Header */}
                <div className="text-center mb-8">

                    <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <span className="text-2xl font-bold text-gray-950">
                            P
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        User Profile
                    </h1>

                    <p className="mt-2 text-sm text-gray-400">
                        Viewing profile information
                    </p>

                </div>

                {/* Profile Card */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">

                    {/* Card Header */}
                    <div className="px-6 sm:px-8 py-5 border-b border-gray-800">
                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-white">
                                    Profile Details
                                </p>

                                <p className="text-xs text-gray-500">
                                    Account identifier
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6 sm:p-8">

                        <div className="rounded-xl bg-gray-950 border border-gray-800 p-5">

                            <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">
                                Profile ID
                            </p>

                            <div className="flex items-center justify-between gap-4">

                                <span className="text-lg sm:text-xl font-mono font-semibold text-orange-400 break-all">
                                    {id}
                                </span>

                                <span className="shrink-0 px-2.5 py-1 text-xs font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                    ID
                                </span>

                            </div>

                        </div>

                        {/* Status */}
                        <div className="mt-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/5 border border-green-500/10">

                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />

                            <span className="text-sm text-gray-400">
                                Profile is active
                            </span>

                        </div>

                    </div>

                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-600 mt-6">
                    StudyHub • User Profile
                </p>

            </div>

        </main>
    );
}