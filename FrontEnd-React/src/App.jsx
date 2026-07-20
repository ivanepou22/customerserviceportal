import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import LoginPage from "./components/LoginPage";

const nav = ['Dashboard', 'Documents', 'Posted Documents', 'Reports']

const navigation = [
  {
    dashboard: {
      caption: 'DashBoard',
      link: 'dashboard'
    }
  },
  {
    documents: {
      caption: 'Sales Documents',
      link: '#',
      sInvoices: {
        caption: 'Sales Invoices',
        link: '/sales-invoices'
      },
      sOrders: {
        caption: 'Sales Orders',
        link: '/sales-orders'
      },
      sCreditmemo: {
        caption: 'Sales Creditmemos',
        link: '/sales-credit-memos'
      },
      sQuotes: {
        caption: 'Sales Quotes',
        link: '/sales-quotes'
      }
    }
  },
  {
    postedDocuments: {
      caption: 'Posted Documents',
      link: '#',
      postedSalesInvoices: {
        caption: 'Posted Sales Invoices',
        link: '/posted-sales-invoices'
      },
      postedSalesCreditmemo: {
        caption: 'Posted Sales Creditmemos',
        link: '/posted-sales-creditmemos'
      }
    }
  },
  {
    customerLedgers: {
      caption: 'Customer Ledgers',
      link: '',
      customerPayments: {
        caption: 'Customer Payments',
        link: '#'
      },
      ledgerEntries: {
        caption: 'Customer Ledger Entries',
        link: '#'
      }
    }
  },
  {
    reports: {
      caption: 'Reports',
      link: '#',
      detailedTrialBalance: {
        caption: 'Detailed Trial Balance',
        link: '#'
      },
      statement: {
        caption: 'Customer Statement',
        link: '#'
      },
      customerAging: {
        caption: 'Customer Aging',
        link: '#'
      }
    }
  }
];

const documents = [
  {
    title: "Sales Invoices",
    value: "12.00",
    subtitle: "Due Today",
    color: "bg-teal-600 hover:bg-teal-700",
  },
  {
    title: "Sales Orders",
    value: "7.00",
    subtitle: "Next Week",
    color: "bg-teal-600 hover:bg-teal-700",
  },
  {
    title: "Sales Quotes",
    value: "3.00",
    subtitle: "Requires Attention",
    color: "bg-teal-600 hover:bg-teal-700",
  },
  {
    title: "Sales Creditmemos",
    value: "0.00",
    subtitle: "Across all invoices",
    color: "bg-teal-600 hover:bg-teal-700",
  }
];

const postedDocuments = [
  {
    title: "Posted Sales Invoices",
    value: "12.00",
    subtitle: "Due Today",
    color: "bg-teal-600 hover:bg-teal-700",
  },
  {
    title: "Posted Sales Creditmemos",
    value: "0.00",
    subtitle: "Across all invoices",
    color: "bg-teal-600 hover:bg-teal-700",
  }
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return isAuthenticated ? <Dashboard /> : <LoginPage onLogin={() => setIsAuthenticated(true)} />;
}

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleSubMenu = (key) => {
    setOpenSubMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Check if item has children
  const hasChildren = (menuData) => {
    return Object.keys(menuData).some(k =>
      k !== 'caption' && k !== 'link' && typeof menuData[k] === 'object'
    );
  };

  // Render Desktop Dropdown Menu with Dividers Between Items
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

          {/* Dropdown */}
          <div className="absolute left-0 top-full z-50 hidden w-56 rounded-md border border-border bg-popover p-1 shadow-lg group-hover:block bg-slate-50">
            {children.map((subItem, idx) => {
              const subKey = Object.keys(subItem)[0] || idx;
              const subData = subItem;

              return (
                <div key={subKey}>
                  <a
                    href={subData.link}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {subData.caption}
                  </a>
                  {idx < children.length - 1 && (
                    <div className="border-t border-border"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <a
        key={key}
        href={menuData.link}
        className="rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      >
        {menuData.caption}
      </a>
    );
  };

  // Render Mobile Menu Item
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
          <button
            onClick={() => toggleSubMenu(key)}
            className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted text-left"
          >
            <span>{menuData.caption}</span>
            <span className={`text-xs transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
          </button>

          {isOpen && (
            <div className="ml-4 mt-1 border-l border-border pl-4 space-y-1">
              {children.map((subItem, idx) => {
                const subData = subItem;
                return (
                  <a
                    key={idx}
                    href={subData.link}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {subData.caption}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <a
        key={key}
        href={menuData.link}
        className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        {menuData.caption}
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-[60px] max-w-[1120px] items-center justify-between px-5 lg:px-0">
          <a href="#dashboard" className="flex items-center gap-2.5">
            <span className="text-[22px] font-bold tracking-[-0.08em]">Customer Portal</span>
          </a>

          {/* Desktop Navigation with Dropdowns */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navigation.map((item) => renderDesktopMenuItem(item))}
          </nav>

          <div className="relative group hidden md:block z-50">
            <button className="flex items-center rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-muted">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-slate-600">
                <Icon name="user" size={15} />
              </span>
              <span className="max-w-36 truncate">alex@domain.com</span>
              <Icon name="chevron" size={15} className="text-muted-foreground" />
            </button>

            <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-md border border-border bg-popover p-1 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all bg-slate-50">
              <a
                href="#profile"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted hover:text-foreground text-muted-foreground"
              >
                <Icon name="user" size={15} /> Profile
              </a>

              {/* Divider */}
              <div className="border-t border-border"></div>

              <button
                onClick={() => {
                  console.log("Logout clicked");
                  // Add logout logic here
                }}
                className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-red-100 hover:text-red-600 text-muted-foreground text-left"
              >
                ⬅ Logout
              </button>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <Icon name="close" /> : <Icon name="menu" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="border-t border-border bg-background px-5 py-4 md:hidden space-y-1">
            {navigation.map((item) => renderMobileMenuItem(item))}
          </nav>
        )}
      </header>

      {/* Banner and Main Content (unchanged) */}
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
          <div>
            <p className="mb-1 text-sm font-medium text-muted-foreground">Documents</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {documents.map((stat, index) => (
            <TealStatCard
              key={index}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              className={stat.color}
            />
          ))}
        </div>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-medium text-muted-foreground">Posted Documents</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {postedDocuments.map((stat, index) => (
            <TealStatCard
              key={index}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              className={stat.color}
            />
          ))}
        </div>

      </main>
    </div>
  );
}

function TealStatCard({ title, value, subtitle, className = "bg-teal-600 hover:bg-teal-700" }) {
  return (
    <Card className={`${className} text-white border-0 shadow-sm transition-all cursor-pointer group min-h-[118px]  flex flex-col justify-between p-4`}>
      <div>
        <p className="text-[13px] font-medium opacity-90 line-clamp-2 leading-tight">{title}</p>
        <div className="mt-2 text-[28px] font-semibold tracking-tight">{value}</div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/20 text-xs">
        <p className="opacity-75">{subtitle}</p>
        <div className="text-white/70 group-hover:translate-x-0.5 transition-transform">→</div>
      </div>
    </Card>
  );
}

function Icon({ name, size = 20, className = "", strokeWidth = 2 }) {
  const paths = {
    shield: <><path d="M12 3 4.75 6v5.4c0 4.6 3.1 7.6 7.25 9.6 4.15-2 7.25-5 7.25-9.6V6L12 3Z" /><path d="m8.7 12 2.15 2.15 4.5-4.5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    user: <><circle cx="12" cy="8" r="3.25" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    check: <path d="m5 11 3.5 3.5L18 5.5" />,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.3 1-1.3 2.1M12 16.5h.01" /></>,
  };

  return <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default App;
