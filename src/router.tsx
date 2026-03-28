import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './Pages/RootLayout.tsx';
import Dashboard from './Pages/Dashboard.tsx';
import AdminPortal from './Pages/AdminPortal.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <RootLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'admin',
        element: <AdminPortal />,
      },
    ],
  },
]);
