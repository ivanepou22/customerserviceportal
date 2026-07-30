import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import Header from "../components/Header";
import DataTable from "../components/tables/DataTable";
import {
    postedSalesInvoiceColumns,
    postedSalesCreditmemoColumns,
} from "../components/tables/documentColumns";
import { documentService } from "../services/documentService";
import RowActions from "../components/RowActions";
import TealStatCard from "../components/TealStatCard";

const POSTED_TABS = {
    INVOICES: "postedSalesInvoices",
    CREDIT_MEMOS: "postedSalesCreditMemos",
};

const initialDocumentState = {
    data: [],
    loading: false,
    error: "",
    initialized: false,
};

const postedDocumentConfig = {
    [POSTED_TABS.INVOICES]: {
        tabLabel: "Posted Sales Invoices",
        title: "Sales Invoices",
        loadingMessage: "Loading Posted Sales Invoices",
        errorMessage: "Fetching Posted Sales Invoices failed. Please try again.",
        columns: postedSalesInvoiceColumns,
        fetchData: () => documentService.fetchPostedSalesInvoices(),
    },
    [POSTED_TABS.CREDIT_MEMOS]: {
        tabLabel: "Posted Sales Credit Memos",
        title: "Credit Memos",
        loadingMessage: "Loading Posted Sales Credit Memos",
        errorMessage:
            "Fetching Posted Sales Credit Memos failed. Please try again.",
        columns: postedSalesCreditmemoColumns,
        fetchData: () => documentService.fetchPostedSalesCreditmemos(),
    },
};

const PostedSalesDocuments = () => {
    const [activeTab, setActiveTab] = useState(POSTED_TABS.INVOICES);

    const [documentStates, setDocumentStates] = useState({
        [POSTED_TABS.INVOICES]: { ...initialDocumentState },
        [POSTED_TABS.CREDIT_MEMOS]: { ...initialDocumentState },
    });

    const fetchPostedDocuments = useCallback(async (tab) => {
        const config = postedDocumentConfig[tab];
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

            setDocumentStates((previousStates) => ({
                ...previousStates,
                [tab]: {
                    ...previousStates[tab],
                    data: response || [],
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
    const activeConfig = postedDocumentConfig[activeTab];

    useEffect(() => {
        if (!activeDocumentState.initialized) {
            fetchPostedDocuments(activeTab);
        }
    }, [activeTab, activeDocumentState.initialized, fetchPostedDocuments]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleRefresh = () => {
        fetchPostedDocuments(activeTab);
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

    const actionsColumn = {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => <RowActions row={row.original} />,
    };

    const activeColumns = [...activeConfig.columns, actionsColumn];

    const postedDocumentCards = Object.entries(postedDocumentConfig).map(
        ([tab, config]) => ({
            tab,
            title: config.tabLabel,
            value: documentStates[tab].data.length,
            subtitle: config.title,
            color: "bg-teal-600 hover:bg-teal-700",
        })
    );

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="mx-auto max-w-[1120px] px-5 pb-10 lg:px-0">
                <div className="sticky top-[60px] z-10 bg-background pt-2">
                    <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="font-bold tracking-tight text-gray-950">
                                Posted Sales Documents
                            </p>
                            <p className="mt-0.5 text-sm text-gray-500">
                                View posted sales invoices and credit memos.
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
                            aria-label="Posted sales document tabs"
                        >
                            {Object.entries(postedDocumentConfig).map(
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

                <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-8">
                    {postedDocumentCards.map((card) => (
                        <button
                            key={card.tab}
                            type="button"
                            onClick={() => handleTabChange(card.tab)}
                            aria-label={`View ${card.title}`}
                            className="text-left"
                        >
                            <TealStatCard
                                title={card.subtitle}
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
                                fetchPostedDocuments(activeTab)
                            )
                            : (
                                <DataTable
                                    data={activeDocumentState.data}
                                    columns={activeColumns}
                                    title={activeConfig.title}
                                />
                            )}
                </section>
            </main>
        </div>
    );
};

export default PostedSalesDocuments;