import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const salesOrderColumns = [
    columnHelper.accessor('postingDate', { header: 'PostingDate' }),
    columnHelper.accessor('number', { header: 'No.' }),
    columnHelper.accessor('sellToCustomerNo', { header: 'CustomerNo' }),
    columnHelper.accessor('sellToCustomerName', { header: 'CustomerName' }),
    columnHelper.accessor('SellToContact', { header: 'Contact' }),
    columnHelper.accessor('documentType', { header: 'DocType' }),
    columnHelper.accessor('orderDate', { header: 'OrderDate' }),
    columnHelper.accessor('dueDate', { header: 'DueDate' }),
    columnHelper.accessor('currencyCode', { header: 'CurrencyCode' }),
    columnHelper.accessor('Amount', {
        header: 'Amount',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor('AmountIncludingVAT', {
        header: 'AmountIncludingVAT',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
];

export const salesInvoiceColumns = [
    columnHelper.accessor('postingDate', { header: 'PostingDate' }),
    columnHelper.accessor('number', { header: 'No.' }),
    columnHelper.accessor('sellToCustomerNo', { header: 'CustomerNo' }),
    columnHelper.accessor('sellToCustomerName', { header: 'CustomerName' }),
    columnHelper.accessor('SellToContact', { header: 'Contact' }),
    columnHelper.accessor('documentType', { header: 'DocType' }),
    columnHelper.accessor('orderDate', { header: 'OrderDate' }),
    columnHelper.accessor('dueDate', { header: 'DueDate' }),
    columnHelper.accessor('currencyCode', { header: 'CurrencyCode' }),
    columnHelper.accessor('Amount', {
        header: 'Amount',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor('AmountIncludingVAT', {
        header: 'AmountIncludingVAT',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
];

export const salesQuoteColumns = [
    columnHelper.accessor('postingDate', { header: 'PostingDate' }),
    columnHelper.accessor('number', { header: 'No.' }),
    columnHelper.accessor('sellToCustomerNo', { header: 'CustomerNo' }),
    columnHelper.accessor('sellToCustomerName', { header: 'CustomerName' }),
    columnHelper.accessor('SellToContact', { header: 'Contact' }),
    columnHelper.accessor('documentType', { header: 'DocType' }),
    columnHelper.accessor('orderDate', { header: 'OrderDate' }),
    columnHelper.accessor('dueDate', { header: 'DueDate' }),
    columnHelper.accessor('currencyCode', { header: 'CurrencyCode' }),
    columnHelper.accessor('Amount', {
        header: 'Amount',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor('AmountIncludingVAT', {
        header: 'AmountIncludingVAT',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
];

export const salesCreditmemoColumns = [
    columnHelper.accessor('postingDate', { header: 'PostingDate' }),
    columnHelper.accessor('number', { header: 'No.' }),
    columnHelper.accessor('sellToCustomerNo', { header: 'CustomerNo' }),
    columnHelper.accessor('sellToCustomerName', { header: 'CustomerName' }),
    columnHelper.accessor('SellToContact', { header: 'Contact' }),
    columnHelper.accessor('documentType', { header: 'DocType' }),
    columnHelper.accessor('orderDate', { header: 'OrderDate' }),
    columnHelper.accessor('dueDate', { header: 'DueDate' }),
    columnHelper.accessor('currencyCode', { header: 'CurrencyCode' }),
    columnHelper.accessor('Amount', {
        header: 'Amount',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor('AmountIncludingVAT', {
        header: 'AmountIncludingVAT',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
];

export const postedSalesInvoiceColumns = [
    columnHelper.accessor('postingDate', { header: 'PostingDate' }),
    columnHelper.accessor('no', { header: 'No.' }),
    columnHelper.accessor('sellToCustomerNo', { header: 'CustomerNo' }),
    columnHelper.accessor('sellToCustomerName', { header: 'CustomerName' }),
    columnHelper.accessor('orderNo', { header: 'OrderNo.' }),
    columnHelper.accessor('orderDate', { header: 'OrderDate' }),
    columnHelper.accessor('dueDate', { header: 'DueDate' }),
    columnHelper.accessor('currencyCode', { header: 'CurrencyCode' }),
    columnHelper.accessor('amount', {
        header: 'Amount',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor('amountIncludingVAT', {
        header: 'AmountIncludingVAT',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
];

export const postedSalesCreditmemoColumns = [
    columnHelper.accessor('postingDate', { header: 'PostingDate' }),
    columnHelper.accessor('no', { header: 'No.' }),
    columnHelper.accessor('sellToCustomerNo', { header: 'CustomerNo' }),
    columnHelper.accessor('sellToCustomerName', { header: 'CustomerName' }),
    columnHelper.accessor('SellToContact', { header: 'Contact' }),
    columnHelper.accessor('externalDocumentNo', { header: 'ExternalDocumentNo' }),
    columnHelper.accessor('dueDate', { header: 'DueDate' }),
    columnHelper.accessor('currencyCode', { header: 'CurrencyCode' }),
    columnHelper.accessor('amount', {
        header: 'Amount',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor('amountIncludingVAT', {
        header: 'AmountIncludingVAT',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
];

export const customerPaymentColumns = [
    columnHelper.accessor('entryNo', { header: 'EntryNo.' }),
    columnHelper.accessor('postingDate', { header: 'PostingDate' }),
    columnHelper.accessor('documentNo', { header: 'DocNo' }),
    columnHelper.accessor('documentType', { header: 'DocType' }),
    columnHelper.accessor('description', { header: 'Description' }),
    columnHelper.accessor('customerNo', { header: 'CustomerNo' }),
    columnHelper.accessor('customerName', { header: 'CustomerName' }),
    columnHelper.accessor('currencyCode', { header: 'CurrencyCode' }),
    columnHelper.accessor('amount', {
        header: 'Amount',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor('amountLCY', {
        header: 'AmountLCY',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor('remainingAmount', {
        header: 'RemainingAmount',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor('remainingAmt_LCY', {
        header: 'RemainingAmountLCY',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
];

export const customerLedgerColumns = [
    columnHelper.accessor('entryNo', { header: 'EntryNo.' }),
    columnHelper.accessor('postingDate', { header: 'PostingDate' }),
    columnHelper.accessor('documentNo', { header: 'DocNo' }),
    columnHelper.accessor('documentType', { header: 'DocType' }),
    columnHelper.accessor('description', { header: 'Description' }),
    columnHelper.accessor('customerNo', { header: 'CustomerNo' }),
    columnHelper.accessor('customerName', { header: 'CustomerName' }),
    columnHelper.accessor('currencyCode', { header: 'CurrencyCode' }),
    columnHelper.accessor('documentDate', { header: 'DocumentDate' }),
    columnHelper.accessor('amount', {
        header: 'Amount',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor('amountLCY', {
        header: 'AmountLCY',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor('remainingAmount', {
        header: 'RemainingAmount',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor('remainingAmt_LCY', {
        header: 'RemainingAmountLCY',
        cell: info => `${info.getValue().toLocaleString()}`,
    }),
];

export const salesLineColumns = [
    columnHelper.accessor('type', { header: 'Type' }),
    columnHelper.accessor('no', { header: 'No.' }),
    columnHelper.accessor('description', { header: 'Description' }),
    columnHelper.accessor('description2', { header: 'Description2' }),
    columnHelper.accessor('unitOfMeasureCode', { header: 'uom' }),
    columnHelper.accessor('quantity', { header: 'quantity' }),
    columnHelper.accessor('unitPrice', { header: 'unit Price', cell: info => `${info.getValue().toLocaleString()}`, }),
    columnHelper.accessor('lineAmount', { header: 'line Amount', cell: info => `${info.getValue().toLocaleString()}` }),
    columnHelper.accessor('lineDiscountPercentange', { header: 'line Disc. Perc.', cell: info => `${info.getValue().toLocaleString()}` }),
    columnHelper.accessor('lineDiscountAmount', { header: 'line Disc. Amount', cell: info => `${info.getValue().toLocaleString()}`, }),
    columnHelper.accessor('invDiscountAmount', { header: 'invDiscountAmount', cell: info => `${info.getValue().toLocaleString()}`, }),
    columnHelper.accessor('lineAmountExclVAT', { header: 'lineAmountExclVAT', cell: info => `${info.getValue().toLocaleString()}`, }),
    columnHelper.accessor('vat_Percentage', { header: 'vat_Percentage', cell: info => `${info.getValue().toLocaleString()}`, }),
    columnHelper.accessor('vatBaseAmount', { header: 'vatBaseAmount', cell: info => `${info.getValue().toLocaleString()}`, }),
    columnHelper.accessor('lineAmountInclVAT', { header: 'lineAmountInclVAT', cell: info => `${info.getValue().toLocaleString()}`, }),
];