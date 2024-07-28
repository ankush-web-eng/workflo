import Header from "@/components/includes/Header";
import Sidebar from "@/components/includes/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden">
                <Header />
                {children}
            </main>
        </div>
    )
}