import { useEffect } from "react";
import { Loader2, X } from "lucide-react";
import LineTable from "../tables/LineTable";
import { salesLineColumns } from "../tables/documentColumns";

export default function DocumentDetailModal({
    open,
    onClose,
    document: doc,
    documentType = "Document",
    lines = [],
    loading = false,
    error = "",
}) {

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!open) return null;

    const titleMap = {
        salesOrder: "Sales Order",
        salesInvoice: "Sales Invoice",
        salesCreditMemo: "Credit Memo",
        salesQuote: "Sales Quote",
        postedSalesInvoice: "Posted Sales Invoice",
        postedSalesCreditMemo: "Posted Sales Credit Memo",
    };

    const title = titleMap[documentType] || documentType || "Document";
    const docNo = doc?.number ?? doc?.no ?? doc?.documentNo ?? doc?.entryNo ?? "—";
    const customerNo = doc?.sellToCustomerNo ?? doc?.customerNo ?? "—";
    const customerName = doc?.sellToCustomerName ?? doc?.customerName ?? "—";
    const contact = doc?.SellToContact ?? doc?.sellToContact ?? "—";
    const currency = doc?.currencyCode || "LCY";
    const postingDescription = doc?.postingDescription ?? "—";
    const postingDate = doc?.postingDate ?? "—";
    const amount = doc?.Amount ?? doc?.amount ?? 0;
    const amountInclVat = doc?.AmountIncludingVAT ?? doc?.amountIncludingVAT ?? amount;
    const orderDate = doc?.orderDate ?? "—";
    const dueDate = doc?.dueDate ?? "—";
    const docType = doc?.documentType ?? "—";

    const formatMoney = (val) => {
        if (val == null || val === "") return "—";
        const n = Number(val);
        if (Number.isNaN(n)) return String(val);
        return n.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const formatDate = (val) => {
        if (!val) return "—";
        try {
            const d = new Date(val);
            if (Number.isNaN(d.getTime())) return String(val);
            return d.toLocaleDateString();
        } catch {
            return String(val);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-2"
            role="dialog"
            aria-modal="true"
            aria-labelledby="document-detail-title"
        >
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative z-10 flex max-h-[calc(100vh-3rem)] max-w-[1120px] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xl md:rounded-none">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
                    <div>
                        <h2
                            id="document-detail-title"
                            className="text-base font-semibold text-foreground"
                        >
                            {title}{" "}
                            <span className="font-normal text-muted-foreground">
                                #{docNo}
                            </span>
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            {docNo} - {customerName} · {customerNo}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                    {loading ? (
                        <div className="flex min-h-[300px] max-w-[1000px] flex-col items-center justify-center gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                            <p className="text-sm text-muted-foreground">
                                Loading document details…
                            </p>
                        </div>
                    ) : error ? (
                        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    ) : (
                        <div>
                            <div className="border border-border p-4 mb-4">
                                <div className="mb-2">
                                    <h1 className="text-lg font-bold text-foreground py-2">
                                        {title} {docNo}
                                    </h1>
                                </div>

                                <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                No.
                                            </p>
                                            <p className="value text-sm font-medium">
                                                {docNo}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Customer No.
                                            </p>
                                            <p className="value text-sm font-medium">
                                                {customerNo}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Customer Name
                                            </p>
                                            <p className="value text-sm font-medium">
                                                {customerName}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Contact
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                No. {customerNo}
                                                {contact && contact !== "—" ? ` · ${contact}` : ""}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Currency
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {currency ? currency : "—"}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Posting Date
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDate(postingDate)}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Document Type
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {docType ? docType : "—"}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Order Date
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDate(orderDate)}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Due Date
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDate(dueDate)}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Posting Description
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {postingDescription}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Amount
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatMoney(amount)}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Amount Incl. VAT
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatMoney(amountInclVat)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {lines.length > 0 ? (
                                <LineTable
                                    data={lines}
                                    columns={salesLineColumns}
                                    title={'Lines'}
                                />
                            ) : (
                                <p className="rounded-md border border-dashed border-border bg-muted/30 px-3 py-6 text-center text-sm text-muted-foreground">
                                    No line items loaded for this document.
                                    {!lines?.length && (
                                        <span className="mt-1 block text-xs">
                                            Connect a detail endpoint to show lines (see
                                            documentService.fetchDocumentById).
                                        </span>
                                    )}
                                </p>
                            )}

                            <div className="totals flex flex-col items-end gap-1 p-2 text-sm border border-border">
                                <div className="row flex w-65 justify-between">
                                    <span className="text-muted-foreground">Total Excl. Tax ({currency})</span>
                                    <span className="font-medium">
                                        {formatMoney(amount)}
                                    </span>
                                </div>
                                <div className="row flex w-65 justify-between">
                                    <span className="text-muted-foreground">Total Tax ({currency})</span>
                                    <span className="font-medium">
                                        {formatMoney(amountInclVat - amount)}
                                    </span>
                                </div>
                                <div className="grand flex w-65 justify-between pt-2 text-base text-base">
                                    <span>Total Incl. Tax ({currency})</span>
                                    <span>
                                        {formatMoney(amountInclVat)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}