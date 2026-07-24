export const navigation = [
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
