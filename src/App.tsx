import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { AuthProvider } from './context/AuthContext'
import { TemplateProvider } from './context/TemplateContext'
import { Ios } from './pages/ios'
import { IosAirplane } from './pages/ios/airplane'
import { Qtg } from './pages/qtg'
import GlobalStyles from './styles/GlobalStyles'

function App() {
  return (
    <>
      <TemplateProvider>
        <GlobalStyles />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="" element={<Layout />}>
                <Route path="ios/airplane" element={<IosAirplane />} />
                <Route path="ios" element={<Ios />} />

                <Route path="qtg" element={<Qtg />} />
              </Route>

              <Route path="*" element={<Navigate to="/ios" />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TemplateProvider>
    </>
  )
}

export default App
