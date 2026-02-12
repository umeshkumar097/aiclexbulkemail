"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { SettingsSchema } from "@/schemas";
import { settings } from "@/actions/settings";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const ProfileForm = () => {
    const { data: session, update } = useSession(); // update session after changes
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: session?.user?.name || undefined,
            email: session?.user?.email || undefined,
            role: session?.user?.role as "ADMIN" | "USER" || "USER",
            isTwoFactorEnabled: false, // Default or fetch from user
            password: "",
            newPassword: "",
        },
    });

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    }
                    if (data.success) {
                        update();
                        toast.success(data.success);
                    }
                })
                .catch(() => toast.error("Something went wrong!"));
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your public profile and security settings.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="John Doe" disabled={isPending} />
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
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="john.doe@example.com" type="email" disabled={true} />
                                        </FormControl>
                                        <FormDescription>
                                            Email changes are currently disabled.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Role (Read only for now or admin) */}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={true} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="pt-4 border-t">
                            <h3 className="text-sm font-medium mb-4">Security</h3>
                            <div className="grid gap-4">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="******" type="password" disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="******" type="password" disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* 2FA Placeholder */}
                        {/* 
                        <div className="flex items-center justify-between rounded-lg border p-4">
                             <div className="space-y-0.5">
                                 <Label className="text-base">Two-factor Authentication</Label>
                                 <FormDescription>Secure your account with 2FA.</FormDescription>
                             </div>
                             <FormField
                                control={form.control}
                                name="isTwoFactorEnabled"
                                render={({ field }) => (
                                     <FormControl>
                                         <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                                     </FormControl>
                                )}
                             />
                        </div>
                        */}

                        <Button type="submit" disabled={isPending}>
                            Save Changes
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
