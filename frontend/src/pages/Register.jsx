// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../services/api';
// import AuthLayout from '../components/AuthLayout.jsx';
//
// export default function Register() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//
//     const handleSubmit = async e => {
//         e.preventDefault();
//         try {
//             await api.post('/register', { email, password });
//             navigate('/login');
//         } catch {
//             alert('Registration failed');
//         }
//     };
//
//     return (
//         <AuthLayout title="Register a new account">
//             <form className="space-y-6" onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
//                         Email address
//                     </label>
//                     <input
//                         id="email"
//                         type="email"
//                         autoComplete="email"
//                         required
//                         value={email}
//                         onChange={e => setEmail(e.target.value)}
//                         className="mt-2 block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//                     />
//                 </div>
//
//                 <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">
//                         Password
//                     </label>
//                     <input
//                         id="password"
//                         type="password"
//                         autoComplete="new-password"
//                         required
//                         value={password}
//                         onChange={e => setPassword(e.target.value)}
//                         className="mt-2 block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//                     />
//                 </div>
//
//                 <button
//                     type="submit"
//                     className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
//                 >
//                     Register
//                 </button>
//             </form>
//
//             <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
//                 Already registered?{' '}
//                 <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                     Sign in
//                 </Link>
//             </p>
//         </AuthLayout>
//     );
// }
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';

export default function Register() {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!form.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!form.password) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (form.confirmPassword !== form.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // clear error on change
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!validate()) return;

        console.log('Form submitted:', form);
        // You would typically send form data to your API here
    };

    const inputClass = field =>
        `mt-2 block w-full rounded-md px-3 py-1.5 text-base sm:text-sm outline-1 -outline-offset-1 ${
            errors[field]
                ? 'border border-red-500 text-red-900 placeholder:text-red-400 focus:outline-red-500'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-gray-300 focus:outline-indigo-600'
        }`;

    return (
        <AuthLayout title="Register a new account">
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        value={form.fullName}
                        onChange={handleChange}
                        className={inputClass('fullName')}
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass('email')}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        value={form.password}
                        onChange={handleChange}
                        className={inputClass('password')}
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-white">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={inputClass('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white border border-indigo-600 hover:bg-transparent hover:text-indigo-600 transition-colors duration-400 cursor-pointer"
                >
                    Register
                </button>

            </form>

            {/* Login Link */}
            <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                Already registered?{' '}
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Sign in
                </Link>
            </p>
        </AuthLayout>
    );
}
