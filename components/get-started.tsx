'use client';
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";

export default function GetStarted() {

    const { status } = useSession();
    const handleAuth = () => {
        if (status === "authenticated") {
            window.location.href = "/dashboard";
        } else {
            window.location.href = "/signin";
        }
    }

    return (
        <div className="space-x-4">
            <button
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#a250f3] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#C084FC]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C084FC] disabled:pointer-events-none disabled:opacity-50"
                onClick={handleAuth}
            >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
            </button>
        </div>
    )
}