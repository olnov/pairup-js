import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SystemUsers from './pages/SystemUsers';
import Students from './pages/Students';
import Specialisms from './pages/Specialisms';
import Cohorts from './pages/Cohorts';
import Integrations from './pages/Integrations';

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/users",
        element: <SystemUsers />,
    },
    {
        path: "/students",
        element: <Students />,
    },
    {
        path: "/specialisms",
        element: <Specialisms />,
    },
    {
        path: "/cohorts",
        element: <Cohorts />,
    },
    {
        path: "/integrations",
        element: <Integrations />,
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