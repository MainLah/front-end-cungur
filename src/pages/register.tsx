import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/env";

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    fetch(BASE_URL + "/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    })
      .then(async (res) => {
        if (res.status === 403) {
          setError(await res.json().then((e) => e.message));
          return;
        }
        window.location.href = "/dashboard";
      })
      .catch((e) => {
        console.error(e);
      });
  });

  return (
    <div className="flex flex-col flex-auto justify-center h-screen max-w-2xl mx-auto py-10 px-4">
      {error ? (
        <div className="text-red-500 text-center mb-4 text-2xl">{error}</div>
      ) : null}
      <div>
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome to Cungur App,
        </h1>
        <p className="text-center mb-12">
          Send anonymous message to your friend!
        </p>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              className="space-y-8 max-w-2xl mx-auto py-10 px-4"
            >
              <FormField
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit">Register</Button>
                <Button variant="link" asChild>
                  <Link to="/">Back</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
