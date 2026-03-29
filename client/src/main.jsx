import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Register from './pages/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import SnippetForm from './components/SnippetForm'
import SnippetDetail from './components/SnippetDetail'
import { AuthProvider } from '../context/AuthContext.jsx'
import Landing from './components/Landing.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
     {
      index: true,
      element: <Landing />
    },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Register />
      },
      {
        path: 'dashboard',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
      },
      {
        path: 'create',
        element: <ProtectedRoute><SnippetForm /></ProtectedRoute>
      },
      {
        path: 'edit/:id',
        element: <ProtectedRoute><SnippetForm isEdit={true} /></ProtectedRoute>
      },
      {
        path: 'snippet/:id',
        element: <ProtectedRoute><SnippetDetail /></ProtectedRoute>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
