"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CampaignSchema } from "@/schemas";
import { createCampaign } from "@/actions/campaign";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Editor } from "@/components/ui/editor";

interface EmailAccount {
    id: string;
    label: string;
    email: string;
}

interface CampaignFormProps {
    emailAccounts: EmailAccount[];
}

export const CampaignForm = ({ emailAccounts }: CampaignFormProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CampaignSchema>>({
        resolver: zodResolver(CampaignSchema),
        defaultValues: {
            name: "",
            subject: "",
            body: "",
            emailAccountId: "",
        },
    });

    const onSubmit = (values: z.infer<typeof CampaignSchema>) => {
        startTransition(() => {
            createCampaign(values)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    } else {
                        toast.success("Campaign created!");
                        router.push("/dashboard/campaigns");
                        router.refresh();
                    }
                })
                .catch(() => toast.error("Something went wrong"));
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Campaign Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Q1 Outreach"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Internal name for your campaign.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="emailAccountId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sender Account</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isPending}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an email account" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {emailAccounts.map((account) => (
                                            <SelectItem key={account.id} value={account.id}>
                                                {account.label} ({account.email})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject Line</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Quick question about {{company}}"
                                    />
                                </FormControl>
                                <FormDescription>
                                    You can use variables like {"{{name}}"}, {"{{company}}"}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="body"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Body</FormLabel>
                                <FormControl>
                                    <Editor
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        placeholder="Hi {{name}}, ..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.back()}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        Create Campaign
                    </Button>
                </div>
            </form>
        </Form>
    );
}
