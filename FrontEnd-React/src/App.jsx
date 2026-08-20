import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";
import VerifyReceipt from "./components/verifyReceipt";
import CustomerLedgers from "./pages/customerLedgers";
import SalesDocuments from "./pages/salesDocuments";
import PostedSalesDocuments from "./pages/postedSalesDocuments";
import Profile from "./pages/profile";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-ledgers"
        element={
          <ProtectedRoute>
            <CustomerLedgers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales-documents"
        element={
          <ProtectedRoute>
            <SalesDocuments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posted-sales-documents"
        element={
          <ProtectedRoute>
            <PostedSalesDocuments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-receipt"
        element={
          <ProtectedRoute>
            <VerifyReceipt />
          </ProtectedRoute>
        }
      />
      <Route
        path="/receipt/:token"
        element={
          <VerifyReceipt />
        }
      />

    </Routes>
  );
}

export default App;