import { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { DeviceDetectionProvider } from './contexts/device-detection/provider'
import Home from './pages/Home'
import { ProtectedRoute } from './components/common/ProtectedRoute'

const App: FC = () => (
  <DeviceDetectionProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </DeviceDetectionProvider>
)

export default App
