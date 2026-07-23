import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { receiptVerificationService } from '../services/receiptVerificationService';
import Icon from './Icon';
import { base64ToPdfUrl } from '../hooks/ReceiptVerification';

const VerifyReceipt = () => {
    const [data, setData] = useState("")
    const [pdfUrl, setPdfUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();
    const customerNo = searchParams.get("customerNo");
    const entryNo = searchParams.get("entryNo");

    const fetchReceipt = async (customerNo, entryNo) => {
        setIsLoading(true);
        setError("");
        try {
            const base64Pdf = await receiptVerificationService.fetchReceiptPdf(
                customerNo,
                entryNo
            );
            setData(base64Pdf);
            const url = base64ToPdfUrl(base64Pdf);
            setPdfUrl(url);
        } catch (err) {
            setError(err.message || "Fetching Receipt failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReceipt(customerNo, entryNo);
    }, [customerNo, entryNo]);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-20 border-b border-border/80 bg-background/95 backdrop-blur">
                <div className="mx-auto flex h-[60px] max-w-[1120px] items-center justify-between px-5 lg:px-0">
                    <span className="text-[22px] font-bold tracking-[-0.08em]">Customer Portal</span>
                </div>
            </header>

            <div className="border-b border-emerald-100 bg-emerald-50">
                <div className="mx-auto flex h-8 max-w-[1120px] items-center justify-center gap-2 px-5 text-center text-[13px] font-semibold text-emerald-950">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
                        <Icon name="check" size={11} strokeWidth={3.5} />
                    </span>
                    Welcome to the Vision Group Customer Portal Document Verification.
                </div>
            </div>
            <main id="dashboard" className="mx-auto max-w-[1000px] px-5 pb-10 pt-2 lg:px-0 lg:pt-4">
                {data && (
                    <iframe
                        src={`data:application/pdf;base64,${data}`}
                        width="100%"
                        height="800"
                        title="Receipt"
                        className="border rounded" />
                )}
            </main>
        </div>
    );
}

export default VerifyReceipt;
