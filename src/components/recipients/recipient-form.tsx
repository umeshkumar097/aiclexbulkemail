"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { RecipientSchema } from "@/schemas";
import { addRecipient } from "@/actions/recipient";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface RecipientFormProps {
    campaignId: string;
    onSuccess?: () => void;
}

export const RecipientForm = ({ campaignId, onSuccess }: RecipientFormProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RecipientSchema>>({
        resolver: zodResolver(RecipientSchema),
        defaultValues: {
            email: "",
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RecipientSchema>) => {
        startTransition(() => {
            addRecipient(campaignId, values)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    } else {
                        toast.success("Recipient added!");
                        form.reset();
                        router.refresh();
                        if (onSuccess) onSuccess();
                    }
                })
                .catch(() => toast.error("Something went wrong"));
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending} placeholder="john@example.com" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name (Optional)</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending} placeholder="John Doe" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    Add Recipient
                </Button>
            </form>
        </Form>
    );
}
