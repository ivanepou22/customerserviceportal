import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Icon from "./Icon";
import TealStatCard from "./TealStatCard";
import MetricCard from "./MetricCard";
import { useAuth } from "../context/AuthContext";

const navigation = [
    { dashboard: { caption: 'Dashboard', link: 'dashboard' } },
    {
        documents: {
            caption: 'Sales Documents',
            link: '#',
            sInvoices: { caption: 'Sales Invoices', link: '/sales-invoices' },
            sOrders: { caption: 'Sales Orders', link: '/sales-orders' },
            sCreditmemo: { caption: 'Sales Creditmemos', link: '/sales-credit-memos' },
            sQuotes: { caption: 'Sales Quotes', link: '/sales-quotes' }
        }
    },
    {
        postedDocuments: {
            caption: 'Posted Documents',
            link: '#',
            postedSalesInvoices: { caption: 'Posted Sales Invoices', link: '/posted-sales-invoices' },
            postedSalesCreditmemo: { caption: 'Posted Sales Creditmemos', link: '/posted-sales-creditmemos' }
        }
    },
    {
        customerLedgers: {
            caption: 'Customer Ledgers',
            link: '',
            customerPayments: { caption: 'Customer Payments', link: '/customer-payments' },
            ledgerEntries: { caption: 'Customer Ledger Entries', link: '/customer-ledger-entries' }
        }
    },
    {
        reports: {
            caption: 'Reports',
            link: '#',
            detailedTrialBalance: { caption: 'Detailed Trial Balance', link: '#' },
            statement: { caption: 'Customer Statement', link: '#' },
            customerAging: { caption: 'Customer Aging', link: '#' }
        }
    }
];

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubMenus, setOpenSubMenus] = useState({});

    const toggleSubMenu = (key) => {
        setOpenSubMenus(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderDesktopMenuItem = (item) => {
        const key = Object.keys(item)[0];
        const menuData = item[key];
        if (!menuData?.caption) return null;

        const children = Object.entries(menuData)
            .filter(([k]) => k !== 'caption' && k !== 'link')
            .map(([_, sub]) => sub);

        if (children.length > 0) {
            return (
                <div key={key} className="group relative z-50">
                    <button className="flex items-center gap-1 rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        {menuData.caption}
                        <Icon name="chevron" size={15} className="text-muted-foreground" />
                    </button>
                    <div className="absolute left-0 top-full z-50 hidden w-56 rounded-md border border-border bg-popover p-1 shadow-lg group-hover:block bg-slate-50">
                        {children.map((subItem, idx) => {
                            const subData = subItem;
                            return (
                                <div key={idx}>
                                    <Link to={subData.link}
                                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                                        {subData.caption}
                                    </Link>
                                    {idx < children.length - 1 && <div className="border-t border-border"></div>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return (
            <Link key={key} to={menuData.link}
                className="rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                {menuData.caption}
            </Link>
        );
    };

    const renderMobileMenuItem = (item) => {
        const key = Object.keys(item)[0];
        const menuData = item[key];
        if (!menuData?.caption) return null;

        const children = Object.entries(menuData)
            .filter(([k]) => k !== 'caption' && k !== 'link')
            .map(([_, sub]) => sub);

        if (children.length > 0) {
            const isOpen = openSubMenus[key] ?? false;
            return (
                <div key={key} className="py-1">
                    <button onClick={() => toggleSubMenu(key)} className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted text-left">
                        <span>{menuData.caption}</span>
                        <span className={`text-xs transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
                    </button>
                    {isOpen && (
                        <div className="ml-4 mt-1 border-l border-border pl-4 space-y-1">
                            {children.map((subItem, idx) => (
                                <Link key={idx} to={subItem.link} className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                                    {subItem.caption}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <Link key={key} to={menuData.link} className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                {menuData.caption}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-20 border-b border-border/80 bg-background/95 backdrop-blur">
                <div className="mx-auto flex h-[60px] max-w-[1120px] items-center justify-between px-5 lg:px-0">
                    <Link to="#dashboard" className="flex items-center gap-2.5">
                        <span className="text-[22px] font-bold tracking-[-0.08em]">Customer Portal</span>
                    </Link>

                    <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
                        {navigation.map((item) => renderDesktopMenuItem(item))}
                    </nav>

                    <div className="relative group hidden md:block z-50">
                        <button className="flex items-center rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-muted">
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-slate-600">
                                <Icon name="user" size={15} />
                            </span>
                            <span className="max-w-36 truncate">{user?.email || "User"}</span>
                            <Icon name="chevron" size={15} className="text-muted-foreground" />
                        </button>

                        <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-md border border-border bg-popover p-1 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all bg-slate-50">
                            <Link to="#profile" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted hover:text-foreground text-muted-foreground">
                                <Icon name="user" size={15} /> Profile
                            </Link>
                            <div className="border-t border-border"></div>
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-red-100 hover:text-red-600 text-muted-foreground text-left"
                            >
                                ⬅ Logout
                            </button>
                        </div>
                    </div>

                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <Icon name="close" /> : <Icon name="menu" />}
                    </Button>
                </div>

                {isMenuOpen && (
                    <nav className="border-t border-border bg-background px-5 py-4 md:hidden space-y-1">
                        {navigation.map((item) => renderMobileMenuItem(item))}
                    </nav>
                )}
            </header>

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