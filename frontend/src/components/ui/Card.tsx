import { type ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={`bg-gray-800 border border-gray-700 rounded-xl shadow-md p-4 ${className}`}
        >
            {children}
        </div>
    );
}
