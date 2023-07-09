import { Landing, Register, Error, ProtectedRoute } from './pages'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom'
import {
  Todo,
  Progress,
  Profile,
  SharedLayout
} from './pages/dashboard'

import { useAppContext } from './context/appContext'

function App() {
  const { user } = useAppContext()
  console.log(user)
  return (
    <BrowserRouter>
      <Routes>
        {/*
        Including "index" for one of the nested routes is optional.
        If it is indluded, the path will match the root exactly.
        */}
        <Route path="/" element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Todo />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={user ? <Navigate to='/' /> : <Register />} />
        <Route path="/landing" element={user ? <Navigate to='/' /> : <Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;