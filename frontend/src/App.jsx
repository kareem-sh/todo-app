// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Register        from './pages/Register';
// import Login           from './pages/Login';
// import Todos           from './pages/Todos';
// import ProtectedRoute from './routes/ProtectedRoute';
//
// export default function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/login"    element={<Login />} />
//                 <Route element={<ProtectedRoute />}>
//                     <Route path="/todos" element={<Todos />} />
//                 </Route>
//                 <Route path="*" element={<Navigate to="/todos" replace />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";

function App() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login"    element={<Login />} />
        </Routes>
    );
}

export default App;
