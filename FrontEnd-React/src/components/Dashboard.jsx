import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Legend,
} from "recharts";
import TealStatCard from "./TealStatCard";
import Header from "./Header";
import { documentService } from "../services/documentService";
import { customerReportService } from "../services/customerReportService";

const initialStats = {
    salesInvoices: 0,
    salesOrders: 0,
    salesQuotes: 0,
    salesCreditMemos: 0,
    postedSalesInvoices: 0,
    postedSalesCreditMemos: 0,
};

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const asArray = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.value)) return payload.value;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
};

const getDocDate = (doc) => {
    const raw =
        doc.postingDate ??
        doc.Posting_Date ??
        doc.documentDate ??
        doc.Document_Date ??
        doc.orderDate ??
        doc.Order_Date ??
        doc.paymentDate ??
        doc.Payment_Date ??
        doc.posting_date ??
        doc.document_date ??
        null;

    if (!raw) return null;
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? null : d;
};

const getDocYear = (doc) => {
    const d = getDocDate(doc);
    return d ? d.getFullYear() : null;
};

const getDocAmount = (doc) => {
    const raw =
        doc.amountIncludingVAT ??
        doc.AmountIncludingVAT ??
        doc.amountLCY ??
        doc.amount ??
        doc.Amount ??
        doc.remainingAmount ??
        doc.RemainingAmount ??
        doc.originalAmount ??
        doc.Original_Amount ??
        0;

    const n = Number(raw);
    return Number.isFinite(n) ? Math.abs(n) : 0;
};

const buildYearlyBarData = (invoices, creditMemos) => {
    const cy = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => cy - 9 + i);

    const invoiceTotals = Object.fromEntries(years.map((y) => [y, 0]));
    const creditMemoTotals = Object.fromEntries(years.map((y) => [y, 0]));

    invoices.forEach((doc) => {
        const year = getDocYear(doc);
        if (year != null && year in invoiceTotals) {
            invoiceTotals[year] += getDocAmount(doc);
        }
    });

    creditMemos.forEach((doc) => {
        const year = getDocYear(doc);
        if (year != null && year in creditMemoTotals) {
            creditMemoTotals[year] += getDocAmount(doc);
        }
    });

    return years.map((year) => ({
        year: String(year),
        invoices: Number(invoiceTotals[year].toFixed(2)),
        creditMemos: Number(creditMemoTotals[year].toFixed(2)),
    }));
};

const buildMonthlyLineData = (invoices, paymentList, year) => {
    const invoiceByMonth = Array(12).fill(0);
    const paymentByMonth = Array(12).fill(0);

    invoices.forEach((doc) => {
        const d = getDocDate(doc);
        if (d && d.getFullYear() === year) {
            invoiceByMonth[d.getMonth()] += getDocAmount(doc);
        }
    });

    paymentList.forEach((doc) => {
        const d = getDocDate(doc);
        if (d && d.getFullYear() === year) {
            paymentByMonth[d.getMonth()] += getDocAmount(doc);
        }
    });

    return MONTHS.map((name, index) => ({
        month: name,
        invoices: Number(invoiceByMonth[index].toFixed(2)),
        payments: Number(paymentByMonth[index].toFixed(2)),
    }));
};

const formatAxisValue = (v) => {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(1)}k`;
    return String(v);
};

const getCustomerName = (c) => {
    if (!c || typeof c !== "object") return "Account";
    const raw =
        c.displayName ??
        c.Display_Name ??
        c.name ??
        c.Name ??
        c.customerName ??
        c.Customer_Name ??
        null;
    return raw ? String(raw).trim() : "Account";
};

const getCustomerBalance = (c) => {
    if (!c || typeof c !== "object") return 0;
    const raw =
        c.balanceLCY ??
        c.balance ??
        0;
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
};

const formatCurrency = (value) =>
    Number(value).toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

function Dashboard() {
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - i);
    const [stats, setStats] = useState(initialStats);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [postedInvoices, setPostedInvoices] = useState([]);
    const [postedCreditMemos, setPostedCreditMemos] = useState([]);
    const [payments, setPayments] = useState([]);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [customer, setCustomer] = useState({});

    const fetchDashboardStats = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const [
                salesInvoices,
                salesOrders,
                salesQuotes,
                salesCreditMemos,
                postedSalesInvoices,
                postedSalesCreditMemos,
                customerPayments,
                customer,
            ] = await Promise.all([
                documentService.fetchSalesInvoices().catch(() => []),
                documentService.fetchSalesOrders().catch(() => []),
                documentService.fetchSalesQuotes().catch(() => []),
                documentService.fetchSalesCreditmemos().catch(() => []),
                documentService.fetchCustomerInvoices().catch(() => []),
                documentService.fetchCustomerCreditMemos().catch(() => []),
                documentService.fetchCustomerPayments().catch(() => []),
                customerReportService.fetchCustomer().catch(() => []),
            ]);

            const inv = asArray(postedSalesInvoices);
            const memos = asArray(postedSalesCreditMemos);
            const pays = asArray(customerPayments);

            setPostedInvoices(inv);
            setPostedCreditMemos(memos);
            setPayments(pays);
            setCustomer(customer);

            setStats({
                salesInvoices: asArray(salesInvoices).length,
                salesOrders: asArray(salesOrders).length,
                salesQuotes: asArray(salesQuotes).length,
                salesCreditMemos: asArray(salesCreditMemos).length,
                postedSalesInvoices: inv.length,
                postedSalesCreditMemos: memos.length,
            });
        } catch (err) {
            console.error("Dashboard fetch failed:", err);
            setError("Failed to load dashboard data. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardStats();
    }, [fetchDashboardStats]);

    const documents = [
        {
            title: "Sales Invoices",
            value: stats.salesInvoices,
            subtitle: "Open invoices",
            color: "bg-teal-600 hover:bg-teal-700",
            to: "/sales-documents",
        },
        {
            title: "Sales Orders",
            value: stats.salesOrders,
            subtitle: "Open orders",
            color: "bg-teal-600 hover:bg-teal-700",
            to: "/sales-documents",
        },
        {
            title: "Sales Quotes",
            value: stats.salesQuotes,
            subtitle: "Open quotes",
            color: "bg-teal-600 hover:bg-teal-700",
            to: "/sales-documents",
        },
        {
            title: "Sales Creditmemos",
            value: stats.salesCreditMemos,
            subtitle: "Open credit memos",
            color: "bg-teal-600 hover:bg-teal-700",
            to: "/sales-documents",
        },
    ];

    const customerName = getCustomerName(customer);
    const customerBalance = getCustomerBalance(customer);

    const postedDocuments = [
        {
            title: "Posted Sales Invoices",
            value: stats.postedSalesInvoices,
            subtitle: "Posted invoices",
            color: "bg-teal-600 hover:bg-teal-700",
            to: "/posted-sales-documents",
        },
        {
            title: "Posted Sales Creditmemos",
            value: stats.postedSalesCreditMemos,
            subtitle: "Posted credit memos",
            color: "bg-teal-600 hover:bg-teal-700",
            to: "/posted-sales-documents",
        },
    ];

    const customerCreditLimit = [
        {
            title: "Credit Limit",
            value: formatCurrency(customer.creditLimitLCY || 0),
            subtitle: "Credit Limit",
            color: (customer.balanceLCY > customer.creditLimitLCY) ? "bg-red-400 hover:bg-red-300" : "bg-teal-600 hover:bg-teal-700",
            to: "#",
        }
    ]

    const barChartData = buildYearlyBarData(postedInvoices, postedCreditMemos);
    const lineChartData = buildMonthlyLineData(
        postedInvoices,
        payments,
        selectedYear
    );

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main
                id="dashboard"
                className="mx-auto max-w-[1120px] px-5 pb-10 pt-4 lg:px-0 lg:pt-10"
            >
                {error && (
                    <div className="mb-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex min-h-[280px] flex-col items-center justify-center gap-3">
                        <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
                        <p className="text-sm font-medium text-gray-700">
                            Loading dashboard…
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 py-4">
                            <p className="text-[13px] font-semibold uppercase tracking-wide text-gray-900">
                                {customerName.toUpperCase()}
                            </p>
                            <p className="mt-3 text-xs text-gray-500">
                                Current balance
                            </p>
                            <p className="mt-0.5 text-2xl font-semibold tracking-tight text-gray-950">
                                {formatCurrency(customerBalance)}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
                            {
                                postedDocuments.map((stat) => (
                                    <Link
                                        key={stat.title}
                                        to={stat.to}
                                        className="block h-full text-left"
                                        aria-label={`View ${stat.title}`}
                                    >
                                        <TealStatCard {...stat} />
                                    </Link>
                                ))
                            }
                            {
                                customerCreditLimit.map((stat) => (
                                    <Link
                                        key={stat.title}
                                        to={stat.to}
                                        className="block h-full text-left"
                                        aria-label={`View ${stat.title}`}
                                    >
                                        <TealStatCard {...stat} />
                                    </Link>
                                ))
                            }
                            {
                                documents.map((stat) => (
                                    <Link
                                        key={stat.title}
                                        to={stat.to}
                                        className="block h-full text-left"
                                        aria-label={`View ${stat.title}`}
                                    >
                                        <TealStatCard {...stat} />
                                    </Link>
                                ))
                            }

                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="border border-gray-200 bg-white p-4 shadow-sm">
                                <p className="mb-1 text-sm font-semibold text-gray-950">
                                    POSTED DOCUMENTS BY YEAR
                                </p>
                                <p className="mb-4 text-xs text-gray-500">
                                    Posted Invoices Vs Credit Memos (Last 5
                                    Years) — Amounts
                                </p>
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={barChartData} barGap={4}>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />
                                            <XAxis
                                                dataKey="year"
                                                tick={{ fontSize: 12 }}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                tick={{ fontSize: 12 }}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={formatAxisValue}
                                            />
                                            <Tooltip
                                                formatter={(value) =>
                                                    Number(value).toLocaleString(
                                                        undefined,
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )
                                                }
                                                contentStyle={{
                                                    fontSize: 12,
                                                    borderRadius: 8,
                                                    border: "1px solid #e5e7eb",
                                                }}
                                            />
                                            <Legend wrapperStyle={{ fontSize: 12 }} />
                                            <Bar
                                                dataKey="invoices"
                                                name="Posted invoices"
                                                fill="#0d9488"
                                                radius={[4, 4, 0, 0]}
                                            />
                                            <Bar
                                                dataKey="creditMemos"
                                                name="Posted credit memos"
                                                fill="#115e59"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-950">
                                            INVOICES VS PAYMENTS
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Monthly Comparison For {selectedYear}{" "}
                                            — Amounts
                                        </p>
                                    </div>

                                    <select
                                        value={selectedYear}
                                        onChange={(e) =>
                                            setSelectedYear(Number(e.target.value))
                                        }
                                        className="h-9 border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                                        aria-label="Select year"
                                    >
                                        {yearOptions.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={lineChartData}>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                vertical={false}
                                            />
                                            <XAxis
                                                dataKey="month"
                                                tick={{ fontSize: 12 }}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                tick={{ fontSize: 12 }}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={formatAxisValue}
                                            />
                                            <Tooltip
                                                formatter={(value) =>
                                                    Number(value).toLocaleString(
                                                        undefined,
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )
                                                }
                                                contentStyle={{
                                                    fontSize: 12,
                                                    borderRadius: 8,
                                                    border: "1px solid #e5e7eb",
                                                }}
                                            />
                                            <Legend wrapperStyle={{ fontSize: 12 }} />
                                            <Line
                                                type="monotone"
                                                dataKey="invoices"
                                                name="Posted invoices"
                                                stroke="#0d9488"
                                                strokeWidth={2}
                                                dot={{ r: 3, fill: "#0d9488" }}
                                                activeDot={{ r: 5 }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="payments"
                                                name="Payments"
                                                stroke="#f59e0b"
                                                strokeWidth={2}
                                                dot={{ r: 3, fill: "#f59e0b" }}
                                                activeDot={{ r: 5 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default Dashboard;