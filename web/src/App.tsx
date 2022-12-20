import { AuthProvider } from "./contexts/auth/AuthContext"
import './assets/index.css';
import { AppRoutes } from "./routes/routes";

function App() {

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
