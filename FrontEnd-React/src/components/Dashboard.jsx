import Icon from "./Icon";
import TealStatCard from "./TealStatCard";
import MetricCard from "./MetricCard";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";

const metrics = [
    { title: "Total Sales", value: "4,850,000", description: "Count: 12" },
    { title: "Total Creditmemos", value: "12.4M", description: "Across 8 invoices" },
    { title: "Total Payments", value: "7,000,000", description: "Generic" },
    { title: "Total Balance", value: "17,000,000", description: "Generic" },
];

const documents = [
    { title: "Sales Invoices", value: "12.00", subtitle: "Due Today", color: "bg-teal-600 hover:bg-teal-700" },
    { title: "Sales Orders", value: "7.00", subtitle: "Next Week", color: "bg-teal-600 hover:bg-teal-700" },
    { title: "Sales Quotes", value: "3.00", subtitle: "Requires Attention", color: "bg-teal-600 hover:bg-teal-700" },
    { title: "Sales Creditmemos", value: "0.00", subtitle: "Across all invoices", color: "bg-teal-600 hover:bg-teal-700" }
];

const postedDocuments = [
    { title: "Posted Sales Invoices", value: "12.00", subtitle: "Due Today", color: "bg-teal-600 hover:bg-teal-700" },
    { title: "Posted Sales Creditmemos", value: "0.00", subtitle: "Across all invoices", color: "bg-teal-600 hover:bg-teal-700" }
];

function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="border-b border-emerald-100 bg-emerald-50">
                <div className="mx-auto flex h-8 max-w-[1120px] items-center justify-center gap-2 px-5 text-center text-[13px] font-semibold text-emerald-950">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
                        <Icon name="check" size={11} strokeWidth={3.5} />
                    </span>
                    Welcome to the Vision Group Customer Portal
                </div>
            </div>

            <main id="dashboard" className="mx-auto max-w-[1120px] px-5 pb-10 pt-4 lg:px-0 lg:pt-10">
                <div className="mb-4 flex items-end justify-between gap-4">
                    <p className="mb-1 text-sm font-medium text-muted-foreground">Documents</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {documents.map((stat, index) => (
                        <TealStatCard key={index} {...stat} />
                    ))}
                </div>

                <div className="mt-5 mb-4 flex items-end justify-between gap-4">
                    <p className="mb-1 text-sm font-medium text-muted-foreground">Posted Documents</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {postedDocuments.map((stat, index) => (
                        <TealStatCard key={index} {...stat} />
                    ))}
                </div>

                <div className="mt-5 mb-4 flex items-end justify-between gap-4">
                    <p className="mb-1 text-sm font-medium text-muted-foreground">Analysis</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
                    {metrics.map((metric) => <MetricCard key={metric.title} {...metric} />)}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;