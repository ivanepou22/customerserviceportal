import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { receiptVerificationService } from '../services/receiptVerificationService';
import Icon from './Icon';
import { base64ToPdfUrl } from '../functions/ReceiptVerification';
import { Loader2 } from "lucide-react";

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
            setError("Fetching Receipt failed. Please try again.");
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

            <div className="border-b border-emerald-100 bg-gray-500">
                <div className="mx-auto flex h-8 max-w-[1120px] items-center justify-center gap-2 px-5 text-center text-[13px] font-semibold text-white">
                    Welcome to the Vision Group Customer Portal Document Verification.
                </div>
            </div>
            <main id="dashboard" className="mx-auto max-w-[1000px] px-5 pb-10 pt-2 lg:px-0 lg:pt-4">
                {
                    isLoading ? (
                        <div className="flex min-h-screen flex-col items-center justify-center gap-2">
                            <Loader2 className="h-20 w-20 animate-spin text-red-500" />
                            <h3 className="text-lg font-semibold">
                                Processing your request
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Please wait while we verify your receipt. Do not refresh the page.
                            </p>
                        </div>
                    ) : error ? (
                        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-8 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <svg
                                    className="h-8 w-8 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01M12 3L2 21h20L12 3z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <p className="mt-2 text-sm text-red-600">
                                    {error}
                                </p>
                            </div>

                            <button
                                onClick={() => fetchReceipt(customerNo, entryNo)}
                                className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        data && (
                            <iframe
                                src={`data:application/pdf;base64,${data}`}
                                width="100%"
                                height="800"
                                title="Receipt"
                                className="border rounded" />
                        ))
                }
            </main>
        </div>
    );
}

export default VerifyReceipt;
