import { Landing, Register, Error, ProtectedRoute } from './pages'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import {
  Todo,
  Progress,
  Profile,
  SharedLayout
} from './pages/dashboard'

function App() {
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
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;