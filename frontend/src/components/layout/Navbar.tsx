import type { ReactNode } from "react";

interface NavbarProps {
    children?: ReactNode;
}

export default function Navbar(_props: NavbarProps) {
    return (
        <nav className="w-full bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
            <span className="text-white font-bold text-xl">🗓️ Inventory MS</span>
        </nav>
    );
}
