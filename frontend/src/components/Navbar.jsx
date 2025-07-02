import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
        document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/todos" className="text-xl font-bold text-indigo-600 dark:text-white">
                    📝 MyTodoApp
                </Link>

                <div className="flex items-center gap-4">
                    {/* Profile link */}
                    <Link to="/profile" className="text-gray-700 dark:text-gray-300 hover:underline text-sm">
                        Profile
                    </Link>

                    <button
                        onClick={toggleTheme}
                        className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white"
                        title="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* Logout */}
                    <button
                        onClick={logout}
                        className="text-sm text-red-600 hover:text-red-400 font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
