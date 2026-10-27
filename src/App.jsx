
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("loggedInUser");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected pages */}
        <Route path="/" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />

        <Route path="/rooms" element={
          <ProtectedRoute><Rooms /></ProtectedRoute>
        } />

        <Route path="/rooms/:id" element={
          <ProtectedRoute><RoomDetails /></ProtectedRoute>
        } />

        <Route path="/booking/:id" element={
          <ProtectedRoute><Booking /></ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/about" element={
          <ProtectedRoute><AboutUs /></ProtectedRoute>
        } />

        <Route path="/contact" element={
          <ProtectedRoute><ContactUs /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><Profile /></ProtectedRoute>
  }
/>
        <Route path="/my-bookings"element={
          <ProtectedRoute><MyBookings /></ProtectedRoute>
        }/>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;