export const navigation = [
    { dashboard: { caption: 'Dashboard', link: '/dashboard' } },
    { customerLedger: { caption: 'Customer Ledgers', link: '/customer-ledgers' } },
    { salesDocuments: { caption: 'Sales Documents', link: '/sales-documents' } },
    { postedSalesDocuments: { caption: 'Posted Sales Documents', link: '/posted-sales-documents' } },
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
