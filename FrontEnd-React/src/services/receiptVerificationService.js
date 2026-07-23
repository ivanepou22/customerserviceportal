import api from "../api/authApi";
export const receiptVerificationService = {
    async fetchReceiptPdf(customerNo, entryNo) {
        const url = `/receipt?customerNo=${customerNo}&entryNo=${entryNo}`;
        const response = await api.post(url, {});
        return response.data;
    }
};

// Show how to convert base64 to blobHow to preview PDF in React?How to handle large PDF files?
// How to handle PDF errors?How to preview PDF in browser?How to clean up blob URLs