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
    reports: {
      caption: 'Reports',
      link: '#',
      detailedTrialBalance: {
        caption: 'Customer Detailed Trial Balance',
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

console.log(navigation);

const metrics = [
  {
    title: "Requests sent",
    value: "185",
    description: "Data removal requests securely sent to brokers on your behalf.",
  },
  {
    title: "Requests in progress",
    value: "104",
    description: "Data brokers that have started processing your removal requests.",
  },
  {
    title: "Requests completed",
    value: "81",
    description: "Data brokers that confirmed they no longer hold your data.",
  },
];

navigation.map((nav, index) => console.log(nav))

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

  // Render menu item
  const renderMenuItem = (item, isMobile = false) => {
    const key = Object.keys(item)[0];
    const menuData = item[key];

    if (!menuData?.caption) return null;

    const hasChildren = Object.keys(menuData).some(k =>
      k !== 'caption' && k !== 'link' && typeof menuData[k] === 'object'
    );

    if (hasChildren) {
      if (isMobile) {
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
                {Object.entries(menuData)
                  .filter(([k]) => k !== 'caption' && k !== 'link')
                  .map(([_, subItem]) => renderMenuItem({ temp: subItem }, true))}
              </div>
            )}
          </div>
        );
      } else {
        // Desktop top nav - main items only
        return (
          <a
            key={key}
            href={menuData.link}
            className="rounded-md px-3 py-2 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {menuData.caption}
          </a>
        );
      }
    }

    // Regular menu item
    return (
      <a
        key={key}
        href={menuData.link}
        className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${isMobile
          ? "block text-muted-foreground hover:bg-muted hover:text-foreground"
          : "text-[13px] text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
      >
        {menuData.caption}
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-[60px] max-w-[1120px] items-center justify-between px-5 lg:px-0">
          <a href="#dashboard" className="flex items-center gap-2.5" aria-label="Vision Group">
            <span className="text-[22px] font-bold tracking-[-0.08em]">Customer Portal</span>
          </a>

          {/* Desktop Navigation using navigation object */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navigation.map((item) => renderMenuItem(item, false))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Icon name="bell" size={18} />
            </Button>
            <button className="flex items-center rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-muted">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-slate-600">
                <Icon name="user" size={15} />
              </span>
              <span className="max-w-36 truncate">alex@domain.com</span>
              <Icon name="chevron" size={15} className="text-muted-foreground" />
            </button>
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
            {navigation.map((item) => renderMenuItem(item, true))}
          </nav>
        )}
      </header>

      {/* Your existing banner and main content */}
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
            <p className="mb-1 text-sm font-medium text-muted-foreground">Overview</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-[20px]">Documents</h1>
          </div>
        </div>

        <section className="grid gap-5 md:grid-cols-3" aria-label="Removal request metrics">
          {metrics.map((metric) => <MetricCard key={metric.title} {...metric} />)}
        </section>

        <section className="mt-5 grid gap-5 md:grid-cols-2" aria-label="Additional privacy metrics">
          <MetricCard
            title="Time saved"
            value={<><span>10</span><small>hrs</small><span className="ml-2">26</span><small>min</small></>}
            description="Estimated time saved compared with sending each request manually."
            className="md:col-span-1"
          />
          <MetricCard
            title="Suppression list entries"
            value="18"
            description="Brokers have added your information to their suppression lists, helping prevent it from being collected again."
          />
        </section>
      </main>
    </div>
  );
}

function MetricCard({ title, value, description, className = "" }) {
  return (
    <Card className={`min-h-[197px] ${className}`}>
      <CardHeader className="px-5 pb-2 pt-5 sm:px-6 sm:pt-6"><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="flex items-baseline text-[32px] font-semibold leading-none tracking-[-0.06em] sm:text-[34px]">{value}</div>
        <div className="my-5 h-px bg-border" />
        <p className="max-w-md text-[12px] leading-[18px] text-muted-foreground">{description}</p>
      </CardContent>
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
