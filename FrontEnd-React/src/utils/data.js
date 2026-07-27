export const navigation = [
    { dashboard: { caption: 'Dashboard', link: '/dashboard' } },
    {
        documents: {
            caption: "Sales Documents",
            link: "#",
            items: [
                {
                    caption: "Sales Invoices",
                    description: "Track Sales invoices",
                    link: "/sales-invoices",
                    icon: "fileText"
                },
                {
                    caption: "Sales Orders",
                    description: "Track sales orders",
                    link: "/sales-orders",
                    icon: "checkSquare"
                },
                {
                    caption: "Sales Quotes",
                    description: "Track Sales Quotes",
                    link: "/sales-quotes",
                    icon: "square"
                },
                {
                    caption: "Sales Creditmemos",
                    description: "Track sales Creditmemos",
                    link: "/sales-credit-memos",
                    icon: "checkSquare"
                }
            ]
        }
    },
    {
        postedDocuments: {
            caption: 'Posted Documents',
            link: '#',
            items: [
                {
                    caption: 'Posted Sales Invoices',
                    link: '/posted-sales-invoices',
                    description: 'Track Posted Sales Invoices',
                    icon: 'fileSpreadsheet'
                },
                {
                    caption: 'Posted Sales Creditmemos',
                    link: '/posted-sales-creditmemos',
                    description: 'Track Posted Sales CreditMemos',
                    icon: 'minusSquare'
                }
            ]
        }
    },
    {
        customerLedgers: {
            caption: 'Customer Ledgers',
            link: '',
            items: [
                {
                    caption: 'Customer Payments',
                    link: '/customer-payments',
                    description: 'Track your Payments',
                    icon: 'creditCard'
                },
                {
                    caption: 'Customer Ledger Entries',
                    link: '/customer-ledger-entries',
                    description: 'Track your Ledger Entries',
                    icon: 'database'
                }
            ]
        }
    },
    {
        reports: {
            caption: "Reports",
            link: "#",
            items: [
                {
                    caption: "Detailed Trial Balance",
                    description: "Generate Detailed Trial Balance.",
                    icon: "barChart",
                    type: "report",
                    reportType: "detailedTrialBalance",
                    fields: ["startDate", "endDate"]
                },
                {
                    caption: "Customer Statement",
                    description: "Generate Customer Statement.",
                    icon: "pieChart",
                    type: "report",
                    reportType: "customerStatement",
                    fields: ["startDate", "endDate"]
                },
                {
                    caption: "Customer Aging",
                    description: "Generate Customer Aging.",
                    icon: "lineChart",
                    type: "report",
                    reportType: "customerAging",
                    fields: ["asOfDate"]
                }
            ]
        }
    }
];
