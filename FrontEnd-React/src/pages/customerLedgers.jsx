import { useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import Header from "../components/Header";
import DataTable from "../components/tables/DataTable";
import {
    customerLedgerColumns,
    customerPaymentColumns
} from "../components/tables/documentColumns";
import { documentService } from "../services/documentService";
import TealStatCard from "../components/TealStatCard";

const CustomerLedgers = () => {
    const [activeTab, setActiveTab] = useState("ledgerEntries");

    const [ledgerEntries, setLedgerEntries] = useState([]);
    const [customerPayments, setCustomerPayments] = useState([]);

    const [ledgerLoading, setLedgerLoading] = useState(false);
    const [paymentsLoading, setPaymentsLoading] = useState(false);

    const [ledgerError, setLedgerError] = useState("");
    const [paymentsError, setPaymentsError] = useState("");
    const [paymentsInitialized, setPaymentsInitialized] = useState(false);

    const fetchCustomerLedgerEntries = async () => {
        setLedgerLoading(true);
        setLedgerError("");

        try {
            const response = await documentService.fetchCustomerLedgerEntries();
            setLedgerEntries(response || []);
        } catch (error) {
            console.error(error);
            setLedgerError(
                "Fetching Customer Ledger Entries failed. Please try again."
            );
        } finally {
            setLedgerLoading(false);
        }
    };

    const fetchCustomerPayments = async () => {
        setPaymentsInitialized(true);

        setPaymentsLoading(true);
        setPaymentsError("");

        try {
            const response = await documentService.fetchCustomerPayments();
            setCustomerPayments(response || []);
        } catch (error) {
            console.error(error);
            setPaymentsError("Fetching Customer Payments failed. Please try again.");
        } finally {
            setPaymentsLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomerLedgerEntries();
    }, []);

    useEffect(() => {
        if (
            activeTab === "customerPayments" &&
            !paymentsInitialized
        ) {
            fetchCustomerPayments();
        }
    }, [activeTab, paymentsInitialized]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleRefresh = () => {
        if (activeTab === "ledgerEntries") {
            fetchCustomerLedgerEntries();
        } else {
            fetchCustomerPayments();
        }
    };

    const renderLoading = (message) => {
        return (
            <div className="flex min-h-[350px] flex-col items-center justify-center gap-3 border-t border-gray-200">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
                <p className="text-sm font-medium text-gray-700">
                    {message}
                </p>
            </div>
        );
    };
    const renderError = (message, retryFunction) => {
        return (
            <div className="flex min-h-[350px] flex-col items-center justify-center gap-4 border-t border-gray-200 bg-red-50 p-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                    <svg
                        className="h-7 w-7 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01M12 3L2 21h20L12 3z"
                        />
                    </svg>
                </div>

                <p className="max-w-md text-sm text-red-700">
                    {message}
                </p>

                <button
                    type="button"
                    onClick={retryFunction}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                    Try Again
                </button>
            </div>
        );
    };

    const ledgerEntryCount = ledgerEntries?.length;
    const paymentCount = customerPayments?.length;

    const ledger = { title: 'Customer Ledgers', value: ledgerEntryCount, subtitle: "Customer Ledgers", color: "bg-teal-600 hover:bg-teal-700" };
    const payment = { title: 'Customer Payments', value: paymentCount, subtitle: "Customer Payments", color: "bg-teal-600 hover:bg-teal-700" };

    const currentTitle =
        activeTab === "ledgerEntries"
            ? "Customer Ledger Entries"
            : "Customer Payments";

    const isCurrentTabLoading =
        activeTab === "ledgerEntries"
            ? ledgerLoading
            : paymentsLoading;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="mx-auto max-w-[1120px] px-5 pb-10 pt-4 lg:px-0">
                <div className="sticky top-[60px] z-10 bg-background pt-3">
                    <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="font-bold tracking-tight text-gray-950">
                                Customer Ledgers
                            </p>

                            <p className="mt-0.5 text-sm text-gray-500">
                                View customer ledger entries and payment
                                transactions.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleRefresh}
                            disabled={isCurrentTabLoading}
                            className="inline-flex h-10 items-center justify-center gap-2 self-start border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
                        >
                            <RefreshCw
                                className={`h-4 w-4 ${isCurrentTabLoading ? "animate-spin" : ""
                                    }`}
                            />

                            Refresh
                        </button>
                    </div>
                    <div className="sticky top-[60px] z-10 overflow-hidden border-b border-gray-200 bg-background pt-2">
                        <nav
                            className="flex gap-7 overflow-x-auto"
                            role="tablist"
                            aria-label="Customer ledger tabs"
                        >
                            <button
                                type="button"
                                role="tab"
                                aria-selected={activeTab === "ledgerEntries"}
                                onClick={() => handleTabChange("ledgerEntries")}
                                className={`relative whitespace-nowrap px-1 pb-3 text-sm transition-colors ${activeTab === "ledgerEntries"
                                    ? "font-medium text-indigo-600"
                                    : "text-gray-600 hover:text-gray-950"
                                    }`}
                            >
                                Customer Ledger Entries
                                {activeTab === "ledgerEntries" && (
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-400"
                                    />
                                )}
                            </button>
                            <button
                                type="button"
                                role="tab"
                                aria-selected={activeTab === "customerPayments"}
                                onClick={() => handleTabChange("customerPayments")}
                                className={`relative whitespace-nowrap px-1 pb-3 text-sm transition-colors ${activeTab === "customerPayments"
                                    ? "font-medium text-indigo-600"
                                    : "text-gray-600 hover:text-gray-950"
                                    }`}
                            >
                                Customer Payments

                                {activeTab === "customerPayments" && (
                                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-400" />
                                )}
                            </button>

                        </nav>
                    </div>
                </div>

                <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8 gap-4">
                    <button
                        type="button"
                        onClick={() =>
                            handleTabChange("ledgerEntries")
                        }
                    >
                        <div className="mt-1 text-xl font-semibold text-gray-950">
                            <TealStatCard {...ledger} />
                        </div>
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            handleTabChange("customerPayments")
                        }
                    >
                        <div className="mt-1 text-xl font-semibold text-gray-950">
                            <TealStatCard {...payment} />
                        </div>
                    </button>
                </div>

                <section
                    className="mt-5"
                    role="tabpanel"
                    aria-label={currentTitle}
                >
                    {activeTab === "ledgerEntries" &&
                        (ledgerLoading
                            ? renderLoading(
                                "Loading Customer Ledger Entries"
                            )
                            : ledgerError
                                ? renderError(
                                    ledgerError,
                                    fetchCustomerLedgerEntries
                                )
                                : (
                                    <DataTable
                                        data={ledgerEntries}
                                        columns={customerLedgerColumns}
                                        title="Customer Ledger Entries"
                                    />
                                ))}

                    {activeTab === "customerPayments" &&
                        (paymentsLoading
                            ? renderLoading(
                                "Loading Customer Payments"
                            )
                            : paymentsError
                                ? renderError(
                                    paymentsError,
                                    fetchCustomerPayments
                                )
                                : (
                                    <DataTable
                                        data={customerPayments}
                                        columns={customerPaymentColumns}
                                        title="Customer Payments"
                                    />
                                ))}
                </section>
            </main>
        </div>
    );
};

export default CustomerLedgers;