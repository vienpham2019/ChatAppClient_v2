import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import NotFound from "./pages/NotFound.jsx";
import Messages from "./pages/Messages.jsx";
import MainLayout from "./layout/MainLayout.jsx";

function App() {
  return (
    <div>
      <Routes>
        {/* <Route element={<MainLayout />}>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route> */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:key" element={<ResetPassword />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/chats" element={<Messages />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Toaster position="bottom-right" reverseOrder={false} /> */}
    </div>
  );
}

export default App;
