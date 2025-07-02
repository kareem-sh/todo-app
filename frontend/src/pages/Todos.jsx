import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import {
    Square,
    Check,
    Trash2,
    Pencil,
    Eye,
    EyeOff,
} from 'lucide-react';

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [editId, setEditId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [hideCompleted, setHideCompleted] = useState(false);
    const [inputError, setInputError] = useState(false);
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
        if (!title.trim()) {
            setInputError(true);
            return;
        }
        setInputError(false);
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

    const startEdit = (id, currentTitle) => {
        setEditId(id);
        setEditValue(currentTitle);
    };

    const saveEdit = async () => {
        if (editValue.trim()) {
            await api.put(`/todos/${editId}`, { title: editValue });
            setEditId(null);
            setEditValue('');
            load();
        }
    };

    const handleEditKey = e => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            setEditId(null);
            setEditValue('');
        }
    };

    const hasCompleted = todos.some(t => t.is_completed);
    const visibleTodos = hideCompleted ? todos.filter(t => !t.is_completed) : todos;

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center flex-grow">
                            ✅ Your Todo List
                        </h2>
                        {hasCompleted && (
                            <button
                                onClick={() => setHideCompleted(!hideCompleted)}
                                title={hideCompleted ? "Show completed tasks" : "Hide completed tasks"}
                                className={`ml-4 p-2 rounded-md transition-colors ${
                                    hideCompleted
                                        ? 'text-indigo-600 hover:text-indigo-400'
                                        : 'text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400'
                                }`}
                            >
                                {hideCompleted ? <EyeOff size={24} /> : <Eye size={24} />}
                            </button>
                        )}
                    </div>

                    <form onSubmit={add} className="flex gap-2 mb-8">
                        <input
                            placeholder="What needs to be done?"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className={`flex-grow rounded-md border ${
                                inputError ? 'border-red-500 ring-2 ring-red-400' : 'border-gray-300 dark:border-gray-700'
                            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            onFocus={() => setInputError(false)}
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2 rounded-md text-sm transition-all duration-200 cursor-pointer"
                        >
                            Add
                        </button>
                    </form>

                    {visibleTodos.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">You have no todos yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {visibleTodos.map(t => (
                                <li
                                    key={t.id}
                                    className="flex justify-between items-center bg-white dark:bg-gray-800 px-4 py-3 rounded-md shadow border border-gray-200 dark:border-gray-700 transition-all"
                                >
                                    <div className="flex items-center gap-3 w-full">
                                        <button
                                            onClick={() => toggle(t.id, t.is_completed)}
                                            className="text-indigo-600 hover:text-indigo-400 transition cursor-pointer"
                                            title="Mark complete"
                                        >
                                            {t.is_completed ? (
                                                <Check size={20} strokeWidth={3} />
                                            ) : (
                                                <Square size={20} />
                                            )}
                                        </button>

                                        {editId === t.id ? (
                                            <input
                                                autoFocus
                                                value={editValue}
                                                onChange={e => setEditValue(e.target.value)}
                                                onKeyDown={handleEditKey}
                                                onBlur={saveEdit}
                                                className="flex-grow bg-transparent border-b border-indigo-500 text-sm text-gray-900 dark:text-white outline-none px-2 py-0.5"
                                            />
                                        ) : (
                                            <span
                                                className={`flex-grow text-sm sm:text-base text-gray-900 dark:text-white ${
                                                    t.is_completed ? 'line-through opacity-60' : ''
                                                }`}
                                            >
                        {t.title}
                      </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 ml-4">
                                        <button
                                            onClick={() => startEdit(t.id, t.title)}
                                            className="text-gray-500 hover:text-gray-300 transition cursor-pointer"
                                            title="Edit"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => remove(t.id)}
                                            className="text-red-600 hover:text-red-400 transition cursor-pointer"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} fill="currentColor" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </>
    );
}
