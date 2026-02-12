import { auth } from "@/auth";
import { getEmailAccounts } from "@/actions/email-account";
import { EmailAccountForm } from "@/components/settings/email-account-form";
import { EmailAccountList } from "@/components/settings/email-account-list";
import { ProfileForm } from "@/components/settings/profile-form";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsPage = async () => {
    const session = await auth();
    const accounts = await getEmailAccounts();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your account and preferences.</p>
            </div>

            <Separator />

            <Tabs defaultValue="email-accounts" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="email-accounts">Email Accounts</TabsTrigger>
                    <TabsTrigger value="profile">Profile & Security</TabsTrigger>
                </TabsList>
                <TabsContent value="email-accounts" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-medium mb-4">Connected Accounts</h2>
                                <EmailAccountList accounts={accounts} />
                            </div>
                        </div>
                        <div>
                            <EmailAccountForm />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="profile" className="space-y-4">
                    <div className="max-w-2xl">
                        <ProfileForm />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default SettingsPage;
