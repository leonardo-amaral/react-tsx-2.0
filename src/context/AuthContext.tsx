import { jwtDecode } from 'jwt-decode'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { api } from '../lib/axios'

// Defina uma interface para os dados decodificados do token JWT
interface DecodedTokenType {
  features: string[]
  roles: string[]
  session_id: string
  user: {
    id: number
    email: string
    status: string
    ip: string
    created_at: string
    validity_epoch: number
    channel: string
  }
}

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthContextProps {
  user: UserType | null
  decodedToken: DecodedTokenType | null
  login: (data: LoginProps) => void
  logout: () => void
  isAuthenticated: boolean
}

type UserType = {
  token: string
}

type LoginProps = {
  email: string
  password: string
  channel: 'ui'
}

const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage({
    keyName: '@fbc:token',
    defaultValue: null
  })

  const [decodedToken, setDecodedToken] = useState<DecodedTokenType | null>(
    null
  )
  const [isAuthenticated, setIsAuthenticated] = useState(user !== 'null')

  const login = async (data: LoginProps) => {
    const response = await api.post('/auth/login', data)
    setUser(response.data.token)

    if (response.data) {
      setIsAuthenticated(true)
    }
  }

  const logout = async () => {
    const response = await api.post('/auth/logout')
    setUser(response.data)

    if (response.data) {
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const decodeToken = (token: string) => {
    try {
      const decodedData = jwtDecode(token) as DecodedTokenType
      return decodedData
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  }

  useEffect(() => {
    if (user && user !== 'null') {
      const decodedToken = decodeToken(user)
      console.log(decodedToken)

      setDecodedToken(decodedToken)
    } else {
      setDecodedToken(null)
    }
  }, [user])

  const value = useMemo(
    () => ({
      user,
      decodedToken,
      login,
      logout,
      isAuthenticated
    }),
    [isAuthenticated]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
