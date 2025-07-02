export default function AuthLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
}
