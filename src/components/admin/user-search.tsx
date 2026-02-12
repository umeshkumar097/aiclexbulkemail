"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

export function UserSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }
        params.set("page", "1");
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
                defaultValue={searchParams.get("q")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
}
