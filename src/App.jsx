import { Route, Routes } from "react-router-dom";
import Login1 from "./pages/Login1";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";


const App = () => {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 overflow-hidden flex flex-col font-inter items-center ">
      {/* <PrivateRoute> */}
      <Navbar />
      {/* </PrivateRoute> */}

      <Routes>

        <Route path="/" element={
          <PrivateRoute>

            <Home />
          </PrivateRoute>
        } />
        <Route path="/login" element={
          <OpenRoute>

            <Login1 />
          </OpenRoute>

        } />
        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />
        <Route path="verify-email" element={
          <OpenRoute>

            <VerifyEmail />
          </OpenRoute>
        } />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>

              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>

              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/task" element={
          <PrivateRoute>
            <Task />
          </PrivateRoute>

        } />
      </Routes>
    </div>
  )
};

export default App;