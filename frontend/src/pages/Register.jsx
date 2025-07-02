import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api.js';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setMessage('');

        if (password !== confirmPassword) {
            setMessage("Passwords don't match");
            return;
        }

        setLoading(true);
        try {
            await api.post('/register', { email, password });
            setMessage('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                err.response?.data?.errors?.email?.[0] ||
                'Registration failed';
            setMessage(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-900">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://img.icons8.com/ios-filled/50/4a90e2/add-user-group-man-man.png"
                    alt="Register Icon"
                />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Create your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                            Email address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-700 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-700 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-700 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                        />
                    </div>

                    {message && <p className="text-sm text-center text-red-600">{message}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center rounded-md bg-indigo-600 text-white border border-indigo-600 px-3 py-1.5 text-sm font-semibold shadow-sm transition-colors duration-300 cursor-pointer
              ${
                            loading
                                ? 'opacity-70 cursor-not-allowed'
                                : 'hover:bg-white hover:dark:bg-gray-900 hover:text-indigo-600 hover:border-indigo-600'
                        }
            `}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
