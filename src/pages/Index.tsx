import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { NotesManager } from "@/components/notes/NotesManager";
import { useToast } from "@/hooks/use-toast";

interface User {
  email: string;
  tenant: string;
  role: string;
}

interface Subscription {
  plan: "Free" | "Pro";
  notesUsed: number;
  notesLimit: number | null;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription>({
    plan: "Free",
    notesUsed: 1,
    notesLimit: 3,
  });
  const { toast } = useToast();

  const handleLogin = (email: string, tenant: string, role: string) => {
    setUser({ email, tenant, role });
    
    // Simulate different subscription states for demo
    if (tenant === "Globex" && role === "Admin") {
      setSubscription({ plan: "Pro", notesUsed: 5, notesLimit: null });
    } else {
      setSubscription({ plan: "Free", notesUsed: 1, notesLimit: 3 });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setSubscription({ plan: "Free", notesUsed: 1, notesLimit: 3 });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const handleUpgrade = () => {
    setSubscription({ ...subscription, plan: "Pro", notesLimit: null });
    toast({
      title: "Upgraded to Pro!",
      description: "You now have unlimited notes. Welcome to Pro!",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <DashboardHeader 
        user={user} 
        subscription={subscription} 
        onLogout={handleLogout}
        onUpgrade={user.role === "Admin" ? handleUpgrade : undefined}
      />
      <NotesManager 
        user={user} 
        subscription={subscription}
        onUpgrade={user.role === "Admin" ? handleUpgrade : undefined}
      />
    </div>
  );
};

export default Index;
