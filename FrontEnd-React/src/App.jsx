import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import PostedSalesInvoices from "./components/postedSalesInvoices";
import PostedSalesCreditmemo from "./components/postedSalesCreditmemo";
import VerifyReceipt from "./components/verifyReceipt";
import CustomerLedgers from "./pages/customerLedgers";
import SalesDocuments from "./pages/salesDocuments";

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
        path="/posted-sales-invoices"
        element={
          <ProtectedRoute>
            <PostedSalesInvoices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posted-sales-creditmemos"
        element={
          <ProtectedRoute>
            <PostedSalesCreditmemo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/receipt"
        element={
          <ProtectedRoute>
            <VerifyReceipt />
          </ProtectedRoute>
        }
      />
      <Route
        path="/verify/receipt"
        element={
          <VerifyReceipt />
        }
      />

    </Routes>
  );
}

export default App;