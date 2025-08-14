
import { Outlet } from 'react-router'
import { useAuthStore } from './stores/authStore';

const initAuth = useAuthStore.getState().initAuth;
initAuth();

function App() {
  return (
        <Outlet/>
  )
}

export default App
