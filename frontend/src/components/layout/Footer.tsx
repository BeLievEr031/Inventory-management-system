export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 border-t border-gray-700 px-6 py-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Inventory Management System
        </footer>
    );
}
