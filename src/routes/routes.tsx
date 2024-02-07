import { createBrowserRouter, redirect } from 'react-router-dom'
import Layout from '../components/Layout'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'

type Props = {
  isAuthenticated: boolean
}

export const AppRoutes = ({ isAuthenticated }: Props) => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      loader: () => {
        if (isAuthenticated) {
          return redirect('/ios')
        }
        return null
      }
    },
    {
      path: '/ios',
      element: <Layout />,
      loader: () => {
        if (!isAuthenticated) {
          return redirect('/')
        }
        return null
      },
      children: [
        {
          index: true,
          element: <Dashboard />
        },
        {
          path: 'airplane',
          element: <></>
        }
      ]
    }
  ])

  return {
    routes
  }
}
