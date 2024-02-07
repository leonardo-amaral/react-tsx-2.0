import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import { Ios } from "./pages/ios";
import { IosAirplane } from "./pages/ios/airplane";
import { Qtg } from "./pages/qtg";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
