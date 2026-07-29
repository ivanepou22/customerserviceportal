export const navigation = [
    { dashboard: { caption: 'Dashboard', link: '/dashboard' } },
    { customerLedger: { caption: 'Customer Ledgers', link: '/customer-ledgers' } },
    { salesDocuments: { caption: 'Sales Documents', link: '/sales-documents' } },
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
                    fields: ["customerNo", "startDate", "endDate"]
                },
                {
                    caption: "Customer Statement",
                    description: "Generate Customer Statement.",
                    icon: "pieChart",
                    type: "report",
                    reportType: "customerStatement",
                    fields: ["customerNo", "startDate", "endDate"]
                },
                {
                    caption: "Customer Aging",
                    description: "Generate Customer Aging.",
                    icon: "lineChart",
                    type: "report",
                    reportType: "customerAging",
                    fields: ["customerNo", "asOfDate"]
                }
            ]
        }
    }
];

export const metrics = [
    { title: "Total Sales", value: "4,850,000", description: "Count: 12" },
    { title: "Total Creditmemos", value: "12.4M", description: "Across 8 invoices" },
    { title: "Total Payments", value: "7,000,000", description: "Generic" },
    { title: "Total Balance", value: "17,000,000", description: "Generic" },
];
