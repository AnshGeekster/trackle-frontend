"use client";

import { useAppSelector } from "@/lib/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Briefcase } from "lucide-react";

const ProfileCard = () => {
  const user = useAppSelector((state) => state.user);
  console.log(user);

  return (
    <Card className="w-64 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">

        <div>
          <h3 className="font-semibold text-base leading-none">{"Admin Dashboard"}</h3>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{user?.name || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>{user?.role || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="truncate">{user?.email || "No Email Provided"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
