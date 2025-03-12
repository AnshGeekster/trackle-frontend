"use client";

import { useAppSelector } from "@/lib/hooks.js";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Briefcase } from "lucide-react";
import { useState } from "react";

const ProfileCard = () => {
  const user = useAppSelector((state) => state.user);
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="w-72 p-4 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="text-center p-0">
        <h3 className="font-semibold text-lg">User Dashboard</h3>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-3 space-y-2 text-sm">
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
        </CardContent>
      )}

      <Button
        variant="outline"
        size="sm"
        className="mt-3 w-full"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Hide Details" : "Show Details"}
      </Button>
    </Card>
  );
};

export default ProfileCard;
