import Receipts from "@/components/dashboard/Receipts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Receipts - FlowIMS",
    description: "Manage and track incoming stock shipments in FlowIMS",
};

export default function ReceiptsPage() {
    return <Receipts />;
}
