import { auth } from "@/auth";
import { getGlobalSettings } from "@/actions/admin-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettingsForm } from "@/components/admin/general-settings-form";
import { EmailSettingsForm } from "@/components/admin/email-settings-form";
import { SecuritySettingsForm } from "@/components/admin/security-settings-form";

const AdminSettingsPage = async () => {
    const session = await auth();
    if (session?.user?.role !== "SUPER_ADMIN") return <div>Unauthorized</div>;

    const settings = await getGlobalSettings();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Global Settings</h1>
                <p className="text-muted-foreground">Configure system-wide parameters and security protocols.</p>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="email">Email Routing</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Preferences</CardTitle>
                            <CardDescription>General configuration for the platform.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <GeneralSettingsForm settings={settings} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Controls</CardTitle>
                            <CardDescription>Rate limits and access controls.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SecuritySettingsForm settings={settings} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="email" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Email Infrastructure</CardTitle>
                            <CardDescription>Global sending behaviors.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <EmailSettingsForm settings={settings} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminSettingsPage;
