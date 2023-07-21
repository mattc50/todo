import { Landing, Register, Error, ProtectedRoute, ProtectedLogReg } from './pages'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom'
import {
  Set,
  Sets,
  Todos,
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
          <Route index element={<Sets />} />
          <Route path="todos" element={<Todos />} />
          <Route path="progress" element={<Progress />} />
          <Route path="profile" element={<Profile />} />
          <Route path="set/:id" element={<Set />} />
        </Route>
        <Route path="/register" element={
          <ProtectedLogReg>
            <Register />
          </ProtectedLogReg>
        } />
        <Route path="/landing" element={
          <ProtectedLogReg>
            <Landing />
          </ProtectedLogReg>
        } />
        <Route path="/404" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;