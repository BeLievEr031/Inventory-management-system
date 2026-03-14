import NewReceipt from "@/components/dashboard/NewReceipt";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "New Receipt - FlowIMS",
    description: "Create a new stock receipt in FlowIMS",
};

export default function NewReceiptPage() {
    return <NewReceipt />;
}
