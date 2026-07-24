import { useEffect, useState } from 'react';
import Header from './Header';
import DataTable from './tables/DataTable';
import { salesOrderColumns } from './tables/documentColumns';
import { documentService } from '../services/documentService';

const SalesOrders = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchSalesOrder = async () => {
        setIsLoading(true);
        setError("");
        try {
            const orders = await documentService.fetchSalesOrders();
            setData(orders);
        } catch (err) {
            setError("Fetching Receipt failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSalesOrder();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main id="dashboard" className="mx-auto max-w-[1120px] px-5 pb-10 pt-4 lg:px-0 lg:pt-10">
                <div className="mb-4 flex items-end justify-between gap-4">
                    <p className="mb-1 text-sm font-medium text-muted-foreground">Sales Orders</p>
                </div>
                {data && <DataTable data={data} columns={salesOrderColumns} />}
            </main>
        </div>
    );
}

export default SalesOrders;
