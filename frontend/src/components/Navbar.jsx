import { useNavigate } from 'react-router-dom';
import ThemeToggle from "./ThemeToggle.jsx";
export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Todo App</h1>

            <div className="flex items-center gap-4">
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-400 font-medium transition duration-200 cursor-pointer"
                >
                    Logout
                </button>

                {/* Dark Mode Toggle Button (fix below) */}
                <ThemeToggle />
            </div>
        </nav>
    );
}
