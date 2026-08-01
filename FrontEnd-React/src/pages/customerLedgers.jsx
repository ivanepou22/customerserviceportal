import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import Header from "../components/Header";
import DataTable from "../components/tables/DataTable";
import {
    customerLedgerColumns,
    customerPaymentColumns,
} from "../components/tables/documentColumns";
import { documentService } from "../services/documentService";
import TealStatCard from "../components/TealStatCard";

const LEDGER_TABS = {
    ENTRIES: "ledgerEntries",
    PAYMENTS: "customerPayments",
    REFUNDS: "customerRefunds",
    INVOICES: "customerInvoices",
    CREDIT_MEMOS: "customerCreditMemos",
};

const initialDocumentState = {
    data: [],
    loading: false,
    error: "",
    initialized: false,
};

const ledgerDocumentConfig = {
    [LEDGER_TABS.ENTRIES]: {
        tabLabel: "Ledger Entries",
        title: "Customer Ledger Entries",
        loadingMessage: "Loading Customer Ledger Entries",
        errorMessage: "Fetching Customer Ledger Entries failed. Please try again.",
        columns: customerLedgerColumns,
        fetchData: () => documentService.fetchCustomerLedgerEntries(),
    },
    [LEDGER_TABS.PAYMENTS]: {
        tabLabel: "Payments",
        title: "Customer Payments",
        loadingMessage: "Loading Customer Payments",
        errorMessage: "Fetching Customer Payments failed. Please try again.",
        columns: customerPaymentColumns,
        fetchData: () => documentService.fetchCustomerPayments(),
    },
    [LEDGER_TABS.REFUNDS]: {
        tabLabel: "Refunds",
        title: "Customer Refunds",
        loadingMessage: "Loading Customer Refunds",
        errorMessage: "Fetching Customer Refunds failed. Please try again.",
        columns: customerPaymentColumns,
        fetchData: () => documentService.fetchCustomerRefunds(),
    },
    [LEDGER_TABS.INVOICES]: {
        tabLabel: "Invoices",
        title: "Customer Invoices",
        loadingMessage: "Loading Customer Invoices",
        errorMessage: "Fetching Customer Invoices failed. Please try again.",
        columns: customerLedgerColumns,
        fetchData: () => documentService.fetchCustomerInvoices(),
    },
    [LEDGER_TABS.CREDIT_MEMOS]: {
        tabLabel: "Credit Memos",
        title: "Customer Credit Memos",
        loadingMessage: "Loading Customer Credit Memos",
        errorMessage: "Fetching Customer Credit Memos failed. Please try again.",
        columns: customerLedgerColumns,
        fetchData: () => documentService.fetchCustomerCreditMemos(),
    },
};

const asArray = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.value)) return payload.value;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
};

const getDocAmount = (doc) => {
    if (!doc || typeof doc !== "object") return 0;

    const raw =
        doc.amountLCY ??
        doc.Amount_LCY ??
        doc.amount ??
        doc.Amount ??
        doc.remainingAmtLCY ??
        doc.Remaining_Amt_LCY ??
        doc.remainingAmount ??
        doc.Remaining_Amount ??
        doc.amountIncludingVAT ??
        doc.Amount_Including_VAT ??
        doc.totalAmountIncludingTax ??
        doc.Total_Amount_Including_Tax ??
        doc.originalAmount ??
        doc.Original_Amount ??
        doc.debitAmount ??
        doc.Debit_Amount ??
        doc.creditAmount ??
        doc.Credit_Amount ??
        0;

    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
};

const sumAmounts = (rows) =>
    asArray(rows).reduce((total, row) => total + getDocAmount(row), 0);

const formatAmount = (value) =>
    Math.abs(Number(value)).toLocaleString(undefined, {
        style: "currency",
        currency: "UGX",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

const CustomerLedgers = () => {
    const [activeTab, setActiveTab] = useState(LEDGER_TABS.ENTRIES);

    const [documentStates, setDocumentStates] = useState({
        [LEDGER_TABS.ENTRIES]: { ...initialDocumentState },
        [LEDGER_TABS.PAYMENTS]: { ...initialDocumentState },
        [LEDGER_TABS.REFUNDS]: { ...initialDocumentState },
        [LEDGER_TABS.INVOICES]: { ...initialDocumentState },
        [LEDGER_TABS.CREDIT_MEMOS]: { ...initialDocumentState },
    });

    const fetchLedgerDocuments = useCallback(async (tab) => {
        const config = ledgerDocumentConfig[tab];
        if (!config) return;

        setDocumentStates((previousStates) => ({
            ...previousStates,
            [tab]: {
                ...previousStates[tab],
                initialized: true,
                loading: true,
                error: "",
            },
        }));

        try {
            const response = await config.fetchData();
            const rows = asArray(response);

            if (rows[0]) {
                console.log(`[${tab}] sample keys:`, Object.keys(rows[0]));
                console.log(`[${tab}] sample row:`, rows[0]);
            }

            setDocumentStates((previousStates) => ({
                ...previousStates,
                [tab]: {
                    ...previousStates[tab],
                    data: rows,
                    loading: false,
                    error: "",
                },
            }));
        } catch (error) {
            console.error(`Failed to fetch ${config.title}:`, error);
            setDocumentStates((previousStates) => ({
                ...previousStates,
                [tab]: {
                    ...previousStates[tab],
                    loading: false,
                    error: config.errorMessage,
                },
            }));
        }
    }, []);

    const activeDocumentState = documentStates[activeTab];
    const activeConfig = ledgerDocumentConfig[activeTab];

    useEffect(() => {
        if (!activeDocumentState.initialized) {
            fetchLedgerDocuments(activeTab);
        }
    }, [activeTab, activeDocumentState.initialized, fetchLedgerDocuments]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleRefresh = () => {
        fetchLedgerDocuments(activeTab);
    };

    const renderLoading = (message) => (
        <div className="flex min-h-[350px] flex-col items-center justify-center gap-3 border-t border-gray-200">
            <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
            <p className="text-sm font-medium text-gray-700">{message}</p>
        </div>
    );

    const renderError = (message, retryFunction) => (
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
            <p className="max-w-md text-sm text-red-700">{message}</p>
            <button
                type="button"
                onClick={retryFunction}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
            >
                Try Again
            </button>
        </div>
    );

    const ledgerDocumentCards = Object.entries(ledgerDocumentConfig).map(
        ([tab, config]) => {
            const total = sumAmounts(documentStates[tab].data);

            return {
                tab,
                title: config.tabLabel,
                value: documentStates[tab].loading
                    ? "…"
                    : formatAmount(total),
                subtitle: config.title,
                color: "bg-teal-600 hover:bg-teal-700",
            };
        }
    );

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="mx-auto max-w-[1120px] px-5 pb-10 lg:px-0">
                <div className="sticky top-[60px] z-10 bg-background pt-2">
                    <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="font-bold tracking-tight text-gray-950">
                                Customer Ledgers
                            </p>
                            <p className="mt-0.5 text-sm text-gray-500">
                                View customer ledger entries, payments, refunds,
                                invoices and credit memos.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleRefresh}
                            disabled={activeDocumentState.loading}
                            className="inline-flex h-9 items-center justify-center gap-2 self-start border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
                        >
                            <RefreshCw
                                className={`h-4 w-4 ${activeDocumentState.loading
                                    ? "animate-spin"
                                    : ""
                                    }`}
                            />
                            Refresh
                        </button>
                    </div>

                    <div className="overflow-hidden border-b border-gray-200 bg-background pt-2">
                        <nav
                            className="flex gap-7 overflow-x-auto"
                            role="tablist"
                            aria-label="Customer ledger tabs"
                        >
                            {Object.entries(ledgerDocumentConfig).map(
                                ([tab, config]) => {
                                    const isActive = activeTab === tab;
                                    return (
                                        <button
                                            key={tab}
                                            type="button"
                                            role="tab"
                                            id={`${tab}-tab`}
                                            aria-selected={isActive}
                                            aria-controls={`${tab}-panel`}
                                            tabIndex={isActive ? 0 : -1}
                                            onClick={() => handleTabChange(tab)}
                                            className={`relative whitespace-nowrap px-1 pb-3 text-sm transition-colors ${isActive
                                                ? "font-medium text-teal-600"
                                                : "text-gray-600 hover:text-gray-950"
                                                }`}
                                        >
                                            {config.tabLabel}
                                            {isActive && (
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute inset-x-0 bottom-0 h-0.5 bg-teal-400"
                                                />
                                            )}
                                        </button>
                                    );
                                }
                            )}
                        </nav>
                    </div>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {ledgerDocumentCards.map((card) => (
                        <button
                            key={card.tab}
                            type="button"
                            onClick={() => handleTabChange(card.tab)}
                            aria-label={`View ${card.title}`}
                            className="text-left"
                        >
                            <TealStatCard
                                title={card.title}
                                value={card.value}
                                subtitle={card.subtitle}
                                color={card.color}
                            />
                        </button>
                    ))}
                </div>

                <section
                    id={`${activeTab}-panel`}
                    className="mt-5"
                    role="tabpanel"
                    aria-labelledby={`${activeTab}-tab`}
                >
                    {activeDocumentState.loading
                        ? renderLoading(activeConfig.loadingMessage)
                        : activeDocumentState.error
                            ? renderError(activeDocumentState.error, () =>
                                fetchLedgerDocuments(activeTab)
                            )
                            : (
                                <DataTable
                                    data={activeDocumentState.data}
                                    columns={activeConfig.columns}
                                    title={activeConfig.title}
                                />
                            )}
                </section>
            </main>
        </div>
    );
};

export default CustomerLedgers;