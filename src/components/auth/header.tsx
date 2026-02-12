import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";

interface HeaderProps {
    label: string;
}

export const Header = ({ label }: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <div className="flex items-center gap-2">
                <div className="bg-blue-900 p-1.5 rounded-lg">
                    <Mail className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Aiclex<span className="text-blue-900">Mail</span>
                </h1>
            </div>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    );
};
