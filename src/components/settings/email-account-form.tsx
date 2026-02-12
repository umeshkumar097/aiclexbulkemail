"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailAccountSchema } from "@/schemas";
import { createEmailAccount } from "@/actions/email-account";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmailAccountFormProps {
    onSuccess?: () => void;
}

export const EmailAccountForm = ({ onSuccess }: EmailAccountFormProps) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof EmailAccountSchema>>({
        resolver: zodResolver(EmailAccountSchema) as any,
        defaultValues: {
            label: "",
            email: "",
            provider: "SMTP", // default
            dailyLimit: 500,
            // Optional fields
            smtpHost: "",
            smtpPort: 587,
            smtpUser: "",
            smtpPassword: "",
            awsAccessKey: "",
            awsSecretKey: "",
            awsRegion: "us-east-1",
        } as any,
    });

    const provider = form.watch("provider");

    const onSubmit = (values: z.infer<typeof EmailAccountSchema>) => {
        startTransition(() => {
            createEmailAccount(values)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    }
                    if (data.success) {
                        toast.success(data.success);
                        form.reset();
                        onSuccess?.();
                    }
                });
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Email Account</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Label (Friendly Name)</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Marketing Gmail" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sender Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="alex@marketing.com" type="email" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="provider"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Provider</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={isPending}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a provider" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="SMTP">SMTP</SelectItem>
                                            <SelectItem value="GMAIL">Gmail (via Google App Password)</SelectItem>
                                            <SelectItem value="SES">Amazon SES</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Provider Specific Fields */}
                        {(provider === "SMTP" || provider === "GMAIL") && (
                            <div className="space-y-4 border p-4 rounded-md bg-slate-50">
                                <h3 className="text-sm font-medium text-slate-700">SMTP Settings</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="smtpHost"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Host</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="smtp.gmail.com" disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="smtpPort"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Port</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="number" disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="smtpUser"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input {...field} disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="smtpPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password (App Password)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="password" disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        {provider === "SES" && (
                            <div className="space-y-4 border p-4 rounded-md bg-slate-50">
                                <h3 className="text-sm font-medium text-slate-700">AWS SES Settings</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="awsAccessKey"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Access Key ID</FormLabel>
                                                <FormControl>
                                                    <Input {...field} disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="awsSecretKey"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Secret Access Key</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="password" disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="awsRegion"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Region</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="us-east-1" disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        <FormField
                            control={form.control}
                            name="dailyLimit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Daily Sending Limit</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Connecting..." : "Connect Account"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
