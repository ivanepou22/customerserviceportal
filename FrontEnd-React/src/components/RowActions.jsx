import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "./ui/button";
import DocumentDetailModal from "./modals/DocumentDetailModal";
import { documentService } from "../services/documentService";

/**
 * Row actions for sales document tables.
 * Opens a detail modal; optionally loads full document + lines from the API.
 *
 * Props:
 *  - row: original row object from the table
 *  - documentType: key used by the modal / service
 *    e.g. "salesOrder" | "salesInvoice" | "salesCreditMemo" | "salesQuote"
 */
export default function RowActions({ row, documentType = "salesInvoice" }) {
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState(null);
    const [lines, setLines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleView = async () => {
        setOpen(true);
        setError("");
        setDetail(row);
        setLines([]);

        const docNo = row?.number ?? row?.no ?? row?.documentNo;
        if (!docNo) return;

        setLoading(true);
        try {
            let response = {};

            switch (documentType) {
                case "salesInvoice":
                    response = await documentService.fetchSalesInvoice(docNo);
                    break;
                case "salesOrder":
                    response = await documentService.fetchSalesOrder(docNo);
                    break;
                case "salesQuote":
                    response = await documentService.fetchSalesQuote(docNo);
                    break;
                case "salesCreditMemo":
                    response = await documentService.fetchSalesCreditmemo(docNo);
                    break;
            }

            const header = response;
            const docLines =
                response?.saleslines ??
                response?.invoiceLines ??
                response?.lines ??
                response?.documentLines ??
                [];

            setDetail(header);
            setLines(Array.isArray(docLines) ? docLines : []);
        } catch (err) {
            console.error("Failed to load document detail:", err);
            setError(
                "Could not load full document details. Showing list data only."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center gap-1">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleView}
                    className="h-6 gap-1.5 px-2 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                    title="View details"
                >
                    <span className="hidden sm:inline">View</span>
                </Button>
            </div>

            <DocumentDetailModal
                open={open}
                onClose={() => setOpen(false)}
                document={detail}
                documentType={documentType}
                lines={lines}
                loading={loading}
                error={error}
            />
        </>
    );
}
