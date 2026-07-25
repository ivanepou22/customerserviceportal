import { useEffect, useState } from 'react';
import { Loader2 } from "lucide-react";
import Header from './Header';
import DataTable from './tables/DataTable';
import { postedSalesInvoiceColumns } from './tables/documentColumns';
import { documentService } from '../services/documentService';

const PostedSalesInvoices = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPostedSalesInvoices = async () => {
        setIsLoading(true);
        setError("");
        try {
            const postedSalesInvoices = await documentService.fetchPostedSalesInvoices();
            setData(postedSalesInvoices);
        } catch (err) {
            setError("Fetching Posted Sales Invoices failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPostedSalesInvoices();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main id="dashboard" className="mx-auto max-w-[1120px] px-5 pb-10 pt-4 lg:px-0 lg:pt-10">
                <div className="mb-4 flex items-end justify-between gap-4">
                    <p className="mb-1 text-sm font-medium text-muted-foreground">Posted Sales Invoices</p>
                </div>
                {
                    isLoading ? (
                        <div className="flex min-h-screen flex-col items-center mt-30 gap-2">
                            <Loader2 className="h-20 w-20 animate-spin text-blue-500" />
                            <h3 className="text-lg font-semibold">
                                Processing your request
                            </h3>
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
                                onClick={() => fetchPostedSalesInvoices()}
                                className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        data && <DataTable data={data} columns={postedSalesInvoiceColumns} />
                    )
                }
            </main>
        </div>
    );
}

export default PostedSalesInvoices;
