import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SystemUsers from './pages/SystemUsers';
import Students from './pages/Students';
import Specialisms from './pages/Specialisms';
import Cohorts from './pages/Cohorts';
import Integrations from './pages/Integrations';
import Groups from './pages/Groups';

// Helper function to check if the user is authenticated
const isAuthenticated = () => {
    const token = localStorage.getItem('token'); // Assume JWT token is stored in localStorage
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode token payload
            const currentTime = Date.now() / 1000; // Get current time in seconds
            return payload.exp > currentTime; // Check if token is expired
        } catch (error) {
            return false;
        }
    }
    return false;
};

// Higher-order component to protect routes
import { ReactElement } from 'react';

const ProtectedRoute = ({ element }: { element: ReactElement }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
    },
    {
        path: "/users",
        element: <ProtectedRoute element={<SystemUsers />} />,
    },
    {
        path: "/students",
        element: <ProtectedRoute element={<Students />} />,
    },
    {
        path: "/specialisms",
        element: <ProtectedRoute element={<Specialisms />} />,
    },
    {
        path: "/cohorts",
        element: <ProtectedRoute element={<Cohorts />} />,
    },
    {
        path: "/integrations",
        element: <ProtectedRoute element={<Integrations />} />,
    },
    {
        path: "/groups",
        element: <ProtectedRoute element={<Groups />} />,
    }
]);

const App = () => {
    return (
    <>
      <RouterProvider router={router} />
    </>
    );
};

export default App;