import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import LineTable from "../tables/LineTable";
import { salesLineColumns } from "../tables/documentColumns";
import { customerReportService } from "../../services/customerReportService";

export default function DocumentDetailModal({
    open,
    onClose,
    document: doc,
    documentType = "Document",
    lines = [],
    loading = false,
    error = "",
}) {
    const [activeTab, setActiveTab] = useState("details");
    const [pdfData, setPdfData] = useState(null);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [pdfError, setPdfError] = useState("");

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

    useEffect(() => {
        if (open) {
            setActiveTab("details");
            setPdfData(null);
            setPdfError("");
            setPdfLoading(false);
        }
    }, [open, doc?.number, doc?.no, doc?.documentNo]);

    useEffect(() => {
        if (activeTab !== "pdf" || !open) return;

        const docNo = doc?.number ?? doc?.no ?? doc?.documentNo ?? doc?.entryNo;

        if (!docNo) {
            setPdfError("Document number is missing.");
            return;
        }

        let cancelled = false;

        const loadPdf = async () => {
            setPdfLoading(true);
            setPdfError("");
            setPdfData(null);

            try {
                let base64Pdf;

                if (documentType === "salesOrder") {
                    base64Pdf = await customerReportService.fetchSalesOrder(docNo);
                } else {
                    throw new Error(
                        `PDF generation is not yet available for ${titleMap[documentType] || documentType}`
                    );
                }

                if (!cancelled) {
                    setPdfData(base64Pdf);
                }
            } catch (err) {
                if (!cancelled) {
                    setPdfError(
                        err?.message || "Failed to generate PDF. Please try again."
                    );
                }
            } finally {
                if (!cancelled) {
                    setPdfLoading(false);
                }
            }
        };

        loadPdf();

        return () => {
            cancelled = true;
        };
    }, [activeTab, open, doc, documentType]);

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

            <div className="relative z-10 flex w-full max-h-[calc(100vh-3rem)] max-w-[1120px] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xl md:rounded-none">
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

                <div className="flex border-b border-border bg-muted/20 px-4">
                    <button
                        type="button"
                        onClick={() => setActiveTab("details")}
                        className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === "details"
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Document Details
                        {activeTab === "details" && (
                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-teal-600" />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("pdf")}
                        className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === "pdf"
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Print
                        {activeTab === "pdf" && (
                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-teal-600" />
                        )}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex min-h-[400px] flex-col items-center justify-center gap-3 p-4">
                            <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                            <p className="text-sm text-muted-foreground">
                                Loading document details…
                            </p>
                        </div>
                    ) : error ? (
                        <div className="m-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    ) : activeTab === "details" ? (
                        <div className="p-4 sm:p-5">
                            <div className="mb-4 border border-border p-4">
                                <div className="mb-2">
                                    <h1 className="py-2 text-lg font-bold text-foreground">
                                        {title} {docNo}
                                    </h1>
                                </div>

                                <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                No.
                                            </p>
                                            <p className="value text-sm font-medium">{docNo}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Customer No.
                                            </p>
                                            <p className="value text-sm font-medium">{customerNo}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Customer Name
                                            </p>
                                            <p className="value text-sm font-medium">{customerName}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Contact
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {customerNo}
                                                {contact && contact !== "—" ? ` · ${contact}` : ""}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-sm">
                                            <p className="label text-[11px] uppercase tracking-wide text-muted-foreground">
                                                Currency
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {currency || "—"}
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
                                                {docType || "—"}
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
                                    title="Lines"
                                />
                            ) : (
                                <p className="rounded-md border border-dashed border-border bg-muted/30 px-3 py-6 text-center text-sm text-muted-foreground">
                                    No line items loaded for this document.
                                </p>
                            )}

                            <div className="totals mt-4 flex flex-col items-end gap-1 border border-border p-2 text-sm">
                                <div className="row flex w-65 justify-between">
                                    <span className="text-muted-foreground">
                                        Total Excl. Tax ({currency})
                                    </span>
                                    <span className="font-medium">{formatMoney(amount)}</span>
                                </div>
                                <div className="row flex w-65 justify-between">
                                    <span className="text-muted-foreground">
                                        Total Tax ({currency})
                                    </span>
                                    <span className="font-medium">
                                        {formatMoney(amountInclVat - amount)}
                                    </span>
                                </div>
                                <div className="grand flex w-65 justify-between pt-2 text-base">
                                    <span>Total Incl. Tax ({currency})</span>
                                    <span>{formatMoney(amountInclVat)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 sm:p-5">
                            {pdfLoading ? (
                                <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
                                    <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                                    <p className="text-sm text-muted-foreground">
                                        Generating PDF for {title} {docNo}…
                                    </p>
                                </div>
                            ) : pdfError ? (
                                <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                    {pdfError}
                                </div>
                            ) : pdfData ? (
                                <iframe
                                    src={`data:application/pdf;base64,${pdfData}#toolbar=1&navpanes=0&scrollbar=1&view=FitW`}
                                    title={`${title} ${docNo} - PDF`}
                                    className="h-full min-h-[95vh] w-full border-0"
                                />
                            ) : (
                                <div className="flex min-h-[400px] flex-col items-center justify-center gap-2 text-center">
                                    <p className="text-sm text-muted-foreground">
                                        No PDF available for this document.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}