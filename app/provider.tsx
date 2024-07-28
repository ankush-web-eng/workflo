import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/sessionProvider";
import { TasksProvider } from "@/context/TasksContext";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <TasksProvider>
                {children}
            </TasksProvider>
            <Toaster />
        </AuthProvider>
    )
}