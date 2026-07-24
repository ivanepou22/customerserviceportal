import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const salesOrderColumns = [
    columnHelper.accessor('postingDate', { header: 'Posting Date' }),
    columnHelper.accessor('number', { header: 'No.' }),
    columnHelper.accessor('sellToCustomerNo', { header: 'Customer No' }),
    columnHelper.accessor('sellToCustomerName', { header: 'Customer Name' }),
    columnHelper.accessor('SellToContact', { header: 'Customer Contact' }),
    columnHelper.accessor('documentType', { header: 'Document Type' }),
    columnHelper.accessor('orderDate', { header: 'Order Date' }),
    columnHelper.accessor('dueDate', { header: 'Due Date' }),
    columnHelper.accessor('currencyCode', { header: 'Currency Code' }),
    columnHelper.accessor('Amount', {
        header: 'Amount',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor('AmountIncludingVAT', {
        header: 'Amount Including VAT',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
];