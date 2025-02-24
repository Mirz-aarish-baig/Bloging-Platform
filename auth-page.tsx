import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/use-auth";
import { useToast } from "../hooks/use-toast";
import { useState } from "react";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login, register, isLoading, error } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

 
  const loginForm = useForm({
    defaultValues: { email: "", password: "" },
  });


  const registerForm = useForm({
    defaultValues: { email: "", password: "", displayName: "", avatar: null as File | null },
  });
  

  
  const handleLogin = async (data: { email: string; password: string }) => {
    setAuthError(null);
    try {
      await login(data.email, data.password);
      toast({ title: "Success", description: "Logged in successfully!" });
      setLocation("/");
    } catch {
      setAuthError(error);
      toast({ title: "Error", description: error || "Login failed!", variant: "destructive" });
    }
  };


  const handleRegister = async (data: { email: string; password: string; displayName: string; avatar?: File | null }) => {
    setAuthError(null);
    try {
      await register(data.email, data.password, data.displayName, data.avatar || null);
      toast({ title: "Success", description: "Account created successfully!" });
      setLocation("/");
    } catch {
      setAuthError(error);
      toast({ title: "Error", description: error || "Registration failed!", variant: "destructive" });
    }
  };
  

  return (
    <div className="min-h-[80vh] grid md:grid-cols-2 gap-8 items-center">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Card className="backdrop-blur-lg bg-card/80">
          <CardHeader>
            <CardTitle>Welcome to BlogVerse</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField control={loginForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={loginForm.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {authError && <p className="text-red-500 text-sm">{authError}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <FormField control={registerForm.control} name="displayName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={registerForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={registerForm.control} name="password" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField
                      control={registerForm.control}
                      name="avatar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Picture</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file); 
                                }
                              }}
                            />
                            
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {authError && <p className="text-red-500 text-sm">{authError}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Register"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
