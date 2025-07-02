import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        try {
            const res = await api.get('/todos');
            setTodos(res.data);
        } catch {
            navigate('/login');
        }
    };

    const add = async e => {
        e.preventDefault();
        if (!title) return;
        await api.post('/todos', { title });
        setTitle('');
        load();
    };

    const toggle = async (id, done) => {
        await api.put(`/todos/${id}`, { is_completed: !done });
        load();
    };

    const remove = async id => {
        await api.delete(`/todos/${id}`);
        load();
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Todos</h2>

                    <form onSubmit={add} className="flex gap-2 mb-6">
                        <input
                            placeholder="New Todo"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="flex-grow rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-md"
                        >
                            Add
                        </button>
                    </form>

                    <ul className="space-y-4">
                        {todos.map(t => (
                            <li
                                key={t.id}
                                className="flex justify-between items-center bg-white dark:bg-gray-800 px-4 py-3 rounded-md shadow-sm border border-gray-200 dark:border-gray-700"
                            >
                <span
                    className={`text-gray-900 dark:text-white ${
                        t.is_completed ? 'line-through opacity-60' : ''
                    }`}
                >
                  {t.title}
                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggle(t.id, t.is_completed)}
                                        className="text-sm text-indigo-600 hover:text-indigo-500"
                                    >
                                        {t.is_completed ? 'Undo' : 'Complete'}
                                    </button>
                                    <button
                                        onClick={() => remove(t.id)}
                                        className="text-sm text-red-600 hover:text-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
