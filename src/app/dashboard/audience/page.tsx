import { auth } from "@/auth";
import { getAllContacts } from "@/actions/audience";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Upload, Filter, Users } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { AudienceSearch } from "@/components/audience/audience-search";

interface AudiencePageProps {
    searchParams: {
        q?: string;
        page?: string;
    };
}

const AudiencePage = async ({ searchParams }: AudiencePageProps) => {
    const session = await auth();
    const query = searchParams.q || "";
    const page = Number(searchParams.page) || 1;
    const { contacts, total, totalPages } = await getAllContacts(query, page);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Audience</h1>
                    <p className="text-muted-foreground">Manage your contacts and lead lists.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Deduplicate
                    </Button>
                    <Button>
                        <Upload className="mr-2 h-4 w-4" /> Import Contacts
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            All Contacts ({total})
                        </CardTitle>
                        <div className="w-72">
                            <AudienceSearch />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Source Campaign</TableHead>
                                <TableHead>Added Date</TableHead>
                                <TableHead className="text-right">Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                        No contacts found.
                                    </TableCell>
                                </TableRow>
                            )}
                            {contacts.map((contact: any) => (
                                <TableRow key={contact.id}>
                                    <TableCell className="font-medium">{contact.email}</TableCell>
                                    <TableCell>{contact.name || "-"}</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                            {contact.campaign.name}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {format(contact.createdAt, "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right font-mono">
                                        {contact.leadScore}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default AudiencePage;
