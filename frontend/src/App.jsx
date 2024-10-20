import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import LoginPage from "./pages/auth/login/LoginPage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {

  const { data:authUser, isLoading, isError, error } = useQuery({
    // query key is used to give a unique name to our query and refer to it later
    queryKey: ['authUser'],
    queryFn: async() => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) {
          return null;
        }
        
        if (!res.ok) throw new Error(data.error || "Something went wrong");

        console.log("authUser is here: ", data);
        return data;

      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  console.log(authUser);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="flex max-w-6xl mx-auto">

      {authUser && <Sidebar />}

      <Routes>
        <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login" /> } />
        <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/" /> } />
        <Route path="/signup" element={ !authUser ? <SignUpPage /> : <Navigate to="/" /> } />
        <Route path="/notifications" element={ authUser ? <NotificationPage /> : <Navigate to="/login" /> } />
        <Route path="/profile/:username" element={ authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      {authUser && <RightPanel />}
      <Toaster />
    </div>
  );
}

export default App;