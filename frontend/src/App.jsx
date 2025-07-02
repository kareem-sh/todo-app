import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Todos from './pages/Todos';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
    return (
            <Routes>
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Todos />} />
                </Route>

                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

            </Routes>
    );
}
