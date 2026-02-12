import { auth } from "@/auth";
import { getEmailAccountsByUserId } from "@/data/email-account";
import { CampaignForm } from "@/components/campaigns/campaign-form";

const NewCampaignPage = async () => {
    const session = await auth();
    const emailAccounts = await getEmailAccountsByUserId(session?.user?.id || "");

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>
            <div className="bg-card border rounded-lg p-6 shadow-sm">
                <CampaignForm emailAccounts={emailAccounts} />
            </div>
        </div>
    );
}

export default NewCampaignPage;
