import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!validate()) return;

        console.log('Logging in with:', { email, password });
        // Perform login logic here
    };

    const inputClass = field =>
        `mt-2 block w-full rounded-md px-3 py-1.5 text-base sm:text-sm outline-1 -outline-offset-1 ${
            errors[field]
                ? 'border border-red-500 text-red-900 placeholder:text-red-400 focus:outline-red-500'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-gray-300 focus:outline-indigo-600'
        }`;

    return (
        <AuthLayout title="Sign in to your account">
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Email address
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                            setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        className={inputClass('email')}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">
                            Password
                        </label>
                        <div className="text-sm">
                            <Link to="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            setErrors(prev => ({ ...prev, password: '' }));
                        }}
                        className={inputClass('password')}
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white border border-indigo-600 hover:bg-transparent hover:text-indigo-600 transition-colors duration-400  cursor-pointer"
                >
                    Sign in
                </button>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                Not a member?
                <Link to="/register" className="ml-1 font-semibold text-indigo-600 hover:text-indigo-500">
                    Register
                </Link>
            </p>
        </AuthLayout>
    );
}
