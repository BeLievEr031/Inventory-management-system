import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
}

export default function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) {
    const base = "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none";
    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-500 text-white",
        secondary: "bg-gray-700 hover:bg-gray-600 text-white",
        danger: "bg-rose-600 hover:bg-rose-500 text-white",
    };
    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}
