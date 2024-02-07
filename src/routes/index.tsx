import { RouterProvider } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AppRoutes } from './routes'

export const Routes = () => {
  const { isAuthenticated } = useAuth()
  const { routes } = AppRoutes({ isAuthenticated })

  return <RouterProvider router={routes} />
}
