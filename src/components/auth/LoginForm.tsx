import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: (email: string, tenant: string, role: string) => void;
}

const testAccounts = [
  { email: "admin@acme.test", tenant: "Acme", role: "Admin" },
  { email: "user@acme.test", tenant: "Acme", role: "Member" },
  { email: "admin@globex.test", tenant: "Globex", role: "Admin" },
  { email: "user@globex.test", tenant: "Globex", role: "Member" },
];

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    const account = testAccounts.find(acc => acc.email === email);
    
    if (account && password === "password") {
      setTimeout(() => {
        onLogin(email, account.tenant, account.role);
        toast({
          title: "Login successful",
          description: `Welcome to ${account.tenant}!`,
        });
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Use one of the test accounts with password: 'password'",
          variant: "destructive",
        });
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleQuickLogin = (account: typeof testAccounts[0]) => {
    setEmail(account.email);
    setPassword("password");
    onLogin(account.email, account.tenant, account.role);
    toast({
      title: "Quick login successful",
      description: `Logged in as ${account.role} at ${account.tenant}`,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            SaaS Notes
          </CardTitle>
          <CardDescription>
            Sign in to your multi-tenant notes application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Test Accounts</span>
            </div>
          </div>

          <Alert>
            <AlertDescription>
              Use password: <code className="font-mono bg-muted px-1 rounded">password</code> for all accounts
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 gap-2">
            {testAccounts.map((account) => (
              <Button
                key={account.email}
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin(account)}
                className="text-left justify-start"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{account.email}</span>
                  <span className="text-xs text-muted-foreground">
                    {account.role} • {account.tenant}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}