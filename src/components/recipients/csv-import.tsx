"use client";

import { useState, useTransition } from "react";
import Papa from "papaparse";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { importRecipients } from "@/actions/recipient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Loader2 } from "lucide-react";

interface CSVImportProps {
    campaignId: string;
    onSuccess?: () => void;
}

export const CSVImport = ({ campaignId, onSuccess }: CSVImportProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) return;

        startTransition(() => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: async (results) => {
                    const data = results.data as any[];
                    // Basic validation: check if 'email' column exists in first row
                    if (data.length > 0 && !('email' in data[0])) {
                        toast.error("CSV must have an 'email' column header.");
                        return;
                    }

                    const response = await importRecipients(campaignId, data);

                    if (response.error) {
                        toast.error(response.error);
                    } else {
                        toast.success(response.success);
                        setFile(null);
                        router.refresh();
                        if (onSuccess) onSuccess();
                    }
                },
                error: (error) => {
                    toast.error(`Error parsing CSV: ${error.message}`);
                }
            });
        });
    };

    return (
        <div className="space-y-4 border rounded-md p-4">
            <div className="space-y-2">
                <Label htmlFor="csv-upload">Import from CSV</Label>
                <div className="flex items-center gap-2">
                    <Input
                        id="csv-upload"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        disabled={isPending}
                    />
                    <Button onClick={handleUpload} disabled={!file || isPending}>
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                        Import
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    CSV must contain an <code>email</code> header. Optional headers: <code>name</code>, other custom fields.
                </p>
            </div>
        </div>
    );
}
