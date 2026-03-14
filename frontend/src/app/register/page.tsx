import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register - FlowIMS",
    description: "Create an account for FlowIMS Inventory Management System",
};

export default function RegisterPage() {
    return <RegisterForm />;
}
