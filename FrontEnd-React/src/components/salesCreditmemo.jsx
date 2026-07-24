import { useEffect, useState } from 'react';
import Header from './Header';
import DataTable from './tables/DataTable';
import { documentService } from '../services/documentService';
import { salesCreditmemoColumns } from './tables/documentColumns';

const SalesCreditmemo = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchSalesCreditmemos = async () => {
        setIsLoading(true);
        setError("");
        try {
            const creditmemos = await documentService.fetchSalesCreditmemos();
            setData(creditmemos);
        } catch (err) {
            setError("Fetching Receipt failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSalesCreditmemos();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main id="dashboard" className="mx-auto max-w-[1120px] px-5 pb-10 pt-4 lg:px-0 lg:pt-10">
                <div className="mb-4 flex items-end justify-between gap-4">
                    <p className="mb-1 text-sm font-medium text-muted-foreground">Sales Credit Memos</p>
                </div>
                {data && <DataTable data={data} columns={salesCreditmemoColumns} />}
            </main>
        </div>
    );
}

export default SalesCreditmemo;
