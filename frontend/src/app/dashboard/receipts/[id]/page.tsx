import ReceiptDetails from "@/components/dashboard/ReceiptDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Receipt Details - FlowIMS",
    description: "View specific receipt details in FlowIMS",
};

export default function ReceiptDetailsPage({ params }: { params: { id: string } }) {
    return <ReceiptDetails id={params.id} />;
}
