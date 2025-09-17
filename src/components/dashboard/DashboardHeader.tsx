import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Crown, User } from "lucide-react";

interface DashboardHeaderProps {
  user: {
    email: string;
    tenant: string;
    role: string;
  };
  subscription: {
    plan: "Free" | "Pro";
    notesUsed: number;
    notesLimit: number | null;
  };
  onLogout: () => void;
  onUpgrade?: () => void;
}

export function DashboardHeader({ user, subscription, onLogout, onUpgrade }: DashboardHeaderProps) {
  const getTenantColor = (tenant: string) => {
    switch (tenant) {
      case "Acme":
        return "bg-blue-500";
      case "Globex":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const isAtLimit = subscription.plan === "Free" && subscription.notesUsed >= (subscription.notesLimit || 3);

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-lg ${getTenantColor(user.tenant)} flex items-center justify-center text-white font-bold text-sm`}>
                {user.tenant.charAt(0)}
              </div>
              <div>
                <h1 className="text-xl font-bold">{user.tenant} Notes</h1>
                <p className="text-sm text-muted-foreground">Multi-tenant SaaS Application</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Badge variant={subscription.plan === "Pro" ? "default" : "secondary"} className="flex items-center gap-1">
                {subscription.plan === "Pro" ? <Crown className="w-3 h-3" /> : null}
                {subscription.plan}
              </Badge>
              {subscription.plan === "Free" && (
                <span className="text-sm text-muted-foreground">
                  {subscription.notesUsed}/{subscription.notesLimit} notes
                </span>
              )}
            </div>

            {subscription.plan === "Free" && user.role === "Admin" && (
              <Button 
                onClick={onUpgrade}
                variant="outline"
                size="sm"
                className="border-pro text-pro hover:bg-pro hover:text-pro-foreground"
              >
                <Crown className="w-4 h-4 mr-1" />
                Upgrade to Pro
              </Button>
            )}

            {isAtLimit && (
              <Badge variant="outline" className="border-warning text-warning">
                Limit Reached
              </Badge>
            )}

            <div className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-lg">
              <User className="w-4 h-4" />
              <div className="text-sm">
                <div className="font-medium">{user.email}</div>
                <div className="text-muted-foreground">{user.role}</div>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}