import Dashboard from "@/components/dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - FlowIMS",
    description: "Overview of your FlowIMS Inventory Management System",
};

export default function DashboardPage() {
    return <Dashboard />;
}
