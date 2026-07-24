import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import SalesInvoice from "./components/salesInvoice";
import SalesCreditmemo from "./components/salesCreditmemo";
import SalesQuote from "./components/salesQuote";
import PostedSalesInvoices from "./components/postedSalesInvoices";
import PostedSalesCreditmemo from "./components/postedSalesCreditmemo";
import CustomerPayments from "./components/customerPayments";
import CustomerLedgerEntries from "./components/customerLedgerEntries";
import VerifyReceipt from "./components/verifyReceipt";
import SalesOrders from "./components/salesOrders";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
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
        path="/sales-invoices"
        element={
          <ProtectedRoute>
            <SalesInvoice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales-orders"
        element={
          <ProtectedRoute>
            <SalesOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales-credit-memos"
        element={
          <ProtectedRoute>
            <SalesCreditmemo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales-quotes"
        element={
          <ProtectedRoute>
            <SalesQuote />
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
        path="/customer-payments"
        element={
          <ProtectedRoute>
            <CustomerPayments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-ledger-entries"
        element={
          <ProtectedRoute>
            <CustomerLedgerEntries />
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