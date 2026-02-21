import { ExtendedUser } from "@/types/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
    user?: ExtendedUser;
    label?: string;
};

export const UserInfo = ({
    user,
    label,
}: UserInfoProps) => {
    return (
        <Card>
            <CardHeader className="w-150 shadow-md">
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-lg font-medium">
                        ID
                    </p>
                    <p className="truncate text-xs max-w-180px font-mono p-1 bg-slate-100 rounded-md">
                        {user?.id}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-lg font-medium">
                        Name
                    </p>
                    <p className="truncate text-xs max-w-180px font-mono p-1 bg-slate-100 rounded-md">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-lg font-medium">
                        Email
                    </p>
                    <p className="truncate text-xs max-w-180px font-mono p-1 bg-slate-100 rounded-md">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-lg font-medium">
                        Role
                    </p>
                    <p className="truncate text-xs max-w-180px font-mono p-1 bg-slate-100 rounded-md">
                        {user?.role}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-lg font-medium">
                        Two Factor Authentication
                    </p>
                    <p className="truncate text-xs max-w-180px font-mono p-1 bg-slate-100 rounded-md">
                    <Badge 
                    variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                    </Badge>
                    </p>
                </div>
            </CardContent>    
        </Card>
    );
}


